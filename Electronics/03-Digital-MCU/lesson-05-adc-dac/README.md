# Lesson 05 — ADC/DAC & Lấy mẫu

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được vì sao cần ADC (Analog-to-Digital Converter) và DAC (Digital-to-Analog Converter) để kết nối thế giới thực với vi điều khiển.
- Mô tả nguyên lý **lấy mẫu (sampling)** và áp dụng **định lý Nyquist** để chọn tần số lấy mẫu phù hợp.
- Tính toán **độ phân giải lượng tử hóa (quantization)** theo số bit: bước LSB, sai số tối đa.
- Chuyển đổi qua lại giữa điện áp tương tự và mã số: công thức ADC và DAC.
- Phân biệt định tính các kiểu ADC phổ biến (SAR, Flash, Sigma-Delta) và DAC kiểu R-2R.
- Đọc giá trị `analogRead()` trên Arduino (ADC 10-bit) và suy ngược ra điện áp.

## Kiến thức tiền đề

- [Lesson 06 AC, trở kháng & RLC](../../01-Fundamentals/lesson-06-ac-impedance-rlc/) — hiểu tín hiệu tương tự, tần số, biên độ.
- [Lesson 07 — Bộ lọc (Filters)](../../01-Fundamentals/lesson-07-filters/) — bộ lọc anti-aliasing, low-pass filter.
- [Lesson 08 — Op-Amp Applications](../../02-Semiconductors/lesson-08-opamp-applications/) — mạch cộng op-amp dùng trong DAC kiểu R-2R.

---

## 1. Vì sao cần ADC và DAC?

### 1.1. Thế giới thực là tương tự (analog)

💡 **Trực giác**: Nhiệt độ ngoài trời không nhảy đột ngột từ 25 °C sang 26 °C — nó thay đổi liên tục, mượt mà theo thời gian. Ánh sáng trong phòng, âm thanh của giọng nói, điện áp cảm biến đo độ ẩm... đều là **tín hiệu tương tự (analog signal)**: biên độ có thể nhận **vô số giá trị** trong một dải liên tục.

Ngược lại, vi điều khiển (MCU), máy tính, và mọi thiết bị số chỉ hiểu hai trạng thái: **0 và 1**. Chúng không "nhìn thấy" trực tiếp điện áp 2.37 V — chúng chỉ hiểu dãy bit như `0b01111001`.

→ Cần **cầu nối** giữa hai thế giới:

| Thiết bị | Chiều chuyển đổi | Ứng dụng |
|----------|-----------------|----------|
| **ADC** (Analog-to-Digital Converter) | Tương tự → Số | Cảm biến nhiệt độ, microphone, camera |
| **DAC** (Digital-to-Analog Converter) | Số → Tương tự | Loa, motor control, màn hình |

### 1.2. Ví dụ hệ thống thực

Xét hệ thống thu âm:

```
Giọng nói → Microphone → [tín hiệu điện áp tương tự]
→ Bộ lọc anti-aliasing → ADC → Dữ liệu số → Xử lý (DSP/MCU)
→ DAC → Bộ khuếch đại → Loa
```

Mỗi bước đều có tham số kỹ thuật cụ thể: tần số lấy mẫu, số bit, điện áp tham chiếu. Bài này giải thích từng khái niệm.

❓ **Câu hỏi tự nhiên của người đọc**:
- *"Sao không cứ đo điện áp liên tục, không cần 'lấy mẫu'?"* — MCU chỉ có thể xử lý một giá trị tại một thời điểm; hơn nữa bộ nhớ hữu hạn, không thể lưu vô số điểm. Phải rời rạc hóa thời gian (sampling) và biên độ (quantization).
- *"ADC và DAC có nằm trong vi điều khiển không?"* — Có. Hầu hết MCU hiện đại (Arduino Uno, STM32, ESP32...) tích hợp sẵn ADC bên trong chip; một số có cả DAC (STM32, ESP32). Tuy nhiên khi cần độ phân giải cao hơn, dùng chip ADC/DAC rời ngoài (ADS1115, MCP4725...).

📝 **Tóm tắt mục 1**:
- Thế giới thực là tương tự; máy tính/MCU là số → cần ADC và DAC.
- ADC: tương tự → số (đọc cảm biến). DAC: số → tương tự (xuất âm thanh, điều khiển).
- Mọi MCU hiện đại đều tích hợp sẵn ADC.

