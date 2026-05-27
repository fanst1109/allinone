# Lesson 16 — Hashing Techniques (Kỹ thuật dùng hash để giải thuật toán)

> **Tier 2 — Searching Core.** Bài này KHÔNG dạy lại *cách xây* một hash table (bảng băm) —
> phần đó thuộc về cấu trúc dữ liệu, xem [DataStructures](../../DataStructures/). Ở đây ta coi
> `map`/`set` của Go là **hộp đen O(1)** và tập trung vào **các kỹ thuật (techniques)** dùng nó để
> biến những bài toán O(n²) thành O(n).

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Nhận ra **dấu hiệu** một bài toán nên dùng hash: cần *đếm*, *tra cứu tồn tại*, *gom nhóm*, hay *nhớ đã thấy*.
- Thành thạo 8 kỹ thuật cốt lõi: frequency counting, membership lookup, grouping, seen/visited, prefix+hash, index mapping, sliding window + hash, rolling hash.
- Biết **đánh đổi (trade-off)**: hash đổi **bộ nhớ (space)** O(n) lấy **thời gian (time)** — từ O(n²) xuống O(n).
- Tránh được các cạm bẫy đặc thù của Go: thứ tự duyệt map ngẫu nhiên, key phải `comparable`, không dùng slice làm key.

## Kiến thức tiền đề

- [Lesson 01 — Big-O & Asymptotic](../lesson-01-bigo-asymptotic/) — để hiểu "O(1) average", "O(n)".
- [Lesson 13 — Two Pointers](../lesson-13-two-pointers/) — một kỹ thuật thay thế hash trên mảng đã sắp xếp.
- [Lesson 14 — Sliding Window](../lesson-14-sliding-window/) — mục 8 kết hợp window + hash.
- [Lesson 15 — Prefix Sum & Difference](../lesson-15-prefix-sum-difference/) — mục 6 kết hợp prefix + hash.
- Cấu trúc bảng băm (collision, load factor, resize): [DataStructures — Hash Table](../../DataStructures/).

---

## 1. Recap nhanh — hash map là gì (ở mức "hộp đen")

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng một **tủ gửi đồ ở siêu thị** có công thức biến
> *mã thẻ → số ô tủ*. Khi bạn đưa mã thẻ, nhân viên **không** dò từng ô một (đó là O(n)); họ tính
> ngay ra số ô và đi thẳng tới đó (đó là O(1)). Hash map làm đúng điều này: có một **hàm băm (hash
> function)** biến `key` thành chỉ số mảng, nên *đặt vào* và *lấy ra* gần như tức thời, bất kể trong
> tủ có 10 món hay 10 triệu món.

Ta chỉ cần nhớ **hợp đồng (contract)** sau, KHÔNG cần biết bên trong:

| Thao tác | Code Go | Chi phí trung bình | Chi phí xấu nhất |
|----------|---------|:---:|:---:|
| Thêm / cập nhật | `m[k] = v` | O(1) | O(n) (collision dồn) |
| Tra cứu | `v, ok := m[k]` | O(1) | O(n) |
| Xóa | `delete(m, k)` | O(1) | O(n) |
| Kiểm tra tồn tại | `_, ok := m[k]` | O(1) | O(n) |
| Số phần tử | `len(m)` | O(1) | O(1) |

**"Xấu nhất O(n)"** chỉ xảy ra khi mọi key đụng độ (collision) vào cùng một bucket — cực hiếm với hàm
băm tốt như của Go runtime. Trong phân tích thuật toán ta dùng **trung bình O(1)** (xem chi tiết lý do
ở [DataStructures](../../DataStructures/)).

> ⚠ **Lỗi thường gặp.** Đừng nhầm "O(1) average" với "miễn phí". Mỗi thao tác hash vẫn phải *tính
> hàm băm* trên key. Với key là chuỗi dài 1000 ký tự, tính hash tốn O(1000) = O(độ dài key). Khi nói
> "O(1)" ta ngầm hiểu *với key có kích thước hằng* (số nguyên, chuỗi ngắn).

`set` (tập hợp) trong Go: Go không có kiểu `set` riêng, ta dùng `map[T]bool` hoặc `map[T]struct{}`
(tiết kiệm hơn vì `struct{}` chiếm 0 byte):

```go
seen := make(map[int]struct{})
seen[42] = struct{}{}              // thêm 42 vào tập
_, exists := seen[42]              // exists == true
```

> 📝 **Tóm tắt mục 1.** Coi `map`/`set` là hộp đen tra cứu O(1) trung bình. Bài này không xây hash
> table mà *dùng* nó như công cụ. Mọi kỹ thuật bên dưới đều xoay quanh 1 ý: **thay vì duyệt lại để
> tìm, hãy ghi nhớ vào map để tra ngay.**

---

## 2. Kỹ thuật 1 — Frequency Counting (đếm tần suất)

> 💡 **Trực giác.** Bạn phát cho mỗi loại đồ một cái *thùng đếm*. Mỗi lần gặp một món, bạn +1 vào
> đúng thùng của nó. Cuối cùng nhìn các thùng là biết loại nào nhiều/ít — chỉ duyệt **một lần** qua
> dữ liệu.

Đây là kỹ thuật dùng nhiều nhất: `map[phần tử] → số lần xuất hiện`.

```go
// CountFreq trả về map đếm số lần xuất hiện của mỗi phần tử.
// Độ phức tạp: O(n) thời gian, O(k) bộ nhớ (k = số phần tử phân biệt).
func CountFreq(nums []int) map[int]int {
    freq := make(map[int]int)
    for _, x := range nums {
        freq[x]++ // Go tự khởi tạo 0 nếu key chưa có, rồi +1
    }
    return freq
}
```

**Walk-through** với `nums = [2, 3, 2, 5, 3, 2]`:

| Bước | Đọc `x` | `freq` sau bước |
|:---:|:---:|---|
| 0 | (khởi tạo) | `{}` |
| 1 | 2 | `{2:1}` |
| 2 | 3 | `{2:1, 3:1}` |
| 3 | 2 | `{2:2, 3:1}` |
| 4 | 5 | `{2:2, 3:1, 5:1}` |
| 5 | 3 | `{2:2, 3:2, 5:1}` |
| 6 | 2 | `{2:3, 3:2, 5:1}` |

Kết quả: 2 xuất hiện 3 lần, 3 xuất hiện 2 lần, 5 một lần. Tổng cộng duyệt 6 phần tử → **O(n)**.

### 2.1 Ứng dụng: kiểm tra Anagram

Hai chuỗi là **anagram** (đảo chữ) nếu cùng tập chữ cái với cùng số lượng (vd `"listen"` ↔ `"silent"`).
Cách ngây thơ: sắp xếp cả hai rồi so sánh → O(n log n). Cách hash → O(n):

```go
// IsAnagram: true nếu s và t là đảo chữ của nhau.
// Ý tưởng: đếm tần suất của s (+1), rồi trừ đi theo t (-1).
// Nếu khớp hoàn toàn, mọi count phải về 0.
func IsAnagram(s, t string) bool {
    if len(s) != len(t) {
        return false
    }
    freq := make(map[rune]int)
    for _, c := range s {
        freq[c]++
    }
    for _, c := range t {
        freq[c]--
        if freq[c] < 0 { // t có ký tự s không có (đủ số lượng)
            return false
        }
    }
    return true // độ dài bằng nhau + không âm ⇒ mọi count = 0
}
```

**Walk-through** `s="aab"`, `t="aba"`: sau khi đếm `s` → `{a:2, b:1}`. Trừ theo `t`: `'a'`→`{a:1,b:1}`,
`'b'`→`{a:1,b:0}`, `'a'`→`{a:0,b:0}`. Không có count âm, độ dài bằng → **true**.

### 2.2 Ứng dụng: Majority Element (phần tử chiếm đa số > n/2)

Đếm tần suất, phần tử nào > n/2 là đáp án. O(n) time, O(n) space:

```go
func MajorityElement(nums []int) int {
    freq := make(map[int]int)
    for _, x := range nums {
        freq[x]++
        if freq[x] > len(nums)/2 {
            return x // dừng sớm ngay khi vượt ngưỡng
        }
    }
    return -1 // không có
}
```

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Đếm bằng map có chậm hơn dùng mảng `count[256]` cho chữ cái ASCII không?"* — Mảng cố định nhanh
>   hơn (truy cập index trực tiếp, không hash) và là lựa chọn TỐT khi miền key nhỏ & biết trước (vd 26
>   chữ thường, 256 byte). Map linh hoạt hơn khi key là số nguyên lớn / chuỗi / không biết trước miền.
> - *"Tại sao Majority có thể dừng sớm?"* — Một khi một phần tử vượt n/2, không phần tử nào khác đạt
>   được nữa (tổng chỉ có n). Đây là tối ưu nhỏ, độ phức tạp vẫn O(n) xấu nhất.

> 🔁 **Dừng lại tự kiểm tra.** Cho `nums = [1,1,2,1,3]`, `IsAnagram("rat","car")` trả về gì? Tần suất `1`?
> <details><summary>Đáp án</summary>
> `freq = {1:3, 2:1, 3:1}`, tần suất của `1` là 3. `IsAnagram("rat","car")` → đếm `rat`={r:1,a:1,t:1},
> trừ `car`: `'c'` chưa có → `{...,c:-1}` < 0 → **false**.
> </details>

> 📝 **Tóm tắt mục 2.** Frequency counting = một vòng lặp, `freq[x]++`. Dùng cho anagram, majority,
> top-k, first-unique. O(n) time, O(k) space. Nếu miền key nhỏ & cố định → cân nhắc mảng đếm thay map.

---

## 3. Kỹ thuật 2 — Lookup / Membership (tra cứu tồn tại O(1))

> 💡 **Trực giác.** Bạn có một danh sách khách VIP. Mỗi khi một người tới, bạn cần biết *"có trong
> danh sách không?"* tức thì. Thay vì dò cả danh sách (O(n) mỗi lần), bạn nạp toàn bộ vào một
> **set**; mỗi lần kiểm tra chỉ tốn O(1).

### 3.1 Two-Sum — kỹ thuật "complement lookup"

Bài toán: cho mảng `nums` và `target`, có hai phần tử cộng lại bằng `target` không?

- **Ngây thơ:** thử mọi cặp `(i, j)` → **O(n²)**.
- **Hash:** với mỗi `x`, ta cần tìm **phần bù (complement)** `target - x`. Nếu phần bù *đã từng thấy*,
  ta có cặp. Lưu các giá trị đã thấy vào set → mỗi lần tra O(1) → tổng **O(n)**.

```go
// HasTwoSum: true nếu tồn tại hai phần tử cộng = target.
// Kỹ thuật: với mỗi x, tra "phần bù" target-x trong tập đã thấy.
// O(n) time, O(n) space.
func HasTwoSum(nums []int, target int) bool {
    seen := make(map[int]struct{})
    for _, x := range nums {
        need := target - x
        if _, ok := seen[need]; ok {
            return true // đã thấy phần bù ⇒ tìm được cặp
        }
        seen[x] = struct{}{} // ghi nhớ x cho các phần tử sau
    }
    return false
}
```

**Walk-through** `nums = [2, 7, 11, 15]`, `target = 9`:

| Bước | `x` | `need = 9-x` | `need` ∈ `seen`? | Hành động | `seen` sau |
|:---:|:---:|:---:|:---:|---|---|
| 1 | 2 | 7 | không (`{}`) | thêm 2 | `{2}` |
| 2 | 7 | 2 | **có!** | trả `true` | — |

Chỉ duyệt 2 phần tử là tìm ra (2 + 7 = 9). So với ngây thơ phải thử (2,7),(2,11),(2,15)...

