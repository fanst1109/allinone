# Lesson 43 — Trie & Aho-Corasick (Multi-pattern matching)

> **Tier 6 — Thuật toán chuỗi (String Algorithms).**
> Ở [Lesson 40 (Rabin-Karp)](../lesson-40-string-matching-rabin-karp/) và [Lesson 41 (KMP)](../lesson-41-kmp/) ta tìm **một** pattern trong text.
> Bài này trả lời câu hỏi: *làm sao tìm **đồng thời nhiều** pattern (hàng nghìn từ cấm, hàng triệu chữ ký virus) trong một text chỉ duyệt qua text **một lần**?*
> Câu trả lời là **Aho-Corasick** — và nền móng của nó là **Trie**.

---

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Nhắc lại **Trie** (cây prefix) và các thao tác `insert` / `search` / `startsWith` trong O(L).
- Hiểu các ứng dụng kinh điển của Trie: autocomplete, spell check, prefix search, IP routing, từ điển.
- Phát biểu **bài toán multi-pattern matching** và thấy vì sao chạy KMP nhiều lần là chậm.
- Xây **Aho-Corasick automaton** = Trie + **failure links** (giống KMP failure function nhưng trên cây) + **output links**.
- Chạy text qua automaton để tìm **tất cả** match trong O(n + tổng độ dài pattern + số match).
- Biết khi nào dùng Aho-Corasick so với KMP-nhiều-lần hay Rabin-Karp multi-pattern.

## Kiến thức tiền đề

- [Lesson 41 — KMP](../lesson-41-kmp/): failure function (prefix function). Aho-Corasick là **tổng quát hóa KMP lên cây nhiều pattern** — nắm KMP trước sẽ thấy AC rất tự nhiên.
- [Lesson 31 — Graph traversal (BFS)](../lesson-31-graph-traversal/): xây failure link bằng **BFS theo level**.
- [DataStructures — Trie](../../DataStructures/): cấu trúc Trie chi tiết (node, edge, terminal flag). Bài này recap nhanh rồi đi thẳng vào automaton.
- [Lesson 16 — Hashing](../lesson-16-hashing-techniques/): để so sánh với Rabin-Karp multi-pattern.

---

## 1. Trie recap — cây prefix

> 💡 **Trực giác.** Hãy hình dung một cuốn từ điển giấy. Để tra từ "cat" bạn lật tới phần chữ **c**, rồi trong đó tìm **ca**, rồi **cat**. Mỗi bước thu hẹp theo *một ký tự tiền tố (prefix)*. **Trie** chính là cấu trúc cây mô phỏng đúng quá trình đó: đi từ gốc, mỗi cạnh là một ký tự, **đường đi từ gốc tới một node = một chuỗi prefix**. Các từ chia sẻ prefix chung thì chia sẻ luôn phần đầu của đường đi → tiết kiệm và tra cực nhanh.

**Định nghĩa.** Trie (đọc là "try", từ re**trie**val) là cây mà:

- **Mỗi cạnh (edge) gắn 1 ký tự.** Mỗi node biểu diễn một prefix = chuỗi ký tự trên đường đi từ gốc đến nó.
- **Gốc (root)** biểu diễn chuỗi rỗng `""`.
- Mỗi node có cờ **terminal** (kết thúc từ): node `x` là terminal nghĩa là prefix dẫn tới `x` là một **từ hoàn chỉnh** đã được chèn vào trie.

### 1.1 Ví dụ trực quan — chèn {cat, car, card, dog}

```
            (root)
           /      \
          c        d
          |        |
          a        o
         / \       |
        t   r      g✓
       ✓    |✓
            d✓
```

- Đường `root → c → a → t` ✓ → từ **"cat"** (node `t` terminal).
- Đường `root → c → a → r` ✓ → từ **"car"**; đi tiếp `→ d` ✓ → **"card"**.
- "car" và "card" **dùng chung** đường `c-a-r`. "cat" và "car" **dùng chung** `c-a`. Đó là sức mạnh của trie: prefix chung chỉ lưu một lần.

### 1.2 Bốn ví dụ số — chi phí thao tác

| Thao tác | Chuỗi | Số node duyệt | Độ phức tạp |
|----------|-------|:---:|:---:|
| `search("cat")` | 3 ký tự | 3 (c→a→t), node t terminal → **có** | O(3) |
| `search("ca")` | 2 ký tự | 2 (c→a), node a **không** terminal → **không phải từ** | O(2) |
| `startsWith("car")` | 3 ký tự | 3 (c→a→r), đến được node r → **có prefix** | O(3) |
| `search("cab")` | 3 ký tự | dừng ở node a vì **không có cạnh `b`** → **không** | O(3) tối đa |

> **Mọi thao tác = O(L)** với L là độ dài chuỗi truy vấn — **không phụ thuộc** số từ trong trie. So với `map[string]bool` cũng O(L) (do phải hash cả chuỗi), nhưng trie thắng ở **prefix query** (`startsWith`, autocomplete) mà map không làm được.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Trie tốn bộ nhớ không?"* — Có. Mỗi node có thể giữ một mảng/map con theo alphabet. Với alphabet 26 chữ thường, dùng `[26]*node` đơn giản nhưng phí ô trống; dùng `map[byte]*node` tiết kiệm hơn khi thưa. Xem mục 9 (cạm bẫy).
> - *"Trie khác cây nhị phân tìm kiếm (BST) chỗ nào?"* — BST so sánh **cả khóa** ở mỗi node (O(log n) phép so sánh chuỗi). Trie so sánh **từng ký tự** đi xuống → O(L) bất kể có bao nhiêu từ, và tự nhiên hỗ trợ prefix.

