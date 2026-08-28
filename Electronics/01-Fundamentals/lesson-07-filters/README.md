# Lesson 07 — Bộ lọc (Filters)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được bộ lọc tần số là gì và vì sao mạch điện cần nó.
- Tính **tần số cắt** $f_c = \frac{1}{2\pi RC}$ cho bộ lọc thông thấp và thông cao bậc 1.
- Hiểu ý nghĩa −3 dB tại $f_c$: biên độ giảm còn $1/\sqrt{2} \approx 70.7\%$.
- Đọc được **giản đồ Bode** (Bode plot) — đường đáp ứng biên độ theo log tần số.
- Biết khái niệm **độ sốc −20 dB/decade** và vì sao bộ lọc bậc 1 có độ dốc này.
- Áp dụng bộ lọc vào các bài toán thực tế: lọc nguồn, tách tín hiệu âm thanh, chống aliasing.

## Kiến thức tiền đề

- [Lesson 04 — Tụ điện & Mạch RC](../lesson-04-capacitor-rc/) — trở kháng tụ $Z_C = 1/(j\omega C)$.
- [Lesson 06 — AC, Trở kháng & Mạch RLC](../lesson-06-ac-impedance-rlc/) — chia áp phức, khái niệm $\omega = 2\pi f$.

---

## 1. Bộ lọc là gì và vì sao cần

### 1.1. Vấn đề thực tế

Bất kỳ tín hiệu điện thực tế nào cũng chứa **nhiều thành phần tần số trộn lẫn nhau**. Ví dụ:

- Tín hiệu âm thanh từ micro: từ 20 Hz (bass sâu) đến 20 000 Hz (treble cao), kèm theo nhiễu 50/60 Hz từ lưới điện.
- Tín hiệu đầu ra cảm biến nhiệt độ: thay đổi chậm (thông tin thực) + nhiễu tần số cao từ motor rung gần đó.
- Tín hiệu trước ADC (bộ chuyển đổi tương tự-số): nếu có tần số $> f_{\text{sample}}/2$ sẽ gây aliasing (tín hiệu ảo không thể phân biệt với tín hiệu thật).

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

<svg viewBox="0 0 420 220" style="max-width:420px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Bộ lọc thông thấp RC: R nối tiếp, C xuống GND, V_out lấy trên C">
  <defs><marker id="arw" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ledm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="npnm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <text x="40.0" y="64.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">V_in</text>
  <line x1="60.0" y1="60.0" x2="158.0" y2="60.0" stroke="#1a202c" stroke-width="2"/>
  <rect x="158.0" y="53.0" width="44.0" height="14.0" rx="0" fill="white" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="180.0" y="48.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">R</text>
  <line x1="202.0" y1="60.0" x2="300.0" y2="60.0" stroke="#1a202c" stroke-width="2"/>
  <circle cx="260.0" cy="60.0" r="3.5" fill="#1a202c"/>
  <line x1="300.0" y1="60.0" x2="340.0" y2="60.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#arw)"/>
  <text x="372.0" y="64.0" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">V_out</text>
  <line x1="260.0" y1="60.0" x2="260.0" y2="90.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="260.0" y1="88.0" x2="260.0" y2="105.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="248.0" y1="105.0" x2="272.0" y2="105.0" stroke="#1d4ed8" stroke-width="2.5"/>
  <line x1="248.0" y1="115.0" x2="272.0" y2="115.0" stroke="#1d4ed8" stroke-width="2.5"/>
  <line x1="260.0" y1="115.0" x2="260.0" y2="132.0" stroke="#1a202c" stroke-width="2"/>
  <text x="276.0" y="114.0" fill="#1d4ed8" font-size="11" text-anchor="start" font-weight="700">C</text>
  <line x1="260.0" y1="132.0" x2="260.0" y2="150.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="260.0" y1="150.0" x2="260.0" y2="160.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="246.0" y1="160.0" x2="274.0" y2="160.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="251.0" y1="165.0" x2="269.0" y2="165.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="256.0" y1="170.0" x2="264.0" y2="170.0" stroke="#1a202c" stroke-width="2"/>
  <text x="260.0" y="184.0" fill="#475569" font-size="10" text-anchor="middle">GND</text>
  <text x="210.0" y="205.0" fill="#475569" font-size="11" text-anchor="middle">tần số cao: C 'ngắn mạch' → V_out nhỏ · f_c = 1/(2πRC)</text>
</svg>

Tụ C đóng vai trò **chia áp phụ thuộc tần số**. Nhớ lại từ [Lesson 04](../lesson-04-capacitor-rc/) và [Lesson 06](../lesson-06-ac-impedance-rlc/): trở kháng tụ $Z_C = 1/(j\omega C)$ với $\omega = 2\pi f$.

### 2.2. Công thức và ý nghĩa

**Hàm truyền** (transfer function) — tỉ số biên độ $V_{\text{out}}/V_{\text{in}}$ theo tần số:

$$H(f) = \frac{V_{\text{out}}}{V_{\text{in}}} = \frac{Z_C}{R + Z_C} = \frac{1}{1 + j\omega RC}$$

**Biên độ** (độ lớn):

$$|H(f)| = \frac{1}{\sqrt{1 + (f/f_c)^2}}$$

trong đó **tần số cắt** (cutoff frequency):

$$f_c = \frac{1}{2\pi \cdot R \cdot C}$$

💡 **Ý nghĩa vật lý**: Ở tần số thấp ($f \ll f_c$), $Z_C$ rất lớn → hầu hết điện áp rơi trên C → $V_{\text{out}} \approx V_{\text{in}}$. Ở tần số cao ($f \gg f_c$), $Z_C$ rất nhỏ → C như ngắn mạch, hầu hết điện áp rơi trên R → $V_{\text{out}} \approx 0$.

