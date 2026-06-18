// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SignalProcessing/02-Fourier/lesson-06-spectrogram-stft/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 11 — Spectrogram & STFT (Short-Time Fourier Transform)

> Bài **cuối** của Tier 2 (Fourier). Từ đây ta bước sang Tier 3 (ứng dụng: lọc số, nén, AI).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao FFT một phát cho cả tín hiệu là không đủ** — nó cho biết *có* những tần số nào nhưng mất hoàn toàn thông tin *khi nào* chúng xuất hiện.
- Nắm **STFT (Short-Time Fourier Transform)**: chia tín hiệu thành khung (frame) ngắn chồng lấp, nhân cửa sổ (window), rồi FFT từng khung.
- Hiểu **vai trò của cửa sổ** (Hann, Hamming, rectangular) trong việc giảm rò rỉ phổ (spectral leakage).
- Hiểu **trade-off thời gian ↔ tần số (nguyên lý bất định / Heisenberg–Gabor)**: không thể vừa định vị chính xác thời gian vừa định vị chính xác tần số.
- Tính được **độ phân giải thời gian $\\Delta t$ và tần số $\\Delta f$** từ độ dài khung và tần số lấy mẫu.
- Hiểu **overlap / hop size** và tỉ lệ chồng lấp ảnh hưởng thế nào tới spectrogram.
- Đọc được **spectrogram** ($|\\text{STFT}|^2$ vẽ dạng heatmap) và biết nó dùng trong nhận dạng giọng nói, Shazam, phân tích nhạc, mel-spectrogram cho AI.

## Kiến thức tiền đề

- [Lesson 10 — FFT (Fast Fourier Transform)](../lesson-05-fft/) — STFT chính là FFT chạy lặp trên từng khung; phải nắm FFT trước.
- [Lesson 09 — DFT (Discrete Fourier Transform)](../lesson-04-dft/) — định nghĩa biến đổi rời rạc, độ phân giải tần số $f_s/N$.
- [Tier 1 — Lesson 02: Lấy mẫu & Nyquist](../../01-Foundations/lesson-02-sampling-nyquist/) — tần số lấy mẫu $f_s$, Nyquist $f_s/2$ là nền cho mọi phép tính ở đây.

---

## 1. Vì sao FFT không đủ? Vấn đề "khi nào"

💡 **Trực giác.** Tưởng tượng bạn có bản thu một bài hát piano dài 3 phút. Bạn chạy FFT lên toàn bộ bản thu. Kết quả: một phổ cho biết "trong cả bài có nốt Đô, Mi, Sol, La...". Nhưng **bạn không biết nốt nào chơi ở giây nào**. FFT trộn tất cả lại thành một bức ảnh trung bình — như chụp phơi sáng cả bài hát thành một tấm mờ nhòe.

Cụ thể hơn, hãy xét hai tín hiệu khác hẳn nhau về mặt *nghe*:

- **Tín hiệu A**: nốt 440 Hz trong 0.5 giây *rồi* nốt 880 Hz trong 0.5 giây (hai nốt nối tiếp).
- **Tín hiệu B**: 440 Hz và 880 Hz **phát đồng thời** suốt 1 giây (một hợp âm).

Chạy FFT lên cả 1 giây của A và của B, bạn nhận được phổ **gần như giống hệt nhau**: hai đỉnh ở 440 Hz và 880 Hz. FFT toàn cục không phân biệt nổi "lần lượt" với "đồng thời".

> **Câu hỏi mở bài:** *Phổ FFT của cả bài hát không cho biết nốt nào ở giây nào. Làm sao để nhìn thấy tần số thay đổi theo thời gian?*

Đáp án (sẽ phát triển trong cả bài này): **đừng FFT một lần cho cả tín hiệu — hãy cắt tín hiệu thành nhiều mẩu ngắn và FFT từng mẩu.** Mẩu nào nằm ở giây thứ 0–0.5 chỉ "thấy" 440 Hz; mẩu ở giây 0.5–1 chỉ "thấy" 880 Hz. Ghép kết quả của tất cả các mẩu lại theo trục thời gian → ta được **bản đồ tần số-theo-thời-gian**, gọi là **spectrogram**.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Vì sao FFT lại mất thông tin thời gian?"* — Vì DFT/FFT tính $X[k] = \\sum_{n=0}^{N-1} x[n] e^{-i 2\\pi k n / N}$ trên **toàn bộ** $N$ mẫu. Mỗi $X[k]$ là một con số tổng hợp trên cả khoảng; thời điểm $n$ bị "tổng" mất, chỉ còn biên độ + pha tổng của tần số $k$.
- *"Pha của FFT chẳng phải mã hóa thời gian sao?"* — Pha mã hóa **độ dịch (shift)** của thành phần sin tuần hoàn so với gốc, không phải "tần số này chỉ tồn tại trong khoảng giây nào". Với tín hiệu mà tần số biến đổi (non-stationary), pha toàn cục gần như vô dụng để đọc thời điểm.

