# Lesson 07 (T2) — Từ trường & Cảm ứng

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **từ trường B** là gì — và nguồn gốc từ "dòng điện di chuyển".
- Tính **lực Lorentz** $\vec{F} = q \cdot \vec{v} \times \vec{B}$ trên điện tích chuyển động.
- Hiểu **cảm ứng điện từ Faraday**: từ trường biến đổi sinh ra điện trường (và ngược lại).
- Phân biệt **2 loại nam châm**: nam châm vĩnh cửu vs nam châm điện.
- Biết nguyên lý hoạt động của máy phát điện và động cơ điện.

## Kiến thức tiền đề

- [Lesson 06 — Dòng điện & mạch](../lesson-06-current-circuits/).

---

## 1. Từ trường B

### 1.1. Định nghĩa

**Từ trường B** = trường tác dụng lực lên **điện tích đang chuyển động** (và lên dòng điện, vốn là điện tích di chuyển).

Đơn vị: **Tesla (T) = N·s/(C·m) = N/(A·m)**. Một đơn vị nhỏ hơn: **Gauss (G) $= 10^{-4} \text{ T}$**.

💡 **Ý nghĩa**: từ trường mô tả "vùng không gian mà nếu có điện tích di chuyển/dòng điện qua, sẽ chịu lực". Khác điện trường (tác dụng lên cả điện tích đứng yên), từ trường **chỉ tác dụng khi điện tích di chuyển**.

**Vì sao tồn tại?** Theo lý thuyết tương đối, từ trường thực ra là "điện trường nhìn từ hệ quy chiếu khác" — khi bạn di chuyển so với điện tích, bạn "thấy" thêm từ trường. Nhưng trong khung làm việc thông thường, ta coi B là đại lượng riêng.

### 1.2. Lực Lorentz

**Lực lên điện tích q di chuyển với vận tốc v trong từ trường B**:

$$\vec{F} = q \cdot \vec{v} \times \vec{B} \quad (\text{tích vector!})$$

Độ lớn: $F = |q| \cdot v \cdot B \cdot \sin(\theta)$, với $\theta$ = góc giữa $\vec{v}$ và $\vec{B}$.

Hướng: theo **quy tắc bàn tay phải** (cho điện tích dương, bàn tay trái cho điện tích âm).

💡 **Ý nghĩa**: lực Lorentz **vuông góc** với cả $\vec{v}$ và $\vec{B}$. Đó là tại sao trong từ trường đều, điện tích chuyển động vòng tròn — lực Lorentz đóng vai trò lực hướng tâm.

### 1.3. Ví dụ con số

| Tình huống | B |
|------------|---|
| Từ trường Trái Đất (mặt biển) | $\sim 5 \times 10^{-5} \text{ T} = 0{,}5 \text{ Gauss}$ |
| Nam châm tủ lạnh | $\sim 0{,}01 \text{ T} = 100 \text{ Gauss}$ |
| Nam châm neodymium mạnh | $\sim 1 \text{ T}$ |
| Máy MRI bệnh viện | $1{,}5 - 7 \text{ T}$ |
| Nam châm phòng thí nghiệm vật lý hạt | $10 - 50 \text{ T}$ |
| Sao neutron (bề mặt) | $10^8 - 10^{11} \text{ T}$ (cực lớn) |

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao từ trường chỉ tác dụng lên điện tích ĐANG chuyển động?"* Vì lực Lorentz $\vec{F} = q\vec{v} \times \vec{B}$ chứa vận tốc $v$. Nếu $v = 0$ → $F = 0$. Đây là điểm khác cơ bản với điện trường (tác dụng cả lên điện tích đứng yên).
- *"Lực Lorentz hướng nào?"* Vuông góc với cả $\vec{v}$ và $\vec{B}$ (vì là tích vector). Đó là lý do điện tích trong từ trường đều đi vòng tròn — lực luôn vuông góc vận tốc, làm vai trò lực hướng tâm, không tăng tốc độ.
- *"Lực Lorentz có sinh công không?"* Không (vì vuông góc $\vec{v}$) → không thay đổi tốc độ, chỉ đổi hướng. Năng lượng động của hạt giữ nguyên.

