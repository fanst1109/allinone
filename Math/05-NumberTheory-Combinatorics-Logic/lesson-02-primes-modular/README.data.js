// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/05-NumberTheory-Combinatorics-Logic/lesson-02-primes-modular/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 02 — Số nguyên tố & Đồng dư

## Mục tiêu

- Hiểu **số nguyên tố** và **định lý cơ bản số học** (phân tích duy nhất).
- Sàng Eratosthenes — tìm tất cả nguyên tố ≤ N.
- **Đồng dư** a ≡ b (mod m).
- Định lý Fermat nhỏ, định lý Euler.

## Kiến thức tiền đề

- [Lesson 01 — Chia hết & GCD](../lesson-01-divisibility-gcd/).

---

## 1. Số nguyên tố — Định nghĩa

💡 **Định nghĩa**: Số tự nhiên p > 1 là nguyên tố nếu p **chỉ có 2 ước**: 1 và chính nó.

- Số đầu tiên: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, ...
- **2 là số nguyên tố chẵn DUY NHẤT**.

**Hợp số**: số > 1 không nguyên tố (có ít nhất 1 ước khác 1 và chính nó).

⚠ **1 KHÔNG phải nguyên tố** (theo quy ước hiện đại, để định lý cơ bản đúng).

---

## 2. Định lý cơ bản số học (Fundamental Theorem of Arithmetic)

🎯 **Phát biểu**: Mọi số tự nhiên n > 1 có thể **viết duy nhất** thành tích các số nguyên tố (không kể thứ tự):
\`\`\`
n = p₁^a₁ · p₂^a₂ · ... · pₖ^aₖ
\`\`\`

**Ví dụ**: 360 = 2³ · 3² · 5.

⟶ Lý do tại sao nguyên tố quan trọng: là "viên gạch" xây mọi số tự nhiên.

### Hệ quả: gcd, lcm từ phân tích

Cho a = ∏ pᵢ^aᵢ, b = ∏ pᵢ^bᵢ:
- **gcd(a, b) = ∏ pᵢ^min(aᵢ,bᵢ)**.
- **lcm(a, b) = ∏ pᵢ^max(aᵢ,bᵢ)**.

**Ví dụ**: gcd(360, 84). 360 = 2³·3²·5. 84 = 2²·3·7.  
- gcd = 2² · 3¹ = **12**. (Không lấy 5, 7 vì chỉ có ở 1 bên.)

---

## 3. Số nguyên tố vô hạn — Chứng minh Euclid (300 TCN)

🎯 **Định lý**: Có vô hạn số nguyên tố.

**Chứng minh (phản chứng)**:
- Giả sử có hữu hạn: p₁, p₂, ..., pₙ.
- Đặt N = p₁·p₂·...·pₙ + 1.
- N chia cho mỗi pᵢ dư 1 → không pᵢ nào chia hết N.
- Nhưng N > 1 nên có ước nguyên tố → ước này không trong danh sách → MÂU THUẪN. □

💡 **Đẹp ở chỗ**: chứng minh **không xây dựng được** ví dụ cụ thể.

---

## 4. Sàng Eratosthenes — Tìm nguyên tố ≤ N

**Thuật toán**:
1. Liệt kê 2 đến N.
2. Lấy số đầu (= 2). Đánh dấu nguyên tố. Xóa mọi bội.
3. Lấy số tiếp chưa xóa (= 3). Lặp đến √N.
4. Các số còn lại = nguyên tố.

**Ví dụ N=30**: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 — **10 số nguyên tố**.

**Độ phức tạp**: O(N·log log N) — gần tuyến tính.

---

## 5. Đồng dư — Số học mod m

💡 **Định nghĩa**: a ≡ b (mod m) ⟺ m | (a - b). Đọc: "a đồng dư b mod m".

**Ví dụ**:
- 17 ≡ 2 (mod 5) (vì 17-2 = 15 = 3·5).
- 23 ≡ -1 (mod 8) (vì 24 = 8·3).

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

---

## 6. Định lý Fermat nhỏ

🎯 **Phát biểu**: Nếu p là số nguyên tố và gcd(a, p) = 1 thì:
\`\`\`
a^(p-1) ≡ 1 (mod p)
\`\`\`

**Hệ quả**: a^p ≡ a (mod p), mọi a (kể cả khi p | a).

**Ví dụ**: 2^6 ≡ 1 (mod 7). Kiểm tra: 64 = 7·9 + 1 ✓.

**Ứng dụng**: Tính nhanh a^N mod p khi N lớn.
- 5^100 mod 7. φ(7) = 6.
- 100 = 6·16 + 4 → 5^100 = (5^6)^16 · 5^4 ≡ 1^16 · 5^4 = 625 mod 7.
- 625 = 7·89 + 2 → ≡ **2** (mod 7).

### Định lý Euler (tổng quát hóa)

Nếu gcd(a, n) = 1:
\`\`\`
a^φ(n) ≡ 1 (mod n)
\`\`\`

trong đó **φ(n)** = số các số nguyên < n và coprime với n (hàm Euler).

**Ví dụ**: φ(10) = 4 (gồm 1, 3, 7, 9). φ(p) = p-1 nếu p nguyên tố.

### Công thức

Nếu n = p₁^a₁ · ... · pₖ^aₖ:
\`\`\`
φ(n) = n · ∏(1 - 1/pᵢ)
\`\`\`

**Ví dụ**: φ(12) = 12·(1-1/2)·(1-1/3) = 12·(1/2)·(2/3) = **4**.

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
`;
