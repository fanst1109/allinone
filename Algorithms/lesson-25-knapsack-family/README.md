# Lesson 25 — Knapsack Family (Họ bài toán cái balo)

> **Tier 4 · Lesson 25** — họ bài toán **knapsack** (cái balo) là "mặt tiền" của quy hoạch động (dynamic programming, DP). Nắm vững một bộ khung duy nhất, bạn giải được hàng chục biến thể: 0/1 knapsack, unbounded, subset sum, partition, coin change, target sum...

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Dựng được công thức truy hồi (recurrence) cho **0/1 knapsack** và điền bảng `dp[i][w]` bằng tay.
- Hiểu **vì sao greedy sai** với 0/1 knapsack (recap [Lesson 22](../lesson-22-greedy-vs-dp/)) và vì sao DP cứu được.
- Tối ưu không gian từ bảng 2D xuống 1D, và giải thích được **vì sao 0/1 duyệt `w` ngược, unbounded duyệt `w` xuôi** — bug phổ biến nhất của họ bài này.
- Nhận diện **subset sum**, **partition equal subset sum** là biến thể boolean của 0/1 knapsack.
- Phân biệt **coin change (min coins)** với **coin change II (đếm số cách)**, và vì sao thứ tự hai vòng lặp quyết định đúng/sai.
- Biết **bounded knapsack** (số lượng giới hạn) và kỹ thuật **binary splitting**.
- **Truy vết** (backtrack) ra tập món được chọn, không chỉ giá trị tối ưu.
- Hiểu vì sao $O(n \cdot W)$ là **pseudo-polynomial** (giả đa thức), không phải đa thức thật.

## Kiến thức tiền đề

- **Greedy vs DP** — vì sao greedy sai với 0/1 knapsack: [Lesson 22](../lesson-22-greedy-vs-dp/).
- **DP 1 chiều** — tư duy `dp[i]` phụ thuộc trạng thái nhỏ hơn: [Lesson 24](../lesson-24-dp-1d/).
- **Coin change greedy** — hệ tiền nào greedy đúng/sai: [Lesson 22](../lesson-22-greedy-vs-dp/).
- **Đệ quy và truy hồi (recurrence)** — [Lesson 03](../lesson-03-recursion-recurrence/).
- **Phân tích Big-O** — [Lesson 01](../lesson-01-bigo-asymptotic/).
- Sẽ học tiếp **DP trên lưới 2D / grid** ở [Lesson 26](../lesson-26-dp-grid-2d/).

---

## 1. 0/1 Knapsack — bài toán nền tảng

> **💡 Trực giác / Hình dung**
>
> Bạn có một cái balo chịu được tối đa `W` kilôgam. Trước mặt là `n` món đồ, mỗi món có **cân nặng** `wt[i]` và **giá trị** `val[i]`. Mỗi món chỉ có **một cái** — bạn hoặc **lấy nó** (cho vào balo) hoặc **bỏ nó lại**, không có "lấy nửa món". Hỏi: nhét sao để **tổng giá trị lớn nhất** mà tổng cân không vượt `W`?
>
> Cái khó: lựa chọn món này ảnh hưởng tới chỗ trống còn lại cho món khác. Không thể "tham lam lấy món đắt nhất trước" — vì món đắt có thể nặng, chiếm hết chỗ của 2 món rẻ hơn nhưng tổng giá trị cao hơn. Đây là lý do cần DP.

**Phát biểu hình thức.** Cho `n` món, món `i` có `(wt[i], val[i])`, và sức chứa `W`. Tìm tập con `S ⊆ {1..n}` sao cho `Σ_{i∈S} wt[i] ≤ W` và `Σ_{i∈S} val[i]` lớn nhất.

### 1.1 Công thức truy hồi

Định nghĩa trạng thái:

> `dp[i][w]` = giá trị lớn nhất đạt được khi **chỉ xét `i` món đầu tiên** và sức chứa balo là `w`.

Với món thứ `i` (cân `wt[i]`, giá trị `val[i]`), có đúng **hai lựa chọn**:

- **Không lấy món `i`**: giá trị bằng `dp[i-1][w]` (giữ nguyên kết quả của `i-1` món với cùng sức chứa).
- **Lấy món `i`** (chỉ được nếu `wt[i] ≤ w`): giá trị bằng `dp[i-1][w - wt[i]] + val[i]` — dùng `wt[i]` chỗ trống cho món này, phần còn lại `w - wt[i]` để xếp các món trước đó.

Lấy max của hai:

```
dp[i][w] = dp[i-1][w]                                    nếu wt[i] > w
dp[i][w] = max( dp[i-1][w],                              (không lấy)
                dp[i-1][w - wt[i]] + val[i] )            (lấy)   nếu wt[i] ≤ w
```

Cơ sở (base case): `dp[0][w] = 0` cho mọi `w` (không món nào → giá trị 0).

> **⚠ Lỗi thường gặp**
>
> Khi "lấy món `i`", phần phụ phải là `dp[i-1][w - wt[i]]` (dùng `i-1` món), **không phải** `dp[i][w - wt[i]]` (dùng `i` món). Nếu dùng `dp[i]` thì bạn cho phép lấy món `i` **nhiều lần** — đó lại thành unbounded knapsack (mục 4), không còn là 0/1.

### 1.2 Walk-through bằng số cụ thể

Lấy 4 món, sức chứa `W = 5`:

| Món `i` | `wt[i]` | `val[i]` |
|:---:|:---:|:---:|
| 1 | 2 | 3 |
| 2 | 3 | 4 |
| 3 | 4 | 5 |
| 4 | 5 | 6 |

Điền bảng `dp[i][w]`, hàng `i = 0..4`, cột `w = 0..5`. Hàng 0 toàn 0.

**Hàng 1** (món 1: `wt=2, val=3`):
- `w=0,1`: `wt(2) > w` → chép xuống `dp[0][w] = 0`.
- `w=2`: `max(dp[0][2]=0, dp[0][0]+3=3) = 3`.
- `w=3`: `max(dp[0][3]=0, dp[0][1]+3=3) = 3`.
- `w=4`: `max(0, dp[0][2]+3=3) = 3`.
- `w=5`: `max(0, dp[0][3]+3=3) = 3`.

