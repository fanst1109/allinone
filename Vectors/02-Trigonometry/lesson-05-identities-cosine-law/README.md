# Lesson 05 — Identity và định lý cosin

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **identity** là gì, khác **phương trình** ở điểm nào — và vì sao identity quan trọng (biến đổi biểu thức mà không thay đổi giá trị).
- Thuộc và **dùng được** ba nhóm identity cốt lõi:
  - **Pythagorean**: $\sin^2\theta + \cos^2\theta = 1$ và hai biến thể.
  - **Sum & Difference**: $\sin(\alpha \pm \beta)$, $\cos(\alpha \pm \beta)$, $\tan(\alpha \pm \beta)$.
  - **Double / Triple / Power-Reduction**: $\sin 2\theta$, $\cos 2\theta$, $\sin^2\theta = (1-\cos 2\theta)/2$...
- Phát biểu và **chứng minh** **định lý cosin**: $c^2 = a^2 + b^2 - 2ab\cos C$ — tổng quát của Pythagoras.
- Áp dụng định lý cosin để **chứng minh công thức $\mathbf{u} \cdot \mathbf{v} = |\mathbf{u}|\,|\mathbf{v}|\cos\theta$** — công thức xương sống của **cosine similarity** dùng ở Tầng 4 (Linear Algebra) và Tầng 6 (vector search, RAG, embedding).
- Tính được **cosine similarity** giữa 2 vector n chiều bằng tay và bằng Go.

> **Ghi nhớ chính của cả bài**: định lý cosin là **cầu nối** giữa hình học (góc trong tam giác) và đại số (dot product của vector). Mọi metric "đo độ giống nhau" trong AI (cosine similarity, attention score chuẩn hóa, similarity search) đều quay về **một dòng** xuất phát từ định lý cosin: $\mathbf{u} \cdot \mathbf{v} = |\mathbf{u}|\,|\mathbf{v}|\cos\theta$.

## Kiến thức tiền đề

- [Lesson 03 — Đường tròn đơn vị](../lesson-03-unit-circle/): biết $(\cos\theta, \sin\theta)$ là tọa độ trên đường tròn bán kính 1, hiểu công thức quy gọn theo quadrant.
- [Lesson 02 — Tam giác vuông](../lesson-02-right-triangle/): định lý Pythagoras $a^2 + b^2 = c^2$ cho tam giác vuông, identity $\sin^2\theta + \cos^2\theta = 1$.
- [Lesson 01 — Góc](../lesson-01-angles/): biết chuyển đổi độ ↔ radian.
- Đại số Tầng 1, đặc biệt [Lesson 04 — Lũy thừa, căn, log](../../01-Algebra/lesson-04-powers-roots-logs/) (biết khai triển $(a+b)^2$, dùng $\sqrt{\phantom{x}}$).

---

## 1. Identity — định nghĩa và phân biệt với phương trình

### 1.1. Identity là gì?

💡 **Trực giác**: một **identity** là phát biểu *"hai cách viết khác nhau nhưng cho ra cùng một giá trị, **với mọi** giá trị của biến"*. Một **phương trình** thì khác: nó chỉ đúng với một (hoặc vài) giá trị cụ thể của biến.

**Ví dụ phân biệt cụ thể**:

| Biểu thức | Loại | Vì sao |
|-----------|------|--------|
| $(x + 1)^2 = x^2 + 2x + 1$ | **Identity** | Đúng với **mọi** $x$ (tự thử $x = 0, 1, 2, -3, 0.5, \dots$). |
| $2x = 6$ | **Phương trình** | Chỉ đúng khi $x = 3$. Thử $x = 1 \to 2 \neq 6$. |
| $x^2 - 1 = (x-1)(x+1)$ | **Identity** | Đúng với mọi $x$. Đây là hằng đẳng thức. |
| $x^2 = 4$ | **Phương trình** | Chỉ đúng khi $x = 2$ hoặc $x = -2$. |
| $\sin^2\theta + \cos^2\theta = 1$ | **Identity** | Đúng với **mọi** góc $\theta$. |
| $\sin\theta = 1/2$ | **Phương trình lượng giác** | Chỉ đúng khi $\theta = 30^\circ, 150^\circ, 30^\circ+360^\circ, \dots$. |

**Ký hiệu**: để nhấn mạnh đây là identity (đúng với mọi biến), nhiều sách dùng ký hiệu $\equiv$ (đồng nhất) thay cho $=$. Trong tài liệu này dùng $=$ cho cả hai, nhưng bạn cần **đọc ngữ cảnh** để biết đang xét identity hay phương trình.

### 1.2. Vì sao identity hữu ích?

💡 **Trực giác**: identity là **công cụ biến đổi**. Nếu biết $\sin^2\theta + \cos^2\theta = 1$, ta có thể đổi mọi $\cos^2\theta$ thành $1 - \sin^2\theta$ mà giá trị biểu thức **không đổi**. Đây là "công cụ thay đồ" cho biểu thức — dùng để:

- **Đơn giản hóa** biểu thức phức tạp.
- **Chứng minh** đẳng thức khác.
- **Giải phương trình lượng giác**.
- **Tính tích phân** (Tầng 3): vd $\int \sin^2 x \, dx$ cần hạ bậc trước.

**Ví dụ minh họa nhanh**: rút gọn $\sin^2\theta \cdot (1 + \cot^2\theta)$.

$$\begin{aligned}
\sin^2\theta \cdot (1 + \cot^2\theta)
&= \sin^2\theta \cdot \csc^2\theta && \text{(vì } 1 + \cot^2\theta = \csc^2\theta \text{ — identity Pythagorean biến thể)} \\
&= \sin^2\theta \cdot \frac{1}{\sin^2\theta} && \text{(định nghĩa } \csc = 1/\sin\text{)} \\
&= 1 \quad \checkmark
\end{aligned}$$

Một biểu thức nhìn rối, dùng identity 2-3 bước ra $1$. Đó là sức mạnh của identity.

⚠ **Lỗi thường gặp**: nhầm identity với phương trình. Khi đọc $\sin^2\theta + \cos^2\theta = 1$, đừng nghĩ *"giải tìm θ"* — không cần giải gì cả, nó **luôn đúng**. Còn $\sin\theta = 1/2$ thì mới có nghĩa "giải tìm θ".

🔁 **Dừng lại tự kiểm tra**: phát biểu nào sau đây là identity?
1. $(x - y)^2 = x^2 - 2xy + y^2$
2. $\tan\theta = 1$
3. $2\sin\theta\cos\theta = \sin 2\theta$

<details>
<summary>Đáp án</summary>

1. Identity (đúng với mọi $x, y$).
2. Phương trình (chỉ đúng khi $\theta = 45^\circ + k\cdot 180^\circ$).
3. Identity (đúng với mọi $\theta$). Đây là công thức nhân đôi, sẽ học ở Mục 5.

</details>

### 📝 Tóm tắt Mục 1

- **Identity**: đúng với **mọi** giá trị của biến. Dùng làm công cụ biến đổi.
- **Phương trình**: chỉ đúng với một số giá trị cụ thể của biến. Mục tiêu là giải tìm các giá trị đó.
- Identity là "kim chỉ nam" để rút gọn, chứng minh, tính tích phân.


---

## 2. Pythagorean identities (mở rộng)

### 2.1. Identity gốc

💡 **Trực giác**: trên đường tròn đơn vị, điểm $P = (\cos\theta, \sin\theta)$ có khoảng cách tới gốc bằng $1$. Pythagoras: $(\cos\theta)^2 + (\sin\theta)^2 = 1^2$. Đây là identity Pythagorean gốc — đúng với **mọi** góc $\theta$, kể cả góc tù, góc âm, góc lớn hơn 360°.

$$\sin^2\theta + \cos^2\theta = 1 \qquad (\bigstar \text{ gốc})$$

**Walk-through verify với 4 góc cụ thể**:

| $\theta$ | $\sin\theta$ | $\cos\theta$ | $\sin^2\theta$ | $\cos^2\theta$ | Tổng |
|-----|---------|---------|---------|---------|------|
| $0^\circ$ | $0$ | $1$ | $0$ | $1$ | $0 + 1 = 1$ ✓ |
| $30^\circ$ | $1/2$ | $\sqrt{3}/2$ | $1/4$ | $3/4$ | $1/4 + 3/4 = 1$ ✓ |
| $45^\circ$ | $\sqrt{2}/2$ | $\sqrt{2}/2$ | $1/2$ | $1/2$ | $1/2 + 1/2 = 1$ ✓ |
| $60^\circ$ | $\sqrt{3}/2$ | $1/2$ | $3/4$ | $1/4$ | $3/4 + 1/4 = 1$ ✓ |
| $90^\circ$ | $1$ | $0$ | $1$ | $0$ | $1 + 0 = 1$ ✓ |
| $120^\circ$ | $\sqrt{3}/2$ | $-1/2$ | $3/4$ | $1/4$ | $3/4 + 1/4 = 1$ ✓ |
| $210^\circ$ | $-1/2$ | $-\sqrt{3}/2$ | $1/4$ | $3/4$ | $1/4 + 3/4 = 1$ ✓ |

Cứ thế cho mọi góc — luôn ra $1$.

### 2.2. Hai biến thể: chia 2 vế

💡 **Trực giác**: nếu chia cả 2 vế của $\sin^2\theta + \cos^2\theta = 1$ cho $\cos^2\theta$ thì tất cả các số hạng đều chia cho $\cos^2\theta$. Ta được identity mới chứa $\tan$ và $\sec$.

**Biến thể A — chia cho $\cos^2\theta$** (yêu cầu $\cos\theta \neq 0$):

$$\underbrace{\frac{\sin^2\theta}{\cos^2\theta}}_{\tan^2\theta} + \underbrace{\frac{\cos^2\theta}{\cos^2\theta}}_{1} = \underbrace{\frac{1}{\cos^2\theta}}_{\sec^2\theta} \quad (\text{vì } \sec\theta \equiv 1/\cos\theta)$$

$$\Rightarrow\ 1 + \tan^2\theta = \sec^2\theta \qquad (\bigstar \text{ biến thể A})$$

**Biến thể B — chia cho $\sin^2\theta$** (yêu cầu $\sin\theta \neq 0$):

$$\underbrace{\frac{\sin^2\theta}{\sin^2\theta}}_{1} + \underbrace{\frac{\cos^2\theta}{\sin^2\theta}}_{\cot^2\theta} = \underbrace{\frac{1}{\sin^2\theta}}_{\csc^2\theta} \quad (\text{vì } \csc\theta \equiv 1/\sin\theta)$$

$$\Rightarrow\ 1 + \cot^2\theta = \csc^2\theta \qquad (\bigstar \text{ biến thể B})$$

**Bảng tổng kết hàm nghịch đảo** (nhắc lại từ Lesson 02):

| Tên | Định nghĩa | Đọc là |
|-----|------------|--------|
| $\sec\theta$ | $1 / \cos\theta$ | secant |
| $\csc\theta$ | $1 / \sin\theta$ | cosecant |
| $\cot\theta$ | $\cos\theta / \sin\theta = 1 / \tan\theta$ | cotangent |

### 2.3. Verify biến thể với góc cụ thể