**Tại $f = f_c$ chính xác**: $|H| = 1/\sqrt{1 + 1} = 1/\sqrt{2} \approx$ **0.707** → điện áp ra bằng **70.7% điện áp vào**.

**Tại sao gọi là −3 dB?** Vì:
- $\text{dB} = 20 \log_{10}(|H|) = 20 \log_{10}(1/\sqrt{2}) = 20 \cdot (-0.5 \cdot \log_{10} 2) = 20 \cdot (-0.5 \cdot 0.301) \approx$ **−3.01 dB ≈ −3 dB**.

### 2.3. Công thức f_c — walk-through và ví dụ

**Ví dụ 1**: $R = 1$ kΩ, $C = 1$ µF → tần số cắt?

$$\begin{aligned}
f_c &= \frac{1}{2\pi \times 1000 \times 1 \times 10^{-6}} \\
&= \frac{1}{2\pi \times 10^{-3}} = \frac{1}{6.283 \times 10^{-3}} \approx 159 \text{ Hz}
\end{aligned}$$

→ $f_c \approx$ **159 Hz**. Tín hiệu 50 Hz (nhiễu lưới) đi qua gần như nguyên vẹn; tín hiệu 10 kHz bị suy giảm mạnh.

**Ví dụ 2**: $R = 10$ kΩ, $C = 100$ nF → $f_c$?

$$f_c = \frac{1}{2\pi \times 10000 \times 100 \times 10^{-9}} = \frac{1}{2\pi \times 10^{-3}} \approx 159 \text{ Hz}$$

→ Cùng $f_c = 159$ Hz! Các cặp RC khác nhau có thể cho cùng $f_c$ — quan trọng là tích RC.

**Ví dụ 3**: $R = 4.7$ kΩ, $C = 33$ nF → $f_c$?

$$\begin{aligned}
f_c &= \frac{1}{2\pi \times 4700 \times 33 \times 10^{-9}} \\
&= \frac{1}{2\pi \times 1.551 \times 10^{-4}} = \frac{1}{9.745 \times 10^{-4}} \approx 1{,}026 \text{ Hz} \approx 1 \text{ kHz}
\end{aligned}$$

**Ví dụ 4**: $R = 100$ kΩ, $C = 10$ pF → $f_c$?

$$\begin{aligned}
f_c &= \frac{1}{2\pi \times 100000 \times 10 \times 10^{-12}} \\
&= \frac{1}{2\pi \times 10^{-6}} = \frac{1}{6.283 \times 10^{-6}} \approx 159{,}155 \text{ Hz} \approx 159 \text{ kHz}
\end{aligned}$$

→ Bộ lọc radio AM (530–1600 kHz) cần $f_c$ trong vùng này.

**Chọn R và C ngược lại từ $f_c$**: Nếu muốn $f_c = 1$ kHz và chọn $C = 10$ nF trước:

$$\begin{aligned}
R &= \frac{1}{2\pi \times f_c \times C} = \frac{1}{2\pi \times 1000 \times 10 \times 10^{-9}} \\
&= \frac{1}{6.283 \times 10^{-5}} \approx 15{,}915 \text{ Ω}
\end{aligned}$$

→ chọn điện trở tiêu chuẩn gần nhất 15 kΩ hoặc 16 kΩ.

### 2.4. Độ suy giảm tại các tần số khác

| $f/f_c$ | $\lvert H(f)\rvert$ | dB |
|---------|---------|------|
| 0.1 | ≈ 0.995 | ≈ −0.04 dB |
| 0.5 | ≈ 0.894 | ≈ −0.97 dB |
| 1 | 0.707 | −3 dB |
| 2 | ≈ 0.447 | ≈ −7 dB |
| 10 | ≈ 0.0995 | ≈ −20 dB |
| 100 | ≈ 0.00995 | ≈ −40 dB |

→ Cứ mỗi lần tần số tăng **10 lần** (1 decade), biên độ giảm thêm **20 dB** (ở vùng xa $f_c$). Đây là "độ dốc −20 dB/decade" của bộ lọc bậc 1.

⚠ **Lỗi thường gặp**: Nhầm $f_c = 1/(RC)$ (thiếu $2\pi$). Ví dụ: $R = 1$ kΩ, $C = 1$ µF → $1/(RC) = 1000$ rad/s $= \omega_c$ (tần số góc), còn $f_c = \omega_c/(2\pi) = 1000/6.283 \approx 159$ Hz. Phân biệt rõ $\omega_c$ (rad/s) và $f_c$ (Hz).

🔁 **Tự kiểm tra**: Tính $f_c$ khi $R = 2.2$ kΩ, $C = 47$ nF.

<details>
<summary>Đáp án</summary>

$f_c = \dfrac{1}{2\pi \times 2200 \times 47 \times 10^{-9}} = \dfrac{1}{2\pi \times 1.034 \times 10^{-4}} = \dfrac{1}{6.497 \times 10^{-4}} \approx$ **1,539 Hz ≈ 1.54 kHz**.

</details>

### 📝 Tóm tắt mục 2

- LPF RC: R nối tiếp, lấy áp ra tại C.
- $f_c = 1/(2\pi RC)$. Tích RC quyết định $f_c$, không phải giá trị riêng lẻ.
- Tại $f_c$: $|H| = 1/\sqrt{2} \approx 0.707$, tức −3 dB.
- Độ dốc suy giảm: −20 dB/decade (bậc 1).

---

## 3. Bộ lọc thông cao RC (High-Pass RC Filter)

### 3.1. Cấu trúc mạch

Đổi vị trí R và C: mắc **C nối tiếp** trước, lấy điện áp ra tại **R**:

<svg viewBox="0 0 420 220" style="max-width:420px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Bộ lọc thông cao RC: C nối tiếp, R xuống GND, V_out lấy trên R">
  <defs><marker id="arw" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="ledm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="npnm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <text x="40.0" y="64.0" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">V_in</text>
  <line x1="60.0" y1="60.0" x2="158.0" y2="60.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="158.0" y1="60.0" x2="175.0" y2="60.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="175.0" y1="48.0" x2="175.0" y2="72.0" stroke="#1d4ed8" stroke-width="2.5"/>
  <line x1="185.0" y1="48.0" x2="185.0" y2="72.0" stroke="#1d4ed8" stroke-width="2.5"/>
  <line x1="185.0" y1="60.0" x2="202.0" y2="60.0" stroke="#1a202c" stroke-width="2"/>
  <text x="180.0" y="42.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">C</text>
  <line x1="202.0" y1="60.0" x2="300.0" y2="60.0" stroke="#1a202c" stroke-width="2"/>
  <circle cx="260.0" cy="60.0" r="3.5" fill="#1a202c"/>
  <line x1="300.0" y1="60.0" x2="340.0" y2="60.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#arw)"/>
  <text x="372.0" y="64.0" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">V_out</text>
  <line x1="260.0" y1="60.0" x2="260.0" y2="90.0" stroke="#1a202c" stroke-width="2"/>
  <rect x="253.0" y="88.0" width="14.0" height="44.0" rx="0" fill="white" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="272.0" y="114.0" fill="#1d4ed8" font-size="11" text-anchor="start" font-weight="700">R</text>
  <line x1="260.0" y1="132.0" x2="260.0" y2="150.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="260.0" y1="150.0" x2="260.0" y2="160.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="246.0" y1="160.0" x2="274.0" y2="160.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="251.0" y1="165.0" x2="269.0" y2="165.0" stroke="#1a202c" stroke-width="2"/>
  <line x1="256.0" y1="170.0" x2="264.0" y2="170.0" stroke="#1a202c" stroke-width="2"/>
  <text x="260.0" y="184.0" fill="#475569" font-size="10" text-anchor="middle">GND</text>
  <text x="210.0" y="205.0" fill="#475569" font-size="11" text-anchor="middle">tần số thấp: C 'hở mạch' → V_out nhỏ · f_c = 1/(2πRC)</text>
</svg>

💡 **Hình dung**: Tụ C chặn một chiều (DC) và cản tần số thấp. Khi tần số thấp, $Z_C$ lớn → điện áp rơi chủ yếu trên C → $V_{\text{out}}$ nhỏ. Khi tần số cao, $Z_C$ nhỏ → C gần ngắn mạch → hầu hết điện áp rơi trên R → $V_{\text{out}} \approx V_{\text{in}}$.

### 3.2. Công thức

**Hàm truyền**:

$$H(f) = \frac{R}{R + Z_C} = \frac{j\omega RC}{1 + j\omega RC}$$

**Biên độ**:

$$|H(f)| = \frac{f/f_c}{\sqrt{1 + (f/f_c)^2}}$$

**Tần số cắt — cùng công thức**:

$$f_c = \frac{1}{2\pi \cdot R \cdot C}$$

Tại $f = f_c$: $|H| = 1/\sqrt{2} \approx 0.707$ → **−3 dB** (giống LPF, nhưng đây là điểm chuyển từ suy giảm sang thông).

Tần số thấp hơn $f_c$ → suy giảm (dốc +20 dB/decade từ trái sang). Tần số cao hơn $f_c$ → đi qua với $|H| \approx 1$.

### 3.3. Ứng dụng quan trọng: chặn thành phần DC

Trong âm thanh, tụ ghép (coupling capacitor) dùng làm HPF để chặn DC offset giữa các tầng khuếch đại — chỉ cho tín hiệu AC âm thanh đi qua.

### 3.4. Bốn ví dụ số

**Ví dụ 1**: $R = 10$ kΩ, $C = 1$ µF → $f_c$?

$$f_c = \frac{1}{2\pi \times 10000 \times 1 \times 10^{-6}} = \frac{1}{0.06283} \approx 15.9 \text{ Hz}$$

→ Đây là tụ ghép điển hình trong mạch khuếch đại âm thanh: loại DC và giữ lại toàn bộ dải âm nghe được (20 Hz – 20 kHz).

**Ví dụ 2**: $R = 1$ kΩ, $C = 10$ µF → $f_c$?

$$f_c = \frac{1}{2\pi \times 1000 \times 10 \times 10^{-6}} = \frac{1}{0.06283} \approx 15.9 \text{ Hz}$$

→ Cùng $f_c$ — lại một lần nữa tích $RC = 10^{-2}$ quyết định kết quả.

**Ví dụ 3**: $R = 4.7$ kΩ, $C = 100$ nF → $f_c$?

$$\begin{aligned}
f_c &= \frac{1}{2\pi \times 4700 \times 100 \times 10^{-9}} \\
&= \frac{1}{2\pi \times 4.7 \times 10^{-4}} = \frac{1}{2.953 \times 10^{-3}} \approx 339 \text{ Hz}
\end{aligned}$$

→ HPF lọc bỏ bass sâu dưới 339 Hz (dùng trong loa treble của hệ thống loa phân tần).

**Ví dụ 4**: Muốn HPF loại bỏ nhiễu 50 Hz (lưới điện), cho qua tín hiệu $> 500$ Hz. Chọn $f_c = 500$ Hz, $C = 22$ nF → $R$?

$$R = \frac{1}{2\pi \times 500 \times 22 \times 10^{-9}} = \frac{1}{6.912 \times 10^{-5}} \approx 14{,}469 \text{ Ω}$$

→ chọn 15 kΩ (tiêu chuẩn).

🔁 **Tự kiểm tra**: Với HPF $R = 33$ kΩ, $C = 47$ nF, tần số 100 Hz suy giảm bao nhiêu?

