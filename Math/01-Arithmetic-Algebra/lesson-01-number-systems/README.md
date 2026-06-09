# Lesson 01 — Hệ số học ($\mathbb{N} \to \mathbb{Z} \to \mathbb{Q} \to \mathbb{R}$)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt 4 tập số chính: **$\mathbb{N}$ (tự nhiên), $\mathbb{Z}$ (nguyên), $\mathbb{Q}$ (hữu tỉ), $\mathbb{R}$ (thực)**.
- Hiểu **vì sao** mỗi tập tồn tại — không phải ngẫu nhiên, mà là **mở rộng có lý do**.
- Biết bao hàm: **$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$**.
- Phân biệt **số hữu tỉ** (viết được phân số) và **số vô tỉ** (không viết được).
- Hiểu vì sao **máy tính không lưu chính xác 0.1** (sai số float).

## Kiến thức tiền đề

Không. Cần biết cộng/trừ/nhân/chia tiểu học.

---

## 1. $\mathbb{N}$ — Tập số tự nhiên

### 1.1. Định nghĩa

**$\mathbb{N} = \{0, 1, 2, 3, 4, \ldots\}$** — các số dùng để **đếm**.

💡 **Là gì**: $\mathbb{N}$ là tập "nguyên thủy" — đủ để đếm vật rời rạc (số quả táo, số người).

**Vì sao tồn tại**: Đây là khái niệm số sớm nhất loài người dùng. Có trước cả khái niệm "số 0" (số 0 chỉ xuất hiện ở Ấn Độ ~ thế kỷ 7).

**Quy ước**: Trong tài liệu này, $\mathbb{N}$ **bao gồm 0** (theo chuẩn ISO và lập trình). Một số sách Việt Nam phổ thông cũ định nghĩa $\mathbb{N} = \{1, 2, 3, \ldots\}$, có ký hiệu riêng $\mathbb{N}^* = \{1, 2, \ldots\}$. Khi đọc tài liệu, luôn kiểm tra quy ước.

### 1.2. Vấn đề của $\mathbb{N}$

$\mathbb{N}$ "đóng" dưới $+$ và $\times$ (cộng/nhân 2 số tự nhiên → vẫn tự nhiên). Nhưng KHÔNG đóng dưới $-$:
- $3 - 5 = -2$. Số này không thuộc $\mathbb{N}$.

→ Cần **mở rộng** $\mathbb{N}$ thành tập lớn hơn để phép trừ luôn được.

---

## 2. $\mathbb{Z}$ — Tập số nguyên

### 2.1. Định nghĩa

**$\mathbb{Z} = \{\ldots, -3, -2, -1, 0, 1, 2, 3, \ldots\}$** — số tự nhiên + số nguyên âm.

💡 **Là gì**: $\mathbb{Z}$ thêm vào $\mathbb{N}$ các số âm để **phép trừ luôn có nghĩa**.

**Vì sao tồn tại**: Để mô hình hóa các khái niệm như "nợ", "nhiệt độ dưới 0", "tọa độ trái/phải".

### 2.2. Vấn đề của $\mathbb{Z}$

$\mathbb{Z}$ đóng dưới $+$, $-$, $\times$ nhưng KHÔNG đóng dưới $\div$:
- $1 \div 2 = 0.5$. Không thuộc $\mathbb{Z}$.

→ Cần mở rộng tiếp.

---

## 3. $\mathbb{Q}$ — Tập số hữu tỉ (Rational)

### 3.1. Định nghĩa

**$\mathbb{Q} = \{p/q : p \in \mathbb{Z}, q \in \mathbb{Z}, q \neq 0\}$** — mọi số viết được dưới dạng **phân số**.

💡 **Là gì**: $\mathbb{Q}$ thêm vào $\mathbb{Z}$ các số phân số để phép chia luôn được (trừ chia 0).

**Vì sao tồn tại**: Để chia rời, đo lường, biểu thị tỉ lệ.

**Ví dụ**:
- $1/2 = 0.5$
- $1/3 = 0.333\ldots$ (lặp lại vô hạn)
- $22/7 \approx 3.142857\ldots$ (không phải $\pi$ chính xác)
- $-7 = -7/1$ (mọi số nguyên đều là hữu tỉ)

### 3.2. Đặc trưng

Số hữu tỉ khi viết dưới dạng thập phân thì:
- **Hữu hạn**: $1/4 = 0.25$.
- **Vô hạn LẶP LẠI tuần hoàn**: $1/3 = 0.333\ldots$, $1/7 = 0.142857142857\ldots$

**Đổi ngược thập phân lặp → phân số** (chứng minh $0.333\ldots = 1/3$): đặt $x = 0.333\ldots$. Nhân 10: $10x = 3.333\ldots$. Trừ: $10x - x = 3.333\ldots - 0.333\ldots$ → $9x = 3$ → $x = 3/9 = 1/3$ ✓. Mọi số thập phân lặp tuần hoàn đều đổi về $p/q$ được như vậy → đó là lý do chúng là **hữu tỉ**.

