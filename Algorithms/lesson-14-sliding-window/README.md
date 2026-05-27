# Lesson 14 — Sliding Window (Cửa sổ trượt)

> **Tier 2 — Tìm kiếm & kỹ thuật cốt lõi.** Kỹ thuật biến nhiều bài toán về **đoạn con liên tục** (contiguous subarray/substring) từ `O(n²)` hoặc `O(n³)` xuống `O(n)`, bằng cách **tái dùng** kết quả của cửa sổ trước thay vì tính lại từ đầu.

---

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Hiểu **ý tưởng cốt lõi** của sliding window: vì sao tái dùng kết quả lại cho `O(n)`.
2. Phân biệt **fixed window** (kích thước `k` cố định) và **variable window** (co giãn theo điều kiện).
3. Thuộc **template chuẩn**: mở rộng `r`, thu nhỏ `l` khi vi phạm, cập nhật đáp án.
4. Giải được 4 bài kinh điển: longest substring no-repeat, minimum window substring, max sum size `k`, longest subarray sum ≤ target.
5. Nhận ra **khi nào KHÔNG dùng được** sliding window (điều kiện không monotonic).
6. Hiểu **sliding window maximum** dùng **deque đơn điệu** (monotonic deque) cho `O(n)`.

## Kiến thức tiền đề

- **Big-O & phân tích tiệm cận** — [Lesson 01](../lesson-01-bigo-asymptotic/). Cần để hiểu vì sao `O(n)` thắng `O(n·k)`.
- **Amortized analysis** — [Lesson 02](../lesson-02-amortized-analysis/). Mỗi phần tử vào/ra window đúng 1 lần → tổng `O(n)` dù vòng `while` lồng trong `for`.
- **Two pointers** — [Lesson 13](../lesson-13-two-pointers/). Sliding window là một dạng đặc biệt của two pointers (hai con trỏ **cùng chiều**).
- Quen với **hash map** (`map[byte]int`) và **slice** trong Go.

---

## 1. Ý tưởng cốt lõi — vì sao tái dùng lại nhanh

### 1.1 Bài toán mở đầu

> Cho mảng `nums = [2, 1, 5, 1, 3, 2]` và `k = 3`. Tìm **tổng lớn nhất** của một đoạn con liên tục độ dài đúng `k`.

Đoạn con liên tục độ dài 3 gồm: `[2,1,5]=8`, `[1,5,1]=7`, `[5,1,3]=9`, `[1,3,2]=6`. Đáp án là **9**.

**Cách ngây thơ (brute-force):** với mỗi vị trí bắt đầu `i`, cộng `k` phần tử. Có `n−k+1` vị trí, mỗi vị trí cộng `k` số → `O(n·k)`. Với `k ≈ n/2` thì đây là `O(n²)`.

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng bạn cầm một khung cửa sổ rộng đúng 3 ô, đặt lên mảng. Khi **trượt khung sang phải 1 ô**: một phần tử **rơi ra** ở mép trái, một phần tử mới **lọt vào** ở mép phải. Phần ở giữa (`k−2` phần tử) **không đổi**. Vậy tại sao phải cộng lại toàn bộ? Chỉ cần lấy tổng cũ, **trừ phần rơi ra, cộng phần lọt vào**:
>
> ```
> sum_mới = sum_cũ − nums[trái] + nums[phải_mới]
> ```
>
> Mỗi lần trượt chỉ tốn `O(1)` thay vì `O(k)`. Trượt `n` lần → `O(n)`.

### 1.2 Walk-through số cụ thể

Trượt window `k=3` trên `[2, 1, 5, 1, 3, 2]`:

| Bước | Window | Phép tính | Sum | Max |
|------|--------|-----------|----:|----:|
| Khởi tạo | `[2,1,5]` | `2+1+5` | 8 | 8 |
| Trượt → 1 | `[1,5,1]` | `8 − 2 + 1` | 7 | 8 |
| Trượt → 2 | `[5,1,3]` | `7 − 1 + 3` | 9 | **9** |
| Trượt → 3 | `[1,3,2]` | `9 − 5 + 2` | 6 | 9 |

Tổng số phép cộng/trừ: 2 (khởi tạo) + 3×2 = 8, thay vì brute-force `4×3 = 12`. Với `n` lớn khác biệt thành `O(n)` vs `O(n²)`.

### 1.3 So sánh độ phức tạp bằng số thật

Để thấy "tái dùng" tiết kiệm bao nhiêu, đếm số phép cộng cho cả hai cách với `k = n/2`:

| `n` | `k=n/2` | Brute-force `(n−k+1)·k` | Sliding window `≈ 2n` | Tỉ lệ tiết kiệm |
|----:|--------:|------------------------:|----------------------:|----------------:|
| 10 | 5 | `6 × 5 = 30` | `20` | 1.5× |
| 100 | 50 | `51 × 50 = 2 550` | `200` | ~13× |
| 1 000 | 500 | `501 × 500 = 250 500` | `2 000` | ~125× |
| 1 000 000 | 500 000 | `~2.5 × 10¹¹` | `2 000 000` | ~125 000× |

Khoảng cách càng lớn khi `n` tăng — đây là khác biệt `O(n²)` vs `O(n)` thể hiện bằng con số.

### 1.4 Ba "trục" phân loại bài toán sliding window

Hầu hết bài toán rơi vào lưới 2 chiều sau (cộng thêm trục "đại lượng theo dõi"):

| | **Fixed** (cho sẵn `k`) | **Variable** (co giãn theo điều kiện) |
|---|---|---|
| **Đại lượng = tổng/đếm** | max sum size `k` (§2.1), average | longest sum ≤ target (§5.4), số subarray có tổng = goal |
| **Đại lượng = "số loại / lặp"** | đếm số loại trong mọi window `k` | longest no-repeat (§5.1), fruit baskets (Bài 5) |
| **Đại lượng = min/max** | sliding window maximum (§8) | (hiếm) |

Ba câu hỏi cần trả lời trước khi code mọi bài:

1. **Window cố định hay co giãn?** Đề cho sẵn `k` → fixed. Đề hỏi "dài nhất/ngắn nhất thỏa..." → variable.
2. **Đại lượng theo dõi là gì?** Tổng? Số ký tự phân biệt? Max? → quyết định trạng thái lưu (biến `sum`, map `count`, hay deque).
3. **Điều kiện có monotonic không?** (xem §6) — nếu không, sliding window **không** dùng được.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Tái dùng kiểu này luôn hợp lệ không?"* — Chỉ khi đại lượng cập nhật được **tăng dần** (incrementally): tổng (cộng/trừ), đếm số phần tử thỏa điều kiện (map ++/--). Với "max của window" thì **không** trừ ra được dễ dàng (xem §8).
> - *"Window có buộc phải kích thước cố định?"* — Không. §3 cho window co giãn.

> 🔁 **Dừng lại tự kiểm tra.** Với `nums=[4,2,1,7,8,1,2,8,1,0]`, `k=2`, sum max bằng bao nhiêu?
> <details><summary>Đáp án</summary>
> Các tổng: `6,3,8,15,9,3,10,9,1`. Max = **15** (cặp `[7,8]`). Trượt: khởi tạo `4+2=6`; rồi `6−4+1=3`; `3−2+7=8`; `8−1+8=15`; ... mỗi bước `O(1)`.
> </details>

---

## 2. Fixed window — kích thước cố định `k`

**Khuôn mẫu:** xử lý `k` phần tử đầu (warm-up), rồi với mỗi `r` từ `k` tới `n−1`: cộng `nums[r]`, trừ `nums[r−k]`, cập nhật đáp án.

### 2.1 Max sum subarray size k (code Go)

```go
// maxSumK trả về tổng lớn nhất của đoạn con liên tục độ dài đúng k.
// Ý tưởng: cửa sổ trượt — sum mới = sum cũ − phần rơi ra + phần lọt vào.
// Độ phức tạp: O(n) thời gian, O(1) bộ nhớ.
func maxSumK(nums []int, k int) int {
    if k <= 0 || k > len(nums) {
        return 0 // hoặc báo lỗi tùy convention
    }
    // Bước 1: tính tổng cửa sổ đầu tiên nums[0..k-1].
    windowSum := 0
    for i := 0; i < k; i++ {
        windowSum += nums[i]
    }
    best := windowSum

    // Bước 2: trượt cửa sổ. r là chỉ số phần tử MỚI lọt vào (mép phải).
    // Phần tử rơi ra ở mép trái là nums[r-k].
    for r := k; r < len(nums); r++ {
        windowSum += nums[r] - nums[r-k] // cộng phải, trừ trái — O(1)
        if windowSum > best {
            best = windowSum
        }
    }
    return best
}
```

**Walk-through** trên `[2,1,5,1,3,2]`, `k=3`:

- Warm-up: `windowSum = 2+1+5 = 8`, `best = 8`.
- `r=3`: `windowSum = 8 + nums[3] − nums[0] = 8 + 1 − 2 = 7`. `best = 8`.
- `r=4`: `windowSum = 7 + nums[4] − nums[1] = 7 + 3 − 1 = 9`. `best = 9`.
- `r=5`: `windowSum = 9 + nums[5] − nums[2] = 9 + 2 − 5 = 6`. `best = 9`.
- Trả về **9** ✓.

**Thêm ví dụ số** để củng cố công thức `windowSum += nums[r] − nums[r−k]`:

- `nums=[1,1,1,1,1]`, `k=2`: mọi window tổng 2 → max **2**. Trượt: `2; 2−1+1=2; ...`.
- `nums=[5,4,3,2,1]` (giảm dần), `k=2`: tổng `9,7,5,3` → max **9** (window đầu). Số giảm dần ⇒ window đầu luôn lớn nhất.
- `nums=[-2,-1,-3,-4]` (toàn âm), `k=2`: tổng `−3,−4,−7` → max **−3**. Sliding window vẫn đúng với số âm **khi `k` cố định** (chỉ cộng/trừ, không co trái).
- `nums=[3]`, `k=1`: chỉ một window → max **3**.

### 2.2 Trung bình mỗi window (average of subarrays size k)

Chỉ là `maxSumK` nhưng lưu cả mảng `windowSum/k`. Vd `[1,3,2,6,-1,4,1,8,2]`, `k=5`:

- Window đầu `[1,3,2,6,-1]` sum = 11 → avg 2.2.
- `r=5`: sum `11 + 4 − 1 = 14` → avg 2.8.
- `r=6`: sum `14 + 1 − 3 = 12` → avg 2.4.
- ... mỗi bước `O(1)`.

> ⚠ **Lỗi thường gặp.**
> - **Off-by-one chỉ số rơi ra.** Phần tử rơi ra khi `r` lọt vào là `nums[r−k]`, **không** phải `nums[r−k−1]` hay `nums[r−k+1]`. Kiểm chứng: khi `r=k`, window mới là `[1..k]`, phần rơi ra là `nums[0] = nums[k−k]` ✓.
> - **Quên warm-up.** Nếu vào thẳng vòng trượt từ `r=0` mà chưa cộng `k` phần tử đầu, công thức `nums[r−k]` truy cập chỉ số âm.

> 📝 **Tóm tắt §2.** Fixed window: warm-up `k` phần tử → trượt, mỗi bước cập nhật `O(1)` bằng `+nums[r] −nums[r−k]`. Tổng `O(n)`, bộ nhớ `O(1)`.

---

## 3. Variable window — kích thước co giãn theo điều kiện

Nhiều bài không cho sẵn `k` mà hỏi *"đoạn con DÀI NHẤT / NGẮN NHẤT thỏa điều kiện X"*. Khi đó cửa sổ **co giãn**.

