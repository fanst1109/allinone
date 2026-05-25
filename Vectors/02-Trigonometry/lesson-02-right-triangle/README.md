# Lesson 02 — Tam giác vuông: sin, cos, tan

> **Tầng 2 — Trigonometry · Bài 2/6**
>
> Đây là bài học "đặt nền" cho toàn bộ lượng giác. Sau bài này, mỗi khi nhìn thấy `sin θ`, `cos θ`, `tan θ`, bạn không còn nghĩ tới "một cái nút trên máy tính bỏ túi" mà nghĩ ngay tới **ba tỷ số cạnh trong một tam giác vuông**. Đó là khác biệt giữa hiểu công thức và **biết công thức từ đâu ra**.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Vẽ được một tam giác vuông và chỉ đúng đâu là **cạnh đối**, **cạnh kề**, **cạnh huyền** ứng với một góc nhọn cho trước.
- Phát biểu và dùng được định lý **Pythagoras** `a² + b² = c²` để tìm cạnh thiếu.
- Tính được `sin θ`, `cos θ`, `tan θ` cho bất kỳ tam giác vuông nào bằng cách áp dụng quy tắc **SOH-CAH-TOA**.
- Thuộc lòng **bảng giá trị đặc biệt** ở 0°, 30°, 45°, 60°, 90° — không cần máy tính.
- Chứng minh và sử dụng **đẳng thức Pythagoras** `sin²θ + cos²θ = 1` cùng hai hệ quả.
- Hiểu **hàm ngược** `arcsin`, `arccos`, `arctan` và biết vì sao `math.Atan2(y, x)` quan trọng hơn `math.Atan(y/x)` trong code.
- Nhìn thấy mối liên hệ giữa `cos θ` và **cosine similarity** sẽ học ở Tầng 4/6.

## Kiến thức tiền đề

- [Lesson 01 — Góc: độ và radian](../lesson-01-angles/): biết góc là gì, đổi qua lại giữa độ và radian.
- Tầng 1 ([Algebra](../../01-Algebra/)) — Lesson 04 (căn bậc hai), Lesson 06 (Pythagoras đã được nhắc khi tính slope).

> Bài này hoàn toàn **không** đòi hỏi máy tính bỏ túi cho phần lý thuyết. Toàn bộ giá trị đặc biệt sẽ được tính tay từ hình học.

---

## 1. Tam giác vuông — ôn lại nền

### 💡 Trực giác

Tam giác vuông là **viên gạch xây nhà** của lượng giác. Lý do: mọi tam giác bất kỳ đều có thể chia thành hai tam giác vuông bằng cách hạ đường cao, và mọi vector trong mặt phẳng đều có thể "vuông góc hóa" thành hai cạnh — một ngang, một dọc — tạo thành tam giác vuông. Hiểu sâu một tam giác vuông = hiểu mọi tam giác.

### 1.1. Định nghĩa

Tam giác vuông (right triangle) là tam giác có **đúng một góc bằng 90°**.

- Cạnh đối diện góc 90° gọi là **cạnh huyền** (hypotenuse). Nó luôn là **cạnh dài nhất** trong tam giác.
- Hai cạnh kề góc 90° (kề vào nó từ hai phía) gọi là **hai cạnh góc vuông** (legs).
- Hai góc nhọn (acute angles) còn lại có **tổng bằng 90°**. Lý do: tổng ba góc của một tam giác = 180°, mà góc vuông đã "ăn" 90°, nên hai góc còn lại phải chia nhau 90°.

```
            B
            |\
            | \
   cạnh kề  |  \   cạnh huyền
  của góc A |   \      c
    (b)     |    \
            |     \
            |______\  <- góc vuông (90°)
            C   a   A
                |
       cạnh đối của góc A
```

Nhìn từ góc nhọn **A**:

| Tên gọi | Là cạnh nào | Ý nghĩa |
|---------|-------------|---------|
| Cạnh đối (opposite) của A | `a` (đối diện A) | Cạnh không chạm vào đỉnh A |
| Cạnh kề (adjacent) của A | `b` | Cạnh kẹp giữa A và góc vuông |
| Cạnh huyền (hypotenuse) | `c` | Cạnh đối diện góc vuông |

> Một điểm dễ nhầm: "cạnh kề" của A **không phải là cạnh huyền**, dù cả hai đều chạm đỉnh A. Quy ước phân biệt: cạnh huyền luôn là cạnh đối diện góc 90°. Cạnh kề là **cạnh còn lại** chạm A — tức cạnh kẹp giữa A và góc vuông.

### 1.2. Định lý Pythagoras

Trong một tam giác vuông với hai cạnh góc vuông `a`, `b` và cạnh huyền `c`:

```
a² + b² = c²
```

- `c` luôn là **cạnh huyền** (dài nhất).
- Đọc là "bình phương cạnh huyền = tổng bình phương hai cạnh góc vuông".

### Walk-through bằng số thật (4 ví dụ)

| `a` | `b` | `a² + b²` | `c = √(a²+b²)` | Có là tam giác vuông số nguyên? |
|-----|-----|-----------|----------------|---------------------------------|
| 3   | 4   | 9 + 16 = 25 | √25 = 5      | ✓ Bộ ba 3-4-5 (kinh điển) |
| 5   | 12  | 25 + 144 = 169 | √169 = 13 | ✓ Bộ ba 5-12-13 |
| 8   | 15  | 64 + 225 = 289 | √289 = 17 | ✓ Bộ ba 8-15-17 |
| 1   | 1   | 1 + 1 = 2 | √2 ≈ 1.4142     | Không nguyên, nhưng vẫn vuông |
| 1   | √3  | 1 + 3 = 4 | √4 = 2          | Tam giác 30-60-90 (sẽ gặp lại) |

> Các bộ `(3, 4, 5)`, `(5, 12, 13)`, `(8, 15, 17)`, `(7, 24, 25)` gọi là **bộ ba Pythagore (Pythagorean triple)** — ba số nguyên thỏa mãn `a² + b² = c²`. Chúng được dùng làm "tam giác sạch" trong bài tập vì kết quả tròn.

### Chứng minh ngắn (cắt ghép hình)

Có hàng trăm cách chứng minh Pythagoras. Cách dễ hình dung nhất:

```
   Ghép 4 tam giác vuông giống nhau vào trong 1 hình vuông cạnh (a+b):

     ┌─────────────┐
     │ \         / │     - Hình vuông lớn cạnh (a+b)  → diện tích (a+b)²
     │  \   c   /  │     - Bên trong: hình vuông nhỏ cạnh c (xoay 45°)
     │   \     /   │       → diện tích c²
     │ T1 \   / T2 │     - 4 tam giác vuông, mỗi cái diện tích (a·b)/2
     │     \ /     │       → tổng 4·(a·b)/2 = 2ab
     │      X      │
     │     / \     │     Vậy: (a+b)² = c² + 2ab
     │    /   \    │           a² + 2ab + b² = c² + 2ab
     │ T3/  c  \T4 │           a² + b² = c²    ✓
     │  /       \  │
     │ /         \ │
     └─────────────┘
```

Hai vế triệt tiêu `2ab` → ra ngay `a² + b² = c²`. Không phải "dễ thấy", mà là khai triển trực tiếp.

### ⚠ Lỗi thường gặp

1. **Nhầm cạnh huyền** với một trong hai cạnh góc vuông. Cạnh huyền **luôn đối diện góc 90°** và **luôn dài nhất**. Khi cho `a = 3`, `c = 5`, đừng vội viết `b² = 5² + 3² = 34` — đó là sai. Đúng là `b² = c² − a² = 25 − 9 = 16 → b = 4`.
2. **Quên rằng Pythagoras chỉ áp dụng cho tam giác vuông**. Với tam giác bất kỳ phải dùng **định luật cosin** (sẽ học ở Lesson 04): `c² = a² + b² − 2ab·cos(C)`. Pythagoras là trường hợp đặc biệt khi `C = 90°` (vì `cos 90° = 0`).
3. **Cho rằng "3-4-5" là tỷ lệ duy nhất". Bộ ba Pythagore có vô số: `(3,4,5)`, `(6,8,10)`, `(9,12,15)`, ... — tất cả bội số của `(3,4,5)` đều là tam giác vuông.

