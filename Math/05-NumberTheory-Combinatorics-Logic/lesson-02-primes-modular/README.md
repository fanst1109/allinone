# Lesson 02 — Số nguyên tố & Đồng dư

## Mục tiêu

- Hiểu **số nguyên tố** và **định lý cơ bản số học** (phân tích duy nhất).
- Sàng Eratosthenes — tìm tất cả nguyên tố $\le N$.
- **Đồng dư** $a \equiv b \pmod{m}$.
- Định lý Fermat nhỏ, định lý Euler.

## Kiến thức tiền đề

- [Lesson 01 — Chia hết & GCD](../lesson-01-divisibility-gcd/).

---

## 1. Số nguyên tố — Định nghĩa

💡 **Trực giác / Hình dung**: số nguyên tố là "viên gạch không thể chẻ nhỏ" của phép nhân. Bạn có thể xếp 12 viên thành hình chữ nhật 3×4 hay 2×6 (12 là hợp số), nhưng 7 viên thì chỉ xếp được 1 hàng 1×7 — không có cách chia thành chữ nhật "đầy đặn" nào khác. Số nguyên tố là số "không xếp được chữ nhật" ngoài 1 hàng.

**Định nghĩa**: Số tự nhiên $p > 1$ là nguyên tố nếu $p$ **chỉ có 2 ước**: 1 và chính nó.

- Số đầu tiên: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, ...
- **2 là số nguyên tố chẵn DUY NHẤT**.

**Hợp số**: số $> 1$ không nguyên tố (có ít nhất 1 ước khác 1 và chính nó).

**4 ví dụ số đa dạng**:
- $7$ nguyên tố: ước chỉ $\{1, 7\}$.
- $12$ hợp số: ước $\{1, 2, 3, 4, 6, 12\}$ — nhiều hơn 2.
- $2$ nguyên tố (chẵn duy nhất): ước $\{1, 2\}$.
- $1$ KHÔNG nguyên tố cũng KHÔNG hợp số: chỉ có 1 ước.

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

⟶ Lý do tại sao nguyên tố quan trọng: là "viên gạch" xây mọi số tự nhiên.

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

**Độ phức tạp**: $O(N \cdot \log \log N)$ — gần tuyến tính.

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

### Tính chất

Đồng dư là quan hệ tương đương (phản xạ, đối xứng, bắc cầu). Hơn nữa:
- $a \equiv b, c \equiv d \pmod{m}$ → $a + c \equiv b + d \pmod{m}$.
- $a \equiv b, c \equiv d \pmod{m}$ → $a \cdot c \equiv b \cdot d \pmod{m}$.
- $a \equiv b \pmod{m}$ → $a^k \equiv b^k \pmod{m}$.

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

## 6. Định lý Fermat nhỏ

💡 **Trực giác / Hình dung**: lũy thừa trong mod $p$ luôn "xoay vòng" về 1 sau đúng $p-1$ bước. Như đồng hồ $p-1$ nấc: nâng $a$ lên mũ $p-1$ thì kim quay trọn vòng về mốc 1. Điều này biến việc tính $a^{\text{số khổng lồ}} \bmod p$ thành tính $a^{\text{số nhỏ}} \bmod p$ — chỉ cần lấy mũ $\bmod (p-1)$.

🎯 **Phát biểu**: Nếu $p$ là số nguyên tố và $\gcd(a, p) = 1$ thì:

$$a^{p-1} \equiv 1 \pmod{p}$$

**Hệ quả**: $a^p \equiv a \pmod{p}$, mọi $a$ (kể cả khi $p \mid a$).

**4 ví dụ số đa dạng**:
- $2^6 \equiv 1 \pmod{7}$: $64 = 7 \cdot 9 + 1$ ✓.
- $3^4 \equiv 1 \pmod{5}$: $81 = 5 \cdot 16 + 1$ ✓.
- $5^6 \equiv 1 \pmod{7}$: $15625 = 7 \cdot 2232 + 1$ ✓.
- $10^{13-1} = 10^{12} \equiv 1 \pmod{13}$ (cơ số 10, $p = 13$).

**Ứng dụng**: Tính nhanh $a^N \bmod p$ khi $N$ lớn.
- $5^{100} \bmod 7$. $\varphi(7) = 6$.
- $100 = 6 \cdot 16 + 4$ → $5^{100} = (5^6)^{16} \cdot 5^4 \equiv 1^{16} \cdot 5^4 = 625 \bmod 7$.
- $625 = 7 \cdot 89 + 2$ → $\equiv$ **2** $\pmod{7}$.

### Định lý Euler (tổng quát hóa)

Nếu $\gcd(a, n) = 1$:

$$a^{\varphi(n)} \equiv 1 \pmod{n}$$

trong đó **$\varphi(n)$** = số các số nguyên $< n$ và coprime với $n$ (hàm Euler).

**Ví dụ**: $\varphi(10) = 4$ (gồm 1, 3, 7, 9). $\varphi(p) = p-1$ nếu $p$ nguyên tố.

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

### 📝 Tóm tắt mục 6

- **Fermat nhỏ**: $p$ nguyên tố, $\gcd(a,p)=1$ → $a^{p-1} \equiv 1 \pmod{p}$.
- **Euler** (tổng quát): $\gcd(a,n)=1$ → $a^{\varphi(n)} \equiv 1 \pmod{n}$.
- $\varphi(n) = n \cdot \prod(1-1/p_i)$; điều kiện coprime BẮT BUỘC — đừng dùng với $p \mid a$ hay $n$ hợp số sai cách.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Phân tích 504 ra thừa số nguyên tố.

**Bài 2**: Tìm $\varphi(36)$.

**Bài 3**: Tính $3^{100} \bmod 7$.

**Bài 4**: $13!$ chia hết cho 7?

**Bài 5**: $2^{1000000}$ lẻ hay chẵn?

### Lời giải

**Bài 1**: $504 = 8 \cdot 63 = 2^3 \cdot 63 = 2^3 \cdot 9 \cdot 7 = $ **$2^3 \cdot 3^2 \cdot 7$**.

**Bài 2**: $36 = 2^2 \cdot 3^2$. $\varphi(36) = 36 \cdot (1/2) \cdot (2/3) = $ **12**.

**Bài 3**: $3^6 \equiv 1 \pmod{7}$ (Fermat). $100 = 6 \cdot 16 + 4$ → $3^{100} \equiv 3^4 = 81 = 11 \cdot 7+4 \equiv$ **4** $\pmod{7}$.

**Bài 4**: $13! = 1 \cdot 2 \cdot \ldots \cdot 13$ chứa 7 → **có**.

**Bài 5**: $2^N$ chẵn với mọi $N \ge 1$. → **chẵn**.

---

## 8. Bài tiếp theo

[Lesson 03 — Hoán vị & tổ hợp](../lesson-03-permutations-combinations/).

## 📝 Tổng kết

1. **Nguyên tố** = ước chỉ 1 và chính nó. Vô hạn (chứng minh Euclid).
2. **Phân tích duy nhất**: $n = \prod p_i^{a_i}$.
3. **Sàng Eratosthenes** $O(N \log \log N)$.
4. **Đồng dư** $a \equiv b \pmod{m}$: cộng/nhân/lũy thừa được.
5. **Fermat nhỏ**: $a^{p-1} \equiv 1 \pmod{p}$. **Euler**: $a^{\varphi(n)} \equiv 1 \pmod{n}$.
