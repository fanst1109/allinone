// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Sociology/02-Networks-Structure/lesson-07-small-world-weak-ties/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Thế giới nhỏ & sức mạnh của liên kết yếu (Small-world, weak ties)

> Hai điều tưởng như mâu thuẫn cùng đúng: mạng xã hội loài người **rất cụm** (bạn của bạn tôi cũng là bạn tôi) nhưng **đường đi lại cực ngắn** (chỉ ~6 bước là chạm tới bất kỳ ai). Bài này giải thích *vì sao* — và tại sao chính những **liên kết yếu** ít ai để ý mới là thứ giữ cho thế giới "nhỏ".

## Mục tiêu học tập

- Định nghĩa và tính được hai thước đo của một mạng: **đường đi trung bình (average path length) $L$** và **hệ số cụm (clustering coefficient) $C$**.
- Hiểu **mô hình Watts-Strogatz**: từ mạng vòng đều → tái nối (rewire) mỗi cạnh với xác suất $p$ → vì sao chỉ cần $p$ **nhỏ** là $L$ đã rớt mạnh trong khi $C$ còn cao — **vùng thế giới nhỏ**.
- Giải thích được câu "sáu bước tách biệt (six degrees of separation)" bằng cấu trúc mạng, không phải huyền thoại.
- Phát biểu và biện luận **"sức mạnh của liên kết yếu" (Granovetter)**: vì sao cầu nối (bridge) giữa các cụm luôn là liên kết yếu, và vì sao liên kết yếu mới mang thông tin mới.

## Kiến thức tiền đề

- Khái niệm mạng lưới cơ bản: đỉnh (node), cạnh (edge), bậc (degree), đường đi (path). Nếu chưa chắc, xem lại các bài đầu Tầng 2.
- Đo tầm quan trọng của một đỉnh — xem [Lesson 06: Trung tâm & ảnh hưởng](../lesson-06-centrality-influence/). Bài này chuyển từ "đỉnh nào quan trọng" sang "*hình dạng tổng thể* của mạng ra sao".
- Số học cơ bản, logarit, tổ hợp $\\binom{n}{2}$. Không cần lập trình.

---

## 1. Câu hỏi mở đầu: "Sáu bước tới bất kỳ ai"

> 💡 **Trực giác.** Bạn có khoảng vài trăm người quen. Người lạ ở đầu kia địa cầu cũng vậy. Trực giác ngây thơ nói: hai người ngẫu nhiên phải cách nhau *rất xa* trong mạng quen biết. Nhưng thực nghiệm lại nói ngược lại — chỉ vài bước. Mâu thuẫn này chính là bài toán "thế giới nhỏ".

Năm 1967, nhà tâm lý học **Stanley Milgram** làm thí nghiệm: đưa một lá thư cho người ngẫu nhiên ở Nebraska/Kansas, yêu cầu chuyển tới một người mục tiêu ở Boston **chỉ qua người quen trực tiếp**. Trong các chuỗi tới đích, số bước trung gian trung bình là **khoảng 5–6**. Từ đó có thành ngữ **"sáu bước tách biệt"**.

Con số đó ngày càng nhỏ khi mạng dày lên:

| Mạng | Quy mô | Khoảng cách trung bình |
|------|-------:|:----------------------:|
| Milgram (thư tay, 1967) | ~hàng trăm chuỗi | ~5.5 – 6 |
| Facebook (2011) | 721 triệu người | **4.74** |
| Facebook (2016) | 1.6 tỉ người | **3.57** |
| Twitter (2010) | ~500 triệu | ~4.17 |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Nếu ai cũng chỉ chơi với nhóm nhỏ quanh mình, sao lại chạm tới người xa nhanh thế?"* → Vì tồn tại vài **liên kết bắc cầu** đường dài. Mục 3–5 sẽ chỉ rõ cơ chế.
> - *"Vậy mạng người là ngẫu nhiên à?"* → Không. Nó **cụm rất mạnh** (bạn của bạn thường quen nhau) — ngược hẳn mạng ngẫu nhiên. Điều đặc biệt là nó *vừa cụm vừa có đường ngắn*. Đo được hai tính chất này là việc của mục 2.

---

## 2. Hai thước đo của một mạng: $L$ và $C$

Để nói "thế giới nhỏ" một cách chính xác, cần hai con số.

### 2.1 Đường đi trung bình $L$ (average path length)

**(a) Là gì.** Với mỗi cặp đỉnh, tính **đường đi ngắn nhất** (số cạnh phải đi) giữa chúng. $L$ là **trung bình** của tất cả các đường đi ngắn nhất đó trên mọi cặp đỉnh:

$$L = \\frac{1}{\\binom{N}{2}} \\sum_{i < j} d(i, j)$$

trong đó $d(i,j)$ là số cạnh trên đường ngắn nhất từ $i$ tới $j$, $N$ là số đỉnh.