> 💡 **Trực giác / Hình dung.** Tưởng tượng một con sâu đo: **đầu (`r`) bò tới** ăn thêm phần tử mới (mở rộng window). Nếu ăn quá no đến mức vi phạm điều kiện, **đuôi (`l`) co lại** nhả bớt phần tử ở mép trái cho tới khi hợp lệ trở lại. Cả hai đầu **chỉ tiến về phải, không bao giờ lùi** — đó là chìa khóa cho `O(n)`.

### 3.1 Pattern chung

```
l = 0
for r := 0; r < n; r++ {
    thêm nums[r] vào window
    while window VI PHẠM điều kiện {
        bỏ nums[l] khỏi window
        l++
    }
    // tại đây window [l..r] HỢP LỆ → cập nhật đáp án
}
```

### 3.2 Vì sao vẫn là `O(n)` dù có `while` lồng trong `for`?

> ❓ **Câu hỏi tự nhiên.** *"For trong while trông như `O(n²)` — sao lại `O(n)`?"*
>
> Vì `l` **chỉ tăng**, không bao giờ giảm. Trong toàn bộ chạy, `l` đi từ `0` tới `n` — tức tổng số lần thực thi thân `while` (trên TẤT CẢ các vòng `for`) tối đa là `n`. Cộng với `n` lần vòng `for` → tổng `2n` thao tác = `O(n)`. Đây chính là **amortized analysis** ([Lesson 02](../lesson-02-amortized-analysis/)): mỗi phần tử vào window 1 lần (`r++`) và ra khỏi window tối đa 1 lần (`l++`).

> 🔁 **Dừng lại tự kiểm tra.** Nếu thay `l++` bằng `l = 0` (reset về đầu mỗi lần shrink), độ phức tạp đổi thành gì?
> <details><summary>Đáp án</summary>
> Thành `O(n²)` (tệ hơn). Reset `l` phá vỡ tính chất "mỗi phần tử ra khỏi window ≤ 1 lần". Đây là lỗi phổ biến biến sliding window thành brute-force.
> </details>

---

## 4. Template chuẩn (Go generic)

Hầu hết bài variable-window rơi vào một trong hai dạng: **tối đa hóa** window hợp lệ, hoặc **tối thiểu hóa** window hợp lệ. Mẫu chung:

```go
// Template variable sliding window.
// add(r):   thêm phần tử nums[r] vào trạng thái window.
// shrink(): trả về true nếu window HIỆN TẠI vi phạm điều kiện (cần co lại).
// remove(l): bỏ phần tử nums[l] khỏi trạng thái window.
// update():  cập nhật đáp án từ window hợp lệ [l..r].
func slidingWindowTemplate(nums []int) int {
    best := 0
    l := 0
    for r := 0; r < len(nums); r++ {
        add(r) // mở rộng: đưa nums[r] vào window

        for shrink() { // co lại khi vi phạm
            remove(l)
            l++
        }

        // [l..r] hợp lệ → độ dài window là r - l + 1
        if r-l+1 > best {
            best = r - l + 1
        }
    }
    return best
}
```

- **Dạng "longest"**: shrink **chỉ khi** vi phạm; cập nhật `best` **sau** vòng shrink (window khi đó hợp lệ).
- **Dạng "shortest"**: shrink **liên tục khi vẫn hợp lệ**, và cập nhật `best` **bên trong** vòng shrink (vì ta muốn nén window nhỏ nhất còn hợp lệ — xem minimum window substring §5.2).

---

## 5. Bốn ví dụ kinh điển — walk-through chi tiết

### 5.1 Longest substring without repeating characters

> Cho chuỗi `s`, tìm độ dài đoạn con **liên tục dài nhất không có ký tự lặp**. Vd `s="abcabcbb"` → `"abc"` dài 3.

**Trạng thái window:** một map `last[char] = chỉ số xuất hiện gần nhất`. Khi `s[r]` đã có trong window (chỉ số ≥ `l`), nhảy `l` qua vị trí đó.

```go
// lengthOfLongestSubstring — đoạn con dài nhất không ký tự lặp.
// last[c] lưu chỉ số (0-based) lần cuối thấy ký tự c.
// Khi gặp lại c trong window hiện tại, dồn l qua last[c]+1.
// Độ phức tạp: O(n) thời gian, O(min(n, bảng chữ cái)) bộ nhớ.
func lengthOfLongestSubstring(s string) int {
    last := make(map[byte]int)
    best := 0
    l := 0
    for r := 0; r < len(s); r++ {
        c := s[r]
        if idx, ok := last[c]; ok && idx >= l {
            l = idx + 1 // nhảy l qua bản sao cũ → bỏ lặp
        }
        last[c] = r
        if r-l+1 > best {
            best = r - l + 1
        }
    }
    return best
}
```

**Walk-through** trên `s="abcabcbb"`:

| `r` | `s[r]` | `last` có sẵn? | `l` mới | window `[l..r]` | độ dài | best |
|----:|:------:|:--------------:|--------:|:----------------|-------:|-----:|
| 0 | a | không | 0 | `a` | 1 | 1 |
| 1 | b | không | 0 | `ab` | 2 | 2 |
| 2 | c | không | 0 | `abc` | 3 | **3** |
| 3 | a | `last[a]=0 ≥ l` | 1 | `bca` | 3 | 3 |
| 4 | b | `last[b]=1 ≥ l` | 2 | `cab` | 3 | 3 |
| 5 | c | `last[c]=2 ≥ l` | 3 | `abc` | 3 | 3 |
| 6 | b | `last[b]=4 ≥ l` | 5 | `cb` | 2 | 3 |
| 7 | b | `last[b]=6 ≥ l` | 7 | `b` | 1 | 3 |

Trả về **3** ✓.

> ⚠ **Lỗi thường gặp.** Điều kiện `idx >= l` **bắt buộc**. Nếu chỉ kiểm tra `ok` (ký tự từng xuất hiện) mà không kiểm tra nó còn **nằm trong window** không, `l` sẽ bị kéo ngược. Vd `"abba"`: tại `r=3` (`a`), `last[a]=0` nhưng `l` đã là 2; nếu không có `idx>=l`, ta sẽ đặt `l=1` (lùi lại) — SAI. Có điều kiện thì giữ nguyên `l=2`.