**Verify $1 + \tan^2\theta = \sec^2\theta$ với $\theta = 60^\circ$**:
- $\tan 60^\circ = \sqrt{3}$, nên $\tan^2 60^\circ = 3$. Vế trái: $1 + 3 = 4$.
- $\cos 60^\circ = 1/2$, $\sec 60^\circ = 1/(1/2) = 2$, $\sec^2 60^\circ = 4$. Vế phải: $4$.
- $4 = 4$ ✓

**Verify $1 + \tan^2\theta = \sec^2\theta$ với $\theta = 30^\circ$**:
- $\tan 30^\circ = 1/\sqrt{3}$, $\tan^2 30^\circ = 1/3$. Vế trái: $1 + 1/3 = 4/3$.
- $\cos 30^\circ = \sqrt{3}/2$, $\sec 30^\circ = 2/\sqrt{3}$, $\sec^2 30^\circ = 4/3$. Vế phải: $4/3$.
- $4/3 = 4/3$ ✓

**Verify $1 + \cot^2\theta = \csc^2\theta$ với $\theta = 45^\circ$**:
- $\cot 45^\circ = 1$, $\cot^2 45^\circ = 1$. Vế trái: $1 + 1 = 2$.
- $\sin 45^\circ = \sqrt{2}/2$, $\csc 45^\circ = 2/\sqrt{2} = \sqrt{2}$, $\csc^2 45^\circ = 2$. Vế phải: $2$.
- $2 = 2$ ✓

**Verify $1 + \cot^2\theta = \csc^2\theta$ với $\theta = 60^\circ$**:
- $\cot 60^\circ = 1/\sqrt{3}$, $\cot^2 60^\circ = 1/3$. Vế trái: $1 + 1/3 = 4/3$.
- $\sin 60^\circ = \sqrt{3}/2$, $\csc 60^\circ = 2/\sqrt{3}$, $\csc^2 60^\circ = 4/3$. Vế phải: $4/3$.
- $4/3 = 4/3$ ✓

### 2.4. Khi nào dùng?

❓ **Câu hỏi tự nhiên**: *"Học 3 identity Pythagorean để làm gì? Cứ nhớ một cái gốc là đủ rồi?"*

Đúng — về mặt logic chỉ cần biết $\sin^2\theta + \cos^2\theta = 1$, hai cái kia suy ra được. Nhưng trong tính toán thực tế, bạn sẽ gặp biểu thức chứa $\tan, \sec, \cot, \csc$ rất nhiều (vd trong tích phân, vật lý), và việc "thấy ngay" $1 + \tan^2\theta$ có thể đổi thành $\sec^2\theta$ sẽ giúp bạn rút gọn nhanh. Học thuộc cả 3 là khoản đầu tư xứng đáng.

⚠ **Lỗi thường gặp**: viết $\sin^2\theta + \cos^2\theta = 1$ rồi cho rằng $\sin\theta + \cos\theta = 1$ — **sai hoàn toàn**. Ví dụ phản chứng: với $\theta = 45^\circ$, $\sin 45^\circ + \cos 45^\circ = \sqrt{2}/2 + \sqrt{2}/2 = \sqrt{2} \approx 1.414$, không bằng $1$. **Bình phương không phân phối qua cộng**.

🔁 **Dừng lại tự kiểm tra**:
1. Cho $\cos\theta = 0.6$, tính $\sin\theta$ (giả sử $\theta$ ở quadrant I).
2. Cho $\tan\theta = 3/4$ ($\theta$ quadrant I). Tính $\sec\theta$.

<details>
<summary>Đáp án</summary>

1. $\sin^2\theta = 1 - \cos^2\theta = 1 - 0.36 = 0.64 \to \sin\theta = 0.8$ (chọn dấu dương vì quadrant I).
2. $\sec^2\theta = 1 + \tan^2\theta = 1 + 9/16 = 25/16 \to \sec\theta = 5/4$ (dương vì quadrant I).

</details>

### 📝 Tóm tắt Mục 2

- $\sin^2\theta + \cos^2\theta = 1$ — identity gốc, đúng cho mọi $\theta$.
- Chia 2 vế cho $\cos^2\theta \to 1 + \tan^2\theta = \sec^2\theta$.
- Chia 2 vế cho $\sin^2\theta \to 1 + \cot^2\theta = \csc^2\theta$.
- Dùng để rút gọn biểu thức trộn nhiều hàm lượng giác.

---

## 3. Công thức cộng góc (Sum & Difference Formulas)

### 3.1. Phát biểu

💡 **Trực giác trước**: nếu biết $\sin\alpha$, $\cos\alpha$, $\sin\beta$, $\cos\beta$ (các giá trị ở góc đơn), thì *có thể tính được* $\sin(\alpha + \beta)$ mà không cần phải đo trực tiếp. Đây là **bộ công thức cộng**.

$$\begin{aligned}
\sin(\alpha + \beta) &= \sin\alpha \cdot \cos\beta + \cos\alpha \cdot \sin\beta \\
\sin(\alpha - \beta) &= \sin\alpha \cdot \cos\beta - \cos\alpha \cdot \sin\beta \\[4pt]
\cos(\alpha + \beta) &= \cos\alpha \cdot \cos\beta - \sin\alpha \cdot \sin\beta \\
\cos(\alpha - \beta) &= \cos\alpha \cdot \cos\beta + \sin\alpha \cdot \sin\beta \\[4pt]
\tan(\alpha + \beta) &= \frac{\tan\alpha + \tan\beta}{1 - \tan\alpha \cdot \tan\beta} \\
\tan(\alpha - \beta) &= \frac{\tan\alpha - \tan\beta}{1 + \tan\alpha \cdot \tan\beta}
\end{aligned}$$

### 3.2. Mnemonic — học thuộc trong 30 giây

💡 **Mẹo nhớ dấu**:

- **$\sin$ có DẤU GIỐNG**: $\sin(\alpha + \beta)$ dùng dấu $+$, $\sin(\alpha - \beta)$ dùng dấu $-$.
- **$\cos$ có DẤU NGƯỢC**: $\cos(\alpha + \beta)$ dùng dấu $-$, $\cos(\alpha - \beta)$ dùng dấu $+$.
- **$\tan$ thì mẫu số ngược lại với tử**: tử $+$ thì mẫu $-$, tử $-$ thì mẫu $+$.

**Mẹo nhớ thứ tự $\sin$**: "sin-cos cos-sin" — vế phải của $\sin(\alpha\pm\beta)$ là $\sin\alpha\cos\beta \pm \cos\alpha\sin\beta$ (xen kẽ).

**Mẹo nhớ thứ tự $\cos$**: "cos-cos sin-sin" — vế phải của $\cos(\alpha\pm\beta)$ là $\cos\alpha\cos\beta \mp \sin\alpha\sin\beta$ (đôi một).

### 3.3. Chứng minh `cos(α − β)` bằng đường tròn đơn vị + định lý cosin

⚠ Để chứng minh đầy đủ ta cần **định lý cosin** ở Mục 8. Vì 2 phần đan xen, ta nói trước **kết quả định lý cosin**: cho tam giác có 3 cạnh $a, b, c$ và $C$ là góc đối diện cạnh $c$, thì $c^2 = a^2 + b^2 - 2ab\cos C$. Chứng minh chi tiết ở Mục 8. Bây giờ chỉ **dùng** kết quả đó.

**Setup**: trên đường tròn đơn vị, đặt:
- $A = (\cos\alpha, \sin\alpha)$ — điểm ở góc $\alpha$.
- $B = (\cos\beta, \sin\beta)$ — điểm ở góc $\beta$.
- Gốc $O = (0, 0)$.

Khi đó tam giác $OAB$ có:
- $OA = 1$, $OB = 1$ (bán kính đường tròn đơn vị).
- Góc $\angle AOB = \alpha - \beta$ (giả sử $\alpha > \beta$).

**Bước 1 — tính $|AB|^2$ bằng tọa độ** (công thức khoảng cách):

$$\begin{aligned}
|AB|^2 &= (\cos\alpha - \cos\beta)^2 + (\sin\alpha - \sin\beta)^2 \\
&= \cos^2\alpha - 2\cos\alpha\cos\beta + \cos^2\beta + \sin^2\alpha - 2\sin\alpha\sin\beta + \sin^2\beta \\
&= (\cos^2\alpha + \sin^2\alpha) + (\cos^2\beta + \sin^2\beta) - 2(\cos\alpha\cos\beta + \sin\alpha\sin\beta) \\
&= 1 + 1 - 2(\cos\alpha\cos\beta + \sin\alpha\sin\beta) \\
&= 2 - 2(\cos\alpha\cos\beta + \sin\alpha\sin\beta)
\end{aligned}$$

**Bước 2 — tính $|AB|^2$ bằng định lý cosin** trong tam giác $OAB$:

$$\begin{aligned}
|AB|^2 &= OA^2 + OB^2 - 2 \cdot OA \cdot OB \cdot \cos(\angle AOB) \\
&= 1^2 + 1^2 - 2 \cdot 1 \cdot 1 \cdot \cos(\alpha - \beta) \\
&= 2 - 2\cos(\alpha - \beta)
\end{aligned}$$

**Bước 3 — so sánh hai vế** (cùng tính $|AB|^2$ theo 2 cách):

$$2 - 2\cos(\alpha - \beta) = 2 - 2(\cos\alpha\cos\beta + \sin\alpha\sin\beta)$$

Rút gọn:

$$\cos(\alpha - \beta) = \cos\alpha\cos\beta + \sin\alpha\sin\beta \qquad \checkmark \text{ (đpcm)}$$

### 3.4. Suy ra các công thức còn lại

Từ $\cos(\alpha - \beta) = \cos\alpha\cos\beta + \sin\alpha\sin\beta$, ta suy ra hết:

**(a) $\cos(\alpha + \beta)$**: thay $\beta$ bằng $-\beta$:

$$\begin{aligned}
\cos(\alpha - (-\beta)) &= \cos\alpha\cos(-\beta) + \sin\alpha\sin(-\beta) \\
\cos(\alpha + \beta) &= \cos\alpha\cos\beta + \sin\alpha \cdot (-\sin\beta) \\
&= \cos\alpha\cos\beta - \sin\alpha\sin\beta \qquad \checkmark
\end{aligned}$$

(Dùng $\cos(-\beta) = \cos\beta$ và $\sin(-\beta) = -\sin\beta$ từ Lesson 03.)

**(b) $\sin(\alpha + \beta)$**: dùng identity $\sin x = \cos(90^\circ - x)$:

$$\begin{aligned}
\sin(\alpha + \beta) &= \cos(90^\circ - (\alpha + \beta)) = \cos((90^\circ - \alpha) - \beta) \\
&= \cos(90^\circ - \alpha)\cos\beta + \sin(90^\circ - \alpha)\sin\beta \\
&= \sin\alpha \cdot \cos\beta + \cos\alpha \cdot \sin\beta \qquad \checkmark
\end{aligned}$$

(Dùng $\cos(90^\circ - \alpha) = \sin\alpha$ và $\sin(90^\circ - \alpha) = \cos\alpha$.)

**(c) $\sin(\alpha - \beta)$**: thay $\beta$ bằng $-\beta$:

$$\begin{aligned}
\sin(\alpha + (-\beta)) &= \sin\alpha\cos(-\beta) + \cos\alpha\sin(-\beta) \\
\sin(\alpha - \beta) &= \sin\alpha\cos\beta + \cos\alpha(-\sin\beta) \\
&= \sin\alpha\cos\beta - \cos\alpha\sin\beta \qquad \checkmark
\end{aligned}$$

**(d) $\tan(\alpha + \beta)$**: chia tử và mẫu cho $\cos\alpha\cos\beta$:

$$\tan(\alpha + \beta) = \frac{\sin(\alpha + \beta)}{\cos(\alpha + \beta)} = \frac{\sin\alpha\cos\beta + \cos\alpha\sin\beta}{\cos\alpha\cos\beta - \sin\alpha\sin\beta}$$

Chia tử và mẫu cho $\cos\alpha\cos\beta$:

$$= \frac{\dfrac{\sin\alpha}{\cos\alpha} + \dfrac{\sin\beta}{\cos\beta}}{1 - \dfrac{\sin\alpha\sin\beta}{\cos\alpha\cos\beta}} = \frac{\tan\alpha + \tan\beta}{1 - \tan\alpha \cdot \tan\beta} \qquad \checkmark$$

### 3.5. Walk-through tính `sin 75°` bằng công thức cộng

$75^\circ = 45^\circ + 30^\circ$. Dùng công thức $\sin(\alpha + \beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$:

$$\begin{aligned}
\sin 75^\circ &= \sin(45^\circ + 30^\circ) \\
&= \sin 45^\circ \cdot \cos 30^\circ + \cos 45^\circ \cdot \sin 30^\circ \\
&= \frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2} + \frac{\sqrt{2}}{2}\cdot\frac{1}{2} \\
&= \frac{\sqrt{6}}{4} + \frac{\sqrt{2}}{4} \\
&= \frac{\sqrt{6} + \sqrt{2}}{4}
\end{aligned}$$

Số gần đúng: $\sqrt{6} \approx 2.449$, $\sqrt{2} \approx 1.414$, tổng $\approx 3.863$, chia 4 $\approx 0.966$.

**Kiểm chứng bằng máy tính**: $\sin 75^\circ \approx 0.9659$ ✓.

### 3.6. Walk-through thêm 4 ví dụ

**Ví dụ A — $\cos 75^\circ$**: dùng $\cos(\alpha + \beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta$:

$$\begin{aligned}
\cos 75^\circ &= \cos(45^\circ + 30^\circ) \\
&= \cos 45^\circ\cos 30^\circ - \sin 45^\circ\sin 30^\circ \\
&= \frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2} - \frac{\sqrt{2}}{2}\cdot\frac{1}{2} \\
&= \frac{\sqrt{6}}{4} - \frac{\sqrt{2}}{4} = \frac{\sqrt{6} - \sqrt{2}}{4} \\
&\approx \frac{2.449 - 1.414}{4} \approx 0.2588
\end{aligned}$$

Kiểm: $\cos 75^\circ \approx 0.2588$ ✓.

**Ví dụ B — $\sin 15^\circ$**: $15^\circ = 45^\circ - 30^\circ$. Dùng $\sin(\alpha - \beta)$:

$$\begin{aligned}
\sin 15^\circ &= \sin(45^\circ - 30^\circ) \\
&= \sin 45^\circ\cos 30^\circ - \cos 45^\circ\sin 30^\circ \\
&= \frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2} - \frac{\sqrt{2}}{2}\cdot\frac{1}{2} \\
&= \frac{\sqrt{6} - \sqrt{2}}{4} \approx 0.2588
\end{aligned}$$

Lưu ý đẹp: $\sin 15^\circ = \cos 75^\circ$ (vì $15^\circ + 75^\circ = 90^\circ$ — hàm bù).

**Ví dụ C — $\cos 15^\circ$**:

$$\begin{aligned}
\cos 15^\circ &= \cos(45^\circ - 30^\circ) = \cos 45^\circ\cos 30^\circ + \sin 45^\circ\sin 30^\circ \\
&= \frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2} + \frac{\sqrt{2}}{2}\cdot\frac{1}{2} \\
&= \frac{\sqrt{6} + \sqrt{2}}{4} \approx 0.9659
\end{aligned}$$

Tức $\cos 15^\circ = \sin 75^\circ$.

**Ví dụ D — $\tan 105^\circ$**: $105^\circ = 60^\circ + 45^\circ$. Dùng $\tan(\alpha + \beta)$, với $\tan 60^\circ = \sqrt{3}$, $\tan 45^\circ = 1$:

$$\begin{aligned}
\tan 105^\circ &= \frac{\sqrt{3} + 1}{1 - \sqrt{3} \cdot 1} = \frac{\sqrt{3} + 1}{1 - \sqrt{3}} \\
&= \frac{(\sqrt{3} + 1)(1 + \sqrt{3})}{(1 - \sqrt{3})(1 + \sqrt{3})} && \text{(nhân tử mẫu với } 1 + \sqrt{3}\text{)} \\
&= \frac{\sqrt{3} + 3 + 1 + \sqrt{3}}{1 - 3} = \frac{4 + 2\sqrt{3}}{-2} \\
&= -(2 + \sqrt{3}) \approx -3.732
\end{aligned}$$

Kiểm: $\tan 105^\circ \approx -3.732$ ✓.

**Ví dụ E — $\sin(\alpha + \beta)$ khi $\sin\alpha = 3/5$, $\cos\alpha = 4/5$, $\sin\beta = 5/13$, $\cos\beta = 12/13$** (hai tam giác Pythagorean phổ biến):

$$\begin{aligned}
\sin(\alpha + \beta) &= \sin\alpha\cos\beta + \cos\alpha\sin\beta \\
&= \frac{3}{5}\cdot\frac{12}{13} + \frac{4}{5}\cdot\frac{5}{13} \\
&= \frac{36}{65} + \frac{20}{65} = \frac{56}{65} \approx 0.8615
\end{aligned}$$

❓ **Câu hỏi tự nhiên**: *"Tính giá trị các góc đặc biệt như $75^\circ, 15^\circ, 105^\circ$ để làm gì? Đời thật ai cũng dùng máy tính rồi."*

Hai lý do:
1. Trong **chứng minh** và **giải tích biểu thức** (vd tích phân, giới hạn), giữ dạng **đại số chính xác** quan trọng hơn số gần đúng. $(\sqrt{6} + \sqrt{2})/4$ đẹp hơn $0.9659\dots$ vì còn cộng/trừ/nhân với các biểu thức khác mà không tích lũy sai số.
2. Bạn xây dựng được **trực giác** về quan hệ giữa các góc — vd $\sin 15^\circ = \cos 75^\circ$, hay tại sao $\sin(\alpha+\beta) \neq \sin\alpha + \sin\beta$. Trực giác này dùng đến khi đọc paper, viết code low-level.

⚠ **Lỗi thường gặp**: viết $\sin(\alpha + \beta) = \sin\alpha + \sin\beta$ — **SAI**. Ví dụ phản chứng: $\sin(30^\circ + 60^\circ) = \sin 90^\circ = 1$, còn $\sin 30^\circ + \sin 60^\circ = 1/2 + \sqrt{3}/2 \approx 1.366$. **$\sin$ không phân phối qua cộng**. Đây là sai lầm phổ biến nhất, kiểm tra mỗi khi bạn viết công thức.

🔁 **Dừng lại tự kiểm tra**:
1. Tính $\cos 105^\circ$ bằng công thức cộng.
2. Cho $\sin\alpha = 4/5, \cos\alpha = 3/5, \sin\beta = 5/13, \cos\beta = 12/13$. Tính $\cos(\alpha - \beta)$.

<details>
<summary>Đáp án</summary>

1. $\cos 105^\circ = \cos(60^\circ + 45^\circ) = \cos 60^\circ\cos 45^\circ - \sin 60^\circ\sin 45^\circ = \frac{1}{2}\cdot\frac{\sqrt{2}}{2} - \frac{\sqrt{3}}{2}\cdot\frac{\sqrt{2}}{2} = \frac{\sqrt{2} - \sqrt{6}}{4} \approx -0.2588$. (Âm vì $105^\circ$ ở quadrant II.)
2. $\cos(\alpha - \beta) = \cos\alpha\cos\beta + \sin\alpha\sin\beta = \frac{3}{5}\cdot\frac{12}{13} + \frac{4}{5}\cdot\frac{5}{13} = \frac{36}{65} + \frac{20}{65} = \frac{56}{65} \approx 0.862$.

</details>

### 📝 Tóm tắt Mục 3

- 6 công thức cộng/hiệu là **bộ công cụ chính** của lượng giác.
- Nhớ mnemonic: sin DẤU GIỐNG, cos DẤU NGƯỢC.
- Suy ra hết từ $\cos(\alpha - \beta)$ — và $\cos(\alpha - \beta)$ chứng minh được bằng định lý cosin trên đường tròn đơn vị.
- **Lỗi cấm**: $\sin(\alpha + \beta) \neq \sin\alpha + \sin\beta$. Luôn nhớ $\sin$ không tuyến tính.

---

## 4. Công thức nhân đôi (Double Angle)

### 4.1. Phát biểu và chứng minh

💡 **Trực giác**: nếu $\alpha = \beta$ trong công thức cộng, ta được công thức cho $2\alpha$. Đây là **trường hợp đặc biệt** chứ không phải công thức mới.

