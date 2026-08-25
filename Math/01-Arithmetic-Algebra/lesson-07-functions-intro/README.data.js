// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/01-Arithmetic-Algebra/lesson-07-functions-intro/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Hàm số

## Mục tiêu

- Hiểu **hàm số** là gì — gán mỗi input một output duy nhất.
- Biết các khái niệm: **tập xác định (domain)**, **tập giá trị (range)**, **hàm hợp**.
- Đọc và vẽ **đồ thị** hàm số.
- Phân biệt hàm **đơn ánh**, **toàn ánh**, **song ánh**.
- Nhận biết **hàm chẵn/lẻ** (đối xứng) và **hàm từng khúc (piecewise)**.

## Kiến thức tiền đề

- [Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/).

---

## 1. Hàm số

### 1.1. Định nghĩa

**Hàm số** = quy tắc gán **mỗi giá trị x trong tập A** với **đúng MỘT giá trị y trong tập B**.

Viết: $f: A \\to B$, $y = f(x)$.

💡 **Trực giác — chiếc máy bán nước tự động**: hàm số như một **chiếc máy** có một đầu vào (input x) và một đầu ra (output $f(x)$). Hình dung **máy bán nước** ở siêu thị:

<svg viewBox="0 0 540 160" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Máy bán nước tự động: mỗi mệnh giá tiền đưa vào cho ra đúng một sản phẩm">
  <defs>
    <marker id="g1arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#475569"/>
    </marker>
  </defs>
  <g font-size="12.5" font-weight="600" fill="#15803d" text-anchor="end">
    <text x="100" y="49">10.000đ</text>
    <text x="100" y="89">15.000đ</text>
    <text x="100" y="129">20.000đ</text>
  </g>
  <g stroke="#475569" stroke-width="1.8" marker-end="url(#g1arr)">
    <line x1="108" y1="45" x2="188" y2="45"/>
    <line x1="108" y1="85" x2="188" y2="85"/>
    <line x1="108" y1="125" x2="188" y2="125"/>
  </g>
  <rect x="196" y="22" width="136" height="126" rx="10" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="264" y="90" font-size="13.5" font-weight="700" fill="#1d4ed8" text-anchor="middle">Máy bán nước</text>
  <g stroke="#475569" stroke-width="1.8" marker-end="url(#g1arr)">
    <line x1="340" y1="45" x2="414" y2="45"/>
    <line x1="340" y1="85" x2="414" y2="85"/>
    <line x1="340" y1="125" x2="414" y2="125"/>
  </g>
  <g font-size="12.5" font-weight="600" fill="#dc2626">
    <text x="422" y="49">1 chai nước suối</text>
    <text x="422" y="89">1 chai trà xanh</text>
    <text x="422" y="129">1 chai sữa</text>
  </g>
</svg>

Bạn nhét tờ tiền vào (input), máy trả ra đúng MỘT sản phẩm (output). **Đặc tính sống còn**: nhét cùng một mệnh giá hai lần khác nhau, máy luôn trả ra **cùng một sản phẩm**. Nếu lần này 10.000đ ra chai nước, lần khác 10.000đ ra chai trà — đó là máy **hỏng**, không phải hàm. Hàm số cũng vậy: cùng input → cùng output, **luôn luôn**.

Chiều ngược lại thì không bắt buộc: hai mệnh giá khác nhau có thể ra cùng một sản phẩm (vd 10.000đ và 12.000đ đều ra nước suối). Cũng giống $f(2) = f(-2) = 4$ ở hàm $x^2$ — nhiều input ra cùng output **vẫn ổn**.

Sơ đồ tổng quát:

<svg viewBox="0 0 400 104" style="max-width:420px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Sơ đồ tổng quát của hàm số: input x đi qua máy f cho ra output f(x)">
  <defs>
    <marker id="g2arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#475569"/>
    </marker>
  </defs>
  <text x="70" y="52" font-size="16" font-weight="700" font-style="italic" fill="#15803d" text-anchor="middle">x</text>
  <text x="70" y="76" font-size="11" fill="#475569" text-anchor="middle">input</text>
  <line x1="90" y1="47" x2="158" y2="47" stroke="#475569" stroke-width="1.8" marker-end="url(#g2arr)"/>
  <rect x="166" y="22" width="68" height="50" rx="8" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="200" y="53" font-size="18" font-weight="700" font-style="italic" fill="#1d4ed8" text-anchor="middle">f</text>
  <line x1="242" y1="47" x2="310" y2="47" stroke="#475569" stroke-width="1.8" marker-end="url(#g2arr)"/>
  <text x="348" y="52" font-size="15" font-weight="700" font-style="italic" fill="#dc2626" text-anchor="middle">f(x)</text>
  <text x="348" y="76" font-size="11" fill="#475569" text-anchor="middle">output</text>
</svg>

**Vì sao quan trọng?** Vì:
- Hàm số mô hình hóa **mọi quan hệ** trong khoa học: lực phụ thuộc khối lượng, tốc độ phụ thuộc thời gian...
- Là **đối tượng nghiên cứu chính** của giải tích (đạo hàm, tích phân của hàm).
- Là **building block** của lập trình.

### 1.1b. Ký hiệu và ví dụ tính giá trị

Ký hiệu phổ biến nhất: $y = f(x)$ — đọc *"y bằng f của x"*. Một ký hiệu khác trong sách cao cấp: $f : x \\mapsto f(x)$ — đọc *"f là quy tắc gán x đến f(x)"*. Mũi tên $\\mapsto$ (mapsto) nói về việc *gán phần tử*, khác $\\to$ (dùng cho "từ tập này sang tập kia"). Vd $f : \\mathbb{R} \\to \\mathbb{R},\\ x \\mapsto x^2$.

Cho $f(x) = 2x + 1$ (quy tắc *"lấy x, nhân 2, cộng 1"*), tính một bảng giá trị:

| x | Tính | f(x) |
|---|------|------|
| 0 | $2\\cdot 0 + 1$ | $1$ |
| 1 | $2\\cdot 1 + 1$ | $3$ |
| 3 | $2\\cdot 3 + 1$ | $\\mathbf{7}$ |
| $-1$ | $2\\cdot(-1) + 1$ | $-1$ |
| $0.5$ | $2\\cdot 0.5 + 1$ | $2$ |

Ta nói *"f gửi 3 đến 7"*, viết $f(3) = 7$.

❓ **Phân biệt $f$ và $f(x)$** — câu gây nhầm số một cho người mới:
- $f$ là **bản thân hàm** — quy tắc, "chiếc máy", một đối tượng (object) đại diện cho toàn bộ ánh xạ.
- $f(x)$ là **giá trị output** khi input là $x$ — một số (hoặc biểu thức theo x), kết quả của việc gọi hàm.

Với $f(x) = x^2 + 1$:

| Viết | Ý nghĩa | Loại |
|------|---------|------|
| $f$ | "Quy tắc: bình phương rồi cộng 1" | Hàm (đối tượng) |
| $f(3)$ | $3^2 + 1 = 10$ | Số |
| $f(x)$ | $x^2 + 1$ | Biểu thức theo x |
| $f(a+1)$ | $(a+1)^2 + 1 = a^2 + 2a + 2$ | Biểu thức theo a |

### 1.1c. Bốn cách biểu diễn một hàm

Một hàm **không nhất thiết** phải có công thức đại số — chỉ cần quy tắc rõ ràng "input → output duy nhất". Bốn cách mô tả cùng một hàm "lấy x, bình phương, cộng 1":