**(b) Vì sao cần.** $L$ đo "mạng nhỏ tới đâu": $L$ nhỏ nghĩa là thông tin/bệnh dịch/tin đồn lan tới toàn mạng qua ít bước. Đây chính là đại lượng định lượng cho "sáu bước tách biệt".

**(c) Ví dụ số cụ thể.** Mạng 4 người theo đường thẳng $A-B-C-D$:
- $d(A,B)=1,\\ d(B,C)=1,\\ d(C,D)=1$ (kề nhau).
- $d(A,C)=2,\\ d(B,D)=2$ (cách 1 người).
- $d(A,D)=3$ (hai đầu).
- $L = \\dfrac{1+1+1+2+2+3}{\\binom{4}{2}} = \\dfrac{10}{6} \\approx 1.67$.

Nếu thêm cạnh tắt $A-D$ (nối hai đầu): $d(A,D)$ tụt từ 3 xuống 1, và $d(A,C)$ tụt còn... $A-D-C = 2$ (không đổi), $d(B,D)$ còn $B-A-D=2$ hoặc $B-C-D=2$. Tổng mới $=1+1+1+2+2+1=8$, $L=8/6\\approx 1.33$. **Một cạnh tắt kéo $L$ xuống.** Giữ ý này — nó là linh hồn của cả bài.

### 2.2 Hệ số cụm $C$ (clustering coefficient)

> 💡 **Trực giác.** $C$ trả lời câu: *"Bạn bè của tôi có quen nhau không?"* Trong đời thật, hai người bạn thân của bạn rất hay quen nhau → mạng người có $C$ cao. Trong một nhóm người bốc thăm ngẫu nhiên, hai người quen bạn hầu như không quen nhau → $C$ thấp.

**(a) Là gì.** Với một đỉnh $i$ có bậc $k_i$ (tức $k_i$ hàng xóm), $k_i$ hàng xóm đó có tối đa $\\binom{k_i}{2}$ cặp có thể nối nhau. Gọi $e_i$ là số cặp *thực sự* có cạnh. Hệ số cụm cục bộ:

$$C_i = \\frac{e_i}{\\binom{k_i}{2}} = \\frac{2\\,e_i}{k_i (k_i - 1)}$$

Hệ số cụm toàn mạng $C$ là trung bình $C_i$ trên mọi đỉnh (bậc $\\ge 2$).

**(b) Vì sao cần.** $C$ đo mức độ "khép kín thành cụm". $C$ cao = nhiều tam giác (bạn của bạn là bạn) = cấu trúc cộng đồng chặt. $L$ và $C$ là **hai trục độc lập**: một mạng có thể $C$ cao & $L$ cao (làng quê cô lập), hoặc $C$ thấp & $L$ thấp (mạng ngẫu nhiên), hoặc — điều thú vị — **$C$ cao & $L$ thấp** (thế giới nhỏ).

**(c) Ví dụ số cụ thể** (≥ 4 tình huống một đỉnh $i$ bậc $k_i = 4$, tức $\\binom{4}{2}=6$ cặp hàng xóm):

| Số cặp hàng xóm quen nhau $e_i$ | $C_i = e_i/6$ | Diễn giải |
|:---:|:---:|---|
| 0 | 0.00 | 4 người quen tôi, không ai quen nhau (hình ngôi sao) |
| 3 | 0.50 | nửa số cặp quen nhau (đúng bằng mạng vòng $k=4$, mục 3) |
| 4 | 0.67 | khá khép kín |
| 6 | 1.00 | 4 hàng xóm quen nhau đôi một (cụm hoàn hảo — clique) |

> ⚠ **Lỗi thường gặp.** Nhầm $C$ với **mật độ (density)** của toàn mạng. $C$ chỉ nhìn *quanh mỗi đỉnh* (hàng xóm có nối nhau không), không phải tỉ lệ cạnh trên toàn mạng. Một mạng thưa (ít cạnh) vẫn có $C$ cao nếu các cạnh dồn thành cụm.

> ⚠ **Lỗi thường gặp thứ hai.** Tưởng $L$ nhỏ thì $C$ phải nhỏ (và ngược lại). Sai — chúng độc lập. Toàn bộ bất ngờ của thế giới nhỏ nằm ở chỗ **$L$ nhỏ mà $C$ vẫn to**.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Đỉnh $i$ có 5 hàng xóm; trong đó có 2 cặp quen nhau. $C_i = ?$
> 2. Trong tam giác $A-B-C$ (ba người quen nhau đôi một), $C_A = ?$
>
> <details><summary>Đáp án</summary>
>
> 1. $\\binom{5}{2}=10$ cặp; $C_i = 2/10 = 0.2$.
> 2. $A$ có 2 hàng xóm $B, C$; $\\binom{2}{2}=1$ cặp; cặp đó ($B$–$C$) có quen → $C_A = 1/1 = 1$. Tam giác luôn cho $C=1$.
> </details>