**$\sin 2\theta$**: từ $\sin(\alpha + \beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$ với $\alpha = \beta = \theta$:

$$\begin{aligned}
\sin 2\theta &= \sin(\theta + \theta) \\
&= \sin\theta\cos\theta + \cos\theta\sin\theta \\
&= 2\sin\theta\cos\theta
\end{aligned}$$

$$\sin 2\theta = 2\sin\theta \cdot \cos\theta$$

**$\cos 2\theta$** (có 3 dạng): từ $\cos(\alpha + \beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta$ với $\alpha = \beta = \theta$:

$$\cos 2\theta = \cos^2\theta - \sin^2\theta \qquad \text{(dạng I)}$$

Dùng $\sin^2\theta = 1 - \cos^2\theta$:

$$\cos 2\theta = \cos^2\theta - (1 - \cos^2\theta) = 2\cos^2\theta - 1 \qquad \text{(dạng II)}$$

Dùng $\cos^2\theta = 1 - \sin^2\theta$:

$$\cos 2\theta = (1 - \sin^2\theta) - \sin^2\theta = 1 - 2\sin^2\theta \qquad \text{(dạng III)}$$

$$\begin{aligned}
\cos 2\theta &= \cos^2\theta - \sin^2\theta && \text{(I)} \\
&= 2\cos^2\theta - 1 && \text{(II)} \\
&= 1 - 2\sin^2\theta && \text{(III)}
\end{aligned}$$

❓ **Câu hỏi tự nhiên**: *"Tại sao cần 3 dạng của $\cos 2\theta$? Sao không nhớ 1 dạng?"*

Vì tùy bài, ta muốn biểu thức **chỉ chứa $\cos$** (dạng II) hoặc **chỉ chứa $\sin$** (dạng III). Vd khi tính tích phân $\int \cos^2 x \, dx$, ta cần $\cos^2 x = (1 + \cos 2x)/2$ — suy ra trực tiếp từ dạng II. Còn $\int \sin^2 x \, dx$ cần dạng III. Học cả 3 là đầu tư đúng (như đã giải thích ở Mục 2.4).

**$\tan 2\theta$**: từ $\tan(\alpha + \beta) = (\tan\alpha + \tan\beta)/(1 - \tan\alpha\tan\beta)$ với $\alpha = \beta = \theta$:

$$\tan 2\theta = \frac{\tan\theta + \tan\theta}{1 - \tan\theta \cdot \tan\theta} = \frac{2\tan\theta}{1 - \tan^2\theta}$$

### 4.2. Walk-through verify với 3 góc

**$\theta = 30^\circ$** (kiểm $\sin 60^\circ = 2\sin 30^\circ\cos 30^\circ$):
- Vế trái: $\sin 60^\circ = \sqrt{3}/2$.
- Vế phải: $2 \cdot \frac{1}{2} \cdot \frac{\sqrt{3}}{2} = \sqrt{3}/2$.
- Khớp ✓.

Kiểm $\cos 60^\circ = 2\cos^2 30^\circ - 1$:
- Vế trái: $\cos 60^\circ = 1/2$.
- Vế phải: $2 \cdot \left(\frac{\sqrt{3}}{2}\right)^2 - 1 = 2 \cdot \frac{3}{4} - 1 = \frac{3}{2} - 1 = \frac{1}{2}$.
- Khớp ✓.

**$\theta = 45^\circ$** (kiểm $\sin 90^\circ = 2\sin 45^\circ\cos 45^\circ$):
- Vế trái: $\sin 90^\circ = 1$.
- Vế phải: $2 \cdot \frac{\sqrt{2}}{2} \cdot \frac{\sqrt{2}}{2} = 2 \cdot \frac{1}{2} = 1$.
- Khớp ✓.

Kiểm $\cos 90^\circ = 1 - 2\sin^2 45^\circ$:
- Vế trái: $\cos 90^\circ = 0$.
- Vế phải: $1 - 2 \cdot \left(\frac{\sqrt{2}}{2}\right)^2 = 1 - 2 \cdot \frac{1}{2} = 0$.
- Khớp ✓.

**$\theta = 60^\circ$** (kiểm $\sin 120^\circ = 2\sin 60^\circ\cos 60^\circ$):
- Vế trái: $\sin 120^\circ = \sqrt{3}/2$.
- Vế phải: $2 \cdot \frac{\sqrt{3}}{2} \cdot \frac{1}{2} = \sqrt{3}/2$.
- Khớp ✓.

Kiểm $\cos 120^\circ = \cos^2 60^\circ - \sin^2 60^\circ$:
- Vế trái: $\cos 120^\circ = -1/2$.
- Vế phải: $\left(\frac{1}{2}\right)^2 - \left(\frac{\sqrt{3}}{2}\right)^2 = \frac{1}{4} - \frac{3}{4} = -\frac{1}{2}$.
- Khớp ✓.

⚠ **Lỗi thường gặp**: viết $\sin 2\theta = 2\sin\theta$ — **SAI**. Thiếu hệ số $\cos\theta$. Phản chứng: $\sin 60^\circ = \sqrt{3}/2 \approx 0.866$, còn $2\sin 30^\circ = 2 \cdot \frac{1}{2} = 1$. Không khớp.

🔁 **Dừng lại tự kiểm tra**: cho $\sin\theta = 3/5$, $\cos\theta = 4/5$. Tính $\sin 2\theta$ và $\cos 2\theta$.

<details>
<summary>Đáp án</summary>

- $\sin 2\theta = 2 \cdot \frac{3}{5} \cdot \frac{4}{5} = \frac{24}{25} = 0.96$.
- $\cos 2\theta = \cos^2\theta - \sin^2\theta = \frac{16}{25} - \frac{9}{25} = \frac{7}{25} = 0.28$.
- Kiểm: $\sin^2 2\theta + \cos^2 2\theta = \left(\frac{24}{25}\right)^2 + \left(\frac{7}{25}\right)^2 = \frac{576}{625} + \frac{49}{625} = \frac{625}{625} = 1$ ✓.

</details>

### 📝 Tóm tắt Mục 4

- Công thức nhân đôi = công thức cộng với $\alpha = \beta$.
- $\sin 2\theta = 2\sin\theta\cos\theta$.
- $\cos 2\theta$ có 3 dạng tương đương — chọn dạng phù hợp với bài toán.
- $\tan 2\theta = 2\tan\theta / (1 - \tan^2\theta)$.

---

## 5. Công thức nhân ba (Triple Angle) — giới thiệu nhẹ

💡 **Trực giác**: cũng như nhân đôi suy từ công thức cộng $\alpha + \beta$ với $\alpha = \beta$, công thức nhân ba suy từ $\alpha + 2\beta$ với $\alpha = \beta$ (tức $\theta + 2\theta = 3\theta$). Không thường dùng nên chỉ liệt kê.

$$\begin{aligned}
\sin 3\theta &= 3\sin\theta - 4\sin^3\theta \\
\cos 3\theta &= 4\cos^3\theta - 3\cos\theta
\end{aligned}$$

**Chứng minh $\sin 3\theta$** (cho người tò mò):

$$\begin{aligned}
\sin 3\theta &= \sin(\theta + 2\theta) \\
&= \sin\theta\cos 2\theta + \cos\theta\sin 2\theta \\
&= \sin\theta \cdot (1 - 2\sin^2\theta) + \cos\theta \cdot 2\sin\theta\cos\theta \\
&= \sin\theta - 2\sin^3\theta + 2\sin\theta\cos^2\theta \\
&= \sin\theta - 2\sin^3\theta + 2\sin\theta(1 - \sin^2\theta) \\
&= \sin\theta - 2\sin^3\theta + 2\sin\theta - 2\sin^3\theta \\
&= 3\sin\theta - 4\sin^3\theta
\end{aligned}$$

**Walk-through verify với $\theta = 30^\circ$**:
- Vế trái: $\sin 90^\circ = 1$.
- Vế phải: $3 \cdot \frac{1}{2} - 4 \cdot \left(\frac{1}{2}\right)^3 = \frac{3}{2} - 4 \cdot \frac{1}{8} = \frac{3}{2} - \frac{1}{2} = 1$.
- Khớp ✓.

📝 **Khi nào dùng?**: hiếm khi trong AI/ML. Chủ yếu trong vật lý sóng, vô tuyến điện, và các bài toán đa thức Chebyshev ($T_n(\cos\theta) = \cos(n\theta)$). Ghi lại để biết tồn tại, không cần học thuộc.

---

## 6. Công thức hạ bậc (Power Reduction)

### 6.1. Phát biểu

💡 **Trực giác**: ngược của nhân đôi. Nhân đôi đưa $\theta \to 2\theta$ nhưng tăng bậc số mũ ($\cos 2\theta$ chứa $\cos^2\theta$, $\sin^2\theta$). Hạ bậc đi ngược: viết $\sin^2\theta$, $\cos^2\theta$ qua $\cos 2\theta$ — giảm bậc, tăng góc.

Từ $\cos 2\theta = 1 - 2\sin^2\theta$:

$$\begin{aligned}
2\sin^2\theta &= 1 - \cos 2\theta \\
\sin^2\theta &= \frac{1 - \cos 2\theta}{2}
\end{aligned}$$

Từ $\cos 2\theta = 2\cos^2\theta - 1$:

$$\begin{aligned}
2\cos^2\theta &= 1 + \cos 2\theta \\
\cos^2\theta &= \frac{1 + \cos 2\theta}{2}
\end{aligned}$$

$$\begin{aligned}
\sin^2\theta &= \frac{1 - \cos 2\theta}{2} \\
\cos^2\theta &= \frac{1 + \cos 2\theta}{2}
\end{aligned}$$

### 6.2. Walk-through verify

**$\theta = 30^\circ$**:
- $\sin^2 30^\circ = (1/2)^2 = 1/4$.
- Vế phải: $(1 - \cos 60^\circ)/2 = (1 - 1/2)/2 = (1/2)/2 = 1/4$. ✓
- $\cos^2 30^\circ = (\sqrt{3}/2)^2 = 3/4$.
- Vế phải: $(1 + \cos 60^\circ)/2 = (1 + 1/2)/2 = (3/2)/2 = 3/4$. ✓

**$\theta = 45^\circ$**:
- $\sin^2 45^\circ = 1/2$.
- Vế phải: $(1 - \cos 90^\circ)/2 = (1 - 0)/2 = 1/2$. ✓
- $\cos^2 45^\circ = 1/2$.
- Vế phải: $(1 + \cos 90^\circ)/2 = 1/2$. ✓

### 6.3. Ứng dụng tích phân (preview Tầng 3)

Khi học tích phân (Tầng 3), ta cần tính $\int \sin^2 x \, dx$. Tích phân $\sin^2 x$ trực tiếp không có công thức đơn giản, nhưng nếu hạ bậc:

$$\begin{aligned}
\sin^2 x &= \frac{1 - \cos 2x}{2} \\[4pt]
\int \sin^2 x \, dx &= \int \frac{1 - \cos 2x}{2} \, dx \\
&= \frac{1}{2}\int 1 \, dx - \frac{1}{2}\int \cos 2x \, dx \\
&= \frac{x}{2} - \frac{1}{4}\sin 2x + C
\end{aligned}$$

Đây là **lý do quan trọng** học hạ bậc: nó biến biểu thức bậc 2 (khó) thành bậc 1 (dễ tích phân).

### 📝 Tóm tắt Mục 6

- Hạ bậc = ngược của nhân đôi.
- $\sin^2\theta = (1 - \cos 2\theta)/2$, $\cos^2\theta = (1 + \cos 2\theta)/2$.
- Ứng dụng quan trọng: tính tích phân ở Tầng 3.

---

## 7. Bộ identity tổng kết — cheatsheet

| Nhóm | Công thức |
|------|-----------|
| **Pythagorean** | $\sin^2\theta + \cos^2\theta = 1$ |
| | $1 + \tan^2\theta = \sec^2\theta$ |
| | $1 + \cot^2\theta = \csc^2\theta$ |
| **Phản xứng (parity)** | $\sin(-\theta) = -\sin\theta$ (lẻ) |
| | $\cos(-\theta) = \cos\theta$ (chẵn) |
| | $\tan(-\theta) = -\tan\theta$ (lẻ) |
| **Hàm bù** | $\sin(90^\circ - \theta) = \cos\theta$ |
| | $\cos(90^\circ - \theta) = \sin\theta$ |
| | $\tan(90^\circ - \theta) = \cot\theta$ |
| **Sum** | $\sin(\alpha + \beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$ |
| | $\cos(\alpha + \beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta$ |
| | $\tan(\alpha + \beta) = (\tan\alpha + \tan\beta)/(1 - \tan\alpha\tan\beta)$ |
| **Difference** | $\sin(\alpha - \beta) = \sin\alpha\cos\beta - \cos\alpha\sin\beta$ |
| | $\cos(\alpha - \beta) = \cos\alpha\cos\beta + \sin\alpha\sin\beta$ |
| | $\tan(\alpha - \beta) = (\tan\alpha - \tan\beta)/(1 + \tan\alpha\tan\beta)$ |
| **Double angle** | $\sin 2\theta = 2\sin\theta\cos\theta$ |
| | $\cos 2\theta = \cos^2\theta - \sin^2\theta = 2\cos^2\theta - 1 = 1 - 2\sin^2\theta$ |
| | $\tan 2\theta = 2\tan\theta / (1 - \tan^2\theta)$ |
| **Power reduction** | $\sin^2\theta = (1 - \cos 2\theta)/2$ |
| | $\cos^2\theta = (1 + \cos 2\theta)/2$ |
| **Triple angle** | $\sin 3\theta = 3\sin\theta - 4\sin^3\theta$ |
| | $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$ |

In ra giấy, dán cạnh máy là đủ dùng đến hết Tầng 4.

---

## 8. Định lý cosin (Law of Cosines) — **trọng tâm**

### 8.1. Phát biểu

💡 **Trực giác trước**: ta đã có **Pythagoras** cho tam giác **vuông**: $a^2 + b^2 = c^2$. Câu hỏi tự nhiên: nếu tam giác **không vuông** thì sao? Định lý cosin trả lời — nó là **bản tổng quát** của Pythagoras cho tam giác bất kỳ.

**Phát biểu**: cho tam giác bất kỳ với 3 cạnh $a, b, c$ và 3 góc đối diện tương ứng $A, B, C$ (ký hiệu chuẩn: cạnh $a$ đối diện đỉnh $A$, v.v.). Khi đó:

$$c^2 = a^2 + b^2 - 2ab \cdot \cos C \qquad (\bigstar \text{ định lý cosin})$$

Đối xứng, ta cũng có:

$$\begin{aligned}
a^2 &= b^2 + c^2 - 2bc \cdot \cos A \\
b^2 &= a^2 + c^2 - 2ac \cdot \cos B
\end{aligned}$$

### 8.2. Vì sao là "tổng quát của Pythagoras"?

💡 **Quan sát quan trọng**: khi $C = 90^\circ$, $\cos C = 0$, nên:

$$c^2 = a^2 + b^2 - 2ab \cdot 0 = a^2 + b^2 \qquad \leftarrow \text{Pythagoras}$$

Tức Pythagoras là **trường hợp đặc biệt** của định lý cosin khi $C = 90^\circ$.

**Phân tích theo độ lớn của $C$**:

| $C$ | $\cos C$ | Số hạng $-2ab\cos C$ | $c^2$ so với $a^2 + b^2$ |
|-----|---------|----------------------|------------------------|
| $< 90^\circ$ (góc nhọn) | $> 0$ | Âm | $c^2 < a^2 + b^2$ → cạnh đối **ngắn hơn** |
| $= 90^\circ$ (vuông) | $0$ | $0$ | $c^2 = a^2 + b^2$ (Pythagoras) |
| $> 90^\circ$ (góc tù) | $< 0$ | Dương | $c^2 > a^2 + b^2$ → cạnh đối **dài hơn** |

Trực giác hình học khớp: góc đối càng to thì cạnh đối càng dài (mở góc → nới cạnh).

### 8.3. Chứng minh bằng tọa độ + Pythagoras

**Setup**: đặt tam giác $ABC$ trong hệ tọa độ sao cho:
- Đỉnh $C = (0, 0)$ (ở gốc).
- Đỉnh $B = (a, 0)$ trên trục Ox (vì cạnh $a = CB$ có độ dài $a$, đặt nằm ngang).
- Đỉnh $A$ ở vị trí có góc $C$ với cạnh $CB$, cách $C$ một khoảng $b$ (vì cạnh $b = CA$ có độ dài $b$).

```
            A = (b cos C, b sin C)
           /|
          / |
       b /  | b sin C
        /   |
       / C  |
      /_____|________ B = (a, 0)
     C    b cos C         x-axis
     (0,0)
```

Tọa độ $A$ lấy theo định nghĩa cos/sin: đi từ $C$ góc $C$ với trục Ox, khoảng cách $b$ → $A = (b\cos C, b\sin C)$.

**Bước 1**: tính $c^2 = |AB|^2$ bằng công thức khoảng cách (Pythagoras trên tọa độ):

$$c^2 = (b\cos C - a)^2 + (b\sin C - 0)^2$$

**Bước 2**: khai triển:

$$\begin{aligned}
c^2 &= (b\cos C)^2 - 2 \cdot b\cos C \cdot a + a^2 + (b\sin C)^2 \\
&= b^2\cos^2 C - 2ab\cos C + a^2 + b^2\sin^2 C
\end{aligned}$$

**Bước 3**: nhóm $b^2(\cos^2 C + \sin^2 C)$:

$$c^2 = a^2 + b^2(\cos^2 C + \sin^2 C) - 2ab\cos C$$

**Bước 4**: dùng identity Pythagorean $\cos^2 C + \sin^2 C = 1$:

$$\begin{aligned}
c^2 &= a^2 + b^2 \cdot 1 - 2ab\cos C \\
&= a^2 + b^2 - 2ab\cos C \qquad \checkmark \text{ (đpcm)}
\end{aligned}$$

⚠ **Lưu ý**: chứng minh trên giả sử $C$ có thể là góc nhọn hoặc tù; cả hai trường hợp đều hoạt động vì $\sin C$ có thể âm/dương đều được (góc trong tam giác $0^\circ < C < 180^\circ$ nên $\sin C > 0$, và $\cos C$ đổi dấu khi $C$ vượt qua $90^\circ$). Chứng minh trên không phụ thuộc giả thiết $C$ nhọn.

### 8.4. Walk-through: tam giác có `a = 5, b = 7, C = 60°`. Tính `c`.

$$\begin{aligned}
c^2 &= a^2 + b^2 - 2ab\cos C \\
&= 25 + 49 - 2\cdot 5\cdot 7\cdot\cos 60^\circ \\
&= 74 - 70 \cdot \frac{1}{2} = 74 - 35 = 39 \\
c &= \sqrt{39} \approx 6.245
\end{aligned}$$

Kiểm tra hợp lý: vì $C = 60^\circ < 90^\circ$ (góc nhọn), ta kỳ vọng $c < \sqrt{a^2 + b^2} = \sqrt{74} \approx 8.6$. Thực tế $c \approx 6.245 < 8.6$ ✓.

### 8.5. Walk-through: tam giác có 3 cạnh `4, 5, 6`. Tính các góc.

Gán $a = 4, b = 5, c = 6$ (góc $A, B, C$ đối diện tương ứng).

**Góc $A$** (đối diện cạnh nhỏ nhất $a = 4$, nên $A$ nhỏ nhất):

$$\begin{aligned}
a^2 &= b^2 + c^2 - 2bc\cos A \\
16 &= 25 + 36 - 60\cos A \\
16 &= 61 - 60\cos A \\
60\cos A &= 45 \\
\cos A &= 45/60 = 0.75 \\
A &= \arccos(0.75) \approx 41.41^\circ
\end{aligned}$$

**Góc $B$**:

$$\begin{aligned}
b^2 &= a^2 + c^2 - 2ac\cos B \\
25 &= 16 + 36 - 48\cos B \\
25 &= 52 - 48\cos B \\
48\cos B &= 27 \\
\cos B &= 27/48 = 0.5625 \\
B &= \arccos(0.5625) \approx 55.77^\circ
\end{aligned}$$

**Góc $C$**:

$$\begin{aligned}
c^2 &= a^2 + b^2 - 2ab\cos C \\
36 &= 16 + 25 - 40\cos C \\
36 &= 41 - 40\cos C \\
40\cos C &= 5 \\
\cos C &= 5/40 = 0.125 \\
C &= \arccos(0.125) \approx 82.82^\circ
\end{aligned}$$

**Kiểm tổng góc**: $41.41 + 55.77 + 82.82 = 180.00^\circ$ ✓.

### 8.6. Walk-through: tam giác có `a = 3, b = 4, c = 5`. Tính `C`.

Nhận xét: $3^2 + 4^2 = 5^2$ → đây là tam giác vuông.

$$\begin{aligned}
c^2 &= a^2 + b^2 - 2ab\cos C \\
25 &= 9 + 16 - 24\cos C \\
25 &= 25 - 24\cos C \\
24\cos C &= 0 \\
\cos C &= 0 \\
C &= 90^\circ
\end{aligned}$$

Đúng như kỳ vọng. Định lý cosin "nhận ra" tam giác vuông khi $\cos C = 0$.

❓ **Câu hỏi tự nhiên**: *"Nếu biết 3 cạnh, làm sao chắc 3 cạnh đó tạo được tam giác? Có thể nào dữ liệu vô lý không?"*

**Bất đẳng thức tam giác**: ba số $a, b, c$ tạo được tam giác khi và chỉ khi mỗi cạnh **nhỏ hơn tổng** hai cạnh kia: $a < b + c$, $b < a + c$, $c < a + b$. Nếu vi phạm, định lý cosin sẽ cho $|\cos C| > 1$ (không hợp lệ) → bạn biết ngay dữ liệu sai.

Ví dụ: nếu $a = 1, b = 1, c = 5$ (vi phạm vì $1 + 1 = 2 < 5$):

$$\cos C = \frac{a^2 + b^2 - c^2}{2ab} = \frac{1 + 1 - 25}{2} = -\frac{23}{2} = -11.5$$

$\cos C$ phải $\in [-1, 1]$ → vô lý → tam giác không tồn tại. Định lý cosin tự "báo lỗi".

🔁 **Dừng lại tự kiểm tra**: tam giác có $a = 6, b = 8, C = 120^\circ$. Tính $c$.

<details>
<summary>Đáp án</summary>

$c^2 = 36 + 64 - 2\cdot 6\cdot 8\cdot\cos 120^\circ = 100 - 96\cdot(-1/2) = 100 + 48 = 148$.
$c = \sqrt{148} \approx 12.166$.

Kiểm: vì $C = 120^\circ > 90^\circ$, kỳ vọng $c > \sqrt{a^2 + b^2} = 10$. Thực tế $12.166 > 10$ ✓.

</details>

### 📝 Tóm tắt Mục 8

- Định lý cosin: $c^2 = a^2 + b^2 - 2ab\cos C$ — tổng quát Pythagoras cho tam giác bất kỳ.
- Khi $C = 90^\circ \to \cos = 0 \to$ quay về Pythagoras.
- Tính chiều dài cạnh khi biết 2 cạnh + góc xen giữa, hoặc tính góc khi biết 3 cạnh.
- Chứng minh bằng tọa độ: đặt tam giác cho $C$ ở gốc, dùng công thức khoảng cách + identity Pythagorean.

---

## 9. Định lý sin (Law of Sines) — giới thiệu

💡 **Trực giác**: trong tam giác, mỗi cạnh tỉ lệ thuận với sin của góc đối diện nó. Tỉ số `cạnh/sin(góc đối)` là **bằng nhau cho cả 3 cặp**.

**Phát biểu**:

$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R$$

với $R$ là bán kính đường tròn ngoại tiếp tam giác (đường tròn đi qua cả 3 đỉnh).

**Khi nào dùng?**
- Biết 2 góc + 1 cạnh → tìm các cạnh còn lại.
- Biết 2 cạnh + 1 góc đối diện (không xen) → tìm góc còn lại.

(Khi biết 2 cạnh + góc **xen giữa**, hoặc 3 cạnh, dùng định lý **cosin** thay vì sin.)

### Walk-through: tam giác có `A = 30°, B = 75°, a = 10`. Tính `b`.

$C = 180^\circ - 30^\circ - 75^\circ = 75^\circ$. Dùng định lý sin:

$$\begin{aligned}
\frac{a}{\sin A} &= \frac{b}{\sin B} \\
\frac{10}{\sin 30^\circ} &= \frac{b}{\sin 75^\circ} \\
\frac{10}{0.5} &= \frac{b}{0.9659} \\
20 &= \frac{b}{0.9659} \\
b &= 20 \cdot 0.9659 \approx 19.319
\end{aligned}$$

❓ **Câu hỏi tự nhiên**: *"Vì sao học cả định lý sin lẫn cosin? Có cái nào thay được cái kia không?"*

Có một số tình huống chỉ cosin giải được (ASA, AAS với 2 cạnh + góc xen, hoặc SSS). Có tình huống định lý sin gọn hơn (AAS, ASA). Học cả hai vì chúng bù trừ — quy tắc chung:
- **Biết 2 cạnh + góc xen giữa** → **cosin**.
- **Biết 3 cạnh** → **cosin** (tính được góc).
- **Biết 2 góc + 1 cạnh** → **sin**.
- **Biết 2 cạnh + góc đối diện (không xen)** → **sin** (cẩn thận có thể có 2 nghiệm, gọi là *ambiguous case*).

### 📝 Tóm tắt Mục 9

- $a/\sin A = b/\sin B = c/\sin C = 2R$.
- Dùng khi biết góc + cạnh chéo nhau (không xen).
- Định lý sin và cosin **bù trừ** — học cả hai.

---

## 10. Cosine similarity — preview (RẤT QUAN TRỌNG)

> Đây là **mục đích cuối cùng** của Lesson 05. Mọi identity và định lý cosin học ở trên đều dẫn về **một dòng** sẽ học chính thức ở Tầng 4 và dùng khắp Tầng 6: cách đo "độ giống nhau" của hai vector.

### 10.1. Vector trong mặt phẳng — nhắc nhanh

💡 **Hình dung**: một vector $\mathbf{u}$ trong mặt phẳng là **mũi tên** từ gốc tới một điểm. Trong tọa độ, viết $\mathbf{u} = (u_1, u_2)$ — hai số: hoành độ và tung độ.

**Hai thao tác cốt lõi**:
- **Độ dài** (hoặc *norm*): $|\mathbf{u}| = \sqrt{u_1^2 + u_2^2}$ (Pythagoras trên tọa độ).
- **Dot product** (tích vô hướng): $\mathbf{u} \cdot \mathbf{v} = u_1 v_1 + u_2 v_2$ — nhân thành phần rồi cộng.

**Ví dụ số**: $\mathbf{u} = (3, 4)$, $\mathbf{v} = (1, 2)$.
- $|\mathbf{u}| = \sqrt{9 + 16} = \sqrt{25} = 5$.
- $|\mathbf{v}| = \sqrt{1 + 4} = \sqrt{5} \approx 2.236$.
- $\mathbf{u} \cdot \mathbf{v} = 3\cdot 1 + 4\cdot 2 = 3 + 8 = 11$.

❓ **Tại sao gọi là "vô hướng"?** Vì kết quả là **một số** (scalar), không phải vector. Bạn nhân hai vector ra một con số.

### 10.2. Định lý liên hệ dot product với góc

💡 **Trực giác**: dot product **không chỉ là** "nhân thành phần rồi cộng". Nó còn có nghĩa hình học: liên quan tới độ dài và góc giữa 2 vector.

$$\mathbf{u} \cdot \mathbf{v} = |\mathbf{u}| \cdot |\mathbf{v}| \cdot \cos\theta \qquad (\bigstar \text{ DOT PRODUCT — GÓC})$$

với $\theta$ là góc giữa $\mathbf{u}$ và $\mathbf{v}$ (góc tạo bởi 2 mũi tên cùng gốc).

**Đây là công thức xương sống của embedding similarity.**

### 10.3. Chứng minh bằng định lý cosin (5 bước)

**Setup**: đặt $\mathbf{u}$, $\mathbf{v}$ cùng gốc tại $O$. Vẽ vector $\mathbf{u} - \mathbf{v}$ (từ ngọn $\mathbf{v}$ tới ngọn $\mathbf{u}$). Khi đó tam giác $O, \mathbf{u}, \mathbf{v}$ có:
- Cạnh $OA$ (với $A$ = ngọn $\mathbf{u}$) độ dài $|\mathbf{u}|$.
- Cạnh $OB$ (với $B$ = ngọn $\mathbf{v}$) độ dài $|\mathbf{v}|$.
- Cạnh $AB$ (từ ngọn $\mathbf{v}$ tới ngọn $\mathbf{u}$) độ dài $|\mathbf{u} - \mathbf{v}|$.
- Góc tại $O$ giữa $OA$ và $OB$ là $\theta$.

```
       A (ngọn u)
      /|
     / |
    /  |  |u-v|
|u|/   |
  /    |
 / θ   |
O──────B (ngọn v)
   |v|
```

**Bước 1 — định lý cosin cho tam giác $OAB$** (cạnh đối góc $\theta$ là $AB = |\mathbf{u} - \mathbf{v}|$):

$$|\mathbf{u} - \mathbf{v}|^2 = |\mathbf{u}|^2 + |\mathbf{v}|^2 - 2 \cdot |\mathbf{u}| \cdot |\mathbf{v}| \cdot \cos\theta \qquad [\text{định lý cosin}] \quad (\bigstar 1)$$

**Bước 2 — tính $|\mathbf{u} - \mathbf{v}|^2$ bằng tọa độ**:

$$\begin{aligned}
|\mathbf{u} - \mathbf{v}|^2 &= (u_1 - v_1)^2 + (u_2 - v_2)^2 \\
&= u_1^2 - 2u_1 v_1 + v_1^2 + u_2^2 - 2u_2 v_2 + v_2^2 \\
&= (u_1^2 + u_2^2) + (v_1^2 + v_2^2) - 2(u_1 v_1 + u_2 v_2) \\
&= |\mathbf{u}|^2 + |\mathbf{v}|^2 - 2(\mathbf{u} \cdot \mathbf{v}) \qquad (\bigstar 2)
\end{aligned}$$

**Bước 3 — đặt (✦1) bằng (✦2)** (cùng là $|\mathbf{u} - \mathbf{v}|^2$):

$$|\mathbf{u}|^2 + |\mathbf{v}|^2 - 2|\mathbf{u}||\mathbf{v}|\cos\theta = |\mathbf{u}|^2 + |\mathbf{v}|^2 - 2(\mathbf{u} \cdot \mathbf{v})$$

**Bước 4 — rút gọn**: trừ $|\mathbf{u}|^2 + |\mathbf{v}|^2$ cả 2 vế:

$$-2|\mathbf{u}||\mathbf{v}|\cos\theta = -2(\mathbf{u} \cdot \mathbf{v})$$

**Bước 5 — chia cả 2 vế cho $-2$**:

$$|\mathbf{u}||\mathbf{v}|\cos\theta = \mathbf{u} \cdot \mathbf{v}$$

Hoán đổi vế:

$$\mathbf{u} \cdot \mathbf{v} = |\mathbf{u}|\,|\mathbf{v}|\cos\theta \qquad \checkmark \text{ (đpcm)}$$

🎯 **Đây là một trong vài kết quả quan trọng nhất bạn sẽ học ở cả lộ trình `Vectors/`.** Hãy hiểu nó kỹ. Tất cả "embedding similarity" trong AI quay về dòng này.

### 10.4. Cosine similarity — định nghĩa

Từ $\mathbf{u} \cdot \mathbf{v} = |\mathbf{u}|\,|\mathbf{v}|\cos\theta$, chia cả 2 vế cho $|\mathbf{u}| \cdot |\mathbf{v}|$ (giả sử cả hai vector khác $\mathbf{0}$):

$$\cos\theta = \frac{\mathbf{u} \cdot \mathbf{v}}{|\mathbf{u}| \cdot |\mathbf{v}|}$$

Đại lượng vế phải gọi là **cosine similarity** của 2 vector — viết tắt $\operatorname{cos\_sim}(\mathbf{u}, \mathbf{v})$.

**Tính chất**:
- $\operatorname{cos\_sim} \in [-1, 1]$ (vì $\cos\theta \in [-1, 1]$).
- $\operatorname{cos\_sim} = 1 \iff \theta = 0^\circ \iff$ 2 vector **cùng hướng** (giống nhau hoàn toàn).
- $\operatorname{cos\_sim} = 0 \iff \theta = 90^\circ \iff$ 2 vector **vuông góc** (không liên quan).
- $\operatorname{cos\_sim} = -1 \iff \theta = 180^\circ \iff$ 2 vector **ngược hướng** (đối lập hoàn toàn).

### 10.5. Walk-through: cosine similarity của 2 vector cụ thể

**Ví dụ A**: $\mathbf{u} = (1, 0)$, $\mathbf{v} = (1, 1)$.

- $\mathbf{u} \cdot \mathbf{v} = 1\cdot 1 + 0\cdot 1 = 1$.
- $|\mathbf{u}| = \sqrt{1+0} = 1$.
- $|\mathbf{v}| = \sqrt{1+1} = \sqrt{2}$.
- $\cos\theta = \dfrac{1}{1 \cdot \sqrt{2}} = \dfrac{1}{\sqrt{2}} = \dfrac{\sqrt{2}}{2} \approx 0.7071$.
- $\theta = \arccos(0.7071) = 45^\circ$.

Đúng kỳ vọng — $\mathbf{u} = (1, 0)$ chĩa dọc trục x, $\mathbf{v} = (1, 1)$ chĩa đường chéo, góc giữa là $45^\circ$.

**Ví dụ B**: $\mathbf{u} = (3, 4)$, $\mathbf{v} = (1, 2)$.

- $\mathbf{u} \cdot \mathbf{v} = 11$ (tính ở 10.1).
- $|\mathbf{u}| = 5$, $|\mathbf{v}| = \sqrt{5}$.
- $\cos\theta = \dfrac{11}{5 \cdot \sqrt{5}} = \dfrac{11}{5\sqrt{5}} = \dfrac{11\sqrt{5}}{25} \approx 0.9839$.
- $\theta \approx \arccos(0.9839) \approx 10.30^\circ$.

Hai vector "khá giống nhau" (góc nhỏ, cosine sim gần $1$).

**Ví dụ C**: $\mathbf{u} = (1, 0)$, $\mathbf{v} = (0, 1)$.

- $\mathbf{u} \cdot \mathbf{v} = 0$.
- $|\mathbf{u}| = |\mathbf{v}| = 1$.
- $\cos\theta = 0$.
- $\theta = 90^\circ$. Hai vector **vuông góc** — cosine similarity bằng $0$.

**Ví dụ D**: $\mathbf{u} = (1, 2)$, $\mathbf{v} = (-1, -2)$.

- $\mathbf{u} \cdot \mathbf{v} = -1 - 4 = -5$.
- $|\mathbf{u}| = |\mathbf{v}| = \sqrt{5}$.
- $\cos\theta = \dfrac{-5}{\sqrt{5} \cdot \sqrt{5}} = \dfrac{-5}{5} = -1$.
- $\theta = 180^\circ$. Hai vector **ngược hướng** — cosine similarity = $-1$.

### 10.6. Vì sao **quan trọng** cho embedding và AI?

💡 **Hình dung**: trong AI hiện đại, mỗi từ/câu/ảnh được biến thành một **vector** (gọi là **embedding**) — thường ở chiều cao (vd $768$ chiều với BERT, $1536$ với OpenAI embedding, $4096$ với một số LLM).

Hai embedding $\mathbf{u}, \mathbf{v}$ "giống nhau về nghĩa" $\iff$ chúng **chĩa cùng hướng** trong không gian 768 chiều $\iff \cos\theta \approx 1$.

**Vì sao dùng $\cos\theta$ chứ không dùng khoảng cách Euclidean $|\mathbf{u} - \mathbf{v}|$?**

Embedding thường **không chuẩn hóa độ dài** — vector của câu dài có thể $|\mathbf{u}|$ to hơn câu ngắn. Khoảng cách $|\mathbf{u} - \mathbf{v}|$ bị ảnh hưởng bởi độ dài. Nhưng $\cos\theta$ chỉ phụ thuộc **hướng**, không phụ thuộc độ dài — đo "nội dung" thuần túy.

**Liên hệ giữa khoảng cách và dot product** (từ (✦2)):

$$|\mathbf{u} - \mathbf{v}|^2 = |\mathbf{u}|^2 + |\mathbf{v}|^2 - 2(\mathbf{u} \cdot \mathbf{v})$$

Hai cách đo "khác nhau" thực ra liên kết chặt qua dot product. Khi embedding **đã chuẩn hóa** ($|\mathbf{u}| = |\mathbf{v}| = 1$), $|\mathbf{u} - \mathbf{v}|^2 = 2 - 2(\mathbf{u}\cdot\mathbf{v}) = 2(1 - \cos\theta)$ — khoảng cách Euclidean bình phương và cosine sim biến đổi 1-1 cho nhau.

**Áp dụng thực tế trong AI/ML**:

| Ứng dụng | Cách dùng cosine similarity |
|----------|----------------------------|
| **Semantic search** | Embedding query, tìm các document có cos sim cao nhất → kết quả liên quan. |
| **Recommendation** | Embedding user và item, gợi ý item có cos sim cao với user. |
| **RAG (Retrieval-Augmented Generation)** | Embedding câu hỏi, tìm passage liên quan trong vector DB bằng cos sim, đưa vào prompt LLM. |
| **Clustering** | Gom các embedding gần nhau (cos sim cao) thành cụm. |
| **Attention (Transformer)** | Tính $\operatorname{softmax}(Q\cdot K^T / \sqrt{d})$ — bản chất là dot product giữa query và key vectors. |
| **CLIP (image ↔ text)** | Embed ảnh và text vào cùng không gian; cos sim cao = ảnh khớp với mô tả. |

### 10.7. Mở rộng cho `n` chiều — công thức không đổi

❓ **Câu hỏi tự nhiên**: *"Chứng minh ở 10.3 dùng tam giác trong mặt phẳng. Vector embedding 768 chiều thì làm sao?"*

**Trả lời**: công thức $\mathbf{u} \cdot \mathbf{v} = u_1 v_1 + u_2 v_2 + \dots + u_n v_n$ và $|\mathbf{u}| = \sqrt{u_1^2 + \dots + u_n^2}$ **mở rộng tự nhiên cho n chiều**. Định lý $\mathbf{u} \cdot \mathbf{v} = |\mathbf{u}|\,|\mathbf{v}|\cos\theta$ vẫn đúng — chỉ cần định nghĩa "góc giữa 2 vector n chiều" qua công thức này. Tầng 4 (Linear Algebra) sẽ chứng minh chặt chẽ.

Trong code, bạn không quan tâm chiều — vòng `for i := 0; i < n; i++` cho mọi `n`:

```go
func dotProduct(u, v []float64) float64 {
    s := 0.0
    for i := range u {
        s += u[i] * v[i]
    }
    return s
}

func cosineSimilarity(u, v []float64) float64 {
    return dotProduct(u, v) / (norm(u) * norm(v))
}
```

⚠ **Lỗi thường gặp**: chia cho $0$ khi một vector là vector $\mathbf{0}$ (tất cả thành phần $= 0$). Phải check $|\mathbf{u}| > 0$ và $|\mathbf{v}| > 0$ trước. Vector $\mathbf{0}$ không có hướng, cosine similarity không định nghĩa được.

🔁 **Dừng lại tự kiểm tra**: tính cosine similarity của $\mathbf{u} = (1, 1, 1)$ và $\mathbf{v} = (1, 0, 0)$.

<details>
<summary>Đáp án</summary>

- $\mathbf{u} \cdot \mathbf{v} = 1\cdot 1 + 1\cdot 0 + 1\cdot 0 = 1$.
- $|\mathbf{u}| = \sqrt{1+1+1} = \sqrt{3}$.
- $|\mathbf{v}| = \sqrt{1} = 1$.
- $\cos\theta = 1/(\sqrt{3} \cdot 1) = 1/\sqrt{3} \approx 0.577$.
- $\theta \approx \arccos(0.577) \approx 54.74^\circ$.

</details>

### 📝 Tóm tắt Mục 10

- Dot product $\mathbf{u} \cdot \mathbf{v}$ = nhân thành phần + cộng (đại số) = $|\mathbf{u}|\,|\mathbf{v}|\cos\theta$ (hình học) — hai mặt của cùng một đồng xu.
- Chứng minh sự tương đương dùng **định lý cosin** trên tam giác $O, \mathbf{u}, \mathbf{v}$.
- Cosine similarity = $\cos\theta = (\mathbf{u} \cdot \mathbf{v}) / (|\mathbf{u}|\,|\mathbf{v}|)$ — đo độ giống nhau giữa 2 vector, không phụ thuộc độ dài.
- Tất cả semantic search, RAG, recommendation đều quay về metric này.

---

## 11. Liên hệ ML/AI và các tầng sau

### 11.1. Tầng 3 — Calculus

- Tính tích phân $\int \sin^2 x \, dx$ và $\int \cos^2 x \, dx$ cần **hạ bậc** (Mục 6). Đây là tích phân nền tảng trong vật lý và xử lý tín hiệu.
- **Đạo hàm $\sin x$** là $\cos x$, **đạo hàm $\cos x$** là $-\sin x$. Quan hệ này dẫn tới **phương trình vi phân điều hòa**, mô tả mọi dao động (lò xo, sóng, mạch RLC).

### 11.2. Tầng 4 — Linear Algebra

- **Dot product** trở thành **inner product** tổng quát, định nghĩa "góc" trong không gian vector bất kỳ (kể cả không gian hàm).
- **Định lý cosin** dạng $|\mathbf{u} - \mathbf{v}|^2 = |\mathbf{u}|^2 + |\mathbf{v}|^2 - 2(\mathbf{u}\cdot\mathbf{v})$ là cách hiểu **khoảng cách Euclidean qua dot product**, dẫn tới các bất đẳng thức Cauchy-Schwarz, tam giác.
- **Ma trận xoay** (Lesson 06 ngay sau bài này) sử dụng **công thức cộng** trực tiếp — ma trận xoay góc $\alpha$ rồi xoay góc $\beta$ cho ra ma trận xoay $\alpha + \beta$, do đó các phần tử của tích ma trận chính là $\sin(\alpha+\beta), \cos(\alpha+\beta)$.

### 11.3. Tầng 6 — Vector search, RAG, embedding

- **Cosine similarity** là metric chính trong các vector database (FAISS, Pinecone, Weaviate, Qdrant). Khi bạn `db.query(embedding, top_k=5)`, hệ thống tính cos sim giữa query embedding và mọi document embedding (đã được chuẩn hóa $|\cdot| = 1$ thường để cos sim = dot product), trả về 5 cao nhất.
- **Attention trong Transformer**: $\operatorname{softmax}(Q K^T / \sqrt{d_k})\, V$ — $Q K^T$ chính là dot product giữa các vector query và key. Khi vector chuẩn hóa, đây gần như cos sim. Cơ chế "attention" thực ra là "tìm vector key giống query nhất".
- **CLIP, ALIGN, embedding model**: huấn luyện sao cho ảnh và mô tả text tương ứng có cos sim cao, ảnh và mô tả không liên quan có cos sim thấp.

### 11.4. RoPE (Rotary Position Embedding) — preview Lesson 06

Bài tiếp theo (Lesson 06 — Ma trận xoay) sẽ dạy cách "xoay" vector embedding bằng ma trận $R(\theta)$. Trong **RoPE** (kỹ thuật dùng trong LLM hiện đại như LLaMA, GPT-NeoX), người ta **xoay** vector key/query embedding một góc phụ thuộc vào **vị trí token** trong câu. Cos sim giữa các vector đã xoay có tính chất đặc biệt: nó phụ thuộc **vị trí tương đối** giữa 2 token (không phải vị trí tuyệt đối).

Lesson 06 sẽ đi sâu.

### 📝 Tóm tắt Mục 11

- Identity và định lý cosin **không** dừng ở lượng giác phổ thông — chúng là **nền tảng** của mọi metric similarity trong AI.
- Mỗi lần bạn `vector_db.search()` trong RAG, mỗi lần Transformer tính attention, bạn đều đang dùng định lý cosin.
- Lesson 06 (ma trận xoay) sẽ mở rộng sang RoPE.

---

## 12. Bài tập

### Bài 1 — sin 15° và cos 105°

Tính $\sin 15^\circ$ và $\cos 105^\circ$ bằng công thức cộng.

### Bài 2 — Identity verification

Chứng minh $\sin 2\theta + \cos 2\theta = 1 - 2\sin^2\theta + 2\sin\theta\cos\theta$. Verify bằng số với $\theta = 30^\circ$.

### Bài 3 — Định lý cosin

Tam giác có $a = 8, b = 10, C = 45^\circ$. Tính $c$ và hai góc còn lại $A, B$.

### Bài 4 — Cosine similarity 2D

Cho hai vector $\mathbf{u} = (3, 4)$ và $\mathbf{v} = (1, 2)$. Tính:
1. $|\mathbf{u}|$
2. $|\mathbf{v}|$
3. $\mathbf{u} \cdot \mathbf{v}$
4. $\cos\theta$ (cosine similarity)
5. $\theta$ (góc giữa, theo độ)

### Bài 5 — Hai vector đơn vị

Cho hai vector đơn vị ($|\mathbf{u}| = |\mathbf{v}| = 1$) tạo với nhau góc $60^\circ$. Tính dot product $\mathbf{u} \cdot \mathbf{v}$. Cosine similarity bằng bao nhiêu?

### Bài 6 — Code Go `cosineSimilarity`

Viết hàm Go:

```go
func cosineSimilarity(u, v []float64) float64
```

Yêu cầu:
- Hỗ trợ vector `n` chiều (`n` tùy ý).
- Trả về `0` nếu một trong hai vector là vector `0` (tránh chia 0).
- Test với 3 cặp vector:
  1. `u = (1, 0, 0), v = (1, 0, 0)` → kỳ vọng `1.0`.
  2. `u = (1, 0, 0), v = (0, 1, 0)` → kỳ vọng `0.0`.
  3. `u = (1, 2, 3), v = (2, 4, 6)` → kỳ vọng `1.0` (cùng hướng vì `v = 2u`).

---

## 13. Lời giải chi tiết

### Bài 1 — Giải

**$\sin 15^\circ$**: $15^\circ = 45^\circ - 30^\circ$, dùng $\sin(\alpha - \beta) = \sin\alpha\cos\beta - \cos\alpha\sin\beta$:

$$\begin{aligned}
\sin 15^\circ &= \sin 45^\circ\cos 30^\circ - \cos 45^\circ\sin 30^\circ \\
&= \frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2} - \frac{\sqrt{2}}{2}\cdot\frac{1}{2} \\
&= \frac{\sqrt{6}}{4} - \frac{\sqrt{2}}{4} = \frac{\sqrt{6} - \sqrt{2}}{4} \\
&\approx \frac{2.449 - 1.414}{4} \approx 0.2588
\end{aligned}$$

**$\cos 105^\circ$**: $105^\circ = 60^\circ + 45^\circ$, dùng $\cos(\alpha + \beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta$:

$$\begin{aligned}
\cos 105^\circ &= \cos 60^\circ\cos 45^\circ - \sin 60^\circ\sin 45^\circ \\
&= \frac{1}{2}\cdot\frac{\sqrt{2}}{2} - \frac{\sqrt{3}}{2}\cdot\frac{\sqrt{2}}{2} \\
&= \frac{\sqrt{2}}{4} - \frac{\sqrt{6}}{4} = \frac{\sqrt{2} - \sqrt{6}}{4} \\
&\approx \frac{1.414 - 2.449}{4} \approx -0.2588
\end{aligned}$$

**Quan sát**: $\cos 105^\circ = -\sin 15^\circ$. Vì $105^\circ = 90^\circ + 15^\circ$ và $\cos(90^\circ + x) = -\sin x$. Một kiểm tra hợp lý.

### Bài 2 — Giải

Vế phải:

$$1 - 2\sin^2\theta + 2\sin\theta\cos\theta$$

Áp dụng identity:
- $1 - 2\sin^2\theta = \cos 2\theta$ (công thức nhân đôi, dạng III).
- $2\sin\theta\cos\theta = \sin 2\theta$ (công thức nhân đôi).

Vế phải $= \cos 2\theta + \sin 2\theta = \sin 2\theta + \cos 2\theta =$ vế trái. ✓

**Verify với $\theta = 30^\circ$**:
- Vế trái: $\sin 60^\circ + \cos 60^\circ = \frac{\sqrt{3}}{2} + \frac{1}{2} = \frac{\sqrt{3} + 1}{2} \approx 1.366$.
- Vế phải: $1 - 2\sin^2 30^\circ + 2\sin 30^\circ\cos 30^\circ = 1 - 2\cdot\frac{1}{4} + 2\cdot\frac{1}{2}\cdot\frac{\sqrt{3}}{2} = 1 - \frac{1}{2} + \frac{\sqrt{3}}{2} = \frac{1}{2} + \frac{\sqrt{3}}{2} = \frac{1 + \sqrt{3}}{2} \approx 1.366$. ✓

### Bài 3 — Giải

**Tính $c$** (định lý cosin, biết $a, b, C$):

$$\begin{aligned}
c^2 &= a^2 + b^2 - 2ab\cos C \\
&= 64 + 100 - 2\cdot 8\cdot 10\cdot\cos 45^\circ \\
&= 164 - 160 \cdot \frac{\sqrt{2}}{2} = 164 - 80\sqrt{2} \\
&\approx 164 - 113.137 \approx 50.863 \\
c &\approx \sqrt{50.863} \approx 7.131
\end{aligned}$$

**Tính $A$** (định lý cosin):

$$\begin{aligned}
a^2 &= b^2 + c^2 - 2bc\cos A \\
64 &= 100 + 50.863 - 2\cdot 10\cdot 7.131\cdot\cos A \\
64 &= 150.863 - 142.62\cos A \\
142.62\cos A &= 86.863 \\
\cos A &= 0.6090 \\
A &= \arccos(0.6090) \approx 52.49^\circ
\end{aligned}$$

**Tính $B$**: $B = 180^\circ - A - C = 180^\circ - 52.49^\circ - 45^\circ = 82.51^\circ$.

**Kiểm**: kiểm bằng định lý sin: $b/\sin B = 10/\sin 82.51^\circ = 10/0.9914 \approx 10.087$. $a/\sin A = 8/\sin 52.49^\circ = 8/0.7933 \approx 10.084$. $c/\sin C = 7.131/\sin 45^\circ = 7.131/0.7071 \approx 10.085$. Cả 3 tỉ số gần nhau (sai số nhỏ do làm tròn) → đúng ✓.

### Bài 4 — Giải

$\mathbf{u} = (3, 4)$, $\mathbf{v} = (1, 2)$.

1. $|\mathbf{u}| = \sqrt{9 + 16} = \sqrt{25} = 5$.
2. $|\mathbf{v}| = \sqrt{1 + 4} = \sqrt{5} \approx 2.2361$.
3. $\mathbf{u} \cdot \mathbf{v} = 3\cdot 1 + 4\cdot 2 = 3 + 8 = 11$.
4. $\cos\theta = \dfrac{11}{5 \cdot \sqrt{5}} = \dfrac{11}{5\sqrt{5}} = \dfrac{11}{5\sqrt{5}} \cdot \dfrac{\sqrt{5}}{\sqrt{5}} = \dfrac{11\sqrt{5}}{25} \approx 0.9839$.
5. $\theta = \arccos(0.9839) \approx 10.30^\circ$.

**Trực giác**: hai vector "khá giống nhau" — chĩa gần cùng hướng (cả hai có tỉ lệ tung/hoành tương tự: $4/3 \approx 1.33$ và $2/1 = 2$, không quá xa).

### Bài 5 — Giải

$|\mathbf{u}| = |\mathbf{v}| = 1$, $\theta = 60^\circ$. Từ định lý $\mathbf{u} \cdot \mathbf{v} = |\mathbf{u}|\,|\mathbf{v}|\cos\theta$:

$$\mathbf{u} \cdot \mathbf{v} = 1 \cdot 1 \cdot \cos 60^\circ = \frac{1}{2} = 0.5$$

**Cosine similarity** = $\cos\theta = \cos 60^\circ = 0.5$.

Vì hai vector đã chuẩn hóa độ dài bằng $1$, **dot product chính là cosine similarity**. Đây là lý do trong vector database thực tế, người ta thường **chuẩn hóa embedding** trước khi lưu ($\mathbf{u} \to \mathbf{u} / |\mathbf{u}|$) — khi đó tìm kiếm theo cos sim chỉ cần tính dot product, nhanh hơn.

### Bài 6 — Giải

```go
package main

import (
	"fmt"
	"math"
)

// norm tính độ dài Euclidean của vector
func norm(u []float64) float64 {
	s := 0.0
	for _, x := range u {
		s += x * x
	}
	return math.Sqrt(s)
}

// dotProduct tính tích vô hướng (dot product) của 2 vector cùng độ dài
func dotProduct(u, v []float64) float64 {
	s := 0.0
	for i := range u {
		s += u[i] * v[i]
	}
	return s
}

// cosineSimilarity trả về cos θ giữa 2 vector u và v.
// Trả về 0 nếu một trong hai là vector 0 (tránh chia 0).
func cosineSimilarity(u, v []float64) float64 {
	if len(u) != len(v) {
		panic("cosineSimilarity: hai vector phải cùng độ dài")
	}
	nu := norm(u)
	nv := norm(v)
	if nu == 0 || nv == 0 {
		return 0
	}
	return dotProduct(u, v) / (nu * nv)
}

func main() {
	tests := []struct {
		u, v []float64
		want float64
	}{
		{[]float64{1, 0, 0}, []float64{1, 0, 0}, 1.0},
		{[]float64{1, 0, 0}, []float64{0, 1, 0}, 0.0},
		{[]float64{1, 2, 3}, []float64{2, 4, 6}, 1.0},
	}
	for _, t := range tests {
		got := cosineSimilarity(t.u, t.v)
		fmt.Printf("cosineSimilarity(%v, %v) = %.6f (want %.1f)\n", t.u, t.v, got, t.want)
	}
}
```

**Output kỳ vọng**:
```
cosineSimilarity([1 0 0], [1 0 0]) = 1.000000 (want 1.0)
cosineSimilarity([1 0 0], [0 1 0]) = 0.000000 (want 0.0)
cosineSimilarity([1 2 3], [2 4 6]) = 1.000000 (want 1.0)
```

**Giải thích test 3**: $\mathbf{v} = (2, 4, 6) = 2\cdot(1, 2, 3) = 2\mathbf{u}$. Hai vector cùng hướng, chỉ khác độ dài → cosine sim = $1$. Đây minh họa: **cosine sim không quan tâm độ dài**, chỉ quan tâm hướng.

**Độ phức tạp**: $O(n)$ mỗi cặp vector ($n$ là chiều). Khi cần so query với $N$ document, tổng $O(N\cdot n)$. Với $N$ triệu và $n = 768$, đó là $\sim 10^9$ phép tính — chậm. Vector database dùng cấu trúc như HNSW, IVF để giảm xuống $O(\log N \cdot n)$.

---

## 14. Tham khảo & liên kết

- **Code Go**: [solutions.go](./solutions.go)
- **Visualization tương tác**: [visualization.html](./visualization.html)
- **Lesson trước**: [Lesson 04 — Đồ thị hàm lượng giác](../lesson-04-trig-graphs/)
- **Lesson kế**: [Lesson 06 — Ma trận xoay 2D/3D](../lesson-06-rotation-matrix/) — RoPE preview
- **Tầng kế tiếp**: [Tầng 3 — Calculus](../../03-Calculus/) (sắp ra) — đạo hàm, gradient, tích phân.

📝 **Tóm tắt cả bài**:

1. Identity là biểu thức đúng với mọi giá trị biến (khác phương trình).
2. Pythagorean: $\sin^2 + \cos^2 = 1$ và 2 biến thể (chia cho $\cos^2$, $\sin^2$).
3. Sum: $\sin(\alpha\pm\beta), \cos(\alpha\pm\beta), \tan(\alpha\pm\beta)$ — nhớ mnemonic dấu.
4. Double angle: $\sin 2\theta = 2\sin\cos$, $\cos 2\theta$ có 3 dạng.
5. Power reduction: $\sin^2\theta = (1-\cos 2\theta)/2$ — dùng để tính tích phân.
6. **Định lý cosin**: $c^2 = a^2 + b^2 - 2ab\cos C$ — tổng quát Pythagoras.
7. **$\mathbf{u} \cdot \mathbf{v} = |\mathbf{u}|\,|\mathbf{v}|\cos\theta$** — chứng minh bằng định lý cosin, là xương sống của cosine similarity.
8. Cosine similarity = $(\mathbf{u}\cdot\mathbf{v}) / (|\mathbf{u}||\mathbf{v}|) \in [-1, 1]$ — đo độ giống nhau giữa 2 vector. Dùng khắp AI/ML.
