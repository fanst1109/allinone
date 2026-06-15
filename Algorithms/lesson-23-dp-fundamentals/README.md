# Lesson 23 — Quy hoạch động: Nền tảng (Dynamic Programming Fundamentals)

> Tier 4 · Lesson đầu tiên của tier Quy hoạch động (Dynamic Programming — DP).
> Đây là kỹ thuật khó nhất nhưng mạnh nhất trong toolbox thuật toán: biến những bài toán
> tưởng chừng "mũ" ($O(2^n)$) thành đa thức ($O(n)$) chỉ bằng một ý tưởng đơn giản — **đệ quy + nhớ**.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **DP là gì** ở mức trực giác: chia bài toán thành bài con **chồng lấp (overlapping)** rồi lưu kết quả tránh tính lại.
- Nhận ra **2 điều kiện cần** để áp dụng DP: *overlapping subproblems* và *optimal substructure*.
- Triển khai được DP theo **2 cách**: top-down (memoization) và bottom-up (tabulation), và biết khi nào dùng cái nào.
- Nắm **quy trình thiết kế DP 5 bước** và áp dụng cho bài toán mới.
- Hiểu **state design** — phần khó nhất: chọn state đủ thông tin nhưng đủ nhỏ.
- Phân biệt DP với Divide & Conquer và Greedy.
- Tránh được các **cạm bẫy** kinh điển: state thiếu thông tin, thứ tự tính sai, quên base case, không nhận ra overlap.

## Kiến thức tiền đề

- [Lesson 03 — Đệ quy & quan hệ truy hồi](../lesson-03-recursion-recurrence/) — DP về bản chất là đệ quy có nhớ; bạn cần đọc thông thạo công thức truy hồi (recurrence).
- [Lesson 17 — Chia để trị (Divide & Conquer)](../lesson-17-divide-and-conquer/) — D&C chia bài con **độc lập**; DP khác ở chỗ bài con **chồng lấp**. So sánh này là chìa khóa.
- [Lesson 19 — Greedy Fundamentals](../lesson-19-greedy-fundamentals/) và [Lesson 22 — Greedy vs DP](../lesson-22-greedy-vs-dp/) — greedy chọn cục bộ không quay lại; DP xét mọi lựa chọn rồi lưu kết quả.
- Big-O ([Lesson 01](../lesson-01-bigo-asymptotic/)) để so sánh $O(2^n)$ với $O(n)$.

---

## 1. DP là gì?

> 💡 **Trực giác — "đệ quy nhưng có sổ ghi nhớ".**
> Hình dung bạn đang leo cầu thang và ai đó hỏi: "có bao nhiêu cách leo lên bậc 10?".
> Bạn nghĩ: "cách leo lên bậc 10 = cách leo lên bậc 9 (rồi bước 1) + cách leo lên bậc 8 (rồi bước 2)".
> Để biết bậc 9 lại cần bậc 8 và bậc 7... Nếu mỗi lần đều **tính lại từ đầu**, bạn sẽ tính "số cách lên bậc 5"
> hàng chục lần. DP nói: **tính một lần, ghi vào sổ, lần sau tra sổ**. Chỉ vậy thôi.

**Định nghĩa.** Quy hoạch động (Dynamic Programming) là kỹ thuật giải một bài toán bằng cách:

1. **Chia** bài toán thành các **bài toán con (subproblems)** nhỏ hơn cùng dạng.
2. Các bài con này **chồng lấp** — cùng một bài con xuất hiện nhiều lần trong cây đệ quy.
3. **Lưu (memoize/tabulate)** kết quả mỗi bài con, để khi gặp lại thì tra cứu `O(1)` thay vì tính lại.

Cái tên "dynamic programming" do Richard Bellman đặt năm 1950, "programming" ở đây nghĩa là "lập bảng/lập kế hoạch" (như "linear programming"), **không** liên quan tới lập trình máy tính. Đừng để cái tên đánh lừa.

> ❓ **Câu hỏi tự nhiên của người đọc**
> - *"DP khác đệ quy thường ở đâu?"* — Đệ quy thường tính lại bài con đã tính. DP **thêm một bảng nhớ**. Đó là toàn bộ khác biệt về mặt cài đặt.
> - *"Tại sao việc nhớ lại biến $O(2^n)$ thành $O(n)$?"* — Vì số bài con **phân biệt** chỉ là $n$, dù cây đệ quy có $2^n$ node. Nhớ rồi thì mỗi bài con tính đúng 1 lần.
> - *"Có phải mọi bài đệ quy đều DP được?"* — Không. Chỉ khi bài con **chồng lấp**. Merge sort chia mảng làm đôi nhưng 2 nửa độc lập, không chồng lấp → không phải DP.

### 1.1 Công thức "DP = đệ quy + nhớ"

```
DP = công thức truy hồi (recurrence) + bảng nhớ (memo)
```

Nếu bạn viết được công thức truy hồi cho bài toán, bạn đã đi được 80% chặng đường. 20% còn lại là chọn cấu trúc lưu (mảng/map) và thứ tự điền.

---

## 2. Hai điều kiện cần để dùng DP

Không phải bài nào cũng DP được. Cần **đồng thời** hai tính chất:

### 2.1 Overlapping subproblems (bài con chồng lấp)

> 💡 **Trực giác.** Cùng một câu hỏi con bị hỏi đi hỏi lại. Nếu bạn vẽ cây gọi đệ quy và thấy
> nhiều node **giống hệt nhau**, đó là overlap. Lưu lại 1 lần là tiết kiệm khổng lồ.

Ví dụ Fibonacci: `fib(5)` gọi `fib(4)` và `fib(3)`; `fib(4)` lại gọi `fib(3)` và `fib(2)`...
`fib(3)` được tính **nhiều lần** từ nhiều nhánh khác nhau. Đó chính là overlap.

**Đối lập:** Divide & Conquer (như merge sort) chia bài thành các phần **không trùng nhau** — `sort(left)` và `sort(right)` xử lý dữ liệu khác hẳn nhau, không có bài con nào lặp lại. Nên D&C **không** cần memo.

