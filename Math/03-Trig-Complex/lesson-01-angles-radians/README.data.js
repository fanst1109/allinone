// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/03-Trig-Complex/lesson-01-angles-radians/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Góc & Radian

## Mục tiêu

- Hiểu **radian** là gì và vì sao toán học cấp cao bỏ độ, dùng radian.
- Quy đổi **độ ↔ radian** thành thạo.
- Hiểu **đường tròn lượng giác đơn vị** — nền tảng để định nghĩa sin, cos.
- Biết **góc lượng giác** (có dấu, vượt $360^\\circ$) khác góc hình học thế nào.

## Kiến thức tiền đề

- [Tier 2 — Geometry](../../02-Geometry/) (đặc biệt L03 về đường tròn).

---

## 1. Vì sao cần đơn vị mới?

💡 **Câu hỏi**: Độ đã quen, vì sao phải học radian?

**Câu trả lời ngắn**: Độ là quy ước **tùy ý** (người Babylon chia vòng tròn thành 360 vì lịch họ ~360 ngày). Radian là đơn vị **tự nhiên của toán học** — định nghĩa trực tiếp từ hình học, không "chế" ra.

**Hệ quả thực tế**:
- Đạo hàm $(\\sin x)' = \\cos x$ CHỈ đúng khi x tính bằng radian. Nếu dùng độ, công thức thành $(\\sin x^\\circ)' = \\frac{\\pi}{180}\\cdot\\cos x^\\circ$ — xấu, có hằng số thừa.
- Khai triển Taylor $\\sin x = x - \\frac{x^3}{6} + \\ldots$ CHỈ đúng với radian.
- Trong vật lý: vận tốc góc $\\omega$ rad/s, không bao giờ độ/s.

⟶ **Radian = ngôn ngữ chuẩn từ Calculus trở lên**.

### 1.1. Walk-through: vì sao Taylor đẹp với radian

Với $x$ ở **radian**, khai triển Taylor (học kỹ ở Calculus) cho:

$$\\sin x = x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\cdots$$

Thử $x = 0.1$ rad từng bước:

$$\\begin{aligned}
\\sin(0.1) \\text{ (máy tính)} &\\approx 0.0998334 \\\\
\\text{Xấp xỉ } x - \\tfrac{x^3}{6} &= 0.1 - \\frac{0.001}{6} = 0.1 - 0.0001667 \\approx 0.0998333 \\quad \\checkmark
\\end{aligned}$$

Khít tới 6 chữ số. Với góc nhỏ, $\\sin x \\approx x$ **chỉ đúng khi $x$ là radian** — đây chính là lý do radian được gọi là "tự nhiên": ở tỉ lệ 1:1 với chính nó khi góc nhỏ. Nếu dùng độ thì $\\sin(0.1^\\circ) \\approx 0.001745 \\ne 0.1$.

### 1.2. Walk-through: lỗi đơn vị trong code

