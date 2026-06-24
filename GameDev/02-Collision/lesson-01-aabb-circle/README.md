# Lesson 06 — Collision: AABB & Circle (phát hiện va chạm hình cơ bản)

> **Đây là bài MỞ ĐẦU của Tier 2 — Collision (va chạm).** Tier 1 dạy vật **di chuyển**
> thế nào (vector, lực, tích phân). Tier 2 trả lời câu hỏi tiếp theo: **hai vật có chạm
> nhau không, và khi chạm thì chạm ở đâu?** Đây là viên gạch đầu tiên.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** game không kiểm tra va chạm theo từng pixel, mà dùng **hình bao (bounding shape)** đơn giản.
- Cài đặt **AABB overlap test** (hộp thẳng trục): hai hộp chồng nhau khi và chỉ khi chồng **cả trục x VÀ trục y**.
- Cài đặt **circle-circle test** bằng **khoảng cách bình phương** ($dx^2 + dy^2 < (r_1+r_2)^2$) để **tránh `sqrt`**.
- Cài đặt **circle-AABB test** bằng kỹ thuật **điểm gần nhất (clamp)**.
- Hiểu **point-in-shape** (điểm nằm trong hộp/tròn) và sơ lược **penetration depth (độ lún)** — dữ liệu cần cho phản ứng va chạm ([L09](../lesson-04-collision-response/)).
- Phân biệt **narrow-phase** (bài này) với **broad-phase** ([L08](../lesson-03-spatial-partitioning/)) và **collision response** ([L09](../lesson-04-collision-response/)).

## Kiến thức tiền đề

- [L02 — Vectors & Kinematics](../../01-Motion/lesson-02-vectors-kinematics/) — vị trí là vector $(x, y)$; hiệu hai vị trí là vector $\vec{d} = (dx, dy)$.
- [Vectors/04 — Norm & Distance](../../../Vectors/04-LinearAlgebra/lesson-03-norm-distance/) — khoảng cách hai điểm là $\|\vec{d}\| = \sqrt{dx^2 + dy^2}$. Bài này dùng **bình phương** của nó.
- [L05 — Springs & Oscillation](../../01-Motion/lesson-05-springs-oscillation/) — bài cuối Tier 1; lò xo/constraint sẽ gặp lại khi xử lý phản ứng va chạm.

---

## 1. Vì sao học va chạm? — bài toán mở

> 💡 **Trực giác / Hình dung.** Một viên đạn bay trên màn hình. Một con quái đứng đó.
> Khoảnh khắc nào game được phép trừ máu con quái? Trả lời câu hỏi đó **chính xác và đủ
> nhanh** là toàn bộ nội dung của "collision detection".

Bốn câu hỏi rất cụ thể mà bài này trả lời:

1. **Đạn trúng quái.** Viên đạn là một chấm bay; con quái là một khối. Làm sao biết đạn **trúng**?
2. **Nhân vật chạm tường.** Người chơi đẩy nhân vật sang phải; có một bức tường. Khi nào nhân vật **không được đi tiếp**?
3. **Hai vật va nhau.** Hai quả bóng bi-a lăn tới nhau. Khoảnh khắc nào chúng **chạm** để bật lại?
4. **Click trúng nút.** Con trỏ chuột (một điểm) ở $(180, 95)$; cái nút là một hộp. Click có **trúng** nút không?

### 1.1 Vì sao KHÔNG kiểm tra từng pixel?

Cách "ngây thơ" nhất: tô con quái và viên đạn ra hai ảnh, rồi duyệt **mọi pixel**, hỏi "có pixel nào của đạn trùng pixel của quái không?".

Hãy đếm chi phí. Giả sử con quái là sprite $64 \times 64 = 4096$ pixel, viên đạn $8 \times 8 = 64$ pixel. Một lần kiểm tra một cặp đạn-quái:

$$4096 \times 64 = 262\,144 \text{ phép so sánh.}$$

Một màn có 50 viên đạn và 30 con quái → $50 \times 30 = 1500$ cặp → $1500 \times 262\,144 \approx 393$ **triệu** phép so sánh **mỗi frame**. Ở 60 FPS, đó là **23.6 tỉ phép/giây** — máy không kham nổi, game tụt xuống vài FPS.

> 💡 **Trực giác.** Thay vì so từng pixel, ta **bọc** mỗi vật trong một hình đơn giản (hộp hoặc tròn)
> rồi chỉ kiểm tra **hai hình bao** có chồng nhau không. So sánh hai hộp = vài phép so sánh số,
> thay vì hàng trăm nghìn phép so pixel.

Một lần test AABB là **4 phép so sánh** (sẽ thấy ở §2). So với 262 144 phép: nhanh hơn ~**65 000 lần**. Đó là lý do mọi game đều dùng hình bao.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Hình bao không khớp hình thật, có sai không?"* — Có sai một chút (xem §6): hộp bao quanh hình tròn có 4 góc "thừa". Nhưng với gameplay, sai số đó thường **chấp nhận được**, và nếu cần chính xác hơn ta dùng [SAT](../lesson-02-sat-polygons/) (L07).
> - *"50 viên đạn × 30 quái = 1500 cặp, vẫn nhiều?"* — Đúng. Giảm số **cặp** phải xét là việc của **broad-phase** ([L08](../lesson-03-spatial-partitioning/)). Bài này lo phần test **một cặp** cho nhanh (narrow-phase).

