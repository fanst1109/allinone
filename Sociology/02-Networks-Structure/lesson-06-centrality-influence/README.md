# Lesson 06 — Trung tâm & ảnh hưởng (Centrality)

> Trong một mạng lưới xã hội, **ai là người quan trọng?** Câu trả lời phụ thuộc vào *bạn hỏi "quan trọng" theo nghĩa nào*. Bài này giới thiệu ba thước đo trung tâm (centrality) — mỗi cái đo một loại "quyền lực" khác nhau.

## Mục tiêu học tập

- Định nghĩa và tính được ba độ đo trung tâm: **degree** (bậc), **closeness** (độ gần), **betweenness** (độ trung gian).
- Hiểu **ý nghĩa xã hội** riêng của từng độ đo: phổ biến (popularity), lan tin nhanh, và vai trò cầu nối / gác cổng (gatekeeper).
- Nhận ra điểm mấu chốt: **một người có nhiều quan hệ chưa chắc là người kiểm soát luồng thông tin** — bậc cao ≠ betweenness cao.
- Xác định được **điểm xung yếu (articulation point)**: gỡ ai thì mạng vỡ thành nhiều mảnh.

## Kiến thức tiền đề

- [Lesson 05 — Mạng lưới xã hội](../lesson-05-social-networks/): khái niệm **đỉnh (node)**, **cạnh (edge)**, **đường đi (path)**, **bậc (degree)**, **đường đi ngắn nhất (shortest path)**. Bài này dựng trực tiếp trên các khái niệm đó.
- Số học cộng/chia đơn giản. Không cần đại số tuyến tính.

---

## 1. Bức tranh lớn: "quan trọng" là một câu hỏi có nhiều đáp án

> 💡 **Trực giác.** Hình dung một lớp học. Ai "quan trọng" nhất?
> - Người **quen nhiều bạn nhất** → tin đồn lan ra từ họ rất nhanh (đây là **degree**).
> - Người **ngồi giữa lớp, gần ai cũng gần** → ai cần nhắn gì cũng tới họ trước, họ cập nhật mọi chuyện sớm nhất (đây là **closeness**).
> - Người **duy nhất nói chuyện được với cả tổ A lẫn tổ B** đang giận nhau → mọi thông tin giữa hai tổ phải đi qua họ; họ có thể *chặn* hoặc *bóp méo* (đây là **betweenness** — vai trò cầu nối).
>
> Ba người này **có thể là ba người khác nhau**. Không có một con số "quan trọng" duy nhất — có ba câu hỏi khác nhau, ba thước đo khác nhau.

**Mạng ví dụ dùng xuyên suốt bài** — 9 người, chia hai nhóm nối nhau qua đúng một người:

<svg viewBox="0 0 600 220" style="max-width:600px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Mạng 9 người: nhóm 1 (A, B, C) và nhóm 2 (E, F, G, H) nối qua cầu A – D – M – E">
  <defs><marker id="cen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <line x1="74.4" y1="50.8" x2="124.0" y2="88.0" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="74.4" y1="149.2" x2="124.0" y2="112.0" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="60.0" y1="58.0" x2="60.0" y2="140.0" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="158.0" y1="100.0" x2="210.0" y2="100.0" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="248.0" y1="100.0" x2="300.0" y2="100.0" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="338.0" y1="100.0" x2="390.0" y2="100.0" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="428.0" y1="100.0" x2="480.0" y2="100.0" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="426.3" y1="92.5" x2="521.8" y2="48.4" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="426.3" y1="107.5" x2="521.8" y2="151.6" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="540.0" y1="58.0" x2="540.0" y2="140.0" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="510.0" y1="85.0" x2="528.9" y2="56.6" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="510.0" y1="115.0" x2="528.9" y2="143.4" stroke="#1a202c" stroke-width="1.8"/>
  <circle cx="60.0" cy="40.0" r="16" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="60.0" y="45.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">B</text>
  <circle cx="60.0" cy="160.0" r="16" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="60.0" y="165.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">C</text>
  <circle cx="140.0" cy="100.0" r="16" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
  <text x="140.0" y="105.0" fill="#15803d" font-size="13" text-anchor="middle" font-weight="700">A</text>
  <circle cx="230.0" cy="100.0" r="16" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="230.0" y="105.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">D</text>
  <circle cx="320.0" cy="100.0" r="16" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
  <text x="320.0" y="105.0" fill="#dc2626" font-size="13" text-anchor="middle" font-weight="700">M</text>
  <circle cx="410.0" cy="100.0" r="16" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
  <text x="410.0" y="105.0" fill="#15803d" font-size="13" text-anchor="middle" font-weight="700">E</text>
  <circle cx="500.0" cy="100.0" r="16" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="500.0" y="105.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">H</text>
  <circle cx="540.0" cy="40.0" r="16" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="540.0" y="45.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">F</text>
  <circle cx="540.0" cy="160.0" r="16" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="540.0" y="165.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">G</text>
  <text x="300.0" y="212.0" fill="#475569" font-size="11" text-anchor="middle">M là cầu nối (betweenness cao nhất) dù chỉ có 2 liên kết</text>
