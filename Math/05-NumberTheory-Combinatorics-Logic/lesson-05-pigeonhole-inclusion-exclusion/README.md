# Lesson 05 — Nguyên lý Dirichlet & Nguyên lý bù trừ

## Mục tiêu

- Hiểu **Nguyên lý Dirichlet (Pigeonhole)** — "đơn giản nhưng mạnh mẽ".
- **Nguyên lý bù trừ (Inclusion-Exclusion)** cho hợp 2, 3, n tập.
- Áp dụng đếm trong các bài toán phức tạp.

## Kiến thức tiền đề

- [Lesson 03 — Tổ hợp](../lesson-03-permutations-combinations/).

---

## 1. Nguyên lý Dirichlet (Pigeonhole Principle)

💡 **Trực giác (hình ảnh chim bồ câu — "không thể tránh đụng")**: Có 10 chuồng và 11 con chim đậu vào. Bạn **cố gắng tránh** cho 2 con chung chuồng: nhét tối đa 1 con/chuồng. Nhưng 10 chuồng chỉ "hấp thụ" được 10 con — đến con thứ 11 thì **không còn chuồng trống**, buộc phải vào một chuồng đã có con. Đụng độ là **không thể tránh khỏi**, bất kể bạn xếp khéo thế nào.

```
   10 chuồng, mỗi chuồng cố nhét 1 con:
   [🕊]  [🕊]  [🕊]  [🕊]  [🕊]  [🕊]  [🕊]  [🕊]  [🕊]  [🕊]
    1    2    3    4    5    6    7    8    9    10

   Con thứ 11 (🕊?) — hết chuồng trống → buộc vào 1 chuồng đã đầy:
   [🕊🕊] ←── con thứ 11 chui vào đây (hoặc bất kỳ chuồng nào)
```

Cốt lõi: **đếm so sánh**. Nếu mỗi chuồng "chịu" tối đa 1 con thì sức chứa tối đa $= 10 < 11$. Mâu thuẫn → phải có chuồng $\ge 2$ con. Đây là toàn bộ "phép màu" của Dirichlet: một lập luận đếm cực ngắn nhưng kết luận **chắc chắn**.

### Phát biểu hình thức

**Dạng cơ bản**: Đặt $n+1$ vật vào $n$ hộp → ít nhất 1 hộp có $\ge 2$ vật.

**Dạng tổng quát**: Đặt $N$ vật vào $k$ hộp → ít nhất 1 hộp có $\ge \lceil N/k \rceil$ vật.

> 🔍 **Chứng minh dạng tổng quát — TỪNG BƯỚC** (phản chứng, không "dễ thấy")
>
> **Mệnh đề**: Đặt $N$ vật vào $k$ hộp → tồn tại hộp chứa $\ge \lceil N/k \rceil$ vật.
>
> **Bước 1 — giả sử ngược lại**: Giả sử KHÔNG có hộp nào chứa $\ge \lceil N/k \rceil$ vật. Vậy mọi hộp chứa $\le \lceil N/k \rceil - 1$ vật.
>
> **Bước 2 — chặn trên tổng số vật**: Cộng sức chứa của cả $k$ hộp:
> $$\text{tổng vật} \le k \cdot \left(\left\lceil \tfrac{N}{k} \right\rceil - 1\right).$$
>
> **Bước 3 — đánh giá $\lceil N/k \rceil$**: Theo định nghĩa hàm trần, $\lceil N/k \rceil < \frac{N}{k} + 1$ (trần của một số nhỏ hơn chính số đó cộng 1). Do đó:
> $$\left\lceil \tfrac{N}{k} \right\rceil - 1 < \frac{N}{k}.$$
>
> **Bước 4 — ráp lại, ra mâu thuẫn**: Thay vào Bước 2:
> $$\text{tổng vật} \le k\left(\left\lceil \tfrac{N}{k}\right\rceil - 1\right) < k \cdot \frac{N}{k} = N.$$
> Tức tổng số vật $< N$. Nhưng ta có **đúng** $N$ vật → mâu thuẫn.
>
> **Bước 5 — kết luận**: Giả sử ở Bước 1 sai → phải tồn tại hộp chứa $\ge \lceil N/k \rceil$ vật. □
>
> **Verify bằng số**: $N = 30$, $k = 12$. Giả sử mọi hộp $\le \lceil 30/12 \rceil - 1 = 3 - 1 = 2$ vật → tổng $\le 12 \cdot 2 = 24 < 30$. Mâu thuẫn (cần 30) → có hộp $\ge 3$. ✓ Dạng cơ bản chỉ là trường hợp $N = n+1$, $k = n$: $\lceil (n+1)/n \rceil = 2$.

> 📐 **Định nghĩa đầy đủ — Nguyên lý Dirichlet**
>
> **(a) Là gì**: 1 phát biểu cực kỳ đơn giản: "không thể nhét nhiều vật hơn số hộp mà KHÔNG có 2 vật cùng hộp". Hình thức: hàm $f: A \to B$ với $|A| > |B|$ → $f$ không thể đơn ánh.
>
> **(b) Vì sao cần**: Tưởng quá hiển nhiên nhưng cực kỳ mạnh — dùng để chứng minh **sự tồn tại** mà không cần xây dựng. Ví dụ: 367 người, có ít nhất 2 trùng ngày sinh (366 ngày trong 1 năm). Trong 8 chữ số bất kỳ → có 2 số có hiệu chia hết cho 7. Trong 1 nhóm $n$ người → ít nhất 2 người có cùng số bạn bè. Nhiều định lý sâu (Erdős-Ko-Rado, Schur) dựa trên pigeonhole.
>
> **(c) Bốn ví dụ số đa dạng**:
> 1. **Sinh viên/tháng**: 30 sinh viên, 12 tháng: $\lceil 30/12 \rceil = \lceil 2.5\rceil = $ **3** → ít nhất 3 cùng tháng.
> 2. **Điểm hình học**: 5 điểm trong tam giác đều cạnh 2 → ít nhất 2 điểm cách nhau $\le 1$ (chia tam giác thành 4 tam giác con cạnh 1; 5 điểm vào 4 hộp → 2 điểm cùng tam giác con, mà 2 điểm trong tam giác cạnh 1 cách nhau $\le 1$).
> 3. **Bội nhau**: 100 số nguyên dương $\le 200$ (chọn bất kỳ) → có 2 số mà số này là bội số kia (chia thành 100 "hộp" theo phần lẻ: mỗi số viết $2^a \cdot m$ với $m$ lẻ, $m \in \{1,3,\dots,199\}$ có đúng 100 giá trị; 101 số → 2 số cùng $m$ → số nhỏ chia hết số lớn).
> 4. **Số dư**: trong 13 số nguyên bất kỳ, 2 số có cùng số dư khi chia 12 ($\lceil 13/12\rceil = 2$). Tổng quát: trong $m+1$ số → 2 số cùng dư $\bmod m$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Dirichlet chỉ nói 'có ít nhất 1 hộp trùng' — nó cho biết HỘP NÀO không?"* **Không**. Đây là sức mạnh và giới hạn: chứng minh **sự tồn tại** mà không chỉ ra cụ thể. Biết "chắc chắn có 2 người cùng tháng sinh" nhưng không biết là tháng nào, cũng không biết là 2 người nào. Loại chứng minh này gọi là **non-constructive** (không xây dựng).
- *"Bài khó thì 'hộp' là gì?"* Mấu chốt là **thiết kế hộp khéo**. Vd "2 số có hiệu chia hết 7": hộp = số dư $\bmod 7$ (7 hộp); 8 số → 2 cùng dư → hiệu chia hết 7. Quy luật chung: muốn kết luận "có 2 vật cùng tính chất P", hãy lấy **hộp = các lớp tương đương theo P**, rồi đếm xem có nhiều vật hơn số hộp không.
- *"Tại sao đúng $n+1$ vật mới chắc chắn, $n$ thì chưa?"* Với đúng $n$ vật và $n$ hộp, hoàn toàn có thể xếp 1 vật/hộp — KHÔNG đụng độ. Chỉ từ vật thứ $n+1$ trở đi mới buộc trùng (xem ⚠ bên dưới).

