# Lesson 02 — Số nguyên tố & Đồng dư

## Mục tiêu

- Hiểu **số nguyên tố** và **định lý cơ bản số học** (phân tích duy nhất).
- Sàng Eratosthenes — tìm tất cả nguyên tố ≤ N.
- **Đồng dư** a ≡ b (mod m).
- Định lý Fermat nhỏ, định lý Euler.

## Kiến thức tiền đề

- [Lesson 01 — Chia hết & GCD](../lesson-01-divisibility-gcd/).

---

## 1. Số nguyên tố — Định nghĩa

💡 **Trực giác / Hình dung**: số nguyên tố là "viên gạch không thể chẻ nhỏ" của phép nhân. Bạn có thể xếp 12 viên thành hình chữ nhật 3×4 hay 2×6 (12 là hợp số), nhưng 7 viên thì chỉ xếp được 1 hàng 1×7 — không có cách chia thành chữ nhật "đầy đặn" nào khác. Số nguyên tố là số "không xếp được chữ nhật" ngoài 1 hàng.

**Định nghĩa**: Số tự nhiên p > 1 là nguyên tố nếu p **chỉ có 2 ước**: 1 và chính nó.

- Số đầu tiên: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, ...
- **2 là số nguyên tố chẵn DUY NHẤT**.

**Hợp số**: số > 1 không nguyên tố (có ít nhất 1 ước khác 1 và chính nó).

**4 ví dụ số đa dạng**:
- `7` nguyên tố: ước chỉ {1, 7}.
- `12` hợp số: ước {1, 2, 3, 4, 6, 12} — nhiều hơn 2.
- `2` nguyên tố (chẵn duy nhất): ước {1, 2}.
- `1` KHÔNG nguyên tố cũng KHÔNG hợp số: chỉ có 1 ước.

⚠ **1 KHÔNG phải nguyên tố** (theo quy ước hiện đại, để định lý cơ bản đúng). Phản ví dụ nếu coi 1 là nguyên tố: `6 = 2·3 = 1·2·3 = 1·1·2·3` → phân tích KHÔNG còn duy nhất, hỏng cả định lý cơ bản.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Kiểm tra n có nguyên tố không thì thử chia tới đâu?"* Chỉ cần thử các ước ≤ `√n`. Vì nếu `n = a·b` với cả a, b > √n thì `a·b > n` (vô lý) — nên một trong hai ước phải ≤ √n. Vd kiểm 97: chỉ thử tới √97 ≈ 9.8, tức 2,3,5,7 — không cái nào chia hết → 97 nguyên tố.
- *"Vì sao 2 là nguyên tố chẵn duy nhất?"* Mọi số chẵn khác (4, 6, 8...) đều chia hết cho 2 → có ước 2 ngoài 1 và chính nó → hợp số.

🔁 **Dừng lại tự kiểm tra**

1. `91` có nguyên tố không?
2. Để kiểm `131` nguyên tố, cần thử chia cho những số nào?

<details><summary>Đáp án</summary>

1. `91 = 7·13` → **hợp số**.
2. Tới `√131 ≈ 11.4`: thử 2, 3, 5, 7, 11. Không cái nào chia hết → 131 nguyên tố.

</details>

### 📝 Tóm tắt mục 1

- Nguyên tố = số > 1 chỉ có 2 ước (1 và chính nó); 1 không phải nguyên tố.
- 2 là nguyên tố chẵn duy nhất.
- Kiểm nguyên tố chỉ cần thử ước tới `√n`.

---

## 2. Định lý cơ bản số học (Fundamental Theorem of Arithmetic)

💡 **Trực giác / Hình dung**: nếu số nguyên tố là "viên gạch", định lý này nói **mỗi số tự nhiên có đúng MỘT công thức gạch** xây nên nó — không có 2 cách xếp khác nhau. Như mã vạch riêng của từng số. 360 luôn là "ba viên 2, hai viên 3, một viên 5", không bao giờ ra bộ gạch khác.

