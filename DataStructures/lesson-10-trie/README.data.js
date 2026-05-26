// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataStructures/lesson-10-trie/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 10 — Trie (Cây tiền tố)

## 1. Trie là gì?

**Trie** (đọc là "try", từ chữ re*trie*val) là cây dùng để lưu **tập hợp chuỗi**, trong đó mỗi cạnh đại diện cho **một ký tự**.

Đường đi từ root tới một node tạo thành **tiền tố (prefix)**. Node được đánh dấu nếu đó là kết thúc của một chuỗi.

Ví dụ chứa \`{"cat", "car", "cup"}\`:
\`\`\`
       (root)
         |
         c
       / |
      a  u
     /|  |
    t r  p*
    *  *
\`\`\`
(\`*\` đánh dấu kết thúc từ.)

### 1.1. 💡 Trực giác — "Cây chữ cái chia sẻ tiền tố"

Hãy tưởng tượng bạn quản lý một **thư viện sách**, và mọi nhan đề sách bắt đầu bằng \`"Lập trình"\` đều được đặt **cùng một kệ**. Trên kệ đó, sách bắt đầu bằng \`"Lập trình Go"\` thì đặt vào **ngăn con** bên trong, còn \`"Lập trình Java"\` ở ngăn con khác. Đi từ tủ → kệ → ngăn → vị trí cụ thể chính là đi theo từng ký tự của nhan đề.

**Trie chính là kiểu thư viện đó cho chuỗi**:

- Root = "cửa thư viện" (chưa có ký tự nào).
- Mỗi tầng sâu xuống = thêm một ký tự vào prefix.
- Hai chuỗi có chung prefix → **chia sẻ cùng đường đi từ root** cho đến chỗ chúng tách nhánh.

\`\`\`
{"cat", "car", "card"}:

(root)
  │
  c       ← prefix "c"
  │
  a       ← prefix "ca"
 / \\
t   r     ← prefix "cat" và "car"
*   │\\
    * d   ← "car" kết thúc ở r (*), "card" tiếp tục
       \\
        * ← "card" kết thúc
\`\`\`

Lợi ích "chia sẻ prefix" cụ thể: 3 từ với tổng \`3+3+4 = 10\` ký tự chỉ cần **5 node** (\`c, a, t, r, d\`) thay vì 10 — vì 3 ký tự đầu của \`card\`/\`car\` dùng chung node với \`cat\`.

## 2. Cấu trúc node

\`\`\`
class TrieNode:
    children = map<char, TrieNode>   # hoặc mảng 26 nếu chỉ a-z
    isEnd = false                    # đánh dấu kết thúc từ
\`\`\`

## 3. Các thao tác

### 3.1. Insert
\`\`\`
function insert(root, word):
    node = root
    for c in word:
        if c not in node.children:
            node.children[c] = TrieNode()
        node = node.children[c]
    node.isEnd = true
\`\`\`
- Thời gian: \`O(L)\` với \`L\` = độ dài chuỗi.

### 3.2. Search (toàn bộ chuỗi)
\`\`\`
function search(root, word):
    node = root
    for c in word:
        if c not in node.children: return false
        node = node.children[c]
    return node.isEnd
\`\`\`

### 3.3. StartsWith (tìm tiền tố)
\`\`\`
function startsWith(root, prefix):
    node = root
    for c in prefix:
        if c not in node.children: return false
        node = node.children[c]
    return true
\`\`\`

Cả ba đều \`O(L)\` — **không phụ thuộc số chuỗi đã lưu**.

### 3.4. Walk-through insert step-by-step

Insert lần lượt \`cat\`, \`car\`, \`card\` vào trie rỗng. Mỗi bước, \`*\` = \`isEnd=true\`, \`[X]\` = node mới tạo, \`(X)\` = node đã tồn tại.

**Trạng thái 0** — trie rỗng:

\`\`\`
(root)
\`\`\`

**Insert "cat"** — đi từng ký tự:

- \`c\`: root.children không có 'c' → tạo node \`[c]\`, đi xuống.
- \`a\`: \`[c]\`.children không có 'a' → tạo \`[a]\`, đi xuống.
- \`t\`: \`[a]\`.children không có 't' → tạo \`[t]\`, đi xuống.
- Hết chuỗi → \`[t].isEnd = true\`.

\`\`\`
(root)
  │
 [c]
  │
 [a]
  │
 [t]*
\`\`\`

**Insert "car"** — đi từng ký tự:

- \`c\`: \`(c)\` đã có → đi xuống, không tạo.
- \`a\`: \`(a)\` đã có → đi xuống.
- \`r\`: \`(a)\`.children không có 'r' → tạo \`[r]\`, đi xuống.
- Hết → \`[r].isEnd = true\`.

\`\`\`
(root)
  │
 (c)
  │
 (a)
 / \\
(t)* [r]*
\`\`\`

**Insert "card"**:

- \`c, a, r\`: tất cả đã có → đi xuống.
- \`d\`: \`(r)\`.children không có 'd' → tạo \`[d]\`, đi xuống.
- Hết → \`[d].isEnd = true\`.

\`\`\`
(root)
  │
 (c)
  │
 (a)
 / \\
(t)* (r)*
      │
     [d]*
\`\`\`

**Quan sát quan trọng**: node \`(r)\` có **cả \`isEnd=true\` lẫn con \`d\`** — đây là tình huống "từ này là tiền tố của từ khác". Đây cũng là chỗ thường có bug nếu code xóa cẩu thả.

### 3.5. Walk-through search

Search \`"car"\` trong trie trên:

| Bước | Ký tự | Node hiện tại | Tìm trong children | Kết quả |
|------|-------|---------------|---------------------|---------|
| 0 | (bắt đầu) | root | - | - |
| 1 | \`c\` | \`(c)\` | có 'c' | đi xuống |
| 2 | \`a\` | \`(a)\` | có 'a' | đi xuống |
| 3 | \`r\` | \`(r)\` | có 'r' | đi xuống |
| 4 | hết | \`(r)\` | check \`isEnd\` | \`true\` → **TRUE** |

Search \`"ca"\` (không phải từ, chỉ là prefix):

| Bước | Ký tự | Node | Children có? | |
|------|-------|------|--------------|-|
| 3 | hết | \`(a)\` | check \`isEnd\` | \`false\` → **FALSE** (search trả về sai) |

Nhưng \`startsWith("ca")\` sẽ trả \`true\` vì chỉ cần đi tới node, không cần check \`isEnd\`. Đây là chỗ phân biệt **search vs startsWith**.

Search \`"cup"\` — không tồn tại:

| Bước | Ký tự | Node | Children có? | |
|------|-------|------|--------------|-|
| 1 | \`c\` | \`(c)\` | có | đi xuống |
| 2 | \`u\` | \`(c).children\` | **không có 'u'** | **FALSE** ngay lập tức |

## 4. So sánh với HashSet

| Tiêu chí | Trie | HashSet |
| --- | --- | --- |
| Tìm chuỗi | \`O(L)\` | \`O(L)\` trung bình |
| Tìm theo tiền tố | **\`O(L)\`** | Phải duyệt hết |
| Liệt kê các chuỗi bắt đầu bằng prefix | Dễ | Khó |
| Bộ nhớ | Lớn (mỗi ký tự một node) | Gọn hơn |
| Có thứ tự | Có (theo lexicographic) | Không |

→ Trie thắng khi cần **truy vấn theo tiền tố**.

### 4.1. So sánh memory: Trie vs Hash Table với 1 triệu từ ngắn

Giả định: 1 triệu từ tiếng Anh trung bình \`8\` ký tự, alphabet a-z.

**Phương án 1 — HashSet of String**:
- Mỗi \`string\`: header ~16 byte + data \`8\` byte = ~24 byte.
- Hash table với load factor 0.75: ~\`1.33 × 10⁶\` slot × 8 byte/pointer = ~10.6 MB cho bucket array.
- Tổng: ~\`24 × 10⁶ + 10.6 × 10⁶ ≈ 34.6 MB\`.

**Phương án 2 — Trie dùng mảng 26 con**:
- Mỗi node = 26 pointer × 8 byte + 1 byte \`isEnd\` + padding ≈ **216 byte/node**.
- Số node trong trie 1 triệu từ tiếng Anh: theo thực nghiệm, ~\`3 × 10⁶\` node (do từ ngắn chia sẻ prefix rất tốt — tầng 1 có ≤ 26 node, tầng 2 ≤ 676, càng sâu càng đầy).
- Tổng: ~\`216 × 3 × 10⁶ ≈ 648 MB\`. **Lớn gấp ~19 lần HashSet!**

**Phương án 3 — Trie dùng \`map[byte]*Node\`**:
- Mỗi node: 1 map (overhead ~48 byte cho map rỗng) + entry trung bình. Nếu mỗi node trung bình 3 con: ~\`48 + 3 × 24 = 120\` byte/node.
- Tổng: ~\`120 × 3 × 10⁶ ≈ 360 MB\`. Vẫn lớn hơn HashSet ~10 lần.

**Phương án 4 — Compressed trie (Radix tree)**:
- Gộp các chuỗi node đơn (chỉ có 1 con) thành 1 cạnh nhãn nhiều ký tự.
- Số node giảm xuống ~\`5 × 10⁵\` (chỉ giữ các điểm phân nhánh thật).
- Tổng: ~\`5 × 10⁵ × 100 ≈ 50 MB\`. Cạnh tranh với HashSet, lại **hỗ trợ prefix query**.

**Kết luận**: Trie dạng "ngây thơ" tốn bộ nhớ gấp 10-20 lần hash. Đổi lại được prefix query \`O(L)\`. Khi memory là bottleneck → compressed trie.

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

- Bộ nhớ có thể rất lớn nếu alphabet lớn (Unicode 100k+ ký tự) → dùng \`map\` thay vì mảng cố định.
- Khi xóa, cần cẩn thận: chỉ xóa node nếu nó không là tiền tố của chuỗi khác.

### 7.1. ❓ Câu hỏi tự nhiên

- **"Trie nhanh hơn HashSet ở chỗ nào?"** — Cùng tìm chuỗi cả hai đều \`O(L)\` (hash cần tính \`O(L)\` để hash, trie cần \`O(L)\` để đi xuống). **Trie thắng tuyệt đối ở prefix query** — liệt kê tất cả từ bắt đầu bằng \`"pre"\` mất \`O(L + K)\` (K = tổng độ dài kết quả), trong khi HashSet phải duyệt toàn bộ \`n\` phần tử → \`O(n × L)\`.
- **"Tại sao tôi nên chọn \`map<char, Node>\` thay vì mảng \`[26]Node*\`?"** — Mảng 26 cố định: truy cập \`O(1)\` (\`children[c-'a']\`), nhưng lãng phí khi node có ít con (vd node sâu chỉ có 1 con phải dành 26 ô = 208 byte). Map: tốn overhead constant lớn hơn nhưng chỉ chứa con thực sự có. Quy tắc: **alphabet nhỏ + node dày (gần root)** dùng mảng; **alphabet lớn (Unicode) hoặc node thưa** dùng map.
- **"Compressed trie là gì cụ thể?"** — Trong trie chuẩn, một chuỗi không phân nhánh dài tạo ra một dây node lãng phí. Radix tree gộp dây đó thành 1 node với nhãn chuỗi. Vd \`{"romanus", "romulus"}\` chuẩn cần 12 node, radix chỉ cần 5 node (root → "rom" → split: "anus" / "ulus").
- **"Có thể xóa khỏi trie không?"** — Có, nhưng phải cẩn thận: chỉ xóa node nếu (1) \`isEnd == false\` sau khi unset, (2) không có con nào khác. Nếu node là prefix của từ khác → chỉ set \`isEnd = false\`, KHÔNG xóa cấu trúc.
- **"Lúc nào trie thua hash table hoàn toàn?"** — Khi (1) không cần prefix query, và (2) memory là bottleneck. Vd lưu hash của file (chuỗi hex \`64\` ký tự) → dùng hash table; lưu IP routing → dùng trie nhị phân (cần longest-prefix).

### 7.2. ⚠ Lỗi thường gặp

| Lỗi | Hậu quả |
|------|---------|
| Quên đánh dấu \`isEnd = true\` khi insert | \`search("cat")\` trả \`false\` dù đã insert |
| Dùng \`startsWith\` thay cho \`search\` khi chỉ cần biết có là từ không | Báo "có" cho mọi prefix của từ khác (vd \`"ca"\` báo có dù chỉ có \`"cat"\`) |
| Mảng \`[26]\` cứng cho input có chữ in hoa hoặc Unicode | Truy cập out-of-range, hoặc bỏ sót ký tự |
| Khi xóa, xóa node có \`isEnd=true\` của từ khác | Mất từ khác — bug khó tìm |
| Không reset \`node = root\` ở đầu mỗi thao tác | Hai lệnh insert liên tiếp đi sai chỗ |
| Tạo node mới mà quên init \`children\` (ngôn ngữ thủ công) | NPE khi đi xuống lần sau |
| Tính memory mà chỉ đếm \`len(word)\` | Quên 26 pointer/node = ~200 byte ẩn |

### 7.3. 🔁 Tự kiểm tra

1. Vẽ trie sau khi insert \`"to", "tea", "ted", "ten", "i", "in", "inn"\` (ví dụ kinh điển). Có bao nhiêu node? Bao nhiêu node có \`isEnd=true\`?
   <details><summary>Đáp án</summary>11 node (root + t, o, e, a, d, n, i, n, n) + isEnd ở 7 vị trí (to, tea, ted, ten, i, in, inn). Lưu ý node 'i' và 'in' và 'inn' đều có isEnd.</details>
2. Cho trie chứa \`{"app", "apple", "apply"}\`. \`search("app")\` trả gì? \`startsWith("app")\` trả gì? \`search("appl")\` trả gì?
   <details><summary>Đáp án</summary>search("app")=true (vì có isEnd ở node 'p' thứ hai). startsWith("app")=true. search("appl")=false (vì "appl" không phải từ, dù là prefix). startsWith("appl")=true.</details>
3. Trie có 1 triệu node, dùng mảng 26 con/node. Tính dung lượng bộ nhớ (ước lượng) trên máy 64-bit.
   <details><summary>Đáp án</summary>1 node ≈ 26 × 8 + 1 + padding ≈ 216 byte. Tổng ≈ 216 MB. Trong đó tỷ lệ pointer NULL: nếu trung bình mỗi node có 3 con thực → 23/26 ≈ 88% pointer là null, tốn ~190 MB cho NULL.</details>

### 7.4. 📝 Tóm tắt toàn lesson

- Trie = cây chữ cái, **đường đi từ root = prefix**, node có thể đánh dấu kết thúc từ (\`isEnd\`).
- Insert/Search/StartsWith đều \`O(L)\`, **không phụ thuộc số từ đã lưu**.
- Lợi thế chính: **prefix query** — liệt kê từ bắt đầu bằng prefix \`O(L + K)\`.
- Trade-off bộ nhớ: trie ngây thơ tốn gấp 10-20 lần hash; compressed trie thu hẹp được khoảng cách.
- Lưu ý cài đặt: **isEnd**, alphabet, **xóa cẩn thận** khi từ là prefix của từ khác.
- Mảng \`[26]\` cho alphabet nhỏ + dày; \`map\` cho alphabet lớn + thưa.

## Bài tập

1. Cài đặt trie cho chữ cái thường a-z với \`insert\`, \`search\`, \`startsWith\`.
2. Đếm số chuỗi bắt đầu bằng một prefix cho trước. Mở rộng node thêm trường \`count\`.
3. Viết hàm trả về tất cả từ trong trie có prefix \`s\`. Tính Big-O.
4. Viết hàm xóa một từ khỏi trie sao cho không ảnh hưởng các từ khác.
5. So sánh dung lượng bộ nhớ giữa lưu 10.000 từ trong HashSet vs trie.

## Lời giải chi tiết

### Bài 1 — Trie cho a-z
Mỗi node có mảng 26 con (hoặc map). \`isEnd\` đánh dấu kết thúc từ.

\`\`\`go
type Trie struct {
    children [26]*Trie
    isEnd    bool
}
func (t *Trie) Insert(w string) { /* đi xuống, tạo node mới khi cần */ }
func (t *Trie) Search(w string) bool { /* tìm node + isEnd */ }
func (t *Trie) StartsWith(p string) bool { /* tìm node, không cần isEnd */ }
\`\`\`

Cả ba \`O(L)\` với \`L\` = độ dài chuỗi.

### Bài 2 — Đếm số chuỗi bắt đầu bằng prefix
Thêm trường \`count\` vào mỗi node: số lượng từ đi qua node này. Khi insert, tăng \`count++\` ở mỗi node trên đường.

Truy vấn \`countPrefix(p)\`: đi xuống đến node ứng với cuối prefix, trả về \`count\` của node đó. \`O(L)\`.

### Bài 3 — Liệt kê tất cả từ bắt đầu bằng prefix
1. Đi xuống đến node của prefix → \`O(L)\`.
2. DFS toàn bộ subtree, ghép \`prefix + đường đi\` tại các \`isEnd\`.

\`O(L + K)\` với \`K\` = tổng độ dài các kết quả. Không thể nhanh hơn vì phải in ra \`K\` ký tự.

### Bài 4 — Xóa một từ
- Đi xuống tới node cuối, set \`isEnd = false\`.
- Trên đường quay lên, nếu node con vừa xử lý không có \`isEnd\` và không có con khác → xóa node con (gán nil).
- Dừng khi gặp node được chia sẻ.

\`O(L)\`.

### Bài 5 — So sánh dung lượng: 10.000 từ trong HashSet vs Trie
- **HashSet**: lưu toàn bộ chuỗi + overhead hash table. Trung bình mỗi chuỗi tốn \`len + ~20-30 byte\` overhead.
- **Trie**: mỗi ký tự là một node. Mỗi node tốn rất nhiều bộ nhớ (mảng 26 con trỏ × 8 byte = 208 byte mỗi node), nhưng chuỗi chia sẻ tiền tố. Với từ tiếng Anh phổ thông, tổng node ≈ 30-40% số ký tự.

Trong thực tế Trie **tốn bộ nhớ hơn HashSet** cho cùng số chuỗi, nhưng đổi lại có **truy vấn theo tiền tố nhanh**. Nếu cần nén bộ nhớ → dùng **compressed trie (Radix tree)**.

## Code & Minh họa

- [solutions.go](./solutions.go) — cài Trie với insert/search/startsWith + đếm prefix + liệt kê từ.
- [visualization.html](./visualization.html) — Trie với cạnh có nhãn ký tự, node vàng = kết thúc từ, animate đường tìm kiếm.

## Bài tiếp theo

[Lesson 11 — Graph](../lesson-11-graph/)
`;
