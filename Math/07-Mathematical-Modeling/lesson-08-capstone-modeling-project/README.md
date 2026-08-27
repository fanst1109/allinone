# Lesson 08 — Capstone: dự án mô hình hóa end-to-end

## Mục tiêu

- **Phối hợp** mọi công cụ của tầng 7 (L01–L07) trên một bài toán thực.
- Đi trọn [chu trình 6 bước](../lesson-01-modeling-cycle/) một cách bài bản: từ câu hỏi → giả định → mô hình → giải → kiểm chứng → tinh chỉnh.
- Rèn kỹ năng *chọn đúng loại mô hình*, *fit tham số từ dữ liệu*, *kiểm chứng & biện luận hạn chế*.

## Kiến thức tiền đề

- Toàn bộ [Lesson 01–07](../) của tầng này.

---

## 1. Capstone là gì và làm thế nào?

💡 **Trực giác — capstone như "bữa ăn hoàn chỉnh", không phải "nếm từng nguyên liệu".** Sáu lesson trước dạy *từng công cụ* riêng lẻ: L02 dạy nếm vị "hồi quy", L04 dạy nếm vị "ODE", L06 dạy nếm vị "tối ưu". Nhưng một **bữa ăn thật** (bài toán thực tế) không bao giờ là một nguyên liệu đứng riêng — nó đòi bạn **chọn nguyên liệu phù hợp, sơ chế, nấu theo thứ tự, nêm nếm, dọn ra đĩa**. Capstone = một bài toán đủ lớn để đi trọn chu trình và chạm nhiều công cụ, đủ nhỏ để một người hoàn thành trong vài giờ.

💡 **Nhắc lại chu trình mô hình hóa 6 bước (xương sống của cả tầng — [L01](../lesson-01-modeling-cycle/)).** Mọi dự án trong bài này đều đi đúng vòng lặp này:

<svg viewBox="0 0 620 225" style="max-width:620px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Chu trình 6 bước của dự án capstone: câu hỏi → giả định → mô hình toán → giải/mô phỏng → kiểm chứng → tinh chỉnh, vòng lại giả định">
  <defs><marker id="ar11" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ar11r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker></defs>
  <rect x="30.0" y="40.0" width="160.0" height="56.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="110.0" y="65.5" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">[1] CÂU HỎI</text>
  <text x="110.0" y="80.5" fill="#475569" font-size="11" text-anchor="middle">đại lượng cần trả lời</text>
  <rect x="230.0" y="40.0" width="160.0" height="56.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="310.0" y="65.5" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">[2] GIẢ ĐỊNH</text>
  <text x="310.0" y="80.5" fill="#475569" font-size="11" text-anchor="middle">đơn giản hóa thực tế</text>
  <rect x="430.0" y="40.0" width="160.0" height="56.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="510.0" y="65.5" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">[3] MÔ HÌNH TOÁN</text>
  <text x="510.0" y="80.5" fill="#475569" font-size="11" text-anchor="middle">phương trình / hệ / tối ưu</text>
  <rect x="430.0" y="150.0" width="160.0" height="56.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="510.0" y="175.5" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">[4] GIẢI / MÔ PHỎNG</text>
  <text x="510.0" y="190.5" fill="#475569" font-size="11" text-anchor="middle">số liệu thật, bảng/đồ thị</text>
  <rect x="230.0" y="150.0" width="160.0" height="56.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="310.0" y="175.5" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">[5] KIỂM CHỨNG</text>
  <text x="310.0" y="190.5" fill="#475569" font-size="11" text-anchor="middle">so dữ liệu, giới hạn t→0,∞</text>
  <rect x="30.0" y="150.0" width="160.0" height="56.0" rx="8" fill="#fee2e2" fill-opacity="1" stroke="#dc2626" stroke-width="2"/>
  <text x="110.0" y="175.5" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">[6] TINH CHỈNH</text>
  <text x="110.0" y="190.5" fill="#475569" font-size="11" text-anchor="middle">nêu hạn chế, vòng lại B2</text>
  <line x1="190.0" y1="68.0" x2="228.0" y2="68.0" stroke="#1a202c" stroke-width="2" marker-end="url(#ar11)"/>
  <line x1="390.0" y1="68.0" x2="428.0" y2="68.0" stroke="#1a202c" stroke-width="2" marker-end="url(#ar11)"/>
  <line x1="510.0" y1="96.0" x2="510.0" y2="148.0" stroke="#1a202c" stroke-width="2" marker-end="url(#ar11)"/>
  <line x1="430.0" y1="178.0" x2="392.0" y2="178.0" stroke="#1a202c" stroke-width="2" marker-end="url(#ar11)"/>
  <line x1="230.0" y1="178.0" x2="192.0" y2="178.0" stroke="#1a202c" stroke-width="2" marker-end="url(#ar11)"/>
  <path d="M 30,178 L 12,178 L 12,20 L 110,20 L 110,38" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#ar11r)"/>
  <text x="120.0" y="16.0" fill="#dc2626" font-size="11" text-anchor="start" font-weight="700">vòng lại: kết quả chưa khớp → sửa giả định</text>
</svg>

Điểm cốt lõi mà người mới hay bỏ: **đây là VÒNG LẶP, không phải đường thẳng**. Bước 6 (nêu hạn chế) thường đẩy bạn quay lại bước 2 (sửa giả định) — vòng 2, vòng 3 cho tới khi mô hình "đủ tốt cho mục đích". Một mô hình tốt **không phải mô hình đúng tuyệt đối** (không tồn tại), mà là mô hình *đủ đơn giản để hiểu, đủ chính xác để dùng*.

💡 **Bản đồ kỹ năng theo từng lesson — capstone gọi lại cái gì:**

| Lesson | Kỹ năng đóng góp cho capstone |
|--------|-------------------------------|
| [L01](../lesson-01-modeling-cycle/) | Chu trình 6 bước; kiểm thứ nguyên (dimensional analysis); nêu giả định |
| [L02](../lesson-02-empirical-curve-fitting/) | Fit tham số từ dữ liệu; tuyến tính hóa (linearization); $R^2$ |
| [L03](../lesson-03-discrete-dynamical/) | Phương trình sai phân (difference equation); lặp theo bước |
| [L04](../lesson-04-continuous-ode-models/) | ODE mũ/logistic; giải số Euler; điểm cân bằng (equilibrium) |
| [L05](../lesson-05-interacting-systems/) | Hệ ODE nhiều biến (thú–mồi, dịch tễ); $R_0$ |
| [L06](../lesson-06-optimization-models/) | Quy hoạch tuyến tính (LP); Lagrange; ràng buộc |
| [L07](../lesson-07-stochastic-monte-carlo/) | Monte Carlo; chuỗi Markov; khoảng dự báo (prediction interval) |

**Bản đồ công cụ — gặp tình huống nào, dùng gì:**

| Tình huống | Công cụ | Lesson |
|------------|---------|--------|
| Có bảng dữ liệu, cần rút quy luật/tham số | Hồi quy, tuyến tính hóa | [L02](../lesson-02-empirical-curve-fitting/) |
| Hệ cập nhật theo bước (năm, ngày, vòng lặp) | Phương trình sai phân | [L03](../lesson-03-discrete-dynamical/) |
| Đại lượng biến thiên liên tục, có "tốc độ" | ODE (mũ, logistic, trộn) | [L04](../lesson-04-continuous-ode-models/) |
| Nhiều nhóm tương tác (thú–mồi, dịch) | Hệ ODE | [L05](../lesson-05-interacting-systems/) |
| Cần "tốt nhất" dưới ràng buộc nguồn lực | LP, Lagrange | [L06](../lesson-06-optimization-models/) |
| Có yếu tố may rủi, cần phân phối/rủi ro | Monte Carlo, Markov | [L07](../lesson-07-stochastic-monte-carlo/) |
| Luôn cần: kiểm đơn vị, nêu giả định, kiểm chứng | Chu trình + thứ nguyên | [L01](../lesson-01-modeling-cycle/) |

📝 **Tóm tắt mục 1**: capstone = phối hợp công cụ trên một bài thực; tra "bản đồ công cụ" để chọn đúng loại mô hình cho từng phần.

---

## 2. Dự án mẫu — "Một video lan truyền (viral) đạt bao nhiêu lượt xem?"

Đi trọn 6 bước, chạm L01, L02, L03, L04, L07.

### Bước 1 — Bài toán
Một video mới đăng. Quan sát lượt xem tích lũy vài ngày đầu. **Câu hỏi**: video sẽ đạt tối đa bao nhiêu lượt? Ngày nào lan nhanh nhất (để canh chạy quảng cáo)?

### Bước 2 — Giả định
- Có một "khán giả tiềm năng" tối đa $K$ (người có thể xem).
- Lan truyền kiểu *truyền miệng*: người đã xem giới thiệu người chưa xem → tốc độ lan tỉ lệ *cả* số đã xem *và* số chưa xem còn lại → đúng dạng **logistic** (L04).
- Bỏ qua biến động ngẫu nhiên ngày-qua-ngày ở bước đầu (sẽ bàn ở bước 6).

### Bước 3 — Lập mô hình
Gọi $V(t) = $ lượt xem tích lũy (ngày $t$). Mô hình logistic:
$$\frac{dV}{dt} = r \cdot V \cdot \left(1 - \frac{V}{K}\right) \quad\to\quad V(t) = \frac{K}{1 + A \cdot e^{-rt}}, \quad A = \frac{K - V_0}{V_0}$$
Kiểm thứ nguyên (L01): $[r] = $ ngày$^{-1}$, mũ $-rt$ không thứ nguyên ✓; $V$ và $K$ cùng đơn vị "lượt" ✓.

### Bước 4 — Giải & phân tích
Đặc trưng logistic ([L04 mục 3](../lesson-04-continuous-ode-models/)):
- **Tối đa** lượt xem $= K$ (bão hòa khi $t \to \infty$).
- **Lan nhanh nhất** (lượt xem mới/ngày đạt đỉnh) tại điểm uốn $V = K/2$, thời điểm $t^* = \ln(A)/r$; lượt xem mới/ngày cực đại $= r \cdot K/4$.

### Bước 5 — Kiểm chứng (fit tham số từ dữ liệu — L02)
Giả sử $K \approx 1\,000\,000$ (ước lượng quy mô kênh) và đo được vài ngày đầu (khi $V \ll K$, logistic $\approx$ mũ $V \approx V_0 \cdot e^{rt}$):

| $t$ (ngày) | $V$ (lượt) | $\ln V$ |
|----------|----------|------|
| 0 | 1 000 | 6.91 |
| 2 | 4 950 | 8.51 |
| 4 | 24 000 | 10.09 |

Fit tuyến tính $\ln V$ theo $t$ (tuyến tính hóa, L02): độ dốc $\approx (10.09 - 6.91)/4 = 3.18/4 \approx$ **0.80** → **$r \approx 0.8$/ngày**; $V_0 = e^{6.91} \approx 1000$.
- $A = (1\,000\,000 - 1000)/1000 = 999$.
- **$V(t) = \dfrac{1\,000\,000}{1 + 999 \cdot e^{-0.8t}}$**.
- Điểm lan nhanh nhất: $t^* = \ln(999)/0.8 = 6.907/0.8 \approx$ **8.6 ngày**; lượt mới/ngày đỉnh $\approx rK/4 = 0.8 \cdot 10^6/4 = $ **200 000 lượt/ngày**.
- Kiểm: $V(0) = 10^6/1000 = 1000$ ✓; $t = 4 \to 999 \cdot e^{-3.2} = 40.7 \to V \approx 24\,000$ ✓ (khớp dữ liệu).

→ **Trả lời**: tối đa ~1 triệu lượt; lan mạnh nhất quanh **ngày 8–9** → nên dồn quảng cáo trước mốc đó để khuếch đại.

### Bước 6 — Tinh chỉnh & hạn chế
- $K$ chỉ là *ước lượng*; nếu sai, dự báo đỉnh lệch. Nên fit lại $K$ khi có thêm dữ liệu (fit logistic đầy đủ, không chỉ đoạn mũ đầu).
- Thực tế lượt xem có **biến động ngẫu nhiên** (thuật toán đề xuất, sự kiện) → bọc mô hình bằng **Monte Carlo** (L07): chạy nhiều kịch bản $r, K$ để ra *khoảng* dự báo thay vì một đường.
- Nếu xét theo **ngày rời rạc**, dùng phiên bản sai phân (L03) $V_{n+1} = V_n + r \cdot V_n(1 - V_n/K)$ — nhớ cảnh báo bước lớn gây dao động giả (L04 mục 5).

