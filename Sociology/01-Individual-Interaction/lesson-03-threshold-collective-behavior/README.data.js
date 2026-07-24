// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Sociology/01-Individual-Interaction/lesson-03-threshold-collective-behavior/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Mô hình ngưỡng & hành vi tập thể (Threshold Models of Collective Behavior)

> Hai đám đông giống nhau gần như y hệt — lệch **đúng một người** — nhưng một đám bùng phát bạo động toàn bộ còn đám kia tắt ngóm sau đúng một người. Đó là nghịch lý Granovetter, và nó nói rằng: **không thể suy ra kết cục tập thể chỉ từ "thái độ trung bình" của các cá nhân.**

## Mục tiêu học tập

- Định nghĩa được **ngưỡng cá nhân (individual threshold)** trong hành vi tập thể — kèm ví dụ số.
- Mô tả **cơ chế lan (cascade)** bằng phép đếm từng vòng: $n_0 \\to n_1 \\to n_2 \\to \\dots$ tới **điểm dừng (equilibrium)**.
- Tự tay tính được **cân bằng cuối** từ một phân bố ngưỡng cho trước.
- Hiểu **nghịch lý Granovetter**: phân bố ngưỡng gần y hệt, lệch một người, cho kết cục hoàn toàn khác — và rút ra bài học phương pháp luận.
- Phân biệt **bùng phát (tipping)** vs **tắt ngóm (fizzle)** vs **cân bằng bộ phận (partial)** khi dịch chuyển phân bố ngưỡng.

## Kiến thức tiền đề

- Chỉ cần số học cộng và so sánh — không cần thống kê nâng cao.
- Nên đọc trước [Lesson 02 — Mô hình phân tách Schelling](../lesson-02-schelling-segregation/): đó cũng là một mô hình "cá nhân → kết cục tập thể bất ngờ". Threshold model là người anh em: thay vì *vị trí* trên lưới, ở đây cái quyết định là *thứ tự thời gian* mọi người lần lượt tham gia.

---

## 1. Bức tranh lớn: vì sao đám đông "khó đoán"?

> 💡 **Trực giác.** Hình dung một quảng trường có 100 người đang phân vân *"có nên tham gia biểu tình / hô theo / ném đá không?"*. Không ai giống ai: có người **máu lửa**, chỉ cần thấy 1 người ra tay là nhảy vào; có người **thận trọng**, phải thấy quá nửa đám đông đã tham gia mới dám; có người **cứng đầu**, gần như không bao giờ tham gia dù cả phố đã loạn. Câu hỏi tự nhiên: *biết "tính khí" từng người rồi, ta đoán được đám đông sẽ bùng phát hay im lặng không?*

Trực giác ngây thơ bảo: *"đám nào toàn người máu lửa thì bùng, đám nào toàn người thận trọng thì im."* Nghe hợp lý. **Nhưng nó sai một cách nguy hiểm.** Bài này sẽ chỉ ra: hai đám đông có "tính khí" gần như trùng khít nhau vẫn có thể cho hai kết cục trái ngược — một bên loạn hết 100 người, một bên đúng 1 người rồi thôi.

Điều làm nên khác biệt không phải là *người ta nghĩ gì*, mà là **các ngưỡng khớp với nhau thành chuỗi hay không** — có đủ người ở mỗi mức để "chuyền lửa" liên tục hay không. Nhà xã hội học Mark Granovetter đưa ra mô hình này năm 1978 để giải thích chính xác chuyện đó.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Mô hình này áp dụng cho cái gì ngoài bạo động?"* → Rất rộng: tin đồn lan trong công ty, quyết định đình công, mua theo (một sản phẩm "hot"), rời bỏ một nền tảng mạng xã hội, vỗ tay tán thưởng, thậm chí bỏ học giữa buổi. Bất cứ đâu quyết định của tôi phụ thuộc vào **số người đã làm trước tôi**.
> - *"Vậy nó khác gì hiệu ứng đám đông thông thường?"* → Điểm mới là **lượng hóa**: mỗi người một con số ngưỡng, và kết cục tính được bằng phép đếm — không cần đoán mò.

