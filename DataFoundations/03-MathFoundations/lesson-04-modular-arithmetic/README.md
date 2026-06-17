# Lesson 04 — Modular Arithmetic & GCD (số học modular)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu phép **mod** ($a \bmod m$) và quan hệ **đồng dư (congruence)** $a \equiv b \pmod{m}$ — cùng với cách phân biệt **mod toán học** (kết quả luôn không âm) và **toán tử `%`** trong Go/C (giữ dấu của số bị chia).
- Áp dụng được **các tính chất modular** của phép cộng, nhân, lũy thừa để tính toán trên số rất lớn mà không tràn số.
- Hiểu và chạy được **thuật toán Euclid** tìm $\gcd(a, b)$ — $O(\log)$ bước.
- Hiểu **đẳng thức Bézout** và **nghịch đảo modular (modular inverse)** — khi nào tồn tại và cách tìm bằng **Extended Euclid**.
- Tính được **lũy thừa modular nhanh (fast modular exponentiation)** bằng square-and-multiply trong $O(\log b)$ — nền của RSA.
- Phát biểu và dùng được **định lý Fermat nhỏ** $a^{p-1} \equiv 1 \pmod{p}$.
- Thấy rõ vì sao modular là nền của **hashing** (mod $m$ để map vào bucket), **mật mã (cryptography)**, **checksum** và "số học đồng hồ".

## Kiến thức tiền đề

- [Lesson 01 — Set Theory](../lesson-01-set-theory/) — quan hệ tương đương; đồng dư mod $m$ chính là một quan hệ tương đương (đã gặp ở §6.3 của bài đó).
- [Lesson 02 — Boolean Logic](../lesson-02-boolean-logic/) — phát biểu mệnh đề "chia hết" / "đồng dư" chính xác.
- [Lesson 03 — Combinatorics](../lesson-03-combinatorics/) — đếm số dư, lớp đồng dư.

Phần lý thuyết số sâu hơn: [Math/05 — Number Theory, Combinatorics & Logic](../../../Math/05-NumberTheory-Combinatorics-Logic/index.html).

## 1. Vì sao học số học modular trước data structure?

Vì **rất nhiều cấu trúc và thuật toán "gập" một miền lớn về một miền nhỏ** — và "gập" đó chính là phép mod:

- **Hash table**: `index = hash(key) % m`. Một key bất kỳ (string, số 64-bit) được ép về một trong $m$ bucket. Vì sao chọn $m$ là **số nguyên tố**? — bài này trả lời (§9).
- **Mật mã (cryptography)**: RSA mã hóa bằng $c = m^e \bmod n$, giải mã $m = c^d \bmod n$; Diffie–Hellman trao khóa bằng lũy thừa modular. Toàn bộ chạy trên số học modular.
- **Checksum / CRC / chữ số kiểm tra**: số CMND, ISBN, thẻ tín dụng (Luhn) đều dùng mod để bắt lỗi gõ sai.
- **Đồng hồ & lịch**: "3 giờ chiều" = $15 \bmod 12 = 3$; "hôm nay thứ Tư, 100 ngày nữa là thứ mấy?" = $(\text{Tư} + 100) \bmod 7$.
- **Vòng tròn / buffer vòng (ring buffer)**: chỉ số quay vòng `i = (i + 1) % n`.

💡 **Trực giác / Hình dung.** Mod giống như **mặt đồng hồ**: kim cứ quay, nhưng chỉ có 12 vị trí. Cộng thêm 15 giờ vào 0 giờ thì kim không chỉ tới "15" — nó quay hết một vòng (12) rồi dừng ở 3. Mọi phép modular đều là "đếm trên một vòng tròn $m$ vạch" thay vì trên đường thẳng vô hạn.

**Câu hỏi mở (sẽ trả lời trong bài):** với hàm hash thô `h(s) = (tổng mã ký tự) % m`, tính `h("alice") % 10` ra bao nhiêu? Và vì sao người ta hay chọn $m$ là số nguyên tố thay vì $m = 10$ hay $m = 2^k$? → §9 trả lời bằng số cụ thể.

## 2. Phép mod và quan hệ đồng dư

### 2.1. Định nghĩa phép chia có dư

**(a) Là gì.** Với số nguyên $a$ và số nguyên dương $m$, **phép chia có dư** cho ta duy nhất một cặp $(q, r)$ sao cho:

$$a = q \cdot m + r, \qquad 0 \le r < m.$$

$r$ gọi là **$a$ mod $m$** (số dư), $q$ là thương. Ký hiệu $r = a \bmod m$.

**(b) Vì sao tồn tại / vì sao cần.** Định lý chia Euclid khẳng định $q, r$ **tồn tại và duy nhất**. Ta cần nó vì rất nhiều bài toán chỉ quan tâm "phần còn lại sau khi gập theo chu kỳ $m$" — vị trí trên đồng hồ, bucket trong hash table — chứ không quan tâm $a$ lớn cỡ nào.

**(c) Ví dụ trực giác bằng số.** $17 \bmod 5$: ta viết $17 = 3 \cdot 5 + 2$, nên $q = 3$, $r = 2$ → $17 \bmod 5 = 2$. Hình dung: đi 17 bước trên vòng 5 vạch (0,1,2,3,4), quay 3 vòng đầy rồi dừng ở vạch 2.

**≥ 4 ví dụ số** (gồm âm, lớn, edge):