---

## 2. Lấy mẫu (Sampling) & Định lý Nyquist

### 2.1. Lấy mẫu là gì?

**Lấy mẫu (sampling)** là quá trình đo giá trị của tín hiệu tương tự tại các thời điểm rời rạc đều nhau, với chu kỳ $T_s$ giây.

- **Tần số lấy mẫu**: $f_s = 1 / T_s$ (đơn vị: Hz, kHz, hoặc kSPS — kilo-Samples Per Second).
- Mỗi lần đo tạo ra một **mẫu (sample)** — một số thực.

💡 **Hình dung**: Tưởng tượng bạn chụp ảnh một chiếc quạt đang quay. Nếu chụp đủ nhanh (tốc độ màn trập cao), bạn thấy rõ từng vị trí cánh quạt. Nếu chụp quá chậm, bạn thấy cánh quạt ở những vị trí ngẫu nhiên trông như đứng yên hoặc quay ngược — đó chính là hiện tượng **aliasing**.

### 2.2. Định lý Nyquist-Shannon

**Định lý**: Để tái tạo chính xác một tín hiệu có thành phần tần số cao nhất là $f_{\text{max}}$, tần số lấy mẫu phải thỏa:

$$f_s > 2 \cdot f_{\text{max}}$$

(Tần số Nyquist $= f_s / 2$)

**Ý nghĩa vật lý**: Trong một chu kỳ tín hiệu, cần ít nhất 2 mẫu để xác định được "đây là sóng tần số cao" hay chỉ là "giá trị hằng". Nếu lấy đúng 1 mẫu/chu kỳ, bạn có thể bắt đúng đỉnh mọi lúc → trông như sóng DC.

**Ví dụ 1 — Âm thanh CD (44.1 kHz)**:
- Tai người nghe được đến ~20 kHz → $f_{\text{max}} = 20$ kHz.
- Nyquist: $f_s > 2 \times 20\,000 = 40\,000$ Hz.
- CD chọn **$f_s = 44.1$ kHz** (tức 44,100 mẫu/giây) → đáp ứng Nyquist với biên an toàn 10%.
- Ví dụ 44 100 mẫu/giây × 16 bit × 2 kênh = 1.411 Mbit/s — đây là bitrate của file WAV CD-quality.

**Ví dụ 2 — Voice/VoIP (8 kHz)**:
- Giọng nói có thể hiểu được ở dải 300 Hz – 3400 Hz → $f_{\text{max}} \approx 3.4$ kHz.
- Nyquist: $f_s > 6.8$ kHz → chọn **$f_s = 8$ kHz** (chuẩn G.711 telephony).
- Dữ liệu thấp hơn nhiều, phù hợp mạng điện thoại.

**Ví dụ 3 — Âm thanh hi-res (192 kHz)**:
- Studio recording dùng **f_s = 96 kHz hoặc 192 kHz** để capture cả siêu âm và có margin lớn cho xử lý số.

⚠ **Lỗi thường gặp**: Nhiều người nghĩ "chỉ cần $f_s = 2 \cdot f_{\text{max}}$ là đủ". Thực ra định lý yêu cầu **$f_s > 2 \cdot f_{\text{max}}$** (bất đẳng thức nghiêm), và trong thực tế phải lấy $f_s \geq 2.1 \times f_{\text{max}}$ để tránh aliasing ở ranh giới, đồng thời bộ lọc anti-aliasing sẽ không lý tưởng.

### 2.3. Aliasing — hiện tượng méo khi vi phạm Nyquist

Khi $f_s \leq 2 \cdot f_{\text{max}}$, tín hiệu tần số cao bị "hóa trang" thành tín hiệu tần số thấp hơn — gọi là **aliasing**.

**Ví dụ minh họa**: Tín hiệu sin 900 Hz được lấy mẫu với $f_s = 1000$ Hz:
- $f_{\text{alias}} = |f_{\text{signal}} - f_s| = |900 - 1000| =$ **100 Hz** (thay vì 900 Hz!)
- Bạn đọc được 100 Hz dù tín hiệu gốc là 900 Hz — sai hoàn toàn.