🔁 **Dừng lại tự kiểm tra.**
1. Vì sao FFT của "440 rồi 880" và "440+880 cùng lúc" lại giống nhau?
2. Ý tưởng cốt lõi để khôi phục thông tin thời gian là gì?

<details><summary>Đáp án</summary>

1. Vì FFT cộng dồn trên toàn khoảng — cả hai tín hiệu đều "chứa" năng lượng ở 440 và 880 Hz trên toàn khoảng 1 giây, nên tổng (biên độ) ra hai đỉnh giống nhau. Sự khác biệt nằm ở *thời điểm*, mà phép tổng toàn cục đã xóa.
2. Cắt tín hiệu thành các khung ngắn rồi FFT từng khung, sau đó xếp kết quả theo thời gian.
</details>

📝 **Tóm tắt mục 1.**
- FFT toàn cục cho **những tần số nào có mặt**, nhưng **không cho biết chúng xuất hiện khi nào**.
- Tín hiệu thực (giọng nói, nhạc) là **non-stationary** — tần số thay đổi theo thời gian.
- Giải pháp: **FFT cục bộ trên từng khung ngắn** → STFT → spectrogram.

---

## 2. STFT — Short-Time Fourier Transform

💡 **Trực giác.** STFT = "trượt một cửa sổ ngắn dọc theo tín hiệu, ở mỗi vị trí chụp một bức FFT". Giống như đọc một cuốn sách dài qua một khe hẹp: bạn không thấy cả trang một lúc, nhưng trượt khe từ trái sang phải thì biết được *chữ nào nằm ở chỗ nào*.

### 2.1. Công thức

Cho tín hiệu rời rạc $x[n]$, cửa sổ $w[m]$ độ dài $N$ mẫu, và bước nhảy (hop) $H$. STFT là:

$$
X[k, \\ell] = \\sum_{m=0}^{N-1} x[\\ell H + m]\\; w[m]\\; e^{-i\\, 2\\pi k m / N}
$$

trong đó:

- $\\ell$ = **chỉ số khung (frame)** — khung thứ $\\ell$ bắt đầu ở mẫu $\\ell H$. Trục thời gian.
- $k$ = **chỉ số bin tần số** — như trong DFT, $k$ ứng với tần số $f_k = k\\, f_s / N$. Trục tần số.
- $w[m]$ = **cửa sổ**, làm mượt hai biên của khung (xem §3).

So với DFT một phát ([Lesson 09](../lesson-04-dft/)): công thức bên trong **giống hệt DFT**, chỉ khác là (1) áp lên một đoạn con $x[\\ell H + m]$ thay vì cả tín hiệu, (2) nhân thêm $w[m]$, và (3) lặp lại cho mọi $\\ell$.

### 2.2. Ba phần của STFT — định nghĩa đầy đủ

**(a) Khung (frame) độ dài $N$.**
- *Là gì:* một đoạn liên tiếp $N$ mẫu của tín hiệu, $x[\\ell H], x[\\ell H + 1], \\dots, x[\\ell H + N - 1]$.
- *Vì sao cần:* để tần số trong đoạn coi như "không đổi" (xấp xỉ stationary), FFT trên đoạn mới có nghĩa "tần số tại thời điểm này".
- *Ví dụ số:* $N = 1024$ mẫu, $f_s = 44100$ Hz → mỗi khung dài $1024/44100 \\approx 23.2$ ms.

**(b) Cửa sổ (window) $w[m]$.**
- *Là gì:* một hàm trọng số áp lên khung, thường bằng ~0 ở hai biên và ~1 ở giữa.
- *Vì sao cần:* cắt khung thô bằng "kéo" (rectangular) tạo ra điểm gãy ở biên → rò rỉ phổ. Cửa sổ làm hai biên về 0 mượt mà (xem §3).
- *Ví dụ:* Hann $w[m] = 0.5\\big(1 - \\cos\\frac{2\\pi m}{N-1}\\big)$.

**(c) Bước nhảy (hop) $H$ và overlap.**
- *Là gì:* số mẫu dịch sang phải để bắt đầu khung kế tiếp.
- *Vì sao cần:* nếu $H = N$ các khung không chồng (mép nối có thể nhảy bậc); nếu $H < N$ khung chồng lấp → chuyển tiếp mượt, trục thời gian dày hơn (xem §5).
- *Ví dụ:* $N = 1024$, $H = 256$ → overlap $= 1 - H/N = 75\\%$.

### 2.3. Walk-through bằng số

