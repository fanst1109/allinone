# Lesson 07 — Logic, tập hợp, ánh xạ

## Mục tiêu

- Hiểu **logic mệnh đề**: $\land$, $\lor$, $\neg$, $\to$, $\leftrightarrow$.
- **Lượng từ**: $\forall$ (forall), $\exists$ (exists). Phủ định.
- **Tập hợp**: phép toán hợp, giao, hiệu, phần bù, tích Descartes.
- **Ánh xạ**: đơn ánh (injective), toàn ánh (surjective), song ánh (bijective).

## Kiến thức tiền đề

- Toán cơ bản.

---

## 1. Logic mệnh đề

💡 **Trực giác / Hình dung**: mệnh đề là câu "đúng/sai dứt khoát" — như công tắc chỉ có BẬT (T) hoặc TẮT (F). Các phép logic ($\land$, $\lor$, $\neg$...) là "mạch điện" ghép các công tắc lại: AND như 2 công tắc nối tiếp (cả 2 bật mới thông), OR như 2 công tắc song song (1 cái bật là thông).

**Mệnh đề** = phát biểu **đúng** hoặc **sai** (không cả 2).

**4 ví dụ số đa dạng**:
- "$2+2 = 4$" → mệnh đề **đúng**.
- "7 là số chẵn" → mệnh đề **sai**.
- "$x + 1 = 5$" → KHÔNG phải mệnh đề (đúng/sai tùy x — gọi là vị từ).
- "Bạn khỏe không?" → KHÔNG phải mệnh đề (câu hỏi, không có giá trị đúng/sai).

### Phép toán logic

| Ký hiệu | Tên | Ý nghĩa |
|---------|-----|---------|
| $\neg p$ | phủ định | "không p" |
| $p \land q$ | và (AND) | "p và q" |
| $p \lor q$ | hoặc (OR) | "p hoặc q" |
| $p \to q$ | suy ra | "nếu p thì q" |
| $p \leftrightarrow q$ | tương đương | "p khi và chỉ khi q" |

### Bảng chân trị

**Bảng chân trị (truth table)** liệt kê giá trị của một biểu thức logic cho **mọi** tổ hợp đúng/sai của các biến. Với $n$ biến có $2^n$ dòng (mỗi biến 2 lựa chọn T/F, độc lập). Đây là "máy tính bằng tay" của logic: muốn biết 2 biểu thức có tương đương không, cứ lập bảng cho cả hai rồi so từng dòng.

| p | q | $\neg p$ | $p \land q$ | $p \lor q$ | $p \to q$ | $p \leftrightarrow q$ |
|---|---|----|-----|-----|-----|-----|
| T | T | F  | T   | T   | T   | T   |
| T | F | F  | F   | T   | F   | F   |
| F | T | T  | F   | T   | T   | F   |
| F | F | T  | F   | F   | T   | T   |

**Đọc từng cột — diễn giải nghĩa:**
- $\neg p$ (phủ định): đảo bit. T thành F, F thành T.
- $p \land q$ (AND): chỉ **một** dòng cho T — khi cả hai cùng T. "Cả hai phải đúng."
- $p \lor q$ (OR): chỉ **một** dòng cho F — khi cả hai cùng F. "Chỉ cần một đúng." (Đây là OR **bao gồm** (inclusive): T∨T = T, khác "hoặc loại trừ" trong tiếng Việt đời thường.)
- $p \to q$ (kéo theo): chỉ **một** dòng cho F — dòng $p=T, q=F$ ("hứa mà không giữ"). Mọi dòng khác đúng.
- $p \leftrightarrow q$ (tương đương): T khi p và q **cùng giá trị** (cùng T hoặc cùng F).

⚠ **$p \to q$**: khi p sai, q gì cũng đúng ("ex falso quodlibet"). 

**Ví dụ**: "Nếu 1 = 2 thì tôi là Vua Anh" — về mặt logic là **đúng** (vì p sai).

#### Walk-through: tính bảng chân trị một biểu thức phức

Lập bảng cho $(p \to q) \land (\neg q \lor p)$. Quy trình: tính **cột con** từ trong ra ngoài, rồi ghép. Có 2 biến → $2^2 = 4$ dòng.

| p | q | $p \to q$ | $\neg q$ | $\neg q \lor p$ | $(p \to q) \land (\neg q \lor p)$ |
|---|---|:---:|:---:|:---:|:---:|
| T | T | T | F | T | **T** |
| T | F | F | T | T | **F** |
| F | T | T | F | F | **F** |
| F | F | T | T | T | **T** |

Giải thích **dòng 2** ($p=T, q=F$) từng bước:
1. $p \to q = T \to F = F$ (hứa mà không giữ).
2. $\neg q = \neg F = T$.
3. $\neg q \lor p = T \lor T = T$.
4. Cột cuối $= F \land T = F$ (AND có một vế F là cả hai F).

Nhìn cột cuối $(T, F, F, T)$: biểu thức đúng đúng khi $p \leftrightarrow q$ (cùng giá trị) — thực ra nó **tương đương logic** với $p \leftrightarrow q$.

#### Tautology, mâu thuẫn, khả thỏa

- **Hằng đúng (tautology)**: cột cuối toàn T, đúng với mọi gán. Vd $p \lor \neg p$ ("luật bài trung" — không có khả năng thứ ba).
- **Mâu thuẫn (contradiction)**: cột cuối toàn F. Vd $p \land \neg p$ ("vừa đúng vừa sai" — bất khả).
- **Khả thỏa (satisfiable)**: có **ít nhất một** dòng T. Vd $p \land q$ (thỏa khi $p=q=T$).

Kiểm tra nhanh: $p \lor \neg p$ → khi $p=T$: $T \lor F = T$; khi $p=F$: $F \lor T = T$ → toàn T → tautology ✓.

### Tương đương logic & các luật cơ bản

💡 **Trực giác**: hai biểu thức **tương đương logic** (ký hiệu $\equiv$ hoặc dùng $\leftrightarrow$ là tautology) nếu chúng có **cùng cột chân trị** — đúng/sai khớp nhau ở **mọi** dòng. Tương đương cho phép thay biểu thức rối bằng biểu thức gọn mà nghĩa không đổi (giống rút gọn phân số).

Các luật thường dùng (verify được bằng bảng chân trị):

| Luật | Phát biểu |
|------|-----------|
| Giao hoán | $p \land q \equiv q \land p$; $p \lor q \equiv q \lor p$ |
| Kết hợp | $(p \land q) \land r \equiv p \land (q \land r)$ |
| Phân phối | $p \land (q \lor r) \equiv (p \land q) \lor (p \land r)$ |
| Phủ định kép | $\neg(\neg p) \equiv p$ |
| Kéo theo ↔ hoặc | $p \to q \equiv \neg p \lor q$ |
| Phản đảo | $p \to q \equiv \neg q \to \neg p$ |
| Hấp thụ | $p \lor (p \land q) \equiv p$ |

**Verify $p \to q \equiv \neg p \lor q$** bằng bảng (so 2 cột):

| p | q | $p \to q$ | $\neg p$ | $\neg p \lor q$ |
|---|---|:---:|:---:|:---:|
| T | T | T | F | T |
| T | F | F | F | F |
| F | T | T | T | T |
| F | F | T | T | T |