1. **Công thức**: $f(x) = x^2 + 1$. Gọn, tính được với mọi x. Tốt cho lý thuyết.
2. **Bảng giá trị**: $\\{(-2,5),\\ (-1,2),\\ (0,1),\\ (1,2),\\ (2,5)\\}$. Tốt cho dữ liệu thực nghiệm khi chưa biết công thức.
3. **Đồ thị**: vẽ đường cong trên mặt phẳng (parabol đỉnh $(0,1)$ mở lên).
4. **Mô tả bằng lời / thuật toán**: *"lấy x, bình phương, cộng 1"*.

**Ví dụ thực tế không có công thức đại số**: hàm "dân số Việt Nam vào năm $x$" (chỉ có bảng thống kê); hàm $\\pi(x)$ đếm số nguyên tố $\\le x$ (có định nghĩa nhưng không có công thức đóng gọn); hàm "kết quả mạng neural đã train" (triệu tham số, không gọn thành công thức). Cả bốn cách đều mô tả "cùng một quy tắc".

### 1.1d. Bảng so sánh: Là hàm vs Không phải hàm

| ✅ Là hàm số | ❌ Không phải hàm số |
|---|---|
| $y = 2x + 1$ (mỗi x → 1 y) | $y^2 = x$ (vd $x=4 \\Rightarrow y = \\pm 2$) |
| $y = x^2$ | $x^2 + y^2 = 1$ (đường tròn: $x=0 \\Rightarrow y = \\pm 1$) |
| $y = \\sqrt{x},\\ x \\ge 0$ (nhánh không âm) | $y = \\pm\\sqrt{x}$ (kèm $\\pm$ → 2 output) |
| Bảng $\\{(1,5),(2,7),(3,5)\\}$ (mỗi x 1 lần) | Bảng $\\{(1,5),(2,7),(1,9)\\}$ ($x=1$ hai lần) |

**Mẹo nhận biết "không phải hàm"**: (1) có $\\pm$ trong biểu thức y theo x; (2) lũy thừa chẵn của y ($y^2 = \\ldots$); (3) quan hệ "một-nhiều" đời thực (1 người nhiều con); (4) đồ thị fail vertical line test (mục 2).

### 1.2. Các khái niệm

- **Tập xác định D (domain)**: tập các x mà $f(x)$ có nghĩa.
- **Tập giá trị E (range)**: tập các y có thể nhận được.
- Vd $f(x) = \\sqrt{x}$: $D = [0, +\\infty)$, $E = [0, +\\infty)$.
- Vd $g(x) = 1/x$: $D = \\mathbb{R}\\setminus\\{0\\}$, $E = \\mathbb{R}\\setminus\\{0\\}$.

#### 1.2.1. Quy trình tìm tập xác định — 3 bước

Mỗi khi gặp một hàm, chạy quy trình 3 bước, rồi **lấy giao** các điều kiện:

> **Bước 1 — mẫu số**: tìm mọi mẫu trong công thức, ép $\\text{mẫu} \\neq 0$, loại các x làm mẫu bằng 0.
>
> **Bước 2 — căn bậc chẵn**: tìm mọi $\\sqrt{\\phantom{x}}$, $\\sqrt[4]{\\phantom{x}}$, ép $\\text{biểu thức trong căn} \\geq 0$.
>
> **Bước 3 — log**: tìm mọi $\\ln$, $\\log_b$, ép $\\text{biểu thức trong log} > 0$.

Nếu công thức không có mẫu / căn chẵn / log → Domain $= \\mathbb{R}$.

#### 1.2.2. Walk-through 5 ví dụ tìm domain

**Ví dụ 1** (phân thức): $f(x) = \\dfrac{1}{x - 3}$.
- Bước 1: mẫu $x - 3 \\neq 0 \\Rightarrow x \\neq 3$. Bước 2, 3: không có.

→ **Domain $= \\mathbb{R}\\setminus\\{3\\} = (-\\infty, 3)\\cup(3, +\\infty)$**.

**Ví dụ 2** (căn): $f(x) = \\sqrt{2x - 6}$.
- Bước 2: ép $2x - 6 \\geq 0 \\Rightarrow x \\geq 3$. Bước 1, 3: không có.

→ **Domain $= [3, +\\infty)$**.

**Ví dụ 3** (log của biểu thức bậc 2): $f(x) = \\ln(x^2 - 4)$.
- Bước 3: ép $x^2 - 4 > 0 \\Rightarrow x^2 > 4 \\Rightarrow x < -2$ hoặc $x > 2$.

→ **Domain $= (-\\infty, -2)\\cup(2, +\\infty)$**.

**Ví dụ 4** (căn lồng phân thức — 2 ràng buộc): $f(x) = \\dfrac{\\sqrt{x + 1}}{x - 2}$.
- Bước 1: mẫu $x - 2 \\neq 0 \\Rightarrow x \\neq 2$.
- Bước 2: căn $x + 1 \\geq 0 \\Rightarrow x \\geq -1$.
- Giao: $x \\geq -1$ AND $x \\neq 2$.

→ **Domain $= [-1, 2)\\cup(2, +\\infty)$**.

**Ví dụ 5** (3 ràng buộc cùng lúc): $f(x) = \\dfrac{\\ln(x - 1)}{\\sqrt{5 - x}}$.
- Bước 1: mẫu $\\sqrt{5 - x} \\neq 0 \\Rightarrow 5 - x \\neq 0 \\Rightarrow x \\neq 5$.
- Bước 2: căn $5 - x \\geq 0 \\Rightarrow x \\leq 5$. Kết hợp bước 1 → $x < 5$.
- Bước 3: log $x - 1 > 0 \\Rightarrow x > 1$.
- Giao: $1 < x < 5$.

→ **Domain $= (1, 5)$**.

**Tip**: viết mỗi điều kiện thành một dòng riêng rồi vẽ lên trục số để tìm giao. Khi có $\\geq 2$ ràng buộc, đừng cố làm trong đầu.

#### 1.2.3. Tập giá trị (range) — cách tìm + 3 ví dụ

**Range** $= f(D)$ là **tập tất cả các giá trị $f(x)$ thực sự đạt được** khi $x$ chạy khắp domain. Tìm range thường khó hơn domain — không có "quy trình 3 bước" cố định, mà dùng **một trong ba** chiến lược:

1. **Hình dung đồ thị**: vẽ thô, nhìn y "với tới" giá trị nào.
2. **Giải y theo x**, hỏi *"y nào thì có x trả lại?"*.
3. **Phân tích biểu thức**: dùng "bình phương $\\geq 0$", "$\\exp > 0$", "$\\sin/\\cos \\in [-1,1]$".

**Ví dụ 1**: $f(x) = x^2 + 3$. Vì $x^2 \\geq 0$ với mọi x $\\Rightarrow x^2 + 3 \\geq 3$. Đạt $y = 3$ tại $x = 0$, $y = 7$ tại $x = 2$. → **Range $= [3, +\\infty)$**.

**Ví dụ 2**: $f(x) = e^x - 2$. Vì $e^x > 0$ với mọi x $\\Rightarrow e^x - 2 > -2$; khi $x \\to -\\infty$ thì $e^x \\to 0^+$ nên $f \\to -2^+$ (tiệm cận, không chạm). → **Range $= (-2, +\\infty)$**.

**Ví dụ 3**: $f(x) = 2\\sin(x) + 1$. Vì $\\sin x \\in [-1, 1] \\Rightarrow 2\\sin x \\in [-2, 2] \\Rightarrow 2\\sin x + 1 \\in [-1, 3]$. Đạt biên: $x = \\pi/2 \\Rightarrow f = 3$; $x = -\\pi/2 \\Rightarrow f = -1$. → **Range $= [-1, 3]$**.

