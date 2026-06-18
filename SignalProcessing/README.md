# SignalProcessing — Xử lý tín hiệu & Fourier

Lĩnh vực này dạy cách **biểu diễn, phân tích và biến đổi tín hiệu** — âm thanh, ảnh, sóng radio, dữ liệu cảm biến/chuỗi thời gian. Trục xuyên suốt là **Fourier**: ý tưởng "mọi tín hiệu = tổng các sóng sin" và bộ công cụ rời rạc hóa nó (DFT/FFT) cho máy tính.

Tổ chức thành **3 tier × 16 bài**: nền tảng miền thời gian → Fourier (trái tim) → ứng dụng thực tế.

## Mục tiêu

- Hiểu **tín hiệu**: biên độ/tần số/pha, sóng sin & phasor, dB, lấy mẫu & định lý Nyquist, lượng tử hóa.
- Nắm các phép nền: **tích chập** (nền của lọc & CNN) và **tương quan** (tìm mẫu/độ trễ).
- Thành thạo **Fourier**: chuỗi Fourier, dạng phức (epicycle), biến đổi Fourier, **DFT** và thuật toán **FFT** O(N log N), **spectrogram** (STFT).
- Áp dụng: **lọc số** (FIR/IIR), **audio DSP** (EQ, echo, pitch), **xử lý ảnh & Fourier 2D** (nén JPEG), **điều chế** (AM/FM, QAM), **wavelet** (đa tỉ lệ).

## Các tier

| Tier | Liên kết | Theme | Số bài |
|------|----------|-------|--------|
| 1 — Foundations | [01-Foundations](./01-Foundations/) | Tín hiệu & miền thời gian | 5 |
| 2 — Fourier | [02-Fourier](./02-Fourier/) | Phân tích tần số (trái tim) | 6 |
| 3 — Applied | [03-Applied](./03-Applied/) | Ứng dụng thực tế | 5 |

## Danh sách bài học

### Tier 1 — Foundations ([01-Foundations](./01-Foundations/))

| # | Bài | Chủ đề |
|---|-----|--------|
| 01 | [Tín hiệu cơ bản](./01-Foundations/lesson-01-signals-basics/) | Biên độ/tần số/pha, sin/phasor & Euler, dB, impulse/step/noise |
| 02 | [Lấy mẫu & Nyquist](./01-Foundations/lesson-02-sampling-nyquist/) | Sampling, Nyquist-Shannon, aliasing, lượng tử hóa & SNR, tái tạo |
| 03 | [Tổng hợp sóng](./01-Foundations/lesson-03-wave-superposition/) | Superposition, giao thoa & phách, harmonic/timbre, dựng sóng vuông |
| 04 | [Tích chập](./01-Foundations/lesson-04-convolution/) | Convolution, lật-trượt-nhân-cộng, hệ LTI & đáp ứng xung, kernel lọc |
| 05 | [Tương quan & Năng lượng](./01-Foundations/lesson-05-correlation-energy/) | Cross/auto-correlation, matched filter, năng lượng/công suất, Parseval |

### Tier 2 — Fourier ([02-Fourier](./02-Fourier/))

| # | Bài | Chủ đề |
|---|-----|--------|
| 06 | [Chuỗi Fourier](./02-Fourier/lesson-01-fourier-series/) | Dạng lượng giác, hệ số a_n/b_n, sóng vuông, hiện tượng Gibbs, trực giao |
| 07 | [Epicycle & Euler](./02-Fourier/lesson-02-epicycles-euler/) | Fourier phức c_n·e^{inω₀t}, vector quay, vẽ hình bằng epicycle |
| 08 | [Biến đổi Fourier](./02-Fourier/lesson-03-fourier-transform/) | FT, cặp time↔freq, định lý tích chập & Parseval, uncertainty |
| 09 | [DFT](./02-Fourier/lesson-04-dft/) | Biến đổi Fourier rời rạc, bin↔Hz, đối xứng liên hợp, ma trận DFT, leakage |
| 10 | [FFT](./02-Fourier/lesson-05-fft/) | Cooley-Tukey, butterfly & twiddle, O(N log N) vs O(N²), bit-reversal |
| 11 | [Spectrogram & STFT](./02-Fourier/lesson-06-spectrogram-stft/) | STFT, cửa sổ Hann/Hamming, trade-off thời gian-tần số, heatmap phổ |

