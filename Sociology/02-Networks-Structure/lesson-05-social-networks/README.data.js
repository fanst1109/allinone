// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Sociology/02-Networks-Structure/lesson-05-social-networks/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Mạng xã hội: những khái niệm cơ bản (Social Networks)

> Xã hội không phải một túi cá nhân rời rạc, mà là một **mạng lưới quan hệ**. Bài này học cách biến "ai quen ai" thành một vật thể toán học đo đếm được: **đồ thị (graph)**.

## Mục tiêu học tập

- Định nghĩa được **đỉnh/nút (node)**, **cạnh (edge)**, phân biệt mạng **có hướng (directed)** và **vô hướng (undirected)** — kèm ví dụ số.
- Tính được **bậc (degree)** của một node và **bậc trung bình (average degree)** của cả mạng.
- Tính được **mật độ (density)** và hiểu vì sao mạng xã hội thực tế luôn *thưa*.
- Tìm được **đường đi ngắn nhất (shortest path)** bằng thuật toán BFS, và đo **độ dài** của nó.
- Đếm được số **thành phần liên thông (connected component)** và viết được **ma trận kề (adjacency matrix)**.

## Kiến thức tiền đề

- Chỉ cần số học cộng/trừ/nhân/chia và biết đọc bảng.
- Không cần lập trình. (Nếu đã xem qua đồ thị trong khoa học máy tính thì càng nhanh, nhưng không bắt buộc.)
- Bài này là **bài đầu tiên của Tầng 2 — Mạng lưới & Cấu trúc**. Nối tiếp từ [Tầng 1 — Cá nhân & Tương tác](../../01-Individual-Interaction/lesson-04-social-identity-groups/). Ở Tầng 1 ta hỏi *"cá nhân hành xử thế nào trong nhóm"*; ở Tầng 2 ta lùi ra xa để hỏi *"cấu trúc kết nối giữa mọi người trông ra sao"*.

---

## 1. Bức tranh lớn: từ "ai quen ai" đến đồ thị

> 💡 **Trực giác.** Lấy 7 người trong một lớp học. Vẽ mỗi người là một **chấm tròn**, và mỗi khi hai người là bạn thì nối họ bằng một **đoạn thẳng**. Bức tranh chấm-và-đoạn đó chính là một **mạng xã hội**. Toán học gọi nó là **đồ thị (graph)** — một cấu trúc chỉ gồm hai loại thành phần: *điểm* và *nối giữa điểm*. Mọi câu hỏi xã hội học về kết nối (ai có ảnh hưởng, tin đồn lan thế nào, nhóm nào tách biệt) đều quy về việc đo đạc trên bức tranh này.

Một đồ thị $G$ được viết gọn là:

$$G = (V, E)$$

trong đó $V$ là **tập đỉnh** (vertices/nodes) và $E$ là **tập cạnh** (edges). Ta ký hiệu:

- $N = |V|$ — số node (số người).
- $E = |E|$ — số cạnh (số quan hệ). *(Lạm dụng ký hiệu một chút: $E$ vừa là tên tập, vừa là số phần tử — theo ngữ cảnh.)*

Ví dụ mạng 7 người ta sẽ dùng xuyên suốt bài (đặt tên **An, Bình, Chi, Dũng, Hà, Giang, Khoa**, viết tắt **A, B, C, D, H, G, K**):

| Cạnh (tình bạn) | Ý nghĩa |
|---|---|
| A–B | An quen Bình |
| A–C | An quen Chi |
| B–C | Bình quen Chi |
| B–D | Bình quen Dũng |
| C–D | Chi quen Dũng |
| D–H | Dũng quen Hà |
| G–K | Giang quen Khoa |

Vậy $N = 7$ và $E = 7$. Để ý: Giang và Khoa chỉ quen nhau, tách rời khỏi 5 người còn lại — ta sẽ thấy điều này biến thành **2 thành phần liên thông** ở mục 6.

> 📝 **Tóm tắt mục 1.**
> - Mạng xã hội = **đồ thị** $G = (V, E)$: node là cá nhân, cạnh là quan hệ.
> - $N$ = số node, $E$ = số cạnh.
> - Ví dụ chạy suốt bài: 7 người, 7 quan hệ tình bạn.

---

## 2. Node và Edge — định nghĩa đầy đủ

### 2.1 Đỉnh / nút (node)

**(a) Là gì.** Một **node** là một *thực thể* trong mạng — trong xã hội học thường là một cá nhân, nhưng cũng có thể là một tổ chức, một quốc gia, một trang web.

**(b) Vì sao cần.** Để có "đơn vị" đếm được. Không có node thì không nói được "mạng có bao nhiêu người", "người này kết nối với bao nhiêu người".

**(c) Ví dụ số cụ thể** (≥ 4, đa dạng ngữ cảnh):

1. Lớp học 7 người → $N = 7$ node.
2. Một gia đình 4 người → $N = 4$ node.
3. Nhóm chat công ty 25 nhân viên → $N = 25$ node.
4. Mạng Facebook toàn cầu → $N \\approx 3\\ 000\\ 000\\ 000$ node.

### 2.2 Cạnh (edge)