⚠ **Range phụ thuộc domain.** Cùng $f(x) = x^2$ nhưng: domain $\\mathbb{R}$ → range $[0,+\\infty)$; domain $[1,3]$ → range $[1,9]$; domain $[-2,1]$ → range $[0,4]$ (y nhỏ nhất tại $x=0$, không phải tại biên). Mỗi khi tìm range, **luôn nhớ domain đang là gì**.

### 1.3. Hàm hợp

💡 **Trực giác — xếp 2 máy nối tiếp**: composition (hàm hợp) = nối output của máy này vào input của máy kia:

<svg viewBox="0 0 560 96" style="max-width:580px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Hàm hợp: x qua máy g thành g(x), rồi qua máy f thành f(g(x))">
  <defs>
    <marker id="g3arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#475569"/>
    </marker>
  </defs>
  <text x="32" y="53" font-size="15" font-weight="700" font-style="italic" fill="#15803d" text-anchor="middle">x</text>
  <line x1="46" y1="48" x2="84" y2="48" stroke="#475569" stroke-width="1.8" marker-end="url(#g3arr)"/>
  <rect x="90" y="24" width="80" height="48" rx="8" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="130" y="53" font-size="13" font-weight="700" fill="#1d4ed8" text-anchor="middle">Máy g</text>
  <line x1="174" y1="48" x2="212" y2="48" stroke="#475569" stroke-width="1.8" marker-end="url(#g3arr)"/>
  <text x="243" y="53" font-size="14" font-weight="700" font-style="italic" fill="#475569" text-anchor="middle">g(x)</text>
  <line x1="274" y1="48" x2="312" y2="48" stroke="#475569" stroke-width="1.8" marker-end="url(#g3arr)"/>
  <rect x="318" y="24" width="80" height="48" rx="8" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="358" y="53" font-size="13" font-weight="700" fill="#1d4ed8" text-anchor="middle">Máy f</text>
  <line x1="402" y1="48" x2="440" y2="48" stroke="#475569" stroke-width="1.8" marker-end="url(#g3arr)"/>
  <text x="492" y="53" font-size="15" font-weight="700" font-style="italic" fill="#dc2626" text-anchor="middle">f(g(x))</text>
</svg>

**$(f\\circ g)(x) = f(g(x))$**: áp dụng g trước, rồi f. Lưu ý **thứ tự đọc ngược chiều viết** — $f\\circ g$ đọc *"f sau khi g"*, tức $g$ chạy **trước**.

Ví dụ: $f(x) = x^2$, $g(x) = x + 1$.
- $(f\\circ g)(x) = f(g(x)) = (x+1)^2$.
- $(g\\circ f)(x) = g(f(x)) = x^2 + 1$.

Lưu ý: **$f\\circ g \\neq g\\circ f$** thường.

#### 1.3.1. Tính $(g\\circ f)(3)$ từng bước — 2 cách

Cho $f(x) = 2x + 1$ và $g(x) = x^2$. Tính $(g\\circ f)(3)$:

**Cách 1 — chạy từng máy** (nhanh cho một giá trị cụ thể):

<svg viewBox="0 0 440 262" style="max-width:440px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Chạy từng máy: input 3 qua máy f được 7 ở bước 1, qua máy g được 49 ở bước 2">
  <defs>
    <marker id="g4arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#475569"/>
    </marker>
  </defs>
  <text x="190" y="32" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle">Input: 3</text>
  <line x1="190" y1="42" x2="190" y2="62" stroke="#475569" stroke-width="1.8" marker-end="url(#g4arr)"/>
  <rect x="80" y="68" width="220" height="46" rx="8" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="190" y="96" font-size="13" font-weight="600" fill="#1d4ed8" text-anchor="middle">Máy f : 2·3 + 1 = 7</text>
  <text x="312" y="95" font-size="12" font-style="italic" fill="#475569">(Bước 1)</text>
  <line x1="190" y1="118" x2="190" y2="138" stroke="#475569" stroke-width="1.8" marker-end="url(#g4arr)"/>
  <rect x="80" y="144" width="220" height="46" rx="8" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="190" y="172" font-size="13" font-weight="600" fill="#1d4ed8" text-anchor="middle">Máy g : 7² = 49</text>
  <text x="312" y="171" font-size="12" font-style="italic" fill="#475569">(Bước 2)</text>
  <line x1="190" y1="194" x2="190" y2="214" stroke="#475569" stroke-width="1.8" marker-end="url(#g4arr)"/>
  <text x="190" y="242" font-size="14" font-weight="700" fill="#dc2626" text-anchor="middle">Output: 49&#160;&#160;&#160;⟹&#160;&#160;&#160;(g∘f)(3) = 49</text>
</svg>

**Cách 2 — lập công thức tổng quát rồi thay** (cần khi khảo sát đồ thị / đạo hàm):

$$\\begin{aligned}
(g\\circ f)(x) &= g(f(x)) &&\\leftarrow \\text{định nghĩa} \\\\
              &= g(2x + 1) &&\\leftarrow \\text{thay } f(x) \\text{ vào ô input của } g \\\\
              &= (2x + 1)^2 &&\\leftarrow \\text{áp dụng quy tắc của } g
\\end{aligned}$$

Thay $x = 3$: $(2\\cdot 3 + 1)^2 = 7^2 = 49$ ✓ — cùng kết quả Cách 1.

#### 1.3.2. Vì sao không giao hoán — bảng so sánh

Cùng $f(x) = 2x + 1$, $g(x) = x^2$, chiều ngược $(f\\circ g)(x) = f(g(x)) = f(x^2) = 2x^2 + 1$. So sánh:

| Composition | Công thức | Tại $x=3$ | Tại $x=0$ | Tại $x=-1$ |
|-------------|-----------|-----------|-----------|------------|
| $(g\\circ f)(x)$ | $(2x+1)^2 = 4x^2 + 4x + 1$ | $49$ | $1$ | $1$ |
| $(f\\circ g)(x)$ | $2x^2 + 1$ | $19$ | $1$ | $3$ |

**Khác nhau hoàn toàn.** Trực giác: "cộng 1 rồi bình phương" khác "bình phương rồi cộng 1" — thứ tự thực hiện hai biến đổi quyết định kết quả.

#### 1.3.3. Thêm 1 ví dụ + domain của hàm hợp

Cho $f(x) = \\sqrt{x}$ (domain $x \\geq 0$), $g(x) = x - 1$. Tính $(f\\circ g)(x)$:
- Công thức: $(f\\circ g)(x) = f(x - 1) = \\sqrt{x - 1}$.
- Domain: cần $g(x) = x - 1$ nằm trong domain của $f$ (tức $\\geq 0$) $\\Rightarrow x - 1 \\geq 0 \\Rightarrow x \\geq 1$.

→ **Domain của $f\\circ g$ $= [1, +\\infty)$**. Lưu ý: domain composition **không** mặc nhiên là domain hàm ngoài — phải đảm bảo *output hàm trong* nằm trong *domain hàm ngoài*.

⚠ **Năm lỗi thường gặp**

**Lỗi 1 — quên domain khi tìm tập xác định.** Hai trường hợp làm biểu thức "vô nghĩa": **mẫu = 0** (vd $1/x$ cần $x\\neq 0$) và **căn bậc chẵn của số âm** (vd $\\sqrt{x}$ cần $x\\ge 0$), cộng thêm **log của số $\\le 0$**. Bỏ sót là lỗi phổ biến nhất — luôn chạy quy trình 3 bước (mục 1.2.1).

