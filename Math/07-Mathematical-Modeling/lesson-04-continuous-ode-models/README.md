# Lesson 04 — Mô hình liên tục (ODE)

## Mục tiêu

- Chuyển từ mô hình **rời rạc** ([L03](../lesson-03-discrete-dynamical/)) sang **liên tục**: mô tả bằng tốc độ thay đổi $dx/dt$.
- **Tăng trưởng mũ** $\frac{dN}{dt} = rN$ và hạn chế của nó.
- **Tăng trưởng logistic** $\frac{dN}{dt} = rN(1-N/K)$: đường cong chữ S, sức chứa $K$ — và vì sao nó *luôn mượt* (khác bản rời rạc hỗn loạn ở L03).
- **Định luật nguội Newton** (giải đầy đủ ODE) và **bài toán bể trộn (mixing)**.
- **Phương pháp Euler**: mô phỏng ODE trên máy chính là biến nó thành phương trình sai phân — nối liền L03 và L04.

## Kiến thức tiền đề

- [Lesson 01](../lesson-01-modeling-cycle/) (chu trình), [Lesson 03](../lesson-03-discrete-dynamical/) (mô hình rời rạc).
- [T6 L07 — Phương trình vi phân (ODE)](../../06-Advanced/lesson-07-differential-equations/) (tách biến, tuyến tính bậc 1).

---

## 1. Từ rời rạc sang liên tục

💡 **Trực giác / Hình dung.** Ở [L03](../lesson-03-discrete-dynamical/), thời gian nhảy theo bước ($n$, $n+1$). Nếu bước nhỏ dần — mỗi giây, mỗi mili-giây — ta tiến tới mô tả **liên tục**: thay "$x_{n+1} - x_n$" (thay đổi mỗi bước) bằng **đạo hàm $dx/dt$** (tốc độ thay đổi tức thời). ODE là ngôn ngữ tự nhiên khi đại lượng biến thiên trơn theo thời gian.

💡 **Trực giác — ODE = "luật tốc độ thay đổi" (a law of how fast things change).** Hầu hết quy luật tự nhiên không nói trực tiếp *"giá trị bằng bao nhiêu"* mà nói *"đang thay đổi nhanh chậm thế nào, tùy theo trạng thái hiện tại"*. Một ODE là một **luật tốc độ**: vế trái $dx/dt$ là "tốc độ", vế phải $g(x)$ nói tốc độ ấy phụ thuộc thế nào vào trạng thái $x$ lúc đó. Hình dung tài khoản tiết kiệm lãi 5%/năm: luật không nói "năm sau có bao nhiêu", mà nói *"tốc độ tăng tiền = 5% số tiền hiện có"* → $\frac{dM}{dt} = 0.05\,M$. Giải ODE = từ luật-tốc-độ suy ngược ra **lịch sử giá trị theo thời gian** $M(t)$. Bốn ví dụ cùng một khuôn "luật tốc độ":

| Hiện tượng | Luật tốc độ (lời) | ODE |
|---|---|---|
| Vi khuẩn sinh sôi | tốc độ sinh ∝ số đang có | $\frac{dN}{dt} = rN$ |
| Cà phê nguội | tốc độ nguội ∝ chênh lệch với phòng | $\frac{dT}{dt} = -k(T-T_p)$ |
| Phóng xạ phân rã | tốc độ rã ∝ số hạt còn lại | $\frac{dN}{dt} = -\lambda N$ |
| Quần thể có giới hạn | tốc độ tăng ∝ số đang có × "chỗ trống" | $\frac{dN}{dt} = rN(1-N/K)$ |

So sánh nhanh: rời rạc hỏi *"kỳ sau bằng bao nhiêu?"* ($x_{n+1} = f(x_n)$); liên tục hỏi *"đang thay đổi nhanh cỡ nào?"* ($dx/dt = g(x)$). Phần lý thuyết giải ODE đã có ở [T6 L07](../../06-Advanced/lesson-07-differential-equations/); lesson này tập trung **dùng** ODE để mô hình hóa.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao 'tốc độ ∝ lượng hiện có' lại ra hàm mũ, mà không phải đường thẳng?"* Vì đường thẳng có tốc độ *hằng* (không phụ thuộc $x$). Khi tốc độ *tỉ lệ* với $x$ thì càng lớn càng tăng nhanh — đặc trưng riêng của $e^{rt}$ (đạo hàm của mũ lại ra chính nó nhân hằng số). Đó là vì sao luật $dx/dt = rx$ và hàm $e^{rt}$ luôn đi cùng nhau.
- *"Một luật-tốc-độ có đủ để biết giá trị tương lai chưa?"* Chưa. Luật chỉ cho biết *thay đổi thế nào*; còn cần **điều kiện đầu** (giá trị tại $t=0$) để biết bắt đầu từ đâu. Hai con vi khuẩn cùng luật $\frac{dN}{dt}=rN$ nhưng $N_0$ khác nhau cho hai đường khác nhau — xem ⚠ ở mục 2.

📝 **Tóm tắt mục 1**: ODE = **luật tốc độ thay đổi** $dx/dt = g(x)$; dùng khi đại lượng biến thiên liên tục. Vế phải nói tốc độ phụ thuộc trạng thái hiện tại ra sao. Rời rạc và liên tục là hai góc nhìn cùng một hiện tượng, gặp nhau khi bước → 0 (mục 6). Luật + điều kiện đầu = nghiệm cụ thể.

