# Lesson 02 — Số nguyên tố & Đồng dư

## Mục tiêu

- Hiểu **số nguyên tố** (prime) và **định lý cơ bản số học** (Fundamental Theorem of Arithmetic — phân tích duy nhất).
- Sàng Eratosthenes (Sieve of Eratosthenes) — tìm tất cả nguyên tố $\le N$.
- **Đồng dư** (congruence) $a \equiv b \pmod{m}$ và các phép toán modulo.
- **Nghịch đảo modular** (modular inverse) qua thuật toán Euclid mở rộng (Extended Euclidean).
- **Lũy thừa nhanh** (fast exponentiation / square-and-multiply) — tính $a^k \bmod n$ trong $O(\log k)$.
- Định lý Fermat nhỏ (Fermat's little theorem), định lý Euler, hàm Euler $\varphi$ (Euler's totient).

## Kiến thức tiền đề

- [Lesson 01 — Chia hết & GCD](../lesson-01-divisibility-gcd/).

---

## 1. Số nguyên tố — Định nghĩa

💡 **Trực giác / Hình dung**: số nguyên tố là **"nguyên tử của số"** — viên gạch không thể chẻ nhỏ của phép nhân. Như mọi phân tử trong hoá học được ghép từ một bộ nguyên tử cố định, mọi số tự nhiên được ghép từ các nguyên tố bằng phép nhân. Hình ảnh khác: xếp gạch thành chữ nhật. Bạn có thể xếp 12 viên thành hình chữ nhật 3×4 hay 2×6 (12 là hợp số), nhưng 7 viên thì chỉ xếp được 1 hàng 1×7 — không có cách chia thành chữ nhật "đầy đặn" nào khác. Số nguyên tố là số "không xếp được chữ nhật" ngoài 1 hàng.

**Định nghĩa**: Số tự nhiên $p > 1$ là nguyên tố nếu $p$ **chỉ có 2 ước**: 1 và chính nó.

- Số đầu tiên: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, ...
- **2 là số nguyên tố chẵn DUY NHẤT**.

**Hợp số**: số $> 1$ không nguyên tố (có ít nhất 1 ước khác 1 và chính nó).

**4 ví dụ số đa dạng**:
- $7$ nguyên tố: ước chỉ $\{1, 7\}$.
- $12$ hợp số: ước $\{1, 2, 3, 4, 6, 12\}$ — nhiều hơn 2.
- $2$ nguyên tố (chẵn duy nhất): ước $\{1, 2\}$.
- $1$ KHÔNG nguyên tố cũng KHÔNG hợp số: chỉ có 1 ước.

**Thêm 4 ví dụ kiểm tra bằng quy tắc $\sqrt{n}$** (đa dạng: lẻ/chẵn, nhỏ/lớn, "trông giống nguyên tố nhưng không phải"):

- $97$: thử ước $\le \sqrt{97} \approx 9.8$, tức $\{2,3,5,7\}$. $97$ lẻ (loại 2), tổng chữ số $9{+}7{=}16$ không chia 3, không tận cùng 0/5, $97 = 7\cdot13{+}6$ (không chia 7) → **nguyên tố**.
- $91$: $\le \sqrt{91} \approx 9.5$. Lẻ, không chia 3 ($9{+}1{=}10$), không chia 5, nhưng $91 = 7 \cdot 13$ → **hợp số** (cái bẫy: trông giống nguyên tố).
- $51$: $5{+}1 = 6$ chia hết 3 → $51 = 3 \cdot 17$ → **hợp số**.
- $221$: $\le \sqrt{221} \approx 14.9$. Lẻ, $2{+}2{+}1{=}5$ (không chia 3), không tận cùng 0/5, không chia 7/11, nhưng $221 = 13 \cdot 17$ → **hợp số**.

⚠ **1 KHÔNG phải nguyên tố** (theo quy ước hiện đại, để định lý cơ bản đúng). Phản ví dụ nếu coi 1 là nguyên tố: $6 = 2 \cdot 3 = 1 \cdot 2 \cdot 3 = 1 \cdot 1 \cdot 2 \cdot 3$ → phân tích KHÔNG còn duy nhất, hỏng cả định lý cơ bản.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Kiểm tra $n$ có nguyên tố không thì thử chia tới đâu?"* Chỉ cần thử các ước $\le \sqrt{n}$. Vì nếu $n = a \cdot b$ với cả $a, b > \sqrt{n}$ thì $a \cdot b > n$ (vô lý) — nên một trong hai ước phải $\le \sqrt{n}$. Vd kiểm 97: chỉ thử tới $\sqrt{97} \approx 9.8$, tức 2,3,5,7 — không cái nào chia hết → 97 nguyên tố.
- *"Vì sao 2 là nguyên tố chẵn duy nhất?"* Mọi số chẵn khác (4, 6, 8...) đều chia hết cho 2 → có ước 2 ngoài 1 và chính nó → hợp số.

🔁 **Dừng lại tự kiểm tra**

1. $91$ có nguyên tố không?
2. Để kiểm $131$ nguyên tố, cần thử chia cho những số nào?

<details><summary>Đáp án</summary>

1. $91 = 7 \cdot 13$ → **hợp số**.
2. Tới $\sqrt{131} \approx 11.4$: thử 2, 3, 5, 7, 11. Không cái nào chia hết → 131 nguyên tố.

</details>

### 📝 Tóm tắt mục 1

- Nguyên tố = số $> 1$ chỉ có 2 ước (1 và chính nó); 1 không phải nguyên tố.
- 2 là nguyên tố chẵn duy nhất.
- Kiểm nguyên tố chỉ cần thử ước tới $\sqrt{n}$.

---

## 2. Định lý cơ bản số học (Fundamental Theorem of Arithmetic)

💡 **Trực giác / Hình dung**: nếu số nguyên tố là "viên gạch", định lý này nói **mỗi số tự nhiên có đúng MỘT công thức gạch** xây nên nó — không có 2 cách xếp khác nhau. Như mã vạch riêng của từng số. 360 luôn là "ba viên 2, hai viên 3, một viên 5", không bao giờ ra bộ gạch khác.

🎯 **Phát biểu**: Mọi số tự nhiên $n > 1$ có thể **viết duy nhất** thành tích các số nguyên tố (không kể thứ tự):

$$n = p_1^{a_1} \cdot p_2^{a_2} \cdot \ldots \cdot p_k^{a_k}$$

**4 ví dụ số đa dạng**:
- $360 = 2^3 \cdot 3^2 \cdot 5$.
- $100 = 2^2 \cdot 5^2$.
- $17 = 17$ (số nguyên tố: phân tích là chính nó).
- $84 = 2^2 \cdot 3 \cdot 7$.

**Thêm 4 ví dụ phân tích (đa dạng: mũ cao, nhiều nguyên tố, lũy thừa thuần, có nguyên tố lớn)**:

- $1000 = 2^3 \cdot 5^3$ (verify: $8 \cdot 125 = 1000$ ✓).
- $504 = 2^3 \cdot 3^2 \cdot 7$ (verify: $8 \cdot 9 \cdot 7 = 504$ ✓).
- $128 = 2^7$ (lũy thừa thuần một nguyên tố).
- $1155 = 3 \cdot 5 \cdot 7 \cdot 11$ (bốn nguyên tố phân biệt, không mũ; verify: $15 \cdot 77 = 1155$ ✓).

**Walk-through phân tích $360$ từng bước** (chia dần cho nguyên tố nhỏ nhất):

$$\begin{aligned}
360 &\div 2 = 180\\
180 &\div 2 = 90\\
90 &\div 2 = 45 \quad(\text{hết chia 2} \to 2^3)\\
45 &\div 3 = 15\\
15 &\div 3 = 5 \quad(\text{hết chia 3} \to 3^2)\\
5 &\div 5 = 1 \quad(\to 5^1)
\end{aligned}$$

→ $360 = 2^3 \cdot 3^2 \cdot 5$. Verify: $8 \cdot 9 \cdot 5 = 360$ ✓.

### Vì sao phân tích là DUY NHẤT (ý tưởng chứng minh)

Tính duy nhất KHÔNG hiển nhiên — nó dựa trên **bổ đề Euclid** (Euclid's lemma): *nếu nguyên tố $p$ chia hết tích $a \cdot b$ thì $p$ chia $a$ hoặc $p$ chia $b$.* Từ đây: giả sử một số có hai phân tích nguyên tố khác nhau $p_1 p_2 \cdots = q_1 q_2 \cdots$. Vì $p_1$ chia vế phải $q_1 q_2 \cdots$, theo bổ đề Euclid $p_1$ phải chia một $q_j$ nào đó; mà $q_j$ nguyên tố nên $p_1 = q_j$. Gạch cặp này đi rồi lặp lại — cuối cùng hai danh sách trùng khít. Vậy chỉ có một phân tích. (Ngược lại với hợp số: $6 \mid (4 \cdot 9) = 36$ nhưng $6 \nmid 4$ và $6 \nmid 9$ — bổ đề Euclid CHỈ đúng cho nguyên tố, đó là lý do nguyên tố là "nguyên tử".)

⟶ Lý do tại sao nguyên tố quan trọng: là "viên gạch" xây mọi số tự nhiên — và xây theo đúng MỘT cách.

### Hệ quả: gcd, lcm từ phân tích

Cho $a = \prod p_i^{a_i}$, $b = \prod p_i^{b_i}$:
- **$\gcd(a, b) = \prod p_i^{\min(a_i,b_i)}$**.
- **$\operatorname{lcm}(a, b) = \prod p_i^{\max(a_i,b_i)}$**.

**Ví dụ**: $\gcd(360, 84)$. $360 = 2^3 \cdot 3^2 \cdot 5$. $84 = 2^2 \cdot 3 \cdot 7$.  
- $\gcd = 2^2 \cdot 3^1 = $ **12**. (Không lấy 5, 7 vì chỉ có ở 1 bên.)
- $\operatorname{lcm} = 2^3 \cdot 3^2 \cdot 5 \cdot 7 = $ **2520**. Verify: $\gcd \cdot \operatorname{lcm} = 12 \cdot 2520 = 30240 = 360 \cdot 84$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao 'duy nhất' lại quan trọng?"* Vì nó cho phép định nghĩa gcd/lcm bằng min/max số mũ, kiểm 2 số coprime (không chung nguyên tố), và là nền cho cả lý thuyết số. Nếu phân tích không duy nhất thì mọi thứ sụp.
- *"$\gcd$ lấy min, $\operatorname{lcm}$ lấy max — nhớ thế nào?"* gcd là ước **chung** → chỉ lấy phần CẢ HAI đều có → mũ nhỏ hơn (min). lcm là bội **chung** → phải đủ cho cả hai → mũ lớn hơn (max).

⚠ **Lỗi thường gặp**: khi tính gcd bằng phân tích, lấy nhầm nguyên tố chỉ xuất hiện ở 1 số. Phản ví dụ: $\gcd(360, 84)$ — đừng lấy 5 (chỉ có ở 360) hay 7 (chỉ có ở 84). Nguyên tố không chung → số mũ min = 0 → bỏ.

🔁 **Dừng lại tự kiểm tra**

1. Phân tích $72$ ra thừa số nguyên tố.
2. Dùng phân tích tính $\gcd(72, 120)$ và $\operatorname{lcm}(72, 120)$.

<details><summary>Đáp án</summary>

1. $72 = 2^3 \cdot 3^2$.
2. $120 = 2^3 \cdot 3 \cdot 5$. $\gcd = 2^3 \cdot 3 = 24$ (min mũ). $\operatorname{lcm} = 2^3 \cdot 3^2 \cdot 5 = 360$ (max mũ). Verify: $24 \cdot 360 = 8640 = 72 \cdot 120$ ✓.

</details>

### 📝 Tóm tắt mục 2

- Mọi $n > 1$ phân tích **duy nhất** thành tích nguyên tố.
- gcd = tích nguyên tố chung, mũ **min**; lcm = tích nguyên tố bất kỳ, mũ **max**.
- Nguyên tố chỉ ở 1 số → không vào gcd.

---

## 3. Số nguyên tố vô hạn — Chứng minh Euclid (300 TCN)

🎯 **Định lý**: Có vô hạn số nguyên tố.

**Chứng minh (phản chứng)**:
- Giả sử có hữu hạn: $p_1, p_2, \ldots, p_n$.
- Đặt $N = p_1 \cdot p_2 \cdot \ldots \cdot p_n + 1$.
- $N$ chia cho mỗi $p_i$ dư 1 → không $p_i$ nào chia hết $N$.
- Nhưng $N > 1$ nên có ước nguyên tố → ước này không trong danh sách → MÂU THUẪN. □

💡 **Đẹp ở chỗ**: chứng minh **không xây dựng được** ví dụ cụ thể.

**Verify chứng minh bằng số thật** (với danh sách giả định $\{2,3,5\}$):

$$N = 2 \cdot 3 \cdot 5 + 1 = 31.$$

- $31 \bmod 2 = 1$, $31 \bmod 3 = 1$, $31 \bmod 5 = 1$ → không số nào trong $\{2,3,5\}$ chia hết $31$.
- $31 > 1$ nên có ước nguyên tố — ở đây chính $31$ là nguyên tố, một nguyên tố **không** trong danh sách. Mâu thuẫn với giả thiết "$\{2,3,5\}$ là tất cả nguyên tố".

**Verify trường hợp $N$ là hợp số** (mấu chốt vì sao lập luận vẫn đúng):

$$N = 2 \cdot 3 \cdot 5 \cdot 7 \cdot 11 \cdot 13 + 1 = 30031 = 59 \cdot 509.$$

$N$ không nguyên tố, nhưng cả $59$ và $509$ đều là nguyên tố **không** trong $\{2,3,5,7,11,13\}$ — vẫn sinh ra nguyên tố mới. Lập luận Euclid chỉ cần "có ước nguyên tố mới", không cần "$N$ nguyên tố".

**Bảng số nguyên tố thưa dần** (để thấy "vô hạn" không mâu thuẫn với "ngày càng hiếm"):

```
khoảng        | số nguyên tố | mật độ
1 – 10        |      4       | 40%   (2,3,5,7)
1 – 100       |     25       | 25%
1 – 1000      |    168       | 16.8%
1 – 10000     |   1229       | 12.3%
```

Mật độ giảm (định lý số nguyên tố: $\approx 1/\ln N$) nhưng tổng số vẫn vô hạn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$N = p_1 \cdot \ldots \cdot p_n + 1$ có luôn là số nguyên tố không?"* **Không** — đây là hiểu lầm phổ biến. $N$ chỉ đảm bảo CÓ một ước nguyên tố ngoài danh sách, chứ bản thân $N$ không nhất thiết nguyên tố. Phản ví dụ thật: $2 \cdot 3 \cdot 5 \cdot 7 \cdot 11 \cdot 13 + 1 = 30031 = 59 \cdot 509$ — là hợp số! Nhưng 59 và 509 đều là nguyên tố không nằm trong $\{2,3,5,7,11,13\}$.
- *"Vì sao $N$ chia mỗi $p_i$ dư 1?"* Vì $N = (p_1 \cdot \ldots \cdot p_n) + 1$, mà $p_1 \cdot \ldots \cdot p_n$ chia hết cho mọi $p_i$ → cộng 1 thì dư đúng 1.

⚠ **Lỗi thường gặp**: kết luận "vậy $N$ là số nguyên tố mới". SAI — xem phản ví dụ 30031 ở trên. Lập luận đúng chỉ là: $N$ **có ước nguyên tố** không trong danh sách hữu hạn → mâu thuẫn.

🔁 **Dừng lại tự kiểm tra**

1. Tính $N = 2 \cdot 3 \cdot 5 + 1$. Nó có nguyên tố không?
2. Tính $N = 2 \cdot 3 \cdot 5 \cdot 7 + 1$. Nó có nguyên tố không?

<details><summary>Đáp án</summary>

1. $N = 31$ → nguyên tố.
2. $N = 211$ → nguyên tố. (Hai ví dụ này tình cờ nguyên tố, nhưng $30031 = 59 \cdot 509$ thì không — đừng tổng quát hoá.)

</details>

### 📝 Tóm tắt mục 3

- Có **vô hạn** số nguyên tố (Euclid, phản chứng, 300 TCN).
- Mấu chốt: $N = \prod p_i + 1$ có ước nguyên tố ngoài danh sách.
- $N$ KHÔNG nhất thiết nguyên tố (vd $30031 = 59 \cdot 509$).

---

## 4. Sàng Eratosthenes — Tìm nguyên tố ≤ N

💡 **Trực giác / Hình dung**: như "lọc cát" — viết hết các số ra, rồi gạch bỏ mọi bội của 2 (4,6,8...), mọi bội của 3 (6,9,12...), v.v. Những số "sống sót" không bị gạch chính là nguyên tố. Mỗi nguyên tố tự "quét sạch" các bội của nó.

**Thuật toán**:
1. Liệt kê 2 đến N.
2. Lấy số đầu (= 2). Đánh dấu nguyên tố. Xóa mọi bội.
3. Lấy số tiếp chưa xóa (= 3). Lặp đến √N.
4. Các số còn lại = nguyên tố.

**Ví dụ $N=30$**: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 — **10 số nguyên tố**.

### Walk-through ASCII từng bước với $N = 30$

Bắt đầu: liệt kê $2 \ldots 30$, tất cả "chưa gạch" (`.`). Chỉ cần sàng tới $\sqrt{30} \approx 5.5$ → các nguyên tố cần xử lý là $2, 3, 5$.

```
trạng thái đầu (. = ứng viên, P = chốt nguyên tố, x = bị gạch)
 2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .
```

Bước 1 — chốt **2** (số nhỏ nhất còn `.`), gạch bội của 2 bắt đầu từ $2^2 = 4$: $4,6,8,\ldots,30$.

```
 2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
 P  .  x  .  x  .  x  .  x  .  x  .  x  .  x  .  x  .  x  .  x  .  x  .  x  .  x  .  x
```

Bước 2 — số `.` nhỏ kế tiếp là **3**, chốt 3, gạch bội của 3 từ $3^2 = 9$: $9,12,15,18,21,24,27,30$ (nhiều cái như 6,12 đã bị 2 gạch — gạch lại vô hại).

```
 2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
 P  P  x  .  x  .  x  x  x  .  x  .  x  x  x  .  x  .  x  x  x  .  x  .  x  x  x  .  x
```

Bước 3 — số `.` nhỏ kế tiếp là **5**, chốt 5, gạch bội của 5 từ $5^2 = 25$: $25, 30$ ($10,15,20$ đã bị gạch).

```
 2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
 P  P  x  P  x  .  x  x  x  .  x  .  x  x  x  .  x  .  x  x  x  .  x  x  x  x  x  .  x
```

Bước 4 — số `.` kế tiếp là **7**, nhưng $7 > \sqrt{30}$ → DỪNG. Mọi số còn `.` đều là nguyên tố:

```
 2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
 P  P  x  P  x  P  x  x  x  P  x  P  x  x  x  P  x  P  x  x  x  P  x  x  x  x  x  P  x
```

→ Nguyên tố $\le 30$: **2, 3, 5, 7, 11, 13, 17, 19, 23, 29** (10 số) ✓.

❓ *"Vì sao dừng ở 7 lại đúng, lỡ còn hợp số chưa gạch?"* Mọi hợp số $\le 30$ đều có ước nguyên tố $\le \sqrt{30} < 7$, tức $\in \{2,3,5\}$ — đã gạch hết ở 3 bước trên. Vd $26 = 2 \cdot 13$ (bị 2 gạch), $21 = 3 \cdot 7$ (bị 3 gạch). Không hợp số nào "sót".

**Độ phức tạp**: $O(N \cdot \log \log N)$ — gần tuyến tính. (Tổng công gạch $\approx N \sum_{p \le N} 1/p \approx N \ln \ln N$ — số rất nhỏ, nên gần như $O(N)$.)

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chỉ cần sàng tới $\sqrt{N}$?"* Vì mọi hợp số $\le N$ đều có ước nguyên tố $\le \sqrt{N}$. Sau khi gạch bội của các nguyên tố $\le \sqrt{N}$, mọi hợp số đã bị gạch hết — số còn lại tất yếu nguyên tố.
- *"Khi gạch bội của $p$, bắt đầu từ đâu?"* Từ $p^2$, không phải $2p$. Vì các bội nhỏ hơn ($2p, 3p$...) đã bị các nguyên tố nhỏ hơn gạch rồi. Vd với $p=5$, bắt đầu gạch từ 25 (10, 15, 20 đã bị 2, 3 gạch).

⚠ **Lỗi thường gặp**: gạch cả số 1 hoặc quên 2 là nguyên tố. Sàng bắt đầu từ 2 (không từ 1, vì 1 không nguyên tố). Phản ví dụ: nếu liệt kê từ 1 và "giữ" 1 lại → đếm sai (1 không phải nguyên tố).

🔁 **Dừng lại tự kiểm tra**

1. Có bao nhiêu số nguyên tố $\le 20$?
2. Khi sàng tới $N = 50$, cần gạch bội của những nguyên tố nào?

<details><summary>Đáp án</summary>

1. $2,3,5,7,11,13,17,19$ → **8 số**.
2. Các nguyên tố $\le \sqrt{50} \approx 7.07$: tức $2, 3, 5, 7$.

</details>

### 📝 Tóm tắt mục 4

- Sàng Eratosthenes: gạch dần bội của từng nguyên tố $\le \sqrt{N}$.
- Gạch bội của $p$ bắt đầu từ $p^2$ (nhỏ hơn đã bị gạch).
- $O(N \log \log N)$ — gần tuyến tính, rất nhanh.

---

## 5. Đồng dư — Số học mod m

💡 **Trực giác / Hình dung**: đồng dư là "số học trên mặt đồng hồ". Đồng hồ 12 giờ: $15 \text{ giờ} \equiv 3 \text{ giờ} \pmod{12}$ vì cả hai chỉ về cùng vị trí kim. 17 và 2 "cùng vị trí" trên đồng hồ 5 giờ → $17 \equiv 2 \pmod{5}$. Quan trọng: hai số đồng dư khi **chia $m$ ra cùng số dư**.

**Định nghĩa**: $a \equiv b \pmod{m} \iff m \mid (a - b)$. Đọc: "a đồng dư b mod m".

**4 ví dụ số đa dạng**:
- $17 \equiv 2 \pmod{5}$ (vì $17-2 = 15 = 3 \cdot 5$).
- $23 \equiv -1 \pmod{8}$ (vì $23-(-1) = 24 = 8 \cdot 3$); cũng $23 \equiv 7 \pmod{8}$.
- $100 \equiv 0 \pmod{10}$ (vì $10 \mid 100$).
- $-7 \equiv 2 \pmod{3}$ (vì $-7-2 = -9 = 3 \cdot (-3)$).

**Lớp đồng dư mod 5** (mỗi số nguyên rơi vào đúng 1 trong 5 "ngăn"):

```
lớp 0: ... -10  -5   0   5  10  15 ...   (chia 5 dư 0)
lớp 1: ...  -9  -4   1   6  11  16 ...   (chia 5 dư 1)
lớp 2: ...  -8  -3   2   7  12  17 ...   (chia 5 dư 2)
lớp 3: ...  -7  -2   3   8  13  18 ...   (chia 5 dư 3)
lớp 4: ...  -6  -1   4   9  14  19 ...   (chia 5 dư 4)
```

$17$ và $2$ cùng nằm ở lớp 2 → $17 \equiv 2 \pmod 5$.

### Tính chất

Đồng dư là quan hệ tương đương (phản xạ, đối xứng, bắc cầu). Hơn nữa:
- $a \equiv b, c \equiv d \pmod{m}$ → $a + c \equiv b + d \pmod{m}$.
- $a \equiv b, c \equiv d \pmod{m}$ → $a \cdot c \equiv b \cdot d \pmod{m}$.
- $a \equiv b \pmod{m}$ → $a^k \equiv b^k \pmod{m}$.

**4 ví dụ phép cộng mod** (đa dạng: nhỏ, lớn, âm, gói vòng nhiều lần):
- $(17 + 8) \bmod 12 = 25 \bmod 12 = 1$. Kiểm: $(5 + 8) \bmod 12 = 13 \bmod 12 = 1$ ✓.
- $(9 + 9) \bmod 7 = 18 \bmod 7 = 4$.
- $(-3 + 10) \bmod 5 = 7 \bmod 5 = 2$.
- $(58 + 47) \bmod 10 = 105 \bmod 10 = 5$ (chỉ cần $(8+7)\bmod 10 = 5$).

**4 ví dụ phép nhân mod** (rút gọn trước khi nhân để số nhỏ):
- $(5 \times 6) \bmod 7 = 30 \bmod 7 = 2$.
- $(13 \times 13) \bmod 5 = (3 \times 3) \bmod 5 = 9 \bmod 5 = 4$ (rút $13 \equiv 3$).
- $(8 \times 9) \bmod 11 = 72 \bmod 11 = 6$ ($72 = 6\cdot 11 + 6$).
- $(99 \times 99) \bmod 100 = (-1)(-1) \bmod 100 = 1$ (rút $99 \equiv -1$).

**4 ví dụ phép lũy thừa mod** (mẹo: tìm cơ số $\equiv \pm 1$ hoặc số nhỏ):
- $7^{100} \bmod 4 = (-1)^{100} = 1$ ($7 \equiv -1$).
- $2^{10} \bmod 3 = (-1)^{10} = 1$ ($2 \equiv -1$).
- $3^{20} \bmod 5$: $3^2 = 9 \equiv 4 \equiv -1 \to 3^{20} = (3^2)^{10} \equiv (-1)^{10} = 1$.
- $4^{50} \bmod 6$: $4^2 = 16 \equiv 4 \to 4^k \equiv 4$ với mọi $k \ge 1$ → $4^{50} \equiv 4$.

⟶ **Có thể "làm số học mod m" như số học thường** (gần như).

> 📐 **Định nghĩa đầy đủ — Đồng dư $a \equiv b \pmod{m}$**
>
> **(a) Là gì**: $a$ và $b$ "đồng dư" mod $m$ khi chúng chia $m$ cho cùng số dư. Tương đương: $m$ chia hết hiệu $(a - b)$. Đây là quan hệ phân tập $\mathbb{Z}$ thành $m$ "lớp" tương đương (mod 5 chia $\mathbb{Z}$ thành 5 lớp: $\ldots,-5,0,5,10,\ldots$, $\ldots,-4,1,6,11,\ldots$, v.v.).
>
> **(b) Vì sao cần**: Cho phép làm "số học vô hạn nhỏ" — thay vì làm việc với cả $\mathbb{Z}$, chỉ cần làm việc với $m$ số đại diện. Đặc biệt với số khổng lồ: $7^{100} \bmod 4$ không cần tính $7^{100}$ (số 84 chữ số) — chỉ cần thấy $7 \equiv -1$ → $7^{100} \equiv 1$. Nền tảng của **mật mã** (RSA dùng mũ mod $N$ với $N \sim 600$ chữ số), **CRC/checksum** (kiểm lỗi truyền dữ liệu), **giờ đồng hồ** (24 giờ = mod 24), **lịch tuần** (mod 7).
>
> **(c) Ví dụ số**: $17 \equiv 2 \pmod{5}$ vì $17-2=15$, $5 \mid 15$. $23 \equiv -1 \equiv 7 \pmod{8}$. $100 \equiv 0 \pmod{10}$. Tính $7^{100} \bmod 4$: $7 \equiv -1$ → $7^{100} \equiv (-1)^{100} = $ **1** $\pmod{4}$. $3^{50} \bmod 7$: dùng Fermat ($3^6 \equiv 1 \pmod 7$), $50 = 6 \cdot 8+2$ → $3^{50} \equiv 3^2 = $ **$9 \equiv 2$** $\pmod{7}$. Kiểm: hôm nay là thứ 3, 100 ngày nữa thứ mấy? $100 \bmod 7 = 2$ → thứ 3 + 2 = thứ 5.

### Ứng dụng — Kiểm tra số dư

**Bài**: $7^{100}$ chia 4 dư bao nhiêu?
- $7 \equiv -1 \pmod{4}$ → $7^{100} \equiv (-1)^{100} = $ **1** $\pmod{4}$.

Không cần tính $7^{100}$ (số khổng lồ).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đồng dư cho cộng, trừ, nhân, lũy thừa — vậy CHIA được không?"* **Cẩn thận!** Chia (rút gọn) chỉ hợp lệ khi số chia coprime với $m$. Vd $6 \equiv 0 \pmod{6}$ nhưng không thể "chia 2 hai vế" thành $3 \equiv 0 \pmod{6}$ (sai!). Trong mod, "chia" phải dùng **nghịch đảo modular**.
- *"$a \equiv b \pmod{m}$ có cho $a^2 \equiv b^2 \pmod{m}$ không?"* **Có**, vì nhân được: từ $a \equiv b$ nhân hai vế cùng $a \equiv b$ ra $a^2 \equiv b^2$. Tổng quát $a^k \equiv b^k$.

⚠ **Lỗi thường gặp — lẫn "chia hết" và "đồng dư"**. $m \mid a$ ($a$ chia hết cho $m$) khác $a \equiv b \pmod{m}$. $m \mid a$ chỉ là trường hợp đặc biệt $a \equiv 0 \pmod{m}$. Phản ví dụ: $17 \equiv 2 \pmod{5}$ đúng, nhưng $5 \nmid 17$ (17 không chia hết 5). Đừng đọc "17 đồng dư 2 mod 5" thành "5 chia hết 17".

🔁 **Dừng lại tự kiểm tra**

1. $2^{10} \bmod 3 = ?$ (gợi ý: $2 \equiv -1 \pmod 3$).
2. Hôm nay thứ Ba. 100 ngày nữa là thứ mấy?

<details><summary>Đáp án</summary>

1. $2 \equiv -1 \pmod{3}$ → $2^{10} \equiv (-1)^{10} = 1 \pmod{3}$.
2. $100 \bmod 7 = 2$ → thứ Ba + 2 = **thứ Năm**.

</details>

### 📝 Tóm tắt mục 5

- $a \equiv b \pmod{m} \iff m \mid (a-b) \iff a, b$ cùng số dư khi chia $m$ ("đồng hồ").
- Cộng, trừ, nhân, lũy thừa được; **chia phải cẩn thận** (cần nghịch đảo modular).
- "Chia hết" $m \mid a$ = trường hợp riêng $a \equiv 0 \pmod{m}$ — đừng lẫn với đồng dư tổng quát.

---

## 6. Nghịch đảo modular — Chia trong số học mod

💡 **Trực giác / Hình dung**: trong số học thường, "chia cho 7" = "nhân với $1/7$". Trong mod $n$ KHÔNG có phân số, nhưng vẫn có một số đóng vai "$1/7$": số $x$ sao cho $7 \cdot x \equiv 1 \pmod n$. Số đó gọi là **nghịch đảo modular** (modular inverse) của 7, ký hiệu $7^{-1} \bmod n$. Nhân với nó chính là "chia" trong mod.

**Định nghĩa**: $a^{-1} \bmod n$ là số $x$ sao cho $a \cdot x \equiv 1 \pmod n$.

🎯 **Điều kiện tồn tại**: nghịch đảo tồn tại **khi và chỉ khi** $\gcd(a, n) = 1$ (a và n coprime). Nếu $\gcd(a,n) > 1$ thì KHÔNG có nghịch đảo.

**4 ví dụ số đa dạng**:
- $7^{-1} \bmod 26 = 15$ (vì $7 \cdot 15 = 105 = 4 \cdot 26 + 1 \equiv 1$).
- $3^{-1} \bmod 11 = 4$ (vì $3 \cdot 4 = 12 \equiv 1$).
- $5^{-1} \bmod 7 = 3$ (vì $5 \cdot 3 = 15 \equiv 1$).
- $4^{-1} \bmod 6$ **không tồn tại** ($\gcd(4,6) = 2 \ne 1$).

### Walk-through 1 — Tìm $7^{-1} \bmod 26$ bằng Euclid mở rộng

Ý tưởng: chạy thuật toán Euclid để tính $\gcd(7, 26)$, đồng thời **giữ lại các phương trình dư**, rồi thế ngược (back-substitute) để viết $1 = 7s + 26t$. Khi đó $s = 7^{-1} \bmod 26$.

Pha tiến (forward) — chia có dư:

$$\begin{aligned}
26 &= 3 \cdot 7 + 5 \Rightarrow 5 = 26 - 3 \cdot 7\\
7 &= 1 \cdot 5 + 2 \Rightarrow 2 = 7 - 1 \cdot 5\\
5 &= 2 \cdot 2 + 1 \Rightarrow 1 = 5 - 2 \cdot 2\\
2 &= 2 \cdot 1 + 0 \Rightarrow \gcd = 1 \text{ (có nghịch đảo)}
\end{aligned}$$

Pha lùi (back-substitute) — thay dần để chỉ còn 7 và 26:

$$\begin{aligned}
1 &= 5 - 2 \cdot 2\\
&= 5 - 2 \cdot (7 - 1 \cdot 5) = 3 \cdot 5 - 2 \cdot 7\\
&= 3 \cdot (26 - 3 \cdot 7) - 2 \cdot 7 = 3 \cdot 26 - 11 \cdot 7\\
&\Rightarrow 7 \cdot (-11) + 26 \cdot 3 = 1
\end{aligned}$$

→ $7^{-1} \equiv -11 \equiv -11 + 26 = 15 \pmod{26}$. Verify: $7 \cdot 15 = 105 = 4 \cdot 26 + 1 \equiv 1$ ✓.

### Walk-through 2 — Tìm $17^{-1} \bmod 100$

Pha tiến:

$$\begin{aligned}
100 &= 5 \cdot 17 + 15 \Rightarrow 15 = 100 - 5 \cdot 17\\
17 &= 1 \cdot 15 + 2 \Rightarrow 2 = 17 - 1 \cdot 15\\
15 &= 7 \cdot 2 + 1 \Rightarrow 1 = 15 - 7 \cdot 2\\
2 &= 2 \cdot 1 + 0 \Rightarrow \gcd = 1
\end{aligned}$$

Pha lùi:

$$\begin{aligned}
1 &= 15 - 7 \cdot 2 = 15 - 7 \cdot (17 - 15) = 8 \cdot 15 - 7 \cdot 17\\
&= 8 \cdot (100 - 5 \cdot 17) - 7 \cdot 17 = 8 \cdot 100 - 47 \cdot 17\\
&\Rightarrow 17^{-1} \equiv -47 \equiv 53 \pmod{100}
\end{aligned}$$

Verify: $17 \cdot 53 = 901 = 9 \cdot 100 + 1 \equiv 1$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao cần $\gcd(a,n)=1$?"* Vì Euclid mở rộng cho $a s + n t = \gcd(a,n)$. Chỉ khi $\gcd = 1$ ta mới có $a s + n t = 1$, suy ra $a s \equiv 1 \pmod n$. Nếu $\gcd = d > 1$ thì $a s \equiv 0 \pmod d$ cho mọi $s$ — không cách nào ra 1.
- *"Có cách khác ngoài Euclid mở rộng không?"* Khi $n = p$ nguyên tố, Fermat cho công thức nhanh gọn $a^{-1} \equiv a^{p-2} \pmod p$ (mục 8). Vd $3^{-1} \bmod 7 = 3^5 \bmod 7 = 243 \bmod 7 = 5$. Verify $3 \cdot 5 = 15 \equiv 1$ ✓. Nhưng Euclid mở rộng tổng quát hơn (chạy với mọi $n$, kể cả hợp số coprime).

⚠ **Lỗi thường gặp — "chia hai vế" trong mod mà không dùng nghịch đảo**. Trong mod, $a c \equiv b c \pmod n$ KHÔNG suy ra $a \equiv b$ trừ khi $\gcd(c, n) = 1$. Phản ví dụ: $2 \cdot 3 \equiv 2 \cdot 0 \pmod 6$ (cả hai $\equiv 0$) nhưng $3 \not\equiv 0 \pmod 6$ — không được "chia 2" vì $\gcd(2,6) = 2 \ne 1$. Muốn chia phải nhân nghịch đảo, và nghịch đảo chỉ tồn tại khi coprime.

🔁 **Dừng lại tự kiểm tra**

1. Tìm $11^{-1} \bmod 26$ bằng Euclid mở rộng.
2. $6^{-1} \bmod 9$ có tồn tại không? Vì sao?

<details><summary>Đáp án</summary>

1. $26 = 2\cdot 11 + 4$; $11 = 2\cdot 4 + 3$; $4 = 1\cdot 3 + 1$. Lùi: $1 = 4 - 3 = 4 - (11 - 2\cdot 4) = 3\cdot 4 - 11 = 3(26 - 2\cdot 11) - 11 = 3\cdot 26 - 7\cdot 11$ → $11^{-1} \equiv -7 \equiv 19 \pmod{26}$. Verify $11 \cdot 19 = 209 = 8\cdot 26 + 1$ ✓.
2. **Không** — $\gcd(6, 9) = 3 \ne 1$. Không số nào nhân 6 ra $\equiv 1 \pmod 9$ (mọi bội của 6 mod 9 chỉ ra $\{0,3,6\}$).

</details>

### 📝 Tóm tắt mục 6

- $a^{-1} \bmod n$ = số $x$ với $a x \equiv 1$; là cách "chia" trong mod.
- Tồn tại $\iff \gcd(a,n) = 1$. Tính bằng **Euclid mở rộng** (forward chia dư → back-substitute ra $as + nt = 1$).
- Không được "chia hai vế" trong mod nếu số chia không coprime với $n$.

---

## 7. Lũy thừa nhanh — Square-and-Multiply

💡 **Trực giác / Hình dung**: tính $a^k \bmod n$ bằng cách nhân $a$ với chính nó $k$ lần là $O(k)$ — chậm khủng khiếp khi $k$ lớn (RSA dùng $k$ tới ~2048 bit). Mẹo: thay vì leo từng bậc, **bình phương liên tục** để nhảy bậc theo lũy thừa của 2 ($a, a^2, a^4, a^8, \ldots$), rồi ghép các bậc đúng theo biểu diễn nhị phân của $k$. Số phép nhân tụt từ $k$ xuống $O(\log_2 k)$.

**Ý tưởng**: viết $k$ ở hệ nhị phân. Vd $k = 13 = 1101_2 = 8 + 4 + 1$ → $a^{13} = a^8 \cdot a^4 \cdot a^1$. Chỉ cần các bình phương liên tiếp $a^1, a^2, a^4, a^8$ rồi nhân những cái có bit = 1.

```
result = 1
base   = a mod n
duyệt bit của k từ MSB → LSB:
    result = result^2 mod n          // bình phương (luôn làm)
    nếu bit == 1:
        result = result * base mod n  // nhân thêm base
```

### Walk-through 1 — $7^{13} \bmod 100$

$k = 13 = 1101_2$ (bit 3,2,0 = 1; bit 1 = 0). $base = 7$.

```
khởi tạo: result = 1

bit 3 (=1):  result = 1^2 mod 100 = 1     → ×7 = 7
bit 2 (=1):  result = 7^2 mod 100 = 49    → ×7 = 343 mod 100 = 43
bit 1 (=0):  result = 43^2 mod 100 = 1849 mod 100 = 49   (không nhân)
bit 0 (=1):  result = 49^2 mod 100 = 2401 mod 100 = 1    → ×7 = 7

→ 7^13 mod 100 = 7
```

Verify độc lập: $7^2 = 49$, $7^4 = 49^2 = 2401 \equiv 1$, $7^8 = 1^2 = 1$. $7^{13} = 7^8 \cdot 7^4 \cdot 7^1 = 1 \cdot 1 \cdot 7 = 7$ ✓.

### Walk-through 2 — $3^{19} \bmod 7$ (đối chiếu Fermat)

$k = 19 = 10011_2$. $base = 3$.

```
khởi tạo: result = 1

bit 4 (=1):  1^2 = 1          → ×3 = 3
bit 3 (=0):  3^2 = 9 mod 7 = 2          (không nhân)
bit 2 (=0):  2^2 = 4 mod 7 = 4          (không nhân)
bit 1 (=1):  4^2 = 16 mod 7 = 2  → ×3 = 6 mod 7 = 6
bit 0 (=1):  6^2 = 36 mod 7 = 1  → ×3 = 3 mod 7 = 3

→ 3^19 mod 7 = 3
```

Đối chiếu Fermat: $3^6 \equiv 1 \pmod 7$, $19 = 3 \cdot 6 + 1$ → $3^{19} = (3^6)^3 \cdot 3 \equiv 1 \cdot 3 = 3$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao không viết thẳng `pow(a,k) % n` trong code?"* Vì $a^k$ trước khi mod là số khổng lồ — với $k$ 2048 bit, $a^k$ có hàng triệu chữ số, tràn bộ nhớ. Square-and-multiply mod sau MỖI bước nên số trung gian luôn $< n^2$ — nhỏ gọn, an toàn.
- *"$O(\log k)$ tiết kiệm thật sự bao nhiêu?"* Với $k = 2^{2048}$: cách ngây thơ cần $\sim 2^{2048}$ phép nhân (bất khả thi); square-and-multiply chỉ cần $\sim 2048$ phép nhân — xong trong mili-giây. Đây là lý do RSA chạy được.

⚠ **Lỗi thường gặp — quên mod ở bước bình phương**. Nếu chỉ mod ở cuối mà không mod sau mỗi `result^2`, số trung gian phình to ngay → mất hết lợi ích. Phải mod sau CẢ bước square LẪN bước multiply.

🔁 **Dừng lại tự kiểm tra**

1. Tính $2^{10} \bmod 1000$ bằng square-and-multiply.
2. $5 = 101_2$ — liệt kê các bước tính $a^5$.

<details><summary>Đáp án</summary>

1. $10 = 1010_2$. $base = 2$. bit3(=1): $1^2{=}1 \to {\times}2 = 2$; bit2(=0): $2^2 = 4$; bit1(=1): $4^2 = 16 \to {\times}2 = 32$; bit0(=0): $32^2 = 1024 \bmod 1000 = 24$. → $2^{10} \bmod 1000 = 24$. Verify $1024 \bmod 1000 = 24$ ✓.
2. bit2(=1): $1^2 \to {\times}a = a$; bit1(=0): $a^2$; bit0(=1): $(a^2)^2 = a^4 \to {\times}a = a^5$. → $a^5$ trong 2 phép nhân + 2 bình phương thay vì 4 phép nhân.

</details>

### 📝 Tóm tắt mục 7

- $a^k \bmod n$ trong $O(\log k)$: duyệt bit nhị phân của $k$, mỗi bit **bình phương**, bit = 1 thì **nhân thêm** base.
- Luôn mod sau MỖI bước → số trung gian $< n^2$, không tràn.
- Nền tảng tính toán của RSA / Diffie-Hellman (mũ hàng nghìn bit vẫn nhanh).

---

## 8. Định lý Fermat nhỏ

💡 **Trực giác / Hình dung**: lũy thừa trong mod $p$ luôn "xoay vòng" về 1 sau đúng $p-1$ bước. Như đồng hồ $p-1$ nấc: nâng $a$ lên mũ $p-1$ thì kim quay trọn vòng về mốc 1. Điều này biến việc tính $a^{\text{số khổng lồ}} \bmod p$ thành tính $a^{\text{số nhỏ}} \bmod p$ — chỉ cần lấy mũ $\bmod (p-1)$.

🎯 **Phát biểu**: Nếu $p$ là số nguyên tố và $\gcd(a, p) = 1$ thì:

$$a^{p-1} \equiv 1 \pmod{p}$$

**Hệ quả**: $a^p \equiv a \pmod{p}$, mọi $a$ (kể cả khi $p \mid a$).

**4 ví dụ số đa dạng**:
- $2^6 \equiv 1 \pmod{7}$: $64 = 7 \cdot 9 + 1$ ✓.
- $3^4 \equiv 1 \pmod{5}$: $81 = 5 \cdot 16 + 1$ ✓.
- $5^6 \equiv 1 \pmod{7}$: $15625 = 7 \cdot 2232 + 1$ ✓.
- $10^{13-1} = 10^{12} \equiv 1 \pmod{13}$ (cơ số 10, $p = 13$).

**Verify từng bước $2^6 \equiv 1 \pmod 7$** (không dùng định lý, tính tay):

$$\begin{aligned}
2^1 &= 2, \quad 2^2 = 4, \quad 2^3 = 8 \equiv 1 \pmod 7\\
2^6 &= (2^3)^2 \equiv 1^2 = 1 \pmod 7 \;\checkmark
\end{aligned}$$

**Verify từng bước $3^4 \equiv 1 \pmod 5$**:

$$3^1 = 3,\; 3^2 = 9 \equiv 4 \equiv -1,\; 3^4 = (3^2)^2 \equiv (-1)^2 = 1 \pmod 5 \;\checkmark$$

**Fermat dùng tính nghịch đảo** (liên kết mục 6): khi $p$ nguyên tố, $a^{-1} \equiv a^{p-2} \pmod p$. Vd $a = 3, p = 7$: $3^{-1} \equiv 3^5 = 243 \equiv 5 \pmod 7$ (vì $243 = 34\cdot7 + 5$). Verify $3 \cdot 5 = 15 \equiv 1$ ✓.

**Ứng dụng**: Tính nhanh $a^N \bmod p$ khi $N$ lớn.
- $5^{100} \bmod 7$. $\varphi(7) = 6$.
- $100 = 6 \cdot 16 + 4$ → $5^{100} = (5^6)^{16} \cdot 5^4 \equiv 1^{16} \cdot 5^4 = 625 \bmod 7$.
- $625 = 7 \cdot 89 + 2$ → $\equiv$ **2** $\pmod{7}$.

### Định lý Euler (tổng quát hóa)

Nếu $\gcd(a, n) = 1$:

$$a^{\varphi(n)} \equiv 1 \pmod{n}$$

trong đó **$\varphi(n)$** = số các số nguyên $< n$ và coprime với $n$ (hàm Euler).

**Ví dụ**: $\varphi(10) = 4$ (gồm 1, 3, 7, 9). $\varphi(p) = p-1$ nếu $p$ nguyên tố.

**4 ví dụ $\varphi(n)$ với liệt kê verify (đa dạng: nguyên tố, lũy thừa, tích 2 nguyên tố, có 3 thừa số)**:
- $\varphi(7) = 6$ — 7 nguyên tố, tất cả $\{1,2,3,4,5,6\}$ coprime.
- $\varphi(9) = 6$ — $9 = 3^2$, công thức $\varphi(p^k) = p^k - p^{k-1} = 9 - 3 = 6$. Liệt kê: $\{1,2,4,5,7,8\}$ (bỏ bội của 3) → 6 số ✓.
- $\varphi(15) = 8$ — $15 = 3 \cdot 5$, $\varphi = (3-1)(5-1) = 8$. Liệt kê: $\{1,2,4,7,8,11,13,14\}$ → 8 số ✓.
- $\varphi(30) = 8$ — $30 = 2\cdot3\cdot5$, $\varphi = 30(1{-}\tfrac12)(1{-}\tfrac13)(1{-}\tfrac15) = 30 \cdot \tfrac12 \cdot \tfrac23 \cdot \tfrac45 = 8$. Liệt kê: $\{1,7,11,13,17,19,23,29\}$ → 8 số ✓.

### Công thức

Nếu $n = p_1^{a_1} \cdot \ldots \cdot p_k^{a_k}$:

$$\varphi(n) = n \cdot \prod\left(1 - \frac{1}{p_i}\right)$$

**Ví dụ**: $\varphi(12) = 12 \cdot (1-1/2) \cdot (1-1/3) = 12 \cdot (1/2) \cdot (2/3) = $ **4**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Điều kiện $\gcd(a, p) = 1$ quan trọng thế nào?"* Rất. Nếu $p \mid a$ thì $a \equiv 0 \pmod{p}$ → $a^{p-1} \equiv 0 \neq 1$. Vd $7^6 \bmod 7 = 0$, không phải 1. Định lý chỉ áp dụng cho $a$ coprime với $p$.
- *"Khi mod $n$ KHÔNG nguyên tố thì dùng gì?"* Dùng **Euler** thay Fermat: $a^{\varphi(n)} \equiv 1 \pmod{n}$ (cần $\gcd(a,n)=1$). Fermat là trường hợp riêng khi $n = p$ nguyên tố (vì $\varphi(p) = p-1$).

⚠ **Lỗi thường gặp**: dùng $a^{n-1} \equiv 1 \pmod{n}$ với $n$ **hợp số**. SAI. Phản ví dụ: $2^{10-1} = 2^9 = 512 \bmod 10 = 2 \neq 1$ (vì 10 không nguyên tố). Phải dùng $a^{\varphi(10)} = a^4$: $2^4 = 16 \equiv 6$... nhưng $\gcd(2,10) \neq 1$ nên Euler cũng không áp dụng. Chọn $a$ coprime: $3^4 = 81 \equiv 1 \pmod{10}$ ✓.

🔁 **Dừng lại tự kiểm tra**

1. Tính $2^{100} \bmod 5$ bằng Fermat.
2. $\varphi(15) = ?$

<details><summary>Đáp án</summary>

1. $\varphi(5) = 4$, $100 = 4 \cdot 25$ → $2^{100} = (2^4)^{25} \equiv 1^{25} = 1 \pmod{5}$.
2. $15 = 3 \cdot 5$ → $\varphi(15) = 15 \cdot (2/3) \cdot (4/5) = 8$. (Hoặc $(3-1)(5-1) = 8$.)

</details>

### 📝 Tóm tắt mục 8

- **Fermat nhỏ**: $p$ nguyên tố, $\gcd(a,p)=1$ → $a^{p-1} \equiv 1 \pmod{p}$.
- **Euler** (tổng quát): $\gcd(a,n)=1$ → $a^{\varphi(n)} \equiv 1 \pmod{n}$.
- $\varphi(n) = n \cdot \prod(1-1/p_i)$; điều kiện coprime BẮT BUỘC — đừng dùng với $p \mid a$ hay $n$ hợp số sai cách.

---

## 9. Bài tập

### Bài tập

**Bài 1**: Phân tích 504 ra thừa số nguyên tố.

**Bài 2**: Tìm $\varphi(36)$.

**Bài 3**: Tính $3^{100} \bmod 7$.

**Bài 4**: $13!$ chia hết cho 7?

**Bài 5**: $2^{1000000}$ lẻ hay chẵn?

**Bài 6**: Tìm $5^{-1} \bmod 12$ bằng Euclid mở rộng, verify kết quả.

**Bài 7**: Dùng square-and-multiply, tính $3^{13} \bmod 11$. Đối chiếu với Fermat.

**Bài 8**: Liệt kê tất cả nguyên tố $\le 20$ bằng cách mô tả các bước sàng Eratosthenes (gạch bội của những nguyên tố nào, bắt đầu từ đâu).

### Lời giải

**Bài 1**: $504 = 8 \cdot 63 = 2^3 \cdot 63 = 2^3 \cdot 9 \cdot 7 = $ **$2^3 \cdot 3^2 \cdot 7$**.

**Bài 2**: $36 = 2^2 \cdot 3^2$. $\varphi(36) = 36 \cdot (1/2) \cdot (2/3) = $ **12**. Verify công thức tích: $\varphi(4)\varphi(9) = 2 \cdot 6 = 12$ ✓.

**Bài 3**: $3^6 \equiv 1 \pmod{7}$ (Fermat). $100 = 6 \cdot 16 + 4$ → $3^{100} \equiv 3^4 = 81 = 11 \cdot 7+4 \equiv$ **4** $\pmod{7}$.

**Bài 4**: $13! = 1 \cdot 2 \cdot \ldots \cdot 13$ chứa thừa số 7 → **có** (chia hết cho 7).

**Bài 5**: $2^N$ chẵn với mọi $N \ge 1$ (luôn có thừa số 2). → **chẵn**.

**Bài 6**: $\gcd(5,12) = 1$ → tồn tại. Euclid mở rộng:

$$\begin{aligned}
12 &= 2 \cdot 5 + 2 \Rightarrow 2 = 12 - 2 \cdot 5\\
5 &= 2 \cdot 2 + 1 \Rightarrow 1 = 5 - 2 \cdot 2\\
&= 5 - 2 \cdot (12 - 2 \cdot 5) = 5 \cdot 5 - 2 \cdot 12
\end{aligned}$$

→ $5^{-1} \equiv 5 \pmod{12}$. Verify: $5 \cdot 5 = 25 = 2 \cdot 12 + 1 \equiv 1$ ✓.

**Bài 7**: $13 = 1101_2$, $base = 3$, mod 11.

```
bit3(=1): 1^2=1        → ×3 = 3
bit2(=1): 3^2=9        → ×3 = 27 mod 11 = 5
bit1(=0): 5^2=25 mod 11 = 3       (không nhân)
bit0(=1): 3^2=9        → ×3 = 27 mod 11 = 5
→ 3^13 mod 11 = 5
```

Đối chiếu Fermat: $3^{10} \equiv 1 \pmod{11}$, $13 = 10 + 3$ → $3^{13} \equiv 3^3 = 27 \equiv 5$ ✓.

**Bài 8**: $\sqrt{20} \approx 4.47$ → chỉ gạch bội của các nguyên tố $\le 4$, tức $\{2, 3\}$.
- Chốt 2, gạch bội từ $2^2 = 4$: $4,6,8,10,12,14,16,18,20$.
- Chốt 3, gạch bội từ $3^2 = 9$: $9,15$ ($6,12,18$ đã bị 2 gạch).
- Số kế tiếp là 5, nhưng $5 > \sqrt{20}$ → dừng. Còn lại: **2, 3, 5, 7, 11, 13, 17, 19** (8 nguyên tố).

---

## 10. Bài tiếp theo

[Lesson 03 — Hoán vị & tổ hợp](../lesson-03-permutations-combinations/).

## 📝 Tổng kết

1. **Nguyên tố** = ước chỉ 1 và chính nó ("nguyên tử của số"). Vô hạn (chứng minh Euclid, $N = \prod p_i + 1$ có ước nguyên tố mới).
2. **Phân tích duy nhất**: $n = \prod p_i^{a_i}$ (dựa trên bổ đề Euclid); gcd/lcm = min/max số mũ.
3. **Sàng Eratosthenes** $O(N \log \log N)$: gạch bội của từng nguyên tố $\le \sqrt N$, bắt đầu từ $p^2$.
4. **Đồng dư** $a \equiv b \pmod{m}$ ("đồng hồ"): cộng/trừ/nhân/lũy thừa được; chia phải dùng nghịch đảo.
5. **Nghịch đảo modular** $a^{-1}$: tồn tại $\iff \gcd(a,n)=1$, tính bằng **Euclid mở rộng**.
6. **Lũy thừa nhanh** (square-and-multiply): $a^k \bmod n$ trong $O(\log k)$ — nền tảng RSA.
7. **Fermat nhỏ**: $a^{p-1} \equiv 1 \pmod{p}$. **Euler**: $a^{\varphi(n)} \equiv 1 \pmod{n}$, $\varphi(n) = n\prod(1-1/p_i)$.
