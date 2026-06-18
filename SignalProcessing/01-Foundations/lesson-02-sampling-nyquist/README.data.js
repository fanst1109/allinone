// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SignalProcessing/01-Foundations/lesson-02-sampling-nyquist/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Lấy mẫu & Định lý Nyquist (sampling & Nyquist theorem)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** một máy tính chỉ lưu được dãy số rời rạc lại có thể tái tạo một sóng liên tục — và điều kiện để làm được.
- Định nghĩa và tính được **tần số lấy mẫu** $f_s$, **chu kỳ lấy mẫu** $T_s = 1/f_s$, và dãy mẫu $x[n] = x(n \\cdot T_s)$.
- Phát biểu và áp dụng **định lý lấy mẫu Nyquist–Shannon**: $f_s > 2 f_{\\max}$, biết **tần số Nyquist** $= f_s/2$.
- Hiểu **aliasing (chồng phổ)** — cái bẫy lớn nhất của bài này — và tính được tần số "giả dạng" (alias).
- Hiểu **lượng tử hóa (quantization)**: số bit → số mức, sai số lượng tử, và công thức $\\text{SNR} \\approx 6.02 N$ dB.
- Hiểu nguyên lý **tái tạo (reconstruction)**: giữ mẫu + lọc thông thấp, và sơ lược về nội suy sinc.
- Giải thích được vì sao CD audio chọn **44 100 Hz** và vì sao phải có **bộ lọc chống alias** trước khi lấy mẫu.

## Kiến thức tiền đề

- [L01 — Tín hiệu cơ bản](../lesson-01-signals-basics/) — biên độ, tần số, pha, sóng sin. **Bắt buộc đọc trước.**
- [Electronics — ADC/DAC](../../../Electronics/03-Digital-MCU/lesson-05-adc-dac/) — phần cứng chuyển đổi tương tự ↔ số (tùy chọn, bổ trợ §7).
- [DataFoundations — Floating-point](../../../DataFoundations/01-NumberRepresentation/lesson-03-floating-point/) — cách máy biểu diễn số thực; liên hệ trực tiếp với lượng tử hóa ở §5.

---

## 1. Vì sao? — Câu hỏi mở bài

> **Đĩa CD audio lấy mẫu ở 44 100 Hz (44.1 kHz). Vì sao lại đúng con số đó? Vì sao không phải 10 000 Hz cho nhẹ file, hay 1 000 000 Hz cho thật "nét"?**

Một sóng âm thanh ngoài đời là **liên tục (continuous)**: tại *mọi* thời điểm $t$ đều có một giá trị áp suất. Giữa hai thời điểm bất kỳ luôn có vô hạn thời điểm khác. Nhưng bộ nhớ máy tính **hữu hạn và rời rạc** — nó chỉ lưu được một **dãy số đếm được**, ví dụ "tại 0 ms = 0.3, tại 0.02 ms = 0.31, ...".

Vậy nảy sinh hai câu hỏi cốt lõi mà cả bài này trả lời:

1. **Lấy mẫu thưa tới đâu thì vẫn tái tạo được sóng gốc không sai?** → Định lý Nyquist (§3). Đáp án ngắn: tai người nghe được tới ~20 000 Hz, nên cần $f_s > 2 \\times 20\\,000 = 40\\,000$ Hz. 44 100 Hz vượt ngưỡng này một chút (chừa khoảng cho bộ lọc) → đó chính là lý do con số 44.1 kHz.
2. **Mỗi mẫu lưu bằng bao nhiêu bit thì đủ "mịn"?** → Lượng tử hóa (§5). CD dùng 16-bit → ~96 dB SNR, vượt ngưỡng nghe của tai.

> **💡 Trực giác.** Hãy hình dung quay phim một guồng nước đang chạy. Mỗi giây máy quay chụp 24 tấm hình (24 "mẫu"). Nếu guồng quay chậm, 24 tấm/giây thừa sức ghi lại chuyển động đúng. Nhưng nếu guồng quay *rất nhanh*, 24 tấm/giây không theo kịp — trên phim guồng trông như **đứng yên hoặc quay ngược**. Lấy mẫu âm thanh y hệt: lấy mẫu đủ nhanh thì tái tạo đúng; lấy mẫu quá thưa thì tần số cao "giả dạng" thành tần số thấp (aliasing, §4).

📝 **Tóm tắt mục 1**
- Sóng ngoài đời là liên tục; máy chỉ lưu được dãy mẫu rời rạc.
- Hai quyết định cốt lõi: lấy mẫu **bao nhanh** (Nyquist) và mỗi mẫu **bao nhiêu bit** (quantization).
- 44.1 kHz ≈ vượt $2 \\times 20$ kHz một chút → vừa đủ tái tạo dải nghe của người.

---

## 2. Lấy mẫu (sampling)

> **💡 Trực giác.** Lấy mẫu = "chấm" giá trị của sóng tại các thời điểm cách đều nhau, rồi vứt mọi thứ ở giữa. Giống đo nhiệt độ cứ mỗi giờ một lần: ta được 24 con số/ngày thay vì một đường nhiệt độ liền mạch.

