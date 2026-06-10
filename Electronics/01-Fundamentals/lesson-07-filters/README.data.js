// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Electronics/01-Fundamentals/lesson-07-filters/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Bộ lọc (Filters)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được bộ lọc tần số là gì và vì sao mạch điện cần nó.
- Tính **tần số cắt** $f_c = \\frac{1}{2\\pi RC}$ cho bộ lọc thông thấp và thông cao bậc 1.
- Hiểu ý nghĩa −3 dB tại $f_c$: biên độ giảm còn $1/\\sqrt{2} \\approx 70.7\\%$.
- Đọc được **giản đồ Bode** (Bode plot) — đường đáp ứng biên độ theo log tần số.
- Biết khái niệm **độ sốc −20 dB/decade** và vì sao bộ lọc bậc 1 có độ dốc này.
- Áp dụng bộ lọc vào các bài toán thực tế: lọc nguồn, tách tín hiệu âm thanh, chống aliasing.

## Kiến thức tiền đề

- [Lesson 04 — Tụ điện & Mạch RC](../lesson-04-capacitor-rc/) — trở kháng tụ $Z_C = 1/(j\\omega C)$.
- [Lesson 06 — AC, Trở kháng & Mạch RLC](../lesson-06-ac-impedance-rlc/) — chia áp phức, khái niệm $\\omega = 2\\pi f$.

---

## 1. Bộ lọc là gì và vì sao cần

### 1.1. Vấn đề thực tế

Bất kỳ tín hiệu điện thực tế nào cũng chứa **nhiều thành phần tần số trộn lẫn nhau**. Ví dụ:

- Tín hiệu âm thanh từ micro: từ 20 Hz (bass sâu) đến 20 000 Hz (treble cao), kèm theo nhiễu 50/60 Hz từ lưới điện.
- Tín hiệu đầu ra cảm biến nhiệt độ: thay đổi chậm (thông tin thực) + nhiễu tần số cao từ motor rung gần đó.
- Tín hiệu trước ADC (bộ chuyển đổi tương tự-số): nếu có tần số $> f_{\\text{sample}}/2$ sẽ gây aliasing (tín hiệu ảo không thể phân biệt với tín hiệu thật).

**Vấn đề**: làm sao giữ lại phần tín hiệu cần và loại bỏ phần không cần?

### 1.2. Giải pháp: bộ lọc tần số

**Bộ lọc tần số (frequency filter)** là mạch điện chỉ cho một dải tần số nhất định đi qua, đồng thời suy giảm (giảm biên độ) các tần số ngoài dải đó.

💡 **Hình dung bằng cái rây**: Rây bột mì chỉ cho hạt nhỏ hơn lỗ đi qua, giữ lại hạt to. Bộ lọc tần số làm y như vậy — nhưng không theo kích thước hạt mà theo **tần số**. Bộ lọc thông thấp (low-pass) giống rây cho hạt nhỏ (tần số thấp) qua, chặn hạt to (tần số cao).

Có 4 loại bộ lọc cơ bản:

| Loại | Tiếng Anh | Cho qua | Chặn |
|------|-----------|---------|------|
| Thông thấp | Low-pass (LPF) | $f < f_c$ | $f > f_c$ |
| Thông cao | High-pass (HPF) | $f > f_c$ | $f < f_c$ |
| Thông dải | Band-pass (BPF) | $f_L < f < f_H$ | bên ngoài dải |
| Chặn dải | Band-stop (BSF) | bên ngoài dải | $f_L < f < f_H$ |

Bài này tập trung vào **Low-pass** và **High-pass** — đơn giản nhất, dùng nhiều nhất, là nền tảng để hiểu Band-pass và Band-stop.

❓ **Câu hỏi tự nhiên**: Chặn tần số cao nghĩa là như thế nào? Tín hiệu biến mất hoàn toàn?

Không biến mất hoàn toàn. Bộ lọc RC bậc 1 **suy giảm dần** (không cắt đứt ngay). Tần số càng cao hơn f_c, biên độ càng nhỏ dần theo đường cong. Chỉ bộ lọc bậc cao (bậc 4, 8...) hoặc bộ lọc tích cực (dùng op-amp) mới có vách cắt dốc hơn.

### 📝 Tóm tắt mục 1

- Tín hiệu thực tế là tổ hợp nhiều tần số — bộ lọc tách riêng dải cần.
- 4 loại: LPF, HPF, BPF, BSF.
- Bộ lọc RC bậc 1 suy giảm tần số ngoài dải; không cắt đứt.

---

## 2. Bộ lọc thông thấp RC (Low-Pass RC Filter)

### 2.1. Cấu trúc mạch

Mắc nối tiếp **R** rồi **C**, lấy điện áp ra tại hai đầu tụ C:

\`\`\`
V_in ─── R ─── ┬─── V_out
               C
               │
              GND
\`\`\`

Tụ C đóng vai trò **chia áp phụ thuộc tần số**. Nhớ lại từ [Lesson 04](../lesson-04-capacitor-rc/) và [Lesson 06](../lesson-06-ac-impedance-rlc/): trở kháng tụ $Z_C = 1/(j\\omega C)$ với $\\omega = 2\\pi f$.

### 2.2. Công thức và ý nghĩa

**Hàm truyền** (transfer function) — tỉ số biên độ $V_{\\text{out}}/V_{\\text{in}}$ theo tần số:

$$H(f) = \\frac{V_{\\text{out}}}{V_{\\text{in}}} = \\frac{Z_C}{R + Z_C} = \\frac{1}{1 + j\\omega RC}$$

**Biên độ** (độ lớn):

$$|H(f)| = \\frac{1}{\\sqrt{1 + (f/f_c)^2}}$$

trong đó **tần số cắt** (cutoff frequency):

$$f_c = \\frac{1}{2\\pi \\cdot R \\cdot C}$$

💡 **Ý nghĩa vật lý**: Ở tần số thấp ($f \\ll f_c$), $Z_C$ rất lớn → hầu hết điện áp rơi trên C → $V_{\\text{out}} \\approx V_{\\text{in}}$. Ở tần số cao ($f \\gg f_c$), $Z_C$ rất nhỏ → C như ngắn mạch, hầu hết điện áp rơi trên R → $V_{\\text{out}} \\approx 0$.

**Tại $f = f_c$ chính xác**: $|H| = 1/\\sqrt{1 + 1} = 1/\\sqrt{2} \\approx$ **0.707** → điện áp ra bằng **70.7% điện áp vào**.

**Tại sao gọi là −3 dB?** Vì:
- $\\text{dB} = 20 \\log_{10}(|H|) = 20 \\log_{10}(1/\\sqrt{2}) = 20 \\cdot (-0.5 \\cdot \\log_{10} 2) = 20 \\cdot (-0.5 \\cdot 0.301) \\approx$ **−3.01 dB ≈ −3 dB**.

### 2.3. Công thức f_c — walk-through và ví dụ

**Ví dụ 1**: $R = 1$ kΩ, $C = 1$ µF → tần số cắt?

$$\\begin{aligned}
f_c &= \\frac{1}{2\\pi \\times 1000 \\times 1 \\times 10^{-6}} \\\\
&= \\frac{1}{2\\pi \\times 10^{-3}} = \\frac{1}{6.283 \\times 10^{-3}} \\approx 159 \\text{ Hz}
\\end{aligned}$$

→ $f_c \\approx$ **159 Hz**. Tín hiệu 50 Hz (nhiễu lưới) đi qua gần như nguyên vẹn; tín hiệu 10 kHz bị suy giảm mạnh.

**Ví dụ 2**: $R = 10$ kΩ, $C = 100$ nF → $f_c$?

$$f_c = \\frac{1}{2\\pi \\times 10000 \\times 100 \\times 10^{-9}} = \\frac{1}{2\\pi \\times 10^{-3}} \\approx 159 \\text{ Hz}$$

→ Cùng $f_c = 159$ Hz! Các cặp RC khác nhau có thể cho cùng $f_c$ — quan trọng là tích RC.

**Ví dụ 3**: $R = 4.7$ kΩ, $C = 33$ nF → $f_c$?

$$\\begin{aligned}
f_c &= \\frac{1}{2\\pi \\times 4700 \\times 33 \\times 10^{-9}} \\\\
&= \\frac{1}{2\\pi \\times 1.551 \\times 10^{-4}} = \\frac{1}{9.745 \\times 10^{-4}} \\approx 1{,}026 \\text{ Hz} \\approx 1 \\text{ kHz}
\\end{aligned}$$

**Ví dụ 4**: $R = 100$ kΩ, $C = 10$ pF → $f_c$?

$$\\begin{aligned}
f_c &= \\frac{1}{2\\pi \\times 100000 \\times 10 \\times 10^{-12}} \\\\
&= \\frac{1}{2\\pi \\times 10^{-6}} = \\frac{1}{6.283 \\times 10^{-6}} \\approx 159{,}155 \\text{ Hz} \\approx 159 \\text{ kHz}
\\end{aligned}$$

→ Bộ lọc radio AM (530–1600 kHz) cần $f_c$ trong vùng này.

**Chọn R và C ngược lại từ $f_c$**: Nếu muốn $f_c = 1$ kHz và chọn $C = 10$ nF trước:

$$\\begin{aligned}
R &= \\frac{1}{2\\pi \\times f_c \\times C} = \\frac{1}{2\\pi \\times 1000 \\times 10 \\times 10^{-9}} \\\\
&= \\frac{1}{6.283 \\times 10^{-5}} \\approx 15{,}915 \\text{ Ω}
\\end{aligned}$$

→ chọn điện trở tiêu chuẩn gần nhất 15 kΩ hoặc 16 kΩ.

### 2.4. Độ suy giảm tại các tần số khác

| $f/f_c$ | $\\lvert H(f)\\rvert$ | dB |
|---------|---------|------|
| 0.1 | ≈ 0.995 | ≈ −0.04 dB |
| 0.5 | ≈ 0.894 | ≈ −0.97 dB |
| 1 | 0.707 | −3 dB |
| 2 | ≈ 0.447 | ≈ −7 dB |
| 10 | ≈ 0.0995 | ≈ −20 dB |
| 100 | ≈ 0.00995 | ≈ −40 dB |

→ Cứ mỗi lần tần số tăng **10 lần** (1 decade), biên độ giảm thêm **20 dB** (ở vùng xa $f_c$). Đây là "độ dốc −20 dB/decade" của bộ lọc bậc 1.

⚠ **Lỗi thường gặp**: Nhầm $f_c = 1/(RC)$ (thiếu $2\\pi$). Ví dụ: $R = 1$ kΩ, $C = 1$ µF → $1/(RC) = 1000$ rad/s $= \\omega_c$ (tần số góc), còn $f_c = \\omega_c/(2\\pi) = 1000/6.283 \\approx 159$ Hz. Phân biệt rõ $\\omega_c$ (rad/s) và $f_c$ (Hz).

🔁 **Tự kiểm tra**: Tính $f_c$ khi $R = 2.2$ kΩ, $C = 47$ nF.

<details>
<summary>Đáp án</summary>

$f_c = \\dfrac{1}{2\\pi \\times 2200 \\times 47 \\times 10^{-9}} = \\dfrac{1}{2\\pi \\times 1.034 \\times 10^{-4}} = \\dfrac{1}{6.497 \\times 10^{-4}} \\approx$ **1,539 Hz ≈ 1.54 kHz**.

</details>

### 📝 Tóm tắt mục 2

- LPF RC: R nối tiếp, lấy áp ra tại C.
- $f_c = 1/(2\\pi RC)$. Tích RC quyết định $f_c$, không phải giá trị riêng lẻ.
- Tại $f_c$: $|H| = 1/\\sqrt{2} \\approx 0.707$, tức −3 dB.
- Độ dốc suy giảm: −20 dB/decade (bậc 1).

---

## 3. Bộ lọc thông cao RC (High-Pass RC Filter)

### 3.1. Cấu trúc mạch

Đổi vị trí R và C: mắc **C nối tiếp** trước, lấy điện áp ra tại **R**:

\`\`\`
V_in ─── C ─── ┬─── V_out
               R
               │
              GND
\`\`\`

💡 **Hình dung**: Tụ C chặn một chiều (DC) và cản tần số thấp. Khi tần số thấp, $Z_C$ lớn → điện áp rơi chủ yếu trên C → $V_{\\text{out}}$ nhỏ. Khi tần số cao, $Z_C$ nhỏ → C gần ngắn mạch → hầu hết điện áp rơi trên R → $V_{\\text{out}} \\approx V_{\\text{in}}$.

### 3.2. Công thức

**Hàm truyền**:

$$H(f) = \\frac{R}{R + Z_C} = \\frac{j\\omega RC}{1 + j\\omega RC}$$

**Biên độ**:

$$|H(f)| = \\frac{f/f_c}{\\sqrt{1 + (f/f_c)^2}}$$

**Tần số cắt — cùng công thức**:

$$f_c = \\frac{1}{2\\pi \\cdot R \\cdot C}$$

Tại $f = f_c$: $|H| = 1/\\sqrt{2} \\approx 0.707$ → **−3 dB** (giống LPF, nhưng đây là điểm chuyển từ suy giảm sang thông).

Tần số thấp hơn $f_c$ → suy giảm (dốc +20 dB/decade từ trái sang). Tần số cao hơn $f_c$ → đi qua với $|H| \\approx 1$.

### 3.3. Ứng dụng quan trọng: chặn thành phần DC

Trong âm thanh, tụ ghép (coupling capacitor) dùng làm HPF để chặn DC offset giữa các tầng khuếch đại — chỉ cho tín hiệu AC âm thanh đi qua.

### 3.4. Bốn ví dụ số

**Ví dụ 1**: $R = 10$ kΩ, $C = 1$ µF → $f_c$?

$$f_c = \\frac{1}{2\\pi \\times 10000 \\times 1 \\times 10^{-6}} = \\frac{1}{0.06283} \\approx 15.9 \\text{ Hz}$$

→ Đây là tụ ghép điển hình trong mạch khuếch đại âm thanh: loại DC và giữ lại toàn bộ dải âm nghe được (20 Hz – 20 kHz).

**Ví dụ 2**: $R = 1$ kΩ, $C = 10$ µF → $f_c$?

$$f_c = \\frac{1}{2\\pi \\times 1000 \\times 10 \\times 10^{-6}} = \\frac{1}{0.06283} \\approx 15.9 \\text{ Hz}$$

→ Cùng $f_c$ — lại một lần nữa tích $RC = 10^{-2}$ quyết định kết quả.

**Ví dụ 3**: $R = 4.7$ kΩ, $C = 100$ nF → $f_c$?

$$\\begin{aligned}
f_c &= \\frac{1}{2\\pi \\times 4700 \\times 100 \\times 10^{-9}} \\\\
&= \\frac{1}{2\\pi \\times 4.7 \\times 10^{-4}} = \\frac{1}{2.953 \\times 10^{-3}} \\approx 339 \\text{ Hz}
\\end{aligned}$$

→ HPF lọc bỏ bass sâu dưới 339 Hz (dùng trong loa treble của hệ thống loa phân tần).

**Ví dụ 4**: Muốn HPF loại bỏ nhiễu 50 Hz (lưới điện), cho qua tín hiệu $> 500$ Hz. Chọn $f_c = 500$ Hz, $C = 22$ nF → $R$?

$$R = \\frac{1}{2\\pi \\times 500 \\times 22 \\times 10^{-9}} = \\frac{1}{6.912 \\times 10^{-5}} \\approx 14{,}469 \\text{ Ω}$$

→ chọn 15 kΩ (tiêu chuẩn).

🔁 **Tự kiểm tra**: Với HPF $R = 33$ kΩ, $C = 47$ nF, tần số 100 Hz suy giảm bao nhiêu?

<details>
<summary>Đáp án</summary>

$f_c = 1/(2\\pi \\times 33000 \\times 47 \\times 10^{-9}) = 1/(2\\pi \\times 1.551 \\times 10^{-3}) = 1/(9.745 \\times 10^{-3}) \\approx 102.6$ Hz.

Tại $f = 100$ Hz $\\approx f_c$: $|H| \\approx 1/\\sqrt{2} \\approx 0.707$ → **suy giảm −3 dB** (≈ 29.3%).

</details>

### 📝 Tóm tắt mục 3

- HPF RC: C nối tiếp trước, lấy áp ra tại R.
- $f_c$ cùng công thức $1/(2\\pi RC)$.
- Tần số thấp hơn $f_c$ bị suy giảm; tần số cao đi qua.
- Ứng dụng điển hình: tụ ghép loại DC, loa treble trong crossover.

---

## 4. Khái niệm dB và độ dốc

### 4.1. Decibel (dB) là gì

**Decibel (dB)** là đơn vị logarithm thể hiện tỉ số hai đại lượng. Đối với điện áp:

$$A_{\\text{dB}} = 20 \\cdot \\log_{10}\\!\\left(\\frac{V_{\\text{out}}}{V_{\\text{in}}}\\right)$$

💡 **Vì sao cần dB?** Trong thực tế, tín hiệu có thể thay đổi từ micro-Volt đến Volt — tỉ số lên tới 1.000.000:1. Thang tuyến tính quá bất tiện để vẽ đồ thị. Thang log nén toàn bộ vào một dải nhỏ gọn và thẳng.

**Vì sao dùng hệ số 20?** Vì công suất tỉ lệ với $V^2$. Nếu $P_{\\text{dB}} = 10 \\cdot \\log_{10}(P_{\\text{out}}/P_{\\text{in}})$ thì $A_{\\text{dB}} = 20 \\cdot \\log_{10}(V_{\\text{out}}/V_{\\text{in}})$ (vì $\\log(x^2) = 2 \\cdot \\log(x)$).

**Các giá trị dB quen thuộc cần nhớ**:

| $V_{\\text{out}}/V_{\\text{in}}$ | $A_{\\text{dB}}$ |
|------------|------|
| 1 (không thay đổi) | 0 dB |
| $\\sqrt{2} \\approx 1.414$ | +3 dB (tăng gấp $\\sqrt{2}$) |
| $1/\\sqrt{2} \\approx 0.707$ | −3 dB (tại $f_c$) |
| 0.5 | −6 dB |
| 0.1 | −20 dB |
| 0.01 | −40 dB |
| 10 | +20 dB |

### 4.2. Độ dốc −20 dB/decade

**Decade** = dải tần số mà tần số tăng lên 10 lần (ví dụ: 100 Hz → 1 kHz là 1 decade; 1 kHz → 10 kHz là 1 decade nữa).

**Độ dốc −20 dB/decade**: với LPF bậc 1, ở vùng $f \\gg f_c$, mỗi khi $f$ tăng 10 lần, $|H|$ giảm 10 lần → $A_{\\text{dB}}$ giảm 20 dB.

**Chứng minh** (ở vùng $f \\gg f_c$): $|H| = 1/\\sqrt{1 + (f/f_c)^2} \\approx f_c/f$. Tại $f_1$ và $10f_1$: $|H(f_1)| = f_c/f_1$, $|H(10f_1)| = f_c/(10f_1) = (1/10) \\cdot |H(f_1)|$. Tỉ số $= 1/10$ → $A = 20 \\cdot \\log_{10}(1/10) =$ **−20 dB**.

**Tương đương**: −20 dB/decade = **−6 dB/octave** (mỗi octave = tần số tăng 2 lần). Kỹ sư âm thanh thường dùng dB/octave.

⚠ **Lỗi thường gặp**: Nhầm độ dốc là −3 dB/decade. Giá trị −3 dB chỉ là biên độ **tại** $f_c$, không phải độ dốc.

### 4.3. Bộ lọc bậc cao hơn

Ghép nhiều tầng RC nối tiếp → độ dốc dốc hơn:
- Bậc 1: −20 dB/decade
- Bậc 2: −40 dB/decade
- Bậc 4: −80 dB/decade (dùng trong lọc chống aliasing)

### 📝 Tóm tắt mục 4

- dB điện áp $= 20 \\cdot \\log_{10}(V_{\\text{out}}/V_{\\text{in}})$. Tại $f_c$: −3 dB.
- −20 dB/decade = độ dốc đặc trưng LPF/HPF bậc 1.
- Bậc cao hơn → độ dốc nhân thêm: bậc $n$ → $-20n$ dB/decade.

---

## 5. Giản đồ Bode (Bode Plot)

### 5.1. Giản đồ Bode là gì

**Giản đồ Bode** (Bode plot) là đồ thị biểu diễn **đáp ứng biên độ** (và đôi khi pha) của mạch theo **tần số**, với:
- Trục hoành (X): tần số theo **thang logarithm** (log scale).
- Trục tung (Y): biên độ theo **dB**.

💡 **Vì sao dùng thang log cho trục tần số?** Vì tai người nghe log tần số (ví dụ: từ 100 Hz đến 1 kHz giống như từ 1 kHz đến 10 kHz về cảm nhận âm nhạc). Và vì mạch điện thường cần hoạt động trên nhiều decade tần số — thang log giúp nhìn thấy đặc tính trên toàn dải rộng.

### 5.2. Đọc đồ thị Bode cho LPF bậc 1

Đồ thị Bode của LPF RC bậc 1 gồm 2 phần rõ ràng:

**Phần bằng phẳng** (flat region): ở tần số f << f_c, đường thẳng nằm ngang tại 0 dB (|H| ≈ 1). Tín hiệu đi qua gần như không suy giảm.

**Điểm gãy tại f_c** (breakpoint / corner frequency): tại f = f_c, biên độ đang thật sự ở −3 dB, nhưng phép xấp xỉ tuyến tính (đường thẳng vẽ nhanh) cho là 0 dB. Sai số 3 dB này là điểm gãy đặc trưng.

**Phần dốc** (roll-off region): ở f >> f_c, đường thẳng nghiêng xuống với độ dốc **−20 dB/decade**. Mỗi decade (×10 lần tần số) = giảm thêm 20 dB.

\`\`\`
Biên độ (dB)
     0 ─────────────────────────\\
                                 \\
   −20                            \\  ← dốc −20 dB/decade
                                   \\
   −40                              \\
         10   100  1k   10k  100k  (Hz, thang log)
                   ↑
                  f_c
\`\`\`

### 5.3. Giản đồ Bode cho HPF bậc 1

Đối xứng ngược với LPF:

\`\`\`
Biên độ (dB)
     0                      ─────────────────
                            /
   −20           /         /  ← dốc +20 dB/decade
                /
   −40         /
         10   100  1k   10k  100k  (Hz, thang log)
                   ↑
                  f_c
\`\`\`

Phần dốc ở trái f_c dốc lên +20 dB/decade (tần số tăng gấp 10 → biên độ tăng gấp 10). Bên phải f_c: 0 dB.

❓ **Câu hỏi tự nhiên**: Có phải đường Bode thực là gấp khúc hoàn toàn không?

Không. Đường gấp khúc chỉ là **phép xấp xỉ tuyến tính** (straight-line Bode approximation). Đường thực tế là đường cong mượt, chỉ khớp với đường thẳng ở xa f_c và lệch tối đa 3 dB tại điểm f = f_c.

🔁 **Tự kiểm tra**: Tại $f = 10 \\cdot f_c$ (gấp 10 lần tần số cắt), độ suy giảm của LPF bậc 1 xấp xỉ bao nhiêu dB?

<details>
<summary>Đáp án</summary>

$|H| = 1/\\sqrt{1 + 10^2} = 1/\\sqrt{101} \\approx 0.0995$. $A_{\\text{dB}} = 20 \\cdot \\log_{10}(0.0995) \\approx 20 \\cdot (-1.002) \\approx$ **−20 dB**.

(Đúng như dự đoán từ độ dốc −20 dB/decade — tại $10 \\cdot f_c$ là 1 decade từ $f_c$.)

</details>

### 📝 Tóm tắt mục 5

- Giản đồ Bode: trục X là $\\log(f)$, trục Y là $A_{\\text{dB}}$.
- LPF: bằng phẳng ở 0 dB → gãy tại $f_c$ → dốc −20 dB/decade.
- HPF: đối xứng ngược — dốc +20 dB/decade → gãy tại $f_c$ → bằng phẳng 0 dB.
- Đường thực tế mượt hơn xấp xỉ, sai lệch tối đa 3 dB tại $f_c$.

---

## 6. Ứng dụng thực tế

### 6.1. Lọc nguồn điện

Sau khi chỉnh lưu AC → DC, điện áp nguồn có gợn sóng (ripple) ở 100/120 Hz. Mạch RC trong [Lesson 04](../lesson-04-capacitor-rc/) đã nói về tụ lọc nguồn — bản chất đó là **LPF**: cho thành phần DC (0 Hz) qua, suy giảm gợn sóng AC.

### 6.2. Tách tín hiệu âm thanh (crossover)

Hệ thống loa chia tín hiệu âm cho nhiều loa khác nhau:
- Loa trầm (woofer): chỉ nhận $f < 300$ Hz → dùng **LPF**.
- Loa cao (tweeter): chỉ nhận $f > 3$ kHz → dùng **HPF**.
- Loa trung (mid): nhận 300 Hz – 3 kHz → dùng **Band-pass**.

Đây là lý do bộ lọc RC cơ bản thực sự có mặt trong mỗi hệ thống loa trong nhà bạn.

### 6.3. Chống aliasing trước ADC

Trước khi đưa tín hiệu vào bộ chuyển đổi tương tự-số (ADC), **bắt buộc** phải lọc bỏ tất cả tần số cao hơn $f_{\\text{sample}}/2$ (điều kiện Nyquist). Bộ lọc này gọi là **anti-aliasing filter** — là một LPF với $f_c \\leq f_{\\text{sample}}/2$.

Ví dụ: ADC lấy mẫu 8 kHz (điện thoại cũ) → cần LPF với $f_c = 4$ kHz. Nếu thiếu bộ lọc, tần số $> 4$ kHz sẽ "gập ngược" (alias) xuống dải thấp hơn gây tiếng méo không thể phân biệt.

Sẽ học kỹ hơn về ADC tại [Lesson 05 — ADC/DAC](../../03-Digital-MCU/lesson-05-adc-dac/).

### 6.4. Lọc nhiễu cảm biến

Cảm biến nhiệt độ, áp suất thường thay đổi chậm (vài Hz hoặc thậm chí mHz). Nhiễu từ motor, nguồn điện có thể có tần số kHz. Một LPF đơn giản RC đặt ngay sau cảm biến loại bỏ nhiễu trước khi tín hiệu vào vi điều khiển.

Ví dụ thực tế: $R = 10$ kΩ, $C = 10$ µF → $f_c = 1/(2\\pi \\times 10^4 \\times 10^{-5}) \\approx$ **1.6 Hz** → loại bỏ hầu hết nhiễu điện tử, giữ lại biến động nhiệt độ chậm.

### 📝 Tóm tắt mục 6

- LPF trong nguồn: lọc gợn sóng ripple.
- Crossover loa: LPF cho woofer, HPF cho tweeter.
- Anti-aliasing: LPF bắt buộc trước ADC ($f_c \\leq f_{\\text{sample}}/2$).
- Lọc nhiễu cảm biến: LPF tần số cắt rất thấp.

---

## Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Thiết kế LPF RC để tín hiệu âm thanh bass (dưới 300 Hz) đi qua, chặn treble trên 3 kHz. Chọn $f_c = 300$ Hz, dùng $C = 100$ nF. Tính $R$ cần thiết và độ suy giảm tại 3 kHz.

**Bài 2**: Một HPF có $R = 47$ kΩ, $C = 22$ nF. Tính $f_c$ và xác định độ suy giảm ở 50 Hz (nhiễu lưới điện).

**Bài 3**: LPF RC với $R = 2.2$ kΩ, $C = 68$ nF. Tính:
- (a) $f_c$
- (b) Biên độ tương đối $|H|$ tại $f = 500$ Hz
- (c) Biên độ tương đối $|H|$ tại $f = 5$ kHz

**Bài 4**: Giải thích giản đồ Bode sau: bộ lọc có $f_c = 10$ kHz, tại $f = 100$ kHz đo được $A = -20$ dB. Đây là LPF hay HPF? Bậc mấy?

**Bài 5**: Muốn lọc nhiễu cho cảm biến, cần $f_c = 5$ Hz. Kho linh kiện chỉ có $C = 1$ µF và $C = 10$ µF. Chọn $C$ nào và tính $R$ tương ứng?

**Bài 6**: So sánh hai LPF: (A) $R = 1$ kΩ, $C = 1$ µF và (B) $R = 10$ Ω, $C = 100$ µF. Tính $f_c$ của mỗi bộ. Bộ nào thực tế hơn để lọc tín hiệu audio? Vì sao?

**Bài 7**: Tín hiệu $V_{\\text{in}} = 2$ V đỉnh, tần số 1 kHz đi qua LPF RC với $f_c = 500$ Hz. Tính $V_{\\text{out}}$.

### Lời giải chi tiết

**Bài 1**:

Bước 1 — Tính $R$ từ $f_c = 300$ Hz, $C = 100$ nF $= 100 \\times 10^{-9}$ F:
$$\\begin{aligned}
R &= \\frac{1}{2\\pi \\times f_c \\times C} = \\frac{1}{2\\pi \\times 300 \\times 100 \\times 10^{-9}} \\\\
&= \\frac{1}{2\\pi \\times 3 \\times 10^{-5}} = \\frac{1}{1.885 \\times 10^{-4}} \\approx 5{,}305 \\text{ Ω}
\\end{aligned}$$
→ chọn 5.1 kΩ hoặc 5.6 kΩ tiêu chuẩn.

Bước 2 — Tính độ suy giảm tại $f = 3$ kHz:
$$\\begin{aligned}
\\frac{f}{f_c} &= \\frac{3000}{300} = 10 \\\\
|H| &= \\frac{1}{\\sqrt{1 + 10^2}} = \\frac{1}{\\sqrt{101}} \\approx 0.0995 \\\\
A_{\\text{dB}} &= 20 \\times \\log_{10}(0.0995) \\approx -20 \\text{ dB}
\\end{aligned}$$

→ $R \\approx$ **5.1 kΩ**, tại 3 kHz suy giảm **−20 dB** (tín hiệu treble còn ≈ 10% biên độ).

**Bài 2**:

Bước 1 — Tính $f_c$:
$$\\begin{aligned}
f_c &= \\frac{1}{2\\pi \\times 47000 \\times 22 \\times 10^{-9}} \\\\
&= \\frac{1}{2\\pi \\times 1.034 \\times 10^{-3}} = \\frac{1}{6.497 \\times 10^{-3}} \\approx 153.9 \\text{ Hz} \\approx 154 \\text{ Hz}
\\end{aligned}$$

Bước 2 — Tính $|H|$ tại $f = 50$ Hz (HPF):
$$\\begin{aligned}
\\frac{f}{f_c} &= \\frac{50}{154} \\approx 0.325 \\\\
|H| &= \\frac{f/f_c}{\\sqrt{1 + (f/f_c)^2}} = \\frac{0.325}{\\sqrt{1 + 0.1056}} = \\frac{0.325}{\\sqrt{1.1056}} = \\frac{0.325}{1.0515} \\approx 0.309 \\\\
A_{\\text{dB}} &= 20 \\times \\log_{10}(0.309) \\approx -10.2 \\text{ dB}
\\end{aligned}$$

→ Nhiễu 50 Hz bị suy giảm khoảng **−10 dB** (biên độ còn 30.9%). Để lọc tốt hơn cần $f_c$ cao hơn 50 Hz.

**Bài 3**:

(a) $f_c$:
$$\\begin{aligned}
f_c &= \\frac{1}{2\\pi \\times 2200 \\times 68 \\times 10^{-9}} \\\\
&= \\frac{1}{2\\pi \\times 1.496 \\times 10^{-4}} = \\frac{1}{9.398 \\times 10^{-4}} \\approx 1{,}064 \\text{ Hz} \\approx 1.06 \\text{ kHz}
\\end{aligned}$$

(b) Tại $f = 500$ Hz:
$$\\begin{aligned}
\\frac{f}{f_c} &= \\frac{500}{1064} \\approx 0.470 \\\\
|H| &= \\frac{1}{\\sqrt{1 + 0.470^2}} = \\frac{1}{\\sqrt{1.221}} = \\frac{1}{1.105} \\approx 0.905
\\end{aligned}$$
→ Biên độ ra ≈ 90.5% (suy giảm nhẹ, ≈ −0.87 dB).

(c) Tại $f = 5$ kHz:
$$\\begin{aligned}
\\frac{f}{f_c} &= \\frac{5000}{1064} \\approx 4.70 \\\\
|H| &= \\frac{1}{\\sqrt{1 + 4.70^2}} = \\frac{1}{\\sqrt{23.09}} = \\frac{1}{4.805} \\approx 0.208
\\end{aligned}$$
→ Biên độ ra ≈ 20.8% (suy giảm mạnh, ≈ −13.6 dB).

**Bài 4**:

- Tại $f_c = 10$ kHz thì theo lý thuyết: −3 dB.
- Tại $f = 100$ kHz (tức $10 \\cdot f_c = 1$ decade từ $f_c$): đo được −20 dB.
- Bộ lọc này: biên độ giảm khi tần số **tăng** → đây là **LPF**.
- Từ $f_c$ đến 100 kHz (1 decade) giảm 20 dB → đúng với độ dốc **−20 dB/decade** của bậc 1.

→ Đây là **LPF bậc 1**.

**Bài 5**:

Với $f_c = 5$ Hz:
- Nếu $C = 1$ µF: $R = 1/(2\\pi \\times 5 \\times 1 \\times 10^{-6}) = 1/(3.14 \\times 10^{-5}) \\approx$ **31,831 Ω ≈ 32 kΩ** — giá trị tiêu chuẩn (33 kΩ). Thực tế, hợp lý.
- Nếu $C = 10$ µF: $R = 1/(2\\pi \\times 5 \\times 10^{-5}) = 1/(3.14 \\times 10^{-4}) \\approx$ **3,183 Ω ≈ 3.3 kΩ** — cũng tiêu chuẩn.

Cả hai đều dùng được về mặt giá trị. **Chọn $C = 1$ µF, $R = 33$ kΩ** vì $C = 10$ µF thường là tụ điện phân (có cực tính, cồng kềnh, đắt hơn), trong khi $C = 1$ µF có thể dùng tụ gốm hoặc film không phân cực, phù hợp hơn cho mạch tín hiệu.

**Bài 6**:

(A): $f_c = 1/(2\\pi \\times 1000 \\times 1 \\times 10^{-6}) \\approx$ **159 Hz**.

(B): $f_c = 1/(2\\pi \\times 10 \\times 100 \\times 10^{-6}) = 1/(2\\pi \\times 10^{-3}) \\approx$ **159 Hz**.

Cùng $f_c$! Nhưng thực tế:
- Bộ lọc (A): $R = 1$ kΩ — trở kháng nguồn tín hiệu thường là vài trăm Ω đến vài kΩ, $R = 1$ kΩ không gây tải quá nặng.
- Bộ lọc (B): $R = 10$ Ω — rất nhỏ, có thể gây dòng lớn qua mạch nguồn tín hiệu, gây sụt áp không mong muốn. $C = 100$ µF thường là tụ điện phân cồng kềnh.

→ Bộ lọc (A) thực tế hơn cho ứng dụng audio.

**Bài 7**:

$f_c = 500$ Hz, $f = 1$ kHz → $f/f_c = 2$.

$$\\begin{aligned}
|H| &= \\frac{1}{\\sqrt{1 + 2^2}} = \\frac{1}{\\sqrt{5}} \\approx 0.4472 \\\\
V_{\\text{out}} &= V_{\\text{in}} \\times |H| = 2 \\times 0.4472 \\approx 0.894 \\text{ V} \\\\
A_{\\text{dB}} &= 20 \\times \\log_{10}(0.4472) \\approx -7 \\text{ dB}
\\end{aligned}$$

→ **$V_{\\text{out}} \\approx 0.894$ V đỉnh** (tín hiệu 1 kHz bị suy giảm về ≈ 44.7% biên độ, tức −7 dB).

---

## Liên kết và bài tiếp theo

- **Bài trước**: [Lesson 06 — AC, Trở kháng & Mạch RLC](../lesson-06-ac-impedance-rlc/) — nền tảng về chia áp phức và trở kháng.
- **Bài tiếp theo**: [Lesson 08 — Nguồn & Dụng cụ đo](../lesson-08-power-instruments/) — nguồn điện, đo lường trong mạch điện tử.
- **Tham chiếu**: [Lesson 04 — Tụ điện & Mạch RC](../lesson-04-capacitor-rc/) — trở kháng $Z_C$ và mạch RC cơ bản.
- **Ứng dụng nâng cao**: [ADC/DAC — Tầng 3](../../03-Digital-MCU/lesson-05-adc-dac/) — chống aliasing trước chuyển đổi số.
- **Minh họa trực quan**: [visualization.html](./visualization.html)

---

## 📝 Tổng kết Lesson 07

1. **Bộ lọc tần số** chọn lọc dải tần cho qua; LPF cho tần thấp, HPF cho tần cao.
2. **$f_c = 1/(2\\pi RC)$** — tần số cắt; tại $f_c$, biên độ giảm còn $1/\\sqrt{2} \\approx 0.707$ tức −3 dB.
3. **LPF**: R nối tiếp → lấy áp tại C. **HPF**: C nối tiếp → lấy áp tại R. Cùng $f_c$, khác hướng suy giảm.
4. **$\\text{dB} = 20 \\cdot \\log_{10}(V_{\\text{out}}/V_{\\text{in}})$**: thang đo tiện lợi cho dải rộng. −3 dB tại $f_c$, −20 dB/decade (bậc 1).
5. **Giản đồ Bode**: trục log tần số, trục dB; đường gãy tại $f_c$, dốc −20 dB/decade.
6. **Ứng dụng**: lọc nguồn, crossover loa, anti-aliasing trước ADC, lọc nhiễu cảm biến.
`;
