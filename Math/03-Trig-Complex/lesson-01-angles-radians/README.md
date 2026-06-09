# Lesson 01 — Góc & Radian

## Mục tiêu

- Hiểu **radian** là gì và vì sao toán học cấp cao bỏ độ, dùng radian.
- Quy đổi **độ ↔ radian** thành thạo.
- Hiểu **đường tròn lượng giác đơn vị** — nền tảng để định nghĩa sin, cos.
- Biết **góc lượng giác** (có dấu, vượt $360^\circ$) khác góc hình học thế nào.

## Kiến thức tiền đề

- [Tier 2 — Geometry](../../02-Geometry/) (đặc biệt L03 về đường tròn).

---

## 1. Vì sao cần đơn vị mới?

💡 **Câu hỏi**: Độ đã quen, vì sao phải học radian?

**Câu trả lời ngắn**: Độ là quy ước **tùy ý** (người Babylon chia vòng tròn thành 360 vì lịch họ ~360 ngày). Radian là đơn vị **tự nhiên của toán học** — định nghĩa trực tiếp từ hình học, không "chế" ra.

**Hệ quả thực tế**:
- Đạo hàm $(\sin x)' = \cos x$ CHỈ đúng khi x tính bằng radian. Nếu dùng độ, công thức thành $(\sin x^\circ)' = \frac{\pi}{180}\cdot\cos x^\circ$ — xấu, có hằng số thừa.
- Khai triển Taylor $\sin x = x - \frac{x^3}{6} + \ldots$ CHỈ đúng với radian.
- Trong vật lý: vận tốc góc $\omega$ rad/s, không bao giờ độ/s.

⟶ **Radian = ngôn ngữ chuẩn từ Calculus trở lên**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Radian nhỏ hơn hay lớn hơn độ?"* $1$ rad $\approx 57.3^\circ$, nên $1$ rad **lớn hơn** $1^\circ$. Cả vòng $360^\circ = 2\pi \approx 6.28$ rad → một số rad nhỏ "ôm" được một góc lớn.
- *"Máy tính bỏ túi của tôi để chế độ DEG, có sai không?"* Khi chỉ tính $\sin 30^\circ$ thì DEG tiện. Nhưng làm Calculus (đạo hàm, Taylor) bắt buộc RAD. Nhập $\sin(1)$ ở chế độ RAD ra $0.841$, ở DEG ra $0.0175$ — khác hẳn. Đây là lỗi #1 khi tính toán.
- *"Vậy độ có bị 'bỏ' hoàn toàn không?"* Không. Kỹ thuật, đo đạc, đời thường vẫn dùng độ vì trực quan. Radian chỉ thống trị **toán giải tích và vật lý lý thuyết**.

⚠ **Lỗi thường gặp — để máy tính sai chế độ DEG/RAD**. Phản ví dụ bằng số: muốn tính $\sin(\frac{\pi}{6}) = 0.5$ nhưng máy đang ở DEG, bạn gõ $\sin(0.5236)$ → máy hiểu là $\sin(0.5236^\circ) = 0.00914$, sai hoàn toàn so với $0.5$. Luôn kiểm tra biểu tượng DEG/RAD trên màn hình trước khi tính.

🔁 **Dừng lại tự kiểm tra**

1. 1 vòng tròn bằng bao nhiêu rad? Nửa vòng?
2. Góc 2 rad lớn hơn hay nhỏ hơn $90^\circ$?

<details><summary>Đáp án</summary>

1. Cả vòng $= 2\pi$ rad $\approx 6.28$; nửa vòng $= \pi$ rad $\approx 3.14$ ($= 180^\circ$).
2. $90^\circ = \frac{\pi}{2} \approx 1.57$ rad. Vì $2 > 1.57$ nên **2 rad lớn hơn** $90^\circ$ (cụ thể 2 rad $\approx 114.6^\circ$).

</details>

### 📝 Tóm tắt mục 1

- Độ là quy ước tùy ý (Babylon, 360 ≈ số ngày/năm); radian là đơn vị **tự nhiên** từ hình học.
- Radian bắt buộc từ Calculus trở lên: $(\sin x)' = \cos x$ và Taylor chỉ đúng với rad.
- $1$ rad $\approx 57.3^\circ$; cả vòng $= 2\pi$ rad; luôn kiểm tra chế độ DEG/RAD trên máy tính.