| $a$ | $m$ | $q$ (thương toán học) | $r = a \bmod m$ (toán học) | Kiểm tra $a = qm + r$ |
| --- | --- | --- | --- | --- |
| $17$ | $5$ | $3$ | $\mathbf{2}$ | $3\cdot5+2 = 17$ ✓ |
| $100$ | $7$ | $14$ | $\mathbf{2}$ | $14\cdot7+2 = 100$ ✓ |
| $-7$ | $3$ | $-3$ | $\mathbf{2}$ | $(-3)\cdot3+2 = -7$ ✓ |
| $0$ | $9$ | $0$ | $\mathbf{0}$ | $0\cdot9+0 = 0$ ✓ (edge) |
| $24$ | $8$ | $3$ | $\mathbf{0}$ | $3\cdot8+0 = 24$ ✓ (chia hết) |

⚠ **Lỗi thường gặp #1 — `%` trong Go/C KHÁC mod toán học với số âm.** Định nghĩa toán học ép $0 \le r < m$, nên $-7 \bmod 3 = 2$. Nhưng toán tử `%` của Go (và C, Java) **giữ dấu của số bị chia**:

```go
fmt.Println(-7 % 3)   // -1, KHÔNG phải 2
fmt.Println(7 % -3)   // 1
```

Vì Go định nghĩa `a % m == a - (a/m)*m` với `a/m` cắt về 0 (truncate). Để có **mod toán học không âm** trong Go:

```go
func mod(a, m int) int {
    r := a % m
    if r < 0 {
        r += m       // kéo về [0, m)
    }
    return r
}
// mod(-7, 3) == 2 ✓
```

→ Quy tắc: khi dùng mod cho hash/index/đồng hồ mà **a có thể âm** (vd hash của một số âm), luôn dùng hàm `mod` chuẩn hóa, đừng dùng `%` trần.

### 2.2. Đồng dư (congruence)

**(a) Là gì.** Hai số $a, b$ **đồng dư modulo $m$**, viết $a \equiv b \pmod{m}$, nếu chúng có **cùng số dư** khi chia cho $m$. Tương đương (định nghĩa hình thức, dễ chứng minh hơn):

$$a \equiv b \pmod{m} \iff m \mid (a - b),$$

đọc là "$m$ chia hết $(a-b)$", tức $(a-b)$ là bội của $m$.

**(b) Vì sao cần.** Đồng dư cho phép coi tất cả số "cùng dư" là **một lớp** (lớp đồng dư), nhờ đó ta tính toán trên các lớp như tính trên số thường — đây là cái làm số học modular thành một **đại số khép kín** (closed), nền của mọi tính chất ở §3.

**(c) Ví dụ trực giác.** $17 \equiv 2 \pmod 5$ vì cả $17$ và $2$ cùng dư $2$; kiểm tra: $5 \mid (17 - 2) = 15$ ✓. Trên đồng hồ: $15$ giờ và $3$ giờ "chỉ cùng một chỗ", tức $15 \equiv 3 \pmod{12}$.

**≥ 4 ví dụ số:**

| Khẳng định | Đúng/Sai | Lý do $m \mid (a-b)$ |
| --- | --- | --- |
| $38 \equiv 14 \pmod{12}$ | Đúng | $38 - 14 = 24 = 2\cdot12$ ✓ |
| $-7 \equiv 5 \pmod{3}$ | Đúng | $-7 - 5 = -12 = -4\cdot3$ ✓ |
| $100 \equiv 0 \pmod{10}$ | Đúng | $100 - 0 = 100 = 10\cdot10$ ✓ |
| $9 \equiv 4 \pmod{6}$ | **Sai** | $9 - 4 = 5$, $6 \nmid 5$ |

⚠ **Lỗi thường gặp #2 — lẫn "đồng dư" với "chia hết".** $a \equiv 0 \pmod m$ mới có nghĩa "$m$ chia hết $a$". Còn $a \equiv b \pmod m$ (với $b \neq 0$) **không** nói gì về việc $a$ chia hết cho $m$ — nó nói $a$ và $b$ cùng dư. Ví dụ $17 \equiv 2 \pmod 5$ là đúng nhưng $17$ không chia hết cho $5$.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Đồng dư có phải quan hệ tương đương không?"* — Có. Phản xạ ($a\equiv a$), đối xứng ($a\equiv b \Rightarrow b\equiv a$), bắc cầu ($a\equiv b, b\equiv c \Rightarrow a\equiv c$) — đúng cả ba, đã gặp ở [Set Theory §6](../lesson-01-set-theory/). Vì thế nó chia $\mathbb{Z}$ thành đúng $m$ lớp: lớp dư 0, dư 1, …, dư $m-1$.
- *"Số dư có thể bằng $m$ không?"* — Không. Theo định nghĩa $0 \le r < m$, dư lớn nhất là $m-1$. $24 \bmod 8 = 0$ chứ không phải $8$.

🔁 **Dừng lại tự kiểm tra.**
1. Tính $-13 \bmod 4$ theo mod toán học, và `-13 % 4` trong Go.
2. $50 \equiv 8 \pmod{m}$ với những $m$ nào trong $\{6, 7, 14, 21\}$?

<details><summary>Đáp án</summary>

1. Toán học: $-13 = (-4)\cdot4 + 3$ → $-13 \bmod 4 = 3$. Go: `-13 % 4 == -1` (giữ dấu số bị chia). Hai kết quả khác nhau — đúng như cảnh báo ⚠.
2. Cần $m \mid (50 - 8) = 42$. Ước của $42$ trong tập: $6$ ($42=7\cdot6$ ✓), $7$ ($42=6\cdot7$ ✓), $14$ ($42=3\cdot14$ ✓), $21$ ($42=2\cdot21$ ✓). → Cả bốn đều đúng.
</details>

📝 **Tóm tắt mục 2.**
- $a \bmod m$ = số dư, luôn trong $[0, m)$ theo định nghĩa toán học.
- `%` trong Go/C giữ dấu số bị chia → với số âm phải tự chuẩn hóa `r += m`.
- $a \equiv b \pmod m \iff m \mid (a-b)$ (cùng số dư). Khác hẳn "$a$ chia hết cho $m$".
- Đồng dư là quan hệ tương đương → chia $\mathbb{Z}$ thành $m$ lớp.

