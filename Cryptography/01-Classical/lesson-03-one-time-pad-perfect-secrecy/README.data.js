// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Cryptography/01-Classical/lesson-03-one-time-pad-perfect-secrecy/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03: One-time Pad & Perfect Secrecy

> **Tầng 1 — Classical Cryptography · Cryptography**

## Mục tiêu học tập

1. Hiểu định nghĩa One-time pad (OTP) và cách hoạt động ở mức bit (XOR).
2. Nắm Shannon's perfect secrecy (1949) — định lý, chứng minh, ý nghĩa.
3. Hiểu tại sao OTP không dùng được trong thực tế (key distribution, key reuse).
4. Phân tích tấn công key reuse: C1 ⊕ C2 = M1 ⊕ M2 → crib-dragging.
5. Biết về Venona project — bài học lịch sử về hậu quả tái dùng key.

## Kiến thức tiền đề

- [Lesson 01: Caesar & Substitution](../lesson-01-caesar-substitution/README.md) — frequency analysis.
- [Lesson 02: Vigenère](../lesson-02-vigenere-polyalphabetic/README.md) — key length và tấn công statistical.
- Phép toán XOR (⊕) trên bit: 0⊕0=0, 0⊕1=1, 1⊕0=1, 1⊕1=0. Tính chất: A⊕A=0, A⊕0=A, A⊕B⊕B=A.
- Khái niệm entropy, xác suất cơ bản (có thể đọc [\`../../../DataFoundations/01-NumberRepresentation/\`](../../../DataFoundations/01-NumberRepresentation/) cho phần binary/XOR).

---

## 1. One-time Pad — Định nghĩa

> 💡 **Trực giác**: OTP giống Vigenère với key dài bằng message và hoàn toàn ngẫu nhiên — nhưng thay vì cộng mod 26, ta XOR từng bit. Vì key ngẫu nhiên hoàn toàn, mỗi ciphertext bit là hoàn toàn không tương quan với plaintext bit → không thể phân biệt ciphertext của "HELLO" với ciphertext của "WORLD" hay bất kỳ message nào khác cùng độ dài.

### 1.1 Ba điều kiện bắt buộc

OTP **phải** thỏa mãn đồng thời 3 điều kiện — thiếu bất kỳ điều nào là không còn perfect secrecy:

1. **Key length ≥ message length**: key K phải ít nhất dài bằng plaintext M.
2. **Key là true random**: phải dùng cryptographic random number generator (CSPRNG), không phải pseudo-random. Dice, hardware entropy source, v.v.
3. **Key dùng đúng một lần**: sau khi encrypt xong, hủy key. Không bao giờ dùng lại với message khác.

### 1.2 Cơ chế XOR

Ký hiệu ⊕ là XOR bit-by-bit.

**Encrypt**: C = M ⊕ K

**Decrypt**: M = C ⊕ K (vì C ⊕ K = M ⊕ K ⊕ K = M ⊕ 0 = M)

**Ví dụ 1 — OTP encrypt "HELLO" với key "XMCKL":**

Đổi mỗi chữ sang số (A=0,...,Z=25), sau đó sang binary 5-bit:

\`\`\`
H = 7  = 00111
E = 4  = 00100
L = 11 = 01011
L = 11 = 01011
O = 14 = 01110

X = 23 = 10111
M = 12 = 01100
C =  2 = 00010
K = 10 = 01010
L = 11 = 01011

XOR từng vị trí:
H⊕X: 00111 ⊕ 10111 = 10000 = 16 = Q? No, chuẩn:
  Bit 1: 0⊕1=1, Bit 2: 0⊕0=0, Bit 3: 1⊕1=0, Bit 4: 1⊕1=0, Bit 5: 1⊕1=0 → 10000 = 16 = Q
  Wait: A=0=00000, ..., Q=16=10000. Kết quả: Q
E⊕M: 00100 ⊕ 01100 = 01000 = 8 = I (A=0, ..., I=8)
L⊕C: 01011 ⊕ 00010 = 01001 = 9 = J? Wait: A=0,B=1,...,J=9. Kết quả: J
L⊕K: 01011 ⊕ 01010 = 00001 = 1 = B
O⊕L: 01110 ⊕ 01011 = 00101 = 5 = F

Ciphertext: "QIJBF"
\`\`\`

Kiểm tra decrypt: C ⊕ K = "QIJBF" ⊕ "XMCKL"

\`\`\`
Q=16=10000 ⊕ X=23=10111 = 00111 = 7 = H ✓
I=8=01000  ⊕ M=12=01100 = 00100 = 4 = E ✓
J=9=01001  ⊕ C=2=00010  = 01011 = 11 = L ✓
B=1=00001  ⊕ K=10=01010 = 01011 = 11 = L ✓
F=5=00101  ⊕ L=11=01011 = 01110 = 14 = O ✓
\`\`\`

> ⚠ **Lưu ý về encoding**: Trong thực tế, OTP hoạt động ở mức **byte** (ASCII, UTF-8), không phải 5-bit alphabet. Ví dụ trên dùng alphabet 26 chữ để minh họa — production OTP XOR byte with byte.

> ⚠ **"XMCKL" là key đã biết — vi phạm tính random?** Trong ví dụ pedagogical, ta chọn key cụ thể để tính bằng tay. Key thật phải random hoàn toàn — không chọn "XMCKL" vì nó trông gọn.

---

## 2. Shannon's Perfect Secrecy (1949)

> 💡 **Trực giác**: "Perfect secrecy" nghĩa là: sau khi nhìn ciphertext, attacker không học được gì về plaintext — xác suất P(M=m|C=c) bằng đúng xác suất prior P(M=m). Ciphertext không có giá trị thông tin nào. Điều này nghe có vẻ mạnh — thật ra là mạnh, và chỉ OTP đạt được.

### 2.1 Định nghĩa hình thức

**Định nghĩa (Shannon, 1949)**: Một encryption scheme (M, C, K, Enc, Dec) là **perfectly secret** nếu với mọi phân bố xác suất trên M, với mọi m ∈ M và mọi c ∈ C:

\`\`\`
P(M = m | C = c) = P(M = m)
\`\`\`

Tức là: biết ciphertext c không thay đổi xác suất của bất kỳ plaintext m nào.

Tương đương: với mọi m₁, m₂ ∈ M và mọi c ∈ C: P(C = c | M = m₁) = P(C = c | M = m₂).

### 2.2 Chứng minh OTP là perfectly secret

**Định lý**: OTP (với key uniform random, |K| = |M|) là perfectly secret.

**Chứng minh** (từng bước):

Cho plaintext M = m (chuỗi ký tự cụ thể), ciphertext C = c.

Bước 1: Mỗi cặp (m, c) có **đúng một key** tương ứng: k = m ⊕ c.

*Tại sao?* Vì c = m ⊕ k ⟺ k = c ⊕ m. Với m, c cố định → k hoàn toàn xác định. Không có 2 key khác nhau cùng ánh xạ m → c.

Bước 2: Key được chọn **uniform random** → P(K = k) = 1/2^n với mọi k (n = số bit).

Bước 3: P(C = c | M = m) = P(K = m ⊕ c) = 1/2^n.

Bước 3 là hằng số — không phụ thuộc m!

Bước 4: Dùng Bayes:
\`\`\`
P(M = m | C = c) = P(C = c | M = m) · P(M = m) / P(C = c)
                 = (1/2^n) · P(M = m) / P(C = c)
\`\`\`

Bước 5: P(C = c) = Σ_m' P(C = c | M = m') · P(M = m') = (1/2^n) · Σ_m' P(M = m') = 1/2^n.

Bước 6: Thế vào:
\`\`\`
P(M = m | C = c) = (1/2^n · P(M = m)) / (1/2^n) = P(M = m) ✓
\`\`\`

**Kết luận**: biết c không thay đổi xác suất của m → OTP là perfectly secret. □

### 2.3 Ví dụ 2 — Perfect secrecy demo

Ciphertext c = "QIJBF" (5 ký tự).

Hỏi: plaintext là gì?

Với mỗi plaintext m có thể, có đúng một key k = m ⊕ c:
- m = "HELLO" → k = "HELLO" ⊕ "QIJBF" = "XMCKL"
- m = "WORLD" → k = "WORLD" ⊕ "QIJBF" = "FUXQB" (tính: W⊕Q=..., tùy encoding)
- m = "ZZZAA" → k = "ZZZAA" ⊕ "QIJBF" = ???
- m = "AAAAA" → k = "AAAAA" ⊕ "QIJBF" = "QIJBF"

Tất cả đều valid — không có lý do thống kê để ưu tiên m nào. Attacker biết c nhưng không thu hẹp được tập plaintext.

> ❓ **Câu hỏi tự nhiên**:
> - *"Nếu plaintext là tiếng Anh, 'WORLD' không nhiều khả năng hơn 'ZZZAA' sao?"* — Đúng về prior P(M=m). Nhưng perfect secrecy nói posterior = prior. Attacker biết plaintext có khả năng là tiếng Anh thông qua prior, nhưng ciphertext không cho thêm thông tin nào ngoài những gì đã biết từ trước.
> - *"Vậy attacker vẫn có thể đoán đúng bằng brute force tất cả messages?"* — Họ có thể sinh ra tất cả plaintext khả thi cùng với key tương ứng. Nhưng không có cách nào biết key đúng là cái nào. Với n = 128 bit → 2^128 candidates.

---

## 3. Tại sao OTP không dùng phổ biến

### 3.1 Vấn đề key distribution

Để share key OTP 1 MB, cần channel an toàn truyền 1 MB key. Nhưng nếu đã có channel an toàn để truyền key → sao không dùng chính channel đó để truyền message?

**Ví dụ lịch sử**: Hotline Moscow–Washington (1963) dùng OTP. Key được courier mang tay từ Moscow sang Washington và ngược lại — tốn kém, chậm, không scale.

### 3.2 Key reuse là catastrophic

**Ví dụ 3 — Tấn công key reuse:**

Giả sử Alice encrypt hai message với cùng key K:

\`\`\`
C1 = M1 ⊕ K
C2 = M2 ⊕ K
\`\`\`

Attacker nhìn thấy C1 và C2. Tính:

\`\`\`
C1 ⊕ C2 = (M1 ⊕ K) ⊕ (M2 ⊕ K)
         = M1 ⊕ M2 ⊕ (K ⊕ K)
         = M1 ⊕ M2 ⊕ 0
         = M1 ⊕ M2
\`\`\`

Attacker biết M1 ⊕ M2 — XOR của hai plaintexts, không có key! Đây không phải complete recovery, nhưng từ M1 ⊕ M2, có thể dùng **crib-dragging**.

### 3.3 Crib-dragging (kéo từ mẫu)

**Ý tưởng**: Attacker biết plaintexts là tiếng Anh. Guess M1 chứa từ "the" ở vị trí i:

\`\`\`
(M1 ⊕ M2)[i : i+3] = "the" ⊕ M2[i : i+3]
→ M2[i : i+3] = (M1 ⊕ M2)[i : i+3] ⊕ "the"
\`\`\`

Nếu kết quả M2[i:i+3] trông như tiếng Anh → guess đúng vị trí + M2 partial.

**Bước crib-dragging:**
1. Tính XOR_all = C1 ⊕ C2 = M1 ⊕ M2.
2. Thử slide "crib" (từ thông dụng như "the", "and", "is", "in") qua XOR_all ở mọi vị trí.
3. Ở mỗi vị trí i: tính M_other[i:] = XOR_all[i:] ⊕ crib.
4. Kiểm tra M_other xem có trông như tiếng Anh không (printable ASCII, common letters).
5. Lặp lại với nhiều crib khác → dần dần recover cả M1 lẫn M2.

**Ví dụ 4 — Crib-dragging đơn giản (ký tự):**

\`\`\`
M1 = "HELLO"   (H=7,  E=4,  L=11, L=11, O=14)
M2 = "WORLD"   (W=22, O=14, R=17, L=11, D=3)
K  = "XMCKL"   (X=23, M=12, C=2,  K=10, L=11)

C1 = M1 ⊕ K = 7⊕23, 4⊕12, 11⊕2, 11⊕10, 14⊕11
             = 16,   8,    9,    1,     5
             = Q,    I,    J,    B,     F  → "QIJBF"

C2 = M2 ⊕ K = 22⊕23, 14⊕12, 17⊕2, 11⊕10, 3⊕11
             = 1,     2,     19,   1,      8
             = B,     C,     T,    B,      I  → "BCTBI"

Attacker tính C1 ⊕ C2:
= Q⊕B, I⊕C, J⊕T, B⊕B, F⊕I
= 16⊕1, 8⊕2, 9⊕19, 1⊕1, 5⊕8
= 17,   10,   26→0,  0,   13
= R,    K,    A,     A,   N  → "RKAAN"

Thật ra C1⊕C2 = M1⊕M2:
H⊕W=7⊕22=29→3=D?, E⊕O=4⊕14=10=K, L⊕R=11⊕17=26→0=A, L⊕L=11⊕11=0=A, O⊕D=14⊕3=13=N
→ "DKAAN"  (mod 26 alphabet XOR)
\`\`\`

Attacker có "DKAAN" = M1 ⊕ M2. Thử crib: nếu M2 bắt đầu "WOR..." → M1[0:3] = "DKA" ⊕ "WOR" = ... Lặp lại cho đến khi ghép được.

> ⚠ **Key reuse là lỗi không thể tha thứ trong crypto**: Ngay cả với OTP — cipher lý thuyết mạnh nhất — key reuse phá toàn bộ security.

---

## 4. Venona Project (1943–1980)

> 💡 **Trực giác**: Trong WWII, KGB Liên Xô dùng OTP để mã hóa liên lạc ngoại giao và tình báo. Nhưng vì thiếu key pad, một số key pad được in 2 lần và tái sử dụng. Cục NSA (tiền thân là SIS/AFSA) phát hiện → exploit key reuse → giải mã được hàng nghìn bức điện.

### 4.1 Sự kiện

- 1943: Mỹ bắt đầu thu thập encrypted Soviet traffic.
- 1946: Meredith Gardner (NSA) phát hiện một số key OTP bị tái dùng → bắt đầu giải mã được.
- Venona giải mã: xác định hàng chục spy của Liên Xô trong chính phủ Mỹ, bao gồm Julius Rosenberg (atom bomb espionage).
- Dự án được giữ bí mật đến 1995 khi NSA declassify.

### 4.2 Kỹ thuật khai thác

Soviet gửi ~3.000 message dùng cùng key pad (key pad được in 2 lần do lỗi sản xuất). NSA tính XOR các cặp message cùng key → M1 ⊕ M2 → crib-dragging → dần recover cả hai message.

Đây là bài học quan trọng: dù có cipher hoàn hảo về lý thuyết, **lỗi triển khai (key reuse) phá toàn bộ security**.

> 📝 **Tóm tắt**:
> - OTP: C = M ⊕ K, key random, length ≥ message, dùng 1 lần duy nhất.
> - Shannon perfect secrecy: P(M|C) = P(M) — ciphertext không tiết lộ thông tin.
> - Chứng minh: mỗi (m, c) có đúng 1 key k = m⊕c; key uniform → P(c|m) = 1/2^n hằng số → P(m|c) = P(m).
> - Key reuse → C1⊕C2 = M1⊕M2 → crib-dragging → recover cả hai message.
> - Venona: thực tế lịch sử của key reuse attack trên Soviet OTP.
> - OTP không dùng thực tế được vì key = message size, và phải distribute key an toàn.

---

## 5. Bài tập

**Bài 1**: OTP encrypt "ATTACK" (A=0,...,Z=25, XOR mod-26) với key "RANDOM" (R=17,A=0,N=13,D=3,O=14,M=12). Tính từng bước và verify decrypt.

**Bài 2**: Chứng minh rằng nếu key ngắn hơn message (|K| < |M|) và key được lặp lại (như Vigenère), thì scheme không còn perfectly secret. (Gợi ý: tìm ciphertext c và hai plaintext m1 ≠ m2 mà P(C=c|M=m1) ≠ P(C=c|M=m2).)

**Bài 3**: Attacker quan sát C1 = "KHOOR" và C2 = "WKUHH" (cả hai encrypt bằng cùng OTP key dạng mod-26). Tính C1 ⊕ C2 (mod 26). Sau đó thử crib "THE" (T=19,H=7,E=4) tại vị trí 0 để đoán xem C2 có thể là phần đầu gì.

**Bài 4**: Xác suất nào cao hơn: dùng OTP 128-bit nhưng key từ pseudo-random generator (seed 32-bit), hay dùng OTP 32-bit nhưng key true-random? Giải thích về mặt lý thuyết information-theoretic.

---

## 6. Lời giải chi tiết

### Bài 1 — OTP encrypt "ATTACK" với key "RANDOM"

\`\`\`
A = 0,  T = 19, T = 19, A = 0,  C = 2,  K = 10
R = 17, A = 0,  N = 13, D = 3,  O = 14, M = 12

Encrypt (XOR mod 26):
(0+17)  mod 26 = 17 = R
(19+0)  mod 26 = 19 = T
(19+13) mod 26 = 32 mod 26 = 6 = G
(0+3)   mod 26 = 3 = D
(2+14)  mod 26 = 16 = Q
(10+12) mod 26 = 22 = W

Ciphertext: "RTGDQW"
\`\`\`

Decrypt (XOR = trừ mod 26):
\`\`\`
R(17)-R(17) = 0 = A ✓
T(19)-A(0)  = 19 = T ✓
G(6)-N(13)  = -7+26 = 19 = T ✓
D(3)-D(3)   = 0 = A ✓
Q(16)-O(14) = 2 = C ✓
W(22)-M(12) = 10 = K ✓
\`\`\`

### Bài 2 — Key ngắn hơn message không perfectly secret

Giả sử |K| = 1 (một ký tự k), |M| = 2 (hai ký tự m1m2).

Encrypt: C = (m1⊕k, m2⊕k) — dùng k lặp lại.

C1 ⊕ C2 = m1 ⊕ m2 (đã thấy từ key reuse).

Xét c = "AA" (hai chữ A). Với m = "AB": C = (A⊕k, B⊕k). Để C = "AA": A⊕k = A → k = A(0); B⊕A = B ≠ A. Mâu thuẫn → P(C="AA"|M="AB") = 0.

Với m = "AA": C = (A⊕k, A⊕k) = "AA" khi k=A → P(C="AA"|M="AA") = 1/26 > 0.

Vậy P(C="AA"|M="AA") ≠ P(C="AA"|M="AB") → không perfectly secret. □

### Bài 3 — Crib-dragging trên C1⊕C2

C1 = "KHOOR" (K=10, H=7, O=14, O=14, R=17)

C2 = "WKUHH" (W=22, K=10, U=20, H=7, H=7)

C1⊕C2 (mod 26 subtraction từng vị trí — thực ra XOR: dùng mod-26 add nghĩa là XOR ở đây):

Giả sử OTP ở đây dùng mod-26 add (như Vigenère), C1⊕C2 thực ra là (M1-M2) mod 26:

(10-22+26)=14=O, (7-10+26)=23=X, (14-20+26)=20=U, (14-7)=7=H, (17-7)=10=K → "OXUHK"

Thử crib "THE" (T=19, H=7, E=4) tại vị trí 0 cho M1:

M1[0:3] = T,H,E → M2[0:3] = (M1-M2)[0:3] ⊕ M1[0:3]:

Thực ra "OXUHK" = M1 ⊕ M2 (dạng số mod 26).

M2[0] = M1[0] - "OXUHK"[0] = T(19) - O(14) = 5 = F
M2[1] = H(7) - X(23) = -16+26 = 10 = K
M2[2] = E(4) - U(20) = -16+26 = 10 = K → M2 bắt đầu "FKK..." — không rõ có nghĩa.

Thử crib "THE" tại vị trí 0 cho M2:

M1[0] = T(19) + O(14) = 33 mod 26 = 7 = H
M1[1] = H(7) + X(23) = 30 mod 26 = 4 = E
M1[2] = E(4) + U(20) = 24 = Y → M1 bắt đầu "HEY..." — có khả năng!

Tiếp tục cho M1[3] = H, M1[4] = K: M1 = "HEYHK"? Kiểm tra C1: H⊕K = (7+k) = K(10) → k=3; E⊕K = (4+k) = H(7) → k=3 ✓ — có vẻ key[0]=3. Nhưng OTP không có pattern key — đây là minh họa crib-dragging.

### Bài 4 — 128-bit pseudo vs 32-bit true random

**128-bit pseudo-random (seed 32-bit)**: Thực sự chỉ có 2^32 ≈ 4 tỷ key khả thi (vì seed 32-bit). Attacker có thể enumerate tất cả 2^32 seeds, decrypt thử từng seed → so sánh với "plaintext trông giống tiếng Anh" → crack trong giây trên máy tính hiện đại. **Không an toàn.**

**32-bit true random**: Chỉ 2^32 key, nhưng true random → không thể enumerate theo seed. Brute force 2^32 cần ~4 tỷ phép tính — khoảng vài giây với máy tính hiện đại. **Cũng không an toàn cho 32-bit.**

**Bài học**: Cả hai đều yếu. Nhưng 128-bit true random (dù chỉ dùng 32 bit trong message) sẽ cần 2^128 brute force attempts — an toàn. Pseudo-random giả 128-bit thực ra kém hơn 32-bit true random nếu seed nhỏ.

**Kết luận**: Key entropy thật sự = log2(số key khả thi). Pseudo-random + seed 32-bit → entropy thật 32 bit, dù key dài 128 bit. True random 32-bit → entropy 32 bit. Cùng security level. **Phải dùng true random key đủ dài.**

---

## Bài tiếp theo

[Lesson 04: Modular Arithmetic Foundations](../lesson-04-modular-arithmetic-foundations/README.md) — gcd, Extended Euclidean, modular inverse, Fermat little theorem, Euler totient, fast exponentiation — nền tảng toán cho RSA (Tier 3).

## Tham khảo

- Shannon, C.E. (1949). "Communication Theory of Secrecy Systems." *Bell System Technical Journal*.
- *Cryptography Engineering* — Ferguson, Schneier, Kohno (Chapter 2)
- *Serious Cryptography* — Aumasson (Chapter 1)
- Benson, R.L. (1995). "The Venona Story." NSA declassified document.
- *Applied Cryptography* — Schneier (Chapter 1.5)
- [visualization.html](./visualization.html)
`;
