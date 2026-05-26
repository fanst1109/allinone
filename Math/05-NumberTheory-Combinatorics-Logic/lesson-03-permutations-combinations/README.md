# Lesson 03 — Hoán vị & Tổ hợp

## Mục tiêu

- Hiểu **quy tắc cộng, nhân** đếm.
- **Hoán vị** (permutation), **chỉnh hợp**, **tổ hợp** (combination).
- Phân biệt: thứ tự có quan trọng không? có lặp không?
- Áp dụng vào xác suất.

## Kiến thức tiền đề

- Đại số cơ bản.

---

## 1. Hai quy tắc đếm cơ bản

### 1.1. Quy tắc cộng (OR)
Nếu A có m cách và B có n cách, **A hoặc B** (không trùng) có **m + n** cách.

### 1.2. Quy tắc nhân (AND)
Nếu A có m cách và B có n cách, **A rồi B** có **m · n** cách.

**Ví dụ**: 1 menu có 3 món chính + 4 món tráng miệng. Bao nhiêu cách chọn 1 bộ "chính + tráng"? → **3·4 = 12** cách (nhân).

---

## 2. Hoán vị (Permutation) — Sắp xếp tất cả

**Định nghĩa**: Hoán vị của n phần tử = số cách sắp xếp tất cả n phần tử thành dãy có thứ tự.

```
P(n) = n! = n·(n-1)·(n-2)·...·2·1
```

**Ví dụ**: Sắp 5 cuốn sách lên kệ. Số cách = 5! = **120**.

**Giải thích**: vị trí 1 có 5 cách, vị trí 2 có 4 (còn 4 sách), ..., vị trí 5 có 1. Nhân lại: 5·4·3·2·1.

### Quy ước
**0! = 1** (chỉ có 1 cách "không sắp xếp gì": dãy rỗng).

---

## 3. Chỉnh hợp (Permutation k of n) — Sắp xếp k trong n

**Định nghĩa**: Chọn k phần tử từ n và **sắp xếp** chúng. Thứ tự quan trọng.

```
A(n, k) = n! / (n-k)! = n·(n-1)·...·(n-k+1)
```

**Ví dụ**: Có 10 vận động viên, trao huy chương vàng/bạc/đồng. Số cách = A(10, 3) = 10·9·8 = **720**.

⟶ Thứ tự khác nhau (V-B-Đ khác B-V-Đ) → chỉnh hợp.

---

## 4. Tổ hợp (Combination) — Chọn k trong n

**Định nghĩa**: Chọn k phần tử từ n, **không quan tâm thứ tự**.

```
C(n, k) = n! / (k!·(n-k)!) = A(n,k) / k!
```

Ký hiệu khác: **(n choose k)** hoặc nCk hoặc C^k_n.

**Ví dụ**: Chọn 3 trong 10 bạn vào ban điều hành (không phân chức vụ). C(10, 3) = 10!/(3!·7!) = 720/6 = **120**.

⟶ So với chỉnh hợp (720), tổ hợp ít hơn k! lần (vì các thứ tự khác nhau gộp thành 1).

### Tính chất

- C(n, 0) = C(n, n) = 1.
- C(n, k) = C(n, n-k) (đối xứng).
- C(n, k) = C(n-1, k-1) + C(n-1, k) (công thức Pascal).

**Ví dụ Pascal**: C(5, 2) = C(4, 1) + C(4, 2) = 4 + 6 = **10**.

---

## 5. Tóm tắt — Phân biệt 4 trường hợp

| Trường hợp | Thứ tự? | Lặp? | Công thức |
|------------|---------|------|-----------|
| Hoán vị | Có | Không | n! |
| Chỉnh hợp | Có | Không | A(n,k) = n!/(n-k)! |
| Tổ hợp | Không | Không | C(n,k) = n!/(k!(n-k)!) |
| Chỉnh hợp lặp | Có | Có | n^k |
| Tổ hợp lặp | Không | Có | C(n+k-1, k) |

**Mẹo nhớ**:
- "Sắp xếp" → có thứ tự → hoán vị/chỉnh hợp.
- "Chọn nhóm" → không thứ tự → tổ hợp.

---

## 6. Ví dụ ứng dụng

### 6.1. Mật khẩu

Mật khẩu 4 chữ số (0-9), cho phép lặp: **10^4 = 10,000** mật khẩu.

Mật khẩu 4 chữ số khác nhau: **A(10, 4) = 5,040**.

### 6.2. Xổ số

Vietlott 6/45: chọn 6 số trong 45. C(45, 6) = **8,145,060** cách. Xác suất trúng = 1/8M ≈ 1.2·10⁻⁷.

### 6.3. Xếp lịch

10 người, chọn 3 vào "vai trò khác nhau" (chủ tịch, thư ký, kế toán): A(10, 3) = **720**.

10 người, chọn 3 vào "ban kiểm tra" (vai trò như nhau): C(10, 3) = **120**.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Một biển số xe gồm 4 chữ số (cho phép lặp). Bao nhiêu biển số?

**Bài 2**: Có 8 người, chọn 5 vào hội đồng (không phân vai). Số cách?

**Bài 3**: Sắp 7 cuốn sách lên kệ (1 hàng). Bao nhiêu cách?

**Bài 4**: Từ 30 sinh viên, chọn lớp trưởng + lớp phó (khác nhau). Số cách?

**Bài 5**: Tính C(10, 4) và C(10, 6). So sánh.

### Lời giải

**Bài 1**: 10^4 = **10,000**.

**Bài 2**: C(8, 5) = 56.

**Bài 3**: 7! = **5,040**.

**Bài 4**: A(30, 2) = 30·29 = **870**.

**Bài 5**: C(10, 4) = 210, C(10, 6) = 210. **Bằng nhau** (tính chất đối xứng C(n,k) = C(n,n-k)).

---

## 8. Bài tiếp theo

[Lesson 04 — Nhị thức Newton & Pascal](../lesson-04-binomial-pascal/).

## 📝 Tổng kết

1. **Cộng (OR)**, **Nhân (AND)** — 2 quy tắc đếm cốt lõi.
2. **Hoán vị** n! — sắp toàn bộ. **Chỉnh hợp** A(n,k) — chọn + sắp k. **Tổ hợp** C(n,k) — chỉ chọn.
3. **C(n,k) = A(n,k)/k!** — không quan tâm thứ tự thì chia cho k! cách sắp.
4. **Đối xứng**: C(n,k) = C(n,n-k). **Pascal**: C(n,k) = C(n-1,k-1) + C(n-1,k).
5. **Ứng dụng**: mật khẩu, xổ số, xếp lịch, xác suất.
