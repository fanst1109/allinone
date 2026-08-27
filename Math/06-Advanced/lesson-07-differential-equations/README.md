# Lesson 07 — Phương trình vi phân (ODE)

## Mục tiêu

- Hiểu **PT vi phân thường (ODE)**: PT chứa hàm và đạo hàm.
- Giải ODE bậc 1: tách biến, tuyến tính.
- ODE bậc 2 tuyến tính hệ số hằng.
- Mô hình hóa: dao động, tăng trưởng dân số, RC circuit.

## Kiến thức tiền đề

- [T4 — Calculus 1 biến](../../04-Calculus-1var/).

---

## 1. PT vi phân là gì?

💡 **Trực giác — ODE mô tả "tốc độ thay đổi phụ thuộc trạng thái hiện tại"**: phương trình đại số nói *"giá trị bằng bao nhiêu"* ($x^2 = 9 \to x = 3$). Phương trình vi phân nói một điều sâu hơn — *"hệ thống đang thay đổi nhanh chậm thế nào, tùy theo nó đang ở đâu"*. Hình dung một tài khoản tiết kiệm: lãi suất 5%/năm nghĩa là *"tốc độ tăng tiền = 5% số tiền hiện có"*. Càng nhiều tiền, càng sinh lãi nhanh. Viết ra: $\frac{dM}{dt} = 0.05\cdot M$. Đây chính là một ODE — vế trái là "tốc độ thay đổi", vế phải phụ thuộc vào "trạng thái hiện tại $M$". Giải ODE = từ luật "thay đổi thế nào" suy ngược ra "giá trị theo thời gian là gì" ($M(t) = M_0 e^{0.05t}$).

So sánh hai loại "phương trình":

| | Phương trình đại số | Phương trình vi phân (ODE) |
|---|---|---|
| Ẩn số | một **số** $x$ | một **hàm** $y(x)$ |
| Vd | $x^2 - 5x + 6 = 0$ | $y' = 2y$ |
| Nghiệm | $x = 2$ hoặc $x = 3$ (vài số) | $y = Ce^{2x}$ (cả **họ hàm**) |
| "Giải" nghĩa là | tìm số thỏa đẳng thức | tìm hàm mà đạo hàm khớp luật |

💡 **Định nghĩa**: PT chứa hàm chưa biết $y(x)$ và **đạo hàm** của nó: $y'$, $y''$, ...

**Bậc (order)** = bậc đạo hàm cao nhất xuất hiện.