### 5.2 Minimum window substring

> Cho `s` và `t`, tìm đoạn con **NGẮN NHẤT của `s` chứa đủ tất cả ký tự của `t`** (kể cả số lần lặp). Vd `s="ADOBECODEBANC"`, `t="ABC"` → `"BANC"` (dài 4).

**Trạng thái:** map `need[c]` = số lần `c` còn thiếu; biến `missing` = tổng ký tự còn thiếu. Khi `missing==0`, window hợp lệ → cố **co trái** để nén nhỏ nhất.

```go
// minWindow — đoạn con ngắn nhất của s chứa đủ mọi ký tự (kèm bội) của t.
// need[c] có thể âm: nghĩa là window đang dư ký tự c.
// missing = tổng ký tự còn THIẾU; khi = 0 → window hợp lệ.
// Độ phức tạp: O(|s| + |t|) thời gian.
func minWindow(s, t string) string {
    if len(t) == 0 || len(s) < len(t) {
        return ""
    }
    need := make(map[byte]int)
    for i := 0; i < len(t); i++ {
        need[t[i]]++
    }
    missing := len(t)
    l, start, bestLen := 0, 0, len(s)+1
    for r := 0; r < len(s); r++ {
        if need[s[r]] > 0 { // s[r] là ký tự đang cần
            missing--
        }
        need[s[r]]-- // luôn giảm; có thể xuống âm (dư)
        // Window hợp lệ → co trái tối đa.
        for missing == 0 {
            if r-l+1 < bestLen {
                bestLen = r - l + 1
                start = l
            }
            need[s[l]]++         // nhả s[l] khỏi window
            if need[s[l]] > 0 {  // nhả ký tự cần thiết → lại thiếu
                missing++
            }
            l++
        }
    }
    if bestLen == len(s)+1 {
        return ""
    }
    return s[start : start+bestLen]
}
```

**Walk-through** trên `s="ADOBECODEBANC"`, `t="ABC"` (`need={A:1,B:1,C:1}`, `missing=3`):

- `r=0..5` mở rộng tới `"ADOBEC"`: gặp `A`(missing 2), `B`(missing 1), `C`(missing 0). Window `[0..5]="ADOBEC"` dài 6 hợp lệ → ghi `bestLen=6`.
- Co trái: nhả `A` (`s[0]`) → `need[A]=1>0` → `missing=1`, `l=1`. Hết hợp lệ, dừng co.
- Tiếp tục `r` tới 10 (`"ODEBA"` thêm vào), gặp `A` tại `r=10` → `missing=0`. Window `[1..10]="DOBECODEBA"` dài 10. Co trái nhả `D,O,B,E,C,O,D,E` cho tới khi nhả `B`(`s[9]`) lại thiếu → window nhỏ nhất lúc này `[9..10]?` thực ra `"EBA"`... bestLen vẫn 6 hay nhỏ hơn? Lần này không ghi vì > 6.
- `r=12` (`C`): window mở tới chứa lại `C`. Co trái nén tới `"BANC"` (`[9..12]`) dài 4 < 6 → `bestLen=4`, `start=9`.
- Trả về `s[9:13] = "BANC"` ✓.

> ❓ **Câu hỏi tự nhiên.** *"Vì sao `need[c]` được phép âm?"* — Âm nghĩa là window đang **dư** ký tự `c`. Khi co trái nhả một ký tự dư (`need` từ `−1` lên `0`), ta **không** tăng `missing` vì window vẫn còn đủ. Chỉ khi `need[s[l]]` vượt lên `> 0` (nhả mất ký tự cần) mới `missing++`.

### 5.3 Max sum subarray size k

Đã trình bày đầy đủ ở §2.1 (fixed window). Đây là đại diện cho nhóm fixed-window; ghép vào đây để bộ ví dụ kinh điển đủ 4 bài.

### 5.4 Longest subarray with sum ≤ target (số không âm)

> Cho mảng số **không âm** `nums` và `target`, tìm đoạn con liên tục **dài nhất** có tổng `≤ target`. Vd `nums=[3,1,2,7,4,2,1,1,5]`, `target=8` → `[2,1,1,5]`? Không — kiểm tra: §dưới.

```go
// longestSubarrayAtMost — đoạn con dài nhất có tổng ≤ target.
// CHỈ ĐÚNG khi mọi phần tử ≥ 0: lúc đó tổng tăng đơn điệu khi mở rộng,
// nên việc co trái để hạ tổng là hợp lệ (monotonic).
// Độ phức tạp: O(n).
func longestSubarrayAtMost(nums []int, target int) int {
    best, sum, l := 0, 0, 0
    for r := 0; r < len(nums); r++ {
        sum += nums[r]          // mở rộng
        for sum > target && l <= r { // vi phạm → co trái
            sum -= nums[l]
            l++
        }
        if r-l+1 > best {
            best = r - l + 1
        }
    }
    return best
}
```

**Walk-through** `nums=[3,1,2,7,4,2,1,1,5]`, `target=8`:

| `r` | `nums[r]` | sum sau add | shrink? | `l` | window | độ dài | best |
|----:|:---------:|------------:|:-------:|----:|:-------|-------:|-----:|
| 0 | 3 | 3 | không | 0 | `[3]` | 1 | 1 |
| 1 | 1 | 4 | không | 0 | `[3,1]` | 2 | 2 |
| 2 | 2 | 6 | không | 0 | `[3,1,2]` | 3 | 3 |
| 3 | 7 | 13 | bỏ 3→10, bỏ 1→9, bỏ 2→7 | 3 | `[7]` | 1 | 3 |
| 4 | 4 | 11 | bỏ 7→4 | 4 | `[4]` | 1 | 3 |
| 5 | 2 | 6 | không | 4 | `[4,2]` | 2 | 3 |
| 6 | 1 | 7 | không | 4 | `[4,2,1]` | 3 | 3 |
| 7 | 1 | 8 | không (8≤8) | 4 | `[4,2,1,1]` | 4 | **4** |
| 8 | 5 | 13 | bỏ 4→9, bỏ 2→7 | 6 | `[1,1,5]` | 3 | 4 |