### 2.1 Định nghĩa (3 phần)

**(a) Là gì.** **Lấy mẫu (sampling)** là quá trình lấy giá trị của một tín hiệu liên tục $x(t)$ tại các thời điểm cách đều nhau $t = n T_s$ ($n = 0, 1, 2, \\dots$), tạo ra dãy số rời rạc:

$$x[n] = x(n \\cdot T_s)$$

- **Tần số lấy mẫu (sampling rate)** $f_s$: số mẫu lấy được trong **1 giây**, đơn vị **Hz** (mẫu/giây).
- **Chu kỳ lấy mẫu (sampling period)** $T_s$: khoảng thời gian giữa hai mẫu liên tiếp:

$$T_s = \\frac{1}{f_s}$$

**(b) Vì sao cần.** Vì bộ nhớ số hữu hạn không lưu được vô hạn giá trị của tín hiệu liên tục. Lấy mẫu là **cây cầu** bắt buộc giữa thế giới tương tự (analog) và thế giới số (digital). Không có bước này thì không có audio số, ảnh số, hay bất kỳ ADC nào.

**(c) Ví dụ trực giác bằng số.** Nếu $f_s = 1000$ Hz thì $T_s = 1/1000 = 0.001$ s $= 1$ ms → cứ mỗi 1 ms lấy 1 mẫu. Trong 1 giây có 1000 mẫu.

### 2.2 Bốn ví dụ số

| # | $f_s$ | $T_s = 1/f_s$ | Diễn giải |
|---|-------|---------------|-----------|
| 1 | $8\\,000$ Hz | $125\\ \\mu s$ | Điện thoại cũ (telephony): lấy 8000 mẫu/giây, mỗi mẫu cách nhau 125 µs |
| 2 | $44\\,100$ Hz | $\\approx 22.7\\ \\mu s$ | CD audio |
| 3 | $48\\,000$ Hz | $\\approx 20.83\\ \\mu s$ | Audio trong phim / video chuyên nghiệp |
| 4 | $1\\,000$ Hz | $1$ ms | Đo nhịp tim (ECG) phổ thông |

**Walk-through ví dụ 2 (CD):**
$T_s = \\dfrac{1}{44\\,100} = 2.2676 \\times 10^{-5}$ s $\\approx 22.68\\ \\mu s$. Trong một bài hát 3 phút ($180$ s) số mẫu là $44\\,100 \\times 180 = 7\\,938\\,000$ mẫu **mỗi kênh** (stereo → ×2).

### 2.3 Lấy mẫu một sóng sin cụ thể

Cho sóng $x(t) = \\sin(2\\pi \\cdot 50 \\cdot t)$ (tần số $50$ Hz), lấy mẫu ở $f_s = 200$ Hz nên $T_s = 5$ ms. Mẫu thứ $n$ là $x[n] = \\sin(2\\pi \\cdot 50 \\cdot n \\cdot 0.005) = \\sin(0.5\\pi n)$:

| $n$ | $t = nT_s$ | $0.5\\pi n$ | $x[n] = \\sin(0.5\\pi n)$ |
|-----|-----------|-----------|--------------------------|
| 0 | 0 ms | 0 | 0 |
| 1 | 5 ms | $0.5\\pi$ | 1 |
| 2 | 10 ms | $\\pi$ | 0 |
| 3 | 15 ms | $1.5\\pi$ | −1 |
| 4 | 20 ms | $2\\pi$ | 0 |

→ Mỗi chu kỳ $50$ Hz dài $20$ ms được "chấm" bằng 4 mẫu. Đủ để nhận ra đây là một sóng sin (sẽ chứng minh "đủ" ở §3).

> **❓ Câu hỏi tự nhiên của người đọc.**
> - *"Lấy mẫu có làm mất tín hiệu giữa hai mẫu không?"* — Đúng là ta **không lưu** giá trị giữa hai mẫu. Nhưng định lý Nyquist (§3) bảo: nếu lấy mẫu đủ nhanh, các giá trị ở giữa được **suy ra duy nhất** từ các mẫu — không mất mát.
> - *"$f_s$ càng cao càng tốt?"* — Tốt cho chất lượng nhưng tốn bộ nhớ/băng thông tuyến tính theo $f_s$. Ta muốn $f_s$ **vừa đủ**, không thừa.

🔁 **Dừng lại tự kiểm tra.**
1. $f_s = 16\\,000$ Hz thì $T_s = ?$
2. Một clip 10 s lấy mẫu ở $44\\,100$ Hz, mono, có bao nhiêu mẫu?

<details><summary>Đáp án</summary>

1. $T_s = 1/16\\,000 = 62.5\\ \\mu s$.
2. $44\\,100 \\times 10 = 441\\,000$ mẫu.
</details>

