# Lesson 06 — Quy nạp toán học

## Mục tiêu

- Hiểu **nguyên lý quy nạp toán học** — kỹ thuật chứng minh cốt lõi cho mệnh đề về số tự nhiên, và **vì sao nó hợp lệ** (tương đương well-ordering / tiên đề Peano).
- Viết một chứng minh quy nạp theo **bộ khung 4 bước** chuẩn (phát biểu → cơ sở → giả thuyết → bước quy nạp).
- Phân biệt **quy nạp yếu** và **quy nạp mạnh**; biết chọn số bước cơ sở.
- Áp dụng vào: tổng dãy số (tổng $n$, $n^2$, $n^3$), bất đẳng thức ($2^n>n$, $n!>2^n$), chia hết, dãy đệ quy (Fibonacci).
- Nhận diện các **lỗi quy nạp kinh điển** ("ngựa cùng màu", quên cơ sở, lập luận vòng).
- Thấy liên hệ **quy nạp ↔ đệ quy** trong lập trình.

## Kiến thức tiền đề

- [Lesson 03 — Tổ hợp](../lesson-03-permutations-combinations/).

---

## 1. Quy nạp là gì?

💡 **Trực giác (domino)**: Có vô số quân domino đặt thẳng hàng. Nếu:
- (1) Quân đầu tiên đổ.
- (2) Mỗi quân đổ làm quân tiếp theo đổ.

Thì **TẤT CẢ quân đều đổ**.

Hình dung dãy domino — mỗi quân là một mệnh đề $P(n)$, "đổ" nghĩa là "đúng":

```
   P(1)   P(2)   P(3)   P(4)   P(5)        P(n)
    ┃      ┃      ┃      ┃      ┃     ...    ┃
    ┃ ───► ┃ ───► ┃ ───► ┃ ───► ┃           ┃
    ▔▔     ▔▔     ▔▔     ▔▔     ▔▔           ▔▔
    ▲       └──────┴──────┴──────┘
    │              │
  CƠ SỞ        BƯỚC QUY NẠP
 (đẩy quân    (quân k đổ ⟹ đổ quân k+1)
  đầu tiên)

   Có CẢ HAI ⟹ cả dãy đổ hết (P(n) đúng ∀ n ≥ 1)
```

- **Cơ sở** = lực tay đẩy quân đầu. Không có nó, dù các quân xếp sát nhau cũng chẳng quân nào đổ.
- **Bước quy nạp** = khoảng cách giữa hai quân đủ gần để quân trước chạm quân sau. Nếu có một khe hở ở đâu đó (bước $k \to k+1$ hỏng tại một $k$), dây chuyền **đứt** từ chỗ đó trở đi.

Trong toán: chứng minh $P(n)$ đúng với mọi $n \ge n_0$ bằng cách:
1. **Cơ sở (base case)**: chứng minh $P(n_0)$ đúng.
2. **Quy nạp (inductive step)**: giả sử $P(k)$ đúng ($k \ge n_0$) — gọi là **giả thuyết quy nạp (induction hypothesis)** — rồi chứng minh $P(k+1)$ đúng.

📐 **4 ví dụ mệnh đề $P(n)$ điển hình** (để thấy "mệnh đề về số tự nhiên" trông như thế nào):

| $P(n)$ | Nội dung | Loại |
|--------|----------|------|
| $P(n): 1+2+\dots+n = \frac{n(n+1)}{2}$ | một đẳng thức tổng | đẳng thức |
| $P(n): 3 \mid (n^3 - n)$ | một quan hệ chia hết | chia hết |
| $P(n): 2^n > n$ | một bất đẳng thức | bất đẳng thức |
| $P(n):$ "$n$ đồng tiền 3đ & 5đ trả được mọi số tiền $\ge 8$" | một khẳng định tồn tại | đệ quy / tồn tại |

Mỗi cái là một dãy domino riêng; quy nạp là cùng một "máy chứng minh" áp cho cả bốn.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Giả sử $P(k)$ đúng — chẳng phải đó là điều cần chứng minh sao? Vòng tròn luẩn quẩn?"* Không. Ta KHÔNG giả sử $P(n)$ đúng với mọi n; ta chỉ giả sử nó đúng **tại 1 giá trị k** rồi chứng minh **kéo theo** k+1. Như domino: ta không giả định "mọi quân đổ", chỉ giả định "nếu quân k đổ thì quân k+1 đổ". Cộng với "quân đầu đổ" → tất cả đổ. Nói cách khác, giả thuyết quy nạp là **vế trái của một phép kéo theo** ($P(k) \implies P(k+1)$), không phải kết luận cuối cùng — ta được phép giả định vế trái để chứng minh vế phải, đó là cách chứng minh mọi phép kéo theo.
- *"Vì sao chỉ 2 bước mà phủ được vô hạn n?"* Cơ sở cho $P(n_0)$. Bước quy nạp cho $P(n_0) \implies P(n_0+1) \implies P(n_0+2) \implies \dots$ — dây chuyền vô tận. Mỗi n cụ thể đạt được sau hữu hạn bước. Ví dụ muốn $P(100)$: chạy bước quy nạp 99 lần từ cơ sở. Muốn $P(10^9)$: vẫn được, chỉ là dây dài hơn — và ta không cần *thực sự chạy*, chỉ cần biết dây không đứt ở đâu.
- *"Vì sao quy nạp **hợp lệ** về mặt logic? Lấy gì bảo đảm?"* Quy nạp không phải mẹo — nó là **một tiên đề** (axiom) định nghĩa số tự nhiên (tiên đề thứ 5 của Peano). Tương đương với nó là **nguyên lý sắp thứ tự tốt (well-ordering principle)**: *"mọi tập con khác rỗng của $\mathbb{N}$ đều có phần tử nhỏ nhất."* Chứng minh tương đương bằng phản chứng: giả sử $P(n)$ KHÔNG đúng với mọi $n$. Gọi $S = \{n \ge n_0 : P(n) \text{ sai}\}$ — tập này khác rỗng (theo giả sử). Theo well-ordering, $S$ có phần tử nhỏ nhất $m$. Vì cơ sở cho $P(n_0)$ đúng nên $m > n_0$, suy ra $m - 1 \ge n_0$ và $m-1 \notin S$, tức $P(m-1)$ **đúng**. Nhưng bước quy nạp nói $P(m-1) \implies P(m)$, vậy $P(m)$ đúng — mâu thuẫn với $m \in S$. Vậy $S$ rỗng, $P(n)$ đúng với mọi $n$. □ Đây chính là "lý do sâu" vì sao domino phải đổ hết: nếu có quân không đổ, ắt có **quân-không-đổ-đầu-tiên**, mà quân ngay trước nó đã đổ lại đẩy đổ nó — vô lý.

⚠ **Lỗi thường gặp — bỏ qua bước cơ sở**. Chỉ chứng minh $P(k) \implies P(k+1)$ mà không kiểm $P(n_0)$ thì vô nghĩa: domino đổ dây chuyền nhưng nếu không ai đẩy quân đầu thì chẳng quân nào đổ. Phản ví dụ (mục 7): "mọi số tự nhiên bằng nhau" có bước quy nạp hình thức nhưng cơ sở sai → mệnh đề sai.

🔁 **Dừng lại tự kiểm tra**

1. Hai thành phần bắt buộc của một chứng minh quy nạp là gì?
2. Trong analogy domino, "bước cơ sở" tương ứng điều gì?

<details><summary>Đáp án</summary>

1. (1) Cơ sở $P(n_0)$ đúng; (2) Bước quy nạp $P(k) \implies P(k+1)$.
2. Quân domino đầu tiên đổ (có người đẩy).

</details>

### 📝 Tóm tắt mục 1

- Quy nạp = domino: cơ sở + hiệu ứng dây chuyền.
- Giả thuyết quy nạp chỉ giả định P đúng tại **1 mốc k**, không phải mọi n.
- Thiếu cơ sở → toàn bộ chứng minh sụp.

