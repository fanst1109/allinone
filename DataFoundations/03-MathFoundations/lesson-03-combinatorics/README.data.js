// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataFoundations/03-MathFoundations/lesson-03-combinatorics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Combinatorics & Counting (tổ hợp & đếm)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Áp dụng được **hai quy tắc nền của đếm**: quy tắc cộng (sum rule) và quy tắc nhân (product rule).
- Phân biệt rõ **hoán vị (permutation)** $P(n,k)$ và **tổ hợp (combination)** $C(n,k)$ — biết khi nào thứ tự quan trọng, khi nào không.
- Hiểu và dựng được **tam giác Pascal**, biết các hệ thức $C(n,k) = C(n-1,k-1) + C(n-1,k)$, đối xứng $C(n,k) = C(n,n-k)$, tổng hàng $= 2^n$.
- Khai triển được **nhị thức Newton** $(a+b)^n$ và liên hệ hệ số với $C(n,k)$.
- Phát biểu và áp dụng **nguyên lý chuồng bồ câu (pigeonhole)** và **bao hàm–loại trừ (inclusion–exclusion)**.
- Dùng combinatorics để **phân tích độ phức tạp** ($C(n,2)$ cặp trong $O(n^2)$), **đếm không gian trạng thái** ($2^n$ subset), và **ước lượng không gian mật khẩu / key space**.

## Kiến thức tiền đề

- [Lesson 01 — Set Theory](../lesson-01-set-theory/) — đã biết tập con, power set ($2^n$ tập con), tích Descartes ($|A \\times B| = |A| \\cdot |B|$). Bài này chính là *đếm* các đối tượng đó.
- [Lesson 02 — Boolean Logic](../lesson-02-boolean-logic/) — quy tắc nhân khớp với việc liệt kê $2^n$ hàng của truth table $n$ biến.
- Phần nâng cao (đếm có lặp, hàm sinh, công thức Catalan…): [Math/05 — Number Theory, Combinatorics, Logic](../../../Math/05-NumberTheory-Combinatorics-Logic/index.html).

## 1. Vì sao "đếm" lại quan trọng cho data & CS?

Nghe "đếm" thì tưởng tầm thường (1, 2, 3…), nhưng trong CS, **đếm số khả năng** là công cụ nền cho:

- **Phân tích độ phức tạp**: "thuật toán này duyệt mọi cặp phần tử" → có bao nhiêu cặp? $C(n,2) = \\frac{n(n-1)}{2} \\approx \\frac{n^2}{2}$ → đó là vì sao nó $O(n^2)$.
- **Không gian trạng thái (state space)**: một tập $n$ phần tử có $2^n$ tập con; một bài bitmask DP có $2^n$ trạng thái. Đếm trước → biết bài có chạy nổi không.
- **Xác suất**: xác suất = (số kết quả thuận lợi) / (tổng số kết quả). Cả tử và mẫu đều là bài toán đếm. Đây là cầu nối sang [Statistics](../../../Statistics/) (không gian biến cố).
- **Bảo mật**: "mật khẩu này mạnh cỡ nào?" = "có bao nhiêu mật khẩu khả dĩ?" — chính là đếm key space. Cầu nối sang [Cryptography](../../../Cryptography/).

### 💡 Câu hỏi mở đầu (sẽ trả lời ngay trong bài)

> **Mật khẩu 8 ký tự, chỉ dùng chữ thường a–z, có bao nhiêu khả năng? Brute-force vét cạn mất bao lâu?**

Mỗi ký tự có $26$ lựa chọn, 8 ký tự độc lập → theo **quy tắc nhân**:

$$26^8 = 208{,}827{,}064{,}576 \\approx 2.09 \\times 10^{11}$$

Hơn 200 tỷ khả năng. Nếu một máy thử $10^9$ (1 tỷ) mật khẩu/giây:

$$\\frac{2.09 \\times 10^{11}}{10^9} \\approx 209 \\text{ giây} \\approx 3.5 \\text{ phút.}$$

→ Mật khẩu 8 ký tự **chỉ chữ thường** yếu một cách đáng sợ. Thêm chữ HOA + số + ký tự đặc biệt (≈ 95 ký tự in được) thì $95^8 \\approx 6.6 \\times 10^{15}$ → cùng máy đó mất ~76 ngày. Mỗi ký tự thêm vào nhân không gian lên ~95 lần. **Toàn bộ kết luận này chỉ là quy tắc nhân** — mục 2 sẽ làm rõ.

### ❓ Câu hỏi tự nhiên

- *"Đếm thì liên quan gì tới Big-O?"* — Big-O đo *số bước*; số bước thường = số đối tượng phải duyệt = một bài toán đếm. Đếm số cặp, số subset, số hoán vị… cho ngay bậc độ phức tạp.
- *"Vì sao không cứ liệt kê hết rồi đếm?"* — Vì với $n = 50$, $2^{50} \\approx 10^{15}$, liệt kê là bất khả thi. Công thức đếm cho đáp số **không cần liệt kê**.

### 📝 Tóm tắt mục 1

- Đếm số khả năng là nền của: phân tích độ phức tạp, không gian trạng thái, xác suất, key space.
- Quy tắc nhân giải thích ngay vì sao mật khẩu dài/đa dạng ký tự thì mạnh.
- Công thức đếm cho đáp số mà **không cần liệt kê** — sống còn khi $n$ lớn.

## 2. Hai quy tắc nền: cộng và nhân

Mọi công thức đếm phía sau đều xây từ đúng hai quy tắc này.