### 2.2 Optimal substructure (cấu trúc con tối ưu)

> 💡 **Trực giác.** Lời giải tối ưu của bài lớn được **lắp ráp** từ lời giải tối ưu của bài con.
> "Đường ngắn nhất từ A tới C qua B" = "đường ngắn nhất A→B" + "đường ngắn nhất B→C". Phần con cũng phải tối ưu.

Hình thức: gọi `OPT(n)` là giá trị tối ưu của bài kích thước `n`. Optimal substructure nghĩa là tồn tại công thức:

```
OPT(n) = f( OPT(các bài con) )
```

Ví dụ leo cầu thang: $\text{cách}(n) = \text{cách}(n-1) + \text{cách}(n-2)$. Số cách lên bậc $n$ dựng từ số cách lên các bậc trước.

> ⚠ **Lỗi thường gặp — tưởng có optimal substructure nhưng không.**
> Bài "đường đi DÀI nhất không lặp đỉnh trong đồ thị có chu trình" **KHÔNG** có optimal substructure:
> đường dài nhất A→C có thể KHÔNG chứa đường dài nhất A→B (vì ràng buộc "không lặp đỉnh" làm các bài con
> phụ thuộc lẫn nhau). Đây là bài NP-hard, DP thông thường bó tay. Luôn kiểm tra điều kiện trước khi áp DP.

> 🔁 **Dừng lại tự kiểm tra**
> 1. Bài "tìm phần tử lớn nhất trong mảng" có dùng DP được không, vì sao?
> 2. Bài "đếm số cách viết `n` thành tổng các số 1 và 2" — có cả hai điều kiện không?
>
> <details><summary>Đáp án</summary>
>
> 1. Có optimal substructure (`max(arr[0..n]) = max(max(arr[0..n-1]), arr[n])`) nhưng **không overlap** — mỗi phần tử xét đúng 1 lần. Nên đây chỉ là duyệt tuyến tính $O(n)$, không cần memo. DP "thừa".
> 2. Có cả hai: $f(n) = f(n-1) + f(n-2)$ (substructure), và $f(n-2)$ bị tính lại từ nhiều nhánh (overlap). Đây chính là Fibonacci trá hình → DP hoàn hảo.
> </details>

---

## 3. Fibonacci — ví dụ mở đầu kinh điển

Dãy Fibonacci: $F(0)=0$, $F(1)=1$, $F(n)=F(n-1)+F(n-2)$. Các giá trị: `0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...`

### 3.1 Naive — đệ quy thuần, `O(2ⁿ)`

```go
// fibNaive: đệ quy thẳng theo định nghĩa — KHÔNG nhớ gì cả.
// Mỗi lời gọi sinh 2 lời gọi con → cây nhị phân khổng lồ.
func fibNaive(n int) int {
    if n < 2 { // base case: F(0)=0, F(1)=1
        return n
    }
    return fibNaive(n-1) + fibNaive(n-2)
}
```

> 💡 **Walk-through cây gọi — đếm `fib(3)` được tính bao nhiêu lần khi gọi `fibNaive(5)`.**
>
> ```
> fib(5)
> ├── fib(4)
> │   ├── fib(3)          ← lần 1
> │   │   ├── fib(2)
> │   │   │   ├── fib(1)
> │   │   │   └── fib(0)
> │   │   └── fib(1)
> │   └── fib(2)
> │       ├── fib(1)
> │       └── fib(0)
> └── fib(3)              ← lần 2
>     ├── fib(2)
>     │   ├── fib(1)
>     │   └── fib(0)
>     └── fib(1)
> ```
>
> `fib(3)` tính **2 lần**, `fib(2)` tính **3 lần**, `fib(1)` tính **5 lần**, `fib(0)` tính **3 lần**.
> Tổng số node $\approx 2 \cdot F(n+1) - 1$. Với $n=5$ đã có 15 lời gọi; với $n=40$ lên tới ~331 triệu lời gọi → treo máy.
> Đây chính là **overlap** đang ăn hết hiệu năng.

Đếm số lời gọi (verify bằng số thật):

| `n` | Số lời gọi `fibNaive(n)` | Giá trị `F(n)` |
|----:|-------------------------:|---------------:|
| 5   | 15                       | 5              |
| 10  | 177                      | 55             |
| 20  | 21891                    | 6765           |
| 30  | 2692537                  | 832040         |

Số lời gọi tăng theo $\varphi^n \approx 1{,}618^n$ — đúng nghĩa hàm mũ.

> ❓ **Câu hỏi tự nhiên.** *"Sao số lời gọi lại là $\varphi^n$ chứ không phải $2^n$?"* — Cây gọi không cân bằng:
> nhánh `fib(n-1)` sâu hơn nhánh `fib(n-2)`. Tổng số node thỏa đúng quan hệ truy hồi của Fibonacci nên tăng theo $\varphi^n$.
> $2^n$ chỉ là chặn trên thô; $\varphi^n$ mới là chặt. Dù sao vẫn là hàm mũ → vô dụng cho $n$ lớn.

### 3.2 Memoization (top-down) — `O(n)`

```go
// fibMemo: top-down. Thêm một mảng nhớ; lần đầu tính thì lưu, lần sau tra.
func fibMemo(n int) int {
    memo := make([]int, n+1)
    for i := range memo {
        memo[i] = -1 // -1 = "chưa tính"
    }
    var solve func(int) int
    solve = func(k int) int {
        if k < 2 {
            return k
        }
        if memo[k] != -1 { // CACHE HIT: đã tính → tra sổ, O(1)
            return memo[k]
        }
        memo[k] = solve(k-1) + solve(k-2) // tính 1 lần rồi ghi sổ
        return memo[k]
    }
    return solve(n)
}
```