> 🔁 **Dừng lại tự kiểm tra.** Với trie chứa {cat, car, card}, `startsWith("ca")` trả về gì? `search("ca")` trả về gì?
> <details><summary>Đáp án</summary>
> <code>startsWith("ca")</code> = <strong>true</strong> (có node tại đường c→a, là prefix của cat/car/card). <code>search("ca")</code> = <strong>false</strong> ("ca" không phải từ đã chèn — node a không terminal).
> </details>

> 📝 **Tóm tắt mục 1.** Trie = cây prefix, mỗi cạnh 1 ký tự, đường đi = chuỗi. `insert`/`search`/`startsWith` đều O(L). Prefix chung được chia sẻ. Điểm mạnh độc nhất so với hash map: **truy vấn theo prefix**.

---

## 2. Trie applications — vì sao trie quan trọng

> 💡 **Trực giác.** Bất cứ chỗ nào bạn cần *"cho tôi mọi thứ bắt đầu bằng ..."* hoặc *"chuỗi này có là tiền tố hợp lệ không"*, trie là công cụ tự nhiên. Nó biến câu hỏi prefix thành một lần đi xuống cây.

| Ứng dụng | Trie giải quyết gì |
|----------|--------------------|
| **Autocomplete** (gõ "ne" → "news, network, next") | Đi tới node "ne", DFS lấy mọi từ phía dưới |
| **Spell check** | Tra từ O(L); gợi ý = duyệt các nhánh gần (edit distance) |
| **Prefix search / từ điển** | `startsWith` trả mọi từ cùng tiền tố |
| **IP routing (longest-prefix match)** | Trie nhị phân trên bit địa chỉ → tìm route khớp tiền tố dài nhất |
| **Word dictionary / Scrabble solver** | Kiểm tra từ hợp lệ + sinh từ từ tập chữ cái |

### 2.1 Code Go — Trie cơ bản (insert / search / startsWith)

```go
package main

import "fmt"

// TrieNode: mỗi node giữ các con theo ký tự và cờ kết thúc từ.
// Dùng map[rune]*TrieNode để hỗ trợ alphabet bất kỳ (Unicode), tiết kiệm khi thưa.
type TrieNode struct {
	children map[rune]*TrieNode
	isEnd    bool // true nếu prefix dẫn tới node này là một từ hoàn chỉnh
}

func newNode() *TrieNode {
	return &TrieNode{children: make(map[rune]*TrieNode)}
}

type Trie struct{ root *TrieNode }

func NewTrie() *Trie { return &Trie{root: newNode()} }

// insert: đi xuống theo từng ký tự, tạo node nếu thiếu. O(L).
func (t *Trie) insert(word string) {
	cur := t.root
	for _, ch := range word { // duyệt từng ký tự (rune)
		nxt, ok := cur.children[ch]
		if !ok { // chưa có cạnh ch → tạo node mới
			nxt = newNode()
			cur.children[ch] = nxt
		}
		cur = nxt
	}
	cur.isEnd = true // đánh dấu node cuối là kết thúc từ
}

// search: trả true nếu word là một TỪ đã chèn (không chỉ là prefix). O(L).
func (t *Trie) search(word string) bool {
	n := t.walk(word)
	return n != nil && n.isEnd
}

// startsWith: trả true nếu có TỪ NÀO bắt đầu bằng prefix. O(L).
func (t *Trie) startsWith(prefix string) bool {
	return t.walk(prefix) != nil
}

// walk: đi theo chuỗi s, trả node cuối hoặc nil nếu đứt đường giữa chừng.
func (t *Trie) walk(s string) *TrieNode {
	cur := t.root
	for _, ch := range s {
		nxt, ok := cur.children[ch]
		if !ok {
			return nil // không có cạnh ch → s không tồn tại trong trie
		}
		cur = nxt
	}
	return cur
}

func main() {
	t := NewTrie()
	for _, w := range []string{"cat", "car", "card", "dog"} {
		t.insert(w)
	}
	// Walk-through: search("car") đi c→a→r, node r.isEnd==true → true
	fmt.Println(t.search("car"))       // true
	fmt.Println(t.search("ca"))        // false — "ca" không terminal
	fmt.Println(t.startsWith("ca"))    // true  — là prefix của cat/car/card
	fmt.Println(t.startsWith("dox"))   // false — đứt ở 'x'
	fmt.Println(t.search("card"))      // true
}
```

> **Walk-through `search("ca")`.** `cur=root`. ch='c' → có cạnh → `cur=node_c`. ch='a' → có cạnh → `cur=node_a`. Hết chuỗi. `node_a.isEnd`? Không (ta chưa chèn "ca"). → `false`. Nhưng `startsWith("ca")` chỉ cần `walk` trả non-nil → `true`. Phân biệt rõ **từ** vs **tiền tố**.

> ⚠ **Lỗi thường gặp.** Quên cờ `isEnd` → `search("ca")` trả nhầm `true` chỉ vì đi tới được node a. **Prefix ≠ từ.** Luôn kiểm tra `isEnd` trong `search`, KHÔNG kiểm tra trong `startsWith`.