### ❓ Câu hỏi tự nhiên

**Q1: Tại sao cạnh huyền lại dài nhất?**

Vì cạnh huyền đối diện góc lớn nhất (90°), và trong một tam giác, **cạnh đối diện góc lớn hơn thì dài hơn** (định lý cạnh-góc). Hai góc nhọn còn lại đều < 90°, nên hai cạnh đối diện chúng đều ngắn hơn cạnh huyền.

**Q2: Có thể có tam giác vuông với cạnh huyền = cạnh góc vuông không?**

Không. Nếu `c = a` thì `a² + b² = a² ⇒ b² = 0 ⇒ b = 0`. Tam giác suy biến thành một đoạn thẳng, không còn là tam giác.

**Q3: Pythagoras có dùng được khi cạnh là số vô tỉ không?**

Có. Định lý đúng cho mọi số thực dương. Ví dụ tam giác cạnh `(1, 1, √2)`: `1² + 1² = 2 = (√2)²`. Đó chính là tam giác vuông cân — sẽ dùng ngay ở mục giá trị đặc biệt 45°.

### 🔁 Dừng lại tự kiểm tra (Mục 1)

1. Cho tam giác vuông có cạnh huyền 13 và một cạnh góc vuông 5. Tìm cạnh còn lại. *(Đáp: `b² = 169 − 25 = 144 → b = 12`)*
2. Bộ `(6, 8, 10)` có là tam giác vuông không? *(Đáp: `6² + 8² = 36 + 64 = 100 = 10²` → có)*
3. Hai góc nhọn của một tam giác vuông là 35° và X°. X = ? *(Đáp: 90 − 35 = 55°)*

### 📝 Tóm tắt mục 1

- Tam giác vuông = tam giác có 1 góc 90°.
- Cạnh huyền (hypotenuse) đối diện góc 90° và là cạnh dài nhất.
- 2 góc nhọn cộng lại = 90°.
- Pythagoras: `a² + b² = c²` với `c` là huyền.
- Pythagoras là **trường hợp đặc biệt** của định luật cosin khi góc = 90°.

---

## 2. Định nghĩa sin, cos, tan qua tỉ số cạnh

### 💡 Trực giác

Cố định góc nhọn `θ` rồi vẽ một loạt tam giác vuông có cùng góc `θ` đó nhưng kích thước khác nhau (nhỏ, vừa, to). Mọi tam giác vẽ ra đều **đồng dạng** (similar) — vì có cùng các góc 90°, `θ`, và `90° − θ`. Đồng dạng nghĩa là **tỉ số giữa các cạnh không đổi**, dù tam giác có to hay nhỏ.

Vậy chỉ cần 3 tỷ số là đủ "đại diện" cho góc `θ`. Người ta đặt tên cho chúng là `sin θ`, `cos θ`, `tan θ`. Đó là toàn bộ trigonometry tam giác vuông gói gọn trong 3 dòng:

### 2.1. Ba tỷ số

Trong tam giác vuông, đứng từ góc nhọn `θ`:

```
                        opposite (đối)
    sin θ  =  ─────────────────────────────────
                       hypotenuse (huyền)

                        adjacent (kề)
    cos θ  =  ─────────────────────────────────
                       hypotenuse (huyền)

                        opposite (đối)
    tan θ  =  ─────────────────────────────────
                        adjacent (kề)
```

### Mnemonic SOH-CAH-TOA

Ba chữ cái cho mỗi hàm, rất dễ nhớ:

| Viết tắt | Ý | Công thức |
|----------|---|-----------|
| **SOH** | **S**in = **O**pposite / **H**ypotenuse | `sin θ = opp/hyp` |
| **CAH** | **C**os = **A**djacent / **H**ypotenuse | `cos θ = adj/hyp` |
| **TOA** | **T**an = **O**pposite / **A**djacent   | `tan θ = opp/adj` |

> Đọc to nhiều lần "SO-CA-TO-A" cho thuộc — trong các kỳ thi và phỏng vấn bạn không có thời gian suy luận, chỉ có 2 giây để viết ra.

### 2.2. Walk-through bằng tam giác cụ thể

**Ví dụ 1: tam giác 3-4-5**

```
            B
            |\
            | \
        4   |  \  5
            |   \
            |____\
            C  3  A   ← từ A nhìn ra:
                          opp(A) = a = 4 (đối diện A là cạnh BC = 4)
                          adj(A) = b = 3 (kề A, không phải huyền)
                          hyp   = c = 5
```

Tính từ góc A:

- `sin A = opp/hyp = 4/5 = 0.8`
- `cos A = adj/hyp = 3/5 = 0.6`
- `tan A = opp/adj = 4/3 ≈ 1.333`

Verify Pythagoras: `(4/5)² + (3/5)² = 16/25 + 9/25 = 25/25 = 1` ✓ — đây cũng đúng là `sin²A + cos²A = 1` (sẽ chứng minh ở mục 6).

**Ví dụ 2: tam giác 5-12-13**

Từ góc đối diện cạnh 5:

- `sin θ = 5/13 ≈ 0.3846`
- `cos θ = 12/13 ≈ 0.9231`
- `tan θ = 5/12 ≈ 0.4167`

Vì `5/13` nhỏ và `12/13` lớn, có thể đoán ngay `θ` là **góc nhỏ** (gần 0). Verify: `arctan(5/12) ≈ 22.6°` — đúng góc nhọn nhỏ.

**Ví dụ 3: tam giác 8-15-17**

Từ góc đối diện cạnh 15 (góc lớn hơn trong 2 góc nhọn):

- `sin θ = 15/17 ≈ 0.8824`
- `cos θ = 8/17 ≈ 0.4706`
- `tan θ = 15/8 = 1.875`

Tại đây `sin > cos` → `θ > 45°`. Verify: `arctan(15/8) ≈ 61.93°`.

**Ví dụ 4: tam giác 1-1-√2 (vuông cân)**

```
            |\
            | \
        1   |  \  √2
            |   \
            |____\
                1
```

Hai cạnh góc vuông bằng nhau → hai góc nhọn bằng nhau → mỗi góc = 45°. Tính:

- `sin 45° = 1/√2 = √2/2 ≈ 0.7071`
- `cos 45° = 1/√2 = √2/2 ≈ 0.7071`
- `tan 45° = 1/1 = 1`

`sin = cos` chính là dấu hiệu `θ = 45°`. Sẽ dùng kết quả này ở mục 4.

### 💡 Trực giác sâu hơn: vì sao gọi là "sin", "cos"?

- **sin** rút gọn từ Latin *sinus* nghĩa là "vịnh" hoặc "túi" — dịch chuyển từ tiếng Ả Rập *jiba* qua chuyển ngữ nhầm thành *jaib* (cùng âm trong Ả Rập). Hình ảnh: nếu cạnh huyền là một sợi dây cung, `sin θ` là **độ cao của dây cung so với đường nằm ngang** — đo "cong nhiều hay ít".
- **cos** = "complement sin" = sin của góc bù `90° − θ`. Vì `cos θ = sin(90° − θ)`, nó đo thành phần "ngang" trong khi sin đo thành phần "dọc".
- **tan** = "tangent" (tiếp tuyến). Khi vẽ đường tròn đơn vị (sẽ ở Lesson 03), `tan θ` chính là độ dài đoạn tiếp tuyến từ điểm trên đường tròn xuống trục — Lesson 03 sẽ chỉ rõ.

