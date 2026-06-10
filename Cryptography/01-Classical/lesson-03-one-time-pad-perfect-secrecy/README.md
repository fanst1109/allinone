# Lesson 03: One-time Pad & Perfect Secrecy

> **Tầng 1 — Classical Cryptography · Cryptography**

## Mục tiêu học tập

1. Hiểu định nghĩa One-time pad (OTP) và cách hoạt động ở mức bit (XOR).
2. Nắm Shannon's perfect secrecy (1949) — định lý, chứng minh, ý nghĩa.
3. Hiểu tại sao OTP không dùng được trong thực tế (key distribution, key reuse).
4. Phân tích tấn công key reuse: $C_1 \oplus C_2 = M_1 \oplus M_2 \to$ crib-dragging.
5. Biết về Venona project — bài học lịch sử về hậu quả tái dùng key.

## Kiến thức tiền đề

- [Lesson 01: Caesar & Substitution](../lesson-01-caesar-substitution/README.md) — frequency analysis.
- [Lesson 02: Vigenère](../lesson-02-vigenere-polyalphabetic/README.md) — key length và tấn công statistical.
- Phép toán XOR ($\oplus$) trên bit: $0 \oplus 0 = 0$, $0 \oplus 1 = 1$, $1 \oplus 0 = 1$, $1 \oplus 1 = 0$. Tính chất: $A \oplus A = 0$, $A \oplus 0 = A$, $A \oplus B \oplus B = A$.
- Khái niệm entropy, xác suất cơ bản (có thể đọc [`../../../DataFoundations/01-NumberRepresentation/`](../../../DataFoundations/01-NumberRepresentation/) cho phần binary/XOR).

---

## 1. One-time Pad — Định nghĩa

> 💡 **Trực giác**: OTP giống Vigenère với key dài bằng message và hoàn toàn ngẫu nhiên — nhưng thay vì cộng mod 26, ta XOR từng bit. Vì key ngẫu nhiên hoàn toàn, mỗi ciphertext bit là hoàn toàn không tương quan với plaintext bit → không thể phân biệt ciphertext của "HELLO" với ciphertext của "WORLD" hay bất kỳ message nào khác cùng độ dài.

### 1.1 Ba điều kiện bắt buộc

OTP **phải** thỏa mãn đồng thời 3 điều kiện — thiếu bất kỳ điều nào là không còn perfect secrecy:

1. **Key length ≥ message length**: key K phải ít nhất dài bằng plaintext M.
2. **Key là true random**: phải dùng cryptographic random number generator (CSPRNG), không phải pseudo-random. Dice, hardware entropy source, v.v.
3. **Key dùng đúng một lần**: sau khi encrypt xong, hủy key. Không bao giờ dùng lại với message khác.

### 1.2 Cơ chế XOR

Ký hiệu $\oplus$ là XOR bit-by-bit.

**Encrypt**: $C = M \oplus K$

**Decrypt**: $M = C \oplus K$ (vì $C \oplus K = M \oplus K \oplus K = M \oplus 0 = M$)

**Ví dụ 1 — OTP encrypt "HELLO" với key "XMCKL":**

Đổi mỗi chữ sang số (A=0,...,Z=25), sau đó sang binary 5-bit:

```
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
```

Kiểm tra decrypt: C ⊕ K = "QIJBF" ⊕ "XMCKL"

```
Q=16=10000 ⊕ X=23=10111 = 00111 = 7 = H ✓
I=8=01000  ⊕ M=12=01100 = 00100 = 4 = E ✓
J=9=01001  ⊕ C=2=00010  = 01011 = 11 = L ✓
B=1=00001  ⊕ K=10=01010 = 01011 = 11 = L ✓
F=5=00101  ⊕ L=11=01011 = 01110 = 14 = O ✓
```

> ⚠ **Lưu ý về encoding**: Trong thực tế, OTP hoạt động ở mức **byte** (ASCII, UTF-8), không phải 5-bit alphabet. Ví dụ trên dùng alphabet 26 chữ để minh họa — production OTP XOR byte with byte.

> ⚠ **"XMCKL" là key đã biết — vi phạm tính random?** Trong ví dụ pedagogical, ta chọn key cụ thể để tính bằng tay. Key thật phải random hoàn toàn — không chọn "XMCKL" vì nó trông gọn.

---

## 2. Shannon's Perfect Secrecy (1949)