📝 **Tóm tắt mục 2**
- $f_s$ = số mẫu/giây; $T_s = 1/f_s$ = khoảng cách giữa hai mẫu.
- $x[n] = x(nT_s)$ — chỉ giữ giá trị tại các thời điểm rời rạc.
- Lấy mẫu là cầu nối analog → digital.

---

## 3. Định lý lấy mẫu Nyquist–Shannon

> **💡 Trực giác.** Để "khóa" được một sóng sin, mỗi chu kỳ phải được chấm **ít nhất 2 mẫu** — một cho đỉnh, một cho đáy (nói nôm na). Ít hơn 2 mẫu/chu kỳ thì có vô số sóng khác nhau đi qua đúng các điểm mẫu đó → không phân biệt được → tái tạo sai.

### 3.1 Phát biểu (định nghĩa 3 phần)

**(a) Là gì.** Định lý Nyquist–Shannon nói: một tín hiệu **giới hạn băng tần (band-limited)** với tần số cao nhất là $f_{\\max}$ có thể được **tái tạo hoàn hảo** từ các mẫu của nó **khi và chỉ khi** tần số lấy mẫu thỏa:

$$\\boxed{f_s > 2 f_{\\max}}$$

Ngưỡng $2 f_{\\max}$ gọi là **tốc độ Nyquist (Nyquist rate)**. Đại lượng đối ngẫu, **tần số Nyquist (Nyquist frequency)**, là nửa tần số lấy mẫu:

$$f_{\\text{Nyq}} = \\frac{f_s}{2}$$

→ Mọi thành phần tần số trong tín hiệu phải nằm **dưới** $f_s/2$ thì mới tái tạo đúng.

**(b) Vì sao tồn tại / vì sao cần.** Vì nếu không, **nhiều** sóng liên tục khác nhau cùng đi qua đúng các điểm mẫu — máy không biết chọn cái nào → tái tạo nhập nhằng (đó chính là aliasing, §4). Định lý cho ta **ranh giới chính xác** giữa "lấy mẫu vô hại" và "lấy mẫu phá hủy thông tin", nên nó là nền tảng của *toàn bộ* xử lý tín hiệu số.

**(c) Ví dụ trực giác bằng số.** Tai người nghe tới ~$20\\,000$ Hz → $f_{\\max} = 20$ kHz → cần $f_s > 40$ kHz. CD chọn $44.1$ kHz ($> 40$) → tái tạo đúng dải nghe; tần số Nyquist $= 44\\,100/2 = 22\\,050$ Hz.

### 3.2 Bốn ví dụ số

| # | $f_{\\max}$ tín hiệu | $f_s$ chọn | $f_s > 2f_{\\max}$? | Kết luận |
|---|---------------------|-----------|---------------------|----------|
| 1 | $20$ kHz (nhạc) | $44.1$ kHz | $44.1 > 40$ ✓ | Tái tạo đúng |
| 2 | $4$ kHz (giọng nói) | $8$ kHz | $8 > 8$? **KHÔNG** (cần *lớn hơn*) | Biên — thực tế lọc xuống ~3.4 kHz để an toàn |
| 3 | $100$ Hz | $150$ Hz | $150 > 200$? KHÔNG | **Vi phạm** → aliasing |
| 4 | $15$ kHz | $48$ kHz | $48 > 30$ ✓ | Tái tạo đúng, dư biên |

**Walk-through ví dụ 3:** $f_{\\max} = 100$ Hz cần $f_s > 200$ Hz, nhưng ta chọn $150$ Hz < 200 → vi phạm. Tần số Nyquist $= 75$ Hz, mà tín hiệu có $100 > 75$ Hz → thành phần $100$ Hz sẽ alias xuống $50$ Hz (tính ở §4).

> **⚠ Lỗi thường gặp.** Dấu là $f_s \\mathbf{>} 2f_{\\max}$ (lớn hơn *thực sự*), **không phải** $\\geq$. Tại đúng biên $f_s = 2f_{\\max}$, một sóng sin có thể bị lấy mẫu ngay tại các điểm cắt-không (zero crossing) → mọi mẫu $= 0$ → mất hoàn toàn tín hiệu. Vì vậy thực tế luôn lấy $f_s$ **dư** ra (như 44.1 so với 40).

> **❓ Câu hỏi tự nhiên.**
> - *"'Giới hạn băng tần' nghĩa là gì?"* — Là tín hiệu **không có** thành phần tần số nào vượt $f_{\\max}$. Tín hiệu đời thực hiếm khi giới hạn băng tần hoàn hảo → phải **lọc bỏ** phần trên $f_s/2$ trước khi lấy mẫu (bộ lọc chống alias, §7).
> - *"Vì sao 2 lần mà không phải 3 hay 1.5?"* — Một sóng sin có 2 tham số tự do (biên độ + pha) cho mỗi tần số; cần $\\geq 2$ mẫu/chu kỳ để khóa cả hai. Toán học chính xác nằm trong chứng minh Shannon dựa trên phổ tuần hoàn hóa.