🎯 **Phát biểu**: Mọi số tự nhiên n > 1 có thể **viết duy nhất** thành tích các số nguyên tố (không kể thứ tự):
```
n = p₁^a₁ · p₂^a₂ · ... · pₖ^aₖ
```

**4 ví dụ số đa dạng**:
- `360 = 2³ · 3² · 5`.
- `100 = 2² · 5²`.
- `17 = 17` (số nguyên tố: phân tích là chính nó).
- `84 = 2² · 3 · 7`.

⟶ Lý do tại sao nguyên tố quan trọng: là "viên gạch" xây mọi số tự nhiên.

### Hệ quả: gcd, lcm từ phân tích

Cho a = ∏ pᵢ^aᵢ, b = ∏ pᵢ^bᵢ:
- **gcd(a, b) = ∏ pᵢ^min(aᵢ,bᵢ)**.
- **lcm(a, b) = ∏ pᵢ^max(aᵢ,bᵢ)**.

**Ví dụ**: gcd(360, 84). 360 = 2³·3²·5. 84 = 2²·3·7.  
- gcd = 2² · 3¹ = **12**. (Không lấy 5, 7 vì chỉ có ở 1 bên.)
- lcm = 2³·3²·5·7 = **2520**. Verify: `gcd·lcm = 12·2520 = 30240 = 360·84` ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao 'duy nhất' lại quan trọng?"* Vì nó cho phép định nghĩa gcd/lcm bằng min/max số mũ, kiểm 2 số coprime (không chung nguyên tố), và là nền cho cả lý thuyết số. Nếu phân tích không duy nhất thì mọi thứ sụp.
- *"`gcd` lấy min, `lcm` lấy max — nhớ thế nào?"* gcd là ước **chung** → chỉ lấy phần CẢ HAI đều có → mũ nhỏ hơn (min). lcm là bội **chung** → phải đủ cho cả hai → mũ lớn hơn (max).

⚠ **Lỗi thường gặp**: khi tính gcd bằng phân tích, lấy nhầm nguyên tố chỉ xuất hiện ở 1 số. Phản ví dụ: gcd(360, 84) — đừng lấy 5 (chỉ có ở 360) hay 7 (chỉ có ở 84). Nguyên tố không chung → số mũ min = 0 → bỏ.

🔁 **Dừng lại tự kiểm tra**

1. Phân tích `72` ra thừa số nguyên tố.
2. Dùng phân tích tính `gcd(72, 120)` và `lcm(72, 120)`.

<details><summary>Đáp án</summary>

1. `72 = 2³ · 3²`.
2. `120 = 2³·3·5`. gcd = `2³·3 = 24` (min mũ). lcm = `2³·3²·5 = 360` (max mũ). Verify: 24·360 = 8640 = 72·120 ✓.

</details>

### 📝 Tóm tắt mục 2

- Mọi n > 1 phân tích **duy nhất** thành tích nguyên tố.
- gcd = tích nguyên tố chung, mũ **min**; lcm = tích nguyên tố bất kỳ, mũ **max**.
- Nguyên tố chỉ ở 1 số → không vào gcd.

---

## 3. Số nguyên tố vô hạn — Chứng minh Euclid (300 TCN)

🎯 **Định lý**: Có vô hạn số nguyên tố.

**Chứng minh (phản chứng)**:
- Giả sử có hữu hạn: p₁, p₂, ..., pₙ.
- Đặt N = p₁·p₂·...·pₙ + 1.
- N chia cho mỗi pᵢ dư 1 → không pᵢ nào chia hết N.
- Nhưng N > 1 nên có ước nguyên tố → ước này không trong danh sách → MÂU THUẪN. □

💡 **Đẹp ở chỗ**: chứng minh **không xây dựng được** ví dụ cụ thể.

❓ **Câu hỏi tự nhiên của người đọc**

