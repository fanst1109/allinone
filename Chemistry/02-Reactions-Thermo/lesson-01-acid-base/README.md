# Lesson 01 (Tier 2) — Acid-Base (Axit-Bazơ)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu 3 định nghĩa acid-base: **Arrhenius** (cho $\text{H}^+$/$\text{OH}^-$), **Brønsted-Lowry** (cho/nhận $\text{H}^+$), **Lewis** (cho/nhận cặp electron) — và biết khi nào dùng định nghĩa nào.
- Nắm khái niệm **cặp acid-base liên hợp** (conjugate acid-base pair).
- Tính được **pH** từ nồng độ $\text{H}^+$ (và ngược lại), và phân biệt **acid mạnh/yếu**, **base mạnh/yếu** qua **$K_a$, $K_b$**.
- Hiểu **tích ion của nước** $K_w = 10^{-14}$ và mối liên hệ $\text{pH} + \text{pOH} = 14$.
- Phân tích **dung dịch đệm (buffer)**: cơ chế chống thay đổi pH, công thức Henderson-Hasselbalch.
- Đọc được **đường chuẩn độ (titration curve)** acid-base và xác định điểm tương đương.

## Kiến thức tiền đề

- [Lesson 07 (T1) — Dung dịch & Nồng độ](../../01-Structure/lesson-07-solutions-concentration/) — biết M, pha loãng.
- [Lesson 08 (T1) — Động học & Cân bằng](../../01-Structure/lesson-08-kinetics-equilibrium/) — biết K cân bằng.

---

## 1. Định nghĩa acid-base

### 1.1. Định nghĩa Arrhenius (1884)

- **Acid**: chất khi hòa tan trong nước tạo ra **$\text{H}^+$** (proton).
- **Base**: chất khi hòa tan trong nước tạo ra **$\text{OH}^-$** (hydroxide).

Ví dụ:
- Acid: $\text{HCl} \rightarrow \text{H}^+ + \text{Cl}^-$; $\text{H}_2\text{SO}_4 \rightarrow \text{2H}^+ + \text{SO}_4^{2-}$
- Base: $\text{NaOH} \rightarrow \text{Na}^+ + \text{OH}^-$; $\text{Ca(OH)}_2 \rightarrow \text{Ca}^{2+} + \text{2OH}^-$

**Hạn chế**: chỉ áp dụng trong **nước**. Ammonia $\text{NH}_3$ tạo $\text{OH}^-$ trong nước nhưng không có $\text{OH}^-$ trong cấu trúc → Arrhenius không đẹp.

### 1.2. Định nghĩa Brønsted-Lowry (1923) — chuẩn nhất

- **Acid (theo Brønsted)**: chất **cho proton ($\text{H}^+$)**.
- **Base (theo Brønsted)**: chất **nhận proton ($\text{H}^+$)**.

💡 **Tại sao gọi $\text{H}^+$ là "proton"?** Nguyên tử hydrogen $^1\text{H}$ có cấu trúc đơn giản nhất bảng tuần hoàn: **1 proton + 1 electron**, KHÔNG có neutron. Khi mất 1 electron, chỉ còn lại **đúng 1 proton trần** — chính là ion $\text{H}^+$. Vì vậy trong hóa học "proton" và "$\text{H}^+$" là **cùng một thứ**, dùng thay thế được. (Trong vật lý hạt nhân thì "proton" là hạt cơ bản; trong hóa học, "proton" = $\text{H}^+$ ion.)

Mở rộng so với Arrhenius: Brønsted hoạt động trong **mọi dung môi** (không chỉ nước). Ví dụ với ammonia:

$$\underset{\text{(base)}}{\text{NH}_3} + \underset{\text{(acid)}}{\text{H}_2\text{O}} \rightarrow \text{NH}_4^+ + \text{OH}^-$$

Ở đây, $\text{H}_2\text{O}$ cho proton cho $\text{NH}_3$ → $\text{H}_2\text{O}$ là acid, $\text{NH}_3$ là base.

Trong phản ứng khác:

$$\underset{\text{(acid)}}{\text{HCl}} + \underset{\text{(base)}}{\text{H}_2\text{O}} \rightarrow \text{H}_3\text{O}^+ + \text{Cl}^-$$

$\text{H}_2\text{O}$ nhận proton → $\text{H}_2\text{O}$ là base.

**Quan sát**: $\text{H}_2\text{O}$ có thể vừa là acid vừa là base, tùy đối tác. Gọi là **amphoteric (lưỡng tính)**.

### 1.3. Định nghĩa Lewis (1923) — tổng quát nhất

- **Acid Lewis**: chất **nhận cặp electron** (vì thiếu e ở orbital ngoài, "muốn lấy" thêm).
- **Base Lewis**: chất **cho cặp electron** (có cặp e tự do "sẵn sàng cho").

💡 **Vì sao đây vẫn là "acid-base" dù không có $\text{H}^+$?** Lewis nhận ra: bản chất sâu nhất của phản ứng acid-base là **chia sẻ một cặp electron để tạo liên kết** — $\text{H}^+$ chỉ là MỘT trong nhiều dạng "chất nhận cặp e". Khi $\text{H}^+$ "nhận" cặp e từ base (vd $\text{H}^+ + \text{NH}_3 \rightarrow \text{NH}_4^+$), đó cũng chính là chuyển cặp e — không khác bản chất Lewis. Lewis chỉ "tổng quát hóa" định nghĩa: không cần phải có $\text{H}^+$ vẫn tính.

Ví dụ phản ứng acid-base Lewis **KHÔNG có $\text{H}^+$**:

$$\underset{\text{(Lewis acid)}}{\text{BF}_3} + \underset{\text{(Lewis base)}}{\text{NH}_3} \rightarrow \underset{\text{adduct}}{\text{F}_3\text{B}{-}\text{NH}_3}$$

- $\text{BF}_3$: B chỉ có 6 e ngoài (thiếu 2 e cho đủ octet) → **Lewis acid** (nhận).
- $\text{NH}_3$: N có 1 cặp e tự do (lone pair) → **Lewis base** (cho).
- Phản ứng: $\text{NH}_3$ "đẩy" cặp e tự do về phía B → tạo liên kết phối trí N→B → 2 chất ghép thành 1.

**Hệ thống nào lớn hơn?**
- Mọi **acid Brønsted ⊂ acid Lewis** (vì $\text{H}^+$ luôn là chất nhận cặp e).
- Mọi **base Brønsted ⊂ base Lewis** (vì base Brønsted dùng cặp e tự do để nhận $\text{H}^+$).
- Nhưng acid/base Lewis còn rộng hơn ($\text{BF}_3$, $\text{AlCl}_3$, các cation kim loại $\text{Cu}^{2+}$, $\text{Fe}^{3+}$ — đều là Lewis acid).

→ **Lewis ⊃ Brønsted ⊃ Arrhenius**. Lewis dùng khi nào? Khi gặp phản ứng không có $\text{H}^+$ chuyển dịch — đặc biệt là phức kim loại, xúc tác hữu cơ.

### 1.4. Cặp acid-base liên hợp

Trong phản ứng Brønsted: acid cho $\text{H}^+$ → trở thành **base liên hợp** (conjugate base). Base nhận $\text{H}^+$ → thành **acid liên hợp** (conjugate acid).

$$\text{HCl} + \text{H}_2\text{O} \rightleftharpoons \text{H}_3\text{O}^+ + \text{Cl}^-$$

Trong đó: $\text{HCl}$ (acid) — $\text{H}_2\text{O}$ (base) — $\text{H}_3\text{O}^+$ (acid liên hợp của $\text{H}_2\text{O}$) — $\text{Cl}^-$ (base liên hợp của $\text{HCl}$).

Cặp liên hợp khác nhau bởi **chính xác 1 proton**:
- $\text{HCl}$ / $\text{Cl}^-$
- $\text{H}_2\text{O}$ / $\text{H}_3\text{O}^+$
- $\text{H}_2\text{O}$ / $\text{OH}^-$
- $\text{NH}_3$ / $\text{NH}_4^+$