### 2.1 Quy tắc cộng (sum rule) — "HOẶC"

> **💡 Trực giác:** Nếu một việc có thể làm theo cách A **hoặc** cách B (không trùng nhau), tổng số cách = (số cách A) + (số cách B). Giống như "đi từ nhà tới trường bằng xe buýt hoặc xe đạp": tổng lựa chọn = số tuyến buýt + số tuyến đạp.

**Phát biểu:** nếu một lựa chọn được làm từ tập $A$ **hoặc** tập $B$ và $A \\cap B = \\emptyset$ (rời nhau), thì số cách $= |A| + |B|$.

Ví dụ số:

1. Menu có 3 món chính và 4 món chay (không trùng). Chọn **1 món** → $3 + 4 = 7$ cách.
2. Mật khẩu dài **đúng 1 hoặc 2** ký tự, dùng a–z: $26 + 26^2 = 26 + 676 = 702$ cách.
3. Số có 1 chữ số là số chẵn (0,2,4,6,8 → 5) hoặc lẻ (1,3,5,7,9 → 5) → $5 + 5 = 10$ cách (đúng, có 10 chữ số).
4. Đi từ tầng 1 lên tầng 3 bằng **thang bộ** (1 cách) hoặc **thang máy** (1 cách) → $1 + 1 = 2$ cách.

### ⚠ Lỗi thường gặp với quy tắc cộng

Quy tắc cộng **chỉ đúng khi hai tập rời nhau**. Nếu chúng giao nhau, phải trừ phần đếm hai lần — đó chính là **bao hàm–loại trừ** (mục 8). Ví dụ: số từ 1–20 chia hết cho 2 (10 số) **hoặc** chia hết cho 3 (6 số) **không** phải $10 + 6 = 16$, vì các số chia hết cho 6 (6, 12, 18 → 3 số) bị đếm 2 lần → đáp số đúng là $10 + 6 - 3 = 13$.

### 2.2 Quy tắc nhân (product rule) — "VÀ" / "rồi"

> **💡 Trực giác:** Nếu một việc gồm bước 1 **rồi** bước 2 (độc lập), tổng số cách = (số cách bước 1) × (số cách bước 2). Giống chọn outfit: 3 áo × 2 quần = 6 bộ.

**Phát biểu:** nếu một quy trình gồm $k$ bước liên tiếp, bước $i$ có $n_i$ lựa chọn (không phụ thuộc lựa chọn trước), thì tổng số cách $= n_1 \\cdot n_2 \\cdots n_k$.

Ví dụ số:

1. **3 áo × 2 quần** = $3 \\times 2 = 6$ bộ. Liệt kê: (A1,Q1),(A1,Q2),(A2,Q1),(A2,Q2),(A3,Q1),(A3,Q2) → đúng 6.
2. **Biển số 2 chữ + 4 số**: $26^2 \\cdot 10^4 = 676 \\cdot 10000 = 6{,}760{,}000$ biển.
3. **Mật khẩu 8 ký tự a–z**: $26^8 = 208{,}827{,}064{,}576$ (câu hỏi mở đầu).
4. **Truth table $n$ biến**: mỗi biến nhận 2 giá trị (T/F), $n$ biến → $2 \\cdot 2 \\cdots 2 = 2^n$ hàng (khớp [Lesson 02](../lesson-02-boolean-logic/)).
5. **Tập con của tập $n$ phần tử**: mỗi phần tử có 2 lựa chọn "vào / không vào" → $2^n$ tập con (khớp power set ở [Lesson 01](../lesson-01-set-theory/)).

### ❓ Câu hỏi tự nhiên

- *"Khi nào cộng, khi nào nhân?"* — **"HOẶC" → cộng**, **"VÀ / rồi" → nhân**. "Chọn 1 món trong (món mặn HOẶC món chay)" → cộng. "Chọn 1 áo VÀ 1 quần" → nhân.
- *"Bước sau phụ thuộc bước trước thì sao?"* — Quy tắc nhân vẫn dùng được miễn là **số lựa chọn** của bước sau cố định (dù danh sách cụ thể đổi). Ví dụ xếp 3 người vào 3 ghế: bước 1 có 3, bước 2 có 2 (còn lại), bước 3 có 1 → $3 \\cdot 2 \\cdot 1 = 6$. Đây chính là hoán vị (mục 3).

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>Một PIN gồm 4 chữ số (0–9), cho phép lặp. Có bao nhiêu PIN? Nếu KHÔNG cho lặp thì sao?</summary>

- Cho lặp: mỗi vị trí 10 lựa chọn → $10^4 = 10{,}000$ (đúng, từ 0000 tới 9999).
- Không lặp: $10 \\cdot 9 \\cdot 8 \\cdot 7 = 5040$ — đây là $P(10,4)$ (hoán vị, mục 3).
</details>

### 📝 Tóm tắt mục 2

- **HOẶC (rời nhau) → cộng**; **VÀ / rồi → nhân**.
- Quy tắc nhân sinh ra $26^8$, $2^n$ truth table, $2^n$ subset.
- Tập giao nhau thì cộng bị đếm trùng → cần inclusion–exclusion (mục 8).

## 3. Hoán vị (permutation) — thứ tự CÓ quan trọng

### 3.1 Định nghĩa (3 phần)

> **💡 Trực giác:** Hoán vị trả lời *"có bao nhiêu cách XẾP THỨ TỰ $k$ phần tử lấy ra từ $n$ phần tử?"* Như sắp 3 vận động viên lên bục huy chương vàng–bạc–đồng từ 5 người: ai đứng đâu là khác nhau.