## 3. Tính chất modular của +, ×, lũy thừa

💡 **Trực giác.** Vì các số "cùng dư" hành xử như nhau, ta được phép **mod sớm bất cứ lúc nào** — cộng/nhân rồi mod, hay mod từng phần rồi cộng/nhân, kết quả như nhau. Đây là chìa khóa để **không bao giờ tràn số** khi tính với số khổng lồ: cứ mỗi bước lại gập về $[0, m)$.

### 3.1. Cộng và nhân

$$\boxed{(a + b) \bmod m = \big((a \bmod m) + (b \bmod m)\big) \bmod m}$$
$$\boxed{(a \cdot b) \bmod m = \big((a \bmod m) \cdot (b \bmod m)\big) \bmod m}$$

**Chứng minh ngắn (cho phép nhân).** Viết $a = q_1 m + r_1$ và $b = q_2 m + r_2$ với $r_1 = a\bmod m$, $r_2 = b\bmod m$. Khi đó

$$a\cdot b = (q_1 m + r_1)(q_2 m + r_2) = \underbrace{(q_1 q_2 m + q_1 r_2 + q_2 r_1)}_{\text{là bội của } m}\, m + r_1 r_2.$$

Mọi số hạng trừ $r_1 r_2$ đều chứa thừa số $m$, nên chia $m$ chúng biến mất. Vậy $a\cdot b \equiv r_1 r_2 \pmod m$, lấy mod hai vế cho kết quả. (Phép cộng chứng minh tương tự, đơn giản hơn.) ∎

**Walk-through verify cả 2 vế** với $a = 47$, $b = 58$, $m = 9$:

- **Vế trái** (tính đầy đủ rồi mod): $47 \cdot 58 = 2726$; $2726 \bmod 9$: $2726 = 302\cdot9 + 8$ → **$8$**.
- **Vế phải** (mod trước): $47 \bmod 9 = 2$ (vì $47=5\cdot9+2$); $58 \bmod 9 = 4$ (vì $58=6\cdot9+4$); $(2\cdot4)\bmod 9 = 8 \bmod 9 = $ **$8$**.

→ Hai vế đều ra $8$ ✓. Lưu ý vế phải chỉ nhân hai số một-chữ-số ($2\cdot4$) thay vì số bốn chữ số $2726$ — đó là lý do "mod sớm" chống tràn.

### 3.2. Lũy thừa

Từ tính chất nhân, lặp lại:

$$a^k \bmod m = \big((a \bmod m)^k\big) \bmod m.$$

**Walk-through verify** $7^4 \bmod 5$:

- **Vế trái**: $7^4 = 2401$; $2401 \bmod 5 = 1$ (vì $2401 = 480\cdot5 + 1$).
- **Vế phải**: $7 \bmod 5 = 2$; $2^4 = 16$; $16 \bmod 5 = 1$.

→ Cùng ra $1$ ✓. Và để ý có thể mod ngay cả giữa các phép nhân: $2^2 = 4$, $4 \bmod 5 = 4$; $4 \cdot 2^2 = 16 \to 1$ — đây chính là ý tưởng "fast exponentiation" ở §7.

⚠ **Lỗi thường gặp #3 — chia KHÔNG đơn giản như nhân.** Cộng/trừ/nhân thì mod tự do, nhưng **không được** viết $(a / b) \bmod m = (a \bmod m)/(b \bmod m)$. Phép chia trong modular phải thay bằng **nhân với nghịch đảo** $b^{-1}$ (§6). Ví dụ $\tfrac{6}{2} = 3$ nhưng trong mod việc "chia 2" chỉ hợp lệ khi $2$ có nghịch đảo mod $m$.

🔁 **Dừng lại tự kiểm tra.** Tính $123 \cdot 456 \bmod 7$ bằng cách mod sớm.
<details><summary>Đáp án</summary>

$123 \bmod 7 = 4$ ($123=17\cdot7+4$); $456 \bmod 7 = 1$ ($456=65\cdot7+1$). $(4\cdot1)\bmod 7 = 4$. (Kiểm tra thẳng: $123\cdot456 = 56088 = 8012\cdot7 + 4$ ✓.)
</details>

📝 **Tóm tắt mục 3.** Cộng, trừ, nhân, lũy thừa "giao hoán" được với phép mod → mod sớm để chống tràn. Chia thì KHÔNG — phải dùng nghịch đảo modular.

## 4. Số học đồng hồ (clock arithmetic)

💡 Đây là mô hình trực giác nhất của mod $12$ (hoặc $24$, $7$).

Trên mặt đồng hồ 12 giờ, "10 giờ + 5 giờ" không ra "15 giờ" mà ra **3 giờ**, vì $15 \bmod 12 = 3$. Kim quay qua vạch 12 rồi đếm tiếp.

**Ví dụ số:**

- $10 + 5 = 15 \equiv 3 \pmod{12}$ → 10 giờ + 5 tiếng = 3 giờ.
- $8 + 8 = 16 \equiv 4 \pmod{12}$.
- Thứ trong tuần (mod 7), đánh số CN=0…T7=6: "Hôm nay thứ Tư (3), 100 ngày nữa?" → $(3 + 100)\bmod 7 = 103 \bmod 7 = 5$ (vì $103=14\cdot7+5$) → **thứ Sáu**.
- Lùi thời gian (số âm): "3 giờ trừ 5 tiếng" $= (3 - 5)\bmod 12 = -2 \bmod 12 = 10$ → 10 giờ (đêm hôm trước). Đây là chỗ **phải dùng mod toán học không âm**, không phải `%`.