Cột $p \to q$ và cột $\neg p \lor q$ trùng nhau cả 4 dòng → tương đương ✓. Đây chính là lý do trong nhiều ngôn ngữ lập trình, người ta viết `if (!p || q)` thay cho ý "p kéo theo q".

### Quy luật De Morgan

$$\begin{aligned}
\neg(p \land q) &= \neg p \lor \neg q \\
\neg(p \lor q) &= \neg p \land \neg q
\end{aligned}$$

💡 **Trực giác**: "không phải (cả hai cùng đúng)" = "ít nhất một cái sai"; "không phải (ít nhất một đúng)" = "cả hai cùng sai". De Morgan là cách **đẩy dấu phủ định vào trong** — và mỗi lần đẩy qua, $\land$ đổi thành $\lor$ (và ngược lại).

#### Chứng minh De Morgan bằng bảng chân trị

Chứng minh $\neg(p \land q) \equiv \neg p \lor \neg q$. Lập bảng cho **cả hai vế** rồi so từng dòng — **không** dùng "dễ thấy", mỗi ô tính rõ:

| p | q | $p \land q$ | $\neg(p \land q)$ | $\neg p$ | $\neg q$ | $\neg p \lor \neg q$ |
|---|---|:---:|:---:|:---:|:---:|:---:|
| T | T | T | **F** | F | F | **F** |
| T | F | F | **T** | F | T | **T** |
| F | T | F | **T** | T | F | **T** |
| F | F | F | **T** | T | T | **T** |

Cột $\neg(p \land q)$ = cột $\neg p \lor \neg q$ ở **cả 4 dòng** $(F, T, T, T)$ → hai vế tương đương ✓.

Tương tự cho $\neg(p \lor q) \equiv \neg p \land \neg q$:

| p | q | $p \lor q$ | $\neg(p \lor q)$ | $\neg p$ | $\neg q$ | $\neg p \land \neg q$ |
|---|---|:---:|:---:|:---:|:---:|:---:|
| T | T | T | **F** | F | F | **F** |
| T | F | T | **F** | F | T | **F** |
| F | T | T | **F** | T | F | **F** |
| F | F | F | **T** | T | T | **T** |

Hai cột tô đậm trùng nhau $(F, F, F, T)$ → tương đương ✓. (Phần "De Morgan cho tập hợp" — chứng minh bằng Venn — ở mục 3.)

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $p \to q$ đúng khi p sai?"* Vì $p \to q$ chỉ "hứa hẹn": *nếu* p thì q. Khi p không xảy ra, lời hứa không bị vi phạm → mặc định đúng. Vd "nếu trời mưa thì tôi mang ô" — hôm trời không mưa, dù tôi có mang ô hay không, lời hứa vẫn không sai.
- *"$p \to q$ và $q \to p$ có giống nhau không?"* **Không**. $p \to q$ (thuận) khác $q \to p$ (đảo). Vd "mưa → ướt đường" đúng, nhưng "ướt đường → mưa" sai (có thể do tưới cây).

⚠ **Lỗi thường gặp — lẫn $p \to q$ với chiều đảo $q \to p$**. Chúng KHÔNG tương đương. Cái tương đương với $p \to q$ là **phản đảo** $\neg q \to \neg p$. Phản ví dụ kiểm bảng chân trị: với p=F, q=T: $p \to q = T$ nhưng $q \to p = F$ → khác nhau.

⚠ **Lỗi thường gặp — nhầm $\to$ (kéo theo) với $\leftrightarrow$ (tương đương)**. "$p \to q$" chỉ là **một chiều** (p đủ cho q), còn "$p \leftrightarrow q$" là **hai chiều** (p khi và chỉ khi q). Phản ví dụ: "mưa $\to$ ướt đường" đúng, nhưng "mưa $\leftrightarrow$ ướt đường" **sai** (đường ướt do tưới cây, không mưa). Kiểm bảng: dòng $p=F, q=T$ cho $p\to q = T$ nhưng $p \leftrightarrow q = F$ → khác nhau.

🔁 **Dừng lại tự kiểm tra**

1. Dùng De Morgan, viết lại $\neg(p \land \neg q)$.
2. Mệnh đề "Nếu 2 > 3 thì mặt trời lạnh" đúng hay sai?
3. Lập bảng chân trị cho $\neg p \lor q$ và xác nhận nó tương đương $p \to q$.
4. $p \land (p \lor q)$ tương đương biểu thức nào gọn hơn?

<details><summary>Đáp án</summary>

1. $\neg p \lor \neg(\neg q) = \neg p \lor q$.
2. **Đúng** — vì p ("2 > 3") sai, nên $p \to q$ đúng bất kể q.
3. Bảng cho $\neg p \lor q$: dòng TT → $F \lor T = T$; TF → $F \lor F = F$; FT → $T \lor T = T$; FF → $T \lor F = T$. Cột $(T,F,T,T)$ = cột $p\to q$ → tương đương ✓.
4. $p$ (luật hấp thụ). Verify: nếu $p=T$ thì $p \lor q = T$ nên $p \land (p\lor q) = T = p$; nếu $p=F$ thì $p \land (\ldots) = F = p$ ✓.

</details>

### 📝 Tóm tắt mục 1

- Mệnh đề = câu đúng/sai dứt khoát (công tắc T/F). Vị từ ("$x+1=5$") và câu hỏi KHÔNG phải mệnh đề.
- Bảng chân trị: $n$ biến → $2^n$ dòng; tính cột con từ trong ra ngoài.
- $p \to q$ chỉ sai khi p đúng & q sai; p sai thì luôn đúng. $p \to q \equiv \neg p \lor q$.
- De Morgan: $\neg(p \land q) = \neg p \lor \neg q$ (đẩy phủ định vào, đổi $\land \leftrightarrow \lor$).
- $p \to q$ tương đương phản đảo $\neg q \to \neg p$, KHÔNG phải đảo $q \to p$, KHÔNG phải $\leftrightarrow$.
- Tautology (toàn T) / mâu thuẫn (toàn F) / khả thỏa (≥1 dòng T).

---

## 2. Lượng từ

💡 **Trực giác / Hình dung**: $\forall$ ("với mọi") là lời khẳng định mạnh — phải đúng cho **toàn bộ**, chỉ cần 1 phản ví dụ là sập. $\exists$ ("tồn tại") là khẳng định yếu — chỉ cần **1 trường hợp** đúng là xong. Phủ định đảo vai: phá vỡ "mọi" = chỉ ra 1 ngoại lệ ($\exists$ phản ví dụ); phá vỡ "tồn tại" = chứng minh không cái nào ($\forall$ đều không).

- **$\forall x$** = "với mọi x" (forall).
- **$\exists x$** = "tồn tại x" (exists).

**4 ví dụ số đa dạng**:
- $\forall x \in \mathbb{R}: x^2 \ge 0$ — **đúng** (mọi số thực bình phương không âm).
- $\exists x \in \mathbb{R}: x^2 = 4$ — **đúng** (x = 2 hoặc −2).
- $\forall x \in \mathbb{R}: x^2 > 0$ — **sai** (phản ví dụ x = 0 cho 0).
- $\exists x \in \mathbb{R}: x^2 = -1$ — **sai** (không số thực nào bình phương ra âm).

### Vị từ (predicate) và miền (domain)

