// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-01-sequences-limits/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Dãy số & Giới hạn dãy

## Mục tiêu

- Hiểu **dãy số** (sequence) — danh sách số có thứ tự.
- Định nghĩa **giới hạn dãy** một cách trực giác và hình thức (ε-N).
- Quy tắc tính giới hạn: tổng, hiệu, tích, thương.
- Hai giới hạn nổi tiếng: (1 + 1/n)^n → **e**, sin(1/n)/(1/n) → 1.

## Kiến thức tiền đề

- [Tier 1 — Hàm số](../../01-Arithmetic-Algebra/lesson-07-functions-intro/).

---

## 1. Dãy số là gì?

💡 **Trực giác**: Dãy số = một danh sách các số đánh số 1, 2, 3, ... vô hạn.

**Ký hiệu**: (a_n)_{n=1}^∞ hoặc gọn hơn a_n.

**Ví dụ**:
- a_n = 1/n: 1, 1/2, 1/3, 1/4, ... → tiến dần về 0.
- b_n = n²: 1, 4, 9, 16, ... → tăng vô hạn.
- c_n = (-1)^n: -1, 1, -1, 1, ... → dao động.
- d_n = (1 + 1/n)^n: 2, 2.25, 2.37, 2.44, ..., → tiến về **e ≈ 2.718**.

⟶ Câu hỏi: dãy "dẫn về đâu" khi n rất lớn?

---

## 2. Giới hạn dãy — Định nghĩa trực giác

💡 **Là gì**: Số L được gọi là giới hạn của dãy a_n nếu khi n đủ lớn, a_n **gần L tùy ý**.