**Hàng 2** (món 2: `wt=3, val=4`):
- `w=0,1,2`: `wt(3) > w` → chép `dp[1][w]` → `0, 0, 3`.
- `w=3`: `max(dp[1][3]=3, dp[1][0]+4=4) = 4`.
- `w=4`: `max(dp[1][4]=3, dp[1][1]+4=4) = 4`.
- `w=5`: `max(dp[1][5]=3, dp[1][2]+4 = 3+4 = 7) = 7`. ← lấy món 1 (val 3) + món 2 (val 4)!

**Hàng 3** (món 3: `wt=4, val=5`):
- `w=0..3`: chép `dp[2][w]` → `0,0,3,4`.
- `w=4`: `max(dp[2][4]=4, dp[2][0]+5=5) = 5`.
- `w=5`: `max(dp[2][5]=7, dp[2][1]+5 = 0+5 = 5) = 7`.

**Hàng 4** (món 4: `wt=5, val=6`):
- `w=0..4`: chép `dp[3][w]` → `0,0,3,4,5`.
- `w=5`: `max(dp[3][5]=7, dp[3][0]+6 = 0+6 = 6) = 7`.

Bảng hoàn chỉnh:

| `i \ w` | 0 | 1 | 2 | 3 | 4 | 5 |
|:---:|:--:|:--:|:--:|:--:|:--:|:--:|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 0 | 3 | 3 | 3 | 3 |
| **2** | 0 | 0 | 3 | 4 | 4 | **7** |
| **3** | 0 | 0 | 3 | 4 | 5 | 7 |
| **4** | 0 | 0 | 3 | 4 | 5 | **7** |

**Đáp số: `dp[4][5] = 7`** — lấy món 1 (`wt 2, val 3`) + món 2 (`wt 3, val 4`), tổng cân `2+3=5 ≤ 5`, tổng giá trị `7`. Món 4 (`val 6`) một mình thua cặp `{1,2}`.

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"Vì sao món đắt nhất (món 4, val 6) lại không được chọn?"* Vì nó nặng 5kg, lấp đầy balo nhưng chỉ cho 6. Trong khi cặp món rẻ `{1,2}` cũng đầy balo nhưng cho 7. Greedy "lấy đắt trước" sẽ chọn món 4 và **sai**.
> - *"Bảng phình to thế này có chậm không?"* Bảng có $(n+1) \cdot (W+1)$ ô, mỗi ô tính trong $O(1)$ → $O(n \cdot W)$. Với $n=4, W=5$ thì chỉ 30 ô. Xem mục 11 về khi `W` lớn.
> - *"Có cần lưu cả bảng 2D không?"* Không — mỗi hàng chỉ phụ thuộc hàng ngay trên. Mục 3 tối ưu xuống 1D.

```go
// 0/1 Knapsack — bảng 2D. Trả về giá trị lớn nhất.
// wt[i], val[i] là cân nặng và giá trị của món i (0-indexed).
func knapsack01(wt, val []int, W int) int {
    n := len(wt)
    // dp[i][w]: dùng i món đầu, sức chứa w. dp[0][*] = 0 (mặc định).
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, W+1)
    }
    for i := 1; i <= n; i++ {
        for w := 0; w <= W; w++ {
            dp[i][w] = dp[i-1][w] // mặc định: không lấy món i
            if wt[i-1] <= w {     // wt[i-1] vì wt 0-indexed, món i là wt[i-1]
                take := dp[i-1][w-wt[i-1]] + val[i-1]
                if take > dp[i][w] {
                    dp[i][w] = take
                }
            }
        }
    }
    return dp[n][W]
}
// knapsack01([2,3,4,5], [3,4,5,6], 5) = 7  (khớp walk-through)
```

> **🔁 Dừng lại tự kiểm tra**
>
> Với cùng input nhưng `W = 7`, `dp[4][7]` bằng bao nhiêu? Món nào được chọn?
>
> <details><summary>Đáp án</summary>
>
> Với `W=7`: cặp `{1,2}` dùng 5kg cho 7; còn 2kg trống nhưng món 3,4 đều nặng hơn. Thử `{2,3}`: cân `3+4=7`, val `4+5=9`. Thử `{1,3}`: cân `2+4=6 ≤ 7`, val `3+5=8`. Thử `{2,4}`: cân `3+5=8 > 7` loại. Tốt nhất là `{2,3}` → **`dp[4][7]=9`**, lấy món 2 và món 3.
> </details>

> **📝 Tóm tắt mục 1**
> - 0/1 knapsack: mỗi món lấy 0 hoặc 1 lần, tối đa tổng giá trị với ràng buộc tổng cân ≤ `W`.
> - Truy hồi: `dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])`.
> - Phần "lấy" phải tham chiếu `dp[i-1]` (không `dp[i]`) — nếu không sẽ thành unbounded.
> - Đáp số ở `dp[n][W]`. Độ phức tạp $O(n \cdot W)$.

---

## 2. Vì sao greedy SAI — cần DP

> **💡 Trực giác / Hình dung**
>
> Greedy với knapsack thường thử "ưu tiên món có **tỉ lệ giá trị/cân** (`val/wt`) cao nhất". Nghe rất hợp lý — lấy món "đáng đồng tiền" nhất trước. Nhưng vì mỗi món **không chia nhỏ được** (0/1), một món tỉ lệ cao nhưng nặng có thể chặn đường cho một bộ món tỉ lệ thấp hơn lại lấp balo tốt hơn.

**Phản ví dụ** (recap [Lesson 22](../lesson-22-greedy-vs-dp/)). Balo `W = 5`:

| Món | `wt` | `val` | `val/wt` |
|:---:|:---:|:---:|:---:|
| A | 1 | 6 | **6.0** |
| B | 2 | 10 | 5.0 |
| C | 3 | 12 | 4.0 |

- **Greedy theo tỉ lệ**: lấy A (`val/wt=6`), còn 4kg. Lấy B (`5`), còn 2kg. C nặng 3 > 2, bỏ. Tổng = `6+10 = 16`.
- **Tối ưu thật (DP)**: lấy B + C = cân `2+3=5`, giá trị `10+12 = 22`. **22 > 16** → greedy thua.

Greedy bị "mồi chài" bởi món A tỉ lệ cao nhưng giá trị tuyệt đối nhỏ. DP xét **mọi** tổ hợp một cách hệ thống nên không bị lừa.