- *"N = p₁·...·pₙ + 1 có luôn là số nguyên tố không?"* **Không** — đây là hiểu lầm phổ biến. N chỉ đảm bảo CÓ một ước nguyên tố ngoài danh sách, chứ bản thân N không nhất thiết nguyên tố. Phản ví dụ thật: `2·3·5·7·11·13 + 1 = 30031 = 59·509` — là hợp số! Nhưng 59 và 509 đều là nguyên tố không nằm trong {2,3,5,7,11,13}.
- *"Vì sao N chia mỗi pᵢ dư 1?"* Vì `N = (p₁·...·pₙ) + 1`, mà `p₁·...·pₙ` chia hết cho mọi pᵢ → cộng 1 thì dư đúng 1.

⚠ **Lỗi thường gặp**: kết luận "vậy N là số nguyên tố mới". SAI — xem phản ví dụ 30031 ở trên. Lập luận đúng chỉ là: N **có ước nguyên tố** không trong danh sách hữu hạn → mâu thuẫn.

🔁 **Dừng lại tự kiểm tra**

1. Tính `N = 2·3·5 + 1`. Nó có nguyên tố không?
2. Tính `N = 2·3·5·7 + 1`. Nó có nguyên tố không?

<details><summary>Đáp án</summary>

1. `N = 31` → nguyên tố.
2. `N = 211` → nguyên tố. (Hai ví dụ này tình cờ nguyên tố, nhưng 30031 = 59·509 thì không — đừng tổng quát hoá.)

</details>

### 📝 Tóm tắt mục 3

- Có **vô hạn** số nguyên tố (Euclid, phản chứng, 300 TCN).
- Mấu chốt: `N = ∏pᵢ + 1` có ước nguyên tố ngoài danh sách.
- N KHÔNG nhất thiết nguyên tố (vd 30031 = 59·509).

---

## 4. Sàng Eratosthenes — Tìm nguyên tố ≤ N

💡 **Trực giác / Hình dung**: như "lọc cát" — viết hết các số ra, rồi gạch bỏ mọi bội của 2 (4,6,8...), mọi bội của 3 (6,9,12...), v.v. Những số "sống sót" không bị gạch chính là nguyên tố. Mỗi nguyên tố tự "quét sạch" các bội của nó.

**Thuật toán**:
1. Liệt kê 2 đến N.
2. Lấy số đầu (= 2). Đánh dấu nguyên tố. Xóa mọi bội.
3. Lấy số tiếp chưa xóa (= 3). Lặp đến √N.
4. Các số còn lại = nguyên tố.

**Ví dụ N=30**: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 — **10 số nguyên tố**.

**Độ phức tạp**: O(N·log log N) — gần tuyến tính.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao chỉ cần sàng tới `√N`?"* Vì mọi hợp số ≤ N đều có ước nguyên tố ≤ √N. Sau khi gạch bội của các nguyên tố ≤ √N, mọi hợp số đã bị gạch hết — số còn lại tất yếu nguyên tố.
- *"Khi gạch bội của p, bắt đầu từ đâu?"* Từ `p²`, không phải `2p`. Vì các bội nhỏ hơn (2p, 3p...) đã bị các nguyên tố nhỏ hơn gạch rồi. Vd với p=5, bắt đầu gạch từ 25 (10, 15, 20 đã bị 2, 3 gạch).

⚠ **Lỗi thường gặp**: gạch cả số 1 hoặc quên 2 là nguyên tố. Sàng bắt đầu từ 2 (không từ 1, vì 1 không nguyên tố). Phản ví dụ: nếu liệt kê từ 1 và "giữ" 1 lại → đếm sai (1 không phải nguyên tố).

🔁 **Dừng lại tự kiểm tra**

1. Có bao nhiêu số nguyên tố ≤ 20?
2. Khi sàng tới N = 50, cần gạch bội của những nguyên tố nào?

<details><summary>Đáp án</summary>

1. `2,3,5,7,11,13,17,19` → **8 số**.
2. Các nguyên tố ≤ √50 ≈ 7.07: tức `2, 3, 5, 7`.

</details>

### 📝 Tóm tắt mục 4

