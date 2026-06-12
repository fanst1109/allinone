# Lesson 03 — Hoán vị & Tổ hợp

## Mục tiêu

- Hiểu **quy tắc cộng, nhân** đếm.
- **Hoán vị** (permutation), **chỉnh hợp**, **tổ hợp** (combination).
- Phân biệt: thứ tự có quan trọng không? có lặp không?
- Áp dụng vào xác suất.

## Kiến thức tiền đề

- Đại số cơ bản.

---

## 1. Hai quy tắc đếm cơ bản

💡 **Trực giác / Hình dung**: phân biệt bằng từ nối. "**HOẶC**" (chọn 1 trong các lựa chọn rời nhau) → **cộng**. "**RỒI / VÀ**" (làm lần lượt từng giai đoạn) → **nhân**. Đi ăn: "món chính HOẶC món chay" → cộng số lựa chọn; "món chính RỒI tráng miệng" → nhân.

### 1.1. Quy tắc cộng (OR)
Nếu A có $m$ cách và B có $n$ cách, **A hoặc B** (không trùng) có **$m + n$** cách.

### 1.2. Quy tắc nhân (AND)
Nếu A có $m$ cách và B có $n$ cách, **A rồi B** có **$m \cdot n$** cách.

**4 ví dụ số đa dạng**:
- Nhân: 3 món chính RỒI 4 tráng miệng → $3 \cdot 4 = 12$ bộ.
- Cộng: đi từ HN tới HCM bằng 2 chuyến bay HOẶC 3 chuyến tàu → $2+3 = 5$ cách.
- Nhân nhiều giai đoạn: mã PIN 4 chữ số (0–9), mỗi vị trí 10 cách → $10 \cdot 10 \cdot 10 \cdot 10 = 10^4 = 10000$.
- Kết hợp: chọn (áo: 3 cái) RỒI (quần: 2 cái) cho thứ Hai HOẶC thứ Ba → $(3 \cdot 2) + (3 \cdot 2) = 12$.

#### 1.2.1. Vì sao "nhân" — cây đếm (counting tree)

💡 **Trực giác — vẽ cây để thấy phép nhân**: quy tắc nhân không phải "phép thuật". Nó chỉ là *đếm số lá của một cái cây phân nhánh*. Mỗi giai đoạn = một tầng của cây; mỗi lựa chọn = một nhánh. Ví dụ chọn **2 áo** ($A_1, A_2$) RỒI **3 quần** ($Q_1, Q_2, Q_3$):

```
            (gốc)
           /     \
         A1       A2          ← tầng 1: chọn áo (2 nhánh)
        /|\       /|\
      Q1 Q2 Q3  Q1 Q2 Q3      ← tầng 2: mỗi áo lại tỏa 3 nhánh quần
```

Đếm số **lá** (đường đi từ gốc xuống đáy): mỗi nhánh áo (2 nhánh) đẻ ra 3 nhánh quần → $2 \times 3 = 6$ lá = 6 bộ trang phục: $(A_1Q_1), (A_1Q_2), (A_1Q_3), (A_2Q_1), (A_2Q_2), (A_2Q_3)$. Tổng quát: tầng 1 có $m$ nhánh, mỗi nhánh đẻ $n$ nhánh con → $m \cdot n$ lá. Đây là **toàn bộ lý do** quy tắc nhân đúng — không cần thuộc lòng, chỉ cần nhớ "đếm lá cây".

#### 1.2.2. Walk-through phép đếm nhiều giai đoạn — biển số xe

Đếm biển số dạng **1 chữ cái (A–Z) RỒI 4 chữ số (0–9), cho phép lặp**. Đi từng giai đoạn, mỗi giai đoạn là một thừa số:

| Giai đoạn | Vị trí | Số lựa chọn | Vì sao |
|-----------|--------|:-----------:|--------|
| 1 | chữ cái | $26$ | A đến Z |
| 2 | số thứ 1 | $10$ | 0–9, lặp được |
| 3 | số thứ 2 | $10$ | 0–9, lặp được |
| 4 | số thứ 3 | $10$ | 0–9, lặp được |
| 5 | số thứ 4 | $10$ | 0–9, lặp được |

Nhân tất cả: $26 \cdot 10 \cdot 10 \cdot 10 \cdot 10 = 26 \cdot 10^4 = \mathbf{260{,}000}$ biển số.

**Biến thể "4 chữ số khác nhau"** (không lặp): số thứ 1 còn 10 lựa chọn, số thứ 2 chỉ còn 9 (đã dùng 1), số thứ 3 còn 8, số thứ 4 còn 7 → $26 \cdot 10 \cdot 9 \cdot 8 \cdot 7 = 26 \cdot 5040 = \mathbf{131{,}040}$. Để ý: phần "$10 \cdot 9 \cdot 8 \cdot 7$" chính là chỉnh hợp $A(10,4)$ — đây là cầu nối tự nhiên sang mục 3.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào cộng, khi nào nhân?"* Cộng khi các lựa chọn **loại trừ nhau** (chỉ chọn 1 nhóm). Nhân khi phải làm **tất cả các bước** liên tiếp. Mẹo: "hoặc" → $+$, "và rồi" → $\times$.
- *"Quy tắc cộng cần điều kiện gì?"* Các nhóm phải **không trùng** (rời nhau). Nếu trùng phải dùng bù trừ (L05): $|A \cup B| = |A|+|B|-|A \cap B|$.

⚠ **Lỗi thường gặp**: nhân khi đáng lẽ cộng (hoặc ngược lại). Phản ví dụ: "chọn 1 món ăn từ thực đơn 3 món Việt HOẶC 4 món Nhật" → $3+4 = 7$ (cộng, vì chỉ chọn 1 món), KHÔNG phải $3 \cdot 4 = 12$.

🔁 **Dừng lại tự kiểm tra**

1. Biển số có 1 chữ cái (26) rồi 3 chữ số (0–9). Bao nhiêu biển?
2. Đi làm bằng (xe buýt: 2 tuyến) HOẶC (tàu: 1 tuyến). Bao nhiêu cách?

<details><summary>Đáp án</summary>

1. $26 \cdot 10 \cdot 10 \cdot 10 = 26000$ (nhân, các giai đoạn).
2. $2+1 = 3$ (cộng, loại trừ nhau).

</details>

### 📝 Tóm tắt mục 1

- "HOẶC" (rời nhau) → **cộng** $m+n$; "RỒI/VÀ" (lần lượt) → **nhân** $m \cdot n$.
- Quy tắc cộng đòi các nhóm không trùng.
- Nhiều giai đoạn độc lập → nhân tất cả (vd PIN $10^4$).

