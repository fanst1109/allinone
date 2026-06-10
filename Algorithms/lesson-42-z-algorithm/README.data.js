// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-42-z-algorithm/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 42 — Z-Algorithm

> Tier 6 · Thuật toán chuỗi · Bài 3/5

Z-Algorithm là một thuật toán **tuyến tính $O(n)$** để tính một mảng đặc biệt gọi là **Z-array**. Từ Z-array ta giải được hàng loạt bài toán chuỗi: pattern matching, tìm chu kỳ (period), đếm chuỗi con phân biệt, longest common prefix với mọi suffix... Điểm mạnh của Z so với [KMP (Lesson 41)](../lesson-41-kmp/README.md) là **định nghĩa cực kỳ rõ ràng** — \`z[i]\` đo đúng một thứ trực giác — nên dễ hiểu và dễ áp dụng hơn, trong khi vẫn cùng độ phức tạp $O(n+m)$.

---

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Hiểu **Z-array** là gì: \`z[i]\` = độ dài chuỗi con dài nhất bắt đầu tại \`i\` mà cũng là tiền tố (prefix) của toàn chuỗi.
- Nắm khái niệm **Z-box \`[l, r]\`** — interval match-prefix xa nhất về bên phải, và vì sao nó cho phép **tái dùng thông tin** đã tính.
- Cài đặt thuật toán tính Z trong $O(n)$, hiểu vì sao nó tuyến tính (phân tích amortized).
- Dùng Z để làm **pattern matching** $O(n+m)$ qua thủ thuật ghép \`P + '$' + T\`.
- So sánh **Z vs KMP**, hiểu mối liên hệ Z-array ↔ LPS (failure function).
- Áp dụng Z vào các bài toán: tìm chu kỳ, đếm distinct substrings, longest happy prefix, multi-pattern.
- Tránh các **cạm bẫy** kinh điển: chọn separator sai, clip \`min(r-i+1, z[i-l])\` sai, off-by-one ở box.

## Kiến thức tiền đề

- [Lesson 40 — String Matching & Rabin-Karp](../lesson-40-string-matching-rabin-karp/README.md): bài toán matching, naive $O(nm)$.
- [Lesson 41 — KMP](../lesson-41-kmp/README.md): failure function (LPS), tư tưởng "không backtrack text". Z là một góc nhìn khác cho cùng vấn đề.
- [Lesson 02 — Amortized Analysis](../lesson-02-amortized-analysis/README.md): để hiểu vì sao Z chạy O(n) dù trông như có vòng lặp lồng.
- [Lesson 13 — Two Pointers](../lesson-13-two-pointers/README.md): tư tưởng con trỏ \`l, r\` chỉ tiến, không lùi.

---

## 1. Z-array là gì?

> 💡 **Trực giác / Hình dung.** Tưởng tượng bạn đứng tại mỗi vị trí \`i\` của chuỗi \`S\` và tự hỏi: *"Nếu tôi bắt đầu đọc từ đây, tôi đọc được bao nhiêu ký tự khớp y hệt với phần đầu của chuỗi?"* Con số đó chính là \`z[i]\`. Nó giống như mỗi vị trí "soi gương" về đầu chuỗi và đo xem mình giống cái đầu bao nhiêu.

**Định nghĩa hình thức.** Cho chuỗi \`S\` độ dài \`n\` (chỉ số \`0 .. n-1\`). Với mỗi \`i\` từ \`1\` đến \`n-1\`:

\`\`\`
z[i] = độ dài lớn nhất L sao cho  S[0 .. L-1] == S[i .. i+L-1]
\`\`\`

Nói cách khác, \`z[i]\` là độ dài của **tiền tố chung dài nhất** (longest common prefix) giữa toàn chuỗi \`S\` và **suffix bắt đầu tại \`i\`** (tức \`S[i:]\`).

Quy ước về \`z[0]\`: thường đặt \`z[0] = 0\` (vì so sánh \`S\` với chính nó là tầm thường, không hữu ích), đôi khi đặt \`z[0] = n\`. Trong bài này ta dùng \`z[0] = 0\` để code matching gọn.

### 1.1 Bốn ví dụ số cụ thể

**Ví dụ 1 — \`S = "aaaaa"\` (n = 5).**

| i | suffix \`S[i:]\` | so với \`"aaaaa"\` | z[i] |
|---|----------------|------------------|------|
| 0 | aaaaa | (quy ước) | 0 |
| 1 | aaaa  | "aaaa" khớp 4 ký tự, hết suffix | 4 |
| 2 | aaa   | khớp 3 | 3 |
| 3 | aa    | khớp 2 | 2 |
| 4 | a     | khớp 1 | 1 |

→ \`z = [0, 4, 3, 2, 1]\`. Chuỗi toàn \`a\` nên mỗi suffix khớp tới hết chính nó.

**Ví dụ 2 — \`S = "abcabc"\` (n = 6).**

| i | suffix | LCP với "abcabc" | z[i] |
|---|--------|------------------|------|
| 0 | abcabc | — | 0 |
| 1 | bcabc  | 'b' ≠ 'a' | 0 |
| 2 | cabc   | 'c' ≠ 'a' | 0 |
| 3 | abc    | "abc" khớp 3, hết suffix | 3 |
| 4 | bc     | 'b' ≠ 'a' | 0 |
| 5 | c      | 'c' ≠ 'a' | 0 |

→ \`z = [0, 0, 0, 3, 0, 0]\`. \`z[3] = 3\` cho biết "abc" lặp lại — gợi ý chu kỳ 3.

**Ví dụ 3 — \`S = "aabcaabxaab"\` (n = 11).**

| i  | S[i] | suffix \`S[i:]\` | LCP với "aabc..." | z[i] |
|----|------|----------------|-------------------|------|
| 0  | a | aabcaabxaab | — | 0 |
| 1  | a | abcaabxaab  | "a" khớp, rồi 'b'≠'a' | 1 |
| 2  | b | bcaabxaab   | 'b'≠'a' | 0 |
| 3  | c | caabxaab    | 'c'≠'a' | 0 |
| 4  | a | aabxaab     | "aab" khớp 3, rồi 'x'≠'c' | 3 |
| 5  | a | abxaab      | "a" khớp, rồi 'b'≠'a' | 1 |
| 6  | b | bxaab       | 'b'≠'a' | 0 |
| 7  | x | xaab        | 'x'≠'a' | 0 |
| 8  | a | aab         | "aab" khớp 3, hết | 3 |
| 9  | a | ab          | "a" khớp, rồi 'b'≠'a' | 1 |
| 10 | b | b           | 'b'≠'a' | 0 |

→ \`z = [0, 1, 0, 0, 3, 1, 0, 0, 3, 1, 0]\`.

**Ví dụ 4 — \`S = "xyzxyz"\` (n = 6).** Tương tự ví dụ 2 nhưng prefix khác:

| i | suffix | z[i] |
|---|--------|------|
| 0 | xyzxyz | 0 |
| 1 | yzxyz  | 0 |
| 2 | zxyz   | 0 |
| 3 | xyz    | 3 |
| 4 | yz     | 0 |
| 5 | z      | 0 |

→ \`z = [0, 0, 0, 3, 0, 0]\`. Chỉ phụ thuộc cấu trúc lặp, không phụ thuộc ký tự cụ thể.

> ⚠ **Lỗi thường gặp.** \`z[i]\` **không phải** "số ký tự khớp với ký tự tại \`i\`" mà là "LCP của *toàn chuỗi* với *suffix tại i*". Nhiều người nhầm \`z[i]\` với một loại đếm cục bộ. Luôn nhớ: vế trái cố định là \`S[0:]\`, vế phải trượt là \`S[i:]\`.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tính từng \`z[i]\` bằng so sánh trực tiếp thì mất bao lâu?"* — Naive: mỗi $i$ so tối đa $n$ ký tự → $O(n^2)$. Phần 3 sẽ giảm về $O(n)$ bằng Z-box.
> - *"Z-array dùng để làm gì ngoài việc nhìn?"* — Pattern matching (phần 4), period (phần 6), distinct substrings... Nó là "viên gạch" chung cho nhiều bài.
> - *"\`z[i]\` có thể vượt qua hết chuỗi không?"* — Không. \`z[i] ≤ n - i\` vì suffix tại \`i\` chỉ dài \`n-i\`.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Tính \`z\` cho \`S = "aaba"\`.
> 2. Vì sao \`z[i] ≤ n - i\`?
>
> <details><summary>Đáp án</summary>
>
> 1. \`z = [0, 1, 0, 1]\`. i=1: "aba" vs "aaba" → 'a' khớp, 'b'≠'a' → 1. i=2: 'b'≠'a' → 0. i=3: "a" khớp hết → 1.
> 2. Suffix \`S[i:]\` chỉ có \`n-i\` ký tự, không thể khớp nhiều hơn số ký tự nó có.
> </details>

> 📝 **Tóm tắt mục 1.** \`z[i]\` = độ dài LCP giữa \`S\` và \`S[i:]\`. \`z[0]\` quy ước 0 (hoặc $n$). Naive $O(n^2)$. Z-array mã hóa toàn bộ thông tin "lặp lại của prefix" trong chuỗi.

---

## 2. Z-box \`[l, r]\` — trái tim của thuật toán

> 💡 **Trực giác / Hình dung.** Khi đang tính \`z\` từ trái sang phải, tưởng tượng ta luôn giữ một "cửa sổ vàng" \`[l, r]\`: đây là đoạn **xa nhất về bên phải** mà ta đã biết chắc nó **trùng khớp với một prefix của S**. Tức \`S[l .. r] == S[0 .. r-l]\`. Cửa sổ này là "bộ nhớ" — khi gặp \`i\` nằm trong cửa sổ, ta đã biết \`S[i]\` tương ứng với ký tự nào ở đầu chuỗi, nên **không phải so lại từ đầu**.

**Định nghĩa Z-box.** Trong quá trình tính, ta duy trì cặp \`(l, r)\` với bất biến:

\`\`\`
S[l .. r]  ==  S[0 .. r-l]      (đoạn [l,r] là một prefix-match)
và r là chỉ số phải nhất đạt được cho tới hiện tại.
\`\`\`

Khi xử lý vị trí \`i\`, có **2 trường hợp lớn**:

### Trường hợp A — \`i > r\` (ngoài box)

Không có thông tin tái dùng. Ta so sánh trực tiếp \`S[0..]\` với \`S[i..]\` từng ký tự, đếm được \`z[i]\`. Nếu \`z[i] > 0\`, cập nhật box mới: \`l = i\`, \`r = i + z[i] - 1\`.

### Trường hợp B — \`i ≤ r\` (trong box)

Đây là chỗ tinh tế. Đặt \`k = i - l\` (vị trí "tương ứng" của \`i\` khi chiếu về đầu chuỗi, vì \`S[i]\` khớp \`S[k]\`). Ta đã biết \`z[k]\` từ trước. Có 2 nhánh con:

- **B1 — copy:** nếu \`z[k] < r - i + 1\` (giá trị \`z[k]\` "vừa khít" trong phần còn lại của box), thì \`z[i] = z[k]\` **chính xác**, không cần so thêm. Lý do: cả \`S[i..]\` và \`S[k..]\` đều nằm trong vùng đã biết là prefix-match, nên chúng giống hệt nhau trong phạm vi đó.
- **B2 — extend (clip rồi mở rộng):** nếu \`z[k] ≥ r - i + 1\`, ta chỉ chắc chắn khớp tới hết box (\`r - i + 1\` ký tự); phần ngoài box \`S[r+1..]\` chưa biết → **so trực tiếp tiếp** từ vị trí \`r+1\` xuống. Sau đó cập nhật box.

> ⚠ **Lỗi thường gặp (cạm bẫy số 1).** Ở trường hợp B, giá trị khởi tạo phải là \`z[i] = min(r - i + 1, z[k])\`, **không phải** \`z[i] = z[k]\`. Quên \`min\` → khi \`z[k]\` lớn hơn phần còn lại của box, bạn copy nhầm thông tin chưa được xác nhận (phần ngoài box \`S[r+1..]\` chưa so). Đây là bug kinh điển nhất của Z-algorithm.

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao \`S[i]\` khớp với \`S[i-l]\`?"* — Vì \`[l, r]\` là prefix-match: \`S[l..r] == S[0..r-l]\`. Chiếu vị trí \`i\` (với \`l ≤ i ≤ r\`) về đầu chuỗi, nó tương ứng \`i - l\`. Nên \`S[i] == S[i-l]\`, và rộng hơn, \`S[i..r] == S[i-l .. r-l]\`.
> - *"Trường hợp B1 vì sao chắc chắn đúng, không cần so?"* — Vì \`z[k]\` "kết thúc" trước khi chạm biên \`r\`. Tức ký tự làm \`z[k]\` dừng (\`S[z[k]] ≠ S[k + z[k]]\`) nằm hoàn toàn trong vùng box đã xác nhận, nên cùng mẫu lặp lại ở vị trí \`i\`.
> - *"Trường hợp B2 vì sao phải so tiếp?"* — Vì box chỉ "bảo đảm" tới \`r\`. Phần \`S[r+1..]\` là vùng tối, chưa ai so. \`z[k]\` có thể dài hơn vùng đảm bảo, nhưng ta không được tin nó vượt biên.

> 🔁 **Dừng lại tự kiểm tra.** Box \`[l, r] = [4, 7]\`, đang xét \`i = 6\`, biết \`z[2] = 5\`. Khởi tạo \`z[6]\` bằng bao nhiêu, có cần so tiếp không?
>
> <details><summary>Đáp án</summary>
>
> \`k = i - l = 6 - 4 = 2\`. Phần còn lại box: \`r - i + 1 = 7 - 6 + 1 = 2\`. \`z[k] = 5 ≥ 2\` → trường hợp B2. Khởi tạo \`z[6] = min(2, 5) = 2\`, rồi **so tiếp** từ vị trí \`r+1 = 8\`.
> </details>

> 📝 **Tóm tắt mục 2.** Box \`[l, r]\` = prefix-match phải nhất. \`i > r\`: so trực tiếp. \`i ≤ r\`: dùng \`k = i-l\`, khởi tạo \`z[i] = min(r-i+1, z[k])\`; nếu chạm biên thì mở rộng. \`min\` là mấu chốt chống bug.

---

## 3. Thuật toán O(n) — walk-through đầy đủ

### 3.1 Mã giả

\`\`\`
computeZ(S):
    n = len(S)
    z = mảng 0, kích thước n
    l = 0; r = 0
    for i = 1 .. n-1:
        if i <= r:                       # trong box
            z[i] = min(r - i + 1, z[i - l])
        # mở rộng (cũng dùng cho i > r, khi z[i]=0 ban đầu)
        while i + z[i] < n and S[z[i]] == S[i + z[i]]:
            z[i] += 1
        if i + z[i] - 1 > r:             # box mới xa hơn → cập nhật
            l = i
            r = i + z[i] - 1
    return z
\`\`\`

> 💡 Lưu ý cài đặt gọn: với \`i > r\`, \`z[i]\` mặc định là 0, rơi thẳng vào vòng \`while\` so trực tiếp. Với \`i ≤ r\`, ta khởi tạo bằng \`min(...)\` rồi vòng \`while\` chỉ chạy khi cần mở rộng (B2). Một vòng \`while\` xử lý cả hai trường hợp → code rất ngắn.

### 3.2 Walk-through chi tiết: \`S = "aabxaabxcaabxaabxay"\` (n = 19)

Đánh số:

\`\`\`
i :  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18
S :  a  a  b  x  a  a  b  x  c  a  a  b  x  a  a  b  x  a  y
\`\`\`

Bắt đầu \`l = 0, r = 0, z = [0,0,...]\`.

**i = 1.** \`i ≤ r\`? \`1 ≤ 0\` sai → ngoài box. So trực tiếp: \`S[0]='a'\` vs \`S[1]='a'\` ✓ (z=1); \`S[1]='a'\` vs \`S[2]='b'\` ✗. → \`z[1] = 1\`. Box mới: \`i + z[i] - 1 = 1 > r=0\` → \`l=1, r=1\`.

**i = 2.** \`2 ≤ 1\` sai → ngoài box. \`S[0]='a'\` vs \`S[2]='b'\` ✗ → \`z[2]=0\`. Không cập nhật box.

**i = 3.** \`3 ≤ 1\` sai. \`S[0]='a'\` vs \`S[3]='x'\` ✗ → \`z[3]=0\`.

**i = 4.** \`4 ≤ 1\` sai → ngoài box. So trực tiếp:
\`S[0]='a'\`=\`S[4]='a'\` ✓; \`S[1]='a'\`=\`S[5]='a'\` ✓; \`S[2]='b'\`=\`S[6]='b'\` ✓; \`S[3]='x'\`=\`S[7]='x'\` ✓; \`S[4]='a'\`=\`S[8]='c'\` ✗.
→ \`z[4] = 4\`. Box mới: \`4 + 4 - 1 = 7 > 1\` → \`l=4, r=7\`.

**i = 5.** \`5 ≤ 7\` ✓ → trong box. \`k = i - l = 5 - 4 = 1\`, \`z[k] = z[1] = 1\`, phần còn lại box \`r-i+1 = 7-5+1 = 3\`. \`z[5] = min(3, 1) = 1\`. Vì \`z[k]=1 < 3\` → B1, không so thêm. Box không xa hơn (\`5+1-1=5 < 7\`). → \`z[5] = 1\`.

**i = 6.** \`6 ≤ 7\` ✓. \`k = 2\`, \`z[2] = 0\`, còn lại \`7-6+1=2\`. \`z[6] = min(2, 0) = 0\`. B1, không so. → \`z[6] = 0\`.

**i = 7.** \`7 ≤ 7\` ✓. \`k = 3\`, \`z[3] = 0\`, còn lại \`1\`. \`z[7] = min(1, 0) = 0\`. → \`z[7] = 0\`.

**i = 8.** \`8 ≤ 7\` sai → ngoài box. \`S[0]='a'\` vs \`S[8]='c'\` ✗ → \`z[8] = 0\`.

**i = 9.** \`9 ≤ 7\` sai → ngoài box. So trực tiếp:
\`a=S[9]'a'\`✓; \`a=S[10]'a'\`✓; \`b=S[11]'b'\`✓; \`x=S[12]'x'\`✓; \`a=S[13]'a'\`✓; \`a=S[14]'a'\`✓; \`b=S[15]'b'\`✓; \`x=S[16]'x'\`✓; \`S[8]='c'\` vs \`S[17]='a'\` ✗.
Khớp 8 ký tự → \`z[9] = 8\`. Box mới: \`9+8-1 = 16 > 7\` → \`l=9, r=16\`.

**i = 10.** \`10 ≤ 16\` ✓. \`k = 10-9 = 1\`, \`z[1]=1\`, còn lại \`16-10+1=7\`. \`z[10] = min(7,1)=1\`. B1. → \`1\`.

**i = 11.** \`11 ≤ 16\`. \`k=2\`, \`z[2]=0\`, \`z[11]=min(6,0)=0\`.

**i = 12.** \`k=3\`, \`z[3]=0\`, \`z[12]=0\`.

**i = 13.** \`13 ≤ 16\`. \`k=4\`, \`z[4]=4\`, còn lại \`16-13+1=4\`. \`z[13] = min(4,4) = 4\`. Vì \`z[k]=4 ≥ 4\` (chạm biên) → B2, **so tiếp** từ \`r+1=17\`: \`S[z[13]]=S[4]='a'\` vs \`S[13+4]=S[17]='a'\` ✓ → z=5; \`S[5]='a'\` vs \`S[18]='y'\` ✗. → \`z[13] = 5\`. Box mới: \`13+5-1 = 17 > 16\` → \`l=13, r=17\`.

**i = 14.** \`14 ≤ 17\`. \`k=14-13=1\`, \`z[1]=1\`, còn lại \`17-14+1=4\`. \`z[14]=min(4,1)=1\`. B1. → \`1\`.

**i = 15.** \`k=2\`, \`z[2]=0\`, \`z[15]=0\`.

**i = 16.** \`k=3\`, \`z[3]=0\`, \`z[16]=0\`.

**i = 17.** \`17 ≤ 17\`. \`k=17-13=4\`, \`z[4]=4\`, còn lại \`17-17+1=1\`. \`z[17]=min(1,4)=1\`. B2 (chạm biên): so tiếp từ \`r+1=18\`: \`S[z[17]]=S[1]='a'\` vs \`S[18]='y'\` ✗ → dừng. → \`z[17] = 1\`. Box: \`17+1-1=17\`, không xa hơn \`r=17\`, giữ nguyên.

**i = 18.** \`18 ≤ 17\` sai → ngoài box. \`S[0]='a'\` vs \`S[18]='y'\` ✗ → \`z[18]=0\`.

**Kết quả cuối:**

\`\`\`
i :  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18
z :  0  1  0  0  4  1  0  0  0  8  1  0  0  5  1  0  0  1  0
\`\`\`

> ❓ **Câu hỏi tự nhiên.** *"Vòng \`while\` so trực tiếp có thể chạy nhiều lần — sao vẫn là $O(n)$?"* — Mỗi lần \`while\` tăng \`z[i]\` lên 1, nó đẩy \`r\` tiến về bên phải ít nhất bằng đó. Mà \`r\` chỉ **tăng**, không bao giờ giảm, từ 0 đến tối đa $n-1$. Nên tổng số lần thân \`while\` chạy trên *toàn bộ* quá trình $\\leq n$. Đây là [phân tích amortized](../lesson-02-amortized-analysis/README.md): vòng trong "nhìn" như $O(n)$ mỗi bước nhưng tổng chỉ $O(n)$. Cộng vòng ngoài $O(n)$ → tổng $O(n)$.

> 🔁 **Dừng lại tự kiểm tra.** Trong walk-through trên, bước nào là B2 (extend)? Có bao nhiêu lần \`r\` được cập nhật?
>
> <details><summary>Đáp án</summary>
>
> B2 ở \`i=13\` (so thêm tới 5) và \`i=17\` (so thêm 1 ký tự nhưng fail ngay). \`r\` cập nhật tại \`i=1, 4, 9, 13\` → 4 lần (giá trị \`r\`: 1→7→16→17).
> </details>

> 📝 **Tóm tắt mục 3.** Một vòng \`for\` ngoài, một vòng \`while\` so trực tiếp. \`i ≤ r\`: khởi tạo \`min(r-i+1, z[i-l])\`. Luôn cập nhật \`(l,r)\` khi box mới xa hơn. \`r\` chỉ tăng → amortized $O(n)$.

### 3.3 Code Go — \`computeZ\`

\`\`\`go
package main

import "fmt"

// computeZ trả về Z-array của chuỗi s.
// z[i] = độ dài LCP giữa s và suffix s[i:]. z[0] đặt 0 theo quy ước.
// Độ phức tạp: O(n) thời gian, O(n) bộ nhớ.
func computeZ(s string) []int {
	n := len(s)
	z := make([]int, n)
	if n == 0 {
		return z
	}
	// l, r là Z-box: đoạn prefix-match phải nhất đã biết, s[l..r] == s[0..r-l].
	l, r := 0, 0
	for i := 1; i < n; i++ {
		if i <= r {
			// i nằm trong box → tái dùng z[i-l], nhưng KHÔNG vượt quá biên box.
			// min(r-i+1, z[i-l]) chính là cạm bẫy: clip về phần còn lại của box.
			k := i - l
			if z[k] < r-i+1 {
				z[i] = z[k] // B1: copy nguyên, không cần so
			} else {
				z[i] = r - i + 1 // B2: clip tới biên, sẽ mở rộng bên dưới
			}
		}
		// Mở rộng bằng so trực tiếp (chạy cho cả i>r lẫn B2).
		for i+z[i] < n && s[z[i]] == s[i+z[i]] {
			z[i]++
		}
		// Nếu box mới vươn xa hơn → cập nhật l, r.
		if i+z[i]-1 > r {
			l = i
			r = i + z[i] - 1
		}
	}
	return z
}

func main() {
	s := "aabxaabxcaabxaabxay"
	z := computeZ(s)
	fmt.Println(s)
	fmt.Println(z)
	// Output: [0 1 0 0 4 1 0 0 0 8 1 0 0 5 1 0 0 1 0]
}
\`\`\`

> 💡 **Walk-through code.** Với \`i=13\`: \`i ≤ r=16\` → \`k=4\`, \`z[4]=4\`, \`r-i+1=4\`. \`z[k]=4 < 4\`? Sai → nhánh else: \`z[13]=4\` (clip tới biên). Vòng \`while\`: \`s[4]='a'==s[17]='a'\` → z=5; \`s[5]='a'==s[18]='y'\`? sai → dừng. \`13+5-1=17 > 16\` → \`l=13, r=17\`. Khớp đúng walk-through tay ở 3.2.

---

## 4. Pattern matching bằng Z-array

> 💡 **Trực giác.** Z-array đo "suffix này giống đầu chuỗi bao nhiêu". Nếu ta đặt **pattern P** ở đầu chuỗi rồi nối **text T** vào sau (có dấu ngăn cách), thì tại mỗi vị trí trong T, \`z[i]\` đo "đoạn bắt đầu ở đây giống P bao nhiêu". Nếu \`z[i] == |P|\` → toàn bộ P xuất hiện tại đó → **một match!**

**Thủ thuật ghép.** Tạo chuỗi mới:

\`\`\`
W = P + '$' + T
\`\`\`

trong đó \`'$'\` là một **separator** — ký tự **không xuất hiện** trong cả P lẫn T. Tính \`z\` trên \`W\`. Với mỗi vị trí \`i\` trong phần T (tức $i \\geq |P| + 1$), nếu \`z[i] == |P|\` thì P khớp trong T tại vị trí \`i - |P| - 1\` (chuyển về chỉ số gốc của T).

### 4.1 Vì sao cần separator \`$\`?

Nếu không có \`$\`, một match một phần ở cuối P có thể "tràn" sang T và làm \`z[i]\` vượt quá $|P|$, gây nhập nhằng. Separator đảm bảo \`z[i]\` **không bao giờ vượt $|P|$** (vì \`$\` không khớp ký tự nào trong T), nên \`z[i] == |P|\` là điều kiện match sạch sẽ.

> ⚠ **Lỗi thường gặp (cạm bẫy số 2).** Separator phải **không nằm trong bảng chữ cái** của P và T. Nếu T chứa ký tự \`$\`, kết quả sai. Với input tùy ý (Unicode), hãy dùng một sentinel chắc chắn không xuất hiện (ví dụ một rune đặc biệt, hoặc xử lý riêng). Với bài tập alphabet chữ cái, \`$\` / \`#\` / \`\\x00\` là lựa chọn an toàn.

### 4.2 Walk-through: \`P = "aba"\`, \`T = "abxabababa"\`

Ghép: \`W = "aba" + "$" + "abxabababa"\` = \`"aba$abxabababa"\`, \`|P| = 3\`.

\`\`\`
i :  0  1  2  3  4  5  6  7  8  9 10 11 12 13
W :  a  b  a  $  a  b  x  a  b  a  b  a  b  a
\`\`\`

Tính Z (rút gọn các bước quan trọng):

- i=1: 'b'≠'a' → 0. i=2: "a$" vs "ab" → 'a' khớp, '$'≠'b'? thực ra \`S[1]='b'\` vs \`S[2+1]=S[3]='$'\`... → z[2]=1. i=3: '$'≠'a' → 0.
- i=4: "abxaba..." vs "aba$..." → 'a'='a', 'b'='b', 'x'≠'a' → z[4]=2.
- i=5: 'b'≠'a' → 0. i=6: 'x'≠'a' → 0.
- i=7: "abababa" vs "aba$..." → 'a'='a','b'='b','a'='a','$'? \`S[3]='$'\` vs \`S[7+3]=S[10]='b'\` → khác → z[7]=3 ✅.
- i=8: 'b'≠'a' → 0.
- i=9: "ababa" → 'a','b','a',rồi \`S[3]='$'\`vs\`S[12]='b'\`→khác → z[9]=3 ✅.
- i=10: 'b'≠'a' → 0.
- i=11: "aba" → 'a','b','a', hết chuỗi → z[11]=3 ✅.
- i=12: 'b'≠0. i=13: "a" → z=1.

\`z[i] == |P| = 3\` tại \`i = 7, 9, 11\`. Chuyển về chỉ số T: \`pos = i - |P| - 1 = i - 4\`:
- i=7 → T pos 3.
- i=9 → T pos 5.
- i=11 → T pos 7.

Kiểm tra \`T = "abxabababa"\` (chỉ số 0-9): \`T[3..5]="aba"\` ✓, \`T[5..7]="aba"\` ✓, \`T[7..9]="aba"\` ✓. Ba match, có overlap — đúng như mong đợi.

### 4.3 Code Go — Z-based pattern matching

\`\`\`go
// zSearch tìm tất cả vị trí pattern xuất hiện trong text (0-indexed), dùng Z-array.
// Ghép W = pattern + sep + text, tính z, vị trí z[i]==len(pattern) là một match.
// Độ phức tạp: O(n+m) thời gian, n=len(text), m=len(pattern).
func zSearch(text, pattern string) []int {
	m := len(pattern)
	if m == 0 {
		return nil
	}
	// '\\x00' là separator an toàn cho text ASCII thông thường.
	w := pattern + "\\x00" + text
	z := computeZ(w)
	var res []int
	for i := m + 1; i < len(w); i++ {
		if z[i] == m {
			// i là chỉ số trong w; trừ (m+1) để về chỉ số trong text.
			res = append(res, i-m-1)
		}
	}
	return res
}

func main() {
	fmt.Println(zSearch("abxabababa", "aba")) // [3 5 7]
	fmt.Println(zSearch("aaaaa", "aa"))         // [0 1 2 3]
	fmt.Println(zSearch("hello", "xyz"))        // []
}
\`\`\`

> ❓ **Câu hỏi tự nhiên.** *"Vì sao không cần tách riêng vòng tìm match — tại sao tận dụng được Z trên cả P?"* — Trong \`W\`, phần P (chỉ số \`0..m-1\`) tự nó cũng được tính z, nhưng ta chỉ quan tâm \`i ≥ m+1\` (phần T). Phần P không gây match giả vì \`$\` chặn. Việc tính z trên cả W vẫn O(|W|) = O(n+m).

> 🔁 **Dừng lại tự kiểm tra.** Với \`P="aa"\`, \`T="aaa"\`, tìm các match. (Tự ghép \`W\` và đếm \`z[i]==2\`.)
>
> <details><summary>Đáp án</summary>
>
> \`W = "aa\\x00aaa"\`, |P|=2. z: i=1→1, i=2(sep)→0, i=3→2, i=4→2, i=5→1. \`z[i]==2\` tại i=3,4 → T pos 3-3=0, 4-3=1. Match tại T[0] và T[1]. Đúng: "aaa" chứa "aa" ở vị trí 0 và 1.
> </details>

> 📝 **Tóm tắt mục 4.** Ghép \`P + sep + T\`, tính z, \`z[i]==|P|\` → match tại \`i - |P| - 1\`. Separator phải vắng mặt trong P,T. $O(n+m)$.

---

## 5. So sánh Z vs KMP

[KMP (Lesson 41)](../lesson-41-kmp/README.md) tính **LPS array** (longest proper prefix that is also suffix). Cả hai cùng O(n+m), cùng "không backtrack text". Khác biệt nằm ở góc nhìn:

| Tiêu chí | Z-Algorithm | KMP (LPS) |
|----------|-------------|-----------|
| Đại lượng tính | \`z[i]\` = LCP(S, S[i:]) — **nhìn về trước** | \`lps[i]\` = prefix=suffix dài nhất của \`S[0..i]\` — **nhìn về sau** |
| Trực giác | Rất rõ ràng, dễ phát biểu | Hơi trừu tượng (failure function) |
| Matching | Ghép \`P+$+T\` rồi quét z | Tính lps(P) rồi quét T với automaton |
| Bộ nhớ | $O(n+m)$ (phải tạo chuỗi ghép) | $O(m)$ (chỉ lps của P) — gọn hơn cho streaming |
| Phổ biến | Ít hơn trong sách giáo khoa | Kinh điển, được dạy rộng |
| Online/streaming | Khó (cần toàn bộ text) | Dễ (quét text từng ký tự) |

> 💡 **Khi nào dùng cái nào?** Nếu bạn cần **đọc text theo luồng** (streaming) hoặc tiết kiệm bộ nhớ → KMP (chỉ giữ lps của P). Nếu bài toán **về cấu trúc nội tại của một chuỗi** (period, distinct substring, so prefix với mọi suffix) → Z thường tự nhiên hơn.

### 5.1 Z-array ↔ LPS có chuyển đổi được

Hai mảng mã hóa **cùng lượng thông tin** về cấu trúc lặp của chuỗi, nên đổi qua lại được.

**Từ Z sang LPS.** Với mỗi \`i\` (z[i] > 0), đoạn \`S[i .. i+z[i]-1]\` khớp prefix \`S[0 .. z[i]-1]\`, nghĩa là tại vị trí kết thúc \`j = i + z[i] - 1\`, có một prefix=suffix độ dài \`z[i]\`. Ta gán \`lps[j] = max(lps[j], z[i])\` — nhưng cần duyệt khéo để lấy đúng (LPS yêu cầu *dài nhất* tại mỗi vị trí). Cách an toàn: duyệt \`i\` từ cao xuống, với mỗi \`i\` đặt \`lps[i + z[i] - 1] = z[i]\` nếu chưa có; thực tế người ta thường tính lps trực tiếp bằng KMP cho gọn.

**Ví dụ số.** \`S = "aabaab"\`:
- Z: \`z = [0, 1, 0, 3, 1, 0]\`.
- LPS: \`lps = [0, 1, 0, 1, 2, 3]\`.
- Kiểm chứng \`z[3]=3\`: \`S[3..5]="aab"\` == prefix \`S[0..2]="aab"\` ✓. Tại \`j=5\`, prefix=suffix dài nhất là "aab" độ dài 3 = \`lps[5]\` ✓.

> ❓ **Câu hỏi tự nhiên.** *"Nếu tương đương sao không chỉ học một cái?"* — Vì mỗi cách diễn đạt làm một số bài toán *gọn hơn* hẳn. Period nhìn qua Z rất tự nhiên (\`n - z[i]\` chia hết n...), nhưng KMP lại gọn cho streaming. Biết cả hai = chọn công cụ đúng.

> 📝 **Tóm tắt mục 5.** Z và KMP cùng O(n+m), cùng thông tin. Z trực quan + tốt cho phân tích cấu trúc chuỗi; KMP gọn bộ nhớ + tốt cho streaming. Chuyển đổi qua lại được.

---

## 6. Ứng dụng Z-array

### 6.1 String matching

Đã trình bày ở mục 4 — bài toán cơ bản nhất.

### 6.2 Tìm chu kỳ (period) / lặp lại

> 💡 **Trực giác.** Chuỗi \`S\` có **chu kỳ** độ dài \`p\` nếu \`S\` là lặp lại của một khối dài \`p\` (cho phép khối cuối bị cắt). Ví dụ "abcabcab" có chu kỳ 3 ("abc" lặp). Z giúp phát hiện: nếu tại \`i = p\` có \`z[p] == n - p\` (suffix bắt đầu tại \`p\` khớp prefix tới hết chuỗi), thì \`p\` là một chu kỳ.

**Định lý period qua Z.** $p$ là chu kỳ của \`S\` ($n = |S|$) ⟺ \`z[p] == n - p\` (với điều kiện $p$ không vượt $n$). **Chu kỳ ngắn nhất** = $p$ nhỏ nhất thỏa điều kiện. Nếu $n \\bmod p = 0$, đó là chu kỳ "đầy đủ" (lặp đúng $n/p$ lần).

**Ví dụ số.** \`S = "abcabcab"\` ($n=8$):
- \`z = [0, 0, 0, 5, 0, 0, 2, 0]\`.
- Tại $p=3$: \`z[3] = 5\`. $n - p = 8 - 3 = 5$. Bằng nhau → $p=3$ là chu kỳ ✓.
- $n \\bmod p = 8 \\bmod 3 = 2 \\neq 0$ → chu kỳ 3 nhưng khối cuối "ab" bị cắt (lặp không trọn vẹn).

**Ví dụ 2.** \`S = "abab"\` ($n=4$): \`z = [0,0,2,0]\`. $p=2$: \`z[2]=2 == 4-2=2\` ✓, và $4 \\bmod 2 = 0$ → "ab" lặp đúng 2 lần.

### 6.3 Code Go — chu kỳ ngắn nhất

\`\`\`go
// smallestPeriod trả về độ dài chu kỳ ngắn nhất của s.
// Nếu chuỗi không lặp, kết quả = len(s) (chu kỳ là chính nó).
// Độ phức tạp: O(n).
func smallestPeriod(s string) int {
	n := len(s)
	if n == 0 {
		return 0
	}
	z := computeZ(s)
	for p := 1; p < n; p++ {
		// p là chu kỳ nếu suffix bắt đầu tại p khớp prefix tới hết chuỗi.
		if z[p] == n-p {
			return p
		}
	}
	return n // không có chu kỳ con thực sự
}

func main() {
	fmt.Println(smallestPeriod("abcabcab")) // 3
	fmt.Println(smallestPeriod("abab"))      // 2
	fmt.Println(smallestPeriod("aaaa"))      // 1
	fmt.Println(smallestPeriod("abcd"))      // 4 (không lặp)
}
\`\`\`

> 💡 **Walk-through.** \`"abab"\`: z=[0,0,2,0]. p=1: z[1]=0, n-p=3 → khác. p=2: z[2]=2, n-p=2 → bằng → trả 2. Đúng "ab" lặp 2 lần.

### 6.4 Đếm số chuỗi con phân biệt (distinct substrings)

> 💡 **Trực giác.** Thêm từng ký tự mới vào cuối chuỗi và đếm "bao nhiêu suffix MỚI sinh ra mà chưa từng thấy". Một thủ thuật dùng Z: với chuỗi \`T\` hiện tại, đảo ngược nó thành \`R = reverse(T)\`, tính Z của \`R\`; số suffix của \`T\` trùng với suffix cũ = \`max(z(R))\`. Mỗi lần thêm ký tự, số substring mới = (độ dài mới) - (max z của reverse).

**Công thức tăng dần.** Gọi \`T_k\` là chuỗi sau khi thêm ký tự thứ \`k\` (độ dài \`k\`). Số chuỗi con phân biệt mới sinh ra khi thêm ký tự thứ \`k\`:

\`\`\`
new(k) = k - max( z(reverse(T_k)) )
\`\`\`

Tổng cộng dồn cho ra tổng số chuỗi con phân biệt. (Cách này $O(n^2)$ — đơn giản để hiểu; suffix array/automaton ở [Lesson 44](../lesson-44-suffix-structures/README.md) cho $O(n \\log n)$ hoặc $O(n)$.)

**Ví dụ số.** \`T = "aba"\`:
- Thêm 'a' → T="a", reverse="a", z=[0], max=0, new=1-0=1. (substrings: "a")
- Thêm 'b' → T="ab", reverse="ba", z=[0,0], max=0, new=2-0=2. (mới: "b","ab")
- Thêm 'a' → T="aba", reverse="aba", z=[0,0,1], max=1, new=3-1=2. (mới: "ba","aba"; "a" đã có)
- Tổng = 1+2+2 = 5. Kiểm tra thủ công các substring của "aba": "a","b","ab","ba","aba" → đúng 5.

### 6.5 Code Go — đếm distinct substrings (qua Z)

\`\`\`go
// countDistinctSubstrings đếm số chuỗi con phân biệt của s bằng Z-array.
// Ý tưởng: thêm từng ký tự, dùng max(z(reverse(prefix))) để loại các suffix trùng.
// Độ phức tạp: O(n^2) (đơn giản; suffix structures cho tốt hơn).
func countDistinctSubstrings(s string) int {
	n := len(s)
	total := 0
	cur := ""
	for k := 1; k <= n; k++ {
		cur = s[:k]
		// đảo ngược cur
		b := []byte(cur)
		for i, j := 0, len(b)-1; i < j; i, j = i+1, j-1 {
			b[i], b[j] = b[j], b[i]
		}
		z := computeZ(string(b))
		mx := 0
		for _, v := range z {
			if v > mx {
				mx = v
			}
		}
		total += k - mx
	}
	return total
}

func main() {
	fmt.Println(countDistinctSubstrings("aba"))  // 5
	fmt.Println(countDistinctSubstrings("aaa"))  // 3 ("a","aa","aaa")
	fmt.Println(countDistinctSubstrings("abc"))  // 6
	fmt.Println(countDistinctSubstrings("abab")) // 7
}
\`\`\`

### 6.6 Longest common prefix với mọi suffix

Đây chính là **định nghĩa gốc** của Z-array — \`z[i]\` là LCP của S với suffix \`S[i:]\`. Vậy bài toán "với mỗi suffix, tính LCP với toàn chuỗi" được giải **trực tiếp** bằng một lần tính Z, $O(n)$. Không cần thuật toán phụ.

### 6.7 Pattern với wildcard (biến thể)

Z không xử lý wildcard trực tiếp, nhưng có biến thể: tách pattern tại các vị trí wildcard thành nhiều "khối cố định", tìm vị trí xuất hiện mỗi khối bằng Z, rồi dùng bitset/đếm để ghép. Đây là kỹ thuật nâng cao — ta chỉ "tease" ở đây; chi tiết thường kết hợp với FFT cho wildcard tổng quát.

> ⚠ **Lỗi thường gặp.** Với distinct substrings, đừng quên rằng cách dùng Z là $O(n^2)$ — chỉ phù hợp $n$ nhỏ. Bài lớn cần [suffix array/automaton (L44)](../lesson-44-suffix-structures/README.md).

> 📝 **Tóm tắt mục 6.** Z dùng cho: matching (4), period (\`z[p]==n-p\`), distinct substrings (qua reverse, $O(n^2)$), LCP-với-mọi-suffix (chính là z), wildcard (biến thể nâng cao).

---

## 7. Z-array vs Suffix Array (tease Lesson 44)

Z-array trả lời nhanh "LCP của S với mỗi suffix" trong O(n). Nhưng nó **chỉ** so với prefix của S. Nếu bạn cần so **mọi cặp suffix với nhau** (ví dụ tìm chuỗi con chung dài nhất của 2 chuỗi, hay đếm distinct substring trong O(n log n)), bạn cần **suffix array + LCP array** — chủ đề [Lesson 44 — Suffix Structures](../lesson-44-suffix-structures/README.md).

| | Z-array | Suffix array + LCP |
|---|---------|--------------------|
| Trả lời | LCP(S, mỗi suffix) | sắp xếp mọi suffix, LCP mọi cặp kề |
| Xây dựng | $O(n)$ | $O(n \\log n)$ hoặc $O(n)$ |
| Sức mạnh | một chuỗi, so với prefix | so sánh toàn diện mọi suffix |

---

## 8. Độ phức tạp

| Thao tác | Thời gian | Bộ nhớ |
|----------|-----------|--------|
| \`computeZ(S)\` | $O(n)$ | $O(n)$ |
| Pattern matching (\`P+$+T\`) | $O(n+m)$ | $O(n+m)$ (chuỗi ghép) |
| Chu kỳ ngắn nhất | $O(n)$ | $O(n)$ |
| Distinct substrings (qua Z) | $O(n^2)$ | $O(n)$ |
| LCP với mọi suffix | $O(n)$ | $O(n)$ |

> 💡 Điểm mấu chốt cho $O(n)$ là phân tích amortized ở 3.2: \`r\` chỉ tăng, nên tổng số so trực tiếp $\\leq n$.

---

## 9. Cạm bẫy (đọc kỹ trước khi code)

1. **Separator phải vắng mặt** trong P và T. Nếu T chứa \`$\`, matching sai. Chọn sentinel an toàn (\`\\x00\` cho ASCII, rune đặc biệt cho Unicode).
2. **Quên \`min(r-i+1, z[i-l])\`** ở trường hợp trong box → copy nhầm thông tin chưa xác nhận (phần ngoài box). Đây là bug số 1.
3. **Cập nhật \`l, r\` sai thời điểm** — chỉ cập nhật khi box mới **xa hơn** (\`i + z[i] - 1 > r\`). Cập nhật vô điều kiện làm \`r\` lùi → mất bất biến.
4. **Off-by-one ở box.** \`r\` là chỉ số *cuối cùng* trong box (inclusive). "Phần còn lại của box" = \`r - i + 1\` (có \`+1\`). Nhầm thành \`r - i\` làm clip thiếu 1.
5. **Điều kiện match dùng \`>=\` thay vì \`==\`.** Có separator thì \`z[i]\` không vượt $|P|$, nên \`z[i] == |P|\` là đúng. Không có separator (làm Z thẳng trên T) thì \`z[i]\` có thể vượt — phải cẩn thận hơn.
6. **\`z[0]\` quy ước.** Đặt \`z[0]=0\` để vòng matching không kích hoạt nhầm. Một số tài liệu đặt \`z[0]=n\`; nhớ nhất quán.
7. **Chuỗi rỗng / pattern rỗng.** Xử lý \`n==0\` và \`m==0\` riêng để tránh chỉ số âm.

> ⚠ **Ví dụ phản chứng cho cạm bẫy 2.** Box \`[l,r]=[4,7]\`, \`i=6\`, \`z[i-l]=z[2]=5\`. Nếu copy thẳng \`z[6]=5\` → sai, vì chỉ chắc tới \`r=7\` (3 ký tự \`r-i+1=2\`...). Đúng phải \`min(2, 5)=2\` rồi so tiếp ngoài box.

---

## Bài tập

> Mỗi bài có lời giải chi tiết ở mục kế tiếp.

1. **Implement \`strStr\` bằng Z** — trả về chỉ số xuất hiện *đầu tiên* của \`needle\` trong \`haystack\`, hoặc -1 nếu không có (LeetCode 28). Dùng Z, $O(n+m)$.
2. **Đếm số lần xuất hiện** — đếm tất cả vị trí (kể cả overlap) của pattern trong text bằng Z.
3. **Chu kỳ ngắn nhất** — cho chuỗi \`S\`, tìm độ dài chu kỳ ngắn nhất sao cho \`S\` là tiền tố của khối lặp lại.
4. **Longest happy prefix** (LeetCode 1392) — tìm prefix dài nhất của \`S\` mà cũng là suffix (proper, tức ngắn hơn \`S\`). Giải bằng Z.
5. **Multi-pattern matching** — cho text \`T\` và danh sách patterns \`Ps\`, với mỗi pattern trả về số lần xuất hiện trong T. Dùng Z cho từng pattern.
6. **Ý nghĩa tổng Z-array** — \`sum(z)\` của một chuỗi đếm cái gì? Chứng minh và cho ví dụ. Viết hàm tính \`sum(z)\` và giải thích kết quả.

---

## Lời giải chi tiết

### Bài 1 — \`strStr\` bằng Z

**Cách tiếp cận.** Ghép \`W = needle + sep + haystack\`, tính Z, tìm \`i\` đầu tiên (trong phần haystack) có \`z[i] == len(needle)\`, trả \`i - len(needle) - 1\`.

\`\`\`go
func strStr(haystack, needle string) int {
	m := len(needle)
	if m == 0 {
		return 0 // quy ước: chuỗi rỗng khớp tại 0
	}
	w := needle + "\\x00" + haystack
	z := computeZ(w)
	for i := m + 1; i < len(w); i++ {
		if z[i] == m {
			return i - m - 1
		}
	}
	return -1
}
\`\`\`

**Walk-through.** \`haystack="sadbutsad"\`, \`needle="sad"\`. \`W="sad\\x00sadbutsad"\`, m=3. z tại i=4: "sad..." vs "sad..." → khớp 'sad', rồi \`\\x00\`≠'b' → z[4]=3 == m → trả \`4-3-1 = 0\`. Đúng "sad" ở vị trí 0.

**Độ phức tạp.** $O(n+m)$ thời gian, $O(n+m)$ bộ nhớ (chuỗi ghép).

### Bài 2 — Đếm số lần xuất hiện (overlap)

**Cách tiếp cận.** Như bài 1 nhưng đếm *tất cả* \`i\` thỏa \`z[i] == m\` thay vì trả vị trí đầu.

\`\`\`go
func countOccurrences(text, pattern string) int {
	m := len(pattern)
	if m == 0 {
		return 0
	}
	z := computeZ(pattern + "\\x00" + text)
	cnt := 0
	for i := m + 1; i < len(z); i++ {
		if z[i] == m {
			cnt++
		}
	}
	return cnt
}
\`\`\`

**Walk-through.** \`text="aaaa"\`, \`pattern="aa"\`. \`W="aa\\x00aaaa"\`, $m=2$. z: i=3→2, i=4→2, i=5→2, i=6→1. \`z[i]==2\` tại i=3,4,5 → đếm 3. Đúng: "aa" xuất hiện tại vị trí 0,1,2 trong "aaaa" (có overlap).

**Độ phức tạp.** $O(n+m)$.

### Bài 3 — Chu kỳ ngắn nhất

**Cách tiếp cận.** Tính Z. $p$ là chu kỳ ⟺ \`z[p] == n - p\`. Duyệt $p$ từ 1 lên, trả $p$ đầu tiên thỏa. Nếu không có, chuỗi không lặp → trả $n$.

\`\`\`go
func shortestPeriod(s string) int {
	n := len(s)
	if n == 0 {
		return 0
	}
	z := computeZ(s)
	for p := 1; p < n; p++ {
		if z[p] == n-p {
			return p
		}
	}
	return n
}
\`\`\`

**Walk-through.** \`s="abcabcabc"\` ($n=9$). z[3]=6 (khớp tới hết), $n-p=9-3=6$ → bằng → trả 3. "abc" lặp 3 lần.

**Độ phức tạp.** $O(n)$.

### Bài 4 — Longest happy prefix (proper prefix = suffix)

**Cách tiếp cận.** Tính Z. Một prefix độ dài $L$ cũng là suffix ⟺ tồn tại vị trí \`i\` sao cho \`z[i] == n - i\` (suffix bắt đầu tại \`i\` khớp prefix tới hết chuỗi) và $n - i = L$. Để lấy *dài nhất*, duyệt \`i\` từ nhỏ tới lớn; vị trí \`i\` nhỏ nhất thỏa \`z[i] == n - i\` cho $L = n - i$ lớn nhất.

\`\`\`go
func longestHappyPrefix(s string) string {
	n := len(s)
	z := computeZ(s)
	for i := 1; i < n; i++ {
		// suffix tại i khớp prefix tới hết chuỗi → prefix độ dài n-i cũng là suffix.
		if z[i] == n-i {
			return s[:n-i]
		}
	}
	return ""
}
\`\`\`

**Walk-through.** \`s="level"\` ($n=5$). z = [0,0,0,0,1]. i=4: z[4]=1, $n-i=1$ → bằng → trả \`s[:1]="l"\`. "l" là prefix lẫn suffix dài nhất (proper). Đúng.

Ví dụ 2: \`s="ababab"\` ($n=6$). z=[0,0,4,0,2,0]. i=2: z[2]=4, $n-i=4$ → bằng → trả \`s[:4]="abab"\`. "abab" là happy prefix dài nhất.

**Độ phức tạp.** $O(n)$.

### Bài 5 — Multi-pattern matching

**Cách tiếp cận.** Với mỗi pattern, chạy \`countOccurrences\` riêng. Tổng $O(\\sum (n + m_j)) = O(k \\cdot n + \\sum m)$. (Aho-Corasick ở [L43](../lesson-43-trie-aho-corasick/README.md) làm tốt hơn khi nhiều pattern: một lần quét text.)

\`\`\`go
func multiSearch(text string, patterns []string) map[string]int {
	res := make(map[string]int, len(patterns))
	for _, p := range patterns {
		res[p] = countOccurrences(text, p)
	}
	return res
}
\`\`\`

**Walk-through.** \`text="ababab"\`, \`patterns=["ab","aba","abc"]\`. "ab"→3 (vị trí 0,2,4); "aba"→2 (vị trí 0,2); "abc"→0. Kết quả \`{"ab":3,"aba":2,"abc":0}\`.

**Độ phức tạp.** $O(k \\cdot n + \\sum m_j)$ với $k$ = số pattern. Khi $k$ lớn, cân nhắc Aho-Corasick (L43).

### Bài 6 — Ý nghĩa của \`sum(z)\`

**Câu hỏi.** \`sum(z) = Σ z[i]\` đếm cái gì?

**Trả lời.** \`z[i]\` = số ký tự khớp prefix bắt đầu tại \`i\`. Một cách diễn giải: \`sum(z)\` đếm **tổng số cặp (i, L)** với \`1 ≤ L ≤ z[i]\`, mà mỗi cặp tương ứng một vị trí \`i\` mà prefix độ dài \`L\` của S xuất hiện (như substring) tại \`i\`. Tương đương: \`sum(z)\` = **tổng số lần mỗi prefix của S (mọi độ dài) xuất hiện lại trong S tại các vị trí khác \`0\`**.

**Chứng minh từng bước.**
- Với mỗi \`i ≥ 1\`, theo định nghĩa, các prefix độ dài \`1, 2, ..., z[i]\` của S đều xuất hiện tại vị trí \`i\` (vì \`S[i..i+L-1] == S[0..L-1]\` cho mọi \`L ≤ z[i]\`).
- Ngược lại, nếu prefix độ dài \`L\` xuất hiện tại \`i\`, thì \`z[i] ≥ L\`, nên \`L\` được đếm trong \`z[i]\`.
- Vậy số cặp \`(i, L)\` với \`i ≥ 1\`, \`L ≤ z[i]\` đúng bằng \`Σ_{i≥1} z[i] = sum(z)\` (vì \`z[0]=0\`).
- Mỗi cặp \`(i, L)\` là một "lần xuất hiện của prefix-độ-dài-L tại vị trí i ≠ 0". ∎

\`\`\`go
func sumZ(s string) int {
	z := computeZ(s)
	total := 0
	for _, v := range z {
		total += v
	}
	return total
}
\`\`\`

**Ví dụ số.** \`s="aaa"\`: z=[0,2,1], sum=3. Kiểm tra: prefix "a" xuất hiện tại i=1,2 (2 lần); prefix "aa" tại i=1 (1 lần); prefix "aaa" tại i≥1 (0 lần ngoài 0). Tổng = 2+1+0 = 3 ✓.

Ví dụ 2: \`s="abab"\`: z=[0,0,2,0], sum=2. Prefix "ab" xuất hiện tại i=2 (1 lần, độ dài 2 → đóng góp 2 vào sum, ứng với prefix "a" tại i=2 và "ab" tại i=2). ✓.

**Độ phức tạp.** $O(n)$.

---

## Code & Minh họa

- Toàn bộ code Go đã trình bày **inline** ngay trong README (mục 3.3, 4.3, 6.3, 6.5, và phần Lời giải). Không có \`solutions.go\` riêng theo yêu cầu.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Z-array builder** — nhập chuỗi, animate tính \`z[i]\` từng bước với Z-box \`[l, r]\` di chuyển, highlight rõ "copy" (B1) vs "extend" (B2).
  2. **Z matching** — nhập P và T, xem chuỗi ghép \`P + $ + T\`, highlight các vị trí \`z[i] == |P|\` là match.
  3. **Z vs KMP** — so sánh Z-array và LPS array trên cùng một chuỗi, thấy mối liên hệ.

---

## Bài tiếp theo

- **Tiếp theo:** [Lesson 43 — Trie & Aho-Corasick](../lesson-43-trie-aho-corasick/README.md) — multi-pattern matching hiệu quả với một lần quét text.
- **Liên quan:** [Lesson 41 — KMP](../lesson-41-kmp/README.md) (góc nhìn LPS), [Lesson 44 — Suffix Structures](../lesson-44-suffix-structures/README.md) (so sánh mọi suffix).
- **Quay lại:** [Tier 6 — Thuật toán chuỗi](../tier-6-string/index.html) · [Trang chính Algorithms](../index.html).
`;