---

## 2. Định nghĩa radian

### 2.1. Định nghĩa hình học

**1 radian** = góc ở tâm chắn **cung có độ dài bằng bán kính**.

```
  ╱─────╲
 ╱   r   ╲       Cung dài r → góc = 1 rad
│    ●────│  
 ╲   r   ╱      
  ╲─────╱
```

⟶ Cả vòng tròn = chu vi $= 2\pi r$ → góc đầy $= 2\pi$ rad $= 360^\circ$.

> 📐 **Định nghĩa đầy đủ — Radian**
>
> **(a) Là gì**: Đơn vị đo góc **tự nhiên** dựa trên đường tròn. 1 radian = số đo góc mà cung tròn nó chắn có độ dài bằng đúng bán kính. Đây là tỉ số "cung/bán kính" — không có thứ nguyên (không đơn vị thực sự).
>
> **(b) Vì sao cần**: Vì độ ($^\circ$) là quy ước **tùy ý** (Babylon chọn 360 vì lịch họ ~360 ngày). Radian là đơn vị **toán học tự nhiên** — nhờ nó, công thức $(\sin x)' = \cos x$ đúng (nếu dùng độ thì phải nhân thêm $\frac{\pi}{180}$, xấu). Khai triển Taylor $\sin x = x - \frac{x^3}{6} + \ldots$ CHỈ đúng với radian. Mọi giải tích, vật lý cấp cao bắt buộc dùng radian.
>
> **(c) Ví dụ số**: $\pi$ rad $= 180^\circ$ (nửa vòng). $\frac{\pi}{2}$ rad $= 90^\circ$ (góc vuông). $\frac{\pi}{4} = 45^\circ$. $2\pi = 360^\circ$ (1 vòng). $1$ rad $= \frac{180}{\pi} \approx 57.3^\circ$. Cung tròn $r = 10$, góc 2 rad: độ dài cung $= r\cdot\theta = 10\cdot 2 = $ **20**. Diện tích quạt tròn: $\frac{1}{2}\cdot r^2\cdot\theta = \frac{1}{2}\cdot 100\cdot 2 = $ **100**.

### 2.2. Công thức quy đổi

$$180^\circ = \pi \text{ rad}$$

Từ đó:
- **Độ → Rad**: nhân với $\frac{\pi}{180}$.
- **Rad → Độ**: nhân với $\frac{180}{\pi}$.

**Ví dụ số**:
- $90^\circ = 90\cdot\frac{\pi}{180} = $ **$\frac{\pi}{2}$ rad** $\approx 1.5708$.
- $60^\circ = 60\cdot\frac{\pi}{180} = $ **$\frac{\pi}{3}$ rad** $\approx 1.0472$.
- $45^\circ = $ **$\frac{\pi}{4}$** $\approx 0.7854$.
- $30^\circ = $ **$\frac{\pi}{6}$** $\approx 0.5236$.
- $1$ rad $= \frac{180}{\pi} \approx $ **$57.296^\circ$**.
- $2$ rad $\approx 114.59^\circ$.

### 2.3. Bảng các góc phổ biến

| Độ | 0 | 30 | 45 | 60 | 90 | 120 | 135 | 150 | 180 | 270 | 360 |
|----|---|----|----|----|----|-----|-----|-----|-----|-----|-----|
| Rad | $0$ | $\frac{\pi}{6}$ | $\frac{\pi}{4}$ | $\frac{\pi}{3}$ | $\frac{\pi}{2}$ | $\frac{2\pi}{3}$ | $\frac{3\pi}{4}$ | $\frac{5\pi}{6}$ | $\pi$ | $\frac{3\pi}{2}$ | $2\pi$ |

💡 **Mẹo nhớ**: $\pi$ = nửa vòng, $\frac{\pi}{2}$ = ¼ vòng (góc vuông), $\frac{\pi}{4} = 45^\circ$, $\frac{\pi}{6} = 30^\circ$.

**Verify công thức quy đổi (cả 2 chiều)**: lấy $90^\circ$. Độ→rad: $90\cdot\frac{\pi}{180} = \frac{\pi}{2}$. Rad→độ ngược lại: $\frac{\pi}{2}\cdot\frac{180}{\pi} = 90^\circ$ ✓ — hai phép là nghịch đảo của nhau, khớp.

