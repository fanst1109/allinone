// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Chemistry/02-Reactions-Thermo/lesson-04-thermochemistry/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 (Tier 2) — Nhiệt động hóa học (Thermochemistry)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **năng lượng** và **nhiệt**, hiểu khái niệm **enthalpy H** và **biến thiên enthalpy $\\Delta H$** của phản ứng.
- Phân loại phản ứng **tỏa nhiệt (exothermic, $\\Delta H < 0$)** và **thu nhiệt (endothermic, $\\Delta H > 0$)**.
- Áp dụng **định luật Hess**: $\\Delta H$ của phản ứng tổng = tổng $\\Delta H$ các bước.
- Tính $\\Delta H$ phản ứng từ **enthalpy hình thành chuẩn $\\Delta H^\\circ_f$** của các chất.
- Hiểu **entropy S** = thước đo "độ hỗn loạn" và **định luật II nhiệt động lực học**.
- Sử dụng **năng lượng tự do Gibbs $\\Delta G = \\Delta H - T\\Delta S$** để dự đoán **chiều tự xảy ra** của phản ứng.
- Liên hệ $\\Delta G$ với **hằng số cân bằng K** ($\\Delta G^\\circ = -RT \\cdot \\ln K$) và với **điện thế pin** ($\\Delta G^\\circ = -n \\cdot F \\cdot E^\\circ$).

## Kiến thức tiền đề

- [Lesson 08 (T1) — Động học & Cân bằng](../../01-Structure/lesson-08-kinetics-equilibrium/) — khái niệm K.
- [Lesson 03 (T2) — Điện hóa](../lesson-03-electrochemistry/) — biết $E^\\circ_\\text{cell}$.

---

## 1. Năng lượng và Enthalpy

### 1.1. Hệ thống vs môi trường

Trong nhiệt động: chia thế giới thành 2 phần:
- **Hệ thống (system)**: vùng ta đang nghiên cứu (vd bình chứa các chất phản ứng).
- **Môi trường (surroundings)**: tất cả phần còn lại.

Năng lượng có thể chuyển đổi giữa hệ và môi trường dưới 2 dạng: **nhiệt (q)** và **công (w)**.

**Định luật I nhiệt động** (bảo toàn năng lượng):

$$\\Delta U = q + w$$

trong đó $\\Delta U$ = biến thiên nội năng của hệ.

### 1.2. Enthalpy

**Enthalpy** (ký hiệu **H**) là một đại lượng đo **tổng "năng lượng tích lũy" trong hệ** ở điều kiện áp suất hằng. Công thức:

$$H = U + P \\cdot V$$

trong đó:
- **U** = nội năng của hệ (tổng năng lượng các liên kết hóa học, chuyển động phân tử...).
- **$P \\cdot V$** = "năng lượng cơ học" hệ phải bỏ ra để đẩy môi trường khi hệ chiếm thể tích V dưới áp suất P.

💡 **Vì sao cần khái niệm H mà không chỉ dùng U?** Vì khi phản ứng diễn ra ở **áp suất hằng** (như trong bình hở, ngoài trời, trong cơ thể...), hệ làm 2 việc cùng lúc:
1. Trao đổi nhiệt với môi trường.
2. Đổi thể tích (nếu phản ứng sinh hoặc tiêu thụ khí).

Đo nhiệt q ở áp suất hằng = đo cả 2 việc gộp lại. Người ta định nghĩa **$H = U + P \\cdot V$** để **$q_P = \\Delta H$** đúng bằng nhiệt trao đổi — thuận tiện hơn nội năng U (vốn chỉ liên quan giai đoạn (1)).

**Cách dùng thực tế**: ở áp suất hằng, **biến thiên $\\Delta H$ = nhiệt mà phản ứng trao đổi với môi trường**.

