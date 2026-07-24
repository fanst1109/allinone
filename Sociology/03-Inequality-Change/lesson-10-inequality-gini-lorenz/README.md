# Lesson 10 — Đo bất bình đẳng: đường Lorenz & hệ số Gini

> Làm sao ép cả một phân bố thu nhập của hàng triệu người xuống **một con số** để so sánh nước này với nước kia, năm nay với năm ngoái? Câu trả lời cổ điển của xã hội học và kinh tế học: **đường Lorenz** và **hệ số Gini**.

## Mục tiêu học tập

- Dựng được **đường Lorenz (Lorenz curve)** từ dữ liệu thu nhập, hiểu ý nghĩa hai trục.
- Định nghĩa **hệ số Gini (Gini coefficient)** qua diện tích, và tính được nó bằng công thức hình thang.
- Diễn giải một giá trị Gini: 0 nghĩa là gì, gần 1 nghĩa là gì, các mốc thực tế của thế giới.
- Nhận ra **giới hạn** của Gini: hai phân bố rất khác nhau có thể cùng một Gini (đường Lorenz cắt nhau).

## Kiến thức tiền đề

- Cộng/trừ, phần trăm, tích lũy (cumulative). Không cần giải tích — ta chỉ dùng diện tích hình thang.
- Nối tiếp trực tiếp [Lesson 09 — Phân tầng & dịch chuyển xã hội](../lesson-09-stratification-mobility/): ở đó ta thấy xã hội chia thành các tầng thu nhập; ở đây ta **đo độ chênh lệch** giữa các tầng đó bằng một con số.

---

## 1. Vì sao cần đo bất bình đẳng bằng MỘT con số?

> 💡 **Trực giác.** Tưởng tượng bạn xếp toàn bộ dân số thành một hàng dài, **từ người nghèo nhất bên trái đến người giàu nhất bên phải**, rồi vừa đi dọc hàng vừa cộng dồn thu nhập. Nếu ai cũng có thu nhập bằng nhau, thì "đi được 40% số người" đúng bằng "gom được 40% tổng thu nhập" — cộng dồn tăng đều. Nếu tiền dồn về cuối hàng, thì đi hết 40% số người (những người nghèo) mà mới gom được, ví dụ, 10% tổng tiền — đường cộng dồn **võng xuống**. *Độ võng đó chính là bất bình đẳng.* Đường Lorenz vẽ lại độ võng này; Gini đo diện tích của nó.

Ta có thể liệt kê thu nhập của từng người, nhưng để **so sánh** (Việt Nam vs Thụy Điển, 2010 vs 2020) cần một thước đo gọn. Yêu cầu với thước đo tốt:

- **Không phụ thuộc quy mô**: nhân đôi thu nhập mọi người thì bất bình đẳng *không đổi* (giàu lên đồng đều không làm chênh lệch tương đối thay đổi).
- **Không phụ thuộc dân số**: nước 5 triệu dân và nước 100 triệu dân so được với nhau.
- **Nằm trong một khoảng cố định** (ở đây: $0$ đến $1$) để dễ đọc.

Đường Lorenz + Gini thỏa cả ba. Đó là lý do chúng thống trị các báo cáo của World Bank, OECD, Tổng cục Thống kê.

---

## 2. Đường Lorenz — định nghĩa đầy đủ

### 2.1 Định nghĩa

**(a) Là gì.** Đường Lorenz là đồ thị của hàm số:

$$L(p) = \text{tỉ lệ tổng thu nhập mà } p \text{ phần trăm dân số NGHÈO NHẤT nắm giữ.}$$

- Trục hoành $x$: **tỉ lệ dân số tích lũy**, xếp từ nghèo → giàu, chạy từ $0$ đến $1$.
- Trục tung $y$: **tỉ lệ thu nhập tích lũy**, chạy từ $0$ đến $1$.
- Luôn đi từ điểm $(0,0)$ đến $(1,1)$: 0% dân số nắm 0% thu nhập; 100% dân số nắm 100% thu nhập.

