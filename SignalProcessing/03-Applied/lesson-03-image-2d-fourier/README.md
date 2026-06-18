# Lesson 14 — Ảnh & Fourier 2D (Image processing & 2D DFT, nén JPEG)

> **Câu hỏi mở bài**: Bạn chụp một bức ảnh 12 megapixel, file RAW nặng ~36 MB. Lưu lại dưới dạng JPEG, file chỉ còn ~3 MB — **nhỏ hơn 10 lần** — mà mắt nhìn gần như không thấy khác biệt. **JPEG đã vứt bỏ thông tin gì mà ảnh vẫn nhìn ổn, file lại nhỏ đi cả chục lần?** Bài này trả lời câu hỏi đó bằng một ý tưởng duy nhất: **biến đổi Fourier (và người anh em DCT) tách ảnh thành các tần số không gian, rồi vứt đi những tần số mà mắt người ít nhạy.**

## Mục tiêu học tập

Sau bài này, bạn sẽ:

1. Hiểu **ảnh số là một tín hiệu 2 chiều** — lưới pixel, grayscale vs RGB.
2. Nắm khái niệm **tần số không gian (spatial frequency)**: vùng phẳng = tần số thấp, cạnh/chi tiết = tần số cao.
3. Viết và hiểu công thức **DFT 2D** và tính chất **separable** (tách thành DFT theo hàng rồi cột).
4. Biết **lọc ảnh trong miền tần số**: low-pass làm mờ, high-pass làm nét/bắt cạnh.
5. Hiểu **tích chập 2D** với kernel (blur, sharpen, Sobel, Laplacian) và liên hệ với CNN.
6. Hiểu **DCT + lượng tử hóa = trái tim của JPEG**, và **vì sao nén được 10 lần**.
7. Biết các ứng dụng: nén, khử nhiễu, watermark, ảnh y khoa.

## Kiến thức tiền đề

- [Tier1 — L04: Tích chập (Convolution)](../../01-Foundations/lesson-04-convolution/) — tích chập 1D; bài này mở rộng lên 2D.
- [Tier2 — L09: DFT (Discrete Fourier Transform)](../../02-Fourier/lesson-04-dft/) — DFT 1D; bài này là DFT 2D.
- [DataFoundations — Floating-point](../../../DataFoundations/01-NumberRepresentation/lesson-03-floating-point/) — hệ số DCT là số thực dấu phẩy động; lượng tử hóa là làm tròn về số nguyên.

---

## 1. Ảnh số là tín hiệu 2 chiều

💡 **Trực giác**: Tín hiệu âm thanh là một hàm 1 chiều — biên độ thay đổi theo **thời gian** $f(t)$. Ảnh thì là một hàm 2 chiều — độ sáng thay đổi theo **vị trí** $(x, y)$. Hãy hình dung một tấm tôn dập sóng: độ cao tại mỗi điểm là một con số, và nó thay đổi khi ta đi theo cả chiều ngang lẫn chiều dọc. Ảnh y hệt vậy: thay "độ cao" bằng "độ sáng".

### 1.1 Lưới pixel

Một ảnh grayscale $M \times N$ là một **ma trận** số nguyên:

$$f[x, y], \quad x = 0, 1, \dots, M-1, \quad y = 0, 1, \dots, N-1$$

Mỗi ô là một **pixel** (picture element), thường lưu bằng 8 bit → giá trị $0$ (đen) đến $255$ (trắng).

**Ví dụ 1** — một patch $3 \times 3$ vùng tối có gradient nhẹ:

$$
f = \begin{bmatrix} 30 & 32 & 34 \\ 31 & 33 & 35 \\ 32 & 34 & 36 \end{bmatrix}
$$

Đây là **vùng phẳng** — các giá trị gần nhau, biến thiên rất chậm.

**Ví dụ 2** — một patch $3 \times 3$ có cạnh dọc sắc nét (trái đen, phải trắng):

$$
f = \begin{bmatrix} 0 & 0 & 255 \\ 0 & 0 & 255 \\ 0 & 0 & 255 \end{bmatrix}
$$

Đây là **biến thiên nhanh** theo chiều ngang — đó chính là **cạnh**.

### 1.2 Grayscale vs RGB

- **Grayscale**: 1 con số / pixel → 1 ma trận.
- **RGB**: 3 con số / pixel (đỏ, lục, lam) → **3 ma trận chồng lên nhau** (3 "kênh"). Ảnh màu $M \times N$ thực ra là 3 tín hiệu 2D độc lập. Mọi kỹ thuật bài này áp lên grayscale; với ảnh màu chỉ cần lặp lại trên từng kênh (JPEG còn tách sang không gian YCbCr — xem mục 6).