❓ *"Vì sao đồng hồ là ví dụ hoàn hảo?"* — Vì nó cho thấy hai số khác nhau ($3$ và $15$) "bằng nhau" trong thế giới mod $12$ — chính là khái niệm lớp đồng dư, nhìn được bằng mắt. Module (a) của visualization mô phỏng kim quay đúng theo $(a \text{ op } b) \bmod m$.

📝 **Tóm tắt mục 4.** Mod = đếm trên vòng tròn $m$ vạch. Cộng/nhân làm kim quay; lùi (số âm) cần chuẩn hóa về $[0,m)$.

## 5. GCD & thuật toán Euclid

### 5.1. Định nghĩa

**(a) Là gì.** $\gcd(a, b)$ (ước chung lớn nhất — greatest common divisor) là số nguyên dương lớn nhất chia hết **cả** $a$ và $b$.

**(b) Vì sao cần.** GCD dùng để rút gọn phân số, kiểm tra hai số "nguyên tố cùng nhau" (coprime, $\gcd=1$) — điều kiện để có nghịch đảo modular (§6), để chọn số mũ RSA, để CRT (định lý số dư Trung Hoa).

**(c) Ví dụ.** $\gcd(48, 18)$: ước chung của $48$ và $18$ là $\{1, 2, 3, 6\}$, lớn nhất là **$6$**.

**≥ 4 ví dụ:** $\gcd(12, 8) = 4$; $\gcd(17, 5) = 1$ (coprime, $17$ nguyên tố); $\gcd(100, 0) = 100$ (edge: $\gcd(a, 0) = a$); $\gcd(21, 14) = 7$.

### 5.2. Thuật toán Euclid

Cốt lõi là đẳng thức:

$$\gcd(a, b) = \gcd(b,\ a \bmod b), \qquad \gcd(a, 0) = a.$$

💡 **Vì sao đúng (trực giác + 1 dòng).** Mọi ước chung của $a$ và $b$ cũng là ước của $a - q b = a \bmod b$ (vì $a\bmod b$ là tổ hợp nguyên của $a, b$), và ngược lại. Nên tập ước chung của $(a,b)$ trùng tập ước chung của $(b, a\bmod b)$ → GCD bằng nhau. Cứ thay cặp lớn bằng cặp nhỏ hơn, số thứ hai giảm dần về $0$.

**Walk-through $\gcd(48, 18)$ từng bước:**

| Bước | $a$ | $b$ | $a \bmod b$ | Gọi tiếp |
| --- | --- | --- | --- | --- |
| 1 | $48$ | $18$ | $48 \bmod 18 = 12$ | $\gcd(18, 12)$ |
| 2 | $18$ | $12$ | $18 \bmod 12 = 6$ | $\gcd(12, 6)$ |
| 3 | $12$ | $6$ | $12 \bmod 6 = 0$ | $\gcd(6, 0)$ |
| 4 | $6$ | $0$ | — | **trả về $6$** |

→ $\gcd(48, 18) = 6$ ✓ (khớp với liệt kê ước ở trên). Chỉ **3 bước mod**.

Code Go:

```go
func gcd(a, b int) int {
    for b != 0 {
        a, b = b, a%b
    }
    return a
}
```

**Độ phức tạp.** Số bước là $O(\log \min(a, b))$. Trường hợp xấu nhất là hai số **Fibonacci liên tiếp** (vd $\gcd(89, 55)$) — đó là lý do hằng số liên quan tới tỉ lệ vàng $\varphi$. Cụ thể: sau mỗi 2 bước, số nhỏ giảm ít nhất một nửa → $O(\log)$.

❓ *"Vì sao không nhanh hơn nữa?"* — Vì mỗi 2 bước số giảm ≥ một nửa, không thể nhanh hơn log. *"Thứ tự $a, b$ có quan trọng?"* — Không: nếu $a < b$ thì bước đầu $a \bmod b = a$, tự động hoán vị, chỉ tốn thêm 1 bước.

🔁 **Dừng lại tự kiểm tra.** Chạy Euclid cho $\gcd(1071, 462)$.
<details><summary>Đáp án</summary>

$1071 \bmod 462 = 147$ → $\gcd(462, 147)$; $462 \bmod 147 = 21$ → $\gcd(147, 21)$; $147 \bmod 21 = 0$ → $\gcd(21, 0) = \mathbf{21}$.
</details>

📝 **Tóm tắt mục 5.** $\gcd(a,b)=\gcd(b, a\bmod b)$, dừng khi $b=0$. $O(\log)$ bước. $\gcd=1$ ⇔ coprime.

## 6. Bézout & nghịch đảo modular

### 6.1. Đẳng thức Bézout

**Định lý Bézout.** Với mọi $a, b$ nguyên không đồng thời $0$, tồn tại số nguyên $x, y$ sao cho:

$$a x + b y = \gcd(a, b).$$

Ví dụ $\gcd(48, 18) = 6$, và quả thật $48\cdot(-1) + 18\cdot 3 = -48 + 54 = 6$ ✓.

### 6.2. Nghịch đảo modular

**(a) Là gì.** Nghịch đảo của $a$ modulo $m$ là số $x$ sao cho

$$a \cdot x \equiv 1 \pmod{m}.$$

Ký hiệu $x = a^{-1} \bmod m$. Nó đóng vai trò "chia cho $a$" trong thế giới modular (vì $a^{-1}$ là số mà nhân với $a$ ra $1$).

**(b) Khi nào tồn tại.**

$$a^{-1} \bmod m \text{ tồn tại} \iff \gcd(a, m) = 1.$$