> 🔁 **Dừng lại tự kiểm tra.** Vì sao test hình bao nhanh hơn test pixel hàng chục nghìn lần?
> <details><summary>Đáp án</summary>
> Vì test hình bao chỉ so vài con số (toạ độ biên, bán kính), chi phí O(1) không phụ thuộc kích thước sprite. Test pixel là O(số pixel của hai vật) — tăng theo bình phương kích thước.
> </details>

> 📝 **Tóm tắt mục 1.** Game không so từng pixel (quá chậm); nó bọc mỗi vật trong **hình bao** đơn giản (hộp/tròn) rồi test hai hình bao. Test một cặp = **narrow-phase** (bài này); giảm số cặp = broad-phase (L08); chạm rồi đẩy ra = response (L09).

---

## 2. AABB — Axis-Aligned Bounding Box (hộp bao thẳng trục)

> 💡 **Trực giác / Hình dung.** AABB là một **khung chữ nhật không xoay** — các cạnh luôn
> song song với trục x và y (đó là nghĩa của "axis-aligned"). Hãy hình dung khung hình
> bao quanh một nhân vật trong trình chỉnh sửa game: nó là một chữ nhật thẳng, dù nhân vật
> bên trong có hình thù gì.

### 2.1 Biểu diễn một AABB

Có hai cách lưu phổ biến, dùng cách nào cũng được:

- **min/max**: lưu góc nhỏ nhất `(minX, minY)` và góc lớn nhất `(maxX, maxY)`.
- **center + half-extents**: lưu tâm `(cx, cy)` và nửa-bề-rộng `(hw, hh)`. Khi đó `minX = cx - hw`, `maxX = cx + hw`, ...

Bài này dùng **min/max** vì công thức overlap đọc thẳng ra.

> ⚠ **Lỗi thường gặp — toạ độ y trên canvas hướng XUỐNG.** Trong toán học, y tăng lên trên.
> Nhưng trên màn hình/canvas, **gốc (0,0) ở góc trên-trái và y tăng xuống dưới**. Vì vậy
> "minY" là cạnh **trên** của hộp (y nhỏ), "maxY" là cạnh **dưới** (y lớn). Công thức overlap
> vẫn đúng nguyên (chỉ là so sánh số), nhưng đừng nhầm khi vẽ hay khi nghĩ "trên/dưới".

### 2.2 Điều kiện overlap — chồng cả x VÀ y

> 💡 **Trực giác.** Hai hộp **chồng nhau** khi hình chiếu của chúng chồng nhau trên **cả**
> trục x **và** trục y. Hãy hình dung chiếu bóng hai hộp xuống trục x: nếu hai bóng rời nhau,
> hai hộp chắc chắn không chạm (dù trên trục y chúng có chồng). Chỉ cần **một trục** rời là đủ
> để khẳng định **không chạm**. Phải chồng **đồng thời cả hai trục** mới là chạm.

Chồng trên trục x nghĩa là: hộp A bắt đầu trước khi hộp B kết thúc, **và** hộp A kết thúc sau khi hộp B bắt đầu:

$$a.minX \le b.maxX \;\land\; a.maxX \ge b.minX$$

Tương tự cho trục y. Hai hộp chồng nhau khi **cả bốn** điều kiện đúng:

$$
\boxed{a.minX \le b.maxX \;\land\; a.maxX \ge b.minX \;\land\; a.minY \le b.maxY \;\land\; a.maxY \ge b.minY}
$$

```go
type AABB struct{ MinX, MinY, MaxX, MaxY float64 }

func aabbOverlap(a, b AABB) bool {
    return a.MinX <= b.MaxX && a.MaxX >= b.MinX &&
        a.MinY <= b.MaxY && a.MaxY >= b.MinY
}
```

> ⚠ **Lỗi thường gặp #1 — quên một trục.** Nhiều người viết chỉ kiểm tra trục x
> (`a.minX <= b.maxX && a.maxX >= b.minX`) rồi tưởng đã xong. Sai: hai hộp có thể chồng
> bóng trên x nhưng cách xa nhau trên y (một ở trên đầu màn hình, một ở dưới chân). **Phải
> AND cả 4 điều kiện.** Đây là bug va chạm phổ biến nhất với người mới.

### 2.3 Walk-through bằng toạ độ thật (≥ 4 ví dụ)

Quy ước: mỗi hộp ghi `[minX, minY, maxX, maxY]`. Kiểm tra từng vế.

**Ví dụ 1 — chạm rõ ràng.** `A = [0, 0, 4, 4]`, `B = [2, 2, 6, 6]`.

| Điều kiện | Tính | Đúng? |
|---|---|:---:|
| `a.minX ≤ b.maxX` | $0 \le 6$ | ✓ |
| `a.maxX ≥ b.minX` | $4 \ge 2$ | ✓ |
| `a.minY ≤ b.maxY` | $0 \le 6$ | ✓ |
| `a.maxY ≥ b.minY` | $4 \ge 2$ | ✓ |

Cả 4 đúng → **CHẠM**. (Vùng chồng là hình vuông từ `(2,2)` tới `(4,4)`.)

**Ví dụ 2 — không chạm (rời nhau trên trục x).** `A = [0, 0, 4, 4]`, `B = [5, 1, 9, 5]`.

