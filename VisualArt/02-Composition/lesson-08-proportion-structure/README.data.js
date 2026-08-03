// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: VisualArt/02-Composition/lesson-08-proportion-structure/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Tỉ lệ & cấu trúc hình (Proportion & Structure)

> Vì sao một khung hình "vừa mắt" còn khung khác thì "sai sai"? Vì sao người vẽ đo bằng cây bút giơ thẳng tay? Bài này biến cảm giác "cân đối" thành **những con số đo được**.

## Mục tiêu học tập

- Hiểu **tỉ lệ vàng (golden ratio, $\\varphi \\approx 1.618$)**, **hình chữ nhật vàng (golden rectangle)** và **dãy Fibonacci** — và *vì sao* mắt thấy dễ chịu.
- Chia được một đoạn theo tỉ lệ $1 : 1.618$ bằng số cụ thể, không cần thước đo vàng.
- Nắm **quy tắc thước đo (sight-size / measuring)**: dùng một vật chuẩn (đầu người, cây bút giơ tay) làm đơn vị để so mọi kích thước khác.
- Dựng được **tỉ lệ cơ thể người** theo "số đầu (head count)": người lớn ~7.5–8 đầu, trẻ em ít đầu hơn — và đánh dấu các mốc vai, rốn, hông, gối.
- Biết **dynamic symmetry / lưới đường chéo (diagonal grid)** để đặt bố cục.

## Kiến thức tiền đề

- Số học cộng/trừ/nhân/chia và tỉ số ($a : b$).
- Nên đã xem [Lesson 07 — Phối cảnh 2–3 điểm tụ](../lesson-07-two-three-point-perspective/): phối cảnh cho *hình dạng đúng khi lùi xa*, còn bài này cho *kích thước tương đối đúng ngay tại chỗ*. Hai thứ bổ trợ nhau.

---

## 1. Bức tranh lớn: tỉ lệ là "ngữ pháp kích thước"

> 💡 **Trực giác.** Hãy tưởng tượng bạn kể một câu chuyện mà mọi từ đều hét to bằng nhau — nghe rất mệt. Hình vẽ cũng vậy: nếu cái đầu, bàn tay, thân người mỗi cái "to sai một kiểu", mắt lập tức thấy *gượng*. **Tỉ lệ (proportion)** là quan hệ *kích thước cái này so với cái kia* — nó là ngữ pháp giữ cho các phần "nói chuyện" ăn khớp với nhau.

Có hai câu hỏi tỉ lệ luôn phải trả lời:

1. **Chia không gian thế nào cho dễ chịu?** → tỉ lệ vàng, dynamic symmetry (mục 2, 5).
2. **Các phần của vật thể to nhỏ so với nhau ra sao?** → quy tắc thước đo, tỉ lệ cơ thể (mục 3, 4).

Điểm mấu chốt của cả bài: **đừng đoán bằng cảm giác — hãy đo bằng một đơn vị chuẩn rồi so tỉ số.** Cảm giác sai; tỉ số thì không.

---

## 2. Tỉ lệ vàng, hình chữ nhật vàng & Fibonacci

### 2.1 Tỉ lệ vàng $\\varphi$ — định nghĩa đầy đủ

**(a) Là gì.** Tỉ lệ vàng là con số $\\varphi$ (đọc là "phi") sinh ra khi ta chia một đoạn thành hai phần — phần dài $a$ và phần ngắn $b$ — sao cho *tỉ số của cả đoạn so với phần dài bằng đúng tỉ số của phần dài so với phần ngắn*:

$$\\frac{a+b}{a} = \\frac{a}{b} = \\varphi$$

Giải phương trình này (đặt $x = a/b$ thì $x = 1 + \\tfrac{1}{x}$, tức $x^2 - x - 1 = 0$) ra:

$$\\varphi = \\frac{1 + \\sqrt{5}}{2} = 1.6180339887\\ldots$$

