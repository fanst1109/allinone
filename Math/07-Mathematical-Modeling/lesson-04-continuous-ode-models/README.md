# Lesson 04 — Mô hình liên tục (ODE)

## Mục tiêu

- Chuyển từ mô hình **rời rạc** ([L03](../lesson-03-discrete-dynamical/)) sang **liên tục**: mô tả bằng tốc độ thay đổi $dx/dt$.
- **Tăng trưởng mũ** $\frac{dN}{dt} = rN$ và hạn chế của nó.
- **Tăng trưởng logistic** $\frac{dN}{dt} = rN(1-N/K)$: đường cong chữ S, sức chứa $K$ — và vì sao nó *luôn mượt* (khác bản rời rạc hỗn loạn ở L03).
- **Định luật nguội Newton** (giải đầy đủ ODE) và **bài toán bể trộn (mixing)**.
- **Phương pháp Euler**: mô phỏng ODE trên máy chính là biến nó thành phương trình sai phân — nối liền L03 và L04.

## Kiến thức tiền đề

- [Lesson 01](../lesson-01-modeling-cycle/) (chu trình), [Lesson 03](../lesson-03-discrete-dynamical/) (mô hình rời rạc).
- [T6 L07 — Phương trình vi phân (ODE)](../../06-Advanced/lesson-07-differential-equations/) (tách biến, tuyến tính bậc 1).

---

## 1. Từ rời rạc sang liên tục

💡 **Trực giác / Hình dung.** Ở [L03](../lesson-03-discrete-dynamical/), thời gian nhảy theo bước ($n$, $n+1$). Nếu bước nhỏ dần — mỗi giây, mỗi mili-giây — ta tiến tới mô tả **liên tục**: thay "$x_{n+1} - x_n$" (thay đổi mỗi bước) bằng **đạo hàm $dx/dt$** (tốc độ thay đổi tức thời). ODE là ngôn ngữ tự nhiên khi đại lượng biến thiên trơn theo thời gian.

💡 **Trực giác — ODE = "luật tốc độ thay đổi" (a law of how fast things change).** Hầu hết quy luật tự nhiên không nói trực tiếp *"giá trị bằng bao nhiêu"* mà nói *"đang thay đổi nhanh chậm thế nào, tùy theo trạng thái hiện tại"*. Một ODE là một **luật tốc độ**: vế trái $dx/dt$ là "tốc độ", vế phải $g(x)$ nói tốc độ ấy phụ thuộc thế nào vào trạng thái $x$ lúc đó. Hình dung tài khoản tiết kiệm lãi 5%/năm: luật không nói "năm sau có bao nhiêu", mà nói *"tốc độ tăng tiền = 5% số tiền hiện có"* → $\frac{dM}{dt} = 0.05\,M$. Giải ODE = từ luật-tốc-độ suy ngược ra **lịch sử giá trị theo thời gian** $M(t)$. Bốn ví dụ cùng một khuôn "luật tốc độ":

| Hiện tượng | Luật tốc độ (lời) | ODE |
|---|---|---|
| Vi khuẩn sinh sôi | tốc độ sinh ∝ số đang có | $\frac{dN}{dt} = rN$ |
| Cà phê nguội | tốc độ nguội ∝ chênh lệch với phòng | $\frac{dT}{dt} = -k(T-T_p)$ |
| Phóng xạ phân rã | tốc độ rã ∝ số hạt còn lại | $\frac{dN}{dt} = -\lambda N$ |
| Quần thể có giới hạn | tốc độ tăng ∝ số đang có × "chỗ trống" | $\frac{dN}{dt} = rN(1-N/K)$ |

So sánh nhanh: rời rạc hỏi *"kỳ sau bằng bao nhiêu?"* ($x_{n+1} = f(x_n)$); liên tục hỏi *"đang thay đổi nhanh cỡ nào?"* ($dx/dt = g(x)$). Phần lý thuyết giải ODE đã có ở [T6 L07](../../06-Advanced/lesson-07-differential-equations/); lesson này tập trung **dùng** ODE để mô hình hóa.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao 'tốc độ ∝ lượng hiện có' lại ra hàm mũ, mà không phải đường thẳng?"* Vì đường thẳng có tốc độ *hằng* (không phụ thuộc $x$). Khi tốc độ *tỉ lệ* với $x$ thì càng lớn càng tăng nhanh — đặc trưng riêng của $e^{rt}$ (đạo hàm của mũ lại ra chính nó nhân hằng số). Đó là vì sao luật $dx/dt = rx$ và hàm $e^{rt}$ luôn đi cùng nhau.
- *"Một luật-tốc-độ có đủ để biết giá trị tương lai chưa?"* Chưa. Luật chỉ cho biết *thay đổi thế nào*; còn cần **điều kiện đầu** (giá trị tại $t=0$) để biết bắt đầu từ đâu. Hai con vi khuẩn cùng luật $\frac{dN}{dt}=rN$ nhưng $N_0$ khác nhau cho hai đường khác nhau — xem ⚠ ở mục 2.

📝 **Tóm tắt mục 1**: ODE = **luật tốc độ thay đổi** $dx/dt = g(x)$; dùng khi đại lượng biến thiên liên tục. Vế phải nói tốc độ phụ thuộc trạng thái hiện tại ra sao. Rời rạc và liên tục là hai góc nhìn cùng một hiện tượng, gặp nhau khi bước → 0 (mục 6). Luật + điều kiện đầu = nghiệm cụ thể.

---

## 2. Tăng trưởng mũ

💡 **Trực giác.** "Càng nhiều càng sinh nhanh": tốc độ tăng tỉ lệ với lượng hiện có. Tiền lãi, vi khuẩn chia đôi, phản ứng dây chuyền.

**Mô hình**: $\frac{dN}{dt} = r\cdot N$ ($r =$ tốc độ tăng trưởng, $[r] =$ thời gian⁻¹).
**Nghiệm** (tách biến — [T6 L07](../../06-Advanced/lesson-07-differential-equations/)): **$N(t) = N_0\cdot e^{rt}$**.

> 📐 **Định nghĩa đầy đủ — Tham số tốc độ $r$ (intrinsic rate)**
>
> **(a) Là gì**: $r$ là **tốc độ thay đổi tương đối tức thời** — phần trăm tăng/giảm trên một đơn vị thời gian. Từ $\frac{dN}{dt} = rN$ rút ra $r = \frac{1}{N}\frac{dN}{dt}$ = "tốc độ thay đổi chia cho lượng hiện có". Đơn vị: thời gian⁻¹ (vd /giờ, /năm).
>
> **(b) Vì sao cần**: phân biệt rõ "tăng nhanh" tuyệt đối với tương đối. Một quần thể 1 triệu tăng 1000/ngày và một quần thể 100 tăng 1000/ngày rất khác nhau về *sức sống*; $r$ chuẩn hóa điều đó. $r > 0$: bùng nổ; $r < 0$: tàn lụi (phân rã, mục 2.1); $r = 0$: đứng yên.
>
> **(c) Ví dụ số (4 giá trị $r$)**: $r = 0.5$/giờ → nhân đôi sau $\ln 2/0.5 = 1.39$h. $r = 0.05$/năm (dân số) → nhân đôi sau $\approx 13.9$ năm. $r = -0.1$/ngày (thuốc đào thải) → giảm còn nửa sau $6.93$ ngày. $r = 2$/giờ (vi khuẩn lý tưởng) → nhân đôi sau chỉ $0.35$h.

**Walk-through (diễn giải tham số)**: $N_0 = 100$, $r = 0.5$/giờ.
- $N(t) = 100\cdot e^{0.5t}$. $t = 2$: $100\cdot e^1 \approx 272$. $t = 4$: $100\cdot e^2 \approx 739$. $t = 10$: $100\cdot e^5 \approx 14\,841$.
- Thời gian nhân đôi: $e^{r\cdot t_2} = 2$ → $t_2 = \ln 2/r = 0.693/0.5 \approx$ **1.39 giờ**.
- **Diễn giải tham số**: $N_0$ dịch toàn bộ đường lên/xuống (điểm xuất phát); $r$ điều khiển *độ cong* — gấp đôi $r$ thì cùng một bội số đạt được trong nửa thời gian. Đổi $N_0 = 200$ chỉ nhân đôi mọi giá trị, KHÔNG đổi thời gian nhân đôi (vẫn 1.39h) — nhân đôi là tính chất của $r$ thôi.

Cùng $r$, đổi $N_0$ chỉ dịch đường; đổi $r$ đổi độ cong:

<svg viewBox="0 0 560 285" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Ba đường tăng trưởng mũ N₀eʳᵗ: cùng r = 0.5 với N₀ = 100 và 200 chỉ dịch đường; r = 0.25 cong chậm hơn">
  <defs><marker id="ar11" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="150.0" y1="230.0" x2="150.0" y2="35.0"/>