---

## 2. Tăng trưởng mũ

💡 **Trực giác.** "Càng nhiều càng sinh nhanh": tốc độ tăng tỉ lệ với lượng hiện có. Tiền lãi, vi khuẩn chia đôi, phản ứng dây chuyền.

**Mô hình**: $\frac{dN}{dt} = r\cdot N$ ($r =$ tốc độ tăng trưởng, $[r] =$ thời gian⁻¹).
**Nghiệm** (tách biến — [T6 L07](../../06-Advanced/lesson-07-differential-equations/)): **$N(t) = N_0\cdot e^{rt}$**.

> 📐 **Định nghĩa đầy đủ — Tham số tốc độ $r$ (intrinsic rate)**
>
> **(a) Là gì**: $r$ là **tốc độ thay đổi tương đối tức thời** — phần trăm tăng/giảm trên một đơn vị thời gian. Từ $\frac{dN}{dt} = rN$ rút ra $r = \frac{1}{N}\frac{dN}{dt}$ = "tốc độ thay đổi chia cho lượng hiện có". Đơn vị: thời gian⁻¹ (vd /giờ, /năm).
>
> **(b) Vì sao cần**: phân biệt rõ "tăng nhanh" tuyệt đối với tương đối. Một quần thể 1 triệu tăng 1000/ngày và một quần thể 100 tăng 1000/ngày rất khác nhau về *sức sống*; $r$ chuẩn hóa điều đó. $r > 0$: bùng nổ; $r < 0$: tàn lụi (phân rã, mục 2.1); $r = 0$: đứng yên.
>
> **(c) Ví dụ số (4 giá trị $r$)**: $r = 0.5$/giờ → nhân đôi sau $\ln 2/0.5 = 1.39$h. $r = 0.05$/năm (dân số) → nhân đôi sau $\approx 13.9$ năm. $r = -0.1$/ngày (thuốc đào thải) → giảm còn nửa sau $6.93$ ngày. $r = 2$/giờ (vi khuẩn lý tưởng) → nhân đôi sau chỉ $0.35$h.

**Walk-through (diễn giải tham số)**: $N_0 = 100$, $r = 0.5$/giờ.
- $N(t) = 100\cdot e^{0.5t}$. $t = 2$: $100\cdot e^1 \approx 272$. $t = 4$: $100\cdot e^2 \approx 739$. $t = 10$: $100\cdot e^5 \approx 14\,841$.
- Thời gian nhân đôi: $e^{r\cdot t_2} = 2$ → $t_2 = \ln 2/r = 0.693/0.5 \approx$ **1.39 giờ**.
- **Diễn giải tham số**: $N_0$ dịch toàn bộ đường lên/xuống (điểm xuất phát); $r$ điều khiển *độ cong* — gấp đôi $r$ thì cùng một bội số đạt được trong nửa thời gian. Đổi $N_0 = 200$ chỉ nhân đôi mọi giá trị, KHÔNG đổi thời gian nhân đôi (vẫn 1.39h) — nhân đôi là tính chất của $r$ thôi.

ASCII — cùng $r$, đổi $N_0$ chỉ dịch đường; đổi $r$ đổi độ cong:

```
  N                          r=0.5, N₀=200 ┄┄►/
    |                       r=0.5, N₀=100 ──►/
    |                                       /  ./
    |                            r=0.25 ┈┈►./.·
    |                                   ._.·
    +-------------------------------------------- t
       N₀ nâng đường lên · r lớn → cong vểnh sớm
```

### 2.1 Phân rã phóng xạ — chu kỳ bán rã

💡 **Trực giác.** Cùng luật-tốc-độ như tăng trưởng mũ nhưng $r$ **âm**: mỗi hạt nhân có xác suất phân rã không đổi mỗi giây, nên *tốc độ rã ∝ số hạt còn lại*. Càng ít hạt, rã càng chậm — đường cong tụt nhanh lúc đầu rồi thoai thoải, không bao giờ chạm 0.

**Mô hình**: $\frac{dN}{dt} = -\lambda N$ ($\lambda > 0$ = hằng số phân rã). **Nghiệm**: $N(t) = N_0\,e^{-\lambda t}$.

> 📐 **Định nghĩa đầy đủ — Chu kỳ bán rã $T_{1/2}$ (half-life)**
>
> **(a) Là gì**: thời gian để lượng chất giảm còn **một nửa**. Từ $N(T_{1/2}) = N_0/2$: $e^{-\lambda T_{1/2}} = \tfrac12$ → $\boxed{T_{1/2} = \dfrac{\ln 2}{\lambda}}$. Đặc trưng: KHÔNG phụ thuộc $N_0$ — sau mỗi $T_{1/2}$ lại còn nửa, bất kể bắt đầu bao nhiêu.
>
> **(b) Vì sao cần**: $\lambda$ là số trừu tượng (/giây); $T_{1/2}$ là đại lượng *cảm nhận được* dùng trong định tuổi (carbon-14), y học hạt nhân, an toàn phóng xạ. Hai cách nói cùng một thông tin: $\lambda = \ln 2/T_{1/2}$.
>
> **(c) Ví dụ số (4 đồng vị)**: C-14 $T_{1/2} = 5730$ năm → $\lambda = \ln 2/5730 \approx 1.21\times10^{-4}$/năm. I-131 (y học) $T_{1/2} = 8$ ngày → $\lambda \approx 0.0866$/ngày. U-238 $T_{1/2} \approx 4.5\times10^9$ năm (cực chậm). Caffeine trong máu $T_{1/2}\approx 5$h → sau 5h còn nửa, 10h còn $1/4$.