> 📝 **Tóm tắt mục 2.** Trie tỏa sáng ở các tác vụ prefix: autocomplete, spell check, IP routing, từ điển. Code core gọn: `insert`/`search`/`startsWith` cùng dựa trên một hàm `walk` đi xuống cây.

---

## 3. Bài toán multi-pattern matching

> 💡 **Trực giác.** Bạn vận hành một antivirus. Có **một file** (text dài n byte) và **10.000 chữ ký virus** (patterns). Câu hỏi: file có chứa **bất kỳ** chữ ký nào không, và ở vị trí nào? Bạn không muốn quét file 10.000 lần — bạn muốn quét **một lần** và phát hiện mọi pattern đồng thời.

**Phát biểu.** Cho text `T` độ dài `n` và tập pattern `P = {p₁, p₂, ..., pₖ}`. Tìm **mọi** vị trí trong `T` mà **mọi** pᵢ xuất hiện.

### 3.1 Cách naive: chạy KMP cho từng pattern

Gọi `m = |p₁| + |p₂| + ... + |pₖ|` (tổng độ dài pattern), `z` = số match tìm được.

| Cách | Thời gian | Vấn đề |
|------|-----------|--------|
| Chạy KMP **k lần** | O(n·k + m) | Quét text **k lần** — với k=10.000 và n=1 triệu là **10¹⁰ phép so sánh** |
| **Aho-Corasick** | **O(n + m + z)** | Quét text **một lần duy nhất** |

> **Ví dụ số.** n = 1.000.000 byte, k = 10.000 pattern. KMP-nhiều-lần: ~10¹⁰ thao tác. Aho-Corasick: ~10⁶ + m + z thao tác. Chênh lệch **~10.000 lần**.

> ❓ **Câu hỏi tự nhiên.** *"Sao không gộp các pattern thành 1 regex `p1|p2|...|pk`?"* — Đa số engine regex backtracking sẽ **bùng nổ** với nhiều alternation. Aho-Corasick chính là **cách đúng** để compile một tập literal pattern thành một automaton tuyến tính (nhiều thư viện regex dùng AC bên dưới cho tập literal).

> 📝 **Tóm tắt mục 3.** Multi-pattern = tìm nhiều pattern cùng lúc. Naive (KMP k lần) quét text k lần → chậm. Mục tiêu: quét **một lần** → Aho-Corasick.

---

## 4. Aho-Corasick = Trie + Failure links

> 💡 **Trực giác (cực kỳ quan trọng).** Hãy nhớ KMP: khi đang khớp pattern và gặp ký tự **sai**, ta không quay text lùi lại — ta nhảy con trỏ pattern về **suffix dài nhất của phần đã khớp mà cũng là prefix của pattern** (failure function). Aho-Corasick làm **y hệt**, nhưng thay vì một pattern thẳng, ta có **một trie nhiều pattern**. Khi đang ở node `v` (đã khớp chuỗi `s` = đường từ root tới v) và gặp ký tự sai, ta nhảy theo **failure link** tới node biểu diễn **suffix dài nhất của `s` mà cũng là một prefix của pattern nào đó** (= một node trong trie).

Aho-Corasick automaton có **3 thành phần**:

1. **Trie (goto)** của tất cả pattern — `goto[v][c]` = con của v theo ký tự c (nếu có).
2. **Failure link** `fail[v]` — node ứng với **suffix thực sự dài nhất** của chuỗi-tại-v mà cũng là **prefix** của một pattern nào đó (một node trie). `fail[root]` và các con trực tiếp của root đều trỏ về **root**.
3. **Output link** `output[v]` — tập pattern **kết thúc tại v** GỘP các pattern kết thúc dọc theo **failure chain** từ v. Đây là chỗ bắt các pattern là **suffix** của pattern khác (vd "he" là suffix của "she").

### 4.1 Xây failure link bằng BFS theo level

Tại sao **BFS** (không phải DFS)? Vì `fail[v]` được tính từ `fail[parent(v)]`, mà parent ở level nông hơn. BFS đảm bảo khi xử lý v thì cha của v (và mọi node nông hơn) đã có `fail` đúng.

**Thuật toán (cho mỗi node v với cha p qua ký tự c):**

```
fail[root] = root
Các con trực tiếp của root: fail = root.
Với mỗi v (cha p, cạnh ký tự c), duyệt BFS:
    f = fail[p]
    while f != root && goto[f][c] không tồn tại:
        f = fail[f]                  // tụt theo failure chain của cha
    if goto[f][c] tồn tại && goto[f][c] != v:
        fail[v] = goto[f][c]
    else:
        fail[v] = root
    output[v] |= output[fail[v]]     // GỘP output từ failure target → bắt suffix-pattern
```

### 4.2 Walk-through xây cho {"he", "she", "his", "hers"}

Đánh số node khi insert (root = 0):

```
Trie:
0 root
├─ h →1 ── e →2 (✓he) ── r →7 ── s →8 (✓hers)
│         └ i →5 ── s →6 (✓his)
└─ s →3 ── h →4 ── e →9 (✓she)
```

(Node 1="h", 2="he"✓, 7="her", 8="hers"✓, 5="hi", 6="his"✓, 3="s", 4="sh", 9="she"✓.)