### 📝 Tóm tắt mục 1

- 3 định nghĩa: Arrhenius ($\text{H}^+$/$\text{OH}^-$ trong nước) → Brønsted (cho/nhận $\text{H}^+$) → Lewis (cho/nhận cặp e).
- Cặp liên hợp khác nhau 1 $\text{H}^+$.
- $\text{H}_2\text{O}$ lưỡng tính.

---

## 2. pH và tích ion của nước

### 2.1. Tích ion Kw

Nước tự ion hóa rất ít:

$$\text{2H}_2\text{O} \rightleftharpoons \text{H}_3\text{O}^+ + \text{OH}^-$$

Hằng số cân bằng (tại 25°C): **$K_w = [\text{H}^+][\text{OH}^-] = 10^{-14}$**.

Trong nước tinh khiết: $[\text{H}^+] = [\text{OH}^-] = \sqrt{10^{-14}} = \mathbf{10^{-7}}$ **M**.

→ pH của nước tinh khiết = 7 (trung tính).

### 2.2. Định nghĩa pH

**pH** = viết tắt của "**p**ower of **H**ydrogen" — một con số gọn nhẹ để biểu diễn **nồng độ ion $\text{H}^+$**. Định nghĩa:

$$\text{pH} = -\log_{10}[\text{H}^+]$$

trong đó $[\text{H}^+]$ là nồng độ ion $\text{H}^+$ tính bằng mol/L (M).

**Vì sao phải dùng log?** Vì $[\text{H}^+]$ có thể trải dài qua **14 bậc 10** (từ $\approx 1$ M đến $\approx 10^{-14}$ M):
- Acid dạ dày: $[\text{H}^+] \approx 0{,}01 = \mathbf{10^{-2}}$ M.
- Nước tinh khiết: $[\text{H}^+] = \mathbf{10^{-7}}$ M.
- Nước rửa chén: $[\text{H}^+] \approx \mathbf{10^{-11}}$ M.

Viết thẳng `[H⁺] = 0.00000001 M` thì rất bất tiện. Lấy $-\log_{10}$ biến nó thành mũ âm dễ đọc: $10^{-2}$ → pH = 2; $10^{-7}$ → pH = 7; $10^{-11}$ → pH = 11.

**Ký hiệu "p" = "$-\log_{10}$"** (quy ước chung trong hóa học). Tương tự:
- $\text{pOH} = -\log[\text{OH}^-]$
- $\text{p}K_a = -\log K_a$
- $\text{p}K_w = -\log K_w = -\log(10^{-14}) = \mathbf{14}$

**Vì sao thang đo từ 0 đến 14?** Vì trong nước luôn có $[\text{H}^+] \times [\text{OH}^-] = K_w = 10^{-14}$. Lấy $-\log$ cả 2 vế: **$\text{pH} + \text{pOH} = 14$**. Hai đầu mút:
- $[\text{H}^+] = 1$ M (acid đậm đặc nhất hợp lý) → pH = 0.
- $[\text{OH}^-] = 1$ M (base đậm đặc) → $[\text{H}^+] = 10^{-14}$ → pH = 14.
- Trung tính: pH = pOH = 7.

⚠ **Quan trọng — mỗi đơn vị pH = chênh 10 lần nồng độ $\text{H}^+$**:
- pH 2 (chanh) so với pH 5 (cafe): chênh **1000 lần** $[\text{H}^+]$ (acid chanh mạnh gấp 1000 lần cafe).
- pH 4 (rượu vang) so với pH 7 (nước): chênh **1000 lần** $[\text{H}^+]$.
- Đó là lý do thang pH "trông gọn" nhưng thực ra mỗi bước là 1 nhảy lớn.

### 2.3. Thang pH