Tín hiệu A ở §1 ("440 Hz nửa giây *rồi* 880 Hz nửa giây"), $f_s = 8000$ Hz, tổng $8000$ mẫu (1 giây). Lấy $N = 256$, $H = 256$ (không chồng).

- Số khung: $8000 / 256 \\approx 31$ khung.
- Mỗi khung dài $256/8000 = 32$ ms.
- Độ phân giải tần số: $\\Delta f = f_s/N = 8000/256 = 31.25$ Hz.
- 440 Hz rơi vào bin $k = 440/31.25 \\approx 14$; 880 Hz rơi vào bin $k = 880/31.25 \\approx 28$.

Kết quả: **các khung 0–15** (≈ 0–0.5 s) có đỉnh năng lượng ở bin 14 (440 Hz); **các khung 16–30** có đỉnh ở bin 28 (880 Hz). Xếp lại theo trục $\\ell$ → ta *nhìn thấy* đỉnh "nhảy" từ 440 lên 880 ở giữa — điều mà FFT một phát không cho thấy.

⚠ **Lỗi thường gặp.** Tưởng STFT là một biến đổi mới hoàn toàn. Không — STFT chỉ là **DFT/FFT lặp lại trên từng khung có cửa sổ**. Nếu hiểu FFT thì STFT chỉ thêm hai ý: cửa sổ + trượt khung.

🔁 **Dừng lại tự kiểm tra.** Với $f_s = 16000$ Hz, $N = 512$: mỗi khung dài bao nhiêu ms? $\\Delta f$ bằng bao nhiêu?

<details><summary>Đáp án</summary>

- Độ dài khung $= 512/16000 = 0.032$ s $= 32$ ms.
- $\\Delta f = 16000/512 = 31.25$ Hz.
</details>

📝 **Tóm tắt mục 2.**
- STFT $X[k,\\ell]$ = FFT của khung $\\ell$ (đã nhân cửa sổ) → cho phổ *tại thời điểm* $\\ell$.
- Ba tham số: độ dài khung $N$, cửa sổ $w$, hop $H$.
- Công thức là DFT áp lên đoạn con $x[\\ell H + m]\\,w[m]$.

---

## 3. Cửa sổ (window) — vì sao cần và chọn loại nào

### 3.1. Vấn đề: rò rỉ phổ (spectral leakage)

💡 **Trực giác.** DFT ngầm giả định khung là **một chu kỳ của tín hiệu tuần hoàn** — tức là nó "dán" biên phải của khung nối liền vào biên trái. Nếu sóng không khít một số nguyên chu kỳ trong khung, chỗ dán tạo ra một **bước nhảy đột ngột (gãy)**. Bước nhảy = nội dung tần số cao giả tạo → năng lượng của một tần số "rò rỉ" sang hàng loạt bin lân cận, làm phổ nhòe.

**Cửa sổ rectangular** (tức là *không* làm gì, $w[m] = 1$) để nguyên bước nhảy → rò rỉ nhiều nhất. Cửa sổ kéo hai biên về 0 (Hann, Hamming) khử bước nhảy → rò rỉ ít hơn.

### 3.2. Ba cửa sổ phổ biến

| Cửa sổ | Công thức $w[m]$, $m=0\\dots N-1$ | Đặc điểm |
|---|---|---|
| **Rectangular** | $1$ | Búp chính (main lobe) hẹp nhất (phân giải tần số tốt nhất) nhưng búp phụ (side lobe) cao $\\to$ rò rỉ nhiều |
| **Hann** | $0.5\\big(1 - \\cos\\frac{2\\pi m}{N-1}\\big)$ | Búp chính rộng gấp ~2 nhưng búp phụ thấp hẳn; mặc định phổ biến nhất |
| **Hamming** | $0.54 - 0.46\\cos\\frac{2\\pi m}{N-1}$ | Búp phụ đầu tiên thấp nhất trong nhóm cosine; nền hơi cao hơn Hann ở xa |

### 3.3. Bốn ví dụ số so sánh

Lấy $N = 8$ để tính tay được. Tính $w[m]$ tại vài $m$:

**Ví dụ 1 — Rectangular ($N=8$):**
$$w = [1, 1, 1, 1, 1, 1, 1, 1]$$
Hai biên = 1 → bước nhảy lớn nhất khi "dán" → rò rỉ nhiều nhất.

**Ví dụ 2 — Hann ($N=8$):** $w[m] = 0.5(1 - \\cos\\frac{2\\pi m}{7})$.
- $w[0] = 0.5(1 - \\cos 0) = 0.5(1-1) = 0$
- $w[1] = 0.5(1 - \\cos\\frac{2\\pi}{7}) = 0.5(1 - 0.6235) = 0.188$
- $w[3] = 0.5(1 - \\cos\\frac{6\\pi}{7}) = 0.5(1 - (-0.901)) = 0.950$
- $w[7] = 0.5(1 - \\cos 2\\pi) = 0$

