// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-41-kmp/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 41 — KMP (Knuth-Morris-Pratt)

> Tier 6 — Thuật toán chuỗi · Lesson 41
> Tiền đề: [Lesson 40 — String Matching & Rabin-Karp](../lesson-40-string-matching-rabin-karp/) (naive matching, rolling hash) · [Tier 0 — Big-O](../tier-0-foundations/)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao naive matching lãng phí**: mỗi mismatch lùi text về \`i+1\` và bỏ hết thông tin đã so sánh.
- Nắm vững **failure function / LPS** (Longest Proper Prefix that is also Suffix) — trái tim của KMP.
- Tự tay tính được bảng LPS cho một pattern bất kỳ bằng **2 con trỏ, O(m)**.
- Chạy được **KMP matching $O(n+m)$**: text pointer **không bao giờ lùi**, pattern pointer nhảy theo LPS.
- Chứng minh được vì sao tổng chi phí là $O(n+m)$ bằng amortized analysis.
- Áp dụng KMP/LPS vào: repeated substring pattern, shortest palindrome, string period, longest happy prefix.
- Phân biệt KMP với Rabin-Karp và Z-algorithm, biết khi nào chọn cái nào.

---

## 1. Vấn đề: naive matching lãng phí thông tin

Bài toán **string matching**: cho text \`T\` độ dài \`n\` và pattern \`P\` độ dài \`m\`, tìm mọi vị trí \`i\` sao cho \`T[i..i+m-1] == P\`.

### 1.1 Naive làm gì

> 💡 **Trực giác.** Naive giống như áp một thước (pattern) lên text, so từng ký tự. Hễ lệch một ký tự là **nhấc thước lên, dịch sang phải đúng 1 ô**, rồi so lại từ đầu. Nó không "nhớ" gì về những ký tự vừa khớp.

\`\`\`
T = A B A B A B C A B A B A B C A
P = A B A B C
\`\`\`

Thử tại \`i = 0\`:

\`\`\`
T:  A B A B A B C ...
P:  A B A B C
    ✓ ✓ ✓ ✓ ✗      (P[4]='C' vs T[4]='A' — mismatch)
\`\`\`

Naive bây giờ làm gì? **Lùi về \`i = 1\`**, bắt đầu so lại từ \`P[0]\`:

\`\`\`
T:  A B A B A B C ...
P:    A B A B C
      ✗            (P[0]='A' vs T[1]='B' — mismatch ngay)
\`\`\`

### 1.2 Chỗ lãng phí

Tại \`i=0\` ta đã biết chắc \`T[0..3] = "ABAB"\`. Khi mismatch tại \`T[4]\`, naive **vứt bỏ** thông tin này và lùi text về \`i=1\`, dù \`T[1]='B'\` chắc chắn không khớp \`P[0]='A'\`.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Naive tệ cỡ nào?"* — Worst case $O(n \\cdot m)$. Với \`T = "AAAA...A"\` ($n$ chữ A) và \`P = "AAA...AB"\` ($m-1$ chữ A rồi B): mỗi vị trí so gần $m$ ký tự rồi mới mismatch ở cuối → $n \\cdot m$ phép so.
> - *"Ta đã so \`"ABAB"\` khớp rồi — có cách nào tận dụng không?"* — Có! Đó chính là ý tưởng KMP: \`"ABAB"\` có phần đuôi \`"AB"\` trùng với phần đầu \`"AB"\` của pattern. Nên thay vì lùi về đầu, ta có thể dịch pattern sao cho \`"AB"\` ở đầu khớp ngay với \`"AB"\` ta vừa thấy.

**KMP (Knuth-Morris-Pratt, 1977)** xử lý đúng chỗ lãng phí này: **text pointer không bao giờ lùi**. Khi mismatch, chỉ pattern pointer "trượt" về một vị trí thông minh tính sẵn.

> 📝 **Tóm tắt mục 1.**
> - Naive: mismatch → lùi text về \`i+1\`, so lại từ \`P[0]\`, vứt hết thông tin đã khớp → $O(nm)$.
> - Thông tin bị vứt: phần prefix của pattern đã khớp với text.
> - KMP: dùng cấu trúc nội tại của pattern (prefix trùng suffix) để **không lùi text**, đạt $O(n+m)$.

---

## 2. Failure function / LPS (Longest Proper Prefix = Suffix)

### 2.1 Định nghĩa

> 💡 **Trực giác.** Tưởng tượng bạn đang đọc pattern và bỗng phải dừng (mismatch). Câu hỏi: *"phần tôi vừa đọc khớp, có khúc ĐẦU nào của pattern lặp lại ở khúc CUỐI không?"* Nếu có, tôi không cần bắt đầu lại từ con số 0 — khúc đầu đó **đã chắc chắn match rồi**.

**(a) Là gì.** Với pattern \`P\`, mảng \`lps\` (length \`m\`) định nghĩa:

> \`lps[i]\` = độ dài của **proper prefix dài nhất** của \`P[0..i]\` mà **đồng thời cũng là suffix** của \`P[0..i]\`.

Trong đó:
- **prefix** của \`P[0..i]\` là đoạn \`P[0..k-1]\` (k ký tự đầu).
- **suffix** của \`P[0..i]\` là đoạn \`P[i-k+1..i]\` (k ký tự cuối).
- **proper** = không tính cả chuỗi (k < i+1). Đây là chỗ rất dễ sai!

**(b) Vì sao tồn tại / vì sao cần.** Khi đang match pattern và mismatch tại \`P[j]\`, ta đã biết \`P[0..j-1]\` khớp với một đoạn text. Nếu \`P[0..j-1]\` có prefix-cũng-là-suffix độ dài \`L = lps[j-1]\`, thì \`L\` ký tự cuối của đoạn text vừa khớp **chính là** \`L\` ký tự đầu của pattern. Vậy ta nhảy pattern pointer về \`L\` (tức \`P[L]\`) — phần \`P[0..L-1]\` đã match miễn phí, **text không lùi**.

**(c) Ví dụ trực giác bằng số.** \`P = "ABAB"\`:
- \`lps[3]\` (cho \`"ABAB"\`): proper prefixes = \`"A","AB","ABA"\`; suffixes = \`"B","AB","BAB"\`. Trùng nhau dài nhất = \`"AB"\` → \`lps[3] = 2\`.
- Ý nghĩa: nếu match được \`"ABAB"\` rồi mismatch ở ký tự thứ 5, ta biết \`"AB"\` cuối = \`"AB"\` đầu pattern → nhảy pattern về index 2, không lùi text.

### 2.2 Bốn ví dụ số cụ thể

**Ví dụ 1 — \`P = "AAAA"\`:**

| i | P[0..i] | LPS dài nhất | lps[i] |
|---|---------|--------------|--------|
| 0 | A       | (rỗng)       | 0 |
| 1 | AA      | "A"          | 1 |
| 2 | AAA     | "AA"         | 2 |
| 3 | AAAA    | "AAA"        | 3 |

\`lps = [0,1,2,3]\`. Toàn ký tự giống nhau → mỗi prefix-suffix dài tối đa (proper).

**Ví dụ 2 — \`P = "ABCDE"\`:**

| i | P[0..i] | LPS | lps[i] |
|---|---------|-----|--------|
| 0 | A | (rỗng) | 0 |
| 1 | AB | (rỗng) | 0 |
| 2 | ABC | (rỗng) | 0 |
| 3 | ABCD | (rỗng) | 0 |
| 4 | ABCDE | (rỗng) | 0 |

\`lps = [0,0,0,0,0]\`. Mọi ký tự khác nhau → không có prefix nào trùng suffix.

**Ví dụ 3 — \`P = "ABABACA"\` (7 ký tự, walk-through đầy đủ):**

| i | P[i] | P[0..i]   | proper prefix = suffix dài nhất | lps[i] |
|---|------|-----------|---------------------------------|--------|
| 0 | A | A         | rỗng                            | 0 |
| 1 | B | AB        | rỗng                            | 0 |
| 2 | A | ABA       | "A"                             | 1 |
| 3 | B | ABAB      | "AB"                            | 2 |
| 4 | A | ABABA     | "ABA"                           | 3 |
| 5 | C | ABABAC    | rỗng (C phá vỡ)                 | 0 |
| 6 | A | ABABACA   | "A"                             | 1 |

\`lps = [0,0,1,2,3,0,1]\`.

Kiểm chứng \`lps[4]=3\`: \`"ABABA"\` có prefix \`"ABA"\` và suffix \`"ABA"\` (ký tự 2,3,4 = \`A,B,A\`) — trùng, độ dài 3. Có \`"ABAB"\` (prefix) vs \`"BABA"\` (suffix) không trùng. Vậy 3 là dài nhất. ✓

**Ví dụ 4 — \`P = "AABAACAABAA"\` (11 ký tự):**

| i | P[i] | P[0..i] | lps[i] |
|---|------|---------|--------|
| 0 | A | A | 0 |
| 1 | A | AA | 1 |
| 2 | B | AAB | 0 |
| 3 | A | AABA | 1 |
| 4 | A | AABAA | 2 |
| 5 | C | AABAAC | 0 |
| 6 | A | AABAACA | 1 |
| 7 | A | AABAACAA | 2 |
| 8 | B | AABAACAAB | 3 |
| 9 | A | AABAACAABA | 4 |
| 10 | A | AABAACAABAA | 5 |

\`lps = [0,1,0,1,2,0,1,2,3,4,5]\`. Cuối cùng \`lps[10]=5\`: \`"AABAA"\` (5 đầu) = \`"AABAA"\` (5 cuối). ✓

> ⚠ **Lỗi thường gặp.**
> - **Tính cả chuỗi.** \`lps[3]\` cho \`"AAAA"\` KHÔNG phải 4 (đó là cả chuỗi \`"AAAA"\`, không proper). Phải là 3.
> - **Nhầm \`lps[i]\` là "có prefix-suffix hay không"** (boolean). Không — nó là **độ dài** dài nhất.
> - **Lấy bất kỳ prefix-suffix nào** thay vì DÀI NHẤT. \`"ABABA"\` có cả \`"A"\` (dài 1) và \`"ABA"\` (dài 3); phải lấy 3.

> 🔁 **Dừng lại tự kiểm tra.** Tính \`lps\` cho \`P = "AABA"\`.
> <details><summary>Đáp án</summary>
> i=0 "A"→0; i=1 "AA"→1; i=2 "AAB"→0; i=3 "AABA"→ prefix "A"=suffix "A" → 1. Vậy <code>lps = [0,1,0,1]</code>.
> </details>

> 📝 **Tóm tắt mục 2.**
> - \`lps[i]\` = độ dài **proper** prefix dài nhất đồng thời là suffix của \`P[0..i]\`.
> - Proper = không tính cả chuỗi. \`lps[i] ≤ i\`.
> - Vai trò: khi mismatch tại \`P[j]\`, nhảy về \`P[lps[j-1]]\` — phần đó đã match, text không lùi.

---

## 3. Tính LPS — O(m), 2 con trỏ

### 3.1 Ý tưởng

Ta xây \`lps\` từ trái sang phải. Dùng 2 con trỏ:
- \`i\`: vị trí đang xét (chạy \`1 → m-1\`).
- \`len\`: độ dài prefix-suffix dài nhất của \`P[0..i-1]\` (= \`lps[i-1]\`).

Quy tắc tại mỗi bước:
1. Nếu \`P[i] == P[len]\`: mở rộng được → \`len++\`, \`lps[i] = len\`, \`i++\`.
2. Nếu \`P[i] != P[len]\` và \`len > 0\`: **lùi \`len\` về \`lps[len-1]\`** (thử prefix-suffix ngắn hơn), KHÔNG tăng \`i\`.
3. Nếu \`P[i] != P[len]\` và \`len == 0\`: \`lps[i] = 0\`, \`i++\`.

> 💡 **Trực giác bước 2.** Nếu prefix-suffix dài \`len\` không mở rộng được, ta thử prefix-suffix NGẮN HƠN. Mà prefix-suffix dài nhất của *chính cái prefix \`P[0..len-1]\`* lại là \`lps[len-1]\`. Đây là đệ quy tự thân — chính LPS giúp tính LPS.

### 3.2 Walk-through đầy đủ: tính LPS cho \`P = "ABABACA"\`

\`m = 7\`. Khởi tạo \`lps = [0,_,_,_,_,_,_]\`, \`len = 0\`, \`i = 1\`.

| Bước | i | len | P[i] | P[len] | So sánh | Hành động | lps sau |
|------|---|-----|------|--------|---------|-----------|---------|
| 1 | 1 | 0 | B | A | ≠, len=0 | lps[1]=0, i=2 | [0,0,_,_,_,_,_] |
| 2 | 2 | 0 | A | A | = | len=1, lps[2]=1, i=3 | [0,0,1,_,_,_,_] |
| 3 | 3 | 1 | B | B | = | len=2, lps[3]=2, i=4 | [0,0,1,2,_,_,_] |
| 4 | 4 | 2 | A | A | = | len=3, lps[4]=3, i=5 | [0,0,1,2,3,_,_] |
| 5 | 5 | 3 | C | B | ≠, len>0 | len=lps[2]=1 (không tăng i) | (chưa đổi lps) |
| 6 | 5 | 1 | C | B | ≠, len>0 | len=lps[0]=0 (không tăng i) | (chưa đổi lps) |
| 7 | 5 | 0 | C | A | ≠, len=0 | lps[5]=0, i=6 | [0,0,1,2,3,0,_] |
| 8 | 6 | 0 | A | A | = | len=1, lps[6]=1, i=7 | [0,0,1,2,3,0,1] |

Kết quả \`lps = [0,0,1,2,3,0,1]\` — khớp Ví dụ 3 ở mục 2.2. ✓

Chú ý bước 5-6: khi \`C\` không khớp \`P[3]='B'\`, ta lùi \`len\` qua 2 nấc (\`3 → 1 → 0\`) **mà không tăng \`i\`**. Đây là điểm khiến nhiều người nghĩ "vòng lặp này $O(m^2)$" — nhưng nó amortized $O(m)$ (xem mục 5).

### 3.3 Code Go — \`computeLPS\`

\`\`\`go
// computeLPS xây mảng LPS (failure function) cho pattern.
// lps[i] = độ dài proper prefix dài nhất của P[0..i] đồng thời là suffix.
// Độ phức tạp: O(m) thời gian, O(m) bộ nhớ.
func computeLPS(p string) []int {
	m := len(p)
	lps := make([]int, m)
	// lps[0] luôn = 0 (1 ký tự không có proper prefix).
	length := 0 // len của prefix-suffix dài nhất của P[0..i-1]
	i := 1
	for i < m {
		if p[i] == p[length] {
			// Mở rộng được prefix-suffix.
			length++
			lps[i] = length
			i++
		} else if length > 0 {
			// KHÔNG khớp nhưng còn prefix-suffix ngắn hơn để thử.
			// Lùi length về lps[length-1] — KHÔNG tăng i.
			length = lps[length-1]
		} else {
			// length == 0: không có gì để thử nữa.
			lps[i] = 0
			i++
		}
	}
	return lps
}
\`\`\`

> ❓ **Câu hỏi tự nhiên.**
> - *"Tại sao bước \`length = lps[length-1]\` lại không tăng \`i\`?"* — Vì ta vẫn đang xét cùng một \`P[i]\`, chỉ thử khớp nó với một prefix ngắn hơn. Chỉ khi quyết định xong \`lps[i]\` mới \`i++\`.
> - *"Có off-by-one nào dễ vướng không?"* — Có: \`lps[length-1]\`, KHÔNG phải \`lps[length]\`. Vì \`length\` là độ dài (1-based count), index của ký tự cuối prefix là \`length-1\`.

> 🔁 **Dừng lại tự kiểm tra.** Áp dụng \`computeLPS("AABAACAABAA")\` cho ra mảng gì?
> <details><summary>Đáp án</summary>
> <code>[0,1,0,1,2,0,1,2,3,4,5]</code> — khớp Ví dụ 4 mục 2.2.
> </details>

> 📝 **Tóm tắt mục 3.**
> - 2 con trỏ \`i\` (chạy tiến) và \`len\` (độ dài prefix-suffix hiện tại).
> - 3 nhánh: match → mở rộng; mismatch & len>0 → lùi \`len=lps[len-1]\`; mismatch & len=0 → ghi 0.
> - Off-by-one then chốt: \`lps[length-1]\`, không \`lps[length]\`.

---

## 4. KMP matching — O(n), text pointer không lùi

### 4.1 Thuật toán

Dùng 2 con trỏ: \`i\` chạy trên text, \`j\` chạy trên pattern.

- \`T[i] == P[j]\`: cả hai tiến (\`i++\`, \`j++\`). Nếu \`j == m\` → tìm thấy match tại \`i-m\`; nhảy \`j = lps[j-1]\` để tìm tiếp.
- \`T[i] != P[j]\` và \`j > 0\`: nhảy \`j = lps[j-1]\` (KHÔNG tăng \`i\` — text đứng yên).
- \`T[i] != P[j]\` và \`j == 0\`: \`i++\` (text tiến, pattern vẫn ở đầu).

**\`i\` chỉ tăng, không bao giờ giảm** — đó là cốt lõi của KMP.

### 4.2 Walk-through: tìm \`P = "ABABCABAB"\` trong \`T\`

\`P = "ABABCABAB"\` ($m=9$). Trước hết tính \`lps\`:

| i | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|---|
| P[i] | A | B | A | B | C | A | B | A | B |
| lps[i] | 0 | 0 | 1 | 2 | 0 | 1 | 2 | 3 | 4 |

(Kiểm: \`lps[3]\` cho \`"ABAB"\`→2; \`lps[4]\` \`"ABABC"\`→0; \`lps[8]\` \`"ABABCABAB"\` có \`"ABAB"\` đầu = \`"ABAB"\` cuối → 4.) ✓

Tìm trong \`T = "ABABDABACDABABCABAB"\` ($n=19$):

\`\`\`
index: 0123456789...
T:     A B A B D A B A C D A B A B C A B A B
\`\`\`

Diễn tiến (chỉ ghi các bước then chốt):

| i | j | T[i] | P[j] | Sự kiện | Hành động |
|---|---|------|------|---------|-----------|
| 0..3 | 0..3 | A,B,A,B | A,B,A,B | match 4 ký tự | i=4, j=4 |
| 4 | 4 | D | C | mismatch, j>0 | j=lps[3]=2, **i giữ nguyên =4** |
| 4 | 2 | D | A | mismatch, j>0 | j=lps[1]=0, **i=4** |
| 4 | 0 | D | A | mismatch, j=0 | i=5 |
| 5..7 | 0..2 | A,B,A | A,B,A | match | i=8, j=3 |
| 8 | 3 | C | B | mismatch, j>0 | j=lps[2]=1, i=8 |
| 8 | 1 | C | B | mismatch, j>0 | j=lps[0]=0, i=8 |
| 8 | 0 | C | A | mismatch, j=0 | i=9 |
| 9 | 0 | D | A | mismatch, j=0 | i=10 |
| 10..18 | 0..8 | ABABCABAB | ABABCABAB | match toàn bộ | j=9==m → **MATCH tại i-m=10** |

Tìm thấy pattern bắt đầu ở index **10**. Lưu ý suốt quá trình \`i\` chỉ tiến (\`0→4→5→8→9→10→...→19\`), không bao giờ lùi, dù \`j\` nhảy xuống nhiều lần.

### 4.3 Code Go — KMP search

\`\`\`go
// kmpSearch trả về mọi vị trí bắt đầu của pattern p trong text t.
// Độ phức tạp: O(n + m) thời gian, O(m) bộ nhớ (cho lps).
func kmpSearch(t, p string) []int {
	n, m := len(t), len(p)
	res := []int{}
	if m == 0 || m > n {
		return res
	}
	lps := computeLPS(p)
	i, j := 0, 0 // i: con trỏ text (chỉ tiến); j: con trỏ pattern
	for i < n {
		if t[i] == p[j] {
			i++
			j++
			if j == m {
				// Tìm thấy match kết thúc tại i-1, bắt đầu tại i-m.
				res = append(res, i-m)
				// Nhảy để tìm match tiếp theo (có thể overlap).
				j = lps[j-1]
			}
		} else if j > 0 {
			// Mismatch: trượt pattern, text ĐỨNG YÊN.
			j = lps[j-1]
		} else {
			// j == 0: text tiến.
			i++
		}
	}
	return res
}
\`\`\`

> ⚠ **Lỗi thường gặp.**
> - **Reset \`j = 0\` thay vì \`j = lps[j-1]\`** khi mismatch → biến thành naive, mất tính O(n).
> - **Tăng \`i\` trong nhánh mismatch & j>0** → bỏ sót match (text không được lùi nhưng cũng KHÔNG nên nhảy qua ký tự chưa xét).
> - **Quên \`j = lps[j-1]\` sau khi tìm thấy match** → vòng vô hạn (j luôn = m) hoặc bỏ sót match overlap.

> 🔁 **Dừng lại tự kiểm tra.** Tìm \`P="AA"\` trong \`T="AAAA"\` cho ra các vị trí nào?
> <details><summary>Đáp án</summary>
> <code>[0,1,2]</code>. lps=[0,1]. Match tại 0 → j=lps[1]=1, tiếp tục match tại 1, 2 (overlap). Nhờ <code>j=lps[j-1]</code> giữ overlap đúng.
> </details>

> 📝 **Tóm tắt mục 4.**
> - 3 nhánh: match → cả hai tiến (nếu j==m: ghi match, j=lps[j-1]); mismatch & j>0 → j=lps[j-1], i giữ; mismatch & j=0 → i++.
> - \`i\` đơn điệu tăng — text không lùi.
> - \`j=lps[j-1]\` sau match cho phép tìm các match overlap.

---

## 5. Vì sao O(n+m)?

> 💡 **Trực giác.** Nhìn vào $i + j$ (tổng 2 con trỏ) như một "đồng hồ". Mỗi bước vòng lặp HOẶC tăng $i$ (match hoặc nhánh j=0), HOẶC giữ $i$ nhưng giảm $j$ (nhánh \`j=lps[j-1]\`, vì \`lps[j-1] < j\`). $i+j$ không bao giờ giảm trừ khi... thực ra $i+j$ cũng không giảm khi $i$ giữ và $j$ giảm? Hãy đếm cẩn thận hơn.

**Phân tích amortized (kiểu potential / counting).**

- **Con trỏ text $i$:** chỉ tăng, từ 0 đến $n$. Mỗi lần tăng tốn $O(1)$. Tổng cộng $O(n)$ lần tăng $i$.
- **Con trỏ pattern $j$:**
  - $j$ **tăng** chỉ trong nhánh match (cùng lúc $i$ tăng). Vì $i$ tăng tối đa $n$ lần, $j$ cũng tăng tối đa $n$ lần.
  - $j$ **giảm** trong nhánh \`j = lps[j-1]\` (vì \`lps[j-1] < j\`, luôn giảm ít nhất 1).
  - $j \\geq 0$ luôn. Mỗi lần giảm bớt $\\geq 1$. Tổng số lần giảm **không thể vượt** tổng số lần tăng (nếu không $j$ sẽ âm). Vậy tổng lần giảm $\\leq$ tổng lần tăng $= O(n)$.

Vậy toàn bộ vòng lặp matching chạy $O(n)$ bước. Cộng \`computeLPS\` là $O(m)$ (cùng lập luận: \`len\` tăng tối đa $m$ lần nên giảm tối đa $m$ lần). **Tổng: $O(n+m)$**, bộ nhớ $O(m)$.

> ❓ **Câu hỏi tự nhiên.** *"Nhánh \`j=lps[j-1]\` chạy nhiều lần liên tiếp trong 1 vị trí $i$ (như bước 5-6 mục 3.2) thì sao?"* — Đúng là một bước $i$ có thể kéo theo nhiều lần giảm $j$. Nhưng **tổng cộng trên toàn bộ thuật toán**, số lần giảm bị chặn bởi số lần tăng. Một vị trí giảm nhiều thì vị trí khác giảm ít — amortized vẫn $O(1)$/bước.

> 📝 **Tóm tắt mục 5.**
> - $i$ đơn điệu tăng → $O(n)$ cho text.
> - $j$ tăng $\\leq n$ lần (cùng match) ⇒ giảm $\\leq n$ lần (vì $j \\geq 0$) → tổng $O(n)$.
> - computeLPS tương tự $O(m)$. Tổng $O(n+m)$, không phải $O(nm)$.

---

## 6. Trực giác sâu hơn về LPS

> 💡 **Hình dung.** Đã match prefix \`P[0..j-1]\` với một đoạn text, rồi mismatch ở \`P[j]\`. Đoạn text vừa khớp = \`P[0..j-1]\`. Câu hỏi: *"có thể dịch pattern sang phải sao cho một prefix mới của nó khớp ngay với đuôi đoạn text này không, mà không cần so lại?"*

Vì đoạn text vừa khớp **chính là \`P[0..j-1]\`**, nên "đuôi đoạn text" = **suffix của \`P[0..j-1]\`**. Ta cần prefix của pattern khớp suffix này → đó đúng là **prefix-cũng-là-suffix** = \`lps[j-1]\`.

Ví dụ với \`P = "ABABC"\`, mismatch tại \`j=4\` (\`P[4]='C'\`):
- Đã khớp \`P[0..3] = "ABAB"\`.
- \`lps[3] = 2\` (\`"AB"\`).
- Nghĩa: 2 ký tự cuối của đoạn text (\`"AB"\`) = 2 ký tự đầu pattern (\`"AB"\`). Nhảy \`j=2\`, so tiếp \`P[2]\` với text — **không lùi text, không so lại \`"AB"\`**.

Nói cách khác: \`lps[j-1]\` cho biết **phần nào của pattern đã chắc chắn match** (vì nó trùng với đuôi text vừa khớp) → bỏ qua phần đó, tiếp tục từ giữa pattern.

> 🔁 **Dừng lại tự kiểm tra.** Với \`P="AAACAAAA"\`, mismatch ở \`j=3\` (\`P[3]='C'\`). Nhảy \`j\` về đâu?
> <details><summary>Đáp án</summary>
> Đã khớp "AAA". lps[2]=2 (cho "AAA": "AA"="AA"). Nhảy j=2. (Đoạn "AA" cuối đã chắc chắn khớp.)
> </details>

> 📝 **Tóm tắt mục 6.** Đoạn text vừa khớp = \`P[0..j-1]\`; suffix của nó = prefix của pattern qua \`lps[j-1]\`; phần đó match miễn phí → đó là lý do KMP không cần lùi text.

---

## 7. Ứng dụng

### 7.1 Substring search guaranteed O(n+m)

Khác Rabin-Karp (có thể có hash collision → worst case O(nm)), KMP **luôn** O(n+m), không phụ thuộc dữ liệu. Lý tưởng khi cần guarantee.

### 7.2 Repeated substring pattern

> Cho \`s\`, hỏi \`s\` có là **một chuỗi con lặp lại nhiều lần** không (vd \`"abcabcabc"\` = \`"abc"\` × 3)?

**Mẹo:** Gọi \`L = lps[n-1]\` (LPS cuối của cả chuỗi). Đặt $\\text{period} = n - L$.
- Nếu $n \\bmod \\text{period} = 0$ **và** $L > 0$ → \`s\` lặp với chu kỳ $\\text{period}$.

**Walk-through \`s = "abcabc"\` ($n=6$):** lps = \`[0,0,0,1,2,3]\`. \`L=lps[5]=3\`, $\\text{period} = 6-3 = 3$, $6 \\bmod 3 = 0$ và $L>0$ → ĐÚNG, lặp \`"abc"\` × 2.

**Walk-through \`s = "aba"\` ($n=3$):** lps = \`[0,0,1]\`. $L=1$, $\\text{period}=2$, $3 \\bmod 2 = 1 \\neq 0$ → SAI (không lặp). ✓

\`\`\`go
// repeatedSubstringPattern: s có là một substring lặp ≥ 2 lần không?
func repeatedSubstringPattern(s string) bool {
	n := len(s)
	if n < 2 {
		return false
	}
	lps := computeLPS(s)
	L := lps[n-1]      // prefix-suffix dài nhất của cả chuỗi
	period := n - L    // độ dài chu kỳ ứng viên
	return L > 0 && n%period == 0
}
\`\`\`

### 7.3 Shortest palindrome (prepend)

> Cho \`s\`, thêm ký tự vào ĐẦU để biến thành palindrome ngắn nhất.

**Ý tưởng:** Tạo \`combined = s + "#" + reverse(s)\`. \`lps[combined.len-1]\` = độ dài prefix dài nhất của \`s\` mà đồng thời là palindrome. Phần còn lại của \`s\` (đảo ngược) prepend vào đầu.

**Walk-through \`s = "aacecaaa"\`:** prefix palindrome dài nhất = \`"aacecaa"\` (7 ký tự). Ký tự cuối \`"a"\` không nằm trong palindrome đó → prepend \`"a"\` → \`"aaacecaaa"\` (palindrome). Dùng \`#\` để tránh prefix vượt ranh giới \`s\`.

### 7.4 String period (chu kỳ nhỏ nhất)

Chu kỳ nhỏ nhất của \`s\` là $n - $ \`lps[n-1]\` (nếu $n \\bmod (n - $\`lps[n-1]\`$) = 0$ thì đó là chu kỳ thật sự lặp kín; nếu không, đó vẫn là "chu kỳ" theo nghĩa string period mở rộng).

**Walk-through \`s = "ababab"\`:** lps=\`[0,0,1,2,3,4]\`, \`lps[5]=4\`, chu kỳ $= 6-4 = 2$ (\`"ab"\`). $6 \\bmod 2 = 0$ → lặp kín. ✓

\`\`\`go
// smallestPeriod trả về độ dài chu kỳ nhỏ nhất khiến s lặp kín;
// nếu s không lặp kín, trả về n (cả chuỗi là chu kỳ).
func smallestPeriod(s string) int {
	n := len(s)
	if n == 0 {
		return 0
	}
	lps := computeLPS(s)
	p := n - lps[n-1]
	if n%p == 0 {
		return p // s = (s[0..p-1]) lặp n/p lần
	}
	return n
}
\`\`\`

### 7.5 Longest happy prefix

> "Happy prefix" = prefix đồng thời là suffix (không tính cả chuỗi). Cái dài nhất chính là \`P[0..lps[n-1]-1]\`.

**Walk-through \`s = "level"\`:** lps=\`[0,0,0,0,1]\`, \`lps[4]=1\` → happy prefix = \`"l"\`.

> 📝 **Tóm tắt mục 7.** Hầu hết ứng dụng quy về **LPS cuối** \`lps[n-1]\`: repeated pattern ($n \\bmod (n-L) = 0$), period ($n-L$), happy prefix (\`s[0..L-1]\`). Shortest palindrome dùng \`s+#+reverse(s)\`.

---

## 8. KMP automaton (nhắc qua)

Có thể biến LPS thành một **DFA (automaton)**: bảng \`delta[j][c]\` = trạng thái pattern pointer sau khi đang ở \`j\` và đọc ký tự \`c\`. Khi đó matching chỉ là \`j = delta[j][T[i]]\` — KHÔNG cần nhánh \`lps[j-1]\` lặp lại.

\`\`\`go
// buildAutomaton: delta[j][c] = trạng thái mới khi ở state j đọc ký tự c.
func buildAutomaton(p string, alphabet []byte) map[byte][]int {
	m := len(p)
	delta := map[byte][]int{}
	for _, c := range alphabet {
		delta[c] = make([]int, m+1)
	}
	lps := computeLPS(p)
	for j := 0; j <= m; j++ {
		for _, c := range alphabet {
			if j < m && c == p[j] {
				delta[c][j] = j + 1 // khớp → tiến
			} else if j > 0 {
				delta[c][j] = delta[c][lps[j-1]] // dùng LPS đã tính
			} else {
				delta[c][j] = 0
			}
		}
	}
	return delta
}
\`\`\`

**Đánh đổi:** automaton matching là $O(n)$ cứng (mỗi ký tự 1 lookup) nhưng tiền xử lý $O(m \\cdot |\\Sigma|)$ thời gian và bộ nhớ. Hợp khi alphabet nhỏ và cần latency cực thấp mỗi ký tự (vd hardware, streaming).

---

## 9. So sánh: KMP vs Rabin-Karp vs Z-algorithm

| Tiêu chí | KMP | Rabin-Karp ([L40](../lesson-40-string-matching-rabin-karp/)) | Z-algorithm ([L42](../lesson-42-z-algorithm/)) |
|----------|-----|-------------|-------------|
| Tiền xử lý | LPS $O(m)$ | hash $O(m)$ | Z trên \`P#T\` $O(n+m)$ |
| Matching | $O(n)$ guaranteed | $O(n)$ trung bình, $O(nm)$ worst (collision) | $O(n+m)$ |
| Worst case | $O(n+m)$ chắc chắn | $O(nm)$ (collision đối nghịch) | $O(n+m)$ chắc chắn |
| Sai (false positive) | Không bao giờ | Có thể (cần verify) | Không bao giờ |
| Multi-pattern | Không trực tiếp (→ Aho-Corasick) | **Tốt** (hash nhiều pattern cùng độ dài) | Không trực tiếp |
| Trực quan | Trung bình (LPS hơi khó cảm) | Dễ (hash) | **Dễ nhất** (Z = "khớp prefix tại mỗi vị trí") |

> ❓ **Khi nào chọn cái nào?**
> - Cần **guarantee** không phụ thuộc dữ liệu → **KMP** (hoặc Z).
> - **Nhiều pattern** cùng độ dài → **Rabin-Karp**.
> - Cần code ngắn, dễ hiểu, một pattern → **Z** (L42, tương đương KMP về độ phức tạp nhưng trực giác hơn).
> - Streaming/hardware alphabet nhỏ → **KMP automaton**.

> 📝 **Tóm tắt mục 9.** KMP = guaranteed $O(n+m)$, không collision, nhưng LPS hơi trừu tượng. RK đơn giản, đa pattern, nhưng worst $O(nm)$. Z tương đương KMP, trực quan hơn (học ở L42).

---

## 10. Cạm bẫy

| Cạm bẫy | Triệu chứng | Cách tránh |
|---------|-------------|------------|
| Tính LPS sai (tính cả chuỗi) | \`lps[m-1] == m\`, period = 0 | Proper prefix — không bao giờ tính cả chuỗi; \`lps[i] ≤ i\` |
| Off-by-one \`lps[length]\` thay \`lps[length-1]\` | Index out of range hoặc kết quả sai | \`length\` là độ dài → index ký tự cuối = \`length-1\` |
| Nhầm nghĩa \`lps[i]\` (boolean / vị trí) | Logic nhảy sai | \`lps[i]\` là **độ dài** prefix-suffix dài nhất |
| Reset \`j=0\` khi mismatch | Chậm về $O(nm)$, mất ưu thế | \`j = lps[j-1]\` (không reset về 0 trừ khi lps[j-1]=0) |
| Quên \`j=lps[j-1]\` sau match | Vòng vô hạn / sót match overlap | Sau \`j==m\`: \`j = lps[j-1]\` |
| Tăng \`i\` ở nhánh mismatch & j>0 | Bỏ sót match | Text **không lùi nhưng cũng không nhảy** — chỉ đổi \`j\` |

> 📝 **Tóm tắt mục 10.** Hai lỗi chí mạng: (1) LPS tính sai do tính cả chuỗi / off-by-one; (2) khi mismatch reset \`j=0\` (thành naive) hoặc tăng nhầm \`i\`.

---

## Bài tập

> Mọi bài đều có lời giải chi tiết bên dưới. Thử tự làm trước.

1. **implement strStr (KMP).** Cho \`haystack\`, \`needle\`; trả về index đầu tiên của \`needle\` trong \`haystack\` (-1 nếu không có). Dùng KMP. Big-O?
2. **Repeated Substring Pattern.** Cho \`s\`, kiểm tra \`s\` có thể tạo từ một substring lặp ≥ 2 lần không.
3. **Shortest Palindrome.** Thêm ký tự vào ĐẦU \`s\` để thành palindrome ngắn nhất; trả về palindrome đó.
4. **Longest Happy Prefix.** Trả về prefix dài nhất đồng thời là suffix (không tính cả chuỗi).
5. **Count Pattern Occurrences.** Đếm số lần \`p\` xuất hiện trong \`t\` (kể cả overlap).
6. **String Rotation Check.** Cho \`a\`, \`b\`; kiểm tra \`b\` có là một phép xoay vòng của \`a\` không (vd \`"abcde"\` ↔ \`"cdeab"\`).

---

## Lời giải chi tiết

### Bài 1 — strStr (KMP)

**Cách tiếp cận.** Tính \`lps\` của \`needle\`, chạy KMP, trả về match đầu tiên.

\`\`\`go
func strStr(haystack, needle string) int {
	if len(needle) == 0 {
		return 0
	}
	lps := computeLPS(needle)
	i, j := 0, 0
	for i < len(haystack) {
		if haystack[i] == needle[j] {
			i++
			j++
			if j == len(needle) {
				return i - j // match đầu tiên
			}
		} else if j > 0 {
			j = lps[j-1]
		} else {
			i++
		}
	}
	return -1
}
\`\`\`

**Walk-through \`haystack="aabaaab"\`, \`needle="aab"\`:** lps("aab")=\`[0,1,0]\`. i=0..2 khớp "aab" → j=3==m → trả \`0\`. ✓ (Nếu cần match tại vị trí khác, ví dụ needle="aaab", lps=[0,1,2,0], match bắt đầu tại index 3.)

**Big-O:** $O(n+m)$ thời gian, $O(m)$ bộ nhớ.

### Bài 2 — Repeated Substring Pattern

**Cách tiếp cận.** Như mục 7.2: \`L = lps[n-1]\`, \`period = n - L\`; trả về \`L > 0 && n % period == 0\`.

\`\`\`go
func repeatedSubstringPattern(s string) bool {
	n := len(s)
	if n < 2 {
		return false
	}
	lps := computeLPS(s)
	L := lps[n-1]
	period := n - L
	return L > 0 && n%period == 0
}
\`\`\`

**Walk-through \`s="abcabcabc"\` ($n=9$):** lps=\`[0,0,0,1,2,3,4,5,6]\`, $L=6$, $\\text{period}=3$, $9 \\bmod 3 = 0$ & $L>0$ → \`true\` (lặp "abc"×3). Với \`s="aba"\`: lps=\`[0,0,1]\`, $L=1$, $\\text{period}=2$, $3 \\bmod 2 = 1$ → \`false\`. ✓

**Big-O:** $O(n)$ thời gian, $O(n)$ bộ nhớ.

### Bài 3 — Shortest Palindrome

**Cách tiếp cận.** Tìm prefix palindrome dài nhất của \`s\` qua LPS của \`combined = s + "#" + reverse(s)\`. Phần đuôi của \`s\` không thuộc prefix-palindrome (đảo ngược) được prepend vào đầu.

\`\`\`go
func reverse(s string) string {
	b := []byte(s)
	for i, j := 0, len(b)-1; i < j; i, j = i+1, j-1 {
		b[i], b[j] = b[j], b[i]
	}
	return string(b)
}

func shortestPalindrome(s string) string {
	if len(s) == 0 {
		return s
	}
	rev := reverse(s)
	combined := s + "#" + rev // '#' chặn prefix vượt ranh giới s
	lps := computeLPS(combined)
	palLen := lps[len(combined)-1] // độ dài prefix palindrome của s
	suffix := s[palLen:]           // phần không thuộc palindrome
	return reverse(suffix) + s
}
\`\`\`

**Walk-through \`s="aacecaaa"\`:** prefix palindrome dài nhất = \`"aacecaa"\` (palLen=7). \`suffix=s[7:]="a"\`, \`reverse("a")="a"\` → kết quả \`"a"+"aacecaaa"="aaacecaaa"\` (palindrome). ✓ Với \`s="abcd"\`: palLen=1 ("a"), suffix="bcd", reverse="dcb" → \`"dcbabcd"\`.

**Big-O:** $O(n)$ thời gian, $O(n)$ bộ nhớ.

### Bài 4 — Longest Happy Prefix

**Cách tiếp cận.** Đáp án chính là \`s[0 : lps[n-1]]\`.

\`\`\`go
func longestHappyPrefix(s string) string {
	n := len(s)
	if n == 0 {
		return ""
	}
	lps := computeLPS(s)
	return s[:lps[n-1]]
}
\`\`\`

**Walk-through \`s="ababab"\`:** lps=\`[0,0,1,2,3,4]\`, \`lps[5]=4\` → \`s[:4]="abab"\`. Với \`s="aabcaabdaab"\`: lps cuối = 3 → \`"aab"\`. Với \`s="abcdef"\`: lps cuối=0 → \`""\`. ✓

**Big-O:** $O(n)$ thời gian, $O(n)$ bộ nhớ.

### Bài 5 — Count Pattern Occurrences (kể cả overlap)

**Cách tiếp cận.** Chạy KMP, mỗi lần \`j==m\` tăng đếm rồi \`j=lps[j-1]\` (giữ overlap).

\`\`\`go
func countOccurrences(t, p string) int {
	n, m := len(t), len(p)
	if m == 0 || m > n {
		return 0
	}
	lps := computeLPS(p)
	count, i, j := 0, 0, 0
	for i < n {
		if t[i] == p[j] {
			i++
			j++
			if j == m {
				count++
				j = lps[j-1] // tiếp tục để bắt overlap
			}
		} else if j > 0 {
			j = lps[j-1]
		} else {
			i++
		}
	}
	return count
}
\`\`\`

**Walk-through \`t="aaaa"\`, \`p="aa"\`:** lps("aa")=\`[0,1]\`. Match tại i=2 (start 0)→count=1, j=lps[1]=1; match tại i=3 (start 1)→count=2, j=1; match tại i=4 (start 2)→count=3. Trả \`3\`. ✓ Naive đếm overlap dễ sai khi reset j=0.

**Big-O:** $O(n+m)$ thời gian, $O(m)$ bộ nhớ.

### Bài 6 — String Rotation Check

**Cách tiếp cận.** \`b\` là phép xoay của \`a\` ⟺ \`len(a)==len(b)\` **và** \`b\` là substring của \`a+a\`. Dùng KMP để search trong \`a+a\` → $O(n)$.

\`\`\`go
func isRotation(a, b string) bool {
	if len(a) != len(b) {
		return false
	}
	if len(a) == 0 {
		return true
	}
	doubled := a + a
	return len(kmpSearch(doubled, b)) > 0
}
\`\`\`

**Walk-through \`a="abcde"\`, \`b="cdeab"\`:** \`a+a="abcdeabcde"\`, tìm \`"cdeab"\` → có (bắt đầu index 2) → \`true\`. Với \`b="abced"\`: không phải substring \`a+a\` → \`false\`. ✓

**Vì sao đúng:** mọi phép xoay của \`a\` đều xuất hiện liền mạch trong \`a+a\` (vd \`a="abcde"\` → \`a+a="abcde|abcde"\`, các xoay \`"bcdea","cdeab",...\` đều là cửa sổ độ dài $n$ trong đó). KMP đảm bảo search $O(2n+n)=O(n)$.

**Big-O:** $O(n)$ thời gian, $O(n)$ bộ nhớ.

---

## Code & Minh họa

- Toàn bộ code Go ở trên (\`computeLPS\`, \`kmpSearch\`, ứng dụng, lời giải) biên dịch được — ghép vào một \`package main\` với \`import "fmt"\` và \`main()\` gọi thử là chạy.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **LPS builder** — nhập pattern, animate tính \`lps[]\` từng ký tự với 2 con trỏ \`i\`/\`len\`.
  2. **KMP matching** — nhập text + pattern, animate match; khi mismatch nhảy theo LPS, text pointer không lùi.
  3. **Naive vs KMP** — đếm số phép so sánh trên cùng input, thấy rõ KMP tiết kiệm.

---

## Bài tiếp theo

➡ [Lesson 42 — Z-Algorithm](../lesson-42-z-algorithm/) — một thuật toán tuyến tính tương đương KMP nhưng **trực quan hơn**: Z-array đo "độ dài khớp prefix tại mỗi vị trí". So sánh trực tiếp với LPS của KMP.

⬅ Quay lại [Lesson 40 — String Matching & Rabin-Karp](../lesson-40-string-matching-rabin-karp/) · 🏠 [Tier 6](../tier-6-string/index.html)
`;