> 📝 **Tóm tắt mục 2.**
> - $L$ = trung bình đường đi ngắn nhất giữa mọi cặp → "mạng nhỏ tới đâu".
> - $C$ = xác suất hai hàng xóm của một đỉnh cũng nối nhau → "cụm chặt tới đâu".
> - $L$ và $C$ **độc lập**. Thế giới nhỏ = $L$ thấp **đồng thời** $C$ cao.

---

## 3. Mô hình Watts-Strogatz

Năm 1998, **Duncan Watts** và **Steven Strogatz** đưa ra một mô hình tối giản giải thích được cả $C$ cao lẫn $L$ thấp bằng **một tham số duy nhất** $p$.

### 3.1 Cách xây dựng

1. **Mạng vòng đều (ring lattice).** Xếp $N$ đỉnh thành vòng tròn. Mỗi đỉnh nối với $k$ hàng xóm gần nhất ($k/2$ mỗi bên). Đây là mạng "làng quê": ai cũng chỉ quen người sát bên → **rất cụm**, nhưng muốn sang phía đối diện vòng phải đi vòng vèo → **$L$ lớn**.
2. **Tái nối (rewire).** Duyệt từng cạnh. Với xác suất $p$, gỡ một đầu của cạnh và **nối lại tới một đỉnh ngẫu nhiên** bất kỳ trên vòng (tránh trùng/tự nối). Với xác suất $1-p$ giữ nguyên.
3. $p$ điều khiển "độ hỗn loạn": $p=0$ giữ nguyên mạng vòng; $p=1$ nối lại gần như toàn bộ → thành **mạng ngẫu nhiên**.

Mỗi cạnh được tái nối tạo ra một **đường tắt (shortcut)** cắt ngang vòng — đây chính là "liên kết yếu bắc cầu" ở mục 5.

### 3.2 Hai cực: $p=0$ và $p=1$

Với mạng vòng đều $N$ đỉnh, mỗi đỉnh bậc $k$, có các công thức tiệm cận (cho $N$ lớn):

$$
\\begin{aligned}
\\textbf{Mạng vòng } (p=0): \\quad & L(0) \\approx \\frac{N}{2k}, \\qquad C(0) = \\frac{3(k-2)}{4(k-1)} \\\\
\\textbf{Mạng ngẫu nhiên } (p=1): \\quad & L(1) \\approx \\frac{\\ln N}{\\ln k}, \\qquad C(1) \\approx \\frac{k}{N}
\\end{aligned}
$$

Điểm mấu chốt nằm ở **cách $L$ tăng theo $N$**: mạng vòng thì $L \\sim N$ (tuyến tính — mạng lớn thì đường dài kinh khủng), mạng ngẫu nhiên thì $L \\sim \\ln N$ (log — mạng lớn cỡ nào đường vẫn ngắn). Còn $C(0)$ **không phụ thuộc $N$** (giữ cao), trong khi $C(1)\\to 0$ khi $N$ lớn.

**Ví dụ số cho $C(0)$ theo $k$** (đây là ≥ 4 ví dụ số cho một công thức, verify trực tiếp):

| $k$ | $C(0)=\\dfrac{3(k-2)}{4(k-1)}$ | Tính tay |
|:---:|:---:|---|
| 4 | 0.500 | $3\\cdot2/(4\\cdot3)=6/12$ |
| 6 | 0.600 | $3\\cdot4/(4\\cdot5)=12/20$ |
| 10 | 0.667 | $3\\cdot8/(4\\cdot9)=24/36$ |
| 20 | 0.711 | $3\\cdot18/(4\\cdot19)=54/76$ |

Khi $k$ lớn, $C(0)\\to 3/4 = 0.75$. Mạng vòng luôn rất cụm.

**Ví dụ số hai cực với $N=1000,\\ k=10$:**
- $L(0)\\approx 1000/(2\\cdot10)=\\mathbf{50}$ — muốn sang phía đối diện phải qua ~50 người.
- $C(0)= 3\\cdot8/(4\\cdot9)=\\mathbf{0.667}$ — cụm rất chặt.
- $L(1)\\approx \\ln 1000/\\ln 10 = 6.908/2.303 \\approx \\mathbf{3.0}$ — chỉ 3 bước!
- $C(1)\\approx 10/1000 = \\mathbf{0.01}$ — gần như không cụm.

### 3.3 Vùng "thế giới nhỏ": $p$ nhỏ → $L$ rớt mạnh, $C$ còn cao

> 💡 **Trực giác — vì sao bất đối xứng.** Tưởng tượng vòng tròn 1000 người. Thêm **một** đường tắt nối hai điểm đối diện: đường tắt đó rút ngắn khoảng cách cho **hàng loạt cặp** hai bên (ai gần đầu này muốn sang đầu kia đều nhờ được) → $L$ giảm *mạnh và phi tuyến* chỉ với vài đường tắt. Nhưng tái nối một cạnh chỉ phá vỡ cụm **quanh đúng vài đỉnh liên quan** → $C$ giảm *chậm và gần tuyến tính*. Hai tốc độ giảm khác nhau tạo ra khoảng $p$ mà $L$ đã thấp nhưng $C$ còn cao.

