# Lesson 44 — Cấu trúc hậu tố (Suffix Structures): Suffix Array, LCP, giới thiệu Suffix Automaton

> **Tier 6 — Thuật toán chuỗi · Bài cuối Tier.** Đây là điểm dừng tổng kết cho nhánh chuỗi: sau Rabin-Karp (L40), KMP (L41), Z-algorithm (L42) và Trie/Aho-Corasick (L43) — vốn xoay quanh **tìm pattern trong text**, bài này chuyển sang một câu hỏi khác: *làm sao trả lời NHIỀU câu hỏi về MỘT text cố định cho thật nhanh?* Câu trả lời là tiền xử lý text thành một cấu trúc hậu tố.

## Mục tiêu học tập

Sau bài này, bạn sẽ:

- Hiểu **suffix array (SA)** là gì: mảng các vị trí bắt đầu của hậu tố, sắp xếp theo thứ tự từ điển.
- Tự xây được SA bằng **prefix doubling** O(n log² n) / O(n log n), biết tại sao naive sort là O(n² log n).
- Tính **LCP array** bằng **Kasai's algorithm** O(n) và hiểu vì sao nó chạy được trong tuyến tính.
- Dùng SA + LCP để giải: **pattern matching** O(m log n), **đếm số substring phân biệt**, **longest repeated substring**, **longest common substring** của 2 chuỗi.
- Nắm khái niệm **suffix tree** và **suffix automaton** ở mức giới thiệu, biết khi nào chọn cấu trúc nào.

## Kiến thức tiền đề

- [Lesson 12 — Binary Search Variants](../lesson-12-binary-search-variants/) — tìm pattern trên SA dựa hoàn toàn vào binary search trên mảng đã sắp.
- [Lesson 10 — Non-comparison Sorts](../lesson-10-non-comparison-sorts/) — prefix doubling dùng radix/counting sort để đạt O(n log n).
- [Lesson 40 — Rabin-Karp](../lesson-40-string-matching-rabin-karp/), [Lesson 41 — KMP](../lesson-41-kmp/), [Lesson 43 — Trie & Aho-Corasick](../lesson-43-trie-aho-corasick/) — các cách tiếp cận pattern matching khác để so sánh.

---

## 0. Đặt vấn đề: vì sao cần một cấu trúc hậu tố?

Giả sử bạn có **một** quyển sách 1 triệu ký tự (text cố định `T`), và sẽ nhận **hàng nghìn** truy vấn dạng "chuỗi `P` có xuất hiện trong sách không? bao nhiêu lần? ở đâu?".

- Nếu mỗi truy vấn chạy KMP/Z lại từ đầu: mỗi lần O(n + m) với n = 1.000.000. Một nghìn truy vấn = O(1000 × n) ≈ 10⁹ thao tác — chậm.
- Ý tưởng cốt lõi: **mọi lần xuất hiện của `P` trong `T` đều là một tiền tố (prefix) của một hậu tố (suffix) nào đó của `T`.** Nếu ta sắp xếp **tất cả hậu tố** của `T` theo thứ tự từ điển, các hậu tố bắt đầu bằng `P` sẽ nằm **liền kề nhau** thành một đoạn → tìm đoạn đó bằng **binary search** chỉ tốn O(m log n) cho mỗi truy vấn, sau khi đã tiền xử lý một lần.

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng bạn cắt quyển sách thành mọi "đoạn đuôi" có thể: từ ký tự 0 đến hết, từ ký tự 1 đến hết, ... Mỗi đoạn đuôi là một **hậu tố**. Bạn sắp xếp các đoạn này theo bảng chữ cái như sắp từ trong từ điển. Bây giờ muốn tra một từ `P`, bạn lật từ điển (binary search) tới chỗ các đoạn bắt đầu bằng `P` — y hệt tra từ điển giấy. **Suffix array chính là "danh mục mục lục" của text.**

Câu hỏi tu từ trên — *"trả lời nghìn truy vấn cho nhanh"* — được đóng ngay trong bài này: tiền xử lý O(n log n) một lần, rồi mỗi truy vấn O(m log n). Ta sẽ xây từng mảnh.

---

## 1. Suffix array là gì?

> 💡 **Trực giác.** Suffix array **không** lưu các chuỗi hậu tố (tốn O(n²) bộ nhớ). Nó chỉ lưu **vị trí bắt đầu** của mỗi hậu tố, theo đúng thứ tự từ điển. Một mảng số nguyên độ dài n — gọn nhẹ.

**Định nghĩa.** Cho chuỗi `T` độ dài n (chỉ số 0..n-1). Hậu tố thứ `i`, ký hiệu `suf(i)`, là `T[i..n-1]`. **Suffix array** `sa[]` là hoán vị của `{0, 1, ..., n-1}` sao cho:

```
suf(sa[0]) < suf(sa[1]) < ... < suf(sa[n-1])    (theo thứ tự từ điển)
```

Nói cách khác `sa[k]` = vị trí bắt đầu của hậu tố đứng **thứ k** khi sắp xếp.

### 1.1 Walk-through "banana"

Chuỗi `T = "banana"`, n = 6. Liệt kê 6 hậu tố kèm vị trí bắt đầu:

| i | suf(i) = T[i..] |
|---|------------------|
| 0 | `banana` |
| 1 | `anana` |
| 2 | `nana` |
| 3 | `ana` |
| 4 | `na` |
| 5 | `a` |

Sắp xếp 6 hậu tố này theo từ điển (so sánh ký tự từ trái sang phải):

| thứ tự k | suffix (sorted) | vị trí bắt đầu = sa[k] |
|----------|-----------------|------------------------|
| 0 | `a` | 5 |
| 1 | `ana` | 3 |
| 2 | `anana` | 1 |
| 3 | `banana` | 0 |
| 4 | `na` | 4 |
| 5 | `nana` | 2 |

Vậy **`sa = [5, 3, 1, 0, 4, 2]`**.

