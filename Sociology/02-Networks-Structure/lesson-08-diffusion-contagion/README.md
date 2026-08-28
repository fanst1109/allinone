# Lesson 08 — Lan truyền & lây lan xã hội (Diffusion & Contagion trên mạng)

> Cùng một mạng lưới, cùng một điểm khởi phát — nhưng một *tin đồn* phủ khắp trong vài vòng, còn một *hành vi rủi ro* thì kẹt lại nửa đường. Vì sao? Vì có **hai kiểu lây lan** khác nhau về chất, và **liên kết yếu** giúp kiểu này nhưng cản kiểu kia.

## Mục tiêu học tập

- Phân biệt được **lây lan đơn giản (simple contagion)** — một tiếp xúc là đủ — với **lây lan phức tạp (complex contagion)** — cần $\ge k$ hàng xóm đã chấp nhận.
- Hiểu mô hình **SI** (Susceptible–Infected) cho simple contagion và mô hình **ngưỡng (threshold)** cho complex contagion.
- Giải thích *vì sao* **liên kết yếu (weak ties)** tốt cho simple contagion nhưng **cản** complex contagion, và vì sao cần **cầu rộng (wide bridge)**.
- Tự mô phỏng được số người chấp nhận (adopter) theo từng vòng lan truyền trên một mạng nhỏ, cho cả hai kiểu.

## Kiến thức tiền đề

- [Lesson 07 — Thế giới nhỏ & liên kết yếu](../lesson-07-small-world-weak-ties/): khái niệm **cầu (bridge)**, **liên kết yếu/mạnh**, cụm dày (dense cluster). Bài này dựa thẳng vào đó.
- **Lesson 03 — Mô hình ngưỡng (threshold model) của Granovetter** (Tầng 1): ý tưởng "tôi chỉ tham gia nếu đã có đủ N người khác tham gia". Complex contagion chính là mô hình ngưỡng chạy *trên mạng lưới* thay vì trên đám đông ẩn danh.
- Số học cơ bản: đếm, phân số, luỹ thừa. Không cần lập trình.

---

## 1. Lan truyền trên mạng là gì?

> 💡 **Trực giác.** Hình dung mạng xã hội là một mạng lưới ống nước, mỗi người là một cái van. Một thứ gì đó — con virus, một tin đồn, một mốt thời trang, một quyết định đình công — bắt đầu ở vài van (gọi là **seed**, hạt mầm) rồi *chảy* dọc các ống (liên kết) sang van khác. Câu hỏi trung tâm của cả bài: **điều kiện để một cái van "mở" là gì?** Chỉ cần *một* ống bên cạnh đang chảy? Hay phải có *nhiều* ống cùng chảy mới đủ áp lực? Chính câu trả lời này chia mọi hiện tượng lan truyền làm hai loại.

**Các thuật ngữ dùng xuyên bài:**

- **Adopter** (người chấp nhận / đã "nhiễm"): node đã tiếp nhận thứ đang lan (đã nhiễm bệnh, đã biết tin, đã theo mốt).
- **Seed** (hạt mầm): tập adopter ban đầu ở vòng 0.
- **Vòng (round)**: một bước thời gian rời rạc. Ở mỗi vòng, mọi node *đồng thời* kiểm tra điều kiện của mình dựa trên trạng thái ở **cuối vòng trước**.
- **Độ phủ (coverage)**: tỉ lệ node đã chấp nhận khi quá trình dừng $= \dfrac{\text{số adopter}}{\text{tổng số node}}$.

Ta xét mô hình **tiến trình** (progressive): đã chấp nhận thì không quay lại — phù hợp với "đã biết tin thì không quên", "đã theo mốt". (Mô hình có hồi phục — SIS, SIR — để dành cho dịch tễ học chuyên sâu.)

---

## 2. Simple contagion — lây lan đơn giản (mô hình SI)

### 2.1 Định nghĩa

**(a) Là gì.** Lây lan **đơn giản** là kiểu mà **một lần tiếp xúc với một adopter đã là đủ** để bạn trở thành adopter. Ngưỡng chấp nhận $k = 1$: chỉ cần $\ge 1$ hàng xóm đã "nhiễm".