**Ví dụ 3** — pixel màu cam: $(R, G, B) = (255, 165, 0)$. **Ví dụ 4** — pixel xám trung tính: $(128, 128, 128)$ (ba kênh bằng nhau ⇒ không màu, chỉ độ sáng).

❓ **Câu hỏi tự nhiên**
> *"Tại sao phải đếm pixel theo cả x và y, sao không duỗi thành 1 hàng dài rồi xử lý như tín hiệu 1D?"* — Duỗi được, nhưng ta sẽ **mất cấu trúc lân cận**: pixel ngay trên và ngay dưới (cách nhau 1 hàng) trong ảnh là hàng xóm, nhưng khi duỗi 1D chúng cách nhau $N$ phần tử. Cạnh, góc, texture đều là quan hệ 2D — phải giữ 2 chiều.

🔁 **Dừng lại tự kiểm tra**
<details><summary>Patch nào "tần số cao hơn": <code>[[100,100],[100,100]]</code> hay <code>[[0,255],[255,0]]</code>?</summary>

Patch thứ hai. Patch đầu hoàn toàn phẳng (mọi pixel bằng nhau) → tần số = 0 (chỉ có thành phần DC). Patch thứ hai đảo trắng-đen theo cả hai chiều như bàn cờ → biến thiên cực nhanh → tần số cao nhất.
</details>

📝 **Tóm tắt mục 1**
- Ảnh grayscale = ma trận $f[x,y]$, giá trị 0–255.
- Ảnh RGB = 3 ma trận (3 kênh).
- Giữ 2 chiều vì cạnh/texture là quan hệ lân cận 2D.

---

## 2. Tần số không gian (spatial frequency)

💡 **Trực giác**: Với âm thanh, "tần số" = nốt cao/thấp, đo bằng dao động/giây. Với ảnh, **tần số không gian** = "độ sáng thay đổi nhanh hay chậm khi ta đi qua ảnh", đo bằng dao động / khoảng cách. Một bầu trời xanh mịn = tần số thấp (đi cả trăm pixel độ sáng mới đổi chút). Sợi tóc, viền chữ, hoa văn áo kẻ = tần số cao (đổi đen-trắng chỉ trong 1-2 pixel).

**Định nghĩa (3 phần):**

- **(a) Là gì** — tần số không gian là số chu kỳ sáng-tối lặp lại trên một đơn vị khoảng cách (vd "5 vạch / 100 pixel"). Cao = chi tiết nhỏ/cạnh; thấp = mảng lớn đồng đều.
- **(b) Vì sao cần** — vì nó cho phép **phân loại thông tin theo mức độ quan trọng với mắt**. Mắt người rất nhạy với tần số thấp–trung (hình khối, độ sáng tổng thể) nhưng kém nhạy với tần số rất cao (chi tiết li ti). Đây chính là kẽ hở để nén ảnh.
- **(c) Ví dụ số** — một hàng pixel `[10,10,10,10,250,250,250,250]`: đổi một lần ở giữa → **tần số thấp**. Hàng `[10,250,10,250,10,250,10,250]`: đổi mỗi pixel → **tần số cao nhất** (Nyquist của ảnh).

### 2.1 Bốn ví dụ ánh xạ ảnh ↔ tần số

| Vùng ảnh | Đặc điểm | Tần số |
|---|---|---|
| Bầu trời, tường trơn | độ sáng gần như không đổi | **rất thấp** (gần DC) |
| Gradient chuyển sáng dần | đổi đều, chậm | **thấp** |
| Mép bàn, viền đối tượng | nhảy bậc đột ngột | **cao** (cạnh = nhiều tần số cao) |
| Texture vải kẻ sọc nhỏ, nhiễu hạt | dao động dày đặc | **rất cao** |

⚠ **Lỗi thường gặp**: nghĩ "cạnh là tần số cao" rồi suy ra "ảnh càng sắc nét càng nhiều tần số cao, càng tốt". Thực tế **nhiễu (noise) cũng là tần số cao**. Vì thế low-pass (bỏ tần số cao) vừa làm mờ cạnh vừa khử nhiễu — luôn là đánh đổi.

🔁 **Dừng lại tự kiểm tra**
<details><summary>Làm mờ một bức ảnh tương đương với việc làm gì trong miền tần số?</summary>

Loại bỏ (hoặc giảm) các thành phần tần số cao — tức là một bộ lọc **low-pass**. Cạnh và chi tiết nhỏ (tần số cao) bị suy giảm → ảnh trông nhòe.
</details>