→ $w \\approx [0,\\ 0.188,\\ 0.611,\\ 0.950,\\ 0.950,\\ 0.611,\\ 0.188,\\ 0]$. Hai biên = 0 → không có bước nhảy.

**Ví dụ 3 — Hamming ($N=8$):** $w[m] = 0.54 - 0.46\\cos\\frac{2\\pi m}{7}$.
- $w[0] = 0.54 - 0.46\\cdot 1 = 0.08$
- $w[3] = 0.54 - 0.46\\cdot(-0.901) = 0.954$
- $w[7] = 0.54 - 0.46\\cdot 1 = 0.08$

→ $w \\approx [0.08,\\ 0.253,\\ 0.642,\\ 0.954,\\ 0.954,\\ 0.642,\\ 0.253,\\ 0.08]$. Hai biên = 0.08 (không hẳn 0) → vẫn còn bước nhảy nhỏ nhưng rất nhỏ so với rectangular.

**Ví dụ 4 — so sánh năng lượng rò rỉ.** Đặt một sin **không khít chu kỳ** (vd 3.5 chu kỳ trong khung). Đo tỉ lệ năng lượng nằm ngoài bin đỉnh:
- Rectangular: ~ một phần đáng kể (búp phụ ~ −13 dB so với đỉnh).
- Hamming: búp phụ ~ −43 dB.
- Hann: búp phụ xa ~ −31 dB nhưng tắt nhanh hơn.

→ Rút ra: rectangular cho **đỉnh nhọn nhưng chân nhòe**; Hann/Hamming cho **đỉnh hơi tù nhưng chân sạch**.

⚠ **Lỗi thường gặp — chọn window.** Không có cửa sổ "tốt nhất tuyệt đối". Rectangular tốt khi tín hiệu khít chu kỳ trong khung (hiếm) hoặc cần phân giải hai tần số *rất sát nhau*. Với tín hiệu thực (giọng nói, nhạc), mặc định dùng **Hann**. Đừng mặc định rectangular chỉ vì "không làm gì" — nó là cửa sổ tệ nhất về rò rỉ.

🔁 **Dừng lại tự kiểm tra.** Vì sao Hann có $w[0] = w[N-1] = 0$ còn rectangular thì không? Điều đó ảnh hưởng gì?

<details><summary>Đáp án</summary>

Hann kéo hai biên về 0 nên khi DFT "dán" biên phải vào biên trái, không có bước nhảy → ít nội dung tần số cao giả → rò rỉ ít. Rectangular giữ biên = 1, bước nhảy lớn → rò rỉ nhiều.
</details>

📝 **Tóm tắt mục 3.**
- Rò rỉ phổ = năng lượng một tần số lan sang bin lân cận do "gãy" ở biên khung.
- Cửa sổ kéo biên về 0 để giảm gãy → giảm rò rỉ, đổi lại búp chính rộng hơn (giảm phân giải tần số).
- Mặc định thực dụng: **Hann**. Rectangular chỉ khi cần phân giải tần số tối đa và chấp nhận rò rỉ.

---

## 4. Trade-off thời gian ↔ tần số (Heisenberg–Gabor)

💡 **Trực giác.** Muốn biết **chính xác một sự kiện xảy ra khi nào**, bạn cần khung *ngắn* (nhìn vào một lát thời gian hẹp). Nhưng FFT trên khung ngắn có ít mẫu → **ít bin tần số → tần số bị nhòe**. Ngược lại, muốn **phân biệt hai tần số rất sát** bạn cần khung *dài* (nhiều mẫu, nhiều bin) → nhưng khung dài trải trên một khoảng thời gian rộng → **không biết sự kiện xảy ra khi nào**.

Bạn **không thể có cả hai cùng tối đa**. Đây là phiên bản tín hiệu của nguyên lý bất định.

### 4.1. Công thức phân giải

Với khung $N$ mẫu, tần số lấy mẫu $f_s$:

$$
\\Delta t = \\frac{N}{f_s} \\qquad\\text{(độ rộng thời gian một khung)}
$$
$$
\\Delta f = \\frac{f_s}{N} \\qquad\\text{(khoảng cách giữa hai bin tần số)}
$$

Nhân hai vế:

$$
\\Delta t \\cdot \\Delta f = \\frac{N}{f_s}\\cdot\\frac{f_s}{N} = 1
$$

→ **Tích $\\Delta t \\cdot \\Delta f$ là hằng số** (ở đây $=1$ với định nghĩa thô; bản chặt chẽ hơn cho ràng buộc $\\Delta t \\cdot \\Delta f \\ge \\frac{1}{4\\pi}$). Giảm $\\Delta t$ (định vị thời gian tốt) **bắt buộc** tăng $\\Delta f$ (phân giải tần số kém), và ngược lại.

