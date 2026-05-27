# Lesson 34 — Bellman-Ford & Floyd-Warshall: Đường đi ngắn nhất với cạnh âm

> **Tier 5 — Đồ thị.** Bài này mở rộng bài toán đường đi ngắn nhất sang vùng mà Dijkstra (Lesson 33) **không thể** xử lý: đồ thị có **cạnh trọng số âm**. Đồng thời giải bài toán **all-pairs** (mọi cặp đỉnh) bằng Floyd-Warshall.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao Dijkstra hỏng với cạnh âm**, và vì sao Bellman-Ford không hỏng.
- Cài đặt **Bellman-Ford** (single-source, O(V·E)) và giải thích được vì sao chỉ cần **V−1** vòng relax.
- **Phát hiện chu trình âm (negative cycle)** — vòng lặp thứ V còn relax được nghĩa là gì, và vì sao nó quan trọng cho **arbitrage detection** (chênh lệch tỷ giá).
- Cài đặt **Floyd-Warshall** (all-pairs, O(V³)) và giải thích vì sao **vòng `k` phải ở ngoài cùng**.
- **Truy vết đường đi** với cả hai (mảng `prev[]` cho Bellman, ma trận `next[][]` cho Floyd).
- Biến thể **transitive closure** (đóng bao bắc cầu) — đổi `min`/`+` thành `OR`/`AND`.
- Tránh được các **cạm bẫy**: thứ tự vòng lặp Floyd sai, thiếu vòng V−1, int overflow khi cộng ∞ với cạnh âm.

## Kiến thức tiền đề

- [Lesson 31 — Duyệt đồ thị (BFS/DFS)](../lesson-31-graph-traversal/) — biểu diễn đồ thị (danh sách kề, danh sách cạnh).
- [Lesson 33 — Dijkstra](../lesson-33-dijkstra/) — đường đi ngắn nhất single-source **không có cạnh âm**. Bài này là phần tiếp nối trực tiếp.
- [Lesson 23 — Nền tảng DP](../lesson-23-dp-fundamentals/) — Floyd-Warshall bản chất là quy hoạch động (DP) trên "tập đỉnh trung gian".

---

## 1. Vấn đề: Khi Dijkstra bó tay

### 💡 Trực giác

Hãy hình dung bạn đang lái xe và mỗi đoạn đường có "chi phí". Dijkstra giả định mọi đoạn đường đều **tốn thêm** xăng (chi phí dương) — đi càng xa càng đắt, nên một khi đã tìm được cách rẻ nhất tới một thành phố thì không bao giờ rẻ hơn được nữa. Đó là lý do Dijkstra "chốt" (finalize) một đỉnh rồi không xét lại.

Nhưng nếu có **đoạn đường được trả tiền** (chi phí âm) — ví dụ tỷ giá ngoại tệ, khuyến mãi, hoàn tiền — thì giả định trên sụp đổ. Đi vòng xa hơn qua một đoạn "âm" có thể **rẻ hơn** đường thẳng. Dijkstra đã chốt đỉnh quá sớm sẽ cho kết quả **sai**.

### Vì sao Dijkstra sai với cạnh âm — phản ví dụ cụ thể

Đồ thị 3 đỉnh:

```
        A
      /   \
   (1)     (4)
    /         \
   B --(-3)--> C
```

Cạnh: `A→B = 1`, `A→C = 4`, `B→C = −3`. Nguồn = A.

- Đường ngắn nhất thực sự `A→C`: đi `A→B→C` = `1 + (−3) = −2`. Rẻ hơn `A→C` trực tiếp (= 4).
- Dijkstra: lấy đỉnh gần nhất chưa chốt. Sau khi chốt A (dist 0), hàng đợi có B(1), C(4). Lấy B(1), chốt B. Relax `B→C`: `1 + (−3) = −2 < 4` → cập nhật C = −2. **Nhưng C đã ở trong hàng đợi với 4**; nhiều cài đặt Dijkstra **chốt C theo thứ tự lấy ra**. Vấn đề lớn hơn xuất hiện khi cạnh âm nằm **sau** một đỉnh đã được chốt — Dijkstra không bao giờ xét lại đỉnh đã chốt, nên bỏ lỡ cải thiện.

Phản ví dụ kinh điển hơn (Dijkstra chốt sai chắc chắn):

```
   A --(2)--> B --(-5)--> C
   A --(3)----------------> C
```

`A→B = 2`, `B→C = −5`, `A→C = 3`. Dijkstra chốt A → hàng đợi {B:2, C:3}. Lấy **B (gần nhất, =2)**, chốt B. Relax `B→C`: `2 + (−5) = −3`. Cập nhật C = −3. Lấy C, chốt C = −3. Ở ví dụ này Dijkstra **may mắn đúng**. Nhưng đảo trọng số:

```
   A --(2)--> B --(1)--> C        đường này = 3
   A --(3)--> C                   đường trực tiếp = 3
   A --(1)--> D --(-10)--> B      đường tới B qua D = -9
```

Dijkstra lấy đỉnh nhỏ nhất trước, có thể chốt B = 2 trước khi khám phá `D→B = −9`, nên bỏ lỡ. Kết luận: **bất cứ khi nào có cạnh âm, đừng dùng Dijkstra** — kết quả không đảm bảo đúng.