- **$\\Delta H < 0$** → phản ứng **tỏa nhiệt**: hệ "có ít H hơn" sau phản ứng → phần H thừa thoát ra dưới dạng nhiệt → môi trường nóng lên. Vd đốt $\\text{CH}_4$, trung hòa acid-base, đông đặc.
- **$\\Delta H > 0$** → phản ứng **thu nhiệt**: hệ "có nhiều H hơn" sau phản ứng → phải vay nhiệt từ môi trường → môi trường nguội đi. Vd tan $\\text{KNO}_3$, phân hủy $\\text{CaCO}_3$, nóng chảy đá.

**Ví dụ trực giác — đốt 1 mol $\\text{CH}_4$**:

$$\\text{CH}_4 + \\text{2O}_2 \\rightarrow \\text{CO}_2 + \\text{2H}_2\\text{O} \\qquad \\Delta H = -890 \\text{ kJ}$$

1 mol $\\text{CH}_4$ + 2 mol $\\text{O}_2$ "chứa" nhiều enthalpy hơn $\\text{CO}_2 + \\text{2H}_2\\text{O}$ **đúng 890 kJ**. Khi phản ứng xảy ra, 890 kJ "dư thừa" này thoát ra dưới dạng nhiệt — đó chính là sức nóng của bếp gas đun sôi nồi cơm.

Ngược lại với $\\text{KNO}_3$: $\\text{KNO}_3\\text{(s)}$ có ít enthalpy hơn $\\text{K}^+\\text{(aq)} + \\text{NO}_3^-\\text{(aq)}$ (chênh 34.9 kJ/mol). Để biến đổi, hệ phải **vay** 34.9 kJ từ môi trường (nước, tay người) → tay/nước lạnh đi → ứng dụng làm túi đá lạnh tức thì.

Đơn vị: **kJ/mol** (cho 1 mol phản ứng theo phương trình đã cân bằng).

### 1.3. Bốn ví dụ phản ứng

**Ví dụ 1 — Đốt khí tự nhiên (methane):**

$$\\text{CH}_4\\text{(g)} + \\text{2O}_2\\text{(g)} \\rightarrow \\text{CO}_2\\text{(g)} + \\text{2H}_2\\text{O(l)} \\qquad \\Delta H^\\circ = -890 \\text{ kJ/mol}$$

Tỏa nhiệt mạnh (890 kJ cho 1 mol $\\text{CH}_4$ đốt) → bếp gas nóng được nồi cơm.

**Ví dụ 2 — Tan NaCl trong nước:**

$$\\text{NaCl(s)} \\rightarrow \\text{Na}^+\\text{(aq)} + \\text{Cl}^-\\text{(aq)} \\qquad \\Delta H^\\circ = +3{,}9 \\text{ kJ/mol}$$

Thu nhiệt nhẹ → nước hơi mát khi pha muối.

**Ví dụ 3 — Tan $\\text{KNO}_3$ trong nước:**

$$\\text{KNO}_3\\text{(s)} \\rightarrow \\text{K}^+\\text{(aq)} + \\text{NO}_3^-\\text{(aq)} \\qquad \\Delta H^\\circ = +34{,}9 \\text{ kJ/mol}$$

Thu nhiệt khá mạnh → ứng dụng làm túi đá "lạnh tức thì" (cracking để $\\text{KNO}_3$ trộn nước).

**Ví dụ 4 — Trung hòa NaOH + HCl:**

$$\\text{NaOH(aq)} + \\text{HCl(aq)} \\rightarrow \\text{NaCl(aq)} + \\text{H}_2\\text{O(l)} \\qquad \\Delta H^\\circ = -56 \\text{ kJ/mol}$$

Tỏa nhiệt → dung dịch nóng lên đáng kể.

### 1.4. Enthalpy hình thành chuẩn ΔH°f

**$\\Delta H^\\circ_f$ của một chất** = biến thiên enthalpy khi tạo 1 mol chất đó **từ các nguyên tố ở dạng bền nhất ở điều kiện chuẩn** (25°C, 1 atm).