📝 **Tóm tắt mục 2**
- Tần số thấp = vùng phẳng; tần số cao = cạnh, chi tiết, nhiễu.
- Mắt nhạy tần số thấp–trung, kém nhạy tần số rất cao → cơ sở để nén.

---

## 3. DFT 2D — biến đổi Fourier rời rạc hai chiều

💡 **Trực giác**: DFT 1D nói "tín hiệu này = tổng của các sóng sin/cos với tần số khác nhau". DFT 2D nói y vậy nhưng sóng cơ sở là **sóng phẳng 2 chiều** — những "tấm gợn sóng" nghiêng theo các hướng và bước sóng khác nhau. Mỗi ảnh = tổng có trọng số của các tấm gợn sóng đó. Hệ số $F[u,v]$ cho biết "tấm gợn sóng tần số $(u,v)$ góp bao nhiêu vào ảnh".

### 3.1 Công thức

$$F[u, v] = \sum_{x=0}^{M-1} \sum_{y=0}^{N-1} f[x, y]\, e^{-i 2\pi \left( \frac{u x}{M} + \frac{v y}{N} \right)}$$

- $f[x,y]$: ảnh (miền không gian). $F[u,v]$: phổ (miền tần số), nói chung là **số phức**.
- $u$: tần số theo chiều dọc, $v$: tần số theo chiều ngang.
- $|F[u,v]|$ = **biên độ (magnitude)** = "năng lượng" của tần số đó; góc pha mang thông tin vị trí/cấu trúc.

Biến đổi ngược (tái tạo ảnh):

$$f[x, y] = \frac{1}{MN} \sum_{u=0}^{M-1} \sum_{v=0}^{N-1} F[u, v]\, e^{+i 2\pi \left( \frac{u x}{M} + \frac{v y}{N} \right)}$$

### 3.2 Thành phần DC nằm ở tâm phổ

Tại $u = v = 0$:

$$F[0, 0] = \sum_{x}\sum_{y} f[x,y] \cdot e^0 = \sum_{x}\sum_{y} f[x,y]$$

Đây là **tổng mọi pixel** = (độ sáng trung bình) $\times MN$ — gọi là **thành phần DC** (Direct Current, mượn từ điện học: thành phần "không dao động"). Khi hiển thị phổ, ta thường **dịch tâm (fftshift)** để DC nằm giữa ảnh phổ: ở giữa là tần số thấp, càng ra rìa càng tần số cao.

**Ví dụ số nhỏ** — ảnh $2 \times 2$ phẳng hoàn toàn $f = \begin{bmatrix}100 & 100 \\ 100 & 100\end{bmatrix}$:

$$F[0,0] = 100+100+100+100 = 400, \quad F[0,1]=F[1,0]=F[1,1]=0$$

Toàn bộ năng lượng dồn vào DC, không có tần số cao — đúng như "ảnh phẳng = chỉ tần số 0".

### 3.3 Tính separable — DFT 2D = DFT 1D theo hàng rồi cột

Mũ tách được: $e^{-i2\pi(ux/M + vy/N)} = e^{-i2\pi ux/M} \cdot e^{-i2\pi vy/N}$. Nhờ vậy:

$$F[u,v] = \sum_{x=0}^{M-1} \left( \underbrace{\sum_{y=0}^{N-1} f[x,y]\, e^{-i2\pi vy/N}}_{\text{DFT 1D theo từng hàng } x} \right) e^{-i2\pi ux/M}$$

Nghĩa là: **(1)** làm DFT 1D cho từng **hàng** → ma trận trung gian; **(2)** làm DFT 1D cho từng **cột** của ma trận đó → ra $F$.

❓ **Câu hỏi tự nhiên**
> *"Separable để làm gì, có nhanh hơn không?"* — Có, và rất đáng kể. DFT 2D trực tiếp tốn $O(M^2 N^2)$. Tách thành $M$ DFT-hàng + $N$ DFT-cột, mỗi cái dùng **FFT** $O(N \log N)$, tổng còn $O(MN \log(MN))$. Với ảnh $1024 \times 1024$, đó là khác biệt giữa "vài giờ" và "tích tắc".

⚠ **Lỗi thường gặp**: nhầm $u$ (tần số dọc) với $v$ (tần số ngang), hoặc quên fftshift rồi tưởng "DC ở góc trên trái là bug". DC ở góc $(0,0)$ là **đúng** khi chưa shift — fftshift chỉ là cách hiển thị.

🔁 **Dừng lại tự kiểm tra**
<details><summary>Ảnh chỉ gồm các vạch dọc đều nhau (sọc) sẽ cho phổ trông thế nào?</summary>