> 💡 **Walk-through `fibMemo(5)` — đếm cache hit.**
> Lần đầu gặp `fib(3)` (qua nhánh `fib(4)`) ta tính và ghi `memo[3]=2`.
> Khi nhánh thứ hai (`fib(5)` gọi trực tiếp `fib(3)`) chạm tới `fib(3)`, `memo[3] != -1` → **cache hit**, trả về ngay.
> Mỗi state `fib(0..5)` chỉ tính đúng **1 lần** → 6 phép tính thật + vài cache hit. So với 15 lời gọi của naive.
> Tổng quát: $n+1$ state, mỗi state $O(1)$ → tổng $O(n)$ thời gian, $O(n)$ bộ nhớ (mảng + stack đệ quy).

### 3.3 Tabulation (bottom-up) — `O(n)`

```go
// fibTab: bottom-up. Điền bảng từ base case lên, KHÔNG đệ quy.
func fibTab(n int) int {
    if n < 2 {
        return n
    }
    dp := make([]int, n+1)
    dp[0], dp[1] = 0, 1 // base case
    for i := 2; i <= n; i++ {
        dp[i] = dp[i-1] + dp[i-2] // mọi dp[i-1], dp[i-2] đã có sẵn
    }
    return dp[n]
}
```

> 💡 **Walk-through điền bảng `fibTab(5)`:**
>
> | bước | `dp[0]` | `dp[1]` | `dp[2]` | `dp[3]` | `dp[4]` | `dp[5]` |
> |-----:|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
> | init | 0 | 1 | · | · | · | · |
> | i=2  | 0 | 1 | **1** | · | · | · |   (1+0)
> | i=3  | 0 | 1 | 1 | **2** | · | · |       (1+1)
> | i=4  | 0 | 1 | 1 | 2 | **3** | · |        (2+1)
> | i=5  | 0 | 1 | 1 | 2 | 3 | **5** |        (3+2)
>
> Không có lời gọi đệ quy nào, không có stack — chỉ một vòng `for`. Đáp án `dp[5]=5`. ✓

### 3.4 Space-optimized — `O(1)` bộ nhớ

```go
// fibO1: bottom-up nhưng chỉ giữ 2 giá trị cuối. dp[i] chỉ cần dp[i-1], dp[i-2].
func fibO1(n int) int {
    if n < 2 {
        return n
    }
    prev2, prev1 := 0, 1 // F(0), F(1)
    for i := 2; i <= n; i++ {
        cur := prev1 + prev2
        prev2, prev1 = prev1, cur // trượt cửa sổ
    }
    return prev1
}
```

> 💡 **Trực giác space-opt.** Nếu công thức truy hồi chỉ nhìn lại `k` ô gần nhất, ta chỉ cần giữ `k` ô đó,
> không cần cả bảng. Fibonacci nhìn lại 2 ô → chỉ giữ 2 biến. Đây là **kỹ thuật rolling array**, dùng cực nhiều ở DP 1 chiều.

So sánh 4 cách (verify bằng `fib(40) = 102334155`):

| Cách | Thời gian | Bộ nhớ | Ghi chú |
|------|-----------|--------|---------|
| Naive | $O(\varphi^n) \approx O(2^n)$ | $O(n)$ stack | `fib(40)` ~331 triệu lời gọi, treo |
| Memo (top-down) | $O(n)$ | $O(n)$ + stack | tự nhiên, lazy |
| Tabulation (bottom-up) | $O(n)$ | $O(n)$ | không stack overflow |
| Space-opt | $O(n)$ | $O(1)$ | tối ưu nhất cho fib |

> 📝 **Tóm tắt mục 3.** Fibonacci là "Hello World" của DP. Naive $O(2^n)$ vì overlap; memo/tab đưa về $O(n)$;
> space-opt về $O(1)$. Cùng một recurrence $F(n)=F(n-1)+F(n-2)$, 4 cách cài chỉ khác nhau ở **cách lưu** và **thứ tự tính**.

---

## 4. Hai cách triển khai DP

### 4.1 Top-down (memoization)

- **Cách làm:** Viết hàm đệ quy theo recurrence, thêm một cache. Trước khi tính, kiểm tra cache; sau khi tính, ghi cache.
- **Ưu:**
  - **Tự nhiên** — bám sát công thức truy hồi, dễ viết khi đã có recurrence.
  - **Lazy** — chỉ tính những state thực sự cần (nếu nhiều state không bao giờ tới thì khỏi tính).
- **Nhược:**
  - Có chi phí gọi hàm + có thể **stack overflow** với `n` lớn (đệ quy sâu).
  - Khó space-optimize (không kiểm soát thứ tự rõ ràng).

### 4.2 Bottom-up (tabulation)

- **Cách làm:** Tạo bảng `dp`, điền base case, rồi lặp điền theo thứ tự sao cho khi tính `dp[i]` thì mọi state nó phụ thuộc đã có.
- **Ưu:**
  - **Không stack overflow** — chỉ là vòng lặp.
  - Thường nhanh hơn (không overhead gọi hàm).
  - **Dễ space-optimize** (như fib `O(1)`) vì kiểm soát thứ tự điền.
- **Nhược:**
  - Phải xác định **thứ tự điền đúng** (topological của dependency) — đôi khi khó hơn.
  - Tính **cả** những state có thể không cần (không lazy).

### 4.3 Khi nào dùng cái nào?

| Tình huống | Nên dùng |
|------------|----------|
| State space lớn nhưng **thưa** (ít state thực sự tới) | Top-down (memo) — lazy |
| State space **dày**, cần mọi state | Bottom-up — nhanh, gọn |
| Cần **space-optimize** (rolling array) | Bottom-up |
| Recurrence phức tạp, thứ tự dependency rối | Top-down — khỏi lo thứ tự |
| `n` rất lớn, sợ stack overflow | Bottom-up |
| Đang prototyping, muốn code nhanh từ recurrence | Top-down |

> ❓ **Câu hỏi tự nhiên.** *"Hai cách có ra cùng kết quả không?"* — Có, luôn luôn, vì cùng một recurrence và cùng base case.
> Chỉ khác cách duyệt state. Trong thi đấu/phỏng vấn, viết cách nào bạn ít sai hơn.

