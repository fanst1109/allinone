// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-51-complexity-tradeoffs/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 51 — Đánh đổi độ phức tạp (Complexity Trade-offs)

> Tier 8 · Bài 51. Đây không phải bài về một thuật toán mới — mà về **kỹ năng cấp cao nhất**:
> biết rằng mỗi cách giải đều đánh đổi một thứ để được một thứ khác, và biết **chọn đúng đánh đổi
> cho đúng ngữ cảnh**. Người mới hỏi "thuật toán nào nhanh nhất?"; người giỏi hỏi "nhanh theo nghĩa
> nào, trong điều kiện nào, đổi lấy cái gì?".

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu nguyên lý **"không có bữa trưa miễn phí"** (no free lunch): tối ưu một trục thường tốn một trục khác.
- Nắm 8 trục đánh đổi cốt lõi: **time↔space**, **precompute↔query**, **online↔offline**,
  **average↔worst**, **amortized↔per-op**, **exact↔approximate**, **latency↔throughput**, **readability↔performance**.
- Phân tích được **điểm hòa vốn** (break-even) của precompute qua số lượng query.
- Có một **khung quyết định** để chọn đánh đổi: hỏi đúng câu hỏi trước khi viết code.
- Tránh các cạm bẫy kinh điển: tối ưu nhầm bottleneck, precompute khi ít query, cache khi data đổi liên tục, over-engineer.

## Kiến thức tiền đề

- [Lesson 01 — Big-O & tiệm cận](../lesson-01-bigo-asymptotic/) — ngôn ngữ để nói về time/space.
- [Lesson 02 — Phân tích amortized](../lesson-02-amortized-analysis/) — nền cho trục amortized↔per-op.
- [Lesson 15 — Prefix sum & difference](../lesson-15-prefix-sum-difference/) — ví dụ precompute kinh điển.
- [Lesson 16 — Kỹ thuật hashing](../lesson-16-hashing-techniques/) — đổi space lấy time, average↔worst.
- [Lesson 30 — Tối ưu DP](../lesson-30-dp-optimization/) — rolling array, đổi time↔space trong DP.
- [Lesson 48 — Thuật toán ngẫu nhiên](../lesson-48-randomized-algorithms/) & [Lesson 49 — NP & xấp xỉ](../lesson-49-np-completeness/) — exact↔approximate.
- [Lesson 50 — Khung giải quyết bài toán](../lesson-50-problem-solving-framework/) — bài này là bước "chọn cách" trong khung đó.

---

## 1. Không có bữa trưa miễn phí

> 💡 **Trực giác / Hình dung.** Hãy nghĩ tới một cái cân bập bênh. Nhấn mạnh đầu "thời gian"
> xuống thì đầu "bộ nhớ" bật lên. Hiếm khi có một cú đẩy làm cả hai đầu cùng hạ. Lập trình tối ưu
> phần lớn là **dời cân bằng**, không phải xoá bỏ chi phí. Chi phí chỉ chuyển chỗ.

Tên gọi "no free lunch" đến từ câu thành ngữ "không có bữa trưa miễn phí" — ai đó luôn phải trả tiền.
Trong thuật toán, "tiền" có nhiều mệnh giá khác nhau:

| Trục | Bạn cho đi | Bạn nhận lại |
|------|-----------|--------------|
| Time ↔ Space | thêm bộ nhớ | truy vấn nhanh hơn |
| Precompute ↔ Query | thời gian dựng trước | mỗi query rẻ hơn |
| Average ↔ Worst | đảm bảo trường hợp tệ | trung bình nhanh hơn |
| Exact ↔ Approximate | độ chính xác | tốc độ / khả thi |
| Latency ↔ Throughput | độ trễ từng item | tổng thông lượng |
| Readability ↔ Performance | sự dễ đọc | vài % tốc độ |

**Điểm cốt lõi:** không tồn tại "thuật toán tốt nhất" tuyệt đối. Chỉ có "tốt nhất cho ngữ cảnh này".
Một hash table tuyệt vời cho 1 triệu lookup ngẫu nhiên có thể là lựa chọn tồi cho hệ thống real-time
cần đảm bảo mỗi thao tác dưới 1ms (vì worst-case của nó là O(n)).

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy chẳng lẽ không bao giờ có cải tiến thật, chỉ là dời chi phí?"* — Có chứ. Đôi khi ta tìm
>   ra thuật toán **Pareto tốt hơn**: tốt hơn ở một trục mà không tệ hơn ở trục nào (vd merge sort
>   O(n log n) thắng bubble sort O(n²) ở time mà space cũng không tệ hơn đáng kể). Trade-off là khi
>   bạn đã ở trên **biên Pareto** — muốn hơn trục này phải nhả trục kia.
> - *"Làm sao biết mình đang ở biên Pareto?"* — Khi mọi cải tiến bạn nghĩ ra đều kéo theo cái giá ở
>   chỗ khác. Đó là lúc câu hỏi chuyển từ "tối ưu thế nào" sang "đánh đổi cái gì".

> 📝 **Tóm tắt mục 1.**
> - Tối ưu = dời cân bằng giữa các trục, không xoá chi phí.
> - Không có "thuật toán tốt nhất" tuyệt đối, chỉ có "tốt nhất cho ngữ cảnh".
> - Khi đã ở biên Pareto, mọi cải tiến một trục đều tốn một trục khác.

---

## 2. Time vs Space — trục cơ bản nhất

> 💡 **Trực giác.** Bộ nhớ là "ghi chú để khỏi tính lại". Nếu bạn ghi sẵn đáp án vào sổ, lần sau
> tra cực nhanh nhưng tốn giấy. Nếu không ghi, tiết kiệm giấy nhưng mỗi lần phải tính lại.

### 2.1 Đổi space lấy time

Bỏ thêm bộ nhớ để truy vấn nhanh hơn. Bốn ví dụ kinh điển:

1. **Hash table** — O(n) space để có lookup O(1) trung bình. Thay vì duyệt mảng O(n) tìm phần tử.
2. **Memoization (DP)** — lưu kết quả con để không tính lại. Fibonacci đệ quy thuần O(2ⁿ) → memo O(n).
3. **Precompute table** — bảng tra sẵn. Vd \`popcount[256]\` để đếm bit 1 trong byte tức thì.
4. **Prefix sum** — mảng tổng tích lũy O(n) space để range-sum O(1). (Xem [Lesson 15](../lesson-15-prefix-sum-difference/).)

**Walk-through bằng số — Fibonacci.** Tính F(40):
- Đệ quy thuần: số phép cộng ≈ F(40) = **102,334,155** lần gọi. Space O(40) stack.
- Memoization: mỗi F(k) tính đúng **1 lần** → **40** phép cộng. Space O(40) bảng memo.
- Đánh đổi: thêm mảng 40 phần tử (≈320 byte) đổi lấy giảm từ 10⁸ xuống 40 phép tính. **Quá hời.**

Minh hoạ memoization vs đệ quy thuần bằng Go:

\`\`\`go
// fibNaive: đệ quy thuần, tính lại cùng một F(k) rất nhiều lần.
// Time: O(φⁿ) ≈ O(1.618ⁿ) — mũ. Space: O(n) stack đệ quy.
func fibNaive(n int) int {
    if n < 2 {
        return n
    }
    return fibNaive(n-1) + fibNaive(n-2) // F(n-2) bị tính lại chồng chéo → bùng nổ
}

// fibMemo: lưu kết quả đã tính vào memo → mỗi F(k) chỉ tính 1 lần.
// Time: O(n). Space: O(n) cho bảng memo + O(n) stack.
func fibMemo(n int, memo []int) int {
    if n < 2 {
        return n
    }
    if memo[n] != -1 {
        return memo[n] // đã tính rồi → trả ngay, không tính lại (đổi space lấy time)
    }
    memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo)
    return memo[n]
}
\`\`\`

**Bảng đánh đổi (số liệu):**

| n | fibNaive — số lần gọi | fibMemo — số phép cộng | Tỉ lệ giảm |
|---|----------------------|------------------------|------------|
| 10 | 177 | 9 | ~20× |
| 20 | 21,891 | 19 | ~1150× |
| 30 | 2,692,537 | 29 | ~93,000× |
| 40 | 331,160,281 | 39 | ~8,500,000× |

> ❓ **Câu hỏi tự nhiên.** *"Memo tốn O(n) space, có cách nào ít hơn không?"* — Có. Fibonacci chỉ cần
> **2 giá trị trước đó** để tính giá trị kế → dùng **rolling** chỉ 2 biến, đưa space xuống **O(1)** mà
> time vẫn O(n). Đây lại là một đánh đổi (mục 2.2): bỏ bảng memo (mất khả năng tra cứu F(k) bất kỳ về
> sau) để lấy O(1) space. Chọn memo nếu cần tra nhiều giá trị; chọn rolling nếu chỉ cần F(n) cuối.

### 2.2 Đổi time lấy space

Ngược lại: chấp nhận chậm hơn để tiết kiệm bộ nhớ. Khi nào? Khi bộ nhớ là ràng buộc cứng
(thiết bị nhúng, dữ liệu khổng lồ, cache CPU).

1. **Tính lại thay vì lưu** — không giữ kết quả trung gian, cần thì tính lại.
2. **Rolling array** — DP chỉ giữ 1-2 hàng thay vì cả bảng. (Xem [Lesson 30](../lesson-30-dp-optimization/).)
   Vd DP grid n×m: đổi từ O(n·m) space xuống O(m) space, cùng time.
3. **In-place algorithm** — sắp xếp/biến đổi ngay trên mảng gốc, O(1) space phụ.

**Walk-through bằng số — đảo ngược mảng n=10⁶ phần tử int (4 byte):**
- Dùng mảng phụ: cấp phát thêm **4 MB**, copy ngược. Time O(n), space O(n).
- In-place (đổi chỗ 2 đầu vào trong): space phụ **8 byte** (vài biến). Time O(n) như cũ.
- Đánh đổi: ở đây in-place **thắng tuyệt đối** vì cùng time mà ít space hơn nhiều → đây là cải tiến Pareto, không phải trade-off thực sự.

Minh hoạ in-place vs dùng mảng phụ bằng Go:

\`\`\`go
// reverseExtra: tạo mảng mới, copy ngược. Space phụ O(n).
func reverseExtra(a []int) []int {
    out := make([]int, len(a)) // cấp phát n phần tử mới
    for i, v := range a {
        out[len(a)-1-i] = v
    }
    return out
}

// reverseInPlace: đổi chỗ 2 đầu, thu dần vào giữa. Space phụ O(1) (chỉ lo, hi và tạm).
func reverseInPlace(a []int) {
    for lo, hi := 0, len(a)-1; lo < hi; lo, hi = lo+1, hi-1 {
        a[lo], a[hi] = a[hi], a[lo] // hoán đổi tại chỗ, không cấp thêm bộ nhớ
    }
}
\`\`\`

**Bảng đánh đổi (n = 10⁶ int):**

| Tiêu chí | reverseExtra | reverseInPlace |
|----------|--------------|----------------|
| Time | O(n) | O(n) |
| Space phụ | O(n) ≈ 4 MB | O(1) ≈ 8 byte |
| Giữ mảng gốc | Có (không phá input) | Không (sửa tại chỗ) |
| Khi nào chọn | cần giữ nguyên input | memory chật, được phép sửa input |

> ⚠ **Lỗi thường gặp.** In-place không phải lúc nào cũng "tốt hơn": nó **phá mảng gốc**. Nếu nơi gọi
> còn cần input nguyên vẹn, dùng in-place sẽ sinh bug khó tìm. Đánh đổi space ở đây cũng là đánh đổi
> "có giữ được input gốc không".

### 2.3 Case study: Two-Sum

Bài toán: cho mảng \`a\` và \`target\`, tìm hai chỉ số \`i, j\` sao cho \`a[i] + a[j] = target\`.

**Cách A — hash table (đổi space lấy time):**

\`\`\`go
// twoSumHash: dùng map lưu giá trị đã thấy → mỗi phần tử kiểm tra "đã thấy phần bù chưa".
// Time: O(n) — duyệt 1 lần. Space: O(n) — map chứa tối đa n phần tử.
func twoSumHash(a []int, target int) (int, int) {
    seen := make(map[int]int, len(a)) // value -> index
    for j, v := range a {
        need := target - v // phần bù cần tìm
        if i, ok := seen[need]; ok {
            return i, j // tìm thấy cặp (i, j)
        }
        seen[v] = j
    }
    return -1, -1
}
\`\`\`

**Cách B — two-pointer trên mảng đã sort (đổi time lấy space):**

\`\`\`go
import "sort"

// twoSumTwoPointer: sort trước, rồi 2 con trỏ từ 2 đầu thu hẹp lại.
// Time: O(n log n) do sort thống trị. Space: O(1) phụ (không tính việc sort in-place).
// LƯU Ý: sort làm mất chỉ số gốc → phải kèm chỉ số nếu cần trả về vị trí ban đầu.
func twoSumTwoPointer(a []int, target int) (int, int) {
    type pair struct{ val, idx int }
    p := make([]pair, len(a))
    for i, v := range a {
        p[i] = pair{v, i}
    }
    sort.Slice(p, func(i, j int) bool { return p[i].val < p[j].val })
    lo, hi := 0, len(p)-1
    for lo < hi {
        s := p[lo].val + p[hi].val
        switch {
        case s == target:
            return p[lo].idx, p[hi].idx
        case s < target:
            lo++ // tổng nhỏ → đẩy đầu trái lên
        default:
            hi-- // tổng lớn → kéo đầu phải xuống
        }
    }
    return -1, -1
}
\`\`\`

**Bảng đánh đổi (số liệu, n = 10⁶):**

| Tiêu chí | Hash (A) | Two-pointer (B) |
|----------|----------|-----------------|
| Time | O(n) ≈ 10⁶ thao tác | O(n log n) ≈ 2·10⁷ thao tác |
| Space phụ | O(n) ≈ map 10⁶ entry (~vài chục MB) | O(1) (nếu sort in-place) hoặc O(n) cho mảng pair |
| Giữ thứ tự gốc | Có | Mất (phải kèm chỉ số) |
| Khi nào chọn | Cần nhanh, dư memory, mảng chưa sort | Memory chật, mảng **đã** sort sẵn, hoặc cần nhiều truy vấn trên cùng mảng sort |

> ⚠ **Lỗi thường gặp.** Chọn two-pointer "vì nó O(1) space" nhưng **quên cái giá sort O(n log n)**.
> Nếu mảng chưa sort và bạn chỉ chạy một lần, hash thường thắng. Two-pointer chỉ hời khi mảng đã sort
> sẵn (sort được amortize qua nhiều truy vấn) hoặc memory thực sự là ràng buộc cứng.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Mảng đã sort sẵn, chạy 1 query, memory thoải mái. Chọn cách nào?
> 2. Mảng chưa sort, chạy 1 query. Chọn cách nào?
>
> <details><summary>Đáp án</summary>
>
> 1. Two-pointer — mảng đã sort nên bỏ qua chi phí O(n log n), còn O(n) time + O(1) space, thắng hash về cả time lẫn space.
> 2. Hash — sort sẽ tốn O(n log n) vô ích cho 1 query; hash cho O(n) ngay.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Đổi space lấy time: hash, memo, precompute table, prefix sum.
> - Đổi time lấy space: tính lại, rolling array, in-place.
> - Two-sum: hash (O(n) time, O(n) space) vs two-pointer (O(n log n) time, O(1) space) — chọn theo: mảng đã sort chưa, memory budget, số query.

---

## 3. Precompute vs Query

> 💡 **Trực giác.** Precompute như nấu sẵn cả nồi cơm cho cả tuần: tốn công một lần, mỗi bữa lấy ra
> ăn ngay. Nếu chỉ ăn 1 bữa thì nấu cả nồi là phí — thà nấu đúng 1 bát.

Trục này hỏi: **chi phí dựng trước có được trả lại qua đủ nhiều query không?**

- **Nhiều query → precompute.** Trả chi phí dựng một lần, mỗi query sau đó rẻ.
  Ví dụ: prefix sum (dựng O(n), query O(1)), sparse table cho RMQ (dựng O(n log n), query O(1)),
  segment tree (dựng O(n), query/update O(log n)).
- **Ít query / data đổi liên tục → tính trực tiếp.** Nếu chỉ hỏi vài lần, hoặc data thay đổi sau mỗi
  query làm bảng precompute hết hạn, thì dựng bảng là lãng phí.

### 3.1 Case study: Range Sum

Bài toán: trả lời nhiều truy vấn "tổng của \`a[l..r]\`".

**Naive (không precompute):** mỗi query duyệt từ \`l\` tới \`r\`.

\`\`\`go
// rangeSumNaive: cộng trực tiếp mỗi query. Build O(1), mỗi query O(n) worst.
func rangeSumNaive(a []int, l, r int) int {
    s := 0
    for i := l; i <= r; i++ {
        s += a[i]
    }
    return s
}
\`\`\`

**Prefix sum (precompute):** dựng mảng \`pre\` với \`pre[i] = a[0]+...+a[i-1]\`.

\`\`\`go
// buildPrefix: dựng prefix sum. Build O(n), space O(n).
func buildPrefix(a []int) []int {
    pre := make([]int, len(a)+1)
    for i, v := range a {
        pre[i+1] = pre[i] + v // pre[i+1] = tổng a[0..i]
    }
    return pre
}

// rangeSumPrefix: mỗi query chỉ 1 phép trừ. Query O(1).
func rangeSumPrefix(pre []int, l, r int) int {
    return pre[r+1] - pre[l] // tổng a[l..r]
}
\`\`\`

**Phân tích điểm hòa vốn (break-even).** Gọi \`q\` = số query, \`n\` = kích thước mảng.
- Tổng chi phí naive: $q \\cdot O(n) = q \\cdot n$.
- Tổng chi phí prefix: dựng $O(n) + q \\cdot O(1) = n + q$.

Prefix thắng khi $n + q < q \\cdot n$, tức gần như **luôn thắng ngay khi q ≥ 2** (với n lớn). Walk-through số:

| n | q | Naive (q·n) | Prefix (n + q) | Người thắng |
|---|---|-------------|----------------|-------------|
| 1000 | 1 | 1,000 | 1,001 | Naive (sít sao) |
| 1000 | 2 | 2,000 | 1,002 | Prefix |
| 1000 | 100 | 100,000 | 1,100 | Prefix (cách biệt 90×) |
| 1000 | 10⁶ | 10⁹ | 1,001,000 | Prefix (1000×) |

> ❓ **Câu hỏi tự nhiên.**
> - *"Nếu chỉ có đúng 1 query thì sao?"* — Naive thắng sát nút: prefix tốn $n$ để dựng + $1$ để query
>   = $n+1$, còn naive chỉ $n$. Không đáng dựng bảng cho 1 query.
> - *"Nếu mảng thay đổi giữa các query thì sao?"* — Mỗi lần đổi 1 phần tử, prefix phải dựng lại O(n)
>   (hoặc cập nhật O(n) các phần tử sau nó). Lúc này **segment tree** (update O(log n)) hợp hơn prefix.
>   Đây chính là cầu nối sang trục Online vs Offline ở mục 4.

> 🔁 **Dừng lại tự kiểm tra.** Bạn cần trả lời 50 range-sum query trên mảng tĩnh n=10⁵. Dùng gì?
> <details><summary>Đáp án</summary>
> Prefix sum. Build 10⁵ + query 50 ≈ 100,050 vs naive 50·10⁵ = 5·10⁶. Prefix nhanh hơn ~50×.
> Mảng tĩnh nên không cần segment tree.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Nhiều query trên data tĩnh → precompute (prefix, sparse table).
> - Ít query hoặc data đổi liên tục → tính trực tiếp.
> - Break-even: prefix sum thắng naive ngay khi q ≥ 2; chi phí build amortize qua số query.

---

## 4. Online vs Offline

> 💡 **Trực giác.** Offline = bạn được phát **toàn bộ đề thi** trước, tự do sắp xếp thứ tự làm bài
> để tối ưu. Online = đề bài đến **từng câu một**, trả lời xong mới được câu tiếp, không nhìn trước.

- **Offline:** biết tất cả query (và thứ tự không quan trọng) trước khi bắt đầu xử lý.
  → Có thể **sort/batch** query để xử lý hiệu quả. Kỹ thuật: offline query sorting, **Mo's algorithm**
  (sắp query theo block rồi di chuyển con trỏ), sweep line.
- **Online:** query đến tuần tự, phải trả lời ngay, có thể có update xen kẽ.
  → Cần **cấu trúc dữ liệu động**: segment tree, balanced BST, Fenwick tree.

### 4.1 Case study: nhiều range-sum query có cả update

- **Nếu offline & chỉ query (không update):** sort query, hoặc prefix sum (mục 3) — đơn giản nhất.
- **Nếu online & có update xen kẽ:** prefix sum hỏng (mỗi update phá O(n) phần tử của \`pre\`).
  Dùng **Fenwick/segment tree**: cả query lẫn update O(log n).

**Walk-through số.** n = 10⁵, 10⁵ thao tác xen kẽ query+update:
- Prefix sum: mỗi update dựng lại O(n) → 10⁵ · 10⁵ = **10¹⁰** (chậm chết).
- Segment tree: mỗi thao tác O(log n) ≈ 17 → 10⁵ · 17 ≈ **1.7·10⁶**. Nhanh hơn ~6000×.

> ⚠ **Lỗi thường gặp.** Cố ép một bài online vào lời giải offline. Nếu hệ thống thật sự nhận query
> real-time (vd dashboard, API), bạn **không** có sẵn toàn bộ query để sort — phải dùng cấu trúc động
> dù nó hằng số lớn hơn.

> 📝 **Tóm tắt mục 4.**
> - Offline (biết hết query trước) → được sort/batch (Mo's, sweep line).
> - Online (query tuần tự, có update) → cấu trúc động (segment tree, BBST, Fenwick).
> - Có update xen kẽ là dấu hiệu mạnh phải dùng online structure.

---

## 5. Average vs Worst case

> 💡 **Trực giác.** Average-case như "trung bình mỗi ngày tôi đi làm mất 20 phút". Worst-case như
> "nhưng hôm kẹt xe có thể mất 2 tiếng". Nếu bạn lái xe cứu thương thì 2 tiếng worst-case là không
> chấp nhận được, dù trung bình rất tốt.

| Thuật toán | Average | Worst | Worst xảy ra khi |
|------------|---------|-------|------------------|
| Hash table lookup | O(1) | O(n) | nhiều collision (đối thủ cố tình, hoặc hash xấu) |
| Quicksort | O(n log n) | O(n²) | pivot luôn rơi vào min/max (mảng đã sort + pivot ngu) |
| Skip list | O(log n) | O(n) | xui xẻo tung đồng xu (xác suất cực thấp) |

**Khi nào chấp nhận average:**
- Hệ thống **thông thường**, input không thù địch, ưu tiên throughput trung bình. → Quicksort, hash đều ổn.

**Khi nào cần worst-case guarantee:**
- **Real-time / an toàn**: máy bay, y tế, giao dịch tần suất cao — một lần O(n²) có thể gây thảm hoạ.
  → Dùng merge sort (O(n log n) worst đảm bảo) hoặc heapsort.
- **Adversarial input**: kẻ tấn công có thể chọn input để ép worst-case. Vd **hash flooding attack** —
  gửi hàng loạt key cùng bucket để biến O(1) thành O(n), làm sập server.
  → Dùng **randomized hashing** (seed ngẫu nhiên, xem [Lesson 48](../lesson-48-randomized-algorithms/)) hoặc
  cấu trúc cân bằng đảm bảo (red-black tree). Go map dùng hash seed ngẫu nhiên mỗi lần chạy chính vì lý do này.

**Walk-through bằng số — quicksort pivot ngu trên mảng đã sort.** Mảng \`[1,2,3,4,5]\`, luôn chọn pivot
là phần tử cuối:
- Phân hoạch quanh \`5\`: mọi phần tử khác đều < 5 → một bên có 4 phần tử, bên kia rỗng. **Không cân.**
- Lần sau quanh \`4\`: lại 3 vs 0. Rồi \`3\`: 2 vs 0... → độ sâu đệ quy = n, mỗi mức quét $O(n)$ → $O(n^2)$.
- Số so sánh: 4+3+2+1 = **10** cho n=5; tổng quát n(n−1)/2. Với n=10⁴ → ~5·10⁷ so sánh thay vì
  n·log₂n ≈ 1.3·10⁵. **Chậm gấp ~380×** chỉ vì input "vô tình" đã sort.

| Pivot strategy | Trên mảng đã sort | Trên mảng ngẫu nhiên |
|----------------|-------------------|----------------------|
| Luôn lấy cuối | O(n²) — thảm hoạ | O(n log n) trung bình |
| Random pivot | O(n log n) kỳ vọng | O(n log n) kỳ vọng |
| Median-of-three | O(n log n) gần như luôn | O(n log n) |

Đây là lý do thư viện **không bao giờ** dùng pivot cố định: một input đã sort (rất phổ biến trong thực
tế!) sẽ kích hoạt worst-case. Randomized pivot biến worst-case thành "xui xẻo xác suất cực thấp".

> ❓ **Câu hỏi tự nhiên.** *"Quicksort worst O(n²) sao vẫn được dùng làm sort mặc định nhiều nơi?"*
> Vì (a) average O(n log n) với hằng số nhỏ, cache-friendly, in-place; (b) dùng **randomized pivot**
> hoặc **median-of-three** để khiến worst-case gần như không bao giờ xảy ra với input thực. Nhiều thư
> viện dùng **introsort**: chạy quicksort, nếu độ sâu đệ quy vượt ngưỡng thì chuyển sang heapsort →
> đảm bảo O(n log n) worst mà vẫn nhanh trung bình. Đó là cách "ăn cả hai".

> 📝 **Tóm tắt mục 5.**
> - Average tốt + worst tệ: hash O(1)/O(n), quicksort O(n log n)/O(n²).
> - General system → chấp nhận average.
> - Real-time / adversarial → cần worst guarantee (merge sort, BBST, randomized/seeded hash).

---

## 6. Amortized vs per-operation

> 💡 **Trực giác.** Amortized như trả góp: tổng tiền nhà chia đều ra nhiều tháng nên "trung bình mỗi
> tháng" nhỏ. Nhưng **có một tháng** bạn phải đóng cọc lớn. Nếu tháng đó bạn không đủ tiền mặt thì
> "trung bình thấp" không cứu được bạn.

(Nền tảng: [Lesson 02 — Amortized analysis](../lesson-02-amortized-analysis/).)

**Dynamic array (slice/vector):** \`append\` là **O(1) amortized** — nhưng khi mảng đầy, một lần append
phải cấp phát mảng gấp đôi và copy toàn bộ → lần đó tốn **O(n)**.

**Walk-through số.** Append 8 phần tử vào slice bắt đầu rỗng (doubling): chi phí copy ở các lần
resize = 1 + 2 + 4 = 7, cộng 8 lần ghi = 15 thao tác cho 8 append → **~1.9/append amortized**. Nhưng
lần append thứ 9 (khi cap=8 đầy) tốn riêng **8** thao tác copy.

| Tiêu chí | Amortized O(1) | Per-op O(n) thỉnh thoảng |
|----------|----------------|--------------------------|
| Tổng n thao tác | O(n) — tuyệt vời | — |
| Một thao tác lẻ | có thể O(n) | đúng là O(n) |
| Phù hợp | batch, throughput | KHÔNG phù hợp real-time |

**Khi nào amortized KHÔNG đủ:** hệ real-time cần **per-operation bound** — mỗi thao tác phải dưới
deadline cố định (vd audio 48kHz: mỗi mẫu < ~20µs). Một lần resize O(n) gây "giật" → âm thanh rè.
→ Dùng cấu trúc với worst-case per-op đảm bảo, hoặc **pre-allocate** đủ capacity từ đầu để tránh resize.

> 🔁 **Dừng lại tự kiểm tra.** Game vật lý 60 FPS (mỗi frame 16.6ms) thêm/xoá object liên tục. Slice
> append amortized O(1) có an toàn không?
> <details><summary>Đáp án</summary>
> Rủi ro: nếu nhiều object append cùng một frame trúng lần resize O(n), frame đó có thể vượt 16.6ms →
> tụt frame ("hitch"). Giải pháp: pre-allocate capacity (\`make([]T, 0, expectedMax)\`) để resize không
> xảy ra trong vòng đời nóng. Đây là đổi space (cấp dư) lấy per-op bound ổn định.
> </details>

> 📝 **Tóm tắt mục 6.**
> - Amortized O(1) tốt cho tổng/throughput, nhưng có thao tác lẻ O(n).
> - Real-time cần per-op bound → pre-allocate hoặc cấu trúc worst-case đảm bảo.

---

## 7. Exact vs Approximate

> 💡 **Trực giác.** Tìm đường đi **ngắn nhất tuyệt đối** có thể tốn hàng giờ; tìm đường "ngắn gần
> bằng, lệch tối đa 5%" có thể tốn 1 giây. Nếu bạn đang chỉ đường giao hàng, 5% lệch chấp nhận được.

(Nền tảng: [Lesson 49 — NP-completeness & xấp xỉ](../lesson-49-np-completeness/).)

Với bài **NP-hard** (TSP, vertex cover, knapsack với số lớn...), tìm lời giải **chính xác** có thể tốn
thời gian mũ → bất khả thi với input lớn. Đánh đổi: chấp nhận lời giải **gần đúng** (approximation) hoặc
**heuristic** để có kết quả "đủ tốt" trong thời gian đa thức.

| Cách | Time | Chất lượng | Khi dùng |
|------|------|-----------|----------|
| Exact (brute / DP mũ) | mũ | tối ưu tuyệt đối | input nhỏ, cần chính xác (vd kế toán) |
| Approximation algorithm | đa thức | có cận sai số (vd ≤ 2× tối ưu) | input lớn, chấp nhận lệch có kiểm soát |
| Heuristic (greedy, local search) | nhanh | không đảm bảo cận | input rất lớn, cần "đủ dùng" nhanh |

**Khi nào chấp nhận approximate:** input lớn + NP-hard + sai số nhỏ không gây hậu quả nghiêm trọng
(định tuyến, gợi ý, lập lịch). **Khi nào cần exact:** tài chính, mật mã, hoặc input đủ nhỏ để exact khả thi.

> ⚠ **Lỗi thường gặp.** Dùng exact (brute force mũ) cho input lớn rồi than "chương trình treo". Hoặc
> ngược lại: dùng approximate cho bài thực ra **có** lời giải exact đa thức (vd shortest path có Dijkstra
> O(E log V)) — đánh đổi độ chính xác một cách vô ích.

> 📝 **Tóm tắt mục 7.**
> - NP-hard + input lớn → approximate/heuristic đổi độ chính xác lấy tính khả thi.
> - Cần chính xác tuyệt đối hoặc input nhỏ → exact.
> - Đừng approximate khi đã có thuật toán exact đa thức.

---

## 8. Latency vs Throughput

> 💡 **Trực giác.** Một chiếc xe buýt 50 chỗ chở được nhiều người/giờ (throughput cao) nhưng mỗi
> người phải **chờ đầy xe** mới đi (latency cao). Một chiếc taxi đi ngay (latency thấp) nhưng tổng
> số người chở/giờ ít hơn (throughput thấp).

- **Throughput** = số việc hoàn thành / đơn vị thời gian. **Latency** = thời gian từ lúc gửi tới lúc xong **một** việc.
- **Batch processing**: gom nhiều item xử lý một lượt → throughput cao (chia sẻ overhead, tận dụng cache/SIMD)
  nhưng latency cao (item đầu phải chờ gom đủ lô).
- **Streaming / per-item**: xử lý ngay khi item tới → latency thấp nhưng throughput thấp hơn (overhead mỗi item).

**Walk-through số.** Ghi 10⁶ bản ghi vào DB:
- Batch 1000 bản/lần: ~1000 lần round-trip mạng. Throughput cao, nhưng bản ghi đầu chờ tới khi đủ 1000.
- Từng bản một: 10⁶ round-trip → chậm tổng thể, nhưng mỗi bản ghi xong ngay (latency thấp).

**Khi nào chọn gì:** dashboard/analytics (cần throughput, latency vài giây OK) → batch. Chat/giao dịch
real-time (mỗi tin nhắn phải hiện ngay) → streaming. Nhiều hệ thực tế dùng **micro-batching** (gom theo
cửa sổ nhỏ vd 50ms) để cân bằng cả hai.

> 📝 **Tóm tắt mục 8.**
> - Batch: throughput↑, latency↑. Streaming: latency↓, throughput↓.
> - Analytics → batch; real-time interactive → streaming; cân bằng → micro-batching.

---

## 9. Readability vs Performance

> 💡 **Trực giác.** Code là để **người** đọc trước, máy chạy sau. Một tối ưu làm code nhanh thêm 3%
> nhưng khiến đồng đội mất 2 giờ mới hiểu — thường là một giao dịch tồi.

> ⚠ **Premature optimization is the root of all evil** (Knuth). Tối ưu **trước khi đo** thường:
> (a) tối ưu nhầm chỗ không phải bottleneck; (b) làm code khó đọc, khó sửa, dễ sinh bug; (c) khoá cứng
> một thiết kế khó thay đổi sau này. (Liên hệ tư duy ở [Lesson 50 — Khung giải quyết bài toán](../lesson-50-problem-solving-framework/).)

Quy trình lành mạnh:
1. **Viết code rõ ràng, đúng trước** (correctness first — [Lesson 04](../lesson-04-correctness-invariant/)).
2. **Đo** (profile) để tìm bottleneck thật.
3. Chỉ tối ưu **đúng chỗ nóng** (thường là 5-10% code chiếm 90% thời gian — quy tắc 80/20).
4. Tối ưu kèm **comment** giải thích *vì sao* viết kỳ quặc vậy, và **benchmark** chứng minh nó đáng.

> ❓ **Câu hỏi tự nhiên.** *"Vậy đừng bao giờ nghĩ về hiệu năng khi viết?"* — Không. Phải chọn đúng
> **độ phức tạp tiệm cận** (O(n) vs O(n²)) ngay từ đầu — đó là thiết kế, không phải premature optimization.
> Cái nên hoãn là **vi-tối ưu** (micro-optimization: loop unrolling, bit hack) cho tới khi profiler chỉ điểm.

> 📝 **Tóm tắt mục 9.**
> - Ưu tiên đọc hiểu; tối ưu chỉ sau khi đo và chỉ ở bottleneck.
> - Chọn đúng Big-O từ đầu (thiết kế) ≠ vi-tối ưu sớm (premature).

---

## 10. Case studies tổng hợp

Bốn hệ thống thực tế, mỗi cái là một quyết định đánh đổi điển hình.

### 10.1 Autocomplete (gợi ý gõ) — precompute đổi space lấy query nhanh

- **Bài toán:** người dùng gõ "ap", trả ngay danh sách từ bắt đầu bằng "ap" (apple, april, apply...).
- **Đánh đổi:** dựng sẵn **Trie** (cây tiền tố) từ toàn bộ từ điển. Tốn space O(tổng độ dài từ) +
  thời gian build. Đổi lại: mỗi truy vấn prefix chỉ O(độ dài prefix) để tìm node, rồi liệt kê con.
- **Vì sao chọn precompute:** số truy vấn (mỗi phím gõ) khổng lồ, từ điển gần như tĩnh → build cost
  amortize hoàn hảo. (Trie học ở [Lesson 43](../lesson-43-trie-aho-corasick/).)

### 10.2 LRU cache — hash + linked list, space đổi lấy speed

- **Bài toán:** cache O(1) get/put, evict phần tử ít dùng nhất khi đầy.
- **Đánh đổi:** dùng **hash map** (key → node) + **doubly linked list** (thứ tự dùng). Tốn space gấp
  đôi (mỗi entry vừa trong map vừa trong list, có con trỏ prev/next). Đổi lại: get/put **O(1)** worst
  trung bình, move-to-front O(1).
- **Vì sao đáng:** không có cấu trúc đơn lẻ nào cho cả "tra theo key O(1)" lẫn "biết thứ tự dùng O(1)";
  kết hợp hai cấu trúc, trả giá bằng space, mua được speed.

### 10.3 Top-K trên luồng (stream) — heap kích thước K

- **Bài toán:** luồng vô hạn số, luôn giữ được K phần tử lớn nhất đã thấy.
- **Đánh đổi:** dùng **min-heap kích thước K**. Space O(K) (không cần lưu toàn bộ stream!). Mỗi phần
  tử mới so với đỉnh heap: nếu lớn hơn min thì thay, O(log K).
- **Vì sao chọn:** lưu toàn bộ stream rồi sort là O(n) space + O(n log n) — bất khả thi với stream vô
  hạn. Heap K đổi "không có đáp án chính xác toàn cục tức thì" lấy "O(K) space, O(log K)/phần tử".

### 10.4 Database index — space + write cost đổi lấy read speed

- **Bài toán:** truy vấn \`WHERE email = ?\` trên bảng triệu dòng phải nhanh.
- **Đánh đổi:** dựng **index** (thường B-tree) trên cột \`email\`. Tốn thêm **space** lưu index +
  **write chậm hơn** (mỗi insert/update phải cập nhật index). Đổi lại: đọc từ O(n) full scan xuống O(log n).
- **Vì sao đáng (thường):** đa số workload **đọc nhiều hơn ghi**. Nhưng nếu bảng ghi rất nhiều, đọc rất
  ít → index có thể **lỗ** (cost ghi > lợi đọc). Đây đúng là precompute↔query + time↔space gộp lại.

> ❓ **Câu hỏi tự nhiên.** *"Sao không index mọi cột cho chắc?"* — Vì mỗi index tốn space và làm mọi
> write chậm hơn. Index thừa = trả phí cho thứ không dùng. Chọn index theo **truy vấn thực tế**, không theo "cho chắc".

> 📝 **Tóm tắt mục 10.** Mỗi hệ thực tế là một đánh đổi có chủ đích: autocomplete (precompute), LRU
> (space cho speed bằng cách ghép 2 cấu trúc), top-K (O(K) space cho stream vô hạn), DB index (write cost
> + space cho read speed).

---

## 11. Khung quyết định

Trước khi chọn cấu trúc/thuật toán, trả lời các câu hỏi sau — câu trả lời lái thẳng tới đánh đổi:

| Câu hỏi | Nếu... | → Nghiêng về |
|---------|--------|--------------|
| **Bao nhiêu query?** | rất nhiều, lặp lại | precompute (prefix, trie, index) |
| | rất ít / một lần | tính trực tiếp |
| **Data có đổi không?** | tĩnh | precompute thoải mái |
| | đổi liên tục | cấu trúc động (segment tree) hoặc tính lại; cẩn thận cache invalidation |
| **Có real-time deadline?** | có (mỗi op < deadline) | cần worst-case / per-op bound |
| | không (chỉ cần tổng nhanh) | average / amortized OK |
| **Memory budget?** | chật (nhúng, data lớn) | đổi time lấy space (in-place, rolling, tính lại) |
| | dư | đổi space lấy time (hash, memo, cache) |
| **Input có thù địch không?** | có (adversarial) | worst-case guarantee, randomized/seeded hash |
| | không | average OK |
| **Biết hết query trước?** | có | offline (sort/batch, Mo's) |
| | không | online (cấu trúc động) |

**Cách dùng:** đi từ trên xuống, mỗi câu loại bỏ bớt phương án. Vd "10⁶ query + data tĩnh + không
real-time + memory dư" → precompute mạnh tay (prefix/sparse table). Còn "ít query + data đổi mỗi giây +
memory chật" → tính trực tiếp in-place, đừng cache.

> 📝 **Tóm tắt mục 11.** Đừng chọn cấu trúc theo thói quen — hỏi 6 câu (số query, data đổi, real-time,
> memory, adversarial, biết query trước) rồi để câu trả lời chỉ định đánh đổi.

---

## 12. Cạm bẫy thường gặp

1. **Tối ưu trục không phải bottleneck.** Làm vòng lặp nhanh 2× trong khi 95% thời gian nằm ở I/O mạng.
   → Luôn **đo trước** (mục 9). Tối ưu nhầm chỗ = công sức vô ích + code khó đọc.
2. **Precompute khi ít query.** Dựng segment tree O(n) cho đúng 1 query → phí. Dùng khi q đủ lớn để amortize.
3. **Cache khi data đổi liên tục.** Cache chỉ hời nếu **hit nhiều**. Data đổi mỗi giây → cache invalidation
   liên tục, có khi còn chậm hơn không cache (overhead quản lý + tính lại). "Có 2 vấn đề khó trong CS:
   đặt tên biến và **cache invalidation**."
4. **Over-engineer.** Dùng cấu trúc cầu kỳ (skip list, wavelet tree) cho bài mà mảng + vòng lặp đủ chạy.
   Phức tạp thừa = nhiều bug, khó bảo trì, không tương xứng lợi ích. (Liên hệ readability mục 9.)

> ⚠ **Lỗi thường gặp tổng hợp.** Cả 4 cạm bẫy đều có chung gốc: **chọn đánh đổi mà không xét ngữ
> cảnh thực**. Khung ở mục 11 chính là liều thuốc — bắt mình trả lời "bao nhiêu query, data có đổi không,
> có deadline không" trước khi gõ code.

> 📝 **Tóm tắt mục 12.** Cạm bẫy = đánh đổi sai ngữ cảnh: tối ưu nhầm bottleneck, precompute khi ít
> query, cache khi data đổi liên tục, over-engineer. Đo trước, hỏi khung trước.

---

## 13. Ứng dụng thực tế trong phần mềm

> 💡 **Mọi quyết định kiến trúc hệ thống là một trade-off độ phức tạp: nhanh hơn nhưng tốn RAM hơn, hoặc ngược lại.** Hiểu trade-off = thiết kế đúng.

| Trade-off thật | Đánh đổi gì |
|----------------|------------|
| **Cache / memoization** | Tốn RAM (lưu kết quả) để đổi tốc độ (khỏi tính lại) |
| **Index database** | Tốn disk + chậm ghi để đổi đọc nhanh ($O(\\log n)$) |
| **Precompute vs compute-on-demand** | Tính sẵn (tốn chỗ) vs tính lúc cần (tốn CPU mỗi lần) |
| **Nén dữ liệu** | Tốn CPU (nén/giải) để đổi băng thông/dung lượng |
| **Denormalization (DB)** | Lặp dữ liệu (tốn chỗ) để đổi query nhanh (khỏi join) |
| **Bloom filter trước DB** | Chút RAM + sai số nhỏ để đổi tránh truy vấn đĩa đắt |

### 13.1. Ví dụ cụ thể — caching là trade-off time–space kinh điển

API tính báo cáo nặng mất 2 giây. Cache kết quả vào Redis: lần sau trả trong 5ms — **đổi RAM lấy thời gian**. Nhưng thêm vấn đề: cache invalidation (dữ liệu cũ), tốn bộ nhớ. Mọi tầng hệ thống là trade-off: CPU cache, CDN, database index, materialized view — đều "lưu sẵn để khỏi tính lại". Quyết định *cache cái gì, TTL bao lâu* chính là cân time vs space vs độ tươi dữ liệu.

> ❓ **"Khi nào KHÔNG nên đánh đổi RAM lấy tốc độ?"** Khi dữ liệu thay đổi liên tục (cache miss/invalidation nhiều hơn lợi), khi RAM là bottleneck thật, hoặc khi tính toán vốn đã rẻ. Trade-off chỉ đáng khi **tỉ lệ đọc-lại cao** và **chi phí tính lại lớn**. Đo trước khi cache.

### 13.2. 📝 Tóm tắt mục 13

- Mọi quyết định kiến trúc = trade-off độ phức tạp: **cache**, **DB index**, **precompute**, **nén**, **denormalization**, **Bloom**.
- Caching = đổi RAM lấy thời gian; kèm chi phí ẩn (invalidation, bộ nhớ, độ tươi).
- Đánh đổi đáng khi: đọc-lại nhiều + tính lại đắt; đo trước, đừng cache mù.

## Bài tập

Với mỗi scenario, **chọn đánh đổi/cách giải tối ưu và giải thích lý do** (dựa trên khung mục 11).

1. Một mảng số nguyên **tĩnh** kích thước 10⁵. Cần trả lời **10⁶ truy vấn** range-sum \`[l, r]\`. Chọn gì?
2. Một mảng số nguyên thay đổi: xen kẽ **update một phần tử** và **truy vấn range-sum**, tổng 10⁵ thao
   tác online. Chọn gì?
3. Hệ thống **giao dịch chứng khoán** real-time: mỗi lệnh phải xử lý dưới 1ms, không được có "spike".
   Sort dữ liệu nội bộ bằng quicksort hay merge sort? Dùng slice append tự do hay pre-allocate?
4. Thiết bị IoT **bộ nhớ rất hạn chế** (vài KB RAM). Cần đảo ngược một mảng lớn tại chỗ. Đổi space lấy
   time hay time lấy space?
5. Dịch vụ **gom log** ghi vào kho dữ liệu phân tích, có thể chấp nhận log xuất hiện trễ vài giây nhưng
   cần xử lý hàng triệu dòng/giây. Batch hay streaming?
6. Bài **TSP** (người bán hàng) với **200 thành phố**, cần kế hoạch giao hàng "đủ tốt" trong 1 giây.
   Exact hay approximate?
7. (Bonus) Mảng **chưa sort**, cần tìm cặp tổng bằng \`target\`, **chạy đúng 1 lần**, memory dư. Two-sum
   bằng hash hay two-pointer?
8. (Bonus) API public nhận key người dùng làm key cho một hash map server-side. Kẻ tấn công có thể gửi
   key tuỳ ý. Có lo ngại gì về đánh đổi average↔worst không? Khắc phục thế nào?

---

## Lời giải chi tiết

**Bài 1.** **Precompute prefix sum.** Data tĩnh + rất nhiều query → build cost O(n)=10⁵ amortize hoàn
hảo qua 10⁶ query. Tổng prefix ≈ n + q = 1.1·10⁶; naive = q·n = 10¹¹. Prefix nhanh hơn ~10⁵ lần. Mảng
tĩnh nên không cần segment tree (đơn giản hơn = ít bug hơn, mục 12). *Trục: precompute↔query, time↔space.*

**Bài 2.** **Segment tree (hoặc Fenwick tree).** Có **update xen kẽ** → prefix sum hỏng (mỗi update
dựng lại O(n)). Online + động → cấu trúc động: cả query lẫn update O(log n)≈17. Tổng ≈ 10⁵·17 ≈ 1.7·10⁶,
so với prefix-dựng-lại 10⁵·10⁵ = 10¹⁰. *Trục: online↔offline, precompute↔query (data đổi → không precompute tĩnh).*

**Bài 3.** **Merge sort** (không quicksort): cần **worst-case guarantee** O(n log n), không chấp nhận
spike O(n²) của quicksort trên input thù địch/đã sort. **Pre-allocate** thay vì append tự do: cần **per-op
bound**, tránh resize O(n) gây spike vượt 1ms (mục 6). Đổi space (cấp dư) lấy độ trễ ổn định.
*Trục: average↔worst, amortized↔per-op.*

**Bài 4.** **In-place — đổi time lấy space** (thực ra ở đây time không tệ hơn). Bộ nhớ là ràng buộc cứng
→ không cấp mảng phụ. Đảo tại chỗ bằng đổi chỗ 2 đầu: O(1) space phụ, O(n) time như cũ. Cấp mảng phụ
O(n) có thể tràn RAM vài KB. *Trục: time↔space (memory budget chật).*

**Bài 5.** **Batch (micro-batch).** Latency vài giây chấp nhận được + cần throughput cực cao → gom lô
giảm overhead per-item, tận dụng ghi tuần tự. Streaming từng dòng sẽ tốn round-trip mỗi dòng → không
đạt triệu dòng/giây. *Trục: latency↔throughput.*

**Bài 6.** **Approximate/heuristic.** TSP là NP-hard; exact với 200 thành phố là **bất khả thi** trong
1 giây (DP Held-Karp O(2ⁿ·n²) với n=200 ≈ 2²⁰⁰ — vượt mọi giới hạn). Cần "đủ tốt nhanh" → dùng
heuristic (nearest neighbor + 2-opt) hoặc approximation. Sai số nhỏ trong giao hàng chấp nhận được.
*Trục: exact↔approximate (NP-hard + input lớn + deadline).*

**Bài 7.** **Hash.** Chạy 1 lần + mảng chưa sort → two-pointer phải trả O(n log n) cho sort vô ích cho
1 query. Hash cho O(n) time ngay, memory dư nên O(n) space không thành vấn đề. Two-pointer chỉ hời khi
mảng đã sort sẵn hoặc nhiều query trên cùng mảng. *Trục: time↔space, precompute↔query.*

**Bài 8.** **Có lo ngại: hash flooding (algorithmic complexity attack).** Kẻ tấn công gửi nhiều key
băm vào cùng bucket → biến lookup O(1) average thành O(n) worst, làm sập server (DoS). Đây chính là
average↔worst dưới input **adversarial** (mục 5). **Khắc phục:** dùng hash có **seed ngẫu nhiên** khởi
tạo lúc chạy (Go map làm sẵn việc này — randomize seed mỗi process nên attacker không đoán được bucket),
hoặc dùng cấu trúc đảm bảo worst-case như balanced BST (O(log n) đảm bảo bất kể input). *Trục: average↔worst (adversarial).*

---

## Code & Minh hoạ

Code Go inline ở các mục 2-6 minh hoạ trực tiếp các đánh đổi (two-sum hash vs two-pointer, prefix sum
vs naive, memoization vs recompute, in-place). Phần tương tác đặt ở:

- [visualization.html](./visualization.html) — 3 module: **Time vs Space** (slider số query, điểm hoà
  vốn precompute), **Trade-off picker** (chọn ngữ cảnh → gợi ý cấu trúc), **Precompute break-even chart**
  (đồ thị tổng chi phí 2 cách theo số query).

## Bài tiếp theo

- [Lesson 52 — Capstone: Pathfinding Visualizer](../lesson-52-capstone-pathfinding-visualizer/) — dự án
  tổng kết, áp dụng toàn bộ tư duy đánh đổi vào một bài thực tế.

## Tham khảo

- Knuth, *Structured Programming with go to Statements* — câu "premature optimization is the root of all evil".
- Cormen et al., *Introduction to Algorithms* (CLRS) — amortized analysis, randomized algorithms.
- [Lesson 50 — Khung giải quyết bài toán](../lesson-50-problem-solving-framework/) · [Lesson 02 — Amortized](../lesson-02-amortized-analysis/) · [Lesson 15 — Prefix sum](../lesson-15-prefix-sum-difference/).
`;