⚠ **Lỗi 1 — quên làm tròn LÊN (trần ⌈⌉)**. Công thức là $\lceil N/k \rceil$, KHÔNG phải $N/k$ rồi làm tròn xuống. Phản ví dụ: 30 sinh viên, 12 tháng → $\lceil 30/12 \rceil = \lceil 2.5 \rceil = 3$, KHÔNG phải 2. Có ít nhất 3 người cùng tháng (nếu chỉ 2/tháng thì tối đa $24 < 30$ người).

⚠ **Lỗi 2 — cần $n+1$ vật, KHÔNG phải $n$**. Để chắc chắn có hộp $\ge 2$ vật khi có $n$ hộp, cần **$n+1$** vật chứ không phải $n$. Phản ví dụ: 366 ngày + đúng 366 người → có thể (về lý thuyết) mỗi người một ngày, **không** chắc trùng. Phải **367** người mới chắc chắn 2 người trùng ngày sinh. Sai 1 đơn vị ở đây làm hỏng toàn bộ lập luận.

⚠ **Lỗi 3 — đếm "hộp" sai số lượng**. Số dư khi chia $m$ có **$m$** lớp ($0, 1, \dots, m-1$), không phải $m+1$ hay $m-1$. Vd chia cho 12 → 12 hộp (kể cả dư 0), nên cần 13 số mới chắc trùng dư. Đếm nhầm số hộp → ngưỡng $n+1$ sai theo.

🔁 **Dừng lại tự kiểm tra**

1. 100 người, 12 tháng. Ít nhất bao nhiêu người cùng tháng?
2. Chọn 5 số bất kỳ từ $\{1,\dots,8\}$. Vì sao chắc chắn có 2 số tổng bằng 9?

<details><summary>Đáp án</summary>

1. $\lceil 100/12 \rceil = \lceil 8.33 \rceil = 9$ người.
2. Hộp = cặp tổng 9: $\{1,8\},\{2,7\},\{3,6\},\{4,5\}$ (4 hộp). Chọn 5 số → 2 cùng 1 hộp → tổng 9.

</details>

### Một ví dụ "cao cấp" hơn — dãy con đơn điệu (Erdős–Szekeres rút gọn)

💡 **Bài toán**: Cho dãy gồm $n^2 + 1$ số thực **phân biệt** xếp thành hàng. Chứng minh luôn tồn tại một **dãy con tăng** dài $n+1$ hoặc một **dãy con giảm** dài $n+1$.

> 🔍 **Chứng minh — TỪNG BƯỚC** (pigeonhole với "hộp 2 chiều")
>
> **Bước 1 — gán nhãn**: với mỗi vị trí $i$, đặt $\text{tăng}_i$ = độ dài dãy con tăng **dài nhất kết thúc tại** $i$, và $\text{giảm}_i$ = độ dài dãy con giảm dài nhất kết thúc tại $i$. Mỗi vị trí có một cặp nhãn $(\text{tăng}_i, \text{giảm}_i)$.
>
> **Bước 2 — giả sử phản chứng**: giả sử KHÔNG có dãy tăng lẫn giảm dài $\ge n+1$. Vậy mọi $\text{tăng}_i \in \{1,\dots,n\}$ và mọi $\text{giảm}_i \in \{1,\dots,n\}$ → cặp nhãn nằm trong **hộp** = lưới $n \times n$ = $n^2$ hộp.
>
> **Bước 3 — pigeonhole**: có $n^2 + 1$ vị trí (vật) vào $n^2$ hộp (cặp nhãn) → 2 vị trí $i < j$ có **cùng cặp nhãn** $(\text{tăng}_i, \text{giảm}_i) = (\text{tăng}_j, \text{giảm}_j)$.
>
> **Bước 4 — mâu thuẫn**: vì các số phân biệt, hoặc $a_i < a_j$ (thì nối được dãy tăng dài hơn tại $j$ → $\text{tăng}_j \ge \text{tăng}_i + 1$, mâu thuẫn cùng nhãn), hoặc $a_i > a_j$ (tương tự $\text{giảm}_j \ge \text{giảm}_i + 1$). Cả hai đều mâu thuẫn Bước 3.
>
> **Bước 5**: vậy giả sử Bước 2 sai → tồn tại dãy tăng hoặc giảm dài $n+1$. □
>
> **Verify $n = 2$** ($n^2+1 = 5$ số): dãy $3,1,4,2,5$ — phải có dãy con tăng/giảm dài 3. Thật vậy $1,4,5$ là dãy tăng dài 3 ✓.

⟶ Đây là pigeonhole "tầng cao": **hộp là một cặp số** (lưới 2 chiều), không phải nhãn đơn. Cùng một nguyên lý đếm, nhưng thiết kế hộp tinh vi hơn hẳn các ví dụ tháng/màu.

### 📝 Tóm tắt mục 1

- Dirichlet: $N$ vật vào $k$ hộp → 1 hộp có $\ge \lceil N/k \rceil$ vật (nhớ làm tròn LÊN).
- Chứng minh **tồn tại** mà không chỉ ra cụ thể.
- Khó hay dễ tùy việc **thiết kế hộp** thông minh.

---

## 2. Ví dụ áp dụng Dirichlet

