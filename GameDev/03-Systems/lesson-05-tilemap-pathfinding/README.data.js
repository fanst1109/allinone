// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: GameDev/03-Systems/lesson-05-tilemap-pathfinding/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 15 — Tilemap & Pathfinding (lưới ô & tìm đường A*)

> **Bài cuối lĩnh vực GameDev.** Đây vừa là bài học về tìm đường, vừa là **tổng kết toàn bộ pipeline** game/mô phỏng vật lý mà bạn đã đi qua: game loop → vật lý → va chạm → systems → AI tìm đường.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **tilemap** (lưới ô): cách một game dựng thế giới bằng ô vuông, và cách chuyển qua lại giữa **toạ độ ô** (tile) và **toạ độ pixel**.
- Biết cách dò va chạm giữa nhân vật và tile tường (liên hệ AABB ở [L06](../../02-Collision/lesson-01-aabb-circle/)).
- Hiểu **mọi lưới đi được là một đồ thị (graph)**: ô = đỉnh, ô kề = cạnh — nối lại với [DataStructures graph](../../../DataStructures/03-Advanced/lesson-01-graph/).
- Ôn nhanh **BFS** (đường ngắn nhất không trọng số) và **Dijkstra** (có trọng số: bùn đắt hơn cỏ).
- Hiểu sâu **A\\*** = Dijkstra + **heuristic** hướng về đích, với công thức $f = g + h$, qua một **walk-through đầy đủ bằng số thật trên lưới 5×5 có tường**.
- Biết thế nào là heuristic **admissible** (không overestimate) và vì sao nó bảo đảm đường tối ưu; biết **tie-breaking** và **string-pulling** (làm mượt đường).
- Tổng kết và biết **hướng đi tiếp** sau lĩnh vực GameDev.

## Kiến thức tiền đề

- [L14 — ECS & Architecture](../lesson-04-ecs-architecture/) — bài liền trước; AI tìm đường thường là một **system** trong kiến trúc ECS.
- [L06 — AABB & Circle](../../02-Collision/lesson-01-aabb-circle/) — va chạm hộp chữ nhật; dùng để dò nhân vật đụng tile tường.
- [DataStructures — Graph](../../../DataStructures/03-Advanced/lesson-01-graph/) — đỉnh, cạnh, danh sách kề, BFS.
- [Algorithms tier-5 — Graph](../../../Algorithms/tier-5-graph/index.html) — BFS / Dijkstra / A* ở dạng thuật toán tổng quát.

---

## 1. Vì sao học tìm đường? — Đặt vấn đề

💡 **Hình dung.** Bạn chơi một game top-down: người chơi đứng ở góc bản đồ, một con quái ở góc kia. Giữa hai bên là một **bức tường hình chữ L**. Con quái phải **đuổi theo** người chơi. Câu hỏi:

> **Con quái đi tới người chơi bằng cách nào để vòng qua tường? Nếu nó cứ "đi đại" về phía người chơi thì sao?**

Thử cách ngây thơ "đi đại": mỗi bước, quái đi về hướng làm khoảng cách tới người chơi giảm nhiều nhất (greedy theo khoảng cách thẳng).