> **⚠ Lỗi thường gặp**
>
> "Greedy chạy đúng trên vài test nên chắc đúng." Sai. Greedy 0/1 knapsack có thể đúng trên hàng trăm test rồi sai một test. **Đúng bằng test ≠ đúng bằng chứng minh.** Với 0/1 knapsack, không có chứng minh greedy nào tồn tại (bài toán NP-hard tổng quát). Chỉ **fractional knapsack** (chia nhỏ được) mới có greedy đúng — xem [Lesson 22](../lesson-22-greedy-vs-dp/).

> **📝 Tóm tắt mục 2**
> - Greedy "tỉ lệ `val/wt` cao trước" sai với 0/1 vì món không chia nhỏ được.
> - Phản ví dụ `W=5`, `{(1,6),(2,10),(3,12)}`: greedy 16, DP 22.
> - 0/1 knapsack tổng quát là NP-hard → không có greedy đúng. Phải DP.

---

## 3. Tối ưu không gian — 2D xuống 1D

> **💡 Trực giác / Hình dung**
>
> Trong công thức `dp[i][w]`, hàng `i` chỉ đọc hàng `i-1`. Không bao giờ cần hàng `i-2`. Vậy giữ cả `n+1` hàng làm gì? Ta dùng **một mảng `dp[w]`** duy nhất, ghi đè tại chỗ qua từng món. Tốn $O(W)$ thay vì $O(n \cdot W)$ bộ nhớ.

Mảng 1D `dp[w]` ban đầu là hàng `i-1`; sau khi xử lý món `i`, nó trở thành hàng `i`. Vấn đề: cập nhật `dp[w]` cần `dp[w - wt[i]]` của **hàng cũ** (`i-1`). Nếu ta duyệt `w` **tăng dần**, thì `dp[w - wt[i]]` đã bị món `i` ghi đè (thành hàng mới) trước khi đọc → dùng nhầm hàng mới → lấy món `i` hai lần.

> **Giải pháp: duyệt `w` GIẢM dần** (từ `W` về `wt[i]`).
>
> Khi tính `dp[w]`, ta cần `dp[w - wt[i]]`. Vì `w - wt[i] < w`, và ta đang đi từ cao xuống thấp, ô `dp[w - wt[i]]` **chưa bị chạm** trong vòng lặp món `i` này → nó vẫn là giá trị hàng `i-1` (cũ). Đúng yêu cầu 0/1.

### 3.1 Walk-through vì sao ngược lại đúng

Dùng món 1 (`wt=2, val=3`), `W=5`. Mảng `dp` trước khi xử lý món 1: `[0,0,0,0,0,0]` (index 0..5).

**Duyệt NGƯỢC `w = 5,4,3,2`** (dừng tại `wt=2`):
- `w=5`: `dp[5] = max(dp[5]=0, dp[3]+3 = 0+3 = 3) = 3`. (`dp[3]` còn là 0 cũ ✓)
- `w=4`: `dp[4] = max(0, dp[2]+3 = 0+3 = 3) = 3`. (`dp[2]` còn 0 ✓)
- `w=3`: `dp[3] = max(0, dp[1]+3 = 0+3 = 3) = 3`. (`dp[1]` còn 0 ✓)
- `w=2`: `dp[2] = max(0, dp[0]+3 = 0+3 = 3) = 3`.

Kết quả `dp = [0,0,3,3,3,3]` — đúng bằng hàng 1 của bảng 2D ở mục 1.2. Mỗi `dp[w]` chỉ tăng tối đa **một lần** `val=3` → món 1 chỉ được lấy 1 lần. ✓

**Nếu duyệt XUÔI `w = 2,3,4,5`** (SAI cho 0/1):
- `w=2`: `dp[2] = max(0, dp[0]+3 = 3) = 3`.
- `w=3`: `dp[3] = max(0, dp[1]+3 = 3) = 3`.
- `w=4`: `dp[4] = max(0, dp[2]+3)`. Nhưng `dp[2]` vừa thành **3** (hàng mới) → `dp[4] = 3+3 = 6`! ← lấy món 1 **hai lần** (cân 4 = 2+2). SAI với 0/1.

Đó chính là lý do hướng duyệt quyết định ngữ nghĩa.

```go
// 0/1 Knapsack — 1D space. Duyệt w NGƯỢC để không tái sử dụng món.
func knapsack01_1D(wt, val []int, W int) int {
    dp := make([]int, W+1) // dp[w]: giá trị tối đa với sức chứa w
    for i := 0; i < len(wt); i++ {
        for w := W; w >= wt[i]; w-- { // NGƯỢC: W -> wt[i]
            if dp[w-wt[i]]+val[i] > dp[w] {
                dp[w] = dp[w-wt[i]] + val[i]
            }
        }
    }
    return dp[W]
}
// knapsack01_1D([2,3,4,5], [3,4,5,6], 5) = 7
```

> **❓ Câu hỏi tự nhiên của người đọc**
>
> - *"Vì sao dừng ở `wt[i]` mà không xuống tới 0?"* Vì khi `w < wt[i]` thì không lấy món `i` được, `dp[w]` giữ nguyên — không cần đụng tới.
> - *"1D có truy vết được tập món không?"* Khó hơn 2D. Để truy vết tiện, giữ bảng 2D (mục 10). 1D chỉ cho giá trị tối ưu.

> **📝 Tóm tắt mục 3**
> - Mỗi hàng chỉ đọc hàng trước → nén xuống `dp[w]` một chiều, $O(W)$ bộ nhớ.
> - **0/1 → duyệt `w` GIẢM dần** để `dp[w-wt]` còn là giá trị hàng cũ → mỗi món lấy ≤ 1 lần.
> - Duyệt xuôi sẽ lấy món nhiều lần (sai cho 0/1, nhưng đúng cho unbounded — mục 4).

---

## 4. Unbounded Knapsack — lấy vô hạn lần

> **💡 Trực giác / Hình dung**
>
> Giống 0/1 nhưng mỗi món có **kho vô hạn** — lấy bao nhiêu cái cũng được (miễn balo còn chỗ). Ví dụ kinh điển: cắt thanh sắt (rod cutting), đổi tiền (mỗi mệnh giá vô hạn).

Truy hồi 2D:

```
dp[i][w] = max( dp[i-1][w],                  (không lấy thêm món i)
                dp[i][w - wt[i]] + val[i] )   (lấy MỘT cái món i nữa)
```