<details>
<summary>Đáp án</summary>

$f_c = 1/(2\pi \times 33000 \times 47 \times 10^{-9}) = 1/(2\pi \times 1.551 \times 10^{-3}) = 1/(9.745 \times 10^{-3}) \approx 102.6$ Hz.

Tại $f = 100$ Hz $\approx f_c$: $|H| \approx 1/\sqrt{2} \approx 0.707$ → **suy giảm −3 dB** (≈ 29.3%).

</details>

### 📝 Tóm tắt mục 3

- HPF RC: C nối tiếp trước, lấy áp ra tại R.
- $f_c$ cùng công thức $1/(2\pi RC)$.
- Tần số thấp hơn $f_c$ bị suy giảm; tần số cao đi qua.
- Ứng dụng điển hình: tụ ghép loại DC, loa treble trong crossover.

---

## 4. Khái niệm dB và độ dốc

### 4.1. Decibel (dB) là gì

**Decibel (dB)** là đơn vị logarithm thể hiện tỉ số hai đại lượng. Đối với điện áp:

$$A_{\text{dB}} = 20 \cdot \log_{10}\!\left(\frac{V_{\text{out}}}{V_{\text{in}}}\right)$$

💡 **Vì sao cần dB?** Trong thực tế, tín hiệu có thể thay đổi từ micro-Volt đến Volt — tỉ số lên tới 1.000.000:1. Thang tuyến tính quá bất tiện để vẽ đồ thị. Thang log nén toàn bộ vào một dải nhỏ gọn và thẳng.

**Vì sao dùng hệ số 20?** Vì công suất tỉ lệ với $V^2$. Nếu $P_{\text{dB}} = 10 \cdot \log_{10}(P_{\text{out}}/P_{\text{in}})$ thì $A_{\text{dB}} = 20 \cdot \log_{10}(V_{\text{out}}/V_{\text{in}})$ (vì $\log(x^2) = 2 \cdot \log(x)$).

**Các giá trị dB quen thuộc cần nhớ**:

| $V_{\text{out}}/V_{\text{in}}$ | $A_{\text{dB}}$ |
|------------|------|
| 1 (không thay đổi) | 0 dB |
| $\sqrt{2} \approx 1.414$ | +3 dB (tăng gấp $\sqrt{2}$) |
| $1/\sqrt{2} \approx 0.707$ | −3 dB (tại $f_c$) |
| 0.5 | −6 dB |
| 0.1 | −20 dB |
| 0.01 | −40 dB |
| 10 | +20 dB |

### 4.2. Độ dốc −20 dB/decade

**Decade** = dải tần số mà tần số tăng lên 10 lần (ví dụ: 100 Hz → 1 kHz là 1 decade; 1 kHz → 10 kHz là 1 decade nữa).

**Độ dốc −20 dB/decade**: với LPF bậc 1, ở vùng $f \gg f_c$, mỗi khi $f$ tăng 10 lần, $|H|$ giảm 10 lần → $A_{\text{dB}}$ giảm 20 dB.

**Chứng minh** (ở vùng $f \gg f_c$): $|H| = 1/\sqrt{1 + (f/f_c)^2} \approx f_c/f$. Tại $f_1$ và $10f_1$: $|H(f_1)| = f_c/f_1$, $|H(10f_1)| = f_c/(10f_1) = (1/10) \cdot |H(f_1)|$. Tỉ số $= 1/10$ → $A = 20 \cdot \log_{10}(1/10) =$ **−20 dB**.

**Tương đương**: −20 dB/decade = **−6 dB/octave** (mỗi octave = tần số tăng 2 lần). Kỹ sư âm thanh thường dùng dB/octave.

⚠ **Lỗi thường gặp**: Nhầm độ dốc là −3 dB/decade. Giá trị −3 dB chỉ là biên độ **tại** $f_c$, không phải độ dốc.

### 4.3. Bộ lọc bậc cao hơn

Ghép nhiều tầng RC nối tiếp → độ dốc dốc hơn:
- Bậc 1: −20 dB/decade
- Bậc 2: −40 dB/decade
- Bậc 4: −80 dB/decade (dùng trong lọc chống aliasing)

### 📝 Tóm tắt mục 4

- dB điện áp $= 20 \cdot \log_{10}(V_{\text{out}}/V_{\text{in}})$. Tại $f_c$: −3 dB.
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

<svg viewBox="0 0 640 220" style="max-width:640px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị Bode biên độ bộ lọc thông thấp: 0 dB dưới f_c, giảm −20 dB/decade trên f_c = 1 kHz, −3 dB tại f_c">
  <defs><marker id="bd1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="160.0" y1="174.4" x2="160.0" y2="42.4"/>