**(b) Vì sao cần khái niệm này.** Vì con người *đo bằng so sánh*, không đo bằng con số tuyệt đối. Một cách chia có tính chất "phần lớn so với tổng = phần nhỏ so với phần lớn" tạo ra sự **tự-lặp (self-similarity)**: nhìn ở mức độ nào cũng thấy cùng một tỉ lệ, nên bố cục có nhịp điệu thống nhất mà không đơn điệu. Đó là giả thuyết vì sao $\\varphi$ hay "vừa mắt".

**(c) Bốn tính chất số cụ thể** (kiểm chứng được):

| Tính chất | Con số | Kiểm tra |
|-----------|--------|----------|
| $\\varphi$ | $1.6180$ | — |
| $\\dfrac{1}{\\varphi} = \\varphi - 1$ | $0.6180$ | $1.6180 - 1 = 0.6180$ ✓ |
| $\\varphi^2 = \\varphi + 1$ | $2.6180$ | $1.6180^2 = 2.6179\\ldots \\approx 1.6180 + 1$ ✓ |
| $\\varphi^3 = 2\\varphi + 1$ | $4.2360$ | $1.6180^3 = 4.2358\\ldots \\approx 2(1.618)+1$ ✓ |

> ⚠ **Lỗi thường gặp.** *"Tỉ lệ vàng là quy luật thần thánh, cứ dùng là đẹp."* **Sai.** $\\varphi$ chỉ là **một** công cụ chia không gian dễ chịu, không phải phép màu. Rất nhiều tác phẩm kinh điển KHÔNG dùng $\\varphi$; và dán khung vàng lên một hình lộn xộn cũng không cứu được nó. Hãy xem $\\varphi$ như "một tỉ lệ an toàn để bắt đầu", rồi tin vào mắt mình.

### 2.2 Chia một đoạn theo tỉ lệ vàng — walk-through bằng số

Cho đoạn dài **100 đơn vị**. Muốn chia thành $a$ (dài) và $b$ (ngắn) theo tỉ lệ vàng:

$$a = \\frac{100}{\\varphi} = \\frac{100}{1.618} = 61.8, \\qquad b = 100 - 61.8 = 38.2$$

Kiểm tra cả hai vế của định nghĩa:

- $\\dfrac{a}{b} = \\dfrac{61.8}{38.2} = 1.618$ ✓
- $\\dfrac{a+b}{a} = \\dfrac{100}{61.8} = 1.618$ ✓

Vậy điểm chia vàng của một đoạn 100 nằm ở **vạch 61.8** (hoặc 38.2 tính từ đầu kia). Bốn ví dụ chia cho các độ dài khác nhau:

| Đoạn dài | Phần dài $a = L/\\varphi$ | Phần ngắn $b = L - a$ | $a/b$ |
|---------:|-------------------------:|----------------------:|------:|
| 100 | 61.8 | 38.2 | 1.618 ✓ |
| 50 | 30.9 | 19.1 | 1.618 ✓ |
| 16 | 9.9 | 6.1 | 1.618 ✓ |
| 8 | 4.9 | 3.1 | 1.618 ✓ |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Đặt đường chân trời (horizon) ở đâu?"* → Thay vì cắt đôi khung (nhàm), đặt ở vạch vàng: khung cao 100 → chân trời ở 38.2 (bầu trời chiếm phần lớn) hoặc 61.8 (đất chiếm phần lớn). Chính là "rule of thirds nâng cấp": $1/3 = 0.333$, còn vàng $= 0.382$ — gần nhau nên rule of thirds là bản xấp xỉ dễ nhớ của $\\varphi$.
> - *"Có phải nhớ số 1.618 không?"* → Không. Nhớ **0.618** (chia cho hơn 3/5 một chút) là đủ để ước lượng nhanh tại chỗ.

### 2.3 Hình chữ nhật vàng (golden rectangle) & xoắn ốc

**Hình chữ nhật vàng** là hình chữ nhật có tỉ số cạnh dài / cạnh ngắn $= \\varphi$. Tính chất kỳ diệu: **cắt bỏ một hình vuông** (cạnh = cạnh ngắn) khỏi nó, phần còn lại **lại là một hình chữ nhật vàng** nhỏ hơn.