---

## 2. Ngưỡng cá nhân — định nghĩa đầy đủ

### 2.1 Ngưỡng là gì

**(a) Là gì.** **Ngưỡng (threshold)** của một người là **số người phải đang tham gia trước** thì người đó mới tham gia theo. Gọi ngưỡng của người $i$ là $t_i$. Quy tắc:

$$\\text{Người } i \\text{ tham gia} \\iff (\\text{số người đã tham gia}) \\ge t_i$$

**(b) Vì sao cần khái niệm này.** Để **tách bạch hai thứ hay bị nhập nhèm**: (1) *xu hướng cá nhân* — anh cần bao nhiêu người trước mới nhập cuộc, và (2) *kết cục tập thể* — cuối cùng có bao nhiêu người tham gia. Ngưỡng đo đúng thứ (1). Ta sẽ thấy thứ (2) **không** đọc thẳng ra được từ trung bình của thứ (1).

**(c) Ví dụ số cụ thể** (≥ 4, đa dạng "tính khí"):

| Người | Ngưỡng $t_i$ | Diễn giải |
|-------|:---:|-----------|
| Kẻ châm ngòi (instigator) | $0$ | Ra tay ngay cả khi **không ai** tham gia. Đây là ngòi nổ. |
| Người máu lửa | $1$ | Chỉ cần thấy **1** người là nhập cuộc. |
| Người trung dung | $25$ | Phải thấy **25** người đã tham gia mới theo. |
| Người thận trọng | $50$ | Chờ **quá nửa** đám đông (trong nhóm 100). |
| Kẻ cứng đầu | $99$ | Gần như bất khả — cần **99** người trước. |

> ⚠ **Lỗi thường gặp.** Đọc "ngưỡng cao = người xấu/cực đoan". **Sai.** Ngưỡng chỉ đo *độ nhạy với số đông*, không đo đạo đức hay quan điểm. Người ngưỡng 0 có thể chỉ là người thích chạy theo phong trào nhất, người ngưỡng 99 chỉ là người rất dè dặt. Đừng gán nhãn tính cách từ con số ngưỡng.

### 2.2 Phân bố ngưỡng của cả đám đông

Gom ngưỡng của tất cả $N$ người lại thành một **phân bố (distribution)**. Cách gọn nhất để làm việc với nó là **hàm đếm tích lũy**:

$$F(x) = \\big|\\{\\, i : t_i \\le x \\,\\}\\big| = \\text{số người có ngưỡng} \\le x$$

Đọc $F(x)$ là: *"nếu hiện đang có $x$ người tham gia, thì có $F(x)$ người **sẵn sàng** tham gia."*

**Ví dụ số.** Đám đông 10 người, ngưỡng là $\\{0, 1, 2, 2, 3, 4, 6, 7, 8, 9\\}$:

| $x$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|-----|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:--:|
| $F(x)$ | 1 | 2 | 4 | 5 | 6 | 6 | 7 | 8 | 9 | 10 | 10 |

Chú ý $F(2)=4$ vì có **hai** người ngưỡng 2; và $F(5)=6=F(4)$ vì **không ai** có ngưỡng 5.

> 📝 **Tóm tắt mục 2.**
> - Ngưỡng $t_i$ = số người phải tham gia trước để người $i$ nhập cuộc.
> - Người $i$ tham gia khi (số đang tham gia) $\\ge t_i$.
> - $F(x)$ = số người sẵn sàng tham gia khi đang có $x$ người — công cụ tính toán chính.
> - Ngưỡng đo *độ nhạy với đám đông*, **không** đo đạo đức/quan điểm.

---

## 3. Cơ chế lan: đếm từng vòng tới điểm dừng

> 💡 **Trực giác.** Giống hiệu ứng domino. Kẻ châm ngòi (ngưỡng 0) ngã trước. Bây giờ có 1 người tham gia → những ai ngưỡng $\\le 1$ cũng ngã theo. Số người tăng lên → lại kích hoạt những ngưỡng cao hơn... Cứ thế, mỗi vòng ta **đếm lại** xem với số người hiện tại thì tổng cộng bao nhiêu người sẵn sàng. Domino dừng khi **không còn ai mới bị kích hoạt**.

