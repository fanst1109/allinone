# Lesson 02 — Giới hạn hàm & Liên tục

## Mục tiêu

- Hiểu **giới hạn hàm số** lim_{x→a} f(x).
- Giới hạn 1 bên (trái, phải) và giới hạn 2 bên.
- Định nghĩa **hàm liên tục** tại 1 điểm và trên 1 khoảng.
- Phân loại điểm gián đoạn.
- Định lý giá trị trung gian (IVT).

## Kiến thức tiền đề

- [Lesson 01 — Giới hạn dãy](../lesson-01-sequences-limits/).

---

## 1. Giới hạn hàm số

💡 **Là gì**: lim_{x→a} f(x) = L có nghĩa **khi x càng gần a, f(x) càng gần L**.

⚠ **Quan trọng**: Giá trị tại x = a **không quan trọng** (có thể f(a) không xác định, hoặc khác L). Chỉ quan tâm "xung quanh a".

**Ví dụ kinh điển**: f(x) = (x² - 1)/(x - 1) khi x → 1.
- Tại x = 1: f(1) = 0/0 = không xác định!
- Nhưng x ≠ 1: f(x) = (x-1)(x+1)/(x-1) = x + 1.
- lim_{x→1} f(x) = 1 + 1 = **2**.

⟶ Giới hạn tồn tại dù f không xác định tại a.

### Định nghĩa hình thức (ε-δ, Cauchy 1820)
```
lim_{x→a} f(x) = L
⟺
∀ε > 0, ∃δ > 0, ∀x: 0 < |x - a| < δ ⟹ |f(x) - L| < ε
```

💡 Đọc: "Cho dù sai số ε đòi nhỏ thế nào, có khoảng (a-δ, a+δ) (trừ chính a) làm cho f rơi vào khoảng (L-ε, L+ε)".

> 📐 **Định nghĩa đầy đủ — Liên tục tại a**
>
> **(a) Là gì**: Hàm f liên tục tại a khi và chỉ khi **3 điều** đồng thời đúng: (1) f(a) xác định, (2) lim_{x→a} f(x) tồn tại, (3) chúng bằng nhau: lim = f(a). Đồ thị "vẽ được không nhấc bút" qua điểm a.
>
> **(b) Vì sao cần**: Liên tục là điều kiện đảm bảo các tính chất "đẹp" — IVT (PT có nghiệm khi đổi dấu), định lý cực trị (đạt min/max trên đoạn đóng), tích phân được. Hàm liên tục là **vật liệu tốt** của Giải tích. Mọi hàm "tự nhiên" (đa thức, sin, cos, e^x, ln x) đều liên tục trên miền xác định. Gián đoạn là dấu hiệu của "biến động đột ngột" — vd nhiệt độ thay đổi pha (đá → nước), điện áp on/off.
>
> **(c) Ví dụ số**: f(x) = x² liên tục tại 2: f(2) = 4, lim_{x→2} x² = 4, khớp ✓. f(x) = (x²−1)/(x−1) **gián đoạn bỏ được** tại 1: f(1) chưa định nghĩa, nhưng lim = 2 → sửa f(1)=2 thì liên tục. f(x) = 1/x **gián đoạn vô hạn** tại 0: lim trái = -∞, lim phải = +∞. f(x) = ⌊x⌋ (sàn) **gián đoạn nhảy** tại mọi số nguyên: f(2−) = 1, f(2+) = 2.

**4 ví dụ số đa dạng cho `lim_{x→a} f(x)`**:
- Hàm liên tục thường (thay trực tiếp): `lim_{x→3} (2x+1) = 7`.
- Dạng `0/0` rút gọn được: `lim_{x→2} (x²−4)/(x−2) = lim(x+2) = 4`.
- Giới hạn không tồn tại (hai bên lệch): `lim_{x→0} |x|/x` — trái `= −1`, phải `= +1` → không tồn tại.
- Giới hạn tại điểm hàm xác định nhưng lệch giá trị: `f(x) = 1` mọi `x ≠ 0`, `f(0) = 5` → `lim_{x→0} f = 1 ≠ f(0)`.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Nếu chỉ quan tâm 'xung quanh a', sao không thay luôn `x = a` vào?"* Với hàm liên tục thì thay được (đó chính là định nghĩa liên tục). Nhưng khi gặp `0/0` (như `(x²−1)/(x−1)` tại 1), thay trực tiếp ra vô nghĩa — phải rút gọn rồi mới thay. Giới hạn là công cụ xử lý đúng những chỗ "thay không được".
- *"`δ` phụ thuộc vào gì?"* Phụ thuộc cả `ε` lẫn điểm `a`. ε đòi nhỏ hơn → `δ` thường phải nhỏ hơn. Giống ε-N của dãy: trật tự "∀ε, ∃δ" cho phép `δ` co theo `ε`.