### 4.2. Walk-through số — khung 1024 mẫu @ 44.1 kHz

$N = 1024$, $f_s = 44100$ Hz:

$$
\\Delta t = \\frac{1024}{44100} \\approx 0.0232\\ \\text{s} = 23.2\\ \\text{ms}
$$
$$
\\Delta f = \\frac{44100}{1024} \\approx 43.1\\ \\text{Hz}
$$

→ Khung này phân biệt được sự kiện cách nhau ~23 ms, và hai tần số cách nhau ~43 Hz.

**So sánh ba lựa chọn $N$** (cùng $f_s = 44100$):

| $N$ | $\\Delta t = N/f_s$ | $\\Delta f = f_s/N$ | Phù hợp |
|---|---|---|---|
| 256 | 5.8 ms | 172.3 Hz | Định vị thời gian tốt (transient, trống), tần số thô |
| 1024 | 23.2 ms | 43.1 Hz | Cân bằng — mặc định cho nhạc/giọng |
| 4096 | 92.9 ms | 10.8 Hz | Phân giải tần số tốt (phân biệt nốt sát nhau), thời gian nhòe |

Chú ý: $\\Delta t \\cdot \\Delta f = 1$ ở cả ba hàng ($5.8\\text{ms}\\times172.3 = 1$, $23.2\\times43.1 \\approx 1000\\ \\text{ms·Hz} = 1$, ...).

### 4.3. Bốn ví dụ chọn khung theo bài toán

1. **Nhận dạng nhịp trống (drum hit):** sự kiện rất ngắn, cần biết *khi nào* gõ → khung **ngắn** ($N=256$). Không quan trọng phân biệt 440 vs 445 Hz.
2. **Phân tích hợp âm piano (hai nốt cách nửa cung):** C4 = 261.6 Hz, C#4 = 277.2 Hz, cách ~15.6 Hz. Cần $\\Delta f < 15.6$ → $N > f_s/15.6 = 44100/15.6 \\approx 2827$ → chọn $N = 4096$ (khung dài).
3. **Giọng nói (speech):** formant thay đổi nhanh ~10–30 ms → khung ~ **25 ms** ($N \\approx 1024$ @ 44.1k, hoặc 400 @ 16k) là chuẩn công nghiệp.
4. **Sonar / radar chirp:** tín hiệu quét tần số liên tục → cần cân bằng; thường khung trung bình + overlap cao để theo vết đường chéo trên spectrogram.

⚠ **Lỗi thường gặp — tưởng có thể thoát trade-off.** Tăng overlap (hop nhỏ) cho *nhiều cột thời gian hơn* nhưng **KHÔNG cải thiện $\\Delta t$ thực**: mỗi cột vẫn "nhìn" qua một khung rộng $N/f_s$ giây. Overlap làm trục thời gian *dày hơn về mặt vẽ*, không làm cửa sổ hẹp lại. Cách duy nhất giảm $\\Delta t$ là **giảm $N$** — và điều đó *bắt buộc* làm $\\Delta f$ xấu đi. Không có bữa trưa miễn phí.

❓ **Câu hỏi tự nhiên.**
- *"Vậy zero-padding (đệm 0 cho khung dài hơn) có giúp không?"* — Zero-padding làm phổ trông *mịn hơn* (nội suy nhiều bin hơn) nhưng **không tăng phân giải thực**: vẫn không tách được hai tần số mà khung gốc không tách nổi. Nó chỉ vẽ đẹp, không thêm thông tin.
- *"Wavelet thì sao?"* — Wavelet dùng cửa sổ *thay đổi độ rộng theo tần số* (ngắn cho tần số cao, dài cho tần số thấp), né được phần nào sự cứng nhắc của STFT một-độ-rộng. Nhưng vẫn không phá vỡ bất định, chỉ phân bổ nó khác đi.

🔁 **Dừng lại tự kiểm tra.** Cần phân biệt hai nốt cách 5 Hz, $f_s = 8000$ Hz. $N$ tối thiểu là bao nhiêu? Khung đó dài bao nhiêu ms?

<details><summary>Đáp án</summary>

Cần $\\Delta f \\le 5 \\Rightarrow N \\ge f_s/5 = 8000/5 = 1600$ mẫu. Độ dài $= 1600/8000 = 0.2$ s $= 200$ ms — khá dài, nên định vị thời gian sẽ rất thô (đúng với trade-off).
</details>

