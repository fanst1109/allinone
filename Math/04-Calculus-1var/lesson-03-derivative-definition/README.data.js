// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-03-derivative-definition/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Đạo hàm: Định nghĩa & ý nghĩa hình học

## Mục tiêu

- Hiểu **đạo hàm** là gì qua 2 hình ảnh: **vận tốc tức thời** và **slope tiếp tuyến**.
- Định nghĩa hình thức bằng giới hạn.
- Tính đạo hàm bằng định nghĩa cho vài hàm cơ bản.
- Hiểu sự khác biệt: f khả vi ⟹ f liên tục (nhưng ngược lại không đúng).

## Kiến thức tiền đề

- [Lesson 02 — Giới hạn hàm](../lesson-02-function-limits-continuity/).

---

## 1. Đạo hàm là gì — 2 hình ảnh trực giác

### 1.1. Hình ảnh "vận tốc tức thời" (động lực học)

Một vật chuyển động: vị trí s(t) tại thời điểm t. Vận tốc trung bình từ t đến t+Δt:
\`\`\`
v_tb = [s(t+Δt) - s(t)] / Δt
\`\`\`

⟶ Khi Δt → 0, ta được **vận tốc tức thời** tại thời điểm t.

\`\`\`
v(t) = lim_{Δt→0} [s(t+Δt) - s(t)] / Δt = s'(t)
\`\`\`

### 1.2. Hình ảnh "slope tiếp tuyến" (hình học)

Trên đồ thị y = f(x):
- Chọn 2 điểm A(x, f(x)) và B(x+h, f(x+h)).
- Đường thẳng AB có hệ số góc **[f(x+h) - f(x)] / h** (= cát tuyến).
- Khi h → 0, B trượt về A → cát tuyến trở thành **tiếp tuyến**.
- Hệ số góc tiếp tuyến = **f'(x)**.

💡 **Cả 2 hình ảnh dẫn đến cùng 1 định nghĩa**: đạo hàm.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Sao không lấy \`Δt = 0\` luôn cho gọn?"* Vì \`Δt = 0\` cho \`0/0\` vô nghĩa (không có khoảng để chia quãng đường). Mẹo của giải tích: cho \`Δt\` **tiến tới** 0 chứ không **bằng** 0 — tỉ số xấp xỉ ngày càng tốt và hội tụ về một số duy nhất.
- *"Vận tốc tức thời với slope tiếp tuyến có thật sự là một thứ?"* Đúng. Nếu vẽ đồ thị vị trí \`s(t)\`, độ dốc của tiếp tuyến tại thời điểm \`t\` chính là vận tốc tức thời tại \`t\`. Cùng một phép tính \`lim Δs/Δt\`, chỉ khác cách diễn giải (hình học vs vật lý).

⚠ **Lỗi thường gặp — nhầm vận tốc trung bình với tức thời**. \`v_tb = Δs/Δt\` là trung bình trên cả khoảng; vận tốc tức thời là giới hạn khi \`Δt → 0\`. Vd \`s(t) = t²\`: từ \`t=2\` đến \`t=3\`, \`v_tb = (9−4)/1 = 5\`, nhưng vận tốc tức thời tại \`t=2\` là \`s'(2) = 4\` — khác nhau.

🔁 **Dừng lại tự kiểm tra**

1. \`s(t) = t²\`. Vận tốc trung bình từ \`t = 1\` đến \`t = 1.1\` là bao nhiêu? Đoán vận tốc tức thời tại \`t = 1\`.
2. Cát tuyến qua hai điểm trên đồ thị trở thành gì khi hai điểm trùng nhau?

<details><summary>Đáp án</summary>

1. \`v_tb = (1.21 − 1)/0.1 = 0.21/0.1 = 2.1\`. Khi \`Δt → 0\` → tiến tới \`2\` = vận tốc tức thời tại \`t=1\` (\`s'(1) = 2\`).
2. Trở thành **tiếp tuyến** tại điểm đó; slope cát tuyến → slope tiếp tuyến = đạo hàm.

</details>

### 📝 Tóm tắt mục 1

- Đạo hàm = giới hạn của tỉ số biến thiên \`Δf/Δx\` khi \`Δx → 0\`.
- Hai cách hiểu cùng một thứ: **vận tốc tức thời** (vật lý) và **slope tiếp tuyến** (hình học).
- Cho biến tiến 0 (không bằng 0) để né \`0/0\` và thu được một số duy nhất.

---

## 2. Định nghĩa hình thức

\`\`\`
f'(x) = lim_{h→0} [f(x+h) - f(x)] / h
\`\`\`

Cách viết khác (kế Leibniz):
\`\`\`
df/dx = lim_{Δx→0} Δy/Δx
\`\`\`

**Ý nghĩa hình học**: f'(a) = slope tiếp tuyến với đồ thị y = f(x) tại điểm (a, f(a)).

**Phương trình tiếp tuyến tại (a, f(a))**:
\`\`\`
y = f(a) + f'(a)·(x - a)
\`\`\`

> 📐 **Định nghĩa đầy đủ — Đạo hàm f'(x)**
>
> **(a) Là gì**: Giới hạn của tỉ số "biến thiên hàm/biến thiên biến" khi biến biến thiên → 0. Đo "tốc độ tức thời f thay đổi khi x thay đổi" tại đúng 1 điểm. Hình học = slope tiếp tuyến. Vật lý = vận tốc tức thời (nếu x = thời gian, f = vị trí).
>
> **(b) Vì sao cần**: Trước Newton/Leibniz (~1670), không có cách nói chính xác "vận tốc tại 1 thời điểm" (cần khoảng thời gian Δt để chia khoảng cách, nhưng Δt = 0 thì chia 0 vô nghĩa). Giới hạn lim h→0 giải quyết — cho ra 1 số duy nhất khi h tiến 0 đúng cách. Đạo hàm trở thành công cụ trung tâm: tối ưu hoá (f' = 0 tại cực trị), mô hình hoá (ODE), xấp xỉ (Taylor), ML (gradient descent).
>
> **(c) Ví dụ số**: f(x) = x², tại x = 3. Tỉ số = [(3+h)² − 9]/h = (6h+h²)/h = 6+h. Cho h → 0 → **f'(3) = 6**. Verify công thức (x²)' = 2x → 2·3 = 6 ✓. f(x) = x³ tại x = 2: f'(2) = 3·4 = 12. f(x) = 1/x tại x = 2: f'(2) = −1/4 = −0.25. Hàm hằng f(x) = 5: f'(x) = 0 ∀x (slope tiếp tuyến của đường ngang = 0). f(x) = |x| tại x = 0: **không tồn tại** (slope trái = −1, slope phải = +1).

❓ **Câu hỏi tự nhiên của người đọc**

- *"\`f'(x)\` là một số hay một hàm?"* Cả hai, tùy ngữ cảnh. \`f'(a)\` (thay số cụ thể) là **một số** (slope tại điểm \`a\`). \`f'(x)\` (để nguyên biến) là một **hàm** cho slope tại mọi điểm. Vd \`(x²)' = 2x\` là hàm; \`f'(3) = 6\` là số.
- *"Tại sao công thức tiếp tuyến là \`y = f(a) + f'(a)(x−a)\`?"* Đây là đường thẳng qua điểm \`(a, f(a))\` với hệ số góc \`f'(a)\`. Dạng "điểm–slope" của đường thẳng \`y − y₀ = m(x − x₀)\`, với \`m = f'(a)\`.

⚠ **Lỗi thường gặp — quên rằng \`f'(a)\` có thể không tồn tại**. Đạo hàm là một giới hạn; giới hạn này có thể không tồn tại (góc nhọn như \`|x|\` tại 0, hoặc tiếp tuyến đứng như \`∛x\` tại 0). Không phải hàm nào cũng khả vi tại mọi điểm.

🔁 **Dừng lại tự kiểm tra**

1. \`f(x) = x²\`. Viết phương trình tiếp tuyến tại \`x = 1\`.
2. \`f'(2) = 12\` cho hàm \`x³\` — nghĩa hình học của số \`12\` này là gì?

<details><summary>Đáp án</summary>

1. \`f(1) = 1\`, \`f'(1) = 2\` → \`y = 1 + 2(x−1) = 2x − 1\`.
2. Slope của tiếp tuyến với đồ thị \`y = x³\` tại điểm \`(2, 8)\` bằng \`12\` (đồ thị dốc đứng tại đó).

</details>

### 📝 Tóm tắt mục 2

- \`f'(x) = lim_{h→0} [f(x+h) − f(x)]/h\` — slope tiếp tuyến = vận tốc tức thời.
- Tiếp tuyến tại \`(a, f(a))\`: \`y = f(a) + f'(a)(x − a)\`.
- \`f'(a)\` là **số** (slope tại 1 điểm); \`f'(x)\` là **hàm**; có thể không tồn tại tại vài điểm.

---

## 3. Tính đạo hàm bằng định nghĩa

### 3.1. f(x) = x² (ví dụ kinh điển)

\`\`\`
f'(x) = lim_{h→0} [(x+h)² - x²] / h
      = lim_{h→0} [x² + 2xh + h² - x²] / h
      = lim_{h→0} [2xh + h²] / h
      = lim_{h→0} (2x + h)
      = 2x
\`\`\`

⟶ **(x²)' = 2x**.

### 3.2. f(x) = 1/x

\`\`\`
f'(x) = lim [(1/(x+h)) - (1/x)] / h
      = lim [(x - (x+h)) / (x(x+h))] / h
      = lim [-h / (x(x+h))] / h
      = lim [-1 / (x(x+h))]
      = -1/x²
\`\`\`

⟶ **(1/x)' = -1/x²**.

### 3.3. f(x) = √x

\`\`\`
f'(x) = lim [√(x+h) - √x] / h
      = lim [(√(x+h) - √x)(√(x+h) + √x)] / [h(√(x+h) + √x)]
      = lim [h / (h(√(x+h) + √x))]
      = lim [1 / (√(x+h) + √x)]
      = 1/(2√x)
\`\`\`

⟶ **(√x)' = 1/(2√x)**.

### 3.4. f(x) = sin x

Dùng đồng nhất thức sin(x+h) - sin x = 2·cos(x+h/2)·sin(h/2) và lim sin(h/2)/(h/2) = 1:
\`\`\`
f'(x) = lim [sin(x+h) - sin x] / h
      = lim [2·cos(x+h/2)·sin(h/2)] / h
      = lim cos(x+h/2) · [sin(h/2) / (h/2)]
      = cos(x) · 1 = cos x
\`\`\`

⟶ **(sin x)' = cos x**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao luôn xuất hiện trò 'nhân liên hợp' hay 'rút gọn \`h\`'?"* Vì tỉ số \`[f(x+h)−f(x)]/h\` luôn là dạng \`0/0\` khi \`h → 0\` (tử và mẫu cùng tiến 0). Mục tiêu mọi phép biến đổi là **triệt tiêu \`h\` ở mẫu** trước khi cho \`h → 0\`, để không còn chia 0.
- *"Tính bằng định nghĩa cực dài — có phải làm vậy mãi không?"* Không. Ta tính một lần để **chứng minh** công thức, sau đó dùng bảng đạo hàm + quy tắc (L04) cho nhanh. Định nghĩa là nền móng, không phải công cụ hằng ngày.

⚠ **Lỗi thường gặp — cho \`h = 0\` quá sớm**. Nếu thay \`h = 0\` ngay vào \`[(x+h)²−x²]/h\` được \`0/0\` vô nghĩa. Phải khai triển và rút gọn \`h\` (\`= 2x + h\`) **trước**, rồi mới cho \`h → 0\`.

🔁 **Dừng lại tự kiểm tra**

1. Dùng định nghĩa, chứng minh \`(x³)' = 3x²\` (gợi ý \`(x+h)³ = x³ + 3x²h + 3xh² + h³\`).
2. Trong bước rút gọn của \`(√x)'\`, vì sao phải nhân liên hợp?

<details><summary>Đáp án</summary>

1. \`[(x+h)³−x³]/h = (3x²h + 3xh² + h³)/h = 3x² + 3xh + h² → 3x²\` khi \`h→0\`.
2. Để biến tử \`√(x+h)−√x\` thành \`(x+h)−x = h\`, qua đó triệt tiêu \`h\` ở mẫu (nếu không thì kẹt dạng \`0/0\`).

</details>

### 📝 Tóm tắt mục 3

- Quy trình: lập tỉ số \`[f(x+h)−f(x)]/h\`, biến đổi để **triệt tiêu \`h\`**, rồi cho \`h → 0\`.
- Kết quả nền tảng: \`(x²)' = 2x\`, \`(1/x)' = −1/x²\`, \`(√x)' = 1/(2√x)\`, \`(sin x)' = cos x\`.
- Chỉ tính bằng định nghĩa để **chứng minh**; sau đó dùng bảng + quy tắc (L04).

---

## 4. Ký hiệu khác nhau cho đạo hàm

- **Newton**: f'(x), y'.
- **Leibniz**: df/dx, dy/dx — "tỉ số vi phân".
- **Lagrange cấp cao**: f''(x), f'''(x), f^(n)(x).
- **Leibniz cấp cao**: d²y/dx², d^n y/dx^n.

💡 **Khi nào dùng cái nào**:
- f'(x): nhanh, gọn (thường dùng).
- dy/dx: nhấn mạnh đạo hàm theo BIẾN nào (quan trọng khi nhiều biến).

❓ **Câu hỏi tự nhiên của người đọc**

- *"\`dy/dx\` có phải phân số \`dy\` chia \`dx\` không?"* Theo nghĩa chặt, đây là **ký hiệu cho một giới hạn**, không phải phép chia thật. Nhưng nó "cư xử như" phân số trong nhiều trường hợp (đổi biến, chain rule) — đó là lý do Leibniz chọn ký hiệu này, rất tiện thao tác.
- *"\`f''(x)\` nghĩa là gì?"* Đạo hàm của đạo hàm — tốc độ thay đổi của slope. Vd \`s''(t)\` = gia tốc (tốc độ thay đổi của vận tốc). Sẽ dùng nhiều ở L04, L05.

🔁 **Dừng lại tự kiểm tra**

1. Viết đạo hàm cấp 2 của \`y\` theo \`x\` bằng cả ký hiệu Lagrange và Leibniz.
2. \`dy/dt\` khác \`dy/dx\` ở chỗ nào?

<details><summary>Đáp án</summary>

1. Lagrange: \`y''\` (hay \`f''(x)\`); Leibniz: \`d²y/dx²\`.
2. Khác **biến** lấy đạo hàm theo: một theo thời gian \`t\`, một theo \`x\`. Quan trọng khi \`y\` phụ thuộc nhiều biến.

</details>

### 📝 Tóm tắt mục 4

- Lagrange \`f'(x), f''(x)\`: gọn, dùng phổ biến.
- Leibniz \`dy/dx, d²y/dx²\`: nhấn mạnh biến lấy đạo hàm; "cư xử như" phân số.
- Cùng một khái niệm, chọn ký hiệu theo ngữ cảnh.

---

## 5. Khả vi & Liên tục

**Định lý**: Nếu f khả vi tại a (f'(a) tồn tại) thì f liên tục tại a.

**Chiều ngược KHÔNG đúng**: f liên tục không nhất thiết khả vi.

**Ví dụ**: f(x) = |x| liên tục tại 0 nhưng KHÔNG khả vi.
- lim trái: f'(0⁻) = -1.
- lim phải: f'(0⁺) = 1.
- Khác nhau → f'(0) không tồn tại (góc "nhọn" tại x=0).

💡 **Tóm tắt**:
- Khả vi ⟹ Liên tục.
- Liên tục ⇏ Khả vi (đồ thị có "góc nhọn").

⚠ **Cực đoan**: Hàm Weierstrass — liên tục mọi nơi nhưng không khả vi tại bất kỳ điểm nào!

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao khả vi LẠI kéo theo liên tục?"* Chứng minh từng bước: ta cần \`lim_{h→0} [f(a+h) − f(a)] = 0\` (định nghĩa liên tục). Viết \`f(a+h) − f(a) = ([f(a+h)−f(a)]/h) · h\`. Cho \`h → 0\`: thừa số đầu → \`f'(a)\` (hữu hạn vì khả vi), thừa số sau \`h → 0\`. Tích = \`f'(a) · 0 = 0\`. Vậy \`lim f(a+h) = f(a)\` → liên tục. (Mấu chốt: \`f'(a)\` hữu hạn nên không "kéo" tích đi đâu được.)
- *"Có hàm liên tục mà không khả vi tại nhiều điểm không?"* Có. \`|sin x|\` có góc nhọn tại mọi \`x = kπ\` — liên tục khắp nơi, không khả vi tại vô số điểm. Cực đoan hơn là hàm Weierstrass (không khả vi tại **mọi** điểm).

🔁 **Dừng lại tự kiểm tra**

1. \`f(x) = |x − 3|\`. Khả vi tại \`x = 3\` không? Tại \`x = 5\` không?
2. Một hàm khả vi tại \`a\` thì có chắc liên tục tại \`a\` không?

<details><summary>Đáp án</summary>

1. Tại \`x=3\`: **không** (góc nhọn, slope trái \`−1\` ≠ phải \`+1\`). Tại \`x=5\`: **có** (xa góc nhọn, \`f = x−3\`, \`f' = 1\`).
2. Chắc chắn có — theo định lý "khả vi ⟹ liên tục" (chứng minh ở trên).

</details>

### 📝 Tóm tắt mục 5

- **Khả vi ⟹ liên tục** (chứng minh: \`f(a+h)−f(a) = (tỉ số)·h → f'(a)·0 = 0\`).
- Chiều ngược **sai**: liên tục không kéo theo khả vi (góc nhọn \`|x|\` tại 0).
- Cực đoan: hàm Weierstrass liên tục mọi nơi nhưng không khả vi ở đâu cả.

---

## 6. Đạo hàm 1 bên

Tương tự giới hạn 1 bên:
\`\`\`
f'(a⁻) = lim_{h→0⁻} [f(a+h) - f(a)] / h
f'(a⁺) = lim_{h→0⁺} [f(a+h) - f(a)] / h
\`\`\`

f khả vi tại a ⟺ f'(a⁻) = f'(a⁺).

💡 **Trực giác**: giống giới hạn một bên cho hàm — slope nhìn từ bên trái và bên phải. Khả vi đòi hỏi hai slope này gặp nhau (đồ thị "trơn", không gấp khúc).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào cần tính đạo hàm một bên?"* Khi hàm chia khúc (đổi công thức qua \`a\`), có \`|·|\`, hoặc tại biên miền. Vd kiểm \`|x|\` khả vi tại 0: \`f'(0⁻) = −1\`, \`f'(0⁺) = +1\` → lệch → không khả vi.
- *"Đạo hàm một bên bằng nhau nhưng hàm gián đoạn — khả vi không?"* Không thể xảy ra: khả vi ⟹ liên tục, nên nếu gián đoạn thì đã không khả vi. Phải liên tục trước rồi mới xét hai slope.

⚠ **Lỗi thường gặp — chỉ so hai công thức đạo hàm mà quên kiểm liên tục**. Vd \`f(x) = x²\` nếu \`x<1\`, \`f(x) = 2x\` nếu \`x≥1\`: hai nhánh có \`f'\` lần lượt \`2x → 2\` và \`2\`, "bằng nhau", nhưng hàm **gián đoạn** tại 1 (\`1 ≠ 2\`) → KHÔNG khả vi. Phải kiểm liên tục tại \`a\` trước.

🔁 **Dừng lại tự kiểm tra**

1. \`f(x) = x²\` nếu \`x ≤ 1\`, \`f(x) = 2x − 1\` nếu \`x > 1\`. Khả vi tại \`x = 1\` không?
2. Đạo hàm một bên của \`f(x) = |x|\` tại 0 là gì?

<details><summary>Đáp án</summary>

1. Liên tục: trái \`1²=1\`, phải \`2−1=1\` ✓. Slope: trái \`2x|_{x=1}=2\`, phải \`2\`. Bằng nhau → **khả vi**, \`f'(1)=2\`.
2. \`f'(0⁻) = −1\`, \`f'(0⁺) = +1\` → lệch → không khả vi tại 0.

</details>

### 📝 Tóm tắt mục 6

- Đạo hàm một bên: \`f'(a⁻), f'(a⁺)\` = slope nhìn từ trái/phải.
- Khả vi tại \`a\` ⟺ **liên tục tại \`a\`** và \`f'(a⁻) = f'(a⁺)\`.
- Luôn kiểm liên tục trước; hai slope bằng nhau chưa đủ nếu hàm gián đoạn.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tính đạo hàm của f(x) = 3x² + 1 bằng định nghĩa.

**Bài 2**: Tính f'(x) của f(x) = cos x bằng định nghĩa.

**Bài 3**: Viết PT tiếp tuyến của y = x² tại điểm (3, 9).

**Bài 4**: f(x) = |x-2|. Hỏi f khả vi tại x = 2 không?

**Bài 5**: Vận tốc s(t) = 5t² (m, s). Tìm vận tốc tại t = 3.

### Lời giải

**Bài 1**: f(x+h) - f(x) = 3(x+h)² + 1 - 3x² - 1 = 6xh + 3h². → f' = lim (6x + 3h) = **6x**.

**Bài 2**: cos(x+h) - cos x = -2·sin(x+h/2)·sin(h/2). → f' = lim [-sin(x+h/2)·sin(h/2)/(h/2)] = **-sin x**.

**Bài 3**: f'(x) = 2x → f'(3) = 6. PT: y = 9 + 6(x-3) = **6x - 9**.

**Bài 4**: x < 2: f = -(x-2), f' = -1. x > 2: f = x-2, f' = 1. Khác → **không khả vi** tại x=2.

**Bài 5**: v(t) = s'(t) = 10t → v(3) = **30 m/s**.

---

## 8. Bài tiếp theo

[Lesson 04 — Quy tắc đạo hàm](../lesson-04-derivative-rules/).

## 📝 Tổng kết

1. **f'(x) = lim_{h→0} [f(x+h) - f(x)]/h** — slope tiếp tuyến = vận tốc tức thời.
2. PT tiếp tuyến tại (a, f(a)): **y = f(a) + f'(a)·(x - a)**.
3. **Khả vi ⟹ Liên tục**, không ngược.
4. Hàm |x| liên tục tại 0, **không khả vi** (góc nhọn).
5. Đạo hàm cơ bản: **(x²)' = 2x, (√x)' = 1/(2√x), (sin x)' = cos x, (1/x)' = -1/x²**.
`;