**(b) Vì sao cần khái niệm này.** Vì rất nhiều thứ lan theo đúng kiểu đó — không cần "xác nhận nhiều nguồn". Nghe *một* người báo cháy là đủ để bạn biết có cháy; hít phải virus từ *một* người là đủ để nhiễm. Gộp chung mọi hiện tượng lan truyền vào một rọ sẽ che mất sự khác biệt cốt lõi ở Mục 3.

**(c) Ví dụ (≥ 4, đa dạng):**

| # | Hiện tượng | Vì sao "một tiếp xúc là đủ" |
|---|-----------|------------------------------|
| 1 | **Dịch bệnh hô hấp** (cúm, COVID) | Một lần tiếp xúc gần với người bệnh có thể truyền virus. |
| 2 | **Tin tức / tin đồn** | Nghe *một* người kể là bạn đã biết thông tin, không cần nghe lại lần hai. |
| 3 | **Virus máy tính / worm** | Một email nhiễm mở ra là máy dính. |
| 4 | **Đường link / meme viral** | Thấy một lần, thấy buồn cười, chia sẻ ngay. |
| 5 | **Một sự thật đơn giản** ("quán X đóng cửa") | Biết từ một nguồn là đủ. |

### 2.2 Mô hình SI và cơ chế theo vòng

**SI = Susceptible (S, còn nhạy cảm) → Infected (I, đã nhiễm).** Quy tắc một vòng:

$$\text{node } v \text{ trở thành adopter} \iff (\text{số hàng xóm đã adopt của } v) \ge 1$$

> 💡 **Trực giác vì sao nhanh.** Ở kiểu simple, cứ chạm tới *biên* của vùng đã nhiễm là "cháy" tiếp. Vùng nhiễm lớn dần như vết dầu loang, và bất kỳ **một** liên kết nào bắc sang vùng chưa nhiễm cũng đủ để nhảy qua. Vì thế simple contagion cực kỳ **cơ hội** — nó tận dụng được cả những đường tắt xa xôi, hiếm hoi.

**Walk-through bằng số** — mạng 6 node hình vòng có dây cung:

<svg viewBox="0 0 360 240" style="max-width:360px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Mạng 6 đỉnh vòng 1-2-3-4-5-6 với hai cạnh chéo 1-3 và 4-6">
  <defs><marker id="dif" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <line x1="138.0" y1="40.0" x2="220.0" y2="40.0" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="250.8" y1="54.4" x2="288.0" y2="104.0" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="289.2" y1="134.4" x2="252.0" y2="184.0" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="222.0" y1="200.0" x2="140.0" y2="200.0" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="109.2" y1="185.6" x2="72.0" y2="136.0" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="70.8" y1="105.6" x2="108.0" y2="56.0" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="136.4" y1="47.3" x2="281.7" y2="111.9" stroke="#1a202c" stroke-width="1.8"/>
  <line x1="223.6" y1="192.7" x2="78.3" y2="128.1" stroke="#1a202c" stroke-width="1.8"/>
  <circle cx="120.0" cy="40.0" r="16" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="120.0" y="45.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">1</text>
  <circle cx="240.0" cy="40.0" r="16" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="240.0" y="45.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">2</text>
  <circle cx="300.0" cy="120.0" r="16" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="300.0" y="125.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">3</text>
  <circle cx="240.0" cy="200.0" r="16" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="240.0" y="205.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">4</text>
  <circle cx="120.0" cy="200.0" r="16" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="120.0" y="205.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">5</text>
  <circle cx="60.0" cy="120.0" r="16" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="60.0" y="125.0" fill="#1d4ed8" font-size="13" text-anchor="middle" font-weight="700">6</text>
</svg>

Hàng xóm: $1\!:\{2,6,3\}$, $2\!:\{1,3\}$, $3\!:\{2,4,1\}$, $4\!:\{3,5,6\}$, $5\!:\{4,6\}$, $6\!:\{5,1,4\}$.

Seed $=\{1\}$, simple ($k=1$):