<line x1="240.0" y1="230.0" x2="240.0" y2="35.0"/>
<line x1="330.0" y1="230.0" x2="330.0" y2="35.0"/>
<line x1="420.0" y1="230.0" x2="420.0" y2="35.0"/>
<line x1="60.0" y1="165.0" x2="487.5" y2="165.0"/>
<line x1="60.0" y1="100.0" x2="487.5" y2="100.0"/>
<line x1="60.0" y1="35.0" x2="487.5" y2="35.0"/>
</g>
  <line x1="54.0" y1="230.0" x2="509.5" y2="230.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar11)"/>
  <line x1="60.0" y1="236.0" x2="60.0" y2="13.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar11)"/>
  <text x="501.5" y="246.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">t</text>
  <text x="68.0" y="23.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">N</text>
  <line x1="150.0" y1="226.0" x2="150.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="150.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">2</text>
  <line x1="240.0" y1="226.0" x2="240.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="240.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">4</text>
  <line x1="330.0" y1="226.0" x2="330.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="330.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">6</text>
  <line x1="420.0" y1="226.0" x2="420.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="420.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">8</text>
  <line x1="56.0" y1="165.0" x2="64.0" y2="165.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="169.0" fill="#475569" font-size="11" text-anchor="end">500</text>
  <line x1="56.0" y1="100.0" x2="64.0" y2="100.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="104.0" fill="#475569" font-size="11" text-anchor="end">1000</text>
  <line x1="56.0" y1="35.0" x2="64.0" y2="35.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="39.0" fill="#475569" font-size="11" text-anchor="end">1500</text>
  <path d="M 60.0,204.0 L 63.0,203.1 L 66.0,202.2 L 69.0,201.3 L 72.0,200.3 L 75.0,199.3 L 78.0,198.2 L 81.0,197.2 L 84.0,196.0 L 87.0,194.9 L 90.0,193.7 L 93.0,192.5 L 96.0,191.2 L 99.0,189.9 L 102.0,188.5 L 105.0,187.1 L 108.0,185.7 L 111.0,184.2 L 114.0,182.6 L 117.0,181.0 L 120.0,179.3 L 123.0,177.6 L 126.0,175.8 L 129.1,174.0 L 132.1,172.1 L 135.1,170.1 L 138.1,168.1 L 141.1,166.0 L 144.1,163.8 L 147.1,161.6 L 150.1,159.3 L 153.1,156.9 L 156.1,154.4 L 159.1,151.8 L 162.1,149.2 L 165.1,146.4 L 168.1,143.6 L 171.1,140.7 L 174.1,137.6 L 177.1,134.5 L 180.1,131.3 L 183.1,127.9 L 186.1,124.5 L 189.1,120.9 L 192.1,117.2 L 195.1,113.3 L 198.1,109.4 L 201.1,105.3 L 204.1,101.1 L 207.1,96.7 L 210.1,92.2 L 213.1,87.5 L 216.1,82.7 L 219.1,77.7 L 222.1,72.5 L 225.1,67.2 L 228.1,61.6 L 231.1,55.9 L 234.1,50.0 L 237.1,43.9 L 240.1,37.6" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M 60.0,217.0 L 64.0,216.4 L 68.1,215.8 L 72.1,215.1 L 76.2,214.4 L 80.2,213.7 L 84.3,213.0 L 88.3,212.2 L 92.3,211.4 L 96.4,210.5 L 100.4,209.6 L 104.5,208.7 L 108.5,207.7 L 112.5,206.7 L 116.6,205.6 L 120.6,204.5 L 124.7,203.3 L 128.7,202.1 L 132.8,200.8 L 136.8,199.5 L 140.8,198.1 L 144.9,196.6 L 148.9,195.1 L 153.0,193.5 L 157.0,191.8 L 161.0,190.0 L 165.1,188.2 L 169.1,186.3 L 173.2,184.3 L 177.2,182.2 L 181.3,180.0 L 185.3,177.7 L 189.3,175.3 L 193.4,172.8 L 197.4,170.1 L 201.5,167.4 L 205.5,164.5 L 209.6,161.5 L 213.6,158.4 L 217.6,155.1 L 221.7,151.6 L 225.7,148.0 L 229.8,144.3 L 233.8,140.3 L 237.8,136.2 L 241.9,131.9 L 245.9,127.4 L 250.0,122.7 L 254.0,117.8 L 258.1,112.6 L 262.1,107.2 L 266.1,101.6 L 270.2,95.7 L 274.2,89.5 L 278.3,83.0 L 282.3,76.3 L 286.3,69.2 L 290.4,61.9 L 294.4,54.1 L 298.5,46.0 L 302.5,37.6" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M 60.0,217.0 L 67.0,216.5 L 74.0,216.0 L 80.9,215.4 L 87.9,214.8 L 94.9,214.2 L 101.8,213.6 L 108.8,212.9 L 115.8,212.3 L 122.8,211.6 L 129.8,210.8 L 136.7,210.1 L 143.7,209.3 L 150.7,208.5 L 157.7,207.6 L 164.6,206.8 L 171.6,205.8 L 178.6,204.9 L 185.6,203.9 L 192.5,202.9 L 199.5,201.8 L 206.5,200.7 L 213.5,199.5 L 220.4,198.3 L 227.4,197.1 L 234.4,195.7 L 241.4,194.4 L 248.3,193.0 L 255.3,191.5 L 262.3,190.0 L 269.2,188.4 L 276.2,186.8 L 283.2,185.1 L 290.2,183.3 L 297.2,181.5 L 304.1,179.5 L 311.1,177.5 L 318.1,175.5 L 325.1,173.3 L 332.0,171.1 L 339.0,168.8 L 346.0,166.3 L 353.0,163.8 L 359.9,161.2 L 366.9,158.5 L 373.9,155.7 L 380.9,152.7 L 387.8,149.7 L 394.8,146.5 L 401.8,143.2 L 408.8,139.8 L 415.7,136.2 L 422.7,132.5 L 429.7,128.6 L 436.7,124.6 L 443.6,120.5 L 450.6,116.1 L 457.6,111.6 L 464.6,107.0 L 471.5,102.1 L 478.5,97.1" fill="none" stroke="#15803d" stroke-width="2.5" stroke-linejoin="round" stroke-dasharray="6 4"/>
  <rect x="75.0" y="20.0" width="190.0" height="74.0" rx="8" fill="white" fill-opacity="1" stroke="#cbd5e1" stroke-width="1"/>
  <line x1="86.0" y1="38.0" x2="116.0" y2="38.0" stroke="#dc2626" stroke-width="2.5"/>
  <text x="124.0" y="42.0" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">r = 0.5, N₀ = 200</text>
  <line x1="86.0" y1="60.0" x2="116.0" y2="60.0" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="124.0" y="64.0" fill="#1d4ed8" font-size="12" text-anchor="start" font-weight="700">r = 0.5, N₀ = 100</text>
  <line x1="86.0" y1="82.0" x2="116.0" y2="82.0" stroke="#15803d" stroke-width="2.5" stroke-dasharray="6 4"/>
  <text x="124.0" y="86.0" fill="#15803d" font-size="12" text-anchor="start" font-weight="700">r = 0.25, N₀ = 100</text>
  <text x="260.0" y="268.0" fill="#475569" font-size="12" text-anchor="middle">N₀ lớn → nâng đường lên (cùng dạng) · r lớn → cong vểnh sớm hơn</text>
</svg>

### 2.1 Phân rã phóng xạ — chu kỳ bán rã

💡 **Trực giác.** Cùng luật-tốc-độ như tăng trưởng mũ nhưng $r$ **âm**: mỗi hạt nhân có xác suất phân rã không đổi mỗi giây, nên *tốc độ rã ∝ số hạt còn lại*. Càng ít hạt, rã càng chậm — đường cong tụt nhanh lúc đầu rồi thoai thoải, không bao giờ chạm 0.

**Mô hình**: $\frac{dN}{dt} = -\lambda N$ ($\lambda > 0$ = hằng số phân rã). **Nghiệm**: $N(t) = N_0\,e^{-\lambda t}$.

> 📐 **Định nghĩa đầy đủ — Chu kỳ bán rã $T_{1/2}$ (half-life)**
>
> **(a) Là gì**: thời gian để lượng chất giảm còn **một nửa**. Từ $N(T_{1/2}) = N_0/2$: $e^{-\lambda T_{1/2}} = \tfrac12$ → $\boxed{T_{1/2} = \dfrac{\ln 2}{\lambda}}$. Đặc trưng: KHÔNG phụ thuộc $N_0$ — sau mỗi $T_{1/2}$ lại còn nửa, bất kể bắt đầu bao nhiêu.
>
> **(b) Vì sao cần**: $\lambda$ là số trừu tượng (/giây); $T_{1/2}$ là đại lượng *cảm nhận được* dùng trong định tuổi (carbon-14), y học hạt nhân, an toàn phóng xạ. Hai cách nói cùng một thông tin: $\lambda = \ln 2/T_{1/2}$.
>
> **(c) Ví dụ số (4 đồng vị)**: C-14 $T_{1/2} = 5730$ năm → $\lambda = \ln 2/5730 \approx 1.21\times10^{-4}$/năm. I-131 (y học) $T_{1/2} = 8$ ngày → $\lambda \approx 0.0866$/ngày. U-238 $T_{1/2} \approx 4.5\times10^9$ năm (cực chậm). Caffeine trong máu $T_{1/2}\approx 5$h → sau 5h còn nửa, 10h còn $1/4$.