**Lỗi 2 — nhầm $f^{-1}$ với $1/f$.** Với $f(x) = 2x$: $f^{-1}(x) = x/2$ (hàm ngược), còn $1/f(x) = 1/(2x)$ (nghịch đảo số học). Tại $x = 4$: $f^{-1}(4) = 2$ nhưng $1/f(4) = 1/8$ — hoàn toàn khác.

**Lỗi 3 — nhầm $f(x+h)$ thành $f(x) + h$.** Với $f(x) = x^2$: **đúng** $f(x+h) = (x+h)^2 = x^2 + 2xh + h^2$; **sai** $f(x+h) = x^2 + h$. Verify $x=3, h=1$: cách đúng $f(4) = 16$; cách sai $f(3)+1 = 10$. Lỗi này xuất hiện liên tục khi học đạo hàm (dùng $\\frac{f(x+h)-f(x)}{h}$).

**Lỗi 4 — nhầm $(f\\circ g)(x)$ với $f(x)\\cdot g(x)$.** Với $f(x) = x+1$, $g(x) = x^2$: tích $f(x)\\cdot g(x) = (x+1)x^2 = x^3 + x^2$ (bậc 3), còn $(f\\circ g)(x) = f(x^2) = x^2 + 1$ (bậc 2). Tại $x=2$: tích $= 3\\cdot 4 = 12$; composition $= f(4) = 5$.

**Lỗi 5 — tìm hàm ngược bằng "đảo dấu" thay vì hoán biến.** Thấy $f(x) = 2x+3$ rồi viết $f^{-1}(x) = -2x - 3$ là **sai**. Phải làm 3 bước (mục 3): $y = 2x+3 \\Rightarrow x = (y-3)/2 \\Rightarrow f^{-1}(x) = (x-3)/2$. Verify: $f(5) = 13$, $f^{-1}(13) = 5$ ✓; còn "đảo dấu" cho $f^{-1}(13) = -29$, không trả về 5.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao mỗi x chỉ được 1 y? Quan hệ 1-nhiều thì sao?"* Quan hệ 1 x → nhiều y **không phải hàm số** (vd $x^2 + y^2 = 1$). Tính "duy nhất" của output là điều kiện cốt lõi để gọi là hàm.
- *"$(f\\circ g)$ và $(g\\circ f)$ có bao giờ bằng nhau không?"* Có, trường hợp đặc biệt — ví dụ khi $g = f^{-1}$ thì cả hai bằng $x$. Nhưng nói chung khác nhau.
- *"Hàm có nhất thiết phải có công thức không?"* Không — chỉ cần quy tắc "input → 1 output". Có thể mô tả bằng bảng, đồ thị, hay lời (xem mục 1.1c).

🔁 **Dừng lại tự kiểm tra**: cho $f(x) = 2x$, $g(x) = x+3$. Tính $(f\\circ g)(1)$ và $(g\\circ f)(1)$.

<details><summary>Đáp án</summary>

$(f\\circ g)(1) = f(4) = 8$; $(g\\circ f)(1) = g(2) = 5$. Khác nhau → $f\\circ g \\neq g\\circ f$.

</details>

🔁 **Dừng lại tự kiểm tra (domain/range)**: (1) tìm domain của $f(x) = \\sqrt{x^2 - 9}$; (2) tìm range của $h(x) = 3 - x^2$.

<details><summary>Đáp án</summary>

(1) $x^2 - 9 \\geq 0 \\Rightarrow x \\leq -3$ hoặc $x \\geq 3 \\Rightarrow$ **Domain $= (-\\infty, -3]\\cup[3, +\\infty)$**. (2) $x^2 \\geq 0 \\Rightarrow 3 - x^2 \\leq 3$; khi $x\\to\\pm\\infty$, $3 - x^2 \\to -\\infty \\Rightarrow$ **Range $= (-\\infty, 3]$**.

</details>

### 📝 Tóm tắt mục 1

- Hàm số: mỗi $x$ ↔ **đúng 1** $y$. $f: A \\to B$, $y = f(x)$. Analogy: máy bán nước (cùng tiền → cùng sản phẩm).
- $f$ là hàm (đối tượng); $f(x)$ là số/biểu thức. Hàm mô tả 4 cách: công thức, bảng, đồ thị, lời.
- Domain D = các x hợp lệ; tìm bằng **quy trình 3 bước** (mẫu $\\neq 0$, căn chẵn $\\geq 0$, log $> 0$).
- Range E = các y thực sự nhận được; **phụ thuộc domain**; tìm bằng đồ thị / giải y theo x / phân tích biểu thức.
- Hàm hợp $(f\\circ g)(x) = f(g(x))$ (g chạy trước); thường $f\\circ g \\neq g\\circ f$; domain hợp cần output hàm trong nằm trong domain hàm ngoài.
- 5 lỗi: quên domain, $f^{-1}\\neq 1/f$, $f(x+h)\\neq f(x)+h$, $f\\circ g\\neq f\\cdot g$, hàm ngược không "đảo dấu".

---

## 2. Đồ thị hàm số

### 2.1. Khái niệm

**Đồ thị f** = tập các điểm $(x, f(x))$ trên mặt phẳng Oxy. Trục Ox (ngang) là input $x$, trục Oy (đứng) là output $y = f(x)$. Một điểm $(a, b)$ thuộc đồ thị $\\iff b = f(a)$.

💡 **Là gì**: cách "vẽ" hàm số để thấy hành vi (tăng/giảm, cực trị, chặn).

#### 2.1.1. Vẽ đồ thị bằng tay — ví dụ $f(x) = x^2$

Tính một bảng giá trị rồi chấm điểm và nối:

| x | $-2$ | $-1$ | $0$ | $1$ | $2$ |
|---|----|----|---|---|---|
| $f(x)$ | $4$ | $1$ | $0$ | $1$ | $4$ |

Chấm 5 điểm $(-2,4), (-1,1), (0,0), (1,1), (2,4)$ rồi nối bằng đường cong mượt → **parabol** mở lên:

<svg viewBox="0 0 320 280" style="max-width:360px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Parabol y bằng x bình phương mở lên, đi qua 5 điểm đã chấm từ bảng giá trị">
  <defs>
    <marker id="g5ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/>
    </marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="56" y1="28" x2="56" y2="252"/><line x1="108" y1="28" x2="108" y2="252"/>
    <line x1="212" y1="28" x2="212" y2="252"/><line x1="264" y1="28" x2="264" y2="252"/>
    <line x1="26" y1="56" x2="296" y2="56"/><line x1="26" y1="102" x2="296" y2="102"/>
    <line x1="26" y1="148" x2="296" y2="148"/><line x1="26" y1="194" x2="296" y2="194"/>
  </g>
  <!-- trục -->
  <line x1="20" y1="240" x2="302" y2="240" stroke="#1a202c" stroke-width="1.6" marker-end="url(#g5ax)"/>
  <line x1="160" y1="262" x2="160" y2="24" stroke="#1a202c" stroke-width="1.6" marker-end="url(#g5ax)"/>
  <text x="306" y="234" font-size="12" font-weight="700" fill="#1a202c">x</text>
  <text x="168" y="32" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục -->
  <g font-size="10" fill="#64748b" text-anchor="middle">
    <text x="56" y="256">−2</text><text x="108" y="256">−1</text>
    <text x="212" y="256">1</text><text x="264" y="256">2</text>
    <text x="154" y="198" text-anchor="end">1</text><text x="154" y="152" text-anchor="end">2</text>
    <text x="154" y="106" text-anchor="end">3</text><text x="154" y="60" text-anchor="end">4</text>
    <text x="166" y="256" text-anchor="start">0</text>
  </g>
  <!-- đường cong y = x² (Bezier bậc 2 khớp chính xác parabol) -->
  <path d="M 50.8 37.1 Q 160 442.9 269.2 37.1" fill="none" stroke="#1d4ed8" stroke-width="2.4"/>
  <text x="200" y="70" font-size="12.5" font-weight="700" fill="#1d4ed8">f(x) = x²</text>
  <!-- 5 điểm chấm từ bảng giá trị -->
  <g fill="#dc2626">
    <circle cx="56" cy="56" r="4.5"/><circle cx="108" cy="194" r="4.5"/>
    <circle cx="160" cy="240" r="4.5"/><circle cx="212" cy="194" r="4.5"/>
    <circle cx="264" cy="56" r="4.5"/>
  </g>