⚠ **Lỗi thường gặp**

- **Quên $\sin(\theta)$: $F = qvB \cdot \sin(\theta)$**. Khi $\vec{v}$ song song $\vec{B}$ ($\theta = 0$) → $F = 0$ (không có lực). Phản ví dụ: electron bay **dọc** đường sức từ → không bị lệch; chỉ khi bay vuông góc ($\theta = 90^\circ$) lực mới cực đại.
- **Nhầm bàn tay phải/trái**: quy tắc bàn tay phải cho điện tích **dương**; với electron (âm) lực ngược lại.

🔁 **Dừng lại tự kiểm tra**

1. Một proton bay song song với đường sức từ. Lực Lorentz lên nó bằng bao nhiêu?
2. Electron bay $v = 2 \times 10^6 \text{ m/s}$ vuông góc $B = 0{,}5 \text{ T}$. Tính lực ($e = 1{,}6 \times 10^{-19} \text{ C}$).

<details><summary>Đáp án</summary>

1. **0** — $\vec{v}$ song song $\vec{B}$ → $\theta = 0$ → $\sin(0) = 0$ → $F = 0$.
2. $F = qvB \cdot \sin(90^\circ) = 1{,}6 \times 10^{-19} \cdot 2 \times 10^6 \cdot 0{,}5 \cdot 1 =$ **$1{,}6 \times 10^{-13} \text{ N}$**.

</details>

### 📝 Tóm tắt mục 1

- $B$ = từ trường, đơn vị Tesla.
- Lực Lorentz $\vec{F} = q \cdot \vec{v} \times \vec{B}$, vuông góc cả $\vec{v}$ và $\vec{B}$.
- Trái Đất có $B \approx 5 \times 10^{-5} \text{ T}$ (lý do la bàn hoạt động).

---

## 2. Nguồn của từ trường

### 2.1. Hai loại nguồn

**Mọi từ trường đều sinh từ điện tích chuyển động**. Hai dạng phổ biến:

1. **Dòng điện** trong dây dẫn — sinh từ trường xung quanh (định luật Ampère).
2. **Spin/quỹ đạo electron** trong nguyên tử — sinh "từ tính bẩm sinh" của vật liệu sắt, neodymium...

→ Cả nam châm điện và nam châm vĩnh cửu đều là **điện tích di chuyển** ở quy mô vi mô.

### 2.2. Dây dẫn thẳng

Từ trường ở khoảng cách $r$ từ dây dẫn dài có dòng $I$:
$$B = \frac{\mu_0 \cdot I}{2\pi \cdot r}$$

trong đó **$\mu_0$** = hằng số từ = **$4\pi \times 10^{-7} \text{ T·m/A}$**.

Hướng: theo quy tắc nắm tay phải (ngón cái theo chiều $I$, các ngón còn lại theo chiều $\vec{B}$ vòng quanh dây).

### 2.3. Vòng dây (cuộn solenoid)

Bên trong cuộn solenoid dài có $n$ vòng/m và dòng $I$:
$$B = \mu_0 \cdot n \cdot I$$

→ $B$ đều và mạnh — nguyên lý nam châm điện công nghiệp.

💡 **Trực giác**: mọi từ trường, từ nam châm tủ lạnh đến từ trường Trái Đất, đều có chung một nguồn gốc — **điện tích chuyển động**. Trong dây dẫn đó là dòng electron; trong nam châm vĩnh cửu đó là spin và quỹ đạo electron của các nguyên tử sắt xếp cùng hướng. Không có "từ tích" đứng yên như điện tích.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Có 'hạt từ' (monopole) như hạt điện tích không?"* Chưa tìm thấy. Cắt đôi nam châm → được 2 nam châm nhỏ, mỗi cái lại có đủ 2 cực N-S. Đây là nội dung $\nabla \cdot \vec{B} = 0$ (Lesson 08).
- *"Vì sao quấn nhiều vòng (solenoid) thì từ trường mạnh hơn?"* Vì từ trường mỗi vòng cộng dồn: $B = \mu_0 \cdot n \cdot I$, với $n$ = số vòng/mét. Nhiều vòng + dòng lớn → $B$ lớn → nam châm điện mạnh.
- *"Nam châm vĩnh cửu khác nam châm điện ra sao?"* Vĩnh cửu: từ spin electron tự xếp hàng (không cần điện), nhưng không tắt được. Điện: từ dòng điện, bật/tắt được bằng dòng — dùng trong cần cẩu nâng sắt, loa, động cơ.

