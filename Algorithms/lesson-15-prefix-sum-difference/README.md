# Lesson 15 — Prefix Sum & Difference Array

> **Tier 2 — Tìm kiếm & kỹ thuật cốt lõi.** Kỹ thuật tiền xử lý (precompute) biến truy vấn tổng đoạn từ O(n) mỗi lần xuống O(1) mỗi lần, và biến cập nhật một đoạn từ O(n) xuống O(1).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **prefix sum (tổng tiền tố)** 1D: xây mảng `P` để trả lời range sum query trong O(1).
- Nắm **difference array (mảng hiệu)** — kỹ thuật "ngược" của prefix sum — để cập nhật một đoạn `[l, r]` trong O(1) rồi dựng lại mảng cuối bằng prefix.
- Mở rộng prefix sum lên **2D** với inclusion-exclusion (bù trừ) để truy vấn tổng vùng chữ nhật.
- Kết hợp prefix sum với **hash map** đếm subarray có tổng bằng `k`.
- Biết các biến thể: **prefix XOR, prefix product, prefix max** và khi nào dùng cái nào.
- Phân biệt rõ: khi nào dùng prefix/difference (mảng tĩnh, query/update offline) vs khi nào phải nâng cấp lên Fenwick / segment tree (update + query xen kẽ).

## Kiến thức tiền đề

- [Lesson 13 — Two Pointers](../lesson-13-two-pointers/) và [Lesson 14 — Sliding Window](../lesson-14-sliding-window/): cũng là kỹ thuật xử lý mảng tuyến tính; sliding window xử lý cửa sổ **liền kề**, còn prefix sum cho phép hỏi **bất kỳ đoạn nào** trong O(1).
- [Lesson 16 — Hashing](../lesson-16-hashing-techniques/): mục 5 (subarray sum = k) dùng hash map; sẽ học kỹ hash ở Lesson 16.
- [Lesson 01 — Big-O](../lesson-01-bigo-asymptotic/): để so sánh O(qn) brute-force vs O(n + q) sau precompute.
- Nếu cần update + query **xen kẽ** real-time → cấu trúc cây: [DataStructures — Fenwick / Segment Tree](../../DataStructures/index.html).

---

## 1. Vấn đề: trả lời nhiều range sum query

> **💡 Trực giác.** Hình dung bạn có một dãy doanh thu 365 ngày trong năm. Sếp hỏi liên tục: "tổng doanh thu từ ngày 50 đến 120?", "từ 200 đến 240?"... mỗi câu hỏi nếu cộng lại từ đầu thì tốn công. Thay vào đó bạn ghi sẵn một sổ cái: "tổng dồn từ đầu năm đến hết ngày X". Khi đó tổng đoạn `[l, r]` = (dồn đến `r`) − (dồn đến `l−1`) — chỉ một phép trừ.

Cho mảng `a` có `n` phần tử và `q` truy vấn, mỗi truy vấn `(l, r)` hỏi tổng `a[l] + a[l+1] + ... + a[r]`.

**Cách brute-force**: mỗi query cộng dồn từ `l` đến `r`.

```go
// Brute-force: O(n) mỗi query → tổng O(q·n)
func rangeSumBrute(a []int, l, r int) int {
    s := 0
    for i := l; i <= r; i++ {
        s += a[i]
    }
    return s
}
```

Với `n = 10^5` và `q = 10^5`, tổng chi phí `q·n = 10^{10}` phép cộng — quá chậm (vài chục giây).

**Ý tưởng tiền xử lý (precompute)**: bỏ một lần O(n) để dựng mảng `P` các tổng tiền tố. Sau đó **mỗi** query chỉ tốn O(1):

| Cách | Tiền xử lý | Mỗi query | Tổng `q` query |
|------|-----------|-----------|----------------|
| Brute-force | 0 | O(n) | **O(q·n)** |
| Prefix sum | O(n) | O(1) | **O(n + q)** |

Với `n = q = 10^5`: brute `~10^{10}` vs prefix `~2·10^5` → nhanh hơn ~50000 lần.

> **❓ Câu hỏi tự nhiên của người đọc.**
> - *"Precompute có đáng không nếu chỉ 1 query?"* — Không. Nếu chỉ hỏi 1 lần thì O(n) brute đã tối ưu. Prefix sum thắng khi **số query lớn** (amortize chi phí dựng `P` qua nhiều query).
> - *"Mảng có thay đổi giữa chừng không?"* — Prefix sum giả định mảng **tĩnh** (immutable). Nếu `a` bị sửa, phải dựng lại `P` (O(n)). Update + query xen kẽ → xem mục 8.

📝 **Tóm tắt mục 1**
- Nhiều range sum query trên mảng tĩnh → đừng cộng lại mỗi lần.
- Bỏ O(n) tiền xử lý một lần, đổi lấy O(1) mỗi query.
- Tổng O(n + q) thay vì O(q·n).

---

## 2. Prefix sum 1D

> **💡 Trực giác.** `P[i]` = "tổng dồn của tất cả phần tử **trước** vị trí `i`". `P[0] = 0` (chưa cộng gì), `P[1] = a[0]`, `P[2] = a[0]+a[1]`, ... Đây chính là "sổ cái dồn" ở mục 1.

