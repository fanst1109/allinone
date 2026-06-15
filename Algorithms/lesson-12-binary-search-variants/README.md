# Lesson 12 — Binary Search & các biến thể

> **Tier 2 · Bài đầu** — Binary search (tìm kiếm nhị phân) là một trong những kỹ thuật cốt lõi nhất: từ O(n) xuống O(log n) chỉ bằng cách *loại bỏ một nửa không gian tìm kiếm mỗi bước*. Bài này không dừng ở "tìm phần tử trong mảng sorted" — chúng ta đi sâu vào các biến thể thực chiến: lower/upper bound, first/last occurrence, **binary search on answer** (kỹ thuật mạnh nhất), mảng xoay, ma trận 2D, và một **template thống nhất** dùng được cho mọi biến thể.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Cài đặt binary search cơ bản **không dính bug** (overflow `mid`, off-by-one, vòng lặp vô hạn).
- Phân biệt và cài `lowerBound` / `upperBound`, tìm **first/last occurrence** của giá trị trùng lặp.
- Nắm **binary search on answer** — search trên *không gian đáp án* khi đáp án đơn điệu (monotonic), không phải search trên mảng. Áp dụng cho sqrt, Koko ăn chuối, ship trong D ngày, split array.
- Search trong **mảng đã sorted rồi bị xoay** (rotated) và trong **ma trận sorted** với O(log n).
- Dùng **một template duy nhất** ("find first true" predicate) cho mọi biến thể, không phải nhớ 5 cách viết khác nhau.
- Biết **khi nào dùng** (input sorted hoặc predicate đơn điệu) và tránh các cạm bẫy kinh điển.

## Kiến thức tiền đề

- [Lesson 01 — Big-O & tiệm cận](../lesson-01-bigo-asymptotic/) — hiểu O(log n) nghĩa là gì.
- [Lesson 03 — Đệ quy & Recurrence](../lesson-03-recursion-recurrence/) — binary search dạng đệ quy là $T(n) = T(n/2) + O(1)$.
- [Lesson 04 — Tính đúng đắn & bất biến (invariant)](../lesson-04-correctness-invariant/) — chứng minh binary search đúng dựa trên loop invariant.
- [Tier 1 — Sorting](../tier-1-sorting/index.html) — binary search yêu cầu dữ liệu **đã sorted**.

---

## 1. Binary search cơ bản

> 💡 **Trực giác / Hình dung.** Bạn tra từ điển giấy tìm từ "monotonic". Bạn không lật từ trang 1. Bạn mở *giữa* quyển, thấy chữ "M" — à, "monotonic" nằm sau, vứt nửa đầu. Mở giữa nửa sau, thấy "P" — quá xa, vứt nửa sau. Cứ thế mỗi lần **vứt một nửa**. 1000 trang → tìm ra trong ~10 lần mở ($\log_2 1000 \approx 10$), thay vì lật 1000 trang. Đó chính xác là binary search. Điều kiện *bắt buộc*: từ điển đã được **sắp xếp** — nếu các từ xếp lung tung, mở giữa chẳng cho biết nên vứt nửa nào.

**Định nghĩa.** Cho mảng `a` đã sorted tăng dần và một giá trị `target`. Binary search trả về index của `target` nếu tồn tại, ngược lại trả `-1`. Ta giữ một khoảng `[lo, hi]` chứa vùng *có thể* chứa target. Mỗi bước lấy `mid` ở giữa, so sánh `a[mid]` với `target`:

- `a[mid] == target` → tìm thấy, trả `mid`.
- `a[mid] < target` → target (nếu có) nằm bên phải → `lo = mid + 1`.
- `a[mid] > target` → target nằm bên trái → `hi = mid - 1`.

Lặp đến khi `lo > hi` (khoảng rỗng) → không tồn tại.

### 1.1 Walk-through bằng số thật — tìm 13 trong `[1,3,5,7,9,11,13,15]`

Mảng có 8 phần tử, index 0..7. `target = 13`.

| Bước | lo | hi | mid = lo+(hi-lo)/2 | a[mid] | So sánh | Hành động |
|:----:|:--:|:--:|:------------------:|:------:|---------|-----------|
| 1 | 0 | 7 | 0+(7-0)/2 = **3** | a[3]=7 | 7 < 13 | lo = 3+1 = 4 |
| 2 | 4 | 7 | 4+(7-4)/2 = **5** | a[5]=11 | 11 < 13 | lo = 5+1 = 6 |
| 3 | 6 | 7 | 6+(7-6)/2 = **6** | a[6]=13 | 13 == 13 | **trả về 6** ✓ |

Tìm ra sau **3 bước**. Kiểm tra: $\log_2 8 = 3$ — đúng đúng số bước tối đa. Nếu duyệt tuyến tính, 13 ở index 6 sẽ tốn 7 phép so sánh.

### 1.2 Thêm 3 ví dụ số (đa dạng edge case)

Vẫn mảng `[1,3,5,7,9,11,13,15]`:

- **Tìm `1` (phần tử đầu):** lo=0,hi=7,mid=3,a[3]=7>1→hi=2. lo=0,hi=2,mid=1,a[1]=3>1→hi=0. lo=0,hi=0,mid=0,a[0]=1==1→**trả 0**. (3 bước)
- **Tìm `15` (phần tử cuối):** mid=3→7<15→lo=4. mid=5→11<15→lo=6. mid=6→13<15→lo=7. mid=7→15==15→**trả 7**. (4 bước)
- **Tìm `8` (không tồn tại):** mid=3→7<8→lo=4. mid=5→11>8→hi=4. mid=4→9>8→hi=3. Giờ lo=4 > hi=3 → khoảng rỗng → **trả -1**. (3 bước rồi dừng)

### 1.3 Code Go — `binarySearch`

```go
// binarySearch trả index của target trong mảng sorted tăng dần a,
// hoặc -1 nếu không tồn tại. O(log n) thời gian, O(1) bộ nhớ.
func binarySearch(a []int, target int) int {
	lo, hi := 0, len(a)-1 // khoảng [lo, hi] đóng cả 2 đầu
	for lo <= hi {        // còn phần tử để xét
		mid := lo + (hi-lo)/2 // tránh overflow (xem mục 2)
		switch {
		case a[mid] == target:
			return mid // tìm thấy
		case a[mid] < target:
			lo = mid + 1 // vứt nửa trái (gồm cả mid)
		default: // a[mid] > target
			hi = mid - 1 // vứt nửa phải (gồm cả mid)
		}
	}
	return -1 // lo > hi: khoảng rỗng, không tồn tại
}
```

> 🔁 **Dừng lại tự kiểm tra.** Với mảng `[2,4,6,8]`, `binarySearch` tìm `5` chạy bao nhiêu bước rồi trả gì?
>
> <details><summary>Đáp án</summary>
>
> lo=0,hi=3,mid=1,a[1]=4<5→lo=2. lo=2,hi=3,mid=2,a[2]=6>5→hi=1. Giờ lo=2>hi=1→rỗng→trả **-1**. 2 lần so sánh rồi dừng.
> </details>

---