> ⚠ **Lỗi thường gặp.** Phải **tra phần bù TRƯỚC, rồi mới thêm `x`**. Nếu thêm trước rồi tra, với
> `target = 2x` (ví dụ `x=3, target=6`) bạn sẽ tự khớp với chính mình và trả `true` sai (trừ khi đề bài
> cho phép dùng một phần tử hai lần). Thứ tự "tra → thêm" đảm bảo chỉ ghép với phần tử *khác vị trí*.

### 3.2 Contains Duplicate

```go
// ContainsDuplicate: true nếu có phần tử lặp.
// O(n) time, O(n) space. (So với sort+quét O(n log n) time, O(1) space.)
func ContainsDuplicate(nums []int) bool {
    seen := make(map[int]struct{})
    for _, x := range nums {
        if _, ok := seen[x]; ok {
            return true
        }
        seen[x] = struct{}{}
    }
    return false
}
```

### 3.3 Longest Consecutive Sequence — set "tra biên"

Bài toán: cho mảng (không sắp xếp), tìm độ dài dãy số **liên tiếp** dài nhất (vd `[100,4,200,1,3,2]`
→ `[1,2,3,4]` → độ dài 4). Sắp xếp được O(n log n), nhưng có cách O(n) bằng set.

> 💡 **Trực giác.** Mỗi dãy liên tiếp có một **điểm bắt đầu** duy nhất — số `x` mà `x-1` KHÔNG có trong
> tập. Ta chỉ "đếm xuôi" từ những điểm bắt đầu này. Nhờ vậy mỗi số được duyệt tối đa 2 lần ⇒ O(n).

```go
// LongestConsecutive: độ dài dãy số nguyên liên tiếp dài nhất.
// O(n) time, O(n) space.
func LongestConsecutive(nums []int) int {
    set := make(map[int]struct{}, len(nums))
    for _, x := range nums {
        set[x] = struct{}{}
    }
    best := 0
    for x := range set {
        if _, hasPrev := set[x-1]; hasPrev {
            continue // x KHÔNG phải điểm bắt đầu ⇒ bỏ qua, sẽ được đếm từ đầu dãy
        }
        // x là điểm bắt đầu một dãy: đếm xuôi x, x+1, x+2, ...
        length := 1
        for cur := x + 1; ; cur++ {
            if _, ok := set[cur]; !ok {
                break
            }
            length++
        }
        if length > best {
            best = length
        }
    }
    return best
}
```

**Walk-through** `[100, 4, 200, 1, 3, 2]` → set `{100,4,200,1,3,2}`:

- `x=100`: `99`∉set → điểm bắt đầu. Đếm: `101`∉ → dài 1.
- `x=4`: `3`∈set → bỏ qua (không phải đầu dãy).
- `x=200`: `199`∉ → bắt đầu, dài 1.
- `x=1`: `0`∉ → bắt đầu. Đếm `2`✓`3`✓`4`✓`5`∉ → **dài 4**. ← best.
- `x=3`,`x=2`: có prev → bỏ qua.

Kết quả `4`. Tổng số lần truy cập set ≈ 2n (mỗi số bị "đếm xuôi" đúng 1 lần từ đầu dãy của nó) → **O(n)**.

> ❓ **Câu hỏi tự nhiên.** *"Vòng `for cur := x+1` lồng trong vòng ngoài — chẳng phải O(n²)?"* Không.
> Chốt then là điều kiện `continue`: vòng trong **chỉ chạy với điểm bắt đầu dãy**, và mỗi phần tử thuộc
> đúng một dãy nên chỉ bị đếm một lần qua suốt toàn bộ chương trình. Tổng công vòng trong = n, không phải n×n.

> 📝 **Tóm tắt mục 3.** Set cho phép hỏi "có chứa x?" trong O(1). Two-sum dùng complement lookup
> (O(n²)→O(n)). Longest-consecutive dùng "tra biên" `x-1` để chỉ đếm từ đầu dãy.

---

## 4. Kỹ thuật 3 — Grouping (gom nhóm: `map[key] → []phần tử`)

> 💡 **Trực giác.** Bạn phân loại thư vào các hộc theo *mã bưu điện*. Mỗi lá thư tính ra mã rồi thả
> vào hộc tương ứng. Cuối cùng mỗi hộc là một nhóm. Key của map là **đặc trưng dùng để nhóm**, value
> là danh sách các phần tử cùng đặc trưng đó.

### 4.1 Group Anagrams — key = chuỗi đã sắp xếp

Các từ là anagram của nhau có **cùng tập chữ cái** ⇒ khi sắp xếp chữ cái sẽ thành **cùng một chuỗi**.
Dùng chuỗi-đã-sắp-xếp làm key:

```go
import "sort"

// GroupAnagrams gom các từ là đảo chữ của nhau vào cùng nhóm.
// Key của nhóm = chuỗi sau khi sắp xếp các ký tự ("eat"->"aet").
// O(n · k log k) time (n từ, mỗi từ dài k), O(n·k) space.
func GroupAnagrams(words []string) [][]string {
    groups := make(map[string][]string)
    for _, w := range words {
        b := []byte(w)
        sort.Slice(b, func(i, j int) bool { return b[i] < b[j] })
        key := string(b)          // "eat" -> "aet"
        groups[key] = append(groups[key], w)
    }
    out := make([][]string, 0, len(groups))
    for _, g := range groups {
        out = append(out, g)
    }
    return out
}
```

**Walk-through** `["eat","tea","tan","ate","nat","bat"]`:

| Từ | Sắp xếp → key | `groups` sau bước |
|---|---|---|
| eat | aet | `{aet:[eat]}` |
| tea | aet | `{aet:[eat,tea]}` |
| tan | ant | `{aet:[eat,tea], ant:[tan]}` |
| ate | aet | `{aet:[eat,tea,ate], ant:[tan]}` |
| nat | ant | `{aet:[...], ant:[tan,nat]}` |
| bat | abt | `{aet:[...], ant:[tan,nat], abt:[bat]}` |

Kết quả 3 nhóm: `[eat,tea,ate]`, `[tan,nat]`, `[bat]`.