**BFS tính fail (level theo level):**

| node | chuỗi | tính fail | kết quả | output (gộp) |
|:---:|:---|:---|:---:|:---|
| 1 | "h" | con trực tiếp root | **0** (root) | {} |
| 3 | "s" | con trực tiếp root | **0** | {} |
| 2 | "he" | fail[1]=0; goto[0]['e']? không → **0** | **0** | {he} |
| 5 | "hi" | fail[1]=0; goto[0]['i']? không → **0** | **0** | {} |
| 4 | "sh" | fail[3]=0; goto[0]['h']=1 → **1** | **1** | {} (output[1]={}) |
| 7 | "her" | fail[2]=0; goto[0]['r']? không → **0** | **0** | {} |
| 6 | "his" | fail[5]=0; goto[0]['s']=3 → **3** | **3** | {} (output[3]={}) |
| 9 | "she" | fail[4]=1; goto[1]['e']=2 → **2** | **2** | {she} ∪ output[2]={he} = **{she, he}** |
| 8 | "hers" | fail[7]=0; goto[0]['s']=3 → **3** | **3** | {hers} ∪ output[3]={} = **{hers}** |

> **Điểm vàng:** node 9 ("she") có `fail=2` ("he"), nên `output[9] = {she, he}`. Khi text khớp tới "she", ta phát hiện **cả** "she" **lẫn** "he" — vì "he" là suffix của "she". Đây chính là tác dụng của việc **gộp output theo failure chain**.

> ⚠ **Lỗi thường gặp #1.** Xây failure link bằng DFS hoặc theo thứ tự insert → `fail[parent]` chưa sẵn sàng → link sai. **Phải BFS theo level.**

> ⚠ **Lỗi thường gặp #2.** Quên dòng `output[v] |= output[fail[v]]` → bỏ sót các pattern là **suffix** của pattern khác (ví dụ không báo "he" khi gặp "she"). Đây là bug kinh điển của AC.

> 🔁 **Dừng lại tự kiểm tra.** `fail` của node "she" (node 9) là node nào, và output của nó gồm những pattern gì?
> <details><summary>Đáp án</summary>
> <code>fail[9] = 2</code> (node "he"), vì suffix dài nhất của "she" là prefix của pattern là "he". <code>output[9] = {she, he}</code>.
> </details>

> 📝 **Tóm tắt mục 4.** AC = Trie + failure link (suffix dài nhất cũng là prefix, giống KMP) + output link (gộp pattern theo failure chain). Failure link xây bằng **BFS theo level**. Gộp output để bắt pattern-là-suffix.

---

## 5. Matching — chạy text qua automaton

> 💡 **Trực giác.** Một con trỏ duy nhất `cur` chạy trên automaton. Đọc từng ký tự text. Nếu node hiện tại có **child** theo ký tự đó → đi xuống. Nếu **không** → nhảy theo **failure link** (giống KMP tụt con trỏ) cho tới khi có child hoặc về root. Tại mỗi node sau khi di chuyển, **báo cáo toàn bộ `output`** (mọi pattern kết thúc tại đó qua failure chain).

```
cur = root
for i, c in text:
    while cur != root && goto[cur][c] không tồn tại:
        cur = fail[cur]              // tụt failure cho tới khi đi tiếp được
    if goto[cur][c] tồn tại:
        cur = goto[cur][c]
    for pattern p in output[cur]:
        báo match p kết thúc tại i   // (vị trí bắt đầu = i - len(p) + 1)
```

### 5.1 Walk-through tìm trong "ushers" với {"he","she","his","hers"}

`cur=0`. (Dùng trie & fail/output ở mục 4.2.)

| i | c | di chuyển | cur sau | output báo |
|:--:|:--:|:---|:---:|:---|
| 0 | u | goto[0]['u']? không, cur=root → ở lại | 0 | — |
| 1 | s | goto[0]['s']=3 | 3 | {} |
| 2 | h | goto[3]['h']=4 | 4 | {} |
| 3 | e | goto[4]['e']=9 | 9 | **{she, he}** ← match "she"@1, "he"@2 |
| 4 | r | goto[9]['r']? không → fail[9]=2; goto[2]['r']=7 | 7 | {} |
| 5 | s | goto[7]['s']=8 | 8 | **{hers}** ← match "hers"@2 |

> **Kết quả:** "she" (bắt đầu vị trí 1), "he" (bắt đầu vị trí 2), "hers" (bắt đầu vị trí 2). Chỉ **một lượt** qua "ushers" (6 ký tự) bắt được cả 3 pattern, kể cả "he" lồng trong "she". Để ý ở i=4 ta phải nhảy failure 9→2 rồi mới đi tiếp được — đúng cơ chế KMP.

> ❓ **Câu hỏi tự nhiên.** *"Vòng `while` tụt failure có làm match thành O(n·something) không?"* — Không. Tổng số bước tụt failure trên toàn bộ text bị chặn bởi **chiều sâu**: mỗi ký tự làm `cur` xuống tối đa 1 level, mỗi bước failure làm `cur` lên ít nhất 1 level → tổng failure ≤ tổng đi xuống ≤ n. Vậy match là **O(n)** (amortized), cộng z để liệt kê match.