Phổ tập trung thành vài điểm sáng nằm trên trục ngang (tần số $v$ ≠ 0, $u$ = 0) — vì sọc dọc là dao động thuần theo chiều ngang. Tần số càng dày (sọc càng sít) thì điểm sáng càng xa tâm.
</details>

📝 **Tóm tắt mục 3**
- $F[u,v]$ phân tích ảnh thành sóng phẳng 2D; $|F|$ = năng lượng từng tần số.
- DC = $F[0,0]$ = tổng pixel; fftshift đưa DC vào tâm để xem.
- DFT 2D separable → tính bằng FFT theo hàng rồi cột, $O(MN\log MN)$.

---

## 4. Lọc ảnh trong miền tần số

💡 **Trực giác**: Đã có phổ $F[u,v]$, "lọc" chỉ là **nhân phổ với một mặt nạ** $H[u,v]$ (giữ chỗ này, bỏ chỗ kia), rồi biến đổi ngược về ảnh. Giống chỉnh equalizer nhạc — kéo bass lên, treble xuống — nhưng cho ảnh.

$$G[u,v] = H[u,v] \cdot F[u,v] \quad \xrightarrow{\text{IDFT}} \quad g[x,y]$$

### 4.1 Bốn ví dụ bộ lọc

1. **Ideal low-pass** — $H = 1$ trong đĩa bán kính $D_0$ quanh tâm, $H = 0$ ngoài đó. Giữ tần số thấp → **làm mờ** (mất chi tiết). Lọc lý tưởng tạo "gợn sóng" (ringing) ở cạnh.
2. **Gaussian low-pass** — $H[u,v] = e^{-D^2/(2D_0^2)}$ với $D$ = khoảng cách tới tâm. Giảm dần mượt → **mờ êm**, không ringing. Đây là lựa chọn thực tế.
3. **High-pass** = $1 - \text{low-pass}$ — giữ tần số cao, bỏ thấp → **bắt cạnh / làm nổi chi tiết**. Vùng phẳng thành xám đều, chỉ còn đường viền.
4. **Band-pass** — giữ một vành tần số trung, bỏ cả thấp lẫn cao → tách texture ở một "kích cỡ" nhất định (vd vân tay, sóng biển).

**Ví dụ số minh họa low-pass cực đoan**: nếu chỉ giữ đúng $F[0,0]$ (bỏ hết tần số ≠ 0), IDFT cho ra **ảnh phẳng = độ sáng trung bình** — tức là mờ hoàn toàn thành một mảng xám. Càng giữ thêm tần số thấp, ảnh càng hiện rõ dần.

⚠ **Lỗi thường gặp**: dùng ideal low-pass (cắt phập một nhát) rồi ngạc nhiên vì cạnh có **gợn sóng** (ringing artifact). Cắt sắc trong miền tần số ⇔ tích chập với hàm sinc dao động trong miền không gian → sinh gợn. Vì thế thực tế dùng Gaussian (giảm mượt).

🔁 **Dừng lại tự kiểm tra**
<details><summary>Muốn phát hiện cạnh trong ảnh, dùng low-pass hay high-pass?</summary>

High-pass. Cạnh là tần số cao; bỏ tần số thấp (vùng phẳng) đi thì chỉ còn lại đường viền nổi bật.
</details>

📝 **Tóm tắt mục 4**
- Lọc = nhân phổ với mặt nạ $H$ rồi IDFT.
- Low-pass → mờ + khử nhiễu; high-pass → nét + bắt cạnh; band-pass → tách texture.
- Cắt sắc gây ringing → dùng Gaussian.

---

## 5. Tích chập 2D & kernel

💡 **Trực giác**: Lọc trong miền tần số (mục 4) tương đương **tích chập trong miền không gian** với một **kernel** nhỏ (định lý tích chập, mở rộng từ [Tier1 L04](../../01-Foundations/lesson-04-convolution/) lên 2D). Kernel là một ô vuông số nhỏ (thường $3\times3$) trượt qua mọi pixel; tại mỗi vị trí, ta nhân chồng kernel với patch dưới nó rồi cộng lại → giá trị pixel mới. Không cần đi qua phổ — với kernel nhỏ, tích chập trực tiếp còn nhanh hơn.

### 5.1 Công thức tích chập 2D

$$g[x,y] = \sum_{i=-1}^{1} \sum_{j=-1}^{1} h[i,j]\, f[x-i, y-j]$$

(với kernel $3\times3$, $h[i,j]$ là trọng số).

### 5.2 Walk-through một kernel 3×3 trên patch số

Lấy **kernel làm nét (sharpen)**:

$$h = \begin{bmatrix} 0 & -1 & 0 \\ -1 & 5 & -1 \\ 0 & -1 & 0 \end{bmatrix}$$

