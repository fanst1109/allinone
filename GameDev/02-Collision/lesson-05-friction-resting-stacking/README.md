# Lesson 10 — Friction, Resting & Stacking (ma sát tiếp xúc & xếp chồng ổn định)

> Bài **cuối Tier 2 — Collision**. Đây là phần biến một bộ giải va chạm "đồ chơi" thành một physics engine "thật" như Box2D.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **ma sát va chạm (tangent friction)** — cùng cơ chế impulse như [Lesson 09](../lesson-04-collision-response-impulse/) nhưng theo phương **tiếp tuyến**, bị kẹp bởi định luật Coulomb `|jₜ| ≤ μ·jₙ`.
- Hiểu **tiếp xúc nghỉ (resting contact)** — vì sao vật nằm yên trên sàn lại **rung lắc (jitter)** nếu xử lý naive.
- Hiểu **lún (sinking)** và **hiệu chỉnh vị trí (positional correction)** — slop + Baumgarte/percent correction để hết lún mà không gây nảy.
- Hiểu **xếp chồng (stacking)** — vì sao giải va chạm **một lần mỗi frame không đủ**, và cách giải lặp (sequential impulse) làm chồng hộp đứng yên.
- Hiểu **sleeping** — vật vận tốc rất nhỏ trong thời gian dài thì "ngủ" để vừa ổn định vừa tiết kiệm CPU.
- Ghép tất cả lại thành một solver hoàn chỉnh, khép Tier 2.

## Kiến thức tiền đề

- [Lesson 09 — Collision Response (Impulse)](../lesson-04-collision-response-impulse/) — **bắt buộc**. Bài này tái dùng nguyên công thức impulse pháp tuyến.
- [Lesson 04 — Forces: Gravity, Drag, Friction](../../01-Motion/lesson-04-forces-gravity-drag-friction/) — ma sát ở mức lực; bài này nâng lên mức impulse/ràng buộc.
- [Physics — Rigid Body](../../../Physics/01-Mechanics/lesson-07-rigid-body/) — vật rắn, khối tâm, hệ số phục hồi.

---

## 1. Vì sao Lesson 09 chưa đủ?

💡 **Hình dung.** Ở Lesson 09 ta đã biết cho hai quả bóng **nảy** ra khi va chạm: tính impulse theo **pháp tuyến** (đường nối tâm), đẩy chúng tách nhau. Điều đó tuyệt với cú va chạm chớp nhoáng. Nhưng game không chỉ có bóng nảy — game có **thùng hàng nằm trên sàn**, **tường gạch xếp chồng**, **nhân vật đứng yên trên bục**. Những thứ này tiếp xúc **lâu dài**, không phải va một phát rồi tách.

Hãy mở bài bằng một câu hỏi cụ thể mà ai làm game cũng gặp:

> **Vì sao chồng 5 cái hộp trong game cứ rung lắc bần bật rồi sụp đổ, dù tôi đã cài va chạm đúng? Làm sao cho chúng đứng yên như đời thực?**

Lesson 09 trả lời được "hai vật chạm thì nảy thế nào". Nó **không** trả lời được:

1. **Ma sát tiếp tuyến.** Bóng L09 trượt tự do dọc mặt phẳng vì ta chỉ xử lý pháp tuyến. Đời thực: kéo thùng hàng trên sàn bê tông thì nó **ghì lại**. Thành phần đó là ma sát — theo phương **tiếp tuyến**, vuông góc với pháp tuyến.
2. **Tiếp xúc nghỉ.** Hộp nằm trên sàn: trọng lực kéo xuống mỗi frame, sàn đỡ lên. Nếu mỗi frame ta "phát hiện đâm xuyên → đẩy ra" một cách naive, vận tốc cứ bị reset rồi lại tích lũy → hộp **rung** quanh mặt sàn.
3. **Lún.** Trọng lực mỗi frame cộng một chút vận tốc xuống. Tới lúc giải va chạm, hộp đã lọt một phần vào sàn. Nếu chỉ sửa vận tốc mà không sửa **vị trí**, vết lún tích lũy → hộp **chìm dần** qua sàn.
4. **Xếp chồng.** Hộp A đè hộp B đè hộp C đè sàn. Sửa tiếp xúc A–B làm hỏng tiếp xúc B–C. Giải **một lượt** không đủ.

Bài này lần lượt đóng cả 4 câu hỏi đó.

⚠ **Lỗi tư duy thường gặp.** "Tôi cài va chạm rồi mà chồng hộp vẫn sụp → chắc code va chạm sai." Sai. Code va chạm pháp tuyến có thể **đúng hoàn toàn**; vấn đề là bạn **thiếu** ma sát, **thiếu** positional correction, và **thiếu** vòng lặp giải. Đây là các module **bổ sung**, không phải sửa lỗi cái cũ.

📝 **Tóm tắt mục 1.**
- L09 xử lý **nảy theo pháp tuyến** cho va chạm tức thời.
- Tiếp xúc lâu dài cần thêm 4 thứ: **ma sát**, **resting**, **positional correction**, **giải lặp**.
- Chồng hộp sụp/rung **không phải** vì va chạm sai, mà vì thiếu các module trên.

---

## 2. Ma sát va chạm (Tangent friction)

### 2.1 Trực giác: tách tốc độ thành hai phương