- Nguyên tố ở dạng bền: $\\Delta H^\\circ_f = 0$ (vd $\\text{O}_2$, $\\text{H}_2$, C-graphite, $\\text{N}_2$).
- Hợp chất: có giá trị xác định.

**Bảng $\\Delta H^\\circ_f$ mẫu (kJ/mol)**:

| Chất | $\\Delta H^\\circ_f$ | Chất | $\\Delta H^\\circ_f$ |
|------|------|------|------|
| $\\text{H}_2\\text{O(l)}$ | −285,8 | $\\text{CO}_2\\text{(g)}$ | −393,5 |
| $\\text{H}_2\\text{O(g)}$ | −241,8 | $\\text{CO(g)}$ | −110,5 |
| $\\text{CH}_4\\text{(g)}$ | −74,8 | $\\text{NH}_3\\text{(g)}$ | −45,9 |
| $\\text{C}_2\\text{H}_5\\text{OH(l)}$ | −277,7 | $\\text{NO(g)}$ | +90,4 |
| $\\text{C}_6\\text{H}_{12}\\text{O}_6\\text{(s)}$ | −1273,3 | $\\text{NO}_2\\text{(g)}$ | +33,2 |
| $\\text{O}_2\\text{(g)}$ | 0 | $\\text{H}_2\\text{(g)}$ | 0 |

**Công thức tính $\\Delta H^\\circ_\\text{rxn}$**:

$$\\Delta H^\\circ_\\text{rxn} = \\sum \\Delta H^\\circ_f(\\text{products}) - \\sum \\Delta H^\\circ_f(\\text{reactants})$$

### 📝 Tóm tắt mục 1

- Định luật I: $\\Delta U = q + w$. Ở P hằng: $q = \\Delta H$.
- $\\Delta H < 0$ = tỏa nhiệt; $\\Delta H > 0$ = thu nhiệt.
- $\\Delta H^\\circ_\\text{rxn} = \\sum \\Delta H^\\circ_f(\\text{SP}) - \\sum \\Delta H^\\circ_f(\\text{CPƯ})$. Nguyên tố bền: $\\Delta H^\\circ_f = 0$.

---

## 2. Định luật Hess

### 2.1. Phát biểu

**Định luật Hess (1840)**: $\\Delta H$ của một phản ứng chỉ phụ thuộc trạng thái đầu và trạng thái cuối, **không** phụ thuộc đường đi (số bước trung gian).

Hệ quả: nếu phản ứng A → C có thể viết = A → B → C, thì:

$$\\Delta H(\\text{A} \\rightarrow \\text{C}) = \\Delta H(\\text{A} \\rightarrow \\text{B}) + \\Delta H(\\text{B} \\rightarrow \\text{C})$$

### 💡 Trực giác / Hình dung

Tưởng tượng đi từ chân núi (A) lên đỉnh (C). Có thể đi 1 đường thẳng ($\\Delta H_1$) hoặc đi vòng qua một đỉnh trung gian ($\\Delta H_2 + \\Delta H_3$). **Độ cao chênh** giữa A và C giống nhau dù đi đường nào → tổng năng lượng tăng/giảm bằng nhau.

### 2.2. Walk-through Hess — tính ΔH(CO → CO₂)

**Cho:**
- (i) $\\text{C} + \\text{O}_2 \\rightarrow \\text{CO}_2$, $\\Delta H_1 = -393{,}5$ kJ/mol
- (ii) $\\text{C} + \\tfrac{1}{2}\\text{O}_2 \\rightarrow \\text{CO}$, $\\Delta H_2 = -110{,}5$ kJ/mol

**Tính**: $\\Delta H(\\text{CO} + \\tfrac{1}{2}\\text{O}_2 \\rightarrow \\text{CO}_2)$ = ?