**Walk-through (định tuổi C-14)**: mẫu gỗ còn $25\%$ lượng C-14 ban đầu. Bao nhiêu tuổi?
- $N/N_0 = 0.25 = e^{-\lambda t}$. Lấy $\ln$: $-\lambda t = \ln 0.25 = -1.386$.
- $t = 1.386/\lambda = 1.386/(1.21\times10^{-4}) \approx$ **11 460 năm** — đúng bằng $2\times T_{1/2}$ (vì $25\% = (\tfrac12)^2$, qua đúng 2 chu kỳ bán rã) ✓.
- Kiểm bằng bán rã: 1 chu kỳ → $50\%$ (5730 năm); 2 chu kỳ → $25\%$ (11 460 năm) ✓.

⚠ **Lỗi thường gặp — nhầm dấu $\lambda$ (k dương/âm).** Phân rã là $\frac{dN}{dt} = -\lambda N$ với dấu **trừ** → $e^{-\lambda t}$ giảm. Nếu vô ý viết $+\lambda N$ thì ra $e^{+\lambda t}$ *tăng vô hạn* — mô tả ngược hẳn (sinh sôi thay vì rã). Quy tắc: tăng trưởng $r > 0$ → $e^{+}$; phân rã/nguội $\to$ số mũ phải **âm** để tiến về giới hạn.

⚠ **Lỗi thường gặp — dùng mũ cho dài hạn.** Mô hình mũ tăng *không có giới hạn*: $N \to \infty$. Thực tế mọi tài nguyên đều hữu hạn (đã cảnh báo ở [L01 mục 2](../lesson-01-modeling-cycle/)). Mũ chỉ đúng *giai đoạn đầu* khi $N$ còn nhỏ so với sức chứa. → cần logistic (mục 3).

⚠ **Lỗi thường gặp — quên điều kiện đầu $N_0$.** Nghiệm tổng quát $N = A\,e^{rt}$ còn hằng số $A$; phải dùng $N(0) = N_0$ để chốt $A = N_0$. Viết ngay "$N = e^{rt}$" (ngầm $A=1$) là sai trừ khi tình cờ $N_0 = 1$. Mọi bài ODE đều cần điều kiện đầu để ra nghiệm cụ thể.

🔁 **Dừng lại tự kiểm tra**

1. Một liều caffeine 200 mg, $T_{1/2} = 5$h. Còn bao nhiêu sau 15h?
2. Đồng vị có $\lambda = 0.1$/ngày. Chu kỳ bán rã?

<details><summary>Đáp án</summary>

1. 15h = 3 chu kỳ bán rã → còn $200\cdot(\tfrac12)^3 = 200/8 =$ **25 mg**. (Kiểm: $200\,e^{-(\ln2/5)\cdot15} = 200\,e^{-2.079} = 200\cdot0.125 = 25$ ✓.)
2. $T_{1/2} = \ln 2/\lambda = 0.693/0.1 \approx$ **6.93 ngày**.

</details>

📝 **Tóm tắt mục 2**: $\frac{dN}{dt} = rN \to N_0\cdot e^{rt}$; thời gian nhân đôi $\ln 2/r$. $r$ = tốc độ tương đối; $r < 0$ thành phân rã $N_0 e^{-\lambda t}$, chu kỳ bán rã $T_{1/2} = \ln 2/\lambda$ (độc lập $N_0$). Chỉ hợp giai đoạn đầu; ngoại suy dài hạn vô lý. Luôn chốt $N_0$ qua điều kiện đầu, đừng nhầm dấu mũ.

---

## 3. Tăng trưởng logistic

💡 **Trực giác — phanh khi đông đúc.** Logistic thêm vào mũ một "phanh" $(1 - N/K)$: khi $N$ nhỏ, phanh $\approx 1$ (tăng gần như mũ); khi $N$ tiến tới **sức chứa $K$**, phanh $\to 0$ (ngừng tăng). Kết quả: đường cong chữ S.

> 📐 **Định nghĩa đầy đủ — Sức chứa $K$ (carrying capacity)**
>
> **(a) Là gì**: $K$ là mức quần thể tối đa mà môi trường nuôi được lâu dài — điểm cân bằng ổn định của mô hình. Đơn vị giống $N$ (số cá thể, mật độ...).
>
> **(b) Vì sao cần**: Mô hình mũ thiếu mọi giới hạn nên ngoại suy thành vô hạn. $K$ đưa *giới hạn tài nguyên* vào mô hình một cách định lượng, biến dự báo "bùng nổ vô hạn" thành "bão hòa thực tế".
>
> **(c) Ví dụ số**: $K = 1000$ cá trong hồ. $N_0 = 100$, $r = 0.5$. Lúc $N = 100$: phanh $= 1 - 100/1000 = 0.9$ (tăng gần mũ). Lúc $N = 900$: phanh $= 0.1$ (tăng chậm hẳn). Lúc $N = 1000 = K$: phanh $= 0$ (dừng). Lúc $N = 1100 > K$ (quá tải): phanh $= -0.1$ → $\frac{dN}{dt} < 0$ → *giảm* về $K$.

**Mô hình**: $\frac{dN}{dt} = r\cdot N\cdot(1 - N/K)$.
**Nghiệm**: **$N(t) = \frac{K}{1 + A\cdot e^{-rt}}$**, với $A = (K - N_0)/N_0$.

**Điểm cân bằng**: $N = 0$ (không ổn định) và $N = K$ (ổn định). Điểm uốn tại $N = K/2$ (tăng nhanh nhất).

**Walk-through (đường cong chữ S, diễn giải tham số)**: $K = 1000$, $r = 0.5$, $N_0 = 100$ → $A = (1000-100)/100 = 9$.
- $N(t) = 1000/(1 + 9e^{-0.5t})$. Kiểm $t=0$: $1000/(1+9) = 100$ ✓.
- Bảng giá trị từng bước (để thấy hình chữ S):

| $t$ | $9e^{-0.5t}$ | $N(t)$ | Giai đoạn |
|---|---|---|---|
| 0 | 9.00 | 100 | xuất phát (gần mũ) |
| 2 | 3.31 | 232 | tăng tốc |
| 4.39 | 1.00 | **500** | điểm uốn $K/2$ — dốc nhất |
| 7 | 0.27 | 787 | chậm lại |
| 12 | 0.022 | 978 | gần bão hòa |
| ∞ | 0 | **1000** = K | trần |

- Khi $N = K/2 = 500$: $1 + 9e^{-0.5t} = 2$ → $e^{-0.5t} = 1/9$ → $t = \ln 9/0.5 \approx$ **4.39** (điểm uốn, đông đúc nhất về tốc độ).
- $t \to \infty$: $e^{-0.5t} \to 0$ → $N \to$ **$1000 = K$** ✓.
- **Diễn giải tham số**: $K$ = độ cao trần (đường ngang tiệm cận); $r$ = độ dốc — $r$ lớn thì chữ S "dựng" hơn (lên trần nhanh); $N_0$ (qua $A$) = vị trí xuất phát, càng nhỏ thì pha tăng tốc càng dài.

Đường cong chữ S (logistic) tiệm cận trần $K$:

<svg viewBox="0 0 560 285" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đường logistic chữ S từ N₀ tới trần K với điểm uốn tại K/2 (t ≈ 4.39), lồi phía dưới và lõm phía trên">
  <defs><marker id="ar12" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="235.8" y1="230.0" x2="235.8" y2="23.0"/>