**Giải pháp: Bộ lọc anti-aliasing**
- Đặt bộ lọc thông thấp (low-pass filter) **trước ADC**, cắt tất cả tần số trên f_s/2.
- Xem chi tiết: [Lesson 07 — Bộ lọc](../../01-Fundamentals/lesson-07-filters/).

🔁 **Dừng lại tự kiểm tra**: Nếu muốn đo tín hiệu điện tim (ECG) có tần số cao nhất 150 Hz, tần số lấy mẫu tối thiểu cần là bao nhiêu?
<details>
<summary>Xem đáp án</summary>

$f_s > 2 \times 150 = 300$ Hz. Trong thực tế, thiết bị ECG dùng $f_s = 500$ Hz hoặc 1000 Hz để có biên an toàn và dạng sóng sắc nét.

</details>

📝 **Tóm tắt mục 2**:
- Lấy mẫu: đo tín hiệu tại điểm rời rạc, tần số $f_s$ (Hz / SPS).
- Định lý Nyquist: **$f_s > 2 \cdot f_{\text{max}}$**.
- Vi phạm → aliasing (tần số cao hóa trang thành tần số thấp).
- Giải pháp: bộ lọc anti-aliasing trước ADC.
- Audio CD: 44.1 kHz; Voice: 8 kHz; Hi-res: 96–192 kHz.

---

## 3. Lượng tử hóa (Quantization)

### 3.1. Lượng tử hóa là gì?

Sau khi lấy mẫu, mỗi mẫu là giá trị thực trong khoảng $[0, V_{\text{ref}}]$. Nhưng ADC chỉ có thể biểu diễn một số hữu hạn mức — đây là **lượng tử hóa (quantization)**: chia dải biên độ thành $2^n$ mức rời rạc, mỗi mức cách nhau một **bước LSB** (Least Significant Bit).

💡 **Hình dung**: Thước chia vạch chỉ đọc được đến 0.1 mm — đây là "độ phân giải" của thước. Dù vật thực sự dài 12.37 mm, thước ghi 12.4 mm. Sai số 0.03 mm là "sai số lượng tử". ADC hoạt động tương tự: điện áp 2.37 V sẽ được làm tròn đến mức gần nhất.

### 3.2. Công thức độ phân giải

$$\text{Bước LSB} = \frac{V_{\text{ref}}}{2^n}$$

trong đó:
- $V_{\text{ref}}$ = điện áp tham chiếu (V) — thường là 3.3 V hoặc 5 V.
- $n$ = số bit của ADC.
- $2^n$ = tổng số mức lượng tử (ví dụ: 8-bit → 256 mức, 10-bit → 1024 mức).

**Sai số lượng tử tối đa** $= \pm\frac{1}{2}$ LSB (làm tròn đến mức gần nhất).

### 3.3. Bốn ví dụ số

**Ví dụ 1 — ADC 8-bit, $V_{\text{ref}} = 5$ V**:
- Số mức: $2^8 = 256$.
- Bước LSB $= 5 / 256 =$ **19.53 mV**.
- Sai số tối đa $= \pm 9.77$ mV.

**Ví dụ 2 — ADC 10-bit, $V_{\text{ref}} = 5$ V** (chuẩn Arduino Uno):
- Số mức: $2^{10} = 1024$.
- Bước LSB $= 5 / 1024 =$ **4.88 mV**.
- Sai số tối đa $= \pm 2.44$ mV.
- Đây là lý do đọc `analogRead()` trên Arduino Uno trả về 0–1023.

**Ví dụ 3 — ADC 12-bit, $V_{\text{ref}} = 3.3$ V** (chuẩn STM32, ESP32):
- Số mức: $2^{12} = 4096$.
- Bước LSB $= 3.3 / 4096 =$ **0.806 mV** (< 1 mV!).
- Sai số tối đa $= \pm 0.40$ mV — đủ tốt cho nhiều ứng dụng công nghiệp.

**Ví dụ 4 — ADC 16-bit, $V_{\text{ref}} = 5$ V** (chip chuyên dụng ADS1115):
- Số mức: $2^{16} = 65536$.
- Bước LSB $= 5 / 65536 =$ **76.3 µV**.
- Sai số tối đa $= \pm 38.1$ µV — dùng cho cân điện tử, đo dòng chính xác.