Giải thích vài bước so sánh để không "lươn lẹo":
- `a` < `ana`: ký tự đầu cùng là `a`, nhưng `a` hết chuỗi trước → chuỗi ngắn hơn đứng trước (quy ước từ điển: tiền tố đứng trước).
- `ana` < `anana`: cùng `ana`, rồi `a`(hết) vs `na` → `ana` hết trước → đứng trước.
- `anana` < `banana`: ký tự đầu `a` < `b`.
- `banana` < `na`: `b` < `n`.
- `na` < `nana`: cùng `na`, rồi hết vs `na` → `na` đứng trước.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Có hai hậu tố bằng nhau không?"* — Không bao giờ. Hai hậu tố khác vị trí bắt đầu thì có độ dài khác nhau, nên không thể bằng nhau hoàn toàn → SA luôn xác định duy nhất.
> - *"Tại sao chuỗi ngắn hơn đứng trước khi là tiền tố?"* — Đó là quy ước thứ tự từ điển chuẩn (`"a" < "ab"`). Một số người cài đặt thêm ký tự sentinel `$` nhỏ nhất ở cuối để mọi hậu tố cùng kết thúc — khi đó so sánh sạch hơn (xem mục 10).

### 1.2 Mảng nghịch đảo `rank` (hay `pos`)

Đi kèm SA thường có mảng `rank[]` (còn gọi `pos[]` hoặc `isa[]` — inverse suffix array): `rank[i]` = thứ hạng của hậu tố bắt đầu tại `i`. Nó là **nghịch đảo** của `sa`: nếu `sa[k] = i` thì `rank[i] = k`.

Với "banana": `sa = [5,3,1,0,4,2]` → `rank = [3,2,5,1,4,0]` (vì sa[0]=5 nên rank[5]=0; sa[3]=0 nên rank[0]=3; ...).

> ⚠ **Lỗi thường gặp.** Lẫn lộn `sa` và `rank`. Nhớ: **`sa[k]` = "hậu tố thứ k bắt đầu ở đâu"**, còn **`rank[i]` = "hậu tố bắt đầu ở i đứng thứ mấy"**. Chúng nghịch đảo nhau: `rank[sa[k]] = k`. Dùng nhầm chiều là bug kinh điển trong prefix doubling và Kasai.

> 🔁 **Dừng lại tự kiểm tra.** Cho `T = "abab"`. Liệt kê 4 hậu tố, sắp xếp, viết `sa` và `rank`.
> <details><summary>Đáp án</summary>
>
> Hậu tố: suf(0)=`abab`, suf(1)=`bab`, suf(2)=`ab`, suf(3)=`b`.
> Sắp xếp: `ab`(2) < `abab`(0) < `b`(3) < `bab`(1).
> Vậy `sa = [2, 0, 3, 1]`, `rank = [1, 3, 0, 2]`.
> </details>

> 📝 **Tóm tắt mục 1.** Suffix array = mảng vị trí bắt đầu của hậu tố sắp theo từ điển, gọn O(n). `rank` là nghịch đảo của `sa`. Cả hai luôn xác định duy nhất.

---

## 2. Xây suffix array

### 2.1 Naive — sort trực tiếp các chuỗi: O(n² log n)

Cách thẳng tuột: tạo n chuỗi hậu tố, sort bằng comparator so sánh chuỗi.

```go
// Naive: O(n^2 log n) — KHÔNG dùng cho n lớn, chỉ để hiểu định nghĩa.
func suffixArrayNaive(s string) []int {
    n := len(s)
    sa := make([]int, n)
    for i := range sa {
        sa[i] = i
    }
    sort.Slice(sa, func(a, b int) bool {
        // so sánh hai hậu tố s[sa[a]:] và s[sa[b]:] — mỗi lần tốn O(n)
        return s[sa[a]:] < s[sa[b]:]
    })
    return sa
}
```

> ⚠ **Cạm bẫy hiệu năng.** `s[sa[a]:] < s[sa[b]:]` trông gọn nhưng mỗi phép so sánh chuỗi tốn tới O(n), và sort gọi comparator O(n log n) lần → **O(n² log n)**. Với n = 10⁶ là vô vọng (10¹⁸ thao tác). Đây là phiên bản minh họa định nghĩa, **không dùng production**. Bản đúng là prefix doubling bên dưới.

### 2.2 Prefix doubling — O(n log² n) → O(n log n)

> 💡 **Trực giác.** Thay vì so sánh nguyên hậu tố (đắt), ta sắp xếp các hậu tố **theo từng tiền tố độ dài 2^k** rồi tăng dần k: 1, 2, 4, 8, ... Mỗi vòng tận dụng kết quả vòng trước. Sau ⌈log₂ n⌉ vòng, mọi hậu tố đã được phân biệt hoàn toàn (vì hậu tố dài nhất chỉ n ký tự).

**Ý tưởng then chốt — ghép cặp rank.** Sau khi đã sắp xếp theo 2^(k-1) ký tự đầu (có mảng `rank`), để sắp theo 2^k ký tự đầu của hậu tố `i`, ta dùng cặp khóa:

```
key(i) = ( rank của 2^(k-1) ký tự đầu của suf(i),
           rank của 2^(k-1) ký tự đầu của suf(i + 2^(k-1)) )
```

Tức là tiền tố 2^k ký tự = "nửa trái 2^(k-1) ký tự" nối "nửa phải 2^(k-1) ký tự". Cả hai nửa **đã** có rank từ vòng trước → so sánh hai cặp số (O(1)) thay vì so sánh chuỗi. Nếu `i + 2^(k-1) ≥ n`, nửa phải coi như rank = -1 (nhỏ nhất, vì hậu tố ngắn đứng trước).

#### Walk-through "banana" theo prefix doubling

`T = "banana"`, n = 6. Gán mã: a=97, b=98, n=110.

**Vòng k=0 (sắp theo 1 ký tự đầu):** rank ban đầu = mã ký tự (hoặc rank hóa). Ký tự tại mỗi vị trí:
```
i:    0   1   2   3   4   5
char: b   a   n   a   n   a
rank: 1   0   2   0   2   0    (a→0, b→1, n→2)
```