## 2. Cạm bẫy implementation (và bug binary search nổi tiếng)

Binary search nổi tiếng là *dễ hiểu, khó viết đúng*. Một nghiên cứu của Jon Bentley (tác giả "Programming Pearls") cho thấy **~90% lập trình viên chuyên nghiệp viết sai** binary search ở lần đầu. Dưới đây là các bẫy.

### 2.1 Overflow khi tính `mid`

> ⚠ **Lỗi thường gặp.** Viết `mid := (lo + hi) / 2`.

Trong nhiều ngôn ngữ (Java, C/C++) với `int` 32-bit, nếu `lo + hi` vượt $2^{31} - 1 \approx 2{,}1$ tỉ thì **tràn số** → `mid` thành số âm → truy cập mảng ngoài biên → crash. Đây chính là bug nằm im **9 năm** trong `java.util.Arrays.binarySearch` của JDK (Joshua Bloch công bố 2006). Mảng cỡ tỉ phần tử nghe xa vời, nhưng nó *đã* xảy ra trong các hệ thống thật.

**Cách đúng:** `mid := lo + (hi - lo) / 2`.

Walk-through số thật: giả sử `lo = 2_000_000_000`, `hi = 2_000_000_010` (int32).
- Sai: `lo + hi = 4_000_000_010` > `2_147_483_647` → tràn → âm.
- Đúng: `hi - lo = 10`, `10/2 = 5`, `mid = 2_000_000_005` ✓ — không bao giờ tràn vì `hi - lo ≥ 0` và `≤ hi`.

> 📝 **Lưu ý Go.** `int` trong Go trên nền 64-bit là 64-bit, nên overflow thực tế hiếm. Nhưng vẫn nên viết `lo + (hi-lo)/2` thành **thói quen** — code có thể chạy trên nền 32-bit, hoặc bạn chuyển sang Java/C sau này.

### 2.2 `lo <= hi` vs `lo < hi` — hai trường phái

Có hai cách viết binary search, **khác nhau ở bất biến của khoảng**:

- **Khoảng đóng `[lo, hi]`** (cả 2 đầu hợp lệ): điều kiện vòng lặp `lo <= hi`, khởi tạo `hi = len-1`, cập nhật `lo = mid+1` / `hi = mid-1`. (Đây là `binarySearch` ở mục 1.)
- **Khoảng nửa mở `[lo, hi)`** (`hi` không hợp lệ, là "sentinel"): điều kiện `lo < hi`, khởi tạo `hi = len`, cập nhật `lo = mid+1` / `hi = mid`. (Dùng cho lower/upper bound ở mục 3.)

Cả hai đều đúng — quan trọng là **nhất quán**: chọn một kiểu khoảng rồi giữ mọi cập nhật khớp với nó. Trộn lẫn (`hi = len` nhưng `hi = mid-1`) là nguồn bug số 1.

### 2.3 Vòng lặp vô hạn do off-by-one

> ⚠ **Lỗi thường gặp.** Trong kiểu khoảng đóng, viết `lo = mid` (thay vì `mid + 1`) khi `a[mid] < target`.

Khi khoảng còn 2 phần tử, `mid` luôn rơi vào **phần tử trái** (do chia lấy nguyên). Nếu cập nhật `lo = mid` mà không `+1`, `lo` không đổi → vòng lặp chạy mãi.

Walk-through: `a = [4, 8]`, `target = 8`, dùng sai `lo = mid`.
- lo=0,hi=1,mid=0,a[0]=4<8→`lo = mid = 0`. lo vẫn 0, hi vẫn 1 → **lặp lại y hệt** → vô hạn. ❌

Với `lo = mid + 1` thì: lo=1,hi=1,mid=1,a[1]=8==8→trả 1. ✓

> 💡 **Quy tắc vàng tránh treo:** mỗi vòng lặp khoảng *bắt buộc* phải co lại. Nếu nhánh nào để `lo = mid` hoặc `hi = mid` (không ±1), phải chắc `mid` *khác* đầu kia của khoảng, nếu không sẽ kẹt. Trong template "first true" (mục 9) ta xử lý điều này gọn gàng.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao `mid` luôn rơi vào nửa trái khi còn 2 phần tử?"* Vì `mid = lo + (hi-lo)/2`, với `hi = lo+1` thì `(hi-lo)/2 = 1/2 = 0` (chia nguyên) → `mid = lo`. Nó **không bao giờ** chạm `hi`. Đây là lý do `lo = mid` treo còn `hi = mid` thì an toàn.
> - *"Tôi cứ hay nhầm `+1`/`-1`, có cách nào khỏi nhớ không?"* Có — học **một template duy nhất** (mục 9) thay vì nhớ từng biến thể.

---

## 3. Lower bound / Upper bound

Khi mảng có **phần tử trùng lặp**, "tìm target" mơ hồ: trả index nào trong các bản trùng? Ta cần khái niệm chính xác hơn:

- **lowerBound(x):** index *nhỏ nhất* `i` sao cho `a[i] >= x`. Tức "vị trí chèn x trái nhất mà vẫn giữ mảng sorted".
- **upperBound(x):** index *nhỏ nhất* `i` sao cho `a[i] > x`. Tức "vị trí chèn x phải nhất".

> 💡 **Trực giác.** Tưởng tượng dãy người xếp hàng theo chiều cao (đã sorted), nhiều người cùng cao 170cm. `lowerBound(170)` = vị trí **đầu tiên** của nhóm 170cm. `upperBound(170)` = vị trí **ngay sau** người 170cm cuối cùng. Khoảng `[lowerBound, upperBound)` chính là *toàn bộ* nhóm 170cm. Số người cao 170cm = `upperBound − lowerBound`.

### 3.1 Walk-through với mảng có phần tử trùng

`a = [1, 2, 2, 2, 5, 7]` (index 0..5).

**lowerBound(2)** — tìm `a[i] >= 2` trái nhất. Dùng khoảng nửa mở `[lo, hi)`, lo=0, hi=6:

| Bước | lo | hi | mid | a[mid] | a[mid] >= 2 ? | Hành động |
|:----:|:--:|:--:|:---:|:------:|:-------------:|-----------|
| 1 | 0 | 6 | 3 | a[3]=2 | có | hi = mid = 3 (biên có thể ở đây hoặc trái hơn) |
| 2 | 0 | 3 | 1 | a[1]=2 | có | hi = 1 |
| 3 | 0 | 1 | 0 | a[0]=1 | không | lo = mid+1 = 1 |
| | 1 | 1 | — | lo==hi → dừng | | **trả 1** |

`lowerBound(2) = 1` ✓ (index đầu của nhóm số 2).

**upperBound(2)** — tìm `a[i] > 2` trái nhất, lo=0, hi=6:

| Bước | lo | hi | mid | a[mid] | a[mid] > 2 ? | Hành động |
|:----:|:--:|:--:|:---:|:------:|:------------:|-----------|
| 1 | 0 | 6 | 3 | a[3]=2 | không | lo = 4 |
| 2 | 4 | 6 | 5 | a[5]=7 | có | hi = 5 |
| 3 | 4 | 5 | 4 | a[4]=5 | có | hi = 4 |
| | 4 | 4 | — | dừng | | **trả 4** |