\`\`\`
. . . . . .          P = người chơi
. Q . . . .          Q = quái
. . ###### .         # = tường
. . # P  . .
. . . . . .
\`\`\`

Quái ở \`(0,1)\`, người chơi ở \`(3,3)\`. Đi đại: quái lao xuống-phải, tới sát tường \`(2,2)\` thì **kẹt** — mọi ô làm khoảng cách giảm đều là tường. Nó **đứng yên rung lắc** tại chỗ, không bao giờ nghĩ ra việc phải **đi vòng** (tạm thời đi xa đích hơn) để qua được.

❓ **Câu hỏi tự nhiên của người đọc.**

- *"Vậy đi đại sai ở đâu?"* — Nó chỉ nhìn **một bước trước mặt**, không có khái niệm "kế hoạch toàn cục". Tường tạo ra một **cực tiểu địa phương** (local minimum) mà greedy mắc kẹt.
- *"Tại sao không cứ thử mọi đường rồi chọn ngắn nhất?"* — Đúng ý tưởng! Nhưng "thử mọi đường" có thể bùng nổ. Cần một cách **duyệt có hệ thống**, không bỏ sót đường tốt mà cũng không thử thừa. Đó chính là BFS / Dijkstra / **A\\***.

Bài này xây dựng từ dưới lên: trước hết biến thế giới thành **lưới ô** (§2), rồi thành **đồ thị** (§3), rồi chạy thuật toán tìm đường trên đồ thị đó (§4–§6).

---

## 2. Tilemap — lưới ô

💡 **Hình dung.** Hãy nghĩ về một tờ giấy kẻ ô. Mỗi ô tô một màu: xanh = cỏ (đi được), đen = tường (chặn), xanh dương = nước (đi được nhưng chậm). **Tilemap** chính là tờ giấy kẻ ô đó: thế giới game được chia thành các **ô vuông (tile)** cùng kích thước, mỗi ô mang một **loại địa hình**.

Rất nhiều game dựng thế giới kiểu này: Pokémon, Stardew Valley, các game chiến thuật theo lượt, roguelike... Lý do: lưới ô **gọn để lưu** (chỉ là một mảng 2D số nguyên), **dễ dò va chạm**, và **dễ tìm đường** (đúng chủ đề bài này).

### 2.1 Cấu trúc dữ liệu

Một tilemap là một **mảng 2D**: \`grid[row][col]\` lưu loại tile. Ví dụ với 0 = cỏ, 1 = tường, 2 = nước:

\`\`\`go
grid := [][]int{
    {0, 0, 0, 0, 0},
    {0, 1, 1, 1, 0},
    {0, 0, 0, 1, 0},
    {0, 1, 0, 0, 0},
    {0, 1, 2, 2, 0},
}
const tileSize = 32 // mỗi ô 32×32 pixel
\`\`\`

Ô \`grid[1][1] = 1\` là tường, \`grid[4][2] = 2\` là nước.

### 2.2 Chuyển toạ độ: pixel ↔ ô

Đây là phép biến đổi **then chốt** — game vẽ và xử lý input ở **toạ độ pixel**, nhưng tilemap nghĩ theo **toạ độ ô**.

**Pixel → ô** (đang ở pixel \`(px, py)\`, ô nào?):
$$\\text{tileX} = \\left\\lfloor \\frac{px}{\\text{size}} \\right\\rfloor, \\qquad \\text{tileY} = \\left\\lfloor \\frac{py}{\\text{size}} \\right\\rfloor$$

$\\lfloor \\cdot \\rfloor$ là **làm tròn xuống (floor)**. Trong Go với số nguyên không âm, phép chia nguyên \`/\` đã là floor: \`px / size\`.

**Ô → pixel** (ô \`(tileX, tileY)\` nằm ở pixel nào?). Góc trên-trái của ô:
$$px = \\text{tileX} \\cdot \\text{size}, \\qquad py = \\text{tileY} \\cdot \\text{size}$$

Tâm ô (hay dùng để đặt nhân vật vào giữa ô):
$$px_{\\text{tâm}} = \\text{tileX} \\cdot \\text{size} + \\frac{\\text{size}}{2}$$

**≥4 ví dụ** (với $size = 32$):

| Pixel \`(px, py)\` | tileX = ⌊px/32⌋ | tileY = ⌊py/32⌋ | Ô |
|---|---|---|---|
| \`(0, 0)\` | ⌊0/32⌋ = 0 | ⌊0/32⌋ = 0 | \`(0, 0)\` |
| \`(50, 10)\` | ⌊50/32⌋ = 1 | ⌊10/32⌋ = 0 | \`(1, 0)\` |
| \`(31, 96)\` | ⌊31/32⌋ = 0 | ⌊96/32⌋ = 3 | \`(0, 3)\` |
| \`(200, 70)\` | ⌊200/32⌋ = 6 | ⌊70/32⌋ = 2 | \`(6, 2)\` |
| \`(64, 64)\` | ⌊64/32⌋ = 2 | ⌊64/32⌋ = 2 | \`(2, 2)\` |

Chiều ngược lại (ô → pixel góc trên-trái), $size = 32$:

| Ô \`(tileX, tileY)\` | px = tileX·32 | py = tileY·32 | Pixel góc |
|---|---|---|---|
| \`(0, 0)\` | 0 | 0 | \`(0, 0)\` |
| \`(1, 0)\` | 32 | 0 | \`(32, 0)\` |
| \`(0, 3)\` | 0 | 96 | \`(0, 96)\` |
| \`(2, 2)\` | 64 | 64 | \`(64, 64)\` |

⚠ **Lỗi thường gặp.** Nhầm thứ tự \`[row][col]\` với \`[col][row]\`. Quy ước phổ biến: \`tileX\` = **cột** (col, trục ngang), \`tileY\` = **hàng** (row, trục dọc). Khi tra mảng thì \`grid[tileY][tileX]\` (hàng trước, cột sau). Lẫn lộn hai cái này → bản đồ "bị xoay 90°" hoặc index out of range. Trong bài này, để tránh nhầm, viz hiển thị cả \`(x, y)\` rõ ràng.

🔁 **Dừng lại tự kiểm tra.** Nhân vật đang ở pixel \`(70, 130)\`, \`size = 32\`. Nó đang đứng trên ô nào, và ô đó là loại gì theo \`grid\` ở §2.1?

<details><summary>Đáp án</summary>

tileX = ⌊70/32⌋ = 2, tileY = ⌊130/32⌋ = 4 → ô \`(2, 4)\`. Tra \`grid[tileY][tileX] = grid[4][2] = 2\` → **nước**.
</details>

### 2.3 Va chạm với tile (liên hệ AABB — L06)

Mỗi tile tường thực chất là một **hộp chữ nhật AABB** có góc trên-trái $(tileX \\cdot size,\\ tileY \\cdot size)$ và kích thước $size \\times size$. Để biết nhân vật (cũng là một AABB) có đụng tường không, **không cần** kiểm tra với tất cả tile — chỉ cần kiểm tra **các ô mà hộp nhân vật phủ lên**:

\`\`\`go
// Hộp nhân vật: góc (x, y), kích thước (w, h)
minTileX := int(x) / size
maxTileX := int(x+w-1) / size
minTileY := int(y) / size
maxTileY := int(y+h-1) / size

for ty := minTileY; ty <= maxTileY; ty++ {
    for tx := minTileX; tx <= maxTileX; tx++ {
        if grid[ty][tx] == WALL {
            // chạm tường ô (tx, ty) → xử lý phản ứng (đẩy ra)
        }
    }
}
\`\`\`

Đây là **broad-phase miễn phí**: thay vì test với mọi tile (như [broadphase quadtree ở L08](../../02-Collision/lesson-03-broadphase-quadtree/) phải làm cho vật thể tự do), lưới ô cho ta biết ngay **chỉ vài ô lân cận** cần test — vì toạ độ ô tính trực tiếp bằng phép chia. Phép kiểm tra chồng nhau giữa hai AABB y hệt [L06 §2](../../02-Collision/lesson-01-aabb-circle/): \`aMinX < bMaxX && aMaxX > bMinX && ...\`.

📝 **Tóm tắt §2.**
- Tilemap = mảng 2D, mỗi ô một loại địa hình; gọn, dễ dò va chạm, dễ tìm đường.
- Pixel → ô: $tile = \\lfloor pixel / size \\rfloor$. Ô → pixel góc: $pixel = tile \\cdot size$.
- Cẩn thận thứ tự \`(x, y)\` vs \`[row][col]\` → tra \`grid[tileY][tileX]\`.
- Mỗi tile tường là một AABB; chỉ cần test các ô mà nhân vật phủ lên (broad-phase miễn phí).

---

## 3. Từ lưới sang đồ thị (graph)

💡 **Hình dung.** Tô đậm tâm mỗi ô **đi được** thành một chấm. Nối hai chấm bằng một sợi dây nếu hai ô **kề nhau** và đều đi được. Bạn vừa biến tilemap thành một **đồ thị**: chấm = **đỉnh (vertex/node)**, sợi dây = **cạnh (edge)**. Tìm đường trên bản đồ ⟺ tìm đường trên đồ thị này. Đây chính là [đồ thị bạn đã học ở DataStructures](../../../DataStructures/03-Advanced/lesson-01-graph/), chỉ là đỉnh và cạnh **sinh ngầm** từ lưới chứ không lưu rời.

### 3.1 Đỉnh và cạnh sinh ngầm

- **Đỉnh**: mỗi ô **đi được** (không phải tường) là một đỉnh. Ta định danh đỉnh bằng cặp \`(x, y)\`.
- **Cạnh**: nối ô \`(x, y)\` với ô kề **nếu ô kề cũng đi được**. Có 2 quy ước:
  - **4 hướng** (4-connectivity): lên, xuống, trái, phải. Các bước lệch: \`(±1, 0)\` và \`(0, ±1)\`.
  - **8 hướng** (8-connectivity): thêm 4 đường chéo \`(±1, ±1)\`.

Ta **không xây danh sách kề tường minh** (tốn bộ nhớ với bản đồ lớn). Thay vào đó, hàm "hàng xóm" sinh **tại chỗ**:

\`\`\`go
var dirs4 = [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}

func neighbors(x, y int, grid [][]int) [][2]int {
    var out [][2]int
    for _, d := range dirs4 {
        nx, ny := x+d[0], y+d[1]
        if nx < 0 || ny < 0 || ny >= len(grid) || nx >= len(grid[0]) {
            continue // ra ngoài bản đồ
        }
        if grid[ny][nx] == WALL {
            continue // tường: không có cạnh
        }
        out = append(out, [2]int{nx, ny})
    }
    return out
}
\`\`\`

**≥4 ví dụ** (lưới \`grid\` ở §2.1, 4 hướng, \`WALL = 1\`):

| Ô \`(x, y)\` | Bốn ô ứng viên | Loại bỏ vì | Hàng xóm hợp lệ |
|---|---|---|---|
| \`(0, 0)\` | \`(1,0),(−1,0),(0,1),(0,−1)\` | \`(−1,0)\` ngoài, \`(0,−1)\` ngoài | \`(1,0)\`, \`(0,1)\` |
| \`(0, 2)\` | \`(1,2),(−1,2),(0,3),(0,1)\` | \`(−1,2)\` ngoài | \`(1,2)\`, \`(0,3)\`, \`(0,1)\` |
| \`(2, 2)\` | \`(3,2),(1,2),(2,3),(2,1)\` | \`(3,2)\` tường (\`grid[2][3]=1\`), \`(2,1)\` tường (\`grid[1][2]=1\`) | \`(1,2)\`, \`(2,3)\` |
| \`(4, 0)\` | \`(5,0),(3,0),(4,1),(4,−1)\` | \`(5,0)\` ngoài, \`(4,−1)\` ngoài | \`(3,0)\`, \`(4,1)\` |
| \`(2, 3)\` | \`(3,3),(1,3),(2,4),(2,2)\` | \`(1,3)\` tường (\`grid[3][1]=1\`) | \`(3,3)\`, \`(2,4)\`, \`(2,2)\` |

⚠ **Lỗi thường gặp — đường chéo cắt góc tường.** Với 8 hướng, đi chéo từ \`(x,y)\` sang \`(x+1,y+1)\` khi **cả** \`(x+1,y)\` **và** \`(x,y+1)\` đều là tường thì nhân vật "lách qua khe góc" — phi vật lý, trông như xuyên tường. Quy tắc an toàn: **chỉ cho đi chéo nếu hai ô kề trực giao (orthogonal) không phải cả-hai-là-tường** (thường yêu cầu cả hai đều trống). Bỏ kiểm tra này là bug đồ hoạ kinh điển.

❓ **Câu hỏi tự nhiên.**

- *"Vì sao không lưu hẳn danh sách kề như graph thường?"* — Bản đồ 1000×1000 có một triệu đỉnh; lưu cạnh tường minh tốn bộ nhớ lớn và **thừa**, vì cạnh suy ra được từ vị trí + loại tile bằng vài phép cộng. Sinh ngầm vừa tiết kiệm vừa nhanh.
- *"4 hay 8 hướng?"* — 4 hướng cho chuyển động kiểu "lên/xuống/trái/phải" (Pokémon). 8 hướng cho chuyển động mượt hơn (RTS) nhưng phải xử lý cắt góc. Bước chéo dài $\\sqrt{2} \\approx 1.414$ chứ không phải 1 — quan trọng cho trọng số ở §4.

📝 **Tóm tắt §3.**
- Ô đi được = đỉnh; ô kề đi được = cạnh. 4 hướng hoặc 8 hướng.
- Sinh hàng xóm tại chỗ, không lưu danh sách kề tường minh.
- 8 hướng: cấm cắt góc tường; bước chéo có độ dài $\\sqrt{2}$.
- Đây là [đồ thị](../../../DataStructures/03-Advanced/lesson-01-graph/) với đỉnh/cạnh ngầm.

---

## 4. BFS và Dijkstra — ôn nhanh

Cả ba thuật toán (BFS, Dijkstra, A*) đều theo cùng một khung: giữ một **biên giới (frontier)** các ô đang chờ xử lý, mỗi vòng **lấy một ô ra**, **xem hàng xóm**, **nới lỏng (relax)** đường tới chúng. Khác nhau ở **cách chọn ô lấy ra**.

### 4.1 BFS — đường ngắn nhất khi mọi bước bằng nhau

💡 **Hình dung.** Thả một giọt mực vào ô start; mực loang ra **đều theo từng vòng**: vòng 1 = các ô cách 1 bước, vòng 2 = cách 2 bước... Ô đích bị mực chạm lần đầu ở **đúng** khoảng cách ngắn nhất (tính theo số bước).

BFS dùng **hàng đợi FIFO**. Vì lấy ra theo thứ tự vào, các ô được xử lý đúng theo lớp khoảng cách. **Chỉ đúng khi mọi cạnh có cùng trọng số** (mỗi bước "tốn" như nhau). Đây là [BFS bạn đã học](../../../DataStructures/03-Advanced/lesson-01-graph/) đặt trên lưới.

### 4.2 Dijkstra — khi các ô có chi phí khác nhau

Thực tế địa hình không đồng đều: đi qua **bùn/nước chậm hơn cỏ**. Gán mỗi ô một **chi phí bước vào**:

| Loại tile | Chi phí \`cost\` |
|---|---|
| Cỏ (0) | 1 |
| Nước/bùn (2) | 3 |
| Tường (1) | ∞ (không đi) |

Giờ "đường ngắn nhất" = đường **tổng chi phí nhỏ nhất**, không phải ít ô nhất. Đi vòng 5 ô cỏ (tổng 5) **tốt hơn** đi 3 ô qua bùn (1 + 3 + 3 = 7).

💡 **Dijkstra** = BFS nhưng thay hàng đợi FIFO bằng **hàng đợi ưu tiên (priority queue)**: luôn lấy ra ô có **tổng chi phí từ start nhỏ nhất** (gọi là \`g\`). Vì luôn "chốt" ô rẻ nhất trước, khi chốt một ô thì \`g\` của nó đã là tối ưu.

Phép **relax**: nếu đi từ ô \`u\` (đã biết \`g[u]\`) sang hàng xóm \`v\` cho ra \`g[u] + cost(v) < g[v]\`, thì cập nhật \`g[v]\` và ghi \`came_from[v] = u\` (để truy vết đường về sau).

**≥4 ví dụ relax** (giả sử \`g[u] = 5\`, hàng xóm \`v\`):

| \`cost(v)\` | \`g[u]+cost(v)\` | \`g[v]\` cũ | Relax? | \`g[v]\` mới |
|---|---|---|---|---|
| 1 (cỏ) | 6 | ∞ | có (6 < ∞) | 6 |
| 1 (cỏ) | 6 | 4 | không (6 ≥ 4) | 4 (giữ) |
| 3 (bùn) | 8 | 10 | có (8 < 10) | 8 |
| 3 (bùn) | 8 | 8 | không (8 ≥ 8) | 8 (giữ) |

⚠ **Lỗi thường gặp — quên closed set.** Sau khi một ô được **chốt** (lấy ra khỏi PQ với \`g\` tối ưu), phải đánh dấu nó "đã đóng" và **không xử lý lại**. Quên việc này → ô bị đẩy vào PQ nhiều lần và xử lý lặp, có thể chạy chậm hoặc (với cài đặt cẩu thả) **lặp vô hạn**. Pattern an toàn: khi pop ô đã nằm trong closed set thì bỏ qua.

📝 **Tóm tắt §4.**
- BFS: hàng đợi FIFO, đúng khi mọi bước bằng nhau, trả về đường ít ô nhất.
- Dijkstra: priority queue theo \`g\` nhỏ nhất, đúng cho trọng số dương; bùn đắt hơn cỏ.
- Relax cạnh: \`g[u] + cost(v) < g[v]\` thì cập nhật + ghi \`came_from\`.
- Luôn dùng **closed set** để không xử lý lại ô đã chốt.

---

## 5. A\\* — Dijkstra có định hướng

💡 **Hình dung.** Dijkstra loang **đều mọi phía** như giọt mực — kể cả phía **ngược** với đích, rất phí. Tưởng tượng bạn bịt mắt mò đường: Dijkstra mò đều mọi hướng. **A\\*** giống như bạn **được nghe tiếng đích kêu** từ một hướng — bạn vẫn cẩn thận, nhưng **ưu tiên mò về phía có tiếng**. Kết quả: tới đích nhanh hơn nhiều mà vẫn tối ưu.

### 5.1 Công thức f = g + h

A* gán mỗi ô một giá trị \`f\`:
$$f(n) = g(n) + h(n)$$

- $g(n)$ = chi phí **thật** từ start tới \`n\` (giống Dijkstra).
- $h(n)$ = **heuristic**: chi phí **ước lượng** từ \`n\` tới goal (đoán, chưa đi).
- $f(n)$ = ước lượng tổng chi phí của đường tốt nhất **đi qua** \`n\`.

A* = Dijkstra nhưng priority queue lấy ra ô có **\`f\` nhỏ nhất** (Dijkstra lấy ô \`g\` nhỏ nhất). Heuristic \`h\` "kéo" tìm kiếm về phía đích.

**Heuristic phổ biến trên lưới** (goal \`(gx, gy)\`):
- **Manhattan** (cho 4 hướng): $h = |x - gx| + |y - gy|$. Số bước trục tối thiểu nếu không có tường.
- **Euclid** (cho 8 hướng / chuyển động tự do): $h = \\sqrt{(x-gx)^2 + (y-gy)^2}$. Khoảng cách đường chim bay.
- **Zero**: $h = 0$ → A* **thoái hoá thành Dijkstra** (không có định hướng).

**≥4 ví dụ heuristic** (goal \`(4, 4)\`):

| Ô \`(x, y)\` | Manhattan $|x-4|+|y-4|$ | Euclid $\\sqrt{(x-4)^2+(y-4)^2}$ |
|---|---|---|
| \`(0, 0)\` | 4 + 4 = 8 | $\\sqrt{16+16} = \\sqrt{32} \\approx 5.66$ |
| \`(4, 0)\` | 0 + 4 = 4 | $\\sqrt{0+16} = 4$ |
| \`(2, 3)\` | 2 + 1 = 3 | $\\sqrt{4+1} = \\sqrt{5} \\approx 2.24$ |
| \`(3, 4)\` | 1 + 0 = 1 | $\\sqrt{1+0} = 1$ |
| \`(4, 4)\` | 0 (đã tới đích) | 0 |

### 5.2 Walk-through A\\* ĐẦY ĐỦ trên lưới 5×5 có tường

Đây là phần cốt lõi. Ta chạy A* **từng bước, tính g/h/f cho từng ô bằng số thật**, không dùng chữ "tương tự".

**Cấu hình.** Lưới 5×5, \`(x, y)\` với x = cột (0..4 trái→phải), y = hàng (0..4 trên→dưới). \`S\` = start \`(0, 0)\`, \`G\` = goal \`(4, 4)\`. \`#\` = tường. **4 hướng**, mọi bước cỏ chi phí 1. Heuristic **Manhattan**.

\`\`\`
     x=0  x=1  x=2  x=3  x=4
y=0   S    .    .    .    .
y=1   .    #    #    #    .
y=2   .    .    .    #    .
y=3   #    #    .    #    .
y=4   .    .    .    .    G
\`\`\`

Tường tại: \`(1,1),(2,1),(3,1),(3,2),(0,3),(1,3),(3,3)\`.

**Heuristic Manhattan tới goal \`(4,4)\`** cho vài ô ta sẽ gặp (tính sẵn):

| Ô | h | | Ô | h |
|---|---|---|---|---|
| \`(0,0)\` | 8 | | \`(2,2)\` | 4 |
| \`(1,0)\` | 7 | | \`(2,3)\` | 3 |
| \`(0,1)\` | 7 | | \`(2,4)\` | 2 |
| \`(0,2)\` | 6 | | \`(3,4)\` | 1 |
| \`(1,2)\` | 5 | | \`(4,3)\` | 1 |
| \`(4,0)\` | 4 | | \`(4,4)\` | 0 |
| \`(4,1)\` | 3 | | \`(4,2)\` | 2 |

**Khởi tạo.** \`g[S] = 0\`, \`h[S] = 8\`, \`f[S] = 8\`. Open = \`{ (0,0): f=8 }\`. Closed = \`{}\`.

Ta sẽ ghi từng vòng: pop ô \`f\` nhỏ nhất, đóng nó, relax hàng xóm. Khi đồng hạng \`f\`, **tie-break** chọn \`h\` nhỏ hơn (gần đích hơn) — xem §6.2.

**Vòng 1 — pop \`(0,0)\` (f=8).** Đóng \`(0,0)\`. Hàng xóm hợp lệ: \`(1,0)\` và \`(0,1)\` (xuống \`(0,1)\` được; \`(−1,0)\`,\`(0,−1)\` ngoài).
- \`(1,0)\`: g = 0+1 = 1, h = 7, **f = 8**.
- \`(0,1)\`: g = 0+1 = 1, h = 7, **f = 8**.

Open = \`{ (1,0):8, (0,1):8 }\`.

**Vòng 2 — pop f=8, hai ô đồng hạng (h cùng = 7).** Tie-break tiếp (vd chọn ô vào sau / theo thứ tự duyệt) → giả sử pop \`(1,0)\`. Đóng \`(1,0)\`. Hàng xóm: \`(2,0)\`; \`(1,1)\` là **tường** (bỏ); \`(0,0)\` đã đóng (bỏ).
- \`(2,0)\`: g = 1+1 = 2, h = 6, **f = 8**.

Open = \`{ (0,1):8, (2,0):8 }\`.

**Vòng 3 — pop f=8.** \`(0,1)\` và \`(2,0)\` cùng f=8; h của \`(0,1)\`=7, \`(2,0)\`=6 → tie-break chọn h nhỏ → pop \`(2,0)\`. Đóng \`(2,0)\`. Hàng xóm: \`(3,0)\`; \`(2,1)\` tường (bỏ); \`(1,0)\` đóng.
- \`(3,0)\`: g = 2+1 = 3, h = 5, **f = 8**.

Open = \`{ (0,1):8, (3,0):8 }\`.

**Vòng 4 — pop f=8.** h: \`(0,1)\`=7, \`(3,0)\`=5 → pop \`(3,0)\`. Đóng. Hàng xóm: \`(4,0)\`; \`(3,1)\` tường; \`(2,0)\` đóng.
- \`(4,0)\`: g = 3+1 = 4, h = 4, **f = 8**.

Open = \`{ (0,1):8, (4,0):8 }\`.

**Vòng 5 — pop f=8.** h: \`(0,1)\`=7, \`(4,0)\`=4 → pop \`(4,0)\`. Đóng. Hàng xóm: \`(4,1)\`; \`(3,0)\` đóng.
- \`(4,1)\`: g = 4+1 = 5, h = 3, **f = 8**.

Open = \`{ (0,1):8, (4,1):8 }\`.

> 👀 **Nhận xét giữa chừng.** A* vừa đi một mạch \`(0,0)→(1,0)→(2,0)→(3,0)→(4,0)→(4,1)\` **men theo mép trên rồi xuống mép phải** — đúng phía có goal — mà **chưa hề** mở rộng \`(0,1)\` (đang nằm chờ với f=8 nhưng h=7 lớn). Đây là sức mạnh của heuristic: nó **trì hoãn** các nhánh đi xa đích.

**Vòng 6 — pop f=8.** h: \`(0,1)\`=7, \`(4,1)\`=3 → pop \`(4,1)\`. Đóng. Hàng xóm: \`(4,2)\`; \`(3,1)\` tường; \`(4,0)\` đóng.
- \`(4,2)\`: g = 5+1 = 6, h = 2, **f = 8**.

Open = \`{ (0,1):8, (4,2):8 }\`.

**Vòng 7 — pop f=8.** h: \`(0,1)\`=7, \`(4,2)\`=2 → pop \`(4,2)\`. Đóng. Hàng xóm: \`(4,3)\`; \`(3,2)\` tường; \`(4,1)\` đóng.
- \`(4,3)\`: g = 6+1 = 7, h = 1, **f = 8**.

Open = \`{ (0,1):8, (4,3):8 }\`.

**Vòng 8 — pop f=8.** h: \`(0,1)\`=7, \`(4,3)\`=1 → pop \`(4,3)\`. Đóng. Hàng xóm: \`(4,4)\` = **GOAL**!; \`(3,3)\` tường; \`(4,2)\` đóng.
- \`(4,4)\`: g = 7+1 = 8, h = 0, **f = 8**.

Open = \`{ (0,1):8, (4,4):8 }\`.

**Vòng 9 — pop f=8.** h: \`(0,1)\`=7, \`(4,4)\`=0 → pop \`(4,4)\`. **Đây là goal → dừng.**

**Truy vết đường** (theo \`came_from\`):
\`\`\`
(4,4) ← (4,3) ← (4,2) ← (4,1) ← (4,0) ← (3,0) ← (2,0) ← (1,0) ← (0,0)
\`\`\`
Đảo lại: **\`(0,0)→(1,0)→(2,0)→(3,0)→(4,0)→(4,1)→(4,2)→(4,3)→(4,4)\`**. Độ dài đường = 8 bước, \`g[goal] = 8\`. ✓ (Đúng bằng \`h(start) = 8\` — vì đường này hoàn toàn "thẳng theo Manhattan", không phải vòng thêm.)

**Số ô A* đã đóng**: 8 ô (\`(0,0),(1,0),(2,0),(3,0),(4,0),(4,1),(4,2),(4,3)\`) + goal. Nó **không hề** mở \`(0,1)\` và toàn bộ nửa dưới-trái bản đồ. So sánh: **Dijkstra** (h=0) sẽ loang đều và đóng **nhiều ô hơn hẳn** trước khi chạm goal (xem module "So thuật toán" trong viz để đếm cụ thể).

🔁 **Dừng lại tự kiểm tra.** Tại vòng 5, vì sao A* chọn pop \`(4,0)\` (f=8, h=4) chứ không phải \`(0,1)\` (f=8, h=7), dù cả hai cùng f?

<details><summary>Đáp án</summary>

Cùng \`f = 8\` nên **tie-break theo \`h\` nhỏ hơn**: \`(4,0)\` có h=4 < \`(0,1)\` có h=7. Ô có h nhỏ hơn được coi là "gần đích hơn theo ước lượng", ưu tiên mở trước → A* lao thẳng về phía goal thay vì lãng phí mở nhánh đi xa. Nếu không tie-break, A* vẫn đúng nhưng có thể mở thừa vài ô.
</details>

📝 **Tóm tắt §5.**
- A* = Dijkstra với priority theo $f = g + h$; \`g\` chi phí thật, \`h\` ước lượng tới goal.
- Manhattan cho 4 hướng, Euclid cho tự do, \`h=0\` ⇒ Dijkstra.
- Heuristic kéo tìm kiếm về phía đích → đóng **ít ô** hơn Dijkstra rất nhiều.
- Truy vết \`came_from\` để dựng lại đường; tie-break theo \`h\` nhỏ.

---

## 6. Tính tối ưu, tie-breaking, làm mượt đường

### 6.1 Heuristic admissible ⇒ đường tối ưu

**Định nghĩa.** Heuristic \`h\` là **admissible (chấp nhận được)** nếu nó **không bao giờ overestimate** chi phí thật tới goal: với mọi ô \`n\`, $h(n) \\le h^*(n)$, trong đó $h^*(n)$ là chi phí thật ngắn nhất từ \`n\` tới goal.

**Định lý.** Nếu \`h\` admissible thì A* **luôn trả về đường tối ưu** (ngắn nhất theo chi phí).

**Trực giác chứng minh.** A* dừng khi pop goal. Giả sử nó pop goal với \`f = g[goal]\` (vì \`h(goal)=0\`). Nếu có đường ngắn hơn đi qua một ô \`n\` còn trong open, thì ô đó có $f(n) = g(n) + h(n) \\le g(n) + h^*(n) = $ (chi phí thật của đường tối ưu qua \`n\`) $<$ \`g[goal]\`. Vì \`f(n) <\` \`f(goal)\`, A* lẽ ra đã pop \`n\` **trước** goal — mâu thuẫn. Vậy không tồn tại đường ngắn hơn. (Dấu $\\le$ ở giữa là **chỗ admissible phát huy** — nếu \`h\` overestimate, bất đẳng thức này gãy.)

⚠ **Lỗi thường gặp — heuristic overestimate → đường KHÔNG tối ưu.** Nếu nhân lên cho "chạy nhanh hơn", vd dùng $h = 3 \\cdot \\text{Manhattan}$, thì với ô cạnh đích nhưng phải đi vòng, \`h\` báo "còn xa lắm" → A* **bỏ qua** đường vòng tối ưu, chộp lấy đường thẳng có vẻ ngắn theo \`f\` nhưng thực ra **bị tường chặn dài hơn**. Kết quả: đường tìm được **không phải ngắn nhất**. (Đây gọi là **weighted A***: chấp nhận đường hơi dài để chạy nhanh hơn — hữu ích nhưng phải biết mình đang đánh đổi.) Quy tắc: Manhattan cho 4 hướng và Euclid cho tự do **đều admissible** vì chúng là chặn dưới của chi phí thật (không có tường nào làm đường ngắn đi).

**≥4 ví dụ kiểm tra admissible** (lưới cỏ, bước = 1):

| Heuristic | Tại ô cách goal 3 bước thật | Admissible? |
|---|---|---|
| Manhattan = 3 | $3 \\le 3$ ✓ | có (bằng đúng khi không tường) |
| Euclid ≈ 2.24 (lệch 2 phải, 1 xuống) | $2.24 \\le 3$ ✓ | có (≤ Manhattan trên lưới 4-hướng) |
| $h = 0$ | $0 \\le 3$ ✓ | có (Dijkstra) |
| $h = 5$ (overestimate) | $5 \\le 3$? **✗** | **không** → có thể trả đường sai |

### 6.2 Tie-breaking

Khi nhiều ô đồng \`f\`, chọn ô nào ảnh hưởng số ô phải mở (không ảnh hưởng tính tối ưu nếu \`h\` admissible). Quy ước tốt: **ưu tiên \`h\` nhỏ hơn** (gần đích) — đúng như walk-through §5.2 đã làm. Một mẹo phổ biến: cộng một lượng tí xíu vào \`h\` (tie-breaking nhân tử ~1.001) để A* "thẳng hàng" hơn và mở ít ô, miễn không phá admissible đáng kể.

### 6.3 Làm mượt đường (string-pulling) — sơ lược

Đường A* trên lưới hay bị **răng cưa** (bậc thang) vì chỉ đi theo cạnh ô. **String-pulling** ("kéo dây") làm mượt: tưởng tượng đường là sợi dây quấn qua các ô, **kéo căng hai đầu** — dây sẽ cắt thẳng qua các đoạn không bị tường chắn. Thuật toán phổ biến: với mỗi ô, nếu có **đường nhìn thẳng (line-of-sight)** từ ô trước-trước tới ô sau (không xuyên tường), bỏ ô giữa. Kết quả là đường ít khúc gãy, trông tự nhiên hơn. (Biến thể tích hợp sẵn: **Theta\\***.)

📝 **Tóm tắt §6.**
- Admissible (\`h\` không overestimate) ⇒ A* trả đường tối ưu. Manhattan/Euclid đều admissible.
- Overestimate ⇒ chạy nhanh hơn nhưng **mất tối ưu** (weighted A*).
- Tie-break theo \`h\` nhỏ → mở ít ô hơn.
- String-pulling làm đường bớt răng cưa, trông tự nhiên.

---

## 7. Tổng kết lĩnh vực GameDev

Bạn vừa hoàn thành **15 bài** xây một động cơ game/mô phỏng vật lý từ con số 0. Nhìn lại toàn bộ **pipeline**:

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│  GAME LOOP (L01)  — nhịp tim: input → update(dt) → render        │
│      cố định dt, tách render khỏi physics (fixed timestep)        │
├─────────────────────────────────────────────────────────────────┤
│  VẬT LÝ (L02–L05)                                                 │
│   • vector & kinematics (vị trí, vận tốc, gia tốc)                │
│   • tích phân: Euler vs Verlet (vì sao Verlet ổn định hơn)        │
│   • lực: trọng lực, cản (drag), ma sát → a = F/m                  │
│   • lò xo & dao động: F = −k·x, hệ điều hoà                       │
├─────────────────────────────────────────────────────────────────┤
│  VA CHẠM (L06–L10)                                                │
│   • DETECT: AABB & circle (L06) → SAT polygon (L07)               │
│   • BROAD-PHASE: quadtree (L08) — lọc cặp không thể chạm          │
│   • RESPONSE: impulse (L09) — đẩy ra, bảo toàn động lượng         │
│   • ma sát/nghỉ/xếp chồng (L10) — vật đứng yên ổn định            │
├─────────────────────────────────────────────────────────────────┤
│  SYSTEMS (L11–L14)                                                │
│   • hạt (particles), ràng buộc (constraints)                      │
│   • flocking / steering (L13) — hành vi bầy đàn                   │
│   • ECS & Architecture (L14) — tổ chức entity/component/system    │
├─────────────────────────────────────────────────────────────────┤
│  AI TÌM ĐƯỜNG (L15 — bài này)                                     │
│   • tilemap → graph → BFS / Dijkstra / A*                         │
│   • thường chạy như một system trong ECS, mỗi NPC một đường       │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

Mỗi tầng **dựng trên tầng dưới**: tìm đường (L15) trả về một chuỗi waypoint; NPC đi theo waypoint bằng **steering** (L13); chuyển động được **tích phân** (L03) qua mỗi tick của **game loop** (L01); khi NPC đụng tường, **va chạm** (L06) đẩy ra; tất cả tổ chức gọn trong **ECS** (L14). Bạn đã có đủ mảnh để ghép một game nhỏ chạy thật.

### Hướng học tiếp

Bạn đã hiểu **bên trong** engine hoạt động ra sao. Bước tiếp theo là dùng engine thật để làm nhanh, và đào sâu lý thuyết:

- **Engine thật**:
  - **Godot** — mã nguồn mở, nhẹ, có sẵn tilemap + A* (\`AStarGrid2D\`) và physics 2D — khớp gần như 1-1 với những gì bạn vừa học.
  - **Unity** — phổ biến công nghiệp; có NavMesh cho tìm đường 3D, hệ ECS (DOTS).
  - **Box2D** — thư viện vật lý 2D chuẩn công nghiệp; đọc nó để thấy impulse/constraint (L09–L12) ở quy mô production.
- **Sách**:
  - *Game Programming Patterns* (Robert Nystrom, đọc free online) — Game Loop, Component, Update Method... chính là các pattern bạn đã gặp ở L01, L14.
  - *Real-Time Collision Detection* (Christer Ericson) — kinh thánh của phần va chạm (L06–L10).
- **Trong repo này, đi tiếp sang**:
  - [Algorithms](../../../Algorithms/) — A* là một thuật toán đồ thị; xem [tier-5 graph](../../../Algorithms/tier-5-graph/index.html) cho BFS/Dijkstra/A* tổng quát và các thuật toán đồ thị khác (MST, max-flow, topological sort).
  - [Programming](../../../Programming/) — củng cố nền tảng để hiện thực hoá những engine này thành code production-grade.

---

## 8. Bài tập

**Bài 1 (toạ độ tile).** \`size = 40\`. Tính ô cho các pixel: \`(0,0)\`, \`(85, 40)\`, \`(159, 200)\`, \`(40, 39)\`. Rồi tính pixel **góc trên-trái** và **tâm** của ô \`(3, 2)\`.

**Bài 2 (va chạm tile).** Nhân vật là AABB góc \`(70, 50)\`, kích thước $24 \\times 24$, \`size = 32\`. Liệt kê **các ô** mà hộp nhân vật phủ lên (dùng công thức min/max tile ở §2.3).

**Bài 3 (đồ thị 8 hướng + cắt góc).** Với lưới \`grid\` ở §2.1, dùng **8 hướng**. Ô \`(2,2)\` có những hàng xóm chéo nào hợp lệ nếu **áp quy tắc cấm cắt góc** (không cho đi chéo khi một trong hai ô trực giao kề là tường)?

**Bài 4 (Dijkstra relax).** Cỏ cost 1, bùn cost 3. Đường A đi 6 ô cỏ; đường B đi 2 ô cỏ + 2 ô bùn rồi 1 ô cỏ tới đích. Tính tổng chi phí mỗi đường, đường nào Dijkstra chọn?

**Bài 5 (heuristic).** Goal \`(6, 2)\`. Tính Manhattan và Euclid (làm tròn 2 chữ số) cho \`(0,0)\`, \`(6,5)\`, \`(3,2)\`, \`(6,2)\`. Heuristic nào nhỏ hơn hay bằng cái nào, và vì sao điều đó liên quan tới admissible?

**Bài 6 (admissible).** Cho lưới cỏ (bước 1, 4 hướng). Trong các heuristic sau, cái nào admissible: (a) $h = 0$; (b) $h = $ Manhattan; (c) $h = 2 \\cdot$ Manhattan; (d) $h = $ Euclid? Giải thích cái nào phá tính tối ưu và vì sao.

**Bài 7 (TỰ CHẠY A\\*).** Chạy A* bằng tay trên lưới 4×4 sau, S=\`(0,0)\`, G=\`(3,3)\`, 4 hướng, cỏ cost 1, Manhattan. Ghi \`g/h/f\` cho mỗi ô được mở, theo từng vòng pop, tới khi tới goal. In đường cuối và \`g[goal]\`.
\`\`\`
     x=0  x=1  x=2  x=3
y=0   S    .    #    .
y=1   .    #    .    .
y=2   .    #    .    #
y=3   .    .    .    G
\`\`\`
Tường tại \`(2,0),(1,1),(1,2),(3,2)\`.

**Bài 8 (so thuật toán).** Trên cùng lưới Bài 7, ước lượng **định tính**: Dijkstra (h=0) sẽ đóng nhiều ô hơn hay ít hơn A* (Manhattan)? Vì sao? (Không cần chạy hết, lập luận theo §5.)

**Bài 9 (overestimate gây sai).** Cho một ví dụ lưới nhỏ (mô tả bằng lời) trong đó dùng $h = 5 \\cdot$ Manhattan khiến A* trả về đường **dài hơn** đường tối ưu. Chỉ rõ tại sao đường tối ưu bị bỏ qua.

**Bài 10 (string-pulling).** Đường A* trả về: \`(0,0)→(1,0)→(2,0)→(2,1)→(2,2)\`, không có tường giữa \`(0,0)\` và \`(2,0)\` (cùng hàng), cũng không giữa \`(2,0)\` và \`(2,2)\` (cùng cột). Sau string-pulling (bỏ ô giữa nếu hai đầu nhìn thẳng), đường rút gọn còn những waypoint nào?

---

## Lời giải chi tiết

### Bài 1

\`size = 40\`. tile = ⌊pixel/40⌋:
- \`(0,0)\`: ⌊0/40⌋, ⌊0/40⌋ = \`(0, 0)\`.
- \`(85, 40)\`: ⌊85/40⌋ = 2, ⌊40/40⌋ = 1 → \`(2, 1)\`.
- \`(159, 200)\`: ⌊159/40⌋ = 3, ⌊200/40⌋ = 5 → \`(3, 5)\`.
- \`(40, 39)\`: ⌊40/40⌋ = 1, ⌊39/40⌋ = 0 → \`(1, 0)\`. (Ranh giới: pixel 40 đã sang ô 1; pixel 39 còn ở ô 0.)

Ô \`(3, 2)\`: góc trên-trái = $(3 \\cdot 40,\\ 2 \\cdot 40)$ = \`(120, 80)\`; tâm = $(120 + 20,\\ 80 + 20)$ = \`(140, 100)\`.

### Bài 2

Hộp góc \`(70, 50)\`, \`w=h=24\`, \`size=32\`.
- minTileX = ⌊70/32⌋ = 2; maxTileX = ⌊(70+24−1)/32⌋ = ⌊93/32⌋ = 2.
- minTileY = ⌊50/32⌋ = 1; maxTileY = ⌊(50+24−1)/32⌋ = ⌊73/32⌋ = 2.

Các ô phủ: tx ∈ {2}, ty ∈ {1, 2} → **\`(2,1)\` và \`(2,2)\`**. Hộp 24px nằm gọn trong một cột tile (cột 2) nhưng vắt qua hai hàng (1 và 2). Cần test va chạm với 2 ô đó.

### Bài 3

Ô \`(2,2)\`, 8 hướng. Bốn ô trực giao: \`(3,2)\` = tường (\`grid[2][3]=1\`), \`(1,2)\` = cỏ, \`(2,1)\` = tường (\`grid[1][2]=1\`), \`(2,3)\` = cỏ.

Bốn ô chéo và điều kiện không-cắt-góc (cần cả hai ô trực giao kề **không phải tường**):
- \`(3,1)\` (chéo trên-phải): cần \`(3,2)\` và \`(2,1)\` trống — cả hai đều **tường** → **cấm**.
- \`(1,1)\` (chéo trên-trái): cần \`(1,2)\` (cỏ ✓) và \`(2,1)\` (tường ✗) → **cấm**. Mà \`(1,1)\` cũng là tường nên loại luôn.
- \`(3,3)\` (chéo dưới-phải): cần \`(3,2)\` (tường ✗) → **cấm**.
- \`(1,3)\` (chéo dưới-trái): cần \`(1,2)\` (cỏ ✓) và \`(2,3)\` (cỏ ✓) → **cho phép**, nhưng \`(1,3)\` là tường (\`grid[3][1]=1\`) → loại.

Kết quả: **không có** hàng xóm chéo hợp lệ; chỉ còn 2 hàng xóm trực giao \`(1,2)\` và \`(2,3)\`. Đây chính là minh hoạ vì sao luật cấm cắt góc quan trọng — quanh ô \`(2,2)\` bị tường bao, không có khe chéo nào để lách.

### Bài 4

- Đường A: 6 ô cỏ → 6·1 = **6**.
- Đường B: 2 cỏ + 2 bùn + 1 cỏ = 2·1 + 2·3 + 1·1 = 2 + 6 + 1 = **9**.

Dijkstra chọn đường tổng chi phí nhỏ nhất → **đường A (6)**, dù nó đi qua nhiều ô hơn. Bài học: "ngắn nhất" theo **chi phí**, không phải số ô. Bùn đắt khiến đường vòng qua cỏ rẻ hơn.

### Bài 5

Goal \`(6, 2)\`. Manhattan = $|x-6|+|y-2|$; Euclid = $\\sqrt{(x-6)^2+(y-2)^2}$:

| Ô | Manhattan | Euclid |
|---|---|---|
| \`(0,0)\` | 6+2 = 8 | $\\sqrt{36+4}=\\sqrt{40}\\approx 6.32$ |
| \`(6,5)\` | 0+3 = 3 | $\\sqrt{0+9}=3$ |
| \`(3,2)\` | 3+0 = 3 | $\\sqrt{9+0}=3$ |
| \`(6,2)\` | 0 | 0 |

Euclid **≤** Manhattan ở mọi ô (bằng nhau khi lệch chỉ theo một trục, như \`(6,5)\` và \`(3,2)\`). Liên hệ admissible: trên lưới 4 hướng, chi phí thật ≥ Manhattan ≥ Euclid khi không tường → **cả hai đều là chặn dưới** của chi phí thật ⇒ đều admissible. Euclid nhỏ hơn nên "yếu" hơn (gần Dijkstra hơn) khi dùng cho lưới 4 hướng → Manhattan thường tốt hơn cho 4 hướng vì sát chi phí thật hơn.

### Bài 6

- (a) $h=0$: admissible (0 ≤ mọi chi phí). Đây là Dijkstra — tối ưu nhưng chậm.
- (b) Manhattan: admissible. Trên lưới 4 hướng không tường, số bước thật = Manhattan; có tường thì thật ≥ Manhattan. Luôn ≤ chi phí thật → tối ưu.
- (c) $2\\cdot$Manhattan: **không** admissible. Tại ô cách goal 3 bước thật, $h = 2\\cdot3 = 6 > 3$ → overestimate. **Phá tối ưu**: A* có thể bỏ đường vòng tối ưu vì \`h\` thổi phồng chi phí của nó. (Đây là weighted A* hệ số 2.)
- (d) Euclid: admissible (≤ Manhattan ≤ chi phí thật trên 4 hướng).

Vậy (a), (b), (d) tối ưu; **(c) phá tối ưu** vì overestimate.

### Bài 7 (tự chạy A*)

Lưới 4×4, S=\`(0,0)\`, G=\`(3,3)\`, tường \`(2,0),(1,1),(1,2),(3,2)\`, Manhattan tới \`(3,3)\`.

h của các ô: \`(0,0)\`=6, \`(0,1)\`=5, \`(0,2)\`=4, \`(0,3)\`=3, \`(1,0)\`=5, \`(1,3)\`=2, \`(2,1)\`=3, \`(2,2)\`=2, \`(2,3)\`=1, \`(3,0)\`=3, \`(3,1)\`=2, \`(3,3)\`=0.

Khởi tạo: g[S]=0, f=6. Open=\`{(0,0):6}\`.

- **V1 pop \`(0,0)\` (f=6).** Hàng xóm: \`(1,0)\`: g=1,h=5,f=6; \`(0,1)\`: g=1,h=5,f=6. (\`(2,0)\` không kề; \`(−1,0)/(0,−1)\` ngoài.) Open=\`{(1,0):6,(0,1):6}\`.
- **V2 pop f=6** — \`(1,0)\` và \`(0,1)\` cùng f=6, h cùng 5; tie-break → pop \`(1,0)\`. Hàng xóm: \`(2,0)\` tường; \`(1,1)\` tường; \`(0,0)\` đóng. **Không relax ai.** Open=\`{(0,1):6}\`.
- **V3 pop \`(0,1)\` (f=6).** Hàng xóm: \`(0,2)\`: g=2,h=4,f=6; \`(1,1)\` tường; \`(0,0)\` đóng. Open=\`{(0,2):6}\`.
- **V4 pop \`(0,2)\` (f=6).** Hàng xóm: \`(0,3)\`: g=3,h=3,f=6; \`(1,2)\` tường; \`(0,1)\` đóng. Open=\`{(0,3):6}\`.
- **V5 pop \`(0,3)\` (f=6).** Hàng xóm: \`(1,3)\`: g=4,h=2,f=6; \`(0,2)\` đóng. Open=\`{(1,3):6}\`.
- **V6 pop \`(1,3)\` (f=6).** Hàng xóm: \`(2,3)\`: g=5,h=1,f=6; \`(1,2)\` tường; \`(0,3)\` đóng. Open=\`{(2,3):6}\`.
- **V7 pop \`(2,3)\` (f=6).** Hàng xóm: \`(3,3)\`=GOAL: g=6,h=0,f=6; \`(2,2)\`: g=6,h=2,f=8; \`(1,3)\` đóng. Open=\`{(3,3):6,(2,2):8}\`.
- **V8 pop \`(3,3)\` (f=6 < 8).** Là goal → **dừng**.

Truy vết: \`(3,3)←(2,3)←(1,3)←(0,3)←(0,2)←(0,1)←(0,0)\`.
Đường: **\`(0,0)→(0,1)→(0,2)→(0,3)→(1,3)→(2,3)→(3,3)\`**, \`g[goal] = 6\`, dài 6 bước. (Bản đồ ép đi men mép trái rồi sang mép dưới vì khối tường giữa chặn lối tắt.)

### Bài 8

A* (Manhattan) đóng **ít** ô hơn Dijkstra (h=0). Trong Bài 7, A* đóng 7 ô (\`(0,0),(1,0),(0,1),(0,2),(0,3),(1,3),(2,3)\`) rồi chạm goal, **không** mở \`(2,2)\`/\`(3,1)\`/\`(2,1)\`/\`(3,0)\`... ở nửa phải. Dijkstra không có \`h\` định hướng nên loang đều mọi phía, mở thêm các ô nửa phải trước khi \`g\` của chúng đủ lớn để bị goal "vượt" — đóng nhiều ô hơn. Lý do gốc: \`h\` nâng \`f\` của các ô đi xa đích, đẩy chúng xuống cuối priority queue.

### Bài 9

Lưới 1 hàng × 7 cột, S=\`(0,0)\`, G=\`(6,0)\`, nhưng ô \`(3,0)\` là tường. Đường tối ưu phải **vòng**: giả sử có hàng y=1 trống để lách, đường tối ưu dài (vd 8 bước). Một ô \`(2,0)\` ngay trước tường có Manhattan tới goal = 4, nhưng chi phí thật = 8 (phải vòng). Dùng $h = 5\\cdot$Manhattan = 20 tại \`(2,0)\` → \`f\` của nó bị thổi lên rất cao, A* **trì hoãn** mở nó và các ô trên đường vòng tối ưu, thay vào đó chộp một đường khác có \`f\` nhỏ giả tạo (vd vòng phía khác dài hơn nhưng Manhattan đánh lừa nhỏ hơn). Kết quả: trả về đường **dài hơn** đường vòng tối ưu. Gốc rễ: overestimate làm bất đẳng thức $h \\le h^*$ ở chứng minh §6.1 gãy → mất bảo đảm tối ưu.

### Bài 10

Đường: \`(0,0)→(1,0)→(2,0)→(2,1)→(2,2)\`.
- Từ \`(0,0)\`: nhìn thẳng tới \`(2,0)\`? Cùng hàng y=0, không tường giữa → **có**. Vậy bỏ \`(1,0)\`.
- Từ \`(0,0)\` nhìn thẳng tới \`(2,1)\`? Đường chéo cắt qua ô — giả sử bị chắn/đổi hướng tại \`(2,0)\` → giữ \`(2,0)\` làm điểm rẽ.
- Từ \`(2,0)\`: nhìn thẳng tới \`(2,2)\`? Cùng cột x=2, không tường giữa → **có**. Bỏ \`(2,1)\`.

Đường rút gọn: **\`(0,0) → (2,0) → (2,2)\`** — 3 waypoint thay vì 5, bớt được 2 khúc gãy. NPC đi theo 3 điểm này trông thẳng và tự nhiên hơn hẳn đường răng cưa gốc.

---

## Kết thúc lĩnh vực GameDev

Đây là **bài cuối** của lĩnh vực GameDev — **không có bài kế tiếp** trong lĩnh vực. Bạn đã đi trọn vòng: game loop → vật lý → va chạm → systems → AI tìm đường, và hiểu **bên trong** một engine vận hành thế nào.

Hướng đi tiếp (đã nêu chi tiết ở §7):
- **Engine thật**: Godot (\`AStarGrid2D\`, physics 2D), Unity (NavMesh, DOTS), Box2D.
- **Sách**: *Game Programming Patterns*, *Real-Time Collision Detection*.
- **Trong repo**: sang [Algorithms](../../../Algorithms/) (đặc biệt [tier-5 graph](../../../Algorithms/tier-5-graph/index.html) để tổng quát hoá A* và học thêm thuật toán đồ thị) và [Programming](../../../Programming/) để củng cố nền code production.

- Minh hoạ tương tác: [visualization.html](./visualization.html) — A* pathfinder vẽ tường bằng chuột + chạy từng bước, so BFS/Dijkstra/A* đếm số ô thăm, và đổi heuristic xem vùng thăm thay đổi.
`;