**(b) Vì sao cần khái niệm này.** Một danh sách thu nhập thô không cho thấy *hình dạng* của chênh lệch. Đường Lorenz nén toàn bộ phân bố thành một đường cong: chỉ cần nhìn nó **võng sâu tới đâu so với đường chéo** là biết bất bình đẳng nặng hay nhẹ, mà không cần đọc từng số. Đường chéo $45°$ (đường $y = x$) là mốc **bình đẳng tuyệt đối**: người nghèo nhất và giàu nhất thu nhập như nhau.

**(c) Ví dụ số cụ thể — dựng đường từ 5 người.** Năm người, thu nhập (triệu/tháng): $1, 2, 3, 4, 10$. Tổng $= 20$. Đã xếp sẵn từ nghèo → giàu.

| Đi tới người thứ | Dân số tích lũy $x$ | Thu nhập tích lũy | Thu nhập tích lũy $y$ |
|:---:|:---:|:---:|:---:|
| (0) | 0.0 | 0 | 0.00 |
| 1 | 0.2 | 1 | 0.05 |
| 2 | 0.4 | 1+2 = 3 | 0.15 |
| 3 | 0.6 | 3+3 = 6 | 0.30 |
| 4 | 0.8 | 6+4 = 10 | 0.50 |
| 5 | 1.0 | 10+10 = 20 | 1.00 |

Nối các điểm $(0,0) \to (0.2,0.05) \to (0.4,0.15) \to (0.6,0.30) \to (0.8,0.50) \to (1,1)$ được đường Lorenz. Đọc ngay được: **80% dân nghèo nhất chỉ nắm 50% thu nhập** — 20% người giàu nhất "ăn" nửa còn lại.

### 2.2 Ba tính chất luôn đúng

1. **Đi qua $(0,0)$ và $(1,1)$** — theo định nghĩa tích lũy.
2. **Nằm dưới (hoặc trùng) đường chéo** — vì người nghèo, theo định nghĩa, đóng góp ít hơn "phần bình quân" của họ.
3. **Lồi (cong lên, convex)** — độ dốc chính là thu nhập của nhóm đang xét chia cho thu nhập trung bình; xếp từ nghèo → giàu nên độ dốc **tăng dần** ⇒ đường cong luôn cong về một phía.

> ⚠ **Lỗi thường gặp.** Vẽ đường Lorenz **không sắp xếp** dân số từ nghèo → giàu. Nếu để lộn xộn, đường sẽ không lồi và không còn ý nghĩa. Bắt buộc sắp xếp tăng dần trước khi cộng dồn.

> 🔁 **Dừng lại tự kiểm tra.** Với 5 người ở ví dụ 2.1(c): 60% dân nghèo nhất nắm bao nhiêu % thu nhập? Nếu ai cũng thu nhập bằng nhau thì con số đó là bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> Đọc điểm $x = 0.6$: $y = 0.30 \Rightarrow$ **30%**. Nếu bình đẳng tuyệt đối, 60% dân nắm đúng **60%** thu nhập (đường Lorenz trùng đường chéo). Khoảng cách $60\% - 30\% = 30$ điểm phần trăm chính là "phần thiếu hụt" của nhóm dưới.
> </details>

---

## 3. Hệ số Gini — định nghĩa đầy đủ

### 3.1 Định nghĩa qua diện tích

Gọi **A** = diện tích vùng nằm giữa đường chéo bình đẳng và đường Lorenz; **B** = diện tích nằm dưới đường Lorenz.

**(a) Là gì.** Hệ số Gini là **tỉ lệ diện tích A so với toàn bộ tam giác dưới đường chéo**:

$$G = \frac{A}{A + B}.$$

Tam giác dưới đường chéo (đỉnh $(0,0),(1,0),(1,1)$) có diện tích $\tfrac{1}{2}$, nên $A + B = \tfrac{1}{2}$. Suy ra hai dạng rất tiện:

$$G = \frac{A}{1/2} = 2A, \qquad G = 1 - 2B \quad (\text{vì } B = \tfrac{1}{2} - A).$$

**(b) Vì sao cần khái niệm này.** Đường Lorenz cho *hình*, nhưng để **xếp hạng** và **so sánh** cần một con số. Gini biến "độ võng" thành một số duy nhất trong $[0,1]$:

- $G = 0$: đường Lorenz **trùng** đường chéo ⇒ $A = 0$ ⇒ bình đẳng tuyệt đối (ai cũng như ai).
- $G = 1$: đường Lorenz ép sát trục hoành rồi bật thẳng lên ⇒ $A$ = cả tam giác ⇒ **một người giữ tất cả**, còn lại không có gì.
- Càng gần 1, tiền càng dồn về thiểu số.

**(c) Ví dụ số cụ thể (≥ 4 phân bố).** Bốn nước giả định, mỗi nước chia dân thành 5 nhóm ngũ phân vị (mỗi nhóm 20% dân số); số trong ô là **% tổng thu nhập** nhóm đó nắm:

| Phân bố | 20% nghèo nhất | | | | 20% giàu nhất | **Gini** |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| Bình đẳng tuyệt đối | 20 | 20 | 20 | 20 | 20 | **0.00** |
| Kiểu Bắc Âu | 10 | 15 | 20 | 25 | 30 | **0.20** |
| Kiểu điển hình | 5 | 10 | 15 | 22 | 48 | **0.39** |
| Cực đoan | 1 | 2 | 3 | 4 | 90 | **0.72** |

(Cách tính từng số ở mục 4.) Nhìn cột cuối: cùng một khung "5 nhóm × 20% dân", nhưng khi thu nhập dồn dần về nhóm giàu nhất, Gini leo từ $0 \to 0.20 \to 0.39 \to 0.72$. Đó chính là điều ta muốn: **một trục đo đơn điệu theo mức độ tập trung**.

> ⚠ **Lỗi thường gặp.**
> - *"Gini = 0.4 nghĩa là 40% dân nghèo."* **Sai.** Gini **không** là tỉ lệ người nghèo, cũng không phải % thu nhập của ai. Nó là **diện tích chuẩn hóa** giữa đường bình đẳng và đường Lorenz.
> - *"Gini càng cao thì nước càng nghèo."* **Sai.** Gini đo **độ chênh lệch tương đối**, không đo mức sống. Một nước giàu vẫn có thể Gini cao (Mỹ ~0.40), một nước nghèo vẫn có thể Gini thấp.

---

## 4. Walk-through: tính Gini từ 5 nhóm ngũ phân vị

### 4.1 Công thức hình thang (Brown)

Ta không cần tích phân. Chia trục hoành thành các đoạn theo nhóm; diện tích **B** dưới đường Lorenz là tổng các **hình thang**. Với các điểm $(X_0,Y_0)=(0,0), (X_1,Y_1), \dots, (X_n,Y_n)=(1,1)$:

$$B = \sum_{i=1}^{n} \underbrace{(X_i - X_{i-1})}_{\text{đáy ngang}} \cdot \underbrace{\frac{Y_i + Y_{i-1}}{2}}_{\text{cao trung bình}}.$$

Thay vào $G = 1 - 2B$:

$$\boxed{\,G = 1 - \sum_{i=1}^{n} (X_i - X_{i-1})\,(Y_i + Y_{i-1})\,}$$

Khi các nhóm **bằng nhau** về dân số (ngũ phân vị: $X_i - X_{i-1} = \tfrac{1}{n}$, ở đây $\tfrac{1}{5}$):

$$G = 1 - \frac{1}{n}\sum_{i=1}^{n}(Y_i + Y_{i-1}).$$

### 4.2 Chạy tay cho phân bố "điển hình" (5, 10, 15, 22, 48)

**Bước 1 — cộng dồn thu nhập** để có $Y_i$ (chia 100 ra tỉ lệ):

| Nhóm $i$ | Share % | Thu nhập tích lũy % | $Y_i$ |
|:--:|:--:|:--:|:--:|
| 1 | 5 | 5 | 0.05 |
| 2 | 10 | 15 | 0.15 |
| 3 | 15 | 30 | 0.30 |
| 4 | 22 | 52 | 0.52 |
| 5 | 48 | 100 | 1.00 |

với $Y_0 = 0$.

**Bước 2 — cộng từng cặp $(Y_i + Y_{i-1})$:**