Một **vị từ** $P(x)$ là "câu có biến" — chưa đúng/sai cho đến khi gán giá trị cho $x$. Vd $P(x): x > 3$. $P(5)$ đúng, $P(2)$ sai. Lượng từ "đóng" biến lại để biến vị từ thành mệnh đề: $\forall x \in \mathbb{Z}: P(x)$ là mệnh đề (ở đây sai, vì $P(0)$ sai).

⚠ **Miền quan trọng**: "$\forall x: x^2 \ge x$" **sai** trên $\mathbb{R}$ (phản ví dụ $x = 0.5$: $0.25 < 0.5$) nhưng **đúng** trên $\mathbb{Z}$ (số nguyên: $0,1$ thỏa $=$, còn lại $>$). Luôn nói rõ miền.

### Phủ định lượng từ

$$\begin{aligned}
\neg(\forall x: P(x)) &= \exists x: \neg P(x) \\
\neg(\exists x: P(x)) &= \forall x: \neg P(x)
\end{aligned}$$

💡 **Mẹo**: đổi $\forall \leftrightarrow \exists$, và phủ định P. (De Morgan "mở rộng": $\forall$ giống một $\land$ chạy khắp miền, $\exists$ giống một $\lor$ — nên phủ định đảo chúng đúng như De Morgan đảo $\land \leftrightarrow \lor$.)

**Ví dụ**: Phủ định "mọi hoa đều đẹp" = "tồn tại 1 hoa không đẹp".

#### Walk-through phủ định ≥4 ví dụ (gồm lượng từ lồng nhau)

Quy tắc cơ học: **quét từ trái sang phải**, mỗi $\forall$ thành $\exists$, mỗi $\exists$ thành $\forall$, đẩy $\neg$ đến tận lõi rồi phủ định lõi.

**Ví dụ 1** (một $\forall$): $\neg\big(\forall x \in \mathbb{R}: x^2 \ge 0\big)$
$= \exists x \in \mathbb{R}: x^2 < 0$. (Lõi $x^2 \ge 0$ phủ định thành $x^2 < 0$.) Mệnh đề gốc đúng → phủ định sai (không số thực nào bình phương âm) ✓.

**Ví dụ 2** (một $\exists$): $\neg\big(\exists x \in \mathbb{Z}: x^2 = 2\big)$
$= \forall x \in \mathbb{Z}: x^2 \ne 2$. Gốc sai (không số nguyên nào) → phủ định đúng ✓.

**Ví dụ 3** ($\forall\exists$ lồng — "mọi số có số lớn hơn"): $\neg\big(\forall x\ \exists y: y > x\big)$
$= \exists x\ \forall y: \neg(y > x) = \exists x\ \forall y: y \le x$. Đọc: "tồn tại $x$ mà **mọi** $y$ đều $\le x$" — tức "có số lớn nhất". Trên $\mathbb{R}$ gốc đúng (luôn lấy $y = x+1$) → phủ định sai (không có số thực lớn nhất) ✓.

**Ví dụ 4** ($\exists\forall$ lồng): $\neg\big(\exists x\ \forall y: x \cdot y = y\big)$
$= \forall x\ \exists y: x\cdot y \ne y$. Gốc đúng trên $\mathbb{R}$ ($x=1$ là phần tử đơn vị, $1\cdot y = y$ với mọi $y$) → phủ định sai ✓.

**Ví dụ 5** (lõi có kéo theo): $\neg\big(\forall x: (x > 0 \to x^2 > 0)\big)$
Phủ định lõi $\neg(x>0 \to x^2>0) = (x>0) \land \neg(x^2>0) = (x>0)\land(x^2 \le 0)$ (dùng $\neg(p\to q) = p \land \neg q$).
$\Rightarrow \exists x: (x>0) \land (x^2 \le 0)$. Gốc đúng → phủ định sai ✓.

⚠ **Thứ tự lượng từ KHÔNG giao hoán khi khác loại**. "$\forall x\ \exists y: y > x$" (mọi x có một y lớn hơn — **đúng** trên $\mathbb{R}$) khác hẳn "$\exists y\ \forall x: y > x$" (một y lớn hơn **tất cả** x — **sai**, không có số lớn nhất). Cùng vị từ, đổi thứ tự $\forall\exists$ thành $\exists\forall$ là đổi nghĩa.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phủ định mệnh đề có nhiều lượng từ thế nào?"* Đảo từng cái từ ngoài vào trong và phủ định lõi. Vd $\neg(\forall x\ \exists y: P(x,y)) = \exists x\ \forall y: \neg P(x,y)$. Mỗi $\forall$ thành $\exists$, mỗi $\exists$ thành $\forall$.
- *"Để bác bỏ '$\forall x: P(x)$' tôi cần làm gì?"* Chỉ cần **1 phản ví dụ** (1 x làm P(x) sai). Vd bác bỏ "mọi số nguyên tố là lẻ" bằng p = 2.

⚠ **Lỗi thường gặp — phủ định lượng từ sai (không đổi $\forall \leftrightarrow \exists$)**. Phủ định "mọi sinh viên đều đậu" KHÔNG phải "mọi sinh viên đều rớt", mà là "**tồn tại** 1 sinh viên rớt". Phản ví dụ minh hoạ: lớp 10 người, 9 đậu 1 rớt → "mọi người đậu" sai, "mọi người rớt" cũng sai, chỉ "tồn tại người rớt" mới đúng là phủ định.

🔁 **Dừng lại tự kiểm tra**

1. Phủ định "Mọi số chẵn đều chia hết cho 4".
2. Phủ định "Tồn tại học sinh đạt điểm 10".
3. Phủ định "$\forall \varepsilon > 0\ \exists \delta > 0: |x| < \delta \to |f(x)| < \varepsilon$" (định nghĩa liên tục — gặp lại ở Giải tích).
4. "$\exists x\ \forall y: x + y = y$" đúng hay sai trên $\mathbb{R}$? Phủ định nó.

<details><summary>Đáp án</summary>

1. "Tồn tại 1 số chẵn không chia hết cho 4" (vd 6 — đúng là phản ví dụ).
2. "Mọi học sinh đều không đạt điểm 10".
3. Đổi từng lượng từ, phủ định lõi (dùng $\neg(p\to q) = p \land \neg q$): "$\exists \varepsilon > 0\ \forall \delta > 0: |x| < \delta \land |f(x)| \ge \varepsilon$".
4. **Đúng** ($x = 0$: $0 + y = y$ với mọi $y$). Phủ định: "$\forall x\ \exists y: x + y \ne y$".

</details>

### 📝 Tóm tắt mục 2

- $\forall$ = "với mọi" (1 phản ví dụ là sập); $\exists$ = "tồn tại" (1 trường hợp đủ).
- Vị từ $P(x)$ chưa đúng/sai; lượng từ "đóng" biến thành mệnh đề. Miền quyết định đúng/sai.
- Phủ định: đổi $\forall \leftrightarrow \exists$ (từ ngoài vào trong) và phủ định lõi P; dùng $\neg(p\to q)=p\land\neg q$ cho lõi kéo theo.
- Thứ tự lượng từ khác loại KHÔNG giao hoán: $\forall x\exists y \ne \exists y\forall x$.
- Bác bỏ $\forall x: P(x)$ chỉ cần 1 phản ví dụ; chứng minh $\exists x: P(x)$ chỉ cần 1 ví dụ.

---

## 3. Tập hợp

