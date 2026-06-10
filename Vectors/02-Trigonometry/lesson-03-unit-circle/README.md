# Lesson 03 — Đường tròn đơn vị (Unit Circle)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **đường tròn đơn vị** (unit circle) là gì và vì sao nó là công cụ chuẩn để mở rộng $\sin$, $\cos$, $\tan$ ra mọi góc.
- Trả lời được những câu hỏi mà Lesson 02 còn bỏ ngỏ: *"$\sin 150^\circ$ là gì? $\cos(-45^\circ)$ là gì? $\sin 720^\circ$ thì sao?"*
- Thuộc tọa độ của **12 góc đặc biệt** trên đường tròn đơn vị ($0^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ, \ldots 360^\circ$).
- Biết dấu của $\sin$, $\cos$, $\tan$ trong **4 quadrant** (góc tư) và mnemonic "All Students Take Calculus".
- Áp dụng **công thức quy gọn (reduction formulas)** để chuyển góc bất kỳ về góc nhọn quen thuộc.
- Hiểu khái niệm **góc tham chiếu (reference angle)** và quy trình 3 bước để tính $\sin/\cos$ của góc bất kỳ.
- Liên hệ tới **positional encoding** của Transformer — sin/cos với tần số khác nhau chính là các điểm quay trên đường tròn đơn vị.

## Kiến thức tiền đề

- [Lesson 02 — Tam giác vuông, SOH-CAH-TOA](../lesson-02-right-triangle/): biết $\sin = \frac{\text{đối}}{\text{huyền}}$, $\cos = \frac{\text{kề}}{\text{huyền}}$, $\tan = \frac{\text{đối}}{\text{kề}}$ cho **góc nhọn**.
- [Lesson 01 — Góc và radian](../lesson-01-angles/): biết đổi giữa độ và radian, $180^\circ = \pi \text{ rad}$, $360^\circ = 2\pi \text{ rad}$.
- Từ Algebra Tầng 1: phương trình đường tròn $x^2 + y^2 = r^2$ (xem [Algebra/lesson-07-systems](../../01-Algebra/) nếu cần).
- Định lý Pythagoras: $a^2 + b^2 = c^2$ trong tam giác vuông.

> **Bức tranh lớn của cả bài**: ở Lesson 02 ta định nghĩa $\sin/\cos/\tan$ chỉ cho **góc nhọn trong tam giác vuông**. Đó là một định nghĩa hẹp — không nói gì về $\sin 150^\circ$, $\cos(-30^\circ)$, $\sin 720^\circ$. Bài này thay định nghĩa "tam giác" bằng định nghĩa "đường tròn đơn vị": **$(\cos\theta, \sin\theta)$ là tọa độ của điểm P trên đường tròn bán kính 1 sau khi quay góc $\theta$ ngược chiều kim đồng hồ**. Với định nghĩa mới, mọi góc thực đều có sin và cos — kể cả âm, kể cả lớn hơn $360^\circ$.

---

## 1. Vấn đề: định nghĩa Lesson 02 quá hẹp

### 1.1. Nhắc lại định nghĩa tam giác

Ở Lesson 02 ta nói: trong tam giác vuông có một góc nhọn $\theta$ (tức $0^\circ < \theta < 90^\circ$), với cạnh **đối** = đối diện góc $\theta$, cạnh **kề** = liền kề $\theta$, cạnh **huyền** = đối diện góc vuông:

$$\begin{aligned}
\sin\theta &= \frac{\text{đối}}{\text{huyền}} \\
\cos\theta &= \frac{\text{kề}}{\text{huyền}} \\
\tan\theta &= \frac{\text{đối}}{\text{kề}}
\end{aligned}$$

Quy ước "SOH-CAH-TOA". Đây là định nghĩa rất trực quan — nó hoạt động hoàn hảo cho góc nhọn.

### 1.2. Những câu hỏi mà định nghĩa cũ không trả lời được

Hãy thử áp dụng định nghĩa tam giác cho các góc dưới đây:

- **$\sin 150^\circ$ = ?** Tam giác nào có một góc $150^\circ$? Không có — tổng 3 góc trong tam giác là $180^\circ$, mà nếu một góc đã là $150^\circ$ thì hai góc còn lại tổng chỉ $30^\circ$, không thể có góc vuông ($90^\circ$) trong đó. Vậy "tam giác vuông có góc nhọn $150^\circ$" **không tồn tại**. Định nghĩa tam giác **chịu thua** ở đây.
- **$\cos(-45^\circ)$ = ?** Góc âm có nghĩa là gì trong tam giác? Tam giác không có góc âm. Định nghĩa tam giác **không nói gì** về góc âm.
- **$\sin 720^\circ$ = ?** $720^\circ$ = quay hai vòng tròn. Trong tam giác, góc nhọn không thể bằng $720^\circ$. **Không định nghĩa**.
- **$\tan 90^\circ$ = ?** Tam giác vuông có một góc $90^\circ$ — nhưng đó là góc vuông, **không phải góc nhọn**. Nếu thử cho $\theta = 90^\circ$ trong "tam giác vuông có góc nhọn $90^\circ$" — vô lý ngay (tổng góc đã $> 180^\circ$).

→ Định nghĩa tam giác **chỉ hoạt động cho** $0^\circ < \theta < 90^\circ$ (góc nhọn ngặt). Mọi góc khác đều "ngoài vùng phủ sóng".

💡 **Tại sao điều này quan trọng?** Trong thực tế (vật lý, đồ họa máy tính, ML), góc xuất hiện ở mọi giá trị:

- Vật chuyển động tròn: góc tăng đều theo thời gian, vượt $360^\circ$ là chuyện bình thường (quay vòng thứ 2, thứ 3...).
- Quay vector trong 2D/3D: thường biểu diễn bằng ma trận $\begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$ — phải hoạt động với mọi $\theta$, không chỉ góc nhọn.
- Positional encoding trong Transformer (sẽ học mục 10): $\sin(pos / 10000^{2i/d})$ với $pos$ chạy từ 0 tới nhiều nghìn — góc cực lớn.

Cần **một định nghĩa tổng quát** áp dụng cho mọi $\theta \in \mathbb{R}$. Đó là **đường tròn đơn vị**.

#### 📝 Tóm tắt mục 1

- Định nghĩa tam giác chỉ áp dụng cho góc nhọn $0^\circ < \theta < 90^\circ$.
- Mọi góc khác (góc tù, góc bẹt, góc âm, góc $> 360^\circ$) đều không có nghĩa trong khung tam giác.
- Cần định nghĩa tổng quát hơn — đó là **đường tròn đơn vị** ở mục tiếp theo.

---

## 2. Đường tròn đơn vị — định nghĩa mới

### 2.1. Đường tròn đơn vị là gì?

💡 **Trực giác trước**: vẽ một đường tròn tâm tại gốc tọa độ $O = (0, 0)$ với bán kính bằng $1$. Đó là **đường tròn đơn vị** (unit circle). Mọi điểm $P$ trên đường tròn này có tọa độ $(x, y)$ thỏa mãn:

$$x^2 + y^2 = 1$$

Đây là phương trình đường tròn tâm $O$, bán kính $1$ (suy ra từ định lý Pythagoras: khoảng cách từ $O$ tới $(x, y)$ là $\sqrt{x^2 + y^2} = 1$).

ASCII vẽ:

```
                  y
                  ↑
              · · · · ·                       
          ·               ·                   
        ·                   ·                 
       ·         (0,1)       ·                
      ·            ●          ·               
      ·                       ·               
      ·                       ·               
(-1,0)●─────────● ●──────────●(1,0) → x       
      ·         O=(0,0)      ·                
      ·                       ·               
      ·                       ·               
       ·          ●          ·                
        ·       (0,-1)      ·                 
          ·               ·                   
              · · · · ·                       
```

Bốn điểm "trục":

- $(1, 0)$: bên phải, góc $0^\circ$.
- $(0, 1)$: trên đỉnh, góc $90^\circ$.
- $(-1, 0)$: bên trái, góc $180^\circ$.
- $(0, -1)$: dưới đáy, góc $270^\circ$.

### 2.2. Chọn một điểm và đo góc

Bây giờ chọn một điểm $P$ bất kỳ trên đường tròn đơn vị. Vẽ bán kính $OP$ (đoạn thẳng từ tâm tới $P$).

**Quy ước đo góc**:

- Góc $\theta$ = góc mà bán kính $OP$ tạo với **trục $Ox$ dương** (phần dương của trục hoành, đi sang phải).
- Đo **ngược chiều kim đồng hồ** (counter-clockwise): từ $Ox+$ xoay lên trên là góc dương.
- Đo cùng chiều kim đồng hồ: góc âm.

```
                  y
                  ↑
              · · · · ·
          ·     P=(x,y)
        ·       ●           
       ·       ╱·           
      ·       ╱  ·          
      ·      ╱    ·         
      ·    OP     ·         
      ·    ╱θ     ·         
──────●───●─────────●─────→ x
   (-1,0) O    Ox+ (1,0)    
      ·      ╲    ·         
       ·      ╲ ·           
        ·              ·    
          ·               · 
              · · · · ·     
```

Góc $\theta$ ở đây là góc giữa $OP$ và $Ox+$.

### 2.3. Định nghĩa mới của sin và cos

Đây là điểm then chốt:

> **Cho góc $\theta$ (bất kỳ, độ hoặc radian), đặt $P$ là điểm trên đường tròn đơn vị sao cho bán kính $OP$ tạo với $Ox+$ góc $\theta$ (đo ngược chiều kim đồng hồ).**
>
> **Khi đó**:
> - $\cos\theta = x_P$ (tọa độ hoành của $P$)
> - $\sin\theta = y_P$ (tọa độ tung của $P$)

Tức là $P = (\cos\theta, \sin\theta)$. Đó là tất cả.

💡 **Trực giác**: hình dung $P$ như một con kiến bò trên đường tròn. Khi $\theta$ tăng, con kiến quay ngược chiều kim đồng hồ. Tại bất kỳ thời điểm nào, $\cos\theta$ là vị trí "ngang" của nó và $\sin\theta$ là vị trí "dọc". Quay đủ một vòng ($\theta = 360^\circ$) thì kiến về chỗ cũ → $\sin$ và $\cos$ lặp lại.

**$\tan\theta$** vẫn định nghĩa qua tỉ số:

$$\tan\theta = \frac{\sin\theta}{\cos\theta} = \frac{y_P}{x_P}$$

(không xác định khi $\cos\theta = 0$, tức tại $\theta = 90^\circ, 270^\circ, \ldots$).

### 2.4. Bốn ví dụ trực tiếp từ định nghĩa

Trước khi học bảng đặc biệt, ta áp dụng định nghĩa cho 4 trường hợp dễ nhất:

**Ví dụ 1**: $\theta = 0^\circ$. Bán kính $OP$ chỉ thẳng sang phải, $P = (1, 0)$.

$$\begin{aligned}
\cos 0^\circ &= 1 \\
\sin 0^\circ &= 0 \\
\tan 0^\circ &= \frac{0}{1} = 0
\end{aligned}$$