**Walk-through (định tuổi C-14)**: mẫu gỗ còn $25\%$ lượng C-14 ban đầu. Bao nhiêu tuổi?
- $N/N_0 = 0.25 = e^{-\lambda t}$. Lấy $\ln$: $-\lambda t = \ln 0.25 = -1.386$.
- $t = 1.386/\lambda = 1.386/(1.21\times10^{-4}) \approx$ **11 460 năm** — đúng bằng $2\times T_{1/2}$ (vì $25\% = (\tfrac12)^2$, qua đúng 2 chu kỳ bán rã) ✓.
- Kiểm bằng bán rã: 1 chu kỳ → $50\%$ (5730 năm); 2 chu kỳ → $25\%$ (11 460 năm) ✓.

⚠ **Lỗi thường gặp — nhầm dấu $\lambda$ (k dương/âm).** Phân rã là $\frac{dN}{dt} = -\lambda N$ với dấu **trừ** → $e^{-\lambda t}$ giảm. Nếu vô ý viết $+\lambda N$ thì ra $e^{+\lambda t}$ *tăng vô hạn* — mô tả ngược hẳn (sinh sôi thay vì rã). Quy tắc: tăng trưởng $r > 0$ → $e^{+}$; phân rã/nguội $\to$ số mũ phải **âm** để tiến về giới hạn.

⚠ **Lỗi thường gặp — dùng mũ cho dài hạn.** Mô hình mũ tăng *không có giới hạn*: $N \to \infty$. Thực tế mọi tài nguyên đều hữu hạn (đã cảnh báo ở [L01 mục 2](../lesson-01-modeling-cycle/)). Mũ chỉ đúng *giai đoạn đầu* khi $N$ còn nhỏ so với sức chứa. → cần logistic (mục 3).

⚠ **Lỗi thường gặp — quên điều kiện đầu $N_0$.** Nghiệm tổng quát $N = A\,e^{rt}$ còn hằng số $A$; phải dùng $N(0) = N_0$ để chốt $A = N_0$. Viết ngay "$N = e^{rt}$" (ngầm $A=1$) là sai trừ khi tình cờ $N_0 = 1$. Mọi bài ODE đều cần điều kiện đầu để ra nghiệm cụ thể.

🔁 **Dừng lại tự kiểm tra**

1. Một liều caffeine 200 mg, $T_{1/2} = 5$h. Còn bao nhiêu sau 15h?
2. Đồng vị có $\lambda = 0.1$/ngày. Chu kỳ bán rã?

<details><summary>Đáp án</summary>

1. 15h = 3 chu kỳ bán rã → còn $200\cdot(\tfrac12)^3 = 200/8 =$ **25 mg**. (Kiểm: $200\,e^{-(\ln2/5)\cdot15} = 200\,e^{-2.079} = 200\cdot0.125 = 25$ ✓.)
2. $T_{1/2} = \ln 2/\lambda = 0.693/0.1 \approx$ **6.93 ngày**.

</details>

📝 **Tóm tắt mục 2**: $\frac{dN}{dt} = rN \to N_0\cdot e^{rt}$; thời gian nhân đôi $\ln 2/r$. $r$ = tốc độ tương đối; $r < 0$ thành phân rã $N_0 e^{-\lambda t}$, chu kỳ bán rã $T_{1/2} = \ln 2/\lambda$ (độc lập $N_0$). Chỉ hợp giai đoạn đầu; ngoại suy dài hạn vô lý. Luôn chốt $N_0$ qua điều kiện đầu, đừng nhầm dấu mũ.

---

## 3. Tăng trưởng logistic

💡 **Trực giác — phanh khi đông đúc.** Logistic thêm vào mũ một "phanh" $(1 - N/K)$: khi $N$ nhỏ, phanh $\approx 1$ (tăng gần như mũ); khi $N$ tiến tới **sức chứa $K$**, phanh $\to 0$ (ngừng tăng). Kết quả: đường cong chữ S.

> 📐 **Định nghĩa đầy đủ — Sức chứa $K$ (carrying capacity)**
>
> **(a) Là gì**: $K$ là mức quần thể tối đa mà môi trường nuôi được lâu dài — điểm cân bằng ổn định của mô hình. Đơn vị giống $N$ (số cá thể, mật độ...).
>
> **(b) Vì sao cần**: Mô hình mũ thiếu mọi giới hạn nên ngoại suy thành vô hạn. $K$ đưa *giới hạn tài nguyên* vào mô hình một cách định lượng, biến dự báo "bùng nổ vô hạn" thành "bão hòa thực tế".
>
> **(c) Ví dụ số**: $K = 1000$ cá trong hồ. $N_0 = 100$, $r = 0.5$. Lúc $N = 100$: phanh $= 1 - 100/1000 = 0.9$ (tăng gần mũ). Lúc $N = 900$: phanh $= 0.1$ (tăng chậm hẳn). Lúc $N = 1000 = K$: phanh $= 0$ (dừng). Lúc $N = 1100 > K$ (quá tải): phanh $= -0.1$ → $\frac{dN}{dt} < 0$ → *giảm* về $K$.