⚠ **Lỗi thường gặp — nhân/chia nhầm chiều hệ số**. Quy tắc gọn: đi từ độ (đơn vị to, nhiều con số) sang rad (đơn vị nhỏ về con số) thì **nhân $\frac{\pi}{180}$** (làm số bé lại); chiều ngược **nhân $\frac{180}{\pi}$**. Phản ví dụ: đổi $60^\circ$ mà lỡ nhân $\frac{180}{\pi}$ ra $60\cdot 57.3 \approx 3438$ rad — vô lý (lớn hơn cả vòng tròn). Đúng phải $60\cdot\frac{\pi}{180} = \frac{\pi}{3} \approx 1.05$ rad.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao kết quả hay để ở dạng $\frac{\pi}{6}$ mà không phải số thập phân $0.5236$?"* Vì dạng $\frac{\pi}{6}$ **chính xác tuyệt đối**, còn $0.5236$ đã làm tròn. Trong toán ưu tiên dạng phân số của $\pi$; chỉ đổi sang thập phân khi cần con số đo đạc cụ thể.
- *"Góc âm như $-\frac{\pi}{3}$ đổi ra độ thế nào?"* Dấu giữ nguyên: $-\frac{\pi}{3} \cdot \frac{180}{\pi} = -60^\circ$. Góc âm = quay theo chiều kim đồng hồ (xem mục 4).

🔁 **Dừng lại tự kiểm tra**

1. Đổi $120^\circ$ sang radian.
2. Đổi $\frac{7\pi}{6}$ rad sang độ.

<details><summary>Đáp án</summary>

1. $120\cdot\frac{\pi}{180} = \frac{2\pi}{3}$ rad $\approx 2.094$.
2. $\frac{7\pi}{6}\cdot\frac{180}{\pi} = \frac{7\cdot 180}{6} = 210^\circ$.

</details>

### 📝 Tóm tắt mục 2

- $180^\circ = \pi$ rad là gốc quy đổi; mọi công thức suy từ đây.
- Độ→rad: $\times\frac{\pi}{180}$; rad→độ: $\times\frac{180}{\pi}$ (hai phép nghịch đảo nhau).
- Thuộc bảng góc đặc biệt ($\frac{\pi}{6}, \frac{\pi}{4}, \frac{\pi}{3}, \frac{\pi}{2}, \pi$) — dùng liên tục về sau.

---

## 3. Đường tròn lượng giác đơn vị

💡 **Là gì**: Đường tròn tâm O, **bán kính = 1**, được dùng để định nghĩa sin, cos cho **mọi góc** (không chỉ trong tam giác vuông).

```
       y
       │   ●(cos θ, sin θ)
       │  ╱
       │ ╱ θ
       │╱──────────── x
      O
```

- Lấy điểm M trên đường tròn, đo góc $\theta$ từ Ox quay ngược chiều kim đồng hồ.
- **$\cos\theta$** = hoành độ M.
- **$\sin\theta$** = tung độ M.

**Hệ quả**: $\cos^2\theta + \sin^2\theta = 1$ (do M nằm trên đường tròn bán kính 1).

❓ **Câu hỏi tự nhiên**: Vì sao đường tròn này lại "đơn vị"?
**Trả lời**: Vì bán kính = 1, nên cos/sin là tọa độ trực tiếp, không cần chia r. Đơn giản hóa mọi công thức.

**Verify $\cos^2\theta + \sin^2\theta = 1$ bằng 4 góc cụ thể**:
- $\theta = 0$: $M(1, 0)$ → $1^2 + 0^2 = 1$ ✓.
- $\theta = \frac{\pi}{6}$ ($30^\circ$): $M(\frac{\sqrt{3}}{2}, \frac{1}{2})$ → $(\frac{\sqrt{3}}{2})^2 + (\frac{1}{2})^2 = \frac{3}{4} + \frac{1}{4} = 1$ ✓.
- $\theta = \frac{\pi}{4}$ ($45^\circ$): $M(\frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2})$ → $\frac{1}{2} + \frac{1}{2} = 1$ ✓.
- $\theta = \frac{2\pi}{3}$ ($120^\circ$): $M(-\frac{1}{2}, \frac{\sqrt{3}}{2})$ → $\frac{1}{4} + \frac{3}{4} = 1$ ✓ (dù toạ độ x âm, bình phương vẫn cho 1).