💡 **Trực giác / Hình dung**: tập hợp là 1 "cái túi" chứa các phần tử phân biệt, không quan tâm thứ tự, không lặp. Các phép toán tập hợp tương ứng phép logic: **giao ($\cap$)** = "và" ($\land$), **hợp ($\cup$)** = "hoặc" ($\lor$), **phần bù** = "không" ($\neg$). Vẽ biểu đồ Venn (vòng tròn chồng nhau) để "thấy" được.

### Định nghĩa & ký hiệu

- **$a \in A$**: a là phần tử của A.
- **$A \subset B$**: A là tập con của B.
- **$\emptyset$**: tập rỗng.

### Phép toán

| Ký hiệu | Tên | Định nghĩa |
|---------|-----|------------|
| $A \cup B$ | Hợp | $\{x : x \in A \lor x \in B\}$ |
| $A \cap B$ | Giao | $\{x : x \in A \land x \in B\}$ |
| $A \setminus B$ | Hiệu | $\{x : x \in A \land x \notin B\}$ |
| $A^c$ | Phần bù | $U \setminus A$ (U = tập vũ trụ) |
| $A \times B$ | Tích Descartes | $\{(a, b) : a \in A, b \in B\}$ |

#### Biểu đồ Venn (ASCII) — "thấy" các phép toán

Hai tập $A, B$ chồng nhau chia mặt phẳng thành 4 vùng. Vùng tô đậm là kết quả mỗi phép toán:

```
   A ∪ B  (hợp: tô CẢ HAI vòng)        A ∩ B  (giao: chỉ phần CHỒNG)
    ┌───────────┬───────────┐           ┌───────────┬───────────┐
    │ ███████   │   ███████ │           │           │           │
    │ ████ ███████ ███████  │           │      ┌─────────┐      │
    │ ███████ ███████ ████  │           │      │ ███████ │      │
    │   A    ███████    B   │           │  A   │ ███ ███ │   B  │
    └───────────┴───────────┘           └──────┴─────────┴──────┘

   A \ B  (hiệu: A trừ phần chung)      Aᶜ  (phần bù: ngoài A, trong U)
    ┌───────────┬───────────┐           ┌─U─────────────────────┐
    │ ███████   │           │           │ ██████████████████████│
    │ ████ ███  │           │           │ ████┌─────────┐███████│
    │ ███████   │           │           │ ████│         │███████│
    │   A    └──┴── B       │           │ ████│    A    │███████│
    └───────────┴───────────┘           └─────┴─────────┴───────┘
```

- **Hợp** $A \cup B$: gộp hết, vùng nào thuộc A **hoặc** B.
- **Giao** $A \cap B$: chỉ phần **chồng** (thuộc A **và** B).
- **Hiệu** $A \setminus B$: phần A bỏ đi chỗ chung với B.
- **Phần bù** $A^c$: mọi thứ trong vũ trụ U **trừ** A.

### Quan hệ De Morgan cho tập

$$\begin{aligned}
(A \cup B)^c &= A^c \cap B^c \\
(A \cap B)^c &= A^c \cup B^c
\end{aligned}$$

⟶ **Tương đồng với logic**: $\cup \leftrightarrow \lor$, $\cap \leftrightarrow \land$, $c \leftrightarrow \neg$.

#### Chứng minh De Morgan cho tập — 2 cách

**Cách 1 — bảng "thuộc/không thuộc"** (membership table, đúng kiểu bảng chân trị: 1 = thuộc, 0 = không). Cột "$x \in A$?" và "$x \in B$?" có 4 tổ hợp:

| $x\in A$ | $x\in B$ | $x\in A\cup B$ | $x\in (A\cup B)^c$ | $x\in A^c$ | $x\in B^c$ | $x\in A^c\cap B^c$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | 1 | 1 | **0** | 0 | 0 | **0** |
| 1 | 0 | 1 | **0** | 0 | 1 | **0** |
| 0 | 1 | 1 | **0** | 1 | 0 | **0** |
| 0 | 0 | 0 | **1** | 1 | 1 | **1** |

Cột $(A\cup B)^c$ trùng cột $A^c \cap B^c$ ở cả 4 dòng $(0,0,0,1)$ → hai tập có **cùng phần tử** → bằng nhau ✓. (So sánh: bảng này y hệt bảng De Morgan logic $\neg(p\lor q) \equiv \neg p \land \neg q$ — đúng như tương đồng $\cup\leftrightarrow\lor$.)

**Cách 2 — đối chiếu Venn**: $(A \cup B)^c$ là "ngoài cả hai vòng"; $A^c \cap B^c$ là "ngoài A **và** ngoài B" = cũng "ngoài cả hai vòng". Hai mô tả chỉ cùng một vùng (góc ngoài cùng):

```
   (A ∪ B)ᶜ = vùng NGOÀI cả hai vòng        Aᶜ ∩ Bᶜ = ngoài A VÀ ngoài B
    ┌─U───────────────────────┐              cũng chính là vùng đó
    │██████████████████████████│
    │████┌──────┬──────┐███████│   ⟹  hai vùng tô đậm TRÙNG nhau
    │████│  A   │  B   │███████│
    │████└──────┴──────┘███████│
    └──────────────────────────┘
```

**4 ví dụ số đa dạng** ($A = \{1,2,3\}$, $B = \{2,3,4\}$):
- $A \cup B = \{1,2,3,4\}$ (hợp = gộp, không lặp).
- $A \cap B = \{2,3\}$ (giao = chung).
- $A \setminus B = \{1\}$ (hiệu = ở A nhưng không ở B).
- $|A \times B| = 3\cdot 3 = 9$ (tích Descartes có 9 cặp).

**Thêm 4 ví dụ với tập khác** ($C = \{2,4,6,8\}$, $D = \{1,2,3,4,5\}$, vũ trụ $U = \{1,\dots,8\}$):
- $C \cup D = \{1,2,3,4,5,6,8\}$ (7 phần tử; bỏ 7).
- $C \cap D = \{2,4\}$ (chẵn **và** $\le 5$).
- $C \setminus D = \{6,8\}$ (chẵn nhưng $> 5$).
- $C^c = U \setminus C = \{1,3,5,7\}$ (các số lẻ $\le 8$).

**Kiểm tra De Morgan bằng số** với $C, D$ trên: $(C \cup D)^c = U \setminus \{1,2,3,4,5,6,8\} = \{7\}$. Còn $C^c \cap D^c = \{1,3,5,7\} \cap \{6,7,8\} = \{7\}$. Trùng nhau ✓.

#### Công thức bao hàm–loại trừ (đếm hợp)

$$|A \cup B| = |A| + |B| - |A \cap B|$$

💡 **Trực giác**: cộng $|A|$ và $|B|$ thì phần chung $A \cap B$ bị đếm **hai lần** → phải trừ đi một lần. Vd $A=\{1,2,3\}, B=\{2,3,4\}$: $|A|+|B|-|A\cap B| = 3+3-2 = 4 = |\{1,2,3,4\}|$ ✓. (Mở rộng 3 tập sẽ học kỹ ở phần Tổ hợp.)

❓ **Câu hỏi tự nhiên của người đọc**

- *"$A \subset B$ và $A \in B$ khác nhau thế nào?"* $\subset$ là "tập con" (mọi phần tử của A đều ở B); $\in$ là "phần tử". Vd với $B = \{1, \{1,2\}\}$: $\{1,2\} \in B$ (là 1 phần tử), nhưng $\{1,2\} \subset B$ thì sai ($2 \notin B$).
- *"Tập n phần tử có bao nhiêu tập con?"* $2^n$ (mỗi phần tử "có hoặc không" trong tập con) — liên hệ L04. Vd $\{1,2,3\}$ có $2^3 = 8$ tập con.

