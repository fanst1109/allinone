# Lesson 05 — Hash Table (Bảng băm)

## Mục tiêu học tập

- Hiểu **hash function** và cách hash table cho phép truy cập `O(1)` trung bình.
- Hiểu **xung đột (collision)** và hai cách xử lý: **chaining** và **open addressing**.
- Hiểu **load factor** và lý do phải resize.
- Phân biệt **HashSet** và **HashMap**.

## Kiến thức tiền đề

- [Lesson 01 — Array](../lesson-01-array/).

## 1. Vấn đề: tìm kiếm nhanh

Cho 1 triệu username, kiểm tra một username mới có tồn tại không. Dùng array tốn `O(n)`. Có thể nhanh hơn?

**Ý tưởng**: biến mỗi chuỗi thành một **chỉ số mảng** thông qua một hàm — gọi là **hash function**.

```
"alice" --hash--> 7    -> arr[7]
"bob"   --hash--> 23   -> arr[23]
```

Truy cập `arr[7]`: `O(1)`.

## 2. Hash function

Hàm `h(key)` nhận một key và trả về một số nguyên trong khoảng `[0, m-1]` (với `m` là kích thước bảng).

**Tính chất mong muốn**:
- **Deterministic**: cùng input → cùng output.
- **Phân bố đều**: các key khác nhau cho ra index khác nhau (tránh dồn cục).
- **Tính nhanh**: `O(độ dài key)`.

Ví dụ hash đơn giản cho chuỗi:
```
h(s) = (s[0]·31^(n-1) + s[1]·31^(n-2) + ... + s[n-1]) mod m
```

## 3. Xung đột (Collision)

Vì miền key (vô hạn) ánh xạ về `m` ô (hữu hạn), **chắc chắn có hai key cùng hash về một index** — gọi là xung đột.

Hai chiến lược xử lý phổ biến:

### 3.1. Chaining (separate chaining)

Mỗi ô `arr[i]` không lưu một phần tử mà lưu một **danh sách** các phần tử cùng hash về `i`.

```
arr[7] -> [("alice", 100), ("david", 200)]
arr[23] -> [("bob", 50)]
```

- Tìm key: hash → vào đúng ô → duyệt list.
- Trung bình `O(1)` nếu list ngắn.
- Tệ nhất `O(n)` nếu mọi key hash về cùng một ô.

### 3.2. Open addressing (probing)

Không dùng list. Nếu ô bị chiếm, **tìm ô khác** theo một quy tắc:
- **Linear probing**: thử `i+1`, `i+2`, ...
- **Quadratic probing**: thử `i+1²`, `i+2²`, ...
- **Double hashing**: bước nhảy dựa trên hàm hash thứ hai.

Tốn ít bộ nhớ phụ nhưng dễ bị **clustering**.

## 4. Load factor và resize

**Load factor** `α = n / m` = (số phần tử) / (kích thước bảng).

- `α` thấp → ít xung đột nhưng lãng phí bộ nhớ.
- `α` cao → tiết kiệm bộ nhớ nhưng nhiều xung đột, tìm chậm.

Khi `α` vượt ngưỡng (thường `0.75`), bảng được **resize**: tạo mảng mới gấp đôi, hash lại toàn bộ phần tử. Chi phí một lần resize là `O(n)`, nhưng amortized vẫn là `O(1)`.

## 5. Độ phức tạp

| Thao tác | Trung bình | Xấu nhất |
| --- | --- | --- |
| Tìm | `O(1)` | `O(n)` |
| Thêm | `O(1)` amortized | `O(n)` |
| Xóa | `O(1)` | `O(n)` |

Xấu nhất xảy ra khi hash function quá tệ → mọi key dồn về một ô.

## 6. HashSet vs HashMap

- **HashSet**: chỉ lưu key, kiểm tra "phần tử có tồn tại không".
- **HashMap (Dictionary)**: lưu cặp `(key, value)`, tra giá trị theo key.

Cả hai đều dựa trên hash table.

## 7. Ứng dụng

- Bộ đếm tần suất (word count).
- Cache (LRU = HashMap + Doubly Linked List).
- Bảng symbol trong compiler.
- Kiểm tra trùng lặp (`HashSet`).
- Join trong cơ sở dữ liệu (hash join).

## 8. Cạm bẫy

- Dùng key **mutable** (có thể thay đổi sau khi thêm vào bảng) → mất phần tử.
- Hash function tệ → degrade về `O(n)`.
- Trong open addressing, **xóa cần đánh dấu "tombstone"**, không thể xóa thẳng.
- Hash của số nguyên không phải lúc nào cũng "phân bố đều" — cẩn trọng khi key là dãy số có quy luật.

## Bài tập

1. Cài đặt một HashMap đơn giản với chaining. Hỗ trợ `put`, `get`, `remove`.
2. Đếm tần suất từ trong một văn bản dùng HashMap.
3. Cho mảng số nguyên, tìm hai số có tổng bằng `k` trong `O(n)` (gợi ý: HashSet).
4. Giải thích tại sao `α > 1` chỉ có thể với chaining, không thể với open addressing.
5. Vì sao **không nên dùng String mutable làm key** trong HashMap?

