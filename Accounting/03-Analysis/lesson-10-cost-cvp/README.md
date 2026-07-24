# Lesson 10 — Kế toán chi phí & Phân tích CVP (Cost-Volume-Profit)

> Một câu hỏi sống còn của mọi doanh nghiệp: **bán bao nhiêu thì hết lỗ, và bán bao nhiêu thì đạt mức lãi mình muốn?** Phân tích CVP trả lời bằng ba con số: định phí, biến phí và số dư đảm phí.

## Mục tiêu học tập

- Phân biệt **định phí (fixed cost)** và **biến phí (variable cost)** — kèm ≥ 4 ví dụ mỗi loại và hiểu *vì sao* cách chúng thay đổi theo sản lượng lại khác nhau.
- Tính **số dư đảm phí đơn vị (unit contribution margin)** $= p - v$ và **tỷ lệ số dư đảm phí (CM ratio)**.
- Tính **điểm hòa vốn** theo sản lượng $Q^* = F / \text{CM}$ và theo doanh thu $= F / \text{tỷ lệ CM}$, và **kiểm chứng lợi nhuận = 0** tại đó.
- Tính **sản lượng đạt lợi nhuận mục tiêu** và **biên an toàn (margin of safety)**.

## Kiến thức tiền đề

- Chỉ cần số học cộng/trừ/nhân/chia và khái niệm doanh thu − chi phí = lợi nhuận.
- Nếu chưa rõ "chi phí làm giảm vốn chủ", xem lại [Lesson 01 — Phương trình kế toán](../../01-Fundamentals/lesson-01-accounting-equation/README.md).

> **Quy ước đơn vị trong toàn bài:** tiền tính bằng **nghìn đồng**, sản lượng tính bằng **số sản phẩm**. Ví dụ xuyên suốt: một **quán trà sữa** bán ly trà sữa.

---

## 1. Hai loại chi phí: định phí và biến phí

> 💡 **Trực giác.** Hãy tưởng tượng bạn mở quán trà sữa. Có những khoản **phải trả dù bán 0 ly hay 1000 ly** — tiền thuê mặt bằng, lương quản lý. Và có những khoản **chỉ phát sinh khi bán thêm một ly** — trà, sữa, trân châu, cốc nhựa. Nhóm đầu là *định phí*, nhóm sau là *biến phí*. Phân biệt được hai nhóm này là chìa khóa của cả bài.

### 1.1 Biến phí (variable cost)

**(a) Là gì.** Chi phí **thay đổi tỷ lệ thuận với sản lượng** — làm/bán thêm một đơn vị thì tổng biến phí tăng thêm đúng một "suất". Ký hiệu biến phí *đơn vị* là $v$; tổng biến phí ở sản lượng $Q$ là $v \cdot Q$.

**(b) Vì sao cần khái niệm này.** Vì phần chi phí này **co giãn theo doanh số** — muốn dự báo chi phí khi bán nhiều/ít hơn, phải tách riêng nó ra. Gộp chung với định phí sẽ tính sai điểm hòa vốn.

**(c) Ví dụ số cụ thể** (≥ 4, đa dạng): với quán trà sữa, biến phí một ly $v = 24$ nghìn gồm

| Khoản biến phí | /ly | Ghi chú |
|----------------|----:|---------|
| Trà + sữa + đường | 10 | nguyên liệu chính |
| Trân châu, topping | 6 | thêm ly nào tốn ly đó |
| Cốc, nắp, ống hút | 4 | bao bì theo đơn |
| Hoa hồng shipper (đơn online) | 4 | trả theo từng đơn |
| **Tổng biến phí đơn vị** $v$ | **24** | |

Tổng biến phí **thay đổi theo $Q$**: bán 100 ly → $24 \times 100 = 2{,}400$; bán 2000 ly → $24 \times 2000 = 48{,}000$. Nhưng biến phí *trên mỗi ly* thì **không đổi** = 24.

### 1.2 Định phí (fixed cost)

**(a) Là gì.** Chi phí **không đổi trong một khoảng sản lượng** (trong kỳ ngắn hạn) — dù bán bao nhiêu, tổng vẫn bằng $F$. Ký hiệu tổng định phí là $F$.

**(b) Vì sao cần.** Vì đây là "gánh nặng cố định" phải bù trước khi có lãi. Điểm hòa vốn chính là mức doanh số vừa đủ để số dư đảm phí gánh hết $F$.