> 📝 **Tóm tắt mục 5.** Match = một con trỏ chạy trên automaton: có child thì đi xuống, không thì tụt failure; báo output tại mỗi node. Một lượt qua text bắt mọi pattern, kể cả pattern lồng nhau.

---

## 6. Độ phức tạp

| Giai đoạn | Thời gian | Giải thích |
|-----------|-----------|------------|
| Build trie | O(m) | m = tổng độ dài pattern; mỗi ký tự thêm tối đa 1 node |
| Build failure (BFS) | O(m · \|Σ\|) hoặc O(m) | với map con: O(m) amortized; với mảng `[\|Σ\|]`: O(m·\|Σ\|) khởi tạo |
| Match | O(n + z) | n = độ dài text, z = số match được liệt kê |
| **Tổng** | **O(n + m + z)** | Quét text **một lần** |

So với KMP-k-lần O(n·k + m): khi k lớn, AC vượt trội tuyệt đối. Bộ nhớ: O(m) node (+ \|Σ\| con mỗi node nếu dùng mảng).

### 6.1 Code Go đầy đủ — Aho-Corasick

```go
package main

import "fmt"

// acNode: một node của automaton.
type acNode struct {
	children map[byte]*acNode
	fail     *acNode  // failure link
	output   []string // các pattern kết thúc tại node này (đã gộp theo failure chain)
}

func newAC() *acNode {
	return &acNode{children: make(map[byte]*acNode)}
}

type AhoCorasick struct{ root *acNode }

// build: chèn pattern vào trie rồi xây failure link bằng BFS.
func NewAhoCorasick(patterns []string) *AhoCorasick {
	root := newAC()

	// --- Bước 1: xây trie (goto) ---
	for _, p := range patterns {
		cur := root
		for i := 0; i < len(p); i++ {
			c := p[i]
			nxt, ok := cur.children[c]
			if !ok {
				nxt = newAC()
				cur.children[c] = nxt
			}
			cur = nxt
		}
		cur.output = append(cur.output, p) // pattern kết thúc tại node cuối
	}

	// --- Bước 2: BFS xây failure link theo level ---
	queue := []*acNode{}
	root.fail = root
	for _, child := range root.children {
		child.fail = root // con trực tiếp root → fail về root
		queue = append(queue, child)
	}
	for len(queue) > 0 {
		cur := queue[0]
		queue = queue[1:]
		for c, child := range cur.children {
			// tụt failure chain của cha tới khi tìm được goto[f][c] hoặc về root
			f := cur.fail
			for f != root && f.children[c] == nil {
				f = f.fail
			}
			if nxt, ok := f.children[c]; ok && nxt != child {
				child.fail = nxt
			} else {
				child.fail = root
			}
			// GỘP output theo failure chain → bắt pattern-là-suffix
			child.output = append(child.output, child.fail.output...)
			queue = append(queue, child)
		}
	}
	return &AhoCorasick{root: root}
}

// Match: trả về danh sách (vị trí kết thúc, pattern) cho mọi match. O(n + z).
type Hit struct {
	End     int    // chỉ số ký tự cuối của match trong text
	Pattern string
}

func (ac *AhoCorasick) Match(text string) []Hit {
	var hits []Hit
	cur := ac.root
	for i := 0; i < len(text); i++ {
		c := text[i]
		// không có child theo c → tụt failure
		for cur != ac.root && cur.children[c] == nil {
			cur = cur.fail
		}
		if nxt, ok := cur.children[c]; ok {
			cur = nxt
		}
		// báo mọi pattern kết thúc tại node hiện tại
		for _, p := range cur.output {
			hits = append(hits, Hit{End: i, Pattern: p})
		}
	}
	return hits
}

func main() {
	ac := NewAhoCorasick([]string{"he", "she", "his", "hers"})
	for _, h := range ac.Match("ushers") {
		start := h.End - len(h.Pattern) + 1
		fmt.Printf("match %q tại [%d..%d]\n", h.Pattern, start, h.End)
	}
	// Kết quả (theo walk-through 5.1):
	//   match "she" tại [1..3]
	//   match "he"  tại [2..3]
	//   match "hers" tại [2..5]
}
```

> **Lưu ý.** Trong code, `output` được **gộp sẵn** lúc build (`child.output = append(child.output, child.fail.output...)`), nên lúc match chỉ cần đọc `cur.output` trực tiếp, không phải đi failure chain lần nữa — match O(n + z) sạch sẽ.

> 📝 **Tóm tắt mục 6.** Build O(m) (hoặc O(m·\|Σ\|) với mảng), match O(n + z). Tổng O(n + m + z) — tuyến tính theo input + output.

---

## 7. Ứng dụng thực tế

| Lĩnh vực | Aho-Corasick làm gì |
|----------|---------------------|
| **Antivirus / virus signature scan** | Quét file một lần, dò hàng nghìn chữ ký virus đồng thời |
| **Content filter / lọc từ cấm** | Phát hiện mọi từ trong danh sách cấm trong comment/chat một lượt |
| **Bioinformatics** | Tìm nhiều motif/đoạn gen trong chuỗi DNA dài |
| **Intrusion detection (IDS)** như Snort | Khớp gói tin mạng với hàng ngàn rule signature |
| **Search nhiều keyword** | Highlight tất cả từ khóa người dùng nhập trong tài liệu |