---

## 2. Quy nạp yếu — Mẫu chuẩn

🎯 **Nguyên lý**: Cho $P(n)$ là mệnh đề về số tự nhiên n.
1. Cơ sở: $P(n_0)$ đúng (thường $n_0 = 0$ hoặc 1).
2. Bước quy nạp: $\forall k \ge n_0$, $P(k) \implies P(k+1)$.

Thì $P(n)$ đúng $\forall n \ge n_0$.

> 📐 **Định nghĩa đầy đủ — Quy nạp toán học**
>
> **(a) Là gì**: 1 phương pháp chứng minh mệnh đề $P(n)$ đúng với **vô hạn** số tự nhiên, bằng cách chỉ kiểm tra 2 điều: (1) $P(n_0)$ đúng, (2) $P(k) \implies P(k+1)$. Khi đó P đúng với mọi $n \ge n_0$ — không cần kiểm từng cái.
>
> **(b) Vì sao cần**: Vì có vô hạn số tự nhiên — không thể kiểm tra mọi giá trị. Quy nạp là **cách duy nhất** chứng minh nghiêm túc các mệnh đề "$\forall n \in \mathbb{N}, P(n)$". Là tiên đề thứ 5 của Peano (định nghĩa $\mathbb{N}$). Áp dụng khắp toán: chứng minh công thức tổng ($\sum i = \frac{n(n+1)}{2}$), bất đẳng thức, chia hết, thuật toán đúng (correctness), đệ quy. Trong CS: chứng minh thuật toán đệ quy đúng (tower of Hanoi, merge sort) bằng quy nạp.
>
> **(c) Ví dụ số**: CM $1+2+\dots+n = \frac{n(n+1)}{2}$. Cơ sở n=1: $1 = 1\cdot 2/2$ ✓. Quy nạp: giả sử $1+\dots+k = \frac{k(k+1)}{2}$, thì $1+\dots+k+(k+1) = \frac{k(k+1)}{2} + (k+1) = \frac{(k+1)(k+2)}{2}$ ✓. CM $2^n > n$ với $n \ge 1$: cơ sở $2 > 1$ ✓. Quy nạp: $2^k > k \implies 2^{k+1} = 2\cdot 2^k > 2k \ge k+1$ (khi $k \ge 1$) ✓. CM $n^3 + 2n$ chia hết 3: cơ sở $1+2 = 3$ ✓. Quy nạp: $(k+1)^3+2(k+1) = (k^3+2k) + 3(k^2+k+1)$ — cả 2 phần chia hết 3 ✓. **Pitfall**: "Mọi n: $n^2+n+41$ nguyên tố" — đúng n=0..39, SAI tại n=40 ($= 41^2$). Quy nạp không thay được bằng "kiểm vài giá trị".

### 2.1. Bộ khung 4 bước của MỌI chứng minh quy nạp

Để không bao giờ viết thiếu phần, mọi chứng minh quy nạp viết theo đúng 4 mảnh này:

> **① Phát biểu $P(n)$** — nói rõ mệnh đề cần chứng minh là gì, đúng với $n \ge n_0$ nào.
>
> **② Cơ sở** — thay $n = n_0$, tính **cả hai vế** (hoặc kiểm trực tiếp), kết luận $P(n_0)$ đúng. ✓
>
> **③ Giả thuyết quy nạp** — viết hẳn ra: *"Giả sử $P(k)$ đúng với một $k \ge n_0$ nào đó"*, kèm công thức cụ thể.
>
> **④ Bước quy nạp** — xuất phát từ vế của $P(k+1)$, **biến đổi để lộ ra biểu thức của $P(k)$**, thay bằng giả thuyết, rồi rút gọn về đúng dạng $P(k+1)$. Đánh dấu rõ chỗ "(theo giả thuyết quy nạp)".

Thiếu bất kỳ mảnh nào trong ④ mảnh = chứng minh chưa hoàn chỉnh. Đặc biệt mảnh ② (cơ sở) và việc **đánh dấu nơi dùng giả thuyết** trong ④ là hai chỗ người mới hay bỏ.

🔬 **Một mẫu đầy đủ (làm chuẩn để soi các mẫu khác)** — CM $1 + 3 + 5 + \dots + (2n-1) = n^2$ với $n \ge 1$:

- **① $P(n)$**: tổng $n$ số lẻ đầu tiên bằng $n^2$, với mọi $n \ge 1$.
- **② Cơ sở $n=1$**: VT $= 1$; VP $= 1^2 = 1$. Bằng nhau ✓.
- **③ Giả thuyết**: giả sử $1 + 3 + \dots + (2k-1) = k^2$ đúng với một $k \ge 1$.
- **④ Bước quy nạp**: cần CM $1 + 3 + \dots + (2k-1) + (2k+1) = (k+1)^2$.

$$\begin{aligned}
\underbrace{1 + 3 + \dots + (2k-1)}_{= \, k^2 \text{ (giả thuyết quy nạp)}} + (2k+1)
&= k^2 + (2k+1) \\
&= k^2 + 2k + 1 \\
&= (k+1)^2 \quad\checkmark
\end{aligned}$$

Vậy $P(n)$ đúng $\forall n \ge 1$. □ — Để ý 4 mảnh tách bạch và chỗ "(giả thuyết quy nạp)" được chỉ đích danh.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Chọn $n_0$ thế nào?"* Là giá trị nhỏ nhất mệnh đề cần đúng. Thường $n_0 = 0$ hoặc 1, nhưng có thể lớn hơn: $2^n > n^2$ chỉ đúng từ $n \ge 5$ → cơ sở $n_0 = 5$ (kiểm: $n=2$ cho $4 = 4$ không thỏa "$>$"; $n=3$ cho $8 < 9$ sai; $n=4$ cho $16 = 16$ sai; $n=5$ cho $32 > 25$ ✓).
- *"Trong bước quy nạp, dùng giả thuyết ở đâu?"* Phải dùng ở 1 chỗ rõ ràng (đánh dấu "theo giả thuyết quy nạp"). Nếu chứng minh $P(k+1)$ mà KHÔNG dùng $P(k)$ thì đó không phải quy nạp (và thường là sai sót).
- *"Đi từ $P(k+1)$ về $P(k)$ hay từ $P(k)$ tiến lên $P(k+1)$?"* Cả hai hướng đều hợp lệ. Cách an toàn nhất: **viết vế trái của $P(k+1)$ rồi tách hạng tử cuối** để lộ vế trái của $P(k)$ (như mẫu trên tách $(2k+1)$ ra). Tránh kiểu "xuất phát từ điều cần chứng minh rồi biến đổi xuống điều đúng" mà không ghi rõ mỗi bước là tương đương — dễ thành lập luận ngược sai.

🔁 **Dừng lại tự kiểm tra**

1. Viết bước cơ sở cho mệnh đề $1+3+5+\dots+(2n-1) = n^2$ với $n_0 = 1$.
2. Trong bước quy nạp của tổng $1+2+\dots+n$, ta cộng thêm hạng tử nào để đi từ k tới k+1?

<details><summary>Đáp án</summary>

1. n = 1: VT = 1, VP = $1^2 = 1$ ✓.
2. Cộng thêm $(k+1)$: $\frac{k(k+1)}{2} + (k+1) = \frac{(k+1)(k+2)}{2}$.

</details>

### 📝 Tóm tắt mục 2

- Mẫu chuẩn: cơ sở $P(n_0)$ + bước $\forall k \ge n_0: P(k) \implies P(k+1)$.
- $n_0$ = giá trị nhỏ nhất mệnh đề cần đúng (không nhất thiết 0/1).
- Bước quy nạp PHẢI dùng giả thuyết $P(k)$, nếu không thì sai.

---

