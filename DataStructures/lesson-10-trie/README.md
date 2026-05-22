# Lesson 10 — Trie (Cây tiền tố)

## Mục tiêu học tập

- Hiểu cấu trúc trie và lý do nó hiệu quả cho tập chuỗi.
- Cài đặt `insert`, `search`, `startsWith`.
- Biết ứng dụng: autocomplete, dictionary, IP routing.

## Kiến thức tiền đề

- [Lesson 06 — Tree](../lesson-06-tree/).
- [Lesson 05 — Hash Table](../lesson-05-hash-table/) (để so sánh).

## 1. Trie là gì?

**Trie** (đọc là "try", từ chữ re*trie*val) là cây dùng để lưu **tập hợp chuỗi**, trong đó mỗi cạnh đại diện cho **một ký tự**.

Đường đi từ root tới một node tạo thành **tiền tố (prefix)**. Node được đánh dấu nếu đó là kết thúc của một chuỗi.

Ví dụ chứa `{"cat", "car", "cup"}`:
```
       (root)
         |
         c
       / |
      a  u
     /|  |
    t r  p*
    *  *
```
(`*` đánh dấu kết thúc từ.)

## 2. Cấu trúc node

```
class TrieNode:
    children = map<char, TrieNode>   # hoặc mảng 26 nếu chỉ a-z
    isEnd = false                    # đánh dấu kết thúc từ
```

## 3. Các thao tác

### 3.1. Insert
```
function insert(root, word):
    node = root
    for c in word:
        if c not in node.children:
            node.children[c] = TrieNode()
        node = node.children[c]
    node.isEnd = true
```
- Thời gian: `O(L)` với `L` = độ dài chuỗi.

### 3.2. Search (toàn bộ chuỗi)
```
function search(root, word):
    node = root
    for c in word:
        if c not in node.children: return false
        node = node.children[c]
    return node.isEnd
```

### 3.3. StartsWith (tìm tiền tố)
```
function startsWith(root, prefix):
    node = root
    for c in prefix:
        if c not in node.children: return false
        node = node.children[c]
    return true
```

Cả ba đều `O(L)` — **không phụ thuộc số chuỗi đã lưu**.

## 4. So sánh với HashSet

| Tiêu chí | Trie | HashSet |
| --- | --- | --- |
| Tìm chuỗi | `O(L)` | `O(L)` trung bình |
| Tìm theo tiền tố | **`O(L)`** | Phải duyệt hết |
| Liệt kê các chuỗi bắt đầu bằng prefix | Dễ | Khó |
| Bộ nhớ | Lớn (mỗi ký tự một node) | Gọn hơn |
| Có thứ tự | Có (theo lexicographic) | Không |

→ Trie thắng khi cần **truy vấn theo tiền tố**.

## 5. Ứng dụng

- **Autocomplete** / gợi ý gõ phím.
- **Spell checker**.
- **IP routing** (longest prefix match) — biến thể trie nhị phân.
- **Lưu từ điển**.
- **Tìm xâu con** (kết hợp với Aho-Corasick).

## 6. Cải tiến

- **Compressed trie (Radix tree)**: gộp chuỗi cạnh thẳng thành một cạnh duy nhất, tiết kiệm bộ nhớ.
- **Ternary search tree (TST)**: trung gian giữa BST và trie.

## 7. Cạm bẫy

- Bộ nhớ có thể rất lớn nếu alphabet lớn (Unicode 100k+ ký tự) → dùng `map` thay vì mảng cố định.
- Khi xóa, cần cẩn thận: chỉ xóa node nếu nó không là tiền tố của chuỗi khác.

## Bài tập

1. Cài đặt trie cho chữ cái thường a-z với `insert`, `search`, `startsWith`.
2. Đếm số chuỗi bắt đầu bằng một prefix cho trước. Mở rộng node thêm trường `count`.
3. Viết hàm trả về tất cả từ trong trie có prefix `s`. Tính Big-O.
4. Viết hàm xóa một từ khỏi trie sao cho không ảnh hưởng các từ khác.
5. So sánh dung lượng bộ nhớ giữa lưu 10.000 từ trong HashSet vs trie.

## Lời giải chi tiết

### Bài 1 — Trie cho a-z
Mỗi node có mảng 26 con (hoặc map). `isEnd` đánh dấu kết thúc từ.

```go
type Trie struct {
    children [26]*Trie
    isEnd    bool
}
func (t *Trie) Insert(w string) { /* đi xuống, tạo node mới khi cần */ }
func (t *Trie) Search(w string) bool { /* tìm node + isEnd */ }
func (t *Trie) StartsWith(p string) bool { /* tìm node, không cần isEnd */ }
```

Cả ba `O(L)` với `L` = độ dài chuỗi.

### Bài 2 — Đếm số chuỗi bắt đầu bằng prefix
Thêm trường `count` vào mỗi node: số lượng từ đi qua node này. Khi insert, tăng `count++` ở mỗi node trên đường.

Truy vấn `countPrefix(p)`: đi xuống đến node ứng với cuối prefix, trả về `count` của node đó. `O(L)`.

### Bài 3 — Liệt kê tất cả từ bắt đầu bằng prefix
1. Đi xuống đến node của prefix → `O(L)`.
2. DFS toàn bộ subtree, ghép `prefix + đường đi` tại các `isEnd`.

`O(L + K)` với `K` = tổng độ dài các kết quả. Không thể nhanh hơn vì phải in ra `K` ký tự.

### Bài 4 — Xóa một từ
- Đi xuống tới node cuối, set `isEnd = false`.
- Trên đường quay lên, nếu node con vừa xử lý không có `isEnd` và không có con khác → xóa node con (gán nil).
- Dừng khi gặp node được chia sẻ.

`O(L)`.

### Bài 5 — So sánh dung lượng: 10.000 từ trong HashSet vs Trie
- **HashSet**: lưu toàn bộ chuỗi + overhead hash table. Trung bình mỗi chuỗi tốn `len + ~20-30 byte` overhead.
- **Trie**: mỗi ký tự là một node. Mỗi node tốn rất nhiều bộ nhớ (mảng 26 con trỏ × 8 byte = 208 byte mỗi node), nhưng chuỗi chia sẻ tiền tố. Với từ tiếng Anh phổ thông, tổng node ≈ 30-40% số ký tự.

Trong thực tế Trie **tốn bộ nhớ hơn HashSet** cho cùng số chuỗi, nhưng đổi lại có **truy vấn theo tiền tố nhanh**. Nếu cần nén bộ nhớ → dùng **compressed trie (Radix tree)**.

## Code & Minh họa

- [solutions.go](./solutions.go) — cài Trie với insert/search/startsWith + đếm prefix + liệt kê từ.
- [visualization.html](./visualization.html) — Trie với cạnh có nhãn ký tự, node vàng = kết thúc từ, animate đường tìm kiếm.

## Bài tiếp theo

[Lesson 11 — Graph](../lesson-11-graph/)