Mỗi ví dụ dưới đây theo cùng một khuôn 3 bước: **(1) định nghĩa "vật"; (2) định nghĩa "hộp" + đếm số hộp; (3) so sánh số vật với số hộp** rồi áp $\lceil N/k\rceil$.

### Ví dụ 1 — Sinh nhật (cùng tháng)

Trong 1 lớp 30 người, chứng minh có ít nhất 2 người sinh cùng tháng.
- **Vật** = 30 người. **Hộp** = 12 tháng. **Đếm**: $N = 30 > k = 12$.
- $\lceil 30/12 \rceil = \lceil 2.5\rceil = $ **3** → ít nhất **3** người cùng tháng (mạnh hơn yêu cầu "2 người"). □

### Ví dụ 2 — Tất màu (lấy trong bóng tối)

Một ngăn kéo có tất **3 màu** (đen, trắng, xám) lẫn lộn. Trong bóng tối, phải rút ít nhất bao nhiêu chiếc để **chắc chắn** có 1 đôi cùng màu?
- **Vật** = số chiếc rút ra. **Hộp** = 3 màu.
- Muốn 1 hộp có $\ge 2$ chiếc (= 1 đôi cùng màu), cần số vật $> $ số hộp, tức $> 3$.
- Rút **4** chiếc → $\lceil 4/3\rceil = 2$ → chắc chắn 2 chiếc cùng màu. Rút 3 chiếc thì **chưa chắc** (có thể mỗi màu 1 chiếc → ⚠ Lỗi 2: cần $n+1=4$, không phải 3). □
- Mở rộng: muốn chắc 1 đôi **mỗi** màu thì khác — đây chỉ là "ít nhất 1 đôi nào đó".

### Ví dụ 3 — Bắt tay (cùng số lần bắt tay)

Tại 1 buổi tiệc $n$ người, chứng minh ít nhất 2 người có cùng số người đã bắt tay.
- **Vật** = $n$ người. **Hộp** = số lần bắt tay khả dĩ.
- Số bắt tay của mỗi người $\in \{0, 1, \dots, n-1\}$ — nhìn thì có $n$ giá trị (= số hộp), CHƯA đủ để kết luận.
- **Mẹo loại 1 hộp**: $0$ và $n-1$ **không thể cùng xuất hiện** — nếu có người bắt tay 0 lần (không bắt tay ai) thì không ai có thể bắt tay đủ $n-1$ người (vì người kia không bắt tay họ), và ngược lại.
- → Số giá trị thực sự xảy ra $\le n-1$ (hộp), cho $n$ người (vật) → $n > n-1$ → Dirichlet → 2 người trùng. □

### Ví dụ 4 — Số dư (cùng dư khi chia)

Trong 13 số nguyên bất kỳ, ít nhất 2 số có cùng số dư khi chia 12.
- **Vật** = 13 số. **Hộp** = 12 lớp dư ($0, 1, \dots, 11$ — đúng 12 hộp, xem ⚠ Lỗi 3).
- $13 > 12$ → $\lceil 13/12 \rceil = 2$ → 2 số cùng dư → **hiệu của chúng chia hết cho 12**. □

⟶ Kỹ thuật "hộp = lớp đồng dư" này là hạt nhân của nhiều chứng minh số học, kể cả một hướng chứng minh Định lý nhỏ Fermat!

### Ví dụ 5 — Chọn $n+1$ số từ $\{1,\dots,2n\}$: luôn có 2 số coprime (thiết kế hộp khéo)

Chọn bất kỳ $n+1$ số từ $\{1, 2, \dots, 2n\}$. Chứng minh có 2 số **liên tiếp** (do đó coprime, vì $\gcd(k, k+1) = 1$).
- **Hộp khéo**: nhóm thành $n$ cặp liên tiếp $\{1,2\}, \{3,4\}, \dots, \{2n-1, 2n\}$ → đúng $n$ hộp.
- **Vật** = $n+1$ số chọn ra. $n+1 > n$ → Dirichlet → 2 số rơi vào cùng 1 cặp.
- 2 số trong cùng cặp $\{2j-1, 2j\}$ là liên tiếp → $\gcd = 1$ → coprime. □
- **Verify $n = 3$** ($\{1,\dots,6\}$, chọn 4 số): vd $\{2,4,5,6\}$ → 5 và 6 cùng cặp $\{5,6\}$, liên tiếp ✓. Không cách nào chọn 4 số mà tránh được mọi cặp (chỉ 3 cặp).

⟶ Đây là minh họa rõ nhất cho ý "bài khó = **thiết kế hộp**": hộp không phải lúc nào cũng hiển nhiên (tháng, màu, số dư) — đôi khi phải tự dựng (cặp liên tiếp).

🔁 **Dừng lại tự kiểm tra**

1. Trong 50 người, chắc chắn có ít nhất bao nhiêu người cùng tháng sinh?
2. Trong 8 số nguyên bất kỳ, vì sao có 2 số cùng số dư khi chia 7?
3. Chọn 6 số từ $\{1,\dots,10\}$. Vì sao chắc chắn có 2 số liên tiếp?

<details><summary>Đáp án</summary>

1. $\lceil 50/12 \rceil = \lceil 4.17 \rceil = 5$ người.
2. 7 lớp dư ($0..6$) là 7 hộp; 8 số → $\lceil 8/7 \rceil = 2$ → có 2 số cùng số dư.
3. Gom $\{1,\dots,10\}$ thành 5 cặp liên tiếp $\{1,2\},\dots,\{9,10\}$ (5 hộp); chọn 6 số $> 5$ → 2 số cùng cặp → liên tiếp.

</details>

❓ **Câu hỏi tự nhiên của người đọc — "367 người mới CHẮC trùng, vậy cần ít người hơn nhiều để 'thường' trùng?"**

Đây là chỗ Dirichlet (chắc chắn 100%) khác **nghịch lý ngày sinh** (xác suất). Dirichlet nói: cần **367** người để **chắc chắn** 2 người trùng ngày. Nhưng chỉ cần **23** người là xác suất có 2 người trùng ngày đã **> 50%** — bất ngờ vì 23 rất nhỏ so với 365.
- Lý do: số **cặp** người tăng nhanh, $\binom{23}{2} = 253$ cặp, mỗi cặp có cơ hội ~$1/365$ trùng.
- Xác suất **không ai trùng**: $\dfrac{365}{365}\cdot\dfrac{364}{365}\cdots\dfrac{343}{365} \approx 0.493$ → xác suất **có** trùng $\approx 0.507 > 50\%$.