> 🔁 **Dừng lại tự kiểm tra.** Hàm `fibMemo` ở mục 3.2 là top-down hay bottom-up? Còn `fibTab`?
> <details><summary>Đáp án</summary>`fibMemo` đệ quy + cache → top-down. `fibTab` lặp điền bảng từ base case → bottom-up.</details>

---

## 5. Quy trình thiết kế DP — 5 bước

Đây là khung tư duy áp dụng cho **mọi** bài DP. Học thuộc 5 bước này:

1. **Định nghĩa STATE** — `dp[i]` (hoặc `dp[i][j]`...) **nghĩa là gì**? Viết bằng tiếng Việt một câu rõ ràng.
2. **Tìm RECURRENCE** — `dp[i]` tính từ các state nào? Viết công thức transition.
3. **Base case** — state nhỏ nhất biết ngay đáp án (không cần recurrence).
4. **Thứ tự tính** — điền theo thứ tự nào để khi tính `dp[i]` thì dependency đã sẵn (topological order).
5. **Đáp án ở đâu** — kết quả bài toán nằm ở ô nào của bảng?

### 5.1 Áp dụng: Climbing Stairs

> **Bài toán.** Có `n` bậc thang. Mỗi lần leo được **1 hoặc 2** bậc. Hỏi có bao nhiêu cách leo lên đỉnh (bậc `n`)?

Áp dụng 5 bước:

**Bước 1 — STATE.** `dp[i]` = *số cách leo lên đúng bậc `i`*.

**Bước 2 — RECURRENCE.** Để đến bậc `i`, bước cuối cùng hoặc từ bậc `i-1` (bước 1) hoặc từ bậc `i-2` (bước 2):
```
dp[i] = dp[i-1] + dp[i-2]
```

**Bước 3 — BASE CASE.** `dp[0] = 1` (đứng yên ở chân thang — 1 cách "rỗng"), `dp[1] = 1` (chỉ 1 cách: bước 1 bậc).

**Bước 4 — THỨ TỰ.** `dp[i]` cần `dp[i-1]`, `dp[i-2]` → điền từ `i=2` tăng dần tới `n`.

**Bước 5 — ĐÁP ÁN.** `dp[n]`.

```go
// climbStairs: số cách leo n bậc, mỗi bước 1 hoặc 2 bậc.
// (Chú ý: đây thực chất là Fibonacci dịch chỉ số!)
func climbStairs(n int) int {
    if n <= 1 {
        return 1 // base case: dp[0]=dp[1]=1
    }
    dp := make([]int, n+1)
    dp[0], dp[1] = 1, 1
    for i := 2; i <= n; i++ {
        dp[i] = dp[i-1] + dp[i-2] // bước cuối từ i-1 hoặc i-2
    }
    return dp[n]
}
```

> 💡 **Walk-through `climbStairs(4)`:**
>
> | `i` | `dp[i]` | giải thích |
> |----:|:-------:|------------|
> | 0 | 1 | base |
> | 1 | 1 | base |
> | 2 | 2 | `dp[1]+dp[0] = 1+1` → cách `{1+1}`, `{2}` |
> | 3 | 3 | `dp[2]+dp[1] = 2+1` → `{1,1,1},{1,2},{2,1}` |
> | 4 | 5 | `dp[3]+dp[2] = 3+2` |
>
> Liệt kê tay cho `n=4`: `{1,1,1,1},{1,1,2},{1,2,1},{2,1,1},{2,2}` → đúng **5** cách. ✓

> ⚠ **Lỗi thường gặp — base case `dp[0]`.** Nhiều người đặt `dp[0]=0` ("không có bậc nào → 0 cách").
> Sai! Phải là `dp[0]=1` (1 cách "không làm gì"). Nếu để 0 thì `dp[2]=dp[1]+dp[0]=1+0=1`, sai (đáp án đúng là 2).
> Base case sai làm hỏng toàn bộ bảng.

---

## 6. State design — phần khó nhất

> 💡 **Trực giác.** State phải vừa **đủ thông tin** để viết transition (không thiếu), vừa **đủ nhỏ**
> để bảng không nổ (không thừa). Đây là nghệ thuật, học qua nhiều bài.

**Nguyên tắc:** state là "tóm tắt tối thiểu" của quá khứ — mọi thứ bạn cần biết để quyết định tương lai, không hơn không kém.

### 6.1 State thiếu thông tin → phải tăng chiều

> **Bài toán.** Climbing stairs nhưng **không được leo 2 bước liên tiếp**. Hỏi số cách.

Với state cũ `dp[i]` = "số cách lên bậc `i`" — **không đủ**! Vì cách tính `dp[i]` phụ thuộc bước cuối là 1 hay 2 (nếu vừa bước 2 thì bước này phải bước 1). State cũ không nhớ "bước cuối là gì".

**Tăng chiều:** thêm chiều ghi nhớ bước cuối:
- `dp[i][0]` = số cách lên bậc `i` mà **bước cuối là 1 bậc**.
- `dp[i][1]` = số cách lên bậc `i` mà **bước cuối là 2 bậc**.

Recurrence:
```
dp[i][0] = dp[i-1][0] + dp[i-1][1]   // bước cuối 1 bậc: trước đó kết thúc kiểu gì cũng được
dp[i][1] = dp[i-2][0]                // bước cuối 2 bậc: trước đó KHÔNG được là bước 2 → chỉ lấy [0]
```

> 💡 **Walk-through `n=4`, ràng buộc không 2 bước liên tiếp.**
> `dp[1]=[1,0]`, `dp[2]=[1,1]`, `dp[3][0]=dp[2][0]+dp[2][1]=2`, `dp[3][1]=dp[1][0]=1` → `dp[3]=[2,1]`.
> `dp[4][0]=dp[3][0]+dp[3][1]=3`, `dp[4][1]=dp[2][0]=1` → `dp[4]=[3,1]`, tổng = **4** cách.
> Kiểm tra tay: từ 5 cách của bài gốc, loại `{2,2}` (2 bước liên tiếp) → còn `{1,1,1,1},{1,1,2},{1,2,1},{2,1,1}` = 4. ✓