> Snort và nhiều IDS thật sự dùng Aho-Corasick (hoặc biến thể) làm engine khớp đa pattern — vì chỉ có nó cho phép quét traffic ở tốc độ đường truyền với hàng chục nghìn rule.

> 📝 **Tóm tắt mục 7.** AC là "ngựa thồ" của mọi hệ thống cần dò nhiều pattern literal trong dòng dữ liệu lớn: antivirus, IDS, lọc nội dung, bioinformatics.

---

## 8. So sánh — chọn công cụ nào?

| Tiêu chí | KMP × k lần | Rabin-Karp multi-pattern | **Aho-Corasick** |
|----------|:---:|:---:|:---:|
| Số lần quét text | k | 1 (nhưng hash đa độ dài rắc rối) | **1** |
| Độ phức tạp | O(n·k + m) | O(n·L) trung bình, xấu O(n·k·L) nếu nhiều va chạm hash | **O(n + m + z)** |
| Pattern khác độ dài | Ổn | **Khó** (mỗi độ dài 1 cửa sổ hash riêng) | **Tự nhiên** (trie xử mọi độ dài) |
| Bộ nhớ | O(m) | O(k) bảng hash | O(m) (+ \|Σ\| con/node) |
| Khi nào dùng | Vài pattern, hoặc 1 pattern | Pattern **cùng độ dài**, ít pattern | **Nhiều pattern, độ dài khác nhau** |

> 💡 **Trực giác chọn lựa.** Rabin-Karp multi-pattern hiệu quả khi mọi pattern **cùng độ dài** (một cửa sổ trượt, tra bảng hash). Khi pattern **dài ngắn lẫn lộn** và **số lượng lớn**, Aho-Corasick là lựa chọn rõ ràng nhất — trie nuốt mọi độ dài, một lượt quét bắt hết.

> ❓ **Câu hỏi tự nhiên.** *"Vậy KMP còn dùng làm gì?"* — Khi chỉ có **một** pattern, KMP (hay Z-algorithm, [Lesson 42](../lesson-42-z-algorithm/)) gọn hơn nhiều, không cần dựng cả automaton. AC chỉ "đáng tiền" khi số pattern lớn.

> 📝 **Tóm tắt mục 8.** Nhiều pattern, độ dài khác nhau → Aho-Corasick. Pattern cùng độ dài, ít → Rabin-Karp cũng được. Một pattern → KMP/Z.

---

## 9. Cạm bẫy thường gặp

> ⚠ **#1 — Failure link build sai thứ tự.** Phải **BFS theo level** vì `fail[v]` phụ thuộc `fail[parent(v)]`. Dùng DFS hay duyệt theo thứ tự insert → cha chưa có fail → link sai toàn bộ.

> ⚠ **#2 — Output link bỏ sót pattern-là-suffix.** Nếu quên gộp `output[v] |= output[fail[v]]`, automaton sẽ báo "she" nhưng **không** báo "he" (suffix của "she"). Test luôn cặp pattern lồng nhau như {"she","he"} hoặc {"abc","bc","c"}.

> ⚠ **#3 — Alphabet lớn tốn bộ nhớ.** Mảng `[256]*node` (hoặc `[26]`) nhanh nhưng phí ô trống — với alphabet Unicode/256 và trie thưa thì dùng `map[byte]*node` tiết kiệm hơn nhiều. Đánh đổi: map chậm hơn mảng vài lần do hashing. Chọn theo mật độ trie và yêu cầu tốc độ.

> ⚠ **#4 — Root failure phải về chính nó (hoặc xử lý riêng).** `fail[root] = root`. Con trực tiếp của root có `fail = root`. Nếu để `fail[root] = nil` mà không guard, vòng `while cur != root` trong match có thể deref nil hoặc lặp vô hạn.

> ⚠ **#5 — Quên báo output sau MỖI ký tự.** Phải check `output` ngay sau khi di chuyển con trỏ ở **mọi** vị trí i, không chỉ khi vừa đi xuống — vì pattern có thể kết thúc ngay cả sau một bước tụt failure rồi đi tiếp.

> 📝 **Tóm tắt mục 9.** BFS đúng level · gộp output · chọn map/array theo alphabet · root.fail = root · báo output mỗi ký tự. Năm điểm này là toàn bộ chỗ dễ sai của AC.

---

## Bài tập

> Mỗi bài đều có lời giải chi tiết ở mục dưới. Tự làm trước khi xem.

1. **Implement Trie** (LeetCode 208). Cài `insert`, `search`, `startsWith`.
2. **Word Search II** (LeetCode 212). Cho lưới ký tự và danh sách từ, tìm mọi từ xuất hiện trên lưới (đi 4 hướng, không lặp ô). Dùng **trie + DFS trên grid**.
3. **Replace Words** (LeetCode 648). Cho từ điển "gốc từ" (roots) và một câu; thay mỗi từ trong câu bằng **root ngắn nhất** là tiền tố của nó. Dùng **trie prefix**.
4. **Multi-pattern search.** Cho text và k pattern, trả về mọi (pattern, vị trí). Cài **Aho-Corasick**.
5. **Stream of Characters** (LeetCode 1032). Mỗi lần nhận 1 ký tự, trả true nếu **hậu tố** dòng đã nhận khớp một từ trong danh sách. Dùng **AC trên pattern đảo ngược** (hoặc AC thường + lưu trạng thái).
6. **Count Distinct Substrings.** Đếm số chuỗi con **phân biệt** của một chuỗi s. Dùng **trie chứa mọi hậu tố (suffix)** — mỗi node (trừ root) = 1 substring phân biệt.
7. **(Thêm) Longest word prefix consistency** — kiểm tra mọi từ trong danh sách có cùng một tiền tố không, dùng trie.