**Mô hình**: $\frac{dN}{dt} = r\cdot N\cdot(1 - N/K)$.
**Nghiệm**: **$N(t) = \frac{K}{1 + A\cdot e^{-rt}}$**, với $A = (K - N_0)/N_0$.

**Điểm cân bằng**: $N = 0$ (không ổn định) và $N = K$ (ổn định). Điểm uốn tại $N = K/2$ (tăng nhanh nhất).

**Walk-through (đường cong chữ S, diễn giải tham số)**: $K = 1000$, $r = 0.5$, $N_0 = 100$ → $A = (1000-100)/100 = 9$.
- $N(t) = 1000/(1 + 9e^{-0.5t})$. Kiểm $t=0$: $1000/(1+9) = 100$ ✓.
- Bảng giá trị từng bước (để thấy hình chữ S):

| $t$ | $9e^{-0.5t}$ | $N(t)$ | Giai đoạn |
|---|---|---|---|
| 0 | 9.00 | 100 | xuất phát (gần mũ) |
| 2 | 3.31 | 232 | tăng tốc |
| 4.39 | 1.00 | **500** | điểm uốn $K/2$ — dốc nhất |
| 7 | 0.27 | 787 | chậm lại |
| 12 | 0.022 | 978 | gần bão hòa |
| ∞ | 0 | **1000** = K | trần |

- Khi $N = K/2 = 500$: $1 + 9e^{-0.5t} = 2$ → $e^{-0.5t} = 1/9$ → $t = \ln 9/0.5 \approx$ **4.39** (điểm uốn, đông đúc nhất về tốc độ).
- $t \to \infty$: $e^{-0.5t} \to 0$ → $N \to$ **$1000 = K$** ✓.
- **Diễn giải tham số**: $K$ = độ cao trần (đường ngang tiệm cận); $r$ = độ dốc — $r$ lớn thì chữ S "dựng" hơn (lên trần nhanh); $N_0$ (qua $A$) = vị trí xuất phát, càng nhỏ thì pha tăng tốc càng dài.

ASCII — đường cong chữ S (logistic) tiệm cận trần $K$:

```
   N
  K ┤- - - - - - - - - - - ___────────  ← tiệm cận trần K
    │                  __──
    │              _──    ← phần lõm: chậm lại (đông đúc)
K/2 ┤··········_─·  ← điểm uốn t≈4.39, dốc nhất
    │       _─    ← phần lồi: tăng tốc (gần mũ)
 N₀ ┤___──
    └──────┬──────────────────────────── t
          t≈4.39
   chữ "S": lồi dưới → uốn ở K/2 → lõm trên → phẳng ở K
```

ASCII — trường hướng (slope field) của logistic, gạch = dấu/độ lớn của $dN/dt$:

```
  N
  K  →  →  →  →  →     dN/dt = 0 (cân bằng ổn định, gạch ngang)
     ↗  ↗  ↗  ↗        gần K: tăng chậm (gạch thoải)
 K/2 ⬈  ⬈  ⬈  ⬈        K/2: dốc nhất (gạch dựng)
     ↗  ↗  ↗  ↗        nhỏ: tăng nhanh dần
  0  →  →  →  →  →     dN/dt = 0 (cân bằng KHÔNG ổn định)
     └──────────────── t
   mọi nghiệm xuất phát trong (0,K) đều "trôi" lên K
```

❓ **Câu hỏi tự nhiên của người đọc**

- *"Logistic liên tục có hỗn loạn như bản rời rạc ở L03 không?"* **Không!** ODE logistic bậc 1 *luôn* hội tụ mượt về $K$, không bao giờ dao động hay hỗn loạn. Lý do: thời gian liên tục không cho "vọt lố" qua cân bằng như bước nhảy rời rạc. Đây là khác biệt sâu sắc giữa hai mô hình — cùng tên "logistic" nhưng hành vi khác hẳn.
- *"Nếu $N_0 > K$ thì sao?"* Phanh âm → $\frac{dN}{dt} < 0$ → $N$ *giảm* về $K$. $K$ là điểm hút từ cả hai phía.

### 3.1 Nghiệm cân bằng & ổn định

💡 **Trực giác.** **Nghiệm cân bằng (equilibrium)** là trạng thái đứng yên: $\frac{dN}{dt} = 0$, nên $N$ không đổi mãi mãi. Giải $g(N) = rN(1-N/K) = 0$ → hai cân bằng: $N = 0$ và $N = K$. **Ổn định (stable)** = nếu đẩy lệch một chút, hệ tự kéo về (như viên bi đáy bát); **không ổn định (unstable)** = đẩy nhẹ là chạy đi (bi trên đỉnh đồi).

**Cách kiểm dấu $g(N)$ quanh mỗi cân bằng (4 vùng cụ thể)** với $r = 0.5$, $K = 1000$:

| $N$ | $g(N) = 0.5N(1-N/1000)$ | Chiều | Diễn giải |
|---|---|---|---|
| 10 (gần 0⁺) | $0.5\cdot10\cdot0.99 = +4.95$ | tăng → rời 0 | đẩy khỏi $N=0$ |
| 500 | $0.5\cdot500\cdot0.5 = +125$ | tăng → tiến K | trôi lên K |
| 1100 ($>K$) | $0.5\cdot1100\cdot(-0.1) = -55$ | giảm → về K | kéo về K |
| 990 (gần K⁻) | $0.5\cdot990\cdot0.01 = +4.95$ | tăng → tiến K | hút vào K |