⚠ **Lỗi thường gặp — tưởng `lim_{x→a} f(x) = f(a)` luôn đúng**. Sai cho hàm gián đoạn. Phản ví dụ: `f(x) = (x²−1)/(x−1)` có `f(1)` không xác định nhưng `lim = 2`; hay `f(x) = ⌊x⌋` có `f(2) = 2` nhưng `lim_{x→2⁻} = 1`. Thay trực tiếp chỉ hợp lệ khi đã biết hàm liên tục tại đó.

🔁 **Dừng lại tự kiểm tra**

1. `lim_{x→1} (x³ − 1)/(x − 1) = ?`
2. Giá trị `f(2)` có ảnh hưởng tới `lim_{x→2} f(x)` không?

<details><summary>Đáp án</summary>

1. `x³−1 = (x−1)(x²+x+1)` → rút gọn còn `x²+x+1` → thay `x=1` → `3`.
2. Không. Giới hạn chỉ phụ thuộc giá trị `f` ở **lân cận** `a`, không phụ thuộc `f(a)`.

</details>

### 📝 Tóm tắt mục 1

- `lim_{x→a} f(x) = L`: `f(x)` gần `L` tùy ý khi `x` gần `a` — **không quan tâm `f(a)`**.
- Định nghĩa ε-δ: `∀ε>0, ∃δ>0, 0<|x−a|<δ ⟹ |f(x)−L|<ε`.
- Gặp `0/0`: rút gọn/nhân liên hợp trước rồi mới thay.

---

## 2. Giới hạn 1 bên

**Giới hạn trái**: lim_{x→a⁻} f(x) — x tiến a từ phía nhỏ hơn.

**Giới hạn phải**: lim_{x→a⁺} f(x) — x tiến a từ phía lớn hơn.

**Định lý**: Giới hạn 2 bên tồn tại ⟺ 2 giới hạn 1 bên tồn tại và **bằng nhau**.

**Ví dụ**: f(x) = |x|/x. Khi x → 0:
- x < 0: f = -1 → lim trái = -1.
- x > 0: f = 1 → lim phải = 1.
- Khác nhau → **lim 2 bên KHÔNG tồn tại**.

💡 **Trực giác**: tưởng tượng đi bộ trên đồ thị tiến về điểm `x = a`. Đi từ bên trái thấy hàm dẫn về giá trị nào (lim trái), đi từ bên phải thấy dẫn về đâu (lim phải). Chỉ khi hai lối đi gặp nhau ở cùng một điểm thì mới có giới hạn hai bên.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào bắt buộc xét 1 bên?"* Khi hàm "đổi công thức" qua `a` (hàm chia khúc), có giá trị tuyệt đối quanh `a`, hoặc `a` là biên miền xác định (vd `√x` tại `x = 0` chỉ có lim phải). Hàm trơn thông thường thì hai bên tự khớp.
- *"Hàm sàn `⌊x⌋` tại `x = 2` có giới hạn không?"* Không. Lim trái `= 1` (các giá trị ngay dưới 2 như `1.99` cho `⌊⌋ = 1`), lim phải `= 2`. Lệch → không tồn tại giới hạn hai bên.

⚠ **Lỗi thường gặp — kết luận có giới hạn khi mới xét 1 bên**. Tính `lim_{x→0⁺} 1/x = +∞` rồi vội nói "lim = +∞" là sai: `lim_{x→0⁻} 1/x = −∞`. Hai bên lệch → giới hạn hai bên KHÔNG tồn tại. Luôn kiểm tra cả hai phía ở điểm nghi ngờ.

🔁 **Dừng lại tự kiểm tra**