- Sàng Eratosthenes: gạch dần bội của từng nguyên tố ≤ √N.
- Gạch bội của p bắt đầu từ p² (nhỏ hơn đã bị gạch).
- O(N log log N) — gần tuyến tính, rất nhanh.

---

## 5. Đồng dư — Số học mod m

💡 **Trực giác / Hình dung**: đồng dư là "số học trên mặt đồng hồ". Đồng hồ 12 giờ: `15 giờ ≡ 3 giờ (mod 12)` vì cả hai chỉ về cùng vị trí kim. 17 và 2 "cùng vị trí" trên đồng hồ 5 giờ → `17 ≡ 2 (mod 5)`. Quan trọng: hai số đồng dư khi **chia m ra cùng số dư**.

**Định nghĩa**: a ≡ b (mod m) ⟺ m | (a - b). Đọc: "a đồng dư b mod m".

**4 ví dụ số đa dạng**:
- `17 ≡ 2 (mod 5)` (vì 17−2 = 15 = 3·5).
- `23 ≡ −1 (mod 8)` (vì 23−(−1) = 24 = 8·3); cũng `23 ≡ 7 (mod 8)`.
- `100 ≡ 0 (mod 10)` (vì 10 | 100).
- `−7 ≡ 2 (mod 3)` (vì −7−2 = −9 = 3·(−3)).

### Tính chất

Đồng dư là quan hệ tương đương (phản xạ, đối xứng, bắc cầu). Hơn nữa:
- a ≡ b, c ≡ d (mod m) → a + c ≡ b + d (mod m).
- a ≡ b, c ≡ d (mod m) → a·c ≡ b·d (mod m).
- a ≡ b (mod m) → a^k ≡ b^k (mod m).

⟶ **Có thể "làm số học mod m" như số học thường** (gần như).

> 📐 **Định nghĩa đầy đủ — Đồng dư a ≡ b (mod m)**
>
> **(a) Là gì**: a và b "đồng dư" mod m khi chúng chia m cho cùng số dư. Tương đương: m chia hết hiệu (a − b). Đây là quan hệ phân tập ℤ thành m "lớp" tương đương (mod 5 chia ℤ thành 5 lớp: ...,−5,0,5,10,..., ...,−4,1,6,11,..., v.v.).
>
> **(b) Vì sao cần**: Cho phép làm "số học vô hạn nhỏ" — thay vì làm việc với cả ℤ, chỉ cần làm việc với m số đại diện. Đặc biệt với số khổng lồ: 7^100 mod 4 không cần tính 7^100 (số 84 chữ số) — chỉ cần thấy 7 ≡ -1 → 7^100 ≡ 1. Nền tảng của **mật mã** (RSA dùng mũ mod N với N ~ 600 chữ số), **CRC/checksum** (kiểm lỗi truyền dữ liệu), **giờ đồng hồ** (24 giờ = mod 24), **lịch tuần** (mod 7).
>
> **(c) Ví dụ số**: 17 ≡ 2 (mod 5) vì 17−2=15, 5|15. 23 ≡ −1 ≡ 7 (mod 8). 100 ≡ 0 (mod 10). Tính 7^100 mod 4: 7 ≡ -1 → 7^100 ≡ (-1)^100 = **1** (mod 4). 3^50 mod 7: dùng Fermat (3^6 ≡ 1 mod 7), 50 = 6·8+2 → 3^50 ≡ 3² = **9 ≡ 2** (mod 7). Kiểm: hôm nay là thứ 3, 100 ngày nữa thứ mấy? 100 mod 7 = 2 → thứ 3 + 2 = thứ 5.

### Ứng dụng — Kiểm tra số dư

**Bài**: 7^100 chia 4 dư bao nhiêu?
- 7 ≡ -1 (mod 4) → 7^100 ≡ (-1)^100 = **1** (mod 4).