**Ký hiệu**: \`lim_{n→∞} a_n = L\` hoặc \`a_n → L\`.

**Ví dụ số cụ thể** (a_n = 1/n):
- n=10 → a = 0.1.
- n=100 → a = 0.01.
- n=1000 → a = 0.001.
- n=10⁶ → a = 10⁻⁶.
- ⟶ **lim 1/n = 0**.

❓ **"Đủ gần" nghĩa là gì?** Đáp: với mọi sai số ε > 0 (dù nhỏ), tồn tại N sao cho mọi n ≥ N thì |a_n - L| < ε.

### Định nghĩa hình thức (ε-N) — Cauchy

\`\`\`
lim_{n→∞} a_n = L
⟺
∀ε > 0, ∃N ∈ ℕ, ∀n ≥ N : |a_n - L| < ε
\`\`\`

💡 **Đọc trực giác**: "Cho dù tôi đòi sai số bé đến đâu (ε), bạn luôn tìm được một mốc N để từ N trở đi, dãy nằm trong khoảng (L-ε, L+ε)."

⟶ Đây là **một trong những định nghĩa quan trọng nhất của Toán cấp cao**. Nó làm cho khái niệm "đủ gần" trở nên chính xác, không còn mơ hồ.

> 📐 **Định nghĩa đầy đủ — Giới hạn dãy (ε-N)**
>
> **(a) Là gì**: Phát biểu chính xác bằng logic: cho mọi sai số ε > 0 (dù nhỏ thế nào tùy chọn), TỒN TẠI 1 mốc N sao cho mọi a_n với n ≥ N đều nằm trong khoảng (L−ε, L+ε). "Game" giữa người đòi sai số và người phải đáp ứng.
>
> **(b) Vì sao cần**: Trước Cauchy (~1820), giới hạn được hiểu mơ hồ "tiến gần dần" — không thể chứng minh nghiêm túc. Định nghĩa ε-N biến mơ hồ thành 1 mệnh đề logic kiểm tra được. Đây là **nền tảng toàn bộ Giải tích** — không có nó, không có đạo hàm, tích phân, chuỗi, không gian Banach... Cuộc cách mạng "rigorisation" của Toán thế kỷ 19 bắt đầu từ đây.
>
> **(c) Ví dụ số**: Chứng minh lim 1/n = 0. Cho ε = 0.01: cần |1/n − 0| < 0.01 → n > 100. Chọn N = 101 → mọi n ≥ 101 thoả. Cho ε = 10⁻⁶: cần n > 10⁶. Chọn N = 10⁶+1 thoả. Cho ε bất kỳ > 0: chọn N = ⌈1/ε⌉ + 1 → xong. Vậy lim = 0 ✓. Phản ví dụ: dãy (-1)^n không hội tụ — chọn ε = 0.5, không N nào làm |(-1)^n − L| < 0.5 ∀n≥N (vì dãy nhảy giữa ±1).

---

## 3. Phân loại dãy

| Loại | Ý nghĩa | Ví dụ |
|------|---------|-------|
| **Hội tụ** | lim tồn tại, hữu hạn | 1/n → 0 |
| **Phân kỳ về ±∞** | a_n → ∞ hoặc -∞ | n² → +∞ |
| **Phân kỳ (dao động)** | không có lim | (-1)^n |

---

## 4. Quy tắc tính giới hạn

Cho a_n → A, b_n → B (hữu hạn):

\`\`\`
lim(a_n + b_n) = A + B
lim(a_n - b_n) = A - B
lim(a_n · b_n) = A · B
lim(a_n / b_n) = A / B   (nếu B ≠ 0)
lim(c · a_n) = c · A
\`\`\`

⟶ Giống như "đại số bình thường" — cộng/trừ/nhân/chia tự nhiên.

⚠ **Dạng không xác định** (cần biến đổi):
- ∞ - ∞, 0 · ∞, ∞/∞, 0/0, 1^∞, 0⁰, ∞⁰.

---

## 5. Hai giới hạn nổi tiếng

### 5.1. (1 + 1/n)^n → e

\`\`\`
lim_{n→∞} (1 + 1/n)^n = e ≈ 2.71828...
\`\`\`

**Tính cụ thể**:
- n=1: (1+1)^1 = 2.
- n=10: 1.1^10 ≈ 2.5937.
- n=100: 1.01^100 ≈ 2.7048.
- n=1000: ≈ 2.7169.
- n=10⁶: ≈ 2.71828.

💡 **Vì sao quan trọng**: Định nghĩa số e. Liên quan đến lãi kép, e^x là duy nhất hàm có đạo hàm = chính nó.

### 5.2. sin(x)/x → 1 khi x → 0

(Áp dụng cho dãy x_n → 0):
\`\`\`
lim sin(x)/x = 1   khi x → 0
\`\`\`

**Hệ quả** (dùng nhiều khi tính đạo hàm sin x):
- lim(1 - cos x)/x = 0.
- lim tan(x)/x = 1.

---

## 6. Định lý kẹp (Squeeze Theorem)

Nếu a_n ≤ b_n ≤ c_n và lim a_n = lim c_n = L, thì **lim b_n = L**.

💡 **Trực giác**: Nếu b bị "kẹp" giữa 2 dãy đều dần về L, thì b cũng phải dần về L.

**Ví dụ**: Tính lim sin(n)/n.
- |sin n| ≤ 1 → -1/n ≤ sin(n)/n ≤ 1/n.
- Cả 2 đầu → 0. ⟶ lim sin(n)/n = **0**.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính lim (3n + 5)/(2n - 1).

**Bài 2**: Tính lim (n² + 2)/n³.

**Bài 3**: Tính lim (√(n²+1) - n). (Gợi ý: nhân liên hợp.)

**Bài 4**: Tính lim (1 + 2/n)^n.

**Bài 5**: Dãy a_n = cos(nπ/3)/n. Tính lim a_n.

### Lời giải

**Bài 1**: Chia tử mẫu cho n: lim (3 + 5/n)/(2 - 1/n) = (3+0)/(2-0) = **3/2**.

**Bài 2**: Chia cho n³: lim (1/n + 2/n³) = 0 + 0 = **0**.

**Bài 3**: (√(n²+1) - n)(√(n²+1) + n)/(√(n²+1) + n) = (n²+1 - n²)/(√(n²+1) + n) = 1/(√(n²+1) + n) → 1/(∞+∞) = **0**.

**Bài 4**: (1 + 2/n)^n = [(1 + 1/(n/2))^(n/2)]² → e² ≈ **7.389**.

**Bài 5**: |cos(nπ/3)| ≤ 1 → -1/n ≤ a_n ≤ 1/n → kẹp về **0**.

---

## 8. Bài tiếp theo

[Lesson 02 — Giới hạn hàm & liên tục](../lesson-02-function-limits-continuity/).

## 📝 Tổng kết

1. **Dãy số**: a_n = một số ứng với mỗi n ∈ ℕ.
2. **Giới hạn**: lim a_n = L (∀ε>0, ∃N, ∀n≥N: |a_n - L| < ε).
3. **3 loại dãy**: hội tụ, phân kỳ ±∞, dao động.
4. **(1+1/n)^n → e**, **sin x/x → 1**.
5. **Định lý kẹp** cho dãy phức tạp bị kẹp giữa 2 dãy đơn giản.
`;