| Vòng | Node mới chấp nhận (vì có $\ge 1$ hàng xóm đã adopt) | Tập adopter | Tích luỹ |
|:----:|------------------------------------------------------|-------------|:--------:|
| 0 | (seed) | $\{1\}$ | 1 |
| 1 | $2,6,3$ (đều kề 1) | $\{1,2,3,6\}$ | 4 |
| 2 | $4$ (kề 3,6), $5$ (kề 6) | $\{1,2,3,4,5,6\}$ | 6 |

Chỉ **2 vòng** phủ 100% từ một hạt mầm duy nhất.

> ⚠ **Lỗi thường gặp.** *"Simple contagion nghĩa là lan ra ai cũng dính ngay lập tức."* Không. Vẫn mất nhiều vòng, tốc độ phụ thuộc **cấu trúc mạng** (đường kính, có đường tắt hay không). "Đơn giản" nói về **điều kiện chấp nhận** ($k=1$), không phải về tốc độ.

> ❓ **Câu hỏi tự nhiên.**
> - *"Nếu mỗi tiếp xúc chỉ truyền với xác suất $p<1$ thì sao?"* → Đó là SI ngẫu nhiên. Với một node có $m$ hàng xóm đã nhiễm, xác suất **thoát** một vòng là $(1-p)^m$, nên xác suất nhiễm là $1-(1-p)^m$. Ví dụ $p=0.3$: một hàng xóm nhiễm → $1-0.7 = 30\%$; bốn hàng xóm nhiễm → $1-0.7^4 = 1-0.2401 = 75.99\%$. Nhiều nguồn *tăng* cơ hội, nhưng bản chất vẫn là **một nguồn cũng có thể đủ** — đó là dấu hiệu của simple contagion.
> - *"Xác suất trên có phải là 'cần nhiều hàng xóm' không?"* → Không. Nhiều hàng xóm chỉ làm *nhanh hơn*, không phải *điều kiện bắt buộc*. Ở complex contagion (Mục 3), nhiều hàng xóm là **bắt buộc**.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Trong walk-through trên, nếu seed $=\{2\}$ thay vì $\{1\}$, sau bao nhiêu vòng phủ hết?
> 2. Với SI ngẫu nhiên $p=0.5$, node có 3 hàng xóm đã nhiễm — xác suất nhiễm trong vòng này?
>
> <details><summary>Đáp án</summary>
>
> 1. Seed $\{2\}$: V1 → $\{2,1,3\}$; V2 → $6$ (kề 1), $4$ (kề 3) → $\{1,2,3,4,6\}$; V3 → $5$ (kề 4,6). **3 vòng.** (Chậm hơn seed $\{1\}$ vì node 1 có bậc cao hơn — vị trí seed quan trọng.)
> 2. $1-(1-0.5)^3 = 1 - 0.125 = 0.875 = \mathbf{87.5\%}$.
> </details>

> 📝 **Tóm tắt Mục 2.**
> - Simple contagion: ngưỡng $k=1$, **một tiếp xúc là đủ**.
> - Mô hình SI, cập nhật theo vòng đồng thời.
> - Lan như vết dầu loang, tận dụng được mọi đường tắt → phủ nhanh, phủ rộng.
> - Ví dụ: bệnh, tin tức, virus máy tính, meme.

---

## 3. Complex contagion — lây lan phức tạp (mô hình ngưỡng)

### 3.1 Định nghĩa

**(a) Là gì.** Lây lan **phức tạp** là kiểu mà bạn chỉ chấp nhận **sau khi đã có ít nhất $k$ hàng xóm ($k \ge 2$) chấp nhận trước**. Ngưỡng $k \ge 2$: cần **nhiều nguồn củng cố (social reinforcement)** mới đủ tin cậy/an tâm/áp lực để theo.

**(b) Vì sao cần khái niệm này.** Vì nhiều hành vi quan trọng *không* lan theo kiểu "nghe một lần là theo". Trước một hành vi **tốn kém, rủi ro, hoặc trái chuẩn hiện hành**, người ta cần **bằng chứng xã hội lặp lại**: thấy *nhiều* người quanh mình đã làm và ổn thì mới dám. Nếu cứ dùng mô hình simple cho mọi thứ, ta sẽ dự đoán sai — tưởng phong trào nào cũng lan như virus, trong khi thực tế đa số chết yểu.