### 3.1 Công thức lặp

Gọi $n_t$ = số người đang tham gia sau vòng $t$. Bắt đầu $n_0 = 0$ (chưa ai). Mỗi vòng:

$$n_{t+1} = F(n_t)$$

Quá trình dừng khi $n_{t+1} = n_t$. Giá trị cố định đó, gọi là $n^*$, thỏa

$$\\boxed{\\,F(n^*) = n^*\\,}$$

và được gọi là **điểm cân bằng / điểm dừng (equilibrium)**. Về mặt hình học, $n^*$ là chỗ đường cong $F(x)$ **cắt** đường chéo $y = x$.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao chắc chắn dừng, không lặp vô tận?"* → Vì $F$ không giảm (thêm người tham gia không làm ai đã sẵn sàng rút lui) và bị chặn trên bởi $N$. Dãy $n_0 \\le n_1 \\le n_2 \\le \\dots \\le N$ tăng và bị chặn → phải dừng. Nó dừng ở **điểm cố định nhỏ nhất** $\\ge 0$.
> - *"Thứ tự ai tham gia trước có quan trọng không?"* → Trong mô hình cơ bản này, không — kết cục $n^*$ chỉ phụ thuộc phân bố ngưỡng, không phụ thuộc ai bấm nút trước. Ta cứ đếm gộp mỗi vòng.

### 3.2 Walk-through: cân bằng bộ phận (partial)

Dùng lại đám 10 người ở mục 2.2, ngưỡng $\\{0, 1, 2, 2, 3, 4, 6, 7, 8, 9\\}$. Đếm từng vòng:

| Vòng $t$ | Đang có $n_t$ | Ai sẵn sàng? $F(n_t)$ | $n_{t+1}$ | Ghi chú |
|:-:|:-:|:-:|:-:|---|
| 0 | 0 | $F(0)=1$ | 1 | kẻ châm ngòi (ngưỡng 0) ra tay |
| 1 | 1 | $F(1)=2$ | 2 | người ngưỡng 1 theo |
| 2 | 2 | $F(2)=4$ | 4 | **hai** người ngưỡng 2 cùng nhảy vào |
| 3 | 4 | $F(4)=6$ | 6 | ngưỡng 3 và 4 theo |
| 4 | 6 | $F(6)=7$ | 7 | ngưỡng 6 theo |
| 5 | 5? | — | — | *(xem bên dưới)* |

Khoan — ở vòng 4 tôi cần thận trọng. Ta đang đi $n_3 = 4 \\to n_4 = F(4) = 6$. Nhưng đám này có ai ngưỡng 5 đâu, nên hãy đếm lại cho đúng dãy:

$$0 \\xrightarrow{F} 1 \\xrightarrow{F} 2 \\xrightarrow{F} 4 \\xrightarrow{F} 6 \\xrightarrow{F} 7 \\xrightarrow{F} 8 \\xrightarrow{F} 9 \\xrightarrow{F} 10 \\xrightarrow{F} 10$$

Vậy đám này **bùng phát toàn bộ**: $n^* = 10$. (Nhảy $2\\to4$ vì hai người ngưỡng 2 vào cùng lúc.)

Giờ đổi **đúng một chỗ** để thấy "cân bằng bộ phận": bỏ người ngưỡng 4, thay bằng người ngưỡng 5 → ngưỡng $\\{0, 1, 2, 2, 3, 6, 6, 7, 8, 9\\}$. Lúc này $F(3)=5$, $F(4)=5$, $F(5)=5$:

| Vòng $t$ | $n_t$ | $F(n_t)$ | $n_{t+1}$ |
|:-:|:-:|:-:|:-:|
| 0 | 0 | 1 | 1 |
| 1 | 1 | 2 | 2 |
| 2 | 2 | 4 | 4 |
| 3 | 4 | 5 | 5 |
| 4 | 5 | **5** | 5 ← **dừng** |