| pH | Mô tả | Ví dụ |
|----|-------|-------|
| 0 - 3 | Acid mạnh | Acid dạ dày (pH ~ 2), nước chanh (pH ~ 2.5) |
| 4 - 6 | Acid yếu | Cafe (pH ~ 5), nước mưa (pH ~ 5.6) |
| 7 | Trung tính | Nước tinh khiết |
| 8 - 10 | Base yếu | Nước biển (pH ~ 8.1), máu (pH ~ 7.4) |
| 11 - 14 | Base mạnh | Nước rửa chén (pH ~ 11), nước vôi (pH ~ 13) |

**Lưu ý**: thang pH là log → mỗi đơn vị pH = 10 lần chênh $[\text{H}^+]$. pH 2 ($[\text{H}^+] = 0{,}01$) **mạnh gấp 1000 lần** pH 5 ($[\text{H}^+] = 10^{-5}$).

### 2.4. Bốn ví dụ tính pH

**Ví dụ 1**: Dung dịch HCl 0.01 M (acid mạnh, phân ly hoàn toàn).
- $[\text{H}^+] = 0{,}01 = 10^{-2}$ M.
- $\text{pH} = -\log(10^{-2}) = \mathbf{2}$.

**Ví dụ 2**: Dung dịch NaOH 0.001 M (base mạnh, phân ly hoàn toàn).
- $[\text{OH}^-] = 10^{-3}$ M. $\text{pOH} = 3$. $\text{pH} = 14 - 3 = \mathbf{11}$.
- Hoặc $[\text{H}^+] = \dfrac{K_w}{[\text{OH}^-]} = \dfrac{10^{-14}}{10^{-3}} = 10^{-11}$ M → pH = 11 ✓.

**Ví dụ 3**: Pha loãng HCl từ 1 M xuống 0.001 M (gấp 1000 lần). pH thay đổi?
- pH ban đầu = 0. pH sau = 3. Tăng 3 đơn vị, tương đương pha loãng $10^3 = 1000$ lần.

**Ví dụ 4**: Dung dịch có pH = 4.5. $[\text{H}^+]$ = ?
- $[\text{H}^+] = 10^{-4{,}5} \approx \mathbf{3{,}16 \times 10^{-5}}$ **M**.

### 📝 Tóm tắt mục 2

- $K_w = [\text{H}^+][\text{OH}^-] = 10^{-14}$ ở 25°C.
- $\text{pH} = -\log[\text{H}^+]$, $\text{pH} + \text{pOH} = 14$.
- Mỗi đơn vị pH = 10 lần chênh $[\text{H}^+]$.
- Thang: 0 acid mạnh, 7 trung tính, 14 base mạnh.

---

## 3. Acid yếu, Base yếu — Ka, Kb

### 3.1. Acid mạnh vs Acid yếu

**Acid mạnh** ($\text{HCl}$, $\text{HNO}_3$, $\text{H}_2\text{SO}_4$, $\text{HClO}_4$, $\text{HBr}$, $\text{HI}$): phân ly **hoàn toàn** trong nước.

$$\text{HCl} \rightarrow \text{H}^+ + \text{Cl}^- \quad (\text{mũi tên một chiều, } [\text{HCl}] \text{ còn lại} = 0)$$

**Acid yếu** ($\text{CH}_3\text{COOH}$, $\text{HF}$, $\text{H}_2\text{CO}_3$, $\text{NH}_4^+$, ...): phân ly **một phần**, có cân bằng.

$$\text{CH}_3\text{COOH} \rightleftharpoons \text{H}^+ + \text{CH}_3\text{COO}^- \quad (\text{cân bằng, hầu hết vẫn ở dạng } \text{CH}_3\text{COOH})$$

Hằng số phân ly acid:

$$K_a = \dfrac{[\text{H}^+][\text{A}^-]}{[\text{HA}]}$$

**$K_a$ càng lớn → acid càng mạnh.** $K_a$ acid axetic $= 1{,}8 \times 10^{-5}$ → khá yếu. Acid mạnh có $K_a$ rất lớn ($\geq 1$).

**$\text{p}K_a = -\log K_a$**. $\text{p}K_a$ nhỏ → acid mạnh. $\text{p}K_a$ acid axetic $= 4{,}74$.

### 3.2. Tương tự cho base