`upperBound(2) = 4` ✓. Số phần tử bằng 2 = `4 − 1 = 3` (đúng: a[1],a[2],a[3]).

### 3.2 Thêm ví dụ số

Vẫn `a = [1,2,2,2,5,7]`:

- `lowerBound(0) = 0` (mọi phần tử ≥ 0, biên trái nhất là 0). `upperBound(0) = 0` (không có phần tử > 0... khoan, a[0]=1>0 → thực ra `upperBound(0)=0`? Không: 1 > 0 nên `a[0] > 0` đúng → trả 0). Cả hai = 0 → 0 phần tử bằng 0. ✓
- `lowerBound(5) = 4`, `upperBound(5) = 5` → có `5−4 = 1` phần tử bằng 5. ✓
- `lowerBound(8) = 6`, `upperBound(8) = 6` → 8 lớn hơn mọi phần tử, vị trí chèn ở cuối (index 6 = len). 0 phần tử bằng 8. ✓
- `lowerBound(2) = 1` còn `upperBound(2) = 4` (đã tính ở trên).

### 3.3 Code Go — `lowerBound` và `upperBound`

```go
// lowerBound trả index nhỏ nhất i sao cho a[i] >= x.
// Nếu mọi phần tử < x, trả len(a) (vị trí chèn ở cuối).
// Khoảng nửa mở [lo, hi): hi = len(a) là sentinel "ngoài mảng".
func lowerBound(a []int, x int) int {
	lo, hi := 0, len(a)
	for lo < hi {
		mid := lo + (hi-lo)/2
		if a[mid] >= x {
			hi = mid // mid có thể là biên → giữ trong khoảng [lo, mid)
		} else {
			lo = mid + 1 // a[mid] < x → biên ở bên phải mid
		}
	}
	return lo // lo == hi == vị trí biên
}

// upperBound trả index nhỏ nhất i sao cho a[i] > x.
// Chỉ khác lowerBound ở dấu so sánh: > thay vì >=.
func upperBound(a []int, x int) int {
	lo, hi := 0, len(a)
	for lo < hi {
		mid := lo + (hi-lo)/2
		if a[mid] > x {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}

// countEqual đếm số phần tử bằng x: khoảng [lowerBound, upperBound).
func countEqual(a []int, x int) int {
	return upperBound(a, x) - lowerBound(a, x)
}
```

> ⚠ **Lỗi thường gặp.** Nhầm `>=` và `>` giữa hai hàm. Mẹo nhớ: **lower** ↔ điều kiện *lỏng* hơn (`>=`, bao gồm cả x), nên dừng *sớm hơn* → index nhỏ hơn. **upper** ↔ điều kiện *chặt* hơn (`>`, không gồm x), dừng *muộn hơn* → index lớn hơn.

---

## 4. Tìm first / last occurrence

Cho mảng sorted có trùng, tìm index **đầu tiên** và **cuối cùng** của `target`. Đây chỉ là ứng dụng trực tiếp của lower/upper bound:

- **first occurrence** = `lowerBound(target)`, nhưng phải kiểm tra `a[idx] == target` (vì lowerBound có thể trả vị trí chèn khi target không tồn tại).
- **last occurrence** = `upperBound(target) - 1`, kiểm tra index hợp lệ và `a[idx] == target`.

### 4.1 Walk-through

`a = [1, 2, 2, 2, 5, 7]`, `target = 2`. Từ mục 3: `lowerBound(2) = 1`, `upperBound(2) = 4`.
- first = `lowerBound(2) = 1`, kiểm tra `a[1] == 2` ✓ → **first = 1**.
- last = `upperBound(2) - 1 = 4 - 1 = 3`, kiểm tra `a[3] == 2` ✓ → **last = 3**.

Đúng: số 2 nằm ở index 1, 2, 3.

`target = 4` (không tồn tại): `lowerBound(4) = 4` (a[4]=5≥4), kiểm tra `a[4]=5 ≠ 4` → first = **-1** (không tồn tại). Tốt — không trả index sai.

### 4.2 Code Go

```go
// firstOccurrence trả index đầu tiên của target, hoặc -1 nếu không có.
func firstOccurrence(a []int, target int) int {
	idx := lowerBound(a, target)
	if idx < len(a) && a[idx] == target {
		return idx
	}
	return -1
}

// lastOccurrence trả index cuối cùng của target, hoặc -1 nếu không có.
func lastOccurrence(a []int, target int) int {
	idx := upperBound(a, target) - 1
	if idx >= 0 && a[idx] == target {
		return idx
	}
	return -1
}
```

> 🔁 **Dừng lại tự kiểm tra.** Với `a = [5,5,5,5]`, `firstOccurrence(5)` và `lastOccurrence(5)` trả gì?
>
> <details><summary>Đáp án</summary>
>
> `lowerBound(5) = 0` (a[0]=5≥5, biên trái nhất). `upperBound(5) = 4` (không phần tử nào > 5 → vị trí chèn cuối = len = 4). first = 0, last = 4−1 = 3. Đúng: số 5 trải từ index 0 đến 3.
> </details>

---

## 5. Binary search on answer — kỹ thuật mạnh nhất

> 💡 **Trực giác / Hình dung.** Cho tới giờ ta search *trên mảng*. Nhưng nhiều bài toán **không có mảng để search** — chúng hỏi "giá trị nhỏ nhất / lớn nhất thỏa điều kiện là bao nhiêu?". Mẹo: nếu đáp án có tính **đơn điệu** (monotonic) — kiểu "x càng lớn càng dễ thỏa, càng nhỏ càng khó" — thì ta search trên **không gian các đáp án có thể** thay vì trên mảng. Hình dung một dãy `F F F F T T T T` theo giá trị đáp án tăng dần: ta tìm điểm `T` đầu tiên. Đó là binary search on answer.

**Điều kiện áp dụng:** tồn tại hàm `check(x)` (predicate) **đơn điệu**: nếu `check(x)` đúng thì mọi `x' > x` (hoặc `< x`, tùy bài) cũng đúng. Khi đó các giá trị `check` tạo thành `F...F T...T`, và ta tìm **biên** (T đầu hoặc F cuối) bằng binary search trên khoảng `[lo, hi]` của *giá trị đáp án*, không phải index mảng.

Độ phức tạp: $O(\log(\text{range}) \times \text{cost\_check})$ với `range = hi - lo` là độ rộng không gian đáp án.

### 5.1 Bài toán 1 — Ship trong D ngày, capacity nhỏ nhất (LeetCode 1011)

**Đề:** Có `weights = [1,2,3,4,5,6,7,8,9,10]` kiện hàng, phải chuyển hết trong `D = 5` ngày, **giữ nguyên thứ tự**. Mỗi ngày tàu chở liên tục một số kiện sao cho tổng ≤ `capacity`. Tìm `capacity` **nhỏ nhất** đủ để xong trong 5 ngày.