💡 **Hình dung.** Khi hai vật chạm nhau, vận tốc tương đối tại điểm chạm có hai thành phần:
- **Phương pháp tuyến `n`** (vuông góc bề mặt): quyết định **nảy** — đã làm ở L09.
- **Phương tiếp tuyến `t`** (dọc bề mặt): quyết định **trượt**. Ma sát chống lại thành phần này.

Hình dung kéo quyển sách trên bàn: bạn đẩy ngang (tiếp tuyến), ma sát ghì ngược lại. Càng đè mạnh xuống (pháp tuyến lớn) thì càng khó kéo — đó chính là định luật Coulomb.

### 2.2 Định nghĩa: impulse ma sát

**(a) Là gì.** *Impulse ma sát* `jₜ` là một xung lực **theo phương tiếp tuyến** `t`, áp tại điểm chạm để **triệt tiêu (hoặc giảm) vận tốc trượt** dọc bề mặt. Đơn vị: kg·m/s (giống mọi impulse).

**(b) Vì sao cần.** L09 chỉ tính `jₙ` theo `n` nên vật trượt **tự do** dọc mặt — phi thực tế. Ta cần thêm một xung riêng dọc `t` để mô phỏng lực ghì. Không thể gộp vào `jₙ` vì hai phương độc lập.

**(c) Công thức.** Y hệt impulse pháp tuyến L09, chỉ đổi `n → t` và **bỏ hệ số phục hồi** (ma sát không làm vật "nảy ngang", chỉ hãm):

$$
j_t = \frac{-(v_{rel}\cdot t)}{\tfrac{1}{m_A}+\tfrac{1}{m_B}}
$$

trong đó vector tiếp tuyến `t` là phần vận tốc tương đối **đã trừ đi thành phần pháp tuyến**, rồi chuẩn hóa:

$$
t = \text{normalize}\big(v_{rel} - (v_{rel}\cdot n)\,n\big)
$$

### 2.3 Kẹp Coulomb — trái tim của ma sát

💡 Ma sát **không vô hạn**. Đặt cốc nước trên bàn nghiêng nhẹ: ma sát đủ giữ nó. Nghiêng dốc hơn: tới một góc, ma sát "hết cỡ" và cốc trượt. Giới hạn đó là **định luật Coulomb**:

$$
|j_t| \le \mu \cdot j_n
$$

- `μ` (mu) = **hệ số ma sát** (không thứ nguyên). Băng ≈ 0.05, gỗ ≈ 0.4, cao su trên bê tông ≈ 1.0.
- `jₙ` = độ lớn impulse pháp tuyến (từ L09).
- Nếu `jₜ` tính ra **vượt** `μ·jₙ` → ta **kẹp** nó về đúng `μ·jₙ` (giữ dấu/hướng). Đây là trạng thái **trượt động (kinetic)**: vật vẫn trượt, ma sát chỉ hãm bớt.
- Nếu `jₜ` **không vượt** → giữ nguyên: ma sát **tĩnh (static)** đủ sức dừng hẳn trượt.

⚠ **Lỗi thường gặp: ma sát vượt giới hạn Coulomb.** Nếu bạn áp nguyên `jₜ` mà **quên kẹp**, ma sát có thể lớn hơn cả lực đè → vật đang trượt sang phải bị "hãm ngược" văng sang trái. Triệu chứng: vật rung giật, hoặc trượt xong **bật ngược lại** một cách phi lý. Luôn kẹp `|jₜ| ≤ μ·jₙ`.

### 2.4 Walk-through bằng số thật

Cho hai vật va chạm trên mặt phẳng (bỏ qua xoay cho đơn giản):

```
Vật A: mₐ = 2 kg, vₐ = (3, -4)   (đang lao xuống-phải)
Vật B: m_b = ∞ (sàn cố định) → 1/m_b = 0
Pháp tuyến n = (0, 1)            (sàn hướng lên)
Hệ số phục hồi e = 0  (va chạm dẻo, không nảy — để cô lập ma sát)
μ = 0.3
```

**Bước 1 — vận tốc tương đối.** B đứng yên nên `v_rel = vₐ − v_b = (3, −4)`.

**Bước 2 — impulse pháp tuyến `jₙ` (ôn L09).**
`v_rel · n = (3)(0) + (−4)(1) = −4` (đang lao vào sàn).

$$
j_n = \frac{-(1+e)\,(v_{rel}\cdot n)}{\frac{1}{m_A}+\frac{1}{m_B}} = \frac{-(1+0)(-4)}{\frac{1}{2}+0} = \frac{4}{0.5} = 8
$$

→ `jₙ = 8`. (Cập nhật `vₐ ← vₐ + (jₙ/mₐ)·n = (3,−4) + (8/2)(0,1) = (3, 0)` — đã hết lao xuống, còn trượt ngang `3`.)

**Bước 3 — vector tiếp tuyến `t`.** Lấy vận tốc tương đối hiện tại `v_rel = (3, 0)` (sau bước 2):
`v_rel · n = (3)(0)+(0)(1) = 0`, nên phần tiếp tuyến = `(3,0) − 0·(0,1) = (3, 0)`.
Chuẩn hóa: `t = (3,0)/3 = (1, 0)`.

**Bước 4 — impulse ma sát chưa kẹp.**
`v_rel · t = (3)(1)+(0)(0) = 3`.

