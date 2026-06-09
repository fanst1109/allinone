// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/05-NumberTheory-Combinatorics-Logic/lesson-03-permutations-combinations/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Hoán vị & Tổ hợp

## Mục tiêu

- Hiểu **quy tắc cộng, nhân** đếm.
- **Hoán vị** (permutation), **chỉnh hợp**, **tổ hợp** (combination).
- Phân biệt: thứ tự có quan trọng không? có lặp không?
- Áp dụng vào xác suất.

## Kiến thức tiền đề

- Đại số cơ bản.

---

## 1. Hai quy tắc đếm cơ bản

💡 **Trực giác / Hình dung**: phân biệt bằng từ nối. "**HOẶC**" (chọn 1 trong các lựa chọn rời nhau) → **cộng**. "**RỒI / VÀ**" (làm lần lượt từng giai đoạn) → **nhân**. Đi ăn: "món chính HOẶC món chay" → cộng số lựa chọn; "món chính RỒI tráng miệng" → nhân.

### 1.1. Quy tắc cộng (OR)
Nếu A có $m$ cách và B có $n$ cách, **A hoặc B** (không trùng) có **$m + n$** cách.

### 1.2. Quy tắc nhân (AND)
Nếu A có $m$ cách và B có $n$ cách, **A rồi B** có **$m \\cdot n$** cách.

**4 ví dụ số đa dạng**:
- Nhân: 3 món chính RỒI 4 tráng miệng → $3 \\cdot 4 = 12$ bộ.
- Cộng: đi từ HN tới HCM bằng 2 chuyến bay HOẶC 3 chuyến tàu → $2+3 = 5$ cách.
- Nhân nhiều giai đoạn: mã PIN 4 chữ số (0–9), mỗi vị trí 10 cách → $10 \\cdot 10 \\cdot 10 \\cdot 10 = 10^4 = 10000$.
- Kết hợp: chọn (áo: 3 cái) RỒI (quần: 2 cái) cho thứ Hai HOẶC thứ Ba → $(3 \\cdot 2) + (3 \\cdot 2) = 12$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào cộng, khi nào nhân?"* Cộng khi các lựa chọn **loại trừ nhau** (chỉ chọn 1 nhóm). Nhân khi phải làm **tất cả các bước** liên tiếp. Mẹo: "hoặc" → $+$, "và rồi" → $\\times$.
- *"Quy tắc cộng cần điều kiện gì?"* Các nhóm phải **không trùng** (rời nhau). Nếu trùng phải dùng bù trừ (L05): $|A \\cup B| = |A|+|B|-|A \\cap B|$.

⚠ **Lỗi thường gặp**: nhân khi đáng lẽ cộng (hoặc ngược lại). Phản ví dụ: "chọn 1 món ăn từ thực đơn 3 món Việt HOẶC 4 món Nhật" → $3+4 = 7$ (cộng, vì chỉ chọn 1 món), KHÔNG phải $3 \\cdot 4 = 12$.

🔁 **Dừng lại tự kiểm tra**

1. Biển số có 1 chữ cái (26) rồi 3 chữ số (0–9). Bao nhiêu biển?
2. Đi làm bằng (xe buýt: 2 tuyến) HOẶC (tàu: 1 tuyến). Bao nhiêu cách?

<details><summary>Đáp án</summary>

1. $26 \\cdot 10 \\cdot 10 \\cdot 10 = 26000$ (nhân, các giai đoạn).
2. $2+1 = 3$ (cộng, loại trừ nhau).

</details>

### 📝 Tóm tắt mục 1

- "HOẶC" (rời nhau) → **cộng** $m+n$; "RỒI/VÀ" (lần lượt) → **nhân** $m \\cdot n$.
- Quy tắc cộng đòi các nhóm không trùng.
- Nhiều giai đoạn độc lập → nhân tất cả (vd PIN $10^4$).

---

## 2. Hoán vị (Permutation) — Sắp xếp tất cả

💡 **Trực giác / Hình dung**: hoán vị = "xếp hàng". Có $n$ người xếp thành 1 hàng: chỗ đầu chọn 1 trong $n$ người, chỗ thứ hai 1 trong $(n-1)$ người còn lại,... Nhân các lựa chọn giảm dần → $n!$. Mỗi cách xếp hàng khác nhau là 1 hoán vị.

**Định nghĩa**: Hoán vị của $n$ phần tử = số cách sắp xếp tất cả $n$ phần tử thành dãy có thứ tự.

$$P(n) = n! = n \\cdot (n-1) \\cdot (n-2) \\cdot \\ldots \\cdot 2 \\cdot 1$$