**Vì sao monotonic?** Capacity càng *lớn* → mỗi ngày chở được nhiều hơn → cần *ít* ngày hơn → càng dễ thỏa "≤ D ngày". Vậy `check(cap) = (số ngày cần với cap này ≤ D)` là `F...F T...T` theo cap tăng. Ta tìm cap **T đầu tiên** = cap nhỏ nhất khả thi.

**Khoảng tìm kiếm:**
- `lo = max(weights) = 10` — capacity phải ≥ kiện nặng nhất (nếu nhỏ hơn thì kiện đó không bao giờ chở được).
- `hi = sum(weights) = 55` — capacity = tổng tất cả → chở hết trong 1 ngày (chắc chắn đủ ≤ 5 ngày).

**Hàm `daysNeeded(cap)`:** greedy — chất kiện vào ngày hiện tại đến khi vượt cap thì sang ngày mới.

**Walk-through:**

| Bước | lo | hi | mid (cap) | daysNeeded(mid) | ≤ 5 ? | Hành động |
|:----:|:--:|:--:|:---------:|:---------------:|:-----:|-----------|
| 1 | 10 | 55 | 10+(55-10)/2 = **32** | = 2 | có (T) | hi = 32 |
| 2 | 10 | 32 | 10+(32-10)/2 = **21** | = 3 | có (T) | hi = 21 |
| 3 | 10 | 21 | 10+(21-10)/2 = **15** | = 5 | có (T) | hi = 15 |
| 4 | 10 | 15 | 10+(15-10)/2 = **12** | = 6 | không (F) | lo = 13 |
| 5 | 13 | 15 | 13+(15-13)/2 = **14** | = 6 | không (F) | lo = 15 |
| | 15 | 15 | lo==hi → dừng | | | **trả 15** |

Kiểm tra `daysNeeded(15)` (đáp án): ngày1 = 1+2+3+4+5 = 15 (thêm 6 → 21 > 15 → sang ngày mới), ngày2 = 6+7 = 13 (thêm 8 → 21 > 15), ngày3 = 8 (thêm 9 → 17 > 15), ngày4 = 9 (thêm 10 → 19 > 15), ngày5 = 10. → đúng **5 ngày** ✓.

Kiểm tra `daysNeeded(14)`: ngày1 = 1+2+3+4 = 10 (thêm 5 → 15 > 14), ngày2 = 5+6 = 11 (thêm 7 → 18 > 14), ngày3 = 7+... 7 (thêm 8 → 15 > 14), ngày4 = 8 (thêm 9 → 17 > 14), ngày5 = 9 (thêm 10 → 19 > 14), ngày6 = 10 → **6 ngày** > 5 ❌. Vậy cap=14 không đủ → **đáp án = 15** (capacity nhỏ nhất chở hết trong 5 ngày).

### 5.2 Code Go — binary search on answer (ship capacity)

```go
// daysNeeded: với capacity cap, cần bao nhiêu ngày chở hết weights
// (greedy, giữ nguyên thứ tự). Đây là predicate "cost".
func daysNeeded(weights []int, cap int) int {
	days, load := 1, 0
	for _, w := range weights {
		if load+w > cap { // không nhét vừa hôm nay → sang ngày mới
			days++
			load = 0
		}
		load += w
	}
	return days
}

// shipWithinDays trả capacity nhỏ nhất để chở hết weights trong D ngày.
// Binary search on answer: tìm cap T-đầu-tiên trong khoảng [max, sum].
func shipWithinDays(weights []int, D int) int {
	lo, hi := 0, 0
	for _, w := range weights {
		if w > lo {
			lo = w // cap >= kiện nặng nhất
		}
		hi += w // cap = tổng → chắc chắn 1 ngày
	}
	for lo < hi {
		mid := lo + (hi-lo)/2
		if daysNeeded(weights, mid) <= D { // check(mid) = T → thử nhỏ hơn
			hi = mid
		} else { // F → cap quá nhỏ, tăng lên
			lo = mid + 1
		}
	}
	return lo // lo == hi == cap nhỏ nhất khả thi
}
```

### 5.3 Bài toán 2 — Koko ăn chuối (LeetCode 875)

**Đề:** `piles = [3,6,7,11]` đống chuối, Koko ăn trong `H = 8` giờ. Mỗi giờ Koko chọn 1 đống, ăn tối đa `k` quả; nếu đống còn < k thì ăn hết rồi nghỉ (không chuyển đống trong cùng giờ). Tìm tốc độ `k` **nhỏ nhất** để ăn hết trong H giờ.

**Monotonic?** k càng lớn → ăn nhanh → cần ít giờ → dễ thỏa. `check(k) = (giờ cần ≤ H)` là `F...F T...T`. Tìm k nhỏ nhất (T đầu).

**Khoảng:** `lo = 1` (tốc độ tối thiểu), `hi = max(piles) = 11` (ăn nhanh nhất hợp lý — k > max không nhanh hơn vì mỗi giờ chỉ 1 đống).

**Giờ cần với tốc độ k:** $\sum \lceil \text{pile} / k \rceil$.

**Walk-through** (`piles=[3,6,7,11]`, H=8):

| Bước | lo | hi | mid (k) | hours = Σ⌈p/k⌉ | ≤ 8 ? | Hành động |
|:----:|:--:|:--:|:-------:|:--------------:|:-----:|-----------|
| 1 | 1 | 11 | 6 | ⌈3/6⌉+⌈6/6⌉+⌈7/6⌉+⌈11/6⌉ = 1+1+2+2 = 6 | có | hi = 6 |
| 2 | 1 | 6 | 3 | 1+2+3+4 = 10 | không | lo = 4 |
| 3 | 4 | 6 | 5 | 1+2+2+3 = 8 | có | hi = 5 |
| 4 | 4 | 5 | 4 | 1+2+2+3 = 8 | có | hi = 4 |
| | 4 | 4 | dừng | | | **trả 4** |

Đáp án **k = 4**: ⌈3/4⌉+⌈6/4⌉+⌈7/4⌉+⌈11/4⌉ = 1+2+2+3 = 8 giờ = đúng H. Với k=3 cần 10 giờ > 8 → không đủ. Vậy 4 là tốc độ nhỏ nhất.

```go
import "math"

// hoursNeeded: với tốc độ k, Koko cần bao nhiêu giờ ăn hết piles.
func hoursNeeded(piles []int, k int) int {
	h := 0
	for _, p := range piles {
		h += (p + k - 1) / k // ceil(p/k) bằng số nguyên
	}
	return h
}

// minEatingSpeed: tốc độ k nhỏ nhất để ăn hết trong H giờ.
func minEatingSpeed(piles []int, H int) int {
	lo, hi := 1, 0
	for _, p := range piles {
		if p > hi {
			hi = p // k tối đa = đống lớn nhất
		}
	}
	for lo < hi {
		mid := lo + (hi-lo)/2
		if hoursNeeded(piles, mid) <= H {
			hi = mid // đủ chậm vẫn kịp → thử chậm hơn
		} else {
			lo = mid + 1 // quá chậm → tăng tốc
		}
	}
	return lo
}
```

