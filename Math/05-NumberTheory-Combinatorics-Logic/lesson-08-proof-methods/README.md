# Lesson 08 — Phương pháp chứng minh

## Mục tiêu

- Phân loại **5 phương pháp chứng minh** chính: trực tiếp, phản chứng, phản đảo, quy nạp, xây dựng.
- Khi nào dùng phương pháp nào.
- Ví dụ kinh điển cho mỗi phương pháp.

## Kiến thức tiền đề

- [Lesson 06 — Quy nạp](../lesson-06-induction/), [Lesson 07 — Logic](../lesson-07-logic-sets-maps/).

---

## 1. Chứng minh trực tiếp (Direct proof)

**Mẫu**: Cần chứng minh P → Q. Giả sử P, suy ra từng bước đến Q.

**Ví dụ**: CM "Nếu n là số chẵn thì n² chẵn".
- Giả sử n chẵn → n = 2k.
- n² = (2k)² = 4k² = 2·(2k²) → chia hết 2 → chẵn. □

⟶ Đơn giản nhất, dùng khi suy luận thẳng được.

---

## 2. Chứng minh phản đảo (Contrapositive)

**Logic**: P → Q tương đương ¬Q → ¬P.

⟶ Đôi khi ¬Q → ¬P **dễ chứng minh hơn** P → Q.

**Ví dụ**: CM "Nếu n² lẻ thì n lẻ".
- Phản đảo: "Nếu n chẵn thì n² chẵn" (đã CM ở 1).
- Vậy ban đầu cũng đúng. □

---

## 3. Chứng minh phản chứng (Proof by contradiction)

🎯 **Mẫu**: Cần CM P. Giả sử **¬P**, suy ra mâu thuẫn → ¬P sai → P đúng.

### Ví dụ kinh điển — √2 vô tỉ

CM √2 không phải số hữu tỉ.

**Phản chứng**: Giả sử √2 = a/b với a, b ∈ ℤ, gcd(a,b) = 1 (phân số tối giản).

- √2 = a/b → 2 = a²/b² → a² = 2b² → a² chẵn → a chẵn.
- a = 2c → (2c)² = 2b² → 4c² = 2b² → b² = 2c² → b² chẵn → b chẵn.
- Cả a và b chẵn → 2 | gcd(a, b) → gcd ≠ 1.
- **MÂU THUẪN** với gcd(a,b) = 1. □

⟶ Phản chứng cực hiệu quả cho mệnh đề **phủ định** (X không phải Y).

### Ví dụ thứ 2 — Vô hạn số nguyên tố (Euclid)

(Đã CM ở L02 — đó là phản chứng kinh điển.)

---

## 4. Chứng minh xây dựng (Constructive)

🎯 **Mẫu**: CM ∃x: P(x) bằng cách **xây dựng** x cụ thể.

**Ví dụ**: CM ∃ số chẵn là tổng 2 nguyên tố.
- 6 = 3 + 3. □

**Ví dụ phức tạp** — Vô số nguyên tố dạng 4k+3.

CM bằng phản chứng: giả sử hữu hạn p₁, ..., pₙ dạng 4k+3.

Xét N = 4·p₁·p₂·...·pₙ - 1. N có dạng 4k+3 (vì 4·... -1 ≡ -1 ≡ 3 mod 4).
- N > 1 → có ước nguyên tố.
- Mọi ước nguyên tố lẻ ≡ 1 hoặc 3 (mod 4).
- Nếu tất cả ước ≡ 1 (mod 4): tích ≡ 1 (mod 4), mâu thuẫn N ≡ 3.
- → Có ước p ≡ 3 (mod 4), nhưng p ≠ pᵢ (vì pᵢ | (N + 1) nhưng p | N).
- Mâu thuẫn. □

---

## 5. Chứng minh quy nạp

(Đã học ở L06.)

⟶ Dùng cho mệnh đề về số tự nhiên.

---

## 6. Chứng minh không-tồn-tại (Non-existence)

Phổ biến dùng **phản chứng**: giả sử tồn tại → mâu thuẫn.

**Ví dụ**: CM PT x² + y² = 4·z + 3 không có nghiệm nguyên.

- Xét mod 4. Số chính phương mod 4 ∈ {0, 1}.
- x² + y² mod 4 ∈ {0, 1, 2}.
- 4z + 3 mod 4 = 3.
- 3 ∉ {0, 1, 2}. → **Vô nghiệm**. □