> ⚠ **Lỗi thường gặp.** Dùng `string(b)` (b là `[]byte` đã sort) làm key, **KHÔNG** dùng `[]byte` trực
> tiếp — slice **không** dùng được làm key map trong Go (sẽ lỗi biên dịch *"invalid map key type"*).
> Xem mục 12.

### 4.2 Group by property (gom theo thuộc tính bất kỳ)

Key không cần là chuỗi sắp xếp — có thể là bất cứ đặc trưng `comparable` nào:

```go
// Gom số theo phần dư khi chia cho 3.
func GroupByMod3(nums []int) map[int][]int {
    groups := make(map[int][]int)
    for _, x := range nums {
        groups[x%3] = append(groups[x%3], x) // key = x%3 (0,1,2)
    }
    return groups
}
```

`[1,2,3,4,5,6]` → `{1:[1,4], 2:[2,5], 0:[3,6]}`.

> 📝 **Tóm tắt mục 4.** Grouping = `map[key] → slice`. Chọn key là *đặc trưng định danh nhóm*. Anagram
> → key là chuỗi sắp xếp; gom theo thuộc tính → key là thuộc tính đó. `append` tự xử lý nhóm rỗng ban đầu.

---

## 5. Kỹ thuật 4 — Seen / Visited (đánh dấu đã thăm)

> 💡 **Trực giác.** Đi trong mê cung, bạn bỏ viên sỏi xuống ô đã qua. Gặp ô có sỏi → biết mình đi
> vòng lại. `set` chính là túi sỏi: đánh dấu cái đã thăm để không lặp / để phát hiện chu trình (cycle).

### 5.1 Dedup (loại trùng, giữ thứ tự xuất hiện đầu)

```go
// Dedup loại phần tử trùng, GIỮ NGUYÊN thứ tự xuất hiện lần đầu.
// O(n) time, O(n) space. (Khác với sort rồi loại trùng — sort làm mất thứ tự gốc.)
func Dedup(nums []int) []int {
    seen := make(map[int]struct{})
    out := make([]int, 0, len(nums))
    for _, x := range nums {
        if _, ok := seen[x]; ok {
            continue
        }
        seen[x] = struct{}{}
        out = append(out, x)
    }
    return out
}
```

`[3,1,3,2,1,5]` → `[3,1,2,5]`.

### 5.2 Detect cycle trong linked-list (đánh dấu node đã thăm)

```go
type Node struct {
    Val  int
    Next *Node
}

// HasCycle: true nếu danh sách liên kết có chu trình.
// Kỹ thuật seen: ghi nhớ con trỏ node đã đi qua; gặp lại ⇒ có cycle.
// O(n) time, O(n) space. (Floyd "tortoise-hare" làm O(1) space — học sau.)
func HasCycle(head *Node) bool {
    seen := make(map[*Node]struct{})
    for cur := head; cur != nil; cur = cur.Next {
        if _, ok := seen[cur]; ok {
            return true // quay lại node đã thăm
        }
        seen[cur] = struct{}{}
    }
    return false
}
```

Lưu ý: key ở đây là **con trỏ** `*Node` — con trỏ là `comparable` nên dùng làm key được.

> ❓ **Câu hỏi tự nhiên.** *"Seen khác Membership (mục 3) chỗ nào?"* — Về cơ chế giống nhau (đều dùng
> set). Khác ở *ý đồ*: membership trả lời "x có trong tập dữ liệu cho trước?"; seen/visited là **trạng
> thái động** — ta vừa duyệt vừa đánh dấu, dùng cho duyệt đồ thị/cycle/dedup.

> 📝 **Tóm tắt mục 5.** Seen = set ghi trạng thái "đã xử lý". Dùng để dedup, phát hiện cycle, đánh dấu
> node trong BFS/DFS (sẽ gặp lại nhiều ở Tier 5 — Graph).

---

## 6. Kỹ thuật 5 — Prefix + Hash (đếm subarray, kết hợp Lesson 15)

> 💡 **Trực giác.** Ở [Lesson 15](../lesson-15-prefix-sum-difference/) ta học **prefix sum**:
> `P[i]` = tổng các phần tử từ đầu tới `i`. Tổng đoạn `(l, r]` = `P[r] − P[l]`. Bài toán "đếm số
> subarray có tổng = k" trở thành: với mỗi `r`, đếm xem có bao nhiêu `l` mà `P[r] − P[l] = k`, tức
> `P[l] = P[r] − k`. **Tra số lần xuất hiện của giá trị prefix `P[r]−k`** ⇒ dùng `map[prefix]→count`!

### 6.1 Subarray Sum Equals K

```go
// SubarraySumK đếm số subarray (liên tiếp) có tổng đúng bằng k.
// Kỹ thuật: map[giá trị prefix] -> số lần đã thấy.
// Với prefix hiện tại `sum`, số subarray kết thúc tại đây có tổng k
// = số lần ta đã thấy prefix (sum - k) trước đó.
// O(n) time, O(n) space.
func SubarraySumK(nums []int, k int) int {
    count := 0
    sum := 0
    seen := map[int]int{0: 1} // prefix rỗng (tổng 0) đã "thấy" 1 lần
    for _, x := range nums {
        sum += x
        if c, ok := seen[sum-k]; ok {
            count += c // cộng dồn mọi điểm bắt đầu hợp lệ
        }
        seen[sum]++
    }
    return count
}
```

**Walk-through** `nums = [1, 1, 1]`, `k = 2`:

| `x` | `sum` | `sum-k` | `seen[sum-k]` | `count` += | `seen` sau |
|:---:|:---:|:---:|:---:|:---:|---|
| (init) | 0 | — | — | 0 | `{0:1}` |
| 1 | 1 | -1 | 0 | 0 | `{0:1, 1:1}` |
| 1 | 2 | 0 | **1** | **1** | `{0:1, 1:1, 2:1}` |
| 1 | 3 | 1 | **1** | **2** | `{0:1, 1:1, 2:1, 3:1}` |

Kết quả `2`: hai subarray `[1,1]` (vị trí 0–1) và `[1,1]` (vị trí 1–2).