1. `f(x) = x²` với `x < 1`, `f(x) = x + 3` với `x ≥ 1`. `lim_{x→1} f(x)` có tồn tại không?
2. `lim_{x→0⁻} |x|/x = ?`

<details><summary>Đáp án</summary>

1. Lim trái `= 1² = 1`, lim phải `= 1+3 = 4`. Lệch → **không tồn tại**.
2. Với `x < 0`, `|x| = −x` → `|x|/x = −1`. Lim trái `= −1`.

</details>

### 📝 Tóm tắt mục 2

- Lim trái `lim_{x→a⁻}` (tiến từ phía nhỏ), lim phải `lim_{x→a⁺}` (tiến từ phía lớn).
- Giới hạn hai bên tồn tại ⟺ hai lim một bên tồn tại **và bằng nhau**.
- Bắt buộc xét một bên ở: hàm chia khúc, `|·|`, biên miền xác định.

---

## 3. Giới hạn vô hạn / vô cùng

- **lim f(x) = ∞**: f tăng vô hạn khi x → a. VD lim_{x→0} 1/x² = +∞.
- **lim_{x→∞} f(x) = L**: x ra vô cùng, f tiến L. VD lim_{x→∞} 1/x = 0.

💡 **Trực giác — phân biệt hai loại "vô cùng"**: `lim = ∞` (giá trị hàm bay lên trời, tiệm cận **đứng**) khác `lim_{x→∞}` (biến bay ra xa, xét tiệm cận **ngang**). Đừng lẫn "hàm ra vô cực" với "biến ra vô cực".

❓ **Câu hỏi tự nhiên của người đọc**

- *"`lim = ∞` có phải là 'giới hạn tồn tại' không?"* Theo nghĩa chặt (giới hạn hữu hạn) thì KHÔNG — ta nói "giới hạn vô cực" như một mô tả hành vi, không phải một số. Khi viết `lim_{x→0} 1/x² = +∞` ta đang nói "hàm tăng vô hạn", đây là cách diễn đạt được chấp nhận.
- *"Làm sao tính `lim_{x→∞}` của hàm hữu tỉ nhanh?"* So bậc tử/mẫu: bậc tử < mẫu → 0; bằng nhau → tỉ số hệ số đầu; tử > mẫu → ±∞. Vd `lim_{x→∞}(3x²+1)/(x²+5) = 3/1 = 3`.

⚠ **Lỗi thường gặp — nhầm tiệm cận đứng với ngang**. `1/x`: tại `x → 0` ra `±∞` (tiệm cận **đứng** `x = 0`); tại `x → ∞` ra `0` (tiệm cận **ngang** `y = 0`). Hai câu hỏi hoàn toàn khác nhau, đừng trộn lẫn.

🔁 **Dừng lại tự kiểm tra**

1. `lim_{x→∞} (2x³ + x)/(5x³ − 1) = ?`
2. `lim_{x→0} 1/x² = ?` (cẩn thận hai bên)

<details><summary>Đáp án</summary>

1. Cùng bậc 3 → tỉ số hệ số đầu `= 2/5`.
2. `+∞` cả hai bên (vì `x² > 0` luôn → khác `1/x`). Ở đây nói `lim = +∞` hợp lệ vì hai bên khớp.

</details>

### 📝 Tóm tắt mục 3

- `lim = ∞`: hàm tăng/giảm vô hạn tại điểm `a` → tiệm cận **đứng**.
- `lim_{x→∞} = L`: biến ra vô cực, hàm tiến `L` → tiệm cận **ngang**.
- Hàm hữu tỉ tại vô cực: so bậc tử/mẫu để có kết quả nhanh.

---

## 4. Quy tắc tính giới hạn hàm

Tương tự dãy: lim(f+g) = lim f + lim g, ... (khi cả 2 tồn tại).

**Dạng không xác định** (giống dãy): 0/0, ∞/∞, ∞-∞, 0·∞, 1^∞...

### Mẹo giải 0/0

- Phân tích nhân tử (như VD trên).
- Liên hợp (cho căn).
- Sin x/x = 1.