**(a) Là gì.** Một **cạnh** là một *quan hệ* giữa hai node: "quen nhau", "gửi email cho nhau", "theo dõi", "cùng dự án". Một cạnh nối đúng **2** node.

**(b) Vì sao cần.** Node đứng một mình chỉ là danh sách người. Chính **cạnh** tạo ra *cấu trúc* — thứ khiến mạng thú vị. Toàn bộ xã hội học mạng lưới nằm ở việc phân tích tập cạnh.

**(c) Ví dụ số cụ thể:**

1. Trong mạng 7 người: cạnh A–B, B–D, ... tổng cộng $E = 7$ cạnh.
2. Một cặp vợ chồng: $N = 2$, $E = 1$ (một cạnh duy nhất).
3. Tam giác 3 người bạn ai cũng quen ai: $N = 3$, $E = 3$ (A–B, B–C, A–C).
4. Ngôi sao: 1 giáo viên nối tới 5 học sinh, các học sinh không quen nhau: $N = 6$, $E = 5$.

> ⚠ **Lỗi thường gặp.** Nhầm **cạnh** với **đường đi**. Cạnh là kết nối *trực tiếp, một bước* (An–Bình quen nhau trực tiếp). "An biết Hà qua Dũng" **không phải** một cạnh — đó là một **đường đi** dài 3 bước (mục 5). An và Hà *không* có cạnh nối trực tiếp.

### 2.3 Vô hướng và có hướng

> 💡 **Trực giác.** Có hai kiểu quan hệ. Kiểu **đối xứng**: "An là bạn Bình" thì đương nhiên "Bình là bạn An" — như một cái *bắt tay*, cần cả hai. Kiểu **một chiều**: "An theo dõi (follow) một ngôi sao trên Twitter" nhưng ngôi sao đó *không* theo dõi lại — như một *mũi tên* chỉ đi một hướng.

- **Mạng vô hướng (undirected):** cạnh không có chiều, viết A–B (bằng B–A). Dùng cho: kết bạn Facebook, hôn nhân, bắt tay, đồng tác giả một bài báo.
- **Mạng có hướng (directed):** cạnh có chiều, viết A → B ("A trỏ tới B"), **khác** B → A. Dùng cho: theo dõi Twitter/X, gửi email (ai gửi → ai nhận), trích dẫn (bài A trích bài B), cuộc gọi (ai gọi → ai nghe).

**Ví dụ số cụ thể phân biệt hai loại:**

1. Vô hướng, cặp bạn: A–B. Chỉ **1** cạnh.
2. Có hướng, cùng cặp mà cả hai theo dõi nhau: A → B *và* B → A. Là **2** cạnh khác nhau.
3. Có hướng một chiều: fan A → thần tượng B, mà B không follow lại. **1** cạnh, và nó có chiều.
4. Trích dẫn khoa học: bài 2020 → bài 2015 (bài mới trích bài cũ). Không thể ngược lại (bài cũ chưa ra đời khi bài mới viết) → mạng trích dẫn **luôn có hướng**.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Làm sao biết dùng loại nào?"* → Hỏi: quan hệ này có **tự động đối ứng** không? Nếu "X quan hệ Y" **luôn** kéo theo "Y quan hệ X" → vô hướng. Nếu có thể một chiều → có hướng.
> - *"Số cạnh tối đa hai loại có khác nhau không?"* → Có, và khác gấp đôi. Xem mục 4 (mật độ) — đây là lý do công thức mật độ có/không nhân 2.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. "Cuộc gọi điện thoại từ An tới Bình" nên mô hình bằng cạnh loại nào?
> 2. Mạng 5 người mà *mọi người đều theo dõi lẫn nhau hai chiều* có bao nhiêu cạnh có hướng?
>
> <details><summary>Đáp án</summary>
>
> 1. **Có hướng** (An gọi Bình khác Bình gọi An — ai chủ động gọi là thông tin quan trọng). Nếu chỉ quan tâm "hai người có từng nói chuyện không" thì mới rút về vô hướng.
> 2. Mỗi cặp có 2 cạnh (đi và về). Số cặp = $\\binom{5}{2} = 10$, nên $10 \\times 2 = \\mathbf{20}$ cạnh có hướng.
> </details>

> 📝 **Tóm tắt mục 2.**
> - **Node** = cá nhân; **cạnh** = quan hệ trực tiếp (một bước) giữa 2 node.
> - Cạnh ≠ đường đi: "quen qua trung gian" không phải cạnh.
> - **Vô hướng**: cạnh đối xứng (A–B). **Có hướng**: cạnh có chiều (A → B ≠ B → A).

---

## 3. Bậc (degree) và bậc trung bình

### 3.1 Bậc của một node

> 💡 **Trực giác.** Bậc của một người là **số bạn trực tiếp** của họ — đếm xem có bao nhiêu đoạn thẳng cắm vào chấm tròn của người đó. Người "quảng giao" có bậc cao; người "cô độc" có bậc thấp.

**(a) Là gì.** **Bậc (degree)** của node $v$, ký hiệu $\\deg(v)$, là **số cạnh nối trực tiếp** vào $v$ (số hàng xóm — neighbors).