**(c) Ví dụ số cụ thể** (≥ 4): định phí quán trà sữa $F = 32{,}000$ nghìn/tháng gồm

| Khoản định phí | /tháng | Ghi chú |
|----------------|-------:|---------|
| Thuê mặt bằng | 18,000 | trả dù đóng cửa vẫn mất |
| Lương quản lý (cố định) | 8,000 | không theo số ly |
| Khấu hao máy móc, bàn ghế | 4,000 | phân bổ đều mỗi tháng |
| Internet + phần mềm bán hàng | 2,000 | thuê bao cố định |
| **Tổng định phí** $F$ | **32,000** | |

> ⚠ **Lỗi thường gặp #1 — "định phí không đổi trên mỗi sản phẩm".** **Sai.** Tổng định phí cố định, nhưng *định phí phân bổ trên mỗi ly* **giảm** khi bán nhiều hơn: bán 1000 ly → $32{,}000/1000 = 32$ nghìn/ly; bán 4000 ly → $32{,}000/4000 = 8$ nghìn/ly. Đây chính là "lợi thế quy mô".

> ⚠ **Lỗi thường gặp #2 — nhầm biến phí và định phí.** Tiền điện **chạy máy làm đá theo sản lượng** là biến phí; tiền điện **thắp sáng, điều hòa cả quán** là định phí. Nhiều khoản là *chi phí hỗn hợp (mixed cost)* — có phần cố định + phần biến đổi; khi phân tích CVP phải tách đôi.

**Bảng so sánh nhanh:**

| | Định phí (F) | Biến phí ($v \cdot Q$) |
|---|---|---|
| Tổng khi $Q$ tăng | **Không đổi** | **Tăng** tỷ lệ thuận |
| Trên mỗi đơn vị | **Giảm** | **Không đổi** ($= v$) |
| Ví dụ | thuê nhà, khấu hao | nguyên liệu, hoa hồng |

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Quán bán 2000 ly. Tổng biến phí bằng bao nhiêu? Định phí phân bổ mỗi ly bằng bao nhiêu?
> 2. Nếu bán gấp đôi (4000 ly), khoản nào trên-mỗi-ly thay đổi, khoản nào không?
>
> <details><summary>Đáp án</summary>
>
> 1. Tổng biến phí $= 24 \times 2000 = 48{,}000$. Định phí/ly $= 32{,}000/2000 = 16$ nghìn.
> 2. Biến phí/ly **giữ nguyên** 24. Định phí/ly **giảm** còn $32{,}000/4000 = 8$ nghìn. Vì thế bán càng nhiều, chi phí trung bình mỗi ly càng thấp.
> </details>

> 📝 **Tóm tắt mục 1.**
> - Biến phí: tổng tăng theo $Q$, đơn vị không đổi $= v$.
> - Định phí: tổng không đổi $= F$, đơn vị *giảm* khi $Q$ tăng.
> - Chi phí hỗn hợp phải tách thành phần cố định + biến đổi trước khi phân tích.

---

## 2. Số dư đảm phí (Contribution Margin)

> 💡 **Trực giác.** Mỗi ly trà sữa bán ra thu về 40 nghìn nhưng "ngốn" 24 nghìn biến phí, nên **để lại 16 nghìn**. 16 nghìn này chưa phải lãi — nó **đóng góp (contribute)** vào việc trả định phí 32,000. Sau khi đủ ly để trả hết định phí, mỗi 16 nghìn tiếp theo mới thành lãi thật. Đó là lý do gọi là *số dư đảm phí*.

**(a) Là gì.** **Số dư đảm phí đơn vị** là phần còn lại của giá bán sau khi trừ biến phí đơn vị:

$$\text{CM} = p - v$$

**(b) Vì sao cần.** Vì đây là "tốc độ" mỗi sản phẩm gánh định phí và tạo lãi. Lợi nhuận toàn kỳ viết gọn thành:

$$\pi = \underbrace{(p - v)}_{\text{CM}} \cdot Q - F = \text{CM} \cdot Q - F$$

Công thức này là **trục xương sống** của cả bài — mọi con số hòa vốn, lợi nhuận mục tiêu, biên an toàn đều suy ra từ đây.

**(c) Ví dụ số cụ thể** (≥ 4 sản phẩm, đa dạng cao/thấp):

