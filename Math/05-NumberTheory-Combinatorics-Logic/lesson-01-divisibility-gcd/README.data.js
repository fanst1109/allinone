// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/05-NumberTheory-Combinatorics-Logic/lesson-01-divisibility-gcd/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Chia hết & GCD

## Mục tiêu

- Hiểu **chia hết**, **chia có dư**.
- **Phép chia Euclid** và thuật toán Euclid tính GCD.
- **Định lý Bezout**: $\\gcd(a, b) = ax + by$ với x, y nguyên.
- LCM (bội chung nhỏ nhất) và quan hệ với GCD.

## Kiến thức tiền đề

- [Tier 1 — Hệ số học](../../01-Arithmetic-Algebra/lesson-01-number-systems/).

---

## 1. Chia hết & Phép chia Euclid

💡 **Trực giác / Hình dung**: "chia hết" nghĩa là **chia ra đúng từng phần bằng nhau, không thừa**. 18 cái kẹo chia cho 6 bạn → mỗi bạn 3 cái, **không dư** → $6 \\mid 18$. 18 cái chia cho 5 bạn → mỗi bạn 3 cái, **dư 3** → $5 \\nmid 18$. Phép chia Euclid chỉ là cách viết "thừa bao nhiêu" thành công thức: $\\text{số bị chia} = \\text{số chia} \\times \\text{thương} + \\text{số dư}$.

**Định nghĩa**: a chia hết cho b ($b \\neq 0$), ký hiệu **$b \\mid a$**, nếu $\\exists k \\in \\mathbb{Z}: a = b \\cdot k$.

**4 ví dụ số đa dạng**:
- $6 \\mid 18$ (vì $18 = 6 \\cdot 3$, $k = 3$ dương).
- $5 \\nmid 18$ (không có k nguyên: $18/5 = 3.6$).
- $7 \\mid (-21)$ (vì $-21 = 7 \\cdot (-3)$, k âm vẫn hợp lệ).
- $b \\mid 0$ với mọi $b \\neq 0$ (vì $0 = b \\cdot 0$); và $1 \\mid a$ với mọi a (vì $a = 1 \\cdot a$).

### Phép chia có dư (Euclid)

Với mọi $a, b \\in \\mathbb{Z}$ ($b \\neq 0$), tồn tại duy nhất q, r:

$$a = b \\cdot q + r, \\quad \\text{với } 0 \\le r < |b|$$

q = thương, r = số dư.