> ❓ **Câu hỏi tự nhiên.**
> - *"Sao biết bài nào dùng binary search on answer?"* Tín hiệu: đề hỏi **"nhỏ nhất/lớn nhất X sao cho Y thỏa"**, và khi X tăng thì Y "dễ thỏa hơn" (đơn điệu). Lúc đó X là không gian đáp án để search.
> - *"`check` đắt thì sao?"* Mỗi check ở đây $O(n)$ (duyệt mảng). Tổng = $O(n \log(\text{range}))$. Với range ~ tổng giá trị (cỡ $10^9$), $\log$ ~ 30 → cực nhanh.

---

## 6. Search trong mảng xoay (rotated sorted array)

**Đề (LeetCode 33):** Mảng sorted tăng dần bị **xoay** tại một điểm chưa biết, ví dụ `[7,9,11,1,3,5]` (gốc `[1,3,5,7,9,11]` xoay). Không có phần tử trùng. Tìm `target` với O(log n).

> 💡 **Trực giác.** Mảng xoay = hai đoạn sorted nối nhau. Khi cắt ở `mid`, **một trong hai nửa luôn còn sorted hoàn chỉnh** (vì chỉ có một điểm "gãy"). Ta xác định nửa nào sorted, kiểm tra target có nằm trong khoảng giá trị của nửa sorted đó không → quyết định vứt nửa nào. Vẫn loại nửa mỗi bước → O(log n).

**Quy tắc:** tại `mid`:
- Nếu `a[lo] <= a[mid]` → **nửa trái `[lo, mid]` sorted**. Nếu `a[lo] <= target < a[mid]` → target ở trái (`hi = mid-1`), ngược lại ở phải (`lo = mid+1`).
- Ngược lại → **nửa phải `[mid, hi]` sorted**. Nếu `a[mid] < target <= a[hi]` → target ở phải, ngược lại ở trái.

### 6.1 Walk-through — tìm `5` trong `[7,9,11,1,3,5]`

index 0..5, target=5.

| Bước | lo | hi | mid | a[mid] | Nửa nào sorted | Kiểm tra | Hành động |
|:----:|:--:|:--:|:---:|:------:|----------------|----------|-----------|
| 1 | 0 | 5 | 2 | 11 | a[0]=7≤11 → **trái sorted** [7..11] | target 5 ∈ [7,11)? Không | lo = 3 |
| 2 | 3 | 5 | 4 | 3 | a[3]=1≤3 → **trái sorted** [1..3] | 5 ∈ [1,3)? Không | lo = 5 |
| 3 | 5 | 5 | 5 | 5 | a[5]==5 | == target | **trả 5** ✓ |

### 6.2 Thêm ví dụ — tìm `7` (phần tử đầu của đoạn lớn) và `4` (không tồn tại)

- **Tìm 7:** lo=0,hi=5,mid=2,a[2]=11. Trái sorted [7,11]. 7∈[7,11)? Có (7≤7<11) → hi=1. lo=0,hi=1,mid=0,a[0]=7==7→**trả 0**.
- **Tìm 4:** lo=0,hi=5,mid=2,a[2]=11,trái sorted,4∈[7,11)?Không→lo=3. lo=3,hi=5,mid=4,a[4]=3,a[3]=1≤3 trái sorted[1,3],4∈[1,3)?Không→lo=5. lo=5,hi=5,mid=5,a[5]=5≠4. lo>hi sau khi... a[5]=5>4 → hi=4. lo=5>hi=4→**trả -1**.

### 6.3 Code Go — `searchRotated`

```go
// searchRotated tìm target trong mảng sorted-rồi-xoay (không trùng).
// O(log n): mỗi bước xác định nửa nào còn sorted để loại nửa kia.
func searchRotated(a []int, target int) int {
	lo, hi := 0, len(a)-1
	for lo <= hi {
		mid := lo + (hi-lo)/2
		if a[mid] == target {
			return mid
		}
		if a[lo] <= a[mid] { // nửa trái [lo, mid] sorted
			if a[lo] <= target && target < a[mid] {
				hi = mid - 1 // target trong nửa trái sorted
			} else {
				lo = mid + 1 // ở nửa phải
			}
		} else { // nửa phải [mid, hi] sorted
			if a[mid] < target && target <= a[hi] {
				lo = mid + 1 // target trong nửa phải sorted
			} else {
				hi = mid - 1 // ở nửa trái
			}
		}
	}
	return -1
}
```

> ⚠ **Lỗi thường gặp.** Dùng `<` thay `<=` ở `a[lo] <= a[mid]`. Khi khoảng còn 1-2 phần tử, `lo == mid`, thiếu dấu `=` sẽ phân loại sai nửa sorted → bỏ sót. Luôn dùng `<=`.

---

## 7. Search trong ma trận sorted (2D)

**Đề (LeetCode 74):** Ma trận `m × n`, mỗi hàng sorted tăng, và phần tử đầu mỗi hàng > phần tử cuối hàng trước. Tức nếu **trải phẳng** theo thứ tự hàng, toàn bộ là một mảng sorted. Tìm `target` với O(log(m·n)).

> 💡 **Trực giác.** Ma trận này thực chất là **một mảng sorted dài m·n phần tử** được "gập" thành lưới. Ta binary search trên index ảo `0 .. m·n−1`, chuyển index `idx` về tọa độ `(idx / n, idx % n)`.

### 7.1 Walk-through

```
matrix = [[1,  3,  5,  7],
          [10, 11, 16, 20],
          [23, 30, 34, 60]]
```
`m=3, n=4`, tổng 12 phần tử, index ảo 0..11. Trải phẳng: `[1,3,5,7,10,11,16,20,23,30,34,60]`. Tìm `target = 16`.

| Bước | lo | hi | mid | (r,c)=(mid/4,mid%4) | matrix[r][c] | So sánh | Hành động |
|:----:|:--:|:--:|:---:|:-------------------:|:------------:|---------|-----------|
| 1 | 0 | 11 | 5 | (1,1) | 11 | 11<16 | lo = 6 |
| 2 | 6 | 11 | 8 | (2,0) | 23 | 23>16 | hi = 7 |
| 3 | 6 | 7 | 6 | (1,2) | 16 | ==16 | **tìm thấy** ✓ |

### 7.2 Code Go

```go
// searchMatrix tìm target trong ma trận row-sorted với hàng nối tiếp.
// Coi như mảng 1D có m*n phần tử; ánh xạ index ảo idx -> (idx/n, idx%n).
func searchMatrix(matrix [][]int, target int) bool {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return false
	}
	m, n := len(matrix), len(matrix[0])
	lo, hi := 0, m*n-1
	for lo <= hi {
		mid := lo + (hi-lo)/2
		v := matrix[mid/n][mid%n] // ánh xạ 1D -> 2D
		switch {
		case v == target:
			return true
		case v < target:
			lo = mid + 1
		default:
			hi = mid - 1
		}
	}
	return false
}
```

> 📝 **Lưu ý.** Nếu ma trận chỉ sorted *theo cả hàng và cột* nhưng hàng **không** nối tiếp (LeetCode 240), kỹ thuật này *không* dùng được — phải dùng "staircase search" từ góc trên-phải, O(m+n). Hai bài dễ nhầm.