**Ví dụ 2**: $\theta = 90^\circ$. Quay 1/4 vòng ngược kim đồng hồ, $OP$ chỉ thẳng lên trên, $P = (0, 1)$.

$$\begin{aligned}
\cos 90^\circ &= 0 \\
\sin 90^\circ &= 1 \\
\tan 90^\circ &= \frac{1}{0} = \text{không xác định } (\infty)
\end{aligned}$$

**Ví dụ 3**: $\theta = 180^\circ$. Quay nửa vòng, $OP$ chỉ thẳng sang trái, $P = (-1, 0)$.

$$\begin{aligned}
\cos 180^\circ &= -1 \\
\sin 180^\circ &= 0 \\
\tan 180^\circ &= \frac{0}{-1} = 0
\end{aligned}$$

**Ví dụ 4**: $\theta = 270^\circ$. Quay 3/4 vòng, $OP$ chỉ thẳng xuống dưới, $P = (0, -1)$.

$$\begin{aligned}
\cos 270^\circ &= 0 \\
\sin 270^\circ &= -1 \\
\tan 270^\circ &= \frac{-1}{0} = \text{không xác định}
\end{aligned}$$

Nhìn lại: **không cần tam giác**, chỉ cần nhìn tọa độ.

#### ❓ Câu hỏi tự nhiên: "Vì sao bán kính = 1?"

Vì làm cho công thức **gọn**. Nếu bán kính là $r$, ta có $\cos\theta = \frac{x_P}{r}$ và $\sin\theta = \frac{y_P}{r}$. Khi $r = 1$, mẫu số biến mất — đỡ một phép chia.

Nhưng quan trọng hơn: định nghĩa **không phụ thuộc bán kính**. Cùng góc $\theta$, dù vẽ đường tròn bán kính $1$ hay $100$, các tỉ số $x/r$ và $y/r$ đều giống nhau (hai đường tròn đồng dạng). Chọn $r = 1$ chỉ để tiện đếm — $\cos\theta$ chính là $x_P$ luôn, không cần chia.

#### ❓ Câu hỏi tự nhiên: "Có vẻ định nghĩa mới khác hẳn định nghĩa tam giác — chúng có khớp không?"

Khớp. Mục 3 sẽ chứng minh chi tiết.

#### 🔁 Dừng lại tự kiểm tra (mục 2)

1. $P$ nằm ở đâu trên đường tròn đơn vị khi $\theta = 360^\circ$?
2. Phương trình của đường tròn đơn vị là gì?
3. $\tan 90^\circ$ bằng bao nhiêu? Vì sao?
4. Nếu $\cos\theta = 0.5$ và $\sin\theta = \frac{\sqrt{3}}{2}$, điểm $P$ ở đâu?

<details>
<summary>Đáp án</summary>

1. $P = (1, 0)$ — quay đúng 1 vòng trở về vị trí ban đầu (giống $\theta = 0^\circ$).
2. $x^2 + y^2 = 1$.
3. Không xác định, vì $\tan 90^\circ = \frac{\sin 90^\circ}{\cos 90^\circ} = \frac{1}{0}$. Chia cho 0 không có nghĩa.
4. $P = (0.5, \frac{\sqrt{3}}{2}) \approx (0.5, 0.866)$ — trong góc tư thứ I (QI), tương ứng $\theta = 60^\circ$.

</details>

#### 📝 Tóm tắt mục 2

- Đường tròn đơn vị: tâm $(0, 0)$, bán kính $1$, phương trình $x^2 + y^2 = 1$.
- Mỗi góc $\theta$ xác định một điểm duy nhất $P = (\cos\theta, \sin\theta)$ trên đường tròn.
- Định nghĩa này áp dụng cho **mọi** $\theta$ thực — dương, âm, nhỏ, lớn.
- $\tan\theta = \frac{\sin\theta}{\cos\theta}$, không xác định khi $\cos\theta = 0$.

---

## 3. Kiểm tra tính nhất quán với định nghĩa tam giác

### 3.1. Vì sao phải kiểm tra?

Nếu định nghĩa mới (đường tròn đơn vị) cho $\sin 30^\circ = 0.5$ mà định nghĩa cũ (tam giác) cho $\sin 30^\circ = 0.7$ thì hỗn loạn — không biết đáp án đúng là cái nào. Toán học không cho phép điều đó.

→ Phải **chứng minh** hai định nghĩa khớp nhau trên vùng giao ($0^\circ < \theta < 90^\circ$).

### 3.2. Chứng minh cho góc nhọn

Xét $0^\circ < \theta < 90^\circ$ (tức $P$ nằm trong **góc tư thứ I** — $x > 0, y > 0$).

Vẽ hình chiếu của $P$ xuống trục $Ox$. Gọi điểm chiếu là $Q = (x_P, 0)$. Khi đó tam giác $OQP$ là tam giác vuông tại $Q$:

```
            y
            ↑
            ·              
        ·   P=(x_P, y_P)   
            ●              
       ·   ╱│              
          ╱ │              
         ╱  │              
       OP   │ y_P (cạnh đối với θ)
       ╱    │              
      ╱     │              
     ╱θ     │              
────●───────●─────→ x      
    O   x_P Q              
    └───────┘              
      cạnh kề              
```

Trong tam giác vuông $OQP$:

- Góc nhọn tại $O$ là $\theta$.
- Cạnh **huyền** = $OP$ = bán kính đường tròn = $1$.
- Cạnh **đối** với $\theta$ = $QP$ = $y_P$ (độ cao).
- Cạnh **kề** với $\theta$ = $OQ$ = $x_P$ (chiều ngang).

Áp dụng SOH-CAH-TOA (định nghĩa cũ):

$$\begin{aligned}
\sin\theta &= \frac{\text{đối}}{\text{huyền}} = \frac{y_P}{1} = y_P \quad \checkmark \ (\text{khớp định nghĩa mới: } \sin\theta = y_P) \\
\cos\theta &= \frac{\text{kề}}{\text{huyền}} = \frac{x_P}{1} = x_P \quad \checkmark \ (\text{khớp định nghĩa mới: } \cos\theta = x_P) \\
\tan\theta &= \frac{\text{đối}}{\text{kề}} = \frac{y_P}{x_P} \quad \checkmark \ (\text{khớp: } \tan\theta = \tfrac{\sin\theta}{\cos\theta})
\end{aligned}$$

→ Trên vùng $0^\circ < \theta < 90^\circ$, **hai định nghĩa cho cùng kết quả**. Khớp.

💡 **Cách hiểu khác**: định nghĩa đường tròn đơn vị **mở rộng** định nghĩa tam giác. Trên vùng góc nhọn chúng trùng nhau; ra ngoài vùng đó, định nghĩa tam giác "chết", còn đường tròn vẫn chạy.

### 3.3. Bốn ví dụ kiểm chứng cụ thể

**Ví dụ 1**: $\theta = 30^\circ$. Định nghĩa tam giác cho $\sin 30^\circ = \frac{1}{2}$ (tam giác đều bị cắt đôi, cạnh đối nhỏ là nửa cạnh huyền). Đường tròn đơn vị: $P = (\frac{\sqrt{3}}{2}, \frac{1}{2})$, nên $\sin 30^\circ = y_P = \frac{1}{2}$. ✓

**Ví dụ 2**: $\theta = 45^\circ$. Tam giác vuông cân: hai cạnh góc vuông bằng nhau, mỗi cạnh = huyền $/\sqrt{2}$. Vậy $\sin 45^\circ = \cos 45^\circ = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2}$. Đường tròn: $P = (\frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2})$. ✓

**Ví dụ 3**: $\theta = 60^\circ$. Cũng từ tam giác đều: cạnh đối với góc $60^\circ$ = $\frac{\sqrt{3}}{2} \cdot$ cạnh huyền. $\sin 60^\circ = \frac{\sqrt{3}}{2}$. Đường tròn: $P = (\frac{1}{2}, \frac{\sqrt{3}}{2})$, $\sin 60^\circ = \frac{\sqrt{3}}{2}$. ✓

**Ví dụ 4**: $\theta = 90^\circ$ (giáp ranh). Tam giác "thoái hóa" thành đoạn thẳng dọc — về mặt giới hạn, $\sin 90^\circ = 1$. Đường tròn: $P = (0, 1)$, $\sin 90^\circ = 1$. ✓

#### ❓ Câu hỏi tự nhiên: "Vậy `sin` và `cos` trong tam giác chỉ là trường hợp đặc biệt?"

Đúng. Định nghĩa tam giác là "phiên bản giới hạn" của định nghĩa đường tròn cho góc nhọn. Từ giờ trở đi ta xài định nghĩa đường tròn cho mọi tính toán — nó tổng quát hơn và đẹp hơn (không cần vẽ tam giác mỗi lần).

#### 📝 Tóm tắt mục 3

- Hai định nghĩa **khớp** trên vùng $0^\circ < \theta < 90^\circ$.
- Đường tròn đơn vị là phiên bản **tổng quát hóa** của tam giác.
- Trên vùng góc nhọn: hình chiếu của $P$ xuống trục tọa độ tạo thành tam giác vuông cạnh huyền $= 1$, đối $= \sin\theta$, kề $= \cos\theta$.

---

## 4. Tọa độ tại các góc đặc biệt — bảng phải thuộc

### 4.1. Vì sao phải thuộc?

Các góc $0^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ, \ldots$ xuất hiện thường xuyên trong bài tập và trong code thật (đồ họa, vật lý, geo). Tra máy tính mỗi lần là chậm và mất trực giác. **Thuộc lòng** 12 góc trong bảng dưới đây là khoản đầu tư xứng đáng.

### 4.2. Bảng 12 góc đặc biệt