| Sản phẩm | Giá bán $p$ | Biến phí $v$ | CM $= p-v$ | Tỷ lệ CM $= \text{CM}/p$ |
|----------|-----:|-----:|-----:|-----:|
| Ly trà sữa | 40 | 24 | 16 | 40% |
| Ổ bánh mì | 25 | 15 | 10 | 40% |
| Áo thun | 200 | 120 | 80 | 40% |
| Vé xem phim | 90 | 18 | 72 | 80% |
| Phần mềm tải về | 100 | 2 | 98 | 98% |

**Tỷ lệ số dư đảm phí (CM ratio)** = CM chia cho giá bán = phần trăm *mỗi đồng doanh thu* biến thành số dư đảm phí:

$$\text{tỷ lệ CM} = \frac{\text{CM}}{p} = \frac{p - v}{p}$$

Với ly trà sữa: tỷ lệ CM $= 16/40 = 0{,}4 = 40\%$ → cứ 100 đồng doanh thu thì 40 đồng đóng góp gánh định phí + tạo lãi, 60 đồng trả biến phí.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"CM có phải là lợi nhuận không?"* → **Không.** CM là phần đóng góp *trước khi* trừ định phí. Chỉ khi $\text{CM}\cdot Q > F$ mới có lãi.
> - *"Vé xem phim CM 72, ly trà sữa CM 16 — vé lãi hơn?"* → Chưa chắc, còn tùy định phí và số lượng bán. CM cao chỉ nói *mỗi đơn vị gánh định phí nhanh hơn*.
> - *"Vì sao dùng tỷ lệ CM thay vì CM đơn vị?"* → Khi bán *nhiều loại sản phẩm* hoặc chỉ có số liệu doanh thu (không có số lượng), tỷ lệ CM cho phép tính hòa vốn theo **doanh thu** trực tiếp (mục 3).

**Walk-through số thật** (quán trà sữa, $p=40,\ v=24,\ F=32{,}000$):

| Sản lượng $Q$ | Doanh thu $pQ$ | Tổng CM $=16Q$ | Trừ định phí $F$ | Lợi nhuận $\pi$ |
|-----:|-----:|-----:|-----:|-----:|
| 1,000 | 40,000 | 16,000 | −32,000 | **−16,000** (lỗ) |
| 2,000 | 80,000 | 32,000 | −32,000 | **0** (hòa vốn) |
| 2,500 | 100,000 | 40,000 | −32,000 | **+8,000** (lãi) |
| 3,000 | 120,000 | 48,000 | −32,000 | **+16,000** (lãi) |

Nhìn cột cuối: lợi nhuận tăng đúng **16 nghìn mỗi ly** bán thêm (đúng bằng CM). Đó là ý nghĩa "mỗi ly đóng góp 16".

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Một sản phẩm giá 50, biến phí 35. CM và tỷ lệ CM bằng bao nhiêu?
> 2. Nếu định phí là 30,000 và bán 3000 sản phẩm, lãi/lỗ bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. CM $= 50 - 35 = 15$; tỷ lệ CM $= 15/50 = 0{,}3 = 30\%$.
> 2. $\pi = 15 \times 3000 - 30{,}000 = 45{,}000 - 30{,}000 = +15{,}000$ (lãi).
> </details>

> 📝 **Tóm tắt mục 2.**
> - CM đơn vị $= p - v$; tỷ lệ CM $= \text{CM}/p$.
> - Lợi nhuận: $\pi = \text{CM}\cdot Q - F$ — công thức gốc của toàn bài.
> - CM **không** là lợi nhuận; nó là phần đóng góp gánh định phí trước, tạo lãi sau.

---

## 3. Điểm hòa vốn (Break-even point)

> 💡 **Trực giác.** Định phí như một "cái hố" 32,000 phải lấp đầy. Mỗi ly ném 16 nghìn xuống hố. **Bao nhiêu ly thì lấp đầy hố?** $32{,}000 \div 16 = 2000$ ly. Đúng 2000 ly thì không lỗ không lãi — đó là *điểm hòa vốn*. Ly thứ 2001 trở đi, 16 nghìn không rơi vào hố nữa mà thành lãi.

### 3.1 Hòa vốn theo sản lượng

Đặt lợi nhuận $\pi = 0$ trong công thức gốc và giải:

$$\begin{aligned}
\pi = \text{CM}\cdot Q - F &= 0 \\
\text{CM}\cdot Q &= F \\
Q^* &= \frac{F}{\text{CM}} = \frac{F}{p - v}
\end{aligned}$$

Với quán trà sữa: $Q^* = \dfrac{32{,}000}{16} = \mathbf{2000}$ **ly**.

### 3.2 Hòa vốn theo doanh thu