⚠ **Đừng lẫn 2 phát biểu**: "chắc chắn" (pigeonhole, ngưỡng 367) ≠ "khả năng cao" (xác suất, ngưỡng ~23). Câu hỏi đề bài quyết định dùng cái nào.

### 📝 Tóm tắt mục 2

- Áp dụng Dirichlet = chọn đúng "vật" và "hộp"; bài khó phải **tự dựng hộp** (cặp liên tiếp ở Ví dụ 5).
- Bài bắt tay: loại $0$ và $n-1$ không cùng tồn tại → còn $n-1$ giá trị cho $n$ người → trùng.
- Phân biệt **Dirichlet** (chắc chắn, ngưỡng $n+1$) với **nghịch lý ngày sinh** (xác suất, ngưỡng ~23).
- Cùng số dư $\bmod m$ = "hộp theo lớp đồng dư".

---

## 3. Nguyên lý bù trừ (Inclusion-Exclusion)

💡 **Trực giác / Hình dung**: đếm số người trong 2 câu lạc bộ chồng nhau. Nếu cộng thẳng sĩ số 2 CLB, người ở **cả hai** bị đếm 2 lần → phải **trừ đi 1 lần** phần chung. Với 3 CLB: cộng đơn, trừ các giao đôi (đã trừ quá tay phần giao ba), nên cộng lại giao ba. Đó là "bù qua, trừ lại" — inclusion-exclusion.

### 3.1. Hai tập

$$|A \cup B| = |A| + |B| - |A \cap B|$$

💡 **Vì sao — đếm bằng Venn**: Cộng $|A| + |B|$ thì vùng giao $A\cap B$ bị đếm **2 lần** (1 lần trong $|A|$, 1 lần trong $|B|$). Trừ $|A\cap B|$ một lần để mỗi phần tử được đếm đúng 1 lần.

```
        ┌───────────────┐
        │   A           │
        │       ┌───────┼───────┐
        │ chỉ A │ A∩B   │ chỉ B │
        │       │ (đếm  │       │
        │       │ 2 lần)│       │
        └───────┼───────┘       │
                │       B       │
                └───────────────┘

  |A|+|B| = (chỉ A) + (A∩B) + (A∩B) + (chỉ B)   ← A∩B đếm 2 lần
  trừ |A∩B|:        (chỉ A) + (A∩B) + (chỉ B) = |A∪B|  ✓
```

**Walk-through — TỪNG BƯỚC (ví dụ 1)**: Lớp 30 người, 18 thích toán ($T$), 15 thích vật lý ($L$), 8 thích cả 2 ($T\cap L$). Bao nhiêu người thích ít nhất 1 môn?
- **B1** cộng đơn: $|T| + |L| = 18 + 15 = 33$ — nhưng $33 > 30$, vô lý → dấu hiệu đếm trùng.
- **B2** trừ giao: $33 - |T\cap L| = 33 - 8 = $ **25**.
- **B3** suy ra phần bù: không thích môn nào $= 30 - 25 = 5$.
- **Kiểm tra Venn**: chỉ Toán $= 18-8 = 10$; chỉ Lý $= 15-8 = 7$; cả hai $= 8$; tổng $= 10+7+8 = 25$ ✓.

**Ví dụ 2** (số học): bao nhiêu số trong $1..30$ chia hết cho 2 hoặc 3?
- $|A| = $ bội 2 $= \lfloor 30/2\rfloor = 15$; $|B| = $ bội 3 $= \lfloor 30/3\rfloor = 10$; $|A\cap B| = $ bội 6 $= \lfloor 30/6\rfloor = 5$.
- $|A\cup B| = 15 + 10 - 5 = $ **20**.

**Ví dụ 3** (ngôn ngữ): 60 người, 35 biết Anh, 25 biết Pháp, 10 biết cả hai.
- $|A\cup P| = 35 + 25 - 10 = $ **50**; không biết tiếng nào $= 60 - 50 = 10$.

### 3.2. Ba tập

$$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |B \cap C| - |A \cap C| + |A \cap B \cap C|$$

💡 **Quy luật**: Cộng đơn, trừ đôi, cộng ba, ...

**Venn 3 tập — 7 vùng**: Sơ đồ chia mặt phẳng thành 7 miền. Khóa hiểu: phần tử ở vùng trung tâm ($A\cap B\cap C$) bị "co kéo" qua các hệ số rồi mới cân bằng về đúng 1.

```
            ┌─────────────────────┐
            │  A                  │
            │      a   ┌──────────┼──────┐
            │          │   ab     │   b  │
            │   ┌──────┼──┐       │      │
            │   │  ac  │ abc      │  bc  │
            │   │      │  (giữa)  │      │
            └───┼──────┼──┘       │   B  │
                │      └──────────┼──────┘
                │   c      C      │
                └─────────────────┘

  a = chỉ A | b = chỉ B | c = chỉ C
  ab = A∩B (ngoài C) | bc = B∩C (ngoài A) | ac = A∩C (ngoài B)
  abc = A∩B∩C (trung tâm)
```

**Walk-through — TỪNG BƯỚC (ví dụ 1)**: 100 sinh viên, 40 học Toán, 30 Lý, 25 Hóa. 15 Toán+Lý, 10 Lý+Hóa, 12 Toán+Hóa, 5 cả 3. Số học ít nhất 1 môn?
- **B1** cộng đơn: $40+30+25 = 95$.
- **B2** trừ các giao đôi: $95 - (15+10+12) = 95 - 37 = 58$.
- **B3** cộng lại giao ba: $58 + 5 = $ **63**.
- $|A\cup B\cup C| = 40+30+25 - 15-10-12 + 5 = $ **63**.

**Ví dụ 2** (số học, 3 tập): bao nhiêu số trong $1..30$ chia hết cho 2, 3 hoặc 5?
- Đơn: bội 2 $=15$, bội 3 $=10$, bội 5 $=6$ → tổng $31$.
- Đôi: bội 6 $=5$, bội 10 $=3$, bội 15 $=2$ → tổng $10$.
- Ba: bội 30 $=1$.
- $= 31 - 10 + 1 = $ **22**.

**Ví dụ 3** (đời sống): 50 khách: 30 uống cà phê, 25 uống trà, 20 uống nước cam; 15 cà phê+trà, 10 trà+cam, 12 cà phê+cam, 7 cả ba. Số uống ít nhất 1 thứ?
- $= 30+25+20 - 15-10-12 + 7 = 75 - 37 + 7 = $ **45**; không uống gì $= 50 - 45 = 5$.

### 3.3. n tập (tổng quát)

$$|A_1 \cup \dots \cup A_n| = \sum |A_i| - \sum |A_i \cap A_j| + \sum |A_i \cap A_j \cap A_k| - \dots + (-1)^{n+1}|A_1 \cap \dots \cap A_n|$$