🔁 **Dừng lại tự kiểm tra.**
1. Tín hiệu có $f_{\\max} = 3\\,400$ Hz cần $f_s$ tối thiểu (lý thuyết) bao nhiêu?
2. $f_s = 48$ kHz thì tần số Nyquist là bao nhiêu? Tín hiệu $25$ kHz có an toàn không?

<details><summary>Đáp án</summary>

1. $f_s > 6\\,800$ Hz (lý thuyết); thực tế chọn 8 kHz cho an toàn.
2. $f_{\\text{Nyq}} = 24$ kHz. Tín hiệu $25 > 24$ kHz → **không an toàn**, sẽ alias.
</details>

📝 **Tóm tắt mục 3**
- Điều kiện tái tạo hoàn hảo: $f_s > 2 f_{\\max}$ (lớn hơn *thực sự*).
- Tần số Nyquist $= f_s/2$ — ranh giới cao nhất tín hiệu được phép có.
- Tín hiệu phải giới hạn băng tần; thực tế cần lọc trước.

---

## 4. Aliasing (chồng phổ) — cái bẫy lớn nhất

> **💡 Trực giác.** Khi lấy mẫu quá thưa, một tần số cao "đội lốt" một tần số thấp: hai sóng khác nhau đi qua đúng các điểm mẫu → khi tái tạo, máy chọn sóng thấp (sai). Giống hiệu ứng **bánh xe quay ngược** trong phim: bánh xe quay nhanh hơn tốc độ chụp khung hình nên trông như quay chậm lại hoặc ngược chiều.

### 4.1 Định nghĩa (3 phần)

**(a) Là gì.** **Aliasing (chồng phổ / răng cưa)** là hiện tượng một thành phần tần số $f > f_s/2$ sau khi lấy mẫu xuất hiện **giả dạng** thành một tần số khác $f_{\\text{alias}} < f_s/2$ — không thể phân biệt với một tín hiệu thật ở tần số đó.

**(b) Vì sao tồn tại.** Vì việc lấy mẫu làm phổ của tín hiệu **lặp lại tuần hoàn** mỗi $f_s$ trên trục tần số. Khi $f > f_s/2$, các bản sao phổ chồng lên nhau ("chồng phổ") → phần trên gập xuống vùng dưới $f_s/2$. Đây chính là mặt trái của việc vi phạm Nyquist.

**(c) Ví dụ trực giác bằng số.** Sóng $800$ Hz lấy mẫu ở $1000$ Hz: Nyquist $= 500$ Hz, mà $800 > 500$ → alias. Tần số giả $= |1000 - 800| = 200$ Hz. Nghe ra như một nốt $200$ Hz hoàn toàn khác (walk-through dưới).

### 4.2 Công thức tần số alias

Tần số biểu kiến (apparent / alias) khi lấy mẫu $f$ ở tốc độ $f_s$:

$$f_{\\text{alias}} = \\left| f - f_s \\cdot \\text{round}\\!\\left(\\frac{f}{f_s}\\right) \\right|$$

Kết quả luôn nằm trong $[0, f_s/2]$. Với một tần số chỉ hơi vượt Nyquist, công thức rút gọn thành $f_{\\text{alias}} = |f_s - f|$ (khi $f_s/2 < f < f_s$).

### 4.3 Walk-through số: sin 800 Hz lấy mẫu 1000 Hz → ra 200 Hz

Cho $x(t) = \\sin(2\\pi \\cdot 800\\, t)$, lấy mẫu $f_s = 1000$ Hz → $T_s = 1$ ms. Mẫu thứ $n$:

$$x[n] = \\sin(2\\pi \\cdot 800 \\cdot n \\cdot 0.001) = \\sin(1.6\\pi n)$$

Vì $\\sin(\\theta) = \\sin(\\theta - 2\\pi n)$ áp cho từng mẫu, ta viết $1.6\\pi n = 2\\pi n - 0.4\\pi n$, nên:

$$x[n] = \\sin(2\\pi n - 0.4\\pi n) = \\sin(-0.4\\pi n) = -\\sin(0.4\\pi n)$$

Mà $-\\sin(0.4\\pi n) = \\sin(2\\pi \\cdot 200 \\cdot n \\cdot 0.001 + \\pi)$ — chính là một sóng **200 Hz** (lệch pha $\\pi$). Kiểm tra bằng bảng (so $\\sin(1.6\\pi n)$ với $\\sin(2\\pi\\cdot 200 \\cdot nT_s)= \\sin(0.4\\pi n)$):

| $n$ | $1.6\\pi n \\bmod 2\\pi$ | $x[n]=\\sin(1.6\\pi n)$ | sóng 200 Hz: $\\sin(0.4\\pi n)$ |
|-----|------------------------|------------------------|-------------------------------|
| 0 | 0 | 0 | 0 |
| 1 | $1.6\\pi$ | $-0.951$ | $0.951$ |
| 2 | $1.2\\pi$ | $-0.588$ | $0.588$ |
| 3 | $0.8\\pi$ | $0.588$ | $-0.588$ |
| 4 | $0.4\\pi$ | $0.951$ | $-0.951$ |
| 5 | 0 | 0 | 0 |