**(b) Vì sao cần.** Đây là thước đo *"độ kết nối cục bộ"* đơn giản nhất của một cá nhân. Nhiều đại lượng ảnh hưởng (influence) ở [Lesson 06](../lesson-06-centrality-influence/) khởi đầu từ bậc.

**(c) Ví dụ số cụ thể** — tính bậc từng người trong mạng 7 người:

| Node | Hàng xóm | $\\deg$ |
|---|---|:--:|
| An (A) | B, C | 2 |
| Bình (B) | A, C, D | 3 |
| Chi (C) | A, B, D | 3 |
| Dũng (D) | B, C, H | 3 |
| Hà (H) | D | 1 |
| Giang (G) | K | 1 |
| Khoa (K) | G | 1 |

Bốn ví dụ đọc từ bảng: $\\deg(\\text{An}) = 2$, $\\deg(\\text{Bình}) = 3$, $\\deg(\\text{Hà}) = 1$, $\\deg(\\text{Giang}) = 1$.

**Với mạng có hướng** bậc tách làm hai:
- **Bậc vào (in-degree):** số mũi tên *trỏ tới* node (vd số người follow bạn).
- **Bậc ra (out-degree):** số mũi tên *đi ra* từ node (vd số người bạn follow).

Ví dụ: một thần tượng có in-degree = 2 000 000 (fan theo dõi) nhưng out-degree = 50 (chỉ follow lại vài người).

### 3.2 Bổ đề bắt tay (Handshaking Lemma) và bậc trung bình

> 💡 **Trực giác.** Mỗi cạnh có **2 đầu**. Khi cộng bậc của *mọi* người, mỗi cạnh bị đếm đúng **2 lần** (một lần cho mỗi đầu). Vậy tổng tất cả các bậc phải bằng **gấp đôi số cạnh**. Giống như: trong một buổi tiệc, tổng số "cái bắt tay mà từng người thực hiện" = 2 × (số lần bắt tay), vì mỗi cú bắt tay có hai bàn tay.

$$\\sum_{v \\in V} \\deg(v) = 2E \\qquad \\text{(bổ đề bắt tay — mạng vô hướng)}$$

**Kiểm tra trên mạng 7 người:** tổng bậc $= 2 + 3 + 3 + 3 + 1 + 1 + 1 = 14$, và $2E = 2 \\times 7 = 14$. ✓ **Khớp cả hai vế.**

Từ đó, **bậc trung bình (average degree)** $\\langle k \\rangle$:

$$\\langle k \\rangle = \\frac{\\sum_v \\deg(v)}{N} = \\frac{2E}{N}$$

**Bốn ví dụ số cụ thể:**

1. Mạng 7 người: $\\langle k \\rangle = \\dfrac{2 \\times 7}{7} = \\dfrac{14}{7} = 2{,}0$. (Trung bình mỗi người có 2 bạn.)
2. Tam giác K₃ (3 người ai cũng quen ai): $E = 3$, $\\langle k \\rangle = \\dfrac{2 \\times 3}{3} = 2{,}0$ (đúng: mỗi người quen 2 người còn lại).
3. Ngôi sao 6 node ($E = 5$): $\\langle k \\rangle = \\dfrac{2 \\times 5}{6} = \\dfrac{10}{6} \\approx 1{,}67$ (giáo viên bậc 5, mỗi học sinh bậc 1: $\\frac{5 + 5 \\times 1}{6}$).
4. Đồ thị đầy đủ K₅ (5 người ai cũng quen ai, $E = 10$): $\\langle k \\rangle = \\dfrac{2 \\times 10}{5} = 4{,}0$ ($= N - 1$, vì mỗi người quen tất cả $4$ người còn lại).

> ⚠ **Lỗi thường gặp.** Quên hệ số **2**. Có người tính $\\langle k \\rangle = E/N = 7/7 = 1$ cho mạng 7 người — **sai**. Đúng là $2E/N = 2$. Lý do: mỗi cạnh phục vụ *hai* người nên đóng góp vào bậc *hai* lần.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Một mạng có $N = 10$, tổng bậc đếm được là $30$. Có bao nhiêu cạnh?
> 2. Bậc trung bình của mạng đó là bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. $\\sum \\deg = 2E \\Rightarrow 30 = 2E \\Rightarrow E = \\mathbf{15}$ cạnh.
> 2. $\\langle k \\rangle = 2E/N = 30/10 = \\mathbf{3{,}0}$.
> </details>

> 📝 **Tóm tắt mục 3.**
> - **Bậc** $\\deg(v)$ = số hàng xóm trực tiếp của $v$.
> - Có hướng: tách **in-degree** (được trỏ tới) và **out-degree** (trỏ đi).
> - **Bổ đề bắt tay:** $\\sum_v \\deg(v) = 2E$ — tổng bậc luôn gấp đôi số cạnh.
> - **Bậc trung bình:** $\\langle k \\rangle = 2E/N$.

---

## 4. Mật độ (density) — mạng "chặt" hay "thưa"?

> 💡 **Trực giác.** Mật độ trả lời câu: *"trong tất cả các quan hệ **có thể** tồn tại, thực tế đã dùng bao nhiêu phần trăm?"* Nếu mọi người quen mọi người → mật độ = 1 (chặt tối đa). Nếu hầu như không ai quen ai → mật độ gần 0 (thưa). Giống như đo "một lớp học đoàn kết đến mức nào".