Đây chính là **mô hình ngưỡng của Granovetter (Lesson 03)** đặt lên mạng lưới: mỗi người có một ngưỡng, nhưng giờ ngưỡng đó tính trên **hàng xóm trực tiếp** chứ không phải toàn đám đông.

**(c) Ví dụ (≥ 4, đa dạng):**

| # | Hiện tượng | Vì sao cần $\ge k$ hàng xóm |
|---|-----------|------------------------------|
| 1 | **Tham gia biểu tình / đình công rủi ro** | Đi một mình dễ bị bắt; thấy nhiều bạn bè đã đi mới an tâm (rủi ro chia sẻ). |
| 2 | **Áp dụng công nghệ mới, đắt, chưa kiểm chứng** | Cần thấy nhiều đồng nghiệp dùng thành công mới bỏ tiền/thời gian. |
| 3 | **Đổi chuẩn mực / lối sống** (ăn chay, mốt lạ, đặt tên con lạ) | Cần đủ người trong vòng thân quen làm thì mới không thấy mình "dị". |
| 4 | **Hành vi rủi ro sức khoẻ** (hút thuốc tuổi teen, thử chất kích thích) | Một người rủ thì từ chối được; nhiều bạn thân cùng làm thì áp lực lớn. |
| 5 | **Tham gia phong trào xã hội / tẩy chay** | Hiệu quả và an toàn chỉ khi số đông cùng vào — cần thấy khối lượng tới hạn. |

### 3.2 Ngưỡng tuyệt đối và ngưỡng phân số

Có hai cách đặt ngưỡng:

- **Ngưỡng tuyệt đối $k$**: adopt khi *số* hàng xóm đã adopt $\ge k$.
- **Ngưỡng phân số $\varphi$**: adopt khi *tỉ lệ* hàng xóm đã adopt $\ge \varphi$. Số hàng xóm cần $= \lceil \varphi \cdot d \rceil$ với $d$ là bậc (degree) của node.

**Ví dụ số (≥ 4):** số hàng xóm đã adopt cần để một node chấp nhận —

| Node bậc $d$ | Quy tắc | Số hàng xóm cần | Tính |
|:---:|---|:---:|---|
| $d=4$ | tuyệt đối $k=2$ | **2** | cần $2/4$ |
| $d=6$ | phân số $\varphi=\tfrac13$ | **2** | $\lceil 6/3 \rceil = 2$ |
| $d=10$ | phân số $\varphi=0.5$ | **5** | $\lceil 5 \rceil = 5$ |
| $d=3$ | phân số $\varphi=0.5$ | **2** | $\lceil 1.5 \rceil = 2$ |
| $d=8$ | tuyệt đối $k=3$ | **3** | cần $3/8$ |

> ⚠ **Lỗi thường gặp.** Nhầm complex contagion với "simple nhưng chậm". **Không phải chậm — mà là có thể *hoàn toàn không lan*.** Với $k=2$, một node chỉ có đúng 1 hàng xóm đã adopt sẽ **mãi mãi** không chấp nhận, dù chờ bao lâu. Khác biệt là về **chất** (có/không lan), không phải **lượng** (nhanh/chậm).

> ❓ **Câu hỏi tự nhiên.**
> - *"Ngưỡng $k$ có phải ai cũng như nhau?"* → Không nhất thiết. Đời thực mỗi người một ngưỡng (người "bạo" $k=1$, người "dè dặt" $k=4$). Ở bài này ta dùng $k$ chung để thấy rõ cơ chế; mở rộng ngưỡng không đồng nhất là bước tiếp theo tự nhiên.
> - *"$k=1$ thì complex có thành simple không?"* → Đúng. Simple contagion chính là trường hợp $k=1$ của mô hình ngưỡng. Viz cho phép kéo $k$ về 1 để thấy hai kiểu trùng nhau.