**Vì sao:** nếu $\gcd(a,m)=1$, Bézout cho $ax + my = 1$, lấy mod $m$ thì $my \equiv 0$, còn lại $ax \equiv 1 \pmod m$ → $x$ chính là nghịch đảo. Ngược lại nếu $\gcd(a,m)=d>1$ thì mọi bội của $a$ cũng chia hết cho $d$, không thể $\equiv 1$.

**(c) Ví dụ.** Nghịch đảo của $3$ mod $7$: cần $3x \equiv 1 \pmod 7$. Thử: $3\cdot5 = 15 = 2\cdot7 + 1 \equiv 1$ → $x = 5$. Vậy $3^{-1} \equiv 5 \pmod 7$.

**≥ 4 ví dụ:**

| $a$ | $m$ | $\gcd$ | Nghịch đảo? | Kiểm tra |
| --- | --- | --- | --- | --- |
| $3$ | $7$ | $1$ | $5$ | $3\cdot5=15\equiv1$ ✓ |
| $2$ | $5$ | $1$ | $3$ | $2\cdot3=6\equiv1$ ✓ |
| $4$ | $9$ | $1$ | $7$ | $4\cdot7=28=3\cdot9+1\equiv1$ ✓ |
| $2$ | $6$ | $2$ | **Không tồn tại** | $\gcd\neq1$ — mọi bội của 2 là số chẵn, không thể $\equiv1\pmod6$ |

### 6.3. Extended Euclid — tìm $x$

Thuật toán Euclid mở rộng vừa tính $\gcd$ vừa trả về $x, y$ của Bézout. Ý tưởng: chạy Euclid bình thường, đồng thời "truy ngược" hệ số.

**Walk-through tìm $3^{-1} \bmod 7$** (tức giải $3x + 7y = 1$):

Euclid xuôi:
$$7 = 2\cdot 3 + 1, \qquad 3 = 3\cdot 1 + 0 \ \Rightarrow\ \gcd = 1.$$

Truy ngược từ dòng có dư $1$:
$$1 = 7 - 2\cdot 3.$$

Đối chiếu $3x + 7y = 1$: $x = -2$, $y = 1$. Chuẩn hóa $x$ về $[0,7)$: $-2 \bmod 7 = 5$. → $3^{-1} \equiv 5 \pmod 7$ ✓ (khớp với thử tay ở trên).

Code Go (extended Euclid, đệ quy):

```go
// trả về (g, x, y) với a*x + b*y = g = gcd(a,b)
func extGCD(a, b int) (int, int, int) {
    if b == 0 {
        return a, 1, 0
    }
    g, x1, y1 := extGCD(b, a%b)
    return g, y1, x1 - (a/b)*y1
}

func modInverse(a, m int) (int, bool) {
    g, x, _ := extGCD(a, m)
    if g != 1 {
        return 0, false // không tồn tại
    }
    return ((x % m) + m) % m, true // chuẩn hóa về [0, m)
}
```

### 6.4. Vì sao $m$ nguyên tố thì mọi $a \neq 0$ có nghịch đảo

Nếu $m = p$ nguyên tố, thì với mọi $a \in \{1, 2, \ldots, p-1\}$ ta có $\gcd(a, p) = 1$ (vì ước duy nhất của $p$ là $1$ và $p$, mà $a < p$). → **Mọi phần tử khác $0$ đều khả nghịch.** Đây là lý do "thế giới mod $p$" ($\mathbb{Z}_p$ với $p$ nguyên tố) là một **trường (field)** — chia được cho mọi số khác $0$, y như số hữu tỉ. RSA, hashing, mã sửa lỗi đều thích $m$ nguyên tố vì tính chất đẹp này.

❓ *"Nghịch đảo có duy nhất không?"* — Trong $[1, m-1]$ thì có, duy nhất. *"Có cách nào khác Extended Euclid?"* — Có: nếu $m = p$ nguyên tố, theo Fermat (§8) $a^{p-1}\equiv1$ nên $a^{-1} \equiv a^{p-2} \pmod p$ — tính bằng fast exponentiation (§7).

🔁 **Dừng lại tự kiểm tra.** Tìm $5^{-1} \bmod 11$.
<details><summary>Đáp án</summary>

Cần $5x\equiv1\pmod{11}$. $5\cdot9=45=4\cdot11+1\equiv1$ → $x=9$. Vậy $5^{-1}\equiv9\pmod{11}$.
</details>

📝 **Tóm tắt mục 6.** Nghịch đảo $a^{-1}\bmod m$ tồn tại ⇔ $\gcd(a,m)=1$; tìm bằng Extended Euclid (Bézout). $m$ nguyên tố ⇒ mọi $a\neq0$ khả nghịch ($\mathbb{Z}_p$ là trường).

## 7. Lũy thừa modular nhanh (square-and-multiply)

### 7.1. Vì sao cần

RSA tính $m^e \bmod n$ với $e$ và $n$ là số **hàng nghìn bit**. Nhân $m$ với chính nó $e$ lần là $O(e)$ — bất khả thi khi $e \approx 2^{2048}$. **Fast modular exponentiation** hạ xuống $O(\log e)$ phép nhân — chỉ vài nghìn phép thay vì $2^{2048}$.

💡 **Trực giác.** Thay vì nhân $b$ lần, ta khai thác **biểu diễn nhị phân của số mũ**: $a^{13} = a^{8}\cdot a^{4}\cdot a^{1}$ vì $13 = 1101_2 = 8+4+1$. Ta chỉ cần các lũy thừa $a^1, a^2, a^4, a^8$ (mỗi cái = bình phương cái trước) — đúng $\log_2 b$ phép bình phương.

### 7.2. Thuật toán