### 4.1 Số cạnh tối đa

Với $N$ node **vô hướng**, mỗi *cặp* người có thể có tối đa 1 cạnh. Số cặp là:

$$E_{\\max} = \\binom{N}{2} = \\frac{N(N-1)}{2}$$

**Vì sao?** Chọn node thứ nhất có $N$ cách, node thứ hai có $N-1$ cách → $N(N-1)$ *cặp có thứ tự*; nhưng cạnh vô hướng A–B trùng B–A nên chia 2. Ví dụ $N = 7$: $E_{\\max} = \\frac{7 \\times 6}{2} = 21$ cạnh tối đa.

### 4.2 Công thức mật độ

$$\\boxed{\\ \\text{Mật độ} = \\frac{E}{E_{\\max}} = \\frac{E}{N(N-1)/2} = \\frac{2E}{N(N-1)}\\ } \\qquad \\text{(mạng vô hướng)}$$

Với **mạng có hướng**, số cạnh tối đa gấp đôi (mỗi cặp có 2 chiều A→B và B→A), nên:

$$\\text{Mật độ}_{\\text{có hướng}} = \\frac{E}{N(N-1)}$$

**Bốn (thực ra năm) ví dụ số cụ thể:**

| Mạng | $N$ | $E$ | $E_{\\max} = \\frac{N(N-1)}{2}$ | Mật độ $= \\frac{2E}{N(N-1)}$ |
|---|:--:|:--:|:--:|:--:|
| Mạng 7 người (bài học) | 7 | 7 | 21 | $\\frac{14}{42} = 0{,}333$ |
| Tam giác K₃ | 3 | 3 | 3 | $\\frac{6}{6} = 1{,}0$ (đầy đủ) |
| Ngôi sao 6 node | 6 | 5 | 15 | $\\frac{10}{30} = 0{,}333$ |
| Đồ thị đầy đủ K₅ | 5 | 10 | 10 | $\\frac{20}{20} = 1{,}0$ |
| Hai người chỉ 1 quan hệ | 2 | 1 | 1 | $\\frac{2}{2} = 1{,}0$ |

Walk-through dòng đầu: $\\dfrac{2 \\times 7}{7 \\times (7-1)} = \\dfrac{14}{42} = \\dfrac{1}{3} \\approx 0{,}333$. Nghĩa là mạng 7 người chỉ dùng **1/3** số quan hệ khả dĩ.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Có liên hệ gì giữa mật độ và bậc trung bình không?"* → Có, rất gọn: chia $\\langle k \\rangle = 2E/N$ cho $(N-1)$ ra ngay mật độ.
>   $$\\text{Mật độ} = \\frac{2E}{N(N-1)} = \\frac{\\langle k \\rangle}{N-1}$$
>   Kiểm tra mạng 7 người: $\\langle k \\rangle = 2$, $\\frac{2}{7-1} = \\frac{2}{6} = 0{,}333$ ✓. Ý nghĩa: mật độ = "trung bình mỗi người quen được **bao nhiêu phần** trong số người họ *có thể* quen".
> - *"Mạng xã hội thật có mật độ bao nhiêu?"* → **Cực kỳ thấp.** Facebook: mỗi người trung bình ~338 bạn, nhưng $N \\approx 3$ tỷ. Mật độ $\\approx \\frac{338}{3\\,000\\,000\\,000} \\approx 0{,}0000001$. Đây là đặc trưng phổ quát: mạng xã hội lớn luôn **thưa** — không ai kịp quen dù chỉ 0,001% nhân loại.

> ⚠ **Lỗi thường gặp.**
> - Dùng công thức **có hướng** cho mạng **vô hướng** (quên nhân 2 ở tử số, hay tương đương quên chia 2 ở $E_{\\max}$) → ra mật độ chỉ bằng nửa giá trị đúng.
> - Cho phép **tự nối chính mình** (self-loop) vào $E_{\\max}$ dùng $N^2$ thay vì $N(N-1)$. Trong mạng xã hội "quen chính mình" vô nghĩa → loại đường chéo, dùng $N(N-1)$.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Mạng $N = 5$, $E = 4$ (vô hướng). Mật độ bằng bao nhiêu?
> 2. Cùng số node đó nhưng là mạng **có hướng** với $E = 4$. Mật độ bằng bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. $\\frac{2 \\times 4}{5 \\times 4} = \\frac{8}{20} = \\mathbf{0{,}4}$.
> 2. $\\frac{4}{5 \\times 4} = \\frac{4}{20} = \\mathbf{0{,}2}$ (đúng bằng một nửa, vì mạng có hướng có gấp đôi số cạnh tối đa).
> </details>

> 📝 **Tóm tắt mục 4.**
> - **Số cạnh tối đa** (vô hướng): $E_{\\max} = \\frac{N(N-1)}{2}$.
> - **Mật độ** $= \\dfrac{2E}{N(N-1)} \\in [0, 1]$; có hướng thì $= \\dfrac{E}{N(N-1)}$.
> - Liên hệ gọn: mật độ $= \\dfrac{\\langle k \\rangle}{N-1}$.
> - Mạng xã hội thực tế **luôn thưa** (mật độ tí hon).

