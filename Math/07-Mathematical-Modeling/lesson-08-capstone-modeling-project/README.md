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

```
   ┌─────────────────────────────────────────────────────────┐
   │                                                          │
   ▼                                                          │
[1] CÂU HỎI ──► [2] GIẢ ĐỊNH ──► [3] MÔ HÌNH TOÁN            │
 (đại lượng       (đơn giản hóa     (phương trình /           │
  cần trả lời)     thực tế)          hệ / bài toán tối ưu)    │
                                          │                   │
                                          ▼                   │
[6] TINH CHỈNH ◄── [5] KIỂM CHỨNG ◄── [4] GIẢI / MÔ PHỎNG    │
 (nêu hạn chế,      (so dữ liệu,        (số liệu thật,        │
  vòng lại bước 2)   giới hạn t→0,∞)     bảng/đồ thị) ────────┘
```

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

**ASCII đồ thị đường cong logistic $V(t)$ (đường S — sigmoid):**

```
 V (lượt, ×1000)
1000 |                              ___________  ← bão hòa K = 1 000 000
     |                       ___---
 750 |                    _-/
     |                  _/        điểm uốn t* ≈ 8.6 ngày
 500 |- - - - - - - - -*- - - - -  (K/2, lan NHANH NHẤT, 200k lượt/ngày)
     |              _/
 250 |           _-/
     |       __--/
   0 |___---______________________________  t (ngày)
     0    4    8   12   16   20   24
          ↑    ↑
       chậm  bùng nổ
```

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

Đây là dự án "đinh" của capstone: chạm [L01](../lesson-01-modeling-cycle/) (chu trình, thứ nguyên), [L04](../lesson-04-continuous-ode-models/) (ODE), [L05](../lesson-05-interacting-systems/) (hệ ODE nhiều biến, $R_0$), [L02](../lesson-02-empirical-curve-fitting/) (ước lượng tham số), [L07](../lesson-07-stochastic-monte-carlo/) (bọc ngẫu nhiên). Đi trọn 6 bước với **số liệu thật, bảng Euler đầy đủ, ASCII đồ thị**.

### Bước 1 — Bài toán

Một thành phố $N = 100\,000$ dân, xuất hiện một bệnh truyền nhiễm (cúm dạng mới). Ngày 0 có 10 người nhiễm. **Câu hỏi cần trả lời bằng số:**

- (a) Dịch có **bùng phát thành đại dịch** không, hay tự tắt?
- (b) Nếu bùng, **đỉnh dịch** (số người nhiễm cùng lúc cao nhất) là bao nhiêu, vào **ngày thứ mấy**? (để chuẩn bị giường bệnh)
- (c) Tổng cộng **bao nhiêu người từng mắc** khi dịch kết thúc (final size)?

### Bước 2 — Giả định

💡 **Trực giác — chia dân số thành 3 "ngăn" (compartment).** Mỗi người tại một thời điểm thuộc đúng 1 trong 3 nhóm, và chỉ chảy theo một chiều $S \to I \to R$:

```
   [ S ]  ──β·S·I/N──►  [ I ]  ──γ·I──►  [ R ]
 Susceptible          Infected         Recovered
 (chưa nhiễm,        (đang nhiễm,      (đã khỏi/
  có thể nhiễm)       lây cho người)    miễn dịch)
```

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

**ASCII đồ thị 3 đường S, I, R theo thời gian:**

```
người (×1000)
100 |S■■■■■■■■                                  R đạt ~95k (final size)
    |        ■■■■                        ____RRRRRRRRRRRR
 75 |            ■■■               __RRRR
    |               ■■■        _RRR
 50 |                  ■■■   RRR
    |          R đuổi    ■■R■           I (đang nhiễm)
 25 |        theo S       R  ■■■        đỉnh ngày ~34
    |               __III■I■■■  ■■■■S■■■■■■■■■■■■■■■  S còn ~5.2k
  0 |IIIIIIIIIIII■■■■        ■■IIIIIIIII________________
    +----------------------------------------------------- t (ngày)
    0      10      20    30↑   40      50      70     100
                          đỉnh I
   S■■■ giảm dần   I___ vọt lên rồi tắt   R___ tăng đều tới final size
```

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

**ASCII miền khả thi** (vùng tô là khả thi, ★ là đỉnh tối ưu):

```
 y (ghế)
 40 C●__
    |   \__   ràng buộc cắt: 2x + y = 40
 30 |######\__
    |#######  \__
 20 |#KHẢ THỊ###\__   ràng buộc lắp: 4x+3y=120 (lỏng hơn)
    |#############\__
 10 |###############\__
    |#################●B★  ← tối ưu (20, 0), P = 6000
  0 +-------------------●------ x (bàn)
    0    5   10   15   20  30
```

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
