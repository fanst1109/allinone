// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-39-bipartite-matching/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 39 — Ghép cặp đồ thị 2 phía (Bipartite Matching)

> Tier 5 · Lesson cuối của nhánh **đồ thị**. Đây là nơi hội tụ của nhiều thứ đã học:
> tô màu (L31), luồng cực đại (L38), và cả bitmask DP (L29). Bài này trả lời câu hỏi
> rất thực tế: *"Có N công nhân, M công việc, mỗi công nhân làm được vài việc nhất định —
> làm sao phân công để nhiều người có việc nhất?"*

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Nhận ra một đồ thị có phải **2 phía (bipartite)** hay không bằng **tô 2 màu** (2-coloring).
2. Hiểu **matching** (ghép cặp) là gì, phân biệt **maximum** với **maximal**.
3. Nắm **đường tăng (augmenting path)** và **định lý Berge** — nền tảng của mọi thuật toán matching.
4. Cài đặt **thuật toán Kuhn** (Hungarian dạng tìm augmenting path bằng DFS) — O(V·E).
5. Thấy matching chính là **một bài luồng cực đại** đặc biệt (L38), và biết khi nào nên dùng cách nào.
6. Biết **Hopcroft-Karp** nhanh hơn (O(E√V)) và **định lý König** (max matching = min vertex cover trong đồ thị 2 phía).
7. Áp dụng vào phân công việc, lát domino, minimum path cover trong DAG.

## Kiến thức tiền đề

- **[L31 — Duyệt đồ thị (BFS/DFS)](../lesson-31-graph-traversal/README.md)**: BFS, DFS, danh sách kề. 2-coloring là một biến thể BFS/DFS.
- **[L38 — Network Flow](../lesson-38-network-flow/README.md)**: max flow / min cut. Matching = max flow với capacity 1.
- **[L29 — Bitmask DP](../lesson-29-bitmask-dp/README.md)**: assignment problem nhỏ giải bằng bitmask DP O(2^N · N).
- **[L18 — Backtracking](../lesson-18-backtracking/README.md)**: tư duy "thử rồi lui" — augmenting path chính là một dạng "thử lui" có cấu trúc.

---

## 1. Đồ thị 2 phía (bipartite graph)

> 💡 **Trực giác / Hình dung.** Tưởng tượng một buổi mai mối: một bên là các chàng trai,
> một bên là các cô gái. Mỗi "cạnh" là một cặp *có thể* ghép (hai người có cảm tình).
> Không có cạnh nào nối hai chàng trai với nhau, cũng không nối hai cô gái với nhau —
> tình cảm chỉ chạy *giữa hai phía*. Đồ thị như thế gọi là **2 phía**.