> ❓ **Câu hỏi tự nhiên.** *"Làm sao biết state thiếu thông tin?"* — Khi viết transition mà bạn thấy mình
> cần "biết thêm" điều gì đó từ quá khứ (bước cuối, đã dùng món hàng nào, còn bao nhiêu tiền...) → state thiếu chiều đó.
> Cứ thêm chiều cho đến khi transition viết được chỉ dựa vào state.

> ⚠ **Lỗi thường gặp — tăng chiều vô tội vạ.** Mỗi chiều thêm vào nhân kích thước bảng. State `dp[i][j][k]`
> với mỗi chiều $n$ → $O(n^3)$ bộ nhớ. Chỉ thêm chiều **thật sự cần**. Nếu một thông tin có thể suy ra từ state khác,
> đừng lưu nó.

---

## 7. Memoization với map vs array

Cache của memo có thể là **mảng** hoặc **map (hash table)**. Chọn theo độ "dày" của state space:

| | Mảng (`[]int` / `[][]int`) | Map (`map[K]int`) |
|--|--|--|
| **Khi nào** | State là số nguyên nhỏ, **dày** (gần như mọi state đều tới) | State **thưa** (rất ít state thực sự tới) hoặc khóa không phải số liên tục (string, tuple lớn) |
| **Truy cập** | `O(1)`, hằng số nhỏ | `O(1)` trung bình, hằng số lớn hơn |
| **Bộ nhớ** | Cấp phát toàn bộ kể cả ô không dùng | Chỉ lưu ô đã tới |

```go
// Memo bằng map — dùng khi state thưa hoặc khóa phức tạp.
func fibMap(n int, memo map[int]int) int {
    if n < 2 {
        return n
    }
    if v, ok := memo[n]; ok { // cache hit
        return v
    }
    res := fibMap(n-1, memo) + fibMap(n-2, memo)
    memo[n] = res
    return res
}
// Gọi: fibMap(40, map[int]int{})
```

> 💡 **Ví dụ state thưa.** Bài "từ `1` tới `n`, mỗi bước hoặc `+1` hoặc `×2`, ít cách tới `n` nhất".
> State là giá trị hiện tại, nhưng chỉ một số ít giá trị thực sự xuất hiện trên đường đi tối ưu.
> Nếu $n=10^9$ mà chỉ ~30 state tới → mảng $10^9$ phần tử = lãng phí khủng khiếp, dùng map 30 entry là hợp lý.

> ⚠ **Lỗi thường gặp.** Dùng map cho state dày → chậm gấp 3-10 lần mảng do hashing + cache miss bộ nhớ.
> Khi state là chỉ số `0..n` liên tục, **luôn** dùng mảng.

---

## 8. DP vs Divide & Conquer vs Greedy

| Tiêu chí | Divide & Conquer | Greedy | Dynamic Programming |
|----------|------------------|--------|---------------------|
| Bài con **chồng lấp**? | Không (độc lập) | — (không chia bài con) | **Có** |
| Xét **nhiều lựa chọn**? | — | Không (chọn 1, không quay lại) | **Có** (xét hết rồi lấy tối ưu) |
| Lưu kết quả bài con? | Không cần | Không | **Có** (memo/table) |
| Bảo đảm tối ưu? | (tùy bài) | Chỉ khi có greedy-choice property | **Có** (nếu optimal substructure) |
| Ví dụ | merge sort, quicksort | activity selection, Huffman | fibonacci, knapsack, LCS |

> 💡 **Trực giác phân biệt.**
> - **D&C:** chia đôi, giải độc lập, ghép lại. Bài con không gặp lại nhau.
> - **Greedy:** mỗi bước chọn "ngon nhất ngay lúc đó", không nhìn lại. Nhanh nhưng chỉ đúng với một số bài.
> - **DP:** xét **mọi** lựa chọn tại mỗi bước, nhưng vì bài con chồng lấp nên lưu lại để khỏi tính lại.
>   DP = "greedy mà không dám tham" — thử hết rồi mới chọn.

Xem sâu hơn ở [Lesson 22 — Greedy vs DP](../lesson-22-greedy-vs-dp/).

> 🔁 **Dừng lại tự kiểm tra.** Binary search là D&C, Greedy hay DP?
> <details><summary>Đáp án</summary>D&C: chia đôi mảng, chỉ đi 1 nửa, các bài con không chồng lấp. Không phải DP (không có overlap, không cần memo).</details>

---

## 9. Đếm vs Tối ưu — cùng một khung

DP dùng cho cả hai loại bài, chỉ khác **phép gộp** ở transition:

| Loại bài | Transition gộp bằng | Ví dụ |
|----------|---------------------|-------|
| **Đếm số cách** | **cộng** (`+`) | số cách leo cầu thang, số cách decode chuỗi |
| **Tối ưu** | **max / min** | max subarray, min cost path, longest increasing subsequence |

So sánh trực tiếp trên cùng bài climbing stairs:

```go
// ĐẾM: số cách leo n bậc (gộp bằng +)
func countWays(n int) int {
    dp := make([]int, n+1)
    dp[0], dp[1] = 1, 1
    for i := 2; i <= n; i++ {
        dp[i] = dp[i-1] + dp[i-2] // CỘNG: gộp số cách từ 2 nhánh
    }
    return dp[n]
}

// TỐI ƯU: min cost leo n bậc, mỗi bậc i tốn cost[i] (min cost climbing stairs)
func minCost(cost []int) int {
    n := len(cost)
    dp := make([]int, n+1) // dp[i] = chi phí tối thiểu để TỚI bậc i
    // base: dp[0]=dp[1]=0 (xuất phát từ bậc 0 hoặc 1 miễn phí)
    for i := 2; i <= n; i++ {
        // tới i: từ i-1 (trả cost[i-1]) hoặc i-2 (trả cost[i-2]), lấy MIN
        dp[i] = min(dp[i-1]+cost[i-1], dp[i-2]+cost[i-2])
    }
    return dp[n]
}

func min(a, b int) int { if a < b { return a }; return b }
```