Duyệt từng bit của $b$. Giữ một biến `base` $= a^{2^i} \bmod m$ (bình phương mỗi vòng) và `result`. Bit nào của $b$ bằng $1$ thì nhân `base` hiện tại vào `result`.

**Walk-through $3^{13} \bmod 7$ từng bước.** $13 = 1101_2$ (đọc từ bit thấp: $1,0,1,1$).

| Bước | bit của 13 | base ($=3^{2^i}\bmod7$) | bit=1? nhân vào result | result |
| --- | --- | --- | --- | --- |
| khởi tạo | — | $3^1 \bmod 7 = 3$ | — | $1$ |
| $i=0$ | $1$ | $3$ | có → $1\cdot3 = 3$ | $3$ |
| $i=1$ | $0$ | $3^2 = 9 \equiv 2$ | không | $3$ |
| $i=2$ | $1$ | $2^2 = 4 \equiv 4$ | có → $3\cdot4 = 12 \equiv 5$ | $5$ |
| $i=3$ | $1$ | $4^2 = 16 \equiv 2$ | có → $5\cdot2 = 10 \equiv 3$ | $\mathbf{3}$ |

→ $3^{13} \bmod 7 = 3$.

**Verify thẳng:** $3^{13} = 1594323$; $1594323 \bmod 7$: $1594323 = 227760\cdot7 + 3$ → $3$ ✓. Chỉ tốn **4 vòng** (bình phương + nhân) thay vì 13 phép nhân — và mỗi số luôn $< 7^2$, không bao giờ tràn.

Code Go:

```go
func powMod(a, b, m int) int {
    a %= m
    result := 1
    for b > 0 {
        if b&1 == 1 {
            result = result * a % m
        }
        a = a * a % m   // bình phương base
        b >>= 1
    }
    return result
}
// powMod(3, 13, 7) == 3
```

❓ *"Vì sao mod sau MỖI phép nhân?"* — Để số không bao giờ vượt $m^2$, tránh tràn `int64`. *"Có $O(\log b)$ thật không?"* — Có: vòng lặp chạy đúng số bit của $b$ = $\lfloor\log_2 b\rfloor + 1$.

🔁 **Dừng lại tự kiểm tra.** Tính $2^{10} \bmod 1000$ bằng square-and-multiply.
<details><summary>Đáp án</summary>

$10=1010_2$. base: $2\to4\to16\to256$; result nhân tại bit 1 ($i=1$, base 4 → result 4) và bit 3 ($i=3$, base 256 → $4\cdot256=1024\equiv24$). → $2^{10}=1024\equiv\mathbf{24}\pmod{1000}$ ✓.
</details>

📝 **Tóm tắt mục 7.** Square-and-multiply tính $a^b\bmod m$ trong $O(\log b)$ bằng biểu diễn nhị phân của $b$; mod sau mỗi nhân để chống tràn. Đây là động cơ của RSA/Diffie–Hellman.

## 8. Định lý Fermat nhỏ

**Phát biểu.** Nếu $p$ là **số nguyên tố** và $a$ không chia hết cho $p$, thì:

$$a^{p-1} \equiv 1 \pmod{p}.$$

Hệ quả (đúng cho mọi $a$): $a^{p} \equiv a \pmod p$.

**Ví dụ số:**

- $p = 7$, $a = 3$: $3^{6} = 729 = 104\cdot7 + 1 \equiv 1 \pmod 7$ ✓.
- $p = 5$, $a = 2$: $2^{4} = 16 \equiv 1 \pmod 5$ ✓.
- $p = 7$, $a = 2$: $2^{6} = 64 = 9\cdot7+1 \equiv 1 \pmod 7$ ✓.
- $p = 11$, $a = 3$: $3^{10} = 59049 = 5368\cdot11 + 1 \equiv 1 \pmod{11}$ ✓.

### 8.1. Ứng dụng 1 — tính nghịch đảo

Vì $a\cdot a^{p-2} = a^{p-1} \equiv 1$, ta có

$$a^{-1} \equiv a^{p-2} \pmod p \quad (p \text{ nguyên tố}).$$

Ví dụ $3^{-1} \bmod 7 = 3^{5} \bmod 7$: $3^5 = 243 = 34\cdot7 + 5 \equiv 5$ → $5$, khớp với §6.2. Tính $3^5\bmod7$ bằng fast exponentiation (§7). Đây là cách lập trình thi đấu hay dùng khi modulus là số nguyên tố cố định (vd $10^9+7$).

### 8.2. Ứng dụng 2 — kiểm tra nguyên tố sơ lược (Fermat primality test)

Nếu tìm được $a$ với $a^{n-1} \not\equiv 1 \pmod n$ thì $n$ **chắc chắn không nguyên tố**. Nếu $a^{n-1}\equiv1$ với nhiều $a$ ngẫu nhiên thì $n$ "có vẻ" nguyên tố (probabilistic).

⚠ **Cảnh báo (toy/limitation).** Phép thử Fermat **không chắc chắn**: có các **số Carmichael** (vd $561 = 3\cdot11\cdot17$) thỏa $a^{n-1}\equiv1$ với mọi $a$ coprime nhưng vẫn là hợp số. Production dùng **Miller–Rabin** (mạnh hơn) — xem [Cryptography](../../../Cryptography/). Ở đây Fermat chỉ là minh họa ý tưởng, **đừng dùng để kiểm tra nguyên tố thật**.

🔁 **Dừng lại tự kiểm tra.** Dùng Fermat tính $4^{-1} \bmod 13$.
<details><summary>Đáp án</summary>

$4^{-1}\equiv4^{11}\pmod{13}$. Nhanh hơn: thử trực tiếp $4\cdot10=40=3\cdot13+1\equiv1$ → $4^{-1}=10$. (Kiểm $4^{11}$ qua fast-exp cũng ra $10$.)
</details>