**Vòng k=1 (sắp theo 2 ký tự đầu):** key(i) = (rank[i], rank[i+1]) với rank[i+1]=-1 nếu vượt biên.
```
i=0: (1, rank[1]=0) = (1,0)   "ba"
i=1: (0, rank[2]=2) = (0,2)   "an"
i=2: (2, rank[3]=0) = (2,0)   "na"
i=3: (0, rank[4]=2) = (0,2)   "an"
i=4: (2, rank[5]=0) = (2,0)   "na"
i=5: (0, -1)        = (0,-1)  "a"
```
Sắp xếp theo cặp: (0,-1)@5 < (0,2)@1 = (0,2)@3 < (1,0)@0 < (2,0)@2 = (2,0)@4.
Rank mới (cặp bằng nhau → cùng rank): 
```
i:    0   1   2   3   4   5
rank: 2   1   3   1   3   0
```
(suf 1 và 3 cùng rank 1 vì "an" giống nhau ở 2 ký tự đầu; suf 2 và 4 cùng rank 3.)

**Vòng k=2 (sắp theo 4 ký tự đầu):** key(i) = (rank[i], rank[i+2]).
```
i=0: (2, rank[2]=3) = (2,3)
i=1: (1, rank[3]=1) = (1,1)
i=2: (3, rank[4]=3) = (3,3)
i=3: (1, rank[5]=0) = (1,0)
i=4: (3, -1)        = (3,-1)
i=5: (0, -1)        = (0,-1)
```
Sắp xếp: (0,-1)@5 < (1,0)@3 < (1,1)@1 < (2,3)@0 < (3,-1)@4 < (3,3)@2.
Giờ tất cả các cặp đều khác nhau → mọi hậu tố đã phân biệt hoàn toàn → dừng.

Kết quả `sa = [5, 3, 1, 0, 4, 2]` — **khớp** với walk-through naive ở mục 1.1. ✓

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao tối đa log n vòng?"* — Mỗi vòng tăng độ dài tiền tố được phân biệt gấp đôi (1→2→4→...). Hậu tố dài nhất có n ký tự, nên sau ⌈log₂ n⌉ vòng mọi hậu tố đã phân biệt. Với n=6: cần ≤ 3 vòng (1,2,4 — ở vòng 4 ký tự đã xong).
> - *"Sao mỗi vòng là O(n log n) hay O(n)?"* — Nếu sort cặp bằng `sort.Slice` thì O(n log n)/vòng → tổng **O(n log² n)**. Nếu dùng **radix sort** (counting sort 2 lượt theo 2 thành phần của cặp, vì rank ∈ [0,n)) thì O(n)/vòng → tổng **O(n log n)**.

```go
// Prefix doubling. Phiên bản này dùng sort.Slice -> O(n log^2 n), dễ đọc.
// Đổi sang radix sort 2 lượt để đạt O(n log n).
func suffixArray(s string) []int {
    n := len(s)
    if n == 0 {
        return []int{}
    }
    sa := make([]int, n)   // sa[k] = vị trí hậu tố đứng thứ k
    rank := make([]int, n) // rank[i] = thứ hạng hiện tại của suf(i)
    tmp := make([]int, n)  // rank tạm cho vòng kế tiếp

    // Vòng k=0: rank theo 1 ký tự (mã ASCII đủ phân biệt thứ tự)
    for i := 0; i < n; i++ {
        sa[i] = i
        rank[i] = int(s[i])
    }

    for length := 1; ; length <<= 1 { // length = 2^(k-1), so theo 2*length ký tự
        // comparator: cặp (rank[i], rank[i+length])
        cmp := func(a, b int) bool {
            if rank[a] != rank[b] {
                return rank[a] < rank[b]
            }
            ra, rb := -1, -1 // nửa phải; vượt biên = -1 (nhỏ nhất)
            if a+length < n {
                ra = rank[a+length]
            }
            if b+length < n {
                rb = rank[b+length]
            }
            return ra < rb
        }
        sort.Slice(sa, func(x, y int) bool { return cmp(sa[x], sa[y]) })

        // gán rank mới theo thứ tự vừa sort; cặp bằng nhau -> cùng rank
        tmp[sa[0]] = 0
        for i := 1; i < n; i++ {
            tmp[sa[i]] = tmp[sa[i-1]]
            if cmp(sa[i-1], sa[i]) { // sa[i-1] thực sự < sa[i]
                tmp[sa[i]]++
            }
        }
        copy(rank, tmp)

        if rank[sa[n-1]] == n-1 { // mọi rank đã phân biệt -> xong
            break
        }
    }
    return sa
}
```

### 2.3 SA-IS — O(n) tuyến tính (chỉ nhắc qua)

Tồn tại thuật toán xây SA trong **O(n)** thời gian: **SA-IS** (Suffix Array by Induced Sorting) và **DC3/skew**. Ý tưởng SA-IS: phân loại mỗi hậu tố thành kiểu **S** (nhỏ hơn hậu tố bên phải) hay **L** (lớn hơn), tìm các "LMS substring", sort chúng đệ quy, rồi **induced sort** suy ra thứ tự đầy đủ. Cài đặt phức tạp và dễ sai; trong competitive programming, **prefix doubling O(n log n) gần như luôn đủ nhanh** (n ≤ 10⁶ trong vài chục ms). Chỉ chuyển sang SA-IS khi thực sự cần hằng số tốt nhất.

> 📝 **Tóm tắt mục 2.** Naive O(n² log n) chỉ để hiểu. Prefix doubling sort theo tiền tố 2^k, ghép cặp rank → O(n log² n) (sort cặp) hoặc O(n log n) (radix). SA-IS O(n) tồn tại nhưng phức tạp, hiếm khi cần.

---

## 3. LCP array (Longest Common Prefix) — Kasai's algorithm

> 💡 **Trực giác.** Suffix array cho biết *thứ tự* các hậu tố, nhưng nhiều bài toán cần biết hai hậu tố **kề nhau** trong SA *giống nhau bao nhiêu ký tự đầu*. Đó là LCP. Hình dung: hai từ kề nhau trong từ điển ("banana", "band") chung tiền tố "ban" → LCP = 3. Mảng LCP đo "độ chồng lấp" giữa các mục liền kề trong "từ điển hậu tố".

**Định nghĩa.** `lcp[k]` = độ dài tiền tố chung dài nhất của `suf(sa[k])` và `suf(sa[k-1])`, với `k = 1..n-1`. Quy ước `lcp[0] = 0` (không có hậu tố nào trước hậu tố đầu tiên).

### 3.1 Walk-through "banana"

`sa = [5,3,1,0,4,2]`. Tính LCP giữa các cặp kề:

| k | suf(sa[k-1]) | suf(sa[k]) | tiền tố chung | lcp[k] |
|---|--------------|------------|---------------|--------|
| 0 | — | `a` (5) | — | 0 |
| 1 | `a` (5) | `ana` (3) | `a` | 1 |
| 2 | `ana` (3) | `anana` (1) | `ana` | 3 |
| 3 | `anana` (1) | `banana` (0) | (rỗng) | 0 |
| 4 | `banana` (0) | `na` (4) | (rỗng) | 0 |
| 5 | `na` (4) | `nana` (2) | `na` | 2 |

Vậy **`lcp = [0, 1, 3, 0, 0, 2]`**.

### 3.2 Kasai's algorithm — O(n)

> 💡 **Trực giác vì sao O(n).** Tính LCP "thô" cho mỗi cặp kề là O(n) mỗi cặp → O(n²). Kasai khôn ở chỗ: **duyệt hậu tố theo vị trí gốc i = 0,1,2,...** (không theo thứ tự SA). Nhận xét then chốt: nếu suf(i) và hậu tố đứng ngay trước nó trong SA có LCP = h, thì suf(i+1) và hậu tố đứng trước *nó* có LCP **≥ h-1** (vì bỏ ký tự đầu của cả hai vẫn còn chung ≥ h-1). Nên biến `h` chỉ **giảm tối đa 1** mỗi bước i nhưng có thể tăng nhiều — tổng số lần tăng/giảm bị chặn → O(n) amortized (giống two-pointers, xem [L13](../lesson-13-two-pointers/)).

```go
// Kasai's algorithm: tính LCP array trong O(n).
// lcp[k] = LCP(suf(sa[k]), suf(sa[k-1])), lcp[0] = 0.
func buildLCP(s string, sa []int) []int {
    n := len(s)
    rank := make([]int, n)
    for k := 0; k < n; k++ {
        rank[sa[k]] = k // nghịch đảo: hậu tố tại sa[k] có thứ hạng k
    }
    lcp := make([]int, n)
    h := 0 // LCP hiện tại, "kế thừa" h-1 sang bước sau
    for i := 0; i < n; i++ {
        if rank[i] == 0 {
            h = 0 // hậu tố đứng đầu SA, không có hậu tố trước
            continue
        }
        j := sa[rank[i]-1] // hậu tố đứng ngay trước suf(i) trong SA
        // đếm tiền tố chung của suf(i) và suf(j), bắt đầu từ h ký tự đã biết
        for i+h < n && j+h < n && s[i+h] == s[j+h] {
            h++
        }
        lcp[rank[i]] = h
        if h > 0 {
            h-- // bước sau (i+1) kế thừa ít nhất h-1
        }
    }
    return lcp
}
```

#### Vết chạy Kasai trên "banana" (vài bước đầu)

`sa=[5,3,1,0,4,2]`, `rank=[3,2,5,1,4,0]`. Duyệt i=0,1,2,...

- i=0 (suf `banana`): rank[0]=3, hậu tố trước = sa[2]=1 (`anana`). Chung tiền tố: `b` vs `a` → 0. lcp[3]=0. h=0.
- i=1 (suf `anana`): rank[1]=2, trước = sa[1]=3 (`ana`). h bắt đầu 0: `a`=`a`(h1), `n`=`n`(h2), `a`=`a`(h3), rồi i+3=4 còn ký tự `n`, j+3=6 hết → dừng. h=3. lcp[2]=3. h→2.
- i=2 (suf `nana`): rank[2]=5, trước = sa[4]=4 (`na`). h kế thừa 2: kiểm `s[2+2]=s[4]='n'` vs `s[4+2]=s[6]` (hết) → dừng ngay, h=2. lcp[5]=2. h→1.
- i=3 (suf `ana`): rank[3]=1, trước = sa[0]=5 (`a`). h kế thừa 1: `s[3+1]=s[4]='n'` vs `s[5+1]` (hết) → dừng, h=1. lcp[1]=1. h→0.
- i=4 (suf `na`): rank[4]=4, trước = sa[3]=0 (`banana`). h=0: `n` vs `b` → 0. lcp[4]=0. h=0.
- i=5 (suf `a`): rank[5]=0 → đứng đầu SA → h=0, continue. lcp[0]=0.

Kết quả `lcp = [0, 1, 3, 0, 0, 2]` — **khớp** bảng 3.1. ✓ Để ý `h` chỉ giảm 1 mỗi lần, tổng tăng ≤ n → O(n).

> ⚠ **Lỗi thường gặp.**
> - **Off-by-one LCP**: `lcp[k]` so sánh sa[k] với sa[**k-1**] (hậu tố trước trong SA), KHÔNG phải sa[k] với sa[k+1]. Cài nhầm chỉ số là bug phổ biến nhất.
> - **Nhầm `rank` và `sa`**: trong Kasai phải dùng `j = sa[rank[i]-1]`. Nếu viết `sa[i-1]` là sai hoàn toàn.
> - **Quên `lcp[0]=0`**: phần tử đầu không có hậu tố trước → định nghĩa là 0; nhiều công thức (đếm distinct substring) cộng cả `lcp[0]`.

> 🔁 **Dừng lại tự kiểm tra.** Cho `T = "abab"`, `sa = [2,0,3,1]`. Tính `lcp`.
> <details><summary>Đáp án</summary>
>
> Sắp: `ab`(2), `abab`(0), `b`(3), `bab`(1).
> - lcp[0]=0.
> - lcp[1] = LCP(`ab`, `abab`) = `ab` = 2.
> - lcp[2] = LCP(`abab`, `b`) = 0.
> - lcp[3] = LCP(`b`, `bab`) = `b` = 1.
> Vậy `lcp = [0, 2, 0, 1]`.
> </details>

> 📝 **Tóm tắt mục 3.** `lcp[k]` = tiền tố chung của hai hậu tố kề trong SA. Kasai duyệt theo vị trí gốc i, biến `h` chỉ giảm ≤1 mỗi bước → O(n). Nhớ `lcp[0]=0` và dùng `sa[rank[i]-1]`.

---

## 4. Ứng dụng suffix array + LCP

### 4.1 Pattern matching bằng binary search — O(m log n)