</svg>

Cụ thể (cạnh = có quan hệ hai chiều):

- **Nhóm 1** = {A, B, C, D}. Cạnh: `A–B`, `A–C`, `A–D`, `B–C`. Node **A** là "hub" của nhóm 1 (nối B, C, D).
- **Nhóm 2** = {E, F, G, H}. Cạnh: `E–H`, `F–H`, `G–H`, `F–G`. Node **H** là "hub" của nhóm 2.
- **Cầu nối**: `D–M` và `M–E`. Người **M** (gọi là *Minh*) là quen chung duy nhất nối hai nhóm — bỏ M ra thì hai nhóm không còn liên lạc được.

Danh sách bậc (degree) để tiện tra: A=3, H=3, còn B=C=D=M=E=F=G=2. Ghi nhớ con số này — nó sẽ đối lập bất ngờ với betweenness.

> 📝 **Tóm tắt mục 1.**
> - "Quan trọng" không phải một con số mà là **ba** câu hỏi: quen nhiều? gần mọi người? nằm trên đường đi của người khác?
> - Mạng ví dụ: hai nhóm 4 người, hub A và H (bậc 3), nối nhau qua một người cầu nối M (bậc 2).

---

## 2. Degree centrality — "phổ biến" (bao nhiêu quan hệ trực tiếp?)

### 2.1 Định nghĩa

**(a) Là gì.** Degree centrality của một người là **số quan hệ trực tiếp** người đó có — chính là bậc (degree) của node.

$$C_D(v) = \deg(v)$$

Để so sánh giữa các mạng có kích thước khác nhau, ta **chuẩn hóa** bằng số quan hệ tối đa có thể ($n-1$ người còn lại):

$$C_D'(v) = \frac{\deg(v)}{n - 1}$$

**(b) Vì sao cần.** Đây là thước đo trực tiếp nhất của **độ phổ biến (popularity)** và **ảnh hưởng cục bộ**: bạn nói gì thì bao nhiêu người nghe *ngay lập tức*. Trong marketing, người có degree cao là "micro-influencer" — đăng một status là nhiều người thấy liền.

**(c) Ví dụ số cụ thể** ($n = 9$ nên chuẩn hóa chia cho $n-1 = 8$):

| Người | $\deg(v)$ | $C_D'(v) = \deg/8$ | Ghi chú |
|:-----:|:--------:|:------------------:|---------|
| A | 3 | $3/8 = 0.375$ | hub nhóm 1 — **cao nhất** |
| H | 3 | $3/8 = 0.375$ | hub nhóm 2 — **cao nhất** |
| M (cầu nối) | 2 | $2/8 = 0.250$ | chỉ quen D và E |
| B | 2 | $2/8 = 0.250$ | ngoại vi nhóm 1 |

> ⚠ **Lỗi thường gặp.** *"Người quen nhiều nhất là người quyền lực nhất."* **Sai** trong nhiều mạng. Degree chỉ đếm **hàng xóm trực tiếp**, mù tịt với vị trí toàn cục. Ở mạng ví dụ, A và H quen nhiều nhất (3 người) nhưng **không** phải người kiểm soát luồng tin giữa hai nhóm — đó là M (chỉ quen 2 người). Mục 4 sẽ chứng minh bằng số.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tại sao phải chuẩn hóa?"* → Để so sánh công bằng. Quen 50 người trong mạng 51 người ($C_D'=1.0$, quen tất cả) khác hẳn quen 50 người trong mạng 1 triệu người ($C_D'\approx 0$).
> - *"Degree có phân biệt bạn thân với người quen sơ không?"* → Không, mọi cạnh đếm như nhau. Muốn phân biệt cường độ quan hệ cần **trọng số (weighted degree)** — sẽ gặp ở Lesson 07 với "quan hệ mạnh/yếu".