### 2.1 Định nghĩa và công thức

Định nghĩa `P` có độ dài `n+1`:

```
P[0] = 0
P[i] = a[0] + a[1] + ... + a[i-1]   (i = 1..n)
```

Tương đương đệ quy: `P[i] = P[i-1] + a[i-1]`.

**Tổng đoạn `[l, r]`** (cả hai đầu inclusive):

```
sum(l, r) = P[r+1] − P[l]
```

> **💡 Vì sao đúng?** `P[r+1] = a[0]+...+a[r]` và `P[l] = a[0]+...+a[l-1]`. Trừ đi nhau, phần `a[0]..a[l-1]` triệt tiêu, còn lại đúng `a[l]+...+a[r]`. Đây là "kính chồng" (telescoping).

### 2.2 Walk-through bằng số: `a = [3, 1, 4, 1, 5]`

Dựng `P` (độ dài 6):

| `i` | 0 | 1 | 2 | 3 | 4 | 5 |
|-----|---|---|---|---|---|---|
| `P[i]` | 0 | 3 | 4 | 8 | 9 | 14 |

- `P[1] = P[0] + a[0] = 0 + 3 = 3`
- `P[2] = P[1] + a[1] = 3 + 1 = 4`
- `P[3] = P[2] + a[2] = 4 + 4 = 8`
- `P[4] = P[3] + a[3] = 8 + 1 = 9`
- `P[5] = P[4] + a[4] = 9 + 5 = 14`

Bây giờ trả lời các query (≥ 4 ví dụ):

1. `sum(0, 4)` (cả mảng) = `P[5] − P[0] = 14 − 0 = 14`. Kiểm tra: `3+1+4+1+5 = 14` ✓
2. `sum(1, 3)` = `P[4] − P[1] = 9 − 3 = 6`. Kiểm tra: `a[1]+a[2]+a[3] = 1+4+1 = 6` ✓
3. `sum(2, 2)` (một phần tử) = `P[3] − P[2] = 8 − 4 = 4`. Kiểm tra: `a[2] = 4` ✓
4. `sum(3, 4)` = `P[5] − P[3] = 14 − 8 = 6`. Kiểm tra: `a[3]+a[4] = 1+5 = 6` ✓
5. `sum(0, 2)` = `P[3] − P[0] = 8 − 0 = 8`. Kiểm tra: `3+1+4 = 8` ✓

### 2.3 Code Go inline — prefix1D + rangeSum

```go
// buildPrefix dựng mảng tổng tiền tố P, len(P) = n+1.
// P[i] = a[0] + ... + a[i-1]; P[0] = 0.
func buildPrefix(a []int) []int {
    n := len(a)
    P := make([]int, n+1) // P[0] mặc định 0 — quan trọng để công thức gọn
    for i := 0; i < n; i++ {
        P[i+1] = P[i] + a[i]
    }
    return P
}

// rangeSum trả tổng a[l..r] (inclusive cả hai đầu) trong O(1).
func rangeSum(P []int, l, r int) int {
    return P[r+1] - P[l]
}

// Walk-through trong main:
//   a = [3 1 4 1 5] → P = [0 3 4 8 9 14]
//   rangeSum(P, 1, 3) = P[4] - P[1] = 9 - 3 = 6 (= 1+4+1)
```

> **⚠ Lỗi thường gặp.**
> - **Off-by-one**: nhầm `P[r] − P[l]` thay vì `P[r+1] − P[l]`. Vì `P` lệch 1 (có `P[0]=0`), đầu phải luôn là `r+1`. Mẹo nhớ: "`P[i]` đếm `i` phần tử đầu tiên" → muốn gồm `a[r]` phải lấy `P[r+1]`.
> - **Quên `P[0] = 0`**: nếu `P` chỉ dài `n` và `P[0] = a[0]`, công thức trở nên rối (phải xử lý riêng `l == 0`). Dùng độ dài `n+1` với `P[0]=0` cho công thức thống nhất.

> **🔁 Dừng lại tự kiểm tra.** Với `a = [2, 0, 6, 4]`, tính `P` rồi cho biết `sum(1, 3)`.
> <details><summary>Đáp án</summary>
>
> `P = [0, 2, 2, 8, 12]`. `sum(1,3) = P[4] − P[1] = 12 − 2 = 10` (= `0+6+4`). ✓
> </details>

📝 **Tóm tắt mục 2**
- `P` dài `n+1`, `P[0]=0`, `P[i] = P[i-1] + a[i-1]`.
- `sum(l, r) = P[r+1] − P[l]` — luôn nhớ `r+1`.
- Dựng O(n), mỗi query O(1).

---

## 3. Difference array (mảng hiệu)

> **💡 Trực giác.** Difference array là **đối ngẫu** của prefix sum. Prefix sum biến mảng → mảng tổng dồn (lấy hiệu để ra range sum). Difference array biến **các thao tác "+v lên đoạn [l,r]"** thành 2 điểm đánh dấu, rồi prefix sum của mảng đánh dấu cho ra mảng kết quả cuối cùng. Hình dung công tắc: bật `+v` tại `l`, tắt `−v` ngay sau `r`; khi quét trái → phải cộng dồn, giá trị "đang bật" chính là tổng các update phủ lên vị trí đó.