Điểm khác **duy nhất** so với 0/1: phần "lấy" là `dp[i][w - wt[i]]` (vẫn còn món `i` để lấy tiếp) **chứ không** `dp[i-1]`.

Trong dạng 1D, điều này tương đương duyệt `w` **TĂNG dần (xuôi)** — vì khi tính `dp[w]` ta muốn `dp[w-wt[i]]` đã được cập nhật (đã có thể chứa món `i`) để cho phép lấy lại.

### 4.1 Walk-through

Món `{wt=2, val=3}`, `W=6`, 1D xuôi. `dp = [0,0,0,0,0,0,0]`.
- `w=2`: `dp[2] = max(0, dp[0]+3 = 3) = 3`. (1 cái)
- `w=3`: `dp[3] = max(0, dp[1]+3 = 3) = 3`.
- `w=4`: `dp[4] = max(0, dp[2]+3 = 3+3 = 6) = 6`. (2 cái! `dp[2]` đã mới)
- `w=5`: `dp[5] = max(0, dp[3]+3 = 6) = 6`.
- `w=6`: `dp[6] = max(0, dp[4]+3 = 6+3 = 9) = 9`. (3 cái)

Kết quả `dp = [0,0,3,3,6,6,9]` — với `W=6` lấy 3 cái món (cân `2·3=6`, giá trị `3·3=9`). Đúng tinh thần unbounded.

```go
// Unbounded Knapsack — 1D, duyệt w XUÔI (cho phép lấy lại món i).
func knapsackUnbounded(wt, val []int, W int) int {
    dp := make([]int, W+1)
    for i := 0; i < len(wt); i++ {
        for w := wt[i]; w <= W; w++ { // XUÔI: wt[i] -> W
            if dp[w-wt[i]]+val[i] > dp[w] {
                dp[w] = dp[w-wt[i]] + val[i]
            }
        }
    }
    return dp[W]
}
// knapsackUnbounded([2], [3], 6) = 9
```

> **⚠ Lỗi thường gặp**
>
> Copy code 0/1 rồi quên đổi hướng duyệt → kết quả sai âm thầm. Quy tắc nhớ: **0/1 NGƯỢC, unbounded XUÔI**. Hướng duyệt = ngữ nghĩa "lấy lại hay không".

> **📝 Tóm tắt mục 4**
> - Unbounded: mỗi món lấy vô hạn lần.
> - 2D: phần "lấy" dùng `dp[i]` (không `dp[i-1]`). 1D: duyệt `w` XUÔI.
> - Khác 0/1 chỉ ở hướng duyệt `w`.

---

## 5. Subset Sum — biến thể boolean

> **💡 Trực giác / Hình dung**
>
> Bỏ "giá trị" đi, chỉ quan tâm cân nặng = "số". Hỏi: có **tập con** nào tổng đúng bằng `target` không? Đây là 0/1 knapsack mà mỗi món `val = wt` và ta hỏi true/false thay vì max.

> `dp[w]` = `true` nếu tồn tại tập con có tổng đúng `w`.

Truy hồi (1D, duyệt `w` NGƯỢC vì là 0/1):

```
dp[w] = dp[w] OR dp[w - nums[i]]
```

Base: `dp[0] = true` (tập rỗng có tổng 0).

### 5.1 Walk-through

`nums = [3, 34, 4, 12, 5, 2]`, `target = 9`. Quan tâm `dp[0..9]`. Khởi tạo `dp[0]=true`, còn lại false.

- Món `3`: `w=9..3` ngược. `dp[3] |= dp[0]=true → dp[3]=true`. → `dp = T,F,F,T,F,F,F,F,F,F`.
- Món `34`: > 9, bỏ.
- Món `4`: `dp[9] |= dp[5]=F`; ...; `dp[7] |= dp[3]=T → dp[7]=true`; `dp[4] |= dp[0]=T → dp[4]=true`. → có `dp[3],dp[4],dp[7]`.
- Món `12`: > 9, bỏ.
- Món `5`: `dp[9] |= dp[4]=T → dp[9]=true`! (4+5=9) → tìm thấy.
- (món `2` không cần nữa, nhưng vẫn chạy.)

`dp[9] = true` → có tập con `{4,5}` tổng 9. ✓

```go
// Subset Sum — có tập con nào tổng = target không?
func subsetSum(nums []int, target int) bool {
    dp := make([]bool, target+1)
    dp[0] = true // tập rỗng -> tổng 0
    for _, x := range nums {
        for w := target; w >= x; w-- { // NGƯỢC (0/1)
            if dp[w-x] {
                dp[w] = true
            }
        }
    }
    return dp[target]
}
// subsetSum([3,34,4,12,5,2], 9) = true  ({4,5})
```

> **📝 Tóm tắt mục 5**
> - Subset sum = 0/1 knapsack boolean với `val=wt`, target = sức chứa.
> - `dp[w] = dp[w] OR dp[w-nums[i]]`, `dp[0]=true`, duyệt `w` NGƯỢC.

---

## 6. Partition Equal Subset Sum

> **💡 Trực giác / Hình dung**
>
> Chia một mảng số thành **hai phần có tổng bằng nhau**. Nếu tổng cả mảng là `S` thì mỗi phần phải bằng `S/2`. Vậy bài toán = "có tập con nào tổng `S/2` không?" → chính là **subset sum** với `target = S/2`.

**Chốt đầu tiên**: nếu `S` lẻ → không thể chia đôi → trả `false` ngay.

### 6.1 Walk-through

`nums = [1, 5, 11, 5]`. Tổng `S = 22`, chẵn → `target = 11`.

Tìm tập con tổng 11: `{11}` ngay lập tức, hoặc `{1,5,5}`. → `true`. Hai phần: `{11}` và `{1,5,5}` cùng tổng 11.

Phản ví dụ: `nums = [1,2,3,5]`, `S=11` lẻ → `false` ngay.

```go
// Partition Equal Subset Sum -> subset sum với target = tổng/2.
func canPartition(nums []int) bool {
    total := 0
    for _, x := range nums {
        total += x
    }
    if total%2 != 0 { // tổng lẻ -> không chia đôi được
        return false
    }
    return subsetSum(nums, total/2) // tái dùng mục 5
}
// canPartition([1,5,11,5]) = true ; canPartition([1,2,3,5]) = false
```