---

## 3. Closeness centrality — "gần mọi người" (lan tin nhanh)

### 3.1 Định nghĩa

> 💡 **Trực giác.** Tưởng tượng bạn muốn *phát tin đồn cho cả mạng*. Nếu bạn ở vị trí mà đi vài bước là chạm tới ai cũng được, tin lan nhanh. Nếu bạn ở rìa, tin phải bò qua nhiều người mới tới người xa nhất. Closeness đo **bạn gần trung bình mọi người tới mức nào**.

**(a) Là gì.** Đầu tiên, với node $v$, tính **tổng khoảng cách** (số bước ngắn nhất) từ $v$ tới mọi người khác:
$$\text{far}(v) = \sum_{u \ne v} d(v, u)$$
Số này càng **nhỏ** thì $v$ càng gần trung tâm. Closeness lấy nghịch đảo (và nhân $n-1$ để chuẩn hóa):

$$C_C(v) = \frac{n - 1}{\displaystyle\sum_{u \ne v} d(v, u)}$$

**(b) Vì sao cần.** Degree chỉ nhìn hàng xóm; closeness nhìn **toàn mạng**. Nó trả lời: nếu tôi khởi động một làn sóng thông tin/dịch bệnh/ảnh hưởng, **trung bình bao lâu** nó chạm tới mọi người? Người closeness cao là điểm đặt "trạm phát sóng" tốt nhất — họ nhận và phát tin với **độ trễ trung bình thấp nhất**.

**(c) Ví dụ số cụ thể.** Bảng khoảng cách ngắn nhất từ vài node (tính bằng BFS trên mạng ví dụ):

| Từ node | tới A,B,C,D,M,E,F,G,H | $\text{far}(v)$ | $C_C = 8/\text{far}$ |
|:-------:|-----------------------|:---------------:|:--------------------:|
| **M** (cầu nối) | 2,3,3,1,0,1,3,3,2 | **18** | $8/18 = \mathbf{0.444}$ |
| D | 1,2,2,0,1,2,4,4,3 | 19 | $8/19 = 0.421$ |
| A (hub) | 0,1,1,1,2,3,5,5,4 | 22 | $8/22 = 0.364$ |
| B (ngoại vi) | 1,0,1,2,3,4,6,6,5 | 28 | $8/28 = 0.286$ |

> **Kết quả bất ngờ:** M có degree **thấp hơn** A (2 so với 3), nhưng closeness **cao hơn** A (0.444 so với 0.364)! Lý do: M ngồi giữa cây cầu, khoảng cách xa nhất của M tới bất kỳ ai chỉ là 3 bước; còn A tuy quen nhiều nhưng phải đi tận 5 bước mới tới F, G ở nhóm bên kia. Vị trí toàn cục quan trọng hơn số bạn bè.

> ⚠ **Lỗi thường gặp.** Dùng closeness trên **mạng không liên thông** (bị chia mảnh). Nếu $v$ không tới được $u$ thì $d(v,u) = \infty$, tổng thành vô cực, công thức vỡ. Cách xử lý: hoặc tính closeness **trong từng mảnh liên thông**, hoặc dùng biến thể *harmonic closeness* $\sum_{u} \frac{1}{d(v,u)}$ (khoảng cách vô cực đóng góp 0). Visualization của bài dùng cách "trong từng mảnh".

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Node F có tổng khoảng cách $\text{far}(F) = 28$. Closeness của F bằng bao nhiêu?
> 2. Giữa hub A và cầu nối M, ai "gần mọi người" hơn? Con số nào chứng minh?
>
> <details><summary>Đáp án</summary>
>
> 1. $C_C(F) = 8/28 \approx 0.286$ — thấp, vì F nằm sâu trong nhóm 2, rất xa nhóm 1.
> 2. **M** gần hơn: $C_C(M)=0.444 > C_C(A)=0.364$ (far của M = 18 < far của A = 22). Dù A quen nhiều người hơn, A vẫn ở "một phía" của mạng nên xa nửa còn lại.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Closeness = $(n-1)$ chia cho tổng khoảng cách tới mọi người → cao nghĩa là **gần trung tâm, lan tin nhanh**.
> - Nó nhìn toàn mạng, không chỉ hàng xóm → M (cầu nối, bậc 2) closeness cao hơn A (hub, bậc 3).
> - Cẩn thận với mạng bị chia mảnh: tính trong từng thành phần liên thông.