> 💡 **Trực giác.** Khung 5 bước y hệt nhau; chỉ đổi `+` thành `min`/`max`. Đó là vì sao DP "đếm" và DP "tối ưu"
> trông giống nhau — bạn học một khung dùng cho cả hai.

---

## 10. Cạm bẫy (đọc kỹ — đây là chỗ hay sai nhất)

1. **State thiếu thông tin.** Transition cần biết điều gì đó từ quá khứ mà state không lưu → kết quả sai.
   *Chữa:* thêm chiều cho state (mục 6). Test bằng tay với `n` nhỏ, nếu lệch → nghi state.

2. **Thứ tự tính sai — dùng state chưa tính.** Trong bottom-up, nếu điền `dp[i]` khi `dp[i-1]` chưa có
   (vd lặp sai chiều), kết quả là rác. *Chữa:* xác định topological order của dependency; transition nhìn `i-1` thì lặp `i` tăng dần.

3. **Quên base case / base case sai.** Như `dp[0]=0` thay vì `1` ở climbing stairs (mục 5.1). Cả bảng sai theo.
   *Chữa:* viết base case TRƯỚC, kiểm tra tay với `n=0,1,2`.

4. **Không nhận ra overlap → dùng plain recursion mũ.** Viết đệ quy đẹp nhưng quên memo → $O(2^n)$, TLE (timeout).
   *Chữa:* luôn tự hỏi "bài con có lặp không?". Nếu có → thêm cache.

5. **Off-by-one ở chỉ số.** `dp` kích thước `n` hay `n+1`? `cost[i-1]` hay `cost[i]`? Lệch 1 ô là sai cả bài.
   *Chữa:* viết rõ định nghĩa state ("dp[i] ứng với 0 hay 1 chỉ số gì"), align với chỉ số mảng input.

6. **Giữ cả bảng khi không cần → tốn bộ nhớ.** Nếu transition chỉ nhìn lại `k` ô gần nhất, dùng rolling array `O(k)`.
   *Lưu ý:* chỉ space-optimize SAU khi đã chạy đúng — đừng tối ưu sớm rồi sai logic.

> ⚠ **Lỗi thường gặp tổng hợp.** Hơn 80% bug DP rơi vào 3 chỗ: **base case**, **state thiếu chiều**,
> **off-by-one**. Khi DP sai, kiểm tra 3 chỗ này đầu tiên, in cả bảng ra với `n` nhỏ để soi.

> 📝 **Tóm tắt mục 10.** DP sai gần như luôn do: state thiếu thông tin, thứ tự/base case sai, hoặc off-by-one.
> Quy trình debug: test với `n` nhỏ, in bảng, đối chiếu với liệt kê tay.

---

## 11. Ứng dụng thực tế trong phần mềm

> 💡 **DP nghe học thuật, nhưng nó chạy bên dưới những thứ bạn dùng mỗi ngày.** Bất cứ khi nào phần mềm phải "tìm cách tốt nhất / đếm số cách / so khớp tối ưu" trên dữ liệu có cấu trúc lặp lại, gần như chắc chắn có DP. Dưới đây là nơi DP xuất hiện thật.

| Ứng dụng | DP làm gì | Bài học liên quan |
|----------|-----------|-------------------|
| **`git diff`, so sánh file, Google Docs suggest** | **Edit distance / LCS** — số phép sửa ít nhất biến file A → B, dòng nào thêm/xóa | [LCS](../lesson-26-dp-grid-2d/), [DP grid](../lesson-26-dp-grid-2d/) |
| **Kiểm tra chính tả, autocorrect, fuzzy search** | Levenshtein distance giữa từ gõ sai và từ điển | [DP grid](../lesson-26-dp-grid-2d/) |
| **Sinh học (BLAST, alignment DNA)** | Căn chỉnh chuỗi gene (Needleman-Wunsch, Smith-Waterman) = DP grid | [DP grid](../lesson-26-dp-grid-2d/) |
| **Gõ phím xuống dòng (TeX, trình duyệt)** | Word wrap "đẹp nhất" = DP tối thiểu tổng phạt khoảng trắng | [DP 1D](../lesson-24-dp-1d/) |
| **Tối ưu truy vấn SQL (query planner)** | Thứ tự join rẻ nhất giữa nhiều bảng = DP trên tập con | [bitmask DP](../lesson-29-bitmask-dp/) |
| **Ví/đầu tư, phân bổ tài nguyên** | Knapsack — chọn tập tối ưu trong giới hạn ngân sách/dung lượng | [knapsack](../lesson-25-knapsack-family/) |
| **Nén (một phần JPEG/video), nhận dạng giọng nói** | Viterbi (DP trên HMM) tìm chuỗi trạng thái khả dĩ nhất | [DP 1D](../lesson-24-dp-1d/) |

### 11.1. Ví dụ cụ thể — `git diff` chính là LCS

Khi bạn chạy `git diff`, git tìm **dãy con chung dài nhất (LCS)** giữa hai phiên bản file để biết dòng nào **giữ nguyên**; phần còn lại = thêm/xóa. Đây đúng là DP grid $O(n \times m)$ (học ở [Lesson 26](../lesson-26-dp-grid-2d/)). Cùng thuật toán: `diff`, `patch`, so sánh code trên GitHub, "track changes" trong Word.

> ❓ **"Vì sao không brute-force?"** Số dãy con của file $n$ dòng là $2^n$ — file 1000 dòng là $2^{1000}$ tổ hợp, bất khả thi. DP khai thác **bài toán con gối nhau** (§2): LCS của tiền tố dùng lại được → giảm xuống $O(n \cdot m)$. Đây chính là lý do DP tồn tại.