Cách hình dung trực quan nhất:

> Nắm chặt cạnh huyền. Khi `θ` rất nhỏ (≈ 0°), cạnh đối gần như không có (rất ngắn), cạnh kề trùng huyền. Vậy `sin θ ≈ 0`, `cos θ ≈ 1`.
>
> Khi `θ` tiến tới 90°, cạnh đối "vươn dài" gần bằng huyền, cạnh kề co lại còn 0. Vậy `sin θ → 1`, `cos θ → 0`.
>
> Càng tăng `θ` từ 0° đến 90°: `sin` đi từ 0 lên 1 (đơn điệu tăng), `cos` đi từ 1 xuống 0 (đơn điệu giảm).

### ❓ Câu hỏi tự nhiên

**Q1: Nếu tôi chọn tam giác to gấp đôi (6-8-10 thay vì 3-4-5), `sin` có đổi không?**

Không. `sin A = 8/10 = 0.8` (tam giác 6-8-10) = `4/5 = 0.8` (tam giác 3-4-5). Tỷ số giữ nguyên dù tam giác phóng to/thu nhỏ. Đó chính là lý do `sin/cos/tan` được định nghĩa là **hàm của góc**, không phải hàm của kích thước tam giác.

**Q2: `sin θ` có thể > 1 không?**

Trong tam giác vuông thì **không**. Vì `opp ≤ hyp` luôn đúng (cạnh đối là cạnh góc vuông, ngắn hơn cạnh huyền) → `sin = opp/hyp ≤ 1`. Tương tự `cos ≤ 1`. Còn `tan = opp/adj` thì **có thể bất kỳ giá trị nào** từ 0 đến `+∞` khi `θ → 90°` (do `adj → 0`).

**Q3: Vậy tôi có 3 hàm. Ba có thừa không? Một có suy ra hai cái còn lại?**

Có: biết `sin θ`, bạn suy ra `cos θ = √(1 − sin²θ)` (từ đẳng thức Pythagoras ở mục 6) và `tan θ = sin θ / cos θ`. Tức về mặt toán học, **một là đủ**. Lý do ta định nghĩa cả 3: tiện công thức và tiện ngữ cảnh (ví dụ slope của đường thẳng = `tan(góc với Ox)`, không tự nhiên nếu phải viết `sin/cos`).

**Q4: `tan θ = sin θ / cos θ` — chứng minh trong 1 dòng**

```
sin θ / cos θ  =  (opp/hyp) / (adj/hyp)  =  opp/hyp · hyp/adj  =  opp/adj  =  tan θ   ✓
```

### ⚠ Lỗi thường gặp

1. **Nhầm "đối" và "kề"**. Quy tắc: đứng từ góc cần tính, "đối" = cạnh không chạm góc đó; "kề" = cạnh chạm góc đó nhưng không phải huyền.
2. **Quên rằng cùng tam giác nhưng nhìn từ góc khác → tỷ số khác**. Trong tam giác 3-4-5, từ góc A (đối diện 4): `sin A = 4/5`. Nhưng từ góc B (đối diện 3): `sin B = 3/5`. Hai góc khác nhau → hai giá trị `sin` khác nhau.
3. **Áp dụng cho tam giác không vuông**. SOH-CAH-TOA chỉ đúng cho tam giác vuông. Với tam giác bất kỳ, có **định luật sin** và **định luật cosin** (Lesson 04).

### 🔁 Dừng lại tự kiểm tra (Mục 2)

1. Trong tam giác 5-12-13, tính `cos` của góc đối diện cạnh 12. *(Đáp: cạnh kề = 5, huyền = 13 → `cos = 5/13 ≈ 0.385`)*
2. Nếu `sin θ = 0.6` thì `cos θ` là bao nhiêu (giả sử `θ` nhọn)? *(Đáp: `cos θ = √(1 − 0.36) = √0.64 = 0.8`)*
3. `tan 45°` bằng bao nhiêu? *(Đáp: 1, vì tam giác vuông cân có `opp = adj`)*

### 📝 Tóm tắt mục 2

- `sin θ = opp/hyp`, `cos θ = adj/hyp`, `tan θ = opp/adj`.
- Mnemonic: **SOH-CAH-TOA**.
- Tỷ số không phụ thuộc kích thước tam giác (chỉ phụ thuộc góc).
- `0 ≤ sin θ ≤ 1`, `0 ≤ cos θ ≤ 1` (trong tam giác vuông).
- `tan θ = sin θ / cos θ`.

---

## 3. Giá trị đặc biệt 0°, 30°, 45°, 60°, 90°

### 💡 Trực giác

Có 5 góc bạn phải thuộc lòng như bảng cửu chương: **0°, 30°, 45°, 60°, 90°**. Lý do: chúng xuất hiện trong xoay ảnh, rotation matrix, RoPE positional encoding, phân tích vector — và quan trọng nhất, **được tính bằng tay từ hình học**, không cần máy tính. Bạn không thể tra `sin 30°` lúc đang vẽ bảng trên giấy.

### 3.1. Góc 45° — từ tam giác vuông cân

Tam giác vuông cân (hai cạnh góc vuông bằng nhau) → hai góc nhọn cùng = 45°. Đặt mỗi cạnh góc vuông = 1, dùng Pythagoras:

```
huyền² = 1² + 1² = 2  →  huyền = √2
```

```
        45°
         |\
         | \
       1 |  \ √2
         |   \
         |____\ 45°
            1
```

Từ định nghĩa SOH-CAH-TOA:

```
sin 45° = opp/hyp = 1/√2 = √2/2 ≈ 0.7071
cos 45° = adj/hyp = 1/√2 = √2/2 ≈ 0.7071
tan 45° = opp/adj = 1/1   = 1
```

> Vì sao viết `1/√2 = √2/2`? Quy ước "khử mẫu căn" — nhân tử và mẫu cho `√2`: `1/√2 · √2/√2 = √2/2`. Hai cách viết đều đúng, nhưng `√2/2` được coi là "dạng chuẩn".

### 3.2. Góc 30° và 60° — từ tam giác đều cắt đôi

Vẽ tam giác đều cạnh 2. Mỗi góc trong = 60°. Hạ đường cao từ một đỉnh xuống cạnh đối diện → cắt tam giác thành **hai tam giác vuông giống nhau**, mỗi cái:

- Có góc 60° (góc gốc của tam giác đều).
- Có góc 90° (do đường cao vuông góc đáy).
- Suy ra góc thứ ba = 180 − 60 − 90 = 30°.

```
           A   <- góc đỉnh A = 60°
          /|\
         / | \
        /  |  \
     2 /   |   \ 2
      /    | h  \
     /     |     \
    /______|______\
   B       D       C
   <- 1 ->|<- 1 ->
   
   Tam giác ABD vuông tại D:
     - góc B = 60°  (góc gốc)
     - góc A_trong_ABD = 30° (góc A bị chia đôi)
     - BD = 1 (đáy đã bị đường cao chia đôi từ 2 thành 1+1)
     - AB = 2 (cạnh tam giác đều)
     - AD = h (đường cao, cần tính)
```

Tìm `h` bằng Pythagoras trong tam giác `ABD`:

```
AD² + BD² = AB²
h² + 1²   = 2²
h²        = 4 − 1 = 3
h         = √3
```

Vậy tam giác vuông `ABD` có 3 cạnh: `1, √3, 2`. Đây gọi là **tam giác 30-60-90 đặc biệt**, tỉ lệ cạnh **`1 : √3 : 2`**.

```
           A (góc 30°)
           |\
           | \
       √3  |  \ 2  ← huyền
           |   \
           |____\ B (góc 60°)
              1
            (D ở đỉnh vuông)
```