---

## 4. Betweenness centrality — "cầu nối / gác cổng" (nằm trên đường đi của người khác)

### 4.1 Định nghĩa

> 💡 **Trực giác.** Hai tổ A và B chỉ nói chuyện được qua một người phiên dịch duy nhất. Người đó **không cần quen nhiều**, nhưng **mọi thông tin giữa hai tổ đều phải qua tay họ**. Họ có thể nghe lén, làm chậm, bóp méo, hoặc cắt đứt liên lạc. Đó là quyền lực của **betweenness** — quyền lực của kẻ đứng giữa (gatekeeper / broker).

**(a) Là gì.** Với mỗi cặp người $(s, t)$ khác $v$, xét các **đường đi ngắn nhất** giữa họ. Gọi $\sigma_{st}$ là số đường đi ngắn nhất từ $s$ tới $t$, và $\sigma_{st}(v)$ là số đường trong đó **đi qua $v$**. Betweenness của $v$ là tổng tỉ lệ đó trên mọi cặp:

$$C_B(v) = \sum_{s \ne v \ne t} \frac{\sigma_{st}(v)}{\sigma_{st}}$$

(Với mạng vô hướng, mỗi cặp $\{s,t\}$ đếm một lần.) Chuẩn hóa bằng số cặp tối đa $\frac{(n-1)(n-2)}{2}$.

**(b) Vì sao cần.** Degree và closeness đều đo "vị trí tốt để *phát* tin". Betweenness đo cái khác hẳn: **quyền kiểm soát luồng tin của người khác**. Một node betweenness cao là **điểm nghẽn (bottleneck)**: gỡ nó ra, nhiều cặp mất đường liên lạc ngắn nhất (hoặc mất hẳn). Trong xã hội học, đây là khái niệm *structural hole* của Ronald Burt — người bắc cầu qua "lỗ hổng cấu trúc" giữa hai cụm thu được lợi thế thông tin và thương lượng.

**(c) Ví dụ số cụ thể** — tính trực tiếp trên mạng ví dụ. Chuẩn hóa chia cho $\frac{8 \cdot 7}{2} = 28$:

| Người | Cách đếm (mọi đường ngắn nhất ở mạng này là **duy nhất**) | $C_B$ (thô) | Chuẩn hóa $/28$ |
|:-----:|-----------------------------------------------------------|:-----------:|:---------------:|
| **M** (cầu nối) | mọi cặp *(người nhóm 1, người nhóm 2)* = $4 \times 4 = 16$ cặp đều qua M | **16** | $\mathbf{0.571}$ |
| D | mọi cặp *({A,B,C}, {M,E,F,G,H})* = $3 \times 5 = 15$ | 15 | 0.536 |
| E | đối xứng với D: $5 \times 3 = 15$ | 15 | 0.536 |
| A (hub) | mọi cặp *({B,C}, {D,M,E,F,G,H})* = $2 \times 6 = 12$ | 12 | 0.429 |
| B, C, F, G | không nằm giữa cặp nào (đều ở "ngọn") | 0 | 0.000 |