⚠ **Lỗi thường gặp — đảo vai trò cos và sin**. cos = **hoành độ** (x, đi ngang), sin = **tung độ** (y, đi dọc). Phản ví dụ: tại $\theta = \frac{\pi}{2}$ (điểm trên cùng $(0, 1)$), người mới hay viết $\cos\frac{\pi}{2} = 1$ (nhầm) — sai, vì hoành độ điểm đó là 0 → $\cos\frac{\pi}{2} = 0$, còn $\sin\frac{\pi}{2} = 1$.

🔁 **Dừng lại tự kiểm tra**

1. Điểm ứng với $\theta = \pi$ nằm ở đâu? $\cos\pi$ và $\sin\pi$ bằng mấy?
2. Một điểm trên đường tròn đơn vị có hoành độ 0.6. Tung độ có thể bằng mấy?

<details><summary>Đáp án</summary>

1. $\theta = \pi$ → điểm $(-1, 0)$ (cực trái). $\cos\pi = -1$, $\sin\pi = 0$.
2. $0.6^2 + y^2 = 1$ → $y^2 = 0.64$ → $y = \pm 0.8$ (hai điểm: trên và dưới trục hoành).

</details>

### 📝 Tóm tắt mục 3

- Đường tròn đơn vị: tâm O, bán kính 1; mở rộng định nghĩa sin/cos cho mọi góc.
- $\cos\theta$ = hoành độ (x), $\sin\theta$ = tung độ (y) của điểm M ứng với góc $\theta$.
- Vì M nằm trên đường tròn r = 1 nên luôn có $\cos^2\theta + \sin^2\theta = 1$.

---

## 4. Góc lượng giác — Có dấu, có thể vượt 360°

💡 **Trực giác / Hình dung**: nghĩ góc như **số vòng + phần lẻ một người đi bộ trên đường tròn**. Đi ngược kim đồng hồ = góc dương, đi xuôi kim đồng hồ = góc âm. Đi 1 vòng rưỡi ($540^\circ$) thì "đứng" ở chỗ giống như mới đi nửa vòng ($180^\circ$) — vị trí trùng nhau, chỉ khác số vòng đã đi. Góc lượng giác ghi lại **cả hành trình**, không chỉ điểm đến.

**Khác góc hình học** (luôn từ 0 đến $180^\circ$):

- **Chiều dương**: ngược chiều kim đồng hồ.
- **Chiều âm**: thuận chiều kim đồng hồ. $\theta = -30^\circ$ tương đương quay $30^\circ$ xuống.
- **Vượt $360^\circ$**: $450^\circ = 360^\circ + 90^\circ = $ 1 vòng $+ 90^\circ$. Cùng vị trí với $90^\circ$.
- **Tổng quát**: $\theta$ và $\theta + k\cdot 2\pi$ ($k \in \mathbb{Z}$) có cùng điểm đại diện.

⟶ Đây là lý do sin, cos là **hàm tuần hoàn** chu kỳ $2\pi$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$450^\circ$ và $90^\circ$ cùng vị trí — vậy chúng có là 'cùng một góc' không?"* Cùng **vị trí điểm** trên đường tròn (nên sin/cos bằng nhau), nhưng **khác góc** ($450^\circ = 90^\circ + $ 1 vòng). Khi chỉ quan tâm sin/cos thì coi như nhau; khi quan tâm "đã quay mấy vòng" thì khác.
- *"Làm sao đưa một góc to như $1000^\circ$ về khoảng $[0^\circ, 360^\circ)$?"* Trừ bội của 360 cho tới khi lọt khoảng: $1000 - 2\cdot 360 = 1000 - 720 = 280^\circ$.
- *"Góc âm $-30^\circ$ tương đương góc dương nào?"* Cộng 360: $-30 + 360 = 330^\circ$. Cùng vị trí.