## 3. Ví dụ kinh điển — Tổng 1 + 2 + ... + n = n(n+1)/2

💡 **Trực giác trước khi chứng minh**: vì sao công thức $\frac{n(n+1)}{2}$ lại đúng? Xếp hai bản sao của tổng, một xuôi một ngược, rồi cộng theo cột:

```
   1  +  2  +  3  + ... + (n-1) +  n
   n  + (n-1)+(n-2)+ ... +  2   +  1
  ─────────────────────────────────────
 (n+1)+(n+1)+(n+1)+ ... +(n+1) +(n+1)   ← n cột, mỗi cột = (n+1)
```

Tổng của HAI bản $= n\cdot(n+1)$, nên một bản $= \frac{n(n+1)}{2}$. (Đây là cách Gauss làm khi 9 tuổi cho $1+\dots+100 = \frac{100\cdot 101}{2} = 5050$.) Quy nạp **không tìm ra** công thức — nó **xác nhận** công thức ta đã đoán là đúng cho mọi $n$.

**① $P(n)$**: $1 + 2 + \dots + n = \dfrac{n(n+1)}{2}$ với mọi $n \ge 1$.

**② Bước cơ sở**: n = 1.
- VT = 1. VP = $\frac{1\cdot 2}{2} = 1$. Bằng nhau ✓.

**③ Giả thuyết quy nạp**: Giả sử $P(k)$ đúng: $1 + 2 + \dots + k = \frac{k(k+1)}{2}$ với một $k \ge 1$ nào đó.

**④ Bước quy nạp**: Cần chứng minh $P(k+1)$: $1 + 2 + \dots + k + (k+1) = \frac{(k+1)(k+2)}{2}$.

Tính (tách hạng tử cuối để lộ vế trái của $P(k)$):

$$\begin{aligned}
1 + 2 + \dots + k + (k+1) &= \underbrace{\frac{k(k+1)}{2}}_{\text{thay bằng giả thuyết}} + (k+1) &&\text{(giả thuyết quy nạp)} \\
&= \frac{k(k+1)}{2} + \frac{2(k+1)}{2} &&\text{(quy đồng)} \\
&= \frac{(k+1)(k + 2)}{2} &&\text{(đặt } (k+1) \text{ làm nhân tử chung)} \\
&= \frac{(k+1)\big((k+1)+1\big)}{2} \quad\checkmark
\end{aligned}$$

Vế phải đúng dạng $\frac{(k+1)(k+2)}{2}$ của $P(k+1)$. Vậy $P(n)$ đúng $\forall n \ge 1$. □

🔢 **Kiểm số cụ thể** (để tin công thức + thấy bước quy nạp chạy thật):

| $n$ | $1+2+\dots+n$ | $\frac{n(n+1)}{2}$ | Khớp? |
|----|----|----|:--:|
| 1 | $1$ | $\frac{1\cdot 2}{2}=1$ | ✓ |
| 2 | $1+2 = 3$ | $\frac{2\cdot 3}{2}=3$ | ✓ |
| 3 | $1+2+3 = 6$ | $\frac{3\cdot 4}{2}=6$ | ✓ |
| 5 | $1+\dots+5 = 15$ | $\frac{5\cdot 6}{2}=15$ | ✓ |
| 10 | $1+\dots+10 = 55$ | $\frac{10\cdot 11}{2}=55$ | ✓ |

Để ý từ $n=2$ sang $n=3$: $S_3 = S_2 + 3 = 3 + 3 = 6$ — đúng là "$S_k + (k+1)$" mà bước quy nạp dùng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Bước cơ sở dùng $n=1$ hay $n=0$?"* Tùy quy ước tổng rỗng. Nếu định nghĩa $S_0 = 0$ (tổng không hạng tử), thì $\frac{0\cdot 1}{2}=0$ cũng đúng → có thể lấy $n_0 = 0$. Lấy $n_0 = 1$ là phổ biến và an toàn nhất.
- *"Vì sao biến đổi vế trái mà không phải vế phải?"* Để **dùng được giả thuyết**: giả thuyết cho ta giá trị của $1+\dots+k$, nên ta phải làm xuất hiện nó — và nó nằm bên vế trái của $P(k+1)$.

🔁 **Dừng lại tự kiểm tra**

1. Trong bước ④, sau khi thay giả thuyết, ta đặt **nhân tử chung** nào ra ngoài?
2. Tính nhanh $1+2+\dots+20$ bằng công thức.

<details><summary>Đáp án</summary>

1. Nhân tử chung $(k+1)$: $\frac{k(k+1)}{2} + (k+1) = (k+1)\left(\frac{k}{2}+1\right) = (k+1)\cdot\frac{k+2}{2}$.
2. $\frac{20\cdot 21}{2} = \frac{420}{2} = 210$.

</details>

### 3.1. Walk-through đầy đủ — Tổng bình phương $1^2 + 2^2 + \dots + n^2 = \frac{n(n+1)(2n+1)}{6}$

Đây là chứng minh quy nạp "đại số nặng" hơn — luyện kỹ năng biến đổi vế.

**① $P(n)$**: $\displaystyle\sum_{i=1}^{n} i^2 = \frac{n(n+1)(2n+1)}{6}$ với $n \ge 1$.

**② Cơ sở $n=1$**: VT $= 1^2 = 1$; VP $= \frac{1\cdot 2\cdot 3}{6} = \frac{6}{6} = 1$. Bằng nhau ✓.

**③ Giả thuyết**: giả sử $\sum_{i=1}^{k} i^2 = \frac{k(k+1)(2k+1)}{6}$.

**④ Bước quy nạp**: cần CM $\sum_{i=1}^{k+1} i^2 = \frac{(k+1)(k+2)(2k+3)}{6}$. Tách hạng tử cuối $(k+1)^2$:

$$\begin{aligned}
\sum_{i=1}^{k+1} i^2 &= \underbrace{\frac{k(k+1)(2k+1)}{6}}_{\text{giả thuyết}} + (k+1)^2 \\
&= \frac{k(k+1)(2k+1) + 6(k+1)^2}{6} &&\text{(quy đồng mẫu 6)} \\
&= \frac{(k+1)\big[k(2k+1) + 6(k+1)\big]}{6} &&\text{(rút } (k+1)\text{)} \\
&= \frac{(k+1)\big[2k^2 + k + 6k + 6\big]}{6} \\
&= \frac{(k+1)(2k^2 + 7k + 6)}{6} \\
&= \frac{(k+1)(k+2)(2k+3)}{6} \quad\checkmark &&\text{(phân tích } 2k^2+7k+6\text{)}
\end{aligned}$$

Phân tích chi tiết $2k^2 + 7k + 6$: tìm hai số nhân $2\cdot 6 = 12$, cộng $7$ → $3$ và $4$. Tách: $2k^2 + 3k + 4k + 6 = k(2k+3) + 2(2k+3) = (k+2)(2k+3)$. Vậy vế phải $= \frac{(k+1)(k+2)(2k+3)}{6}$ — đúng dạng $P(k+1)$ (thay $n=k+1$ vào $\frac{n(n+1)(2n+1)}{6}$ cho $\frac{(k+1)(k+2)(2k+3)}{6}$). □

🔢 **Kiểm số**: $n=3$ → VT $= 1+4+9 = 14$; VP $= \frac{3\cdot 4\cdot 7}{6} = \frac{84}{6} = 14$ ✓.

---

## 4. Ví dụ — Bất đẳng thức 2^n > n (n ≥ 5)

💡 **Trực giác — quy nạp cho bất đẳng thức**: với đẳng thức, ta *thay* giả thuyết vào. Với bất đẳng thức, ta **dùng giả thuyết để chặn**: từ "$2^k > k$" ta nhân hai vế cho 2 được "$2^{k+1} > 2k$", rồi chỉ cần lý luận "$2k$ đã đủ lớn hơn $k+1$". Mẹo chung: biến đổi vế trái $f(k+1)$ thành "(thứ liên hệ $f(k)$) $\ge$ (vế phải cần)".