$$K_b = \dfrac{[\text{BH}^+][\text{OH}^-]}{[\text{B}]} \qquad \text{p}K_b = -\log K_b$$

**Liên hệ**: với cặp acid-base liên hợp, **$K_a \times K_b = K_w = 10^{-14}$**. Tức là $\text{p}K_a + \text{p}K_b = 14$.

### 3.3. Bảng Ka các acid yếu thường gặp

| Acid | $K_a$ | $\text{p}K_a$ |
|------|------|------|
| $\text{HF}$ | $6{,}6 \times 10^{-4}$ | 3,18 |
| $\text{CH}_3\text{COOH}$ (axetic) | $1{,}8 \times 10^{-5}$ | 4,74 |
| $\text{H}_2\text{CO}_3$ (carbonic) | $4{,}3 \times 10^{-7}$ | 6,37 |
| $\text{H}_3\text{PO}_4$ (đầu tiên) | $7{,}5 \times 10^{-3}$ | 2,12 |
| $\text{NH}_4^+$ | $5{,}6 \times 10^{-10}$ | 9,25 |

### 3.4. Tính pH của acid yếu

Cho dung dịch $\text{CH}_3\text{COOH}$ 0.1 M, $K_a = 1{,}8 \times 10^{-5}$. Tính pH.

$$\begin{array}{lccc}
 & \text{CH}_3\text{COOH} & \text{H}^+ & \text{CH}_3\text{COO}^- \\
\text{Ban đầu:} & 0{,}1 & 0 & 0 \\
\text{Phân ly:} & -x & +x & +x \\
\text{Cân bằng:} & 0{,}1-x & x & x
\end{array}$$

$$K_a = \dfrac{x^2}{0{,}1 - x} = 1{,}8 \times 10^{-5}$$

Vì $x \ll 0{,}1$ (acid yếu phân ly ít), xấp xỉ $0{,}1 - x \approx 0{,}1$:

$$\begin{aligned}
\dfrac{x^2}{0{,}1} &= 1{,}8 \times 10^{-5} \\
x^2 &= 1{,}8 \times 10^{-6} \\
x &= 1{,}34 \times 10^{-3} \text{ M} = [\text{H}^+] \\
\text{pH} &= -\log(1{,}34 \times 10^{-3}) = 2{,}87
\end{aligned}$$

Kiểm tra xấp xỉ: $x = 0{,}00134 \ll 0{,}1$ ✓ (sai số < 2%).

### 📝 Tóm tắt mục 3

- Acid mạnh: phân ly hết. Acid yếu: cân bằng với $K_a$.
- $K_a$ càng lớn → acid càng mạnh. $\text{p}K_a = -\log K_a$.
- Tương tự cho base với $K_b$.
- Cặp liên hợp: $K_a \times K_b = K_w$.

---

## 4. Dung dịch đệm (Buffer)

### 4.1. Định nghĩa

**Dung dịch đệm (buffer)** = dung dịch chống lại thay đổi pH khi thêm acid hoặc base. Thường gồm **acid yếu + muối chứa base liên hợp** (hoặc base yếu + muối chứa acid liên hợp).

Ví dụ điển hình:
- Đệm acetate: $\text{CH}_3\text{COOH} + \text{CH}_3\text{COONa}$ (mol acid + mol base liên hợp).
- Đệm phosphate: $\text{H}_2\text{PO}_4^- / \text{HPO}_4^{2-}$ (trong tế bào).
- Đệm bicarbonate: $\text{H}_2\text{CO}_3 / \text{HCO}_3^-$ (trong máu, giữ pH 7.4).

### 4.2. Cơ chế

Khi thêm $\text{H}^+$ (acid) vào đệm: base liên hợp hấp thụ.

$$\text{CH}_3\text{COO}^- + \text{H}^+ \rightarrow \text{CH}_3\text{COOH}$$

Khi thêm $\text{OH}^-$ (base): acid yếu trung hòa.

$$\text{CH}_3\text{COOH} + \text{OH}^- \rightarrow \text{CH}_3\text{COO}^- + \text{H}_2\text{O}$$

