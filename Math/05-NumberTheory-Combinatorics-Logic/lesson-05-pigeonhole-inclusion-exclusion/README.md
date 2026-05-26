# Lesson 05 — Nguyên lý Dirichlet & Nguyên lý bù trừ

## Mục tiêu

- Hiểu **Nguyên lý Dirichlet (Pigeonhole)** — "đơn giản nhưng mạnh mẽ".
- **Nguyên lý bù trừ (Inclusion-Exclusion)** cho hợp 2, 3, n tập.
- Áp dụng đếm trong các bài toán phức tạp.

## Kiến thức tiền đề

- [Lesson 03 — Tổ hợp](../lesson-03-permutations-combinations/).

---

## 1. Nguyên lý Dirichlet (Pigeonhole Principle)

💡 **Trực giác (hình ảnh chim bồ câu)**: Có 10 chuồng và 11 con chim. Nhất định có ít nhất 1 chuồng chứa ≥ 2 con.

### Phát biểu hình thức

**Dạng cơ bản**: Đặt n+1 vật vào n hộp → ít nhất 1 hộp có ≥ 2 vật.

**Dạng tổng quát**: Đặt N vật vào k hộp → ít nhất 1 hộp có ≥ ⌈N/k⌉ vật.

> 📐 **Định nghĩa đầy đủ — Nguyên lý Dirichlet**
>
> **(a) Là gì**: 1 phát biểu cực kỳ đơn giản: "không thể nhét nhiều vật hơn số hộp mà KHÔNG có 2 vật cùng hộp". Hình thức: hàm f: A → B với |A| > |B| → f không thể đơn ánh.
>
> **(b) Vì sao cần**: Tưởng quá hiển nhiên nhưng cực kỳ mạnh — dùng để chứng minh **sự tồn tại** mà không cần xây dựng. Ví dụ: 367 người, có ít nhất 2 trùng ngày sinh (366 ngày trong 1 năm). Trong 8 chữ số bất kỳ → có 2 số có hiệu chia hết cho 7. Trong 1 nhóm n người → ít nhất 2 người có cùng số bạn bè. Nhiều định lý sâu (Erdős-Ko-Rado, Schur) dựa trên pigeonhole.
>
> **(c) Ví dụ số**: 30 sinh viên, 12 tháng: ⌈30/12⌉ = **3** → ít nhất 3 cùng tháng. 5 điểm trong tam giác đều cạnh 2 → ít nhất 2 điểm cách nhau ≤ 1 (chia tam giác thành 4 tam giác nhỏ, pigeonhole → 2 điểm cùng tam giác con). 100 số nguyên dương ≤ 200 → có 2 số là bội nhau (chia thành 100 hộp dạng {1,2,4,...}, {3,6,12,...}). Trong 13 số chia 12 → 2 có cùng số dư.

---

## 2. Ví dụ áp dụng Dirichlet

### Ví dụ 1 — Sinh nhật

Trong 1 lớp 30 người, chứng minh có ít nhất 2 người sinh cùng tháng.
- 12 tháng (hộp) + 30 người (vật) → ⌈30/12⌉ = 3 người cùng tháng (ít nhất).

### Ví dụ 2 — Bắt tay

Tại 1 buổi tiệc n người, chứng minh ít nhất 2 người có cùng số người đã bắt tay.
- Số bắt tay của mỗi người ∈ {0, 1, ..., n-1} (n giá trị).
- Nhưng 0 và n-1 không cùng tồn tại (nếu có người không bắt tay ai thì không thể có người bắt tay tất cả).
- → Chỉ có n-1 giá trị thực sự xảy ra cho n người → Dirichlet → 2 người trùng. □

### Ví dụ 3 — Số

Trong 13 số nguyên bất kỳ, ít nhất 2 số có cùng số dư khi chia 12.
- 12 lớp dư (0, 1, ..., 11) → 13 số → ⌈13/12⌉ = 2.

⟶ Đây là cách chứng minh Fermat nhỏ bằng Pigeonhole!

---

## 3. Nguyên lý bù trừ (Inclusion-Exclusion)

### 3.1. Hai tập

```
|A ∪ B| = |A| + |B| - |A ∩ B|
```

💡 **Vì sao**: Cộng |A| + |B| đếm phần chung 2 lần → trừ 1 lần.

**Ví dụ**: Trong lớp 30 người, 18 thích toán, 15 thích vật lý, 8 thích cả 2. Hỏi bao nhiêu người thích ít nhất 1 môn?
- |T ∪ L| = 18 + 15 - 8 = **25**.
- Không thích môn nào = 30 - 25 = 5.