> ⚠ **Lỗi thường gặp.** Quên khởi tạo `seen = {0: 1}`. Mục đích: một subarray bắt đầu từ chỉ số 0
> tương ứng "prefix rỗng có tổng 0". Thiếu nó sẽ bỏ sót những subarray bắt đầu ngay từ đầu mảng.

> 🔁 **Dừng lại tự kiểm tra.** Với `nums=[3,4,7,2,-3,1,4,2]`, `k=7`: phương pháp này có đếm đúng cả
> subarray chứa số âm không?
> <details><summary>Đáp án</summary>
> Có. Prefix+hash **không yêu cầu mảng dương** (khác với sliding window — chỉ chạy đúng khi tất cả
> dương). Đây là lý do dùng prefix+hash thay vì window cho bài "sum = k" có số âm.
> </details>

> 📝 **Tóm tắt mục 6.** "Đếm subarray tổng = k" = prefix sum + `map[prefix]→count`. Khởi tạo `{0:1}`.
> Ưu điểm so với sliding window: chạy đúng cả khi có số âm.

---

## 7. Kỹ thuật 6 — Index Mapping (map giá trị → chỉ số)

Nhiều bài cần trả về **chỉ số (index)** chứ không chỉ true/false. Lúc này value của map là index:

```go
// TwoSumIndices trả về chỉ số của hai phần tử cộng = target (giả định luôn có).
// Kỹ thuật: map[giá trị] -> index của giá trị đó.
// O(n) time, O(n) space.
func TwoSumIndices(nums []int, target int) []int {
    idx := make(map[int]int) // value -> index
    for i, x := range nums {
        if j, ok := idx[target-x]; ok {
            return []int{j, i} // j là vị trí phần bù đã lưu, i là vị trí hiện tại
        }
        idx[x] = i // lưu vị trí của x
    }
    return nil
}
```

**Walk-through** `nums = [3, 2, 4]`, `target = 6`:

| `i` | `x` | `target-x` | `idx[target-x]`? | Hành động | `idx` sau |
|:---:|:---:|:---:|:---:|---|---|
| 0 | 3 | 3 | không | lưu `3→0` | `{3:0}` |
| 1 | 2 | 4 | không | lưu `2→1` | `{3:0, 2:1}` |
| 2 | 4 | 2 | **có (=1)** | trả `[1, 2]` | — |

`nums[1]+nums[2] = 2+4 = 6` ✓.

> ⚠ **Lỗi thường gặp.** Nếu mảng có giá trị trùng (vd `[3,3]`, target 6), lưu `idx[x]=i` *sau khi* tra
> sẽ chỉ giữ index cuối cùng — nhưng vì ta tra phần bù *trước*, cặp `[0,1]` vẫn được tìm đúng. Hãy luôn
> **tra trước, ghi sau** như mục 3.1.

> 📝 **Tóm tắt mục 7.** Khi cần trả index, đổi value của map từ "đã thấy" (`struct{}`) thành "index"
> (`int`). Cùng một kỹ thuật complement-lookup, chỉ khác kiểu value.

---

## 8. Kỹ thuật 7 — Sliding Window + Hash (kết hợp Lesson 14)

> 💡 **Trực giác.** [Lesson 14](../lesson-14-sliding-window/) dạy cửa sổ trượt. Khi điều kiện cửa sổ
> liên quan tới *thành phần ký tự / phần tử bên trong*, ta dùng `map[ký tự]→count` để biết cửa sổ hiện
> chứa gì, cập nhật O(1) khi mở rộng phải / co trái.

### 8.1 Longest Substring Without Repeating Characters

```go
// LengthOfLongestSubstring: độ dài chuỗi con dài nhất không lặp ký tự.
// Hash: map[byte] -> chỉ số xuất hiện gần nhất, để nhảy con trỏ trái.
// O(n) time, O(min(n, bảng chữ)) space.
func LengthOfLongestSubstring(s string) int {
    last := make(map[byte]int) // ký tự -> index gần nhất
    best, left := 0, 0
    for right := 0; right < len(s); right++ {
        c := s[right]
        if j, ok := last[c]; ok && j >= left {
            left = j + 1 // co cửa sổ: nhảy qua lần xuất hiện trước của c
        }
        last[c] = right
        if right-left+1 > best {
            best = right - left + 1
        }
    }
    return best
}
```

**Walk-through** `s = "abcabcbb"`:

| `right` | `c` | `last[c]≥left`? | `left` mới | cửa sổ | `best` |
|:---:|:---:|:---:|:---:|---|:---:|
| 0 | a | — | 0 | `a` | 1 |
| 1 | b | — | 0 | `ab` | 2 |
| 2 | c | — | 0 | `abc` | 3 |
| 3 | a | có (0≥0) | 1 | `bca` | 3 |
| 4 | b | có (1≥1) | 2 | `cab` | 3 |
| 5 | c | có (2≥2) | 3 | `abc` | 3 |
| 6 | b | có (4≥3) | 5 | `cb` | 3 |
| 7 | b | có (6≥5) | 7 | `b` | 3 |

Kết quả `3` (`"abc"`).

> 📝 **Tóm tắt mục 8.** Hash bổ trợ sliding window: lưu count hoặc index ký tự trong cửa sổ để biết
> khi nào / co thế nào. Cập nhật O(1) mỗi bước → toàn bộ O(n).

---

## 9. Kỹ thuật 8 — Hashing String: Rolling Hash (Polynomial Hash)

> 💡 **Trực giác.** Muốn so sánh nhanh nhiều đoạn con của một chuỗi, ta biến mỗi đoạn thành **một con
> số** (hash). So sánh hai số = O(1), thay vì so từng ký tự = O(độ dài). "Rolling" = khi cửa sổ trượt
> 1 bước, ta **cập nhật** số đó trong O(1) chứ không tính lại từ đầu.

**Polynomial hash** coi chuỗi như một số trong cơ số `b`:

```
hash(s) = s[0]·b^(m-1) + s[1]·b^(m-2) + ... + s[m-1]·b^0   (mod M)
```