</svg>

### 2.2. Test đường thẳng đứng

Một đường cong trên mặt phẳng là đồ thị của 1 hàm số $\\iff$ **mọi đường thẳng đứng cắt nó tại tối đa 1 điểm**.

- Đường thẳng $y = x$: hàm. ✓
- Parabol $y = x^2$: hàm. ✓
- Đường tròn $x^2 + y^2 = 1$: KHÔNG phải hàm (vì 1 x có thể cho 2 y).

#### 2.2.1. Bảng áp dụng vertical line test

| Đồ thị | Kết quả test | Là hàm? |
|--------|--------------|---------|
| $y = x^2$ (parabol mở lên) | Mọi đường đứng cắt 1 điểm | ✅ |
| $y = x^3$ (cubic) | Mọi đường đứng cắt 1 điểm | ✅ |
| $y = \\sin(x)$ (lượn sóng) | Mọi đường đứng cắt 1 điểm | ✅ |
| $x = y^2$ (parabol mở sang phải) | $x = 4$ cắt tại $(4, 2)$ và $(4, -2)$ | ❌ |
| $x^2 + y^2 = 1$ (đường tròn) | $x = 0$ cắt tại $(0, 1)$ và $(0, -1)$ | ❌ |
| Đường thẳng đứng $x = 5$ | Cắt nó tại vô số điểm | ❌ |

**Khắc phục**: nếu đồ thị fail test, **chia làm 2 nhánh** thành 2 hàm. Vd $x^2 + y^2 = 1$ tách thành $y = \\sqrt{1 - x^2}$ (nửa trên, hàm OK) và $y = -\\sqrt{1 - x^2}$ (nửa dưới, hàm OK).

❓ **Câu hỏi tự nhiên của người đọc**: *"Vì sao 'đường thẳng đứng' lại là phép thử?"* Vì đường thẳng đứng $x = c$ gom tất cả các điểm có **cùng** $x = c$. Nếu nó cắt đồ thị ở 2 điểm → có 2 giá trị y cho cùng 1 x → vi phạm tính "duy nhất" → không phải hàm.

🔁 **Dừng lại tự kiểm tra**: parabol nằm ngang $x = y^2$ có phải đồ thị hàm $y = f(x)$ không?

<details><summary>Đáp án</summary>

**Không**. Vd $x=4$ cho $y=2$ và $y=-2$ → đường thẳng đứng cắt 2 điểm.

</details>

### 📝 Tóm tắt mục 2

- Đồ thị f = tập điểm $(x, f(x))$ trên Oxy.
- **Test đường thẳng đứng**: cắt tối đa 1 điểm $\\iff$ là đồ thị hàm số.

---

## 3. Đơn / Toàn / Song ánh

- **Đơn ánh (injective)**: mọi x khác nhau → y khác nhau. (Không có 2 input cho cùng output.)
- **Toàn ánh (surjective)**: mọi y trong tập đích đều đạt được.
- **Song ánh (bijective)**: vừa đơn vừa toàn → có **hàm ngược** $f^{-1}$.

Ví dụ:
- $f(x) = x^2$: KHÔNG đơn ánh (vì $f(2) = f(-2) = 4$).
- $f(x) = x^3$: song ánh.
- $f(x) = e^x$ (từ $\\mathbb{R} \\to (0,\\infty)$): song ánh, hàm ngược là $\\ln(x)$.

💡 **Trực giác**: **đơn ánh** = "không đụng hàng" (không 2 input ra cùng output); **toàn ánh** = "phủ kín" (mọi output đều có người chọn); **song ánh** = vừa không đụng hàng vừa phủ kín → ghép cặp 1-1 hoàn hảo → đảo ngược được.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chỉ song ánh mới có hàm ngược?"* Vì hàm ngược phải gửi mỗi $y$ về **đúng 1** $x$. Nếu không đơn ánh, 1 $y$ ứng 2 $x$ → không biết về cái nào. Nếu không toàn ánh, có $y$ không có $x$ → không định nghĩa được.
- *"$x^2$ không đơn ánh, vậy nó vô dụng?"* Không — chỉ cần **thu hẹp miền** về $[0,\\infty)$ thì $x^2$ thành đơn ánh, có ngược là $\\sqrt{x}$. Đó là lý do $\\sqrt{\\phantom{x}}$ định nghĩa cho $x\\ge 0$.

### 3.1. Hàm ngược — quy trình 3 bước

💡 **Trực giác — máy chạy ngược chiều**: nếu $f$ là máy "biến x thành y", thì **hàm ngược** $f^{-1}$ là máy bấm nút "rewind" — biến y trở lại x:

<svg viewBox="0 0 500 132" style="max-width:520px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Máy f chạy chiều thuận biến x thành y; máy f ngược chạy chiều ngược biến y trở lại x">
  <defs>
    <marker id="g6arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#475569"/>
    </marker>
  </defs>
  <!-- chiều thuận -->
  <text x="50" y="50" font-size="15" font-weight="700" font-style="italic" fill="#1a202c" text-anchor="middle">x</text>
  <line x1="66" y1="45" x2="126" y2="45" stroke="#475569" stroke-width="1.8" marker-end="url(#g6arr)"/>
  <rect x="130" y="22" width="80" height="46" rx="8" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="170" y="51" font-size="16" font-weight="700" font-style="italic" fill="#1d4ed8" text-anchor="middle">f</text>
  <line x1="214" y1="45" x2="274" y2="45" stroke="#475569" stroke-width="1.8" marker-end="url(#g6arr)"/>
  <text x="290" y="50" font-size="15" font-weight="700" font-style="italic" fill="#1a202c" text-anchor="middle">y</text>
  <text x="320" y="49" font-size="12" font-style="italic" fill="#475569">(chiều thuận)</text>
  <!-- chiều ngược -->
  <text x="50" y="110" font-size="15" font-weight="700" font-style="italic" fill="#1a202c" text-anchor="middle">y</text>
  <line x1="66" y1="105" x2="126" y2="105" stroke="#475569" stroke-width="1.8" marker-end="url(#g6arr)"/>
  <rect x="130" y="82" width="80" height="46" rx="8" fill="#f0fdf4" stroke="#15803d" stroke-width="2"/>
  <text x="170" y="111" font-size="16" font-weight="700" font-style="italic" fill="#15803d" text-anchor="middle">f⁻¹</text>
  <line x1="214" y1="105" x2="274" y2="105" stroke="#475569" stroke-width="1.8" marker-end="url(#g6arr)"/>
  <text x="290" y="110" font-size="15" font-weight="700" font-style="italic" fill="#1a202c" text-anchor="middle">x</text>
  <text x="320" y="109" font-size="12" font-style="italic" fill="#475569">(chiều ngược)</text>