Nhân hai vế với giá bán, hoặc chia định phí cho tỷ lệ CM:

$$\text{Doanh thu hòa vốn} = p \cdot Q^* = \frac{F}{\text{tỷ lệ CM}}$$

Với quán trà sữa: $\dfrac{32{,}000}{0{,}4} = \mathbf{80{,}000}$ nghìn = **80 triệu**.

**Kiểm chứng bằng cách khác:** $p \cdot Q^* = 40 \times 2000 = 80{,}000$ ✓ — hai cách cho cùng kết quả.

### 3.3 Kiểm chứng lợi nhuận = 0 tại điểm hòa vốn

Đây là bước quan trọng nhất — **xác nhận** rằng tại $Q^* = 2000$, lợi nhuận đúng bằng 0:

$$\begin{aligned}
\text{Doanh thu} &= p \cdot Q^* = 40 \times 2000 = 80{,}000 \\
\text{Tổng chi phí} &= F + v \cdot Q^* = 32{,}000 + 24 \times 2000 = 32{,}000 + 48{,}000 = 80{,}000 \\
\pi &= 80{,}000 - 80{,}000 = \mathbf{0} \checkmark
\end{aligned}$$

Doanh thu **bằng đúng** tổng chi phí → lợi nhuận = 0. **Đây chính là định nghĩa điểm hòa vốn.** Trên đồ thị CVP (xem [visualization.html](./visualization.html)), đây là điểm đường doanh thu cắt đường tổng chi phí.

> ⚠ **Lỗi thường gặp — làm tròn sai chiều.** Nếu $Q^*$ ra số lẻ (vd $517{,}2$), **phải làm tròn LÊN** ($518$), vì bán 517 sản phẩm vẫn còn lỗ một chút. Làm tròn xuống sẽ báo hòa vốn "ảo".

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Giảm giá bán thì điểm hòa vốn đổi thế nào?"* → Giảm $p$ → CM giảm → $Q^*$ **tăng** (phải bán nhiều hơn để lấp hố). Thử trên viz bằng slider giá bán.
> - *"Tăng định phí (thuê mặt bằng to hơn) thì sao?"* → $F$ tăng → hố sâu hơn → $Q^*$ tăng.
> - *"CM bằng 0 hoặc âm thì sao?"* → Nếu $p \le v$, mỗi ly *không đóng góp* gì (thậm chí lỗ thêm) → **không bao giờ hòa vốn**, bán càng nhiều lỗ càng nặng.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. $p=60,\ v=36,\ F=24{,}000$. Sản lượng và doanh thu hòa vốn?
> 2. Kiểm chứng lợi nhuận = 0 tại điểm đó.
>
> <details><summary>Đáp án</summary>
>
> 1. CM $= 60-36 = 24$; tỷ lệ CM $= 24/60 = 0{,}4$. $Q^* = 24{,}000/24 = 1000$. Doanh thu hòa vốn $= 24{,}000/0{,}4 = 60{,}000$ (hoặc $60 \times 1000 = 60{,}000$ ✓).
> 2. DT $= 60 \times 1000 = 60{,}000$; TC $= 24{,}000 + 36 \times 1000 = 60{,}000$; $\pi = 0$ ✓.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Sản lượng hòa vốn: $Q^* = F / \text{CM}$.
> - Doanh thu hòa vốn: $F / \text{tỷ lệ CM}$ (bằng $p \cdot Q^*$).
> - Tại $Q^*$: doanh thu = tổng chi phí → $\pi = 0$ (luôn kiểm chứng lại).
> - CM $\le 0$ → không bao giờ hòa vốn.

---

## 4. Lợi nhuận mục tiêu & Biên an toàn

### 4.1 Sản lượng đạt lợi nhuận mục tiêu

> 💡 **Trực giác.** Hòa vốn là "lấp đầy hố định phí". Lợi nhuận mục tiêu là "lấp đầy hố + xây thêm một tòa lãi". Nên coi lợi nhuận mục tiêu $\pi_{\text{mt}}$ như **định phí phải gánh thêm**:

$$Q_{\text{mt}} = \frac{F + \pi_{\text{mt}}}{\text{CM}}$$

**Ví dụ:** quán trà sữa muốn lãi $\pi_{\text{mt}} = 8{,}000$ nghìn/tháng:

$$Q_{\text{mt}} = \frac{32{,}000 + 8{,}000}{16} = \frac{40{,}000}{16} = \mathbf{2500}\ \text{ly}$$