⚠ **Lỗi thường gặp**

- **Quên $2\pi$ trong công thức dây thẳng**: $B = \frac{\mu_0 I}{2\pi \cdot r}$, không phải $\frac{\mu_0 I}{r}$. Phản ví dụ: $I = 10 \text{ A}$, $r = 0{,}1 \text{ m}$ → $B = \frac{4\pi \times 10^{-7} \cdot 10}{2\pi \cdot 0{,}1} =$ **$2 \times 10^{-5} \text{ T}$**, không phải $\frac{4\pi \times 10^{-7} \cdot 10}{0{,}1}$.
- **Lẫn công thức dây thẳng (có $r$) với solenoid (không có $r$)**: solenoid $B = \mu_0 nI$ đều trong lòng, không phụ thuộc khoảng cách tới thành.

🔁 **Dừng lại tự kiểm tra**

1. Cắt đôi một thanh nam châm — mỗi nửa có mấy cực?
2. Solenoid 500 vòng/m, dòng $4 \text{ A}$. Tính $B$ trong lòng ($\mu_0 = 4\pi \times 10^{-7}$).

<details><summary>Đáp án</summary>

1. Mỗi nửa có **đủ 2 cực N và S** — không tách được cực đơn (không có monopole).
2. $B = \mu_0 nI = 4\pi \times 10^{-7} \cdot 500 \cdot 4 = 4\pi \times 10^{-7} \cdot 2000 \approx$ **$2{,}51 \times 10^{-3} \text{ T}$**.

</details>

### 📝 Tóm tắt mục 2

- Nguồn từ trường = điện tích di chuyển.
- Dây thẳng: $B = \frac{\mu_0 I}{2\pi r}$.
- Solenoid: $B = \mu_0 nI$ (đều bên trong).

---

## 3. Cảm ứng điện từ (Faraday)

### 3.1. Định luật Faraday

**Hiệu điện thế cảm ứng $\varepsilon$** sinh ra khi **từ thông $\Phi$ qua mạch thay đổi**:

$$\varepsilon = -\frac{d\Phi}{dt}$$

trong đó **$\Phi = B \cdot A \cdot \cos(\theta)$** = từ thông (Wb, Weber).

💡 **Ý nghĩa**: nếu từ trường qua 1 cuộn dây **đang thay đổi** (do nam châm di chuyển, $B$ tăng/giảm, hoặc cuộn xoay), sẽ sinh ra hiệu điện thế trong cuộn → dòng điện chạy.

**Dấu trừ** = **định luật Lenz**: dòng cảm ứng có chiều **chống lại** sự thay đổi từ thông (giống "quán tính từ"). Đây là biểu hiện của bảo toàn năng lượng.

### 3.2. Ý nghĩa lịch sử

Faraday (1831) phát hiện: **từ trường biến đổi sinh ra điện**. Đây là phát hiện vĩ đại — mở đường cho:
- **Máy phát điện**: xoay cuộn dây trong từ trường → tạo dòng AC.
- **Máy biến áp**: dòng AC trong cuộn 1 → tạo từ trường biến đổi → cảm ứng dòng vào cuộn 2.
- **Mọi nhà máy điện** ngày nay (trừ pin và panel mặt trời) đều dựa vào nguyên lý này.

### 3.2b. Từ thông Φ — định nghĩa đủ 3 phần

**(a) Là gì**: **Từ thông $\Phi$** = "lượng đường sức từ xuyên qua một diện tích". Công thức $\Phi = B \cdot A \cdot \cos(\theta)$, với $A$ = diện tích, $\theta$ = góc giữa $\vec{B}$ và pháp tuyến mặt. Đơn vị **Weber (Wb) $= \text{T·m}^2$**.