→ $x[n]$ đúng bằng $-\\sin(0.4\\pi n)$ ở mọi mẫu: sóng 800 Hz và sóng 200 Hz (đảo pha) **không phân biệt được** qua các mẫu. Công thức xác nhận: $f_{\\text{alias}} = |800 - 1000 \\cdot \\text{round}(0.8)| = |800 - 1000| = 200$ Hz. ✓

### 4.4 Bánh xe quay ngược trong phim (wagon-wheel effect)

Phim quay $f_s = 24$ khung/giây. Một bánh xe có nan, quay sao cho mỗi khung hình nó nhích đúng *gần một vòng*. Mắt thấy nan dịch một chút **ngược chiều** → bánh xe trông như quay ngược, dù xe đang chạy tới. Đây là aliasing trong miền không gian-thời gian: tần số quay vượt Nyquist của camera ($12$ vòng/giây) → alias xuống một tần số thấp (có thể âm = quay ngược).

> **⚠ Lỗi thường gặp (rất hay sai!).** Aliasing **không** thể sửa được *sau khi* đã lấy mẫu. Một khi 800 Hz đã biến thành 200 Hz trong dãy mẫu, không có bộ lọc số nào tách lại được — vì hai tín hiệu giờ *giống hệt nhau* về mặt dữ liệu. Cách duy nhất: **lọc bỏ phần trên $f_s/2$ TRƯỚC khi lấy mẫu** (anti-aliasing filter, §7). Đây là lý do mọi ADC chất lượng đều có bộ lọc analog ở đầu vào.

> **❓ Câu hỏi tự nhiên.**
> - *"Tần số alias có thể bằng 0 không?"* — Có. Sóng đúng $f = f_s$ (vd 1000 Hz lấy mẫu 1000 Hz) → mỗi mẫu rơi đúng cùng pha → dãy mẫu là hằng số → alias $= 0$ Hz (DC). Đây là "bánh xe đứng yên".
> - *"Vì sao nghe ra nốt khác chứ không phải nhiễu?"* — Vì alias là một tần số **xác định**, không ngẫu nhiên. Nó là một nốt sai, gây méo tiếng rõ rệt (vd tiếng "leng keng" lạ ở nhạc số kém chất lượng).

🔁 **Dừng lại tự kiểm tra.**
1. Sóng $1200$ Hz lấy mẫu $1000$ Hz → alias bao nhiêu?
2. Sóng $700$ Hz lấy mẫu $1000$ Hz → alias bao nhiêu? An toàn không?

<details><summary>Đáp án</summary>

1. $\\text{round}(1200/1000) = 1$ → $f_{\\text{alias}} = |1200 - 1000| = 200$ Hz.
2. Nyquist $= 500$ Hz, $700 > 500$ → alias. $\\text{round}(0.7)=1$ → $|700-1000| = 300$ Hz. Không an toàn.
</details>

📝 **Tóm tắt mục 4**
- $f > f_s/2$ → tần số giả dạng $f_{\\text{alias}} = |f - f_s\\cdot\\text{round}(f/f_s)| < f_s/2$.
- 800 Hz @ 1000 Hz → 200 Hz; chứng minh bằng cả đại số lẫn bảng mẫu.
- Bánh xe quay ngược là aliasing trong phim.
- **Không sửa được sau khi lấy mẫu** → phải lọc chống alias TRƯỚC.

---

## 5. Lượng tử hóa (quantization)

> **💡 Trực giác.** Sau khi đã chọn *khi nào* lấy mẫu (sampling), vẫn còn câu hỏi: mỗi mẫu lưu bằng *con số chính xác tới đâu*? Máy chỉ có hữu hạn mức để biểu diễn → phải làm tròn biên độ về mức gần nhất. Giống cân điện tử chỉ hiện tới 0.1 kg: 63.27 kg → làm tròn thành 63.3 kg. Phần làm tròn bỏ đi là **sai số lượng tử**.

### 5.1 Định nghĩa (3 phần)

**(a) Là gì.** **Lượng tử hóa (quantization)** là việc làm tròn biên độ liên tục của mỗi mẫu về **một trong $L$ mức rời rạc** mà máy biểu diễn được. Với độ phân giải **$N$ bit**:

$$L = 2^N \\quad \\text{(số mức)}$$

Khoảng cách giữa hai mức kề nhau (bước lượng tử, *quantization step*) trên dải biên độ $V$:

$$\\Delta = \\frac{V}{2^N}$$

**(b) Vì sao cần.** Vì sampling mới rời rạc hóa *thời gian*; biên độ vẫn còn liên tục (vô hạn giá trị). Để lưu vào $N$ bit, biên độ cũng phải rời rạc hóa. Đây là bước thứ hai, độc lập với sampling, trong mọi ADC. (Liên hệ: máy biểu diễn số thực bằng số bit hữu hạn → xem [floating-point](../../../DataFoundations/01-NumberRepresentation/lesson-03-floating-point/).)