> 🔁 **Dừng lại tự kiểm tra.** Một node bậc $d=7$, dùng ngưỡng phân số $\varphi=0.4$. Cần bao nhiêu hàng xóm đã adopt?
> <details><summary>Đáp án</summary>
>
> $\lceil 0.4 \times 7 \rceil = \lceil 2.8 \rceil = \mathbf{3}$ hàng xóm.
> </details>

---

## 4. Vai trò của liên kết yếu: giúp simple, cản complex

Đây là kết quả *phản trực giác* và quan trọng nhất của bài (Centola & Macy, 2007).

### 4.1 Nhắc lại: liên kết yếu = cầu bắc xa

Từ [Lesson 07](../lesson-07-small-world-weak-ties/): **liên kết mạnh** nối những người trong cùng cụm dày (bạn thân — vòng bạn bè chồng lấn nhau); **liên kết yếu** là **cầu (bridge)** bắc sang một cụm xa, tới những người mà bạn bè của bạn *không* quen. Liên kết yếu là "đường tắt" rút ngắn thế giới.

### 4.2 Với simple contagion: liên kết yếu là VÀNG

Vì chỉ cần **một** tiếp xúc, một cây cầu yếu duy nhất cũng đủ để thông tin/virus **nhảy** sang cụm mới rồi bùng ở đó. Liên kết yếu mở ra vùng lãnh thổ hoàn toàn mới với chi phí một liên kết. Đây là "sức mạnh của liên kết yếu" cổ điển của Granovetter cho việc lan **thông tin**.

### 4.3 Với complex contagion: liên kết yếu lại là RÀO CẢN

> 💡 **Trực giác.** Một cây cầu yếu chỉ mang sang cụm mới **một** nguồn củng cố. Nhưng complex contagion cần **$\ge k \ge 2$** nguồn. Người đầu cầu bên kia nhìn sang chỉ thấy *một* người đã theo → chưa đủ tin/đủ áp lực → **không** theo → hành vi **kẹt lại**, không bao giờ vượt cầu. Cây cầu bắc *xa* nhưng quá *mỏng*.

**Walk-through bằng số** — hai cụm dày, một cầu yếu:

Hai **cụm K4** (mỗi cụm 4 node nối đủ đôi một):
- Cụm A $=\{1,2,3,4\}$, Cụm B $=\{5,6,7,8\}$.
- **Cầu hẹp:** đúng một liên kết yếu $4\!-\!5$.
- Bậc: node 1,2,3 và 6,7,8 có bậc 3; node 4 và 5 có bậc 4 (3 trong cụm + 1 cầu).

Seed $=\{1,2\}$ (hai hạt mầm trong cụm A). So sánh **simple** và **complex $k=2$**:

**Simple ($k=1$):**

| Vòng | Node mới (có $\ge 1$ hàng xóm adopt) | Tích luỹ |
|:----:|---------------------------------------|:--------:|
| 0 | seed $\{1,2\}$ | 2 |
| 1 | $3,4$ (kề 1,2) | 4 |
| 2 | $5$ (kề 4 qua cầu) | 5 |
| 3 | $6,7,8$ (kề 5) | **8 — phủ 100%** |

**Complex ($k=2$):**

| Vòng | Kiểm tra điều kiện $\ge 2$ hàng xóm adopt | Node mới | Tích luỹ |
|:----:|--------------------------------------------|:--------:|:--------:|
| 0 | seed $\{1,2\}$ | — | 2 |
| 1 | node 3: hàng xóm 1,2 adopt → 2 ✓; node 4: hàng xóm 1,2 adopt → 2 ✓ | $3,4$ | 4 |
| 2 | node 5: hàng xóm adopt chỉ có $\{4\}$ → **1 < 2** ✗; node 6,7,8: 0 ✗ | (không có) | **4 — KẸT ở 50%** |

Node 5 đứng đầu cầu bên B chỉ nhìn thấy **một** người đã theo (node 4). Ngưỡng $k=2$ không bao giờ đạt → complex contagion **chết ở biên giới cụm**. Cùng mạng, cùng seed, mà simple phủ 100% còn complex kẹt 50%.