$$\begin{aligned}
(Y_1+Y_0) &= 0.05 + 0 = 0.05 \\
(Y_2+Y_1) &= 0.15 + 0.05 = 0.20 \\
(Y_3+Y_2) &= 0.30 + 0.15 = 0.45 \\
(Y_4+Y_3) &= 0.52 + 0.30 = 0.82 \\
(Y_5+Y_4) &= 1.00 + 0.52 = 1.52
\end{aligned}$$

**Bước 3 — cộng lại rồi áp công thức:**

$$\sum (Y_i+Y_{i-1}) = 0.05 + 0.20 + 0.45 + 0.82 + 1.52 = 3.04.$$

$$G = 1 - \frac{1}{5}(3.04) = 1 - 0.608 = \mathbf{0.392}.$$

**Kiểm tra chéo bằng diện tích B** (mỗi đáy $= 0.2$):

$$B = 0.2 \cdot \frac{3.04}{2} = 0.2 \cdot 1.52 = 0.304, \qquad G = 1 - 2(0.304) = 1 - 0.608 = 0.392.\ \checkmark$$

Hai đường tính khác nhau ra **cùng** $0.392$ — công thức nhất quán.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tính Gini có cần biết thu nhập tuyệt đối không?"* → **Không.** Chỉ cần **tỉ lệ** (share %). Điều này thể hiện tính "không phụ thuộc quy mô" ở mục 1.
> - *"Dữ liệu 5 nhóm có chính xác bằng dữ liệu từng người không?"* → Không. Gộp thành nhóm **làm phẳng** chênh lệch bên trong mỗi nhóm ⇒ Gini gộp nhóm thường **thấp hơn** Gini thực. Xem cảnh báo 4.3.
> - *"Trong nhóm giàu nhất còn chênh nhau nữa thì sao?"* → Công thức 5-nhóm không thấy được; muốn thấy phải chia mịn hơn (10 nhóm decile, hoặc 100 nhóm percentile).

### 4.3 Cảnh báo: đây là toy example — 5 nhóm gộp, không phải production

> ⚠ **Hai giới hạn phải nhớ.**
>
> **(1) Gộp nhóm làm Gini bị hạ thấp.** Với $n$ nhóm bằng nhau, dù thu nhập dồn hết vào **một** nhóm, Gini tối đa chỉ đạt $1 - \tfrac{1}{n}$. Với $n = 5$: tối đa $1 - \tfrac{1}{5} = 0.8$ (xem phân bố $0,0,0,0,100$). Muốn Gini tiến gần $1$ phải chia mịn (percentile) hoặc dùng dữ liệu cá nhân. Cơ quan thống kê thật dùng vi dữ liệu (microdata), không phải 5 nhóm.
>
> **(2) Hai phân bố KHÁC NHAU có thể CÙNG một Gini.** Đây là hạn chế bản chất, không phải lỗi làm tròn. Xét hai nước, đều 5 nhóm:
>
> | | 20% nghèo | | | | 20% giàu | Gini |
> |---|:--:|:--:|:--:|:--:|:--:|:--:|
> | Nước **A** | 10 | 15 | 20 | 25 | 30 | **0.20** |
> | Nước **B** | 14 | 14 | 14 | 24 | 34 | **0.20** |
>
> Cả hai Gini $= 0.20$ (tự kiểm chứng bằng công thức 4.1). Nhưng chúng **khác hẳn**: ở B, 40% dân nghèo nhất nắm $14+14 = 28\%$ (khá hơn A với $10+15 = 25\%$), *nhưng* 20% giàu nhất của B nắm $34\%$ (chênh hơn A với $30\%$). Đường Lorenz của A và B **cắt nhau**: B "đều hơn ở đáy, lệch hơn ở đỉnh". Gini gộp cả hai đầu vào một số ⇒ **mất thông tin về hình dạng**. Bài học: khi hai đường Lorenz cắt nhau, **Gini một mình không đủ** để nói nước nào bình đẳng hơn — phải kèm thêm chỉ số khác (tỉ số S80/S20, tỉ lệ nghèo…).

---

## 5. Đọc và diễn giải một giá trị Gini

**Thang tham chiếu thô** (thu nhập):