$$0 \\to 1 \\to 2 \\to 4 \\to 5 \\to 5$$

**Dừng ở $n^* = 5$.** Vì sao? Bước tiếp theo cần kích hoạt người ngưỡng 6 (có **hai** người ở đó), nhưng muốn thế phải có 6 người đang tham gia — mà chỉ có 5. Cả hai người ngưỡng 6 đứng nhìn nhau chờ người thứ 6, và không bao giờ có. Đó là **cân bằng bộ phận**: không tắt hẳn, cũng không bùng hết, kẹt lại ở 5.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Với phân bố $\\{0,1,2,2,3,6,6,7,8,9\\}$, nếu ta thêm **một** người ngưỡng 5 (thành 11 người) thì cân bằng cuối là bao nhiêu?
> 2. "Điểm dừng" trên đồ thị $F$ và $y=x$ nằm ở đâu?
>
> <details><summary>Đáp án</summary>
>
> 1. Thêm người ngưỡng 5: giờ $F(5)=6$. Dãy: $0\\to1\\to2\\to4\\to5\\to F(5)=6 \\to F(6)=8 \\to F(8)=10 \\to F(10)=11 \\to 11$. **Bùng phát toàn bộ 11/11.** Một người ngưỡng 5 đúng chỗ đã "bắc cầu" qua khe kẹt! Đây chính là mầm mống của nghịch lý ở mục 4.
> 2. Ở $x=5$: $F(5)=5$ nằm **đúng trên** đường chéo $y=x$ → giao điểm → điểm dừng.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Lặp $n_{t+1} = F(n_t)$ từ $n_0 = 0$ cho tới khi không đổi.
> - Điểm dừng $n^*$ thỏa $F(n^*) = n^*$ = giao của $F$ với đường chéo.
> - Ba kiểu kết cục: **bùng phát** (tới $N$), **tắt ngóm** (kẹt ở gần 0), **cân bằng bộ phận** (kẹt ở giữa).
> - Quá trình luôn dừng vì dãy tăng và bị chặn bởi $N$.

---

## 4. Nghịch lý Granovetter: lệch một người → đổi cả kết cục

Đây là trái tim của bài học. Ta so hai đám đông **100 người** khác nhau **đúng một người**.

### 4.1 Đám A — bùng phát toàn bộ

**Đám A:** mỗi ngưỡng $0, 1, 2, \\dots, 99$ có **đúng một người**. Phân bố "đều tăm tắp".

$F(x) = x + 1$ (số người có ngưỡng $\\le x$). Đếm:

$$0 \\xrightarrow{F} 1 \\xrightarrow{F} 2 \\xrightarrow{F} 3 \\xrightarrow{F} \\cdots \\xrightarrow{F} 99 \\xrightarrow{F} 100 \\xrightarrow{F} 100$$

Mỗi vòng thêm đúng một người: kẻ ngưỡng 0 châm ngòi → có 1 người → kẻ ngưỡng 1 vào → có 2 → kẻ ngưỡng 2 vào → ... domino chạy trọn. **$n^*_A = 100$: cả 100 người tham gia.**

### 4.2 Đám B — tắt ngóm

**Đám B:** lấy y hệt đám A nhưng **một người duy nhất** — người ngưỡng 1 — đổi thành ngưỡng 2. Giờ phân bố là: một người ngưỡng 0, **không ai** ngưỡng 1, **hai người** ngưỡng 2, rồi $3, 4, \\dots, 99$ mỗi mức một người.

$F(0) = 1$, nhưng $F(1) = 1$ (không còn ai ngưỡng 1). Đếm:

$$0 \\xrightarrow{F} 1 \\xrightarrow{F} 1 \\quad\\Rightarrow\\quad \\textbf{dừng}$$

Kẻ ngưỡng 0 ra tay → có 1 người. Bước tiếp cần người ngưỡng $\\le 1$ nào chưa vào — **không còn ai**. Hai người ngưỡng 2 chờ người thứ 2, mãi mãi không tới. **$n^*_B = 1$: đúng một người rồi tắt.**

