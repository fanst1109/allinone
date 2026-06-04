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

❓ **Câu hỏi tự nhiên của người đọc**

- *"Dirichlet chỉ nói 'có ít nhất 1 hộp trùng' — nó cho biết HỘP NÀO không?"* **Không**. Đây là sức mạnh và giới hạn: chứng minh **sự tồn tại** mà không chỉ ra cụ thể. Biết "chắc chắn có 2 người cùng tháng sinh" nhưng không biết là tháng nào.
- *"Bài khó thì 'hộp' là gì?"* Mấu chốt là **thiết kế hộp khéo**. Vd "2 số có hiệu chia hết 7": hộp = số dư mod 7 (7 hộp); 8 số → 2 cùng dư → hiệu chia hết 7.

⚠ **Lỗi thường gặp — quên làm tròn LÊN (trần ⌈⌉)**. Công thức là `⌈N/k⌉`, KHÔNG phải `N/k` rồi làm tròn xuống. Phản ví dụ: 30 sinh viên, 12 tháng → `⌈30/12⌉ = ⌈2.5⌉ = 3`, KHÔNG phải 2. Có ít nhất 3 người cùng tháng (nếu chỉ 2/tháng thì tối đa 24 < 30 người).

🔁 **Dừng lại tự kiểm tra**

1. 100 người, 12 tháng. Ít nhất bao nhiêu người cùng tháng?
2. Chọn 5 số bất kỳ từ {1,...,8}. Vì sao chắc chắn có 2 số tổng bằng 9?

<details><summary>Đáp án</summary>

1. `⌈100/12⌉ = ⌈8.33⌉ = 9` người.
2. Hộp = cặp tổng 9: {1,8},{2,7},{3,6},{4,5} (4 hộp). Chọn 5 số → 2 cùng 1 hộp → tổng 9.

</details>

### 📝 Tóm tắt mục 1

- Dirichlet: N vật vào k hộp → 1 hộp có ≥ `⌈N/k⌉` vật (nhớ làm tròn LÊN).
- Chứng minh **tồn tại** mà không chỉ ra cụ thể.
- Khó hay dễ tùy việc **thiết kế hộp** thông minh.

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

🔁 **Dừng lại tự kiểm tra**

1. Trong 50 người, chắc chắn có ít nhất bao nhiêu người cùng tháng sinh?
2. Trong 8 số nguyên bất kỳ, vì sao có 2 số cùng số dư khi chia 7?

<details><summary>Đáp án</summary>

1. `⌈50/12⌉ = ⌈4.17⌉ = 5` người.
2. 7 lớp dư (0..6) là 7 hộp; 8 số → `⌈8/7⌉ = 2` → có 2 số cùng số dư.

</details>

### 📝 Tóm tắt mục 2

- Áp dụng Dirichlet = chọn đúng "vật" và "hộp".
- Bài bắt tay: loại 0 và n−1 không cùng tồn tại → còn n−1 giá trị cho n người → trùng.
- Cùng số dư mod m = "hộp theo lớp đồng dư".

---

## 3. Nguyên lý bù trừ (Inclusion-Exclusion)

💡 **Trực giác / Hình dung**: đếm số người trong 2 câu lạc bộ chồng nhau. Nếu cộng thẳng sĩ số 2 CLB, người ở **cả hai** bị đếm 2 lần → phải **trừ đi 1 lần** phần chung. Với 3 CLB: cộng đơn, trừ các giao đôi (đã trừ quá tay phần giao ba), nên cộng lại giao ba. Đó là "bù qua, trừ lại" — inclusion-exclusion.

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

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao giao ba lại CỘNG (+), không trừ?"* Phần tử thuộc cả A, B, C: được cộng 3 lần (qua |A|,|B|,|C|), rồi trừ 3 lần (qua 3 giao đôi) → còn 0 → bị "mất". Phải cộng lại 1 lần để nó được đếm đúng 1.
- *"Dấu tổng quát theo quy luật nào?"* Giao của k tập mang dấu `(−1)^(k+1)`: 1 tập (+), 2 tập (−), 3 tập (+), 4 tập (−)...

⚠ **Lỗi thường gặp — quên trừ phần giao, đếm trùng**. Phản ví dụ: lớp có 18 thích toán + 15 thích lý, nếu cộng `18+15 = 33` thì SAI (lớp chỉ 30 người!). Phần "thích cả 2" (8 người) bị đếm 2 lần → đáp án đúng `33 − 8 = 25`.

🔁 **Dừng lại tự kiểm tra**

1. 60 người: 35 biết tiếng Anh, 25 biết tiếng Pháp, 10 biết cả hai. Bao nhiêu người biết ít nhất 1 thứ tiếng? Không biết thứ nào?
2. Số từ 1–30 chia hết cho 2 hoặc 3?

<details><summary>Đáp án</summary>

1. `35+25−10 = 50` biết ít nhất 1; `60−50 = 10` không biết gì.
2. Bội 2: 15. Bội 3: 10. Bội 6: 5. → `15+10−5 = 20`.

</details>

### 📝 Tóm tắt mục 3

- 2 tập: `|A∪B| = |A|+|B|−|A∩B|`.
- 3 tập: cộng đơn, trừ đôi, cộng ba.
- n tập: dấu xen kẽ `(−1)^(k+1)` theo số tập giao. Quên trừ giao → đếm trùng.

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