Watts-Strogatz chuẩn hóa cả hai theo giá trị tại $p=0$: vẽ $L(p)/L(0)$ và $C(p)/C(0)$ theo $p$ (trục $p$ thang log). Kết quả kinh điển (mô phỏng $N=1000, k=10$, trung bình nhiều lần):

| $p$ | $L(p)/L(0)$ | $C(p)/C(0)$ | Chế độ |
|:---:|:---:|:---:|---|
| 0 | 1.00 | 1.00 | Mạng vòng đều |
| 0.001 | ~0.75 | ~0.99 | mới nhú vài đường tắt |
| 0.01 | **~0.28** | **~0.96** | **Thế giới nhỏ**: $L$ đã rớt, $C$ gần như nguyên |
| 0.1 | ~0.13 | ~0.83 | vẫn thế giới nhỏ, cụm bắt đầu giảm |
| 1 | ~0.07 | ~0.02 | Mạng ngẫu nhiên: cả hai đều thấp |

Nhìn dòng $p=0.01$: chỉ **1% số cạnh** được tái nối mà $L$ đã tụt về ~28% giá trị ban đầu, trong khi $C$ vẫn giữ ~96%. Đó là **vùng thế giới nhỏ** — và mạng xã hội thật nằm đúng ở đây.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao $L$ giảm nhanh hơn $C$?"* → Vì một đường tắt phục vụ *nhiều cặp cùng lúc* (hiệu ứng toàn cục, phi tuyến), còn tái nối phá cụm chỉ *cục bộ quanh vài đỉnh* (tuyến tính). Xem walk-through mục 4 với số thật.
> - *"$p$ nhỏ cỡ nào là 'thế giới nhỏ'?"* → Khoảng $0.001 \\lesssim p \\lesssim 0.1$ với mạng lớn. Không cần nhiều đường tắt — vài cái là đủ.
> - *"Đường tắt trong mô hình ứng với gì ngoài đời?"* → Chính là **liên kết yếu bắc cầu**: người bạn học cũ ở thành phố khác, đồng nghiệp cũ ngành khác... Mục 5.

> ⚠ **Lỗi thường gặp.** Nghĩ "muốn $L$ nhỏ phải tái nối gần hết mạng ($p$ lớn)". Sai — đó chính là phát hiện phản trực giác của Watts-Strogatz: **chỉ cần một nhúm đường tắt** ($p$ rất nhỏ) là đủ kéo $L$ xuống gần mức mạng ngẫu nhiên, mà không phải hi sinh cụm.

> 📝 **Tóm tắt mục 3.**
> - Watts-Strogatz: mạng vòng đều → tái nối mỗi cạnh với xác suất $p$.
> - $p=0$: $L$ lớn ($\\sim N$), $C$ cao. $p=1$: $L$ nhỏ ($\\sim \\ln N$), $C\\to 0$.
> - $p$ **nhỏ**: $L$ rớt mạnh (phi tuyến, do đường tắt phục vụ nhiều cặp) nhưng $C$ còn cao (giảm chậm, cục bộ) → **vùng thế giới nhỏ**.

---

## 4. Walk-through: tính $L$ và $C$ bằng tay

Làm với mạng vòng nhỏ $N=12$, $k=4$ (mỗi đỉnh nối $\\pm 1, \\pm 2$) để thấy con số thật.

### 4.1 Mạng vòng đều ($p=0$)

**Tính $C(0)$.** Xét đỉnh 0, hàng xóm $\\{1, 2, 10, 11\\}$. Trong $\\binom{4}{2}=6$ cặp, cặp nào có cạnh (khoảng cách vòng $\\le 2$)?

| Cặp | Khoảng cách vòng | Có cạnh? |
|:---:|:---:|:---:|
| 1–2 | 1 | ✓ |
| 1–10 | 3 | ✗ |
| 1–11 | 2 | ✓ |
| 2–10 | 4 | ✗ |
| 2–11 | 3 | ✗ |
| 10–11 | 1 | ✓ |

3 cặp có cạnh $\\Rightarrow C_0 = 3/6 = 0.5$. Do đối xứng, mọi đỉnh giống nhau $\\Rightarrow \\mathbf{C(0)=0.5}$ (khớp công thức $3(k-2)/(4(k-1))=3\\cdot2/12=0.5$ ✓).

**Tính $L(0)$.** Từ đỉnh 0, mỗi bước nhảy tối đa 2 đỉnh, nên tới đỉnh cách vòng $d$ mất $\\lceil d/2\\rceil$ bước. Trên vòng $N=12$: $d=1..5$ mỗi khoảng có 2 đỉnh, $d=6$ (đối diện) có 1 đỉnh.

| $d$ | Số bước $\\lceil d/2\\rceil$ | Số đỉnh | Đóng góp |
|:---:|:---:|:---:|:---:|
| 1 | 1 | 2 | 2 |
| 2 | 1 | 2 | 2 |
| 3 | 2 | 2 | 4 |
| 4 | 2 | 2 | 4 |
| 5 | 3 | 2 | 6 |
| 6 | 3 | 1 | 3 |