### 4.3 Đối chiếu

| | Đám A | Đám B | Khác biệt |
|---|:-:|:-:|---|
| Phân bố ngưỡng | $0,1,2,3,\\dots,99$ | $0,\\underline{2},2,3,\\dots,99$ | **1 người**: ngưỡng $1 \\to 2$ |
| Ngưỡng trung bình | $49{.}5$ | $49{.}51$ | chênh $0{.}01$ |
| **Cân bằng cuối $n^*$** | **100** | **1** | **chênh 99 người!** |

> ⚠ **Bài học phương pháp luận (điểm quan trọng nhất bài).** Nhìn vào kết cục: đám A "bạo động toàn phần", đám B "đám đông ôn hòa, chỉ một kẻ quá khích". Người quan sát dễ kết luận *"dân đám A cực đoan hơn hẳn dân đám B"*. **Hoàn toàn sai** — hai đám có tính khí gần như trùng khít (trung bình lệch $0{.}01$). Kết cục khác nhau vì **cấu trúc chuỗi ngưỡng**, không vì con người khác nhau. Vậy: **không được suy ngược từ hành vi tập thể ra thái độ cá nhân.** Đây là lý do Granovetter viết bài này — đập lại lối giải thích "đám đông làm X vì họ là loại người thích X".

### 4.4 Thêm ví dụ số ở quy mô nhỏ (dễ kiểm tra tay)

Để tự tính được, đây là cặp 10 người phản chiếu đúng nghịch lý trên:

**Đám C** (ngưỡng $\\{0,1,2,2,3,4,6,7,8,9\\}$): dãy $0\\to1\\to2\\to4\\to6\\to7\\to8\\to9\\to10$. **$n^*_C = 10$ — bùng phát.**

**Đám D** = đám C nhưng người ngưỡng 1 đổi thành ngưỡng 2, tức $\\{0,2,2,2,3,4,6,7,8,9\\}$: $F(0)=1$, $F(1)=1$. Dãy $0\\to1\\to1$. **$n^*_D = 1$ — tắt ngóm.**

Lại đúng một người lệch (ngưỡng $1 \\to 2$) → kết cục nhảy từ 10 xuống 1.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Có phải cứ đổi bất kỳ một người nào cũng lật kết cục không?"* → Không. Chỉ những người ở **mắt xích tới hạn** (chỗ chuỗi đang khít sát $y=x$) mới có sức lật. Đổi người ngưỡng 70 trong đám A (khi domino đã chạy qua đó) chẳng ảnh hưởng gì. Sức mạnh nằm ở **vị trí trong chuỗi**, không phải bản thân con số.
> - *"Vậy dự báo bạo động là bất khả?"* → Không hẳn — nhưng nó cảnh báo rằng dự báo dựa trên "khảo sát thái độ trung bình" là **mong manh**: một thay đổi nhỏ trong phân bố (một người do dự hơn, một tin nhắn làm ai đó chùn tay) có thể lật kết cục. Cần biết **cả hình dạng phân bố**, không chỉ trung bình.

> 🔁 **Dừng lại tự kiểm tra.** Đám 5 người có ngưỡng $\\{0, 1, 3, 3, 4\\}$. Cân bằng cuối là bao nhiêu? Nó thuộc kiểu nào (bùng/tắt/bộ phận)?
>
> <details><summary>Đáp án</summary>
>
> $F(0)=1, F(1)=2, F(2)=2, F(3)=4, F(4)=5$. Dãy: $0 \\to F(0)=1 \\to F(1)=2 \\to F(2)=2$ → **dừng ở 2**. $n^* = 2$ — **cân bằng bộ phận**. Kẹt lại vì hai người ngưỡng 3 cần 3 người trước, mà chỉ có 2.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Đám A ($0..99$) → $n^* = 100$; đám B (một người $1\\to2$) → $n^* = 1$. Lệch **1 người**, kết cục chênh **99**.
> - Kết cục tập thể **không** đọc ra được từ trung bình thái độ cá nhân.
> - Sức lật nằm ở **mắt xích tới hạn** của chuỗi ngưỡng, không phải ở "loại người".
> - Cặp nhỏ C/D ($n^*=10$ vs $1$) cho phép kiểm tra bằng tay.

