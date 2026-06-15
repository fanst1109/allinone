// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-28-dp-on-trees/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 28 — Quy hoạch động trên cây (DP on Trees)

> Tier 4 · Quy hoạch động · Lesson 28
> Tiền đề: [DP Fundamentals (L23)](../lesson-23-dp-fundamentals/), [DP 1 chiều (L24)](../lesson-24-dp-1d/), và cấu trúc **cây (tree)** ở [DataStructures](../../DataStructures/).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **DP trên cây** là gì: state gắn với mỗi node, tính từ con lên cha bằng **post-order DFS**.
- Viết được **khung cơ bản** (template) của một bài DP trên cây.
- Giải 3 bài kinh điển: **Maximum Independent Set / House Robber III**, **Tree Diameter**, **Subtree Aggregate**.
- Mở rộng sang DP nhiều state: **min vertex cover**, **max matching**.
- Nắm **rerooting technique** — tính kết quả cho MỌI node làm gốc trong $O(n)$ thay vì $O(n^2)$.
- Biết tease về **binary lifting (LCA)** và các cạm bẫy thường gặp (stack overflow, quên parent, sai chiều rerooting, thiếu state).

---

## 1. DP trên cây là gì?

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng một **cây gia phả** ngược: muốn biết "tổng tài sản của cả dòng họ tính từ một người trở xuống", bạn không cần đếm lại từ đầu mỗi lần. Bạn chỉ cần hỏi từng người con "tổng tài sản dòng họ của con là bao nhiêu?", rồi **cộng dồn + tài sản của chính mình**. Mỗi người con cũng làm y hệt với con của họ. Đây chính là tinh thần DP trên cây: **kết quả của một node được tổng hợp từ kết quả của các con nó**.

DP trên cây = áp dụng quy hoạch động trên cấu trúc **cây** (đồ thị liên thông, không chu trình, $n$ node thì $n-1$ cạnh). Đặc trưng:

- **State gắn với mỗi node**: \`dp[node]\` = một đại lượng (số, hoặc bộ giá trị) tổng hợp từ **subtree** gốc tại \`node\`.
- **Tính từ con lên cha**: muốn có \`dp[node]\`, ta cần \`dp\` của tất cả các con trước. Thứ tự tự nhiên là **post-order** (xử lý con xong mới xử lý cha).
- **Cây không có chu trình** → không lo thứ tự phức tạp như đồ thị tổng quát. Một lần DFS duyệt mỗi node đúng một lần là đủ.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao là post-order chứ không phải pre-order?"* — Vì \`dp[node]\` **phụ thuộc** \`dp[con]\`. Pre-order xử lý cha trước con → lúc tính cha ta chưa có dữ liệu con. Post-order xử lý con trước → đến lượt cha thì dữ liệu con đã sẵn sàng.
> - *"DP trên mảng (L24) khác gì DP trên cây?"* — Trên mảng, "bài con" là tiền tố/hậu tố theo chỉ số tuyến tính (\`dp[i]\` phụ thuộc \`dp[i-1]\`). Trên cây, "bài con" là **các subtree con**. Cùng tư tưởng "lưu kết quả bài con chồng lấp", chỉ khác hình dạng quan hệ phụ thuộc.
> - *"Bài con có chồng lấp không?"* — Trên cây thuần (mỗi node 1 cha), mỗi subtree được tính **đúng 1 lần** → không chồng lấp theo nghĩa fibonacci. Nhưng vẫn là DP vì ta **lưu** \`dp[node]\` để cha dùng lại thay vì tính lại. (Khi rerooting hoặc cây-trên-DAG mới có chồng lấp thật.)

### Quan hệ với cấu trúc cây

Một cây thường biểu diễn bằng **danh sách kề (adjacency list)**: \`adj[u]\` = các node nối với \`u\`. Vì cây vô hướng, khi DFS phải nhớ **parent** để không quay ngược lên (xem [DataStructures — tree](../../DataStructures/)).

\`\`\`go
// Cây biểu diễn bằng danh sách kề. n node đánh số 0..n-1.
type Tree struct {
    n   int
    adj [][]int // adj[u] = các đỉnh kề u
}

func NewTree(n int) *Tree {
    return &Tree{n: n, adj: make([][]int, n)}
}

// AddEdge thêm cạnh vô hướng u-v.
func (t *Tree) AddEdge(u, v int) {
    t.adj[u] = append(t.adj[u], v)
    t.adj[v] = append(t.adj[v], u)
}
\`\`\`

> 📝 **Tóm tắt mục 1.**
> - DP trên cây: \`dp[node]\` tổng hợp từ subtree, tính bằng **post-order DFS**.
> - Cây không chu trình → mỗi node duyệt 1 lần, thứ tự đơn giản.
> - Vì cây vô hướng (adjacency list), DFS phải truyền **parent** để tránh đi ngược.

---

## 2. Khung cơ bản (template)

> 💡 **Trực giác.** Mọi bài DP trên cây đều cùng một bộ xương: "đi xuống tới lá, tính dp lá, rồi trên đường quay về cha thì gộp dp của các con lại". Phần khác nhau giữa các bài chỉ là **dp lưu gì** và **gộp như thế nào**.

Khung post-order DFS chuẩn:

\`\`\`go
// dfs trả về dp của subtree gốc tại node.
// parent: node cha (để không đi ngược lên cây vô hướng).
func (t *Tree) dfs(node, parent int) int {
    res := baseCase(node) // giá trị khởi tạo cho lá / chính node

    for _, child := range t.adj[node] {
        if child == parent {
            continue // bỏ qua cạnh quay ngược lên cha
        }
        childRes := t.dfs(child, node) // tính con trước (post-order)
        res = combine(res, childRes)   // gộp kết quả con vào node
    }
    return res
}

// Gọi từ gốc (thường là 0), parent = -1 (gốc không có cha).
// answer := t.dfs(0, -1)
\`\`\`

Ba chỗ phải điền cho từng bài:

1. **\`baseCase(node)\`** — giá trị khi node chưa gộp con nào (vd: size = 1 cho chính node).
2. **\`combine(res, childRes)\`** — cách gộp dp con vào dp cha (cộng, lấy max, ...).
3. **Giá trị trả về** — đôi khi node trả về một thứ (vd depth) nhưng cập nhật đáp án toàn cục bằng một thứ khác (vd diameter). Đây là pattern rất hay gặp (xem mục 4).

> ⚠ **Lỗi thường gặp.** Quên kiểm tra \`child == parent\` → DFS đi ngược lên cha, rồi cha gọi lại con → **lặp vô hạn** (hoặc đếm trùng). Trên cây vô hướng, cạnh \`u-v\` xuất hiện ở cả \`adj[u]\` và \`adj[v]\`, nên **bắt buộc** truyền và kiểm tra parent.

> 🔁 **Dừng lại tự kiểm tra.** Với cây 3 node \`0—1\`, \`0—2\`, gốc 0, nếu \`baseCase = 1\` (đếm size) và \`combine = res + childRes\`, thì \`dfs(0,-1)\` trả về bao nhiêu?
> <details><summary>Đáp án</summary>
> \`dfs(1,0)=1\`, \`dfs(2,0)=1\`. Tại node 0: \`res=1\`, gộp con 1 → \`2\`, gộp con 2 → \`3\`. Trả về **3** = số node. Đúng (size subtree gốc 0 = cả cây).
> </details>

> 📝 **Tóm tắt mục 2.**
> - Khung = post-order DFS + bỏ qua parent + gộp dp con.
> - 3 chỗ điền: \`baseCase\`, \`combine\`, giá trị trả về.
> - Pattern nâng cao: trả về 1 thứ, cập nhật đáp án toàn cục bằng thứ khác.

---

## 3. Maximum Independent Set on Tree — House Robber III

> 💡 **Trực giác.** Một tên trộm "thông minh" đi cướp nhà trên một cái **cây** nhà. Luật: **không được cướp 2 nhà kề nhau** (cha–con) vì sẽ báo động liên hoàn. Hỏi: số tiền tối đa cướp được? Đây chính là **Maximum Weight Independent Set** trên cây — chọn tập node có trọng số lớn nhất sao cho **không có 2 node nào kề nhau**.

### State 2 chiều

Tại mỗi node, có **2 lựa chọn**: cướp (\`1\`) hay không cướp (\`0\`). Định nghĩa:

- \`dp[node][0]\` = tổng tiền tối đa của subtree gốc \`node\`, **khi KHÔNG cướp** \`node\`.
- \`dp[node][1]\` = tổng tiền tối đa của subtree gốc \`node\`, **khi CÓ cướp** \`node\`.

Công thức gộp (cho mỗi con \`c\`):

- Nếu **không cướp** \`node\` → con \`c\` được tự do, lấy \`max(dp[c][0], dp[c][1])\`.
- Nếu **cướp** \`node\` → con \`c\` **bắt buộc không cướp**, chỉ lấy \`dp[c][0]\`.

$$
\\texttt{dp[node][0]} = \\sum_{c} \\max(\\texttt{dp[c][0]}, \\texttt{dp[c][1]})
$$
$$
\\texttt{dp[node][1]} = \\texttt{val[node]} + \\sum_{c} \\texttt{dp[c][0]}
$$

Đáp án = \`max(dp[root][0], dp[root][1])\`.

### Walk-through bằng số cụ thể

Cây 5 node, trọng số: \`val = [3, 2, 3, 0, 1]\` (node 0..4). Cạnh: \`0—1\`, \`0—2\`, \`1—3\`, \`1—4\`. Gốc 0.

\`\`\`
            (0: val=3)
           /          \\
      (1: val=2)    (2: val=3)
       /     \\
  (3: val=0) (4: val=1)
\`\`\`

Tính từ lá lên (post-order):

| node | con | dp[node][0] (không cướp) | dp[node][1] (cướp) |
|------|-----|--------------------------|--------------------|
| 3 (lá) | — | \`0\` | \`val=0\` → \`0\` |
| 4 (lá) | — | \`0\` | \`val=1\` → \`1\` |
| 2 (lá) | — | \`0\` | \`val=3\` → \`3\` |
| 1 | 3,4 | \`max(0,0)+max(0,1)=0+1=1\` | \`2 + dp[3][0]+dp[4][0] = 2+0+0 = 2\` |
| 0 | 1,2 | \`max(1,2)+max(0,3)=2+3=5\` | \`3 + dp[1][0]+dp[2][0] = 3+1+0 = 4\` |

Đáp án = \`max(dp[0][0], dp[0][1]) = max(5, 4) = \`**\`5\`**.

Kiểm chứng tay: chọn \`{node 1 (2), node 2 (3)}\` = \`5\`, không kề nhau ✓ (1 và 2 đều là con của 0, không kề nhau). Hoặc chọn \`{node 0 (3), node 4 (1)}\`? — 0 và 4 không kề (0–1–4), nhưng 0 kề 1 nên nếu cướp 0 thì không được cướp 1; chọn \`{0, 3, 4}\` = \`3+0+1=4 < 5\`. Vậy \`5\` là tối ưu ✓.

### Code Go

\`\`\`go
// houseRobberIII trả về số tiền tối đa cướp được trên cây,
// không cướp 2 node kề nhau (cha-con).
// val[node] = trọng số (tiền) của node.
func (t *Tree) houseRobberIII(val []int) int {
    // dfs trả về [2]int: [0]=không cướp node, [1]=cướp node.
    var dfs func(node, parent int) [2]int
    dfs = func(node, parent int) [2]int {
        notRob := 0      // dp[node][0]
        rob := val[node] // dp[node][1] — bắt đầu bằng tiền chính node

        for _, c := range t.adj[node] {
            if c == parent {
                continue
            }
            sub := dfs(c, node)
            // không cướp node → con tự do
            notRob += max(sub[0], sub[1])
            // cướp node → con bắt buộc không cướp
            rob += sub[0]
        }
        return [2]int{notRob, rob}
    }

    r := dfs(0, -1)
    return max(r[0], r[1])
}

func max(a, b int) int { if a > b { return a }; return b }
\`\`\`

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao cần 2 state mà không phải 1?"* — Vì kết quả của con phụ thuộc **trạng thái cha**. Nếu chỉ lưu "max của subtree" (1 giá trị), khi cha quyết định cướp, ta không biết con đã cướp chưa → không ép được ràng buộc kề nhau. State \`[node][cướp/không]\` đóng đủ thông tin.
> - *"House Robber I (L24) khác gì?"* — L24 là cây suy biến thành **đường thẳng** (mảng). House Robber III tổng quát hóa lên cây bất kỳ. Cùng ý tưởng "chọn/không chọn + không kề".

> ⚠ **Lỗi thường gặp.** Khởi tạo \`rob = 0\` rồi quên cộng \`val[node]\`. Phải bắt đầu \`rob\` bằng \`val[node]\` vì cướp node thì **chắc chắn** thu tiền node đó.

> 🔁 **Dừng lại tự kiểm tra.** Với cùng cây trên nhưng \`val = [1, 5, 1, 1, 1]\`, đáp án là bao nhiêu?
> <details><summary>Đáp án</summary>
> Node 1 trọng số 5 rất lớn. Chọn \`{1}\` đơn lẻ? \`{1, 2}\` = 5+1=6 (1,2 là anh em, không kề) ✓. Hay \`{3,4,2}\` = 1+1+1=3. Hay \`{0,3,4}\` = 1+1+1=3. Tối ưu là \`{1,2}=6\`. Chạy công thức: lá 3,4,2 → dp[c][1]=1 mỗi cái. dp[1][0]=max(0,1)+max(0,1)=2, dp[1][1]=5+0+0=5. dp[0][0]=max(2,5)+max(0,1)=5+1=6, dp[0][1]=1+dp[1][0]+dp[2][0]=1+2+0=3. Đáp án \`max(6,3)=\`**6** ✓.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Max Independent Set / House Robber III: state \`dp[node][0/1]\` = không cướp / cướp.
> - \`dp[0] = Σ max(con[0], con[1])\`, \`dp[1] = val + Σ con[0]\`.
> - Đáp án = \`max(dp[root][0], dp[root][1])\`. Độ phức tạp $O(n)$.

---

## 4. Tree Diameter — đường kính cây

> 💡 **Trực giác.** **Đường kính (diameter)** = đường đi dài nhất (số cạnh) giữa **2 node bất kỳ** trong cây. Hình dung: căng cây ra như một mạng lưới dây, đường kính là đoạn dây dài nhất nối 2 đầu xa nhau nhất.

### Ý tưởng cốt lõi

Xét đường kính tối ưu. Nó đi qua một node nào đó làm **đỉnh cao nhất (top)** của đường đi. Tại node \`top\` này, đường kính = **hai nhánh con sâu nhất** cộng lại (đi xuống một con sâu nhất, vòng qua top, xuống con sâu nhì).

Chiến lược: DFS trả về **độ sâu (depth)** lớn nhất từ node đi xuống lá. Tại mỗi node, lấy **2 depth con lớn nhất** cộng lại để **cập nhật đáp án toàn cục** \`diameter\`.

- \`depth(node)\` = \`1 + max(depth của các con)\` (độ dài đường đi dài nhất từ node xuống lá, tính bằng số cạnh).
- Tại node: nếu có ≥2 con, \`diameter = max(diameter, top1 + top2)\` với \`top1, top2\` là 2 chiều cao con lớn nhất (tính bằng số cạnh = depth con + 1 mỗi cạnh nối).

> Đây là **pattern "trả về 1 thứ, cập nhật toàn cục thứ khác"**: hàm trả \`depth\` (đi lên cho cha dùng), nhưng tranh thủ cập nhật \`diameter\` (biến toàn cục) tại mỗi node.

### Walk-through bằng số

Cây 6 node, cạnh: \`0—1\`, \`1—2\`, \`1—3\`, \`3—4\`, \`4—5\`. Gốc 0.

\`\`\`
(0)—(1)—(2)
      |
     (3)—(4)—(5)
\`\`\`

Định nghĩa \`down(node)\` = số cạnh của đường dài nhất từ node xuống lá. DFS post-order (gốc 0):

| node | con (≠parent) | các (down(con)+1) | down(node) | 2 lớn nhất → update diameter |
|------|----------------|-------------------|------------|-------------------------------|
| 2 (lá) | — | — | \`0\` | 0 nhánh → diameter = 0 |
| 4 → 5 lá | 5 | \`down(5)=0 → 1\` | \`1\` | 1 nhánh → không update (chỉ 1) |
| 5 (lá) | — | — | \`0\` | — |
| 3 | 4 | \`down(4)=1 → 2\` | \`2\` | 1 nhánh → không update |
| 1 | 2, 3 | \`2→ (0+1)=1\`, \`3→(2+1)=3\` | \`3\` | top1=3, top2=1 → diameter=\`3+1=4\` |
| 0 | 1 | \`1→(3+1)=4\` | \`4\` | 1 nhánh → không update; diameter giữ **4** |

Đáp án **diameter = 4** (đường \`2—1—3—4—5\`, đếm 4 cạnh) ✓.

### Code Go

\`\`\`go
// treeDiameter trả về đường kính (số cạnh dài nhất giữa 2 node) của cây.
func (t *Tree) treeDiameter() int {
    diameter := 0

    // down trả về số cạnh của đường dài nhất từ node đi xuống lá.
    var down func(node, parent int) int
    down = func(node, parent int) int {
        best1, best2 := 0, 0 // hai chiều cao con lớn nhất (tính cả cạnh nối)
        for _, c := range t.adj[node] {
            if c == parent {
                continue
            }
            h := down(c, node) + 1 // +1 cho cạnh node→c
            if h > best1 {
                best2 = best1
                best1 = h
            } else if h > best2 {
                best2 = h
            }
        }
        // đường kính đi qua node = 2 nhánh sâu nhất cộng lại
        if best1+best2 > diameter {
            diameter = best1 + best2
        }
        return best1 // đường dài nhất từ node xuống = nhánh sâu nhất
    }

    down(0, -1)
    return diameter
}
\`\`\`

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao đường kính chỉ cần 2 nhánh sâu nhất tại 1 node?"* — Bất kỳ đường đi nào trong cây đều có một node cao nhất (gần gốc nhất). Tại node đó, đường đi rẽ xuống tối đa 2 hướng. Lấy 2 hướng sâu nhất cho đường dài nhất qua node đó. Quét mọi node làm "đỉnh" → tìm được max.
> - *"Có cách 2 lần BFS không?"* — Có: BFS từ node bất kỳ tìm node xa nhất \`u\`, rồi BFS từ \`u\` tìm node xa nhất \`v\`; \`dist(u,v)\` = đường kính. Nhưng DP 1 lần DFS gọn hơn và tổng quát hơn (cây có trọng số cạnh cũng làm được bằng cách cộng trọng số thay vì +1).

> ⚠ **Lỗi thường gặp.** Chỉ theo dõi **1** nhánh sâu nhất (\`best1\`) mà quên \`best2\` → bỏ sót đường kính đi vòng qua node qua 2 hướng. Phải giữ **2** chiều cao lớn nhất.

> 🔁 **Dừng lại tự kiểm tra.** Cây hình sao: node 0 nối với 1,2,3,4 (4 lá). Đường kính?
> <details><summary>Đáp án</summary>
> Tại node 0: mọi \`down(con)+1 = 1\`. 2 lớn nhất = \`1, 1\` → diameter = \`2\`. Đường vd \`1—0—2\` = 2 cạnh ✓.
> </details>

> 📝 **Tóm tắt mục 4.**
> - Diameter = đường dài nhất giữa 2 node, đi qua một node "đỉnh".
> - DFS trả \`down(node)\` = nhánh sâu nhất; tại node update \`diameter = max(diameter, best1+best2)\`.
> - Pattern "trả 1 thứ, update toàn cục thứ khác". $O(n)$.

---

## 5. Subtree Aggregate — tổng hợp trên subtree

> 💡 **Trực giác.** Rất nhiều bài chỉ cần "với mỗi node, cho biết một con số tổng hợp của cả subtree dưới nó": **kích thước (size)**, **tổng giá trị (sum)**, **đếm node thỏa điều kiện (count)**. Đây là DP trên cây đơn giản nhất — \`dp[node] = (giá trị node) + Σ dp[con]\`.

### Size subtree

\`\`\`go
// subtreeSize điền size[node] = số node trong subtree gốc node.
func (t *Tree) subtreeSize() []int {
    size := make([]int, t.n)
    var dfs func(node, parent int)
    dfs = func(node, parent int) {
        size[node] = 1 // tính chính node
        for _, c := range t.adj[node] {
            if c == parent {
                continue
            }
            dfs(c, node)
            size[node] += size[c] // gộp size con
        }
    }
    dfs(0, -1)
    return size
}
\`\`\`

**Ví dụ số.** Cây 5 node mục 3 (\`0—1, 0—2, 1—3, 1—4\`):

| node | size |
|------|------|
| 3 | 1 |
| 4 | 1 |
| 2 | 1 |
| 1 | 1 + size[3] + size[4] = 3 |
| 0 | 1 + size[1] + size[2] = 5 |

→ \`size = [5, 3, 1, 1, 1]\` ✓ (root = n = 5).

### Sum & count theo điều kiện

\`\`\`go
// subtreeSum trả về sum[node] = tổng val của mọi node trong subtree.
func (t *Tree) subtreeSum(val []int) []int {
    sum := make([]int, t.n)
    var dfs func(node, parent int)
    dfs = func(node, parent int) {
        sum[node] = val[node]
        for _, c := range t.adj[node] {
            if c == parent {
                continue
            }
            dfs(c, node)
            sum[node] += sum[c]
        }
    }
    dfs(0, -1)
    return sum
}

// countEven: đếm số node có val chẵn trong mỗi subtree.
func (t *Tree) countEven(val []int) []int {
    cnt := make([]int, t.n)
    var dfs func(node, parent int)
    dfs = func(node, parent int) {
        if val[node]%2 == 0 {
            cnt[node] = 1
        }
        for _, c := range t.adj[node] {
            if c == parent {
                continue
            }
            dfs(c, node)
            cnt[node] += cnt[c]
        }
    }
    dfs(0, -1)
    return cnt
}
\`\`\`

> ❓ **Câu hỏi tự nhiên.** *"Khác nhau gì giữa 3 hàm trên?"* — Chỉ khác **baseCase** (1 / val / điều kiện) và **đại lượng cộng dồn**. Bộ xương DFS giống hệt. Đây là minh chứng "khung mục 2 lặp đi lặp lại".

> 📝 **Tóm tắt mục 5.**
> - Subtree aggregate: \`dp[node] = base(node) + Σ dp[con]\`.
> - Size / Sum / Count chỉ khác baseCase + đại lượng. Tất cả $O(n)$.

---

## 6. Tree DP nhiều state — Min Vertex Cover & Max Matching

> 💡 **Trực giác.** Có những bài cần **nhiều hơn 2 state** hoặc state phức tạp hơn. **Min Vertex Cover trên cây**: chọn tập node nhỏ nhất sao cho **mỗi cạnh có ít nhất 1 đầu được chọn** (đối ngẫu với independent set!). **Max Matching trên cây**: chọn tập cạnh nhiều nhất sao cho **không cạnh nào chung đỉnh**.

### Min Vertex Cover

State: \`dp[node][0]\` = min cover của subtree khi **node KHÔNG được chọn**; \`dp[node][1]\` = khi **node ĐƯỢC chọn**.

- Nếu \`node\` không chọn → mọi cạnh \`node–c\` phải được \`c\` phủ → con bắt buộc chọn: \`dp[node][0] = Σ dp[c][1]\`.
- Nếu \`node\` chọn → con tự do: \`dp[node][1] = 1 + Σ min(dp[c][0], dp[c][1])\`.

Đáp án = \`min(dp[root][0], dp[root][1])\`.

\`\`\`go
// minVertexCover trả về kích thước vertex cover nhỏ nhất trên cây.
func (t *Tree) minVertexCover() int {
    var dfs func(node, parent int) [2]int
    dfs = func(node, parent int) [2]int {
        notTake := 0 // dp[node][0]
        take := 1    // dp[node][1] — đã chọn node
        for _, c := range t.adj[node] {
            if c == parent {
                continue
            }
            sub := dfs(c, node)
            notTake += sub[1]              // node không chọn → con phải chọn
            take += min(sub[0], sub[1])    // node chọn → con tự do
        }
        return [2]int{notTake, take}
    }
    r := dfs(0, -1)
    return min(r[0], r[1])
}

func min(a, b int) int { if a < b { return a }; return b }
\`\`\`

**Ví dụ số.** Đường thẳng 3 node \`0—1—2\` (gốc 0). Cạnh: 0–1, 1–2.
- node 2 (lá): \`[0, 1]\`.
- node 1: \`notTake = dp[2][1] = 1\`; \`take = 1 + min(0,1) = 1\`. → \`[1, 1]\`.
- node 0: \`notTake = dp[1][1] = 1\`; \`take = 1 + min(1,1) = 2\`. → \`[1, 2]\`.
- Đáp án = \`min(1, 2) = 1\`. Kiểm: chọn \`{node 1}\` phủ cả 2 cạnh 0–1, 1–2 ✓. Vertex cover = 1.

> ⚠ **Lỗi thường gặp.** Nhầm chiều ràng buộc: khi node **không chọn**, con **bắt buộc chọn** (\`dp[c][1]\`), không phải \`min\`. Quên điều này → cover sai (bỏ sót cạnh node–c).

### Max Matching (ý tưởng)

State: \`dp[node][0]\` = max matching subtree khi node **chưa được match**; \`dp[node][1]\` = khi node **đã match với một con**.
- \`dp[node][0] = Σ max(dp[c][0], dp[c][1])\` (con tự do).
- \`dp[node][1] = max qua từng con c của (1 + dp[c][0] + Σ_{c'≠c} max(dp[c'][0], dp[c'][1]))\` — chọn 1 con để match.

Đáp án = \`max(dp[root][0], dp[root][1])\`. Độ phức tạp $O(n)$ (tính khéo phần "trừ một con").

> ❓ **Câu hỏi tự nhiên.** *"Vì sao bài trên cây giải được bằng DP còn trên đồ thị tổng quát thì khó?"* — Trên cây, mỗi node tách subtree độc lập → bài con không "đan chéo". Trên đồ thị có chu trình, các lựa chọn ràng buộc lẫn nhau vòng quanh → cần thuật toán khác (matching tổng quát = Edmonds' Blossom).

> 📝 **Tóm tắt mục 6.**
> - Min Vertex Cover: \`dp[0]=Σdp[c][1]\`, \`dp[1]=1+Σmin(...)\`. Đối ngẫu independent set.
> - Max Matching: state node matched/chưa, chọn ≤1 con để match.
> - Nhiều bài tối ưu trên cây = thêm state \`[node][trạng thái]\`.

---

## 7. Rerooting technique (DP lại gốc / re-rooting)

> 💡 **Trực giác.** Cho tới giờ ta cố định **gốc** (thường node 0) và tính \`dp\` cho subtree dưới mỗi node. Nhưng nhiều bài hỏi: *"với MỖI node làm gốc, kết quả là gì?"* — vd "tổng khoảng cách từ node \`v\` tới tất cả node còn lại", cho mọi \`v\`. Cách ngây thơ: chạy DFS $n$ lần, mỗi lần đổi gốc → $O(n^2)$. **Rerooting** làm trong $O(n)$: chạy 2 lần DFS, lần 2 "đẩy" thông tin từ cha xuống con để chuyển gốc dần dần.

### Ví dụ kinh điển: Sum of Distances in Tree

Cho cây \`n\` node. Với mỗi node \`v\`, tính \`ans[v]\` = tổng khoảng cách (số cạnh) từ \`v\` tới mọi node khác.

**Hai lần DFS:**

**DFS 1 (hướng xuống, post-order)** — cố định gốc 0, tính:
- \`size[node]\` = số node trong subtree.
- \`down[node]\` = tổng khoảng cách từ \`node\` tới mọi node **trong subtree** của nó.
- Công thức: \`down[node] = Σ (down[c] + size[c])\` — mỗi node con \`c\` đóng góp \`down[c]\` (khoảng cách nội bộ subtree con) cộng thêm \`size[c]\` (vì đi từ \`node\` xuống cần thêm 1 cạnh cho **mỗi** node của subtree con).

Sau DFS 1, \`ans[0] = down[0]\` đã đúng (gốc 0 nhìn được toàn cây).

**DFS 2 (hướng xuống, pre-order, "đẩy" từ cha)** — chuyển gốc từ \`node\` sang con \`c\`:
- Khi reroot từ \`node\` sang \`c\`: các node **trong subtree c** (có \`size[c]\` node) **gần lại 1 cạnh**; các node **ngoài subtree c** (\`n - size[c]\` node) **xa ra 1 cạnh**.
- $$\\texttt{ans[c]} = \\texttt{ans[node]} - \\texttt{size[c]} + (n - \\texttt{size[c]})$$

### Walk-through ý tưởng (đường thẳng 4 node)

Cây đường thẳng \`0—1—2—3\`. Gốc 0.

**DFS 1** (post-order): 
- \`size = [4,3,2,1]\`. 
- \`down[3]=0\`. \`down[2]=down[3]+size[3]=0+1=1\`. \`down[1]=down[2]+size[2]=1+2=3\`. \`down[0]=down[1]+size[1]=3+3=6\`.
- → \`ans[0] = down[0] = 6\` (khoảng cách 0→1,2,3 = 1+2+3 = 6 ✓).

**DFS 2** (đẩy từ cha xuống), \`n=4\`:
- \`ans[1] = ans[0] - size[1] + (n - size[1]) = 6 - 3 + (4-3) = 6 - 3 + 1 = 4\`. Kiểm: 1→0,2,3 = 1+1+2 = 4 ✓.
- \`ans[2] = ans[1] - size[2] + (n - size[2]) = 4 - 2 + (4-2) = 4 - 2 + 2 = 4\`. Kiểm: 2→0,1,3 = 2+1+1 = 4 ✓.
- \`ans[3] = ans[2] - size[3] + (n - size[3]) = 4 - 1 + (4-1) = 4 - 1 + 3 = 6\`. Kiểm: 3→0,1,2 = 3+2+1 = 6 ✓.

→ \`ans = [6, 4, 4, 6]\`. Tất cả khớp! Chỉ **2 lần DFS = $O(n)$** thay vì 4 lần DFS riêng = $O(n^2)$.

### Code Go

\`\`\`go
// sumOfDistances trả về ans[v] = tổng khoảng cách từ v tới mọi node khác,
// cho MỌI v, bằng rerooting trong O(n).
func (t *Tree) sumOfDistances() []int {
    n := t.n
    size := make([]int, n)
    ans := make([]int, n) // sau DFS1: ans[0] đúng; sau DFS2: tất cả đúng

    // DFS 1: tính size[node] và ans[0] = tổng khoảng cách từ gốc 0.
    var dfs1 func(node, parent, depth int)
    dfs1 = func(node, parent, depth int) {
        size[node] = 1
        ans[0] += depth // cộng khoảng cách từ gốc 0 tới node
        for _, c := range t.adj[node] {
            if c == parent {
                continue
            }
            dfs1(c, node, depth+1)
            size[node] += size[c]
        }
    }
    dfs1(0, -1, 0)

    // DFS 2: reroot từ cha xuống con, đẩy đáp án.
    var dfs2 func(node, parent int)
    dfs2 = func(node, parent int) {
        for _, c := range t.adj[node] {
            if c == parent {
                continue
            }
            // chuyển gốc node→c: subtree c gần lại 1, phần còn lại xa ra 1
            ans[c] = ans[node] - size[c] + (n - size[c])
            dfs2(c, node)
        }
    }
    dfs2(0, -1)

    return ans
}
\`\`\`

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao DFS 1 dùng \`depth\` thay vì \`down\` như giải thích trên?"* — Cả hai cách đều cho \`ans[0]\` đúng. Cộng \`depth\` của mọi node = tổng khoảng cách từ gốc, đơn giản hơn công thức \`down\`. Phần quan trọng (rerooting) nằm ở DFS 2 và mảng \`size\`.
> - *"Công thức reroot \`-size[c] + (n-size[c])\` từ đâu?"* — Khi gốc dời từ \`node\` sang con \`c\`, mọi node trong subtree \`c\` (đếm \`size[c]\`) **giảm** khoảng cách đúng 1 (gần lại); mọi node ngoài (đếm \`n - size[c]\`) **tăng** 1. Tổng thay đổi = \`-size[c] + (n - size[c])\`.

> ⚠ **Lỗi thường gặp.**
> - **Sai chiều reroot**: đảo dấu thành \`+size[c] - (n-size[c])\` → kết quả ngược hoàn toàn.
> - **Cập nhật \`ans[c]\` SAU khi gọi \`dfs2(c)\`**: phải tính \`ans[c]\` **trước** rồi mới đệ quy xuống (vì \`ans[c]\` cần \`ans[node]\` của cha — pre-order).

> 🔁 **Dừng lại tự kiểm tra.** Cây hình sao: 0 nối 1,2,3. \`size = ?\`, \`ans = ?\`
> <details><summary>Đáp án</summary>
> \`size=[4,1,1,1]\`. DFS1: depth của 1,2,3 = 1 → \`ans[0]=3\`. Reroot: \`ans[1]=3 - size[1] + (4-size[1]) = 3-1+3 = 5\`. Kiểm: 1→0=1, 1→2=2, 1→3=2 → 5 ✓. Tương tự \`ans[2]=ans[3]=5\`. → \`ans=[3,5,5,5]\`.
> </details>

> 📝 **Tóm tắt mục 7.**
> - Rerooting: tính kết quả cho MỌI gốc trong $O(n)$ (thay vì $O(n^2)$).
> - DFS 1 hướng xuống (size + dp gốc cố định); DFS 2 đẩy từ cha xuống con.
> - Sum of distances: \`ans[c] = ans[node] - size[c] + (n - size[c])\`.

---

## 8. Binary Lifting (LCA) — tease

> 💡 Khi cần trả lời nhiều truy vấn **"tổ tiên chung thấp nhất (Lowest Common Ancestor — LCA)"** của 2 node, hoặc khoảng cách giữa 2 node bất kỳ, ta dùng **binary lifting**: tiền xử lý \`up[node][k]\` = tổ tiên thứ $2^k$ của node. Mỗi truy vấn LCA chạy $O(\\log n)$ bằng cách "nhảy" lên theo lũy thừa 2.

Đây là kỹ thuật gắn liền với cây nhưng thuộc chuyên đề **truy vấn trên cây** (Tier 7 nâng cao). Trong bài này chỉ cần biết:

- \`up[v][0]\` = cha trực tiếp; \`up[v][k] = up[ up[v][k-1] ][k-1]\`.
- Tiền xử lý $O(n \\log n)$, mỗi truy vấn LCA $O(\\log n)$.
- Ứng dụng: khoảng cách \`dist(u,v) = depth[u] + depth[v] - 2·depth[LCA(u,v)]\`.

> Sẽ học kỹ ở các lesson nâng cao về cây/đồ thị. Ở đây chỉ tease để bạn biết khi gặp bài "nhiều truy vấn quan hệ tổ tiên" thì tìm tới binary lifting.

---

## 9. Độ phức tạp

| Bài toán | Thời gian | Bộ nhớ | Ghi chú |
|----------|-----------|--------|---------|
| Subtree size / sum / count | $O(n)$ | $O(n)$ | 1 lần DFS |
| House Robber III (MIS) | $O(n)$ | $O(n)$ | state \`[node][2]\` |
| Tree diameter | $O(n)$ | $O(n)$ | 1 lần DFS, giữ 2 nhánh |
| Min vertex cover / max matching | $O(n)$ | $O(n)$ | state nhiều hơn nhưng vẫn tuyến tính |
| Rerooting (sum of distances) | $O(n)$ | $O(n)$ | **2** lần DFS, không phải $O(n^2)$ |
| Binary lifting (tiền xử lý) | $O(n \\log n)$ | $O(n \\log n)$ | mỗi truy vấn LCA $O(\\log n)$ |

> ❓ **Câu hỏi tự nhiên.** *"Vì sao 1 lần DFS là $O(n)$ chứ không $O(n^2)$?"* — DFS duyệt mỗi node đúng 1 lần và mỗi cạnh đúng 2 lần (xuống + lên). Cây có $n-1$ cạnh → tổng công việc $O(n)$. Việc gộp dp tại mỗi node tỉ lệ số con, tổng số con toàn cây = số cạnh = $O(n)$.

> 📝 **Tóm tắt mục 9.** Hầu hết DP trên cây là $O(n)$. Rerooting cũng $O(n)$ (2 DFS). Chỉ binary lifting thêm hệ số $\\log n$.

---

## 10. Khi nào dùng DP trên cây?

> 💡 Nhận diện bài toán DP trên cây:

1. **Đầu vào là một cây** (n node, n-1 cạnh, liên thông, không chu trình) — hoặc một rừng (forest).
2. **Kết quả tại một node phụ thuộc kết quả các subtree con** — "với node này, tính X dựa trên X của các con".
3. **Cần đáp án cho mọi node làm gốc** → dùng **rerooting** (O(n) thay vì O(n²)).
4. Các từ khóa: "subtree", "đường đi trên cây", "chọn node không kề", "phủ cạnh", "đường kính", "tổng khoảng cách".

> ⚠ **Lỗi thường gặp.** Cố ép một bài **không phải cây** (có chu trình) vào khung DP trên cây → sai. Nếu đồ thị có chu trình, phải dùng kỹ thuật khác (DP trên DAG sau topo sort, hoặc DP trên cây phân rã / tree decomposition).

> 📝 **Tóm tắt mục 10.** Dùng DP trên cây khi: đầu vào là cây + kết quả node phụ thuộc subtree. Cần mọi gốc → rerooting.

---

## 11. Cạm bẫy thường gặp

> ⚠ Tổng hợp các lỗi điển hình (mỗi cái kèm cách phòng):

1. **Đệ quy quá sâu → stack overflow.** Cây lệch (skewed, gần như đường thẳng) có độ sâu $O(n)$. Với $n = 10^6$, đệ quy \`dfs\` có thể tràn stack. **Cách sửa**: tăng stack, hoặc viết DFS **iterative** dùng stack thủ công (xử lý post-order bằng cách đẩy node 2 lần hoặc đánh dấu).

\`\`\`go
// DFS iterative tính subtree size (tránh stack overflow trên cây lệch).
func (t *Tree) subtreeSizeIterative(root int) []int {
    size := make([]int, t.n)
    parent := make([]int, t.n)
    order := []int{} // thứ tự duyệt (pre-order), xử lý ngược = post-order

    parent[root] = -1
    stack := []int{root}
    visited := make([]bool, t.n)
    visited[root] = true
    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        order = append(order, node)
        for _, c := range t.adj[node] {
            if !visited[c] {
                visited[c] = true
                parent[c] = node
                stack = append(stack, c)
            }
        }
    }
    // xử lý ngược order = post-order (con trước cha)
    for i := len(order) - 1; i >= 0; i-- {
        node := order[i]
        size[node]++ // chính node
        if parent[node] != -1 {
            size[parent[node]] += size[node]
        }
    }
    return size
}
\`\`\`

2. **Quên \`visited\`/\`parent\` cho cây dạng graph (vô hướng).** Cạnh \`u—v\` lưu 2 chiều → DFS không chặn parent sẽ đi ngược. Luôn truyền \`parent\` (hoặc dùng \`visited[]\`).

3. **Rerooting nhầm chiều.** Khi đẩy đáp án từ cha sang con, dấu của \`size[c]\` và \`n - size[c]\` phải đúng (con gần lại = trừ, ngoài xa ra = cộng). Đảo dấu → kết quả sai hoàn toàn. Luôn verify bằng 1 ví dụ nhỏ (như walk-through mục 7).

4. **State thiếu.** Nhiều bài cần \`[node][trạng thái]\` (cướp/không, chọn/không, matched/chưa). Nếu chỉ lưu 1 giá trị cho mỗi node, không đủ thông tin để cha ra quyết định đúng → sai. Hỏi: "khi cha quyết định, nó cần biết con đang ở trạng thái nào?" → đó chính là chiều state cần thêm.

5. **Tính \`ans[c]\` sai thứ tự trong rerooting.** DFS 2 phải tính \`ans[c]\` **trước** khi đệ quy xuống \`c\` (pre-order, vì cần \`ans[node]\` của cha đã có). Tính sau → dùng giá trị chưa cập nhật.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao không thể dùng \`pre-order\` cho House Robber III (mục 3)?
> <details><summary>Đáp án</summary>
> Vì \`dp[node]\` cần \`dp[con]\` đã tính xong. Pre-order xử lý cha trước con → lúc tính \`dp[node]\` chưa có \`dp[con]\`. Bắt buộc post-order (con xong mới tới cha). Rerooting (mục 7) là ngoại lệ vì DFS 2 cố ý đẩy từ cha (đã có size từ DFS 1).
> </details>

> 📝 **Tóm tắt mục 11.** 5 cạm bẫy: stack overflow (cây lệch), quên parent, sai chiều rerooting, thiếu state, sai thứ tự rerooting.

---

## 12. Ứng dụng thực tế trong phần mềm

> 💡 **DP on trees = "gộp kết quả con lên cha bằng post-order".** Mọi cấu trúc phân cấp (cây thư mục, DOM, org chart, AST) đều có thể tổng hợp kiểu này.

| Ứng dụng | DP-on-tree làm gì |
|----------|-------------------|
| **\`du\`, file explorer, dung lượng thư mục** | Kích thước thư mục = tổng kích thước con (post-order) |
| **Trình duyệt: layout DOM, tính chiều cao** | Chiều cao node = hàm của chiều cao các con |
| **Org chart: mời tiệc không có sếp trực tiếp** | **Max independent set trên cây** — chọn tập tối ưu không kề |
| **Trình biên dịch: tối ưu trên AST** | Cấp phát thanh ghi, hằng số gấp (constant folding) đệ quy lên cây cú pháp |
| **Mạng/định tuyến: tổng hợp subtree** | Aggregate metric (số host, băng thông) theo cây con |

### 12.1. Ví dụ cụ thể — "mời tiệc công ty" (max independent set)

Mời nhân viên dự tiệc sao cho **không ai đi cùng sếp trực tiếp** (để vui vẻ), tối đa tổng "độ vui". Mỗi node 2 trạng thái: \`dp[u][0]\` (không mời u), \`dp[u][1]\` (mời u). Gộp từ lá lên gốc: mời u → con không được mời; không mời u → con tùy ý chọn max. Đây là max-weight independent set trên cây, $O(n)$. Cùng khung: chọn server không liền kề, đặt cảm biến phủ cây.

> ❓ **"Sao cây dễ hơn đồ thị tổng quát?"** Max independent set trên đồ thị tổng quát là **NP-hard**, nhưng trên **cây** thì DP post-order giải $O(n)$ — vì cây không có chu trình, mỗi subtree độc lập sau khi cố định trạng thái gốc nó.

### 12.2. 📝 Tóm tắt mục 12

- DP-on-tree thật trong: **dung lượng thư mục** (\`du\`), **layout DOM**, **org-chart selection** (independent set), **tối ưu AST**, **aggregate mạng**.
- Mẫu: post-order gộp con → cha; cây làm bài NP-hard (independent set) thành $O(n)$.

## Bài tập

> Mỗi bài có lời giải chi tiết ở mục sau. Hãy thử tự làm trước.

1. **House Robber III.** Cho cây có trọng số node \`val[]\`. Tìm tổng trọng số lớn nhất của tập node không kề nhau (cha–con). In ra số.
2. **Tree Diameter.** Cho cây \`n\` node. Tìm đường kính (số cạnh dài nhất giữa 2 node).
3. **Max Path Sum (any node to any node).** Cho cây, mỗi node trọng số (có thể âm). Tìm tổng lớn nhất của một đường đi giữa 2 node bất kỳ (đường đi không lặp node).
4. **Count Nodes in Subtree.** Cho cây gốc 0. Với mỗi node, in số node trong subtree của nó.
5. **Min Vertex Cover on Tree.** Cho cây. Tìm số node nhỏ nhất sao cho mọi cạnh có ít nhất 1 đầu được chọn.
6. **Sum of Distances in Tree (rerooting).** Cho cây $n$ node. Với mỗi node \`v\`, in tổng khoảng cách từ \`v\` tới mọi node khác. Yêu cầu $O(n)$.

---

## Lời giải chi tiết

### Bài 1 — House Robber III

**Cách tiếp cận.** State \`dp[node][0/1]\` = max khi không cướp / cướp node (mục 3). Post-order DFS, gộp con: không cướp → \`Σ max(con[0],con[1])\`; cướp → \`val + Σ con[0]\`. Đáp án \`max(dp[root][0], dp[root][1])\`.

**Code:** xem hàm \`houseRobberIII\` ở mục 3.

**Walk-through:** với \`val=[3,2,3,0,1]\` và cây mục 3 → đáp án \`5\` (đã verify ở mục 3).

**Độ phức tạp:** thời gian $O(n)$ (1 DFS), bộ nhớ $O(n)$ (stack đệ quy + state hằng số mỗi node).

### Bài 2 — Tree Diameter

**Cách tiếp cận.** DFS trả \`down(node)\` = nhánh sâu nhất (số cạnh) từ node xuống lá. Tại mỗi node, giữ **2** chiều cao con lớn nhất \`best1, best2\`; cập nhật \`diameter = max(diameter, best1+best2)\`. Trả về \`best1\`.

**Code:** xem \`treeDiameter\` ở mục 4.

**Walk-through:** cây \`0—1, 1—2, 1—3, 3—4, 4—5\` → diameter \`4\` (đường \`2—1—3—4—5\`).

**Độ phức tạp:** $O(n)$ thời gian, $O(n)$ bộ nhớ.

### Bài 3 — Max Path Sum (any to any)

**Cách tiếp cận.** Tương tự diameter nhưng với **trọng số node** và có thể âm. DFS trả \`gain(node)\` = tổng lớn nhất của đường đi đi **xuống** từ node (gồm node + 1 nhánh con tốt nhất, **bỏ nhánh âm**). Tại mỗi node, đường đi "vòng qua" node = \`val[node] + max(0, gain con1) + max(0, gain con2)\` (2 nhánh con tốt nhất, bỏ nhánh âm); cập nhật đáp án toàn cục.

\`\`\`go
// maxPathSum: tổng lớn nhất của đường đi giữa 2 node bất kỳ trên cây.
func (t *Tree) maxPathSum(val []int) int {
    best := val[0] // ít nhất 1 node

    var gain func(node, parent int) int
    gain = func(node, parent int) int {
        g1, g2 := 0, 0 // 2 nhánh con dương lớn nhất (bỏ nhánh âm bằng max(0,...))
        for _, c := range t.adj[node] {
            if c == parent {
                continue
            }
            g := gain(c, node)
            if g < 0 {
                g = 0 // bỏ nhánh âm
            }
            if g > g1 {
                g1, g2 = g, g1
            } else if g > g2 {
                g2 = g
            }
        }
        // đường đi vòng qua node = node + 2 nhánh dương tốt nhất
        if val[node]+g1+g2 > best {
            best = val[node] + g1 + g2
        }
        // đi lên cha chỉ được mang 1 nhánh
        return val[node] + g1
    }
    gain(0, -1)
    return best
}
\`\`\`

**Ví dụ số.** Cây \`1—2—3\` thẳng, \`val=[1,2,3]\` (0-1-2). gain(node2)=3 → best=3. node1: g1=3 (từ con2) → vòng qua = 2+3+0=5 > best → best=5; trả 2+3=5. node0: g1=max(0,5)=5 → vòng qua = 1+5+0=6 → best=6; trả 1+5=6. Đáp án **6** (đường 0–1–2 = 1+2+3). Với nhánh âm \`val=[-10, 2, 3]\`: con2→3, node1 vòng=2+3=5→best=5, trả 5; node0: gain con1=5→g1=5, vòng=-10+5=-5 (không hơn), trả max(-10+5,...) → đáp án giữ **5** (bỏ node âm).

**Độ phức tạp:** $O(n)$ thời gian, $O(n)$ bộ nhớ.

### Bài 4 — Count Nodes in Subtree

**Cách tiếp cận.** Đây chính là subtree size (mục 5): \`size[node] = 1 + Σ size[con]\`. Post-order DFS.

**Code:** xem \`subtreeSize\` ở mục 5.

**Walk-through:** cây mục 3 → \`size=[5,3,1,1,1]\`.

**Độ phức tạp:** $O(n)$ thời gian, $O(n)$ bộ nhớ.

### Bài 5 — Min Vertex Cover on Tree

**Cách tiếp cận.** State \`dp[node][0/1]\` = min cover khi node không chọn / chọn (mục 6). Node không chọn → con bắt buộc chọn (\`Σ dp[c][1]\`); node chọn → con tự do (\`1 + Σ min(dp[c][0], dp[c][1])\`). Đáp án \`min(dp[root][0], dp[root][1])\`.

**Code:** xem \`minVertexCover\` ở mục 6.

**Walk-through:** đường \`0—1—2\` → đáp án \`1\` (chọn node 1 phủ cả 2 cạnh).

**Độ phức tạp:** $O(n)$ thời gian, $O(n)$ bộ nhớ.

### Bài 6 — Sum of Distances in Tree (rerooting)

**Cách tiếp cận.** Rerooting 2 lần DFS (mục 7). DFS 1: tính \`size[]\` và \`ans[0]\` (= Σ depth). DFS 2 (pre-order): \`ans[c] = ans[node] - size[c] + (n - size[c])\`. $O(n)$.

**Code:** xem \`sumOfDistances\` ở mục 7.

**Walk-through:** đường \`0—1—2—3\` → \`ans=[6,4,4,6]\` (đã verify mục 7).

**Độ phức tạp:** $O(n)$ thời gian (2 DFS), $O(n)$ bộ nhớ. Tốt hơn hẳn cách ngây thơ $O(n^2)$ (chạy BFS/DFS từ mỗi node).

---

## Code & Minh họa

- Toàn bộ code Go đã đặt **inline** trong README này (mục 1–7 và lời giải).
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Tree DP post-order**: vẽ cây, animate DFS post-order tính \`dp[node]\` từ lá lên gốc.
  2. **House Robber III**: highlight node chọn / không chọn, hiển thị \`dp[0]\`/\`dp[1]\` mỗi node.
  3. **Tree Diameter**: animate tìm 2 nhánh sâu nhất + tô đường kính.

---

## Bài tiếp theo

- **[Lesson 29 — Bitmask DP](../lesson-29-bitmask-dp/)**: DP với state là **tập con biểu diễn bằng bitmask** (TSP, assignment problem).
- Ôn lại nền tảng cây: [DataStructures — tree](../../DataStructures/).
- Tham khảo trước: rerooting và LCA sẽ gặp lại sâu hơn ở các chuyên đề **cây/đồ thị nâng cao** (Tier 7).
`;