⚠ **Lỗi thường gặp — cộng/trừ nhầm $360^\circ$ với $180^\circ$ (hay $2\pi$ với $\pi$)**. Hai góc trùng vị trí cách nhau **bội của $360^\circ$ ($2\pi$)**, KHÔNG phải $180^\circ$. Phản ví dụ: $30^\circ$ và $210^\circ$ cách nhau $180^\circ$ nhưng KHÔNG cùng vị trí ($210^\circ$ ở phần tư III, đối tâm với $30^\circ$). Còn $30^\circ$ và $30+360=390^\circ$ mới cùng vị trí.

🔁 **Dừng lại tự kiểm tra**

1. Đưa góc $800^\circ$ về khoảng $[0^\circ, 360^\circ)$.
2. Góc $-\frac{\pi}{3}$ tương đương góc dương nào trong $[0, 2\pi)$?

<details><summary>Đáp án</summary>

1. $800 - 2\cdot 360 = 800 - 720 = 80^\circ$.
2. $-\frac{\pi}{3} + 2\pi = -\frac{\pi}{3} + \frac{6\pi}{3} = \frac{5\pi}{3}$.

</details>

### 📝 Tóm tắt mục 4

- Góc lượng giác **có dấu**: dương = ngược kim đồng hồ, âm = xuôi kim đồng hồ.
- Có thể vượt $360^\circ$ (nhiều vòng); $\theta$ và $\theta + k\cdot 2\pi$ trùng vị trí điểm.
- Hệ quả: sin, cos tuần hoàn chu kỳ $2\pi$. Đưa góc về khoảng chuẩn bằng cách $\pm k\cdot 360^\circ$ ($\pm k\cdot 2\pi$).

---

## 5. Độ dài cung — Lý do thật sự yêu radian

💡 **Trực giác / Hình dung**: nhớ lại định nghĩa "1 rad = cung dài bằng 1 bán kính". Vậy nếu góc là $\theta$ rad thì cung dài $\theta$ lần bán kính → $\ell = r\cdot\theta$. Công thức này gọn **chính vì** radian được định nghĩa đúng theo cách đó — nó là "phần thưởng" của việc chọn đơn vị tự nhiên.

Cho cung tròn bán kính r, chắn góc $\theta$ (radian):

$$\ell = r \cdot \theta$$

**4 ví dụ số đa dạng**:
- $r = 5$, $\theta = \frac{\pi}{3}$: $\ell = 5\cdot\frac{\pi}{3} \approx 5.24$.
- $r = 1$ (đường tròn đơn vị), $\theta = \pi$: $\ell = \pi \approx 3.14$ (đúng nửa chu vi $\frac{2\pi}{2}$).
- $r = 10$, $\theta = 2$: $\ell = 20$; diện tích quạt $S = \frac{1}{2}\cdot 100\cdot 2 = 100$.
- Cả vòng: $\theta = 2\pi$ → $\ell = r\cdot 2\pi = 2\pi r$ = chu vi ✓ (khớp công thức chu vi quen thuộc).

⟶ **Đẹp đến mức nào**: Nếu dùng độ, công thức là $\ell = r \cdot \theta \cdot \frac{\pi}{180}$ — xấu, có hằng số $\frac{\pi}{180}$ thừa. Radian thiết kế ra chính là để công thức này gọn.

**Diện tích quạt tròn**: $S = \frac{1}{2} \cdot r^2 \cdot \theta$ (radian).

**Verify công thức quạt khớp diện tích hình tròn**: cả hình tròn ứng $\theta = 2\pi$ → $S = \frac{1}{2}\cdot r^2\cdot 2\pi = \pi r^2$ ✓ — đúng công thức diện tích hình tròn quen thuộc.

⚠ **Lỗi thường gặp — quên đổi góc về radian trước khi dùng $\ell = r\theta$, $S = \frac{1}{2}r^2\theta$**. Hai công thức này CHỈ đúng khi $\theta$ là radian. Phản ví dụ: cung $r = 5$, góc $60^\circ$. Nếu cắm thẳng 60: $\ell = 5\cdot 60 = 300$ (vô lý, dài hơn cả chu vi $2\pi\cdot 5 \approx 31.4$). Đúng phải đổi $60^\circ = \frac{\pi}{3}$ trước: $\ell = 5\cdot\frac{\pi}{3} \approx 5.24$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tại sao diện tích quạt có ½ mà độ dài cung thì không?"* Vì quạt là "tam giác cong": diện tích ~ ½·đáy·cao, ở đây đóng vai như $\frac{1}{2}\cdot$(cung)$\cdot$(bán kính) $= \frac{1}{2}\cdot(r\theta)\cdot r = \frac{1}{2}r^2\theta$. Hệ số ½ là dấu vết của diện tích tam giác.
- *"Cung và dây cung khác nhau không?"* Khác. **Cung** = phần đường tròn (cong), dài $r\theta$. **Dây cung** = đoạn thẳng nối 2 đầu (thẳng), dài $2r\cdot\sin(\frac{\theta}{2})$. Với $\theta$ nhỏ hai cái xấp xỉ nhau.