---

## 5. Bùng phát vs tắt ngóm: dịch chuyển cả phân bố

Nghịch lý ở mục 4 là thay đổi *một* người. Giờ xét thay đổi *cả đám* một chút: **dịch mọi ngưỡng xuống** (ai cũng bớt do dự đi một chút).

> 💡 **Trực giác.** Hình dung đường cong $F(x)$ và đường chéo $y=x$. Nếu $F$ nằm **trên** đường chéo suốt đoạn đầu, domino chạy trọn → bùng phát. Nếu $F$ **thọt xuống dưới** đường chéo ở đâu đó, domino kẹt ngay tại đó → tắt/bộ phận. Dịch phân bố ngưỡng xuống = nhấc cả đường $F$ lên → dễ vượt đường chéo hơn → **bùng phát**. Đây là **điểm tới hạn (tipping point)**.

**Ví dụ số.** Đám 6 người, ngưỡng $\\{1, 2, 3, 3, 4, 5\\}$ (không có kẻ châm ngòi ngưỡng 0):
- $F(0) = 0$ → chẳng ai bắt đầu → $n^* = 0$. **Tắt hoàn toàn**, phong trào chết từ trong trứng.

Giờ dịch mọi ngưỡng **xuống 1**: $\\{0, 1, 2, 2, 3, 4\\}$:
- $F(0)=1, F(1)=2, F(2)=4, F(3)=5, F(4)=6$. Dãy $0\\to1\\to2\\to4\\to5\\to6\\to6$. **$n^* = 6$ — bùng phát toàn bộ!**

Chỉ cần **xuất hiện một kẻ châm ngòi** (ai đó tụt ngưỡng xuống 0) là toàn bộ chuỗi khởi động. Đây là lý do phong trào cần "người đi đầu": không có người ngưỡng 0, đám đông dù rất máu vẫn đứng im vì **không ai dám nổ phát súng đầu**.

> ⚠ **Lỗi thường gặp.** Nghĩ "tăng số người máu lửa (ngưỡng thấp) thì luôn dễ bùng hơn". Đúng về xu hướng nhưng **không tuyến tính**: có những khoảng thêm người chẳng đổi gì, rồi vượt một mốc là **nhảy vọt** từ tắt sang bùng. Kết cục là hàm **bậc thang**, không mượt.

**Liên hệ.** Đây chính là kiểu **điểm tới hạn** ta đã gặp ở [Lesson 02 — Schelling](../lesson-02-schelling-segregation/): một thay đổi nhỏ trong tham số cá nhân (mức chịu đựng / ngưỡng) đẩy hệ vượt mốc và lật sang trạng thái vĩ mô hoàn toàn khác. Chủ đề "vi mô → vĩ mô phi tuyến" sẽ còn trở lại xuyên suốt Tầng 1.

> 📝 **Tóm tắt mục 5.**
> - Dịch phân bố ngưỡng xuống = nhấc $F$ lên → dễ vượt đường chéo → bùng phát.
> - Không có **kẻ châm ngòi (ngưỡng 0)** thì phong trào không thể khởi động, dù đám đông sẵn sàng.
> - Kết cục là hàm **bậc thang** theo tham số phân bố: có điểm tới hạn, qua đó nhảy vọt.

---

## 6. Ứng dụng thực tế

Cùng một phép đếm, đổi tên "tham gia" thành nhiều thứ:

| Bối cảnh | "Tham gia" nghĩa là | Ngưỡng $t_i$ nghĩa là |
|----------|---------------------|------------------------|
| Bạo động / biểu tình | Ra tay / xuống đường | Cần bao nhiêu người đã xuống đường |
| Tin đồn công ty | Kể lại cho người khác | Nghe từ bao nhiêu người mới tin & lan |
| Đình công | Nghỉ việc theo | Cần bao nhiêu đồng nghiệp đã nghỉ |
| Mua hàng "hot" | Xuống tiền mua | Thấy bao nhiêu người quanh mình đã mua |
| Rời mạng xã hội | Xóa tài khoản | Bao nhiêu bạn bè đã rời trước |