---

## 2. Hoán vị (Permutation) — Sắp xếp tất cả

💡 **Trực giác / Hình dung**: hoán vị = "xếp hàng". Có $n$ người xếp thành 1 hàng: chỗ đầu chọn 1 trong $n$ người, chỗ thứ hai 1 trong $(n-1)$ người còn lại,... Nhân các lựa chọn giảm dần → $n!$. Mỗi cách xếp hàng khác nhau là 1 hoán vị.

**Định nghĩa**: Hoán vị của $n$ phần tử = số cách sắp xếp tất cả $n$ phần tử thành dãy có thứ tự.

$$P(n) = n! = n \cdot (n-1) \cdot (n-2) \cdot \ldots \cdot 2 \cdot 1$$

**4 ví dụ số đa dạng**:
- Sắp 5 cuốn sách: $5! = 120$.
- Sắp 3 người: $3! = 6$ (liệt kê được: ABC, ACB, BAC, BCA, CAB, CBA).
- Sắp 1 vật: $1! = 1$.
- "Không sắp gì": $0! = 1$ (quy ước, dãy rỗng).

**Giải thích**: vị trí 1 có 5 cách, vị trí 2 có 4 (còn 4 sách), ..., vị trí 5 có 1. Nhân lại: $5 \cdot 4 \cdot 3 \cdot 2 \cdot 1$.

#### 2.0.1. Cây đếm cho hoán vị 3 phần tử {A, B, C}

Hoán vị cũng là "đếm lá cây", chỉ khác cây đếm thường ở chỗ **số nhánh giảm dần mỗi tầng** (vì phần tử đã dùng không chọn lại được):

```
                 (gốc)
        /          |          \
       A           B           C        ← chỗ 1: 3 nhánh
      / \         / \         / \
     B   C       A   C       A   B       ← chỗ 2: còn 2 nhánh (bỏ phần tử đã dùng)
     |   |       |   |       |   |
     C   B       C   A       B   A       ← chỗ 3: còn 1 nhánh
   ─────────────────────────────────
   ABC ACB     BAC BCA     CAB CBA       ← 6 lá = 3! hoán vị
```

Đếm lá: $3 \times 2 \times 1 = 3! = 6$. Mỗi tầng "tiêu" mất 1 lựa chọn → tích các số giảm dần $n(n-1)\cdots 1 = n!$. Đây là vì sao hoán vị dùng giai thừa chứ không phải lũy thừa.

#### 2.0.2. Walk-through 4 ví dụ hoán vị (đếm từng bước)

**Ví dụ 1 — xếp 4 người vào 4 ghế hàng ngang.** Ghế 1: 4 người. Ghế 2: còn 3. Ghế 3: còn 2. Ghế 4: còn 1. → $4 \cdot 3 \cdot 2 \cdot 1 = 4! = \mathbf{24}$.

**Ví dụ 2 — xếp 5 lá cờ khác màu thành 1 cột.** Mỗi vị trí dùng 1 lá chưa dùng: $5 \cdot 4 \cdot 3 \cdot 2 \cdot 1 = 5! = \mathbf{120}$.

**Ví dụ 3 — hoán vị có ràng buộc "A và B đứng cạnh nhau"** trong 4 người {A, B, C, D}. Mẹo "buộc dây": coi cặp (A,B) như **một khối** → còn 3 đối tượng [AB], C, D xếp $3! = 6$ cách; bên trong khối AB có thể đảo thành BA → $\times 2! = 2$. Tổng $6 \cdot 2 = \mathbf{12}$ (trên tổng $4! = 24$ cách xếp tự do, đúng một nửa).

**Ví dụ 4 — hoán vị tròn (xếp 4 người quanh bàn tròn).** Khi xếp vòng tròn, *xoay cả bàn không tạo cách mới*. Cố định 1 người làm mốc, xếp 3 người còn lại → $(4-1)! = 3! = \mathbf{6}$. Công thức hoán vị tròn: $(n-1)!$.

### Quy ước
**$0! = 1$** (chỉ có 1 cách "không sắp xếp gì": dãy rỗng).

#### 2.0.3. Walk-through hoán vị có phần tử lặp — "BANANA"

Chữ "BANANA" có 6 ký tự: **3 chữ A, 2 chữ N, 1 chữ B**. Nếu cả 6 đều khác nhau thì có $6! = 720$ cách. Nhưng đổi chỗ 2 chữ A bất kỳ *không* tạo từ mới — nên ta đã **đếm thừa**. Mỗi cách sắp "thật" bị đếm lặp $3!$ lần (do 3 chữ A hoán vị nội bộ) $\times\ 2!$ lần (do 2 chữ N) → chia ra:

$$\frac{6!}{3! \cdot 2! \cdot 1!} = \frac{720}{6 \cdot 2 \cdot 1} = \frac{720}{12} = \mathbf{60}$$

Tổng quát (hoán vị lặp / multinomial): $n$ vật với các nhóm trùng kích thước $n_1, n_2, \ldots, n_r$ ($\sum n_i = n$) cho $\dfrac{n!}{n_1!\,n_2!\cdots n_r!}$ cách.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $0! = 1$ chứ không phải 0?"* Để công thức $C(n,k) = n!/(k!(n-k)!)$ còn đúng khi $k = 0$ hoặc $k = n$: $C(5,0) = 5!/(0! \cdot 5!) = 1$ cần $0! = 1$. Đó là quy ước giữ công thức nhất quán, ngoài ra "có đúng 1 cách sắp xếp dãy rỗng".
- *"Hoán vị có vật giống nhau thì sao?"* Phải chia cho giai thừa số vật trùng. Vd sắp chữ "MISSISSIPPI" (11 chữ, 4 S, 4 I, 2 P): $11!/(4! \cdot 4! \cdot 2!)$, KHÔNG phải $11!$.

⚠ **Lỗi thường gặp**: dùng $n!$ khi có phần tử lặp. Phản ví dụ: số cách sắp chữ "AAB" KHÔNG phải $3! = 6$ mà là $3!/2! = 3$ (AAB, ABA, BAA) — vì 2 chữ A giống nhau, đổi chỗ chúng không tạo cách mới.

🔁 **Dừng lại tự kiểm tra**

1. Bao nhiêu cách sắp 6 người vào 6 ghế hàng ngang?
2. Bao nhiêu "từ" khác nhau từ các chữ của "BOOK"?

<details><summary>Đáp án</summary>

