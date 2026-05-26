# Lesson 06 — Quy nạp toán học

## Mục tiêu

- Hiểu **nguyên lý quy nạp toán học** — kỹ thuật chứng minh cốt lõi cho mệnh đề về số tự nhiên.
- Phân biệt **quy nạp yếu** và **quy nạp mạnh**.
- Áp dụng vào: tổng dãy số, bất đẳng thức, chia hết.

## Kiến thức tiền đề

- [Lesson 03 — Tổ hợp](../lesson-03-permutations-combinations/).

---

## 1. Quy nạp là gì?

💡 **Trực giác (domino)**: Có vô số quân domino đặt thẳng hàng. Nếu:
- (1) Quân đầu tiên đổ.
- (2) Mỗi quân đổ làm quân tiếp theo đổ.

Thì **TẤT CẢ quân đều đổ**.

Trong toán: chứng minh P(n) đúng với mọi n ≥ n₀ bằng cách:
1. **Cơ sở**: chứng minh P(n₀) đúng.
2. **Quy nạp**: giả sử P(k) đúng (k ≥ n₀), chứng minh P(k+1) đúng.

---

## 2. Quy nạp yếu — Mẫu chuẩn

🎯 **Nguyên lý**: Cho P(n) là mệnh đề về số tự nhiên n.
1. Cơ sở: P(n₀) đúng (thường n₀ = 0 hoặc 1).
2. Bước quy nạp: ∀k ≥ n₀, P(k) ⟹ P(k+1).

Thì P(n) đúng ∀n ≥ n₀.

> 📐 **Định nghĩa đầy đủ — Quy nạp toán học**
>
> **(a) Là gì**: 1 phương pháp chứng minh mệnh đề P(n) đúng với **vô hạn** số tự nhiên, bằng cách chỉ kiểm tra 2 điều: (1) P(n₀) đúng, (2) P(k) → P(k+1). Khi đó P đúng với mọi n ≥ n₀ — không cần kiểm từng cái.
>
> **(b) Vì sao cần**: Vì có vô hạn số tự nhiên — không thể kiểm tra mọi giá trị. Quy nạp là **cách duy nhất** chứng minh nghiêm túc các mệnh đề "∀n ∈ ℕ, P(n)". Là tiên đề thứ 5 của Peano (định nghĩa ℕ). Áp dụng khắp toán: chứng minh công thức tổng (Σi = n(n+1)/2), bất đẳng thức, chia hết, thuật toán đúng (correctness), đệ quy. Trong CS: chứng minh thuật toán đệ quy đúng (tower of Hanoi, merge sort) bằng quy nạp.
>
> **(c) Ví dụ số**: CM 1+2+...+n = n(n+1)/2. Cơ sở n=1: 1 = 1·2/2 ✓. Quy nạp: giả sử 1+...+k = k(k+1)/2, thì 1+...+k+(k+1) = k(k+1)/2 + (k+1) = (k+1)(k+2)/2 ✓. CM 2^n > n với n ≥ 1: cơ sở 2 > 1 ✓. Quy nạp: 2^k > k → 2^(k+1) = 2·2^k > 2k ≥ k+1 (khi k≥1) ✓. CM n³ + 2n chia hết 3: cơ sở 1+2 = 3 ✓. Quy nạp: (k+1)³+2(k+1) = (k³+2k) + 3(k²+k+1) — cả 2 phần chia hết 3 ✓. **Pitfall**: "Mọi n: n²+n+41 nguyên tố" — đúng n=0..39, SAI tại n=40 (= 41²). Quy nạp không thay được bằng "kiểm vài giá trị".

---

## 3. Ví dụ kinh điển — Tổng 1 + 2 + ... + n = n(n+1)/2

**Bước 1 (cơ sở)**: n = 1.
- VT = 1. VP = 1·2/2 = 1. ✓.

**Bước 2 (quy nạp)**: Giả sử P(k) đúng: 1 + 2 + ... + k = k(k+1)/2.

Cần chứng minh P(k+1): 1 + 2 + ... + k + (k+1) = (k+1)(k+2)/2.

Tính:
```
1 + 2 + ... + k + (k+1)
= k(k+1)/2 + (k+1)             (giả thuyết quy nạp)
= (k+1)·[k/2 + 1]
= (k+1)·(k+2)/2 ✓
```

Vậy P(n) đúng ∀n ≥ 1. □

---

## 4. Ví dụ — Bất đẳng thức 2^n > n (n ≥ 5)

**Cơ sở n = 5**: 2^5 = 32 > 5 ✓.

**Quy nạp**: Giả sử 2^k > k. Cần CM 2^(k+1) > k+1.
- 2^(k+1) = 2·2^k > 2k (giả thuyết).
- 2k = k + k ≥ k + 5 > k + 1 (vì k ≥ 5).
- → 2^(k+1) > k+1 ✓. □

⚠ **Lưu ý**: Phải chọn cơ sở đủ lớn. Ví dụ n = 2: 2^2 = 4 > 2 ✓, n = 3: 8 > 3 ✓, ... thực ra 2^n > n đúng từ n = 1, nhưng nếu bài hỏi n ≥ 5 thì làm theo.

---

## 5. Ví dụ — Chia hết 7 | (8^n - 1)

**Cơ sở n = 1**: 8 - 1 = 7. 7|7 ✓.

**Quy nạp**: Giả sử 7 | (8^k - 1). CM 7 | (8^(k+1) - 1).
- 8^(k+1) - 1 = 8·8^k - 1 = 8·(8^k - 1) + 7.
- 7 | (8^k - 1) (giả thuyết) → 7 | 8·(8^k - 1).
- 7 | 7.
- → 7 | tổng = 8^(k+1) - 1. □

