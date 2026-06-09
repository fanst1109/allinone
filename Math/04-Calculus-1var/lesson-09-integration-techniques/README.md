# Lesson 09 (T4) — Kỹ thuật tính tích phân

## Mục tiêu

- Nắm bốn kỹ thuật trụ cột để **tính được** những tích phân mà Lesson 06–08 mới chỉ "định nghĩa": **đổi biến**, **tích phân từng phần**, **đổi biến lượng giác**, **phân tích thành phân thức đơn giản**.
- Hiểu **tích phân suy rộng** (cận vô hạn / hàm không bị chặn) và tiêu chí hội tụ p-test.
- Biết **chọn kỹ thuật nào** cho từng dạng tích phân.

## Kiến thức tiền đề

- [Lesson 06 — Nguyên hàm](../lesson-06-antiderivatives/) (bảng nguyên hàm, ý tưởng đổi biến).
- [Lesson 07 — Tích phân xác định](../lesson-07-definite-integral/) (định lý cơ bản giải tích: ∫ₐᵇ f = F(b) − F(a)).
- [Lesson 08 — Ứng dụng tích phân](../lesson-08-integral-applications/) — đây là *động cơ*: ta cần tính được tích phân thật để dùng vào diện tích/thể tích.

> 💡 **Vì sao cần bài này?** Lesson 07 nói "tích phân = F(b) − F(a)", nhưng *tìm F* mới là phần khó. Hầu hết tích phân thực tế không tra bảng trực tiếp được — `∫x·eˣ dx`, `∫√(1−x²) dx`, `∫1/(x²−1) dx` đều "tịt" nếu chỉ có bảng nguyên hàm. Bốn kỹ thuật dưới đây là bộ đồ nghề để **biến tích phân lạ về tích phân quen**.

---

## 1. Đổi biến (substitution) — ôn nhanh

💡 **Trực giác.** Đổi biến là "quy tắc hàm hợp chạy ngược". Nếu thấy trong tích phân có **một cụm và đạo hàm của cụm đó**, đặt cụm đó làm `u`.

$$\int f(g(x))\,g'(x)\,dx = \int f(u)\,du \quad (u = g(x))$$

**Ví dụ số cụ thể (4 cái):**

1. `∫ 2x·cos(x²) dx`: đặt `u = x²`, `du = 2x dx` → `∫cos u du = sin u = sin(x²) + C`.
2. `∫ x/(x²+1) dx`: `u = x²+1`, `du = 2x dx` → `½∫du/u = ½ln|u| = ½ln(x²+1) + C`.
3. `∫ (ln x)/x dx`: `u = ln x`, `du = dx/x` → `∫u du = ½(ln x)² + C`.
4. `∫₀¹ x·e^{x²} dx`: `u = x²` (x:0→1 ⇒ u:0→1) → `½∫₀¹ eᵘ du = ½(e − 1) ≈ 0.859`.

> ⚠ **Lỗi thường gặp.** Khi đổi biến trong tích phân **xác định**, phải đổi luôn **cận** theo `u` (ví dụ 4: x từ 0→1 thành u từ 0→1), hoặc thế ngược về `x` trước khi thay cận. Quên đổi cận → sai số.

---

## 2. Tích phân từng phần (integration by parts)

💡 **Trực giác.** Đây là "quy tắc tích chạy ngược". Từ `(uv)' = u'v + uv'`, lấy tích phân hai vế rồi chuyển vế:

$$\int u\,dv = uv - \int v\,du$$

Ý tưởng: đổi một tích phân khó `∫u dv` lấy một tích phân (hi vọng) **dễ hơn** `∫v du`.

❓ **Chọn `u` là cái nào?** Theo thứ tự ưu tiên **LIATE** — chọn `u` là loại xuất hiện *trước* trong danh sách (vì đạo hàm nó sẽ đơn giản dần):
**L**ogarit → **I**nverse (hàm ngược, arctan...) → **A**lgebra (đa thức) → **T**rig → **E**xponential.

**Ví dụ số cụ thể (4 cái), verify bằng đạo hàm:**