Tổng khoảng cách từ đỉnh 0 tới 11 đỉnh còn lại $= 2+2+4+4+6+3 = 21$. $\\Rightarrow L(0) = 21/11 \\approx \\mathbf{1.91}$.

### 4.2 Tái nối một cạnh → một đường tắt

Gỡ cạnh $0$–$2$, nối lại thành $0$–$6$ (một đường tắt cắt ngang sang phía đối diện vòng). Tính lại đường đi ngắn nhất từ đỉnh 0 (giờ hàng xóm là $\\{1, 6, 10, 11\\}$):

| Đỉnh đích | Đường ngắn nhất | Số bước |
|:---:|---|:---:|
| 1 | 0–1 | 1 |
| 2 | 0–1–2 | 2 |
| 3 | 0–1–3 | 2 |
| 4 | 0–6–4 | 2 |
| 5 | 0–6–5 | 2 |
| 6 | 0–6 (đường tắt) | 1 |
| 7 | 0–6–7 | 2 |
| 8 | 0–6–8 | 2 |
| 9 | 0–11–9 | 2 |
| 10 | 0–10 | 1 |
| 11 | 0–11 | 1 |

Tổng $= 1+2+2+2+2+1+2+2+2+1+1 = 18$. Trung bình từ đỉnh 0 giảm từ $21/11$ xuống $18/11$. Tính $L$ toàn mạng sau tái nối (chạy cho mọi đỉnh) cho $\\mathbf{L \\approx 1.64}$, còn $\\mathbf{C \\approx 0.469}$.

**So sánh trước/sau một lần tái nối:**

| Đại lượng | $p=0$ | Sau 1 đường tắt | Thay đổi |
|---|:---:|:---:|:---:|
| $L$ | 1.91 | 1.64 | **−14%** |
| $C$ | 0.500 | 0.469 | −6% |

Chỉ **một** đường tắt: $L$ giảm gấp hơn hai lần mức giảm của $C$ — dù mạng chỉ có 12 đỉnh. Với mạng nghìn/triệu đỉnh, một đường tắt phục vụ *hàng loạt* cặp ở hai phía nên $L$ giảm còn dữ dội hơn nhiều, trong khi $C$ chỉ nhúc nhích quanh vài đỉnh bị đụng tới. **Đó chính là cơ chế thế giới nhỏ, đọc ra từ số thật.**

> 🔁 **Dừng lại tự kiểm tra.** Trong mạng vòng $N=12, k=4$ ở trên, vì sao tái nối cạnh $0$–$2$ làm $C_0$ tụt từ 0.5 xuống 0.33?
>
> <details><summary>Đáp án</summary>
>
> Hàng xóm mới của 0 là $\\{1,6,10,11\\}$. Cặp quen nhau: $1$–$11$ (dist 2 ✓) và $10$–$11$ (dist 1 ✓) → 2 cặp. Đỉnh 6 ở xa nên không quen ai trong nhóm. $C_0 = 2/6 \\approx 0.33$. Đường tắt phá cụm cục bộ quanh đỉnh 0 nhưng lại giúp toàn mạng ngắn hơn — đúng tinh thần thế giới nhỏ.
> </details>

---

## 5. Sức mạnh của liên kết yếu (Granovetter, 1973)

Mô hình Watts-Strogatz cho *cấu trúc*. Nhà xã hội học **Mark Granovetter** cho *ý nghĩa xã hội* của những đường tắt đó, trong bài kinh điển *"The Strength of Weak Ties"*.

### 5.1 Đo độ mạnh của một liên kết

> 💡 **Trực giác.** Không phải quan hệ nào cũng như nhau. "Người bạn thân 20 năm" khác hẳn "anh quen sơ ở lớp học tiếng Anh". Granovetter đề nghị đo **độ mạnh (tie strength)** của một liên kết bằng bốn thành phần cộng lại.

Độ mạnh $\\approx$ (thời gian dành cho nhau) $+$ (cường độ cảm xúc) $+$ (mức thân mật, tâm sự) $+$ (dịch vụ qua lại, giúp đỡ nhau).

- **Liên kết mạnh (strong tie):** bạn thân, gia đình — điểm cao cả bốn tiêu chí.
- **Liên kết yếu (weak tie):** người quen sơ, đồng nghiệp cũ, bạn của bạn — điểm thấp.

### 5.2 Cầu nối (bridge) và cầu nối cục bộ (local bridge)

**(a) Là gì.** Một **cầu nối (bridge)** là cạnh mà nếu xóa đi thì hai đầu của nó bị **tách rời** (không còn đường nào khác nối chúng, hoặc khoảng cách nhảy vọt). **Cầu nối cục bộ bậc $n$ (local bridge)** là cạnh $A$–$B$ mà nếu xóa nó, đường ngắn nhất giữa $A$ và $B$ dài $n > 2$. Cầu nối cục bộ bậc $\\ge 3$ nghĩa là **$A$ và $B$ không có người quen chung nào**.