💡 **Trực giác / Hình dung**: đếm số coprime với n = đếm tất cả rồi **loại** các số chung thừa số với n. "Loại bội của p" và "loại bội của q" sẽ trùng phần "bội của pq" → bù trừ. Đây chính là I-E áp dụng vào lý thuyết số.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao công thức φ ra `(p−1)(q−1)` cho n = pq?"* `φ(pq) = pq − p − q + 1 = (p−1)(q−1)`. Verify n = 15 = 3·5: `(3−1)(5−1) = 8`; liệt kê coprime với 15: 1,2,4,7,8,11,13,14 → đúng 8 số ✓.
- *"Liên hệ với L02 chỗ nào?"* Cùng công thức `φ(n) = n∏(1−1/pᵢ)`, nhưng ở đây ta **chứng minh** nó bằng bù trừ thay vì chỉ phát biểu.

⚠ **Lỗi thường gặp**: dùng `(p−1)(q−1)` khi p, q KHÔNG phân biệt hoặc n có mũ. Phản ví dụ: `φ(12) ≠ (2−1)(... )` ngây thơ — phải `12·(1−1/2)·(1−1/3) = 4` (12 = 2²·3, chỉ nhân theo nguyên tố phân biệt 2 và 3).

🔁 **Dừng lại tự kiểm tra**

1. `φ(20) = ?` (20 = 2²·5).
2. Đếm số ≤ 10 coprime với 10, đối chiếu `φ(10)`.

<details><summary>Đáp án</summary>

1. `20·(1−1/2)·(1−1/5) = 20·(1/2)·(4/5) = 8`.
2. Coprime với 10: 1,3,7,9 → 4 số = `φ(10) = 10·(1/2)·(4/5) = 4` ✓.

</details>

### 📝 Tóm tắt mục 4

- `φ(n)` đếm số ≤ n coprime với n; tính bằng bù trừ (loại bội từng nguyên tố).
- `φ(pq) = (p−1)(q−1)` cho p, q nguyên tố phân biệt.
- Công thức tổng: `φ(n) = n∏(1−1/pᵢ)`, dùng nguyên tố **phân biệt**.

---

## 5. Bài toán Derangement (Hoán vị không điểm cố định)

💡 **Trực giác / Hình dung**: bạn say rượu bỏ n lá thư vào n phong bì hoàn toàn ngẫu nhiên. Xác suất KHÔNG lá nào về đúng phong bì là bao nhiêu? Trực giác sai lầm là "n càng lớn càng khó về 0%", nhưng thực ra tỉ lệ ổn định quanh **36.8% (1/e)** — gần như không phụ thuộc n. Đó là sự bất ngờ của derangement.

🎯 **Bài toán**: Có n bức thư + n phong bì có địa chỉ tương ứng. Bao nhiêu cách bỏ thư vào phong bì sao cho **không có thư nào đúng phong bì**?

Ký hiệu D_n.

Dùng bù trừ:
```
D_n = n! · Σ_{k=0}^{n} (-1)^k / k!
   ≈ n! / e (khi n lớn)
```

**4 ví dụ số đa dạng**:
- `D_1 = 0` (1 thư phải vào đúng phong bì → không có derangement).
- `D_2 = 1` (chỉ cách hoán đổi 2 lá).
- `D_3 = 6·(1−1+1/2−1/6) = 6·(2/6) = 2`.
- `D_4 = 24·(1−1+1/2−1/6+1/24) = 24·9/24 = 9`.

⟶ Tỉ lệ "không khớp" hội tụ về **1/e ≈ 36.8%** khi n lớn — bất ngờ!

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao dùng bù trừ ở đây?"* Đặt Aᵢ = "thư i về đúng phong bì". Ta muốn đếm hoán vị TRÁNH mọi Aᵢ → `n! − |A₁∪...∪Aₙ|`, mà hợp này tính bằng I-E → ra công thức dấu xen kẽ.
- *"Vì sao kết quả gần `n!/e`?"* Vì `Σ(−1)^k/k!` chính là khai triển Taylor của `e⁻¹`. Khi n → ∞, tổng → 1/e ≈ 0.3679.

⚠ **Lỗi thường gặp**: tưởng `D_n` tăng tỉ lệ giảm dần về 0% khi n lớn. SAI — tỉ lệ derangement `D_n/n!` hội tụ về 1/e ≈ 36.8%, KHÔNG về 0. Phản ví dụ: `D_4/4! = 9/24 = 37.5%`, `D_5/5! = 44/120 = 36.7%` — ổn định quanh 37%.

🔁 **Dừng lại tự kiểm tra**

1. `D_5 = ?`
2. 3 người ngẫu nhiên nhận lại 3 chiếc mũ. Xác suất không ai nhận đúng mũ mình?

<details><summary>Đáp án</summary>

1. `D_5 = 120·(1−1+1/2−1/6+1/24−1/120) = 120·44/120 = 44`.
2. `D_3/3! = 2/6 = 1/3 ≈ 33.3%`.

</details>

### 📝 Tóm tắt mục 5

- Derangement D_n = hoán vị không phần tử nào ở đúng chỗ; tính bằng bù trừ.
- `D_n = n!·Σ(−1)^k/k! ≈ n!/e`.
- Tỉ lệ `D_n/n! → 1/e ≈ 36.8%` (không về 0!).

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