**4 ví dụ số đa dạng**:
- Sắp 5 cuốn sách: $5! = 120$.
- Sắp 3 người: $3! = 6$ (liệt kê được: ABC, ACB, BAC, BCA, CAB, CBA).
- Sắp 1 vật: $1! = 1$.
- "Không sắp gì": $0! = 1$ (quy ước, dãy rỗng).

**Giải thích**: vị trí 1 có 5 cách, vị trí 2 có 4 (còn 4 sách), ..., vị trí 5 có 1. Nhân lại: $5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1$.

### Quy ước
**$0! = 1$** (chỉ có 1 cách "không sắp xếp gì": dãy rỗng).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $0! = 1$ chứ không phải 0?"* Để công thức $C(n,k) = n!/(k!(n-k)!)$ còn đúng khi $k = 0$ hoặc $k = n$: $C(5,0) = 5!/(0! \\cdot 5!) = 1$ cần $0! = 1$. Đó là quy ước giữ công thức nhất quán, ngoài ra "có đúng 1 cách sắp xếp dãy rỗng".
- *"Hoán vị có vật giống nhau thì sao?"* Phải chia cho giai thừa số vật trùng. Vd sắp chữ "MISSISSIPPI" (11 chữ, 4 S, 4 I, 2 P): $11!/(4! \\cdot 4! \\cdot 2!)$, KHÔNG phải $11!$.

⚠ **Lỗi thường gặp**: dùng $n!$ khi có phần tử lặp. Phản ví dụ: số cách sắp chữ "AAB" KHÔNG phải $3! = 6$ mà là $3!/2! = 3$ (AAB, ABA, BAA) — vì 2 chữ A giống nhau, đổi chỗ chúng không tạo cách mới.

🔁 **Dừng lại tự kiểm tra**

1. Bao nhiêu cách sắp 6 người vào 6 ghế hàng ngang?
2. Bao nhiêu "từ" khác nhau từ các chữ của "BOOK"?

<details><summary>Đáp án</summary>

1. $6! = 720$.
2. 4 chữ, 2 chữ O trùng → $4!/2! = 12$.

</details>

### 📝 Tóm tắt mục 2

- Hoán vị = sắp **tất cả** $n$ phần tử có thứ tự = $n!$.
- $0! = 1$ (quy ước giữ công thức nhất quán).
- Có phần tử lặp → chia cho giai thừa số lần lặp (vd MISSISSIPPI).

---

## 3. Chỉnh hợp (Permutation k of n) — Sắp xếp k trong n

💡 **Trực giác / Hình dung**: chỉnh hợp = "xếp hàng nhưng chỉ chọn k chỗ". Trao huy chương vàng-bạc-đồng cho 10 VĐV: chỗ vàng 10 cách, bạc 9, đồng 8 → $10 \\cdot 9 \\cdot 8$. Vẫn là xếp hàng (thứ tự quan trọng), nhưng dừng sau k bước thay vì hết n.

**Định nghĩa**: Chọn $k$ phần tử từ $n$ và **sắp xếp** chúng. Thứ tự quan trọng.

$$A(n, k) = \\frac{n!}{(n-k)!} = n \\cdot (n-1) \\cdot \\ldots \\cdot (n-k+1)$$

**4 ví dụ số đa dạng**:
- $A(10, 3) = 10 \\cdot 9 \\cdot 8 = 720$ (huy chương V-B-Đ).
- $A(5, 2) = 5 \\cdot 4 = 20$ (chọn + sắp 2 trong 5).
- $A(5, 5) = 5! = 120$ ($k = n$ → thành hoán vị).
- $A(n, 1) = n$ (chọn 1 phần tử có $n$ cách).

⟶ Thứ tự khác nhau (V-B-Đ khác B-V-Đ) → chỉnh hợp.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Chỉnh hợp khác hoán vị chỗ nào?"* Hoán vị xếp **toàn bộ** $n$ ($P(n) = n!$); chỉnh hợp chỉ xếp **k chọn ra** ($A(n,k)$). Khi $k = n$, chỉnh hợp = hoán vị: $A(n,n) = n!/0! = n!$.
- *"Vì sao công thức là $n!/(n-k)!$?"* $A(n,k) = n \\cdot (n-1) \\cdot \\ldots \\cdot (n-k+1)$ ($k$ thừa số giảm dần). Viết gọn: nhân thêm rồi chia phần thừa $(n-k)!$ → $n!/(n-k)!$. Vd $A(5,2) = 5!/3! = 120/6 = 20$ ✓.