### Tier 3 — Applied ([03-Applied](./03-Applied/))

| # | Bài | Chủ đề |
|---|-----|--------|
| 12 | [Lọc số](./03-Applied/lesson-01-digital-filters/) | FIR/IIR, low/high/band-pass/band-stop, đáp ứng tần số & roll-off |
| 13 | [Audio DSP](./03-Applied/lesson-02-audio-dsp/) | Equalizer, delay/echo & reverb, pitch/speed, nén động, Web Audio |
| 14 | [Ảnh & Fourier 2D](./03-Applied/lesson-03-image-2d-fourier/) | Tín hiệu 2D, DFT 2D, kernel blur/sharpen/edge, DCT & nén JPEG |
| 15 | [Điều chế](./03-Applied/lesson-04-modulation/) | AM/FM, sideband, giải điều chế, điều chế số ASK/FSK/PSK/QAM |
| 16 | [Wavelet](./03-Applied/lesson-05-wavelet-preview/) | Phân giải đa tỉ lệ, CWT/scalogram, Haar DWT, nén & khử nhiễu |

## Cách học

- **Học tuần tự** theo số bài L01 → L16: mỗi bài dựa trên bài trước. Tier 1 là nền cho Fourier; Fourier là nền cho ứng dụng.
- **Bài flagship**: [L07 Epicycle & Euler](./02-Fourier/lesson-02-epicycles-euler/) — viz vẽ hình bằng các vòng tròn quay, trực giác đẹp nhất của Fourier.
- **Bỏ qua nếu đã biết**: quen complex/sampling/convolution → nhảy thẳng Tier 2.

## Kiến thức tiền đề

| Cần biết | Lấy ở đâu |
|----------|-----------|
| Số phức, công thức Euler e^{iθ} | [Math/03 complex-polar-euler](../Math/03-Trig-Complex/lesson-06-complex-polar-euler/) |
| Tích phân | [Math/04 Calculus](../Math/04-Calculus-1var/) |
| Trực giao, cơ sở, tích trong | [Vectors/04 LinearAlgebra](../Vectors/04-LinearAlgebra/) |
| Dao động & sóng | [Physics/01 oscillation-waves](../Physics/01-Mechanics/lesson-08-oscillation-waves/) |
| ADC/DAC, bộ lọc analog | [Electronics/01](../Electronics/01-Fundamentals/lesson-07-filters/), [ADC/DAC](../Electronics/03-Digital-MCU/lesson-05-adc-dac/) |

## Liên hệ tới các lĩnh vực dùng tới

| Bài SignalProcessing | Dùng ở đâu |
|----------------------|------------|
| Tích chập, Lọc số | [AI-ML](../AI-ML/) (CNN), [Electronics](../Electronics/01-Fundamentals/lesson-07-filters/) (analog filter) |
| FFT | [Algorithms](../Algorithms/) (chia để trị), nhân đa thức/số lớn nhanh |
| Spectrogram | [AI-ML](../AI-ML/) (mel-spectrogram, ASR), [Music](../Music/) |
| Điều chế | [Networking](../Networking/) (WiFi, 4G/5G), [Electronics](../Electronics/) |
| Ảnh & Fourier 2D | [AI-ML](../AI-ML/) (CNN, computer vision), nén ảnh |
| Lấy mẫu, lượng tử hóa | [DataFoundations](../DataFoundations/01-NumberRepresentation/lesson-03-floating-point/) (số học số) |

## Minh họa tương tác

Mở [index.html](./index.html) ở trình duyệt — mọi visualization HTML standalone, mở `file://` chạy ngay. Mỗi bài có viz tương tác (kéo slider, chạy animation từng bước) và nút "📖 Đọc README" xem lý thuyết ngay trong trang.