1. $6! = 720$.
2. 4 chữ, 2 chữ O trùng → $4!/2! = 12$.

</details>

### 📝 Tóm tắt mục 2

- Hoán vị = sắp **tất cả** $n$ phần tử có thứ tự = $n!$.
- $0! = 1$ (quy ước giữ công thức nhất quán).
- Có phần tử lặp → chia cho giai thừa số lần lặp (vd MISSISSIPPI).

---

## 3. Chỉnh hợp (Permutation k of n) — Sắp xếp k trong n

💡 **Trực giác / Hình dung**: chỉnh hợp = "xếp hàng nhưng chỉ chọn k chỗ". Trao huy chương vàng-bạc-đồng cho 10 VĐV: chỗ vàng 10 cách, bạc 9, đồng 8 → $10 \cdot 9 \cdot 8$. Vẫn là xếp hàng (thứ tự quan trọng), nhưng dừng sau k bước thay vì hết n.

**Định nghĩa**: Chọn $k$ phần tử từ $n$ và **sắp xếp** chúng. Thứ tự quan trọng.

$$A(n, k) = \frac{n!}{(n-k)!} = n \cdot (n-1) \cdot \ldots \cdot (n-k+1)$$

**4 ví dụ số đa dạng**:
- $A(10, 3) = 10 \cdot 9 \cdot 8 = 720$ (huy chương V-B-Đ).
- $A(5, 2) = 5 \cdot 4 = 20$ (chọn + sắp 2 trong 5).
- $A(5, 5) = 5! = 120$ ($k = n$ → thành hoán vị).
- $A(n, 1) = n$ (chọn 1 phần tử có $n$ cách).

⟶ Thứ tự khác nhau (V-B-Đ khác B-V-Đ) → chỉnh hợp.

#### 3.0.1. Walk-through 4 ví dụ chỉnh hợp (đếm từng vị trí)

**Ví dụ 1 — trao 3 huy chương V–B–Đ cho 10 VĐV.** Vàng: 10 lựa chọn. Bạc: còn 9. Đồng: còn 8. → $A(10,3) = 10 \cdot 9 \cdot 8 = \mathbf{720}$. (Verify công thức: $A(10,3) = 10!/7! = 3{,}628{,}800/5040 = 720$ ✓.)

**Ví dụ 2 — bầu Chủ tịch + Phó CT từ 7 người.** Chủ tịch: 7 lựa chọn. Phó: còn 6 (không kiêm). → $A(7,2) = 7 \cdot 6 = \mathbf{42}$. Thứ tự quan trọng vì "An CT, Bình PCT" khác "Bình CT, An PCT".

**Ví dụ 3 — số có 3 chữ số khác nhau từ {1,2,3,4,5}.** Hàng trăm: 5. Hàng chục: còn 4. Hàng đơn vị: còn 3. → $A(5,3) = 5 \cdot 4 \cdot 3 = \mathbf{60}$ số.

**Ví dụ 4 — xếp 5 cuốn sách vào 8 ô kệ (mỗi ô tối đa 1 cuốn).** Sách 1: 8 ô. Sách 2: còn 7 ô. ... Sách 5: còn 4 ô. → $A(8,5) = 8 \cdot 7 \cdot 6 \cdot 5 \cdot 4 = \mathbf{6720}$. (Verify: $A(8,5) = 8!/3! = 40320/6 = 6720$ ✓.)

❓ **Câu hỏi tự nhiên của người đọc**

- *"Chỉnh hợp khác hoán vị chỗ nào?"* Hoán vị xếp **toàn bộ** $n$ ($P(n) = n!$); chỉnh hợp chỉ xếp **k chọn ra** ($A(n,k)$). Khi $k = n$, chỉnh hợp = hoán vị: $A(n,n) = n!/0! = n!$.
- *"Vì sao công thức là $n!/(n-k)!$?"* $A(n,k) = n \cdot (n-1) \cdot \ldots \cdot (n-k+1)$ ($k$ thừa số giảm dần). Viết gọn: nhân thêm rồi chia phần thừa $(n-k)!$ → $n!/(n-k)!$. Vd $A(5,2) = 5!/3! = 120/6 = 20$ ✓.

⚠ **Lỗi thường gặp**: dùng chỉnh hợp (A) khi thứ tự KHÔNG quan trọng (đáng lẽ dùng tổ hợp C). Phản ví dụ: "chọn 3 người vào ban kiểm tra (vai như nhau)" KHÔNG phải $A(10,3) = 720$ mà là $C(10,3) = 120$ — vì ABC, ACB... cùng 1 ban.

🔁 **Dừng lại tự kiểm tra**

1. Từ 8 ngựa, có bao nhiêu cách xếp hạng nhất–nhì–ba?
2. $A(6, 2) = ?$

<details><summary>Đáp án</summary>

1. $A(8,3) = 8 \cdot 7 \cdot 6 = 336$.
2. $A(6,2) = 6 \cdot 5 = 30$.

</details>

### 📝 Tóm tắt mục 3

- Chỉnh hợp = chọn $k$ RỒI **sắp xếp** (thứ tự quan trọng) = $n!/(n-k)!$.
- $A(n,n) = n!$ (thành hoán vị); $A(n,1) = n$.
- Thứ tự KHÔNG quan trọng → dùng tổ hợp C, không phải A.

---

## 4. Tổ hợp (Combination) — Chọn k trong n

💡 **Trực giác / Hình dung**: tổ hợp = "bốc 1 nắm, không xếp hàng". Chọn 3 bạn vào 1 nhóm (vai như nhau): bạn không quan tâm ai đứng trước ai. Chính là chỉnh hợp (có sắp xếp) nhưng **gộp lại** mọi cách sắp xếp của cùng 1 nhóm — nên chia cho $k!$ (số cách sắp k người).

**Định nghĩa**: Chọn $k$ phần tử từ $n$, **không quan tâm thứ tự**.

$$C(n, k) = \frac{n!}{k! \cdot (n-k)!} = \frac{A(n,k)}{k!}$$

Ký hiệu khác: **(n choose k)** hoặc $nCk$ hoặc $C^k_n$.

**4 ví dụ số đa dạng**:
- $C(10, 3) = 720/6 = 120$ (chọn 3 trong 10, không phân vai).
- $C(5, 2) = 10$ (liệt kê được: $\{12,13,14,15,23,24,25,34,35,45\}$).
- $C(n, 0) = 1$ và $C(n, n) = 1$ (1 cách chọn rỗng / chọn hết).
- $C(52, 5) = 2{,}598{,}960$ (số tay bài poker).