**① $P(n)$**: $2^n > n$ với mọi $n \ge 5$ (đề bài chọn $n_0 = 5$; thực ra đúng từ $n=1$).

**② Cơ sở n = 5**: $2^5 = 32 > 5$ ✓.

**③ Giả thuyết**: giả sử $2^k > k$ với một $k \ge 5$.

**④ Bước quy nạp**: Cần CM $2^{k+1} > k+1$.

$$\begin{aligned}
2^{k+1} &= 2\cdot 2^k \\
&> 2\cdot k &&\text{(nhân 2 vào giả thuyết } 2^k > k\text{)} \\
&= k + k \\
&\ge k + 5 &&\text{(vì } k \ge 5\text{)} \\
&> k + 1 \quad\checkmark
\end{aligned}$$

Chuỗi $2^{k+1} > 2k = k+k \ge k+5 > k+1$ cho $2^{k+1} > k+1$. Vậy $P(n)$ đúng $\forall n \ge 5$. □

🔢 **Kiểm số**: $n=5$: $32 > 5$ ✓; $n=6$: $64 > 6$ ✓; $n=10$: $1024 > 10$ ✓ — khoảng cách ngày càng nới rộng (hàm mũ vượt xa hàm tuyến tính).

⚠ **Lưu ý**: Phải chọn cơ sở đủ lớn. Ví dụ n = 2: $2^2 = 4 > 2$ ✓, n = 3: $8 > 3$ ✓, ... thực ra $2^n > n$ đúng từ n = 1, nhưng nếu bài hỏi $n \ge 5$ thì làm theo.

⚠ **Lỗi cơ sở trong bài $2^n > n^2$** (đối lập): mệnh đề này **chỉ đúng từ $n \ge 5$**, KHÔNG đúng với $n$ nhỏ. Nếu lấy cơ sở $n=1$ ($2 > 1$ ✓) rồi tưởng bước quy nạp sẽ cứu thì sai — vì bước quy nạp $2^k > k^2 \implies 2^{k+1} > (k+1)^2$ chỉ chạy được khi $2k^2 \ge (k+1)^2$, tức $k \ge 3$. Bài học: **cơ sở phải đặt tại $n_0$ mà từ đó bước quy nạp thực sự đúng** — kiểm $n=2,3,4$ thấy $4<4? 8<9, 16=16$ đều hỏng, $n=5$ ($32>25$) mới bắt đầu đúng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao được phép nhân giả thuyết với 2?"* Vì $2 > 0$: nhân một số dương vào cả hai vế của bất đẳng thức giữ nguyên chiều. Nếu nhân số âm phải đảo chiều — đó là lỗi hay gặp khi quy nạp bất đẳng thức có hệ số âm.
- *"Chỗ '$\ge k+5$' và '$> k+1$' nối nhau thế nào?"* Đây là chuỗi bắc cầu (transitivity): $A > B \ge C > D \implies A > D$. Mỗi mắt xích phải hợp lệ; chỉ cần **một** dấu là "$>$" (chặt) thì cả chuỗi cho "$>$".

🔁 **Dừng lại tự kiểm tra**

1. Trong bước ④, ta dùng điều kiện $k \ge 5$ ở chỗ nào?
2. Vì sao không thể lấy cơ sở $n_0 = 1$ cho mệnh đề $2^n > n^2$?

<details><summary>Đáp án</summary>

1. Ở bước "$k + k \ge k + 5$" — cần $k \ge 5$ để nói $k \ge 5$ (chính là điều giúp $2k > k+1$).
2. Vì $2^n > n^2$ sai tại $n=2,3,4$ ($4=4, 8<9, 16=16$); cơ sở phải là $n_0=5$ ($32>25$).

</details>

---

## 5. Ví dụ — Chia hết 7 | (8^n - 1)

💡 **Trực giác / Hình dung**: với bài chia hết, mẹo là **tách số ở bước k+1 thành "phần đã biết chia hết" cộng "phần thấy rõ chia hết"**. Ở đây $8^{k+1} - 1 = 8\cdot(8^k - 1) + 7$: phần đầu chia hết 7 theo giả thuyết, phần $7$ hiển nhiên chia hết 7 → tổng chia hết 7.

**① $P(n)$**: $7 \mid (8^n - 1)$ với mọi $n \ge 1$.

**② Cơ sở n = 1**: $8^1 - 1 = 7$. $7 \mid 7$ ✓.

**③ Giả thuyết**: giả sử $7 \mid (8^k - 1)$, tức $8^k - 1 = 7m$ với một số nguyên $m$ nào đó.

**④ Bước quy nạp**: CM $7 \mid (8^{k+1} - 1)$.
- $8^{k+1} - 1 = 8\cdot 8^k - 1 = 8\cdot(8^k - 1) + (8 - 1) = 8\cdot(8^k - 1) + 7$.
- $7 \mid (8^k - 1)$ (giả thuyết) → $7 \mid 8\cdot(8^k - 1)$ (bội của một bội).
- $7 \mid 7$ (hiển nhiên).
- Tổng của hai số chia hết 7 thì chia hết 7 → $7 \mid \big[8\cdot(8^k-1) + 7\big] = 8^{k+1} - 1$. □

🔢 **Kiểm số**: $n=1$: $8-1=7 = 7\cdot 1$ ✓; $n=2$: $64-1=63 = 7\cdot 9$ ✓; $n=3$: $512-1=511 = 7\cdot 73$ ✓; $n=4$: $4096-1=4095 = 7\cdot 585$ ✓.

📐 **Mẫu tổng quát "a^n − 1 chia hết a − 1"** (4 ví dụ một lúc): kỹ thuật tách $a^{k+1}-1 = a\cdot(a^k-1) + (a-1)$ luôn cho $(a-1) \mid (a^n - 1)$:

| $a$ | Mệnh đề | Cơ sở $n=1$ | Tách bước quy nạp |
|----|---------|-------------|-------------------|
| 8 | $7 \mid (8^n-1)$ | $8-1=7$ ✓ | $8(8^k-1) + 7$ |
| 4 | $3 \mid (4^n-1)$ | $4-1=3$ ✓ | $4(4^k-1) + 3$ |
| 10 | $9 \mid (10^n-1)$ | $10-1=9$ ✓ | $10(10^k-1)+9$ |
| 6 | $5 \mid (6^n-1)$ | $6-1=5$ ✓ | $6(6^k-1) + 5$ |

(Mệnh đề "$9 \mid 10^n - 1$" chính là lý do **dấu hiệu chia hết cho 9**: một số chia hết 9 ⟺ tổng các chữ số chia hết 9.)

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao tách $8^{k+1} - 1 = 8\cdot(8^k-1) + 7$?"* Để **lộ ra** $(8^k - 1)$ — đúng cái giả thuyết quy nạp cho ta. Đây là kỹ thuật chung: cố biến đổi biểu thức bước k+1 để xuất hiện biểu thức bước k.
- *"Bài tổng (mục 3), bất đẳng thức (mục 4), chia hết (mục 5) khác nhau chỗ nào?"* Cấu trúc 2 bước giống hệt; chỉ khác **cách dùng giả thuyết**: tổng → thay thế; bất đẳng thức → chặn trên/dưới; chia hết → tách phần chia hết.

🔁 **Dừng lại tự kiểm tra**

1. Trong bước quy nạp $3 \mid (4^n - 1)$, tách $4^{k+1} - 1$ thế nào?
2. Cơ sở n=1 của $7 \mid (8^n - 1)$ cho giá trị gì?

<details><summary>Đáp án</summary>

1. $4^{k+1} - 1 = 4\cdot(4^k - 1) + 3$; phần đầu chia hết 3 (giả thuyết), phần $3$ hiển nhiên.
2. $8^1 - 1 = 7$, và $7 \mid 7$ ✓.

