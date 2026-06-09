# Lesson 03: Time Series cơ bản

> **Tầng 3 — Advanced · Statistics**

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Định nghĩa được time series và giải thích tại sao nó cần kỹ thuật riêng (không thể dùng i.i.d. assumptions).
2. Phân tách một time series thành **trend, seasonality, cyclical, noise** — biết công thức additive và multiplicative.
3. Kiểm tra **stationarity** (tính dừng yếu) và hiểu tại sao ARIMA cần series phải dừng.
4. Đọc và diễn giải **ACF (Autocorrelation Function)** và **PACF (Partial Autocorrelation Function)**.
5. Phân biệt cấu trúc **AR(p), MA(q), ARMA(p,q), ARIMA(p,d,q)** — định nghĩa và nhận dạng.

## Kiến thức tiền đề

- Tầng 1: [mean, variance, covariance, correlation](../../01-Descriptive/README.md).
- Tầng 2: [hypothesis testing](../../02-Inferential/lesson-03-hypothesis-testing-1sample/README.md) — cần cho kiểm định stationarity.
- [Tầng 3 Lesson 01: Bayesian Statistics](../lesson-01-bayesian-stats/README.md), [Lesson 02: Causal Inference](../lesson-02-causal-inference/README.md).

---

## 1. Time series là gì và vì sao đặc biệt?

> 💡 **Trực giác**: Dữ liệu thông thường giống những hạt đậu rời — có thể xáo trộn thứ tự mà không mất thông tin. Dữ liệu time series giống một câu chuyện — thứ tự quan trọng, điều xảy ra hôm qua ảnh hưởng hôm nay.

### 1.1. Định nghĩa

**Time series** là tập hợp các quan sát $\{y_1, y_2, \ldots, y_T\}$ được thu thập **theo thứ tự thời gian** với khoảng cách đều nhau (ngày, tuần, tháng, quý, năm...).

**Ví dụ thực tế**:
- Giá cổ phiếu VNM theo ngày (T=252 ngày giao dịch/năm)
- Doanh thu tháng của Shopee (T=12/năm)
- Nhiệt độ Hà Nội theo giờ (T=8760/năm)
- GDP Việt Nam theo quý (T=4/năm)
- Tim đập theo giây (T=60-100/phút)

### 1.2. Vì sao cần kỹ thuật riêng?

Thống kê cổ điển giả định các quan sát **độc lập và cùng phân phối (i.i.d.)**. Time series vi phạm assumption này:

- **Phụ thuộc thời gian**: Doanh thu tháng 12 phụ thuộc vào tháng 11 và các tháng trước.
- **Seasonal patterns**: Bán áo len cao vào mùa đông mỗi năm.
- **Trend**: GDP dài hạn tăng theo thời gian.
- **Non-stationarity**: Mean và variance thay đổi theo thời gian.

Nếu bỏ qua cấu trúc này và dùng hồi quy thông thường → sai số chuẩn bị ước lượng sai, kết luận thống kê không tin cậy.

> ❓ **Câu hỏi tự nhiên**:
>
> **Q: Có thể sort lại time series không?**
> A: Không. Thứ tự là thông tin quan trọng nhất. Autocorrelation (tương quan giữa $y_t$ và $y_{t-k}$) sẽ biến mất nếu sort lại.
>
> **Q: Cross-sectional data và time series khác nhau thế nào?**
> A: Cross-sectional: quan sát nhiều đơn vị tại một thời điểm (lương của 1000 người năm 2024). Time series: quan sát một đơn vị qua nhiều thời điểm (GDP Việt Nam từ 1990–2024). Panel data = cả hai.

---

## 2. Thành phần của Time Series

### 2.1. Bốn thành phần

Mọi time series có thể được phân tách thành 4 thành phần:

**1. Trend (T)** — Xu hướng dài hạn, tăng hoặc giảm dần theo thời gian.
- Ví dụ: GDP Việt Nam tăng ~6%/năm trong dài hạn.
- Biểu hiện: đường hồi quy tuyến tính hoặc đa thức phù hợp với toàn chuỗi.