🔁 **Dừng lại tự kiểm tra**

1. Bánh xe bán kính 0.3 m quay góc 4 rad. Một điểm trên vành đi được quãng đường bao nhiêu?
2. Quạt tròn $r = 6$, góc $90^\circ$. Diện tích?

<details><summary>Đáp án</summary>

1. $\ell = r\theta = 0.3\cdot 4 = 1.2$ m.
2. Đổi $90^\circ = \frac{\pi}{2}$. $S = \frac{1}{2}\cdot 6^2\cdot\frac{\pi}{2} = \frac{1}{2}\cdot 36\cdot\frac{\pi}{2} = 9\pi \approx 28.3$.

</details>

### 📝 Tóm tắt mục 5

- $\ell = r\cdot\theta$ và $S = \frac{1}{2}\cdot r^2\cdot\theta$ — **$\theta$ phải là radian**.
- Công thức gọn chính vì radian định nghĩa theo "cung = bán kính".
- Kiểm tra biên: $\theta = 2\pi$ cho lại chu vi $2\pi r$ và diện tích $\pi r^2$.

---

## 6. Bài tập

### Bài tập

**Bài 1**: Đổi $270^\circ$ sang radian.

**Bài 2**: Đổi $\frac{5\pi}{6}$ rad sang độ.

**Bài 3**: Cung tròn $r = 10$, $\theta = 2$ rad. Tìm độ dài cung và diện tích hình quạt.

**Bài 4**: Vẽ điểm tương ứng với góc $\theta = \frac{5\pi}{4}$ trên đường tròn lượng giác. Tọa độ?

**Bài 5**: Hai góc $750^\circ$ và $1110^\circ$ có "cùng vị trí" trên đường tròn không?

### Lời giải

**Bài 1**: $270 \cdot \frac{\pi}{180} = $ **$\frac{3\pi}{2}$ rad** $\approx 4.712$.

**Bài 2**: $\frac{5\pi}{6}\cdot\frac{180}{\pi} = \frac{5\cdot 180}{6} = $ **$150^\circ$**.

**Bài 3**:  
- $\ell = r\cdot\theta = 10\cdot 2 = $ **20**.  
- $S = \frac{1}{2}\cdot r^2\cdot\theta = \frac{1}{2}\cdot 100\cdot 2 = $ **100**.

**Bài 4**: $\frac{5\pi}{4} = \pi + \frac{\pi}{4} = 180^\circ + 45^\circ = 225^\circ$ (góc phần tư III). $\cos = -\frac{\sqrt{2}}{2} \approx -0.707$, $\sin = -\frac{\sqrt{2}}{2}$. Tọa độ **(-0.707, -0.707)**.

**Bài 5**:  
- $750^\circ = 360\cdot 2 + 30^\circ$ → cùng vị trí với $30^\circ$.  
- $1110^\circ = 360\cdot 3 + 30^\circ$ → cùng vị trí với $30^\circ$.  
- $\implies$ **Có**, cả 2 đều tương đương $30^\circ$.

---

## 7. Bài tiếp theo

[Lesson 02 — sin, cos, tan](../lesson-02-sin-cos-tan/) — định nghĩa, đồ thị, tính chất.

## 📝 Tổng kết

1. **Radian** = đơn vị tự nhiên (cung = bán kính).
2. **$180^\circ = \pi$ rad**.
3. **Đường tròn lượng giác đơn vị**: cos, sin = tọa độ điểm trên đường tròn r=1.
4. **Góc lượng giác**: có dấu, có thể vượt $2\pi$. Cộng/trừ $2\pi$ không đổi vị trí.
5. **$\ell = r\theta$**, **$S = \frac{1}{2}r^2\theta$** ($\theta$ tính bằng radian).