→ Quanh $N=0$: dấu $g$ luôn đẩy ra xa → **$N=0$ KHÔNG ổn định**. Quanh $N=K$: cả hai phía đều kéo về → **$N=K$ ổn định**.

⚠ **Lỗi thường gặp — tưởng logistic "vượt $K$ rồi vọt lố".** Nghiệm *liên tục* xuất phát dưới $K$ **không bao giờ vượt** $K$: khi $N\to K$ thì $\frac{dN}{dt}\to 0$, tốc độ tắt dần đúng lúc chạm trần → tiệm cận từ dưới, không "đâm qua". Chỉ bản **rời rạc** (L03) hoặc Euler bước lớn (mục 5) mới vọt lố qua $K$ rồi nảy — đó là *artefact rời rạc hóa*, không phải hành vi của ODE. Đừng vẽ đường logistic liên tục nhô lên trên $K$ rồi tụt xuống.

🔁 **Dừng lại tự kiểm tra**

1. Logistic $K = 500$, $N_0 = 500$. $N(t)$ bằng gì với mọi $t$?
2. Vì sao $N = 0$ là cân bằng *không ổn định* của logistic?

<details><summary>Đáp án</summary>

1. $N_0 = K = 500$ là điểm cân bằng → $\frac{dN}{dt} = 0$ → **$N(t) = 500$ mãi mãi**. ($A = 0$, công thức cho $N = K/(1+0) = K$.)
2. Với $N$ nhỏ dương, $g(N) = rN(1-N/K) > 0$ → $N$ *tăng*, chạy ra xa khỏi 0. Một con vi khuẩn lẻ cũng đủ sinh sôi → 0 không "giữ" được hệ → **không ổn định**.

</details>

### 📝 Tóm tắt mục 3

- Logistic $\frac{dN}{dt} = rN(1-N/K)$: mũ + phanh $(1-N/K)$. Nghiệm $N = K/(1+Ae^{-rt})$, đường chữ S.
- Cân bằng $N = K$ ổn định; điểm uốn $N = K/2$. Khác bản rời rạc: liên tục *luôn mượt*, không hỗn loạn.

---

## 4. Định luật nguội Newton & bể trộn

### 4.1 Nguội Newton (giải đầy đủ)

💡 **Trực giác — luật tốc độ "nguội nhanh khi chênh nhiều".** Cốc cà phê nóng để trong phòng: tốc độ mất nhiệt tỉ lệ với **chênh lệch** $(T - T_p)$ giữa vật và môi trường. Chênh nhiều → nguội nhanh; gần bằng phòng → nguội chậm dần, không bao giờ "lạnh hơn phòng".

Đã gặp ở [L01](../lesson-01-modeling-cycle/) (ví dụ end-to-end) và [L02](../lesson-02-empirical-curve-fitting/) (fit $k$). Mô hình: $\frac{dT}{dt} = -k(T - T_p)$. Giải bằng đổi biến $u = T - T_p$ → $\frac{du}{dt} = -ku$ (mũ phân rã!) → $u = u_0 e^{-kt}$ → **$T(t) = T_p + (T_0 - T_p)\cdot e^{-kt}$**. Cân bằng $T = T_p$ ổn định.

> 📐 **Định nghĩa đầy đủ — Hệ số làm nguội $k$ (cooling constant)**
>
> **(a) Là gì**: $k$ (đơn vị thời gian⁻¹) đo *tốc độ trao đổi nhiệt* — vật cách nhiệt kém / diện tích lớn → $k$ lớn → nguội nhanh.
>
> **(b) Vì sao cần**: hai cốc cùng $T_0$, cùng phòng, nhưng cốc giấy nguội nhanh hơn cốc sứ dày — khác nhau ở $k$. $k$ gói toàn bộ "vật lý truyền nhiệt" vào một số đo được bằng thực nghiệm ([L02](../lesson-02-empirical-curve-fitting/)).
>
> **(c) Ví dụ số (4 giá trị $k$)**: $k = 0.1$/phút → sau 10 phút chênh lệch còn $e^{-1}=37\%$. $k=0.5$/phút → 37% chỉ sau 2 phút (nguội rất nhanh). $k=0.02$/phút → bình giữ nhiệt tốt, 37% sau 50 phút. $k\to 0$ → cách nhiệt hoàn hảo, không nguội.

**Walk-through (diễn giải tham số)**: cà phê $T_0 = 90°$C, phòng $T_p = 25°$C, $k = 0.1$/phút.
- $T(t) = 25 + 65\,e^{-0.1t}$.
- $t=0$: $25 + 65 = 90$ ✓. $t=10$: $25 + 65e^{-1} = 25 + 23.9 = 48.9°$C. $t=20$: $25 + 65e^{-2} = 25 + 8.8 = 33.8°$C. $t\to\infty$: $T\to 25°$C ✓.
- **Diễn giải tham số**: $T_p$ = đường tiệm cận (sàn nhiệt); $(T_0 - T_p)$ = chênh lệch ban đầu (biên độ); $k$ = tốc độ tiệm cận. Đổi phòng nóng hơn ($T_p=35$) thì cà phê chỉ nguội tới 35°C; đổi $k$ chỉ đổi *nhanh hay chậm*, không đổi đích.