Áp lên một patch (đang tính pixel ở tâm patch):

$$f_{\text{patch}} = \begin{bmatrix} 60 & 80 & 60 \\ 80 & 100 & 80 \\ 60 & 80 & 60 \end{bmatrix}$$

Nhân từng ô với kernel (correlation, tâm với tâm) rồi cộng:

$$
\begin{aligned}
g &= (0\cdot60) + (-1\cdot80) + (0\cdot60) \\
  &\;+ (-1\cdot80) + (5\cdot100) + (-1\cdot80) \\
  &\;+ (0\cdot60) + (-1\cdot80) + (0\cdot60) \\
  &= 0 - 80 + 0 - 80 + 500 - 80 + 0 - 80 + 0 \\
  &= 500 - 320 = \mathbf{180}
\end{aligned}
$$

Pixel tâm từ $100 \to 180$. Tổng trọng số kernel $= 0-1+0-1+5-1+0-1+0 = 1$, nên vùng phẳng giữ nguyên độ sáng; chỉ chỗ tâm **nhô cao hơn xung quanh** mới bị đẩy lên → tăng tương phản cục bộ = **làm nét**. (Giá trị $>255$ sẽ được kẹp về 255 khi hiển thị.)

### 5.3 Bộ sưu tập kernel hay dùng

| Kernel | Ma trận | Tác dụng |
|---|---|---|
| **Box blur** | $\frac{1}{9}\begin{bmatrix}1&1&1\\1&1&1\\1&1&1\end{bmatrix}$ | lấy trung bình → mờ (low-pass) |
| **Gaussian blur** | $\frac{1}{16}\begin{bmatrix}1&2&1\\2&4&2\\1&2&1\end{bmatrix}$ | mờ êm, có trọng tâm |
| **Sharpen** | $\begin{bmatrix}0&-1&0\\-1&5&-1\\0&-1&0\end{bmatrix}$ | làm nét (tăng high-freq) |
| **Sobel $x$** | $\begin{bmatrix}-1&0&1\\-2&0&2\\-1&0&1\end{bmatrix}$ | gradient ngang → cạnh dọc |
| **Laplacian** | $\begin{bmatrix}0&1&0\\1&-4&1\\0&1&0\end{bmatrix}$ | đạo hàm bậc 2 → bắt cạnh mọi hướng |

❓ **Câu hỏi tự nhiên**
> *"Liên hệ gì với CNN trong deep learning?"* — **Trực tiếp**. Lớp convolution trong [CNN (Mạng nơ-ron tích chập, AI-ML)](../../../AI-ML/) chính là tích chập 2D với kernel — chỉ khác là **trọng số kernel được học từ dữ liệu** thay vì gán cứng như Sobel. Các filter tầng đầu của CNN huấn luyện xong thường tự "khám phá lại" những kernel bắt cạnh/blur rất giống Sobel/Gaussian.

⚠ **Lỗi thường gặp**: quên **chuẩn hóa** kernel blur (chia tổng trọng số). Box blur mà không chia 9 → ảnh sáng gấp 9 lần, tràn trắng. Và quên xử lý **biên ảnh** (pixel ở mép không đủ hàng xóm) → viền đen/lỗi; thực tế dùng padding (lặp mép, phản chiếu, hoặc bọc 0).

🔁 **Dừng lại tự kiểm tra**
<details><summary>Tổng các phần tử của kernel Sobel-x bằng bao nhiêu, và điều đó nói gì?</summary>

$-1+0+1-2+0+2-1+0+1 = 0$. Tổng = 0 nghĩa là áp lên **vùng phẳng** cho ra 0 (đen) — kernel chỉ phản ứng ở nơi có **thay đổi** độ sáng, đúng bản chất "bắt cạnh".
</details>

📝 **Tóm tắt mục 5**
- Tích chập 2D = trượt kernel, nhân-chồng-cộng tại mỗi pixel.
- Blur (low-pass), sharpen & Sobel/Laplacian (high-pass) chỉ khác nhau ở trọng số.
- CNN = tích chập với kernel **học được**; biên cần padding, blur cần chuẩn hóa.

---

## 6. DCT & JPEG — vì sao nén được 10 lần

💡 **Trực giác**: JPEG không nén cả ảnh một lúc. Nó **chia ảnh thành các khối $8\times8$**, biến đổi mỗi khối sang miền tần số bằng **DCT (Discrete Cosine Transform)**, rồi **vứt mạnh tay các hệ số tần số cao** (mắt ít nhạy), giữ lại các hệ số tần số thấp. Phần lớn năng lượng của một khối $8\times8$ tự nhiên dồn vào vài hệ số góc trên-trái → bỏ phần còn lại gần như không ảnh hưởng thị giác mà tiết kiệm rất nhiều bit.