**(a) Là gì.** $P(n,k)$ (đọc: "P n chập k") = số cách chọn **có thứ tự** $k$ phần tử phân biệt từ $n$ phần tử, không lặp:

$$P(n, k) = \\frac{n!}{(n-k)!} = n \\cdot (n-1) \\cdots (n-k+1) \\quad (k \\text{ thừa số}).$$

Trong đó $n! = n \\cdot (n-1) \\cdots 2 \\cdot 1$ là **giai thừa**, quy ước $0! = 1$.

**(b) Vì sao tồn tại.** Khi *thứ tự khác nhau tính là khác nhau* (xếp hạng, mật khẩu, lịch trình), ta cần một công thức gói gọn quy tắc nhân "n cách cho chỗ đầu, $n-1$ cho chỗ kế…". $P(n,k)$ chính là rút gọn của tích đó.

**(c) Ví dụ trực giác bằng số.** Xếp 3 người (A, B, C) ngồi đủ 3 ghế: $P(3,3) = 3! = 6$. Liệt kê: ABC, ACB, BAC, BCA, CAB, CBA → đúng 6 thứ tự khác nhau.

### 3.2 Walk-through tính tay

Tính $P(5,3)$ (chọn có thứ tự 3 từ 5):

$$P(5,3) = \\frac{5!}{(5-3)!} = \\frac{5!}{2!} = \\frac{120}{2} = 60.$$

Hoặc nhân trực tiếp 3 thừa số giảm dần: $5 \\cdot 4 \\cdot 3 = 60$ ✓ (hai cách khớp nhau).

Diễn giải quy tắc nhân: chỗ 1 có 5 cách, chỗ 2 còn 4, chỗ 3 còn 3 → $5 \\cdot 4 \\cdot 3 = 60$.

### 3.3 ≥4 ví dụ số đa dạng

1. $P(4,2) = \\frac{4!}{2!} = \\frac{24}{2} = 12$, và $4 \\cdot 3 = 12$ ✓.
2. $P(6,1) = \\frac{6!}{5!} = 6$ — chọn có thứ tự 1 phần tử = chỉ 6 cách (hiển nhiên).
3. $P(5,5) = 5! = 120$ — xếp toàn bộ 5 phần tử ($k = n$ → hoán vị đầy đủ).
4. $P(10,0) = \\frac{10!}{10!} = 1$ — chọn 0 phần tử: đúng 1 cách (chọn "rỗng").
5. $P(7,3) = 7 \\cdot 6 \\cdot 5 = 210$, kiểm tra $\\frac{7!}{4!} = \\frac{5040}{24} = 210$ ✓.

### ⚠ Lỗi thường gặp

- **Quên $0! = 1$.** Nếu nghĩ $0! = 0$ thì $P(n,n) = \\frac{n!}{0!}$ sẽ chia cho 0 — sai. Đúng là $0! = 1$ (có đúng 1 cách "không làm gì").
- **Lẫn $P$ với $C$.** Nếu thứ tự *không* quan trọng (chọn nhóm, không xếp hạng) thì dùng tổ hợp $C$, không phải $P$. $P(5,3) = 60$ nhưng $C(5,3) = 10$ — chênh đúng $3! = 6$ lần (vì mỗi nhóm 3 có $3!$ cách xếp thứ tự). Xem mục 4.

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>Có 8 cuốn sách, xếp 3 cuốn lên kệ theo thứ tự trái→phải. Bao nhiêu cách?</summary>

Thứ tự quan trọng (vị trí trên kệ khác nhau) → hoán vị:
$P(8,3) = 8 \\cdot 7 \\cdot 6 = 336$ cách. Kiểm tra $\\frac{8!}{5!} = \\frac{40320}{120} = 336$ ✓.
</details>

### 📝 Tóm tắt mục 3

- Hoán vị = chọn **có thứ tự**, $P(n,k) = \\frac{n!}{(n-k)!} = n(n-1)\\cdots(n-k+1)$.
- $P(n,n) = n!$, $P(n,0) = 1$, nhớ $0! = 1$.
- Dùng khi xếp hạng/sắp xếp; nếu thứ tự không quan trọng → tổ hợp.

## 4. Tổ hợp (combination) — thứ tự KHÔNG quan trọng

### 4.1 Định nghĩa (3 phần)

> **💡 Trực giác:** Tổ hợp trả lời *"có bao nhiêu cách CHỌN ra $k$ phần tử từ $n$ mà KHÔNG quan tâm thứ tự?"* Như chọn 3 người vào một đội (đội {A,B,C} = đội {C,B,A}, cùng một đội).

**(a) Là gì.** $C(n,k)$ (đọc "C n chập k", còn viết $\\binom{n}{k}$, "n choose k") = số tập con $k$ phần tử của tập $n$ phần tử:

$$C(n,k) = \\binom{n}{k} = \\frac{n!}{k!\\,(n-k)!} = \\frac{P(n,k)}{k!}.$$

**(b) Vì sao tồn tại.** Rất nhiều bài toán chỉ quan tâm *chọn ai*, không quan tâm *xếp ai trước*: chọn đội, chọn 2 đỉnh nối cạnh, chọn lá bài. Hoán vị đếm dư vì nó tính mọi thứ tự; chia cho $k!$ (số cách xếp thứ tự nội bộ $k$ phần tử) để "xóa thứ tự".