⚠ **Lỗi thường gặp — lẫn $\in$ (phần tử) và $\subset$ (tập con)**. Phản ví dụ: với $A = \{1,2,3\}$, viết $1 \subset A$ là SAI (1 không phải tập), phải $1 \in A$ hoặc $\{1\} \subset A$. Phần tử dùng $\in$, tập con dùng $\subset$.

🔁 **Dừng lại tự kiểm tra**

1. Cho $A = \{1,2,3,4\}$, $B = \{3,4,5\}$. Tính $A \cap B$, $A \cup B$, $A \setminus B$.
2. $\emptyset$ có bao nhiêu tập con?
3. Cho $|A|=10$, $|B|=8$, $|A\cap B|=3$. Tính $|A\cup B|$.
4. Liệt kê **mọi** tập con của $\{a, b\}$.

<details><summary>Đáp án</summary>

1. $A \cap B = \{3,4\}$; $A \cup B = \{1,2,3,4,5\}$; $A \setminus B = \{1,2\}$.
2. $2^0 = 1$ (chỉ có chính nó — tập rỗng là tập con của mọi tập).
3. $|A\cup B| = 10 + 8 - 3 = 15$ (bao hàm–loại trừ).
4. $\emptyset, \{a\}, \{b\}, \{a,b\}$ — đúng $2^2 = 4$ tập con.

</details>

### 📝 Tóm tắt mục 3

- Tập = túi phần tử phân biệt, không thứ tự; $\cup/\cap/$bù tương ứng $\lor/\land/\neg$.
- Venn: hợp = cả hai vòng, giao = phần chồng, hiệu = A bỏ chung, bù = ngoài A.
- De Morgan cho tập: $(A \cup B)^c = A^c \cap B^c$ — chứng minh bằng membership table hoặc Venn.
- Bao hàm–loại trừ: $|A\cup B| = |A|+|B|-|A\cap B|$.
- $\in$ (phần tử) $\neq \subset$ (tập con); tập n phần tử có $2^n$ tập con.

---

## 4. Quan hệ (Relations)

💡 **Trực giác / Hình dung**: một **quan hệ** $R$ trên tập $A$ là cách "nối" các phần tử theo một tiêu chí — như "anh em với", "chia hết cho", "bằng nhau". Hình thức: $R \subseteq A \times A$ là một **tập các cặp** $(a,b)$ "có liên hệ". Viết $a\,R\,b$ nếu $(a,b)\in R$.

**4 ví dụ quan hệ trên $\mathbb{Z}$**:
- "$a = b$" (bằng nhau): cặp $(3,3)\in R$, $(3,4)\notin R$.
- "$a \le b$": $(2,5)\in R$, $(5,2)\notin R$.
- "$a$ chia hết cho $b$": $(6,3)\in R$, $(6,4)\notin R$.
- "$a \equiv b \pmod 3$" (cùng số dư khi chia 3): $(1,4)\in R$ (đều dư 1), $(1,2)\notin R$.

### Ba tính chất quan trọng

| Tính chất | Định nghĩa | Đúng cho |
|-----------|------------|----------|
| Phản xạ (reflexive) | $\forall a: a\,R\,a$ | $=$, $\le$, $\equiv \pmod n$ |
| Đối xứng (symmetric) | $a\,R\,b \Rightarrow b\,R\,a$ | $=$, $\equiv \pmod n$ (KHÔNG $\le$) |
| Bắc cầu (transitive) | $a\,R\,b \land b\,R\,c \Rightarrow a\,R\,c$ | $=$, $\le$, $\equiv \pmod n$ |

**Quan hệ tương đương (equivalence)** = phản xạ + đối xứng + bắc cầu. Vd $\equiv \pmod 3$ chia $\mathbb{Z}$ thành 3 **lớp tương đương** $\{\dots,-3,0,3,6,\dots\}$, $\{\dots,1,4,7,\dots\}$, $\{\dots,2,5,8,\dots\}$ (theo số dư 0/1/2).

⚠ **Lỗi thường gặp**: tưởng "$\le$" đối xứng. Sai — $2 \le 5$ đúng nhưng $5 \le 2$ sai. "$\le$" là **thứ tự bộ phận** (phản xạ + bắc cầu + phản đối xứng), không phải quan hệ tương đương.

🔁 **Dừng lại tự kiểm tra**: quan hệ "$a$ và $b$ cùng dấu" trên $\mathbb{R}\setminus\{0\}$ có là quan hệ tương đương không?

<details><summary>Đáp án</summary>

**Có.** Phản xạ ($a$ cùng dấu $a$ ✓), đối xứng (cùng dấu là quan hệ hai chiều ✓), bắc cầu (a,b cùng dấu và b,c cùng dấu → a,c cùng dấu ✓). Hai lớp tương đương: số dương, số âm.

</details>

### 📝 Tóm tắt mục 4

- Quan hệ $R\subseteq A\times A$ = tập cặp "có liên hệ".
- Ba tính chất: phản xạ ($aRa$), đối xứng ($aRb\Rightarrow bRa$), bắc cầu.
- Tương đương = cả ba → chia tập thành lớp; vd $\equiv\pmod n$.

---

## 5. Ánh xạ (Functions)

### Định nghĩa

Ánh xạ **$f: A \to B$** = quy tắc gán mỗi phần tử $a \in A$ với **đúng 1** phần tử $b \in B$. Viết $b = f(a)$.

- **Tập nguồn** (domain): A.
- **Tập đích** (codomain): B.
- **Ảnh** (image): $f(A) = \{f(a) : a \in A\} \subset B$.

### 3 loại ánh xạ đặc biệt

| Loại | Định nghĩa | Hình ảnh |
|------|------------|----------|
| **Đơn ánh** (injective, 1-1) | $f(a_1)=f(a_2) \implies a_1=a_2$ | Mỗi $b \in$ Ảnh ứng với $\le 1$ a |
| **Toàn ánh** (surjective, onto) | $\forall b \in B, \exists a: f(a)=b$ | Ảnh = B |
| **Song ánh** (bijective, 1-1 onto) | Cả đơn ánh và toàn ánh | Mỗi $b \in B$ ứng với đúng 1 a |

