// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataFoundations/03-MathFoundations/lesson-05-proof-induction/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Proof Techniques & Mathematical Induction (Chứng minh & Quy nạp toán học)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao "chạy thử thấy ổn" ≠ chứng minh** — và khi nào bắt buộc cần chứng minh trong CS (correctness, độ phức tạp, loop invariant, đệ quy).
- Nắm 4 kiểu chứng minh nền: **trực tiếp (direct)**, **phản chứng (contradiction)**, **phản đảo (contrapositive)**, và **phản ví dụ (counterexample)** để bác mệnh đề.
- Hiểu và tự viết được **quy nạp toán học yếu (weak induction)**: cấu trúc base case + bước quy nạp (giả thiết quy nạp IH → chứng minh $n+1$).
- Phân biệt **quy nạp mạnh (strong induction)** — giả thiết đúng cho **mọi** $k \\le n$ — và biết khi nào cần nó.
- Thấy **quy nạp ↔ đệ quy (recursion) ↔ loop invariant** là **cùng một ý tưởng** ở ba ngôn ngữ khác nhau.
- Nhận diện các **lỗi quy nạp kinh điển** (quên/sai base case, giả thiết nhầm điều cần chứng minh).
- Áp dụng quy nạp vào CS thật: độ cao/số node cây nhị phân, tổng chi phí đệ quy, đúng đắn thuật toán.

## Kiến thức tiền đề

- [Set Theory](../lesson-01-set-theory/) — ký hiệu $\\in$, $\\forall$, miền xác định.
- [Boolean Logic](../lesson-02-boolean-logic/) — implication $p \\to q$, phản đảo $\\lnot q \\to \\lnot p$, De Morgan. **Cần kỹ** cho mục chứng minh phản đảo.
- [Combinatorics](../lesson-03-combinatorics/) — tổng các dãy, công thức đếm (dùng làm đối tượng chứng minh).
- [Modular Arithmetic](../lesson-04-modular-arithmetic/) — chia hết, đồng dư (dùng cho ví dụ "$6 \\mid n^3 - n$").

## 1. Vì sao học chứng minh? "Chạy thử thấy ổn" không phải là chứng minh