### 6.1 DCT — họ hàng của Fourier, cho ra số thực

DCT giống DFT nhưng dùng **cosine thực** (không số phức) và giả định ảnh đối xứng ở biên → không gây nhảy bậc giả ở mép khối. DCT 2D của khối $8\times8$:

$$F[u,v] = \frac{1}{4} C_u C_v \sum_{x=0}^{7}\sum_{y=0}^{7} f[x,y]\, \cos\!\frac{(2x+1)u\pi}{16}\, \cos\!\frac{(2y+1)v\pi}{16}$$

với $C_0 = 1/\sqrt{2}$, $C_k = 1$ khi $k>0$. Kết quả: $F[0,0]$ = hệ số DC (độ sáng trung bình khối); càng về góc dưới-phải càng là tần số cao.

### 6.2 Quy trình JPEG (5 bước)

1. **Đổi không gian màu** RGB → **YCbCr** (Y = độ sáng, Cb/Cr = màu). Mắt nhạy độ sáng hơn màu → có thể **giảm độ phân giải kênh màu** (chroma subsampling 4:2:0) trước cả khi DCT.
2. **Chia khối $8\times8$**, mỗi khối trừ đi 128 (đưa về quanh 0).
3. **DCT 2D** mỗi khối → ma trận hệ số $8\times8$.
4. **Lượng tử hóa (quantization)** — chia từng hệ số cho một số trong **bảng lượng tử** rồi làm tròn về số nguyên. Bảng có số **lớn ở góc tần số cao** → các hệ số đó bị chia thành **0**. *Đây là bước duy nhất làm mất thông tin (lossy)* và là nút điều khiển "mức chất lượng".
5. **Mã hóa** — quét zig-zag (gom các số 0 lại cuối), rồi nén run-length + Huffman (không mất thêm gì).

### 6.3 Walk-through ý tưởng lượng tử hóa

Giả sử sau DCT một khối cho ra (rút gọn, góc trên-trái):

$$F = \begin{bmatrix} 240 & 12 & 3 & 1 \\ 9 & 5 & 1 & 0 \\ 2 & 1 & 0 & 0 \\ 1 & 0 & 0 & 0 \end{bmatrix}$$

Năng lượng đã tự dồn vào góc trên-trái (240 là DC). Lượng tử hóa với bảng tăng dần (ví dụ $Q[u,v]$: nhỏ ở góc, lớn ở rìa), ví dụ chia DC cho 16, các hệ số cao chia cho 40–80:

$$\text{round}(240/16)=15,\;\text{round}(12/16)=1,\;\text{round}(3/40)=0,\;\text{round}(1/80)=0,\dots$$

Kết quả lượng tử:

$$\hat{F} = \begin{bmatrix} 15 & 1 & 0 & 0 \\ 1 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

Từ 16 số → còn **3 số khác 0**. Quét zig-zag cho chuỗi `15, 1, 1, 0, 0, ... (0)` — đuôi toàn 0 nén cực gọn bằng run-length. **Đó là chỗ "nhỏ đi 10 lần" đến từ**: vứt các hệ số tần số cao (đã thành 0) mà mắt gần như không nhận ra.

❓ **Câu hỏi tự nhiên**
> *"Tại sao mắt không thấy mất chi tiết khi vứt tần số cao?"* — Vì hệ thị giác người (HVS) có **độ nhạy giảm dần theo tần số không gian** (contrast sensitivity function): với chi tiết rất nhỏ/tương phản nhẹ, mắt không phân biệt được. Bảng lượng tử JPEG được thiết kế dựa trên đường cong độ nhạy đó — vứt đúng phần mắt "mù".

⚠ **Lỗi thường gặp / artifact khối JPEG**: nén quá mạnh (chất lượng thấp) → bảng lượng tử quá thô → mỗi khối $8\times8$ gần như chỉ còn DC + vài hệ số thấp → các khối trở thành những **ô vuông màu phẳng**, lộ rõ **lưới khối $8\times8$** (blocking artifact), và **gợn sóng quanh cạnh sắc/chữ** (ringing do mất tần số cao). Đây là lý do ảnh JPEG nén kiệt nhìn "rỗ ô vuông" — đặc biệt ở vùng chữ trên nền phẳng.

🔁 **Dừng lại tự kiểm tra**
<details><summary>Bước nào của JPEG là lossy (mất thông tin không hoàn lại), bước nào lossless?</summary>