**(c) Ví dụ trực giác bằng số.** Dải $V = 2$ V, dùng $N = 3$ bit → $L = 2^3 = 8$ mức, bước $\\Delta = 2/8 = 0.25$ V. Một mẫu đo được $0.62$ V → làm tròn về mức gần nhất $0.75$ V (hoặc $0.50$ V tùy quy tắc) → sai số $\\approx 0.13$ V.

### 5.2 Sai số lượng tử & SNR

Sai số làm tròn lớn nhất là $\\pm \\Delta/2$. Coi sai số phân bố đều, **tỉ số tín hiệu trên nhiễu (Signal-to-Noise Ratio, SNR)** của bộ lượng tử $N$-bit xấp xỉ:

$$\\text{SNR} \\approx 6.02\\,N + 1.76 \\ \\text{(dB)}$$

Quy tắc nhớ nhanh: **mỗi bit thêm vào ≈ +6 dB SNR** (vì thêm 1 bit gấp đôi số mức → nửa bước → nửa sai số → +6.02 dB).

### 5.3 Bốn ví dụ số

| $N$ (bit) | $L = 2^N$ mức | SNR $\\approx 6.02N + 1.76$ dB | Dùng ở đâu |
|-----------|---------------|-------------------------------|------------|
| 8 | 256 | $\\approx 49.9$ dB | Audio cũ / điện thoại, có "rè" lượng tử |
| 12 | 4 096 | $\\approx 74$ dB | ADC vi điều khiển phổ thông |
| 16 | 65 536 | $\\approx 98$ dB | CD audio — vượt ngưỡng nghe |
| 24 | 16 777 216 | $\\approx 146$ dB | Studio thu âm chuyên nghiệp |

**Walk-through 8-bit vs 16-bit:**
- 8-bit: $L = 256$ mức. Trên dải $\\pm 1$ ($V = 2$): $\\Delta = 2/256 = 0.0078$ → bậc thang khá thô, nghe rõ nhiễu nền ở đoạn nhạc nhỏ tiếng.
- 16-bit: $L = 65\\,536$ mức, gấp $256$ lần → $\\Delta$ nhỏ hơn $256$ lần. SNR hơn 8-bit $\\approx 16-8 = 8$ bit $\\times 6.02 = 48.2$ dB. Đó là khác biệt giữa "nghe được nhiễu" và "im như tờ".

> **⚠ Lỗi thường gặp.** Đừng lẫn **lượng tử hóa** (rời rạc *biên độ*, lỗi do số bit) với **aliasing** (lỗi do tần số lấy mẫu *thời gian* quá thấp). Hai lỗi độc lập: bạn có thể lấy mẫu đủ nhanh (không alias) mà vẫn nhiễu nặng vì quá ít bit, và ngược lại.

> **❓ Câu hỏi tự nhiên.**
> - *"Thêm bit mãi có hết nhiễu không?"* — Về lý thuyết SNR tăng tuyến tính (+6 dB/bit), nhưng tới lúc nhiễu lượng tử thấp hơn nhiễu nhiệt của mạch thật thì thêm bit vô ích. Đó là lý do 24-bit là gần như trần thực dụng.
> - *"+1.76 dB ở đâu ra?"* — Từ giả định nhiễu phân bố đều và là sóng sin đầy thang; nó là hằng số hiệu chỉnh. Khi ước lượng nhanh, nhiều người bỏ qua, dùng gọn $\\text{SNR} \\approx 6N$ dB.

🔁 **Dừng lại tự kiểm tra.**
1. ADC 10-bit có bao nhiêu mức? SNR xấp xỉ?
2. Tăng từ 12-bit lên 16-bit thì SNR tăng thêm khoảng bao nhiêu dB?

<details><summary>Đáp án</summary>

1. $L = 2^{10} = 1024$ mức; SNR $\\approx 6.02 \\times 10 + 1.76 = 61.96$ dB.
2. Thêm 4 bit → $4 \\times 6.02 \\approx 24$ dB.
</details>

📝 **Tóm tắt mục 5**
- $N$ bit → $L = 2^N$ mức, bước $\\Delta = V/2^N$.
- SNR $\\approx 6.02N + 1.76$ dB; **+1 bit ≈ +6 dB**.
- Lượng tử hóa (biên độ) độc lập với aliasing (thời gian).

---

## 6. Tái tạo (reconstruction)

> **💡 Trực giác.** Có dãy mẫu rồi, làm sao "nối" lại thành sóng liên tục? Cách thô là **giữ mẫu (zero-order hold)** — vẽ mỗi mẫu thành một đoạn ngang cho tới mẫu kế (ra hình bậc thang). Cách đúng là làm "mượt" bậc thang đó bằng **lọc thông thấp**.

### 6.1 Hai bước tái tạo

1. **Giữ mẫu (zero-order hold)**: DAC xuất mỗi mẫu thành một mức điện áp giữ nguyên trong $T_s$ → tín hiệu bậc thang. Bậc thang này chứa sóng gốc + các bản sao tần số cao (do góc cạnh bậc thang).