> 💡 **Trực giác.** Mọi hậu tố bắt đầu bằng pattern `P` nằm liền kề trong SA (vì đã sắp từ điển). Binary search tìm biên trái `lo` (hậu tố đầu tiên ≥ P) và biên phải; số lần xuất hiện = số hậu tố trong đoạn đó.

```go
// Đếm số lần xuất hiện của pattern p trong s, dùng SA. O(m log n).
// Trả về (số lần xuất hiện, danh sách vị trí — chưa sắp theo vị trí).
func countOccurrences(s, p string, sa []int) (int, []int) {
    n := len(s)
    // biên trái: hậu tố đầu tiên >= p
    lo := sort.Search(n, func(k int) bool { return s[sa[k]:] >= p })
    // biên phải: hậu tố đầu tiên > p + "ký tự lớn nhất" (tức không còn bắt đầu bằng p)
    hi := sort.Search(n, func(k int) bool {
        suf := s[sa[k]:]
        if len(suf) >= len(p) {
            return suf[:len(p)] > p // tiền tố m ký tự đã vượt p
        }
        return suf > p
    })
    positions := make([]int, 0, hi-lo)
    for k := lo; k < hi; k++ {
        positions = append(positions, sa[k])
    }
    return hi - lo, positions
}
```

**Walk-through `P = "ana"` trên "banana".** `sa=[5,3,1,0,4,2]`, các hậu tố sorted: `a, ana, anana, banana, na, nana`. Những hậu tố bắt đầu bằng `ana`: `ana`(k=1) và `anana`(k=2) → lo=1, hi=3 → **2 lần xuất hiện** tại vị trí sa[1]=3 và sa[2]=1. Kiểm: "banana" có "ana" ở chỉ số 1 và 3 ✓.

> ⚠ **Cạm bẫy.** Comparator `s[sa[k]:] >= p` slice chuỗi mỗi lần so sánh tốn O(m) → tổng O(m log n) (chấp nhận được). Nhưng nếu vô tình so sánh toàn hậu tố O(n) thì thành O(n log n). Giữ so sánh chỉ tới m ký tự.

### 4.2 Đếm số substring phân biệt (distinct substrings)

> 💡 **Trực giác.** Mỗi substring của `T` là **tiền tố của đúng một hậu tố**. Hậu tố `suf(sa[k])` đóng góp `n - sa[k]` tiền tố (mọi độ dài 1..n-sa[k]). Nhưng tiền tố trùng với hậu tố kề trước (đã đếm) chính là `lcp[k]` ký tự đầu → trừ đi. Tổng:

```
số substring phân biệt = Σ_{k=0}^{n-1} (n - sa[k])  -  Σ_{k=1}^{n-1} lcp[k]
```

**Walk-through "banana".** `sa=[5,3,1,0,4,2]`, `lcp=[0,1,3,0,0,2]`, n=6.
- Σ(n - sa[k]) = (6-5)+(6-3)+(6-1)+(6-0)+(6-4)+(6-2) = 1+3+5+6+2+4 = **21**.
- Σ lcp[k] = 0+1+3+0+0+2 = **6**.
- Distinct substrings = 21 - 6 = **15**.

Kiểm tay: các substring phân biệt của "banana" là: a, an, ana, anan, anana, b, ba, ban, bana, banan, banana, n, na, nan, nana = đúng **15** (số "n", "na",... không trùng). ✓

```go
// Số substring phân biệt của s, dùng SA + LCP. O(n) sau khi đã có SA, LCP.
func distinctSubstrings(s string, sa, lcp []int) int64 {
    n := len(s)
    var total int64
    for k := 0; k < n; k++ {
        total += int64(n - sa[k]) // hậu tố này có (n - sa[k]) tiền tố
    }
    for k := 1; k < n; k++ {
        total -= int64(lcp[k]) // trừ phần trùng với hậu tố kề trước
    }
    return total
}
```

### 4.3 Longest repeated substring = max LCP

> 💡 **Trực giác.** Một chuỗi con lặp lại ≥ 2 lần ⇔ là tiền tố chung của ≥ 2 hậu tố. Hai hậu tố chung tiền tố dài nhất luôn là **hai hậu tố kề nhau trong SA** (sắp từ điển → giống nhau nhất ở cạnh nhau). Nên **longest repeated substring = max(lcp[k])**, và vị trí lấy từ `sa` tương ứng.

**Walk-through "banana".** `lcp=[0,1,3,0,0,2]` → max = 3 tại k=2. `sa[2]=1` → substring = `s[1:1+3]` = `ana`. Đúng: "ana" lặp 2 lần (chỉ số 1 và 3, có chồng lấp). ✓

```go
// Longest repeated substring. Trả về chuỗi lặp dài nhất (>=2 lần). O(n).
func longestRepeated(s string, sa, lcp []int) string {
    best, bestK := 0, 0
    for k := 1; k < len(lcp); k++ {
        if lcp[k] > best {
            best, bestK = lcp[k], k
        }
    }
    if best == 0 {
        return "" // không có ký tự nào lặp
    }
    start := sa[bestK]
    return s[start : start+best]
}
```

### 4.4 Longest common substring của 2 chuỗi (nối + separator)

> 💡 **Trực giác.** Nối `A # B` với `#` là ký tự **không xuất hiện** trong cả A lẫn B và **nhỏ hơn mọi ký tự**. Xây SA + LCP cho chuỗi nối. Chuỗi con chung dài nhất xuất hiện ở chỗ **hai hậu tố kề trong SA đến từ HAI chuỗi khác nhau** (một bắt đầu trong vùng A, một trong vùng B) — khi đó `lcp[k]` của chúng là một chuỗi con chung. Lấy max các `lcp[k]` "khác phía".