⟶ So với chỉnh hợp (720), tổ hợp ít hơn $k!$ lần (vì các thứ tự khác nhau gộp thành 1).

#### 4.0.1. Vì sao chia cho $k!$ — đếm trực tiếp với {A, B, C, D} chọn 2

Cách rõ nhất để *thấy* công thức $C = A/k!$ là liệt kê thật. Chọn 2 trong 4 người {A, B, C, D}.

**Chỉnh hợp** (thứ tự quan trọng — "ghế chủ tịch / phó") có $A(4,2) = 4 \cdot 3 = 12$ cách:

```
 AB  AC  AD  BC  BD  CD       ← 6 cặp, đọc theo thứ tự thuận
 BA  CA  DA  CB  DB  DC       ← 6 cặp, là 6 cặp trên ĐẢO thứ tự
```

**Tổ hợp** (không thứ tự — "vào cùng 1 nhóm") gộp mỗi CỘT thành 1: AB = BA, AC = CA, ... → còn đúng **6** nhóm: $\{AB, AC, AD, BC, BD, CD\}$. Mỗi nhóm 2 người bị chỉnh hợp đếm $2! = 2$ lần (2 thứ tự), nên:

$$C(4,2) = \frac{A(4,2)}{2!} = \frac{12}{2} = 6.$$

Tổng quát: mỗi nhóm $k$ phần tử có $k!$ cách sắp thứ tự; chỉnh hợp đếm cả $k!$, tổ hợp gộp lại còn 1 → chia $k!$.

#### 4.0.2. Walk-through 4 ví dụ tổ hợp (đếm từng bước)

**Ví dụ 1 — chọn 3 trong 10 người vào ban (vai như nhau).** $C(10,3) = \dfrac{A(10,3)}{3!} = \dfrac{720}{6} = \mathbf{120}$. Hoặc dùng công thức gốc: $\dfrac{10!}{3!\,7!} = \dfrac{10 \cdot 9 \cdot 8}{6} = \dfrac{720}{6} = 120$ ✓.

**Ví dụ 2 — chọn 2 trong 6 đội đá 1 trận (A đá B = B đá A).** $C(6,2) = \dfrac{6 \cdot 5}{2!} = \dfrac{30}{2} = \mathbf{15}$ trận.

**Ví dụ 3 — chọn 5 lá từ bộ 52 lá (tay bài poker).** $C(52,5) = \dfrac{52 \cdot 51 \cdot 50 \cdot 49 \cdot 48}{5!} = \dfrac{311{,}875{,}200}{120} = \mathbf{2{,}598{,}960}$.

**Ví dụ 4 — dùng đối xứng cho gọn: $C(20,18)$.** Tính trực tiếp phải nhân 18 thừa số. Dùng $C(n,k) = C(n,n-k)$: $C(20,18) = C(20,2) = \dfrac{20 \cdot 19}{2} = \mathbf{190}$. Bài học: khi $k$ lớn gần $n$, đổi sang $n-k$ nhỏ để tính nhanh.

> 📐 **Định nghĩa đầy đủ — $C(n, k)$ — Tổ hợp**
>
> **(a) Là gì**: Số cách chọn 1 tập con $k$ phần tử từ tập $n$ phần tử, **không quan tâm thứ tự**. Công thức $= n!/(k! \cdot (n-k)!)$. Khác chỉnh hợp $A(n,k)$: tổ hợp "BCD = BDC = CDB" tất cả tính 1 cách, chỉnh hợp coi 6 cách khác nhau.
>
> **(b) Vì sao cần**: Mọi bài toán đếm "chọn nhóm không phân vai" → tổ hợp. Xác suất rút bài (đếm tay), xổ số (chọn 6/45), số tập con của tập $n$ ($= 2^n = \sum C(n,k)$), khai triển nhị thức Newton (hệ số $= C(n,k)$), thiết kế thí nghiệm. Trong xác suất nhị thức $P(X=k) = C(n,k) \cdot p^k \cdot (1-p)^{n-k}$ — phân phối quan trọng nhất rời rạc.
>
> **(c) Ví dụ số**: $C(10, 3) = 120$. Kiểm: $A(10,3) = 720$, chia $3! = 6$ → 120 ✓. $C(52, 5) = 2{,}598{,}960$ (số tay bài poker). $C(5, 0) = 1$, $C(5, 5) = 1$, $C(5, 1) = C(5, 4) = 5$ (đối xứng), $C(5, 2) = C(5, 3) = 10$. Tổng tầng 5 Pascal $= 1+5+10+10+5+1 = 32 = 2^5$ ✓. Vietlott 6/45: $C(45, 6) = $ **8,145,060** → xác suất trúng $1/8.1\text{M} \approx 1.23 \cdot 10^{-7}$.

### Tính chất

- $C(n, 0) = C(n, n) = 1$.
- $C(n, k) = C(n, n-k)$ (đối xứng).
- $C(n, k) = C(n-1, k-1) + C(n-1, k)$ (công thức Pascal).

**Ví dụ Pascal**: $C(5, 2) = C(4, 1) + C(4, 2) = 4 + 6 = $ **10**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $C(n,k) = C(n,n-k)$?"* Vì **chọn $k$ phần tử để LẤY** tương đương **chọn $(n-k)$ phần tử để BỎ** — mỗi cách lấy ứng đúng 1 cách bỏ. Vd $C(10,3) = C(10,7) = 120$: chọn 3 người vào nhóm = chọn 7 người ở ngoài.
- *"$C(n,k) = A(n,k)/k!$ từ đâu ra?"* Mỗi tổ hợp $k$ phần tử có $k!$ cách sắp thành chỉnh hợp. Nên $A(n,k) = C(n,k) \cdot k!$ → $C = A/k!$. Verify: $C(5,2) = A(5,2)/2! = 20/2 = 10$ ✓.

⚠ **Lỗi thường gặp — lẫn tổ hợp C (không thứ tự) với chỉnh hợp A (có thứ tự)**. Hỏi "chọn 2 trong 4 để **bắt tay**" → tổ hợp $C(4,2) = 6$ (bắt tay A-B = B-A). Hỏi "chọn 2 trong 4 làm **chủ tịch + phó**" → chỉnh hợp $A(4,2) = 12$ (A chủ tịch khác B chủ tịch). Cùng "chọn 2 trong 4" nhưng đáp án khác nhau gấp đôi vì thứ tự!

🔁 **Dừng lại tự kiểm tra**

1. $C(7, 5) = ?$ (mẹo: dùng đối xứng).
2. 6 đội bóng đá vòng tròn, mỗi cặp đá 1 trận. Bao nhiêu trận?