### 3.1 Bài toán: nhiều range update, query một lần ở cuối

Cho mảng `a` (ban đầu toàn 0, độ dài `n`). Có `q` thao tác `(l, r, v)`: cộng `v` vào mọi phần tử `a[l..r]`. Cuối cùng in ra mảng `a`.

**Brute-force**: mỗi update quét đoạn `[l, r]` → O(n) mỗi update → O(q·n) tổng. Chậm.

**Difference array** `d` (độ dài `n+1`): mỗi update chỉ chạm 2 vị trí:

```
d[l]   += v
d[r+1] -= v      (nếu r+1 < n+1; d dài n+1 nên r+1 luôn hợp lệ khi r ≤ n-1)
```

Sau khi áp hết update, **prefix sum của `d`** chính là mảng `a` cuối:

```
a[i] = d[0] + d[1] + ... + d[i]
```

| Cách | Mỗi update | `q` update | Dựng kết quả |
|------|-----------|-----------|--------------|
| Brute | O(n) | O(q·n) | — |
| Difference array | O(1) | O(q) | O(n) |

### 3.2 Walk-through bằng số

`n = 6`, mảng `a` ban đầu `[0,0,0,0,0,0]`. Ba update:

- `(1, 3, +5)`: `d[1] += 5`, `d[4] −= 5`
- `(0, 5, +2)`: `d[0] += 2`, `d[6] −= 2`
- `(2, 4, +1)`: `d[2] += 1`, `d[5] −= 1`

Mảng `d` (độ dài 7) sau các update:

| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|-------|---|---|---|---|---|---|---|
| `d`   | +2 | +5 | +1 | 0 | −5 | −1 | −2 |

Prefix sum `d` để ra `a` (chỉ lấy `a[0..5]`):

| `i` | tính | `a[i]` |
|-----|------|--------|
| 0 | `2` | 2 |
| 1 | `2+5` | 7 |
| 2 | `7+1` | 8 |
| 3 | `8+0` | 8 |
| 4 | `8−5` | 3 |
| 5 | `3−1` | 2 |

Kiểm tra trực tiếp từng vị trí (cộng các update phủ lên nó):

- `a[0]`: chỉ update (0,5,+2) phủ → 2 ✓
- `a[1]`: (1,3,+5) + (0,5,+2) = 7 ✓
- `a[2]`: (1,3,+5) + (0,5,+2) + (2,4,+1) = 8 ✓
- `a[3]`: (1,3,+5) + (0,5,+2) + (2,4,+1) = 8 ✓
- `a[4]`: (0,5,+2) + (2,4,+1) = 3 ✓ (update đầu đã "tắt" tại index 4 vì `d[4] −= 5`)
- `a[5]`: chỉ (0,5,+2) = 2 ✓

### 3.3 Code Go inline — differenceArray + apply

```go
// rangeUpdate áp q thao tác (l, r, v) "cộng v vào a[l..r]" lên mảng
// dài n (ban đầu toàn 0), trả về mảng kết quả cuối cùng. O(n + q).
//
// d dài n+1 để d[r+1] luôn hợp lệ ngay cả khi r == n-1.
func rangeUpdate(n int, ops [][3]int) []int {
    d := make([]int, n+1)
    for _, op := range ops {
        l, r, v := op[0], op[1], op[2]
        d[l] += v       // bật +v từ vị trí l
        d[r+1] -= v     // tắt v ngay sau r
    }
    // prefix sum của d → mảng kết quả
    a := make([]int, n)
    cur := 0
    for i := 0; i < n; i++ {
        cur += d[i]
        a[i] = cur
    }
    return a
}

// Walk-through:
//   n=6, ops = {(1,3,5),(0,5,2),(2,4,1)}
//   d = [2 5 1 0 -5 -1 -2]
//   prefix → a = [2 7 8 8 3 2]
```

> **⚠ Lỗi thường gặp.**
> - **Quên prefix sum cuối**: nhiều người dừng ở mảng `d` rồi tưởng đó là kết quả. `d` chỉ là "delta"; phải prefix sum mới ra `a`.
> - **`d[r+1]` tràn**: nếu `d` chỉ dài `n` thì `d[r+1]` với `r=n-1` lỗi index. Luôn để `d` dài `n+1`.
> - Difference array chỉ đúng cho update kiểu **cộng vào đoạn** rồi query **một lần ở cuối**. Nếu query xen kẽ update → xem mục 8.

> **🔁 Dừng lại tự kiểm tra.** `n=4`, update `(0,1,+3)` và `(1,3,+2)`. Mảng `a` cuối?
> <details><summary>Đáp án</summary>
>
> `d`: `(0,1,3)` → `d[0]+=3, d[2]-=3`; `(1,3,2)` → `d[1]+=2, d[4]-=2`. `d = [3, 2, -3, 0, -2]`. Prefix (lấy 4 phần tử): `a = [3, 5, 2, 2]`. Kiểm tra: `a[0]=3, a[1]=3+2=5, a[2]=2, a[3]=2` ✓
> </details>

📝 **Tóm tắt mục 3**
- Difference array = đối ngẫu prefix sum cho **range update**.
- `d[l]+=v; d[r+1]-=v` → O(1) mỗi update.
- Prefix sum `d` → mảng cuối; **đừng quên bước prefix này**.