---

## 8. Khi nào dùng binary search?

Hai dấu hiệu chính:

1. **Input đã sorted** (hoặc xoay từ sorted) → search/lower/upper bound trực tiếp.
2. **Đáp án đơn điệu** → binary search on answer, kể cả khi *không có mảng*.

**Điều kiện cốt lõi cho cả hai: predicate đơn điệu.** Tức tồn tại hàm `check(x)` mà giá trị của nó theo `x` có dạng `F F F ... T T T` (hoặc `T...T F...F`). Khi đó tồn tại **một biên duy nhất**, và ta tìm biên đó (T đầu tiên) bằng binary search.

> 💡 **Cách kiểm tra nhanh "đơn điệu không?"** Tự hỏi: *"Nếu x thỏa điều kiện, thì x+1 (lớn hơn) có chắc thỏa không?"* Nếu **có** với mọi x → đơn điệu tăng → dùng được. Nếu câu trả lời "tùy" → **không** đơn điệu → binary search sai.

Ví dụ phân loại:
- "Tìm số trong mảng sorted" → sorted → ✓.
- "Capacity nhỏ nhất ship D ngày" → cap↑ ⇒ dễ thỏa → đơn điệu → ✓.
- "Tìm số xuất hiện nhiều nhất trong mảng *không* sorted" → không đơn điệu, không sorted → ✗ (dùng hash map).

---

## 9. Template thống nhất — "find first true"

Thay vì nhớ 5 biến thể, dùng **một** template: cho predicate `pred(x)` đơn điệu kiểu `F...F T...T` trên khoảng `[lo, hi)`, tìm **x nhỏ nhất sao cho `pred(x)` đúng**.

```go
// firstTrue tìm x nhỏ nhất trong [lo, hi) sao cho pred(x) == true.
// Giả định pred đơn điệu: F F F ... T T T. Nếu không có x nào true,
// trả hi. Đây là KHUNG dùng được cho MỌI biến thể binary search.
func firstTrue(lo, hi int, pred func(int) bool) int {
	for lo < hi {
		mid := lo + (hi-lo)/2
		if pred(mid) {
			hi = mid // mid có thể là biên T-đầu → giữ [lo, mid)
		} else {
			lo = mid + 1 // mid là F → biên ở bên phải
		}
	}
	return lo // lo == hi == biên T đầu tiên
}
```

**Mọi biến thể quy về template này:**

```go
// lowerBound qua template: pred(i) = (a[i] >= x)
func lowerBoundT(a []int, x int) int {
	return firstTrue(0, len(a), func(i int) bool { return a[i] >= x })
}

// upperBound qua template: pred(i) = (a[i] > x)
func upperBoundT(a []int, x int) int {
	return firstTrue(0, len(a), func(i int) bool { return a[i] > x })
}

// shipWithinDays qua template: pred(cap) = (daysNeeded(w, cap) <= D)
func shipWithinDaysT(w []int, D int) int {
	lo, hi := 0, 0
	for _, x := range w {
		if x > lo {
			lo = x
		}
		hi += x
	}
	// search trên [lo, hi+1) vì hi cũng là đáp án hợp lệ
	return firstTrue(lo, hi+1, func(cap int) bool {
		return daysNeeded(w, cap) <= D
	})
}
```

> 💡 **Vì sao template này không bao giờ treo?** Mỗi vòng: nhánh `pred` đúng làm `hi = mid` (và `mid < hi` vì `mid = lo+(hi-lo)/2 < hi` khi `lo < hi`), nhánh sai làm `lo = mid+1 > lo`. Khoảng *luôn* co lại ít nhất 1 → kết thúc sau $O(\log(hi-lo))$ bước. Không có cách viết `lo = mid` gây treo.

> 🔁 **Dừng lại tự kiểm tra.** Viết "tìm last occurrence" qua `firstTrue`?
>
> <details><summary>Đáp án</summary>
>
> last occurrence = `upperBoundT(a, target) - 1` rồi kiểm tra `a[idx]==target`. Hoặc trực tiếp: `firstTrue(0, len(a), func(i int) bool { return a[i] > target }) - 1`. Cùng ý tưởng.
> </details>

---

## 10. Độ phức tạp

| Biến thể | Thời gian | Bộ nhớ | Ghi chú |
|----------|-----------|--------|---------|
| binarySearch | O(log n) | O(1) | n = số phần tử |
| lowerBound / upperBound | O(log n) | O(1) | |
| first / last occurrence | O(log n) | O(1) | 2 lần binary search |
| searchRotated | O(log n) | O(1) | không trùng; có trùng → worst O(n) |
| searchMatrix (row-nối tiếp) | O(log(m·n)) = O(log m + log n) | O(1) | |
| binary search on answer | O(log(range) × cost_check) | O(1) | range = độ rộng không gian đáp án |

**Vì sao O(log n)?** Mỗi bước loại bỏ một nửa. Sau $k$ bước còn $n / 2^k$ phần tử; dừng khi còn 1 → $n/2^k = 1$ → $k = \log_2 n$. Recurrence: $T(n) = T(n/2) + O(1) = O(\log n)$ ([Lesson 03](../lesson-03-recursion-recurrence/), Master Theorem trường hợp $a=1, b=2$).

**Binary search on answer:** số bước = $\log_2(hi - lo)$, mỗi bước gọi `check` tốn `cost_check` (thường $O(n)$). Ví dụ ship: range = sum ~ tối đa ~$5 \times 10^8$, $\log_2 \approx 29$, mỗi check $O(n)$ → tổng $O(29n)$ — gần như tuyến tính, nhanh hơn nhiều brute-force thử mọi capacity $O(\text{range} \times n)$.

> 📝 **Tóm tắt mục 10.**
> - Search trên mảng: O(log n).
> - Search on answer: O(log(range) × check). $\log(\text{range})$ thường ~30-60 → coi như hằng nhỏ.
> - Bộ nhớ luôn O(1) (bản lặp).

---

## 11. Cạm bẫy tổng hợp (checklist tránh bug)

| Cạm bẫy | Triệu chứng | Cách tránh |
|---------|-------------|-----------|
| **Overflow `mid`** | crash/index âm với mảng cực lớn (Java/C 32-bit) | `mid = lo + (hi-lo)/2` |
| **Off-by-one** (`lo=mid` thay `mid+1`) | **vòng lặp vô hạn** (treo) | luôn để khoảng co lại; dùng template `firstTrue` |
| **Quên mảng phải sorted** | trả kết quả sai, không lỗi rõ | kiểm tra/đảm bảo sorted trước (hoặc sort O(n log n)) |
| **Trộn kiểu khoảng** (`hi=len` nhưng `hi=mid-1`) | bỏ sót/vượt biên | chọn 1 kiểu khoảng, nhất quán mọi cập nhật |
| **Predicate không monotonic** | binary search on answer trả lung tung | kiểm tra "x thỏa ⇒ x+1 thỏa?" trước khi dùng |
| **lower/upper nhầm `>=` ↔ `>`** | first/last sai 1 vị trí | lower=`>=`, upper=`>`; nhớ "lower lỏng hơn" |
| **Rotated dùng `<` thay `<=`** | bỏ sót khi khoảng còn 1-2 phần tử | `a[lo] <= a[mid]` |

