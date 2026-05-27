// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-47-computational-geometry/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 47 — Hình học tính toán (Computational Geometry)

> Tier 7 · Advanced · Lesson 47
>
> Làm thế nào để máy tính trả lời những câu hỏi rất "đời thường" về hình học: *Ba điểm này rẽ trái hay rẽ phải? Hai con đường có cắt nhau không? Cái khung bao quanh một đám điểm trông như thế nào? Con trỏ chuột có nằm trong đa giác này không?* Bài này xây dựng bộ công cụ cốt lõi của hình học tính toán — và tất cả đều quy về **một** phép toán nhỏ xíu: tích có hướng (cross product).

## Mục tiêu học tập

Sau bài này, bạn sẽ:

1. Biểu diễn điểm và vector, làm chủ **dot product** và **cross product** cùng ý nghĩa hình học của chúng.
2. Dùng dấu của cross product để xác định **orientation** (CCW / CW / collinear) của ba điểm — nền tảng của *mọi* thuật toán hình học.
3. Kiểm tra **hai đoạn thẳng có giao nhau không**, kể cả các trường hợp collinear khó nhằn.
4. Tính **diện tích đa giác** bằng công thức shoelace (Gauss) và đọc được hướng duyệt từ dấu.
5. Dựng **bao lồi (convex hull)** bằng Andrew's monotone chain \`O(n log n)\` và hiểu Graham scan.
6. Kiểm tra **điểm có nằm trong đa giác** bằng ray casting / winding number.
7. Tìm **cặp điểm gần nhất (closest pair)** bằng chia để trị \`O(n log n)\`.
8. Tránh các bẫy **độ chính xác số thực** — biết khi nào dùng integer arithmetic, khi nào dùng epsilon.

## Kiến thức tiền đề

- [Lesson 01 — Big-O & phân tích tiệm cận](../lesson-01-bigo-asymptotic/) — để đọc độ phức tạp.
- [Lesson 06 — Sắp xếp cơ bản](../lesson-06-elementary-sorts/) và [Lesson 07 — Merge sort](../lesson-07-merge-sort/) — convex hull và closest pair đều cần sort \`O(n log n)\`.
- [Lesson 17 — Chia để trị](../lesson-17-divide-and-conquer/) — closest pair là một ứng dụng kinh điển của D&C.
- Toán cấp 3: vector, tọa độ. Sẽ nhắc lại đầy đủ ngay dưới đây.

---

## 1. Điểm và vector

💡 **Trực giác.** Một **điểm** là một vị trí trên mặt phẳng — như một dấu chấm trên giấy kẻ ô. Một **vector** là một *mũi tên* có hướng và độ dài — như chỉ dẫn "đi sang phải 3 ô, lên 2 ô". Điểm trả lời câu hỏi *"ở đâu?"*, vector trả lời *"đi thế nào?"*. Khi lấy hiệu hai điểm \`b - a\`, ta được vector mũi tên đi *từ* \`a\` *tới* \`b\`.

Trong mặt phẳng 2D, cả điểm lẫn vector đều biểu diễn bằng cặp \`(x, y)\`:

\`\`\`go
// Point đại diện một điểm HOẶC một vector trong mặt phẳng 2D.
// Dùng int64 khi tọa độ là số nguyên → cross product chính xác tuyệt đối (xem mục 10).
type Point struct {
    X, Y int64
}

// Cộng vector: (a + b)
func (a Point) Add(b Point) Point { return Point{a.X + b.X, a.Y + b.Y} }

// Trừ: b - a cho ra vector đi TỪ a TỚI b
func (a Point) Sub(b Point) Point { return Point{a.X - b.X, a.Y - b.Y} }
\`\`\`

### 1.1 Dot product (tích vô hướng)

Định nghĩa: \`a · b = a.X·b.X + a.Y·b.Y\`.

- **(a) Là gì** — một số (scalar) đo *"hai vector cùng hướng tới mức nào"*. Công thức tương đương: \`a · b = |a|·|b|·cos θ\`, với \`θ\` là góc giữa hai vector.
- **(b) Vì sao cần** — để biết góc giữa hai vector là nhọn, vuông hay tù mà không cần tính \`arccos\`. Dấu của dot product = dấu của \`cos θ\`.
- **(c) Ý nghĩa dấu**:
  - \`> 0\` → góc nhọn (cùng hướng đại khái).
  - \`= 0\` → vuông góc (perpendicular).
  - \`< 0\` → góc tù (ngược hướng đại khái).

\`\`\`go
// Dot product: a · b
func (a Point) Dot(b Point) int64 { return a.X*b.X + a.Y*b.Y }
\`\`\`

**≥ 4 ví dụ số:**

| \`a\` | \`b\` | \`a·b\` | Góc |
|-----|-----|------|-----|
| \`(1,0)\` | \`(1,0)\` | \`1·1 + 0·0 = 1\` | 0° (cùng hướng) |
| \`(1,0)\` | \`(0,1)\` | \`1·0 + 0·1 = 0\` | 90° (vuông) |
| \`(1,0)\` | \`(-1,0)\` | \`1·(-1) + 0·0 = -1\` | 180° (ngược) |
| \`(2,3)\` | \`(4,-1)\` | \`2·4 + 3·(-1) = 8-3 = 5\` | nhọn (>0) |
| \`(3,1)\` | \`(-1,3)\` | \`3·(-1)+1·3 = -3+3 = 0\` | vuông |

### 1.2 Cross product (tích có hướng) — xem mục 2

Cross product quan trọng đến mức nó có hẳn một mục riêng. Đọc tiếp.

📝 **Tóm tắt mục 1.**
- Điểm = vị trí, vector = mũi tên hướng + độ dài; cả hai là \`(x, y)\`.
- \`b - a\` = vector đi từ \`a\` tới \`b\`.
- Dot product \`a·b = aX·bX + aY·bY\` → dấu cho biết góc nhọn (\`>0\`) / vuông (\`0\`) / tù (\`<0\`).

---

## 2. Cross product — trái tim của hình học tính toán

💡 **Trực giác.** Hãy tưởng tượng bạn đang đứng tại điểm \`a\`, nhìn về phía điểm \`b\`. Bây giờ có điểm \`c\`. Câu hỏi cốt lõi: *để đi tới \`c\`, bạn phải rẽ TRÁI hay rẽ PHẢI?* Cross product trả lời câu này bằng **dấu** của một con số. Đây là viên gạch nền — segment intersection, convex hull, point-in-polygon, diện tích... tất cả đều gọi nó.

Trong 2D, cross product của hai vector \`u = (uX, uY)\` và \`v = (vX, vY)\` là một **số** (scalar):

\`\`\`
u × v = uX·vY − uY·vX
\`\`\`

(Trong 3D cross product là vector; trong 2D ta chỉ lấy thành phần \`z\` — chính là số trên.)

### 2.1 Ý nghĩa hình học

Hai cách đọc, cả hai đều cực hữu ích:

1. **Diện tích có dấu** của hình bình hành căng bởi \`u\` và \`v\`. Trị tuyệt đối \`|u × v|\` = diện tích hình bình hành; chia đôi = diện tích tam giác.
2. **Hướng quay** từ \`u\` sang \`v\`:
   - \`> 0\` → \`v\` nằm bên **trái** \`u\` → quay **ngược chiều kim đồng hồ** (counterclockwise, CCW).
   - \`< 0\` → \`v\` nằm bên **phải** \`u\` → quay **cùng chiều kim đồng hồ** (clockwise, CW).
   - \`= 0\` → \`u\` và \`v\` **song song / thẳng hàng** (collinear).

### 2.2 Cross product cho ba điểm

Câu hỏi "tại \`a\` nhìn về \`b\`, rẽ thế nào để tới \`c\`?" dịch thành:

\`\`\`
cross(a, b, c) = (b − a) × (c − a)
              = (bX−aX)·(cY−aY) − (bY−aY)·(cX−aX)
\`\`\`

\`\`\`go
// Cross của ba điểm: (b-a) × (c-a).
// Dấu: >0 = c bên trái khi đi a→b (CCW) | <0 = bên phải (CW) | =0 = thẳng hàng.
// Vì int64, kết quả CHÍNH XÁC tuyệt đối, không lo sai số float.
func cross(a, b, c Point) int64 {
    return (b.X-a.X)*(c.Y-a.Y) - (b.Y-a.Y)*(c.X-a.X)
}
\`\`\`

### 2.3 Walk-through bằng số

Lấy \`a = (0,0)\`, \`b = (4,0)\` (đi sang phải dọc trục x). Xét nhiều vị trí của \`c\`:

**Ví dụ 1 — \`c = (2,3)\` (ở phía TRÊN):**
\`\`\`
cross = (4-0)·(3-0) − (0-0)·(2-0)
      = 4·3 − 0·2
      = 12 − 0 = 12 > 0  → CCW (rẽ trái) ✓
\`\`\`
Đứng tại \`(0,0)\` nhìn sang phải tới \`(4,0)\`, để với tới \`(2,3)\` ở trên ta phải quay trái. Đúng.

**Ví dụ 2 — \`c = (2,−3)\` (ở phía DƯỚI):**
\`\`\`
cross = (4)·(-3) − (0)·(2) = -12 − 0 = -12 < 0  → CW (rẽ phải) ✓
\`\`\`

**Ví dụ 3 — \`c = (7,0)\` (thẳng hàng, cùng tia):**
\`\`\`
cross = (4)·(0) − (0)·(7) = 0  → collinear ✓
\`\`\`

**Ví dụ 4 — \`c = (-2,0)\` (thẳng hàng, ngược tia):**
\`\`\`
cross = (4)·(0) − (0)·(-2) = 0  → collinear ✓
\`\`\`

**Ví dụ 5 — diện tích:** với \`a=(0,0)\`, \`b=(4,0)\`, \`c=(0,3)\`:
\`\`\`
cross = (4)·(3) − (0)·(0) = 12
diện tích tam giác = |12| / 2 = 6
\`\`\`
Kiểm tra: tam giác vuông cạnh 4 và 3 → diện tích \`= ½·4·3 = 6\` ✓.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Vì sao cross = 0 lại nghĩa là thẳng hàng?"* — Vì \`u × v = |u||v| sin θ\`; \`sin θ = 0\` khi \`θ = 0°\` hoặc \`180°\`, tức hai vector song song → ba điểm thẳng hàng.
- *"Tại sao dùng int64 mà không float?"* — Tọa độ nguyên + cross là phép \`nhân/trừ\` số nguyên → kết quả nguyên, **không có sai số làm tròn**. Đây là cách an toàn nhất (xem mục 10).
- *"Cross product có tràn số (overflow) không?"* — Có thể! Nếu tọa độ tới \`±10^9\`, tích lên tới \`~10^18\`, vẫn vừa \`int64\` (\`~9.2×10^18\`). Nhưng nếu lớn hơn phải dùng \`big.Int\` hoặc \`int128\`.

⚠ **Lỗi thường gặp.** Nhầm thứ tự \`cross(a,b,c)\` ≠ \`cross(a,c,b)\` — đảo hai điểm cuối thì **đổi dấu**. Luôn cố định quy ước: \`cross(a,b,c)\` = "đứng ở a, đi tới b, c nằm bên nào".

🔁 **Dừng lại tự kiểm tra.** \`a=(1,1)\`, \`b=(3,1)\`, \`c=(2,5)\`. \`c\` nằm bên nào của \`a→b\`?

<details><summary>Đáp án</summary>

\`cross = (3-1)·(5-1) − (1-1)·(2-1) = 2·4 − 0·1 = 8 > 0\` → CCW, \`c\` ở bên **trái** (đúng vì \`b\` đi sang phải, \`c\` ở trên).
</details>

📝 **Tóm tắt mục 2.**
- \`u × v = uX·vY − uY·vX\` (số trong 2D).
- \`cross(a,b,c) = (b−a)×(c−a)\`: \`>0\` trái/CCW, \`<0\` phải/CW, \`=0\` thẳng hàng.
- \`|cross|\` = diện tích hình bình hành; \`/2\` = diện tích tam giác.
- Dùng integer → chính xác tuyệt đối, chú ý overflow với tọa độ lớn.

---

## 3. Orientation của ba điểm

Đây chỉ là cross product được "đóng gói" thành ba trạng thái rõ ràng.

\`\`\`go
const (
    Collinear        = 0
    Counterclockwise = 1 // CCW, rẽ trái
    Clockwise        = 2 // CW, rẽ phải
)

// orientation trả về một trong ba hằng trên cho bộ ba a, b, c.
func orientation(a, b, c Point) int {
    cr := cross(a, b, c)
    switch {
    case cr > 0:
        return Counterclockwise
    case cr < 0:
        return Clockwise
    default:
        return Collinear
    }
}
\`\`\`

**≥ 4 ví dụ số** (cố định \`a=(0,0)\`, \`b=(4,4)\` — đường chéo lên):

| \`c\` | \`cross = (4)(cY) − (4)(cX)\` | Orientation |
|-----|----------------------------|-------------|
| \`(0,4)\` | \`4·4 − 4·0 = 16 > 0\` | CCW (trái) |
| \`(4,0)\` | \`4·0 − 4·4 = -16 < 0\` | CW (phải) |
| \`(2,2)\` | \`4·2 − 4·2 = 0\` | Collinear |
| \`(8,8)\` | \`4·8 − 4·8 = 0\` | Collinear |
| \`(1,3)\` | \`4·3 − 4·1 = 8 > 0\` | CCW |

📝 **Tóm tắt mục 3.** \`orientation(a,b,c)\` chỉ là dấu của \`cross(a,b,c)\`, gói thành CCW/CW/Collinear. Toàn bộ phần còn lại của bài chỉ là gọi hàm này nhiều lần một cách thông minh.

---

## 4. Hai đoạn thẳng có giao nhau?

Cho đoạn \`p1p2\` và \`q1q2\`. Chúng cắt nhau khi nào?

💡 **Trực giác.** Hai đoạn \`AB\` và \`CD\` cắt nhau khi và chỉ khi: \`C\` và \`D\` nằm ở **hai phía khác nhau** của đường thẳng \`AB\`, *VÀ* \`A\` và \`B\` nằm ở **hai phía khác nhau** của đường thẳng \`CD\`. Tưởng tượng hai cây bút bắt chéo: mỗi cây phải "vắt qua" cây kia. Nếu chỉ một cây vắt qua mà cây kia không, chúng không chạm.

"Hai phía khác nhau" = hai orientation **trái dấu**.

### 4.1 Trường hợp tổng quát (general case)

Tính 4 orientation:
\`\`\`
o1 = orientation(p1, p2, q1)
o2 = orientation(p1, p2, q2)
o3 = orientation(q1, q2, p1)
o4 = orientation(q1, q2, p2)
\`\`\`
Nếu \`o1 ≠ o2\` **và** \`o3 ≠ o4\` → giao nhau.

### 4.2 Trường hợp collinear (đặc biệt)

Khi một orientation \`= 0\`, ba điểm thẳng hàng — phải kiểm tra điểm có nằm *trên* đoạn không (on-segment):

\`\`\`go
// onSegment: giả sử a, b, c thẳng hàng. Trả true nếu b nằm trên đoạn ac.
func onSegment(a, b, c Point) bool {
    return min64(a.X, c.X) <= b.X && b.X <= max64(a.X, c.X) &&
        min64(a.Y, c.Y) <= b.Y && b.Y <= max64(a.Y, c.Y)
}

func min64(a, b int64) int64 { if a < b { return a }; return b }
func max64(a, b int64) int64 { if a > b { return a }; return b }

// segmentsIntersect: true nếu đoạn p1p2 và q1q2 có điểm chung.
func segmentsIntersect(p1, p2, q1, q2 Point) bool {
    o1 := orientation(p1, p2, q1)
    o2 := orientation(p1, p2, q2)
    o3 := orientation(q1, q2, p1)
    o4 := orientation(q1, q2, p2)

    // Trường hợp tổng quát: cắt chéo nhau.
    if o1 != o2 && o3 != o4 {
        return true
    }
    // Các trường hợp collinear / chạm đầu mút.
    if o1 == Collinear && onSegment(p1, q1, p2) { return true }
    if o2 == Collinear && onSegment(p1, q2, p2) { return true }
    if o3 == Collinear && onSegment(q1, p1, q2) { return true }
    if o4 == Collinear && onSegment(q1, p2, q2) { return true }
    return false
}
\`\`\`

### 4.3 Walk-through bằng số

**Ví dụ 1 — cắt chéo:** \`p1=(0,0)\`, \`p2=(4,4)\`, \`q1=(0,4)\`, \`q2=(4,0)\` (hai đường chéo của hình vuông).
\`\`\`
o1 = orientation((0,0),(4,4),(0,4)): cross = 4·4−4·0 = 16 > 0 → CCW
o2 = orientation((0,0),(4,4),(4,0)): cross = 4·0−4·4 = -16 < 0 → CW
o1 ≠ o2 ✓
o3 = orientation((0,4),(4,0),(0,0)): cross = (4-0)(0-4)−(0-4)(0-0)=4·(-4)−(-4)·0=-16<0 → CW
o4 = orientation((0,4),(4,0),(4,4)): cross = (4)(4-4)−(-4)(4-0)=0−(-16)=16>0 → CCW
o3 ≠ o4 ✓  →  GIAO NHAU ✓ (tại (2,2))
\`\`\`

**Ví dụ 2 — không giao:** \`p1=(0,0)\`, \`p2=(2,2)\`, \`q1=(3,0)\`, \`q2=(5,2)\` (hai đoạn song song lệch nhau).
\`\`\`
o1 = orientation((0,0),(2,2),(3,0)): cross=2·0−2·3=-6<0 → CW
o2 = orientation((0,0),(2,2),(5,2)): cross=2·2−2·5=4-10=-6<0 → CW
o1 == o2  → KHÔNG cắt chéo → không giao ✓
\`\`\`

**Ví dụ 3 — collinear chồng nhau:** \`p1=(0,0)\`, \`p2=(4,0)\`, \`q1=(2,0)\`, \`q2=(6,0)\`.
\`\`\`
Tất cả thẳng hàng (mọi cross = 0). o1=Collinear, onSegment((0,0),(2,0),(4,0)):
2 ∈ [0,4] và 0 ∈ [0,0] → true → GIAO NHAU ✓ (chồng đoạn [2,4]).
\`\`\`

**Ví dụ 4 — chạm đầu mút:** \`p1=(0,0)\`, \`p2=(4,0)\`, \`q1=(4,0)\`, \`q2=(4,4)\` (chữ T).
\`\`\`
o4 = orientation((4,0),(4,4),(4,0)) = Collinear, onSegment((4,0),(4,0),(4,4)) → true → GIAO ✓
\`\`\`

⚠ **Lỗi thường gặp.** Quên xử lý collinear → khẳng định hai đoạn chồng lên nhau là "không giao". Trường hợp \`o == Collinear\` *phải* được kiểm tra riêng bằng \`onSegment\`.

🔁 **Dừng lại tự kiểm tra.** \`p1=(0,0)\`, \`p2=(2,0)\`, \`q1=(3,0)\`, \`q2=(5,0)\` — hai đoạn collinear nhưng rời nhau. Giao không?

<details><summary>Đáp án</summary>

Mọi cross = 0 (thẳng hàng). \`onSegment((0,0),(3,0),(2,0))\`: \`3 ∈ [0,2]\`? Không (\`3 > 2\`). Các on-segment khác cũng false. → **Không giao** ✓.
</details>

📝 **Tóm tắt mục 4.** Cắt chéo ⇔ \`o1≠o2 ∧ o3≠o4\`. Khi có orientation \`=0\` phải dùng \`onSegment\` xử lý collinear/chạm mút. \`O(1)\` mỗi cặp đoạn.

---

## 5. Diện tích đa giác — công thức shoelace (Gauss)

💡 **Trực giác.** Gọi là "dây giày" (shoelace) vì khi viết tọa độ thành hai cột rồi nhân chéo, các đường nối trông như dây giày đan chéo. Bản chất: chia đa giác thành các tam giác có chung gốc tọa độ, cộng *diện tích có dấu* của từng tam giác (cross product). Phần "thừa ra ngoài" mang dấu âm tự triệt tiêu phần "thiếu" → kết quả đúng cho cả đa giác lồi lẫn lõm.

Cho đa giác đỉnh \`P0, P1, ..., P(n-1)\` theo thứ tự (quanh chu vi):

\`\`\`
A = ½ · | Σ (x_i · y_(i+1) − x_(i+1) · y_i) |     (chỉ số mod n)
\`\`\`

**Dấu của tổng (trước khi lấy |·|) cho biết hướng duyệt:** \`> 0\` → CCW, \`< 0\` → CW.

\`\`\`go
// shoelaceSigned trả về 2× diện tích CÓ DẤU (giữ int64, chưa chia 2).
// Dấu > 0: đỉnh xếp CCW. < 0: CW.
func shoelaceSigned(poly []Point) int64 {
    n := len(poly)
    var s int64
    for i := 0; i < n; i++ {
        j := (i + 1) % n
        s += poly[i].X*poly[j].Y - poly[j].X*poly[i].Y
    }
    return s // = 2*diện-tích-có-dấu
}

// polygonArea2 trả về 2× diện tích (không dấu) — giữ nguyên int để không mất chính xác.
// Diện tích thật = polygonArea2(poly) / 2.0
func polygonArea2(poly []Point) int64 {
    s := shoelaceSigned(poly)
    if s < 0 { s = -s }
    return s
}
\`\`\`

### 5.1 Walk-through — tam giác

\`P0=(0,0)\`, \`P1=(4,0)\`, \`P2=(0,3)\`:
\`\`\`
i=0: x0·y1 − x1·y0 = 0·0 − 4·0 = 0
i=1: x1·y2 − x2·y1 = 4·3 − 0·0 = 12
i=2: x2·y0 − x0·y2 = 0·0 − 0·3 = 0
Σ = 12 → diện tích = |12|/2 = 6 ✓
\`\`\`
(Tam giác vuông cạnh 4,3 → \`½·4·3 = 6\`. Khớp.)

### 5.2 Walk-through — tứ giác (hình vuông cạnh 5)

\`P0=(0,0)\`, \`P1=(5,0)\`, \`P2=(5,5)\`, \`P3=(0,5)\`:
\`\`\`
i=0: 0·0 − 5·0 = 0
i=1: 5·5 − 5·0 = 25
i=2: 5·5 − 0·5 = 25
i=3: 0·0 − 0·5 = 0
Σ = 50 → diện tích = 50/2 = 25 ✓ (= 5²)
\`\`\`

### 5.3 Hai ví dụ nữa

**Hướng CW (đảo thứ tự hình vuông trên):** \`(0,0),(0,5),(5,5),(5,0)\` → \`Σ = -50\` → dấu âm = CW, diện tích vẫn \`25\`.

**Đa giác lõm (chữ L):** \`(0,0),(4,0),(4,2),(2,2),(2,4),(0,4)\`:
\`\`\`
i=0: 0·0−4·0 = 0
i=1: 4·2−4·0 = 8
i=2: 4·2−2·2 = 8−4 = 4
i=3: 2·4−2·2 = 8−4 = 4
i=4: 2·4−0·4 = 8
i=5: 0·0−0·4 = 0
Σ = 24 → diện tích = 12
\`\`\`
Kiểm tra hình học: chữ L = hình vuông 4×4 (=16) bỏ góc 2×2 (=4) → \`16−4 = 12\` ✓.

⚠ **Lỗi thường gặp.** (1) Quên chia 2 → diện tích gấp đôi. (2) Quên lấy trị tuyệt đối → ra số âm khi đỉnh xếp CW. (3) Quên \`% n\` ở cặp đỉnh cuối-nối-đầu → thiếu một số hạng.

🔁 **Dừng lại tự kiểm tra.** Tam giác \`(1,1),(5,1),(3,4)\`. Diện tích?

<details><summary>Đáp án</summary>

\`Σ = (1·1−5·1) + (5·4−3·1) + (3·1−1·4) = (1−5)+(20−3)+(3−4) = -4+17-1 = 12\`. Diện tích \`= 12/2 = 6\`. (Đáy 4, cao 3 → \`½·4·3 = 6\` ✓.)
</details>

📝 **Tóm tắt mục 5.** Shoelace: \`A = ½|Σ(x_i·y_{i+1} − x_{i+1}·y_i)|\`. Dấu tổng = hướng duyệt (CCW dương). \`O(n)\`. Giữ tổng dưới dạng \`2A\` integer để khỏi mất chính xác.

---

## 6. Bao lồi (Convex Hull)

💡 **Trực giác.** Hãy đóng một loạt đinh lên bảng (các điểm), rồi căng một sợi dây thun bao quanh tất cả. Khi buông tay, dây thun co lại ôm sát lớp ngoài cùng — đường viền đó chính là **bao lồi**: đa giác lồi nhỏ nhất chứa mọi điểm. Mọi điểm bên trong "rút" vào không nằm trên dây.

### 6.1 Andrew's Monotone Chain — \`O(n log n)\`

Ý tưởng: sort điểm theo \`x\` (rồi \`y\`), xây **lower hull** (đáy) từ trái sang phải, rồi **upper hull** (đỉnh) từ phải sang trái. Khi thêm mỗi điểm, dùng cross product để bỏ các điểm tạo "khúc cua sai chiều".

\`\`\`go
import "sort"

// convexHull trả về các đỉnh bao lồi theo CCW (loại điểm trùng, bỏ điểm collinear ở biên).
func convexHull(pts []Point) []Point {
    n := len(pts)
    if n < 3 {
        return append([]Point(nil), pts...) // 0,1,2 điểm: trả nguyên
    }
    // sort theo x, rồi y
    sort.Slice(pts, func(i, j int) bool {
        if pts[i].X != pts[j].X {
            return pts[i].X < pts[j].X
        }
        return pts[i].Y < pts[j].Y
    })

    hull := make([]Point, 0, 2*n)

    // Lower hull: đi từ trái sang phải.
    for _, p := range pts {
        // Bỏ điểm cuối nếu nó tạo khúc cua KHÔNG ngược chiều kim đồng hồ.
        // cross <= 0 nghĩa là thẳng hàng hoặc rẽ phải → loại.
        for len(hull) >= 2 && cross(hull[len(hull)-2], hull[len(hull)-1], p) <= 0 {
            hull = hull[:len(hull)-1]
        }
        hull = append(hull, p)
    }

    // Upper hull: đi từ phải sang trái.
    lower := len(hull) + 1
    for i := n - 2; i >= 0; i-- {
        p := pts[i]
        for len(hull) >= lower && cross(hull[len(hull)-2], hull[len(hull)-1], p) <= 0 {
            hull = hull[:len(hull)-1]
        }
        hull = append(hull, p)
    }

    return hull[:len(hull)-1] // bỏ điểm cuối vì nó trùng điểm đầu
}
\`\`\`

> **Lưu ý collinear:** dùng \`<= 0\` (loại cả điểm thẳng hàng trên biên) cho hull "gọn". Nếu muốn giữ điểm collinear trên cạnh, đổi thành \`< 0\`. Đây chính là edge case dễ sai (xem mục 11).

### 6.2 Walk-through — 5 điểm

Điểm: \`(0,0), (1,1), (2,0), (2,2), (0,2)\`. Sort theo x rồi y:
\`\`\`
(0,0), (0,2), (1,1), (2,0), (2,2)
\`\`\`

**Lower hull:**
| Thêm | hull trước | cross kiểm tra | Hành động | hull sau |
|------|------------|----------------|-----------|----------|
| \`(0,0)\` | \`[]\` | — | push | \`[(0,0)]\` |
| \`(0,2)\` | \`[(0,0)]\` | — (chưa đủ 2) | push | \`[(0,0),(0,2)]\` |
| \`(1,1)\` | \`[(0,0),(0,2)]\` | \`cross((0,0),(0,2),(1,1))=(0)(1)−(2)(1)=-2≤0\` | pop \`(0,2)\`, push | \`[(0,0),(1,1)]\` |
| \`(2,0)\` | \`[(0,0),(1,1)]\` | \`cross((0,0),(1,1),(2,0))=(1)(0)−(1)(2)=-2≤0\` | pop \`(1,1)\`, push | \`[(0,0),(2,0)]\` |
| \`(2,2)\` | \`[(0,0),(2,0)]\` | \`cross((0,0),(2,0),(2,2))=(2)(2)−(0)(2)=4>0\` | push | \`[(0,0),(2,0),(2,2)]\` |

Lower hull = \`(0,0) → (2,0) → (2,2)\`. Điểm \`(1,1)\` (ở trong) đã bị loại đúng.

**Upper hull** (từ phải sang trái, \`lower=4\`): thêm \`(2,0),(1,1),(0,2),(0,0)\` lần lượt, kết quả nối: \`(2,2) → (0,2) → (0,0)\`.

Bao lồi cuối: \`(0,0), (2,0), (2,2), (0,2)\` — hình vuong, \`(1,1)\` bị loại ✓. \`O(n log n)\` do sort thống trị.

### 6.3 Graham scan (biến thể)

Thay vì sort theo \`x\`, Graham scan chọn điểm thấp nhất (\`y\` nhỏ nhất, rồi \`x\` nhỏ nhất) làm gốc, **sort các điểm còn lại theo góc cực** quanh gốc, rồi quét một vòng dùng cùng quy tắc cross product để loại điểm rẽ phải. Cùng độ phức tạp \`O(n log n)\`; monotone chain thường được ưa hơn vì sort theo tọa độ ổn định hơn sort theo góc (không cần \`atan2\`, dùng cross để so sánh góc).

### 6.4 Ứng dụng

- **Đường kính tập điểm (diameter):** hai điểm xa nhau nhất chắc chắn nằm trên hull → chỉ cần xét các đỉnh hull (rotating calipers, \`O(n)\` sau khi có hull).
- **Phát hiện va chạm (collision):** bao hai vật bằng convex hull rồi kiểm tra hull giao nhau (nhanh hơn so toàn bộ điểm).
- **Loại outlier trong ML:** điểm trên hull thường là cực trị / ngoại lai.

📝 **Tóm tắt mục 6.** Monotone chain: sort \`O(n log n)\`, build lower + upper bằng cross product, mỗi điểm push/pop \`O(1)\` khấu hao → tổng \`O(n log n)\`. \`<=0\` loại collinear, \`<0\` giữ. Dây thun ôm đám đinh = bao lồi.

---

## 7. Điểm có nằm trong đa giác?

💡 **Trực giác (ray casting).** Đứng tại điểm cần kiểm tra, bắn một tia (ray) đi thẳng sang phải tới vô cực. Đếm số lần tia này **cắt** các cạnh đa giác. **Số lẻ → bên trong; số chẵn → bên ngoài.** Lý do: mỗi lần băng qua một cạnh, bạn "đổi phe" trong/ngoài. Bắt đầu từ ngoài (vô cực), nếu cắt lẻ lần thì đang ở trong.

\`\`\`go
// pointInPolygon: ray casting. Trả true nếu p nằm TRONG đa giác poly.
// (Điểm nằm ĐÚNG trên biên: kết quả không xác định — xử lý riêng nếu cần, xem mục 11.)
func pointInPolygon(p Point, poly []Point) bool {
    n := len(poly)
    inside := false
    for i, j := 0, n-1; i < n; j, i = i, i+1 {
        yi, yj := poly[i].Y, poly[j].Y
        xi, xj := poly[i].X, poly[j].X
        // Cạnh (poly[j], poly[i]) có bắc qua đường ngang y = p.Y không?
        if (yi > p.Y) != (yj > p.Y) {
            // Hoành độ giao điểm của cạnh với đường y = p.Y.
            // Dùng float ở ĐÂY vì giao điểm thường không nguyên.
            xCross := float64(xj-xi)*float64(p.Y-yi)/float64(yj-yi) + float64(xi)
            if float64(p.X) < xCross {
                inside = !inside
            }
        }
    }
    return inside
}
\`\`\`

### 7.1 Walk-through

Hình vuông \`(0,0),(4,0),(4,4),(0,4)\`, kiểm tra \`p=(2,2)\` (giữa hình):

Tia sang phải từ \`(2,2)\`. Xét 4 cạnh, chỉ cạnh nào "bắc qua" \`y=2\` mới đếm:
- Cạnh \`(0,4)-(0,0)\` (trái): \`y\` chạy \`4→0\`, có bắc qua \`y=2\`. \`xCross = (0-0)·... + 0 = 0\`. \`p.X=2 < 0\`? Không → không lật.
- Cạnh \`(4,0)-(4,4)\` (phải): \`y\` chạy \`0→4\`, bắc qua \`y=2\`. \`xCross = 4\`. \`2 < 4\`? Có → lật → \`inside = true\`.
- Cạnh đáy \`(0,0)-(4,0)\` và đỉnh \`(4,4)-(0,4)\`: hai đầu cùng phía so với \`y=2\` → bỏ.

Tổng cắt bên phải = 1 (lẻ) → **bên trong** ✓.

**Ví dụ ngoài:** \`p=(5,2)\` (bên phải hình vuông). Cạnh phải \`x=4\` có \`xCross=4\`; \`5 < 4\`? Không. Cạnh trái \`xCross=0\`; \`5<0\`? Không. Tổng = 0 (chẵn) → **bên ngoài** ✓.

**Ví dụ trên/dưới:** \`p=(2,5)\` (phía trên). Không cạnh nào bắc qua \`y=5\` (đa giác cao tới 4) → 0 lần cắt → ngoài ✓.

**Winding number (biến thể):** thay vì đếm chẵn/lẻ, cộng dồn *góc quay* của các cạnh quanh điểm; tổng \`±2π\` (số vòng ≠ 0) → trong. Mạnh hơn ray casting với đa giác tự cắt, nhưng ray casting đủ dùng cho đa giác đơn.

❓ **Câu hỏi tự nhiên.** *"Nếu tia đi đúng qua một đỉnh thì sao?"* — Đó là điểm suy biến (degenerate): tia chạm đúng đỉnh có thể bị đếm 0 hoặc 2 lần. Mẹo chuẩn: dùng so sánh **bất đối xứng** \`(yi > p.Y) != (yj > p.Y)\` (một biên \`>\`, một biên \`>=\` ngầm) để chỉ tính mỗi đỉnh một lần. Code trên đã dùng đúng mẹo này.

⚠ **Lỗi thường gặp.** Điểm nằm **đúng trên biên**: ray casting cho kết quả không xác định. Nếu cần coi biên là "trong", phải kiểm tra on-segment riêng *trước*.

🔁 **Dừng lại tự kiểm tra.** Với hình vuông \`(0,0),(4,0),(4,4),(0,4)\`, điểm \`(0,2)\` (nằm trên cạnh trái) — ray casting trả gì?

<details><summary>Đáp án</summary>

\`(0,2)\` nằm đúng trên cạnh trái \`x=0\`. Cạnh trái \`xCross=0\`; \`p.X=0 < 0\`? Không. Cạnh phải \`xCross=4\`; \`0<4\`? Có → lật 1 lần → "trong". Nhưng điểm thực ra ở **biên** → đây là vùng xám, cần kiểm tra on-segment riêng nếu muốn chắc.
</details>

📝 **Tóm tắt mục 7.** Ray casting: đếm giao của tia ngang sang phải với các cạnh; lẻ = trong, chẵn = ngoài. \`O(n)\`. Dùng so sánh bất đối xứng tránh đếm trùng đỉnh. Điểm trên biên là edge case.

---

## 8. Cặp điểm gần nhất (Closest Pair) — \`O(n log n)\`

💡 **Trực giác.** Brute force so mọi cặp = \`O(n²)\`. Chia để trị: cắt đôi tập điểm bằng đường dọc, tìm cặp gần nhất ở nửa trái, nửa phải (đệ quy), lấy \`d = min(d_trái, d_phải)\`. Cặp gần nhất *xuyên qua* đường cắt chỉ có thể nằm trong **dải (strip)** rộng \`2d\` quanh đường cắt — và trong dải đó, mỗi điểm chỉ cần so với ≤ 7 điểm kế tiếp (sắp theo \`y\`). Đây là phần "ghép" thông minh khiến \`O(n²)\` rớt xuống \`O(n log n)\`. (Recap chia để trị: [Lesson 17](../lesson-17-divide-and-conquer/).)

Sơ đồ thuật toán:
1. Sort điểm theo \`x\`. \`O(n log n)\`.
2. Đệ quy chia đôi → tìm \`d\` của hai nửa.
3. Lấy các điểm trong dải \`|x − x_mid| < d\`, sort theo \`y\`.
4. Với mỗi điểm trong dải, so với tối đa 7 điểm kế tiếp (theo \`y\`). Cập nhật \`d\`.
5. Quan hệ truy hồi \`T(n) = 2T(n/2) + O(n) = O(n log n)\` (theo Master Theorem, [Lesson 17](../lesson-17-divide-and-conquer/)).

> **Vì sao chỉ 7 điểm?** Trong một ô vuông \`d × d\` chỉ chứa được tối đa vài điểm (vì hai điểm cùng nửa cách nhau ≥ \`d\`). Xét dải \`2d\` cao \`d\`, hình học chứng minh mỗi điểm có ≤ 7 hàng xóm cần kiểm tra → bước strip là \`O(n)\`, không phải \`O(n²)\`.

(Code đầy đủ closest pair khá dài; ý tưởng và truy hồi như trên. Bài tập 7 yêu cầu phác code phần strip.)

📝 **Tóm tắt mục 8.** D&C: chia đôi theo \`x\`, ghép bằng strip rộng \`2d\`, mỗi điểm so ≤ 7 hàng xóm theo \`y\`. \`T(n)=2T(n/2)+O(n)=O(n log n)\`.

---

## 9. Ứng dụng thực tế

| Lĩnh vực | Dùng gì | Ví dụ cụ thể |
|----------|---------|--------------|
| **Đồ họa máy tính** | orientation, polygon fill | Rasterize tam giác: orientation quyết định pixel trong/ngoài; clipping |
| **GIS / bản đồ** | point-in-polygon, area | "Tọa độ GPS này thuộc tỉnh nào?", tính diện tích thửa đất từ tọa độ |
| **Game collision** | convex hull, segment intersect | Hitbox lồi va chạm; tia ngắm có trúng vật không (ray-segment) |
| **Robot path** | convex hull, visibility | Tránh chướng ngại: bao chướng ngại bằng hull, đi quanh biên |
| **Machine Learning** | convex hull | Loại outlier (điểm trên hull), tính convex hull của cluster |
| **CAD/CAM** | tất cả | Kiểm tra bản vẽ kỹ thuật, mô phỏng cắt gọt |

---

## 10. Độ chính xác số thực — quy tắc sống còn

⚠ **Đây là phần khiến hình học tính toán khác mọi lĩnh vực khác.** Một thuật toán đúng về lý thuyết có thể *sai* trong thực tế vì sai số làm tròn float.

### 10.1 Đừng dùng \`==\` cho float

\`0.1 + 0.2 == 0.3\` trả về \`false\` trong hầu hết ngôn ngữ! Vì float không biểu diễn chính xác các số thập phân.

**Số ví dụ:** \`0.1 + 0.2 = 0.30000000000000004\` (float64) ≠ \`0.3\`.

So sánh đúng — dùng **epsilon**:
\`\`\`go
const eps = 1e-9

func feq(a, b float64) bool { return math.Abs(a-b) < eps }   // a == b
func sign(x float64) int {                                    // dấu có epsilon
    if x > eps { return 1 }
    if x < -eps { return -1 }
    return 0
}
\`\`\`

### 10.2 Ưu tiên integer arithmetic

💡 **Quy tắc vàng:** *nếu tọa độ là số nguyên, hãy giữ mọi tính toán ở số nguyên.* Cross product, orientation, shoelace — tất cả là phép nhân/cộng/trừ → kết quả nguyên, **không sai số**. Đó là lý do code ở các mục trên dùng \`int64\` chứ không \`float64\`.

Chỉ chuyển sang float khi *bắt buộc* (vd tọa độ giao điểm trong ray casting — thường không nguyên). Khi đó cô lập phần float, so sánh bằng epsilon.

**Ví dụ minh họa lợi ích:** Ba điểm \`(0,0),(1000000,1),(2000000,2)\` — gần như thẳng hàng. Integer cross: \`(1000000)(2)−(1)(2000000) = 2000000−2000000 = 0\` → **chính xác** collinear. Nếu tính bằng float qua slope \`1/1000000\` rồi so sánh, sai số có thể khiến kết luận sai.

❓ **Câu hỏi tự nhiên.** *"Chọn epsilon bao nhiêu?"* — Phụ thuộc thang tọa độ. \`1e-9\` hợp với tọa độ cỡ \`[-10^4, 10^4]\`. Tọa độ lớn hơn cần epsilon lớn hơn (relative epsilon). Quy tắc: epsilon nên nhỏ hơn nhiều khoảng cách nhỏ nhất "có nghĩa" trong bài toán.

📝 **Tóm tắt mục 10.** Không \`==\` float → dùng epsilon. Tọa độ nguyên → giữ integer (cross/area/orientation chính xác tuyệt đối). Chỉ float khi buộc phải, rồi cô lập + epsilon. Cẩn thận overflow \`int64\` với tọa độ rất lớn.

---

## 11. Cạm bẫy thường gặp

| Cạm bẫy | Triệu chứng | Cách tránh |
|---------|-------------|------------|
| **Float precision** | Collinear bị coi là không, kết quả "chập chờn" | Dùng integer khi tọa độ nguyên; epsilon khi buộc float |
| **Collinear trong convex hull** | Điểm trên cạnh hull bị giữ/loại sai | Quyết định rõ \`<0\` (giữ) hay \`<=0\` (loại) — và nhất quán |
| **Nhầm dấu orientation (CW↔CCW)** | Hull "lộn trong ra ngoài", area âm bất ngờ | Cố định quy ước \`cross(a,b,c)\`; test với tam giác đã biết hướng |
| **Shoelace quên chia 2** | Diện tích gấp đôi | Luôn \`/2\` ở cuối |
| **Shoelace quên |·|** | Diện tích âm khi đỉnh CW | \`if s<0 { s=-s }\` |
| **Shoelace quên \`% n\`** | Thiếu cạnh nối đỉnh cuối → đầu | \`j := (i+1) % n\` |
| **Point on boundary** | Ray casting cho kết quả ngẫu nhiên | Kiểm tra on-segment riêng trước nếu biên = "trong" |
| **Tia qua đúng đỉnh** | Đếm 0 hoặc 2 lần | So sánh bất đối xứng \`(yi>y) != (yj>y)\` |
| **Overflow int64** | Cross product ra số rác với tọa độ ~10^9+ | Dùng \`big.Int\`/int128 nếu tọa độ rất lớn |

---

## Bài tập

> Tất cả đều có **Lời giải chi tiết** ngay bên dưới. Cố làm trước khi xem.

1. **Orientation ba điểm.** Viết hàm trả về \`"CCW"\`, \`"CW"\` hoặc \`"COLLINEAR"\` cho ba điểm. Cho \`(0,0),(2,2),(3,1)\` thì trả gì?
2. **Diện tích đa giác (shoelace).** Tính diện tích ngũ giác \`(0,0),(4,0),(5,3),(2,5),(-1,3)\`.
3. **Convex hull.** Cho 8 điểm \`(0,0),(1,1),(2,2),(2,0),(0,2),(1,3),(3,1),(2,2)\`, tìm bao lồi.
4. **Point in polygon.** Cho tam giác \`(0,0),(6,0),(3,6)\` — các điểm \`(3,2)\`, \`(0,4)\`, \`(3,6)\` nằm trong / ngoài / trên biên?
5. **Số điểm tối đa trên một đường thẳng (max points on a line).** Cho \`n\` điểm, tìm số điểm nhiều nhất cùng nằm trên một đường thẳng. Big-O?
6. **Hai đoạn thẳng giao nhau.** Xác định \`(0,0)-(5,5)\` và \`(0,5)-(5,0)\` có giao không, và tại đâu (collinear hay tổng quát).
7. **(Khó) Closest pair — strip.** Phác phần "strip check" của thuật toán closest pair: cho danh sách điểm trong dải đã sort theo \`y\` và khoảng cách \`d\` hiện tại, tìm cặp gần hơn \`d\`. Vì sao chỉ cần so ≤ 7 điểm kế tiếp?

---

## Lời giải chi tiết

### Bài 1 — Orientation ba điểm · \`O(1)\`

\`\`\`go
func orient3(a, b, c Point) string {
    switch cr := (b.X-a.X)*(c.Y-a.Y) - (b.Y-a.Y)*(c.X-a.X); {
    case cr > 0:
        return "CCW"
    case cr < 0:
        return "CW"
    default:
        return "COLLINEAR"
    }
}
\`\`\`
**Cho \`(0,0),(2,2),(3,1)\`:** \`cross = (2-0)(1-0) − (2-0)(3-0) = 2·1 − 2·3 = 2 − 6 = -4 < 0\` → **"CW"** (rẽ phải). Trực giác: đi từ \`(0,0)\` lên \`(2,2)\` (đường chéo lên-phải), điểm \`(3,1)\` nằm bên phải-dưới đường đó. **Big-O:** \`O(1)\`.

### Bài 2 — Diện tích ngũ giác · \`O(n)\`

\`(0,0),(4,0),(5,3),(2,5),(-1,3)\`:
\`\`\`
i=0: x0·y1 − x1·y0 = 0·0 − 4·0  = 0
i=1: x1·y2 − x2·y1 = 4·3 − 5·0  = 12
i=2: x2·y3 − x3·y2 = 5·5 − 2·3  = 25 − 6 = 19
i=3: x3·y4 − x4·y3 = 2·3 − (-1)·5 = 6 + 5 = 11
i=4: x4·y0 − x0·y4 = (-1)·0 − 0·3 = 0
Σ = 0 + 12 + 19 + 11 + 0 = 42
Diện tích = |42| / 2 = 21
\`\`\`
**Đáp án: 21.** Dấu dương → đỉnh xếp CCW. **Big-O:** \`O(n)\`.

### Bài 3 — Convex hull · \`O(n log n)\`

Bỏ điểm trùng \`(2,2)\` lặp lại → tập \`{(0,0),(1,1),(2,2),(2,0),(0,2),(1,3),(3,1)}\`. Chạy monotone chain (mục 6):

Sort theo x,y: \`(0,0),(0,2),(1,1),(1,3),(2,0),(2,2),(3,1)\`.

Các điểm cực biên: \`(0,0)\` (góc dưới-trái), \`(2,0)\` (dưới), \`(3,1)\` (phải), \`(1,3)\` (trên), \`(0,2)\` (trái). Các điểm trong (\`(1,1),(2,2)\`) bị loại.

**Bao lồi (CCW từ \`(0,0)\`):** \`(0,0) → (2,0) → (3,1) → (1,3) → (0,2)\`. Một ngũ giác lồi. **Big-O:** \`O(n log n)\` (sort thống trị; push/pop khấu hao \`O(n)\`).

### Bài 4 — Point in polygon · \`O(n)\` mỗi điểm

Tam giác \`(0,0),(6,0),(3,6)\`:
- **\`(3,2)\`** — tia phải từ \`(3,2)\`. Cạnh trái \`(0,0)-(3,6)\` bắc qua \`y=2\`: tại \`y=2\`, \`x = 0 + (3-0)·(2-0)/(6-0) = 1\`. \`3 < 1\`? Không. Cạnh phải \`(3,6)-(6,0)\`: tại \`y=2\`, \`x = 3 + (6-3)·(2-6)/(0-6) = 3 + 3·(-4)/(-6) = 3+2 = 5\`. \`3 < 5\`? Có → lật. Đáy \`y=0\` không bắc qua \`y=2\`. Tổng 1 (lẻ) → **TRONG** ✓.
- **\`(0,4)\`** — tia phải. Cạnh trái tại \`y=4\`: \`x = 3·4/6 = 2\`. \`0 < 2\`? Có → lật. Cạnh phải tại \`y=4\`: \`x = 3 + 3·(4-6)/(-6) = 3+1 = 4\`. \`0<4\`? Có → lật lại. Tổng 2 (chẵn) → **NGOÀI** ✓ (điểm ở bên trái tam giác).
- **\`(3,6)\`** — chính là đỉnh trên cùng → **TRÊN BIÊN** (đỉnh). Ray casting tại đỉnh là vùng xám; kiểm tra trùng đỉnh trực tiếp → nằm trên biên.

**Big-O:** \`O(n)\` mỗi truy vấn.

### Bài 5 — Max points on a line · \`O(n²)\`

**Ý tưởng:** cố định mỗi điểm \`i\` làm gốc; với mọi điểm \`j\` khác, tính **độ dốc (slope)** của đoạn \`i→j\`. Các điểm cùng slope (qua \`i\`) thì thẳng hàng với \`i\`. Đếm slope phổ biến nhất bằng hash map.

**Mẹo tránh float:** đừng dùng slope dạng \`dy/dx\` (float, sai số + chia 0). Dùng **cặp \`(dy, dx)\` đã rút gọn** bằng gcd làm key:
\`\`\`go
import "math"

func maxPointsOnLine(pts []Point) int {
    n := len(pts)
    if n <= 2 { return n }
    best := 1
    for i := 0; i < n; i++ {
        slopes := map[[2]int64]int{}
        dup := 0
        local := 0
        for j := 0; j < n; j++ {
            if j == i { continue }
            dx := pts[j].X - pts[i].X
            dy := pts[j].Y - pts[i].Y
            if dx == 0 && dy == 0 { dup++; continue } // điểm trùng
            g := gcd64(absI(dx), absI(dy))
            dx /= g; dy /= g
            if dx < 0 || (dx == 0 && dy < 0) { dx, dy = -dx, -dy } // chuẩn hóa dấu
            key := [2]int64{dy, dx}
            slopes[key]++
            if slopes[key] > local { local = slopes[key] }
        }
        if local+dup+1 > best { best = local + dup + 1 }
    }
    return best
}

func gcd64(a, b int64) int64 { for b != 0 { a, b = b, a%b }; if a == 0 { return 1 }; return a }
func absI(x int64) int64 { if x < 0 { return -x }; return x }
\`\`\`
**Big-O:** \`O(n²)\` (mỗi gốc quét \`O(n)\` điểm). Đây là cách tối ưu thực tế; \`O(n² log n)\` nếu dùng sort thay map. Chuẩn hóa \`(dy,dx)\` bằng gcd + dấu → tránh float, tránh chia 0 (đường thẳng đứng \`dx=0\` vẫn là key hợp lệ).

### Bài 6 — Hai đoạn giao nhau · \`O(1)\`

\`(0,0)-(5,5)\` và \`(0,5)-(5,0)\`:
\`\`\`
o1 = orientation((0,0),(5,5),(0,5)): cross = 5·5 − 5·0 = 25 > 0 → CCW
o2 = orientation((0,0),(5,5),(5,0)): cross = 5·0 − 5·5 = -25 < 0 → CW   → o1≠o2 ✓
o3 = orientation((0,5),(5,0),(0,0)): cross=(5)(0-5)−(-5)(0-0)=-25<0 → CW
o4 = orientation((0,5),(5,0),(5,5)): cross=(5)(5-5)−(-5)(5-0)=0+25=25>0 → CCW → o3≠o4 ✓
\`\`\`
Cả hai điều kiện thỏa → **GIAO NHAU (trường hợp tổng quát)**, không collinear. Giao điểm tại \`(2.5, 2.5)\` (tâm hình vuông). **Big-O:** \`O(1)\`.

### Bài 7 — Closest pair strip · \`O(n)\` cho bước ghép

\`\`\`go
import "sort"

// stripClosest: strip đã sort theo y; d là khoảng cách tốt nhất hiện có.
// Trả khoảng cách nhỏ hơn nếu tìm thấy (so bình phương để tránh sqrt).
func stripClosest(strip []Point, d2 int64) int64 {
    sort.Slice(strip, func(i, j int) bool { return strip[i].Y < strip[j].Y })
    best := d2
    for i := 0; i < len(strip); i++ {
        // Chỉ so với các điểm có chênh lệch y < d (bình phương < d2).
        for j := i + 1; j < len(strip) && sq(strip[j].Y-strip[i].Y) < best; j++ {
            if dd := dist2(strip[i], strip[j]); dd < best {
                best = dd
            }
        }
    }
    return best
}
func sq(x int64) int64    { return x * x }
func dist2(a, b Point) int64 { return sq(a.X-b.X) + sq(a.Y-b.Y) }
\`\`\`
**Vì sao ≤ 7 điểm?** Trong dải rộng \`2d\`, các điểm cùng một nửa cách nhau ≥ \`d\`. Chia dải thành các ô vuông \`d/2 × d/2\` → mỗi ô chứa tối đa 1 điểm. Một cửa sổ \`2d × d\` chứa tối đa \`4×2 = 8\` ô, trừ chính nó còn 7 ô → mỗi điểm chỉ cần so ≤ 7 điểm kế tiếp theo \`y\`. Vòng \`j\` tự dừng nhờ điều kiện \`Δy < d\`. **Big-O:** bước strip \`O(n)\`; tổng thuật toán \`T(n)=2T(n/2)+O(n)=O(n log n)\`. (Dùng bình phương khoảng cách để giữ integer, tránh \`sqrt\`.)

---

## Code & Minh họa

- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Cross product / Orientation** — click 3 điểm trên canvas, xem dấu cross + CCW/CW/collinear.
  2. **Convex hull** — click thêm điểm, animate từng bước Andrew's monotone chain.
  3. **Point in polygon** — đa giác + điểm, ray casting đếm số giao trực quan.

Code Go cho cross product, orientation, segment intersection, shoelace, convex hull (Andrew), point-in-polygon đã được trình bày **inline** ở các mục trên (mục 2, 3, 4, 5, 6, 7).

## Bài tiếp theo

- [Lesson 48 — Randomized Algorithms](../lesson-48-randomized-algorithms/) — thuật toán ngẫu nhiên: quicksort randomized, Monte Carlo, Las Vegas, hashing ngẫu nhiên. (Một số thuật toán hình học cao cấp như convex hull incremental cũng dùng randomization.)
- Quay lại [Lesson 17 — Chia để trị](../lesson-17-divide-and-conquer/) nếu cần ôn closest pair.
- Trang chính: [Algorithms](../index.html).
`;