| Điều kiện | Tính | Đúng? |
|---|---|:---:|
| `a.minX ≤ b.maxX` | $0 \le 9$ | ✓ |
| `a.maxX ≥ b.minX` | $4 \ge 5$ | ✗ |

Vế thứ hai **sai** (A kết thúc ở x=4, B bắt đầu ở x=5, có khe hở) → **KHÔNG CHẠM**. Không cần xét tiếp trục y; chỉ một vế sai là đủ kết luận.

**Ví dụ 3 — không chạm (rời trên trục y, dù chồng trên x).** `A = [0, 0, 4, 4]`, `B = [1, 6, 3, 9]`.

| Điều kiện | Tính | Đúng? |
|---|---|:---:|
| `a.minX ≤ b.maxX` | $0 \le 3$ | ✓ |
| `a.maxX ≥ b.minX` | $4 \ge 1$ | ✓ |
| `a.minY ≤ b.maxY` | $0 \le 9$ | ✓ |
| `a.maxY ≥ b.minY` | $4 \ge 6$ | ✗ |

Trục x chồng hoàn toàn, nhưng trục y rời (A đến y=4, B bắt đầu y=6) → vế cuối sai → **KHÔNG CHẠM**. Đây chính là minh hoạ cho ⚠ "quên một trục": nếu chỉ xét x thì đã kết luận sai là chạm.

**Ví dụ 4 — chạm đúng cạnh (chạm biên, `≤`/`≥` cho đúng = chạm).** `A = [0, 0, 4, 4]`, `B = [4, 0, 8, 4]`.

| Điều kiện | Tính | Đúng? |
|---|---|:---:|
| `a.minX ≤ b.maxX` | $0 \le 8$ | ✓ |
| `a.maxX ≥ b.minX` | $4 \ge 4$ | ✓ |
| `a.minY ≤ b.maxY` | $0 \le 4$ | ✓ |
| `a.maxY ≥ b.minY` | $4 \ge 0$ | ✓ |

Cạnh phải của A trùng cạnh trái của B tại `x = 4`. Vì dùng `≥`/`≤` (không phải `>`/`<`), trường hợp **dính cạnh** được tính là **CHẠM**. (Nếu muốn "dính cạnh không tính chạm", đổi sang `<`/`>`.)

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao dấu `≤` chứ không phải `<`?"* — Tuỳ ý đồ. `≤`/`≥` coi "chạm cạnh" là va chạm (an toàn hơn cho gameplay, vật không lọt qua nhau). `<`/`>` đòi phải **chồng thật sự** mới tính. Hãy chọn nhất quán.
> - *"Hộp xoay 45° thì sao?"* — AABB **không xoay được** theo định nghĩa. Hộp xoay là **OBB** (Oriented Bounding Box) và phải dùng [SAT](../lesson-02-sat-polygons/) (L07).

> 🔁 **Dừng lại tự kiểm tra.** Cho `A = [10, 10, 20, 20]` và `B = [15, 25, 25, 35]`. Chạm không?
> <details><summary>Đáp án</summary>
> Trục x: $10 \le 25$ ✓ và $20 \ge 15$ ✓ → chồng x. Trục y: $10 \le 35$ ✓ nhưng $20 \ge 25$ ✗ → rời y. Có một vế sai → <strong>KHÔNG CHẠM</strong> (B nằm dưới A một khe từ y=20 tới y=25).
> </details>

> 📝 **Tóm tắt mục 2.** AABB = chữ nhật không xoay, lưu min/max. Hai hộp chồng nhau ⇔ chồng **cả** trục x **và** y. Công thức: `a.minX ≤ b.maxX && a.maxX ≥ b.minX && a.minY ≤ b.maxY && a.maxY ≥ b.minY`. Một vế sai = không chạm. Bẫy lớn nhất: **quên một trục**.

---

## 3. Circle-Circle — va chạm hai hình tròn

> 💡 **Trực giác / Hình dung.** Hai hình tròn chạm nhau khi **tâm chúng đủ gần**. "Đủ gần"
> nghĩa là khoảng cách giữa hai tâm **nhỏ hơn tổng hai bán kính**. Hãy hình dung đẩy hai
> đồng xu lại gần: chúng vừa chạm đúng lúc khoảng cách tâm = tổng bán kính; gần hơn nữa là chồng.

### 3.1 Điều kiện overlap

Cho tròn A tâm $(x_1, y_1)$ bán kính $r_1$, tròn B tâm $(x_2, y_2)$ bán kính $r_2$. Gọi $\vec{d} = (dx, dy) = (x_2 - x_1,\; y_2 - y_1)$.

Khoảng cách hai tâm là chuẩn (norm) của $\vec{d}$ — đúng công thức ở [Vectors/04 norm & distance](../../../Vectors/04-LinearAlgebra/lesson-03-norm-distance/):

$$\text{dist} = \|\vec{d}\| = \sqrt{dx^2 + dy^2}.$$

Chạm khi: $\text{dist} < r_1 + r_2.$

### 3.2 Mẹo quan trọng — dùng khoảng cách BÌNH PHƯƠNG, tránh `sqrt`

`sqrt` là phép **đắt** (chậm hơn nhân/cộng nhiều lần). Mà ta chỉ cần **so sánh**, không cần con số khoảng cách thật. Vì cả hai vế đều **không âm**, ta có thể bình phương cả hai vế mà bất đẳng thức **giữ nguyên chiều**:

$$\text{dist} < r_1 + r_2 \;\Longleftrightarrow\; \text{dist}^2 < (r_1 + r_2)^2 \;\Longleftrightarrow\; dx^2 + dy^2 < (r_1 + r_2)^2.$$

Vế phải $dx^2 + dy^2$ **không có `sqrt`** — chỉ 2 phép nhân + 1 cộng. Đây là tối ưu kinh điển trong game.

```go
type Circle struct{ X, Y, R float64 }

func circleOverlap(a, b Circle) bool {
    dx := b.X - a.X
    dy := b.Y - a.Y
    distSq := dx*dx + dy*dy
    rSum := a.R + b.R
    return distSq < rSum*rSum // KHÔNG dùng sqrt
}
```

> ⚠ **Lỗi thường gặp #2 — dùng `sqrt` thừa.** Viết `math.Sqrt(dx*dx+dy*dy) < r1+r2` cho ra
> **cùng kết quả** nhưng chậm hơn. Với hàng nghìn cặp mỗi frame, `sqrt` thừa ăn đáng kể CPU.
> Chỉ tính `sqrt` khi bạn **thực sự cần con số khoảng cách** (vd để tính độ lún ở §5), còn để
> **kiểm tra chạm hay không** thì luôn so bình phương.

### 3.3 Walk-through bằng toạ độ thật (≥ 4 ví dụ)

**Ví dụ 1 — chạm.** A `(0,0) r=3`, B `(4,0) r=2`. `dx=4, dy=0` → `distSq` $= 16+0 = 16$. `rSum` $= 5$ → `rSum²` $= 25$. So: $16 < 25$ ✓ → **CHẠM**. (Khoảng cách thật $4 < 5$ = tổng bán kính.)

**Ví dụ 2 — không chạm.** A `(0,0) r=2`, B `(10,0) r=3`. `dx=10, dy=0` → `distSq` $= 100$. `rSum` $= 5$ → `rSum²` $= 25$. So: $100 < 25$? **Sai** → **KHÔNG CHẠM**. (Khoảng cách $10 \gg 5$ = tổng bán kính.)

**Ví dụ 3 — chạm chéo (cả dx và dy khác 0).** A `(1,1) r=2`, B `(4,5) r=4`. `dx=3, dy=4` → `distSq` $= 9+16 = 25$. `rSum` $= 6$ → `rSum²` $= 36$. So: $25 < 36$ ✓ → **CHẠM**. (Khoảng cách thật $\sqrt{25}=5 < 6$.)

**Ví dụ 4 — chạm đúng tiếp xúc (biên).** A `(0,0) r=3`, B `(5,0) r=2`. `dx=5, dy=0` → `distSq` $= 25$. `rSum` $= 5$ → `rSum²` $= 25$. So: $25 < 25$? **Sai** → **KHÔNG CHẠM** (chỉ vừa chạm điểm, không chồng). Nếu muốn tính "chạm tiếp xúc", dùng `<=` thay vì `<`.

> ❓ **Câu hỏi tự nhiên.**
> - *"Bình phương vế có làm tràn số không?"* — Với toạ độ pixel cỡ vài nghìn, `dx*dx` cỡ vài triệu — `float64`/`int64` thừa sức. Chỉ cẩn thận nếu toạ độ rất lớn (dùng `float64`).
> - *"Tròn nhanh hơn hộp à?"* — Cả hai đều O(1). Tròn hợp với vật **đối xứng tròn** (đạn, bóng); hộp hợp với vật **chữ nhật** (gạch, tường). Chọn theo hình thật.

> 🔁 **Dừng lại tự kiểm tra.** A `(2,2) r=1`, B `(2,6) r=2`. Chạm không?
> <details><summary>Đáp án</summary>
> `dx=0, dy=4` → `distSq` $= 0+16 = 16$. `rSum` $= 3$ → `rSum²` $= 9$. $16 < 9$? Sai → <strong>KHÔNG CHẠM</strong> (cách nhau theo trục y, khoảng cách $4 > 3$ = tổng bán kính).
> </details>

> 📝 **Tóm tắt mục 3.** Hai tròn chạm ⇔ khoảng cách tâm < tổng bán kính. Luôn so **bình phương**: $dx^2 + dy^2 < (r_1+r_2)^2$ để **tránh `sqrt`**. `<` = không tính tiếp xúc, `<=` = tính.

---

## 4. Circle-AABB — tròn va chạm hộp

> 💡 **Trực giác / Hình dung.** Muốn biết hình tròn có chạm hộp không, hãy tìm **điểm trên
> hộp gần tâm tròn nhất**, rồi hỏi: điểm đó có nằm trong bán kính tròn không? Nếu điểm gần
> nhất còn xa hơn bán kính thì tròn ở ngoài; nếu trong bán kính thì chạm.

### 4.1 Tìm điểm gần nhất bằng "clamp" (kẹp)

Với mỗi trục độc lập, điểm trên hộp gần một toạ độ nhất là chính toạ độ đó **bị kẹp vào khoảng [min, max]** của hộp:

$$
\text{clamp}(v, lo, hi) = \begin{cases} lo & v < lo \\ hi & v > hi \\ v & \text{còn lại} \end{cases}
$$

Điểm gần nhất trên hộp tới tâm tròn $(cx, cy)$:

$$
nx = \text{clamp}(cx,\; minX,\; maxX), \qquad ny = \text{clamp}(cy,\; minY,\; maxY).
$$

Rồi so khoảng cách từ $(cx, cy)$ tới $(nx, ny)$ với bán kính — **vẫn dùng bình phương**:

$$(cx - nx)^2 + (cy - ny)^2 < r^2.$$

```go
func clamp(v, lo, hi float64) float64 {
    if v < lo { return lo }
    if v > hi { return hi }
    return v
}

func circleAABBOverlap(c Circle, b AABB) bool {
    nx := clamp(c.X, b.MinX, b.MaxX)
    ny := clamp(c.Y, b.MinY, b.MaxY)
    dx := c.X - nx
    dy := c.Y - ny
    return dx*dx+dy*dy < c.R*c.R
}
```

> 💡 **Vì sao clamp cho ra điểm gần nhất?** Nếu tâm tròn nằm *bên trong* khoảng `[minX, maxX]`
> theo trục x, thì điểm gần nhất có cùng x với tâm (clamp trả về `cx`). Nếu tâm ở **ngoài** bên
> trái (`cx < minX`), điểm gần nhất phải nằm trên cạnh trái → x = `minX`. Clamp gói đúng cả ba
> trường hợp. Nếu tâm nằm **trong hộp**, clamp trả về chính `(cx,cy)` → khoảng cách 0 → chắc chắn chạm.

### 4.2 Walk-through bằng toạ độ thật (≥ 4 ví dụ)

Dùng hộp `B = [0, 0, 10, 6]` (minX=0, minY=0, maxX=10, maxY=6) cho mọi ví dụ.

**Ví dụ 1 — tròn ngoài cạnh phải, không chạm.** Tròn tâm `(14, 3) r=2`.
`nx = clamp(14, 0, 10) = 10`, `ny = clamp(3, 0, 6) = 3`. `dx` $= 14-10 = 4$, `dy` $= 3-3 = 0$ → `distSq` $= 16$. `r²` $= 4$. $16 < 4$? Sai → **KHÔNG CHẠM**.

**Ví dụ 2 — tròn ngoài cạnh phải nhưng đủ to để chạm.** Tròn tâm `(13, 3) r=4`.
`nx = clamp(13,0,10) = 10`, `ny = clamp(3,0,6) = 3`. `dx` $= 3$, `dy` $= 0$ → `distSq` $= 9$. `r²` $= 16$. $9 < 16$ ✓ → **CHẠM**.

**Ví dụ 3 — tâm tròn nằm trong hộp (luôn chạm).** Tròn tâm `(5, 3) r=1`.
`nx = clamp(5,0,10) = 5` (5 đã trong [0,10]), `ny = clamp(3,0,6) = 3`. `dx` $= 0$, `dy` $= 0$ → `distSq` $= 0$. $0 < 1$ ✓ → **CHẠM** (tâm ở trong, hiển nhiên chạm).

**Ví dụ 4 — tròn ngoài góc (clamp cả hai trục cùng lúc).** Tròn tâm `(13, 9) r=3`.
`nx = clamp(13,0,10) = 10`, `ny = clamp(9,0,6) = 6` → điểm gần nhất là **góc** `(10,6)`. `dx` $= 13-10 = 3$, `dy` $= 9-6 = 3$ → `distSq` $= 9+9 = 18$. `r²` $= 9$. $18 < 9$? Sai → **KHÔNG CHẠM** (tròn ở ngoài góc dưới-phải, hơi xa). Nếu `r=5` → `r²=25`, $18 < 25$ ✓ → sẽ chạm vào góc.

> ⚠ **Lỗi thường gặp.** Quên trường hợp **tâm trong hộp** rồi tính khoảng cách tới *cạnh gần
> nhất* dương → sai. Kỹ thuật clamp xử lý gọn: tâm trong hộp → `(nx,ny) = (cx,cy)` → khoảng cách 0 → chạm.

> 🔁 **Dừng lại tự kiểm tra.** Hộp `[0,0,4,4]`, tròn tâm `(6, 6) r=2`. Chạm không?
> <details><summary>Đáp án</summary>
> Điểm gần nhất = góc `(4,4)`. `dx=2, dy=2` → `distSq` $= 8$. `r²` $= 4$. $8 < 4$? Sai → <strong>KHÔNG CHẠM</strong> (góc tròn còn cách góc hộp một chút; cần $r \ge \sqrt{8} \approx 2.83$ mới chạm).
> </details>

> 📝 **Tóm tắt mục 4.** Circle-AABB: kẹp (clamp) tâm tròn vào hộp để được **điểm gần nhất** `(nx,ny)`, rồi so `(cx-nx)² + (cy-ny)² < r²`. Clamp tự lo cả trường hợp tâm trong hộp (khoảng cách 0).

---

## 5. Point-in-shape & penetration depth (độ lún)

### 5.1 Điểm nằm trong hộp / tròn

**Point-in-AABB** là trường hợp riêng của AABB overlap khi một hộp co lại thành một điểm — chỉ cần điểm ở giữa biên cả hai trục:

$$minX \le px \le maxX \;\land\; minY \le py \le maxY.$$

**Point-in-circle** là trường hợp riêng của circle-circle với một tròn bán kính 0:

$$(px - cx)^2 + (py - cy)^2 < r^2.$$