Trả về **4** (`[4,2,1,1]`) ✓.

> ⚠ **Lỗi thường gặp — điều kiện không monotonic.** Kỹ thuật co-trái này **chỉ đúng với số không âm**. Nếu có số âm, mở rộng window **không** làm tổng tăng đơn điệu (thêm một số âm có thể GIẢM tổng), nên "co trái để hạ tổng" mất ý nghĩa. Bài "longest subarray sum ≤ k" với số âm phải dùng **prefix sum + cấu trúc dữ liệu** ([Lesson 15](../lesson-15-prefix-sum-difference/)), không phải sliding window.

> 📝 **Tóm tắt §5.** No-repeat: map vị trí cuối + nhảy `l`. Min window: `need` map + `missing`, co trái khi đủ. Sum ≤ target: co trái khi tràn (chỉ số không âm). Mọi bài đều `O(n)` nhờ `l` chỉ tiến.

---

## 6. Khi nào dùng sliding window?

Sliding window áp dụng được khi **CẢ HAI** điều sau đúng:

1. **Đối tượng là đoạn con LIÊN TỤC** (contiguous subarray/substring). Không liên tục (subsequence, tập con) → không dùng được; cần DP hoặc kỹ thuật khác.
2. **Điều kiện monotonic theo kích thước window**: mở rộng window làm điều kiện "khó thỏa hơn" theo một chiều, thu nhỏ làm "dễ thỏa hơn". Cụ thể:
   - Tổng của số **không âm** tăng khi mở rộng → monotonic ✓.
   - Số ký tự phân biệt tăng (hoặc không đổi) khi mở rộng → monotonic ✓.
   - Tổng có số **âm** → KHÔNG monotonic ✗.

> ❓ **Câu hỏi tự nhiên.** *"Làm sao biết một bài có monotonic không?"* — Tự hỏi: *"Nếu window `[l..r]` hợp lệ, thì window con `[l..r−1]` có chắc chắn hợp lệ không (với bài 'tối đa')?"* Nếu có → monotonic, dùng được. Vd "no-repeat": bỏ ký tự cuối không thể tạo ra lặp mới → con của hợp lệ vẫn hợp lệ ✓.

**Từ khóa nhận diện đề bài:** *"subarray/substring liên tục dài nhất/ngắn nhất thỏa..."*, *"đúng `k` phần tử..."*, *"tối đa `k` loại khác nhau..."*, *"tổng/độ dài/số loại..."* trên đoạn liền kề.

---

## 7. Sliding window vs Two pointers

> 💡 **Trực giác.** Sliding window **chính là** two pointers ở dạng **hai con trỏ cùng chiều** (`l` và `r` đều chỉ tiến về phải), trong đó vùng `[l, r]` luôn là một "cửa sổ" liền mạch. Two pointers tổng quát hơn — bao gồm cả hai con trỏ **ngược chiều** (vd two-sum trên mảng đã sort: `l` từ đầu, `r` từ cuối, tiến lại gần nhau).

| | Two pointers (ngược chiều) | Sliding window (cùng chiều) |
|---|---|---|
| Hướng di chuyển | `l→`, `←r`, gặp nhau | `l→`, `r→`, `l ≤ r` |
| Vùng quan tâm | thường là **cặp** `(l, r)` | **đoạn con liên tục** `[l..r]` |
| Ví dụ | two-sum sorted, reverse, palindrome | longest no-repeat, min window |
| Bất biến | `nums[l]+nums[r]` so target | window `[l..r]` thỏa/vi phạm điều kiện |

Cả hai cùng đạt `O(n)` nhờ mỗi con trỏ duyệt mảng **một lần**. Xem chi tiết two-pointer ở [Lesson 13](../lesson-13-two-pointers/).

---

## 8. Sliding window maximum — deque đơn điệu

> Cho mảng `nums` và `k`, trả về **giá trị lớn nhất của mỗi window độ dài `k`** khi trượt từ trái sang phải. Vd `nums=[1,3,-1,-3,5,3,6,7]`, `k=3` → `[3,3,5,5,6,7]`.

### 8.1 Vì sao fixed-window-sum không áp dụng được

Với tổng, ta trừ phần rơi ra. Nhưng với **max**, khi phần tử lớn nhất rơi ra khỏi window, ta **không biết** max mới là bao nhiêu nếu chỉ giữ một con số — phải biết phần tử lớn thứ hai, thứ ba... Cần một **cấu trúc** lưu ứng viên.

### 8.2 Ý tưởng deque đơn điệu (monotonic deque)

> 💡 **Trực giác.** Giữ một hàng đợi hai đầu (deque) chứa **chỉ số** các phần tử, sao cho **giá trị giảm dần từ đầu (front) tới cuối (back)**. Front luôn là **max của window hiện tại**.
>
> Khi thêm `nums[r]`: phần tử nào ở back **nhỏ hơn hoặc bằng** `nums[r]` thì **bỏ đi** — chúng không bao giờ còn cơ hội làm max nữa vì `nums[r]` vừa mới, vừa lớn hơn. Khi front **trôi ra ngoài** window (`< l`), bỏ front.

```go
// maxSlidingWindow — max của mỗi window độ dài k.
// dq chứa CHỈ SỐ, giá trị nums[dq[i]] giảm dần từ front tới back.
// Mỗi chỉ số vào dq 1 lần, ra tối đa 1 lần → O(n) amortized.
func maxSlidingWindow(nums []int, k int) []int {
    if k <= 0 || len(nums) == 0 {
        return nil
    }
    dq := make([]int, 0, len(nums)) // lưu chỉ số
    res := make([]int, 0, len(nums)-k+1)
    for r := 0; r < len(nums); r++ {
        // 1) Bỏ các back nhỏ hơn/bằng nums[r] — chúng vô dụng.
        for len(dq) > 0 && nums[dq[len(dq)-1]] <= nums[r] {
            dq = dq[:len(dq)-1]
        }
        dq = append(dq, r)
        // 2) Bỏ front nếu đã trôi ra ngoài window [r-k+1 .. r].
        if dq[0] <= r-k {
            dq = dq[1:]
        }
        // 3) Khi window đủ rộng (r ≥ k-1), front là max.
        if r >= k-1 {
            res = append(res, nums[dq[0]])
        }
    }
    return res
}
```