<line x1="380.0" y1="230.0" x2="380.0" y2="23.0"/>
<line x1="540.0" y1="230.0" x2="540.0" y2="23.0"/>
<line x1="60.0" y1="212.0" x2="560.0" y2="212.0"/>
<line x1="60.0" y1="140.0" x2="560.0" y2="140.0"/>
<line x1="60.0" y1="50.0" x2="560.0" y2="50.0"/>
</g>
  <line x1="54.0" y1="230.0" x2="582.0" y2="230.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar12)"/>
  <line x1="60.0" y1="236.0" x2="60.0" y2="1.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar12)"/>
  <text x="574.0" y="246.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">t</text>
  <text x="68.0" y="11.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">N</text>
  <line x1="235.8" y1="226.0" x2="235.8" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="235.8" y="246.0" fill="#475569" font-size="11" text-anchor="middle">t ≈ 4.39</text>
  <line x1="380.0" y1="226.0" x2="380.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="380.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">8</text>
  <line x1="540.0" y1="226.0" x2="540.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="540.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">12</text>
  <line x1="56.0" y1="212.0" x2="64.0" y2="212.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="216.0" fill="#475569" font-size="11" text-anchor="end">N₀</text>
  <line x1="56.0" y1="140.0" x2="64.0" y2="140.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="144.0" fill="#475569" font-size="11" text-anchor="end">K/2</text>
  <line x1="56.0" y1="50.0" x2="64.0" y2="50.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="54.0" fill="#475569" font-size="11" text-anchor="end">K</text>
  <line x1="60.0" y1="50.0" x2="552.0" y2="50.0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 4"/>
  <line x1="60.0" y1="140.0" x2="235.8" y2="140.0" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/>
  <line x1="235.8" y1="230.0" x2="235.8" y2="140.0" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/>
  <path d="M 60.0,212.0 L 64.9,211.0 L 69.8,209.9 L 74.8,208.8 L 79.7,207.6 L 84.6,206.4 L 89.5,205.1 L 94.4,203.7 L 99.4,202.3 L 104.3,200.8 L 109.2,199.3 L 114.1,197.7 L 119.0,196.1 L 124.0,194.3 L 128.9,192.5 L 133.8,190.7 L 138.7,188.8 L 143.6,186.8 L 148.6,184.7 L 153.5,182.6 L 158.4,180.4 L 163.3,178.2 L 168.2,175.9 L 173.2,173.5 L 178.1,171.1 L 183.0,168.7 L 187.9,166.1 L 192.8,163.6 L 197.8,161.0 L 202.7,158.4 L 207.6,155.7 L 212.5,153.0 L 217.4,150.3 L 222.4,147.5 L 227.3,144.8 L 232.2,142.0 L 237.1,139.2 L 242.0,136.5 L 247.0,133.7 L 251.9,131.0 L 256.8,128.2 L 261.7,125.5 L 266.6,122.9 L 271.6,120.2 L 276.5,117.6 L 281.4,115.0 L 286.3,112.5 L 291.2,110.0 L 296.2,107.6 L 301.1,105.2 L 306.0,102.9 L 310.9,100.6 L 315.8,98.4 L 320.8,96.2 L 325.7,94.2 L 330.6,92.1 L 335.5,90.2 L 340.4,88.3 L 345.4,86.5 L 350.3,84.7 L 355.2,83.0 L 360.1,81.4 L 365.0,79.8 L 370.0,78.3 L 374.9,76.9 L 379.8,75.5 L 384.7,74.2 L 389.6,72.9 L 394.6,71.7 L 399.5,70.6 L 404.4,69.5 L 409.3,68.5 L 414.2,67.5 L 419.2,66.5 L 424.1,65.6 L 429.0,64.8 L 433.9,64.0 L 438.8,63.2 L 443.8,62.4 L 448.7,61.8 L 453.6,61.1 L 458.5,60.5 L 463.4,59.9 L 468.4,59.3 L 473.3,58.8 L 478.2,58.3 L 483.1,57.8 L 488.0,57.4 L 493.0,57.0 L 497.9,56.6 L 502.8,56.2 L 507.7,55.8 L 512.6,55.5 L 517.6,55.2 L 522.5,54.9 L 527.4,54.6 L 532.3,54.3 L 537.2,54.1 L 542.2,53.8 L 547.1,53.6 L 552.0,53.4" fill="none" stroke="#1d4ed8" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="235.8" cy="140.0" r="5" fill="#dc2626"/>
  <text x="245.8" y="144.0" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">điểm uốn (t ≈ 4.39, K/2): dốc nhất</text>
  <text x="126.0" y="185.0" fill="#15803d" font-size="11" text-anchor="start">phần lồi: tăng tốc (gần mũ)</text>
  <text x="360.0" y="84.6" fill="#b45309" font-size="11" text-anchor="start">phần lõm: chậm lại (đông đúc)</text>
  <text x="548.0" y="42.0" fill="#94a3b8" font-size="11" text-anchor="end">tiệm cận trần K</text>
  <text x="280.0" y="268.0" fill="#475569" font-size="12" text-anchor="middle">chữ S: lồi dưới → uốn ở K/2 → lõm trên → phẳng ở K</text>
</svg>

Trường hướng (slope field) của logistic, gạch = dấu/độ lớn của $dN/dt$:

<svg viewBox="0 0 680 285" style="max-width:680px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Trường hướng của logistic dN/dt = rN(1 − N/K): gạch nằm ngang ở N = 0 và N = K, dựng nhất ở K/2; ba nghiệm đều tiến về K">
  <defs><marker id="ar13" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="60.0" y1="230.0" x2="487.5" y2="230.0"/>