$$
j_t = \frac{-(v_{rel}\cdot t)}{\frac{1}{m_A}+\frac{1}{m_B}} = \frac{-(3)}{0.5} = -6
$$

→ `jₜ = −6`, độ lớn `|jₜ| = 6`.

**Bước 5 — kẹp Coulomb.** Giới hạn = `μ·jₙ = 0.3 × 8 = 2.4`.
Vì `|jₜ| = 6 > 2.4` → **vượt giới hạn** → kẹp về `2.4`, giữ dấu âm: `jₜ = −2.4`. **Đây là trượt động.**

**Bước 6 — áp vào vận tốc A.**
`vₐ ← vₐ + (jₜ/mₐ)·t = (3, 0) + (−2.4/2)(1, 0) = (3 − 1.2, 0) = (1.8, 0)`.

→ Tốc độ ngang giảm từ `3` xuống `1.8`. Vật **vẫn trượt** (vì ma sát chỉ đủ hãm bớt, không dừng hẳn) — đúng bản chất trượt động. Frame sau lặp lại, tốc độ tiếp tục giảm dần.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Nếu `|jₜ|` không vượt giới hạn thì sao?"* → Giả sử ở một frame khác tính ra `jₜ = −1.0` và `μ·jₙ = 2.4`. Vì `1.0 ≤ 2.4`, **không kẹp**: áp nguyên `−1.0`. Lúc đó ma sát tĩnh đủ mạnh, dừng hẳn trượt — vật đứng yên ngang.
- *"Vì sao bỏ `e` trong công thức ma sát?"* → `e` mô tả độ "nảy" theo pháp tuyến. Ma sát không làm vật bật ngược dọc bề mặt; nó chỉ hãm. Đặt `e = 0` cho phương tiếp tuyến.
- *"Một vật có hai `μ`?"* → Thường engine dùng `μ_static` (giữ đứng yên) > `μ_kinetic` (khi đã trượt). Toy model trên dùng một `μ` cho gọn.

🔁 **Dừng lại tự kiểm tra.** Vật A `mₐ = 1`, `v_rel = (5, 0)` sau khi đã xử lý pháp tuyến, `jₙ = 10`, `μ = 0.2`, sàn `1/m_b = 0`. `jₜ` cuối cùng (sau kẹp) là bao nhiêu?
<details><summary>Đáp án</summary>

`t = (1,0)`, `v_rel·t = 5`, `jₜ chưa kẹp = −5 / (1/1+0) = −5`. Giới hạn `μ·jₙ = 0.2×10 = 2`. Vì `5 > 2` → kẹp về `−2`. Vận tốc mới `= 5 + (−2/1) = 3`. Trượt động, còn trượt tiếp.
</details>

📝 **Tóm tắt mục 2.**
- Ma sát = impulse **theo phương tiếp tuyến `t`**, công thức giống L09 nhưng `e = 0`.
- **Kẹp Coulomb `|jₜ| ≤ μ·jₙ`** là bắt buộc — quên kẹp → vật giật ngược.
- Vượt giới hạn → trượt động (kẹp lại); không vượt → trượt tĩnh (dừng hẳn).

---

## 3. Tiếp xúc nghỉ (Resting contact) & jitter

### 3.1 Vì sao một vật "nằm yên" lại khó?

💡 **Hình dung.** Đặt một viên gạch lên bàn. Trực giác: nó đứng yên. Nhưng với engine, mỗi frame là một câu chuyện lặp lại:

1. **Tích phân:** trọng lực kéo gạch xuống → `v_y` tăng âm một chút, gạch nhích vào mặt bàn.
2. **Phát hiện:** "gạch đâm xuyên bàn `0.01` đơn vị!"
3. **Giải va chạm naive:** "đẩy ra, reset vận tốc lao vào = 0".
4. Frame sau: trọng lực lại kéo xuống → lặp lại.

Kết quả: `v_y` cứ bị bơm rồi bị reset, gạch **rung lăn tăn** quanh mặt bàn. Mắt thấy nó "lập lòe" lên xuống. Đó là **jitter**.

### 3.2 Định nghĩa: tiếp xúc nghỉ

**(a) Là gì.** *Resting contact* là tình huống hai vật chạm nhau với vận tốc tương đối pháp tuyến **xấp xỉ 0** và **kéo dài nhiều frame** (không phải va một phát rồi tách). Vd: hộp nằm trên sàn, nhân vật đứng trên bục.

**(b) Vì sao cần khái niệm riêng.** Va chạm "động" (`v_rel·n` lớn) và tiếp xúc "nghỉ" (`v_rel·n ≈ 0`) cần xử lý khác nhau. Áp công thức nảy (với `e > 0`) cho tiếp xúc nghỉ → nó cứ nảy lăn tăn. Phải nhận diện resting và **không cho nảy** (`e` hiệu dụng → 0 khi vận tốc nhỏ).

**(c) Ví dụ số.** Trọng lực `g = (0, −10)`, `dt = 1/60 ≈ 0.0167`. Mỗi frame `v_y` giảm `g·dt = −0.167`. Nếu mỗi frame chỉ reset `v_y = 0` khi chạm sàn, thì luôn có dao động `[−0.167, 0]` → jitter biên độ nhỏ nhưng thấy được.