## 9. Giải bài toán mở đầu — 1 triệu username

Quay lại câu hỏi ở mục 1: cho 1 triệu username, kiểm tra một username mới có tồn tại không.

### 9.1. Cách ngây thơ — slice + duyệt tuần tự

```go
users := []string{...}              // 1.000.000 chuỗi
func exists(u string) bool {
    for _, x := range users {
        if x == u { return true }
    }
    return false
}
```
- Mỗi truy vấn `O(n) = 10⁶` phép so sánh.
- Với 1000 truy vấn → 10⁹ thao tác → vài giây tới hàng chục giây.

### 9.2. Cách dùng hash set — `O(1)` trung bình

```go
set := make(map[string]struct{}, 1_000_000)
for _, u := range users {
    set[u] = struct{}{}              // O(1) trung bình
}
func exists(u string) bool {
    _, ok := set[u]                  // O(1) trung bình
    return ok
}
```
- Build set 1 lần: `O(n)`.
- Mỗi truy vấn sau đó: `O(1)` trung bình.
- 1000 truy vấn → ~1000 thao tác → mili-giây.

> Trong Go, `map[T]struct{}` là HashSet idiomatic — `struct{}` chiếm 0 byte, chỉ cần key.

### 9.3. So sánh thực tế

`solutions.go` chạy benchmark với 1.000.000 username, kết quả đo trên máy thường:

| Phương án | Thời gian / truy vấn |
| --- | --- |
| Linear scan slice | ~1.7 **ms** |
| `map[string]struct{}` | ~100 **ns** |

→ Hash set nhanh hơn **~16.500 lần** (≈ 4 bậc). Đó là lý do hash table là một trong những cấu trúc được dùng nhiều nhất trong thực tế.

Riêng việc *build* hash set 1 triệu phần tử mất ~400 ms — chỉ làm một lần, sau đó mọi truy vấn cực rẻ.

### 9.4. Khi nào không dùng hash set?
- Cần duyệt theo **thứ tự** username (alphabet) → dùng **TreeSet** / Red-Black tree.
- Cần tìm theo **tiền tố** ("ali..." → liệt kê tất cả) → dùng **Trie** ([Lesson 10](../lesson-10-trie/)).
- Cần kiểm tra "có thể có không" với rất nhiều phần tử trong ít bộ nhớ → **Bloom filter** ([Lesson 14](../lesson-14-advanced-structures/)).

## Lời giải chi tiết

### Bài 1 — HashMap với chaining
Mỗi ô là một list các cặp `(key, value)`.

```go
type entry struct{ k string; v int }
type HashMap struct{ buckets [][]entry; cap, size int }
func (m *HashMap) idx(k string) int { /* hash → mod cap */ }
func (m *HashMap) Put(k string, v int) { ... }   // O(1) trung bình
func (m *HashMap) Get(k string) (int, bool) { ... }
func (m *HashMap) Remove(k string) { ... }
```

Khi `size/cap > 0.75` → resize: tăng `cap` gấp đôi, hash lại toàn bộ.

### Bài 2 — Đếm tần suất từ
```go
func wordCount(text string) map[string]int {
    out := map[string]int{}
    for _, w := range strings.Fields(text) {
        out[w]++
    }
    return out
}
```
`O(n)` với `n` = tổng số ký tự.

### Bài 3 — Two-sum `O(n)`
Duyệt mảng, với mỗi `x` xem `k - x` đã thấy chưa.

```go
func twoSum(nums []int, k int) (int, int, bool) {
    seen := map[int]int{} // value -> index
    for i, x := range nums {
        if j, ok := seen[k-x]; ok { return j, i, true }
        seen[x] = i
    }
    return 0, 0, false
}
```
`O(n)` thời gian + `O(n)` bộ nhớ.

### Bài 4 — Vì sao `α > 1` chỉ có thể với chaining?

Với **chaining**, mỗi ô là một list — có thể chứa nhiều phần tử → `n > m` được (`α = n/m > 1`).

Với **open addressing**, mỗi ô chỉ chứa được **một phần tử**. Khi `n = m` → bảng đầy hoàn toàn, không thể thêm. Vậy luôn `α ≤ 1`.

### Bài 5 — Không dùng String mutable làm key
Nếu key thay đổi sau khi `put`, `hash(key)` mới sẽ khác `hash(key)` cũ. Khi `get(key)`, ta tới sai ô → tưởng không có phần tử. Phần tử cũ trở thành "rác" trong ô đã hash trước đó, không thể truy cập.

Quy tắc: **key của hash map phải bất biến (immutable)**. Trong Java, dùng `String`, `Integer`, hoặc class với `equals/hashCode` ổn định.

## Code & Minh họa

- [solutions.go](./solutions.go) — HashMap với chaining, two-sum, word count.
- [visualization.html](./visualization.html) — minh họa bucket + chaining + xung đột.

## Bài tiếp theo

[Lesson 06 — Tree](../lesson-06-tree/)