**2. Seasonality (S)** — Biến động theo chu kỳ CỐ ĐỊNH (thường dưới 1 năm).
- Ví dụ: Bán áo len tăng tháng 11-12, doanh thu bán lẻ tăng cuối năm.
- Chu kỳ: tuần (s=7), tháng (s=12), quý (s=4).
- Khác với cyclical: seasonal có chu kỳ cố định và biên độ tương đối ổn định.

**3. Cyclical (C)** — Biến động chu kỳ KHÔNG CỐ ĐỊNH, thường dài hạn.
- Ví dụ: Chu kỳ kinh tế (recession ↔ expansion, ~7-10 năm).
- Khó phân biệt với trend trong dữ liệu ngắn hạn.

**4. Noise/Residual (ε)** — Biến động ngẫu nhiên không thể giải thích.
- Ví dụ: Sự kiện bất ngờ, sai số đo lường.
- Lý tưởng: white noise (i.i.d., mean 0, variance $\sigma^2$).

### 2.2. Mô hình Additive và Multiplicative

**Additive model** (dùng khi biên độ seasonal không tăng theo trend):

$$y_t = T_t + S_t + C_t + \varepsilon_t$$

**Multiplicative model** (dùng khi biên độ seasonal tăng cùng với trend):

$$y_t = T_t \times S_t \times C_t \times \varepsilon_t$$

Logarithm hóa multiplicative model → additive: $\log(y_t) = \log(T_t) + \log(S_t) + \ldots$

**Cách chọn**:
- Vẽ series: nếu dao động seasonal lớn dần → multiplicative.
- Doanh thu tăng trưởng thường multiplicative; nhiệt độ thường additive.

**Walk-through ví dụ additive**:

Doanh thu cà phê theo quý (đơn vị: tỷ đồng):

| Năm | Q1 | Q2 | Q3 | Q4 |
|-----|:---:|:---:|:---:|:---:|
| 2021 | 10 | 12 | 8 | 15 |
| 2022 | 12 | 14 | 10 | 17 |
| 2023 | 14 | 16 | 12 | 19 |

Trend $T$ = tăng ~2/năm ≈ 0.5/quý. Seasonal factors $S$: Q1 = -2, Q2 = 0, Q3 = -4, Q4 = +5 (tính bằng trung bình deviation khỏi trend). Ví dụ 2022-Q3: $T \approx 12{,}5$, $S_{Q3} = -4 \to y_{\text{pred}} = 12{,}5 - 4 = 8{,}5 \approx$ thực tế 10.

> ⚠ **Lỗi thường gặp**: Chọn multiplicative cho mọi loại data. Nếu series có giá trị âm hoặc gần 0, multiplicative không dùng được (log không xác định). Với series có variance ổn định → additive.

### 2.3. Classical Decomposition

Thuật toán phân tách cổ điển (moving average method):

**Bước 1**: Ước lượng Trend bằng **moving average** bậc $s$ (= độ dài chu kỳ seasonal):
- $s$ lẻ: $T_t = \dfrac{y_{t-(s-1)/2} + \cdots + y_t + \cdots + y_{t+(s-1)/2}}{s}$
- $s$ chẵn ($s=4$ quý): dùng "2×4-MA" (trung bình hai MA-4 liên tiếp) để tránh lệch tâm.

**Bước 2**: Tính $y_t - T_t$ (additive) hoặc $y_t / T_t$ (multiplicative).

**Bước 3**: Seasonal factor $S_m$ cho tháng/quý $m$ = trung bình của tất cả $y_t - T_t$ tại cùng tháng $m$, chuẩn hóa sao cho tổng = 0.

**Bước 4**: Residual $\varepsilon_t = y_t - T_t - S_t$.

> 📝 **Tóm tắt mục 2**:
> - Time series = Trend + Seasonality + Cyclical + Noise.
> - Additive: biên độ seasonal ổn định. Multiplicative: biên độ tăng theo trend.
> - Decomposition giúp tách biệt cấu trúc để phân tích và dự báo từng thành phần.

---

## 3. Stationarity — Tính dừng

### 3.1. Định nghĩa