💡 **Trực giác — vì sao có `0/0` mà vẫn ra số hữu hạn**: `0/0` không có nghĩa "tử và mẫu đều bằng 0" mà là "cả hai cùng tiến về 0". Tốc độ tiến về 0 của tử so với mẫu quyết định kết quả. Như cuộc đua hai vận động viên cùng về đích: ai nhanh hơn (gấp mấy lần) mới là câu trả lời.

**Verify mẹo bằng số** — `lim_{x→1} (x²−1)/(x−1) = 2`:
- Thay gần: `x = 1.001` → `(1.002001 − 1)/(0.001) = 0.002001/0.001 = 2.001` → tiến 2 ✓.
- Phân tích: `(x−1)(x+1)/(x−1) = x+1 → 2` ✓.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Khi nào dùng nhân liên hợp thay vì phân tích nhân tử?"* Khi biểu thức có **căn**. Vd `lim_{x→0} (√(x+1)−1)/x`: nhân tử/mẫu với `√(x+1)+1` → tử thành `(x+1)−1 = x` → rút gọn `x` → `1/(√(x+1)+1) → 1/2`.
- *"`0/0` luôn ra số hữu hạn?"* Không. Có thể ra số (`(x²−1)/(x−1) → 2`), ra `∞` (`x/x² = 1/x → ∞` khi `x→0`), hoặc không tồn tại. Vì thế nó là dạng **vô định** — phải biến đổi mới biết.

⚠ **Lỗi thường gặp — kết luận `0/0 = 1` hoặc `0/0 = 0`**. Phản ví dụ ngay: `lim_{x→0} 2x/x = 2` (không phải 1 hay 0), `lim_{x→0} x²/x = 0`, `lim_{x→0} x/x² = ∞`. Ba kết quả khác nhau cho cùng dạng `0/0` → bắt buộc biến đổi.

🔁 **Dừng lại tự kiểm tra**

1. `lim_{x→3} (x²−9)/(x−3) = ?`
2. `lim_{x→0} (√(4+x) − 2)/x = ?`

<details><summary>Đáp án</summary>

1. `(x−3)(x+3)/(x−3) = x+3 → 6`.
2. Nhân liên hợp `√(4+x)+2`: tử `→ (4+x)−4 = x` → `1/(√(4+x)+2) → 1/4`.

</details>

### 📝 Tóm tắt mục 4

- lim phân phối qua `+, −, ·, /` khi cả hai tồn tại (thương cần mẫu `≠ 0`).
- `0/0`, `∞/∞`... là **vô định** — phải biến đổi (nhân tử, liên hợp, `sin x/x`).
- Cùng dạng `0/0` có thể ra số, ∞, hoặc không tồn tại tùy biểu thức.

---

## 5. Hàm liên tục

💡 **Trực giác**: Hàm liên tục là hàm "vẽ được không nhấc bút" — không có nhảy, không có lỗ.

**Định nghĩa hình thức**: f liên tục tại a nếu:
```
lim_{x→a} f(x) = f(a)
```

**3 điều kiện**:
1. f(a) xác định.
2. lim_{x→a} f(x) tồn tại.
3. Bằng nhau: lim = f(a).

⟶ Nếu thiếu 1 trong 3 → **gián đoạn**.

**4 ví dụ số đa dạng**:
- Liên tục: `f(x) = x²` tại `a = 2`: `f(2) = 4 = lim_{x→2} x²` ✓.
- Gián đoạn (lỗ): `f(x) = (x²−1)/(x−1)` tại `1`: `f(1)` không xác định → vi phạm điều kiện (1).
- Gián đoạn (giá trị lệch): `f(x) = x+1` nếu `x≠1`, `f(1) = 5` → `lim = 2 ≠ 5 = f(1)` → vi phạm (3).
- Gián đoạn (lim không tồn tại): `f(x) = |x|/x` tại `0` → vi phạm (2) (hai bên lệch).

❓ **Câu hỏi tự nhiên của người đọc**

- *"Liên tục tại 1 điểm khác liên tục trên 1 khoảng thế nào?"* Liên tục trên `(a,b)` nghĩa là liên tục tại **mọi** điểm trong khoảng. Một hàm có thể liên tục khắp nơi trừ vài điểm (vd `1/x` liên tục mọi nơi trừ `0`).
- *"Vì sao cần đủ cả 3 điều kiện?"* Vì mỗi điều kiện bịt một loại "vỡ": (1) hàm phải có giá trị tại đó (không có lỗ trống), (2) phải có xu hướng rõ ràng (không nhảy/dao động), (3) giá trị thật phải khớp xu hướng (không "lệch điểm"). Thiếu bất kỳ điều nào → vẽ phải nhấc bút.