<line x1="250.0" y1="174.4" x2="250.0" y2="42.4"/>
<line x1="340.0" y1="174.4" x2="340.0" y2="42.4"/>
<line x1="430.0" y1="174.4" x2="430.0" y2="42.4"/>
<line x1="520.0" y1="174.4" x2="520.0" y2="42.4"/>
<line x1="70.0" y1="60.0" x2="547.0" y2="60.0"/>
<line x1="70.0" y1="104.0" x2="547.0" y2="104.0"/>
<line x1="70.0" y1="148.0" x2="547.0" y2="148.0"/>
</g>
  <line x1="64.0" y1="60.0" x2="569.0" y2="60.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#bd1)"/>
  <line x1="70.0" y1="180.4" x2="70.0" y2="20.4" stroke="#1a202c" stroke-width="1.5" marker-end="url(#bd1)"/>
  <text x="561.0" y="76.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">f (Hz, log)</text>
  <text x="78.0" y="30.4" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">dB</text>
  <line x1="160.0" y1="56.0" x2="160.0" y2="64.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="160.0" y="76.0" fill="#475569" font-size="11" text-anchor="middle">10</text>
  <line x1="250.0" y1="56.0" x2="250.0" y2="64.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="250.0" y="76.0" fill="#475569" font-size="11" text-anchor="middle">100</text>
  <line x1="340.0" y1="56.0" x2="340.0" y2="64.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="340.0" y="76.0" fill="#475569" font-size="11" text-anchor="middle">1k</text>
  <line x1="430.0" y1="56.0" x2="430.0" y2="64.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="430.0" y="76.0" fill="#475569" font-size="11" text-anchor="middle">10k</text>
  <line x1="520.0" y1="56.0" x2="520.0" y2="64.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="520.0" y="76.0" fill="#475569" font-size="11" text-anchor="middle">100k</text>
  <line x1="66.0" y1="60.0" x2="74.0" y2="60.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="63.0" y="64.0" fill="#475569" font-size="11" text-anchor="end">0</text>
  <line x1="66.0" y1="104.0" x2="74.0" y2="104.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="63.0" y="108.0" fill="#475569" font-size="11" text-anchor="end">−20</text>
  <line x1="66.0" y1="148.0" x2="74.0" y2="148.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="63.0" y="152.0" fill="#475569" font-size="11" text-anchor="end">−40</text>
  <path d="M 79.0,60.0 L 82.8,60.0 L 86.7,60.0 L 90.5,60.0 L 94.3,60.0 L 98.1,60.0 L 102.0,60.0 L 105.8,60.0 L 109.6,60.0 L 113.4,60.0 L 117.2,60.0 L 121.1,60.0 L 124.9,60.0 L 128.7,60.0 L 132.6,60.0 L 136.4,60.0 L 140.2,60.0 L 144.0,60.0 L 147.9,60.0 L 151.7,60.0 L 155.5,60.0 L 159.3,60.0 L 163.2,60.0 L 167.0,60.0 L 170.8,60.0 L 174.6,60.0 L 178.5,60.0 L 182.3,60.0 L 186.1,60.0 L 189.9,60.0 L 193.8,60.0 L 197.6,60.0 L 201.4,60.0 L 205.2,60.0 L 209.1,60.0 L 212.9,60.0 L 216.7,60.0 L 220.5,60.0 L 224.3,60.0 L 228.2,60.0 L 232.0,60.0 L 235.8,60.0 L 239.7,60.1 L 243.5,60.1 L 247.3,60.1 L 251.1,60.1 L 255.0,60.1 L 258.8,60.1 L 262.6,60.2 L 266.4,60.2 L 270.3,60.3 L 274.1,60.3 L 277.9,60.4 L 281.7,60.5 L 285.6,60.6 L 289.4,60.7 L 293.2,60.8 L 297.0,61.0 L 300.9,61.2 L 304.7,61.5 L 308.5,61.7 L 312.3,62.1 L 316.2,62.5 L 320.0,62.9 L 323.8,63.5 L 327.6,64.1 L 331.5,64.8 L 335.3,65.5 L 339.1,66.4 L 342.9,67.4 L 346.8,68.4 L 350.6,69.6 L 354.4,70.8 L 358.2,72.1 L 362.1,73.5 L 365.9,74.9 L 369.7,76.4 L 373.5,78.0 L 377.4,79.6 L 381.2,81.2 L 385.0,82.9 L 388.8,84.6 L 392.7,86.4 L 396.5,88.1 L 400.3,89.9 L 404.1,91.7 L 408.0,93.5 L 411.8,95.3 L 415.6,97.2 L 419.4,99.0 L 423.3,100.8 L 427.1,102.7 L 430.9,104.5 L 434.7,106.4 L 438.5,108.2 L 442.4,110.1 L 446.2,112.0 L 450.0,113.8 L 453.9,115.7 L 457.7,117.6 L 461.5,119.4 L 465.3,121.3 L 469.1,123.2 L 473.0,125.0 L 476.8,126.9 L 480.6,128.8 L 484.4,130.6 L 488.3,132.5 L 492.1,134.4 L 495.9,136.2 L 499.8,138.1 L 503.6,140.0 L 507.4,141.8 L 511.2,143.7 L 515.0,145.6 L 518.9,147.5 L 522.7,149.3 L 526.5,151.2 L 530.4,153.1 L 534.2,154.9 L 538.0,156.8" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <line x1="340.0" y1="174.4" x2="340.0" y2="55.6" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="340.0" y="47.2" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">f_c = 1 kHz (−3 dB)</text>
  <circle cx="340.0" cy="66.6" r="4" fill="#dc2626"/>
  <line x1="79.0" y1="60.0" x2="340.0" y2="60.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3"/>
  <line x1="340.0" y1="60.0" x2="538.0" y2="156.8" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="466.0" y="112.8" fill="#475569" font-size="11" text-anchor="start">dốc −20 dB/decade</text>
  <text x="300.0" y="205.0" fill="#475569" font-size="10" text-anchor="middle">đường xanh: đáp ứng thật · nét đứt: xấp xỉ tiệm cận</text>
</svg>

### 5.3. Giản đồ Bode cho HPF bậc 1

Đối xứng ngược với LPF:

<svg viewBox="0 0 640 220" style="max-width:640px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đồ thị Bode biên độ bộ lọc thông cao: tăng +20 dB/decade dưới f_c, 0 dB trên f_c = 1 kHz">
  <defs><marker id="bd2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <g stroke="#e2e8f0" stroke-width="1">