### 3.3. Vấn đề của $\mathbb{Q}$

Có những số **không** viết được dưới dạng $p/q$. Ví dụ kinh điển: **$\sqrt{2}$**.

**Chứng minh $\sqrt{2}$ vô tỉ** (Pythagoras khoảng 500 TCN):
- Giả sử $\sqrt{2} = p/q$ ($p, q$ là số nguyên, đã rút gọn — không cùng chia hết cho số nào).
- Bình phương: $2 = p^2/q^2$ → $p^2 = 2q^2$.
- $p^2$ chẵn → $p$ chẵn. Đặt $p = 2k$.
- $4k^2 = 2q^2$ → $q^2 = 2k^2$ → $q^2$ chẵn → $q$ chẵn.
- Cả $p$ và $q$ đều chẵn → trái với giả thiết "đã rút gọn".
- **Mâu thuẫn** → $\sqrt{2}$ KHÔNG hữu tỉ.

→ Cần mở rộng nữa.

---

## 4. $\mathbb{R}$ — Tập số thực (Real)

### 4.1. Định nghĩa

**$\mathbb{R}$** = mọi số trên **trục số liên tục**, gồm cả hữu tỉ và vô tỉ.

💡 **Là gì**: $\mathbb{R}$ là tập số đầy đủ nhất ta dùng trong giải tích, vật lý — tương ứng với "độ dài liên tục".

**Vì sao tồn tại**: Để có thể nói về độ dài, vị trí, thời gian một cách **liên tục** (không bị "lỗ hổng" như $\mathbb{Q}$).

### 4.2. Số vô tỉ phổ biến

- **$\sqrt{2}$** $\approx 1.4142135\ldots$
- **$\pi$** $\approx 3.1415926\ldots$ (tỉ số chu vi / đường kính hình tròn)
- **$e$** $\approx 2.7182818\ldots$ (cơ số log tự nhiên)
- **$\varphi = (1+\sqrt{5})/2$** $\approx 1.618\ldots$ (tỉ lệ vàng)

### 4.3. Bao hàm

$$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$$

Mỗi tập sau bao gồm tập trước. $\mathbb{R} \setminus \mathbb{Q}$ = tập các số vô tỉ.

### 4.4. Tính chất quan trọng

- **$\mathbb{R}$ liên tục (dày đặc)**: giữa 2 số thực bất kỳ luôn có vô số số thực khác.
- **$\mathbb{R}$ không đếm được**: số phần tử $\mathbb{R}$ "lớn hơn" số phần tử $\mathbb{N}$ (chứng minh đường chéo Cantor — sẽ học ở tầng cao hơn).

**Ví dụ "dày đặc" bằng số**: giữa $0.1$ và $0.2$ có $0.15$; giữa $0.1$ và $0.15$ có $0.125$; cứ thế lấy trung điểm mãi không hết → vô số số ở giữa.

⚠ **Lỗi thường gặp**: tưởng "vô tỉ = số rất lớn" hoặc "vô tỉ = số thập phân dài". Sai — vô tỉ nghĩa là **không viết được dưới dạng $p/q$**. $0.333\ldots$ dài vô hạn nhưng vẫn **hữu tỉ** ($=1/3$); còn $\pi$ mới là vô tỉ. Độ dài thập phân không quyết định, **tính lặp tuần hoàn** mới quyết định.

❓ **Câu hỏi tự nhiên của người đọc**

- *"$0.999\ldots = 1$ thật à?"* Đúng, **bằng nhau** (không phải xấp xỉ). Vì $1/3 = 0.333\ldots$, nhân 3: $1 = 0.999\ldots$. Đây là 2 cách viết của cùng một số.
- *"Có 'nhiều' số vô tỉ hơn hữu tỉ không?"* Có — $\mathbb{Q}$ đếm được còn $\mathbb{R}$ thì không, nên số vô tỉ "nhiều hơn vô hạn lần". Hầu hết số thực là vô tỉ.

🔁 **Dừng lại tự kiểm tra**: $\sqrt{4}$ là số gì (hữu tỉ hay vô tỉ)? Còn $\sqrt{5}$?

<details><summary>Đáp án</summary>

$\sqrt{4} = 2$ → **hữu tỉ** (số nguyên). $\sqrt{5} \approx 2.236\ldots$ không viết được $p/q$ → **vô tỉ** (chứng minh tương tự $\sqrt{2}$).

</details>

### 📝 Tóm tắt mục 1-4

| Tập | Định nghĩa | Mở rộng để có |
|-----|-----------|-----------------|
| $\mathbb{N}$ | $\{0, 1, 2, \ldots\}$ | Đếm |
| $\mathbb{Z}$ | + số âm | Phép trừ |
| $\mathbb{Q}$ | Phân số $p/q$ | Phép chia |
| $\mathbb{R}$ | + số vô tỉ ($\sqrt{2}$, $\pi$, $e$) | Liên tục (giải tích) |