<line x1="60.0" y1="145.0" x2="487.5" y2="145.0"/>
<line x1="60.0" y1="60.0" x2="487.5" y2="60.0"/>
</g>
  <line x1="54.0" y1="230.0" x2="509.5" y2="230.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar13)"/>
  <line x1="60.0" y1="249.6" x2="60.0" y2="12.5" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar13)"/>
  <text x="501.5" y="246.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">t</text>
  <text x="68.0" y="22.5" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">N</text>
  <line x1="56.0" y1="230.0" x2="64.0" y2="230.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="234.0" fill="#475569" font-size="11" text-anchor="end">0</text>
  <line x1="56.0" y1="145.0" x2="64.0" y2="145.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="149.0" fill="#475569" font-size="11" text-anchor="end">K/2</text>
  <line x1="56.0" y1="60.0" x2="64.0" y2="60.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="64.0" fill="#475569" font-size="11" text-anchor="end">K</text>
  <line x1="60.0" y1="60.0" x2="478.5" y2="60.0" stroke="#15803d" stroke-width="2" stroke-dasharray="6 4"/>
  <line x1="60.0" y1="230.0" x2="478.5" y2="230.0" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 4"/>
  <line x1="68.3" y1="221.3" x2="96.7" y2="218.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="69.1" y1="207.7" x2="95.9" y2="201.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="70.3" y1="183.8" x2="94.7" y2="174.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="71.0" y1="150.4" x2="94.0" y2="139.6" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="70.3" y1="115.8" x2="94.7" y2="106.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="69.1" y1="88.7" x2="95.9" y2="82.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="68.2" y1="69.8" x2="96.8" y2="67.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="68.1" y1="60.0" x2="96.9" y2="60.0" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="68.6" y1="44.1" x2="96.4" y2="48.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="113.3" y1="221.3" x2="141.7" y2="218.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="114.1" y1="207.7" x2="140.9" y2="201.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="115.3" y1="183.8" x2="139.7" y2="174.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="116.0" y1="150.4" x2="139.0" y2="139.6" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="115.3" y1="115.8" x2="139.7" y2="106.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="114.1" y1="88.7" x2="140.9" y2="82.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="113.2" y1="69.8" x2="141.8" y2="67.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="113.1" y1="60.0" x2="141.9" y2="60.0" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="113.6" y1="44.1" x2="141.4" y2="48.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="158.3" y1="221.3" x2="186.7" y2="218.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="159.1" y1="207.7" x2="185.9" y2="201.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="160.3" y1="183.8" x2="184.7" y2="174.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="161.0" y1="150.4" x2="184.0" y2="139.6" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="160.3" y1="115.8" x2="184.7" y2="106.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="159.1" y1="88.7" x2="185.9" y2="82.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="158.2" y1="69.8" x2="186.8" y2="67.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="158.1" y1="60.0" x2="186.9" y2="60.0" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="158.6" y1="44.1" x2="186.4" y2="48.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="203.3" y1="221.3" x2="231.7" y2="218.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="204.1" y1="207.7" x2="230.9" y2="201.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="205.3" y1="183.8" x2="229.7" y2="174.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="206.0" y1="150.4" x2="229.0" y2="139.6" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="205.3" y1="115.8" x2="229.7" y2="106.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="204.1" y1="88.7" x2="230.9" y2="82.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="203.2" y1="69.8" x2="231.8" y2="67.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="203.1" y1="60.0" x2="231.9" y2="60.0" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="203.6" y1="44.1" x2="231.4" y2="48.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="248.3" y1="221.3" x2="276.7" y2="218.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="249.1" y1="207.7" x2="275.9" y2="201.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="250.3" y1="183.8" x2="274.7" y2="174.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="251.0" y1="150.4" x2="274.0" y2="139.6" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="250.3" y1="115.8" x2="274.7" y2="106.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="249.1" y1="88.7" x2="275.9" y2="82.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="248.2" y1="69.8" x2="276.8" y2="67.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="248.1" y1="60.0" x2="276.9" y2="60.0" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="248.6" y1="44.1" x2="276.4" y2="48.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="293.3" y1="221.3" x2="321.7" y2="218.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="294.1" y1="207.7" x2="320.9" y2="201.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="295.3" y1="183.8" x2="319.7" y2="174.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="296.0" y1="150.4" x2="319.0" y2="139.6" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="295.3" y1="115.8" x2="319.7" y2="106.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="294.1" y1="88.7" x2="320.9" y2="82.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="293.2" y1="69.8" x2="321.8" y2="67.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="293.1" y1="60.0" x2="321.9" y2="60.0" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="293.6" y1="44.1" x2="321.4" y2="48.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="338.3" y1="221.3" x2="366.7" y2="218.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="339.1" y1="207.7" x2="365.9" y2="201.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="340.3" y1="183.8" x2="364.7" y2="174.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="341.0" y1="150.4" x2="364.0" y2="139.6" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="340.3" y1="115.8" x2="364.7" y2="106.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="339.1" y1="88.7" x2="365.9" y2="82.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="338.2" y1="69.8" x2="366.8" y2="67.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="338.1" y1="60.0" x2="366.9" y2="60.0" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="338.6" y1="44.1" x2="366.4" y2="48.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="383.3" y1="221.3" x2="411.7" y2="218.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="384.1" y1="207.7" x2="410.9" y2="201.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="385.3" y1="183.8" x2="409.7" y2="174.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="386.0" y1="150.4" x2="409.0" y2="139.6" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="385.3" y1="115.8" x2="409.7" y2="106.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="384.1" y1="88.7" x2="410.9" y2="82.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="383.2" y1="69.8" x2="411.8" y2="67.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="383.1" y1="60.0" x2="411.9" y2="60.0" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="383.6" y1="44.1" x2="411.4" y2="48.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="428.3" y1="221.3" x2="456.7" y2="218.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="429.1" y1="207.7" x2="455.9" y2="201.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="430.3" y1="183.8" x2="454.7" y2="174.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="431.0" y1="150.4" x2="454.0" y2="139.6" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="430.3" y1="115.8" x2="454.7" y2="106.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="429.1" y1="88.7" x2="455.9" y2="82.3" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="428.2" y1="69.8" x2="456.8" y2="67.2" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="428.1" y1="60.0" x2="456.9" y2="60.0" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="428.6" y1="44.1" x2="456.4" y2="48.7" stroke="#94a3b8" stroke-width="1.5"/>
  <path d="M 60.0,213.0 L 65.2,212.1 L 70.5,211.1 L 75.7,210.1 L 80.9,209.1 L 86.2,208.0 L 91.4,206.9 L 96.6,205.7 L 101.8,204.4 L 107.1,203.2 L 112.3,201.8 L 117.5,200.4 L 122.8,199.0 L 128.0,197.5 L 133.2,195.9 L 138.5,194.3 L 143.7,192.6 L 148.9,190.9 L 154.2,189.1 L 159.4,187.3 L 164.6,185.4 L 169.9,183.5 L 175.1,181.5 L 180.3,179.5 L 185.6,177.4 L 190.8,175.2 L 196.0,173.1 L 201.2,170.8 L 206.5,168.6 L 211.7,166.3 L 216.9,163.9 L 222.2,161.6 L 227.4,159.2 L 232.6,156.8 L 237.9,154.4 L 243.1,151.9 L 248.3,149.4 L 253.6,147.0 L 258.8,144.5 L 264.0,142.0 L 269.2,139.6 L 274.5,137.1 L 279.7,134.7 L 284.9,132.3 L 290.2,129.9 L 295.4,127.5 L 300.6,125.1 L 305.9,122.8 L 311.1,120.5 L 316.3,118.3 L 321.6,116.1 L 326.8,113.9 L 332.0,111.8 L 337.3,109.7 L 342.5,107.7 L 347.7,105.7 L 353.0,103.8 L 358.2,102.0 L 363.4,100.1 L 368.6,98.4 L 373.9,96.7 L 379.1,95.0 L 384.3,93.5 L 389.6,91.9 L 394.8,90.4 L 400.0,89.0 L 405.3,87.6 L 410.5,86.3 L 415.7,85.1 L 421.0,83.8 L 426.2,82.7 L 431.4,81.6 L 436.7,80.5 L 441.9,79.5 L 447.1,78.5 L 452.3,77.5 L 457.6,76.7 L 462.8,75.8 L 468.0,75.0 L 473.3,74.2 L 478.5,73.5" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M 60.0,111.0 L 65.2,108.9 L 70.5,106.9 L 75.7,105.0 L 80.9,103.1 L 86.2,101.3 L 91.4,99.5 L 96.6,97.7 L 101.8,96.1 L 107.1,94.4 L 112.3,92.9 L 117.5,91.4 L 122.8,89.9 L 128.0,88.5 L 133.2,87.1 L 138.5,85.8 L 143.7,84.6 L 148.9,83.4 L 154.2,82.2 L 159.4,81.1 L 164.6,80.1 L 169.9,79.1 L 175.1,78.1 L 180.3,77.2 L 185.6,76.3 L 190.8,75.5 L 196.0,74.7 L 201.2,73.9 L 206.5,73.2 L 211.7,72.5 L 216.9,71.9 L 222.2,71.2 L 227.4,70.6 L 232.6,70.1 L 237.9,69.5 L 243.1,69.0 L 248.3,68.5 L 253.6,68.1 L 258.8,67.6 L 264.0,67.2 L 269.2,66.8 L 274.5,66.5 L 279.7,66.1 L 284.9,65.8 L 290.2,65.5 L 295.4,65.2 L 300.6,64.9 L 305.9,64.6 L 311.1,64.4 L 316.3,64.1 L 321.6,63.9 L 326.8,63.7 L 332.0,63.5 L 337.3,63.3 L 342.5,63.1 L 347.7,62.9 L 353.0,62.8 L 358.2,62.6 L 363.4,62.5 L 368.6,62.3 L 373.9,62.2 L 379.1,62.1 L 384.3,62.0 L 389.6,61.9 L 394.8,61.7 L 400.0,61.6 L 405.3,61.6 L 410.5,61.5 L 415.7,61.4 L 421.0,61.3 L 426.2,61.2 L 431.4,61.2 L 436.7,61.1 L 441.9,61.0 L 447.1,61.0 L 452.3,60.9 L 457.6,60.9 L 462.8,60.8 L 468.0,60.8 L 473.3,60.7 L 478.5,60.7" fill="none" stroke="#b45309" stroke-width="2" stroke-linejoin="round"/>
  <path d="M 60.0,9.0 L 65.2,12.7 L 70.5,16.0 L 75.7,19.1 L 80.9,21.9 L 86.2,24.5 L 91.4,26.9 L 96.6,29.1 L 101.8,31.2 L 107.1,33.1 L 112.3,34.8 L 117.5,36.4 L 122.8,37.9 L 128.0,39.3 L 133.2,40.6 L 138.5,41.8 L 143.7,43.0 L 148.9,44.0 L 154.2,45.0 L 159.4,45.9 L 164.6,46.8 L 169.9,47.6 L 175.1,48.3 L 180.3,49.0 L 185.6,49.7 L 190.8,50.3 L 196.0,50.9 L 201.2,51.4 L 206.5,51.9 L 211.7,52.4 L 216.9,52.9 L 222.2,53.3 L 227.4,53.7 L 232.6,54.0 L 237.9,54.4 L 243.1,54.7 L 248.3,55.0 L 253.6,55.3 L 258.8,55.6 L 264.0,55.8 L 269.2,56.1 L 274.5,56.3 L 279.7,56.5 L 284.9,56.7 L 290.2,56.9 L 295.4,57.1 L 300.6,57.2 L 305.9,57.4 L 311.1,57.6 L 316.3,57.7 L 321.6,57.8 L 326.8,58.0 L 332.0,58.1 L 337.3,58.2 L 342.5,58.3 L 347.7,58.4 L 353.0,58.5 L 358.2,58.6 L 363.4,58.6 L 368.6,58.7 L 373.9,58.8 L 379.1,58.9 L 384.3,58.9 L 389.6,59.0 L 394.8,59.0 L 400.0,59.1 L 405.3,59.1 L 410.5,59.2 L 415.7,59.2 L 421.0,59.3 L 426.2,59.3 L 431.4,59.4 L 436.7,59.4 L 441.9,59.4 L 447.1,59.5 L 452.3,59.5 L 457.6,59.5 L 462.8,59.6 L 468.0,59.6 L 473.3,59.6 L 478.5,59.6" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linejoin="round"/>
  <text x="509.5" y="56.0" fill="#15803d" font-size="11" text-anchor="start" font-weight="700">N = K: dN/dt = 0</text>
  <text x="509.5" y="72.0" fill="#15803d" font-size="11" text-anchor="start">cân bằng ỔN ĐỊNH</text>
  <text x="509.5" y="226.0" fill="#dc2626" font-size="11" text-anchor="start" font-weight="700">N = 0: dN/dt = 0</text>
  <text x="509.5" y="242.0" fill="#dc2626" font-size="11" text-anchor="start">cân bằng KHÔNG ổn định</text>
  <text x="509.5" y="149.0" fill="#475569" font-size="11" text-anchor="start">K/2: gạch dựng nhất</text>
  <text x="300.0" y="268.0" fill="#475569" font-size="12" text-anchor="middle">mọi nghiệm xuất phát trong (0, K) đều trôi lên K; xuất phát trên K trôi xuống K</text>
</svg>

❓ **Câu hỏi tự nhiên của người đọc**

- *"Logistic liên tục có hỗn loạn như bản rời rạc ở L03 không?"* **Không!** ODE logistic bậc 1 *luôn* hội tụ mượt về $K$, không bao giờ dao động hay hỗn loạn. Lý do: thời gian liên tục không cho "vọt lố" qua cân bằng như bước nhảy rời rạc. Đây là khác biệt sâu sắc giữa hai mô hình — cùng tên "logistic" nhưng hành vi khác hẳn.
- *"Nếu $N_0 > K$ thì sao?"* Phanh âm → $\frac{dN}{dt} < 0$ → $N$ *giảm* về $K$. $K$ là điểm hút từ cả hai phía.