> **🔁 Dừng lại tự kiểm tra**
>
> `nums = [2, 2, 3, 5]` chia đôi được không?
>
> <details><summary>Đáp án</summary>
>
> Tổng = 12, chẵn, target = 6. Tập con tổng 6? `{2,2,?}`=4 cần thêm 2 nữa nhưng hết số 2... `{3,?}` cần 3, không có. `{2,2,3}=7`, `{2,3}=5`, `{5,?}` cần 1. Không có tập nào tổng đúng 6 → **`false`**. (Dù tổng chẵn, vẫn có thể không chia được.)
> </details>

> **📝 Tóm tắt mục 6**
> - Partition equal = subset sum với `target = tổng/2`.
> - Tổng lẻ → `false` ngay. Tổng chẵn vẫn có thể `false` (không có tập con vừa đủ).

---

## 7. Coin Change (Min Coins) — unbounded biến thể min

> **💡 Trực giác / Hình dung**
>
> Cho các mệnh giá `coins[]` (mỗi loại vô hạn), đổi số tiền `amount` bằng **ít đồng nhất**. Đây là unbounded knapsack nhưng đổi `max` thành `min`, "giá trị" của mỗi coin là `1` (đếm số đồng). Recap greedy version ở [Lesson 22](../lesson-22-greedy-vs-dp/) — greedy chỉ đúng với hệ tiền "canonical" như `{1,5,10,25}`, sai với `{1,3,4}`.

> `dp[a]` = số đồng tối thiểu để tạo đúng `a`. `dp[0] = 0`, còn lại khởi tạo `+∞`.

Truy hồi (duyệt `a` XUÔI — unbounded):

```
dp[a] = min( dp[a], dp[a - c] + 1 )  với mỗi coin c ≤ a
```

### 7.1 Walk-through

`coins = [1, 3, 4]`, `amount = 6`. `dp[0]=0`, `dp[1..6]=∞`.

Xử lý từng coin (hoặc từng `a`, kết quả như nhau cho min). Đi theo `a` tăng:

| `a` | tính từ các coin | `dp[a]` |
|:--:|---|:--:|
| 0 | — | 0 |
| 1 | `dp[0]+1=1` | 1 |
| 2 | `dp[1]+1=2` | 2 |
| 3 | `min(dp[2]+1=3, dp[0]+1=1)` | **1** (coin 3) |
| 4 | `min(dp[3]+1=2, dp[1]+1=2, dp[0]+1=1)` | **1** (coin 4) |
| 5 | `min(dp[4]+1=2, dp[2]+1=3, dp[1]+1=2)` | 2 |
| 6 | `min(dp[5]+1=3, dp[3]+1=2, dp[2]+1=3)` | **2** (3+3) |

`dp[6] = 2` → hai đồng `{3,3}`. Greedy `{1,3,4}` lấy 4 trước rồi 1+1 → 3 đồng → SAI. DP đúng.

```go
// Coin Change (min coins). Trả -1 nếu không đổi được.
func coinChangeMin(coins []int, amount int) int {
    const INF = 1 << 30
    dp := make([]int, amount+1)
    for a := 1; a <= amount; a++ {
        dp[a] = INF
    }
    for _, c := range coins {
        for a := c; a <= amount; a++ { // XUÔI (unbounded)
            if dp[a-c]+1 < dp[a] {
                dp[a] = dp[a-c] + 1
            }
        }
    }
    if dp[amount] >= INF {
        return -1
    }
    return dp[amount]
}
// coinChangeMin([1,3,4], 6) = 2
```

> **📝 Tóm tắt mục 7**
> - Coin change min = unbounded knapsack, giá trị mỗi coin = 1, đổi max → min.
> - `dp[a] = min(dp[a], dp[a-c]+1)`, `dp[0]=0`, duyệt `a` XUÔI.
> - Greedy chỉ đúng với hệ tiền canonical; DP đúng mọi hệ.

---

## 8. Coin Change II (Đếm số cách)

> **💡 Trực giác / Hình dung**
>
> Cùng `coins[]` vô hạn, đếm **có bao nhiêu cách** tạo `amount`. Khác bài min ở chỗ: ta đếm tổ hợp **không phân biệt thứ tự** — `{1,2}` và `{2,1}` là **cùng một cách**.

> `dp[a]` = số cách tạo `a`. `dp[0] = 1` (một cách: không lấy gì).

Truy hồi: `dp[a] += dp[a - c]`. **Nhưng thứ tự hai vòng lặp quyết định đúng/sai.**

### 8.1 Thứ tự loop — vì sao quan trọng

**ĐÚNG cho đếm tổ hợp** (vòng ngoài = coin, vòng trong = amount):

```go
for _, c := range coins {       // NGOÀI: từng coin
    for a := c; a <= amount; a++ { // TRONG: amount
        dp[a] += dp[a-c]
    }
}
```

Mỗi coin được "đưa vào sử dụng" một lần theo thứ tự cố định → mọi tổ hợp đếm đúng một lần.

**SAI (đếm hoán vị, lặp)** nếu đảo: vòng ngoài amount, vòng trong coin → `{1,2}` và `{2,1}` bị đếm hai lần.

### 8.2 Walk-through

`coins = [1, 2, 3]`, `amount = 4`. `dp = [1,0,0,0,0]`.

**Coin 1** (`a=1..4`): mỗi `dp[a] += dp[a-1]` → `dp = [1,1,1,1,1]` (chỉ dùng toàn coin 1: 1 cách mỗi amount).

**Coin 2** (`a=2..4`):
- `dp[2] += dp[0]=1 → 2` ({1,1},{2})
- `dp[3] += dp[1]=1 → 2` ({1,1,1},{1,2})
- `dp[4] += dp[2]=2 → 3` ({1,1,1,1},{1,1,2},{2,2})

→ `dp = [1,1,2,2,3]`.

**Coin 3** (`a=3..4`):
- `dp[3] += dp[0]=1 → 3` (thêm {3})
- `dp[4] += dp[1]=1 → 4` (thêm {1,3})

→ `dp = [1,1,2,3,4]`. **`dp[4] = 4`**: `{1,1,1,1}, {1,1,2}, {2,2}, {1,3}`. ✓ Không có `{2,1,1}` riêng vì đó cùng tổ hợp `{1,1,2}`.