</svg>

Nếu $f$ "đưa 3 thành 7" thì $f^{-1}$ "đưa 7 trở lại thành 3". Ký hiệu $f^{-1}$ đọc *"f ngược"* — **không phải** $1/f$.

**Điều kiện tồn tại**: $f$ phải **đơn ánh**. Nếu $f(2) = f(-2) = 4$ (như $x^2$), khi đảo ngược hỏi *"cái nào ra 4?"* — không trả lời được vì có cả $2$ và $-2$. Thử bằng đồ thị: **horizontal line test** — mọi đường ngang cắt $\\leq 1$ điểm thì f đơn ánh.

Quy trình tìm $f^{-1}$:

> **Bước 1**: đặt $y = f(x)$.
>
> **Bước 2**: **giải $x$ theo $y$** (đảo các phép toán: cộng↔trừ, nhân↔chia, mũ↔log).
>
> **Bước 3**: **hoán đổi tên biến** $x \\leftrightarrow y$ để có $f^{-1}(x) = \\ldots$.

#### 3.1.1. Walk-through 3 ví dụ

**Ví dụ 1** (bậc 1): $f(x) = 2x + 3$.
$$\\begin{aligned}
y &= 2x + 3 \\\\
y - 3 &= 2x &&\\text{(trừ 3)} \\\\
x &= \\tfrac{y - 3}{2} &&\\text{(chia 2)}
\\end{aligned}$$
Hoán đổi: $f^{-1}(x) = \\dfrac{x - 3}{2}$. **Kiểm tra**: $f(5) = 13$, $f^{-1}(13) = (13-3)/2 = 5$ ✓.

**Ví dụ 2** (mũ → log): $f(x) = e^x + 1$.
$$\\begin{aligned}
y - 1 &= e^x &&\\text{(trừ 1)} \\\\
\\ln(y - 1) &= x &&\\text{(lấy ln — ngược của } e^x\\text{)}
\\end{aligned}$$
Hoán đổi: $f^{-1}(x) = \\ln(x - 1)$, domain $x > 1$. **Kiểm tra**: $f(0) = e^0 + 1 = 2$, $f^{-1}(2) = \\ln(1) = 0$ ✓.

**Ví dụ 3** (phân thức, khó hơn): $f(x) = \\dfrac{2x + 1}{x - 3}$.
$$\\begin{aligned}
y(x - 3) &= 2x + 1 &&\\text{(nhân chéo)} \\\\
yx - 3y &= 2x + 1 \\\\
yx - 2x &= 3y + 1 &&\\text{(gom x sang trái)} \\\\
x(y - 2) &= 3y + 1 \\\\
x &= \\tfrac{3y + 1}{y - 2}
\\end{aligned}$$
Hoán đổi: $f^{-1}(x) = \\dfrac{3x + 1}{x - 2}$, domain $x \\neq 2$. **Kiểm tra**: $f(4) = 9/1 = 9$, $f^{-1}(9) = (27+1)/(9-2) = 28/7 = 4$ ✓.

**Phép thử "vào ra"**: nếu $g = f^{-1}$ thì $f(g(y)) = y$ và $g(f(x)) = x$ — chạy qua máy $f$ rồi máy $g$ thì trở lại điểm xuất phát.

#### 3.1.2. Đồ thị: f và f⁻¹ đối xứng qua đường y = x

> **Đồ thị $f^{-1}$ là đối xứng của đồ thị $f$ qua đường thẳng $y = x$.**

Lý do: $(a, b)$ thuộc đồ thị $f \\iff b = f(a) \\iff a = f^{-1}(b) \\iff (b, a)$ thuộc đồ thị $f^{-1}$. Mà $(a, b)$ và $(b, a)$ đối xứng nhau qua $y = x$. Minh họa với $f(x) = 2x + 1$ và $f^{-1}(x) = (x-1)/2$:

<svg viewBox="0 0 360 360" style="max-width:400px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị y bằng 2x cộng 1 và hàm ngược của nó đối xứng nhau qua đường thẳng y bằng x, với ba cặp điểm tương ứng nối bằng nét đứt">
  <defs>
    <marker id="g7ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#1a202c"/>
    </marker>
  </defs>
  <!-- lưới -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="60" y1="26" x2="60" y2="344"/><line x1="140" y1="26" x2="140" y2="344"/>
    <line x1="180" y1="26" x2="180" y2="344"/><line x1="220" y1="26" x2="220" y2="344"/>
    <line x1="260" y1="26" x2="260" y2="344"/><line x1="300" y1="26" x2="300" y2="344"/>
    <line x1="24" y1="60" x2="344" y2="60"/><line x1="24" y1="100" x2="344" y2="100"/>
    <line x1="24" y1="140" x2="344" y2="140"/><line x1="24" y1="180" x2="344" y2="180"/>
    <line x1="24" y1="220" x2="344" y2="220"/><line x1="24" y1="300" x2="344" y2="300"/>
  </g>
  <!-- trục -->
  <line x1="24" y1="260" x2="346" y2="260" stroke="#1a202c" stroke-width="1.6" marker-end="url(#g7ax)"/>
  <line x1="100" y1="346" x2="100" y2="22" stroke="#1a202c" stroke-width="1.6" marker-end="url(#g7ax)"/>
  <text x="348" y="254" font-size="12" font-weight="700" fill="#1a202c">x</text>
  <text x="108" y="30" font-size="12" font-weight="700" fill="#1a202c">y</text>
  <!-- nhãn số trục -->
  <g font-size="10" fill="#64748b" text-anchor="middle">
    <text x="140" y="274">1</text><text x="220" y="274">3</text><text x="300" y="274">5</text>
    <text x="94" y="224" text-anchor="end">1</text><text x="94" y="144" text-anchor="end">3</text>
    <text x="94" y="64" text-anchor="end">5</text>
    <text x="92" y="274" text-anchor="end">O</text>
  </g>
  <!-- trục đối xứng y = x -->
  <line x1="24" y1="336" x2="332" y2="28" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6,5"/>
  <text x="316" y="70" font-size="11.5" font-style="italic" fill="#64748b" text-anchor="middle">y = x</text>
  <!-- nét đứt nối các cặp điểm đối xứng -->
  <g stroke="#dc2626" stroke-width="1.3" stroke-dasharray="4,4">
    <line x1="100" y1="220" x2="140" y2="260"/>
    <line x1="140" y1="140" x2="220" y2="220"/>
    <line x1="180" y1="60" x2="300" y2="180"/>
  </g>
  <!-- đồ thị f: y = 2x + 1 -->
  <line x1="42" y1="336" x2="196" y2="28" stroke="#1d4ed8" stroke-width="2.4"/>
  <text x="204" y="42" font-size="12" font-weight="700" fill="#1d4ed8">y = 2x + 1</text>
  <!-- đồ thị f⁻¹: y = (x − 1)/2 -->
  <line x1="24" y1="318" x2="336" y2="162" stroke="#15803d" stroke-width="2.4"/>
  <text x="238" y="150" font-size="12" font-weight="700" fill="#15803d">y = (x − 1)/2</text>
  <!-- điểm trên f -->
  <g fill="#1d4ed8">
    <circle cx="100" cy="220" r="4.5"/><circle cx="140" cy="140" r="4.5"/><circle cx="180" cy="60" r="4.5"/>
  </g>
  <g font-size="10.5" font-weight="700" fill="#1d4ed8" text-anchor="end">
    <text x="92" y="208">(0, 1)</text><text x="132" y="134">(1, 3)</text><text x="172" y="54">(2, 5)</text>
  </g>
  <!-- điểm trên f⁻¹ -->
  <g fill="#15803d">
    <circle cx="140" cy="260" r="4.5"/><circle cx="220" cy="220" r="4.5"/><circle cx="300" cy="180" r="4.5"/>
  </g>
  <g font-size="10.5" font-weight="700" fill="#15803d">
    <text x="134" y="246" text-anchor="end">(1, 0)</text><text x="226" y="240">(3, 1)</text>
    <text x="294" y="170" text-anchor="end">(5, 2)</text>
  </g>