Walk-through: hình chữ nhật vàng cạnh ngắn $= 100$, cạnh dài $= 161.8$.

- Cắt hình vuông $100 \\times 100$ → còn lại hình chữ nhật $100 \\times 61.8$.
- Tỉ số phần còn lại: $100 / 61.8 = 1.618$ = **vẫn là vàng!** ✓
- Cắt tiếp hình vuông $61.8 \\times 61.8$ → còn $61.8 \\times 38.2$, tỉ số $61.8/38.2 = 1.618$ ✓ … lặp mãi.

Nối các cung phần tư (quarter arc) trong mỗi hình vuông cắt ra → **xoắn ốc vàng (golden spiral)**. Đây là lý do xoắn ốc xuất hiện trong vỏ ốc, cách xếp lá — cấu trúc lớn lên theo cùng một tỉ lệ.

> ❓ **So sánh:** cắt hình vuông khỏi hình chữ nhật tỉ số **1 : 2** thì phần còn lại là hình vuông ($100\\times100$ cắt khỏi $100\\times200$ → còn $100\\times100$, tỉ số 1). Khỏi hình **1 : 1** (vuông) thì… hết luôn. Chỉ ở $\\varphi$ mới "cắt hoài không hết mà vẫn giống chính nó". Đây là điểm phải *tự tay* thấy — dùng máy tạo hình chữ nhật trong [visualization.html](./visualization.html), kéo slider so 1:1, 1:1.618, 1:2.

### 2.4 Dãy Fibonacci — con đường số nguyên tới $\\varphi$

Dãy **Fibonacci**: mỗi số bằng tổng hai số trước.

$$1,\\ 1,\\ 2,\\ 3,\\ 5,\\ 8,\\ 13,\\ 21,\\ 34,\\ 55,\\ 89,\\ 144,\\ \\ldots$$

Lấy **tỉ số hai số liền nhau**, nó tiến dần về $\\varphi$:

| Tỉ số | Giá trị | Lệch khỏi $\\varphi$ |
|-------|--------:|--------------------:|
| $3/2$ | $1.5000$ | $-0.118$ |
| $5/3$ | $1.6667$ | $+0.049$ |
| $8/5$ | $1.6000$ | $-0.018$ |
| $13/8$ | $1.6250$ | $+0.007$ |
| $21/13$ | $1.6154$ | $-0.003$ |
| $34/21$ | $1.6190$ | $+0.001$ |
| $89/55$ | $1.6182$ | $+0.0001$ |

> 💡 **Trực giác.** Fibonacci là "tỉ lệ vàng dành cho người không có máy tính": muốn một khung chữ nhật gần vàng mà chỉ được dùng số nguyên → lấy $89 \\times 55$ hay $8 \\times 5$. Vì thế kích thước phim ($3\\!:\\!2$, $8\\!:\\!5$…) và nhiều khổ giấy hay rơi vào các cặp Fibonacci.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Chia đoạn dài 34 theo tỉ lệ vàng: phần dài, phần ngắn?
> 2. Số Fibonacci tiếp theo sau 144 là bao nhiêu? Tỉ số của nó với 144 gần $\\varphi$ cỡ nào?
>
> <details><summary>Đáp án</summary>
>
> 1. $a = 34/1.618 = 21.0$, $b = 34 - 21 = 13$. (Đúng bằng cặp Fibonacci $21, 13$!) Kiểm tra $21/13 = 1.615 \\approx \\varphi$ ✓
> 2. $144 + 89 = 233$. Tỉ số $233/144 = 1.6181$ — lệch khỏi $\\varphi$ chỉ $0.00005$. ✓
> </details>

> 📝 **Tóm tắt mục 2.**
> - $\\varphi = \\frac{1+\\sqrt5}{2} = 1.618$; nhớ nhanh $1/\\varphi = 0.618$.
> - Chia đoạn vàng: phần dài $= L/1.618$, phần ngắn = phần còn lại. Đoạn 100 → $61.8 + 38.2$.
> - Hình chữ nhật vàng cắt hình vuông ra → còn lại vẫn vàng (tự-lặp) → xoắn ốc vàng.
> - Fibonacci $1,1,2,3,5,8,13\\ldots$: tỉ số liền nhau → $\\varphi$; là bản số-nguyên của tỉ lệ vàng.
> - $\\varphi$ là công cụ, không phải phép màu.