```go
// Coin Change II — đếm số cách (tổ hợp, không phân biệt thứ tự).
func coinChangeCount(coins []int, amount int) int {
    dp := make([]int, amount+1)
    dp[0] = 1 // 1 cách tạo 0: không lấy gì
    for _, c := range coins {        // coin NGOÀI (tránh trùng hoán vị)
        for a := c; a <= amount; a++ { // amount TRONG, xuôi
            dp[a] += dp[a-c]
        }
    }
    return dp[amount]
}
// coinChangeCount([1,2,3], 4) = 4
```

> **⚠ Lỗi thường gặp**
>
> - **Đảo thứ tự loop** → đếm hoán vị thay vì tổ hợp. Nếu đề hỏi "số dãy có thứ tự" (đếm hoán vị) thì mới đảo (amount ngoài, coin trong).
> - **Overflow**: số cách có thể rất lớn — dùng `int64`/`big.Int` hoặc lấy mod theo đề (thường `mod 1e9+7`).

> **📝 Tóm tắt mục 8**
> - Coin change II: đếm cách (tổ hợp). `dp[a] += dp[a-c]`, `dp[0]=1`.
> - **coin NGOÀI, amount TRONG** → đếm tổ hợp đúng. Đảo lại → đếm hoán vị.
> - Coi chừng overflow.

---

## 9. Bounded Knapsack — số lượng giới hạn (nhắc qua)

Mỗi món `i` có **`cnt[i]` cái** (không phải 1 như 0/1, cũng không vô hạn như unbounded). Cách ngây thơ: tách món `i` thành `cnt[i]` món 0/1 giống nhau → chạy 0/1 → $O(W \cdot \sum \text{cnt}[i])$, có thể chậm nếu `cnt` lớn.

**Binary splitting** (tối ưu): thay vì tách `cnt` cái rời, gộp thành các "gói" kích thước `1, 2, 4, ..., 2^k`, phần dư. Ví dụ `cnt=13` → gói `1, 2, 4, 6` (`1+2+4=7`, dư `13-7=6`). Mọi số `0..13` cái đều biểu diễn được bằng tổ hợp các gói này. Mỗi gói coi như một món 0/1 → còn $O(\log \text{cnt}[i])$ món thay vì `cnt[i]` → $O(W \cdot \sum \log \text{cnt}[i])$.

```go
// Bounded knapsack qua binary splitting (phác thảo).
func knapsackBounded(wt, val, cnt []int, W int) int {
    var w2, v2 []int
    for i := range wt {
        k := 1
        c := cnt[i]
        for c > 0 { // tách thành gói 1,2,4,... rồi phần dư
            take := k
            if take > c {
                take = c
            }
            w2 = append(w2, wt[i]*take)
            v2 = append(v2, val[i]*take)
            c -= take
            k <<= 1
        }
    }
    return knapsack01_1D(w2, v2, W) // chạy 0/1 trên các gói
}
```

> **📝 Tóm tắt mục 9**
> - Bounded: mỗi món `cnt[i]` cái. Tách thành món 0/1.
> - Binary splitting: gộp thành gói `1,2,4,...` + dư → $O(\log \text{cnt})$ món/loại.

---

## 10. Truy vết lời giải (Backtrack)

> **💡 Trực giác / Hình dung**
>
> Bảng `dp` cho **giá trị** tối ưu, nhưng thường ta muốn biết **chọn món nào**. Giữ bảng 2D, rồi đi ngược từ `dp[n][W]`: tại mỗi món hỏi *"giá trị này có khác hàng trên không?"* — nếu khác thì món `i` đã được lấy.

Quy tắc: nếu `dp[i][w] != dp[i-1][w]` → món `i` được lấy → ghi nhận, rồi nhảy về `dp[i-1][w - wt[i]]`. Nếu bằng → món `i` không lấy → về `dp[i-1][w]`.

### 10.1 Walk-through (dùng bảng mục 1.2)

Bắt đầu `i=4, w=5`, `dp[4][5]=7`:
- `dp[4][5]=7 == dp[3][5]=7` → món 4 **không lấy**. Về `(3, 5)`.
- `dp[3][5]=7 == dp[2][5]=7` → món 3 **không lấy**. Về `(2, 5)`.
- `dp[2][5]=7 != dp[1][5]=3` → món 2 **LẤY**. Ghi {2}. Về `(1, 5-3=2)`.
- `dp[1][2]=3 != dp[0][2]=0` → món 1 **LẤY**. Ghi {1}. Về `(0, 2-2=0)`.
- `i=0` → dừng.

Tập chọn = `{món 1, món 2}`, khớp đáp số tổng giá trị 7. ✓

```go
// 0/1 Knapsack + truy vết: trả (giá trị tối ưu, danh sách index món được chọn).
func knapsackWithItems(wt, val []int, W int) (int, []int) {
    n := len(wt)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, W+1)
    }
    for i := 1; i <= n; i++ {
        for w := 0; w <= W; w++ {
            dp[i][w] = dp[i-1][w]
            if wt[i-1] <= w {
                if t := dp[i-1][w-wt[i-1]] + val[i-1]; t > dp[i][w] {
                    dp[i][w] = t
                }
            }
        }
    }
    // truy vết ngược từ (n, W)
    var chosen []int
    w := W
    for i := n; i >= 1; i-- {
        if dp[i][w] != dp[i-1][w] { // món i được lấy
            chosen = append(chosen, i-1) // index 0-based
            w -= wt[i-1]
        }
    }
    return dp[n][W], chosen
}
// knapsackWithItems([2,3,4,5], [3,4,5,6], 5) = (7, [1, 0])  (món index 1 và 0)
```

> **📝 Tóm tắt mục 10**
> - Truy vết cần bảng 2D. Đi ngược từ `dp[n][W]`.
> - `dp[i][w] != dp[i-1][w]` → món `i` được lấy; nhảy `w -= wt[i]`.

---

## 11. Độ phức tạp — Pseudo-polynomial

> **❓ Câu hỏi tự nhiên của người đọc**
>
> *"$O(n \cdot W)$ trông như đa thức mà, sao gọi pseudo-polynomial?"*

$O(n \cdot W)$ phụ thuộc vào **giá trị** của `W`, không phải kích thước biểu diễn của nó. Một số `W` chiếm $\log_2(W)$ bit khi nhập vào. Nếu input có kích thước `L` bit thì `W` có thể lên tới $2^L$ → thuật toán chạy $O(n \cdot 2^L)$ theo độ dài input → **lũy thừa** theo số bit.