### 3.2. Ba tập

```
|A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B| - |B∩C| - |A∩C| + |A∩B∩C|
```

💡 **Quy luật**: Cộng đơn, trừ đôi, cộng ba, ...

**Ví dụ**: 100 sinh viên, 40 học Toán, 30 Lý, 25 Hóa. 15 học Toán+Lý, 10 Lý+Hóa, 12 Toán+Hóa, 5 cả 3. Số học ít nhất 1 môn?
- = 40+30+25 - 15-10-12 + 5 = **63**.

### 3.3. n tập (tổng quát)

```
|A₁ ∪ ... ∪ Aₙ| = Σ |Aᵢ| - Σ |Aᵢ ∩ Aⱼ| + Σ |Aᵢ ∩ Aⱼ ∩ Aₖ| - ...
```

(Dấu xen kẽ +/-, theo kích thước tập giao.)

---

## 4. Áp dụng — Hàm Euler φ(n) bằng bù trừ

Đếm số nguyên 1 ≤ k ≤ n và coprime với n.

Nếu n = p·q (2 nguyên tố khác nhau):
- Tổng = n.
- Bội của p: n/p.
- Bội của q: n/q.
- Bội của p và q (= pq): 1.
- → φ(n) = n - n/p - n/q + 1 = (p-1)(q-1).

Tổng quát: nếu n = p₁^a₁·...·pₖ^aₖ thì
```
φ(n) = n · ∏ (1 - 1/pᵢ)
```

---

## 5. Bài toán Derangement (Hoán vị không điểm cố định)

🎯 **Bài toán**: Có n bức thư + n phong bì có địa chỉ tương ứng. Bao nhiêu cách bỏ thư vào phong bì sao cho **không có thư nào đúng phong bì**?

Ký hiệu D_n.

Dùng bù trừ:
```
D_n = n! · Σ_{k=0}^{n} (-1)^k / k!
   ≈ n! / e (khi n lớn)
```

**Ví dụ**: D_4 = 24·(1 - 1 + 1/2 - 1/6 + 1/24) = 24·9/24 = **9**.

⟶ Tỉ lệ "không khớp" hội tụ về **1/e ≈ 36.8%** khi n lớn — bất ngờ!

---

## 6. Bài tập

### Bài tập

**Bài 1**: 25 người, có cùng tháng sinh? Chứng minh.

**Bài 2**: Lớp 50 người, 30 chơi bóng đá, 25 chơi bóng rổ, 10 cả 2. Số chơi ít nhất 1 môn? Không chơi gì?

**Bài 3**: Bao nhiêu số từ 1-100 chia hết cho 2 hoặc 3 hoặc 5?

**Bài 4**: D_5 = ?

**Bài 5**: Chứng minh trong 367 người, có 2 người cùng ngày sinh.

### Lời giải

**Bài 1**: 12 tháng, 25 người. ⌈25/12⌉ = 3 → có **3 người** cùng tháng.

**Bài 2**: |A∪B| = 30+25-10 = **45**. Không chơi gì = 50-45 = 5.

**Bài 3**: Tổng các bội ≤ 100:  
- Bội 2: 50. Bội 3: 33. Bội 5: 20.  
- Bội 6: 16. Bội 10: 10. Bội 15: 6.  
- Bội 30: 3.  
- = 50+33+20 - 16-10-6 + 3 = **74**.

**Bài 4**: D_5 = 120·(1 - 1 + 1/2 - 1/6 + 1/24 - 1/120) = 120·44/120 = **44**.

**Bài 5**: 366 ngày trong năm (tính nhuận). 367 người > 366 → Dirichlet → 2 người cùng ngày. □

---

## 7. Bài tiếp theo

[Lesson 06 — Quy nạp toán học](../lesson-06-induction/).

## 📝 Tổng kết

1. **Dirichlet**: n+1 vật, n hộp → có ≥ 2 vật cùng hộp. Tổng quát: ⌈N/k⌉.
2. **Bù trừ 2 tập**: |A∪B| = |A|+|B|-|A∩B|.
3. **Bù trừ 3 tập**: cộng đơn, trừ đôi, cộng ba.
4. **Áp dụng**: φ(n) qua bù trừ; Derangement D_n.
5. **Sức mạnh**: chứng minh sự tồn tại mà không xây dựng được ví dụ.