---

## 5. Đường đi và đường đi ngắn nhất

### 5.1 Đường đi (path)

> 💡 **Trực giác.** Một **đường đi** là chuỗi "nhảy" từ node này sang node kề nó, rồi tiếp, cho tới khi tới đích — như trò chơi "quen biết qua trung gian": An → Bình → Dũng → Hà nghĩa là An biết Hà qua 2 người trung gian. **Độ dài đường đi** = **số cạnh** (số bước nhảy), không phải số node.

**(a) Là gì.** Đường đi từ $u$ đến $w$ là dãy node $u = v_0, v_1, \\dots, v_k = w$ sao cho mỗi cặp liên tiếp $(v_{i}, v_{i+1})$ là một cạnh. **Độ dài** đường đi đó là $k$ (số cạnh).

**(b) Vì sao cần.** Để đo "khoảng cách xã hội": hai người xa nhau bao nhiêu bước quan hệ. Đây là nền của ý tưởng nổi tiếng *"sáu độ phân cách" (six degrees of separation)* — hầu như hai người bất kỳ trên Trái Đất nối được với nhau qua ≤ 6 bước.

**(c) Đường đi ngắn nhất (shortest path):** trong nhiều đường đi từ $u$ đến $w$, cái có **ít cạnh nhất**. Độ dài của nó gọi là **khoảng cách (distance)** $d(u, w)$.

**Bốn ví dụ số cụ thể** (mạng 7 người):

1. $d(\\text{An}, \\text{Dũng})$: An–B–D dài 2, hoặc An–C–D dài 2 → **$d = 2$**.
2. $d(\\text{An}, \\text{Hà})$: An–B–D–H dài 3 (hay An–C–D–H dài 3) → **$d = 3$**.
3. $d(\\text{Chi}, \\text{Dũng})$: C–D là một cạnh trực tiếp → **$d = 1$**.
4. $d(\\text{An}, \\text{Giang})$: An ở cụm trên, Giang ở cụm dưới, **không có** đường nào → **$d = \\infty$**.

### 5.2 Tìm đường ngắn nhất bằng BFS (Breadth-First Search)

> 💡 **Trực giác.** Đứng ở node xuất phát và "loang" ra như sóng nước: trước hết chạm mọi hàng xóm *cách 1 bước*, rồi mọi node *cách 2 bước*, rồi *3 bước*... Vì loang theo từng lớp, **lần đầu tiên** chạm tới đích chính là đường ngắn nhất. Đó là **duyệt theo chiều rộng (BFS)**.

**Walk-through số thật** — tìm khoảng cách từ **An** tới mọi người:

| Lớp (khoảng cách) | Node đạt tới lần đầu | Vì sao |
|:--:|---|---|
| 0 | An | điểm xuất phát |
| 1 | Bình, Chi | hàng xóm trực tiếp của An |
| 2 | Dũng | hàng xóm của Bình/Chi, chưa thăm |
| 3 | Hà | hàng xóm của Dũng, chưa thăm |
| ∞ | Giang, Khoa | **không bao giờ** loang tới (khác thành phần) |

Đọc kết quả: $d(\\text{An}, \\text{Bình}) = 1$, $d(\\text{An}, \\text{Dũng}) = 2$, $d(\\text{An}, \\text{Hà}) = 3$, $d(\\text{An}, \\text{Giang}) = \\infty$. Khớp với các ví dụ ở 5.1. ✓

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao BFS cho đúng đường ngắn nhất, không phải một đường nào đó?"* → Vì nó thăm node theo đúng thứ tự khoảng cách tăng dần. Một node ở lớp 2 không thể được chạm ở lớp 1 (nếu được thì nó đã ở lớp 1). Nên khoảng cách BFS gán là nhỏ nhất có thể.
> - *"Nếu có nhiều đường ngắn nhất cùng độ dài thì sao?"* → Vẫn hợp lệ; *độ dài* là duy nhất (ví dụ An→Hà luôn dài 3), nhưng có thể có nhiều đường cùng dài 3 (qua Bình hoặc qua Chi). Đếm số đường ngắn nhất là nền của *betweenness centrality* ở [Lesson 06](../lesson-06-centrality-influence/).

> ⚠ **Lỗi thường gặp.** Đếm độ dài đường đi bằng **số node** thay vì **số cạnh**. An–B–D–H có **4 node** nhưng độ dài là **3** (3 bước nhảy). Quy tắc: độ dài = số node − 1.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Trong mạng 7 người, $d(\\text{Hà}, \\text{An})$ bằng bao nhiêu? (chú ý mạng vô hướng nên đối xứng)
> 2. $d(\\text{Hà}, \\text{Chi})$ bằng bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. Mạng vô hướng nên $d(\\text{Hà}, \\text{An}) = d(\\text{An}, \\text{Hà}) = \\mathbf{3}$ (H–D–B–A hoặc H–D–C–A).
> 2. H–D–C là 2 cạnh → $\\mathbf{2}$.
> </details>