| $\theta$ (độ) | $\theta$ (rad) | $P = (\cos\theta, \sin\theta)$ | $\cos\theta$ | $\sin\theta$ | $\tan\theta$ |
|----------|-----------|----------------------|---------|---------|---------|
| $0^\circ$ | $0$ | $(1, 0)$ | $1$ | $0$ | $0$ |
| $30^\circ$ | $\frac{\pi}{6}$ | $(\frac{\sqrt{3}}{2}, \frac{1}{2})$ | $\frac{\sqrt{3}}{2} \approx 0.866$ | $\frac{1}{2} = 0.5$ | $\frac{1}{\sqrt{3}} \approx 0.577$ |
| $45^\circ$ | $\frac{\pi}{4}$ | $(\frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2})$ | $\frac{\sqrt{2}}{2} \approx 0.707$ | $\frac{\sqrt{2}}{2} \approx 0.707$ | $1$ |
| $60^\circ$ | $\frac{\pi}{3}$ | $(\frac{1}{2}, \frac{\sqrt{3}}{2})$ | $\frac{1}{2} = 0.5$ | $\frac{\sqrt{3}}{2} \approx 0.866$ | $\sqrt{3} \approx 1.732$ |
| $90^\circ$ | $\frac{\pi}{2}$ | $(0, 1)$ | $0$ | $1$ | không xác định |
| $120^\circ$ | $\frac{2\pi}{3}$ | $(-\frac{1}{2}, \frac{\sqrt{3}}{2})$ | $-\frac{1}{2}$ | $\frac{\sqrt{3}}{2}$ | $-\sqrt{3}$ |
| $135^\circ$ | $\frac{3\pi}{4}$ | $(-\frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2})$ | $-\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{2}}{2}$ | $-1$ |
| $150^\circ$ | $\frac{5\pi}{6}$ | $(-\frac{\sqrt{3}}{2}, \frac{1}{2})$ | $-\frac{\sqrt{3}}{2}$ | $\frac{1}{2}$ | $-\frac{1}{\sqrt{3}}$ |
| $180^\circ$ | $\pi$ | $(-1, 0)$ | $-1$ | $0$ | $0$ |
| $210^\circ$ | $\frac{7\pi}{6}$ | $(-\frac{\sqrt{3}}{2}, -\frac{1}{2})$ | $-\frac{\sqrt{3}}{2}$ | $-\frac{1}{2}$ | $\frac{1}{\sqrt{3}}$ |
| $225^\circ$ | $\frac{5\pi}{4}$ | $(-\frac{\sqrt{2}}{2}, -\frac{\sqrt{2}}{2})$ | $-\frac{\sqrt{2}}{2}$ | $-\frac{\sqrt{2}}{2}$ | $1$ |
| $240^\circ$ | $\frac{4\pi}{3}$ | $(-\frac{1}{2}, -\frac{\sqrt{3}}{2})$ | $-\frac{1}{2}$ | $-\frac{\sqrt{3}}{2}$ | $\sqrt{3}$ |
| $270^\circ$ | $\frac{3\pi}{2}$ | $(0, -1)$ | $0$ | $-1$ | không xác định |
| $300^\circ$ | $\frac{5\pi}{3}$ | $(\frac{1}{2}, -\frac{\sqrt{3}}{2})$ | $\frac{1}{2}$ | $-\frac{\sqrt{3}}{2}$ | $-\sqrt{3}$ |
| $315^\circ$ | $\frac{7\pi}{4}$ | $(\frac{\sqrt{2}}{2}, -\frac{\sqrt{2}}{2})$ | $\frac{\sqrt{2}}{2}$ | $-\frac{\sqrt{2}}{2}$ | $-1$ |
| $330^\circ$ | $\frac{11\pi}{6}$ | $(\frac{\sqrt{3}}{2}, -\frac{1}{2})$ | $\frac{\sqrt{3}}{2}$ | $-\frac{1}{2}$ | $-\frac{1}{\sqrt{3}}$ |
| $360^\circ$ | $2\pi$ | $(1, 0)$ | $1$ | $0$ | $0$ |

### 4.3. Mẹo ghi nhớ: "bàn tay trái"

Một mẹo phổ thông để nhớ giá trị $\sin$ của 5 góc đầu ($0^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ$):

$$\begin{aligned}
\sin 0^\circ  &= \frac{\sqrt{0}}{2} = 0 \\
\sin 30^\circ &= \frac{\sqrt{1}}{2} = \frac{1}{2} \\
\sin 45^\circ &= \frac{\sqrt{2}}{2} \\
\sin 60^\circ &= \frac{\sqrt{3}}{2} \\
\sin 90^\circ &= \frac{\sqrt{4}}{2} = 1
\end{aligned}$$

Tử số chạy $\sqrt{0}, \sqrt{1}, \sqrt{2}, \sqrt{3}, \sqrt{4}$ ($0, 1, \sqrt{2}, \sqrt{3}, 2$), mẫu luôn là $2$. Đẹp.

Với $\cos$ thì **ngược lại**:

$$\begin{aligned}
\cos 0^\circ  &= \frac{\sqrt{4}}{2} = 1 \\
\cos 30^\circ &= \frac{\sqrt{3}}{2} \\
\cos 45^\circ &= \frac{\sqrt{2}}{2} \\
\cos 60^\circ &= \frac{\sqrt{1}}{2} = \frac{1}{2} \\
\cos 90^\circ &= \frac{\sqrt{0}}{2} = 0
\end{aligned}$$

→ Chỉ cần nhớ một quy tắc, ra cả $\sin$ và $\cos$ của 5 góc đầu.

### 4.4. Vẽ đường tròn với 12 góc

```
                       (0, 1)
                  90°
       (−1/2,√3/2)│(1/2,√3/2)
        120°      │     60°
    135°╲         │         ╱45°
   (−√2/2,        │       (√2/2,
      √2/2)       │        √2/2)
  150°            │           30°
 (−√3/2,1/2)─────┼─────(√3/2,1/2)
 180°            │           0°
 (−1,0)──────────●────────(1,0)──→ x
                 │           360°
  (−√3/2,-1/2)   │        (√3/2,-1/2)
  210°           │           330°
   (−√2/2,       │       (√2/2,
     −√2/2)      │       −√2/2)
    225°╲        │        ╱315°
        240°     │     300°
       (−1/2,    │     (1/2,
        −√3/2)   │     −√3/2)
                  270°
                 (0,−1)
```

### 4.5. Bốn ví dụ áp dụng

**Ví dụ 1**: tính $\sin 30^\circ + \cos 60^\circ$.

Tra bảng: $\sin 30^\circ = \frac{1}{2}$, $\cos 60^\circ = \frac{1}{2}$. Tổng $= 1$.

**Ví dụ 2**: tính $\tan(\frac{\pi}{4})$.

$\frac{\pi}{4} = 45^\circ$. $\tan 45^\circ = \frac{\sin 45^\circ}{\cos 45^\circ} = \frac{\sqrt{2}/2}{\sqrt{2}/2} = 1$.

**Ví dụ 3**: kiểm chứng $\sin^2\theta + \cos^2\theta = 1$ cho $\theta = 60^\circ$.

$\sin 60^\circ = \frac{\sqrt{3}}{2}$, $\cos 60^\circ = \frac{1}{2}$. $(\frac{\sqrt{3}}{2})^2 + (\frac{1}{2})^2 = \frac{3}{4} + \frac{1}{4} = 1$. ✓ (Đây là **Pythagorean identity** — sẽ học kỹ ở Lesson 05.)

**Ví dụ 4**: tính $\sin 120^\circ$.

Tra bảng: $\sin 120^\circ = \frac{\sqrt{3}}{2}$. Hoặc dùng quy gọn ở mục 7: $\sin 120^\circ = \sin(180^\circ - 60^\circ) = \sin 60^\circ = \frac{\sqrt{3}}{2}$.

#### ⚠ Lỗi thường gặp với bảng đặc biệt

- **Nhầm $\sin 30^\circ$ với $\sin 60^\circ$**. Cả hai đều có dạng $\frac{\sqrt{k}}{2}$ nhưng $\sin 30^\circ = \frac{1}{2}$ (nhỏ) còn $\sin 60^\circ = \frac{\sqrt{3}}{2} \approx 0.866$ (gần $1$). Trực giác: góc gần $90^\circ$ thì $\sin$ gần $1$.
- **Quên đổi đơn vị**. `math.Sin(30)` trong Go nghĩa là $\sin(30 \text{ radian})$, không phải $\sin 30^\circ$. Phải chuyển $30^\circ = \frac{\pi}{6}$ trước: `math.Sin(math.Pi/6)` mới đúng.
- **Viết $\cos 30^\circ = \frac{1}{2}$** (sai — đó là $\cos 60^\circ$). Quy tắc nhớ: với góc nhỏ ($30^\circ$), $\cos$ lớn (gần 1); với góc lớn ($60^\circ$), $\cos$ nhỏ. Trên đường tròn: góc bé → $P$ gần $(1, 0)$ → $x$ lớn → $\cos$ lớn.

#### 🔁 Dừng lại tự kiểm tra (mục 4)

1. $\cos 120^\circ$ = ?
2. $\sin(\frac{5\pi}{6})$ = ?
3. $\tan 225^\circ$ = ?
4. Tọa độ $P$ khi $\theta = \frac{7\pi}{4}$ là gì?
5. $\cos 315^\circ$ = ?

<details>
<summary>Đáp án</summary>

1. $-\frac{1}{2}$. Tra bảng.
2. $\frac{5\pi}{6} = 150^\circ$, $\sin 150^\circ = \frac{1}{2}$.
3. $225^\circ$ ở QIII, $\tan 225^\circ = \frac{\sin}{\cos} = \frac{-\sqrt{2}/2}{-\sqrt{2}/2} = 1$.
4. $\frac{7\pi}{4} = 315^\circ$, $P = (\frac{\sqrt{2}}{2}, -\frac{\sqrt{2}}{2})$.
5. $\frac{\sqrt{2}}{2} \approx 0.707$.

</details>

#### 📝 Tóm tắt mục 4

- Thuộc 12 (thực ra 16) tọa độ đặc biệt trên đường tròn đơn vị.
- Mẹo $\sin$ 5 góc đầu: $\frac{\sqrt{0}}{2}, \frac{\sqrt{1}}{2}, \frac{\sqrt{2}}{2}, \frac{\sqrt{3}}{2}, \frac{\sqrt{4}}{2}$. $\cos$ đảo ngược thứ tự.
- Pythagorean: $\sin^2\theta + \cos^2\theta = 1$ luôn đúng (sẽ chứng minh tổng quát ở Lesson 05).

---

## 5. Quadrant — bốn góc tư và dấu

### 5.1. Bốn quadrant

Hai trục `Ox` và `Oy` chia mặt phẳng thành **4 vùng**, gọi là **góc tư (quadrant)** I, II, III, IV — đánh số ngược chiều kim đồng hồ bắt đầu từ vùng trên-phải.

```
            y
            ↑
            │
     QII    │    QI
   x<0,y>0  │  x>0,y>0
            │
────────────●────────────→ x
            O
   x<0,y<0  │  x>0,y<0
     QIII   │    QIV
            │
```

Tương ứng với góc $\theta$:

| Quadrant | Góc $\theta$ (độ) | Góc $\theta$ (rad) | Dấu $x$ | Dấu $y$ |
|----------|--------------|---------------|---------|---------|
| **QI** | $0^\circ < \theta < 90^\circ$ | $0 < \theta < \frac{\pi}{2}$ | $+$ | $+$ |
| **QII** | $90^\circ < \theta < 180^\circ$ | $\frac{\pi}{2} < \theta < \pi$ | $-$ | $+$ |
| **QIII** | $180^\circ < \theta < 270^\circ$ | $\pi < \theta < \frac{3\pi}{2}$ | $-$ | $-$ |
| **QIV** | $270^\circ < \theta < 360^\circ$ | $\frac{3\pi}{2} < \theta < 2\pi$ | $+$ | $-$ |

### 5.2. Dấu của sin, cos, tan theo quadrant

Vì $\cos\theta = x_P$ và $\sin\theta = y_P$, dấu của $\sin/\cos$ chính là dấu của $x_P, y_P$:

| Quadrant | $\cos\theta = x$ | $\sin\theta = y$ | $\tan\theta = y/x$ |
|----------|-------------|-------------|---------------|
| **QI** | $+$ | $+$ | $+$ |
| **QII** | $-$ | $+$ | $-$ (vì $+/-$) |
| **QIII** | $-$ | $-$ | $+$ (vì $-/-$) |
| **QIV** | $+$ | $-$ | $-$ (vì $-/+$) |

### 5.3. Mnemonic "All Students Take Calculus"

Một mnemonic phổ thông để nhớ dấu **dương** ở mỗi quadrant:

```
        y
        ↑
        │
   S    │    A
 (Sin+) │  (All+)        ← QI: tất cả sin, cos, tan đều dương
        │                ← QII: chỉ Sin dương
────────●────────→ x
        │                ← QIII: chỉ Tan dương
   T    │    C           ← QIV: chỉ Cos dương
 (Tan+) │  (Cos+)
        │
```

Đọc theo thứ tự quadrant I → II → III → IV: **All - Students - Take - Calculus**. Mỗi chữ cái đầu = tên hàm dương ở quadrant đó.

- **A** (QI): **A**ll — $\sin+, \cos+, \tan+$.
- **S** (QII): **S**in — chỉ $\sin+$, hai cái kia âm.
- **T** (QIII): **T**an — chỉ $\tan+$.
- **C** (QIV): **C**os — chỉ $\cos+$.

### 5.4. Bốn ví dụ áp dụng mnemonic

**Ví dụ 1**: dấu của $\cos 200^\circ$?

$200^\circ$ nằm trong $(180^\circ, 270^\circ)$ → **QIII**. Ở QIII chỉ Tan dương → $\cos 200^\circ$ âm. Đáp: $\cos 200^\circ < 0$.

**Ví dụ 2**: dấu của $\sin 300^\circ$?

$300^\circ$ nằm trong $(270^\circ, 360^\circ)$ → **QIV**. Ở QIV chỉ Cos dương → $\sin 300^\circ < 0$.

**Ví dụ 3**: dấu của $\tan 150^\circ$?

$150^\circ$ nằm trong $(90^\circ, 180^\circ)$ → **QII**. Ở QII chỉ Sin dương → $\tan 150^\circ$ âm. Đáp: $\tan 150^\circ < 0$. Kiểm: tra bảng, $\tan 150^\circ = -\frac{1}{\sqrt{3}}$ ✓.

**Ví dụ 4**: nếu $\sin\theta < 0$ và $\cos\theta > 0$, $\theta$ thuộc quadrant nào?

$\sin < 0$ → QIII hoặc QIV. $\cos > 0$ → QI hoặc QIV. Giao: **QIV**. (Tức $270^\circ < \theta < 360^\circ$.)

#### ❓ Câu hỏi tự nhiên: "Tại sao mnemonic này hữu ích — sao không nhớ thẳng bảng dấu?"

Bảng có 12 ô (4 quadrant × 3 hàm), khó nhớ trực tiếp. Mnemonic nén thông tin xuống còn 4 chữ + 1 quy tắc ngầm (cái nào không trong list = âm). Khi bạn cần dấu của $\cos 200^\circ$ chỉ cần biết quadrant + nhớ "TIII = Tan dương" → mọi thứ khác âm → $\cos 200^\circ < 0$. Tốc độ não bộ tăng đáng kể.

Khi quá quen, bạn sẽ không cần mnemonic nữa — trực giác đường tròn sẽ thay thế. Nhưng giai đoạn đầu nó là chiếc xe đẩy hữu ích.

#### ⚠ Lỗi thường gặp với dấu

- **Không kiểm tra dấu, chỉ tra giá trị tuyệt đối**. Ví dụ tính $\sin 210^\circ$: nhìn $210^\circ = 180^\circ + 30^\circ$, rút $\sin 30^\circ = \frac{1}{2}$ rồi **quên** áp dấu của QIII → trả lời $\frac{1}{2}$ (sai, đúng là $-\frac{1}{2}$).
- **Nhầm QIV với QII**. $350^\circ$ ở đâu? Nhiều người nói QII (vì gần $90^\circ$ hay sao đó). Đáp: QIV (vì $270^\circ < 350^\circ < 360^\circ$). Nhớ: QIV là vùng cuối, sát $360^\circ$.
- **Quên $\tan\theta < 0$ ở QII và QIV**. $\tan$ âm ở 2 quadrant chứ không chỉ 1.

#### 🔁 Dừng lại tự kiểm tra (mục 5)

1. Dấu của $\cos 100^\circ$?
2. Dấu của $\tan 280^\circ$?
3. Nếu $\sin\theta > 0$ và $\tan\theta < 0$, $\theta$ ở quadrant nào?
4. $\theta = \frac{5\pi}{4}$ thuộc quadrant nào? Dấu của $\sin\theta$?

<details>
<summary>Đáp án</summary>

1. $100^\circ \in (90^\circ, 180^\circ)$ → QII → chỉ Sin dương → $\cos 100^\circ < 0$.
2. $280^\circ \in (270^\circ, 360^\circ)$ → QIV → chỉ Cos dương → $\tan 280^\circ < 0$.
3. $\sin > 0$ → QI hoặc QII. $\tan < 0$ → QII hoặc QIV. Giao: **QII**.
4. $\frac{5\pi}{4} = 225^\circ \in (180^\circ, 270^\circ)$ → **QIII** → chỉ Tan dương → $\sin 225^\circ < 0$ (giá trị $-\frac{\sqrt{2}}{2}$).

</details>

#### 📝 Tóm tắt mục 5

- 4 quadrant chia mặt phẳng. QI là vùng trên-phải, đếm ngược chiều kim đồng hồ.
- Dấu $\cos$ = dấu $x$, dấu $\sin$ = dấu $y$.
- Mnemonic **A**ll **S**tudents **T**ake **C**alculus → hàm dương ở từng quadrant.
- $\tan$ âm ở QII và QIV; dương ở QI và QIII.

---

## 6. Công thức quy gọn (reduction formulas)

### 6.1. Ý tưởng

💡 **Trực giác**: nếu bạn thuộc $\sin/\cos$ của góc nhọn ($0^\circ \to 90^\circ$), bạn có thể tính $\sin/\cos$ của **mọi** góc bằng cách "phản chiếu" qua trục $Ox$ hoặc $Oy$. Đường tròn đơn vị có nhiều đối xứng — khai thác đối xứng đó cho công thức gọn.

### 6.2. Sáu công thức quy gọn chính

| Công thức | Ý nghĩa hình học |
|-----------|------------------|
| $\sin(-\theta) = -\sin\theta$ | Lật $P$ qua trục $Ox$: $y$ đổi dấu, $x$ giữ nguyên. |
| $\cos(-\theta) = \cos\theta$ | Lật qua $Ox$: $x$ giữ nguyên. |
| $\tan(-\theta) = -\tan\theta$ | Hệ quả: $\sin/\cos$ đổi dấu thì $\tan$ đổi dấu. |
| $\sin(\pi - \theta) = \sin\theta$ | Lật $P$ qua trục $Oy$: $x$ đổi dấu, $y$ giữ. |
| $\cos(\pi - \theta) = -\cos\theta$ | Lật qua $Oy$: $x$ đổi dấu. |
| $\sin(\pi + \theta) = -\sin\theta$ | Quay thêm $180^\circ$: cả $x$ và $y$ đổi dấu. |
| $\cos(\pi + \theta) = -\cos\theta$ | Cả $x$ đổi dấu. |
| $\sin(2\pi + \theta) = \sin\theta$ | Quay đủ vòng — về chỗ cũ. **Chu kỳ $2\pi$**. |
| $\cos(2\pi + \theta) = \cos\theta$ | Tương tự. |

### 6.3. Walk-through từng công thức bằng hình

#### Công thức 1: `cos(-θ) = cos θ`, `sin(-θ) = -sin θ`

Góc $-\theta$ đo theo chiều kim đồng hồ (xuống dưới), trong khi $\theta$ đo ngược chiều (lên trên). Hai bán kính đối xứng nhau qua trục $Ox$:

```
         y
         ↑
         │
       P=(x,y)        ← góc θ
       ●              
       │╲             
       │ ╲            
       │  ╲           
       │θ  ╲          
─────●─┴────●─→ x     
     │  -θ ╱          
     │    ╱           
     │   ╱            
       ●              
     P'=(x,-y)        ← góc -θ
```

$P$ và $P'$ có cùng tọa độ $x$ nhưng $y$ đối nhau. Nên:

$$\begin{aligned}
\cos(-\theta) &= x_{P'} = x_P = \cos\theta \\
\sin(-\theta) &= y_{P'} = -y_P = -\sin\theta
\end{aligned}$$

**Verify với $\theta = 30^\circ$**: $\cos(-30^\circ) = \cos 30^\circ = \frac{\sqrt{3}}{2}$, $\sin(-30^\circ) = -\sin 30^\circ = -\frac{1}{2}$. Tra bảng $\theta = 330^\circ$ ($\equiv -30^\circ$): $P = (\frac{\sqrt{3}}{2}, -\frac{1}{2})$ ✓.

**Verify với $\theta = 60^\circ$**: $\cos(-60^\circ) = \cos 60^\circ = \frac{1}{2}$. Đường tròn: $-60^\circ \equiv 300^\circ$, $P = (\frac{1}{2}, -\frac{\sqrt{3}}{2})$, $\cos = \frac{1}{2}$ ✓.

**Lưu ý ngôn ngữ**: hàm thỏa $f(-x) = f(x)$ gọi là **hàm chẵn** (even); $f(-x) = -f(x)$ gọi là **hàm lẻ** (odd). Vậy $\cos$ là **chẵn**, $\sin$ và $\tan$ là **lẻ**.

#### Công thức 2: `sin(π - θ) = sin θ`, `cos(π - θ) = -cos θ`

Góc $\pi - \theta$ = $180^\circ - \theta$ là **phản chiếu của $\theta$ qua trục $Oy$**.

```
         y
         ↑
         │
  P'=(-x,y) │  P=(x,y)
       ●    │    ●     
        ╲   │   ╱      
         ╲  │  ╱       
          ╲ │ ╱        
   π-θ     ╲│╱  θ      
─────●──────●──────●─→ x
            O             
```

$P'$ có cùng $y$ nhưng $x$ đối dấu. Nên:

$$\begin{aligned}
\sin(\pi - \theta) &= y_{P'} = y_P = \sin\theta \\
\cos(\pi - \theta) &= x_{P'} = -x_P = -\cos\theta
\end{aligned}$$

**Verify với $\theta = 30^\circ$**: $\sin(180^\circ - 30^\circ) = \sin 150^\circ = \sin 30^\circ = \frac{1}{2}$. Tra bảng $\sin 150^\circ = \frac{1}{2}$ ✓. $\cos 150^\circ = -\cos 30^\circ = -\frac{\sqrt{3}}{2}$. Tra bảng $\cos 150^\circ = -\frac{\sqrt{3}}{2}$ ✓.

**Verify với $\theta = 45^\circ$**: $\sin 135^\circ = \sin 45^\circ = \frac{\sqrt{2}}{2}$ ✓. $\cos 135^\circ = -\cos 45^\circ = -\frac{\sqrt{2}}{2}$ ✓.

#### Công thức 3: `sin(π + θ) = -sin θ`, `cos(π + θ) = -cos θ`

Góc $\pi + \theta$ = $180^\circ + \theta$ là **đối xứng qua gốc $O$** của góc $\theta$ (quay thêm nửa vòng).

```
         y
         ↑
         │
       P=(x,y)         
       ●               
        ╲              
         ╲             
       θ  ╲            
─────●─────●─────→ x   
       π+θ ╲           
            ╲          
             ●         
        P''=(-x,-y)    
```

Cả $x$ và $y$ đối dấu:

$$\begin{aligned}
\sin(\pi + \theta) &= -\sin\theta \\
\cos(\pi + \theta) &= -\cos\theta
\end{aligned}$$

**Verify $\theta = 30^\circ$**: $\sin 210^\circ = -\sin 30^\circ = -\frac{1}{2}$ ✓. $\cos 210^\circ = -\cos 30^\circ = -\frac{\sqrt{3}}{2}$ ✓.

**Verify $\theta = 60^\circ$**: $\sin 240^\circ = -\sin 60^\circ = -\frac{\sqrt{3}}{2}$ ✓. $\cos 240^\circ = -\cos 60^\circ = -\frac{1}{2}$ ✓.

#### Công thức 4: `sin(2π + θ) = sin θ`, `cos(2π + θ) = cos θ` — tính tuần hoàn

Quay đủ một vòng ($2\pi = 360^\circ$) thì $P$ về đúng vị trí cũ. Tức **góc $\theta$ và $\theta + 2\pi$ là cùng một điểm trên đường tròn**.

$$\begin{aligned}
\sin(\theta + 2\pi) &= \sin\theta \\
\cos(\theta + 2\pi) &= \cos\theta
\end{aligned}$$

Hệ quả: cộng/trừ bất kỳ bội số nguyên của $2\pi$, kết quả không đổi.

**Verify**: $\sin 390^\circ = \sin(360^\circ + 30^\circ) = \sin 30^\circ = \frac{1}{2}$ ✓. $\cos 720^\circ = \cos(2 \times 360^\circ) = \cos 0^\circ = 1$ ✓.

**Đây chính là tính chu kỳ** — sẽ học kỹ ở Lesson 04 khi vẽ đồ thị.

### 6.4. Bảng tóm tắt 4 phép biến đổi cơ bản

| Phép | $\sin$ mới | $\cos$ mới | $\tan$ mới |
|------|-----------|-----------|-----------|
| $-\theta$ (lật qua Ox) | $-\sin\theta$ | $\cos\theta$ | $-\tan\theta$ |
| $\pi - \theta$ (lật qua Oy) | $\sin\theta$ | $-\cos\theta$ | $-\tan\theta$ |
| $\pi + \theta$ (đối xứng O) | $-\sin\theta$ | $-\cos\theta$ | $\tan\theta$ |
| $2\pi + \theta$ (quay đủ vòng) | $\sin\theta$ | $\cos\theta$ | $\tan\theta$ |

### 6.5. Bốn ví dụ áp dụng

**Ví dụ 1**: tính $\sin 150^\circ$ bằng quy gọn.

$150^\circ = 180^\circ - 30^\circ$. Dùng $\sin(\pi - \theta) = \sin\theta$ với $\theta = 30^\circ$:

$$\sin 150^\circ = \sin(180^\circ - 30^\circ) = \sin 30^\circ = \frac{1}{2}$$

Đối chiếu bảng: $\sin 150^\circ = \frac{1}{2}$ ✓.

**Ví dụ 2**: tính $\cos 210^\circ$ bằng quy gọn.

$210^\circ = 180^\circ + 30^\circ$. Dùng $\cos(\pi + \theta) = -\cos\theta$:

$$\cos 210^\circ = -\cos 30^\circ = -\frac{\sqrt{3}}{2}$$

Đối chiếu bảng: ✓.

**Ví dụ 3**: tính $\sin(-45^\circ)$.

$\sin$ là hàm lẻ: $\sin(-45^\circ) = -\sin 45^\circ = -\frac{\sqrt{2}}{2} \approx -0.707$.

Đối chiếu đường tròn: $-45^\circ \equiv 315^\circ$, $P = (\frac{\sqrt{2}}{2}, -\frac{\sqrt{2}}{2})$, $\sin = -\frac{\sqrt{2}}{2}$ ✓.

**Ví dụ 4**: tính $\cos 765^\circ$.

$765^\circ = 720^\circ + 45^\circ = 2 \times 360^\circ + 45^\circ$. Quy chu kỳ:

$$\cos 765^\circ = \cos 45^\circ = \frac{\sqrt{2}}{2}$$

#### 🔁 Tự kiểm tra: tính `sin 150°` bằng 2 cách

**Cách 1 (quy gọn)**: $\sin 150^\circ = \sin(180^\circ - 30^\circ) = \sin 30^\circ = \frac{1}{2}$.

**Cách 2 (đường tròn trực tiếp)**: $150^\circ$ ở QII ($90^\circ < 150^\circ < 180^\circ$), nên $\sin > 0$, $\cos < 0$ (mnemonic ASTC: Sin+). Điểm $P$ ứng $150^\circ$ đối xứng với $P$ ứng $30^\circ$ qua trục $Oy$. $P_{30^\circ} = (\frac{\sqrt{3}}{2}, \frac{1}{2})$ → $P_{150^\circ} = (-\frac{\sqrt{3}}{2}, \frac{1}{2})$. Vậy $\sin 150^\circ = \frac{1}{2}$.

**Hai cách cho cùng đáp án $\frac{1}{2}$** ✓. Đây là tính nhất quán: quy gọn chỉ là viết gọn lại đối xứng của đường tròn.

#### 📝 Tóm tắt mục 6

- $\sin$ là hàm **lẻ**: $\sin(-\theta) = -\sin\theta$. $\cos$ là hàm **chẵn**: $\cos(-\theta) = \cos\theta$.
- $\sin(\pi - \theta) = \sin\theta$, $\cos(\pi - \theta) = -\cos\theta$ — lật qua $Oy$.
- $\sin(\pi + \theta) = -\sin\theta$, $\cos(\pi + \theta) = -\cos\theta$ — đối xứng qua $O$.
- Cộng bội của $2\pi$ không đổi — chu kỳ.

---

## 7. Tính giá trị cho góc bất kỳ — quy trình 3 bước

### 7.1. Vấn đề

Cho một góc $\theta \in [0^\circ, 360^\circ)$ (không nhất thiết đặc biệt). Làm sao tính $\sin\theta, \cos\theta, \tan\theta$?

Với góc đặc biệt: tra bảng. Với góc bất kỳ: dùng máy tính. Nhưng có một kỹ thuật để **suy ra** từ góc nhọn — gọi là **góc tham chiếu (reference angle)**.

### 7.2. Định nghĩa: góc tham chiếu

> **Góc tham chiếu** $\alpha$ của một góc $\theta$ là góc nhọn ($0 \le \alpha \le 90^\circ$) tạo bởi cạnh $OP$ và **trục Ox gần nhất** (tức $Ox+$ hoặc $Ox-$, tùy chỗ nào gần hơn).

Cách tính $\alpha$ theo quadrant:

| Quadrant của $\theta$ | $\alpha$ |
|------------------|-----|
| QI ($0^\circ < \theta < 90^\circ$) | $\alpha = \theta$ |
| QII ($90^\circ < \theta < 180^\circ$) | $\alpha = 180^\circ - \theta$ (hay $\pi - \theta$) |
| QIII ($180^\circ < \theta < 270^\circ$) | $\alpha = \theta - 180^\circ$ (hay $\theta - \pi$) |
| QIV ($270^\circ < \theta < 360^\circ$) | $\alpha = 360^\circ - \theta$ (hay $2\pi - \theta$) |

Trực giác hình học: $\alpha$ là "khoảng cách góc" từ $OP$ về trục $Ox$ gần nhất, đo theo đường ngắn.

### 7.3. Quy trình 3 bước

**Cho góc $\theta$, tính $\sin\theta$, $\cos\theta$, $\tan\theta$:**

1. **Bước 1**: Xác định $\theta$ thuộc quadrant nào → suy ra **dấu** của $\sin, \cos, \tan$ (mnemonic ASTC).
2. **Bước 2**: Tính **góc tham chiếu** $\alpha$ (góc nhọn).
3. **Bước 3**: Tra bảng $\sin\alpha, \cos\alpha, \tan\alpha$ (đều dương vì $\alpha$ là góc nhọn), rồi **áp dấu** từ bước 1.

### 7.4. Bốn ví dụ chi tiết

**Ví dụ 1**: tính $\sin 120^\circ, \cos 120^\circ, \tan 120^\circ$.

- Bước 1: $120^\circ \in (90^\circ, 180^\circ)$ → **QII**. ASTC: ở QII chỉ Sin dương → $\sin+, \cos-, \tan-$.
- Bước 2: $\alpha = 180^\circ - 120^\circ = 60^\circ$.
- Bước 3: $\sin 60^\circ = \frac{\sqrt{3}}{2}, \cos 60^\circ = \frac{1}{2}, \tan 60^\circ = \sqrt{3}$.

Áp dấu:

$$\begin{aligned}
\sin 120^\circ &= +\frac{\sqrt{3}}{2} = \frac{\sqrt{3}}{2} \\
\cos 120^\circ &= -\frac{1}{2} \\
\tan 120^\circ &= -\sqrt{3}
\end{aligned}$$

Đối chiếu bảng (mục 4.2): ✓ ✓ ✓.

**Ví dụ 2**: tính $\sin 210^\circ, \cos 210^\circ, \tan 210^\circ$.

- Bước 1: $210^\circ \in (180^\circ, 270^\circ)$ → **QIII**. ASTC: chỉ Tan dương → $\sin-, \cos-, \tan+$.
- Bước 2: $\alpha = 210^\circ - 180^\circ = 30^\circ$.
- Bước 3: $\sin 30^\circ = \frac{1}{2}, \cos 30^\circ = \frac{\sqrt{3}}{2}, \tan 30^\circ = \frac{1}{\sqrt{3}}$.

Áp dấu:

$$\begin{aligned}
\sin 210^\circ &= -\frac{1}{2} \\
\cos 210^\circ &= -\frac{\sqrt{3}}{2} \\
\tan 210^\circ &= +\frac{1}{\sqrt{3}}
\end{aligned}$$

Đối chiếu bảng: ✓.

**Ví dụ 3**: tính $\sin 315^\circ, \cos 315^\circ, \tan 315^\circ$.

- Bước 1: $315^\circ \in (270^\circ, 360^\circ)$ → **QIV**. ASTC: chỉ Cos dương → $\sin-, \cos+, \tan-$.
- Bước 2: $\alpha = 360^\circ - 315^\circ = 45^\circ$.
- Bước 3: $\sin 45^\circ = \frac{\sqrt{2}}{2}, \cos 45^\circ = \frac{\sqrt{2}}{2}, \tan 45^\circ = 1$.

Áp dấu:

$$\begin{aligned}
\sin 315^\circ &= -\frac{\sqrt{2}}{2} \\
\cos 315^\circ &= +\frac{\sqrt{2}}{2} = \frac{\sqrt{2}}{2} \\
\tan 315^\circ &= -1
\end{aligned}$$

**Ví dụ 4**: tính $\sin 330^\circ, \cos 330^\circ, \tan 330^\circ$.

- Bước 1: $330^\circ \in (270^\circ, 360^\circ)$ → **QIV** → $\sin-, \cos+, \tan-$.
- Bước 2: $\alpha = 360^\circ - 330^\circ = 30^\circ$.
- Bước 3: $\sin 30^\circ = \frac{1}{2}, \cos 30^\circ = \frac{\sqrt{3}}{2}, \tan 30^\circ = \frac{1}{\sqrt{3}}$.

Áp dấu:

$$\begin{aligned}
\sin 330^\circ &= -\frac{1}{2} \\
\cos 330^\circ &= \frac{\sqrt{3}}{2} \\
\tan 330^\circ &= -\frac{1}{\sqrt{3}}
\end{aligned}$$

Đối chiếu: ✓.

#### ❓ Câu hỏi tự nhiên: "Quy trình này có ích gì khi máy tính đã có sin/cos sẵn?"

Hai lý do:

1. **Trực giác**: máy tính ra số $0.5$ cho $\sin 30^\circ$, nhưng cho $\sin 210^\circ$ ra $-0.5$. Vì sao âm? Vì sao cùng độ lớn? Quy trình 3 bước trả lời chính xác: dấu từ quadrant, độ lớn từ góc tham chiếu. Hiểu cơ chế, không chỉ kết quả.
2. **Tính tay khi cần**: làm bài thi không máy tính, làm việc với góc đặc biệt (hay xuất hiện trong vật lý, kỹ thuật), debug code khi nghi ngờ thư viện sai — đều cần quy trình tay.

Khi quen, bạn sẽ làm 3 bước trong đầu trong 2 giây.

#### ⚠ Lỗi thường gặp với reference angle

- **Lấy $\alpha = \theta - 90^\circ$ cho QII** (thay vì $180^\circ - \theta$). Sai. $\alpha$ phải là khoảng cách đến **trục Ox gần nhất**, không phải trục Oy. Với QII trục Ox gần nhất là $Ox-$ (góc $180^\circ$), nên $\alpha = 180^\circ - \theta$.
- **Quên áp dấu**, đặc biệt với $\cos$ ở QII/QIII. Ví dụ $\cos 150^\circ = +\frac{\sqrt{3}}{2}$ (sai) thay vì $-\frac{\sqrt{3}}{2}$. Áp dấu là bước **bắt buộc** sau khi tra bảng — không bao giờ bỏ qua.
- **Tính $\alpha$ cho góc âm hoặc $> 360^\circ$** trước khi quy về $[0^\circ, 360^\circ)$. Cần làm $\theta \bmod 360^\circ$ trước, rồi mới xét quadrant.

#### 🔁 Tự kiểm tra (mục 7)

Tính bằng quy trình 3 bước:

1. $\sin 240^\circ$ = ?
2. $\cos 300^\circ$ = ?
3. $\tan 135^\circ$ = ?
4. $\sin(-60^\circ)$ = ?

<details>
<summary>Đáp án</summary>

1. $240^\circ \in$ QIII → $\sin-$. $\alpha = 240^\circ - 180^\circ = 60^\circ$. $\sin 60^\circ = \frac{\sqrt{3}}{2}$. → $\sin 240^\circ = -\frac{\sqrt{3}}{2}$.
2. $300^\circ \in$ QIV → $\cos+$. $\alpha = 360^\circ - 300^\circ = 60^\circ$. $\cos 60^\circ = \frac{1}{2}$. → $\cos 300^\circ = \frac{1}{2}$.
3. $135^\circ \in$ QII → $\tan-$. $\alpha = 180^\circ - 135^\circ = 45^\circ$. $\tan 45^\circ = 1$. → $\tan 135^\circ = -1$.
4. $-60^\circ \equiv 300^\circ$ (cộng $360^\circ$) → QIV → $\sin-$. $\alpha = 60^\circ$. $\sin 60^\circ = \frac{\sqrt{3}}{2}$. → $\sin(-60^\circ) = -\frac{\sqrt{3}}{2}$. (Hoặc nhanh hơn: $\sin(-\theta) = -\sin\theta = -\sin 60^\circ = -\frac{\sqrt{3}}{2}$.)

</details>

#### 📝 Tóm tắt mục 7

- Mọi góc bất kỳ quy về **góc nhọn $\alpha$** (góc tham chiếu) + **dấu theo quadrant**.
- Quy trình 3 bước: (1) quadrant + dấu, (2) $\alpha$, (3) áp dấu vào bảng.
- Đây là cách **chuẩn** để tính tay và xây trực giác.

---

## 8. Chu kỳ và tính tuần hoàn

### 8.1. Định nghĩa chu kỳ

💡 **Trực giác**: con kiến quay quanh đường tròn. Cứ đi đủ $2\pi$ rad (= $360^\circ$) là về chỗ cũ. Nên $\sin$ và $\cos$ **lặp lại sau mỗi $2\pi$** — chúng là **hàm tuần hoàn** với **chu kỳ $2\pi$**.

$$\begin{aligned}
\sin(\theta + 2\pi) &= \sin\theta \quad \text{với mọi } \theta \in \mathbb{R} \\
\cos(\theta + 2\pi) &= \cos\theta
\end{aligned}$$

Một hàm $f$ gọi là **tuần hoàn với chu kỳ $T$** nếu $f(\theta + T) = f(\theta)$ với mọi $\theta$, và $T$ là số dương **nhỏ nhất** có tính chất này. Với $\sin, \cos$, chu kỳ là $T = 2\pi$.

### 8.2. Bốn ví dụ tuần hoàn

**Ví dụ 1**: $\sin 390^\circ = \sin(360^\circ + 30^\circ) = \sin 30^\circ = \frac{1}{2}$.

**Ví dụ 2**: $\cos 720^\circ = \cos(2 \cdot 360^\circ + 0^\circ) = \cos 0^\circ = 1$.

**Ví dụ 3**: $\sin(-330^\circ) = \sin(-330^\circ + 360^\circ) = \sin 30^\circ = \frac{1}{2}$. Hoặc trực tiếp: $\sin(-330^\circ) = -\sin 330^\circ = -(-\frac{1}{2}) = \frac{1}{2}$.

**Ví dụ 4**: $\cos 1080^\circ = \cos(3 \cdot 360^\circ) = \cos 0^\circ = 1$.

→ Bí kíp: với góc to (hoặc âm), **rút mod $360^\circ$** (hay mod $2\pi$) đưa về $[0^\circ, 360^\circ)$, rồi áp dụng các kỹ thuật đã học.

### 8.3. Chu kỳ của tan: chỉ `π`, không phải `2π`

$\tan$ cũng tuần hoàn, nhưng chu kỳ **ngắn hơn**:

$$\tan(\theta + \pi) = \tan\theta \quad (\text{KHÔNG phải } 2\pi)$$

**Vì sao?** Từ công thức quy gọn $\sin(\pi + \theta) = -\sin\theta$ và $\cos(\pi + \theta) = -\cos\theta$:

$$\begin{aligned}
\tan(\pi + \theta) &= \frac{\sin(\pi + \theta)}{\cos(\pi + \theta)} \\
&= \frac{-\sin\theta}{-\cos\theta} \\
&= \frac{\sin\theta}{\cos\theta} \\
&= \tan\theta
\end{aligned}$$

Hai dấu âm triệt tiêu nhau → $\tan$ lặp lại sau $\pi$ chứ không cần đợi $2\pi$.

**Verify**: $\tan 30^\circ = \frac{1}{\sqrt{3}} \approx 0.577$. $\tan 210^\circ = \tan(180^\circ + 30^\circ) = \tan 30^\circ = \frac{1}{\sqrt{3}} \approx 0.577$. ✓ Đối chiếu bảng: $\tan 210^\circ = \frac{1}{\sqrt{3}}$ ✓.

### 8.4. Góc đồng kết (coterminal angles)

Hai góc $\theta_1$ và $\theta_2$ gọi là **đồng kết (coterminal)** nếu chúng cho cùng điểm $P$ trên đường tròn — tức $\theta_2 = \theta_1 + 2\pi k$ với $k$ nguyên.

**Bốn ví dụ**:

| Góc gốc | Đồng kết |
|---------|----------|
| $30^\circ$ | $390^\circ, 750^\circ, -330^\circ, -690^\circ, \ldots$ |
| $90^\circ$ | $450^\circ, -270^\circ, \ldots$ |
| $180^\circ$ | $-180^\circ, 540^\circ, \ldots$ |
| $\frac{\pi}{4}$ | $\frac{\pi}{4} + 2\pi = \frac{9\pi}{4}$, $\frac{\pi}{4} - 2\pi = -\frac{7\pi}{4}$, ... |

Vì góc đồng kết → cùng $P$ → cùng $\sin, \cos, \tan$. Ta luôn có thể đổi góc xấu sang góc đẹp đồng kết.

#### ❓ Câu hỏi tự nhiên: "Vậy `tan(θ + π) = tan θ` có vẻ mâu thuẫn — `θ + π` là góc đối xứng qua O, không đồng kết với `θ`?"

Đúng — $\theta + \pi$ **không** đồng kết với $\theta$ (chúng là hai điểm đối nhau qua tâm). Nhưng $\tan$ chỉ là **tỉ số** $y/x$, và hai điểm đối nhau qua tâm có cả $x$ lẫn $y$ đổi dấu → tỉ số $y/x$ không đổi. Nên $\tan$ của hai góc đó bằng nhau, mặc dù $\sin$ và $\cos$ riêng từng cái thì đối dấu.

Hai điểm khác nhau, cùng $\tan$. Đây là vì sao $\tan$ có **chu kỳ ngắn hơn** $\sin/\cos$.

#### 🔁 Tự kiểm tra (mục 8)

1. Một góc đồng kết với $45^\circ$ trong khoảng $(360^\circ, 720^\circ)$?
2. $\cos 1110^\circ$ = ?
3. $\tan 765^\circ$ = ?

<details>
<summary>Đáp án</summary>

1. $45^\circ + 360^\circ = 405^\circ$ (nằm trong $(360^\circ, 720^\circ)$).
2. $1110^\circ = 3 \cdot 360^\circ + 30^\circ = 1080^\circ + 30^\circ$. $\cos 1110^\circ = \cos 30^\circ = \frac{\sqrt{3}}{2}$.
3. $765^\circ = 2 \cdot 360^\circ + 45^\circ = 720^\circ + 45^\circ$. $\tan 765^\circ = \tan 45^\circ = 1$. (Hoặc dùng chu kỳ $\pi = 180^\circ$ của tan: $765^\circ \bmod 180^\circ = 765 - 4 \cdot 180 = 765 - 720 = 45^\circ$. $\tan 45^\circ = 1$.)

</details>

#### 📝 Tóm tắt mục 8

- $\sin, \cos$ có chu kỳ $2\pi$ ($360^\circ$).
- $\tan$ có chu kỳ $\pi$ ($180^\circ$) — ngắn hơn vì $\tan$ là tỉ số.
- Góc đồng kết = chênh nhau bội của $2\pi$ → cho cùng $\sin, \cos, \tan$.
- Bí kíp tính góc to: rút mod $2\pi$ (hoặc $\pi$ cho $\tan$).

---

## 9. Liên hệ với Machine Learning

### 9.1. Positional encoding trong Transformer

Bài báo **"Attention Is All You Need"** (Vaswani et al., 2017) giới thiệu Transformer — kiến trúc cơ sở cho GPT, BERT, Claude, v.v. Một thành phần nhỏ nhưng quan trọng là **positional encoding**: cách đưa thông tin "vị trí token" vào model.

Công thức:

$$\begin{aligned}
PE(pos, 2i)   &= \sin\left( \frac{pos}{10000^{2i/d}} \right) \\
PE(pos, 2i+1) &= \cos\left( \frac{pos}{10000^{2i/d}} \right)
\end{aligned}$$

Trong đó:
- $pos$ = vị trí của token trong câu (0, 1, 2, ...).
- $i$ = chỉ số chiều trong vector encoding.
- $d$ = số chiều embedding (vd 512, 768).

💡 **Đường tròn đơn vị xuất hiện ở đâu?** Với mỗi $i$, cặp $(PE(pos, 2i), PE(pos, 2i+1)) = (\sin\alpha, \cos\alpha)$ với $\alpha = \frac{pos}{10000^{2i/d}}$. Đây chính là **một điểm trên đường tròn đơn vị**, quay với góc $\alpha$ phụ thuộc vào $pos$.

Các chiều $i$ khác nhau quay với **tốc độ khác nhau**:

- $i = 0$: tần số $1/10000^0 = 1$ — quay nhanh, chu kỳ $2\pi$ token.
- $i = d/4$ (giữa): tần số $1/10000^{1/2} = 0.01$ — quay chậm hơn, chu kỳ $100 \cdot 2\pi$ token.
- $i = d/2$ (cuối): tần số $1/10000$ — quay rất chậm, chu kỳ $10000 \cdot 2\pi$ token.

→ Mỗi token nhận một **chữ ký vị trí** dạng $(\sin\theta_1, \cos\theta_1, \sin\theta_2, \cos\theta_2, \ldots)$ với các tần số khác nhau. Vị trí khác nhau cho chữ ký khác nhau. Mô hình học cách "đọc" chữ ký này.

**Tại sao dùng sin/cos thay vì đánh số $pos$ trực tiếp?** Vì sin/cos cho mô hình khả năng **tổng quát hóa** sang vị trí chưa thấy (do tính tuần hoàn) và **biểu diễn khoảng cách tương đối** dễ dàng (nhờ công thức cộng góc — sẽ học Lesson 06).

### 9.2. RoPE — Rotary Position Embedding

Trong các LLM hiện đại (LLaMA, GPT-NeoX, Qwen), positional encoding kiểu cũ thường được thay bằng **RoPE** (Su et al., 2021). Ý tưởng: thay vì *cộng* PE vào embedding, RoPE **xoay** embedding theo ma trận:

$$R_\theta = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

Áp ma trận này vào cặp embedding (treat từng cặp $(x_{2i}, x_{2i+1})$ như vector 2D). Ma trận $R_\theta$ là **ma trận xoay** — quay vector quanh gốc một góc $\theta$. Bài học sâu hơn về ma trận xoay sẽ ở Lesson 07.

→ **Đường tròn đơn vị là nền tảng của positional encoding hiện đại**. Hiểu $(\cos\theta, \sin\theta)$ là tọa độ điểm quay = hiểu nửa cốt lõi của Transformer.

### 9.3. Cosine similarity và hình cầu đơn vị

Trong NLP và search ngữ nghĩa, hai embedding $u, v$ được so sánh bằng **cosine similarity**:

$$\text{cos\_sim}(u, v) = \frac{u \cdot v}{\|u\| \cdot \|v\|}$$

Nếu cả $u$ và $v$ đã **chuẩn hóa L2** ($\|u\| = \|v\| = 1$, tức nằm trên **hình cầu đơn vị**), công thức rút gọn thành $u \cdot v$. $\text{cos\_sim}$ thực chất là $\cos$ của góc giữa hai vector.

→ "Đường tròn đơn vị" trong 2D mở rộng thành "hình cầu đơn vị" trong nhiều chiều. Sẽ học Tầng 4 (Linear Algebra) và Tầng 6 (AI/ML).

### 9.4. Ứng dụng đời thường: dao động và sóng

$\sin\theta$ và $\cos\theta$ mô tả mọi **dao động đều**: con lắc đồng hồ, dòng điện xoay chiều, sóng âm, sóng ánh sáng. Một vật chuyển động tròn với tốc độ góc $\omega$ có vị trí ngang là $\cos(\omega t)$ và vị trí dọc là $\sin(\omega t)$ tại thời điểm $t$. Đường tròn đơn vị là "hộp đen" sinh ra mọi dao động trong vật lý.

#### 📝 Tóm tắt mục 9

- **Positional encoding** trong Transformer = nhiều điểm quay với tần số khác nhau trên đường tròn đơn vị.
- **RoPE** = áp ma trận xoay $\begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$ vào embedding.
- **Cosine similarity** trên hình cầu đơn vị = $\cos$ của góc giữa hai vector.
- Đường tròn đơn vị là nền của mọi mô hình dao động (vật lý, kỹ thuật, ML).

---

## 10. Bài tập

### Bài 1: bảng giá trị cho 12 góc

Tính $\sin\theta, \cos\theta, \tan\theta$ (dạng phân số căn nếu có thể) cho các góc:

a) $\theta = 0^\circ$
b) $\theta = \frac{\pi}{6}$
c) $\theta = \frac{\pi}{3}$
d) $\theta = 90^\circ$
e) $\theta = \frac{2\pi}{3}$
f) $\theta = 135^\circ$
g) $\theta = \pi$
h) $\theta = \frac{7\pi}{6}$
i) $\theta = 240^\circ$
j) $\theta = \frac{3\pi}{2}$
k) $\theta = \frac{11\pi}{6}$
l) $\theta = 100^\circ$ (góc bất kỳ, dùng máy tính, làm tròn 4 chữ số thập phân).