> ⚠ **Lỗi thường gặp**: "Thêm một hằng số vào mọi cạnh để khử âm rồi chạy Dijkstra." **Sai!** Cộng hằng số `c` vào mỗi cạnh làm đường đi `k` cạnh tăng thêm `k·c` — đường nhiều cạnh bị phạt nặng hơn đường ít cạnh, làm thay đổi đường ngắn nhất. (Có kỹ thuật **Johnson's algorithm** dùng "reweighting" qua thế năng `h(v)` để khử âm *đúng cách*, nhưng đó là chủ đề nâng cao.)

### Hai bài toán bài này giải quyết

| Bài toán | Định nghĩa | Thuật toán bài này |
|----------|------------|---------------------|
| **Single-source shortest path (SSSP)** với cạnh âm | Từ 1 nguồn `s`, tìm đường ngắn nhất tới mọi đỉnh | **Bellman-Ford** |
| **All-pairs shortest path (APSP)** | Đường ngắn nhất giữa **mọi cặp** đỉnh `(i, j)` | **Floyd-Warshall** |

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>Vì sao không thể "cộng hằng số khử âm rồi Dijkstra"?</summary>

Vì hằng số cộng vào *mỗi cạnh*, nên một đường đi `k` cạnh bị cộng tổng cộng `k·c`. Hai đường cùng nối `s→t` nhưng số cạnh khác nhau sẽ bị phạt khác nhau → so sánh không còn công bằng → đường ngắn nhất có thể đổi. Ví dụ `A→B→C` (2 cạnh) và `A→C` (1 cạnh): cộng `c` làm đường đầu +2c, đường sau +c.
</details>

### 📝 Tóm tắt mục 1

- Dijkstra **chốt** đỉnh khi lấy ra khỏi hàng đợi, giả định không có cách rẻ hơn về sau → **chỉ đúng khi cạnh không âm**.
- Cạnh âm phá vỡ giả định đó → cần thuật toán **relax lặp lại nhiều lần**: Bellman-Ford.
- Cộng hằng số khử âm **không** cứu được (phạt theo số cạnh).
- Hai bài toán: SSSP (Bellman-Ford) và APSP (Floyd-Warshall).

---

## 2. Bellman-Ford: relax tất cả cạnh, V−1 lần

### 💡 Trực giác

Bellman-Ford không thông minh kiểu Dijkstra (chọn đỉnh gần nhất). Nó **thô bạo nhưng chắc chắn**: cứ duyệt **toàn bộ danh sách cạnh** và "relax" từng cái, lặp đi lặp lại. Mỗi vòng lặp, "tin tốt" (một dist tốt hơn) lan thêm được **đúng 1 cạnh** ra xa nguồn.

> **Relax một cạnh `(u, v, w)`**: nếu `dist[u] + w < dist[v]` thì cập nhật `dist[v] = dist[u] + w` (và `prev[v] = u`). Nghĩa là: "đi qua u rồi tới v có rẻ hơn cách hiện tại không?"

### Vì sao đúng **V−1** vòng?

**💡 Hình dung**: Đường đi ngắn nhất (không chu trình âm) là một **đường đơn** — không lặp lại đỉnh. Đồ thị có `V` đỉnh thì đường đơn dài nhất có **tối đa V−1 cạnh** (đi qua hết V đỉnh).

- Sau **vòng 1**: mọi đường ngắn nhất dùng **≤ 1 cạnh** đã chính xác.
- Sau **vòng 2**: mọi đường ngắn nhất dùng **≤ 2 cạnh** đã chính xác.
- ...
- Sau **vòng k**: mọi đường ngắn nhất dùng **≤ k cạnh** đã chính xác.
- Đường ngắn nhất dùng tối đa V−1 cạnh → sau **V−1 vòng**, tất cả đã chính xác.

Đây là quy nạp: mỗi vòng relax *toàn bộ* cạnh, nên nếu `dist[u]` đã đúng cho đường ≤ k−1 cạnh, thì cạnh `u→v` sẽ làm `dist[v]` đúng cho đường ≤ k cạnh.

### Walk-through đầy đủ — đồ thị 5 đỉnh có cạnh âm

Đồ thị (nguồn = 0), danh sách cạnh:

```
0 → 1 :  6
0 → 2 :  7
1 → 2 :  8
1 → 3 :  5
1 → 4 : -4
2 → 3 : -3
2 → 4 :  9
3 → 1 : -2
4 → 0 :  2
4 → 3 :  7
```

Khởi tạo: `dist = [0, ∞, ∞, ∞, ∞]`. Relax theo **đúng thứ tự danh sách cạnh trên**.

**Vòng 1** (relax 10 cạnh theo thứ tự):

| Cạnh | Điều kiện | dist sau |
|------|-----------|----------|
| 0→1 (6) | 0+6 < ∞ | dist[1]=6 |
| 0→2 (7) | 0+7 < ∞ | dist[2]=7 |
| 1→2 (8) | 6+8=14 < 7? Không | — |
| 1→3 (5) | 6+5=11 < ∞ | dist[3]=11 |
| 1→4 (−4) | 6−4=2 < ∞ | dist[4]=2 |
| 2→3 (−3) | 7−3=4 < 11 | dist[3]=4 |
| 2→4 (9) | 7+9=16 < 2? Không | — |
| 3→1 (−2) | 4−2=2 < 6 | dist[1]=2 |
| 4→0 (2) | 2+2=4 < 0? Không | — |
| 4→3 (7) | 2+7=9 < 4? Không | — |

Sau vòng 1: `dist = [0, 2, 7, 4, 2]`.

**Vòng 2**:

| Cạnh | Điều kiện | dist sau |
|------|-----------|----------|
| 0→1 (6) | 6 < 2? Không | — |
| 0→2 (7) | 7 < 7? Không | — |
| 1→2 (8) | 2+8=10 < 7? Không | — |
| 1→3 (5) | 2+5=7 < 4? Không | — |
| 1→4 (−4) | 2−4=−2 < 2 | dist[4]=−2 |
| 2→3 (−3) | 7−3=4 < 4? Không | — |
| 2→4 (9) | 7+9 < −2? Không | — |
| 3→1 (−2) | 4−2=2 < 2? Không | — |
| 4→0 (2) | −2+2=0 < 0? Không | — |
| 4→3 (7) | −2+7=5 < 4? Không | — |

Sau vòng 2: `dist = [0, 2, 7, 4, −2]`.

**Vòng 3, 4** (V−1 = 4 vòng): không cạnh nào relax được nữa. `dist` ổn định = `[0, 2, 7, 4, −2]`.

**Kết quả**: từ đỉnh 0, đường ngắn nhất tới `[1,2,3,4] = [2, 7, 4, −2]`. Đường tới đỉnh 1 = 2 đi qua `0→2→3→1` (`7−3−2 = 2`), rẻ hơn `0→1` trực tiếp (= 6) — nhờ cạnh âm `2→3` và `3→1`.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"Sao vòng 3,4 vẫn phải chạy nếu vòng 2 đã gần xong?"* — Trên lý thuyết cần V−1 để đảm bảo trường hợp xấu nhất (đường dài V−1 cạnh, thứ tự relax bất lợi). Thực tế thường hội tụ sớm → **tối ưu**: nếu một vòng không relax được cạnh nào, dừng luôn (xem code, biến `changed`).
> - *"Thứ tự relax cạnh có quan trọng không?"* — Ảnh hưởng *tốc độ hội tụ* (relax theo thứ tự "đúng" có thể xong sau 1 vòng) nhưng **không** ảnh hưởng kết quả cuối sau V−1 vòng. Tính đúng đắn được đảm bảo bất kể thứ tự.

### Code Go — Bellman-Ford + truy vết

```go
package main

import "fmt"

const INF = 1 << 30 // ∞ "an toàn": đủ lớn nhưng KHÔNG tràn int khi cộng cạnh âm

type Edge struct {
	From, To, W int
}

// bellmanFord trả về (dist, prev, hasNegCycle).
// dist[v] = khoảng cách ngắn nhất từ src tới v (INF nếu không tới được).
// prev[v] = đỉnh liền trước v trên đường ngắn nhất (để truy vết).
func bellmanFord(n int, edges []Edge, src int) (dist []int, prev []int, hasNeg bool) {
	dist = make([]int, n)
	prev = make([]int, n)
	for i := range dist {
		dist[i] = INF
		prev[i] = -1
	}
	dist[src] = 0

	// Lặp V-1 vòng, relax TẤT CẢ cạnh mỗi vòng.
	for i := 0; i < n-1; i++ {
		changed := false
		for _, e := range edges {
			// QUAN TRỌNG: chỉ relax nếu dist[e.From] đã "tới được" (khác INF),
			// nếu không INF + cạnh âm sẽ thành số nhỏ sai → relax bậy.
			if dist[e.From] != INF && dist[e.From]+e.W < dist[e.To] {
				dist[e.To] = dist[e.From] + e.W
				prev[e.To] = e.From
				changed = true
			}
		}
		if !changed { // tối ưu: hội tụ sớm thì dừng
			break
		}
	}

	// Vòng thứ V: nếu còn relax được => có chu trình âm.
	for _, e := range edges {
		if dist[e.From] != INF && dist[e.From]+e.W < dist[e.To] {
			hasNeg = true
			break
		}
	}
	return dist, prev, hasNeg
}

// pathTo truy vết đường đi src -> target bằng mảng prev.
func pathTo(prev []int, target int) []int {
	var path []int
	for at := target; at != -1; at = prev[at] {
		path = append([]int{at}, path...)
	}
	return path
}

func main() {
	edges := []Edge{
		{0, 1, 6}, {0, 2, 7}, {1, 2, 8}, {1, 3, 5}, {1, 4, -4},
		{2, 3, -3}, {2, 4, 9}, {3, 1, -2}, {4, 0, 2}, {4, 3, 7},
	}
	dist, prev, neg := bellmanFord(5, edges, 0)
	fmt.Println("Có chu trình âm:", neg)        // false
	fmt.Println("dist:", dist)                  // [0 2 7 4 -2]
	fmt.Println("đường 0->1:", pathTo(prev, 1)) // [0 2 3 1]
}
```

**Walk-through code** với đồ thị trên: sau V−1=4 vòng (thực tế hội tụ ở vòng 3 nên `changed=false` → break), `dist = [0 2 7 4 -2]`, đúng như bảng tay ở trên. `pathTo(prev, 1)` trả `[0 2 3 1]`.

### ⚠ Lỗi thường gặp với Bellman-Ford

- **Quên kiểm tra `dist[e.From] != INF`**: `INF + (−4)` thành `INF−4`, nhỏ hơn `INF` → relax đỉnh chưa-tới-được thành giá trị rác. (Xem mục 10.)
- **Lặp thiếu V−1 vòng** (ví dụ chỉ 1 vòng kiểu BFS): đường nhiều cạnh chưa kịp lan tới → kết quả sai.
- **Dùng `dist[v] = ∞ = math.MaxInt`**: cộng cạnh dương sẽ tràn (overflow) thành số âm. Dùng `INF = 1<<30` để cộng vài cạnh vẫn không tràn `int`.

### Độ phức tạp

- **Thời gian**: O(V·E) — V−1 vòng × E cạnh mỗi vòng.
- **Bộ nhớ**: O(V) cho `dist`, `prev` + O(E) cho danh sách cạnh.

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>Với V=5, E=10, tối đa bao nhiêu phép relax?</summary>

(V−1)·E = 4·10 = **40 phép relax** (cộng vòng thứ V để kiểm tra chu trình âm = thêm 10). Thực tế với tối ưu `changed` có thể ít hơn nhiều.
</details>

### 📝 Tóm tắt mục 2

- Bellman-Ford = relax **toàn bộ** cạnh, lặp **V−1** vòng. Đơn giản, chậm hơn Dijkstra nhưng xử lý cạnh âm.
- V−1 vì đường ngắn nhất (không chu trình âm) là đường đơn, tối đa V−1 cạnh.
- Tối ưu: dừng sớm nếu một vòng không relax được gì (`changed=false`).
- Luôn kiểm tra `dist[u] != INF` trước khi relax để tránh INF + cạnh âm.

---

## 3. Phát hiện chu trình âm (negative cycle)

### 💡 Trực giác

**Chu trình âm** = một vòng kín mà tổng trọng số < 0. Ví dụ: đổi USD → EUR → GBP → USD và cuối cùng *nhiều USD hơn lúc đầu*. Nếu tồn tại chu trình âm reachable từ nguồn, thì "đường ngắn nhất" **không xác định** — cứ đi vòng quanh chu trình thêm một lần là chi phí lại giảm, giảm mãi tới −∞.

### Cách phát hiện — vòng lặp thứ V

Sau V−1 vòng, mọi đường ngắn nhất *đơn* đã chính xác (không còn relax được). Vậy **chạy thêm 1 vòng (vòng thứ V)**: nếu **vẫn còn cạnh relax được** → chứng tỏ có một đường "rẻ hơn cả đường đơn dài nhất" → bắt buộc phải đi qua chu trình → **chu trình âm tồn tại**.

```
nếu (vòng V còn relax cạnh (u,v,w))  ⇒  có chu trình âm reachable từ src
```

### Walk-through — đồ thị có chu trình âm

```
0 → 1 :  1
1 → 2 :  -1
2 → 3 :  -1
3 → 1 :  -1     ← chu trình 1→2→3→1 tổng = -1-1-1 = -3 < 0
```

Nguồn = 0. `dist = [0, ∞, ∞, ∞]`.

- **Vòng 1**: `0→1`: dist[1]=1. `1→2`: dist[2]=0. `2→3`: dist[3]=−1. `3→1`: −1−1=−2 < 1 → dist[1]=−2.
- **Vòng 2**: `1→2`: −2−1=−3 < 0 → dist[2]=−3. `2→3`: −4 < −1 → dist[3]=−4. `3→1`: −5 < −2 → dist[1]=−5.
- **Vòng 3 (=V−1)**: tiếp tục giảm... dist[1]=−8.
- **Vòng 4 (=V, kiểm tra)**: `3→1` *vẫn* relax được (−8−1 nhỏ hơn) → **phát hiện chu trình âm**.

Giá trị dist cứ giảm vô hạn mỗi vòng → đường ngắn nhất tới 1, 2, 3 = −∞. Hàm `bellmanFord` ở mục 2 trả `hasNeg = true`.

### Ứng dụng quan trọng: phát hiện arbitrage (chênh lệch tỷ giá)

Cho ma trận tỷ giá `rate[i][j]` (1 đơn vị tiền i đổi được bao nhiêu tiền j). Arbitrage tồn tại nếu có chu trình `i → j → ... → i` mà tích các tỷ giá > 1 (đổi vòng lại lời).

**Mẹo logarit**: đặt trọng số cạnh `w(i→j) = −log(rate[i][j])`. Khi đó:

```
tích rate > 1   ⟺   Σ log(rate) > 0   ⟺   Σ (−log(rate)) < 0   ⟺   CHU TRÌNH ÂM
```

Vậy **phát hiện arbitrage = phát hiện chu trình âm** trên đồ thị `−log(rate)` bằng Bellman-Ford. (Xem code mục 7.)

### ❓ Câu hỏi tự nhiên của người đọc

- *"Chu trình âm mà không reachable từ nguồn thì sao?"* — Bellman-Ford chuẩn (chạy từ 1 nguồn) chỉ phát hiện chu trình âm **reachable từ nguồn**. Muốn phát hiện *mọi* chu trình âm trong đồ thị: thêm một đỉnh ảo nối tới mọi đỉnh với cạnh trọng số 0, hoặc khởi tạo `dist[i]=0` cho tất cả.
- *"Làm sao trích ra đỉnh trên chu trình âm?"* — Khi vòng V relax được cạnh `(u,v)`, đỉnh `v` nằm trên hoặc đi tới được chu trình âm. Đi ngược `prev[]` từ `v` đúng `n` bước (để chắc chắn vào trong chu trình), rồi đi tiếp theo `prev` tới khi gặp lại đỉnh đó → trích được chu trình.

### 📝 Tóm tắt mục 3

- Chu trình âm ⇒ đường ngắn nhất = −∞ (không xác định).
- Phát hiện: chạy thêm **vòng thứ V**; còn relax được = có chu trình âm.
- Ứng dụng đắt giá: **arbitrage** = chu trình âm trên đồ thị `w = −log(rate)`.

---

## 4. SPFA — Bellman-Ford tối ưu bằng hàng đợi

**SPFA** (Shortest Path Faster Algorithm) là bản tối ưu của Bellman-Ford: thay vì mù quáng relax *mọi* cạnh mỗi vòng, chỉ relax các cạnh xuất phát từ đỉnh **vừa được cập nhật** (giống BFS dùng hàng đợi).

```go
func spfa(n int, adj [][]Edge, src int) ([]int, bool) {
	dist := make([]int, n)
	inQueue := make([]bool, n)
	count := make([]int, n) // số lần một đỉnh vào hàng đợi
	for i := range dist {
		dist[i] = INF
	}
	dist[src] = 0
	queue := []int{src}
	inQueue[src] = true

	for len(queue) > 0 {
		u := queue[0]
		queue = queue[1:]
		inQueue[u] = false
		for _, e := range adj[u] {
			if dist[u]+e.W < dist[e.To] {
				dist[e.To] = dist[u] + e.W
				if !inQueue[e.To] {
					queue = append(queue, e.To)
					inQueue[e.To] = true
					count[e.To]++
					if count[e.To] >= n { // một đỉnh vào hàng đợi >= n lần
						return dist, true // => chu trình âm
					}
				}
			}
		}
	}
	return dist, false
}
```

> ⚠ **Cảnh báo**: SPFA **trung bình nhanh** (gần O(E)) nhưng **trường hợp xấu nhất vẫn O(V·E)** — và có những đồ thị "ác ý" được thiết kế để làm SPFA chậm. Trong thi đấu / hệ thống cần đảm bảo, dùng Bellman-Ford chuẩn hoặc Dijkstra (nếu không cạnh âm). SPFA chỉ là *tối ưu thực dụng*, không phải cải thiện độ phức tạp lý thuyết.

---

## 5. Floyd-Warshall: all-pairs shortest path

### 💡 Trực giác

Bellman-Ford / Dijkstra chỉ cho đường ngắn nhất từ **một** nguồn. Nếu cần khoảng cách giữa **mọi cặp** `(i, j)` (ví dụ ma trận khoảng cách giữa mọi thành phố), Floyd-Warshall làm điều đó *một lần* trong O(V³).

Ý tưởng DP: hỏi câu hỏi *"đường ngắn nhất từ i tới j mà chỉ được dùng các đỉnh `{0, 1, ..., k}` làm trung gian là bao nhiêu?"* Tăng dần `k` từ −1 (không dùng trung gian nào) lên V−1 (được dùng mọi đỉnh).

### Công thức DP

Gọi `dist^(k)[i][j]` = đường ngắn nhất `i → j` chỉ dùng trung gian trong `{0..k}`. Khi xét thêm đỉnh `k`, đường `i→j` hoặc **không qua k** (giữ nguyên), hoặc **qua k** (`i→k` rồi `k→j`):

```
dist[i][j] = min( dist[i][j],  dist[i][k] + dist[k][j] )
```

Khởi tạo `dist[i][j]` = trọng số cạnh trực tiếp `i→j` (hoặc ∞ nếu không có cạnh), `dist[i][i] = 0`.

### Vì sao `k` PHẢI ở vòng ngoài cùng?

Đây là điểm sai phổ biến nhất. Khi tính `dist[i][j]` qua `k`, ta cần `dist[i][k]` và `dist[k][j]` **đã hoàn tất việc xét mọi trung gian < k**. Điều này chỉ đảm bảo nếu `k` là vòng *ngoài cùng* — khi xử lý một `k` cố định, ta cập nhật toàn bộ ma trận `(i, j)` dựa trên các giá trị ổn định của lần `k` trước.

Nếu đặt `k` ở trong (ví dụ `for i { for j { for k }}`), khi tính `dist[i][j]` các giá trị `dist[i][k]`, `dist[k][j]` chưa chắc đã được cập nhật đúng → **kết quả sai**. (Xem cạm bẫy mục 10.)

### Walk-through ma trận — đồ thị 4 đỉnh có cạnh âm

Cạnh: `0→1=3`, `0→3=7`, `1→0=8`, `1→2=2`, `2→0=5`, `2→3=1`, `3→0=2`. (∞ = không có cạnh)

**k = −1** (ma trận ban đầu, chỉ cạnh trực tiếp, đường chéo = 0):

| từ\đến | 0 | 1 | 2 | 3 |
|--------|---|---|---|---|
| **0** | 0 | 3 | ∞ | 7 |
| **1** | 8 | 0 | 2 | ∞ |
| **2** | 5 | ∞ | 0 | 1 |
| **3** | 2 | ∞ | ∞ | 0 |

**k = 0** (cho phép đi qua đỉnh 0). Cập nhật `dist[i][j] = min(cũ, dist[i][0]+dist[0][j])`:
- `dist[1][3]`: min(∞, dist[1][0]+dist[0][3]=8+7=15) = **15**
- `dist[2][1]`: min(∞, dist[2][0]+dist[0][1]=5+3=8) = **8**
- `dist[2][3]`: min(1, 5+7=12) = 1 (giữ)
- `dist[3][1]`: min(∞, dist[3][0]+dist[0][1]=2+3=5) = **5**
- `dist[3][3]`: min(0, 2+7=9) = 0

| từ\đến | 0 | 1 | 2 | 3 |
|--------|---|---|---|---|
| **0** | 0 | 3 | ∞ | 7 |
| **1** | 8 | 0 | 2 | 15 |
| **2** | 5 | 8 | 0 | 1 |
| **3** | 2 | 5 | ∞ | 0 |

**k = 1** (qua đỉnh 1):
- `dist[0][2]`: min(∞, dist[0][1]+dist[1][2]=3+2=5) = **5**
- `dist[0][3]`: min(7, 3+15=18) = 7
- `dist[2][2]`: min(0, 8+2=10) = 0
- `dist[3][2]`: min(∞, dist[3][1]+dist[1][2]=5+2=7) = **7**

| từ\đến | 0 | 1 | 2 | 3 |
|--------|---|---|---|---|
| **0** | 0 | 3 | 5 | 7 |
| **1** | 8 | 0 | 2 | 15 |
| **2** | 5 | 8 | 0 | 1 |
| **3** | 2 | 5 | 7 | 0 |

**k = 2** (qua đỉnh 2):
- `dist[0][3]`: min(7, dist[0][2]+dist[2][3]=5+1=6) = **6**
- `dist[1][3]`: min(15, dist[1][2]+dist[2][3]=2+1=3) = **3**
- `dist[1][0]`: min(8, dist[1][2]+dist[2][0]=2+5=7) = **7**

| từ\đến | 0 | 1 | 2 | 3 |
|--------|---|---|---|---|
| **0** | 0 | 3 | 5 | 6 |
| **1** | 7 | 0 | 2 | 3 |
| **2** | 5 | 8 | 0 | 1 |
| **3** | 2 | 5 | 7 | 0 |

**k = 3** (qua đỉnh 3):
- `dist[1][0]`: min(7, dist[1][3]+dist[3][0]=3+2=5) = **5**
- `dist[2][0]`: min(5, dist[2][3]+dist[3][0]=1+2=3) = **3**
- `dist[2][1]`: min(8, dist[2][3]+dist[3][1]=1+5=6) = **6**

**Ma trận cuối** (all-pairs shortest path):

| từ\đến | 0 | 1 | 2 | 3 |
|--------|---|---|---|---|
| **0** | 0 | 3 | 5 | 6 |
| **1** | 5 | 0 | 2 | 3 |
| **2** | 3 | 6 | 0 | 1 |
| **3** | 2 | 5 | 7 | 0 |

Ví dụ `dist[2][1] = 6` qua đường `2→3→0→1` (`1+2+3 = 6`).

### Negative cycle trong Floyd-Warshall

Sau khi chạy xong, **nếu `dist[i][i] < 0` với một `i` nào đó** → có chu trình âm đi qua `i`. Đường chéo lẽ ra phải = 0; âm nghĩa là từ `i` đi vòng về `i` mà tổng < 0.

### Code Go — Floyd-Warshall + truy vết path

```go
package main

import "fmt"

const INF = 1 << 30

// floydWarshall trả về ma trận khoảng cách + ma trận next để truy vết.
// next[i][j] = đỉnh KẾ TIẾP trên đường ngắn nhất từ i tới j.
func floydWarshall(n int, w [][]int) (dist [][]int, next [][]int) {
	dist = make([][]int, n)
	next = make([][]int, n)
	for i := 0; i < n; i++ {
		dist[i] = make([]int, n)
		next[i] = make([]int, n)
		for j := 0; j < n; j++ {
			dist[i][j] = w[i][j]
			if w[i][j] < INF && i != j {
				next[i][j] = j // đi thẳng i->j
			} else {
				next[i][j] = -1
			}
		}
		dist[i][i] = 0
	}

	// k PHẢI ở vòng NGOÀI CÙNG.
	for k := 0; k < n; k++ {
		for i := 0; i < n; i++ {
			for j := 0; j < n; j++ {
				// tránh INF + INF tràn / relax bậy
				if dist[i][k] < INF && dist[k][j] < INF &&
					dist[i][k]+dist[k][j] < dist[i][j] {
					dist[i][j] = dist[i][k] + dist[k][j]
					next[i][j] = next[i][k] // đi tới j thì trước hết theo hướng tới k
				}
			}
		}
	}
	return dist, next
}

// reconstructPath dựng đường i -> j bằng ma trận next.
func reconstructPath(next [][]int, i, j int) []int {
	if next[i][j] == -1 {
		return nil // không có đường
	}
	path := []int{i}
	for i != j {
		i = next[i][j]
		path = append(path, i)
	}
	return path
}

func hasNegCycle(dist [][]int) bool {
	for i := range dist {
		if dist[i][i] < 0 {
			return true
		}
	}
	return false
}

func main() {
	n := 4
	w := make([][]int, n)
	for i := range w {
		w[i] = make([]int, n)
		for j := range w[i] {
			w[i][j] = INF
		}
	}
	edges := [][3]int{{0, 1, 3}, {0, 3, 7}, {1, 0, 8}, {1, 2, 2},
		{2, 0, 5}, {2, 3, 1}, {3, 0, 2}}
	for _, e := range edges {
		w[e[0]][e[1]] = e[2]
	}
	dist, next := floydWarshall(n, w)
	fmt.Println("dist[2]:", dist[2])                    // [3 6 0 1]
	fmt.Println("path 2->1:", reconstructPath(next, 2, 1)) // [2 3 0 1]
	fmt.Println("chu trình âm:", hasNegCycle(dist))     // false
}
```

**Walk-through code**: với đồ thị trên, `dist[2] = [3 6 0 1]` khớp hàng "2" trong ma trận cuối. `reconstructPath(next, 2, 1)` trả `[2 3 0 1]` — đúng đường `2→3→0→1` chi phí 6.

### ⚠ Lỗi thường gặp — Floyd-Warshall

- **Đặt `k` không ở ngoài cùng** → sai kết quả (xem mục 10). Thứ tự đúng: `k → i → j`.
- **Quên kiểm tra INF trước khi cộng** → `INF + INF` tràn, hoặc `INF + cạnh-âm` thành số sai.
- **Quên khởi tạo `dist[i][i] = 0`** → đường chéo = ∞, sai khi truy vết.

### Độ phức tạp

- **Thời gian**: O(V³) — ba vòng lặp lồng nhau.
- **Bộ nhớ**: O(V²) cho ma trận `dist` (+ O(V²) cho `next` nếu cần truy vết).
- **Không scale** với V lớn: V=1000 → 10⁹ phép tính (≈ vài giây); V=5000 → 1.25×10¹¹ (quá chậm).

### 🔁 Dừng lại tự kiểm tra

<details>
<summary>Với V=4, Floyd-Warshall chạy bao nhiêu phép cập nhật ô?</summary>

V³ = 4³ = **64** lần xét bộ `(k, i, j)`. (Mỗi lần là một phép so sánh + có thể cập nhật.)
</details>

### 📝 Tóm tắt mục 5

- Floyd-Warshall = DP trên "tập đỉnh trung gian `{0..k}`": `dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j])`.
- **`k` ngoài cùng** là bắt buộc — đảm bảo `dist[i][k]`, `dist[k][j]` đã hoàn tất.
- All-pairs trong O(V³), O(V²) bộ nhớ. Xử lý cạnh âm (không chu trình âm).
- Chu trình âm ⟺ `dist[i][i] < 0`.

---

## 6. So sánh 3 thuật toán đường đi ngắn nhất

| Tiêu chí | **Dijkstra** | **Bellman-Ford** | **Floyd-Warshall** |
|----------|--------------|-------------------|---------------------|
| Phạm vi | Single-source | Single-source | **All-pairs** |
| Cạnh âm | ❌ Không | ✓ Có | ✓ Có |
| Phát hiện chu trình âm | ❌ Không | ✓ Có (vòng V) | ✓ Có (`dist[i][i]<0`) |
| Độ phức tạp thời gian | O((V+E)·log V) | O(V·E) | O(V³) |
| Bộ nhớ | O(V+E) | O(V+E) | O(V²) |
| Cài đặt | Trung bình (cần heap) | Dễ | Rất dễ (3 vòng for) |
| Cấu trúc dữ liệu | Đồ thị + priority queue | Danh sách cạnh | Ma trận kề |

### Khi nào dùng cái nào?

- **Dijkstra** — cạnh **không âm**, cần single-source. Nhanh nhất cho đồ thị thưa lớn (mạng đường bộ, định tuyến). Mặc định nếu chắc chắn không cạnh âm.
- **Bellman-Ford** — có cạnh âm và cần single-source, **hoặc** cần phát hiện chu trình âm (arbitrage). Chấp nhận O(V·E).
- **Floyd-Warshall** — cần khoảng cách giữa **mọi cặp** đỉnh, đồ thị **nhỏ & dày** (V ≤ ~500). Code cực ngắn, xử lý cạnh âm. Nếu V lớn nhưng cần all-pairs, chạy Dijkstra/Bellman từ mỗi đỉnh có thể nhanh hơn (đồ thị thưa).

### ❓ Câu hỏi tự nhiên của người đọc

- *"Cần all-pairs nhưng không có cạnh âm, V lớn thì sao?"* — Chạy **Dijkstra từ mỗi đỉnh**: O(V·(V+E)·log V), với đồ thị thưa (E≈V) tốt hơn O(V³). Đây gọi là *Johnson's algorithm* (nếu có cạnh âm thì thêm bước reweighting bằng Bellman-Ford trước).
- *"V³ với V=500 mất bao lâu?"* — 500³ = 1.25×10⁸ ≈ dưới 1 giây trong Go. V=1000 → 10⁹ ≈ vài giây, ranh giới chấp nhận được.

### 📝 Tóm tắt mục 6

- Dijkstra nhanh nhưng cấm cạnh âm. Bellman-Ford chậm hơn nhưng nhận cạnh âm + phát hiện chu trình âm. Floyd-Warshall cho all-pairs ngắn gọn, O(V³).
- Chọn theo: có cạnh âm không? single hay all-pairs? V lớn hay nhỏ?

---

## 7. Ứng dụng thực tế

### 7.1 Currency arbitrage (chênh lệch tỷ giá) — code Go

Mỗi đồng tiền là một đỉnh; cạnh `i→j` trọng số `−log(rate[i][j])`. Chu trình âm = cơ hội arbitrage.

```go
package main

import (
	"fmt"
	"math"
)

// detectArbitrage: rate[i][j] = số đơn vị tiền j đổi được từ 1 đơn vị tiền i.
// Trả true nếu tồn tại chu trình arbitrage (đổi vòng lại lời).
func detectArbitrage(rate [][]float64) bool {
	n := len(rate)
	// trọng số = -log(rate). Tích rate > 1  <=>  tổng (-log) < 0  <=>  chu trình âm.
	dist := make([]float64, n)
	for i := 1; i < n; i++ {
		dist[i] = math.Inf(1)
	}
	// dist[0]=0 (chọn đỉnh 0 làm nguồn); để bắt MỌI chu trình, có thể đặt mọi dist=0.

	relax := func() bool {
		changed := false
		for u := 0; u < n; u++ {
			for v := 0; v < n; v++ {
				if rate[u][v] <= 0 {
					continue
				}
				w := -math.Log(rate[u][v])
				if dist[u]+w < dist[v]-1e-12 { // epsilon tránh sai số float
					dist[v] = dist[u] + w
					changed = true
				}
			}
		}
		return changed
	}

	// V-1 vòng relax.
	for i := 0; i < n-1; i++ {
		if !relax() {
			break
		}
	}
	// vòng V: còn relax được => chu trình âm => arbitrage.
	return relax()
}

func main() {
	// 0=USD, 1=EUR, 2=GBP. Có arbitrage nếu đi vòng lời.
	rate := [][]float64{
		{1, 0.9, 0.8},
		{1.12, 1, 0.88},
		{1.27, 1.15, 1},
	}
	fmt.Println("Có arbitrage:", detectArbitrage(rate))
}
```

> ⚠ **Sai số float**: dùng `-log` nên cần epsilon (`1e-12`) khi so sánh, tránh báo arbitrage giả do làm tròn.

### 7.2 Các ứng dụng khác

- **Mạng với "delay âm" / khuyến mãi tích lũy** (hiếm) — chi phí có thể âm (hoàn tiền, thưởng). Bellman-Ford xử lý đúng.
- **All-pairs cho đồ thị nhỏ dày** — ma trận khoảng cách giữa mọi địa điểm trong một khu (V nhỏ), tính một lần bằng Floyd-Warshall rồi tra cứu O(1).
- **Transitive closure / reachability** — biến thể Floyd (mục 9), tính "ai tới được ai" trong mạng phụ thuộc.
- **Đường đi an toàn nhất / xác suất** — đổi `min/+` thành `max/×` (đường có tích xác suất lớn nhất).

---

## 8. Truy vết đường đi (path reconstruction)

| Thuật toán | Cấu trúc lưu | Cách truy vết |
|------------|--------------|----------------|
| **Bellman-Ford** | `prev[v]` = đỉnh liền **trước** v | Đi ngược từ đích `t`: `t ← prev[t] ← ... ← src`, rồi đảo ngược |
| **Floyd-Warshall** | `next[i][j]` = đỉnh **kế tiếp** từ i hướng tới j | Đi xuôi từ `i`: lặp `i = next[i][j]` tới khi `i == j` |

Cả hai đã được cài trong code mục 2 (`pathTo`) và mục 5 (`reconstructPath`). Khác biệt: Bellman lưu **một** mảng prev cho một nguồn; Floyd lưu **ma trận** next cho mọi cặp.

> 💡 **Vì sao Floyd dùng `next` thay vì `prev`?** Vì `next[i][k]` (bước đầu tiên từ i về phía k) ghép tự nhiên: khi đường `i→j` đi qua k, bước đầu của `i→j` chính là bước đầu của `i→k`. Cập nhật `next[i][j] = next[i][k]` trong vòng lặp rất gọn.

---

## 9. Transitive closure — biến thể Floyd-Warshall

**Bài toán reachability**: `reach[i][j] = true` nếu có **đường bất kỳ** (không quan tâm độ dài) từ i tới j. Đây là Floyd-Warshall với phép toán đổi:

```
dist = min,  + (cộng)        →   reach = OR (∨),  AND (∧)
reach[i][j] = reach[i][j]  OR  ( reach[i][k] AND reach[k][j] )
```

Nghĩa: i tới được j nếu *đã* tới được, **hoặc** i tới được k **và** k tới được j.

```go
func transitiveClosure(n int, adj [][]bool) [][]bool {
	reach := make([][]bool, n)
	for i := range reach {
		reach[i] = make([]bool, n)
		copy(reach[i], adj[i])
		reach[i][i] = true // đỉnh luôn tới được chính nó
	}
	for k := 0; k < n; k++ { // k ngoài cùng (như Floyd)
		for i := 0; i < n; i++ {
			for j := 0; j < n; j++ {
				if reach[i][k] && reach[k][j] {
					reach[i][j] = true
				}
			}
		}
	}
	return reach
}
```

**Ví dụ**: đồ thị `0→1`, `1→2`. Sau closure: `reach[0][2] = true` (qua k=1). O(V³), giống Floyd.

---

## 10. Cạm bẫy (pitfalls)

### 10.1 Floyd-Warshall: `k` không ở vòng ngoài cùng

**Sai**:
```go
for i := 0; i < n; i++ {
    for j := 0; j < n; j++ {
        for k := 0; k < n; k++ {   // SAI: k trong cùng
            dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j])
        }
    }
}
```
Khi tính `dist[i][j]`, các `dist[i][k]`/`dist[k][j]` chưa xét hết trung gian → **bỏ lỡ đường ngắn hơn**. Đúng phải là `for k → for i → for j`.

### 10.2 Bellman-Ford: thiếu vòng V−1

Chỉ relax 1-2 vòng (tưởng giống BFS) → đường nhiều cạnh chưa lan tới. Phải đủ **V−1** vòng (hoặc dừng sớm khi `changed=false`).

### 10.3 Negative cycle làm "shortest path" vô nghĩa

Nếu có chu trình âm reachable, đừng trả về `dist` như đáp án — nó là −∞. Luôn **kiểm tra & báo** chu trình âm trước khi dùng kết quả.

### 10.4 Int overflow: ∞ + cạnh âm

- Dùng `INF = math.MaxInt` rồi cộng cạnh **dương** → tràn thành âm.
- Hoặc relax từ đỉnh chưa-tới-được (`dist[u]=INF`) với cạnh **âm**: `INF + (−5) < INF` → relax bậy đỉnh không reachable.
- **Khắc phục**: `INF = 1<<30` (cộng vài cạnh vẫn an toàn) **và** luôn kiểm tra `dist[u] != INF` (Bellman) / `dist[i][k] < INF && dist[k][j] < INF` (Floyd) trước khi cộng.

### 10.5 Floyd O(V³) không scale

V=5000 → 1.25×10¹¹ phép tính → quá chậm. Với V lớn + đồ thị thưa, dùng Dijkstra/Bellman từ mỗi đỉnh (Johnson) thay vì Floyd.

### 📝 Tóm tắt mục 10

- Floyd: **`k` ngoài cùng** (sai thứ tự = sai kết quả).
- Bellman: đủ **V−1** vòng.
- Luôn kiểm tra & báo **chu trình âm**.
- Phòng **overflow**: `INF=1<<30` + kiểm tra reachable trước khi cộng.
- Floyd **không scale** V lớn → Johnson.

---

## Bài tập

> Làm xong hãy xem [Lời giải chi tiết](#lời-giải-chi-tiết) bên dưới.

1. **Bellman-Ford shortest path với cạnh âm.** Cho đồ thị có hướng `n` đỉnh, danh sách cạnh `(u, v, w)` (w có thể âm) và nguồn `s`. Tính khoảng cách ngắn nhất từ `s` tới mọi đỉnh. Big-O?

2. **Detect negative cycle.** Cho đồ thị có hướng có thể có cạnh âm. Trả về `true` nếu tồn tại chu trình âm (reachable từ một nguồn cho trước). Mở rộng: phát hiện *mọi* chu trình âm trong đồ thị.

3. **Cheapest flights within K stops** (LeetCode 787). Cho `n` thành phố, danh sách chuyến bay `(from, to, price)`, tìm giá rẻ nhất từ `src` tới `dst` đi qua **tối đa K điểm dừng** (≤ K+1 cạnh). Giải bằng Bellman-Ford bị giới hạn (bounded). Big-O?

4. **Floyd-Warshall all-pairs.** Cho ma trận trọng số (∞ nếu không cạnh), tính ma trận khoảng cách mọi cặp + truy vết một đường cụ thể. Big-O?

5. **Currency arbitrage.** Cho ma trận tỷ giá `rate[i][j]`, xác định có cơ hội arbitrage không (đổi vòng lại lời). Giải thích vì sao đưa về chu trình âm.

6. **Transitive closure.** Cho đồ thị có hướng, tính ma trận `reach[i][j]` (i có tới được j không). So sánh độ phức tạp với chạy BFS/DFS từ mỗi đỉnh.

7. **(Nâng cao) Trích chu trình âm.** Không chỉ phát hiện, mà *liệt kê các đỉnh* trên một chu trình âm. Gợi ý: dùng `prev[]` + đi ngược n bước.

---

## Lời giải chi tiết

### Lời giải 1 — Bellman-Ford shortest path

**Cách tiếp cận**: relax toàn bộ danh sách cạnh, lặp V−1 vòng (dừng sớm nếu không thay đổi). Khởi tạo `dist[s]=0`, còn lại `INF`. Quan trọng: kiểm tra `dist[u]!=INF` trước khi relax.

```go
func solve1(n int, edges []Edge, s int) []int {
	dist := make([]int, n)
	for i := range dist { dist[i] = INF }
	dist[s] = 0
	for i := 0; i < n-1; i++ {
		changed := false
		for _, e := range edges {
			if dist[e.From] != INF && dist[e.From]+e.W < dist[e.To] {
				dist[e.To] = dist[e.From] + e.W
				changed = true
			}
		}
		if !changed { break }
	}
	return dist
}
```

**Độ phức tạp**: O(V·E) thời gian, O(V) bộ nhớ. Với đồ thị walk-through (mục 2): trả `[0,2,7,4,-2]`.

### Lời giải 2 — Detect negative cycle

**Cách tiếp cận**: chạy V−1 vòng như bài 1, rồi chạy **thêm vòng thứ V** — còn relax được thì có chu trình âm. Để bắt **mọi** chu trình âm (không chỉ reachable từ 1 nguồn), khởi tạo `dist[i]=0` cho **mọi** i (tương đương thêm đỉnh ảo nối tới tất cả với cạnh 0).

```go
func solve2(n int, edges []Edge) bool {
	dist := make([]int, n) // tất cả = 0 => bắt mọi chu trình âm
	for i := 0; i < n-1; i++ {
		changed := false
		for _, e := range edges {
			if dist[e.From]+e.W < dist[e.To] {
				dist[e.To] = dist[e.From] + e.W
				changed = true
			}
		}
		if !changed { break }
	}
	for _, e := range edges {     // vòng thứ V
		if dist[e.From]+e.W < dist[e.To] {
			return true
		}
	}
	return false
}
```

**Độ phức tạp**: O(V·E). Lưu ý ở đây mọi đỉnh đều "reachable" (dist khởi tạo 0) nên không cần kiểm tra INF.

### Lời giải 3 — Cheapest flights within K stops

**Cách tiếp cận**: đây là Bellman-Ford **bị giới hạn số vòng** = K+1 (đường đi ≤ K+1 cạnh = ≤ K điểm dừng). Điểm mấu chốt: dùng **bản sao `dist` của vòng trước** để mỗi vòng chỉ thêm *đúng 1 cạnh* (không cho một vòng relax dây chuyền nhiều cạnh).

```go
func findCheapestPrice(n int, flights [][]int, src, dst, K int) int {
	dist := make([]int, n)
	for i := range dist { dist[i] = INF }
	dist[src] = 0
	for i := 0; i <= K; i++ {        // K+1 vòng = tối đa K điểm dừng
		tmp := make([]int, n)
		copy(tmp, dist)              // QUAN TRỌNG: dùng giá trị vòng trước
		for _, f := range flights {
			u, v, w := f[0], f[1], f[2]
			if dist[u] != INF && dist[u]+w < tmp[v] {
				tmp[v] = dist[u] + w
			}
		}
		dist = tmp
	}
	if dist[dst] == INF { return -1 }
	return dist[dst]
}
```

> ⚠ Không dùng bản sao `tmp` → một vòng có thể relax nhiều cạnh liên tiếp → vượt quá K điểm dừng (kết quả sai). Đây là điểm khác biệt với Bellman-Ford thường.

**Độ phức tạp**: O(K·E) thời gian, O(V) bộ nhớ.

### Lời giải 4 — Floyd-Warshall all-pairs

**Cách tiếp cận**: 3 vòng `k→i→j`, công thức `dist[i][j]=min(dist[i][j], dist[i][k]+dist[k][j])`. Lưu `next[][]` để truy vết. Đầy đủ ở code mục 5 (`floydWarshall` + `reconstructPath`).

**Độ phức tạp**: O(V³) thời gian, O(V²) bộ nhớ. Với đồ thị walk-through mục 5: `dist[2]=[3,6,0,1]`, đường `2→1` = `[2,3,0,1]`.

### Lời giải 5 — Currency arbitrage

**Cách tiếp cận**: đặt `w(i→j) = −log(rate[i][j])`. Tích tỷ giá vòng > 1 ⟺ tổng log > 0 ⟺ tổng `−log` < 0 ⟺ **chu trình âm**. Chạy Bellman-Ford phát hiện chu trình âm (code mục 7.1 `detectArbitrage`). Cần epsilon vì float.

**Vì sao đúng**: arbitrage = đổi `c₀→c₁→...→c₀` mà `∏ rate > 1`. Lấy log: `Σ log(rate) > 0`. Nhân −1: `Σ (−log rate) < 0` — đúng định nghĩa chu trình âm. **Độ phức tạp**: O(V·E) = O(V³) với ma trận đầy đủ.

### Lời giải 6 — Transitive closure

**Cách tiếp cận**: Floyd-Warshall biến thể `OR/AND` (code mục 9). 

**So sánh độ phức tạp**: 
- Floyd closure: O(V³), đơn giản, ma trận O(V²).
- BFS/DFS từ mỗi đỉnh: O(V·(V+E)). Với đồ thị **thưa** (E≈V): O(V²) — nhanh hơn Floyd. Với đồ thị **dày** (E≈V²): O(V³) — ngang Floyd nhưng code BFS dài hơn.
- Kết luận: đồ thị nhỏ/dày → Floyd closure gọn; thưa & lớn → BFS từ mỗi đỉnh.

### Lời giải 7 — Trích chu trình âm (nâng cao)

**Cách tiếp cận**: chạy Bellman-Ford với `prev[]`. Ở vòng thứ V, nếu cạnh `(u,v)` còn relax được, đỉnh `v` đi tới được chu trình âm. Đi ngược `prev` từ `v` đúng `n` bước (đảm bảo vào trong vòng), gọi đỉnh đó là `x`. Sau đó đi `prev` từ `x` thu thập đỉnh tới khi gặp lại `x` → đó là chu trình.

```go
func findNegCycle(n int, edges []Edge) []int {
	dist := make([]int, n)
	prev := make([]int, n)
	for i := range prev { prev[i] = -1 }
	var x int = -1
	for i := 0; i < n; i++ {     // n vòng (vòng thứ n bắt chu trình)
		x = -1
		for _, e := range edges {
			if dist[e.From]+e.W < dist[e.To] {
				dist[e.To] = dist[e.From] + e.W
				prev[e.To] = e.From
				x = e.To
			}
		}
	}
	if x == -1 { return nil }    // không có chu trình âm
	for i := 0; i < n; i++ {     // lùi n bước để chắc chắn vào trong chu trình
		x = prev[x]
	}
	cycle := []int{x}
	for v := prev[x]; v != x; v = prev[v] {
		cycle = append(cycle, v)
	}
	// đảo ngược để đúng chiều
	for i, j := 0, len(cycle)-1; i < j; i, j = i+1, j-1 {
		cycle[i], cycle[j] = cycle[j], cycle[i]
	}
	return cycle
}
```

**Độ phức tạp**: O(V·E) (giống Bellman-Ford).

---

## Code & Minh họa

- Toàn bộ code Go ở trên (inline) đều biên dịch và chạy được — copy vào file `main.go` riêng để thử.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Bellman-Ford animator** — đồ thị có cạnh âm, animate relax tất cả cạnh qua từng vòng, bảng `dist` cập nhật.
  2. **Floyd-Warshall** — ma trận khoảng cách, animate qua từng đỉnh trung gian `k`, tô ô vừa cập nhật.
  3. **Negative cycle / arbitrage** — đồ thị có chu trình âm, highlight khi phát hiện.

---

## Bài tiếp theo

- [Lesson 35 — Cây khung nhỏ nhất (MST): Kruskal & Prim](../lesson-35-mst-kruskal-prim/) — chuyển từ "đường ngắn nhất" sang "nối tất cả đỉnh với tổng trọng số nhỏ nhất".

## Tham khảo

- CLRS — *Introduction to Algorithms*, chương 24 (Single-Source Shortest Paths) & 25 (All-Pairs Shortest Paths).
- [Lesson 33 — Dijkstra](../lesson-33-dijkstra/) (tiền đề trực tiếp).