> 💡 **Trực giác**: Một series dừng giống như sóng biển — đặc tính thống kê (mean, variance, autocorrelation) không thay đổi theo thời gian. Một series không dừng giống như giá nhà đất — mean tăng dần, variance mở rộng.

**Weak (Covariance) Stationarity**: Series {y_t} là yếu dừng (weakly stationary) nếu:

1. **Mean không đổi theo thời gian**: $E[y_t] = \mu$ (hằng số với mọi $t$)
2. **Variance hữu hạn và không đổi**: $\text{Var}(y_t) = \sigma^2 < \infty$
3. **Autocovariance chỉ phụ thuộc lag**: $\text{Cov}(y_t, y_{t+k}) = \gamma(k)$ — không phụ thuộc vào $t$, chỉ phụ thuộc khoảng cách $k$.

**Strong stationarity**: Toàn bộ joint distribution không đổi theo thời gian. Yếu hơn và thực tế hơn để kiểm tra.

### 3.2. Tại sao ARIMA cần stationarity?

ARIMA (và hầu hết mô hình time series) giả định rằng các tham số (trung bình, phương sai, autocovariance) không đổi theo thời gian. Nếu series không dừng, ước lượng tham số sẽ không nhất quán và dự báo sẽ không tin cậy.

**Spurious regression**: Hồi quy hai series không dừng (ví dụ GDP và dân số) thường cho R² cao và p-value thấp, nhưng đó chỉ là tương quan giả do cả hai đều có trend, không phải quan hệ nhân quả.

### 3.3. Ví dụ stationarity vs non-stationarity

**Non-stationary (Random Walk)**:

$$y_t = y_{t-1} + \varepsilon_t \quad (\varepsilon_t \sim \text{i.i.d. } N(0, \sigma^2))$$

- Mean: $E[y_t] = y_0$ (OK)
- Variance: $\text{Var}(y_t) = t \times \sigma^2 \to$ tăng theo thời gian (VI PHẠM!)
- Ví dụ: Giá cổ phiếu, tỷ giá hối đoái.

**Non-stationary (Trend)**:

$$y_t = \alpha + \beta \times t + \varepsilon_t \quad (\varepsilon_t \sim \text{i.i.d.})$$

- Mean: $E[y_t] = \alpha + \beta \times t \to$ thay đổi theo $t$ (VI PHẠM!)

**Stationary (AR(1) với $|\varphi| < 1$)**:

$$y_t = \varphi \times y_{t-1} + \varepsilon_t \quad (|\varphi| < 1)$$

- Mean: $E[y_t] = 0$
- $\text{Var}(y_t) = \dfrac{\sigma^2}{1-\varphi^2} = $ hằng số (OK)

### 3.4. Cách tạo stationarity: Differencing

Lấy **sai phân bậc 1 (first difference)**:

$$\nabla y_t = y_t - y_{t-1}$$

Ví dụ: Random walk $y_t = y_{t-1} + \varepsilon_t \to \nabla y_t = \varepsilon_t \to$ đây là white noise, tức là stationary.

**Seasonal differencing (bậc s)**:

$$\nabla_s y_t = y_t - y_{t-s}$$

Ví dụ với $s=12$ (monthly): loại bỏ seasonality hằng năm.

**Ví dụ walk-through**: Series giá nhà (tỷ đồng):

$$\begin{aligned}
y &= [100, 105, 108, 112, 119, 125, 130, \ldots] \\
\nabla y &= [5, 3, 4, 7, 6, 5, \ldots]
\end{aligned}$$

Series gốc tăng dần (non-stationary). Sau sai phân: các giá trị dao động quanh 5 (mean ổn định hơn) → gần stationary hơn.

**$d$ trong ARIMA$(p,d,q)$** = số lần lấy sai phân cần thiết để đạt stationarity.

> ⚠ **Lỗi thường gặp**: Overdifferencing. Lấy sai phân nhiều hơn cần thiết (d=2 khi d=1 đã đủ) → thêm MA component, mô hình phức tạp hơn không cần thiết. Luôn kiểm tra ADF test sau mỗi lần differencing.