> ⚠ **Bug "kinh điển" số 1 ngoài đời:** quên rằng mảng **chưa sorted**. Binary search không báo lỗi khi mảng lộn xộn — nó chỉ *im lặng trả sai*. Luôn kiểm tra tiền điều kiện.

---

## 12. Ứng dụng thực tế trong phần mềm

> 💡 **Binary search không chỉ "tìm số trong mảng" — kỹ thuật mạnh nhất là "binary search trên KHÔNG GIAN ĐÁP ÁN".** Bất cứ khi nào hàm đơn điệu (monotonic), bạn tìm ngưỡng bằng $O(\log n)$.

| Ứng dụng | Binary search làm gì |
|----------|----------------------|
| **DB index, `sort.Search`, từ điển sắp xếp** | Tra cứu $O(\log n)$ trên dữ liệu đã sắp |
| **`git bisect`** | Tìm commit gây bug = binary search trên lịch sử commit |
| **Tìm phiên bản tương thích (npm/go mod)** | Binary search ngày/version để khoanh vùng lỗi |
| **Binary search on answer** | "Tốc độ tối thiểu để xong việc trong T giờ?", "dung lượng nhỏ nhất chia K phần?" |
| **Rate limiter / capacity tuning** | Tìm ngưỡng lớn nhất còn thỏa điều kiện |

### 12.1. Ví dụ cụ thể — `git bisect` và "binary search on answer"

**`git bisect`**: có 1000 commit, bug xuất hiện đâu đó. Thay vì kiểm từng commit ($O(n)$), git bisect hỏi "commit giữa có bug không?" → loại nửa lịch sử mỗi lần → ~10 bước tìm ra commit lỗi. Đúng binary search.

**Binary search on answer**: "Chuyển $n$ kiện hàng trong $D$ ngày, tải trọng tàu **nhỏ nhất** là bao nhiêu?" Hàm "tải trọng X có đủ chở trong D ngày không?" là **đơn điệu** (X lớn hơn → dễ hơn). Binary search trên X tìm ngưỡng nhỏ nhất thỏa → $O(n \log(\text{range}))$. Đây là pattern cực phổ biến trong tối ưu năng lực hệ thống (capacity planning, rate limit, scaling).

> ❓ **"Làm sao biết bài toán dùng được binary search on answer?"** Khi đáp án có tính **đơn điệu**: "nếu X thỏa thì mọi giá trị lớn hơn (hoặc nhỏ hơn) cũng thỏa". Lúc đó tìm ngưỡng = binary search, biến bài "thử mọi X" $O(\text{range})$ thành $O(\log \text{range})$.

### 12.2. 📝 Tóm tắt mục 12

- Binary search thật trong: **DB index/`sort.Search`**, **`git bisect`**, **tìm version lỗi**, và mạnh nhất là **binary search on answer**.
- "On answer": hàm điều kiện **đơn điệu** → tìm ngưỡng $O(\log \text{range})$; dùng cho capacity/rate/scaling.
- Tiền đề bắt buộc: dữ liệu **đã sắp** (hoặc điều kiện đơn điệu) — nếu không, kết quả sai âm thầm.

## Bài tập

> Làm trước khi xem lời giải. Mỗi bài tự hỏi: "predicate đơn điệu của tôi là gì? khoảng [lo,hi) là gì?".

1. **First & last occurrence.** Cho mảng sorted có trùng và `target`, trả `[first, last]` index. Nếu không có, trả `[-1, -1]`. Ví dụ `[5,7,7,8,8,10]`, target=8 → `[3,4]`.
2. **Insertion position.** Cho mảng sorted *không trùng* và `target`, trả index nơi chèn target để giữ sorted (LeetCode 35). Ví dụ `[1,3,5,6]`, target=2 → 1; target=7 → 4.
3. **Sqrt nguyên (binary search on answer).** Cho $x$ không âm, trả $\lfloor \sqrt{x} \rfloor$ (phần nguyên của căn) **không dùng** hàm sqrt có sẵn (LeetCode 69). Ví dụ x=8 → 2 (vì $2^2=4 \leq 8 < 9=3^2$).
4. **Koko ăn chuối.** Cài `minEatingSpeed(piles, H)` (đã có walk-through ở mục 5.3) và giải thích vì sao monotonic.
5. **Search rotated.** Cài `searchRotated` và trả lời: nếu mảng có **trùng** (LeetCode 81) thì độ phức tạp worst case là bao nhiêu? Vì sao?
6. **Minimize max — Split Array Largest Sum (binary search on answer).** Chia mảng `nums` thành `k` đoạn liên tiếp sao cho **tổng lớn nhất của một đoạn là nhỏ nhất** (LeetCode 410). Ví dụ `nums=[7,2,5,10,8]`, k=2 → 18 (chia `[7,2,5]=14` và `[10,8]=18`).

---

## Lời giải chi tiết

### Bài 1 — First & last occurrence

**Cách tiếp cận.** Dùng `lowerBound` cho first, `upperBound − 1` cho last, kiểm tra tồn tại.

```go
func searchRange(a []int, target int) [2]int {
	lo := lowerBound(a, target)
	if lo == len(a) || a[lo] != target {
		return [2]int{-1, -1} // target không tồn tại
	}
	hi := upperBound(a, target) - 1
	return [2]int{lo, hi}
}
```

**Walk-through** `[5,7,7,8,8,10]`, target=8: `lowerBound(8)`: a[3]=8 là phần tử ≥8 trái nhất → 3. `a[3]=8==8` ✓. `upperBound(8)`: phần tử >8 trái nhất là a[5]=10 → 5, last = 5−1 = 4. Trả `[3,4]` ✓.

**Big-O:** O(log n) (hai binary search độc lập), O(1) bộ nhớ.

### Bài 2 — Insertion position

**Cách tiếp cận.** Vị trí chèn = số phần tử `< target` = `lowerBound(target)` (vì lowerBound trả index đầu tiên `≥ target`, đúng là chỗ chèn).

```go
func searchInsert(a []int, target int) int {
	return lowerBound(a, target) // index đầu tiên a[i] >= target
}
```

**Walk-through** `[1,3,5,6]`:
- target=2: lowerBound→ a[1]=3 là phần tử đầu ≥2 → **1** ✓ (chèn giữa 1 và 3).
- target=7: không phần tử nào ≥7 → trả len = **4** ✓ (chèn cuối).
- target=5: a[2]=5 ≥5 → **2** ✓ (chèn ngay tại vị trí 5 hiện có).

**Big-O:** O(log n), O(1).

### Bài 3 — Sqrt nguyên (binary search on answer)

**Cách tiếp cận.** Không gian đáp án: `k` trong `[0, x]`. Predicate "ngược": ta tìm `k` lớn nhất sao cho `k*k <= x`. Tương đương: `pred(k) = (k*k > x)` đơn điệu `F...F T...T`; `firstTrue` cho `k` đầu tiên mà `k*k > x`, đáp án = `k − 1`.