⚠ **Lỗi thường gặp**: dùng chỉnh hợp (A) khi thứ tự KHÔNG quan trọng (đáng lẽ dùng tổ hợp C). Phản ví dụ: "chọn 3 người vào ban kiểm tra (vai như nhau)" KHÔNG phải $A(10,3) = 720$ mà là $C(10,3) = 120$ — vì ABC, ACB... cùng 1 ban.

🔁 **Dừng lại tự kiểm tra**

1. Từ 8 ngựa, có bao nhiêu cách xếp hạng nhất–nhì–ba?
2. $A(6, 2) = ?$

<details><summary>Đáp án</summary>

1. $A(8,3) = 8 \\cdot 7 \\cdot 6 = 336$.
2. $A(6,2) = 6 \\cdot 5 = 30$.

</details>

### 📝 Tóm tắt mục 3

- Chỉnh hợp = chọn $k$ RỒI **sắp xếp** (thứ tự quan trọng) = $n!/(n-k)!$.
- $A(n,n) = n!$ (thành hoán vị); $A(n,1) = n$.
- Thứ tự KHÔNG quan trọng → dùng tổ hợp C, không phải A.

---

## 4. Tổ hợp (Combination) — Chọn k trong n

💡 **Trực giác / Hình dung**: tổ hợp = "bốc 1 nắm, không xếp hàng". Chọn 3 bạn vào 1 nhóm (vai như nhau): bạn không quan tâm ai đứng trước ai. Chính là chỉnh hợp (có sắp xếp) nhưng **gộp lại** mọi cách sắp xếp của cùng 1 nhóm — nên chia cho $k!$ (số cách sắp k người).

**Định nghĩa**: Chọn $k$ phần tử từ $n$, **không quan tâm thứ tự**.

$$C(n, k) = \\frac{n!}{k! \\cdot (n-k)!} = \\frac{A(n,k)}{k!}$$

Ký hiệu khác: **(n choose k)** hoặc $nCk$ hoặc $C^k_n$.

**4 ví dụ số đa dạng**:
- $C(10, 3) = 720/6 = 120$ (chọn 3 trong 10, không phân vai).
- $C(5, 2) = 10$ (liệt kê được: $\\{12,13,14,15,23,24,25,34,35,45\\}$).
- $C(n, 0) = 1$ và $C(n, n) = 1$ (1 cách chọn rỗng / chọn hết).
- $C(52, 5) = 2{,}598{,}960$ (số tay bài poker).

⟶ So với chỉnh hợp (720), tổ hợp ít hơn $k!$ lần (vì các thứ tự khác nhau gộp thành 1).

> 📐 **Định nghĩa đầy đủ — $C(n, k)$ — Tổ hợp**
>
> **(a) Là gì**: Số cách chọn 1 tập con $k$ phần tử từ tập $n$ phần tử, **không quan tâm thứ tự**. Công thức $= n!/(k! \\cdot (n-k)!)$. Khác chỉnh hợp $A(n,k)$: tổ hợp "BCD = BDC = CDB" tất cả tính 1 cách, chỉnh hợp coi 6 cách khác nhau.
>
> **(b) Vì sao cần**: Mọi bài toán đếm "chọn nhóm không phân vai" → tổ hợp. Xác suất rút bài (đếm tay), xổ số (chọn 6/45), số tập con của tập $n$ ($= 2^n = \\sum C(n,k)$), khai triển nhị thức Newton (hệ số $= C(n,k)$), thiết kế thí nghiệm. Trong xác suất nhị thức $P(X=k) = C(n,k) \\cdot p^k \\cdot (1-p)^{n-k}$ — phân phối quan trọng nhất rời rạc.
>
> **(c) Ví dụ số**: $C(10, 3) = 120$. Kiểm: $A(10,3) = 720$, chia $3! = 6$ → 120 ✓. $C(52, 5) = 2{,}598{,}960$ (số tay bài poker). $C(5, 0) = 1$, $C(5, 5) = 1$, $C(5, 1) = C(5, 4) = 5$ (đối xứng), $C(5, 2) = C(5, 3) = 10$. Tổng tầng 5 Pascal $= 1+5+10+10+5+1 = 32 = 2^5$ ✓. Vietlott 6/45: $C(45, 6) = $ **8,145,060** → xác suất trúng $1/8.1\\text{M} \\approx 1.23 \\cdot 10^{-7}$.

### Tính chất

- $C(n, 0) = C(n, n) = 1$.
- $C(n, k) = C(n, n-k)$ (đối xứng).
- $C(n, k) = C(n-1, k-1) + C(n-1, k)$ (công thức Pascal).