> 💥 **Đây là bài học cốt lõi của cả lesson.** Node **M có degree chỉ 2** (thấp hơn hub A và H có degree 3), **NHƯNG betweenness của M cao nhất mạng** ($16 > 12$). Vì sao? Mọi con đường ngắn nhất nối một người nhóm 1 với một người nhóm 2 — cả $4 \times 4 = 16$ cặp — **bắt buộc đi qua M**. M là chốt chặn duy nhất. Bậc cao (nhiều bạn) và betweenness cao (kiểm soát luồng) là **hai loại quyền lực khác nhau**, và ở đây chúng thuộc về những người khác nhau.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao B, C có degree 2 y hệt M mà betweenness = 0?"* → Vì B, C nằm ở "ngọn" nhóm 1: không có đường đi ngắn nhất nào của hai người khác phải mượn đường qua B hay C. Cùng một bậc, vị trí khác → quyền lực khác.
> - *"Nếu có nhiều đường ngắn nhất bằng nhau thì sao?"* → Chia đều: nếu giữa $s,t$ có 2 đường ngắn nhất và $v$ nằm trên 1 đường, $v$ nhận $\frac{1}{2}$ cho cặp đó. Ở mạng ví dụ mọi đường ngắn nhất là duy nhất nên $\sigma_{st}(v)/\sigma_{st}$ luôn là 0 hoặc 1.
> - *"Betweenness cao thì tốt hay nguy hiểm cho mạng?"* → Cả hai. Tốt cho *cá nhân* M (quyền lực môi giới), nhưng **rủi ro cho tổ chức**: M là điểm chết một-lỗi (single point of failure). Mục 5 cho thấy gỡ M là mạng vỡ đôi.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Vì sao betweenness của M (16) lớn hơn của D (15) đúng 1 đơn vị?
> 2. Một node có degree cao nhất mạng thì có chắc betweenness cao nhất không?
>
> <details><summary>Đáp án</summary>
>
> 1. D chỉ nằm giữa các cặp *({A,B,C} × {M,...,H})* = 15 cặp; M nằm giữa toàn bộ *({A,B,C,D} × {E,F,G,H})* = 16 cặp — nhiều hơn đúng cặp có chứa D ở một đầu (như (D,E),(D,F)...). Vậy M nằm trên một tập cặp lớn hơn.
> 2. **Không.** Ở mạng này A, H có degree cao nhất (3) nhưng betweenness (12) thấp hơn M (16, degree chỉ 2). Bậc cao ≠ trung gian cao.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Betweenness = tổng tỉ lệ đường đi ngắn nhất của các cặp khác đi qua bạn → đo **vai trò cầu nối / gác cổng**.
> - Cầu nối M: degree thấp (2) nhưng betweenness cao nhất (16) vì độc quyền nối hai nhóm.
> - Betweenness cao = quyền lực môi giới cho cá nhân, nhưng là **điểm xung yếu** của cả mạng.

---

## 5. Walk-through: bảng đầy đủ + "gỡ ai thì mạng vỡ?"

### 5.1 Ba độ đo cạnh nhau

Đặt cả ba lên cùng một bảng để thấy chúng **xếp hạng khác nhau**:

| Người | Degree | Closeness | Betweenness | Vai trò |
|:-----:|:------:|:---------:|:-----------:|---------|
| A | **3** 🥇 | 0.364 | 12 🥉 | hub nhóm 1 — quen nhiều nhưng "một phía" |
| H | **3** 🥇 | 0.364 | 12 🥉 | hub nhóm 2 — đối xứng với A |
| M | 2 | **0.444** 🥇 | **16** 🥇 | cầu nối — ít bạn nhưng gần mọi người & kiểm soát mọi luồng |
| D | 2 | 0.421 🥈 | 15 🥈 | cửa ngõ nhóm 1 |
| E | 2 | 0.421 🥈 | 15 🥈 | cửa ngõ nhóm 2 |
| B, C, F, G | 2 | 0.286 | 0 | ngoại vi |

Đọc bảng: **ba cột, ba nhà vô địch khác nhau xếp hạng khác nhau.** Nếu chỉ nhìn degree, bạn sẽ trao "vương miện quan trọng" cho A hoặc H. Nhưng closeness và betweenness đều chỉ ra M — người quen ít nhất trong nhóm dẫn đầu — mới là mắt xích sống còn.

### 5.2 Gỡ một node → mạng còn mấy mảnh liên thông?

> 💡 **Trực giác.** Một node là **điểm xung yếu (articulation point)** nếu gỡ nó ra làm mạng **rời thành nhiều mảnh không nối được với nhau**. Đây chính là mặt trái của betweenness cao.

Đếm số **thành phần liên thông (connected component)** sau khi gỡ từng node (ban đầu cả mạng là 1 mảnh):

| Gỡ node | Số mảnh sau khi gỡ | Mảnh vỡ ra |
|:-------:|:------------------:|-----------|
| **M** (cầu nối) | **2** | {A,B,C,D} \| {E,F,G,H} — vỡ đôi cân bằng 4–4 |
| D | 2 | {A,B,C} \| {M,E,F,G,H} |
| E | 2 | {A,B,C,D,M} \| {F,G,H} |
| A (hub) | 2 | {B,C} \| {D,M,E,F,G,H} — B,C bị cô lập |
| H (hub) | 2 | {F,G} \| {A,B,C,D,M,E} |
| B, C, F, G | 1 | không vỡ (chúng ở ngoại vi) |