⚠ **Lỗi thường gặp — chỉ kiểm `f(a)` xác định rồi kết luận liên tục**. `f(x) = ⌊x⌋` có `f(2) = 2` (xác định) nhưng vẫn gián đoạn tại 2 vì `lim` không tồn tại. Phải kiểm đủ **cả ba** điều kiện, không chỉ điều kiện (1).

🔁 **Dừng lại tự kiểm tra**

1. `f(x) = (x−2)/(x−2)` với `x ≠ 2`, không định nghĩa tại 2. Liên tục tại 2 không?
2. `f(x) = x²` nếu `x ≤ 1`, `f(x) = 2x` nếu `x > 1`. Liên tục tại 1?

<details><summary>Đáp án</summary>

1. Không (vi phạm điều kiện 1 — `f(2)` không tồn tại), dù `lim = 1`. Đây là gián đoạn **bỏ được**.
2. Lim trái `= 1`, lim phải `= 2`, `f(1) = 1`. Lim hai bên lệch → **gián đoạn nhảy**, không liên tục.

</details>

### 📝 Tóm tắt mục 5

- Liên tục tại `a` ⟺ đủ 3 điều: `f(a)` xác định, `lim_{x→a} f` tồn tại, hai cái bằng nhau.
- Liên tục trên khoảng = liên tục tại mọi điểm trong khoảng.
- Thiếu bất kỳ điều kiện nào → gián đoạn (phải kiểm cả ba).

---

## 6. Phân loại điểm gián đoạn

| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| **Bỏ được** (removable) | lim tồn tại nhưng ≠ f(a) hoặc f(a) chưa định nghĩa | f(x) = (x²-1)/(x-1) tại x=1 |
| **Nhảy** (jump) | lim trái ≠ lim phải, cả 2 hữu hạn | |x|/x tại 0 |
| **Vô hạn** | lim = ±∞ | 1/x tại 0 |

💡 **Bỏ được**: ta có thể "lấp" lỗ bằng cách định nghĩa lại f(a) = lim.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao 'bỏ được' lại tên như vậy?"* Vì chỉ cần định nghĩa lại đúng 1 giá trị `f(a) = lim` là lỗ biến mất, hàm liên tục. Hai loại kia (nhảy, vô hạn) không "lấp" được — lim hai bên lệch hoặc bằng ∞, sửa 1 điểm không cứu nổi.
- *"Phân biệt nhảy và vô hạn ra sao?"* Nhảy: cả hai lim một bên **hữu hạn** nhưng khác nhau (vd `|x|/x` cho `−1` và `1`). Vô hạn: ít nhất một lim một bên `= ±∞` (vd `1/x` tại 0).

⚠ **Lỗi thường gặp — gọi mọi gián đoạn là 'bỏ được'**. Chỉ gián đoạn bỏ được mới cần lim hai bên tồn tại và bằng nhau. `1/x` tại 0 là gián đoạn **vô hạn** — không bỏ được; gọi nhầm là bỏ được rồi "lấp" sẽ sai.

🔁 **Dừng lại tự kiểm tra**

1. `f(x) = sin(x)/x` (không định nghĩa tại 0). Loại gián đoạn nào?
2. `f(x) = ⌊x⌋` tại `x = 3`. Loại nào?

<details><summary>Đáp án</summary>

1. **Bỏ được** — `lim_{x→0} sin x/x = 1` tồn tại; định nghĩa `f(0) = 1` thì liên tục.
2. **Nhảy** — lim trái `= 2`, lim phải `= 3`, cả hai hữu hạn nhưng lệch.

</details>

### 📝 Tóm tắt mục 6

- 3 loại gián đoạn: bỏ được (lim tồn tại nhưng `≠ f(a)`/`f(a)` thiếu), nhảy (hai bên hữu hạn lệch), vô hạn (lim `= ±∞`).
- Chỉ **bỏ được** mới "lấp" được bằng cách định nghĩa lại `f(a) = lim`.
- Phân biệt nhảy ↔ vô hạn dựa vào lim một bên hữu hạn hay vô cực.