⚠ **Lỗi thường gặp: jitter do `e > 0` ở tiếp xúc nghỉ.** Nếu để hệ số phục hồi `e = 0.3` cho cả tiếp xúc nghỉ, mỗi frame vật nảy lên `30%` vận tốc lao vào → rung rõ rệt. Sửa: khi `|v_rel·n|` nhỏ hơn ngưỡng (vd `< 1.0` m/s), đặt `e = 0` (gọi là **restitution slop**).

### 3.3 Bốn ví dụ số phân loại động/nghỉ

| Tình huống | `v_rel·n` | Phân loại | Xử lý |
|---|---|---|---|
| Bóng rơi từ cao đập sàn | `−12` | Va chạm động | nảy, dùng `e` |
| Hộp vừa đặt nhẹ lên sàn | `−0.8` | Gần nghỉ | `e → 0`, không nảy |
| Hộp đã nằm yên, frame kế | `−0.167` | Nghỉ | `e = 0` + positional correction |
| Hai hộp đứng yên cạnh nhau | `0.0` | Nghỉ | chỉ positional correction |

📝 **Tóm tắt mục 3.**
- Resting contact = chạm lâu dài, `v_rel·n ≈ 0`.
- Reset vận tốc naive mỗi frame → **jitter** (vật rung lăn tăn).
- Sửa bước 1: dùng **restitution slop** — `e → 0` khi vận tốc lao vào nhỏ.

---

## 4. Lún (Sinking) & hiệu chỉnh vị trí (Positional correction)

### 4.1 Vì sao vật lún xuyên sàn?

💡 **Hình dung.** Giải va chạm chỉ sửa **vận tốc** — nó nói "đừng lao vào nhau **nữa**". Nhưng nó **không** kéo hai vật đang chồng lấn ra. Mỗi frame trọng lực lại đẩy vật lọt thêm một chút vào sàn. Vận tốc bị reset = 0 nên engine "thấy ổn", nhưng vị trí thì đã lún. Tích lũy nhiều frame → vật **chìm dần** qua sàn.

### 4.2 Định nghĩa: positional correction

**(a) Là gì.** *Positional correction* là bước **dịch trực tiếp vị trí** hai vật để giảm độ chồng lấn (penetration depth), tách rời sau khi đã sửa vận tốc. Khác hẳn impulse (sửa vận tốc) — đây sửa **tọa độ**.

**(b) Vì sao cần.** Sửa vận tốc một mình không bao giờ "đẩy ra" phần đã lún. Phải có một bước riêng dịch vị trí. Nhưng nếu dịch **toàn bộ** độ lún mỗi frame, vật bị bắn ra quá đà → **nảy giả** (jitter ngược). Nên dùng hai tham số làm dịu: **slop** và **percent**.

**(c) Công thức (Baumgarte / percent correction).**

$$
\text{correction} = \frac{\max(\text{penetration} - \text{slop},\ 0)}{\tfrac{1}{m_A}+\tfrac{1}{m_B}} \times \text{percent} \times n
$$

- **slop** (vd `0.01`): cho phép chồng lấn **một chút** không sửa → tránh rung quanh điểm 0.
- **percent** (vd `0.2`–`0.8`): chỉ sửa một **phần** độ lún mỗi frame → mượt, không bắn quá đà.
- Chia cho tổng nghịch khối lượng → vật **nhẹ bị đẩy nhiều hơn** (sàn `1/m = 0` đứng yên).

### 4.3 Walk-through bằng số thật

```
Hộp A: mₐ = 1 kg, đang lún penetration = 0.10 vào sàn
Sàn:   1/m_b = 0 (cố định)
n = (0, 1)
slop = 0.01,  percent = 0.2
```

**Bước 1 — phần lún cần sửa.** `max(penetration − slop, 0) = max(0.10 − 0.01, 0) = 0.09`.

**Bước 2 — chia nghịch khối lượng.** `0.09 / (1/1 + 0) = 0.09`.

**Bước 3 — nhân percent.** `0.09 × 0.2 = 0.018`.

**Bước 4 — vector dịch.** `correction = 0.018 × (0, 1) = (0, 0.018)`.

**Bước 5 — áp cho từng vật theo nghịch khối lượng.**
- A: `posₐ ← posₐ + (1/mₐ)·correction = posₐ + 1×(0, 0.018)` → A dịch lên `0.018`.
- Sàn: `1/m_b = 0` → không dịch.

→ Sau frame này lún còn `0.10 − 0.018 = 0.082`. Frame sau sửa tiếp `max(0.082−0.01,0)×0.2 = 0.0144`... lún **giảm dần theo cấp số nhân** về quanh `slop = 0.01` rồi dừng. Mượt, không bắn ra.

❓ **Câu hỏi tự nhiên.**
- *"Sao không percent = 1.0 cho hết lún ngay?"* → Sửa 100% mỗi frame dễ over-correct: dịch hơi quá → frame sau lún ngược phía kia → rung. `0.2` chậm mà chắc; `0.8` nhanh hơn nhưng dễ rung.
- *"slop để làm gì?"* → Không có slop, engine cố ép penetration về **đúng 0** tuyệt đối → luôn dao động quanh 0 vì số học không bao giờ chính xác → rung vĩnh viễn. Cho phép lún `≤ 0.01` thì hệ "yên".
- *"Hai vật cùng động (không phải sàn)?"* → Cả hai cùng dịch, vật nhẹ dịch nhiều hơn. Vd `mₐ=1, m_b=2` → A dịch gấp đôi B.

