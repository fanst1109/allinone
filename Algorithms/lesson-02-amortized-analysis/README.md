# Lesson 02 — Phân tích Amortized (Amortized Analysis)

> Tier 0 — Nền tảng phân tích · Lesson 02/05
> Tiền đề: [Lesson 01 — Big-O & phân tích tiệm cận](../lesson-01-bigo-asymptotic/README.md). Nếu chưa nắm O/Θ/Ω và best/avg/worst-case, đọc L01 trước.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao worst-case của một thao tác đơn lẻ có thể gây hiểu lầm**, và amortized cho bức tranh đúng hơn khi đo một **chuỗi** thao tác.
- Phân biệt rạch ròi **amortized** với **average case** — đây là chỗ rất nhiều người nhầm.
- Dùng được **cả 3 phương pháp** phân tích amortized: aggregate, accounting (banker's), potential.
- Chứng minh được các kết quả kinh điển: dynamic array `append` amortized $O(1)$, binary counter increment amortized $O(1)$, stack `multipop` amortized $O(1)$.
- Biết **vì sao slice trong Go grow gấp đôi** chứ không phải +1, và amortized $O(1)$ **không** có nghĩa mọi thao tác đều $O(1)$.

---

## 1. Vấn đề: một thao tác đôi khi đắt, nhưng trung bình rẻ

💡 **Trực giác.** Hãy hình dung bạn dùng một cuốn sổ tay 4 trang. Mỗi lần ghi một dòng là việc rẻ (ghi vào trang còn trống). Nhưng khi cuốn sổ đầy, bạn phải mua cuốn mới to gấp đôi (8 trang) và **chép lại toàn bộ** sang sổ mới — việc này đắt. Nếu chỉ nhìn vào lần "chép lại sổ" đắt nhất rồi kết luận "ghi một dòng là tốn kém", bạn đã hiểu sai: hầu hết các lần ghi là rẻ, chỉ thỉnh thoảng mới đắt, và **chia đều ra thì mỗi lần ghi vẫn rẻ**.

Đó chính xác là tình huống của một **mảng động (dynamic array)** — như `slice` trong Go, `ArrayList` trong Java, `vector` trong C++, `list` trong Python:

- Mảng có sức chứa cố định (capacity). Thêm phần tử vào chỗ trống: $\boldsymbol{O(1)}$.
- Khi đầy, phải cấp phát mảng mới lớn hơn và **copy** mọi phần tử cũ sang: $\boldsymbol{O(n)}$.

Nếu chỉ dựa vào worst-case của một thao tác `append`, ta sẽ nói "append là $O(n)$". Kết luận này **đúng cho một thao tác xấu nhất**, nhưng **sai khi mô tả hiệu năng thực tế** của việc thêm $n$ phần tử lần lượt — vì các lần copy $O(n)$ rất hiếm.

> ⚠ **Lỗi thường gặp.** "Append worst-case $O(n)$ ⇒ thêm $n$ phần tử là $O(n^2)$." **Sai.** Như sẽ chứng minh, thêm $n$ phần tử chỉ tốn $O(n)$ tổng cộng, tức **trung bình $O(1)$ mỗi append**. Nhân worst-case đơn lẻ với $n$ là cách ước lượng **quá bi quan** khi các thao tác đắt hiếm và "bù trừ" cho nhau.

**Phân tích amortized** trả lời câu hỏi: *"Trung bình một thao tác tốn bao nhiêu khi tính trên cả một chuỗi dài các thao tác?"* — chứ không phải *"thao tác xấu nhất tốn bao nhiêu?"*.

> **Định nghĩa.** Chi phí **amortized** của một thao tác là **tổng chi phí thực của một chuỗi $n$ thao tác, chia cho $n$**, lấy theo **chuỗi xấu nhất có thể** (worst-case sequence). Nó cho ta một con số mà nếu nhân với $n$ sẽ là **chặn trên đúng** cho tổng chi phí.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Vậy amortized chỉ là cách nói khác của trung bình?"* — Không hẳn. Xem Mục 2 ngay dưới: amortized **không dùng xác suất**, average case thì có.
- *"Nếu một op vẫn có thể $O(n)$, sao dám nói amortized $O(1)$?"* — Vì ta đo **tổng** chuỗi rồi chia. Một vài op đắt được "trả góp" bởi rất nhiều op rẻ. Mục 4 chứng minh chi tiết.
- *"Amortized có phải là chặn chắc chắn không, hay chỉ kỳ vọng?"* — Là chặn **chắc chắn** (deterministic) cho tổng chuỗi: tổng thực $\leq n \times$ (chi phí amortized). Không có yếu tố may rủi.

---

## 2. Amortized ≠ Average case

Đây là phân biệt quan trọng nhất của cả bài. Hai khái niệm nghe giống nhau ("trung bình") nhưng bản chất khác hẳn:

| | **Amortized** | **Average case** |
|---|---|---|
| Trung bình trên cái gì? | Trên một **chuỗi** thao tác liên tiếp | Trên **phân phối xác suất** của input |
| Có dùng xác suất? | **Không** — hoàn toàn deterministic | **Có** — giả định input ngẫu nhiên theo phân phối nào đó |
| Loại chặn | Chặn **chắc chắn** cho tổng chuỗi (worst-case sequence) | Chặn **kỳ vọng** (expected), có thể sai trên input cụ thể |
| Ví dụ điển hình | `append` dynamic array, increment binary counter | Quicksort với pivot ngẫu nhiên, hash table lookup |

💡 **Trực giác phân biệt.**
- **Average case** giống dự báo thời tiết: "trung bình tháng 5 ở Hà Nội 30°C" — đúng theo phân phối nhiều năm, nhưng hôm nay có thể 38°C. Nó là **kỳ vọng**, phụ thuộc input ngẫu nhiên.
- **Amortized** giống hợp đồng trả góp: bạn ký mua điện thoại trả góp 12 tháng. Có tháng cửa hàng "tốn" nhiều (giao hàng), tháng khác chẳng tốn gì — nhưng **tổng tiền chia 12 là con số chắc chắn**, không phụ thuộc may rủi.

**Ví dụ số minh họa khác biệt:**

1. **Quicksort (average case):** Với pivot chọn ngẫu nhiên, **kỳ vọng** $O(n \log n)$. Nhưng tồn tại input/chuỗi pivot xui khiến nó thành $O(n^2)$. Đây là average theo **xác suất** — không phải amortized.
2. **Dynamic array append (amortized):** Thêm $n$ phần tử **luôn luôn** tốn tổng $O(n)$, **không có** chuỗi nào tệ hơn. Đây là amortized — chắc chắn, không xác suất.
3. **Hash table lookup (average case):** Trung bình $O(1)$ **với giả định hàm hash phân bố đều**. Adversary cố tình tạo collision có thể đẩy lên $O(n)$. Đây là average.
4. **Binary counter increment (amortized):** $n$ lần increment **luôn** tốn $2n$ bit-flip tổng cộng (Mục 6), không phụ thuộc đầu vào. Amortized.

> ⚠ **Lỗi thường gặp.** Gọi quicksort là "amortized $O(n \log n)$". **Sai** — quicksort là **average case** (dựa xác suất pivot). Gọi dynamic array là "average $O(1)$". Cũng **chệch** — nó là **amortized** $O(1)$ (chắc chắn, không xác suất). Dùng đúng từ thể hiện bạn hiểu đúng bản chất.

🔁 **Dừng lại tự kiểm tra.**
1. Một thuật toán có chặn amortized $O(1)$ — có tồn tại input khiến nó chậm hơn không?
2. Một thuật toán có chặn average $O(1)$ — có tồn tại input khiến nó chậm hơn không?

<details><summary>Đáp án</summary>

1. **Một thao tác đơn lẻ** có thể chậm hơn $O(1)$ (vd lần grow), nhưng **tổng chuỗi $n$ thao tác luôn $\leq O(n)$** — không có chuỗi nào phá vỡ chặn này. Amortized là chặn chắc chắn trên tổng.
2. **Có.** Average dựa trên phân phối; tồn tại input cụ thể (vd adversary) khiến chạy chậm hơn nhiều. Chặn average không bảo vệ trước input xấu nhất.

</details>

📝 **Tóm tắt Mục 1–2.**
- Worst-case của một thao tác đơn lẻ có thể gây hiểu lầm khi thao tác đắt là hiếm.
- Amortized = tổng chi phí chuỗi $n$ thao tác $/ n$, lấy theo **chuỗi xấu nhất**, **không dùng xác suất**.
- Amortized ≠ average: amortized là chặn **chắc chắn** trên chuỗi; average là chặn **kỳ vọng** theo phân phối input.

---

## 3. Ba phương pháp phân tích amortized

Có 3 cách chứng minh chặn amortized. Cả ba cho **cùng kết quả** (nếu làm đúng), nhưng tiện trong tình huống khác nhau.

### 3.1 Aggregate method (phương pháp tổng gộp)

💡 **Trực giác.** Cách "thô" nhất: tính **tổng chi phí thực** của $n$ thao tác (gọi là $T(n)$), rồi chia cho $n$. Amortized cost = $T(n) / n$.

- Ưu điểm: đơn giản, không cần khéo léo.
- Nhược điểm: gán **cùng một** chi phí amortized cho mọi loại thao tác — không phân biệt được push rẻ với pop đắt chẳng hạn.

Công thức: $\text{amortized} = T(n) / n$, trong đó $T(n)$ là chặn trên cho tổng chi phí thực của chuỗi xấu nhất gồm $n$ thao tác.

### 3.2 Accounting method (phương pháp kế toán / banker's method)

💡 **Trực giác.** Gán cho mỗi thao tác một **chi phí amortized** (giá "tính tiền"). Khi giá tính tiền **cao hơn** chi phí thực, phần dư được lưu lại như **credit** (tiền gửi ngân hàng) — gắn vào một phần tử cụ thể trong cấu trúc dữ liệu. Khi một thao tác có chi phí thực **cao hơn** giá tính tiền, nó **rút credit** đã gửi để bù.

**Điều kiện then chốt (bất biến):** tổng credit **không bao giờ âm** tại mọi thời điểm. Nếu giữ được điều này thì:

> tổng chi phí amortized $\geq$ tổng chi phí thực ⟹ chi phí amortized là **chặn trên hợp lệ**.

Lý do: tổng amortized = tổng thực + (credit còn dư) $\geq$ tổng thực, vì credit dư $\geq 0$.

💡 **Hình dung "credit gắn vào phần tử".** Khi append một phần tử rẻ, ta "trả dư" — số dư đó dán vào chính phần tử vừa thêm như một con tem. Sau này khi grow phải copy phần tử đó, con tem trả tiền cho cú copy. Mỗi phần tử tự mang sẵn tiền để trả cho lần bị copy của nó.

### 3.3 Potential method (phương pháp hàm thế)

💡 **Trực giác.** Tổng quát hóa accounting. Định nghĩa một **hàm thế (potential function)** $\Phi$ ánh xạ trạng thái cấu trúc dữ liệu → một số thực (giống "thế năng" trong vật lý — năng lượng tích trữ sẵn để chi sau).

Chi phí amortized của thao tác thứ $i$:

$$\text{amortized}_i = \text{actual}_i + (\Phi_i - \Phi_{i-1}) = \text{actual}_i + \Delta\Phi$$

trong đó $\Phi_i$ là thế **sau** thao tác $i$, $\Phi_{i-1}$ là thế **trước** nó.

Cộng dồn cả chuỗi (telescoping — các số hạng $\Phi$ triệt tiêu lẫn nhau):

$$\sum \text{amortized}_i = \sum \text{actual}_i + (\Phi_n - \Phi_0)$$

**Điều kiện then chốt:** chọn $\Phi$ sao cho $\Phi_0 = 0$ và $\Phi_i \geq 0$ với mọi $i$. Khi đó $\Phi_n - \Phi_0 \geq 0$, nên:

$$\sum \text{actual}_i \leq \sum \text{amortized}_i$$

⟹ tổng amortized là chặn trên cho tổng thực. Đúng tinh thần của accounting, nhưng $\Phi$ cho phép định nghĩa "credit toàn cục" linh hoạt hơn.

> ❓ **Khi nào dùng cái nào?** Aggregate khi mọi op gần giống nhau và dễ tính tổng. Accounting khi muốn gán giá khác nhau cho từng loại op (push vs pop). Potential khi credit phụ thuộc **trạng thái tổng thể** (vd "số phần tử hiện có" của mảng) hơn là từng phần tử riêng lẻ. Trong thực hành, potential là mạnh và phổ biến nhất.

📝 **Tóm tắt Mục 3.**
- **Aggregate:** $T(n)/n$. Đơn giản, một giá cho mọi op.
- **Accounting:** gán giá amortized cho từng op; credit ($\geq 0$ luôn) gắn vào phần tử để trả op đắt sau.
- **Potential:** $\text{amortized} = \text{actual} + \Delta\Phi$; chọn $\Phi \geq 0$, $\Phi_0 = 0$ ⟹ tổng amortized $\geq$ tổng thực.

---

## 4. Ví dụ kinh điển 1 — Dynamic array (`append`)

### 4.1 Cơ chế

Mảng động lưu hai số: `length` (số phần tử thực) và `capacity` (sức chứa đã cấp phát). Quy tắc grow phổ biến: **khi length = capacity, cấp phát mảng mới với capacity ×2, copy toàn bộ phần tử cũ sang, rồi mới thêm phần tử mới.**

- Append vào chỗ còn trống ($\text{length} < \text{capacity}$): chi phí **1** (ghi 1 ô).
- Append khi đầy ($\text{length} = \text{capacity}$): chi phí **1 + copy length phần tử** $\approx$ **length + 1** (đắt).

### 4.2 Walk-through bằng số thật — append 1..16 (bắt đầu capacity 1)

Theo dõi từng lần append. Cột "copy" = số phần tử phải chép khi grow tại bước đó:

| Append # | length trước | capacity trước | Có grow? | copy phần tử cũ | capacity sau |
|:--:|:--:|:--:|:--:|:--:|:--:|
| 1 | 0 | 1 | không | 0 | 1 |
| 2 | 1 | 1 | **grow** | **1** | 2 |
| 3 | 2 | 2 | **grow** | **2** | 4 |
| 4 | 3 | 4 | không | 0 | 4 |
| 5 | 4 | 4 | **grow** | **4** | 8 |
| 6 | 5 | 8 | không | 0 | 8 |
| 7 | 6 | 8 | không | 0 | 8 |
| 8 | 7 | 8 | không | 0 | 8 |
| 9 | 8 | 8 | **grow** | **8** | 16 |
| 10–16 | … | 16 | không | 0 | 16 |

**Tổng số phần tử bị copy** qua 16 lần append:

$$1 + 2 + 4 + 8 = 15$$

Đây là tổng cấp số nhân $1 + 2 + 4 + 8 = 2^4 - 1 = 15 < 16 = n$.

**Tổng chi phí** = (16 lần ghi phần tử mới) + (15 lần copy) = $16 + 15 = 31 \approx 2n$.

> 💡 **Phát hiện then chốt.** Tổng copy $1+2+4+...$ là cấp số nhân với công bội 2. Tổng của nó **luôn $<$ số hạng cuối $\times 2 < 2n$**. Đây là lý do toán học khiến copy "không bao giờ kịp đắt": dù mỗi cú grow tốn gấp đôi cú trước, nhưng cú trước đó đã "tích lũy" đủ thao tác rẻ để trả.

### 4.3 Chứng minh amortized O(1) — cả 3 phương pháp

**Phương pháp 1: Aggregate.**

Tổng chi phí của n lần append (với capacity bắt đầu là 1, grow ×2):

```
T(n) = n (ghi n phần tử mới)
     + (1 + 2 + 4 + ... + 2^{⌊log₂ n⌋})   (các lần copy)
     ≤ n + 2n
     = 3n              (chặn trên thô; thực tế ≈ 2n)
```

(Tổng cấp số nhân $1 + 2 + ... + 2^k = 2^{k+1} - 1 < 2 \cdot 2^k \leq 2n$.)

Vậy amortized cost = $T(n) / n \leq 3n / n = 3 = O(1)$. ∎

Kiểm tra với $n = 16$: $T(16) = 31$, amortized = $31/16 \approx 1{,}94$. Hằng số, không tăng theo $n$. ✓

**Phương pháp 2: Accounting.**

Gán **chi phí amortized = 3** cho mỗi append. Phân bổ 3 đơn vị đó như sau:
- **1 đơn vị** trả cho việc ghi chính phần tử vừa thêm (chi phí thực).
- **2 đơn vị** lưu thành credit, dán vào phần tử vừa thêm (1 cho "lần copy chính nó sắp tới", 1 cho "copy một phần tử cũ đã hết credit").

**Vì sao 2 đơn vị credit là đủ?** Xét cú grow từ capacity $m$ lên $2m$. Phải copy $m$ phần tử. Trong $m$ phần tử đó:
- $m/2$ phần tử là **mới thêm** kể từ lần grow trước (từ length $m/2$ lên $m$) — mỗi cái còn nguyên 2 credit chưa tiêu.
- $m/2$ phần tử cũ hơn đã tiêu credit ở lần grow trước.

$m/2$ phần tử mới $\times 2$ credit = $m$ credit. Vừa đủ trả cho $m$ phần tử cần copy. Bất biến "credit $\geq 0$" được giữ. ∎

Walk-through credit (capacity bắt đầu 2, để dễ thấy):

| Append | actual | amortized | credit ngân hàng |
|:--:|:--:|:--:|:--:|
| 1 | 1 | 3 | 0 + 2 = 2 |
| 2 | 1 | 3 | 2 + 2 = 4 |
| 3 (grow: copy 2) | 1+2=3 | 3 | 4 + 2 − 2 = 4 |
| 4 | 1 | 3 | 4 + 2 = 6 |
| 5 (grow: copy 4) | 1+4=5 | 3 | 6 + 2 − 4 = 4 |

Credit luôn $\geq 0$ ✓. Tổng amortized (3 mỗi op) $\geq$ tổng actual ⟹ amortized $O(1)$. ∎

**Phương pháp 3: Potential.**

Chọn hàm thế:

$$\Phi = 2 \cdot \text{length} - \text{capacity}$$

Kiểm tra điều kiện:
- **$\Phi \geq 0$?** Ngay sau một cú grow, $\text{length} = \text{capacity}/2$ cũ... Thực ra ngay sau grow $\text{capacity}$ mới $= 2 \times \text{length}$ cũ, $\text{length} = \text{capacity}_\text{cũ}$; khi mảng ít nhất nửa đầy thì $2 \cdot \text{length} \geq \text{capacity}$. Mảng động luôn duy trì $\text{length} \geq \text{capacity}/2$ ngay sau mỗi grow, nên $\Phi = 2 \cdot \text{length} - \text{capacity} \geq 0$. ✓ (Tại trạng thái đầy $\text{length} = \text{capacity}$: $\Phi = 2c - c = c \geq 0$.)
- **$\Phi_0 = 0$?** Mảng rỗng $\text{length} = 0, \text{capacity} = 0$: $\Phi = 0$. ✓

Tính amortized cho hai trường hợp:

**(a) Append không grow** ($\text{length} < \text{capacity}$): actual = 1. length tăng 1, capacity không đổi.

$$\Delta\Phi = 2 \cdot (\text{length}+1) - \text{capacity} - (2 \cdot \text{length} - \text{capacity}) = 2$$
$$\text{amortized} = \text{actual} + \Delta\Phi = 1 + 2 = 3 = O(1) \quad \checkmark$$

**(b) Append có grow** ($\text{length} = \text{capacity} = c$): actual = $c + 1$ (copy $c$ + ghi 1). Sau grow: $\text{length}' = c+1, \text{capacity}' = 2c$.

$$\begin{aligned}
\Phi_\text{trước} &= 2c - c = c \\
\Phi_\text{sau} &= 2(c+1) - 2c = 2 \\
\Delta\Phi &= 2 - c \\
\text{amortized} &= \text{actual} + \Delta\Phi = (c + 1) + (2 - c) = 3 = O(1) \quad \checkmark
\end{aligned}$$

Cả hai trường hợp đều cho amortized = $\boldsymbol{3 = O(1)}$. ∎

> 💡 **Vẻ đẹp của potential method.** Cú grow đắt $O(c)$ được "hấp thụ" hoàn hảo: thế $\Phi$ sụt từ $c$ xuống $2$, và $\Delta\Phi = 2 - c$ âm vừa đủ để triệt tiêu $c$ trong actual. $\Phi$ chính là "kho credit" đã tích từ các append rẻ trước đó.

### 4.4 Vì sao gấp đôi (×2), không phải +1 hay +100?

Đây là câu hỏi thực tế quan trọng. So sánh chiến lược grow:

**Chiến lược "+1" (mỗi lần đầy thì tăng capacity thêm đúng 1):** Mỗi append đều grow (vì luôn vừa đầy), copy toàn bộ. Tổng copy cho $n$ append:

$$0 + 1 + 2 + 3 + ... + (n-1) = n(n-1)/2 = \Theta(n^2)$$

Amortized = $\Theta(n^2)/n = \Theta(n)$ — **tệ!** Thêm $n$ phần tử mất $O(n^2)$.

Kiểm tra $n = 16$, chiến lược +1: tổng copy = $0+1+2+...+15 = 120$. So với ×2 chỉ tốn 15. Gấp **8 lần** và còn tệ hơn khi $n$ lớn.

**Chiến lược "+k" (tăng capacity thêm hằng $k$ mỗi lần):** Grow xảy ra mỗi $k$ append. Tổng copy:

$$k + 2k + 3k + ... \approx k \cdot (n/k)^2/2 = n^2/(2k) = \Theta(n^2)$$

Vẫn $\boldsymbol{\Theta(n^2)}$ với mọi hằng $k$ cố định — chỉ giảm hằng số, không đổi bậc. Amortized vẫn $O(n)$.

**Chiến lược "×c" (nhân capacity với hằng $c > 1$, vd ×2, ×1.5):** Tổng copy là cấp số nhân:

$$1 + c + c^2 + ... \approx c^{\log_c n} \cdot c/(c-1) = n \cdot c/(c-1) = \Theta(n)$$

Amortized = $\Theta(n)/n = \Theta(1)$ — $\boldsymbol{O(1)}$! Với mọi $c > 1$.

> ⚠ **Lỗi thường gặp.** Nghĩ "tăng thêm 100 mỗi lần là đủ nhanh vì 100 lớn". **Sai** — bất kỳ chiến lược **cộng hằng** nào (+1, +100, +1000) đều cho amortized $\boldsymbol{O(n)}$ (chỉ khác hằng số). Chỉ **nhân theo hệ số** (growth factor $> 1$) mới cho amortized $\boldsymbol{O(1)}$. Bậc của thuật toán quyết định bởi *tỉ lệ tăng*, không phải *bước nhảy tuyệt đối*.

| Chiến lược | Tổng copy n=16 | Tổng copy tổng quát | Amortized |
|---|:--:|:--:|:--:|
| +1 | 120 | $\Theta(n^2)$ | $\Theta(n)$ |
| +4 | ~30 | $\Theta(n^2)$ | $\Theta(n)$ |
| ×1.5 | ~30 | $\Theta(n)$ | $\boldsymbol{\Theta(1)}$ |
| ×2 | 15 | $\Theta(n)$ | $\boldsymbol{\Theta(1)}$ |

> ❓ **Vậy sao không ×10 cho ít copy hơn?** Đánh đổi **bộ nhớ phí phạm**: ×2 phí tối đa ~50% (vừa grow xong dùng nửa). ×10 có thể phí tới 90%. Go dùng ~×2 cho slice nhỏ rồi giảm dần hệ số (~×1.25) khi slice lớn — cân bằng tốc độ và bộ nhớ. Xem Mục 7.

### 4.5 Code Go inline — dynamic array tự implement, đếm copy

```go
package main

import "fmt"

// DynArray: mảng động tự implement để quan sát chi phí grow.
// Go đã có slice làm sẵn việc này — đây là bản "mổ xẻ" để học.
type DynArray struct {
	data      []int
	length    int
	capacity  int
	totalCopy int // tổng số phần tử đã copy (để verify amortized)
}

// Append thêm 1 phần tử; grow ×2 khi đầy. Trả về chi phí thực của lần này.
func (a *DynArray) Append(x int) int {
	cost := 1 // ghi 1 phần tử mới luôn tốn 1
	if a.length == a.capacity {
		// Grow: capacity mới = max(1, capacity×2)
		newCap := a.capacity * 2
		if newCap == 0 {
			newCap = 1
		}
		newData := make([]int, newCap)
		// copy toàn bộ phần tử cũ — đây là phần đắt O(length)
		for i := 0; i < a.length; i++ {
			newData[i] = a.data[i]
		}
		cost += a.length        // chi phí copy
		a.totalCopy += a.length // ghi nhận để verify
		a.data = newData
		a.capacity = newCap
	}
	a.data[a.length] = x
	a.length++
	return cost
}

func main() {
	a := &DynArray{}
	n := 16
	totalCost := 0
	fmt.Printf("%-8s %-10s %-10s %-8s\n", "append#", "capacity", "thisCost", "grew?")
	for i := 1; i <= n; i++ {
		prevCap := a.capacity
		c := a.Append(i)
		totalCost += c
		grew := ""
		if a.capacity != prevCap {
			grew = "GROW"
		}
		fmt.Printf("%-8d %-10d %-10d %-8s\n", i, a.capacity, c, grew)
	}
	fmt.Printf("\nTong copy        = %d  (= 1+2+4+8 = 15, ~ n)\n", a.totalCopy)
	fmt.Printf("Tong chi phi     = %d  (~ 2n)\n", totalCost)
	fmt.Printf("Amortized / op   = %.3f  (hang so -> O(1))\n", float64(totalCost)/float64(n))
}
```

In ra (rút gọn):

```
append#  capacity   thisCost   grew?
1        1          1
2        2          2          GROW
3        4          3          GROW
...
9        16         9          GROW
...
16       16         1

Tong copy        = 15  (= 1+2+4+8 = 15, ~ n)
Tong chi phi     = 31  (~ 2n)
Amortized / op   = 1.938  (hang so -> O(1))
```

Số liệu khớp chính xác bảng walk-through Mục 4.2: tổng copy 15, tổng chi phí 31, amortized $\approx 1{,}94$ (hằng số). ✓

🔁 **Dừng lại tự kiểm tra.**
1. Nếu bắt đầu append với capacity 1 và grow ×2, sau khi thêm đúng 1025 phần tử, có bao nhiêu lần grow đã xảy ra?
2. Tổng số phần tử bị copy là bao nhiêu?

<details><summary>Đáp án</summary>

1. Capacity đi 1→2→4→...→2048. Grow tại append thứ 2, 3, 5, 9, ..., 1025 (khi vừa đầy $2^k$). Số lần grow = số lũy thừa của 2 từ 1 đến 1024 = **11 lần** (capacity cuối 2048 $\geq 1025$).
2. Tổng copy = $1 + 2 + 4 + ... + 1024 = 2^{11} - 1 = 2047 < 2 \cdot 1025$. Vẫn $\sim 2n$. Amortized vẫn $O(1)$. ✓

</details>

📝 **Tóm tắt Mục 4.**
- Dynamic array grow ×2: append amortized $\boldsymbol{O(1)}$ dù worst-case 1 op là $O(n)$.
- Tổng copy $1+2+4+... < 2n$ (cấp số nhân) ⟹ tổng chi phí $O(n)$.
- Chứng minh được bằng cả aggregate ($T(n)/n \leq 3$), accounting (3 credit/op), potential ($\Phi = 2 \cdot \text{length} - \text{capacity}$).
- **Cộng hằng (+k) → amortized $O(n)$; nhân hệ số (×c, c>1) → amortized $O(1)$.** Bậc do tỉ lệ tăng quyết định.

---

## 5. Ví dụ 2 — Stack với `multipop`

### 5.1 Cơ chế

Một stack hỗ trợ 3 thao tác:
- `Push(x)`: thêm x lên đỉnh — chi phí **1**.
- `Pop()`: lấy 1 phần tử khỏi đỉnh — chi phí **1**.
- `MultiPop(k)`: pop `min(k, size)` phần tử — chi phí $\boldsymbol{\min(k, \text{size})}$ (đắt khi $k$ lớn!).

Nhìn riêng lẻ, `MultiPop(k)` có thể tốn $O(n)$ (pop sạch stack $n$ phần tử). Nếu nhân worst-case với $n$ thao tác, ta ngây thơ kết luận $O(n^2)$. Nhưng amortized thực ra là $\boldsymbol{O(1)}$ mỗi thao tác.

### 5.2 Chứng minh amortized O(1)

💡 **Trực giác cốt lõi.** *Mỗi phần tử chỉ có thể bị pop **một lần** sau khi đã được push một lần.* Bạn không thể pop ra nhiều hơn số đã đẩy vào. Nên dù `MultiPop` một lần có thể đắt, **tổng số thao tác pop trên toàn chuỗi không bao giờ vượt quá tổng số push**.

**Aggregate:** Trong chuỗi n thao tác bất kỳ, mỗi `Push` đưa ≤ 1 phần tử vào. Tổng số phần tử từng được push ≤ n. Mỗi phần tử bị pop tối đa 1 lần (qua `Pop` hoặc `MultiPop`). Vậy:
```
tổng chi phí pop (gồm cả multipop) ≤ tổng số push ≤ n
tổng chi phí push ≤ n
T(n) ≤ 2n
amortized = T(n)/n ≤ 2 = O(1)  ∎
```

**Accounting:** Gán amortized:
- `Push`: chi phí amortized **2** (1 trả cho push, 1 lưu credit dán vào phần tử vừa push — "vé pop tương lai").
- `Pop` / mỗi phần tử trong `MultiPop`: chi phí amortized **0** — vì lấy credit từ phần tử để trả cú pop của nó.

Credit không bao giờ âm (mỗi phần tử trên stack mang đúng 1 credit chưa tiêu). Tổng amortized $= 2 \times$ (số push) $\geq T(n)$. ⟹ $O(1)$. ∎

**Potential:** Chọn $\Phi = $ số phần tử hiện có trong stack. $\Phi \geq 0$, $\Phi_0 = 0$. ✓
- `Push`: actual 1, $\Delta\Phi = +1$ ⟹ amortized $= 1 + 1 = \boldsymbol{2}$.
- `Pop`: actual 1, $\Delta\Phi = -1$ ⟹ amortized $= 1 - 1 = \boldsymbol{0}$.
- `MultiPop(k)`, pop $j = \min(k, \text{size})$ phần tử: actual $= j$, $\Delta\Phi = -j$ ⟹ amortized $= j - j = \boldsymbol{0}$.

Mọi op amortized $\leq 2 = O(1)$. ∎

### 5.3 Walk-through bằng số thật

Chuỗi: `Push 1, Push 2, Push 3, Push 4, MultiPop(3), Push 5, Pop`.

| Thao tác | actual | size sau | $\Phi$ sau | amortized $= \text{actual} + \Delta\Phi$ |
|---|:--:|:--:|:--:|:--:|
| Push 1 | 1 | 1 | 1 | $1 + 1 = 2$ |
| Push 2 | 1 | 2 | 2 | $1 + 1 = 2$ |
| Push 3 | 1 | 3 | 3 | $1 + 1 = 2$ |
| Push 4 | 1 | 4 | 4 | $1 + 1 = 2$ |
| MultiPop(3) | 3 | 1 | 1 | $3 + (-3) = 0$ |
| Push 5 | 1 | 2 | 2 | $1 + 1 = 2$ |
| Pop | 1 | 1 | 1 | $1 + (-1) = 0$ |

Tổng actual $= 1+1+1+1+3+1+1 = 9$. Tổng amortized $= 2+2+2+2+0+2+0 = 10 \geq 9$ ✓. Trung bình amortized $= 10/7 \approx 1{,}43 \leq 2$. MultiPop(3) "đắt" actual $= 3$ nhưng amortized $= 0$ vì nó tiêu credit đã tích từ 3 push trước. ✓

### 5.4 Code Go inline — stack multipop, in actual vs amortized

```go
package main

import "fmt"

type Stack struct {
	data []int
}

func (s *Stack) Push(x int) int { // chi phí thực: 1
	s.data = append(s.data, x)
	return 1
}

func (s *Stack) Pop() int { // chi phí thực: 1 (nếu không rỗng)
	if len(s.data) == 0 {
		return 0
	}
	s.data = s.data[:len(s.data)-1]
	return 1
}

// MultiPop: pop min(k, size) phần tử; chi phí thực = số phần tử pop ra
func (s *Stack) MultiPop(k int) int {
	popped := 0
	for k > 0 && len(s.data) > 0 {
		s.data = s.data[:len(s.data)-1]
		popped++
		k--
	}
	return popped
}

func main() {
	s := &Stack{}
	type op struct {
		name string
		fn   func() int
	}
	// chuỗi thao tác y hệt bảng walk-through
	ops := []op{
		{"Push 1", func() int { return s.Push(1) }},
		{"Push 2", func() int { return s.Push(2) }},
		{"Push 3", func() int { return s.Push(3) }},
		{"Push 4", func() int { return s.Push(4) }},
		{"MultiPop(3)", func() int { return s.MultiPop(3) }},
		{"Push 5", func() int { return s.Push(5) }},
		{"Pop", func() int { return s.Pop() }},
	}
	totalActual := 0
	for _, o := range ops {
		c := o.fn()
		totalActual += c
		fmt.Printf("%-14s actual=%d  size=%d\n", o.name, c, len(s.data))
	}
	n := len(ops)
	fmt.Printf("\nTong actual    = %d\n", totalActual)
	fmt.Printf("Amortized / op = %.3f  (<= 2 -> O(1))\n", float64(totalActual)/float64(n))
}
```

In ra:

```
Push 1         actual=1  size=1
Push 2         actual=1  size=2
Push 3         actual=1  size=3
Push 4         actual=1  size=4
MultiPop(3)    actual=3  size=1
Push 5         actual=1  size=2
Pop            actual=1  size=1

Tong actual    = 9
Amortized / op = 1.286  (<= 2 -> O(1))
```

Khớp bảng 5.3 (tổng actual 9). ✓

📝 **Tóm tắt Mục 5.**
- `MultiPop(k)` đắt $O(n)$ một lần, nhưng amortized $\boldsymbol{O(1)}$ vì tổng pop $\leq$ tổng push.
- Trực giác: mỗi phần tử push 1 lần, pop tối đa 1 lần.
- $\Phi = $ số phần tử trong stack: push amortized 2, pop/multipop amortized 0.

---

## 6. Ví dụ 3 — Binary counter increment

### 6.1 Cơ chế

Một bộ đếm nhị phân $k$ bit, bắt đầu từ 0. Thao tác `Increment()` cộng 1. Chi phí = **số bit bị lật (flip)**.

Increment hoạt động: lật các bit 1 ở đuôi thành 0 (carry), rồi lật bit 0 đầu tiên thành 1.
```
0011 + 1 = 0100   → lật 3 bit (hai bit 1 đuôi thành 0, một bit 0 thành 1)
0100 + 1 = 0101   → lật 1 bit
```

Worst-case một increment lật cả $k$ bit (vd `0111 → 1000`). Nhưng amortized chỉ $\boldsymbol{O(1)}$ (chính xác là 2 flip/increment).

### 6.2 Walk-through bằng số thật — đếm flip từ 0 đến 16

| Increment | Giá trị (binary) | bit bị lật | flip lần này | tổng flip |
|:--:|:--:|---|:--:|:--:|
| → 1 | 0001 | bit0 | 1 | 1 |
| → 2 | 0010 | bit0,1 | 2 | 3 |
| → 3 | 0011 | bit0 | 1 | 4 |
| → 4 | 0100 | bit0,1,2 | 3 | 7 |
| → 5 | 0101 | bit0 | 1 | 8 |
| → 6 | 0110 | bit0,1 | 2 | 10 |
| → 7 | 0111 | bit0 | 1 | 11 |
| → 8 | 1000 | bit0,1,2,3 | 4 | 15 |
| → 9 | 1001 | bit0 | 1 | 16 |
| → 10 | 1010 | bit0,1 | 2 | 18 |
| → 11 | 1011 | bit0 | 1 | 19 |
| → 12 | 1100 | bit0,1,2 | 3 | 22 |
| → 13 | 1101 | bit0 | 1 | 23 |
| → 14 | 1110 | bit0,1 | 2 | 25 |
| → 15 | 1111 | bit0 | 1 | 26 |
| → 16 | 10000 | bit0,1,2,3,4 | 5 | 31 |

**Tổng flip cho 16 increment $= 31 < 2 \cdot 16 = 32$.** Amortized $= 31/16 \approx 1{,}94 < 2$. ✓

> 💡 **Vì sao tổng $= \sim 2n$?** Đếm theo bit thay vì theo increment:
> - **bit0** lật mỗi increment ⟹ $n$ lần.
> - **bit1** lật mỗi 2 increment ⟹ $n/2$ lần.
> - **bit2** lật mỗi 4 increment ⟹ $n/4$ lần.
> - …
>
> Tổng flip $= n + n/2 + n/4 + n/8 + ... = n \cdot (1 + \tfrac{1}{2} + \tfrac{1}{4} + ...) < 2n$. Lại là cấp số nhân hội tụ — đúng "linh hồn" của amortized.

Kiểm tra $n=16$: $16 + 8 + 4 + 2 + 1 = 31$. Khớp tổng cột walk-through. ✓

### 6.3 Chứng minh amortized O(1) bằng potential method

Chọn $\Phi = $ số bit 1 trong bộ đếm. $\Phi \geq 0$, $\Phi_0 = 0$ (đếm bắt đầu từ 0). ✓

Xét một increment lật $t$ bit 1 ở đuôi thành 0 (carry), rồi set 1 bit 0 thành 1.
- **actual** $= t + 1$ (lật $t$ bit thành 0, lật 1 bit thành 1).
- Số bit 1 thay đổi: mất $t$ bit 1, thêm $1$ bit 1 ⟹ $\Delta\Phi = 1 - t$.
- **amortized** $= \text{actual} + \Delta\Phi = (t + 1) + (1 - t) = 2 = O(1)$. ∎

> Mỗi increment amortized đúng **2 flip**, độc lập với $t$ (số carry). Cú increment xui xẻo `0111→1000` có actual $= 4$ nhưng amortized vẫn 2: $\Delta\Phi = 1 - 3 = -2$ (mất 3 bit 1, được 1 bit 1) triệt tiêu 2 đơn vị actual dư.

### 6.4 Code Go inline — binary counter, đếm flip

```go
package main

import "fmt"

// BinaryCounter k bit. bits[0] = bit thấp nhất (LSB).
type BinaryCounter struct {
	bits      []int
	totalFlip int
}

// Increment cộng 1; trả về số bit lật trong lần này.
func (c *BinaryCounter) Increment() int {
	flips := 0
	i := 0
	// lật các bit 1 ở đuôi thành 0 (carry)
	for i < len(c.bits) && c.bits[i] == 1 {
		c.bits[i] = 0
		flips++
		i++
	}
	// lật bit 0 đầu tiên thành 1 (nếu còn chỗ)
	if i < len(c.bits) {
		c.bits[i] = 1
		flips++
	}
	c.totalFlip += flips
	return flips
}

func (c *BinaryCounter) String() string {
	s := ""
	for i := len(c.bits) - 1; i >= 0; i-- {
		s += fmt.Sprintf("%d", c.bits[i])
	}
	return s
}

func main() {
	c := &BinaryCounter{bits: make([]int, 5)} // 5 bit, đếm tới 31
	n := 16
	fmt.Printf("%-10s %-8s %-6s %-8s\n", "value", "binary", "flip", "totalFlip")
	for i := 1; i <= n; i++ {
		f := c.Increment()
		fmt.Printf("%-10d %-8s %-6d %-8d\n", i, c.String(), f, c.totalFlip)
	}
	fmt.Printf("\nTong flip      = %d  (< 2n = %d)\n", c.totalFlip, 2*n)
	fmt.Printf("Amortized / op = %.3f  (< 2 -> O(1))\n", float64(c.totalFlip)/float64(n))
}
```

In ra (rút gọn):

```
value      binary   flip   totalFlip
1          00001    1      1
2          00010    2      3
3          00011    1      4
4          00100    3      7
...
8          01000    4      15
...
16         10000    5      31

Tong flip      = 31  (< 2n = 32)
Amortized / op = 1.938  (< 2 -> O(1))
```

Khớp chính xác bảng 6.2: tổng flip 31, amortized $\approx 1{,}94$. ✓

🔁 **Dừng lại tự kiểm tra.**
1. Increment từ giá trị `01111` (15) lên `10000` (16) lật bao nhiêu bit?
2. Tổng flip cho 32 increment (0→32) là bao nhiêu?

<details><summary>Đáp án</summary>

1. `01111 → 10000`: lật 4 bit 1 đuôi thành 0, lật 1 bit thành 1 = **5 flip** (worst-case của bộ đếm này — đắt nhất).
2. Tổng $= 32 + 16 + 8 + 4 + 2 + 1 = 63 = 2 \cdot 32 - 1 < 64$. Amortized $63/32 \approx 1{,}97 < 2$. ✓ (Tổng flip cho $n$ increment luôn là $2n - $ (số bit 1 trong $n$), ở đây $2 \cdot 32 - 1 = 63$ vì 32 = `100000` có 1 bit.)

</details>

📝 **Tóm tắt Mục 6.**
- Binary counter increment: worst-case 1 op lật $k$ bit, nhưng amortized $\boldsymbol{2 \text{ flip} = O(1)}$.
- Tổng flip $n$ increment $= n + n/2 + n/4 + ... < 2n$ (cấp số nhân).
- $\Phi = $ số bit 1: mỗi increment amortized $= \text{actual} + \Delta\Phi = 2$.

---

## 7. Ứng dụng thực tế

### 7.1 Go slice `append` — chính là dynamic array

`append` trong Go dùng đúng cơ chế Mục 4: khi `len == cap`, runtime cấp `cap` mới lớn hơn và copy. Đây là lý do **Go slice append amortized $O(1)$** (đã đề cập [Programming Lesson 12](../../Programming/lesson-12-slices-maps/README.md) nếu có). Chi tiết growth factor của Go (runtime `growslice`):

- Slice nhỏ (cap < 256): nhân ~**×2**.
- Slice lớn (cap ≥ 256): hệ số giảm dần về ~**×1.25** — tiết kiệm bộ nhớ cho slice to.

Cả hai đều là "nhân hệ số $> 1$" ⟹ amortized $O(1)$. Đây là minh chứng thực tế cho phân tích "vì sao ×c chứ không +k" ở Mục 4.4.

```go
package main

import "fmt"

func main() {
	s := make([]int, 0)
	prevCap := cap(s)
	for i := 0; i < 2000; i++ {
		s = append(s, i)
		if cap(s) != prevCap {
			fmt.Printf("len=%-5d cap nhay %d -> %d  (x%.2f)\n",
				len(s), prevCap, cap(s), float64(cap(s))/float64(max(prevCap, 1)))
			prevCap = cap(s)
		}
	}
}

func max(a, b int) int { if a > b { return a }; return b }
```

In ra (môi trường Go điển hình; con số có thể khác theo version):

```
len=1     cap nhay 0 -> 1     (x1.00)
len=2     cap nhay 1 -> 2     (x2.00)
len=3     cap nhay 2 -> 4     (x2.00)
len=5     cap nhay 4 -> 8     (x2.00)
...
len=513   cap nhay 512 -> 848 (x1.66)   <- he so giam dan khi slice lon
...
```

Quan sát: hệ số grow ~×2 khi nhỏ, giảm dần khi lớn — đúng như mô tả.

### 7.2 Hash table resize

Hash table khi load factor vượt ngưỡng (vd 0.75) sẽ **rehash**: cấp bảng mới gấp đôi số bucket và đặt lại mọi phần tử — một thao tác $O(n)$. Nhưng vì cũng theo chiến lược **nhân đôi**, chi phí rehash phân bổ amortized $\boldsymbol{O(1)}$ mỗi insert. (Lookup vẫn là *average* $O(1)$ — chú ý đây là khái niệm khác, xem Mục 2.)

### 7.3 Splay tree

Splay tree không cân bằng cứng như AVL/Red-Black, nhưng mỗi thao tác (find/insert/delete) "splay" node vừa truy cập lên gốc. Một thao tác đơn lẻ có thể $O(n)$, nhưng amortized $\boldsymbol{O(\log n)}$ — chứng minh bằng potential method tinh vi ($\Phi$ dựa trên kích thước cây con).

### 7.4 Union-Find với path compression (tease Tier 5)

`union-find` (disjoint set) với path compression + union by rank: một dãy $m$ thao tác trên $n$ phần tử tốn tổng $O(m \cdot \alpha(n))$, với $\alpha$ là hàm Ackermann nghịch — $\leq 4$ trên mọi giá trị thực tế. Đây là một trong những kết quả amortized đẹp nhất ngành. Sẽ học kỹ ở **Tier 5 (đồ thị)** khi dùng union-find cho Kruskal MST.

📝 **Tóm tắt Mục 7.**
- Go slice append, hash table resize: amortized $O(1)$ nhờ chiến lược nhân đôi.
- Splay tree: amortized $O(\log n)$ (potential method).
- Union-Find path compression: amortized $\sim O(\alpha(n)) \approx O(1)$ — gặp lại ở Tier 5.

---

## 8. Cạm bẫy — amortized O(1) KHÔNG có nghĩa mọi op O(1)

> ⚠ **Lỗi nguy hiểm nhất.** "Append amortized $O(1)$" **không** đảm bảo *từng* append là $O(1)$. Lần grow vẫn tốn **$O(n)$ thực sự** — phần tử thứ $2^k + 1$ sẽ trigger copy $2^k$ phần tử. Amortized chỉ nói **trung bình trên chuỗi**, không nói **từng lần**.

Hệ quả thực tế quan trọng:

1. **Real-time / hard deadline:** Hệ thống yêu cầu **mỗi** thao tác hoàn tất trong thời gian giới hạn cứng (vd điều khiển phanh ABS, audio buffer real-time) **không được** dựa vào amortized. Một lần grow $O(n)$ bất chợt có thể trễ deadline gây thảm họa. Phải dùng cấu trúc có **worst-case $O(1)$ per-op** (vd pre-allocate đủ chỗ, hoặc "deamortized" dynamic array trải copy ra nhiều op).

2. **Latency spike (đuôi p99/p99.9):** Trong service đo p99 latency, các op grow tạo **spike** — đa số request nhanh, nhưng một số ít chậm hẳn. Amortized trung bình tốt nhưng **tail latency** xấu. Giải pháp: `make([]T, 0, expectedSize)` để pre-allocate, tránh grow giữa chừng.

3. **Không cộng amortized với worst-case bừa bãi:** Nếu thuật toán gọi một op amortized-O(1) **bên trong** một vòng lặp mà bản thân vòng đó chỉ chạy 1 lần với input lớn, phải cẩn thận — amortized chỉ hợp lệ khi xét **đủ một chuỗi dài** các op trên **cùng** cấu trúc dữ liệu.

❓ **Câu hỏi tự nhiên.**
- *"Vậy amortized vô dụng cho hệ thống nghiêm ngặt?"* — Không vô dụng, nhưng phải hiểu giới hạn: nó tối ưu **throughput tổng** (xử lý xong N việc nhanh), không đảm bảo **latency từng việc**. Chọn metric đúng cho bài toán.
- *"Làm sao tránh spike khi vẫn muốn mảng động?"* — Pre-allocate (`make([]T, 0, N)`), hoặc dùng deamortized structure, hoặc chấp nhận spike nếu hệ không real-time.

🔁 **Dừng lại tự kiểm tra.** Một game engine 60 FPS (mỗi frame ≤ 16.6ms) append vào một slice mỗi frame. Slice đã có 1 triệu phần tử và sắp grow. Vấn đề gì xảy ra, sửa thế nào?

<details><summary>Đáp án</summary>

Frame trigger grow phải copy 1 triệu phần tử — có thể vượt 16.6ms ⟹ **frame drop / giật hình**, dù amortized vẫn O(1). Sửa: pre-allocate `make([]T, 0, maxExpected)` ngay từ đầu (tránh grow runtime), hoặc grow ở thread nền, hoặc dùng cấu trúc deque/chunked tránh copy lớn một lần.

</details>

📝 **Tóm tắt Mục 8.**
- Amortized $O(1)$ ≠ mọi op $O(1)$: lần grow vẫn $O(n)$ thực sự.
- Không dùng cho real-time hard-deadline; gây tail-latency spike.
- Khắc phục: pre-allocate, hoặc deamortized structure.

---

## 9. Bài tập

> Tự làm trước khi xem [Lời giải chi tiết](#10-lời-giải-chi-tiết) bên dưới.

1. **Accounting cho dynamic array.** Chứng minh append (grow ×2) amortized $O(1)$ bằng accounting method với chi phí amortized = 3 mỗi op. Chỉ rõ credit gán cho phần tử nào, và vì sao credit không bao giờ âm.

2. **Potential cho binary counter.** Dùng $\Phi = $ số bit 1 chứng minh increment amortized = 2. Kiểm chứng cho cú `0111 → 1000` (actual và amortized).

3. **So sánh grow ×2 vs +k.** Cho chiến lược grow `+10` (capacity tăng đúng 10 mỗi lần đầy). Tính tổng copy cho $n = 100$ append, so với grow ×2. Suy ra amortized mỗi chiến lược.

4. **Multipop amortized.** Cho chuỗi: 50 lần `Push`, rồi 1 lần `MultiPop(100)`, rồi 30 `Push`, rồi `MultiPop(40)`. Tính tổng chi phí thực và amortized trung bình. Chứng minh chặn $\leq 2$ bằng potential $\Phi = \text{size}$.

5. **Queue bằng 2 stack.** Implement một queue dùng 2 stack (`inbox`, `outbox`). `Enqueue` push vào `inbox`. `Dequeue`: nếu `outbox` rỗng thì đổ toàn bộ `inbox` sang `outbox` (đảo thứ tự) rồi pop. Chứng minh amortized $O(1)$ mỗi thao tác bằng potential method. Viết code Go.

6. **Phản ví dụ amortized $O(1)$ nhưng 1 op $O(n)$.** Đưa một chuỗi append cụ thể vào dynamic array (cap đầu = 1) và chỉ ra **một** thao tác có chi phí thực $\geq 1000$, dù toàn chuỗi vẫn amortized $O(1)$.

7. **(Mở rộng) $\Phi$ phải không âm.** Giải thích vì sao điều kiện $\Phi_i \geq 0$ với mọi $i$ là **bắt buộc** để potential method cho chặn trên hợp lệ. Cho ví dụ $\Phi$ vi phạm điều kiện dẫn tới kết luận sai.

---

## 10. Lời giải chi tiết

### Bài 1 — Accounting cho dynamic array

**Cách tiếp cận:** Gán chi phí amortized **3** cho mỗi append. Phân bổ:
- 1 đơn vị: trả chi phí thực ghi phần tử mới.
- 2 đơn vị: credit dán lên phần tử vừa thêm.

**Vì sao credit không âm:** Xét cú grow từ cap $m \to 2m$, phải copy $m$ phần tử. Kể từ lần grow trước (cap từ $m/2 \to m$), đã có đúng $m/2$ phần tử **mới** được append (length đi từ $m/2$ lên $m$). Mỗi phần tử mới mang **2 credit** chưa tiêu ⟹ $m/2 \times 2 = m$ credit khả dụng — vừa đủ trả $m$ copy. Các phần tử cũ hơn đã tiêu credit ở lần grow trước, nhưng không sao vì chỉ cần credit của phần tử mới là đủ trả toàn bộ copy.

Bất biến: ngay trước mỗi grow, credit khả dụng $\geq$ số copy cần. Nên credit ngân hàng $\geq 0$ mọi lúc.

**Kết luận:** Tổng amortized $= 3n \geq$ tổng thực ⟹ amortized $= 3n/n = 3 = O(1)$. **Độ phức tạp:** amortized $O(1)$/op, tổng $O(n)$. ∎

### Bài 2 — Potential cho binary counter

$\Phi = $ số bit 1, $\Phi_0 = 0$, $\Phi \geq 0$. ✓

Increment lật $t$ bit 1 đuôi → 0, set 1 bit 0 → 1:
- actual $= t + 1$.
- $\Delta\Phi = (1) - (t) = 1 - t$ (thêm 1 bit 1, mất $t$ bit 1).
- amortized $= (t+1) + (1-t) = 2$. ∎

**Kiểm chứng `0111 → 1000`:** $t = 3$ (ba bit 1 đuôi). actual $= 3 + 1 = 4$. $\Phi$ trước $= 3$, $\Phi$ sau $= 1$, $\Delta\Phi = -2$. amortized $= 4 + (-2) = 2$. ✓ Khớp.

### Bài 3 — So sánh grow ×2 vs +10, n = 100

**Grow +10** (cap: 0→10→20→...→100): grow xảy ra tại append thứ 11, 21, 31, ..., 91 (khi vừa đầy bội số 10). Copy tại mỗi grow = cap hiện tại trước grow:

$$\text{copy} = 10 + 20 + 30 + 40 + 50 + 60 + 70 + 80 + 90 = 450$$

(9 lần grow, copy 10,20,...,90.) Tổng chi phí $\approx 100 + 450 = 550$. Amortized $= 550/100 = 5{,}5$. Tổng quát $+k$: tổng copy $\approx k \cdot (n/k)^2/2 = n^2/(2k) = \Theta(n^2)$ ⟹ amortized $\Theta(n)$.

**Grow ×2** (cap: 1→2→4→...→128): copy $= 1+2+4+8+16+32+64 = 127$. Tổng $\approx 100 + 127 = 227$. Amortized $= 227/100 = 2{,}27 = O(1)$.

**Kết luận:** +10 cho amortized **5,5** (và sẽ tăng theo $n$ — $\Theta(n)$); ×2 cho amortized **2,27** (hằng số — $O(1)$). Với $n = 100$, +10 đã copy gấp ~3,5 lần ×2; khoảng cách nới rộng khi $n$ lớn. ∎

### Bài 4 — Multipop chuỗi cụ thể

Chuỗi: 50 Push, MultiPop(100), 30 Push, MultiPop(40).

- 50 Push: actual $= 50$. size $= 50$.
- MultiPop(100): pop $\min(100,50) = \boldsymbol{50}$. actual $= 50$. size $= 0$.
- 30 Push: actual $= 30$. size $= 30$.
- MultiPop(40): pop $\min(40,30) = \boldsymbol{30}$. actual $= 30$. size $= 0$.

**Tổng actual** $= 50 + 50 + 30 + 30 = 160$. Số thao tác $= 50 + 1 + 30 + 1 = 82$. Amortized trung bình $= 160/82 \approx 1{,}95 \leq 2$. ✓

**Potential $\Phi = \text{size}$:** push amortized $= 1 + 1 = 2$; mỗi phần tử pop amortized $= 1 + (-1) = 0$, nên multipop amortized $= 0$. Tổng amortized $= 80 \text{ push} \times 2 + 2 \text{ multipop} \times 0 = 160 \geq 160$ actual. Chặn $\leq 2$/op. ∎

### Bài 5 — Queue bằng 2 stack

**Cách tiếp cận:** `inbox` nhận enqueue. Khi dequeue mà `outbox` rỗng, đổ toàn bộ `inbox` → `outbox` (mỗi phần tử pop khỏi inbox rồi push vào outbox → đảo thứ tự, FIFO đúng). Mỗi phần tử được **chuyển tối đa 1 lần** từ inbox sang outbox trong suốt vòng đời ⟹ amortized $O(1)$.

**Potential $\Phi = $ số phần tử trong inbox** ($\Phi \geq 0, \Phi_0 = 0$):
- **Enqueue:** actual 1 (push inbox), $\Delta\Phi = +1$ ⟹ amortized $= 2$.
- **Dequeue khi outbox không rỗng:** actual 1 (pop outbox), $\Delta\Phi = 0$ ⟹ amortized $= 1$.
- **Dequeue khi outbox rỗng, inbox có $m$ phần tử:** actual $= m \text{ (chuyển)} + 1 \text{ (pop)}$. $\Delta\Phi = -m$ (inbox về 0). amortized $= (m+1) + (-m) = 1$.

Mọi op amortized $\leq 2 = O(1)$. ∎

```go
package main

import "fmt"

type Queue struct {
	inbox, outbox []int
}

func (q *Queue) Enqueue(x int) { q.inbox = append(q.inbox, x) }

func (q *Queue) Dequeue() (int, bool) {
	if len(q.outbox) == 0 {
		// đổ inbox -> outbox (đảo thứ tự): mỗi phần tử chuyển 1 lần
		for len(q.inbox) > 0 {
			n := len(q.inbox)
			q.outbox = append(q.outbox, q.inbox[n-1])
			q.inbox = q.inbox[:n-1]
		}
	}
	if len(q.outbox) == 0 {
		return 0, false // queue rỗng
	}
	n := len(q.outbox)
	v := q.outbox[n-1]
	q.outbox = q.outbox[:n-1]
	return v, true
}

func main() {
	q := &Queue{}
	for i := 1; i <= 5; i++ {
		q.Enqueue(i)
	}
	for {
		v, ok := q.Dequeue()
		if !ok {
			break
		}
		fmt.Printf("%d ", v) // in 1 2 3 4 5 (FIFO dung)
	}
	fmt.Println()
}
```

In ra: `1 2 3 4 5` — đúng thứ tự FIFO. Mỗi phần tử chuyển inbox→outbox đúng 1 lần ⟹ amortized $O(1)$. ∎

### Bài 6 — Phản ví dụ amortized O(1) nhưng 1 op O(n)

Dynamic array cap đầu = 1, grow ×2. Append liên tục 1025 phần tử.

Lần append thứ **1025**: trước đó length $= 1024 = $ capacity (capacity đi 1,2,4,...,1024). Append này **trigger grow** → copy **1024** phần tử. Chi phí thực lần đó $= 1024 + 1 = 1025 \geq 1000$. ✓

Nhưng toàn chuỗi: tổng copy $= 1 + 2 + ... + 1024 = 2047 < 2 \cdot 1025$, tổng chi phí $\approx 1025 + 2047 = 3072$, amortized $= 3072/1025 \approx 3 = O(1)$.

**Kết luận:** thao tác thứ 1025 có chi phí $O(n) = 1025$, nhưng amortized toàn chuỗi vẫn $O(1)$. Đây chính là cạm bẫy Mục 8 — amortized $O(1)$ **không** đảm bảo từng op $O(1)$. ∎

### Bài 7 — Vì sao Φ phải không âm

Potential method cho $\sum \text{actual} = \sum \text{amortized} - (\Phi_n - \Phi_0)$. Để $\sum \text{amortized}$ là **chặn trên** của $\sum \text{actual}$, cần $\Phi_n - \Phi_0 \geq 0$. Với $\Phi_0 = 0$, điều này cần $\Phi_n \geq 0$. Nếu yêu cầu chặn đúng tại **mọi** prefix (mọi thời điểm dừng giữa chừng), cần $\Phi_i \geq 0$ với **mọi** $i$.

**Ví dụ $\Phi$ vi phạm dẫn tới sai:** Giả sử với binary counter ta chọn nhầm $\Phi = -(\text{số bit 1})$ (âm). Thì $\Phi_0 = 0$ nhưng $\Phi_i < 0$ khi có bit 1. Lúc đó $\sum \text{amortized} = \sum \text{actual} + (\Phi_n - \Phi_0) = \sum \text{actual} + \Phi_n < \sum \text{actual}$ — ta sẽ "chứng minh" được tổng amortized **nhỏ hơn** tổng thực, tức chặn trên **sai** (lạc quan giả tạo). Điều kiện $\Phi \geq 0$ chặn đúng kiểu nhầm lẫn này: nó đảm bảo "kho thế" không bao giờ rút quá số đã gửi. ∎

---

## 11. Code & Minh họa

- **Code Go inline** ở các Mục 4.5 (dynamic array), 5.4 (stack multipop), 6.4 (binary counter), 7.1 (Go slice grow), và Bài 5 (queue 2 stack) — tất cả biên dịch và chạy được, in ra số liệu verify khớp walk-through.
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Dynamic array grow**: animate append từng phần tử, hiện capacity nhân đôi, đếm copy tích lũy và amortized cost/op hội tụ về hằng số.
  2. **Binary counter**: animate increment, highlight bit flip, đếm tổng flip so với n.
  3. **Credit visualizer (accounting)**: mỗi op rẻ tích credit, mỗi op đắt tiêu credit — thấy trực quan vì sao credit không bao giờ âm.

---

## 12. Bài tiếp theo

- ➡ [Lesson 03 — Đệ quy & Hệ thức truy hồi](../lesson-03-recursion-recurrence/README.md): recursion tree, Master Theorem, giải recurrence — công cụ phân tích thuật toán chia để trị.
- 🔗 Gặp lại amortized ở **Tier 5** (Union-Find path compression cho Kruskal MST) và các cấu trúc nâng cao (splay tree, Fibonacci heap) ở Tier 7.

📝 **Tóm tắt toàn bài.**
- Amortized = tổng chi phí chuỗi $/ n$ (worst-case sequence, **không** xác suất) — khác average case.
- 3 phương pháp: aggregate ($T(n)/n$), accounting (credit gắn phần tử, $\geq 0$), potential ($\text{actual} + \Delta\Phi$, $\Phi \geq 0$).
- Dynamic array append, stack multipop, binary counter increment đều amortized $O(1)$ — chứng minh được bằng cả 3 cách.
- Nhân hệ số (×c) → $O(1)$; cộng hằng (+k) → $O(n)$. Lý do: tổng cấp số nhân $< 2n$.
- Amortized $O(1)$ ≠ mọi op $O(1)$ — cẩn thận real-time và tail latency.