---

## 6. Quy nạp mạnh (Strong Induction)

🎯 **Khác**: Thay vì giả sử chỉ P(k), giả sử P(n₀), P(n₀+1), ..., P(k) **tất cả** đúng.

```
[P(n₀) ∧ P(n₀+1) ∧ ... ∧ P(k)] ⟹ P(k+1)
```

⟶ Dùng khi P(k+1) cần kết quả của nhiều bước trước, không chỉ P(k).

### Ví dụ — Phân tích thừa số nguyên tố

**Mệnh đề**: Mọi n ≥ 2 viết được thành tích các số nguyên tố.

**Cơ sở n = 2**: 2 nguyên tố → biểu diễn là chính nó. ✓.

**Quy nạp (mạnh)**: Giả sử mọi 2 ≤ m ≤ k viết được. CM k+1 viết được.
- Nếu k+1 nguyên tố: xong.
- Nếu k+1 hợp số: k+1 = a·b với 1 < a, b < k+1. Theo giả thuyết, **a** và **b** đều viết được thành tích nguyên tố. → k+1 = (tích của a) · (tích của b) cũng viết được. □

⟶ Đây là **chứng minh định lý cơ bản số học** (L02).

---

## 7. Lỗi thường gặp

### ⚠ Lỗi 1: Quên cơ sở

Nếu chỉ chứng minh bước quy nạp mà không cơ sở, mệnh đề có thể sai!

**Ví dụ sai**: "Mọi số tự nhiên = 1." Giả sử k = 1, k+1 = ... ?  → Cơ sở 0 = 1 đã sai → không thể bắt đầu.

### ⚠ Lỗi 2: "Tất cả ngựa đều cùng màu" (bài toán nổi tiếng)

Mệnh đề sai: "Mọi tập n con ngựa đều cùng màu."  
- n=1 đúng (1 con tự nó cùng màu mình).  
- Giả sử mọi tập k ngựa cùng màu. Tập k+1 ngựa: lấy ra 1 con → còn k → cùng màu A. Lấy ra con khác → cùng màu A. → Cả k+1 cùng màu A.  
- **Lỗi**: khi k = 1 → "lấy ra 1 con" → còn 0 con. 2 tập 0 con không "trùng giao" được → bước k → k+1 sai khi k = 1.

⟶ Bài học: **Kiểm tra bước quy nạp với k nhỏ nhất**.

---

## 8. Bài tập

### Bài tập

**Bài 1**: CM 1² + 2² + ... + n² = n(n+1)(2n+1)/6.

**Bài 2**: CM 3 | (n³ - n) với mọi n ≥ 0.

**Bài 3**: CM dãy Fibonacci F_n ≤ 2^n.

**Bài 4**: CM 1 + 2 + 4 + ... + 2^n = 2^(n+1) - 1.

**Bài 5**: Sai ở đâu trong "chứng minh" sau? Mệnh đề: n^2 + n + 41 là số nguyên tố ∀n ≥ 0. Cơ sở n=0: 41 nguyên tố ✓. n=1: 43 ✓. n=2: 47 ✓. ... → "Đúng ∀n".

### Lời giải

**Bài 1**: Cơ sở n=1: 1 = 1·2·3/6 = 1 ✓.  
Bước: giả sử Σ_{i=1}^k i² = k(k+1)(2k+1)/6. CM Σ_{i=1}^{k+1} i² = (k+1)(k+2)(2k+3)/6.  
LHS = k(k+1)(2k+1)/6 + (k+1)² = (k+1)[k(2k+1)/6 + (k+1)] = (k+1)·(2k²+k+6k+6)/6 = (k+1)·(2k²+7k+6)/6 = (k+1)(k+2)(2k+3)/6 ✓.

**Bài 2**: n³ - n = n(n-1)(n+1). 3 số liên tiếp → có 1 số ⋮ 3.

**Bài 3**: F_1 = 1 ≤ 2 ✓, F_2 = 1 ≤ 4. Quy nạp mạnh: F_{k+1} = F_k + F_{k-1} ≤ 2^k + 2^{k-1} = 3·2^{k-1} ≤ 2·2^k = 2^{k+1}. □

**Bài 4**: Cơ sở n=0: 1 = 2-1 ✓. Bước: giả sử = 2^(k+1)-1. Thêm 2^(k+1): = 2^(k+1)-1+2^(k+1) = 2·2^(k+1)-1 = 2^(k+2)-1 ✓.

**Bài 5**: **Không** kiểm tra mọi n — chỉ kiểm tra vài giá trị không phải quy nạp! Thực tế n=40: 40²+40+41 = 1681 = 41². → KHÔNG nguyên tố. Mệnh đề sai. "Quan sát vài trường hợp" ≠ chứng minh.

---

## 9. Bài tiếp theo

[Lesson 07 — Logic, tập hợp, ánh xạ](../lesson-07-logic-sets-maps/).

## 📝 Tổng kết

1. **Quy nạp** = domino: cơ sở P(n₀) + bước P(k)→P(k+1).
2. **Quy nạp mạnh**: giả sử P(n₀)..P(k) cùng đúng. Dùng cho phân tích, đệ quy phức tạp.
3. **Lỗi phổ biến**: quên cơ sở; bước k→k+1 không đúng khi k nhỏ.
4. Kiểm tra vài giá trị **không** thay được chứng minh quy nạp.