---

## 3. Quy tắc thước đo — đo bằng một đơn vị chuẩn

> 💡 **Trực giác.** Khi vẽ, mắt bạn *không* biết "cánh tay dài 74 cm". Nhưng mắt **rất giỏi** so sánh: "cánh tay dài gấp mấy lần cái đầu?". Vậy hãy chọn **một vật làm thước (unit)** rồi đo mọi thứ khác *theo bội số của nó*. Đây là bí quyết cổ điển giữ tỉ lệ đúng mà không cần thước kẻ.

### 3.1 Cây bút giơ thẳng tay (pencil sight-measuring)

Nhắm một mắt, duỗi thẳng tay, dùng cây bút chì làm thước:

1. Đặt đầu bút trùng đỉnh vật mẫu, ngón cái trượt tới đáy → **1 đơn vị = chiều cao vật** (ví dụ chiều dài cái đầu mẫu).
2. Giữ nguyên khoảng ngón cái, xoay/di bút để đếm: "thân người cao **mấy lần cái đầu**?".

Vì tay luôn duỗi cùng một độ dài, mọi lần đo dùng **cùng khoảng cách mắt–bút** → các bội số so sánh được với nhau. Đó là lý do phải *duỗi thẳng khuỷu tay* mỗi lần.

**Ví dụ số:** đo được đầu người mẫu "chiếm 1 khoảng bút". Đo tiếp:

| Bộ phận | Số khoảng bút đếm được | Diễn giải |
|---------|-----------------------:|-----------|
| Đầu | 1.0 | = đơn vị chuẩn |
| Từ cằm tới rốn | ~2.0 | thân trên dài gấp đôi đầu |
| Cả người | ~7.5 | người mẫu cao 7.5 đầu |
| Sải vai | ~2.0 | vai rộng bằng 2 đầu |

### 3.2 So tỉ số, không so số tuyệt đối

⚠ **Sai lầm điển hình:** vẽ đầu to "cho rõ" rồi vẽ thân theo cảm giác → nhân vật thành người lùn hoặc người ngoài hành tinh. **Đúng:** một khi đã chọn cái đầu to bằng $H$ trên giấy, thì thân **bắt buộc** $= 6.5 H$, sải tay $= 8 H$… mọi thứ khóa theo đơn vị đầu.

**Walk-through:** bạn vẽ cái đầu cao **3 cm** trên giấy. Muốn người 7.5 đầu:

$$\\text{Chiều cao nhân vật trên giấy} = 7.5 \\times 3\\ \\text{cm} = 22.5\\ \\text{cm}$$

Nếu đầu vẽ **4 cm** → người cao $7.5 \\times 4 = 30$ cm. Tỉ lệ giữ nguyên, chỉ đổi cỡ.

> ❓ **Câu hỏi tự nhiên.** *"Chụp ảnh rồi đo trên màn hình có được không?"* → Được, và chính xác hơn cả tay — nhưng học đo bằng bút rèn cho mắt "nhìn ra tỉ số" ngay cả khi không có ảnh. Hai cách bổ trợ nhau.

> 📝 **Tóm tắt mục 3.** Chọn một vật làm **đơn vị**; đo mọi thứ theo **bội số** của nó; luôn duỗi thẳng tay để đơn vị không đổi; khóa toàn bộ hình theo đơn vị đó.

---

## 4. Tỉ lệ cơ thể người theo "số đầu"

> 💡 **Trực giác.** Cái đầu là cây thước tiện nhất có sẵn trên chính cơ thể. "Số đầu (head count)" = chiều cao người chia cho chiều dài cái đầu. Nó cho ta một *bộ khung số* để dựng người mà không cần nhớ centimet.

### 4.1 Bảng số đầu theo lứa tuổi