> 🔁 **Dừng lại tự kiểm tra**:
> 1. Series y = [2, 4, 6, 8, 10, 12] — có stationary không? Sau first difference là gì?
> <details><summary>Đáp án</summary>
> Không stationary: $E[y_t] = 2t$ (tăng theo $t$). First difference: $\nabla y = [2, 2, 2, 2, 2]$ — hoàn toàn constant → stationary (variance = 0, special case). Đây là perfect linear trend, $d=1$ đủ.
> </details>

> 📝 **Tóm tắt mục 3**:
> - Stationarity yếu: mean, variance, autocovariance không đổi theo thời gian.
> - Random walk, trend → non-stationary.
> - Differencing là biến đổi phổ biến nhất để đạt stationarity.

---

## 4. White Noise và Autocorrelation

### 4.1. White Noise

**White noise** là chuỗi $\{\varepsilon_t\}$ thỏa:
1. $E[\varepsilon_t] = 0$
2. $\text{Var}(\varepsilon_t) = \sigma^2$ (hằng số)
3. $\text{Cov}(\varepsilon_t, \varepsilon_s) = 0$ với $t \neq s$ (không tự tương quan)

White noise là stationary và là "residual lý tưởng" của mô hình time series — nếu residuals không phải white noise, mô hình chưa nắm bắt hết cấu trúc.

### 4.2. Autocorrelation Function (ACF)

**Autocorrelation tại lag k**:

$$\rho(k) = \dfrac{\text{Cov}(y_t, y_{t-k})}{\text{Var}(y_t)} = \dfrac{\gamma(k)}{\gamma(0)}$$

**Ý nghĩa thực tế**: $\rho(1)$ là tương quan giữa $y_t$ và $y_{t-1}$ (giá trị liền trước). $\rho(12)$ là tương quan giữa $y_t$ và $y_{t-12}$ (cùng tháng năm trước).

**Giá trị mẫu (sample ACF)**:

$$r_k = \dfrac{\sum_{t=k+1}^{T} (y_t - \bar{y})(y_{t-k} - \bar{y})}{\sum_{t=1}^{T} (y_t - \bar{y})^2}$$

**Ví dụ walk-through**:

Series nhiệt độ 5 ngày: $y = [25, 27, 26, 28, 29]$.
- $\bar{y} = 27$.
- Autocovariance lag 1:

$$\begin{aligned}
&\dfrac{(25-27)(27-27) + (27-27)(26-27) + (26-27)(28-27) + (28-27)(29-27)}{4} \\
&= \dfrac{(-2)(0) + (0)(-1) + (-1)(1) + (1)(2)}{4} = \dfrac{0 + 0 - 1 + 2}{4} = \dfrac{1}{4} = 0{,}25
\end{aligned}$$

- Variance: $\dfrac{(-2)^2+(0)^2+(-1)^2+(1)^2+(2)^2}{5} = \dfrac{4+0+1+1+4}{5} = 2{,}0$
- $r_1 = \dfrac{0{,}25}{2{,}0} = 0{,}125$.

**Giải thích biểu đồ ACF**: Vạch nằm ngang ở $\pm 1{,}96/\sqrt{T}$ là ngưỡng có ý nghĩa thống kê (95% CI cho white noise). Spike vượt ngưỡng → autocorrelation đáng kể tại lag đó.

**Pattern ACF cho từng mô hình**:
- White noise: mọi lag đều trong ngưỡng.
- AR(1): ACF giảm dần (exponential decay) — ảnh hưởng của quá khứ suy yếu dần.
- MA(1): Chỉ lag 1 vượt ngưỡng, các lag khác = 0 (cutoff).
- Random walk: ACF cao và giảm rất chậm → dấu hiệu non-stationarity.
- Seasonal: Spike tại các lag là bội số của s (s, 2s, 3s...).

### 4.3. Partial Autocorrelation Function (PACF)

**PACF tại lag k**: tương quan giữa $y_t$ và $y_{t-k}$ **sau khi loại bỏ ảnh hưởng trung gian** của $y_{t-1}, \ldots, y_{t-k+1}$.

Tương tự "partial correlation" trong multiple regression: PACF(2) = correlation giữa $y_t$ và $y_{t-2}$ khi đã kiểm soát $y_{t-1}$.