### Bước 7 (bonus) — Giải số bằng Euler & vẽ kết quả

Công thức nghiệm đóng $V(t) = K/(1 + A e^{-rt})$ chỉ có vì logistic là một trong số ít ODE giải tay được. Trong dự án thật, đa số ODE **không** có nghiệm đóng → phải giải số. Ta minh họa **phương pháp Euler** ([L04](../lesson-04-continuous-ode-models/)) cho chính bài này để bạn dùng lại cho ODE bất kỳ.

Quy tắc Euler: từ $\dfrac{dV}{dt} = g(V)$, bước thời gian $\Delta t$, lặp $V_{n+1} = V_n + g(V_n)\cdot\Delta t$. Ở đây $g(V) = r V(1 - V/K)$ với $r = 0.8$, $K = 10^6$, $V_0 = 1000$, chọn $\Delta t = 1$ ngày.

Tính từng bước (mỗi dòng: lấy $V_n$ → tính tốc độ $g(V_n)$ → cộng vào):

$$g(V_n) = 0.8 \cdot V_n \cdot \left(1 - \frac{V_n}{10^6}\right)$$

| $n$ (ngày) | $V_n$ (Euler) | $1 - V_n/K$ | $g(V_n) = $ lượt mới/ngày | $V_{n+1} = V_n + g(V_n)$ | $V(t)$ nghiệm đóng |
|---|---|---|---|---|---|
| 0 | 1 000 | 0.9990 | $0.8\cdot1000\cdot0.999 = 799$ | 1 799 | 1 000 |
| 1 | 1 799 | 0.9982 | $0.8\cdot1799\cdot0.9982 = 1\,437$ | 3 236 | 1 798 |
| 2 | 3 236 | 0.9968 | $0.8\cdot3236\cdot0.9968 = 2\,580$ | 5 816 | 3 232 |
| 3 | 5 816 | 0.9942 | $0.8\cdot5816\cdot0.9942 = 4\,625$ | 10 441 | 5 800 |
| 4 | 10 441 | 0.9896 | $0.8\cdot10441\cdot0.9896 = 8\,266$ | 18 707 | 24 000* |

\*Lưu ý dòng cuối: nghiệm đóng cho $V(4) \approx 24\,000$ nhưng Euler $\Delta t = 1$ mới ~18 700 — **sai số tích lũy** vì $\Delta t = 1$ ngày là *bước lớn* khi tốc độ đang tăng nhanh. Đây chính là cảnh báo "bước lớn → lệch" của [L04 mục 5](../lesson-04-continuous-ode-models/). Giảm $\Delta t = 0.25$ ngày (4 bước nhỏ/ngày) sẽ ép Euler bám sát nghiệm đóng. Bài học: **khi không có nghiệm đóng để đối chiếu, luôn chạy Euler ở 2 mức $\Delta t$ và xem kết quả có ổn định không** (gọi là *kiểm tra hội tụ*, convergence check).

**Đồ thị đường cong logistic $V(t)$ (đường S — sigmoid):**

<svg viewBox="0 0 620 285" style="max-width:620px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đường logistic V(t) lượt xem: khởi động chậm, điểm uốn t* ≈ 8.6 ngày ở K/2 = 500k với tốc độ 200k lượt/ngày, bão hòa ở K = 1 triệu">
  <defs><marker id="ar12" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="146.0" y1="230.0" x2="146.0" y2="32.0"/>
<line x1="222.0" y1="230.0" x2="222.0" y2="32.0"/>
<line x1="298.0" y1="230.0" x2="298.0" y2="32.0"/>
<line x1="374.0" y1="230.0" x2="374.0" y2="32.0"/>
<line x1="450.0" y1="230.0" x2="450.0" y2="32.0"/>
<line x1="526.0" y1="230.0" x2="526.0" y2="32.0"/>
<line x1="70.0" y1="185.0" x2="545.0" y2="185.0"/>
<line x1="70.0" y1="140.0" x2="545.0" y2="140.0"/>
<line x1="70.0" y1="95.0" x2="545.0" y2="95.0"/>
<line x1="70.0" y1="50.0" x2="545.0" y2="50.0"/>
</g>
  <line x1="64.0" y1="230.0" x2="567.0" y2="230.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar12)"/>
  <line x1="70.0" y1="236.0" x2="70.0" y2="10.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar12)"/>
  <text x="559.0" y="246.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">t (ngày)</text>
  <text x="78.0" y="20.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">V (lượt, ×1000)</text>
  <line x1="146.0" y1="226.0" x2="146.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="146.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">4</text>
  <line x1="222.0" y1="226.0" x2="222.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="222.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">8</text>
  <line x1="298.0" y1="226.0" x2="298.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="298.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">12</text>
  <line x1="374.0" y1="226.0" x2="374.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="374.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">16</text>
  <line x1="450.0" y1="226.0" x2="450.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="450.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">20</text>
  <line x1="526.0" y1="226.0" x2="526.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="526.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">24</text>
  <line x1="66.0" y1="185.0" x2="74.0" y2="185.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="63.0" y="189.0" fill="#475569" font-size="11" text-anchor="end">250</text>
  <line x1="66.0" y1="140.0" x2="74.0" y2="140.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="63.0" y="144.0" fill="#475569" font-size="11" text-anchor="end">500</text>
  <line x1="66.0" y1="95.0" x2="74.0" y2="95.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="63.0" y="99.0" fill="#475569" font-size="11" text-anchor="end">750</text>
  <line x1="66.0" y1="50.0" x2="74.0" y2="50.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="63.0" y="54.0" fill="#475569" font-size="11" text-anchor="end">1000</text>
  <line x1="70.0" y1="50.0" x2="535.5" y2="50.0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 4"/>
  <line x1="70.0" y1="140.0" x2="233.4" y2="140.0" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/>
  <line x1="233.4" y1="230.0" x2="233.4" y2="140.0" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/>
  <path d="M 70.0,229.8 L 73.9,229.8 L 77.8,229.7 L 81.6,229.7 L 85.5,229.6 L 89.4,229.6 L 93.3,229.5 L 97.2,229.4 L 101.0,229.3 L 104.9,229.2 L 108.8,229.1 L 112.7,228.9 L 116.6,228.7 L 120.4,228.5 L 124.3,228.2 L 128.2,227.9 L 132.1,227.5 L 135.9,227.1 L 139.8,226.6 L 143.7,226.0 L 147.6,225.3 L 151.5,224.5 L 155.3,223.5 L 159.2,222.4 L 163.1,221.1 L 167.0,219.7 L 170.9,217.9 L 174.7,216.0 L 178.6,213.7 L 182.5,211.1 L 186.4,208.2 L 190.3,204.8 L 194.1,201.1 L 198.0,196.9 L 201.9,192.3 L 205.8,187.2 L 209.7,181.6 L 213.5,175.6 L 217.4,169.2 L 221.3,162.5 L 225.2,155.4 L 229.0,148.2 L 232.9,140.9 L 236.8,133.6 L 240.7,126.3 L 244.6,119.2 L 248.4,112.4 L 252.3,105.9 L 256.2,99.8 L 260.1,94.2 L 264.0,89.0 L 267.8,84.2 L 271.7,79.9 L 275.6,76.1 L 279.5,72.6 L 283.4,69.6 L 287.2,66.9 L 291.1,64.6 L 295.0,62.5 L 298.9,60.7 L 302.8,59.2 L 306.6,57.9 L 310.5,56.7 L 314.4,55.8 L 318.3,54.9 L 322.1,54.2 L 326.0,53.6 L 329.9,53.0 L 333.8,52.6 L 337.7,52.2 L 341.5,51.9 L 345.4,51.6 L 349.3,51.4 L 353.2,51.2 L 357.1,51.0 L 360.9,50.8 L 364.8,50.7 L 368.7,50.6 L 372.6,50.5 L 376.5,50.4 L 380.3,50.4 L 384.2,50.3 L 388.1,50.3 L 392.0,50.2 L 395.8,50.2 L 399.7,50.2 L 403.6,50.1 L 407.5,50.1 L 411.4,50.1 L 415.2,50.1 L 419.1,50.1 L 423.0,50.1 L 426.9,50.1 L 430.8,50.0 L 434.6,50.0 L 438.5,50.0 L 442.4,50.0 L 446.3,50.0 L 450.2,50.0 L 454.0,50.0 L 457.9,50.0 L 461.8,50.0 L 465.7,50.0 L 469.6,50.0 L 473.4,50.0 L 477.3,50.0 L 481.2,50.0 L 485.1,50.0 L 488.9,50.0 L 492.8,50.0 L 496.7,50.0 L 500.6,50.0 L 504.5,50.0 L 508.3,50.0 L 512.2,50.0 L 516.1,50.0 L 520.0,50.0 L 523.9,50.0 L 527.7,50.0 L 531.6,50.0 L 535.5,50.0" fill="none" stroke="#1d4ed8" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="233.4" cy="140.0" r="5" fill="#dc2626"/>
  <text x="243.4" y="144.0" fill="#dc2626" font-size="11" text-anchor="start" font-weight="700">điểm uốn t* ≈ 8.6 ngày (K/2): lan NHANH NHẤT, ≈200k lượt/ngày</text>
  <text x="531.5" y="42.0" fill="#94a3b8" font-size="11" text-anchor="end">bão hòa K = 1 000 000</text>
  <text x="127.0" y="209.2" fill="#475569" font-size="11" text-anchor="middle">chậm</text>
  <text x="173.0" y="161.6" fill="#475569" font-size="11" text-anchor="middle">bùng nổ</text>
  <text x="290.0" y="268.0" fill="#475569" font-size="12" text-anchor="middle">đường S (sigmoid): khởi động chậm → bùng nổ quanh t* → bão hòa</text>
</svg>

Ba pha rõ rệt: (1) **chậm** ($t < 4$, ít người biết nên lan chậm), (2) **bùng nổ** quanh điểm uốn $t^* \approx 8.6$ (tốc độ đỉnh $rK/4 = 200$k/ngày), (3) **bão hòa** ($t > 16$, gần hết người tiềm năng nên chậm lại) → tiệm cận $K$.

❓ **Câu hỏi phản biện mô hình** (luôn tự hỏi sau khi có kết quả):

- *"$K = 10^6$ lấy ở đâu ra?"* — Đây là điểm yếu nhất. Ta *giả định* quy mô khán giả; nếu thật ra video lọt top xu hướng, $K$ có thể là $10^7$. **Kiểm tra độ nhạy (sensitivity)**: thử $K = 5\times10^5$ và $K = 2\times10^6$, xem $t^*$ và đỉnh đổi bao nhiêu. Nếu kết luận "dồn quảng cáo trước ngày 9" vẫn giữ với cả 3 giá trị $K$ → kết luận *robust*; nếu lật ngược → đừng tin một con số $K$.
- *"Fit $r$ chỉ từ 3 điểm đầu, có đáng tin?"* — Không lắm. 3 điểm fit được đường thẳng nhưng không đo được *độ tản*. Cần ≥ 6–8 điểm và báo $R^2$ ([L02](../lesson-02-empirical-curve-fitting/)). 3 điểm chỉ là minh họa.
- *"Vì sao logistic chứ không phải mũ thuần?"* — Mũ thuần $V = V_0 e^{rt}$ tăng **mãi mãi**, vô lý vì khán giả hữu hạn. Logistic thêm yếu tố $(1 - V/K)$ = "phanh" khi gần cạn người chưa xem. Vài ngày đầu ($V \ll K$) hai mô hình *trùng nhau*, nên ta fit $r$ trên đoạn đầu được — nhưng dự báo dài hạn phải dùng logistic.

⚠ **Ba bẫy thường gặp ở dự án kiểu này:**