**(b) Vì sao cần**: Faraday phát hiện dòng cảm ứng sinh ra không phải do từ trường lớn hay nhỏ, mà do từ thông **thay đổi**. $\Phi$ gói gọn cả độ mạnh $B$, diện tích $A$ và góc $\theta$ vào một số → tính $\varepsilon = -\frac{d\Phi}{dt}$ gọn. Không có $\Phi$ thì không phát biểu được định luật Faraday.

**(c) Ví dụ số kèm đơn vị**: cuộn dây diện tích $A = 0{,}02 \text{ m}^2$ đặt vuông góc ($\theta = 0$) trong $B = 0{,}5 \text{ T}$ → $\Phi = B \cdot A \cdot \cos(0) = 0{,}5 \cdot 0{,}02 \cdot 1 =$ **$0{,}01 \text{ Wb}$**. Nếu xoay cuộn 90° ($\theta = 90^\circ$) → $\Phi = 0{,}5 \cdot 0{,}02 \cdot \cos(90^\circ) =$ **$0 \text{ Wb}$**. Biến thiên $\Delta\Phi = 0{,}01 \text{ Wb}$ trong $\Delta t = 0{,}1 \text{ s}$ → $\varepsilon = -\frac{\Delta\Phi}{\Delta t} = -0{,}01/0{,}1 =$ **$-0{,}1 \text{ V}$** (độ lớn $0{,}1 \text{ V}$).

### 3.3. Ví dụ — Máy phát điện đơn giản

Cuộn dây $N$ vòng, diện tích $A$, quay với vận tốc góc $\omega$ trong từ trường $B$ đều:
- $\Phi(t) = B \cdot A \cdot \cos(\omega t)$.
- $\varepsilon = -\frac{d\Phi}{dt} = B \cdot A \cdot \omega \cdot \sin(\omega t)$ — sóng sin (dòng AC).
- $\varepsilon_{max} = B \cdot A \cdot \omega \cdot N$.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Vì sao chỉ từ thông THAY ĐỔI mới sinh điện, từ thông lớn mà đứng yên thì không?"* Vì $\varepsilon = -\frac{d\Phi}{dt}$ phụ thuộc **tốc độ thay đổi** của $\Phi$, không phụ thuộc giá trị $\Phi$. Nam châm để yên cạnh cuộn dây → $\Phi$ không đổi → $\varepsilon = 0$. Phải di chuyển nam châm ($\Phi$ thay đổi) mới có dòng.
- *"Dấu trừ trong $\varepsilon = -\frac{d\Phi}{dt}$ nghĩa là gì?"* Định luật Lenz: dòng cảm ứng có chiều **chống lại** sự thay đổi từ thông. Đẩy nam châm vào cuộn → dòng sinh ra tạo từ trường đẩy lại nam châm. Đây là biểu hiện bảo toàn năng lượng — nếu không "chống lại", ta sẽ tạo năng lượng từ hư không.
- *"Vì sao cuộn nhiều vòng $N$ thì $\varepsilon$ lớn hơn?"* Vì mỗi vòng góp một $\varepsilon$, tổng $\varepsilon = N \cdot (-\frac{d\Phi}{dt})$. Quấn nhiều vòng → điện áp ra lớn.

⚠ **Lỗi thường gặp**

- **Quên dấu Lenz** dẫn tới kết luận sai về chiều dòng cảm ứng. Phản ví dụ: đẩy cực N của nam châm lại gần cuộn → dòng cảm ứng tạo cực N ở mặt cuộn hướng về nam châm (để **đẩy ra**, chống lại), không phải hút vào.
- **Tưởng nam châm đứng yên ($\Phi$ lớn) sinh dòng**. Sai — chỉ khi $\Phi$ **biến thiên**. Đó là lý do máy biến áp chỉ chạy với AC ($\Phi$ liên tục đổi), không chạy với DC ổn định.

🔁 **Dừng lại tự kiểm tra**

1. Một nam châm để yên bên trong cuộn dây. Có dòng cảm ứng không?
2. Cuộn 200 vòng, $A = 0{,}01 \text{ m}^2$, $B = 0{,}2 \text{ T}$, quay với $\omega = 50 \text{ rad/s}$. Tính $\varepsilon_{max}$.

<details><summary>Đáp án</summary>