### 3.1 Nghiệm cân bằng & ổn định

💡 **Trực giác.** **Nghiệm cân bằng (equilibrium)** là trạng thái đứng yên: $\frac{dN}{dt} = 0$, nên $N$ không đổi mãi mãi. Giải $g(N) = rN(1-N/K) = 0$ → hai cân bằng: $N = 0$ và $N = K$. **Ổn định (stable)** = nếu đẩy lệch một chút, hệ tự kéo về (như viên bi đáy bát); **không ổn định (unstable)** = đẩy nhẹ là chạy đi (bi trên đỉnh đồi).

**Cách kiểm dấu $g(N)$ quanh mỗi cân bằng (4 vùng cụ thể)** với $r = 0.5$, $K = 1000$:

| $N$ | $g(N) = 0.5N(1-N/1000)$ | Chiều | Diễn giải |
|---|---|---|---|
| 10 (gần 0⁺) | $0.5\cdot10\cdot0.99 = +4.95$ | tăng → rời 0 | đẩy khỏi $N=0$ |
| 500 | $0.5\cdot500\cdot0.5 = +125$ | tăng → tiến K | trôi lên K |
| 1100 ($>K$) | $0.5\cdot1100\cdot(-0.1) = -55$ | giảm → về K | kéo về K |
| 990 (gần K⁻) | $0.5\cdot990\cdot0.01 = +4.95$ | tăng → tiến K | hút vào K |

→ Quanh $N=0$: dấu $g$ luôn đẩy ra xa → **$N=0$ KHÔNG ổn định**. Quanh $N=K$: cả hai phía đều kéo về → **$N=K$ ổn định**.

⚠ **Lỗi thường gặp — tưởng logistic "vượt $K$ rồi vọt lố".** Nghiệm *liên tục* xuất phát dưới $K$ **không bao giờ vượt** $K$: khi $N\to K$ thì $\frac{dN}{dt}\to 0$, tốc độ tắt dần đúng lúc chạm trần → tiệm cận từ dưới, không "đâm qua". Chỉ bản **rời rạc** (L03) hoặc Euler bước lớn (mục 5) mới vọt lố qua $K$ rồi nảy — đó là *artefact rời rạc hóa*, không phải hành vi của ODE. Đừng vẽ đường logistic liên tục nhô lên trên $K$ rồi tụt xuống.

🔁 **Dừng lại tự kiểm tra**

1. Logistic $K = 500$, $N_0 = 500$. $N(t)$ bằng gì với mọi $t$?
2. Vì sao $N = 0$ là cân bằng *không ổn định* của logistic?

<details><summary>Đáp án</summary>

1. $N_0 = K = 500$ là điểm cân bằng → $\frac{dN}{dt} = 0$ → **$N(t) = 500$ mãi mãi**. ($A = 0$, công thức cho $N = K/(1+0) = K$.)
2. Với $N$ nhỏ dương, $g(N) = rN(1-N/K) > 0$ → $N$ *tăng*, chạy ra xa khỏi 0. Một con vi khuẩn lẻ cũng đủ sinh sôi → 0 không "giữ" được hệ → **không ổn định**.

</details>

### 📝 Tóm tắt mục 3

- Logistic $\frac{dN}{dt} = rN(1-N/K)$: mũ + phanh $(1-N/K)$. Nghiệm $N = K/(1+Ae^{-rt})$, đường chữ S.
- Cân bằng $N = K$ ổn định; điểm uốn $N = K/2$. Khác bản rời rạc: liên tục *luôn mượt*, không hỗn loạn.

---

## 4. Định luật nguội Newton & bể trộn

### 4.1 Nguội Newton (giải đầy đủ)

💡 **Trực giác — luật tốc độ "nguội nhanh khi chênh nhiều".** Cốc cà phê nóng để trong phòng: tốc độ mất nhiệt tỉ lệ với **chênh lệch** $(T - T_p)$ giữa vật và môi trường. Chênh nhiều → nguội nhanh; gần bằng phòng → nguội chậm dần, không bao giờ "lạnh hơn phòng".

Đã gặp ở [L01](../lesson-01-modeling-cycle/) (ví dụ end-to-end) và [L02](../lesson-02-empirical-curve-fitting/) (fit $k$). Mô hình: $\frac{dT}{dt} = -k(T - T_p)$. Giải bằng đổi biến $u = T - T_p$ → $\frac{du}{dt} = -ku$ (mũ phân rã!) → $u = u_0 e^{-kt}$ → **$T(t) = T_p + (T_0 - T_p)\cdot e^{-kt}$**. Cân bằng $T = T_p$ ổn định.

> 📐 **Định nghĩa đầy đủ — Hệ số làm nguội $k$ (cooling constant)**
>
> **(a) Là gì**: $k$ (đơn vị thời gian⁻¹) đo *tốc độ trao đổi nhiệt* — vật cách nhiệt kém / diện tích lớn → $k$ lớn → nguội nhanh.
>
> **(b) Vì sao cần**: hai cốc cùng $T_0$, cùng phòng, nhưng cốc giấy nguội nhanh hơn cốc sứ dày — khác nhau ở $k$. $k$ gói toàn bộ "vật lý truyền nhiệt" vào một số đo được bằng thực nghiệm ([L02](../lesson-02-empirical-curve-fitting/)).
>
> **(c) Ví dụ số (4 giá trị $k$)**: $k = 0.1$/phút → sau 10 phút chênh lệch còn $e^{-1}=37\%$. $k=0.5$/phút → 37% chỉ sau 2 phút (nguội rất nhanh). $k=0.02$/phút → bình giữ nhiệt tốt, 37% sau 50 phút. $k\to 0$ → cách nhiệt hoàn hảo, không nguội.

**Walk-through (diễn giải tham số)**: cà phê $T_0 = 90°$C, phòng $T_p = 25°$C, $k = 0.1$/phút.
- $T(t) = 25 + 65\,e^{-0.1t}$.
- $t=0$: $25 + 65 = 90$ ✓. $t=10$: $25 + 65e^{-1} = 25 + 23.9 = 48.9°$C. $t=20$: $25 + 65e^{-2} = 25 + 8.8 = 33.8°$C. $t\to\infty$: $T\to 25°$C ✓.
- **Diễn giải tham số**: $T_p$ = đường tiệm cận (sàn nhiệt); $(T_0 - T_p)$ = chênh lệch ban đầu (biên độ); $k$ = tốc độ tiệm cận. Đổi phòng nóng hơn ($T_p=35$) thì cà phê chỉ nguội tới 35°C; đổi $k$ chỉ đổi *nhanh hay chậm*, không đổi đích.

Nguội Newton: chênh lệch tắt theo mũ, tiệm cận $T_p$:

<svg viewBox="0 0 560 285" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Nguội Newton: nhiệt độ từ 90°C giảm theo mũ về sàn 25°C của phòng; qua 49°C khi chênh còn nửa nửa, dốc nhất lúc đầu">
  <defs><marker id="ar14" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="189.5" y1="230.0" x2="189.5" y2="10.0"/>