📝 **Tóm tắt mục 4.**
- $\\Delta t = N/f_s$, $\\Delta f = f_s/N$, tích $\\Delta t\\cdot\\Delta f$ là hằng số → không thể tối ưu cả hai.
- Khung ngắn: thời gian sắc, tần số nhòe. Khung dài: ngược lại.
- Overlap và zero-padding **không** phá trade-off — chỉ giảm $N$ mới đổi được $\\Delta t$, và phải trả giá bằng $\\Delta f$.

---

## 5. Overlap & hop size

💡 **Trực giác.** Cửa sổ Hann kéo hai biên khung về 0 → mẫu ở biên khung bị "bỏ phí". Nếu các khung không chồng ($H = N$), thông tin ở biên của khung này hầu như mất. Cho các khung **chồng lấp** (vd dịch nửa khung) thì biên của khung này rơi vào giữa khung kia → không mẫu nào bị bỏ, và trục thời gian mượt hơn.

### 5.1. Định nghĩa

- **Hop size $H$**: số mẫu dịch giữa hai khung liên tiếp.
- **Overlap** $= 1 - \\dfrac{H}{N}$. Vd $N=1024, H=256 \\Rightarrow$ overlap $= 1 - 0.25 = 75\\%$.
- **Số khung** từ tín hiệu dài $L$ mẫu: $\\big\\lfloor (L - N)/H \\big\\rfloor + 1$.

### 5.2. Ví dụ số

$L = 44100$ (1 giây @ 44.1k), $N = 1024$:

| $H$ | Overlap | Số khung $\\lfloor(L-N)/H\\rfloor + 1$ | Trục thời gian |
|---|---|---|---|
| 1024 | 0% | $\\lfloor 43076/1024\\rfloor + 1 = 43$ | thưa, mép có thể gãy |
| 512 | 50% | $\\lfloor 43076/512\\rfloor + 1 = 85$ | mượt vừa |
| 256 | 75% | $\\lfloor 43076/256\\rfloor + 1 = 169$ | mượt, chuẩn cho âm thanh |
| 128 | 87.5% | $\\lfloor 43076/128\\rfloor + 1 = 337$ | rất mượt, tốn tính toán |

→ Overlap cao = nhiều cột spectrogram hơn (đẹp, mượt) nhưng tốn FFT hơn. **75% (hop = N/4) là mặc định công nghiệp** cho cửa sổ Hann.

⚠ **Nhắc lại (mục 4):** nhiều cột hơn ≠ phân giải thời gian tốt hơn. Mỗi cột vẫn nhìn qua khung rộng $N/f_s$. Overlap chỉ làm *vẽ dày hơn*.

🔁 **Dừng lại tự kiểm tra.** $N = 2048, H = 512$: overlap bao nhiêu %?

<details><summary>Đáp án</summary>

Overlap $= 1 - 512/2048 = 1 - 0.25 = 75\\%$.
</details>

📝 **Tóm tắt mục 5.**
- Hop $H$ điều khiển độ dày trục thời gian; overlap $= 1 - H/N$.
- 75% (hop = N/4) là mặc định cho Hann.
- Overlap cao = mượt + tốn tính, **không** tăng phân giải thời gian thực.

---

## 6. Spectrogram — đọc bản đồ tần số-thời gian

💡 **Trực giác.** Spectrogram là **một bức ảnh nhiệt (heatmap)**: trục ngang = thời gian (chỉ số khung $\\ell$), trục dọc = tần số (chỉ số bin $k$), **màu/độ sáng = năng lượng** $|X[k,\\ell]|^2$. Mỗi cột là một bức FFT của một khung; xếp các cột cạnh nhau theo thời gian.

### 6.1. Định nghĩa

$$
S[k, \\ell] = \\big|X[k,\\ell]\\big|^2
$$

Thường vẽ theo **decibel** để nén dải động lớn:

$$
S_{\\text{dB}}[k,\\ell] = 10\\log_{10}\\big(|X[k,\\ell]|^2 + \\varepsilon\\big)
$$

($\\varepsilon$ nhỏ để tránh $\\log 0$.) Màu sáng/nóng = năng lượng cao, màu tối/lạnh = năng lượng thấp.

### 6.2. Cách đọc

- **Vạch ngang sáng** = một tần số ổn định kéo dài theo thời gian (vd nốt ngân, tiếng huýt).
- **Đường chéo** = tần số *quét* (chirp) — tăng dần (đi lên) hoặc giảm dần (đi xuống). Tiếng còi xe chạy ngang (Doppler), sonar.
- **Cột dọc sáng toàn dải** = một sự kiện rất ngắn, dải rộng (tiếng gõ, transient trống, tiếng "t"/"k" trong giọng nói).
- **Các vạch ngang cách đều** = chuỗi sóng hài (harmonics) — đặc trưng nguyên âm giọng nói và nhạc cụ có cao độ.