(Dấu xen kẽ +/-, theo kích thước tập giao.) Viết gọn:

$$\left|\bigcup_{i=1}^{n} A_i\right| = \sum_{\emptyset \neq S \subseteq \{1,\dots,n\}} (-1)^{|S|+1} \left|\bigcap_{i \in S} A_i\right|.$$

> 🔍 **Vì sao công thức đúng — đếm hệ số từng phần tử (TỪNG BƯỚC)**
>
> Cách kiểm tra "mỗi phần tử được đếm đúng 1 lần" cho phần tử $x$ thuộc **đúng $m$** trong các tập ($1 \le m \le n$):
>
> **Bước 1**: $x$ xuất hiện trong các giao **1 tập** chứa nó: có $\binom{m}{1}$ giao như vậy → đóng góp $+\binom{m}{1}$.
>
> **Bước 2**: $x$ xuất hiện trong các giao **2 tập** (đều chứa $x$): có $\binom{m}{2}$ → đóng góp $-\binom{m}{2}$.
>
> **Bước $k$**: giao $k$ tập chứa $x$: $\binom{m}{k}$ cái, dấu $(-1)^{k+1}$.
>
> **Tổng hệ số của $x$**:
> $$\binom{m}{1} - \binom{m}{2} + \binom{m}{3} - \dots = \sum_{k=1}^{m}(-1)^{k+1}\binom{m}{k}.$$
> Dùng khai triển nhị thức $(1-1)^m = \sum_{k=0}^{m}(-1)^k\binom{m}{k} = 0$. Tách số hạng $k=0$ ra: $\binom{m}{0} + \sum_{k=1}^{m}(-1)^k\binom{m}{k} = 0$, tức $\sum_{k=1}^{m}(-1)^k\binom{m}{k} = -\binom{m}{0} = -1$. Đổi dấu cả tổng:
> $$\sum_{k=1}^{m}(-1)^{k+1}\binom{m}{k} = 1.$$
>
> **Kết luận**: hệ số của mỗi $x$ (thuộc $\ge 1$ tập) đúng bằng **1** → vế phải đếm mỗi phần tử của hợp đúng 1 lần. □
>
> **Verify $m = 3$**: $\binom{3}{1} - \binom{3}{2} + \binom{3}{3} = 3 - 3 + 1 = 1$ ✓ (đây chính là lý do giao-ba phải CỘNG).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao giao ba lại CỘNG (+), không trừ?"* Phần tử thuộc cả A, B, C: được cộng 3 lần (qua $|A|,|B|,|C|$), rồi trừ 3 lần (qua 3 giao đôi $|A\cap B|,|B\cap C|,|A\cap C|$) → còn $3 - 3 = 0$ → bị "mất" hoàn toàn. Phải cộng lại 1 lần ($+|A\cap B\cap C|$) để nó được đếm đúng 1. Đây chính là $\binom{3}{1}-\binom{3}{2}+\binom{3}{3}=1$ ở trên.
- *"Dấu tổng quát theo quy luật nào?"* Giao của $k$ tập mang dấu $(-1)^{k+1}$: 1 tập (+), 2 tập (−), 3 tập (+), 4 tập (−)... — dấu **dương** khi $k$ lẻ, **âm** khi $k$ chẵn.
- *"Có bao nhiêu số hạng cho $n$ tập?"* Tổng cộng $2^n - 1$ số hạng (mọi tập con khác rỗng của $\{1,\dots,n\}$). Vd $n=3$: $2^3-1 = 7$ số hạng (3 đơn + 3 đôi + 1 ba) ✓.

⚠ **Lỗi 1 — quên trừ phần giao, đếm trùng**. Phản ví dụ: lớp có 18 thích toán + 15 thích lý, nếu cộng $18+15 = 33$ thì SAI (lớp chỉ 30 người!). Phần "thích cả 2" (8 người) bị đếm 2 lần → đáp án đúng $33 - 8 = 25$.

⚠ **Lỗi 2 — quên CỘNG LẠI giao ba (với 3 tập)**. Nhiều người dừng ở "cộng đơn − trừ đôi" và ra $95 - 37 = 58$ (ví dụ 100 sinh viên), quên $+5$. Hậu quả: phần tử thuộc cả 3 tập bị trừ về 0, **bị bỏ sót**. Luôn nhớ số hạng cuối $+|A\cap B\cap C|$ → đáp án đúng $58 + 5 = 63$.

⚠ **Lỗi 3 — nhầm "đúng $k$ tập" với "ít nhất $k$ tập"**. Trong dữ liệu bài toán, "$|A\cap B| = 15$" thường nghĩa là **ít nhất** A và B (có thể kể cả C). Nếu đề cho "đúng 2 môn" thì phải quy đổi: số học **đúng** Toán+Lý $= |T\cap L| - |T\cap L\cap H| = 15 - 5 = 10$. Đọc kỹ "ít nhất" hay "đúng".

🔁 **Dừng lại tự kiểm tra**

1. 60 người: 35 biết tiếng Anh, 25 biết tiếng Pháp, 10 biết cả hai. Bao nhiêu người biết ít nhất 1 thứ tiếng? Không biết thứ nào?
2. Số từ 1–30 chia hết cho 2 hoặc 3?

<details><summary>Đáp án</summary>

1. $35+25-10 = 50$ biết ít nhất 1; $60-50 = 10$ không biết gì.
2. Bội 2: 15. Bội 3: 10. Bội 6: 5. → $15+10-5 = 20$.

</details>

### 3.4. Kỹ thuật phần bù — đếm "tránh tất cả" và "có đủ tất cả"

💡 **Trực giác**: Bù trừ thường dễ tính cho **hợp** ($|A_1\cup\dots|$ = "thuộc ít nhất 1"). Hai bài toán hay gặp được quy về hợp qua **phần bù**:
- "Số phần tử **tránh mọi** $A_i$" $= (\text{tổng}) - |A_1\cup\dots\cup A_n|$. (Derangement là ví dụ: tránh mọi "thư đúng phong bì".)
- "Số cách dùng **đủ cả** $r$ ký tự" (toàn ánh) $= $ tổng − (hợp các trường hợp **thiếu** ít nhất 1 ký tự).