**Phương pháp**: phản ứng cần tìm có thể viết là (i) − (ii):
- (i) − (ii): $(\\text{C} + \\text{O}_2) - (\\text{C} + \\tfrac{1}{2}\\text{O}_2) \\rightarrow \\text{CO}_2 - \\text{CO}$
- Đơn giản: $\\tfrac{1}{2}\\text{O}_2 + \\text{CO} \\rightarrow \\text{CO}_2$

→ $\\Delta H = \\Delta H_1 - \\Delta H_2 = -393{,}5 - (-110{,}5) = \\mathbf{-283{,}0}$ **kJ/mol**.

Phản ứng tỏa nhiệt khá mạnh — đó là lý do CO cháy trong không khí.

### 2.3. Quy tắc thao tác

Khi cộng/trừ phản ứng để áp dụng Hess:
1. **Đảo chiều phản ứng** → đảo dấu $\\Delta H$.
2. **Nhân hệ số phản ứng × k** → $\\Delta H$ cũng nhân k.
3. **Cộng các phản ứng** → cộng các $\\Delta H$ tương ứng.

### 📝 Tóm tắt mục 2

- $\\Delta H$ chỉ phụ thuộc trạng thái đầu-cuối (state function).
- Có thể cộng/trừ phản ứng để suy ra $\\Delta H$ chưa biết.
- Đảo phản ứng = đảo dấu $\\Delta H$; nhân hệ số = nhân $\\Delta H$.

---

## 3. Entropy và Định luật II

### 3.1. Entropy S

**Entropy S** đếm **số cách hệ có thể tự sắp xếp các phân tử** mà vẫn cho ra cùng một trạng thái nhìn từ ngoài. Đơn vị: J/(mol·K).

💡 **Hình dung rất cụ thể**: bạn có 1 hộp đựng 4 phân tử khí.
- Hộp **rất nhỏ** (vừa khít 4 phân tử): chỉ có **vài cách** sắp xếp → entropy thấp.
- Hộp **rất lớn** (gấp 1000 lần): 4 phân tử có **hàng triệu cách** bay quanh, đụng nhau ở đâu cũng được → entropy cao.

Liên hệ với trạng thái vật chất:
- **Rắn**: các phân tử bị "khóa chặt" vào vị trí cố định trong mạng tinh thể. Mỗi nguyên tử chỉ rung lắc nhẹ quanh chỗ của nó → **rất ít cách sắp xếp** → entropy thấp nhất.
- **Lỏng**: phân tử di chuyển tự do nhưng vẫn ở gần nhau (mật độ cao). Số cách sắp xếp trung bình → entropy trung bình.
- **Khí**: phân tử bay tự do trong toàn bộ thể tích, va chạm ngẫu nhiên. Số cách sắp xếp **khổng lồ** → entropy cao nhất.

Công thức Boltzmann: $S = k_B \\cdot \\ln(W)$ trong đó W là số cấu hình ("microstates") tương ứng. Boltzmann tự hào với công thức này đến mức ông yêu cầu khắc lên bia mộ của mình.

**Vì sao "entropy tự nhiên tăng"?** Hệ với entropy cao có **nhiều cấu hình tương đương** hơn → xác suất chọn ngẫu nhiên cũng cao hơn. Tưởng tượng tung 1 hộp xí ngầu: "tất cả mặt 6" chỉ có 1 cách; "tổng = 10" có nhiều cách → kết quả ngẫu nhiên thường ra tổng trung bình, không bao giờ ra "tất cả 6". Tự nhiên cũng vậy.

**Số liệu cụ thể (J/(mol·K))**:
- $S^\\circ$(nước đá rắn) $\\approx 41$
- $S^\\circ$(nước lỏng) $= 70{,}0$
- $S^\\circ$(hơi nước) $= 188{,}7$
- → đun đá → nước → hơi: entropy tăng dần.