### 6.3. Ví dụ ráp nối ba tín hiệu (sẽ thấy trong viz)

- **Chirp lên:** đường chéo đi từ góc dưới-trái lên góc trên-phải.
- **Hai nốt nối tiếp (440 → 880):** một vạch ngang ở 440 nửa đầu, rồi nhảy lên vạch 880 nửa sau.
- **Hợp âm (440 + 880 cùng lúc):** hai vạch ngang song song suốt thời gian.

→ Ba bức này *khác hẳn nhau* trên spectrogram, dù FFT một phát của (nối tiếp) và (hợp âm) gần như giống — đúng vấn đề mở bài §1, nay đã giải.

📝 **Tóm tắt mục 6.**
- Spectrogram = heatmap của $|X[k,\\ell]|^2$: x = thời gian, y = tần số, màu = năng lượng (thường dB).
- Đọc theo hình: vạch ngang (tần số ổn định), đường chéo (chirp), cột dọc (transient), vạch cách đều (harmonics).

---

## 7. Ứng dụng thực tế

1. **Nhận dạng giọng nói (ASR).** Bước tiền xử lý gần như mọi hệ thống là biến sóng âm thành spectrogram (thường **mel-spectrogram**, xem dưới), rồi đưa vào mô hình. Formant — các đỉnh cộng hưởng của thanh quản — hiện rõ trên spectrogram và phân biệt nguyên âm.

2. **Shazam (audio fingerprint).** Shazam tìm các **điểm đỉnh năng lượng** trên spectrogram (constellation map), băm các cặp đỉnh thành "vân tay" rồi đối chiếu cơ sở dữ liệu. Spectrogram bền với nhiễu/nén nên nhận diện được bài hát trong quán ồn.

3. **Phân tích nhạc & transcription.** Tách nốt, dò cao độ (pitch tracking), phát hiện onset (điểm bắt đầu nốt) — tất cả đọc trực tiếp từ spectrogram. Đường chéo = glissando/vibrato; vạch cách đều = chuỗi hài của một nhạc cụ.

4. **Mel-spectrogram trong AI.** Tai người nghe tần số theo thang **mel** (gần như log), không tuyến tính. Người ta gộp các bin STFT theo bộ lọc mel rồi lấy log → **mel-spectrogram**, là đầu vào tiêu chuẩn cho mạng nơ-ron xử lý âm thanh (Whisper, wav2vec, TTS, phát hiện âm thanh). Liên hệ: [AI-ML](../../../AI-ML/). Phân tích nhạc cụ thể: [Music](../../../Music/).

5. **Y sinh & cơ khí.** Spectrogram EEG/ECG (phát hiện cơn động kinh qua thay đổi nhịp tần số), giám sát rung động máy móc (vòng bi hỏng tạo vạch tần số mới), địa chấn.

📝 **Tóm tắt mục 7.** Spectrogram/STFT là cây cầu giữa tín hiệu thô và mọi tầng phân tích cao hơn — từ Shazam tới Whisper, hầu hết bắt đầu bằng "biến sóng thành ảnh tần số-thời gian".

---

## Bài tập

1. **Phân giải.** Với $f_s = 48000$ Hz, $N = 2048$: tính $\\Delta t$ và $\\Delta f$. Bin nào (k) gần nhất với 1000 Hz?
2. **Chọn khung.** Cần phân biệt hai nốt cách 8 Hz, $f_s = 44100$ Hz. Tìm $N$ tối thiểu (làm tròn lên lũy thừa của 2). Khung đó dài bao nhiêu ms? Định vị thời gian như vậy là tốt hay tồi?
3. **Overlap.** $L = 16000$ mẫu (1 s @ 16 kHz), $N = 512$, $H = 128$. Tính overlap (%) và số khung.
4. **Cửa sổ.** Tính $w[m]$ của cửa sổ Hann với $N = 4$ tại $m = 0,1,2,3$. Hai biên có bằng 0 không?
5. **Đọc spectrogram.** Mô tả hình dạng trên spectrogram của: (a) một tiếng huýt cao độ không đổi 2 giây; (b) còi xe chạy ngang qua người nghe; (c) một tiếng vỗ tay.
6. **Phản biện trade-off.** Một bạn nói: "Tôi đặt overlap 99% nên spectrogram của tôi phân giải thời gian cực tốt." Đúng hay sai? Giải thích.
7. **(Mở rộng)** Vì sao mel-spectrogram được ưa dùng làm đầu vào AI hơn STFT tuyến tính thô?

---

## Lời giải chi tiết