<line x1="60.0" y1="175.0" x2="541.0" y2="175.0"/>
<line x1="60.0" y1="122.2" x2="541.0" y2="122.2"/>
<line x1="60.0" y1="32.0" x2="541.0" y2="32.0"/>
</g>
  <line x1="54.0" y1="230.0" x2="563.0" y2="230.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar14)"/>
  <line x1="60.0" y1="236.0" x2="60.0" y2="-12.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar14)"/>
  <text x="555.0" y="246.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">t</text>
  <text x="68.0" y="-2.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">T</text>
  <line x1="189.5" y1="226.0" x2="189.5" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="189.5" y="246.0" fill="#475569" font-size="11" text-anchor="middle">t ≈ 5.0</text>
  <line x1="56.0" y1="175.0" x2="64.0" y2="175.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="179.0" fill="#475569" font-size="11" text-anchor="end">25</text>
  <line x1="56.0" y1="122.2" x2="64.0" y2="122.2" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="126.2" fill="#475569" font-size="11" text-anchor="end">49</text>
  <line x1="56.0" y1="32.0" x2="64.0" y2="32.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="36.0" fill="#475569" font-size="11" text-anchor="end">90</text>
  <line x1="60.0" y1="175.0" x2="535.8" y2="175.0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 4"/>
  <line x1="60.0" y1="122.2" x2="189.5" y2="122.2" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/>
  <line x1="189.5" y1="230.0" x2="189.5" y2="122.2" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/>
  <path d="M 60.0,32.0 L 64.8,37.1 L 69.5,42.1 L 74.3,46.9 L 79.0,51.5 L 83.8,55.9 L 88.5,60.2 L 93.3,64.3 L 98.1,68.3 L 102.8,72.1 L 107.6,75.8 L 112.3,79.4 L 117.1,82.8 L 121.9,86.1 L 126.6,89.3 L 131.4,92.4 L 136.1,95.4 L 140.9,98.2 L 145.6,101.0 L 150.4,103.7 L 155.2,106.2 L 159.9,108.7 L 164.7,111.1 L 169.4,113.4 L 174.2,115.6 L 178.9,117.7 L 183.7,119.8 L 188.5,121.8 L 193.2,123.7 L 198.0,125.5 L 202.7,127.3 L 207.5,129.0 L 212.3,130.7 L 217.0,132.3 L 221.8,133.8 L 226.5,135.3 L 231.3,136.7 L 236.0,138.1 L 240.8,139.4 L 245.6,140.7 L 250.3,141.9 L 255.1,143.1 L 259.8,144.3 L 264.6,145.4 L 269.4,146.4 L 274.1,147.5 L 278.9,148.4 L 283.6,149.4 L 288.4,150.3 L 293.1,151.2 L 297.9,152.1 L 302.7,152.9 L 307.4,153.7 L 312.2,154.4 L 316.9,155.2 L 321.7,155.9 L 326.4,156.6 L 331.2,157.2 L 336.0,157.9 L 340.7,158.5 L 345.5,159.1 L 350.2,159.7 L 355.0,160.2 L 359.8,160.7 L 364.5,161.3 L 369.3,161.8 L 374.0,162.2 L 378.8,162.7 L 383.5,163.1 L 388.3,163.6 L 393.1,164.0 L 397.8,164.4 L 402.6,164.7 L 407.3,165.1 L 412.1,165.5 L 416.8,165.8 L 421.6,166.1 L 426.4,166.5 L 431.1,166.8 L 435.9,167.1 L 440.6,167.3 L 445.4,167.6 L 450.2,167.9 L 454.9,168.1 L 459.7,168.4 L 464.4,168.6 L 469.2,168.9 L 473.9,169.1 L 478.7,169.3 L 483.5,169.5 L 488.2,169.7 L 493.0,169.9 L 497.7,170.1 L 502.5,170.2 L 507.3,170.4 L 512.0,170.6 L 516.8,170.7 L 521.5,170.9 L 526.3,171.0 L 531.0,171.2 L 535.8,171.3" fill="none" stroke="#1d4ed8" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="60.0" cy="32.0" r="5" fill="#dc2626"/>
  <circle cx="189.5" cy="122.2" r="4" fill="#dc2626"/>
  <text x="86.0" y="193.0" fill="#94a3b8" font-size="11" text-anchor="start">sàn Tₚ = 25°C (phòng)</text>
  <text x="216.0" y="71.6" fill="#1d4ed8" font-size="12" text-anchor="start" font-weight="700">chênh (T − Tₚ) giảm theo mũ</text>
  <text x="70.0" y="26.0" fill="#dc2626" font-size="11" text-anchor="start">T₀ = 90</text>
  <text x="280.0" y="268.0" fill="#475569" font-size="12" text-anchor="middle">dốc nhất lúc đầu (chênh lớn), thoải dần khi gần Tₚ</text>
</svg>

### 4.2 Bài toán bể trộn (mixing)

💡 **Trực giác.** Bồn chứa dung dịch; chất hòa tan chảy *vào* và *ra* liên tục. Lượng chất trong bồn thay đổi = (vào) − (ra). Vì "ra" tỉ lệ nồng độ hiện tại → ODE tuyến tính bậc 1.

**Bài toán**: Bồn 100 L nước, ban đầu 20 kg muối. Nước muối 0.5 kg/L chảy vào 5 L/phút; dung dịch trộn đều chảy ra 5 L/phút (thể tích giữ 100 L).

**Lập mô hình**: gọi $S(t) =$ kg muối.
- Vào: 0.5 kg/L × 5 L/phút = 2.5 kg/phút.
- Ra: nồng độ $S/100$ kg/L × 5 L/phút $= 0.05\cdot S$ kg/phút.
- **$\frac{dS}{dt} = 2.5 - 0.05\cdot S$** (tuyến tính bậc 1).

**Giải**: cân bằng $S^* = 2.5/0.05 = 50$. **$S(t) = 50 + (20 - 50)\cdot e^{-0.05t} = 50 - 30\cdot e^{-0.05t}$**.
- Kiểm $t=0$: $50 - 30 = 20$ ✓. $t \to \infty$: $S \to 50$ kg (= 0.5 kg/L × 100 L, nồng độ vào) ✓ — hợp lý.

⚠ **Lỗi thường gặp — quên rằng nồng độ ra dùng S hiện tại, không phải S vào.** Tốc độ ra $= (S/V)\cdot$(lưu lượng ra), với $S/V$ là nồng độ *trong bồn* (thay đổi theo $t$), không phải nồng độ dòng vào. Lẫn hai cái → sai ODE.

🔁 **Dừng lại tự kiểm tra**

1. Bồn trên, sau bao lâu muối đạt 40 kg?

<details><summary>Đáp án</summary>

$40 = 50 - 30e^{-0.05t}$ → $30e^{-0.05t} = 10$ → $e^{-0.05t} = 1/3$ → $t = \ln 3/0.05 = 1.0986/0.05 \approx$ **22 phút**.

</details>

### 📝 Tóm tắt mục 4

- Nguội Newton: $T(t) = T_p + (T_0-T_p)e^{-kt}$. Bể trộn: $\frac{dS}{dt} =$ (vào) − (nồng độ trong bồn)·(ra).
- Cả hai là ODE tuyến tính bậc 1 → có cân bằng ổn định; nồng độ ra dùng $S$ hiện tại.

---

## 5. Phương pháp Euler — cầu nối rời rạc ↔ liên tục

💡 **Trực giác.** Máy tính không "giải tích phân"; nó *bước nhỏ*. Biết $dx/dt = g(x)$ và $x$ tại $t$, ước lượng $x$ sau khoảng nhỏ $h$: "vị trí mới ≈ vị trí cũ + vận tốc × thời gian".

**Công thức Euler**: $x_{n+1} = x_n + h\cdot g(x_n)$.

🎯 **Phát hiện nối L03 và L04**: áp Euler cho $\frac{dN}{dt} = rN$ được $x_{n+1} = x_n + h\cdot r\cdot x_n =$ **$(1 + hr)\cdot x_n$** — đúng là **mô hình rời rạc tuyến tính** ở [L03 mục 2](../lesson-03-discrete-dynamical/)! Với $h$ nhỏ, $(1+hr)^n \to e^{rt}$. Vậy *giải ODE bằng máy = biến nó thành phương trình sai phân*. Hai thế giới là một khi $h \to 0$.

### 5.1 Walk-through Euler — bảng từng bước

**Bài toán**: $\frac{dN}{dt} = 0.5\,N$, $N_0 = 100$, bước $h = 1$, chạy đến $t = 4$. Nghiệm chính xác: $N(t) = 100\,e^{0.5t}$.

Công thức một bước: $N_{n+1} = N_n + h\cdot g(N_n) = N_n + 1\cdot(0.5\,N_n) = 1.5\,N_n$.

| Bước $n$ | $t_n$ | $N_n$ (Euler) | $g(N_n)=0.5N_n$ | $N_{n+1}=N_n+1\cdot g$ | Chính xác $100e^{0.5t}$ | Sai số |
|---|---|---|---|---|---|---|
| 0 | 0 | 100.0 | 50.0 | 150.0 | 100.0 | 0% |
| 1 | 1 | 150.0 | 75.0 | 225.0 | 164.9 | −9.0% |
| 2 | 2 | 225.0 | 112.5 | 337.5 | 271.8 | −17.2% |
| 3 | 3 | 337.5 | 168.75 | 506.25 | 448.2 | −24.7% |
| 4 | 4 | 506.25 | — | — | 738.9 | −31.5% |

→ Euler ở đây cho $N(4)\approx 506$ trong khi đúng là $739$ — **thấp hơn 31.5%** vì $h=1$ quá thô (mỗi bước "đóng băng" tốc độ ở đầu khoảng, mà tốc độ thực còn tăng trong khoảng). 

**Giảm $h$ để thấy hội tụ** (cùng tới $t=4$):

| $h$ | Số bước | $N(4)$ Euler | Sai số so với 739 |
|---|---|---|---|
| 1.0 | 4 | $100\cdot1.5^4 = 506$ | −31.5% |
| 0.5 | 8 | $100\cdot1.25^8 = 596$ | −19.4% |
| 0.1 | 40 | $100\cdot1.05^{40} = 704$ | −4.7% |
| 0.01 | 400 | $\approx 735$ | −0.5% |

→ $h$ nhỏ đi 10 lần thì sai số giảm ~10 lần (Euler là *bậc 1*). Lưu ý $(1+0.5h)$ chính là hệ số rời rạc L03; khi $h\to0$, $(1+0.5h)^{4/h}\to e^{0.5\cdot4}=e^2$ ✓.

⚠ **Lỗi thường gặp — chọn bước h quá lớn.** $h$ lớn → Euler sai nhiều, thậm chí mất ổn định (dao động giả). Phản ví dụ: logistic Euler với $h\cdot r$ quá lớn có thể tự tạo ra "chu kỳ/hỗn loạn" — đó là *artefact số học* của rời rạc hóa thô, không phải hành vi của ODE liên tục (vốn luôn mượt). Bài học: giảm $h$ để kiểm tra hội tụ.

