// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-40-string-matching-rabin-karp/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 40 — String Matching & Rabin-Karp

> Tier 6 · Lesson **mở đầu** nhánh **thuật toán chuỗi (string algorithms)**. Câu hỏi nền tảng
> của cả Tier: *"Cho một văn bản dài T và một mẫu P, làm sao tìm **mọi** vị trí P xuất hiện
> trong T cho nhanh?"* Đây là bài toán bạn gặp mỗi lần nhấn Ctrl+F, mỗi lần \`grep\`, mỗi lần
> trình duyệt highlight từ khoá. Bài này đi từ cách ngây thơ O(nm) đến **Rabin-Karp** dùng
> **rolling hash** đạt $O(n+m)$ trung bình — và quan trọng hơn, dạy bạn tư duy "băm để so nhanh,
> verify để chắc đúng" áp dụng được cho rất nhiều bài chuỗi về sau.

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Phát biểu chính xác **bài toán string matching** và phân biệt "tìm 1 vị trí" với "tìm mọi vị trí".
2. Cài đặt **naive matching** $O(nm)$ và hiểu vì sao nó chậm (so lại từ đầu mỗi lần trượt).
3. Hiểu **rolling hash (polynomial hash)**: tính hash của một window và **cập nhật $O(1)$** khi trượt thay vì $O(m)$.
4. Cài đặt **Rabin-Karp** đầy đủ: so hash trước ($O(1)$), **verify ký tự** khi hash khớp để loại false positive.
5. Hiểu **collision**, vì sao phải chọn $\\bmod q$ nguyên tố lớn và base $b$ tốt, và **double hashing**.
6. Mở rộng sang **multi-pattern Rabin-Karp** (nhiều mẫu cùng độ dài, 1 pass) — nền của plagiarism detection.
7. Dùng Rabin-Karp cho **longest duplicate substring** (binary search độ dài + hash), **2D pattern matching**, **đếm substring phân biệt**.
8. So sánh Rabin-Karp với **KMP (L41)** và **Z-algorithm (L42)** để biết khi nào chọn cái nào.

## Kiến thức tiền đề

- **[L16 — Kỹ thuật băm (Hashing)](../lesson-16-hashing-techniques/README.md)**: hàm băm, collision, chọn mod nguyên tố. Rolling hash là một hàm băm có thêm tính chất "trượt được".
- **[L14 — Sliding Window](../lesson-14-sliding-window/README.md)**: ý tưởng cửa sổ trượt cập nhật trạng thái khi vào/ra phần tử — rolling hash chính là sliding window trên hash.
- **[L12 — Binary Search](../lesson-12-binary-search-variants/README.md)**: dùng cho bài longest duplicate substring (nhị phân trên độ dài).
- **[L01 — Big-O](../lesson-01-bigo-asymptotic/README.md)**: phân biệt average-case và worst-case — điểm mấu chốt của Rabin-Karp.

---

## 1. Bài toán string matching