2. **Lọc thông thấp (low-pass filter, LPF)**: bộ lọc giữ lại mọi tần số dưới $f_s/2$ và cắt bỏ các bản sao cao hơn → làm tròn bậc thang thành sóng mượt. Nếu Nyquist được tôn trọng, kết quả **trùng khớp tín hiệu gốc**.

### 6.2 Nội suy sinc (sinc interpolation) — sơ lược

Định lý Shannon cho công thức tái tạo **chính xác** (lý tưởng): mỗi mẫu được thay bằng một hàm $\\text{sinc}$ rồi cộng lại:

$$x(t) = \\sum_{n} x[n] \\cdot \\operatorname{sinc}\\!\\left(\\frac{t - nT_s}{T_s}\\right), \\qquad \\operatorname{sinc}(u) = \\frac{\\sin(\\pi u)}{\\pi u}$$

Mỗi hàm sinc bằng $1$ tại mẫu của nó và bằng $0$ tại mọi mẫu khác → tổng đi qua đúng các điểm mẫu, đồng thời "điền" phần giữa một cách duy nhất. Đây là LPF lý tưởng dưới dạng toán. Thực tế sinc dài vô hạn nên các DAC dùng xấp xỉ (giữ mẫu + LPF analog, hoặc oversampling + lọc số).

> **❓ Câu hỏi tự nhiên.** *"Vì sao bậc thang lại cần lọc? Nó đã đi qua đúng điểm mẫu rồi mà."* — Vì các góc vuông của bậc thang chứa tần số rất cao (về lý thuyết tới vô hạn). Những tần số đó không có trong tín hiệu gốc; LPF loại chúng để chỉ còn lại nội dung dưới $f_s/2$ = tín hiệu thật.

📝 **Tóm tắt mục 6**
- Tái tạo = giữ mẫu (bậc thang) → lọc thông thấp (mượt hóa).
- Sinc interpolation là công thức tái tạo *chính xác* của Shannon.
- Nếu Nyquist được tôn trọng, tái tạo trùng khớp tín hiệu gốc.

---

## 7. Ứng dụng thực tế

1. **Audio 44.1 kHz vs 48 kHz.** CD: 44.1 kHz (chừa lề trên $40$ kHz cho bộ lọc). Phim/video chuyên nghiệp: 48 kHz (chia chẵn với khung hình video, dễ đồng bộ). Cả hai đều thừa cho dải nghe 20 kHz.

2. **ADC (Analog-to-Digital Converter).** Mọi cảm biến số (micro, ECG, nhiệt kế số) đều: lấy mẫu ($f_s$) → lượng tử hóa ($N$ bit). Chọn $f_s$ và $N$ theo Nyquist + SNR yêu cầu. Xem chi tiết phần cứng: [Electronics ADC/DAC](../../../Electronics/03-Digital-MCU/lesson-05-adc-dac/).

3. **Bộ lọc chống alias (anti-aliasing filter).** Là một LPF **analog** đặt **trước** ADC, cắt mọi tần số trên $f_s/2$. Bắt buộc vì aliasing không sửa được sau khi lấy mẫu (§4). Đây là lý do "vì sao chống alias bằng lọc trước": ta loại nguồn gây alias *trước khi* nó kịp giả dạng.

4. **Oversampling.** Nhiều ADC/DAC hiện đại lấy mẫu ở $f_s$ cao hơn nhiều (vd 4×, 8×) để bộ lọc analog "thoải mái" hơn rồi lọc số xuống — đẩy gánh nặng từ phần cứng analog sang xử lý số rẻ hơn.

📝 **Tóm tắt mục 7**
- 44.1 kHz (CD) / 48 kHz (video) — đều vượt $2\\times 20$ kHz.
- ADC = sampling + quantization; chọn theo Nyquist + SNR.
- Anti-aliasing filter là LPF analog *trước* ADC — bắt buộc.

---

## Bài tập

1. **Chu kỳ & số mẫu.** Một micro lấy mẫu ở $f_s = 32\\,000$ Hz. (a) Tính $T_s$. (b) Một đoạn ghi 2.5 giây có bao nhiêu mẫu (mono)?

2. **Áp dụng Nyquist.** Một tín hiệu cảm biến rung có thành phần cao nhất $f_{\\max} = 7$ kHz. (a) Tốc độ lấy mẫu tối thiểu (lý thuyết)? (b) Nếu kỹ sư chọn $f_s = 12$ kHz thì có an toàn không, vì sao?

3. **Tính alias.** Lấy mẫu một sóng sin $1\\,300$ Hz ở $f_s = 1\\,000$ Hz. (a) Tần số Nyquist? (b) Tần số alias? (c) Người nghe sẽ nghe ra nốt gì?

4. **Wagon-wheel.** Camera quay $30$ khung/giây một bánh xe quay $32$ vòng/giây. Bánh xe trông như quay tới hay lui, ở tốc độ biểu kiến bao nhiêu vòng/giây?