📝 **Tóm tắt mục 5**: Euler $x_{n+1} = x_n + h\cdot g(x_n)$ rời rạc hóa ODE; với $\frac{dN}{dt}=rN$ ra đúng mô hình L03. $h$ nhỏ → bám liên tục; $h$ lớn → sai số/mất ổn định giả.

---

## 6. Bài tập

**Bài 1.** Vi khuẩn tăng mũ $r = 0.3$/giờ, $N_0 = 500$. (a) $N(5)$? (b) Thời gian nhân đôi?

**Bài 2.** Logistic $K = 2000$, $r = 0.4$, $N_0 = 200$. (a) Viết $N(t)$. (b) Khi nào $N = 1000$?

**Bài 3.** So sánh trong vài câu: vì sao logistic *rời rạc* (L03) có thể hỗn loạn còn logistic *liên tục* (bài này) thì không?

**Bài 4.** Bồn 200 L, ban đầu 0 kg muối; nước muối 1 kg/L vào 4 L/phút, trộn đều ra 4 L/phút. Lập và giải ODE cho $S(t)$; tìm $S$ khi $t \to \infty$.

**Bài 5.** Áp Euler bước $h = 0.5$ cho $\frac{dN}{dt} = 0.4N$, $N_0 = 100$. Tính $N$ sau 2 bước và so với nghiệm chính xác $N(1) = 100e^{0.4}$.

**Bài 6.** (phân rã phóng xạ) Một mẫu xương cổ còn $40\%$ lượng C-14 ban đầu ($T_{1/2} = 5730$ năm). (a) Tìm $\lambda$. (b) Mẫu bao nhiêu tuổi?

**Bài 7.** (nguội Newton) Bánh nướng $180°$C lấy ra phòng $25°$C; sau 5 phút còn $120°$C. (a) Tìm $k$. (b) Khi nào bánh còn $50°$C?

**Bài 8.** (cân bằng & ổn định) Cho ODE $\frac{dy}{dt} = y(3 - y)$. (a) Tìm mọi nghiệm cân bằng. (b) Xét dấu $\frac{dy}{dt}$ để phân loại ổn định / không ổn định.

---

## 7. Lời giải chi tiết

**Bài 1.** (a) $N(5) = 500\cdot e^{0.3\cdot 5} = 500\cdot e^{1.5} = 500\cdot 4.4817 \approx$ **2241**. (b) $t_2 = \ln 2/0.3 = 0.693/0.3 \approx$ **2.31 giờ**.

**Bài 2.** (a) $A = (2000-200)/200 = 9$ → **$N(t) = 2000/(1 + 9e^{-0.4t})$**. (b) $1000 = 2000/(1+9e^{-0.4t})$ → $1+9e^{-0.4t} = 2$ → $e^{-0.4t} = 1/9$ → $t = \ln 9/0.4 = 2.197/0.4 \approx$ **5.49** (đây là điểm uốn $N = K/2$). Kiểm $t=0$: $2000/10 = 200$ ✓.

**Bài 3.** Logistic rời rạc $x_{n+1} = r\cdot x_n(1-x_n)$ cập nhật theo *bước hữu hạn*: khi $r$ lớn, một bước có thể *vọt lố* qua điểm cân bằng rồi nảy về, sinh dao động/chu kỳ/hỗn loạn. Logistic liên tục $\frac{dN}{dt} = rN(1-N/K)$ thay đổi *từng khoảnh khắc vô cùng nhỏ*, không thể vọt lố — $N$ chỉ tiến đơn điệu về $K$. Bản chất: rời rạc hóa thô (bước lớn) thêm động lực mới không có trong ODE gốc (đúng như cảnh báo Euler ở mục 5).

**Bài 4.** Vào: $1\cdot 4 = 4$ kg/phút. Ra: $(S/200)\cdot 4 = 0.02S$. $\frac{dS}{dt} = 4 - 0.02S$. Cân bằng $S^* = 4/0.02 = 200$. $S(t) = 200 + (0 - 200)e^{-0.02t} =$ **$200(1 - e^{-0.02t})$**. Kiểm $t=0$: 0 ✓. **$t \to \infty$: $S \to 200$ kg** (= 1 kg/L × 200 L) ✓.

**Bài 5.** Euler: $x_{n+1} = x_n + 0.5\cdot 0.4\cdot x_n = x_n\cdot(1 + 0.2) = 1.2\cdot x_n$. $x_0 = 100$ → $x_1 = 120$ → $x_2 = 144$. Nghiệm chính xác $N(1) = 100\cdot e^{0.4} = 100\cdot 1.4918 \approx$ **149.2**. Euler cho 144 (thấp hơn ~3.5%); giảm $h$ sẽ sát hơn. (Lưu ý 1.2 chính là $(1+hr)$ — đúng mô hình rời rạc L03.)

**Bài 6.** (a) $\lambda = \ln 2/T_{1/2} = 0.693/5730 \approx$ **$1.21\times10^{-4}$/năm**. (b) $N/N_0 = 0.40 = e^{-\lambda t}$ → $-\lambda t = \ln 0.40 = -0.916$ → $t = 0.916/(1.21\times10^{-4}) \approx$ **7570 năm**. (Kiểm hợp lý: $40\%$ nằm giữa $50\%$ → 1 chu kỳ = 5730 năm và $25\%$ → 2 chu kỳ = 11460 năm, nên 7570 năm là hợp lý ✓.)

**Bài 7.** $T(t) = 25 + (180-25)e^{-kt} = 25 + 155e^{-kt}$. (a) $T(5) = 25 + 155e^{-5k} = 120$ → $e^{-5k} = 95/155 = 0.6129$ → $-5k = \ln 0.6129 = -0.4894$ → **$k \approx 0.0979$/phút**. (b) $50 = 25 + 155e^{-0.0979t}$ → $e^{-0.0979t} = 25/155 = 0.1613$ → $-0.0979t = \ln 0.1613 = -1.824$ → $t \approx$ **18.6 phút**.

**Bài 8.** (a) $g(y) = y(3-y) = 0$ → cân bằng **$y = 0$** và **$y = 3$**. (b) Xét dấu $g(y)$ trên 3 vùng:
- $y < 0$ (vd $y=-1$): $g = (-1)(4) = -4 < 0$ → $y$ giảm (rời xa 0 về phía âm).
- $0 < y < 3$ (vd $y=1$): $g = 1\cdot2 = +2 > 0$ → $y$ tăng (tiến tới 3).
- $y > 3$ (vd $y=4$): $g = 4\cdot(-1) = -4 < 0$ → $y$ giảm (về 3).

→ Quanh $y=0$: bên trái đẩy ra âm, bên phải đẩy lên 3 → **$y=0$ KHÔNG ổn định**. Quanh $y=3$: cả hai phía kéo về 3 → **$y=3$ ổn định** (giống logistic với $K=3$).

---

## 8. Bài tiếp theo

[Lesson 05 — Hệ tương tác (Lotka–Volterra, SIR)](../lesson-05-interacting-systems/): khi *nhiều* biến tác động lẫn nhau (thú–mồi, dịch bệnh), một ODE thành *hệ* ODE.

## 📝 Tổng kết

1. **ODE = luật tốc độ thay đổi** $dx/dt = g(x)$; dùng khi biến thiên liên tục. Vế phải nói tốc độ phụ thuộc trạng thái hiện tại; luật + điều kiện đầu = nghiệm cụ thể. Rời rạc và liên tục gặp nhau khi bước → 0.
2. **Mũ** $\frac{dN}{dt} = rN \to N_0 e^{rt}$; thời gian nhân đôi $\ln 2/r$; chỉ hợp giai đoạn đầu. $r$ = tốc độ tương đối.
3. **Phân rã** $\frac{dN}{dt} = -\lambda N \to N_0 e^{-\lambda t}$; chu kỳ bán rã $T_{1/2} = \ln 2/\lambda$ (độc lập $N_0$) — định tuổi C-14, y học. Đừng nhầm dấu mũ.
4. **Logistic** $\frac{dN}{dt} = rN(1-N/K) \to N = K/(1+Ae^{-rt})$; chữ S, bão hòa ở $K$, *luôn mượt* (khác bản rời rạc, không vọt lố qua $K$).
5. **Cân bằng & ổn định**: giải $g(N)=0$; xét dấu $g$ quanh mỗi cân bằng — kéo về = ổn định, đẩy ra = không ổn định. Logistic: $0$ không ổn định, $K$ ổn định.
6. **Nguội Newton & bể trộn**: ODE tuyến tính bậc 1, có cân bằng ổn định ($T_p$ / $S^*$); $k$ = tốc độ tiệm cận.
7. **Euler** $x_{n+1} = x_n + h\cdot g(x_n)$: mô phỏng ODE = phương trình sai phân; $h$ nhỏ → bám liên tục (sai số ∝ $h$); $h$ quá lớn → sai số/mất ổn định giả. Quên điều kiện đầu là lỗi xuyên suốt.