<line x1="160.0" y1="174.4" x2="160.0" y2="42.4"/>
<line x1="250.0" y1="174.4" x2="250.0" y2="42.4"/>
<line x1="340.0" y1="174.4" x2="340.0" y2="42.4"/>
<line x1="430.0" y1="174.4" x2="430.0" y2="42.4"/>
<line x1="520.0" y1="174.4" x2="520.0" y2="42.4"/>
<line x1="70.0" y1="60.0" x2="547.0" y2="60.0"/>
<line x1="70.0" y1="104.0" x2="547.0" y2="104.0"/>
<line x1="70.0" y1="148.0" x2="547.0" y2="148.0"/>
</g>
  <line x1="64.0" y1="60.0" x2="569.0" y2="60.0" stroke="#1a202c" stroke-width="1.5" marker-end="url(#bd2)"/>
  <line x1="70.0" y1="180.4" x2="70.0" y2="20.4" stroke="#1a202c" stroke-width="1.5" marker-end="url(#bd2)"/>
  <text x="561.0" y="76.0" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">f (Hz, log)</text>
  <text x="78.0" y="30.4" fill="#1a202c" font-size="13" text-anchor="start" font-style="italic">dB</text>
  <line x1="160.0" y1="56.0" x2="160.0" y2="64.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="160.0" y="76.0" fill="#475569" font-size="11" text-anchor="middle">10</text>
  <line x1="250.0" y1="56.0" x2="250.0" y2="64.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="250.0" y="76.0" fill="#475569" font-size="11" text-anchor="middle">100</text>
  <line x1="340.0" y1="56.0" x2="340.0" y2="64.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="340.0" y="76.0" fill="#475569" font-size="11" text-anchor="middle">1k</text>
  <line x1="430.0" y1="56.0" x2="430.0" y2="64.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="430.0" y="76.0" fill="#475569" font-size="11" text-anchor="middle">10k</text>
  <line x1="520.0" y1="56.0" x2="520.0" y2="64.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="520.0" y="76.0" fill="#475569" font-size="11" text-anchor="middle">100k</text>
  <line x1="66.0" y1="60.0" x2="74.0" y2="60.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="63.0" y="64.0" fill="#475569" font-size="11" text-anchor="end">0</text>
  <line x1="66.0" y1="104.0" x2="74.0" y2="104.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="63.0" y="108.0" fill="#475569" font-size="11" text-anchor="end">−20</text>
  <line x1="66.0" y1="148.0" x2="74.0" y2="148.0" stroke="#1a202c" stroke-width="1.5"/>
  <text x="63.0" y="152.0" fill="#475569" font-size="11" text-anchor="end">−40</text>
  <path d="M 79.0,187.6 L 82.8,185.7 L 86.7,183.9 L 90.5,182.0 L 94.3,180.1 L 98.1,178.3 L 102.0,176.4 L 105.8,174.5 L 109.6,172.6 L 113.4,170.8 L 117.2,168.9 L 121.1,167.0 L 124.9,165.2 L 128.7,163.3 L 132.6,161.4 L 136.4,159.6 L 140.2,157.7 L 144.0,155.8 L 147.9,153.9 L 151.7,152.1 L 155.5,150.2 L 159.3,148.3 L 163.2,146.5 L 167.0,144.6 L 170.8,142.7 L 174.6,140.9 L 178.5,139.0 L 182.3,137.1 L 186.1,135.2 L 189.9,133.4 L 193.8,131.5 L 197.6,129.6 L 201.4,127.8 L 205.2,125.9 L 209.1,124.0 L 212.9,122.2 L 216.7,120.3 L 220.5,118.4 L 224.3,116.6 L 228.2,114.7 L 232.0,112.8 L 235.8,111.0 L 239.7,109.1 L 243.5,107.3 L 247.3,105.4 L 251.1,103.6 L 255.0,101.7 L 258.8,99.9 L 262.6,98.0 L 266.4,96.2 L 270.3,94.4 L 274.1,92.6 L 277.9,90.8 L 281.7,89.0 L 285.6,87.2 L 289.4,85.4 L 293.2,83.7 L 297.0,82.0 L 300.9,80.3 L 304.7,78.7 L 308.5,77.1 L 312.3,75.6 L 316.2,74.1 L 320.0,72.7 L 323.8,71.4 L 327.6,70.1 L 331.5,68.9 L 335.3,67.8 L 339.1,66.8 L 342.9,65.9 L 346.8,65.1 L 350.6,64.4 L 354.4,63.7 L 358.2,63.2 L 362.1,62.7 L 365.9,62.3 L 369.7,61.9 L 373.5,61.6 L 377.4,61.3 L 381.2,61.1 L 385.0,60.9 L 388.8,60.8 L 392.7,60.6 L 396.5,60.5 L 400.3,60.4 L 404.1,60.4 L 408.0,60.3 L 411.8,60.2 L 415.6,60.2 L 419.4,60.2 L 423.3,60.1 L 427.1,60.1 L 430.9,60.1 L 434.7,60.1 L 438.5,60.1 L 442.4,60.1 L 446.2,60.0 L 450.0,60.0 L 453.9,60.0 L 457.7,60.0 L 461.5,60.0 L 465.3,60.0 L 469.1,60.0 L 473.0,60.0 L 476.8,60.0 L 480.6,60.0 L 484.4,60.0 L 488.3,60.0 L 492.1,60.0 L 495.9,60.0 L 499.8,60.0 L 503.6,60.0 L 507.4,60.0 L 511.2,60.0 L 515.0,60.0 L 518.9,60.0 L 522.7,60.0 L 526.5,60.0 L 530.4,60.0 L 534.2,60.0 L 538.0,60.0" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round"/>
  <line x1="340.0" y1="174.4" x2="340.0" y2="55.6" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="340.0" y="47.2" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">f_c = 1 kHz (−3 dB)</text>
  <circle cx="340.0" cy="66.6" r="4" fill="#dc2626"/>
  <line x1="340.0" y1="60.0" x2="538.0" y2="60.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3"/>
  <line x1="79.0" y1="187.6" x2="340.0" y2="60.0" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="106.0" y="112.8" fill="#475569" font-size="11" text-anchor="start">dốc +20 dB/decade</text>
  <text x="300.0" y="205.0" fill="#475569" font-size="10" text-anchor="middle">đường xanh: đáp ứng thật · nét đứt: xấp xỉ tiệm cận</text>