**Lossy**: chroma subsampling và đặc biệt **lượng tử hóa** (làm tròn về số nguyên, nhiều hệ số thành 0 — không khôi phục được). **Lossless**: DCT (về lý thuyết khả nghịch), quét zig-zag, run-length + Huffman. Muốn JPEG chất lượng cao hơn ⇒ dùng bảng lượng tử "nhẹ tay" hơn ở bước 4.
</details>

📝 **Tóm tắt mục 6**
- JPEG: YCbCr → khối $8\times8$ → DCT → **lượng tử hóa (lossy)** → zig-zag + Huffman.
- Năng lượng dồn vào hệ số tần số thấp; vứt tần số cao = nén lớn, mắt ít thấy.
- Nén mạnh → blocking $8\times8$ + ringing quanh cạnh.

---

## 7. Ứng dụng

| Ứng dụng | Dùng kỹ thuật nào | Ý chính |
|---|---|---|
| **Nén ảnh/video** | DCT + lượng tử (JPEG); biến thể trong H.264/HEVC | Vứt tần số cao mắt ít nhạy → file nhỏ |
| **Khử nhiễu (denoise)** | low-pass / band-pass; lọc trong miền tần số | Nhiễu hạt = tần số cao → giảm nó |
| **Làm nét / phục hồi** | high-pass, sharpen, deconvolution | Khuếch đại tần số cao có chọn lọc |
| **Bắt cạnh / thị giác máy** | Sobel, Laplacian (high-pass) | Tiền xử lý cho nhận dạng, CNN |
| **Watermark** | nhúng tín hiệu vào hệ số DCT/DFT tần số trung | Bền với nén & crop, mắt không thấy |
| **Ảnh y khoa (MRI/CT)** | MRI **đo trực tiếp trong miền tần số (k-space)**, rồi IDFT | Tái tạo ảnh; lọc bỏ artifact |

💡 Watermark trong miền tần số bền hơn nhúng thẳng vào pixel: nén JPEG xóa pixel nhưng vẫn giữ tần số trung; thay đổi nhẹ vài hệ số DCT thì mắt không thấy mà máy giải mã ra được.

📝 **Tóm tắt mục 7**
- Cùng một bộ công cụ (DFT/DCT + lọc) phục vụ nén, khử nhiễu, làm nét, bắt cạnh, watermark, ảnh y khoa.
- MRI đặc biệt: dữ liệu thô **đã ở miền tần số** (k-space) — IDFT ra ảnh.

---

## Bài tập

1. **(Pixel & tần số)** Cho hai patch $1\times8$: `A = [50,50,50,50,50,50,50,50]` và `B = [50,200,50,200,50,200,50,200]`. Patch nào có tần số không gian cao hơn? Nếu chỉ giữ thành phần DC, mỗi patch tái tạo thành gì?

2. **(DC của DFT 2D)** Tính $F[0,0]$ cho ảnh $3\times3$ với mọi pixel bằng 40. Giá trị này liên hệ thế nào với độ sáng trung bình?

3. **(Tích chập kernel)** Áp kernel **Laplacian** $\begin{bmatrix}0&1&0\\1&-4&1\\0&1&0\end{bmatrix}$ lên patch $\begin{bmatrix}10&10&10\\10&50&10\\10&10&10\end{bmatrix}$, tính pixel tâm. Giải thích kết quả (vùng phẳng vs điểm nhô).

4. **(Lọc tần số)** Bạn muốn (a) làm mờ ảnh để giấu nhiễu hạt; (b) làm nổi viền chữ để OCR. Mỗi trường hợp dùng low-pass hay high-pass? Vì sao?

5. **(JPEG)** Một khối DCT sau lượng tử còn `[[20,2,0,0],[1,0,0,0],[0,0,0,0],[0,0,0,0]]`. Có bao nhiêu hệ số khác 0 / tổng 16? Nếu tăng mức nén (bảng lượng tử thô hơn), số hệ số khác 0 và artifact thay đổi ra sao?

6. **(Mở rộng)** Giải thích bằng định lý tích chập vì sao "blur bằng kernel Gaussian trong miền không gian" và "nhân phổ với Gaussian low-pass trong miền tần số" cho cùng kết quả.

---

## Lời giải chi tiết

### Bài 1
- **A** hoàn toàn phẳng (mọi giá trị 50) → chỉ có thành phần DC, **tần số = 0**. **B** đảo `50↔200` mỗi mẫu → dao động nhanh nhất có thể (Nyquist) → **tần số cao nhất**. Vậy **B** cao hơn.
- Giữ chỉ DC = thay mọi mẫu bằng trung bình:
  - A: trung bình = 50 → `[50,...,50]` (không đổi, vì vốn đã phẳng).
  - B: trung bình = $(50+200)/2 = 125$ → `[125,125,...,125]` — toàn bộ dao động biến mất, thành một mức xám phẳng. Minh họa "bỏ tần số cao = mất chi tiết".