| ADC n-bit | V_ref | Số mức | Bước LSB | Ứng dụng điển hình |
|-----------|-------|--------|----------|-------------------|
| 8-bit | 5 V | 256 | 19.5 mV | Điều khiển cơ bản, servo |
| 10-bit | 5 V | 1024 | 4.88 mV | Arduino Uno (mặc định) |
| 12-bit | 3.3 V | 4096 | 0.81 mV | STM32, ESP32 |
| 16-bit | 5 V | 65536 | 76 µV | Cân điện tử, đo lường |

❓ **Câu hỏi tự nhiên của người đọc**:
- *"Số bit cao hơn luôn tốt hơn phải không?"* — Không nhất thiết. ADC độ phân giải cao hơn thường chậm hơn, đắt hơn, tiêu thụ điện nhiều hơn, và yêu cầu nguồn điện ổn định hơn. 10-bit là đủ cho nhiều ứng dụng nhúng thông thường.
- *"Nhiễu điện ảnh hưởng thế nào?"* — Nếu nhiễu > 1 LSB, thêm bit không có nghĩa vì nhiễu làm sai kết quả. Thực tế: ADC 12-bit trên board PCB rẻ tiền có thể chỉ cho kết quả hiệu dụng ~10-bit do nhiễu nguồn.

📝 **Tóm tắt mục 3**:
- Lượng tử hóa: chia dải $[0, V_{\text{ref}}]$ thành $2^n$ mức rời rạc.
- **Bước LSB $= V_{\text{ref}} / 2^n$**.
- Sai số lượng tử: $\pm\frac{1}{2}$ LSB (luôn có, không tránh được).
- Tăng $n$ → giảm LSB → độ chính xác cao hơn, nhưng chậm hơn và yêu cầu cao hơn.

---

## 4. Chuyển đổi ADC và DAC

### 4.1. Công thức ADC: điện áp → mã số

$$\text{Code}_{\text{ADC}} = \text{round}\!\left(\frac{V_{\text{in}}}{V_{\text{ref}}} \times (2^n - 1)\right)$$

Walk-through: ADC 10-bit ($n = 10$), $V_{\text{ref}} = 5$ V, $V_{\text{in}} = 2.5$ V:
- Code $= \text{round}(2.5 / 5 \times 1023) = \text{round}(0.5 \times 1023) = \text{round}(511.5) =$ **512**

### 4.2. Công thức DAC: mã số → điện áp (ngược lại)

$$V_{\text{out}} = \frac{\text{Code}_{\text{DAC}}}{2^n - 1} \times V_{\text{ref}}$$

Walk-through: DAC 10-bit, $V_{\text{ref}} = 5$ V, Code $= 512$:
- $V_{\text{out}} = 512 / 1023 \times 5 =$ **2.503 V** (gần 2.5 V, sai số do làm tròn Code)

### 4.3. Bốn ví dụ tính ADC

**Ví dụ 1 — ADC 8-bit, $V_{\text{ref}} = 5$ V, $V_{\text{in}} = 1.0$ V**:
- Code $= \text{round}(1.0 / 5 \times 255) = \text{round}(51) =$ **51**
- Kiểm tra ngược: $V = 51/255 \times 5 = 1.000$ V ✓ (trùng khớp vì 1.0/5 đúng bội số)

**Ví dụ 2 — ADC 8-bit, $V_{\text{ref}} = 5$ V, $V_{\text{in}} = 2.3$ V**:
- Code $= \text{round}(2.3 / 5 \times 255) = \text{round}(117.3) =$ **117**
- Kiểm tra ngược: $V = 117/255 \times 5 =$ **2.294 V** (sai lệch 6 mV — đây là sai số lượng tử)

**Ví dụ 3 — ADC 10-bit, $V_{\text{ref}} = 5$ V, $V_{\text{in}} = 3.75$ V**:
- Code $= \text{round}(3.75 / 5 \times 1023) = \text{round}(767.25) =$ **767**
- Kiểm tra ngược: $V = 767/1023 \times 5 =$ **3.748 V** (sai lệch 2.4 mV $\approx \frac{1}{2}$ LSB)