1. **Không** — $\Phi$ không đổi ($\frac{d\Phi}{dt} = 0$) → $\varepsilon = 0$. Phải có chuyển động/biến thiên mới sinh dòng.
2. $\varepsilon_{max} = B \cdot A \cdot \omega \cdot N = 0{,}2 \cdot 0{,}01 \cdot 50 \cdot 200 =$ **$20 \text{ V}$**.

</details>

### 📝 Tóm tắt mục 3

- $\varepsilon = -\frac{d\Phi}{dt}$ (Faraday).
- $\Phi$ thay đổi → $\varepsilon$ sinh → dòng cảm ứng.
- Cơ sở của mọi máy phát điện.

---

## 4. Bài tập

### Bài tập

**Bài 1**: 1 electron bay với $v = 10^6 \text{ m/s}$ vuông góc với từ trường $B = 0{,}01 \text{ T}$. Tính lực.

**Bài 2**: Tính $B$ ở khoảng cách 10 cm từ dây dẫn có $I = 5 \text{ A}$.

**Bài 3**: Solenoid 1000 vòng/m, $I = 2 \text{ A}$. Tính $B$ trong lòng.

**Bài 4**: Cuộn dây 100 vòng, $A = 0{,}01 \text{ m}^2$, trong $B = 0{,}5 \text{ T}$. Quay với $\omega = 100 \text{ rad/s}$. Tính $\varepsilon_{max}$.

**Bài 5**: Vì sao máy biến áp hoạt động được với dòng AC mà không với DC?

### Lời giải

**Bài 1**: $F = q \cdot v \cdot B = 1{,}6 \times 10^{-19} \cdot 10^6 \cdot 0{,}01 =$ **$1{,}6 \times 10^{-15} \text{ N}$**. Lực Lorentz → electron chạy vòng tròn.

**Bài 2**: $B = \frac{\mu_0 \cdot I}{2\pi \cdot r} = \frac{4\pi \cdot 10^{-7} \cdot 5}{2\pi \cdot 0{,}1} =$ **$10^{-5} \text{ T}$** $= 0{,}1 \text{ Gauss}$. (Khoảng 5 lần từ trường Trái Đất.)

**Bài 3**: $B = \mu_0 \cdot n \cdot I = 4\pi \cdot 10^{-7} \cdot 1000 \cdot 2 =$ **$2{,}51 \times 10^{-3} \text{ T}$** $\approx 25 \text{ Gauss}$.

**Bài 4**: $\varepsilon_{max} = B \cdot A \cdot \omega \cdot N = 0{,}5 \cdot 0{,}01 \cdot 100 \cdot 100 =$ **$50 \text{ V}$**.

**Bài 5**: Máy biến áp dùng nguyên lý cảm ứng Faraday: dòng vào cuộn 1 sinh từ trường → từ trường biến đổi sinh ε ở cuộn 2. **DC (dòng 1 chiều)** = dòng ổn định → từ trường ổn định → KHÔNG thay đổi → không có cảm ứng → cuộn 2 không sinh ε. **AC (dòng xoay chiều)** = liên tục thay đổi → từ trường liên tục thay đổi → có cảm ứng → cuộn 2 có dòng. Đó là lý do điện gia đình dùng AC (220 V, 50 Hz) — dễ biến đổi điện thế qua máy biến áp.

---

## 5. Bài tiếp theo

[Lesson 08 — Sóng điện từ](../lesson-08-em-waves/).

## 📝 Tổng kết

1. **$B$ (Tesla)** = từ trường, tác dụng lực lên điện tích di chuyển.
2. **$\vec{F} = q \cdot \vec{v} \times \vec{B}$** (Lorentz), vuông góc cả $\vec{v}$ và $\vec{B}$.
3. **Nguồn từ trường**: dòng điện (dây thẳng $B = \frac{\mu_0 I}{2\pi r}$, solenoid $B = \mu_0 nI$).
4. **Faraday**: $\varepsilon = -\frac{d\Phi}{dt}$ — từ trường biến đổi sinh điện.
5. **Lenz**: dòng cảm ứng chống lại sự thay đổi từ thông (bảo toàn năng lượng).