**Walk-through** `nums=[1,3,-1,-3,5,3,6,7]`, `k=3` (deque lưu chỉ số, dưới hiển thị **giá trị**):

| `r` | `nums[r]` | thao tác | deque (giá trị) | output |
|----:|:---------:|:---------|:----------------|:-------|
| 0 | 1 | push | `[1]` | — |
| 1 | 3 | bỏ 1≤3, push | `[3]` | — |
| 2 | -1 | push | `[3,-1]` | max=**3** |
| 3 | -3 | push | `[3,-1,-3]`; front idx0 ≤ 3−3=0 → bỏ | `[-1,-3]` | max=**3** |
| 4 | 5 | bỏ -3≤5, bỏ -1≤5, push | `[5]` | max=**5** |
| 5 | 3 | push | `[5,3]` | max=**5** |
| 6 | 6 | bỏ 3≤6, bỏ 5≤6, push | `[6]` | max=**6** |
| 7 | 7 | bỏ 6≤7, push | `[7]` | max=**7** |

Output `[3,3,5,5,6,7]` ✓.

> ❓ **Câu hỏi tự nhiên.** *"Sao lại `O(n)` khi có `for` lồng `for`?"* — Mỗi chỉ số được `append` vào `dq` đúng **một lần** và bị xóa khỏi `dq` tối đa **một lần**. Tổng số thao tác push+pop ≤ `2n` → `O(n)` amortized (lại là [Lesson 02](../lesson-02-amortized-analysis/)).

> ⚠ **Lỗi thường gặp.** Lưu **giá trị** thay vì **chỉ số** trong deque → không biết phần tử front đã trôi ra ngoài window chưa (bước 2 cần so chỉ số với `r-k`). Luôn lưu chỉ số.

**Thêm ví dụ số** cho deque maximum:

- `nums=[5,4,3,2,1]` (giảm dần), `k=2`: deque không bao giờ pop back (mỗi số mới nhỏ hơn) → deque tích lũy rồi bỏ front hết hạn. Output `[5,4,3,2]`.
- `nums=[1,2,3,4,5]` (tăng dần), `k=2`: mỗi số mới lớn hơn → pop hết back, deque luôn 1 phần tử. Output `[2,3,4,5]`.
- `nums=[2,2,2,2]`, `k=3`: dùng `<=` khi pop nên các `2` bằng nhau bị bỏ → output `[2,2]`.
- `nums=[7,2,4]`, `k=2`: r0 push 7; r1 push (2<7) deque `[7,2]` → max 7; r2 pop 2(≤4) push 4, bỏ front 7 (idx0 ≤ 2−2=0) → deque `[4]` → max 4. Output `[7,4]`.

### 8.3 Biến thể: sliding window minimum

Đối xứng hoàn toàn: giữ deque **tăng dần** (front = min), khi push bỏ các back **lớn hơn hoặc bằng** giá trị mới. Đổi đúng một dấu so sánh `<=` thành `>=` trong code §8.2. Vd `nums=[1,3,-1,-3,5,3,6,7]`, `k=3` → min mỗi window `[-1,-3,-3,-3,3,3]`.

> 📝 **Tóm tắt §8.** Sliding window maximum dùng **deque đơn điệu giảm dần**: front = max. Push bỏ back nhỏ hơn, bỏ front trôi ra ngoài. `O(n)` thời gian, `O(k)` bộ nhớ. Min đối xứng (đảo dấu so sánh).

---

## 9. Tổng kết độ phức tạp

| Bài toán | Kỹ thuật | Thời gian | Bộ nhớ |
|----------|----------|:---------:|:------:|
| Max sum size `k` (§2.1) | fixed window, biến `sum` | `O(n)` | `O(1)` |
| Average size `k` (§2.2) | fixed window | `O(n)` | `O(n)` (lưu kết quả) |
| Longest no-repeat (§5.1) | variable + map vị trí | `O(n)` | `O(min(n,Σ))` |
| Minimum window substring (§5.2) | variable + `need`/`missing` | `O(|s|+|t|)` | `O(|t|)` |
| Longest sum ≤ target, ≥0 (§5.4) | variable + biến `sum` | `O(n)` | `O(1)` |
| Fruit baskets ≤2 loại (Bài 5) | variable + map `count` | `O(n)` | `O(1)` (map ≤3) |
| Sliding window maximum (§8) | deque đơn điệu | `O(n)` | `O(k)` |
| Longest sum = `k`, có âm (Bài 4) | **prefix sum + hash** (KHÔNG sliding window) | `O(n)` | `O(n)` |

Điểm chung của mọi biến thể sliding window: mỗi phần tử **vào** vùng làm việc 1 lần và **ra** tối đa 1 lần → tổng `O(n)` amortized, bất kể trông như có vòng lặp lồng nhau.

---

## 10. Cạm bẫy thường gặp (tổng hợp)