**4 ví dụ số đa dạng**:
- $23 \\div 7$: $23 = 7 \\cdot 3 + 2$ → $q = 3$, $r = 2$.
- $100 \\div 9$: $100 = 9 \\cdot 11 + 1$ → $q = 11$, $r = 1$.
- $45 \\div 5$: $45 = 5 \\cdot 9 + 0$ → $r = 0$ (đúng lúc chia hết).
- $-7 \\div 3$: phải $-7 = 3 \\cdot (-3) + 2$ → $q = -3$, $r = 2$ (KHÔNG phải $q = -2$, $r = -1$, vì r bắt buộc $\\ge 0$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao số dư phải $0 \\le r < |b|$, không cho âm?"* Để q, r là **duy nhất**. Nếu cho r âm thì $23 = 7 \\cdot 3 + 2$ và $23 = 7 \\cdot 4 - 5$ đều "đúng" → không xác định. Ràng buộc $0 \\le r < |b|$ chốt đúng 1 cặp.
- *"Số âm chia thì r tính sao?"* Vẫn phải $0 \\le r$: $-7 \\div 3$ cho $r = 2$ (không phải $-1$). Đó là lý do $-7 \\bmod 3 = 2$ trong toán học (khác một số ngôn ngữ lập trình trả về $-1$).

⚠ **Lỗi thường gặp**: lẫn "**$b \\mid a$**" (b chia hết a) với "**$a / b$**" (a chia b). Ký hiệu $6 \\mid 18$ đọc là "6 là ước của 18" — số nhỏ đứng trước. Viết ngược $18 \\mid 6$ là SAI (6 không phải bội của 18). Phản ví dụ: $3 \\mid 12$ đúng, $12 \\mid 3$ sai.

🔁 **Dừng lại tự kiểm tra**

1. Tìm q, r của $38 \\div 5$.
2. $4 \\mid 0$ đúng hay sai?

<details><summary>Đáp án</summary>

1. $38 = 5 \\cdot 7 + 3$ → $q = 7$, $r = 3$.
2. **Đúng**: $0 = 4 \\cdot 0$, mọi $b \\neq 0$ đều chia hết 0.

</details>

### 📝 Tóm tắt mục 1

- $b \\mid a \\iff \\exists k \\in \\mathbb{Z}: a = b \\cdot k$. Số nhỏ (ước) viết trước dấu $\\mid$.
- Phép chia Euclid: $a = bq + r$ với $0 \\le r < |b|$ — q, r **duy nhất**.
- Số dư luôn không âm, kể cả khi a âm ($-7 \\div 3$ cho $r = 2$).

---

## 2. Tính chất chia hết

💡 **Trực giác / Hình dung**: nếu một con số chia hết cho $a$ thì nó "đóng gói được thành các bó kích thước $a$". Cộng/trừ hai số cùng đóng gói được kích thước $a$ → kết quả vẫn đóng gói được kích thước $a$. Đó là toàn bộ tinh thần các tính chất dưới.

- **Bắc cầu**: $a \\mid b$ và $b \\mid c$ → $a \\mid c$.
- **Tổng**: $a \\mid b$ và $a \\mid c$ → $a \\mid (b+c)$, $a \\mid (b-c)$.
- **Nhân hằng**: $a \\mid b$ → $a \\mid (b \\cdot k)$.
- **Hệ quả**: $a \\mid b$ → $a \\mid (b \\cdot m + c \\cdot n)$ khi $a \\mid c$.

**4 ví dụ số đa dạng**:
- Bắc cầu: $2 \\mid 6$ và $6 \\mid 18$ → $2 \\mid 18$ ✓.
- Tổng: $3 \\mid 9$ và $3 \\mid 12$ → $3 \\mid (9+12) = 21$ ✓; và $3 \\mid (12-9) = 3$ ✓.
- Nhân hằng: $5 \\mid 10$ → $5 \\mid (10 \\cdot 7) = 70$ ✓.
- Tổ hợp tuyến tính: $4 \\mid 8$ và $4 \\mid 12$ → $4 \\mid (8 \\cdot 2 + 12 \\cdot 3) = 16+36 = 52$ ✓ ($52 = 4 \\cdot 13$).

**Chứng minh tính chất Tổng (từng bước, không "dễ thấy")**: giả thiết $a \\mid b$ và $a \\mid c$. Theo định nghĩa, $\\exists k_1, k_2 \\in \\mathbb{Z}: b = a \\cdot k_1$, $c = a \\cdot k_2$. Khi đó $b + c = a \\cdot k_1 + a \\cdot k_2 = a \\cdot (k_1 + k_2)$. Vì $k_1 + k_2 \\in \\mathbb{Z}$, theo định nghĩa $a \\mid (b+c)$. Trừ tương tự với $k_1 - k_2$. □

❓ **Câu hỏi tự nhiên của người đọc**

- *"$a \\mid b$ và $a \\mid c$ → $a \\mid (b+c)$, vậy chiều ngược lại đúng không?"* **Không**. $5 \\mid (3+2)=5$ nhưng $5 \\nmid 3$ và $5 \\nmid 2$. Tổng chia hết KHÔNG suy ra từng số hạng chia hết.
- *"Nếu $a \\mid (b+c)$ và $a \\mid b$ thì có $a \\mid c$ không?"* **Có**: $c = (b+c) - b$, hiệu của 2 số cùng chia hết a → chia hết a. Đây là mẹo dùng nhiều trong chứng minh.

⚠ **Lỗi thường gặp**: tưởng $a \\mid bc \\to a \\mid b$ hoặc $a \\mid c$. SAI khi a không nguyên tố. Phản ví dụ: $6 \\mid (4 \\cdot 9) = 36$ nhưng $6 \\nmid 4$ và $6 \\nmid 9$. (Tính chất này CHỈ đúng khi a nguyên tố — bổ đề Euclid, học ở L02.)

🔁 **Dừng lại tự kiểm tra**

1. Biết $7 \\mid 21$ và $7 \\mid 49$, suy ra $7$ chia hết số nào: $21+49$? $49-21$? $21 \\cdot 5$?
2. Đúng hay sai: $4 \\mid 12 \\to 4 \\mid 3$?

<details><summary>Đáp án</summary>

1. Cả ba: $7 \\mid 70$, $7 \\mid 28$, $7 \\mid 105$ ($= 21 \\cdot 5$).
2. **Sai** — đây là bẫy chiều ngược. $4 \\mid 12$ không kéo theo $4 \\mid 3$ (3 còn nhỏ hơn 4).

</details>

### 📝 Tóm tắt mục 2

- Chia hết "đóng" với cộng, trừ, nhân hằng số, và tổ hợp tuyến tính.
- Chiều ngược KHÔNG đúng: $a \\mid (b+c)$ không suy ra $a \\mid b$.
- $a \\mid bc \\to a \\mid b$ hoặc $a \\mid c$ chỉ đúng khi a nguyên tố.

---

## 3. GCD — Ước chung lớn nhất

**Định nghĩa**: $\\gcd(a, b)$ = số $d$ lớn nhất sao cho $d \\mid a$ và $d \\mid b$. Ký hiệu $(a, b)$ hoặc $\\gcd(a, b)$.

**Ví dụ**: $\\gcd(24, 36)$:
- Ước 24: 1, 2, 3, 4, 6, 8, 12, 24.
- Ước 36: 1, 2, 3, 4, 6, 9, 12, 18, 36.
- Chung lớn nhất: **12**.

> 📐 **Định nghĩa đầy đủ — GCD (Greatest Common Divisor)**
>
> **(a) Là gì**: Số nguyên dương **lớn nhất** chia hết đồng thời cả 2 số $a, b$. Tương đương = tích các thừa số nguyên tố chung (lấy số mũ nhỏ hơn). Khi $\\gcd(a, b) = 1$ → $a$ và $b$ **nguyên tố cùng nhau** (coprime).
>
> **(b) Vì sao cần**: Rất nhiều bài toán quy về GCD: rút gọn phân số (chia tử mẫu cho gcd), tìm chu kỳ chung của 2 sự kiện tuần hoàn, xác định khi nào hệ PT Diophantine có nghiệm (định lý Bezout). Trong **mật mã RSA**: chọn $e$ sao cho $\\gcd(e, \\varphi(N)) = 1$ — cốt lõi an toàn bảo mật. Thuật toán Euclid tính GCD trong $O(\\log n)$ — cực nhanh, dùng được với số 1000+ chữ số.
>
> **(c) Ví dụ số**: $\\gcd(24, 36) = 12$. Verify: $24 = 12 \\cdot 2$, $36 = 12 \\cdot 3$ ✓. $\\gcd(15, 28) = 1$ (coprime — không có ước chung nào $> 1$). $\\gcd(48, 60)$ bằng Euclid: $60 = 48 \\cdot 1 + 12$, $48 = 12 \\cdot 4 + 0$ → $\\gcd = $ **12**. Rút gọn $48/60 = 4/5$. Phân tích thừa số: $24 = 2^3 \\cdot 3$, $36 = 2^2 \\cdot 3^2$ → $\\gcd = 2^2 \\cdot 3 = 12$ ✓. $\\operatorname{lcm}(24, 36) = 24 \\cdot 36/12 = $ **72** ($= 2^3 \\cdot 3^2$).

### Thuật toán Euclid — Cực nhanh

💡 **Ý tưởng**: $\\gcd(a, b) = \\gcd(b, a \\bmod b)$. Lặp đến khi $b = 0$.

**Ví dụ**: $\\gcd(252, 105)$:
- $252 = 105 \\cdot 2 + 42$ → $\\gcd(105, 42)$.
- $105 = 42 \\cdot 2 + 21$ → $\\gcd(42, 21)$.
- $42 = 21 \\cdot 2 + 0$ → $\\gcd(21, 0) = $ **21**.

⟶ Chỉ 3 bước! Tốt hơn liệt kê ước.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $\\gcd(a, b) = \\gcd(b, a \\bmod b)$?"* Vì tập **ước chung** của $(a, b)$ và của $(b, r)$ là **giống hệt nhau**. Chứng minh từng bước: viết $a = b \\cdot q + r$, tức $r = a - b \\cdot q$. (→) Nếu $d \\mid a$ và $d \\mid b$ thì $d \\mid (a - bq) = r$, nên $d$ là ước chung của $(b, r)$. (←) Nếu $d \\mid b$ và $d \\mid r$ thì $d \\mid (bq + r) = a$, nên $d$ là ước chung của $(a, b)$. Hai tập ước chung trùng nhau → ước chung **lớn nhất** cũng bằng nhau. □
- *"Tại sao thuật toán dừng?"* Vì số dư $r$ giảm nghiêm ngặt sau mỗi bước ($0 \\le r < b$), dãy số tự nhiên giảm thì phải về 0. Khi $b = 0$, $\\gcd(a, 0) = a$.

⚠ **Lỗi thường gặp**: nhầm $\\gcd(a, 0)$. Nhiều người tưởng $\\gcd(a, 0) = 0$. SAI — $\\gcd(a, 0) = a$ (vì mọi số chia hết 0, ước chung lớn nhất của $a$ và 0 là chính $a$). Phản ví dụ: $\\gcd(12, 0) = 12$, không phải 0. Đây đúng là điều kiện dừng của thuật toán.

### Độ phức tạp

Số bước Euclid $\\le 5 \\cdot \\log_{10}(\\min(a,b))$. Cực nhanh — $O(\\log n)$.

🔁 **Dừng lại tự kiểm tra**

1. Chạy Euclid tính $\\gcd(48, 18)$ từng bước.
2. $\\gcd(17, 0) = ?$

<details><summary>Đáp án</summary>

1. $48 = 2 \\cdot 18 + 12$ → $\\gcd(18,12)$; $18 = 1 \\cdot 12 + 6$ → $\\gcd(12,6)$; $12 = 2 \\cdot 6 + 0$ → **gcd = 6**.
2. $17$ (gcd với 0 là chính số kia).

</details>

### 📝 Tóm tắt mục 3

- $\\gcd(a, b)$ = số lớn nhất chia hết cả $a$ và $b$.
- Thuật toán Euclid: $\\gcd(a, b) = \\gcd(b, a \\bmod b)$, dừng tại $\\gcd(d, 0) = d$.
- Đúng vì ước chung của $(a, b)$ trùng tập ước chung của $(b, r)$. Chạy $O(\\log n)$.

---

## 4. Định lý Bezout

💡 **Trực giác / Hình dung**: tưởng tượng bạn chỉ có 2 loại "bước nhảy" dài $a$ và $b$ (đi tới hoặc đi lui). Bezout nói: số nhỏ nhất (dương) bạn có thể "đo được" bằng cách phối hợp các bước này chính là $\\gcd(a, b)$. Với $a = 6$, $b = 9$ ($\\gcd = 3$): bạn nhảy lui 1 bước 6, tới 1 bước... không ra 3 ngay, nhưng $6 \\cdot (-1) + 9 \\cdot 1 = 3$ ✓ — đo được đúng 3, không đo được 1 hay 2.

🎯 **Phát biểu**: Cho $a, b \\in \\mathbb{Z}$. Tồn tại $x, y \\in \\mathbb{Z}$ sao cho:

$$a \\cdot x + b \\cdot y = \\gcd(a, b)$$

💡 **Hệ quả**: $ax + by = c$ có nghiệm nguyên $\\iff \\gcd(a, b) \\mid c$.

### Thuật toán Euclid mở rộng

Lùi ngược các bước Euclid để tìm $x, y$.

**Ví dụ**: Tìm $x, y$: $252x + 105y = 21$.
- $252 = 105 \\cdot 2 + 42$ → $42 = 252 - 2 \\cdot 105$.
- $105 = 42 \\cdot 2 + 21$ → $21 = 105 - 2 \\cdot 42 = 105 - 2 \\cdot (252 - 2 \\cdot 105) = 5 \\cdot 105 - 2 \\cdot 252$.
- ⟶ **x = -2, y = 5**. Kiểm tra: $252 \\cdot (-2) + 105 \\cdot 5 = -504 + 525 = 21$ ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$x, y$ có duy nhất không?"* **Không**. Nếu $(x, y)$ là 1 nghiệm thì $(x + b/g, y - a/g)$ cũng là nghiệm (với $g = \\gcd$). Vd $252 \\cdot (-2)+105 \\cdot 5 = 21$ và cũng $252 \\cdot 3 + 105 \\cdot (-7) = 756 - 735 = 21$ ✓. Có vô số cặp.
- *"$6x + 9y = 4$ có nghiệm nguyên không?"* **Không**, vì $\\gcd(6,9) = 3$ và $3 \\nmid 4$. Vế trái luôn là bội của 3, không thể bằng 4.

⚠ **Lỗi thường gặp**: tưởng $ax + by = c$ luôn giải được với mọi $c$. Chỉ giải được khi $\\gcd(a,b) \\mid c$. Phản ví dụ: $4x + 6y = 5$ vô nghiệm (vế trái luôn chẵn, 5 lẻ); $\\gcd(4,6)=2 \\nmid 5$.

🔁 **Dừng lại tự kiểm tra**

1. $15x + 25y = 10$ có nghiệm nguyên không?
2. $15x + 25y = 7$ có nghiệm nguyên không?

<details><summary>Đáp án</summary>

1. $\\gcd(15,25) = 5$, $5 \\mid 10$ → **có**. Vd chia 5: $3x + 5y = 2$, thử $x = -1, y = 1$: $-3+5 = 2$ ✓.
2. $5 \\nmid 7$ → **không**.

</details>

### 📝 Tóm tắt mục 4

- Bezout: $\\exists\\, x, y \\in \\mathbb{Z}: ax + by = \\gcd(a, b)$. Tìm $x, y$ bằng Euclid mở rộng (lùi ngược).
- $ax + by = c$ giải được $\\iff \\gcd(a,b) \\mid c$.
- Nghiệm KHÔNG duy nhất — có vô số cặp $(x, y)$.

---

## 5. LCM — Bội chung nhỏ nhất

💡 **Trực giác / Hình dung**: 2 bánh răng quay cùng nhau, một cái có $a$ răng, cái kia $b$ răng. Sau bao nhiêu răng thì cả 2 cùng trở về vị trí xuất phát? Đó chính là $\\operatorname{lcm}(a, b)$ — "chu kỳ chung" nhỏ nhất. Đèn nhấp nháy mỗi 24s và mỗi 36s sẽ cùng sáng lại sau $\\operatorname{lcm}(24, 36) = 72$s.

**Định nghĩa**: $\\operatorname{lcm}(a, b)$ = số dương $m$ nhỏ nhất sao cho $a \\mid m$ và $b \\mid m$.

**Công thức**:

$$\\operatorname{lcm}(a, b) \\cdot \\gcd(a, b) = |a \\cdot b|$$

⟶ Có GCD là tính được LCM.

**4 ví dụ số đa dạng**:
- $\\operatorname{lcm}(24, 36) = 24 \\cdot 36/12 = 72$ ($\\gcd = 12$).
- $\\operatorname{lcm}(4, 6) = 24/2 = 12$ ($\\gcd = 2$).
- $\\operatorname{lcm}(15, 28) = 420/1 = 420$ (coprime → LCM = tích).
- $\\operatorname{lcm}(6, 12) = 72/6 = 12$ ($a \\mid b$ → LCM = $b$ lớn hơn).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $\\operatorname{lcm} \\cdot \\gcd = |ab|$?"* Vì khi phân tích thừa số nguyên tố, GCD lấy mũ **min** mỗi nguyên tố, LCM lấy mũ **max**. Mà $\\min + \\max = $ tổng 2 số mũ → nhân lại ra đúng $ab$. Vd $24 = 2^3 \\cdot 3$, $36 = 2^2 \\cdot 3^2$: $\\gcd$ lấy $2^2 \\cdot 3$, $\\operatorname{lcm}$ lấy $2^3 \\cdot 3^2$, tích $= 2^5 \\cdot 3^3 = 24 \\cdot 36$ ✓.
- *"$a$ và $b$ coprime thì LCM bằng gì?"* $\\operatorname{lcm} = a \\cdot b$ (vì $\\gcd = 1$). Vd $\\operatorname{lcm}(15, 28) = 420$.

⚠ **Lỗi thường gặp**: tưởng $\\operatorname{lcm}(a, b) = a \\cdot b$ luôn luôn. SAI khi $a, b$ có ước chung. Phản ví dụ: $\\operatorname{lcm}(4, 6) = 12$, KHÔNG phải $24$. Chỉ bằng tích khi coprime.

🔁 **Dừng lại tự kiểm tra**

1. $\\operatorname{lcm}(9, 12) = ?$ (gợi ý: tính gcd trước).
2. Hai đèn nhấp nháy mỗi 10s và 15s, cùng sáng tại $t=0$. Lần kế tiếp cùng sáng?

<details><summary>Đáp án</summary>

1. $\\gcd(9,12) = 3$ → $\\operatorname{lcm} = 9 \\cdot 12/3 = 36$.
2. $\\operatorname{lcm}(10, 15) = 150/5 = 30$s.

</details>

### 📝 Tóm tắt mục 5

- $\\operatorname{lcm}(a, b)$ = chu kỳ chung nhỏ nhất; $\\operatorname{lcm} \\cdot \\gcd = |ab|$.
- Coprime → $\\operatorname{lcm} = ab$; nói chung KHÔNG bằng tích.
- Tính LCM nhanh qua GCD (Euclid).

---

## 6. Số nguyên tố cùng nhau

💡 **Trực giác / Hình dung**: hai số "nguyên tố cùng nhau" không có nghĩa là cả hai phải là số nguyên tố — mà là chúng **không chia sẻ thừa số nguyên tố nào**. Như hai bộ Lego không có viên gạch nào trùng nhau. $15 = 3 \\cdot 5$ và $28 = 2^2 \\cdot 7$ — không trùng viên nào → coprime, dù cả hai đều là hợp số.

**Định nghĩa**: $a$ và $b$ nguyên tố cùng nhau (coprime) nếu $\\gcd(a, b) = 1$.

**4 ví dụ số đa dạng**:
- $15$ và $28$: $\\gcd = 1$ → coprime (cả hai đều là hợp số!).
- $8$ và $9$: $\\gcd = 1$ → coprime (2 số liên tiếp luôn coprime).
- $6$ và $35$: $\\gcd = 1$ → coprime ($6 = 2 \\cdot 3$, $35 = 5 \\cdot 7$).
- $12$ và $18$: $\\gcd = 6 \\neq 1$ → **KHÔNG** coprime.

### Hệ quả Bezout
$a, b$ coprime $\\iff \\exists\\, x, y: ax + by = 1$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"2 số liên tiếp có luôn coprime không?"* **Có**. $\\gcd(n, n+1) = 1$ vì ước chung $d$ phải chia hết hiệu $(n+1) - n = 1$ → $d = 1$. Vd $\\gcd(99, 100) = 1$.
- *"Coprime có cần là số nguyên tố không?"* **Không** — đó là lỗi tên gọi gây nhầm. $15$ và $28$ đều là hợp số nhưng coprime.

⚠ **Lỗi thường gặp**: tưởng "nguyên tố cùng nhau" = "cả hai phải là số nguyên tố". SAI. Phản ví dụ: $4$ và $9$ coprime ($\\gcd = 1$) nhưng cả hai là hợp số; ngược lại $2$ và $2$ đều nguyên tố nhưng $\\gcd = 2 \\neq 1$ → KHÔNG coprime.

🔁 **Dừng lại tự kiểm tra**

1. $14$ và $25$ có coprime không?
2. $21$ và $35$ có coprime không?

<details><summary>Đáp án</summary>

1. $14 = 2 \\cdot 7$, $25 = 5^2$ → không trùng → **coprime** ($\\gcd = 1$).
2. $21 = 3 \\cdot 7$, $35 = 5 \\cdot 7$ → chung thừa số 7 → $\\gcd = 7$ → **KHÔNG** coprime.

</details>

### 📝 Tóm tắt mục 6

- Coprime $\\iff \\gcd(a, b) = 1 \\iff$ không chung thừa số nguyên tố nào.
- KHÔNG đòi $a, b$ phải là số nguyên tố (15 & 28 coprime).
- 2 số nguyên liên tiếp luôn coprime. Coprime $\\iff \\exists\\, x,y: ax+by = 1$.

---

## 7. Ứng dụng — Mật mã RSA

💡 **Trực giác / Hình dung**: RSA dựa trên một "cánh cửa một chiều" — nhân 2 số nguyên tố lớn $p \\cdot q = N$ thì dễ, nhưng từ $N$ tìm lại $p, q$ (factor) thì cực khó nếu $N$ lớn (~300 chữ số). Khoá công khai để ai cũng "khoá" (mã hoá) được, nhưng chỉ người biết $p, q$ mới "mở" (giải mã) được.

🔐 RSA dùng các số nguyên tố cực lớn (~300 chữ số). An toàn vì:
- Chọn 2 số nguyên tố $p, q$.
- $N = p \\cdot q$. $\\varphi(N) = (p-1)(q-1)$.
- Tìm $e, d$ sao cho $e \\cdot d \\equiv 1 \\pmod{\\varphi(N)}$ — dùng **Euclid mở rộng** ở đây!
- Khoá công khai: $(N, e)$. Khoá riêng: $d$.
- Khó phân tích $N$ (factor) khi không biết $p, q$.

⟶ Toàn bộ giao dịch web (HTTPS) dựa trên định lý Bezout + thuật toán Euclid.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao cần $\\gcd(e, \\varphi(N)) = 1$?"* Vì chỉ khi $e$ coprime với $\\varphi(N)$ thì $e$ mới có **nghịch đảo modular** $d$ (theo Bezout: $e \\cdot d + \\varphi(N) \\cdot k = 1$ → $e \\cdot d \\equiv 1 \\pmod{\\varphi(N)}$). Không có $d$ thì không giải mã được.
- *"Euclid liên quan thế nào?"* Bước "tìm $d$" chính là chạy **Euclid mở rộng** trên $(e, \\varphi(N))$ — đúng kỹ thuật mục 4.

### 📝 Tóm tắt mục 7

- RSA = cửa một chiều: nhân $p \\cdot q$ dễ, factor $N$ khó.
- Cần $\\gcd(e, \\varphi(N)) = 1$ để $e$ có nghịch đảo $d$ (Bezout).
- Tìm $d$ = Euclid mở rộng → cả HTTPS dựa trên L01.

---

## 8. Bài tập

### Bài tập

**Bài 1**: Tìm $\\gcd(180, 252)$ bằng Euclid.

**Bài 2**: Tìm $x, y$: $180x + 252y = \\gcd(180, 252)$.

**Bài 3**: Tính $\\operatorname{lcm}(15, 20)$.

**Bài 4**: PT $6x + 9y = 15$ có nghiệm nguyên không? Nếu có, tìm 1 nghiệm.

**Bài 5**: Chứng minh nếu $d \\mid a$ và $d \\mid b$ thì $d \\mid (a-b)$.

### Lời giải

**Bài 1**:  
- $252 = 180 \\cdot 1 + 72$.  
- $180 = 72 \\cdot 2 + 36$.  
- $72 = 36 \\cdot 2 + 0$.  
→ $\\gcd = $ **36**.

**Bài 2**: Lùi:  
- $36 = 180 - 2 \\cdot 72 = 180 - 2 \\cdot (252 - 180) = 3 \\cdot 180 - 2 \\cdot 252$.  
→ **x = 3, y = -2**.

**Bài 3**: $\\gcd(15, 20) = 5$. $\\operatorname{lcm} = 15 \\cdot 20/5 = $ **60**.

**Bài 4**: $\\gcd(6, 9) = 3$. $3 \\mid 15$ → có nghiệm. Chia 3: $2x + 3y = 5$. Thử $x = 1, y = 1$: $2+3 = 5$ ✓. → **x = 1, y = 1**.

**Bài 5**: $a = d \\cdot k_1$, $b = d \\cdot k_2$ → $a - b = d \\cdot (k_1 - k_2)$ → $d \\mid (a-b)$. □

---

## 9. Bài tiếp theo

[Lesson 02 — Số nguyên tố & đồng dư](../lesson-02-primes-modular/).

## 📝 Tổng kết

1. **$b \\mid a$** $\\iff \\exists k: a = bk$. Phép chia Euclid duy nhất: $a = bq + r$, $0 \\le r < |b|$.
2. **$\\gcd(a, b) = \\gcd(b, a \\bmod b)$** — thuật toán Euclid ($O(\\log n)$).
3. **Bezout**: $\\exists\\, x, y: ax + by = \\gcd$. Hệ quả: $ax+by=c$ giải được $\\iff \\gcd \\mid c$.
4. **$\\operatorname{lcm} \\cdot \\gcd = |ab|$**.
5. **Ứng dụng**: RSA (mật mã), tìm chu kỳ, giải PT Diophantine.
`;