**Kiểm chứng:** $\pi = \text{CM}\cdot Q - F = 16 \times 2500 - 32{,}000 = 40{,}000 - 32{,}000 = 8{,}000$ ✓ — đúng mức mục tiêu.

Doanh thu tương ứng $= 40 \times 2500 = 100{,}000$ nghìn = 100 triệu.

### 4.2 Biên an toàn (Margin of safety)

**(a) Là gì.** Khoảng cách từ **doanh số dự kiến/thực tế** xuống tới **điểm hòa vốn** — "đệm" doanh số có thể mất trước khi bắt đầu lỗ.

**(b) Vì sao cần.** Điểm hòa vốn cho biết ranh giới lỗ/lãi, nhưng không cho biết ta đang *an toàn* cỡ nào. Biên an toàn 5% (dễ tụt xuống lỗ) khác hẳn 40% (rất vững). Nó đo **rủi ro**.

**(c) Công thức** (ba dạng):

$$\begin{aligned}
\text{Biên an toàn (sản lượng)} &= Q_{\text{thực}} - Q^* \\
\text{Biên an toàn (doanh thu)} &= \text{DT thực} - \text{DT hòa vốn} \\
\text{Biên an toàn (\%)} &= \frac{Q_{\text{thực}} - Q^*}{Q_{\text{thực}}}
\end{aligned}$$

**Ví dụ số:** quán bán thực tế $Q_{\text{thực}} = 2500$ ly (hòa vốn $Q^* = 2000$):

- Biên an toàn (sản lượng) $= 2500 - 2000 = \mathbf{500}$ ly.
- Biên an toàn (doanh thu) $= 100{,}000 - 80{,}000 = \mathbf{20{,}000}$ nghìn.
- Biên an toàn (%) $= 500 / 2500 = \mathbf{20\%}$.

**Ý nghĩa:** doanh số có thể **giảm tới 20%** trước khi quán bắt đầu lỗ. Dưới ngưỡng đó là vùng nguy hiểm.

> ⚠ **Lỗi thường gặp.** Lấy % biên an toàn chia cho $Q^*$ thay vì $Q_{\text{thực}}$. Đúng là chia cho **doanh số thực tế** (mẫu số là cái ta đang đứng, không phải điểm hòa vốn).

> 🔁 **Dừng lại tự kiểm tra.**
> Quán dự kiến bán 3200 ly ($Q^* = 2000$, $p=40$). Biên an toàn theo sản lượng, doanh thu và %?
>
> <details><summary>Đáp án</summary>
>
> - Sản lượng: $3200 - 2000 = 1200$ ly.
> - Doanh thu: $(3200 - 2000)\times 40 = 48{,}000$ nghìn.
> - %: $1200/3200 = 37{,}5\%$. Rất an toàn — doanh số phải rớt hơn một phần ba mới lỗ.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Lợi nhuận mục tiêu: $Q_{\text{mt}} = (F + \pi_{\text{mt}}) / \text{CM}$ — coi lãi mục tiêu như định phí cộng thêm.
> - Biên an toàn = phần doanh số trên điểm hòa vốn; đo bằng sản lượng, doanh thu hoặc %.
> - % biên an toàn = (thực − hòa vốn) / **thực tế** → càng lớn càng ít rủi ro.

---

## 5. Bài tập

**Bài 1 (cơ bản).** Xưởng làm nến thơm: giá bán 120 nghìn/hũ, biến phí 72 nghìn/hũ, định phí 24,000 nghìn/tháng.
a) Tính CM đơn vị và tỷ lệ CM.
b) Sản lượng hòa vốn?
c) Doanh thu hòa vốn (tính bằng 2 cách), và kiểm chứng lợi nhuận = 0.

**Bài 2 (lợi nhuận mục tiêu).** Cùng xưởng nến, chủ muốn lãi 12,000 nghìn/tháng. Cần bán bao nhiêu hũ? Doanh thu tương ứng? Kiểm chứng lại lợi nhuận.

**Bài 3 (biên an toàn).** Xưởng dự kiến bán 750 hũ/tháng. Tính biên an toàn theo sản lượng, doanh thu và %. Giải thích ý nghĩa con số %.

**Bài 4 (vận dụng — đòn bẩy chi phí).** Xưởng cân nhắc **tự động hóa**: mua máy rót nến làm định phí tăng lên $F' = 40{,}000$ nhưng biến phí giảm còn $v' = 40$ (giá bán giữ 120). 
a) Điểm hòa vốn mới? So với cũ.
b) Ở mức 750 hũ, phương án nào lãi hơn?
c) Ở mức 400 hũ (dưới hòa vốn), phương án nào lỗ nặng hơn? Rút ra bài học.

