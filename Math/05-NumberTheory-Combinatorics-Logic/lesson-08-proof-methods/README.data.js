// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/05-NumberTheory-Combinatorics-Logic/lesson-08-proof-methods/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Phương pháp chứng minh

## Mục tiêu

- Phân loại **các phương pháp chứng minh (proof methods)** chính: trực tiếp (direct), phản đảo (contrapositive), phản chứng (contradiction), phản ví dụ (counterexample), quy nạp (induction), xây dựng/tồn tại (constructive/existence), duy nhất (uniqueness), vét cạn trường hợp (proof by cases / exhaustion).
- Biết **khi nào dùng phương pháp nào** — đọc dạng mệnh đề rồi chọn vũ khí phù hợp (có bảng chọn ở mục 0).
- Mỗi phương pháp đi kèm **≥ 2 chứng minh mẫu đầy đủ từng bước** — không bỏ bước, không dùng "dễ thấy".
- Biết **cấu trúc của một chứng minh tốt** và các **lỗi logic** phổ biến cần tránh.

## Kiến thức tiền đề

- [Lesson 06 — Quy nạp](../lesson-06-induction/), [Lesson 07 — Logic](../lesson-07-logic-sets-maps/).
- Khái niệm số chẵn/lẻ, chia hết, số hữu tỉ/vô tỉ, đồng dư (mod) — đã gặp ở L01–L02 trong tier.

---

## 0. Bảng chọn phương pháp — dùng cái nào khi nào?

💡 **Trực giác / Hình dung**: chọn phương pháp chứng minh giống chọn **dụng cụ trong hộp đồ nghề**. Không có dụng cụ "tốt nhất tuyệt đối" — có cái hợp với từng loại đinh ốc. Mấu chốt là **đọc dạng logic của mệnh đề trước** (nó là $P \\to Q$? là $\\exists$? là $\\forall$? có chữ "không"/"vô" không?), rồi tra bảng.

| Mệnh đề có dạng… | Thử phương pháp | Vì sao |
|------------------|-----------------|--------|
| $P \\to Q$, từ $P$ suy thẳng ra $Q$ được | **Trực tiếp** | Ngắn, sạch, ít rủi ro |
| $P \\to Q$ mà $\\neg Q \\to \\neg P$ dễ hơn | **Phản đảo** | Giả thiết $\\neg Q$ cho khai triển đẹp |
| Mệnh đề **phủ định** ("X không phải Y", "vô tỉ", "không tồn tại nghiệm") | **Phản chứng** | Giả sử có rồi "đập" thường dễ hơn dựng trực tiếp |
| $\\exists x: P(x)$ ("tồn tại") | **Xây dựng** (chỉ ra $x$ cụ thể) | Cho luôn "vật chứng" |
| $\\forall n \\in \\mathbb{N}: P(n)$ | **Quy nạp** | $P(k+1)$ nối được với $P(k)$ |
| Cần **bác bỏ** một mệnh đề $\\forall$ ("mọi … đều …") | **Phản ví dụ** | 1 ví dụ sai là đủ phá vỡ "mọi" |
| Biến chạy trên **hữu hạn** trường hợp / chia theo lớp đồng dư | **Vét cạn trường hợp** | Kiểm hết là xong |
| "Tồn tại **duy nhất** $x$" | **Tồn tại + Duy nhất** | Hai phần: dựng được, và bất kỳ hai nghiệm phải bằng nhau |

⚠ **Lỗi thường gặp — chọn vũ khí trước khi đọc dạng mệnh đề.** Người mới hay "thử phản chứng" vô tội vạ vì nghe "kêu". Nhưng nếu mệnh đề là $\\exists$ thì một dòng xây dựng ($6 = 3+3$) thắng cả trang phản chứng. **Luôn phân loại dạng logic trước.**

🔁 **Dừng lại tự kiểm tra**

1. "Mọi số nguyên tố đều lẻ" — bác bằng phương pháp nào?
2. "Tồn tại số tự nhiên là tổng 3 lập phương" — phương pháp nào?

<details><summary>Đáp án</summary>

1. **Phản ví dụ**: $2$ là số nguyên tố nhưng chẵn → mệnh đề sai. (Một phản ví dụ là đủ.)
2. **Xây dựng**: $36 = 1^3 + 2^3 + 3^3 = 1 + 8 + 27$. Chỉ ra số cụ thể là xong. □

</details>

### 📝 Tóm tắt mục 0

- Đọc **dạng logic** ($P\\to Q$ / $\\exists$ / $\\forall$ / phủ định) **trước**, rồi chọn phương pháp.
- $\\exists$ → xây dựng; $\\forall \\mathbb{N}$ → quy nạp; phủ định → phản chứng; bác $\\forall$ → phản ví dụ.
- Không có phương pháp "tốt nhất"; có phương pháp **hợp** với từng dạng.

---

## 1. Chứng minh trực tiếp (Direct proof)

💡 **Trực giác / Hình dung**: chứng minh trực tiếp là "đi thẳng từ A tới B" — bắt đầu từ giả thiết P, biến đổi từng bước hợp lệ cho tới khi ra kết luận Q. Như giải toán theo lối đi xuôi, không vòng vo.

**Mẫu**: Cần chứng minh $P \\to Q$. Giả sử $P$ đúng, suy ra **từng bước hợp lệ** (mỗi bước dựa trên định nghĩa, tiên đề, hoặc định lý đã chứng minh) cho tới khi ra $Q$. Khung viết:

\`\`\`
Giả sử P.                         ← khai triển giả thiết bằng định nghĩa
  bước 1  (vì ...)
  bước 2  (vì ...)
  ...
Vậy Q.  □
\`\`\`

**Bí quyết then chốt — "khai triển giả thiết bằng định nghĩa"**: hầu hết chứng minh trực tiếp bắt đầu bằng việc *thay tên gọi bằng định nghĩa*. "n chẵn" → viết $n = 2k$; "$a$ chia hết $b$" → viết $b = a\\cdot q$; "$r$ hữu tỉ" → viết $r = p/q$. Sau khi thay, ta có biến số để thao tác đại số.

#### Chứng minh mẫu 1 — Bình phương số chẵn là số chẵn

**Mệnh đề**: Nếu $n$ là số chẵn thì $n^2$ chẵn.

$$\\begin{aligned}
n \\text{ chẵn} &\\Rightarrow n = 2k \\quad (k \\in \\mathbb{Z}) &&\\leftarrow \\text{định nghĩa số chẵn} \\\\
n^2 &= (2k)^2 = 4k^2 &&\\leftarrow \\text{bình phương} \\\\
&= 2\\cdot(2k^2) &&\\leftarrow \\text{nhóm thừa số 2 ra ngoài}
\\end{aligned}$$

Đặt $m = 2k^2 \\in \\mathbb{Z}$, ta có $n^2 = 2m$ → $n^2$ chẵn. $\\square$

#### Chứng minh mẫu 2 — Tổng hai số chẵn là số chẵn

**Mệnh đề**: Nếu $a, b$ đều chẵn thì $a + b$ chẵn.

$$\\begin{aligned}
a \\text{ chẵn} &\\Rightarrow a = 2m \\quad (m \\in \\mathbb{Z}) &&\\leftarrow \\text{định nghĩa} \\\\
b \\text{ chẵn} &\\Rightarrow b = 2n \\quad (n \\in \\mathbb{Z}) &&\\leftarrow \\text{định nghĩa} \\\\
a + b &= 2m + 2n = 2(m + n) &&\\leftarrow \\text{nhóm 2}
\\end{aligned}$$

Vì $m + n \\in \\mathbb{Z}$, $a + b = 2(m+n)$ chẵn. $\\square$

#### Chứng minh mẫu 3 — Tích hai số lẻ là số lẻ

**Mệnh đề**: Nếu $a, b$ đều lẻ thì $ab$ lẻ.

$$\\begin{aligned}
a = 2m + 1,\\ b = 2n + 1 &\\quad (m, n \\in \\mathbb{Z}) &&\\leftarrow \\text{định nghĩa số lẻ} \\\\
ab &= (2m+1)(2n+1) \\\\
&= 4mn + 2m + 2n + 1 \\\\
&= 2\\,(2mn + m + n) + 1 &&\\leftarrow \\text{nhóm dạng } 2\\cdot(\\ldots) + 1
\\end{aligned}$$

Đặt $t = 2mn + m + n \\in \\mathbb{Z}$, ta có $ab = 2t + 1$ → $ab$ lẻ. $\\square$ (Verify số: $3\\cdot 5 = 15$ lẻ ✓; $7\\cdot 9 = 63$ lẻ ✓.)

⟶ Đơn giản nhất, dùng khi suy luận thẳng từ $P$ tới $Q$ được.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào trực tiếp 'không đi được'?"* Khi từ $P$ khó suy ra $Q$ (vd $Q$ là mệnh đề phủ định "không tồn tại", hoặc $P$ là dạng "$n^2$ chẵn" — bình phương đã rồi, khó "tháo ngược" ra tính chất của $n$). Lúc đó chuyển sang phản đảo hoặc phản chứng.
- *"Viết $n = 2k$ là 'giả sử' hay 'định nghĩa'?"* Đây là **dùng định nghĩa số chẵn**: mọi số chẵn viết được dạng $2k$. Không phải giả sử thêm — chỉ khai triển giả thiết $P$.
- *"Có được dùng kết quả 'đã chứng minh ở mục trước' không?"* Có. Một chứng minh hợp lệ được phép viện dẫn mọi định lý/bổ đề đã được chứng minh trước đó. Vd mẫu 1 ("n chẵn → n² chẵn") sẽ được tái sử dụng làm phản đảo ở mục 2.

⚠ **Lỗi thường gặp — "chứng minh ngược" (giả định điều cần chứng minh).** Để CM $a+b$ chẵn, KHÔNG được bắt đầu bằng "Giả sử $a+b = 2k$…" rồi suy ngược — đó là dùng chính kết luận làm giả thiết. Chứng minh trực tiếp phải đi **từ giả thiết $P$ tới $Q$**, không phải từ $Q$ đi lùi. (Trừ phi mỗi bước **tương đương hai chiều** $\\iff$ — khi đó đi ngược cũng hợp lệ, nhưng phải nói rõ.)

🔁 **Dừng lại tự kiểm tra**

1. CM trực tiếp: tổng hai số lẻ là số chẵn.
2. CM trực tiếp: nếu $a$ chia hết cho 3 thì $a^2$ chia hết cho 9.

<details><summary>Đáp án</summary>

1. $a = 2m+1$, $b = 2n+1$ → $a+b = 2m+2n+2 = 2(m+n+1)$ → chẵn. $\\square$
2. $3 \\mid a \\Rightarrow a = 3k$ → $a^2 = 9k^2 = 9\\cdot k^2$ → $9 \\mid a^2$. $\\square$ (Verify: $a=6 \\Rightarrow a^2=36 = 9\\cdot 4$ ✓.)

</details>

### 📝 Tóm tắt mục 1

- Trực tiếp: từ $P$, biến đổi hợp lệ tới $Q$ — đi **xuôi**, không đi lùi từ $Q$.
- **Khai triển giả thiết bằng định nghĩa** (số chẵn $= 2k$, chia hết $\\Rightarrow b = aq$…) để có biến thao tác.
- Đơn giản nhất; dùng khi suy luận xuôi được. Đừng giả định điều cần chứng minh.

---

## 2. Chứng minh phản đảo (Contrapositive)

💡 **Trực giác / Hình dung**: $P \\to Q$ và $\\neg Q \\to \\neg P$ là **cùng một sự thật nhìn từ hai phía**. "Mưa → ướt đường" giống hệt "đường khô → trời không mưa". Khi chứng minh chiều thuận khó, lật sang phản đảo có khi dễ hơn hẳn.

**Logic**: $P \\to Q$ tương đương $\\neg Q \\to \\neg P$. (Hai mệnh đề này có **cùng bảng chân trị** — xem L07; chúng đúng/sai y hệt nhau trong mọi trường hợp.)

⟶ Đôi khi $\\neg Q \\to \\neg P$ **dễ chứng minh hơn** $P \\to Q$, vì giả thiết mới $\\neg Q$ thường cho khai triển đẹp hơn.

**Quy tắc lập phản đảo** (3 thao tác): (1) **phủ định kết luận** $Q$ → cho làm giả thiết mới; (2) **phủ định giả thiết** $P$ → cho làm kết luận mới; (3) **đổi chiều mũi tên**. Vd $P \\to Q$ là "$n^2$ lẻ $\\to$ $n$ lẻ" thì phản đảo là "$n$ chẵn $\\to$ $n^2$ chẵn".

#### Chứng minh mẫu 1 — $n^2$ lẻ thì $n$ lẻ

**Mệnh đề**: Nếu $n^2$ lẻ thì $n$ lẻ.

Chứng minh trực tiếp khó (từ "$n^2$ lẻ" làm sao "tháo ngược căn"?). Lập **phản đảo**: "Nếu $n$ chẵn thì $n^2$ chẵn".

$$\\begin{aligned}
n \\text{ chẵn} &\\Rightarrow n = 2k &&\\leftarrow \\text{định nghĩa} \\\\
n^2 &= 4k^2 = 2(2k^2) &&\\Rightarrow n^2 \\text{ chẵn}
\\end{aligned}$$

Phản đảo đúng (đây chính là mẫu 1 mục 1). Vì $P\\to Q \\equiv \\neg Q \\to \\neg P$, mệnh đề gốc cũng đúng. $\\square$

#### Chứng minh mẫu 2 — $n^2$ chẵn thì $n$ chẵn

**Mệnh đề**: Nếu $n^2$ chẵn thì $n$ chẵn. (Bổ đề này được dùng làm "trái tim" của CM $\\sqrt{2}$ vô tỉ ở mục 3.)

Lập **phản đảo**: "Nếu $n$ lẻ thì $n^2$ lẻ".

$$\\begin{aligned}
n \\text{ lẻ} &\\Rightarrow n = 2k + 1 &&\\leftarrow \\text{định nghĩa} \\\\
n^2 &= (2k+1)^2 = 4k^2 + 4k + 1 \\\\
&= 2(2k^2 + 2k) + 1 &&\\Rightarrow n^2 \\text{ lẻ}
\\end{aligned}$$

Phản đảo đúng → mệnh đề gốc "$n^2$ chẵn $\\Rightarrow n$ chẵn" đúng. $\\square$ (Verify: $6^2 = 36$ chẵn, $6$ chẵn ✓; phản đảo: $7$ lẻ, $7^2 = 49$ lẻ ✓.)

#### Chứng minh mẫu 3 — $a + b \\ge 15$ thì $a \\ge 8$ hoặc $b \\ge 8$

**Mệnh đề**: Với $a, b \\in \\mathbb{Z}$, nếu $a + b \\ge 15$ thì $a \\ge 8$ hoặc $b \\ge 8$.

Phản đảo của "$a\\ge 8$ **hoặc** $b\\ge 8$" là "$a < 8$ **và** $b < 8$" (De Morgan — phủ định "hoặc" thành "và"). Vậy phản đảo cả mệnh đề: "Nếu $a < 8$ và $b < 8$ thì $a + b < 15$".

$$a \\le 7 \\text{ và } b \\le 7 \\;\\Rightarrow\\; a + b \\le 14 < 15. \\qquad \\square$$

Trực tiếp sẽ phải xét "hoặc" rối rắm; phản đảo biến nó thành "và" gọn gàng — đây là lý do điển hình để chọn phản đảo.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Phản đảo khác phản chứng chỗ nào?"* Phản đảo chứng minh **trực tiếp** mệnh đề $\\neg Q \\to \\neg P$ (một mệnh đề tương đương logic với gốc). Phản chứng giả sử cả $P$ **lẫn** $\\neg Q$ rồi tìm **bất kỳ** mâu thuẫn nào. Phản đảo gọn và "sạch" hơn khi áp dụng được — vì nó đẻ ra một kết luận đích cụ thể ($\\neg P$) để nhắm tới, còn phản chứng để ngỏ "mâu thuẫn ở đâu cũng được".
- *"Vì sao 'n² lẻ → n lẻ' khó chứng minh trực tiếp?"* Từ "$n^2$ lẻ" khó suy thẳng tính chất của $n$ (không có "căn bậc hai số nguyên" để tháo). Nhưng phản đảo "$n$ chẵn → $n^2$ chẵn" thì $n = 2k$ cho ngay.
- *"Mọi mệnh đề $P\\to Q$ đều lập được phản đảo chứ?"* Đúng — về logic luôn lập được. Nhưng chỉ **đáng** dùng khi phản đảo dễ hơn gốc; nếu phản đảo cũng khó như gốc thì không lợi gì.

⚠ **Lỗi thường gặp — lấy đảo $Q \\to P$ thay vì phản đảo $\\neg Q \\to \\neg P$**. Chỉ phản đảo mới tương đương với $P \\to Q$. Phản ví dụ: "n chia hết 4 → n chẵn" đúng; đảo "n chẵn → n chia hết 4" SAI (n=6); nhưng phản đảo "n lẻ → n không chia hết 4" đúng.

🔁 **Dừng lại tự kiểm tra**

1. Viết phản đảo của "Nếu $x^2 \\neq 0$ thì $x \\neq 0$".
2. CM bằng phản đảo: "Nếu $3 \\nmid n$ thì $3 \\nmid n^2$" — không, lập phản đảo của "$3\\mid n^2 \\Rightarrow 3\\mid n$".
3. CM bằng phản đảo: "Nếu $n^3$ chẵn thì $n$ chẵn".

<details><summary>Đáp án</summary>

1. "Nếu $x = 0$ thì $x^2 = 0$" (đổi cả 2 vế thành phủ định và đảo chiều).
2. Phản đảo: "Nếu $3 \\nmid n$ thì $3 \\nmid n^2$". $n \\equiv 1$ hoặc $2 \\pmod 3$ → $n^2 \\equiv 1$ hoặc $4\\equiv 1 \\pmod 3$ → $n^2 \\not\\equiv 0$ → $3\\nmid n^2$. $\\square$
3. Phản đảo: "$n$ lẻ → $n^3$ lẻ". $n = 2k+1$ → $n^3 = (2k+1)^3$ là tích ba số lẻ → lẻ (mục 1 mẫu 3). $\\square$

</details>

### 📝 Tóm tắt mục 2

- $P \\to Q$ tương đương phản đảo $\\neg Q \\to \\neg P$ (**không** phải đảo $Q \\to P$).
- Lập phản đảo: phủ định $Q$ làm giả thiết, phủ định $P$ làm kết luận, đổi chiều; "hoặc" thành "và" (De Morgan).
- Dùng khi chiều phản đảo dễ chứng minh hơn (giả thiết $\\neg Q$ khai triển đẹp).
- Vẫn là chứng minh **trực tiếp**, chỉ thực hiện trên mệnh đề tương đương.

---

## 3. Chứng minh phản chứng (Proof by contradiction)

💡 **Trực giác / Hình dung**: phản chứng giống "thử giả định điều ngược lại rồi thấy nó dẫn tới điều vô lý". Như muốn chứng minh "không có ngày tận thế hôm qua": giả sử có → thì hôm nay ta không tồn tại → mâu thuẫn (ta đang đọc) → giả định sai. Đặc biệt mạnh cho mệnh đề phủ định ("không tồn tại", "X không phải Y").

🎯 **Mẫu**: Cần CM P. Giả sử **$\\neg P$**, suy ra mâu thuẫn → ¬P sai → P đúng.

> 📐 **Định nghĩa đầy đủ — Chứng minh phản chứng**
>
> **(a) Là gì**: Để chứng minh P đúng, giả sử ngược lại ($\\neg P$), suy luận đến 1 mâu thuẫn (1 mệnh đề luôn sai, hoặc trái giả thiết, hoặc trái 1 định lý đã biết). Vì logic không cho phép cả P và ¬P cùng sai, kết luận ¬P sai → P đúng. Tiếng Latin: "reductio ad absurdum".
>
> **(b) Vì sao cần**: Đôi khi chứng minh trực tiếp P rất khó, nhưng giả sử ¬P và "đập" nó dễ hơn. Đặc biệt mạnh cho mệnh đề **phủ định** ("X KHÔNG phải Y", "không tồn tại X thoả Y"). Ví dụ kinh điển $\\sqrt{2}$ vô tỉ: trực tiếp khó (làm sao chứng minh "không có a/b"?), nhưng phản chứng cho ngay kết quả. Tương tự: vô hạn số nguyên tố (Euclid), không có hàm liên tục tại mọi điểm hữu tỉ và gián đoạn tại mọi điểm vô tỉ. Cảnh báo: phản chứng không cho ví dụ cụ thể — chỉ chứng minh sự tồn tại/không tồn tại.
>
> **(c) Ví dụ số**: CM $\\sqrt{2}$ vô tỉ. Giả sử $\\sqrt{2} = a/b$ tối giản → $2b^2 = a^2$ → a chẵn → $a = 2c$ → $b^2 = 2c^2$ → b chẵn → $2 \\mid \\gcd(a,b)$ trái tối giản. ✓. CM vô hạn nguyên tố: giả sử hữu hạn $p_1,\\dots,p_n$. Xét $N = p_1\\cdot\\ldots\\cdot p_n + 1$. N chia mỗi $p_i$ dư 1 → N có ước nguyên tố mới → trái giả thiết. CM $\\sqrt{3}$ vô tỉ (tương tự): nếu $\\sqrt{3} = a/b$ tối giản, $3b^2 = a^2$ → $3 \\mid a$ → $a = 3c$ → $b^2 = 3c^2$ → $3 \\mid b$ → trái tối giản.

### Ví dụ kinh điển — √2 vô tỉ

CM $\\sqrt{2}$ không phải số hữu tỉ.

**Phản chứng**: Giả sử $\\sqrt{2} = a/b$ với $a, b \\in \\mathbb{Z}$, $\\gcd(a,b) = 1$ (phân số tối giản).

- $\\sqrt{2} = a/b$ → $2 = a^2/b^2$ → $a^2 = 2b^2$ → $a^2$ chẵn → a chẵn.
- $a = 2c$ → $(2c)^2 = 2b^2$ → $4c^2 = 2b^2$ → $b^2 = 2c^2$ → $b^2$ chẵn → b chẵn.
- Cả a và b chẵn → $2 \\mid \\gcd(a, b)$ → $\\gcd \\neq 1$.
- **MÂU THUẪN** với $\\gcd(a,b) = 1$. □

⟶ Phản chứng cực hiệu quả cho mệnh đề **phủ định** (X không phải Y).

### Ví dụ thứ 2 — Vô hạn số nguyên tố (Euclid)

**Mệnh đề**: Có vô hạn số nguyên tố. (Đã gặp ở L02; ở đây viết đầy đủ từng bước.)

**Phản chứng**: Giả sử **trái lại**, chỉ có **hữu hạn** số nguyên tố, liệt kê hết: $p_1, p_2, \\dots, p_n$.

$$\\begin{aligned}
\\text{Xét } N &= p_1 \\cdot p_2 \\cdot \\ldots \\cdot p_n + 1 &&\\leftarrow \\text{nhân tất cả rồi } +1 \\\\
N &> 1 &&\\Rightarrow N \\text{ có ít nhất một ước nguyên tố } q
\\end{aligned}$$

- $q$ là số nguyên tố → $q$ phải nằm trong danh sách $\\{p_1,\\dots,p_n\\}$ (vì ta giả sử đó là **tất cả** số nguyên tố). Vậy $q = p_i$ với một $i$ nào đó → $q \\mid (p_1\\cdots p_n)$.
- Đồng thời $q \\mid N$ theo định nghĩa $q$ là ước của $N$.
- Hai điều trên → $q \\mid \\big(N - p_1\\cdots p_n\\big) = 1$. Nhưng số nguyên tố $q \\ge 2$ **không thể** chia hết $1$.
- **MÂU THUẪN**.

Vậy giả sử "hữu hạn" sai → có vô hạn số nguyên tố. $\\square$ (Walk-through số: nếu chỉ có $\\{2,3,5\\}$ thì $N = 2\\cdot3\\cdot5 + 1 = 31$, mà $31$ là nguyên tố không nằm trong danh sách → mâu thuẫn.)

### Ví dụ thứ 3 — Không có số hữu tỉ nhỏ nhất dương

**Mệnh đề**: Không tồn tại số hữu tỉ dương nhỏ nhất.

**Phản chứng**: Giả sử **có** một số hữu tỉ dương nhỏ nhất, gọi là $r > 0$.

- Xét $r/2$. Vì $r$ hữu tỉ nên $r/2$ cũng hữu tỉ, và $0 < r/2 < r$.
- Vậy $r/2$ là số hữu tỉ dương **nhỏ hơn** $r$ — trái với việc $r$ là nhỏ nhất.
- **MÂU THUẪN**.

Vậy không tồn tại số hữu tỉ dương nhỏ nhất. $\\square$ (Đây là dạng phủ định "không tồn tại" — chính là sân nhà của phản chứng.)

❓ **Câu hỏi tự nhiên của người đọc**

- *"Mâu thuẫn phải là gì mới hợp lệ?"* Bất kỳ điều luôn sai: trái giả thiết ($\\gcd=1$ mà ra $\\gcd \\neq 1$), trái định lý đã biết ($q\\mid 1$ với $q\\ge 2$), trái chính giả định phản chứng ($r/2 < r$ trong khi $r$ "nhỏ nhất"), hoặc $0 = 1$. Miễn là một mệnh đề không thể đúng.
- *"Vì sao √2 vô tỉ phải dùng phản chứng?"* Vì "vô tỉ" = "**KHÔNG** viết được $a/b$" — mệnh đề phủ định. Chứng minh trực tiếp "không tồn tại $a/b$" rất khó (làm sao xét hết vô hạn cặp?); giả sử **có** rồi đập một cặp cụ thể thì dễ.
- *"Khi nào nên dùng phản chứng thay vì phản đảo?"* Xem khung so sánh ngay dưới đây — đây là câu hỏi đáng dừng lại.

> 🧭 **Phản chứng vs Phản đảo — chọn cái nào?**
>
> Hai phương pháp dễ lẫn vì cùng "giả định cái phủ định". Phân biệt:
>
> | | Phản đảo | Phản chứng |
> |---|----------|------------|
> | Dùng cho dạng | **chỉ** $P \\to Q$ | **mọi** mệnh đề (kể cả không phải $P\\to Q$) |
> | Giả định | chỉ $\\neg Q$ | $\\neg(\\text{kết luận})$ — với $P\\to Q$ là cả $P$ **và** $\\neg Q$ |
> | Đích nhắm tới | một kết luận cụ thể: $\\neg P$ | **bất kỳ** mâu thuẫn nào |
> | Kết cấu | trực tiếp, "sạch", một hướng | linh hoạt hơn nhưng dễ lạc |
>
> **Quy tắc thực hành**: Nếu mệnh đề có dạng $P \\to Q$ và bạn thấy "$\\neg Q$ cho khai triển đẹp" → **ưu tiên phản đảo** (gọn hơn, ít rủi ro mắc lỗi logic). Nếu mệnh đề **không** ở dạng $P\\to Q$ (vd "$\\sqrt 2$ vô tỉ", "vô hạn nguyên tố", "không tồn tại X") → **phản chứng** là lựa chọn tự nhiên. Mẹo nhớ: *"phản đảo cho mũi tên, phản chứng cho phủ định"*.
>
> ⚠ Nhiều "chứng minh phản chứng" thực ra **là phản đảo trá hình**: để CM $P\\to Q$, giả sử $P$ và $\\neg Q$, rồi chỉ dùng $\\neg Q$ suy ra $\\neg P$ (mâu thuẫn với $P$). Nếu bạn **không hề dùng $P$** trong quá trình suy luận, đó đáng lẽ nên viết gọn thành phản đảo.

⚠ **Lỗi thường gặp — quên giả định "tối giản" hoặc dùng sai mâu thuẫn**. Trong CM √2 vô tỉ, BẮT BUỘC giả sử $a/b$ tối giản ($\\gcd(a,b)=1$); mâu thuẫn chính là "cả a, b đều chẵn → $\\gcd \\ge 2$". Bỏ điều kiện tối giản thì không có mâu thuẫn → chứng minh hỏng.

🔁 **Dừng lại tự kiểm tra**

1. Trong CM √2 vô tỉ, từ $a^2 = 2b^2$ suy ra a chẵn thế nào?
2. Mâu thuẫn cuối cùng của chứng minh √2 vô tỉ là gì?

<details><summary>Đáp án</summary>

1. $a^2 = 2b^2$ chẵn → a² chẵn → a chẵn (vì bình phương số lẻ là lẻ).
2. Cả a và b đều chẵn → $2 \\mid \\gcd(a,b)$, trái giả thiết $\\gcd(a,b) = 1$.

</details>

### 📝 Tóm tắt mục 3

- Phản chứng: giả sử $\\neg P$, suy ra **bất kỳ** mâu thuẫn nào → $\\neg P$ sai → $P$ đúng.
- Mạnh nhất cho mệnh đề **phủ định** / "không tồn tại" ($\\sqrt 2$ vô tỉ, vô hạn nguyên tố, không có hữu tỉ dương nhỏ nhất).
- Phải có **giả định đầy đủ** (vd "tối giản" $\\gcd=1$) để mâu thuẫn xuất hiện.
- Với $P\\to Q$: nếu chỉ dùng $\\neg Q$ (không đụng $P$) → nên viết gọn thành **phản đảo**.

---

## 4. Chứng minh xây dựng (Constructive)

💡 **Trực giác / Hình dung**: muốn chứng minh "có tồn tại 1 con voi biết nhảy" thì cách chắc chắn nhất là **dắt ra 1 con voi đang nhảy**. Chứng minh xây dựng = đưa ra ví dụ cụ thể, không lý luận vòng vo. Mạnh ở chỗ cho luôn "vật chứng".

🎯 **Mẫu**: CM $\\exists x: P(x)$ bằng cách **xây dựng** $x$ cụ thể, rồi kiểm $P(x)$ đúng.

#### Chứng minh mẫu 1 — Tồn tại số chẵn là tổng hai số nguyên tố

**Mệnh đề**: $\\exists$ số chẵn viết được thành tổng hai số nguyên tố.

**Xây dựng**: chọn $6$. Ta có $6 = 3 + 3$, trong đó $3$ là số nguyên tố. Vậy $6$ thoả. $\\square$

#### Chứng minh mẫu 2 — Tồn tại số vừa là bình phương vừa là lập phương

**Mệnh đề**: $\\exists\\, n \\in \\mathbb{N}$ vừa là số chính phương vừa là lập phương đúng.

**Xây dựng**: chọn $n = 64$. Ta có $64 = 8^2$ (bình phương) và $64 = 4^3$ (lập phương). Vậy $64$ thoả. $\\square$ (Tổng quát: mọi $n = k^6$ đều thoả vì $k^6 = (k^3)^2 = (k^2)^3$; ví dụ $k=2 \\Rightarrow 64$.)

#### Chứng minh mẫu 3 — Tồn tại 100 số tự nhiên liên tiếp đều là hợp số

**Mệnh đề**: $\\exists$ một dãy $100$ số tự nhiên liên tiếp mà **không số nào** là số nguyên tố.

**Xây dựng**: xét dãy $101! + 2,\\ 101! + 3,\\ \\dots,\\ 101! + 101$ (gồm $100$ số liên tiếp).

- Với mỗi $k$ từ $2$ đến $101$: số $101! + k$ chia hết cho $k$, vì $101! = 1\\cdot 2 \\cdots 101$ chứa thừa số $k$, nên $101! + k = k\\big(\\tfrac{101!}{k} + 1\\big)$.
- Mà $101! + k > k$, nên nó là **hợp số** (có ước thực sự $k$).

Vậy cả $100$ số đều là hợp số. $\\square$ Đây là chứng minh xây dựng đẹp: ta **chỉ thẳng** ra dãy, không cần biết số nguyên tố phân bố thế nào.

**Ví dụ phức tạp** — Vô số nguyên tố dạng 4k+3.

CM bằng phản chứng: giả sử hữu hạn $p_1, \\dots, p_n$ dạng 4k+3.

Xét $N = 4\\cdot p_1\\cdot p_2\\cdot\\ldots\\cdot p_n - 1$. N có dạng 4k+3 (vì $4\\cdot\\ldots -1 \\equiv -1 \\equiv 3 \\pmod 4$).
- $N > 1$ → có ước nguyên tố.
- Mọi ước nguyên tố lẻ $\\equiv 1$ hoặc $3 \\pmod 4$.
- Nếu tất cả ước $\\equiv 1 \\pmod 4$: tích $\\equiv 1 \\pmod 4$, mâu thuẫn $N \\equiv 3$.
- → Có ước $p \\equiv 3 \\pmod 4$, nhưng $p \\neq p_i$ (vì $p_i \\mid (N + 1)$ nhưng $p \\mid N$).
- Mâu thuẫn. □

❓ **Câu hỏi tự nhiên của người đọc**

- *"Chứng minh xây dựng vs không-xây-dựng khác gì?"* Xây dựng cho **ví dụ cụ thể** ($6 = 3+3$). Không-xây-dựng (như bài $a^b$ hữu tỉ ở mục bài tập) chỉ chứng minh "có tồn tại" mà KHÔNG chỉ ra cái nào — yếu hơn về thông tin.
- *"Khi nào chọn xây dựng?"* Khi mệnh đề là $\\exists x: P(x)$ và bạn đoán/tìm được 1 x cụ thể. Nhanh và thuyết phục nhất.

⚠ **Lỗi thường gặp**: với mệnh đề $\\exists$, đi chứng minh trừu tượng dài dòng trong khi chỉ cần 1 ví dụ. Phản ví dụ: "tồn tại số nguyên tố chẵn" — chỉ cần nói **2** là xong, không cần lý luận gì thêm.

🔁 **Dừng lại tự kiểm tra**

1. CM xây dựng: tồn tại số tự nhiên vừa là bình phương vừa là lập phương.

<details><summary>Đáp án</summary>

1. $64 = 8^2 = 4^3$ (hoặc $1 = 1^2 = 1^3$, hoặc $729 = 27^2 = 9^3$). □

</details>

### 📝 Tóm tắt mục 4

- Xây dựng: chứng minh $\\exists x: P(x)$ bằng cách đưa ra x cụ thể.
- Mạnh nhất về thông tin (cho luôn "vật chứng").
- Với $\\exists$, ưu tiên tìm 1 ví dụ thay vì lý luận trừu tượng.

---

## 5. Chứng minh quy nạp

💡 **Trực giác / Hình dung**: quy nạp = domino (xem L06). Dùng riêng cho mệnh đề $\\forall n \\in \\mathbb{N}: P(n)$ — chứng minh cơ sở + bước chuyển tiếp.

(Đã học ở L06.)

⟶ Dùng cho mệnh đề về số tự nhiên.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào chọn quy nạp thay phản chứng/trực tiếp?"* Khi mệnh đề có dạng "$\\forall n$ tự nhiên" và P(k+1) liên hệ được với P(k). Vd công thức tổng, bất đẳng thức theo n, chia hết theo n.

### 📝 Tóm tắt mục 5

- Quy nạp dành cho mệnh đề về số tự nhiên ($\\forall n \\in \\mathbb{N}$).
- Khung: cơ sở + bước $P(k) \\to P(k+1)$; chi tiết ở L06.
- Chọn khi P(k+1) nối được với các bước trước.

---

## 6. Chứng minh không-tồn-tại (Non-existence)

💡 **Trực giác / Hình dung**: để chứng minh "không có nghiệm", tìm một "bộ lọc" (vd xét mod m) mà mọi nghiệm khả dĩ đều bị loại. Như chứng minh "không ai cao 5 mét" bằng cách chỉ ra giới hạn sinh học. Modular argument là bộ lọc mạnh nhất cho phương trình số nguyên.

Phổ biến dùng **phản chứng**: giả sử tồn tại → mâu thuẫn.

**Ví dụ**: CM PT $x^2 + y^2 = 4\\cdot z + 3$ không có nghiệm nguyên.

- Xét mod 4. Số chính phương $\\bmod 4 \\in \\{0, 1\\}$.
- $x^2 + y^2 \\bmod 4 \\in \\{0, 1, 2\\}$.
- $4z + 3 \\bmod 4 = 3$.
- $3 \\notin \\{0, 1, 2\\}$. → **Vô nghiệm**. □

⟶ Kỹ thuật "**modular arithmetic argument**" — kinh điển.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao số chính phương mod 4 chỉ $\\in \\{0,1\\}$?"* Số chẵn $(2k)^2 = 4k^2 \\equiv 0$; số lẻ $(2k+1)^2 = 4k^2+4k+1 \\equiv 1$. Không có khả năng khác → mod 4 chỉ ra 0 hoặc 1.
- *"Chọn mod mấy để loại?"* Thử mod nhỏ (3, 4, 8...) sao cho vế trái và vế phải có tập số dư khả dĩ **không giao nhau** → vô nghiệm.

⚠ **Lỗi thường gặp**: liệt kê thiếu các số dư khả dĩ. Phải kiểm **mọi** trường hợp. Phản ví dụ tư duy: nếu chỉ xét x chẵn (bỏ x lẻ) thì kết luận sai. Ở đây $x^2 \\in \\{0,1\\}$, $y^2 \\in \\{0,1\\}$ → tổng $\\in \\{0,1,2\\}$ đã đủ MỌI tổ hợp.

🔁 **Dừng lại tự kiểm tra**

1. Các giá trị $x^2 \\bmod 4$ có thể nhận?
2. Vì sao $x^2 + y^2 = 4z + 3$ vô nghiệm nhưng $x^2 + y^2 = 4z + 2$ thì có?

<details><summary>Đáp án</summary>

1. $\\{0, 1\\}$ (chẵn → 0, lẻ → 1).
2. Tổng $x^2+y^2 \\bmod 4 \\in \\{0,1,2\\}$. $4z+3 \\equiv 3$ không nằm trong → vô nghiệm. $4z+2 \\equiv 2 \\in$ tập → có thể có (vd x=y=1: $1+1=2$ ✓).

</details>

### 📝 Tóm tắt mục 6

- Chứng minh vô nghiệm: dùng phản chứng + xét mod m làm "bộ lọc".
- Số chính phương $\\bmod 4 \\in \\{0,1\\}$ → $x^2+y^2 \\bmod 4 \\in \\{0,1,2\\}$, loại được vế $\\equiv 3$.
- Phải liệt kê **đầy đủ** các số dư khả dĩ.

---

## 6b. Phản ví dụ (Counterexample) — bác bỏ mệnh đề sai

💡 **Trực giác / Hình dung**: để chứng minh một mệnh đề "**mọi** X đều có tính chất Y" là **sai**, không cần lý luận dài — chỉ cần **một** trường hợp X không có Y. Như bác bỏ "mọi con thiên nga đều trắng" bằng cách dắt ra **một** con thiên nga đen. Phản ví dụ là "vũ khí phá" mạnh nhất cho mệnh đề $\\forall$.

🎯 **Mẫu**: Để bác $\\forall x: P(x)$, tìm **một** $x_0$ cụ thể sao cho $P(x_0)$ **sai**. Vì $\\neg\\big(\\forall x: P(x)\\big) \\equiv \\exists x: \\neg P(x)$ (L07), một phản ví dụ là chứng minh đầy đủ cho mệnh đề phủ định.

#### Chứng minh mẫu 1 — Bác "mọi số nguyên tố đều lẻ"

**Mệnh đề bị bác**: "Mọi số nguyên tố đều là số lẻ."

**Phản ví dụ**: $2$ là số nguyên tố nhưng $2$ là số chẵn. Vậy mệnh đề sai. $\\square$ (Một phản ví dụ là đủ — không cần xét thêm số nào.)

#### Chứng minh mẫu 2 — Bác "$n^2 + n + 41$ luôn là số nguyên tố"

**Mệnh đề bị bác**: "Với mọi $n \\in \\mathbb{N}$, $f(n) = n^2 + n + 41$ là số nguyên tố." (Công thức Euler — đúng cho $n = 0, 1, \\dots, 39$, nên trông rất thuyết phục.)

**Phản ví dụ**: chọn $n = 40$.
$$f(40) = 40^2 + 40 + 41 = 1600 + 40 + 41 = 1681 = 41^2.$$
Vì $1681 = 41 \\times 41$ là hợp số → mệnh đề sai. $\\square$

⚠ Bài học: "đúng cho 40 trường hợp đầu" **không** chứng minh "đúng mọi trường hợp". Đây là lý do **kiểm vài ví dụ không phải là chứng minh** — chỉ cần một phản ví dụ là sụp.

#### Chứng minh mẫu 3 — Bác "$a^2 = b^2 \\Rightarrow a = b$"

**Mệnh đề bị bác**: "Với mọi số thực $a, b$: nếu $a^2 = b^2$ thì $a = b$."

**Phản ví dụ**: $a = 2$, $b = -2$. Khi đó $a^2 = 4 = b^2$ nhưng $a = 2 \\neq -2 = b$. Vậy mệnh đề sai. $\\square$ (Đúng phải là $a = \\pm b$.)

⚠ **Lỗi thường gặp — dùng phản ví dụ sai chỗ**. Phản ví dụ **chỉ bác được** mệnh đề $\\forall$ ("mọi"). Nó **KHÔNG** bác được mệnh đề $\\exists$ ("tồn tại"): muốn bác "$\\exists x: P(x)$" thì phải chứng minh "$\\forall x: \\neg P(x)$" — tức là phải xét **mọi** $x$ (thường bằng phản chứng), một ví dụ lẻ không đủ. Vd: để bác "tồn tại nghiệm nguyên của $x^2+y^2 = 4z+3$", chỉ ra "$x=1, y=1$ không thoả" là **vô nghĩa** — phải dùng modular argument loại **mọi** bộ (mục 6).

🔁 **Dừng lại tự kiểm tra**

1. Bác mệnh đề "tổng hai số vô tỉ luôn vô tỉ".
2. Bác mệnh đề "nếu $a \\mid bc$ thì $a \\mid b$ hoặc $a \\mid c$".

<details><summary>Đáp án</summary>

1. **Phản ví dụ**: $a = \\sqrt 2$, $b = -\\sqrt 2$ (đều vô tỉ) → $a + b = 0$ hữu tỉ. Mệnh đề sai. $\\square$
2. **Phản ví dụ**: $a = 4$, $b = 2$, $c = 2$ → $a \\mid bc = 4$ ✓, nhưng $4 \\nmid 2$. Mệnh đề sai. $\\square$ (Nó chỉ đúng khi $a$ nguyên tố — bổ đề Euclid.)

</details>

### 📝 Tóm tắt mục 6b

- Phản ví dụ bác mệnh đề $\\forall$: chỉ cần **một** trường hợp làm $P$ sai.
- "Đúng cho nhiều ví dụ" $\\ne$ "đúng mọi trường hợp" ($n^2+n+41$ tại $n=40$).
- **Không** dùng phản ví dụ để bác $\\exists$ — phải chứng minh "$\\forall \\neg P$".

---

## 6c. Vét cạn trường hợp & chứng minh duy nhất

### 6c.1. Vét cạn trường hợp (Proof by cases / exhaustion)

💡 **Trực giác / Hình dung**: khi không có lối đi chung, ta **chia mệnh đề thành hữu hạn trường hợp**, chứng minh từng cái, rồi gộp. Như muốn chứng minh "ai trong phòng cũng cao dưới 3m": nếu chỉ có 5 người, đo từng người là xong. Điều kiện sống còn: các trường hợp phải **phủ kín** mọi khả năng.

🎯 **Mẫu**: Để CM $P$, chia miền thành các trường hợp $C_1, C_2, \\dots, C_m$ (vét cạn: hợp lại bằng toàn bộ), chứng minh $P$ trong mỗi $C_i$.

#### Chứng minh mẫu 1 — $n(n+1)$ luôn chẵn

**Mệnh đề**: Với mọi $n \\in \\mathbb{Z}$, tích $n(n+1)$ là số chẵn.

Chia theo tính chẵn lẻ của $n$ (2 trường hợp phủ kín):
- **TH1 — $n$ chẵn**: $n = 2k$ → $n(n+1) = 2k(n+1)$ chia hết 2 → chẵn.
- **TH2 — $n$ lẻ**: $n+1$ chẵn → $n+1 = 2k$ → $n(n+1) = 2kn$ chia hết 2 → chẵn.

Cả hai trường hợp đều chẵn, và mọi số nguyên thuộc một trong hai. Vậy $n(n+1)$ chẵn. $\\square$

#### Chứng minh mẫu 2 — $n^3 - n$ chia hết cho 3

**Mệnh đề**: Với mọi $n \\in \\mathbb{Z}$, $3 \\mid (n^3 - n)$.

Phân tích $n^3 - n = (n-1)\\,n\\,(n+1)$ — tích ba số nguyên **liên tiếp**. Xét $n \\bmod 3$ (3 trường hợp phủ kín):
- **$n \\equiv 0$**: $3 \\mid n$ → $3 \\mid$ tích.
- **$n \\equiv 1$**: $n - 1 \\equiv 0$ → $3 \\mid (n-1)$ → $3 \\mid$ tích.
- **$n \\equiv 2$**: $n + 1 \\equiv 0$ → $3 \\mid (n+1)$ → $3 \\mid$ tích.

Trong cả ba trường hợp có một thừa số chia hết 3 → tích chia hết 3. $\\square$ (Verify: $n=5 \\Rightarrow 125-5 = 120 = 3\\cdot 40$ ✓.)

⚠ **Lỗi thường gặp — các trường hợp KHÔNG phủ kín.** Nếu chia "$n$ chẵn" và "$n$ chia hết 3" rồi dừng, ta bỏ sót $n = 5$ (lẻ và không chia hết 3). Luôn kiểm hợp các trường hợp $= $ toàn miền.

### 6c.2. Chứng minh tồn tại + duy nhất (Existence and uniqueness)

💡 **Trực giác / Hình dung**: mệnh đề "tồn tại **duy nhất** $x$ thoả $P$" gồm **hai lời hứa**: (1) **có** ít nhất một $x$ (tồn tại), và (2) **không có hai** $x$ khác nhau cùng thoả (duy nhất). Phải chứng minh **cả hai**.

🎯 **Mẫu hai phần**:
- **Tồn tại**: xây dựng hoặc chứng minh có $x_0$ thoả $P(x_0)$.
- **Duy nhất**: giả sử có $x_1, x_2$ cùng thoả $P$, chứng minh $x_1 = x_2$.

#### Chứng minh mẫu — Nghiệm của $2x + 6 = 0$ tồn tại và duy nhất

**Mệnh đề**: Phương trình $2x + 6 = 0$ có **đúng một** nghiệm thực.

- **Tồn tại**: chọn $x_0 = -3$. Kiểm: $2(-3) + 6 = 0$ ✓. Vậy có nghiệm.
- **Duy nhất**: giả sử $x_1, x_2$ đều là nghiệm:
$$\\begin{aligned}
2x_1 + 6 &= 0 \\;\\text{ và }\\; 2x_2 + 6 = 0 \\\\
\\Rightarrow 2x_1 + 6 &= 2x_2 + 6 \\\\
\\Rightarrow 2x_1 &= 2x_2 \\\\
\\Rightarrow x_1 &= x_2.
\\end{aligned}$$

Hai nghiệm bất kỳ phải trùng nhau → nghiệm duy nhất. $\\square$

⚠ **Lỗi thường gặp — chỉ chứng minh một nửa.** Tìm được $x_0 = -3$ rồi tuyên bố "vậy duy nhất" là **thiếu**: tồn tại không kéo theo duy nhất (vd $x^2 = 4$ tồn tại nghiệm nhưng có **hai**: $\\pm 2$). Phải làm tách bạch cả hai phần.

🔁 **Dừng lại tự kiểm tra**

1. CM bằng vét cạn: với mọi $n$, $n^2 \\bmod 4 \\in \\{0, 1\\}$.
2. Vì sao "$x^2 = 9$ có nghiệm" không kéo theo "nghiệm duy nhất"?

<details><summary>Đáp án</summary>

1. Hai TH: $n$ chẵn $= 2k$ → $n^2 = 4k^2 \\equiv 0$; $n$ lẻ $= 2k+1$ → $n^2 = 4(k^2+k)+1 \\equiv 1$. Phủ kín → $\\{0,1\\}$. $\\square$
2. Vì có **hai** nghiệm $x = 3$ và $x = -3$; tồn tại $\\ne$ duy nhất. Phần "duy nhất" ở đây **sai**.

</details>

### 📝 Tóm tắt mục 6c

- Vét cạn: chia thành hữu hạn TH **phủ kín**, chứng minh từng cái (chẵn/lẻ, $n \\bmod 3$…).
- Lỗi chính: các trường hợp không phủ kín toàn miền.
- "Tồn tại duy nhất" = **tồn tại** (dựng $x_0$) **+ duy nhất** (hai nghiệm phải bằng nhau). Phải làm cả hai.

---

## 6d. Cấu trúc một chứng minh tốt

💡 **Trực giác / Hình dung**: một chứng minh không chỉ cần **đúng** mà còn cần **đọc được**. Hình dung nó như một **lá thư gửi người đọc hoài nghi**: mỗi câu phải nói rõ "tôi đang giả sử gì", "bước này hợp lệ vì sao", "tôi đã tới đích chưa".

**Khung chuẩn của một chứng minh**:

\`\`\`
[1] Nêu rõ mệnh đề cần chứng minh (P → Q?  ∃?  ∀?).
[2] Tuyên bố phương pháp ("Ta chứng minh bằng phản chứng…").
[3] Khai báo giả thiết / giả định, đặt tên biến rõ ràng.
[4] Suy luận từng bước — mỗi bước kèm lý do (vì định nghĩa / định lý / đại số).
[5] Chỉ rõ đã đạt kết luận (hoặc mâu thuẫn).
[6] Ký hiệu kết thúc:  □  (hoặc Q.E.D.).
\`\`\`

⚠ **Các lỗi logic phổ biến — đừng mắc**

1. **Giả định điều cần chứng minh (begging the question / circular).** Để CM $Q$, không được lén dùng $Q$ làm giả thiết. Vd CM "$\\sqrt 2$ vô tỉ" mà giữa chừng dùng "vì $\\sqrt 2$ không viết được $a/b$" là vòng tròn.
2. **Một ví dụ ≠ chứng minh $\\forall$.** Kiểm $n = 1, 2, 3$ thấy đúng **không** chứng minh "mọi $n$" (xem $n^2+n+41$). Ngược lại, một phản ví dụ **đủ** để bác $\\forall$.
3. **Phản ví dụ không bác được $\\exists$.** Để bác "tồn tại X", phải loại **mọi** X, không phải chỉ ra một X hỏng.
4. **Lẫn đảo với phản đảo.** $P\\to Q$ tương đương $\\neg Q \\to \\neg P$ (phản đảo), **không** tương đương $Q \\to P$ (đảo). Vd "chia hết 4 → chẵn" đúng, đảo "chẵn → chia hết 4" sai ($6$).
5. **Trường hợp không phủ kín.** Vét cạn mà bỏ sót một trường hợp → kết luận vô giá trị.
6. **Chia cho 0 / khai căn mất dấu lén lút.** Bước "$a^2 = b^2 \\Rightarrow a = b$" bỏ mất $a = -b$ — nguồn của nhiều "chứng minh $1 = 2$".
7. **Dùng $\\neg Q$ suy ra $\\neg P$ rồi gọi là phản chứng** trong khi nó là phản đảo — không sai về kết quả nhưng nên viết gọn lại.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào được viết 'tương tự'?"* Chỉ khi bước lặp lại **y hệt** một bước đã viết đầy đủ ở trên (vd "TH $n$ lẻ chứng minh tương tự TH $n$ chẵn, thay $2k$ bằng $2k+1$"). Cấm dùng "tương tự"/"dễ thấy" để **giấu** một bước thực sự khó.
- *"$\\square$ và Q.E.D. khác gì?"* Giống nhau — đều đánh dấu kết thúc chứng minh. $\\square$ (hình vuông Halmos) là ký hiệu hiện đại; Q.E.D. (quod erat demonstrandum — "điều phải chứng minh") là cách cổ điển.

🔁 **Dừng lại tự kiểm tra**

1. Tìm lỗi: "CM mọi số chẵn $> 2$ là hợp số: $4 = 2\\cdot 2$, $6 = 2\\cdot 3$, $8 = 2\\cdot 4$, vậy đúng."
2. Tìm lỗi: "Vì $(-2)^2 = 2^2$ nên $-2 = 2$."

<details><summary>Đáp án</summary>

1. Lỗi **một ví dụ ≠ chứng minh $\\forall$** — mới kiểm 3 số, chưa chứng minh "mọi". (Mệnh đề này **đúng** nhưng cần lập luận tổng quát: số chẵn $> 2$ là $2k$ với $k\\ge 2$, có ước thực sự $2$.)
2. Lỗi **khai căn mất dấu**: $a^2 = b^2$ chỉ cho $a = \\pm b$, không phải $a = b$.

</details>

### 📝 Tóm tắt mục 6d

- Chứng minh tốt = đúng **và** đọc được: nêu mệnh đề → tuyên bố phương pháp → giả định → từng bước có lý do → kết luận → $\\square$.
- 7 lỗi logic: vòng tròn, ví dụ ≠ $\\forall$, phản ví dụ với $\\exists$, đảo ≠ phản đảo, TH không phủ kín, mất dấu/chia 0, phản chứng trá hình.
- Chỉ dùng "tương tự" khi thật sự lặp y hệt; cấm "dễ thấy" để giấu bước khó.

---

## 7. So sánh các phương pháp

| Phương pháp | Khi dùng | Ưu điểm |
|-------------|----------|---------|
| Trực tiếp | $P \\to Q$ rõ ràng | Đơn giản, sạch |
| Phản đảo | $P\\to Q$ mà $\\neg Q \\to \\neg P$ dễ hơn | Đích nhắm rõ, gọn |
| Phản chứng | Mệnh đề phủ định, "không tồn tại" | Mạnh, đa năng |
| Phản ví dụ | **Bác** mệnh đề $\\forall$ | Một ví dụ là đủ |
| Xây dựng | $\\exists$ "tồn tại" | Cho ví dụ cụ thể |
| Quy nạp | Mệnh đề về $\\mathbb{N}$ | Bài bản |
| Vét cạn trường hợp | Hữu hạn TH / lớp đồng dư | Kiểm hết là xong |
| Tồn tại + duy nhất | "Tồn tại duy nhất $x$" | Tách hai phần rõ ràng |

💡 **Quy tắc thực hành**:
1. Đọc kỹ mệnh đề. Đó là $P \\to Q$? $\\exists$? $\\forall$? Phủ định? "Duy nhất"?
2. Nếu cần **bác** một mệnh đề $\\forall$ → tìm phản ví dụ (một là đủ).
3. Nếu là $\\exists$ → cố **xây dựng** 1 ví dụ cụ thể.
4. Nếu là $\\forall n \\in \\mathbb{N}$ → quy nạp.
5. Nếu $P \\to Q$ → thử **trực tiếp**; khó thì **phản đảo** (nếu $\\neg Q$ đẹp).
6. Nếu **phủ định** / "không tồn tại" → **phản chứng** (hoặc modular argument).
7. Nếu biến chạy hữu hạn TH → **vét cạn**; nếu "tồn tại duy nhất" → tồn tại **+** duy nhất.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Một mệnh đề có thể chứng minh bằng nhiều cách không?"* Có. $\\sqrt{2}$ vô tỉ thường dùng phản chứng, nhưng cũng chứng minh được bằng định lý nghiệm hữu tỉ. Chọn cách **gọn và rõ** nhất.
- *"Gặp 'không tồn tại nghiệm' nên dùng gì đầu tiên?"* Thử modular argument (mục 6) hoặc phản chứng — hai vũ khí mạnh nhất cho mệnh đề phủ định.

🔁 **Dừng lại tự kiểm tra**

1. Mệnh đề "$\\exists$ số vô tỉ a, b: $a^b$ hữu tỉ" nên thử phương pháp nào?
2. "Nếu n² chẵn thì n chẵn" — phương pháp gọn nhất?

<details><summary>Đáp án</summary>

1. Xây dựng / không-xây-dựng (đây là $\\exists$) — xem bài 5.
2. Phản đảo: "n lẻ → n² lẻ" ($n = 2k+1$ → $n^2 = 4k^2+4k+1$ lẻ). □

</details>

### 📝 Tóm tắt mục 7

- Trực tiếp ($P \\to Q$ rõ), phản đảo ($\\neg Q \\to \\neg P$ dễ hơn), phản chứng (phủ định), phản ví dụ (bác $\\forall$), xây dựng ($\\exists$), quy nạp ($\\forall \\mathbb{N}$), vét cạn (hữu hạn TH), tồn tại+duy nhất.
- Quy trình chọn: đọc **dạng mệnh đề** → bác $\\forall$? dựng $\\exists$? quy nạp $\\mathbb{N}$? → còn lại thử trực tiếp, khó thì phản đảo/phản chứng.
- Một mệnh đề có thể có nhiều chứng minh — chọn cái **gọn và rõ** nhất.

---

### Bài tập

**Bài 1**: CM tổng 2 số nguyên tố lẻ là chẵn (chứng minh trực tiếp).

**Bài 2**: CM nếu $3 \\mid n^2$ thì $3 \\mid n$ (phản đảo).

**Bài 3**: CM $\\sqrt{3}$ vô tỉ (phản chứng).

**Bài 4**: PT $x^2 + y^2 = 4n + 3$ vô nghiệm (modular).

**Bài 5**: CM tồn tại 2 số vô tỉ a, b sao cho $a^b$ hữu tỉ. (Khó: chứng minh tồn tại không cần ví dụ cụ thể.)

**Bài 6**: Bác mệnh đề "Với mọi số tự nhiên $n$, $2^n - 1$ là số nguyên tố" (phản ví dụ).

**Bài 7**: CM bằng vét cạn trường hợp: với mọi số nguyên $n$, $n^2 + n$ là số chẵn.

**Bài 8**: CM phương trình $3x = 12$ có nghiệm thực **duy nhất** (tồn tại + duy nhất).

**Bài 9**: Tìm lỗi logic trong "chứng minh" sau: *"Mệnh đề: mọi số nguyên đều bằng 0. Chứng minh: gọi $n$ là số nguyên bất kỳ. Giả sử $n = 0$. Khi đó $n = 0$. Vậy mọi số nguyên bằng 0."*

### Lời giải

**Bài 1**: a, b nguyên tố lẻ → $a = 2k+1$, $b = 2m+1$ → $a+b = 2(k+m+1)$ → chẵn. □

**Bài 2**: Phản đảo: nếu $3 \\nmid n$ thì $3 \\nmid n^2$.  
- n không chia hết 3 → $n \\equiv 1$ hoặc $2 \\pmod 3$.  
- $n^2 \\equiv 1^2 = 1$ hoặc $2^2 = 4 \\equiv 1 \\pmod 3$.  
- → $n^2 \\not\\equiv 0 \\pmod 3$ → $3 \\nmid n^2$. □

**Bài 3**: Tương tự √2. Giả sử $\\sqrt{3} = a/b$ tối giản → $3b^2 = a^2$ → $3 \\mid a^2$ → $3 \\mid a$ → $a = 3c$ → $3b^2 = 9c^2$ → $b^2 = 3c^2$ → $3 \\mid b$. Mâu thuẫn tối giản.

**Bài 4**: $x^2, y^2 \\bmod 4 \\in \\{0, 1\\}$ → $x^2 + y^2 \\in \\{0, 1, 2\\}$. $4n+3 \\bmod 4 = 3 \\notin \\{0,1,2\\}$. □

**Bài 5**: Xét $a = \\sqrt{2}$, $b = \\sqrt{2}$. Xét $(\\sqrt{2})^{\\sqrt{2}}$:
- **Trường hợp 1**: $(\\sqrt{2})^{\\sqrt{2}}$ hữu tỉ → $a = b = \\sqrt{2}$ (vô tỉ), $a^b$ hữu tỉ. ✓
- **Trường hợp 2**: $(\\sqrt{2})^{\\sqrt{2}}$ vô tỉ → đặt $a = (\\sqrt{2})^{\\sqrt{2}}$, $b = \\sqrt{2}$.  
  $a^b = ((\\sqrt{2})^{\\sqrt{2}})^{\\sqrt{2}} = (\\sqrt{2})^{\\sqrt{2}\\cdot\\sqrt{2}} = (\\sqrt{2})^2 = 2$ (hữu tỉ). ✓

⟶ 1 trong 2 trường hợp đúng, nên có cặp. Nhưng ta **không biết cặp nào**! Đây là **chứng minh không xây dựng** (non-constructive).

**Bài 6**: **Phản ví dụ**. Chọn $n = 4$: $2^4 - 1 = 15 = 3\\times 5$ là hợp số → mệnh đề sai. $\\square$ (Cũng đúng với $n=6$: $2^6-1 = 63 = 7\\times 9$. Chỉ cần **một** phản ví dụ.)

**Bài 7**: **Vét cạn** theo tính chẵn lẻ của $n$ (2 TH phủ kín):
- TH $n$ chẵn: $n = 2k$ → $n^2 + n = n(n+1) = 2k(n+1)$ → chẵn.
- TH $n$ lẻ: $n + 1$ chẵn $= 2k$ → $n^2 + n = n\\cdot 2k$ → chẵn.

Cả hai TH đều chẵn. $\\square$ (Hoặc gọn hơn: $n^2 + n = n(n+1)$ là tích hai số nguyên liên tiếp, luôn chẵn — xem mục 6c.1.)

**Bài 8**: **Hai phần**.
- *Tồn tại*: chọn $x_0 = 4$. Kiểm $3\\cdot 4 = 12$ ✓.
- *Duy nhất*: giả sử $x_1, x_2$ đều là nghiệm → $3x_1 = 12 = 3x_2$ → $3x_1 = 3x_2$ → chia 2 vế cho $3 \\neq 0$ → $x_1 = x_2$.

Vậy nghiệm tồn tại và duy nhất. $\\square$

**Bài 9**: **Lỗi** — "chứng minh" này **giả định điều cần chứng minh cho một trường hợp rồi phổ quát hoá sai**. Câu "Giả sử $n = 0$" là một **giả định không có cơ sở**: $n$ được nói là "số nguyên bất kỳ", không có quyền ép $n = 0$. Từ một giả định sai, mọi thứ sau đó vô giá trị. Đúng ra để bác mệnh đề "mọi số nguyên bằng 0", chỉ cần **phản ví dụ**: $1 \\neq 0$. $\\square$

---

## 9. 🎉 HOÀN THÀNH TIER 5 (8/8)!

Tiếp theo: **Tier 6 — Advanced** (Đại số tuyến tính, Calculus đa biến, Xác suất, ODE).

## 📝 Tổng kết Tier 5

1. **Số học**: chia hết, GCD, Euclid, Bezout.
2. **Nguyên tố**: phân tích duy nhất, Fermat nhỏ, Euler.
3. **Tổ hợp**: hoán vị, chỉnh hợp, tổ hợp; Pascal & nhị thức Newton.
4. **Dirichlet & bù trừ**: kỹ thuật đếm cao cấp.
5. **Quy nạp**: chứng minh mệnh đề về $\\mathbb{N}$.
6. **Logic & ánh xạ**: mệnh đề, lượng từ, đơn/toàn/song ánh.
7. **Phương pháp chứng minh**: trực tiếp, phản đảo, phản chứng, phản ví dụ, xây dựng, quy nạp, vét cạn trường hợp, tồn tại+duy nhất — kèm cấu trúc một chứng minh tốt và các lỗi logic cần tránh.

🎉 Đây là **bộ công cụ** cần thiết để học toán nâng cao.
`;