| Gini | Diễn giải | Ví dụ thực tế (xấp xỉ) |
|:--:|---|---|
| 0.20 – 0.30 | Thấp — khá bình đẳng | Bắc Âu (Thụy Điển, Na Uy ~0.25–0.28) |
| 0.30 – 0.40 | Trung bình | Việt Nam ~0.36; nhiều nước EU |
| 0.40 – 0.50 | Cao | Mỹ ~0.40; Trung Quốc ~0.47 |
| > 0.50 | Rất cao | Brazil ~0.53; Nam Phi ~0.63 |

**Các chỉ số đi kèm** (bổ khuyết cho Gini):

- **Tỉ số S80/S20** = (thu nhập 20% giàu nhất) / (thu nhập 20% nghèo nhất). Ví dụ phân bố $5,10,15,20,50$: $S80/S20 = 50/5 = 10$ lần.
- **Share của top 10% / bottom 40%** — nói thẳng "người giàu nhất nắm bao nhiêu", trực quan hơn diện tích.
- **Lorenz dominance**: nếu đường Lorenz của X nằm **hoàn toàn phía trên** của Y (không cắt nhau), thì X bình đẳng hơn Y một cách **không thể chối cãi**, mọi thước đo hợp lý đều đồng ý. Chỉ khi hai đường **cắt nhau** ta mới cần tranh luận và Gini mới có thể "che" mất khác biệt (mục 4.3).

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Một nước có Gini $= 0$. Điều gì đúng về thu nhập của dân?
> 2. Nước C: đường Lorenz nằm hoàn toàn trên nước D. Nước nào bình đẳng hơn? Cần Gini để kết luận không?
>
> <details><summary>Đáp án</summary>
>
> 1. Mọi người thu nhập **bằng nhau** — đường Lorenz trùng đường chéo, $A = 0$.
> 2. **C bình đẳng hơn** (Lorenz dominance). Không cần tính Gini: nằm trên hoàn toàn ⇒ mọi tỉ lệ dân nghèo đều nắm phần thu nhập lớn hơn hoặc bằng. Gini của C chắc chắn nhỏ hơn, nhưng kết luận đã có trước khi tính.
> </details>

---

## 6. Bài tập

**Bài 1 (cơ bản — áp công thức).** Một nước chia thu nhập theo ngũ phân vị: $8\%, 12\%, 17\%, 23\%, 40\%$. Tính hệ số Gini.

**Bài 2 (đọc phân bố).** Cho phân bố $5, 10, 15, 20, 50$ (% thu nhập theo ngũ phân vị).
- (a) Tính Gini.
- (b) 20% giàu nhất nắm bao nhiêu %? 40% nghèo nhất nắm bao nhiêu %?
- (c) Tính tỉ số S80/S20.

**Bài 3 (vận dụng — giới hạn của Gini).** Hai nước, đều 5 nhóm ngũ phân vị:
- Nước A: $10, 15, 20, 25, 30$.
- Nước B: $14, 14, 14, 24, 34$.

(a) Tính Gini cả hai. (b) Nước nào "bình đẳng hơn"? Vì sao câu hỏi này **không** có đáp án đơn giản?

---

## 7. Lời giải chi tiết

**Bài 1.** Cách tiếp cận: cộng dồn ra $Y_i$, rồi $G = 1 - \tfrac{1}{5}\sum (Y_i + Y_{i-1})$.

Cộng dồn: $Y = 0.08,\ 0.20,\ 0.37,\ 0.60,\ 1.00$ (với $Y_0 = 0$).

$$\begin{aligned}
\sum (Y_i+Y_{i-1}) &= 0.08 + (0.20{+}0.08) + (0.37{+}0.20) + (0.60{+}0.37) + (1.00{+}0.60) \\
&= 0.08 + 0.28 + 0.57 + 0.97 + 1.60 = 3.50.
\end{aligned}$$

$$G = 1 - \frac{1}{5}(3.50) = 1 - 0.70 = \mathbf{0.30}.$$

Diễn giải: Gini $0.30$ — ranh giới thấp/trung bình, cỡ nhiều nước châu Âu.

**Bài 2.**
- (a) Cộng dồn: $Y = 0.05,\ 0.15,\ 0.30,\ 0.50,\ 1.00$.