Bây giờ đọc tỷ số từ **hai góc** khác nhau:

**Từ góc 60° (đỉnh B):**

- `opp(B) = AD = √3` (đối diện B)
- `adj(B) = BD = 1` (kề B, không phải huyền)
- `hyp = AB = 2`

```
sin 60° = √3 / 2 ≈ 0.8660
cos 60° = 1  / 2 = 0.5
tan 60° = √3 / 1 = √3 ≈ 1.7321
```

**Từ góc 30° (đỉnh A):**

- `opp(A) = BD = 1`
- `adj(A) = AD = √3`
- `hyp   = AB = 2`

```
sin 30° = 1  / 2 = 0.5
cos 30° = √3 / 2 ≈ 0.8660
tan 30° = 1  / √3 = √3/3 ≈ 0.5774
```

> Để ý sự **đối xứng**: `sin 30° = cos 60° = 0.5` và `cos 30° = sin 60° = √3/2`. Đó là quy tắc tổng quát `sin(90° − θ) = cos θ` (sẽ chứng minh ở Lesson 03 trên đường tròn).

### 3.3. Góc 0° và 90° — các trường hợp giới hạn

Khi `θ → 0°` thì tam giác vuông "ép phẳng" — cạnh đối co về 0, cạnh kề ≈ huyền:

```
sin 0° = 0
cos 0° = 1
tan 0° = 0/1 = 0
```

Khi `θ → 90°` thì cạnh kề co về 0, cạnh đối ≈ huyền:

```
sin 90° = 1
cos 90° = 0
tan 90° = 1/0 = không xác định (undefined)
```

> `tan 90°` không có giá trị: khi `cos = 0`, mẫu của `tan = sin/cos` bằng 0 → chia cho 0. Đồ thị `tan θ` có **đường tiệm cận đứng** tại 90°. Trong code Go, `math.Tan(math.Pi/2)` trả về một số khổng lồ (≈ 1.6e16) chứ không phải `Inf`, vì `math.Pi/2` không biểu diễn chính xác được bằng float64. Đừng tin số đó.

### 3.4. Bảng giá trị bắt buộc thuộc lòng

| `θ` (độ) | `θ` (rad) | `sin θ`         | `cos θ`         | `tan θ`         |
|---------:|----------:|:----------------|:----------------|:----------------|
| **0°**   | 0         | 0               | 1               | 0               |
| **30°**  | π/6       | **1/2**         | **√3/2**        | **√3/3** = 1/√3 |
| **45°**  | π/4       | **√2/2**        | **√2/2**        | **1**           |
| **60°**  | π/3       | **√3/2**        | **1/2**         | **√3**          |
| **90°**  | π/2       | 1               | 0               | không xác định  |

**Mẹo nhớ**: viết tử số của `sin` theo thứ tự `0, 1, 2, 3, 4`, lấy `√` rồi chia cho 2:

| `θ` | `sin θ` (theo công thức nhớ) |
|-----|------------------------------|
| 0°  | √0 / 2 = 0                   |
| 30° | √1 / 2 = 1/2                 |
| 45° | √2 / 2                       |
| 60° | √3 / 2                       |
| 90° | √4 / 2 = 2/2 = 1             |

`cos θ` ngược lại (viết tử số 4, 3, 2, 1, 0 rồi căn / 2). `tan θ = sin θ / cos θ`, tính nhanh.

### ⚠ Lỗi thường gặp

1. **Nhớ nhầm `sin 30°` với `sin 60°`**. Lý do: cả hai liên quan đến tam giác 30-60-90 và đều có dạng "phân số có 2 ở mẫu". Nhớ chốt:
   > `sin 30° = 0.5` (rõ ràng nhỏ vì 30° là góc nhỏ).
   > `sin 60° = √3/2 ≈ 0.866` (gần 1 vì 60° là góc lớn).
2. **Quên `tan 90°` không tồn tại**. Khi gặp công thức có `tan(...)` và `...` có thể tiến đến 90°, phải xét đặc biệt.
3. **Viết `√2/2` thành `2/√2`** — đúng về toán nhưng "phi chuẩn". Quy ước: khử mẫu căn, đáp án cuối ở dạng tử số có căn.

### ❓ Câu hỏi tự nhiên

**Q1: Vì sao chỉ ưu tiên các góc 30, 45, 60? Tại sao không phải 20, 50, 80?**

Vì 30, 45, 60 có **giá trị đóng dạng đại số đẹp** (1/2, √2/2, √3/2). Các góc khác (như 20°) có `sin` là một số vô tỉ phức tạp, chỉ tính được gần đúng. Trong tính toán giải tích và trong thiết kế (rotation matrix, đường chéo hình vuông, tam giác đều), các góc 30/45/60 xuất hiện rất tự nhiên — toán học "ưu ái" chúng vì hình học chuẩn (hình vuông, tam giác đều) cho ra chúng.

**Q2: Tôi cần thuộc lòng cả radian lẫn độ?**

Có, vì ngữ cảnh khác nhau:

- Trong hình học và lập trình GUI/web: **độ**.
- Trong toán cao cấp, đạo hàm, ML library (`numpy`, Go `math`): **radian**. `math.Sin(x)` trong Go nhận radian.

Cố gắng "song ngữ" — khi nghĩ `30°` luôn liên tưởng `π/6`.

**Q3: Sau bảng này, bao giờ cần biết `sin 22°`?**

Trong các bài đo đạc thực tế, đúng — không có bảng tay nào. Lúc đó dùng `math.Sin(22 * math.Pi / 180)`. Bảng tay chỉ phục vụ tính nhanh và để bạn **không bị lệ thuộc máy tính** khi suy luận lý thuyết.

### 🔁 Dừng lại tự kiểm tra (Mục 3)

1. `sin 60° + cos 30°` = ? *(Đáp: `√3/2 + √3/2 = √3`)*
2. `tan 45° · sin 30°` = ? *(Đáp: `1 · 0.5 = 0.5`)*
3. Một thang nghiêng 45°, dài 4m. Chân thang cách tường bao nhiêu? *(Đáp: `adj = 4·cos 45° = 4·√2/2 = 2√2 ≈ 2.83m`)*

### 📝 Tóm tắt mục 3

- Tam giác vuông cân (45-45-90) có tỉ lệ cạnh `1 : 1 : √2`.
- Tam giác 30-60-90 có tỉ lệ cạnh `1 : √3 : 2`.
- Mẹo nhớ: `sin θ = √k/2` với `k = 0, 1, 2, 3, 4` cho `θ = 0°, 30°, 45°, 60°, 90°`.
- `tan 90°` không xác định.
- `sin 30° = cos 60° = 0.5`; `sin 60° = cos 30° = √3/2`.

---

## 4. Các hàm phụ: cotangent, secant, cosecant

### 💡 Trực giác

Ba hàm này là **nghịch đảo** của ba hàm chính. Trong ML/AI ngày nay, chúng **ít dùng**, nhưng vẫn xuất hiện trong sách giáo khoa và một số chứng minh, nên đáng biết.

### 4.1. Định nghĩa

```
cot θ  =  1 / tan θ  =  cos θ / sin θ  =  adj / opp
sec θ  =  1 / cos θ  =  hyp / adj
csc θ  =  1 / sin θ  =  hyp / opp
```

(`csc` = cosecant; một số nơi viết `cosec`.)

### 4.2. Walk-through cho `θ = 30°`

| Hàm | Giá trị | Tính bằng |
|-----|---------|-----------|
| `cot 30°` | `√3 ≈ 1.732`     | `1/tan 30° = 1/(√3/3) = 3/√3 = √3` |
| `sec 30°` | `2/√3 = 2√3/3 ≈ 1.155` | `1/cos 30° = 1/(√3/2) = 2/√3` |
| `csc 30°` | `2`              | `1/sin 30° = 1/(1/2) = 2` |