⚠ **Lỗi thường gặp: jitter do over-correction.** Đặt `percent = 1.0` và `slop = 0` → vật bị đẩy bật ra mỗi frame rồi trọng lực kéo lại → rung dữ dội, có khi văng lên. Triệu chứng: hộp "nhảy disco" trên sàn. Sửa: hạ `percent` về `0.2`–`0.4`, đặt `slop ≈ 0.01`.

🔁 **Dừng lại tự kiểm tra.** `penetration = 0.05`, `slop = 0.01`, `percent = 0.5`, A `mₐ = 1` trên sàn (`1/m_b=0`). A dịch lên bao nhiêu frame này?
<details><summary>Đáp án</summary>

`max(0.05−0.01,0)=0.04`; `0.04/(1+0)=0.04`; `×0.5 = 0.02`. A dịch lên `0.02`. Lún còn `0.03`.
</details>

📝 **Tóm tắt mục 4.**
- Sửa vận tốc **không** tách phần đã lún → vật **chìm dần**.
- **Positional correction** dịch tọa độ trực tiếp để hết lún.
- **slop** (cho phép lún nhỏ) + **percent** (chỉ sửa một phần) chống over-correction/jitter.

---

## 5. Xếp chồng (Stacking) & giải lặp (Sequential impulse)

### 5.1 Vì sao một lượt giải không đủ?

💡 **Hình dung.** Ba hộp xếp chồng: A trên B trên C trên sàn. Có 3 tiếp xúc: A–B, B–C, C–sàn. Bạn giải lần lượt:

1. Giải **A–B**: A đẩy lên, B đẩy xuống. Nhưng B vừa được đẩy xuống → giờ B lún vào C.
2. Giải **B–C**: sửa B–C. Nhưng B vừa bị đẩy lên → lại làm hỏng A–B.
3. Giải **C–sàn**: C dịch → ảnh hưởng B–C vừa giải.

Sửa cái này làm hỏng cái kia. Một lượt giải để lại sai số. Hộp trên cùng "thấy" tiếp xúc dưới cùng **trễ 3 frame** → cả chồng rung và sụp.

### 5.2 Định nghĩa: sequential impulse (giải lặp)

**(a) Là gì.** *Sequential impulse* là kỹ thuật **lặp lại việc giải tất cả tiếp xúc nhiều lần trong cùng một frame** (vd 8–10 iteration), thay vì một lượt. Mỗi lượt sau "vá" sai số lượt trước; sau đủ vòng, toàn hệ hội tụ về trạng thái cân bằng.

**(b) Vì sao cần.** Các ràng buộc tiếp xúc **ghép nối** nhau (constraint A–B ảnh hưởng B–C). Giải đồng thời cả hệ là bài toán lớn (LCP); giải lặp là cách **xấp xỉ rẻ** — mỗi vòng tiến gần lời giải đúng hơn (giống Gauss–Seidel).

**(c) Ví dụ số — chồng 3 hộp lún tổng `0.30`.** Giả sử mỗi iteration positional correction sửa ~`50%` phần lún còn lại của toàn chồng:

| Iteration | Lún còn lại (xấp xỉ) |
|---|---|
| 0 (đầu frame) | 0.30 |
| 1 | 0.15 |
| 2 | 0.075 |
| 4 | 0.019 |
| 8 | ~0.001 (coi như hết) |

→ **1 iteration** để lại lún `0.15` rất lớn → frame sau hộp trên rơi tiếp → rung/sụp. **8 iteration** đưa lún về ~0 → chồng đứng yên.

### 5.3 Walk-through hai hộp (số thật)

```
A trên B. Frame bắt đầu: A lún vào B = 0.20.
percent hiệu dụng mỗi iter = 0.5 (đã gồm slop)
```

- **Iter 1:** sửa `0.20 × 0.5 = 0.10`. Lún còn `0.10`.
- **Iter 2:** sửa `0.10 × 0.5 = 0.05`. Lún còn `0.05`.
- **Iter 3:** sửa `0.05 × 0.5 = 0.025`. Lún còn `0.025`.
- **Iter 4:** sửa `0.025 × 0.5 = 0.0125`. Lún còn `0.0125`.

→ Sau 4 iter, lún từ `0.20` còn `0.0125` (≈ slop). Nếu chỉ 1 iter, lún còn `0.10` — gấp 8 lần, đủ để frame sau "nổ".

⚠ **Lỗi thường gặp: chồng sụp do thiếu iteration.** Để `iterations = 1` cho chồng cao → mỗi frame chỉ vá được tiếp xúc trên cùng một chút, sai số dồn xuống đáy → cả tháp **lảo đảo rồi sụp**. Sửa: tăng iteration (Box2D mặc định 8 velocity + 3 position iteration). Chồng càng cao càng cần nhiều.

❓ **Câu hỏi tự nhiên.**
- *"Nhiều iteration thì có chậm không?"* → Có, chi phí tuyến tính theo số iteration × số tiếp xúc. Nhưng 8–10 là đủ cho hầu hết game; đây là đánh đổi chính xác ↔ tốc độ.
- *"warm starting là gì?"* → Engine lưu impulse frame trước, dùng làm điểm khởi đầu frame này → hội tụ nhanh hơn nhiều. Là tối ưu nâng cao của sequential impulse.