💡 **Trực giác.** Bạn viết hàm \`sum(n)\` trả về $1 + 2 + \\dots + n$, rồi test \`sum(1)=1\`, \`sum(2)=3\`, \`sum(10)=55\`. Tất cả khớp với công thức $\\frac{n(n+1)}{2}$. Bạn kết luận công thức đúng. Nhưng bạn mới kiểm tra **vài** giá trị — còn $n = 10^{18}$ thì sao? Có **vô hạn** giá trị $n$; không thể test hết. Test cho bạn **niềm tin**, không cho bạn **bảo đảm**.

**Câu hỏi mở của bài (sẽ giải trong §4):** *Vì sao $1 + 2 + \\dots + n = \\dfrac{n(n+1)}{2}$ đúng với **MỌI** số nguyên dương $n$, chứ không chỉ vài giá trị ta thử?*

Trong khoa học máy tính, chứng minh không phải là "toán cho vui" — nó là công cụ làm việc:

- **Tính đúng đắn (correctness):** thuật toán **luôn** trả kết quả đúng với mọi đầu vào hợp lệ? Test chỉ phủ một số case; chứng minh phủ tất cả.
- **Độ phức tạp:** "thuật toán này chạy $O(n \\log n)$" là một **mệnh đề toán học** cần chứng minh, không phải đo một lần rồi tin.
- **Loop invariant:** để chắc vòng lặp đúng, ta nêu một tính chất giữ nguyên qua mỗi vòng và **chứng minh bằng quy nạp**.
- **Đệ quy:** hàm đệ quy đúng vì lời gọi nhỏ hơn đúng — đó **chính là** quy nạp.

⚠ **Lỗi tư duy thường gặp.** "Tôi chạy 1000 test random, không lỗi nào → code đúng." Sai. Bug có thể nấp ở đúng cái case bạn không random trúng (overflow ở $n$ lớn, off-by-one ở mảng rỗng). Ví dụ kinh điển: biểu thức $n^2 + n + 41$ cho số nguyên tố với $n = 0, 1, 2, \\dots, 39$ (40 giá trị liên tiếp!) nhưng **sai** tại $n = 40$ ($40^2 + 40 + 41 = 1681 = 41^2$, không nguyên tố). 40 lần thử đúng vẫn không chứng minh được gì.

📝 **Tóm tắt mục 1.**
- Test = vài giá trị → niềm tin; chứng minh = mọi giá trị → bảo đảm.
- CS dùng chứng minh cho correctness, độ phức tạp, loop invariant, đệ quy.
- Một mệnh đề có thể đúng ở hàng triệu giá trị đầu rồi gãy ($n^2+n+41$ tại $n=40$).

## 2. Các kiểu chứng minh nền

Trước khi vào quy nạp, cần 4 "khuôn" chứng minh cơ bản. Mọi chứng minh đều là việc đi từ **giả thiết** tới **kết luận** bằng các bước logic hợp lệ.

### 2.1. Chứng minh trực tiếp (direct proof)

💡 **Trực giác.** Đi thẳng: giả sử giả thiết đúng, dùng định nghĩa + đại số kéo tới kết luận. Để chứng minh $p \\to q$, ta giả sử $p$ và suy ra $q$.

**Định lý.** Nếu $n$ là số nguyên chẵn thì $n^2$ chẵn.

**Chứng minh.**
1. Giả sử $n$ chẵn. Theo định nghĩa, tồn tại số nguyên $k$ sao cho $n = 2k$.
2. Bình phương: $n^2 = (2k)^2 = 4k^2 = 2\\,(2k^2)$.
3. Đặt $m = 2k^2$ (là số nguyên vì $k$ nguyên). Khi đó $n^2 = 2m$.
4. Theo định nghĩa, $n^2$ chia hết cho 2, tức $n^2$ chẵn. $\\blacksquare$

**Bốn ví dụ số** (kiểm chứng $n = 2k \\Rightarrow n^2 = 2(2k^2)$):

| $n$ | $k = n/2$ | $n^2$ | $2k^2$ | $n^2 = 2 \\cdot (2k^2)$? |
| --- | --- | --- | --- | --- |
| 2 | 1 | 4 | 2 | $4 = 2 \\cdot 2$ ✓ |
| 4 | 2 | 16 | 8 | $16 = 2 \\cdot 8$ ✓ |
| 6 | 3 | 36 | 18 | $36 = 2 \\cdot 18$ ✓ |
| 10 | 5 | 100 | 50 | $100 = 2 \\cdot 50$ ✓ |

### 2.2. Chứng minh phản đảo (contrapositive)

💡 **Trực giác.** Mệnh đề $p \\to q$ **tương đương logic** với phản đảo $\\lnot q \\to \\lnot p$ (đã thấy ở [Boolean Logic](../lesson-02-boolean-logic/)). Đôi khi chứng minh chiều ngược dễ hơn nhiều.

Kiểm chứng tương đương bằng bảng chân lý:

| $p$ | $q$ | $p \\to q$ | $\\lnot q$ | $\\lnot p$ | $\\lnot q \\to \\lnot p$ |
| --- | --- | --- | --- | --- | --- |
| T | T | **T** | F | F | **T** |
| T | F | **F** | T | F | **F** |
| F | T | **T** | F | T | **T** |
| F | F | **T** | T | T | **T** |

→ Cột $p \\to q$ trùng cột $\\lnot q \\to \\lnot p$ từng hàng → tương đương. Chứng minh cái này = chứng minh cái kia.

**Định lý.** Nếu $n^2$ lẻ thì $n$ lẻ.

Chứng minh trực tiếp khó (từ "$n^2$ lẻ" khó moi thông tin về $n$). Dùng phản đảo: *"Nếu $n$ chẵn thì $n^2$ chẵn"* — chính là §2.1 đã chứng minh! Vậy mệnh đề gốc đúng. $\\blacksquare$

⚠ **Đừng nhầm phản đảo với mệnh đề đảo.** Đảo của $p \\to q$ là $q \\to p$ — **KHÔNG** tương đương với mệnh đề gốc. Ví dụ: "trời mưa $\\to$ đường ướt" đúng, nhưng đảo "đường ướt $\\to$ trời mưa" sai (xe rửa cũng làm ướt đường). Chỉ **phản đảo** $\\lnot q \\to \\lnot p$ mới tương đương.

### 2.3. Chứng minh phản chứng (proof by contradiction)

💡 **Trực giác.** Muốn chứng minh $P$ đúng, ta **giả sử $P$ sai**, rồi dẫn ra một điều vô lý (mâu thuẫn). Vì giả thiết "$P$ sai" dẫn tới vô lý, nó phải sai — tức $P$ đúng.

**Định lý kinh điển 1 — $\\sqrt{2}$ là số vô tỉ.**

**Chứng minh.**
1. Giả sử ngược lại: $\\sqrt{2}$ **hữu tỉ**, tức $\\sqrt{2} = \\dfrac{a}{b}$ với $a, b$ nguyên, $b \\neq 0$, và **phân số tối giản** ($\\gcd(a,b) = 1$).
2. Bình phương hai vế: $2 = \\dfrac{a^2}{b^2}$, suy ra $a^2 = 2b^2$.
3. Vế phải chia hết cho 2 → $a^2$ chẵn → (theo §2.2) $a$ chẵn. Viết $a = 2c$.
4. Thay vào: $(2c)^2 = 2b^2 \\Rightarrow 4c^2 = 2b^2 \\Rightarrow b^2 = 2c^2$.
5. Vậy $b^2$ chẵn → $b$ chẵn.
6. Nhưng nếu **cả $a$ và $b$ đều chẵn** thì chúng có ước chung 2 → mâu thuẫn với giả thiết $\\gcd(a,b)=1$ ở bước 1.
7. Mâu thuẫn → giả sử ban đầu sai → $\\sqrt{2}$ vô tỉ. $\\blacksquare$

**Định lý kinh điển 2 — Có vô hạn số nguyên tố (Euclid).**

**Chứng minh.**
1. Giả sử ngược lại: chỉ có **hữu hạn** số nguyên tố, liệt kê hết là $p_1, p_2, \\dots, p_k$.
2. Xét số $N = p_1 \\cdot p_2 \\cdots p_k + 1$ (nhân tất cả lại rồi cộng 1).
3. $N > 1$, nên $N$ phải có ít nhất một ước nguyên tố $q$.
4. $q$ phải nằm trong danh sách $p_1, \\dots, p_k$ (vì đó là **tất cả** số nguyên tố theo giả thiết).
5. Nhưng khi chia $N$ cho bất kỳ $p_i$ nào, ta luôn **dư 1** (vì $N$ bằng bội của $p_i$ cộng 1). Vậy không $p_i$ nào chia hết $N$.
6. Mâu thuẫn: $q$ vừa là một $p_i$ (bước 4) vừa không chia hết $N$ (bước 5). $\\blacksquare$

   *Ví dụ minh họa bước 2:* nếu danh sách là $\\{2,3,5\\}$ thì $N = 2 \\cdot 3 \\cdot 5 + 1 = 31$, là số nguyên tố mới ngoài danh sách. Nếu là $\\{2,3,5,7,11,13\\}$ thì $N = 30031 = 59 \\times 509$ — ước nguyên tố $59, 509$ đều ngoài danh sách. Dù $N$ có nguyên tố hay không, nó **luôn** lòi ra ước ngoài danh sách.

### 2.4. Phản ví dụ (counterexample) — để **bác** mệnh đề

💡 **Trực giác.** Để chứng minh "$\\forall n, P(n)$" **đúng**, phải xét mọi $n$. Nhưng để chứng minh nó **sai**, chỉ cần **một** $n$ làm $P(n)$ sai. Đó là phản ví dụ.

**Mệnh đề (sai):** "$2^n - 1$ là số nguyên tố với mọi $n \\ge 2$."

Thử: $2^2 - 1 = 3$ ✓ nguyên tố; $2^3 - 1 = 7$ ✓; $2^5 - 1 = 31$ ✓. Nhưng:
$$2^4 - 1 = 15 = 3 \\times 5 \\quad (\\text{không nguyên tố})$$
→ $n = 4$ là phản ví dụ. Mệnh đề bị bác. (Cũng vậy: $2^{11} - 1 = 2047 = 23 \\times 89$.)

⚠ **Bất đối xứng.** Một phản ví dụ đủ để **bác**, nhưng một triệu ví dụ đúng **không** đủ để **khẳng định** (xem $n^2+n+41$ ở §1). Khẳng định "với mọi" cần chứng minh; bác bỏ "với mọi" chỉ cần một case.

❓ **Câu hỏi tự nhiên.**
- *"Phản chứng và phản đảo khác gì nhau?"* — Phản đảo chứng minh $p \\to q$ bằng cách chứng minh $\\lnot q \\to \\lnot p$ (vẫn là chứng minh trực tiếp, chỉ đổi chiều). Phản chứng giả sử **toàn bộ kết luận sai** rồi tìm mâu thuẫn với **bất kỳ** điều gì đã biết.
- *"Khi nào dùng cái nào?"* — Direct khi suy thẳng được; contrapositive khi giả thiết "$q$ sai" cho thông tin dễ dùng hơn; contradiction khi muốn dùng "không tồn tại / tối giản / nhỏ nhất" làm đòn bẩy; counterexample khi nghi mệnh đề sai.

🔁 **Dừng lại tự kiểm tra.**
1. Để bác "mọi số lẻ là nguyên tố", cần làm gì?
2. Phản đảo của "nếu $x > 2$ thì $x^2 > 4$" là gì?

<details><summary>Đáp án</summary>

1. Đưa **một** phản ví dụ: $9 = 3 \\times 3$ là số lẻ nhưng không nguyên tố. Xong.
2. "Nếu $x^2 \\le 4$ thì $x \\le 2$." (Phủ định kết luận → phủ định giả thiết; nhớ $>$ phủ định thành $\\le$.)
</details>

📝 **Tóm tắt mục 2.**
- **Direct:** giả sử $p$, suy ra $q$.
- **Contrapositive:** chứng minh $\\lnot q \\to \\lnot p$ (tương đương $p \\to q$). Khác mệnh đề đảo $q \\to p$.
- **Contradiction:** giả sử kết luận sai → mâu thuẫn ($\\sqrt{2}$ vô tỉ, vô hạn nguyên tố).
- **Counterexample:** một case là đủ để bác "với mọi".

## 3. Quy nạp toán học (weak induction)

### 3.1. Trực giác: domino và cái thang

💡 **Trực giác domino.** Bạn xếp vô hạn quân domino thành hàng. Muốn chắc **tất cả** đều đổ, cần đúng hai điều:

1. **Base case:** quân **đầu tiên** đổ.
2. **Bước quy nạp:** **mỗi** quân khi đổ thì làm quân **kế tiếp** đổ (quân $n$ đổ $\\Rightarrow$ quân $n+1$ đổ).

Có cả hai → đẩy quân đầu, hiệu ứng lan vô hạn → tất cả đổ. Thiếu base (không ai đẩy quân đầu) → không quân nào đổ dù "đổ thì lan" vẫn đúng. Thiếu bước quy nạp (có khoảng trống giữa hai quân) → đổ tới đó là dừng.

**Trực giác cái thang:** muốn leo tới **mọi** bậc thang: (1) leo được lên bậc 1; (2) đứng ở bậc bất kỳ thì bước lên được bậc trên. Hai điều này → tới được bậc bất kỳ.

### 3.2. Cấu trúc hình thức

Muốn chứng minh $P(n)$ đúng với mọi số nguyên $n \\ge n_0$:

$$
\\underbrace{P(n_0)\\ \\text{đúng}}_{\\text{Base case}}
\\quad\\wedge\\quad
\\underbrace{\\big(\\forall n \\ge n_0:\\ P(n) \\to P(n+1)\\big)}_{\\text{Bước quy nạp}}
\\quad\\Longrightarrow\\quad
\\forall n \\ge n_0:\\ P(n).
$$

Trong **bước quy nạp**, ta **giả sử** $P(n)$ đúng — gọi là **giả thiết quy nạp (Induction Hypothesis, IH)** — rồi chứng minh từ đó suy ra $P(n+1)$.

⚠ **"Giả sử $P(n)$ đúng" có phải là giả sử điều cần chứng minh không?** Không — đây là chỗ người mới hay hoảng. Ta **không** giả sử "$P(n)$ đúng với mọi $n$" (cái cần chứng minh). Ta chỉ giả sử $P(n)$ cho **một** $n$ cụ thể để suy ra $P(n+1)$. Đó là chứng minh **bước nối** "$P(n) \\to P(n+1)$" — bản thân nó là một implication, hoàn toàn hợp lệ để giả sử vế trái.

📝 **Tóm tắt mục 3.**
- Quy nạp = base case + bước nối $P(n) \\to P(n+1)$.
- IH = giả sử $P(n)$ đúng cho một $n$, để suy $P(n+1)$ — không phải giả sử điều cần chứng minh.
- Thiếu base hoặc thiếu bước nối → toàn bộ sụp.

## 4. Walk-through đầy đủ: ba chứng minh quy nạp

### 4.1. Tổng $1 + 2 + \\dots + n = \\dfrac{n(n+1)}{2}$ — trả lời câu hỏi mở §1

Đặt $P(n)$: "$1 + 2 + \\dots + n = \\dfrac{n(n+1)}{2}$".

**Base case ($n = 1$).** Vế trái $= 1$. Vế phải $= \\dfrac{1 \\cdot (1+1)}{2} = \\dfrac{2}{2} = 1$. Hai vế bằng nhau → $P(1)$ đúng.

**Bước quy nạp.** Giả sử $P(n)$ đúng (IH):
$$1 + 2 + \\dots + n = \\frac{n(n+1)}{2}.$$
Cần chứng minh $P(n+1)$:
$$1 + 2 + \\dots + n + (n+1) = \\frac{(n+1)(n+2)}{2}.$$
Biến đổi vế trái, **tách số hạng cuối** rồi thay IH vào:
$$
\\begin{aligned}
\\underbrace{1 + 2 + \\dots + n}_{\\text{dùng IH}} + (n+1)
&= \\frac{n(n+1)}{2} + (n+1) && \\text{(thay IH)} \\\\
&= \\frac{n(n+1)}{2} + \\frac{2(n+1)}{2} && \\text{(quy đồng)} \\\\
&= \\frac{n(n+1) + 2(n+1)}{2} && \\text{(cộng tử)} \\\\
&= \\frac{(n+1)(n+2)}{2}. && \\text{(đặt nhân tử chung } (n+1))
\\end{aligned}
$$
Đây đúng là vế phải của $P(n+1)$. Vậy $P(n) \\to P(n+1)$.

**Kết luận.** Base + bước nối → $P(n)$ đúng với **mọi** $n \\ge 1$. $\\blacksquare$ Đây chính là lời đáp cho câu hỏi mở: công thức đúng cho mọi $n$ vì domino đầu đổ ($n=1$) và mỗi quân đẩy quân kế tiếp.

**Bảng kiểm chứng giá trị nhỏ:**

| $n$ | $1+\\dots+n$ | $\\dfrac{n(n+1)}{2}$ |
| --- | --- | --- |
| 1 | 1 | $\\frac{1\\cdot2}{2}=1$ |
| 2 | 3 | $\\frac{2\\cdot3}{2}=3$ |
| 3 | 6 | $\\frac{3\\cdot4}{2}=6$ |
| 4 | 10 | $\\frac{4\\cdot5}{2}=10$ |
| 5 | 15 | $\\frac{5\\cdot6}{2}=15$ |

### 4.2. Tổng lũy thừa của 2: $2^0 + 2^1 + \\dots + 2^n = 2^{n+1} - 1$

Đặt $P(n)$: "$\\sum_{i=0}^{n} 2^i = 2^{n+1} - 1$".

**Base case ($n = 0$).** Vế trái $= 2^0 = 1$. Vế phải $= 2^{0+1} - 1 = 2 - 1 = 1$. Bằng nhau → $P(0)$ đúng.

**Bước quy nạp.** IH: $2^0 + \\dots + 2^n = 2^{n+1} - 1$. Cần: $2^0 + \\dots + 2^n + 2^{n+1} = 2^{n+2} - 1$.
$$
\\begin{aligned}
\\underbrace{2^0 + \\dots + 2^n}_{\\text{dùng IH}} + 2^{n+1}
&= (2^{n+1} - 1) + 2^{n+1} && \\text{(thay IH)} \\\\
&= 2 \\cdot 2^{n+1} - 1 && \\text{(gộp hai } 2^{n+1}) \\\\
&= 2^{n+2} - 1. && (2 \\cdot 2^{n+1} = 2^{n+2})
\\end{aligned}
$$
Đúng vế phải $P(n+1)$. $\\blacksquare$

💡 **Ý nghĩa CS.** Đây là lý do số nhị phân $\\underbrace{11\\dots1}_{n+1 \\text{ bit}}$ (tất cả bit 1) bằng $2^{n+1} - 1$. Vd 8 bit \`11111111\` $= 2^8 - 1 = 255$. Cũng là tổng số node của cây nhị phân đầy độ cao $n$ (xem §8).

**Bảng kiểm chứng:**

| $n$ | $2^0+\\dots+2^n$ | $2^{n+1}-1$ |
| --- | --- | --- |
| 0 | 1 | $2^1-1=1$ |
| 1 | $1+2=3$ | $2^2-1=3$ |
| 2 | $1+2+4=7$ | $2^3-1=7$ |
| 3 | $1+2+4+8=15$ | $2^4-1=15$ |
| 4 | $\\dots=31$ | $2^5-1=31$ |

### 4.3. Chia hết: $6 \\mid n^3 - n$ với mọi $n \\ge 0$

Đặt $P(n)$: "$n^3 - n$ chia hết cho 6". (Liên hệ [Modular Arithmetic](../lesson-04-modular-arithmetic/): "$6 \\mid x$" nghĩa là $x \\equiv 0 \\pmod 6$.)

**Base case ($n = 0$).** $0^3 - 0 = 0$, và $6 \\mid 0$ (vì $0 = 6 \\cdot 0$). → $P(0)$ đúng.

**Bước quy nạp.** IH: $6 \\mid (n^3 - n)$, tức tồn tại số nguyên $q$ với $n^3 - n = 6q$. Cần: $6 \\mid \\big((n+1)^3 - (n+1)\\big)$.

Khai triển **từng dòng**, không bỏ bước:
$$
\\begin{aligned}
(n+1)^3 - (n+1)
&= (n^3 + 3n^2 + 3n + 1) - (n + 1) && \\text{(khai triển } (n+1)^3 \\text{ và } -(n+1)) \\\\
&= n^3 + 3n^2 + 3n + 1 - n - 1 \\\\
&= (n^3 - n) + (3n^2 + 3n) && \\text{(nhóm lại để lòi ra } n^3-n) \\\\
&= (n^3 - n) + 3n(n + 1). && \\text{(đặt nhân tử } 3n)
\\end{aligned}
$$
Xét hai số hạng:
- $(n^3 - n) = 6q$ chia hết cho 6 (theo IH).
- $3n(n+1)$: tích **hai số nguyên liên tiếp** $n(n+1)$ luôn chẵn (một trong hai phải chẵn), nên $n(n+1) = 2t$ với $t$ nguyên → $3n(n+1) = 3 \\cdot 2t = 6t$ chia hết cho 6.

Vậy $(n+1)^3 - (n+1) = 6q + 6t = 6(q + t)$ chia hết cho 6. → $P(n+1)$ đúng. $\\blacksquare$

**Bảng kiểm chứng:**

| $n$ | $n^3 - n$ | $\\div 6$ |
| --- | --- | --- |
| 0 | 0 | 0 |
| 1 | 0 | 0 |
| 2 | 6 | 1 |
| 3 | 24 | 4 |
| 4 | 60 | 10 |
| 5 | 120 | 20 |

🔁 **Dừng lại tự kiểm tra.** Trong §4.1, ở dòng "$\\frac{n(n+1)}{2} + (n+1)$", vì sao ta viết $(n+1) = \\frac{2(n+1)}{2}$?

<details><summary>Đáp án</summary>

Để **quy đồng mẫu số** về 2, nhằm cộng hai phân số. $(n+1) = \\frac{(n+1)\\cdot 2}{2}$. Sau đó cộng tử số: $n(n+1) + 2(n+1)$, rồi đặt nhân tử chung $(n+1)$ ra ngoài → $(n+1)(n+2)$.
</details>

📝 **Tóm tắt mục 4.** Quy trình lặp lại 3 lần: (1) nêu $P(n)$; (2) base case verify hai vế bằng số; (3) bước nối — viết IH, biến đổi vế trái của $P(n+1)$ tới khi **chèn được IH vào**, rồi đại số tới vế phải. Mẹo chung: **tách số hạng mới** ($n+1$) ra để phần còn lại khớp IH.

## 5. Quy nạp mạnh (strong induction)

💡 **Khác biệt với quy nạp yếu.** Quy nạp yếu: chứng minh $P(n+1)$ chỉ dùng $P(n)$ (quân ngay trước). Quy nạp mạnh: chứng minh $P(n+1)$ được phép dùng **tất cả** $P(n_0), P(n_0+1), \\dots, P(n)$ (mọi quân trước đó). Hình dung domino mà mỗi quân cần **nhiều** quân trước cùng đổ mới đổ được.

$$
\\big(\\forall k,\\ n_0 \\le k \\le n:\\ P(k)\\big) \\to P(n+1).
$$

Hai dạng **tương đương về sức mạnh** (cái nào chứng minh được thì cái kia cũng được), nhưng strong tiện khi $P(n+1)$ phụ thuộc các giá trị **nhỏ hơn nhiều**, không chỉ $n$.

### 5.1. Ví dụ: mọi $n \\ge 2$ phân tích được thành tích số nguyên tố

Đặt $P(n)$: "$n$ viết được thành tích của một hoặc nhiều số nguyên tố".

**Base case ($n = 2$).** $2$ là số nguyên tố → bản thân nó là một "tích" gồm một thừa số nguyên tố. $P(2)$ đúng.

**Bước quy nạp (mạnh).** Giả sử $P(k)$ đúng với **mọi** $k$ thỏa $2 \\le k \\le n$. Xét $n+1$:
- **Trường hợp 1:** $n+1$ là số nguyên tố → xong (chính nó là tích một thừa số).
- **Trường hợp 2:** $n+1$ là hợp số → theo định nghĩa, $n+1 = a \\cdot b$ với $2 \\le a, b \\le n$ (cả hai **nhỏ hơn** $n+1$). Theo IH mạnh, $a$ và $b$ đều phân tích được thành tích nguyên tố. Ghép hai phân tích lại → $n+1$ phân tích được. $\\blacksquare$

⚠ **Vì sao yếu không đủ ở đây?** Vì $a, b$ có thể nhỏ hơn $n$ rất nhiều (vd $n+1 = 100 = 4 \\cdot 25$, cần $P(4)$ và $P(25)$, không phải $P(99)$). Quy nạp yếu chỉ cho dùng $P(n)$ — không với tới $P(4), P(25)$ được.

### 5.2. Ví dụ: bài toán tem 4 & 5 — mọi bưu phí $\\ge 12$ ghép được từ tem 4 và 5

Đặt $P(n)$: "$n$ viết được dưới dạng $4a + 5b$ với $a, b$ nguyên không âm", cho $n \\ge 12$.

**Base cases (cần 4 cái).** Vì bước nối sẽ lùi 4 đơn vị, ta cần kiểm 4 giá trị liên tiếp:
$$12 = 4 \\cdot 3,\\quad 13 = 4 \\cdot 2 + 5,\\quad 14 = 4 + 5 \\cdot 2,\\quad 15 = 5 \\cdot 3.$$
Cả $P(12), P(13), P(14), P(15)$ đúng.

**Bước quy nạp (mạnh).** Với $n \\ge 16$, giả sử $P(k)$ đúng cho mọi $12 \\le k < n$. Xét $n$: vì $n \\ge 16$, ta có $n - 4 \\ge 12$, nên theo IH $P(n-4)$ đúng: $n - 4 = 4a + 5b$. Thêm một tem 4: $n = 4(a+1) + 5b$. → $P(n)$ đúng. $\\blacksquare$

**Bảng kiểm chứng:**

| $n$ | Cách ghép |
| --- | --- |
| 12 | $4+4+4$ |
| 13 | $4+4+5$ |
| 14 | $4+5+5$ |
| 15 | $5+5+5$ |
| 16 | $4+4+4+4$ (= $P(12)+$ một tem 4) |
| 17 | $4+13$ → $4+4+4+5$ |

❓ **Câu hỏi tự nhiên.**
- *"Vì sao cần tới 4 base case?"* — Vì bước nối dùng $P(n-4)$. Để mọi $n \\ge 16$ "với tới" một base hợp lệ, bốn lớp dư khi chia 4 ($n \\equiv 0,1,2,3$) mỗi lớp cần một điểm khởi đầu — đó là 12,13,14,15. Nếu chỉ có 1 base, vài lớp dư sẽ hổng.
- *"Strong với weak — chọn sao?"* — Mặc định thử weak. Nếu bước nối cần giá trị nhỏ hơn $n$ (phân tích thừa số, Fibonacci, lùi nhiều bước) → strong.

📝 **Tóm tắt mục 5.**
- Weak dùng $P(n)$; strong dùng **mọi** $P(k), k \\le n$.
- Số base case phải đủ phủ "tầm với" của bước nối (tem 4&5 cần 4 base).
- Strong cần cho: phân tích nguyên tố, Fibonacci, đệ quy chia đôi.

## 6. Quy nạp ↔ Đệ quy ↔ Loop invariant — cùng một ý tưởng

Đây là mục "đắt" nhất cho dân CS: ba khái niệm tưởng khác nhau thực ra **đồng nhất**.

| | Quy nạp | Đệ quy | Loop invariant |
| --- | --- | --- | --- |
| Điểm neo | Base case $P(n_0)$ | Base case (điều kiện dừng) | Invariant đúng **trước** vòng đầu (initialization) |
| Bước nối | $P(n) \\to P(n+1)$ | Lời gọi nhỏ hơn đúng → lời gọi này đúng | Invariant giữ qua mỗi vòng (maintenance) |
| Kết luận | $\\forall n,\\ P(n)$ | Hàm đúng với mọi input | Invariant + điều kiện dừng → kết quả đúng (termination) |

### 6.1. Chứng minh hàm đệ quy đúng = quy nạp

Xét hàm tính giai thừa:
\`\`\`go
func fact(n int) int {
    if n == 0 { return 1 }      // base case
    return n * fact(n-1)        // bước đệ quy
}
\`\`\`
**Mệnh đề $P(n)$:** \`fact(n)\` trả về $n! = 1 \\cdot 2 \\cdots n$ (với $0! = 1$).

- **Base ($n=0$):** code trả \`1\`, và $0! = 1$ ✓.
- **Bước (IH):** giả sử \`fact(n-1)\` trả đúng $(n-1)!$. Khi đó \`fact(n)\` trả \`n * fact(n-1)\` $= n \\cdot (n-1)! = n!$ ✓.

→ Hàm đúng với mọi $n \\ge 0$. Cấu trúc đệ quy **soi gương** cấu trúc quy nạp: \`if n==0\` là base case, lời gọi \`fact(n-1)\` là IH.

### 6.2. Loop invariant — quy nạp trên số vòng lặp

Phiên bản vòng lặp của tổng $1+\\dots+n$:
\`\`\`go
func sum(n int) int {
    s := 0
    for i := 1; i <= n; i++ {
        s += i
    }
    return s
}
\`\`\`
**Invariant:** *trước khi vào vòng với chỉ số $i$, biến \`s\` $= 1 + 2 + \\dots + (i-1)$.*

- **Initialization:** trước vòng đầu $i = 1$, \`s\` $= 0 = $ tổng rỗng (chưa cộng gì) ✓.
- **Maintenance (bước quy nạp):** nếu trước vòng \`s\` $= 1+\\dots+(i-1)$, sau lệnh \`s += i\` thì \`s\` $= 1+\\dots+i$ — đúng invariant cho vòng kế ✓.
- **Termination:** vòng dừng khi $i = n+1$; invariant cho biết \`s\` $= 1+\\dots+n$ — đúng kết quả cần. $\\blacksquare$

💡 **Chốt.** Khi bạn viết một hàm đệ quy hay một vòng lặp và "thấy nó đúng", cái bạn đang làm trong đầu chính là một chứng minh quy nạp ngầm. Viết nó ra tường minh = chứng minh correctness.

📝 **Tóm tắt mục 6.** Base case ≡ điều kiện dừng đệ quy ≡ khởi tạo invariant. Bước nối ≡ "lời gọi nhỏ hơn đúng" ≡ duy trì invariant. Ba góc nhìn của cùng một nguyên lý.

## 7. ⚠ Lỗi quy nạp kinh điển

### 7.1. "Chứng minh" mọi con ngựa cùng màu — lỗi base case sai vị trí

Đây là nghịch lý nổi tiếng (Pólya). **Mệnh đề (sai):** "Trong mọi nhóm $n$ con ngựa, tất cả cùng màu."

"Chứng minh" sai:
- **Base ($n=1$):** một con ngựa thì hiển nhiên "tất cả cùng màu". ✓ (đúng)
- **Bước:** giả sử mọi nhóm $n$ con cùng màu. Xét nhóm $n+1$ con $\\{h_1, \\dots, h_{n+1}\\}$. Bỏ con cuối → nhóm $\\{h_1,\\dots,h_n\\}$ ($n$ con) cùng màu (IH). Bỏ con đầu → nhóm $\\{h_2,\\dots,h_{n+1}\\}$ ($n$ con) cùng màu (IH). Hai nhóm **chồng nhau** ở $h_2,\\dots,h_n$ → màu chung → tất cả $n+1$ cùng màu.

**Lỗi ở đâu?** Bước nối **gãy đúng tại $n=1 \\to n=2$**. Với $n+1 = 2$, hai nhóm con là $\\{h_1\\}$ và $\\{h_2\\}$ — chúng **không chồng nhau** (phần giao $h_2,\\dots,h_n$ là rỗng khi $n=1$). Không có con chung để "bắc cầu" màu. Vậy $P(1) \\to P(2)$ **sai**, dây chuyền đứt ngay bước đầu → mọi $P(n)$ với $n \\ge 2$ không suy ra được. Bài học: **bước nối phải đúng cho MỌI $n$ trong miền**, đặc biệt giá trị nhỏ nhất.

### 7.2. Quên base case

**Mệnh đề (sai):** "$n = n + 1$ với mọi $n$." Bước nối "đúng": giả sử $n = n+1$ (IH), cộng 1 hai vế → $n + 1 = n + 2$, đúng dạng $P(n+1)$. Bước nối hợp lệ về đại số! Nhưng **không có base case nào đúng** ($0 = 1$ sai). Không quân nào đổ → mệnh đề vô nghĩa. Bài học: **bước nối đúng mà thiếu base = vô giá trị** (domino nối hoàn hảo nhưng không ai đẩy quân đầu).

### 7.3. Giả thiết nhầm điều cần chứng minh (circular)

Lỗi tinh vi: trong bước nối, dùng luôn $P(n+1)$ để "chứng minh" $P(n+1)$, hoặc giả sử "$P(k)$ đúng với mọi $k$" (tức cả cái cần chứng minh). IH chỉ được giả sử cho giá trị **đã qua** ($\\le n$), không bao giờ cho $n+1$ hay "mọi $k$".

❓ **Câu hỏi tự nhiên.** *"Làm sao biết base case của mình đủ?"* — Đếm xem bước nối "với tới" bao xa. Nếu $P(n+1)$ chỉ dùng $P(n)$, một base đủ. Nếu dùng $P(n-1)$ (như Fibonacci $F_{n+1} = F_n + F_{n-1}$), cần **hai** base. Nếu lùi 4 (tem 4&5), cần bốn. Quy tắc: base phải phủ mọi giá trị mà bước nối không tự sinh ra được.

🔁 **Dừng lại tự kiểm tra.** Trong "chứng minh" ngựa cùng màu, nếu ai đó vá bằng cách **thêm base $n=2$** ("hai con bất kỳ cùng màu"), chứng minh có cứu được không?

<details><summary>Đáp án</summary>

Không. $P(2)$ ("mọi 2 con ngựa cùng màu") **bản thân nó đã sai** trong thực tế (có ngựa nâu và ngựa trắng). Bạn không thể lấy một base case sai. Lỗi gốc là mệnh đề sai, không chỉ là kỹ thuật chứng minh.
</details>

📝 **Tóm tắt mục 7.** Ba lỗi chết người: (1) bước nối gãy ở giá trị nhỏ (ngựa); (2) thiếu base dù bước nối đúng ($n=n+1$); (3) circular — giả sử cái cần chứng minh. Luôn verify base **và** kiểm bước nối đúng cho cả giá trị nhỏ nhất.

## 8. Ứng dụng CS: chứng minh tính chất cây nhị phân

[Cây nhị phân (binary tree)](../../../DataStructures/02-Intermediate/lesson-01-tree/) là nơi quy nạp tỏa sáng — cấu trúc đệ quy → chứng minh quy nạp tự nhiên.

### 8.1. Cây nhị phân đầy độ cao $h$ có $2^{h+1} - 1$ node

**Định nghĩa.** Cây nhị phân **đầy (perfect)** độ cao $h$: mọi mức từ 0 tới $h$ đều đầy node. Đặt $N(h)$ = số node.

Đặt $P(h)$: "$N(h) = 2^{h+1} - 1$".

**Base ($h = 0$).** Cây một node (chỉ gốc). $N(0) = 1 = 2^{0+1} - 1 = 1$ ✓.

**Bước.** IH: cây đầy độ cao $h$ có $2^{h+1}-1$ node. Cây đầy độ cao $h+1$ = một gốc + **hai** cây con đầy độ cao $h$:
$$
\\begin{aligned}
N(h+1) &= 1 + 2 \\cdot N(h) && \\text{(gốc + 2 cây con)} \\\\
&= 1 + 2(2^{h+1} - 1) && \\text{(thay IH)} \\\\
&= 1 + 2^{h+2} - 2 \\\\
&= 2^{h+2} - 1. && (= 2^{(h+1)+1}-1)
\\end{aligned}
$$
→ $P(h+1)$ đúng. $\\blacksquare$ (Khớp §4.2: tổng theo mức $2^0 + 2^1 + \\dots + 2^h = 2^{h+1}-1$.)

**Bảng:**

| $h$ | Số node $N(h)$ | $2^{h+1}-1$ |
| --- | --- | --- |
| 0 | 1 | 1 |
| 1 | 3 | 3 |
| 2 | 7 | 7 |
| 3 | 15 | 15 |

### 8.2. Cây $n$ node có độ cao tối thiểu $\\ge \\lfloor \\log_2 n \\rfloor$

Từ §8.1: cây độ cao $h$ chứa **tối đa** $2^{h+1}-1$ node. Nếu cây có $n$ node thì $n \\le 2^{h+1}-1 < 2^{h+1}$, lấy $\\log_2$: $\\log_2 n < h+1$, suy ra $h > \\log_2 n - 1$, tức $h \\ge \\lfloor \\log_2 n \\rfloor$. → **Đây là lý do tìm kiếm trên cây cân bằng là $O(\\log n)$**: độ cao không thể nhỏ hơn $\\log_2 n$, và cây cân bằng đạt được cận này.

### 8.3. Tổng chi phí đệ quy (xem trước [Algorithms](../../../Algorithms/))

Merge sort chia mảng $n$ phần tử thành hai nửa, đệ quy, rồi trộn mất $O(n)$. Quan hệ truy hồi $T(n) = 2T(n/2) + cn$. Bằng quy nạp (giả sử $n = 2^k$): chứng minh được $T(n) = cn \\log_2 n + n \\cdot T(1)$ → $O(n \\log n)$. Chi tiết về phân tích truy hồi học sâu ở [Algorithms](../../../Algorithms/) và [Math/05](../../../Math/05-NumberTheory-Combinatorics-Logic/index.html).

📝 **Tóm tắt mục 8.** Cấu trúc đệ quy (cây) → chứng minh quy nạp khớp tự nhiên: "gốc + 2 cây con nhỏ hơn" chính là bước nối. Từ đó suy ra cận $O(\\log n)$ cho cây cân bằng — nền của mọi BST, heap, B-tree.

## 9. Bài tập

**Bài 1 (kiểu chứng minh).** Chứng minh trực tiếp: tổng hai số lẻ là số chẵn.

**Bài 2 (phản đảo).** Dùng phản đảo chứng minh: "Nếu $n^2$ chẵn thì $n$ chẵn." (Gợi ý: phản đảo của nó là gì?)

**Bài 3 (phản ví dụ).** Bác mệnh đề: "Mọi số có dạng $n^2 + n + 1$ là số nguyên tố." Tìm phản ví dụ nhỏ nhất.

**Bài 4 (quy nạp — tự chứng minh).** Chứng minh bằng quy nạp: tổng $n$ số lẻ đầu tiên bằng $n^2$, tức
$$1 + 3 + 5 + \\dots + (2n-1) = n^2.$$

**Bài 5 (quy nạp — tự chứng minh).** Chứng minh bằng quy nạp: $\\displaystyle\\sum_{i=1}^{n} i^2 = 1^2 + 2^2 + \\dots + n^2 = \\frac{n(n+1)(2n+1)}{6}$.

**Bài 6 (quy nạp chia hết).** Chứng minh bằng quy nạp: $3 \\mid (n^3 + 2n)$ với mọi $n \\ge 0$.

**Bài 7 (quy nạp bất đẳng thức).** Chứng minh $n < 2^n$ với mọi $n \\ge 0$.

**Bài 8 (quy nạp mạnh).** Dãy định nghĩa $a_1 = 1$, $a_2 = 3$, và $a_n = a_{n-1} + a_{n-2}$ với $n \\ge 3$. Chứng minh $a_n < 2^n$ với mọi $n \\ge 1$. (Vì sao cần quy nạp mạnh / hai base?)

**Bài 9 (loop invariant).** Cho đoạn code tính lũy thừa:
\`\`\`go
func power(b, n int) int {
    p := 1
    for i := 0; i < n; i++ {
        p *= b
    }
    return p
}
\`\`\`
Nêu loop invariant và chứng minh hàm trả về $b^n$.

**Bài 10 (tìm lỗi).** Một bạn "chứng minh" bằng quy nạp rằng $1 + 2 + \\dots + n = \\frac{n^2 + n + 2}{2}$. Base $n=1$: vế phải $= \\frac{1+1+2}{2} = 2 \\neq 1$. Bạn ấy bỏ qua base, làm bước nối thấy "khớp" nên kết luận đúng. Sai ở đâu, và công thức này thực ra lệch công thức đúng bao nhiêu?

---

## Lời giải chi tiết

### Bài 1

**Chứng minh trực tiếp.** Cho hai số lẻ $x, y$. Theo định nghĩa số lẻ, tồn tại số nguyên $a, b$ với $x = 2a + 1$, $y = 2b + 1$. Khi đó:
$$x + y = (2a+1) + (2b+1) = 2a + 2b + 2 = 2(a + b + 1).$$
Đặt $m = a + b + 1$ (nguyên). Vậy $x + y = 2m$ → chẵn. $\\blacksquare$ Vd: $3 + 5 = 8 = 2 \\cdot 4$; $7 + 11 = 18 = 2 \\cdot 9$.

### Bài 2

Phản đảo của "$n^2$ chẵn $\\to$ $n$ chẵn" là "$n$ **không** chẵn $\\to$ $n^2$ **không** chẵn", tức "$n$ lẻ $\\to$ $n^2$ lẻ".

**Chứng minh phản đảo.** Giả sử $n$ lẻ: $n = 2k+1$. Khi đó
$$n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1,$$
có dạng $2m + 1$ → lẻ. Vậy "$n$ lẻ $\\to n^2$ lẻ" đúng, nên (do tương đương phản đảo) "$n^2$ chẵn $\\to n$ chẵn" đúng. $\\blacksquare$

### Bài 3

Thử lần lượt: $n=0 \\to 1$ (không xét hoặc coi 1 không nguyên tố), $n=1 \\to 3$ ✓, $n=2 \\to 7$ ✓, $n=3 \\to 13$ ✓, $n=4 \\to 21 = 3 \\times 7$ **không nguyên tố**. → Phản ví dụ nhỏ nhất (với $n \\ge 1$) là $n = 4$, cho $21$. Một phản ví dụ là đủ để bác mệnh đề.

### Bài 4 — Tổng số lẻ $= n^2$

Đặt $P(n)$: "$1 + 3 + \\dots + (2n-1) = n^2$".

**Base ($n=1$):** vế trái $= 2\\cdot1 - 1 = 1$; vế phải $= 1^2 = 1$ ✓.

**Bước.** IH: $1 + 3 + \\dots + (2n-1) = n^2$. Số hạng thứ $n+1$ là $2(n+1)-1 = 2n+1$.
$$
\\begin{aligned}
\\underbrace{1 + 3 + \\dots + (2n-1)}_{\\text{IH}} + (2n+1)
&= n^2 + (2n+1) && \\text{(thay IH)} \\\\
&= n^2 + 2n + 1 \\\\
&= (n+1)^2. && \\text{(hằng đẳng thức)}
\\end{aligned}
$$
→ $P(n+1)$ đúng. $\\blacksquare$ Kiểm: $1+3+5+7 = 16 = 4^2$ ✓.

### Bài 5 — Tổng bình phương

Đặt $P(n)$: "$\\sum_{i=1}^n i^2 = \\frac{n(n+1)(2n+1)}{6}$".

**Base ($n=1$):** vế trái $= 1$; vế phải $= \\frac{1\\cdot2\\cdot3}{6} = 1$ ✓.

**Bước.** IH: $\\sum_{i=1}^n i^2 = \\frac{n(n+1)(2n+1)}{6}$. Cần $\\sum_{i=1}^{n+1} i^2 = \\frac{(n+1)(n+2)(2n+3)}{6}$.
$$
\\begin{aligned}
\\sum_{i=1}^{n+1} i^2 &= \\underbrace{\\sum_{i=1}^{n} i^2}_{\\text{IH}} + (n+1)^2 \\\\
&= \\frac{n(n+1)(2n+1)}{6} + (n+1)^2 && \\text{(thay IH)} \\\\
&= \\frac{n(n+1)(2n+1) + 6(n+1)^2}{6} && \\text{(quy đồng)} \\\\
&= \\frac{(n+1)\\big[n(2n+1) + 6(n+1)\\big]}{6} && \\text{(rút } (n+1)) \\\\
&= \\frac{(n+1)(2n^2 + 7n + 6)}{6} && (n(2n+1)+6(n+1) = 2n^2+n+6n+6) \\\\
&= \\frac{(n+1)(n+2)(2n+3)}{6}. && (2n^2+7n+6 = (n+2)(2n+3))
\\end{aligned}
$$
→ $P(n+1)$ đúng. $\\blacksquare$ Kiểm $n=3$: $1+4+9 = 14$, và $\\frac{3\\cdot4\\cdot7}{6} = 14$ ✓.

### Bài 6 — $3 \\mid n^3 + 2n$

Đặt $P(n)$: "$3 \\mid (n^3 + 2n)$".

**Base ($n=0$):** $0^3 + 2\\cdot0 = 0$, $3 \\mid 0$ ✓.

**Bước.** IH: $n^3 + 2n = 3q$. Xét $(n+1)$:
$$
\\begin{aligned}
(n+1)^3 + 2(n+1)
&= n^3 + 3n^2 + 3n + 1 + 2n + 2 \\\\
&= (n^3 + 2n) + (3n^2 + 3n + 3) && \\text{(nhóm lòi ra } n^3+2n) \\\\
&= 3q + 3(n^2 + n + 1) && \\text{(thay IH, rút 3)} \\\\
&= 3\\big(q + n^2 + n + 1\\big).
\\end{aligned}
$$
Chia hết cho 3 → $P(n+1)$ đúng. $\\blacksquare$ Kiểm: $n=2 \\to 8+4=12=3\\cdot4$ ✓; $n=4 \\to 64+8=72=3\\cdot24$ ✓.

### Bài 7 — $n < 2^n$

Đặt $P(n)$: "$n < 2^n$".

**Base ($n=0$):** $0 < 2^0 = 1$ ✓.

**Bước.** IH: $n < 2^n$. Cần $n+1 < 2^{n+1}$.
$$
\\begin{aligned}
n + 1 &< 2^n + 1 && \\text{(cộng 1 vào IH } n<2^n) \\\\
&\\le 2^n + 2^n && (1 \\le 2^n \\text{ với mọi } n \\ge 0) \\\\
&= 2 \\cdot 2^n = 2^{n+1}.
\\end{aligned}
$$
Vậy $n+1 < 2^{n+1}$. $\\blacksquare$ Bước mấu chốt: thay "+1" bằng "$+2^n$" vì $2^n \\ge 1$ — đây là chỗ dễ kẹt nếu chỉ cộng 1.

### Bài 8 — Quy nạp mạnh, hai base

Dãy: $a_1 = 1$, $a_2 = 3$, $a_n = a_{n-1} + a_{n-2}$. Đặt $P(n)$: "$a_n < 2^n$".

**Cần HAI base** vì bước nối dùng cả $a_{n-1}$ và $a_{n-2}$ — muốn suy $P(n)$ phải có sẵn $P(n-1)$ **và** $P(n-2)$.
- $P(1)$: $a_1 = 1 < 2^1 = 2$ ✓.
- $P(2)$: $a_2 = 3 < 2^2 = 4$ ✓.

**Bước (mạnh, $n \\ge 3$).** Giả sử $P(k)$ đúng với mọi $k < n$, đặc biệt $a_{n-1} < 2^{n-1}$ và $a_{n-2} < 2^{n-2}$:
$$
\\begin{aligned}
a_n = a_{n-1} + a_{n-2}
&< 2^{n-1} + 2^{n-2} && \\text{(IH cho hai số hạng)} \\\\
&< 2^{n-1} + 2^{n-1} && (2^{n-2} < 2^{n-1}) \\\\
&= 2 \\cdot 2^{n-1} = 2^n.
\\end{aligned}
$$
→ $P(n)$ đúng. $\\blacksquare$ Quy nạp yếu (chỉ $P(n-1)$) **không đủ** vì bước nối cần thêm $P(n-2)$.

### Bài 9 — Loop invariant cho \`power\`

**Invariant:** *trước vòng lặp với chỉ số $i$, biến \`p\` $= b^i$.*

- **Initialization:** trước vòng đầu $i=0$, \`p\` $= 1 = b^0$ ✓.
- **Maintenance:** giả sử trước vòng \`p\` $= b^i$. Sau \`p *= b\` thì \`p\` $= b^i \\cdot b = b^{i+1}$ — đúng invariant cho chỉ số $i+1$ kế tiếp ✓.
- **Termination:** vòng dừng khi $i = n$; invariant cho \`p\` $= b^n$ — đúng giá trị trả về. $\\blacksquare$

Đây là quy nạp trên số vòng lặp: base = khởi tạo, bước nối = thân vòng giữ invariant.

### Bài 10 — Tìm lỗi

Công thức sai là $1+2+\\dots+n = \\frac{n^2+n+2}{2}$, lệch công thức đúng $\\frac{n^2+n}{2} = \\frac{n(n+1)}{2}$ đúng **$\\frac{2}{2} = 1$ đơn vị** ở mọi $n$.

**Lỗi:** bạn ấy **bỏ qua base case**. Base $n=1$ cho vế phải $= 2 \\ne 1$ → $P(1)$ sai ngay. Bước nối lại "khớp" vì nó chỉ chứng minh "$P(n) \\to P(n+1)$": nếu một $P(n)$ sai lệch hằng số $c$, thì $P(n+1)$ cũng lệch đúng $c$ — bước nối **bảo toàn sai số**, không phát hiện được. Kiểm: thực tế $1+2+3 = 6$, nhưng công thức sai cho $\\frac{9+3+2}{2} = 7$ — lệch 1. Bài học khớp §7.2: **bước nối đúng mà base sai = toàn bộ sai**. Quy nạp **bắt buộc** verify base.

## Tham khảo & bài tiếp theo

Đây là bài **cuối** của nhóm [03-MathFoundations](../). Quy nạp là công cụ bạn sẽ dùng đi dùng lại — bước tiếp theo là **áp dụng** nó:

- [Algorithms](../../../Algorithms/) — chứng minh độ đúng đắn (correctness), phân tích độ phức tạp bằng quan hệ truy hồi và quy nạp (merge sort, quick sort, divide & conquer).
- [DataStructures — Tree](../../../DataStructures/02-Intermediate/lesson-01-tree/) — chứng minh số node, độ cao, cân bằng bằng quy nạp cấu trúc (structural induction).
- [Math/05 — Number Theory, Combinatorics & Logic](../../../Math/05-NumberTheory-Combinatorics-Logic/index.html) — quy nạp ở mức sâu hơn, structural induction, well-ordering principle.
- Ôn lại tiền đề: [Boolean Logic](../lesson-02-boolean-logic/) (phản đảo, implication), [Modular Arithmetic](../lesson-04-modular-arithmetic/) (chia hết).
- **Sách:** *Discrete Mathematics and Its Applications* (Rosen), chương 5 (Induction & Recursion); *How to Prove It* (Velleman).
- Minh họa tương tác: [visualization.html](./visualization.html) — domino base case, induction stepper cho $1+\\dots+n$, và bộ chọn định lý tổng với chứng minh từng bước.
</content>
</invoke>
`;