> 📝 **Tóm tắt mục 5.**
> - **Đường đi** = chuỗi cạnh nối; **độ dài** = số cạnh (= số node − 1).
> - **Khoảng cách** $d(u,w)$ = độ dài đường đi ngắn nhất; $= \\infty$ nếu không nối được.
> - **BFS** loang theo từng lớp → lần đầu chạm đích là đường ngắn nhất.

---

## 6. Thành phần liên thông (connected component)

> 💡 **Trực giác.** Nhìn bức tranh mạng: đôi khi nó vỡ thành vài "cụm đảo" tách rời, không có cầu nối giữa các đảo. Mỗi đảo là một **thành phần liên thông** — một nhóm mà bên trong ai cũng đi tới được ai (qua đường đi nào đó), nhưng không đi sang đảo khác được.

**(a) Là gì.** Một **thành phần liên thông** là tập node lớn nhất mà giữa hai node bất kỳ *trong đó* đều tồn tại đường đi. Số thành phần đếm xem mạng vỡ làm bao nhiêu mảnh rời.

**(b) Vì sao cần.** Nó cho biết mạng có "một khối" hay bị chia rẽ. Trong lan truyền thông tin/dịch bệnh: tin/virus khởi phát ở một thành phần **không thể** tự nhảy sang thành phần khác — cần một cạnh cầu nối mới.

**(c) Ví dụ số cụ thể:**

1. **Mạng 7 người:** hai mảnh — $\\{$An, Bình, Chi, Dũng, Hà$\\}$ (5 người) và $\\{$Giang, Khoa$\\}$ (2 người) → **2 thành phần**.
2. Đồ thị đầy đủ K₅: mọi người nối nhau → **1 thành phần**.
3. Năm người hoàn toàn cô lập (không cạnh nào): mỗi người là một đảo → **5 thành phần**.
4. Hai tam giác tách rời (2 nhóm bạn 3 người, không quen chéo): **2 thành phần**, mỗi thành phần 3 node.

**Cách đếm (flood fill):** bắt đầu ở một node chưa thăm, BFS/loang thăm hết cả cụm chứa nó (đó là 1 thành phần), rồi nhảy tới node chưa thăm tiếp theo, lặp lại. Số lần khởi động = số thành phần.

Áp dụng cho mạng 7 người:
- Khởi động ở An → loang tới {An, Bình, Chi, Dũng, Hà}. Đó là thành phần #1.
- Node chưa thăm còn lại: Giang → loang tới {Giang, Khoa}. Thành phần #2.
- Hết node. → **2 thành phần**. ✓

> ⚠ **Lỗi thường gặp.** Với mạng **có hướng**, phải phân biệt *liên thông mạnh* (strongly connected: đi được cả hai chiều A↔B) và *liên thông yếu* (weakly connected: bỏ chiều mũi tên thì nối được). Trong mạng vô hướng không có phân biệt này. Bài này tính cho mạng vô hướng.

> 🔁 **Dừng lại tự kiểm tra.**
> Nếu thêm một cạnh Hà–Giang vào mạng 7 người, số thành phần thay đổi thế nào?
>
> <details><summary>Đáp án</summary>
>
> Cạnh Hà–Giang bắc cầu hai cụm lại → cả 7 người giờ nối được với nhau → còn **1 thành phần**. Một cạnh cầu (bridge) duy nhất đủ để gộp hai đảo.
> </details>

> 📝 **Tóm tắt mục 6.**
> - **Thành phần liên thông** = một "đảo" mà bên trong ai cũng tới được ai.
> - Đếm bằng **flood fill**: mỗi lần khởi động BFS ở node chưa thăm = 1 thành phần.
> - Mạng 7 người có **2** thành phần; một cạnh cầu có thể gộp chúng.

---

## 7. Ma trận kề (adjacency matrix)

> 💡 **Trực giác.** Thay vì vẽ chấm-và-đoạn, ta ghi mạng thành **bảng ô vuông** $N \\times N$: hàng $i$, cột $j$ điền **1** nếu $i$ và $j$ có cạnh, điền **0** nếu không. Máy tính thích cách này vì tra "$i$ quen $j$ không?" chỉ mất một lần đọc ô.

**(a) Là gì.** **Ma trận kề** $A$ là bảng $N \\times N$ với $A_{ij} = 1$ khi có cạnh giữa $i$ và $j$, ngược lại $A_{ij} = 0$.

**(b) Vì sao cần.** (1) Biểu diễn gọn cho máy tính. (2) Nhiều tính chất mạng đọc thẳng từ ma trận: **tổng một hàng = bậc của node đó**; ma trận **đối xứng** ⟺ mạng vô hướng; lũy thừa ma trận $A^k$ đếm số đường đi độ dài $k$ (dùng ở các bài sau).

**(c) Ma trận kề của mạng 7 người** (thứ tự A, B, C, D, H, G, K):

|   | A | B | C | D | H | G | K | **Tổng hàng = bậc** |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:--:|
| **A** | 0 | 1 | 1 | 0 | 0 | 0 | 0 | 2 |
| **B** | 1 | 0 | 1 | 1 | 0 | 0 | 0 | 3 |
| **C** | 1 | 1 | 0 | 1 | 0 | 0 | 0 | 3 |
| **D** | 0 | 1 | 1 | 0 | 1 | 0 | 0 | 3 |
| **H** | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 1 |
| **G** | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 |
| **K** | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 1 |