**(c) Ví dụ trực giác bằng số.** Chọn 2 người từ {A,B,C}: $C(3,2) = \\frac{3!}{2!\\,1!} = 3$. Liệt kê các *nhóm*: {A,B}, {A,C}, {B,C} → đúng 3. (Còn hoán vị $P(3,2) = 6$ vì tính cả AB và BA riêng.)

### 4.2 Walk-through: phân biệt P vs C bằng số

Tính $C(5,2)$:

$$C(5,2) = \\frac{5!}{2!\\,3!} = \\frac{120}{2 \\cdot 6} = \\frac{120}{12} = 10.$$

**Verify bằng liệt kê** 10 cặp từ {1,2,3,4,5}:

$$\\{1,2\\},\\{1,3\\},\\{1,4\\},\\{1,5\\},\\{2,3\\},\\{2,4\\},\\{2,5\\},\\{3,4\\},\\{3,5\\},\\{4,5\\}$$

Đếm: đúng **10 cặp** ✓. So với $P(5,2) = 20$: mỗi cặp như {1,2} được hoán vị tính 2 lần (12 và 21), nên $C = P / 2! = 20/2 = 10$.

### 4.3 ≥4 ví dụ số đa dạng

1. $C(4,2) = \\frac{4!}{2!2!} = \\frac{24}{4} = 6$. Liệt kê {1,2},{1,3},{1,4},{2,3},{2,4},{3,4} → 6 ✓.
2. $C(6,0) = \\frac{6!}{0!6!} = 1$ — chỉ 1 cách chọn tập rỗng.
3. $C(6,6) = \\frac{6!}{6!0!} = 1$ — chỉ 1 cách chọn cả 6.
4. $C(10,3) = \\frac{10 \\cdot 9 \\cdot 8}{3 \\cdot 2 \\cdot 1} = \\frac{720}{6} = 120$.
5. $C(52,5) = 2{,}598{,}960$ — số tay bài 5 lá từ bộ 52 (xác suất poker xây trên số này).

> **Mẹo tính nhanh:** dùng dạng rút gọn $C(n,k) = \\frac{n(n-1)\\cdots(n-k+1)}{k!}$ — chỉ nhân $k$ thừa số trên, chia $k!$. Vd $C(10,3) = \\frac{10 \\cdot 9 \\cdot 8}{6} = 120$, khỏi tính $10!$ to đùng.

### ⚠ Lỗi thường gặp

- **Lẫn P và C** — lỗi #1. Hỏi mình: *thứ tự có làm kết quả khác nhau không?* Xếp hạng/mật khẩu/ghế ngồi → **có** → P. Chọn nhóm/đội/tập con → **không** → C.
- **Quên chia $k!$.** Viết $C(n,k) = \\frac{n!}{(n-k)!}$ (thiếu $k!$) là đang tính $P$, không phải $C$.

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>Lớp 30 học sinh, chọn 1 ban cán sự gồm 3 bạn (vai trò như nhau). Bao nhiêu cách? Nếu cần lớp trưởng + lớp phó + thủ quỹ (3 vai khác nhau) thì sao?</summary>

- Vai như nhau (không thứ tự) → tổ hợp: $C(30,3) = \\frac{30 \\cdot 29 \\cdot 28}{6} = \\frac{24360}{6} = 4060$.
- Vai khác nhau (có thứ tự) → hoán vị: $P(30,3) = 30 \\cdot 29 \\cdot 28 = 24360$ — đúng gấp $3! = 6$ lần.
</details>

### 📝 Tóm tắt mục 4

- Tổ hợp = chọn **không thứ tự**, $C(n,k) = \\frac{n!}{k!(n-k)!} = \\frac{P(n,k)}{k!}$.
- $C(n,0) = C(n,n) = 1$.
- Phân biệt P/C bằng câu hỏi "thứ tự có làm kết quả khác không?".

## 5. Tam giác Pascal & các hệ thức

### 5.1 Hệ thức Pascal (công thức truy hồi)

> **💡 Trực giác:** Để chọn $k$ phần tử từ $n$, xét một phần tử đặc biệt $x$: hoặc **không** chọn $x$ (chọn đủ $k$ từ $n-1$ còn lại) hoặc **có** chọn $x$ (chọn thêm $k-1$ từ $n-1$ còn lại). Hai trường hợp rời nhau → cộng:

$$C(n,k) = C(n-1, k-1) + C(n-1, k).$$

**Verify số:** $C(5,2) = C(4,1) + C(4,2) = 4 + 6 = 10$ ✓ (khớp mục 4).

### 5.2 Dựng tam giác Pascal (walk-through số thật)

Mỗi ô = tổng 2 ô ngay trên. Hai cạnh luôn là 1 ($C(n,0) = C(n,n) = 1$).