⟶ Kỹ thuật "**modular arithmetic argument**" — kinh điển.

---

## 7. So sánh các phương pháp

| Phương pháp | Khi dùng | Ưu điểm |
|-------------|----------|---------|
| Trực tiếp | P → Q rõ ràng | Đơn giản, sạch |
| Phản đảo | ¬Q → ¬P dễ hơn | Đôi khi cứu cánh |
| Phản chứng | Mệnh đề phủ định, "không tồn tại" | Mạnh, đa năng |
| Xây dựng | "Tồn tại" | Cho ví dụ cụ thể |
| Quy nạp | Mệnh đề về ℕ | Bài bản |

💡 **Quy tắc thực hành**:
1. Đọc kỹ mệnh đề. Đó là P → Q? ∃? ∀? Phủ định?
2. Thử trực tiếp.
3. Nếu khó: thử phản đảo / phản chứng.
4. Nếu về ℕ: quy nạp.
5. Nếu là ∃: cố tìm 1 ví dụ.

---

## 8. Bài tập

### Bài tập

**Bài 1**: CM tổng 2 số nguyên tố lẻ là chẵn (chứng minh trực tiếp).

**Bài 2**: CM nếu 3 | n² thì 3 | n (phản đảo).

**Bài 3**: CM √3 vô tỉ (phản chứng).

**Bài 4**: PT x² + y² = 4n + 3 vô nghiệm (modular).

**Bài 5**: CM tồn tại 2 số vô tỉ a, b sao cho a^b hữu tỉ. (Khó: chứng minh tồn tại không cần ví dụ cụ thể.)

### Lời giải

**Bài 1**: a, b nguyên tố lẻ → a = 2k+1, b = 2m+1 → a+b = 2(k+m+1) → chẵn. □

**Bài 2**: Phản đảo: nếu 3 ∤ n thì 3 ∤ n².  
- n không chia hết 3 → n ≡ 1 hoặc 2 (mod 3).  
- n² ≡ 1² = 1 hoặc 2² = 4 ≡ 1 (mod 3).  
- → n² ≢ 0 (mod 3) → 3 ∤ n². □

**Bài 3**: Tương tự √2. Giả sử √3 = a/b tối giản → 3b² = a² → 3 | a² → 3 | a → a = 3c → 3b² = 9c² → b² = 3c² → 3 | b. Mâu thuẫn tối giản.

**Bài 4**: x², y² mod 4 ∈ {0, 1} → x² + y² ∈ {0, 1, 2}. 4n+3 mod 4 = 3 ∉ {0,1,2}. □

**Bài 5**: Xét a = √2, b = √2. Xét (√2)^(√2):
- **Trường hợp 1**: (√2)^(√2) hữu tỉ → a = b = √2 (vô tỉ), a^b hữu tỉ. ✓
- **Trường hợp 2**: (√2)^(√2) vô tỉ → đặt a = (√2)^(√2), b = √2.  
  a^b = ((√2)^(√2))^(√2) = (√2)^(√2·√2) = (√2)² = 2 (hữu tỉ). ✓

⟶ 1 trong 2 trường hợp đúng, nên có cặp. Nhưng ta **không biết cặp nào**! Đây là **chứng minh không xây dựng** (non-constructive).

---

## 9. 🎉 HOÀN THÀNH TIER 5 (8/8)!

Tiếp theo: **Tier 6 — Advanced** (Đại số tuyến tính, Calculus đa biến, Xác suất, ODE).

## 📝 Tổng kết Tier 5

1. **Số học**: chia hết, GCD, Euclid, Bezout.
2. **Nguyên tố**: phân tích duy nhất, Fermat nhỏ, Euler.
3. **Tổ hợp**: hoán vị, chỉnh hợp, tổ hợp; Pascal & nhị thức Newton.
4. **Dirichlet & bù trừ**: kỹ thuật đếm cao cấp.
5. **Quy nạp**: chứng minh mệnh đề về ℕ.
6. **Logic & ánh xạ**: mệnh đề, lượng từ, đơn/toàn/song ánh.
7. **5 phương pháp chứng minh**: trực tiếp, phản đảo, phản chứng, quy nạp, xây dựng.

🎉 Đây là **bộ công cụ** cần thiết để học toán nâng cao.