<details><summary>Đáp án</summary>

1. $C(7,5) = C(7,2) = 21$.
2. Chọn 2 đội (không thứ tự, A đá B = B đá A): $C(6,2) = 15$ trận.

</details>

### 📝 Tóm tắt mục 4

- Tổ hợp = chọn $k$ **không thứ tự** = $n!/(k!(n-k)!) = A(n,k)/k!$.
- Đối xứng $C(n,k) = C(n,n-k)$; Pascal $C(n,k) = C(n-1,k-1)+C(n-1,k)$.
- Phân biệt sống còn: thứ tự quan trọng → A; không quan trọng → C.

---

## 5. Tóm tắt — Phân biệt 4 trường hợp

| Trường hợp | Thứ tự? | Lặp? | Công thức |
|------------|---------|------|-----------|
| Hoán vị | Có | Không | $n!$ |
| Chỉnh hợp | Có | Không | $A(n,k) = n!/(n-k)!$ |
| Tổ hợp | Không | Không | $C(n,k) = n!/(k!(n-k)!)$ |
| Chỉnh hợp lặp | Có | Có | $n^k$ |
| Tổ hợp lặp | Không | Có | $C(n+k-1, k)$ |

**Mẹo nhớ**:
- "Sắp xếp" → có thứ tự → hoán vị/chỉnh hợp.
- "Chọn nhóm" → không thứ tự → tổ hợp.

💡 **Trực giác / Hình dung 2 câu hỏi quyết định**: trước mọi bài đếm, tự hỏi (1) **thứ tự có quan trọng không?** (2) **có được lặp lại không?**. Hai câu trả lời chọn đúng 1 ô trong bảng trên.

#### 5.0.1. Cây quyết định "dùng công thức nào"

Khi gặp một bài đếm, chạy lần lượt 2 câu hỏi như sơ đồ dưới — mỗi lá là đúng 1 công thức:

```
                     "Đếm số cách chọn/sắp k vật từ n loại"
                                   │
                ┌──────────────────┴──────────────────┐
        Thứ tự CÓ quan trọng?                  Thứ tự KHÔNG quan trọng?
        (đổi chỗ ⇒ cách khác)                  (đổi chỗ ⇒ cùng cách)
                │                                      │
        ┌───────┴────────┐                     ┌───────┴────────┐
     Lặp?              Không lặp?            Lặp?              Không lặp?
       │                  │                   │                   │
  ┌────┴────┐        ┌────┴────┐         ┌────┴────┐         ┌────┴────┐
  │  n^k    │        │ A(n,k)  │         │C(n+k-1,k)│        │ C(n,k)  │
  │(PIN,    │        │=n!/(n-k)!│        │(mua bánh │         │=n!/     │
  │ biển số)│        │(huy chương)│      │ nhiều loại)│       │(k!(n-k)!)│
  └─────────┘        └─────────┘         └─────────┘         └─────────┘
                                                              (chọn nhóm,
                                                               xổ số)
  Nếu k = n và không lặp, có thứ tự ⇒ hoán vị n! (trường hợp riêng của A(n,k)).
```

**Bảng tra cứu nhanh** (kèm câu hỏi tự đặt + ví dụ chuẩn):

| Câu hỏi tự đặt | Thứ tự | Lặp | Công thức | Ví dụ chuẩn |
|----------------|:------:|:---:|-----------|-------------|
| "Sắp **hết** n vật, không lặp?" | Có | Không | $n!$ | Xếp 5 sách lên kệ |
| "Sắp **k chọn ra**, có vai/hạng?" | Có | Không | $A(n,k) = \dfrac{n!}{(n-k)!}$ | Huy chương V–B–Đ |
| "Chọn **nhóm** k, vai như nhau?" | Không | Không | $C(n,k) = \dfrac{n!}{k!(n-k)!}$ | Chọn 3 vào ban |
| "Mỗi vị trí **chọn lại tự do**?" | Có | Có | $n^k$ | Mã PIN, biển số |
| "Mua k vật từ n loại, lấy trùng?" | Không | Có | $C(n+k-1, k)$ | Mua 5 bánh / 3 loại |

⚠ **Lỗi thường gặp — đọc nhầm "vai trò" thành "không vai"**. Mẹo: nếu các vị trí có **tên riêng** (chủ tịch, hạng nhất, hàng trăm) → thứ tự quan trọng → A hoặc $n^k$. Nếu chỉ "vào cùng 1 rổ" → C.

❓ **Câu hỏi tự nhiên của người đọc**

- *"'Có lặp' nghĩa là gì?"* Là 1 phần tử được chọn lại nhiều lần. Mã PIN $1131$ có lặp (số 1 dùng 3 lần) → $10^4$. Chọn 3 người khác nhau vào ban → không lặp → C hoặc A.
- *"Tổ hợp lặp $C(n+k-1, k)$ áp dụng khi nào?"* Khi chọn $k$ vật từ $n$ loại, được lấy trùng loại, không quan tâm thứ tự. Vd mua 5 cái bánh từ 3 loại: $C(3+5-1, 5) = C(7,5) = 21$ cách.

⚠ **Lỗi thường gặp — nhầm "có lặp" và "không lặp"**. Phản ví dụ: "mã số 3 chữ số khác nhau" $= A(10,3) = 720$ (không lặp), nhưng "mã số 3 chữ số bất kỳ" $= 10^3 = 1000$ (có lặp). Đọc kỹ đề có chữ "khác nhau" hay không.

#### 5.1. Tổ hợp lặp & phương pháp "sao và vách ngăn" (stars and bars)

💡 **Trực giác**: tổ hợp lặp đếm cách *"mua $k$ vật từ $n$ loại, lấy trùng loại tùy thích, không quan tâm thứ tự bỏ vào giỏ"*. Khác tổ hợp thường: ở đây 1 loại được chọn nhiều lần. Công thức: $C(n+k-1, k)$.

**Vì sao là $C(n+k-1,k)$ — kỹ thuật "sao và vách ngăn"**: biểu diễn lựa chọn bằng $k$ ngôi sao ⋆ (mỗi sao = 1 vật mua) và $n-1$ vách `|` (chia $n$ loại). Vd mua $k=3$ bánh từ $n=3$ loại (A, B, C):

```
   ⋆⋆ | ⋆ |        →  2 bánh A, 1 bánh B, 0 bánh C
   ⋆ | ⋆ | ⋆       →  1 mỗi loại
   | | ⋆⋆⋆         →  0 A, 0 B, 3 bánh C
   ⋆⋆⋆ | |         →  3 bánh A
```