### 4.4 Lời giải: cầu rộng (wide bridge)

Muốn complex contagion vượt được, phải **làm dày cây cầu**: nối sao cho node đầu cầu bên kia có **$\ge k$** hàng xóm đã adopt cùng lúc.

**Walk-through** — thay cầu hẹp bằng **cầu rộng**: hai node của A ($1,2$) cùng nối sang node đầu cầu của B. Cụ thể thêm các liên kết để node 5 (và node 6) mỗi node có **2** hàng xóm nằm trong A.

- Cầu rộng: $1\!-\!5,\ 2\!-\!5,\ 1\!-\!6,\ 2\!-\!6$ (thay cho một liên kết $4\!-\!5$).

Complex $k=2$, seed $\{1,2\}$:

| Vòng | Node mới (đạt $\ge 2$) | Tích luỹ |
|:----:|-------------------------|:--------:|
| 0 | seed $\{1,2\}$ | 2 |
| 1 | $3,4$ (kề 1,2) — cụm A xong | 4 |
| 2 | $5$ (kề 1,2 qua cầu → 2 ✓), $6$ (kề 1,2 → 2 ✓) | 6 |
| 3 | $7,8$ (kề 5,6 → 2 ✓) — cụm B xong | **8 — phủ 100%** |

Giờ node 5 và 6 mỗi node thấy **hai** người đã theo → vượt ngưỡng → tràn sang B, rồi B tự cháy nốt. **Cầu rộng cứu complex contagion.**

> ⚠ **Lỗi thường gặp.** *"Cứ có nhiều liên kết yếu là lan tốt."* Sai với complex: quan trọng là các liên kết yếu có **chụm lại** để tạo củng cố kép hay không. Mười cây cầu mỏng tới mười cụm khác nhau vẫn **không** đưa complex contagion đi đâu; một cây cầu *rộng* (nhiều sợi chụm vào cùng vùng) thì có.

> ❓ **Câu hỏi tự nhiên.** *"Vậy phong trào xã hội nên lan qua mạng lưới thế nào?"* → Qua các cụm dày có **nhiều liên kết chồng lấn** (bạn bè của bạn cũng là bạn của nhau) — nơi mỗi người dễ thấy nhiều người quen cùng tham gia. Mạng "nhiều đường tắt xa, ít củng cố" (small-world cực đoan) tốt cho tin đồn nhưng tệ cho phong trào. Đây là lý do phong trào thường khởi phát từ cộng đồng địa phương gắn kết, không từ mạng lưới phân tán.

> 🔁 **Dừng lại tự kiểm tra.** Trong walk-through cầu hẹp (Mục 4.3), nếu tăng seed lên $\{1,2,5\}$ (thêm mầm ở cụm B) thì complex $k=2$ có phủ hết không?
> <details><summary>Đáp án</summary>
>
> Chưa. Cụm A cháy hết (1,2,3,4). Nhưng ở B chỉ có node 5 là adopter; node 6,7,8 mỗi node chỉ có **1** hàng xóm adopt (node 5) → $<2$ → vẫn kẹt. Cần **hai** mầm trong B (ví dụ $\{5,6\}$) thì B mới cháy. Bài học: complex contagion cần *khối lượng tới hạn cục bộ* trong từng cụm, không chỉ một điểm chạm.
> </details>

> 📝 **Tóm tắt Mục 4.**
> - Liên kết yếu = cầu bắc xa nhưng mỏng.
> - **Simple**: cầu mỏng vẫn đủ → liên kết yếu giúp lan xa, nhanh.
> - **Complex**: cầu mỏng chỉ cho 1 củng cố $< k$ → **kẹt ở biên cụm**.
> - Cần **cầu rộng** (nhiều sợi chụm vào cùng vùng) để complex vượt sang cụm mới.

---

## 5. Walk-through tổng hợp: cùng mạng, hai kiểu, đếm theo vòng

Dùng lại mạng **hai cụm K4 + cầu hẹp $4\!-\!5$**, seed $\{1,2\}$, đặt hai bảng cạnh nhau để thấy sự phân kỳ:

| Vòng | Simple ($k=1$) tích luỹ | Complex ($k=2$) tích luỹ | Nhận xét |
|:----:|:-----------------------:|:------------------------:|----------|
| 0 | 2 | 2 | cùng xuất phát |
| 1 | 4 | 4 | cụm A cháy ở cả hai |
| 2 | 5 | **4 (kẹt)** | simple vượt cầu; complex đứng vì node 5 chỉ có 1 củng cố |
| 3 | **8 (100%)** | 4 (50%) | simple phủ toàn mạng; complex chết ở biên |
| ... | 8 | 4 | complex không bao giờ tiến thêm |

**Kết luận đo được:** trên **đúng cùng một mạng và cùng seed**, simple contagion đạt **độ phủ 100%** trong 3 vòng, còn complex contagion ($k=2$) **kẹt ở 50%** vĩnh viễn. Chuyển sang **cầu rộng** thì complex mới lên 100% (Mục 4.4). Đây là bằng chứng số cho luận điểm trung tâm: **kiểu lây lan quyết định cấu trúc mạng nào là "tốt".**

---

## 6. Bài tập

**Bài 1 (đếm ngưỡng — cơ bản).** Dùng ngưỡng phân số $\varphi = 0.5$. Với mỗi node bậc $d \in \{2, 3, 5, 7\}$, tính số hàng xóm đã adopt tối thiểu để node chấp nhận.

**Bài 2 (mô phỏng trên mạng — trọng tâm).** Cho mạng: hai **tam giác** $T_1=\{1,2,3\}$ (nối đủ) và $T_2=\{4,5,6\}$ (nối đủ), một **cầu hẹp** $3\!-\!4$. Seed $=\{1,2\}$.
- (a) Lập bảng adopter theo vòng cho **simple** ($k=1$). Độ phủ cuối?
- (b) Lập bảng adopter theo vòng cho **complex** ($k=2$). Độ phủ cuối? Node nào chặn dòng lan?

**Bài 3 (cầu rộng — vận dụng).** Lấy mạng Bài 2 nhưng **thêm một liên kết cầu** $2\!-\!4$ (giờ node 4 nối cả 3 và 2). Với **complex** ($k=2$), seed $\{1,2\}$: node 4 có vượt cầu (chấp nhận) được không? Tính cụ thể số hàng xóm đã adopt của node 4 tại vòng nó được xét, và giải thích khác biệt so với Bài 2(b).

---

## 7. Lời giải chi tiết

**Bài 1.** Số cần $= \lceil 0.5 \cdot d \rceil$:

| $d$ | $0.5 d$ | $\lceil 0.5 d \rceil$ |
|:---:|:---:|:---:|
| 2 | 1.0 | **1** |
| 3 | 1.5 | **2** |
| 5 | 2.5 | **3** |
| 7 | 3.5 | **4** |

Nhận xét: với $\varphi=0.5$, node bậc lẻ bị "làm tròn lên" nên yêu cầu khắt khe hơn tỉ lệ danh nghĩa (bậc 3 cần 2/3 ≈ 67%, không phải 50%).

**Bài 2.** Hàng xóm: $1\!:\{2,3\}$, $2\!:\{1,3\}$, $3\!:\{1,2,4\}$, $4\!:\{3,5,6\}$, $5\!:\{4,6\}$, $6\!:\{4,5\}$.

*(a) Simple ($k=1$), seed $\{1,2\}$:*

| Vòng | Node mới | Tích luỹ |
|:----:|----------|:--------:|
| 0 | $\{1,2\}$ | 2 |
| 1 | 3 (kề 1,2) | 3 |
| 2 | 4 (kề 3) | 4 |
| 3 | 5,6 (kề 4) | **6 — 100%** |

*(b) Complex ($k=2$), seed $\{1,2\}$:*

| Vòng | Kiểm tra | Node mới | Tích luỹ |
|:----:|----------|:--------:|:--------:|
| 0 | seed | — | 2 |
| 1 | node 3: kề 1,2 adopt → 2 ✓ | 3 | 3 |
| 2 | node 4: hàng xóm adopt chỉ $\{3\}$ → 1 < 2 ✗ | — | **3 — KẸT ở 50%** |