Quy tắc nhanh để so sánh entropy:
- **Khí > Lỏng > Rắn** (cùng chất). Đã giải thích ở trên.
- **Phân tử lớn > phân tử nhỏ** (cùng trạng thái) — phân tử lớn có nhiều cách "rung lắc" (vibration) hơn.
- **Hỗn hợp > tinh khiết** — trộn 2 chất tăng số cấu hình so với cùng chất riêng biệt.
- **Nhiều mol khí > ít mol khí** — nhiều hạt = nhiều cấu hình.

### 3.2. Định luật II nhiệt động

**Phát biểu**: Mọi quá trình tự nhiên đều có **tổng entropy** (hệ + môi trường) **tăng**.

$$\\Delta S_\\text{universe} = \\Delta S_\\text{system} + \\Delta S_\\text{surroundings} > 0 \\quad (\\text{cho quá trình tự xảy ra})$$

### 💡 Trực giác

Bạn rất khó để các phần tử trong căn phòng tự "gộp lại" thành 1 chỗ — chúng luôn "tản ra" (entropy tăng). Tương tự: nước tự tan, không tự tách. Đồ vỡ không tự ghép lại. Nhiệt tự truyền từ nóng → lạnh, không ngược lại.

### 3.3. Biến thiên entropy phản ứng

$$\\Delta S^\\circ_\\text{rxn} = \\sum S^\\circ(\\text{products}) - \\sum S^\\circ(\\text{reactants})$$

**Bảng $S^\\circ$ mẫu (J/(mol·K))**:

| Chất | $S^\\circ$ |
|------|-----|
| $\\text{H}_2\\text{(g)}$ | 130,7 |
| $\\text{O}_2\\text{(g)}$ | 205,0 |
| $\\text{N}_2\\text{(g)}$ | 191,5 |
| $\\text{H}_2\\text{O(l)}$ | 70,0 |
| $\\text{H}_2\\text{O(g)}$ | 188,7 |
| $\\text{CO}_2\\text{(g)}$ | 213,7 |
| C-graphite | 5,7 |

**Ví dụ**: $\\Delta S^\\circ$ của phản ứng $\\text{2H}_2\\text{(g)} + \\text{O}_2\\text{(g)} \\rightarrow \\text{2H}_2\\text{O(l)}$:
- $\\Delta S^\\circ = 2 \\times S^\\circ(\\text{H}_2\\text{O}) - [2 \\times S^\\circ(\\text{H}_2) + S^\\circ(\\text{O}_2)] = 2 \\times 70{,}0 - (2 \\times 130{,}7 + 205{,}0) = 140{,}0 - 466{,}4 = \\mathbf{-326{,}4}$ **J/(mol·K)**.
- Negative — entropy giảm (3 mol khí thành 2 mol lỏng, hỗn loạn giảm rất nhiều).

### 📝 Tóm tắt mục 3

- S đo "hỗn loạn"; đơn vị J/(mol·K).
- Quy tắc: khí > lỏng > rắn.
- Định luật II: $\\Delta S_\\text{universe} > 0$ cho quá trình tự xảy ra.

---

## 4. Năng lượng tự do Gibbs ΔG

### 4.1. Định nghĩa và ý nghĩa

**Năng lượng tự do Gibbs G** là một state function tích hợp cả enthalpy và entropy:

$$G = H - TS$$

**Biến thiên $\\Delta G$** của phản ứng ở T xác định:

$$\\Delta G = \\Delta H - T \\cdot \\Delta S$$

**Ý nghĩa của $\\Delta G$**:
- **$\\Delta G < 0$**: phản ứng **TỰ XẢY RA** (spontaneous) theo chiều thuận.
- **$\\Delta G > 0$**: KHÔNG tự xảy ra theo chiều thuận. Tự xảy ra theo chiều ngược.
- **$\\Delta G = 0$**: hệ ở **trạng thái cân bằng**.

### 4.2. Bốn trường hợp ΔH và ΔS