\`\`\`
n=0:              1
n=1:            1   1
n=2:          1   2   1
n=3:        1   3   3   1
n=4:      1   4   6   4   1
n=5:    1   5  10  10   5   1
n=6:  1   6  15  20  15   6   1
\`\`\`

Cách dựng hàng $n=5$ từ hàng $n=4$ \`[1,4,6,4,1]\`:

- $C(5,0) = 1$ (cạnh).
- $C(5,1) = C(4,0) + C(4,1) = 1 + 4 = 5$.
- $C(5,2) = C(4,1) + C(4,2) = 4 + 6 = 10$.
- $C(5,3) = C(4,2) + C(4,3) = 6 + 4 = 10$.
- $C(5,4) = C(4,3) + C(4,4) = 4 + 1 = 5$.
- $C(5,5) = 1$ (cạnh).

→ Hàng 5 = \`[1, 5, 10, 10, 5, 1]\` ✓.

### 5.3 Đối xứng

$$C(n,k) = C(n, n-k).$$

> **💡 Trực giác:** Chọn $k$ phần tử "vào" tương đương chọn $n-k$ phần tử "ra" — mỗi cách chọn nhóm ứng đúng một cách chọn phần bù.

**Verify:** $C(6,2) = 15$ và $C(6,4) = 15$ ✓; $C(5,1) = 5 = C(5,4)$ ✓. Để ý mỗi hàng tam giác đối xứng gương.

### 5.4 Tổng một hàng $= 2^n$

$$\\sum_{k=0}^{n} C(n,k) = 2^n.$$

> **💡 Trực giác:** $C(n,k)$ đếm tập con $k$ phần tử; cộng mọi $k$ = tổng số tập con = $2^n$ (mục 2, quy tắc nhân). Tức là *đếm tập con theo kích thước rồi cộng lại = đếm tất cả*.

**Verify số từng hàng:**

- $n=3$: $1 + 3 + 3 + 1 = 8 = 2^3$ ✓.
- $n=4$: $1 + 4 + 6 + 4 + 1 = 16 = 2^4$ ✓.
- $n=5$: $1 + 5 + 10 + 10 + 5 + 1 = 32 = 2^5$ ✓.

### ⚠ Lỗi thường gặp

- **Đánh số nhầm.** Hàng $n$ có $n+1$ số (từ $C(n,0)$ tới $C(n,n)$). Hàng $n=4$ có 5 số, không phải 4.
- **Quên cạnh là 1.** Mọi đầu/cuối hàng là $C(n,0) = C(n,n) = 1$, không phải 0.

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>Không tra bảng, tính hàng n=7 của tam giác Pascal.</summary>

Từ hàng $n=6$ = \`[1,6,15,20,15,6,1]\`, cộng từng cặp kề:
$1, (1{+}6){=}7, (6{+}15){=}21, (15{+}20){=}35, (20{+}15){=}35, (15{+}6){=}21, (6{+}1){=}7, 1$
→ \`[1, 7, 21, 35, 35, 21, 7, 1]\`. Tổng = $128 = 2^7$ ✓.
</details>

### 📝 Tóm tắt mục 5

- Pascal: $C(n,k) = C(n-1,k-1) + C(n-1,k)$ (mỗi ô = tổng 2 ô trên).
- Đối xứng: $C(n,k) = C(n,n-k)$.
- Tổng hàng $n$ = $2^n$ = số tập con.

## 6. Nhị thức Newton (binomial theorem)

### 6.1 Phát biểu

> **💡 Trực giác:** Khai triển $(a+b)^n = (a+b)(a+b)\\cdots(a+b)$ ($n$ thừa số). Mỗi số hạng tạo bằng cách từ mỗi ngoặc chọn $a$ hoặc $b$. Số hạng $a^{n-k}b^k$ xuất hiện đúng $C(n,k)$ lần — vì có $C(n,k)$ cách chọn $k$ ngoặc lấy $b$.

$$(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k.$$

Hệ số chính là dòng $n$ của tam giác Pascal — đó là lý do $C(n,k)$ còn gọi là **hệ số nhị thức (binomial coefficient)**.

### 6.2 Ví dụ khai triển $(a+b)^3$

Hệ số hàng $n=3$ = \`[1, 3, 3, 1]\`:

$$(a+b)^3 = 1\\,a^3 + 3\\,a^2 b + 3\\,a b^2 + 1\\,b^3 = a^3 + 3a^2 b + 3ab^2 + b^3.$$

**Verify số** với $a = b = 1$: vế trái $(1+1)^3 = 8$; vế phải $1+3+3+1 = 8$ ✓ (đúng bằng $2^3$, khớp mục 5.4).

**Verify** với $a=2, b=1$: vế trái $(2+1)^3 = 27$; vế phải $8 + 3\\cdot4\\cdot1 + 3\\cdot2\\cdot1 + 1 = 8 + 12 + 6 + 1 = 27$ ✓.

### 6.3 Ví dụ khai triển $(a+b)^4$

Hệ số hàng $n=4$ = \`[1, 4, 6, 4, 1]\`:

$$(a+b)^4 = a^4 + 4a^3 b + 6a^2 b^2 + 4ab^3 + b^4.$$

**Verify** với $a=b=1$: $16$ và $1+4+6+4+1 = 16 = 2^4$ ✓.

**Verify** với $a=1, b=-1$: vế trái $(1-1)^4 = 0$; vế phải $1 - 4 + 6 - 4 + 1 = 0$ ✓ (tổng đan dấu của một hàng Pascal = 0 với $n \\geq 1$).

### ❓ Câu hỏi tự nhiên

- *"Vì sao hệ số đối xứng?"* — Vì $C(n,k) = C(n,n-k)$ (mục 5.3); số hạng $a^{n-k}b^k$ và $a^k b^{n-k}$ có cùng hệ số.
- *"Đặt $a=b=1$ cho ta gì?"* — Cho $\\sum_k C(n,k) = 2^n$ (tổng hàng Pascal). Đặt $a=1,b=-1$ cho tổng đan dấu = 0.

### 📝 Tóm tắt mục 6

- $(a+b)^n = \\sum_k \\binom{n}{k} a^{n-k} b^k$; hệ số = hàng $n$ của Pascal.
- $a=b=1 \\Rightarrow$ tổng hàng $= 2^n$; $a=1,b=-1 \\Rightarrow$ tổng đan dấu $= 0$.

## 7. Nguyên lý chuồng bồ câu (pigeonhole)

### 7.1 Phát biểu

> **💡 Trực giác:** Nhét $n+1$ con bồ câu vào $n$ chuồng thì ít nhất một chuồng có ≥ 2 con. Hiển nhiên, nhưng cực mạnh.

**Dạng cơ bản:** nếu xếp $m$ vật vào $n$ hộp với $m > n$ thì có ít nhất một hộp chứa ≥ 2 vật.

**Dạng tổng quát:** nếu xếp $m$ vật vào $n$ hộp thì có hộp chứa ≥ $\\lceil m/n \\rceil$ vật.

### 7.2 Ví dụ 1 — hash collision (va chạm băm)

Ánh xạ $|\\text{key}| = m$ key vào $n$ slot của hash table. Nếu $m > n$ → **bắt buộc** có ≥ 2 key cùng slot → collision không thể tránh. Ví dụ: 1{,}000{,}000 chuỗi băm vào bảng $65{,}536$ slot → có slot chứa ≥ $\\lceil 10^6 / 65536 \\rceil = 16$ key. Đây chính xác là lý do hash table **phải** xử lý collision (đã gặp ở [Lesson 01 §5.2](../lesson-01-set-theory/)).

### 7.3 Ví dụ 2 — nghịch lý ngày sinh (birthday)

Có 366 "chuồng" (ngày trong năm, kể 29/2). Với 367 người, chắc chắn 2 người trùng ngày sinh (pigeonhole). Bất ngờ hơn: chỉ cần **23 người** thì xác suất có 2 người trùng ngày sinh đã > 50%. Tính bằng combinatorics — số cặp người là $C(23,2) = 253$ cặp, mỗi cặp có cơ hội trùng → tích lũy lên rất nhanh. Đây là nền của **birthday attack** trong [Cryptography](../../../Cryptography/) (vì sao hash 64-bit không đủ an toàn chống va chạm).

### 7.4 Ví dụ 3 — số trùng dư

Lấy bất kỳ 13 số nguyên, chia cho 12 → có ≥ 2 số cùng số dư (13 số, 12 lớp dư 0..11). Suy ra hiệu của chúng chia hết cho 12.

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>Một lớp 30 học sinh sinh trong cùng một năm. Có chắc chắn 2 bạn sinh cùng tháng không?</summary>

Có. 30 học sinh (vật) vào 12 tháng (hộp), $30 > 12$ → pigeonhole đảm bảo ít nhất một tháng có ≥ $\\lceil 30/12 \\rceil = 3$ bạn. Vậy chắc chắn (thậm chí ≥ 3 bạn) trùng tháng.
</details>

### 📝 Tóm tắt mục 7

- $m$ vật, $n$ hộp, $m > n$ → có hộp ≥ 2 vật (tổng quát: ≥ $\\lceil m/n \\rceil$).
- Giải thích vì sao hash collision không tránh được; nền của birthday attack.

## 8. Bao hàm – loại trừ (inclusion–exclusion)

### 8.1 Hai tập

> **💡 Trực giác:** Cộng $|A| + |B|$ thì phần giao $A \\cap B$ bị đếm 2 lần → trừ đi 1 lần.

$$|A \\cup B| = |A| + |B| - |A \\cap B|.$$

**Verify** (khớp [Lesson 01 §Bài 1](../lesson-01-set-theory/)): $A = \\{1,2,3,5,8\\}$, $B = \\{2,3,5,7\\}$ → $|A \\cup B| = 5 + 4 - 3 = 6$, đúng vì $A \\cup B = \\{1,2,3,5,7,8\\}$.

Ví dụ số: từ 1–20, chia hết cho 2 (10 số) hoặc 3 (6 số), giao = chia hết cho 6 (3 số) → $|A \\cup B| = 10 + 6 - 3 = 13$.

### 8.2 Ba tập

$$|A \\cup B \\cup C| = |A| + |B| + |C| - |A\\cap B| - |A\\cap C| - |B\\cap C| + |A\\cap B\\cap C|.$$

> **💡 Trực giác:** Cộng đơn lẻ (đếm dư giao đôi), trừ giao đôi (giờ đếm hụt giao ba), cộng lại giao ba. Dấu xen kẽ +, −, +.

**Ví dụ số:** trong 1–100, đếm số chia hết cho 2, 3, hoặc 5.

- $|A| = \\lfloor 100/2 \\rfloor = 50$, $|B| = \\lfloor 100/3 \\rfloor = 33$, $|C| = \\lfloor 100/5 \\rfloor = 20$.
- Giao đôi: chia hết 6 → $\\lfloor 100/6 \\rfloor = 16$; chia hết 10 → $10$; chia hết 15 → $6$.
- Giao ba: chia hết 30 → $\\lfloor 100/30 \\rfloor = 3$.

$$|A\\cup B\\cup C| = 50 + 33 + 20 - 16 - 10 - 6 + 3 = 74.$$

→ Có 74 số trong 1–100 chia hết cho ít nhất một trong 2, 3, 5 (suy ra 26 số nguyên tố cùng nhau với 30 trong khoảng này).

### ⚠ Lỗi thường gặp

- **Quên cộng lại giao ba.** Nếu chỉ "cộng đơn − trừ đôi" thì phần giao ba bị trừ dư → kết quả thiếu. Dấu phải xen kẽ +, −, +.

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>40 học sinh: 25 học Toán, 20 học Lý, 10 học cả hai. Bao nhiêu em học ít nhất một môn? Bao nhiêu em không học môn nào?</summary>

$|T \\cup L| = 25 + 20 - 10 = 35$ em học ít nhất một môn. Không học môn nào: $40 - 35 = 5$ em.
</details>

### 📝 Tóm tắt mục 8

- 2 tập: $|A\\cup B| = |A|+|B|-|A\\cap B|$.
- 3 tập: cộng đơn − trừ đôi + cộng ba (dấu xen kẽ).
- Sửa "đếm trùng" của quy tắc cộng khi tập giao nhau.

## 9. Ứng dụng trong CS

### 9.1 Đếm số subset → $2^n$ trạng thái

Tập $n$ phần tử có $2^n$ tập con (mục 2 & 5.4). Hệ quả:

- **Bitmask DP**: bài toán "duyệt mọi tập con" có $2^n$ trạng thái → khả thi khi $n \\lesssim 20$ ($2^{20} \\approx 10^6$), bùng nổ khi $n = 40$ ($\\approx 10^{12}$).
- **Brute-force subset-sum / TSP**: cùng giới hạn $2^n$.

### 9.2 $C(n,2)$ cặp → vì sao $O(n^2)$

Thuật toán "so sánh mọi cặp phần tử" duyệt:

$$C(n,2) = \\frac{n(n-1)}{2} \\approx \\frac{n^2}{2}.$$

Verify: $n = 5 \\Rightarrow C(5,2) = 10$ cặp (đã liệt kê ở mục 4). Đó là lý do bubble sort, kiểm tra trùng ngây thơ, hay tính khoảng cách mọi cặp điểm đều là $O(n^2)$. Cầu nối [Algorithms](../../../Algorithms/) (phân tích độ phức tạp).

### 9.3 Đường đi trên lưới → $C(m+n, m)$

Từ góc trên-trái $(0,0)$ tới góc dưới-phải $(m,n)$ của lưới, mỗi bước chỉ đi **phải (R)** hoặc **xuống (D)**. Mỗi đường = một chuỗi gồm $m$ chữ R và $n$ chữ D → đếm số cách sắp xếp chuỗi đó:

$$\\text{số đường} = \\binom{m+n}{m} = \\binom{m+n}{n}.$$

> **💡 Trực giác:** Tổng cộng $m+n$ bước, chỉ cần chọn $m$ bước nào là "phải" (còn lại là "xuống") → $C(m+n, m)$.

**Verify số** lưới $2 \\times 2$ ($m=n=2$): $C(4,2) = 6$. Liệt kê 6 chuỗi: RRDD, RDRD, RDDR, DRRD, DRDR, DDRR → đúng 6 đường.

### 9.4 Key space — quay lại câu hỏi mở đầu

Số khóa/mật khẩu khả dĩ = không gian tìm kiếm của brute-force (mục 1):

| Bộ ký tự | Độ dài | Key space | Brute-force @ $10^9$/s |
| --- | --- | --- | --- |
| a–z (26) | 8 | $26^8 \\approx 2.1\\times10^{11}$ | ~3.5 phút |
| a–z, A–Z, 0–9 (62) | 8 | $62^8 \\approx 2.2\\times10^{14}$ | ~2.5 ngày |
| 95 ký tự in được | 8 | $95^8 \\approx 6.6\\times10^{15}$ | ~76 ngày |
| 95 ký tự in được | 12 | $95^{12} \\approx 5.4\\times10^{23}$ | ~17 triệu năm |

→ Mỗi ký tự thêm vào **nhân** không gian; đó là lý do "dài + đa dạng" mạnh hơn "ngắn + phức tạp". Cầu nối [Cryptography](../../../Cryptography/) (key length & brute-force resistance).

### 📝 Tóm tắt mục 9

- $2^n$ subset → giới hạn bitmask DP (~$n \\le 20$).
- $C(n,2) \\approx n^2/2$ cặp → giải thích $O(n^2)$.
- Đường đi lưới = $C(m+n,m)$; key space = quy tắc nhân.

## 10. Bài tập

**Bài 1.** Một bữa ăn gồm: chọn 1 trong 4 món khai vị, 1 trong 5 món chính, và 1 trong 3 món tráng miệng. Có bao nhiêu thực đơn khác nhau? (Quy tắc nào?)

**Bài 2.** Tính và phân biệt: có 7 vận động viên.
- (a) Bao nhiêu cách trao 3 huy chương vàng–bạc–đồng?
- (b) Bao nhiêu cách chọn 3 người vào đội tuyển (không phân vai)?

**Bài 3.** Dựng hàng $n=8$ của tam giác Pascal từ hàng $n=7 = [1,7,21,35,35,21,7,1]$. Kiểm tra tổng hàng = $2^8$.

**Bài 4.** Khai triển $(x+2)^4$ đầy đủ (thay $a=x, b=2$ vào nhị thức Newton). Kiểm tra bằng cách thay $x=1$.

**Bài 5.** Trong 1–60, đếm số chia hết cho 3 hoặc 4 (dùng inclusion–exclusion). Bao nhiêu số KHÔNG chia hết cho cả 3 lẫn 4?

**Bài 6.** (Pigeonhole) Trong một nhóm 10 người, mỗi người bắt tay vài người khác. Chứng minh có ít nhất 2 người bắt tay cùng số lần. (Gợi ý: số lần bắt tay của một người nằm trong khoảng nào?)

**Bài 7.** (Lưới) Đếm số đường đi từ $(0,0)$ tới $(3,2)$ chỉ đi phải/xuống. Liệt kê đủ để verify công thức $C(m+n,m)$.

---

## Lời giải chi tiết

### Bài 1

Ba bước độc lập, mỗi bước phải làm (chọn khai vị **và** món chính **và** tráng miệng) → **quy tắc nhân**:

$$4 \\times 5 \\times 3 = 60 \\text{ thực đơn.}$$

### Bài 2

- **(a) Có thứ tự** (vàng ≠ bạc ≠ đồng) → hoán vị:
$$P(7,3) = 7 \\cdot 6 \\cdot 5 = 210 \\text{ cách.}$$
- **(b) Không thứ tự** (cùng vào đội) → tổ hợp:
$$C(7,3) = \\frac{7 \\cdot 6 \\cdot 5}{3!} = \\frac{210}{6} = 35 \\text{ cách.}$$

Quan sát: (a) = (b) × $3!$ — vì mỗi nhóm 3 người có $3! = 6$ cách phân huy chương. Đây là minh họa trực tiếp $P(n,k) = C(n,k) \\cdot k!$.

### Bài 3

Hàng $n=7 = [1,7,21,35,35,21,7,1]$. Cộng từng cặp kề (hệ thức Pascal):

$$1,\\ 1{+}7{=}8,\\ 7{+}21{=}28,\\ 21{+}35{=}56,\\ 35{+}35{=}70,\\ 35{+}21{=}56,\\ 21{+}7{=}28,\\ 7{+}1{=}8,\\ 1$$

→ Hàng $n=8 = [1, 8, 28, 56, 70, 56, 28, 8, 1]$.

Tổng = $1+8+28+56+70+56+28+8+1 = 256 = 2^8$ ✓.

### Bài 4

Hệ số hàng $n=4 = [1,4,6,4,1]$, với $a=x, b=2$:

$$(x+2)^4 = x^4 + 4x^3(2) + 6x^2(2^2) + 4x(2^3) + 2^4$$
$$= x^4 + 8x^3 + 24x^2 + 32x + 16.$$

**Verify** $x=1$: vế trái $(1+2)^4 = 3^4 = 81$; vế phải $1 + 8 + 24 + 32 + 16 = 81$ ✓.

### Bài 5

Trong 1–60:
- Chia hết 3: $\\lfloor 60/3 \\rfloor = 20$.
- Chia hết 4: $\\lfloor 60/4 \\rfloor = 15$.
- Chia hết cả 3 và 4 (tức chia hết 12): $\\lfloor 60/12 \\rfloor = 5$.

Inclusion–exclusion:

$$|A \\cup B| = 20 + 15 - 5 = 30 \\text{ số chia hết cho 3 hoặc 4.}$$

Không chia hết cho cả 3 lẫn 4: $60 - 30 = 30$ số.

### Bài 6

Mỗi người bắt tay từ $0$ tới $9$ người khác (10 người, không tự bắt tay) → 10 giá trị khả dĩ $\\{0,1,\\dots,9\\}$.

**Mấu chốt:** không thể đồng thời tồn tại người bắt tay 0 lần (cô lập) **và** người bắt tay 9 lần (bắt tay tất cả) — vì nếu có người bắt tay cả 9 người thì không ai có thể 0 lần. Vậy thực tế chỉ có **9 giá trị khả dĩ** xảy ra: hoặc $\\{0,\\dots,8\\}$ hoặc $\\{1,\\dots,9\\}$.

10 người (vật) ánh xạ vào ≤ 9 giá trị (hộp), $10 > 9$ → **pigeonhole** đảm bảo có ≥ 2 người cùng số lần bắt tay. ∎

### Bài 7

$(m,n) = (3,2)$: cần $m+n = 5$ bước, chọn $m = 3$ bước "phải":

$$\\binom{5}{3} = \\frac{5 \\cdot 4 \\cdot 3}{3!} = \\frac{60}{6} = 10 \\text{ đường.}$$

**Liệt kê** 10 chuỗi gồm 3 chữ R và 2 chữ D (mỗi chuỗi = một đường):

$$\\text{RRRDD, RRDRD, RRDDR, RDRRD, RDRDR, RDDRR, DRRRD, DRRDR, DRDRR, DDRRR}$$

Đếm: đúng **10** ✓. Kiểm tra đối xứng: cũng bằng $\\binom{5}{2} = 10$ (chọn 2 bước "xuống").

## Tham khảo & bài tiếp theo

- **Minh họa tương tác**: [visualization.html](./visualization.html) — máy tính $P/C$ thế số, tam giác Pascal click được, và bộ liệt kê hoán vị/tổ hợp + đếm đường đi lưới.
- **Bài tiếp theo**: [Lesson 04 — Modular Arithmetic](../lesson-04-modular-arithmetic/) — số học đồng dư, nền cho hashing & cryptography.
- **Đào sâu**: [Math/05 — Number Theory, Combinatorics, Logic](../../../Math/05-NumberTheory-Combinatorics-Logic/index.html) (đếm có lặp, hàm sinh, Catalan…).
- **Liên hệ**: [Statistics](../../../Statistics/) (không gian biến cố & xác suất), [Algorithms](../../../Algorithms/) (phân tích độ phức tạp), [Cryptography](../../../Cryptography/) (key space & brute-force).
- **Sách tham khảo**: *Discrete Mathematics and Its Applications* (Rosen), chương 6 (Counting).
`;