Ví dụ `b=31`, `M` lớn, `s = "abc"` (a=97,b=98,c=99):

```
hash("abc") = 97·31² + 98·31¹ + 99·31⁰ = 97·961 + 98·31 + 99 = 93217 + 3038 + 99 = 96354
```

**Rolling** từ `"abc"` sang `"bcd"` (bỏ `a` đầu, thêm `d` cuối):

```
hash = (hash("abc") − 97·31²)·31 + 100   // bỏ thành phần cao nhất, dịch, thêm 'd'=100
```

```go
// RollingHash demo: tính hash mọi cửa sổ độ dài m, in ra (giáo cụ, KHÔNG dùng production).
// Đây là phần CỐT LÕI của Rabin-Karp — học đầy đủ ở Tier 6 (String).
func RollingHash(s string, m int) []int {
    const b, M = 31, 1_000_000_007
    if len(s) < m {
        return nil
    }
    // pow = b^(m-1) mod M, dùng khi bỏ ký tự đầu
    pow := 1
    for i := 0; i < m-1; i++ {
        pow = pow * b % M
    }
    h := 0
    for i := 0; i < m; i++ { // hash cửa sổ đầu tiên
        h = (h*b + int(s[i])) % M
    }
    out := []int{h}
    for i := m; i < len(s); i++ {
        h = (h - int(s[i-m])*pow%M + M) % M // bỏ ký tự rời cửa sổ (+M tránh âm)
        h = (h*b + int(s[i])) % M           // dịch & thêm ký tự mới
        out = append(out, h)
    }
    return out
}
```

> ⚠ **Toy example — cảnh báo.** Đây là **minh họa**, không phải code production. Vấn đề thực tế:
> - **Đụng độ hash (collision):** hai chuỗi khác nhau có thể cùng hash sau `mod M`. Rabin-Karp thật
>   phải **so lại ký tự** khi hash trùng để xác nhận. Chỉ tin hash = nguy cơ sai.
> - Chọn `b`, `M` (số nguyên tố lớn) và đôi khi **double hashing** để giảm xác suất đụng độ.
> - Phiên bản đầy đủ + ứng dụng (tìm chuỗi con, so khớp mẫu) học ở **Tier 6 — String / Rabin-Karp**.

> ❓ **Câu hỏi tự nhiên.** *"Tại sao không tính lại hash mỗi cửa sổ?"* — Tính lại tốn O(m) mỗi cửa sổ →
> O(n·m) tổng. Rolling cập nhật O(1)/cửa sổ → **O(n)** tổng. Đó là toàn bộ giá trị của "rolling".

> 📝 **Tóm tắt mục 9.** Polynomial hash biến chuỗi → số để so sánh O(1). Rolling cập nhật hash khi
> trượt cửa sổ trong O(1). Nền tảng của Rabin-Karp. NHỚ: hash trùng phải xác minh lại ký tự.

---

## 10. Kỹ thuật 9 — Set Operations (giao / hợp / hiệu)

`set` cho phép các phép toán tập hợp trong O(n):

```go
// Intersection: phần tử có ở CẢ hai mảng. O(n+m) time.
func Intersection(a, b []int) []int {
    set := make(map[int]struct{}, len(a))
    for _, x := range a {
        set[x] = struct{}{}
    }
    out := make([]int, 0)
    seen := make(map[int]struct{}) // tránh trùng trong kết quả
    for _, x := range b {
        if _, ok := set[x]; ok {
            if _, dup := seen[x]; !dup {
                out = append(out, x)
                seen[x] = struct{}{}
            }
        }
    }
    return out
}

// Difference: phần tử có trong a NHƯNG không có trong b. O(n+m).
func Difference(a, b []int) []int {
    inB := make(map[int]struct{}, len(b))
    for _, x := range b {
        inB[x] = struct{}{}
    }
    out := make([]int, 0)
    for _, x := range a {
        if _, ok := inB[x]; !ok {
            out = append(out, x)
        }
    }
    return out
}
```

Ví dụ: `a=[1,2,2,3]`, `b=[2,3,4]` → `Intersection` = `[2,3]`, `Difference(a,b)` = `[1]`,
`Union` (gộp set rồi liệt kê) = `{1,2,3,4}`.

> 📝 **Tóm tắt mục 10.** Giao/hợp/hiệu = nạp một mảng vào set, rồi quét mảng kia tra O(1). Tổng
> O(n+m) thay vì O(n·m) của so sánh cặp.

---

## 11. Khi nào dùng hash? (nhận diện dấu hiệu)

| Dấu hiệu trong đề bài | Kỹ thuật | Ví dụ |
|---|---|---|
| "đếm số lần", "tần suất", "phổ biến nhất" | Frequency counting | top-k, majority, anagram |
| "có tồn tại không", "đã thấy chưa", "trùng" | Membership / Seen | two-sum (bool), contains-duplicate |
| "gom nhóm theo …", "phân loại" | Grouping | group anagrams |
| "đếm subarray tổng = k" (có thể âm) | Prefix + hash | subarray-sum-k |
| "trả về chỉ số" | Index mapping | two-sum indices |
| "chuỗi con không lặp / chứa đủ ký tự" | Sliding window + hash | longest substring |
| "so khớp chuỗi nhanh" | Rolling hash | Rabin-Karp (Tier 6) |

**Quy tắc vàng:** thấy **vòng lặp lồng O(n²)** để *tìm cặp / kiểm tra tồn tại lại* → hỏi ngay
*"mình có thể nhớ cái đã thấy vào map để tra O(1) không?"*. Hầu hết các bài O(n²)→O(n) đều đi qua bước này.

> 💡 **Trade-off (đánh đổi).** Hash **đổi bộ nhớ O(n) lấy thời gian**. Khi RAM hạn chế hoặc dữ liệu
> đã sắp xếp, two-pointers (L13) / binary search (L12) có thể tốt hơn (O(1) space). Hash thắng khi dữ
> liệu chưa sắp xếp và ta cần tốc độ tra cứu.