**Đọc ma trận — bốn quan sát số cụ thể:**

1. Tổng hàng A = $0+1+1+0+0+0+0 = 2 = \\deg(\\text{An})$ ✓. Mọi tổng hàng khớp cột "bậc" — đúng bổ đề bắt tay.
2. Tổng **toàn bộ** ma trận $= 14 = 2E$ (mỗi cạnh đếm 2 lần: ô $ij$ và ô $ji$).
3. Ma trận **đối xứng** qua đường chéo ($A_{ij} = A_{ji}$) → xác nhận đây là mạng **vô hướng**. (Nếu có hướng, ma trận thường *không* đối xứng.)
4. Đường chéo toàn **0** → không ai tự nối chính mình (không self-loop).

> ⚠ **Lỗi thường gặp.** Với mạng vô hướng, quên điền **cả hai** ô $A_{ij}$ *và* $A_{ji}$. Cạnh A–B phải cho $A_{\\text{A,B}} = 1$ *và* $A_{\\text{B,A}} = 1$. Điền một ô → ma trận mất đối xứng, tính bậc sai.

> 🔁 **Dừng lại tự kiểm tra.**
> Nhìn ma trận trên, node nào có bậc lớn nhất? Có mấy node như vậy?
>
> <details><summary>Đáp án</summary>
>
> Bậc lớn nhất là **3**, đạt bởi **Bình, Chi, Dũng** (3 node). Đọc thẳng từ cột "Tổng hàng".
> </details>

> 📝 **Tóm tắt mục 7.**
> - **Ma trận kề** $A$: bảng $N\\times N$, $A_{ij}=1$ nếu có cạnh, $0$ nếu không.
> - Tổng hàng $i$ = $\\deg(i)$; tổng toàn ma trận $= 2E$.
> - Đối xứng ⟺ vô hướng; đường chéo $0$ ⟺ không self-loop.

---

## 8. Walk-through tổng hợp trên mạng 7 người

Gom mọi đại lượng đã học về một chỗ, tính lại từ đầu để thấy chúng ăn khớp:

**Dữ liệu:** $N = 7$; cạnh = {A–B, A–C, B–C, B–D, C–D, D–H, G–K} → $E = 7$.

| Đại lượng | Công thức | Thay số | Kết quả |
|---|---|---|:--:|
| Số node | $N$ | — | **7** |
| Số cạnh | $E$ | — | **7** |
| Tổng bậc | $\\sum \\deg$ | $2+3+3+3+1+1+1$ | **14** |
| Kiểm tra bắt tay | $= 2E$? | $14 = 2\\times 7$ | ✓ |
| Bậc trung bình | $2E/N$ | $14/7$ | **2,0** |
| Số cạnh tối đa | $N(N-1)/2$ | $7\\times 6/2$ | **21** |
| Mật độ | $2E/[N(N-1)]$ | $14/42$ | **0,333** |
| Mật độ (cách 2) | $\\langle k\\rangle/(N-1)$ | $2/6$ | **0,333** ✓ |
| Số thành phần | flood fill | {A,B,C,D,H}, {G,K} | **2** |
| $d(\\text{An}, \\text{Hà})$ | BFS | An–B–D–H | **3** |
| $d(\\text{An}, \\text{Giang})$ | BFS | khác thành phần | **∞** |

Hai cách tính mật độ ra cùng 0,333 — dấu hiệu công thức nhất quán.

---

## 9. Bài tập

**Bài 1 (đọc mạng).** Cho mạng bạn bè 6 người với các cạnh: P–Q, P–R, Q–R, R–S, S–T, và U đứng một mình (không cạnh nào).
- a) Tính bậc từng node.
- b) Tính $E$, bậc trung bình, mật độ.
- c) Đếm số thành phần liên thông.

**Bài 2 (đường đi).** Vẫn mạng ở Bài 1.
- a) Tìm $d(P, T)$ và liệt kê một đường đi ngắn nhất.
- b) $d(P, U)$ bằng bao nhiêu?

**Bài 3 (ma trận kề).** Cho ma trận kề vô hướng sau (thứ tự node X, Y, Z, W):

|   | X | Y | Z | W |
|---|:-:|:-:|:-:|:-:|
| **X** | 0 | 1 | 1 | 0 |
| **Y** | 1 | 0 | 1 | 1 |
| **Z** | 1 | 1 | 0 | 0 |
| **W** | 0 | 1 | 0 | 0 |

- a) Liệt kê các cạnh.
- b) Tính bậc từng node và $E$.
- c) Mật độ bằng bao nhiêu?

**Bài 4 (có hướng vs vô hướng).** Một nhóm 4 người trên Twitter với các lượt theo dõi (mũi tên = "follow"): A→B, B→A, A→C, C→D. Coi đây là mạng **có hướng**.
- a) Tính in-degree và out-degree mỗi người.
- b) Mật độ của mạng có hướng này bằng bao nhiêu?
- c) Nếu "làm phẳng" thành vô hướng (chỉ quan tâm "hai người có tương tác không", gộp A↔B thành 1 cạnh), khi đó $E$ và mật độ bằng bao nhiêu?