</details>

### 📝 Tóm tắt mục 3–5

- 3 dạng quy nạp phổ biến: tổng dãy, bất đẳng thức, chia hết — cùng khung 2 bước.
- Chia hết: tách $f(k+1) = (\text{bội cũ chia hết}) + (\text{phần hiển nhiên chia hết})$.
- Luôn biến đổi để **lộ ra biểu thức bước k** dùng giả thuyết.

---

## 6. Quy nạp mạnh (Strong Induction)

💡 **Trực giác / Hình dung**: quy nạp yếu là domino "mỗi quân chỉ đẩy quân kế tiếp". Quy nạp mạnh là domino "quân k+1 được đẩy bởi **tất cả** quân trước đó cùng lúc". Dùng khi P(k+1) cần dựa vào nhiều bước trước (vd P(k) và P(k−1)), không chỉ P(k) liền trước.

🎯 **Khác**: Thay vì giả sử chỉ $P(k)$, giả sử $P(n_0), P(n_0+1), \dots, P(k)$ **tất cả** đúng.

$$[P(n_0) \land P(n_0+1) \land \dots \land P(k)] \implies P(k+1)$$

⟶ Dùng khi P(k+1) cần kết quả của nhiều bước trước, không chỉ P(k).

ASCII so sánh hai kiểu domino:

```
QUY NẠP YẾU:  mỗi quân chỉ đẩy quân kế tiếp
   P(k) ───► P(k+1)

QUY NẠP MẠNH: P(k+1) được đẩy bởi TẤT CẢ quân trước
   P(n₀) ┐
   P(n₀+1)├──► P(k+1)
    ...   │
   P(k) ──┘
```

📊 **Bảng so sánh yếu / mạnh**:

| | Quy nạp yếu | Quy nạp mạnh |
|---|---|---|
| Giả thuyết | chỉ $P(k)$ | $P(n_0) \land \dots \land P(k)$ |
| Số cơ sở | thường 1 | có thể nhiều (đủ "mồi" cho bước) |
| Khi dùng | bước k+1 chỉ cần k | bước k+1 cần nhiều bước, hoặc bước **không liền kề** |
| Ví dụ | tổng, chia hết, $2^n>n$ | phân tích nguyên tố, Fibonacci, đổi tiền |
| Sức mạnh | — | **tương đương** (CM được lẫn nhau) |

### Ví dụ — Phân tích thừa số nguyên tố

**Mệnh đề**: Mọi $n \ge 2$ viết được thành tích các số nguyên tố.

**Cơ sở n = 2**: 2 nguyên tố → biểu diễn là chính nó. ✓.

**Quy nạp (mạnh)**: Giả sử mọi $2 \le m \le k$ viết được. CM k+1 viết được.
- Nếu k+1 nguyên tố: xong.
- Nếu k+1 hợp số: $k+1 = a\cdot b$ với $1 < a, b < k+1$. Theo giả thuyết, **a** và **b** đều viết được thành tích nguyên tố. → k+1 = (tích của a) · (tích của b) cũng viết được. □

⟶ Đây là **chứng minh định lý cơ bản số học** (L02).

🔢 **Kiểm số**: $12 = 2\cdot 2\cdot 3$ (hợp số, tách $12 = 4\cdot 3$, mỗi phần $\le 11$ đã viết được); $13$ nguyên tố (xong ngay); $30 = 2\cdot 3\cdot 5$ (tách $30 = 5\cdot 6$, dùng giả thuyết cho 5 và 6).

### Ví dụ 2 — Dãy đệ quy Fibonacci $F_n \le 2^n$ (cần 2 cơ sở)

Dãy Fibonacci: $F_1 = 1$, $F_2 = 1$, và $F_n = F_{n-1} + F_{n-2}$ với $n \ge 3$.

**① $P(n)$**: $F_n \le 2^n$ với mọi $n \ge 1$.

💡 **Vì sao quy nạp YẾU không đủ?** Bước $F_{k+1} = F_k + F_{k-1}$ dùng **hai** giá trị trước ($F_k$ và $F_{k-1}$), không chỉ giá trị liền trước. Giả thuyết yếu chỉ cho ta $F_k \le 2^k$ — thiếu thông tin về $F_{k-1}$. Phải dùng quy nạp mạnh (giả sử đúng cho mọi $\le k$).

**② Hai cơ sở** (vì bước cần lùi 2 bước, phải "mồi" 2 quân đầu):
- $n=1$: $F_1 = 1 \le 2^1 = 2$ ✓.
- $n=2$: $F_2 = 1 \le 2^2 = 4$ ✓.

**③ Giả thuyết (mạnh)**: giả sử $F_m \le 2^m$ đúng với **mọi** $1 \le m \le k$ (với $k \ge 2$).

**④ Bước quy nạp**: CM $F_{k+1} \le 2^{k+1}$.

$$\begin{aligned}
F_{k+1} &= F_k + F_{k-1} &&\text{(định nghĩa dãy)} \\
&\le 2^k + 2^{k-1} &&\text{(giả thuyết cho } m=k \text{ và } m=k-1\text{)} \\
&= 2^{k-1}(2 + 1) = 3\cdot 2^{k-1} \\
&\le 4\cdot 2^{k-1} = 2^2\cdot 2^{k-1} = 2^{k+1} \quad\checkmark
\end{aligned}$$

Vậy $F_n \le 2^n$ với mọi $n \ge 1$. □

🔢 **Kiểm số**: $F_3 = 2 \le 8$; $F_4 = 3 \le 16$; $F_5 = 5 \le 32$; $F_6 = 8 \le 64$ ✓.

### Ví dụ 3 — Bài "đổi tiền/tem" (Postage stamp): mọi số tiền $\ge 8$ trả được bằng đồng 3 và 5

**① $P(n)$**: với $n \ge 8$, số tiền $n$ trả được bằng các đồng mệnh giá 3 và 5 (không cần thối).

**② Ba cơ sở** (để bước lùi 3 đơn vị có chỗ tựa):
- $8 = 3 + 5$ ✓; $\quad 9 = 3 + 3 + 3$ ✓; $\quad 10 = 5 + 5$ ✓.

**③ Giả thuyết (mạnh)**: giả sử trả được mọi $m$ với $8 \le m \le k$ (với $k \ge 10$).

**④ Bước quy nạp**: trả $k+1$. Vì $k+1 \ge 11$ nên $(k+1) - 3 = k - 2 \ge 8$, tức $k-2$ nằm trong khoảng giả thuyết → trả được $k-2$. Thêm **một đồng 3** vào cách trả $k-2$ → trả được $k+1 = (k-2) + 3$. ✓ □