**Định nghĩa.** Đồ thị \`G = (V, E)\` là **2 phía (bipartite)** nếu tập đỉnh \`V\` chia được
thành **hai tập rời nhau** \`L\` (trái) và \`R\` (phải) sao cho **mọi cạnh** đều nối một đỉnh
trong \`L\` với một đỉnh trong \`R\`. Không có cạnh nào nằm trong cùng một phía.

### 1.1 Nhận biết bằng tô 2 màu

> 💡 **Trực giác.** Tô đỉnh xuất phát màu **Xanh**. Mọi hàng xóm của nó phải **Đỏ**
> (vì cạnh phải nối 2 phía). Hàng xóm của Đỏ lại phải Xanh... Lan toả như sóng.
> Nếu lúc nào đó bạn buộc phải tô một đỉnh **hai màu khác nhau** → mâu thuẫn → KHÔNG 2 phía.

**Định lý.** Một đồ thị là 2 phía **khi và chỉ khi** nó **không chứa chu trình lẻ**
(chu trình có số cạnh lẻ). Tô 2 màu BFS/DFS chính là cách kiểm tra điều này.

#### Walk-through tô màu — đồ thị 2 phía

Đồ thị: \`0–1, 0–3, 1–2, 2–3\` (chu trình \`0-1-2-3-0\`, dài 4 = chẵn).

| Bước | Đỉnh xét | Màu gán | Hàng đợi BFS | Ghi chú |
|------|----------|---------|--------------|---------|
| 1 | 0 | Xanh (0) | [0] | xuất phát |
| 2 | 0 → 1 | Đỏ (1) | [1] | hàng xóm khác màu 0 ✓ |
| 3 | 0 → 3 | Đỏ (1) | [1, 3] | hàng xóm khác màu 0 ✓ |
| 4 | 1 → 2 | Xanh (0) | [3, 2] | khác màu 1 ✓ |
| 5 | 3 → 2 | đã là Xanh | [2] | 3 là Đỏ, 2 là Xanh → khác nhau ✓ |
| 6 | 2 → 1,3 | đều đã tô khác màu | [] | không mâu thuẫn |

→ Tô được. \`L = {0, 2}\` (Xanh), \`R = {1, 3}\` (Đỏ). **Là 2 phía.**

#### Walk-through tô màu — đồ thị KHÔNG 2 phía

Đồ thị tam giác: \`0–1, 1–2, 2–0\` (chu trình lẻ, dài 3).

| Bước | Đỉnh xét | Màu gán | Ghi chú |
|------|----------|---------|---------|
| 1 | 0 | Xanh (0) | xuất phát |
| 2 | 0 → 1 | Đỏ (1) | ✓ |
| 3 | 1 → 2 | Xanh (0) | ✓ |
| 4 | 2 → 0 | 0 đã Xanh, nhưng 2 cũng Xanh | **MÂU THUẪN** — cạnh nối 2 đỉnh cùng màu |

→ Có chu trình lẻ. **KHÔNG 2 phía.**

### 1.2 Code Go — kiểm tra bipartite bằng 2-coloring

\`\`\`go
package main

import "fmt"

// isBipartite kiểm tra đồ thị n đỉnh (danh sách kề adj) có 2 phía không.
// Trả về (ok, color): ok=true nếu 2 phía, color[v] ∈ {0,1} là phía của v.
// color[v] = -1 nghĩa là chưa tô.
func isBipartite(n int, adj [][]int) (bool, []int) {
	color := make([]int, n)
	for i := range color {
		color[i] = -1 // chưa tô
	}

	// Đồ thị có thể không liên thông → duyệt từng thành phần.
	for s := 0; s < n; s++ {
		if color[s] != -1 {
			continue
		}
		color[s] = 0
		queue := []int{s} // BFS
		for len(queue) > 0 {
			u := queue[0]
			queue = queue[1:]
			for _, v := range adj[u] {
				if color[v] == -1 {
					color[v] = color[u] ^ 1 // màu ngược lại: 0->1, 1->0
					queue = append(queue, v)
				} else if color[v] == color[u] {
					// hàng xóm cùng màu → có cạnh trong cùng phía → chu trình lẻ
					return false, nil
				}
			}
		}
	}
	return true, color
}

func main() {
	// Đồ thị 2 phía: 0-1, 0-3, 1-2, 2-3
	adj := [][]int{
		{1, 3}, // 0
		{0, 2}, // 1
		{1, 3}, // 2
		{0, 2}, // 3
	}
	ok, color := isBipartite(4, adj)
	fmt.Println("Bipartite?", ok, "color =", color)
	// Output: Bipartite? true color = [0 1 0 1]
	// → L = {0,2} (màu 0), R = {1,3} (màu 1)

	// Đồ thị tam giác (chu trình lẻ): 0-1, 1-2, 2-0
	tri := [][]int{{1, 2}, {0, 2}, {0, 1}}
	ok2, _ := isBipartite(3, tri)
	fmt.Println("Tam giác bipartite?", ok2) // false
}
\`\`\`

**Độ phức tạp:** O(V + E) — mỗi đỉnh, mỗi cạnh duyệt 1 lần như BFS thường.

> ⚠ **Lỗi thường gặp.** Quên duyệt **mọi thành phần liên thông**. Nếu chỉ BFS từ đỉnh 0,
> các đỉnh ở thành phần khác không được tô → kết luận sai. Vòng \`for s := 0; s < n; s++\`
> với điều kiện \`color[s] == -1\` mới bao phủ hết.

> ❓ **Câu hỏi tự nhiên.**
> - *"Đồ thị không liên thông thì sao?"* → Mỗi thành phần tô độc lập; phép gán phía là tương đối trong mỗi thành phần.
> - *"DFS có dùng được không?"* → Có, hoàn toàn tương đương; chỉ thay queue bằng đệ quy/stack.
> - *"Cây có phải 2 phía không?"* → Luôn luôn — cây không có chu trình nào, nên không có chu trình lẻ.

> 🔁 **Dừng lại tự kiểm tra.** Đồ thị \`0–1, 1–2, 2–3, 3–4, 4–0\` (ngũ giác) có 2 phía không?
> <details><summary>Đáp án</summary>
> KHÔNG. Đây là chu trình dài 5 (lẻ). Tô màu: 0=X, 1=Đ, 2=X, 3=Đ, 4=X, rồi 4–0 nối X–X → mâu thuẫn.
> </details>

> 📝 **Tóm tắt mục 1.**
> - Bipartite = đỉnh chia 2 phía, cạnh chỉ nối giữa 2 phía.
> - Nhận biết bằng tô 2 màu BFS/DFS, O(V+E).
> - Tương đương: bipartite ⟺ không có chu trình lẻ.
> - Nhớ duyệt mọi thành phần liên thông.

---

## 2. Matching (ghép cặp)

> 💡 **Trực giác.** Quay lại buổi mai mối: một **matching** là một danh sách các cặp được
> "chốt", với điều kiện **mỗi người chỉ thuộc tối đa một cặp**. Bạn không thể ghép một chàng
> trai với hai cô gái cùng lúc. Mục tiêu: chốt được **nhiều cặp nhất**.

**Định nghĩa.** Một **matching** \`M ⊆ E\` là tập các cạnh sao cho **không có hai cạnh nào
chung đỉnh**. Một đỉnh nằm trong cạnh của \`M\` gọi là **đã ghép (matched)**; ngược lại là
**chưa ghép / tự do (free / unmatched)**.

- **Maximum matching** = matching có **số cạnh nhiều nhất** (mục tiêu chính của bài).
- **Maximal matching** = matching mà **không thể thêm cạnh nào nữa** (mọi cạnh ngoài M đều chạm đỉnh đã ghép).

> ⚠ **Phân biệt MAXIMUM vs MAXIMAL — bẫy kinh điển.**
> - *Maximal* nghĩa "không nhồi thêm được" — đó là cực đại **cục bộ** (tham lam dừng lại).
> - *Maximum* nghĩa "nhiều nhất có thể" — cực đại **toàn cục**.
> - Một matching maximal **chưa chắc** maximum!

**Ví dụ số minh hoạ sự khác nhau.** Đồ thị đường thẳng 4 đỉnh:
\`a–x, x–b, b–y\` (L = {a, b}, R = {x, y}), cạnh: \`a-x\`, \`b-x\`, \`b-y\`.

- Matching **maximal nhưng KHÔNG maximum**: \`{a-x}\`. Sau khi chốt \`a-x\`, đỉnh \`x\` bận, cạnh \`b-x\` không dùng được; nhưng \`b\` còn cạnh \`b-y\` chưa chốt → thật ra \`{a-x}\` chưa maximal. Sửa ví dụ:
- Đồ thị: \`a-x\`, \`b-x\` (chỉ 2 cạnh, đều chạm \`x\`). Maximal = maximum = 1 (chỉ ghép được 1 cặp vì \`x\` chung).
- Đồ thị: \`a-x\`, \`b-y\`, \`a-y\` (3 cạnh). Nếu tham lam chọn \`a-y\` trước → còn \`b\` tự do, \`x\` tự do nhưng không có cạnh \`b-x\` → matching \`{a-y}\` là **maximal** (size 1). Nhưng **maximum** = \`{a-x, b-y}\` (size 2)! Chọn sai cạnh đầu → kẹt.

> Đây chính là lý do **tham lam không đủ** — cần augmenting path để "sửa" lựa chọn sai.

### Bốn ví dụ số về matching

1. Đồ thị \`a-x, b-y, c-z\` (3 cạnh rời): maximum = 3 (ghép hết).
2. Đồ thị \`a-x, a-y, b-x\` (cùng chạm x hoặc a nhiều): maximum = 2 (\`a-y, b-x\`).
3. Đồ thị \`a-x, b-x, c-x\` (3 đỉnh trái cùng chỉ tới x): maximum = 1 (x chỉ ghép 1).
4. Đồ thị rỗng (không cạnh): maximum = 0.

> 📝 **Tóm tắt mục 2.**
> - Matching = tập cạnh không chung đỉnh.
> - Maximum = nhiều cạnh nhất (toàn cục); Maximal = không thêm được (cục bộ).
> - Tham lam cho ra maximal, KHÔNG đảm bảo maximum.

---

## 3. Đường tăng (augmenting path) — định lý Berge

> 💡 **Trực giác.** Bạn đang có vài cặp đã chốt. Một **đường tăng** là một "chuỗi sửa lại"
> bắt đầu từ một chàng trai *đang ế*, đi theo cạnh **chưa ghép** sang một cô gái, nếu cô ấy
> *đang ế* thì xong (ghép thêm 1 cặp!); nếu cô ấy *đã ghép* với chàng khác, ta "đẩy" chàng
> kia ra rồi tiếp tục tìm cho chàng kia một cô khác. Cứ xen kẽ chưa-ghép / đã-ghép.
> Nếu chuỗi kết thúc ở một cô **đang ế** → ta vừa tăng matching lên 1.

**Định nghĩa.** Cho matching \`M\`. Một **đường xen kẽ (alternating path)** là đường mà các
cạnh **luân phiên** giữa "không thuộc M" và "thuộc M". Một **đường tăng (augmenting path)**
là đường xen kẽ **bắt đầu và kết thúc ở hai đỉnh tự do (chưa ghép)**.

Do hai đầu đều tự do và cạnh xen kẽ, đường tăng luôn có **số cạnh lẻ**, với số cạnh
"không thuộc M" **nhiều hơn** số cạnh "thuộc M" đúng 1.

### 3.1 Phép "lật" (flip / augment)

Trên đường tăng, **đảo vai trò** mọi cạnh: cạnh đang ngoài M → cho vào M, cạnh đang trong
M → bỏ ra. Kết quả: matching mới **nhiều hơn cũ đúng 1 cạnh**, vẫn hợp lệ.

#### Walk-through flip cụ thể

Đồ thị: L = {a, b}, R = {x, y}. Cạnh: \`a-x\`, \`a-y\`, \`b-x\`.
Giả sử đang có \`M = {a-x}\` (size 1). Tìm đường tăng cho \`b\` (đang tự do):

\`\`\`
b --(chưa ghép)--> x --(đã ghép a-x)--> a --(chưa ghép)--> y
\`\`\`

- \`b\` tự do, đi cạnh \`b-x\` (ngoài M) tới \`x\`.
- \`x\` đã ghép với \`a\`, đi cạnh \`a-x\` (trong M) ngược về \`a\`.
- \`a\` đi cạnh \`a-y\` (ngoài M) tới \`y\`.
- \`y\` **tự do** → đây là đường tăng! Đường: \`b - x - a - y\`.

**Flip:** \`b-x\` vào M, \`a-x\` ra khỏi M, \`a-y\` vào M.
→ \`M' = {b-x, a-y}\` (size 2). Cả \`a\`, \`b\`, \`x\`, \`y\` đều ghép. **Maximum!**

| Trước flip | Sau flip |
|------------|----------|
| \`M = {a-x}\` | \`M' = {b-x, a-y}\` |
| \`b\`, \`y\` tự do | không ai tự do |
| size 1 | size 2 ✓ |

### 3.2 Định lý Berge

> **Định lý Berge (1957).** Matching \`M\` là **maximum khi và chỉ khi** **không tồn tại
> đường tăng** nào đối với \`M\`.

Ý nghĩa thuật toán: **cứ tìm đường tăng và flip cho tới khi không còn đường nào** → matching
hiện tại là maximum. Đây là khung sườn của Kuhn, Hopcroft-Karp, và cả Hungarian có trọng số.

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao flip giữ matching hợp lệ?"* → Vì đường xen kẽ đi qua mỗi đỉnh trung gian đúng bằng 1 cạnh-vào + 1 cạnh-ra, sau khi đảo vẫn đúng 1 cạnh chạm mỗi đỉnh.
> - *"Tăng 1 mỗi lần thì có chậm không?"* → Maximum matching ≤ V/2, nên tối đa V/2 lần tăng. Mỗi lần tìm đường tốn O(E) → O(V·E) tổng (Kuhn).
> - *"Nếu tìm sai đường, kẹt thì sao?"* → Berge bảo đảm: còn đường tăng ⟺ chưa maximum. Nên cứ tìm thấy đường nào thì flip; không bao giờ "kẹt sai".

> 🔁 **Dừng lại tự kiểm tra.** \`M = {a-y}\` trong đồ thị \`a-x, a-y, b-x\`. Có đường tăng không?
> <details><summary>Đáp án</summary>
> Có. \`b\` tự do → cạnh \`b-x\` (ngoài M) → \`x\` tự do → kết thúc. Đường tăng \`b - x\` (1 cạnh).
> Flip: thêm \`b-x\`. \`M' = {a-y, b-x}\` size 2.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Đường tăng = đường xen kẽ, hai đầu là đỉnh tự do.
> - Flip dọc đường tăng → matching +1, vẫn hợp lệ.
> - Berge: maximum ⟺ hết đường tăng. Đây là chìa khoá mọi thuật toán matching.

---

## 4. Thuật toán Kuhn (Hungarian dạng augmenting-path)

> 💡 **Trực giác.** Lần lượt **cho từng chàng trai bên trái** đi tìm bạn. Với mỗi chàng \`u\`,
> chạy một DFS: thử từng cô gái \`v\` mà \`u\` thích. Nếu \`v\` còn ế → chốt luôn. Nếu \`v\` đã ghép
> với \`w\` → hỏi \`w\` "cậu có thể nhường cô này, đi tìm cô khác được không?" (đệ quy cho \`w\`).
> Nếu \`w\` tìm được cô khác → \`u\` chiếm \`v\`. Đây chính là tìm đường tăng bằng DFS.

### 4.1 Code Go — thuật toán Kuhn

\`\`\`go
package main

import "fmt"

// Kuhn: maximum bipartite matching.
// nL = số đỉnh trái, nR = số đỉnh phải.
// adj[u] = danh sách đỉnh phải mà đỉnh trái u nối tới (0-index trong phía R).
type Kuhn struct {
	nL, nR  int
	adj     [][]int
	matchR  []int  // matchR[v] = đỉnh trái đang ghép với phải v, hoặc -1
	used    []bool // đánh dấu đỉnh phải đã thử trong LƯỢT DFS hiện tại
}

func NewKuhn(nL, nR int, adj [][]int) *Kuhn {
	matchR := make([]int, nR)
	for i := range matchR {
		matchR[i] = -1
	}
	return &Kuhn{nL: nL, nR: nR, adj: adj, matchR: matchR}
}

// tryKuhn tìm đường tăng xuất phát từ đỉnh trái u. Trả về true nếu ghép được.
func (k *Kuhn) tryKuhn(u int) bool {
	for _, v := range k.adj[u] {
		if k.used[v] {
			continue // đã thử v trong lượt này, tránh lặp vô hạn
		}
		k.used[v] = true
		// v còn tự do, HOẶC chủ cũ matchR[v] tìm được người khác → u chiếm v
		if k.matchR[v] == -1 || k.tryKuhn(k.matchR[v]) {
			k.matchR[v] = u
			return true
		}
	}
	return false
}

// MaxMatching trả về số cặp ghép được (kích thước maximum matching).
func (k *Kuhn) MaxMatching() int {
	result := 0
	for u := 0; u < k.nL; u++ {
		k.used = make([]bool, k.nR) // RESET visited cho MỖI đỉnh trái — bắt buộc!
		if k.tryKuhn(u) {
			result++
		}
	}
	return result
}

func main() {
	// L = {0,1,2}, R = {0,1,2}
	// 0->{0,1}, 1->{0}, 2->{1,2}
	adj := [][]int{
		{0, 1}, // L0
		{0},    // L1
		{1, 2}, // L2
	}
	k := NewKuhn(3, 3, adj)
	fmt.Println("Max matching =", k.MaxMatching()) // 3
	for v := 0; v < 3; v++ {
		fmt.Printf("R%d  <-  L%d\\n", v, k.matchR[v])
	}
	// R0 <- L1, R1 <- L0, R2 <- L2  (một trong các đáp án tối đa)
}
\`\`\`

> ⚠ **Lỗi cực phổ biến.** Quên **reset \`used\` (visited) cho MỖI đỉnh trái** ở đầu mỗi lần
> gọi \`tryKuhn\`. \`used\` chỉ chống lặp **trong một lượt DFS**; sang đỉnh trái mới phải làm
> mới. Nếu reset sai (chỉ 1 lần ở ngoài) → bỏ sót đường tăng → kết quả nhỏ hơn thực tế.

### 4.2 Walk-through đầy đủ thuật toán Kuhn

Đồ thị: \`adj = {L0:{R0,R1}, L1:{R0}, L2:{R1,R2}}\`. Ban đầu \`matchR = [-1,-1,-1]\`.

**Xử lý L0:** reset \`used=[F,F,F]\`.
- Thử R0: \`used[0]=T\`. \`matchR[0]=-1\` (tự do) → chốt \`matchR[0]=L0\`. ✓ Ghép +1.
- Trạng thái: \`matchR = [L0, -1, -1]\`. Cặp: \`{L0-R0}\`.

**Xử lý L1:** reset \`used=[F,F,F]\`.
- Thử R0: \`used[0]=T\`. \`matchR[0]=L0\` (đã ghép) → đệ quy \`tryKuhn(L0)\`.
  - L0 thử R0: \`used[0]\` đã T → bỏ qua.
  - L0 thử R1: \`used[1]=T\`. \`matchR[1]=-1\` → chốt \`matchR[1]=L0\`. ✓
  - L0 nhường R0 thành công → quay lại L1.
- L1 chiếm R0: \`matchR[0]=L1\`. ✓ Ghép +1.
- Trạng thái: \`matchR = [L1, L0, -1]\`. Cặp: \`{L1-R0, L0-R1}\`.

**Xử lý L2:** reset \`used=[F,F,F]\`.
- Thử R1: \`used[1]=T\`. \`matchR[1]=L0\` (đã ghép) → đệ quy \`tryKuhn(L0)\`.
  - L0 thử R0: \`used[0]=T\`. \`matchR[0]=L1\` → đệ quy \`tryKuhn(L1)\`.
    - L1 thử R0: \`used[0]\` đã T → bỏ. L1 hết cạnh → return **false**.
  - L0 thử R1: \`used[1]\` đã T → bỏ. L0 hết cạnh → return **false**.
  - → L0 không nhường được.
- Thử R2: \`used[2]=T\`. \`matchR[2]=-1\` → chốt \`matchR[2]=L2\`. ✓ Ghép +1.
- Trạng thái: \`matchR = [L1, L0, L2]\`. Cặp: \`{L1-R0, L0-R1, L2-R2}\`.

**Kết quả: maximum matching = 3.** Mọi đỉnh đều ghép.

> Chú ý ở bước L2: DFS đã thử "ép L0 nhường R1" — chuỗi \`L2→R1→L0→R0→L1\` thất bại, nên L2
> chuyển sang R2. Đây chính là **tìm đường tăng**: nếu chuỗi đẩy thành công thì flip; nếu
> thất bại thì thử cạnh khác.

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao DFS từng đỉnh trái lại ra maximum?"* → Mỗi lần \`tryKuhn(u)\` thành công = tìm thấy 1 đường tăng cho \`u\`. Theo Berge, khi xử lý hết mọi đỉnh trái mà không còn đường tăng → maximum.
> - *"Thứ tự xử lý đỉnh trái có ảnh hưởng kết quả không?"* → Ảnh hưởng *cặp cụ thể* nhưng KHÔNG ảnh hưởng *kích thước* — kích thước maximum là duy nhất.
> - *"matchR lưu phía phải, vậy lấy cặp của phía trái thế nào?"* → Duyệt \`matchR[v]\` cho mọi v; nếu \`≠ -1\` thì có cặp \`(matchR[v], v)\`.

> 📝 **Tóm tắt mục 4.**
> - Kuhn = với mỗi đỉnh trái, DFS tìm đường tăng, flip nếu thấy.
> - \`matchR[v]\` lưu chủ hiện tại của đỉnh phải v.
> - RESET \`used\` mỗi đỉnh trái. Độ phức tạp O(V·E).

---

## 5. Matching qua max flow (liên hệ L38)

> 💡 **Trực giác.** Matching chính là một bài **luồng** trá hình. Dựng một mạng: một **nguồn
> S** bơm "1 đơn vị" vào mỗi đỉnh trái; mỗi cạnh gốc cho qua "1 đơn vị"; mỗi đỉnh phải đẩy
> "1 đơn vị" về **đích T**. Vì capacity = 1 ở khắp nơi, một luồng = một cách ghép cặp,
> và **luồng cực đại = matching cực đại**.

**Cách dựng mạng (xem [L38](../lesson-38-network-flow/README.md)):**

1. Thêm **source** \`S\` và **sink** \`T\`.
2. Cạnh \`S → u\` cho mỗi đỉnh trái \`u\`, **capacity 1**.
3. Cạnh \`u → v\` cho mỗi cạnh gốc \`(u,v)\` (u trái, v phải), **capacity 1** (hoặc ∞ — không khác kết quả).
4. Cạnh \`v → T\` cho mỗi đỉnh phải \`v\`, **capacity 1**.

**Max flow trên mạng này = max bipartite matching.** Cạnh \`u→v\` có luồng 1 ⟺ cặp \`(u,v)\` được ghép. Capacity 1 ở \`S→u\` và \`v→T\` ép mỗi đỉnh dùng tối đa 1 lần (đúng định nghĩa matching).

### 5.1 Code Go — matching qua max flow (Edmonds-Karp tối giản)

\`\`\`go
package main

import "fmt"

// matchingViaFlow: dựng mạng từ đồ thị 2 phía rồi chạy BFS-augment (Edmonds-Karp).
// nL đỉnh trái (index 0..nL-1), nR đỉnh phải (index 0..nR-1).
// Mạng đánh số: S = 0, đỉnh trái i -> 1+i, đỉnh phải j -> 1+nL+j, T = 1+nL+nR.
func matchingViaFlow(nL, nR int, edges [][2]int) int {
	N := 1 + nL + nR + 1
	S, T := 0, N-1
	cap := make([][]int, N)
	for i := range cap {
		cap[i] = make([]int, N)
	}
	L := func(i int) int { return 1 + i }
	R := func(j int) int { return 1 + nL + j }

	for i := 0; i < nL; i++ {
		cap[S][L(i)] = 1 // S -> trái, cap 1
	}
	for j := 0; j < nR; j++ {
		cap[R(j)][T] = 1 // phải -> T, cap 1
	}
	for _, e := range edges {
		cap[L(e[0])][R(e[1])] = 1 // cạnh gốc, cap 1
	}

	flow := 0
	for {
		// BFS tìm đường tăng S->T trong đồ thị thặng dư.
		parent := make([]int, N)
		for i := range parent {
			parent[i] = -1
		}
		parent[S] = S
		queue := []int{S}
		for len(queue) > 0 && parent[T] == -1 {
			u := queue[0]
			queue = queue[1:]
			for v := 0; v < N; v++ {
				if parent[v] == -1 && cap[u][v] > 0 {
					parent[v] = u
					queue = append(queue, v)
				}
			}
		}
		if parent[T] == -1 {
			break // không còn đường tăng
		}
		// Đẩy 1 đơn vị dọc đường (mọi cap đều 1 nên bottleneck = 1).
		for v := T; v != S; v = parent[v] {
			u := parent[v]
			cap[u][v]--
			cap[v][u]++ // cạnh ngược (residual) — cho phép "huỷ" lựa chọn cũ
		}
		flow++
	}
	return flow
}

func main() {
	// Cùng đồ thị mục 4: L0->{0,1}, L1->{0}, L2->{1,2}
	edges := [][2]int{{0, 0}, {0, 1}, {1, 0}, {2, 1}, {2, 2}}
	fmt.Println("Max matching (via flow) =", matchingViaFlow(3, 3, edges)) // 3
}
\`\`\`

> ❓ **Khi nào dùng flow thay vì Kuhn?**
> - Khi bài toán **đã là flow** hoặc có ràng buộc dung lượng > 1 (vd mỗi máy làm được 3 việc) → flow tổng quát hơn, Kuhn không xử lý được.
> - Khi chỉ cần matching đơn thuần → Kuhn gọn và nhanh hơn về hằng số.
> - Cạnh ngược (residual) trong flow chính là cơ chế "đẩy người cũ ra" giống \`tryKuhn\` đệ quy.

> 📝 **Tóm tắt mục 5.**
> - Matching = max flow với S→trái, phải→T, mọi cap = 1.
> - Cạnh \`u→v\` có luồng ⟺ cặp được ghép.
> - Flow tổng quát hơn (cap > 1); Kuhn gọn hơn cho matching thuần.

---

## 6. Hopcroft-Karp — O(E√V) (nhắc qua)

> 💡 **Trực giác.** Kuhn tìm **một** đường tăng mỗi lần. Hopcroft-Karp khôn hơn: mỗi "pha" nó
> dùng **BFS phân tầng** để tìm **nhiều đường tăng ngắn nhất cùng độ dài** một lúc, rồi flip
> hết. Giống Dinic cho flow. Số pha bị chặn O(√V), mỗi pha O(E) → **O(E√V)**.

**Khi nào cần?** Đồ thị **lớn** (V, E hàng chục–trăm nghìn). Với V = 10⁵, E = 10⁶:
- Kuhn O(V·E) ≈ 10¹¹ → quá chậm.
- Hopcroft-Karp O(E√V) ≈ 10⁶ · 316 ≈ 3·10⁸ → chạy được.

Sơ đồ một pha:
1. **BFS** từ tất cả đỉnh trái tự do, phân tầng theo đường xen kẽ, tìm khoảng cách tới đỉnh phải tự do gần nhất.
2. **DFS** tìm tập **các đường tăng rời nhau (vertex-disjoint)** đúng độ dài tối thiểu đó, flip hết.
3. Lặp pha tới khi BFS không tới được đỉnh phải tự do nào.

> Bài này chỉ giới thiệu; cài đặt đầy đủ Hopcroft-Karp để dành cho phần luyện nâng cao.
> Với hầu hết bài thi/phỏng vấn cỡ V ≤ vài nghìn, **Kuhn đã đủ**.

> 📝 **Tóm tắt mục 6.** Hopcroft-Karp = nhiều augmenting path mỗi pha (BFS phân tầng + DFS), O(E√V), dùng cho đồ thị lớn.

---

## 7. Định lý König & các hệ quả

> 💡 **Trực giác.** "Phủ đỉnh (vertex cover)" = chọn ít đỉnh nhất sao cho **mọi cạnh chạm
> ít nhất 1 đỉnh được chọn" — như đặt **bảo vệ** ở các giao lộ sao cho mọi con đường đều có
> bảo vệ. König phát hiện điều đẹp đẽ: trong đồ thị 2 phía, **số cặp ghép tối đa = số bảo vệ
> tối thiểu**.

> **Định lý König.** Trong đồ thị **2 phía**: **kích thước maximum matching = kích thước
> minimum vertex cover**.

Hai hệ quả quan trọng:

1. **Min vertex cover = max matching** (chính định lý).
2. **Max independent set = V − max matching** (vì: tập độc lập lớn nhất là phần bù của vertex cover nhỏ nhất; max independent set + min vertex cover = V trong mọi đồ thị).

### 7.1 Dựng min vertex cover từ matching (cấu trúc König)

Sau khi có maximum matching \`M\`, dựng vertex cover tối thiểu như sau:

1. Gọi \`U\` = tập đỉnh **trái tự do** (chưa ghép).
2. Từ \`U\`, chạy DFS/BFS theo **đường xen kẽ** (trái→phải qua cạnh ngoài M, phải→trái qua cạnh trong M). Đánh dấu mọi đỉnh **tới được (reachable)** trên đường xen kẽ này, tập \`Z\`.
3. **Min vertex cover** = (đỉnh trái **không** thuộc Z) ∪ (đỉnh phải **thuộc** Z).

#### Walk-through König

Đồ thị mục 4 sau khi ghép: \`M = {L0-R1, L1-R0, L2-R2}\` (matching = 3, không đỉnh trái tự do).

- \`U\` = ∅ (mọi đỉnh trái đã ghép) → \`Z\` = ∅ (không đỉnh nào tới được từ tập rỗng).
- Min vertex cover = (trái không thuộc Z = {L0,L1,L2}) ∪ (phải thuộc Z = ∅) = **{L0, L1, L2}**, kích thước **3 = max matching** ✓.

Một ví dụ có đỉnh tự do: \`a-x, a-y, b-x\`, \`M = {a-y, b-x}\` (size 2, mọi đỉnh ghép → tương tự cover = 2).
Đổi sang \`a-x, b-x\` (chỉ 2 cạnh chạm x): max matching = 1.
- \`U\` = {b} nếu \`M = {a-x}\` (b tự do). DFS từ b: \`b → x\` (cạnh ngoài M), \`x\` đã ghép \`a-x\` (trong M) → \`a\`. Z = {b, x, a}.
- Cover = (trái không thuộc Z = ∅... thực ra a,b đều thuộc Z) → trái-ngoài-Z = ∅; phải-trong-Z = {x}. Cover = **{x}**, size **1 = max matching** ✓. Đúng — đặt 1 "bảo vệ" ở x phủ cả 2 cạnh.

### 7.2 Code Go — min vertex cover từ matching

\`\`\`go
package main

import "fmt"

// MinVertexCover dùng cấu trúc König: cần matchR (từ Kuhn) và adj.
// matchL[u] = đỉnh phải ghép với trái u (suy ngược từ matchR).
func MinVertexCover(nL, nR int, adj [][]int, matchR []int) ([]int, []int) {
	matchL := make([]int, nL)
	for i := range matchL {
		matchL[i] = -1
	}
	for v := 0; v < nR; v++ {
		if matchR[v] != -1 {
			matchL[matchR[v]] = v
		}
	}

	visL := make([]bool, nL)
	visR := make([]bool, nR)

	// DFS theo đường xen kẽ từ đỉnh trái tự do.
	var dfs func(u int)
	dfs = func(u int) {
		visL[u] = true
		for _, v := range adj[u] {
			if !visR[v] {
				visR[v] = true
				if matchR[v] != -1 && !visL[matchR[v]] {
					dfs(matchR[v]) // đi tiếp qua cạnh trong M
				}
			}
		}
	}
	for u := 0; u < nL; u++ {
		if matchL[u] == -1 { // trái tự do
			dfs(u)
		}
	}

	// Cover = (trái KHÔNG thăm) ∪ (phải ĐÃ thăm).
	var coverL, coverR []int
	for u := 0; u < nL; u++ {
		if !visL[u] {
			coverL = append(coverL, u)
		}
	}
	for v := 0; v < nR; v++ {
		if visR[v] {
			coverR = append(coverR, v)
		}
	}
	return coverL, coverR
}

func main() {
	// a-x, b-x : nL=2, nR=1. adj[0]={0}, adj[1]={0}.
	adj := [][]int{{0}, {0}}
	matchR := []int{0} // giả sử R0 ghép với L0 (a-x)
	cL, cR := MinVertexCover(2, 1, adj, matchR)
	fmt.Println("Cover trái:", cL, " Cover phải:", cR)
	// Cover trái: []  Cover phải: [0]  → {x}, size 1 = max matching ✓
}
\`\`\`

> ❓ **Ứng dụng König.**
> - Bài "chọn ít hàng/cột nhất phủ mọi quân cờ trên bàn" → min vertex cover trên đồ thị hàng×cột.
> - Bài "chọn nhiều phần tử nhất không xung đột" → max independent set = V − max matching.

> 🔁 **Dừng lại tự kiểm tra.** Đồ thị 2 phía có 6 đỉnh, max matching = 2. Max independent set = ?
> <details><summary>Đáp án</summary>
> Max independent set = V − max matching = 6 − 2 = **4**. (Và min vertex cover = 2.)
> </details>

> 📝 **Tóm tắt mục 7.**
> - König: max matching = min vertex cover (chỉ đúng cho đồ thị 2 phía!).
> - Max independent set = V − max matching.
> - Dựng cover: DFS đường xen kẽ từ đỉnh trái tự do; cover = (trái ngoài Z) ∪ (phải trong Z).

---

## 8. Ứng dụng thực tế

### 8.1 Phân công việc (job assignment)
N công nhân, M công việc, công nhân \`i\` làm được vài việc. Ghép sao cho nhiều người có việc
nhất → **max bipartite matching** với L = công nhân, R = công việc.

### 8.2 Stable marriage — bài KHÁC (nhắc qua)
"Ghép đôi ổn định" (stable matching) đòi mỗi người có **danh sách ưu tiên** và không tồn tại
cặp "muốn bỏ nhau để theo nhau". Đó là **thuật toán Gale-Shapley**, O(n²), KHÁC bài này
(matching ở đây chỉ tối đa hoá số cặp, không xét ưu tiên/độ ổn định).

### 8.3 Task scheduling & resource allocation
Gán task vào khe thời gian / máy: task \`t\` chạy được trên máy/khe nào → cạnh. Max matching =
số task xếp được nhiều nhất không đụng độ.

### 8.4 Minimum path cover trong DAG
Phủ toàn bộ DAG bằng **ít đường đi (path) đỉnh-rời nhất**. Dựng đồ thị 2 phía: mỗi đỉnh \`v\`
của DAG tách thành \`v_out\` (trái) và \`v_in\` (phải); cạnh \`u→v\` của DAG thành cạnh \`u_out – v_in\`.
Khi đó **min path cover = số đỉnh − max matching**.

#### Ví dụ số path cover
DAG: \`1→2, 2→3, 1→4\` (4 đỉnh). Đồ thị 2 phía: \`1out-2in, 2out-3in, 1out-4in\`.
Max matching = 2 (vd \`1out-2in, 2out-3in\`). Min path cover = 4 − 2 = **2** đường:
\`1→2→3\` và \`4\` (hoặc \`1→4\` và \`2→3\`). Đúng — không phủ nổi bằng 1 đường vì DAG rẽ nhánh ở 1.

### 8.5 Lát domino / tô bàn cờ
Lát bàn cờ (đã khoét vài ô) bằng quân **domino 1×2** = matching trên đồ thị **lưới**, trong đó
mỗi ô là một đỉnh, ô kề nhau nối cạnh. Tô bàn cờ kiểu caro: ô đen ↔ tập trái, ô trắng ↔ tập
phải (vì domino luôn phủ 1 đen + 1 trắng) → **bài này LÀ bipartite matching**. Số domino tối
đa = max matching; lát kín hết ⟺ matching = (số ô)/2.

> 📝 **Tóm tắt mục 8.** Matching xuất hiện khắp nơi: phân công việc, scheduling, min path
> cover DAG (V − matching), lát domino (đen-trắng). Stable marriage là bài khác (Gale-Shapley).

---

## 9. Weighted bipartite matching — Hungarian (assignment problem)

> 💡 **Trực giác.** Giờ mỗi cặp \`(i, j)\` có **chi phí** \`c[i][j]\` (vd lương trả công nhân i
> làm việc j). Bài **assignment**: ghép mỗi công nhân với đúng 1 việc sao cho **tổng chi phí
> nhỏ nhất** (hoặc lợi ích lớn nhất). Đây KHÔNG còn là "đếm cặp" mà là "tối ưu trọng số".

**Thuật toán Hungarian (Kuhn-Munkres)** giải assignment problem trong **O(n³)** (n = kích thước
ma trận vuông). Ý tưởng: dùng nhãn (potential) trên hai phía, tìm đường tăng trong "đồ thị
bằng nhau (equality graph)", điều chỉnh nhãn để mở thêm cạnh — vẫn dựa trên augmenting path
nhưng có thêm trọng số.

**Liên hệ [Bitmask DP L29](../lesson-29-bitmask-dp/README.md).** Với \`n\` nhỏ (≤ 20), assignment
problem giải gọn bằng bitmask DP: \`dp[mask]\` = chi phí nhỏ nhất gán xong các công nhân ứng với
số bit-set của mask, dùng các việc trong \`mask\`.

\`\`\`
dp[0] = 0
i = popcount(mask)            // công nhân thứ i đang xét
dp[mask | (1<<j)] = min(dp[mask | (1<<j)], dp[mask] + c[i][j])  với j chưa dùng trong mask
\`\`\`
Độ phức tạp O(2ⁿ · n). Với n = 20 ≈ 2·10⁷ phép → ổn. Với n lớn dùng Hungarian O(n³).

> Bài này chỉ giới thiệu; cài đặt đầy đủ Hungarian/Kuhn-Munkres để phần nâng cao.

> 📝 **Tóm tắt mục 9.** Có trọng số → assignment problem. n nhỏ: bitmask DP O(2ⁿ·n). n lớn: Hungarian O(n³).

---

## 10. Độ phức tạp — bảng tổng hợp

| Thuật toán | Bài toán | Thời gian | Khi nào dùng |
|------------|----------|-----------|--------------|
| 2-coloring BFS/DFS | Kiểm tra bipartite | O(V + E) | Luôn chạy trước |
| **Kuhn** (augmenting DFS) | Max matching | **O(V·E)** | V ≤ vài nghìn |
| Matching via max flow | Max matching | O(V·E) (Edmonds-Karp) | Khi đã là flow / cap > 1 |
| **Hopcroft-Karp** | Max matching | **O(E√V)** | Đồ thị lớn |
| König (DFS xen kẽ) | Min vertex cover | O(V + E) sau matching | Sau khi có matching |
| Bitmask DP | Assignment (trọng số) | O(2ⁿ·n) | n ≤ 20 |
| Hungarian | Assignment (trọng số) | O(n³) | n lớn |

> ⚠ Kuhn O(V·E): với đồ thị dày (E ≈ V²) là O(V³). Vẫn ổn cho V ≤ vài trăm–nghìn; lớn hơn dùng Hopcroft-Karp.

---

## 11. Cạm bẫy

| Cạm bẫy | Hậu quả | Cách tránh |
|---------|---------|-----------|
| Đồ thị **không 2 phía** | Kuhn/König **không áp dụng** | Bài general matching cần **Blossom algorithm** (Edmonds, O(V³)) — KHÔNG học ở đây. König chỉ đúng cho bipartite. |
| Quên **reset \`used\`** mỗi đỉnh trái | Bỏ sót đường tăng → matching nhỏ | \`used = make([]bool, nR)\` ở đầu mỗi \`tryKuhn\` ngoài cùng |
| Nhầm **maximum vs maximal** | Trả về matching cục bộ | Phải tìm augmenting path tới khi hết (Berge), không dừng ở "không thêm được" |
| Tìm **augmenting path sai** (không xen kẽ) | Flip làm matching **không hợp lệ** | Cạnh phải luân phiên ngoài-M / trong-M; hai đầu là đỉnh tự do |
| Dùng König cho đồ thị **không bipartite** | Kết quả sai | König CHỈ đúng bipartite (đồ thị tổng quát min vertex cover là NP-hard) |
| Quên duyệt **mọi thành phần** khi tô màu | Kết luận bipartite sai | Vòng for ngoài cùng over mọi đỉnh chưa tô |
| Lẫn **chỉ số phía trái/phải** trong adj | Cạnh sai, matching sai | Chuẩn hoá: \`adj[u]\` chứa **index phía phải**, không lẫn |

> ⚠ **Blossom — vì sao general matching khó hơn.** Trong đồ thị bất kỳ, chu trình lẻ ("blossom")
> phá vỡ lập luận đường tăng đơn giản; Edmonds (1965) "co" blossom lại để tìm đường tăng đúng.
> Bài này chỉ làm **bipartite** (không có chu trình lẻ → đường tăng tìm trực tiếp được).

---

## Bài tập

> Mỗi bài có lời giải chi tiết ở mục [Lời giải chi tiết](#lời-giải-chi-tiết).

1. **Maximum bipartite matching (Kuhn).** Cho \`nL\`, \`nR\`, danh sách cạnh. Trả về kích thước maximum matching và danh sách cặp.
2. **Kiểm tra đồ thị 2 phía.** Cho đồ thị tổng quát (có thể không liên thông), trả về true/false + cách chia phía nếu có.
3. **Phân công việc.** N nhân viên, M dự án, ma trận \`can[i][j]\` = nhân viên i làm được dự án j. Tối đa hoá số dự án có người.
4. **Minimum vertex cover (König).** Sau khi có max matching, in ra một min vertex cover cụ thể.
5. **Maximum independent set (bipartite).** Trả về kích thước tập độc lập lớn nhất và một tập cụ thể.
6. **Lát domino bàn cờ khoét lỗ.** Bàn \`R×C\`, một số ô bị cấm. Hỏi số domino 1×2 tối đa lát được; có lát kín được không.
7. **(★) Minimum path cover trong DAG.** Cho DAG, tìm số đường đi đỉnh-rời ít nhất phủ mọi đỉnh.

---

## Lời giải chi tiết

### Bài 1 — Maximum bipartite matching (Kuhn)

**Cách tiếp cận.** Dùng đúng \`Kuhn\` ở mục 4.1. Sau khi chạy \`MaxMatching()\`, danh sách cặp
lấy từ \`matchR\`: với mỗi \`v\` có \`matchR[v] != -1\`, cặp là \`(matchR[v], v)\`.

\`\`\`go
k := NewKuhn(nL, nR, adj)
size := k.MaxMatching()
var pairs [][2]int
for v := 0; v < nR; v++ {
	if k.matchR[v] != -1 {
		pairs = append(pairs, [2]int{k.matchR[v], v}) // (trái, phải)
	}
}
\`\`\`

**Bước:** với mỗi đỉnh trái → reset \`used\` → DFS tìm đường tăng → flip nếu thấy.
**Độ phức tạp:** O(V·E). Mỗi đỉnh trái 1 DFS O(E), có V đỉnh.

### Bài 2 — Kiểm tra đồ thị 2 phía

**Cách tiếp cận.** Dùng \`isBipartite\` mục 1.2. Trả về \`(ok, color)\`; nếu \`ok\`, phía trái =
\`{v : color[v]==0}\`, phía phải = \`{v : color[v]==1}\`. Nhớ duyệt **mọi thành phần liên thông**.

**Bước:** BFS từ mỗi đỉnh chưa tô, gán màu ngược nhau giữa các đỉnh kề. Gặp cạnh nối 2 đỉnh
cùng màu → có chu trình lẻ → không bipartite.
**Độ phức tạp:** O(V + E).

### Bài 3 — Phân công việc

**Cách tiếp cận.** Dựng \`adj[i] = {j : can[i][j]}\` (nhân viên i nối tới dự án j). Chạy Kuhn.
Đáp án = số cặp ghép được.

\`\`\`go
adj := make([][]int, N)
for i := 0; i < N; i++ {
	for j := 0; j < M; j++ {
		if can[i][j] {
			adj[i] = append(adj[i], j)
		}
	}
}
fmt.Println(NewKuhn(N, M, adj).MaxMatching())
\`\`\`

**Ví dụ số.** N=3, M=3, \`can\` = \`[[1,1,0],[1,0,0],[0,1,1]]\` → đây là đồ thị mục 4 → max = 3.
**Độ phức tạp:** O(N·E) với E ≤ N·M.

### Bài 4 — Minimum vertex cover (König)

**Cách tiếp cận.** Chạy Kuhn lấy \`matchR\`, rồi gọi \`MinVertexCover\` mục 7.2. Kích thước cover
= kích thước matching (định lý König).

**Bước:** DFS đường xen kẽ từ mọi đỉnh trái tự do, đánh dấu \`visL\`, \`visR\`. Cover =
(trái không thăm) ∪ (phải đã thăm).
**Độ phức tạp:** O(V·E) cho Kuhn + O(V+E) cho cấu trúc cover.

**Kiểm chứng.** Đồ thị \`a-x, b-x\`: matching = 1 → cover size phải = 1 → cover = \`{x}\` ✓.

### Bài 5 — Maximum independent set (bipartite)

**Cách tiếp cận.** Max independent set = V − max matching (chỉ đúng bipartite). Tập cụ thể =
**phần bù của min vertex cover**: lấy mọi đỉnh KHÔNG nằm trong cover (bài 4).

\`\`\`go
cover := append(coverLeftAsGlobalIdx, coverRightAsGlobalIdx...) // gộp & quy về index toàn cục
inCover := make([]bool, V)
for _, x := range cover { inCover[x] = true }
var indep []int
for v := 0; v < V; v++ {
	if !inCover[v] { indep = append(indep, v) }
}
\`\`\`

**Ví dụ số.** V=6, max matching=2 → max independent set = 4.
**Độ phức tạp:** O(V·E) (chi phối bởi Kuhn).

### Bài 6 — Lát domino bàn cờ khoét lỗ

**Cách tiếp cận.** Tô bàn cờ kiểu caro: ô \`(r,c)\` đen nếu \`(r+c)\` chẵn, trắng nếu lẻ. Domino
luôn phủ 1 đen + 1 trắng → đồ thị 2 phía (đen=trái, trắng=phải). Cạnh nối 2 ô **kề nhau và
đều không cấm**. Số domino tối đa = max matching. Lát kín ⟺ matching·2 = số ô trống.

\`\`\`go
// Đánh số ô trống, ô đen vào L, ô trắng vào R; cạnh = 2 ô trống kề nhau (khác màu).
// Chạy Kuhn trên (đen -> trắng). Kết quả = số domino.
\`\`\`

**Ví dụ số.** Bàn 2×2 đủ ô: 2 đen (0,0),(1,1) + 2 trắng (0,1),(1,0). Cạnh kề: (0,0)-(0,1),
(0,0)-(1,0), (1,1)-(0,1), (1,1)-(1,0). Max matching = 2 → lát kín bằng 2 domino ✓.
**Bẫy cổ điển.** Bàn 8×8 khoét 2 góc đối (cùng màu): 32 đen − 30 trắng (hoặc ngược) → max
matching ≤ 30 < 31 → **KHÔNG lát kín được** (đã chứng minh bằng chênh lệch màu). König/matching
ra đúng kết quả này tự động.
**Độ phức tạp:** O(V·E), V = số ô, E ≤ 4V (mỗi ô tối đa 4 hàng xóm).

### Bài 7 (★) — Minimum path cover trong DAG

**Cách tiếp cận.** Xem mục 8.4. Tách mỗi đỉnh \`v\` thành \`v_out\` (trái), \`v_in\` (phải). Cạnh
DAG \`u→v\` thành \`u_out – v_in\`. Chạy Kuhn. **Min path cover = số đỉnh − max matching.**

**Trực giác vì sao đúng.** Mỗi cạnh trong matching = "nối tiếp" hai đỉnh trong cùng một đường
đi. Ghép được càng nhiều cạnh → càng nhiều đỉnh được "nối lại" → càng ít đường rời. Số đường =
số đỉnh − số chỗ nối = V − matching.

**Ví dụ số.** DAG \`1→2, 2→3, 1→4\` (V=4). Max matching trên đồ thị tách = 2 (\`1out-2in, 2out-3in\`).
Min path cover = 4 − 2 = **2** đường: \`1→2→3\` và \`4\`.
**Độ phức tạp:** O(V·E).

---

## Code & Minh hoạ

- **Minh hoạ tương tác**: [visualization.html](./visualization.html) — 3 module:
  1. **Kiểm tra 2 phía** — tô 2 màu BFS từng bước, phát hiện chu trình lẻ.
  2. **Kuhn matching** — animate tìm augmenting path + flip tăng matching.
  3. **König** — hiện max matching = min vertex cover trên cùng đồ thị.
- Code Go đầy đủ đã inline ở các mục 1.2, 4.1, 5.1, 7.2.

---

## Bài tiếp theo

Đây là **lesson cuối của nhánh đồ thị (Tier 5)**. Tiếp theo:

- **[Tier 6 — Thuật toán chuỗi](../tier-6-string/index.html)**: KMP, Z-function, suffix array, Aho-Corasick.

Ôn lại các bài liên quan:
- [L31 — Duyệt đồ thị](../lesson-31-graph-traversal/README.md) (2-coloring là biến thể BFS).
- [L38 — Network Flow](../lesson-38-network-flow/README.md) (matching = max flow cap 1).
- [L29 — Bitmask DP](../lesson-29-bitmask-dp/README.md) (assignment problem n nhỏ).
`;
