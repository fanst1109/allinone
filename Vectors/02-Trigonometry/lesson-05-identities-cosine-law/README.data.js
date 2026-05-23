// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Vectors/02-Trigonometry/lesson-05-identities-cosine-law/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Identity và định lý cosin

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **identity** là gì, khác **phương trình** ở điểm nào — và vì sao identity quan trọng (biến đổi biểu thức mà không thay đổi giá trị).
- Thuộc và **dùng được** ba nhóm identity cốt lõi:
  - **Pythagorean**: \`sin²θ + cos²θ = 1\` và hai biến thể.
  - **Sum & Difference**: \`sin(α ± β)\`, \`cos(α ± β)\`, \`tan(α ± β)\`.
  - **Double / Triple / Power-Reduction**: \`sin 2θ\`, \`cos 2θ\`, \`sin²θ = (1−cos 2θ)/2\`...
- Phát biểu và **chứng minh** **định lý cosin**: \`c² = a² + b² − 2ab cos C\` — tổng quát của Pythagoras.
- Áp dụng định lý cosin để **chứng minh công thức \`u · v = |u| |v| cos θ\`** — công thức xương sống của **cosine similarity** dùng ở Tầng 4 (Linear Algebra) và Tầng 6 (vector search, RAG, embedding).
- Tính được **cosine similarity** giữa 2 vector n chiều bằng tay và bằng Go.

> **Ghi nhớ chính của cả bài**: định lý cosin là **cầu nối** giữa hình học (góc trong tam giác) và đại số (dot product của vector). Mọi metric "đo độ giống nhau" trong AI (cosine similarity, attention score chuẩn hóa, similarity search) đều quay về **một dòng** xuất phát từ định lý cosin: \`u · v = |u| |v| cos θ\`.

## Kiến thức tiền đề

- [Lesson 03 — Đường tròn đơn vị](../lesson-03-unit-circle/): biết \`(cos θ, sin θ)\` là tọa độ trên đường tròn bán kính 1, hiểu công thức quy gọn theo quadrant.
- [Lesson 02 — Tam giác vuông](../lesson-02-right-triangle/): định lý Pythagoras \`a² + b² = c²\` cho tam giác vuông, identity \`sin²θ + cos²θ = 1\`.
- [Lesson 01 — Góc](../lesson-01-angles/): biết chuyển đổi độ ↔ radian.
- Đại số Tầng 1, đặc biệt [Lesson 04 — Lũy thừa, căn, log](../../01-Algebra/lesson-04-powers-roots-logs/) (biết khai triển \`(a+b)²\`, dùng \`√\`).

---

## 1. Identity — định nghĩa và phân biệt với phương trình

### 1.1. Identity là gì?

💡 **Trực giác**: một **identity** là phát biểu *"hai cách viết khác nhau nhưng cho ra cùng một giá trị, **với mọi** giá trị của biến"*. Một **phương trình** thì khác: nó chỉ đúng với một (hoặc vài) giá trị cụ thể của biến.

**Ví dụ phân biệt cụ thể**:

| Biểu thức | Loại | Vì sao |
|-----------|------|--------|
| \`(x + 1)² = x² + 2x + 1\` | **Identity** | Đúng với **mọi** \`x\` (tự thử \`x = 0, 1, 2, −3, 0.5, ...\`). |
| \`2x = 6\` | **Phương trình** | Chỉ đúng khi \`x = 3\`. Thử \`x = 1\` → \`2 ≠ 6\`. |
| \`x² − 1 = (x−1)(x+1)\` | **Identity** | Đúng với mọi \`x\`. Đây là hằng đẳng thức. |
| \`x² = 4\` | **Phương trình** | Chỉ đúng khi \`x = 2\` hoặc \`x = −2\`. |
| \`sin²θ + cos²θ = 1\` | **Identity** | Đúng với **mọi** góc \`θ\`. |
| \`sin θ = 1/2\` | **Phương trình lượng giác** | Chỉ đúng khi \`θ = 30°, 150°, 30°+360°, ...\`. |

**Ký hiệu**: để nhấn mạnh đây là identity (đúng với mọi biến), nhiều sách dùng ký hiệu \`≡\` (đồng nhất) thay cho \`=\`. Trong tài liệu này dùng \`=\` cho cả hai, nhưng bạn cần **đọc ngữ cảnh** để biết đang xét identity hay phương trình.

### 1.2. Vì sao identity hữu ích?

💡 **Trực giác**: identity là **công cụ biến đổi**. Nếu biết \`sin²θ + cos²θ = 1\`, ta có thể đổi mọi \`cos²θ\` thành \`1 − sin²θ\` mà giá trị biểu thức **không đổi**. Đây là "công cụ thay đồ" cho biểu thức — dùng để:

- **Đơn giản hóa** biểu thức phức tạp.
- **Chứng minh** đẳng thức khác.
- **Giải phương trình lượng giác**.
- **Tính tích phân** (Tầng 3): vd \`∫ sin²x dx\` cần hạ bậc trước.

**Ví dụ minh họa nhanh**: rút gọn \`sin²θ · (1 + cot²θ)\`.

\`\`\`
sin²θ · (1 + cot²θ)
= sin²θ · csc²θ              (vì 1 + cot²θ = csc²θ — identity Pythagorean biến thể)
= sin²θ · (1/sin²θ)          (định nghĩa csc = 1/sin)
= 1                          ✓
\`\`\`

Một biểu thức nhìn rối, dùng identity 2-3 bước ra \`1\`. Đó là sức mạnh của identity.

⚠ **Lỗi thường gặp**: nhầm identity với phương trình. Khi đọc \`sin²θ + cos²θ = 1\`, đừng nghĩ *"giải tìm θ"* — không cần giải gì cả, nó **luôn đúng**. Còn \`sin θ = 1/2\` thì mới có nghĩa "giải tìm θ".

🔁 **Dừng lại tự kiểm tra**: phát biểu nào sau đây là identity?
1. \`(x − y)² = x² − 2xy + y²\`
2. \`tan θ = 1\`
3. \`2 sin θ cos θ = sin 2θ\`

<details>
<summary>Đáp án</summary>

1. Identity (đúng với mọi \`x, y\`).
2. Phương trình (chỉ đúng khi \`θ = 45° + k·180°\`).
3. Identity (đúng với mọi \`θ\`). Đây là công thức nhân đôi, sẽ học ở Mục 5.

</details>

### 📝 Tóm tắt Mục 1

- **Identity**: đúng với **mọi** giá trị của biến. Dùng làm công cụ biến đổi.
- **Phương trình**: chỉ đúng với một số giá trị cụ thể của biến. Mục tiêu là giải tìm các giá trị đó.
- Identity là "kim chỉ nam" để rút gọn, chứng minh, tính tích phân.

---

## 2. Pythagorean identities (mở rộng)

### 2.1. Identity gốc

💡 **Trực giác**: trên đường tròn đơn vị, điểm \`P = (cos θ, sin θ)\` có khoảng cách tới gốc bằng \`1\`. Pythagoras: \`(cos θ)² + (sin θ)² = 1²\`. Đây là identity Pythagorean gốc — đúng với **mọi** góc \`θ\`, kể cả góc tù, góc âm, góc lớn hơn 360°.

\`\`\`
┌─────────────────────────────────┐
│  sin²θ + cos²θ = 1              │   (★ gốc)
└─────────────────────────────────┘
\`\`\`

**Walk-through verify với 4 góc cụ thể**:

| \`θ\` | \`sin θ\` | \`cos θ\` | \`sin²θ\` | \`cos²θ\` | Tổng |
|-----|---------|---------|---------|---------|------|
| \`0°\` | \`0\` | \`1\` | \`0\` | \`1\` | \`0 + 1 = 1\` ✓ |
| \`30°\` | \`1/2\` | \`√3/2\` | \`1/4\` | \`3/4\` | \`1/4 + 3/4 = 1\` ✓ |
| \`45°\` | \`√2/2\` | \`√2/2\` | \`1/2\` | \`1/2\` | \`1/2 + 1/2 = 1\` ✓ |
| \`60°\` | \`√3/2\` | \`1/2\` | \`3/4\` | \`1/4\` | \`3/4 + 1/4 = 1\` ✓ |
| \`90°\` | \`1\` | \`0\` | \`1\` | \`0\` | \`1 + 0 = 1\` ✓ |
| \`120°\` | \`√3/2\` | \`−1/2\` | \`3/4\` | \`1/4\` | \`3/4 + 1/4 = 1\` ✓ |
| \`210°\` | \`−1/2\` | \`−√3/2\` | \`1/4\` | \`3/4\` | \`1/4 + 3/4 = 1\` ✓ |

Cứ thế cho mọi góc — luôn ra \`1\`.

### 2.2. Hai biến thể: chia 2 vế

💡 **Trực giác**: nếu chia cả 2 vế của \`sin²θ + cos²θ = 1\` cho \`cos²θ\` thì tất cả các số hạng đều chia cho \`cos²θ\`. Ta được identity mới chứa \`tan\` và \`sec\`.

**Biến thể A — chia cho \`cos²θ\`** (yêu cầu \`cos θ ≠ 0\`):

\`\`\`
sin²θ / cos²θ + cos²θ / cos²θ = 1 / cos²θ
        ↓                    ↓        ↓
      tan²θ                  1       sec²θ        (vì sec θ ≡ 1/cos θ)

⇒  tan²θ + 1 = sec²θ
\`\`\`

\`\`\`
┌─────────────────────────────────┐
│  1 + tan²θ = sec²θ              │   (★ biến thể A)
└─────────────────────────────────┘
\`\`\`

**Biến thể B — chia cho \`sin²θ\`** (yêu cầu \`sin θ ≠ 0\`):

\`\`\`
sin²θ / sin²θ + cos²θ / sin²θ = 1 / sin²θ
        ↓                    ↓        ↓
        1                  cot²θ    csc²θ        (vì csc θ ≡ 1/sin θ)

⇒  1 + cot²θ = csc²θ
\`\`\`

\`\`\`
┌─────────────────────────────────┐
│  1 + cot²θ = csc²θ              │   (★ biến thể B)
└─────────────────────────────────┘
\`\`\`

**Bảng tổng kết hàm nghịch đảo** (nhắc lại từ Lesson 02):

| Tên | Định nghĩa | Đọc là |
|-----|------------|--------|
| \`sec θ\` | \`1 / cos θ\` | secant |
| \`csc θ\` | \`1 / sin θ\` | cosecant |
| \`cot θ\` | \`cos θ / sin θ = 1 / tan θ\` | cotangent |

### 2.3. Verify biến thể với góc cụ thể

**Verify \`1 + tan²θ = sec²θ\` với \`θ = 60°\`**:
- \`tan 60° = √3\`, nên \`tan²60° = 3\`. Vế trái: \`1 + 3 = 4\`.
- \`cos 60° = 1/2\`, \`sec 60° = 1/(1/2) = 2\`, \`sec²60° = 4\`. Vế phải: \`4\`.
- \`4 = 4\` ✓

**Verify \`1 + tan²θ = sec²θ\` với \`θ = 30°\`**:
- \`tan 30° = 1/√3\`, \`tan²30° = 1/3\`. Vế trái: \`1 + 1/3 = 4/3\`.
- \`cos 30° = √3/2\`, \`sec 30° = 2/√3\`, \`sec²30° = 4/3\`. Vế phải: \`4/3\`.
- \`4/3 = 4/3\` ✓

**Verify \`1 + cot²θ = csc²θ\` với \`θ = 45°\`**:
- \`cot 45° = 1\`, \`cot²45° = 1\`. Vế trái: \`1 + 1 = 2\`.
- \`sin 45° = √2/2\`, \`csc 45° = 2/√2 = √2\`, \`csc²45° = 2\`. Vế phải: \`2\`.
- \`2 = 2\` ✓

**Verify \`1 + cot²θ = csc²θ\` với \`θ = 60°\`**:
- \`cot 60° = 1/√3\`, \`cot²60° = 1/3\`. Vế trái: \`1 + 1/3 = 4/3\`.
- \`sin 60° = √3/2\`, \`csc 60° = 2/√3\`, \`csc²60° = 4/3\`. Vế phải: \`4/3\`.
- \`4/3 = 4/3\` ✓

### 2.4. Khi nào dùng?

❓ **Câu hỏi tự nhiên**: *"Học 3 identity Pythagorean để làm gì? Cứ nhớ một cái gốc là đủ rồi?"*

Đúng — về mặt logic chỉ cần biết \`sin²θ + cos²θ = 1\`, hai cái kia suy ra được. Nhưng trong tính toán thực tế, bạn sẽ gặp biểu thức chứa \`tan, sec, cot, csc\` rất nhiều (vd trong tích phân, vật lý), và việc "thấy ngay" \`1 + tan²θ\` có thể đổi thành \`sec²θ\` sẽ giúp bạn rút gọn nhanh. Học thuộc cả 3 là khoản đầu tư xứng đáng.

⚠ **Lỗi thường gặp**: viết \`sin²θ + cos²θ = 1\` rồi cho rằng \`sin θ + cos θ = 1\` — **sai hoàn toàn**. Ví dụ phản chứng: với \`θ = 45°\`, \`sin 45° + cos 45° = √2/2 + √2/2 = √2 ≈ 1.414\`, không bằng \`1\`. **Bình phương không phân phối qua cộng**.

🔁 **Dừng lại tự kiểm tra**:
1. Cho \`cos θ = 0.6\`, tính \`sin θ\` (giả sử \`θ\` ở quadrant I).
2. Cho \`tan θ = 3/4\` (\`θ\` quadrant I). Tính \`sec θ\`.

<details>
<summary>Đáp án</summary>

1. \`sin²θ = 1 − cos²θ = 1 − 0.36 = 0.64 → sin θ = 0.8\` (chọn dấu dương vì quadrant I).
2. \`sec²θ = 1 + tan²θ = 1 + 9/16 = 25/16 → sec θ = 5/4\` (dương vì quadrant I).

</details>

### 📝 Tóm tắt Mục 2

- \`sin²θ + cos²θ = 1\` — identity gốc, đúng cho mọi \`θ\`.
- Chia 2 vế cho \`cos²θ\` → \`1 + tan²θ = sec²θ\`.
- Chia 2 vế cho \`sin²θ\` → \`1 + cot²θ = csc²θ\`.
- Dùng để rút gọn biểu thức trộn nhiều hàm lượng giác.

---

## 3. Công thức cộng góc (Sum & Difference Formulas)

### 3.1. Phát biểu

💡 **Trực giác trước**: nếu biết \`sin α\`, \`cos α\`, \`sin β\`, \`cos β\` (các giá trị ở góc đơn), thì *có thể tính được* \`sin(α + β)\` mà không cần phải đo trực tiếp. Đây là **bộ công thức cộng**.

\`\`\`
┌──────────────────────────────────────────────────────────────┐
│  sin(α + β) = sin α · cos β + cos α · sin β                  │
│  sin(α − β) = sin α · cos β − cos α · sin β                  │
│                                                              │
│  cos(α + β) = cos α · cos β − sin α · sin β                  │
│  cos(α − β) = cos α · cos β + sin α · sin β                  │
│                                                              │
│  tan(α + β) = (tan α + tan β) / (1 − tan α · tan β)          │
│  tan(α − β) = (tan α − tan β) / (1 + tan α · tan β)          │
└──────────────────────────────────────────────────────────────┘
\`\`\`

### 3.2. Mnemonic — học thuộc trong 30 giây

💡 **Mẹo nhớ dấu**:

- **\`sin\` có DẤU GIỐNG**: \`sin(α + β)\` dùng dấu \`+\`, \`sin(α − β)\` dùng dấu \`−\`.
- **\`cos\` có DẤU NGƯỢC**: \`cos(α + β)\` dùng dấu \`−\`, \`cos(α − β)\` dùng dấu \`+\`.
- **\`tan\` thì mẫu số ngược lại với tử**: tử \`+\` thì mẫu \`−\`, tử \`−\` thì mẫu \`+\`.

**Mẹo nhớ thứ tự \`sin\`**: "sin-cos cos-sin" — vế phải của \`sin(α±β)\` là \`sin α cos β ± cos α sin β\` (xen kẽ).

**Mẹo nhớ thứ tự \`cos\`**: "cos-cos sin-sin" — vế phải của \`cos(α±β)\` là \`cos α cos β ∓ sin α sin β\` (đôi một).

### 3.3. Chứng minh \`cos(α − β)\` bằng đường tròn đơn vị + định lý cosin

⚠ Để chứng minh đầy đủ ta cần **định lý cosin** ở Mục 8. Vì 2 phần đan xen, ta nói trước **kết quả định lý cosin**: cho tam giác có 3 cạnh \`a, b, c\` và \`C\` là góc đối diện cạnh \`c\`, thì \`c² = a² + b² − 2ab cos C\`. Chứng minh chi tiết ở Mục 8. Bây giờ chỉ **dùng** kết quả đó.

**Setup**: trên đường tròn đơn vị, đặt:
- \`A = (cos α, sin α)\` — điểm ở góc \`α\`.
- \`B = (cos β, sin β)\` — điểm ở góc \`β\`.
- Gốc \`O = (0, 0)\`.

Khi đó tam giác \`OAB\` có:
- \`OA = 1\`, \`OB = 1\` (bán kính đường tròn đơn vị).
- Góc \`∠AOB = α − β\` (giả sử \`α > β\`).

**Bước 1 — tính \`|AB|²\` bằng tọa độ** (công thức khoảng cách):
\`\`\`
|AB|² = (cos α − cos β)² + (sin α − sin β)²
      = cos²α − 2 cos α cos β + cos²β + sin²α − 2 sin α sin β + sin²β
      = (cos²α + sin²α) + (cos²β + sin²β) − 2(cos α cos β + sin α sin β)
      = 1 + 1 − 2(cos α cos β + sin α sin β)
      = 2 − 2(cos α cos β + sin α sin β)
\`\`\`

**Bước 2 — tính \`|AB|²\` bằng định lý cosin** trong tam giác \`OAB\`:
\`\`\`
|AB|² = OA² + OB² − 2 · OA · OB · cos(∠AOB)
      = 1² + 1² − 2 · 1 · 1 · cos(α − β)
      = 2 − 2 cos(α − β)
\`\`\`

**Bước 3 — so sánh hai vế** (cùng tính \`|AB|²\` theo 2 cách):
\`\`\`
2 − 2 cos(α − β) = 2 − 2(cos α cos β + sin α sin β)
\`\`\`
Rút gọn:
\`\`\`
cos(α − β) = cos α cos β + sin α sin β        ✓ (đpcm)
\`\`\`

### 3.4. Suy ra các công thức còn lại

Từ \`cos(α − β) = cos α cos β + sin α sin β\`, ta suy ra hết:

**(a) \`cos(α + β)\`**: thay \`β\` bằng \`−β\`:
\`\`\`
cos(α − (−β)) = cos α cos(−β) + sin α sin(−β)
cos(α + β)    = cos α cos β   + sin α · (−sin β)
              = cos α cos β − sin α sin β      ✓
\`\`\`
(Dùng \`cos(−β) = cos β\` và \`sin(−β) = −sin β\` từ Lesson 03.)

**(b) \`sin(α + β)\`**: dùng identity \`sin x = cos(90° − x)\`:
\`\`\`
sin(α + β) = cos(90° − (α + β)) = cos((90° − α) − β)
           = cos(90° − α) cos β + sin(90° − α) sin β
           = sin α · cos β + cos α · sin β     ✓
\`\`\`
(Dùng \`cos(90° − α) = sin α\` và \`sin(90° − α) = cos α\`.)

**(c) \`sin(α − β)\`**: thay \`β\` bằng \`−β\`:
\`\`\`
sin(α + (−β)) = sin α cos(−β) + cos α sin(−β)
sin(α − β)    = sin α cos β + cos α (−sin β)
              = sin α cos β − cos α sin β      ✓
\`\`\`

**(d) \`tan(α + β)\`**: chia tử và mẫu cho \`cos α cos β\`:
\`\`\`
tan(α + β) = sin(α + β) / cos(α + β)
           = (sin α cos β + cos α sin β) / (cos α cos β − sin α sin β)
\`\`\`
Chia tử và mẫu cho \`cos α cos β\`:
\`\`\`
= (sin α / cos α + sin β / cos β) / (1 − sin α sin β / (cos α cos β))
= (tan α + tan β) / (1 − tan α · tan β)        ✓
\`\`\`

### 3.5. Walk-through tính \`sin 75°\` bằng công thức cộng

\`75° = 45° + 30°\`. Dùng công thức \`sin(α + β) = sin α cos β + cos α sin β\`:

\`\`\`
sin 75° = sin(45° + 30°)
        = sin 45° · cos 30° + cos 45° · sin 30°
        = (√2/2)(√3/2) + (√2/2)(1/2)
        = √6/4 + √2/4
        = (√6 + √2) / 4
\`\`\`

Số gần đúng: \`√6 ≈ 2.449\`, \`√2 ≈ 1.414\`, tổng \`≈ 3.863\`, chia 4 ≈ \`0.966\`.

**Kiểm chứng bằng máy tính**: \`sin 75° ≈ 0.9659\` ✓.

### 3.6. Walk-through thêm 4 ví dụ

**Ví dụ A — \`cos 75°\`**: dùng \`cos(α + β) = cos α cos β − sin α sin β\`:
\`\`\`
cos 75° = cos(45° + 30°)
        = cos 45° cos 30° − sin 45° sin 30°
        = (√2/2)(√3/2) − (√2/2)(1/2)
        = √6/4 − √2/4
        = (√6 − √2) / 4
        ≈ (2.449 − 1.414) / 4
        ≈ 0.2588
\`\`\`
Kiểm: \`cos 75° ≈ 0.2588\` ✓.

**Ví dụ B — \`sin 15°\`**: \`15° = 45° − 30°\`. Dùng \`sin(α − β)\`:
\`\`\`
sin 15° = sin(45° − 30°)
        = sin 45° cos 30° − cos 45° sin 30°
        = (√2/2)(√3/2) − (√2/2)(1/2)
        = (√6 − √2) / 4
        ≈ 0.2588
\`\`\`
Lưu ý đẹp: \`sin 15° = cos 75°\` (vì \`15° + 75° = 90°\` — hàm bù).

**Ví dụ C — \`cos 15°\`**:
\`\`\`
cos 15° = cos(45° − 30°) = cos 45° cos 30° + sin 45° sin 30°
        = (√2/2)(√3/2) + (√2/2)(1/2)
        = (√6 + √2) / 4
        ≈ 0.9659
\`\`\`
Tức \`cos 15° = sin 75°\`.

**Ví dụ D — \`tan 105°\`**: \`105° = 60° + 45°\`. Dùng \`tan(α + β)\`:
\`\`\`
tan 60° = √3, tan 45° = 1

tan 105° = (√3 + 1) / (1 − √3 · 1)
         = (√3 + 1) / (1 − √3)

Nhân tử mẫu với (1 + √3):
         = (√3 + 1)(1 + √3) / ((1 − √3)(1 + √3))
         = (√3 + 3 + 1 + √3) / (1 − 3)
         = (4 + 2√3) / (−2)
         = −(2 + √3)
         ≈ −3.732
\`\`\`
Kiểm: \`tan 105° ≈ −3.732\` ✓.

**Ví dụ E — \`sin(α + β)\` khi \`sin α = 3/5\`, \`cos α = 4/5\`, \`sin β = 5/13\`, \`cos β = 12/13\`** (hai tam giác Pythagorean phổ biến):
\`\`\`
sin(α + β) = sin α cos β + cos α sin β
           = (3/5)(12/13) + (4/5)(5/13)
           = 36/65 + 20/65
           = 56/65
           ≈ 0.8615
\`\`\`

❓ **Câu hỏi tự nhiên**: *"Tính giá trị các góc đặc biệt như \`75°, 15°, 105°\` để làm gì? Đời thật ai cũng dùng máy tính rồi."*

Hai lý do:
1. Trong **chứng minh** và **giải tích biểu thức** (vd tích phân, giới hạn), giữ dạng **đại số chính xác** quan trọng hơn số gần đúng. \`(√6 + √2)/4\` đẹp hơn \`0.9659...\` vì còn cộng/trừ/nhân với các biểu thức khác mà không tích lũy sai số.
2. Bạn xây dựng được **trực giác** về quan hệ giữa các góc — vd \`sin 15° = cos 75°\`, hay tại sao \`sin(α+β) ≠ sin α + sin β\`. Trực giác này dùng đến khi đọc paper, viết code low-level.

⚠ **Lỗi thường gặp**: viết \`sin(α + β) = sin α + sin β\` — **SAI**. Ví dụ phản chứng: \`sin(30° + 60°) = sin 90° = 1\`, còn \`sin 30° + sin 60° = 1/2 + √3/2 ≈ 1.366\`. **\`sin\` không phân phối qua cộng**. Đây là sai lầm phổ biến nhất, kiểm tra mỗi khi bạn viết công thức.

🔁 **Dừng lại tự kiểm tra**:
1. Tính \`cos 105°\` bằng công thức cộng.
2. Cho \`sin α = 4/5, cos α = 3/5, sin β = 5/13, cos β = 12/13\`. Tính \`cos(α − β)\`.

<details>
<summary>Đáp án</summary>

1. \`cos 105° = cos(60° + 45°) = cos 60° cos 45° − sin 60° sin 45° = (1/2)(√2/2) − (√3/2)(√2/2) = (√2 − √6)/4 ≈ −0.2588\`. (Âm vì \`105°\` ở quadrant II.)
2. \`cos(α − β) = cos α cos β + sin α sin β = (3/5)(12/13) + (4/5)(5/13) = 36/65 + 20/65 = 56/65 ≈ 0.862\`.

</details>

### 📝 Tóm tắt Mục 3

- 6 công thức cộng/hiệu là **bộ công cụ chính** của lượng giác.
- Nhớ mnemonic: sin DẤU GIỐNG, cos DẤU NGƯỢC.
- Suy ra hết từ \`cos(α − β)\` — và \`cos(α − β)\` chứng minh được bằng định lý cosin trên đường tròn đơn vị.
- **Lỗi cấm**: \`sin(α + β) ≠ sin α + sin β\`. Luôn nhớ \`sin\` không tuyến tính.

---

## 4. Công thức nhân đôi (Double Angle)

### 4.1. Phát biểu và chứng minh

💡 **Trực giác**: nếu \`α = β\` trong công thức cộng, ta được công thức cho \`2α\`. Đây là **trường hợp đặc biệt** chứ không phải công thức mới.

**\`sin 2θ\`**: từ \`sin(α + β) = sin α cos β + cos α sin β\` với \`α = β = θ\`:
\`\`\`
sin 2θ = sin(θ + θ)
       = sin θ cos θ + cos θ sin θ
       = 2 sin θ cos θ
\`\`\`

\`\`\`
┌─────────────────────────────────┐
│  sin 2θ = 2 sin θ · cos θ       │
└─────────────────────────────────┘
\`\`\`

**\`cos 2θ\`** (có 3 dạng): từ \`cos(α + β) = cos α cos β − sin α sin β\` với \`α = β = θ\`:
\`\`\`
cos 2θ = cos²θ − sin²θ                  (dạng I)
\`\`\`
Dùng \`sin²θ = 1 − cos²θ\`:
\`\`\`
cos 2θ = cos²θ − (1 − cos²θ) = 2 cos²θ − 1     (dạng II)
\`\`\`
Dùng \`cos²θ = 1 − sin²θ\`:
\`\`\`
cos 2θ = (1 − sin²θ) − sin²θ = 1 − 2 sin²θ     (dạng III)
\`\`\`

\`\`\`
┌─────────────────────────────────────────────┐
│  cos 2θ = cos²θ − sin²θ        (I)          │
│         = 2 cos²θ − 1          (II)         │
│         = 1 − 2 sin²θ          (III)        │
└─────────────────────────────────────────────┘
\`\`\`

❓ **Câu hỏi tự nhiên**: *"Tại sao cần 3 dạng của \`cos 2θ\`? Sao không nhớ 1 dạng?"*

Vì tùy bài, ta muốn biểu thức **chỉ chứa \`cos\`** (dạng II) hoặc **chỉ chứa \`sin\`** (dạng III). Vd khi tính tích phân \`∫ cos²x dx\`, ta cần \`cos²x = (1 + cos 2x)/2\` — suy ra trực tiếp từ dạng II. Còn \`∫ sin²x dx\` cần dạng III. Học cả 3 là đầu tư đúng (như đã giải thích ở Mục 2.4).

**\`tan 2θ\`**: từ \`tan(α + β) = (tan α + tan β)/(1 − tan α tan β)\` với \`α = β = θ\`:
\`\`\`
tan 2θ = (tan θ + tan θ) / (1 − tan θ · tan θ)
       = 2 tan θ / (1 − tan²θ)
\`\`\`

\`\`\`
┌─────────────────────────────────────┐
│  tan 2θ = 2 tan θ / (1 − tan²θ)     │
└─────────────────────────────────────┘
\`\`\`

### 4.2. Walk-through verify với 3 góc

**\`θ = 30°\`** (kiểm \`sin 60° = 2 sin 30° cos 30°\`):
- Vế trái: \`sin 60° = √3/2\`.
- Vế phải: \`2 · (1/2) · (√3/2) = √3/2\`.
- Khớp ✓.

Kiểm \`cos 60° = 2 cos²30° − 1\`:
- Vế trái: \`cos 60° = 1/2\`.
- Vế phải: \`2 · (√3/2)² − 1 = 2 · 3/4 − 1 = 3/2 − 1 = 1/2\`.
- Khớp ✓.

**\`θ = 45°\`** (kiểm \`sin 90° = 2 sin 45° cos 45°\`):
- Vế trái: \`sin 90° = 1\`.
- Vế phải: \`2 · (√2/2) · (√2/2) = 2 · 1/2 = 1\`.
- Khớp ✓.

Kiểm \`cos 90° = 1 − 2 sin²45°\`:
- Vế trái: \`cos 90° = 0\`.
- Vế phải: \`1 − 2 · (√2/2)² = 1 − 2 · 1/2 = 0\`.
- Khớp ✓.

**\`θ = 60°\`** (kiểm \`sin 120° = 2 sin 60° cos 60°\`):
- Vế trái: \`sin 120° = √3/2\`.
- Vế phải: \`2 · (√3/2) · (1/2) = √3/2\`.
- Khớp ✓.

Kiểm \`cos 120° = cos²60° − sin²60°\`:
- Vế trái: \`cos 120° = −1/2\`.
- Vế phải: \`(1/2)² − (√3/2)² = 1/4 − 3/4 = −1/2\`.
- Khớp ✓.

⚠ **Lỗi thường gặp**: viết \`sin 2θ = 2 sin θ\` — **SAI**. Thiếu hệ số \`cos θ\`. Phản chứng: \`sin 60° = √3/2 ≈ 0.866\`, còn \`2 sin 30° = 2 · 1/2 = 1\`. Không khớp.

🔁 **Dừng lại tự kiểm tra**: cho \`sin θ = 3/5\`, \`cos θ = 4/5\`. Tính \`sin 2θ\` và \`cos 2θ\`.

<details>
<summary>Đáp án</summary>

- \`sin 2θ = 2 · (3/5) · (4/5) = 24/25 = 0.96\`.
- \`cos 2θ = cos²θ − sin²θ = 16/25 − 9/25 = 7/25 = 0.28\`.
- Kiểm: \`sin²2θ + cos²2θ = (24/25)² + (7/25)² = 576/625 + 49/625 = 625/625 = 1\` ✓.

</details>

### 📝 Tóm tắt Mục 4

- Công thức nhân đôi = công thức cộng với \`α = β\`.
- \`sin 2θ = 2 sin θ cos θ\`.
- \`cos 2θ\` có 3 dạng tương đương — chọn dạng phù hợp với bài toán.
- \`tan 2θ = 2 tan θ / (1 − tan²θ)\`.

---

## 5. Công thức nhân ba (Triple Angle) — giới thiệu nhẹ

💡 **Trực giác**: cũng như nhân đôi suy từ công thức cộng \`α + β\` với \`α = β\`, công thức nhân ba suy từ \`α + 2β\` với \`α = β\` (tức \`θ + 2θ = 3θ\`). Không thường dùng nên chỉ liệt kê.

\`\`\`
sin 3θ = 3 sin θ − 4 sin³θ
cos 3θ = 4 cos³θ − 3 cos θ
\`\`\`

**Chứng minh \`sin 3θ\`** (cho người tò mò):
\`\`\`
sin 3θ = sin(θ + 2θ)
       = sin θ cos 2θ + cos θ sin 2θ
       = sin θ · (1 − 2 sin²θ) + cos θ · 2 sin θ cos θ
       = sin θ − 2 sin³θ + 2 sin θ cos²θ
       = sin θ − 2 sin³θ + 2 sin θ (1 − sin²θ)
       = sin θ − 2 sin³θ + 2 sin θ − 2 sin³θ
       = 3 sin θ − 4 sin³θ
\`\`\`

**Walk-through verify với \`θ = 30°\`**:
- Vế trái: \`sin 90° = 1\`.
- Vế phải: \`3 · (1/2) − 4 · (1/2)³ = 3/2 − 4 · 1/8 = 3/2 − 1/2 = 1\`.
- Khớp ✓.

📝 **Khi nào dùng?**: hiếm khi trong AI/ML. Chủ yếu trong vật lý sóng, vô tuyến điện, và các bài toán đa thức Chebyshev (Tn(cos θ) = cos(nθ)). Ghi lại để biết tồn tại, không cần học thuộc.

---

## 6. Công thức hạ bậc (Power Reduction)

### 6.1. Phát biểu

💡 **Trực giác**: ngược của nhân đôi. Nhân đôi đưa \`θ → 2θ\` nhưng tăng bậc số mũ (\`cos 2θ\` chứa \`cos²θ\`, \`sin²θ\`). Hạ bậc đi ngược: viết \`sin²θ\`, \`cos²θ\` qua \`cos 2θ\` — giảm bậc, tăng góc.

Từ \`cos 2θ = 1 − 2 sin²θ\`:
\`\`\`
2 sin²θ = 1 − cos 2θ
 sin²θ  = (1 − cos 2θ) / 2
\`\`\`

Từ \`cos 2θ = 2 cos²θ − 1\`:
\`\`\`
2 cos²θ = 1 + cos 2θ
 cos²θ  = (1 + cos 2θ) / 2
\`\`\`

\`\`\`
┌─────────────────────────────────────────────┐
│  sin²θ = (1 − cos 2θ) / 2                   │
│  cos²θ = (1 + cos 2θ) / 2                   │
└─────────────────────────────────────────────┘
\`\`\`

### 6.2. Walk-through verify

**\`θ = 30°\`**:
- \`sin²30° = (1/2)² = 1/4\`.
- Vế phải: \`(1 − cos 60°)/2 = (1 − 1/2)/2 = (1/2)/2 = 1/4\`. ✓
- \`cos²30° = (√3/2)² = 3/4\`.
- Vế phải: \`(1 + cos 60°)/2 = (1 + 1/2)/2 = (3/2)/2 = 3/4\`. ✓

**\`θ = 45°\`**:
- \`sin²45° = 1/2\`.
- Vế phải: \`(1 − cos 90°)/2 = (1 − 0)/2 = 1/2\`. ✓
- \`cos²45° = 1/2\`.
- Vế phải: \`(1 + cos 90°)/2 = 1/2\`. ✓

### 6.3. Ứng dụng tích phân (preview Tầng 3)

Khi học tích phân (Tầng 3), ta cần tính \`∫ sin²x dx\`. Tích phân \`sin²x\` trực tiếp không có công thức đơn giản, nhưng nếu hạ bậc:

\`\`\`
sin²x = (1 − cos 2x) / 2

∫ sin²x dx = ∫ (1 − cos 2x)/2 dx
           = (1/2) ∫ 1 dx − (1/2) ∫ cos 2x dx
           = x/2 − (1/4) sin 2x + C
\`\`\`

Đây là **lý do quan trọng** học hạ bậc: nó biến biểu thức bậc 2 (khó) thành bậc 1 (dễ tích phân).

### 📝 Tóm tắt Mục 6

- Hạ bậc = ngược của nhân đôi.
- \`sin²θ = (1 − cos 2θ)/2\`, \`cos²θ = (1 + cos 2θ)/2\`.
- Ứng dụng quan trọng: tính tích phân ở Tầng 3.

---

## 7. Bộ identity tổng kết — cheatsheet

| Nhóm | Công thức |
|------|-----------|
| **Pythagorean** | \`sin²θ + cos²θ = 1\` |
| | \`1 + tan²θ = sec²θ\` |
| | \`1 + cot²θ = csc²θ\` |
| **Phản xứng (parity)** | \`sin(−θ) = −sin θ\` (lẻ) |
| | \`cos(−θ) = cos θ\` (chẵn) |
| | \`tan(−θ) = −tan θ\` (lẻ) |
| **Hàm bù** | \`sin(90° − θ) = cos θ\` |
| | \`cos(90° − θ) = sin θ\` |
| | \`tan(90° − θ) = cot θ\` |
| **Sum** | \`sin(α + β) = sin α cos β + cos α sin β\` |
| | \`cos(α + β) = cos α cos β − sin α sin β\` |
| | \`tan(α + β) = (tan α + tan β)/(1 − tan α tan β)\` |
| **Difference** | \`sin(α − β) = sin α cos β − cos α sin β\` |
| | \`cos(α − β) = cos α cos β + sin α sin β\` |
| | \`tan(α − β) = (tan α − tan β)/(1 + tan α tan β)\` |
| **Double angle** | \`sin 2θ = 2 sin θ cos θ\` |
| | \`cos 2θ = cos²θ − sin²θ = 2 cos²θ − 1 = 1 − 2 sin²θ\` |
| | \`tan 2θ = 2 tan θ / (1 − tan²θ)\` |
| **Power reduction** | \`sin²θ = (1 − cos 2θ)/2\` |
| | \`cos²θ = (1 + cos 2θ)/2\` |
| **Triple angle** | \`sin 3θ = 3 sin θ − 4 sin³θ\` |
| | \`cos 3θ = 4 cos³θ − 3 cos θ\` |

In ra giấy, dán cạnh máy là đủ dùng đến hết Tầng 4.

---

## 8. Định lý cosin (Law of Cosines) — **trọng tâm**

### 8.1. Phát biểu

💡 **Trực giác trước**: ta đã có **Pythagoras** cho tam giác **vuông**: \`a² + b² = c²\`. Câu hỏi tự nhiên: nếu tam giác **không vuông** thì sao? Định lý cosin trả lời — nó là **bản tổng quát** của Pythagoras cho tam giác bất kỳ.

**Phát biểu**: cho tam giác bất kỳ với 3 cạnh \`a, b, c\` và 3 góc đối diện tương ứng \`A, B, C\` (ký hiệu chuẩn: cạnh \`a\` đối diện đỉnh \`A\`, v.v.). Khi đó:

\`\`\`
┌───────────────────────────────────────┐
│  c² = a² + b² − 2ab · cos C           │   (★ định lý cosin)
└───────────────────────────────────────┘
\`\`\`

Đối xứng, ta cũng có:
\`\`\`
a² = b² + c² − 2bc · cos A
b² = a² + c² − 2ac · cos B
\`\`\`

### 8.2. Vì sao là "tổng quát của Pythagoras"?

💡 **Quan sát quan trọng**: khi \`C = 90°\`, \`cos C = 0\`, nên:
\`\`\`
c² = a² + b² − 2ab · 0 = a² + b²       ← Pythagoras
\`\`\`

Tức Pythagoras là **trường hợp đặc biệt** của định lý cosin khi \`C = 90°\`.

**Phân tích theo độ lớn của \`C\`**:

| \`C\` | \`cos C\` | Số hạng \`−2ab cos C\` | \`c²\` so với \`a² + b²\` |
|-----|---------|----------------------|------------------------|
| \`< 90°\` (góc nhọn) | \`> 0\` | Âm | \`c² < a² + b²\` → cạnh đối **ngắn hơn** |
| \`= 90°\` (vuông) | \`0\` | \`0\` | \`c² = a² + b²\` (Pythagoras) |
| \`> 90°\` (góc tù) | \`< 0\` | Dương | \`c² > a² + b²\` → cạnh đối **dài hơn** |

Trực giác hình học khớp: góc đối càng to thì cạnh đối càng dài (mở góc → nới cạnh).

### 8.3. Chứng minh bằng tọa độ + Pythagoras

**Setup**: đặt tam giác \`ABC\` trong hệ tọa độ sao cho:
- Đỉnh \`C = (0, 0)\` (ở gốc).
- Đỉnh \`B = (a, 0)\` trên trục Ox (vì cạnh \`a\` = \`CB\` có độ dài \`a\`, đặt nằm ngang).
- Đỉnh \`A\` ở vị trí có góc \`C\` với cạnh \`CB\`, cách \`C\` một khoảng \`b\` (vì cạnh \`b\` = \`CA\` có độ dài \`b\`).

\`\`\`
            A = (b cos C, b sin C)
           /|
          / |
       b /  | b sin C
        /   |
       / C  |
      /_____|________ B = (a, 0)
     C    b cos C         x-axis
     (0,0)
\`\`\`

Tọa độ \`A\` lấy theo định nghĩa cos/sin: đi từ \`C\` góc \`C\` với trục Ox, khoảng cách \`b\` → \`A = (b cos C, b sin C)\`.

**Bước 1**: tính \`c² = |AB|²\` bằng công thức khoảng cách (Pythagoras trên tọa độ):
\`\`\`
c² = (b cos C − a)² + (b sin C − 0)²
\`\`\`

**Bước 2**: khai triển:
\`\`\`
c² = (b cos C)² − 2 · b cos C · a + a² + (b sin C)²
   = b² cos²C − 2ab cos C + a² + b² sin²C
\`\`\`

**Bước 3**: nhóm \`b²(cos²C + sin²C)\`:
\`\`\`
c² = a² + b²(cos²C + sin²C) − 2ab cos C
\`\`\`

**Bước 4**: dùng identity Pythagorean \`cos²C + sin²C = 1\`:
\`\`\`
c² = a² + b² · 1 − 2ab cos C
   = a² + b² − 2ab cos C            ✓ (đpcm)
\`\`\`

⚠ **Lưu ý**: chứng minh trên giả sử \`C\` có thể là góc nhọn hoặc tù; cả hai trường hợp đều hoạt động vì \`sin C\` có thể âm/dương đều được (góc trong tam giác \`0° < C < 180°\` nên \`sin C > 0\`, và \`cos C\` đổi dấu khi \`C\` vượt qua \`90°\`). Chứng minh trên không phụ thuộc giả thiết \`C\` nhọn.

### 8.4. Walk-through: tam giác có \`a = 5, b = 7, C = 60°\`. Tính \`c\`.

\`\`\`
c² = a² + b² − 2ab cos C
   = 25 + 49 − 2·5·7·cos 60°
   = 74 − 70 · (1/2)
   = 74 − 35
   = 39
c  = √39 ≈ 6.245
\`\`\`

Kiểm tra hợp lý: vì \`C = 60° < 90°\` (góc nhọn), ta kỳ vọng \`c < √(a² + b²) = √74 ≈ 8.6\`. Thực tế \`c ≈ 6.245 < 8.6\` ✓.

### 8.5. Walk-through: tam giác có 3 cạnh \`4, 5, 6\`. Tính các góc.

Gán \`a = 4, b = 5, c = 6\` (góc \`A, B, C\` đối diện tương ứng).

**Góc \`A\`** (đối diện cạnh nhỏ nhất \`a = 4\`, nên \`A\` nhỏ nhất):
\`\`\`
a² = b² + c² − 2bc cos A
16 = 25 + 36 − 60 cos A
16 = 61 − 60 cos A
60 cos A = 45
cos A = 45/60 = 0.75
A = arccos(0.75) ≈ 41.41°
\`\`\`

**Góc \`B\`**:
\`\`\`
b² = a² + c² − 2ac cos B
25 = 16 + 36 − 48 cos B
25 = 52 − 48 cos B
48 cos B = 27
cos B = 27/48 = 0.5625
B = arccos(0.5625) ≈ 55.77°
\`\`\`

**Góc \`C\`**:
\`\`\`
c² = a² + b² − 2ab cos C
36 = 16 + 25 − 40 cos C
36 = 41 − 40 cos C
40 cos C = 5
cos C = 5/40 = 0.125
C = arccos(0.125) ≈ 82.82°
\`\`\`

**Kiểm tổng góc**: \`41.41 + 55.77 + 82.82 = 180.00°\` ✓.

### 8.6. Walk-through: tam giác có \`a = 3, b = 4, c = 5\`. Tính \`C\`.

Nhận xét: \`3² + 4² = 5²\` → đây là tam giác vuông.
\`\`\`
c² = a² + b² − 2ab cos C
25 = 9 + 16 − 24 cos C
25 = 25 − 24 cos C
24 cos C = 0
cos C = 0
C = 90°
\`\`\`

Đúng như kỳ vọng. Định lý cosin "nhận ra" tam giác vuông khi \`cos C = 0\`.

❓ **Câu hỏi tự nhiên**: *"Nếu biết 3 cạnh, làm sao chắc 3 cạnh đó tạo được tam giác? Có thể nào dữ liệu vô lý không?"*

**Bất đẳng thức tam giác**: ba số \`a, b, c\` tạo được tam giác khi và chỉ khi mỗi cạnh **nhỏ hơn tổng** hai cạnh kia: \`a < b + c\`, \`b < a + c\`, \`c < a + b\`. Nếu vi phạm, định lý cosin sẽ cho \`|cos C| > 1\` (không hợp lệ) → bạn biết ngay dữ liệu sai.

Ví dụ: nếu \`a = 1, b = 1, c = 5\` (vi phạm vì \`1 + 1 = 2 < 5\`):
\`\`\`
cos C = (a² + b² − c²)/(2ab) = (1 + 1 − 25)/2 = −23/2 = −11.5
\`\`\`
\`cos C\` phải ∈ \`[−1, 1]\` → vô lý → tam giác không tồn tại. Định lý cosin tự "báo lỗi".

🔁 **Dừng lại tự kiểm tra**: tam giác có \`a = 6, b = 8, C = 120°\`. Tính \`c\`.

<details>
<summary>Đáp án</summary>

\`c² = 36 + 64 − 2·6·8·cos 120° = 100 − 96·(−1/2) = 100 + 48 = 148\`.
\`c = √148 ≈ 12.166\`.

Kiểm: vì \`C = 120° > 90°\`, kỳ vọng \`c > √(a² + b²) = 10\`. Thực tế \`12.166 > 10\` ✓.

</details>

### 📝 Tóm tắt Mục 8

- Định lý cosin: \`c² = a² + b² − 2ab cos C\` — tổng quát Pythagoras cho tam giác bất kỳ.
- Khi \`C = 90°\` → cos = 0 → quay về Pythagoras.
- Tính chiều dài cạnh khi biết 2 cạnh + góc xen giữa, hoặc tính góc khi biết 3 cạnh.
- Chứng minh bằng tọa độ: đặt tam giác cho \`C\` ở gốc, dùng công thức khoảng cách + identity Pythagorean.

---

## 9. Định lý sin (Law of Sines) — giới thiệu

💡 **Trực giác**: trong tam giác, mỗi cạnh tỉ lệ thuận với sin của góc đối diện nó. Tỉ số \`cạnh/sin(góc đối)\` là **bằng nhau cho cả 3 cặp**.

**Phát biểu**:
\`\`\`
a / sin A = b / sin B = c / sin C = 2R
\`\`\`
với \`R\` là bán kính đường tròn ngoại tiếp tam giác (đường tròn đi qua cả 3 đỉnh).

**Khi nào dùng?**
- Biết 2 góc + 1 cạnh → tìm các cạnh còn lại.
- Biết 2 cạnh + 1 góc đối diện (không xen) → tìm góc còn lại.

(Khi biết 2 cạnh + góc **xen giữa**, hoặc 3 cạnh, dùng định lý **cosin** thay vì sin.)

### Walk-through: tam giác có \`A = 30°, B = 75°, a = 10\`. Tính \`b\`.

\`C = 180° − 30° − 75° = 75°\`. Dùng định lý sin:
\`\`\`
a / sin A = b / sin B
10 / sin 30° = b / sin 75°
10 / 0.5 = b / 0.9659
20 = b / 0.9659
b = 20 · 0.9659 ≈ 19.319
\`\`\`

❓ **Câu hỏi tự nhiên**: *"Vì sao học cả định lý sin lẫn cosin? Có cái nào thay được cái kia không?"*

Có một số tình huống chỉ cosin giải được (ASA, AAS với 2 cạnh + góc xen, hoặc SSS). Có tình huống định lý sin gọn hơn (AAS, ASA). Học cả hai vì chúng bù trừ — quy tắc chung:
- **Biết 2 cạnh + góc xen giữa** → **cosin**.
- **Biết 3 cạnh** → **cosin** (tính được góc).
- **Biết 2 góc + 1 cạnh** → **sin**.
- **Biết 2 cạnh + góc đối diện (không xen)** → **sin** (cẩn thận có thể có 2 nghiệm, gọi là *ambiguous case*).

### 📝 Tóm tắt Mục 9

- \`a/sin A = b/sin B = c/sin C = 2R\`.
- Dùng khi biết góc + cạnh chéo nhau (không xen).
- Định lý sin và cosin **bù trừ** — học cả hai.

---

## 10. Cosine similarity — preview (RẤT QUAN TRỌNG)

> Đây là **mục đích cuối cùng** của Lesson 05. Mọi identity và định lý cosin học ở trên đều dẫn về **một dòng** sẽ học chính thức ở Tầng 4 và dùng khắp Tầng 6: cách đo "độ giống nhau" của hai vector.

### 10.1. Vector trong mặt phẳng — nhắc nhanh

💡 **Hình dung**: một vector \`u\` trong mặt phẳng là **mũi tên** từ gốc tới một điểm. Trong tọa độ, viết \`u = (u₁, u₂)\` — hai số: hoành độ và tung độ.

**Hai thao tác cốt lõi**:
- **Độ dài** (hoặc *norm*): \`|u| = √(u₁² + u₂²)\` (Pythagoras trên tọa độ).
- **Dot product** (tích vô hướng): \`u · v = u₁v₁ + u₂v₂\` — nhân thành phần rồi cộng.

**Ví dụ số**: \`u = (3, 4)\`, \`v = (1, 2)\`.
- \`|u| = √(9 + 16) = √25 = 5\`.
- \`|v| = √(1 + 4) = √5 ≈ 2.236\`.
- \`u · v = 3·1 + 4·2 = 3 + 8 = 11\`.

❓ **Tại sao gọi là "vô hướng"?** Vì kết quả là **một số** (scalar), không phải vector. Bạn nhân hai vector ra một con số.

### 10.2. Định lý liên hệ dot product với góc

💡 **Trực giác**: dot product **không chỉ là** "nhân thành phần rồi cộng". Nó còn có nghĩa hình học: liên quan tới độ dài và góc giữa 2 vector.

\`\`\`
┌─────────────────────────────────────┐
│  u · v = |u| · |v| · cos θ          │   (★ DOT PRODUCT — GÓC)
└─────────────────────────────────────┘
\`\`\`
với \`θ\` là góc giữa \`u\` và \`v\` (góc tạo bởi 2 mũi tên cùng gốc).

**Đây là công thức xương sống của embedding similarity.**

### 10.3. Chứng minh bằng định lý cosin (5 bước)

**Setup**: đặt \`u\`, \`v\` cùng gốc tại \`O\`. Vẽ vector \`u − v\` (từ ngọn \`v\` tới ngọn \`u\`). Khi đó tam giác \`O, u, v\` có:
- Cạnh \`OA\` (với \`A\` = ngọn \`u\`) độ dài \`|u|\`.
- Cạnh \`OB\` (với \`B\` = ngọn \`v\`) độ dài \`|v|\`.
- Cạnh \`AB\` (từ ngọn \`v\` tới ngọn \`u\`) độ dài \`|u − v|\`.
- Góc tại \`O\` giữa \`OA\` và \`OB\` là \`θ\`.

\`\`\`
       A (ngọn u)
      /|
     / |
    /  |  |u-v|
|u|/   |
  /    |
 / θ   |
O──────B (ngọn v)
   |v|
\`\`\`

**Bước 1 — định lý cosin cho tam giác \`OAB\`** (cạnh đối góc \`θ\` là \`AB = |u − v|\`):
\`\`\`
|u − v|² = |u|² + |v|² − 2 · |u| · |v| · cos θ      [định lý cosin]      (✦1)
\`\`\`

**Bước 2 — tính \`|u − v|²\` bằng tọa độ**:
\`\`\`
|u − v|² = (u₁ − v₁)² + (u₂ − v₂)²
        = u₁² − 2u₁v₁ + v₁² + u₂² − 2u₂v₂ + v₂²
        = (u₁² + u₂²) + (v₁² + v₂²) − 2(u₁v₁ + u₂v₂)
        = |u|² + |v|² − 2(u · v)                                          (✦2)
\`\`\`

**Bước 3 — đặt (✦1) bằng (✦2)** (cùng là \`|u − v|²\`):
\`\`\`
|u|² + |v|² − 2|u||v| cos θ = |u|² + |v|² − 2(u · v)
\`\`\`

**Bước 4 — rút gọn**: trừ \`|u|² + |v|²\` cả 2 vế:
\`\`\`
−2|u||v| cos θ = −2(u · v)
\`\`\`

**Bước 5 — chia cả 2 vế cho \`−2\`**:
\`\`\`
|u||v| cos θ = u · v
\`\`\`

Hoán đổi vế:
\`\`\`
┌────────────────────────────┐
│  u · v = |u| |v| cos θ     │   ✓ (đpcm)
└────────────────────────────┘
\`\`\`

🎯 **Đây là một trong vài kết quả quan trọng nhất bạn sẽ học ở cả lộ trình \`Vectors/\`.** Hãy hiểu nó kỹ. Tất cả "embedding similarity" trong AI quay về dòng này.

### 10.4. Cosine similarity — định nghĩa

Từ \`u · v = |u| |v| cos θ\`, chia cả 2 vế cho \`|u| · |v|\` (giả sử cả hai vector khác \`0\`):

\`\`\`
┌─────────────────────────────────────┐
│  cos θ = (u · v) / (|u| · |v|)      │
└─────────────────────────────────────┘
\`\`\`

Đại lượng vế phải gọi là **cosine similarity** của 2 vector — viết tắt \`cos_sim(u, v)\`.

**Tính chất**:
- \`cos_sim ∈ [−1, 1]\` (vì \`cos θ ∈ [−1, 1]\`).
- \`cos_sim = 1\` ⟺ \`θ = 0°\` ⟺ 2 vector **cùng hướng** (giống nhau hoàn toàn).
- \`cos_sim = 0\` ⟺ \`θ = 90°\` ⟺ 2 vector **vuông góc** (không liên quan).
- \`cos_sim = −1\` ⟺ \`θ = 180°\` ⟺ 2 vector **ngược hướng** (đối lập hoàn toàn).

### 10.5. Walk-through: cosine similarity của 2 vector cụ thể

**Ví dụ A**: \`u = (1, 0)\`, \`v = (1, 1)\`.

- \`u · v = 1·1 + 0·1 = 1\`.
- \`|u| = √(1+0) = 1\`.
- \`|v| = √(1+1) = √2\`.
- \`cos θ = 1 / (1 · √2) = 1/√2 = √2/2 ≈ 0.7071\`.
- \`θ = arccos(0.7071) = 45°\`.

Đúng kỳ vọng — \`u = (1, 0)\` chĩa dọc trục x, \`v = (1, 1)\` chĩa đường chéo, góc giữa là \`45°\`.

**Ví dụ B**: \`u = (3, 4)\`, \`v = (1, 2)\`.

- \`u · v = 11\` (tính ở 10.1).
- \`|u| = 5\`, \`|v| = √5\`.
- \`cos θ = 11 / (5 · √5) = 11 / (5√5) = 11√5 / 25 ≈ 0.9839\`.
- \`θ ≈ arccos(0.9839) ≈ 10.30°\`.

Hai vector "khá giống nhau" (góc nhỏ, cosine sim gần \`1\`).

**Ví dụ C**: \`u = (1, 0)\`, \`v = (0, 1)\`.

- \`u · v = 0\`.
- \`|u| = |v| = 1\`.
- \`cos θ = 0\`.
- \`θ = 90°\`. Hai vector **vuông góc** — cosine similarity bằng \`0\`.

**Ví dụ D**: \`u = (1, 2)\`, \`v = (−1, −2)\`.

- \`u · v = −1 − 4 = −5\`.
- \`|u| = |v| = √5\`.
- \`cos θ = −5 / (√5 · √5) = −5/5 = −1\`.
- \`θ = 180°\`. Hai vector **ngược hướng** — cosine similarity = \`−1\`.

### 10.6. Vì sao **quan trọng** cho embedding và AI?

💡 **Hình dung**: trong AI hiện đại, mỗi từ/câu/ảnh được biến thành một **vector** (gọi là **embedding**) — thường ở chiều cao (vd \`768\` chiều với BERT, \`1536\` với OpenAI embedding, \`4096\` với một số LLM).

Hai embedding \`u, v\` "giống nhau về nghĩa" ⟺ chúng **chĩa cùng hướng** trong không gian 768 chiều ⟺ \`cos θ ≈ 1\`.

**Vì sao dùng \`cos θ\` chứ không dùng khoảng cách Euclidean \`|u − v|\`?**

Embedding thường **không chuẩn hóa độ dài** — vector của câu dài có thể \`|u|\` to hơn câu ngắn. Khoảng cách \`|u − v|\` bị ảnh hưởng bởi độ dài. Nhưng \`cos θ\` chỉ phụ thuộc **hướng**, không phụ thuộc độ dài — đo "nội dung" thuần túy.

**Liên hệ giữa khoảng cách và dot product** (từ (✦2)):
\`\`\`
|u − v|² = |u|² + |v|² − 2(u · v)
\`\`\`
Hai cách đo "khác nhau" thực ra liên kết chặt qua dot product. Khi embedding **đã chuẩn hóa** (\`|u| = |v| = 1\`), \`|u − v|² = 2 − 2(u·v) = 2(1 − cos θ)\` — khoảng cách Euclidean bình phương và cosine sim biến đổi 1-1 cho nhau.

**Áp dụng thực tế trong AI/ML**:

| Ứng dụng | Cách dùng cosine similarity |
|----------|----------------------------|
| **Semantic search** | Embedding query, tìm các document có cos sim cao nhất → kết quả liên quan. |
| **Recommendation** | Embedding user và item, gợi ý item có cos sim cao với user. |
| **RAG (Retrieval-Augmented Generation)** | Embedding câu hỏi, tìm passage liên quan trong vector DB bằng cos sim, đưa vào prompt LLM. |
| **Clustering** | Gom các embedding gần nhau (cos sim cao) thành cụm. |
| **Attention (Transformer)** | Tính \`softmax(Q·K^T / √d)\` — bản chất là dot product giữa query và key vectors. |
| **CLIP (image ↔ text)** | Embed ảnh và text vào cùng không gian; cos sim cao = ảnh khớp với mô tả. |

### 10.7. Mở rộng cho \`n\` chiều — công thức không đổi

❓ **Câu hỏi tự nhiên**: *"Chứng minh ở 10.3 dùng tam giác trong mặt phẳng. Vector embedding 768 chiều thì làm sao?"*

**Trả lời**: công thức \`u · v = u₁v₁ + u₂v₂ + ... + uₙvₙ\` và \`|u| = √(u₁² + ... + uₙ²)\` **mở rộng tự nhiên cho n chiều**. Định lý \`u · v = |u| |v| cos θ\` vẫn đúng — chỉ cần định nghĩa "góc giữa 2 vector n chiều" qua công thức này. Tầng 4 (Linear Algebra) sẽ chứng minh chặt chẽ.

Trong code, bạn không quan tâm chiều — vòng \`for i := 0; i < n; i++\` cho mọi \`n\`:

\`\`\`go
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
\`\`\`

⚠ **Lỗi thường gặp**: chia cho \`0\` khi một vector là vector \`0\` (tất cả thành phần = \`0\`). Phải check \`|u| > 0\` và \`|v| > 0\` trước. Vector \`0\` không có hướng, cosine similarity không định nghĩa được.

🔁 **Dừng lại tự kiểm tra**: tính cosine similarity của \`u = (1, 1, 1)\` và \`v = (1, 0, 0)\`.

<details>
<summary>Đáp án</summary>

- \`u · v = 1·1 + 1·0 + 1·0 = 1\`.
- \`|u| = √(1+1+1) = √3\`.
- \`|v| = √1 = 1\`.
- \`cos θ = 1/(√3 · 1) = 1/√3 ≈ 0.577\`.
- \`θ ≈ arccos(0.577) ≈ 54.74°\`.

</details>

### 📝 Tóm tắt Mục 10

- Dot product \`u · v\` = nhân thành phần + cộng (đại số) = \`|u| |v| cos θ\` (hình học) — hai mặt của cùng một đồng xu.
- Chứng minh sự tương đương dùng **định lý cosin** trên tam giác \`O, u, v\`.
- Cosine similarity = \`cos θ = (u · v) / (|u| |v|)\` — đo độ giống nhau giữa 2 vector, không phụ thuộc độ dài.
- Tất cả semantic search, RAG, recommendation đều quay về metric này.

---

## 11. Liên hệ ML/AI và các tầng sau

### 11.1. Tầng 3 — Calculus

- Tính tích phân \`∫ sin² x dx\` và \`∫ cos² x dx\` cần **hạ bậc** (Mục 6). Đây là tích phân nền tảng trong vật lý và xử lý tín hiệu.
- **Đạo hàm \`sin x\`** là \`cos x\`, **đạo hàm \`cos x\`** là \`−sin x\`. Quan hệ này dẫn tới **phương trình vi phân điều hòa**, mô tả mọi dao động (lò xo, sóng, mạch RLC).

### 11.2. Tầng 4 — Linear Algebra

- **Dot product** trở thành **inner product** tổng quát, định nghĩa "góc" trong không gian vector bất kỳ (kể cả không gian hàm).
- **Định lý cosin** dạng \`|u − v|² = |u|² + |v|² − 2(u·v)\` là cách hiểu **khoảng cách Euclidean qua dot product**, dẫn tới các bất đẳng thức Cauchy-Schwarz, tam giác.
- **Ma trận xoay** (Lesson 06 ngay sau bài này) sử dụng **công thức cộng** trực tiếp — ma trận xoay góc \`α\` rồi xoay góc \`β\` cho ra ma trận xoay \`α + β\`, do đó các phần tử của tích ma trận chính là \`sin(α+β), cos(α+β)\`.

### 11.3. Tầng 6 — Vector search, RAG, embedding

- **Cosine similarity** là metric chính trong các vector database (FAISS, Pinecone, Weaviate, Qdrant). Khi bạn \`db.query(embedding, top_k=5)\`, hệ thống tính cos sim giữa query embedding và mọi document embedding (đã được chuẩn hóa \`|·| = 1\` thường để cos sim = dot product), trả về 5 cao nhất.
- **Attention trong Transformer**: \`softmax(Q K^T / √d_k) V\` — \`Q K^T\` chính là dot product giữa các vector query và key. Khi vector chuẩn hóa, đây gần như cos sim. Cơ chế "attention" thực ra là "tìm vector key giống query nhất".
- **CLIP, ALIGN, embedding model**: huấn luyện sao cho ảnh và mô tả text tương ứng có cos sim cao, ảnh và mô tả không liên quan có cos sim thấp.

### 11.4. RoPE (Rotary Position Embedding) — preview Lesson 06

Bài tiếp theo (Lesson 06 — Ma trận xoay) sẽ dạy cách "xoay" vector embedding bằng ma trận \`R(θ)\`. Trong **RoPE** (kỹ thuật dùng trong LLM hiện đại như LLaMA, GPT-NeoX), người ta **xoay** vector key/query embedding một góc phụ thuộc vào **vị trí token** trong câu. Cos sim giữa các vector đã xoay có tính chất đặc biệt: nó phụ thuộc **vị trí tương đối** giữa 2 token (không phải vị trí tuyệt đối).

Lesson 06 sẽ đi sâu.

### 📝 Tóm tắt Mục 11

- Identity và định lý cosin **không** dừng ở lượng giác phổ thông — chúng là **nền tảng** của mọi metric similarity trong AI.
- Mỗi lần bạn \`vector_db.search()\` trong RAG, mỗi lần Transformer tính attention, bạn đều đang dùng định lý cosin.
- Lesson 06 (ma trận xoay) sẽ mở rộng sang RoPE.

---

## 12. Bài tập

### Bài 1 — \`sin 15°\` và \`cos 105°\`

Tính \`sin 15°\` và \`cos 105°\` bằng công thức cộng.

### Bài 2 — Identity verification

Chứng minh \`sin 2θ + cos 2θ = 1 − 2 sin²θ + 2 sin θ cos θ\`. Verify bằng số với \`θ = 30°\`.

### Bài 3 — Định lý cosin

Tam giác có \`a = 8, b = 10, C = 45°\`. Tính \`c\` và hai góc còn lại \`A, B\`.

### Bài 4 — Cosine similarity 2D

Cho hai vector \`u = (3, 4)\` và \`v = (1, 2)\`. Tính:
1. \`|u|\`
2. \`|v|\`
3. \`u · v\`
4. \`cos θ\` (cosine similarity)
5. \`θ\` (góc giữa, theo độ)

### Bài 5 — Hai vector đơn vị

Cho hai vector đơn vị (\`|u| = |v| = 1\`) tạo với nhau góc \`60°\`. Tính dot product \`u · v\`. Cosine similarity bằng bao nhiêu?

### Bài 6 — Code Go \`cosineSimilarity\`

Viết hàm Go:

\`\`\`go
func cosineSimilarity(u, v []float64) float64
\`\`\`

Yêu cầu:
- Hỗ trợ vector \`n\` chiều (\`n\` tùy ý).
- Trả về \`0\` nếu một trong hai vector là vector \`0\` (tránh chia 0).
- Test với 3 cặp vector:
  1. \`u = (1, 0, 0), v = (1, 0, 0)\` → kỳ vọng \`1.0\`.
  2. \`u = (1, 0, 0), v = (0, 1, 0)\` → kỳ vọng \`0.0\`.
  3. \`u = (1, 2, 3), v = (2, 4, 6)\` → kỳ vọng \`1.0\` (cùng hướng vì \`v = 2u\`).

---

## 13. Lời giải chi tiết

### Bài 1 — Giải

**\`sin 15°\`**: \`15° = 45° − 30°\`, dùng \`sin(α − β) = sin α cos β − cos α sin β\`:
\`\`\`
sin 15° = sin 45° cos 30° − cos 45° sin 30°
        = (√2/2)(√3/2) − (√2/2)(1/2)
        = √6/4 − √2/4
        = (√6 − √2) / 4
        ≈ (2.449 − 1.414) / 4
        ≈ 0.2588
\`\`\`

**\`cos 105°\`**: \`105° = 60° + 45°\`, dùng \`cos(α + β) = cos α cos β − sin α sin β\`:
\`\`\`
cos 105° = cos 60° cos 45° − sin 60° sin 45°
         = (1/2)(√2/2) − (√3/2)(√2/2)
         = √2/4 − √6/4
         = (√2 − √6) / 4
         ≈ (1.414 − 2.449) / 4
         ≈ −0.2588
\`\`\`

**Quan sát**: \`cos 105° = −sin 15°\`. Vì \`105° = 90° + 15°\` và \`cos(90° + x) = −sin x\`. Một kiểm tra hợp lý.

### Bài 2 — Giải

Vế phải:
\`\`\`
1 − 2 sin²θ + 2 sin θ cos θ
\`\`\`

Áp dụng identity:
- \`1 − 2 sin²θ = cos 2θ\` (công thức nhân đôi, dạng III).
- \`2 sin θ cos θ = sin 2θ\` (công thức nhân đôi).

Vế phải \`= cos 2θ + sin 2θ = sin 2θ + cos 2θ =\` vế trái. ✓

**Verify với \`θ = 30°\`**:
- Vế trái: \`sin 60° + cos 60° = √3/2 + 1/2 = (√3 + 1)/2 ≈ 1.366\`.
- Vế phải: \`1 − 2 sin²30° + 2 sin 30° cos 30° = 1 − 2·(1/4) + 2·(1/2)·(√3/2) = 1 − 1/2 + √3/2 = 1/2 + √3/2 = (1 + √3)/2 ≈ 1.366\`. ✓

### Bài 3 — Giải

**Tính \`c\`** (định lý cosin, biết \`a, b, C\`):
\`\`\`
c² = a² + b² − 2ab cos C
   = 64 + 100 − 2·8·10·cos 45°
   = 164 − 160 · (√2/2)
   = 164 − 80√2
   ≈ 164 − 113.137
   ≈ 50.863
c ≈ √50.863 ≈ 7.131
\`\`\`

**Tính \`A\`** (định lý cosin):
\`\`\`
a² = b² + c² − 2bc cos A
64 = 100 + 50.863 − 2·10·7.131·cos A
64 = 150.863 − 142.62 cos A
142.62 cos A = 86.863
cos A = 0.6090
A = arccos(0.6090) ≈ 52.49°
\`\`\`

**Tính \`B\`**: \`B = 180° − A − C = 180° − 52.49° − 45° = 82.51°\`.

**Kiểm**: kiểm bằng định lý sin: \`b/sin B = 10/sin 82.51° = 10/0.9914 ≈ 10.087\`. \`a/sin A = 8/sin 52.49° = 8/0.7933 ≈ 10.084\`. \`c/sin C = 7.131/sin 45° = 7.131/0.7071 ≈ 10.085\`. Cả 3 tỉ số gần nhau (sai số nhỏ do làm tròn) → đúng ✓.

### Bài 4 — Giải

\`u = (3, 4)\`, \`v = (1, 2)\`.

1. \`|u| = √(9 + 16) = √25 = 5\`.
2. \`|v| = √(1 + 4) = √5 ≈ 2.2361\`.
3. \`u · v = 3·1 + 4·2 = 3 + 8 = 11\`.
4. \`cos θ = 11 / (5 · √5) = 11 / (5√5) = 11/(5√5) · (√5/√5) = 11√5/25 ≈ 0.9839\`.
5. \`θ = arccos(0.9839) ≈ 10.30°\`.

**Trực giác**: hai vector "khá giống nhau" — chĩa gần cùng hướng (cả hai có tỉ lệ \`tung/hoành\` tương tự: \`4/3 ≈ 1.33\` và \`2/1 = 2\`, không quá xa).

### Bài 5 — Giải

\`|u| = |v| = 1\`, \`θ = 60°\`. Từ định lý \`u · v = |u| |v| cos θ\`:
\`\`\`
u · v = 1 · 1 · cos 60° = 1/2 = 0.5
\`\`\`

**Cosine similarity** = \`cos θ = cos 60° = 0.5\`.

Vì hai vector đã chuẩn hóa độ dài bằng \`1\`, **dot product chính là cosine similarity**. Đây là lý do trong vector database thực tế, người ta thường **chuẩn hóa embedding** trước khi lưu (\`u → u / |u|\`) — khi đó tìm kiếm theo cos sim chỉ cần tính dot product, nhanh hơn.

### Bài 6 — Giải

\`\`\`go
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
		fmt.Printf("cosineSimilarity(%v, %v) = %.6f (want %.1f)\\n", t.u, t.v, got, t.want)
	}
}
\`\`\`

**Output kỳ vọng**:
\`\`\`
cosineSimilarity([1 0 0], [1 0 0]) = 1.000000 (want 1.0)
cosineSimilarity([1 0 0], [0 1 0]) = 0.000000 (want 0.0)
cosineSimilarity([1 2 3], [2 4 6]) = 1.000000 (want 1.0)
\`\`\`

**Giải thích test 3**: \`v = (2, 4, 6) = 2·(1, 2, 3) = 2u\`. Hai vector cùng hướng, chỉ khác độ dài → cosine sim = \`1\`. Đây minh họa: **cosine sim không quan tâm độ dài**, chỉ quan tâm hướng.

**Độ phức tạp**: \`O(n)\` mỗi cặp vector (n là chiều). Khi cần so query với N document, tổng \`O(N·n)\`. Với N triệu và n = 768, đó là \`~10^9\` phép tính — chậm. Vector database dùng cấu trúc như HNSW, IVF để giảm xuống \`O(log N · n)\`.

---

## 14. Tham khảo & liên kết

- **Code Go**: [solutions.go](./solutions.go)
- **Visualization tương tác**: [visualization.html](./visualization.html)
- **Lesson trước**: [Lesson 04 — Đồ thị hàm lượng giác](../lesson-04-trig-graphs/)
- **Lesson kế**: [Lesson 06 — Ma trận xoay 2D/3D](../lesson-06-rotation-matrix/) — RoPE preview
- **Tầng kế tiếp**: [Tầng 3 — Calculus](../../03-Calculus/) (sắp ra) — đạo hàm, gradient, tích phân.

📝 **Tóm tắt cả bài**:

1. Identity là biểu thức đúng với mọi giá trị biến (khác phương trình).
2. Pythagorean: \`sin² + cos² = 1\` và 2 biến thể (chia cho cos², sin²).
3. Sum: \`sin(α±β), cos(α±β), tan(α±β)\` — nhớ mnemonic dấu.
4. Double angle: \`sin 2θ = 2 sin cos\`, \`cos 2θ\` có 3 dạng.
5. Power reduction: \`sin²θ = (1−cos 2θ)/2\` — dùng để tính tích phân.
6. **Định lý cosin**: \`c² = a² + b² − 2ab cos C\` — tổng quát Pythagoras.
7. **\`u · v = |u| |v| cos θ\`** — chứng minh bằng định lý cosin, là xương sống của cosine similarity.
8. Cosine similarity = \`(u·v) / (|u||v|)\` ∈ \`[−1, 1]\` — đo độ giống nhau giữa 2 vector. Dùng khắp AI/ML.
`;
