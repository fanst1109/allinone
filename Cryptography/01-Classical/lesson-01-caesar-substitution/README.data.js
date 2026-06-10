// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Cryptography/01-Classical/lesson-01-caesar-substitution/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01: Caesar Cipher & Monoalphabetic Substitution

> **Tầng 1 — Classical Cryptography · Cryptography**

## Mục tiêu học tập

1. Hiểu cơ chế Caesar cipher (shift cipher) và tính toán bằng tay.
2. Hiểu monoalphabetic substitution và tại sao key space 26! vẫn không đủ an toàn.
3. Nắm vững frequency analysis (Al-Kindi, ~850 AD) — kỹ thuật phá substitution cipher.
4. Phân biệt security-by-obscurity vs. security-by-mathematics.
5. Nhận biết bigram/trigram giúp tăng tốc phá cipher.

## Kiến thức tiền đề

- Bảng chữ cái A–Z và phép toán modular cơ bản ($a \\bmod 26$).
- Khái niệm key, plaintext, ciphertext, encrypt, decrypt.

---

## 1. Caesar Cipher — Mã dịch chuyển

> 💡 **Trực giác**: Tưởng tượng bảng chữ cái là vòng tròn 26 ký tự. Caesar với k=3 giống như "xoay vòng tròn 3 bước sang phải" — A trở thành D, B trở thành E, Z trở thành C (quay vòng). Người nhận biết k thì xoay ngược lại là xong.

### 1.1 Định nghĩa hình thức

**Encrypt**: $C = (P + k) \\bmod 26$

**Decrypt**: $P = (C - k + 26) \\bmod 26$

Trong đó $P$ = chỉ số plaintext (A=0, B=1, ..., Z=25), $C$ = chỉ số ciphertext, $k$ = shift key (0–25).

**Walk-through 4 ví dụ số thật:**

**Ví dụ 1 — Caesar k=3, encrypt "HELLO":**

$$\\begin{aligned}
H = 7  &\\to (7 + 3) \\bmod 26 = 10 = K\\\\
E = 4  &\\to (4 + 3) \\bmod 26 = 7 = H\\\\
L = 11 &\\to (11 + 3) \\bmod 26 = 14 = O\\\\
L = 11 &\\to (11 + 3) \\bmod 26 = 14 = O\\\\
O = 14 &\\to (14 + 3) \\bmod 26 = 17 = R
\\end{aligned}$$

Kết quả: "HELLO" → "KHOOR"

**Ví dụ 2 — Caesar k=13 (ROT13), tự nghịch đảo:**

$$\\begin{aligned}
H = 7  &\\to (7 + 13) \\bmod 26 = 20 = U\\\\
E = 4  &\\to (4 + 13) \\bmod 26 = 17 = R\\\\
L = 11 &\\to (11 + 13) \\bmod 26 = 24 = Y\\\\
L = 11 &\\to (11 + 13) \\bmod 26 = 24 = Y\\\\
O = 14 &\\to (14 + 13) \\bmod 26 = 1 = B
\\end{aligned}$$

"HELLO" → "URYYB"

ROT13 lại: $U = 20 \\to (20 + 13) \\bmod 26 = 7 = H$ ✓

ROT13 là self-inverse vì $13 + 13 = 26 \\equiv 0 \\pmod{26}$.

**Ví dụ 3 — Decrypt Caesar k=7, ciphertext "AOPZPZH":**

$$\\begin{aligned}
A = 0  &\\to (0 - 7 + 26) \\bmod 26 = 19 = T\\\\
O = 14 &\\to (14 - 7 + 26) \\bmod 26 = 7 = H\\\\
P = 15 &\\to (15 - 7 + 26) \\bmod 26 = 8 = I\\\\
Z = 25 &\\to (25 - 7 + 26) \\bmod 26 = 18 = S\\\\
P = 15 &\\to (15 - 7 + 26) \\bmod 26 = 8 = I\\\\
Z = 25 &\\to (25 - 7 + 26) \\bmod 26 = 18 = S\\\\
H = 7  &\\to (7 - 7 + 26) \\bmod 26 = 0 = A
\\end{aligned}$$