ASCII — nguội Newton: chênh lệch tắt theo mũ, tiệm cận $T_p$:

```
   T
  90 ●_
     | `─_
     |    `──__         chênh (T−Tp) giảm mũ
  49 |        `───___
     |               `─────____
  25 ┤- - - - - - - - - - - - -─────── ← sàn Tp (phòng)
     └──────────────────────────────── t
     dốc nhất lúc đầu (chênh lớn), thoải dần khi gần Tp
```

### 4.2 Bài toán bể trộn (mixing)

💡 **Trực giác.** Bồn chứa dung dịch; chất hòa tan chảy *vào* và *ra* liên tục. Lượng chất trong bồn thay đổi = (vào) − (ra). Vì "ra" tỉ lệ nồng độ hiện tại → ODE tuyến tính bậc 1.

**Bài toán**: Bồn 100 L nước, ban đầu 20 kg muối. Nước muối 0.5 kg/L chảy vào 5 L/phút; dung dịch trộn đều chảy ra 5 L/phút (thể tích giữ 100 L).

**Lập mô hình**: gọi $S(t) =$ kg muối.
- Vào: 0.5 kg/L × 5 L/phút = 2.5 kg/phút.
- Ra: nồng độ $S/100$ kg/L × 5 L/phút $= 0.05\cdot S$ kg/phút.
- **$\frac{dS}{dt} = 2.5 - 0.05\cdot S$** (tuyến tính bậc 1).

**Giải**: cân bằng $S^* = 2.5/0.05 = 50$. **$S(t) = 50 + (20 - 50)\cdot e^{-0.05t} = 50 - 30\cdot e^{-0.05t}$**.
- Kiểm $t=0$: $50 - 30 = 20$ ✓. $t \to \infty$: $S \to 50$ kg (= 0.5 kg/L × 100 L, nồng độ vào) ✓ — hợp lý.

⚠ **Lỗi thường gặp — quên rằng nồng độ ra dùng S hiện tại, không phải S vào.** Tốc độ ra $= (S/V)\cdot$(lưu lượng ra), với $S/V$ là nồng độ *trong bồn* (thay đổi theo $t$), không phải nồng độ dòng vào. Lẫn hai cái → sai ODE.

🔁 **Dừng lại tự kiểm tra**

1. Bồn trên, sau bao lâu muối đạt 40 kg?

<details><summary>Đáp án</summary>

$40 = 50 - 30e^{-0.05t}$ → $30e^{-0.05t} = 10$ → $e^{-0.05t} = 1/3$ → $t = \ln 3/0.05 = 1.0986/0.05 \approx$ **22 phút**.

</details>

### 📝 Tóm tắt mục 4

- Nguội Newton: $T(t) = T_p + (T_0-T_p)e^{-kt}$. Bể trộn: $\frac{dS}{dt} =$ (vào) − (nồng độ trong bồn)·(ra).
- Cả hai là ODE tuyến tính bậc 1 → có cân bằng ổn định; nồng độ ra dùng $S$ hiện tại.

---

## 5. Phương pháp Euler — cầu nối rời rạc ↔ liên tục

💡 **Trực giác.** Máy tính không "giải tích phân"; nó *bước nhỏ*. Biết $dx/dt = g(x)$ và $x$ tại $t$, ước lượng $x$ sau khoảng nhỏ $h$: "vị trí mới ≈ vị trí cũ + vận tốc × thời gian".

**Công thức Euler**: $x_{n+1} = x_n + h\cdot g(x_n)$.

🎯 **Phát hiện nối L03 và L04**: áp Euler cho $\frac{dN}{dt} = rN$ được $x_{n+1} = x_n + h\cdot r\cdot x_n =$ **$(1 + hr)\cdot x_n$** — đúng là **mô hình rời rạc tuyến tính** ở [L03 mục 2](../lesson-03-discrete-dynamical/)! Với $h$ nhỏ, $(1+hr)^n \to e^{rt}$. Vậy *giải ODE bằng máy = biến nó thành phương trình sai phân*. Hai thế giới là một khi $h \to 0$.

### 5.1 Walk-through Euler — bảng từng bước

**Bài toán**: $\frac{dN}{dt} = 0.5\,N$, $N_0 = 100$, bước $h = 1$, chạy đến $t = 4$. Nghiệm chính xác: $N(t) = 100\,e^{0.5t}$.

Công thức một bước: $N_{n+1} = N_n + h\cdot g(N_n) = N_n + 1\cdot(0.5\,N_n) = 1.5\,N_n$.

| Bước $n$ | $t_n$ | $N_n$ (Euler) | $g(N_n)=0.5N_n$ | $N_{n+1}=N_n+1\cdot g$ | Chính xác $100e^{0.5t}$ | Sai số |
|---|---|---|---|---|---|---|
| 0 | 0 | 100.0 | 50.0 | 150.0 | 100.0 | 0% |
| 1 | 1 | 150.0 | 75.0 | 225.0 | 164.9 | −9.0% |
| 2 | 2 | 225.0 | 112.5 | 337.5 | 271.8 | −17.2% |
| 3 | 3 | 337.5 | 168.75 | 506.25 | 448.2 | −24.7% |
| 4 | 4 | 506.25 | — | — | 738.9 | −31.5% |