**Ví dụ 4 — ADC 12-bit, $V_{\text{ref}} = 3.3$ V, $V_{\text{in}} = 1.65$ V** (đúng giữa dải):
- Code $= \text{round}(1.65 / 3.3 \times 4095) = \text{round}(2047.5) =$ **2048**
- Kiểm tra ngược: $V = 2048/4095 \times 3.3 =$ **1.6504 V** (sai lệch 0.4 mV)

### 4.4. Ví dụ DAC: tạo sóng sin số

Để tạo sóng sin 100 Hz bằng DAC 8-bit ($V_{\text{ref}} = 5$ V):
1. Tạo bảng 100 giá trị code tương ứng sin: `code[i] = round(127.5 + 127.5 × sin(2π × i/100))`
2. Xuất ra DAC với $f_s = 10{,}000$ Hz (100 mẫu/chu kỳ × 100 chu kỳ/s)
3. Bộ lọc thông thấp sau DAC để làm mượt bậc thang → sóng sin liên tục

🔁 **Dừng lại tự kiểm tra**: Arduino Uno đọc `analogRead(A0) = 614`. Điện áp tại chân A0 là bao nhiêu?
<details>
<summary>Xem đáp án</summary>

ADC 10-bit, $V_{\text{ref}} = 5$ V:

$V_{\text{in}} = 614 / 1023 \times 5 =$ **3.001 V** (xấp xỉ 3.0 V).

</details>

📝 **Tóm tắt mục 4**:
- ADC: $\text{Code} = \text{round}\!\left(V_{\text{in}} / V_{\text{ref}} \times (2^n - 1)\right)$
- DAC ngược lại: $V_{\text{out}} = \text{Code} / (2^n - 1) \times V_{\text{ref}}$
- Luôn có sai số lượng tử $\leq \frac{1}{2}$ LSB.
- DAC tạo sóng bằng cách xuất bảng giá trị; cần lọc thông thấp sau để làm mượt.

---

## 5. Các kiểu ADC và DAC phổ biến

### 5.1. ADC kiểu SAR (Successive Approximation Register)

**Nguyên lý**: Dùng bộ so sánh và thanh ghi dịch để dò từng bit từ MSB xuống LSB — tương tự "trò chơi đoán số" nhị phân:
- Bước 1: Thử MSB = 1 (tức $V_{\text{ref}}/2$). Nếu $V_{\text{in}} > V_{\text{ref}}/2$ → giữ bit 1; ngược lại → bit 0.
- Bước 2: Cộng thêm $V_{\text{ref}}/4$ hoặc trừ đi tùy kết quả bước trước. Tiếp tục đến bit LSB.

**Ưu điểm**: Tốc độ trung bình (100 kSPS – 5 MSPS), độ phân giải 8–16 bit, tiêu thụ điện thấp.
**Nhược điểm**: Tốc độ thấp hơn Flash ADC.
**Ứng dụng**: Vi điều khiển (Arduino, STM32, ESP32 đều dùng SAR ADC tích hợp).

### 5.2. ADC kiểu Flash

**Nguyên lý**: Dùng **$2^n - 1$** bộ so sánh song song, so $V_{\text{in}}$ với $2^n - 1$ mức điện áp cùng lúc → đọc kết quả tức thì.

**Ưu điểm**: Cực nhanh (GSPS — Giga-Samples Per Second).
**Nhược điểm**: Cần quá nhiều linh kiện (8-bit Flash cần 255 bộ so sánh!), tiêu thụ điện rất lớn, độ phân giải thường chỉ 4–8 bit.
**Ứng dụng**: Radar, oscilloscope tốc độ cao, máy thu truyền hình số.

### 5.3. ADC kiểu Sigma-Delta (Σ-Δ)

**Nguyên lý**: Lấy mẫu với f_s cực cao (oversampling), dùng bộ tích phân và bộ lọc số để trung bình hóa → đổi tốc độ lấy thêm độ phân giải.

**Ưu điểm**: Độ phân giải rất cao (16–24 bit), nhiễu thấp.
**Nhược điểm**: Chậm (kHz – vài trăm kHz).
**Ứng dụng**: Âm thanh hi-fi, cân điện tử, cảm biến y tế (ECG).

| Kiểu ADC | Tốc độ | Độ phân giải | Ứng dụng |
|----------|--------|--------------|----------|
| SAR | 100 kSPS – 5 MSPS | 8–16 bit | MCU đa năng |
| Flash | > 100 MSPS đến GSPS | 4–8 bit | Radar, oscilloscope |
| Sigma-Delta | 1 kSPS – vài trăm kSPS | 16–24 bit | Audio, cân, y tế |