### 4.3. Khi nào không xác định?

- `cot θ` không xác định khi `sin θ = 0` (tức `θ = 0°, 180°, ...`).
- `sec θ` không xác định khi `cos θ = 0` (tức `θ = 90°, 270°, ...`).
- `csc θ` không xác định khi `sin θ = 0` (như `cot`).

### ⚠ Lưu ý

- `sec` và `cos` chứ không phải `sec` ↔ `sin`. Tên gây nhầm: "secant" gợi "sin" nhưng thực ra là nghịch đảo `cos`. Lý do lịch sử (cách dựng hình từ thời cổ đại).
- Trong Go, **không có** sẵn `math.Cot`, `math.Sec`, `math.Csc`. Phải tự định nghĩa nếu cần: `cot := 1.0/math.Tan(x)`.

### 📝 Tóm tắt mục 4

- 3 hàm phụ là nghịch đảo: `cot = 1/tan`, `sec = 1/cos`, `csc = 1/sin`.
- Ít dùng trong code ML, không có sẵn trong `math` của Go.
- Cần để hiểu một số đẳng thức cổ điển ở mục 6.

---

## 5. Pythagorean identity — đẳng thức QUAN TRỌNG NHẤT

### 💡 Trực giác

Đây là **đẳng thức trung tâm của trigonometry**, sẽ xuất hiện ở mọi bài sau (Lesson 03 dùng để chứng minh điểm di chuyển trên đường tròn; Lesson 04 dùng cho định luật cosin; Lesson 05 dùng để rút gọn công thức cộng góc; Tầng 4 dùng để chuẩn hóa vector).

Phát biểu:

```
sin²θ + cos²θ = 1     (đúng với mọi góc θ, kể cả âm, lớn hơn 90°, vô tỉ ...)
```

> Lưu ý cách viết: `sin²θ` nghĩa là `(sin θ)²`, **không phải** `sin(sin θ)` hay `sin(θ²)`. Đây là quy ước cổ điển của trigonometry.

### 5.1. Chứng minh từ Pythagoras

Lấy tam giác vuông với cạnh `a` (opp), `b` (adj), `c` (hyp). Theo Pythagoras (mục 1.2):

```
a² + b² = c²
```

Chia cả hai vế cho `c²` (được phép vì `c > 0`):

```
a²/c² + b²/c² = c²/c²
(a/c)² + (b/c)² = 1
```

Nhưng `a/c = sin θ` và `b/c = cos θ` (theo định nghĩa SOH-CAH-TOA). Vậy:

```
sin²θ + cos²θ = 1     ✓
```

Chứng minh xong. Mỗi bước đều có lý do rõ — không có "dễ thấy".

### 5.2. Verify bằng số ở các góc đặc biệt

| `θ` | `sin θ` | `cos θ` | `sin²θ` | `cos²θ` | Tổng |
|-----|---------|---------|---------|---------|------|
| 0°  | 0       | 1       | 0       | 1       | 1 ✓  |
| 30° | 1/2     | √3/2    | 1/4     | 3/4     | 1 ✓  |
| 45° | √2/2    | √2/2    | 1/2     | 1/2     | 1 ✓  |
| 60° | √3/2    | 1/2     | 3/4     | 1/4     | 1 ✓  |
| 90° | 1       | 0       | 1       | 0       | 1 ✓  |

Tất cả đều cộng đúng 1 — bằng chứng số học cho đẳng thức.

### 5.3. Hai hệ quả

**Hệ quả 1: `1 + tan²θ = sec²θ`**

Chứng minh: chia cả hai vế của `sin²θ + cos²θ = 1` cho `cos²θ` (đòi `cos θ ≠ 0`):

```
sin²θ/cos²θ + cos²θ/cos²θ = 1/cos²θ
(sin θ/cos θ)² + 1        = (1/cos θ)²
tan²θ + 1                 = sec²θ        ✓
```

**Verify cho `θ = 30°`:**

- `tan 30° = 1/√3 → tan²30° = 1/3`
- `sec 30° = 2/√3 → sec²30° = 4/3`
- `1 + 1/3 = 4/3` ✓

**Hệ quả 2: `1 + cot²θ = csc²θ`**

Chứng minh: chia hai vế của `sin²θ + cos²θ = 1` cho `sin²θ` (đòi `sin θ ≠ 0`):

```
1 + cot²θ = csc²θ        ✓
```

**Verify cho `θ = 30°`:**

- `cot 30° = √3 → cot²30° = 3`
- `csc 30° = 2 → csc²30° = 4`
- `1 + 3 = 4` ✓

### 5.4. Vì sao đẳng thức này quan trọng

- **Cho phép chuyển đổi qua lại giữa `sin` và `cos`**: nếu biết `sin θ = 0.6` (và biết `θ` là góc nhọn), ta tính ngay `cos θ = √(1 − 0.36) = 0.8`. Không cần đo cạnh hay máy tính.
- **Bảo toàn năng lượng / chuẩn vector**: trong vật lý, `sin²` và `cos²` thường biểu diễn năng lượng theo hai phương trục — tổng phải bằng tổng năng lượng (= 1 sau chuẩn hóa).
- **Trong ML**: dùng trong RoPE positional encoding — đảm bảo vector quay không đổi độ dài (`‖v‖² = sin² + cos² = 1`, sẽ thấy ở Lesson 06).

### ❓ Câu hỏi tự nhiên

**Q1: Đẳng thức có đúng khi `θ > 90°` không? Tam giác vuông không có góc nhọn nào > 90°.**

Có. Khi mở rộng `sin` và `cos` ra ngoài tam giác vuông (bằng đường tròn đơn vị — Lesson 03), đẳng thức vẫn đúng. Chứng minh ở Lesson 03: trên đường tròn đơn vị, mỗi điểm có tọa độ `(cos θ, sin θ)` và **trên đường tròn đơn vị, mọi điểm thỏa `x² + y² = 1`** → đẳng thức luôn đúng.

**Q2: Còn `θ` âm?**

Đúng luôn. `cos(-θ) = cos θ` và `sin(-θ) = -sin θ`, nên `sin²(-θ) + cos²(-θ) = sin²θ + cos²θ = 1`.

**Q3: Có công thức tương tự cho `tan`?**

Có, chính là Hệ quả 1: `tan²θ = sec²θ − 1`. Dùng khi trong tích phân và đạo hàm cần thay `1 + tan²` bằng `sec²`.

### 🔁 Dừng lại tự kiểm tra (Mục 5)

1. `sin θ = 0.6`, `θ` nhọn. Tính `cos θ` và `tan θ`. *(Đáp: `cos θ = 0.8`, `tan θ = 0.6/0.8 = 0.75`)*
2. Chứng minh `sin θ · csc θ = 1` cho mọi `θ` mà `sin θ ≠ 0`. *(Đáp: `csc θ = 1/sin θ → sin θ · (1/sin θ) = 1`)*
3. Đúng/Sai: `sin²30° + cos²30° = sin²60° + cos²60°`. *(Đáp: Đúng — cả hai đều bằng 1)*

### 📝 Tóm tắt mục 5

- `sin²θ + cos²θ = 1` đúng cho mọi `θ`.
- Suy ra `1 + tan²θ = sec²θ` và `1 + cot²θ = csc²θ`.
- Dùng để chuyển đổi `sin ↔ cos` khi biết một trong hai.
- Là nền cho định nghĩa "đường tròn đơn vị" (Lesson 03) và chuẩn hóa vector (Tầng 4).

---

## 6. Hàm ngược: `arcsin`, `arccos`, `arctan`

### 💡 Trực giác