**Pattern PACF**:
- AR(p): PACF cutoff sau lag p (chỉ lag 1...p có ý nghĩa, các lag sau = 0).
- MA(q): PACF giảm dần (không cutoff).
- AR(1): ACF giảm exponentially; PACF có spike tại lag 1 rồi về 0.
- MA(1): ACF spike tại lag 1; PACF giảm exponentially.

**Bảng quy tắc nhận dạng (dùng sau khi đã differencing)**:

| Mô hình | ACF | PACF |
|---------|-----|------|
| AR(p) | Giảm dần | Cutoff sau lag p |
| MA(q) | Cutoff sau lag q | Giảm dần |
| ARMA(p,q) | Giảm dần | Giảm dần |
| White noise | Tất cả trong ngưỡng | Tất cả trong ngưỡng |

> ❓ **Câu hỏi tự nhiên**:
>
> **Q: ACF và PACF của white noise có giống nhau không?**
> A: Về kỳ vọng thì cả hai đều = 0 tại mọi lag. Trong mẫu hữu hạn, sẽ có một số spike nhỏ ngẫu nhiên — khoảng 5% spike sẽ vượt ngưỡng 95% CI ngay cả với true white noise. Đây là lý do nhìn "pattern tổng thể" chứ không chỉ đếm spike riêng lẻ.

---

## 5. AR, MA, ARMA, ARIMA — Giới thiệu

### 5.1. AR(p) — Autoregressive model bậc p

> 💡 **Trực giác**: "Giá trị hôm nay phụ thuộc vào p ngày trước đó cộng noise."

$$y_t = c + \varphi_1 y_{t-1} + \varphi_2 y_{t-2} + \cdots + \varphi_p y_{t-p} + \varepsilon_t$$

Trong đó: $c$ = hằng số, $\varphi_1 \ldots \varphi_p$ = hệ số AR, $\varepsilon_t \sim$ white noise.

**AR(1) stationary khi $|\varphi_1| < 1$**. Nếu $\varphi_1 = 1 \to$ random walk (non-stationary).

**Ví dụ AR(1) với $\varphi_1 = 0{,}8$**:

$$\begin{aligned}
y_1 &= 10 \\
y_2 &= 0{,}8 \times 10 + \varepsilon_2 = 8 + \varepsilon_2 \\
y_3 &= 0{,}8 \times y_2 + \varepsilon_3 \\
&\ldots
\end{aligned}$$

Chuỗi "nhớ" giá trị trước đó nhưng ảnh hưởng suy giảm theo thời gian ($0{,}8^k \to 0$).

### 5.2. MA(q) — Moving Average model bậc q

> 💡 **Trực giác**: "Giá trị hôm nay = mean + tổng có trọng số của q cú shock ngẫu nhiên gần nhất."

$$y_t = c + \varepsilon_t + \theta_1 \varepsilon_{t-1} + \theta_2 \varepsilon_{t-2} + \cdots + \theta_q \varepsilon_{t-q}$$

MA(q) luôn stationary (với mọi $\theta$). Ảnh hưởng của shock tắt hoàn toàn sau $q$ bước.

**Ví dụ MA(1) với $\theta_1 = 0{,}5$**:

$$y_t = \varepsilon_t + 0{,}5\,\varepsilon_{t-1}$$

Một cú shock $\varepsilon_t$ ảnh hưởng $y_t$ (hệ số 1) và $y_{t+1}$ (hệ số $0{,}5$), sau đó không ảnh hưởng nữa.

### 5.3. ARMA(p, q)

Kết hợp AR(p) và MA(q):

$$y_t = c + \varphi_1 y_{t-1} + \cdots + \varphi_p y_{t-p} + \varepsilon_t + \theta_1 \varepsilon_{t-1} + \cdots + \theta_q \varepsilon_{t-q}$$

Thường dùng khi ACF lẫn PACF đều giảm dần (không cutoff rõ ràng ở bên nào).

### 5.4. ARIMA(p, d, q)

**I = Integrated**: Thêm bước differencing bậc $d$ để đạt stationarity.