### Bài 2: nghiệm trên `[0, 2π)`

Tìm tất cả $\theta \in [0, 2\pi)$ sao cho $\sin\theta = \frac{1}{2}$.

### Bài 3: nghiệm trên `[-2π, 2π)`

Tìm tất cả $\theta \in [-2\pi, 2\pi)$ sao cho $\cos\theta = -\frac{\sqrt{3}}{2}$.

### Bài 4: dùng Pythagorean identity

Cho $\sin\theta = \frac{3}{5}$ và $\theta$ thuộc QII. Tìm $\cos\theta$ và $\tan\theta$.

(Gợi ý: dùng $\sin^2\theta + \cos^2\theta = 1$ để tìm $|\cos\theta|$, rồi áp dấu theo quadrant.)

### Bài 5: chứng minh `cos(π/2 - θ) = sin θ`

Đây là **cofunction identity** — chứng minh bằng cách dùng đường tròn đơn vị (đối xứng qua đường $y = x$).

### Bài 6: code Go

Viết file `solutions.go` với các hàm:

a) `pointOnCircle(theta float64) (x, y float64)` — trả $(\cos\theta, \sin\theta)$.

b) `whichQuadrant(theta float64) int` — trả $1, 2, 3, 4$ ứng QI/QII/QIII/QIV. Với góc trên trục (vd $\theta = 90^\circ$), trả $0$. Phải xử lý cả góc âm và góc $> 2\pi$ (quy về $[0, 2\pi)$ trước).