🔢 **Kiểm số**: $11 = 8 + 3 = (3+5)+3$; $12 = 9+3$; $13 = 10+3$ ✓ — luôn lùi về $-3$ rồi cộng một đồng 3.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào BẮT BUỘC dùng quy nạp mạnh thay vì yếu?"* Khi bước k+1 cần $\ge 2$ bước trước, hoặc 1 bước **không liền kề**. Vd phân tích thừa số: $k+1 = a\cdot b$ với $a, b < k+1$ nhưng KHÔNG nhất thiết bằng k → cần giả thuyết cho mọi giá trị $\le k$, không chỉ $P(k)$.
- *"Quy nạp mạnh có 'mạnh hơn' thật không?"* Về sức biểu đạt thì **tương đương** quy nạp yếu (chứng minh được lẫn nhau), nhưng quy nạp mạnh tiện hơn cho các bài đệ quy phân nhánh. Lý do tương đương: áp quy nạp yếu cho mệnh đề phụ $Q(n) = $ "$P(n_0) \land \dots \land P(n)$ đều đúng" thì $Q$ chính là phiên bản mạnh của $P$ — chứng minh $Q$ bằng quy nạp yếu cho lại quy nạp mạnh của $P$.
- *"Cần bao nhiêu cơ sở?"* Bằng số bước mà công thức đệ quy "nhìn lùi". Fibonacci lùi 2 ($F_{n-1}, F_{n-2}$) → cần **2 cơ sở**; bài tem lùi 3 (cộng đồng 3 cho $k-2$, mà $k-2 \ge 8$ chỉ chắc khi đã phủ $8,9,10$) → cần **3 cơ sở**. Quy tắc: đủ cơ sở để mọi lần "lùi" trong bước quy nạp đều rơi vào vùng đã được phủ.
- *"Quy nạp mạnh có liên hệ gì với well-ordering (mục 1)?"* Có — cả ba (quy nạp yếu, quy nạp mạnh, well-ordering) **tương đương logic**. Chứng minh phân tích thừa số nguyên tố cũng làm được bằng well-ordering: nếu có số $\ge 2$ không phân tích được, lấy số nhỏ nhất như vậy → nó là hợp số $= a\cdot b$ với $a,b$ nhỏ hơn → $a, b$ phân tích được → mâu thuẫn.

⚠ **Lỗi thường gặp**: dùng quy nạp yếu cho bài cần nhiều bước trước. Phản ví dụ: CM số Fibonacci $F_n \le 2^n$ — bước $F_{k+1} = F_k + F_{k-1}$ cần CẢ $P(k)$ và $P(k-1)$. Chỉ giả sử $P(k)$ (quy nạp yếu) là **thiếu** → phải dùng quy nạp mạnh (và cần 2 cơ sở: n=1 và n=2).

🔁 **Dừng lại tự kiểm tra**

1. Vì sao chứng minh "mọi $n \ge 2$ phân tích được thành tích nguyên tố" cần quy nạp mạnh?
2. Quy nạp mạnh cần mấy bước cơ sở cho bài Fibonacci $F_n \le 2^n$?
3. Bài "đổi tiền 3 & 5 cho mọi $n \ge 8$" cần mấy cơ sở, vì sao?

<details><summary>Đáp án</summary>

1. Vì $k+1 = a\cdot b$ với a, b bất kỳ trong $[2, k]$ — cần giả thuyết đúng cho **mọi** $m \le k$, không riêng k.
2. Hai cơ sở: $F_1 = 1 \le 2$ và $F_2 = 1 \le 4$ (vì bước dùng cả 2 giá trị trước).
3. Ba cơ sở ($8, 9, 10$): bước quy nạp lùi 3 đơn vị ($k+1 = (k-2)+3$); để $k-2 \ge 8$ chắc chắn nằm trong vùng đã phủ, cần phủ sẵn $8,9,10$.

</details>

### 📝 Tóm tắt mục 6

- Quy nạp mạnh giả sử P đúng cho **mọi** giá trị từ $n_0$ tới k.
- Dùng khi P(k+1) cần nhiều bước trước (đệ quy phân nhánh, Fibonacci, phân tích thừa số).
- Tương đương sức mạnh với quy nạp yếu, nhưng tiện hơn; có thể cần nhiều cơ sở.

---

## 7. Lỗi thường gặp

### ⚠ Lỗi 1: Quên cơ sở

Nếu chỉ chứng minh bước quy nạp mà không cơ sở, mệnh đề có thể sai!

**Ví dụ sai**: "Mọi số tự nhiên = 1." Giả sử k = 1, k+1 = ... ?  → Cơ sở $0 = 1$ đã sai → không thể bắt đầu.

**Ví dụ "bước đúng nhưng cơ sở sai" — nguy hiểm hơn**: mệnh đề $P(n)$: "$1 + 2 + \dots + n = \frac{n(n+1)}{2} + 100$" (cố tình cộng dư 100). **Bước quy nạp vẫn chạy trơn tru**: giả sử $S_k = \frac{k(k+1)}{2} + 100$, thì $S_{k+1} = S_k + (k+1) = \frac{k(k+1)}{2} + 100 + (k+1) = \frac{(k+1)(k+2)}{2} + 100$ — đúng dạng $P(k+1)$! Nhưng cơ sở $n=1$: VT $=1$, VP $= 1 + 100 = 101$ — **sai**. Domino dây chuyền hoàn hảo nhưng không ai đẩy quân đầu → cả mệnh đề sai. Bài học: **bước quy nạp đúng KHÔNG cứu được cơ sở sai.**

### ⚠ Lỗi 2: "Tất cả ngựa đều cùng màu" (bài toán nổi tiếng)

Mệnh đề (sai) cần "chứng minh": **"Mọi tập gồm $n$ con ngựa đều cùng màu."**

- **Cơ sở n=1**: 1 con ngựa hiển nhiên cùng màu với chính nó ✓.
- **Bước quy nạp (lươn lẹo)**: giả sử mọi tập $k$ con ngựa cùng màu. Xét tập $k+1$ con $\{h_1, h_2, \dots, h_{k+1}\}$.

```
   Tập k+1 con:  h₁ h₂ h₃ ... hₖ hₖ₊₁

   Bỏ con cuối:  [h₁ h₂ ... hₖ]            ← k con ⟹ cùng màu A
   Bỏ con đầu:      [h₂ ... hₖ hₖ₊₁]       ← k con ⟹ cùng màu A
                     └──────┬──────┘
              GIAO (h₂..hₖ) chung cả 2 nhóm ⟹ "nối" màu ⟹ cả k+1 cùng màu A
```

- **Lỗi nằm ở đâu?** Lập luận "hai nhóm con giao nhau ở $h_2, \dots, h_k$ nên cùng màu" chỉ đúng khi phần giao **khác rỗng**, tức cần $k - 1 \ge 1 \Leftrightarrow k \ge 2$. Nhưng dây chuyền bắt đầu từ cơ sở $n=1$, nên mắt xích **đầu tiên** là $k=1 \to k=2$: lúc đó "bỏ con cuối" còn $\{h_1\}$, "bỏ con đầu" còn $\{h_2\}$ — **giao rỗng**, không có con chung để "nối màu". Bước $1 \to 2$ **đứt** → dây chuyền không bao giờ khởi động được, dù mọi bước $k \to k+1$ với $k \ge 2$ đều đúng.

⟶ Bài học: **Kiểm tra bước quy nạp với k nhỏ nhất** ($k = n_0$). Một bước quy nạp "đúng cho k lớn" mà hỏng tại $k = n_0$ thì vô dụng — domino thứ hai không bao giờ đổ.

### ⚠ Lỗi 3: Bước quy nạp ngầm giả định điều cần chứng minh (circular)

Đôi khi người viết "chứng minh $P(k+1)$" bằng cách biến đổi từ $P(k+1)$ xuống một đẳng thức đúng, nhưng **mỗi bước không phải tương đương hai chiều** → thực ra đang giả định $P(k+1)$. Ví dụ với bất đẳng thức, viết "$2^{k+1} > k+1 \Leftrightarrow 2\cdot 2^k > k+1 \Leftrightarrow \dots$ (đúng)" mà không kiểm chiều ngược lại. **Cách an toàn**: luôn **xuất phát từ một vế đã biết** (vế trái của $P(k+1)$) và biến đổi *tiến tới* kết luận, dùng giả thuyết ở giữa — không bao giờ xuất phát từ điều cần chứng minh.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Làm sao biết bước quy nạp 'lươn lẹo'?"* Kiểm tra nó tại **k nhỏ nhất** (thường $k = n_0$). Bài "ngựa cùng màu" sập vì khi k=1, lập luận "lấy ra 1 con, 2 nhóm con giao nhau" không còn giao → bước k→k+1 sai tại k=1.
- *"Kiểm vài giá trị đầu đúng có đủ kết luận không?"* **Không bao giờ đủ**. Xem mệnh đề $n^2+n+41$: đúng từ n=0 tới 39 nhưng sai tại n=40. Quan sát $\neq$ chứng minh.