**Walk-through nhỏ.** A=`ab`, B=`ba`. Nối `ab#ba` (n=5, ký tự `#` nhỏ nhất). Hậu tố:
```
0 ab#ba   (A)
1 b#ba    (A)
2 #ba     (sep)
3 ba      (B)
4 a       (B)
```
SA sắp: `#ba`(2) < `a`(4,B) < `ab#ba`(0,A) < `b#ba`(1,A) < `ba`(3,B). 
LCP kề: lcp(a,ab#ba)=1 nhưng `a`@4 thuộc B, `ab#ba`@0 thuộc A → **khác phía**, LCP=1 ("a"). lcp(b#ba,ba): `b#ba`@1(A), `ba`@3(B) → khác phía, LCP=1 ("b"). Max = 1 → LCS = "a" (hoặc "b"), độ dài 1. Kiểm: A="ab", B="ba" chung "a" và "b", dài nhất = 1 ✓.

```go
// Longest common substring của a và b. Nối a + sep + b, sep < mọi ký tự & không xuất hiện.
// O(n log n) build + O(n) quét. n = len(a)+len(b)+1.
func longestCommonSubstring(a, b string) string {
    sep := "\x01" // ký tự điều khiển nhỏ, giả định không có trong a, b
    s := a + sep + b
    sa := suffixArray(s)
    lcp := buildLCP(s, sa)
    boundary := len(a) // vị trí < boundary thuộc A; > boundary thuộc B; == boundary là sep
    best, bestStart := 0, 0
    inA := func(pos int) bool { return pos < boundary }
    inB := func(pos int) bool { return pos > boundary }
    for k := 1; k < len(sa); k++ {
        p, q := sa[k-1], sa[k]
        // hai hậu tố kề phải đến từ hai chuỗi khác nhau
        if (inA(p) && inB(q)) || (inB(p) && inA(q)) {
            if lcp[k] > best {
                best, bestStart = lcp[k], sa[k]
            }
        }
    }
    return s[bestStart : bestStart+best]
}
```

> ⚠ **Cạm bẫy separator.** `#`/sep phải (1) **không xuất hiện** trong A, B; (2) **nhỏ nhất** để các hậu tố chứa sep không "trộn" nhầm tiền tố chung vượt qua ranh giới. Với nhiều chuỗi, dùng các separator **khác nhau** và đều nhỏ hơn alphabet thật (vd `\x01`, `\x02`, ...). Dùng chung 1 separator cho nhiều chuỗi có thể tạo LCP giả vượt biên.

> ❓ **Câu hỏi tự nhiên.** *"Sao chỉ xét hậu tố KỀ NHAU mà chắc tìm ra max?"* — Vì LCP của hai hậu tố bất kỳ `i<j` trong SA = **min** các `lcp` giữa chúng, luôn ≤ lcp của một cặp kề. Cặp khác phía có LCP lớn nhất nhất định là một cặp kề (nếu không, cặp kề ở giữa còn lớn hơn). Đây cũng là lý do dùng RMQ trên LCP để trả lời LCP của cặp bất kỳ trong O(1) sau tiền xử lý.

> 🔁 **Dừng lại tự kiểm tra.** "abcabc" — longest repeated substring là gì, dài bao nhiêu?
> <details><summary>Đáp án</summary>
>
> "abc" lặp tại chỉ số 0 và 3 → longest repeated substring = "abc", dài 3. Max LCP của SA chuỗi này = 3.
> </details>

> 📝 **Tóm tắt mục 4.** Pattern search = binary search 2 biên O(m log n). Distinct = Σ(n-sa[k]) − Σlcp[k]. Longest repeated = max LCP. LCS 2 chuỗi = nối + separator nhỏ-duy-nhất, lấy max LCP "khác phía".

---

## 5. Suffix tree (nhắc qua)

> 💡 **Trực giác.** Suffix tree = **suffix trie nén**. Một suffix trie chèn mọi hậu tố vào trie (xem [Trie L43](../lesson-43-trie-aho-corasick/)) — tốn O(n²) node. Nén các chuỗi node một-con thành một cạnh gán nhãn substring → còn ≤ 2n node. Mỗi hậu tố là một đường đi từ gốc tới lá.

- **Ukkonen's algorithm** xây suffix tree **online O(n)**. Cực mạnh: pattern matching O(m), longest repeated substring, LCS, số distinct substring đều giải gọn trên cây.
- **Nhưng** cài đặt phức tạp (suffix link, active point, edge splitting), hằng số bộ nhớ lớn (~20n bytes). Trong thực tế và competitive, **suffix array + LCP thay thế gần hết** vai trò của suffix tree với code ngắn hơn nhiều và ít bộ nhớ hơn. Quan hệ: duyệt SA + LCP ⟷ duyệt suffix tree theo DFS thứ tự từ điển.

---

## 6. Suffix automaton (giới thiệu khái niệm)

> 💡 **Trực giác.** Suffix automaton (SAM) là **DFA nhỏ nhất nhận tất cả substring** của `T`. Mỗi đường đi từ trạng thái khởi đầu, đọc các ký tự, sinh ra đúng một substring của T. Đáng kinh ngạc: số trạng thái ≤ **2n − 1**, số cạnh ≤ **3n − 3** — tuyến tính.

- Xây **online O(n)** (thêm từng ký tự, dùng suffix link và clone trạng thái). Mỗi trạng thái đại diện một lớp tương đương các substring có cùng tập vị trí kết thúc (endpos).
- Ứng dụng mạnh cho **truy vấn substring**: kiểm tra một chuỗi có là substring không O(m); **đếm số substring phân biệt** = Σ (len[v] − len[link[v]]) trên các trạng thái; **đếm số lần xuất hiện** của mỗi substring; **longest common substring nhiều chuỗi** bằng cách chạy chuỗi kia qua automaton.
- So với SA: SAM mạnh ở các bài "đếm theo substring", còn SA mạnh ở "thứ tự từ điển + binary search pattern". Cài SAM ngắn hơn suffix tree nhưng tư duy trạng thái/endpos cần luyện.

> Bài này chỉ **giới thiệu** SAM ở mức khái niệm. Cài đặt đầy đủ (extend + clone) thuộc chủ đề nâng cao của [Tier 7](../tier-7-advanced/index.html).

---

## 7. So sánh ba cấu trúc

| Tiêu chí | Suffix Array + LCP | Suffix Tree | Suffix Automaton |
|----------|--------------------|-------------|------------------|
| Bộ nhớ | nhỏ (2 mảng int, ~8n) | lớn (~20n) | trung bình (~2n trạng thái) |
| Build | O(n log n) doubling / O(n) SA-IS | O(n) Ukkonen (khó) | O(n) online (vừa) |
| Cài đặt | **đơn giản nhất** | phức tạp nhất | trung bình |
| Pattern match | O(m log n) (hoặc O(m) với LCP+RMQ) | O(m) | O(m) |
| Distinct substring | Σ(n−sa[k]) − Σlcp | duyệt cạnh | Σ(len−len[link]) |
| Thứ tự từ điển / k-th substring | **rất tự nhiên** | có | kém tự nhiên |
| Đếm theo substring (occurrences, endpos) | cần thêm việc | tốt | **rất tốt** |
| Phổ biến trong competitive | **cao nhất** | ít (vì khó) | đang phổ biến |

---

## 8. Khi nào dùng cấu trúc hậu tố?

- **Nhiều pattern query trên 1 text cố định** → tiền xử lý SA một lần, mỗi query O(m log n). (Nếu chỉ 1 query → KMP/Z O(n+m) đơn giản hơn.)
- **Đếm/liệt kê substring phân biệt, longest repeated substring** → SA + LCP.
- **Longest common substring của 2 (hoặc nhiều) chuỗi** → nối + separator, SA + LCP; hoặc SAM cho nhiều chuỗi.
- **k-th smallest substring, thứ tự từ điển** → SA + LCP (đếm theo công thức distinct dần).
- **Đếm số lần xuất hiện của mọi substring, endpos** → suffix automaton.
- Nếu text **thay đổi liên tục** (insert/delete) → cấu trúc hậu tố tĩnh không hợp; cân nhắc cấu trúc khác.

---

## 9. Độ phức tạp tổng hợp

| Thao tác | Thời gian | Ghi chú |
|----------|-----------|---------|
| Build SA — naive | O(n² log n) | chỉ minh họa |
| Build SA — prefix doubling (sort) | O(n log² n) | dễ cài, đủ nhanh |
| Build SA — prefix doubling (radix) | O(n log n) | hằng số tốt |
| Build SA — SA-IS / DC3 | O(n) | phức tạp |
| Build LCP — Kasai | O(n) | sau khi có SA |
| Pattern search (binary trên SA) | O(m log n) | hoặc O(m + log n) với RMQ |
| Distinct substrings | O(n) | sau SA + LCP |
| Longest repeated | O(n) | max LCP |
| LCS 2 chuỗi | O(n log n) | n = len(a)+len(b)+1 |
| Build suffix automaton | O(n) | online |

Bộ nhớ SA + LCP: O(n) (2-3 mảng int). Suffix tree O(n) node nhưng hằng số lớn. SAM O(n) trạng thái.

---

## 10. Cạm bẫy thường gặp

1. **Naive sort string** — `sort.Slice` với comparator `s[a:] < s[b:]` là O(n² log n), TLE ngay với n vừa lớn. Phải dùng prefix doubling/radix.
2. **Separator cho multi-string** — phải **unique** (không trùng ký tự thật) và **nhỏ nhất**. Với nhiều chuỗi dùng các sep khác nhau (`\x01,\x02,...`). Dùng sai → LCP giả vượt biên giới chuỗi.
3. **LCP off-by-one** — `lcp[k]` so `sa[k]` với `sa[k-1]`, KHÔNG phải `sa[k+1]`. Và `lcp[0]=0`. Sai chỉ số → đếm distinct/repeated lệch.
4. **Nhầm `rank` (inverse SA) với `sa`** — Kasai cần `rank[sa[k]]=k` rồi dùng `sa[rank[i]-1]`. Đảo chiều là bug câm (chạy ra số sai mà không crash).
5. **Sentinel `$`** — nhiều bản cài thêm `$` (nhỏ nhất, không xuất hiện) ở cuối T để mọi hậu tố kết thúc bằng ký tự duy nhất, tránh xử lý "tiền tố của nhau". Nếu thêm sentinel, nhớ trừ nó khi đếm/đọc kết quả.
6. **Tràn số khi đếm substring** — số substring phân biệt có thể tới ~n²/2 ≈ 5×10¹¹ với n=10⁶ → phải dùng `int64`, không `int32`.
7. **So sánh chuỗi trong binary search** — slice `s[sa[k]:]` rồi so sánh có thể tốn O(n) thay vì O(m) nếu không cắt tới m ký tự → query chậm.

---

## Bài tập

> Code mẫu Go đã inline ở các mục 2–4. Mỗi lời giải dưới đây nêu cách tiếp cận, các bước, và Big-O.

1. **Xây suffix array** cho chuỗi cho trước (n ≤ 10⁵). In `sa` và `rank`.
2. **Longest repeated substring** — tìm chuỗi con dài nhất xuất hiện ≥ 2 lần.
3. **Đếm số substring phân biệt** của một chuỗi (n ≤ 10⁵), trả về `int64`.
4. **Longest common substring** của 2 chuỗi A, B.
5. **Pattern search** — với text cố định và q pattern, mỗi pattern trả số lần xuất hiện (binary search trên SA).
6. **k-th smallest substring** — tìm chuỗi con đứng thứ k theo thứ tự từ điển (tính trên tập substring phân biệt).
7. (Thêm) **Longest common substring của ≥ 3 chuỗi** — nối nhiều chuỗi với separator khác nhau.

---

## Lời giải chi tiết

### Bài 1 — Xây suffix array

**Cách tiếp cận.** Dùng prefix doubling (mục 2.2). Tạo `rank` ban đầu = mã ký tự, lặp tăng `length = 1,2,4,...`, mỗi vòng sort theo cặp `(rank[i], rank[i+length])` rồi gán `rank` mới; dừng khi mọi rank phân biệt. `rank` là inverse của `sa`.

**Các bước.** (1) khởi tạo sa=identity, rank=mã ký tự; (2) vòng lặp doubling như code `suffixArray`; (3) sau cùng `rank[sa[k]]=k`.

**Big-O.** O(n log² n) với `sort.Slice`; O(n log n) nếu thay bằng radix sort 2 lượt. Bộ nhớ O(n).

### Bài 2 — Longest repeated substring

**Cách tiếp cận.** Xây SA → LCP (Kasai) → đáp án = `max(lcp[k])`, lấy chuỗi tại `sa[argmax]`. Đúng vì chuỗi lặp dài nhất là tiền tố chung dài nhất của hai hậu tố, mà cặp dài nhất luôn kề nhau trong SA (mục 4.3).

**Các bước.** build SA O(n log n) → Kasai O(n) → quét lcp O(n) tìm max. Hàm `longestRepeated` ở mục 4.3.

**Big-O.** O(n log n) build + O(n) quét = **O(n log n)**.

### Bài 3 — Đếm số substring phân biệt

**Cách tiếp cận.** Mỗi hậu tố `sa[k]` góp `n − sa[k]` tiền tố; trùng với hậu tố kề trước đúng `lcp[k]` ký tự → trừ. Công thức `Σ(n−sa[k]) − Σlcp[k]` (mục 4.2). Dùng `int64`.

**Walk-through "banana".** 21 − 6 = 15 (đã verify tay).

**Big-O.** O(n log n) build + O(n) cộng = **O(n log n)**. **Cạm bẫy**: dùng `int64` tránh tràn.

### Bài 4 — Longest common substring 2 chuỗi

**Cách tiếp cận.** Nối `A + sep + B` (sep nhỏ nhất, không trùng). Build SA+LCP. Quét các cặp kề trong SA; nếu hai hậu tố đến từ hai phía khác nhau (so với `boundary = len(A)`), cập nhật max `lcp[k]`. Hàm `longestCommonSubstring` mục 4.4.

**Các bước.** nối O(n) → SA O(n log n) → LCP O(n) → quét O(n).

**Big-O.** **O(n log n)** với n = len(A)+len(B)+1. **Cạm bẫy**: separator phải nhỏ nhất + duy nhất.

### Bài 5 — Pattern search (binary trên SA)

**Cách tiếp cận.** Build SA một lần O(n log n). Mỗi pattern: binary search biên trái `lo` (hậu tố đầu tiên ≥ P) và biên phải `hi` (hậu tố đầu tiên có tiền tố m ký tự > P). Số xuất hiện = `hi − lo`, vị trí = `sa[lo..hi-1]`. Hàm `countOccurrences` mục 4.1.

**Các bước.** build SA (1 lần) → mỗi query 2 binary search × so sánh O(m).

**Big-O.** Tiền xử lý O(n log n); **mỗi query O(m log n)**. Tổng q query: O(n log n + q·m log n). (RMQ trên LCP có thể hạ xuống O(m + log n)/query.)

### Bài 6 — k-th smallest substring

**Cách tiếp cận.** Duyệt SA theo thứ tự từ điển. Hậu tố `sa[i]` đóng góp các tiền tố **mới** (chưa từng xuất hiện ở hậu tố trước) là những tiền tố dài hơn `lcp[i]`: số tiền tố mới = `(n − sa[i]) − lcp[i]`. Cộng dồn cho tới khi vượt k → substring thứ k nằm trong hậu tố `sa[i]` đó; độ dài cụ thể = `lcp[i] + (k − đã_đếm_trước_i)`. Trả `s[sa[i] : sa[i] + độ_dài]`.

**Walk-through "banana", k=4 (1-based, trên tập distinct).** Tập distinct theo thứ tự từ điển bắt đầu: `a, an, ana, anan, anana, b, ...`.
- i=0 (sa=5,`a`, lcp[0]=0): tiền tố mới = (6−5)−0 = 1 → cộng dồn 1 ("a"). k=4 > 1.
- i=1 (sa=3,`ana`, lcp[1]=1): mới = (6−3)−1 = 2 → cộng dồn 3 ("an","ana"). k=4 > 3.
- i=2 (sa=1,`anana`, lcp[2]=3): mới = (6−1)−3 = 2 → cộng dồn 5 ("anan","anana"). 4 ≤ 5 → nằm ở đây.
  - đã đếm trước i = 3, cần phần tử thứ 4 → là tiền tố mới thứ (4−3)=1 của hậu tố này → độ dài = lcp[2] + 1 = 3 + 1 = 4 → `s[1:5]` = `anan`.
- Đáp án: substring thứ 4 = **"anan"** ✓ (khớp danh sách: a, an, ana, **anan**).

**Big-O.** O(n log n) build + O(n) quét = **O(n log n)**.

### Bài 7 — LCS của ≥ 3 chuỗi

**Cách tiếp cận.** Nối tất cả chuỗi với **separator khác nhau** (`\x01,\x02,...`, đều nhỏ hơn alphabet thật). Build SA+LCP. Bài toán thành: tìm cửa sổ liên tiếp trong SA chứa hậu tố từ **cả m chuỗi**, và lấy `min(lcp)` lớn nhất trong cửa sổ đó (LCP của cả nhóm = min các lcp kề). Dùng **sliding window + deque/multiset** trên LCP để duy trì min của cửa sổ chứa đủ m phía. (Suffix automaton là cách thay thế cho nhiều chuỗi.)

**Big-O.** O(N log N) build + O(N) sliding window, với N = tổng độ dài + số separator. **Cạm bẫy**: mỗi separator phải duy nhất, nếu không các hậu tố sẽ nối qua biên giới chuỗi.

---

## Code & Minh họa

- Code Go đầy đủ đã **inline** ngay trong các mục 2–4 (suffix array prefix doubling, Kasai LCP, distinct substrings, longest repeated, pattern search binary, LCS 2 chuỗi). Không có file `solutions.go` riêng cho bài này.
- [visualization.html](./visualization.html) — 3 module tương tác: (1) **Suffix array builder** trên "banana" (liệt kê hậu tố → animate sort thành SA); (2) **LCP array** (tính LCP giữa các hậu tố kề); (3) **Distinct substrings** (đếm bằng SA+LCP, highlight công thức).

---

## Kết thúc Tier 6 — Thuật toán chuỗi

Bạn đã hoàn thành nhánh chuỗi:

- [L40 — Rabin-Karp](../lesson-40-string-matching-rabin-karp/): hashing để khớp pattern.
- [L41 — KMP](../lesson-41-kmp/): failure function, khớp O(n+m).
- [L42 — Z-algorithm](../lesson-42-z-algorithm/): Z array, các biến thể.
- [L43 — Trie & Aho-Corasick](../lesson-43-trie-aho-corasick/): nhiều pattern cùng lúc.
- **L44 — Suffix structures** (bài này): tiền xử lý 1 text, trả lời nhiều truy vấn.

Tiếp theo: [Tier 7 — Nâng cao](../tier-7-advanced/index.html) — segment tree, fenwick, các kỹ thuật cấp cao (gồm cả cài đặt đầy đủ suffix automaton).