→ Euler ở đây cho $N(4)\approx 506$ trong khi đúng là $739$ — **thấp hơn 31.5%** vì $h=1$ quá thô (mỗi bước "đóng băng" tốc độ ở đầu khoảng, mà tốc độ thực còn tăng trong khoảng). 

**Giảm $h$ để thấy hội tụ** (cùng tới $t=4$):

| $h$ | Số bước | $N(4)$ Euler | Sai số so với 739 |
|---|---|---|---|
| 1.0 | 4 | $100\cdot1.5^4 = 506$ | −31.5% |
| 0.5 | 8 | $100\cdot1.25^8 = 596$ | −19.4% |
| 0.1 | 40 | $100\cdot1.05^{40} = 704$ | −4.7% |
| 0.01 | 400 | $\approx 735$ | −0.5% |

→ $h$ nhỏ đi 10 lần thì sai số giảm ~10 lần (Euler là *bậc 1*). Lưu ý $(1+0.5h)$ chính là hệ số rời rạc L03; khi $h\to0$, $(1+0.5h)^{4/h}\to e^{0.5\cdot4}=e^2$ ✓.

⚠ **Lỗi thường gặp — chọn bước h quá lớn.** $h$ lớn → Euler sai nhiều, thậm chí mất ổn định (dao động giả). Phản ví dụ: logistic Euler với $h\cdot r$ quá lớn có thể tự tạo ra "chu kỳ/hỗn loạn" — đó là *artefact số học* của rời rạc hóa thô, không phải hành vi của ODE liên tục (vốn luôn mượt). Bài học: giảm $h$ để kiểm tra hội tụ.

📝 **Tóm tắt mục 5**: Euler $x_{n+1} = x_n + h\cdot g(x_n)$ rời rạc hóa ODE; với $\frac{dN}{dt}=rN$ ra đúng mô hình L03. $h$ nhỏ → bám liên tục; $h$ lớn → sai số/mất ổn định giả.

---

## 6. Bài tập

**Bài 1.** Vi khuẩn tăng mũ $r = 0.3$/giờ, $N_0 = 500$. (a) $N(5)$? (b) Thời gian nhân đôi?

**Bài 2.** Logistic $K = 2000$, $r = 0.4$, $N_0 = 200$. (a) Viết $N(t)$. (b) Khi nào $N = 1000$?

**Bài 3.** So sánh trong vài câu: vì sao logistic *rời rạc* (L03) có thể hỗn loạn còn logistic *liên tục* (bài này) thì không?

**Bài 4.** Bồn 200 L, ban đầu 0 kg muối; nước muối 1 kg/L vào 4 L/phút, trộn đều ra 4 L/phút. Lập và giải ODE cho $S(t)$; tìm $S$ khi $t \to \infty$.

**Bài 5.** Áp Euler bước $h = 0.5$ cho $\frac{dN}{dt} = 0.4N$, $N_0 = 100$. Tính $N$ sau 2 bước và so với nghiệm chính xác $N(1) = 100e^{0.4}$.

**Bài 6.** (phân rã phóng xạ) Một mẫu xương cổ còn $40\%$ lượng C-14 ban đầu ($T_{1/2} = 5730$ năm). (a) Tìm $\lambda$. (b) Mẫu bao nhiêu tuổi?

**Bài 7.** (nguội Newton) Bánh nướng $180°$C lấy ra phòng $25°$C; sau 5 phút còn $120°$C. (a) Tìm $k$. (b) Khi nào bánh còn $50°$C?

**Bài 8.** (cân bằng & ổn định) Cho ODE $\frac{dy}{dt} = y(3 - y)$. (a) Tìm mọi nghiệm cân bằng. (b) Xét dấu $\frac{dy}{dt}$ để phân loại ổn định / không ổn định.

---

## 7. Lời giải chi tiết

**Bài 1.** (a) $N(5) = 500\cdot e^{0.3\cdot 5} = 500\cdot e^{1.5} = 500\cdot 4.4817 \approx$ **2241**. (b) $t_2 = \ln 2/0.3 = 0.693/0.3 \approx$ **2.31 giờ**.

**Bài 2.** (a) $A = (2000-200)/200 = 9$ → **$N(t) = 2000/(1 + 9e^{-0.4t})$**. (b) $1000 = 2000/(1+9e^{-0.4t})$ → $1+9e^{-0.4t} = 2$ → $e^{-0.4t} = 1/9$ → $t = \ln 9/0.4 = 2.197/0.4 \approx$ **5.49** (đây là điểm uốn $N = K/2$). Kiểm $t=0$: $2000/10 = 200$ ✓.

**Bài 3.** Logistic rời rạc $x_{n+1} = r\cdot x_n(1-x_n)$ cập nhật theo *bước hữu hạn*: khi $r$ lớn, một bước có thể *vọt lố* qua điểm cân bằng rồi nảy về, sinh dao động/chu kỳ/hỗn loạn. Logistic liên tục $\frac{dN}{dt} = rN(1-N/K)$ thay đổi *từng khoảnh khắc vô cùng nhỏ*, không thể vọt lố — $N$ chỉ tiến đơn điệu về $K$. Bản chất: rời rạc hóa thô (bước lớn) thêm động lực mới không có trong ODE gốc (đúng như cảnh báo Euler ở mục 5).

