// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/04-Calculus-1var/lesson-05-derivative-applications/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Ứng dụng đạo hàm

## Mục tiêu

- Tìm **cực trị** (max/min) của hàm số.
- Khảo sát **đồng/nghịch biến**, **lồi/lõm**, **điểm uốn**.
- Vẽ đồ thị hàm số có hệ thống.
- **Quy tắc l'Hôpital** cho giới hạn dạng 0/0, ∞/∞.
- Bài toán tối ưu thực tế.

## Kiến thức tiền đề

- [Lesson 04 — Quy tắc đạo hàm](../lesson-04-derivative-rules/).

---

## 1. Đồng / nghịch biến

**Định lý**: Cho f khả vi trên (a, b).
- f'(x) > 0 trên (a, b) → f **đồng biến** (tăng).
- f'(x) < 0 → f **nghịch biến** (giảm).
- f'(x) = 0 trên 1 khoảng → f hằng số.

💡 **Trực giác**: Slope dương = đồ thị đi lên, slope âm = đi xuống.

**Ví dụ**: f(x) = x³ - 3x.
- f'(x) = 3x² - 3 = 3(x²-1).
- f' = 0 tại x = ±1.
- x < -1: f' > 0 → đồng biến.
- -1 < x < 1: f' < 0 → nghịch biến.
- x > 1: f' > 0 → đồng biến.

❓ **Câu hỏi tự nhiên của người đọc**