ARIMA$(p, d, q)$:
- Bước 1: Lấy sai phân $d$ lần → $w_t = \nabla^d y_t$ (chuỗi mới)
- Bước 2: Fit ARMA$(p, q)$ cho $w_t$

**Ví dụ diễn giải ARIMA(1,1,1)**:
- $d=1$: Lấy sai phân bậc 1: $w_t = y_t - y_{t-1}$
- $p=1, q=1$: Fit AR(1) MA(1) cho $w_t$

**Seasonal ARIMA: SARIMA$(p,d,q)(P,D,Q)_s$**:
Thêm seasonal components $P, D, Q$ tại lag bội số của $s$.

### 5.5. Quy trình Box-Jenkins

1. **Identification**: Kiểm tra stationarity (ADF test), xác định d, xem ACF/PACF để guess p và q.
2. **Estimation**: Ước lượng tham số bằng MLE hoặc OLS.
3. **Diagnostic checking**: Kiểm tra residuals có phải white noise không (Ljung-Box test, ACF/PACF của residuals).
4. **Forecasting**: Dự báo h bước tiếp theo với prediction interval.

**Chọn p, q bằng AIC/BIC**: Thực tế ít dùng "đọc ACF/PACF" mà dùng AIC (Akaike Information Criterion) để so sánh nhiều mô hình:
$$\begin{aligned}
\text{AIC} &= -2 \times \log(L) + 2k \qquad (k = \text{số tham số}) \\
\text{BIC} &= -2 \times \log(L) + k \times \log(T)
\end{aligned}$$

Chọn mô hình có AIC/BIC nhỏ nhất. BIC phạt nặng hơn số tham số → mô hình đơn giản hơn.

> ⚠ **Lỗi thường gặp**: Fit ARIMA mà không kiểm tra stationarity trước. Fit trực tiếp lên series có trend → tham số ước lượng vô nghĩa. Luôn: plot series → kiểm tra stationarity → difference nếu cần → fit ARMA → check residuals.

> 📝 **Tóm tắt mục 5**:
> - AR(p): "nhớ p ngày trước" → ACF decay, PACF cutoff tại p.
> - MA(q): "q cú shock gần nhất" → ACF cutoff tại q, PACF decay.
> - ARIMA(p,d,q): differencing d lần rồi ARMA(p,q).
> - Quy trình Box-Jenkins: identify → estimate → diagnose → forecast.

---

## 6. Forecasting cơ bản

### 6.1. Các phương pháp đơn giản

Trước khi dùng ARIMA, các baseline models:

**Naive method**: Dự báo bằng giá trị cuối cùng:

$$\hat{y}_{T+h} = y_T$$

Hợp lý với random walk. Prediction interval tăng theo $h$.

**Seasonal naive**: Dự báo = giá trị cùng kỳ năm trước:

$$\hat{y}_{T+h} = y_{T+h-s}$$

Đơn giản nhưng hiệu quả tốt cho seasonal data.

**Exponential Smoothing (SES)**:

$$\hat{y}_{t+1} = \alpha \times y_t + (1-\alpha) \times \hat{y}_t \qquad (0 < \alpha < 1)$$

$\alpha$ lớn → trọng số nhiều vào data gần nhất. $\alpha$ nhỏ → làm mượt nhiều hơn, ít nhạy cảm với dao động.

### 6.2. Prediction interval

Mọi dự báo phải có khoảng dự báo, không chỉ là điểm:

**95% prediction interval cho h bước**:

$$\hat{y}_{T+h} \pm 1{,}96 \times \sigma_h$$

Trong đó $\sigma_h$ là ước lượng độ lệch chuẩn của forecast error $h$ bước. Với AR(1): $\sigma_h$ tăng dần khi $h$ tăng → khoảng mở rộng.

**Ví dụ walk-through SES**:

Doanh thu (tỷ): $y = [10, 12, 11, 13, 14]$. $\alpha = 0{,}3$.