**(b) Vì sao cần.** Cầu nối là *cửa ngõ duy nhất* giữa hai vùng của mạng. Mọi thông tin đi từ cụm này sang cụm kia đều phải qua nó. Đây chính là "đường tắt" của Watts-Strogatz nhìn từ góc xã hội.

**(c) Ví dụ số cụ thể.** Hai cụm bạn tách biệt: cụm trái $\\{A, X, Y\\}$ (quen nhau đôi một) và cụm phải $\\{B, Z, W\\}$ (quen nhau đôi một). Chỉ có một cạnh $A$–$B$ nối hai cụm.
- Xóa $A$–$B$: khoảng cách từ $A$ tới $B$ trở thành $\\infty$ (mất kết nối) → $A$–$B$ là **cầu nối**.
- $A$ và $B$ không có bạn chung nào ($A$ chơi với $X, Y$; $B$ chơi với $Z, W$) → đây là **cầu nối cục bộ bậc cao**.

### 5.3 "Không có liên kết mạnh nào là cầu nối"

Đây là mệnh đề trung tâm. Chứng minh dựa trên **đóng tam giác (triadic closure)**:

> **Nguyên lý đóng tam giác.** Nếu $A$ có liên kết **mạnh** với cả $B$ và $C$, thì $B$ và $C$ **rất khả năng** cũng nối với nhau (bạn thân của bạn thân dễ trở thành bạn — họ hay gặp nhau, tin nhau).

Lập luận từng bước:

1. Giả sử phản chứng: cạnh $A$–$B$ vừa **mạnh** vừa là **cầu nối**.
2. "Cầu nối" (bậc $\\ge 3$) nghĩa là $A, B$ **không có bạn chung** — nếu có bạn chung $C$ thì đã có đường vòng $A$–$C$–$B$ dài 2, mâu thuẫn định nghĩa cầu nối.
3. Nhưng $A$ có bạn bè (giả sử $A$ mạnh với $C$ nào đó). Vì $A$–$B$ mạnh và $A$–$C$ mạnh, theo đóng tam giác $B$ và $C$ khả năng cao nối nhau → $C$ trở thành **bạn chung** của $A$ và $B$.
4. Có bạn chung $C$ ⇒ $A$–$B$ **không** còn là cầu nối. Mâu thuẫn với (1).
5. Vậy giả thiết sai: **một cầu nối không thể là liên kết mạnh** ⇒ **mọi cầu nối đều là liên kết yếu**.

Granovetter gọi bộ ba "$A$ mạnh với $B$, $A$ mạnh với $C$, nhưng $B$–$C$ hoàn toàn không quen" là **bộ ba bị cấm (forbidden triad)** — hiếm xảy ra trong thực tế.

> ⚠ **Lỗi thường gặp.** Hiểu thành "liên kết yếu quan trọng hơn liên kết mạnh *về mọi mặt*". Không phải. Liên kết mạnh cho hỗ trợ tinh thần, tin cậy, giúp đỡ lúc khó. Điều Granovetter nói là: **về mặt truyền thông tin MỚI và bắc cầu cấu trúc**, liên kết yếu mới là thứ then chốt.

### 5.4 Vì sao liên kết yếu mang thông tin mới

> 💡 **Trực giác.** Bạn thân của bạn biết gần đúng những gì bạn biết (cùng cụm, cùng đọc, cùng gặp một nhóm người) → thông tin họ đưa **trùng lặp (redundant)**. Người quen sơ ở cụm khác lại sống trong "vũ trụ thông tin" khác → họ mang tới thứ **mới**.

**Ví dụ số cụ thể — tầm với (reach) thông tin.** Giả sử:
- Bạn có **5 liên kết mạnh**, tất cả nằm trong một cụm thân 6 người quen nhau đôi một.
- Bạn có **12 liên kết yếu**, mỗi cái dẫn tới một cụm khác nhau, mỗi cụm ~10 người.

Đếm số người *mới* bạn tiếp cận được ở khoảng cách 2 bước ("bạn của liên kết của tôi"):
- Qua liên kết **mạnh**: 5 người bạn thân, nhưng bạn bè của họ hầu hết chính là 6 người trong cụm bạn đã biết → số người **mới** $\\approx 0$.
- Qua liên kết **yếu**: $12 \\times (10 - 1) \\approx \\mathbf{108}$ người ở các cụm khác mà bạn không thể chạm tới bằng đường nào khác.

Chênh lệch tầm với $0$ so với $108$ giải thích vì sao — trong nghiên cứu tìm việc kinh điển của Granovetter — **phần lớn người kiếm được việc qua người quen sơ (liên kết yếu)**, không phải bạn thân. Bạn thân đưa toàn tin bạn đã biết; người quen sơ mở cánh cửa sang thị trường việc làm bạn chưa thấy.

### 5.5 Nối lại với thế giới nhỏ

Hai góc nhìn, một sự thật:

| Watts-Strogatz (cấu trúc) | Granovetter (xã hội) |
|---|---|
| Đường tắt (shortcut) cắt ngang vòng | Cầu nối (bridge) giữa hai cụm |
| Kéo $L$ xuống mạnh với ít cạnh | Mang thông tin mới, việc làm, cơ hội |
| Cạnh được tái nối tới đỉnh xa | Liên kết **yếu** (người quen sơ ở cụm khác) |

**Đường tắt của Watts-Strogatz chính là liên kết yếu bắc cầu của Granovetter.** Thế giới "nhỏ" được nhờ chính những mối quan hệ ta ít để tâm nhất.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy cứ kết bạn xã giao thật nhiều là tốt?"* → Về mặt tiếp cận thông tin và cơ hội thì có — liên kết yếu đa dạng mở rộng tầm với. Nhưng liên kết mạnh vẫn thiết yếu cho hỗ trợ sâu.
> - *"Liên kết yếu nào cũng là cầu nối?"* → Không. Chỉ những liên kết yếu *bắc cầu sang cụm khác* mới quý. Liên kết yếu với người trong chính cụm mình thì không mang gì mới.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao "bộ ba bị cấm" ($A$ mạnh với $B$ và $C$ nhưng $B$–$C$ không quen) lại hiếm?
>
> <details><summary>Đáp án</summary>
>
> Vì $A$ dành nhiều thời gian với cả $B$ lẫn $C$ (liên kết mạnh) → $B$ và $C$ hay gặp nhau qua $A$, dễ nảy sinh quen biết (đóng tam giác). Trạng thái "$B$, $C$ tuyệt đối không quen" khó duy trì lâu → bộ ba đó có xu hướng tự đóng lại thành tam giác.
> </details>

> 📝 **Tóm tắt mục 5.**
> - Độ mạnh liên kết = thời gian + cảm xúc + thân mật + qua lại. Mạnh = bạn thân; yếu = quen sơ.
> - Do đóng tam giác, **mọi cầu nối đều là liên kết yếu** ("không liên kết mạnh nào là cầu nối").
> - Liên kết yếu mang **thông tin mới** (không trùng lặp) → quan trọng cho việc làm, cơ hội.
> - Cầu nối yếu (Granovetter) = đường tắt (Watts-Strogatz): cùng là thứ giữ thế giới "nhỏ".

---

## 6. Bài tập

**Bài 1 (công thức hai cực).** Mạng vòng $N=2000$, $k=8$. Tính $L(0)$, $C(0)$, ước lượng $L(1)$ và $C(1)$. Nhận xét về "sáu bước tách biệt".

**Bài 2 (tính tay $L$, $C$).** Mạng vòng đều $N=10$, $k=4$ (mỗi đỉnh nối $\\pm1, \\pm2$). Tính $C(0)$ và $L(0)$ bằng tay.

**Bài 3 (cầu nối & liên kết yếu).** Cho mạng: cụm trái $\\{A, B, C\\}$ quen nhau đôi một; cụm phải $\\{D, E, F\\}$ quen nhau đôi một; và đúng một cạnh $C$–$D$ nối hai cụm.
1. Cạnh $C$–$D$ có phải cầu nối không? Bậc bao nhiêu?
2. Theo lý thuyết Granovetter, $C$–$D$ nên là liên kết mạnh hay yếu? Vì sao?
3. Nếu $C$ nghe tin tuyển dụng từ cụm phải, tin đó bắt buộc đi qua cạnh nào?

**Bài 4 (tầm với thông tin).** Bạn có 6 liên kết mạnh trong một cụm thân 7 người (quen nhau đôi một) và 15 liên kết yếu, mỗi cái dẫn tới một cụm khác gồm ~8 người. Ước lượng số người *mới* tiếp cận được ở 2 bước qua liên kết mạnh so với qua liên kết yếu. Kết luận gì?

---

## 7. Lời giải chi tiết

**Bài 1.** Dùng công thức mục 3.2.
- $L(0) \\approx \\dfrac{N}{2k} = \\dfrac{2000}{2\\cdot 8} = \\dfrac{2000}{16} = \\mathbf{125}$.
- $C(0) = \\dfrac{3(k-2)}{4(k-1)} = \\dfrac{3\\cdot 6}{4\\cdot 7} = \\dfrac{18}{28} \\approx \\mathbf{0.643}$.
- $L(1) \\approx \\dfrac{\\ln N}{\\ln k} = \\dfrac{\\ln 2000}{\\ln 8} = \\dfrac{7.601}{2.079} \\approx \\mathbf{3.66}$.
- $C(1) \\approx \\dfrac{k}{N} = \\dfrac{8}{2000} = \\mathbf{0.004}$.

Nhận xét: mạng vòng cần trung bình 125 bước để đi giữa hai người ngẫu nhiên, nhưng chỉ cần một chút tái nối ($p$ nhỏ) là $L$ tụt về gần 3.66 — đúng tinh thần "sáu bước tách biệt". Cụm ($C$) chỉ giảm đáng kể khi $p$ đã khá lớn.