**Walk-through — số toàn ánh (surjection)**: Có bao nhiêu cách gán 4 món quà **khác nhau** cho 3 người sao cho **ai cũng có ít nhất 1 món**?
- **Tổng** (không ràng buộc): mỗi món chọn 1 trong 3 người $= 3^4 = 81$.
- $A_i$ = "người $i$ KHÔNG nhận món nào". $|A_i| = 2^4 = 16$ (4 món chỉ chia 2 người còn lại); có 3 cách chọn $i$.
- $|A_i\cap A_j| = 1^4 = 1$ (4 món dồn cho 1 người); có $\binom{3}{2}=3$ cặp.
- $|A_1\cap A_2\cap A_3| = 0^4 = 0$.
- Số cách **thiếu ít nhất 1 người** $= 3\cdot16 - 3\cdot1 + 0 = 45$.
- Số toàn ánh $= 81 - 45 = $ **36**. (Khớp công thức $\sum_{k=0}^{3}(-1)^k\binom{3}{k}(3-k)^4 = 81 - 48 + 3 - 0 = 36$.)

⚠ **Lỗi 4 — quên rằng "phần bù" cũng cần bù trừ**. Khi đếm "thiếu ít nhất 1 người", các sự kiện $A_i$ **chồng nhau** (thiếu người 1 và thiếu người 2 có thể cùng xảy ra) → phải áp I-E cho chúng, không cộng thẳng $3\cdot16 = 48$ (sẽ đếm trùng phần "thiếu 2 người").

🔁 **Dừng lại tự kiểm tra**

1. Có bao nhiêu cách gán 3 món quà khác nhau cho 2 người sao cho ai cũng có ít nhất 1 món?
2. Có bao nhiêu số trong $1..20$ KHÔNG chia hết cho cả 2 lẫn 3 (tránh cả hai)?

<details><summary>Đáp án</summary>

1. Tổng $2^3 = 8$; thiếu người $i$: $1^3 = 1$, có 2 người → $2\cdot1 = 2$ (giao 2 người $= 0^3 = 0$). Toàn ánh $= 8 - 2 = $ **6**.
2. Tổng 20; bội 2 $=10$, bội 3 $=6$, bội 6 $=3$ → $|A\cup B| = 10+6-3 = 13$; tránh cả hai $= 20 - 13 = $ **7**.

</details>

### 📝 Tóm tắt mục 3

- 2 tập: $|A \cup B| = |A|+|B|-|A \cap B|$ (vùng giao đếm 2 lần → trừ 1).
- 3 tập: cộng đơn, trừ đôi, **cộng ba** (giao ba bị trừ về 0 → phải cộng lại).
- n tập: dấu $(-1)^{k+1}$ theo số tập giao; tổng $2^n-1$ số hạng. Mỗi phần tử đếm đúng 1 lần vì $\sum_{k\ge1}(-1)^{k+1}\binom{m}{k}=1$.
- 3 lỗi: quên trừ giao đôi (đếm trùng), quên cộng giao ba (bỏ sót), nhầm "đúng $k$ tập" vs "ít nhất $k$ tập".

---

## 4. Áp dụng — Hàm Euler φ(n) bằng bù trừ

Đếm số nguyên $1 \le k \le n$ và coprime với $n$.

**Walk-through — $n = p \cdot q$ (2 nguyên tố khác nhau), TỪNG BƯỚC**. Đặt $A$ = "bội của $p$", $B$ = "bội của $q$" trong $\{1,\dots,n\}$. Số coprime với $n$ = số KHÔNG thuộc $A$ cũng không $B$ = $n - |A\cup B|$.
- **B1** tổng tất cả: $n$.
- **B2** loại bội $p$: $|A| = n/p$.
- **B3** loại bội $q$: $|B| = n/q$.
- **B4** cộng lại bội cả $p$ và $q$ (= bội $pq$, đã bị trừ 2 lần): $|A\cap B| = n/(pq) = 1$ (vì $n = pq$).
- **B5** ráp lại: $\varphi(n) = n - n/p - n/q + 1$.

Gọn lại: $\varphi(pq) = pq - p - q + 1 = (p-1)(q-1)$.

**Walk-through $n = p^a$ (1 nguyên tố, có mũ)**: chỉ cần loại bội của $p$ → $\varphi(p^a) = p^a - p^{a-1} = p^a(1 - 1/p)$. Vd $\varphi(8) = \varphi(2^3) = 8 - 4 = 4$ (coprime với 8: $1,3,5,7$ ✓).

Tổng quát: nếu $n = p_1^{a_1} \cdots p_k^{a_k}$ thì (bù trừ với $A_i$ = "bội của $p_i$"):

$$\varphi(n) = n \cdot \prod_{i=1}^{k} \left(1 - \frac{1}{p_i}\right)$$

**4 ví dụ số đa dạng**:
- $\varphi(15) = \varphi(3\cdot 5) = (3-1)(5-1) = 8$. (Coprime với 15: $1,2,4,7,8,11,13,14$ → 8 số ✓.)
- $\varphi(12) = 12(1-\tfrac12)(1-\tfrac13) = 12\cdot\tfrac12\cdot\tfrac23 = 4$. ($12 = 2^2\cdot 3$ → chỉ nhân theo nguyên tố **phân biệt** 2, 3.)
- $\varphi(30) = 30(1-\tfrac12)(1-\tfrac13)(1-\tfrac15) = 30\cdot\tfrac12\cdot\tfrac23\cdot\tfrac45 = 8$ (3 nguyên tố).
- $\varphi(7) = 7 - 1 = 6$ (mọi số nguyên tố $p$: $\varphi(p) = p-1$).

💡 **Trực giác / Hình dung**: đếm số coprime với n = đếm tất cả rồi **loại** các số chung thừa số với n. "Loại bội của p" và "loại bội của q" sẽ trùng phần "bội của pq" → bù trừ. Đây chính là I-E áp dụng vào lý thuyết số.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao công thức φ ra $(p-1)(q-1)$ cho n = pq?"* $\varphi(pq) = pq - p - q + 1 = (p-1)(q-1)$. Verify $n = 15 = 3 \cdot 5$: $(3-1)(5-1) = 8$; liệt kê coprime với 15: 1,2,4,7,8,11,13,14 → đúng 8 số ✓.
- *"Liên hệ với L02 chỗ nào?"* Cùng công thức $\varphi(n) = n\prod(1-1/p_i)$, nhưng ở đây ta **chứng minh** nó bằng bù trừ thay vì chỉ phát biểu.
- *"Vì sao chỉ nhân theo nguyên tố PHÂN BIỆT, bỏ qua mũ?"* Vì "bội của $p$" gồm cả $p, 2p, 3p, \dots$ — số mũ $a$ trong $p^a$ không tạo thêm lớp "bội" mới để loại. Bội của $4 = 2^2$ vẫn là tập con của bội của 2, không cần đếm riêng. Verify $\varphi(8) = 8(1-1/2) = 4$, KHÔNG phải $8(1-1/2)(1-1/2) = 2$.
- *"Bù trừ ở đây là trên mấy tập?"* Đúng bằng **số nguyên tố phân biệt** $k$ của $n$. Vd $n=30 = 2\cdot3\cdot5$ → bù trừ 3 tập (bội 2, bội 3, bội 5), giống mục 3.2.