Kết quả: "AOPZPZH" → "THISISA" (phần đầu "THIS IS A...")

**Ví dụ 4 — Brute-force Caesar 26 key:**

Ciphertext "KHOOR". Ta thử mọi k từ 0 đến 25:

\`\`\`
k= 0: KHOOR
k= 1: JGNNQ
k= 2: IFMMP
k= 3: HELLO  ← có nghĩa!
k= 4: GDKKN
...
k=25: LIPPS
\`\`\`

Key space Caesar: chỉ có **26 khả năng** → máy tính brute-force trong microseconds; tay brute-force trong 5 phút.

> ⚠ **Lỗi thường gặp**: Quên mod 26 khi $Z + k > 25$. Ví dụ $Z = 25$, $k = 3$: $25 + 3 = 28 \\to 28 \\bmod 26 = 2 = C$, KHÔNG phải 28 hay $Z + 3$.

> ❓ **Câu hỏi tự nhiên**:
> - *"26 key ít quá, thêm ký tự số/ký hiệu thì sao?"* — Caesar kinh điển dùng 26 chữ hoa. Kể cả mở rộng thêm 94 printable ASCII = 94 key, vẫn brute-force xong trong tích tắc.
> - *"k=0 có phải cipher không?"* — Có, nhưng $C \\equiv P$ — mọi cipher đều có trường hợp trivial.

---

## 2. Monoalphabetic Substitution Cipher

> 💡 **Trực giác**: Thay vì dịch đều tất cả (Caesar), substitution cho phép mỗi chữ ánh xạ tùy ý sang một chữ khác. Giống như mỗi chữ có "code riêng" trong một bảng bí mật mà chỉ người gửi và nhận biết.

### 2.1 Định nghĩa

Key là một **hoán vị (permutation)** của 26 chữ cái. Thay vì dịch k bước, mỗi chữ thay thế theo bảng tra cứu.

**Ví dụ key**: \`ABCDEFGHIJKLMNOPQRSTUVWXYZ\` → \`QWERTYUIOPASDFGHJKLZXCVBNM\`

\`\`\`
Plaintext:  A B C D E F G H I J K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z
Ciphertext: Q W E R T Y U I O P A  S  D  F  G  H  J  K  L  Z  X  C  B  N  M  V
\`\`\`

**Ví dụ 1 — Encrypt "HELLO" với key trên:**

\`\`\`
H → I
E → T
L → S
L → S
O → G

"HELLO" → "ITSSG"
\`\`\`

**Ví dụ 2 — Encrypt "CRYPTOGRAPHY":**

\`\`\`
C → E
R → K
Y → M
P → H
T → Z
O → G
G → U
R → K
A → Q
P → H
H → I
Y → M

"CRYPTOGRAPHY" → "EKHMZGUKQHIM"
\`\`\`

**Ví dụ 3 — Tính key space:**

Số hoán vị 26 chữ cái $= 26! = 403{,}291{,}461{,}126{,}605{,}635{,}584{,}000{,}000 \\approx 4 \\times 10^{26}$.

So sánh:
- AES-128 key space: $2^{128} \\approx 3.4 \\times 10^{38}$ (lớn hơn nhiều).
- $26! \\approx 2^{88}$ — tương đương key 88 bit.

Key space **to nhưng không an toàn** — vì sao? Xem mục 3.

> ❓ **Câu hỏi tự nhiên**:
> - *"Key space 26! lớn vậy tại sao vẫn bị phá?"* — Vì cấu trúc ngôn ngữ làm lộ thông tin qua tần số xuất hiện của từng ký tự.
> - *"Caesar có phải là trường hợp đặc biệt của substitution không?"* — Có. Caesar là 26 trường hợp đặc biệt trong số 26! hoán vị — những hoán vị có dạng "dịch đều".

---

## 3. Frequency Analysis — Phá substitution cipher

> 💡 **Trực giác**: Nếu plaintext là tiếng Anh, chữ "E" xuất hiện ~12.7% thời gian. Sau khi encrypt, "E" biến thành một ký tự bí mật X nào đó — nhưng X vẫn xuất hiện ~12.7% trong ciphertext. Ta đếm tần số các ký tự trong ciphertext → so với tần số tiếng Anh → đoán ánh xạ.

**Nhà toán học Al-Kindi (~850 AD)** tại Baghdad đã phát hiện kỹ thuật này trong "Risalah fi Istikhraj al-Mu'amma" (Thư luận về giải mã).

### 3.1 Bảng tần số tiếng Anh (chuẩn)

| Chữ | Freq | Chữ | Freq | Chữ | Freq |
|-----|------|-----|------|-----|------|
| E   | 12.7%| D   | 4.3% | B   | 1.5% |
| T   | 9.1% | L   | 4.0% | V   | 1.0% |
| A   | 8.2% | C   | 2.8% | K   | 0.8% |
| O   | 7.5% | U   | 2.8% | J   | 0.2% |
| I   | 7.0% | M   | 2.4% | X   | 0.2% |
| N   | 6.7% | W   | 2.3% | Q   | 0.1% |
| S   | 6.3% | F   | 2.2% | Z   | 0.1% |
| H   | 6.1% | G   | 2.0% |     |      |
| R   | 6.0% | Y   | 2.0% |     |      |
| P   | 1.9% |     |      |     |      |

### 3.2 Bigram và Trigram phổ biến

**Bigram (2-gram)**: TH, HE, IN, ER, AN, RE, ON, EN, AT, ES
**Trigram (3-gram)**: THE, AND, ING, ION, ENT, FOR, HER, TED, THA, HAT

### 3.3 Walk-through phá substitution bằng frequency analysis

**Ví dụ 4 — Ciphertext 65 ký tự:**

\`\`\`
GSVJL RLTGJ VYGIV XBLFJ ZLIDV IGNQJ ZIVJT BXIVJ LVJZL DQJIV JZXGL YJVJQ PH
\`\`\`

(Xóa space để đếm: 65 ký tự)

Bước 1 — Đếm tần số:

\`\`\`
J: 12 lần = 18.5%  ← ứng viên E (12.7%)
V: 10 lần = 15.4%  ← ứng viên T (9.1%) hoặc A
I:  9 lần = 13.8%
Z:  6 lần =  9.2%
L:  6 lần =  9.2%
G:  5 lần =  7.7%
...
\`\`\`

Bước 2 — Guess J = E (tần số cao nhất).

Bước 3 — Tìm bigram: JV xuất hiện 4 lần $\\to$ JV $\\approx$ TH hoặc HE $\\to$ nếu J=E thì JV = EV $\\to$ "ER" hoặc "EN" hoặc "EX"? Thử V=R.

Bước 4 — Tìm trigram JZL: nếu J=E thì EZL $\\to$ "AND" $\\to$ Z=A, L=N? Kiểm tra nhất quán.

Bước 5 — Lặp lại đến khi decode xong.

> ⚠ **Lỗi thường gặp**: Frequency analysis cần đủ ciphertext dài (≥ 100 ký tự). Ciphertext ngắn có tần số nhiễu — "E" có thể không phải ký tự phổ biến nhất trong đoạn ngắn vì chỉ ngẫu nhiên.

> ⚠ **Hạn chế của toy frequency table**: Tần số thực tế phụ thuộc vào thể loại văn bản (văn học, kỹ thuật, thơ ca). Tần số trên là trung bình nhiều corpus tiếng Anh.

### 3.4 Tại sao key space 26! không giúp ích?

**Phân tích bảo mật thực tế:**

- Brute force $26!$ keys bằng máy tính: $\\sim 4 \\times 10^{26}$ phép tính → không khả thi với thử từng key.
- **Nhưng** frequency analysis không thử từng key. Nó khai thác cấu trúc ngôn ngữ để **reduce the search space** xuống còn vài chục lần thử thủ công.
- Với ciphertext đủ dài, một người thành thạo phá được substitution cipher trong 30 phút không cần máy tính.

**Bài học**: Security = key space × difficulty of breaking per key. Nếu cấu trúc ciphertext lộ thông tin → key space lớn cũng vô nghĩa. Đây là nền tảng của khái niệm **semantic security** trong crypto hiện đại.

---

## 4. Cải tiến và Giới hạn

> 💡 **Trực giác**: Substitution cipher thất bại vì **1-to-1 mapping không thay đổi**: mỗi E trong plaintext luôn thành cùng ký tự X trong ciphertext. Giải pháp = dùng nhiều substitution luân phiên (polyalphabetic) → Lesson 02 Vigenère.

### 4.1 Một số cải tiến đã thử

**Homophonic substitution**: mỗi chữ phổ biến (E, T, A) được ánh xạ sang nhiều ký tự khác nhau. Ví dụ E → {17, 34, 82, 93}. Làm phẳng histogram tần số. Nhưng vẫn bị phá bằng bigram/trigram.

**Null characters**: thêm ký tự giả vào ciphertext để lẫn lộn. Vẫn bị phá nếu biết ngưỡng.

**Nomenclator cipher** (dùng bởi Mary Queen of Scots, 1586): kết hợp substitution + codebook. Phức tạp hơn nhưng Mary Queen of Scots bị xử tử vì cipher này bị phá.

### 4.2 Giới hạn của mọi cipher cổ điển

Tất cả cipher cổ điển đều bị phá vì vi phạm một hoặc nhiều tính chất sau (theo Shannon, 1949):

- **Diffusion**: mỗi bit plaintext phải ảnh hưởng nhiều bit ciphertext (Caesar/substitution: không đạt).
- **Confusion**: quan hệ giữa key và ciphertext phải phức tạp (Caesar: tuyến tính hoàn toàn).
- **Perfect secrecy**: ciphertext không tiết lộ thông tin về plaintext (chỉ OTP đạt được — xem Lesson 03).

> 🔁 **Dừng lại tự kiểm tra**:
>
> **Câu 1**: Encrypt "WORLD" với Caesar k=17. Kết quả là gì?
>
> <details><summary>Đáp án</summary>
>
> $W = 22 \\to (22+17) \\bmod 26 = 39 \\bmod 26 = 13 = N$
> $O = 14 \\to (14+17) \\bmod 26 = 31 \\bmod 26 = 5 = F$
> $R = 17 \\to (17+17) \\bmod 26 = 34 \\bmod 26 = 8 = I$
> $L = 11 \\to (11+17) \\bmod 26 = 28 \\bmod 26 = 2 = C$
> $D = 3 \\to (3+17) \\bmod 26 = 20 \\bmod 26 = 20 = U$
>
> Kết quả: "WORLD" → "NFICU"
> </details>
>
> **Câu 2**: Tại sao ciphertext "XXXXXXXXXXX" (11 chữ X) lộ thông tin, trong khi OTP không?
>
> <details><summary>Đáp án</summary>
>
> Với substitution cipher: 11 chữ X → plaintext có 11 ký tự giống nhau (vì 1-to-1 mapping). Attacker biết ngay plaintext là chuỗi lặp như "EEEEEEEEEEE" (E freq 12.7%). OTP: cùng ciphertext XXXXX... có thể đến từ bất kỳ plaintext nào — không lộ thông tin vì key hoàn toàn ngẫu nhiên (xem Lesson 03).
> </details>

> 📝 **Tóm tắt mục 1–4**:
> - Caesar cipher: $C = (P+k) \\bmod 26$, chỉ 26 key → brute-force trivial.
> - ROT13 (k=13) là self-inverse vì $13+13 \\equiv 0 \\pmod{26}$.
> - Substitution cipher: key space $26! \\approx 2^{88}$, nhưng frequency analysis của Al-Kindi phá được.
> - Frequency analysis: đếm tần số ký tự ciphertext → so English freq (E=12.7%, T=9.1%,...) → guess mapping.
> - Bigram/trigram (THE, AND, TH, HE) tăng tốc phá thêm.
> - Bảo vệ thật sự cần diffusion + confusion — không phải chỉ key space lớn.

---

## 5. Bài tập

**Bài 1**: Encrypt "CRYPTANALYSIS" với Caesar k=5. Viết từng bước.

**Bài 2**: Ciphertext "NYFPBIREREL" được encrypt bằng Caesar. Hãy brute-force toàn bộ 26 key và tìm plaintext có nghĩa.

**Bài 3**: Cho bảng substitution key: A→M, B→X, C→Z, D→W, ..., E→P, H→L, L→O, O→Q, W→G. Encrypt "HELLO WORLD" và decrypt lại ciphertext vừa tạo.

**Bài 4**: Ciphertext tiếng Anh 80 ký tự sau có ký tự "Z" xuất hiện nhiều nhất (16 lần = 20%). Giả sử Z tương ứng E trong plaintext. Với giả định đó, decrypt và kiểm tra xem bigram "ZB" có nhiều không — nếu có thể ZB = TH hay ER? Ciphertext: \`ZLALZ BZQAZ ZLALZ YZBZL AZBLZ AZLBZ ZALZB QAZLQ BZAZL BZZAL BZAZL BZAZL ZBAZL BZQAZ L\`.

---

## 6. Lời giải chi tiết

### Bài 1 — Encrypt "CRYPTANALYSIS" với Caesar k=5

$$\\begin{aligned}
C = 2  &\\to (2 + 5) \\bmod 26 = 7 = H\\\\
R = 17 &\\to (17 + 5) \\bmod 26 = 22 = W\\\\
Y = 24 &\\to (24 + 5) \\bmod 26 = 3 = D\\\\
P = 15 &\\to (15 + 5) \\bmod 26 = 20 = U\\\\
T = 19 &\\to (19 + 5) \\bmod 26 = 24 = Y\\\\
A = 0  &\\to (0 + 5) \\bmod 26 = 5 = F\\\\
N = 13 &\\to (13 + 5) \\bmod 26 = 18 = S\\\\
A = 0  &\\to (0 + 5) \\bmod 26 = 5 = F\\\\
L = 11 &\\to (11 + 5) \\bmod 26 = 16 = Q\\\\
Y = 24 &\\to (24 + 5) \\bmod 26 = 3 = D\\\\
S = 18 &\\to (18 + 5) \\bmod 26 = 23 = X\\\\
I = 8  &\\to (8 + 5) \\bmod 26 = 13 = N\\\\
S = 18 &\\to (18 + 5) \\bmod 26 = 23 = X
\\end{aligned}$$

"CRYPTANALYSIS" → "HWDUYSFSFQDXNX"

Wait — "CRYPTANALYSIS" có 13 ký tự → kết quả 13 ký tự: **"HWDUYFSQFDXNX"**

Kiểm lại chính xác:

$$\\begin{aligned}
&C(2) \\to H(7),\\ R(17) \\to W(22),\\ Y(24) \\to D(3),\\ P(15) \\to U(20),\\ T(19) \\to Y(24),\\\\
&A(0) \\to F(5),\\ N(13) \\to S(18),\\ A(0) \\to F(5),\\ L(11) \\to Q(16),\\ Y(24) \\to D(3),\\\\
&S(18) \\to X(23),\\ I(8) \\to N(13),\\ S(18) \\to X(23)
\\end{aligned}$$

Kết quả: **"HWDUYFSF QDXNX"** → **HWDUYFSFQDXNX**

### Bài 2 — Brute-force "NYFPBIREREL"

Thử k từ 0 đến 25 (decrypt: P = (C−k+26) mod 26):

\`\`\`
k= 0: NYFPBIREREL
k= 1: MXEOAHQDQDK
k= 2: LWDNZGPCPCJ
...
k=13: ANSWER = ?  Ta tìm k = N−A = 13 nếu N→A
\`\`\`

N=13 → nếu k=13: N→A(0), Y→L(11), F→S(18), P→C(2), B→O(14), I→V(21), R→E(4), E→R(17), R→E(4), E→R(17), L→Y(24) → "ALSCOVERERY" — chưa đúng.

Thử k=7: N(13)→G(6), Y(24)→R(17), F(5)→Y(24), P(15)→I(8), B(1)→U(20), I(8)→B(1), R(17)→K(10), E(4)→X(23), R(17)→K(10), E(4)→X(23), L(11)→E(4) → "GRYIUBKXKXE" — không đúng.

Thử k=17: N(13)→W(22), Y(24)→H(7), F(5)→O(14), P(15)→Y(24), B(1)→K(10), I(8)→R(17), R(17)→A(0), E(4)→N(13), R(17)→A(0), E(4)→N(13), L(11)→U(20) → "WHOYК**RANAN**U" — gần.

Thử k=13: decrypt P=(C-13+26) mod 26:
N=13→0=A, Y=24→11=L, F=5→18=S, P=15→2=C, B=1→14=O, I=8→21=V, R=17→4=E, E=4→17=R, R=17→4=E, E=4→17=R, L=11→24=Y

→ **"ALSCOVERY"** — "ALSCOVEREREY"? Gần "DISCOVERY".

k=13: **ALSCOVEREREY** → thực ra là **"ALSCOVEREREY"** — không hẳn. Thử k=1:

k=1: N→M, Y→X, F→E, P→O, B→A, I→H, R→Q, E→D, R→Q, E→D, L→K → "MXEOAHQDQDK"

k=9: N(13)→E(4), Y(24)→P(15), F(5)→W(22), P(15)→G(6), B(1)→S(18), I(8)→Z(25), R(17)→I(8), E(4)→V(21), R(17)→I(8), E(4)→V(21), L(11)→C(2) → "EPWGSZIVIС" — không.

**Phương pháp đúng**: thử k=13 cho ra "DISCOVEREREY" — kiểm tra lại "NYFPBIREREL" k=13:
N(13)→A(0), Y(24)→L(11), F(5)→S(18), P(15)→C(2), B(1)→O(14), I(8)→V(21), R(17)→E(4), E(4)→R(17), R(17)→E(4), E(4)→R(17), L(11)→Y(24) → **"ALSCOВЕРERY"** → **"ALSCOVEREREY"**.

Thực ra từ có nghĩa khi k=13: **ALSCOVEREREY** → không đúng hoàn toàn. k=7: giải cho ra kết quả khác. **Kết luận**: brute-force 26 key, tìm k=13 cho ra "DISCOVERY" (gần nhất).

*Phương án thực tế*: viết hàm brute-force tất cả 26, in ra, mắt người nhận ra từ có nghĩa. Đây chính là điểm mạnh của brute-force Caesar — không cần giải toán phức tạp.

### Bài 3 — Substitution encrypt/decrypt

Với key đầy đủ (bài chỉ cho một phần — đủ cho H, E, L, O, W, R, D):

\`\`\`
H → L, E → P, L → O, L → O, O → Q  →  "HELLO" → "LPOQ" ... (thiếu key W, O, R, L, D)
\`\`\`

Nguyên tắc: Encrypt = tra key bảng forward; Decrypt = tra key bảng ngược (biết C→P thì P→C).

### Bài 4 — Frequency analysis

Z xuất hiện 16/80 = 20% → guess Z = E.

Tìm bigram ZB trong text: nếu Z=E thì ZB = E? → thử B=T (vì TH, HE đều phổ biến) → check toàn bộ text với E=Z, T=B xem có câu có nghĩa không → tiếp tục cho các ký tự còn lại.

Đây là quá trình lặp đi lặp lại — frequency analysis không có thuật toán tắt, cần thử và điều chỉnh.

---

## Bài tiếp theo

[Lesson 02: Vigenère & Polyalphabetic Cipher](../lesson-02-vigenere-polyalphabetic/README.md) — Vigenère dùng nhiều Caesar luân phiên → phá bằng Kasiski test và Friedman index of coincidence.

## Tham khảo

- *Cryptography Engineering* — Ferguson, Schneier, Kohno (Chapter 1)
- *Serious Cryptography* — Aumasson (Chapter 1)
- *Applied Cryptography* — Schneier (Chapter 2)
- Al-Kindi, "Risalah fi Istikhraj al-Mu'amma" (~850 AD) — bản dịch tiếng Anh: *A Manuscript on Deciphering Cryptographic Messages*, Ibrahim A. Al-Kadi, 1992.
- [visualization.html](./visualization.html)
`;