---

## Lời giải chi tiết

### Bài 1 — Implement Trie

**Cách tiếp cận.** Đúng như code mục 2.1: node giữ `children map[rune]*node` + `isEnd`. `insert`/`search`/`startsWith` đi xuống cây.

**Độ phức tạp.** Mỗi thao tác O(L). Bộ nhớ O(tổng độ dài các từ).

```go
// Xem code đầy đủ ở mục 2.1 — insert/search/startsWith/walk.
```

---

### Bài 2 — Word Search II (trie + DFS grid)

**Cách tiếp cận.** Nếu DFS từng từ riêng → O(W · 4^L) chậm. Thay vào đó: **dựng trie của tất cả từ**, rồi DFS từ mỗi ô lưới, mang theo con trỏ trie. Tại mỗi bước chỉ đi tiếp nếu trie còn cạnh tương ứng — **một lần DFS bắt nhiều từ**, prune cực mạnh.

```go
func findWords(board [][]byte, words []string) []string {
	type node struct {
		next map[byte]*node
		word string // != "" nếu node này kết thúc một từ (lưu luôn từ để khỏi build chuỗi)
	}
	root := &node{next: map[byte]*node{}}
	for _, w := range words { // build trie
		cur := root
		for i := 0; i < len(w); i++ {
			if cur.next[w[i]] == nil {
				cur.next[w[i]] = &node{next: map[byte]*node{}}
			}
			cur = cur.next[w[i]]
		}
		cur.word = w
	}
	R, C := len(board), len(board[0])
	var res []string
	var dfs func(r, c int, nd *node)
	dfs = func(r, c int, nd *node) {
		if r < 0 || r >= R || c < 0 || c >= C {
			return
		}
		ch := board[r][c]
		if ch == '#' || nd.next[ch] == nil { // ô đã thăm hoặc trie không có cạnh
			return
		}
		nxt := nd.next[ch]
		if nxt.word != "" {
			res = append(res, nxt.word)
			nxt.word = "" // tránh thêm trùng
		}
		board[r][c] = '#' // đánh dấu đã thăm
		dfs(r+1, c, nxt)
		dfs(r-1, c, nxt)
		dfs(r, c+1, nxt)
		dfs(r, c-1, nxt)
		board[r][c] = ch // backtrack
	}
	for r := 0; r < R; r++ {
		for c := 0; c < C; c++ {
			dfs(r, c, root)
		}
	}
	return res
}
```

**Độ phức tạp.** O(R·C · 4^Lmax) xấu nhất, nhưng trie prune khiến thực tế nhanh hơn nhiều. Bộ nhớ O(tổng độ dài từ).

---

### Bài 3 — Replace Words (trie prefix)

**Cách tiếp cận.** Dựng trie các root. Với mỗi từ trong câu, đi xuống trie theo từng ký tự; **dừng tại node `isEnd` đầu tiên** → đó là root ngắn nhất là tiền tố. Nếu không gặp root nào → giữ nguyên từ.

```go
func replaceWords(dict []string, sentence string) string {
	type node struct {
		next  map[byte]*node
		isEnd bool
	}
	root := &node{next: map[byte]*node{}}
	for _, w := range dict {
		cur := root
		for i := 0; i < len(w); i++ {
			if cur.next[w[i]] == nil {
				cur.next[w[i]] = &node{next: map[byte]*node{}}
			}
			cur = cur.next[w[i]]
		}
		cur.isEnd = true
	}
	shortestRoot := func(w string) string {
		cur := root
		for i := 0; i < len(w); i++ {
			if cur.next[w[i]] == nil {
				return w // không có tiền tố → giữ nguyên
			}
			cur = cur.next[w[i]]
			if cur.isEnd {
				return w[:i+1] // root ngắn nhất
			}
		}
		return w
	}
	words := splitSpace(sentence)
	for i, w := range words {
		words[i] = shortestRoot(w)
	}
	return joinSpace(words)
}

// splitSpace/joinSpace: dùng strings.Fields / strings.Join trong thực tế.
func splitSpace(s string) []string { /* strings.Fields(s) */ return nil }
func joinSpace(a []string) string  { /* strings.Join(a," ") */ return "" }
```

**Độ phức tạp.** Build O(tổng độ dài root). Thay thế O(tổng độ dài câu). Tổng O(D + S).

---

### Bài 4 — Multi-pattern search (Aho-Corasick)

**Cách tiếp cận.** Đúng code mục 6.1: build trie + failure (BFS) + match. Trả `[]Hit`.

**Độ phức tạp.** O(n + m + z). Xem walk-through "ushers" mục 5.1.

```go
// Xem code đầy đủ ở mục 6.1 — NewAhoCorasick + Match.
```

---

### Bài 5 — Stream of Characters (AC trên pattern đảo)