> 💡 **Trực giác**: "Perfect secrecy" nghĩa là: sau khi nhìn ciphertext, attacker không học được gì về plaintext — xác suất $P(M=m \mid C=c)$ bằng đúng xác suất prior $P(M=m)$. Ciphertext không có giá trị thông tin nào. Điều này nghe có vẻ mạnh — thật ra là mạnh, và chỉ OTP đạt được.

### 2.1 Định nghĩa hình thức

**Định nghĩa (Shannon, 1949)**: Một encryption scheme $(M, C, K, \mathrm{Enc}, \mathrm{Dec})$ là **perfectly secret** nếu với mọi phân bố xác suất trên $M$, với mọi $m \in M$ và mọi $c \in C$:

$$P(M = m \mid C = c) = P(M = m)$$

Tức là: biết ciphertext $c$ không thay đổi xác suất của bất kỳ plaintext $m$ nào.

Tương đương: với mọi $m_1, m_2 \in M$ và mọi $c \in C$: $P(C = c \mid M = m_1) = P(C = c \mid M = m_2)$.

### 2.2 Chứng minh OTP là perfectly secret

**Định lý**: OTP (với key uniform random, $|K| = |M|$) là perfectly secret.

**Chứng minh** (từng bước):

Cho plaintext $M = m$ (chuỗi ký tự cụ thể), ciphertext $C = c$.

Bước 1: Mỗi cặp $(m, c)$ có **đúng một key** tương ứng: $k = m \oplus c$.

*Tại sao?* Vì $c = m \oplus k \Leftrightarrow k = c \oplus m$. Với $m, c$ cố định $\to k$ hoàn toàn xác định. Không có 2 key khác nhau cùng ánh xạ $m \to c$.

Bước 2: Key được chọn **uniform random** $\to P(K = k) = 1/2^n$ với mọi $k$ ($n$ = số bit).

Bước 3: $P(C = c \mid M = m) = P(K = m \oplus c) = 1/2^n$.

Bước 3 là hằng số — không phụ thuộc $m$!

Bước 4: Dùng Bayes:

$$\begin{aligned}
P(M = m \mid C = c) &= \frac{P(C = c \mid M = m) \cdot P(M = m)}{P(C = c)}\\
&= \frac{(1/2^n) \cdot P(M = m)}{P(C = c)}
\end{aligned}$$