`sin`, `cos`, `tan` đi từ **góc → tỉ số**. Trong nhiều bài toán thực tế, ta cần đi ngược: **biết tỉ số (đo được từ thực tế) → tìm góc**.

Ví dụ: bạn đứng cách tòa nhà 100m, ngước lên thấy đỉnh tòa nhà ở độ cao 60m. Hỏi góc nâng (góc giữa đường ngắm và mặt đất)?

```
tan θ = đối/kề = 60/100 = 0.6
θ = arctan(0.6) ≈ 30.96°
```

Hàm `arctan` (đọc là "arc tangent") trả lời câu hỏi: "góc nào có `tan` bằng 0.6?".

### 6.1. Định nghĩa

| Hàm | Ký hiệu | Đọc | Ý nghĩa |
|-----|---------|-----|---------|
| arcsin | `arcsin x` hoặc `sin⁻¹ x` | "arc sin" | Tìm `θ` sao cho `sin θ = x` |
| arccos | `arccos x` hoặc `cos⁻¹ x` | "arc cos" | Tìm `θ` sao cho `cos θ = x` |
| arctan | `arctan x` hoặc `tan⁻¹ x` | "arc tan" | Tìm `θ` sao cho `tan θ = x` |

> Cảnh báo: `sin⁻¹ x` **không có nghĩa là** `1/sin x`. Đó là ký hiệu hàm ngược, **không phải nghịch đảo số học**. Để tránh nhầm lẫn, ưu tiên viết `arcsin` (mà code Go và Python cũng dùng `asin`).

### 6.2. Vấn đề "nhiều nghiệm" và phạm vi (range)

Bài toán: tìm `θ` sao cho `sin θ = 0.5`.

Có **vô số** đáp án: `θ = 30°, 150°, 390°, 510°, -210°, ...` (vì `sin` lặp chu kỳ 360°, và đối xứng qua 90°).

Để hàm ngược **xác định một-một**, ta phải giới hạn `θ` về một đoạn:

| Hàm    | Domain (miền vào)  | Range (miền ra)        |
|--------|--------------------|------------------------|
| arcsin | `[-1, 1]`          | `[-π/2, π/2]` = `[-90°, 90°]` |
| arccos | `[-1, 1]`          | `[0, π]` = `[0°, 180°]` |
| arctan | `(-∞, +∞)`         | `(-π/2, π/2)` = `(-90°, 90°)` |

- `arcsin(0.5) = π/6 = 30°` (chỉ giá trị này trong khoảng cho phép, không phải 150°).
- `arccos(0.5) = π/3 = 60°` (vì `cos 60° = 0.5`).
- `arctan(1) = π/4 = 45°` (vì `tan 45° = 1`).

### 6.3. Walk-through 5 ví dụ

| Biểu thức           | Tính                       | Kết quả   |
|---------------------|----------------------------|-----------|
| `arcsin(1)`         | `sin θ = 1 → θ = 90°`     | π/2 (90°) |
| `arcsin(0.5)`       | `sin θ = 1/2 → θ = 30°`   | π/6 (30°) |
| `arccos(0)`         | `cos θ = 0 → θ = 90°`     | π/2 (90°) |
| `arccos(-1)`        | `cos θ = -1 → θ = 180°`   | π (180°)  |
| `arctan(√3)`        | `tan θ = √3 → θ = 60°`    | π/3 (60°) |

### 6.4. `arctan` vs `Atan2` — vấn đề chia cho 0 và quadrant

Trong code Go, có **hai hàm**:

```go
math.Atan(y / x)       // 1 đối số
math.Atan2(y, x)       // 2 đối số (chú ý: y trước, x sau)
```

`math.Atan` nhận một tỉ số `y/x` và trả về `θ ∈ (-π/2, π/2)`. Vấn đề:

1. **`x = 0` → chia cho 0**. Trong Go, `0.0/0.0` ra `NaN`; còn `1.0/0.0` ra `+Inf`. Atan(NaN) = NaN. Code crash.
2. **Mất thông tin quadrant**. Với điểm `(x, y) = (1, 1)` và `(-1, -1)`, cả hai có `y/x = 1`. Atan cho cùng đáp án `π/4 = 45°`. Nhưng thực tế hai điểm này nằm ở **hai góc đối nhau** (góc thật là 45° và 225° tương ứng).

`math.Atan2(y, x)` xử lý cả hai:

```
Atan2(1, 1)    → π/4 (45°)     — quadrant I
Atan2(1, -1)   → 3π/4 (135°)   — quadrant II
Atan2(-1, -1)  → -3π/4 (-135°) — quadrant III
Atan2(-1, 1)   → -π/4 (-45°)   — quadrant IV
Atan2(1, 0)    → π/2 (90°)     — trục Oy dương, không crash
Atan2(0, 0)    → 0 (quy ước)
```

`Atan2` trả về `θ ∈ (-π, π]` — đầy đủ toàn vòng tròn. Nó nhận **dấu của cả `x` và `y`** để xác định quadrant.

> **Quy tắc thực hành**: trong mọi code computer graphics, computer vision, robotics, ML có liên quan tọa độ — **luôn dùng `Atan2(y, x)`**, không dùng `Atan(y/x)`. Trừ khi bạn chắc chắn `x > 0`.

### ❓ Câu hỏi tự nhiên

**Q1: `arcsin(2)` có giá trị không?**

Không. Domain của `arcsin` là `[-1, 1]` (vì `sin θ ≤ 1`). Trong Go, `math.Asin(2)` trả về `NaN`.

**Q2: Vì sao `arccos` có range `[0, π]` mà `arcsin` lại là `[-π/2, π/2]`?**

Vì người ta cố tình chọn khoảng để hàm là **đơn điệu** (tăng đều hoặc giảm đều) trên khoảng đó:

- `sin` tăng đều trên `[-π/2, π/2]` từ -1 đến 1 → chọn khoảng này cho arcsin.
- `cos` giảm đều trên `[0, π]` từ 1 đến -1 → chọn khoảng này cho arccos.

Cả hai quy ước đều phổ thông, được dùng nhất quán trong mọi thư viện toán học.

**Q3: `arctan` trả về `(-π/2, π/2)` — ngoặc tròn ở hai đầu, vì sao?**

Vì `tan(±π/2)` **không xác định** (chia cho 0), nên `arctan` không bao giờ trả về đúng `±π/2`. Khi đầu vào tiến tới `±∞`, đầu ra tiến tới `±π/2` nhưng không bao giờ chạm. Ngoặc tròn `(...)` là **khoảng mở**, ký hiệu cho "không bao gồm hai đầu".

### ⚠ Lỗi thường gặp

1. **Quên đổi đơn vị**. Go `math.Asin` trả về **radian**. Nếu cần độ phải nhân `180/π`. Đừng nhầm `arcsin(0.5) = 30°` (đúng) với `30` (Go trả về 0.5236 rad, không phải 30).
2. **Dùng `Atan` cho `(x, y)` có `x < 0`**. Sẽ trả về sai quadrant. Luôn `Atan2(y, x)`.
3. **Quên kiểm tra domain**. `arcsin(1.0001)` (do lỗi làm tròn float) → NaN. Trong code nên `math.Min(1.0, math.Max(-1.0, x))` trước khi gọi `Asin`.

### 🔁 Dừng lại tự kiểm tra (Mục 6)

1. `arcsin(√2/2)` bằng bao nhiêu (theo độ)? *(Đáp: 45°)*
2. `Atan2(0, -1)` bằng bao nhiêu? *(Đáp: π — điểm (-1, 0) nằm trên trục Ox âm)*
3. Một robot biết vị trí mục tiêu `(x, y) = (-3, 4)` từ gốc. Tính góc hướng (so với trục Ox dương) bằng Atan2. *(Đáp: `Atan2(4, -3) ≈ 2.214 rad ≈ 126.87°` — quadrant II)*