</svg>

Phần dốc ở trái f_c dốc lên +20 dB/decade (tần số tăng gấp 10 → biên độ tăng gấp 10). Bên phải f_c: 0 dB.

❓ **Câu hỏi tự nhiên**: Có phải đường Bode thực là gấp khúc hoàn toàn không?

Không. Đường gấp khúc chỉ là **phép xấp xỉ tuyến tính** (straight-line Bode approximation). Đường thực tế là đường cong mượt, chỉ khớp với đường thẳng ở xa f_c và lệch tối đa 3 dB tại điểm f = f_c.

🔁 **Tự kiểm tra**: Tại $f = 10 \cdot f_c$ (gấp 10 lần tần số cắt), độ suy giảm của LPF bậc 1 xấp xỉ bao nhiêu dB?

<details>
<summary>Đáp án</summary>

$|H| = 1/\sqrt{1 + 10^2} = 1/\sqrt{101} \approx 0.0995$. $A_{\text{dB}} = 20 \cdot \log_{10}(0.0995) \approx 20 \cdot (-1.002) \approx$ **−20 dB**.

(Đúng như dự đoán từ độ dốc −20 dB/decade — tại $10 \cdot f_c$ là 1 decade từ $f_c$.)

</details>

### 📝 Tóm tắt mục 5

- Giản đồ Bode: trục X là $\log(f)$, trục Y là $A_{\text{dB}}$.
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

Trước khi đưa tín hiệu vào bộ chuyển đổi tương tự-số (ADC), **bắt buộc** phải lọc bỏ tất cả tần số cao hơn $f_{\text{sample}}/2$ (điều kiện Nyquist). Bộ lọc này gọi là **anti-aliasing filter** — là một LPF với $f_c \leq f_{\text{sample}}/2$.

Ví dụ: ADC lấy mẫu 8 kHz (điện thoại cũ) → cần LPF với $f_c = 4$ kHz. Nếu thiếu bộ lọc, tần số $> 4$ kHz sẽ "gập ngược" (alias) xuống dải thấp hơn gây tiếng méo không thể phân biệt.

Sẽ học kỹ hơn về ADC tại [Lesson 05 — ADC/DAC](../../03-Digital-MCU/lesson-05-adc-dac/).

### 6.4. Lọc nhiễu cảm biến

Cảm biến nhiệt độ, áp suất thường thay đổi chậm (vài Hz hoặc thậm chí mHz). Nhiễu từ motor, nguồn điện có thể có tần số kHz. Một LPF đơn giản RC đặt ngay sau cảm biến loại bỏ nhiễu trước khi tín hiệu vào vi điều khiển.

Ví dụ thực tế: $R = 10$ kΩ, $C = 10$ µF → $f_c = 1/(2\pi \times 10^4 \times 10^{-5}) \approx$ **1.6 Hz** → loại bỏ hầu hết nhiễu điện tử, giữ lại biến động nhiệt độ chậm.

### 📝 Tóm tắt mục 6

- LPF trong nguồn: lọc gợn sóng ripple.
- Crossover loa: LPF cho woofer, HPF cho tweeter.
- Anti-aliasing: LPF bắt buộc trước ADC ($f_c \leq f_{\text{sample}}/2$).
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

**Bài 7**: Tín hiệu $V_{\text{in}} = 2$ V đỉnh, tần số 1 kHz đi qua LPF RC với $f_c = 500$ Hz. Tính $V_{\text{out}}$.

### Lời giải chi tiết

**Bài 1**:

Bước 1 — Tính $R$ từ $f_c = 300$ Hz, $C = 100$ nF $= 100 \times 10^{-9}$ F:
$$\begin{aligned}
R &= \frac{1}{2\pi \times f_c \times C} = \frac{1}{2\pi \times 300 \times 100 \times 10^{-9}} \\
&= \frac{1}{2\pi \times 3 \times 10^{-5}} = \frac{1}{1.885 \times 10^{-4}} \approx 5{,}305 \text{ Ω}
\end{aligned}$$
→ chọn 5.1 kΩ hoặc 5.6 kΩ tiêu chuẩn.

Bước 2 — Tính độ suy giảm tại $f = 3$ kHz:
$$\begin{aligned}
\frac{f}{f_c} &= \frac{3000}{300} = 10 \\
|H| &= \frac{1}{\sqrt{1 + 10^2}} = \frac{1}{\sqrt{101}} \approx 0.0995 \\
A_{\text{dB}} &= 20 \times \log_{10}(0.0995) \approx -20 \text{ dB}
\end{aligned}$$

→ $R \approx$ **5.1 kΩ**, tại 3 kHz suy giảm **−20 dB** (tín hiệu treble còn ≈ 10% biên độ).

**Bài 2**:

Bước 1 — Tính $f_c$:
$$\begin{aligned}
f_c &= \frac{1}{2\pi \times 47000 \times 22 \times 10^{-9}} \\
&= \frac{1}{2\pi \times 1.034 \times 10^{-3}} = \frac{1}{6.497 \times 10^{-3}} \approx 153.9 \text{ Hz} \approx 154 \text{ Hz}
\end{aligned}$$

Bước 2 — Tính $|H|$ tại $f = 50$ Hz (HPF):
$$\begin{aligned}
\frac{f}{f_c} &= \frac{50}{154} \approx 0.325 \\
|H| &= \frac{f/f_c}{\sqrt{1 + (f/f_c)^2}} = \frac{0.325}{\sqrt{1 + 0.1056}} = \frac{0.325}{\sqrt{1.1056}} = \frac{0.325}{1.0515} \approx 0.309 \\
A_{\text{dB}} &= 20 \times \log_{10}(0.309) \approx -10.2 \text{ dB}
\end{aligned}$$

