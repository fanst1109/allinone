// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataStructures/02-Intermediate/lesson-05-trie/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Trie (Cây tiền tố)

## Mục tiêu học tập

- Hiểu **trie** là gì và vì sao nó tối ưu cho truy vấn **theo tiền tố (prefix)**.
- Cài đặt \`insert\`, \`search\`, \`startsWith\`; phân biệt \`search\` vs \`startsWith\`.
- Phân tích **đánh đổi bộ nhớ** trie vs hash table, và khi nào dùng compressed trie.
- Biết ứng dụng thực tế: autocomplete, spell checker, IP routing.

## Kiến thức tiền đề

- [Lesson 01 — Tree](../lesson-01-tree/) (khái niệm node, cây, duyệt DFS).
- [Lesson 06 — Hash Table](../../01-Basic/lesson-06-hash-table/) (để so sánh trie vs hash ở §4).

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

Lợi ích "chia sẻ prefix" cụ thể: 3 từ với tổng $3+3+4 = 10$ ký tự chỉ cần **5 node** (\`c, a, t, r, d\`) thay vì 10 — vì 3 ký tự đầu của \`card\`/\`car\` dùng chung node với \`cat\`.

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
- Thời gian: $O(L)$ với $L$ = độ dài chuỗi.

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

Cả ba đều $O(L)$ — **không phụ thuộc số chuỗi đã lưu**.

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
| Tìm chuỗi | $O(L)$ | $O(L)$ trung bình |
| Tìm theo tiền tố | **$O(L)$** | Phải duyệt hết |
| Liệt kê các chuỗi bắt đầu bằng prefix | Dễ | Khó |
| Bộ nhớ | Lớn (mỗi ký tự một node) | Gọn hơn |
| Có thứ tự | Có (theo lexicographic) | Không |

→ Trie thắng khi cần **truy vấn theo tiền tố**.

### 4.1. So sánh memory: Trie vs Hash Table với 1 triệu từ ngắn

Giả định: 1 triệu từ tiếng Anh trung bình $8$ ký tự, alphabet a-z.

**Phương án 1 — HashSet of String**:
- Mỗi \`string\`: header ~16 byte + data $8$ byte = ~24 byte.
- Hash table với load factor 0.75: ~$1{,}33 \\times 10^6$ slot × 8 byte/pointer = ~10.6 MB cho bucket array.
- Tổng: ~$24 \\times 10^6 + 10{,}6 \\times 10^6 \\approx 34{,}6$ MB.

**Phương án 2 — Trie dùng mảng 26 con**:
- Mỗi node = 26 pointer × 8 byte + 1 byte \`isEnd\` + padding ≈ **216 byte/node**.
- Số node trong trie 1 triệu từ tiếng Anh: theo thực nghiệm, ~$3 \\times 10^6$ node (do từ ngắn chia sẻ prefix rất tốt — tầng 1 có ≤ 26 node, tầng 2 ≤ 676, càng sâu càng đầy).
- Tổng: ~$216 \\times 3 \\times 10^6 \\approx 648$ MB. **Lớn gấp ~19 lần HashSet!**

**Phương án 3 — Trie dùng \`map[byte]*Node\`**:
- Mỗi node: 1 map (overhead ~48 byte cho map rỗng) + entry trung bình. Nếu mỗi node trung bình 3 con: ~$48 + 3 \\times 24 = 120$ byte/node.
- Tổng: ~$120 \\times 3 \\times 10^6 \\approx 360$ MB. Vẫn lớn hơn HashSet ~10 lần.

**Phương án 4 — Compressed trie (Radix tree)**:
- Gộp các chuỗi node đơn (chỉ có 1 con) thành 1 cạnh nhãn nhiều ký tự.
- Số node giảm xuống ~$5 \\times 10^5$ (chỉ giữ các điểm phân nhánh thật).
- Tổng: ~$5 \\times 10^5 \\times 100 \\approx 50$ MB. Cạnh tranh với HashSet, lại **hỗ trợ prefix query**.

**Kết luận**: Trie dạng "ngây thơ" tốn bộ nhớ gấp 10-20 lần hash. Đổi lại được prefix query $O(L)$. Khi memory là bottleneck → compressed trie.

## 5. Ứng dụng

- **Autocomplete** / gợi ý gõ phím.
- **Spell checker**.
- **IP routing** (longest prefix match) — biến thể trie nhị phân.
- **Lưu từ điển**.
- **Tìm xâu con** (kết hợp với Aho-Corasick).

### 5.1. Walk-through: Autocomplete gõ phím

Đây là ứng dụng "ai cũng dùng": gõ vài chữ vào ô tìm kiếm, hệ thống **gợi ý ngay** các từ bắt đầu bằng chuỗi đó. Trie làm việc này $O(L + K)$ ($L$ = độ dài prefix, $K$ = tổng độ dài kết quả) — trong khi quét danh sách phẳng mất $O(n \\times L)$.

Giả sử từ điển gợi ý chứa \`{"cat", "car", "card", "care", "dog"}\`. Người dùng gõ prefix **\`"ca"\`**:

\`\`\`
(root)
  ├─ c ── a ──┬─ t*              "cat"
  │           └─ r* ──┬─ d*       "car", "card"
  │                   └─ e*       "care"
  └─ d ── o ── g*                 "dog"
\`\`\`

**Bước 1 — đi tới node của prefix** (chỉ $O(L)=O(2)$):

| Ký tự | Node | Có trong children? |
|-------|------|---------------------|
| \`c\` | → node \`c\` | có |
| \`a\` | → node \`a\` | có → **dừng ở đây, đây là "node ca"** |

**Bước 2 — DFS từ node \`ca\`, thu mọi nhánh có \`isEnd\`:**

| Đường đi từ \`ca\` | Tới \`isEnd\`? | Gợi ý |
|------------------|--------------|-------|
| \`t\` | có \`*\` | **cat** |
| \`r\` | có \`*\` | **car** |
| \`r → d\` | có \`*\` | **card** |
| \`r → e\` | có \`*\` | **care** |

Trả về \`["cat", "car", "card", "care"]\`. Để ý nhánh \`d → o → g\` ("dog") **không bao giờ bị chạm tới** — vì ta đã rẽ vào node \`ca\` từ bước 1, toàn bộ phần còn lại của trie bị cắt. Đó là lý do trie nhanh: **prefix định vị đúng một subtree**, kết quả nằm gọn trong đó.

> Thực tế (Google, IDE) còn xếp hạng gợi ý theo **độ phổ biến** — thêm trường \`count\`/\`weight\` vào mỗi node (như [Bài 2](#bài-2--đếm-số-chuỗi-bắt-đầu-bằng-prefix)) rồi sort các kết quả DFS theo trọng số trước khi hiển thị top vài gợi ý.

## 6. Cải tiến

- **Compressed trie (Radix tree)**: gộp chuỗi cạnh thẳng thành một cạnh duy nhất, tiết kiệm bộ nhớ.
- **Ternary search tree (TST)**: trung gian giữa BST và trie.

## 7. Cạm bẫy

- Bộ nhớ có thể rất lớn nếu alphabet lớn (Unicode 100k+ ký tự) → dùng \`map\` thay vì mảng cố định.
- Khi xóa, cần cẩn thận: chỉ xóa node nếu nó không là tiền tố của chuỗi khác.

### 7.1. ❓ Câu hỏi tự nhiên

- **"Trie nhanh hơn HashSet ở chỗ nào?"** — Cùng tìm chuỗi cả hai đều $O(L)$ (hash cần tính $O(L)$ để hash, trie cần $O(L)$ để đi xuống). **Trie thắng tuyệt đối ở prefix query** — liệt kê tất cả từ bắt đầu bằng \`"pre"\` mất $O(L + K)$ (K = tổng độ dài kết quả), trong khi HashSet phải duyệt toàn bộ $n$ phần tử → $O(n \\times L)$.
- **"Tại sao tôi nên chọn \`map<char, Node>\` thay vì mảng \`[26]Node*\`?"** — Mảng 26 cố định: truy cập $O(1)$ (\`children[c-'a']\`), nhưng lãng phí khi node có ít con (vd node sâu chỉ có 1 con phải dành 26 ô = 208 byte). Map: tốn overhead constant lớn hơn nhưng chỉ chứa con thực sự có. Quy tắc: **alphabet nhỏ + node dày (gần root)** dùng mảng; **alphabet lớn (Unicode) hoặc node thưa** dùng map.
- **"Compressed trie là gì cụ thể?"** — Trong trie chuẩn, một chuỗi không phân nhánh dài tạo ra một dây node lãng phí. Radix tree gộp dây đó thành 1 node với nhãn chuỗi. Vd \`{"romanus", "romulus"}\` chuẩn cần 12 node, radix chỉ cần 5 node (root → "rom" → split: "anus" / "ulus").
- **"Có thể xóa khỏi trie không?"** — Có, nhưng phải cẩn thận: chỉ xóa node nếu (1) \`isEnd == false\` sau khi unset, (2) không có con nào khác. Nếu node là prefix của từ khác → chỉ set \`isEnd = false\`, KHÔNG xóa cấu trúc.
- **"Lúc nào trie thua hash table hoàn toàn?"** — Khi (1) không cần prefix query, và (2) memory là bottleneck. Vd lưu hash của file (chuỗi hex $64$ ký tự) → dùng hash table; lưu IP routing → dùng trie nhị phân (cần longest-prefix).

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
- Insert/Search/StartsWith đều $O(L)$, **không phụ thuộc số từ đã lưu**.
- Lợi thế chính: **prefix query** — liệt kê từ bắt đầu bằng prefix $O(L + K)$.
- Trade-off bộ nhớ: trie ngây thơ tốn gấp 10-20 lần hash; compressed trie thu hẹp được khoảng cách.
- Lưu ý cài đặt: **isEnd**, alphabet, **xóa cẩn thận** khi từ là prefix của từ khác.
- Mảng \`[26]\` cho alphabet nhỏ + dày; \`map\` cho alphabet lớn + thưa.

## 8. Thực hành: dùng trong code thật

> 💡 **§5 liệt kê trie "dùng ở đâu". Mục này là code chạy được cho từng cái.** Autocomplete có ranking, router IP longest-prefix, gợi ý sửa lỗi chính tả, gõ T9 — tất cả là trie với một chút biến tấu. Code Go dưới đây \`go run\` được.

### 8.1. Mini-project A — Autocomplete service có xếp hạng

§5.1 dừng ở "DFS thu mọi từ có prefix". Đời thực (Google, IDE, ô tìm kiếm Shopee) còn phải **xếp hạng theo độ phổ biến** và chỉ trả **top-K**. Thêm trường \`weight\` vào node kết thúc từ:

\`\`\`go
package main

import (
	"fmt"
	"sort"
)

type Node struct {
	children map[rune]*Node
	isEnd    bool
	weight   int // độ phổ biến của từ kết thúc tại đây (vd số lần search)
	word     string
}

func newNode() *Node { return &Node{children: map[rune]*Node{}} }

type Autocomplete struct{ root *Node }

func NewAutocomplete() *Autocomplete { return &Autocomplete{root: newNode()} }

func (a *Autocomplete) Insert(word string, weight int) {
	n := a.root
	for _, c := range word { // range rune → an toàn với Unicode/tiếng Việt
		if n.children[c] == nil {
			n.children[c] = newNode()
		}
		n = n.children[c]
	}
	n.isEnd, n.weight, n.word = true, weight, word
}

// Suggest: trả tối đa k gợi ý cho prefix, xếp theo weight giảm dần.
func (a *Autocomplete) Suggest(prefix string, k int) []string {
	n := a.root
	for _, c := range prefix { // bước 1: đi tới node prefix — O(L)
		if n.children[c] == nil {
			return nil // không có từ nào bắt đầu bằng prefix
		}
		n = n.children[c]
	}
	var found []*Node
	var dfs func(*Node)
	dfs = func(cur *Node) { // bước 2: DFS subtree thu mọi từ — O(K)
		if cur.isEnd {
			found = append(found, cur)
		}
		for _, ch := range cur.children {
			dfs(ch)
		}
	}
	dfs(n)
	sort.Slice(found, func(i, j int) bool { return found[i].weight > found[j].weight })
	out := []string{}
	for i := 0; i < len(found) && i < k; i++ {
		out = append(out, found[i].word)
	}
	return out
}

func main() {
	ac := NewAutocomplete()
	ac.Insert("car", 50)
	ac.Insert("card", 30)
	ac.Insert("care", 90) // phổ biến nhất
	ac.Insert("cat", 70)
	ac.Insert("dog", 10)
	fmt.Println(ac.Suggest("ca", 3))  // [care cat car] — theo weight, không theo alphabet
	fmt.Println(ac.Suggest("car", 2)) // [care car] — care(90) > car(50) > card(30)
	fmt.Println(ac.Suggest("xyz", 3)) // []
}
\`\`\`

> ⚠ **Bẫy — dùng \`[]byte\`/index ASCII là hỏng với tiếng Việt.** \`for i := 0; i < len(word); i++ { word[i] }\` lặp theo **byte**, mà \`"cà phê"\` có ký tự nhiều byte (UTF-8) → tách sai. Luôn \`for _, c := range word\` (lặp theo **rune**) và \`children map[rune]*Node\` khi alphabet là Unicode. Mảng \`[26]\` chỉ an toàn cho a-z thuần.

> ❓ **"DFS toàn subtree rồi sort — có chậm khi prefix ngắn (vd 'a') khớp triệu từ?"** Có. Production tối ưu bằng cách **lưu sẵn top-K tại mỗi node** (precomputed) hoặc dùng cấu trúc kèm heap. Với từ điển vài chục nghìn từ thì DFS+sort là đủ nhanh và đơn giản.

### 8.2. Mini-project B — IP router: longest-prefix match (binary trie)

Router quyết định gửi gói tin đi đâu bằng **longest-prefix match**: tìm route có prefix **dài nhất** khớp địa chỉ đích. Đây là **trie nhị phân** — mỗi bit của IP là một cạnh (0 = trái, 1 = phải). Minh hoạ 8-bit cho gọn:

\`\`\`go
type BitNode struct {
	child [2]*BitNode
	next  string // "next hop" nếu node này là cuối một route
	isEnd bool
}

type Router struct{ root *BitNode }

func NewRouter() *Router { return &Router{root: &BitNode{}} }

// AddRoute: prefix dạng (bits, độ dài). Vd 192.168.0.0/16 → bits=0xC0A8..., plen=16.
func (r *Router) AddRoute(bits uint32, plen int, nextHop string) {
	n := r.root
	for i := 0; i < plen; i++ {
		b := (bits >> uint(31-i)) & 1 // lấy bit thứ i từ trái
		if n.child[b] == nil {
			n.child[b] = &BitNode{}
		}
		n = n.child[b]
	}
	n.isEnd, n.next = true, nextHop
}

// Lookup: đi theo từng bit của địa chỉ, GHI NHỚ next hop sâu nhất gặp được.
func (r *Router) Lookup(addr uint32) string {
	n := r.root
	best := "DROP" // không khớp route nào → bỏ gói
	for i := 0; i < 32; i++ {
		if n.isEnd {
			best = n.next // route dài hơn ghi đè route ngắn hơn
		}
		b := (addr >> uint(31-i)) & 1
		if n.child[b] == nil {
			break
		}
		n = n.child[b]
	}
	if n.isEnd {
		best = n.next
	}
	return best
}
\`\`\`

Mấu chốt: đi xuống tới đâu, gặp \`isEnd\` thì **cập nhật \`best\`** — vì route nằm sâu hơn = prefix dài hơn = cụ thể hơn, phải thắng route ngắn. Đây là cốt lõi bảng định tuyến trong router thật (dạng tối ưu hơn gọi là Patricia/LC-trie).

### 8.3. Mini-project C — Spell checker: gợi ý sửa trong 1 lần duyệt

Kiểm tra từ sai chính tả + gợi ý từ đúng "gần nhất" (sai 1 ký tự). Duyệt trie kèm **edit distance** tăng dần, cắt nhánh khi vượt ngưỡng:

\`\`\`go
// SuggestEdit1: mọi từ trong trie cách \`target\` đúng ≤ 1 phép sửa (thay/thêm/xóa).
// Cách đơn giản, dễ đọc: sinh mọi biến thể cách 1 sửa của target rồi check Search.
func (t *Trie) SuggestEdit1(target string) []string {
	seen := map[string]bool{}
	try := func(w string) {
		if w != target && t.Search(w) {
			seen[w] = true
		}
	}
	r := []rune(target)
	for i := 0; i <= len(r); i++ {
		// xóa ký tự i
		if i < len(r) {
			try(string(r[:i]) + string(r[i+1:]))
		}
		for c := 'a'; c <= 'z'; c++ {
			// thay ký tự i
			if i < len(r) {
				try(string(r[:i]) + string(c) + string(r[i+1:]))
			}
			// chèn ký tự trước i
			try(string(r[:i]) + string(c) + string(r[i:]))
		}
	}
	out := []string{}
	for w := range seen {
		out = append(out, w)
	}
	return out
}
\`\`\`

\`Search\` (trie) cho ta kiểm tra mỗi biến thể $O(L)$. Tổng $O(L^2 \\times 26)$ — đủ nhanh cho gõ realtime. (Bản tối ưu: duyệt trie 1 lần với hàng DP edit-distance, gọi là **Levenshtein automaton** — nhưng bản trên đủ dùng và dễ hiểu.)

### 8.4. Mini-project D — Gõ T9 (bàn phím số cũ)

Điện thoại nút bấm: \`2→abc, 3→def, ...\`. Gõ dãy số \`228\` → khớp những từ mà mỗi chữ thuộc đúng nhóm số đó. Trie cho phép duyệt **chỉ các nhánh hợp lệ**:

\`\`\`go
var t9 = map[byte]string{'2': "abc", '3': "def", '4': "ghi", '5': "jkl",
	'6': "mno", '7': "pqrs", '8': "tuv", '9': "wxyz"}

// T9Words: mọi từ trong trie khớp dãy phím digits (vd "228" → "cat", "bat"...).
func (t *Trie) T9Words(digits string) []string {
	var out []string
	var dfs func(n *Trie, di int, path string)
	dfs = func(n *Trie, di int, path string) {
		if di == len(digits) {
			if n.isEnd {
				out = append(out, path)
			}
			return
		}
		for _, c := range t9[digits[di]] { // chỉ rẽ vào các chữ thuộc phím này
			idx := c - 'a'
			if n.children[idx] != nil {
				dfs(n.children[idx], di+1, path+string(c))
			}
		}
	}
	dfs(t.root, 0, "")
	return out
}
\`\`\`

Thay vì thử $3^L$ tổ hợp chữ rồi tra từng cái, trie **cắt ngay** nhánh không tồn tại → chỉ đi theo từ thật có trong từ điển.

### 8.5. ⚠ Khi nào KHÔNG dùng trie

| Tình huống | Vì sao trie phí | Dùng gì |
|------------|------------------|---------|
| Chỉ cần "từ này có trong tập không?", không prefix | Trie tốn 10–20× bộ nhớ (§4.1), không lợi gì hơn | \`map[string]bool\` / HashSet |
| Khóa là số / hash hex dài, không có prefix chung | Mỗi ký tự 1 node, không chia sẻ được gì | Hash table |
| Bộ nhớ là bottleneck nhưng vẫn cần prefix | Trie ngây thơ phình to | **Compressed trie / Radix tree** (§6) |
| Cần khớp mẫu ở **giữa** chuỗi (không chỉ prefix) | Trie chỉ giỏi prefix | Suffix tree / Aho-Corasick |

> 🔁 **Tự kiểm tra**
> 1. Trong autocomplete §8.1, vì sao phải \`for _, c := range word\` thay vì \`word[i]\`?
>    <details><summary>Đáp án</summary>\`word[i]\` lặp theo <b>byte</b>. Ký tự tiếng Việt/Unicode chiếm nhiều byte trong UTF-8 → tách sai ký tự. \`range\` lặp theo <b>rune</b> (code point), đúng từng ký tự.</details>
> 2. Router §8.2: hai route \`10.0.0.0/8 → A\` và \`10.1.0.0/16 → B\`. Gói tới \`10.1.2.3\` đi đâu? Vì sao?
>    <details><summary>Đáp án</summary>Đi <b>B</b>. Cả hai prefix đều khớp, nhưng \`/16\` dài hơn \`/8\` → longest-prefix match chọn route cụ thể hơn. Trong code: đi xuống sâu hơn gặp \`isEnd\` của B sau, ghi đè \`best\`.</details>
> 3. T9 §8.4: vì sao duyệt trie nhanh hơn "sinh mọi tổ hợp chữ rồi tra"?
>    <details><summary>Đáp án</summary>Sinh tổ hợp = $3^L$–$4^L$ chuỗi, đa số không phải từ thật. Trie chỉ rẽ vào nhánh <b>tồn tại</b> → cắt sạch tổ hợp vô nghĩa ngay từ ký tự đầu không khớp.</details>

### 8.6. 📝 Tóm tắt mục 8

- **Autocomplete thật** = trie + \`weight\` ở node + DFS subtree + sort top-K. Dùng \`range\`/rune cho tiếng Việt.
- **IP router** = trie nhị phân (bit), longest-prefix match = ghi nhớ \`isEnd\` sâu nhất khi đi xuống.
- **Spell check** = sinh biến thể edit-1 + \`Search\` trie mỗi cái $O(L)$.
- **T9** = DFS trie chỉ theo các chữ thuộc phím số → cắt tổ hợp không tồn tại.
- Trie thua khi không cần prefix + memory eo hẹp → \`map\`/hash; cần prefix + tiết kiệm → radix tree.

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

Cả ba $O(L)$ với $L$ = độ dài chuỗi.

### Bài 2 — Đếm số chuỗi bắt đầu bằng prefix
Thêm trường \`count\` vào mỗi node: số lượng từ đi qua node này. Khi insert, tăng \`count++\` ở mỗi node trên đường.

Truy vấn \`countPrefix(p)\`: đi xuống đến node ứng với cuối prefix, trả về \`count\` của node đó. $O(L)$.

### Bài 3 — Liệt kê tất cả từ bắt đầu bằng prefix
1. Đi xuống đến node của prefix → $O(L)$.
2. DFS toàn bộ subtree, ghép \`prefix + đường đi\` tại các \`isEnd\`.

$O(L + K)$ với $K$ = tổng độ dài các kết quả. Không thể nhanh hơn vì phải in ra $K$ ký tự.

### Bài 4 — Xóa một từ
- Đi xuống tới node cuối, set \`isEnd = false\`.
- Trên đường quay lên, nếu node con vừa xử lý không có \`isEnd\` và không có con khác → xóa node con (gán nil).
- Dừng khi gặp node được chia sẻ.

$O(L)$.

### Bài 5 — So sánh dung lượng: 10.000 từ trong HashSet vs Trie
- **HashSet**: lưu toàn bộ chuỗi + overhead hash table. Trung bình mỗi chuỗi tốn \`len + ~20-30 byte\` overhead.
- **Trie**: mỗi ký tự là một node. Mỗi node tốn rất nhiều bộ nhớ (mảng 26 con trỏ × 8 byte = 208 byte mỗi node), nhưng chuỗi chia sẻ tiền tố. Với từ tiếng Anh phổ thông, tổng node ≈ 30-40% số ký tự.

Trong thực tế Trie **tốn bộ nhớ hơn HashSet** cho cùng số chuỗi, nhưng đổi lại có **truy vấn theo tiền tố nhanh**. Nếu cần nén bộ nhớ → dùng **compressed trie (Radix tree)**.

## Code & Minh họa

- [solutions.go](./solutions.go) — cài Trie với insert/search/startsWith + đếm prefix + liệt kê từ.
- [visualization.html](./visualization.html) — Trie với cạnh có nhãn ký tự, node vàng = kết thúc từ, animate đường tìm kiếm.

## Bài tiếp theo

[Lesson 01 — Graph](../../03-Advanced/lesson-01-graph/)
`;