```go
func mySqrt(x int) int {
	// tìm k đầu tiên mà k*k > x trong [0, x+1), trừ 1
	k := firstTrue(0, x+1, func(k int) bool { return k*k > x })
	return k - 1
}
```

**Walk-through** x=8: tìm k đầu mà `k²>8`. k=0→0>8?F; ... binary search: lo=0,hi=9,mid=4,16>8?T→hi=4. mid=2,4>8?F→lo=3. mid=3,9>8?T→hi=3. lo=3,hi=3 dừng→firstTrue=3, đáp án 3−1=**2** ✓. (Kiểm tra 4 ví dụ: x=0→0, x=1→1, x=4→2, x=15→3 vì 3²=9≤15<16.)

**Lưu ý overflow:** `k*k` với `k` lớn có thể tràn — trong Go int64 ổn tới $\approx 3 \times 10^9$; ngôn ngữ khác nên so `k <= x/k`.

**Big-O:** O(log x), O(1).

### Bài 4 — Koko ăn chuối

**Cách tiếp cận & code:** đã trình bày đầy đủ ở mục 5.3. 

**Vì sao monotonic:** với tốc độ $k$, giờ cần = $\sum \lceil \text{pile}/k \rceil$. Khi $k$ tăng, mỗi $\lceil \text{pile}/k \rceil$ **không tăng** (chia cho số lớn hơn) → tổng giờ **không tăng** → nếu $k$ thỏa $\leq H$ thì mọi $k' > k$ cũng thỏa. Đó là `F...F T...T` → binary search hợp lệ.

**Walk-through:** xem bảng mục 5.3, đáp án k=4 cho `piles=[3,6,7,11]`, H=8.

**Big-O:** O(n log(max_pile)), O(1).

### Bài 5 — Search rotated (có/không trùng)

**Không trùng:** `searchRotated` ở mục 6.3 — **$O(\log n)$**, vì luôn xác định được nửa nào sorted nhờ so sánh `a[lo]` với `a[mid]`.

**Có trùng (LeetCode 81):** khi `a[lo] == a[mid] == a[hi]` (ví dụ `[1,1,1,2,1]`), ta **không biết** nửa nào sorted → phải bỏ qua từng phần tử ở biên (`lo++; hi--`). Worst case mọi phần tử bằng nhau (`[2,2,2,2,2]` tìm 3) → suy biến thành **O(n)** tuyến tính.

```go
func searchRotatedDup(a []int, target int) bool {
	lo, hi := 0, len(a)-1
	for lo <= hi {
		mid := lo + (hi-lo)/2
		if a[mid] == target {
			return true
		}
		if a[lo] == a[mid] && a[mid] == a[hi] {
			lo++ // không phân biệt được nửa sorted → thu hẹp từ từ
			hi--
		} else if a[lo] <= a[mid] {
			if a[lo] <= target && target < a[mid] {
				hi = mid - 1
			} else {
				lo = mid + 1
			}
		} else {
			if a[mid] < target && target <= a[hi] {
				lo = mid + 1
			} else {
				hi = mid - 1
			}
		}
	}
	return false
}
```

**Big-O:** trung bình O(log n), **worst O(n)** khi nhiều phần tử trùng.

### Bài 6 — Split Array Largest Sum (minimize max)

**Cách tiếp cận.** Không gian đáp án = giá trị "tổng lớn nhất của một đoạn", nằm trong `[max(nums), sum(nums)]`. Predicate: `canSplit(limit)` = có thể chia thành `≤ k` đoạn mà mỗi đoạn tổng `≤ limit` (greedy). `limit` càng lớn → cần càng *ít* đoạn → dễ thỏa `≤ k` → đơn điệu `F...F T...T`. Tìm `limit` nhỏ nhất (T đầu).

```go
// segmentsNeeded: số đoạn tối thiểu sao cho mỗi đoạn tổng <= limit (greedy).
func segmentsNeeded(nums []int, limit int) int {
	segs, sum := 1, 0
	for _, x := range nums {
		if sum+x > limit {
			segs++
			sum = 0
		}
		sum += x
	}
	return segs
}

func splitArray(nums []int, k int) int {
	lo, hi := 0, 0
	for _, x := range nums {
		if x > lo {
			lo = x // limit >= phần tử lớn nhất
		}
		hi += x // limit = tổng → 1 đoạn
	}
	return firstTrue(lo, hi+1, func(limit int) bool {
		return segmentsNeeded(nums, limit) <= k
	})
}
```

**Walk-through** `nums=[7,2,5,10,8]`, k=2. `lo=max=10`, `hi=sum=32`.
- mid=21: segs với limit21: [7,2,5]=14(+10=24>21→cắt),[10,8]=18 → 2 đoạn ≤2? T → hi=21.
- mid=15: [7,2,5]=14(+10>15→cắt),[10]=10(+8=18>15→cắt),[8] → 3 đoạn >2 → F → lo=16.
- mid=18: [7,2,5]=14(+10=24>18→cắt),[10,8]=18 → 2 đoạn ≤2 → T → hi=18.
- mid=17: [7,2,5]=14(+10>17),[10]=10(+8=18>17),[8] → 3 đoạn → F → lo=18.
- lo==hi==18 → **trả 18** ✓ (chia `[7,2,5]=14`, `[10,8]=18`; max = 18 nhỏ nhất).

**Big-O:** O(n × log(sum − max)), O(1).

---

## Code & Minh họa

- Mọi code Go ở trên **inline trong README** — copy vào file `main.go` cùng một `package main` là chạy được (cần thêm `import "math"`/`"fmt"` khi dùng). Bài này **không** kèm `solutions.go` riêng.
- [visualization.html](./visualization.html) — 3 module tương tác:
  1. **Binary search animator** — nhập mảng + target, xem `lo/hi/mid` highlight, vùng bị loại mờ dần, đếm số bước so với $\lceil \log_2 n \rceil$.
  2. **Lower/Upper bound** — mảng có phần tử trùng, animate tìm biên trái (lower) và biên phải (upper).
  3. **Binary search on answer** — bài ship capacity: trượt số ngày D, xem dãy predicate `F → T` theo capacity và quá trình search trên không gian đáp án.

---

## Bài tiếp theo

[Lesson 13 — Two Pointers](../lesson-13-two-pointers/) — kỹ thuật hai con trỏ (đối đầu, cùng chiều, fast-slow). Cùng tinh thần "thu hẹp không gian" như binary search nhưng trên cấu trúc tuyến tính, thường kết hợp với mảng sorted (mà binary search cũng cần).

**Tham khảo chéo:**
- [Tier 1 — Sorting](../tier-1-sorting/index.html) — để binary search được, dữ liệu phải sorted.
- [Lesson 03 — Đệ quy & Recurrence](../lesson-03-recursion-recurrence/) — $T(n)=T(n/2)+O(1)$.
- [Lesson 17 — Divide & Conquer](../lesson-17-divide-and-conquer/) — binary search là D&C đơn giản nhất (chỉ 1 nhánh đệ quy).