| # | Cạm bẫy | Hậu quả | Cách tránh |
|---|---------|---------|-----------|
| 1 | **Quên shrink** (chỉ mở rộng `r`, không co `l`) | Window phình to mãi, sai đáp án | Luôn có vòng `while` shrink khi vi phạm |
| 2 | **Điều kiện shrink sai** (vd dùng `if` thay `while`) | Co không đủ → window còn vi phạm | Dùng `for/while` để co tới khi hợp lệ |
| 3 | **Window không monotonic** (tổng có số âm) | Co trái không hạ được điều kiện | Nhận diện ở §6; chuyển sang prefix sum (L15) |
| 4 | **Off-by-one kích thước window** | Lệch 1 phần tử | Độ dài = `r − l + 1`; phần rơi ra fixed = `nums[r−k]` |
| 5 | **Reset `l` về 0 khi shrink** | `O(n²)` thay vì `O(n)` | `l` chỉ `++`, không bao giờ lùi/reset |
| 6 | **Cập nhật `best` sai chỗ** | "longest" cập nhật trong shrink, "shortest" cập nhật ngoài → sai | longest: ngoài vòng shrink; shortest: trong vòng shrink |
| 7 | **Deque lưu giá trị thay vì chỉ số** | Không biết front đã hết hạn | Lưu chỉ số, so `dq[0] <= r-k` |

> 🔁 **Dừng lại tự kiểm tra.** Trong bài "longest no-repeat", nên cập nhật `best` ở đâu — trước hay sau khi nhảy `l`?
> <details><summary>Đáp án</summary>
> **Sau** khi đã điều chỉnh `l` (cập nhật trên window đã hợp lệ `[l..r]`). Nếu cập nhật trước, độ dài tính trên window còn chứa ký tự lặp → sai.
> </details>

---

## Bài tập

> Làm trước khi xem lời giải. Mỗi bài ghi rõ độ phức tạp mục tiêu.

1. **Max sum size k.** Cho `nums=[2,3,4,1,5]`, `k=2`. Tìm tổng lớn nhất của đoạn con liên tục dài 2. Mục tiêu `O(n)`.
2. **Longest substring no repeat.** Cho `s="pwwkew"`. Tìm độ dài đoạn con không lặp dài nhất. `O(n)`.
3. **Minimum window substring.** Cho `s="a"`, `t="aa"`. Trả về đoạn con ngắn nhất của `s` chứa đủ `t`. `O(|s|+|t|)`.
4. **Longest subarray sum = k (số nguyên, có âm).** Cho `nums=[1,-1,5,-2,3]`, `k=3`. Tìm đoạn con liên tục **dài nhất** có tổng **đúng bằng** `k`. (Gợi ý: vì sao sliding window **không** dùng được? Dùng prefix sum + hash.) `O(n)`.
5. **Fruit into baskets.** Cho mảng loại cây `fruits` (mỗi số là một loại), hái liên tục nhưng giỏ chỉ chứa **tối đa 2 loại**. Tìm số cây hái được nhiều nhất = đoạn con dài nhất có ≤ 2 loại khác nhau. Vd `[1,2,1,2,3,2,2]` → 4 (`[2,1,2,...]`? kiểm tra). `O(n)`.
6. **Sliding window maximum.** Cho `nums=[9,11,8,5,7,10]`, `k=3`. Trả về max mỗi window. `O(n)` dùng deque.

---

## Lời giải chi tiết

### Bài 1 — Max sum size k

**Cách tiếp cận:** fixed window §2.1.

```go
func solve1() int { return maxSumK([]int{2, 3, 4, 1, 5}, 2) }
```

**Walk-through:** warm-up `2+3=5`, best 5. `r=2`: `5+4−2=7`, best 7. `r=3`: `7+1−3=5`. `r=4`: `5+5−4=6`. Đáp án **7** (`[3,4]`). **Big-O:** `O(n)` thời gian, `O(1)` bộ nhớ.

### Bài 2 — Longest substring no repeat

**Cách tiếp cận:** §5.1 (map vị trí cuối + nhảy `l`).

**Walk-through** `s="pwwkew"`:

| `r` | char | `l` | window | best |
|----:|:----:|----:|:-------|-----:|
| 0 | p | 0 | `p` | 1 |
| 1 | w | 0 | `pw` | 2 |
| 2 | w | 2 (`last[w]=1≥0`→l=2) | `w` | 2 |
| 3 | k | 2 | `wk` | 2 |
| 4 | e | 2 | `wke` | 3 |
| 5 | w | 3 (`last[w]=2≥2`→l=3) | `kew` | 3 |

Đáp án **3** (`"wke"` hoặc `"kew"`). **Big-O:** `O(n)`.

### Bài 3 — Minimum window substring (`s="a"`, `t="aa"`)

**Cách tiếp cận:** §5.2. `need={a:2}`, `missing=2`.

**Walk-through:** `r=0` (`a`): `need[a]=2>0`→`missing=1`, `need[a]=1`. Vòng `for missing==0` không vào (missing=1). Hết mảng. `bestLen` vẫn `len(s)+1=2` → trả về `""`. 

Lý do: `s` chỉ có một `a`, không đủ hai `a` mà `t` cần. **Đáp án `""`** ✓. **Big-O:** `O(|s|+|t|)`.

### Bài 4 — Longest subarray sum = k (có số âm) → prefix sum + hash

**Vì sao KHÔNG dùng sliding window?** Có số âm → tổng **không** đơn điệu khi mở rộng window. Co trái không đảm bảo hạ tổng về đúng `k`. Đây là cạm bẫy #3.

**Cách tiếp cận đúng:** dùng **prefix sum**. Đặt `P[i] = nums[0]+...+nums[i-1]` (`P[0]=0`). Tổng đoạn `[l..r] = P[r+1] − P[l]`. Ta cần `P[r+1] − P[l] = k`, tức `P[l] = P[r+1] − k`. Với mỗi `r`, tra map xem prefix `P[r+1]−k` đã xuất hiện ở chỉ số **nhỏ nhất** nào → đoạn dài nhất.

```go
// longestSubarrayEqualK — đoạn con dài nhất tổng = k (cho phép số âm).
// first[p] = chỉ số ĐẦU TIÊN mà prefix sum bằng p (để window dài nhất).
// Độ phức tạp: O(n) thời gian, O(n) bộ nhớ.
func longestSubarrayEqualK(nums []int, k int) int {
    first := map[int]int{0: -1} // prefix 0 "trước" chỉ số 0
    prefix, best := 0, 0
    for i, v := range nums {
        prefix += v
        if j, ok := first[prefix-k]; ok {
            if i-j > best {
                best = i - j
            }
        }
        if _, ok := first[prefix]; !ok {
            first[prefix] = i // chỉ lưu lần đầu → đoạn dài nhất
        }
    }
    return best
}
```