Ví dụ cụ thể:
- $n=100, W=1000$ → $100 \cdot 1000 = 10^5$ phép tính → nhanh.
- $n=100, W=10^9$ → $10^{11}$ phép tính → **không tractable** (vài phút–giờ + bộ nhớ khổng lồ cho mảng $10^9$).

Vì vậy 0/1 knapsack với `W` rất lớn (hoặc cân/giá trị là số thực) là **NP-hard** — không có thuật toán đa thức thật theo kích thước input. DP chỉ nhanh khi `W` (hoặc tổng giá trị) nhỏ.

| Biến thể | Thời gian | Bộ nhớ |
|---|---|---|
| 0/1 knapsack 2D | $O(n \cdot W)$ | $O(n \cdot W)$ |
| 0/1 knapsack 1D | $O(n \cdot W)$ | $O(W)$ |
| Unbounded | $O(n \cdot W)$ | $O(W)$ |
| Subset sum | $O(n \cdot \text{target})$ | $O(\text{target})$ |
| Coin change min/count | $O(n \cdot \text{amount})$ | $O(\text{amount})$ |
| Bounded (binary split) | $O(W \cdot \sum \log \text{cnt}[i])$ | $O(W)$ |

> **📝 Tóm tắt mục 11**
> - $O(n \cdot W)$ là pseudo-polynomial: đa thức theo **giá trị** `W`, lũy thừa theo số **bit** của `W`.
> - `W` lớn (≥ ~10^8) → không tractable. 0/1 knapsack tổng quát là NP-hard.

---

## 12. Khi nào nhận ra "đây là knapsack"?

Dấu hiệu nhận biết một bài toán thuộc họ knapsack:

- Có một **tập phần tử**, mỗi phần tử **chọn hoặc không** (hoặc chọn số lần giới hạn / vô hạn).
- Có một **ràng buộc tổng** dạng "tổng weight/sum ≤ capacity" hoặc "tổng = target".
- Cần **tối ưu** (max/min giá trị) hoặc **đếm** số cách / kiểm tra tồn tại (boolean).

| Đề bài hỏi... | Biến thể |
|---|---|
| Max giá trị, mỗi món 1 lần | 0/1 knapsack |
| Max giá trị, mỗi món vô hạn | Unbounded |
| Có tập con tổng = target? | Subset sum |
| Chia 2 phần bằng nhau? | Partition equal |
| Ít đồng nhất đổi tiền? | Coin change min |
| Bao nhiêu cách đổi tiền? | Coin change II |
| Mỗi món có `cnt` cái | Bounded |

> **📝 Tóm tắt mục 12**
> - Knapsack pattern = chọn subset với ràng buộc tổng, để tối ưu giá trị / đếm / kiểm tra.
> - Map đề bài → biến thể qua bảng trên.

---

## 13. Cạm bẫy