> 📐 **Định nghĩa đầy đủ — Đơn ánh / Toàn ánh / Song ánh**
>
> **(a) Là gì**: 3 mức độ "tốt" của ánh xạ $f: A \to B$. **Đơn ánh** = không có 2 đầu vào ra cùng đầu ra (mỗi a có ảnh riêng). **Toàn ánh** = mọi $b \in B$ đều có ít nhất 1 a "tạo ra" nó (ảnh = B). **Song ánh** = vừa đơn ánh vừa toàn ánh = tương ứng 1-1 hoàn hảo.
>
> **(b) Vì sao cần**: Song ánh là điều kiện CẦN và ĐỦ để f có **hàm ngược** $f^{-1}$. Trong mã hoá, nén dữ liệu: phải song ánh (mã hoá ngược được). Trong toán: dùng để định nghĩa "đếm được" (tập đếm được = có song ánh với $\mathbb{N}$ → $\mathbb{N}, \mathbb{Z}, \mathbb{Q}$ đếm được; $\mathbb{R}$ KHÔNG đếm được — chứng minh Cantor). Trong AI: muốn invert layer của neural network → cần song ánh (lưu lượng thông tin).
>
> **(c) Ví dụ số**: $f: \mathbb{N} \to \mathbb{N}$, $f(n) = 2n$. Đơn ánh ✓ ($n_1 \neq n_2 \to 2n_1 \neq 2n_2$). Toàn ánh ✗ (số lẻ không có nguồn). $f: \mathbb{R} \to \mathbb{R}$, $f(x) = x^2$. Đơn ánh ✗ ($f(2)=f(-2)=4$). Toàn ánh ✗ (số âm không có nguồn). $f: \mathbb{R} \to \mathbb{R}$, $f(x) = x^3$. Đơn ✓ (tăng nghiêm ngặt), Toàn ✓ → **song ánh**. Ngược $f^{-1}(y) = \sqrt[3]{y}$. $f: \mathbb{R} \to \mathbb{R}$, $f(x) = 2x+1$: song ánh (mọi đường thẳng $a \neq 0$), $f^{-1}(y) = (y-1)/2$.

💡 **Trực giác**:
- Đơn ánh = "không có 2 đầu vào ra cùng đầu ra".
- Toàn ánh = "mọi đầu ra trong B đều có 1 nguồn".
- Song ánh = "tương ứng 1-1 hoàn hảo".

> 🔗 **Liên hệ Lesson 07 Tier 1 (Hàm số)**: ba khái niệm đơn/toàn/song ánh đã xuất hiện ở [Lesson 07 — Hàm số](../../01-Arithmetic-Algebra/lesson-07-functions-intro/) qua góc nhìn đồ thị (vertical/horizontal line test) và hàm ngược. Ở đây ta nhìn chúng **trừu tượng hơn** — không cần $A,B$ là tập số, có thể là tập bất kỳ — và nối thẳng vào khái niệm **lực lượng** (đếm được) bên dưới.

#### Sơ đồ mũi tên (ASCII) — phân biệt 4 trường hợp

```
   ĐƠN ánh, KHÔNG toàn        TOÀN ánh, KHÔNG đơn
   A          B               A          B
   a1 ──────► b1              a1 ──┐
   a2 ──────► b2              a2 ──┴───► b1
              b3  ◄ thiếu nguồn        a3 ──────► b2
   (mỗi b ≤1 mũi tên,         (b1 có 2 mũi tên → không đơn;
    b3 trống → không toàn)      mọi b có nguồn → toàn)

   SONG ánh (1-1 hoàn hảo)     KHÔNG đơn, KHÔNG toàn
   a1 ──────► b1              a1 ──┐
   a2 ──────► b2              a2 ──┴───► b1
   a3 ──────► b3                         b2 ◄ thiếu nguồn
   (mỗi b đúng 1 mũi tên)     (b1 hai nguồn, b2 trống)
```

#### Walk-through kiểm tra đơn/toàn ánh từng bước

Cho $f: \mathbb{Z} \to \mathbb{Z}$, $f(n) = 2n - 1$.

**Kiểm đơn ánh** (giả sử cùng output → ép cùng input):
1. Giả sử $f(n_1) = f(n_2)$, tức $2n_1 - 1 = 2n_2 - 1$.
2. Cộng 1 hai vế: $2n_1 = 2n_2$.
3. Chia 2: $n_1 = n_2$. → đơn ánh ✓.

**Kiểm toàn ánh** (cho $b\in\mathbb{Z}$ tùy ý, tìm $n$ thỏa $f(n)=b$):
1. Cần $2n - 1 = b \Rightarrow n = (b+1)/2$.
2. Thử $b = 4$: $n = 5/2$ — **không** là số nguyên! Không có $n\in\mathbb{Z}$ nào cho $f(n)=4$.
3. → **không toàn ánh** (số chẵn không có nguồn; $f$ luôn ra số lẻ).

Kết luận: đơn ánh nhưng không toàn ánh (vì miền đích $\mathbb{Z}$ "rộng hơn" ảnh = tập số lẻ).

### Ví dụ

- $f: \mathbb{R} \to \mathbb{R}$, $f(x) = x^2$ → **không** đơn ánh ($f(2) = f(-2)$), **không** toàn ánh (không có x: $f(x) = -1$).
- $f: \mathbb{R} \to [0,\infty)$, $f(x) = x^2$ → **không** đơn ánh, **toàn** ánh.
- $f: [0,\infty) \to [0,\infty)$, $f(x) = x^2$ → **song** ánh.
- $f: \mathbb{R} \to \mathbb{R}$, $f(x) = e^x$ → đơn ánh nhưng không toàn ánh.
- $f: \mathbb{R} \to \mathbb{R}$, $f(x) = 2x + 3$ → **song ánh** (mọi hàm bậc 1 với $a \neq 0$).

### Hàm hợp & hàm ngược

- **Hàm hợp** $(g \circ f)(x) = g(f(x))$.
- **Hàm ngược**: chỉ tồn tại khi f là **song ánh**. $f^{-1}(b) = a \iff f(a) = b$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Cùng công thức $f(x) = x^2$ sao khi đơn ánh khi không?"* Phụ thuộc **tập nguồn**. Trên $\mathbb{R}$: không đơn ánh ($f(2)=f(-2)$). Trên $[0,\infty)$: đơn ánh (chỉ phần $x \ge 0$). Định nghĩa ánh xạ gồm cả công thức LẪN tập nguồn/đích.
- *"Tính toàn ánh phụ thuộc gì?"* Phụ thuộc **tập đích B**. $f(x)=x^2$ lên $\mathbb{R}$ không toàn ánh (số âm thiếu nguồn); lên $[0,\infty)$ thì toàn ánh (ảnh phủ kín đích).

⚠ **Lỗi thường gặp — kết luận song ánh chỉ nhìn công thức, bỏ qua tập nguồn/đích**. Phản ví dụ: $f(x) = x^2$ "có vẻ" 1-1 nhưng trên $\mathbb{R}$ thì KHÔNG đơn ánh ($f(3)=f(-3)=9$) và KHÔNG toàn ánh ($f(x)=-4$ vô nghiệm). Phải xét rõ A và B mới kết luận được.

🔁 **Dừng lại tự kiểm tra**

1. $f: \mathbb{R} \to \mathbb{R}, f(x) = x + 5$. Song ánh không? Hàm ngược?
2. $f: \mathbb{N} \to \mathbb{N}, f(n) = n + 1$. Đơn ánh? Toàn ánh?

<details><summary>Đáp án</summary>

1. **Song ánh** (hàm bậc 1, hệ số $\neq 0$). $f^{-1}(y) = y - 5$.
2. Đơn ánh ✓ ($n_1 \neq n_2 \to n_1+1 \neq n_2+1$). Toàn ánh ✗ (số 0 không có nguồn: không $n \in \mathbb{N}$ nào cho $f(n)=0$).

</details>

### 📝 Tóm tắt mục 5

- Ánh xạ gồm công thức + tập nguồn A + tập đích B.
- Đơn ánh (1-1), toàn ánh (ảnh = B), song ánh (cả hai).
- Kiểm đơn ánh: giả sử $f(a_1)=f(a_2)$, suy ra $a_1=a_2$. Kiểm toàn ánh: cho $b$ tùy ý, tìm nguồn $a$.
- Hàm ngược tồn tại $\iff$ song ánh. Đơn/toàn phụ thuộc A và B, không chỉ công thức.