1. `∫ x·eˣ dx`: `u=x` (A), `dv=eˣdx` → `du=dx`, `v=eˣ`. ⇒ `x·eˣ − ∫eˣ dx = eˣ(x−1) + C`.
   *Verify:* `d/dx[eˣ(x−1)] = eˣ(x−1)+eˣ = x·eˣ` ✓. Xác định: `∫₀¹ x·eˣ dx = [eˣ(x−1)]₀¹ = 0 − (−1) = 1`.
2. `∫ ln x dx`: viết `u=ln x` (L), `dv=dx` → `du=dx/x`, `v=x`. ⇒ `x ln x − ∫x·(1/x)dx = x ln x − x + C`.
   *Verify:* `ln x + 1 − 1 = ln x` ✓. `∫₁^e ln x dx = [x ln x − x]₁^e = (e−e) − (0−1) = 1`.
3. `∫ x·sin x dx`: `u=x`, `dv=sin x dx` → `v=−cos x`. ⇒ `−x cos x + ∫cos x dx = −x cos x + sin x + C`.
   *Verify:* `−cos x + x sin x + cos x = x sin x` ✓. `∫₀^π x sin x dx = [−x cos x + sin x]₀^π = π`.
4. `∫ x²·eˣ dx`: từng phần **hai lần** ⇒ `eˣ(x² − 2x + 2) + C`.
   *Verify:* `eˣ(x²−2x+2) + eˣ(2x−2) = eˣ·x²` ✓.

> ❓ **"Có khi nào làm hoài không hết?"** Có dạng *vòng lặp* như `∫eˣcos x dx`: từng phần hai lần thì tích phân gốc xuất hiện lại ở vế phải, ta **giải như phương trình ẩn I**. Kết quả: `∫eˣcos x dx = ½eˣ(cos x + sin x) + C`.

> 🔁 **Tự kiểm tra.** Tính `∫ x·cos x dx`.
> <details><summary>Đáp án</summary>`u=x, dv=cos x dx → v=sin x`. ⇒ `x sin x − ∫sin x dx = x sin x + cos x + C`. Verify: `sin x + x cos x − sin x = x cos x` ✓.</details>

---

## 3. Đổi biến lượng giác (trig substitution)

💡 **Trực giác.** Khi trong tích phân có `√(a²−x²)`, `√(a²+x²)`, `√(x²−a²)` — những căn này chính là **cạnh tam giác vuông**. Đặt `x` theo `sin/tan/sec` để biến căn thành một hàm lượng giác trơn (dùng `1−sin² = cos²`, `1+tan² = sec²`).

| Dạng căn | Đặt | Đồng nhất thức dùng |
|----------|-----|---------------------|
| `√(a²−x²)` | `x = a·sinθ` | `1 − sin²θ = cos²θ` |
| `√(a²+x²)` | `x = a·tanθ` | `1 + tan²θ = sec²θ` |
| `√(x²−a²)` | `x = a·secθ` | `sec²θ − 1 = tan²θ` |

**Ví dụ số cụ thể (4 cái):**

1. `∫ √(1−x²) dx`: đặt `x=sinθ`, `dx=cosθ dθ`, `√(1−x²)=cosθ`. ⇒ `∫cos²θ dθ = ½(θ + sinθ cosθ)`.
   Thế lại: `= ½(arcsin x + x√(1−x²)) + C`. *Đây là diện tích dưới cung tròn.*
   `∫₀¹ √(1−x²) dx = ½(π/2 + 0) = π/4` — đúng bằng diện tích **¼ hình tròn** đơn vị ✓.
2. `∫ 1/(1+x²) dx`: `x=tanθ`, `dx=sec²θ dθ`, `1+x²=sec²θ` ⇒ `∫dθ = θ = arctan x + C`.
3. `∫ 1/√(1−x²) dx`: `x=sinθ` ⇒ `∫dθ = arcsin x + C`.
4. `∫ √(x²−1) dx` (x≥1): `x=secθ` ⇒ `½(x√(x²−1) − ln|x+√(x²−1)|) + C`.

> ⚠ **Lỗi thường gặp.** Sau khi tính xong theo `θ`, phải **đổi ngược về `x`** (dùng tam giác: `sinθ = x/a` ⇒ `cosθ = √(a²−x²)/a`...). Để nguyên `θ` là chưa xong.

---

## 4. Phân tích thành phân thức đơn giản (partial fractions)

