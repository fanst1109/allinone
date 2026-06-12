// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/02-Geometry/lesson-03-circles/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Đường tròn

## Mục tiêu

- Hiểu các thuật ngữ: **tâm, bán kính, dây cung, đường kính, cung, tiếp tuyến, cát tuyến**.
- Biết các **công thức chu vi, diện tích**, **độ dài cung và diện tích hình quạt**.
- Hiểu các định lý quan trọng: **góc nội tiếp**, **góc ở tâm**, **góc tiếp tuyến–dây**, **tứ giác nội tiếp**, **phương tích**.
- Lập và đọc **phương trình đường tròn** $(x-a)^2 + (y-b)^2 = R^2$.
- Liên hệ đường tròn ngoại tiếp / nội tiếp tam giác.

## Kiến thức tiền đề

- [Lesson 02 — Tam giác](../lesson-02-triangles/).

---

## 1. Đường tròn — Khái niệm

**Đường tròn (O, R)** = tập hợp các điểm cách điểm O cho trước **một khoảng không đổi R**.

- **Tâm**: O.
- **Bán kính**: R = khoảng cách từ tâm đến điểm trên đường tròn.
- **Đường kính** D = 2R = dây dài nhất, đi qua tâm.
- **Dây cung**: đoạn nối 2 điểm trên đường tròn.
- **Cung**: phần đường tròn giữa 2 điểm.

**Hình tròn**: vùng bên trong đường tròn (kèm cả đường tròn).

**Sơ đồ tổng quát các thành phần** (bán kính – đường kính – dây cung):