---

## 6. Lực lượng — tập đếm được & không đếm được

💡 **Trực giác / Hình dung**: với tập **hữu hạn**, "lực lượng" (cardinality) chỉ là **số phần tử** — $|\{a,b,c\}| = 3$. Nhưng với tập **vô hạn**, đếm kiểu thường vô nghĩa. Mẹo của Cantor: **hai tập có cùng lực lượng nếu tồn tại một song ánh giữa chúng** — ghép cặp 1-1 hết, không thừa bên nào. Đây chính là lý do mục này nằm ngay sau "song ánh".

> 📐 **Định nghĩa đầy đủ — lực lượng (cardinality)**
>
> **(a) Là gì**: thước đo "số lượng phần tử" của một tập, định nghĩa qua song ánh. $|A| = |B|$ nghĩa là **tồn tại song ánh** $f: A \to B$. Tập **đếm được (countable)** = hữu hạn HOẶC có song ánh với $\mathbb{N} = \{0,1,2,\dots\}$ (xếp được thành dãy $a_0, a_1, a_2,\dots$). Không có song ánh với $\mathbb{N}$ → **không đếm được (uncountable)**.
>
> **(b) Vì sao cần**: với vô hạn, trực giác "tập con thì nhỏ hơn" **sai** — số chẵn là tập con thực sự của $\mathbb{N}$ nhưng **cùng** lực lượng. Cần một định nghĩa chặt (qua song ánh) để so sánh các vô hạn. Kết quả gây sốc: có **nhiều cỡ vô hạn khác nhau** ($\mathbb{R}$ "đông" hơn $\mathbb{N}$).
>
> **(c) Ví dụ số**: song ánh $f:\mathbb{N}\to\{\text{số chẵn}\}$, $f(n)=2n$ chứng tỏ $|\mathbb{N}| = |\text{số chẵn}|$ — dù trực giác thấy số chẵn "chỉ một nửa". Lực lượng đếm được ký hiệu $\aleph_0$ (aleph-không).

### Đếm được: ℕ, ℤ, ℚ

**$\mathbb{Z}$ đếm được** — xếp xen kẽ $0, 1, -1, 2, -2, 3, -3, \dots$ Song ánh tường minh:
$$f(n) = \begin{cases} n/2 & n \text{ chẵn} \\ -(n+1)/2 & n \text{ lẻ} \end{cases}$$
Thử: $f(0)=0$, $f(1)=-1$, $f(2)=1$, $f(3)=-2$, $f(4)=2$ — phủ hết $\mathbb{Z}$, không trùng → song ánh → $\mathbb{Z}$ đếm được ✓.

**$\mathbb{Q}$ (số hữu tỉ) đếm được** — dù "dày đặc" (giữa 2 số hữu tỉ bất kỳ luôn có số hữu tỉ khác). Mẹo Cantor: xếp phân số $p/q$ vào lưới 2 chiều rồi **đi đường chéo (zig-zag)**, bỏ qua phân số rút gọn được trùng:

```
        q=1   q=2   q=3   q=4 ...
  p=1   1/1 → 1/2   1/3 → 1/4
         ↙     ↗     ↙
  p=2   2/1   2/2   2/3   ...
         ↓   ↗     ↙
  p=3   3/1   3/2   ...
         ↙
  p=4   3/1 ...
```
Mọi phân số đều "đến lượt" sau hữu hạn bước → đánh số được → $\mathbb{Q}$ đếm được ✓.

### Không đếm được: ℝ (đường chéo Cantor)

**$\mathbb{R}$ KHÔNG đếm được.** Chứng minh bằng **phản chứng + đường chéo** (chỉ cần khoảng $(0,1)$):

1. Giả sử **ngược lại**: $(0,1)$ đếm được → liệt kê được thành dãy $x_1, x_2, x_3, \dots$, mỗi số viết dạng thập phân vô hạn:
   ```
   x1 = 0. d11 d12 d13 ...
   x2 = 0. d21 d22 d23 ...
   x3 = 0. d31 d32 d33 ...
   ```
2. Dựng số mới $y = 0.e_1 e_2 e_3\dots$ bằng cách **đổi chữ số trên đường chéo**: $e_k \ne d_{kk}$ (vd nếu $d_{kk}=5$ thì $e_k=6$, ngược lại $e_k=5$ — tránh 0 và 9 cho khỏi nhập nhằng).
3. Khi đó $y$ khác $x_1$ ở chữ số 1, khác $x_2$ ở chữ số 2, ..., khác $x_k$ ở chữ số $k$ → $y$ **khác mọi** $x_k$ trong danh sách.
4. Nhưng $y \in (0,1)$ → mâu thuẫn với "đã liệt kê hết". → Giả sử sai → $(0,1)$ **không đếm được** → $\mathbb{R}$ không đếm được ✓.

⚠ **Lỗi thường gặp**: "vô hạn thì đều bằng nhau". Sai — $|\mathbb{N}| = |\mathbb{Z}| = |\mathbb{Q}| = \aleph_0$ (đếm được) **nhỏ hơn thực sự** $|\mathbb{R}|$ (continuum). Có **nhiều** cỡ vô hạn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Số chẵn ít hơn $\mathbb{N}$, sao lại cùng lực lượng?"* Vì có song ánh $n \mapsto 2n$ ghép 1-1 hết. Với vô hạn, "tập con thực sự cùng lực lượng với toàn thể" là chuyện bình thường (nghịch lý khách sạn Hilbert).
- *"Đường chéo Cantor 'tạo ra' số mới ở đâu?"* Nó dựng một số khác **từng số** trong danh sách giả định ở đúng vị trí chéo → không thể nằm trong danh sách → danh sách không thể đầy đủ.

🔁 **Dừng lại tự kiểm tra**: tập các số tự nhiên lẻ $\{1,3,5,\dots\}$ đếm được không? Cho song ánh với $\mathbb{N}$.

<details><summary>Đáp án</summary>

**Đếm được.** Song ánh $f:\mathbb{N}\to\{\text{lẻ}\}$, $f(n) = 2n+1$: $f(0)=1, f(1)=3, f(2)=5,\dots$ — đơn ánh và phủ hết số lẻ ✓.

</details>

### 📝 Tóm tắt mục 6

- Lực lượng định nghĩa qua **song ánh**: $|A|=|B| \iff$ có song ánh $A\to B$.
- Đếm được = hữu hạn hoặc song ánh với $\mathbb{N}$. $\mathbb{N}, \mathbb{Z}, \mathbb{Q}$ đếm được ($\aleph_0$).
- $\mathbb{R}$ **không** đếm được (đường chéo Cantor) — vô hạn "lớn hơn".
- Với vô hạn, tập con thực sự có thể cùng lực lượng với toàn thể (số chẵn vs $\mathbb{N}$).

---

## 7. Bài tập

### Bài tập

**Bài 1**: Lập bảng chân trị cho $p \land (\neg q \lor p)$.

**Bài 2**: Phủ định "Mọi sinh viên đều có máy tính".

**Bài 3**: Cho $A = \{1, 2, 3\}$, $B = \{3, 4\}$. Tính $A \cup B$, $A \cap B$, $A \setminus B$, $A \times B$.