**Ví dụ Pascal**: $C(5, 2) = C(4, 1) + C(4, 2) = 4 + 6 = $ **10**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao $C(n,k) = C(n,n-k)$?"* Vì **chọn $k$ phần tử để LẤY** tương đương **chọn $(n-k)$ phần tử để BỎ** — mỗi cách lấy ứng đúng 1 cách bỏ. Vd $C(10,3) = C(10,7) = 120$: chọn 3 người vào nhóm = chọn 7 người ở ngoài.
- *"$C(n,k) = A(n,k)/k!$ từ đâu ra?"* Mỗi tổ hợp $k$ phần tử có $k!$ cách sắp thành chỉnh hợp. Nên $A(n,k) = C(n,k) \\cdot k!$ → $C = A/k!$. Verify: $C(5,2) = A(5,2)/2! = 20/2 = 10$ ✓.

⚠ **Lỗi thường gặp — lẫn tổ hợp C (không thứ tự) với chỉnh hợp A (có thứ tự)**. Hỏi "chọn 2 trong 4 để **bắt tay**" → tổ hợp $C(4,2) = 6$ (bắt tay A-B = B-A). Hỏi "chọn 2 trong 4 làm **chủ tịch + phó**" → chỉnh hợp $A(4,2) = 12$ (A chủ tịch khác B chủ tịch). Cùng "chọn 2 trong 4" nhưng đáp án khác nhau gấp đôi vì thứ tự!

🔁 **Dừng lại tự kiểm tra**

1. $C(7, 5) = ?$ (mẹo: dùng đối xứng).
2. 6 đội bóng đá vòng tròn, mỗi cặp đá 1 trận. Bao nhiêu trận?

<details><summary>Đáp án</summary>

1. $C(7,5) = C(7,2) = 21$.
2. Chọn 2 đội (không thứ tự, A đá B = B đá A): $C(6,2) = 15$ trận.

</details>

### 📝 Tóm tắt mục 4

- Tổ hợp = chọn $k$ **không thứ tự** = $n!/(k!(n-k)!) = A(n,k)/k!$.
- Đối xứng $C(n,k) = C(n,n-k)$; Pascal $C(n,k) = C(n-1,k-1)+C(n-1,k)$.
- Phân biệt sống còn: thứ tự quan trọng → A; không quan trọng → C.

---

## 5. Tóm tắt — Phân biệt 4 trường hợp

| Trường hợp | Thứ tự? | Lặp? | Công thức |
|------------|---------|------|-----------|
| Hoán vị | Có | Không | $n!$ |
| Chỉnh hợp | Có | Không | $A(n,k) = n!/(n-k)!$ |
| Tổ hợp | Không | Không | $C(n,k) = n!/(k!(n-k)!)$ |
| Chỉnh hợp lặp | Có | Có | $n^k$ |
| Tổ hợp lặp | Không | Có | $C(n+k-1, k)$ |

**Mẹo nhớ**:
- "Sắp xếp" → có thứ tự → hoán vị/chỉnh hợp.
- "Chọn nhóm" → không thứ tự → tổ hợp.

💡 **Trực giác / Hình dung 2 câu hỏi quyết định**: trước mọi bài đếm, tự hỏi (1) **thứ tự có quan trọng không?** (2) **có được lặp lại không?**. Hai câu trả lời chọn đúng 1 ô trong bảng trên.

❓ **Câu hỏi tự nhiên của người đọc**

- *"'Có lặp' nghĩa là gì?"* Là 1 phần tử được chọn lại nhiều lần. Mã PIN $1131$ có lặp (số 1 dùng 3 lần) → $10^4$. Chọn 3 người khác nhau vào ban → không lặp → C hoặc A.
- *"Tổ hợp lặp $C(n+k-1, k)$ áp dụng khi nào?"* Khi chọn $k$ vật từ $n$ loại, được lấy trùng loại, không quan tâm thứ tự. Vd mua 5 cái bánh từ 3 loại: $C(3+5-1, 5) = C(7,5) = 21$ cách.

⚠ **Lỗi thường gặp — nhầm "có lặp" và "không lặp"**. Phản ví dụ: "mã số 3 chữ số khác nhau" $= A(10,3) = 720$ (không lặp), nhưng "mã số 3 chữ số bất kỳ" $= 10^3 = 1000$ (có lặp). Đọc kỹ đề có chữ "khác nhau" hay không.

🔁 **Dừng lại tự kiểm tra**

1. Khoá số 4 chữ số (0–9), cho phép lặp. Bao nhiêu mã?
2. Xếp 4 người khác nhau thành 1 hàng. Bao nhiêu cách?