$$\begin{aligned}
\hat{y}_2 &= 10 \quad \text{(khởi tạo bằng } y_1) \\
\hat{y}_3 &= 0{,}3 \times 12 + 0{,}7 \times 10 = 3{,}6 + 7 = 10{,}6 \\
\hat{y}_4 &= 0{,}3 \times 11 + 0{,}7 \times 10{,}6 = 3{,}3 + 7{,}42 = 10{,}72 \\
\hat{y}_5 &= 0{,}3 \times 13 + 0{,}7 \times 10{,}72 = 3{,}9 + 7{,}504 = 11{,}4 \\
\hat{y}_6 &= 0{,}3 \times 14 + 0{,}7 \times 11{,}4 = 4{,}2 + 7{,}98 = \mathbf{12{,}18} \quad \text{(forecast tháng 6)}
\end{aligned}$$

> ❓ **Câu hỏi tự nhiên**:
>
> **Q: ARIMA hay ML (LSTM, Prophet) cho time series?**
> A: Phụ thuộc. ARIMA hiểu được, giải thích được, tốt với chuỗi ngắn/trung bình, ổn định. LSTM/Prophet tốt hơn khi có nhiều biến ngoại sinh, pattern phi tuyến, hoặc dữ liệu rất nhiều. Prophet (Facebook) đặc biệt tốt cho seasonal data với holiday effects. Bắt đầu với ARIMA làm baseline, rồi so sánh ML nếu cần.
>
> **Q: Dự báo bao xa là tin cậy?**
> A: Không có quy tắc tuyệt đối. Thường: dự báo h = 1 seasonal period (s bước) là reasonable. Prediction interval mở rộng nhanh với h → dự báo dài hạn rất bất định. Với ARIMA(p,d,0), forecast dài hạn hội tụ về mean; với ARIMA(p,1,q), hội tụ về trend.

---

## Bài tập

1. **Phân loại thành phần**: Xác định thành phần dominant trong mỗi chuỗi sau: (a) Số du khách quốc tế đến Việt Nam theo tháng 2015–2023. (b) Giá Bitcoin theo ngày 2020–2024. (c) Chỉ số PMI theo tháng 2010–2023. (d) Số ca COVID-19 theo ngày tháng 3–6/2021.

2. **First difference**: Series: y = [3, 7, 5, 9, 8, 11, 10]. Tính ∇y. Series gốc và ∇y cái nào stationary hơn và vì sao?

3. **ACF tay**: Series $y = [1, 3, 2, 4, 3, 5]$. Tính $\bar{y}$ và $r_1$ (ACF lag 1) thủ công.

4. **Nhận dạng mô hình**: Dựa vào ACF/PACF, xác định mô hình ARMA phù hợp cho mỗi trường hợp: (a) ACF: spike tại lag 1,2 rồi về 0; PACF: giảm dần. (b) ACF: giảm dần theo kiểu sin damped; PACF: spike tại lag 1 rồi về 0. (c) Cả ACF và PACF đều giảm dần.

---

## Lời giải chi tiết

### Bài 1

**(a) Số du khách quốc tế**: **Trend** (tăng dần theo năm) + **Seasonality mạnh** (cao vào mùa hè: tháng 7-8; tháng 12-1 cho du lịch Tết/Giáng sinh). Sau COVID-19 sẽ có structural break.

**(b) Giá Bitcoin**: **Trend** (có các chu kỳ bull/bear market ~4 năm liên quan đến halving) + **Noise rất lớn** (daily volatility 5-15%). Seasonality yếu. Gần với random walk trong ngắn hạn.

**(c) PMI**: Chủ yếu là **Cyclical** (chu kỳ kinh tế) + **Noise**. PMI xoay quanh 50 (expansion/contraction). Seasonality nhẹ (sản xuất thường giảm tháng 1-2 dịp Tết tại Á).

**(d) Ca COVID tháng 3-6/2021**: Chủ yếu là **Trend** (bùng phát theo hàm mũ, sau đó giảm khi giãn cách) + **Weekly seasonality** (ca ít hơn cuối tuần do ít xét nghiệm). Không có long-term seasonal do đây là sự kiện one-off.

### Bài 2

Series: $y = [3, 7, 5, 9, 8, 11, 10]$.

$\nabla y = [7-3, 5-7, 9-5, 8-9, 11-8, 10-11] = \mathbf{[4, -2, 4, -1, 3, -1]}$.