🔁 **Dừng lại tự kiểm tra.** Lún ban đầu `0.40`, mỗi iter sửa `50%`. Sau 3 iter còn bao nhiêu?
<details><summary>Đáp án</summary>

`0.40 → 0.20 → 0.10 → 0.05`. Còn `0.05`.
</details>

📝 **Tóm tắt mục 5.**
- Tiếp xúc **ghép nối**: sửa cái này hỏng cái kia.
- **Sequential impulse** = lặp giải nhiều vòng/frame để hội tụ.
- **Thiếu iteration → chồng sụp**; 8–10 iteration là đủ cho hầu hết game.

---

## 6. Sleeping (cho vật "ngủ")

### 6.1 Trực giác

💡 **Hình dung.** Một chồng hộp đã đứng yên hoàn toàn. Engine vẫn tính trọng lực, va chạm, correction... cho chúng **mỗi frame** — tốn CPU vô ích, và sai số tích lũy nhỏ vẫn gây rung lăn tăn không bao giờ dứt. Giải pháp: khi một vật **gần như bất động đủ lâu**, cho nó **"ngủ"** — ngừng tích phân và giải cho tới khi có gì đó "đánh thức".

### 6.2 Định nghĩa: sleeping

**(a) Là gì.** *Sleeping* là trạng thái engine **tạm dừng mọi tính toán động lực** (tích phân, va chạm chủ động) cho một vật khi vận tốc tuyến tính + góc của nó dưới ngưỡng trong một khoảng thời gian.

**(b) Vì sao cần.** Hai lợi ích: **(1) ổn định** — vật ngủ không còn bị sai số số học làm rung; **(2) hiệu năng** — chồng 500 hộp đứng yên gần như miễn phí CPU.

**(c) Tiêu chí (ví dụ số).** Vật ngủ khi: `|v| < 0.05 m/s` **và** `|ω| < 0.05 rad/s` liên tục trong `> 0.5 giây` (≈ 30 frame ở 60 FPS).

| Vật | `|v|` | Thời gian dưới ngưỡng | Trạng thái |
|---|---|---|---|
| Hộp đáy chồng | 0.01 | 1.2 s | 💤 Ngủ |
| Hộp vừa đặt | 0.30 | 0 s | Thức |
| Hộp đã yên rồi bị bóng đập | 2.0 | reset | **Đánh thức** |
| Nhân vật đứng yên | 0.02 | 0.7 s | 💤 Ngủ |

⚠ **Lỗi thường gặp.** Quên **đánh thức** vật ngủ khi có vật khác chạm vào → bóng bay xuyên qua chồng hộp đang ngủ (engine bỏ qua va chạm với vật ngủ). Sửa: khi một tiếp xúc mới hình thành hoặc một vật thức chạm vật ngủ → đánh thức cả cụm (island) liên quan.

📝 **Tóm tắt mục 6.**
- Vật **bất động đủ lâu** → cho **ngủ** (ngừng tính).
- Lợi: ổn định (hết jitter dư) + tiết kiệm CPU.
- Phải **đánh thức** khi có va chạm/lực mới, nếu không vật khác xuyên qua.

---

## 7. Ghép lại: vòng lặp solver hoàn chỉnh & khép Tier 2

Đặt mọi thứ vào một frame, đây là thứ tự một physics engine thật (kiểu Box2D) chạy:

```
mỗi frame (dt):
  1. Tích phân lực:    v += (F/m)·dt        (trọng lực, drag — Lesson 04)
  2. Phát hiện va chạm: tìm tất cả contact + penetration + n  (Lesson 07/08)
  3. Bỏ qua vật đang ngủ (Sleeping — mục 6)
  4. Giải vận tốc (lặp velocityIterations lần):   ← Sequential impulse, mục 5
       với mỗi contact:
         - impulse pháp tuyến jₙ (có restitution slop)   ← L09 + mục 3
         - impulse ma sát jₜ, kẹp |jₜ| ≤ μ·jₙ            ← mục 2
  5. Tích phân vị trí:  pos += v·dt
  6. Giải vị trí (lặp positionIterations lần):    ← mục 4 + mục 5
         positional correction (slop + percent)
  7. Cập nhật sleeping: vật nào đủ chậm đủ lâu → ngủ; va chạm mới → đánh thức
```