### Bài 2
$F[0,0] = \sum_x\sum_y f[x,y] = 9 \times 40 = \mathbf{360}$. Độ sáng trung bình $= F[0,0]/(MN) = 360/9 = 40$ — đúng bằng giá trị pixel. Tổng quát $F[0,0] = (\text{trung bình}) \times MN$, nên DC chính là độ sáng tổng thể của ảnh (chưa chuẩn hóa).

### Bài 3
Correlation tâm-với-tâm:
$$g = 0\cdot10 + 1\cdot10 + 0\cdot10 + 1\cdot10 + (-4)\cdot50 + 1\cdot10 + 0\cdot10 + 1\cdot10 + 0\cdot10$$
$$= 10 + 10 - 200 + 10 + 10 = -160$$
Pixel tâm $50 \to -160$ (kẹp về 0 khi hiển thị, hoặc lấy trị tuyệt đối/offset 128 để xem). Tổng kernel $= 0$ ⇒ áp lên vùng phẳng (mọi pixel bằng nhau) cho **0**; chỉ ở **điểm nhô** (50 giữa nền 10) Laplacian mới phản ứng mạnh (giá trị âm lớn) — đúng bản chất "đạo hàm bậc 2 bắt cạnh/điểm".

### Bài 4
- **(a) Khử nhiễu hạt → low-pass.** Nhiễu hạt là tần số cao; low-pass (Gaussian blur) giảm tần số cao → nhiễu mờ đi (đánh đổi: cạnh cũng mềm hơn).
- **(b) Nổi viền chữ cho OCR → high-pass** (hoặc Sobel/Laplacian). Viền chữ là tần số cao; high-pass bỏ nền phẳng (tần số thấp), giữ đường viền → chữ tách khỏi nền, dễ nhị phân hóa.

### Bài 5
- Hệ số khác 0: `20, 2, 1` → **3 / 16**. (13 hệ số bằng 0, chủ yếu ở tần số cao.)
- Tăng nén ⇒ bảng lượng tử chia số lớn hơn ⇒ thêm nhiều hệ số bị làm tròn về 0 ⇒ **số hệ số khác 0 giảm** (có thể chỉ còn DC). Hệ quả thị giác: mỗi khối $8\times8$ phẳng dần → **blocking artifact** (lộ lưới ô vuông) và **ringing** quanh cạnh sắc tăng lên. File nhỏ hơn nhưng "rỗ ô".

### Bài 6
**Định lý tích chập** (mở rộng 2D từ [Tier1 L04](../../01-Foundations/lesson-04-convolution/)): tích chập trong miền không gian ⇔ **nhân** trong miền tần số:
$$f * h \;\xleftrightarrow{\;\mathcal{F}\;}\; F \cdot H$$
Kernel Gaussian $h$ có biến đổi Fourier $H$ cũng là một Gaussian (Fourier của Gaussian là Gaussian) — chính là mặt nạ Gaussian low-pass. Do đó: "tích chập ảnh với $h$ (blur trong miền không gian)" và "nhân $F$ với $H$ rồi IDFT (low-pass trong miền tần số)" là **hai cách tính của cùng một phép toán** → cùng kết quả. Chọn cách nào tùy chi phí: kernel nhỏ → tích chập trực tiếp rẻ hơn; kernel lớn → đi qua FFT rẻ hơn.

---

## Code & Minh họa

- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Kernel trên ảnh nhỏ**: chọn blur/sharpen/Sobel/Laplacian áp lên ảnh procedural (sọc/ô vuông/gradient), xem trước–sau + kernel $3\times3$.
  2. **Phổ Fourier 2D**: vẽ ảnh pattern + $|F[u,v]|$ (magnitude, log scale); che vùng tần số cao/thấp → ảnh tái tạo đổi (mờ/nét).
  3. **JPEG block $8\times8$**: trượt mức nén để thấy blocking artifact xuất hiện + số hệ số DCT giữ lại.

---

## Tham khảo & Bài tiếp theo

- **Tiền đề**: [Tier1 L04 — Tích chập](../../01-Foundations/lesson-04-convolution/) · [Tier2 L09 — DFT](../../02-Fourier/lesson-04-dft/) · [Floating-point](../../../DataFoundations/01-NumberRepresentation/lesson-03-floating-point/)
- **Liên hệ**: [AI-ML — CNN (kernel học được)](../../../AI-ML/)
- **Bài tiếp theo**: [L15 — Điều chế (Modulation)](../lesson-04-modulation/)
</content>
</invoke>