→ $[\text{H}^+]$ gần như không đổi → pH ổn định.

### 4.3. Công thức Henderson-Hasselbalch

$$\text{pH} = \text{p}K_a + \log\dfrac{[\text{A}^-]}{[\text{HA}]}$$

trong đó $[\text{A}^-]$ là nồng độ base liên hợp, $[\text{HA}]$ là nồng độ acid yếu.

**Ví dụ**: Đệm $\text{CH}_3\text{COOH}$ 0.1 M + $\text{CH}_3\text{COONa}$ 0.1 M. $\text{p}K_a = 4{,}74$.
- $\text{pH} = 4{,}74 + \log\dfrac{0{,}1}{0{,}1} = 4{,}74 + \log(1) = \mathbf{4{,}74}$.

→ Khi 2 thành phần bằng nhau (1:1), $\text{pH} = \text{p}K_a$. Đệm tốt nhất khi tỉ lệ gần 1:1.

### 4.4. Đệm trong cơ thể — bicarbonate

Máu giữ pH = 7.4 nhờ đệm bicarbonate:

$$\text{H}_2\text{CO}_3 \rightleftharpoons \text{H}^+ + \text{HCO}_3^- \quad (\text{p}K_a = 6{,}37)$$

Tỉ lệ $[\text{HCO}_3^-]/[\text{H}_2\text{CO}_3]$ trong máu = 20:1. Tính pH:
- $\text{pH} = 6{,}37 + \log(20) = 6{,}37 + 1{,}30 = \mathbf{7{,}67}$.

(Thực tế ~ 7.4 do thêm hệ thống đệm protein/phosphate.)

Nếu pH máu < 7.35 → **acidosis** (toan máu); > 7.45 → **alkalosis** (kiềm máu). Cả 2 đều nguy hiểm.

### 📝 Tóm tắt mục 4

- Đệm = acid yếu + base liên hợp (cùng nồng độ ~ tốt nhất).
- Henderson-Hasselbalch: $\text{pH} = \text{p}K_a + \log\dfrac{[\text{A}^-]}{[\text{HA}]}$.
- Cơ thể có đệm bicarbonate giữ pH máu 7.4.

---

## 5. Chuẩn độ acid-base (Titration)

### 5.1. Khái niệm

**Chuẩn độ** = phương pháp xác định nồng độ một dung dịch bằng cách thêm dần dung dịch chuẩn (đã biết nồng độ) cho đến khi phản ứng vừa đủ.

**Phản ứng trung hòa**: acid + base → muối + nước.

Ví dụ: chuẩn độ HCl bằng NaOH:

$$\text{HCl} + \text{NaOH} \rightarrow \text{NaCl} + \text{H}_2\text{O}$$

### 5.2. Điểm tương đương vs điểm kết thúc

- **Điểm tương đương (equivalence point)**: lúc số mol $\text{H}^+$ thêm vào = số mol $\text{OH}^-$ ban đầu (lý tưởng).
- **Điểm kết thúc (end point)**: lúc chất chỉ thị đổi màu (thực tế đo được).

Hai điểm này thường rất gần nhau (chênh < 0.1 mL) khi chọn chỉ thị đúng.

### 5.3. Đường chuẩn độ

Vẽ pH (trục y) theo thể tích chất chuẩn thêm vào (trục x):

**Chuẩn độ acid mạnh bằng base mạnh** (vd HCl bằng NaOH):
- Bắt đầu: pH thấp (acid).
- pH tăng dần (chậm).
- Gần điểm tương đương: **pH nhảy vọt** (S-curve sharp).
- Tại điểm tương đương: pH = 7 (vì muối NaCl trung tính).
- Sau điểm tương đương: pH tiếp tục tăng (NaOH dư).

**Chuẩn độ acid yếu bằng base mạnh** (vd $\text{CH}_3\text{COOH}$ bằng NaOH):
- Bắt đầu: pH thấp nhưng > acid mạnh (do phân ly không hoàn toàn).
- Có **vùng đệm** ở giữa (pH thay đổi chậm) — đây là điểm $\text{pH} = \text{p}K_a$.
- Tại điểm tương đương: pH > 7 (vì muối $\text{CH}_3\text{COONa}$ là base yếu).