| $\\Delta H$ | $\\Delta S$ | $\\Delta G = \\Delta H - T\\Delta S$ | Phản ứng |
|----|----|----|----|
| − (tỏa) | + (tăng) | Luôn < 0 | TỰ XẢY RA ở mọi T |
| + (thu) | − (giảm) | Luôn > 0 | KHÔNG tự xảy ra ở mọi T |
| − | − | < 0 khi T thấp | Tự xảy ra ở **T thấp** |
| + | + | < 0 khi T cao | Tự xảy ra ở **T cao** |

### 4.3. Ba ví dụ tính ΔG

**Ví dụ 1 — Đốt H₂**: $\\text{2H}_2\\text{(g)} + \\text{O}_2\\text{(g)} \\rightarrow \\text{2H}_2\\text{O(l)}$, $\\Delta H = -571{,}6$ kJ, $\\Delta S = -326{,}4$ J/K $= -0{,}3264$ kJ/K. Ở 25°C (298 K):
- $\\Delta G = -571{,}6 - 298 \\times (-0{,}3264) = -571{,}6 + 97{,}3 = \\mathbf{-474{,}3}$ **kJ**.
- $\\Delta G < 0$ → **tự xảy ra**. Mặc dù $\\Delta S < 0$ (mất hỗn loạn), $\\Delta H$ tỏa nhiệt rất mạnh.

**Ví dụ 2 — Tan $\\text{NH}_4\\text{NO}_3$ trong nước**: $\\Delta H = +25$ kJ/mol (thu nhiệt), $\\Delta S = +108$ J/(mol·K) (tăng hỗn loạn). Ở 25°C:
- $\\Delta G = 25 - 298 \\times 0{,}108 = 25 - 32{,}2 = \\mathbf{-7{,}2}$ **kJ**.
- $\\Delta G < 0$ → tự xảy ra. Đây là lý do túi lạnh hoạt động: thu nhiệt từ tay → tay lạnh.

**Ví dụ 3 — Phân hủy $\\text{CaCO}_3$**: $\\text{CaCO}_3\\text{(s)} \\rightarrow \\text{CaO(s)} + \\text{CO}_2\\text{(g)}$, $\\Delta H = +178$ kJ, $\\Delta S = +161$ J/K.
- Tại 25°C: $\\Delta G = 178 - 298 \\times 0{,}161 = 178 - 48 = +130$ kJ > 0. Không tự xảy ra.
- Tại 1000 K: $\\Delta G = 178 - 1000 \\times 0{,}161 = 178 - 161 = +17$ kJ. Vẫn dương nhưng nhỏ.
- Tại 1200 K: $\\Delta G = 178 - 1200 \\times 0{,}161 = 178 - 193 = \\mathbf{-15}$ **kJ**. Tự xảy ra!
- → $\\text{CaCO}_3$ phân hủy ở nhiệt độ cao (~ 900°C). Đây là cách sản xuất vôi.

### 4.4. Liên hệ ΔG với K và E°

**Hai công thức quan trọng nối thermochem với cân bằng và điện hóa:**

$$\\begin{aligned}
\\Delta G^\\circ &= -R \\cdot T \\cdot \\ln K & (R = 8{,}314 \\text{ J/(mol·K)}) \\\\
\\Delta G^\\circ &= -n \\cdot F \\cdot E^\\circ_\\text{cell} & (F = 96\\,485 \\text{ C/mol})
\\end{aligned}$$

- $\\Delta G^\\circ < 0 \\Leftrightarrow K > 1 \\Leftrightarrow E^\\circ_\\text{cell} > 0$ → 3 cách nói cùng một thứ: phản ứng tự xảy ra.
- Càng âm $\\Delta G^\\circ$ → K càng lớn → $E^\\circ_\\text{cell}$ càng dương.

### 📝 Tóm tắt mục 4

- $\\Delta G = \\Delta H - T \\cdot \\Delta S$.
- $\\Delta G < 0$: tự xảy ra. $\\Delta G = 0$: cân bằng. $\\Delta G > 0$: không tự xảy ra.
- 4 trường hợp $\\Delta H$, $\\Delta S$ quyết định khi nào tự xảy ra theo T.
- $\\Delta G^\\circ = -RT \\ln K = -nFE^\\circ$: 3 cách đo "sự tự xảy ra".