Bước 5: $P(C = c) = \sum_{m'} P(C = c \mid M = m') \cdot P(M = m') = (1/2^n) \cdot \sum_{m'} P(M = m') = 1/2^n$.

Bước 6: Thế vào:

$$P(M = m \mid C = c) = \frac{(1/2^n) \cdot P(M = m)}{1/2^n} = P(M = m) \checkmark$$

**Kết luận**: biết $c$ không thay đổi xác suất của $m \to$ OTP là perfectly secret. $\square$

### 2.3 Ví dụ 2 — Perfect secrecy demo

Ciphertext c = "QIJBF" (5 ký tự).

Hỏi: plaintext là gì?

Với mỗi plaintext $m$ có thể, có đúng một key $k = m \oplus c$:
- $m =$ "HELLO" $\to k =$ "HELLO" $\oplus$ "QIJBF" $=$ "XMCKL"
- $m =$ "WORLD" $\to k =$ "WORLD" $\oplus$ "QIJBF" $=$ "FUXQB" (tính: $W \oplus Q = \dots$, tùy encoding)
- $m =$ "ZZZAA" $\to k =$ "ZZZAA" $\oplus$ "QIJBF" $= ???$
- $m =$ "AAAAA" $\to k =$ "AAAAA" $\oplus$ "QIJBF" $=$ "QIJBF"

Tất cả đều valid — không có lý do thống kê để ưu tiên $m$ nào. Attacker biết $c$ nhưng không thu hẹp được tập plaintext.

> ❓ **Câu hỏi tự nhiên**:
> - *"Nếu plaintext là tiếng Anh, 'WORLD' không nhiều khả năng hơn 'ZZZAA' sao?"* — Đúng về prior $P(M=m)$. Nhưng perfect secrecy nói posterior = prior. Attacker biết plaintext có khả năng là tiếng Anh thông qua prior, nhưng ciphertext không cho thêm thông tin nào ngoài những gì đã biết từ trước.
> - *"Vậy attacker vẫn có thể đoán đúng bằng brute force tất cả messages?"* — Họ có thể sinh ra tất cả plaintext khả thi cùng với key tương ứng. Nhưng không có cách nào biết key đúng là cái nào. Với $n = 128$ bit $\to 2^{128}$ candidates.

---

## 3. Tại sao OTP không dùng phổ biến

### 3.1 Vấn đề key distribution

Để share key OTP 1 MB, cần channel an toàn truyền 1 MB key. Nhưng nếu đã có channel an toàn để truyền key → sao không dùng chính channel đó để truyền message?

**Ví dụ lịch sử**: Hotline Moscow–Washington (1963) dùng OTP. Key được courier mang tay từ Moscow sang Washington và ngược lại — tốn kém, chậm, không scale.

### 3.2 Key reuse là catastrophic

**Ví dụ 3 — Tấn công key reuse:**

Giả sử Alice encrypt hai message với cùng key $K$:

$$\begin{aligned}
C_1 &= M_1 \oplus K\\
C_2 &= M_2 \oplus K
\end{aligned}$$

Attacker nhìn thấy $C_1$ và $C_2$. Tính:

$$\begin{aligned}
C_1 \oplus C_2 &= (M_1 \oplus K) \oplus (M_2 \oplus K)\\
&= M_1 \oplus M_2 \oplus (K \oplus K)\\
&= M_1 \oplus M_2 \oplus 0\\
&= M_1 \oplus M_2
\end{aligned}$$

Attacker biết $M_1 \oplus M_2$ — XOR của hai plaintexts, không có key! Đây không phải complete recovery, nhưng từ $M_1 \oplus M_2$, có thể dùng **crib-dragging**.

### 3.3 Crib-dragging (kéo từ mẫu)

**Ý tưởng**: Attacker biết plaintexts là tiếng Anh. Guess $M_1$ chứa từ "the" ở vị trí $i$:

$$\begin{aligned}
(M_1 \oplus M_2)[i : i+3] &= \text{"the"} \oplus M_2[i : i+3]\\
\Rightarrow M_2[i : i+3] &= (M_1 \oplus M_2)[i : i+3] \oplus \text{"the"}
\end{aligned}$$

Nếu kết quả $M_2[i:i+3]$ trông như tiếng Anh $\to$ guess đúng vị trí + $M_2$ partial.

**Bước crib-dragging:**
1. Tính $\text{XOR\_all} = C_1 \oplus C_2 = M_1 \oplus M_2$.
2. Thử slide "crib" (từ thông dụng như "the", "and", "is", "in") qua $\text{XOR\_all}$ ở mọi vị trí.
3. Ở mỗi vị trí $i$: tính $M_{\text{other}}[i:] = \text{XOR\_all}[i:] \oplus \text{crib}$.
4. Kiểm tra $M_{\text{other}}$ xem có trông như tiếng Anh không (printable ASCII, common letters).
5. Lặp lại với nhiều crib khác $\to$ dần dần recover cả $M_1$ lẫn $M_2$.

**Ví dụ 4 — Crib-dragging đơn giản (ký tự):**

$M_1 =$ "HELLO" ($H=7$, $E=4$, $L=11$, $L=11$, $O=14$)

$M_2 =$ "WORLD" ($W=22$, $O=14$, $R=17$, $L=11$, $D=3$)

$K =$ "XMCKL" ($X=23$, $M=12$, $C=2$, $K=10$, $L=11$)

$$\begin{aligned}
C_1 = M_1 \oplus K &= 7 \oplus 23,\ 4 \oplus 12,\ 11 \oplus 2,\ 11 \oplus 10,\ 14 \oplus 11\\
&= 16,\ 8,\ 9,\ 1,\ 5\\
&= Q,\ I,\ J,\ B,\ F \to \text{"QIJBF"}
\end{aligned}$$

$$\begin{aligned}
C_2 = M_2 \oplus K &= 22 \oplus 23,\ 14 \oplus 12,\ 17 \oplus 2,\ 11 \oplus 10,\ 3 \oplus 11\\
&= 1,\ 2,\ 19,\ 1,\ 8\\
&= B,\ C,\ T,\ B,\ I \to \text{"BCTBI"}
\end{aligned}$$

Attacker tính $C_1 \oplus C_2$:

$$\begin{aligned}
&= Q \oplus B,\ I \oplus C,\ J \oplus T,\ B \oplus B,\ F \oplus I\\
&= 16 \oplus 1,\ 8 \oplus 2,\ 9 \oplus 19,\ 1 \oplus 1,\ 5 \oplus 8\\
&= 17,\ 10,\ 26 \to 0,\ 0,\ 13\\
&= R,\ K,\ A,\ A,\ N \to \text{"RKAAN"}
\end{aligned}$$

Thật ra $C_1 \oplus C_2 = M_1 \oplus M_2$:

$H \oplus W = 7 \oplus 22 = 29 \to 3 = D$?, $E \oplus O = 4 \oplus 14 = 10 = K$, $L \oplus R = 11 \oplus 17 = 26 \to 0 = A$, $L \oplus L = 11 \oplus 11 = 0 = A$, $O \oplus D = 14 \oplus 3 = 13 = N \to$ "DKAAN" (mod 26 alphabet XOR)

Attacker có "DKAAN" $= M_1 \oplus M_2$. Thử crib: nếu $M_2$ bắt đầu "WOR..." $\to M_1[0:3] =$ "DKA" $\oplus$ "WOR" $= \dots$ Lặp lại cho đến khi ghép được.

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
> - OTP: $C = M \oplus K$, key random, length $\ge$ message, dùng 1 lần duy nhất.
> - Shannon perfect secrecy: $P(M \mid C) = P(M)$ — ciphertext không tiết lộ thông tin.
> - Chứng minh: mỗi $(m, c)$ có đúng 1 key $k = m \oplus c$; key uniform $\to P(c \mid m) = 1/2^n$ hằng số $\to P(m \mid c) = P(m)$.
> - Key reuse $\to C_1 \oplus C_2 = M_1 \oplus M_2 \to$ crib-dragging $\to$ recover cả hai message.
> - Venona: thực tế lịch sử của key reuse attack trên Soviet OTP.
> - OTP không dùng thực tế được vì key = message size, và phải distribute key an toàn.

---

## 5. Bài tập

**Bài 1**: OTP encrypt "ATTACK" (A=0,...,Z=25, XOR mod-26) với key "RANDOM" (R=17,A=0,N=13,D=3,O=14,M=12). Tính từng bước và verify decrypt.

**Bài 2**: Chứng minh rằng nếu key ngắn hơn message ($|K| < |M|$) và key được lặp lại (như Vigenère), thì scheme không còn perfectly secret. (Gợi ý: tìm ciphertext $c$ và hai plaintext $m_1 \ne m_2$ mà $P(C=c \mid M=m_1) \ne P(C=c \mid M=m_2)$.)

**Bài 3**: Attacker quan sát $C_1 =$ "KHOOR" và $C_2 =$ "WKUHH" (cả hai encrypt bằng cùng OTP key dạng mod-26). Tính $C_1 \oplus C_2$ (mod 26). Sau đó thử crib "THE" ($T=19$, $H=7$, $E=4$) tại vị trí 0 để đoán xem $C_2$ có thể là phần đầu gì.

**Bài 4**: Xác suất nào cao hơn: dùng OTP 128-bit nhưng key từ pseudo-random generator (seed 32-bit), hay dùng OTP 32-bit nhưng key true-random? Giải thích về mặt lý thuyết information-theoretic.

---

## 6. Lời giải chi tiết

### Bài 1 — OTP encrypt "ATTACK" với key "RANDOM"

$A = 0$, $T = 19$, $T = 19$, $A = 0$, $C = 2$, $K = 10$

$R = 17$, $A = 0$, $N = 13$, $D = 3$, $O = 14$, $M = 12$

Encrypt (XOR mod 26):

$$\begin{aligned}
(0+17) \bmod 26 &= 17 = R\\
(19+0) \bmod 26 &= 19 = T\\
(19+13) \bmod 26 &= 32 \bmod 26 = 6 = G\\
(0+3) \bmod 26 &= 3 = D\\
(2+14) \bmod 26 &= 16 = Q\\
(10+12) \bmod 26 &= 22 = W
\end{aligned}$$

Ciphertext: "RTGDQW"

Decrypt (XOR = trừ mod 26):

$$\begin{aligned}
R(17)-R(17) &= 0 = A \checkmark\\
T(19)-A(0) &= 19 = T \checkmark\\
G(6)-N(13) &= -7+26 = 19 = T \checkmark\\
D(3)-D(3) &= 0 = A \checkmark\\
Q(16)-O(14) &= 2 = C \checkmark\\
W(22)-M(12) &= 10 = K \checkmark
\end{aligned}$$

### Bài 2 — Key ngắn hơn message không perfectly secret

Giả sử $|K| = 1$ (một ký tự $k$), $|M| = 2$ (hai ký tự $m_1 m_2$).

Encrypt: $C = (m_1 \oplus k, m_2 \oplus k)$ — dùng $k$ lặp lại.

$C_1 \oplus C_2 = m_1 \oplus m_2$ (đã thấy từ key reuse).

Xét $c =$ "AA" (hai chữ A). Với $m =$ "AB": $C = (A \oplus k, B \oplus k)$. Để $C =$ "AA": $A \oplus k = A \to k = A(0)$; $B \oplus A = B \ne A$. Mâu thuẫn $\to P(C=\text{"AA"} \mid M=\text{"AB"}) = 0$.

Với $m =$ "AA": $C = (A \oplus k, A \oplus k) =$ "AA" khi $k=A \to P(C=\text{"AA"} \mid M=\text{"AA"}) = 1/26 > 0$.

Vậy $P(C=\text{"AA"} \mid M=\text{"AA"}) \ne P(C=\text{"AA"} \mid M=\text{"AB"}) \to$ không perfectly secret. $\square$

### Bài 3 — Crib-dragging trên C1⊕C2

$C_1 =$ "KHOOR" ($K=10$, $H=7$, $O=14$, $O=14$, $R=17$)

$C_2 =$ "WKUHH" ($W=22$, $K=10$, $U=20$, $H=7$, $H=7$)

$C_1 \oplus C_2$ (mod 26 subtraction từng vị trí — thực ra XOR: dùng mod-26 add nghĩa là XOR ở đây):

Giả sử OTP ở đây dùng mod-26 add (như Vigenère), $C_1 \oplus C_2$ thực ra là $(M_1 - M_2) \bmod 26$:

$(10-22+26)=14=O$, $(7-10+26)=23=X$, $(14-20+26)=20=U$, $(14-7)=7=H$, $(17-7)=10=K \to$ "OXUHK"

Thử crib "THE" ($T=19$, $H=7$, $E=4$) tại vị trí 0 cho $M_1$:

$M_1[0:3] = T,H,E \to M_2[0:3] = (M_1-M_2)[0:3] \oplus M_1[0:3]$:

Thực ra "OXUHK" $= M_1 \oplus M_2$ (dạng số mod 26).

$$\begin{aligned}
M_2[0] &= M_1[0] - \text{"OXUHK"}[0] = T(19) - O(14) = 5 = F\\
M_2[1] &= H(7) - X(23) = -16+26 = 10 = K\\
M_2[2] &= E(4) - U(20) = -16+26 = 10 = K
\end{aligned}$$

$\to M_2$ bắt đầu "FKK..." — không rõ có nghĩa.

Thử crib "THE" tại vị trí 0 cho $M_2$:

$$\begin{aligned}
M_1[0] &= T(19) + O(14) = 33 \bmod 26 = 7 = H\\
M_1[1] &= H(7) + X(23) = 30 \bmod 26 = 4 = E\\
M_1[2] &= E(4) + U(20) = 24 = Y
\end{aligned}$$

$\to M_1$ bắt đầu "HEY..." — có khả năng!

Tiếp tục cho $M_1[3] = H$, $M_1[4] = K$: $M_1 =$ "HEYHK"? Kiểm tra $C_1$: $H \oplus K = (7+k) = K(10) \to k=3$; $E \oplus K = (4+k) = H(7) \to k=3$ ✓ — có vẻ $\text{key}[0]=3$. Nhưng OTP không có pattern key — đây là minh họa crib-dragging.

### Bài 4 — 128-bit pseudo vs 32-bit true random

**128-bit pseudo-random (seed 32-bit)**: Thực sự chỉ có $2^{32} \approx 4$ tỷ key khả thi (vì seed 32-bit). Attacker có thể enumerate tất cả $2^{32}$ seeds, decrypt thử từng seed $\to$ so sánh với "plaintext trông giống tiếng Anh" $\to$ crack trong giây trên máy tính hiện đại. **Không an toàn.**

**32-bit true random**: Chỉ $2^{32}$ key, nhưng true random $\to$ không thể enumerate theo seed. Brute force $2^{32}$ cần ~4 tỷ phép tính — khoảng vài giây với máy tính hiện đại. **Cũng không an toàn cho 32-bit.**

**Bài học**: Cả hai đều yếu. Nhưng 128-bit true random (dù chỉ dùng 32 bit trong message) sẽ cần $2^{128}$ brute force attempts — an toàn. Pseudo-random giả 128-bit thực ra kém hơn 32-bit true random nếu seed nhỏ.

**Kết luận**: Key entropy thật sự $= \log_2(\text{số key khả thi})$. Pseudo-random + seed 32-bit $\to$ entropy thật 32 bit, dù key dài 128 bit. True random 32-bit $\to$ entropy 32 bit. Cùng security level. **Phải dùng true random key đủ dài.**

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