⚠ **Lỗi thường gặp**: dùng $(p-1)(q-1)$ khi p, q KHÔNG phân biệt hoặc n có mũ. Phản ví dụ: $\varphi(12) \neq (2-1)(\dots)$ ngây thơ — phải $12 \cdot (1-1/2) \cdot (1-1/3) = 4$ ($12 = 2^2 \cdot 3$, chỉ nhân theo nguyên tố phân biệt 2 và 3).

🔁 **Dừng lại tự kiểm tra**

1. $\varphi(20) = ?$ ($20 = 2^2 \cdot 5$).
2. Đếm số $\le 10$ coprime với 10, đối chiếu $\varphi(10)$.

<details><summary>Đáp án</summary>

1. $20 \cdot (1-1/2) \cdot (1-1/5) = 20 \cdot (1/2) \cdot (4/5) = 8$.
2. Coprime với 10: 1,3,7,9 → 4 số $= \varphi(10) = 10 \cdot (1/2) \cdot (4/5) = 4$ ✓.

</details>

### 📝 Tóm tắt mục 4

- $\varphi(n)$ đếm số $\le n$ coprime với n; tính bằng bù trừ (loại bội từng nguyên tố).
- $\varphi(pq) = (p-1)(q-1)$ cho p, q nguyên tố phân biệt.
- Công thức tổng: $\varphi(n) = n\prod(1-1/p_i)$, dùng nguyên tố **phân biệt**.

---

## 5. Bài toán Derangement (Hoán vị không điểm cố định)

💡 **Trực giác / Hình dung**: bạn say rượu bỏ n lá thư vào n phong bì hoàn toàn ngẫu nhiên. Xác suất KHÔNG lá nào về đúng phong bì là bao nhiêu? Trực giác sai lầm là "n càng lớn càng khó về 0%", nhưng thực ra tỉ lệ ổn định quanh **36.8% (1/e)** — gần như không phụ thuộc n. Đó là sự bất ngờ của derangement.

🎯 **Bài toán**: Có n bức thư + n phong bì có địa chỉ tương ứng. Bao nhiêu cách bỏ thư vào phong bì sao cho **không có thư nào đúng phong bì**?

Ký hiệu $D_n$.

Dùng bù trừ:

$$D_n = n! \cdot \sum_{k=0}^{n} \frac{(-1)^k}{k!} \approx \frac{n!}{e} \quad (\text{khi } n \text{ lớn})$$

> 🔍 **Suy ra công thức từ bù trừ — TỪNG BƯỚC**
>
> **Bước 1 — đặt sự kiện "xấu"**: $A_i$ = tập hoán vị mà **thư $i$ về đúng phong bì $i$** (vị trí $i$ cố định). Ta muốn đếm hoán vị tránh MỌI $A_i$:
> $$D_n = n! - |A_1 \cup A_2 \cup \dots \cup A_n|.$$
>
> **Bước 2 — đếm giao $k$ tập**: $|A_{i_1}\cap\dots\cap A_{i_k}|$ = số hoán vị cố định $k$ vị trí cho trước, $n-k$ vị trí còn lại tự do $= (n-k)!$. Có $\binom{n}{k}$ cách chọn $k$ vị trí đó.
>
> **Bước 3 — áp bù trừ cho hợp**:
> $$|A_1\cup\dots\cup A_n| = \sum_{k=1}^{n} (-1)^{k+1}\binom{n}{k}(n-k)!.$$
>
> **Bước 4 — thay vào và rút gọn**: $\binom{n}{k}(n-k)! = \dfrac{n!}{k!(n-k)!}(n-k)! = \dfrac{n!}{k!}$. Do đó:
> $$D_n = n! - \sum_{k=1}^{n}(-1)^{k+1}\frac{n!}{k!} = n!\left(1 - \sum_{k=1}^{n}(-1)^{k+1}\frac{1}{k!}\right) = n!\sum_{k=0}^{n}\frac{(-1)^k}{k!}. \qquad\square$$
>
> **Verify $n=3$**: $D_3 = 3!\left(1 - 1 + \tfrac12 - \tfrac16\right) = 6\cdot\tfrac26 = 2$. Liệt kê tay hoán vị của $(1,2,3)$ không điểm cố định: $(2,3,1)$ và $(3,1,2)$ → đúng 2 ✓.

**4 ví dụ số đa dạng**:
- $D_1 = 0$ (1 thư phải vào đúng phong bì → không có derangement).
- $D_2 = 1$ (chỉ cách hoán đổi 2 lá).
- $D_3 = 6\cdot(1-1+\frac{1}{2}-\frac{1}{6}) = 6\cdot\frac{2}{6} = 2$.
- $D_4 = 24\cdot(1-1+\frac{1}{2}-\frac{1}{6}+\frac{1}{24}) = 24\cdot\frac{9}{24} = 9$.

⟶ Tỉ lệ "không khớp" hội tụ về **$1/e \approx 36.8\%$** khi n lớn — bất ngờ!

**Bảng hội tụ $D_n/n! \to 1/e$** (thấy rõ tỉ lệ ổn định, KHÔNG về 0):

| $n$ | $D_n$ | $n!$ | $D_n/n!$ |
|----:|------:|-----:|---------:|
| 1 | 0 | 1 | $0.000$ |
| 2 | 1 | 2 | $0.500$ |
| 3 | 2 | 6 | $0.333$ |
| 4 | 9 | 24 | $0.375$ |
| 5 | 44 | 120 | $0.367$ |
| 6 | 265 | 720 | $0.368$ |
| $\to\infty$ | — | — | $1/e \approx 0.3679$ |

Từ $n = 4$ trở đi tỉ lệ đã dao động rất sát $1/e$ — đó là vì $\sum_{k=0}^{n}(-1)^k/k!$ hội tụ cực nhanh (sai số $< 1/(n+1)!$).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao dùng bù trừ ở đây?"* Đặt $A_i$ = "thư i về đúng phong bì". Ta muốn đếm hoán vị TRÁNH mọi $A_i$ → $n! - |A_1 \cup \dots \cup A_n|$, mà hợp này tính bằng I-E → ra công thức dấu xen kẽ.
- *"Vì sao kết quả gần $n!/e$?"* Vì $\sum (-1)^k/k!$ chính là khai triển Taylor của $e^{-1}$. Khi $n \to \infty$, tổng → $1/e \approx 0.3679$.