---

## 4. Prefix sum 2D

> **💡 Trực giác.** Mở rộng "sổ cái dồn" sang 2 chiều: `P[i][j]` = tổng toàn bộ ô trong hình chữ nhật từ góc trên-trái `(0,0)` đến ô `(i-1, j-1)`. Để lấy tổng một submatrix bất kỳ, ta dùng **bù trừ (inclusion-exclusion)**: lấy hình lớn, trừ đi 2 dải thừa bên trên và bên trái, rồi cộng lại phần góc bị trừ 2 lần.

### 4.1 Định nghĩa và công thức

Cho ma trận `m[r][c]`. Định nghĩa `P` kích thước `(r+1) × (c+1)` với hàng/cột 0 toàn 0:

```
P[i][j] = tổng các ô m[0..i-1][0..j-1]
P[i][j] = m[i-1][j-1] + P[i-1][j] + P[i][j-1] − P[i-1][j-1]
```

Số hạng `− P[i-1][j-1]` bù lại vì vùng góc trên-trái được cộng **hai lần** (một lần qua `P[i-1][j]`, một lần qua `P[i][j-1]`).

**Tổng submatrix** từ `(r1, c1)` đến `(r2, c2)` (inclusive):

```
sum = P[r2+1][c2+1] − P[r1][c2+1] − P[r2+1][c1] + P[r1][c1]
```

> **💡 Đọc công thức query.** Lấy hình lớn `P[r2+1][c2+1]` (từ 0,0 đến r2,c2), trừ dải trên `P[r1][c2+1]`, trừ dải trái `P[r2+1][c1]`, **cộng lại** góc `P[r1][c1]` (vì đã trừ 2 lần).

### 4.2 Walk-through ma trận 3×3

```
m = | 1  2  3 |
    | 4  5  6 |
    | 7  8  9 |
```

Dựng `P` (4×4), hàng 0 và cột 0 toàn 0:

| P | j=0 | j=1 | j=2 | j=3 |
|---|-----|-----|-----|-----|
| **i=0** | 0 | 0 | 0 | 0 |
| **i=1** | 0 | 1 | 3 | 6 |
| **i=2** | 0 | 5 | 12 | 21 |
| **i=3** | 0 | 12 | 27 | 45 |

Vài ô tính tay:
- `P[1][1] = m[0][0] + P[0][1] + P[1][0] − P[0][0] = 1 + 0 + 0 − 0 = 1`
- `P[1][2] = m[0][1] + P[0][2] + P[1][1] − P[0][1] = 2 + 0 + 1 − 0 = 3`
- `P[2][2] = m[1][1] + P[1][2] + P[2][1] − P[1][1] = 5 + 3 + 5 − 1 = 12`
- `P[3][3] = m[2][2] + P[2][3] + P[3][2] − P[2][2] = 9 + 21 + 27 − 12 = 45` (= tổng cả ma trận `1+2+...+9 = 45`) ✓

Query (≥ 4 ví dụ):

1. Toàn ma trận `(0,0)→(2,2)` = `P[3][3] − P[0][3] − P[3][0] + P[0][0] = 45 − 0 − 0 + 0 = 45` ✓
2. Khối `(0,0)→(1,1)` = `P[2][2] − P[0][2] − P[2][0] + P[0][0] = 12 − 0 − 0 + 0 = 12`. Kiểm tra: `1+2+4+5 = 12` ✓
3. Khối giữa-phải `(1,1)→(2,2)` = `P[3][3] − P[1][3] − P[3][1] + P[1][1] = 45 − 6 − 12 + 1 = 28`. Kiểm tra: `5+6+8+9 = 28` ✓
4. Một ô `(1,1)→(1,1)` = `P[2][2] − P[1][2] − P[2][1] + P[1][1] = 12 − 3 − 5 + 1 = 5`. Kiểm tra: `m[1][1] = 5` ✓
5. Cột giữa `(0,1)→(2,1)` = `P[3][2] − P[0][2] − P[3][1] + P[0][1] = 27 − 0 − 12 + 0 = 15`. Kiểm tra: `2+5+8 = 15` ✓

### 4.3 Code Go inline — prefix2D + regionSum

```go
// buildPrefix2D dựng prefix sum 2D, kích thước (r+1)x(c+1).
// P[i][j] = tổng m[0..i-1][0..j-1].
func buildPrefix2D(m [][]int) [][]int {
    r := len(m)
    c := len(m[0])
    P := make([][]int, r+1)
    for i := range P {
        P[i] = make([]int, c+1) // hàng/cột 0 mặc định 0
    }
    for i := 1; i <= r; i++ {
        for j := 1; j <= c; j++ {
            P[i][j] = m[i-1][j-1] + P[i-1][j] + P[i][j-1] - P[i-1][j-1]
        }
    }
    return P
}

// regionSum: tổng submatrix (r1,c1)..(r2,c2), inclusive. O(1).
func regionSum(P [][]int, r1, c1, r2, c2 int) int {
    return P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1]
}

// Walk-through: m 3x3 = [[1,2,3],[4,5,6],[7,8,9]]
//   regionSum(P, 1,1, 2,2) = 45 - 6 - 12 + 1 = 28 (= 5+6+8+9)
```