Không cần tính 7^100 (số khổng lồ).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đồng dư cho cộng, trừ, nhân, lũy thừa — vậy CHIA được không?"* **Cẩn thận!** Chia (rút gọn) chỉ hợp lệ khi số chia coprime với m. Vd `6 ≡ 0 (mod 6)` nhưng không thể "chia 2 hai vế" thành `3 ≡ 0 (mod 6)` (sai!). Trong mod, "chia" phải dùng **nghịch đảo modular**.
- *"`a ≡ b (mod m)` có cho `a² ≡ b² (mod m)` không?"* **Có**, vì nhân được: từ `a ≡ b` nhân hai vế cùng `a ≡ b` ra `a² ≡ b²`. Tổng quát `aᵏ ≡ bᵏ`.

⚠ **Lỗi thường gặp — lẫn "chia hết" và "đồng dư"**. `m | a` (a chia hết cho m) khác `a ≡ b (mod m)`. `m | a` chỉ là trường hợp đặc biệt `a ≡ 0 (mod m)`. Phản ví dụ: `17 ≡ 2 (mod 5)` đúng, nhưng `5 ∤ 17` (17 không chia hết 5). Đừng đọc "17 đồng dư 2 mod 5" thành "5 chia hết 17".

🔁 **Dừng lại tự kiểm tra**

1. `2^10 mod 3 = ?` (gợi ý: `2 ≡ −1 mod 3`).
2. Hôm nay thứ Ba. 100 ngày nữa là thứ mấy?

<details><summary>Đáp án</summary>

1. `2 ≡ −1 (mod 3)` → `2^10 ≡ (−1)^10 = 1 (mod 3)`.
2. `100 mod 7 = 2` → thứ Ba + 2 = **thứ Năm**.

</details>

### 📝 Tóm tắt mục 5

- `a ≡ b (mod m) ⟺ m|(a−b)` ⟺ a, b cùng số dư khi chia m ("đồng hồ").
- Cộng, trừ, nhân, lũy thừa được; **chia phải cẩn thận** (cần nghịch đảo modular).
- "Chia hết" `m|a` = trường hợp riêng `a ≡ 0 (mod m)` — đừng lẫn với đồng dư tổng quát.

---

## 6. Định lý Fermat nhỏ

💡 **Trực giác / Hình dung**: lũy thừa trong mod p luôn "xoay vòng" về 1 sau đúng `p−1` bước. Như đồng hồ p−1 nấc: nâng a lên mũ `p−1` thì kim quay trọn vòng về mốc 1. Điều này biến việc tính `a^(số khổng lồ) mod p` thành tính `a^(số nhỏ) mod p` — chỉ cần lấy mũ `mod (p−1)`.

🎯 **Phát biểu**: Nếu p là số nguyên tố và gcd(a, p) = 1 thì:
```
a^(p-1) ≡ 1 (mod p)
```

**Hệ quả**: a^p ≡ a (mod p), mọi a (kể cả khi p | a).

**4 ví dụ số đa dạng**:
- `2^6 ≡ 1 (mod 7)`: 64 = 7·9 + 1 ✓.
- `3^4 ≡ 1 (mod 5)`: 81 = 5·16 + 1 ✓.
- `5^6 ≡ 1 (mod 7)`: 15625 = 7·2232 + 1 ✓.
- `10^(13−1) = 10^12 ≡ 1 (mod 13)` (cơ số 10, p = 13).

**Ứng dụng**: Tính nhanh a^N mod p khi N lớn.
- 5^100 mod 7. φ(7) = 6.
- 100 = 6·16 + 4 → 5^100 = (5^6)^16 · 5^4 ≡ 1^16 · 5^4 = 625 mod 7.
- 625 = 7·89 + 2 → ≡ **2** (mod 7).

### Định lý Euler (tổng quát hóa)

Nếu gcd(a, n) = 1:
```
a^φ(n) ≡ 1 (mod n)
```

trong đó **φ(n)** = số các số nguyên < n và coprime với n (hàm Euler).

**Ví dụ**: φ(10) = 4 (gồm 1, 3, 7, 9). φ(p) = p-1 nếu p nguyên tố.

### Công thức