Mỗi cách mua ↔ một cách sắp $k$ sao và $n-1$ vách trên hàng $k+(n-1)$ ô. Chọn chỗ cho $k$ ngôi sao trong $k+n-1$ ô: $C(k+n-1, k)$. Với ví dụ: $C(3+3-1, 3) = C(5,3) = \dfrac{5 \cdot 4 \cdot 3}{3!} = 10$ cách.

**4 ví dụ số đa dạng**:
- Mua 5 bánh từ 3 loại: $C(3+5-1, 5) = C(7,5) = C(7,2) = 21$.
- Mua 2 vật từ 4 loại: $C(4+2-1, 2) = C(5,2) = 10$.
- Chia 4 cái kẹo giống hệt cho 2 đứa trẻ (mỗi đứa $\ge 0$): $C(2+4-1, 4) = C(5,4) = 5$ — đúng là $(0{,}4),(1{,}3),(2{,}2),(3{,}1),(4{,}0)$.
- Số nghiệm nguyên không âm của $x_1+x_2+x_3 = 6$: $C(3+6-1, 6) = C(8,6) = C(8,2) = 28$.

⚠ **Lỗi thường gặp — dùng $n^k$ thay vì $C(n+k-1,k)$**. $n^k$ là khi **có thứ tự** (vị trí phân biệt, vd mã PIN); tổ hợp lặp là khi **không thứ tự** (giỏ hàng — "2 bánh A rồi 1 B" giống "1 B rồi 2 A"). Mua 3 bánh từ 3 loại: tổ hợp lặp $C(5,3)=10$, KHÔNG phải $3^3 = 27$.

🔁 **Dừng lại tự kiểm tra**

1. Khoá số 4 chữ số (0–9), cho phép lặp. Bao nhiêu mã?
2. Xếp 4 người khác nhau thành 1 hàng. Bao nhiêu cách?

<details><summary>Đáp án</summary>

1. Có thứ tự + có lặp → $10^4 = 10000$.
2. Có thứ tự + không lặp + dùng hết → hoán vị $4! = 24$.

</details>

### 📝 Tóm tắt mục 5

- 2 câu quyết định: **thứ tự?** và **lặp?** → chọn đúng công thức.
- Không lặp: hoán vị $n!$, chỉnh hợp $A(n,k)$, tổ hợp $C(n,k)$.
- Có lặp: chỉnh hợp lặp $n^k$, tổ hợp lặp $C(n+k-1, k)$.

---

## 6. Ví dụ ứng dụng

### 6.1. Mật khẩu

Mật khẩu 4 chữ số (0-9), cho phép lặp: **$10^4 = 10{,}000$** mật khẩu.

Mật khẩu 4 chữ số khác nhau: **$A(10, 4) = 5{,}040$**.

### 6.2. Xổ số

Vietlott 6/45: chọn 6 số trong 45. $C(45, 6) = $ **8,145,060** cách. Xác suất trúng $= 1/8\text{M} \approx 1.2 \cdot 10^{-7}$.

### 6.3. Xếp lịch

10 người, chọn 3 vào "vai trò khác nhau" (chủ tịch, thư ký, kế toán): $A(10, 3) = $ **720**.

10 người, chọn 3 vào "ban kiểm tra" (vai trò như nhau): $C(10, 3) = $ **120**.

💡 **Trực giác / Hình dung**: cùng "10 người chọn 3" mà ra 720 (vai khác nhau) hay 120 (vai như nhau) — khác nhau đúng $3! = 6$ lần. Đây là minh hoạ sống động: thứ tự nhân thêm $k!$.

### 6.4. Bài toán đếm phức hợp — chia trường hợp & nhân nhiều bước

💡 **Trực giác**: bài thật ít khi chỉ là "một công thức". Thường phải **chia thành các bước RỒI nhân** (quy tắc nhân) hoặc **chia thành các trường hợp rời nhau RỒI cộng** (quy tắc cộng). Nguyên tắc: *"VÀ → nhân, HOẶC → cộng"*. Hai walk-through dưới minh họa.

#### 6.4.1. Walk-through 1 — chọn ban gồm nhiều loại thành viên (nhân nhiều bước)

**Đề**: Lớp có **6 nam và 5 nữ**. Lập ban gồm **2 nam VÀ 3 nữ** (trong ban không phân vai). Bao nhiêu cách?

Đây là hai lựa chọn độc lập nối bằng "VÀ" → đếm từng bước rồi **nhân**:

$$\begin{aligned}
\text{Bước 1 — chọn 2 nam từ 6:} &\quad C(6,2) = \frac{6 \cdot 5}{2!} = 15. \\
\text{Bước 2 — chọn 3 nữ từ 5:} &\quad C(5,3) = C(5,2) = \frac{5 \cdot 4}{2!} = 10. \\
\text{Nhân (VÀ):} &\quad 15 \times 10 = \mathbf{150}.
\end{aligned}$$

Mỗi cách chọn nam ghép tự do với mỗi cách chọn nữ → quy tắc nhân (cây đếm: 15 nhánh nam, mỗi nhánh tỏa 10 nhánh nữ).

#### 6.4.2. Walk-through 2 — ràng buộc "ít nhất / nhiều nhất" (chia trường hợp, cộng)

**Đề**: Vẫn lớp 6 nam, 5 nữ. Lập ban **5 người có ÍT NHẤT 1 nữ**. Bao nhiêu cách?

Có 2 chiến lược, cùng đáp án — học cả hai vì mỗi cái mạnh ở tình huống khác.

**Cách A — phần bù (nhanh nhất khi gặp "ít nhất 1")**: đếm *tổng* rồi trừ *trường hợp xấu* (không có nữ nào = toàn nam).

$$\begin{aligned}
\text{Tổng chọn 5 từ 11:} &\quad C(11,5) = \frac{11 \cdot 10 \cdot 9 \cdot 8 \cdot 7}{5!} = \frac{55{,}440}{120} = 462. \\
\text{Toàn nam (0 nữ): chọn 5 từ 6 nam:} &\quad C(6,5) = C(6,1) = 6. \\
\text{Ít nhất 1 nữ} = \text{tổng} - \text{toàn nam:} &\quad 462 - 6 = \mathbf{456}.
\end{aligned}$$

**Cách B — chia trường hợp theo số nữ rồi CỘNG** (trực tiếp, kiểm chứng cách A). "Ít nhất 1 nữ" = 1 nữ HOẶC 2 nữ HOẶC ... HOẶC 5 nữ (rời nhau):