---

## 7. Hàm liên tục cơ bản

Các hàm sau **liên tục trên toàn miền xác định**:
- Đa thức (polynomial).
- Hàm hữu tỉ (P(x)/Q(x)) — liên tục mọi nơi trừ Q = 0.
- Lượng giác (sin, cos liên tục mọi ℝ; tan liên tục trừ π/2 + kπ).
- Mũ a^x.
- Log log_a x (trên (0, ∞)).
- Tổ hợp (cộng, trừ, nhân, chia, hợp) của các hàm liên tục → liên tục.

💡 **Trực giác**: các hàm "đẹp" quen thuộc đều liên tục trên miền của chúng, và ghép chúng lại (cộng/nhân/hợp) vẫn liên tục. Nhờ vậy, để chứng minh một hàm phức tạp như `e^{sin x}·ln(x²+1)` liên tục, ta chỉ cần nhận ra nó được ghép từ các viên gạch liên tục — không phải kiểm ε-δ.

❓ **Câu hỏi tự nhiên của người đọc**

- *"`tan x` liên tục trên toàn ℝ không?"* Không. `tan x = sin x/cos x` gián đoạn (vô hạn) tại `x = π/2 + kπ` (chỗ `cos x = 0`). Nó liên tục trên **miền xác định** (bỏ các điểm đó) — không phải toàn ℝ.
- *"`P(x)/Q(x)` liên tục ở đâu?"* Mọi nơi trừ chỗ `Q(x) = 0`. Vd `1/(x²−1)` gián đoạn tại `x = ±1`, liên tục ở mọi điểm khác.

⚠ **Lỗi thường gặp — quên loại trừ điểm mẫu bằng 0 / ngoài miền**. Nói "`ln x` liên tục trên ℝ" là sai — `ln x` chỉ xác định và liên tục trên `(0, ∞)`. Luôn kèm miền xác định khi phát biểu tính liên tục.

🔁 **Dừng lại tự kiểm tra**

1. `f(x) = x²/(x−2)` gián đoạn tại đâu?
2. `f(x) = √x + cos x` liên tục trên miền nào?

<details><summary>Đáp án</summary>

1. Tại `x = 2` (mẫu bằng 0) — gián đoạn vô hạn; liên tục ở mọi điểm khác.
2. Trên `[0, ∞)` — `√x` chỉ xác định khi `x ≥ 0`, `cos x` liên tục khắp nơi → giao là `[0, ∞)`.

</details>

### 📝 Tóm tắt mục 7

- Đa thức, mũ, sin/cos liên tục trên toàn ℝ; `ln x` trên `(0,∞)`; hữu tỉ trừ chỗ mẫu `= 0`; `tan x` trừ `π/2+kπ`.
- Tổ hợp (`+, −, ·, /`, hợp) các hàm liên tục → liên tục (trên miền hợp lệ).
- Luôn kèm **miền xác định** khi nói về tính liên tục.

---

## 8. Định lý giá trị trung gian (IVT)

🎯 **Phát biểu**: Nếu f liên tục trên [a, b] và y_0 là số nằm giữa f(a) và f(b), thì ∃ c ∈ [a, b] sao cho f(c) = y_0.

💡 **Trực giác**: Vẽ đường liền nét từ điểm A đến B, không thể "nhảy qua" giá trị trung gian.

### Hệ quả — Định lý Bolzano

Nếu f liên tục trên [a, b] và f(a)·f(b) < 0 (khác dấu), thì **f(c) = 0 có nghiệm** trong (a, b).

⟶ Dùng để chứng minh PT có nghiệm mà không cần giải.

**Ví dụ**: x³ - x - 1 = 0. Đặt f(x) = x³ - x - 1. f(1) = -1, f(2) = 5. f đổi dấu → có nghiệm trong (1, 2). (Thực tế nghiệm ≈ 1.3247.)

❓ **Câu hỏi tự nhiên của người đọc**