$$\sum (Y_i+Y_{i-1}) = 0.05 + 0.20 + 0.45 + 0.80 + 1.50 = 3.00 \Rightarrow G = 1 - \tfrac{1}{5}(3.00) = \mathbf{0.40}.$$

- (b) 20% giàu nhất: nhóm cuối $= \mathbf{50\%}$. 40% nghèo nhất: $5 + 10 = \mathbf{15\%}$.
- (c) $S80/S20 = 50 / 5 = \mathbf{10}$ lần. (Trùng phân bố 5 người ở mục 2.1(c) — cùng hình dạng, cùng Gini $0.40$.)

**Bài 3.**
- (a) Cách tiếp cận: áp công thức cho từng nước.
  - Nước A: $Y = 0.10, 0.25, 0.45, 0.70, 1.00$. $\sum = 0.10 + 0.35 + 0.70 + 1.15 + 1.70 = 4.00 \Rightarrow G_A = 1 - \tfrac{4.00}{5} = \mathbf{0.20}$.
  - Nước B: $Y = 0.14, 0.28, 0.42, 0.66, 1.00$. $\sum = 0.14 + 0.42 + 0.70 + 1.08 + 1.66 = 4.00 \Rightarrow G_B = 1 - \tfrac{4.00}{5} = \mathbf{0.20}$.
- (b) **Cùng Gini $0.20$, nhưng không thể nói nước nào bình đẳng hơn một cách tuyệt đối.** So sánh trực tiếp:
  - Ở **đáy**: 40% nghèo nhất của B nắm $14+14 = 28\%$, của A chỉ $10+15 = 25\%$ ⇒ **B đều hơn ở tầng dưới**.
  - Ở **đỉnh**: 20% giàu nhất của B nắm $34\%$, của A chỉ $30\%$ ⇒ **A đều hơn ở tầng trên**.
  - Hai đường Lorenz **cắt nhau** (B ở trên A tại $x = 0.2, 0.4$ rồi xuống dưới A tại $x = 0.6, 0.8$). Vì thế không có "Lorenz dominance", và Gini — vốn chỉ là **một** con số diện tích — nén hai xu hướng trái ngược thành cùng $0.20$, giấu đi sự khác biệt về *hình dạng*. Muốn phân định phải hỏi thêm: ta quan tâm bất bình đẳng ở đáy (nghèo đói) hay ở đỉnh (tập trung của cải)? Đó là lựa chọn **giá trị**, không phải toán học.

> 📝 **Tóm tắt bài học.**
> - **Đường Lorenz**: xếp dân nghèo → giàu, vẽ (tỉ lệ dân tích lũy $x$) vs (tỉ lệ thu nhập tích lũy $y$). Đi từ $(0,0)$ đến $(1,1)$, luôn nằm dưới đường chéo, càng võng càng bất bình đẳng.
> - **Gini** $= \dfrac{A}{A+B} = 2A = 1 - 2B$, nằm trong $[0,1]$: $0$ = bình đẳng tuyệt đối, $1$ = một người giữ tất cả.
> - Tính nhanh từ nhóm bằng nhau: $G = 1 - \tfrac{1}{n}\sum (Y_i + Y_{i-1})$ (công thức hình thang). Chỉ cần **tỉ lệ**, không cần thu nhập tuyệt đối.
> - Mốc thực tế: Bắc Âu ~0.25, Việt Nam ~0.36, Mỹ ~0.40, Nam Phi ~0.63.
> - **Giới hạn**: gộp nhóm hạ thấp Gini (tối đa $1-\tfrac1n$); hai phân bố khác nhau có thể **cùng Gini** khi đường Lorenz cắt nhau ⇒ cần chỉ số bổ sung (S80/S20, share top/bottom).

---

## Bài tiếp theo

**[Lesson 11 — Hành động tập thể & điểm bùng phát](../lesson-11-collective-action-tipping/)**: từ "đo" bất bình đẳng, ta chuyển sang "thay đổi" — khi nào những cá nhân bất mãn vượt ngưỡng và đồng loạt hành động (biểu tình, phong trào, thay đổi chuẩn mực).

Minh họa tương tác: [visualization.html](./visualization.html) — kéo thu nhập từng nhóm, xem đường Lorenz võng theo và Gini đổi theo thời gian thực.