> **⚠ Lỗi thường gặp — tổng hợp**
>
> 1. **Hướng duyệt `w` sai** (bug #1 của họ này): 0/1 phải duyệt `w` **NGƯỢC**, unbounded **XUÔI**. Đảo nhầm → kết quả sai âm thầm (vẫn ra số, nhưng sai).
> 2. **Coin change II — thứ tự loop**: coin NGOÀI, amount TRONG → đếm tổ hợp đúng. Đảo lại → đếm hoán vị (trùng).
> 3. **Hiểu nhầm pseudo-polynomial là polynomial**: $O(n \cdot W)$ không phải đa thức theo input size. `W` lớn → không tractable.
> 4. **Overflow khi đếm số cách**: `dp[a]` có thể vượt `int32`. Dùng `int64` hoặc lấy mod.
> 5. **Phần "lấy" tham chiếu nhầm hàng**: 0/1 dùng `dp[i-1][...]`; nếu dùng `dp[i][...]` thì biến thành unbounded.
> 6. **Quên base case**: subset sum `dp[0]=true`, coin count `dp[0]=1`, coin min `dp[0]=0` (còn lại `∞`).
> 7. **Tổng lẻ ở partition**: phải return `false` ngay khi tổng lẻ, đừng chạy DP với `target` không nguyên.

---

## Bài tập

1. **0/1 Knapsack + truy vết** — `wt=[1,3,4,5]`, `val=[1,4,5,7]`, `W=7`. Tìm giá trị tối ưu và tập món được chọn.
2. **Partition Equal Subset Sum** — `nums=[1,5,11,5]`. Chia được hai phần bằng nhau không? Chỉ ra hai phần.
3. **Coin Change (min)** — `coins=[2,5,10,1]`, `amount=27`. Số đồng tối thiểu?
4. **Coin Change II (đếm cách)** — `coins=[1,2,5]`, `amount=5`. Bao nhiêu cách?
5. **Target Sum** — `nums=[1,1,1,1,1]`, gán mỗi số dấu `+` hoặc `-` sao cho tổng = `target=3`. Bao nhiêu cách? (Đưa về subset sum.)
6. **Ones and Zeroes** — cho danh sách chuỗi nhị phân, chọn nhiều chuỗi nhất sao cho dùng ≤ `m` số `0` và ≤ `n` số `1`. (Knapsack 2 chiều capacity.) `strs=["10","0001","111001","1","0"]`, `m=5, n=3`.

---

## Lời giải chi tiết

### Bài 1 — 0/1 Knapsack + truy vết

**Cách tiếp cận**: điền bảng `dp[i][w]` rồi backtrack (mục 10).

Bảng `dp` với `wt=[1,3,4,5]`, `val=[1,4,5,7]`, `W=7` (cột `w=0..7`):

| `i\w` | 0|1|2|3|4|5|6|7 |
|:--:|--|--|--|--|--|--|--|--|
| 0 | 0|0|0|0|0|0|0|0 |
| 1 (wt1,v1) | 0|1|1|1|1|1|1|1 |
| 2 (wt3,v4) | 0|1|1|4|5|5|5|5 |
| 3 (wt4,v5) | 0|1|1|4|5|6|6|9 |
| 4 (wt5,v7) | 0|1|1|4|5|7|8|9 |

`dp[4][7] = 9`. Truy vết từ `(4,7)`:
- `dp[4][7]=9 == dp[3][7]=9` → món 4 không lấy. Về `(3,7)`.
- `dp[3][7]=9 != dp[2][7]=5` → món 3 **lấy** (wt 4). Về `(2, 7-4=3)`.
- `dp[2][3]=4 != dp[1][3]=1` → món 2 **lấy** (wt 3). Về `(1, 3-3=0)`.
- `dp[1][0]=0 == dp[0][0]=0` → món 1 không lấy.

**Đáp án: giá trị 9, chọn món 2 và món 3** (`wt 3+4=7=W`, `val 4+5=9`). Big-O: $O(n \cdot W)$ time, $O(n \cdot W)$ space (cần 2D để truy vết).

### Bài 2 — Partition Equal Subset Sum

Tổng `= 1+5+11+5 = 22`, chẵn → `target = 11`. Tìm tập con tổng 11:

`subsetSum([1,5,11,5], 11)`: món `11` một mình → `dp[11]=true`. **Có thể chia.** Hai phần: `{11}` và `{1,5,5}` (cùng tổng 11). Big-O: $O(n \cdot \text{target}) = O(n \cdot S/2)$.

### Bài 3 — Coin Change (min)

`coins=[2,5,10,1]`, `amount=27`. Chạy `dp[a]=min(dp[a], dp[a-c]+1)`.

Tham lam-tay: `27 = 10+10+5+2` = 4 đồng. Kiểm: có ít hơn không? `10+10+5+2=27` (4), `10+10+5+1+1`(5) tệ hơn, `25` không có mệnh giá 25. DP cho **`dp[27]=4`**. Big-O: $O(n \cdot \text{amount})$.

### Bài 4 — Coin Change II (đếm cách)

`coins=[1,2,5]`, `amount=5`. `dp=[1,0,0,0,0,0]`.
- Coin 1: `dp=[1,1,1,1,1,1]`.
- Coin 2 (`a=2..5`): `dp[2]+=dp[0]→2`, `dp[3]+=dp[1]→2`, `dp[4]+=dp[2]→3`, `dp[5]+=dp[3]→3` → `dp=[1,1,2,2,3,3]`.
- Coin 5 (`a=5`): `dp[5]+=dp[0]→4` → `dp=[1,1,2,2,3,4]`.

**`dp[5]=4`**: `{1×5}, {1×3,2}, {1,2,2}, {5}`. Big-O: $O(n \cdot \text{amount})$.

### Bài 5 — Target Sum (gán +/-)

**Cách tiếp cận**: gọi `P` = tập số gán `+`, `N` = tập gán `-`. Ta có `sum(P) - sum(N) = target` và `sum(P) + sum(N) = total`. Cộng hai: `2·sum(P) = target + total` → `sum(P) = (target + total)/2`.

→ Bài toán thành: **đếm số tập con `P` có tổng = `(target+total)/2`** — subset sum count (giống coin change II nhưng mỗi số 1 lần → duyệt `w` NGƯỢC).

Với `nums=[1,1,1,1,1]`, `total=5`, `target=3`: `sum(P)=(3+5)/2=4`. Đếm tập con của năm số `1` có tổng 4 = chọn 4 trong 5 số `1` = `C(5,4)=5`.

```go
func findTargetSumWays(nums []int, target int) int {
    total := 0
    for _, x := range nums {
        total += x
    }
    s := target + total
    if s < 0 || s%2 != 0 { // (target+total) phải chẵn, không âm
        return 0
    }
    cap := s / 2
    dp := make([]int, cap+1)
    dp[0] = 1
    for _, x := range nums {
        for w := cap; w >= x; w-- { // NGƯỢC: subset count (mỗi số 1 lần)
            dp[w] += dp[w-x]
        }
    }
    return dp[cap]
}
// findTargetSumWays([1,1,1,1,1], 3) = 5
```

**Đáp án: 5 cách.** Big-O: $O(n \cdot (\text{total}+\text{target})/2)$.

### Bài 6 — Ones and Zeroes (2 chiều capacity)

**Cách tiếp cận**: 0/1 knapsack với **hai ràng buộc** thay vì một — số `0` ≤ `m` VÀ số `1` ≤ `n`. `dp[i][j]` = số chuỗi tối đa chọn được khi còn quota `i` số 0, `j` số 1. Mỗi chuỗi là một "món" lấy/không. Vì là 0/1, duyệt cả `i,j` NGƯỢC.

```go
func findMaxForm(strs []string, m, n int) int {
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }
    for _, s := range strs {
        zeros, ones := 0, 0
        for _, ch := range s {
            if ch == '0' {
                zeros++
            } else {
                ones++
            }
        }
        for i := m; i >= zeros; i-- { // NGƯỢC cả 2 chiều (0/1)
            for j := n; j >= ones; j-- {
                if dp[i-zeros][j-ones]+1 > dp[i][j] {
                    dp[i][j] = dp[i-zeros][j-ones] + 1
                }
            }
        }
    }
    return dp[m][n]
}
// findMaxForm(["10","0001","111001","1","0"], 5, 3) = 4
```

Với `strs=["10","0001","111001","1","0"], m=5, n=3`: chọn được tối đa **4** chuỗi (ví dụ `{"10","0001","1","0"}` dùng `0`: 1+3+0+1=5≤5, `1`: 1+1+1+0... cần đếm kỹ — kết quả tối ưu là 4). Big-O: $O(L \cdot m \cdot n)$ với $L$ = số chuỗi.

---

## Tổng kết bài học

- **Một bộ khung, nhiều biến thể**: tất cả họ knapsack đều là `dp[trạng thái] = tối ưu/đếm trên các lựa chọn lấy/không`.
- **Hướng duyệt `w` là linh hồn**: 0/1 → NGƯỢC, unbounded → XUÔI. Nhớ sai = bug âm thầm.
- **Coin change II** thứ tự loop coin/amount phân biệt tổ hợp vs hoán vị.
- **Truy vết** cần bảng 2D, đi ngược so sánh `dp[i][w]` với `dp[i-1][w]`.
- $O(n \cdot W)$ là **pseudo-polynomial** — nhanh khi `W` nhỏ, NP-hard khi `W` lớn.

## Code & Minh họa

- [visualization.html](./visualization.html) — 3 module: (1) điền bảng 0/1 knapsack + truy vết món; (2) so sánh hướng duyệt `w` 0/1 vs unbounded; (3) coin change min + đếm cách.

## Bài tiếp theo

- [Lesson 26 — DP trên lưới 2D / Grid](../lesson-26-dp-grid-2d/) — chuyển từ knapsack (1 trục weight) sang DP trên lưới 2 chiều: đường đi nhỏ nhất, số đường đi, edit distance.
