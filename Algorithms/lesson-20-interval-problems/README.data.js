// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-20-interval-problems/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 20 — Interval Problems (Greedy trên khoảng)

> Tier 3 — Greedy · Bài 20/22
> Trước: [Lesson 19 — Greedy Fundamentals](../lesson-19-greedy-fundamentals/) · Sau: [Lesson 21 — Huffman Encoding](../lesson-21-huffman-encoding/)

Rất nhiều bài toán thực tế phát biểu dưới dạng **khoảng (interval)**: lịch họp \`[bắt đầu, kết thúc]\`, đoạn phim cần chiếu, đoạn bộ nhớ bị chiếm, đoạn thời gian một CPU bận. Phần lớn những bài này có một điểm chung đẹp đẽ: **sort theo đúng tiêu chí rồi quét một lượt greedy là xong**. Mấu chốt — và cũng là chỗ dễ sai nhất — là *chọn tiêu chí sort nào*.

Bài này đi qua nguyên một "họ" bài toán interval kinh điển (activity selection, merge, insert, non-overlapping, burst balloons, meeting rooms) và rút ra một bảng quyết định: **bài nào sort theo \`end\`, bài nào sort theo \`start\`, bài nào cần sweep line / heap**.

---

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Nhận ra một bài toán là "interval problem" và quy nó về một trong vài khuôn mẫu chuẩn.
- Hiểu **vì sao** activity selection sort theo \`end\` (chứng minh exchange argument đầy đủ, không "dễ thấy").
- Phân biệt 3 nhóm tiêu chí: **maximize count → sort \`end\`**, **merge/gộp → sort \`start\`**, **min tài nguyên đồng thời → sweep line / min-heap**.
- Cài đặt thành thạo bằng Go: activity selection, merge intervals, non-overlapping, min arrows, meeting rooms II.
- Tránh được 4 cạm bẫy: sort sai tiêu chí, biên đóng/mở \`[a,b]\` vs \`[a,b)\`, off-by-one ở điều kiện overlap, và quên sort.

## Kiến thức tiền đề

- [Lesson 19 — Greedy Fundamentals](../lesson-19-greedy-fundamentals/): greedy-choice property, exchange argument. Bài này áp dụng trực tiếp những kỹ thuật chứng minh đó.
- [Lesson 06 — Elementary Sorts](../lesson-06-elementary-sorts/) và [Lesson 07 — Merge Sort](../lesson-07-merge-sort/): mọi thuật toán ở đây bắt đầu bằng một bước sort $O(n \\log n)$.
- [Lesson 09 — Heap Sort](../lesson-09-heap-sort/) (và \`DataStructures\` heap): meeting rooms II dùng **min-heap**. Nếu chưa nắm heap, đọc qua phần "lấy min trong $O(\\log n)$".

---

## 1. Vì sao interval + greedy đi đôi với nhau

> 💡 **Trực giác.** Hãy tưởng tượng bạn là một người quản lý phòng học chỉ có **một** phòng. Có 10 lớp muốn dùng, mỗi lớp có giờ bắt đầu và giờ kết thúc cố định. Bạn muốn xếp được **càng nhiều lớp càng tốt**. Bản năng nói: "ưu tiên lớp nào *xong sớm nhất* để phòng trống lại nhanh, đón lớp tiếp theo." Đó chính là greedy — và nó *đúng*. Cả bài này là biến tấu của trực giác "giải phóng tài nguyên sớm" này.

Một interval là một cặp \`[s, e]\` với $s \\leq e$ (start, end). Hai interval **chồng nhau (overlap)** nếu chúng có điểm chung. Đa số bài toán interval thuộc vào một trong các dạng:

| Dạng bài | Câu hỏi | Tiêu chí sort |
|----------|---------|---------------|
| Maximize số khoảng không chồng | "Chọn được nhiều nhất bao nhiêu khoảng đôi một không đè nhau?" | theo \`end\` ↑ |
| Merge | "Gộp các khoảng chồng nhau thành ít khoảng nhất" | theo \`start\` ↑ |
| Min xóa để hết chồng | "Bỏ ít khoảng nhất để phần còn lại không chồng" | theo \`end\` ↑ (= maximize) |
| Min mũi tên / điểm xuyên | "Ít điểm nhất để mỗi khoảng bị chạm ≥ 1 lần" | theo \`end\` ↑ |
| Min tài nguyên đồng thời | "Cần ít nhất bao nhiêu phòng để chạy song song?" | sweep line / heap theo \`start\` |

Điểm chung: **sau khi sort đúng, một lượt quét tuyến tính là đủ**. Chi phí bị chi phối bởi sort: $O(n \\log n)$. Cái khó không phải code mà là *chứng minh tiêu chí greedy đúng* và *chọn đúng tiêu chí*.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tại sao greedy lại đúng ở đây mà ở coin change thì không?"* → Vì các bài này có **greedy-choice property**: lựa chọn tốt nhất tại mỗi bước (vd "kết thúc sớm nhất") luôn nằm trong *một* lời giải tối ưu nào đó. Ta sẽ chứng minh bằng exchange argument ở mục 2. Coin change tổng quát không có tính chất này (xem Lesson 22).
> - *"Có cần DP không?"* → Không. DP cũng giải được nhưng $O(n^2)$ hoặc tệ hơn; greedy cho $O(n \\log n)$ và đơn giản hơn nhiều.

> 📝 **Tóm tắt mục 1.**
> - Interval = \`[s, e]\`. Hai khoảng overlap nếu có điểm chung.
> - Hầu hết bài interval = sort + quét greedy = $O(n \\log n)$.
> - 3 nhóm tiêu chí: maximize count → \`end\`; merge → \`start\`; min tài nguyên → sweep/heap.
> - Cái khó là chọn đúng tiêu chí và chứng minh, không phải code.

---

## 2. Activity Selection (Interval Scheduling Maximization)

**Bài toán.** Cho \`n\` hoạt động, hoạt động thứ \`i\` có \`[s_i, e_i)\`. Một phòng/CPU chỉ chạy được một hoạt động tại một thời điểm. Chọn **tập con lớn nhất** các hoạt động đôi một không chồng nhau. Ta dùng biên nửa mở \`[s, e)\`: hoạt động kết thúc đúng lúc \`t\` và hoạt động khác bắt đầu đúng lúc \`t\` **không** coi là chồng (phòng giải phóng tức thì).

> 💡 **Trực giác.** "Ưu tiên cái kết thúc sớm nhất." Mỗi khi chọn một hoạt động xong sớm, ta để lại **nhiều thời gian nhất** cho phần còn lại — không hoạt động nào khác có thể cho ta nhiều dư địa hơn.

### 2.1 Thuật toán greedy

1. Sort hoạt động theo \`end\` tăng dần.
2. Duyệt từ trái sang. Giữ biến \`lastEnd\` = thời điểm kết thúc của hoạt động vừa chọn (khởi tạo \`-∞\`).
3. Với mỗi hoạt động \`[s, e)\`: nếu \`s ≥ lastEnd\` (tương thích) → **chọn**, cập nhật \`lastEnd = e\`. Ngược lại → **bỏ**.

### 2.2 Walk-through bằng số cụ thể

6 hoạt động (đánh số gốc A–F):

| ID | start | end |
|----|------|-----|
| A | 1 | 4 |
| B | 3 | 5 |
| C | 0 | 6 |
| D | 5 | 7 |
| E | 3 | 9 |
| F | 5 | 9 |

**Bước 1 — sort theo \`end\`:** A(1,4), B(3,5), C(0,6), D(5,7), E(3,9), F(5,9).

**Bước 2 — quét** với \`lastEnd = -∞\`:

| Xét | s ≥ lastEnd? | Quyết định | lastEnd mới | Tập đã chọn |
|-----|--------------|------------|-------------|-------------|
| A(1,4) | 1 ≥ −∞ ✓ | chọn | 4 | {A} |
| B(3,5) | 3 ≥ 4 ✗ | bỏ | 4 | {A} |
| C(0,6) | 0 ≥ 4 ✗ | bỏ | 4 | {A} |
| D(5,7) | 5 ≥ 4 ✓ | chọn | 7 | {A,D} |
| E(3,9) | 3 ≥ 7 ✗ | bỏ | 7 | {A,D} |
| F(5,9) | 5 ≥ 7 ✗ | bỏ | 7 | {A,D} |

Kết quả: **{A, D}**, chọn được **2** hoạt động. Có thể kiểm tra tay: không cách nào chọn được 3 hoạt động đôi một rời nhau trong tập này.

### 2.3 Code Go

\`\`\`go
package main

import (
	"fmt"
	"sort"
)

type Interval struct{ S, E int }

// activitySelection trả về số hoạt động tối đa chọn được + danh sách chọn.
// Quy ước biên nửa mở [s, e): chạm đầu-cuối KHÔNG tính overlap.
func activitySelection(acts []Interval) (int, []Interval) {
	// Sort theo END tăng dần — đây là mấu chốt.
	sort.Slice(acts, func(i, j int) bool { return acts[i].E < acts[j].E })

	count := 0
	lastEnd := -1 << 62 // -vô cùng
	chosen := []Interval{}
	for _, a := range acts {
		if a.S >= lastEnd { // tương thích: bắt đầu sau khi cái trước kết thúc
			count++
			lastEnd = a.E
			chosen = append(chosen, a)
		}
	}
	return count, chosen
}

func main() {
	acts := []Interval{{1, 4}, {3, 5}, {0, 6}, {5, 7}, {3, 9}, {5, 9}}
	n, picked := activitySelection(acts)
	fmt.Println("Số tối đa:", n)   // 2
	fmt.Println("Chọn:", picked)   // [{1 4} {5 7}]
}
\`\`\`

Độ phức tạp: **$O(n \\log n)$** (sort) $+ O(n)$ (quét) $= O(n \\log n)$. Bộ nhớ $O(n)$ cho danh sách chọn (hoặc $O(1)$ nếu chỉ cần đếm).

### 2.4 Chứng minh đúng (exchange argument)

Ta chứng minh: **luôn tồn tại một lời giải tối ưu chứa hoạt động kết thúc sớm nhất.** Từ đó greedy đúng bằng quy nạp.

Gọi $g$ = hoạt động có \`end\` nhỏ nhất (cái đầu tiên greedy chọn). Lấy $OPT$ là một lời giải tối ưu bất kỳ, sắp các hoạt động trong $OPT$ theo \`end\` tăng dần, gọi phần tử đầu là $o$.

- Nếu $o = g$: xong, $OPT$ đã chứa $g$.
- Nếu $o \\neq g$: vì $g$ có end nhỏ nhất toàn cục nên $e_g \\leq e_o$. Thay $o$ bằng $g$ trong $OPT$ để được tập $OPT'$. Ta khẳng định $OPT'$ vẫn hợp lệ (đôi một không chồng):
  - $g$ so với mọi hoạt động $x$ còn lại trong $OPT$ (tức $x$ đứng *sau* $o$): vì $OPT$ hợp lệ và sắp theo end, $s_x \\geq e_o \\geq e_g$, nên $g$ không chồng $x$. (Bước này **không** lươn lẹo: $s_x \\geq e_o$ do $x$ đứng sau $o$ và $OPT$ không chồng; $e_o \\geq e_g$ do $g$ end nhỏ nhất.)
  - $g$ không trùng $o$ nên việc thay 1-đổi-1 giữ nguyên kích thước: $|OPT'| = |OPT|$.
- Vậy $OPT'$ cũng tối ưu **và** chứa $g$.

Sau khi cố định $g$, mọi hoạt động chồng $g$ bị loại; bài toán thu về cùng dạng trên tập hoạt động bắt đầu $\\geq e_g$. Quy nạp trên kích thước bài toán ⇒ greedy cho lời giải tối ưu. ∎

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Nếu thêm hoạt động \`G(7, 8)\` vào tập 2.2, kết quả greedy là gì?
> 2. Trong chứng minh, vì sao ta cần \`g\` có *end* nhỏ nhất chứ không phải *start* nhỏ nhất?
>
> <details><summary>Đáp án</summary>
>
> 1. Sau khi chọn {A(1,4), D(5,7)} có \`lastEnd = 7\`; \`G(7,8)\` có $7 \\geq 7$ ✓ (biên nửa mở) → chọn → **{A, D, G}**, 3 hoạt động.
> 2. Vì lập luận "thay $o$ bằng $g$ mà vẫn hợp lệ" dựa vào $e_g \\leq e_o$ (g xong sớm hơn nên không đụng những cái sau $o$). Nếu chọn theo start nhỏ nhất, cái đó có thể end rất muộn (vd \`C(0,6)\`) và chặn mất nhiều cái khác — phản ví dụ ở mục 3.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Activity selection = chọn nhiều khoảng rời nhau nhất.
> - Greedy: sort theo \`end\`, chọn cái tương thích đầu tiên, lặp.
> - $O(n \\log n)$. Đúng nhờ exchange argument: tồn tại OPT chứa cái end-nhỏ-nhất.

---

## 3. Vì sao sort theo \`end\`, không phải \`start\` hay \`duration\`

Đây là chỗ người mới sai nhiều nhất. Ba tiêu chí "nghe hợp lý" nhưng chỉ một đúng.

### 3.1 Phản ví dụ — sort theo \`start\` (sai)

Tập: \`X(0, 10), Y(1, 2), Z(3, 4)\`.

- Sort theo start: \`X(0,10), Y(1,2), Z(3,4)\`.
- Greedy chọn \`X\` trước (start nhỏ nhất) → \`lastEnd = 10\` → \`Y, Z\` đều \`start < 10\` → bỏ. **Chỉ chọn 1.**
- Tối ưu thật: \`{Y, Z}\` = **2** hoạt động. → sort start **sai**.

Lý do: cái bắt đầu sớm có thể kéo dài rất lâu (\`X\`), ăn hết phòng.

### 3.2 Phản ví dụ — sort theo \`duration\` (cũng sai)

Ý tưởng "chọn cái ngắn nhất trước" nghe rất hợp lý nhưng vẫn sai.

Tập: \`P(1, 5)\` (dài 4), \`Q(4, 6)\` (dài 2), \`R(5, 9)\` (dài 4).

- Sort theo duration: \`Q(4,6)\` ngắn nhất → chọn \`Q\` → \`lastEnd = 6\`.
- \`P(1,5)\`: chồng \`Q\` (vì \`1 < 6\` và \`5 > 4\`) → bỏ. \`R(5,9)\`: \`start 5 < 6\` → bỏ. **Chỉ chọn 1 (Q).**
- Tối ưu thật: \`{P(1,5), R(5,9)}\` = **2**. → sort duration **sai**.

Lý do: cái ngắn nằm *giữa* có thể chặn hai cái dài hai bên mà nếu loại nó đi ta lấy được cả hai.

### 3.3 Vì sao \`end\` đúng

Đã chứng minh ở 2.4. Trực giác lại: chọn cái **xong sớm nhất** để lại nhiều thời gian nhất cho phần còn lại — không tiêu chí nào cho dư địa lớn hơn. \`start\` và \`duration\` không có tính chất "để lại nhiều dư địa nhất".

> ⚠ **Lỗi thường gặp.** Mặc định gõ \`sort.Slice(..., a[i].S < a[j].S)\` (sort theo start) cho activity selection vì "trực giác đời thường là làm theo thứ tự thời gian bắt đầu". Sai. Maximize count luôn sort theo **end**.

> 📝 **Tóm tắt mục 3.** Sort \`start\` chết vì cái-bắt-đầu-sớm có thể rất dài; sort \`duration\` chết vì cái-ngắn-ở-giữa chặn hai cái hai bên. Chỉ \`end\` cho greedy tối ưu cho bài maximize count.

---

## 4. Merge Intervals (gộp khoảng chồng nhau)

**Bài toán.** Cho danh sách khoảng có thể chồng nhau, gộp tất cả những khoảng giao/chạm nhau thành các khoảng rời rạc tối thiểu. Ví dụ kinh điển: \`[[1,3],[2,6],[8,10],[15,18]]\` → \`[[1,6],[8,10],[15,18]]\`.

> 💡 **Trực giác.** Sắp các khoảng theo điểm bắt đầu rồi đi từ trái sang phải như "tô màu trục số": nếu khoảng mới *đè lên hoặc chạm* phần đang tô thì nới phần tô ra; nếu rời hẳn thì chốt phần cũ và mở phần mới.

### 4.1 Thuật toán

1. Sort theo \`start\` tăng dần.
2. Khởi tạo \`result\` rỗng. Với mỗi khoảng \`[s, e]\`:
   - Nếu \`result\` rỗng **hoặc** \`s > result.last.E\` (rời hẳn) → append \`[s, e]\` mới.
   - Ngược lại (chồng/chạm) → mở rộng: \`result.last.E = max(result.last.E, e)\`.

Lưu ý ở merge ta dùng biên **đóng** \`[a, b]\`: \`[1,3]\` và \`[3,6]\` *chạm* tại 3 → vẫn gộp. Vì thế điều kiện rời là \`s > last.E\` (dấu \`>\` chứ không \`≥\`).

### 4.2 Walk-through \`[[1,3],[2,6],[8,10],[15,18]]\`

Sort theo start (đã sẵn sorted): \`[1,3], [2,6], [8,10], [15,18]\`.

| Xét | result.last | s > last.E ? | Hành động | result sau |
|-----|-------------|--------------|-----------|------------|
| [1,3] | — | (rỗng) | thêm mới | \`[[1,3]]\` |
| [2,6] | [1,3] | 2 > 3 ✗ | merge: E = max(3,6)=6 | \`[[1,6]]\` |
| [8,10] | [1,6] | 8 > 6 ✓ | thêm mới | \`[[1,6],[8,10]]\` |
| [15,18] | [8,10] | 15 > 10 ✓ | thêm mới | \`[[1,6],[8,10],[15,18]]\` |

Kết quả: **\`[[1,6],[8,10],[15,18]]\`** ✓.

Ví dụ thứ hai (bao trùm): \`[[1,4],[2,3]]\` → sort sẵn → \`[2,3]\` có \`2 > 4 ✗\` → merge \`E = max(4,3) = 4\` → \`[[1,4]]\`. Chú ý \`max\` ở đây quan trọng: nếu chỉ gán \`E = 3\` ta sẽ thu nhỏ sai.

### 4.3 Code Go

\`\`\`go
// mergeIntervals gộp các khoảng chồng/chạm nhau. Biên ĐÓNG [a,b].
func mergeIntervals(iv []Interval) []Interval {
	if len(iv) == 0 {
		return nil
	}
	// Sort theo START tăng dần.
	sort.Slice(iv, func(i, j int) bool { return iv[i].S < iv[j].S })

	res := []Interval{iv[0]}
	for _, cur := range iv[1:] {
		last := &res[len(res)-1]
		if cur.S > last.E { // rời hẳn (dùng '>' vì biên đóng, chạm = gộp)
			res = append(res, cur)
		} else if cur.E > last.E { // chồng: nới biên phải ra, nhớ dùng max
			last.E = cur.E
		}
		// else: cur nằm gọn trong last, không làm gì
	}
	return res
}
\`\`\`

$O(n \\log n)$. **Chứng minh đúng** ngắn gọn: sau khi sort theo start, mọi khoảng chồng nhau tạo thành một "cụm" liên tục trong dãy (nếu $B$ chồng $A$ mà $A$ đứng trước thì $s_B \\leq e_A$; mọi khoảng sau $B$ có start $\\geq s_B$, nên cụm chồng nhau luôn liền kề). Một lượt quét gộp đúng từng cụm. ∎

> ⚠ **Lỗi thường gặp.** Viết \`last.E = cur.E\` mà quên \`max\`. Với \`[[1,5],[2,3]]\`, khoảng \`[2,3]\` chồng \`[1,5]\`; nếu gán thẳng \`E = 3\` → thu nhỏ khoảng còn \`[1,3]\` (mất \`[3,5]\`). Phải \`E = max(E, cur.E)\`.

> 📝 **Tóm tắt mục 4.** Merge: sort theo **start**, quét, gộp khi \`s ≤ last.E\`, nới biên bằng \`max\`. $O(n \\log n)$.

---

## 5. Insert Interval (chèn một khoảng vào danh sách đã sorted)

**Bài toán.** Cho danh sách khoảng **đã sort theo start và không chồng nhau**, chèn thêm \`newIv = [s, e]\` rồi merge nếu cần. Ví dụ: chèn \`[4,8]\` vào \`[[1,2],[3,5],[6,7],[8,10],[12,16]]\` → \`[[1,2],[3,10],[12,16]]\`.

> 💡 **Trực giác.** Vì danh sách đã sorted, ta chia làm 3 pha quét tuyến tính, **không cần sort lại** ($O(n)$): (1) copy hết khoảng nằm hoàn toàn *trước* newIv; (2) nuốt mọi khoảng chồng newIv vào thành một khoảng to; (3) copy hết khoảng nằm hoàn toàn *sau*.

### 5.1 Thuật toán (3 pha)

1. **Trước:** trong khi \`iv[i].E < newIv.S\` → push \`iv[i]\`, \`i++\`. (khoảng kết thúc trước khi newIv bắt đầu, không chồng.)
2. **Merge:** trong khi \`iv[i].S <= newIv.E\` → mở rộng \`newIv\`: \`S = min(S, iv[i].S)\`, \`E = max(E, iv[i].E)\`, \`i++\`. Cuối pha push \`newIv\`.
3. **Sau:** push hết phần còn lại.

### 5.2 Walk-through chèn \`[4,8]\` vào \`[[1,2],[3,5],[6,7],[8,10],[12,16]]\`

- **Pha trước:** \`[1,2]\` có \`2 < 4 ✓\` → push. \`[3,5]\` có \`5 < 4 ✗\` → dừng. \`res = [[1,2]]\`.
- **Pha merge** (newIv = [4,8]):
  - \`[3,5]\`: \`3 ≤ 8 ✓\` → newIv = \`[min(4,3), max(8,5)] = [3,8]\`.
  - \`[6,7]\`: \`6 ≤ 8 ✓\` → newIv = \`[min(3,6), max(8,7)] = [3,8]\`.
  - \`[8,10]\`: \`8 ≤ 8 ✓\` (chạm = chồng, biên đóng) → newIv = \`[3, max(8,10)] = [3,10]\`.
  - \`[12,16]\`: \`12 ≤ 10 ✗\` → dừng. push newIv → \`res = [[1,2],[3,10]]\`.
- **Pha sau:** push \`[12,16]\` → \`res = [[1,2],[3,10],[12,16]]\` ✓.

### 5.3 Code Go

\`\`\`go
// insertInterval chèn newIv vào iv (đã sort theo start, rời nhau). Biên ĐÓNG.
func insertInterval(iv []Interval, newIv Interval) []Interval {
	res := []Interval{}
	i, n := 0, len(iv)

	// Pha 1: các khoảng kết thúc TRƯỚC khi newIv bắt đầu.
	for i < n && iv[i].E < newIv.S {
		res = append(res, iv[i])
		i++
	}
	// Pha 2: các khoảng chồng newIv -> nuốt vào.
	for i < n && iv[i].S <= newIv.E {
		if iv[i].S < newIv.S {
			newIv.S = iv[i].S
		}
		if iv[i].E > newIv.E {
			newIv.E = iv[i].E
		}
		i++
	}
	res = append(res, newIv)
	// Pha 3: phần còn lại.
	for i < n {
		res = append(res, iv[i])
		i++
	}
	return res
}
\`\`\`

$O(n)$ thời gian (không sort lại vì input đã sorted), $O(n)$ bộ nhớ kết quả.

> ❓ **Câu hỏi tự nhiên.** *"Nếu input chưa sorted thì sao?"* → Khi đó đây không còn là bài "insert" nữa; gom \`newIv\` vào danh sách rồi gọi luôn \`mergeIntervals\` (mục 4) với $O(n \\log n)$. Bài "insert" chỉ nhanh hơn được nhờ giả thiết đã sorted.

> 📝 **Tóm tắt mục 5.** Insert vào danh sách đã sorted: 3 pha (trước / nuốt-chồng / sau), $O(n)$, không cần sort lại.

---

## 6. Non-overlapping Intervals (xóa ít nhất bao nhiêu để hết chồng)

**Bài toán (LeetCode 435).** Cho \`n\` khoảng, xóa **ít nhất** bao nhiêu khoảng để phần còn lại đôi một không chồng?

> 💡 **Trực giác.** "Xóa ít nhất để hết chồng" = "**giữ nhiều nhất** mà không chồng" = đúng bài **activity selection**! Đáp số = \`n − (số khoảng tối đa giữ được)\`.

Ở đây overlap dùng biên **nửa mở** \`[s, e)\` giống mục 2: chạm đầu-cuối *không* tính chồng (LeetCode 435 quy ước vậy — \`[1,2]\` và \`[2,3]\` không chồng).

### 6.1 Code Go

\`\`\`go
// eraseOverlapIntervals trả về SỐ khoảng tối thiểu phải xóa.
// Biên nửa mở [s,e): chạm đầu-cuối KHÔNG tính overlap.
func eraseOverlapIntervals(iv []Interval) int {
	if len(iv) == 0 {
		return 0
	}
	// Sort theo END tăng (vì bản chất là activity selection).
	sort.Slice(iv, func(i, j int) bool { return iv[i].E < iv[j].E })

	kept := 1            // giữ cái đầu tiên (end nhỏ nhất)
	lastEnd := iv[0].E
	for _, cur := range iv[1:] {
		if cur.S >= lastEnd { // không chồng -> giữ
			kept++
			lastEnd = cur.E
		}
		// chồng -> bỏ (tức "xóa")
	}
	return len(iv) - kept
}
\`\`\`

### 6.2 Walk-through \`[[1,2],[2,3],[3,4],[1,3]]\` → kỳ vọng xóa 1

Sort theo end: \`[1,2](e=2), [1,3](e=3), [2,3](e=3), [3,4](e=4)\`. (\`[1,3]\` và \`[2,3]\` cùng e=3, thứ tự nội bộ không ảnh hưởng kết quả.)

| Xét | s ≥ lastEnd? | kept | lastEnd |
|-----|--------------|------|---------|
| [1,2] | (cái đầu) | 1 | 2 |
| [1,3] | 1 ≥ 2 ✗ | 1 | 2 |
| [2,3] | 2 ≥ 2 ✓ | 2 | 3 |
| [3,4] | 3 ≥ 3 ✓ | 3 | 4 |

\`kept = 3\`, \`n = 4\` → xóa \`4 − 3 = 1\` ✓ (xóa \`[1,3]\`).

$O(n \\log n)$. Tính đúng kế thừa trực tiếp từ chứng minh mục 2.4.

> ⚠ **Lỗi thường gặp.** Dùng \`cur.S > lastEnd\` (dấu \`>\`) ở bài 435 → coi \`[1,2]\` và \`[2,3]\` là chồng → xóa nhầm. LeetCode 435 quy ước chạm-không-chồng nên phải \`>=\`. *Luôn đọc kỹ đề về biên.*

> 📝 **Tóm tắt mục 6.** Min xóa = $n$ − \`activitySelection\`. Sort theo end, đếm số giữ được. $O(n \\log n)$.

---

## 7. Minimum Arrows to Burst Balloons (LeetCode 452)

**Bài toán.** Mỗi quả bóng là một khoảng \`[s, e]\` *theo trục x*. Một mũi tên bắn dọc tại $x = p$ làm nổ mọi bóng có $s \\leq p \\leq e$. Tìm **ít mũi tên nhất** để nổ hết.

> 💡 **Trực giác.** Đây là bài "ít điểm nhất để mỗi khoảng bị chạm" (hitting set 1 chiều). Lại là họ-hàng activity selection: sort theo \`end\`, bắn mũi tên đúng tại \`end\` của khoảng đầu tiên chưa nổ — nó nổ luôn mọi khoảng kế tiếp còn phủ điểm đó.

Khác mục 6: ở đây biên **đóng** \`[s, e]\`, và bóng chạm nhau (\`[1,2]\`,\`[2,3]\` chạm tại 2) thì **một** mũi tên tại $x=2$ nổ cả hai. Nên điều kiện "cùng nổ" là \`s ≤ arrowPos\`.

### 7.1 Thuật toán

1. Sort theo \`end\` tăng.
2. \`arrows = 0\`, \`arrowPos = -∞\`.
3. Với mỗi bóng \`[s, e]\`: nếu \`s > arrowPos\` → cần mũi tên mới: \`arrows++\`, \`arrowPos = e\`. (Đặt mũi tên ở \`end\` để phủ tối đa các bóng sau.) Ngược lại bóng đã bị mũi tên hiện tại nổ.

### 7.2 Walk-through \`[[10,16],[2,8],[1,6],[7,12]]\` → kỳ vọng 2

Sort theo end: \`[1,6](e=6), [2,8](e=8), [7,12](e=12), [10,16](e=16)\`.

| Xét | s > arrowPos? | Hành động | arrows | arrowPos |
|-----|---------------|-----------|--------|----------|
| [1,6] | 1 > −∞ ✓ | bắn mới tại 6 | 1 | 6 |
| [2,8] | 2 > 6 ✗ | đã nổ (2 ≤ 6 ≤ 8) | 1 | 6 |
| [7,12] | 7 > 6 ✓ | bắn mới tại 12 | 2 | 12 |
| [10,16] | 10 > 12 ✗ | đã nổ | 2 | 12 |

Kết quả **2 mũi tên** ✓ (tại x=6 và x=12).

### 7.3 Code Go

\`\`\`go
// findMinArrows: ít mũi tên nhất để nổ hết bóng [s,e] (biên ĐÓNG).
func findMinArrows(balloons []Interval) int {
	if len(balloons) == 0 {
		return 0
	}
	sort.Slice(balloons, func(i, j int) bool { return balloons[i].E < balloons[j].E })

	arrows := 0
	arrowPos := -1 << 62
	for _, b := range balloons {
		if b.S > arrowPos { // bóng này chưa bị mũi tên nào phủ -> cần mũi tên mới
			arrows++
			arrowPos = b.E // đặt tại end để phủ tối đa các bóng tiếp theo
		}
	}
	return arrows
}
\`\`\`

$O(n \\log n)$. **Chứng minh đúng:** Xét bóng có end nhỏ nhất, gọi $b$. Mọi mũi tên nổ $b$ phải nằm trong $[s_b, e_b]$. Đặt mũi tên đúng tại $e_b$ *trội* mọi vị trí khác (phủ tập bóng $\\supseteq$ bất kỳ vị trí nào khác trong $[s_b, e_b]$, vì bóng nào có $s \\leq e_b \\leq e$ đều bị phủ). Exchange argument y hệt mục 2.4 ⇒ greedy tối ưu. ∎

> ⚠ **Lỗi thường gặp.** Dùng \`s >= arrowPos\` (thay vì \`>\`) ở bài 452 → coi bóng chỉ *chạm* tại điểm bắn là chưa nổ → đếm thừa mũi tên. Biên đóng + một điểm nổ mọi bóng chứa nó ⇒ điều kiện cần mũi tên mới là \`s > arrowPos\`. (Đối lập với bài 435 ở mục 6 — chú ý sự khác biệt biên!)

> 📝 **Tóm tắt mục 7.** Min arrows: sort theo end, bắn tại end của bóng chưa nổ đầu tiên. $O(n \\log n)$. Biên đóng → điều kiện \`s > arrowPos\`.

---

## 8. Meeting Rooms (I & II)

### 8.1 Meeting Rooms I — có dự được hết không?

**Bài toán.** Cho lịch họp \`[s, e)\`, một người chỉ dự được 1 cuộc mỗi lúc. Hỏi **có thể dự hết** không (tức không có 2 cuộc nào chồng)?

> 💡 **Trực giác.** Sort theo start; nếu cuộc sau bắt đầu *trước* khi cuộc trước kết thúc thì chồng → không dự hết được.

\`\`\`go
// canAttendAll: true nếu KHÔNG có 2 cuộc chồng nhau. Biên nửa mở [s,e).
func canAttendAll(meetings []Interval) bool {
	sort.Slice(meetings, func(i, j int) bool { return meetings[i].S < meetings[j].S })
	for i := 1; i < len(meetings); i++ {
		if meetings[i].S < meetings[i-1].E { // bắt đầu trước khi cái trước xong -> chồng
			return false
		}
	}
	return true
}
\`\`\`

$O(n \\log n)$. Walk-through \`[[0,30],[5,10],[15,20]]\`: sort sẵn; \`[5,10]\` có \`5 < 30 ✓ chồng\` → \`false\`. Còn \`[[7,10],[2,4]]\`: sort → \`[2,4],[7,10]\`; \`7 < 4 ✗\` → \`true\`.

### 8.2 Meeting Rooms II — cần ít nhất bao nhiêu phòng?

**Bài toán (LeetCode 253).** Cho lịch họp, hỏi **số phòng tối thiểu** để tất cả diễn ra song song được. Đáp số = **số cuộc chồng nhau lớn nhất tại một thời điểm** (max concurrency).

> 💡 **Trực giác.** Mỗi cuộc cần một phòng *trong suốt thời gian nó chạy*. Tại thời điểm đông nhất có \`k\` cuộc đang chạy đồng thời thì cần đúng \`k\` phòng — không hơn (vì các cuộc khác đã rời phòng) không kém (vì \`k\` cuộc đó phải ở \`k\` phòng khác nhau).

**Cách A — min-heap end time.** Sort theo start. Duyệt từng cuộc; heap lưu thời điểm-kết-thúc của các phòng đang bận. Trước khi xếp cuộc mới: nếu phòng có end-time nhỏ nhất (đỉnh heap) \`≤ start\` cuộc mới → phòng đó đã trống, pop ra (tái dùng). Rồi push end cuộc mới. **Kích thước heap lúc đông nhất = số phòng.**

\`\`\`go
import "container/heap"

// minHeap các thời điểm kết thúc.
type minHeap []int
func (h minHeap) Len() int            { return len(h) }
func (h minHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x any)         { *h = append(*h, x.(int)) }
func (h *minHeap) Pop() any {
	old := *h
	n := len(old)
	v := old[n-1]
	*h = old[:n-1]
	return v
}

// minMeetingRoomsHeap: số phòng tối thiểu. Biên nửa mở [s,e).
func minMeetingRoomsHeap(meetings []Interval) int {
	if len(meetings) == 0 {
		return 0
	}
	sort.Slice(meetings, func(i, j int) bool { return meetings[i].S < meetings[j].S })

	h := &minHeap{}
	heap.Init(h)
	rooms := 0
	for _, m := range meetings {
		// Tái dùng MỌI phòng đã trống trước khi m bắt đầu.
		for h.Len() > 0 && (*h)[0] <= m.S { // <= vì biên nửa mở: end==start là OK
			heap.Pop(h)
		}
		heap.Push(h, m.E) // m chiếm 1 phòng tới m.E
		if h.Len() > rooms {
			rooms = h.Len() // cao điểm = số phòng cần
		}
	}
	return rooms
}
\`\`\`

**Cách B — sweep line (xem mục 9).** Tách mỗi cuộc thành 2 event \`(+1 tại start, −1 tại end)\`, sort, quét cộng dồn, lấy max. Đây là cách tổng quát hơn.

### 8.3 Walk-through \`[[0,30],[5,10],[15,20]]\` → kỳ vọng 2 phòng

**Cách A (heap), sort theo start \`[0,30],[5,10],[15,20]\`:**

| Xét | pop (end ≤ start)? | push end | heap sau | rooms |
|-----|--------------------|----------|----------|-------|
| [0,30] | đỉnh? heap rỗng | 30 | {30} | 1 |
| [5,10] | 30 ≤ 5 ✗ | 10 | {10,30} | 2 |
| [15,20] | 10 ≤ 15 ✓ pop 10 | 20 | {20,30} | 2 |

\`rooms = 2\` ✓.

**Cách B (sweep) cùng input:** events = \`(0,+1),(30,−1),(5,+1),(10,−1),(15,+1),(20,−1)\`. Sort theo thời điểm (tie: \`−1\` trước \`+1\` vì biên nửa mở — phòng trả trước khi cuộc mới vào):

\`(0,+1)→1\`, \`(5,+1)→2\`, \`(10,−1)→1\`, \`(15,+1)→2\`, \`(20,−1)→1\`, \`(30,−1)→0\`. Max = **2** ✓.

> ❓ **Câu hỏi tự nhiên.** *"Heap hay sweep line nhanh hơn?"* → Cùng $O(n \\log n)$ (heap: n thao tác $\\log n$; sweep: sort $2n$ event). Sweep dễ mở rộng (vd "tại mỗi thời điểm có bao nhiêu cuộc"), heap trực giác hơn cho "tái dùng phòng". *"Tie-break event sao cho đúng?"* → Với biên nửa mở \`[s,e)\`, khi một event end và một event start trùng thời điểm, xử lý **end trước** (phòng trả lại rồi mới cấp) để không tính dư 1 phòng.

> 🔁 **Dừng lại tự kiểm tra.** Với \`[[1,5],[2,6],[3,7]]\` cần mấy phòng?
> <details><summary>Đáp án</summary>
> 3 cuộc cùng chạy trong khoảng \`[3,5)\` → max concurrency = 3 → **3 phòng**. Heap: push 5 → push 6 (không pop, 5>2) → push 7 (không pop, 5>3) → heap {5,6,7}, rooms=3.
> </details>

> 📝 **Tóm tắt mục 8.** Meeting Rooms I = "có chồng không" (sort start, so cặp liền kề). Meeting Rooms II = max concurrency = min phòng; giải bằng **min-heap end** hoặc **sweep line**, $O(n \\log n)$.

---

## 9. Sweep Line / Event Sorting (kỹ thuật tổng quát)

> 💡 **Trực giác.** Hình dung một thanh dọc quét trục thời gian từ trái sang phải. Mỗi lần chạm điểm bắt đầu của một interval, "số khoảng đang phủ" \`+1\`; chạm điểm kết thúc thì \`−1\`. Giá trị cao nhất trong cả hành trình quét = số khoảng chồng nhau lớn nhất. Đây là khung sườn dùng được cho *rất nhiều* bài: max concurrency, tổng độ phủ, tìm điểm "đông nhất"...

### 9.1 Khuôn mẫu

1. Biến mỗi interval \`[s, e]\` thành 2 **event**: \`(s, +1)\` và \`(e, −1)\`.
2. Sort tất cả event theo thời điểm; **tie-break** theo loại tuỳ quy ước biên:
   - Biên nửa mở \`[s, e)\`: tại cùng thời điểm, xử lý \`−1\` *trước* \`+1\`.
   - Biên đóng \`[s, e]\` (chạm = chồng): xử lý \`+1\` *trước* \`−1\`.
3. Quét, cộng dồn \`cur += delta\`, theo dõi \`max(cur)\`.

### 9.2 Walk-through max concurrency \`[[1,4],[2,5],[7,9]]\` (biên nửa mở)

Events: \`(1,+1),(4,−1),(2,+1),(5,−1),(7,+1),(9,−1)\`. Sort (không có tie):

\`(1,+1)→1 (max 1)\`, \`(2,+1)→2 (max 2)\`, \`(4,−1)→1\`, \`(5,−1)→0\`, \`(7,+1)→1\`, \`(9,−1)→0\`. **Max = 2.**

### 9.3 Code Go

\`\`\`go
type event struct {
	t     int
	delta int // +1 start, -1 end
}

// maxConcurrent: số khoảng chồng nhau lớn nhất (= min phòng). Biên nửa mở [s,e).
func maxConcurrent(iv []Interval) int {
	ev := make([]event, 0, 2*len(iv))
	for _, it := range iv {
		ev = append(ev, event{it.S, +1}, event{it.E, -1})
	}
	// Sort theo thời điểm; tie -> xử lý -1 trước +1 (biên nửa mở).
	sort.Slice(ev, func(i, j int) bool {
		if ev[i].t != ev[j].t {
			return ev[i].t < ev[j].t
		}
		return ev[i].delta < ev[j].delta // -1 trước +1
	})

	cur, best := 0, 0
	for _, e := range ev {
		cur += e.delta
		if cur > best {
			best = cur
		}
	}
	return best
}
\`\`\`

$O(n \\log n)$ (sort $2n$ event), bộ nhớ $O(n)$.

> ⚠ **Lỗi thường gặp.** Quên tie-break → tại điểm \`t\` mà một cuộc kết thúc đúng lúc cuộc khác bắt đầu, nếu xử lý \`+1\` trước \`−1\` (sai với biên nửa mở) sẽ đếm dư 1 phòng. Quy tắc: biên nửa mở → \`−1\` trước; biên đóng → \`+1\` trước.

> 📝 **Tóm tắt mục 9.** Sweep line: mỗi interval → 2 event \`±1\`, sort (tie-break theo biên), quét cộng dồn lấy max. Tổng quát hơn heap, $O(n \\log n)$.

---

## 10. Khi nào dùng tiêu chí nào (bảng quyết định)

| Mục tiêu | Tiêu chí | Cấu trúc | Độ phức tạp | Bài ví dụ |
|----------|----------|----------|-------------|-----------|
| **Maximize** số khoảng không chồng | sort theo **\`end\`** ↑ | quét greedy | $O(n \\log n)$ | Activity selection, 435, 452 |
| **Merge** các khoảng chồng | sort theo **\`start\`** ↑ | quét gộp | $O(n \\log n)$ | Merge intervals (56) |
| **Insert** vào danh sách sorted | (đã sorted) | quét 3 pha | $O(n)$ | Insert interval (57) |
| **Min tài nguyên** đồng thời | sort **\`start\`** + theo dõi end | **min-heap** / **sweep line** | $O(n \\log n)$ | Meeting rooms II (253) |
| **Có chồng không** | sort **\`start\`** | so cặp liền kề | $O(n \\log n)$ | Meeting rooms I (252) |

Quy tắc nhớ nhanh:
- "**Đếm nhiều nhất / xóa ít nhất / ít mũi tên nhất**" → sort **\`end\`** (họ activity selection).
- "**Gộp / chèn**" → sort **\`start\`**.
- "**Bao nhiêu tài nguyên song song**" → **sweep / heap**.

> 📝 **Tóm tắt mục 10.** Maximize count → \`end\`. Merge/insert → \`start\`. Min tài nguyên → sweep/heap. Học thuộc bảng này = giải được 90% bài interval.

---

## 11. Cạm bẫy (đọc kỹ trước khi nộp bài)

1. **Sort sai tiêu chí.** Bẫy số 1. Maximize count mà sort theo \`start\` → sai (mục 3.1). Luôn tự hỏi "bài này thuộc nhóm nào trong bảng mục 10".
2. **Biên đóng \`[a,b]\` vs nửa mở \`[a,b)\`.**
   - Merge (56) & burst balloons (452): biên **đóng** → chạm = chồng → điều kiện rời là \`s > last.E\`; cần mũi tên mới là \`s > arrowPos\`.
   - Activity selection, non-overlap (435), meeting rooms: biên **nửa mở** → chạm *không* chồng → tương thích là \`s >= lastEnd\`.
   - **Luôn đọc đề xem biên thế nào** — cùng code chỉ khác một dấu \`>\` ↔ \`>=\` cho kết quả khác nhau.
3. **Off-by-one ở điều kiện overlap.** Hai khoảng \`[a,b]\` và \`[c,d]\` (đã giả sử $a \\leq c$) chồng nhau khi:
   - Biên đóng: \`c <= b\`.
   - Biên nửa mở: \`c < b\`.
   "Chạm có tính chồng không?" quyết định dùng \`<\` hay \`<=\`. Sai một dấu → off-by-one toàn bài.
4. **Quên sort.** Mọi thuật toán greedy ở đây *giả định* dữ liệu đã sort. Quên \`sort.Slice(...)\` → kết quả sai im lặng (không crash). Đặc biệt với input "trông như đã sorted" — đừng tin, sort lại trừ khi đề khẳng định (như Insert interval).
5. **Tie-break event ở sweep line.** Biên nửa mở phải xử lý \`−1\` trước \`+1\` tại cùng thời điểm, kẻo đếm dư 1 phòng (mục 9).
6. **Quên \`max\` khi merge.** \`last.E = cur.E\` (không \`max\`) làm thu nhỏ khoảng khi \`cur\` nằm gọn trong \`last\` (mục 4.3).

> ⚠ **Lỗi thường gặp tổng kết.** 80% lỗi interval problem rơi vào: (a) sort sai cột, (b) lẫn \`>\` với \`>=\` do hiểu sai biên. Khi debug, in ra mảng *sau khi sort* và kiểm tra thủ công 2-3 bước đầu.

---

## Bài tập

> Làm xong hãy đối chiếu mục "Lời giải chi tiết" bên dưới. Mọi bài đều có lời giải đầy đủ + Big-O + chứng minh.

1. **Activity selection.** Cho \`[[1,3],[2,4],[3,5],[0,6],[5,7],[8,9]]\` (biên nửa mở), số hoạt động tối đa chọn được là bao nhiêu và chọn những cái nào?
2. **Merge intervals.** Gộp \`[[1,4],[4,5],[2,3],[6,8],[7,9]]\` (biên đóng).
3. **Insert interval.** Chèn \`[3,6]\` vào danh sách sorted rời nhau \`[[1,2],[4,5],[7,9]]\` (biên đóng).
4. **Non-overlapping (erase min).** Cho \`[[1,2],[2,3],[3,4],[1,3]]\` (biên nửa mở), xóa ít nhất bao nhiêu khoảng để hết chồng?
5. **Min arrows.** Cho bóng \`[[1,2],[2,3],[3,4],[4,5]]\` (biên đóng), ít nhất bao nhiêu mũi tên?
6. **Meeting rooms II.** Cho lịch \`[[9,10],[4,9],[4,17]]\` (biên nửa mở), cần ít nhất bao nhiêu phòng?
7. **(Mở rộng)** Cho \`n\` khoảng. Tìm điểm \`x\` (số nguyên) bị nhiều khoảng phủ nhất, trả về \`x\` và số phủ. Gợi ý: sweep line.

---

## Lời giải chi tiết

### Bài 1 — Activity selection

**Cách tiếp cận:** sort theo \`end\`, quét, chọn cái tương thích (\`s >= lastEnd\`).

Sort theo end: \`[1,3](3), [2,4](4), [3,5](5), [0,6](6), [5,7](7), [8,9](9)\`.

| Xét | s ≥ lastEnd? | chọn? | lastEnd |
|-----|--------------|-------|---------|
| [1,3] | 1 ≥ −∞ | ✓ | 3 |
| [2,4] | 2 ≥ 3 ✗ | bỏ | 3 |
| [3,5] | 3 ≥ 3 ✓ | ✓ | 5 |
| [0,6] | 0 ≥ 5 ✗ | bỏ | 5 |
| [5,7] | 5 ≥ 5 ✓ | ✓ | 7 |
| [8,9] | 8 ≥ 7 ✓ | ✓ | 9 |

**Đáp số: 4 hoạt động** = \`{[1,3], [3,5], [5,7], [8,9]}\`. Big-O $O(n \\log n)$. Chứng minh đúng: exchange argument mục 2.4.

### Bài 2 — Merge intervals

Sort theo start: \`[1,4],[2,3],[4,5],[6,8],[7,9]\`.

- \`[1,4]\` → res \`[[1,4]]\`.
- \`[2,3]\`: \`2 > 4 ✗\` → merge E=max(4,3)=4 → \`[[1,4]]\`.
- \`[4,5]\`: \`4 > 4 ✗\` (chạm, biên đóng) → merge E=max(4,5)=5 → \`[[1,5]]\`.
- \`[6,8]\`: \`6 > 5 ✓\` → mới → \`[[1,5],[6,8]]\`.
- \`[7,9]\`: \`7 > 8 ✗\` → merge E=max(8,9)=9 → \`[[1,5],[6,9]]\`.

**Đáp số: \`[[1,5],[6,9]]\`.** Big-O $O(n \\log n)$. Chứng minh: cụm chồng nhau liền kề sau sort theo start (mục 4.3).

### Bài 3 — Insert interval

Chèn \`[3,6]\` vào \`[[1,2],[4,5],[7,9]]\` (biên đóng).

- **Pha trước** (\`iv.E < 3\`): \`[1,2]\` có \`2 < 3 ✓\` → push. \`[4,5]\` có \`5 < 3 ✗\` → dừng. res \`[[1,2]]\`.
- **Pha merge** (newIv=[3,6], \`iv.S ≤ 6\`): \`[4,5]\`: \`4 ≤ 6 ✓\` → newIv=[min(3,4),max(6,5)]=[3,6]. \`[7,9]\`: \`7 ≤ 6 ✗\` → dừng. push → res \`[[1,2],[3,6]]\`.
- **Pha sau:** push \`[7,9]\`.

**Đáp số: \`[[1,2],[3,6],[7,9]]\`.** Big-O $O(n)$ (input đã sorted, không sort lại).

### Bài 4 — Non-overlapping (erase min)

Đã walk-through ở mục 6.2: sort theo end, \`kept = 3\`, \`n = 4\`.

**Đáp số: xóa 1 khoảng** (xóa \`[1,3]\`). Big-O $O(n \\log n)$. Chứng minh: min xóa = $n$ − \`activitySelection\` (mục 6).

### Bài 5 — Min arrows

Bóng \`[[1,2],[2,3],[3,4],[4,5]]\` (biên đóng). Sort theo end (đã sẵn): end = 2,3,4,5.

| Xét | s > arrowPos? | arrows | arrowPos |
|-----|---------------|--------|----------|
| [1,2] | 1 > −∞ ✓ | 1 | 2 |
| [2,3] | 2 > 2 ✗ (chạm tại 2, nổ luôn) | 1 | 2 |
| [3,4] | 3 > 2 ✓ | 2 | 4 |
| [4,5] | 4 > 4 ✗ (chạm tại 4) | 2 | 4 |

**Đáp số: 2 mũi tên** (tại $x=2$ và $x=4$). Big-O $O(n \\log n)$. Chứng minh: mục 7.3. *Lưu ý:* biên đóng nên \`[2,3]\` chạm \`[1,2]\` tại 2 → cùng nổ; dấu phải là \`>\`.

### Bài 6 — Meeting rooms II

Lịch \`[[9,10],[4,9],[4,17]]\` (biên nửa mở). Sort theo start: \`[4,9],[4,17],[9,10]\`.

Heap (end times), \`<=\` để tái dùng:

| Xét | pop end ≤ start? | push | heap | rooms |
|-----|------------------|------|------|-------|
| [4,9] | rỗng | 9 | {9} | 1 |
| [4,17] | 9 ≤ 4 ✗ | 17 | {9,17} | 2 |
| [9,10] | 9 ≤ 9 ✓ pop 9 | 10 | {10,17} | 2 |

**Đáp số: 2 phòng.** Kiểm tra bằng sweep: events \`(4,+1),(4,+1),(9,−1),(9,+1)→\` tie −1 trước → tại t=9: 2−1=1 rồi +1=2; max 2. Big-O $O(n \\log n)$. Chứng minh: min phòng = max concurrency (mục 8.2).

### Bài 7 — Điểm bị phủ nhiều nhất (mở rộng)

**Cách tiếp cận:** sweep line. Mỗi \`[s,e]\` → event \`(s,+1),(e,−1)\` (giả sử biên đóng → tie \`+1\` trước \`−1\` để điểm cuối vẫn tính phủ). Quét cộng dồn, lưu \`cur\` lớn nhất *và* thời điểm đạt nó.

\`\`\`go
func busiestPoint(iv []Interval) (x, cover int) {
	ev := make([]event, 0, 2*len(iv))
	for _, it := range iv {
		ev = append(ev, event{it.S, +1}, event{it.E, -1})
	}
	sort.Slice(ev, func(i, j int) bool {
		if ev[i].t != ev[j].t {
			return ev[i].t < ev[j].t
		}
		return ev[i].delta > ev[j].delta // biên ĐÓNG: +1 trước -1
	})
	cur := 0
	for _, e := range ev {
		cur += e.delta
		if cur > cover {
			cover, x = cur, e.t
		}
	}
	return
}
\`\`\`

Ví dụ \`[[1,5],[2,7],[3,4]]\`: tại x=3 cả 3 khoảng phủ → \`cover=3, x=3\`. Big-O $O(n \\log n)$, bộ nhớ $O(n)$. Đúng vì sweep line đếm chính xác số khoảng phủ tại mỗi điểm tới hạn (chỉ cần xét các điểm là đầu/cuối interval — giữa hai event liên tiếp số phủ không đổi).

---

## Code & Minh họa

- Tất cả code Go ở trên (\`activitySelection\`, \`mergeIntervals\`, \`insertInterval\`, \`eraseOverlapIntervals\`, \`findMinArrows\`, \`canAttendAll\`, \`minMeetingRoomsHeap\`, \`maxConcurrent\`, \`busiestPoint\`) biên dịch và chạy được; chỉ cần gói chung một \`package main\` với \`Interval\`, \`event\`, \`minHeap\`.
- [visualization.html](./visualization.html): 3 module tương tác — (1) Activity selection: timeline interval, animate sort theo \`end\` + chọn greedy; (2) Merge intervals: animate sort theo \`start\` + gộp overlap; (3) Meeting rooms: sweep line đếm max concurrent / min phòng.

## Bài tiếp theo

- [Lesson 21 — Huffman Encoding](../lesson-21-huffman-encoding/): greedy *trên cây* — lại một dạng greedy nữa, lần này dùng min-heap (giống meeting rooms II) để xây cây prefix code tối ưu.
- Tham khảo chéo: [Lesson 19 — Greedy Fundamentals](../lesson-19-greedy-fundamentals/) (exchange argument), [Lesson 22 — Greedy vs DP](../lesson-22-greedy-vs-dp/) (khi greedy *thất bại*).
`;