Mọi thư viện (\`math.Sin\` của Go, \`numpy.sin\`, \`Math.sin\` của JS) nhận **radian**. Gọi \`sin(30)\` mong $\\sin 30^\\circ = 0.5$ sẽ ra số "lạ":

$$\\begin{aligned}
30 \\text{ rad} \\bmod 2\\pi &= 30 - 4\\cdot 2\\pi = 30 - 25.133 \\approx 4.867 \\text{ rad} \\\\
4.867 \\text{ rad} &\\approx 278.9^\\circ \\\\
\\sin(278.9^\\circ) &\\approx -0.988 \\quad (\\ne 0.5!)
\\end{aligned}$$

Đúng phải đổi sang radian trước: \`sin(30 * Pi / 180)\` $= \\sin(\\frac{\\pi}{6}) = 0.5$ ✓. Sai đơn vị độ↔radian là **lỗi #1** khi mới lập trình toán/ML.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Radian nhỏ hơn hay lớn hơn độ?"* $1$ rad $\\approx 57.3^\\circ$, nên $1$ rad **lớn hơn** $1^\\circ$. Cả vòng $360^\\circ = 2\\pi \\approx 6.28$ rad → một số rad nhỏ "ôm" được một góc lớn.
- *"Máy tính bỏ túi của tôi để chế độ DEG, có sai không?"* Khi chỉ tính $\\sin 30^\\circ$ thì DEG tiện. Nhưng làm Calculus (đạo hàm, Taylor) bắt buộc RAD. Nhập $\\sin(1)$ ở chế độ RAD ra $0.841$, ở DEG ra $0.0175$ — khác hẳn. Đây là lỗi #1 khi tính toán.
- *"Vậy độ có bị 'bỏ' hoàn toàn không?"* Không. Kỹ thuật, đo đạc, đời thường vẫn dùng độ vì trực quan. Radian chỉ thống trị **toán giải tích và vật lý lý thuyết**.
- *"Radian liên quan gì tới AI/ML?"* Rất nhiều. Cosine similarity (góc giữa 2 vector embedding), position encoding của Transformer $\\sin(\\frac{\\text{pos}}{10000^{\\ldots}})$, RoPE (xoay embedding theo góc), Fourier transform (tần số góc $\\omega$) — **mọi đối số đưa vào \`sin\`/\`cos\` đều ngầm hiểu là radian**. Hiểu sai đơn vị → embedding/scene sai hoàn toàn.

⚠ **Lỗi thường gặp — để máy tính sai chế độ DEG/RAD**. Phản ví dụ bằng số: muốn tính $\\sin(\\frac{\\pi}{6}) = 0.5$ nhưng máy đang ở DEG, bạn gõ $\\sin(0.5236)$ → máy hiểu là $\\sin(0.5236^\\circ) = 0.00914$, sai hoàn toàn so với $0.5$. Luôn kiểm tra biểu tượng DEG/RAD trên màn hình trước khi tính.

🔁 **Dừng lại tự kiểm tra**

1. 1 vòng tròn bằng bao nhiêu rad? Nửa vòng?
2. Góc 2 rad lớn hơn hay nhỏ hơn $90^\\circ$?

<details><summary>Đáp án</summary>

1. Cả vòng $= 2\\pi$ rad $\\approx 6.28$; nửa vòng $= \\pi$ rad $\\approx 3.14$ ($= 180^\\circ$).
2. $90^\\circ = \\frac{\\pi}{2} \\approx 1.57$ rad. Vì $2 > 1.57$ nên **2 rad lớn hơn** $90^\\circ$ (cụ thể 2 rad $\\approx 114.6^\\circ$).

</details>

### 📝 Tóm tắt mục 1

- Độ là quy ước tùy ý (Babylon, 360 ≈ số ngày/năm); radian là đơn vị **tự nhiên** từ hình học.
- Radian bắt buộc từ Calculus trở lên: $(\\sin x)' = \\cos x$ và Taylor chỉ đúng với rad.
- $1$ rad $\\approx 57.3^\\circ$; cả vòng $= 2\\pi$ rad; luôn kiểm tra chế độ DEG/RAD trên máy tính.

---

## 2. Định nghĩa radian

### 2.1. Định nghĩa hình học

💡 **Trực giác trước định nghĩa — "số bán kính cuộn quanh cung"**: tưởng tượng bạn lấy chính cây thước bán kính $r$ rồi **uốn cong nó đặt áp vào cung tròn**. Mỗi lần cây thước "cuộn" hết một đoạn cung dài đúng $r$, bạn đã quét được **1 radian**. Vậy radian đo "**cây thước bán kính cuộn được mấy lần quanh cung**". Cuộn được 2 lần → 2 rad, cuộn được nửa lần → 0.5 rad. Số radian = chiều dài cung tính theo "đơn vị bán kính".

**1 radian** = góc ở tâm chắn **cung có độ dài bằng bán kính**.

\`\`\`
  ╱─────╲
 ╱   r   ╲       Cung dài r → góc = 1 rad
│    ●────│  
 ╲   r   ╱      
  ╲─────╱
\`\`\`

⟶ Cả vòng tròn = chu vi $= 2\\pi r$ → góc đầy $= 2\\pi$ rad $= 360^\\circ$.

**Vì sao 1 vòng = $2\\pi$ rad (không phải số tròn như 360)?** Đi trọn 1 vòng nghĩa là cung quét được dài bằng **cả chu vi** $= 2\\pi r$. Số radian = (chiều dài cung)/(bán kính) $= \\frac{2\\pi r}{r} = 2\\pi$. Bán kính bị triệt tiêu — kết quả $2\\pi$ là **hệ quả trực tiếp của định nghĩa $\\pi = \\frac{\\text{chu vi}}{\\text{đường kính}}$**, không phải con số do ai chọn. Đây chính là điểm khác cốt lõi so với "360 độ" (360 là quy ước Babylon tùy ý).

#### Công thức nền $\\theta = \\dfrac{s}{r}$

Tổng quát, một góc ở tâm $\\theta$ (radian) chắn cung dài $s$ trên đường tròn bán kính $r$ thì:

$$\\theta = \\frac{s}{r} \\qquad \\Longleftrightarrow \\qquad s = r\\cdot\\theta$$

**4 ví dụ số tính radian từ cung và bán kính**:

| Bán kính $r$ | Cung $s$ | Góc $\\theta = \\frac{s}{r}$ |
|:---:|:---:|:---:|
| $1$ | $1$ | $\\frac{1}{1} = 1$ rad $\\approx 57.3^\\circ$ |
| $5$ | $5$ | $\\frac{5}{5} = 1$ rad (cùng góc, bất kể $r$) |
| $2$ | $6$ | $\\frac{6}{2} = 3$ rad $\\approx 171.9^\\circ$ |
| $10$ | $5$ | $\\frac{5}{10} = 0.5$ rad $\\approx 28.6^\\circ$ |

💡 **Điểm mấu chốt**: radian **không phụ thuộc bán kính** — chỉ phụ thuộc tỉ số $\\frac{\\text{cung}}{\\text{bán kính}}$. So sánh hàng 1 và hàng 2: $r$ khác nhau (1 và 5) nhưng cùng cho 1 rad vì cung cũng tỉ lệ theo. Đây là lý do radian "tự nhiên": góc không bị gán một con số tùy tiện như 360.

❓ **Câu hỏi tự nhiên — "Radian có đơn vị thật không?"** Nhìn $\\theta = \\frac{s}{r}$: cả $s$ và $r$ đều là **độ dài** (cm, m...). Chia cho nhau → đơn vị triệt tiêu, còn lại con số "thuần". Vì thế radian là **đại lượng không thứ nguyên (dimensionless)** — viết "2.5 rad" hay chỉ "2.5" đều đúng. Đó cũng là lý do khi gọi \`sin(0.5)\` máy ngầm hiểu 0.5 là radian, không cần ghi đơn vị.

> 📐 **Định nghĩa đầy đủ — Radian**
>
> **(a) Là gì**: Đơn vị đo góc **tự nhiên** dựa trên đường tròn. 1 radian = số đo góc mà cung tròn nó chắn có độ dài bằng đúng bán kính. Đây là tỉ số "cung/bán kính" — không có thứ nguyên (không đơn vị thực sự).
>
> **(b) Vì sao cần**: Vì độ ($^\\circ$) là quy ước **tùy ý** (Babylon chọn 360 vì lịch họ ~360 ngày). Radian là đơn vị **toán học tự nhiên** — nhờ nó, công thức $(\\sin x)' = \\cos x$ đúng (nếu dùng độ thì phải nhân thêm $\\frac{\\pi}{180}$, xấu). Khai triển Taylor $\\sin x = x - \\frac{x^3}{6} + \\ldots$ CHỈ đúng với radian. Mọi giải tích, vật lý cấp cao bắt buộc dùng radian.
>
> **(c) Ví dụ số**: $\\pi$ rad $= 180^\\circ$ (nửa vòng). $\\frac{\\pi}{2}$ rad $= 90^\\circ$ (góc vuông). $\\frac{\\pi}{4} = 45^\\circ$. $2\\pi = 360^\\circ$ (1 vòng). $1$ rad $= \\frac{180}{\\pi} \\approx 57.3^\\circ$. Cung tròn $r = 10$, góc 2 rad: độ dài cung $= r\\cdot\\theta = 10\\cdot 2 = $ **20**. Diện tích quạt tròn: $\\frac{1}{2}\\cdot r^2\\cdot\\theta = \\frac{1}{2}\\cdot 100\\cdot 2 = $ **100**.

### 2.2. Công thức quy đổi

$$180^\\circ = \\pi \\text{ rad}$$

Từ đó:
- **Độ → Rad**: nhân với $\\frac{\\pi}{180}$.
- **Rad → Độ**: nhân với $\\frac{180}{\\pi}$.

**Ví dụ số (Độ → Rad)** — nhân $\\frac{\\pi}{180}$ rồi rút gọn:
- $30^\\circ = 30\\cdot\\frac{\\pi}{180} = \\frac{30\\pi}{180} = $ **$\\frac{\\pi}{6}$ rad** $\\approx 0.5236$.
- $45^\\circ = 45\\cdot\\frac{\\pi}{180} = \\frac{45\\pi}{180} = $ **$\\frac{\\pi}{4}$ rad** $\\approx 0.7854$.
- $60^\\circ = 60\\cdot\\frac{\\pi}{180} = \\frac{60\\pi}{180} = $ **$\\frac{\\pi}{3}$ rad** $\\approx 1.0472$.
- $90^\\circ = 90\\cdot\\frac{\\pi}{180} = $ **$\\frac{\\pi}{2}$ rad** $\\approx 1.5708$.
- $270^\\circ = 270\\cdot\\frac{\\pi}{180} = \\frac{270\\pi}{180} = $ **$\\frac{3\\pi}{2}$ rad** $\\approx 4.7124$.

**Walk-through chi tiết một ô** — đổi $60^\\circ$ sang radian từng bước:

$$\\begin{aligned}
60^\\circ &= 60 \\cdot \\frac{\\pi}{180} \\\\
         &= \\frac{60\\pi}{180} \\quad \\text{(rút gọn: chia tử và mẫu cho 60)} \\\\
         &= \\frac{\\pi}{3} \\\\
         &\\approx \\frac{3.14159}{3} \\approx 1.0472 \\text{ rad}
\\end{aligned}$$

**Ví dụ số (Rad → Độ)** — nhân $\\frac{180}{\\pi}$, $\\pi$ triệt tiêu:
- $\\frac{\\pi}{6}\\cdot\\frac{180}{\\pi} = \\frac{180}{6} = $ **$30^\\circ$**.
- $\\frac{2\\pi}{3}\\cdot\\frac{180}{\\pi} = \\frac{2\\cdot 180}{3} = $ **$120^\\circ$**.
- $\\frac{3\\pi}{4}\\cdot\\frac{180}{\\pi} = \\frac{3\\cdot 180}{4} = $ **$135^\\circ$**.
- $1$ rad $= 1\\cdot\\frac{180}{\\pi} \\approx $ **$57.296^\\circ$**.
- $2$ rad $\\approx 114.59^\\circ$.

💡 **Mẹo nhớ bảng rad → độ**: nhìn vào **mẫu số** của radian — đó chính là số chia của $180^\\circ$:

$$\\frac{\\pi}{6} \\to \\frac{180}{6} = 30^\\circ, \\quad \\frac{\\pi}{4} \\to \\frac{180}{4} = 45^\\circ, \\quad \\frac{\\pi}{3} \\to \\frac{180}{3} = 60^\\circ, \\quad \\frac{\\pi}{2} \\to \\frac{180}{2} = 90^\\circ$$

Khi tử có hệ số (vd $\\frac{2\\pi}{3}$): tính như $\\frac{2\\cdot 180}{3} = 120^\\circ$.

### 2.3. Bảng các góc phổ biến

| Độ | 0 | 30 | 45 | 60 | 90 | 120 | 135 | 150 | 180 | 270 | 360 |
|----|---|----|----|----|----|-----|-----|-----|-----|-----|-----|
| Rad | $0$ | $\\frac{\\pi}{6}$ | $\\frac{\\pi}{4}$ | $\\frac{\\pi}{3}$ | $\\frac{\\pi}{2}$ | $\\frac{2\\pi}{3}$ | $\\frac{3\\pi}{4}$ | $\\frac{5\\pi}{6}$ | $\\pi$ | $\\frac{3\\pi}{2}$ | $2\\pi$ |

💡 **Mẹo nhớ**: $\\pi$ = nửa vòng, $\\frac{\\pi}{2}$ = ¼ vòng (góc vuông), $\\frac{\\pi}{4} = 45^\\circ$, $\\frac{\\pi}{6} = 30^\\circ$.

**Verify công thức quy đổi (cả 2 chiều)**: lấy $90^\\circ$. Độ→rad: $90\\cdot\\frac{\\pi}{180} = \\frac{\\pi}{2}$. Rad→độ ngược lại: $\\frac{\\pi}{2}\\cdot\\frac{180}{\\pi} = 90^\\circ$ ✓ — hai phép là nghịch đảo của nhau, khớp.

⚠ **Lỗi thường gặp — nhân/chia nhầm chiều hệ số**. Quy tắc gọn: đi từ độ (đơn vị to, nhiều con số) sang rad (đơn vị nhỏ về con số) thì **nhân $\\frac{\\pi}{180}$** (làm số bé lại); chiều ngược **nhân $\\frac{180}{\\pi}$**. Phản ví dụ: đổi $60^\\circ$ mà lỡ nhân $\\frac{180}{\\pi}$ ra $60\\cdot 57.3 \\approx 3438$ rad — vô lý (lớn hơn cả vòng tròn). Đúng phải $60\\cdot\\frac{\\pi}{180} = \\frac{\\pi}{3} \\approx 1.05$ rad.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao kết quả hay để ở dạng $\\frac{\\pi}{6}$ mà không phải số thập phân $0.5236$?"* Vì dạng $\\frac{\\pi}{6}$ **chính xác tuyệt đối**, còn $0.5236$ đã làm tròn. Trong toán ưu tiên dạng phân số của $\\pi$; chỉ đổi sang thập phân khi cần con số đo đạc cụ thể.
- *"Góc âm như $-\\frac{\\pi}{3}$ đổi ra độ thế nào?"* Dấu giữ nguyên: $-\\frac{\\pi}{3} \\cdot \\frac{180}{\\pi} = -60^\\circ$. Góc âm = quay theo chiều kim đồng hồ (xem mục 4).

🔁 **Dừng lại tự kiểm tra**

1. Đổi $120^\\circ$ sang radian.
2. Đổi $\\frac{7\\pi}{6}$ rad sang độ.

<details><summary>Đáp án</summary>

1. $120\\cdot\\frac{\\pi}{180} = \\frac{2\\pi}{3}$ rad $\\approx 2.094$.
2. $\\frac{7\\pi}{6}\\cdot\\frac{180}{\\pi} = \\frac{7\\cdot 180}{6} = 210^\\circ$.

</details>

### 2.4. Phút và giây góc (giới thiệu)

Để đo chính xác hơn $1^\\circ$ (thiên văn, hàng hải), người ta chia tiếp $1^\\circ$ thành 60 **phút góc** ($'$), mỗi phút thành 60 **giây góc** ($''$):

$$1^\\circ = 60' = 60\\cdot 60'' = 3600''$$

⚠ **Lưu ý**: "phút/giây góc" **không phải** đơn vị thời gian — chỉ mượn tên. Đừng nhầm giây góc với giây đồng hồ.

**Walk-through** — đổi $12^\\circ 34' 56''$ về độ thập phân:

$$\\begin{aligned}
12^\\circ 34' 56'' &= 12 + \\frac{34}{60} + \\frac{56}{3600} \\\\
                  &= 12 + 0.5667 + 0.01556 \\approx 12.5822^\\circ
\\end{aligned}$$

Khóa học này dùng **độ thập phân** ($12.5822^\\circ$), không dùng phút/giây — mục này chỉ để bạn nhận ra khi đọc tài liệu chuyên ngành.

### 📝 Tóm tắt mục 2

- $180^\\circ = \\pi$ rad là gốc quy đổi; mọi công thức suy từ đây.
- Định nghĩa nền: $\\theta = \\frac{s}{r}$ (radian không thứ nguyên, không phụ thuộc bán kính).
- Độ→rad: $\\times\\frac{\\pi}{180}$; rad→độ: $\\times\\frac{180}{\\pi}$ (hai phép nghịch đảo nhau).
- Thuộc bảng góc đặc biệt ($\\frac{\\pi}{6}, \\frac{\\pi}{4}, \\frac{\\pi}{3}, \\frac{\\pi}{2}, \\pi$) — dùng liên tục về sau.

---

## 3. Đường tròn lượng giác đơn vị

💡 **Là gì**: Đường tròn tâm O, **bán kính = 1**, được dùng để định nghĩa sin, cos cho **mọi góc** (không chỉ trong tam giác vuông).

\`\`\`
       y
       │   ●(cos θ, sin θ)
       │  ╱
       │ ╱ θ
       │╱──────────── x
      O
\`\`\`

- Lấy điểm M trên đường tròn, đo góc $\\theta$ từ Ox quay ngược chiều kim đồng hồ.
- **$\\cos\\theta$** = hoành độ M.
- **$\\sin\\theta$** = tung độ M.

**Hệ quả**: $\\cos^2\\theta + \\sin^2\\theta = 1$ (do M nằm trên đường tròn bán kính 1).

❓ **Câu hỏi tự nhiên**: Vì sao đường tròn này lại "đơn vị"?
**Trả lời**: Vì bán kính = 1, nên cos/sin là tọa độ trực tiếp, không cần chia r. Đơn giản hóa mọi công thức.

**Verify $\\cos^2\\theta + \\sin^2\\theta = 1$ bằng 4 góc cụ thể**:
- $\\theta = 0$: $M(1, 0)$ → $1^2 + 0^2 = 1$ ✓.
- $\\theta = \\frac{\\pi}{6}$ ($30^\\circ$): $M(\\frac{\\sqrt{3}}{2}, \\frac{1}{2})$ → $(\\frac{\\sqrt{3}}{2})^2 + (\\frac{1}{2})^2 = \\frac{3}{4} + \\frac{1}{4} = 1$ ✓.
- $\\theta = \\frac{\\pi}{4}$ ($45^\\circ$): $M(\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2})$ → $\\frac{1}{2} + \\frac{1}{2} = 1$ ✓.
- $\\theta = \\frac{2\\pi}{3}$ ($120^\\circ$): $M(-\\frac{1}{2}, \\frac{\\sqrt{3}}{2})$ → $\\frac{1}{4} + \\frac{3}{4} = 1$ ✓ (dù toạ độ x âm, bình phương vẫn cho 1).

**Bảng tọa độ điểm M ở 4 góc phần tư** (thấy rõ dấu cos/sin đổi theo phần tư):

| $\\theta$ | Phần tư | $\\cos\\theta$ (x) | $\\sin\\theta$ (y) |
|:---:|:---:|:---:|:---:|
| $\\frac{\\pi}{6}$ ($30^\\circ$) | I | $+\\frac{\\sqrt{3}}{2}$ | $+\\frac{1}{2}$ |
| $\\frac{2\\pi}{3}$ ($120^\\circ$) | II | $-\\frac{1}{2}$ | $+\\frac{\\sqrt{3}}{2}$ |
| $\\frac{5\\pi}{4}$ ($225^\\circ$) | III | $-\\frac{\\sqrt{2}}{2}$ | $-\\frac{\\sqrt{2}}{2}$ |
| $\\frac{5\\pi}{3}$ ($300^\\circ$) | IV | $+\\frac{1}{2}$ | $-\\frac{\\sqrt{3}}{2}$ |

⚠ **Lỗi thường gặp — đảo vai trò cos và sin**. cos = **hoành độ** (x, đi ngang), sin = **tung độ** (y, đi dọc). Phản ví dụ: tại $\\theta = \\frac{\\pi}{2}$ (điểm trên cùng $(0, 1)$), người mới hay viết $\\cos\\frac{\\pi}{2} = 1$ (nhầm) — sai, vì hoành độ điểm đó là 0 → $\\cos\\frac{\\pi}{2} = 0$, còn $\\sin\\frac{\\pi}{2} = 1$.

🔁 **Dừng lại tự kiểm tra**

1. Điểm ứng với $\\theta = \\pi$ nằm ở đâu? $\\cos\\pi$ và $\\sin\\pi$ bằng mấy?
2. Một điểm trên đường tròn đơn vị có hoành độ 0.6. Tung độ có thể bằng mấy?

<details><summary>Đáp án</summary>

1. $\\theta = \\pi$ → điểm $(-1, 0)$ (cực trái). $\\cos\\pi = -1$, $\\sin\\pi = 0$.
2. $0.6^2 + y^2 = 1$ → $y^2 = 0.64$ → $y = \\pm 0.8$ (hai điểm: trên và dưới trục hoành).

</details>

### 📝 Tóm tắt mục 3

- Đường tròn đơn vị: tâm O, bán kính 1; mở rộng định nghĩa sin/cos cho mọi góc.
- $\\cos\\theta$ = hoành độ (x), $\\sin\\theta$ = tung độ (y) của điểm M ứng với góc $\\theta$.
- Vì M nằm trên đường tròn r = 1 nên luôn có $\\cos^2\\theta + \\sin^2\\theta = 1$.

---

## 4. Góc lượng giác — Có dấu, có thể vượt 360°

💡 **Trực giác / Hình dung**: nghĩ góc như **số vòng + phần lẻ một người đi bộ trên đường tròn**. Đi ngược kim đồng hồ = góc dương, đi xuôi kim đồng hồ = góc âm. Đi 1 vòng rưỡi ($540^\\circ$) thì "đứng" ở chỗ giống như mới đi nửa vòng ($180^\\circ$) — vị trí trùng nhau, chỉ khác số vòng đã đi. Góc lượng giác ghi lại **cả hành trình**, không chỉ điểm đến.

**Khác góc hình học** (luôn từ 0 đến $180^\\circ$):

- **Chiều dương**: ngược chiều kim đồng hồ.
- **Chiều âm**: thuận chiều kim đồng hồ. $\\theta = -30^\\circ$ tương đương quay $30^\\circ$ xuống.
- **Vượt $360^\\circ$**: $450^\\circ = 360^\\circ + 90^\\circ = $ 1 vòng $+ 90^\\circ$. Cùng vị trí với $90^\\circ$.
- **Tổng quát**: $\\theta$ và $\\theta + k\\cdot 2\\pi$ ($k \\in \\mathbb{Z}$) có cùng điểm đại diện.

⟶ Đây là lý do sin, cos là **hàm tuần hoàn** chu kỳ $2\\pi$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$450^\\circ$ và $90^\\circ$ cùng vị trí — vậy chúng có là 'cùng một góc' không?"* Cùng **vị trí điểm** trên đường tròn (nên sin/cos bằng nhau), nhưng **khác góc** ($450^\\circ = 90^\\circ + $ 1 vòng). Khi chỉ quan tâm sin/cos thì coi như nhau; khi quan tâm "đã quay mấy vòng" thì khác.
- *"Làm sao đưa một góc to như $1000^\\circ$ về khoảng $[0^\\circ, 360^\\circ)$?"* Trừ bội của 360 cho tới khi lọt khoảng: $1000 - 2\\cdot 360 = 1000 - 720 = 280^\\circ$.
- *"Góc âm $-30^\\circ$ tương đương góc dương nào?"* Cộng 360: $-30 + 360 = 330^\\circ$. Cùng vị trí.

⚠ **Lỗi thường gặp — cộng/trừ nhầm $360^\\circ$ với $180^\\circ$ (hay $2\\pi$ với $\\pi$)**. Hai góc trùng vị trí cách nhau **bội của $360^\\circ$ ($2\\pi$)**, KHÔNG phải $180^\\circ$. Phản ví dụ: $30^\\circ$ và $210^\\circ$ cách nhau $180^\\circ$ nhưng KHÔNG cùng vị trí ($210^\\circ$ ở phần tư III, đối tâm với $30^\\circ$). Còn $30^\\circ$ và $30+360=390^\\circ$ mới cùng vị trí.

### 4.1. Góc đồng cuối (coterminal angles)

💡 **Trực giác**: hai góc **đồng cuối** là hai góc có **cùng tia kết thúc** (cùng điểm đại diện trên đường tròn) — chỉ khác số vòng đã quay. Như người đi bộ quanh hồ: đi 1 vòng rưỡi hay nửa vòng đều "đứng" ở cùng một chỗ trên bờ.

**Quy tắc**: $\\theta$ và $\\theta + k\\cdot 360^\\circ$ ($k \\in \\mathbb{Z}$) — hay $\\theta + k\\cdot 2\\pi$ với radian — luôn đồng cuối. Cộng/trừ bao nhiêu bội của một vòng cũng không đổi vị trí.

**Cách tìm**: cộng (nếu góc âm) hoặc trừ (nếu góc lớn) bội của $360^\\circ$ ($2\\pi$) cho tới khi rơi vào dải chuẩn $[0^\\circ, 360^\\circ)$.

**≥4 ví dụ số đa dạng** (âm, lớn, radian):

| Góc cho | Phân tích | Góc đồng cuối trong $[0^\\circ, 360^\\circ)$ |
|:---|:---|:---:|
| $450^\\circ$ | $450 - 360 = 90$ | $90^\\circ$ |
| $-30^\\circ$ | $-30 + 360 = 330$ | $330^\\circ$ |
| $800^\\circ$ | $800 - 2\\cdot 360 = 800 - 720 = 80$ | $80^\\circ$ |
| $1000^\\circ$ | $1000 - 2\\cdot 360 = 1000 - 720 = 280$ | $280^\\circ$ |
| $-\\frac{\\pi}{3}$ rad | $-\\frac{\\pi}{3} + 2\\pi = -\\frac{\\pi}{3} + \\frac{6\\pi}{3} = \\frac{5\\pi}{3}$ | $\\frac{5\\pi}{3}$ rad $= 300^\\circ$ |
| $\\frac{13\\pi}{4}$ rad | $\\frac{13\\pi}{4} - 2\\pi = \\frac{13\\pi}{4} - \\frac{8\\pi}{4} = \\frac{5\\pi}{4}$ | $\\frac{5\\pi}{4}$ rad $= 225^\\circ$ |

**Walk-through chi tiết** — đưa $1000^\\circ$ về dải chuẩn từng bước:

$$\\begin{aligned}
\\frac{1000}{360} &= 2.78 \\quad \\Rightarrow \\text{phần nguyên} = 2 \\text{ (đã quay 2 vòng trọn)} \\\\
1000 - 2\\cdot 360 &= 1000 - 720 = 280^\\circ \\in [0^\\circ, 360^\\circ) \\quad \\checkmark
\\end{aligned}$$

#### Họ vô hạn các góc đồng cuối

Một góc bất kỳ sinh ra **vô hạn** góc đồng cuối, viết gọn bằng tham số $k \\in \\mathbb{Z}$:

$$\\theta_k = \\theta_0 + k\\cdot 360^\\circ \\quad (\\text{hay } \\theta_0 + k\\cdot 2\\pi \\text{ với radian})$$

Ví dụ với $\\theta_0 = 30^\\circ$: $\\{\\ldots, -690^\\circ, -330^\\circ, 30^\\circ, 390^\\circ, 750^\\circ, \\ldots\\}$ — tất cả cùng tia kết thúc. Kiểm tra: $k = -1 \\Rightarrow 30 - 360 = -330^\\circ$; $k = 2 \\Rightarrow 30 + 720 = 750^\\circ$ ✓ (đúng kết quả Bài 5 phía dưới).

❓ **Câu hỏi tự nhiên** — *"$450^\\circ$ và $90^\\circ$ đồng cuối, vậy chúng là 'cùng một góc'?"* Cùng **vị trí điểm** (nên $\\sin$, $\\cos$ bằng nhau) nhưng **khác số đo** ($450^\\circ = 90^\\circ + $ 1 vòng). Khi chỉ quan tâm giá trị lượng giác thì coi như nhau; khi quan tâm "đã quay mấy vòng" (cơ học, đồ họa) thì phải giữ nguyên.

⚠ **Lỗi thường gặp — nhầm chiều khi quy gọn góc âm**. Với góc âm phải **cộng** $360^\\circ$ cho tới khi dương, không phải trừ. Phản ví dụ: $-30^\\circ$ mà lỡ trừ tiếp $\\to -390^\\circ$ (càng âm, sai). Đúng: $-30 + 360 = 330^\\circ$. Và nếu sau một lần cộng vẫn còn âm thì cộng tiếp: $-400^\\circ \\to -400 + 360 = -40 \\to -40 + 360 = 320^\\circ$.

### 4.2. Góc phần tư (quadrant)

💡 **Trực giác**: hệ trục $Oxy$ chia mặt phẳng thành **4 phần tư**, đánh số ngược chiều kim đồng hồ bắt đầu từ góc trên-phải. Biết góc nằm phần tư nào → biết ngay **dấu** của cos (hoành độ) và sin (tung độ).

\`\`\`
        y
    II  │  I
  (−,+) │ (+,+)     I:   0°–90°    (cos +, sin +)
────────●──────── x  II:  90°–180°  (cos −, sin +)
    III │  IV       III: 180°–270°  (cos −, sin −)
  (−,−) │ (+,−)     IV:  270°–360°  (cos +, sin −)
\`\`\`

**4 ví dụ xác định phần tư** (đưa về dải chuẩn trước nếu cần):
- $200^\\circ$: nằm trong $(180^\\circ, 270^\\circ)$ → **phần tư III** (cos $-$, sin $-$).
- $-45^\\circ$: đồng cuối $315^\\circ \\in (270^\\circ, 360^\\circ)$ → **phần tư IV** (cos $+$, sin $-$).
- $\\frac{2\\pi}{3} = 120^\\circ$: trong $(90^\\circ, 180^\\circ)$ → **phần tư II** (cos $-$, sin $+$).
- $480^\\circ$: đồng cuối $480 - 360 = 120^\\circ$ → **phần tư II**.

🔁 **Dừng lại tự kiểm tra**

1. Đưa góc $800^\\circ$ về khoảng $[0^\\circ, 360^\\circ)$.
2. Góc $-\\frac{\\pi}{3}$ tương đương góc dương nào trong $[0, 2\\pi)$?

<details><summary>Đáp án</summary>

1. $800 - 2\\cdot 360 = 800 - 720 = 80^\\circ$.
2. $-\\frac{\\pi}{3} + 2\\pi = -\\frac{\\pi}{3} + \\frac{6\\pi}{3} = \\frac{5\\pi}{3}$.

</details>

### 📝 Tóm tắt mục 4

- Góc lượng giác **có dấu**: dương = ngược kim đồng hồ, âm = xuôi kim đồng hồ.
- Có thể vượt $360^\\circ$ (nhiều vòng); $\\theta$ và $\\theta + k\\cdot 2\\pi$ trùng vị trí điểm (**góc đồng cuối**).
- Quy gọn về dải chuẩn: cộng/trừ bội của $360^\\circ$ ($2\\pi$); góc âm thì **cộng** cho tới khi dương.
- **4 góc phần tư** quyết định dấu cos (hoành độ) và sin (tung độ): I $(+,+)$, II $(-,+)$, III $(-,-)$, IV $(+,-)$.
- Hệ quả: sin, cos tuần hoàn chu kỳ $2\\pi$.

---

## 5. Độ dài cung — Lý do thật sự yêu radian

💡 **Trực giác / Hình dung**: nhớ lại định nghĩa "1 rad = cung dài bằng 1 bán kính". Vậy nếu góc là $\\theta$ rad thì cung dài $\\theta$ lần bán kính → $\\ell = r\\cdot\\theta$. Công thức này gọn **chính vì** radian được định nghĩa đúng theo cách đó — nó là "phần thưởng" của việc chọn đơn vị tự nhiên.

Cho cung tròn bán kính r, chắn góc $\\theta$ (radian):

$$\\ell = r \\cdot \\theta$$

**4 ví dụ số đa dạng**:
- $r = 5$, $\\theta = \\frac{\\pi}{3}$: $\\ell = 5\\cdot\\frac{\\pi}{3} \\approx 5.24$.
- $r = 1$ (đường tròn đơn vị), $\\theta = \\pi$: $\\ell = \\pi \\approx 3.14$ (đúng nửa chu vi $\\frac{2\\pi}{2}$).
- $r = 10$, $\\theta = 2$: $\\ell = 20$; diện tích quạt $S = \\frac{1}{2}\\cdot 100\\cdot 2 = 100$.
- Cả vòng: $\\theta = 2\\pi$ → $\\ell = r\\cdot 2\\pi = 2\\pi r$ = chu vi ✓ (khớp công thức chu vi quen thuộc).

⟶ **Đẹp đến mức nào**: Nếu dùng độ, công thức là $\\ell = r \\cdot \\theta \\cdot \\frac{\\pi}{180}$ — xấu, có hằng số $\\frac{\\pi}{180}$ thừa. Radian thiết kế ra chính là để công thức này gọn.

**Diện tích quạt tròn**: $S = \\frac{1}{2} \\cdot r^2 \\cdot \\theta$ (radian).

💡 **Vì sao có hệ số $\\frac{1}{2}$?** Quạt là "tam giác cong": diện tích $\\sim \\frac{1}{2}\\cdot$đáy$\\cdot$cao, ở đây đáy là cung $r\\theta$, cao là bán kính $r$ → $S = \\frac{1}{2}\\cdot(r\\theta)\\cdot r = \\frac{1}{2}r^2\\theta$. Hệ số $\\frac{1}{2}$ là "dấu vết" của diện tích tam giác.

**≥3 walk-through diện tích quạt từng bước**:

(1) $r = 6$, $\\theta = 90^\\circ$. **Đổi độ → rad trước**: $90^\\circ = \\frac{\\pi}{2}$.
$$S = \\frac{1}{2}\\cdot 6^2\\cdot\\frac{\\pi}{2} = \\frac{1}{2}\\cdot 36\\cdot\\frac{\\pi}{2} = 9\\pi \\approx 28.27$$

(2) $r = 4$, $\\theta = \\frac{\\pi}{3}$ ($60^\\circ$).
$$S = \\frac{1}{2}\\cdot 4^2\\cdot\\frac{\\pi}{3} = \\frac{1}{2}\\cdot 16\\cdot\\frac{\\pi}{3} = \\frac{8\\pi}{3} \\approx 8.38$$

(3) $r = 10$, $\\theta = 2$ rad (đã là radian, dùng thẳng).
$$S = \\frac{1}{2}\\cdot 10^2\\cdot 2 = \\frac{1}{2}\\cdot 100\\cdot 2 = 100$$

**Verify công thức quạt khớp diện tích hình tròn**: cả hình tròn ứng $\\theta = 2\\pi$ → $S = \\frac{1}{2}\\cdot r^2\\cdot 2\\pi = \\pi r^2$ ✓ — đúng công thức diện tích hình tròn quen thuộc.

⚠ **Lỗi thường gặp — quên đổi góc về radian trước khi dùng $\\ell = r\\theta$, $S = \\frac{1}{2}r^2\\theta$**. Hai công thức này CHỈ đúng khi $\\theta$ là radian. Phản ví dụ: cung $r = 5$, góc $60^\\circ$. Nếu cắm thẳng 60: $\\ell = 5\\cdot 60 = 300$ (vô lý, dài hơn cả chu vi $2\\pi\\cdot 5 \\approx 31.4$). Đúng phải đổi $60^\\circ = \\frac{\\pi}{3}$ trước: $\\ell = 5\\cdot\\frac{\\pi}{3} \\approx 5.24$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Tại sao diện tích quạt có ½ mà độ dài cung thì không?"* Vì quạt là "tam giác cong": diện tích ~ ½·đáy·cao, ở đây đóng vai như $\\frac{1}{2}\\cdot$(cung)$\\cdot$(bán kính) $= \\frac{1}{2}\\cdot(r\\theta)\\cdot r = \\frac{1}{2}r^2\\theta$. Hệ số ½ là dấu vết của diện tích tam giác.
- *"Cung và dây cung khác nhau không?"* Khác. **Cung** = phần đường tròn (cong), dài $r\\theta$. **Dây cung** = đoạn thẳng nối 2 đầu (thẳng), dài $2r\\cdot\\sin(\\frac{\\theta}{2})$. Với $\\theta$ nhỏ hai cái xấp xỉ nhau.

🔁 **Dừng lại tự kiểm tra**

1. Bánh xe bán kính 0.3 m quay góc 4 rad. Một điểm trên vành đi được quãng đường bao nhiêu?
2. Quạt tròn $r = 6$, góc $90^\\circ$. Diện tích?

<details><summary>Đáp án</summary>

1. $\\ell = r\\theta = 0.3\\cdot 4 = 1.2$ m.
2. Đổi $90^\\circ = \\frac{\\pi}{2}$. $S = \\frac{1}{2}\\cdot 6^2\\cdot\\frac{\\pi}{2} = \\frac{1}{2}\\cdot 36\\cdot\\frac{\\pi}{2} = 9\\pi \\approx 28.3$.

</details>

### 5.5. Vận tốc góc (angular velocity) — giới thiệu

💡 **Trực giác**: vận tốc thường đo "quãng đường đi được mỗi giây"; **vận tốc góc** $\\omega$ (omega) đo "**góc quét được mỗi giây**". Cùng triết lý, đổi "khoảng cách" thành "góc".

> 📐 **Định nghĩa — Vận tốc góc $\\omega$**
>
> **(a) Là gì**: $\\omega = \\dfrac{\\Delta\\theta}{\\Delta t}$ — góc (radian) quét được trên mỗi đơn vị thời gian. Đơn vị **rad/s**.
>
> **(b) Vì sao cần**: để mô tả chuyển động quay (bánh xe, kim đồng hồ, hành tinh) một cách độc lập với bán kính. Hai điểm trên cùng đĩa quay có $\\omega$ giống nhau dù cách tâm khác nhau.
>
> **(c) Ví dụ số**: kim giây đi 1 vòng ($2\\pi$ rad) trong 60 s → $\\omega = \\frac{2\\pi}{60} \\approx 0.105$ rad/s.

**4 ví dụ vận tốc góc thực tế**:

| Vật quay | Tính | $\\omega$ |
|:---|:---|:---:|
| Kim giây (1 vòng / 60 s) | $\\frac{2\\pi}{60}$ | $\\approx 0.105$ rad/s |
| Kim phút (1 vòng / 3600 s) | $\\frac{2\\pi}{3600}$ | $\\approx 1.75\\cdot 10^{-3}$ rad/s |
| Quạt trần 60 vòng/phút | $\\frac{60\\cdot 2\\pi}{60}$ | $2\\pi \\approx 6.28$ rad/s |
| Trái Đất tự quay (1 vòng / 86400 s) | $\\frac{2\\pi}{86400}$ | $\\approx 7.27\\cdot 10^{-5}$ rad/s |

**Liên hệ vận tốc dài**: một điểm cách tâm $r$ có vận tốc dài $v = \\omega\\cdot r$.

💡 Cùng $\\omega$, điểm xa tâm đi nhanh hơn (quét cung dài hơn cho cùng một góc) — đó là lý do mép ngoài đĩa quay nhanh hơn gần tâm.

**Walk-through** — bánh xe đạp $r = 0.35$ m quay $\\omega = 10$ rad/s:
$$v = \\omega\\cdot r = 10\\cdot 0.35 = 3.5 \\text{ m/s} = 12.6 \\text{ km/h}$$

⚠ **Lỗi thường gặp — ghi $\\omega$ bằng độ/giây rồi dùng thẳng vào $v = \\omega r$**. Công thức $v = \\omega r$ chỉ đúng khi $\\omega$ ở **rad/s**. Nếu $\\omega$ ở $^\\circ$/s phải đổi: $v = \\omega^\\circ\\cdot r\\cdot\\frac{\\pi}{180}$. Phản ví dụ: $\\omega = 360^\\circ/\\text{s}$, $r = 1$ m. Cắm thẳng: $v = 360$ m/s (vô lý). Đúng: $360^\\circ/\\text{s} = 2\\pi$ rad/s → $v = 2\\pi\\cdot 1 \\approx 6.28$ m/s.

> 📌 **Sẽ học sâu hơn**: định nghĩa chặt $\\omega = \\frac{d\\theta}{dt}$ bằng đạo hàm và gia tốc góc $\\alpha = \\frac{d\\omega}{dt}$ thuộc về Calculus (xem [Tier 4 — Calculus](../../04-Calculus/) khi học tới).

### 📝 Tóm tắt mục 5

- $\\ell = r\\cdot\\theta$ và $S = \\frac{1}{2}\\cdot r^2\\cdot\\theta$ — **$\\theta$ phải là radian**.
- Công thức gọn chính vì radian định nghĩa theo "cung = bán kính".
- Kiểm tra biên: $\\theta = 2\\pi$ cho lại chu vi $2\\pi r$ và diện tích $\\pi r^2$.
- **Vận tốc góc** $\\omega$ (rad/s) = góc quét/giây; liên hệ vận tốc dài $v = \\omega\\cdot r$ (chỉ đúng khi $\\omega$ ở rad/s).

---

## 6. Bài tập

### Bài tập

**Bài 1**: Đổi $270^\\circ$ sang radian.

**Bài 2**: Đổi $\\frac{5\\pi}{6}$ rad sang độ.

**Bài 3**: Cung tròn $r = 10$, $\\theta = 2$ rad. Tìm độ dài cung và diện tích hình quạt.

**Bài 4**: Vẽ điểm tương ứng với góc $\\theta = \\frac{5\\pi}{4}$ trên đường tròn lượng giác. Tọa độ?

**Bài 5**: Hai góc $750^\\circ$ và $1110^\\circ$ có "cùng vị trí" trên đường tròn không?

**Bài 6**: Tìm góc đồng cuối trong $[0^\\circ, 360^\\circ)$ của: (a) $-200^\\circ$; (b) $1000^\\circ$; (c) $-\\frac{7\\pi}{3}$ rad. Mỗi góc nằm phần tư nào?

**Bài 7**: Quạt trần quay 90 vòng/phút, cánh dài $r = 0.7$ m. (a) Tính vận tốc góc $\\omega$ (rad/s). (b) Vận tốc dài của đầu cánh? (c) Trong 5 giây, đầu cánh đi được quãng đường cung bao nhiêu?

### Lời giải

**Bài 1**: $270 \\cdot \\frac{\\pi}{180} = $ **$\\frac{3\\pi}{2}$ rad** $\\approx 4.712$.

**Bài 2**: $\\frac{5\\pi}{6}\\cdot\\frac{180}{\\pi} = \\frac{5\\cdot 180}{6} = $ **$150^\\circ$**.

**Bài 3**:  
- $\\ell = r\\cdot\\theta = 10\\cdot 2 = $ **20**.  
- $S = \\frac{1}{2}\\cdot r^2\\cdot\\theta = \\frac{1}{2}\\cdot 100\\cdot 2 = $ **100**.

**Bài 4**: $\\frac{5\\pi}{4} = \\pi + \\frac{\\pi}{4} = 180^\\circ + 45^\\circ = 225^\\circ$ (góc phần tư III). $\\cos = -\\frac{\\sqrt{2}}{2} \\approx -0.707$, $\\sin = -\\frac{\\sqrt{2}}{2}$. Tọa độ **(-0.707, -0.707)**.

**Bài 5**:  
- $750^\\circ = 360\\cdot 2 + 30^\\circ$ → cùng vị trí với $30^\\circ$.  
- $1110^\\circ = 360\\cdot 3 + 30^\\circ$ → cùng vị trí với $30^\\circ$.  
- $\\implies$ **Có**, cả 2 đều tương đương $30^\\circ$.

**Bài 6**:  
- (a) $-200^\\circ$ âm → cộng $360$: $-200 + 360 = 160^\\circ$. $160^\\circ \\in (90^\\circ, 180^\\circ)$ → **phần tư II**.  
- (b) $1000^\\circ$: $1000 - 2\\cdot 360 = 1000 - 720 = 280^\\circ$. $280^\\circ \\in (270^\\circ, 360^\\circ)$ → **phần tư IV**.  
- (c) $-\\frac{7\\pi}{3}$: cộng $2\\pi$: $-\\frac{7\\pi}{3} + \\frac{6\\pi}{3} = -\\frac{\\pi}{3}$ (vẫn âm), cộng tiếp $2\\pi$: $-\\frac{\\pi}{3} + \\frac{6\\pi}{3} = \\frac{5\\pi}{3} = 300^\\circ$. $300^\\circ \\in (270^\\circ, 360^\\circ)$ → **phần tư IV**.

**Bài 7**:  
- (a) 90 vòng/phút $= \\frac{90}{60} = 1.5$ vòng/s. Mỗi vòng $= 2\\pi$ rad → $\\omega = 1.5\\cdot 2\\pi = 3\\pi \\approx 9.42$ rad/s.  
- (b) $v = \\omega\\cdot r = 3\\pi\\cdot 0.7 = 2.1\\pi \\approx 6.60$ m/s.  
- (c) Trong 5 s: góc quét $\\theta = \\omega\\cdot t = 3\\pi\\cdot 5 = 15\\pi$ rad. Cung $\\ell = r\\cdot\\theta = 0.7\\cdot 15\\pi = 10.5\\pi \\approx 32.99$ m. (Kiểm tra: $\\ell = v\\cdot t = 6.60\\cdot 5 \\approx 33$ m ✓.)

---

## 7. Bài tiếp theo

[Lesson 02 — sin, cos, tan](../lesson-02-sin-cos-tan/) — định nghĩa, đồ thị, tính chất.

## 📝 Tổng kết

1. **Radian** = đơn vị tự nhiên (cung = bán kính); $\\theta = \\frac{s}{r}$, không thứ nguyên.
2. **$180^\\circ = \\pi$ rad** — gốc quy đổi: độ→rad $\\times\\frac{\\pi}{180}$, rad→độ $\\times\\frac{180}{\\pi}$.
3. **Đường tròn lượng giác đơn vị**: cos, sin = tọa độ điểm trên đường tròn r=1.
4. **Góc lượng giác**: có dấu, có thể vượt $2\\pi$. **Góc đồng cuối** $\\theta + k\\cdot 2\\pi$ trùng vị trí; 4 **góc phần tư** quyết định dấu cos/sin.
5. **$\\ell = r\\theta$**, **$S = \\frac{1}{2}r^2\\theta$** ($\\theta$ tính bằng radian).
6. **Vận tốc góc** $\\omega$ (rad/s) = góc quét/giây; $v = \\omega\\cdot r$.
`;