### 5.4. DAC kiểu R-2R Ladder

**Nguyên lý**: Mạng điện trở R và 2R kết hợp để cộng các phần điện áp tương ứng từng bit. Bit có trọng số cao nhất (MSB) đóng góp V_ref/2; bit tiếp theo V_ref/4; bit LSB đóng góp V_ref/2^n.

Về bản chất đây là **mạch cộng (summing amplifier)** sử dụng op-amp. Xem chi tiết ở [Lesson 08 — Op-Amp Applications](../../02-Semiconductors/lesson-08-opamp-applications/).

**Ưu điểm**: Chỉ cần 2 giá trị điện trở (R và 2R), dễ chế tạo và căn chỉnh.
**Ví dụ**: DAC 4-bit với $V_{\text{ref}} = 5$ V, code = 0b1010 (= 10):
- $V_{\text{out}} = 10/15 \times 5 =$ **3.33 V**

❓ **Câu hỏi tự nhiên của người đọc**:
- *"SAR ADC mất bao nhiêu chu kỳ clock để hoàn thành?"* — Đúng bằng $n$ chu kỳ ($n$ = số bit). ADC 10-bit cần 10 chu kỳ → ở 10 MHz clock, thời gian chuyển đổi $= 10/10{,}000{,}000 = 1$ µs → tốc độ tối đa 1 MSPS.

📝 **Tóm tắt mục 5**:
- SAR: nhanh-vừa, đa năng, dùng trong MCU.
- Flash: cực nhanh, phân giải thấp, tiêu điện cao.
- Sigma-Delta: rất chính xác, chậm, dùng cho audio/y tế.
- R-2R DAC: mạng điện trở đơn giản, cộng điện áp từng bit.

---

## 6. ADC trong vi điều khiển — Arduino & analogRead()

### 6.1. ADC trên Arduino Uno (ATmega328P)

Arduino Uno có SAR ADC 10-bit tích hợp:
- **Độ phân giải**: 10 bit → 1024 mức → bước LSB $= 5\text{ V} / 1024 =$ **4.88 mV**.
- **Điện áp tham chiếu mặc định**: $V_{\text{ref}} = 5$ V (hoặc 3.3 V nếu đổi cấu hình, hoặc nguồn AREF ngoài).
- **Tốc độ**: ~10 kSPS (mặc định) lên đến ~77 kSPS khi tăng prescaler clock.
- **Kênh**: 6 kênh analog (A0–A5).

```c
// Đọc giá trị ADC trên Arduino
int raw = analogRead(A0);          // 0–1023
float voltage = raw * (5.0 / 1023.0); // Chuyển về volt
```

### 6.2. Ví dụ đọc cảm biến NTC (nhiệt độ)

Mạch phân áp: điện trở $R = 10$ kΩ nối tiếp NTC $R_T$. Điện áp tại A0:

$$V_{\text{A0}} = 5 \times \frac{R_T}{R + R_T}$$

Nếu `analogRead(A0)` = 410:
- $V_{\text{A0}} = 410/1023 \times 5 = 2.004$ V
- $R_T = R \times V_{\text{A0}} / (5 - V_{\text{A0}}) = 10000 \times 2.004 / 2.996 =$ **6.69 kΩ**
- Tra bảng NTC → nhiệt độ ≈ 40 °C

### 6.3. Liên hệ bài tiếp theo

`analogRead()` là một hàm phần mềm gọi phần cứng ADC của MCU. Để hiểu đầy đủ cách cấu hình thanh ghi ADC, ngắt (interrupt), và GPIO, xem: [Lesson 06 — Vi điều khiển & GPIO](../lesson-06-microcontroller-gpio/).

📝 **Tóm tắt mục 6**:
- Arduino Uno: ADC 10-bit, V_ref = 5 V, `analogRead()` trả về 0–1023.
- `V = raw × 5.0 / 1023.0` để suy ra điện áp.
- Kết hợp với mạch phân áp để đọc cảm biến điện trở (NTC, LDR, v.v.).

---

## 7. Bài tập