Trong mọi trường hợp, câu hỏi *"phong trào sẽ bùng hay tắt?"* quy về đúng một phép đếm $n_{t+1} = F(n_t)$ tới điểm dừng — điều mà **[visualization.html](./visualization.html)** cho bạn nghịch trực tiếp.

---

## 7. Bài tập

**Bài 1 (đếm cơ bản).** Đám 8 người có ngưỡng $\\{0, 0, 1, 3, 3, 4, 6, 7\\}$. Tính $F(x)$ cho $x = 0,1,\\dots,8$, rồi đếm từng vòng để tìm cân bằng cuối $n^*$. Đây là kiểu bùng / tắt / bộ phận?

**Bài 2 (nghịch lý mini).** Cho đám 6 người ngưỡng $\\{0, 1, 2, 3, 4, 5\\}$.
- (a) Tính $n^*$.
- (b) Đổi **đúng một người** để biến kết cục từ bùng phát thành "kẹt ở đúng 1 người". Chỉ ra đổi ai, thành ngưỡng bao nhiêu, và kiểm chứng bằng phép đếm.

**Bài 3 (tìm điểm tới hạn).** Đám 5 người ngưỡng $\\{2, 2, 3, 3, 4\\}$.
- (a) Cân bằng cuối là bao nhiêu? Giải thích tại sao.
- (b) Cần **hạ ngưỡng của một người xuống 0** (biến họ thành kẻ châm ngòi). Sau khi có kẻ châm ngòi đó, cân bằng cuối là bao nhiêu?

**Bài 4 (vận dụng).** Một nhóm chat 100 người sẽ chia sẻ lại một tin đồn. Phân bố ngưỡng: một người ngưỡng 0, và với mỗi $k = 5, 10, 15, \\dots, 95$ có $5$ người ngưỡng $k$ (tổng $1 + 20\\times5 = 101$… hãy chỉnh về đúng 100 bằng cách bỏ 1 người ở ngưỡng 95). Không cần tính chi tiết từng vòng — chỉ cần lập luận: tin đồn có lan rộng không, và điểm kẹt (nếu có) nằm quanh đâu?

---

## 8. Lời giải chi tiết

**Bài 1.** Ngưỡng $\\{0,0,1,3,3,4,6,7\\}$, $N = 8$.

Hàm đếm tích lũy:

| $x$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-----|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| $F(x)$ | 2 | 3 | 3 | 5 | 6 | 6 | 7 | 8 | 8 |

($F(0)=2$ vì **hai** người ngưỡng 0.) Đếm từng vòng từ $n_0 = 0$:

$$0 \\xrightarrow{F} 2 \\xrightarrow{F} 3 \\xrightarrow{F} 5 \\xrightarrow{F} 6 \\xrightarrow{F} 7 \\xrightarrow{F} 8 \\xrightarrow{F} 8$$

Từng bước: $F(0)=2,\\ F(2)=3,\\ F(3)=5,\\ F(5)=6,\\ F(6)=7,\\ F(7)=8,\\ F(8)=8$ (dừng). **$n^* = 8$ — bùng phát toàn bộ.** Hai kẻ châm ngòi giúp vượt qua khe (chỉ 1 người ngưỡng 1) ngay từ đầu.

**Bài 2.** Ngưỡng $\\{0,1,2,3,4,5\\}$, $N=6$. Đây là kiểu "đều tăm tắp" như đám A.
- (a) $F(x) = x+1$. Dãy $0\\to1\\to2\\to3\\to4\\to5\\to6\\to6$. **$n^* = 6$ — bùng phát.**
- (b) Cách tiếp cận: cắt chuỗi ngay mắt xích đầu tiên. Đổi người **ngưỡng 1 thành ngưỡng 2**. Phân bố mới $\\{0,2,2,3,4,5\\}$: $F(0)=1$, $F(1)=1$. Dãy $0\\to1\\to1$ → **dừng ở $n^*=1$**. Kẻ châm ngòi ra tay xong không ai nối tiếp vì khoảng ngưỡng 1 bị bỏ trống. (Đây đúng là nghịch lý Granovetter thu nhỏ.)