→ Nhiễu 50 Hz bị suy giảm khoảng **−10 dB** (biên độ còn 30.9%). Để lọc tốt hơn cần $f_c$ cao hơn 50 Hz.

**Bài 3**:

(a) $f_c$:
$$\begin{aligned}
f_c &= \frac{1}{2\pi \times 2200 \times 68 \times 10^{-9}} \\
&= \frac{1}{2\pi \times 1.496 \times 10^{-4}} = \frac{1}{9.398 \times 10^{-4}} \approx 1{,}064 \text{ Hz} \approx 1.06 \text{ kHz}
\end{aligned}$$

(b) Tại $f = 500$ Hz:
$$\begin{aligned}
\frac{f}{f_c} &= \frac{500}{1064} \approx 0.470 \\
|H| &= \frac{1}{\sqrt{1 + 0.470^2}} = \frac{1}{\sqrt{1.221}} = \frac{1}{1.105} \approx 0.905
\end{aligned}$$
→ Biên độ ra ≈ 90.5% (suy giảm nhẹ, ≈ −0.87 dB).

(c) Tại $f = 5$ kHz:
$$\begin{aligned}
\frac{f}{f_c} &= \frac{5000}{1064} \approx 4.70 \\
|H| &= \frac{1}{\sqrt{1 + 4.70^2}} = \frac{1}{\sqrt{23.09}} = \frac{1}{4.805} \approx 0.208
\end{aligned}$$
→ Biên độ ra ≈ 20.8% (suy giảm mạnh, ≈ −13.6 dB).

**Bài 4**:

- Tại $f_c = 10$ kHz thì theo lý thuyết: −3 dB.
- Tại $f = 100$ kHz (tức $10 \cdot f_c = 1$ decade từ $f_c$): đo được −20 dB.
- Bộ lọc này: biên độ giảm khi tần số **tăng** → đây là **LPF**.
- Từ $f_c$ đến 100 kHz (1 decade) giảm 20 dB → đúng với độ dốc **−20 dB/decade** của bậc 1.

→ Đây là **LPF bậc 1**.

**Bài 5**:

Với $f_c = 5$ Hz:
- Nếu $C = 1$ µF: $R = 1/(2\pi \times 5 \times 1 \times 10^{-6}) = 1/(3.14 \times 10^{-5}) \approx$ **31,831 Ω ≈ 32 kΩ** — giá trị tiêu chuẩn (33 kΩ). Thực tế, hợp lý.
- Nếu $C = 10$ µF: $R = 1/(2\pi \times 5 \times 10^{-5}) = 1/(3.14 \times 10^{-4}) \approx$ **3,183 Ω ≈ 3.3 kΩ** — cũng tiêu chuẩn.

Cả hai đều dùng được về mặt giá trị. **Chọn $C = 1$ µF, $R = 33$ kΩ** vì $C = 10$ µF thường là tụ điện phân (có cực tính, cồng kềnh, đắt hơn), trong khi $C = 1$ µF có thể dùng tụ gốm hoặc film không phân cực, phù hợp hơn cho mạch tín hiệu.

**Bài 6**:

(A): $f_c = 1/(2\pi \times 1000 \times 1 \times 10^{-6}) \approx$ **159 Hz**.

(B): $f_c = 1/(2\pi \times 10 \times 100 \times 10^{-6}) = 1/(2\pi \times 10^{-3}) \approx$ **159 Hz**.

Cùng $f_c$! Nhưng thực tế:
- Bộ lọc (A): $R = 1$ kΩ — trở kháng nguồn tín hiệu thường là vài trăm Ω đến vài kΩ, $R = 1$ kΩ không gây tải quá nặng.
- Bộ lọc (B): $R = 10$ Ω — rất nhỏ, có thể gây dòng lớn qua mạch nguồn tín hiệu, gây sụt áp không mong muốn. $C = 100$ µF thường là tụ điện phân cồng kềnh.

→ Bộ lọc (A) thực tế hơn cho ứng dụng audio.

**Bài 7**:

$f_c = 500$ Hz, $f = 1$ kHz → $f/f_c = 2$.

$$\begin{aligned}
|H| &= \frac{1}{\sqrt{1 + 2^2}} = \frac{1}{\sqrt{5}} \approx 0.4472 \\
V_{\text{out}} &= V_{\text{in}} \times |H| = 2 \times 0.4472 \approx 0.894 \text{ V} \\
A_{\text{dB}} &= 20 \times \log_{10}(0.4472) \approx -7 \text{ dB}
\end{aligned}$$

→ **$V_{\text{out}} \approx 0.894$ V đỉnh** (tín hiệu 1 kHz bị suy giảm về ≈ 44.7% biên độ, tức −7 dB).

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
2. **$f_c = 1/(2\pi RC)$** — tần số cắt; tại $f_c$, biên độ giảm còn $1/\sqrt{2} \approx 0.707$ tức −3 dB.
3. **LPF**: R nối tiếp → lấy áp tại C. **HPF**: C nối tiếp → lấy áp tại R. Cùng $f_c$, khác hướng suy giảm.
4. **$\text{dB} = 20 \cdot \log_{10}(V_{\text{out}}/V_{\text{in}})$**: thang đo tiện lợi cho dải rộng. −3 dB tại $f_c$, −20 dB/decade (bậc 1).
5. **Giản đồ Bode**: trục log tần số, trục dB; đường gãy tại $f_c$, dốc −20 dB/decade.
6. **Ứng dụng**: lọc nguồn, crossover loa, anti-aliasing trước ADC, lọc nhiễu cảm biến.