📝 **Tóm tắt mục 8.** $a^{p-1}\equiv1\pmod p$ (p nguyên tố, $p\nmid a$). Cho công thức nghịch đảo $a^{p-2}$ và phép thử nguyên tố Fermat (không chắc — có số Carmichael).

## 9. Ứng dụng: hashing, checksum, RSA

### 9.1. Hashing — vì sao $m$ nên là số nguyên tố

Trả lời **câu hỏi mở** ở §1. Hàm hash thô `h(s) = (tổng mã ASCII) % m`. Với `"alice"`: mã ASCII `a=97, l=108, i=105, c=99, e=101`, tổng $= 510$.

- $h(\text{"alice"}) \bmod 10 = 510 \bmod 10 = \mathbf{0}$.
- $h(\text{"alice"}) \bmod 7 = 510 \bmod 7 = \mathbf{6}$ (vì $510 = 72\cdot7 + 6$).

**Vì sao chọn $m$ nguyên tố thay vì $m=10$ hay $m=2^k$?**

- Nếu $m = 2^k$, thì `x % m` chỉ giữ $k$ **bit thấp** của `x` — toàn bộ bit cao bị bỏ. Nếu dữ liệu có cấu trúc ở bit cao (vd địa chỉ căn theo $2^k$), nhiều key dồn vào ít bucket → **collision tăng**.
- Nếu $m = 10$, mọi key có cùng chữ số hàng đơn vị rơi cùng bucket — dữ liệu thực thường lệch (nhiều giá trị tròn chục).
- $m$ **nguyên tố** "trộn" mọi bit của key vào kết quả (không có ước chung với các chu kỳ thường gặp trong dữ liệu) → phân phối đều hơn, ít collision hơn.

⚠ **Toy warning.** `h(s) = tổng ASCII % m` là **đồ chơi**: mọi **anagram** băm trùng (`"alice"` và `"ileac"` cùng tổng $510$ → cùng hash). Production dùng **polynomial hash** $h(s) = \big(\sum s_i \cdot 31^{\,n-1-i}\big) \bmod p$ (vị trí có trọng số khác nhau) — học kỹ ở [Hashing Fundamentals](../../02-EncodingMemory/lesson-03-hashing-fundamentals/) và [Hash Table](../../../DataStructures/01-Basic/lesson-06-hash-table/).

### 9.2. Checksum / chữ số kiểm tra

- **Luhn (thẻ tín dụng):** tính tổng có trọng số rồi kiểm tra $\equiv 0 \pmod{10}$ — bắt được hầu hết lỗi gõ sai 1 chữ số.
- **ISBN-10:** chữ số kiểm tra chọn sao cho $\sum i\cdot d_i \equiv 0 \pmod{11}$.
- **CRC:** thực chất là phép chia đa thức lấy dư (mod đa thức trên $\mathbb{Z}_2$) — cùng tinh thần "lấy dư để bắt lỗi".

→ Tất cả đều là: **gắn thông tin dư mod $m$ để phát hiện sai lệch**.

### 9.3. RSA — tóm tắt

RSA dựng trên đúng các mảnh của bài này:

1. Chọn hai nguyên tố lớn $p, q$, đặt $n = pq$.
2. Số mũ công khai $e$ với $\gcd(e, (p-1)(q-1)) = 1$ (cần **GCD §5**).
3. Số mũ bí mật $d = e^{-1} \bmod (p-1)(q-1)$ (cần **nghịch đảo modular §6**).
4. Mã hóa $c = m^e \bmod n$, giải mã $m = c^d \bmod n$ (cần **fast exponentiation §7**); tính đúng đắn dựa trên **Fermat/Euler §8**.

→ Chi tiết: [RSA](../../../Cryptography/03-AsymmetricApplied/lesson-01-rsa/) và [nền tảng modular cho mật mã](../../../Cryptography/01-Classical/lesson-04-modular-arithmetic-foundations/).

📝 **Tóm tắt mục 9.** Mod $m$ (m nguyên tố) phân phối hash đều hơn; checksum dùng dư mod để bắt lỗi; RSA ghép GCD + nghịch đảo + fast-exp + Fermat.

## 10. Bài tập

**Bài 1.** Tính các giá trị sau theo **mod toán học** (kết quả không âm) và cho biết `%` trong Go ra gì khi khác:
(a) $29 \bmod 6$  (b) $-29 \bmod 6$  (c) $-1 \bmod 12$  (d) $0 \bmod 7$.

**Bài 2.** Dùng tính chất modular, tính $(987 \cdot 654) \bmod 11$ bằng cách **mod sớm**, rồi kiểm tra lại bằng phép nhân đầy đủ.

**Bài 3.** Chạy thuật toán Euclid cho $\gcd(252, 198)$, lập bảng từng bước, đếm số bước mod.

**Bài 4.** Tìm $7^{-1} \bmod 26$ bằng Extended Euclid (giải $7x + 26y = 1$). Chuẩn hóa $x$ về $[0, 26)$ và kiểm tra.

**Bài 5.** Tính $5^{117} \bmod 19$ bằng định lý Fermat nhỏ (rút gọn số mũ trước), rồi nêu kết quả.

**Bài 6.** Với hàm hash đồ chơi `h(s) = (tổng ASCII) % m`, tính `h("bob")` với $m = 13$. Chỉ ra một chuỗi khác `"bob"` cho cùng hash và giải thích đó là loại collision gì.

---

## Lời giải chi tiết

### Bài 1.

(a) $29 = 4\cdot6 + 5$ → $29\bmod6 = 5$. Go: `29 % 6 == 5` (giống, vì dương).