> **⚠ Lỗi thường gặp.**
> - **Sai dấu inclusion-exclusion**: nhớ "lớn − trên − trái + góc". Nhầm dấu góc (trừ thay vì cộng) là lỗi phổ biến nhất.
> - **Off-by-one chỉ số `+1`**: query dùng `r2+1, c2+1` ở góc dưới-phải nhưng `r1, c1` (không +1) ở góc trên-trái — vì `P[r1]` đã là "dải trên không gồm hàng r1".

> **🔁 Dừng lại tự kiểm tra.** Với `P` ở bảng trên, tính tổng cột cuối `(0,2)→(2,2)`.
> <details><summary>Đáp án</summary>
>
> `P[3][3] − P[0][3] − P[3][2] + P[0][2] = 45 − 0 − 27 + 0 = 18` (= `3+6+9`). ✓
> </details>

📝 **Tóm tắt mục 4**
- `P[i][j]` = tổng submatrix `(0,0)→(i-1,j-1)`.
- Dựng: `m[i-1][j-1] + P[i-1][j] + P[i][j-1] − P[i-1][j-1]`.
- Query: `lớn − trên − trái + góc`.

---

## 5. Subarray sum = k (prefix + hash map)

> **💡 Trực giác.** Một subarray `a[i..j]` có tổng `= k` khi và chỉ khi `P[j+1] − P[i] = k`, tức `P[i] = P[j+1] − k`. Quét từ trái, tại mỗi vị trí ta đã thấy prefix nào trước đó? Nếu trong "túi" prefix đã gặp có giá trị `prefix_hiện_tại − k` thì có subarray kết thúc tại đây tổng `k`. Đếm bằng **hash map** prefix → số lần xuất hiện.

### 5.1 Thuật toán

Không dựng mảng `P` riêng — duy trì `cur` (prefix chạy) và map `cnt[prefix] = số lần`:

1. Khởi tạo `cnt = {0: 1}` (prefix 0 xuất hiện 1 lần — đại diện cho "chưa lấy phần tử nào", để subarray bắt đầu từ index 0 được đếm).
2. Quét `a[i]`: `cur += a[i]`. Cộng `cnt[cur − k]` vào kết quả. Rồi `cnt[cur]++`.

### 5.2 Walk-through: `a = [3, 4, 7, 2, -3, 1, 4, 2]`, `k = 7`

| i | a[i] | cur | cur−k | cnt[cur−k] cộng | result | cnt sau khi cập nhật |
|---|------|-----|-------|-----------------|--------|----------------------|
| − | − | 0 | − | − | 0 | {0:1} |
| 0 | 3 | 3 | −4 | 0 | 0 | {0:1, 3:1} |
| 1 | 4 | 7 | 0 | 1 | 1 | {0:1, 3:1, 7:1} |
| 2 | 7 | 14 | 7 | 1 | 2 | {…, 14:1} |
| 3 | 2 | 16 | 9 | 0 | 2 | {…, 16:1} |
| 4 | −3 | 13 | 6 | 0 | 2 | {…, 13:1} |
| 5 | 1 | 14 | 7 | 1 | 3 | {…, 14:2} |
| 6 | 4 | 18 | 11 | 0 | 3 | {…, 18:1} |
| 7 | 2 | 20 | 13 | 1 | 4 | {…, 20:1} |

Kết quả = **4**. Bốn subarray tổng 7: `[3,4]`, `[7]`, `[7,2,-3,1]`, `[2,-3,1,4,... ]`? Liệt kê đúng:
- `[3,4]` (i=0..1) = 7 ✓
- `[7]` (i=2) = 7 ✓
- `[2,-3,1,4,...]`: tại i=5, `cur−k = 7` khớp prefix sau index 1 → subarray `a[2..5] = 7+2−3+1 = 7` ✓
- Tại i=7, `cur−k = 13` khớp prefix tại i=4 → subarray `a[5..7] = 1+4+2 = 7` ✓

### 5.3 Code Go inline — subarraySumK

```go
// subarraySumK đếm số subarray (đoạn liền kề) có tổng đúng bằng k.
// Dùng prefix chạy + hash map đếm tần suất prefix. O(n) thời gian, O(n) bộ nhớ.
func subarraySumK(a []int, k int) int {
    cnt := map[int]int{0: 1} // prefix 0 đã "xuất hiện" 1 lần (mảng rỗng đầu)
    cur, res := 0, 0
    for _, x := range a {
        cur += x
        // có bao nhiêu prefix trước đó = cur-k → bấy nhiêu subarray kết tại đây
        res += cnt[cur-k]
        cnt[cur]++
    }
    return res
}

// Walk-through: a=[3 4 7 2 -3 1 4 2], k=7 → res = 4
```

> **❓ Câu hỏi tự nhiên.** *"Sao không dùng sliding window như Lesson 14?"* — Sliding window chỉ đúng khi mọi phần tử **không âm** (mở rộng/co cửa sổ đơn điệu). Mảng có số **âm** (như ví dụ trên có `−3`) phá vỡ tính đơn điệu → phải dùng prefix + hash map. Đây là ranh giới quan trọng giữa L14 và L15.