**So sánh**:
- $y$: range 3–11, tăng dần về cuối → có trend → non-stationary. Mean $\approx 7{,}57$ nhưng đầu thấp, cuối cao.
- $\nabla y$: range -2 đến 4, dao động quanh mean $\approx \dfrac{4-2+4-1+3-1}{6} = \dfrac{7}{6} \approx 1{,}17$. Variance ổn định hơn. Gần stationary hơn (mặc dù $n=6$ quá nhỏ để kiểm định chính thức).

$\nabla y$ stationary hơn $y$. Với $d=1$ ta loại được phần trend tuyến tính.

### Bài 3

$y = [1, 3, 2, 4, 3, 5]$. $T = 6$.

$\bar{y} = \dfrac{1+3+2+4+3+5}{6} = \dfrac{18}{6} = \mathbf{3}$.

Tính $r_1$:
- Tử số $= \dfrac{\sum_{t=2}^{6} (y_t - \bar{y})(y_{t-1} - \bar{y})}{T}$:
  - $t=2$: $(3-3)(1-3) = (0)(-2) = 0$
  - $t=3$: $(2-3)(3-3) = (-1)(0) = 0$
  - $t=4$: $(4-3)(2-3) = (1)(-1) = -1$
  - $t=5$: $(3-3)(4-3) = (0)(1) = 0$
  - $t=6$: $(5-3)(3-3) = (2)(0) = 0$
  - Tổng $= -1$. Chia $T=6$: $-1/6 \approx -0{,}167$
- Mẫu số $= \text{Var}(y) = \dfrac{(1-3)^2+(3-3)^2+(2-3)^2+(4-3)^2+(3-3)^2+(5-3)^2}{6} = \dfrac{4+0+1+1+0+4}{6} = \dfrac{10}{6} \approx 1{,}667$
- $r_1 = \dfrac{-1/6}{10/6} = \mathbf{-0{,}1}$

ACF lag 1 $\approx -0{,}1$ — gần 0, không có autocorrelation đáng kể. Series này không có cấu trúc AR mạnh (mặc dù $n=6$ rất nhỏ).

### Bài 4

**(a) ACF cutoff sau lag 2, PACF decay**: Đây là đặc trưng của **MA(2)**. ACF của MA(q) cutoff sau lag q; PACF giảm dần.

**(b) ACF decay exponentially, PACF spike lag 1 rồi về 0**: Đây là **AR(1)**. ACF của AR(1) giảm theo kiểu $\varphi^k$; PACF cutoff sau lag 1.

**(c) Cả ACF lẫn PACF đều decay**: Đây là **ARMA(p,q)** với cả p,q ≥ 1. Không thể xác định p, q chính xác chỉ từ pattern — cần dùng AIC/BIC để so sánh.

---

## Bài tiếp theo / Kết thúc

<span>Kết thúc Statistics — Tầng 3 Advanced</span>

Bạn đã hoàn thành toàn bộ lộ trình Statistics (3 tầng, 18 bài). Hướng áp dụng tiếp theo:

- **[AI/ML](../../../AI-ML/)**: Time series + Bayesian inference là nền tảng của nhiều mô hình ML (HMM, Gaussian process, Bayesian neural nets).
- **[Economics/](../../../Economics/)**: Econometrics mở rộng OLS và ARIMA cho panel data, IV regression, diff-in-diff.
- Thực hành: Python (`statsmodels`, `pmdarima`, `prophet`), R (`forecast` package).

---

## Tham khảo

- Hyndman, R. & Athanasopoulos, G. — *Forecasting: Principles and Practice* (3rd ed.) — miễn phí online tại [otexts.com/fpp3](https://otexts.com/fpp3/).
- Box, G.E.P. & Jenkins, G.M. — *Time Series Analysis: Forecasting and Control* — sách gốc của Box-Jenkins method.
- Shumway, R. & Stoffer, D. — *Time Series Analysis and Its Applications* — miễn phí online.
- [statsmodels TSA docs](https://www.statsmodels.org/stable/tsa.html) — Python implementation.