- *"IVT có cần liên tục không, hay hàm nào cũng đúng?"* **Bắt buộc liên tục**. Hàm sàn `⌊x⌋` trên `[0, 2]` đi từ `0` lên `2` nhưng KHÔNG bao giờ nhận giá trị `1.5` — vì nó nhảy, không liên tục. IVT sụp đổ ngay khi mất tính liên tục.
- *"Bolzano nói có nghiệm — tìm nghiệm ở đâu?"* Bolzano chỉ khẳng định **tồn tại** nghiệm trong `(a,b)`, không cho vị trí. Để tìm, dùng **chia đôi (bisection)**: lấy trung điểm `c`, xét dấu `f(c)`, thu hẹp nửa khoảng còn đổi dấu — lặp lại đến khi đủ chính xác.

⚠ **Lỗi thường gặp — dùng Bolzano khi `f(a)·f(b) > 0`**. Cùng dấu KHÔNG kết luận được gì: `f(x) = x²−1` trên `[−2, 2]` có `f(−2) = f(2) = 3 > 0` nhưng vẫn có **hai** nghiệm `±1` ở giữa. Bolzano chỉ cho chiều "đổi dấu ⟹ có nghiệm", không cho chiều ngược.

🔁 **Dừng lại tự kiểm tra**

1. PT `cos x = x` có nghiệm trong `(0, 1)` không? (Đặt `f(x) = cos x − x`.)
2. `f(x) = 1/x` trên `[−1, 1]` đi từ `−1` lên `1`, có nhận giá trị `0` không? IVT áp dụng được không?

<details><summary>Đáp án</summary>

1. `f(0) = 1 > 0`, `f(1) = cos 1 − 1 ≈ −0.46 < 0`. Đổi dấu, `f` liên tục → **có nghiệm** trong `(0,1)`.
2. Không nhận `0` (`1/x` không bao giờ bằng 0). IVT **không áp dụng được** vì `f` gián đoạn vô hạn tại `0 ∈ [−1,1]`.

</details>

### 📝 Tóm tắt mục 8

- IVT: `f` liên tục trên `[a,b]` → `f` nhận **mọi** giá trị giữa `f(a)` và `f(b)`.
- Hệ quả Bolzano: liên tục `+ f(a)·f(b) < 0` ⟹ có nghiệm `f(c)=0` trong `(a,b)`.
- Tính liên tục là **bắt buộc**; chỉ kết luận được khi hai đầu **đổi dấu**.

---

## 9. Bài tập

### Bài tập

**Bài 1**: Tính lim_{x→2} (x² - 4)/(x - 2).

**Bài 2**: Tính lim_{x→0} sin(3x)/x.

**Bài 3**: f(x) = (x² - 9)/(x - 3) khi x ≠ 3, f(3) = 5. Hỏi f liên tục tại 3 không?

**Bài 4**: Tính lim_{x→∞} (3x² + 1)/(x² + 5).

**Bài 5**: PT x³ + x - 3 = 0 có nghiệm trong (1, 2) không?

### Lời giải

**Bài 1**: (x²-4)/(x-2) = (x-2)(x+2)/(x-2) = x+2 → lim = **4**.

**Bài 2**: lim sin(3x)/x = lim 3·sin(3x)/(3x) = 3·1 = **3**.

**Bài 3**: lim_{x→3} (x²-9)/(x-3) = lim (x+3) = 6. Nhưng f(3) = 5 ≠ 6 → **gián đoạn bỏ được** (sửa f(3)=6 thì liên tục).

**Bài 4**: Chia tử mẫu cho x²: (3 + 1/x²)/(1 + 5/x²) → 3/1 = **3**.

**Bài 5**: f liên tục. f(1) = -1, f(2) = 7. f(1)·f(2) < 0 → **có nghiệm** trong (1, 2) (Bolzano).

---

## 10. Bài tiếp theo

[Lesson 03 — Đạo hàm: định nghĩa](../lesson-03-derivative-definition/).

## 📝 Tổng kết

1. **lim_{x→a} f(x) = L**: f xung quanh a càng gần L tùy ý.
2. Giới hạn 2 bên tồn tại ⟺ 2 giới hạn 1 bên = nhau.
3. **Liên tục tại a**: lim = f(a). 3 loại gián đoạn (bỏ được, nhảy, vô hạn).
4. **IVT**: liên tục thì đi qua mọi giá trị trung gian.
5. **Bolzano**: f(a)·f(b) < 0 và liên tục → có nghiệm.