| Số nữ | Số nam (cho đủ 5) | Cách | Giá trị |
|:-----:|:-----------------:|------|:-------:|
| 1 | 4 | $C(5,1)\cdot C(6,4)$ | $5 \cdot 15 = 75$ |
| 2 | 3 | $C(5,2)\cdot C(6,3)$ | $10 \cdot 20 = 200$ |
| 3 | 2 | $C(5,3)\cdot C(6,2)$ | $10 \cdot 15 = 150$ |
| 4 | 1 | $C(5,4)\cdot C(6,1)$ | $5 \cdot 6 = 30$ |
| 5 | 0 | $C(5,5)\cdot C(6,0)$ | $1 \cdot 1 = 1$ |

Cộng (HOẶC): $75 + 200 + 150 + 30 + 1 = \mathbf{456}$ ✓ — khớp Cách A.

⚠ **Lỗi thường gặp — đếm trùng khi xử lý "ít nhất 1"**. Cách *sai* hay thấy: "chọn 1 nữ chắc chắn ($C(5,1)=5$) RỒI chọn 4 người bất kỳ từ 10 còn lại ($C(10,4)=210$) → $5 \cdot 210 = 1050$". Sai vì đếm trùng: ban {nữ A, nữ B, 3 nam} bị đếm 2 lần (lần "ghim nữ A", lần "ghim nữ B"). Luôn dùng **phần bù** hoặc **chia trường hợp rời nhau** cho dạng "ít nhất".

🔁 **Dừng lại tự kiểm tra**

1. Lớp 7 nam, 4 nữ. Lập ban 3 người gồm đúng 1 nữ. Bao nhiêu cách?
2. Có bao nhiêu số có 4 chữ số khác nhau lập từ {0,1,2,3,4,5} (chữ số đầu khác 0)?

<details><summary>Đáp án</summary>

1. Chọn 1 nữ $C(4,1)=4$ VÀ 2 nam $C(7,2)=21$ → $4 \cdot 21 = \mathbf{84}$.
2. Chia bước có ràng buộc: hàng nghìn $\neq 0$ → 5 lựa chọn (1–5). Ba vị trí còn lại chọn từ 5 chữ số còn lại (kể cả 0), khác nhau → $5 \cdot 4 \cdot 3 = 60$. Nhân: $5 \cdot 60 = \mathbf{300}$ số.

</details>

### 6.5. Cầu nối sang xác suất — "đếm để tính xác suất"

💡 **Trực giác — vì sao học đếm trước khi học xác suất**: với không gian mẫu **đồng khả năng** (mọi kết cục như nhau), xác suất chỉ là một phân số đếm:

$$P(\text{biến cố}) = \frac{\text{số kết cục thuận lợi}}{\text{tổng số kết cục}} = \frac{|A|}{|\Omega|}.$$

Cả tử và mẫu đều là bài toán **đếm** — chính là kỹ năng của lesson này. Hoán vị / chỉnh hợp / tổ hợp là công cụ đếm hai con số đó.

#### 6.5.1. Walk-through — xác suất một tay bài poker là "đôi" (one pair)

**Đề**: rút ngẫu nhiên 5 lá từ bộ 52. Xác suất được đúng một đôi (2 lá cùng giá trị, 3 lá còn lại 3 giá trị khác nhau, khác đôi)?

- **Mẫu** $|\Omega|$ = số tay 5 lá $= C(52,5) = 2{,}598{,}960$.
- **Tử** $|A|$ — đếm theo bước (VÀ → nhân):
$$\begin{aligned}
\text{Chọn giá trị của đôi (2,3,...,A):} &\quad C(13,1) = 13. \\
\text{Chọn 2 chất cho đôi đó:} &\quad C(4,2) = 6. \\
\text{Chọn 3 giá trị khác cho 3 lá lẻ:} &\quad C(12,3) = 220. \\
\text{Mỗi lá lẻ chọn 1 trong 4 chất:} &\quad 4^3 = 64. \\
\text{Nhân:} &\quad 13 \cdot 6 \cdot 220 \cdot 64 = 1{,}098{,}240.
\end{aligned}$$
- **Xác suất** $= \dfrac{1{,}098{,}240}{2{,}598{,}960} \approx 0.4226 \approx \mathbf{42.3\%}$.

⚠ **Lỗi thường gặp ở bước "3 giá trị lẻ"**: nếu lỡ dùng $A(12,3)$ (có thứ tự) thay vì $C(12,3)$ thì đếm thừa $3!$ lần — 3 lá lẻ vào cùng 1 tay không phân thứ tự. Luôn hỏi "thứ tự có quan trọng không" ngay trong từng bước con.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào dùng công thức đếm cho xác suất, khi nào không?"* Chỉ khi các kết cục **đồng khả năng** (xúc xắc cân, rút bài ngẫu nhiên, xổ số). Nếu không đồng khả năng (xúc xắc thiên lệch), phải dùng xác suất gốc của từng kết cục, đếm không đủ.
- *"Tử và mẫu phải đếm cùng kiểu (cùng có/không thứ tự)?"* Đúng — bắt buộc nhất quán. Đếm mẫu bằng tổ hợp thì tử cũng bằng tổ hợp; nếu mẫu có thứ tự thì tử cũng phải có. Trộn lẫn → sai.

🔁 **Dừng lại tự kiểm tra**: Một hộp có 4 bi đỏ, 6 bi xanh. Lấy ngẫu nhiên 3 bi cùng lúc. Xác suất được đúng 2 đỏ?

<details><summary>Đáp án</summary>

Mẫu $C(10,3) = 120$. Tử: chọn 2 đỏ $C(4,2)=6$ VÀ 1 xanh $C(6,1)=6$ → $36$. Xác suất $= 36/120 = 0.3 = \mathbf{30\%}$.

</details>

❓ **Câu hỏi tự nhiên của người đọc**

- *"Xác suất trúng Vietlott 6/45 nhỏ cỡ nào?"* $1/C(45,6) = 1/8{,}145{,}060 \approx 1.23 \cdot 10^{-7}$ — tức ~1 phần 8 triệu. Mua 1 vé mỗi tuần, trung bình ~156,000 năm mới trúng 1 lần.
- *"Mật khẩu khác nhau với cho lặp khác bao nhiêu?"* 4 chữ số cho lặp $= 10^4 = 10000$; khác nhau $= A(10,4) = 5040$ — gần một nửa.

### 📝 Tóm tắt mục 6