---

## 10. Lời giải chi tiết

**Bài 1.** Cạnh: P–Q, P–R, Q–R, R–S, S–T; U cô lập. Vậy $E = 5$, $N = 6$.

a) Bậc từng node (đếm cạnh cắm vào):
- $\\deg(P) = 2$ (Q, R); $\\deg(Q) = 2$ (P, R); $\\deg(R) = 3$ (P, Q, S); $\\deg(S) = 2$ (R, T); $\\deg(T) = 1$ (S); $\\deg(U) = 0$ (cô lập).
- Kiểm tra bắt tay: $2+2+3+2+1+0 = 10 = 2E = 2\\times 5$ ✓.

b)
- $E = 5$.
- Bậc trung bình $\\langle k\\rangle = 2E/N = 10/6 \\approx \\mathbf{1{,}67}$.
- Mật độ $= \\dfrac{2E}{N(N-1)} = \\dfrac{10}{6\\times 5} = \\dfrac{10}{30} = \\mathbf{0{,}333}$.

c) Flood fill: khởi động ở P → loang {P, Q, R, S, T} (một cụm). Còn U chưa thăm → khởi động lần 2 → {U}. Hết node → **2 thành phần** ({P,Q,R,S,T} và {U}).

**Bài 2.**

a) $d(P, T)$: BFS từ P. Lớp 0: {P}. Lớp 1: {Q, R}. Lớp 2: {S} (hàng xóm của R). Lớp 3: {T} (hàng xóm của S). Vậy $d(P,T) = \\mathbf{3}$, một đường ngắn nhất là **P–R–S–T** (3 cạnh).

b) $d(P, U)$: U cô lập, không cạnh nào → BFS từ P không bao giờ chạm U → $d(P,U) = \\boldsymbol{\\infty}$ (khác thành phần).

**Bài 3.**

a) Cạnh (đọc các ô = 1 phía trên đường chéo để không lặp): X–Y, X–Z, Y–Z, Y–W. → **4 cạnh**.

b) Bậc = tổng hàng:
- $\\deg(X) = 0+1+1+0 = 2$; $\\deg(Y) = 1+0+1+1 = 3$; $\\deg(Z) = 1+1+0+0 = 2$; $\\deg(W) = 0+1+0+0 = 1$.
- $E$: tổng bậc $= 2+3+2+1 = 8 = 2E \\Rightarrow E = \\mathbf{4}$ ✓ (khớp câu a).

c) $N = 4$, $E = 4$: mật độ $= \\dfrac{2\\times 4}{4\\times 3} = \\dfrac{8}{12} = \\mathbf{0{,}667}$.

**Bài 4.** Mạng có hướng, cạnh: A→B, B→A, A→C, C→D. $N = 4$, số cạnh có hướng $E = 4$.

a) In-degree (số mũi tên tới) và out-degree (số mũi tên đi):

| Node | out (đi) | in (tới) |
|---|:--:|:--:|
| A | 2 (→B, →C) | 1 (B→A) |
| B | 1 (→A) | 1 (A→B) |
| C | 1 (→D) | 1 (A→C) |
| D | 0 | 1 (C→D) |

Kiểm tra: tổng out $= 2+1+1+0 = 4 = E$, tổng in $= 1+1+1+1 = 4 = E$ ✓ (mỗi cạnh có hướng góp đúng 1 vào tổng out và 1 vào tổng in).

b) Mật độ có hướng $= \\dfrac{E}{N(N-1)} = \\dfrac{4}{4\\times 3} = \\dfrac{4}{12} = \\mathbf{0{,}333}$.

c) Làm phẳng: cặp A–B có 2 mũi tên (A→B, B→A) gộp thành **1** cạnh vô hướng; A–C thành 1 cạnh; C–D thành 1 cạnh. Vậy $E_{\\text{vô hướng}} = \\mathbf{3}$. Mật độ vô hướng $= \\dfrac{2\\times 3}{4\\times 3} = \\dfrac{6}{12} = \\mathbf{0{,}5}$.

Quan sát: cùng dữ liệu, mật độ vô hướng (0,5) *cao hơn* có hướng (0,333) vì $E_{\\max}$ vô hướng nhỏ hơn (12/2 = 6 thay vì 12), lại còn gộp cặp đối ứng A↔B lại làm một.

---

## 11. Bài tiếp theo

**[Lesson 06 — Trung tâm & Ảnh hưởng (Centrality & Influence)](../lesson-06-centrality-influence/)** *(sắp ra)*: đã biết bậc là "độ kết nối cục bộ", giờ hỏi sâu hơn — *ai là người quan trọng nhất trong mạng?* Ta sẽ học các thước đo **centrality** (degree, closeness, betweenness, eigenvector) — dùng chính khoảng cách BFS và ma trận kề của bài này làm nguyên liệu.

Minh họa tương tác: [visualization.html](./visualization.html) — tự dựng mạng bằng cách click thêm node, kéo nối cạnh; xem bậc, mật độ, số thành phần cập nhật realtime; chọn 2 node để tô đường đi ngắn nhất.
`;