Nếu n = p₁^a₁ · ... · pₖ^aₖ:
```
φ(n) = n · ∏(1 - 1/pᵢ)
```

**Ví dụ**: φ(12) = 12·(1-1/2)·(1-1/3) = 12·(1/2)·(2/3) = **4**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Điều kiện `gcd(a, p) = 1` quan trọng thế nào?"* Rất. Nếu `p | a` thì `a ≡ 0 (mod p)` → `a^(p−1) ≡ 0 ≠ 1`. Vd `7^6 mod 7 = 0`, không phải 1. Định lý chỉ áp dụng cho a coprime với p.
- *"Khi mod n KHÔNG nguyên tố thì dùng gì?"* Dùng **Euler** thay Fermat: `a^φ(n) ≡ 1 (mod n)` (cần gcd(a,n)=1). Fermat là trường hợp riêng khi n = p nguyên tố (vì φ(p) = p−1).

⚠ **Lỗi thường gặp**: dùng `a^(n−1) ≡ 1 (mod n)` với n **hợp số**. SAI. Phản ví dụ: `2^(10−1) = 2^9 = 512 mod 10 = 2 ≠ 1` (vì 10 không nguyên tố). Phải dùng `a^φ(10) = a^4`: `2^4 = 16 ≡ 6`... nhưng gcd(2,10)≠1 nên Euler cũng không áp dụng. Chọn a coprime: `3^4 = 81 ≡ 1 (mod 10)` ✓.

🔁 **Dừng lại tự kiểm tra**

1. Tính `2^100 mod 5` bằng Fermat.
2. `φ(15) = ?`

<details><summary>Đáp án</summary>

1. `φ(5) = 4`, `100 = 4·25` → `2^100 = (2^4)^25 ≡ 1^25 = 1 (mod 5)`.
2. `15 = 3·5` → `φ(15) = 15·(2/3)·(4/5) = 8`. (Hoặc (3−1)(5−1) = 8.)

</details>

### 📝 Tóm tắt mục 6

- **Fermat nhỏ**: p nguyên tố, gcd(a,p)=1 → `a^(p−1) ≡ 1 (mod p)`.
- **Euler** (tổng quát): gcd(a,n)=1 → `a^φ(n) ≡ 1 (mod n)`.
- `φ(n) = n·∏(1−1/pᵢ)`; điều kiện coprime BẮT BUỘC — đừng dùng với p|a hay n hợp số sai cách.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Phân tích 504 ra thừa số nguyên tố.

**Bài 2**: Tìm φ(36).

**Bài 3**: Tính 3^100 mod 7.

**Bài 4**: 13! chia hết cho 7?

**Bài 5**: 2^1000000 lẻ hay chẵn?

### Lời giải

**Bài 1**: 504 = 8·63 = 2³·63 = 2³·9·7 = **2³ · 3² · 7**.

**Bài 2**: 36 = 2²·3². φ(36) = 36·(1/2)·(2/3) = **12**.

**Bài 3**: 3^6 ≡ 1 (mod 7) (Fermat). 100 = 6·16 + 4 → 3^100 ≡ 3^4 = 81 = 11·7+4 ≡ **4** (mod 7).

**Bài 4**: 13! = 1·2·...·13 chứa 7 → **có**.

**Bài 5**: 2^N chẵn với mọi N ≥ 1. → **chẵn**.

---

## 8. Bài tiếp theo

[Lesson 03 — Hoán vị & tổ hợp](../lesson-03-permutations-combinations/).

## 📝 Tổng kết

1. **Nguyên tố** = ước chỉ 1 và chính nó. Vô hạn (chứng minh Euclid).
2. **Phân tích duy nhất**: n = ∏ pᵢ^aᵢ.
3. **Sàng Eratosthenes** O(N log log N).
4. **Đồng dư** a ≡ b (mod m): cộng/nhân/lũy thừa được.
5. **Fermat nhỏ**: a^(p-1) ≡ 1 (mod p). **Euler**: a^φ(n) ≡ 1 (mod n).
