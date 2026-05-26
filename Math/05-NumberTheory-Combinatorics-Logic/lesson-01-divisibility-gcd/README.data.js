// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/05-NumberTheory-Combinatorics-Logic/lesson-01-divisibility-gcd/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Chia hết & GCD

## Mục tiêu

- Hiểu **chia hết**, **chia có dư**.
- **Phép chia Euclid** và thuật toán Euclid tính GCD.
- **Định lý Bezout**: GCD(a, b) = ax + by với x, y nguyên.
- LCM (bội chung nhỏ nhất) và quan hệ với GCD.

## Kiến thức tiền đề

- [Tier 1 — Hệ số học](../../01-Arithmetic-Algebra/lesson-01-number-systems/).

---

## 1. Chia hết & Phép chia Euclid

💡 **Định nghĩa**: a chia hết cho b (b ≠ 0), ký hiệu **b | a**, nếu ∃ k ∈ ℤ: a = b·k.

**Ví dụ**: 6 | 18 (vì 18 = 6·3). 5 ∤ 18 (vì không có k nguyên).

### Phép chia có dư (Euclid)

Với mọi a, b ∈ ℤ (b ≠ 0), tồn tại duy nhất q, r:
\`\`\`
a = b·q + r,    với 0 ≤ r < |b|
\`\`\`

q = thương, r = số dư.

**Ví dụ**: 23 ÷ 7 → 23 = 7·3 + 2. q = 3, r = 2.

---

## 2. Tính chất chia hết

- **Bắc cầu**: a|b và b|c → a|c.
- **Tổng**: a|b và a|c → a|(b+c), a|(b-c).
- **Nhân hằng**: a|b → a|(b·k).
- **Hệ quả**: a|b → a|(b·m + c·n) khi a|c.

**Ví dụ**: 3|9 và 3|12 → 3|(9+12) = 21 ✓.

---

## 3. GCD — Ước chung lớn nhất

**Định nghĩa**: GCD(a, b) = số d lớn nhất sao cho d|a và d|b. Ký hiệu (a, b) hoặc gcd(a, b).

**Ví dụ**: gcd(24, 36):
- Ước 24: 1, 2, 3, 4, 6, 8, 12, 24.
- Ước 36: 1, 2, 3, 4, 6, 9, 12, 18, 36.
- Chung lớn nhất: **12**.

### Thuật toán Euclid — Cực nhanh

💡 **Ý tưởng**: gcd(a, b) = gcd(b, a mod b). Lặp đến khi b = 0.

**Ví dụ**: gcd(252, 105):
- 252 = 105·2 + 42 → gcd(105, 42).
- 105 = 42·2 + 21 → gcd(42, 21).
- 42 = 21·2 + 0 → gcd(21, 0) = **21**.

⟶ Chỉ 3 bước! Tốt hơn liệt kê ước.

❓ **Vì sao đúng?** Vì nếu d|a và d|b thì d|(a - q·b) = r → d|(b, r). Và ngược lại.

### Độ phức tạp

Số bước Euclid ≤ 5·log₁₀(min(a,b)). Cực nhanh — O(log n).

---

## 4. Định lý Bezout

🎯 **Phát biểu**: Cho a, b ∈ ℤ. Tồn tại x, y ∈ ℤ sao cho:
\`\`\`
a·x + b·y = gcd(a, b)
\`\`\`

💡 **Hệ quả**: ax + by = c có nghiệm nguyên ⟺ gcd(a, b) | c.

### Thuật toán Euclid mở rộng

Lùi ngược các bước Euclid để tìm x, y.

**Ví dụ**: Tìm x, y: 252x + 105y = 21.
- 252 = 105·2 + 42 → 42 = 252 - 2·105.
- 105 = 42·2 + 21 → 21 = 105 - 2·42 = 105 - 2·(252 - 2·105) = 5·105 - 2·252.
- ⟶ **x = -2, y = 5**. Kiểm tra: 252·(-2) + 105·5 = -504 + 525 = 21 ✓.

---

## 5. LCM — Bội chung nhỏ nhất

**Định nghĩa**: LCM(a, b) = số dương m nhỏ nhất sao cho a|m và b|m.

**Công thức**:
\`\`\`
LCM(a, b) · GCD(a, b) = |a · b|
\`\`\`

⟶ Có GCD là tính được LCM.

**Ví dụ**: LCM(24, 36) = 24·36/12 = **72**.

---

## 6. Số nguyên tố cùng nhau

**Định nghĩa**: a và b nguyên tố cùng nhau (coprime) nếu GCD(a, b) = 1.

**Ví dụ**: 15 và 28 — gcd = 1 → nguyên tố cùng nhau. (Mặc dù 15 và 28 đều không nguyên tố.)

### Hệ quả Bezout
a, b coprime ⟺ ∃ x, y: ax + by = 1.

---

## 7. Ứng dụng — Mật mã RSA

🔐 RSA dùng các số nguyên tố cực lớn (~300 chữ số). An toàn vì:
- Chọn 2 số nguyên tố p, q.
- N = p·q. φ(N) = (p-1)(q-1).
- Tìm e, d sao cho e·d ≡ 1 (mod φ(N)) — dùng **Euclid mở rộng** ở đây!
- Khoá công khai: (N, e). Khoá riêng: d.
- Khó phân tích N (factor) khi không biết p, q.

⟶ Toàn bộ giao dịch web (HTTPS) dựa trên định lý Bezout + thuật toán Euclid.

---

## 8. Bài tập

### Bài tập

**Bài 1**: Tìm gcd(180, 252) bằng Euclid.

**Bài 2**: Tìm x, y: 180x + 252y = gcd(180, 252).

**Bài 3**: Tính LCM(15, 20).

**Bài 4**: PT 6x + 9y = 15 có nghiệm nguyên không? Nếu có, tìm 1 nghiệm.

**Bài 5**: Chứng minh nếu d | a và d | b thì d | (a-b).

### Lời giải

**Bài 1**:  
- 252 = 180·1 + 72.  
- 180 = 72·2 + 36.  
- 72 = 36·2 + 0.  
→ gcd = **36**.

**Bài 2**: Lùi:  
- 36 = 180 - 2·72 = 180 - 2·(252 - 180) = 3·180 - 2·252.  
→ **x = 3, y = -2**.

**Bài 3**: gcd(15, 20) = 5. LCM = 15·20/5 = **60**.

**Bài 4**: gcd(6, 9) = 3. 3 | 15 → có nghiệm. Chia 3: 2x + 3y = 5. Thử x = 1, y = 1: 2+3 = 5 ✓. → **x = 1, y = 1**.

**Bài 5**: a = d·k₁, b = d·k₂ → a - b = d·(k₁ - k₂) → d | (a-b). □

---

## 9. Bài tiếp theo

[Lesson 02 — Số nguyên tố & đồng dư](../lesson-02-primes-modular/).

## 📝 Tổng kết

1. **b | a** ⟺ ∃k: a = bk. Phép chia Euclid duy nhất: a = bq + r, 0 ≤ r < |b|.
2. **gcd(a, b) = gcd(b, a mod b)** — thuật toán Euclid (O(log n)).
3. **Bezout**: ∃ x, y: ax + by = gcd. Hệ quả: ax+by=c giải được ⟺ gcd|c.
4. **LCM · GCD = |ab|**.
5. **Ứng dụng**: RSA (mật mã), tìm chu kỳ, giải PT Diophantine.
`;