- *"\`f'(x) > 0\` tại 1 điểm có đủ kết luận đồng biến không?"* Không — phải \`f' > 0\` trên cả **khoảng**. Tính đồng biến là tính chất của khoảng, không của một điểm. Vd \`f(x) = x³\` có \`f'(0) = 0\` nhưng vẫn đồng biến trên toàn ℝ (vì \`f' ≥ 0\` và chỉ bằng 0 tại một điểm rời rạc).
- *"\`f' = 0\` tại vài điểm rời thì còn đồng biến không?"* Vẫn có thể. \`x³\` đồng biến dù \`f'(0) = 0\`, vì \`f'\` không **đổi dấu** quanh đó. Đồng biến nghiêm ngặt cho phép \`f' = 0\` tại các điểm cô lập.

⚠ **Lỗi thường gặp — kết luận biến thiên chỉ từ dấu \`f'\` tại MỘT điểm**. \`f(x) = x³ − 3x\`: nhìn \`f'(0) = −3 < 0\` rồi nói "f giảm" là phiến diện — phải xét dấu \`f'\` trên từng khoảng \`(−∞,−1), (−1,1), (1,∞)\` mới đủ. Luôn lập bảng dấu, không thay một điểm.

🔁 **Dừng lại tự kiểm tra**

1. \`f(x) = x² − 4x\`. Khoảng đồng biến, nghịch biến?
2. \`f(x) = e^x\`. Đồng hay nghịch biến trên ℝ?

<details><summary>Đáp án</summary>

1. \`f'(x) = 2x − 4 = 0 → x = 2\`. \`x < 2\`: \`f' < 0\` (nghịch biến); \`x > 2\`: \`f' > 0\` (đồng biến).
2. \`f'(x) = e^x > 0\` với mọi \`x\` → **đồng biến** trên toàn ℝ.

</details>

### 📝 Tóm tắt mục 1

- \`f' > 0\` trên khoảng → đồng biến; \`f' < 0\` → nghịch biến; \`f' ≡ 0\` → hằng.
- Tính biến thiên là tính chất của **khoảng**, phải xét dấu \`f'\` trên từng khoảng (lập bảng).
- \`f' = 0\` tại điểm rời rạc không phá đồng/nghịch biến (vd \`x³\`).

---

## 2. Cực trị

**Định nghĩa**: f đạt **cực đại** tại x₀ nếu f(x₀) ≥ f(x) trong 1 lân cận nhỏ. **Cực tiểu** tương tự (≤).

**Điều kiện cần (Fermat)**: Nếu f khả vi và đạt cực trị tại x₀ ∈ (a, b), thì **f'(x₀) = 0**.

⚠ **Không phải ngược lại**: f'(x₀) = 0 chưa chắc cực trị. VD f(x) = x³, f'(0) = 0 nhưng không phải cực trị (điểm yên ngựa = saddle point).

### 2.1. Quy tắc bảng biến thiên

Xét dấu f'(x):
- f' đổi từ + sang - tại x₀ → **cực đại**.
- f' đổi từ - sang + tại x₀ → **cực tiểu**.
- f' không đổi dấu → không phải cực trị.

### 2.2. Quy tắc đạo hàm bậc 2

Nếu f'(x₀) = 0:
- f''(x₀) > 0 → **cực tiểu**.
- f''(x₀) < 0 → **cực đại**.
- f''(x₀) = 0 → chưa kết luận được.

**Ví dụ**: f(x) = x³ - 3x.
- f'(x) = 3x² - 3 = 0 → x = ±1.
- f''(x) = 6x.
- f''(1) = 6 > 0 → x = 1 **cực tiểu** (f(1) = -2).
- f''(-1) = -6 < 0 → x = -1 **cực đại** (f(-1) = 2).

> 📐 **Định nghĩa đầy đủ — Cực trị**
>
> **(a) Là gì**: 1 điểm x₀ mà f(x₀) lớn (hoặc nhỏ) hơn mọi f(x) gần đó. **Cực đại** = đỉnh "đồi" địa phương, **cực tiểu** = đáy "thung lũng" địa phương. KHÔNG bắt buộc là max/min toàn cục.
>
> **(b) Vì sao cần**: Mọi bài toán tối ưu hoá đều quy về tìm cực trị — kinh tế (tối đa lợi nhuận), kỹ thuật (giảm thiểu vật liệu), ML (giảm thiểu loss function). Fermat (~1637) phát hiện: tại cực trị, đạo hàm = 0 (slope tiếp tuyến nằm ngang) — đây là điều kiện CẦN dễ kiểm. Đạo hàm cấp 2 phân loại: lồi (f''>0) hay lõm (f''<0). Đây là cốt lõi của **gradient descent** trong AI.
>
> **(c) Ví dụ số**: f(x) = x² − 4x + 5. f'(x) = 2x − 4 = 0 → x = 2. f''(2) = 2 > 0 → **cực tiểu**. f(2) = 4 − 8 + 5 = 1. f(x) = x³: f'(0) = 0 nhưng KHÔNG cực trị (f đồng biến). Kiểm: f'(x) = 3x² ≥ 0 luôn, không đổi dấu → x=0 là điểm uốn nhưng không cực trị. f(x) = sin x: cực đại tại π/2 + k·2π, cực tiểu tại 3π/2 + k·2π. Tối ưu thực tế: chu vi 100m, S = a(50-a) → a=25 → S_max = 625m² (hình vuông).

❓ **Câu hỏi tự nhiên của người đọc**

- *"\`f' = 0\` thì luôn có cực trị?"* Không — đó chỉ là điều kiện **cần**. \`x³\` có \`f'(0) = 0\` nhưng không cực trị (điểm yên ngựa). Phải kiểm thêm: \`f'\` đổi dấu, hoặc dấu \`f''\`.
- *"Cực trị địa phương khác giá trị lớn nhất/nhỏ nhất toàn cục thế nào?"* Cực trị địa phương chỉ so với **lân cận**; max/min toàn cục so với **toàn miền**. Trên đoạn đóng \`[a,b]\`, max/min toàn cục nằm ở **cực trị địa phương HOẶC ở hai đầu mút** — phải kiểm cả mút.
- *"\`f''(x₀) = 0\` thì sao?"* Test đạo hàm bậc 2 thất bại, không kết luận được. Quay về xét dấu \`f'\` quanh \`x₀\`. Vd \`x⁴\` tại 0: \`f''(0) = 0\` nhưng vẫn là cực tiểu.

⚠ **Lỗi thường gặp — quên kiểm hai đầu mút khi tìm max/min trên \`[a,b]\`**. Tìm min của \`f(x) = x²\` trên \`[1, 3]\`: \`f'=0\` cho \`x=0\` **nằm ngoài** đoạn → bỏ; min thực ra tại mút \`x=1\` (\`f=1\`). Chỉ giải \`f'=0\` rồi quên mút sẽ ra kết quả sai.

🔁 **Dừng lại tự kiểm tra**

1. \`f(x) = x² − 6x + 1\`. Tìm cực trị (loại gì, giá trị).
2. \`f(x) = x⁴\`. \`f''(0) = 0\` — làm sao biết \`x=0\` là cực tiểu?

<details><summary>Đáp án</summary>

1. \`f' = 2x − 6 = 0 → x = 3\`; \`f''(3) = 2 > 0\` → **cực tiểu**; \`f(3) = 9 − 18 + 1 = −8\`.
2. Xét dấu \`f' = 4x³\`: \`x<0\` thì \`f'<0\` (giảm), \`x>0\` thì \`f'>0\` (tăng) → đổi \`−→+\` → **cực tiểu** tại 0.

</details>

### 📝 Tóm tắt mục 2

- Fermat: cực trị (trong khoảng mở) ⟹ \`f' = 0\` — điều kiện **cần**, không đủ.
- Phân loại: \`f'\` đổi \`+→−\` (cực đại), \`−→+\` (cực tiểu); hoặc \`f''>0\` (tiểu), \`f''<0\` (đại).
- Max/min trên \`[a,b]\`: kiểm cả điểm \`f'=0\` **lẫn hai mút**; \`f''=0\` thì quay về xét dấu \`f'\`.

---

## 3. Lồi / lõm & Điểm uốn

**Định nghĩa**:
- **Lồi (concave up)** trên (a, b): đồ thị nằm trên tiếp tuyến. f''(x) > 0.
- **Lõm (concave down)**: dưới tiếp tuyến. f''(x) < 0.
- **Điểm uốn**: chuyển giữa lồi/lõm. f''(x₀) = 0 và đổi dấu.

💡 **Mẹo hình ảnh**:
- Lồi (parabol mở lên): "có thể chứa nước" 🥣.
- Lõm: úp ngược.

**Ví dụ**: f(x) = x³ có f''(x) = 6x.
- x < 0: f'' < 0 → lõm.
- x > 0: f'' > 0 → lồi.
- **Điểm uốn**: x = 0.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Lồi/lõm khác đồng/nghịch biến chỗ nào?"* Đồng/nghịch biến (\`f'\`) nói đồ thị đi **lên hay xuống**. Lồi/lõm (\`f''\`) nói đồ thị **cong kiểu gì** (mở lên hay mở xuống). Một hàm có thể vừa tăng vừa lõm xuống (vd \`√x\`: tăng nhưng cong xuống).
- *"\`f''(x₀) = 0\` thì chắc chắn có điểm uốn?"* Không — \`f''\` phải **đổi dấu** mới là điểm uốn. \`f(x) = x⁴\` có \`f''(0) = 0\` nhưng \`f'' = 12x² ≥ 0\` không đổi dấu → KHÔNG phải điểm uốn (vẫn lồi hai phía).

⚠ **Lỗi thường gặp — gọi mọi nghiệm \`f''=0\` là điểm uốn**. Phản ví dụ \`x⁴\` ở trên: \`f''(0)=0\` nhưng không đổi dấu → không uốn. Điều kiện đủ: \`f''(x₀)=0\` **và** \`f''\` đổi dấu qua \`x₀\`.

🔁 **Dừng lại tự kiểm tra**

1. \`f(x) = x² \`. Lồi hay lõm? Có điểm uốn không?
2. \`f(x) = x³ − 3x\`. Tìm điểm uốn.

<details><summary>Đáp án</summary>

1. \`f'' = 2 > 0\` luôn → **lồi** mọi nơi; không đổi dấu → **không có** điểm uốn.
2. \`f'' = 6x = 0 → x = 0\`; \`f''\` đổi dấu \`−→+\` qua 0 → **điểm uốn tại \`(0, 0)\`**.

</details>

### 📝 Tóm tắt mục 3

- \`f'' > 0\` → lồi (mở lên, "chứa nước"); \`f'' < 0\` → lõm (mở xuống).
- Điểm uốn = nơi \`f''\` **đổi dấu** (không chỉ bằng 0).
- Lồi/lõm (\`f''\`) độc lập với tăng/giảm (\`f'\`); một hàm có thể tăng-mà-lõm.

---

## 4. Khảo sát đồ thị — Quy trình 7 bước

1. **Miền xác định**.
2. **Tính giới hạn** tại biên (∞, các điểm gián đoạn) → tiệm cận.
3. **f'(x)** → bảng biến thiên (đồng/nghịch biến, cực trị).
4. **f''(x)** → lồi/lõm, điểm uốn.
5. **Điểm đặc biệt**: cắt trục Ox, Oy.
6. **Bảng biến thiên** tổng hợp.
7. **Vẽ đồ thị**.

💡 **Trực giác**: quy trình gom mọi công cụ đã học thành một "checklist" — \`f'\` cho biến thiên + cực trị, \`f''\` cho lồi/lõm + uốn, giới hạn cho tiệm cận. Làm theo thứ tự thì đồ thị "tự lộ ra" mà không cần thử nhiều điểm.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Bỏ bước nào được không?"* Với hàm đơn giản (parabol) có thể tắt, nhưng với hàm hữu tỉ/có tiệm cận thì bước tính giới hạn ở biên là **bắt buộc** — nếu không sẽ vẽ sai dáng ở vô cực.
- *"Tiệm cận đứng tìm ở đâu?"* Ở các điểm hàm không xác định (mẫu \`=0\`) mà lim ra \`±∞\`. Tiệm cận ngang ở \`lim_{x→±∞} f\`.

⚠ **Lỗi thường gặp — quên xét miền xác định trước**. Khảo sát \`f(x) = ln x\` mà quên \`x > 0\` sẽ vẽ cả phần \`x < 0\` (không tồn tại). Bước 1 (miền xác định) phải làm **đầu tiên**, mọi bước sau chỉ xét trong miền.

🔁 **Dừng lại tự kiểm tra**

1. Hàm \`f(x) = 1/(x−1)\` có tiệm cận đứng và ngang ở đâu?
2. Bước nào trong 7 bước phát hiện cực trị?

<details><summary>Đáp án</summary>

1. Tiệm cận đứng \`x = 1\` (mẫu = 0, \`lim = ±∞\`); tiệm cận ngang \`y = 0\` (\`lim_{x→±∞} = 0\`).
2. Bước 3 — lập bảng biến thiên từ dấu \`f'(x)\`.

</details>

### 📝 Tóm tắt mục 4

- Quy trình 7 bước: miền XĐ → giới hạn/tiệm cận → \`f'\` (biến thiên) → \`f''\` (lồi/lõm) → điểm đặc biệt → bảng → vẽ.
- Miền xác định làm **đầu tiên**; tiệm cận từ giới hạn ở biên.
- Gom đủ thông tin \`f', f''\`, giới hạn thì dáng đồ thị tự hiện ra.

---

## 5. Quy tắc l'Hôpital — Cứu cánh cho 0/0 và ∞/∞

💡 **Trực giác**: gần điểm tới hạn, mỗi hàm xấp xỉ tuyến tính theo slope của nó: \`f ≈ f'·(x−a)\`, \`g ≈ g'·(x−a)\`. Tỉ số \`f/g ≈ f'/g'\` (phần \`(x−a)\` triệt tiêu). Vậy khi cả hai cùng về 0 (hay ∞), tỉ số được quyết định bởi **tốc độ** thay đổi — chính là đạo hàm.

🎯 **Phát biểu**: Nếu lim f(x)/g(x) dạng 0/0 hoặc ∞/∞, và f, g khả vi với g'(x) ≠ 0 trong lân cận, thì:
\`\`\`
lim f(x)/g(x) = lim f'(x)/g'(x)
\`\`\`

**Ví dụ 1**: lim_{x→0} sin x / x.
- Dạng 0/0.
- = lim cos x / 1 = cos 0 = **1**.

**Ví dụ 2**: lim_{x→∞} ln x / x.
- Dạng ∞/∞.
- = lim (1/x) / 1 = 0.

**Ví dụ 3** (áp dụng 2 lần): lim_{x→0} (1 - cos x) / x².
- Dạng 0/0. = lim sin x / 2x. Vẫn 0/0.
- = lim cos x / 2 = **1/2**.

⚠ **Không áp dụng nếu chưa phải 0/0 hoặc ∞/∞**. Kiểm tra trước. Phản ví dụ: \`lim_{x→0} (x+1)/(x+2)\` thay trực tiếp được \`= 1/2\` (dạng \`1/2\`, KHÔNG vô định). Nếu cứ "đạo hàm tử/mẫu" ra \`lim 1/1 = 1\` → **sai**. Luôn kiểm dạng trước khi dùng.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Đạo hàm tử/mẫu rồi vẫn \`0/0\` thì sao?"* Áp dụng tiếp (l'Hôpital nhiều lần). Vd \`(1−cos x)/x²\`: lần 1 → \`sin x/2x\` (vẫn \`0/0\`); lần 2 → \`cos x/2 → 1/2\`.
- *"\`l'Hôpital\` có phải đạo hàm thương \`(f/g)'\`?"* KHÔNG. Đây là \`f'/g'\` (đạo hàm riêng tử và mẫu rồi chia), không phải quy tắc thương \`(f'g−fg')/g²\`. Lẫn hai cái là lỗi rất phổ biến.
- *"Dạng \`0·∞\` hay \`∞−∞\` dùng được không?"* Phải **biến đổi về \`0/0\` hoặc \`∞/∞\`** trước. Vd \`x·ln x\` (\`0·∞\` khi \`x→0⁺\`) → viết \`ln x/(1/x)\` (dạng \`∞/∞\`) rồi l'Hôpital.

🔁 **Dừng lại tự kiểm tra**

1. \`lim_{x→0} (e^x − 1 − x)/x² = ?\`
2. Có được dùng l'Hôpital cho \`lim_{x→1} (x²+1)/(x+3)\` không?

<details><summary>Đáp án</summary>

1. \`0/0\` → \`(e^x − 1)/2x\` (vẫn \`0/0\`) → \`e^x/2 → 1/2\`.
2. **Không** — thay trực tiếp ra \`2/4 = 1/2\`, không phải vô định. Dùng l'Hôpital ở đây sẽ sai.

</details>

### 📝 Tóm tắt mục 5

- l'Hôpital: chỉ dạng \`0/0\` hoặc \`∞/∞\` → \`lim f/g = lim f'/g'\` (đạo hàm **riêng** tử, mẫu).
- Có thể áp **nhiều lần** nếu vẫn vô định; dạng \`0·∞\`, \`∞−∞\` phải biến đổi về phân số trước.
- KHÔNG nhầm với quy tắc thương; KHÔNG dùng khi chưa phải dạng vô định.

---

## 6. Bài toán tối ưu (Optimization)

**Mẫu câu hỏi**: Tìm cách làm sao để tối đa/tối thiểu một đại lượng.

### Ví dụ kinh điển: Hộp lớn nhất

Cho tấm giấy 12×12 cm. Cắt 4 góc vuông cạnh x, gấp lại thành hộp không nắp. Tìm x để thể tích lớn nhất.

**Giải**:
- V(x) = x·(12-2x)²  với 0 < x < 6.
- V'(x) = (12-2x)² + x·2·(12-2x)·(-2) = (12-2x)·[(12-2x) - 4x] = (12-2x)·(12-6x).
- V' = 0 → x = 6 (loại, biên) hoặc x = 2.
- V''(2) < 0 → cực đại.
- → **x = 2 cm, V_max = 2·8² = 128 cm³**.

💡 **Trực giác — quy trình tối ưu**: (1) gọi tên đại lượng cần tối ưu và biến tự do, (2) viết đại lượng đó thành hàm 1 biến (dùng ràng buộc để khử biến thừa), (3) tìm miền hợp lệ của biến, (4) giải \`f'=0\`, (5) kiểm cực trị bằng \`f''\` hoặc xét dấu, (6) **kiểm cả biên miền**.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao loại \`x = 6\` ở ví dụ hộp?"* Vì miền hợp lệ là \`0 < x < 6\` (cắt góc cạnh \`x\`, không thể \`≥ 6\` vì tấm chỉ \`12\`). \`x = 6\` cho \`V = 0\` (hộp dẹp) — biên, không phải cực đại.
- *"Làm sao biết nghiệm \`f'=0\` là max chứ không phải min?"* Kiểm \`f''\` (vd \`V''(2) < 0\` → cực đại) hoặc so giá trị với hai biên. Đừng giả định nghiệm duy nhất là max.

⚠ **Lỗi thường gặp — quên ràng buộc miền của biến**. Tối ưu mà để biến chạy tự do vô hạn dễ ra nghiệm vô lý (cạnh âm, kích thước lớn hơn vật liệu). Luôn xác định miền hợp lệ (vd \`0 < x < 6\`) **trước** khi tìm cực trị.

🔁 **Dừng lại tự kiểm tra**

1. Chu vi hình chữ nhật \`= 20\`. Diện tích lớn nhất là bao nhiêu, đạt khi nào?
2. Trong bài hộp, vì sao \`V(2)\` lớn hơn \`V\` tại hai biên \`x→0\` và \`x→6\`?

<details><summary>Đáp án</summary>

1. \`2a+2b=20 → b=10−a\`, \`S=a(10−a)\`, \`S'=10−2a=0 → a=5\`, \`S=25\` (hình vuông cạnh 5).
2. \`V(0)=0\` (chưa gấp), \`V(6)=0\` (hộp dẹp), \`V(2)=128 > 0\` → cực đại nằm trong khoảng, lớn hơn cả hai biên.

</details>

### 📝 Tóm tắt mục 6

- Quy trình: viết đại lượng cần tối ưu thành hàm 1 biến (dùng ràng buộc), xác định **miền**, giải \`f'=0\`, kiểm \`f''\`/biên.
- Luôn xác định **miền hợp lệ** của biến trước, loại nghiệm vô lý/biên.
- Nghiệm \`f'=0\` chưa chắc là max — phải kiểm cực trị và so với biên.

---

## 7. Bài tập

### Bài tập

**Bài 1**: Tìm cực trị f(x) = x³ - 6x² + 9x.

**Bài 2**: Khảo sát đồng/nghịch biến f(x) = x⁴ - 4x².

**Bài 3**: Tính lim_{x→0} (e^x - 1)/x.

**Bài 4**: Tìm điểm uốn của f(x) = x³ - 3x² + 2.

**Bài 5**: Một mảnh đất chữ nhật cần chu vi 100 m. Diện tích lớn nhất bao nhiêu?

### Lời giải

**Bài 1**: f'(x) = 3x² - 12x + 9 = 3(x-1)(x-3). f'=0 → x=1, 3.  
- f''(x) = 6x - 12. f''(1) = -6 → CĐ. f(1) = 4. f''(3) = 6 → CT. f(3) = 0.  
→ **CĐ (1, 4); CT (3, 0)**.

**Bài 2**: f'(x) = 4x³ - 8x = 4x(x²-2). f'=0 → x=0, ±√2.  
- x < -√2: f' < 0 → giảm.  
- -√2 < x < 0: f' > 0 → tăng.  
- 0 < x < √2: f' < 0 → giảm.  
- x > √2: f' > 0 → tăng.

**Bài 3**: 0/0, l'Hôpital: lim e^x / 1 = **1**.

**Bài 4**: f''(x) = 6x - 6. f''=0 → x = 1. f(1) = 0 → **điểm uốn (1, 0)**.

**Bài 5**: 2a + 2b = 100 → b = 50 - a. S(a) = a·(50-a) = 50a - a². S'(a) = 50 - 2a = 0 → a = 25. S = 25·25 = **625 m²** (hình vuông).

---

## 8. Bài tiếp theo

[Lesson 06 — Nguyên hàm](../lesson-06-antiderivatives/).

## 📝 Tổng kết

1. **f' > 0 → tăng, f' < 0 → giảm**.
2. **Cực trị**: f' đổi dấu (hoặc f''>0/<0).
3. **Lồi/lõm**: f''. Điểm uốn = f'' đổi dấu.
4. **l'Hôpital**: 0/0 hoặc ∞/∞ → tính lim f'/g'.
5. **Tối ưu**: viết f(x), giải f'=0, kiểm tra max/min bằng f''.
`;