\`\`\`
                  cung lớn (major arc)
              ╭───────────────────────╮
          P •                           • Q
           ╱ ╲                         ╱
          ╱   ╲ R (bán kính)         ╱
         │     ╲                   ╱
         │      ╲                ╱  ← dây cung PQ (chord)
   A •───┼───────• O────────────• B
         │     R   (tâm/center) R
         │      đường kính AB = 2R (diameter)
          ╲                    ╱
           ╲                  ╱
            ╰────────────────╯
              cung nhỏ (minor arc) chắn bởi dây PQ
\`\`\`

Đọc sơ đồ: **O** là tâm (center). Đoạn **OA**, **OB** là **bán kính (radius)** R. Đoạn **AB** đi qua O là **đường kính (diameter)** $D = 2R$. Đoạn **PQ** nối 2 điểm trên viền (không qua O) là **dây cung (chord)** — nó chia viền thành **cung nhỏ (minor arc)** và **cung lớn (major arc)**.

> 📐 **Định nghĩa đầy đủ — Đường tròn**
>
> **(a) Là gì**: Tập hợp **tất cả** các điểm trong mặt phẳng cách 1 điểm cố định O đúng 1 khoảng R cố định. Không nhiều hơn, không ít hơn — chính xác R.
>
> **(b) Vì sao cần**: Đường tròn là hình "đối xứng cao nhất" — đối xứng quay quanh O với MỌI góc. Đặc trưng này làm nó xuất hiện khắp nơi trong tự nhiên (giọt nước, mặt trăng tròn, sóng lan), kỹ thuật (bánh xe — quay không tịnh tiến), và toán (định nghĩa $\\pi =$ chu vi/đường kính, sin/cos qua đường tròn đơn vị).
>
> **(c) Ví dụ số**: Đường tròn ($O$, $R=5$). Điểm $A(3, 4)$ cách $O(0,0) = \\sqrt{9+16} = 5$ → A **trên** đường tròn. Điểm $B(2, 3)$ cách $O = \\sqrt{13} \\approx 3.6 < 5$ → B **trong** hình tròn. Điểm $C(6, 0)$ cách $O = 6 > 5$ → C **ngoài**. Chu vi $= 2\\pi\\cdot 5 = 10\\pi \\approx 31.4$. Diện tích $= \\pi\\cdot 25 \\approx 78.5$.

💡 **Trực giác / Hình dung**: hình dung 1 sợi dây buộc cọc ở O, đầu kia gắn bút. Kéo căng dây (độ dài R) rồi quay 1 vòng → vết bút vẽ ra đúng **đường tròn**. Mọi điểm trên đường tròn cách cọc O đúng 1 độ dài dây R — không gần hơn, không xa hơn. Đó là định nghĩa.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đường tròn và hình tròn khác nhau gì?"* **Đường tròn** chỉ là đường viền (tập điểm cách O đúng R). **Hình tròn** là cả vùng bên trong + viền (tập điểm cách $O \\le R$). Chu vi đo đường tròn, diện tích đo hình tròn.
- *"Đường kính có phải dây cung không?"* Có — đường kính là **dây cung dài nhất** (dây đi qua tâm). Mọi dây cung khác ngắn hơn.
- *"Làm sao biết 1 điểm nằm trong/trên/ngoài?"* So khoảng cách tới tâm với R: $< R$ (trong), $= R$ (trên), $> R$ (ngoài).

**4 ví dụ số — vị trí điểm so với đường tròn ($O(0,0)$, $R = 5$)**. Quy tắc: tính $d = \\sqrt{x^2 + y^2}$ rồi so với $R = 5$.

| Điểm | $d = \\sqrt{x^2+y^2}$ | So với $R=5$ | Vị trí |
|------|----------------------|--------------|--------|
| $A(3, 4)$ | $\\sqrt{9+16} = \\sqrt{25} = 5$ | $= R$ | **trên** đường tròn |
| $B(0, 5)$ | $\\sqrt{0+25} = 5$ | $= R$ | **trên** đường tròn |
| $C(1, 2)$ | $\\sqrt{1+4} = \\sqrt 5 \\approx 2.24$ | $< R$ | **trong** hình tròn |
| $E(5, 5)$ | $\\sqrt{25+25} = \\sqrt{50} \\approx 7.07$ | $> R$ | **ngoài** |

Lưu ý $A(3,4)$ là bộ ba Pythagore $3$-$4$-$5$ kinh điển — luôn nằm đúng trên đường tròn bán kính 5.

⚠ **Lỗi thường gặp**: nhầm **bán kính** R với **đường kính** D. Nhớ $D = 2R$. Phản ví dụ: đường tròn "rộng 10 cm" (đường kính 10) thì $R = 5$, chu vi $= 2\\pi\\cdot 5 = 10\\pi$ — nếu lấy $R = 10$ sẽ ra $20\\pi$, sai gấp đôi. Mẹo kiểm tra nhanh: nếu đề cho "đường kính / bề rộng / khoảng cách 2 mép" → đó là $D$, phải chia 2 trước khi dùng vào công thức cần R.

🔁 **Dừng lại tự kiểm tra**

1. Đường tròn ($O$, $R=5$). Điểm M cách O 5 đơn vị nằm ở đâu? Điểm N cách O 7 đơn vị?
2. Dây cung dài nhất của đường tròn gọi là gì, dài bao nhiêu nếu $R = 6$?

<details><summary>Đáp án</summary>

1. M **trên** đường tròn ($= R$); N **ngoài** ($> R$).
2. Đường kính, dài $2R =$ **12**.

</details>

### 📝 Tóm tắt mục 1

- Đường tròn (O, R) = tập điểm cách tâm O đúng R; **hình tròn** = cả vùng trong.
- Đường kính D = 2R = dây cung dài nhất (qua tâm).
- So khoảng cách tới O với R → biết điểm trong/trên/ngoài.
- Đường tròn = hình đối xứng quay cao nhất (đối xứng với mọi góc quay).

---

## 2. Chu vi và diện tích

$$\\begin{aligned}
C &= 2\\pi R = \\pi D \\\\
S &= \\pi R^2
\\end{aligned}$$

trong đó **$\\pi \\approx 3.14159$**.

💡 **Vì sao $\\pi$?** $\\pi$ là tỉ số chu vi / đường kính của MỌI đường tròn — không phụ thuộc kích thước. Đây là một trong những hằng số nổi tiếng nhất Toán.

💡 **Trực giác / Hình dung**: lăn 1 bánh xe đường kính 1 m trên đất, đi hết đúng 1 vòng → vết lăn dài $\\pi \\approx 3.14$ m. Nghĩa là chu vi "gấp $\\pi$ lần đường kính", đúng cho mọi bánh xe to nhỏ. Diện tích thì "2 chiều" nên có $R^2$ (đường kính lên mũ 2).

**Walk-through chu vi & diện tích — 4 ví dụ số, tính từng bước** (lấy $\\pi \\approx 3.14159$):

| Đề cho | Lấy R | $C = 2\\pi R$ (thay số) | $S = \\pi R^2$ (thay số) |
|--------|-------|------------------------|--------------------------|
| $R = 1$ | $1$ | $2\\pi\\cdot 1 = 2\\pi \\approx 6.28$ | $\\pi\\cdot 1^2 = \\pi \\approx 3.14$ |
| $R = 5$ | $5$ | $2\\pi\\cdot 5 = 10\\pi \\approx 31.42$ | $\\pi\\cdot 25 = 25\\pi \\approx 78.54$ |
| $D = 10$ | $D/2 = 5$ | $\\pi D = 10\\pi \\approx 31.42$ | $\\pi\\cdot 5^2 = 25\\pi \\approx 78.54$ |
| $R = 0.5$ | $0.5$ | $2\\pi\\cdot 0.5 = \\pi \\approx 3.14$ | $\\pi\\cdot 0.25 = 0.25\\pi \\approx 0.785$ |

Đọc kỹ dòng $D = 10$: vì đề cho **đường kính**, phải lấy $R = D/2 = 5$ rồi mới thay — kết quả trùng dòng $R = 5$. Đây là chỗ sai phổ biến nhất.

**Walk-through ngược (từ chu vi/diện tích suy R)** — thường gặp trong bài toán thực tế:
- Biết $C = 18.84$: $R = C/(2\\pi) = 18.84/6.2832 \\approx 3$ → kiểm tra $2\\pi\\cdot 3 = 6\\pi \\approx 18.85$ ✓.
- Biết $S = 50.27$: $R = \\sqrt{S/\\pi} = \\sqrt{50.27/3.14159} = \\sqrt{16} = 4$ → kiểm tra $\\pi\\cdot 16 \\approx 50.27$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chu vi có R mũ 1 mà diện tích có R mũ 2?"* Chu vi là độ dài (1 chiều) → tỉ lệ thuận với R. Diện tích (2 chiều) → tỉ lệ với $R^2$. Tăng R gấp đôi: chu vi gấp 2, diện tích gấp 4.
- *"$\\pi$ chính xác bằng bao nhiêu?"* $\\pi$ là số vô tỉ (vô hạn không tuần hoàn): 3.14159265... Thường lấy 3.14 hoặc 22/7 để tính nhanh.
- *"Đề cho đường kính thì sao?"* Chia đôi lấy R trước, hoặc dùng $C = \\pi D$ trực tiếp.

⚠ **Lỗi thường gặp**: dùng đường kính vào công thức $S = \\pi R^2$. Phản ví dụ: đường kính 10, nếu thay $R = 10$ → $S = 100\\pi$ (sai); đúng phải $R = 5$ → $S = 25\\pi$. Lỗi thứ 2: quên bình phương R trong diện tích (viết $\\pi R$ thay vì $\\pi R^2$).

🔁 **Dừng lại tự kiểm tra**

1. Đường tròn đường kính 14. Tính chu vi (lấy $\\pi \\approx 22/7$).
2. Tăng bán kính gấp 3 thì diện tích tăng mấy lần?

<details><summary>Đáp án</summary>

1. $C = \\pi D = (22/7)\\cdot 14 =$ **44**.
2. Diện tích tỉ lệ $R^2$ → tăng $3^2 =$ **9 lần**.

</details>

### 2.1. Độ dài cung & diện tích hình quạt (Arc length & Sector area)

💡 **Trực giác / Hình dung**: cắt một miếng **bánh pizza** từ chiếc bánh tròn. Phần **vỏ cong** của miếng bánh là **cung (arc)**; cả miếng bánh tam giác-quạt là **hình quạt (sector)**. Nếu miếng bánh chiếm góc $\\theta$ trong tổng $360^\\circ$ thì nó chiếm đúng **tỉ lệ $\\theta/360^\\circ$** của cả viền (chu vi) và của cả mặt bánh (diện tích).

\`\`\`
        cung ℓ (arc) — phần viền cong
            ╭────────────╮
          ╱                ╲
        ╱  ╲              ╱  ╲
      ╱     ╲   hình     ╱     ╲
    ╱        ╲  quạt    ╱        ╲
   │      θ   ╲(sector)╱   R     │
   │  ╭────────• O ────────╮     │
              tâm
   2 cạnh O→viền là bán kính R, góc giữa chúng = θ
\`\`\`

**Công thức theo độ ($\\theta$ tính bằng độ)**:

$$\\begin{aligned}
\\ell &= \\frac{\\theta}{360^\\circ}\\cdot 2\\pi R \\quad(\\text{độ dài cung}) \\\\
S_\\text{quạt} &= \\frac{\\theta}{360^\\circ}\\cdot \\pi R^2 \\quad(\\text{diện tích hình quạt})
\\end{aligned}$$

**Công thức theo radian** (gọn hơn — sẽ dùng nhiều ở Giải tích, xem [Lesson 07 — Hàm số](../../01-Arithmetic-Algebra/lesson-07-functions-intro/)): nếu $\\theta$ tính bằng **radian** thì

$$\\ell = R\\theta, \\qquad S_\\text{quạt} = \\tfrac{1}{2}R^2\\theta.$$

Nhắc lại đổi đơn vị: $180^\\circ = \\pi$ rad, nên $1$ rad $= 180^\\circ/\\pi \\approx 57.3^\\circ$ và $\\theta_\\text{rad} = \\theta_\\text{độ}\\cdot \\pi/180$.

**Walk-through 4 ví dụ số** (mỗi ví dụ thay số từng bước):

**Ví dụ 1** — cung theo độ. Đường tròn $R = 6$, góc ở tâm $\\theta = 60^\\circ$.
$$\\ell = \\frac{60}{360}\\cdot 2\\pi\\cdot 6 = \\frac{1}{6}\\cdot 12\\pi = 2\\pi \\approx 6.28.$$

**Ví dụ 2** — diện tích hình quạt theo độ. Cùng $R = 6$, $\\theta = 90^\\circ$ (một phần tư bánh).
$$S_\\text{quạt} = \\frac{90}{360}\\cdot \\pi\\cdot 6^2 = \\frac{1}{4}\\cdot 36\\pi = 9\\pi \\approx 28.27.$$
Kiểm tra trực giác: $\\frac14$ của cả hình tròn $36\\pi$ đúng là $9\\pi$ ✓.

**Ví dụ 3** — cung theo radian. $R = 10$, $\\theta = \\pi/3$ rad.
$$\\ell = R\\theta = 10\\cdot \\frac{\\pi}{3} = \\frac{10\\pi}{3} \\approx 10.47.$$
Đối chiếu: $\\pi/3$ rad $= 60^\\circ$, dùng công thức độ: $\\frac{60}{360}\\cdot 2\\pi\\cdot 10 = \\frac16\\cdot 20\\pi = \\frac{10\\pi}{3}$ ✓ (cùng kết quả).

**Ví dụ 4** — quạt theo radian. $R = 4$, $\\theta = \\pi/2$ rad.
$$S_\\text{quạt} = \\tfrac12 R^2\\theta = \\tfrac12\\cdot 16\\cdot \\frac{\\pi}{2} = 4\\pi \\approx 12.57.$$
Đối chiếu: $\\pi/2$ rad $= 90^\\circ = \\frac14$ vòng → $\\frac14\\cdot \\pi\\cdot 16 = 4\\pi$ ✓.

**Ví dụ 5 (ngược)** — biết cung, tìm góc. Đường tròn $R = 6$, cung $\\ell = 4\\pi$. Từ $\\ell = R\\theta$ (radian): $\\theta = \\ell/R = 4\\pi/6 = 2\\pi/3$ rad $= 120^\\circ$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào dùng độ, khi nào dùng radian?"* Hai công thức cho **cùng kết quả** — chọn theo đơn vị đề cho. Radian gọn hơn ($\\ell = R\\theta$ không có phân số) và là chuẩn trong giải tích. Nếu đề cho độ thì đổi sang radian, hoặc dùng thẳng công thức $\\theta/360^\\circ$.
- *"Hình quạt khác hình viên phân (segment) thế nào?"* **Hình quạt (sector)** = miếng pizza (2 bán kính + cung). **Hình viên phân (segment)** = phần giữa **dây cung** và cung (bỏ tam giác đi). Diện tích viên phân $= S_\\text{quạt} - S_\\text{tam giác}$.
- *"Vì sao $\\ell = R\\theta$ chỉ đúng với radian?"* Vì radian được **định nghĩa** là tỉ số cung/bán kính: $\\theta_\\text{rad} = \\ell/R$. Đảo lại cho ngay $\\ell = R\\theta$. Đó chính là lý do radian tồn tại.

⚠ **Lỗi thường gặp**: dùng $\\ell = R\\theta$ với $\\theta$ tính bằng **độ**. Phản ví dụ: $R = 6$, $\\theta = 60^\\circ$ — nếu thay thẳng $\\ell = 6\\cdot 60 = 360$ (sai, vô lý vì lớn hơn cả chu vi $12\\pi \\approx 37.7$!). Đúng: hoặc đổi $60^\\circ = \\pi/3$ rad rồi $\\ell = 6\\cdot\\pi/3 = 2\\pi$, hoặc dùng công thức độ $\\frac{60}{360}\\cdot 12\\pi = 2\\pi$. Công thức $R\\theta$ **bắt buộc** radian.

🔁 **Dừng lại tự kiểm tra**

1. $R = 9$, $\\theta = 40^\\circ$. Tính độ dài cung.
2. $R = 5$, hình quạt có góc ở tâm $\\pi/5$ rad. Tính diện tích quạt.

<details><summary>Đáp án</summary>

1. $\\ell = \\frac{40}{360}\\cdot 2\\pi\\cdot 9 = \\frac19\\cdot 18\\pi = 2\\pi \\approx$ **6.28**.
2. $S = \\tfrac12\\cdot 5^2\\cdot \\frac{\\pi}{5} = \\tfrac12\\cdot 25\\cdot\\frac{\\pi}{5} = \\tfrac{25\\pi}{10} = \\tfrac{5\\pi}{2} \\approx$ **7.85**.

</details>

### 📝 Tóm tắt mục 2

- **$C = 2\\pi R = \\pi D$** (chu vi, 1 chiều, tỉ lệ R).
- **$S = \\pi R^2$** (diện tích, 2 chiều, tỉ lệ $R^2$).
- $\\pi \\approx 3.14159 =$ tỉ số chu vi/đường kính của mọi đường tròn.
- Đề cho đường kính → chia 2 lấy R trước khi vào $S = \\pi R^2$.
- **Cung & quạt**: theo độ $\\ell = \\frac{\\theta}{360}2\\pi R$, $S_\\text{quạt} = \\frac{\\theta}{360}\\pi R^2$; theo radian $\\ell = R\\theta$, $S_\\text{quạt} = \\frac12 R^2\\theta$. Công thức $R\\theta$ **bắt buộc** radian.

---

## 3. Các loại đường — Tiếp tuyến, Cát tuyến

💡 **Trực giác / Hình dung**: hãy hình dung 1 cây thước thẳng tiến dần về phía đường tròn. Lúc còn xa → không chạm (đường không cắt). Khi vừa "hôn" vào viền tại đúng 1 điểm → **tiếp tuyến**. Đẩy sâu hơn, thước "xuyên" qua đường tròn tại 2 điểm → **cát tuyến**. Khoảng cách từ tâm tới thước quyết định: $> R$, $= R$, $< R$.

- **Tiếp tuyến**: đường thẳng chỉ chạm đường tròn tại **1 điểm** duy nhất. Tại điểm chạm, tiếp tuyến **vuông góc với bán kính**.
- **Cát tuyến**: đường thẳng cắt đường tròn tại **2 điểm**.
- **Đường không cắt**: đường thẳng cách tâm khoảng $> R$.

**Sơ đồ 3 vị trí của đường thẳng** (d = khoảng cách từ tâm O tới đường thẳng):

\`\`\`
   d > R: KHÔNG CẮT          d = R: TIẾP TUYẾN         d < R: CÁT TUYẾN
  ─────────────────         ─────────●──────────       ────●───────●─────
                                     │ (1 điểm T)          │       │
        ╭───╮                   ╭────┴╮                 ╭──┴───────┴──╮
       ╱     ╲                 ╱   R  ╲               ╱  dây cung    ╲
      │   O   │               │   O    │             │      O         │
       ╲     ╱                 ╲      ╱               ╲              ╱
        ╰───╯                   ╰────╯                 ╰────────────╯
   (đường ở ngoài)        OT ⊥ tiếp tuyến tại T    cắt 2 điểm → dây cung
\`\`\`

**Tiếp tuyến vuông góc bán kính** — sơ đồ riêng:

\`\`\`
                tiếp tuyến t
       ────────────●────────────
                   │T
                   │  ← bán kính OT ⊥ t  (góc OTt = 90°)
                   │
                   • O (tâm)
\`\`\`

**Hai tiếp tuyến từ một điểm ngoài** P (độ dài bằng nhau):

\`\`\`
            • A  (tiếp điểm)
           ╱│
     PA   ╱ │
        ╱   │  ╭────╮
   P •──    │ │  O  │      PA = PB (2 đoạn tiếp tuyến bằng nhau)
        ╲   │ ╰────╯
     PB   ╲ │
           ╲│
            • B  (tiếp điểm)
\`\`\`

**Công thức dây cung**: nếu đường thẳng cách tâm khoảng $d < R$, độ dài dây cung là $2\\sqrt{R^2 - d^2}$ (suy từ Pythagore: nửa dây, $d$, và R tạo tam giác vuông).

**4 ví dụ số — phân loại đường thẳng (đường tròn $O$, $R = 5$)**:

| Khoảng cách $d$ | So với $R=5$ | Loại đường | Độ dài dây (nếu cắt) |
|-----------------|--------------|------------|----------------------|
| $d = 3$ | $< 5$ | cát tuyến | $2\\sqrt{25-9} = 2\\cdot 4 = 8$ |
| $d = 0$ (qua tâm) | $< 5$ | cát tuyến (đường kính) | $2\\sqrt{25-0} = 10$ (= $2R$) |
| $d = 5$ | $= 5$ | tiếp tuyến | — (1 điểm) |
| $d = 7$ | $> 5$ | không cắt | — |

Dòng $d = 0$ xác nhận: dây đi qua tâm dài nhất, bằng đường kính $2R = 10$. Càng xa tâm ($d$ tăng) dây càng ngắn, tới $d = R$ thì dây co về 1 điểm (tiếp tuyến).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tiếp tuyến vuông góc với bán kính?"* Vì bán kính tới điểm tiếp xúc là khoảng cách **ngắn nhất** từ tâm tới đường thẳng — mà khoảng cách ngắn nhất luôn là đường vuông góc.
- *"Từ 1 điểm ngoài đường tròn kẻ được mấy tiếp tuyến?"* Đúng **2** tiếp tuyến, và 2 đoạn tiếp tuyến từ điểm đó tới 2 tiếp điểm **bằng nhau**.
- *"Cát tuyến với dây cung khác nhau gì?"* Dây cung là **đoạn** nối 2 giao điểm; cát tuyến là **đường thẳng** chứa dây đó (kéo dài 2 phía).

⚠ **Lỗi thường gặp**: tưởng tiếp tuyến "song song với bán kính". Sai — tiếp tuyến **vuông góc** với bán kính tại điểm tiếp xúc. Phản ví dụ: nếu tiếp tuyến song song bán kính thì nó sẽ cắt đường tròn ở 2 điểm (thành cát tuyến), mâu thuẫn.

🔁 **Dừng lại tự kiểm tra**

1. Đường thẳng cách tâm 4, R = 4. Đường thẳng là loại gì?
2. Tiếp tuyến tạo với bán kính (tại tiếp điểm) góc bao nhiêu?

<details><summary>Đáp án</summary>

1. Khoảng cách $= R$ → **tiếp tuyến**.
2. **$90^\\circ$** (vuông góc).

</details>

### 📝 Tóm tắt mục 3

- So khoảng cách d từ tâm tới đường thẳng với R: $d > R$ không cắt, $d = R$ tiếp tuyến, $d < R$ cát tuyến.
- Tiếp tuyến chạm 1 điểm và **vuông góc với bán kính** tại đó.
- Từ 1 điểm ngoài kẻ được 2 tiếp tuyến, 2 đoạn tiếp tuyến bằng nhau.
- Cát tuyến cắt 2 điểm; đoạn nối 2 điểm đó là dây cung.

---

## 4. Góc trong đường tròn

💡 **Trực giác / Hình dung**: cùng 1 cung tròn AC, nhìn từ **tâm O** thấy "rộng", nhìn từ 1 điểm B **trên viền** thấy "hẹp đúng một nửa". Giống đứng gần sân khấu (tâm) thấy nó choán hết tầm mắt, lùi ra xa lên khán đài (trên viền) thấy nhỏ lại. Quan hệ "một nửa" này là chìa khóa của cả mục.

### 4.1. Góc ở tâm (Central angle)

Góc có đỉnh ở **tâm O**, 2 cạnh là 2 bán kính.

Góc ở tâm = **số đo cung** mà nó chắn.

\`\`\`
   Góc ở TÂM (central angle)
            A
            ●
           ╱
          ╱
         ╱  ∠AOB = θ  (đỉnh tại O)
   O ●──────────● B
   θ = số đo cung AB nó chắn
\`\`\`

### 4.2. Góc nội tiếp (Inscribed angle)

Góc có đỉnh **trên đường tròn**, 2 cạnh là 2 dây.

\`\`\`
   Góc NỘI TIẾP (inscribed angle)
              B  (đỉnh TRÊN viền)
             ●
            ╱ ╲
           ╱   ╲   ∠ABC = α
          ╱     ╲
       A ●       ● C
       cùng chắn cung AC như góc tâm ∠AOC
       → α = ½ · ∠AOC
\`\`\`

**So sánh trực tiếp cùng chắn 1 cung AC**:

\`\`\`
            B ●  (góc nội tiếp ∠ABC = α)
             ╱ ╲
            ╱   ╲
           ╱  O  ╲   ∠AOC = 2α  (góc ở tâm, gấp đôi)
       A ●───●───● C
           cung AC
\`\`\`

💡 **Định lý nội tiếp**: góc nội tiếp = **$\\frac{1}{2}$ góc ở tâm** cùng chắn cung đó.

**Hệ quả quan trọng**:
- Mọi góc nội tiếp chắn cung **nửa đường tròn** (đường kính) đều bằng **$90^\\circ$**.
- Mọi góc nội tiếp cùng chắn 1 cung đều bằng nhau.

> 📐 **Định nghĩa đầy đủ — Định lý góc nội tiếp**
>
> **(a) Là gì**: Quan hệ "1/2" giữa 2 loại góc cùng chắn 1 cung. Góc nội tiếp (đỉnh trên đường tròn) = **một nửa** góc ở tâm (đỉnh tại O) cùng chắn cùng cung đó.
>
> **(b) Vì sao cần**: Vì định lý này cho phép **suy góc** mà không cần đo. Trong nhiều bài hình, ta chỉ biết 1 cung hoặc 1 góc tâm, định lý lập tức cho ra mọi góc nội tiếp tương ứng. Hệ quả nổi tiếng: "góc nội tiếp chắn nửa đường tròn $= 90^\\circ$" — dùng để chứng minh vuông góc mà không cần kiểm tra Pythagore. Cốt lõi của xây dựng đường tròn ngoại tiếp tam giác vuông.
>
> **(c) Ví dụ số**: Đường tròn tâm O, cung AC có góc ở tâm $AOC = 80^\\circ$. Lấy B bất kỳ trên cung lớn → góc $ABC = 80^\\circ/2 =$ **$40^\\circ$**. Lấy B' khác cũng trên cung lớn → góc $AB'C = 40^\\circ$ (bằng ABC). Nếu AC là đường kính ($AOC = 180^\\circ$) → mọi góc $ABC = 90^\\circ$ (kinh điển).

### 4.3. Walk-through chứng minh định lý góc nội tiếp

Cho góc nội tiếp ABC chắn cung AC. Vẽ đường kính BD qua tâm O.

\`\`\`
        B ●
         ╱│╲
        ╱ │ ╲
     A ●  │  ● C
        ╲ │ ╱
         ╲│╱
        O ●  ← tâm, BD là đường kính
          │
          ● D
\`\`\`

**Chứng minh từng bước** (cấm bỏ bước):

- **Bước 1.** $OA = OB = R$ (cùng là bán kính) → tam giác $OAB$ **cân** tại O → 2 góc đáy bằng nhau: $\\widehat{OAB} = \\widehat{OBA}$. Đặt $\\widehat{OBA} = x$.
- **Bước 2.** Góc $\\widehat{AOD}$ là **góc ngoài** tại đỉnh O của tam giác cân $OAB$ → bằng tổng 2 góc trong không kề: $\\widehat{AOD} = \\widehat{OAB} + \\widehat{OBA} = x + x = 2x$.
- **Bước 3.** Tương tự, $OC = OB = R$ → tam giác $OCB$ cân → $\\widehat{OCB} = \\widehat{OBC}$. Đặt $\\widehat{OBC} = y$. Góc ngoài $\\widehat{COD} = 2y$.
- **Bước 4.** Cộng lại: góc nội tiếp $\\widehat{ABC} = \\widehat{OBA} + \\widehat{OBC} = x + y$; còn góc ở tâm $\\widehat{AOC} = \\widehat{AOD} + \\widehat{COD} = 2x + 2y = 2(x+y)$.
- **Kết luận.** $\\widehat{AOC} = 2\\cdot\\widehat{ABC}$, tức $\\widehat{ABC} = \\tfrac12\\widehat{AOC}$ ∎.

**2 ví dụ số kiểm chứng định lý**:

**Ví dụ 1.** Góc ở tâm $\\widehat{AOC} = 80^\\circ$. B nằm trên cung lớn → góc nội tiếp $\\widehat{ABC} = 80^\\circ/2 = \\mathbf{40^\\circ}$. Lấy điểm B' khác cũng trên cung lớn → $\\widehat{AB'C} = 40^\\circ$ (mọi góc nội tiếp cùng chắn cung AC đều bằng nhau).

**Ví dụ 2.** Biết góc nội tiếp $\\widehat{ABC} = 25^\\circ$ → góc ở tâm $\\widehat{AOC} = 2\\cdot 25 = \\mathbf{50^\\circ}$ (đi ngược thì nhân 2). Cung AC do đó có số đo $50^\\circ$.

**Ví dụ 3 (trường hợp đường kính).** Nếu AC là đường kính thì $\\widehat{AOC} = 180^\\circ$ (góc bẹt) → mọi góc nội tiếp $\\widehat{ABC} = 180^\\circ/2 = \\mathbf{90^\\circ}$ — đây là **định lý Thales**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Hai góc nội tiếp cùng chắn 1 cung có bằng nhau không?"* Có — vì đều bằng $\\frac{1}{2}$ góc ở tâm (chung 1 góc tâm). Đây là cơ sở để "dời" góc trong nhiều bài chứng minh.
- *"Vì sao góc chắn đường kính $= 90^\\circ$?"* Vì đường kính có góc ở tâm $= 180^\\circ$ (góc bẹt) → góc nội tiếp $= 180^\\circ/2 = 90^\\circ$. Đây là định lý Thales.
- *"Góc ở tâm và góc nội tiếp phải cùng chắn cung nào?"* Cùng 1 cung. Nếu khác cung thì quan hệ $\\frac{1}{2}$ không áp dụng.

⚠ **Lỗi thường gặp**:
1. Lấy góc nội tiếp = góc ở tâm (quên chia 2). Phản ví dụ: cung có góc ở tâm $100^\\circ$ → góc nội tiếp $=$ **$50^\\circ$**, không phải $100^\\circ$.
2. Nhân/chia 2 sai chiều — nếu biết góc nội tiếp $30^\\circ$ thì góc ở tâm $= 60^\\circ$ ($\\times 2$), không phải $15^\\circ$. Quy tắc nhớ: **tâm to gấp đôi, nội tiếp nhỏ một nửa**.
3. Quên rằng góc nội tiếp **chắn nửa đường tròn (đường kính)** thì **= $90^\\circ$**, không phải $180^\\circ$. Phản ví dụ: AB là đường kính, C trên viền → $\\widehat{ACB} = 90^\\circ$ (vì cung nửa $= 180^\\circ$, chia 2). Nhiều người viết nhầm $180^\\circ$ vì lẫn với số đo cung.

🔁 **Dừng lại tự kiểm tra**

1. Góc ở tâm chắn cung $AB = 70^\\circ$. Góc nội tiếp chắn cùng cung AB bằng bao nhiêu?
2. AB là đường kính, C trên đường tròn. Góc ACB bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. $70^\\circ/2 =$ **$35^\\circ$**.
2. **$90^\\circ$** (góc nội tiếp chắn đường kính — định lý Thales).

</details>

### 📝 Tóm tắt mục 4

- **Góc ở tâm** (đỉnh tại O) = số đo cung nó chắn.
- **Góc nội tiếp** (đỉnh trên viền) $= \\frac{1}{2}$ góc ở tâm cùng chắn cung đó.
- Hệ quả: góc chắn đường kính $= 90^\\circ$; các góc nội tiếp cùng chắn 1 cung bằng nhau.
- Nhớ chia 2 khi đi từ góc tâm → góc nội tiếp (và nhân 2 khi đi ngược).

---

## 5. Tứ giác nội tiếp

💡 **Trực giác / Hình dung**: không phải tứ giác nào cũng "nhét" được 4 đỉnh lên cùng 1 đường tròn — chỉ những tứ giác "cân đối" mới được. Dấu hiệu nhận biết: 2 góc đối "bù trừ" cho nhau thành $180^\\circ$. Hình dung 2 góc đối như 2 người ngồi đối diện bàn tròn — góc nhìn của họ cộng lại luôn "khép kín" nửa vòng.

**Tứ giác nội tiếp** = tứ giác có **4 đỉnh nằm trên 1 đường tròn**.

**Định lý**: tứ giác nội tiếp có **tổng 2 góc đối nhau $= 180^\\circ$**.

**Vì sao tổng 2 góc đối $= 180^\\circ$?** Góc A chắn cung BCD, góc C chắn cung BAD — 2 cung này ghép thành cả đường tròn (góc tâm tổng $360^\\circ$). Mỗi góc nội tiếp $= \\frac{1}{2}$ cung → $A + C = \\frac{1}{2}\\cdot 360^\\circ = 180^\\circ$. □

**Verify bằng số**: tứ giác nội tiếp có $A = 85^\\circ$, C đối diện → $C = 180 - 85 = 95^\\circ$. Nếu $B = 110^\\circ$ thì $D = 180 - 110 = 70^\\circ$. Kiểm tổng 4 góc: $85+95+110+70 = 360^\\circ$ ✓ (đúng tổng góc tứ giác).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Hình vuông, chữ nhật có nội tiếp được không?"* Có — 2 góc đối đều $90^\\circ$, tổng $180^\\circ$ ✓. Mọi hình chữ nhật đều nội tiếp đường tròn (tâm là giao 2 đường chéo).
- *"Hình bình hành (không vuông) có nội tiếp không?"* Không — 2 góc đối của hình bình hành bằng nhau, tổng $= 2\\cdot$góc $\\neq 180^\\circ$ trừ khi mỗi góc $= 90^\\circ$ (thành chữ nhật).
- *"Dùng để làm gì?"* Chứng minh 4 điểm cùng nằm trên 1 đường tròn (đồng viên) bằng cách chỉ ra tổng 2 góc đối $= 180^\\circ$.

⚠ **Lỗi thường gặp**: nghĩ tổng 2 góc **kề** (không đối) $= 180^\\circ$. Sai — định lý nói 2 góc **đối diện** mới bù nhau. Phản ví dụ: tứ giác nội tiếp $A=85$, $B=110$, $C=95$, $D=70$ — A và C đối ($85+95=180$ ✓), nhưng A và B kề ($85+110=195 \\neq 180$).

🔁 **Dừng lại tự kiểm tra**

1. Tứ giác ABCD nội tiếp, góc $B = 95^\\circ$. Góc D bằng bao nhiêu?
2. Hình thoi (không vuông) có nội tiếp đường tròn được không?

<details><summary>Đáp án</summary>

1. D đối B → $D = 180 - 95 =$ **$85^\\circ$**.
2. Không — 2 góc đối của hình thoi bằng nhau, tổng $\\neq 180^\\circ$ trừ khi là hình vuông.

</details>

### 📝 Tóm tắt mục 5

- Tứ giác nội tiếp = 4 đỉnh cùng nằm trên 1 đường tròn.
- Định lý: tổng 2 góc **đối diện** $= 180^\\circ$ (góc kề thì không).
- Chứng minh dựa trên góc nội tiếp $= \\frac{1}{2}$ cung; 2 cung đối ghép thành cả vòng.
- Dùng để chứng minh 4 điểm đồng viên (cùng nằm trên 1 đường tròn).

---

## 6. Đường tròn nội/ngoại tiếp tam giác

💡 **Trực giác / Hình dung**: đường tròn **ngoại tiếp** giống "vòng đai ôm ngoài" đi qua 3 đỉnh — như sợi dây căng quanh 3 cái cọc. Đường tròn **nội tiếp** giống "viên bi lớn nhất nhét vừa bên trong" tam giác, chạm cả 3 cạnh. Tâm ngoại tiếp cách đều 3 **đỉnh**; tâm nội tiếp cách đều 3 **cạnh**.

### Đường tròn ngoại tiếp

- Đường tròn đi qua **3 đỉnh** tam giác.
- Tâm = giao điểm **3 đường trung trực** của 3 cạnh.

### Đường tròn nội tiếp

- Đường tròn tiếp xúc với **3 cạnh** tam giác (bên trong).
- Tâm = giao điểm **3 đường phân giác** trong.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tâm ngoại tiếp là giao 3 đường trung trực?"* Điểm trên trung trực của cạnh thì cách đều 2 đầu cạnh đó. Giao của 3 trung trực cách đều cả 3 đỉnh → là tâm đường tròn đi qua 3 đỉnh.
- *"Vì sao tâm nội tiếp là giao 3 phân giác?"* Điểm trên phân giác 1 góc thì cách đều 2 cạnh của góc đó. Giao 3 phân giác cách đều cả 3 cạnh → tâm đường tròn tiếp 3 cạnh.
- *"Tâm ngoại tiếp luôn nằm trong tam giác?"* Không — với tam giác **tù**, tâm ngoại tiếp nằm **ngoài** tam giác. Tam giác vuông: tâm ngoại tiếp là trung điểm cạnh huyền. Tâm nội tiếp thì **luôn** trong tam giác.

⚠ **Lỗi thường gặp**: lẫn "trung trực" (đường tròn ngoại tiếp) với "phân giác" (nội tiếp). Mẹo: ngoạ**i** tiếp ↔ trung trực (đỉnh ở ngoài viền); nộ**i** tiếp ↔ phân giác (chạm cạnh bên trong). Lỗi thứ 2: tưởng $R_\\text{ngoại} = R_\\text{nội}$ — với tam giác đều $R_\\text{ngoại} = 2\\cdot R_\\text{nội}$.

🔁 **Dừng lại tự kiểm tra**

1. Tâm đường tròn ngoại tiếp tam giác **vuông** nằm ở đâu?
2. Tam giác đều có quan hệ gì giữa R ngoại tiếp và r nội tiếp?

<details><summary>Đáp án</summary>

1. Trung điểm cạnh huyền (vì cạnh huyền là đường kính — góc vuông chắn đường kính).
2. $R = 2r$ (bán kính ngoại tiếp gấp đôi nội tiếp).

</details>

### 📝 Tóm tắt mục 6

- **Ngoại tiếp**: đi qua 3 đỉnh; tâm = giao 3 đường **trung trực**; cách đều 3 đỉnh.
- **Nội tiếp**: tiếp xúc 3 cạnh; tâm = giao 3 đường **phân giác**; cách đều 3 cạnh.
- Tâm nội tiếp luôn trong tam giác; tâm ngoại tiếp có thể ra ngoài (tam giác tù).
- Tam giác vuông: tâm ngoại tiếp = trung điểm cạnh huyền. Tam giác đều: $R = 2r$.

---

## 7. Góc tạo bởi tiếp tuyến – dây & Phương tích

### 7.1. Góc tạo bởi tiếp tuyến và dây cung (Tangent–chord angle)

💡 **Trực giác / Hình dung**: tưởng tượng góc nội tiếp ABC, rồi cho điểm B **trượt dần** về phía A cho tới khi cạnh BA "dẹt" thành **tiếp tuyến** tại A. Lúc đó góc nội tiếp biến thành góc giữa **tiếp tuyến** và **dây** AC. Vì là "trường hợp giới hạn" của góc nội tiếp, nó cũng bằng **một nửa** cung bị chắn.

\`\`\`
        tiếp tuyến t
   ───────●───────────
          │A╲
          │  ╲  dây AC
        R │   ╲
          │ θ  ● C
          • O
   Góc θ giữa tiếp tuyến t và dây AC
   = ½ · (số đo cung AC nằm "bên trong" góc)
\`\`\`

**Định lý**: góc tạo bởi tiếp tuyến và dây cung tại tiếp điểm = **$\\frac12$ số đo cung bị chắn** (cung nằm bên trong góc) = bằng **góc nội tiếp** chắn cung đó ở phía đối diện.

**4 ví dụ số**:

| Cung AC bị chắn (số đo) | Góc tiếp tuyến–dây $\\theta = \\frac12$ cung |
|--------------------------|---------------------------------------------|
| $60^\\circ$ | $30^\\circ$ |
| $100^\\circ$ | $50^\\circ$ |
| $180^\\circ$ (dây qua tâm) | $90^\\circ$ → tiếp tuyến ⊥ đường kính tại đầu mút |
| $140^\\circ$ | $70^\\circ$ |

Dòng $180^\\circ$ tái khẳng định mục 3: tiếp tuyến vuông góc với bán kính (ở đây dây trùng đường kính).

⚠ **Lỗi thường gặp**: lấy góc tiếp tuyến–dây = cả cung (quên chia 2), giống lỗi ở góc nội tiếp. Cung $80^\\circ$ → góc $= 40^\\circ$, không phải $80^\\circ$.

### 7.2. Phương tích của một điểm (Power of a point)

💡 **Trực giác / Hình dung**: từ một điểm P cố định kẻ nhiều đường thẳng cắt đường tròn. Mỗi đường cắt tại 2 điểm, tạo 2 đoạn. **Điều kỳ diệu**: **tích 2 đoạn đó luôn bằng nhau** cho mọi đường kẻ từ P — một con số đặc trưng riêng cho P gọi là **phương tích**.

**Trường hợp P ngoài đường tròn — hai cát tuyến**:

\`\`\`
        ╭──────────╮
   P •──┼──● A      │      Cát tuyến 1 cắt tại A, B
       ╲ │   ╲      │      Cát tuyến 2 cắt tại C, D
        ╲│    ● B   │
   C ●───┼──● D ────╯
   PA·PB = PC·PD  (phương tích)
\`\`\`

**Định lý (hai cát tuyến)**: $PA\\cdot PB = PC\\cdot PD$.

**Trường hợp tiếp tuyến–cát tuyến**: nếu PT là tiếp tuyến (T tiếp điểm) và PAB là cát tuyến thì

$$PT^2 = PA\\cdot PB.$$

\`\`\`
        T ● (tiếp điểm)
         ╱ ╲
   P •──    ● A   ╭───╮
         ╲   ╲    │ O │
          ╲   ● B ╰───╯
   PT² = PA·PB
\`\`\`

**4 ví dụ số**:

**Ví dụ 1** (2 cát tuyến). Từ P: $PA = 3$, $PB = 8$; cát tuyến kia $PC = 4$. Tìm $PD$.
$$PA\\cdot PB = PC\\cdot PD \\Rightarrow 3\\cdot 8 = 4\\cdot PD \\Rightarrow PD = 24/4 = \\mathbf{6}.$$

**Ví dụ 2** (tiếp tuyến–cát tuyến). $PA = 2$, $PB = 8$. Tìm tiếp tuyến $PT$.
$$PT^2 = PA\\cdot PB = 2\\cdot 8 = 16 \\Rightarrow PT = \\mathbf{4}.$$

**Ví dụ 3** (P ngoài, dùng tâm & bán kính). P cách tâm O khoảng $d = 13$, $R = 5$. Phương tích $= d^2 - R^2 = 169 - 25 = 144$ → tiếp tuyến $PT = \\sqrt{144} = \\mathbf{12}$ (chính là cạnh tam giác vuông $OTP$: $\\sqrt{13^2 - 5^2}$).

**Ví dụ 4** (hai dây cắt nhau trong đường tròn). Hai dây AB, CD cắt nhau tại điểm P **bên trong**: $PA\\cdot PB = PC\\cdot PD$. Nếu $PA = 6, PB = 4, PC = 8$ thì $PD = (6\\cdot 4)/8 = \\mathbf{3}$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tích luôn bằng nhau?"* Vì các tam giác tạo bởi 2 cát tuyến **đồng dạng** (chung góc tại P, và 2 góc nội tiếp cùng chắn 1 cung bằng nhau — mục 4). Tỉ lệ cạnh đồng dạng dẫn thẳng tới $PA\\cdot PB = PC\\cdot PD$.
- *"Phương tích âm hay dương?"* Với P **ngoài**: $d^2 - R^2 > 0$ (dương). P **trên** đường tròn: $= 0$. P **trong**: $< 0$ (khi đó dùng giá trị tuyệt đối cho tích 2 đoạn dây).

🔁 **Dừng lại tự kiểm tra**

1. Từ P kẻ tiếp tuyến $PT = 6$ và cát tuyến cắt tại A, B với $PA = 4$. Tìm $PB$.
2. P cách tâm $d = 10$, $R = 6$. Độ dài tiếp tuyến từ P?

<details><summary>Đáp án</summary>

1. $PT^2 = PA\\cdot PB \\Rightarrow 36 = 4\\cdot PB \\Rightarrow PB = $ **9**.
2. $PT = \\sqrt{d^2 - R^2} = \\sqrt{100 - 36} = \\sqrt{64} = $ **8**.

</details>

### 📝 Tóm tắt mục 7

- **Góc tiếp tuyến–dây** = $\\frac12$ cung bị chắn = góc nội tiếp chắn cung đó (trường hợp giới hạn của góc nội tiếp).
- **Phương tích** của P: mọi cát tuyến qua P cho cùng tích $PA\\cdot PB$; với tiếp tuyến $PT^2 = PA\\cdot PB$.
- Theo tâm: phương tích $= d^2 - R^2$ ($d$ = khoảng cách P→tâm); tiếp tuyến $PT = \\sqrt{d^2 - R^2}$.

---

## 8. Phương trình đường tròn (Circle equation)

💡 **Trực giác / Hình dung**: đường tròn là "tập điểm cách tâm đúng R" (mục 1). Viết điều kiện đó bằng tọa độ: điểm $(x, y)$ cách tâm $(a, b)$ đúng R nghĩa là **khoảng cách** $\\sqrt{(x-a)^2 + (y-b)^2} = R$. Bình phương 2 vế cho phương trình gọn — đây chỉ là **định lý Pythagore** áp cho đoạn nối tâm tới điểm.

\`\`\`
         y
         │        ● (x, y) trên đường tròn
         │       ╱│
         │   R ╱  │ (y − b)
         │   ╱    │
   (a,b) ●──────── (x − a)
         │  tâm
   ──────┼──────────────── x
   (x−a)² + (y−b)² = R²   ← Pythagore cho tam giác vuông
\`\`\`

**Phương trình chính tắc**:

$$(x - a)^2 + (y - b)^2 = R^2$$

với tâm $I(a, b)$ và bán kính $R$. Trường hợp tâm ở gốc $O(0,0)$: $x^2 + y^2 = R^2$.

**Dạng khai triển (tổng quát)**: $x^2 + y^2 + Dx + Ey + F = 0$, với tâm $I\\left(-\\frac{D}{2}, -\\frac{E}{2}\\right)$ và $R = \\sqrt{\\frac{D^2 + E^2}{4} - F}$ (cần $\\frac{D^2+E^2}{4} - F > 0$ thì mới là đường tròn thật).

**4 ví dụ số**:

**Ví dụ 1** (lập phương trình từ tâm & R). Tâm $I(2, -3)$, $R = 4$:
$$(x - 2)^2 + (y - (-3))^2 = 4^2 \\Rightarrow (x-2)^2 + (y+3)^2 = 16.$$

**Ví dụ 2** (đọc tâm & R từ phương trình chính tắc). Cho $(x+1)^2 + (y-5)^2 = 9$.
- Khớp $(x - a)^2$ với $(x + 1)^2 = (x - (-1))^2$ → $a = -1$.
- Khớp $(y - b)^2$ với $(y - 5)^2$ → $b = 5$.
- $R^2 = 9 \\Rightarrow R = 3$. → Tâm $I(-1, 5)$, bán kính $3$.

**Ví dụ 3** (đưa dạng khai triển về chính tắc — "hoàn thành bình phương"). Cho $x^2 + y^2 - 6x + 4y - 12 = 0$.
$$\\begin{aligned}
(x^2 - 6x) + (y^2 + 4y) &= 12 \\\\
(x^2 - 6x + 9) + (y^2 + 4y + 4) &= 12 + 9 + 4 \\quad(\\text{thêm } 9,\\,4 \\text{ vào 2 vế}) \\\\
(x - 3)^2 + (y + 2)^2 &= 25
\\end{aligned}$$
→ Tâm $I(3, -2)$, $R = \\sqrt{25} = 5$. (Cách thêm số: lấy nửa hệ số x là $-6/2 = -3$, bình phương $9$; nửa hệ số y là $4/2 = 2$, bình phương $4$.)

**Ví dụ 4** (lập phương trình đường tròn đường kính AB). $A(1, 2)$, $B(5, 8)$. Tâm = trung điểm $I\\left(\\frac{1+5}{2}, \\frac{2+8}{2}\\right) = (3, 5)$. Bán kính = nửa đường kính $= \\frac12 AB = \\frac12\\sqrt{(5-1)^2 + (8-2)^2} = \\frac12\\sqrt{16+36} = \\frac12\\sqrt{52} = \\sqrt{13}$.
$$\\Rightarrow (x-3)^2 + (y-5)^2 = 13.$$

**Ví dụ 5** (kiểm tra điểm thuộc đường tròn). Đường tròn $(x-3)^2 + (y+2)^2 = 25$ (tâm $I(3,-2)$, $R=5$). Điểm $(7, 1)$: thay vào vế trái $(7-3)^2 + (1+2)^2 = 16 + 9 = 25 = R^2$ → **trên** đường tròn. Điểm $(3, 1)$: $(0)^2 + (3)^2 = 9 < 25$ → **trong**. Điểm $(10, 0)$: $49 + 4 = 53 > 25$ → **ngoài**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao dấu trong ngoặc ngược dấu với tọa độ tâm?"* Vì là $(x - a)$: tâm $a = -1$ cho $(x - (-1)) = (x + 1)$. Đọc ngược: thấy $(x + 1)^2$ → $a = -1$ (đổi dấu số trong ngoặc).
- *"Phương trình khai triển nào cũng là đường tròn?"* Không. $x^2 + y^2 + Dx + Ey + F = 0$ chỉ là đường tròn khi $\\frac{D^2+E^2}{4} - F > 0$. Nếu $= 0$ → 1 điểm; nếu $< 0$ → tập rỗng (không có đường tròn thật).
- *"Hệ số $x^2$ và $y^2$ phải bằng nhau?"* Đúng — và bằng $1$ (hoặc chia về 1). Nếu hệ số khác nhau → là ellipse, không phải đường tròn.

⚠ **Lỗi thường gặp**:
1. Quên bình phương R: viết $(x-a)^2 + (y-b)^2 = R$ thay vì $= R^2$. Tâm $I(0,0)$, $R = 5$ phải là $x^2 + y^2 = 25$, **không** $= 5$.
2. Sai dấu tâm: thấy $(x + 3)^2$ lại ghi tâm $a = 3$. Đúng là $a = -3$.
3. Hoàn thành bình phương chỉ thêm vào 1 vế. Phải thêm số vào **cả hai vế** để giữ đẳng thức (xem Ví dụ 3).

🔁 **Dừng lại tự kiểm tra**

1. Tìm tâm & bán kính của $(x - 4)^2 + (y + 1)^2 = 49$.
2. Đưa $x^2 + y^2 + 2x - 8y + 8 = 0$ về dạng chính tắc.

<details><summary>Đáp án</summary>

1. Tâm $I(4, -1)$, $R = \\sqrt{49} = $ **7**.
2. $(x^2 + 2x + 1) + (y^2 - 8y + 16) = -8 + 1 + 16 = 9 \\Rightarrow (x+1)^2 + (y-4)^2 = 9$ → tâm $I(-1, 4)$, $R = $ **3**.

</details>

### 📝 Tóm tắt mục 8

- **Chính tắc**: $(x-a)^2 + (y-b)^2 = R^2$, tâm $I(a,b)$, bán kính $R$. Số trong ngoặc **đổi dấu** ra tọa độ tâm; vế phải là $R^2$ (không phải R).
- **Khai triển**: $x^2 + y^2 + Dx + Ey + F = 0$ → tâm $\\left(-\\frac D2, -\\frac E2\\right)$, $R = \\sqrt{\\frac{D^2+E^2}{4} - F}$ (chỉ là đường tròn khi biểu thức dưới căn $> 0$).
- Chuyển khai triển → chính tắc bằng **hoàn thành bình phương** (thêm vào cả 2 vế).

---

## 9. Bài tập

### Bài tập

**Bài 1**: Đường tròn $R = 5$ cm. Tính chu vi và diện tích.

**Bài 2**: Cung AB dài $4\\pi$ trên đường tròn $R = 6$. Tính góc ở tâm (radian và độ).

**Bài 3**: Cho tam giác ABC với BC là đường kính đường tròn ngoại tiếp. Chứng minh góc $A = 90^\\circ$.

**Bài 4**: Tứ giác ABCD nội tiếp đường tròn. $A = 70^\\circ$, $C = ?$

**Bài 5**: Tam giác đều cạnh 6. Tính bán kính đường tròn ngoại tiếp và nội tiếp.

**Bài 6**: Đường tròn $R = 9$, hình quạt có góc ở tâm $80^\\circ$. Tính độ dài cung và diện tích hình quạt.

**Bài 7**: Tìm tâm và bán kính của đường tròn $x^2 + y^2 - 4x + 6y - 3 = 0$.

**Bài 8**: Lập phương trình đường tròn có tâm $I(-2, 5)$ và đi qua điểm $A(1, 1)$.

**Bài 9**: Từ điểm P ngoài đường tròn, tiếp tuyến $PT = 8$ và một cát tuyến cắt đường tròn tại A, B với $PA = 4$. Tính $PB$.

**Bài 10**: AB là đường kính, $A(2, 3)$, $B(8, 11)$. Lập phương trình đường tròn và tìm góc $\\widehat{ACB}$ với C bất kỳ trên đường tròn.

### Lời giải

**Bài 1**: $C = 2\\pi\\cdot 5 =$ **$10\\pi \\approx 31.42$ cm**. $S = \\pi\\cdot 25 =$ **$25\\pi \\approx 78.54$ cm²**.

**Bài 2**: Độ dài cung $= R\\cdot\\theta$ (rad) → $\\theta = 4\\pi/6 =$ **$2\\pi/3$ rad** $= 120^\\circ$.

**Bài 3**: BC là đường kính → góc nội tiếp BAC chắn nửa đường tròn → $BAC = 90^\\circ$ (theo định lý nội tiếp + cung nửa $= 180^\\circ$). Đây là **định lý Thales đảo**.

**Bài 4**: Tứ giác nội tiếp: $A + C = 180^\\circ$ → $C =$ **$110^\\circ$**.

**Bài 5**: Tam giác đều cạnh a. 
- $R_\\text{ngoại tiếp} = a/\\sqrt{3} = 6/\\sqrt{3} = 2\\sqrt{3} \\approx$ **3.46**.
- $r_\\text{nội tiếp} = a/(2\\sqrt{3}) = 6/(2\\sqrt{3}) = \\sqrt{3} \\approx$ **1.73** ($R = 2r$ cho tam giác đều).

**Bài 6**: Dùng công thức theo độ.
- Cung: $\\ell = \\frac{80}{360}\\cdot 2\\pi\\cdot 9 = \\frac{2}{9}\\cdot 18\\pi = 4\\pi \\approx$ **12.57**.
- Quạt: $S = \\frac{80}{360}\\cdot \\pi\\cdot 9^2 = \\frac29\\cdot 81\\pi = 18\\pi \\approx$ **56.55**.

**Bài 7**: Hoàn thành bình phương.
$$\\begin{aligned}
(x^2 - 4x) + (y^2 + 6y) &= 3 \\\\
(x^2 - 4x + 4) + (y^2 + 6y + 9) &= 3 + 4 + 9 = 16 \\\\
(x - 2)^2 + (y + 3)^2 &= 16
\\end{aligned}$$
→ Tâm $I(2, -3)$, $R = \\sqrt{16} =$ **4**.

**Bài 8**: Bán kính $= IA = \\sqrt{(1-(-2))^2 + (1-5)^2} = \\sqrt{3^2 + (-4)^2} = \\sqrt{9+16} = 5$. Phương trình: **$(x+2)^2 + (y-5)^2 = 25$**.

**Bài 9**: Hệ thức tiếp tuyến–cát tuyến $PT^2 = PA\\cdot PB$ → $8^2 = 4\\cdot PB \\Rightarrow 64 = 4\\cdot PB \\Rightarrow PB =$ **16**.

**Bài 10**:
- Tâm = trung điểm AB: $I\\left(\\frac{2+8}{2}, \\frac{3+11}{2}\\right) = (5, 7)$.
- Bán kính $= \\frac12 AB = \\frac12\\sqrt{(8-2)^2 + (11-3)^2} = \\frac12\\sqrt{36 + 64} = \\frac12\\sqrt{100} = 5$.
- Phương trình: **$(x-5)^2 + (y-7)^2 = 25$**.
- Vì AB là đường kính, mọi C trên đường tròn cho góc nội tiếp chắn đường kính → $\\widehat{ACB} =$ **$90^\\circ$** (định lý Thales).

---

## 10. Bài tiếp theo

[Lesson 04 — Đa giác & Diện tích](../lesson-04-polygons-area/).

## 📝 Tổng kết

1. **Đường tròn**: tập điểm cách tâm 1 khoảng R.
2. **$C = 2\\pi R$, $S = \\pi R^2$**. **Cung** $\\ell = R\\theta$ (rad), **quạt** $S = \\frac12 R^2\\theta$ (rad); theo độ nhân tỉ lệ $\\theta/360^\\circ$.
3. **Tiếp tuyến** $\\perp$ bán kính tại điểm tiếp xúc; từ 1 điểm ngoài kẻ 2 tiếp tuyến bằng nhau.
4. **Góc nội tiếp $= \\frac{1}{2}$ góc ở tâm** cùng chắn cung. Chắn đường kính → $90^\\circ$. **Góc tiếp tuyến–dây** $= \\frac12$ cung bị chắn.
5. **Tứ giác nội tiếp**: 2 góc đối bù nhau.
6. **Ngoại tiếp** = đi qua 3 đỉnh (giao 3 trung trực); **nội tiếp** = tiếp 3 cạnh (giao 3 phân giác).
7. **Phương tích** của P: $PA\\cdot PB$ không đổi; tiếp tuyến $PT^2 = PA\\cdot PB = d^2 - R^2$.
8. **Phương trình đường tròn**: $(x-a)^2 + (y-b)^2 = R^2$ (tâm $I(a,b)$); dạng khai triển dùng hoàn thành bình phương để tìm tâm/R.
`;