**Bài 4**: $f: \mathbb{R} \to \mathbb{R}$, $f(x) = x^3$. Có đơn ánh không? Toàn ánh? Song ánh?

**Bài 5**: $f: \mathbb{N} \to \mathbb{N}$, $f(n) = 2n$. Đơn ánh? Toàn ánh?

**Bài 6**: Lập bảng chân trị cho $(p \to q) \to p$, rồi nói nó tương đương biểu thức nào gọn hơn.

**Bài 7**: Phủ định mệnh đề "$\forall x \in \mathbb{R}\ \exists y \in \mathbb{R}: x + y = 0$". Mệnh đề gốc đúng hay sai?

**Bài 8**: Chứng minh $(A \cap B)^c = A^c \cup B^c$ bằng membership table.

**Bài 9**: Cho $U=\{1,\dots,10\}$, $A=\{1,2,3,4,5\}$, $B=\{4,5,6,7\}$. Tính $A^c$, $A\cap B$, $(A\cup B)^c$, và kiểm $(A\cup B)^c = A^c\cap B^c$.

**Bài 10**: $f: \mathbb{Z} \to \mathbb{Z}$, $f(n) = 3n + 2$. Đơn ánh? Toàn ánh?

**Bài 11**: Tập các số nguyên là bội của 5, $\{0, \pm5, \pm10,\dots\}$, đếm được không? Cho song ánh với $\mathbb{Z}$.

### Lời giải

**Bài 1**: 

| p | q | $\neg q$ | $\neg q \lor p$ | $p \land (\neg q \lor p)$ |
|---|---|----|------|----------|
| T | T | F  | T    | T        |
| T | F | T  | T    | T        |
| F | T | F  | F    | F        |
| F | F | T  | T    | F        |

⟶ $= p$ (đơn giản hơn).

**Bài 2**: "Tồn tại 1 sinh viên không có máy tính".

**Bài 3**: $A \cup B = \{1,2,3,4\}$. $A \cap B = \{3\}$. $A \setminus B = \{1, 2\}$. $A \times B = \{(1,3),(1,4),(2,3),(2,4),(3,3),(3,4)\}$ — 6 cặp.

**Bài 4**: $f(x) = x^3$ tăng nghiêm ngặt → đơn ánh ✓. $f(\mathbb{R}) = \mathbb{R}$ → toàn ánh ✓. → **Song ánh**. Hàm ngược: $f^{-1}(y) = \sqrt[3]{y}$.

**Bài 5**: Đơn ánh ✓ ($n_1 \neq n_2 \to 2n_1 \neq 2n_2$). Toàn ánh ✗ (số lẻ không có nghịch ảnh).

**Bài 6**: Bảng cho $(p \to q) \to p$:

| p | q | $p \to q$ | $(p \to q) \to p$ |
|---|---|:---:|:---:|
| T | T | T | **T** |
| T | F | F | **T** |
| F | T | T | **F** |
| F | F | T | **F** |

Cột cuối $(T, T, F, F)$ trùng cột $p$ → $(p \to q) \to p \equiv p$ (luật Peirce ở dạng đặc biệt). Verify dòng 3 ($p=F,q=T$): $p\to q = T$, rồi $T \to F = F = p$ ✓.

**Bài 7**: Đổi $\forall \to \exists$, $\exists \to \forall$, phủ định lõi: "$\exists x \in \mathbb{R}\ \forall y \in \mathbb{R}: x + y \ne 0$". Mệnh đề **gốc đúng** (với mọi $x$, chọn $y = -x$ thì $x+y=0$) → phủ định **sai**.

**Bài 8**: Membership table (1 = thuộc):

| $x\in A$ | $x\in B$ | $A\cap B$ | $(A\cap B)^c$ | $A^c$ | $B^c$ | $A^c\cup B^c$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | 1 | 1 | **0** | 0 | 0 | **0** |
| 1 | 0 | 0 | **1** | 0 | 1 | **1** |
| 0 | 1 | 0 | **1** | 1 | 0 | **1** |
| 0 | 0 | 0 | **1** | 1 | 1 | **1** |

Cột $(A\cap B)^c$ = cột $A^c\cup B^c$ ở cả 4 dòng $(0,1,1,1)$ → hai tập bằng nhau ✓.

**Bài 9**:
- $A^c = U\setminus A = \{6,7,8,9,10\}$.
- $A\cap B = \{4,5\}$.
- $A\cup B = \{1,2,3,4,5,6,7\}$ → $(A\cup B)^c = \{8,9,10\}$.
- Kiểm: $B^c = \{1,2,3,8,9,10\}$; $A^c\cap B^c = \{6,7,8,9,10\}\cap\{1,2,3,8,9,10\} = \{8,9,10\}$ = $(A\cup B)^c$ ✓.

**Bài 10**: 
- Đơn ánh: giả sử $3n_1+2 = 3n_2+2 \Rightarrow 3n_1 = 3n_2 \Rightarrow n_1 = n_2$ ✓.
- Toàn ánh: cần $3n+2 = b \Rightarrow n = (b-2)/3$. Thử $b=4$: $n=2/3 \notin \mathbb{Z}$ → **không toàn ánh** (ảnh chỉ là các số $\equiv 2 \pmod 3$).

**Bài 11**: **Đếm được.** Song ánh $f:\mathbb{Z}\to\{\text{bội của }5\}$, $f(k) = 5k$: $f(0)=0, f(1)=5, f(-1)=-5,\dots$ — đơn ánh ($5k_1=5k_2\Rightarrow k_1=k_2$) và phủ hết bội của 5 → song ánh. Vì $\mathbb{Z}$ đếm được nên tập này cũng đếm được.

---

## 8. Bài tiếp theo

[Lesson 08 — Phương pháp chứng minh](../lesson-08-proof-methods/).

> 🔗 **Móc nối**: De Morgan, phủ định lượng từ và phản chứng (đường chéo Cantor ở mục 6) là **công cụ** cho mọi chứng minh ở Lesson 08. "Phủ định mệnh đề cần chứng minh rồi tìm mâu thuẫn" chính là kỹ thuật phản chứng.

## 📝 Tổng kết

1. **Logic**: $\neg, \land, \lor, \to, \leftrightarrow$. Bảng chân trị ($2^n$ dòng). De Morgan: $\neg(p \land q) = \neg p \lor \neg q$. $p\to q \equiv \neg p\lor q$; tương đương phản đảo, KHÔNG phải đảo hay $\leftrightarrow$.
2. **Lượng từ**: $\neg\forall = \exists\neg$, $\neg\exists = \forall\neg$ (đổi từ ngoài vào trong, phủ định lõi). Thứ tự $\forall\exists \ne \exists\forall$.
3. **Tập hợp**: $\cup, \cap, \setminus, c, \times$. Tương đồng với logic; De Morgan tập chứng minh bằng membership table/Venn. Bao hàm–loại trừ $|A\cup B|=|A|+|B|-|A\cap B|$.
4. **Quan hệ**: phản xạ / đối xứng / bắc cầu; tương đương → chia lớp.
5. **Ánh xạ**: đơn ánh (1-1), toàn ánh (onto), song ánh (1-1 onto). Hàm ngược **chỉ tồn tại** khi f là song ánh.
6. **Lực lượng**: định nghĩa qua song ánh; $\mathbb{N},\mathbb{Z},\mathbb{Q}$ đếm được, $\mathbb{R}$ không đếm được (đường chéo Cantor).