> 💡 **Trực giác / Hình dung.** Bạn có một quyển sách dày (text \`T\`, \`n\` ký tự) và một cụm
> từ cần tìm (pattern \`P\`, \`m\` ký tự). Bạn muốn highlight **mọi** chỗ cụm từ đó xuất hiện.
> Cách thủ công: đặt cụm từ lên đầu trang, so từng chữ; nếu lệch thì dịch sang phải 1 ô,
> so lại từ đầu. Cả bài học này là về việc *không* phải "so lại từ đầu" mỗi lần dịch.

**Định nghĩa (bài toán exact string matching).** Cho text \`T[0..n-1]\` và pattern \`P[0..m-1]\`
(thường $m \\leq n$), tìm **mọi** chỉ số $i$ ($0 \\leq i \\leq n-m$) sao cho

\`\`\`
T[i..i+m-1] == P[0..m-1]   (khớp m ký tự liên tiếp)
\`\`\`

Ta gọi mỗi \`i\` như vậy là một **vị trí khớp (occurrence)**.

**Vì sao tồn tại bài toán này như một chủ đề riêng?** Vì nó cực phổ biến và cái cách ngây thơ
quá chậm cho dữ liệu lớn (genome 3 tỷ ký tự, log server hàng GB). Một cải tiến từ $O(nm)$ xuống
$O(n+m)$ là khác biệt giữa "chạy 1 giây" và "chạy 1 giờ".

**Bốn ví dụ cụ thể** (chỉ số 0-based):

| # | T | P | Vị trí khớp |
|---|---|---|---|
| 1 | \`"ababab"\` | \`"ab"\` | \`0, 2, 4\` |
| 2 | \`"aaaaa"\` | \`"aa"\` | \`0, 1, 2, 3\` (overlap được phép) |
| 3 | \`"abcabc"\` | \`"xyz"\` | (không có) |
| 4 | \`"AABAACAADAABAABA"\` | \`"AABA"\` | \`0, 9, 12\` |

Lưu ý ví dụ 2: các vị trí khớp **được phép chồng nhau** (\`"aa"\` tại 0 và 1 dùng chung ký tự
index 1). Đây là quy ước chuẩn — ta tìm mọi vị trí start hợp lệ, không "ngốn" ký tự.

> 🔁 **Dừng lại tự kiểm tra.** Với \`T = "aaa"\`, \`P = "a"\`, có bao nhiêu vị trí khớp?
> <details><summary>Đáp án</summary>3 vị trí: 0, 1, 2. Mỗi ký tự \`'a'\` là một occurrence của pattern dài 1.</details>

---

## 2. Naive matching (brute-force)

> 💡 **Trực giác.** Đặt pattern lên trên text tại vị trí 0, so từng ký tự. Khớp hết → ghi nhận.
> Lệch ở đâu đó → dịch pattern sang phải đúng **1 ô**, so lại **từ đầu pattern**. Lặp tới hết.

\`\`\`go
// naiveSearch trả về mọi vị trí start mà P khớp trong T.
func naiveSearch(text, pat string) []int {
	n, m := len(text), len(pat)
	var res []int
	if m == 0 || m > n {
		return res
	}
	for i := 0; i+m <= n; i++ { // i là vị trí đặt pattern
		j := 0
		for j < m && text[i+j] == pat[j] { // so từng ký tự
			j++
		}
		if j == m { // khớp đủ m ký tự
			res = append(res, i)
		}
	}
	return res
}
\`\`\`

### 2.1 Walk-through: tìm \`"AABA"\` trong \`"AABAACAADAABAABA"\`

Text (16 ký tự), pattern \`"AABA"\` (m=4). Ta xét từng vị trí \`i\`:

\`\`\`
index:  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
text:   A  A  B  A  A  C  A  A  D  A  A  B  A  A  B  A
\`\`\`

| i | So sánh | Kết quả |
|---|---------|---------|
| 0 | \`AABA\` vs \`AABA\` → A=A, A=A, B=B, A=A | **KHỚP** ✓ |
| 1 | \`ABAA\` vs \`AABA\` → A=A, B≠A (lệch ở j=1) | trượt |
| 2 | \`BAAC\` vs \`AABA\` → B≠A (lệch j=0) | trượt |
| 3 | \`AACA\` vs \`AABA\` → A=A, A=A, C≠B (j=2) | trượt |
| 4 | \`ACAA\` vs \`AABA\` → A=A, C≠A (j=1) | trượt |
| ... | (5,6,7,8 đều lệch sớm) | trượt |
| 9 | \`AABA\` vs \`AABA\` | **KHỚP** ✓ |
| 10 | \`ABAA\` → A=A, B≠A (j=1) | trượt |
| 11 | \`BAAB\` → B≠A (j=0) | trượt |
| 12 | \`AABA\` vs \`AABA\` | **KHỚP** ✓ |

Kết quả: \`[0, 9, 12]\`.

### 2.2 Vì sao naive chậm — worst case O(nm)

Ở các text "lành" (nhiều ký tự khác nhau), naive thường lệch ở ngay ký tự đầu → gần như $O(n)$.
Nhưng có những input ác ý ép nó chạm trần $O(nm)$:

> ⚠ **Worst case kinh điển.** \`T = "aaaaaaaaaaab"\` (n='a' nhiều rồi 'b'), \`P = "aaaab"\`.
> Tại **mỗi** vị trí $i$, ta khớp 4 ký tự \`'a'\` rồi mới lệch ở \`'b'\` → mỗi lần tốn $\\approx m$ so sánh.
> Tổng $\\approx (n-m+1) \\cdot m = O(nm)$. Với $n=10^6, m=10^3$ → $10^9$ phép so → vài giây tới phút.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao không dịch nhiều hơn 1 ô khi lệch?"* — Đó chính xác là ý tưởng của **KMP (L41)** và
>   **Z (L42)**: khi đã so một phần, ta biết một số ký tự nên dịch xa hơn 1. Naive vứt bỏ
>   thông tin đó nên chậm.
> - *"Rabin-Karp dịch nhiều hơn à?"* — Không. Rabin-Karp vẫn dịch 1 ô, nhưng **mỗi bước so chỉ
>   tốn $O(1)$** (so 2 số hash) thay vì $O(m)$ (so $m$ ký tự). Tư duy khác hẳn KMP.

> 📝 **Tóm tắt mục 2.** Naive: thử mọi vị trí start, so từng ký tự, dịch 1 ô khi lệch.
> Đơn giản, không cần tiền xử lý, nhưng worst-case $O(nm)$. Cần ý tưởng để mỗi bước trượt rẻ hơn.

---

## 3. Rolling hash (polynomial hash)

> 💡 **Trực giác.** Thay vì so 2 chuỗi ký-tự-một (đắt O(m)), hãy biến mỗi chuỗi thành **một con số**
> (hash). So 2 số chỉ tốn O(1). Mẹo then chốt: khi cửa sổ trượt sang phải 1 ô, hash mới
> **không cần tính lại từ đầu** — chỉ cần "bỏ đóng góp của ký tự trái" và "thêm đóng góp ký tự phải".
> Giống như tính tổng cửa sổ trượt: tổng mới = tổng cũ − phần tử ra + phần tử vào.

### 3.1 Polynomial hash là gì

Xem chuỗi \`s[0..m-1]\` như **một số viết trong cơ số \`b\`** (base), rồi lấy \`mod q\`:

\`\`\`
h(s) = ( s[0]·b^(m-1) + s[1]·b^(m-2) + ... + s[m-1]·b^0 ) mod q
\`\`\`

- $b$ (base): một số > kích thước bảng chữ cái, ví dụ $b = 256$ (mọi byte) hoặc $b = 31$.
- $q$ (modulus): **số nguyên tố lớn**, ví dụ $q = 1\\,000\\,000\\,007$, để hash phân bố đều và tránh overflow.

> Vì sao tồn tại cách viết "đa thức" này? Vì nó cho ta công thức **cập nhật trượt $O(1)$** (mục 3.3).
> Một hàm băm bất kỳ (vd $\\sum s[i]$) không trượt được rẻ vì mất thông tin vị trí — và tệ hơn, dễ
> đụng độ (anagram cùng hash).

### 3.2 Walk-through tính hash — 4 ví dụ số

Lấy $b = 256$ (mã ASCII), $q = 101$ (nguyên tố nhỏ cho dễ tính tay).

**Ví dụ 1:** \`s = "AB"\`, \`A=65, B=66\`, $m=2$.
\`\`\`
h = (65·256^1 + 66·256^0) mod 101
  = (65·256 + 66) mod 101
  = (16640 + 66) mod 101 = 16706 mod 101
16706 = 101·165 + 41  →  h = 41
\`\`\`

**Ví dụ 2:** \`s = "BA"\` (anagram của "AB").
\`\`\`
h = (66·256 + 65) mod 101 = (16896 + 65) mod 101 = 16961 mod 101
16961 = 101·167 + 94  →  h = 94
\`\`\`
→ \`"AB"\` (41) và \`"BA"\` (94) **khác hash** — polynomial hash phân biệt được thứ tự (khác hẳn $\\sum$).

**Ví dụ 3:** \`s = "AA"\`, \`A=65\`.
\`\`\`
h = (65·256 + 65) mod 101 = (16640 + 65) mod 101 = 16705 mod 101
16705 = 101·165 + 40  →  h = 40
\`\`\`

**Ví dụ 4:** \`s = "C"\` đơn lẻ, \`C=67\`, $m=1$.
\`\`\`
h = (67·256^0) mod 101 = 67 mod 101 = 67
\`\`\`

> 🔁 **Tự kiểm tra.** Tính \`h("BB")\` với cùng \`b=256, q=101\`. (\`B=66\`)
> <details><summary>Đáp án</summary>(66·256 + 66) mod 101 = (16896+66) mod 101 = 16962 mod 101. 16962 = 101·167 + 95 → <b>95</b>.</details>

### 3.3 Cập nhật trượt O(1) — công thức quan trọng nhất bài

Giả sử ta có hash của window \`T[i..i+m-1]\` và muốn hash window kế \`T[i+1..i+m]\`. Window mới:
- **bỏ** ký tự trái \`T[i]\` (đang ở vị trí cao nhất, hệ số $b^{m-1}$),
- **dịch** phần còn lại sang trái 1 bậc (nhân $b$),
- **thêm** ký tự phải mới \`T[i+m]\` (hệ số $b^0$).

\`\`\`
hnew = ( (hold − T[i]·b^(m-1)) · b + T[i+m] ) mod q
\`\`\`

Trong đó $b^{m-1} \\bmod q$ được tính sẵn 1 lần (gọi là \`high\`).

**Walk-through số cụ thể.** \`T = "ABA"\`, $b=256, q=101$, $m=2$. Hash window \`"AB"\` = 41 (ví dụ 1).
Trượt sang \`"BA"\`:

\`\`\`
high = 256^(2-1) mod 101 = 256 mod 101 = 54     (256 = 101·2 + 54)
bỏ T[0]='A'(65):  41 − 65·54 = 41 − 3510 = −3469
dịch ·b:          −3469 · 256 = −888064
thêm T[2]='A'(65): −888064 + 65 = −887999
mod 101:          −887999 mod 101
\`\`\`
Tính \`−887999 mod 101\`: \`887999 / 101 = 8792.06...\`, \`101·8792 = 887992\`, dư \`887999−887992 = 7\`,
nên \`887999 mod 101 = 7\` → \`−887999 mod 101 = 101 − 7 = 94\`.

Kết quả \`hnew = 94\` — **trùng** với \`h("BA")=94\` tính trực tiếp ở ví dụ 2. ✓ Công thức trượt đúng.

> ⚠ **Lỗi thường gặp #1.** Quên trừ ký tự trái với **đúng hệ số** $b^{m-1}$. Nếu trừ \`T[i]\`$\\cdot 1$
> thay vì \`T[i]\`$\\cdot b^{m-1}$ thì hash hỏng hoàn toàn. Hệ số phải là số mũ cao nhất.

> ⚠ **Lỗi thường gặp #2.** Trong ngôn ngữ có số nguyên hữu hạn (Go \`int64\`), \`hold − T[i]·high\`
> có thể âm. Phải \`((... ) % q + q) % q\` để đưa về \`[0, q)\`. Code Go dưới đây xử lý điều này.

> 📝 **Tóm tắt mục 3.** Polynomial hash xem chuỗi như số cơ số $b$, lấy mod $q$. Tính trực tiếp
> $O(m)$, nhưng **trượt cập nhật $O(1)$** nhờ công thức bỏ-trái / dịch / thêm-phải. Đây là trái tim
> của Rabin-Karp.

---

## 4. Rabin-Karp

> 💡 **Trực giác.** Ghép naive + rolling hash: vẫn trượt từng vị trí như naive, nhưng tại mỗi
> vị trí **so hash trước** ($O(1)$). Chỉ khi hash của window khớp hash của pattern thì mới bỏ công
> **verify từng ký tự** ($O(m)$) để loại bỏ trường hợp "hash trùng nhưng chuỗi khác" (false positive).

### 4.1 Vì sao bắt buộc verify?

Hash là ánh xạ từ không gian chuỗi (vô hạn) xuống $[0, q)$ (hữu hạn) → **tất yếu có collision**:
hai chuỗi khác nhau có thể cùng hash. Nếu tin hash mù quáng, ta báo khớp sai. Verify ký tự sau
khi hash trùng đảm bảo **kết quả luôn đúng**; hash chỉ đóng vai trò "lọc nhanh".

### 4.2 Code Go đầy đủ

\`\`\`go
const (
	base = 256         // bảng chữ cái byte
	mod  = 1000000007  // nguyên tố lớn
)

// rabinKarp trả về mọi vị trí start mà pat khớp trong text.
func rabinKarp(text, pat string) []int {
	n, m := len(text), len(pat)
	var res []int
	if m == 0 || m > n {
		return res
	}

	// high = base^(m-1) mod mod — hệ số của ký tự trái cùng.
	high := int64(1)
	for i := 0; i < m-1; i++ {
		high = (high * base) % mod
	}

	// Tính hash pattern và hash window đầu tiên T[0..m-1].
	var hp, ht int64
	for i := 0; i < m; i++ {
		hp = (hp*base + int64(pat[i])) % mod
		ht = (ht*base + int64(text[i])) % mod
	}

	for i := 0; i+m <= n; i++ {
		if ht == hp { // hash khớp → VERIFY ký tự (loại false positive)
			if text[i:i+m] == pat {
				res = append(res, i)
			}
		}
		// Trượt sang window kế: bỏ text[i], thêm text[i+m].
		if i+m < n {
			ht = (ht - int64(text[i])*high%mod + mod) % mod // bỏ trái (+mod tránh âm)
			ht = (ht*base + int64(text[i+m])) % mod          // dịch + thêm phải
		}
	}
	return res
}
\`\`\`

### 4.3 Walk-through nhỏ với q nhỏ (để thấy false positive)

Dùng $b=256, q=101$, \`T = "ABABA"\`, \`P = "ABA"\` ($m=3$).

Hash pattern \`"ABA"\`: \`((65·256+66)·256+65) mod 101\`.
\`\`\`
65·256+66 = 16706;  16706 mod 101 = 41
41·256+65 = 10561;  10561 mod 101 = ? 101·104=10504, dư 57  → hp = 57
high = 256^2 mod 101 = 54·256 mod 101 = 13824 mod 101; 101·136=13736, dư 88 → high=88
\`\`\`
Window đầu \`T[0..2]="ABA"\`: cùng cách → \`ht = 57\`. Hash khớp → verify \`"ABA"=="ABA"\` ✓ → vị trí 0.

Trượt sang \`T[1..3]="BAB"\`:
\`\`\`
ht = (57 − 65·88 mod101 + 101) mod 101 ... rồi ·256 + 66
\`\`\`
giả sử ra một giá trị \`≠ 57\` → bỏ qua không verify (đúng, "BAB"≠"ABA").

Trượt sang \`T[2..4]="ABA"\`: ht trở lại 57 → verify \`"ABA"=="ABA"\` ✓ → vị trí 2.
Kết quả \`[0, 2]\` — đúng.

> ❓ **Câu hỏi tự nhiên.** *"Nếu một window khác cũng cho ht=57 nhưng không phải 'ABA' thì sao?"*
> — Đó là **false positive**: hash trùng, verify phát hiện chuỗi khác → ta **không** ghi nhận.
> Verify là lưới an toàn. Với $q$ lớn ($10^9$) false positive cực hiếm; với $q=101$ nhỏ thì hay gặp.

> 📝 **Tóm tắt mục 4.** Rabin-Karp = trượt window + so hash $O(1)$ + verify $O(m)$ khi hash trùng.
> Trung bình $O(n+m)$ (ít lần verify); worst-case $O(nm)$ nếu hash xấu khiến verify liên tục.

---

## 5. Collision & chọn modulus

### 5.1 Collision là gì, ảnh hưởng ra sao

**Collision (đụng độ):** hai chuỗi khác nhau cùng hash. Trong Rabin-Karp, collision **không gây
sai kết quả** (vì verify), nhưng gây **chậm**: mỗi false positive tốn $O(m)$ verify vô ích. Nếu
collision quá nhiều, độ phức tạp tụt về $O(nm)$.

### 5.2 Chọn \`q\` và \`b\`

- **$q$ nguyên tố lớn** (vd $1\\,000\\,000\\,007$, $998\\,244\\,353$): giảm xác suất collision còn $\\approx 1/q$.
- **$b$ lớn hơn alphabet và coprime với $q$**: $256$ cho byte, hoặc $31$/$37$ cho chữ thường.
- **Tránh $q$ nhỏ** (như 101 ở ví dụ tay): chỉ dùng để minh hoạ, thực tế collision tràn lan.

> ⚠ **Lỗi thường gặp #3.** Dùng $b$ nhỏ hơn alphabet (vd $b=10$ cho text có 26 chữ cái) → nhiều
> chuỗi map về cùng số → collision dày đặc → chậm.

### 5.3 Double hashing — gần như loại bỏ false positive

Dùng **hai cặp $(b_1,q_1)$ và $(b_2,q_2)$** độc lập; chỉ coi là "hash khớp" khi **cả hai** hash trùng.
Xác suất collision đồng thời $\\approx 1/(q_1 \\cdot q_2) \\approx 10^{-18}$ → có thể **bỏ verify** trong nhiều bài thi
(nhưng vẫn nên verify nếu cần đúng tuyệt đối).

\`\`\`go
// Hai hash độc lập; cặp (h1,h2) gần như định danh duy nhất một chuỗi.
type pairHash struct{ a, b int64 }
\`\`\`

### 5.4 Walk-through false positive với q nhỏ

Với $q=11$ (rất nhỏ), $b=10$: \`h("AB")\` và \`h("LM")\` (giá trị ASCII khác nhau) có thể cùng cho
một số trong $[0,11)$ vì chỉ có 11 ô. Xác suất 2 chuỗi ngẫu nhiên trùng hash $\\approx 1/11 \\approx 9\\%$ —
quá cao. Tăng $q$ lên $10^9$ → xác suất $\\approx 10^{-9}$, false positive gần như biến mất.

> 🔁 **Tự kiểm tra.** False positive trong Rabin-Karp có làm sai kết quả không?
> <details><summary>Đáp án</summary>Không — vì luôn verify ký tự sau khi hash khớp. Nó chỉ làm <i>chậm</i> (verify thừa), không làm sai.</details>

> 📝 **Tóm tắt mục 5.** Collision không gây sai (nhờ verify) nhưng gây chậm. Chọn $q$ nguyên tố
> lớn + $b$ hợp lý để collision hiếm. Double hashing đẩy xác suất collision xuống $\\approx 1/q^2$.

---

## 6. Multi-pattern Rabin-Karp

> 💡 **Trực giác.** Có $k$ pattern **cùng độ dài $m$** cần tìm trong cùng text. Naive: chạy
> Rabin-Karp $k$ lần → $O(k \\cdot n)$. Mẹo: băm **tất cả** pattern vào một \`set\` (hash → list pattern),
> rồi trượt **một** window qua text. Mỗi vị trí: tính hash window 1 lần, tra set → $O(n)$ cho cả $k$.

\`\`\`go
// multiSearch tìm mọi vị trí của bất kỳ pattern nào (đều dài m) trong text.
// Trả về map[vị trí] -> pattern khớp.
func multiSearch(text string, pats []string) map[int]string {
	res := make(map[int]string)
	if len(pats) == 0 {
		return res
	}
	m := len(pats[0])
	n := len(text)
	if m == 0 || m > n {
		return res
	}

	// Băm tất cả pattern: hash -> các pattern có hash đó (xử lý collision giữa các pattern).
	set := make(map[int64][]string)
	for _, p := range pats {
		var hp int64
		for i := 0; i < m; i++ {
			hp = (hp*base + int64(p[i])) % mod
		}
		set[hp] = append(set[hp], p)
	}

	high := int64(1)
	for i := 0; i < m-1; i++ {
		high = (high * base) % mod
	}
	var ht int64
	for i := 0; i < m; i++ {
		ht = (ht*base + int64(text[i])) % mod
	}

	for i := 0; i+m <= n; i++ {
		if cands, ok := set[ht]; ok { // window hash trùng một nhóm pattern
			for _, p := range cands { // verify từng candidate
				if text[i:i+m] == p {
					res[i] = p
					break
				}
			}
		}
		if i+m < n {
			ht = (ht - int64(text[i])*high%mod + mod) % mod
			ht = (ht*base + int64(text[i+m])) % mod
		}
	}
	return res
}
\`\`\`

**Ứng dụng plagiarism (đạo văn).** Chia tài liệu nghi vấn thành các "shingle" (đoạn $m$ ký tự
liên tiếp), băm hết; chia tài liệu gốc thành shingle, băm hết; đếm shingle trùng → tỉ lệ giống.
Đây chính là multi-pattern matching ở quy mô lớn (fingerprinting).

> ❓ **Câu hỏi.** *"Nếu các pattern khác độ dài thì sao?"* — Multi-pattern Rabin-Karp cơ bản đòi
> hỏi **cùng độ dài** (1 window size). Nhiều độ dài khác nhau → nhóm theo độ dài (1 pass mỗi nhóm),
> hoặc dùng **Aho-Corasick (L43)** xử lý mọi độ dài trong 1 pass bằng trie + failure links.

> 📝 **Tóm tắt mục 6.** Nhiều pattern cùng độ dài → băm vào set, trượt 1 window, tra set $O(1)$/bước
> → $O(n)$ cho cả $k$ pattern. Nền tảng của plagiarism detection / fingerprinting.

---

## 7. Ứng dụng

### 7.1 Tìm substring (cơ bản)

\`strings.Contains\` / \`strings.Index\` chính là string matching. Rabin-Karp là một cách cài đặt.

### 7.2 Longest duplicate substring (binary search độ dài + Rabin-Karp)

> 💡 **Trực giác.** "Đoạn lặp dài nhất" có tính **đơn điệu**: nếu tồn tại đoạn lặp dài $L$, thì cũng
> tồn tại đoạn lặp dài $L-1$ (cắt bớt). Vậy **binary search trên $L$**: với mỗi $L$, dùng Rabin-Karp
> băm mọi substring dài $L$, kiểm tra có hash nào xuất hiện $\\geq 2$ lần (verify để chắc).

\`\`\`go
// longestDupSubstring: đoạn con xuất hiện ≥ 2 lần, dài nhất.
func longestDupSubstring(s string) string {
	n := len(s)
	// có đoạn lặp dài L? trả về vị trí start nếu có, else -1.
	check := func(L int) int {
		if L == 0 {
			return 0
		}
		high := int64(1)
		for i := 0; i < L-1; i++ {
			high = (high * base) % mod
		}
		seen := make(map[int64][]int) // hash -> các start
		var h int64
		for i := 0; i < L; i++ {
			h = (h*base + int64(s[i])) % mod
		}
		for i := 0; i+L <= n; i++ {
			for _, j := range seen[h] {
				if s[j:j+L] == s[i:i+L] { // verify
					return i
				}
			}
			seen[h] = append(seen[h], i)
			if i+L < n {
				h = (h - int64(s[i])*high%mod + mod) % mod
				h = (h*base + int64(s[i+L])) % mod
			}
		}
		return -1
	}

	lo, hi, start, length := 1, n-1, 0, 0
	for lo <= hi { // binary search độ dài lớn nhất khả thi
		mid := (lo + hi) / 2
		if p := check(mid); p != -1 {
			start, length = p, mid
			lo = mid + 1
		} else {
			hi = mid - 1
		}
	}
	return s[start : start+length]
}
\`\`\`
Độ phức tạp: $O(n \\log n)$ trung bình (binary search $\\log n$ × mỗi \`check\` là $O(n)$).

### 7.3 2D pattern matching

Tìm ma trận pattern \`P\` ($r \\times c$) trong ma trận text \`T\` ($R \\times C$). Cách Rabin-Karp 2D: băm **từng
hàng** bằng rolling hash → mỗi hàng thành 1 dãy số; rồi rolling hash **theo cột** trên các giá trị
hàng đó. Tìm khối khớp = 2 lớp rolling hash lồng nhau. Độ phức tạp $\\approx O(R \\cdot C)$ trung bình.

### 7.4 Plagiarism / fingerprinting

Như mục 6.4: băm shingle, so set. Kỹ thuật **winnowing** (chọn min-hash trong mỗi cửa sổ) giảm
số fingerprint cần lưu mà vẫn phát hiện trùng — nền tảng các công cụ chống đạo văn (MOSS).

> 📝 **Tóm tắt mục 7.** Rabin-Karp mạnh ở các bài cần "băm rồi so đoạn": longest dup substring
> (binary search + hash), 2D matching (hash 2 lớp), fingerprinting. Mọi nơi đều cần verify hoặc
> double-hash để loại false positive.

---

## 8. So sánh với KMP / Z (tease L41 / L42)

| Tiêu chí | Rabin-Karp | KMP (L41) | Z-algorithm (L42) |
|----------|-----------|-----------|-------------------|
| Worst-case | $O(nm)$ (hash xấu) | $O(n+m)$ đảm bảo | $O(n+m)$ đảm bảo |
| Average | $O(n+m)$ | $O(n+m)$ | $O(n+m)$ |
| Tiền xử lý | $O(m)$ tính hash | $O(m)$ prefix table | $O(m)$ Z-array |
| Multi-pattern | **rất tốt** (1 set) | kém (mỗi pattern 1 lần) | kém |
| Rủi ro | collision (cần verify) | không | không |
| Cài đặt | đơn giản | trung bình (tricky) | trung bình |

**Khi nào chọn gì?**
- **Multi-pattern cùng độ dài / fingerprinting / 2D** → Rabin-Karp (đơn giản, 1 pass).
- **Cần đảm bảo $O(n+m)$ tuyệt đối, 1 pattern** → KMP hoặc Z (không lo collision).
- KMP/Z còn cho thêm thông tin cấu trúc (border, period) mà Rabin-Karp không có — sẽ học ở L41/L42.

> 📝 **Tóm tắt mục 8.** Rabin-Karp = đơn giản + mạnh cho multi-pattern, nhưng worst-case có thể tệ
> và có rủi ro collision. KMP/Z = đảm bảo tuyến tính, không collision, nhưng 1-pattern.

---

## 9. Độ phức tạp — tổng hợp

| Thuật toán | Tiền xử lý | Tìm kiếm (avg) | Tìm kiếm (worst) | Bộ nhớ |
|-----------|-----------|----------------|------------------|--------|
| Naive | — | $O(nm)$ | $O(nm)$ | $O(1)$ |
| Rabin-Karp | $O(m)$ | $O(n+m)$ | $O(nm)$ | $O(1)$ (+set cho multi) |
| Multi-pattern RK ($k$ pattern) | $O(k \\cdot m)$ | $O(n + k \\cdot m)$ | $O(n \\cdot m + ...)$ | $O(k \\cdot m)$ |
| Longest dup substring | — | $O(n \\log n)$ | $O(n^2 \\log n)$ | $O(n)$ |

Điểm mấu chốt: Rabin-Karp **average** $O(n+m)$ nhờ verify hiếm khi xảy ra (hash tốt). Worst-case
$O(nm)$ xảy ra khi hash xấu/đối thủ ác ý → khác với KMP đảm bảo $O(n+m)$ mọi lúc.

---

## 10. Cạm bẫy (pitfalls)

| # | Cạm bẫy | Hậu quả | Cách tránh |
|---|---------|---------|------------|
| 1 | **Quên verify** sau khi hash khớp | báo khớp sai (false positive) | luôn so ký tự khi \`ht==hp\` |
| 2 | **Overflow** khi tính \`s[i]\`$\\cdot b^k$ | hash sai, kết quả loạn | lấy \`mod\` ở mọi phép nhân/cộng; dùng \`int64\` |
| 3 | **Hash âm** sau khi trừ ký tự trái | index/so sánh sai | \`((x % q) + q) % q\` |
| 4 | **Rolling update sai hệ số** (trừ \`T[i]\`$\\cdot 1$ thay vì \`T[i]\`$\\cdot b^{m-1}$) | hash trượt sai hoàn toàn | precompute \`high\` $= b^{m-1} \\bmod q$ |
| 5 | **Chọn $q$ nhỏ / $b$ nhỏ** | collision tràn lan → chậm | $q$ nguyên tố $\\approx 10^9$, $b \\geq$ alphabet |
| 6 | **So pattern rỗng / $m>n$** | panic index | check biên đầu hàm |
| 7 | **Tin double-hash không verify** rồi cần đúng 100% | rủi ro cực hiếm vẫn sai | verify nếu yêu cầu chính xác tuyệt đối |

> ⚠ **Cạm bẫy lớn nhất.** Số 1 và 4. Quên verify = sai kết quả. Sai hệ số rolling = hash vô nghĩa.
> Hai chỗ này phải kiểm tra kỹ nhất khi cài Rabin-Karp.

---

## Bài tập

1. **strStr (naive + RK).** Cài hàm \`strStr(haystack, needle) int\` trả về index đầu tiên (hoặc -1)
   bằng cả 2 cách. Big-O mỗi cách?
2. **Repeated substring pattern.** Cho \`s\`, kiểm tra \`s\` có được tạo bằng cách lặp một substring con
   nhiều lần không (vd \`"abab"\` → true, \`"abc"\` → false). Big-O?
3. **Longest duplicate substring.** Cài bằng binary search độ dài + Rabin-Karp. Big-O?
4. **Find all anagram start indices.** Cho \`s, p\`, trả về mọi start index của anagram của \`p\` trong \`s\`.
   (Gợi ý: rolling **count** thay vì rolling hash thứ tự.) Big-O?
5. **2D pattern matching.** Tìm pattern \`r×c\` trong ma trận \`R×C\` (mô tả thuật toán 2 lớp hash). Big-O?
6. **Distinct substrings count.** Đếm số substring **phân biệt** của \`s\` bằng băm tất cả substring
   theo từng độ dài. Big-O? Vì sao cách này có rủi ro collision?

---

## Lời giải chi tiết

### Bài 1 — strStr (naive + RK)

**Naive:** dùng \`naiveSearch\` (mục 2), trả phần tử đầu hoặc -1. $O(nm)$ worst, $O(1)$ bộ nhớ.

\`\`\`go
func strStrNaive(h, n string) int {
	r := naiveSearch(h, n)
	if len(r) == 0 { return -1 }
	return r[0]
}
func strStrRK(h, n string) int {
	r := rabinKarp(h, n)
	if len(r) == 0 { return -1 }
	return r[0]
}
\`\`\`
**RK:** $O(n+m)$ average, $O(nm)$ worst (hash xấu). Cả hai $O(1)$ bộ nhớ phụ.

### Bài 2 — Repeated substring pattern

**Cách tiếp cận.** \`s\` lặp được từ substring dài $d$ ⟺ $d \\mid n$ và \`s\` bằng $n/d$ bản sao của \`s[0..d-1]\`.
Chỉ cần thử các ước $d$ của $n$ ($d < n$); với mỗi $d$ verify. Hoặc mẹo: \`s\` lặp ⟺ \`s\` nằm trong
\`(s+s)[1 : 2n-1]\`.

\`\`\`go
func repeatedSubstringPattern(s string) bool {
	n := len(s)
	doubled := s + s
	// bỏ ký tự đầu & cuối rồi tìm s; nếu tìm thấy ⇒ s tuần hoàn.
	return len(rabinKarp(doubled[1:2*n-1], s)) > 0
}
\`\`\`
**Big-O:** $O(n)$ average (Rabin-Karp trên chuỗi $2n$). Mẹo \`s+s\` rất gọn.

### Bài 3 — Longest duplicate substring

Đã cài đầy đủ ở mục 7.2 (\`longestDupSubstring\`). **Cách:** binary search trên độ dài $L$ (tính đơn điệu),
mỗi $L$ dùng Rabin-Karp băm mọi substring dài $L$ tìm trùng (verify). **Big-O:** $O(n \\log n)$ average,
$O(n)$ bộ nhớ (map hash → starts).

### Bài 4 — Find all anagram start indices

**Cách tiếp cận.** Anagram = cùng **đa tập ký tự**, không quan tâm thứ tự. Polynomial hash *không*
phù hợp (nó phân biệt thứ tự). Dùng **rolling count** (mảng đếm 26 ký tự) như sliding window L14:

\`\`\`go
func findAnagrams(s, p string) []int {
	var res []int
	n, m := len(s), len(p)
	if m > n { return res }
	var need, win [26]int
	for i := 0; i < m; i++ { // khởi tạo window đầu
		need[p[i]-'a']++
		win[s[i]-'a']++
	}
	if win == need { res = append(res, 0) }
	for i := m; i < n; i++ { // trượt: thêm s[i], bỏ s[i-m]
		win[s[i]-'a']++
		win[s[i-m]-'a']--
		if win == need { res = append(res, i-m+1) }
	}
	return res
}
\`\`\`
**Big-O:** $O(n)$ (mỗi bước cập nhật 2 ô + so 2 mảng 26 $= O(1)$ hằng). So sánh mảng 26 phần tử là hằng số.

### Bài 5 — 2D pattern matching

**Cách tiếp cận (2 lớp hash).**
1. Rolling hash **theo hàng**: với mỗi hàng của text, băm mọi cửa sổ ngang dài $c$ → ma trận $R \\times (C-c+1)$
   các giá trị hash hàng. Băm mỗi hàng pattern thành 1 vector $r$ giá trị.
2. Rolling hash **theo cột** trên ma trận giá trị-hàng: coi mỗi cột là một "chuỗi" dài $R$, băm cửa sổ
   dọc dài $r$, so với hash của pattern (gồm $r$ giá trị hàng). Khớp hash 2 lớp → verify khối $r \\times c$.

**Big-O:** $O(R \\cdot C)$ trung bình (mỗi lớp rolling $O(1)$/bước), $O(r \\cdot c)$ cho mỗi lần verify (hiếm).

### Bài 6 — Distinct substrings count

**Cách tiếp cận.** Với mỗi độ dài $L$ từ $1..n$, dùng rolling hash băm mọi substring dài $L$, đưa hash
vào một \`set\`; số hash phân biệt = số substring phân biệt dài $L$ (nếu không collision). Cộng lại.

\`\`\`go
func countDistinct(s string) int {
	n := len(s)
	total := 0
	for L := 1; L <= n; L++ {
		seen := make(map[int64]bool)
		high := int64(1)
		for i := 0; i < L-1; i++ { high = high * base % mod }
		var h int64
		for i := 0; i < L; i++ { h = (h*base + int64(s[i])) % mod }
		for i := 0; i+L <= n; i++ {
			seen[h] = true
			if i+L < n {
				h = (h - int64(s[i])*high%mod + mod) % mod
				h = (h*base + int64(s[i+L])) % mod
			}
		}
		total += len(seen)
	}
	return total
}
\`\`\`
**Big-O:** $O(n^2)$ average ($n$ độ dài × $O(n)$/độ dài). **Rủi ro collision:** hai substring khác nhau cùng
hash sẽ bị đếm thiếu 1 (set gộp chúng). Để chính xác tuyệt đối: **double hashing** (lưu cặp hash) hoặc
dùng **suffix array + LCP** (L44) cho kết quả không phụ thuộc hash. Đây là toy version — cảnh báo:
**không dùng single-hash khi cần đếm chính xác**.

---

## Code & Minh họa

- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Naive matching** — trượt pattern, so từng ký tự, đếm số phép so sánh.
  2. **Rolling hash** — animate window trượt, cập nhật O(1) (bỏ trái / thêm phải).
  3. **Rabin-Karp** — so hash trước, verify khi khớp, highlight false positive.

Code Go đầy đủ đã nhúng inline trong các mục 2, 4, 6, 7 ở trên (naive, rolling hash, Rabin-Karp,
multi-pattern, longest duplicate substring). Theo quy ước, lesson này **không** kèm \`solutions.go\` riêng.

---

## Bài tiếp theo

- **[L41 — KMP](../lesson-41-kmp/README.md)**: failure function (prefix table), matching O(n+m) **đảm bảo**,
  không backtrack text — bù đúng điểm yếu worst-case của Rabin-Karp.
- **[L42 — Z-Algorithm](../lesson-42-z-algorithm/README.md)**: Z-array, một góc nhìn khác về matching tuyến tính.
- **[L43 — Trie & Aho-Corasick](../lesson-43-trie-aho-corasick/README.md)**: multi-pattern **khác độ dài** trong 1 pass.
`;