### 📝 Tóm tắt mục 6

- `arcsin/arccos/arctan` đảo ngược `sin/cos/tan`, có range giới hạn để xác định một-một.
- `arcsin: [-1, 1] → [-90°, 90°]`; `arccos: [-1, 1] → [0°, 180°]`; `arctan: ℝ → (-90°, 90°)`.
- `Atan2(y, x)` luôn ưu tiên hơn `Atan(y/x)` trong code: tránh chia 0, đúng quadrant.
- Trong Go: `math.Asin`, `math.Acos`, `math.Atan`, `math.Atan2` — đầu ra **radian**.

---

## 7. Ứng dụng cổ điển

### 7.1. Tính chiều cao tòa nhà

Bạn đứng cách tòa nhà `d = 50m` (khoảng cách nằm ngang đến chân tòa), ngước nhìn lên đỉnh, dùng dụng cụ đo được **góc nâng** (angle of elevation) `θ = 35°` (góc giữa đường ngắm và mặt đất). Hỏi chiều cao tòa nhà `h`?

```
              ┌── đỉnh tòa
              │
              │ h
              │
   bạn -------+
      \  θ
       \
        \---- d = 50m -----+
                           
   tan θ = đối / kề = h / d
   →   h = d · tan θ = 50 · tan 35° ≈ 50 · 0.7002 ≈ 35.01m
```

### 7.2. Laser rangefinder

Một laser bắn từ điểm A đến điểm B, đo được khoảng cách `c = 12m`. Góc giữa tia laser và mặt đất là `θ = 22°`. Tính khoảng cách ngang giữa A và hình chiếu của B xuống mặt đất.

```
adj = c · cos θ = 12 · cos 22° ≈ 12 · 0.9272 ≈ 11.13m
```

Hai ứng dụng tiêu biểu. Trong AI/ML, các phép tính này tổng quát hơn xuất hiện trong:

- **Computer vision**: tính khoảng cách camera-vật từ disparity (stereo).
- **Robotics**: SLAM, odometry — robot tính vị trí hiện tại từ tốc độ và góc lái.
- **Animation**: keyframe interpolation.

### 📝 Tóm tắt mục 7

- `tan θ = đối/kề` dùng để tính chiều cao khi biết khoảng cách và góc.
- `cos θ = kề/huyền` dùng để chiếu vector lên trục.
- Đây là các phép tính nền cho computer vision và robotics.

---

## 8. Liên hệ với Tầng sau — Machine Learning & AI

### 8.1. Cosine similarity (Tầng 4 & Tầng 6)

Trong Tầng 4 (Linear Algebra) và Tầng 6 (AI/ML), khi xử lý embedding (vector biểu diễn từ hoặc câu), một độ đo quan trọng là **cosine similarity**:

```
                a · b
cos_sim(a, b) = ─────────
                ‖a‖ · ‖b‖
```

Đây chính là `cos θ` với `θ` là **góc giữa hai vector**. Tại sao quan trọng?

| Góc giữa 2 vector | `cos θ` | Ý nghĩa |
|-------------------|---------|---------|
| 0°                | 1       | Cùng hướng → 2 vector "rất giống nhau" |
| 90°               | 0       | Vuông góc → "không liên quan" |
| 180°              | -1      | Ngược chiều → "đối lập" |

Trong RAG (retrieval-augmented generation), khi tìm tài liệu liên quan đến câu hỏi:

1. Encode câu hỏi → vector `q`.
2. So `q` với mọi tài liệu `d_i` qua `cos_sim(q, d_i)`.
3. Top-k tài liệu có cosine cao nhất → context cho LLM.

Hiểu `cos θ` là **tỉ số kề/huyền** giúp bạn hình dung: hai vector hợp với nhau một "tam giác vuông trong không gian nhiều chiều", và cosine đo "hai vector cùng hướng tới mức nào".

### 8.2. Đường tròn đơn vị & Positional encoding (Lesson 03 + Tầng 6)

`sin` và `cos` tổng quát hóa từ tam giác vuông ra đường tròn đơn vị (Lesson 03). Trên đường tròn, mỗi điểm có tọa độ `(cos θ, sin θ)` và quay đều theo `θ`.

Trong Transformer, **positional encoding** sin/cos cho mỗi vị trí `pos` trong câu được mã hóa thành vector dạng:

```
PE(pos, 2i)   = sin(pos / 10000^(2i/d))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d))
```

Lý do dùng sin/cos: hai vị trí gần nhau có vector PE gần nhau; vị trí xa nhau → góc xoay khác nhau. Đây là ứng dụng trực tiếp của tính chu kỳ và đồng dạng của sin/cos đã học. Lesson 06 sẽ đi vào RoPE — phiên bản xoay thay vì cộng.

### 📝 Tóm tắt mục 8

- `cos θ` xuất hiện ở cosine similarity — đo độ giống nhau giữa hai vector ML.
- `sin/cos` được dùng để encode vị trí (positional encoding) trong Transformer.
- Hai góc nhìn — hình học tam giác (bài này) và đường tròn (Lesson 03) — là **một**.

---

## 9. Bài tập

> Làm trước, đối chiếu với lời giải ở mục 10.

**Bài 1.** Cho tam giác vuông có 3 cạnh 3, 4, 5. Tính `sin`, `cos`, `tan` của:
   (a) Góc đối diện cạnh 3.
   (b) Góc đối diện cạnh 4.
   Kiểm chứng `sin²A + cos²A = 1` cho mỗi góc.

**Bài 2.** Một cái thang dài 5m, tựa vào tường, tạo góc 60° với mặt đất.
   (a) Chiều cao chân thang lên tường là bao nhiêu?
   (b) Khoảng cách chân thang tới chân tường là bao nhiêu?
   (c) Nếu chiều cao tường là 6m, thang có chạm đỉnh tường không?

**Bài 3.** Chứng minh tay (không dùng máy tính) rằng `tan² 30° + 1 = sec² 30°`.

**Bài 4.** Tính `sin 15°`. *Gợi ý*: dùng công thức `sin(A − B) = sin A · cos B − cos A · sin B` (sẽ được chứng minh chính thức ở Lesson 05). Áp dụng `A = 45°`, `B = 30°`.

**Bài 5.** Trong Go, viết hàm:
```go
func triangleSides(hypotenuse, angleDeg float64) (opp, adj float64)
```
trả về hai cạnh góc vuông khi biết cạnh huyền và một góc nhọn (tính bằng độ). Test với input `(5, 60.0)` và in kết quả ra console kèm phép kiểm chứng Pythagoras.

**Bài 6.** Tại sao `math.Atan2(y, x)` thường được dùng thay `math.Atan(y/x)` trong ML và computer graphics? Cho hai ví dụ cụ thể `(x, y)` mà `Atan(y/x)` cho kết quả khác (sai) so với `Atan2(y, x)`. Giải thích vì sao.

---

## 10. Lời giải chi tiết

### Bài 1.

Đặt tên tam giác:

```
            C
            |\
            | \
        4   |  \  5
            |   \
            |____\
            B  3  A
```

(`B` là góc vuông, cạnh đối diện B là cạnh huyền `c = 5`. Cạnh `a = BC = 4` đối diện đỉnh A, cạnh `b = CA = 3`... thực ra ta đặt lại cho rõ.)

Đặt: cạnh đối diện đỉnh `A` ký hiệu là `a = 3` (BC), đối diện `B` là `b = 4`... — quy ước này không quan trọng. Quan trọng là **góc đối diện cạnh 3** và **góc đối diện cạnh 4**.

Gọi:
- `α` = góc đối diện cạnh 3 → cạnh đối của `α` = 3, cạnh kề = 4, huyền = 5.
- `β` = góc đối diện cạnh 4 → cạnh đối của `β` = 4, cạnh kề = 3, huyền = 5.