| Đối tượng | Số đầu | Đặc điểm nhìn thấy |
|-----------|-------:|--------------------|
| Trẻ sơ sinh | ~4 | đầu rất to so với thân, chân ngắn |
| Trẻ ~3 tuổi | ~5 | vẫn "đầu bự", dễ thương |
| Trẻ ~6 tuổi | ~6 | cân đối dần |
| Thiếu niên ~12 | ~7 | gần người lớn |
| Người lớn thực tế | ~7.5 | chuẩn giải phẫu tự nhiên |
| Người lớn "anh hùng" (heroic) | ~8 | lý tưởng hóa, dùng trong tượng, comic |

**Bốn ví dụ chiều cao bằng số** (chọn đầu = 24 cm cho người lớn):

| Số đầu | Chiều cao $= \\text{đầu} \\times \\text{số đầu}$ | Ai |
|-------:|----------------------------------------------:|----|
| 8.0 | $24 \\times 8 = 192$ cm | người hùng lý tưởng |
| 7.5 | $24 \\times 7.5 = 180$ cm | người lớn cao |
| 6.0 | $18 \\times 6 = 108$ cm (đầu 18 cm) | trẻ 6 tuổi |
| 4.0 | $18 \\times 4 = 72$ cm (đầu 18 cm) | em bé |

> ⚠ **Lỗi thường gặp #1.** Vẽ trẻ em bằng cách *thu nhỏ người lớn*. Sai — trẻ em **không** phải người lớn cỡ nhỏ; đầu chúng chiếm tỉ lệ lớn hơn nhiều (4–6 đầu so với 8). Muốn ra "trẻ con", **tăng cỡ đầu tương đối**, không chỉ giảm chiều cao.

### 4.2 Các mốc trên hình 8 đầu (heroic canon)

Chia người cao 8 đầu thành 8 vạch (mỗi vạch = 1 đầu), tính từ đỉnh đầu:

| Vạch (số đầu) | Mốc cơ thể |
|:-------------:|------------|
| 0 | đỉnh đầu |
| 1 | cằm (hết cái đầu) |
| ~1.4 | đường vai (shoulder) |
| 2 | đường ngực (nipple) |
| 3 | rốn (navel) |
| **4** | **hông / đáy chậu — đúng điểm giữa người** |
| 5 | giữa đùi |
| 6 | đầu gối (knee) |
| 8 | gót chân |

Điểm chốt phải nhớ: ở hình 8 đầu, **điểm giữa cơ thể là hông (vạch 4)**, KHÔNG phải rốn. Người mới hay đặt điểm giữa ở rốn → chân bị ngắn.

> ⚠ **Lỗi thường gặp #2.** Nghĩ "chân bắt đầu từ rốn". Thực tế chân (khớp hông) bắt đầu ở **vạch 4**, còn rốn ở vạch 3. Vẽ sai chỗ này làm nhân vật trông "cụt chân".

**Walk-through đặt mốc:** người cao 8 đầu, mỗi đầu vẽ **2.5 cm** trên giấy → tổng cao $20$ cm. Vị trí các mốc (tính từ đỉnh):

- Vai: $1.4 \\times 2.5 = 3.5$ cm
- Rốn: $3 \\times 2.5 = 7.5$ cm
- Hông (giữa người): $4 \\times 2.5 = 10.0$ cm ✓ (đúng nửa của 20 cm)
- Gối: $6 \\times 2.5 = 15.0$ cm
- Gót: $8 \\times 2.5 = 20.0$ cm