</svg>

Cặp điểm tương ứng (đối xứng qua $y = x$, nối bằng nét đứt đỏ trên hình):

| Trên đồ thị $f$ | Trên đồ thị $f^{-1}$ |
|-----------------|----------------------|
| $(0, 1)$ | $(1, 0)$ |
| $(1, 3)$ | $(3, 1)$ |
| $(2, 5)$ | $(5, 2)$ |

Lật tờ giấy theo đường chéo $y = x$, đồ thị $f$ trùng đồ thị $f^{-1}$. Tương tự: $e^x$ và $\\ln x$ đối xứng qua $y = x$; $x^3$ và $\\sqrt[3]{x}$ cũng vậy.

🔁 **Dừng lại tự kiểm tra**: $f(x) = 2x + 1$ có song ánh không? Hàm ngược?

<details><summary>Đáp án</summary>

Có (mọi hàm bậc 1 với $a\\neq 0$ đều song ánh). Ngược: $y = 2x+1 \\to x = (y-1)/2 \\to f^{-1}(x) = (x-1)/2$.

</details>

### 📝 Tóm tắt mục 3

- Đơn ánh (input khác → output khác), toàn ánh (phủ hết đích), song ánh (cả hai).
- Chỉ **song ánh** mới có hàm ngược $f^{-1}$.
- Hàm không đơn ánh có thể "cứu" bằng cách thu hẹp miền.
- Tìm $f^{-1}$: **3 bước** — (1) $y = f(x)$, (2) giải $x$ theo $y$, (3) hoán đổi $x \\leftrightarrow y$.
- Đồ thị $f$ và $f^{-1}$ **đối xứng qua $y = x$**; tính chất $f(f^{-1}(y)) = y$, $f^{-1}(f(x)) = x$.

---

## 4. Hàm chẵn, hàm lẻ & hàm từng khúc

### 4.1. Hàm chẵn / hàm lẻ

💡 **Trực giác**: đây là 2 kiểu **đối xứng** của đồ thị.
- **Hàm chẵn**: $f(-x) = f(x)$ với mọi x → đồ thị **đối xứng qua trục y** (như soi gương). Vd $f(x)=x^2$: $f(-3)=9=f(3)$ ✓.
- **Hàm lẻ**: $f(-x) = -f(x)$ → đồ thị **đối xứng qua gốc O** (quay 180°). Vd $f(x)=x^3$: $f(-2)=-8=-f(2)$ ✓.
- Đa số hàm **không chẵn cũng không lẻ**. Vd $f(x)=x+1$: $f(-1)=0$, nhưng $f(1)=2$ và $-f(1)=-2$ → không thỏa cả hai.

⚠ **Lỗi thường gặp**: tưởng "không chẵn thì phải lẻ". Sai — phần lớn hàm chẳng thuộc loại nào.

### 4.2. Hàm từng khúc (piecewise)

💡 **Là gì**: hàm dùng **công thức khác nhau trên các khoảng khác nhau** của x. Ví dụ kinh điển — trị tuyệt đối:

$$|x| = \\begin{cases} x & \\text{nếu } x \\ge 0 \\\\ -x & \\text{nếu } x < 0 \\end{cases}$$

Tính $|-4|$: vì $-4 < 0$ → dùng nhánh $-x$ → $-(-4) = 4$.

**Ví dụ giá điện bậc thang** (đời sống): 

$$\\text{giá} = \\begin{cases} 1500\\cdot x & \\text{nếu } x \\le 50 \\ (\\text{kWh}) \\\\ 75000 + 2500\\cdot(x-50) & \\text{nếu } x > 50 \\end{cases}$$

Dùng 100 kWh: $x>50$ → $75000 + 2500\\cdot 50 = 200000$ đồng.

❓ **Câu hỏi tự nhiên của người đọc**: *"Hàm từng khúc có còn là 'một hàm' không?"* Có — vẫn mỗi x cho đúng 1 y, chỉ là quy tắc tính đổi theo vùng. Test đường thẳng đứng vẫn qua.

🔁 **Dừng lại tự kiểm tra**: $f(x)=x^2$ chẵn hay lẻ? Còn $f(x)=x^3-x$?

<details><summary>Đáp án</summary>

$x^2$ **chẵn** ($(-x)^2=x^2$). $x^3-x$ **lẻ**: $f(-x)=-x^3+x = -(x^3-x) = -f(x)$.

</details>

### 📝 Tóm tắt mục 4

- Hàm chẵn: $f(-x)=f(x)$ (đối xứng trục y); hàm lẻ: $f(-x)=-f(x)$ (đối xứng gốc O).
- Đa số hàm không chẵn không lẻ.
- Hàm từng khúc: đổi công thức theo khoảng x; $|x|$ là ví dụ chuẩn.

---

## 5. Liên hệ với lập trình và ML

💡 **Hàm toán = hàm trong code.** Khái niệm "function" trong lập trình mượn trực tiếp từ toán (lambda calculus của Church, 1930s → Lisp → mọi ngôn ngữ sau). Hàm $f(x) = 2x + 1$ viết trong Go:

\`\`\`go
func f(x float64) float64 {
    return 2*x + 1   // quy tắc: lấy x, nhân 2, cộng 1
}
// f(3) trong Go cho 7.0; f(3) trong toán cho 7 — cùng quy tắc, cùng kết quả.
\`\`\`

| Yếu tố | Toán | Go |
|--------|------|----|
| Tên hàm | $f$ | \`f\` |
| Input | $x$ (số thực) | \`x float64\` |
| Output | số thực | \`float64\` (sau \`)\`) |
| Quy tắc | $2x + 1$ | \`return 2*x + 1\` |

Khác biệt duy nhất: hàm Go có thể có **hiệu ứng phụ** (in màn hình, sửa biến toàn cục), còn hàm toán **thuần** — cùng input luôn cùng output, không "nhớ" gì giữa các lần gọi.

**Composition trong code.** Hàm có thể là *giá trị*, truyền vào hàm khác để tạo $g\\circ f$:

\`\`\`go
func compose(f, g func(float64) float64) func(float64) float64 {
    return func(x float64) float64 { return g(f(x)) }  // (g∘f)(x)
}
\`\`\`

**Mạng neural = composition khổng lồ.** Một mạng feedforward 2 lớp:

$$f(x) = W_2 \\cdot \\text{ReLU}(W_1 \\cdot x + b_1) + b_2 = (h_3 \\circ h_2 \\circ h_1)(x)$$

với $h_1(x) = W_1 x + b_1$ (affine lớp 1), $h_2 = \\text{ReLU}$ (activation), $h_3(v) = W_2 v + b_2$ (affine lớp 2). Mạng **deep** xếp 10–100 tầng — vẫn chỉ là composition dài hơn.

**Activation function = hàm số đúng nghĩa bài này** — input 1 số, output 1 số. Activation **phi tuyến** xen giữa các lớp là sống còn: không có nó, composition của hàm tuyến tính vẫn tuyến tính (N lớp = 1 lớp).

| Tên | Công thức | Range |
|-----|-----------|-------|
| Sigmoid | $\\sigma(x) = \\dfrac{1}{1 + e^{-x}}$ | $(0, 1)$ |
| Tanh | $\\tanh(x) = \\dfrac{e^x - e^{-x}}{e^x + e^{-x}}$ | $(-1, 1)$ |
| ReLU | $\\text{relu}(x) = \\max(0, x)$ | $[0, +\\infty)$ |

→ Domain/range, composition, hàm ngược (normalizing flow) — mọi thứ ở lesson này gặp lại đủ trong ML.

### 📝 Tóm tắt mục 5

- Hàm Go nhận số, trả số = hàm toán (khác: Go có hiệu ứng phụ, hàm toán thuần).
- \`compose(f, g)\` trả về hàm mới $g\\circ f$.
- Mạng neural = composition \`affine + activation\` chồng nhiều lớp; activation phi tuyến là bắt buộc.

---

## 6. Bài tập

**Bài 1**: Tìm tập xác định:
a) $f(x) = \\sqrt{x - 3}$.
b) $g(x) = 1/(x^2 - 4)$.

**Bài 2**: Cho $f(x) = 2x + 1$, $g(x) = x^2$. Tính $(f\\circ g)(2)$ và $(g\\circ f)(2)$.

**Bài 3**: $y = x^3$ có là hàm số không? Vẽ phác họa.

**Bài 4**: Đường tròn $x^2 + y^2 = 4$ có là hàm số $y = f(x)$ không?

**Bài 5**: $f(x) = 3x - 5$. Tính hàm ngược $f^{-1}(x)$.

**Bài 6**: Xét tính chẵn/lẻ: a) $f(x) = x^4 - 2$, b) $g(x) = x^3 + x$.

**Bài 7**: Cho hàm từng khúc $f(x) = x+1$ nếu $x \\ge 0$, $f(x) = -x$ nếu $x < 0$. Tính $f(2)$ và $f(-3)$.

**Bài 8**: Tìm tập xác định của $f(x) = \\dfrac{\\ln(x - 2)}{\\sqrt{6 - x}}$, rồi tìm tập giá trị của $g(x) = 4 - 2x^2$.

---

## 7. Lời giải chi tiết

**Bài 1**:
a) Quy trình bước 2 (căn chẵn): $x - 3 \\ge 0 \\Rightarrow x \\ge 3$ → **$D = [3, +\\infty)$**.
b) Bước 1 (mẫu): $x^2 - 4 \\neq 0 \\Rightarrow x^2 \\neq 4 \\Rightarrow x \\neq \\pm 2$ → **$D = \\mathbb{R} \\setminus \\{-2, 2\\}$**.

**Bài 2**: Chạy từng máy.
- $(f\\circ g)(2)$: $g(2) = 2^2 = 4$, rồi $f(4) = 2\\cdot 4 + 1 = 9$ → $(f\\circ g)(2) = 9$.
- $(g\\circ f)(2)$: $f(2) = 2\\cdot 2 + 1 = 5$, rồi $g(5) = 5^2 = 25$ → $(g\\circ f)(2) = 25$.
- Khác nhau ($9 \\neq 25$) → minh họa composition không giao hoán.

**Bài 3**: $y = x^3$ **là hàm số** — mỗi x cho đúng 1 y (lập phương xác định duy nhất). Qua vertical line test (mọi đường đứng cắt 1 điểm). Đồ thị S-shape qua gốc O, đối xứng qua O (vì $x^3$ là hàm lẻ). Bảng phác họa:

| x | $-2$ | $-1$ | $0$ | $1$ | $2$ |
|---|----|----|---|---|---|
| $x^3$ | $-8$ | $-1$ | $0$ | $1$ | $8$ |

**Bài 4**: Tại $x = 0$: $y^2 = 4 \\Rightarrow y = \\pm 2$ → 1 x cho 2 y → **KHÔNG phải hàm** $y = f(x)$. Fail vertical line test. Phải tách 2 nhánh: $y = \\sqrt{4-x^2}$ (nửa trên) hoặc $y = -\\sqrt{4-x^2}$ (nửa dưới), mỗi nhánh là một hàm.

**Bài 5**: 3 bước.
- Bước 1: $y = 3x - 5$.
- Bước 2: $3x = y + 5 \\Rightarrow x = (y+5)/3$.
- Bước 3: hoán đổi → **$f^{-1}(x) = (x + 5)/3$**.

Kiểm tra: $f(f^{-1}(x)) = 3\\cdot\\frac{x+5}{3} - 5 = x + 5 - 5 = x$ ✓. Thử số: $f(4) = 7$, $f^{-1}(7) = 12/3 = 4$ ✓.

**Bài 6**:
a) $f(-x) = (-x)^4 - 2 = x^4 - 2 = f(x)$ → **chẵn** (đối xứng trục y).
b) $g(-x) = (-x)^3 + (-x) = -x^3 - x = -(x^3 + x) = -g(x)$ → **lẻ** (đối xứng gốc O).

**Bài 7**: Chọn nhánh theo dấu của x.
- $f(2)$: vì $2 \\ge 0$ → nhánh $x + 1$ → $2 + 1 = 3$.
- $f(-3)$: vì $-3 < 0$ → nhánh $-x$ → $-(-3) = 3$.

**Bài 8**:
- *Domain của $f$* — 3 ràng buộc:
  - Bước 1 (mẫu): $\\sqrt{6 - x} \\neq 0 \\Rightarrow 6 - x \\neq 0 \\Rightarrow x \\neq 6$.
  - Bước 2 (căn): $6 - x \\geq 0 \\Rightarrow x \\leq 6$. Kết hợp bước 1 → $x < 6$.
  - Bước 3 (log): $x - 2 > 0 \\Rightarrow x > 2$.
  - Giao: $2 < x < 6$ → **Domain $= (2, 6)$**.
- *Range của $g(x) = 4 - 2x^2$*: vì $x^2 \\geq 0 \\Rightarrow 2x^2 \\geq 0 \\Rightarrow 4 - 2x^2 \\leq 4$; đạt $4$ tại $x = 0$, và khi $x \\to \\pm\\infty$ thì $g \\to -\\infty$ → **Range $= (-\\infty, 4]$**.

---

## 8. Bài tiếp theo

[Lesson 08 — Hàm sơ cấp](../lesson-08-elementary-functions/).

## 📝 Tổng kết

1. **Hàm số**: mỗi x ↔ 1 y duy nhất (analogy: máy bán nước). Phân biệt $f$ (hàm) với $f(x)$ (số). 4 cách biểu diễn: công thức / bảng / đồ thị / lời.
2. **D (domain)** = tập x hợp lệ — quy trình 3 bước (mẫu $\\neq 0$, căn chẵn $\\geq 0$, log $> 0$). **E (range)** = tập y thực nhận, phụ thuộc domain.
3. **Hàm hợp**: $(f\\circ g)(x) = f(g(x))$ (g chạy trước). Thường $f\\circ g \\neq g\\circ f$.
4. **Test đường thẳng đứng** để kiểm tra là hàm.
5. **Song ánh** $\\iff$ có hàm ngược $f^{-1}$; tìm $f^{-1}$ bằng 3 bước; đồ thị $f$ và $f^{-1}$ đối xứng qua $y = x$.
6. **5 lỗi cốt lõi**: quên domain, $f^{-1}\\neq 1/f$, $f(x+h)\\neq f(x)+h$, $f\\circ g\\neq f\\cdot g$, hàm ngược không "đảo dấu".
7. **Liên hệ ML**: hàm = code function; mạng neural = composition \`affine + activation\`.
`;