**Bài 1**: Tần số lấy mẫu tối thiểu là bao nhiêu để lấy mẫu đúng tín hiệu đàn guitar (f_max = 5 kHz)?

**Bài 2**: ADC 8-bit, V_ref = 3.3 V. Tính bước LSB và sai số lượng tử tối đa.

**Bài 3**: ADC 10-bit, V_ref = 5 V. Tính mã số Code khi V_in = 1.8 V. Sau đó kiểm tra lại: tính V_out từ Code vừa tìm và xác nhận sai số lượng tử.

**Bài 4**: Đọc `analogRead(A0) = 820` trên Arduino Uno (V_ref = 5 V). Điện áp tại chân A0 là bao nhiêu?

**Bài 5**: Bạn cần ADC đo tín hiệu sóng não EEG có f_max = 100 Hz với độ phân giải đủ tốt cho y tế. Chọn: (a) SAR 10-bit, 8 kSPS; (b) Flash 6-bit, 50 MSPS; (c) Sigma-Delta 16-bit, 1 kSPS. Giải thích lựa chọn.

**Bài 6**: DAC 8-bit, V_ref = 5 V. Code = 180. Tính V_out. Sai số lượng tử so với giá trị lý tưởng là bao nhiêu nếu muốn xuất đúng 3.5 V?

**Bài 7**: Tín hiệu âm thanh 850 Hz được lấy mẫu với f_s = 1000 Hz. Tần số nào sẽ xuất hiện trong tín hiệu số thu được? Giải thích hiện tượng aliasing.

---

## 8. Lời giải chi tiết

### Bài 1

**Đề**: $f_{\text{max}} = 5$ kHz (đàn guitar).

**Lời giải**:
- Định lý Nyquist: $f_s > 2 \times f_{\text{max}} = 2 \times 5000 =$ **10,000 Hz = 10 kHz**.
- Trong thực tế chọn f_s = 11.025 kHz (chuẩn AM radio thấp) hoặc 22.05 kHz (CD half-rate) để có biên an toàn và bộ lọc anti-aliasing dễ thiết kế.

### Bài 2

**Đề**: ADC 8-bit, $V_{\text{ref}} = 3.3$ V.

**Lời giải**:
- Số mức: $2^8 = 256$.
- Bước LSB $= 3.3 / 256 =$ **12.89 mV**.
- Sai số tối đa $= \frac{1}{2} \times 12.89 =$ **±6.45 mV**.

### Bài 3

**Đề**: ADC 10-bit, $V_{\text{ref}} = 5$ V, $V_{\text{in}} = 1.8$ V.

**Lời giải**:
- Bước 1: Code $= \text{round}(1.8 / 5 \times 1023) = \text{round}(0.36 \times 1023) = \text{round}(368.28) =$ **368**.
- Bước 2 (kiểm tra): $V_{\text{out}} = 368 / 1023 \times 5 = 1.7987$ V.
- Sai số lượng tử $= 1.8 - 1.7987 =$ **0.0013 V = 1.3 mV**.
- Nhận xét: $\frac{1}{2}$ LSB $= \frac{1}{2} \times (5/1024) = 2.44$ mV; sai số thực tế 1.3 mV $< \frac{1}{2}$ LSB ✓ (đúng với định lý).

### Bài 4

**Đề**: `analogRead(A0) = 820`, $V_{\text{ref}} = 5$ V, ADC 10-bit.

**Lời giải**:
- $V_{\text{in}} = 820 / 1023 \times 5 =$ **4.009 V**.
- Dễ nhớ: 820/1023 ≈ 0.802 → khoảng 80% điện áp nguồn 5 V.

### Bài 5

**Đề**: Chọn ADC cho EEG (f_max = 100 Hz, ứng dụng y tế).

**Lời giải**:
- (a) SAR 10-bit, 8 kSPS: $f_s = 8000$ Hz $\gg 2 \times 100 = 200$ Hz ✓ về tốc độ. Độ phân giải 10-bit tạm ổn, nhưng thiếu cho ứng dụng y tế yêu cầu phân biệt tín hiệu mV cực nhỏ.
- (b) Flash 6-bit, 50 MSPS: tốc độ thừa (không cần), độ phân giải kém ($2^6 = 64$ mức), tiêu điện cao. **Không phù hợp**.
- (c) Sigma-Delta 16-bit, 1 kSPS: $f_s = 1000$ Hz $> 200$ Hz ✓. Độ phân giải 16-bit xuất sắc (76 µV/bit ở $V_{\text{ref}} = 5$ V). Nhiễu thấp, phù hợp tín hiệu sinh học.
- **Chọn (c) — Sigma-Delta 16-bit** là phù hợp nhất cho y tế. Đây là lý do chip ADS1299 (Texas Instruments) dùng Sigma-Delta 24-bit trong thiết bị EEG chuyên nghiệp.