**Bài 2.** Mạng vòng $N=10$, $k=4$.
- **$C(0)$:** dùng công thức $3(k-2)/(4(k-1)) = 3\\cdot2/(4\\cdot3) = 6/12 = \\mathbf{0.5}$. (Kiểm tra: đỉnh 0 có hàng xóm $\\{1,2,8,9\\}$; cặp quen nhau: $1$–$2$ ✓, $1$–$9$ (dist 2) ✓, $8$–$9$ ✓ → $3/6=0.5$.)
- **$L(0)$:** từ đỉnh 0, bước $=\\lceil d/2\\rceil$. $N=10$: $d=1..4$ mỗi khoảng 2 đỉnh, $d=5$ (đối diện) 1 đỉnh.

  | $d$ | $\\lceil d/2\\rceil$ | số đỉnh | đóng góp |
  |:---:|:---:|:---:|:---:|
  | 1 | 1 | 2 | 2 |
  | 2 | 1 | 2 | 2 |
  | 3 | 2 | 2 | 4 |
  | 4 | 2 | 2 | 4 |
  | 5 | 3 | 1 | 3 |

  Tổng $= 2+2+4+4+3 = 15$; $L(0) = 15/9 \\approx \\mathbf{1.67}$.

**Bài 3.**
1. **Có, $C$–$D$ là cầu nối.** Xóa nó thì cụm trái và cụm phải tách rời hoàn toàn (khoảng cách $\\to \\infty$). Vì $C$ và $D$ không có bạn chung nào ($C$ chơi với $A, B$; $D$ chơi với $E, F$), đây là **cầu nối cục bộ bậc $\\infty$** (thực tế: bậc cao, $\\ge 3$).
2. **Phải là liên kết yếu.** Theo mục 5.3: nếu $C$–$D$ mạnh, thì do đóng tam giác các bạn thân của $C$ (là $A, B$) sẽ dần quen $D$, tạo bạn chung → $C$–$D$ hết là cầu nối. Một cạnh vừa là cầu nối vừa mạnh là "bộ ba bị cấm", nên nó buộc phải yếu.
3. Tin **bắt buộc đi qua cạnh $C$–$D$** — đó là con đường duy nhất giữa hai cụm. Đây minh họa vì sao thông tin mới (tuyển dụng ở cụm khác) tới tai bạn qua **liên kết yếu bắc cầu**, không phải qua bạn thân trong cụm.

**Bài 4.** Đếm người *mới* ở 2 bước.
- **Qua liên kết mạnh:** 6 bạn thân đều nằm trong cụm 7 người quen nhau đôi một. Bạn của họ chính là 6 người đó (cộng chính bạn) → số người **mới** ở 2 bước $\\approx \\mathbf{0}$ (toàn trùng lặp).
- **Qua liên kết yếu:** 15 liên kết yếu, mỗi cái dẫn tới một cụm ~8 người khác nhau. Số người mới ở 2 bước $\\approx 15 \\times (8-1) = \\mathbf{105}$.
- **Kết luận:** tầm với thông tin của 15 liên kết yếu ($\\approx 105$ người mới) áp đảo 6 liên kết mạnh ($\\approx 0$ người mới). Liên kết mạnh cho chiều sâu quan hệ; liên kết yếu cho chiều rộng thông tin. Đây là "sức mạnh của liên kết yếu" bằng số.

> 📝 **Tóm tắt bài học.**
> - $L$ = đường đi trung bình; $C$ = hệ số cụm. Hai trục độc lập.
> - **Thế giới nhỏ** = $L$ thấp **đồng thời** $C$ cao — mạng xã hội thật đúng như vậy.
> - Watts-Strogatz: mạng vòng đều + tái nối xác suất $p$. $p$ nhỏ đã đủ kéo $L$ xuống mạnh (đường tắt phục vụ nhiều cặp) mà $C$ còn cao (phá cụm chỉ cục bộ).
> - Granovetter: mọi **cầu nối** đều là **liên kết yếu** (do đóng tam giác), và liên kết yếu mang **thông tin mới**.
> - Đường tắt (WS) = cầu nối yếu (Granovetter): cùng một sự thật nhìn từ hai phía.

---

## Bài tiếp theo

**[Lesson 08 — Lan truyền & lây lan trên mạng lưới](../lesson-08-diffusion-contagion/)**: khi đã biết mạng "nhỏ" và cầu nối nằm ở đâu, câu hỏi tiếp theo là *thông tin, hành vi, dịch bệnh lan trên mạng đó thế nào* — ngưỡng lan truyền, hiệu ứng dây chuyền, và vì sao cấu trúc thế giới nhỏ khiến mọi thứ lan nhanh đến vậy.

Minh họa tương tác: [visualization.html](./visualization.html) — kéo thanh xác suất tái nối $p$, xem mạng vòng biến thành thế giới nhỏ và đồ thị $L(p)$, $C(p)$ tách nhau ra.
`;