### 5.4. Tính toán chuẩn độ

Điểm tương đương: $n(\text{H}^+) = n(\text{OH}^-)$ → $M_\text{acid} \times V_\text{acid} = M_\text{base} \times V_\text{base}$ (cho phản ứng 1:1).

**Ví dụ**: Chuẩn độ 25 mL HCl chưa biết nồng độ. Phải dùng 18.5 mL NaOH 0.1 M để đạt điểm tương đương. Tính $[\text{HCl}]$.
- $M_\text{HCl} \times 25 = 0{,}1 \times 18{,}5$
- $M_\text{HCl} = \dfrac{0{,}1 \times 18{,}5}{25} = \mathbf{0{,}074}$ **M**.

### 📝 Tóm tắt mục 5

- Chuẩn độ: thêm dần chất chuẩn → biến đổi pH → điểm tương đương.
- HCl + NaOH: pH = 7 tại điểm tương đương.
- Acid yếu + base mạnh: vùng đệm + pH > 7 tại điểm tương đương.

---

## 6. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Tính pH của các dung dịch:
a) HCl 0.05 M
b) NaOH 0.001 M
c) $\text{HNO}_3$ $5 \times 10^{-4}$ M
d) Nước cất tại 25°C

**Bài 2**: Một dung dịch có pH = 9.5. Tính $[\text{H}^+]$ và $[\text{OH}^-]$.

**Bài 3**: Cho HF 0.2 M, $K_a = 6{,}6 \times 10^{-4}$. Tính pH và % phân ly.

**Bài 4**: Pha đệm gồm 0.2 mol $\text{CH}_3\text{COOH}$ và 0.1 mol $\text{CH}_3\text{COONa}$ trong 1 L nước. Tính pH. ($\text{p}K_a = 4{,}74$.)

**Bài 5**: Chuẩn độ 50 mL acid axetic 0.1 M bằng NaOH 0.1 M. Tính:
a) Cần bao nhiêu mL NaOH để đạt điểm tương đương?
b) pH tại điểm khi đã thêm 25 mL NaOH (= 1/2 chặng đường).

**Bài 6**: Vì sao máu duy trì được pH 7.4 ổn định mặc dù chúng ta liên tục tạo ra acid (qua hô hấp tế bào, vận động cơ bắp)?

### Lời giải

**Bài 1**:
a) $[\text{H}^+] = 0{,}05$ M → $\text{pH} = -\log(0{,}05) = \mathbf{1{,}30}$.
b) $[\text{OH}^-] = 0{,}001 = 10^{-3}$ → $\text{pOH} = 3$ → $\text{pH} = 14 - 3 = \mathbf{11}$.
c) $[\text{H}^+] = 5 \times 10^{-4}$ → $\text{pH} = -\log(5 \times 10^{-4}) = 3{,}30$.
d) $[\text{H}^+] = [\text{OH}^-] = 10^{-7}$ → $\text{pH} = \mathbf{7{,}0}$.

**Bài 2**: $\text{pH} = 9{,}5$ → $[\text{H}^+] = 10^{-9{,}5} \approx \mathbf{3{,}16 \times 10^{-10}}$ **M**.
$[\text{OH}^-] = \dfrac{K_w}{[\text{H}^+]} = \dfrac{10^{-14}}{3{,}16 \times 10^{-10}} \approx \mathbf{3{,}16 \times 10^{-5}}$ **M**.

**Bài 3**: $\text{HF} \rightleftharpoons \text{H}^+ + \text{F}^-$. Đặt $x = [\text{H}^+]$.
- $K_a = \dfrac{x^2}{0{,}2 - x} \approx \dfrac{x^2}{0{,}2} = 6{,}6 \times 10^{-4}$.
- $x^2 = 1{,}32 \times 10^{-4}$ → $x = 0{,}01149$ M.
- $\text{pH} = -\log(0{,}01149) = \mathbf{1{,}94}$.
- % phân ly $= \dfrac{0{,}01149}{0{,}2} \times 100\% = \mathbf{5{,}74\%}$ (phân ly khoảng 6%, đáng kể vì HF tương đối mạnh trong acid yếu).