💡 **Trực giác.** Phân thức hữu tỉ `P(x)/Q(x)` (bậc tử < bậc mẫu) khó tích phân trực tiếp, nhưng **mọi phân thức như vậy đều tách được thành tổng các mảnh kiểu `A/(x−r)`** — mà mỗi mảnh tích phân ra `A·ln|x−r|` ngay.

**Ví dụ số cụ thể (4 cái):**

1. `1/(x²−1) = 1/[(x−1)(x+1)] = ½·1/(x−1) − ½·1/(x+1)`.
   ⇒ `∫1/(x²−1) dx = ½ln|x−1| − ½ln|x+1| = ½ln|（x−1)/(x+1)| + C`.
2. `1/[x(x+1)] = 1/x − 1/(x+1)` ⇒ `∫ = ln|x| − ln|x+1| = ln|x/(x+1)| + C`.
3. `(x+3)/[x(x−1)]`: tách `= A/x + B/(x−1)`. Cho x=0: `3/(−1)=A ⇒ A=−3`; x=1: `4/1=B ⇒ B=4`.
   ⇒ `∫ = −3ln|x| + 4ln|x−1| + C`.
4. `(2x)/(x²−1)`: ở đây tử là đạo hàm của mẫu → đổi biến nhanh hơn: `= ln|x²−1| + C` (không cần tách).

> ❓ **"Tách hệ số A, B kiểu gì cho nhanh?"** **Phương pháp che (cover-up):** để tìm hệ số của `1/(x−r)`, che `(x−r)` ở mẫu rồi thay `x=r` vào phần còn lại. Ví dụ 1: hệ số của `1/(x−1)` = `1/(x+1)|_{x=1} = ½`.

> ⚠ **Bậc tử ≥ bậc mẫu?** Phải **chia đa thức trước** để tách phần nguyên, rồi mới phân tích phần dư. Ví dụ `x²/(x²−1) = 1 + 1/(x²−1)`.

---

## 5. Tích phân suy rộng (improper integrals)

💡 **Trực giác.** Tích phân suy rộng là tích phân trên miền **vô hạn** (cận ∞) hoặc của hàm **vọt lên vô cùng** trong miền. Ta định nghĩa nó là **giới hạn** của tích phân thường:

$$\int_1^{\infty} f(x)\,dx = \lim_{b\to\infty}\int_1^{b} f(x)\,dx$$

Nếu giới hạn hữu hạn → **hội tụ**; nếu = ∞ hoặc không tồn tại → **phân kỳ**.

> 📐 **Tiêu chí p (p-test) — định nghĩa đầy đủ.**
> **(a) Là gì:** xét `∫₁^∞ x^{−p} dx`. Tính: `∫₁^b x^{−p} dx = [x^{1−p}/(1−p)]₁^b`.
> **(b) Kết luận:** khi `b→∞`, số hạng `b^{1−p}` → 0 **chỉ khi** `p > 1`. Vậy:
> - `p > 1`: **hội tụ**, giá trị `= 1/(p−1)`.
> - `p ≤ 1`: **phân kỳ** (`= ∞`).
> **(c) Ví dụ số:** `p=2 → 1/(2−1) = 1`; `p=3 → ½`; `p=1` (`∫₁^∞ dx/x = ln b → ∞`) phân kỳ; `p=0.5` phân kỳ.

**Ví dụ số cụ thể (4 cái):**

1. `∫₁^∞ 1/x² dx = [−1/x]₁^∞ = 0 − (−1) = 1` (hội tụ). *Diện tích vô hạn bề ngang nhưng hữu hạn!*
2. `∫₁^∞ 1/x dx = [ln x]₁^∞ = ∞` (phân kỳ) — ranh giới đúng tại p=1.
3. `∫₀^∞ e^{−x} dx = [−e^{−x}]₀^∞ = 0 − (−1) = 1` — nền của phân phối mũ trong xác suất.
4. `∫₀¹ 1/√x dx = [2√x]₀¹ = 2` (suy rộng tại x=0 vì 1/√x → ∞; vẫn hội tụ vì p=½ < 1 cho cận **0**).

> ❓ **"Sao chỗ thì p>1 hội tụ, chỗ thì p<1 hội tụ?"** Khác cận! Tại **∞** cần hàm tắt nhanh ⇒ `p>1`. Tại **điểm kỳ dị 0** cần hàm không quá nhọn ⇒ `p<1`. Hai bài toán đối xứng nhau.

