// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-19-greedy-fundamentals/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 19 — Greedy Fundamentals (Nền tảng thuật toán tham lam)

> **Tier 3 — Greedy.** Bài mở đầu cho cả tier. Sau bài này bạn sẽ trả lời được câu hỏi cốt lõi: *"Khi nào thì 'chọn cái tốt nhất ngay bây giờ' lại cho ra kết quả tốt nhất cho cả bài toán?"* — và quan trọng hơn, **khi nào nó sai**.

## Mục tiêu học tập

Sau bài học này bạn sẽ:

1. Hiểu **ý tưởng cốt lõi** của greedy: tại mỗi bước chọn lựa chọn tốt nhất cục bộ, không nhìn lại.
2. Nắm 2 điều kiện để greedy **đúng**: *greedy-choice property* và *optimal substructure*.
3. Biết dùng **exchange argument** để chứng minh một chiến lược greedy là tối ưu.
4. Phân biệt được những bài greedy **đúng** (fractional knapsack, coin change hệ chuẩn, jump game) với những bài greedy **sai** (0/1 knapsack, coin change hệ {1,3,4}, longest path).
5. Có một **quy trình** rõ ràng để áp dụng greedy: đoán chiến lược → tìm phản ví dụ → chứng minh hoặc chuyển sang DP.
6. Nhận ra vai trò của **sort** trong phần lớn bài greedy và tránh được các cạm bẫy phổ biến.

## Kiến thức tiền đề

- [Lesson 01 — Big-O & Asymptotic](../lesson-01-bigo-asymptotic/) — để đánh giá độ phức tạp (greedy thường $O(n \\log n)$ do sort).
- [Lesson 04 — Tính đúng đắn & Bất biến](../lesson-04-correctness-invariant/) — exchange argument là một dạng chứng minh tính đúng đắn.
- [Lesson 05 — Từ brute-force tới tối ưu](../lesson-05-bruteforce-to-optimize/) — greedy là một bước "tối ưu hoá" so với vét cạn.
- Sắp xếp ([Tier 1](../tier-1-sorting/index.html)) — phần lớn bài greedy bắt đầu bằng một bước sort.

---

## 1. Ý tưởng greedy

> 💡 **Trực giác / Hình dung.** Tưởng tượng bạn leo núi trong sương mù dày, không thấy đỉnh ở đâu. Chiến lược *tham lam* là: tại mỗi bước, nhìn xung quanh chân mình và bước về phía **dốc lên nhất**. Bạn không lập kế hoạch cho 10 bước tới, không quay lại xem bước trước có sai không — chỉ chọn cái tốt nhất **ngay tại đây, ngay bây giờ**. Với một số ngọn núi (hình nón trơn), cách này dẫn thẳng tới đỉnh. Với núi có nhiều mỏm phụ, bạn kẹt ở một đỉnh giả (local maximum) và không bao giờ tới đỉnh thật. Đó chính là toàn bộ câu chuyện của greedy: **nhanh và đơn giản — khi nó đúng**.

**Thuật toán tham lam (greedy algorithm)** xây dựng lời giải qua một chuỗi lựa chọn, mỗi bước chọn phương án **tối ưu cục bộ (locally optimal)** mà không bao giờ xét lại. Đặc trưng:

- **Không quay lui (no backtracking)**: đã chọn là giữ nguyên. Trái ngược với [backtracking](../lesson-18-backtracking/) — thử rồi huỷ.
- **Không nhìn toàn cục**: chỉ dựa trên trạng thái hiện tại, không "nhìn trước" hậu quả xa.
- **Nhanh**: thường $O(n \\log n)$ (do sort) hoặc $O(n)$. So với DP/vét cạn thường rẻ hơn nhiều.

**Khung tổng quát của một thuật toán greedy:**