---

## 6. Lời giải chi tiết

**Bài 1.** Cách tiếp cận: áp thẳng công thức CM → hòa vốn → kiểm chứng.
- a) CM $= 120 - 72 = \mathbf{48}$ nghìn/hũ. Tỷ lệ CM $= 48/120 = 0{,}4 = \mathbf{40\%}$.
- b) $Q^* = F/\text{CM} = 24{,}000/48 = \mathbf{500}$ hũ.
- c) Cách 1: $F/\text{tỷ lệ CM} = 24{,}000/0{,}4 = 60{,}000$. Cách 2: $p \cdot Q^* = 120 \times 500 = 60{,}000$ ✓. Kiểm chứng: TC $= 24{,}000 + 72\times500 = 24{,}000 + 36{,}000 = 60{,}000 = $ DT → $\pi = 0$ ✓.

**Bài 2.** Coi lãi mục tiêu như định phí cộng thêm:
$$Q_{\text{mt}} = \frac{F + \pi_{\text{mt}}}{\text{CM}} = \frac{24{,}000 + 12{,}000}{48} = \frac{36{,}000}{48} = \mathbf{750}\ \text{hũ}.$$
Doanh thu $= 120 \times 750 = \mathbf{90{,}000}$ nghìn. Kiểm chứng: $\pi = 48\times750 - 24{,}000 = 36{,}000 - 24{,}000 = 12{,}000$ ✓ đúng mục tiêu.

**Bài 3.** Cách tiếp cận: lấy doanh số thực − điểm hòa vốn.
- Biên an toàn (sản lượng) $= 750 - 500 = \mathbf{250}$ hũ.
- Biên an toàn (doanh thu) $= 90{,}000 - 60{,}000 = \mathbf{30{,}000}$ nghìn.
- Biên an toàn (%) $= 250/750 = \mathbf{33{,}3\%}$.
- Ý nghĩa: doanh số có thể **giảm tới ~33%** trước khi xưởng bắt đầu lỗ — mức đệm khá vững.

**Bài 4.** Cách tiếp cận: tính lại CM và hòa vốn cho phương án mới, rồi so lợi nhuận ở từng mức sản lượng.
- CM mới $= 120 - 40 = 72$. $Q^{*\prime} = 40{,}000/72 \approx 555{,}6 \Rightarrow \mathbf{556}$ hũ (làm tròn **lên**). Cũ là 500 hũ → **hòa vốn cao hơn một chút** (phải bán thêm 56 hũ mới hết lỗ).
- b) Ở 750 hũ:
  - Cũ: $\pi = 48\times750 - 24{,}000 = 36{,}000 - 24{,}000 = \mathbf{12{,}000}$.
  - Mới: $\pi = 72\times750 - 40{,}000 = 54{,}000 - 40{,}000 = \mathbf{14{,}000}$. → **Tự động hóa lãi hơn 2,000.**
- c) Ở 400 hũ:
  - Cũ: $\pi = 48\times400 - 24{,}000 = 19{,}200 - 24{,}000 = \mathbf{-4{,}800}$.
  - Mới: $\pi = 72\times400 - 40{,}000 = 28{,}800 - 40{,}000 = \mathbf{-11{,}200}$. → **Tự động hóa lỗ nặng hơn 6,400.**
- **Bài học (đòn bẩy chi phí — operating leverage):** đổi biến phí lấy định phí (CM cao hơn, $F$ cao hơn) làm lợi nhuận **nhạy hơn** với sản lượng — lãi vọt khi bán tốt, nhưng lỗ sâu khi bán kém. Phương án nào tốt hơn tùy vào bạn tự tin bán *trên* hay *dưới* điểm giao hòa của hai phương án.

---

## Bài tiếp theo

**[Lesson 11 — Lập ngân sách (Budgeting)](../lesson-11-budgeting/)** *(sắp ra)*: từ hiểu cấu trúc chi phí (CVP), chuyển sang **lập kế hoạch** doanh thu — chi phí — dòng tiền cho kỳ tới.

Minh họa tương tác: **[visualization.html](./visualization.html)** — kéo slider giá bán / biến phí / định phí / sản lượng, xem đồ thị CVP dịch chuyển và điểm hòa vốn cập nhật theo thời gian thực.