### Bài 6

**Đề**: DAC 8-bit, $V_{\text{ref}} = 5$ V, Code $= 180$. Sai số khi muốn xuất 3.5 V.

**Lời giải**:
- $V_{\text{out}} = 180 / 255 \times 5 =$ **3.529 V**.
- Code lý tưởng cho 3.5 V: Code $= \text{round}(3.5 / 5 \times 255) = \text{round}(178.5) =$ **179** (hoặc 178 hoặc 179 tùy cách làm tròn).
- Nếu Code $= 179$: $V_{\text{out}} = 179/255 \times 5 = 3.510$ V → sai số $=$ **0.01 V = 10 mV**.
- Nhận xét: bước LSB $= 5/255 = 19.6$ mV; sai số 10 mV $< \frac{1}{2}$ LSB ✓.

### Bài 7

**Đề**: Tín hiệu 850 Hz, $f_s = 1000$ Hz.

**Lời giải**:
- Tần số Nyquist $= f_s / 2 =$ **500 Hz**.
- 850 Hz > 500 Hz → vi phạm Nyquist → aliasing xảy ra.
- Tần số ảo (alias): $f_{\text{alias}} = |f_{\text{signal}} - k \times f_s|$ với $k$ nguyên gần nhất.
  - $k = 1$: $f_{\text{alias}} = |850 - 1000| =$ **150 Hz**.
- Kết quả: Trong tín hiệu số thu được, 850 Hz "hóa trang" thành **150 Hz**.
- Giải pháp: Trước khi lấy mẫu, đặt bộ lọc low-pass cắt tần số trên 500 Hz để loại bỏ 850 Hz.

---

## Liên kết và bài tiếp theo

- **Tiền đề**:
  - [Lesson 06 — AC, Trở kháng & RLC](../../01-Fundamentals/lesson-06-ac-impedance-rlc/) — tín hiệu sin, tần số, biên độ.
  - [Lesson 07 — Bộ lọc](../../01-Fundamentals/lesson-07-filters/) — anti-aliasing filter.
  - [Lesson 08 — Op-Amp Applications](../../02-Semiconductors/lesson-08-opamp-applications/) — mạch cộng, R-2R DAC.
- **Bài tiếp theo**: [Lesson 06 — Vi điều khiển & GPIO](../lesson-06-microcontroller-gpio/) — cách MCU quản lý ADC, cấu hình thanh ghi, ngắt.

---

## 📝 Tổng kết Lesson 05

1. **ADC**: chuyển tín hiệu tương tự → số; **DAC**: ngược lại. Cầu nối giữa thế giới thực và vi điều khiển.
2. **Lấy mẫu**: $f_s > 2 \cdot f_{\text{max}}$ (Nyquist). Vi phạm → aliasing. Cần bộ lọc anti-aliasing trước ADC.
3. **Lượng tử hóa**: bước LSB $= V_{\text{ref}} / 2^n$. Sai số tối đa $\pm\frac{1}{2}$ LSB. Tăng bit → tăng độ chính xác.
4. **ADC công thức**: $\text{Code} = \text{round}\!\left(V_{\text{in}} / V_{\text{ref}} \times (2^n - 1)\right)$. **DAC ngược**: $V_{\text{out}} = \text{Code} / (2^n - 1) \times V_{\text{ref}}$.
5. **Kiểu ADC**: SAR (đa năng, MCU), Flash (nhanh nhất), Sigma-Delta (chính xác nhất, audio/y tế).
6. **Arduino**: `analogRead()` trả về 0–1023 (ADC 10-bit, $V_{\text{ref}} = 5$ V); `V = raw × 5.0 / 1023.0`.

**Bài tiếp theo**: [Lesson 06 — Vi điều khiển & GPIO](../lesson-06-microcontroller-gpio/)