**Cách tiếp cận.** Cần kiểm tra: **hậu tố** của dòng ký tự đã nhận có khớp một từ không. Mẹo: **đảo ngược** mọi từ và dựng trie; mỗi khi nhận ký tự mới, đẩy vào đầu một buffer ký tự gần đây (đảo) và đi xuống trie. Nếu chạm node `isEnd` → trả true. Cách 2 (sạch hơn): dùng Aho-Corasick thường, **duy trì con trỏ automaton** qua các lần `query`, mỗi lần kiểm tra `cur.output` không rỗng.

```go
type StreamChecker struct {
	root *acNode // dùng acNode/NewAhoCorasick ở mục 6.1
	cur  *acNode
}

func Constructor(words []string) StreamChecker {
	ac := NewAhoCorasick(words) // trie + failure đã gộp output
	return StreamChecker{root: ac.root, cur: ac.root}
}

// query: nhận 1 ký tự, trả true nếu có từ kết thúc tại con trỏ hiện tại.
func (s *StreamChecker) query(letter byte) bool {
	for s.cur != s.root && s.cur.children[letter] == nil {
		s.cur = s.cur.fail
	}
	if nxt, ok := s.cur.children[letter]; ok {
		s.cur = nxt
	}
	return len(s.cur.output) > 0 // output đã gộp failure chain → bắt cả suffix-từ
}
```

**Độ phức tạp.** Build O(tổng độ dài từ). Mỗi `query` O(1) amortized (failure tụt tổng cộng bị chặn như mục 5).

---

### Bài 6 — Count Distinct Substrings (trie of suffixes)

**Cách tiếp cận.** Mọi chuỗi con của s là **một tiền tố của một hậu tố** nào đó. Chèn **tất cả hậu tố** của s vào một trie; khi đó **mỗi node (trừ root) tương ứng đúng một substring phân biệt** (đường đi từ root tới node là duy nhất). → Đếm số node tạo ra = số substring phân biệt.

```go
func countDistinctSubstrings(s string) int {
	type node struct{ next map[byte]*node }
	root := &node{next: map[byte]*node{}}
	count := 0
	for i := 0; i < len(s); i++ { // mỗi hậu tố s[i:]
		cur := root
		for j := i; j < len(s); j++ {
			c := s[j]
			if cur.next[c] == nil {
				cur.next[c] = &node{next: map[byte]*node{}}
				count++ // node mới = một substring phân biệt mới
			}
			cur = cur.next[c]
		}
	}
	return count
}
```

**Walk-through s = "aba".** Hậu tố: "aba","ba","a".
- "aba": tạo a, ab, aba → +3 (count=3).
- "ba": tạo b, ba → +2 (count=5). (node 'a' đã có từ trước, nhưng đây bắt đầu bằng 'b' nên là node mới.)
- "a": 'a' đã tồn tại → +0.
- **Kết quả 5**: {"a","b","ab","ba","aba"} — đúng 5 substring phân biệt. ✓

**Độ phức tạp.** O(n²) thời gian & bộ nhớ (trie of suffixes). Với n lớn dùng **suffix automaton / suffix array** (xem [Lesson 44](../lesson-44-suffix-structures/)) để đạt O(n).

---

### Bài 7 — Common prefix consistency

**Cách tiếp cận.** Dựng trie; đi xuống từ root khi **mỗi node chỉ có đúng 1 con và chưa kết thúc từ** → đó là phần tiền tố chung dài nhất (longest common prefix). Nếu cần kiểm tra "mọi từ cùng một tiền tố P" thì kiểm tra LCP có chứa P.

```go
func longestCommonPrefix(words []string) string {
	if len(words) == 0 { return "" }
	type node struct{ next map[byte]*node; isEnd bool }
	root := &node{next: map[byte]*node{}}
	for _, w := range words {
		cur := root
		for i := 0; i < len(w); i++ {
			if cur.next[w[i]] == nil { cur.next[w[i]] = &node{next: map[byte]*node{}} }
			cur = cur.next[w[i]]
		}
		cur.isEnd = true
	}
	var sb []byte
	cur := root
	for len(cur.next) == 1 && !cur.isEnd {
		var c byte
		for k := range cur.next { c = k }
		sb = append(sb, c)
		cur = cur.next[c]
	}
	return string(sb)
}
```

**Độ phức tạp.** Build O(tổng độ dài). Tìm LCP O(độ dài LCP).

---

## Code & Minh họa

- Lý thuyết + code Go inline ở trên (mục 2.1 cho Trie, mục 6.1 cho Aho-Corasick đầy đủ).
- **Minh họa tương tác:** [visualization.html](./visualization.html) — 3 module:
  1. **Trie builder** — chèn từ, vẽ cây trie, search/prefix highlight đường đi.
  2. **Aho-Corasick automaton** — build trie + failure links (mũi tên đứt), animate xây từng bước.
  3. **AC matching** — chạy text qua automaton, highlight nhiều pattern match cùng lúc.

## Bài tiếp theo

- [Lesson 44 — Suffix Structures](../lesson-44-suffix-structures/): suffix array, suffix automaton — khi cần đếm/so khớp substring ở quy mô O(n) thay vì O(n²) như trie-of-suffixes.
- Ôn lại [Lesson 41 — KMP](../lesson-41-kmp/) (failure function là linh hồn của Aho-Corasick) và [Lesson 42 — Z-Algorithm](../lesson-42-z-algorithm/).