c) Hàm `main()` chạy test 8 góc: $0^\circ, 30^\circ, 45^\circ, 90^\circ, 150^\circ, 210^\circ, 300^\circ, 359^\circ$. In $(\cos, \sin, \text{quadrant})$ cho mỗi.

---

## 11. Lời giải chi tiết

### Bài 1

| Câu | $\theta$ | Quadrant/Trục | $\cos\theta$ | $\sin\theta$ | $\tan\theta$ |
|-----|-----|---------------|---------|---------|---------|
| a) | $0^\circ$ | Trục Ox+ | $1$ | $0$ | $0$ |
| b) | $\frac{\pi}{6} = 30^\circ$ | QI | $\frac{\sqrt{3}}{2}$ | $\frac{1}{2}$ | $\frac{1}{\sqrt{3}} \approx 0.577$ |
| c) | $\frac{\pi}{3} = 60^\circ$ | QI | $\frac{1}{2}$ | $\frac{\sqrt{3}}{2}$ | $\sqrt{3} \approx 1.732$ |
| d) | $90^\circ$ | Trục Oy+ | $0$ | $1$ | không xác định |
| e) | $\frac{2\pi}{3} = 120^\circ$ | QII | $-\frac{1}{2}$ | $\frac{\sqrt{3}}{2}$ | $-\sqrt{3}$ |
| f) | $135^\circ$ | QII | $-\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{2}}{2}$ | $-1$ |
| g) | $\pi = 180^\circ$ | Trục Ox- | $-1$ | $0$ | $0$ |
| h) | $\frac{7\pi}{6} = 210^\circ$ | QIII | $-\frac{\sqrt{3}}{2}$ | $-\frac{1}{2}$ | $\frac{1}{\sqrt{3}}$ |
| i) | $240^\circ$ | QIII | $-\frac{1}{2}$ | $-\frac{\sqrt{3}}{2}$ | $\sqrt{3}$ |
| j) | $\frac{3\pi}{2} = 270^\circ$ | Trục Oy- | $0$ | $-1$ | không xác định |
| k) | $\frac{11\pi}{6} = 330^\circ$ | QIV | $\frac{\sqrt{3}}{2}$ | $-\frac{1}{2}$ | $-\frac{1}{\sqrt{3}}$ |
| l) | $100^\circ$ | QII | $\approx -0.1736$ | $\approx 0.9848$ | $\approx -5.6713$ |

**Cách tính câu l)** (góc bất kỳ): áp dụng quy trình 3 bước.

- Bước 1: $100^\circ \in$ QII → $\sin+, \cos-, \tan-$.
- Bước 2: $\alpha = 180^\circ - 100^\circ = 80^\circ$.
- Bước 3: tra máy: $\sin 80^\circ \approx 0.9848$, $\cos 80^\circ \approx 0.1736$, $\tan 80^\circ \approx 5.6713$.

Áp dấu:

$$\begin{aligned}
\sin 100^\circ &\approx +0.9848 \\
\cos 100^\circ &\approx -0.1736 \\
\tan 100^\circ &\approx -5.6713
\end{aligned}$$