<details><summary>Đáp án</summary>

1. Có thứ tự + có lặp → $10^4 = 10000$.
2. Có thứ tự + không lặp + dùng hết → hoán vị $4! = 24$.

</details>

### 📝 Tóm tắt mục 5

- 2 câu quyết định: **thứ tự?** và **lặp?** → chọn đúng công thức.
- Không lặp: hoán vị $n!$, chỉnh hợp $A(n,k)$, tổ hợp $C(n,k)$.
- Có lặp: chỉnh hợp lặp $n^k$, tổ hợp lặp $C(n+k-1, k)$.

---

## 6. Ví dụ ứng dụng

### 6.1. Mật khẩu

Mật khẩu 4 chữ số (0-9), cho phép lặp: **$10^4 = 10{,}000$** mật khẩu.

Mật khẩu 4 chữ số khác nhau: **$A(10, 4) = 5{,}040$**.

### 6.2. Xổ số

Vietlott 6/45: chọn 6 số trong 45. $C(45, 6) = $ **8,145,060** cách. Xác suất trúng $= 1/8\\text{M} \\approx 1.2 \\cdot 10^{-7}$.

### 6.3. Xếp lịch

10 người, chọn 3 vào "vai trò khác nhau" (chủ tịch, thư ký, kế toán): $A(10, 3) = $ **720**.

10 người, chọn 3 vào "ban kiểm tra" (vai trò như nhau): $C(10, 3) = $ **120**.

💡 **Trực giác / Hình dung**: cùng "10 người chọn 3" mà ra 720 (vai khác nhau) hay 120 (vai như nhau) — khác nhau đúng $3! = 6$ lần. Đây là minh hoạ sống động: thứ tự nhân thêm $k!$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Xác suất trúng Vietlott 6/45 nhỏ cỡ nào?"* $1/C(45,6) = 1/8{,}145{,}060 \\approx 1.23 \\cdot 10^{-7}$ — tức ~1 phần 8 triệu. Mua 1 vé mỗi tuần, trung bình ~156,000 năm mới trúng 1 lần.
- *"Mật khẩu khác nhau với cho lặp khác bao nhiêu?"* 4 chữ số cho lặp $= 10^4 = 10000$; khác nhau $= A(10,4) = 5040$ — gần một nửa.

### 📝 Tóm tắt mục 6

- Mật khẩu cho lặp: $n^k$; khác nhau: $A(n,k)$.
- Xổ số / chọn nhóm không vai: tổ hợp $C(n,k)$.
- Chọn có vai trò khác nhau: chỉnh hợp $A(n,k) = C(n,k) \\cdot k!$.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Một biển số xe gồm 4 chữ số (cho phép lặp). Bao nhiêu biển số?

**Bài 2**: Có 8 người, chọn 5 vào hội đồng (không phân vai). Số cách?

**Bài 3**: Sắp 7 cuốn sách lên kệ (1 hàng). Bao nhiêu cách?

**Bài 4**: Từ 30 sinh viên, chọn lớp trưởng $+$ lớp phó (khác nhau). Số cách?

**Bài 5**: Tính $C(10, 4)$ và $C(10, 6)$. So sánh.

### Lời giải

**Bài 1**: $10^4 = $ **10,000**.

**Bài 2**: $C(8, 5) = 56$.

**Bài 3**: $7! = $ **5,040**.

**Bài 4**: $A(30, 2) = 30 \\cdot 29 = $ **870**.

**Bài 5**: $C(10, 4) = 210$, $C(10, 6) = 210$. **Bằng nhau** (tính chất đối xứng $C(n,k) = C(n,n-k)$).

---

## 8. Bài tiếp theo

[Lesson 04 — Nhị thức Newton & Pascal](../lesson-04-binomial-pascal/).

## 📝 Tổng kết

1. **Cộng (OR)**, **Nhân (AND)** — 2 quy tắc đếm cốt lõi.
2. **Hoán vị** $n!$ — sắp toàn bộ. **Chỉnh hợp** $A(n,k)$ — chọn $+$ sắp $k$. **Tổ hợp** $C(n,k)$ — chỉ chọn.
3. **$C(n,k) = A(n,k)/k!$** — không quan tâm thứ tự thì chia cho $k!$ cách sắp.
4. **Đối xứng**: $C(n,k) = C(n,n-k)$. **Pascal**: $C(n,k) = C(n-1,k-1) + C(n-1,k)$.
5. **Ứng dụng**: mật khẩu, xổ số, xếp lịch, xác suất.
`;
