# Lesson 04 — Nhị thức Newton & Tam giác Pascal

## Mục tiêu

- Hiểu **nhị thức Newton**: (a + b)^n = Σ C(n,k)·a^(n-k)·b^k.
- Đọc tam giác Pascal — quan hệ với C(n, k).
- Áp dụng vào tính nhanh và đồng nhất thức.

## Kiến thức tiền đề

- [Lesson 03 — Tổ hợp](../lesson-03-permutations-combinations/).

---

## 1. Nhị thức Newton (Binomial Theorem)

🎯 **Phát biểu**:
```
(a + b)^n = Σ_{k=0}^{n} C(n, k)·a^(n-k)·b^k
         = C(n,0)·a^n + C(n,1)·a^(n-1)·b + ... + C(n,n)·b^n
```

💡 **Ví dụ n = 3**:
```
(a + b)³ = C(3,0)a³ + C(3,1)a²b + C(3,2)ab² + C(3,3)b³
        = a³ + 3a²b + 3ab² + b³
```

**Tổng quát n = 4**: (a+b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴.

❓ **Vì sao C(n, k) xuất hiện?** Vì khi khai triển (a+b)(a+b)...(a+b) n lần, mỗi số hạng = chọn b từ k thừa số và a từ n-k thừa số. **Có đúng C(n, k) cách chọn**.

---

## 2. Tam giác Pascal

```
Tầng 0:                    1
Tầng 1:                  1   1
Tầng 2:                1   2   1
Tầng 3:              1   3   3   1
Tầng 4:            1   4   6   4   1
Tầng 5:          1   5  10  10   5   1
Tầng 6:        1   6  15  20  15   6   1
```

**Quy tắc**: mỗi số = tổng 2 số phía trên (Pascal).

⟶ **Tầng n** chứa các C(n, 0), C(n, 1), ..., C(n, n).

### Tính chất

| Tính chất | Công thức | Ví dụ |
|-----------|-----------|-------|
| Đối xứng | C(n,k) = C(n, n-k) | C(5,2) = C(5,3) = 10 |
| Pascal | C(n,k) = C(n-1,k-1) + C(n-1,k) | C(5,2) = C(4,1)+C(4,2) = 4+6 |
| Tổng hàng | Σ C(n,k) = 2^n | 1+5+10+10+5+1 = 32 = 2^5 |
| Tổng dấu xen | Σ (-1)^k·C(n,k) = 0 (n≥1) | 1-3+3-1 = 0 |

---

## 3. Ví dụ áp dụng

### 3.1. Tính nhanh (a + b)^n

**Ví dụ**: (x + 2)^5.
- Hệ số: 1, 5, 10, 10, 5, 1.
- = x^5 + 5x^4·2 + 10x^3·4 + 10x^2·8 + 5x·16 + 32.
- = **x^5 + 10x^4 + 40x^3 + 80x^2 + 80x + 32**.

### 3.2. Tìm hệ số cụ thể

**Bài**: Hệ số của x^3 trong khai triển (1 + x)^10.
- C(10, 3) = **120**.

**Bài**: Hệ số của x^4 trong (2x - 3)^7.
- Số hạng tổng quát: C(7, k)·(2x)^(7-k)·(-3)^k.
- Lũy thừa của x là 7-k. Đặt 7-k = 4 → k = 3.
- Hệ số: C(7, 3)·2^4·(-3)^3 = 35·16·(-27) = **-15,120**.

### 3.3. Số tập con

**Câu hỏi**: Tập n phần tử có bao nhiêu tập con?
- Tổng C(n, 0) + C(n, 1) + ... + C(n, n) = **2^n**.

**Ví dụ**: Tập {1, 2, 3, 4} có **2^4 = 16** tập con.

---

## 4. Tổng quát hóa — Khai triển đa thức

**Đa thức (a + b + c)^n** (đa thức tổng quát Newton):
```
(a + b + c)^n = Σ_{i+j+k=n} [n!/(i!·j!·k!)] · a^i·b^j·c^k
```

trong đó **n!/(i!·j!·k!)** = hệ số đa thức (multinomial coefficient).

**Ví dụ**: (a+b+c)² = a² + b² + c² + 2ab + 2bc + 2ca.

---

## 5. Bài tập

### Bài tập

**Bài 1**: Khai triển (x + 1)^6.

**Bài 2**: Tìm hệ số x^5 trong (2x + 1)^8.

**Bài 3**: Tính tổng 1 + 7 + 21 + 35 + 35 + 21 + 7 + 1.

**Bài 4**: Số tập con khác rỗng của tập 5 phần tử.

**Bài 5**: Chứng minh C(n+1, k) = C(n, k-1) + C(n, k) bằng đại số.

### Lời giải

**Bài 1**: Hệ số Pascal tầng 6: 1, 6, 15, 20, 15, 6, 1 → **x^6 + 6x^5 + 15x^4 + 20x^3 + 15x^2 + 6x + 1**.

**Bài 2**: Số hạng tổng quát C(8,k)·(2x)^(8-k). Đặt 8-k = 5 → k = 3. Hệ số = C(8,3)·2^5 = 56·32 = **1,792**.

**Bài 3**: = Σ C(7, k), k=0..7 = **2^7 = 128**.

**Bài 4**: 2^5 - 1 = **31** (trừ tập rỗng).

**Bài 5**:  
- C(n, k-1) + C(n, k) = n!/((k-1)!(n-k+1)!) + n!/(k!(n-k)!).
- Quy đồng k!(n-k+1)!: = n!·k/(k!(n-k+1)!) + n!·(n-k+1)/(k!(n-k+1)!) = n!·(k + n-k+1)/(k!(n-k+1)!) = n!·(n+1)/(k!(n-k+1)!).
- = (n+1)!/(k!(n+1-k)!) = C(n+1, k). □

---

## 6. Bài tiếp theo

[Lesson 05 — Dirichlet & bù trừ](../lesson-05-pigeonhole-inclusion-exclusion/).

## 📝 Tổng kết

1. **Nhị thức Newton**: (a+b)^n = Σ C(n,k)·a^(n-k)·b^k.
2. **Pascal** mỗi số = 2 số phía trên. Tầng n chứa C(n,0)...C(n,n).
3. **Đối xứng**: C(n,k) = C(n,n-k).
4. **Tổng hàng**: Σ C(n,k) = 2^n = số tập con của tập n.
5. **Tìm hệ số** trong khai triển: viết số hạng tổng quát, giải bậc cần tìm.