### Bài 2

**Đề**: Tìm tất cả $\theta \in [0, 2\pi)$ với $\sin\theta = \frac{1}{2}$.

**Cách tiếp cận**:

- $\sin\theta = \frac{1}{2} > 0$ → $\theta$ ở QI hoặc QII (ASTC: Sin dương ở QI, QII).
- Tra bảng: $\sin 30^\circ = \frac{1}{2}$, tức $\alpha = 30^\circ$ là góc tham chiếu.
- Tại QI: $\theta_1 = \alpha = 30^\circ = \frac{\pi}{6}$.
- Tại QII: $\theta_2 = 180^\circ - \alpha = 150^\circ = \frac{5\pi}{6}$.

**Đáp số**: $\theta = \frac{\pi}{6}$ hoặc $\theta = \frac{5\pi}{6}$.

**Kiểm chứng**:
- $\sin(\frac{\pi}{6}) = \frac{1}{2}$ ✓ (tra bảng).
- $\sin(\frac{5\pi}{6}) = \sin(\pi - \frac{\pi}{6}) = \sin(\frac{\pi}{6}) = \frac{1}{2}$ ✓ (quy gọn mục 6).

### Bài 3

**Đề**: Tìm tất cả $\theta \in [-2\pi, 2\pi)$ với $\cos\theta = -\frac{\sqrt{3}}{2}$.

**Cách tiếp cận**:

- $\cos\theta = -\frac{\sqrt{3}}{2} < 0$ → $\theta$ ở QII hoặc QIII (ASTC: Cos âm ở QII, QIII).
- Tra bảng: $\cos 30^\circ = \frac{\sqrt{3}}{2}$, tức $\alpha = 30^\circ = \frac{\pi}{6}$.
- Tại QII: $\theta = \pi - \alpha = \pi - \frac{\pi}{6} = \frac{5\pi}{6} = 150^\circ$.
- Tại QIII: $\theta = \pi + \alpha = \pi + \frac{\pi}{6} = \frac{7\pi}{6} = 210^\circ$.

→ Trong $[0, 2\pi)$: hai nghiệm $\frac{5\pi}{6}$ và $\frac{7\pi}{6}$.

Để mở rộng sang $[-2\pi, 0)$: dùng tính tuần hoàn — trừ $2\pi$ từ mỗi nghiệm:

$$\begin{aligned}
\frac{5\pi}{6} - 2\pi &= \frac{5\pi}{6} - \frac{12\pi}{6} = -\frac{7\pi}{6} \\
\frac{7\pi}{6} - 2\pi &= \frac{7\pi}{6} - \frac{12\pi}{6} = -\frac{5\pi}{6}
\end{aligned}$$

Kiểm: $-\frac{7\pi}{6} \ge -2\pi = -\frac{12\pi}{6}$ ✓ (vì $-\frac{7\pi}{6} > -\frac{12\pi}{6}$). Và $-\frac{5\pi}{6} \ge -2\pi$ ✓.

**Đáp số 4 nghiệm**: $\theta \in \{-\frac{7\pi}{6}, -\frac{5\pi}{6}, \frac{5\pi}{6}, \frac{7\pi}{6}\}$.

**Kiểm chứng tại $\theta = -\frac{7\pi}{6}$**: $-\frac{7\pi}{6} + 2\pi = \frac{5\pi}{6}$ (đồng kết với $\frac{5\pi}{6}$) → cùng $\cos$ → $\cos(-\frac{7\pi}{6}) = \cos(\frac{5\pi}{6}) = -\frac{\sqrt{3}}{2}$ ✓.

### Bài 4

**Đề**: $\sin\theta = \frac{3}{5}$, $\theta \in$ QII. Tìm $\cos\theta, \tan\theta$.

**Cách tiếp cận**: Pythagorean identity $\sin^2\theta + \cos^2\theta = 1$:

$$\begin{aligned}
\left(\frac{3}{5}\right)^2 + \cos^2\theta &= 1 \\
\frac{9}{25} + \cos^2\theta &= 1 \\
\cos^2\theta &= 1 - \frac{9}{25} = \frac{16}{25} \\
\cos\theta &= \pm\frac{4}{5}
\end{aligned}$$

Ở QII, $\cos < 0$, nên $\cos\theta = -\frac{4}{5}$.

$$\tan\theta = \frac{\sin\theta}{\cos\theta} = \frac{3/5}{-4/5} = -\frac{3}{4}$$

**Đáp số**: $\cos\theta = -\frac{4}{5}$, $\tan\theta = -\frac{3}{4}$.

**Kiểm chứng dấu**: $\theta \in$ QII → ASTC: $\sin+ \ (\frac{3}{5} > 0 \ \checkmark), \cos- \ (-\frac{4}{5} < 0 \ \checkmark), \tan- \ (-\frac{3}{4} < 0 \ \checkmark)$. Khớp.

**Cảm nhận hình học**: điểm $P = (-\frac{4}{5}, \frac{3}{5})$ thật sự nằm trên đường tròn đơn vị vì $(-\frac{4}{5})^2 + (\frac{3}{5})^2 = \frac{16}{25} + \frac{9}{25} = \frac{25}{25} = 1$ ✓.

### Bài 5: chứng minh `cos(π/2 - θ) = sin θ`

**Cách tiếp cận**: dùng đối xứng trên đường tròn đơn vị.

Đặt $\theta \in (0, \frac{\pi}{2})$ (góc nhọn). Đặt:

- $P = (\cos\theta, \sin\theta)$ ứng với góc $\theta$.
- $P' = (\cos(\frac{\pi}{2} - \theta), \sin(\frac{\pi}{2} - \theta))$ ứng với góc $\frac{\pi}{2} - \theta$.

Vẽ:

```
         y
         ↑
         │ y = x  (đường phân giác QI)
         │  ╱
       P'│ ╱   
         ●     ← góc π/2 - θ
        ╱│    
       ╱ │    
      ╱  │   P
     ╱   │   ●  ← góc θ
    ╱    │   │  
   ╱     │   │  
─────────●───●──→ x
         O   x_P
```

**Quan sát**: hai góc $\theta$ và $\frac{\pi}{2} - \theta$ cộng lại bằng $\frac{\pi}{2}$ ($= 90^\circ$). Hai bán kính $OP$ và $OP'$ đối xứng nhau qua đường phân giác $y = x$ của QI.

Phép đối xứng qua $y = x$ đổi tọa độ $(a, b) \leftrightarrow (b, a)$. Nên:

$$P' = (y_P, x_P) = (\sin\theta, \cos\theta)$$

Mặt khác theo định nghĩa đường tròn đơn vị:

$$P' = \left(\cos\left(\frac{\pi}{2} - \theta\right), \sin\left(\frac{\pi}{2} - \theta\right)\right)$$

So sánh hai biểu diễn của $P'$:

$$\begin{aligned}
\cos\left(\frac{\pi}{2} - \theta\right) &= \sin\theta \quad \checkmark \ (\text{đpcm}) \\
\sin\left(\frac{\pi}{2} - \theta\right) &= \cos\theta \quad (\text{bonus: cofunction kia})
\end{aligned}$$

**Kiểm chứng với $\theta = 30^\circ$**:

$$\begin{aligned}
\cos(90^\circ - 30^\circ) &= \cos 60^\circ = \frac{1}{2} \\
\sin 30^\circ &= \frac{1}{2} \quad \checkmark \text{ Khớp}
\end{aligned}$$

**Kiểm chứng với $\theta = 45^\circ$**:

$$\begin{aligned}
\cos(90^\circ - 45^\circ) &= \cos 45^\circ = \frac{\sqrt{2}}{2} \\
\sin 45^\circ &= \frac{\sqrt{2}}{2} \quad \checkmark \text{ Khớp}
\end{aligned}$$

(Chứng minh trên đúng cho $\theta \in (0, \frac{\pi}{2})$. Mở rộng cho mọi $\theta$ thực: dùng tính tuần hoàn + công thức cộng — sẽ học Lesson 06.)

### Bài 6: code Go

Lời giải đầy đủ trong file [`solutions.go`](./solutions.go). Tóm tắt:

```go
func pointOnCircle(theta float64) (x, y float64) {
    return math.Cos(theta), math.Sin(theta)
}

func whichQuadrant(theta float64) int {
    // Quy về [0, 2π) trước
    t := math.Mod(theta, 2*math.Pi)
    if t < 0 { t += 2 * math.Pi }
    const eps = 1e-9
    switch {
    case math.Abs(t) < eps || math.Abs(t - 2*math.Pi) < eps: return 0  // trục Ox+
    case math.Abs(t - math.Pi/2) < eps: return 0                        // trục Oy+
    case math.Abs(t - math.Pi) < eps: return 0                          // trục Ox-
    case math.Abs(t - 3*math.Pi/2) < eps: return 0                      // trục Oy-
    case t < math.Pi/2:    return 1
    case t < math.Pi:      return 2
    case t < 3*math.Pi/2:  return 3
    default:               return 4
    }
}
```

**Kết quả test cho 8 góc**:

| Góc | $(\cos, \sin)$ | Quadrant |
|-----|--------------|----------|
| $0^\circ$ | $(1.000, 0.000)$ | 0 (trục) |
| $30^\circ$ | $(0.866, 0.500)$ | 1 |
| $45^\circ$ | $(0.707, 0.707)$ | 1 |
| $90^\circ$ | $(0.000, 1.000)$ | 0 (trục) |
| $150^\circ$ | $(-0.866, 0.500)$ | 2 |
| $210^\circ$ | $(-0.866, -0.500)$ | 3 |
| $300^\circ$ | $(0.500, -0.866)$ | 4 |
| $359^\circ$ | $(0.9998, -0.0175)$ | 4 |

**Độ phức tạp**: $O(1)$ cho cả hai hàm.

---

## Code và minh họa

- Code Go đầy đủ: [`solutions.go`](./solutions.go) — chạy `go run solutions.go` để xem bảng tọa độ 12 góc, kiểm tra quadrant, verify công thức quy gọn, và đáp án bài tập.
- Trang minh họa tương tác: [`visualization.html`](./visualization.html) — kéo điểm $P$ quanh đường tròn đơn vị, xem $(\cos\theta, \sin\theta)$, quadrant tô màu, dấu sin/cos/tan, và visualizer cho 4 công thức quy gọn.

## Bài tiếp theo

- **Trước**: [Lesson 02 — Tam giác vuông, SOH-CAH-TOA](../lesson-02-right-triangle/)
- **Tiếp**: [Lesson 04 — Đồ thị hàm lượng giác](../lesson-04-trig-graphs/) — vẽ `y = sin x` và `y = cos x` theo `x ∈ ℝ`, hiểu tính chu kỳ một cách trực quan, biên độ, pha, tần số.
- **Tham khảo**: Khan Academy "Unit circle"; 3Blue1Brown "Trigonometry"; Vaswani et al. "Attention Is All You Need" (positional encoding); Su et al. "RoFormer: Enhanced Transformer with Rotary Position Embedding" (RoPE).