**Tuyến tính (linear)** = $y$ và các đạo hàm của nó chỉ xuất hiện ở **lũy thừa 1**, không nhân nhau, không nằm trong hàm phi tuyến ($\sin y$, $e^y$, $(y')^2$...). Dạng tổng quát tuyến tính: $a_n(x)y^{(n)} + \cdots + a_1(x)y' + a_0(x)y = g(x)$. Tuyến tính dễ giải hơn nhiều vì có cấu trúc đẹp (nguyên lý chồng chất nghiệm).

**Bốn ví dụ nhận diện bậc + tuyến tính**:

| ODE | Bậc | Tuyến tính? | Vì sao |
|---|---|---|---|
| $y' = 2x$ | 1 | ✓ | $y'$ bậc 1, không có hàm phi tuyến của $y$ |
| $y'' + y = 0$ | 2 | ✓ | $y''$, $y$ đều bậc 1 |
| $(y')^2 + y = x$ | 1 | ✗ | $(y')^2$ — đạo hàm bị bình phương |
| $y'' + \sin y = 0$ | 2 | ✗ | $\sin y$ — $y$ nằm trong hàm phi tuyến (con lắc lớn) |

Thêm 2 ví dụ: $y''' + y' = x$ (bậc 3, tuyến tính); $y\cdot y' = 1$ (bậc 1, **phi tuyến** vì $y$ nhân $y'$).

### Vì sao quan trọng?

Tự nhiên thường mô tả qua **tốc độ thay đổi**, không phải giá trị trực tiếp:
- Vận tốc = đạo hàm vị trí: $v = \frac{ds}{dt}$.
- Gia tốc = đạo hàm vận tốc: $F = ma \to a = F/m \to \frac{d^2s}{dt^2} = F/m$.
- Phóng xạ: $\frac{dN}{dt} = -\lambda\cdot N$ (tốc độ phân rã tỉ lệ $N$).
- Nguội: $\frac{dT}{dt} = -k(T - T_{\text{phòng}})$.

⟶ ODE = **ngôn ngữ của khoa học**.

### 1.1. Trường hướng (slope field) — "nhìn" nghiệm mà chưa cần giải

💡 **Trực giác**: một ODE bậc 1 dạng $y' = F(x, y)$ cho biết, tại **mỗi điểm $(x, y)$** trên mặt phẳng, đường nghiệm đi qua đó phải có **độ dốc (slope)** bằng $F(x, y)$. Nếu ta vẽ một gạch nhỏ với độ dốc đó tại nhiều điểm, ta được "trường hướng" — như rắc mạt sắt quanh nam châm để thấy từ trường mà không cần phương trình. Nghiệm là đường cong "trôi theo" các gạch này.

**Ví dụ — $y' = y$** (tốc độ thay đổi = giá trị hiện tại). Tại mỗi điểm, độ dốc = chính tung độ $y$ của điểm đó:
- Tại $y = 0$: dốc $0$ (gạch nằm ngang).
- Tại $y = 1$: dốc $1$ (gạch nghiêng $45°$).
- Tại $y = 2$: dốc $2$ (dốc hơn).
- Tại $y = -1$: dốc $-1$ (nghiêng xuống).

Trường hướng (mỗi gạch = độ dốc tại điểm đó), nghiệm $y = Ce^x$ "lướt" theo:

<svg viewBox="0 0 620 275" style="max-width:620px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Trường hướng của y′ = y: gạch nhỏ có độ dốc bằng y, nằm ngang ở y = 0, dốc dần lên cao; hai nghiệm Ceˣ lướt theo các gạch">
  <defs><marker id="ar18" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="130.0" y1="288.0" x2="130.0" y2="57.0"/>
<line x1="200.0" y1="288.0" x2="200.0" y2="57.0"/>
<line x1="270.0" y1="288.0" x2="270.0" y2="57.0"/>
<line x1="340.0" y1="288.0" x2="340.0" y2="57.0"/>
<line x1="60.0" y1="255.0" x2="361.0" y2="255.0"/>
<line x1="60.0" y1="145.0" x2="361.0" y2="145.0"/>
<line x1="60.0" y1="90.0" x2="361.0" y2="90.0"/>
</g>
  <line x1="54.0" y1="200.0" x2="383.0" y2="200.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar18)"/>
  <line x1="60.0" y1="294.0" x2="60.0" y2="35.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar18)"/>
  <text x="375.0" y="216.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="68.0" y="45.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="130.0" y1="196.0" x2="130.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="130.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="200.0" y1="196.0" x2="200.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="200.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">2</text>
  <line x1="270.0" y1="196.0" x2="270.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="270.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">3</text>
  <line x1="340.0" y1="196.0" x2="340.0" y2="204.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="340.0" y="216.0" fill="#475569" font-size="11" text-anchor="middle">4</text>
  <line x1="56.0" y1="255.0" x2="64.0" y2="255.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="259.0" fill="#475569" font-size="11" text-anchor="end">−1</text>
  <line x1="56.0" y1="145.0" x2="64.0" y2="145.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="149.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="56.0" y1="90.0" x2="64.0" y2="90.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="94.0" fill="#475569" font-size="11" text-anchor="end">2</text>
  <line x1="79.6" y1="248.4" x2="96.4" y2="261.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="77.4" y1="223.3" x2="98.6" y2="231.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="76.1" y1="200.0" x2="99.9" y2="200.0" stroke="#1a202c" stroke-width="1.5"/>
  <line x1="77.4" y1="176.7" x2="98.6" y2="168.3" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="79.6" y1="151.6" x2="96.4" y2="138.4" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="81.4" y1="125.3" x2="94.6" y2="109.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="82.7" y1="98.4" x2="93.3" y2="81.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="111.1" y1="248.4" x2="127.9" y2="261.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="108.9" y1="223.3" x2="130.1" y2="231.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="107.6" y1="200.0" x2="131.4" y2="200.0" stroke="#1a202c" stroke-width="1.5"/>
  <line x1="108.9" y1="176.7" x2="130.1" y2="168.3" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="111.1" y1="151.6" x2="127.9" y2="138.4" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="112.9" y1="125.3" x2="126.1" y2="109.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="114.2" y1="98.4" x2="124.8" y2="81.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="142.6" y1="248.4" x2="159.4" y2="261.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="140.4" y1="223.3" x2="161.6" y2="231.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="139.1" y1="200.0" x2="162.9" y2="200.0" stroke="#1a202c" stroke-width="1.5"/>
  <line x1="140.4" y1="176.7" x2="161.6" y2="168.3" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="142.6" y1="151.6" x2="159.4" y2="138.4" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="144.4" y1="125.3" x2="157.6" y2="109.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="145.7" y1="98.4" x2="156.3" y2="81.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="174.1" y1="248.4" x2="190.9" y2="261.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="171.9" y1="223.3" x2="193.1" y2="231.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="170.6" y1="200.0" x2="194.4" y2="200.0" stroke="#1a202c" stroke-width="1.5"/>
  <line x1="171.9" y1="176.7" x2="193.1" y2="168.3" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="174.1" y1="151.6" x2="190.9" y2="138.4" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="175.9" y1="125.3" x2="189.1" y2="109.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="177.2" y1="98.4" x2="187.8" y2="81.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="205.6" y1="248.4" x2="222.4" y2="261.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="203.4" y1="223.3" x2="224.6" y2="231.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="202.1" y1="200.0" x2="225.9" y2="200.0" stroke="#1a202c" stroke-width="1.5"/>
  <line x1="203.4" y1="176.7" x2="224.6" y2="168.3" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="205.6" y1="151.6" x2="222.4" y2="138.4" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="207.4" y1="125.3" x2="220.6" y2="109.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="208.7" y1="98.4" x2="219.3" y2="81.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="237.1" y1="248.4" x2="253.9" y2="261.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="234.9" y1="223.3" x2="256.1" y2="231.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="233.6" y1="200.0" x2="257.4" y2="200.0" stroke="#1a202c" stroke-width="1.5"/>
  <line x1="234.9" y1="176.7" x2="256.1" y2="168.3" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="237.1" y1="151.6" x2="253.9" y2="138.4" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="238.9" y1="125.3" x2="252.1" y2="109.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="240.2" y1="98.4" x2="250.8" y2="81.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="268.6" y1="248.4" x2="285.4" y2="261.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="266.4" y1="223.3" x2="287.6" y2="231.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="265.1" y1="200.0" x2="288.9" y2="200.0" stroke="#1a202c" stroke-width="1.5"/>
  <line x1="266.4" y1="176.7" x2="287.6" y2="168.3" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="268.6" y1="151.6" x2="285.4" y2="138.4" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="270.4" y1="125.3" x2="283.6" y2="109.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="271.7" y1="98.4" x2="282.3" y2="81.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="300.1" y1="248.4" x2="316.9" y2="261.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="297.9" y1="223.3" x2="319.1" y2="231.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="296.6" y1="200.0" x2="320.4" y2="200.0" stroke="#1a202c" stroke-width="1.5"/>
  <line x1="297.9" y1="176.7" x2="319.1" y2="168.3" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="300.1" y1="151.6" x2="316.9" y2="138.4" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="301.9" y1="125.3" x2="315.1" y2="109.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="303.2" y1="98.4" x2="313.8" y2="81.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="331.6" y1="248.4" x2="348.4" y2="261.6" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="329.4" y1="223.3" x2="350.6" y2="231.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="328.1" y1="200.0" x2="351.9" y2="200.0" stroke="#1a202c" stroke-width="1.5"/>
  <line x1="329.4" y1="176.7" x2="350.6" y2="168.3" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="331.6" y1="151.6" x2="348.4" y2="138.4" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="333.4" y1="125.3" x2="346.6" y2="109.7" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="334.7" y1="98.4" x2="345.3" y2="81.6" stroke="#94a3b8" stroke-width="1.5"/>
  <path d="M 60.0,186.2 L 62.7,185.7 L 65.4,185.2 L 68.0,184.6 L 70.7,184.0 L 73.4,183.3 L 76.1,182.7 L 78.8,182.0 L 81.5,181.3 L 84.2,180.6 L 86.8,179.8 L 89.5,179.0 L 92.2,178.2 L 94.9,177.4 L 97.6,176.5 L 100.2,175.6 L 102.9,174.6 L 105.6,173.6 L 108.3,172.6 L 111.0,171.5 L 113.7,170.4 L 116.3,169.2 L 119.0,168.0 L 121.7,166.8 L 124.4,165.5 L 127.1,164.1 L 129.8,162.7 L 132.4,161.3 L 135.1,159.8 L 137.8,158.2 L 140.5,156.6 L 143.2,154.9 L 145.9,153.1 L 148.6,151.3 L 151.2,149.4 L 153.9,147.4 L 156.6,145.3 L 159.3,143.2 L 162.0,141.0 L 164.6,138.7 L 167.3,136.3 L 170.0,133.8 L 172.7,131.2 L 175.4,128.5 L 178.1,125.7 L 180.8,122.8 L 183.4,119.8 L 186.1,116.7 L 188.8,113.4 L 191.5,110.0 L 194.2,106.5 L 196.8,102.9 L 199.5,99.1 L 202.2,95.1 L 204.9,91.0 L 207.6,86.8 L 210.3,82.4 L 213.0,77.8 L 215.6,73.0 L 218.3,68.0 L 221.0,62.9" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="227.0" y="62.9" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">nghiệm y = ¼eˣ</text>
  <path d="M 60.0,216.5 L 62.7,217.2 L 65.4,217.8 L 68.1,218.5 L 70.8,219.3 L 73.6,220.0 L 76.3,220.8 L 79.0,221.6 L 81.7,222.5 L 84.4,223.4 L 87.1,224.3 L 89.8,225.3 L 92.6,226.3 L 95.3,227.3 L 98.0,228.4 L 100.7,229.5 L 103.4,230.7 L 106.1,231.9 L 108.8,233.1 L 111.5,234.5 L 114.2,235.8 L 117.0,237.2 L 119.7,238.7 L 122.4,240.2 L 125.1,241.8 L 127.8,243.5 L 130.5,245.2 L 133.2,247.0 L 135.9,248.8 L 138.7,250.8 L 141.4,252.8 L 144.1,254.9 L 146.8,257.0 L 149.5,259.3 L 152.2,261.6 L 154.9,264.0 L 157.7,266.6 L 160.4,269.2 L 163.1,271.9 L 165.8,274.8 L 168.5,277.7" fill="none" stroke="#15803d" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="176.5" y="275.7" fill="#15803d" font-size="12" text-anchor="start" font-weight="700">y = −0.3eˣ</text>
  <text x="401.0" y="94.0" fill="#475569" font-size="11" text-anchor="start">dốc 2: nghiêng mạnh</text>
  <text x="401.0" y="149.0" fill="#475569" font-size="11" text-anchor="start">dốc 1: 45°</text>
  <text x="401.0" y="204.0" fill="#475569" font-size="11" text-anchor="start">dốc 0: nằm ngang (y = 0)</text>
  <text x="401.0" y="259.0" fill="#475569" font-size="11" text-anchor="start">dốc −1: xuống</text>
  <text x="20.0" y="22.0" fill="#475569" font-size="11" text-anchor="start">y′ = y: mỗi gạch có độ dốc bằng y tại điểm đó; càng lên cao càng dốc → nghiệm eˣ vểnh lên</text>
</svg>

Đường nghiệm $y = e^x$ (đi qua $(0,1)$) luôn tiếp tuyến với gạch tại mỗi điểm: ở $y$ thấp đi thoai thoải, lên cao thì vọt lên — đúng "càng nhiều càng tăng nhanh".

❓ **Trường hướng để làm gì nếu vẫn phải giải ODE?** Nhiều ODE **không có công thức nghiệm dạng đóng** (vd $y' = x^2 + y^2$). Trường hướng (+ phương pháp số như Euler) cho ta hình dạng nghiệm mà không cần công thức. Nó cũng giúp thấy ngay **nghiệm cân bằng** (chỗ $y' = 0$, gạch ngang) và hành vi dài hạn.

> 📐 **Định nghĩa đầy đủ — Phương trình vi phân thường (ODE)**
>
> **(a) Là gì**: PT trong đó **ẩn số là 1 hàm** $y(x)$ (không phải 1 số), và PT có chứa các đạo hàm của hàm đó. "Giải ODE" = tìm hàm $y(x)$ thoả PT, thường có 1 hằng số tự do (cần điều kiện đầu $y(x_0) = y_0$ để xác định cụ thể).
>
> **(b) Vì sao cần**: Hầu hết quy luật khoa học không phát biểu trực tiếp về **giá trị** mà về **tốc độ thay đổi**. Newton định luật 2: $F = ma = m\cdot\frac{d^2s}{dt^2}$ (PT vi phân bậc 2 cho $s(t)$). Phóng xạ: $\frac{dN}{dt} = -\lambda N$ (tốc độ phân rã tỉ lệ $N$). RC mạch: $V = R\cdot\frac{dq}{dt} + \frac{q}{C}$. Logistic dân số: $\frac{dN}{dt} = rN(1-N/K)$. Cơ học lượng tử: Schrödinger PT là PT vi phân riêng phần. Mô hình hoá COVID, kinh tế, khí hậu — tất cả đều ODE/PDE. Giải ODE = "tích phân" hàm theo thời gian/không gian.
>
> **(c) Ví dụ số**: $y' = 2x \to y = x^2 + C$ (nguyên hàm). $y(0) = 5 \to C = 5 \to y = x^2+5$. $\frac{dN}{dt} = -0.1N \to N(t) = N_0\cdot e^{-0.1t}$. Nếu $N_0 = 1000$, sau 10 đơn vị thời gian: $N(10) = 1000\cdot e^{-1} \approx 368$. Con lắc nhỏ: $\theta'' + (g/L)\cdot\theta = 0 \to \theta(t) = A\cos(\omega t+\varphi)$ với $\omega = \sqrt{g/L}$. $L = 1$m, $g = 9.8 \to \omega \approx 3.13$ rad/s, chu kỳ $T \approx \mathbf{2.01}$s. Lò xo $m=1$kg, $k=100$ N/m: $\omega = 10$ rad/s, $T = 0.628$s.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nghiệm ODE là số hay hàm?"* Là **hàm** $y(x)$, không phải 1 con số. Vd $y' = 2x$ có nghiệm $y = x^2 + C$ (cả họ hàm). Đây là khác biệt cốt lõi với phương trình đại số.
- *"Vì sao có hằng số C?"* Vì "tích phân" mất thông tin hằng số. Cần thêm **điều kiện đầu** (vd $y(0) = 5$) để chốt $C$, ra 1 nghiệm cụ thể.

⚠ **Lỗi thường gặp — quên hằng số C khi giải**. Mỗi lần tích phân sinh 1 hằng số. ODE bậc 1 → 1 hằng số; bậc 2 → 2 hằng số. Phản ví dụ: $y' = 2x \to$ viết $y = x^2$ (thiếu $C$) là sai; phải $y = x^2 + C$, rồi dùng điều kiện đầu tìm $C$.

🔁 **Dừng lại tự kiểm tra**

1. $y = 3e^{2x}$ có là nghiệm của $y' = 2y$ không?
2. Bậc của $y''' + y' = x$ là mấy?

<details><summary>Đáp án</summary>

1. $y' = 6e^{2x} = 2\cdot(3e^{2x}) = 2y$ ✓ → **có**.
2. **Bậc 3** (đạo hàm cao nhất là $y'''$).

</details>

### 1.2. Bản đồ chọn phương pháp (đọc trước, dùng suốt bài)

Khi gặp một ODE, hỏi tuần tự — câu trả lời "có" đầu tiên chỉ ra phương pháp:

<svg viewBox="0 0 600 245" style="max-width:600px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Sơ đồ chọn phương pháp giải ODE: bậc 1 tách biến hoặc thừa số tích phân; bậc 2 hệ số hằng dùng phương trình đặc trưng, xét Δ">
  <defs><marker id="ar19" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#94a3b8"/></marker></defs>
  <rect x="200.0" y="14.0" width="180.0" height="36.0" rx="8" fill="#f1f5f9" fill-opacity="1" stroke="#1a202c" stroke-width="2"/>
  <text x="290.0" y="37.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">ODE đến tay</text>
  <line x1="290.0" y1="50.0" x2="150.0" y2="84.0" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ar19)"/>
  <line x1="290.0" y1="50.0" x2="430.0" y2="84.0" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ar19)"/>
  <rect x="70.0" y="86.0" width="160.0" height="34.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="150.0" y="108.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">Bậc 1?</text>
  <rect x="350.0" y="86.0" width="160.0" height="34.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="430.0" y="108.0" fill="#15803d" font-size="13" text-anchor="middle" font-weight="700">Bậc 2 hệ số hằng?</text>
  <line x1="150.0" y1="120.0" x2="80.0" y2="156.0" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ar19)"/>
  <line x1="150.0" y1="120.0" x2="220.0" y2="156.0" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ar19)"/>
  <rect x="10.0" y="158.0" width="140.0" height="46.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="80.0" y="178.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">y′ = f(x)·g(y)?</text>
  <text x="80.0" y="194.0" fill="#1d4ed8" font-size="11" text-anchor="middle">→ TÁCH BIẾN (mục 2)</text>
  <rect x="160.0" y="158.0" width="150.0" height="46.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="235.0" y="178.0" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">y′ + P(x)y = Q(x)?</text>
  <text x="235.0" y="194.0" fill="#1d4ed8" font-size="10" text-anchor="middle">→ THỪA SỐ TÍCH PHÂN (mục 3)</text>
  <line x1="430.0" y1="120.0" x2="430.0" y2="156.0" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ar19)"/>
  <rect x="330.0" y="158.0" width="200.0" height="46.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="430.0" y="178.0" fill="#15803d" font-size="10" text-anchor="middle" font-weight="700">y″ + a y′ + b y = 0</text>
  <text x="430.0" y="194.0" fill="#15803d" font-size="10" text-anchor="middle">→ PT ĐẶC TRƯNG r² + ar + b = 0 (mục 4)</text>
  <text x="300.0" y="228.0" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">Δ &gt; 0: hai mũ thực · Δ = 0: kép, nhân x · Δ &lt; 0: dao động</text>
</svg>

| Dấu hiệu nhận ra | Phương pháp | Mục |
|---|---|---|
| $\frac{dy}{dx} = f(x)g(y)$ tách được | Tách biến | 2 |
| $y' + P(x)y = Q(x)$ (tuyến tính bậc 1) | Thừa số tích phân $\mu = e^{\int P}$ | 3 |
| $y'' + ay' + by = 0$ | PT đặc trưng + xét $\Delta$ | 4 |

⚠ Lưu ý: vài ODE bậc 1 vừa tách biến **vừa** tuyến tính (vd $y' = ky$) — chọn cách nào cũng ra cùng đáp số. Nhiều ODE phi tuyến (vd $y' = x^2 + y^2$) **không** thuộc ba lớp trên → cần phương pháp số hoặc trường hướng (mục 1.1).

### 📝 Tóm tắt mục 1

- ODE: phương trình chứa hàm chưa biết $y(x)$ và đạo hàm của nó; nghiệm là **hàm** (cả họ + hằng số).
- Bậc = bậc đạo hàm cao nhất; tuyến tính = $y$, $y'$, ... chỉ bậc 1, không nằm trong hàm phi tuyến.
- ODE là "ngôn ngữ" mô tả quy luật qua tốc độ thay đổi; trường hướng cho "nhìn" nghiệm khi chưa giải.
- Bản đồ chọn phương pháp: tách biến / thừa số tích phân / PT đặc trưng (mục 1.2).

---

## 2. ODE bậc 1 — Tách biến (Separable)

💡 **Trực giác / Hình dung**: nếu vế phải "tách" được thành phần chỉ-x nhân phần chỉ-y, ta dồn mọi thứ y về 1 vế, mọi thứ x về vế kia, rồi tích phân từng vế độc lập. Như phân loại đồ vào 2 ngăn rồi xử lý riêng.

Dạng:

$$\frac{dy}{dx} = f(x)\cdot g(y)$$

**Cách giải**: tách 2 vế:

$$\frac{dy}{g(y)} = f(x)\,dx$$

Tích phân 2 vế.

**Ví dụ 1**: $\frac{dy}{dx} = -2x\cdot y$.
- $\frac{dy}{y} = -2x\,dx$.
- $\int \frac{dy}{y} = -\int 2x\,dx \to \ln|y| = -x^2 + C$.
- → $\mathbf{y = A\cdot e^{-x^2}}$ ($A = e^C$).

  **Verify bằng thế ngược** ($A = 3$): $y = 3e^{-x^2}$, $y' = 3\cdot(-2x)e^{-x^2} = -2x\cdot(3e^{-x^2}) = -2x\cdot y$ ✓ — đúng PT gốc. Đây là cách tự kiểm: lấy nghiệm, đạo hàm, thay lại xem có khớp không.

**Ví dụ 2 — Tăng trưởng dân số**: $\frac{dN}{dt} = k\cdot N$.
- $\frac{dN}{N} = k\,dt \to \ln|N| = kt + C \to \mathbf{N(t) = N_0\cdot e^{kt}}$.

→ Tăng trưởng cấp số nhân. Nếu $k > 0$ (sinh nhiều hơn chết) thì bùng nổ.

### 2.1. Quy trình tách biến — 4 bước

Mỗi bài tách biến chạy đúng 4 bước:

> **Bước 1 — kiểm tra dạng**: viết được $\frac{dy}{dx} = f(x)\cdot g(y)$ không? (vế phải = tích phần-x × phần-y).
>
> **Bước 2 — tách**: chuyển mọi thứ chứa $y$ (gồm $dy$) sang một vế, mọi thứ chứa $x$ (gồm $dx$) sang vế kia: $\frac{dy}{g(y)} = f(x)\,dx$.
>
> **Bước 3 — tích phân hai vế** (mỗi vế một biến độc lập), nhớ **một** hằng số $C$ ở vế phải.
>
> **Bước 4 — giải $y$ theo $x$** rồi (nếu có) dùng điều kiện đầu chốt $C$.

### 2.2. Walk-through 3 ví dụ từng bước

**Walk-through A — Tăng trưởng mũ** $\frac{dN}{dt} = kN$, $N(0) = N_0$ (vi khuẩn, lãi kép, dân số đầu).

$$\begin{aligned}
\text{B1: } & f(t)=k,\ g(N)=N \text{ (tách được)} \\
\text{B2: } & \frac{dN}{N} = k\,dt \\
\text{B3: } & \int\frac{dN}{N} = \int k\,dt \;\Rightarrow\; \ln|N| = kt + C \\
\text{B4: } & N = e^{kt+C} = e^C\cdot e^{kt} = A\,e^{kt} \\
       & N(0)=A=N_0 \;\Rightarrow\; \boxed{N(t) = N_0\,e^{kt}}
\end{aligned}$$

Verify bằng số ($N_0 = 100$, $k = 0.2$/giờ): $N(5) = 100\,e^{1} \approx 272$; $N(10) = 100\,e^{2} \approx 739$. Kiểm tra đạo hàm: $N'(5) = 0.2\cdot 272 = 54.4$, đúng bằng $kN$ ✓.

**Walk-through B — Mô hình logistic** $\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right)$ ($K$ = sức chứa môi trường — dân số bị giới hạn).

$$\begin{aligned}
\text{B1: } & f(t)=r,\ g(N)=N\!\left(1-\tfrac{N}{K}\right) \text{ (tách được)} \\
\text{B2: } & \frac{dN}{N\left(1-\frac{N}{K}\right)} = r\,dt \\
\text{B3: } & \text{phân thức từng phần: } \frac{1}{N(1-N/K)} = \frac{1}{N} + \frac{1/K}{1-N/K} \\
       & \int\!\left(\frac{1}{N} + \frac{1/K}{1-N/K}\right)dN = \int r\,dt \\
       & \ln|N| - \ln\!\left|1-\tfrac{N}{K}\right| = rt + C \;\Rightarrow\; \ln\!\frac{N}{1-N/K} = rt+C \\
\text{B4: } & \frac{N}{1-N/K} = A\,e^{rt} \;\Rightarrow\; \boxed{N(t) = \frac{K}{1 + \left(\frac{K-N_0}{N_0}\right)e^{-rt}}}
\end{aligned}$$

Verify ($K = 1000$, $N_0 = 100$, $r = 0.5$): $t=0 \to N = \frac{1000}{1+9} = 100$ ✓. $t\to\infty \to e^{-rt}\to 0 \to N \to 1000 = K$ ✓ (chạm trần). Khác mũ: lúc đầu gần như mũ ($N$ nhỏ thì $1-N/K \approx 1$), về sau bão hòa thành chữ S.

So sánh mũ (bùng nổ) vs logistic (chữ S, chạm trần $K$):

<svg viewBox="0 0 520 275" style="max-width:520px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="So sánh tăng trưởng mũ N₀eʳᵗ (vọt lên) và logistic (chữ S, chạm trần K) cùng xuất phát N₀">
  <defs><marker id="ar20" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="60.0" y1="198.4" x2="516.5" y2="198.4"/>
<line x1="60.0" y1="76.0" x2="516.5" y2="76.0"/>
</g>
  <line x1="54.0" y1="220.0" x2="538.5" y2="220.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar20)"/>
  <line x1="60.0" y1="226.0" x2="60.0" y2="3.6" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar20)"/>
  <text x="530.5" y="236.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">t</text>
  <text x="68.0" y="13.6" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">N</text>
  <line x1="56.0" y1="198.4" x2="64.0" y2="198.4" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="202.4" fill="#475569" font-size="11" text-anchor="end">N₀</text>
  <line x1="56.0" y1="76.0" x2="64.0" y2="76.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="80.0" fill="#475569" font-size="11" text-anchor="end">K</text>
  <line x1="60.0" y1="76.0" x2="511.0" y2="76.0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 4"/>
  <path d="M 60.0,198.4 L 63.2,197.2 L 66.5,196.0 L 69.7,194.7 L 72.9,193.3 L 76.2,191.9 L 79.4,190.3 L 82.6,188.7 L 85.8,187.0 L 89.1,185.2 L 92.3,183.3 L 95.5,181.4 L 98.8,179.3 L 102.0,177.0 L 105.2,174.7 L 108.5,172.3 L 111.7,169.7 L 114.9,166.9 L 118.2,164.1 L 121.4,161.0 L 124.6,157.8 L 127.9,154.4 L 131.1,150.9 L 134.3,147.1 L 137.6,143.2 L 140.8,139.0 L 144.0,134.6 L 147.2,130.0 L 150.5,125.1 L 153.7,119.9 L 156.9,114.5 L 160.2,108.7 L 163.4,102.7 L 166.6,96.3 L 169.9,89.6 L 173.1,82.5 L 176.3,75.1 L 179.6,67.2 L 182.8,58.9 L 186.0,50.2 L 189.2,40.9" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M 60.0,198.4 L 65.6,196.7 L 71.3,194.8 L 76.9,192.8 L 82.5,190.7 L 88.2,188.5 L 93.8,186.2 L 99.5,183.7 L 105.1,181.2 L 110.7,178.5 L 116.4,175.7 L 122.0,172.9 L 127.7,169.9 L 133.3,166.8 L 138.9,163.7 L 144.6,160.5 L 150.2,157.3 L 155.8,154.0 L 161.5,150.7 L 167.1,147.3 L 172.8,144.0 L 178.4,140.7 L 184.0,137.5 L 189.7,134.2 L 195.3,131.1 L 200.9,128.0 L 206.6,124.9 L 212.2,122.0 L 217.8,119.2 L 223.5,116.4 L 229.1,113.8 L 234.8,111.3 L 240.4,108.9 L 246.0,106.6 L 251.7,104.4 L 257.3,102.4 L 262.9,100.5 L 268.6,98.6 L 274.2,96.9 L 279.9,95.3 L 285.5,93.9 L 291.1,92.5 L 296.8,91.2 L 302.4,90.0 L 308.0,88.8 L 313.7,87.8 L 319.3,86.8 L 325.0,85.9 L 330.6,85.1 L 336.2,84.4 L 341.9,83.7 L 347.5,83.0 L 353.1,82.4 L 358.8,81.9 L 364.4,81.4 L 370.1,80.9 L 375.7,80.5 L 381.3,80.1 L 387.0,79.8 L 392.6,79.4 L 398.2,79.1 L 403.9,78.9 L 409.5,78.6 L 415.2,78.4 L 420.8,78.2 L 426.4,78.0 L 432.1,77.8 L 437.7,77.7 L 443.3,77.5 L 449.0,77.4 L 454.6,77.3 L 460.3,77.2 L 465.9,77.1 L 471.5,77.0 L 477.2,76.9 L 482.8,76.8 L 488.4,76.7 L 494.1,76.7 L 499.7,76.6 L 505.4,76.6 L 511.0,76.5" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="195.2" y="40.9" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">mũ: N₀eʳᵗ (vọt thẳng)</text>
  <text x="390.0" y="103.0" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">logistic: uốn cong, bão hòa ở K</text>
  <text x="507.0" y="70.0" fill="#94a3b8" font-size="11" text-anchor="end">trần K</text>
  <circle cx="60.0" cy="198.4" r="4" fill="#1a202c"/>
  <text x="260.0" y="258.0" fill="#475569" font-size="12" text-anchor="middle">chung gốc N₀; mũ bùng nổ, logistic chữ S nằm ngang ở K</text>
</svg>

**Walk-through C — Làm nguội Newton** $\frac{dT}{dt} = -k(T - T_s)$ ($T_s$ = nhiệt độ phòng; cốc cà phê nguội dần).

$$\begin{aligned}
\text{B1: } & \text{đặt } u = T - T_s \Rightarrow \frac{du}{dt} = \frac{dT}{dt} = -ku \text{ (tách được)} \\
\text{B2: } & \frac{du}{u} = -k\,dt \\
\text{B3: } & \ln|u| = -kt + C \\
\text{B4: } & u = A\,e^{-kt} \Rightarrow T - T_s = A\,e^{-kt} \\
       & T(0)=T_0 \Rightarrow A = T_0 - T_s \Rightarrow \boxed{T(t) = T_s + (T_0 - T_s)e^{-kt}}
\end{aligned}$$

Verify (cà phê $T_0 = 90°$C, phòng $T_s = 25°$C, $k = 0.1$/phút): $t=0 \to T = 25 + 65 = 90$ ✓. $t=10 \to T = 25 + 65\,e^{-1} = 25 + 23.9 = 48.9°$C. $t\to\infty \to T \to 25°$C (bằng phòng) ✓. Chênh lệch $T-T_s$ giảm theo hàm mũ — nguội nhanh lúc đầu (chênh lớn), chậm dần khi gần nhiệt độ phòng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Mọi ODE bậc 1 đều tách biến được?"* Không. Chỉ khi vế phải $= f(x)\cdot g(y)$. Vd $\frac{dy}{dx} = x + y$ KHÔNG tách được (phải dùng phương pháp tuyến tính, mục 3).
- *"Vì sao $\frac{dN}{dt} = kN$ ra hàm mũ?"* Vì "tốc độ tỉ lệ với lượng hiện có" = đặc trưng của hàm mũ (càng nhiều càng tăng nhanh). Đây là mô hình lãi kép, dân số, phóng xạ ($k < 0$).

⚠ **Lỗi thường gặp — quên $|y|$ và hằng số khi tích phân $1/y$**. $\int \frac{dy}{y} = \ln|y| + C$ (có trị tuyệt đối). Quên $C$ → mất họ nghiệm; quên $|\cdot|$ → sai miền. Sau khi mũ hóa: $y = \pm e^C\cdot e^{...} = A\cdot e^{...}$, $A$ gói cả dấu.

⚠ **Lỗi thường gặp — chia cho 0 khi tách biến (đánh rơi nghiệm hằng)**. Bước 2 chia hai vế cho $g(y)$ — nhưng nếu $g(y_0) = 0$ tại giá trị $y_0$ nào đó thì phép chia **không hợp lệ** ở đó, và $y \equiv y_0$ (hằng) thường là một **nghiệm bị bỏ sót**. Phản ví dụ: $\frac{dy}{dx} = y^2 - y = y(y-1)$. Chia cho $y(y-1)$ làm mất hai nghiệm hằng $y \equiv 0$ và $y \equiv 1$ (cả hai cho $y' = 0 = g(y)$ ✓). Với logistic, $N \equiv 0$ và $N \equiv K$ là hai nghiệm cân bằng bị chia mất — phải kiểm riêng. **Quy tắc**: trước khi chia $g(y)$, giải $g(y) = 0$ và ghi các nghiệm hằng ra trước.

🔁 **Dừng lại tự kiểm tra**

1. Giải $\frac{dy}{dx} = 3y$ với $y(0) = 2$.
2. Cà phê $90°$C trong phòng $25°$C, $k = 0.1$/phút. Sau bao lâu còn $60°$C?
3. Tìm mọi nghiệm hằng (cân bằng) của $\frac{dy}{dx} = y(2 - y)$.

<details><summary>Đáp án</summary>

1. $\frac{dy}{y} = 3\,dx \to \ln|y| = 3x + C \to y = A\cdot e^{3x}$. $y(0) = A = 2 \to \mathbf{y = 2e^{3x}}$.
2. $T(t) = 25 + 65e^{-0.1t} = 60 \to e^{-0.1t} = 35/65 = 0.538 \to -0.1t = \ln 0.538 = -0.619 \to t = \mathbf{6.19}$ phút.
3. $g(y) = y(2-y) = 0 \to y \equiv 0$ và $y \equiv 2$ (hai nghiệm cân bằng; đừng quên khi tách biến).

</details>

### 📝 Tóm tắt mục 2

- Tách biến (4 bước): kiểm tra dạng $f(x)g(y)$ → tách → tích phân → giải $y$ + chốt $C$.
- Ba mô hình kinh điển: mũ $N_0 e^{kt}$ (bùng nổ), logistic $\frac{K}{1+\ldots e^{-rt}}$ (chữ S, chạm trần $K$), nguội Newton $T_s + (T_0-T_s)e^{-kt}$ (tiệm cận $T_s$).
- Nhớ $|y|$ và hằng số $C$; và **kiểm nghiệm hằng** $g(y)=0$ trước khi chia (đừng đánh rơi).

---

## 3. ODE bậc 1 tuyến tính

💡 **Trực giác / Hình dung**: khi không tách biến được, ta nhân cả phương trình với 1 "thừa số phép thuật" $\mu(x)$ khiến vế trái gập lại thành đạo hàm của 1 tích $(\mu\cdot y)'$. Rồi chỉ việc tích phân ngược. $\mu$ được thiết kế đúng để $(\mu y)' = \mu y' + \mu'y$ khớp với vế trái.

Dạng:

$$y' + P(x)\cdot y = Q(x)$$

**Phương pháp thừa số tích phân**: nhân 2 vế với $\mu(x) = e^{\int P(x)\,dx}$:

$$\begin{aligned}
(\mu\cdot y)' &= \mu\cdot Q \\
\mu\cdot y &= \int \mu\cdot Q\,dx \\
y &= \frac{1}{\mu} \int \mu\cdot Q\,dx
\end{aligned}$$

### 3.1. Quy trình thừa số tích phân — 4 bước

> **Bước 1 — chuẩn dạng**: viết về đúng $y' + P(x)y = Q(x)$ (hệ số của $y'$ phải là $1$; nếu không, chia cả hai vế cho nó trước).
>
> **Bước 2 — tính $\mu$**: $\mu(x) = e^{\int P(x)\,dx}$ (không cần $+C$ ở bước này — chọn một nguyên hàm bất kỳ là đủ).
>
> **Bước 3 — gập vế trái**: nhân cả PT với $\mu$ thì vế trái thành $(\mu y)'$; viết $(\mu y)' = \mu Q$.
>
> **Bước 4 — tích phân**: $\mu y = \int \mu Q\,dx + C$, rồi chia $\mu$ ra $y$, dùng điều kiện đầu chốt $C$.

### 3.2. Walk-through 2 ví dụ từng bước

**Walk-through A — $y' + 2y = 4$** (vd cân bằng, đã có ở trên, nay viết đủ 4 bước):

$$\begin{aligned}
\text{B1: } & P(x)=2,\ Q(x)=4 \quad(\text{hệ số } y' \text{ đã là } 1) \\
\text{B2: } & \mu = e^{\int 2\,dx} = e^{2x} \\
\text{B3: } & (e^{2x}y)' = e^{2x}\cdot 4 \\
\text{B4: } & e^{2x}y = \int 4e^{2x}\,dx = 2e^{2x} + C \\
       & \boxed{y = 2 + C\,e^{-2x}}
\end{aligned}$$

Khi $t \to \infty$: $e^{-2x}\to 0 \to y \to 2$ (cân bằng). Verify ($C = 3$): $y = 2 + 3e^{-2x}$, $y' = -6e^{-2x}$; $y' + 2y = -6e^{-2x} + 4 + 6e^{-2x} = 4$ ✓.

**Walk-through B — $xy' + y = x^2$** (hệ số $y'$ KHÔNG phải $1$ — phải chuẩn dạng trước; $x > 0$):

$$\begin{aligned}
\text{B1: } & \text{chia cho } x:\ y' + \tfrac{1}{x}y = x \;\Rightarrow\; P=\tfrac{1}{x},\ Q=x \\
\text{B2: } & \mu = e^{\int \frac{1}{x}\,dx} = e^{\ln x} = x \\
\text{B3: } & (xy)' = x\cdot x = x^2 \quad(\text{để ý vế trái gốc } xy'+y \text{ đúng là } (xy)') \\
\text{B4: } & xy = \int x^2\,dx = \tfrac{x^3}{3} + C \\
       & \boxed{y = \tfrac{x^2}{3} + \tfrac{C}{x}}
\end{aligned}$$

Verify ($C = 0$): $y = x^2/3$, $y' = 2x/3$; $xy' + y = \frac{2x^2}{3} + \frac{x^2}{3} = x^2$ ✓. Lưu ý mẹo: trong ví dụ này vế trái gốc $xy' + y$ **vốn đã** là $(xy)'$ — đó chính là lý do $\mu = x$ "khớp đẹp".

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $\mu = e^{\int P\,dx}$?"* Để $\mu' = P\cdot\mu$, khi đó $\mu y' + P\mu y = \mu y' + \mu'y = (\mu y)'$ — gập lại thành đạo hàm tích. Đó là yêu cầu thiết kế $\mu$.
- *"Nghiệm gồm 2 phần: 2 và $C\cdot e^{-2x}$, nghĩa là gì?"* "2" là nghiệm riêng (trạng thái cân bằng lâu dài); $C\cdot e^{-2x}$ là phần phụ tắt dần về 0. Cấu trúc "cân bằng + transient" rất phổ biến trong vật lý/kỹ thuật.

⚠ **Lỗi thường gặp — quên nhân $Q$ với $\mu$ ở vế phải**. Sau khi nhân $\mu$, vế phải phải là $\mu\cdot Q$ (cả hai vế nhân $\mu$). Phản ví dụ: $y'+2y=4$, $\mu=e^{2x}$. Vế phải đúng $\int 4e^{2x}\,dx$; nếu quên $\mu$, tích $\int 4\,dx = 4x$ → nghiệm sai.

⚠ **Lỗi thường gặp — áp điều kiện đầu TRƯỚC khi viết $+C$ (chốt $C$ vào nghiệm thiếu hằng)**. Đây là lỗi "chết người" xuyên suốt mọi phương pháp giải ODE: phải có nghiệm tổng quát đầy đủ (kèm $C$) **rồi mới** thay $y(x_0) = y_0$ để tìm $C$. Phản ví dụ với $y' + 2y = 4$, $y(0) = 5$: nếu vội viết $y = 2$ (bỏ $C\,e^{-2x}$) rồi thấy $y(0) = 2 \neq 5$ thì bí. Làm đúng: nghiệm tổng quát $y = 2 + C e^{-2x}$, thay $y(0) = 2 + C = 5 \to C = 3 \to y = 2 + 3e^{-2x}$. **Nhớ**: $+C$ trước, điều kiện đầu sau.

⚠ **Lỗi thường gặp — quên chuẩn dạng (hệ số $y' \neq 1$)**. Nếu PT là $2y' + 4y = 8$, KHÔNG được lấy $P = 4$. Phải chia cho $2$ trước: $y' + 2y = 4 \to P = 2$. Lấy nhầm $P$ → $\mu$ sai → cả nghiệm sai.

🔁 **Dừng lại tự kiểm tra**

1. Tìm thừa số tích phân $\mu$ cho $y' + 3y = x$.
2. Giải $y' + y = e^{x}$ với $y(0) = 1$ (chú ý: viết $+C$ trước rồi mới chốt).

<details><summary>Đáp án</summary>

1. $P = 3 \to \mu = e^{\int 3\,dx} = \mathbf{e^{3x}}$.
2. $\mu = e^x$; $(e^x y)' = e^x\cdot e^x = e^{2x}$; $e^x y = \frac{e^{2x}}{2} + C$; $y = \frac{e^x}{2} + Ce^{-x}$. $y(0) = \frac12 + C = 1 \to C = \frac12 \to \mathbf{y = \frac{e^x + e^{-x}}{2} = \cosh x}$.

</details>

### 📝 Tóm tắt mục 3

- Dạng $y' + P(x)y = Q(x)$; nhân $\mu = e^{\int P\,dx}$ → vế trái $= (\mu y)'$.
- Giải: $\mu y = \int \mu Q\,dx \to y = \frac{1}{\mu}\int \mu Q\,dx$ (nhớ nhân $Q$ với $\mu$).
- Nghiệm thường = cân bằng + phần transient tắt dần.

---

## 4. ODE bậc 2 tuyến tính hệ số hằng

💡 **Trực giác / Hình dung**: đoán nghiệm dạng $y = e^{rx}$ (vì đạo hàm của mũ lại ra mũ). Thay vào, phương trình rút gọn thành PT bậc 2 cho $r$ (PT đặc trưng). $\Delta$ quyết định "tính cách" nghiệm: 2 nghiệm thực → tắt dần không dao động; nghiệm phức → **dao động** (sin/cos); nghiệm kép → trường hợp tới hạn. Đây là toán học của lò xo, mạch điện, con lắc.

$$y'' + a\cdot y' + b\cdot y = 0$$

(Thuần nhất — vế phải $= 0$.)

**Phương pháp**: tìm nghiệm dạng $y = e^{rx}$. Thay vào → **PT đặc trưng**:

$$r^2 + a\cdot r + b = 0$$

3 trường hợp theo $\Delta = a^2 - 4b$:

### TH1: $\Delta > 0$ — 2 nghiệm thực $r_1, r_2$

$$y = C_1\cdot e^{r_1 x} + C_2\cdot e^{r_2 x}$$

### TH2: $\Delta = 0$ — nghiệm kép $r$

$$y = (C_1 + C_2\cdot x)\cdot e^{rx}$$

### TH3: $\Delta < 0$ — 2 nghiệm phức $\alpha \pm \beta i$

$$y = e^{\alpha x}\cdot(C_1\cos(\beta x) + C_2\sin(\beta x))$$

→ **Dao động**.

**Walk-through 3 trường hợp** (mỗi TH 1 ví dụ):
- $\Delta > 0$: $y'' - 3y' + 2y = 0 \to r^2 - 3r + 2 = 0 \to r = 1, 2 \to y = C_1 e^x + C_2 e^{2x}$.
- $\Delta = 0$: $y'' - 4y' + 4y = 0 \to r^2 - 4r + 4 = 0 \to r = 2$ (kép) $\to y = (C_1 + C_2 x)e^{2x}$.
- $\Delta < 0$: $y'' + 4y = 0 \to r^2 + 4 = 0 \to r = \pm 2i \to y = C_1\cos(2x) + C_2\sin(2x)$.

### 4.1. Vì sao $y = e^{rx}$ rút thành PT đặc trưng — dẫn từng bước

Thay $y = e^{rx}$ vào $y'' + ay' + by = 0$. Vì $y' = re^{rx}$, $y'' = r^2 e^{rx}$:

$$\begin{aligned}
r^2 e^{rx} + a\,r e^{rx} + b\,e^{rx} &= 0 \\
e^{rx}\,(r^2 + ar + b) &= 0 \\
\end{aligned}$$

Mà $e^{rx} \neq 0$ với mọi $x$, nên buộc $r^2 + ar + b = 0$ — đó là **PT đặc trưng (characteristic equation)**. Vậy mỗi nghiệm $r$ của PT bậc 2 này cho một nghiệm $e^{rx}$ của ODE; ODE bậc 2 cần **hai** nghiệm độc lập tổ hợp lại.

### 4.2. Walk-through 2 ví dụ đầy đủ — mỗi trường hợp một, kèm điều kiện đầu

**Walk-through A — $\Delta > 0$ (tắt dần không dao động), có IVP**: $y'' - 3y' + 2y = 0$, $y(0) = 3$, $y'(0) = 4$.

$$\begin{aligned}
\text{PT đặc trưng: } & r^2 - 3r + 2 = 0,\ \Delta = 9 - 8 = 1 > 0 \\
& r = \frac{3 \pm 1}{2} = 2,\ 1 \\
\text{Tổng quát: } & y = C_1 e^{x} + C_2 e^{2x} \\
y' &= C_1 e^{x} + 2C_2 e^{2x} \\
\text{Đầu: } & y(0) = C_1 + C_2 = 3 \\
       & y'(0) = C_1 + 2C_2 = 4 \\
\text{Trừ: } & C_2 = 1,\ C_1 = 2 \\
& \boxed{y = 2e^{x} + e^{2x}}
\end{aligned}$$

Verify: $y(0) = 2 + 1 = 3$ ✓; $y'(0) = 2\cdot 1 + 2\cdot 1\cdot 1 = 2 + 2 = 4$ ✓. Cả hai mũ dương ($r > 0$) → nghiệm tăng vọt; nếu là $-1, -2$ thì tắt dần về 0.

**Walk-through B — $\Delta < 0$ (dao động tắt dần), có IVP**: $y'' + 2y' + 5y = 0$, $y(0) = 2$, $y'(0) = 0$ (lò xo có ma sát, thả từ biên độ 2).

$$\begin{aligned}
\text{PT đặc trưng: } & r^2 + 2r + 5 = 0,\ \Delta = 4 - 20 = -16 < 0 \\
& r = \frac{-2 \pm \sqrt{-16}}{2} = -1 \pm 2i \quad(\alpha = -1,\ \beta = 2) \\
\text{Tổng quát: } & y = e^{-x}\big(C_1\cos 2x + C_2\sin 2x\big) \\
y' &= e^{-x}\big[(-C_1 + 2C_2)\cos 2x + (-C_2 - 2C_1)\sin 2x\big] \\
\text{Đầu: } & y(0) = C_1 = 2 \\
       & y'(0) = -C_1 + 2C_2 = 0 \Rightarrow C_2 = 1 \\
& \boxed{y = e^{-x}\big(2\cos 2x + \sin 2x\big)}
\end{aligned}$$

Verify: $y(0) = e^0(2\cdot 1 + 0) = 2$ ✓. $\alpha = -1 < 0$ → biên độ $\sim e^{-x}$ tắt dần; $\beta = 2$ → dao động với tần số góc 2. Đây là "dao động tắt dần (damped oscillation)" — lò xo có ma sát, chuông ngừng ngân.

Dao động tắt dần ($e^{-x}$ bao ngoài, sin/cos lượn trong):

<svg viewBox="0 0 560 275" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Dao động tắt dần: đường lượn cos bị bao bởi hai đường ±e⁻ᵃˣ co dần về 0">
  <defs><marker id="ar21" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="160.0" y1="260.0" x2="160.0" y2="30.0"/>
<line x1="270.0" y1="260.0" x2="270.0" y2="30.0"/>
<line x1="380.0" y1="260.0" x2="380.0" y2="30.0"/>
<line x1="490.0" y1="260.0" x2="490.0" y2="30.0"/>
<line x1="50.0" y1="250.0" x2="517.5" y2="250.0"/>
<line x1="50.0" y1="200.0" x2="517.5" y2="200.0"/>
<line x1="50.0" y1="100.0" x2="517.5" y2="100.0"/>
<line x1="50.0" y1="50.0" x2="517.5" y2="50.0"/>
</g>
  <line x1="44.0" y1="150.0" x2="539.5" y2="150.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar21)"/>
  <line x1="50.0" y1="266.0" x2="50.0" y2="8.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar21)"/>
  <text x="531.5" y="166.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="58.0" y="18.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="160.0" y1="146.0" x2="160.0" y2="154.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="160.0" y="166.0" fill="#475569" font-size="11" text-anchor="middle">2</text>
  <line x1="270.0" y1="146.0" x2="270.0" y2="154.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="270.0" y="166.0" fill="#475569" font-size="11" text-anchor="middle">4</text>
  <line x1="380.0" y1="146.0" x2="380.0" y2="154.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="380.0" y="166.0" fill="#475569" font-size="11" text-anchor="middle">6</text>
  <line x1="490.0" y1="146.0" x2="490.0" y2="154.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="490.0" y="166.0" fill="#475569" font-size="11" text-anchor="middle">8</text>
  <line x1="46.0" y1="250.0" x2="54.0" y2="250.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="43.0" y="254.0" fill="#475569" font-size="11" text-anchor="end">−2</text>
  <line x1="46.0" y1="200.0" x2="54.0" y2="200.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="43.0" y="204.0" fill="#475569" font-size="11" text-anchor="end">−1</text>
  <line x1="46.0" y1="100.0" x2="54.0" y2="100.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="43.0" y="104.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="46.0" y1="50.0" x2="54.0" y2="50.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="43.0" y="54.0" fill="#475569" font-size="11" text-anchor="end">2</text>
  <path d="M 50.0,50.0 L 57.6,55.4 L 65.2,60.5 L 72.8,65.3 L 80.4,69.9 L 88.0,74.2 L 95.7,78.3 L 103.3,82.1 L 110.9,85.8 L 118.5,89.2 L 126.1,92.5 L 133.7,95.6 L 141.3,98.5 L 148.9,101.3 L 156.5,103.9 L 164.1,106.4 L 171.7,108.7 L 179.3,111.0 L 187.0,113.1 L 194.6,115.1 L 202.2,116.9 L 209.8,118.7 L 217.4,120.4 L 225.0,122.0 L 232.6,123.5 L 240.2,124.9 L 247.8,126.3 L 255.4,127.6 L 263.0,128.8 L 270.6,129.9 L 278.2,131.0 L 285.9,132.0 L 293.5,133.0 L 301.1,133.9 L 308.7,134.8 L 316.3,135.6 L 323.9,136.4 L 331.5,137.1 L 339.1,137.8 L 346.7,138.4 L 354.3,139.1 L 361.9,139.7 L 369.6,140.2 L 377.2,140.7 L 384.8,141.2 L 392.4,141.7 L 400.0,142.2 L 407.6,142.6 L 415.2,143.0 L 422.8,143.4 L 430.4,143.7 L 438.0,144.1 L 445.6,144.4 L 453.2,144.7 L 460.9,145.0 L 468.5,145.2 L 476.1,145.5 L 483.7,145.7 L 491.3,146.0 L 498.9,146.2 L 506.5,146.4" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linejoin="round" stroke-dasharray="6 4"/>
  <path d="M 50.0,250.0 L 57.6,244.6 L 65.2,239.5 L 72.8,234.7 L 80.4,230.1 L 88.0,225.8 L 95.7,221.7 L 103.3,217.9 L 110.9,214.2 L 118.5,210.8 L 126.1,207.5 L 133.7,204.4 L 141.3,201.5 L 148.9,198.7 L 156.5,196.1 L 164.1,193.6 L 171.7,191.3 L 179.3,189.0 L 187.0,186.9 L 194.6,184.9 L 202.2,183.1 L 209.8,181.3 L 217.4,179.6 L 225.0,178.0 L 232.6,176.5 L 240.2,175.1 L 247.8,173.7 L 255.4,172.4 L 263.0,171.2 L 270.6,170.1 L 278.2,169.0 L 285.9,168.0 L 293.5,167.0 L 301.1,166.1 L 308.7,165.2 L 316.3,164.4 L 323.9,163.6 L 331.5,162.9 L 339.1,162.2 L 346.7,161.6 L 354.3,160.9 L 361.9,160.3 L 369.6,159.8 L 377.2,159.3 L 384.8,158.8 L 392.4,158.3 L 400.0,157.8 L 407.6,157.4 L 415.2,157.0 L 422.8,156.6 L 430.4,156.3 L 438.0,155.9 L 445.6,155.6 L 453.2,155.3 L 460.9,155.0 L 468.5,154.8 L 476.1,154.5 L 483.7,154.3 L 491.3,154.0 L 498.9,153.8 L 506.5,153.6" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linejoin="round" stroke-dasharray="6 4"/>
  <path d="M 50.0,50.0 L 52.3,52.1 L 54.6,54.9 L 56.8,58.4 L 59.1,62.6 L 61.4,67.4 L 63.7,72.7 L 66.0,78.5 L 68.3,84.8 L 70.5,91.4 L 72.8,98.2 L 75.1,105.3 L 77.4,112.5 L 79.7,119.8 L 82.0,127.1 L 84.2,134.4 L 86.5,141.6 L 88.8,148.6 L 91.1,155.4 L 93.4,161.9 L 95.7,168.1 L 97.9,174.0 L 100.2,179.4 L 102.5,184.5 L 104.8,189.0 L 107.1,193.1 L 109.3,196.7 L 111.6,199.8 L 113.9,202.4 L 116.2,204.4 L 118.5,205.9 L 120.8,206.9 L 123.0,207.4 L 125.3,207.3 L 127.6,206.8 L 129.9,205.9 L 132.2,204.4 L 134.5,202.6 L 136.7,200.4 L 139.0,197.8 L 141.3,194.9 L 143.6,191.7 L 145.9,188.3 L 148.1,184.7 L 150.4,180.9 L 152.7,176.9 L 155.0,172.9 L 157.3,168.7 L 159.6,164.6 L 161.8,160.5 L 164.1,156.4 L 166.4,152.4 L 168.7,148.5 L 171.0,144.8 L 173.3,141.2 L 175.5,137.8 L 177.8,134.6 L 180.1,131.7 L 182.4,129.0 L 184.7,126.6 L 187.0,124.4 L 189.2,122.5 L 191.5,121.0 L 193.8,119.7 L 196.1,118.7 L 198.4,118.1 L 200.6,117.7 L 202.9,117.6 L 205.2,117.7 L 207.5,118.2 L 209.8,118.9 L 212.1,119.8 L 214.3,121.0 L 216.6,122.4 L 218.9,123.9 L 221.2,125.7 L 223.5,127.6 L 225.8,129.6 L 228.0,131.7 L 230.3,133.9 L 232.6,136.1 L 234.9,138.5 L 237.2,140.8 L 239.4,143.1 L 241.7,145.4 L 244.0,147.7 L 246.3,149.9 L 248.6,152.1 L 250.9,154.2 L 253.1,156.1 L 255.4,158.0 L 257.7,159.7 L 260.0,161.3 L 262.3,162.7 L 264.6,164.0 L 266.8,165.1 L 269.1,166.1 L 271.4,166.8 L 273.7,167.5 L 276.0,167.9 L 278.2,168.2 L 280.5,168.3 L 282.8,168.3 L 285.1,168.1 L 287.4,167.7 L 289.7,167.3 L 291.9,166.7 L 294.2,165.9 L 296.5,165.1 L 298.8,164.2 L 301.1,163.1 L 303.4,162.0 L 305.6,160.8 L 307.9,159.6 L 310.2,158.4 L 312.5,157.1 L 314.8,155.7 L 317.1,154.4 L 319.3,153.1 L 321.6,151.8 L 323.9,150.5 L 326.2,149.3 L 328.5,148.1 L 330.7,147.0 L 333.0,145.9 L 335.3,144.9 L 337.6,144.0 L 339.9,143.1 L 342.2,142.4 L 344.4,141.7 L 346.7,141.1 L 349.0,140.7 L 351.3,140.3 L 353.6,140.0 L 355.9,139.8 L 358.1,139.7 L 360.4,139.7 L 362.7,139.7 L 365.0,139.9 L 367.3,140.1 L 369.5,140.4 L 371.8,140.8 L 374.1,141.3 L 376.4,141.8 L 378.7,142.3 L 381.0,143.0 L 383.2,143.6 L 385.5,144.3 L 387.8,145.0 L 390.1,145.7 L 392.4,146.5 L 394.7,147.2 L 396.9,147.9 L 399.2,148.7 L 401.5,149.4 L 403.8,150.1 L 406.1,150.8 L 408.4,151.4 L 410.6,152.1 L 412.9,152.6 L 415.2,153.2 L 417.5,153.7 L 419.8,154.1 L 422.0,154.5 L 424.3,154.9 L 426.6,155.2 L 428.9,155.4 L 431.2,155.6 L 433.5,155.7 L 435.7,155.8 L 438.0,155.8 L 440.3,155.8 L 442.6,155.8 L 444.9,155.6 L 447.2,155.5 L 449.4,155.3 L 451.7,155.0 L 454.0,154.8 L 456.3,154.5 L 458.6,154.1 L 460.9,153.8 L 463.1,153.4 L 465.4,153.0 L 467.7,152.6 L 470.0,152.2 L 472.3,151.8 L 474.5,151.3 L 476.8,150.9 L 479.1,150.5 L 481.4,150.1 L 483.7,149.7 L 486.0,149.3 L 488.2,149.0 L 490.5,148.6 L 492.8,148.3 L 495.1,148.0 L 497.4,147.8 L 499.7,147.5 L 501.9,147.3 L 504.2,147.1 L 506.5,147.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="215.0" y="111.9" fill="#94a3b8" font-size="11" text-anchor="middle">envelope +e⁻ᵃˣ</text>
  <text x="215.0" y="196.1" fill="#94a3b8" font-size="11" text-anchor="middle">envelope −e⁻ᵃˣ</text>
  <text x="352.5" y="70.0" fill="#1d4ed8" font-size="12" text-anchor="start" font-weight="700">dao động vẫn, biên độ co dần → tắt về 0</text>
</svg>

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao nghiệm phức lại cho dao động (cos, sin)?"* Vì $e^{i\beta x} = \cos\beta x + i\sin\beta x$ (Euler, Lesson 06). Nghiệm mũ phức "biến" thành dao động thực. Phần thực $\alpha$ của nghiệm cho biên độ tăng/tắt ($e^{\alpha x}$).
- *"Vì sao bậc 2 cần 2 hằng số $C_1, C_2$?"* Vì cần 2 điều kiện đầu (vd $y(0)$ và $y'(0)$) — như ném vật cần biết vị trí và vận tốc ban đầu.
- *"Vì sao được phép cộng hai nghiệm lại ($C_1 y_1 + C_2 y_2$)?"* Vì PT **tuyến tính thuần nhất** có **nguyên lý chồng chất (superposition)**: nếu $y_1$ và $y_2$ đều là nghiệm thì mọi tổ hợp $C_1 y_1 + C_2 y_2$ cũng là nghiệm. Kiểm: thay vào $L[y] = y'' + ay' + by$, vì đạo hàm tuyến tính nên $L[C_1 y_1 + C_2 y_2] = C_1 L[y_1] + C_2 L[y_2] = C_1\cdot 0 + C_2\cdot 0 = 0$ ✓. Đây là vì sao chỉ cần tìm 2 nghiệm cơ sở độc lập là đủ phủ toàn bộ. Lưu ý: nguyên lý này **không** áp dụng cho PT phi tuyến (vd $(y')^2 = y$).

⚠ **Lỗi thường gặp — dùng nhầm công thức nghiệm khi $\Delta = 0$**. Nghiệm kép KHÔNG phải $y = C_1 e^{rx} + C_2 e^{rx}$ (gộp thành 1 hằng số, mất nghiệm). Phải có **nhân $x$**: $y = (C_1 + C_2\cdot x)e^{rx}$. Phản ví dụ: $y''-4y'+4y=0$, nếu viết $y = Ce^{2x}$ thì chỉ 1 hằng số, không đủ cho bài toán 2 điều kiện đầu.

🔁 **Dừng lại tự kiểm tra**

1. Giải $y'' - 5y' + 6y = 0$.
2. Phân loại 3 trường hợp $\Delta$ cho: a) $y'' + 6y' + 9y = 0$; b) $y'' + y = 0$.
3. Giải $y'' - 2y' + y = 0$ với $y(0) = 1$, $y'(0) = 3$.

<details><summary>Đáp án</summary>

1. $r^2 - 5r + 6 = 0 \to r = 2, 3$ ($\Delta = 1 > 0$) $\to y = \mathbf{C_1 e^{2x} + C_2 e^{3x}}$.
2. a) $r^2 + 6r + 9 = (r+3)^2 = 0 \to r = -3$ kép ($\Delta = 0$) $\to y = (C_1 + C_2 x)e^{-3x}$. b) $r^2 + 1 = 0 \to r = \pm i$ ($\Delta < 0$, $\alpha = 0$) $\to y = C_1\cos x + C_2\sin x$ (dao động không tắt).
3. $r^2 - 2r + 1 = (r-1)^2 = 0 \to r = 1$ kép $\to y = (C_1 + C_2 x)e^x$. $y(0) = C_1 = 1$; $y' = (C_1 + C_2 + C_2 x)e^x$, $y'(0) = C_1 + C_2 = 3 \to C_2 = 2 \to \mathbf{y = (1 + 2x)e^x}$.

</details>

### 4.3. Bài toán giá trị đầu (Initial Value Problem) — nghiệm tổng quát vs nghiệm riêng

💡 **Trực giác**: nghiệm tổng quát là **cả họ** đường cong (chứa hằng số tự do); điều kiện đầu chọn ra **đúng một** đường đi qua điểm/trạng thái cho trước. Bậc $n$ → $n$ hằng số → cần $n$ điều kiện. Như ném một vật: biết luật $a = -g$ chưa đủ để biết quỹ đạo — phải biết thêm **vị trí đầu** $s(0)$ và **vận tốc đầu** $s'(0)$.

| | Cần bao nhiêu điều kiện | Điển hình |
|---|---|---|
| ODE bậc 1 | 1 ($y(x_0) = y_0$) | $y' = ky,\ y(0) = N_0$ |
| ODE bậc 2 | 2 ($y(x_0)$ và $y'(x_0)$) | $y'' + \omega^2 y = 0,\ y(0),\ y'(0)$ |

Họ nghiệm $y = Ce^x$ (mỗi $C$ một đường), điều kiện $y(0)=1$ chọn đúng đường $C=1$:

<svg viewBox="0 0 440 292" style="max-width:440px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Họ nghiệm y = Ceˣ với C = 0, 0.5, 1, 2; điều kiện y(0) = 1 chọn đúng đường C = 1">
  <defs><marker id="ar22" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="150.0" y1="220.0" x2="150.0" y2="34.4"/>
<line x1="240.0" y1="220.0" x2="240.0" y2="34.4"/>
<line x1="60.0" y1="188.0" x2="249.0" y2="188.0"/>
<line x1="60.0" y1="156.0" x2="249.0" y2="156.0"/>
<line x1="60.0" y1="124.0" x2="249.0" y2="124.0"/>
<line x1="60.0" y1="92.0" x2="249.0" y2="92.0"/>
<line x1="60.0" y1="60.0" x2="249.0" y2="60.0"/>
</g>
  <line x1="54.0" y1="220.0" x2="271.0" y2="220.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar22)"/>
  <line x1="60.0" y1="226.0" x2="60.0" y2="12.4" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar22)"/>
  <text x="263.0" y="236.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x</text>
  <text x="68.0" y="22.4" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y</text>
  <line x1="150.0" y1="216.0" x2="150.0" y2="224.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="150.0" y="236.0" fill="#475569" font-size="11" text-anchor="middle">1</text>
  <line x1="240.0" y1="216.0" x2="240.0" y2="224.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="240.0" y="236.0" fill="#475569" font-size="11" text-anchor="middle">2</text>
  <line x1="56.0" y1="188.0" x2="64.0" y2="188.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="192.0" fill="#475569" font-size="11" text-anchor="end">1</text>
  <line x1="56.0" y1="156.0" x2="64.0" y2="156.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="160.0" fill="#475569" font-size="11" text-anchor="end">2</text>
  <line x1="56.0" y1="124.0" x2="64.0" y2="124.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="128.0" fill="#475569" font-size="11" text-anchor="end">3</text>
  <line x1="56.0" y1="92.0" x2="64.0" y2="92.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="96.0" fill="#475569" font-size="11" text-anchor="end">4</text>
  <line x1="56.0" y1="60.0" x2="64.0" y2="60.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="64.0" fill="#475569" font-size="11" text-anchor="end">5</text>
  <path d="M 60.0,156.0 L 62.3,154.3 L 64.6,152.6 L 66.9,150.9 L 69.3,149.1 L 71.6,147.2 L 73.9,145.3 L 76.2,143.4 L 78.5,141.4 L 80.8,139.3 L 83.2,137.2 L 85.5,135.1 L 87.8,132.8 L 90.1,130.6 L 92.4,128.2 L 94.7,125.8 L 97.1,123.4 L 99.4,120.9 L 101.7,118.3 L 104.0,115.6 L 106.3,112.9 L 108.6,110.1 L 111.0,107.2 L 113.3,104.3 L 115.6,101.3 L 117.9,98.2 L 120.2,95.0 L 122.5,91.8 L 124.9,88.4 L 127.2,85.0 L 129.5,81.5 L 131.8,77.9 L 134.1,74.2 L 136.4,70.3 L 138.8,66.4 L 141.1,62.4 L 143.4,58.3 L 145.7,54.1 L 148.0,49.8 L 150.3,45.4 L 152.7,40.8" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linejoin="round"/>
  <text x="158.7" y="44.8" fill="#94a3b8" font-size="12" text-anchor="start">C = 2</text>
  <path d="M 60.0,188.0 L 63.9,186.6 L 67.8,185.1 L 71.6,183.6 L 75.5,182.0 L 79.4,180.3 L 83.3,178.6 L 87.1,176.7 L 91.0,174.8 L 94.9,172.8 L 98.8,170.8 L 102.6,168.6 L 106.5,166.3 L 110.4,164.0 L 114.3,161.5 L 118.1,158.9 L 122.0,156.3 L 125.9,153.5 L 129.8,150.5 L 133.6,147.5 L 137.5,144.3 L 141.4,140.9 L 145.3,137.5 L 149.2,133.8 L 153.0,130.0 L 156.9,126.1 L 160.8,121.9 L 164.7,117.6 L 168.5,113.1 L 172.4,108.4 L 176.3,103.5 L 180.2,98.4 L 184.0,93.0 L 187.9,87.4 L 191.8,81.6 L 195.7,75.5 L 199.5,69.2 L 203.4,62.5 L 207.3,55.6 L 211.2,48.4 L 215.0,40.8" fill="none" stroke="#dc2626" stroke-width="3" stroke-linejoin="round"/>
  <text x="221.0" y="44.8" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">C = 1</text>
  <path d="M 60.0,204.0 L 64.6,203.2 L 69.2,202.3 L 73.8,201.3 L 78.5,200.4 L 83.1,199.3 L 87.7,198.2 L 92.3,197.1 L 96.9,195.9 L 101.5,194.6 L 106.1,193.3 L 110.7,191.9 L 115.3,190.4 L 120.0,188.8 L 124.6,187.2 L 129.2,185.5 L 133.8,183.7 L 138.4,181.8 L 143.0,179.8 L 147.6,177.6 L 152.2,175.4 L 156.9,173.1 L 161.5,170.6 L 166.1,168.0 L 170.7,165.3 L 175.3,162.4 L 179.9,159.4 L 184.5,156.2 L 189.1,152.8 L 193.8,149.3 L 198.4,145.6 L 203.0,141.6 L 207.6,137.5 L 212.2,133.2 L 216.8,128.6 L 221.4,123.8 L 226.1,118.8 L 230.7,113.4 L 235.3,107.8 L 239.9,101.9 L 244.5,95.7" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linejoin="round"/>
  <text x="250.5" y="99.7" fill="#94a3b8" font-size="12" text-anchor="start">C = 0.5</text>
  <path d="M 60.0,220.0 L 64.6,220.0 L 69.2,220.0 L 73.8,220.0 L 78.5,220.0 L 83.1,220.0 L 87.7,220.0 L 92.3,220.0 L 96.9,220.0 L 101.5,220.0 L 106.1,220.0 L 110.7,220.0 L 115.3,220.0 L 120.0,220.0 L 124.6,220.0 L 129.2,220.0 L 133.8,220.0 L 138.4,220.0 L 143.0,220.0 L 147.6,220.0 L 152.2,220.0 L 156.9,220.0 L 161.5,220.0 L 166.1,220.0 L 170.7,220.0 L 175.3,220.0 L 179.9,220.0 L 184.5,220.0 L 189.1,220.0 L 193.8,220.0 L 198.4,220.0 L 203.0,220.0 L 207.6,220.0 L 212.2,220.0 L 216.8,220.0 L 221.4,220.0 L 226.1,220.0 L 230.7,220.0 L 235.3,220.0 L 239.9,220.0 L 244.5,220.0" fill="none" stroke="#1a202c" stroke-width="1.5" stroke-linejoin="round"/>
  <text x="204.0" y="250.0" fill="#1a202c" font-size="12" text-anchor="end">C = 0 (trục Ox)</text>
  <circle cx="60.0" cy="188.0" r="6" fill="#dc2626"/>
  <text x="70.0" y="206.0" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">y(0) = 1 → chốt C = 1</text>
  <text x="220.0" y="280.0" fill="#475569" font-size="12" text-anchor="middle">họ y = Ceˣ: cả họ 'song song'; 1 điểm đầu → 1 đường duy nhất</text>
</svg>

⚠ **Lỗi thường gặp — áp điều kiện $y'(0)$ vào $y$ thay vì vào $y'$**. Với bậc 2, điều kiện thứ hai là về **đạo hàm** $y'(x_0)$ — phải lấy đạo hàm nghiệm tổng quát trước rồi mới thay. Phản ví dụ: $y = C_1\cos 2x + C_2\sin 2x$, $y'(0) = 4$. Sai: thay $x=0$ vào $y$ ra $C_1$. Đúng: $y' = -2C_1\sin 2x + 2C_2\cos 2x$, $y'(0) = 2C_2 = 4 \to C_2 = 2$.

🔁 **Dừng lại tự kiểm tra**

1. $y'' + 4y = 0$, $y(0) = 0$, $y'(0) = 6$. Tìm nghiệm.

<details><summary>Đáp án</summary>

Tổng quát $y = C_1\cos 2x + C_2\sin 2x$. $y(0) = C_1 = 0$. $y' = -2C_1\sin 2x + 2C_2\cos 2x$, $y'(0) = 2C_2 = 6 \to C_2 = 3 \to \mathbf{y = 3\sin 2x}$.

</details>

### 📝 Tóm tắt mục 4

- Đoán $y = e^{rx}$ → $e^{rx}(r^2 + ar + b) = 0$ → PT đặc trưng $r^2 + ar + b = 0$.
- $\Delta > 0$: $C_1 e^{r_1 x}+C_2 e^{r_2 x}$ (tắt/tăng không dao động); $\Delta = 0$: $(C_1+C_2 x)e^{rx}$ (nhớ nhân $x$); $\Delta < 0$: $e^{\alpha x}(C_1\cos\beta x + C_2\sin\beta x)$ → dao động ($\alpha < 0$ tắt dần, $\alpha = 0$ điều hòa thuần).
- Bậc 2 → 2 hằng số → cần 2 điều kiện đầu; điều kiện $y'(x_0)$ áp vào $y'$ (đạo hàm trước, thay sau).

---

## 5. Ví dụ — Con lắc đơn (linearized)

💡 **Trực giác / Hình dung**: con lắc nhỏ là TH3 ($\Delta < 0$) điển hình — không có ma sát nên $\alpha = 0$ (biên độ không tắt), nghiệm thuần dao động cos/sin với tần số $\omega = \sqrt{g/L}$. Đây là vì sao đồng hồ quả lắc giữ nhịp đều.

$$m\cdot\theta'' + \frac{mg}{L}\cdot\theta = 0 \quad\to\quad \theta'' + \frac{g}{L}\cdot\theta = 0$$

PT đặc trưng: $r^2 + g/L = 0 \to r = \pm i\cdot\sqrt{g/L} = \pm i\omega$.

Nghiệm: $\mathbf{\theta(t) = C_1\cos(\omega t) + C_2\sin(\omega t)} = A\cos(\omega t + \varphi)$.

→ Dao động điều hòa, chu kỳ $T = \frac{2\pi}{\omega} = 2\pi\sqrt{L/g}$.

(Đã gặp ở [T3 L08](../../03-Trig-Complex/lesson-08-trig-applications/) — dao động điều hòa.)

### 5.1. Ba trường hợp $\Delta$ = ba "tính cách" vật lý của hệ dao động

💡 **Trực giác**: lò xo + vật + giảm chấn (damper) cho PT $m s'' + c s' + k s = 0$ ($c$ = hệ số ma sát/giảm chấn). Ba trường hợp $\Delta$ của PT đặc trưng **chính là** ba hành vi vật lý quan sát được — toán và vật lý khớp 1-1:

| $\Delta$ | Tên vật lý | Nghiệm | Hình ảnh đời thực |
|---|---|---|---|
| $\Delta < 0$ (ma sát yếu) | **dao động tắt dần (underdamped)** | $e^{\alpha t}(C_1\cos\beta t + C_2\sin\beta t)$, $\alpha<0$ | chuông ngân nhỏ dần, xích đu đẩy một lần |
| $\Delta = 0$ (ma sát "vừa khít") | **tới hạn (critically damped)** | $(C_1 + C_2 t)e^{rt}$ | cửa tự đóng êm, kim đồng hồ không nảy |
| $\Delta > 0$ (ma sát mạnh) | **quá tắt (overdamped)** | $C_1 e^{r_1 t} + C_2 e^{r_2 t}$, $r_{1,2}<0$ | piston cửa nặng, về vị trí chậm, không vọt qua |
| $\Delta < 0$, $c = 0$ ($\alpha = 0$) | **điều hòa thuần** | $C_1\cos\beta t + C_2\sin\beta t$ | con lắc lý tưởng, không ma sát (như mục 5) |

❓ **Vì sao "tới hạn" lại đáng giá nhất trong kỹ thuật?** Vì nó là ranh giới: về vị trí cân bằng **nhanh nhất có thể mà không vọt quá (overshoot)**. Bộ giảm chấn ô tô, cơ cấu đóng cửa, kim đồng hồ analog đều thiết kế quanh "tới hạn" — nếu underdamped thì rung lắc, nếu overdamped thì ì chậm.

---

## 6. Ví dụ — Mạch RC

💡 **Trực giác / Hình dung**: tụ điện nạp như đổ nước vào bình qua ống hẹp — lúc đầu nhanh (chênh lệch lớn), càng đầy càng chậm, tiệm cận giá trị tối đa $C\cdot V$. "Thời hằng" $\tau = RC$ đo tốc độ nạp: sau $\tau$ giây nạp được $\sim 63\%$, sau $5\tau$ coi như đầy.

PT: $R\cdot\frac{dq}{dt} + \frac{q}{C} = V$ (nguồn không đổi).

**Giải bằng thừa số tích phân** (đây là tuyến tính bậc 1 — đúng phương pháp mục 3, $q(0) = 0$):

$$\begin{aligned}
\text{Chuẩn dạng (chia } R): \ & q' + \frac{1}{RC}q = \frac{V}{R} \;\Rightarrow\; P = \frac{1}{RC},\ Q = \frac{V}{R} \\
\mu &= e^{\int \frac{1}{RC}\,dt} = e^{t/(RC)} \\
\big(e^{t/(RC)}q\big)' &= \frac{V}{R}\,e^{t/(RC)} \\
e^{t/(RC)}q &= \frac{V}{R}\cdot RC\,e^{t/(RC)} + K = CV\,e^{t/(RC)} + K \\
q &= CV + K e^{-t/(RC)} \\
q(0) = 0 \Rightarrow K = -CV \;\Rightarrow\; & \boxed{q(t) = CV\big(1 - e^{-t/(RC)}\big)}
\end{aligned}$$

- → Tụ nạp đến giá trị $C\cdot V$ theo hàm mũ. Thời hằng $\tau = RC$.

**Verify bằng số** ($R = 1$kΩ, $C = 1$mF $\to \tau = RC = 1$s, $V = 5$V, $q_{\max} = CV = 5$mC):
- $t = 0$: $q = 5\cdot(1 - e^0) = 5\cdot 0 = 0$ (tụ rỗng ban đầu) ✓.
- $t = \tau = 1$s: $q = 5\cdot(1 - e^{-1}) = 5\cdot 0.632 = \mathbf{3.16}$ mC ($\sim 63\%$).
- $t \to \infty$: $q \to 5\cdot(1 - 0) = 5$ mC (nạp đầy) ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tụ không nạp đầy ngay lập tức?"* Vì điện trở $R$ cản dòng. $R$ lớn → ống hẹp → nạp chậm ($\tau = RC$ lớn).
- *"$\tau = RC$ có ý nghĩa thực tế gì?"* Là "đồng hồ" của mạch: thiết kế bộ định thời, lọc tín hiệu đều dựa $\tau$. Sau $5\tau$ tụ coi như đầy ($>99\%$).

⚠ **Lỗi thường gặp — nhầm dấu trong hàm mũ nạp/xả**. Nạp: $q = CV(1 - e^{-t/\tau})$ (tăng từ 0). Xả: $q = q_0\cdot e^{-t/\tau}$ (giảm về 0). Lẫn 2 công thức → mô tả sai chiều biến thiên.

### 6.1. Xả tụ — walk-through ngược chiều

Khi ngắt nguồn ($V = 0$), tụ đã nạp $q_0$ sẽ xả qua $R$: $R\frac{dq}{dt} + \frac{q}{C} = 0$. Đây là **tách biến** (cũng là tuyến tính thuần nhất):

$$\begin{aligned}
\frac{dq}{q} &= -\frac{1}{RC}\,dt \\
\ln|q| &= -\frac{t}{RC} + C' \\
q(t) &= q_0\,e^{-t/(RC)} \quad (q(0) = q_0)
\end{aligned}$$

Verify ($q_0 = 5$ mC, $\tau = 1$s): $t = 0 \to q = 5$ mC ✓; $t = 1 \to q = 5e^{-1} = 1.84$ mC (còn $\sim 37\%$); $t = 5\tau \to q = 5e^{-5} = 0.034$ mC ($< 1\%$, coi như xả hết). Nạp leo lên $CV$, xả tụt về 0 — **đối xứng gương** qua đường $q = CV/2\cdot(\ldots)$, cùng một $\tau$.

❓ **Vì sao nạp và xả cùng thời hằng $\tau = RC$?** Vì cả hai đều do **cùng** mạch $R$–$C$ điều khiển: $\tau$ là đặc trưng của linh kiện, không phụ thuộc chiều dòng. Đổi $V$ chỉ đổi mức bão hòa $CV$, không đổi tốc độ tiến tới nó.

🔁 **Dừng lại tự kiểm tra**

1. Mạch RC có $\tau = 2$s, $V = 10$V, $C = 1$mF. Tính $q$ tại $t = 2$s.
2. Tụ nạp đầy $q_0 = 8$ mC, $\tau = 4$s, bắt đầu xả. Còn bao nhiêu sau $4$s?

<details><summary>Đáp án</summary>

1. $q_{\max} = CV = 10$ mC. $q(2) = 10\cdot(1 - e^{-2/2}) = 10\cdot(1 - e^{-1}) = 10\cdot 0.632 = \mathbf{6.32}$ mC.
2. Xả: $q(t) = 8e^{-t/4}$. $q(4) = 8e^{-1} = 8\cdot 0.368 = \mathbf{2.94}$ mC ($\sim 37\%$).

</details>

### 📝 Tóm tắt mục 6

- Mạch RC = ODE bậc 1 tuyến tính: $q(t) = CV(1 - e^{-t/\tau})$, nạp đầy dần.
- Thời hằng $\tau = RC$: sau $\tau$ nạp $\sim 63\%$, sau $5\tau$ coi như đầy.
- Nạp: $(1 - e^{-t/\tau})$ tăng từ 0 đến $CV$; xả: $q_0 e^{-t/\tau}$ giảm về 0 — cùng $\tau$, đừng nhầm dấu.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Giải $y' = 3x^2$.

**Bài 2**: Giải $y' = -y$ với $y(0) = 5$.

**Bài 3**: Giải $y'' + 4y = 0$.

**Bài 4**: PT phân rã phóng xạ $\frac{dN}{dt} = -\lambda N$ với chu kỳ bán rã $T_{1/2} = 5730$ năm (C-14). Tìm $\lambda$.

**Bài 5**: Giải $y' + y = e^x$ với $y(0) = 1$.

**Bài 6** (làm nguội Newton): Một thanh kim loại $200°$C đặt trong phòng $20°$C, sau 10 phút còn $120°$C. a) Tìm $k$. b) Sau 30 phút nhiệt độ là bao nhiêu?

**Bài 7** (logistic): Đàn cá hồ có sức chứa $K = 5000$, $r = 0.4$/năm, ban đầu $N_0 = 500$. Viết $N(t)$ và tính $N$ khi $t \to \infty$.

**Bài 8** (tuyến tính, chuẩn dạng): Giải $xy' - y = x^2$ ($x > 0$).

**Bài 9** (bậc 2, $\Delta < 0$ + IVP): Giải $y'' + 9y = 0$ với $y(0) = 1$, $y'(0) = 6$.

**Bài 10** (bậc 2, $\Delta = 0$ + IVP): Giải $y'' + 4y' + 4y = 0$ với $y(0) = 1$, $y'(0) = 1$.

### Lời giải

**Bài 1**: $y = \int 3x^2\,dx = \mathbf{x^3 + C}$.

**Bài 2**: $\frac{dy}{y} = -dx \to \ln y = -x + C \to y = A\cdot e^{-x}$. $y(0) = A = 5$. → $\mathbf{y = 5\cdot e^{-x}}$.

**Bài 3**: $r^2 + 4 = 0 \to r = \pm 2i$. → $\mathbf{y = C_1\cos(2x) + C_2\sin(2x)}$.

**Bài 4**: $N(t) = N_0\cdot e^{-\lambda t}$. $N(T_{1/2}) = N_0/2 \to e^{-\lambda T} = 1/2 \to \lambda T = \ln 2 \to \mathbf{\lambda = \dfrac{\ln 2}{5730} \approx 1.21\cdot 10^{-4}}$ /năm.

**Bài 5**: $\mu = e^x$. $e^x\cdot y = \int e^x\cdot e^x\,dx = \frac{e^{2x}}{2} + C \to y = \frac{e^x}{2} + C\cdot e^{-x}$. $y(0) = \frac{1}{2} + C = 1 \to C = \frac{1}{2}$. → $\mathbf{y = \dfrac{e^x + e^{-x}}{2} = \cosh x}$.

**Bài 6**: Công thức nguội Newton $T(t) = T_s + (T_0 - T_s)e^{-kt} = 20 + 180e^{-kt}$.
- a) $T(10) = 20 + 180e^{-10k} = 120 \to e^{-10k} = \frac{100}{180} = 0.556 \to -10k = \ln 0.556 = -0.588 \to \mathbf{k \approx 0.0588}$/phút.
- b) $T(30) = 20 + 180e^{-0.0588\cdot 30} = 20 + 180e^{-1.764} = 20 + 180\cdot 0.171 = 20 + 30.8 = \mathbf{50.8°}$C.

**Bài 7**: Công thức logistic (Walk-through B): $N(t) = \dfrac{K}{1 + \left(\frac{K-N_0}{N_0}\right)e^{-rt}}$. Với $K=5000$, $N_0 = 500$: $\frac{K-N_0}{N_0} = \frac{4500}{500} = 9$. → $\mathbf{N(t) = \dfrac{5000}{1 + 9e^{-0.4t}}}$. Khi $t\to\infty$: $e^{-0.4t}\to 0 \to N \to \dfrac{5000}{1} = \mathbf{5000} = K$ (chạm sức chứa).

**Bài 8**: Chuẩn dạng — chia cho $x$: $y' - \frac{1}{x}y = x$. $P = -\frac{1}{x} \to \mu = e^{\int -\frac{1}{x}dx} = e^{-\ln x} = \frac{1}{x}$. $\left(\frac{1}{x}y\right)' = \frac{1}{x}\cdot x = 1 \to \frac{y}{x} = \int 1\,dx = x + C \to \mathbf{y = x^2 + Cx}$. Verify ($C=0$): $y = x^2$, $xy' - y = 2x^2 - x^2 = x^2$ ✓.

**Bài 9**: $r^2 + 9 = 0 \to r = \pm 3i$ ($\alpha = 0$, $\beta = 3$). Tổng quát $y = C_1\cos 3x + C_2\sin 3x$. $y(0) = C_1 = 1$. $y' = -3C_1\sin 3x + 3C_2\cos 3x$, $y'(0) = 3C_2 = 6 \to C_2 = 2$. → $\mathbf{y = \cos 3x + 2\sin 3x}$.

**Bài 10**: $r^2 + 4r + 4 = (r+2)^2 = 0 \to r = -2$ kép. Tổng quát $y = (C_1 + C_2 x)e^{-2x}$. $y(0) = C_1 = 1$. $y' = C_2 e^{-2x} - 2(C_1 + C_2 x)e^{-2x} = (C_2 - 2C_1 - 2C_2 x)e^{-2x}$, $y'(0) = C_2 - 2C_1 = 1 \to C_2 = 3$. → $\mathbf{y = (1 + 3x)e^{-2x}}$.

---

## 8. Bài tiếp theo

[Lesson 08 — Xác suất & thống kê](../lesson-08-probability-statistics/).

## 📝 Tổng kết

1. **ODE**: PT chứa hàm $y(x)$ + đạo hàm; nghiệm là **hàm** (cả họ, kèm hằng số). Bậc = bậc cao nhất của đạo hàm; tuyến tính = $y$ và đạo hàm chỉ bậc 1. ODE = "tốc độ thay đổi phụ thuộc trạng thái hiện tại".
2. **Trường hướng (slope field)**: $y' = F(x,y)$ cho độ dốc tại mỗi điểm; nghiệm "trôi theo" — thấy hành vi mà chưa cần công thức.
3. **Bậc 1 tách biến** (4 bước): $\frac{dy}{g(y)} = f(x)\,dx$ → tích phân. Ba mô hình: mũ, logistic (chữ S), nguội Newton. Nhớ kiểm **nghiệm hằng** $g(y)=0$.
4. **Bậc 1 tuyến tính**: chuẩn dạng $y'+Py=Q$ → thừa số tích phân $\mu = e^{\int P}$ → $(\mu y)' = \mu Q$.
5. **Bậc 2 tuyến tính hệ số hằng**: $e^{rx}(r^2+ar+b)=0$ → PT đặc trưng. 3 dạng nghiệm theo $\Delta$ ($>0$ tắt không dao động, $=0$ kép nhân $x$, $<0$ dao động).
6. **IVP**: bậc $n$ → $n$ hằng số → $n$ điều kiện. Luôn viết $+C$ **trước**, áp điều kiện đầu **sau**.
7. **Ứng dụng**: dao động (con lắc, lò xo tắt dần), phóng xạ, RC, dân số (mũ/logistic), làm nguội.