### 11.2. ⚠ Khi gặp bài toán thật, nhận ra DP thế nào

- Câu hỏi dạng **"số cách"**, **"tối đa/tối thiểu"**, **"có thể đạt được không"** trên dãy/lưới/cây.
- Lời giải đệ quy **gọi lại cùng tham số** nhiều lần (overlapping subproblems, §2).
- Quyết định ở bước này **chỉ phụ thuộc một ít trạng thái trước** (optimal substructure, §2).
- Nếu thiếu một trong hai điều kiện trên → **không phải DP** (xem [greedy vs DP](../lesson-22-greedy-vs-dp/)).

### 11.3. 📝 Tóm tắt mục 11

- DP chạy thật trong: **diff/merge** (LCS), **spell check** (edit distance), **alignment DNA**, **query planner** (join order), **knapsack** (phân bổ), **Viterbi** (speech/NLP).
- Nhận ra DP: bài "đếm / tối ưu / khả thi" + bài toán con gối nhau + cấu trúc con tối ưu.
- Brute-force $2^n$ → DP khai thác overlap còn $O(n \cdot m)$ — đó là toàn bộ giá trị của DP.

## Bài tập

> Mỗi bài đều có lời giải chi tiết bên dưới (Big-O + định nghĩa state).

1. **Fibonacci 4 cách.** Cài `fib(n)` theo cả 4 cách (naive, memo, tabulation, space-opt). Nêu Big-O từng cách.
2. **Climbing Stairs.** Số cách leo `n` bậc với bước 1 hoặc 2. Cho `dp[i]` nghĩa là gì? Đáp án `n=5`?
3. **Min Cost Climbing Stairs.** Mảng `cost[]`, đứng ở bậc 0 hoặc 1, mỗi lần leo 1 hoặc 2 bậc và trả `cost[i]` khi rời bậc `i`. Tìm chi phí nhỏ nhất tới đỉnh.
4. **Decode Ways.** Đếm số cách giải mã chuỗi số (`'1'→A, ..., '26'→Z`). Vd `"12"` → `"AB"` hoặc `"L"` → 2 cách. Định nghĩa state, recurrence.
5. **Nhận diện overlap.** Cho bài: "đếm số cách phân tích `n` thành tổng các số `1, 3, 4`". Chứng minh có overlap (vẽ một phần cây gọi) và viết recurrence.
6. **Chuyển memo → tabulation.** Cho hàm memo của bài 5, viết lại thành bottom-up. Nêu thứ tự điền.

---

## Lời giải chi tiết

### Bài 1 — Fibonacci 4 cách

Code đầy đủ đã ở các mục 3.1–3.4. Tóm tắt:

| Cách | Code | Thời gian | Bộ nhớ | State |
|------|------|-----------|--------|-------|
| Naive | `fibNaive` | $O(\varphi^n) \approx O(2^n)$ | $O(n)$ stack | — (không memo) |
| Memo | `fibMemo` | $O(n)$ | $O(n)$+stack | `memo[k]` = F(k) |
| Tabulation | `fibTab` | $O(n)$ | $O(n)$ | `dp[i]` = F(i) |
| Space-opt | `fibO1` | $O(n)$ | $O(1)$ | 2 biến `prev1, prev2` |

Verify: cả 4 cho `fib(10)=55`, `fib(40)=102334155`. Chỉ naive là chậm (treo từ `n≈45`).

### Bài 2 — Climbing Stairs

- **State:** `dp[i]` = số cách leo lên đúng bậc `i`.
- **Recurrence:** `dp[i] = dp[i-1] + dp[i-2]` (bước cuối 1 hoặc 2 bậc).
- **Base:** `dp[0]=1, dp[1]=1`.
- **Big-O:** $O(n)$ thời gian, $O(1)$ nếu rolling.
- **Đáp án $n=5$:** dãy `1,1,2,3,5,8` → `dp[5]=8`. Kiểm tra: đây là $F(6)$. Liệt kê 8 cách cho $n=5$ khả thi nhưng dài; tin vào recurrence đã verify ở mục 5.1 cho $n=4$ (=5). ✓

```go
func climbStairs(n int) int {
    if n <= 1 { return 1 }
    a, b := 1, 1
    for i := 2; i <= n; i++ {
        a, b = b, a+b
    }
    return b
}
```

### Bài 3 — Min Cost Climbing Stairs

- **State:** `dp[i]` = chi phí tối thiểu để **tới** bậc `i` (bậc `n` = đỉnh, ở ngoài mảng).
- **Recurrence:** `dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])`.
- **Base:** `dp[0] = dp[1] = 0` (xuất phát miễn phí từ bậc 0 hoặc 1).
- **Đáp án:** `dp[n]`. **Big-O:** $O(n)$ thời gian, $O(1)$ space.

```go
func minCostClimbingStairs(cost []int) int {
    n := len(cost)
    p2, p1 := 0, 0 // dp[i-2], dp[i-1]
    for i := 2; i <= n; i++ {
        cur := min(p1+cost[i-1], p2+cost[i-2])
        p2, p1 = p1, cur
    }
    return p1
}
```

> 💡 **Walk-through `cost = [10, 15, 20]` (n=3):**
> `dp[0]=0, dp[1]=0`.
> `dp[2] = min(dp[1]+cost[1], dp[0]+cost[0]) = min(0+15, 0+10) = 10`.
> `dp[3] = min(dp[2]+cost[2], dp[1]+cost[1]) = min(10+20, 0+15) = 15`.
> Đáp án **15** (xuất phát bậc 1, trả 15, nhảy 2 bậc lên đỉnh). ✓

### Bài 4 — Decode Ways

- **State:** `dp[i]` = số cách giải mã `i` ký tự đầu của chuỗi `s` (tức `s[0..i-1]`).
- **Recurrence:**
  - Nếu `s[i-1] != '0'`: cộng `dp[i-1]` (chữ số này tự đứng một mình `1..9`).
  - Nếu `s[i-2..i-1]` tạo số trong `10..26`: cộng `dp[i-2]` (ghép 2 chữ số).