---

## 5. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Tính $\\Delta H^\\circ$ cho phản ứng đốt etanol: $\\text{C}_2\\text{H}_5\\text{OH(l)} + \\text{3O}_2\\text{(g)} \\rightarrow \\text{2CO}_2\\text{(g)} + \\text{3H}_2\\text{O(l)}$. Cho $\\Delta H^\\circ_f$: $\\text{C}_2\\text{H}_5\\text{OH} = -277{,}7$; $\\text{CO}_2 = -393{,}5$; $\\text{H}_2\\text{O(l)} = -285{,}8$ kJ/mol.

**Bài 2**: Dùng định luật Hess: cho (i) $\\text{S} + \\text{O}_2 \\rightarrow \\text{SO}_2$, $\\Delta H = -297$ kJ; (ii) $\\text{2SO}_3 \\rightarrow \\text{2SO}_2 + \\text{O}_2$, $\\Delta H = +198$ kJ. Tính $\\Delta H$ cho phản ứng $\\text{S} + \\tfrac{3}{2}\\text{O}_2 \\rightarrow \\text{SO}_3$.

**Bài 3**: Một phản ứng có $\\Delta H = +120$ kJ, $\\Delta S = +250$ J/K. Ở nhiệt độ nào phản ứng bắt đầu tự xảy ra?

**Bài 4**: Cho $\\Delta G^\\circ = -110$ kJ. Tính K ở 25°C. ($R = 8{,}314$ J/(mol·K).)

**Bài 5**: Phản ứng tạo $\\text{NH}_3$: $\\text{N}_2 + \\text{3H}_2 \\rightarrow \\text{2NH}_3$, $\\Delta H = -92$ kJ, $\\Delta S = -198$ J/K. Ở 25°C có tự xảy ra không? Ở 500°C thì sao?

**Bài 6**: Pin galvanic có $E^\\circ_\\text{cell} = +1{,}10$ V (Daniell), $n = 2$ mol e. Tính $\\Delta G^\\circ$ và K của phản ứng $\\text{Zn} + \\text{Cu}^{2+} \\rightarrow \\text{Zn}^{2+} + \\text{Cu}$.

### Lời giải

**Bài 1**: 
$$\\begin{aligned}
\\Delta H^\\circ &= [2 \\times (-393{,}5) + 3 \\times (-285{,}8)] - [(-277{,}7) + 3 \\times 0] \\\\
&= [-787{,}0 + (-857{,}4)] - [-277{,}7] \\\\
&= -1644{,}4 + 277{,}7 \\\\
&= -1366{,}7 \\text{ kJ}
\\end{aligned}$$
Đốt 1 mol etanol tỏa ~ 1366.7 kJ.

**Bài 2**: Cần $\\text{S} + \\tfrac{3}{2}\\text{O}_2 \\rightarrow \\text{SO}_3$.
- (i): $\\text{S} + \\text{O}_2 \\rightarrow \\text{SO}_2$, $\\Delta H_1 = -297$ kJ. 
- (ii) chia 2 và đảo chiều: $\\text{SO}_2 + \\tfrac{1}{2}\\text{O}_2 \\rightarrow \\text{SO}_3$, $\\Delta H = -198/2 = -99$ kJ.
- Cộng (i) + (ii đảo): $\\text{S} + \\text{O}_2 + \\text{SO}_2 + \\tfrac{1}{2}\\text{O}_2 \\rightarrow \\text{SO}_2 + \\text{SO}_3$ → $\\text{S} + \\tfrac{3}{2}\\text{O}_2 \\rightarrow \\text{SO}_3$.
- $\\Delta H = -297 + (-99) = \\mathbf{-396}$ **kJ**.