---

## 5. Sai số float trong máy tính

### 5.1. Máy tính dùng nhị phân

Máy tính lưu số ở dạng **nhị phân** (cơ số 2). Một số hữu tỉ thập phân hoàn hảo (vd 0.1) lại là số "lặp vô hạn" trong nhị phân:
- 0.1 (thập phân) = 0.000110011001100... (nhị phân, lặp vô hạn).

Vì máy tính chỉ có hữu hạn bit (64-bit double) → bị **làm tròn** → mất chính xác.

### 5.2. Hệ quả nổi tiếng

Trong mọi ngôn ngữ lập trình (Python, JavaScript, Go...):
```python
0.1 + 0.2 == 0.3   # False!
0.1 + 0.2          # 0.30000000000000004
```

### 5.3. Ý nghĩa

Khi tính toán số thực trên máy, **luôn có sai số nhỏ**. Đây là lý do:
- So sánh hai số thực dùng `abs(a - b) < epsilon` thay vì `a == b`.
- Trong ML/AI: thuật toán cần ổn định với sai số float (robust).

### 📝 Tóm tắt mục 5

- Máy tính lưu số dạng nhị phân hữu hạn bit → không lưu được 0.1 chính xác.
- $0.1 + 0.2 \neq 0.3$ trong mọi ngôn ngữ lập trình.

---

## 6. Bài tập

### Bài tập

**Bài 1**: Số nào thuộc tập nào: $-3$, $0$, $0.5$, $\sqrt{2}$, $\pi$, $22/7$, $0.333\ldots$ (lặp)?

**Bài 2**: Là gì khác nhau giữa $22/7$ và $\pi$?

**Bài 3**: Chứng minh $\sqrt{3}$ cũng là số vô tỉ (theo Pythagoras).

**Bài 4**: Tính `(0.1 + 0.2) - 0.3` trong Python. Vì sao không bằng 0?

**Bài 5**: Sắp xếp từ tập nhỏ nhất tới lớn nhất: $\mathbb{R}$, $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{Q}$.

### Lời giải

**Bài 1**:
- **$-3$**: $\mathbb{Z}$ (cũng thuộc $\mathbb{Q}$, $\mathbb{R}$; KHÔNG thuộc $\mathbb{N}$).
- **$0$**: $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{Q}$, $\mathbb{R}$.
- **$0.5 = 1/2$**: $\mathbb{Q}$, $\mathbb{R}$. KHÔNG $\mathbb{N}$, $\mathbb{Z}$.
- **$\sqrt{2}$**: chỉ $\mathbb{R}$ (vô tỉ).
- **$\pi$**: chỉ $\mathbb{R}$ (vô tỉ).
- **$22/7$**: $\mathbb{Q}$, $\mathbb{R}$.
- **$0.333\ldots$ (lặp)**: $\mathbb{Q}$ ($= 1/3$), $\mathbb{R}$.

**Bài 2**: $22/7$ là số HỮU TỈ, viết được dưới dạng phân số. $\pi$ là số VÔ TỈ, không viết được. $22/7 \approx 3.142857$ — chỉ là **xấp xỉ** cho $\pi$. Hai số khác nhau.

**Bài 3**: Tương tự $\sqrt{2}$:
- Giả sử $\sqrt{3} = p/q$ (đã rút gọn). Bình phương: $3 = p^2/q^2$ → $p^2 = 3q^2$.
- $p^2$ chia hết cho 3 → $p$ chia hết cho 3. Đặt $p = 3k$.
- $9k^2 = 3q^2$ → $q^2 = 3k^2$ → $q$ chia hết cho 3.
- Cả $p$ và $q$ chia hết cho 3 → trái giả thiết. Mâu thuẫn. → $\sqrt{3}$ vô tỉ.

**Bài 4**: Kết quả $\approx 5.55 \times 10^{-17}$. Lý do: 0.1 và 0.2 đều bị làm tròn khi lưu trong nhị phân → kết quả phép cộng bị sai số nhỏ.

**Bài 5**: **$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$**.

---

## 7. Bài tiếp theo

[Lesson 02 — Biểu thức đại số](../lesson-02-algebraic-expressions/).

## 📝 Tổng kết

1. **$\mathbb{N}$** đếm; mở rộng **$\mathbb{Z}$** (số âm cho trừ); **$\mathbb{Q}$** (phân số cho chia); **$\mathbb{R}$** (số vô tỉ cho liên tục).
2. **Số vô tỉ**: $\sqrt{2}$, $\pi$, $e$, $\varphi$ — không viết được $p/q$.
3. **Số hữu tỉ**: thập phân hữu hạn hoặc lặp vô hạn tuần hoàn.
4. **Máy tính**: không lưu chính xác số thập phân → sai số float.