**Bài 4**: Henderson-Hasselbalch:
- $\text{pH} = 4{,}74 + \log\dfrac{0{,}1}{0{,}2} = 4{,}74 + \log(0{,}5) = 4{,}74 + (-0{,}301) = \mathbf{4{,}44}$.

**Bài 5**:
a) $n(\text{acid}) = 0{,}1 \times 0{,}050 = 0{,}005$ mol. Cần $n(\text{NaOH}) = 0{,}005$ mol → $V(\text{NaOH}) = \dfrac{0{,}005}{0{,}1} = 0{,}050$ L $= \mathbf{50}$ **mL**.
b) Sau 25 mL NaOH: đã trung hòa 1/2 acid → còn 1/2 $\text{CH}_3\text{COOH}$, có 1/2 $\text{CH}_3\text{COO}^-$. Nồng độ bằng nhau → $\text{pH} = \text{p}K_a = \mathbf{4{,}74}$. (Đây là điểm giữa của đệm).

**Bài 6**: Máu có **hệ đệm bicarbonate** mạnh:
- $\text{H}_2\text{CO}_3 \rightleftharpoons \text{H}^+ + \text{HCO}_3^-$
- Khi cơ thể tạo $\text{H}^+$ (từ acid lactic, $\text{CO}_2$...): $\text{H}^+$ phản ứng với $\text{HCO}_3^-$ tạo $\text{H}_2\text{CO}_3$ → $\text{H}^+$ "biến mất" → pH ổn định.
- $\text{H}_2\text{CO}_3 \rightarrow \text{H}_2\text{O} + \text{CO}_2$ thở ra qua phổi.
- Tỉ lệ $[\text{HCO}_3^-]/[\text{H}_2\text{CO}_3] = 20:1$ → pH = 7.4 ổn định.
- Thận điều chỉnh lượng $\text{HCO}_3^-$ (thải bớt khi cần).
- Phổi điều chỉnh lượng $\text{CO}_2$ (= $\text{H}_2\text{CO}_3$) bằng cách thở nhanh/chậm.

→ Hai cơ chế (phổi + thận) phối hợp giữ pH cực ổn định. Khi mất cân bằng → bệnh.

---

## 7. Liên kết và bài tiếp theo

- **Bài tiếp theo**: [Lesson 02 — Phản ứng Redox](../lesson-02-redox/) — số oxy hóa và cân bằng phản ứng oxy hóa-khử.
- **Liên kết Math**: pH = −log → cần kiến thức logarit, xem [`Math/01-Arithmetic-Algebra/lesson-06`](../../../Math/01-Arithmetic-Algebra/lesson-06-powers-roots-logs/).
- **Liên kết Tier 1 L08**: phương trình đệm là cân bằng động.

---

## 📝 Tổng kết Lesson 01 (Tier 2)

1. **3 định nghĩa acid-base**: Arrhenius → Brønsted (chuẩn) → Lewis (tổng quát).
2. **Cặp liên hợp** khác nhau 1 $\text{H}^+$.
3. **$\text{pH} = -\log[\text{H}^+]$**, $\text{pH} + \text{pOH} = 14$. Mỗi đơn vị pH = 10× chênh $[\text{H}^+]$.
4. **Acid mạnh** phân ly hoàn toàn; **acid yếu** có $K_a$. $\text{p}K_a = -\log K_a$.
5. **Đệm** = acid yếu + base liên hợp. Henderson-Hasselbalch: $\text{pH} = \text{p}K_a + \log\dfrac{[\text{A}^-]}{[\text{HA}]}$.
6. **Chuẩn độ**: thêm dần chất chuẩn → điểm tương đương. Acid mạnh + base mạnh: pH = 7. Acid yếu + base mạnh: pH > 7.

**Tiếp theo**: [Lesson 02 — Redox](../lesson-02-redox/)