⚠ **Lỗi thường gặp**: tưởng $D_n$ tăng tỉ lệ giảm dần về 0% khi n lớn. SAI — tỉ lệ derangement $D_n/n!$ hội tụ về $1/e \approx 36.8\%$, KHÔNG về 0. Phản ví dụ: $D_4/4! = 9/24 = 37.5\%$, $D_5/5! = 44/120 = 36.7\%$ — ổn định quanh 37%.

🔁 **Dừng lại tự kiểm tra**

1. $D_5 = ?$
2. 3 người ngẫu nhiên nhận lại 3 chiếc mũ. Xác suất không ai nhận đúng mũ mình?

<details><summary>Đáp án</summary>

1. $D_5 = 120\cdot(1-1+\frac{1}{2}-\frac{1}{6}+\frac{1}{24}-\frac{1}{120}) = 120\cdot\frac{44}{120} = 44$.
2. $D_3/3! = 2/6 = 1/3 \approx 33.3\%$.

</details>

### 📝 Tóm tắt mục 5

- Derangement $D_n$ = hoán vị không phần tử nào ở đúng chỗ; tính bằng bù trừ.
- $D_n = n!\cdot\sum (-1)^k/k! \approx n!/e$.
- Tỉ lệ $D_n/n! \to 1/e \approx 36.8\%$ (không về 0!).

---

## 6. Bài tập

### Bài tập

**Bài 1**: 25 người, có cùng tháng sinh? Chứng minh.

**Bài 2**: Lớp 50 người, 30 chơi bóng đá, 25 chơi bóng rổ, 10 cả 2. Số chơi ít nhất 1 môn? Không chơi gì?

**Bài 3**: Bao nhiêu số từ 1-100 chia hết cho 2 hoặc 3 hoặc 5?

**Bài 4**: $D_5 = ?$

**Bài 5**: Chứng minh trong 367 người, có 2 người cùng ngày sinh.

**Bài 6**: Trong bóng tối, ngăn kéo có tất 4 màu lẫn lộn. Phải rút ít nhất bao nhiêu chiếc để chắc chắn có 1 đôi cùng màu?

**Bài 7**: 80 sinh viên: 50 học Toán, 35 học Tin, 30 học Lý; 20 Toán+Tin, 15 Tin+Lý, 18 Toán+Lý, 10 cả ba. Bao nhiêu người học **ít nhất 1** môn? Bao nhiêu người **không** học môn nào?

**Bài 8**: Chứng minh: trong 6 số nguyên bất kỳ, luôn có 2 số mà hiệu của chúng chia hết cho 5.

**Bài 9**: 5 phong bì, 5 lá thư. Có bao nhiêu cách bỏ thư sao cho không lá nào về đúng phong bì? Tính cả xác suất.

### Lời giải

**Bài 1**: 12 tháng, 25 người. $\lceil 25/12 \rceil = 3$ → có **3 người** cùng tháng.

**Bài 2**: $|A \cup B| = 30+25-10 =$ **45**. Không chơi gì $= 50-45 = 5$.

**Bài 3**: Tổng các bội $\le 100$:  
- Bội 2: 50. Bội 3: 33. Bội 5: 20.  
- Bội 6: 16. Bội 10: 10. Bội 15: 6.  
- Bội 30: 3.  
- $= 50+33+20 - 16-10-6 + 3 =$ **74**.

**Bài 4**: $D_5 = 120\cdot(1 - 1 + \frac{1}{2} - \frac{1}{6} + \frac{1}{24} - \frac{1}{120}) = 120\cdot\frac{44}{120} =$ **44**.

**Bài 5**: 366 ngày trong năm (tính nhuận). 367 người > 366 → Dirichlet (cần $n+1 = 367$ vật cho $n = 366$ hộp) → 2 người cùng ngày. □

**Bài 6**: **Vật** = số tất rút, **hộp** = 4 màu. Muốn 1 hộp $\ge 2$ chiếc cần số vật $> 4$ → rút **5** chiếc (rút 4 có thể mỗi màu 1 chiếc, chưa chắc; cần $n+1 = 5$). $\lceil 5/4\rceil = 2$ ✓.

**Bài 7**: Bù trừ 3 tập.
- **B1** cộng đơn: $50+35+30 = 115$.
- **B2** trừ giao đôi: $115 - (20+15+18) = 115 - 53 = 62$.
- **B3** cộng giao ba: $62 + 10 = $ **72** học ít nhất 1 môn.
- Không học môn nào $= 80 - 72 = $ **8**.

**Bài 8**: **Hộp** = 5 lớp số dư khi chia 5 ($0,1,2,3,4$ → đúng 5 hộp). **Vật** = 6 số. $6 > 5$ → Dirichlet → 2 số cùng số dư $\bmod 5$ → hiệu của chúng chia hết cho 5. □ (Tổng quát: $m+1$ số → 2 số có hiệu chia hết $m$.)

**Bài 9**: Đây là derangement $D_5$.
- $D_5 = 5!\left(1 - 1 + \tfrac12 - \tfrac16 + \tfrac1{24} - \tfrac1{120}\right) = 120\cdot\tfrac{44}{120} = $ **44** cách.
- Xác suất $= D_5/5! = 44/120 = 11/30 \approx 36.7\%$ — sát $1/e \approx 36.8\%$ ✓.

---

## 7. Bài tiếp theo

[Lesson 06 — Quy nạp toán học](../lesson-06-induction/).

## 📝 Tổng kết

1. **Dirichlet**: $n+1$ vật, $n$ hộp → có $\ge 2$ vật cùng hộp (cần đúng $n+1$, không phải $n$). Tổng quát: $\ge \lceil N/k \rceil$ — chứng minh bằng phản chứng + chặn tổng.
2. **Thiết kế hộp**: bài khó = chọn/dựng hộp khéo (tháng, màu, lớp dư $\bmod m$, cặp liên tiếp...).
3. **Bù trừ 2 tập**: $|A \cup B| = |A|+|B|-|A \cap B|$ (giao đếm 2 lần → trừ 1).
4. **Bù trừ 3 tập**: cộng đơn, trừ đôi, **cộng ba**; dấu $(-1)^{k+1}$ tổng quát, $2^n-1$ số hạng; mỗi phần tử đếm đúng 1 vì $\sum(-1)^{k+1}\binom{m}{k}=1$.
5. **Kỹ thuật phần bù**: "tránh mọi $A_i$" $=$ tổng $- |\bigcup A_i|$ → derangement, số toàn ánh.
6. **Áp dụng**: $\varphi(n) = n\prod(1-1/p_i)$ qua bù trừ; Derangement $D_n = n!\sum(-1)^k/k! \approx n!/e$.
7. **Sức mạnh**: Dirichlet chứng minh sự **tồn tại** mà không xây dựng được ví dụ cụ thể (non-constructive).