```go
func pointInAABB(px, py float64, b AABB) bool {
    return px >= b.MinX && px <= b.MaxX && py >= b.MinY && py <= b.MaxY
}
func pointInCircle(px, py float64, c Circle) bool {
    dx, dy := px-c.X, py-c.Y
    return dx*dx+dy*dy < c.R*c.R
}
```

Đây là cốt lõi của **click trúng nút** (câu hỏi #4 ở §1): chuột là điểm, nút là hộp/tròn.

**Walk-through (≥ 4 ví dụ).** Hộp nút `[100, 80, 240, 120]`, tròn icon tâm `(300, 100) r=20`.

1. Click `(180, 95)` vào hộp: $100 \le 180 \le 240$ ✓ và $80 \le 95 \le 120$ ✓ → **trúng hộp**.
2. Click `(260, 95)`: $100 \le 260 \le 240$? $260 > 240$ ✗ → **trượt** (ngoài cạnh phải).
3. Click `(305, 108)` gần tâm tròn: `dx=5, dy=8` → `distSq` $= 25+64 = 89 < 400$ ✓ → **trúng icon**.
4. Click `(330, 100)`: `dx=30, dy=0` → `distSq` $= 900 < 400$? Sai → **trượt** (xa tâm hơn bán kính 20).

### 5.2 Penetration depth (độ lún) — sơ lược

Biết "chạm hay không" mới là một nửa. Để **đẩy hai vật ra** cho không lồng vào nhau (collision response, [L09](../lesson-04-collision-response/)), ta cần biết **lún sâu bao nhiêu** và **đẩy theo hướng nào**.

**Circle-circle** dễ nhất: khi đã chạm, gọi `dist = sqrt(dx²+dy²)` (giờ **mới** cần `sqrt`), độ lún là phần còn thiếu để hai tròn vừa tách:

$$\text{depth} = (r_1 + r_2) - \text{dist}, \qquad \text{hướng đẩy} = \frac{\vec{d}}{\text{dist}} \text{ (vector đơn vị nối hai tâm).}$$

Ví dụ A `(0,0) r=3`, B `(4,0) r=2`: `dist = 4`, `depth = 5 - 4 = 1`. Đẩy B sang phải 1 đơn vị (hướng `(1,0)`) là hai tròn vừa tách. Đây là lý do §3 dặn "chỉ `sqrt` khi thật cần": kiểm tra chạm không cần `sqrt`, nhưng **tính độ lún để phản ứng thì cần**.

**AABB-AABB** độ lún là **overlap nhỏ nhất** giữa hai trục: tính overlap trên x (`min(a.maxX, b.maxX) - max(a.minX, b.minX)`) và trên y, lấy cái **nhỏ hơn** làm hướng đẩy (đẩy theo trục lún ít hơn để di chuyển tối thiểu). Chi tiết để dành cho L09.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao đẩy theo trục lún ÍT hơn?"* — Vì đó là cách tách hai hộp với
> quãng đường ngắn nhất, trông tự nhiên (vật trượt dọc tường thay vì nảy vọt).

> 📝 **Tóm tắt mục 5.** Point-in-shape = trường hợp riêng (hộp/tròn co thành điểm) — dùng cho click trúng UI. Penetration depth cho biết **lún bao nhiêu + đẩy hướng nào**, là đầu vào của collision response (L09). Lúc này mới dùng `sqrt`.

---

## 6. Vì sao dùng hình bao thay vì hình thật?

> 💡 **Trực giác.** Hình bao là "đủ tốt với chi phí rẻ". Một con quái hình con rồng phức tạp
> được bọc trong một AABB hay vài hình tròn. Test cực nhanh; cái giá là **vùng thừa** ở góc.

**Đánh đổi (trade-off):**

- **Rẻ & nhanh:** test một cặp là vài phép số (O(1)), thay vì duyệt đa giác/pixel.
- **Sai số chấp nhận được:** với nhiều game, "đạn chạm vùng bao quanh quái" đã đủ — người chơi không nhận ra vài pixel lệch. Game bắn súng còn cố ý làm hitbox to hơn để dễ trúng.
- **Đủ cho phần lớn vật:** vật tròn (đạn, bóng) → circle; vật chữ nhật (gạch, sàn, tường) → AABB.

**Khi nào chưa đủ?** Khi hình thật xa hình bao (đa giác lồi xoay, hình chữ L), vùng thừa gây "chạm ma" (trông không chạm mà game báo chạm). Lúc đó dùng **SAT — Separating Axis Theorem** ([L07](../lesson-02-sat-polygons/)) cho đa giác lồi và hộp xoay (OBB). SAT chính xác hơn nhưng đắt hơn — đó là lý do ta **lọc bằng hình bao trước**, chỉ khi hai hình bao chạm mới chạy SAT tốn kém.

> 📝 **Tóm tắt mục 6.** Hình bao = rẻ + đủ tốt; cái giá là vùng thừa ở góc. Cần chính xác hơn (đa giác, hộp xoay) → SAT (L07), thường chạy **sau** khi hình bao đã báo "có thể chạm".

---

## 7. Bức tranh lớn — narrow-phase, broad-phase, response

> 💡 **Trực giác.** Ba bài tiếp theo của Tier 2 là ba câu hỏi nối nhau: *"một cặp có chạm
> không?"* → *"trong hàng nghìn vật, những cặp NÀO đáng xét?"* → *"chạm rồi thì làm gì?"*

| Giai đoạn | Câu hỏi | Bài |
|---|---|---|
| **Narrow-phase** | Hai vật **cụ thể** này có chạm không? Chạm ở đâu, lún bao nhiêu? | **Bài này (L06)** + SAT ([L07](../lesson-02-sat-polygons/)) |
| **Broad-phase** | Trong N vật, **cặp nào** đáng kiểm tra (loại bớt cặp ở xa)? | [L08 — Spatial partitioning](../lesson-03-spatial-partitioning/) |
| **Collision response** | Đã chạm: đẩy ra, bật lại, trừ máu, kích hoạt sự kiện thế nào? | [L09 — Collision response](../lesson-04-collision-response/) |

Tại sao cần broad-phase nếu narrow-phase đã nhanh? Vì với N vật, số cặp là $\binom{N}{2} \approx N^2/2$. Test mỗi cặp O(1) vẫn là $O(N^2)$ tổng. Với N = 1000 vật → ~500 000 cặp/frame. Broad-phase (lưới, quadtree) loại đa số cặp ở xa, kéo về gần $O(N)$. Module "Nhiều vật bay" trong [visualization.html](./visualization.html) cho thấy đúng vấn đề $O(N^2)$ này khi tăng N.

> 📝 **Tóm tắt mục 7.** Bài này là **narrow-phase** (test một cặp). Nhiều vật → cần **broad-phase** (L08) lọc cặp. Chạm rồi → **response** (L09) đẩy/bật. Ba mảnh ghép của một collision system hoàn chỉnh.

---

## Bài tập

**Bài 1 (AABB).** Cho `A = [0, 0, 5, 5]` và `B = [3, 6, 8, 10]`. Hai hộp có chạm không? Liệt kê đủ 4 điều kiện và chỉ ra vế nào quyết định.

**Bài 2 (Circle-circle, không `sqrt`).** Cho tròn A `(1, 2) r=3` và B `(5, 5) r=1`. Dùng khoảng cách bình phương xác định chạm hay không. Chỉ rõ `distSq`, `rSum²`.

**Bài 3 (Circle-AABB).** Hộp `[0, 0, 8, 4]`, tròn tâm `(10, 6) r=3`. Tìm điểm gần nhất bằng clamp rồi kết luận chạm/không.

**Bài 4 (Point-in-shape).** Một nút HUD là hộp `[200, 20, 320, 60]` và một nút tròn tâm `(360, 40) r=18`. Các click sau trúng đâu (hộp / tròn / trượt)? `(250, 45)`, `(330, 40)`, `(370, 50)`, `(360, 65)`.

**Bài 5 (Penetration depth).** Hai tròn A `(0, 0) r=4` và B `(3, 4) r=3` đang chồng. Tính `dist`, độ lún `depth`, và hướng đẩy (vector đơn vị). Đẩy B đi bao xa để vừa tách?

**Bài 6 (tự kiểm tra chạm — viết logic).** Viết (giả mã hoặc Go) hàm `overlap(a, b Shape) bool` chọn đúng test theo loại hình của `a` và `b` (AABB-AABB, circle-circle, circle-AABB). Có bao nhiêu tổ hợp cần xử lý, và vì sao circle-AABB và AABB-circle dùng chung một hàm?

**Bài 7 (gỡ bug — quên một trục).** Một bạn viết AABB test chỉ kiểm tra trục x. Cho một cặp hộp khiến bug này báo "chạm" trong khi thực tế **không chạm**, và giải thích.

## Lời giải chi tiết

### Bài 1

`A = [0,0,5,5]`, `B = [3,6,8,10]`.

| Điều kiện | Tính | Đúng? |
|---|---|:---:|
| `a.minX ≤ b.maxX` | $0 \le 8$ | ✓ |
| `a.maxX ≥ b.minX` | $5 \ge 3$ | ✓ |
| `a.minY ≤ b.maxY` | $0 \le 10$ | ✓ |
| `a.maxY ≥ b.minY` | $5 \ge 6$ | ✗ |

Trục x chồng hoàn toàn, nhưng trục y rời: A cao đến y=5, B bắt đầu từ y=6 → có khe hở y∈(5,6). Vế cuối quyết định → **KHÔNG CHẠM**.

### Bài 2

A `(1,2) r=3`, B `(5,5) r=1`. `dx` $= 5-1 = 4$, `dy` $= 5-2 = 3$ → `distSq` $= 16 + 9 = 25$. `rSum` $= 3+1 = 4$ → `rSum²` $= 16$. So: $25 < 16$? **Sai** → **KHÔNG CHẠM**. (Khoảng cách thật $\sqrt{25}=5 > 4 =$ tổng bán kính.)

### Bài 3

Hộp `[0,0,8,4]`, tròn `(10,6) r=3`. `nx = clamp(10, 0, 8) = 8`, `ny = clamp(6, 0, 4) = 4` → điểm gần nhất là góc `(8,4)`. `dx` $= 10-8 = 2$, `dy` $= 6-4 = 2$ → `distSq` $= 4+4 = 8$. `r²` $= 9$. So: $8 < 9$ ✓ → **CHẠM** (tròn chạm vào góc trên-phải; nếu y hướng xuống trên canvas thì là góc dưới-phải — kết quả số không đổi).

### Bài 4

Hộp `[200,20,320,60]`, tròn `(360,40) r=18` (`r²=324`).

1. `(250, 45)`: $200 \le 250 \le 320$ ✓, $20 \le 45 \le 60$ ✓ → **trúng HỘP**.
2. `(330, 40)`: $200 \le 330 \le 320$? $330 > 320$ ✗ → không trong hộp. Tròn: `dx=330-360=-30, dy=0` → `distSq` $= 900 > 324$ → không trong tròn → **TRƯỢT**.
3. `(370, 50)`: hộp: $370 > 320$ ✗. Tròn: `dx=10, dy=10` → `distSq` $= 200 < 324$ ✓ → **trúng TRÒN**.
4. `(360, 65)`: hộp: $65 > 60$ ✗. Tròn: `dx=0, dy=25` → `distSq` $= 625 > 324$ ✗ → **TRƯỢT** (dưới tâm 25 px > bán kính 18).

### Bài 5

A `(0,0) r=4`, B `(3,4) r=3`. `dx=3, dy=4` → `distSq` $= 9+16 = 25$ → `dist` $= \sqrt{25} = 5$ (giờ **mới** cần `sqrt` vì cần con số thật). `rSum` $= 7$. Kiểm tra chồng: $5 < 7$ ✓ → đang chồng.

- **Độ lún**: `depth` $= rSum - dist = 7 - 5 = 2$.
- **Hướng đẩy** (đơn vị, từ A tới B): $(dx/dist,\; dy/dist) = (3/5,\; 4/5) = (0.6,\; 0.8)$.
- Đẩy B đi đúng `depth` $= 2$ theo hướng đó: B mới $(3 + 2 \cdot 0.6,\; 4 + 2 \cdot 0.8) = (4.2, 5.6)$. Kiểm tra: `dx=4.2, dy=5.6` → `dist` $= \sqrt{17.64+31.36} = \sqrt{49} = 7 = rSum$ → vừa tách ✓. (Trong response thật thường chia đôi: đẩy mỗi vật `depth/2`.)

### Bài 6

```go
type Kind int
const ( KindAABB Kind = iota; KindCircle )
type Shape struct {
    Kind   Kind
    Box    AABB    // dùng khi Kind == KindAABB
    Circle Circle  // dùng khi Kind == KindCircle
}

func overlap(a, b Shape) bool {
    switch {
    case a.Kind == KindAABB && b.Kind == KindAABB:
        return aabbOverlap(a.Box, b.Box)
    case a.Kind == KindCircle && b.Kind == KindCircle:
        return circleOverlap(a.Circle, b.Circle)
    case a.Kind == KindCircle && b.Kind == KindAABB:
        return circleAABBOverlap(a.Circle, b.Box)
    default: // AABB & circle — đối xứng, đảo thứ tự
        return circleAABBOverlap(b.Circle, a.Box)
    }
}
```

Với 2 loại hình có $2 \times 2 = 4$ tổ hợp có thứ tự. Nhưng **AABB-circle và circle-AABB là cùng một bài toán** (chạm là quan hệ đối xứng: A chạm B ⇔ B chạm A) → chỉ cần một hàm `circleAABBOverlap`, trường hợp còn lại chỉ **đảo thứ tự tham số**. Thực chất chỉ **3 hàm** test riêng biệt.

### Bài 7

Code bug (chỉ xét x):
```go
func buggy(a, b AABB) bool {
    return a.MinX <= b.MaxX && a.MaxX >= b.MinX // THIẾU trục y
}
```

Cặp phản chứng: `A = [0, 0, 4, 4]`, `B = [1, 100, 3, 104]`. Trục x: $0 \le 3$ ✓ và $4 \ge 1$ ✓ → `buggy` trả về **true** (báo chạm). Thực tế A ở trên cùng (y 0..4), B ở tận y 100..104 — cách nhau cả trăm pixel theo trục y → **KHÔNG chạm**. Bug bỏ sót `a.maxY ≥ b.minY` ($4 \ge 100$ sai) nên báo nhầm. Bài học: **AABB phải AND đủ 4 điều kiện**, một trục thiếu là sai.

## Tham khảo và bài tiếp theo

- Bài trước (Tier 1): [L05 — Springs & Oscillation](../../01-Motion/lesson-05-springs-oscillation/).
- **Bài tiếp theo:** [L07 — SAT (Separating Axis Theorem) cho đa giác lồi & hộp xoay](../lesson-02-sat-polygons/) — chính xác hơn hình bao, dùng khi AABB/circle chưa đủ.
- Liên quan trong Tier 2:
  - [L08 — Spatial partitioning (broad-phase)](../lesson-03-spatial-partitioning/) — loại bớt cặp khi có nhiều vật, tránh $O(N^2)$.
  - [L09 — Collision response](../lesson-04-collision-response/) — dùng penetration depth (§5) để đẩy/bật vật.
- Nền toán: [Vectors/04 — Norm & Distance](../../../Vectors/04-LinearAlgebra/lesson-03-norm-distance/) (khoảng cách), [L02 — Vectors & Kinematics](../../01-Motion/lesson-02-vectors-kinematics/).
- Minh họa tương tác: [visualization.html](./visualization.html) — AABB tester (kéo 2 hộp, xem điều kiện từng trục), Circle tester (khoảng cách tâm vs tổng bán kính), và sandbox "Nhiều vật bay" tô đỏ các cặp đang chạm realtime.