> **⚠ Lỗi thường gặp.** Quên khởi tạo `cnt[0] = 1` → bỏ sót các subarray bắt đầu từ index 0. Trong ví dụ trên, nếu thiếu thì tại i=1 (`cur=7, cur−k=0`) sẽ không đếm được `[3,4]`.

📝 **Tóm tắt mục 5**
- `sum(i,j)=k` ⟺ `P[i] = P[j+1]−k`.
- Hash map đếm prefix đã gặp → O(n).
- Khởi tạo `{0:1}`; xử lý được số âm (khác sliding window).

---

## 6. Ứng dụng

1. **Range sum query immutable** (mục 2) — LeetCode 303. Mảng tĩnh, nhiều query tổng đoạn.
2. **Count subarray sum = k** (mục 5) — LeetCode 560. Và biến thể **chia hết cho k**: thay vì so prefix bằng nhau, gom prefix theo **dư** `cur mod k` (xem bài tập 5).
3. **2D region sum** (mục 4) — LeetCode 304. Tổng vùng chữ nhật trên ma trận tĩnh.
4. **Range update offline (difference array)** — LeetCode 1109 *Corporate Flight Bookings*: nhiều booking `(first, last, seats)` cộng ghế vào dải ngày, query tổng ghế mỗi ngày (xem bài tập 4). Cũng dùng cho mô phỏng traffic (xe vào/ra đoạn đường).
5. **Equilibrium / pivot index** — tìm vị trí `i` mà tổng bên trái = tổng bên phải: `leftSum = P[i]`, `rightSum = P[n] − P[i+1]`. LeetCode 724.
6. **Product except self** — dùng **prefix product** trái và phải (xem bài tập 6, mục 7).

---

## 7. Các biến thể prefix khác

Ý tưởng prefix tổng quát hóa cho mọi phép toán **kết hợp được và có nghịch đảo** (hoặc tách được trái/phải).

### 7.1 Prefix XOR

XOR có nghịch đảo là chính nó (`x ^ x = 0`), nên dùng được hoàn toàn như prefix sum:

```
PX[0] = 0; PX[i] = a[0] ^ ... ^ a[i-1]
XOR đoạn [l, r] = PX[r+1] ^ PX[l]
```

```go
// Prefix XOR — XOR đoạn trong O(1).
func buildPrefixXOR(a []int) []int {
    PX := make([]int, len(a)+1)
    for i, x := range a {
        PX[i+1] = PX[i] ^ x
    }
    return PX
}
func rangeXOR(PX []int, l, r int) int { return PX[r+1] ^ PX[l] }

// Walk-through: a=[1 2 3 4]
//   PX = [0, 1, 3, 0, 4]   (1, 1^2=3, 3^3=0, 0^4=4)
//   rangeXOR(l=1,r=2) = PX[3]^PX[1] = 0^1 = 1 (= 2^3) ✓
```

Ứng dụng: đếm subarray có XOR = k (giống mục 5 nhưng thay `cur-k` bằng `cur^k`).

### 7.2 Prefix product

Tích **không có nghịch đảo an toàn** khi có số 0 (không chia được cho 0). Cách dùng phổ biến: prefix product **trái** và **phải** rồi nhân — chính là *product except self*:

```
left[i]  = tích a[0..i-1]
right[i] = tích a[i+1..n-1]
result[i] = left[i] * right[i]
```

### 7.3 Prefix max

`max` **không có nghịch đảo** → không trả lời range query bất kỳ bằng một phép. Prefix max chỉ cho **tiền tố** (`maxđến i`), hữu ích cho bài "với mỗi `i`, giá trị lớn nhất bên trái". Range max bất kỳ cần **Sparse Table / Segment Tree** ([DataStructures](../../DataStructures/index.html)).

> **❓ Câu hỏi tự nhiên.** *"Khi nào prefix-X dùng được cho range query?"* — Khi phép `⊕` **có nghịch đảo** (`+` ↔ `−`, `^` ↔ `^`): `query(l,r) = P[r+1] ⊕⁻¹ P[l]`. Khi **không** có nghịch đảo (`max`, `min`, `gcd`) → prefix chỉ ra tiền tố; range query cần cấu trúc cây.

📝 **Tóm tắt mục 7**
- Prefix XOR: dùng đầy đủ như prefix sum.
- Prefix product: trái×phải (product except self), cẩn thận số 0.
- Prefix max/min/gcd: chỉ tiền tố; range query → Sparse Table / Segment Tree.

---

## 8. Khi nào dùng prefix/difference?

| Tình huống | Kỹ thuật phù hợp |
|------------|------------------|
| Nhiều **range sum query**, mảng **tĩnh** (không sửa) | Prefix sum O(n + q) |
| Nhiều **range update** rồi query **một lần** ở cuối (offline) | Difference array O(n + q) |
| Tổng vùng chữ nhật trên ma trận tĩnh | Prefix sum 2D |
| Range **update + query xen kẽ** real-time | **Fenwick tree** (point update) hoặc **Segment tree** (range update + lazy) — xem [DataStructures](../../DataStructures/index.html) |
| Range **max/min/gcd** query (mảng tĩnh) | **Sparse Table** |