> 📝 **Tóm tắt mục 11.** Hash hợp khi cần *count / lookup / group* nhanh trên dữ liệu chưa sắp xếp.
> Trade space O(n) lấy time O(n). Nếu space quý hoặc đã sort → cân nhắc two-pointers / binary search.

---

## 12. Cạm bẫy (pitfalls) đặc thù

### 12.1 Thứ tự duyệt map trong Go là NGẪU NHIÊN

```go
m := map[string]int{"a": 1, "b": 2, "c": 3}
for k := range m { fmt.Println(k) } // thứ tự a,b,c KHÁC nhau mỗi lần chạy!
```

Go **cố tình** ngẫu nhiên hóa thứ tự duyệt map (để không ai phụ thuộc vào nó). Nếu cần thứ tự ổn định:
trích key ra slice rồi `sort.Strings(keys)`. ⚠ Đây là nguồn bug khó chịu khi so sánh output trong test.

### 12.2 Key phải `comparable` — KHÔNG dùng slice/map làm key

```go
// m := map[[]int]int{}   // LỖI BIÊN DỊCH: invalid map key type []int
m := map[[3]int]int{}      // OK: ARRAY (kích thước cố định) là comparable
m2 := map[string]int{}     // OK: string comparable — cách phổ biến để "hash" một slice
```

Muốn dùng một *slice* làm key, hãy **serialize** nó thành chuỗi (vd `fmt.Sprint(slice)` hoặc nối bằng
dấu phẩy) — đây là lý do `GroupAnagrams` dùng `string(b)` chứ không phải `[]byte`.

### 12.3 Hash collision tồn tại (hiếm) nhưng không ảnh hưởng tính đúng của map

Bên trong, map Go xử lý đụng độ tự động (chaining) — bạn **không** cần lo collision cho `map`/`set`
thông thường; nó chỉ ảnh hưởng *xấu nhất O(n)*. Collision **chỉ** thành vấn đề tính-đúng khi bạn tự
viết hash (mục 9 — rolling hash phải so lại ký tự). Chi tiết cơ chế: [DataStructures](../../DataStructures/).

### 12.4 Bộ nhớ O(n) overhead

Mọi kỹ thuật ở đây tốn thêm O(n) bộ nhớ. Với dữ liệu khổng lồ vượt RAM, cân nhắc **Bloom filter** (xấp
xỉ membership, ít bộ nhớ) hoặc xử lý theo lô — nâng cao, ngoài phạm vi bài này.

### 12.5 Nil map panic khi ghi

```go
var m map[int]int   // m == nil
// m[1] = 1          // PANIC: assignment to entry in nil map
m = make(map[int]int) // phải make trước khi ghi
```

> 📝 **Tóm tắt mục 12.** (1) Duyệt map ngẫu nhiên → sort key nếu cần thứ tự. (2) Key phải comparable —
> slice không được, dùng string/array. (3) Map tự lo collision; chỉ rolling-hash tự viết mới cần xác
> minh. (4) Tốn O(n) RAM. (5) Phải `make` trước khi ghi.

---

## 13. Bài tập

> Tự code trước, rồi đối chiếu **Lời giải chi tiết** bên dưới. Mỗi bài ghi rõ độ phức tạp.

1. **Two-Sum (trả về chỉ số).** Cho `nums`, `target`, trả về `[]int{i, j}` với `nums[i]+nums[j]=target`
   (giả định có đúng một đáp án). Yêu cầu **O(n)**.
2. **Group Anagrams.** Gom các từ là đảo chữ vào cùng nhóm. Trả về `[][]string`.
3. **Top-K Frequent Elements.** Trả về `k` phần tử xuất hiện nhiều nhất. Mục tiêu tốt hơn O(n log n).
4. **Longest Consecutive Sequence.** Độ dài dãy số nguyên liên tiếp dài nhất. Yêu cầu **O(n)**.
5. **First Unique Character.** Trả về chỉ số ký tự **đầu tiên** không lặp trong chuỗi (hoặc -1).
6. **4-Sum Count.** Cho 4 mảng `A,B,C,D` cùng độ dài `n`, đếm số bộ `(i,j,k,l)` sao cho
   `A[i]+B[j]+C[k]+D[l]=0`. Mục tiêu **O(n²)** (không phải O(n⁴)).

---

## 14. Lời giải chi tiết

### Bài 1 — Two-Sum (chỉ số) — O(n) time, O(n) space

Index mapping (mục 7): với mỗi `x` tại vị trí `i`, tra phần bù `target-x` trong map giá trị→index.

```go
func twoSum(nums []int, target int) []int {
    idx := make(map[int]int)
    for i, x := range nums {
        if j, ok := idx[target-x]; ok {
            return []int{j, i}
        }
        idx[x] = i
    }
    return nil
}
```

Mỗi phần tử xử lý O(1) → tổng **O(n)**. Bộ nhớ map tối đa n phần tử → **O(n)**.

### Bài 2 — Group Anagrams — O(n·k log k) time, O(n·k) space

Key = chuỗi sau sort ký tự (mục 4.1). `n` từ, mỗi từ dài `k`: sort mỗi từ O(k log k), nên
**O(n·k log k)**. Có thể giảm key xuống O(k) bằng cách dùng "chữ ký đếm" `count[26]` → chuỗi, nhưng
cách sort dễ đọc hơn.

```go
func groupAnagrams(words []string) [][]string {
    g := make(map[string][]string)
    for _, w := range words {
        b := []byte(w)
        sort.Slice(b, func(i, j int) bool { return b[i] < b[j] })
        g[string(b)] = append(g[string(b)], w)
    }
    out := make([][]string, 0, len(g))
    for _, v := range g {
        out = append(out, v)
    }
    return out
}
```

### Bài 3 — Top-K Frequent (heap + hash) — O(n log k) time, O(n) space

Hai pha: (1) đếm tần suất bằng map — O(n). (2) dùng **min-heap kích thước k** để giữ k phần tử tần
suất cao nhất — mỗi push/pop O(log k), tổng O(n log k). Nhanh hơn sắp xếp toàn bộ O(n log n) khi k nhỏ.