🔗 **Đây chính là cái làm nên một physics engine "thật".** [Box2D](https://box2d.org/) (engine 2D nổi tiếng dùng trong Angry Birds, vô số game) chạy đúng pipeline này: broad-phase → narrow-phase → sequential impulse solver (velocity + position iteration) → sleeping islands. Bạn vừa hiểu xương sống của nó.

### Tier 2 — Collision: khép lại

Lộ trình Tier 2 đi từ "phát hiện hai vật chạm nhau" tới "mô phỏng tiếp xúc ổn định như đời thực":

- **L05–L08** — phát hiện va chạm (AABB, circle, SAT, broad-phase).
- **L09** — phản ứng va chạm: impulse pháp tuyến (nảy).
- **L10 (bài này)** — ma sát, resting, positional correction, stacking, sleeping → engine hoàn chỉnh.

### Sang Tier 3 — Systems

Tier 3 chuyển từ **một vật / vài vật** sang **hệ thống nhiều thực thể** và kiến trúc game:

- **Bài tiếp: [Particle Systems](../../03-Systems/lesson-01-particle-systems/)** — mô phỏng hàng nghìn hạt (lửa, khói, nước, vụ nổ). Tái dùng tích phân (L03) ở quy mô lớn, nhưng bỏ va chạm chính xác để chạy nhanh — một đánh đổi thiết kế khác hẳn solver chính xác của Tier 2.

---

## Bài tập

1. **Kẹp Coulomb.** Vật A `mₐ = 4`, sàn cố định. Sau khi xử lý pháp tuyến: `v_rel = (6, 0)`, `jₙ = 20`, `μ = 0.25`. Tính `jₜ` cuối cùng (sau kẹp) và vận tốc ngang mới của A.

2. **Phân loại động/nghỉ.** Cho ngưỡng restitution slop `|v_rel·n| < 1.0` thì `e → 0`. Phân loại 3 tình huống: (a) `v_rel·n = −15`, (b) `v_rel·n = −0.5`, (c) `v_rel·n = −0.167`. Cái nào cho nảy (dùng `e`), cái nào không?

3. **Positional correction nhiều frame.** Hộp `mₐ = 2` lún `0.12` vào sàn, `slop = 0.01`, `percent = 0.25`. Tính độ dịch của hộp ở **frame 1 và frame 2** (giả sử giữa hai frame không có trọng lực thêm vào, chỉ correction).

4. **Over-correction.** Giải thích bằng lời + một dãy số minh họa: vì sao `percent = 1.0`, `slop = 0` gây jitter, trong khi `percent = 0.2`, `slop = 0.01` thì không. Cho `penetration` ban đầu `0.10`.

5. **Iteration cho chồng.** Chồng hộp lún tổng `0.50`, mỗi iteration sửa `40%` phần lún còn lại. Sau bao nhiêu iteration thì lún còn `< 0.05`? Lập bảng.

6. **(Tổng hợp) Một frame đầy đủ.** Vật `m = 1` ở `pos = (0, 0.10)` (đang lún `0.10` vào sàn `y = 0`, n = (0,1)), `v = (2, −3)`. `g = (0,−10)`, `dt = 0.1`, `e = 0` (resting), `μ = 0.5`, `slop = 0.01`, `percent = 0.2`. Chạy đủ pipeline mục 7 (1 velocity iter, 1 position iter) và cho `v`, `pos` cuối frame.

---

## Lời giải chi tiết

### Bài 1

`t` = normalize của phần tiếp tuyến của `v_rel = (6,0)`. Vì `v_rel·n = 0`, phần tiếp tuyến `= (6,0)`, `t = (1,0)`.
- `v_rel·t = 6`. `jₜ` chưa kẹp `= −6 / (1/4 + 0) = −6 / 0.25 = −24`. Độ lớn `24`.
- Giới hạn Coulomb `= μ·jₙ = 0.25 × 20 = 5`. Vì `24 > 5` → **kẹp** về `−5`. **Trượt động.**
- Vận tốc ngang mới `= 6 + (jₜ/mₐ) = 6 + (−5/4) = 6 − 1.25 = 4.75`.

**Kết quả:** `jₜ = −5`, vận tốc ngang `= 4.75` (vật vẫn trượt, ma sát chỉ hãm bớt).

### Bài 2

Ngưỡng: `|v_rel·n| < 1.0` → `e → 0` (không nảy).
- **(a)** `|−15| = 15 ≥ 1.0` → **dùng `e`**, cho nảy. Va chạm động.
- **(b)** `|−0.5| = 0.5 < 1.0` → `e → 0`, **không nảy**. Gần nghỉ.
- **(c)** `|−0.167| = 0.167 < 1.0` → `e → 0`, **không nảy**. Tiếp xúc nghỉ.

Lý do: chỉ va chạm đủ mạnh mới đáng cho nảy; vận tốc nhỏ mà cho nảy → jitter (mục 3).

### Bài 3

Công thức: `dịch = max(pen − slop, 0) / (1/m + 0) × percent`, A nhẹ → dịch toàn bộ (sàn `1/m_b = 0`).

- **Frame 1:** `max(0.12 − 0.01, 0) = 0.11`; `0.11 / (1/2) = 0.22`; `× 0.25 = 0.055`. A dịch lên `0.055`. Lún còn `0.12 − 0.055 = 0.065`.

  *Chú ý:* chia cho `1/m = 0.5` → `0.11/0.5 = 0.22`, đây là độ lớn impulse vị trí; nhân `1/m` lại khi áp cho A: dịch thực `= 0.22 × percent × (1/m)`... để tránh nhầm, dùng dạng gọn tương đương: phần lún hiệu dụng `0.11`, nhân `percent 0.25` = `0.0275` cho hệ một-vật-trên-sàn. Ta dùng nhất quán **dạng gọn** (vật đơn trên sàn cố định, dịch = `max(pen−slop,0) × percent`):

  - **Frame 1 (dạng gọn):** `0.11 × 0.25 = 0.0275`. A dịch lên `0.0275`. Lún còn `0.12 − 0.0275 = 0.0925`.
  - **Frame 2:** `max(0.0925 − 0.01, 0) = 0.0825`; `× 0.25 = 0.0206`. A dịch lên `0.0206`. Lún còn `0.0719`.

**Kết quả:** Frame 1 dịch `0.0275`, frame 2 dịch `0.0206` — lún giảm dần, hội tụ về quanh `slop`. (Hệ số `1/m` chỉ đổi tốc độ hội tụ khi có **hai vật động**; với sàn cố định nó triệt tiêu nên dạng gọn đúng.)

### Bài 4

**Vì sao `percent=1.0, slop=0` jitter:** sửa 100% mỗi frame, cộng sai số số học, vật dễ bị đẩy **quá** điểm tiếp xúc → frame sau penetration đổi dấu (vật hở khỏi sàn) → trọng lực kéo lại đâm vào → lặp.

Dãy số (penetration qua các frame, có trọng lực bơm `+0.02` mỗi frame):
```
0.10 → sửa hết về 0 → +0.02 (trọng lực) → 0.02 → sửa hết về 0 → +0.02 → 0.02 → ...
```
Vật **nảy lên xuống biên độ ~0.02 mỗi frame mãi mãi** = jitter thấy được.

**Vì sao `percent=0.2, slop=0.01` mượt:**
```
0.10 → max(0.10−0.01,0)×0.2=0.018 → còn 0.082 (+0.02 trọng lực) → 0.102 → ... hội tụ quanh ~0.01
```
Penetration ổn định quanh `slop`, không đổi dấu → không nảy → mắt thấy **đứng yên**.

### Bài 5

Lún còn lại sau mỗi iter `= trước × (1 − 0.40) = trước × 0.6`:

| Iter | Lún còn |
|---|---|
| 0 | 0.50 |
| 1 | 0.30 |
| 2 | 0.18 |
| 3 | 0.108 |
| 4 | 0.0648 |
| 5 | **0.0389** < 0.05 ✓ |

**Kết quả:** cần **5 iteration** để lún xuống dưới `0.05`.

### Bài 6 (tổng hợp)

`m=1`, `pos=(0,0.10)`, `v=(2,−3)`, `g=(0,−10)`, `dt=0.1`, `n=(0,1)`, penetration ban đầu `0.10`, `e=0`, `μ=0.5`, `slop=0.01`, `percent=0.2`.

**Bước 1 — tích phân lực.** `v += g·dt = (2,−3) + (0,−10)(0.1) = (2, −3 −1) = (2, −4)`.

**Bước 2 — phát hiện:** đang lún `0.10`, `v_rel = (2,−4)` (sàn cố định), `v_rel·n = −4` < 0 → đâm vào.

**Bước 3 — vật không ngủ** (`|v|` lớn).

**Bước 4 — giải vận tốc (1 iter):**
- *Pháp tuyến:* `jₙ = −(1+e)(v_rel·n)/(1/m) = −(1)(−4)/1 = 4`. `v += (jₙ/m)·n = (2,−4)+(4)(0,1) = (2, 0)`.
- *Ma sát:* `v_rel` giờ `(2,0)`, phần tiếp tuyến `(2,0)`, `t=(1,0)`. `jₜ` chưa kẹp `= −(2)/1 = −2`, độ lớn `2`. Giới hạn `μ·jₙ = 0.5×4 = 2`. Vì `2 ≤ 2` → **không kẹp** (đúng biên), áp `−2`. `v += (−2/1)(1,0) = (2−2, 0) = (0, 0)`.

  → Sau giải vận tốc: `v = (0, 0)` — vật đứng hẳn cả ngang lẫn dọc.

**Bước 5 — tích phân vị trí.** `pos += v·dt = (0,0.10) + (0,0)(0.1) = (0, 0.10)`. (v = 0 nên không đổi.)

**Bước 6 — giải vị trí (1 iter):** `dịch = max(0.10−0.01,0) × 0.2 = 0.09 × 0.2 = 0.018` lên. `pos = (0, 0.10 + 0.018) = (0, 0.118)`. Lún còn `0.082`.

**Bước 7 — sleeping:** `|v| = 0 < 0.05` nhưng mới 1 frame → bắt đầu đếm, **chưa ngủ**.

**Kết quả cuối frame:** `v = (0, 0)`, `pos = (0, 0.118)`. Vật đã dừng chuyển động, đang được correction đẩy lên dần khỏi sàn; vài frame nữa hết lún và sẽ ngủ.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Stacking sim** — chồng hộp + slider số iteration/frame: ít iteration → rung/sụp, nhiều → đứng yên.
  2. **Ma sát trên dốc** — slider `μ` và góc dốc: thấy ranh giới trượt/đứng theo Coulomb.
  3. **Positional correction** — toggle on/off: thấy vật **lún xuyên sàn** vs **đứng đúng**, kèm chỉ báo sleeping.

## Kết thúc Tier 2 — Bài tiếp theo

- **Hoàn thành Tier 2 — Collision.** Bạn đã đi từ phát hiện va chạm tới một solver tiếp xúc ổn định kiểu Box2D.
- **Tier 3 — Systems bắt đầu tại:** [Particle Systems](../../03-Systems/lesson-01-particle-systems/) — mô phỏng nhiều thực thể quy mô lớn.
- Ôn lại: [L09 — Collision Response (Impulse)](../lesson-04-collision-response-impulse/) · [L04 — Forces](../../01-Motion/lesson-04-forces-gravity-drag-friction/) · [Physics — Rigid Body](../../../Physics/01-Mechanics/lesson-07-rigid-body/).