---

## 6. Chọn kỹ thuật nào? (sơ đồ quyết định)

| Thấy trong tích phân | Thử trước |
|----------------------|-----------|
| Một cụm + đạo hàm của cụm đó | **Đổi biến** |
| Tích của hai loại hàm khác nhau (đa thức × eˣ/sin/ln) | **Từng phần** (LIATE) |
| Căn `√(a²±x²)`, `√(x²−a²)` | **Đổi biến lượng giác** |
| Phân thức hữu tỉ (mẫu phân tích được) | **Phân thức đơn giản** |
| Cận ∞ hoặc hàm vọt vô cực | **Suy rộng** (lim) |

> 📝 **Tóm tắt.** Bốn kỹ thuật = bốn cách "biến lạ về quen": đổi biến (hàm hợp ngược), từng phần (tích ngược), lượng giác hoá (khử căn), phân thức (tách phân số). Suy rộng = tích phân + giới hạn. p-test: ∞ cần p>1, kỳ dị tại 0 cần p<1.

---

## 7. Bài tập

1. Tính `∫ x·ln x dx`.
2. Tính `∫₀^{π/2} x·cos x dx`.
3. Tính `∫ 1/(x²+4) dx`.
4. Tính `∫ 1/[(x−2)(x+1)] dx`.
5. Tích phân suy rộng `∫₂^∞ 1/x³ dx` hội tụ hay phân kỳ? Bằng bao nhiêu?

## Lời giải chi tiết

**Bài 1.** `∫x·ln x dx`. LIATE: `u=ln x` (L trước A), `dv=x dx` → `du=dx/x`, `v=x²/2`.
⇒ `(x²/2)ln x − ∫(x²/2)(1/x)dx = (x²/2)ln x − ∫(x/2)dx = (x²/2)ln x − x²/4 + C`.
*Verify:* `d/dx = x ln x + (x²/2)(1/x) − x/2 = x ln x + x/2 − x/2 = x ln x` ✓.

**Bài 2.** `∫₀^{π/2} x cos x dx`. `u=x, dv=cos x dx → v=sin x`.
⇒ `[x sin x]₀^{π/2} − ∫₀^{π/2} sin x dx = (π/2·1 − 0) − [−cos x]₀^{π/2} = π/2 − (0 − (−1)) = π/2 − 1 ≈ 0.5708`.

**Bài 3.** `∫1/(x²+4) dx`. Dạng `√(a²+x²)`-họ với a=2: `x=2tanθ`. Nhanh hơn dùng công thức `∫dx/(x²+a²) = (1/a)arctan(x/a)`.
⇒ `= ½·arctan(x/2) + C`.

**Bài 4.** `∫1/[(x−2)(x+1)] dx`. Tách `= A/(x−2) + B/(x+1)`. Che: `A = 1/(x+1)|_{x=2} = 1/3`; `B = 1/(x−2)|_{x=−1} = 1/(−3) = −1/3`.
⇒ `∫ = ⅓ln|x−2| − ⅓ln|x+1| = ⅓ln|（x−2)/(x+1)| + C`.

**Bài 5.** `∫₂^∞ x^{−3} dx`. p=3 > 1 → **hội tụ**. `= [x^{−2}/(−2)]₂^∞ = 0 − (−1/(2·4)) = 1/8 = 0.125`.

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 4 module tương tác: tích phân từng phần (chọn hàm, xem u/dv & kết quả), đổi biến lượng giác (diện tích cung tròn), phân thức (tách & tích phân), và p-test suy rộng (kéo p, b xem hội tụ/phân kỳ).

## 9. Bài tiếp theo

- [Lesson 10 — Giải tích tham số & toạ độ cực](../lesson-10-parametric-polar-calculus/) — áp các kỹ thuật tích phân này lên đường cong cho dưới dạng tham số và hệ toạ độ cực.
- Chuỗi & khai triển Taylor (dùng tích phân từng phần để ước lượng phần dư): [Math/06-Advanced/lesson-06-series-taylor](../../06-Advanced/lesson-06-series-taylor/).
- Tích phân suy rộng `∫₀^∞ e^{−x}` là nền của phân phối liên tục: [Math/06-Advanced/lesson-08-probability-statistics](../../06-Advanced/lesson-08-probability-statistics/).