```go
import "container/heap"

type item struct{ val, freq int }
type minHeap []item

func (h minHeap) Len() int            { return len(h) }
func (h minHeap) Less(i, j int) bool  { return h[i].freq < h[j].freq } // min theo freq
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x any)         { *h = append(*h, x.(item)) }
func (h *minHeap) Pop() any {
    old := *h
    n := len(old)
    it := old[n-1]
    *h = old[:n-1]
    return it
}

func topKFrequent(nums []int, k int) []int {
    freq := make(map[int]int) // pha 1: đếm — O(n)
    for _, x := range nums {
        freq[x]++
    }
    h := &minHeap{} // pha 2: min-heap giữ k phần tử tần suất cao nhất
    heap.Init(h)
    for v, f := range freq {
        heap.Push(h, item{v, f})
        if h.Len() > k {
            heap.Pop(h) // loại phần tử tần suất nhỏ nhất ⇒ giữ lại top-k
        }
    }
    out := make([]int, h.Len())
    for i := len(out) - 1; i >= 0; i-- { // pop ra theo tăng dần → đảo lại
        out[i] = heap.Pop(h).(item).val
    }
    return out
}
```

**Walk-through** `nums=[1,1,1,2,2,3]`, `k=2`: freq `{1:3,2:2,3:1}`. Heap giữ tối đa 2 phần tử có freq
lớn nhất; khi gặp `3:1` heap đầy (đang có 1:3, 2:2), push 3:1 rồi pop min → loại `3`. Kết quả `[1,2]`.
*(Lưu ý: bài này còn cách O(n) bằng bucket sort theo tần suất — nâng cao hơn.)*

### Bài 4 — Longest Consecutive Sequence — O(n) time, O(n) space

Set + "tra biên" (mục 3.3): chỉ đếm từ số là **đầu dãy** (số `x` mà `x-1` không có trong set).

```go
func longestConsecutive(nums []int) int {
    set := make(map[int]struct{}, len(nums))
    for _, x := range nums {
        set[x] = struct{}{}
    }
    best := 0
    for x := range set {
        if _, ok := set[x-1]; ok {
            continue // không phải đầu dãy
        }
        length := 1
        for cur := x + 1; ; cur++ {
            if _, ok := set[cur]; !ok {
                break
            }
            length++
        }
        if length > best {
            best = length
        }
    }
    return best
}
```

Mỗi phần tử bị "đếm xuôi" đúng một lần → tổng công O(n) dù có vòng lồng (xem giải thích mục 3.3).

### Bài 5 — First Unique Character — O(n) time, O(1) space (bảng chữ cố định)

Hai lượt: lượt 1 đếm tần suất; lượt 2 quét **theo thứ tự gốc** trả về ký tự đầu tiên có freq = 1.
Quét lại theo thứ tự gốc là điểm mấu chốt (map không giữ thứ tự — mục 12.1).

```go
func firstUniqChar(s string) int {
    freq := make(map[rune]int)
    for _, c := range s {
        freq[c]++
    }
    for i, c := range s { // quét lại theo THỨ TỰ GỐC, không duyệt map
        if freq[c] == 1 {
            return i
        }
    }
    return -1
}
```

**Walk-through** `s="leetcode"`: freq `{l:1,e:3,t:1,c:1,o:1,d:1}`. Quét lại: `l` freq 1 → trả về `0`.
Space O(1) vì miền ký tự giới hạn (26/256), không phụ thuộc độ dài chuỗi.

### Bài 6 — 4-Sum Count (2 hash) — O(n²) time, O(n²) space

> 💡 Chia 4 mảng thành 2 nửa. Tính **mọi tổng** `A[i]+B[j]` (n² tổng) lưu vào `map[tổng]→số lần`. Rồi
> với mọi `C[k]+D[l]` (n² tổng), tra xem cần tổng `−(C[k]+D[l])` ở map kia bao nhiêu lần. O(n²) thay vì
> O(n⁴) duyệt 4 vòng lồng.

```go
func fourSumCount(A, B, C, D []int) int {
    sumAB := make(map[int]int)
    for _, a := range A { // n² tổng của hai mảng đầu
        for _, b := range B {
            sumAB[a+b]++
        }
    }
    count := 0
    for _, c := range C { // với mỗi tổng C+D, cần -(c+d) ở phía AB
        for _, d := range D {
            count += sumAB[-(c + d)]
        }
    }
    return count
}
```

**Walk-through** `A=[1,2]`, `B=[-2,-1]`, `C=[-1,2]`, `D=[0,2]`: `sumAB` = các tổng `1-2=-1, 1-1=0,
2-2=0, 2-1=1` → `{-1:1, 0:2, 1:1}`. Duyệt C+D: `-1+0=-1`→cần `1`: có 1. `-1+2=1`→cần `-1`: có 1.
`2+0=2`→cần `-2`: 0. `2+2=4`→cần `-4`: 0. Tổng `count = 2`. Hai bộ thỏa mãn.

---

## 15. Bài tiếp theo

- **[Lesson 17 — Divide & Conquer](../lesson-17-divide-and-conquer/)** — chia để trị, một paradigm
  thiết kế thuật toán khác.
- Quay lại nền: [Lesson 13 — Two Pointers](../lesson-13-two-pointers/),
  [Lesson 14 — Sliding Window](../lesson-14-sliding-window/),
  [Lesson 15 — Prefix Sum](../lesson-15-prefix-sum-difference/).
- Cấu trúc bảng băm sâu hơn: [DataStructures](../../DataStructures/).
- Rabin-Karp & string matching đầy đủ: **Tier 6 — String** (sẽ học sau).

> 📝 **Chốt bài.** Hash là "dao đa năng" của thuật toán: count, lookup, group, seen, prefix-combine.
> Mọi bài O(n²) "tìm cặp / tìm lại" nên thử hỏi *"nhớ vào map được không?"*. Đổi O(n) bộ nhớ lấy tốc
> độ — gần như luôn đáng giá khi dữ liệu chưa sắp xếp.