**Node 4 chặn dòng lan**: đứng đầu cầu, chỉ có một hàng xóm (node 3) đã adopt, không đạt $k=2$. Simple phủ 100%, complex kẹt 50% — đúng mô típ Mục 4.

**Bài 3.** Thêm cầu $2\!-\!4$ → hàng xóm node 4 giờ là $\{3, 5, 6, 2\}$ (bậc 4).

Diễn tiến complex ($k=2$), seed $\{1,2\}$:
- Vòng 1: node 3 kề 1,2 → 2 ✓ → adopt. Adopter $=\{1,2,3\}$.
- Vòng 2 — xét node 4: hàng xóm đã adopt $= \{3, 2\}$ (node 3 vừa adopt vòng 1, node 2 là seed) → **2 $\ge$ 2 ✓** → node 4 **vượt cầu, chấp nhận!** Adopter $=\{1,2,3,4\}$.
- Vòng 3 — node 5: hàng xóm adopt $\{4\}$ → 1 < 2 ✗; node 6: $\{4\}$ → 1 < 2 ✗ → **kẹt ở $\{1,2,3,4\}$ = 67%**.

**Khác biệt so với Bài 2(b):** ở Bài 2, node 4 chỉ có **một** đường sang cụm A (qua node 3) → 1 củng cố → kẹt ngay ở cầu. Ở Bài 3, cầu được **làm rộng** (node 4 nối *hai* node của A là 2 và 3) → node 4 nhận **hai** củng cố → **vượt được** sang cụm mới. Đây là minh hoạ trực tiếp cho "cầu rộng cứu complex contagion".

Lưu ý bổ sung (đóng câu hỏi tự nhiên): complex contagion **vẫn kẹt lại** trong $T_2$ sau khi node 4 vào, vì node 5 và 6 mỗi node chỉ có một hàng xóm adopt (node 4). Muốn $T_2$ cháy hết, cần **hai** điểm vào cụm B (làm cầu rộng hơn nữa, ví dụ thêm $2\!-\!5$). Bài học: cầu rộng giúp *vượt biên*, nhưng mỗi cụm mới vẫn cần đạt *khối lượng tới hạn cục bộ* của riêng nó.

> 📝 **Tóm tắt bài học.**
> - Hai kiểu lây lan khác nhau về **chất**: simple ($k=1$, một tiếp xúc đủ) vs complex ($k \ge 2$, cần củng cố nhiều nguồn).
> - Simple ↔ mô hình SI (bệnh, tin, virus, meme); complex ↔ mô hình ngưỡng (hành vi rủi ro, chuẩn mực mới, phong trào).
> - **Liên kết yếu / cầu mỏng**: tốt cho simple (bắc xa, nhảy nhanh), **cản** complex (chỉ 1 củng cố $< k$ → kẹt ở biên cụm).
> - Complex cần **cầu rộng** và **cụm dày có liên kết chồng lấn** để có đủ củng cố.
> - Cùng mạng + cùng seed: simple phủ 100%, complex có thể kẹt 50% — kiểu lây lan quyết định cấu trúc mạng nào là "tốt".

---

## Bài tiếp theo

Hết Tầng 2 (Mạng lưới & Cấu trúc). Sang **Tầng 3 — Bất bình đẳng & Biến đổi**:

**[Lesson 09 — Phân tầng xã hội & Dịch chuyển (Stratification & Mobility)](../../03-Inequality-Change/lesson-09-stratification-mobility/)** — từ cách mạng lưới truyền hành vi, ta chuyển sang cách xã hội **xếp hạng và phân bổ nguồn lực**: giai tầng, dịch chuyển lên/xuống, và vì sao cấu trúc mạng (bài này) lại tái tạo bất bình đẳng.

Minh hoạ tương tác: [visualization.html](./visualization.html) — chọn seed, chọn kiểu Simple/Complex, kéo ngưỡng $k$, gạt cầu hẹp/rộng, bấm Step/Chạy để xem contagion lan (hoặc kẹt) theo từng vòng.