> **Quan sát chốt.** Bốn node B, C, F, G gỡ đi mạng **vẫn nguyên một mảnh** — chúng dư thừa về mặt kết nối. Còn gỡ **M** thì mạng **vỡ đôi hoàn hảo**: hai nhóm mất sạch liên lạc. Đây là lý do betweenness cao lại là *cảnh báo đỏ* cho độ bền của mạng: kẻ thù (hoặc sự cố) chỉ cần đánh vào **một** node M là chia rẽ được toàn bộ cộng đồng. Trong an ninh mạng máy tính, dịch tễ học (cách ly "super-connector"), hay chống khủng bố, việc tìm các node betweenness cao chính là tìm các điểm cần bảo vệ — hoặc cần vô hiệu hóa.

> ❓ **Câu hỏi tự nhiên của người đọc.** *"Gỡ A (hub) cũng làm vỡ 2 mảnh, vậy A cũng xung yếu như M?"* → Có xung yếu, nhưng hậu quả **nhẹ hơn**: gỡ A chỉ cô lập {B, C} (2 người), phần còn lại 6 người vẫn liền. Gỡ M cô lập **cả 4 người** nhóm 2. Mức độ thiệt hại tỉ lệ với betweenness: $C_B(M)=16 > C_B(A)=12$.

> 📝 **Tóm tắt mục 5.**
> - Ba độ đo cho ba bảng xếp hạng khác nhau — luôn hỏi rõ "trung tâm theo nghĩa nào".
> - Node betweenness cao thường là **điểm xung yếu**: gỡ nó, mạng vỡ thành nhiều mảnh.
> - Gỡ cầu nối M → vỡ đôi 4–4; gỡ node ngoại vi (B,C,F,G) → mạng vẫn liền.

---

## 6. Bài tập

**Bài 1 (degree).** Trong một mạng $n = 6$ người, Hoa quen 4 người. Tính degree centrality **chuẩn hóa** của Hoa. Con số này nói gì?

**Bài 2 (closeness).** Cho một đường thẳng 5 người: `P1 – P2 – P3 – P4 – P5` (mỗi người chỉ quen hàng xóm liền kề).
- (a) Tính tổng khoảng cách $\text{far}(P3)$ và $\text{far}(P1)$.
- (b) Tính closeness chuẩn hóa của P3 và P1. Ai gần trung tâm hơn? Giải thích trực giác.

**Bài 3 (betweenness).** Vẫn đường thẳng 5 người ở Bài 2.
- (a) Tính betweenness (thô) của P3.
- (b) Tính betweenness (thô) của P1.
- (c) So sánh với degree: P3 và P2 có degree bằng nhau không? Betweenness thì sao? Rút ra kết luận gì?

**Bài 4 (vận dụng — điểm xung yếu).** Trong mạng ví dụ 9 người của bài, giả sử ta muốn **làm mạng bền hơn** bằng cách thêm **đúng một cạnh**. Thêm cạnh nào để gỡ M ra mạng **không còn vỡ đôi**? Giải thích cạnh đó thay đổi betweenness của M thế nào (định tính).

---

## 7. Lời giải chi tiết

**Bài 1.** Chuẩn hóa: $C_D'(\text{Hoa}) = \dfrac{\deg}{n-1} = \dfrac{4}{6-1} = \dfrac{4}{5} = \mathbf{0.8}$.
Nghĩa: Hoa quen 80% số người có thể quen trong mạng — mức độ phổ biến rất cao. Nếu $C_D'=1.0$ thì Hoa quen tất cả mọi người.

**Bài 2.** Đường thẳng `P1–P2–P3–P4–P5`, $n = 5$ nên chuẩn hóa chia $n-1 = 4$.
- (a) Khoảng cách từ **P3** (ở giữa): tới P2=1, P4=1, P1=2, P5=2 → $\text{far}(P3) = 1+1+2+2 = \mathbf{6}$.
  Khoảng cách từ **P1** (đầu mút): tới P2=1, P3=2, P4=3, P5=4 → $\text{far}(P1) = 1+2+3+4 = \mathbf{10}$.