> ❓ **Câu hỏi tự nhiên.**
> - *"Đổi sang 7.5 đầu thì mốc đổi ra sao?"* → Chia lại: mỗi đầu vẫn 1 đơn vị nhưng tổng chỉ còn 7.5 đơn vị. Hông vẫn ~điểm giữa, nhưng chân bớt "dài kịch" hơn hình 8 đầu — nhìn tự nhiên hơn. Kéo slider số đầu trong viz để thấy các vạch dồn lại.
> - *"Phụ nữ / nam giới khác gì?"* → Cùng ~số đầu, nhưng tỉ lệ vai–hông khác (nam vai rộng hơn hông, nữ ngược lại). Bài này lo *chiều cao theo đầu*; tỉ lệ ngang để bài sau.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Một nhân vật comic cao 8 đầu, bạn vẽ đầu cao 3 cm. Đầu gối nằm ở vạch bao nhiêu cm tính từ đỉnh?
> 2. Bạn muốn vẽ em bé 4 đầu, đầu cao 4 cm. Bé cao bao nhiêu, và điểm giữa cơ thể (theo bội đầu) rơi vào đâu?
>
> <details><summary>Đáp án</summary>
>
> 1. Gối ở vạch 6 → $6 \\times 3 = 18$ cm từ đỉnh.
> 2. Cao $4 \\times 4 = 16$ cm. Điểm giữa hình học = 8 cm = vạch 2 đầu. Ở em bé, vạch 2 rơi vào khoảng *ngực/bụng trên* — nghĩa là **nửa dưới cơ thể (chân) rất ngắn**, đúng đặc điểm trẻ sơ sinh. So với người lớn (điểm giữa ở hông, vạch 4), khác biệt này chính là thứ làm mắt ta "đọc" ra tuổi.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Số đầu = chiều cao / chiều dài đầu. Người lớn 7.5–8, trẻ em 4–6.
> - Trẻ em = đầu tương đối TO hơn, không phải người lớn thu nhỏ.
> - Ở hình 8 đầu: điểm giữa cơ thể là **hông (vạch 4)**, rốn ở vạch 3, gối vạch 6.
> - Khóa mọi mốc theo bội số của cỡ đầu đã chọn.

---

## 5. Dynamic symmetry & lưới đường chéo

> 💡 **Trực giác.** Đặt chủ thể vào đâu trong khung? "Cân đối tĩnh" (đặt chính giữa) thường buồn tẻ. **Dynamic symmetry** dùng **đường chéo (diagonal) của khung và các đường vuông góc hạ từ góc xuống chéo** để tạo ra những điểm/đường đặt chủ thể vừa cân vừa có nhịp.

Cách dựng cơ bản trên một khung chữ nhật:

1. Kẻ **đường chéo chính** từ góc này sang góc kia.
2. Từ một góc còn lại, hạ **đường vuông góc** xuống đường chéo (gọi là "reciprocal diagonal").
3. Giao điểm và các đường này chia khung thành các vùng theo tỉ lệ — đặt đường chân trời, chủ thể, hoặc điểm nhấn vào đó.

**Liên hệ số:** với khung chữ nhật vàng, các đường chéo này tự động cắt nhau tại những điểm chia theo $\\varphi$ (0.382 / 0.618) — nên dynamic symmetry và tỉ lệ vàng là **hai mặt của một ý tưởng**: một bên dựng bằng compa/thước, một bên bằng con số.

> ❓ **Câu hỏi tự nhiên.** *"Khác gì rule of thirds?"* → Rule of thirds chia đều $1/3, 2/3$ (các số $0.333, 0.667$) — nhanh và "đủ tốt". Dynamic symmetry bám theo đường chéo thật của khung nên các điểm đặt *thay đổi theo tỉ lệ khung*, tinh hơn nhưng cần dựng. Người mới dùng thirds; muốn chặt chẽ thì lên dynamic symmetry.

> 📝 **Tóm tắt mục 5.** Đường chéo + đường vuông góc hạ xuống nó tạo lưới đặt chủ thể có nhịp; với khung vàng, các giao điểm rơi đúng vào tỉ lệ $\\varphi$.

---

## 6. Bài tập

**Bài 1 (tỉ lệ vàng).** Cho khung tranh rộng **1618 px**, cao **1000 px**.
- a) Khung này có phải "gần vàng" không? Tính tỉ số.
- b) Đặt đường chân trời (ngang) theo tỉ lệ vàng: nó cách đáy bao nhiêu px (chọn phương án bầu trời chiếm phần lớn)?

**Bài 2 (Fibonacci).** Viết 10 số Fibonacci đầu tiên. Tính tỉ số $F_{n}/F_{n-1}$ cho ba cặp cuối và cho biết nó tiến về đâu.