🔁 **Dừng lại tự kiểm tra**

1. "Chứng minh" mọi nhóm n người có cùng chiều cao sai ở bước nào?
2. $n^2 + n + 41$ nguyên tố với n = 0,1,2 — kết luận "đúng mọi n" sai vì sao?

<details><summary>Đáp án</summary>

1. Giống "ngựa cùng màu": bước k→k+1 cần 2 nhóm con giao nhau, nhưng tại k=1 chúng không giao → đứt dây chuyền.
2. Chỉ kiểm vài giá trị, không phải quy nạp. Thực tế sai tại n=40: $40^2+40+41 = 1681 = 41^2$.

</details>

### 📝 Tóm tắt mục 7

- Quên cơ sở → toàn bộ sụp (dù bước quy nạp đúng); "tổng $+100$" minh họa bước đúng-cơ-sở-sai.
- Bước k→k+1 phải đúng cả tại **k nhỏ nhất** (bẫy "ngựa cùng màu": giao rỗng tại $k=1$).
- Không xuất phát từ điều cần chứng minh (lập luận vòng/ngược) — biến đổi từ vế đã biết.
- Kiểm vài giá trị KHÔNG thay được chứng minh (phản ví dụ $n^2+n+41$).

---

## 8. Biến thể quy nạp & liên hệ với lập trình

### 8.1. Vài biến thể của quy nạp

| Biến thể | Cơ sở | Bước | Khi nào |
|----------|-------|------|---------|
| Quy nạp **yếu** | $P(n_0)$ | $P(k)\implies P(k+1)$ | tổng, chia hết, bđt một-bước |
| Quy nạp **mạnh** | một hoặc nhiều | $P(n_0)\land\dots\land P(k) \implies P(k+1)$ | đệ quy nhiều bước, phân tích |
| Quy nạp **lùi 2** | $P(n_0), P(n_0+1)$ | $P(k-1)\land P(k)\implies P(k+1)$ | dãy bậc 2 (Fibonacci) |
| **Bước nhảy $d$** | $P(n_0),\dots,P(n_0+d-1)$ | $P(k)\implies P(k+d)$ | chứng minh riêng chẵn/lẻ |
| **Well-ordering** | — | lấy phản ví dụ nhỏ nhất → mâu thuẫn | khi "phần tử nhỏ nhất" tự nhiên hơn |

💡 **Quy nạp = đệ quy (recursion) lật ngược**. Một hàm đệ quy đúng đắn có cùng hai mảnh với chứng minh quy nạp:
- **base case** của hàm ↔ **bước cơ sở**;
- **lời gọi đệ quy trên dữ liệu nhỏ hơn** ↔ **giả thuyết quy nạp** (giả định nó đã đúng).

```go
// Tính tổng 1+2+...+n bằng đệ quy.
func sum(n int) int {
    if n == 0 {        // base case  ↔ bước cơ sở P(0)
        return 0
    }
    return n + sum(n-1) // tin sum(n-1) đúng ↔ giả thuyết P(k)
}
// Chứng minh sum(n) = n(n+1)/2 ĐÚNG = chứng minh quy nạp cho hàm này.
```

Chứng minh thuật toán đệ quy chạy đúng (merge sort, tháp Hà Nội, duyệt cây) gần như luôn là **một chứng minh quy nạp** trên kích thước dữ liệu — đây là lý do quy nạp là công cụ nền của khoa học máy tính, không chỉ của toán thuần.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Bước nhảy $d$ là gì, khi nào cần?"* Khi mệnh đề tiến theo bước lớn hơn 1. Vd CM "$n^2$ và $n$ cùng tính chẵn lẻ" có thể tiện hơn nếu xử lý riêng số chẵn ($n=2m$) và lẻ. Tổng quát: nếu bước quy nạp tự nhiên là $P(k)\implies P(k+d)$ thì cần $d$ cơ sở liên tiếp để phủ mọi lớp đồng dư.
- *"Vì sao đệ quy không gây vòng lặp vô hạn nếu tin 'nó đã đúng'?"* Vì mỗi lời gọi giảm kích thước (n → n−1), tiến về base case sau hữu hạn bước — đúng như domino đạt mọi quân sau hữu hạn cú đẩy.

### 📝 Tóm tắt mục 8

- Nhiều biến thể quy nạp (yếu, mạnh, lùi-2, bước-nhảy-$d$, well-ordering) — chọn theo cách mệnh đề "tiến".
- Quy nạp ↔ đệ quy: base case ↔ cơ sở; lời gọi nhỏ hơn ↔ giả thuyết.
- Chứng minh tính đúng của thuật toán đệ quy ≈ một chứng minh quy nạp.

---

## 9. Bài tập

### Bài tập

**Bài 1**: CM $1^2 + 2^2 + \dots + n^2 = \frac{n(n+1)(2n+1)}{6}$.

**Bài 2**: CM $3 \mid (n^3 - n)$ với mọi $n \ge 0$.

**Bài 3**: CM dãy Fibonacci $F_n \le 2^n$.

**Bài 4**: CM $1 + 2 + 4 + \dots + 2^n = 2^{n+1} - 1$.

**Bài 5**: Sai ở đâu trong "chứng minh" sau? Mệnh đề: $n^2 + n + 41$ là số nguyên tố $\forall n \ge 0$. Cơ sở n=0: 41 nguyên tố ✓. n=1: 43 ✓. n=2: 47 ✓. ... → "Đúng $\forall n$".

**Bài 6**: CM $\sum_{i=1}^{n} i^3 = \left(\frac{n(n+1)}{2}\right)^2$ (tổng lập phương = bình phương của tổng).

**Bài 7**: CM $6 \mid (n^3 + 5n)$ với mọi $n \ge 0$ (bằng quy nạp).

**Bài 8**: CM $n! > 2^n$ với mọi $n \ge 4$. (Xác định $n_0$ trước.)

**Bài 9**: Tìm lỗi trong "chứng minh" sau. Mệnh đề: "Mọi $n \ge 1$ số tự nhiên dương đều bằng nhau." Bước quy nạp mạnh: với hai số $a, b \le k+1$, đặt $\max(a,b) = k+1$; thì $a-1, b-1 \le k$ nên theo giả thuyết $a-1 = b-1$, suy ra $a = b$. → mâu thuẫn rõ ràng, sai ở đâu?

### Lời giải

**Bài 1**: Cơ sở n=1: $1 = 1\cdot 2\cdot 3/6 = 1$ ✓.  
Bước: giả sử $\sum_{i=1}^k i^2 = \frac{k(k+1)(2k+1)}{6}$. CM $\sum_{i=1}^{k+1} i^2 = \frac{(k+1)(k+2)(2k+3)}{6}$.  
$\text{LHS} = \frac{k(k+1)(2k+1)}{6} + (k+1)^2 = (k+1)\left[\frac{k(2k+1)}{6} + (k+1)\right] = (k+1)\cdot\frac{2k^2+k+6k+6}{6} = (k+1)\cdot\frac{2k^2+7k+6}{6} = \frac{(k+1)(k+2)(2k+3)}{6}$ ✓.

**Bài 2** (chi tiết, hai cách):
- *Cách đại số (không quy nạp)*: $n^3 - n = n(n^2-1) = n(n-1)(n+1) = (n-1)\,n\,(n+1)$ — tích 3 số nguyên liên tiếp; trong 3 số liên tiếp luôn có đúng một số chia hết 3 → tích chia hết 3.
- *Cách quy nạp* (theo đúng 4 bước): ① $P(n): 3 \mid (n^3 - n)$, $n \ge 0$. ② Cơ sở $n=0$: $0^3 - 0 = 0 = 3\cdot 0$ ✓. ③ Giả sử $3 \mid (k^3 - k)$. ④ Xét $(k+1)^3 - (k+1) = (k^3 + 3k^2 + 3k + 1) - (k+1) = (k^3 - k) + 3(k^2 + k)$. Hạng đầu chia hết 3 (giả thuyết), hạng sau $3(k^2+k)$ hiển nhiên chia hết 3 → tổng chia hết 3 ✓. □