**(a) Góc `α`:**

```
sin α = 3/5 = 0.6
cos α = 4/5 = 0.8
tan α = 3/4 = 0.75
```

Verify: `sin²α + cos²α = 0.36 + 0.64 = 1.00` ✓.

`α = arcsin(0.6) ≈ 36.87°`.

**(b) Góc `β`:**

```
sin β = 4/5 = 0.8
cos β = 3/5 = 0.6
tan β = 4/3 ≈ 1.333
```

Verify: `sin²β + cos²β = 0.64 + 0.36 = 1.00` ✓.

`β = arcsin(0.8) ≈ 53.13°`.

Kiểm chứng: `α + β = 36.87 + 53.13 = 90.00°` ✓ (hai góc nhọn cộng = 90°).

### Bài 2.

Thang là cạnh huyền `c = 5m`, góc với mặt đất `θ = 60°`.

```
   |  tường
   |
   | h = opp
   |
   |          5m (thang)
   |        /
   |      /
   |    /
   |  /
   |/ θ=60°
   +─── d = adj ──── mặt đất
```

**(a) Chiều cao `h`:** `h` là cạnh **đối** của góc 60° (cạnh đối diện đỉnh tạo bởi thang và mặt đất).

```
sin 60° = h / 5
h = 5 · sin 60° = 5 · √3/2 = 5√3/2 ≈ 4.330m
```

**(b) Khoảng cách `d`:** cạnh **kề** của góc 60°.

```
cos 60° = d / 5
d = 5 · cos 60° = 5 · 1/2 = 2.5m
```

Verify Pythagoras: `h² + d² = (5√3/2)² + 2.5² = 75/4 + 25/4 = 100/4 = 25 = 5²` ✓.

**(c) Chiều cao tường 6m, thang lên tới 4.33m → thang không chạm đỉnh** (còn thiếu 1.67m).

### Bài 3.

Cần chứng minh `tan² 30° + 1 = sec² 30°` bằng cách tính trực tiếp cả hai vế.

**Tính `tan² 30°`:**

```
tan 30° = √3/3        (từ bảng giá trị đặc biệt)
tan² 30° = (√3/3)² = 3/9 = 1/3
```

**Tính `sec² 30°`:**

```
cos 30° = √3/2
sec 30° = 1/cos 30° = 2/√3 = 2√3/3
sec² 30° = (2√3/3)² = (4·3)/9 = 12/9 = 4/3
```

**So sánh:**

```
tan² 30° + 1 = 1/3 + 1 = 1/3 + 3/3 = 4/3
sec² 30°     = 4/3
→ tan² 30° + 1 = sec² 30° = 4/3  ✓
```

### Bài 4.

Dùng `sin(A − B) = sin A · cos B − cos A · sin B`. Đặt `A = 45°`, `B = 30°`, vậy `A − B = 15°`:

```
sin 15° = sin(45° − 30°)
        = sin 45° · cos 30° − cos 45° · sin 30°
        = (√2/2)(√3/2) − (√2/2)(1/2)
        = (√2 · √3)/4 − (√2 · 1)/4
        = √6/4 − √2/4
        = (√6 − √2)/4
```

Số học: `√6 ≈ 2.449`, `√2 ≈ 1.414`. Vậy `sin 15° ≈ (2.449 − 1.414)/4 ≈ 1.035/4 ≈ 0.2588`. Đối chiếu máy tính: `sin 15° = 0.25882...` ✓.

### Bài 5.

```go
package main

import (
    "fmt"
    "math"
)

func triangleSides(hypotenuse, angleDeg float64) (opp, adj float64) {
    theta := angleDeg * math.Pi / 180 // đổi độ → radian
    opp = hypotenuse * math.Sin(theta)
    adj = hypotenuse * math.Cos(theta)
    return
}

func main() {
    h, deg := 5.0, 60.0
    opp, adj := triangleSides(h, deg)
    fmt.Printf("hyp=%.4f, θ=%.1f°\n", h, deg)
    fmt.Printf("  opp = %.4f (kỳ vọng: 5·sin60° = 5·√3/2 ≈ 4.3301)\n", opp)
    fmt.Printf("  adj = %.4f (kỳ vọng: 5·cos60° = 5·0.5  = 2.5000)\n", adj)
    fmt.Printf("  opp²+adj² = %.4f (kỳ vọng: hyp² = 25)\n", opp*opp+adj*adj)
}
```

Kết quả mong đợi:

```
hyp=5.0000, θ=60.0°
  opp = 4.3301 (kỳ vọng: 5·sin60° = 5·√3/2 ≈ 4.3301)
  adj = 2.5000 (kỳ vọng: 5·cos60° = 5·0.5  = 2.5000)
  opp²+adj² = 25.0000 (kỳ vọng: hyp² = 25)
```

### Bài 6.

**Lý do dùng `Atan2(y, x)`:**

1. **Tránh chia cho 0**: khi `x = 0`, biểu thức `y/x` sẽ là `Inf` hoặc `NaN` trong float. `Atan2(y, 0)` xử lý đặc biệt và trả về `±π/2` tùy dấu của `y`.
2. **Giữ đúng quadrant**: `y/x` mất thông tin dấu (vì cả `(y, x)` và `(-y, -x)` cho cùng tỉ số). `Atan2` dùng dấu của cả 2 đối số → xác định đúng 1 trong 4 quadrant.

**Hai ví dụ cụ thể:**

**Ví dụ A — Mất quadrant:**

Lấy điểm `P1 = (1, 1)` (quadrant I) và `P2 = (-1, -1)` (quadrant III).

```
P1: y/x = 1/1 = 1   →  Atan(1) = π/4 = 45°
P2: y/x = -1/-1 = 1 →  Atan(1) = π/4 = 45°    (SAI! P2 phải là 225° hoặc -135°)
```

Với Atan2:
```
Atan2(1, 1)   = π/4   = 45°    ✓ (đúng quadrant I)
Atan2(-1, -1) = -3π/4 = -135°  ✓ (đúng quadrant III)
```

**Ví dụ B — Chia cho 0:**

Lấy điểm `P3 = (0, 1)` (trên trục Oy dương).

```
Atan(1/0) → Atan(+Inf) — về mặt giới hạn = π/2, nhưng trong code: 1.0/0.0 = +Inf, Atan(+Inf) ≈ π/2.
                          OK ở đây, nhưng nếu code logic không cẩn thận Inf sẽ lan ra nơi khác và crash.

Atan2(1, 0) = π/2     ✓ (xử lý case x=0 trực tiếp, không gặp Inf)
```

Còn `P4 = (0, 0)` thì sao? `Atan(0/0)` = `Atan(NaN)` = `NaN` (crash logic). `Atan2(0, 0)` = `0` theo quy ước Go (không crash, dù về toán là không xác định).

**Trong ML/CV ứng dụng**: tính hướng của optical flow vector tại mỗi pixel `(u, v)` — `θ = Atan2(v, u)`. Với nhiều pixel có `u = 0` hoặc `(u, v) = (0, 0)`, dùng `Atan(v/u)` sẽ làm hỏng pipeline.

---

## 11. Liên kết

- Code lời giải: [solutions.go](./solutions.go)
- Trực quan hóa tương tác: [visualization.html](./visualization.html)
- Lesson trước: [Lesson 01 — Góc: độ và radian](../lesson-01-angles/)
- Lesson sau: [Lesson 03 — Đường tròn đơn vị](../lesson-03-unit-circle/) — mở rộng sin/cos ra mọi góc, không chỉ góc nhọn.
- Liên hệ tầng sau:
  - Tầng 4 Linear Algebra — cosine similarity sẽ học chính thức.
  - Tầng 6 AI/ML — RoPE positional encoding, transformer attention.