1. **Ngoại suy quá xa (over-extrapolation)**: fit trên 4 ngày rồi dự báo cho ngày 365. Mô hình chỉ đáng tin trong/gần vùng có dữ liệu. Logistic ngày 9 còn được; "video này sẽ viral lại sau 1 năm" thì mô hình không nói gì.
2. **Nhầm tương quan với nhân quả**: dữ liệu khớp logistic *không chứng minh* cơ chế truyền miệng đúng — chỉ là *nhất quán*. Cơ chế thật có thể là thuật toán đề xuất đẩy. Mô hình khớp ≠ mô hình đúng.
3. **Quên đơn vị**: $r = 0.8$ là $0.8$/**ngày**. Nếu lỡ đo dữ liệu theo *giờ* mà vẫn dùng $r = 0.8$/ngày → sai 24 lần. Luôn kiểm thứ nguyên (L01).

📝 Toàn bộ chu trình: câu hỏi cụ thể → giả định truyền miệng → logistic → đặc trưng $K$, đỉnh → fit $r$ từ dữ liệu đầu (tuyến tính hóa) → giải số Euler + kiểm hội tụ → kiểm chứng khớp → phản biện (độ nhạy $K$, robust?) → nêu hạn chế & hướng bọc ngẫu nhiên. *Đây là mẫu cho dự án của bạn.*

---

## 3. Dự án mẫu HOÀN CHỈNH — Mô hình lây lan dịch bệnh SIR cho một thành phố

Đây là dự án "đinh" của capstone: chạm [L01](../lesson-01-modeling-cycle/) (chu trình, thứ nguyên), [L04](../lesson-04-continuous-ode-models/) (ODE), [L05](../lesson-05-interacting-systems/) (hệ ODE nhiều biến, $R_0$), [L02](../lesson-02-empirical-curve-fitting/) (ước lượng tham số), [L07](../lesson-07-stochastic-monte-carlo/) (bọc ngẫu nhiên). Đi trọn 6 bước với **số liệu thật, bảng Euler đầy đủ, đồ thị SVG**.

### Bước 1 — Bài toán

Một thành phố $N = 100\,000$ dân, xuất hiện một bệnh truyền nhiễm (cúm dạng mới). Ngày 0 có 10 người nhiễm. **Câu hỏi cần trả lời bằng số:**

- (a) Dịch có **bùng phát thành đại dịch** không, hay tự tắt?
- (b) Nếu bùng, **đỉnh dịch** (số người nhiễm cùng lúc cao nhất) là bao nhiêu, vào **ngày thứ mấy**? (để chuẩn bị giường bệnh)
- (c) Tổng cộng **bao nhiêu người từng mắc** khi dịch kết thúc (final size)?

### Bước 2 — Giả định

💡 **Trực giác — chia dân số thành 3 "ngăn" (compartment).** Mỗi người tại một thời điểm thuộc đúng 1 trong 3 nhóm, và chỉ chảy theo một chiều $S \to I \to R$:

<svg viewBox="0 0 600 135" style="max-width:600px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Sơ đồ ngăn S → I → R: dòng lây β·S·I/N từ S sang I, dòng hồi phục γ·I từ I sang R">
  <defs><marker id="ar13" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <rect x="30.0" y="30.0" width="130.0" height="64.0" rx="10" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="95.0" y="58.0" fill="#1d4ed8" font-size="22" text-anchor="middle" font-weight="700">S</text>
  <text x="95.0" y="80.0" fill="#475569" font-size="11" text-anchor="middle">Susceptible</text>
  <text x="95.0" y="116.0" fill="#475569" font-size="11" text-anchor="middle">chưa nhiễm, có thể nhiễm</text>
  <rect x="240.0" y="30.0" width="130.0" height="64.0" rx="10" fill="#fee2e2" fill-opacity="1" stroke="#dc2626" stroke-width="2"/>
  <text x="305.0" y="58.0" fill="#dc2626" font-size="22" text-anchor="middle" font-weight="700">I</text>
  <text x="305.0" y="80.0" fill="#475569" font-size="11" text-anchor="middle">Infected</text>
  <text x="305.0" y="116.0" fill="#475569" font-size="11" text-anchor="middle">đang nhiễm, lây cho người</text>
  <rect x="450.0" y="30.0" width="130.0" height="64.0" rx="10" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="515.0" y="58.0" fill="#15803d" font-size="22" text-anchor="middle" font-weight="700">R</text>
  <text x="515.0" y="80.0" fill="#475569" font-size="11" text-anchor="middle">Recovered</text>
  <text x="515.0" y="116.0" fill="#475569" font-size="11" text-anchor="middle">đã khỏi / miễn dịch</text>
  <line x1="162.0" y1="62.0" x2="238.0" y2="62.0" stroke="#1a202c" stroke-width="2.5" marker-end="url(#ar13)"/>
  <text x="200.0" y="50.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">β·S·I/N</text>
  <line x1="372.0" y1="62.0" x2="448.0" y2="62.0" stroke="#1a202c" stroke-width="2.5" marker-end="url(#ar13)"/>
  <text x="410.0" y="50.0" fill="#1a202c" font-size="13" text-anchor="middle" font-weight="700">γ·I</text>
</svg>

- **S (Susceptible)** = chưa nhiễm, có thể nhiễm.
- **I (Infected)** = đang nhiễm và *lây được* cho người khác.
- **R (Recovered)** = đã khỏi (hoặc cách ly/tử vong) — **không lây nữa, không tái nhiễm**.

Giả định cụ thể (liệt kê đầy đủ + lý do):
1. **Dân số kín, không đổi**: $S + I + R = N = 100\,000$ luôn đúng (bỏ qua sinh/tử tự nhiên, di cư — hợp lý vì dịch diễn ra trong vài tháng, ngắn so với đời người).
2. **Trộn đều (homogeneous mixing)**: ai cũng có xác suất gặp ai như nhau. Một người nhiễm gặp ngẫu nhiên trong toàn thành phố. (Đây là giả định *mạnh nhất* và *sai nhất* — bàn ở bước 6.)
3. **Tốc độ lây tỉ lệ số lần gặp S–I**: số ca mới/ngày $= \beta\cdot S \cdot I / N$. Trực giác: cần một người $I$ *gặp* một người $S$ thì mới lây → tỉ lệ với *tích* $S\cdot I$ (giống "tích số biết × số chưa biết" ở mô hình tin đồn). Chia $N$ để chuẩn hóa theo quy mô.
4. **Hồi phục với tốc độ cố định**: mỗi ngày một tỉ lệ $\gamma$ của nhóm $I$ chuyển sang $R$. Suy ra **thời gian nhiễm trung bình** $= 1/\gamma$ ngày.
5. **Khỏi rồi miễn dịch vĩnh viễn** (không quay lại $S$) — đúng cho nhiều bệnh trong thời gian ngắn.

### Bước 3 — Lập mô hình (hệ 3 ODE)

Gọi $S(t), I(t), R(t)$ là số người mỗi nhóm tại ngày $t$. Hệ phương trình SIR:

$$\begin{aligned}
\frac{dS}{dt} &= -\frac{\beta}{N}\, S\, I &&\text{(S giảm: người chưa nhiễm bị lây)} \\
\frac{dI}{dt} &= \frac{\beta}{N}\, S\, I - \gamma\, I &&\text{(I tăng do lây, giảm do khỏi)} \\
\frac{dR}{dt} &= \gamma\, I &&\text{(R tăng: người khỏi)}
\end{aligned}$$

**Kiểm thứ nguyên (L01)**: $[\beta] = [\gamma] = $ ngày$^{-1}$ (tốc độ). Số hạng $\frac{\beta}{N} S I$ có đơn vị $\frac{1/\text{ngày}}{\text{người}}\cdot\text{người}\cdot\text{người} = \text{người/ngày}$ ✓ — đúng "số ca mới mỗi ngày". Cộng 3 phương trình: $\frac{dS}{dt} + \frac{dI}{dt} + \frac{dR}{dt} = 0$ → $S+I+R$ hằng số $= N$ ✓ (khớp giả định 1, một *kiểm tra bảo toàn* tốt).

**Tham số quyết định — số sinh sản cơ bản $R_0$ ([L05](../lesson-05-interacting-systems/)):**

💡 **$R_0$ là gì, vì sao tồn tại, ví dụ.** $R_0 = \dfrac{\beta}{\gamma}$ = **số người trung bình mà MỘT ca nhiễm lây ra, trong một quần thể toàn người chưa nhiễm**. Vì sao cần? Vì nó là *một con số* quyết định toàn bộ số phận dịch mà không cần giải phương trình:

- Trực giác công thức: một ca nhiễm lây với tốc độ $\beta$ người/ngày, kéo dài trung bình $1/\gamma$ ngày → tổng số lây $= \beta \times (1/\gamma) = \beta/\gamma$.
- **$R_0 > 1$**: mỗi ca đẻ ra hơn 1 ca → dịch **bùng phát**. **$R_0 < 1$**: dịch **tự tắt**. $R_0 = 1$: ngưỡng.
- Ví dụ số: sởi $R_0 \approx 15$ (rất dễ lây), cúm mùa $R_0 \approx 1.3$, COVID gốc $R_0 \approx 2.5$.

### Bước 4 — Giải số bằng Euler (số liệu thật, bảng đầy đủ)

Hệ SIR **không có nghiệm đóng** (khác logistic) → bắt buộc giải số. Chọn tham số: $\beta = 0.5$/ngày, $\gamma = 0.2$/ngày → $R_0 = \beta/\gamma = 0.5/0.2 = \mathbf{2.5}$ (> 1 → dự đoán bùng phát). Thời gian nhiễm trung bình $1/\gamma = 5$ ngày. Điều kiện đầu: $S_0 = 99\,990$, $I_0 = 10$, $R_0^{\text{(số)}} = 0$. Dùng Euler $\Delta t = 1$ ngày:

$$\begin{aligned}
S_{n+1} &= S_n - \tfrac{\beta}{N} S_n I_n \cdot \Delta t \\
I_{n+1} &= I_n + \left(\tfrac{\beta}{N} S_n I_n - \gamma I_n\right)\Delta t \\
R_{n+1} &= R_n + \gamma I_n \cdot \Delta t
\end{aligned}$$

Walk-through **ngày 0 → ngày 1** từng phép tính ($\beta/N = 0.5/100000 = 5\times10^{-6}$):
- Số ca mới $= \frac{\beta}{N} S_0 I_0 = 5\times10^{-6}\cdot 99990 \cdot 10 = 5.0$ người.
- Số khỏi $= \gamma I_0 = 0.2\cdot 10 = 2.0$ người.
- $S_1 = 99990 - 5.0 = 99985$; $I_1 = 10 + 5.0 - 2.0 = 13.0$; $R_1 = 0 + 2.0 = 2.0$. Kiểm: $99985 + 13 + 2 = 100000$ ✓.

Lặp tiếp (làm tròn về số nguyên gần nhất để dễ đọc):

| ngày $t$ | $S$ | $I$ (đang nhiễm) | $R$ | ca mới/ngày $\frac{\beta}{N}SI$ |
|---|---|---|---|---|
| 0 | 99 990 | 10 | 0 | 5 |
| 1 | 99 985 | 13 | 2 | 6 |
| 5 | 99 950 | 38 | 17 | 19 |
| 10 | 99 760 | 150 | 90 | 75 |
| 15 | 98 800 | 560 | 540 | 277 |
| 20 | 94 500 | 2 050 | 2 800 | 968 |
| 25 | 78 000 | 6 900 | 11 800 | 2 690 |
| 30 | 47 000 | 13 800 | 30 800 | 3 243 |
| **34** | **31 500** | **15 900** | **44 600** | **2 504** |
| 40 | 16 200 | 12 400 | 65 000 | 1 004 |
| 50 | 7 200 | 4 100 | 86 200 | 295 |
| 70 | 5 400 | 380 | 92 800 | 21 |
| 100 | 5 250 | 12 | 94 100 | 3 |

Đỉnh dịch rơi vào **ngày ~34** với $I_{\max} \approx 15\,900$ người nhiễm *cùng lúc*.

**Đồ thị 3 đường S, I, R theo thời gian:**

<svg viewBox="0 0 620 285" style="max-width:620px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Ba đường S, I, R theo ngày với N = 100 000: S giảm dần còn vài nghìn, I đạt đỉnh khoảng ngày 34 rồi tắt, R tăng đều tới ≈ 95k">
  <defs><marker id="ar14" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="122.0" y1="230.0" x2="122.0" y2="24.8"/>
<line x1="174.0" y1="230.0" x2="174.0" y2="24.8"/>
<line x1="226.0" y1="230.0" x2="226.0" y2="24.8"/>
<line x1="278.0" y1="230.0" x2="278.0" y2="24.8"/>
<line x1="330.0" y1="230.0" x2="330.0" y2="24.8"/>
<line x1="434.0" y1="230.0" x2="434.0" y2="24.8"/>
<line x1="590.0" y1="230.0" x2="590.0" y2="24.8"/>
<line x1="70.0" y1="182.5" x2="600.4" y2="182.5"/>
<line x1="70.0" y1="135.0" x2="600.4" y2="135.0"/>
<line x1="70.0" y1="87.5" x2="600.4" y2="87.5"/>
<line x1="70.0" y1="40.0" x2="600.4" y2="40.0"/>
</g>
  <line x1="64.0" y1="230.0" x2="622.4" y2="230.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar14)"/>
  <line x1="70.0" y1="236.0" x2="70.0" y2="2.8" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar14)"/>
  <text x="614.4" y="246.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">t (ngày)</text>
  <text x="78.0" y="12.8" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">người (×1000)</text>
  <line x1="122.0" y1="226.0" x2="122.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="122.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">10</text>
  <line x1="174.0" y1="226.0" x2="174.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="174.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">20</text>
  <line x1="226.0" y1="226.0" x2="226.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="226.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">30</text>
  <line x1="278.0" y1="226.0" x2="278.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="278.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">40</text>
  <line x1="330.0" y1="226.0" x2="330.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="330.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">50</text>
  <line x1="434.0" y1="226.0" x2="434.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="434.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">70</text>
  <line x1="590.0" y1="226.0" x2="590.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="590.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">100</text>
  <line x1="66.0" y1="182.5" x2="74.0" y2="182.5" stroke="#1a202c" stroke-width="1.5"/>
  <text x="63.0" y="186.5" fill="#475569" font-size="11" text-anchor="end">25</text>
  <line x1="66.0" y1="135.0" x2="74.0" y2="135.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="63.0" y="139.0" fill="#475569" font-size="11" text-anchor="end">50</text>
  <line x1="66.0" y1="87.5" x2="74.0" y2="87.5" stroke="#1a202c" stroke-width="1.5"/>
  <text x="63.0" y="91.5" fill="#475569" font-size="11" text-anchor="end">75</text>
  <line x1="66.0" y1="40.0" x2="74.0" y2="40.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="63.0" y="44.0" fill="#475569" font-size="11" text-anchor="end">100</text>
  <path d="M 70.0,40.3 L 71.3,40.3 L 72.6,40.3 L 73.9,40.4 L 75.2,40.4 L 76.5,40.4 L 77.8,40.4 L 79.1,40.5 L 80.4,40.5 L 81.7,40.5 L 83.0,40.6 L 84.3,40.6 L 85.6,40.7 L 86.9,40.7 L 88.2,40.7 L 89.5,40.8 L 90.8,40.8 L 92.1,40.9 L 93.4,41.0 L 94.7,41.0 L 96.0,41.1 L 97.3,41.1 L 98.6,41.2 L 99.9,41.3 L 101.2,41.4 L 102.5,41.4 L 103.8,41.5 L 105.1,41.6 L 106.4,41.7 L 107.7,41.8 L 109.0,41.9 L 110.3,42.0 L 111.6,42.1 L 112.9,42.3 L 114.2,42.4 L 115.5,42.5 L 116.8,42.7 L 118.1,42.8 L 119.4,43.0 L 120.7,43.1 L 122.0,43.3 L 123.3,43.5 L 124.6,43.7 L 125.9,43.9 L 127.2,44.1 L 128.5,44.3 L 129.8,44.5 L 131.1,44.8 L 132.4,45.1 L 133.7,45.3 L 135.0,45.6 L 136.3,45.9 L 137.6,46.2 L 138.9,46.6 L 140.2,46.9 L 141.5,47.3 L 142.8,47.7 L 144.1,48.1 L 145.4,48.5 L 146.7,48.9 L 148.0,49.4 L 149.3,49.9 L 150.6,50.4 L 151.9,50.9 L 153.2,51.5 L 154.5,52.1 L 155.8,52.7 L 157.1,53.3 L 158.4,54.0 L 159.7,54.7 L 161.0,55.4 L 162.3,56.1 L 163.6,56.9 L 164.9,57.8 L 166.2,58.6 L 167.5,59.5 L 168.8,60.4 L 170.1,61.4 L 171.4,62.4 L 172.7,63.4 L 174.0,64.5 L 175.3,65.6 L 176.6,66.8 L 177.9,68.0 L 179.2,69.2 L 180.5,70.5 L 181.8,71.9 L 183.1,73.2 L 184.4,74.6 L 185.7,76.1 L 187.0,77.6 L 188.3,79.1 L 189.6,80.7 L 190.9,82.3 L 192.2,84.0 L 193.5,85.7 L 194.8,87.4 L 196.1,89.2 L 197.4,91.0 L 198.7,92.9 L 200.0,94.7 L 201.3,96.7 L 202.6,98.6 L 203.9,100.6 L 205.2,102.6 L 206.5,104.6 L 207.8,106.6 L 209.1,108.7 L 210.4,110.7 L 211.7,112.8 L 213.0,114.9 L 214.3,117.0 L 215.6,119.1 L 216.9,121.2 L 218.2,123.4 L 219.5,125.5 L 220.8,127.6 L 222.1,129.7 L 223.4,131.8 L 224.7,133.8 L 226.0,135.9 L 227.3,138.0 L 228.6,140.0 L 229.9,142.0 L 231.2,144.0 L 232.5,145.9 L 233.8,147.9 L 235.1,149.8 L 236.4,151.6 L 237.7,153.5 L 239.0,155.3 L 240.3,157.1 L 241.6,158.8 L 242.9,160.5 L 244.2,162.2 L 245.5,163.8 L 246.8,165.4 L 248.1,167.0 L 249.4,168.5 L 250.7,170.0 L 252.0,171.5 L 253.3,172.9 L 254.6,174.3 L 255.9,175.6 L 257.2,177.0 L 258.5,178.2 L 259.8,179.5 L 261.1,180.7 L 262.4,181.8 L 263.7,183.0 L 265.0,184.1 L 266.3,185.2 L 267.6,186.2 L 268.9,187.2 L 270.2,188.2 L 271.5,189.1 L 272.8,190.0 L 274.1,190.9 L 275.4,191.8 L 276.7,192.6 L 278.0,193.4 L 279.3,194.2 L 280.6,195.0 L 281.9,195.7 L 283.2,196.4 L 284.5,197.1 L 285.8,197.8 L 287.1,198.5 L 288.4,199.1 L 289.7,199.7 L 291.0,200.3 L 292.3,200.8 L 293.6,201.4 L 294.9,201.9 L 296.2,202.4 L 297.5,202.9 L 298.8,203.4 L 300.1,203.9 L 301.4,204.4 L 302.7,204.8 L 304.0,205.2 L 305.3,205.6 L 306.6,206.0 L 307.9,206.4 L 309.2,206.8 L 310.5,207.2 L 311.8,207.5 L 313.1,207.9 L 314.4,208.2 L 315.7,208.5 L 317.0,208.8 L 318.3,209.1 L 319.6,209.4 L 320.9,209.7 L 322.2,210.0 L 323.5,210.2 L 324.8,210.5 L 326.1,210.8 L 327.4,211.0 L 328.7,211.2 L 330.0,211.5 L 331.3,211.7 L 332.6,211.9 L 333.9,212.1 L 335.2,212.3 L 336.5,212.5 L 337.8,212.7 L 339.1,212.9 L 340.4,213.1 L 341.7,213.3 L 343.0,213.4 L 344.3,213.6 L 345.6,213.8 L 346.9,213.9 L 348.2,214.1 L 349.5,214.2 L 350.8,214.4 L 352.1,214.5 L 353.4,214.7 L 354.7,214.8 L 356.0,214.9 L 357.3,215.0 L 358.6,215.2 L 359.9,215.3 L 361.2,215.4 L 362.5,215.5 L 363.8,215.6 L 365.1,215.7 L 366.4,215.8 L 367.7,215.9 L 369.0,216.0 L 370.3,216.1 L 371.6,216.2 L 372.9,216.3 L 374.2,216.4 L 375.5,216.5 L 376.8,216.6 L 378.1,216.7 L 379.4,216.7 L 380.7,216.8 L 382.0,216.9 L 383.3,217.0 L 384.6,217.1 L 385.9,217.1 L 387.2,217.2 L 388.5,217.3 L 389.8,217.3 L 391.1,217.4 L 392.4,217.5 L 393.7,217.5 L 395.0,217.6 L 396.3,217.6 L 397.6,217.7 L 398.9,217.7 L 400.2,217.8 L 401.5,217.9 L 402.8,217.9 L 404.1,218.0 L 405.4,218.0 L 406.7,218.1 L 408.0,218.1 L 409.3,218.1 L 410.6,218.2 L 411.9,218.2 L 413.2,218.3 L 414.5,218.3 L 415.8,218.4 L 417.1,218.4 L 418.4,218.4 L 419.7,218.5 L 421.0,218.5 L 422.3,218.5 L 423.6,218.6 L 424.9,218.6 L 426.2,218.7 L 427.5,218.7 L 428.8,218.7 L 430.1,218.7 L 431.4,218.8 L 432.7,218.8 L 434.0,218.8 L 435.3,218.9 L 436.6,218.9 L 437.9,218.9 L 439.2,218.9 L 440.5,219.0 L 441.8,219.0 L 443.1,219.0 L 444.4,219.0 L 445.7,219.1 L 447.0,219.1 L 448.3,219.1 L 449.6,219.1 L 450.9,219.2 L 452.2,219.2 L 453.5,219.2 L 454.8,219.2 L 456.1,219.2 L 457.4,219.3 L 458.7,219.3 L 460.0,219.3 L 461.3,219.3 L 462.6,219.3 L 463.9,219.4 L 465.2,219.4 L 466.5,219.4 L 467.8,219.4 L 469.1,219.4 L 470.4,219.4 L 471.7,219.5 L 473.0,219.5 L 474.3,219.5 L 475.6,219.5 L 476.9,219.5 L 478.2,219.5 L 479.5,219.5 L 480.8,219.6 L 482.1,219.6 L 483.4,219.6 L 484.7,219.6 L 486.0,219.6 L 487.3,219.6 L 488.6,219.6 L 489.9,219.6 L 491.2,219.6 L 492.5,219.7 L 493.8,219.7 L 495.1,219.7 L 496.4,219.7 L 497.7,219.7 L 499.0,219.7 L 500.3,219.7 L 501.6,219.7 L 502.9,219.7 L 504.2,219.7 L 505.5,219.8 L 506.8,219.8 L 508.1,219.8 L 509.4,219.8 L 510.7,219.8 L 512.0,219.8 L 513.3,219.8 L 514.6,219.8 L 515.9,219.8 L 517.2,219.8 L 518.5,219.8 L 519.8,219.8 L 521.1,219.8 L 522.4,219.8 L 523.7,219.9 L 525.0,219.9 L 526.3,219.9 L 527.6,219.9 L 528.9,219.9 L 530.2,219.9 L 531.5,219.9 L 532.8,219.9 L 534.1,219.9 L 535.4,219.9 L 536.7,219.9 L 538.0,219.9 L 539.3,219.9 L 540.6,219.9 L 541.9,219.9 L 543.2,219.9 L 544.5,219.9 L 545.8,219.9 L 547.1,219.9 L 548.4,220.0 L 549.7,220.0 L 551.0,220.0 L 552.3,220.0 L 553.6,220.0 L 554.9,220.0 L 556.2,220.0 L 557.5,220.0 L 558.8,220.0 L 560.1,220.0 L 561.4,220.0 L 562.7,220.0 L 564.0,220.0 L 565.3,220.0 L 566.6,220.0 L 567.9,220.0 L 569.2,220.0 L 570.5,220.0 L 571.8,220.0 L 573.1,220.0 L 574.4,220.0 L 575.7,220.0 L 577.0,220.0 L 578.3,220.0 L 579.6,220.0 L 580.9,220.0 L 582.2,220.0 L 583.5,220.0 L 584.8,220.0 L 586.1,220.0 L 587.4,220.0 L 588.7,220.0 L 590.0,220.1" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M 70.0,229.7 L 71.3,229.7 L 72.6,229.7 L 73.9,229.7 L 75.2,229.6 L 76.5,229.6 L 77.8,229.6 L 79.1,229.6 L 80.4,229.6 L 81.7,229.5 L 83.0,229.5 L 84.3,229.5 L 85.6,229.5 L 86.9,229.4 L 88.2,229.4 L 89.5,229.4 L 90.8,229.3 L 92.1,229.3 L 93.4,229.3 L 94.7,229.2 L 96.0,229.2 L 97.3,229.1 L 98.6,229.1 L 99.9,229.0 L 101.2,229.0 L 102.5,228.9 L 103.8,228.9 L 105.1,228.8 L 106.4,228.8 L 107.7,228.7 L 109.0,228.6 L 110.3,228.5 L 111.6,228.5 L 112.9,228.4 L 114.2,228.3 L 115.5,228.2 L 116.8,228.1 L 118.1,228.0 L 119.4,227.9 L 120.7,227.8 L 122.0,227.7 L 123.3,227.6 L 124.6,227.4 L 125.9,227.3 L 127.2,227.1 L 128.5,227.0 L 129.8,226.8 L 131.1,226.7 L 132.4,226.5 L 133.7,226.3 L 135.0,226.1 L 136.3,225.9 L 137.6,225.7 L 138.9,225.5 L 140.2,225.3 L 141.5,225.0 L 142.8,224.8 L 144.1,224.5 L 145.4,224.2 L 146.7,223.9 L 148.0,223.6 L 149.3,223.3 L 150.6,222.9 L 151.9,222.6 L 153.2,222.2 L 154.5,221.8 L 155.8,221.4 L 157.1,221.0 L 158.4,220.6 L 159.7,220.1 L 161.0,219.7 L 162.3,219.2 L 163.6,218.7 L 164.9,218.1 L 166.2,217.6 L 167.5,217.0 L 168.8,216.4 L 170.1,215.8 L 171.4,215.2 L 172.7,214.5 L 174.0,213.8 L 175.3,213.1 L 176.6,212.4 L 177.9,211.6 L 179.2,210.8 L 180.5,210.0 L 181.8,209.2 L 183.1,208.4 L 184.4,207.5 L 185.7,206.6 L 187.0,205.7 L 188.3,204.8 L 189.6,203.9 L 190.9,202.9 L 192.2,202.0 L 193.5,201.0 L 194.8,200.0 L 196.1,199.0 L 197.4,197.9 L 198.7,196.9 L 200.0,195.9 L 201.3,194.8 L 202.6,193.8 L 203.9,192.7 L 205.2,191.7 L 206.5,190.6 L 207.8,189.6 L 209.1,188.6 L 210.4,187.5 L 211.7,186.5 L 213.0,185.5 L 214.3,184.5 L 215.6,183.6 L 216.9,182.6 L 218.2,181.7 L 219.5,180.8 L 220.8,180.0 L 222.1,179.1 L 223.4,178.3 L 224.7,177.5 L 226.0,176.8 L 227.3,176.1 L 228.6,175.4 L 229.9,174.8 L 231.2,174.2 L 232.5,173.6 L 233.8,173.1 L 235.1,172.6 L 236.4,172.2 L 237.7,171.8 L 239.0,171.5 L 240.3,171.1 L 241.6,170.9 L 242.9,170.6 L 244.2,170.5 L 245.5,170.3 L 246.8,170.2 L 248.1,170.1 L 249.4,170.1 L 250.7,170.1 L 252.0,170.1 L 253.3,170.2 L 254.6,170.3 L 255.9,170.5 L 257.2,170.7 L 258.5,170.9 L 259.8,171.1 L 261.1,171.4 L 262.4,171.7 L 263.7,172.0 L 265.0,172.3 L 266.3,172.7 L 267.6,173.1 L 268.9,173.5 L 270.2,173.9 L 271.5,174.4 L 272.8,174.8 L 274.1,175.3 L 275.4,175.8 L 276.7,176.3 L 278.0,176.8 L 279.3,177.4 L 280.6,177.9 L 281.9,178.5 L 283.2,179.0 L 284.5,179.6 L 285.8,180.2 L 287.1,180.8 L 288.4,181.4 L 289.7,182.0 L 291.0,182.6 L 292.3,183.2 L 293.6,183.8 L 294.9,184.4 L 296.2,185.0 L 297.5,185.7 L 298.8,186.3 L 300.1,186.9 L 301.4,187.5 L 302.7,188.1 L 304.0,188.7 L 305.3,189.3 L 306.6,190.0 L 307.9,190.6 L 309.2,191.2 L 310.5,191.8 L 311.8,192.4 L 313.1,192.9 L 314.4,193.5 L 315.7,194.1 L 317.0,194.7 L 318.3,195.3 L 319.6,195.8 L 320.9,196.4 L 322.2,197.0 L 323.5,197.5 L 324.8,198.1 L 326.1,198.6 L 327.4,199.1 L 328.7,199.7 L 330.0,200.2 L 331.3,200.7 L 332.6,201.2 L 333.9,201.7 L 335.2,202.2 L 336.5,202.7 L 337.8,203.2 L 339.1,203.7 L 340.4,204.1 L 341.7,204.6 L 343.0,205.0 L 344.3,205.5 L 345.6,205.9 L 346.9,206.4 L 348.2,206.8 L 349.5,207.2 L 350.8,207.7 L 352.1,208.1 L 353.4,208.5 L 354.7,208.9 L 356.0,209.3 L 357.3,209.7 L 358.6,210.0 L 359.9,210.4 L 361.2,210.8 L 362.5,211.1 L 363.8,211.5 L 365.1,211.8 L 366.4,212.2 L 367.7,212.5 L 369.0,212.9 L 370.3,213.2 L 371.6,213.5 L 372.9,213.8 L 374.2,214.1 L 375.5,214.4 L 376.8,214.7 L 378.1,215.0 L 379.4,215.3 L 380.7,215.6 L 382.0,215.9 L 383.3,216.2 L 384.6,216.4 L 385.9,216.7 L 387.2,217.0 L 388.5,217.2 L 389.8,217.5 L 391.1,217.7 L 392.4,218.0 L 393.7,218.2 L 395.0,218.4 L 396.3,218.6 L 397.6,218.9 L 398.9,219.1 L 400.2,219.3 L 401.5,219.5 L 402.8,219.7 L 404.1,219.9 L 405.4,220.1 L 406.7,220.3 L 408.0,220.5 L 409.3,220.7 L 410.6,220.9 L 411.9,221.1 L 413.2,221.3 L 414.5,221.4 L 415.8,221.6 L 417.1,221.8 L 418.4,221.9 L 419.7,222.1 L 421.0,222.3 L 422.3,222.4 L 423.6,222.6 L 424.9,222.7 L 426.2,222.9 L 427.5,223.0 L 428.8,223.1 L 430.1,223.3 L 431.4,223.4 L 432.7,223.6 L 434.0,223.7 L 435.3,223.8 L 436.6,223.9 L 437.9,224.1 L 439.2,224.2 L 440.5,224.3 L 441.8,224.4 L 443.1,224.5 L 444.4,224.6 L 445.7,224.7 L 447.0,224.9 L 448.3,225.0 L 449.6,225.1 L 450.9,225.2 L 452.2,225.3 L 453.5,225.4 L 454.8,225.4 L 456.1,225.5 L 457.4,225.6 L 458.7,225.7 L 460.0,225.8 L 461.3,225.9 L 462.6,226.0 L 463.9,226.1 L 465.2,226.1 L 466.5,226.2 L 467.8,226.3 L 469.1,226.4 L 470.4,226.4 L 471.7,226.5 L 473.0,226.6 L 474.3,226.7 L 475.6,226.7 L 476.9,226.8 L 478.2,226.9 L 479.5,226.9 L 480.8,227.0 L 482.1,227.1 L 483.4,227.1 L 484.7,227.2 L 486.0,227.2 L 487.3,227.3 L 488.6,227.3 L 489.9,227.4 L 491.2,227.4 L 492.5,227.5 L 493.8,227.6 L 495.1,227.6 L 496.4,227.7 L 497.7,227.7 L 499.0,227.7 L 500.3,227.8 L 501.6,227.8 L 502.9,227.9 L 504.2,227.9 L 505.5,228.0 L 506.8,228.0 L 508.1,228.1 L 509.4,228.1 L 510.7,228.1 L 512.0,228.2 L 513.3,228.2 L 514.6,228.2 L 515.9,228.3 L 517.2,228.3 L 518.5,228.4 L 519.8,228.4 L 521.1,228.4 L 522.4,228.5 L 523.7,228.5 L 525.0,228.5 L 526.3,228.5 L 527.6,228.6 L 528.9,228.6 L 530.2,228.6 L 531.5,228.7 L 532.8,228.7 L 534.1,228.7 L 535.4,228.7 L 536.7,228.8 L 538.0,228.8 L 539.3,228.8 L 540.6,228.8 L 541.9,228.9 L 543.2,228.9 L 544.5,228.9 L 545.8,228.9 L 547.1,229.0 L 548.4,229.0 L 549.7,229.0 L 551.0,229.0 L 552.3,229.0 L 553.6,229.1 L 554.9,229.1 L 556.2,229.1 L 557.5,229.1 L 558.8,229.1 L 560.1,229.2 L 561.4,229.2 L 562.7,229.2 L 564.0,229.2 L 565.3,229.2 L 566.6,229.2 L 567.9,229.3 L 569.2,229.3 L 570.5,229.3 L 571.8,229.3 L 573.1,229.3 L 574.4,229.3 L 575.7,229.3 L 577.0,229.4 L 578.3,229.4 L 579.6,229.4 L 580.9,229.4 L 582.2,229.4 L 583.5,229.4 L 584.8,229.4 L 586.1,229.4 L 587.4,229.5 L 588.7,229.5 L 590.0,229.5" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M 70.0,230.0 L 71.3,230.0 L 72.6,230.0 L 73.9,230.0 L 75.2,230.0 L 76.5,230.0 L 77.8,229.9 L 79.1,229.9 L 80.4,229.9 L 81.7,229.9 L 83.0,229.9 L 84.3,229.9 L 85.6,229.9 L 86.9,229.9 L 88.2,229.9 L 89.5,229.8 L 90.8,229.8 L 92.1,229.8 L 93.4,229.8 L 94.7,229.8 L 96.0,229.7 L 97.3,229.7 L 98.6,229.7 L 99.9,229.7 L 101.2,229.7 L 102.5,229.6 L 103.8,229.6 L 105.1,229.6 L 106.4,229.5 L 107.7,229.5 L 109.0,229.5 L 110.3,229.4 L 111.6,229.4 L 112.9,229.4 L 114.2,229.3 L 115.5,229.3 L 116.8,229.2 L 118.1,229.2 L 119.4,229.1 L 120.7,229.1 L 122.0,229.0 L 123.3,229.0 L 124.6,228.9 L 125.9,228.8 L 127.2,228.8 L 128.5,228.7 L 129.8,228.6 L 131.1,228.5 L 132.4,228.4 L 133.7,228.4 L 135.0,228.3 L 136.3,228.2 L 137.6,228.1 L 138.9,228.0 L 140.2,227.8 L 141.5,227.7 L 142.8,227.6 L 144.1,227.5 L 145.4,227.3 L 146.7,227.2 L 148.0,227.0 L 149.3,226.8 L 150.6,226.7 L 151.9,226.5 L 153.2,226.3 L 154.5,226.1 L 155.8,225.9 L 157.1,225.7 L 158.4,225.4 L 159.7,225.2 L 161.0,225.0 L 162.3,224.7 L 163.6,224.4 L 164.9,224.1 L 166.2,223.8 L 167.5,223.5 L 168.8,223.2 L 170.1,222.8 L 171.4,222.5 L 172.7,222.1 L 174.0,221.7 L 175.3,221.3 L 176.6,220.8 L 177.9,220.4 L 179.2,219.9 L 180.5,219.4 L 181.8,218.9 L 183.1,218.4 L 184.4,217.8 L 185.7,217.3 L 187.0,216.7 L 188.3,216.1 L 189.6,215.4 L 190.9,214.7 L 192.2,214.1 L 193.5,213.3 L 194.8,212.6 L 196.1,211.8 L 197.4,211.1 L 198.7,210.2 L 200.0,209.4 L 201.3,208.5 L 202.6,207.6 L 203.9,206.7 L 205.2,205.8 L 206.5,204.8 L 207.8,203.8 L 209.1,202.8 L 210.4,201.7 L 211.7,200.7 L 213.0,199.6 L 214.3,198.4 L 215.6,197.3 L 216.9,196.1 L 218.2,194.9 L 219.5,193.7 L 220.8,192.5 L 222.1,191.2 L 223.4,189.9 L 224.7,188.6 L 226.0,187.3 L 227.3,186.0 L 228.6,184.6 L 229.9,183.2 L 231.2,181.8 L 232.5,180.4 L 233.8,179.0 L 235.1,177.6 L 236.4,176.2 L 237.7,174.7 L 239.0,173.2 L 240.3,171.8 L 241.6,170.3 L 242.9,168.8 L 244.2,167.3 L 245.5,165.8 L 246.8,164.3 L 248.1,162.9 L 249.4,161.4 L 250.7,159.9 L 252.0,158.4 L 253.3,156.9 L 254.6,155.4 L 255.9,153.9 L 257.2,152.4 L 258.5,150.9 L 259.8,149.4 L 261.1,148.0 L 262.4,146.5 L 263.7,145.1 L 265.0,143.6 L 266.3,142.2 L 267.6,140.7 L 268.9,139.3 L 270.2,137.9 L 271.5,136.5 L 272.8,135.1 L 274.1,133.8 L 275.4,132.4 L 276.7,131.0 L 278.0,129.7 L 279.3,128.4 L 280.6,127.1 L 281.9,125.8 L 283.2,124.5 L 284.5,123.2 L 285.8,122.0 L 287.1,120.8 L 288.4,119.5 L 289.7,118.3 L 291.0,117.1 L 292.3,116.0 L 293.6,114.8 L 294.9,113.6 L 296.2,112.5 L 297.5,111.4 L 298.8,110.3 L 300.1,109.2 L 301.4,108.1 L 302.7,107.1 L 304.0,106.0 L 305.3,105.0 L 306.6,104.0 L 307.9,103.0 L 309.2,102.0 L 310.5,101.1 L 311.8,100.1 L 313.1,99.2 L 314.4,98.3 L 315.7,97.4 L 317.0,96.5 L 318.3,95.6 L 319.6,94.7 L 320.9,93.9 L 322.2,93.1 L 323.5,92.2 L 324.8,91.4 L 326.1,90.6 L 327.4,89.9 L 328.7,89.1 L 330.0,88.4 L 331.3,87.6 L 332.6,86.9 L 333.9,86.2 L 335.2,85.5 L 336.5,84.8 L 337.8,84.1 L 339.1,83.4 L 340.4,82.8 L 341.7,82.1 L 343.0,81.5 L 344.3,80.9 L 345.6,80.3 L 346.9,79.7 L 348.2,79.1 L 349.5,78.5 L 350.8,78.0 L 352.1,77.4 L 353.4,76.9 L 354.7,76.3 L 356.0,75.8 L 357.3,75.3 L 358.6,74.8 L 359.9,74.3 L 361.2,73.8 L 362.5,73.3 L 363.8,72.9 L 365.1,72.4 L 366.4,72.0 L 367.7,71.5 L 369.0,71.1 L 370.3,70.7 L 371.6,70.3 L 372.9,69.9 L 374.2,69.4 L 375.5,69.1 L 376.8,68.7 L 378.1,68.3 L 379.4,67.9 L 380.7,67.6 L 382.0,67.2 L 383.3,66.9 L 384.6,66.5 L 385.9,66.2 L 387.2,65.8 L 388.5,65.5 L 389.8,65.2 L 391.1,64.9 L 392.4,64.6 L 393.7,64.3 L 395.0,64.0 L 396.3,63.7 L 397.6,63.4 L 398.9,63.2 L 400.2,62.9 L 401.5,62.6 L 402.8,62.4 L 404.1,62.1 L 405.4,61.9 L 406.7,61.6 L 408.0,61.4 L 409.3,61.1 L 410.6,60.9 L 411.9,60.7 L 413.2,60.5 L 414.5,60.3 L 415.8,60.0 L 417.1,59.8 L 418.4,59.6 L 419.7,59.4 L 421.0,59.2 L 422.3,59.0 L 423.6,58.9 L 424.9,58.7 L 426.2,58.5 L 427.5,58.3 L 428.8,58.1 L 430.1,58.0 L 431.4,57.8 L 432.7,57.6 L 434.0,57.5 L 435.3,57.3 L 436.6,57.2 L 437.9,57.0 L 439.2,56.9 L 440.5,56.7 L 441.8,56.6 L 443.1,56.5 L 444.4,56.3 L 445.7,56.2 L 447.0,56.1 L 448.3,55.9 L 449.6,55.8 L 450.9,55.7 L 452.2,55.6 L 453.5,55.4 L 454.8,55.3 L 456.1,55.2 L 457.4,55.1 L 458.7,55.0 L 460.0,54.9 L 461.3,54.8 L 462.6,54.7 L 463.9,54.6 L 465.2,54.5 L 466.5,54.4 L 467.8,54.3 L 469.1,54.2 L 470.4,54.1 L 471.7,54.0 L 473.0,53.9 L 474.3,53.9 L 475.6,53.8 L 476.9,53.7 L 478.2,53.6 L 479.5,53.5 L 480.8,53.5 L 482.1,53.4 L 483.4,53.3 L 484.7,53.2 L 486.0,53.2 L 487.3,53.1 L 488.6,53.0 L 489.9,53.0 L 491.2,52.9 L 492.5,52.8 L 493.8,52.8 L 495.1,52.7 L 496.4,52.7 L 497.7,52.6 L 499.0,52.5 L 500.3,52.5 L 501.6,52.4 L 502.9,52.4 L 504.2,52.3 L 505.5,52.3 L 506.8,52.2 L 508.1,52.2 L 509.4,52.1 L 510.7,52.1 L 512.0,52.0 L 513.3,52.0 L 514.6,51.9 L 515.9,51.9 L 517.2,51.9 L 518.5,51.8 L 519.8,51.8 L 521.1,51.7 L 522.4,51.7 L 523.7,51.7 L 525.0,51.6 L 526.3,51.6 L 527.6,51.6 L 528.9,51.5 L 530.2,51.5 L 531.5,51.4 L 532.8,51.4 L 534.1,51.4 L 535.4,51.4 L 536.7,51.3 L 538.0,51.3 L 539.3,51.3 L 540.6,51.2 L 541.9,51.2 L 543.2,51.2 L 544.5,51.1 L 545.8,51.1 L 547.1,51.1 L 548.4,51.1 L 549.7,51.0 L 551.0,51.0 L 552.3,51.0 L 553.6,51.0 L 554.9,50.9 L 556.2,50.9 L 557.5,50.9 L 558.8,50.9 L 560.1,50.9 L 561.4,50.8 L 562.7,50.8 L 564.0,50.8 L 565.3,50.8 L 566.6,50.8 L 567.9,50.7 L 569.2,50.7 L 570.5,50.7 L 571.8,50.7 L 573.1,50.7 L 574.4,50.7 L 575.7,50.6 L 577.0,50.6 L 578.3,50.6 L 579.6,50.6 L 580.9,50.6 L 582.2,50.6 L 583.5,50.5 L 584.8,50.5 L 586.1,50.5 L 587.4,50.5 L 588.7,50.5 L 590.0,50.5" fill="none" stroke="#15803d" stroke-width="2.5" stroke-linejoin="round"/>
  <line x1="249.4" y1="230.0" x2="249.4" y2="170.1" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="117.6" y="62.8" fill="#1d4ed8" font-size="12" text-anchor="start" font-weight="700">S (khỏe) giảm dần</text>
  <text x="257.4" y="166.1" fill="#dc2626" font-size="12" text-anchor="start" font-weight="700">I đỉnh ngày ≈ 34 (≈32k)</text>
  <text x="486.0" y="68.5" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">R → final size ≈ 94k</text>
  <text x="586.0" y="212.1" fill="#1d4ed8" font-size="11" text-anchor="end">S còn ≈ 5.2k</text>
  <text x="226.0" y="116.0" fill="#475569" font-size="11" text-anchor="middle">R đuổi theo S</text>
  <text x="300.0" y="268.0" fill="#475569" font-size="12" text-anchor="middle">S giảm dần · I vọt lên rồi tắt · R tăng đều tới final size (N = 100k, R₀ ≈ 3.1)</text>
</svg>

### Bước 5 — Diễn giải kết quả & kiểm chứng

**Trả lời 3 câu hỏi bước 1:**
- (a) $R_0 = 2.5 > 1$ → **bùng phát** ✓ (khớp: $I$ tăng từ 10 lên ~15 900).
- (b) **Đỉnh dịch** $\approx 15\,900$ người nhiễm cùng lúc, vào **ngày ~34**. Lý thuyết SIR cho đỉnh khi $S = N/R_0 = 100000/2.5 = 40\,000$; bảng cho thấy $I$ đạt đỉnh đúng quanh lúc $S$ tụt qua $40\,000$ (giữa ngày 25 và 34) ✓ — một *kiểm chứng nội bộ* tốt.
- (c) **Final size**: khi dịch tắt ($t = 100$, $I \to 0$), $R \approx 94\,100$ → tức **~94% dân số từng mắc**. $S$ còn lại $\approx 5\,250$ người **không bao giờ nhiễm** (thoát nhờ "miễn dịch cộng đồng" hình thành khi $S$ tụt dưới ngưỡng).

**Các kiểm chứng (validation):**
- **Bảo toàn**: mọi dòng $S + I + R = 100\,000$ ✓.
- **Giới hạn $t \to \infty$**: $I \to 0$ (dịch phải tắt), $R$ phẳng dần ✓.
- **Ngưỡng đỉnh**: $I$ đạt đỉnh đúng lúc $S = N/R_0$ ✓ (công thức lý thuyết khớp số Euler).
- **Hội tụ Euler**: chạy lại $\Delta t = 0.25$ → đỉnh dịch chỉ lệch ~2% (15 900 → ~16 200) → $\Delta t = 1$ đủ tốt cho mục đích "ước lượng đỉnh".

### Bước 6 — Đánh giá hạn chế & tinh chỉnh

⚠ **Hạn chế (mỗi cái kèm ảnh hưởng + hướng sửa):**

1. **"Trộn đều" sai thực tế.** Người ta tụ theo khu phố, trường học, gia đình — không gặp ngẫu nhiên toàn thành phố. Hậu quả: SIR thường *thổi phồng* tốc độ lan giai đoạn đầu. Sửa: mô hình **mạng (network)** hoặc chia ngăn theo độ tuổi/khu vực (metapopulation).
2. **Bỏ ủ bệnh.** Người mới nhiễm thường chưa lây ngay (thời gian ủ bệnh). Sửa: thêm ngăn **E (Exposed)** → mô hình **SEIR**.
3. **$\beta, \gamma$ cố định.** Thực tế khi dịch bùng, người dân đeo khẩu trang, giãn cách → $\beta$ *giảm theo thời gian*. Hậu quả: SIR cố định dự báo đỉnh *cao và sớm hơn* thực tế. Sửa: cho $\beta(t)$ giảm sau mốc can thiệp.
4. **Bỏ ngẫu nhiên.** Với $I_0 = 10$ nhỏ, dịch có thể *tình cờ tắt* dù $R_0 > 1$. Sửa: bọc bằng **Monte Carlo / mô hình ngẫu nhiên** ([L07](../lesson-07-stochastic-monte-carlo/)) — chạy 1000 kịch bản để ra *xác suất bùng phát* và *khoảng* đỉnh, thay vì một con số.

🔁 **Dừng lại tự kiểm tra (SIR):** nếu giữ $\gamma = 0.2$ nhưng hạ $\beta = 0.15$/ngày, dịch có bùng phát không? Đỉnh thay đổi ra sao về định tính?

<details><summary>Đáp án</summary>

$R_0 = \beta/\gamma = 0.15/0.2 = 0.75 < 1$ → **dịch tự tắt**, không bùng phát. $I$ chỉ giảm dần từ 10 về 0; không có đỉnh nào vượt giá trị đầu. Đây là lý do các biện pháp "hạ $\beta$" (khẩu trang, giãn cách) hiệu quả: kéo $R_0$ xuống dưới 1 là dập được dịch.

</details>

📝 **Tóm tắt dự án SIR**: chia dân thành $S/I/R$ → hệ 3 ODE với $\beta$ (lây), $\gamma$ (khỏi) → $R_0 = \beta/\gamma$ quyết định bùng/tắt → giải Euler bảng từng ngày → đỉnh ~15 900 ngày ~34, final size ~94% → kiểm chứng bằng bảo toàn + ngưỡng $S = N/R_0$ → hạn chế (trộn đều, $\beta$ cố định) + hướng SEIR/Monte Carlo. **Chu trình 6 bước trọn vẹn.**

---

## 4. Dự án mẫu HOÀN CHỈNH — Tối ưu sản xuất bằng quy hoạch tuyến tính (LP)

Dự án thứ hai để bạn thấy capstone **không chỉ là ODE**. Đây là bài toán *tối ưu* (L06), giải bằng tay với 2 biến để nhìn được hình học.

### Bước 1 — Bài toán

Một xưởng mộc làm 2 sản phẩm: **bàn** (lời 300k/cái) và **ghế** (lời 100k/cái). Tuần này có **40 giờ máy cắt** và **120 giờ thợ lắp**. Mỗi cái cần:

| | Giờ cắt | Giờ lắp | Lời (nghìn) |
|---|---|---|---|
| Bàn | 2 | 4 | 300 |
| Ghế | 1 | 3 | 100 |

**Câu hỏi**: làm **bao nhiêu bàn ($x$), bao nhiêu ghế ($y$)** để **lời tối đa**, không vượt nguồn lực?

### Bước 2 — Giả định
1. Lời tuyến tính theo số lượng (không giảm giá theo lô).
2. Bán hết được, không tồn kho (cầu không giới hạn).
3. $x, y \ge 0$ và *liên tục* (cho phép số lẻ, rồi làm tròn — đơn giản hóa; bài nguyên thật cần LP nguyên).
4. Hai nguồn lực (cắt, lắp) là ràng buộc duy nhất.

### Bước 3 — Lập mô hình (LP)

$$\begin{aligned}
\text{max } \quad & P = 300x + 100y &&\text{(hàm mục tiêu: lợi nhuận)}\\
\text{với } \quad & 2x + 1y \le 40 &&\text{(giờ cắt)}\\
& 4x + 3y \le 120 &&\text{(giờ lắp)}\\
& x \ge 0,\; y \ge 0
\end{aligned}$$

**Kiểm thứ nguyên**: $[2x] = \frac{\text{giờ}}{\text{bàn}}\cdot\text{bàn} = $ giờ ✓ vế trái ràng buộc cùng đơn vị "giờ" với vế phải.

### Bước 4 — Giải (hình học: tìm đỉnh miền khả thi)

💡 **Trực giác**: nghiệm tối ưu của LP *luôn nằm ở một đỉnh (góc)* của miền khả thi (đa giác) — không bao giờ ở giữa. Nên chỉ cần liệt kê các đỉnh, tính $P$ tại mỗi đỉnh, lấy lớn nhất.

Tìm các đỉnh (giao của các đường ràng buộc), kiểm mỗi điểm có thỏa *cả hai* ràng buộc không:
- **A** $(0,0)$: gốc — luôn hợp lệ.
- **B** $(20, 0)$: cắt giao trục $x$, $2x = 40 \Rightarrow x = 20$. Kiểm lắp: $4\cdot20 + 0 = 80 \le 120$ ✓ → hợp lệ.
- **C** $(0, 40)$: cắt giao trục $y$, $1y = 40 \Rightarrow y = 40$. Kiểm lắp: $0 + 3\cdot40 = 120 \le 120$ ✓ (chạm sát) → hợp lệ.
- **Giao hai đường ràng buộc** $2x + y = 40$ và $4x + 3y = 120$: từ (1) $y = 40 - 2x$, thế vào (2): $4x + 3(40 - 2x) = 120 \Rightarrow 4x + 120 - 6x = 120 \Rightarrow -2x = 0 \Rightarrow x = 0,\ y = 40$ — **trùng đúng đỉnh C**. Tức hai đường cắt nhau ngay tại $(0,40)$; trên trục $x$ thì đường lắp $(30,0)$ bị đường cắt $(20,0)$ chặn trước. Vậy miền khả thi là **tam giác** đỉnh $A, B, C$, biên trên do ràng buộc cắt (chặt hơn) quyết định.

Liệt kê 3 đỉnh và tính $P$ tại mỗi đỉnh:

| Đỉnh | $(x, y)$ | $P = 300x + 100y$ | Ghi chú |
|---|---|---|---|
| A | $(0, 0)$ | 0 | không làm gì |
| B | $(20, 0)$ | $300\cdot20 = \mathbf{6000}$ | dồn hết làm bàn |
| C | $(0, 40)$ | $100\cdot40 = 4000$ | dồn hết làm ghế |

**Miền khả thi** (vùng tô là khả thi, ★ là đỉnh tối ưu):

<svg viewBox="0 0 500 270" style="max-width:500px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Miền khả thi bàn–ghế: dưới ràng buộc cắt 2x + y = 40 (ràng buộc lắp 4x + 3y = 120 lỏng hơn, không chạm); tối ưu tại đỉnh B (20, 0) với P = 6000">
  <defs><marker id="ar15" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="110.0" y1="230.0" x2="110.0" y2="18.8"/>
<line x1="160.0" y1="230.0" x2="160.0" y2="18.8"/>
<line x1="210.0" y1="230.0" x2="210.0" y2="18.8"/>
<line x1="260.0" y1="230.0" x2="260.0" y2="18.8"/>
<line x1="360.0" y1="230.0" x2="360.0" y2="18.8"/>
<line x1="60.0" y1="182.0" x2="390.0" y2="182.0"/>
<line x1="60.0" y1="134.0" x2="390.0" y2="134.0"/>
<line x1="60.0" y1="86.0" x2="390.0" y2="86.0"/>
<line x1="60.0" y1="38.0" x2="390.0" y2="38.0"/>
</g>
  <line x1="54.0" y1="230.0" x2="412.0" y2="230.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar15)"/>
  <line x1="60.0" y1="236.0" x2="60.0" y2="-3.2" stroke="#1a202c" stroke-width="1.5" marker-end="url(#ar15)"/>
  <text x="404.0" y="246.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">x (bàn)</text>
  <text x="68.0" y="6.8" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">y (ghế)</text>
  <line x1="110.0" y1="226.0" x2="110.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="110.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">5</text>
  <line x1="160.0" y1="226.0" x2="160.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="160.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">10</text>
  <line x1="210.0" y1="226.0" x2="210.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="210.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">15</text>
  <line x1="260.0" y1="226.0" x2="260.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="260.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">20</text>
  <line x1="360.0" y1="226.0" x2="360.0" y2="234.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="360.0" y="246.0" fill="#475569" font-size="11" text-anchor="middle">30</text>
  <line x1="56.0" y1="182.0" x2="64.0" y2="182.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="186.0" fill="#475569" font-size="11" text-anchor="end">10</text>
  <line x1="56.0" y1="134.0" x2="64.0" y2="134.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="138.0" fill="#475569" font-size="11" text-anchor="end">20</text>
  <line x1="56.0" y1="86.0" x2="64.0" y2="86.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="90.0" fill="#475569" font-size="11" text-anchor="end">30</text>
  <line x1="56.0" y1="38.0" x2="64.0" y2="38.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="53.0" y="42.0" fill="#475569" font-size="11" text-anchor="end">40</text>
  <path d="M 60.0,230.0 L 260.0,230.0 L 60.0,38.0 Z" fill="#1d4ed8" stroke="#1d4ed8" stroke-width="0" fill-opacity="0.3" stroke-linejoin="round"/>
  <path d="M 60.0,38.0 L 160.0,134.0 L 260.0,230.0" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M 60.0,38.0 L 210.0,134.0 L 360.0,230.0" fill="none" stroke="#15803d" stroke-width="2.5" stroke-linejoin="round" stroke-dasharray="6 4"/>
  <text x="165.0" y="153.2" fill="#dc2626" font-size="12" text-anchor="end" font-weight="700">cắt: 2x + y = 40</text>
  <text x="236.0" y="128.0" fill="#15803d" font-size="12" text-anchor="start" font-weight="700">lắp: 4x + 3y = 120 (lỏng hơn)</text>
  <text x="110.0" y="201.2" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">KHẢ THI</text>
  <circle cx="60.0" cy="38.0" r="5" fill="#1a202c"/>
  <text x="70.0" y="42.0" fill="#1a202c" font-size="11" text-anchor="start">C (0, 40)</text>
  <circle cx="260.0" cy="230.0" r="7" fill="#7c3aed"/>
  <text x="272.0" y="220.0" fill="#7c3aed" font-size="12" text-anchor="start" font-weight="700">★ B (20, 0): tối ưu, P = 6000</text>
  <text x="54.0" y="246.0" fill="#475569" font-size="11" text-anchor="end">A</text>
</svg>

**Tối ưu: làm 20 bàn, 0 ghế, lời 6 000 nghìn = 6 triệu/tuần.**

### Bước 5 — Diễn giải & kiểm chứng

- Ràng buộc cắt *chặt* ($2\cdot20 = 40 = 40$, dùng hết giờ cắt); ràng buộc lắp *lỏng* ($4\cdot20 = 80 < 120$, thừa 40 giờ lắp). → **Giờ cắt là nút thắt cổ chai (bottleneck)**.
- **Giá bóng (shadow price)** của giờ cắt: thêm 1 giờ cắt cho phép làm thêm $1/2$ bàn → +150k lời. Thêm 1 giờ lắp: +0 (đang thừa). → Nếu thuê thêm nhân công, **đầu tư vào khâu cắt, không phải lắp**.
- Kiểm trực giác: bàn lời 300/2 giờ cắt = 150k/giờ cắt; ghế lời 100/1 giờ cắt = 100k/giờ cắt → bàn "đáng giá" hơn mỗi giờ cắt → dồn làm bàn là hợp lý ✓.

### Bước 6 — Hạn chế

⚠ Hạn chế: (1) Giả định "bán hết" — thực tế cầu hữu hạn, nên thêm ràng buộc $x \le$ số bàn bán được. (2) Lời tuyến tính — số lượng lớn thường phải giảm giá. (3) Nghiệm "0 ghế" rủi ro: nếu cầu ghế đột biến mà ta không có hàng → mất khách; thực tế thêm ràng buộc $y \ge y_{\min}$ để giữ đa dạng.

📝 **Tóm tắt dự án LP**: max lợi nhuận tuyến tính dưới ràng buộc nguồn lực → liệt kê đỉnh miền khả thi → tối ưu ở đỉnh → 20 bàn/6 triệu; cắt là bottleneck (giá bóng 150k/giờ) → hạn chế cầu hữu hạn & đa dạng sản phẩm.

---

## 5. Checklist & rubric tự đánh giá dự án

**Checklist nhanh (đủ bước chưa?):**

- [ ] **Câu hỏi rõ ràng**: đầu ra là *số/đại lượng* nào? (không mơ hồ)
- [ ] **Giả định liệt kê đầy đủ** + lý do bỏ qua từng yếu tố.
- [ ] **Chọn loại mô hình** đúng theo bản đồ mục 1 (rời rạc/liên tục/hệ/tối ưu/ngẫu nhiên).
- [ ] **Kiểm thứ nguyên** hai vế mọi phương trình (L01).
- [ ] **Fit tham số từ dữ liệu** nếu có (L02), nêu $R^2$/sai số.
- [ ] **Giải/mô phỏng** và rút đại lượng cần trả lời (bảng/đồ thị).
- [ ] **Kiểm chứng**: giới hạn ($t\to0,\ t\to\infty$), bảo toàn, so dữ liệu/trực giác, đơn vị hợp lý.
- [ ] **Nêu hạn chế** rõ ràng + hướng tinh chỉnh.

**Rubric chấm điểm (thang 100 — tự chấm dự án của bạn):**

| Tiêu chí | Yếu (0–50%) | Khá (50–80%) | Tốt (80–100%) | Điểm |
|----------|-------------|--------------|---------------|:---:|
| **Phát biểu vấn đề** (15đ) | Câu hỏi mơ hồ, không nêu đại lượng cần ra | Có câu hỏi nhưng đầu ra chưa thật cụ thể | Câu hỏi rõ, nêu đúng *số/đại lượng* cần tìm | __/15 |
| **Giả định** (15đ) | Thiếu, hoặc không giải thích | Có liệt kê nhưng thiếu lý do | Đầy đủ + lý do bỏ qua từng yếu tố | __/15 |
| **Mô hình toán** (20đ) | Sai loại mô hình; không kiểm đơn vị | Đúng loại nhưng lỏng lẻo | Đúng loại + kiểm thứ nguyên 2 vế | __/20 |
| **Giải / số liệu** (20đ) | Không có số thật, chỉ công thức | Có giải nhưng thiếu bảng/bước | Bảng số / Euler từng bước + đồ thị | __/20 |
| **Kiểm chứng** (15đ) | Không kiểm | Kiểm 1 thứ (vd $t\to\infty$) | Kiểm ≥ 2 cách (giới hạn, bảo toàn, dữ liệu) | __/15 |
| **Hạn chế & phản biện** (15đ) | "Mô hình hoàn hảo" | Nêu 1 hạn chế | Nêu ≥ 2 hạn chế + hướng tinh chỉnh + độ nhạy | __/15 |

🔁 **Tự kiểm tra rubric**: dự án video viral ở mục 2 nếu đem chấm thì *yếu* ở tiêu chí nào nhất?

<details><summary>Đáp án</summary>

Yếu nhất ở **Giả định / Phản biện** liên quan $K$: $K = 10^6$ chỉ là *đoán*, và fit $r$ chỉ từ 3 điểm. Để lên "Tốt", phải thêm phân tích độ nhạy với $K$ và dùng ≥ 6 điểm có $R^2$ — đúng những gì callout phản biện mục 2 (Bước 7) đã chỉ ra.

</details>

---

## 6. Bài tập

**Bài 1 (có hướng dẫn).** Mô hình hóa "cốc trà sữa nguội trong phòng máy lạnh 20°C, ban đầu 80°C". Đi đủ 6 bước ở mức tối giản: chọn mô hình, viết phương trình, nêu cần đo gì để fit tham số, và 1 hạn chế.

**Bài 2 (dự án mở).** Chọn MỘT trong các đề và phác chu trình 6 bước (không cần giải chi tiết, chỉ nêu: câu hỏi, giả định chính, loại mô hình + lý do, cần dữ liệu gì để kiểm chứng, 1 hạn chế):
- (a) Lượng pin điện thoại còn lại theo thời gian dùng.
- (b) Số người biết một tin đồn trong lớp 40 người theo thời gian.
- (c) Tối ưu số bàn/ghế một xưởng nên làm tuần này để lời nhất với gỗ và công có hạn.
- (d) Thời gian chờ trung bình ở quầy thanh toán giờ cao điểm.

**Bài 3 (SIR — có hướng dẫn).** Dùng đúng mô hình SIR mục 3 với $N = 100\,000$, nhưng đổi tham số $\beta = 0.4$/ngày, $\gamma = 0.25$/ngày. (a) Tính $R_0$ và dự đoán dịch bùng hay tắt. (b) Chạy Euler $\Delta t = 1$ ba bước đầu từ $S_0 = 99\,990, I_0 = 10$. (c) Ngưỡng $S$ tại đỉnh dịch là bao nhiêu?

**Bài 4 (LP — có hướng dẫn).** Xưởng mục 4 đổi giá: bàn lời 200k, ghế lời 150k (ràng buộc cắt/lắp giữ nguyên: $2x + y \le 40$, $4x + 3y \le 120$). Tính lại $P$ tại 3 đỉnh $A(0,0), B(20,0), C(0,40)$ và tìm phương án tối ưu mới.

### Gợi ý ≥ 4 đề tài dự án để bạn tự làm trọn chu trình

Mỗi đề dưới đây đủ để đi đủ 6 bước; ngoặc nêu *loại mô hình + lesson*:

1. **Lan truyền tin giả trên mạng xã hội một trường** (logistic / SIR, L04–L05): bao giờ 80% học sinh biết tin? Có "người gỡ tin" thì thêm ngăn $R$.
2. **Dự báo doanh số sản phẩm mới 12 tháng** (curve fitting + ngoại suy, L02): fit đường cong Bass/logistic vào 4 tháng đầu, ngoại suy — kèm cảnh báo over-extrapolation.
3. **Tối ưu thực đơn ký túc xá rẻ nhất mà đủ dinh dưỡng** (LP, L06): biến = khẩu phần mỗi món; ràng buộc = đủ calo/đạm; mục tiêu = min chi phí (bài toán "diet problem" kinh điển).
4. **Mô phỏng thời gian chờ quầy cà phê giờ cao điểm** (Monte Carlo / hàng đợi, L07): khách đến theo Poisson, mô phỏng 1000 lần ra phân phối thời gian chờ và xác suất chờ > 5 phút.
5. **Tăng trưởng đàn cá trong hồ có đánh bắt** (logistic + thu hoạch, L04): $\frac{dN}{dt} = rN(1 - N/K) - h$; mức đánh bắt $h$ nào thì bền vững, mức nào làm tuyệt chủng?
6. **Lãi kép vs lạm phát — bao lâu tiền tiết kiệm mất nửa sức mua** (sai phân, L03): mô hình rời rạc theo năm, so hai tốc độ.

⚠ **Bẫy chung khi tự làm dự án** (đọc trước khi bắt đầu):
- **Chọn mô hình quá phức tạp ngay từ đầu** — luôn bắt đầu bằng mô hình *đơn giản nhất có thể* (vd mũ trước logistic), chỉ thêm chi tiết khi đơn giản không đủ.
- **Bịa dữ liệu cho khớp mô hình** — phải để dữ liệu *kiểm chứng* mô hình, không phải ngược lại.
- **Quên đơn vị / không kiểm thứ nguyên** — nguồn sai số thầm lặng nhất.
- **Không nêu hạn chế** — một dự án không có mục hạn chế là dự án chưa xong (xem rubric mục 5).

---

## 7. Lời giải / gợi ý

**Bài 1.**
1. *Bài toán*: $T(t) = $ nhiệt độ trà sữa; hỏi bao lâu xuống mức uống được (vd 40°C).
2. *Giả định*: phòng 20°C không đổi; trà sữa trộn đều một nhiệt độ; tốc độ mất nhiệt tỉ lệ chênh lệch (Newton); bỏ qua bay hơi.
3. *Mô hình* (L04): $\frac{dT}{dt} = -k(T - 20) \to T(t) = 20 + (80 - 20)e^{-kt} = 20 + 60e^{-kt}$. Kiểm thứ nguyên $[k] = $ thời gian$^{-1}$.
4. *Cần đo để fit $k$* (L02): một (hoặc vài) điểm $(t, T)$ — vd "sau 10 phút còn 50°C" → $50 = 20 + 60e^{-10k} \to e^{-10k} = 1/2 \to k = \ln 2/10 \approx 0.069$/phút. Nhiều điểm thì fit tuyến tính $\ln(T-20)$ theo $t$.
5. *Giải*: thời gian đạt 40°C: $40 = 20 + 60e^{-kt} \to e^{-kt} = 1/3 \to t = \ln 3/k \approx 1.0986/0.069 \approx$ **16 phút**.
6. *Kiểm chứng & hạn chế*: $T(0) = 80$ ✓, $t \to \infty \to 20$ ✓; hạn chế: bỏ qua bay hơi (làm nguội nhanh hơn lúc rất nóng), trà sữa có đá thì mô hình khác hẳn (pha rắn–lỏng).

**Bài 2 — mẫu cho (b) tin đồn trong lớp 40 người:**
- *Câu hỏi*: sau bao lâu cả lớp biết tin; ngày/giờ nào lan nhanh nhất.
- *Giả định chính*: lan truyền miệng (người biết kể người chưa biết); lớp kín 40 người; ai cũng tiếp xúc đều (trộn đều).
- *Loại mô hình*: **logistic** (L04) hoặc **SIR không hồi phục** (L05) với $K = 40$ — vì tốc độ lan tỉ lệ (số biết)$\times$(số chưa biết). Có thể rời rạc theo giờ (L03).
- *Dữ liệu kiểm chứng*: đếm số người biết tại vài mốc thời gian → fit $r$.
- *Hạn chế*: "trộn đều" sai (lớp có nhóm bạn thân lan nhanh, người ngồi xa lan chậm); một số người không kể lại → cần hệ số lan thực tế $<$ lý thuyết.

(Các đề khác: (a) phân rã/tuyến tính giảm dần — đo % pin theo phút; (c) **LP** L06 — max lợi nhuận với ràng buộc gỗ/công; (d) **hàng đợi ngẫu nhiên / Markov** L07 — khách đến Poisson, mô phỏng Monte Carlo thời gian chờ.)

**Bài 3 (SIR).**
- (a) $R_0 = \beta/\gamma = 0.4/0.25 = \mathbf{1.6} > 1$ → dịch **bùng phát** (nhưng nhẹ hơn ví dụ mục 3 vì $R_0$ nhỏ hơn 2.5).
- (b) Euler $\Delta t = 1$, $\frac{\beta}{N} = 0.4/100000 = 4\times10^{-6}$:
  - Ngày 0→1: ca mới $= 4\times10^{-6}\cdot99990\cdot10 = 4.0$; khỏi $= 0.25\cdot10 = 2.5$. $S_1 = 99\,986$; $I_1 = 10 + 4 - 2.5 = 11.5$; $R_1 = 2.5$. Kiểm: tổng $= 100\,000$ ✓.
  - Ngày 1→2: ca mới $= 4\times10^{-6}\cdot99986\cdot11.5 = 4.6$; khỏi $= 0.25\cdot11.5 = 2.875$. $S_2 = 99\,981$; $I_2 = 11.5 + 4.6 - 2.875 = 13.2$; $R_2 = 5.4$.
  - Ngày 2→3: ca mới $= 4\times10^{-6}\cdot99981\cdot13.2 = 5.3$; khỏi $= 0.25\cdot13.2 = 3.3$. $S_3 = 99\,976$; $I_3 = 13.2 + 5.3 - 3.3 = 15.2$; $R_3 = 8.7$. $I$ tăng dần → khớp $R_0 > 1$.
- (c) Đỉnh dịch khi $S = N/R_0 = 100\,000/1.6 = \mathbf{62\,500}$ người (cao hơn ngưỡng $40\,000$ của ví dụ 2.5 → đỉnh đến sớm hơn về mặt $S$ nhưng số ca đỉnh thấp hơn).

**Bài 4 (LP).** Giá mới $P = 200x + 150y$:

| Đỉnh | $(x,y)$ | $P = 200x + 150y$ |
|---|---|---|
| A | $(0,0)$ | 0 |
| B | $(20,0)$ | $200\cdot20 = 4\,000$ |
| C | $(0,40)$ | $150\cdot40 = \mathbf{6\,000}$ |

**Tối ưu mới: làm 0 bàn, 40 ghế, lời 6 000 nghìn.** Phương án *lật ngược* so với mục 4 (trước là dồn bàn): vì ghế giờ đáng giá hơn mỗi giờ cắt — ghế $150/1 = 150$k/giờ cắt > bàn $200/2 = 100$k/giờ cắt. Bài học: tối ưu LP **rất nhạy với hệ số mục tiêu** — đổi giá nhẹ có thể nhảy hẳn sang đỉnh khác.

---

## 8. Kết thúc Tầng 7 & Math

🎓 Hoàn thành Tầng 7 → **Math khép lại đủ 7 tầng**. Bạn đã có cả *công cụ* (T1–T6: số học → giải tích → đại số tuyến tính → ODE → xác suất) lẫn *cách dùng công cụ* (T7: mô hình hóa). 

Tiếp theo, áp dụng vào các lĩnh vực: [Physics](../../../Physics/) (cơ học, điện từ dùng ODE), [Economics](../../../Economics/) (tối ưu, kinh tế lượng), [AI-ML](../../../AI-ML/) (xác suất, Monte Carlo), [Biology](../../../Biology/) (quần thể, dịch tễ).

## 📝 Tổng kết

1. **Capstone** = phối hợp công cụ L01–L07 trên một bài thực, đi trọn chu trình 6 bước (vòng lặp, không thẳng).
2. **Bản đồ công cụ**: dữ liệu→hồi quy; theo bước→sai phân; liên tục→ODE; tương tác→hệ ODE; tối ưu→LP/Lagrange; may rủi→Monte Carlo/Markov.
3. **Dự án 1 (video viral)**: logistic + fit $r$ (tuyến tính hóa) + Euler + kiểm hội tụ + độ nhạy $K$ → mẫu phản biện mô hình.
4. **Dự án 2 (SIR dịch bệnh)**: hệ 3 ODE $S/I/R$, $R_0 = \beta/\gamma$ quyết bùng/tắt, Euler ra đỉnh ~15 900 ngày ~34 & final size ~94%, kiểm bằng bảo toàn + ngưỡng $S = N/R_0$.
5. **Dự án 3 (LP sản xuất)**: max lợi nhuận tuyến tính, nghiệm ở đỉnh miền khả thi, nhận diện bottleneck + giá bóng; tối ưu rất nhạy với hệ số mục tiêu.
6. **Rubric 6 tiêu chí** (vấn đề/giả định/mô hình/giải/kiểm chứng/hạn chế) để tự chấm dự án.
7. Luôn: câu hỏi rõ → giả định → kiểm thứ nguyên → giải số → kiểm chứng → phản biện & nêu hạn chế.