> **💡 Ranh giới quyết định.** Prefix/difference là kỹ thuật **offline tĩnh**: hoặc đọc nhiều (prefix), hoặc ghi nhiều rồi đọc cuối (difference). Một khi **đọc và ghi đan xen** trên cùng dữ liệu liên tục thay đổi → mọi update làm hỏng prefix → phải nâng cấp lên cây (O(log n) mỗi thao tác). Đừng cố dùng prefix khi mảng thay đổi liên tục.

📝 **Tóm tắt mục 8**
- Tĩnh + nhiều query → prefix sum.
- Nhiều update + query cuối → difference array.
- Update/query xen kẽ → Fenwick / Segment tree.

---

## 9. Cạm bẫy thường gặp (tổng hợp)

1. **Off-by-one `P[i]` vs `P[i+1]`**: `sum(l,r) = P[r+1] − P[l]`, không phải `P[r] − P[l]`. Luôn nhớ `P` lệch 1.
2. **Overflow**: tổng nhiều phần tử lớn có thể vượt `int32`. Trong Go, `int` thường 64-bit nên an toàn hơn, nhưng khi tổng > `9.2×10^{18}` vẫn tràn `int64` → cân nhắc `big.Int`. Với C++/Java luôn cân nhắc `int64`/`long`.
3. **2D inclusion-exclusion sai dấu**: query là `lớn − trên − trái + góc`; quên dấu `+` ở góc (hoặc nhầm thành `−`) cho kết quả sai.
4. **Difference array quên prefix cuối**: mảng `d` không phải kết quả — phải prefix sum mới ra mảng cuối.
5. **`d[r+1]` index out of range**: để `d` dài `n+1`.
6. **Subarray sum=k quên `cnt[0]=1`**: bỏ sót subarray bắt đầu từ index 0.
7. **Dùng sliding window cho mảng có số âm**: sai. Số âm → dùng prefix + hash map.

---

## Bài tập

> Mỗi bài có lời giải chi tiết ở mục dưới. Tự làm trước khi xem.

1. **Range Sum Query — Immutable** (LeetCode 303): cho mảng `nums`, hỗ trợ `sumRange(l, r)` nhiều lần. Cài bằng prefix sum.
2. **Subarray Sum Equals K** (LeetCode 560): đếm số subarray tổng `= k` (mảng có số âm).
3. **2D Region Sum — Immutable** (LeetCode 304): tổng submatrix `(r1,c1)→(r2,c2)` nhiều lần.
4. **Corporate Flight Bookings** (LeetCode 1109): `n` chuyến bay, mỗi booking `[first, last, seats]` cộng `seats` ghế vào các chuyến `first..last` (1-indexed). Trả mảng tổng ghế mỗi chuyến.
5. **Subarray Sums Divisible by K** (LeetCode 974): đếm số subarray có tổng chia hết cho `k`.
6. **Product of Array Except Self** (LeetCode 238): trả `out[i] = tích mọi phần tử trừ nums[i]`, **không dùng phép chia**, O(n).

---

## Lời giải chi tiết

### Bài 1 — Range Sum Query Immutable

**Cách tiếp cận**: dựng prefix `P` một lần trong constructor; `sumRange(l,r) = P[r+1] − P[l]`.

```go
type NumArray struct{ P []int }

func Constructor(nums []int) NumArray {
    P := make([]int, len(nums)+1)
    for i, x := range nums {
        P[i+1] = P[i] + x
    }
    return NumArray{P}
}

func (na NumArray) SumRange(l, r int) int {
    return na.P[r+1] - na.P[l]
}
```

**Độ phức tạp**: dựng O(n) một lần; mỗi `SumRange` O(1); bộ nhớ O(n).

### Bài 2 — Subarray Sum Equals K

**Cách tiếp cận**: prefix chạy + hash map đếm (mục 5). Số âm → không dùng được sliding window.

```go
func subarraySum(nums []int, k int) int {
    cnt := map[int]int{0: 1}
    cur, res := 0, 0
    for _, x := range nums {
        cur += x
        res += cnt[cur-k]
        cnt[cur]++
    }
    return res
}
```

**Walk-through**: `nums=[1,1,1], k=2`. cur: 1(cur-k=-1→0), 2(cur-k=0→+1, res=1), 3(cur-k=1→+1, res=2). Kết quả 2: `[1,1]` đầu và `[1,1]` cuối. ✓

**Độ phức tạp**: O(n) thời gian, O(n) bộ nhớ.

### Bài 3 — 2D Region Sum Immutable

**Cách tiếp cận**: prefix 2D trong constructor; query bằng inclusion-exclusion (mục 4).

```go
type NumMatrix struct{ P [][]int }

func Constructor304(matrix [][]int) NumMatrix {
    r, c := len(matrix), len(matrix[0])
    P := make([][]int, r+1)
    for i := range P {
        P[i] = make([]int, c+1)
    }
    for i := 1; i <= r; i++ {
        for j := 1; j <= c; j++ {
            P[i][j] = matrix[i-1][j-1] + P[i-1][j] + P[i][j-1] - P[i-1][j-1]
        }
    }
    return NumMatrix{P}
}

func (nm NumMatrix) SumRegion(r1, c1, r2, c2 int) int {
    return nm.P[r2+1][c2+1] - nm.P[r1][c2+1] - nm.P[r2+1][c1] + nm.P[r1][c1]
}
```