(b) $-29 = (-5)\cdot6 + 1$ → mod toán học $= 1$. Go: `-29 % 6 == -5` (giữ dấu số bị chia) → **khác**; muốn 1 phải `((-29)%6+6)%6`.

(c) $-1 = (-1)\cdot12 + 11$ → mod toán học $= 11$. Go: `-1 % 12 == -1` → **khác**.

(d) $0\bmod7 = 0$; Go `0 % 7 == 0` (giống).

→ Bài học: với số âm, mod toán học và `%` lệch nhau đúng một bội của $m$ → luôn chuẩn hóa `((a%m)+m)%m`.

### Bài 2.

Mod sớm: $987 \bmod 11$: $987 = 89\cdot11 + 8$ → $8$. $654 \bmod 11$: $654 = 59\cdot11 + 5$ → $5$. $(8\cdot5)\bmod11 = 40\bmod11 = 7$ (vì $40 = 3\cdot11 + 7$).

Kiểm tra đầy đủ: $987\cdot654 = 645498$; $645498 \bmod 11 = ?$ $645498 = 58681\cdot11 + 7$ → $7$ ✓. Hai vế khớp; mod sớm chỉ phải nhân $8\cdot5$ thay vì số 6 chữ số.

### Bài 3.

| Bước | $a$ | $b$ | $a\bmod b$ |
| --- | --- | --- | --- |
| 1 | $252$ | $198$ | $54$ |
| 2 | $198$ | $54$ | $36$ |
| 3 | $54$ | $36$ | $18$ |
| 4 | $36$ | $18$ | $0$ |
| 5 | $18$ | $0$ | — → trả về $18$ |

$\gcd(252, 198) = 18$. **4 bước mod**. (Kiểm: $252 = 18\cdot14$, $198 = 18\cdot11$, và $\gcd(14,11)=1$ ✓.)

### Bài 4.

Euclid xuôi: $26 = 3\cdot7 + 5$; $7 = 1\cdot5 + 2$; $5 = 2\cdot2 + 1$; $2 = 2\cdot1 + 0$ → $\gcd = 1$ (tồn tại nghịch đảo).

Truy ngược:
$$1 = 5 - 2\cdot2 = 5 - 2(7 - 5) = 3\cdot5 - 2\cdot7 = 3(26 - 3\cdot7) - 2\cdot7 = 3\cdot26 - 11\cdot7.$$

Đối chiếu $7x + 26y = 1$: $x = -11$, $y = 3$. Chuẩn hóa: $-11 \bmod 26 = 15$. → $7^{-1} \equiv 15 \pmod{26}$.

Kiểm tra: $7\cdot15 = 105 = 4\cdot26 + 1 \equiv 1 \pmod{26}$ ✓. (Đây chính là khóa giải mã của Affine cipher với $a=7$.)

### Bài 5.

$19$ nguyên tố, $5 \nmid$ bởi $19$ → Fermat: $5^{18} \equiv 1 \pmod{19}$. Rút gọn số mũ: $117 = 6\cdot18 + 9$, nên $5^{117} = (5^{18})^6 \cdot 5^9 \equiv 1^6\cdot 5^9 = 5^9 \pmod{19}$.

Tính $5^9 \bmod 19$ (fast-exp / từng bước): $5^2 = 25 \equiv 6$; $5^4 = 6^2 = 36 \equiv 17 \equiv -2$; $5^8 = (-2)^2 = 4$; $5^9 = 5^8\cdot5 = 4\cdot5 = 20 \equiv 1 \pmod{19}$.

→ $5^{117} \equiv 1 \pmod{19}$. (Hợp lý: $117$ chia hết cho $9$ và $5$ có bậc $9$ mod $19$.)

### Bài 6.

`"bob"`: ASCII `b=98, o=111, b=98`, tổng $= 307$. $307 \bmod 13 = 8$ (vì $307 = 23\cdot13 + 8$) → `h("bob") = 8`.

Chuỗi khác cùng hash: bất kỳ chuỗi có **cùng tổng ASCII** $307$, đơn giản nhất là **anagram** `"obb"` (cùng các ký tự, tổng không đổi). Đây là **collision do hàm hash đồ chơi không phân biệt thứ tự** — chính lý do production dùng polynomial hash (trọng số theo vị trí). Xem [Hashing Fundamentals](../../02-EncodingMemory/lesson-03-hashing-fundamentals/).

## Tham khảo & bài tiếp theo

- **Bài tiếp theo:** [Lesson 05 — Proof & Induction](../lesson-05-proof-induction/) — chứng minh quy nạp, dùng để chứng minh các tính chất modular tổng quát.
- **Tiền đề:** [Set Theory](../lesson-01-set-theory/) · [Boolean Logic](../lesson-02-boolean-logic/) · [Combinatorics](../lesson-03-combinatorics/).
- **Đi sâu lý thuyết số:** [Math/05 — Number Theory, Combinatorics & Logic](../../../Math/05-NumberTheory-Combinatorics-Logic/index.html).
- **Ứng dụng:**
  - [Hashing Fundamentals](../../02-EncodingMemory/lesson-03-hashing-fundamentals/) · [Hash Table (DataStructures)](../../../DataStructures/01-Basic/lesson-06-hash-table/).
  - [Cryptography](../../../Cryptography/) — đặc biệt [RSA](../../../Cryptography/03-AsymmetricApplied/lesson-01-rsa/) và [nền tảng modular cho mật mã](../../../Cryptography/01-Classical/lesson-04-modular-arithmetic-foundations/).
- **Minh họa tương tác:** [visualization.html](./visualization.html) — đồng hồ modular, Euclid GCD stepper, fast modular exponentiation stepper, và modular inverse finder.
- **Sách:** *Discrete Mathematics and Its Applications* (Rosen), chương 4 (Number Theory).