5. **Lượng tử hóa & SNR.** Một ADC 14-bit, dải $V = 3.3$ V. (a) Số mức $L$? (b) Bước lượng tử $\\Delta$? (c) SNR xấp xỉ? (d) So với 10-bit, SNR hơn bao nhiêu dB?

6. **Tổng hợp thiết kế.** Bạn cần số hóa tín hiệu giọng nói ($f_{\\max} = 3.4$ kHz) yêu cầu SNR ≥ 70 dB. (a) Chọn $f_s$ hợp lý. (b) Chọn số bit $N$ tối thiểu. (c) Tính dung lượng (byte) cho 1 phút mono.

---

## Lời giải chi tiết

### Bài 1
(a) $T_s = 1/f_s = 1/32\\,000 = 3.125 \\times 10^{-5}$ s $= 31.25\\ \\mu s$.
(b) Số mẫu $= f_s \\times t = 32\\,000 \\times 2.5 = 80\\,000$ mẫu.

### Bài 2
(a) Nyquist rate $= 2 f_{\\max} = 14$ kHz → cần $f_s > 14$ kHz (lý thuyết).
(b) $f_s = 12$ kHz **không an toàn**: $12 < 14$ → vi phạm $f_s > 2f_{\\max}$. Tần số Nyquist $= 6$ kHz, mà tín hiệu có tới 7 kHz $> 6$ kHz → thành phần 7 kHz sẽ alias xuống $|7 - 12| = 5$ kHz, gây méo. Phải hoặc tăng $f_s > 14$ kHz, hoặc lọc bỏ phần trên 6 kHz trước khi lấy mẫu.

### Bài 3
(a) Tần số Nyquist $= f_s/2 = 500$ Hz.
(b) $\\text{round}(1300/1000) = 1$ → $f_{\\text{alias}} = |1300 - 1000 \\times 1| = 300$ Hz.
(c) Vì $1300 > 500$ → tín hiệu 1300 Hz giả dạng thành **300 Hz**; người nghe nghe ra một nốt 300 Hz (thấp hơn hẳn, sai hoàn toàn).

### Bài 4
Nyquist của camera $= 30/2 = 15$ vòng/giây. Bánh xe $32$ vòng/giây $> 15$ → alias.
$\\text{round}(32/30) = 1$ → tốc độ biểu kiến $= 32 - 30 \\times 1 = +2$ vòng/giây.
Dấu dương nhỏ → bánh xe trông như quay **tới** rất chậm, $2$ vòng/giây (thay vì 32). Nếu tốc độ thật là $28$ vòng/giây thì $28 - 30 = -2$ → trông như quay **ngược** 2 vòng/giây (hiệu ứng kinh điển).

### Bài 5
(a) $L = 2^{14} = 16\\,384$ mức.
(b) $\\Delta = V/2^N = 3.3 / 16\\,384 \\approx 2.014 \\times 10^{-4}$ V $\\approx 0.20$ mV.
(c) SNR $\\approx 6.02 \\times 14 + 1.76 = 84.28 + 1.76 = 86.04$ dB.
(d) Chênh $14 - 10 = 4$ bit $\\to 4 \\times 6.02 = 24.08$ dB cao hơn 10-bit.

### Bài 6
(a) $f_{\\max} = 3.4$ kHz → cần $f_s > 6.8$ kHz. Chọn $f_s = 8$ kHz (chuẩn telephony, chừa lề cho bộ lọc).
(b) Cần SNR ≥ 70 dB. Từ $6.02N + 1.76 \\geq 70 \\Rightarrow N \\geq (70 - 1.76)/6.02 = 11.33 \\Rightarrow N = 12$ bit. (Thường làm tròn lên byte → 16-bit nếu muốn an toàn; tối thiểu lý thuyết là 12-bit.)
(c) Với $N = 12$ bit $= 1.5$ byte/mẫu, $f_s = 8$ kHz: mỗi giây $8\\,000 \\times 1.5 = 12\\,000$ byte. 1 phút $= 12\\,000 \\times 60 = 720\\,000$ byte $\\approx 703$ KB. (Nếu dùng 16-bit = 2 byte/mẫu: $8\\,000 \\times 2 \\times 60 = 960\\,000$ byte $\\approx 938$ KB.)

---

## Tham khảo & Bài tiếp theo

- **Tiền đề:** [L01 — Tín hiệu cơ bản](../lesson-01-signals-basics/) · [Electronics ADC/DAC](../../../Electronics/03-Digital-MCU/lesson-05-adc-dac/) · [Floating-point](../../../DataFoundations/01-NumberRepresentation/lesson-03-floating-point/)
- **Bài tiếp theo:** [L03 — Tổng hợp sóng (wave superposition)](../lesson-03-wave-superposition/) — cộng nhiều sóng sin, mở đường tới chuỗi/biến đổi Fourier.
- **Minh họa tương tác:** [visualization.html](./visualization.html) — demo lấy mẫu + aliasing, bánh xe quay, và lượng tử hóa.
`;