**Bài 3.** Ngưỡng $\\{2,2,3,3,4\\}$, $N=5$.
- (a) $F(0) = 0$ — **không ai** có ngưỡng 0, nên không ai khởi động → dãy $0 \\to F(0)=0$ dừng ngay. **$n^* = 0$: phong trào không bao giờ bắt đầu.** Mọi người đều chờ người khác đi trước, không ai chịu nổ phát đầu.
- (b) Hạ một người (chẳng hạn một người ngưỡng 2) xuống 0. Phân bố mới $\\{0,2,3,3,4\\}$: $F(0)=1, F(1)=1$. Dãy $0\\to1\\to1$ → **$n^* = 1$**. Có kẻ châm ngòi rồi, nhưng người kế cần ngưỡng $\\le 1$ — không có ai ngưỡng 1 → vẫn kẹt ở 1. Bài học: **một** kẻ châm ngòi là cần nhưng chưa đủ; còn phải có người ở các bậc kế tiếp để nối chuỗi.

**Bài 4.** Cách tiếp cận: kiểm tra chuỗi có "khe" nào rộng hơn bước nhảy của $F$ không.
- Có 1 kẻ châm ngòi (ngưỡng 0) → $n_1 = F(0) = 1$.
- Bậc ngưỡng kế tiếp là 5 (có 5 người). Muốn kích hoạt họ cần **5** người đang chia sẻ, nhưng sau vòng đầu mới có **1**. $F(1) = F(2) = F(3) = F(4) = 1$ (không ai có ngưỡng trong khoảng $1..4$).
- Vậy dãy $0 \\to 1 \\to 1$ → **dừng ở $n^* = 1$: tin đồn tắt ngay sau người đầu tiên.** Điểm kẹt nằm ở **khe từ 1 đến 5**: bước nhảy đầu tiên (1 người) không đủ chạm mốc 5 của nhóm đông đầu tiên.
- Muốn tin đồn lan: cần lấp khe này — ví dụ thêm vài người ngưỡng 1, 2, 3, 4 để "bắc cầu" từ kẻ châm ngòi lên tới nhóm ngưỡng 5. Đây lại là bài học "mắt xích tới hạn" ở mục 4.

> 📝 **Tóm tắt bài học.**
> - Ngưỡng $t_i$: số người phải tham gia trước để người $i$ nhập cuộc. Kết cục tính bằng lặp $n_{t+1} = F(n_t)$ tới điểm dừng $F(n^*) = n^*$.
> - Ba kết cục: bùng phát ($N$), tắt ngóm (gần 0), cân bằng bộ phận (giữa).
> - **Nghịch lý Granovetter**: hai phân bố lệch đúng một người (ngưỡng $1\\to2$) cho $n^* = 100$ vs $1$ — kết cục tập thể **không** suy được từ trung bình cá nhân.
> - Cần **kẻ châm ngòi (ngưỡng 0)** để khởi động, và chuỗi ngưỡng liền mạch (không khe rộng) để lan trọn.

---

## Bài tiếp theo

**[Lesson 04 — Bản sắc xã hội & nhóm (Social Identity & Groups)](../lesson-04-social-identity-groups/)**: từ "khi nào tôi tham gia theo số đông" sang "tôi thấy mình *thuộc về* nhóm nào" — cơ chế phân loại "chúng ta / bọn họ" và cách nó định hình hành vi.

Minh họa tương tác: **[visualization.html](./visualization.html)** — chỉnh phân bố ngưỡng, chạy cascade từng vòng, và tận mắt thấy nghịch lý "lệch một người đổi cả kết cục".
`;