- Mật khẩu cho lặp: $n^k$; khác nhau: $A(n,k)$.
- Xổ số / chọn nhóm không vai: tổ hợp $C(n,k)$.
- Chọn có vai trò khác nhau: chỉnh hợp $A(n,k) = C(n,k) \cdot k!$.
- Bài phức hợp: chia **bước** → nhân (VÀ); chia **trường hợp rời nhau** → cộng (HOẶC).
- "Ít nhất 1" → ưu tiên **phần bù** (tổng $-$ trường hợp xấu), tránh đếm trùng.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Một biển số xe gồm 4 chữ số (cho phép lặp). Bao nhiêu biển số?

**Bài 2**: Có 8 người, chọn 5 vào hội đồng (không phân vai). Số cách?

**Bài 3**: Sắp 7 cuốn sách lên kệ (1 hàng). Bao nhiêu cách?

**Bài 4**: Từ 30 sinh viên, chọn lớp trưởng $+$ lớp phó (khác nhau). Số cách?

**Bài 5**: Tính $C(10, 4)$ và $C(10, 6)$. So sánh.

**Bài 6**: Có bao nhiêu "từ" khác nhau xếp từ các chữ của "TOÁN" → coi như 4 chữ T-O-A-N (khác nhau)? Còn "GIỎI" có 4 chữ trong đó... thực ra chữ I lặp 2 lần: G-I-O-I — bao nhiêu cách?

**Bài 7**: Tổ 8 người (5 nam, 3 nữ). Chọn 4 người đi trực, yêu cầu có **ít nhất 1 nữ**. Số cách?

**Bài 8**: Một quán có 4 loại topping. Khách mua 1 cốc trà sữa và chọn **3 phần topping** (được chọn trùng loại, không quan tâm thứ tự bỏ vào). Bao nhiêu cách chọn topping?

### Lời giải

**Bài 1**: Mỗi vị trí 10 lựa chọn (0–9), cho lặp → quy tắc nhân: $10^4 = $ **10,000**.

**Bài 2**: Chọn 5 vào hội đồng không phân vai → tổ hợp. $C(8, 5) = C(8,3) = \dfrac{8 \cdot 7 \cdot 6}{3!} = \dfrac{336}{6} = $ **56**.

**Bài 3**: Sắp hết 7 cuốn khác nhau có thứ tự → hoán vị. $7! = 5040 = $ **5,040**.

**Bài 4**: Lớp trưởng + lớp phó là 2 vai **khác nhau** → thứ tự quan trọng → chỉnh hợp. $A(30, 2) = 30 \cdot 29 = $ **870**.

**Bài 5**: $C(10, 4) = \dfrac{10 \cdot 9 \cdot 8 \cdot 7}{4!} = \dfrac{5040}{24} = 210$; $C(10, 6) = C(10, 4) = 210$. **Bằng nhau** (tính chất đối xứng $C(n,k) = C(n,n-k)$ vì $6 = 10 - 4$).

**Bài 6**: "TOÁN" — 4 ký tự khác nhau, sắp hết có thứ tự → hoán vị $4! = $ **24**. "GIỎI" = G,I,O,I có 4 ký tự nhưng **2 chữ I trùng** → hoán vị lặp $\dfrac{4!}{2!} = \dfrac{24}{2} = $ **12** (đổi chỗ 2 chữ I không tạo từ mới).

**Bài 7**: Dùng phần bù (xem mục 6.4.2).
- Tổng chọn 4 từ 8: $C(8,4) = \dfrac{8 \cdot 7 \cdot 6 \cdot 5}{4!} = \dfrac{1680}{24} = 70$.
- Trường hợp xấu (0 nữ = toàn nam, chọn 4 từ 5 nam): $C(5,4) = C(5,1) = 5$.
- Ít nhất 1 nữ $= 70 - 5 = $ **65**.
- *Kiểm chứng bằng chia trường hợp*: 1 nữ $C(3,1)C(5,3)=3\cdot10=30$; 2 nữ $C(3,2)C(5,2)=3\cdot10=30$; 3 nữ $C(3,3)C(5,1)=1\cdot5=5$. Cộng $30+30+5 = 65$ ✓.

**Bài 8**: Chọn 3 topping từ 4 loại, **được trùng**, **không thứ tự** → tổ hợp lặp $C(n+k-1, k)$ với $n=4$ loại, $k=3$ phần:
$$C(4 + 3 - 1,\ 3) = C(6, 3) = \dfrac{6 \cdot 5 \cdot 4}{3!} = \dfrac{120}{6} = \mathbf{20}.$$
(Trực giác "sao và vách ngăn": xếp 3 ngôi sao ⋆ và 3 vách `|` chia thành 4 loại, vd `⋆⋆|⋆||` = 2 phần loại 1, 1 phần loại 2, 0 phần loại 3, 0 phần loại 4 → đếm cách sắp = $C(6,3)$.)

---

## 8. Bài tiếp theo

[Lesson 04 — Nhị thức Newton & Pascal](../lesson-04-binomial-pascal/).

## 📝 Tổng kết

1. **Cộng (OR)**, **Nhân (AND)** — 2 quy tắc đếm cốt lõi; "HOẶC → cộng", "VÀ/RỒI → nhân". Trực quan bằng **cây đếm** (đếm số lá).
2. **Hoán vị** $n!$ — sắp toàn bộ. **Chỉnh hợp** $A(n,k) = n!/(n-k)!$ — chọn $+$ sắp $k$. **Tổ hợp** $C(n,k) = n!/(k!(n-k)!)$ — chỉ chọn.
3. **$C(n,k) = A(n,k)/k!$** — không quan tâm thứ tự thì chia cho $k!$ cách sắp.
4. **Đối xứng**: $C(n,k) = C(n,n-k)$. **Pascal**: $C(n,k) = C(n-1,k-1) + C(n-1,k)$.
5. **2 câu hỏi quyết định** (cây quyết định mục 5.0.1): *thứ tự?* và *lặp?* → chọn đúng 1 trong 5 công thức ($n!$, $A(n,k)$, $C(n,k)$, $n^k$, $C(n+k-1,k)$).
6. **Hoán vị lặp** $\dfrac{n!}{n_1!\cdots n_r!}$ (BANANA = 60); **tổ hợp lặp** $C(n+k-1,k)$ qua "sao và vách ngăn".
7. **Bài phức hợp**: chia bước → nhân; chia trường hợp rời → cộng; "ít nhất 1" → **phần bù** để tránh đếm trùng.
8. **Ứng dụng**: mật khẩu, xổ số, xếp lịch, và **xác suất đồng khả năng** $P = |A|/|\Omega|$ (tử/mẫu đều là bài đếm).