**Bài 3** (quy nạp mạnh, ghi rõ 2 cơ sở): Cơ sở $F_1 = 1 \le 2^1 = 2$ ✓ và $F_2 = 1 \le 2^2 = 4$ ✓. Giả thuyết mạnh: $F_m \le 2^m$ với mọi $m \le k$. Bước: $F_{k+1} = F_k + F_{k-1} \le 2^k + 2^{k-1} = 2^{k-1}(2+1) = 3\cdot 2^{k-1} \le 4\cdot 2^{k-1} = 2^{k+1}$. □ (Phải dùng cả $F_k$ và $F_{k-1}$ nên cần quy nạp mạnh + 2 cơ sở.)

**Bài 4**: ① $P(n): 1 + 2 + 4 + \dots + 2^n = 2^{n+1} - 1$, $n \ge 0$. ② Cơ sở n=0: VT $= 2^0 = 1$; VP $= 2^1 - 1 = 1$ ✓. ③ Giả sử tổng $= 2^{k+1}-1$. ④ Thêm $2^{k+1}$: $\big(2^{k+1}-1\big) + 2^{k+1} = 2\cdot 2^{k+1} - 1 = 2^{k+2} - 1$ ✓ — đúng dạng $P(k+1)$. □ Kiểm số $n=3$: $1+2+4+8 = 15 = 2^4 - 1$ ✓.

**Bài 5**: **Không** kiểm tra mọi n — chỉ kiểm tra vài giá trị không phải quy nạp! Ở đây thậm chí **không có bước quy nạp nào cả** ($P(k)\implies P(k+1)$ không hề được chứng minh — và thực ra không thể, vì mệnh đề sai). Thực tế n=40: $40^2+40+41 = 1681 = 41^2$. → KHÔNG nguyên tố. Mệnh đề sai. "Quan sát vài trường hợp" $\neq$ chứng minh.

**Bài 6**: ① $P(n): \sum_{i=1}^n i^3 = \left(\frac{n(n+1)}{2}\right)^2$. ② Cơ sở $n=1$: VT $=1$; VP $= (1)^2 = 1$ ✓. ③ Giả sử $\sum_{i=1}^k i^3 = \left(\frac{k(k+1)}{2}\right)^2$. ④:
$$\begin{aligned}
\sum_{i=1}^{k+1} i^3 &= \left(\tfrac{k(k+1)}{2}\right)^2 + (k+1)^3 &&\text{(giả thuyết)} \\
&= \frac{k^2(k+1)^2}{4} + (k+1)^3 \\
&= \frac{(k+1)^2\big[k^2 + 4(k+1)\big]}{4} &&\text{(rút } (k+1)^2\text{)} \\
&= \frac{(k+1)^2(k^2 + 4k + 4)}{4} = \frac{(k+1)^2(k+2)^2}{4} = \left(\frac{(k+1)(k+2)}{2}\right)^2 \;\checkmark
\end{aligned}$$
Kiểm số $n=3$: $1+8+27 = 36 = (6)^2 = \left(\frac{3\cdot4}{2}\right)^2$ ✓. □

**Bài 7**: ① $P(n): 6 \mid (n^3 + 5n)$. ② Cơ sở $n=0$: $0$ chia hết 6 ✓. ③ Giả sử $6 \mid (k^3 + 5k)$. ④: $(k+1)^3 + 5(k+1) = (k^3 + 3k^2 + 3k + 1) + (5k + 5) = (k^3 + 5k) + (3k^2 + 3k + 6)$. Hạng đầu chia hết 6 (giả thuyết). Hạng sau $= 3(k^2 + k) + 6 = 3\,k(k+1) + 6$; mà $k(k+1)$ là tích 2 số liên tiếp nên chẵn → $3\,k(k+1)$ chia hết 6, cộng 6 vẫn chia hết 6. Tổng chia hết 6 ✓. □ Kiểm số $n=2$: $8 + 10 = 18 = 6\cdot3$ ✓.

**Bài 8**: Xác định $n_0$: $n=1$ cho $1 > 2$ sai; $n=2$: $2 > 4$ sai; $n=3$: $6 > 8$ sai; $n=4$: $24 > 16$ ✓ → $n_0 = 4$. ① $P(n): n! > 2^n$, $n \ge 4$. ② Cơ sở $n=4$: $24 > 16$ ✓. ③ Giả sử $k! > 2^k$ với $k \ge 4$. ④: $(k+1)! = (k+1)\cdot k! > (k+1)\cdot 2^k$ (giả thuyết). Vì $k \ge 4 \Rightarrow k+1 \ge 5 > 2$, nên $(k+1)\cdot 2^k > 2\cdot 2^k = 2^{k+1}$. Vậy $(k+1)! > 2^{k+1}$ ✓. □

**Bài 9**: Lỗi nằm ở **bước cơ sở của quy nạp mạnh không đủ phủ**. Lập luận "$a-1 = b-1$ theo giả thuyết" yêu cầu $a-1, b-1 \ge 1$ (nằm trong vùng đã chứng minh). Nhưng tại mắt xích nhỏ nhất, $a$ hoặc $b$ có thể bằng $1$ → $a-1 = 0$ rơi ra ngoài "mọi số nguyên dương $\le k$". Cụ thể với $a=1, b=2$: ta tụt về $a-1 = 0, b-1 = 1$ — số $0$ không thuộc phạm vi mệnh đề, không được dùng giả thuyết → bước đứt ngay tại đầu. Giống bẫy "ngựa cùng màu": bước quy nạp hợp lệ cho $k$ lớn nhưng hỏng tại $k$ nhỏ nhất. (Mệnh đề tất nhiên sai: $1 \neq 2$.)

---

## 10. Bài tiếp theo

[Lesson 07 — Logic, tập hợp, ánh xạ](../lesson-07-logic-sets-maps/).

## 📝 Tổng kết

1. **Quy nạp** = domino: cơ sở $P(n_0)$ + bước $P(k) \implies P(k+1)$. Bộ khung 4 mảnh: phát biểu $P(n)$ → cơ sở → giả thuyết → bước (lộ ra $P(k)$ rồi thay).
2. **Vì sao hợp lệ**: quy nạp ⟺ well-ordering (mọi tập con $\ne\varnothing$ của $\mathbb{N}$ có phần tử nhỏ nhất); là tiên đề Peano định nghĩa $\mathbb{N}$.
3. **Ba khung mẫu**: đẳng thức (thay giả thuyết — tổng $n$, tổng $n^2$, tổng $n^3$); chia hết (tách bội cũ + phần hiển nhiên — $a^n-1$); bất đẳng thức (dùng giả thuyết để chặn — $2^n>n$, $n!>2^n$).
4. **Quy nạp mạnh**: giả sử $P(n_0)..P(k)$ cùng đúng. Dùng cho phân tích nguyên tố, Fibonacci ($F_n\le2^n$, 2 cơ sở), bài đổi tiền (3 cơ sở). Số cơ sở = số bước "lùi".
5. **Lỗi phổ biến**: quên cơ sở (bước đúng vẫn sụp — "tổng $+100$"); bước k→k+1 hỏng tại k nhỏ ("ngựa cùng màu" giao rỗng); lập luận vòng/ngược.
6. Kiểm tra vài giá trị **không** thay được chứng minh quy nạp ($n^2+n+41$ sai tại $n=40$).
7. **Quy nạp ↔ đệ quy**: base case ↔ cơ sở; lời gọi nhỏ hơn ↔ giả thuyết → nền tảng chứng minh thuật toán.