### Bài 1
$\\Delta t = N/f_s = 2048/48000 = 0.04267$ s $= 42.67$ ms.
$\\Delta f = f_s/N = 48000/2048 = 23.44$ Hz.
Bin gần 1000 Hz: $k = 1000/\\Delta f = 1000/23.44 \\approx 42.67 \\Rightarrow k = 43$ (tần số tâm $43 \\times 23.44 = 1007.8$ Hz).

### Bài 2
Cần $\\Delta f \\le 8 \\Rightarrow N \\ge f_s/8 = 44100/8 = 5512.5$. Lũy thừa 2 nhỏ nhất $\\ge 5512.5$ là $8192$ ($=2^{13}$).
Độ dài khung $= 8192/44100 = 0.1857$ s $\\approx 186$ ms.
→ Rất dài → định vị thời gian **tồi** (mọi sự kiện trong ~186 ms bị trộn). Đây chính là cái giá phải trả khi muốn $\\Delta f$ nhỏ — đúng trade-off Heisenberg.

### Bài 3
Overlap $= 1 - H/N = 1 - 128/512 = 1 - 0.25 = 75\\%$.
Số khung $= \\lfloor (L - N)/H \\rfloor + 1 = \\lfloor (16000 - 512)/128 \\rfloor + 1 = \\lfloor 15488/128 \\rfloor + 1 = 121 + 1 = 122$.

### Bài 4
Hann: $w[m] = 0.5\\big(1 - \\cos\\frac{2\\pi m}{N-1}\\big)$, $N=4 \\Rightarrow N-1 = 3$.
- $w[0] = 0.5(1 - \\cos 0) = 0$
- $w[1] = 0.5(1 - \\cos\\frac{2\\pi}{3}) = 0.5(1 - (-0.5)) = 0.75$
- $w[2] = 0.5(1 - \\cos\\frac{4\\pi}{3}) = 0.5(1 - (-0.5)) = 0.75$
- $w[3] = 0.5(1 - \\cos 2\\pi) = 0.5(1 - 1) = 0$

→ Hai biên $w[0] = w[3] = 0$ ✓ (đúng đặc tính Hann).

### Bài 5
(a) **Tiếng huýt cao độ không đổi:** một **vạch ngang** sáng ở độ cao tần số đó, kéo dài suốt 2 giây (có thể kèm vài vạch hài mờ phía trên).
(b) **Còi xe chạy ngang (Doppler):** vạch tần số **cao** khi xe lại gần, **tụt xuống** khi xe đi xa → một đường **dốc xuống** (đường cong/đoạn chéo đi xuống) quanh thời điểm xe ngang qua.
(c) **Tiếng vỗ tay:** một **cột dọc** sáng, **trải rộng toàn dải tần** (transient ngắn = băng thông rộng), rất hẹp theo trục thời gian.

### Bài 6
**Sai.** Overlap 99% tạo *rất nhiều cột* spectrogram nên trông mượt và "dày" theo thời gian, nhưng **mỗi cột vẫn là FFT của một khung rộng $N$ mẫu** — tức mỗi cột vẫn nhìn qua $\\Delta t = N/f_s$ giây. Phân giải thời gian *thực* chỉ phụ thuộc $N$ (và cửa sổ), không phụ thuộc hop. Muốn $\\Delta t$ nhỏ phải giảm $N$, và khi đó $\\Delta f$ xấu đi (trade-off). Overlap chỉ là nội suy theo thời gian, không thêm thông tin.

### Bài 7
Vì: (1) **Tai người nghe theo thang mel/log**, dồn độ phân giải vào tần số thấp (nơi giọng nói/âm nhạc chứa nhiều thông tin), nên mel-spectrogram khớp cảm nhận hơn STFT tuyến tính. (2) **Giảm chiều dữ liệu**: gộp hàng nghìn bin STFT thành ~40–128 dải mel → đầu vào gọn, mô hình học nhanh và ít overfit. (3) **Lấy log năng lượng** nén dải động, gần với cách tai cảm nhận độ to → đặc trưng ổn định hơn với thay đổi âm lượng.

---

## Tham khảo & Bài tiếp theo

- **Tiền đề:** [L10 — FFT](../lesson-05-fft/) · [L09 — DFT](../lesson-04-dft/) · [Tier 1 L02 — Lấy mẫu & Nyquist](../../01-Foundations/lesson-02-sampling-nyquist/)
- **Bài tiếp theo (sang Tier 3 — Ứng dụng):** [Lọc số (Digital Filters)](../../03-Applied/lesson-01-digital-filters/) — dùng phổ để thiết kế bộ lọc thông thấp/cao/dải.
- **Liên hệ:** mel-spectrogram làm đầu vào mạng nơ-ron → [AI-ML](../../../AI-ML/); phân tích cao độ & hài âm nhạc cụ → [Music](../../../Music/).
- **Minh họa tương tác:** [visualization.html](./visualization.html)
</content>
</invoke>
`;