**Bài 4.** Vào: $1\cdot 4 = 4$ kg/phút. Ra: $(S/200)\cdot 4 = 0.02S$. $\frac{dS}{dt} = 4 - 0.02S$. Cân bằng $S^* = 4/0.02 = 200$. $S(t) = 200 + (0 - 200)e^{-0.02t} =$ **$200(1 - e^{-0.02t})$**. Kiểm $t=0$: 0 ✓. **$t \to \infty$: $S \to 200$ kg** (= 1 kg/L × 200 L) ✓.

**Bài 5.** Euler: $x_{n+1} = x_n + 0.5\cdot 0.4\cdot x_n = x_n\cdot(1 + 0.2) = 1.2\cdot x_n$. $x_0 = 100$ → $x_1 = 120$ → $x_2 = 144$. Nghiệm chính xác $N(1) = 100\cdot e^{0.4} = 100\cdot 1.4918 \approx$ **149.2**. Euler cho 144 (thấp hơn ~3.5%); giảm $h$ sẽ sát hơn. (Lưu ý 1.2 chính là $(1+hr)$ — đúng mô hình rời rạc L03.)

**Bài 6.** (a) $\lambda = \ln 2/T_{1/2} = 0.693/5730 \approx$ **$1.21\times10^{-4}$/năm**. (b) $N/N_0 = 0.40 = e^{-\lambda t}$ → $-\lambda t = \ln 0.40 = -0.916$ → $t = 0.916/(1.21\times10^{-4}) \approx$ **7570 năm**. (Kiểm hợp lý: $40\%$ nằm giữa $50\%$ → 1 chu kỳ = 5730 năm và $25\%$ → 2 chu kỳ = 11460 năm, nên 7570 năm là hợp lý ✓.)

**Bài 7.** $T(t) = 25 + (180-25)e^{-kt} = 25 + 155e^{-kt}$. (a) $T(5) = 25 + 155e^{-5k} = 120$ → $e^{-5k} = 95/155 = 0.6129$ → $-5k = \ln 0.6129 = -0.4894$ → **$k \approx 0.0979$/phút**. (b) $50 = 25 + 155e^{-0.0979t}$ → $e^{-0.0979t} = 25/155 = 0.1613$ → $-0.0979t = \ln 0.1613 = -1.824$ → $t \approx$ **18.6 phút**.

**Bài 8.** (a) $g(y) = y(3-y) = 0$ → cân bằng **$y = 0$** và **$y = 3$**. (b) Xét dấu $g(y)$ trên 3 vùng:
- $y < 0$ (vd $y=-1$): $g = (-1)(4) = -4 < 0$ → $y$ giảm (rời xa 0 về phía âm).
- $0 < y < 3$ (vd $y=1$): $g = 1\cdot2 = +2 > 0$ → $y$ tăng (tiến tới 3).
- $y > 3$ (vd $y=4$): $g = 4\cdot(-1) = -4 < 0$ → $y$ giảm (về 3).

→ Quanh $y=0$: bên trái đẩy ra âm, bên phải đẩy lên 3 → **$y=0$ KHÔNG ổn định**. Quanh $y=3$: cả hai phía kéo về 3 → **$y=3$ ổn định** (giống logistic với $K=3$).

---

## 8. Bài tiếp theo

[Lesson 05 — Hệ tương tác (Lotka–Volterra, SIR)](../lesson-05-interacting-systems/): khi *nhiều* biến tác động lẫn nhau (thú–mồi, dịch bệnh), một ODE thành *hệ* ODE.

## 📝 Tổng kết

1. **ODE = luật tốc độ thay đổi** $dx/dt = g(x)$; dùng khi biến thiên liên tục. Vế phải nói tốc độ phụ thuộc trạng thái hiện tại; luật + điều kiện đầu = nghiệm cụ thể. Rời rạc và liên tục gặp nhau khi bước → 0.
2. **Mũ** $\frac{dN}{dt} = rN \to N_0 e^{rt}$; thời gian nhân đôi $\ln 2/r$; chỉ hợp giai đoạn đầu. $r$ = tốc độ tương đối.
3. **Phân rã** $\frac{dN}{dt} = -\lambda N \to N_0 e^{-\lambda t}$; chu kỳ bán rã $T_{1/2} = \ln 2/\lambda$ (độc lập $N_0$) — định tuổi C-14, y học. Đừng nhầm dấu mũ.
4. **Logistic** $\frac{dN}{dt} = rN(1-N/K) \to N = K/(1+Ae^{-rt})$; chữ S, bão hòa ở $K$, *luôn mượt* (khác bản rời rạc, không vọt lố qua $K$).
5. **Cân bằng & ổn định**: giải $g(N)=0$; xét dấu $g$ quanh mỗi cân bằng — kéo về = ổn định, đẩy ra = không ổn định. Logistic: $0$ không ổn định, $K$ ổn định.
6. **Nguội Newton & bể trộn**: ODE tuyến tính bậc 1, có cân bằng ổn định ($T_p$ / $S^*$); $k$ = tốc độ tiệm cận.
7. **Euler** $x_{n+1} = x_n + h\cdot g(x_n)$: mô phỏng ODE = phương trình sai phân; $h$ nhỏ → bám liên tục (sai số ∝ $h$); $h$ quá lớn → sai số/mất ổn định giả. Quên điều kiện đầu là lỗi xuyên suốt.