**Walk-through** `nums=[1,-1,5,-2,3]`, `k=3`. Prefix theo `i`: 

- `first={0:-1}`.
- `i=0` v=1: prefix=1. tìm `1−3=−2`? chưa. lưu `first[1]=0`.
- `i=1` v=-1: prefix=0. tìm `0−3=−3`? chưa. `first[0]` đã có (=-1), không ghi đè.
- `i=2` v=5: prefix=5. tìm `5−3=2`? chưa. lưu `first[5]=2`.
- `i=3` v=-2: prefix=3. tìm `3−3=0`? có, `first[0]=−1` → độ dài `3−(−1)=4`. best=**4**. lưu `first[3]=3`.
- `i=4` v=3: prefix=6. tìm `6−3=3`? có, `first[3]=3` → độ dài `4−3=1`. best vẫn 4. lưu `first[6]=4`.

Đáp án **4** (đoạn `[1,-1,5,-2]` tổng `=3`) ✓. **Big-O:** `O(n)` thời gian, `O(n)` bộ nhớ. Sẽ học kỹ prefix sum ở [Lesson 15](../lesson-15-prefix-sum-difference/).

### Bài 5 — Fruit into baskets (≤ 2 loại)

**Cách tiếp cận:** variable window §4, dạng "longest". Trạng thái: map `count[loại]`. Vi phạm khi `len(count) > 2` → co trái.

```go
// totalFruit — đoạn con dài nhất có ≤ 2 loại giá trị khác nhau.
// count[v] = số lần loại v xuất hiện trong window; xóa khỏi map khi về 0.
// Độ phức tạp: O(n).
func totalFruit(fruits []int) int {
    count := make(map[int]int)
    best, l := 0, 0
    for r := 0; r < len(fruits); r++ {
        count[fruits[r]]++
        for len(count) > 2 { // > 2 loại → co trái
            count[fruits[l]]--
            if count[fruits[l]] == 0 {
                delete(count, fruits[l])
            }
            l++
        }
        if r-l+1 > best {
            best = r - l + 1
        }
    }
    return best
}
```

**Walk-through** `fruits=[1,2,1,2,3,2,2]`:

| `r` | val | count | shrink | `l` | window | best |
|----:|:---:|:------|:-------|----:|:-------|-----:|
| 0 | 1 | `{1:1}` | — | 0 | `[1]` | 1 |
| 1 | 2 | `{1:1,2:1}` | — | 0 | `[1,2]` | 2 |
| 2 | 1 | `{1:2,2:1}` | — | 0 | `[1,2,1]` | 3 |
| 3 | 2 | `{1:2,2:2}` | — | 0 | `[1,2,1,2]` | **4** |
| 4 | 3 | `{1:2,2:2,3:1}` | 3 loại → bỏ `1`(l0,l1→count1:0 del), l=2 | 2 | `[1,2,3]`→ thực `{2:1,3:1}` sau bỏ tới l=4? | — |

Khi `r=4`: count có 3 loại `{1,2,3}`. Co trái: bỏ `fruits[0]=1`→`{1:1,2:2,3:1}` vẫn 3 loại; bỏ `fruits[1]=2`→`{1:1,2:1,3:1}` 3 loại; bỏ `fruits[2]=1`→`{1:0 del,2:1,3:1}`=`{2:1,3:1}` 2 loại, `l=3`. Window `[3..4]=[2,3]` dài 2. best vẫn 4.

Tiếp `r=5,6` (`2,2`): count `{2:3,3:1}` rồi `{2:4,3:1}`? — không, sau l=3 window từ idx3: `[2,3,2,2]` → count `{2:3,3:1}` 2 loại, dài 4. best = max(4,4)=4. 

Đáp án **4**. **Big-O:** `O(n)` (map ≤ 3 phần tử nên thao tác `O(1)`).

### Bài 6 — Sliding window maximum (deque)

**Cách tiếp cận:** §8.2, deque đơn điệu.

**Walk-through** `nums=[9,11,8,5,7,10]`, `k=3`:

| `r` | val | thao tác | deque (giá trị) | output |
|----:|:---:|:---------|:----------------|:-------|
| 0 | 9 | push | `[9]` | — |
| 1 | 11 | bỏ 9≤11, push | `[11]` | — |
| 2 | 8 | push | `[11,8]` | **11** |
| 3 | 5 | push; front idx1 ≤ 3−3=0? không | `[11,8,5]` | **11** |
| 4 | 7 | bỏ 5≤7, push; front idx1 ≤ 1? không | `[11,8,7]` | **11** |
| 5 | 10 | bỏ 7≤10, bỏ 8≤10, push; front idx1 ≤ 2? **có** → bỏ 11 | `[10]` | **10** |

Output `[11,11,11,10]` ✓. **Big-O:** `O(n)` thời gian, `O(k)` bộ nhớ.

---

## Code & Minh họa

- **Minh họa tương tác:** [visualization.html](./visualization.html) — 3 module: (1) fixed window trượt với tổng tái dùng; (2) variable window longest-no-repeat animate expand/shrink; (3) sliding window maximum với deque đơn điệu.
- Toàn bộ code Go ở trên **inline** trong README (không có `solutions.go` riêng theo quy ước Tier 2).

## Bài tiếp theo

- **[Lesson 15 — Prefix Sum & Difference Array](../lesson-15-prefix-sum-difference/)**: kỹ thuật bổ trợ cho sliding window khi điều kiện **không monotonic** (vd tổng có số âm — Bài 4). Prefix sum cho phép tính tổng đoạn bất kỳ `O(1)` sau tiền xử lý `O(n)`.
- Ôn lại **[Lesson 13 — Two Pointers](../lesson-13-two-pointers/)** để thấy sliding window là trường hợp đặc biệt (hai con trỏ cùng chiều).