**Bài 3 (số đầu).** Một họa sĩ vẽ nhân vật cao 7.5 đầu, mỗi đầu cao **4 cm** trên giấy.
- a) Nhân vật cao bao nhiêu cm?
- b) Rốn (vạch 3) và gối (vạch 6) cách đỉnh đầu bao nhiêu cm?
- c) Nếu muốn biến thành trẻ 5 đầu **giữ nguyên chiều cao giấy**, cái đầu phải vẽ cao bao nhiêu cm?

**Bài 4 (thước đo).** Đo được: cái đầu người mẫu = 1 khoảng bút; cả người = 7 khoảng bút; cánh tay = 3 khoảng bút. Trên giấy bạn quyết định vẽ cái đầu **2 cm**. Toàn thân và cánh tay dài bao nhiêu cm?

---

## 7. Lời giải chi tiết

**Bài 1.**
- a) $1618 / 1000 = 1.618$ = **đúng tỉ lệ vàng** (thực ra là hình chữ nhật vàng chuẩn). ✓
- b) "Bầu trời chiếm phần lớn" nghĩa là phần trên (trời) là phần *dài* $a$, phần dưới (đất) là phần *ngắn* $b$. Chiều cao 1000:
  - $a$ (trời) $= 1000 / 1.618 = 618$ px; $b$ (đất) $= 1000 - 618 = 382$ px.
  - Đường chân trời cách **đáy** một đoạn $b = 382$ px (và cách đỉnh 618 px). Kiểm tra $618/382 = 1.618$ ✓.

**Bài 2.** 10 số đầu: $1, 1, 2, 3, 5, 8, 13, 21, 34, 55$.
- $21/13 = 1.6154$
- $34/21 = 1.6190$
- $55/34 = 1.6176$
- Ba giá trị dao động quanh và **tiến về $\\varphi = 1.618$**, sai số ngày càng nhỏ (kiểu "kẹp" trên–dưới xen kẽ).

**Bài 3.** Cách tiếp cận: khóa mọi thứ theo cỡ đầu.
- a) $7.5 \\times 4 = \\mathbf{30}$ cm.
- b) Rốn vạch 3 → $3 \\times 4 = \\mathbf{12}$ cm từ đỉnh; gối vạch 6 → $6 \\times 4 = \\mathbf{24}$ cm từ đỉnh.
- c) Giữ chiều cao giấy 30 cm nhưng chia thành 5 đầu → mỗi đầu $= 30 / 5 = \\mathbf{6}$ cm. (Đầu to hơn hẳn: từ 4 cm lên 6 cm — đúng cảm giác "trẻ con đầu bự".)

**Bài 4.** Đơn vị = 1 khoảng bút = cái đầu = 2 cm trên giấy.
- Toàn thân $= 7 \\times 2 = \\mathbf{14}$ cm.
- Cánh tay $= 3 \\times 2 = \\mathbf{6}$ cm.

Kiểm tra logic: mọi kích thước chỉ là "số khoảng bút $\\times$ cỡ đầu trên giấy" — đổi cỡ đầu thì cả hình phóng/thu đồng đều, tỉ lệ không đổi. Đây chính là quy tắc thước đo ở mục 3.

---

## Bài tiếp theo

Kết thúc **Nhánh II — Bố cục (Composition)**. Bạn đã có công cụ *chia không gian* (tỉ lệ vàng, dynamic symmetry) và *dựng khung vật thể* (số đầu, thước đo).

Bước sang **Nhánh III — Sắc độ, khối & ánh sáng (Value, Form & Light)**:

**[Lesson 09 — Sắc độ & thang xám (Value & Grayscale)](../../03-Value-Form-Light/lesson-09-value-grayscale/)** — hình có tỉ lệ đúng vẫn "phẳng" nếu thiếu sắc độ. Lesson 09 dạy cách biến đường nét thành khối bằng thang xám và ánh sáng.

Minh họa tương tác: [visualization.html](./visualization.html) — máy tạo hình chữ nhật vàng + xoắn ốc, và thước tỉ lệ người kéo được số đầu.
`;