- **Base:** `dp[0] = 1` (chuỗi rỗng có 1 cách), `dp[1] = (s[0] != '0' ? 1 : 0)`.
- **Big-O:** $O(n)$ thời gian, $O(1)$ space. **Đáp án:** `dp[n]`.

```go
func numDecodings(s string) int {
    n := len(s)
    if n == 0 || s[0] == '0' { return 0 }
    dp := make([]int, n+1)
    dp[0], dp[1] = 1, 1
    for i := 2; i <= n; i++ {
        if s[i-1] != '0' { // chữ số đơn 1..9
            dp[i] += dp[i-1]
        }
        two := (int(s[i-2]-'0'))*10 + int(s[i-1]-'0')
        if two >= 10 && two <= 26 { // ghép 2 chữ số 10..26
            dp[i] += dp[i-2]
        }
    }
    return dp[n]
}
```

> 💡 **Walk-through `s = "226"`:**
> `dp[0]=1, dp[1]=1` (`"2"`→`B`).
> `i=2` (`"22"`): `s[1]='2'≠'0'`→`+dp[1]=1`; `22∈[10,26]`→`+dp[0]=1` → `dp[2]=2` (`"BB"`, `"V"`).
> `i=3` (`"226"`): `s[2]='6'≠'0'`→`+dp[2]=2`; `26∈[10,26]`→`+dp[1]=1` → `dp[3]=3`.
> 3 cách: `"BBF"(2,2,6)`, `"BZ"(2,26)`, `"VF"(22,6)`. ✓

> ⚠ **Cạm bẫy số 0.** `"0"`, `"06"`, `"30"` không decode được (`0` không đứng riêng, `30>26`).
> Phải xử lý `s[i-1]=='0'` (không cộng `dp[i-1]`) và kiểm tra `two>=10`.

### Bài 5 — Nhận diện overlap (phân tích `n` thành tổng `1,3,4`)

- **State:** `dp[n]` = số cách viết `n` thành tổng có thứ tự của các số `1, 3, 4`.
- **Recurrence:** `dp[n] = dp[n-1] + dp[n-3] + dp[n-4]` (số cuối là 1, 3 hoặc 4).
- **Base:** `dp[0]=1`; `dp[k]=0` với `k<0`.

**Chứng minh overlap** — vẽ một phần cây gọi cho `f(5)`:
```
f(5)
├── f(4)
│   ├── f(3)        ← f(3) xuất hiện
│   ├── f(1)
│   └── f(0)
├── f(2)
│   └── f(1)
└── f(1)
... f(3) cũng xuất hiện từ nhánh khác (f(5)→f(4)→f(3))
```
`f(1)` xuất hiện nhiều lần từ các nhánh khác nhau → **overlap rõ ràng** → cần memo.

Walk-through bảng: `dp[0]=1, dp[1]=1, dp[2]=1, dp[3]=2` (`1+1+1`, `3`), `dp[4]=4` (`1+1+1+1, 1+3, 3+1, 4`), `dp[5]=6` (`dp[4]+dp[2]+dp[1]=4+1+1`). **Big-O:** $O(n)$.

### Bài 6 — Chuyển memo → tabulation (bài 5)

Memo (top-down):
```go
func waysMemo(n int, memo map[int]int) int {
    if n == 0 { return 1 }
    if n < 0 { return 0 }
    if v, ok := memo[n]; ok { return v }
    memo[n] = waysMemo(n-1, memo) + waysMemo(n-3, memo) + waysMemo(n-4, memo)
    return memo[n]
}
```

Tabulation (bottom-up) — **thứ tự điền:** `dp[i]` cần `dp[i-1], dp[i-3], dp[i-4]` (đều `< i`) → điền `i` tăng dần từ 0:
```go
func waysTab(n int) int {
    dp := make([]int, n+1)
    dp[0] = 1
    for i := 1; i <= n; i++ {
        dp[i] = dp[i-1]
        if i >= 3 { dp[i] += dp[i-3] }
        if i >= 4 { dp[i] += dp[i-4] }
    }
    return dp[n]
}
```
**Thứ tự điền:** tăng dần `i = 1 → n`, vì mọi dependency `i-1, i-3, i-4` đều nhỏ hơn `i`. Verify: `waysTab(5)=6` khớp bài 5. **Big-O:** $O(n)$ thời gian, $O(n)$ space.

---

## Code & Minh họa

- **Minh họa tương tác:** [visualization.html](./visualization.html) — 3 module:
  1. **Fib call tree** — vẽ cây gọi naive (highlight node tính lại nhiều lần) so với memo (cache hit).
  2. **Top-down vs bottom-up** — animate điền bảng `dp` theo 2 cách.
  3. **DP design walkthrough** — climbing stairs qua 5 bước thiết kế.
- Code Go trong bài là **inline**, biên dịch được. Bài này không có `solutions.go` riêng.

---

## Bài tiếp theo

- [Lesson 24 — DP 1 chiều](../lesson-24-dp-1d/) — áp dụng khung 5 bước cho house robber, Kadane (max subarray), decode ways nâng cao.
- Xem lại nền tảng: [Lesson 22 — Greedy vs DP](../lesson-22-greedy-vs-dp/) · [Lesson 03 — Đệ quy](../lesson-03-recursion-recurrence/).
- Toàn tier: [Tier 4 — Quy hoạch động](../tier-4-dynamic-programming/index.html).

> 📝 **Tóm tắt toàn bài.** DP = đệ quy + nhớ, áp dụng khi bài con **chồng lấp** + có **optimal substructure**.
> Hai cách cài: top-down (memo, lazy) và bottom-up (table, space-opt dễ). Khung thiết kế 5 bước:
> state → recurrence → base → thứ tự → đáp án. Khó nhất là **state design**. Cùng khung dùng cho đếm (`+`) và tối ưu (`min/max`).
> Cạm bẫy: base case sai, state thiếu chiều, thứ tự/off-by-one.