**Độ phức tạp**: dựng O(r·c); mỗi query O(1); bộ nhớ O(r·c).

### Bài 4 — Corporate Flight Bookings

**Cách tiếp cận**: difference array. Mỗi booking `[first, last, seats]` (1-indexed): `d[first-1] += seats`, `d[last] -= seats`. Prefix sum `d` → kết quả. (Chuyển 1-indexed về 0-indexed: chuyến `first..last` ứng index `first-1..last-1`; `d[last] -= seats` chính là `d[(last-1)+1]`.)

```go
func corpFlightBookings(bookings [][]int, n int) []int {
    d := make([]int, n+1)
    for _, b := range bookings {
        first, last, seats := b[0], b[1], b[2]
        d[first-1] += seats
        d[last] -= seats // last <= n nên index hợp lệ trong d dài n+1
    }
    res := make([]int, n)
    cur := 0
    for i := 0; i < n; i++ {
        cur += d[i]
        res[i] = cur
    }
    return res
}
```

**Walk-through**: `bookings=[[1,2,10],[2,3,20],[2,5,25]], n=5`.
- `[1,2,10]`: `d[0]+=10, d[2]-=10`
- `[2,3,20]`: `d[1]+=20, d[3]-=20`
- `[2,5,25]`: `d[1]+=25, d[5]-=25`
- `d = [10, 45, -10, -20, 0, -25]` (chỉ dùng index 0..4). Prefix: `[10, 55, 45, 25, 25]`. ✓

**Độ phức tạp**: O(n + số booking).

### Bài 5 — Subarray Sums Divisible by K

**Cách tiếp cận**: subarray `(i,j)` chia hết `k` ⟺ `P[j+1] ≡ P[i] (mod k)` (cùng số dư). Đếm prefix theo **dư** thay vì giá trị. Chuẩn hóa dư về `[0, k)` bằng `((cur % k) + k) % k` để xử lý số âm.

```go
func subarraysDivByK(nums []int, k int) int {
    cnt := map[int]int{0: 1}
    cur, res := 0, 0
    for _, x := range nums {
        cur += x
        m := ((cur % k) + k) % k // dư không âm
        res += cnt[m]
        cnt[m]++
    }
    return res
}
```

**Walk-through**: `nums=[4,5,0,-2,-3,1], k=5`. Dư cur lần lượt: 4→4, 9→4, 9→4, 7→2, 4→4, 5→0. cnt cập nhật và cộng → kết quả **7** (đây là test case chính thức của LeetCode 974). Ý chính: 3 prefix cùng dư 4 (ở các vị trí) tạo `C(3,2)+...` cặp.

**Độ phức tạp**: O(n) thời gian, O(k) bộ nhớ (số dư khác nhau ≤ k).

### Bài 6 — Product of Array Except Self

**Cách tiếp cận**: prefix product trái rồi phải, không chia. `out[i] = (tích trái i) × (tích phải i)`.

```go
func productExceptSelf(nums []int) []int {
    n := len(nums)
    out := make([]int, n)
    // pass 1: out[i] = tích các phần tử bên trái i
    out[0] = 1
    for i := 1; i < n; i++ {
        out[i] = out[i-1] * nums[i-1]
    }
    // pass 2: nhân thêm tích bên phải, dùng biến chạy right
    right := 1
    for i := n - 1; i >= 0; i-- {
        out[i] *= right
        right *= nums[i]
    }
    return out
}
```

**Walk-through**: `nums=[1,2,3,4]`.
- Pass 1 (trái): `out=[1, 1, 2, 6]` (1; 1·1; 1·2; 2·3)
- Pass 2 (phải, right bắt đầu 1): i=3: out[3]=6·1=6, right=4; i=2: out[2]=2·4=8, right=12; i=1: out[1]=1·12=12, right=24; i=0: out[0]=1·24=24.
- `out=[24, 12, 8, 6]`. ✓ (`2·3·4, 1·3·4, 1·2·4, 1·2·3`)

**Độ phức tạp**: O(n) thời gian, O(1) bộ nhớ phụ (ngoài mảng output).

---

## Code & Minh họa

- Toàn bộ code Go ở trên là inline trong README (không có `solutions.go` riêng cho lesson này).
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Prefix sum 1D**: nhập mảng, xem `P` dựng từng bước, chọn `[l,r]` highlight công thức `P[r+1] − P[l]`.
  2. **Difference array**: thêm các update `(l,r,v)`, animate đánh dấu `d[l]+=v / d[r+1]-=v`, rồi prefix để ra mảng cuối.
  3. **Prefix sum 2D**: ma trận, chọn submatrix, highlight 4 góc inclusion-exclusion.

---

## Bài tiếp theo

- **[Lesson 16 — Hashing Techniques](../lesson-16-hashing-techniques/)**: học kỹ hash map (đã dùng ở mục 5), polynomial hash, collision handling.
- Liên quan: [Lesson 14 — Sliding Window](../lesson-14-sliding-window/) (kỹ thuật cửa sổ cho phần tử không âm), [DataStructures — Fenwick / Segment Tree](../../DataStructures/index.html) (khi cần update + query xen kẽ).