- (b) $C_C(P3) = \dfrac{4}{6} \approx \mathbf{0.667}$; $\;C_C(P1) = \dfrac{4}{10} = \mathbf{0.4}$.
  **P3 gần trung tâm hơn** (0.667 > 0.4). Trực giác: P3 đứng giữa, xa nhất chỉ 2 bước; P1 ở mép, phải đi tới 4 bước mới chạm P5. Cùng là "quen 2 người" (P3) hay "quen 1 người" (P1) — vị trí quyết định độ gần.

**Bài 3.** Đường thẳng `P1–P2–P3–P4–P5`. Mọi đường đi ngắn nhất trên đường thẳng là **duy nhất**, nên betweenness của $v$ = **số cặp $\{s,t\}$ mà $v$ nằm giữa trên đường thẳng**.
- (a) **P3** nằm giữa các cặp: (P1,P4), (P1,P5), (P2,P4), (P2,P5) → **4**. (Cặp (P2,P4) có đường P2-P3-P4 qua P3; cặp (P1,P5) qua P3; v.v.) Vậy $C_B(P3) = \mathbf{4}$.
- (b) **P1** là đầu mút, không nằm giữa bất kỳ cặp nào → $C_B(P1) = \mathbf{0}$.
- (c) Degree: P3 có degree 2 (quen P2, P4); P2 cũng có degree 2 (quen P1, P3). **Bằng nhau về degree.** Nhưng betweenness khác: P2 chỉ nằm giữa các cặp (P1, P3/P4/P5) = 3 cặp → $C_B(P2)=3$; P3 = 4. **Kết luận:** cùng degree không kéo theo cùng betweenness — vị trí càng "trung tâm dọc trục" thì càng nhiều đường phải mượn qua. Đây lặp lại bài học mục 4: bậc và trung gian là hai loại quyền lực độc lập.

**Bài 4.** Cách tiếp cận: mạng vỡ đôi khi gỡ M vì `D–M–E` là **cây cầu duy nhất**. Muốn không vỡ, phải tạo **con đường thứ hai** giữa hai nhóm *không đi qua M*.
- Cạnh cần thêm: bất kỳ cạnh nào nối **một node nhóm 1** trực tiếp với **một node nhóm 2**, ví dụ `A–H` (nối hai hub) hoặc `D–E` (nối hai cửa ngõ).
- Sau khi thêm `A–H`: gỡ M ra, nhóm 1 và nhóm 2 vẫn nối được qua `A–H` → mạng còn **1 mảnh**, không vỡ.
- Ảnh hưởng tới betweenness của M (định tính): giờ giữa mỗi cặp (nhóm 1, nhóm 2) **có hai đường** — một qua M, một qua cạnh mới. Betweenness được chia sẻ: mỗi cặp chỉ còn đóng góp một **phần** cho M thay vì trọn 1. Vậy $C_B(M)$ **giảm mạnh** (không còn độc quyền), và mạng bền hơn. Đây chính là ý tưởng "lấp lỗ hổng cấu trúc để giảm sự phụ thuộc vào một người".

> 📝 **Tóm tắt các bài.** Trên cùng một mạng, degree/closeness/betweenness cho câu trả lời khác nhau; đầu mút thì betweenness = 0 dù có thể có degree bằng node giữa; thêm một cạnh bắc cầu song song sẽ hạ betweenness của node cầu nối và tăng độ bền toàn mạng.

---

## Bài tiếp theo

**[Lesson 07 — Thế giới nhỏ & sức mạnh của quan hệ yếu](../lesson-07-small-world-weak-ties/)**: vì sao "sáu bước tới bất kỳ ai" (six degrees of separation) lại đúng, và vì sao chính những **quan hệ yếu** (weak ties) — như M trong bài này — mới là cầu nối mang thông tin mới từ nhóm khác tới. Betweenness của bài này chính là nền tảng để hiểu "weak ties là cầu betweenness cao".

**Minh họa tương tác**: [visualization.html](./visualization.html) — bật/tắt giữa ba độ đo để xem kích thước & màu các node đổi theo, và **bấm node để gỡ khỏi mạng** rồi quan sát số mảnh liên thông tăng lên khi bạn gỡ đúng người cầu nối.