\`\`\`
1. (Tuỳ chọn) Sắp xếp các phần tử theo một tiêu chí.
2. result = rỗng
3. Lặp qua từng phần tử theo thứ tự:
       Nếu thêm nó vào result là "tốt nhất cục bộ" theo tiêu chí
           → thêm vào result.
4. Trả về result.
\`\`\`

> ⚠ **Lỗi thường gặp.** "Greedy nhanh nên cứ dùng greedy." **Sai.** Tốc độ là vô nghĩa nếu kết quả sai. Greedy chỉ là *ứng viên* — bạn **phải** kiểm tra nó có đúng cho bài toán cụ thể không (mục 6). Rất nhiều bài nhìn "có vẻ greedy được" nhưng lại không (0/1 knapsack, coin change hệ lẻ).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Greedy khác DP ở đâu?"* — DP thử **mọi** lựa chọn tại mỗi bước rồi lấy tốt nhất (xét lại được, lưu kết quả bài con). Greedy **cam kết luôn** vào một lựa chọn, không thử các lựa chọn còn lại. Vì thế greedy rẻ hơn nhưng chỉ đúng khi lựa chọn cam kết đó chắc chắn nằm trong lời giải tối ưu.
> - *"Greedy có luôn cho lời giải hợp lệ không?"* — Có, nó luôn cho *một* lời giải. Vấn đề là lời giải đó có **tối ưu** không.
> - *"Local optimal có phải global optimal không?"* — Đúng *đôi khi*. Khi đúng → greedy là vàng. Khi sai → greedy cho đáp án tệ. Cả bài này xoay quanh việc phân biệt 2 trường hợp.

🔁 **Dừng lại tự kiểm tra.** Greedy có quay lại sửa lựa chọn đã làm không?

<details><summary>Đáp án</summary>Không. Greedy "cam kết một chiều" — mỗi lựa chọn là vĩnh viễn. Đó là lý do nó nhanh, cũng là lý do nó có thể sai nếu lựa chọn cục bộ phá hỏng cơ hội toàn cục.</details>

📝 **Tóm tắt mục 1.**
- Greedy = chuỗi lựa chọn tối ưu cục bộ, không quay lui, không nhìn xa.
- Nhanh ($O(n \\log n)$ hoặc $O(n)$) nhưng **chỉ đúng có điều kiện**.
- Greedy luôn ra *một* lời giải; câu hỏi là nó có *tối ưu* không.

---

## 2. Hai điều kiện để greedy đúng

Một bài toán tối ưu giải được bằng greedy khi (và thường là chỉ khi) nó thoả **cả hai** điều kiện sau.

### 2.1 Greedy-choice property (tính chất lựa chọn tham lam)

> 💡 **Trực giác.** Tồn tại **một lời giải tối ưu nào đó** chứa lựa chọn tham lam của bước đầu tiên. Nói cách khác: chọn "cái tốt nhất ngay bây giờ" không bao giờ khiến bạn *mất* cơ hội đạt tối ưu — luôn còn ít nhất một con đường tối ưu đi qua lựa chọn đó.

**Định nghĩa hình thức.** Gọi $g$ là lựa chọn tham lam tại bước 1. *Greedy-choice property* đúng nếu: với mọi instance, tồn tại lời giải tối ưu $OPT$ sao cho $g \\in OPT$.

**Ví dụ (activity selection — sẽ học kỹ ở [L20](../lesson-20-interval-problems/)):** chọn hoạt động **kết thúc sớm nhất** luôn nằm trong một lịch tối ưu nào đó. Trực giác: kết thúc sớm nhất chừa lại nhiều thời gian nhất cho các hoạt động sau.

> ⚠ **Lỗi thường gặp.** Greedy-choice property KHÔNG đòi *mọi* lời giải tối ưu phải chứa lựa chọn tham lam — chỉ cần **tồn tại một** lời giải tối ưu chứa nó. Đây là điểm tinh tế giúp exchange argument hoạt động.

### 2.2 Optimal substructure (cấu trúc con tối ưu)

> 💡 **Trực giác.** Sau khi đã cam kết lựa chọn tham lam, **phần còn lại** của bài toán là một bài toán nhỏ hơn cùng dạng; và lời giải tối ưu của bài lớn = lựa chọn tham lam + lời giải tối ưu của bài con.

**Định nghĩa hình thức.** Bài toán có *optimal substructure* nếu lời giải tối ưu của nó chứa bên trong lời giải tối ưu của các bài con.

**Ví dụ.** Trong coin change: nếu đáp án tối ưu cho số tiền $N$ dùng đồng $c$, thì phần $N - c$ còn lại cũng phải được trả tối ưu (nếu không, thay phần đó bằng cách trả tốt hơn → mâu thuẫn với việc $N$ là tối ưu).

> ❓ **Câu hỏi tự nhiên.** *"Optimal substructure không phải cũng là điều kiện của DP sao?"* Đúng. Cả greedy lẫn DP đều cần optimal substructure. **Điểm khác biệt nằm ở greedy-choice property**: DP không có nó nên phải thử *mọi* lựa chọn tại mỗi bước; greedy có nó nên chỉ cần thử *một*.

🔁 **Dừng lại tự kiểm tra.** Bài toán có optimal substructure nhưng KHÔNG có greedy-choice property thì dùng gì?

<details><summary>Đáp án</summary>Dùng DP (Tier 4). Ví dụ điển hình: 0/1 knapsack và coin change hệ {1,3,4} đều có optimal substructure nhưng greedy-choice property sai → greedy hỏng, DP đúng.</details>

📝 **Tóm tắt mục 2.**
- **Greedy-choice property**: tồn tại lời giải tối ưu chứa lựa chọn tham lam đầu tiên.
- **Optimal substructure**: tối ưu của bài lớn = lựa chọn + tối ưu của bài con.
- Cần **cả hai** mới dùng greedy được. Thiếu greedy-choice property → DP.

---

## 3. Exchange argument — kỹ thuật chứng minh greedy đúng

> 💡 **Trực giác.** Bạn muốn chứng minh: "lời giải greedy \`G\` là tối ưu." Cách làm: lấy **bất kỳ** lời giải tối ưu \`OPT\` nào. Nếu \`OPT\` đã giống \`G\` thì xong. Nếu khác, tìm chỗ đầu tiên chúng khác nhau, rồi **"đổi" (exchange)** phần tử của \`OPT\` thành lựa chọn greedy mà chứng minh \`OPT\` **không tệ đi** sau khi đổi. Lặp lại → biến \`OPT\` thành \`G\` từng bước mà chất lượng không giảm → vậy \`G\` cũng tối ưu. Hình dung như "nắn" một lời giải tối ưu bất kỳ về đúng dạng greedy mà không làm nó xấu đi.

**Khung exchange argument:**

\`\`\`
1. Gọi G = lời giải greedy, OPT = một lời giải tối ưu bất kỳ.
2. Nếu G == OPT → xong.
3. Tìm vị trí đầu tiên i mà G[i] ≠ OPT[i].
4. Chứng minh: thay OPT[i] bằng G[i] (đổi) tạo ra OPT' vẫn HỢP LỆ và
   chất lượng(OPT') ≥ chất lượng(OPT)  (với bài maximize; ≤ nếu minimize).
5. Vì OPT đã tối ưu → OPT' cũng tối ưu, và OPT' khớp G thêm 1 bước.
6. Lặp → biến OPT thành G hoàn toàn → G tối ưu. ∎
\`\`\`

### 3.1 Walk-through đầy đủ: activity selection

**Bài toán.** Có \`n\` hoạt động, hoạt động \`i\` chạy \`[s_i, f_i)\`. Chọn tập con **nhiều nhất** các hoạt động không chồng nhau.

**Chiến lược greedy:** sắp theo thời gian **kết thúc \`f\` tăng dần**, lặp qua, chọn hoạt động đầu tiên không xung đột với hoạt động vừa chọn.

**Chứng minh bằng exchange argument (đầy đủ, không bỏ bước):**

- Gọi $G = g_1, g_2, \\ldots, g_k$ là dãy hoạt động greedy chọn (đã sắp theo $f$). Gọi $OPT = o_1, o_2, \\ldots, o_m$ là một lời giải tối ưu, cũng sắp theo $f$. Ta muốn chứng minh $k = m$ (greedy chọn được nhiều bằng tối ưu).
- **Bổ đề (claim):** với mọi $r$, $f(g_r) \\leq f(o_r)$ — hoạt động thứ $r$ mà greedy chọn kết thúc *không muộn hơn* hoạt động thứ $r$ của OPT.
- **Chứng minh bổ đề bằng quy nạp theo $r$:**
  - *Cơ sở $r = 1$:* greedy chọn hoạt động kết thúc sớm nhất trong tất cả, nên $f(g_1) \\leq f(o_1)$. ✓
  - *Bước quy nạp:* giả sử $f(g_{r-1}) \\leq f(o_{r-1})$. Vì OPT hợp lệ, $o_r$ bắt đầu sau khi $o_{r-1}$ kết thúc: $s(o_r) \\geq f(o_{r-1}) \\geq f(g_{r-1})$. Vậy $o_r$ cũng tương thích với $g_{r-1}$ → $o_r$ là **ứng viên** mà greedy được phép chọn tại bước $r$. Greedy chọn hoạt động tương thích **kết thúc sớm nhất**, nên $f(g_r) \\leq f(o_r)$. ✓
- **Kết luận từ bổ đề:** giả sử phản chứng $m > k$, tức OPT có hoạt động $o_{k+1}$. Vì $f(g_k) \\leq f(o_k) \\leq s(o_{k+1})$, hoạt động $o_{k+1}$ tương thích với $g_k$, nên greedy lẽ ra đã chọn thêm nó (greedy chỉ dừng khi không còn hoạt động tương thích). Mâu thuẫn với việc greedy dừng ở $g_k$. Vậy $m = k$. **Greedy tối ưu.** ∎

Đây chính là một exchange argument dạng "greedy đi trước (greedy stays ahead)": ta chứng minh greedy *luôn không thua* OPT ở từng bước, rồi suy ra số lượng bằng nhau.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao sort theo \`f\` (kết thúc) chứ không phải \`s\` (bắt đầu) hay độ dài?"* Vì kết thúc sớm = chừa nhiều thời gian nhất cho phần sau. Sort theo độ dài (chọn ngắn nhất trước) **sai** — phản ví dụ: một hoạt động ngắn nằm giữa, chặn 2 hoạt động dài không chồng nhau. Tiêu chí sort là **mấu chốt** (mục 7).

📝 **Tóm tắt mục 3.**
- Exchange argument: nắn một OPT bất kỳ về dạng greedy mà không làm nó tệ đi.
- Biến thể "greedy stays ahead": chứng minh greedy không thua OPT ở từng bước.
- Tiêu chí sort quyết định đúng/sai — phải chọn tiêu chí có thể "đổi" được.

---

## 4. Những ví dụ greedy ĐÚNG

### 4.1 Coin change — hệ tiền chuẩn (canonical) {1, 5, 10, 25}

> 💡 **Trực giác.** Trả tiền lẻ bằng số đồng xu ít nhất. Bản năng: cứ lấy đồng **lớn nhất** không vượt quá số tiền còn lại. Với hệ tiền thật (1¢, 5¢, 10¢, 25¢ của Mỹ; hay 1k, 5k, 10k, 50k...) bản năng này **đúng**. Hệ như vậy gọi là **canonical**.

**Walk-through: trả \`41\` xu, đồng {1, 5, 10, 25}.**

| Bước | Còn lại | Đồng lớn nhất ≤ còn lại | Lấy | Tổng đồng |
|------|---------|-------------------------|-----|-----------|
| 1 | 41 | 25 | 1×25 | 1 |
| 2 | 16 | 10 | 1×10 | 2 |
| 3 | 6 | 5 | 1×5 | 3 |
| 4 | 1 | 1 | 1×1 | 4 |

Kết quả: **4 đồng** (25+10+5+1). Đây là tối ưu.

**4 ví dụ số:**

| Số tiền | Greedy | Số đồng | Tối ưu? |
|---------|--------|---------|---------|
| 41 | 25+10+5+1 | 4 | ✓ |
| 63 | 25+25+10+1+1+1 | 6 | ✓ |
| 99 | 25+25+25+10+10+1+1+1+1 | 9 | ✓ |
| 30 | 25+5 | 2 | ✓ |

\`\`\`go
// coinChangeGreedy trả số đồng tối thiểu cho \`amount\`
// VỚI ĐIỀU KIỆN coins là hệ canonical (vd {1,5,10,25}).
// coins phải được sắp giảm dần.
func coinChangeGreedy(coins []int, amount int) int {
	count := 0
	for _, c := range coins { // coins đã sort GIẢM dần: 25,10,5,1
		// lấy nhiều nhất có thể đồng c
		take := amount / c
		count += take
		amount -= take * c
	}
	if amount != 0 {
		return -1 // không trả được (vd thiếu đồng 1)
	}
	return count
}
// Walk-through amount=41, coins=[25,10,5,1]:
//   c=25: take=1, count=1, amount=16
//   c=10: take=1, count=2, amount=6
//   c=5 : take=1, count=3, amount=1
//   c=1 : take=1, count=4, amount=0  -> trả 4 đồng ✓
// Độ phức tạp: O(số loại đồng). Sort coins: O(k log k).
\`\`\`

> ⚠ **Lỗi thường gặp.** Greedy coin change **chỉ đúng với hệ canonical**. Đừng tổng quát hoá! Mục 5.2 cho phản ví dụ hệ {1,3,4} làm greedy hỏng.

### 4.2 Fractional knapsack (ba lô phân số)

> 💡 **Trực giác.** Bạn có ba lô sức chứa \`W\`. Có các món hàng, mỗi món có giá trị \`v\` và khối lượng \`w\`. **Được lấy một phần** của món (chia nhỏ tuỳ ý). Muốn tổng giá trị lớn nhất. Bản năng: ưu tiên món có **"giá trị trên mỗi kg" (ratio = v/w)** cao nhất — như mua vàng trước, rồi bạc, rồi đồng, cho tới khi đầy.

**Chiến lược greedy:** sort theo $\\text{ratio} = v/w$ **giảm dần**; lấy hết từng món cho tới khi không đủ chỗ thì lấy **một phần** món cuối cho đầy.

**Walk-through: \`W = 50\`.**

| Món | v | w | ratio = v/w |
|-----|---|---|-------------|
| A | 60 | 10 | 6.0 |
| B | 100 | 20 | 5.0 |
| C | 120 | 30 | 4.0 |

Sort theo ratio giảm: A(6.0), B(5.0), C(4.0).

| Bước | Còn chỗ | Món | Lấy | Giá trị cộng thêm | Tổng |
|------|---------|-----|-----|-------------------|------|
| 1 | 50 | A (w=10) | toàn bộ | 60 | 60 |
| 2 | 40 | B (w=20) | toàn bộ | 100 | 160 |
| 3 | 20 | C (w=30) | 20/30 = 2/3 phần | 120×(2/3)=80 | **240** |

Kết quả: **240**. Tối ưu cho fractional.

**4 ví dụ số (W thay đổi, cùng món A,B,C trên):**

| W | Lấy | Tổng giá trị |
|---|-----|--------------|
| 10 | A toàn bộ | 60 |
| 30 | A + B | 160 |
| 50 | A + B + 2/3 C | 240 |
| 60 | A + B + C | 280 |

\`\`\`go
import "sort"

type Item struct{ value, weight int }

// fractionalKnapsack: được lấy PHÂN SỐ của món -> greedy theo ratio ĐÚNG.
func fractionalKnapsack(items []Item, W int) float64 {
	// 1. Sort theo ratio v/w GIẢM dần (mấu chốt của greedy)
	sort.Slice(items, func(i, j int) bool {
		// so sánh chéo để tránh chia số thực: v_i/w_i > v_j/w_j
		return items[i].value*items[j].weight > items[j].value*items[i].weight
	})
	total := 0.0
	cap := W
	for _, it := range items {
		if cap == 0 {
			break
		}
		if it.weight <= cap {
			total += float64(it.value) // lấy nguyên món
			cap -= it.weight
		} else {
			// lấy một phần cho đầy: tỉ lệ cap/weight
			total += float64(it.value) * float64(cap) / float64(it.weight)
			cap = 0
		}
	}
	return total
}
// Walk-through W=50, items A(60,10) B(100,20) C(120,30):
//   sort ratio giảm: A(6) B(5) C(4)
//   A: w=10<=50 -> total=60, cap=40
//   B: w=20<=40 -> total=160, cap=20
//   C: w=30 >20 -> total += 120*20/30 = 80 -> total=240, cap=0  ✓
// Độ phức tạp: O(n log n) do sort, sau đó O(n) quét.
\`\`\`

> ⚠ **Lỗi thường gặp — đừng nhầm với 0/1 knapsack!** Fractional cho phép cắt món → greedy theo ratio **đúng**. 0/1 (lấy nguyên hoặc không) → greedy theo ratio **SAI** (mục 5.1). Đây là cặp dễ nhầm nhất của cả tier.

**Vì sao greedy đúng cho fractional (exchange argument vắn tắt):** nếu một OPT không lấy đầy món ratio cao nhất nhưng lại lấy một ít món ratio thấp hơn, ta "đổi": bỏ 1 đơn vị khối lượng món ratio thấp, thay bằng 1 đơn vị món ratio cao → tổng giá trị tăng (hoặc không đổi), vẫn hợp lệ về khối lượng. Vậy luôn có OPT lấy theo greedy. ∎ (Phép "đổi" này *không* làm được với 0/1 vì không cắt được món.)

### 4.3 Jump game (nhảy tới đích)

> 💡 **Trực giác.** Mảng \`nums\`, đứng ở chỉ số 0, \`nums[i]\` = số bước tối đa nhảy được từ \`i\`. Hỏi có tới được ô cuối không? Greedy: duy trì **tầm với xa nhất (reach)** đạt được tới giờ. Như nhảy lò cò, mỗi ô mở rộng tầm với; nếu có lúc đứng ngoài tầm với → kẹt.

**Walk-through: \`nums = [2,3,1,1,4]\`.**

| i | nums[i] | reach trước | reach mới = max(reach, i+nums[i]) | i ≤ reach? |
|---|---------|-------------|-----------------------------------|------------|
| 0 | 2 | 0 | max(0, 0+2)=2 | ✓ |
| 1 | 3 | 2 | max(2, 1+3)=4 | ✓ |
| 2 | 1 | 4 | max(4, 2+1)=4 | ✓ |
| 3 | 1 | 4 | max(4, 3+1)=4 | ✓ |
| 4 | 4 | 4 | đã ≥ n-1=4 | ✓ → **tới đích** |

**Phản ví dụ tới-đích thất bại: \`nums = [3,2,1,0,4]\`.**

| i | nums[i] | reach | i ≤ reach? |
|---|---------|-------|------------|
| 0 | 3 | 3 | ✓ |
| 1 | 2 | 3 | ✓ |
| 2 | 1 | 3 | ✓ |
| 3 | 0 | 3 | ✓ (nhưng reach không tăng) |
| 4 | 4 | 3 | ✗ 4 > 3 → **kẹt, không tới đích** |

\`\`\`go
// canJump: greedy duy trì reach = chỉ số xa nhất tới được.
func canJump(nums []int) bool {
	reach := 0
	for i := 0; i < len(nums); i++ {
		if i > reach {
			return false // đứng ngoài tầm với -> kẹt
		}
		if i+nums[i] > reach {
			reach = i + nums[i] // mở rộng tầm với
		}
	}
	return true // quét hết -> tới được ô cuối
}
// Walk-through [3,2,1,0,4]:
//   i=0 reach=3; i=1 reach=3; i=2 reach=3; i=3 reach=3 (nums[3]=0);
//   i=4: 4 > reach(3) -> return false ✓
// Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
\`\`\`

**Vì sao greedy đúng:** ta chỉ cần biết ô cuối có nằm trong tầm với tích luỹ không. Nếu mọi ô \`i ≤ reach\` đều "ghé qua được" thì \`reach\` luôn là chặn trên chính xác của tầm với; không cần thử mọi đường nhảy cụ thể (đó là optimal substructure + greedy-choice: luôn nhảy để mở rộng reach xa nhất).

### 4.4 Minimum coins / minimum jumps (biến thể đếm)

Cùng họ với jump game nhưng hỏi **số bước nhảy ít nhất**. Greedy "BFS theo tầng": tại mỗi tầm với hiện tại, tính tầm với xa nhất của tầng kế, tăng đếm khi vượt biên tầng. $O(n)$. (Sẽ gặp lại sâu hơn trong các bài interval/BFS.)

📝 **Tóm tắt mục 4.**
- Coin change hệ **canonical** {1,5,10,25}: lấy đồng lớn nhất → đúng.
- **Fractional** knapsack: lấy theo ratio v/w cao nhất → đúng (vì cắt được món).
- Jump game: duy trì \`reach\`, $O(n)$ → đúng.
- Tất cả đều có greedy-choice property + optimal substructure.

---

## 5. Những ví dụ greedy SAI (greedy thất bại)

> 💡 **Trực giác chung.** Greedy sai khi lựa chọn cục bộ "đốt cháy" một tài nguyên mà lẽ ra để dành sẽ tốt hơn — đó là *local maximum* không phải *global*. Cách phát hiện duy nhất đáng tin: **tìm phản ví dụ cụ thể**.

### 5.1 0/1 Knapsack — greedy theo ratio SAI

**Bài toán:** giống fractional nhưng **lấy nguyên món hoặc bỏ** (không cắt).

**Phản ví dụ cụ thể.** \`W = 10\`, các món:

| Món | v | w | ratio v/w |
|-----|---|---|-----------|
| A | 60 | 10 | 6.0 |
| B | 100 | 20 | 5.0 — (giả sử W=50 đổi lại để minh hoạ rõ) |

Dùng phản ví dụ kinh điển gọn hơn — \`W = 50\`, ba món:

| Món | v | w | ratio |
|-----|---|---|-------|
| A | 60 | 10 | 6.0 |
| B | 100 | 20 | 5.0 |
| C | 120 | 30 | 4.0 |

- **Greedy theo ratio (0/1):** lấy A (w=10, v=60), lấy B (w=20, v=100) → còn chỗ 20, **không đủ** lấy C (w=30) vì không cắt được → tổng = **160**.
- **Tối ưu (0/1):** lấy B + C (w=20+30=50, v=100+120=**220**). Bỏ A!

Greedy ra 160, tối ưu là 220. **Greedy sai.** Lý do: nó "tham" món ratio cao A nhưng A chiếm chỗ làm lỡ cặp B+C giá trị cao hơn. Vì không cắt được nên phép "đổi" của fractional không áp dụng → greedy-choice property hỏng → **cần DP** (Tier 4).

### 5.2 Coin change hệ {1, 3, 4} — tìm 6

**Phản ví dụ cụ thể.**

- **Greedy:** lấy đồng lớn nhất ≤ 6 là 4 → còn 2 → lấy 1 + 1 → tổng **4 + 1 + 1 = 3 đồng**.
- **Tối ưu:** 3 + 3 = **2 đồng**.

Greedy ra 3, tối ưu 2. **Greedy sai** vì hệ {1,3,4} **không canonical**: lấy đồng 4 làm lỡ cặp 3+3 đẹp hơn.

\`\`\`go
// PHẢN VÍ DỤ: greedy coin change SAI với hệ {1,3,4}, amount=6.
// coins sort giảm: [4,3,1]
func coinGreedyWrong() (greedy, optimal int) {
	coins := []int{4, 3, 1}
	amount := 6
	g := 0
	rem := amount
	for _, c := range coins {
		g += rem / c
		rem %= c
	}
	// g = 6/4=1 (rem=2) + 2/3=0 (rem=2) + 2/1=2 (rem=0) = 3 đồng
	// Tối ưu thực: 3+3 = 2 đồng (tìm bằng DP)
	return g, 2
}
// In ra: greedy=3, optimal=2  -> greedy KHÔNG tối ưu.
// Bài học: greedy coin change chỉ đúng với hệ canonical.
//          Hệ bất kỳ -> phải DP (O(amount × số loại đồng)).
\`\`\`

> ❓ **Câu hỏi tự nhiên.** *"Làm sao biết hệ tiền có canonical không?"* Không có công thức đơn giản; cách thực dụng: chạy DP rồi so với greedy trên mọi số tiền tới một ngưỡng — nếu khớp hết trong khoảng đủ rộng thì (gần như chắc) canonical. Các hệ tiền thật trên thế giới hầu hết được thiết kế canonical chính vì lý do này.

### 5.3 Longest path (đường đi dài nhất)

Trong đồ thị tổng quát, greedy "luôn đi cạnh nặng nhất / tới đỉnh xa nhất" **sai**: chọn cạnh nặng đầu tiên có thể dẫn vào ngõ cụt hoặc chặn đường tới chuỗi cạnh dài hơn phía sau. (Longest path nói chung là NP-hard — không có cả greedy lẫn DP đa thức cho đồ thị tổng quát; chỉ DP được trên DAG.) Tương phản với *shortest path* trong đồ thị trọng số không âm — nơi Dijkstra (một greedy) lại **đúng**.

📝 **Tóm tắt mục 5.**
- 0/1 knapsack: greedy ratio sai (160 vs 220) — không cắt được món → cần DP.
- Coin {1,3,4} trả 6: greedy 3 đồng vs tối ưu 2 đồng — hệ không canonical.
- Longest path: greedy sai (NP-hard nói chung).
- **Phản ví dụ là vũ khí số 1** để bác bỏ một greedy strategy.

---

## 6. Quy trình áp dụng greedy

Đây là "checklist tư duy" mỗi khi nghi ngờ một bài giải được bằng greedy:

\`\`\`
1. ĐOÁN một greedy strategy (vd "sort theo X rồi lấy lần lượt").
2. TÌM PHẢN VÍ DỤ nhỏ (3-5 phần tử, có cả số dương/âm/edge case).
       - Nếu tìm được phản ví dụ -> strategy SAI. Quay lại bước 1 đổi tiêu chí,
         hoặc kết luận greedy không hợp -> chuyển DP (Tier 4).
3. NẾU KHÔNG tìm được phản ví dụ sau khi thử nhiều case:
       -> CHỨNG MINH bằng exchange argument (mục 3).
       - Chứng minh được -> greedy ĐÚNG, code O(n log n).
       - Không chứng minh được & vẫn nghi -> an toàn dùng DP.
\`\`\`

> ⚠ **Lỗi thường gặp.** Bỏ qua bước 2 và 3, "thấy code chạy đúng vài test là tin greedy đúng". Rất nguy hiểm — greedy sai thường vẫn đúng trên test nhỏ may mắn rồi sai trên test biên. **Luôn** tìm phản ví dụ hoặc chứng minh.

> 🔁 **Dừng lại tự kiểm tra.** Bạn đoán "sort theo độ dài hoạt động tăng dần" cho activity selection. Hãy tìm phản ví dụ.

<details><summary>Đáp án</summary>3 hoạt động: X=[1,4), Y=[3,5), Z=[5,8) không, dùng đúng phản ví dụ độ-dài: A=[1,10) dài; B=[2,3) ngắn nằm trong; C=[3,4)... thực ra phản ví dụ chuẩn: hoạt động ngắn [4,6) chồng lên cả hai hoạt động dài [1,5) và [5,9). Sort theo độ dài chọn [4,6) trước (ngắn nhất) → loại cả 2 hoạt động dài → chỉ được 1. Tối ưu chọn [1,5) và [5,9) → được 2. Vậy sort theo độ dài SAI; phải sort theo thời gian kết thúc.</details>

📝 **Tóm tắt mục 6.**
- Đoán → tìm phản ví dụ → chứng minh (exchange) → nếu sai, chuyển DP.
- Không bao giờ "tin" greedy đúng chỉ vì pass vài test.

---

## 7. Greedy + sort — tiêu chí sort là mấu chốt

> 💡 **Trực giác.** Phần lớn bài greedy bắt đầu bằng một bước **sort**, vì greedy cần xử lý phần tử theo "thứ tự ưu tiên" nào đó. Chọn **đúng tiêu chí sort** thường chính là chìa khoá của cả lời giải — chọn sai thì greedy sai dù code đúng.

**Bảng đối chiếu tiêu chí sort (4 ví dụ):**

| Bài toán | Sort theo | Vì sao |
|----------|-----------|--------|
| Fractional knapsack | ratio v/w **giảm** | ưu tiên giá trị trên mỗi kg cao |
| Activity selection | thời gian kết thúc \`f\` **tăng** | chừa nhiều thời gian cho phần sau |
| Coin change canonical | mệnh giá **giảm** | đốt số tiền nhanh nhất |
| Assign cookies | kích cỡ **tăng** (cả trẻ & bánh) | ghép bánh nhỏ vừa đủ cho trẻ dễ tính |

> ⚠ **Lỗi thường gặp.** Chọn tiêu chí "nghe hợp lý" mà không kiểm tra. Vd activity selection: nhiều người sort theo *bắt đầu sớm* hoặc *độ dài ngắn* — cả hai đều SAI (mục 6). Chỉ *kết thúc sớm* mới đúng. **Tiêu chí sort phải là cái mà exchange argument đổi được.**

📝 **Tóm tắt mục 7.**
- Đa số greedy = sort + một lượt quét → $O(n \\log n)$.
- Tiêu chí sort là phần dễ sai nhất; phải khớp với exchange argument.

---

## 8. Khi nào dùng greedy

**Dùng greedy khi:**

- Bài toán có **greedy-choice property** (chứng minh được hoặc tin chắc qua exchange argument).
- Có **optimal substructure**.
- Cần lời giải **nhanh** — greedy thường $O(n \\log n)$ (sort) hoặc $O(n)$, rẻ hơn DP nhiều.

**KHÔNG dùng greedy (chuyển DP) khi:**

- Tìm được phản ví dụ cho mọi tiêu chí greedy hợp lý.
- Lựa chọn cục bộ "đốt tài nguyên" làm lỡ cơ hội toàn cục (0/1 knapsack).
- Không chứng minh được greedy-choice property.

| Tiêu chí | Greedy | DP |
|----------|--------|-----|
| Số lựa chọn xét mỗi bước | 1 (cam kết) | tất cả |
| Greedy-choice property | **cần** | không cần |
| Optimal substructure | cần | cần |
| Tốc độ điển hình | $O(n \\log n)$ | $O(n \\cdot W)$, $O(n^2)$... |
| Bộ nhớ | thường $O(1)$–$O(n)$ | bảng $O(n)$–$O(n \\cdot W)$ |

📝 **Tóm tắt mục 8.**
- Greedy: cần greedy-choice property + optimal substructure; nhanh.
- Thiếu greedy-choice property → DP.

---

## 9. Cạm bẫy (pitfalls)

> ⚠ Tổng hợp các sai lầm thường gặp nhất với greedy:

1. **Giả định greedy đúng mà không chứng minh.** Luôn tìm phản ví dụ hoặc làm exchange argument. Đây là cạm bẫy nguy hiểm nhất.
2. **Chọn tiêu chí sort sai.** Activity selection phải sort theo *kết thúc*, không phải *bắt đầu* hay *độ dài*. Sai tiêu chí = sai cả bài.
3. **Greedy local nhưng không global.** Lựa chọn tốt nhất tại bước này có thể đẩy bạn vào local optimum (ví dụ leo núi sương mù mục 1).
4. **Nhầm 0/1 với fractional knapsack.** Cắt được món → greedy ratio đúng. Không cắt → greedy ratio SAI, cần DP. Cặp này dễ nhầm nhất.
5. **Tổng quát hoá coin change.** Greedy chỉ đúng với hệ *canonical*. Hệ bất kỳ → DP.
6. **Quên edge case khi quét.** Jump game: phần tử \`0\` chặn đường; coin change: thiếu đồng \`1\` → có thể không trả được.

🔁 **Dừng lại tự kiểm tra.** Cho 0/1 knapsack \`W=4\`, món P(v=5,w=1), Q(v=6,w=2), R(v=7,w=3). Greedy ratio cho gì? Tối ưu là gì?

<details><summary>Đáp án</summary>ratio: P=5, Q=3, R≈2.33. Greedy lấy P(w=1) rồi Q(w=2) → còn chỗ 1, không lấy được R(w=3) → giá trị 5+6=11. Tối ưu: P(w=1)+R(w=3)=w 4, v=5+7=12 > 11. Greedy SAI → cần DP.</details>

📝 **Tóm tắt mục 9.**
- 6 cạm bẫy: tin greedy không chứng minh; sort sai tiêu chí; kẹt local; nhầm 0/1↔fractional; tổng quát coin change; quên edge case.

---

## 10. Ứng dụng thực tế trong phần mềm

> 💡 **Greedy = "chọn tốt nhất ở mỗi bước, không nhìn lại".** Khi nó đúng, nó vừa nhanh ($O(n \\log n)$) vừa đơn giản — nên hệ thống thật ưu tiên dùng greedy nếu chứng minh được.

| Ứng dụng | Greedy làm gì |
|----------|---------------|
| **Nén file (Huffman)** | Gộp 2 tần suất nhỏ nhất mỗi bước ([Lesson 21](../lesson-21-huffman-encoding/)) |
| **Định tuyến mạng (Dijkstra)** | Luôn mở rộng đỉnh gần nguồn nhất ([Lesson 33](../lesson-33-dijkstra/)) |
| **Lập lịch CPU/job (deadline)** | Chọn job ngắn nhất/gấp nhất trước |
| **Đổi tiền (hệ tiền chuẩn)** | Lấy mệnh giá lớn nhất ≤ số còn lại |
| **Cấp phát tài nguyên / load balancing** | Gán vào server tải thấp nhất hiện tại |

### 10.1. Ví dụ cụ thể — vì sao greedy hấp dẫn nhưng nguy hiểm

Lập lịch để **hoàn thành nhiều job nhất** trước deadline: sort theo thời gian kết thúc, chọn tham lam → đúng (activity selection, [Lesson 20](../lesson-20-interval-problems/)). Nhưng đổi tiền với mệnh giá \`{1, 3, 4}\` trả 6: greedy lấy \`4+1+1 = 3 đồng\`, tối ưu thật là \`3+3 = 2 đồng\`. Greedy **sai**. Cùng dạng bài, greedy đúng hay sai tùy cấu trúc → **phải chứng minh** (exchange argument / matroid) trước khi tin.

> ⚠ **Cạm bẫy production — dùng greedy vì "trông hợp lý" mà không chứng minh.** Greedy chạy nhanh và code ngắn nên dễ bị lạm dụng. Nếu không chắc greedy đúng, kiểm bằng **brute-force oracle** ([Lesson 05](../lesson-05-bruteforce-to-optimize/)) trên input nhỏ, hoặc chuyển sang **DP** ([Lesson 22](../lesson-22-greedy-vs-dp/)). Greedy sai cho kết quả "gần đúng" âm thầm — khó phát hiện hơn crash.

### 10.2. 📝 Tóm tắt mục 10

- Greedy thật trong: **Huffman**, **Dijkstra**, **scheduling**, **đổi tiền chuẩn**, **load balancing**.
- Hấp dẫn vì nhanh + đơn giản, nhưng **đúng hay sai tùy cấu trúc** → phải chứng minh.
- Không chắc → kiểm brute-force oracle hoặc dùng DP; greedy sai cho kết quả gần đúng âm thầm.

## Bài tập

> Mỗi bài đều có **Lời giải chi tiết** ở mục kế tiếp. Cố làm trước khi xem.

**Bài 1 — Fractional knapsack.** \`W = 50\`, món: A(v=140, w=20), B(v=60, w=10), C(v=120, w=30). Tính tổng giá trị greedy tối ưu. Cho độ phức tạp.

**Bài 2 — Coin change: greedy đúng hay sai?** Với từng hệ và số tiền, xác định greedy có tối ưu không, nếu sai cho phản ví dụ: (a) hệ {1,5,10,25}, trả 30; (b) hệ {1,7,10}, trả 14; (c) hệ {1,5,8}, trả 16.

**Bài 3 — Jump game (reach end).** \`nums = [2,0,2,0,1]\`. Có tới ô cuối không? Trình bày \`reach\` từng bước.

**Bài 4 — Gas station.** \`n\` trạm xăng vòng tròn, \`gas[i]\` xăng nhận tại trạm \`i\`, \`cost[i]\` xăng đi từ \`i\` tới \`i+1\`. Tìm trạm xuất phát để đi hết vòng (hoặc \`-1\`). \`gas=[1,2,3,4,5]\`, \`cost=[3,4,5,1,2]\`. Tìm trạm xuất phát + nêu thuật toán greedy + Big-O.

**Bài 5 — Assign cookies.** \`g\` = mức "đói" của trẻ (cần bánh ≥ g[i] mới hài lòng), \`s\` = kích cỡ bánh. Mỗi trẻ tối đa 1 bánh. Tối đa hoá số trẻ hài lòng. \`g=[1,2,3]\`, \`s=[1,1]\`. Tính kết quả + thuật toán + Big-O.

**Bài 6 — Chứng minh activity selection bằng exchange argument.** Viết lại đầy đủ chứng minh "sort theo thời gian kết thúc tăng dần là tối ưu" (có thể dựa khung mục 3.1), và giải thích vì sao bước "đổi" không làm lời giải tệ đi.

---

## Lời giải chi tiết

### Lời giải Bài 1 — Fractional knapsack

**Cách tiếp cận:** sort theo ratio v/w giảm dần, lấy tham lam.

| Món | v | w | ratio |
|-----|---|---|-------|
| A | 140 | 20 | 7.0 |
| B | 60 | 10 | 6.0 |
| C | 120 | 30 | 4.0 |

Sort giảm: A(7.0), B(6.0), C(4.0). \`W=50\`.

| Bước | Còn chỗ | Món | Lấy | Cộng giá trị | Tổng |
|------|---------|-----|-----|--------------|------|
| 1 | 50 | A (w=20) | toàn bộ | 140 | 140 |
| 2 | 30 | B (w=10) | toàn bộ | 60 | 200 |
| 3 | 20 | C (w=30) | 20/30 = 2/3 | 120×2/3 = 80 | **280** |

**Đáp án: 280.** Độ phức tạp: $O(n \\log n)$ (sort) + $O(n)$ (quét) = **$O(n \\log n)$**.

### Lời giải Bài 2 — Coin change greedy đúng/sai

**(a) {1,5,10,25}, trả 30.** Greedy: 25 + 5 = 2 đồng. Tối ưu cũng 2 đồng (25+5). **ĐÚNG** (hệ canonical).

**(b) {1,7,10}, trả 14.** Greedy: 10 + 1+1+1+1 = **5 đồng**. Tối ưu: 7 + 7 = **2 đồng**. **SAI.** Phản ví dụ: 14. Lấy đồng 10 làm lỡ cặp 7+7.

**(c) {1,5,8}, trả 16.** Greedy: 8 + 8 = **2 đồng**. Tối ưu: 8+8 = 2 đồng. Tại 16 thì **đúng**. Nhưng thử 10: greedy 8+1+1=3, tối ưu 5+5=2 → hệ {1,5,8} **không canonical** (sai tại amount=10). Với riêng câu hỏi (trả 16) greedy *trùng* tối ưu, nhưng hệ nói chung không tin được. Kết luận: **trả 16 đúng, nhưng hệ {1,5,8} không canonical** (phản ví dụ tại 10).

> 📝 Bài học: "đúng tại một số tiền" không suy ra "hệ canonical". Phải kiểm trên dải đủ rộng (hoặc DP).

### Lời giải Bài 3 — Jump game

\`nums = [2,0,2,0,1]\`, \`n=5\`, đích = chỉ số 4.

| i | nums[i] | reach trước | i ≤ reach? | reach mới |
|---|---------|-------------|------------|-----------|
| 0 | 2 | 0 | ✓ | max(0,0+2)=2 |
| 1 | 0 | 2 | ✓ | max(2,1+0)=2 |
| 2 | 2 | 2 | ✓ | max(2,2+2)=4 |
| 3 | 0 | 4 | ✓ | max(4,3+0)=4 |
| 4 | 1 | 4 | ✓ (4 ≤ 4) | đích đạt |

**Đáp án: CÓ tới được ô cuối.** Mấu chốt: tại \`i=2\` (giá trị 2) ta nhảy lên reach=4, vượt qua ô \`0\` ở \`i=3\`. Độ phức tạp: $O(n)$ thời gian, $O(1)$ bộ nhớ.

### Lời giải Bài 4 — Gas station

**Thuật toán greedy.** Nếu tổng \`gas\` ≥ tổng \`cost\` thì *chắc chắn* tồn tại lời giải duy nhất. Duyệt một lượt, giữ \`tank\` tích luỹ; khi \`tank < 0\` tại trạm \`i\`, mọi trạm xuất phát trong đoạn vừa qua đều thất bại → đặt lại điểm xuất phát = \`i+1\`, reset \`tank=0\`.

\`\`\`go
func canCompleteCircuit(gas, cost []int) int {
	total, tank, start := 0, 0, 0
	for i := range gas {
		diff := gas[i] - cost[i]
		total += diff
		tank += diff
		if tank < 0 { // không tới được trạm i+1 nếu xuất phát từ \`start\`
			start = i + 1
			tank = 0
		}
	}
	if total < 0 {
		return -1
	}
	return start
}
\`\`\`

**Walk-through \`gas=[1,2,3,4,5]\`, \`cost=[3,4,5,1,2]\`** → \`diff=[-2,-2,-2,3,3]\`, tổng = 0 ≥ 0.

| i | diff | tank | start |
|---|------|------|-------|
| 0 | -2 | -2 → <0 | reset start=1, tank=0 |
| 1 | -2 | -2 → <0 | reset start=2, tank=0 |
| 2 | -2 | -2 → <0 | reset start=3, tank=0 |
| 3 | 3 | 3 | 3 |
| 4 | 3 | 6 | 3 |

\`total=0 ≥ 0\` → **trạm xuất phát = 3** (chỉ số 3). Độ phức tạp: **$O(n)$** thời gian, $O(1)$ bộ nhớ. (Vì sao greedy đúng: nếu xuất phát từ \`start\` mà cạn xăng tại \`i\`, thì mọi trạm giữa \`start..i\` cũng cạn không muộn hơn — nên có thể bỏ qua cả đoạn, chỉ thử \`i+1\`.)

### Lời giải Bài 5 — Assign cookies

**Thuật toán:** sort cả \`g\` (độ đói) và \`s\` (cỡ bánh) tăng dần. Hai con trỏ: ghép bánh nhỏ nhất đủ thoả trẻ ít đói nhất chưa được phục vụ.

\`\`\`go
import "sort"
func findContentChildren(g, s []int) int {
	sort.Ints(g)
	sort.Ints(s)
	i, j, count := 0, 0, 0
	for i < len(g) && j < len(s) {
		if s[j] >= g[i] { // bánh j thoả trẻ i
			count++
			i++
		}
		j++ // bánh j dùng xong (thoả hoặc quá nhỏ -> bỏ)
	}
	return count
}
\`\`\`

**Walk-through \`g=[1,2,3]\`, \`s=[1,1]\`** (đã sort).

| i (trẻ) | j (bánh) | s[j]≥g[i]? | count |
|---------|----------|------------|-------|
| 0 (g=1) | 0 (s=1) | 1≥1 ✓ | 1, i→1 |
| 1 (g=2) | 1 (s=1) | 1≥2 ✗ | 1, j→2 hết bánh |

**Đáp án: 1 trẻ hài lòng.** Greedy đúng vì: bánh nhỏ nhất nên dành cho trẻ ít đói nhất mà nó thoả được (đổi argument: nếu một OPT dùng bánh lớn cho trẻ ít đói, đổi sang bánh nhỏ đủ thoả → bánh lớn để dành cho trẻ đói hơn, không tệ đi). Độ phức tạp: **$O(n \\log n)$** (sort).

### Lời giải Bài 6 — Exchange argument cho activity selection

**Phát biểu:** sort hoạt động theo thời gian kết thúc \`f\` tăng dần, lặp chọn hoạt động đầu tiên tương thích với hoạt động vừa chọn — cho lịch có **số hoạt động nhiều nhất**.

**Chứng minh đầy đủ** (lặp lại khung mục 3.1, bổ sung giải thích "đổi"):

- Gọi \`G=g₁..g_k\` (greedy, sort theo \`f\`), \`OPT=o₁..o_m\` (một tối ưu, sort theo \`f\`).
- **Bổ đề:** $f(g_r) \\leq f(o_r)$ với mọi $r \\leq k$.
  - *Cơ sở:* $g_1$ kết thúc sớm nhất toàn cục → $f(g_1) \\leq f(o_1)$.
  - *Quy nạp:* giả sử $f(g_{r-1}) \\leq f(o_{r-1})$. Do OPT hợp lệ: $s(o_r) \\geq f(o_{r-1}) \\geq f(g_{r-1})$, nên $o_r$ tương thích với $g_{r-1}$, là ứng viên hợp lệ ở bước $r$. Greedy chọn hoạt động *kết thúc sớm nhất* trong các ứng viên → $f(g_r) \\leq f(o_r)$.
- **Suy ra $k = m$:** giả sử $m > k$. Khi đó $o_{k+1}$ tồn tại và $s(o_{k+1}) \\geq f(o_k) \\geq f(g_k)$ (theo bổ đề) → $o_{k+1}$ tương thích với $g_k$. Vậy còn ứng viên hợp lệ → greedy *không thể* đã dừng ở $g_k$. Mâu thuẫn. Do đó $m = k$.

**Vì sao bước "đổi" không làm lời giải tệ đi:** trong cách trình bày "stays ahead", phép đổi ngầm là thay $o_r$ bằng $g_r$. Vì $f(g_r) \\leq f(o_r)$, hoạt động $g_r$ kết thúc *không muộn hơn* $o_r$, nên mọi hoạt động sau ($o_{r+1}, \\ldots$) vẫn tương thích với $g_r$ (chúng đã tương thích với $o_r$ có $f$ lớn hơn). Số lượng hoạt động không đổi ($OPT'$ vẫn $m$ cái) → vẫn tối ưu. Lặp lại với mọi $r$ → biến OPT thành G mà số lượng giữ nguyên → **G tối ưu**. ∎

Độ phức tạp thuật toán: **$O(n \\log n)$** (sort) + $O(n)$ (quét).

---

## Code & Minh hoạ

- **Code Go inline** ở các mục 4.1, 4.2, 4.3, 5.2 và phần Lời giải (gas station, assign cookies) — đều biên dịch được, kèm walk-through bằng số.
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Fractional knapsack** — animate sort theo ratio, lấy tham lam tới khi đầy ba lô.
  2. **Greedy đúng vs sai** — coin change hệ {1,5,10,25} (đúng) vs {1,3,4} (sai), so greedy với optimal.
  3. **Exchange argument** — visualize việc "đổi" một lời giải tối ưu thành lời giải greedy.

---

## Bài tiếp theo

- **[Lesson 20 — Interval Problems](../lesson-20-interval-problems/)** — áp dụng greedy vào lớp bài interval: activity selection (chứng minh đầy đủ ở đây), merge intervals, interval scheduling, minimum arrows... Tiêu chí sort theo endpoint là trung tâm.
- Khi greedy sai (0/1 knapsack, coin change tổng quát) → **[Tier 4 — Dynamic Programming](../tier-4-dynamic-programming/index.html)**.

## Tham khảo

- CLRS, *Introduction to Algorithms*, Ch. 16 (Greedy Algorithms) — greedy-choice property, optimal substructure, activity selection, Huffman.
- Kleinberg & Tardos, *Algorithm Design*, Ch. 4 — exchange argument, "greedy stays ahead".
`;