**Bài 3**: Tự xảy ra khi $\\Delta G = 0$: $T = \\dfrac{\\Delta H}{\\Delta S} = \\dfrac{120\\,000}{250} = \\mathbf{480}$ **K = 207°C**. Tại T > 207°C, phản ứng tự xảy ra.

**Bài 4**: $\\Delta G^\\circ = -RT \\ln K$ → $\\ln K = \\dfrac{-\\Delta G^\\circ}{RT} = \\dfrac{110\\,000}{8{,}314 \\times 298} = 44{,}4$.
$K = e^{44{,}4} \\approx \\mathbf{1{,}9 \\times 10^{19}}$ (cực kỳ lớn — phản ứng gần như đi hết).

**Bài 5**: 
- Tại 25°C = 298 K: $\\Delta G = -92 - 298 \\times (-0{,}198) = -92 + 59{,}0 = \\mathbf{-33}$ **kJ** < 0 → tự xảy ra.
- Tại 500°C = 773 K: $\\Delta G = -92 - 773 \\times (-0{,}198) = -92 + 153 = \\mathbf{+61}$ **kJ** > 0 → KHÔNG tự xảy ra.
- → Tổng hợp ammonia thuận lợi về thermodynamic ở T thấp, nhưng tốc độ quá chậm. Phải ép P cao + xúc tác (Lesson T1-L08).

**Bài 6**: 
- $\\Delta G^\\circ = -n \\cdot F \\cdot E^\\circ = -2 \\times 96485 \\times 1{,}10 = \\mathbf{-212\\,267}$ **J = −212,3 kJ**.
- $\\ln K = \\dfrac{-\\Delta G^\\circ}{RT} = \\dfrac{212\\,267}{8{,}314 \\times 298} = 85{,}6$. $K = e^{85{,}6} \\approx \\mathbf{1{,}5 \\times 10^{37}}$. 
- Phản ứng đi gần như "tới hết" → Zn tan hết trong dung dịch $\\text{Cu}^{2+}$ nếu đủ $\\text{Cu}^{2+}$.

---

## 6. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 05 — Hydrocarbon](../lesson-05-organic-hydrocarbons/) — bước chân vào hóa hữu cơ.
- **Liên kết Physics**: định luật I, II nhiệt động → [\`Physics/02-Thermo-Electromagnetism/lesson-01..03\`](../../../Physics/02-Thermo-Electromagnetism/). Cùng concept dưới góc nhìn vật lý.
- **Liên kết Math**: $\\Delta G = \\Delta H - T\\Delta S$ là hàm tuyến tính của T → [\`Math/01-Arithmetic-Algebra/lesson-06\`](../../../Math/01-Arithmetic-Algebra/). $\\ln K$ cần logarit.

---

## 📝 Tổng kết Lesson 04 (T2)

1. **Định luật I**: $\\Delta U = q + w$. Ở P hằng: $q = \\Delta H$.
2. **$\\Delta H$**: tỏa (< 0) hay thu (> 0). $\\Delta H^\\circ_\\text{rxn} = \\sum \\Delta H^\\circ_f(\\text{SP}) - \\sum \\Delta H^\\circ_f(\\text{CPƯ})$.
3. **Định luật Hess**: $\\Delta H$ state function, có thể cộng/trừ phản ứng.
4. **Entropy S**: hỗn loạn. Khí > lỏng > rắn. Định luật II: $\\Delta S_\\text{universe} > 0$.
5. **Gibbs G**: $\\Delta G = \\Delta H - T \\cdot \\Delta S$. $\\Delta G < 0$ → tự xảy ra.
6. **4 trường hợp**: kết hợp dấu $\\Delta H$, $\\Delta S$ → khi nào tự xảy ra theo T.
7. **Liên hệ**: $\\Delta G^\\circ = -RT \\ln K = -n \\cdot F \\cdot E^\\circ$.

**Tiếp theo**: [Lesson 05 — Hydrocarbon](../lesson-05-organic-hydrocarbons/)
`;
