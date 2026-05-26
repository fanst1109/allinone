// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataStructures/lesson-05-hash-table/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 05 — Hash Table (Bảng băm)

## Mục tiêu

- Hiểu vì sao hash table tra cứu **\`O(1)\` trung bình**.
- Biết cách xử lý xung đột (collision).
- Hiểu vì sao **hash function tốt** lại quan trọng (bẫy anagram).

## Tiền đề

- [Lesson 01 — Array](../lesson-01-array/) (biết mảng + truy cập theo chỉ số là \`O(1)\`).

---

## 1. Bài toán mở đầu

Cho **1 triệu username**, kiểm tra một username mới có tồn tại không.

Yêu cầu: trả lời càng nhanh càng tốt — sign-up form gọi API mỗi khi user gõ phím.

### Cách ngây thơ — duyệt mảng

\`\`\`go
users := []string{...}                       // 1.000.000 chuỗi
func exists(u string) bool {
    for _, x := range users {
        if x == u { return true }
    }
    return false
}
\`\`\`

Tệ nhất so sánh **1.000.000 chuỗi** → vài mili-giây mỗi lần. Hàng nghìn request/giây → server đứng.

## 2. Ý tưởng: *tính* vị trí thay vì *tìm*

> **Linear scan**: tìm tới khi gặp → so sánh nhiều phần tử.
> **Hash table**: tính ra vị trí → đi thẳng tới 1 ô.

Có một mảng \`slots[m]\` và một hàm \`hash(s)\` trả ra số nguyên trong \`[0, m)\`. Khi:
- **Thêm** \`"alice"\`: tính \`i = hash("alice")\`, đặt \`slots[i] = "alice"\`.
- **Kiểm tra** \`"alice"\`: tính lại \`i = hash("alice")\` (cùng hàm → cùng kết quả), nhìn \`slots[i]\`.

Không phải duyệt — chỉ tính + đọc một ô.

**Analogy**: thư viện 1 triệu cuốn sách. Linear scan = đi từng kệ. Hash = công thức \`tên sách → số kệ\`, đi thẳng tới kệ đó.

## 3. Mô phỏng cụ thể (bảng 10 ô, hash bằng tay)

Dùng hàm hash đơn giản nhất để dễ tính: \`hash(s) = (tổng mã ASCII các ký tự) mod 10\`.

> **Cảnh báo**: hàm này không dùng production. Lý do sẽ chỉ ra ở mục 5 — nhưng đủ để minh họa cơ chế.

### Thêm 5 username

| Username | Tính hash | Index |
| --- | --- | --- |
| \`"alice"\` | 97+108+105+99+101 = 510 → mod 10 | **0** |
| \`"bob"\`   | 98+111+98 = 307 → mod 10           | **7** |
| \`"eve"\`   | 101+118+101 = 320 → mod 10         | **0** (đụng độ!) |
| \`"carol"\` | (tổng) = 529 → mod 10              | **9** |
| \`"dave"\`  | (tổng) = 416 → mod 10              | **6** |

Bảng cuối cùng (xung đột "alice"/"eve" để chung 1 ô — xem mục 4):
\`\`\`
index:  0              6        7       9
slots: [alice, eve]   dave    bob     carol
(các ô 1,2,3,4,5,8 trống)
\`\`\`

### Truy vấn

| Câu hỏi | Bước làm | Số so sánh chuỗi |
| --- | --- | --- |
| \`"alice"\` có không? | hash=0; nhìn slots[0]; "alice"=="alice" | **1** → CÓ |
| \`"frank"\` có không? | hash=4; nhìn slots[4]; ô trống | **0** → KHÔNG |
| \`"eve"\` có không? | hash=0; nhìn slots[0]; "alice"≠"eve" → "eve"=="eve" | **2** → CÓ |

**Không truy vấn nào động vào ô khác.** Đó là điểm cốt lõi → \`O(1)\`.

### 3.1. 💡 Trực giác — "công thức tên → kệ"

Hình dung thư viện 10 kệ (\`slots[0..9]\`). Thay vì đi dọc từng kệ tìm cuốn \`"alice"\`, thủ thư có **công thức cố định**: cộng mã ASCII các chữ rồi \`mod 10\`. Mọi người (cả lúc cất, cả lúc tìm) đều áp **cùng một công thức** → cuốn \`"alice"\` luôn ở **kệ 0**, không cần bộ nhớ "tôi đã cất ở đâu".

Điểm tuyệt vời: thời gian áp công thức **không phụ thuộc số sách trong thư viện**. 10 cuốn hay 1 triệu cuốn, vẫn cộng 5 chữ rồi mod. Còn linear scan tỉ lệ thuận với số sách → 1 triệu cuốn chậm gấp 100.000 lần 10 cuốn.

Đổi lại: thủ thư phải **thiết kế công thức tốt**. Nếu công thức xấu (vd "luôn trả 0"), mọi sách dồn 1 kệ → tệ như linear scan. Đây là vai trò của hash function ở mục 5.

### 3.2. Walk-through cụ thể từng bước cho \`"bob"\`

Có người tự hỏi *"ASCII là gì? Tôi cộng đúng không?"* — đây là tính tay đầy đủ:

| Ký tự | Mã ASCII | Cách nhớ |
|-------|----------|----------|
| \`'b'\` | 98 | \`'a'\`=97, đếm tới |
| \`'o'\` | 111 | \`'a'\`=97 + 14 |
| \`'b'\` | 98 | |
| **Tổng** | **307** | |

\`307 mod 10 = 7\` (vì \`307 = 30·10 + 7\`). Vậy \`"bob"\` rơi vào \`slots[7]\`.

Verify bằng Go nếu nghi ngờ: \`fmt.Println('b', 'o', 'b')\` → \`98 111 98\`.

### 3.3. ❓ Câu hỏi tự nhiên

- **"Tính hash có đắt không, có làm chậm cả hệ thống không?"** — Không. \`O(L)\` với \`L\` = độ dài chuỗi (~20 ký tự cho username). Hằng số ~vài chục lệnh CPU. Quan trọng: **không phụ thuộc \`n\`** (số phần tử trong bảng). 10 phần tử hay 1 tỷ phần tử, vẫn vài chục lệnh.
- **"Vì sao chọn \`mod 10\`?"** — Tùy ý cho minh hoạ. Production thường chọn \`m\` = lũy thừa của 2 (Go) hoặc số nguyên tố (Java cũ) tùy chiến lược; \`m=10\` chỉ để tính tay dễ.
- **"Nếu hai username khác nhau ra cùng hash thì hash table trả sai à?"** — **Không sai, chỉ chậm hơn**. Khi đụng độ (xem mục 4), hash table vẫn lưu cả hai, lúc query so sánh chuỗi gốc để phân biệt. Sai chỉ xảy ra khi code bỏ qua bước so sánh — đó là bug, không phải tính chất của hash table.
- **"Trong Go thật tôi có phải tự viết hàm hash này không?"** — Không. \`map[string]V\` của Go built-in dùng memhash (mục 5.3). Bạn chỉ viết hash thủ công khi học thuật, hoặc làm cấu trúc đặc thù (Bloom filter, perfect hashing...).

## 4. Xung đột thì sao?

"alice" và "eve" cùng \`hash = 0\`. Hai cách xử lý:

### Chaining (cách trên)
Mỗi ô là một **list nhỏ**: \`slots[0] = ["alice", "eve"]\`. Khi tra, duyệt list trong ô đó.

### Open addressing
Nếu ô bị chiếm, **thử ô kế tiếp** (\`i+1\`, \`i+2\`, ...). Tốn ít bộ nhớ phụ nhưng khi xóa cần đánh dấu "tombstone".

Hầu hết runtime (Java HashMap, Go map cũ) dùng **chaining**. Trong bài này cũng dùng chaining.

### Chain dài có làm chậm không?

Có. Chain dài 100 → tra một phần tử trong ô đó tốn \`O(100)\`, mất ưu thế.

Với hash **tốt** + load factor ~0.75 → mỗi ô trung bình **1-2 phần tử** → vẫn \`O(1)\`.

Chain dài khi nào? Khi hash function **tệ** → mục 5.

### 4.1. ⚠ Lỗi thường gặp khi xử lý xung đột

| Lỗi | Hậu quả | Cách sửa |
|-----|---------|----------|
| Chỉ kiểm tra \`slots[hash(k)] != nil\` rồi kết luận "có" | Sai khi đụng độ — \`eve\` hash về 0 nhưng \`slots[0]="alice"\` → trả nhầm | Phải **so chuỗi gốc**: \`slots[i].key == k\` |
| Chaining nhưng dùng list rất chậm để duyệt (vd \`O(n)\` slice contains trong Python list) | Chain dài 100 → mỗi query 100 lần so sánh chuỗi | Giữ load factor \`α ≤ 0.75\` qua resize |
| Open addressing nhưng khi \`Delete\` chỉ set ô về \`nil\` | Phá vỡ chuỗi probe — query sau bỏ qua phần tử thật sự còn ở ô sau | Đánh dấu **tombstone** thay vì set \`nil\` |
| Quên resize → \`α\` lên tới 10, 20 | Mỗi ô chain 10-20 phần tử → hash table chậm như linear scan | Resize khi \`α > 0.75\`: cấp \`m'=2m\`, rehash hết |
| Trong chaining, để \`m\` chia hết cho thừa số chung của hash | Nhiều giá trị mod về cùng ô | \`m\` là nguyên tố, hoặc dùng hàm hash đã trộn bit |

## 5. Hash function tốt vs tệ — bẫy anagram

Hàm \`(tổng ASCII) mod m\` ở mục 3 **bị lỗi nghiêm trọng**. Phép cộng có tính giao hoán → đổi thứ tự ký tự không đổi tổng → mọi anagram cùng hash.

### Ví dụ cụ thể

\`\`\`
"alice" = 97+108+105+99+101 = 510 → mod 10 = 0
"elica" = 101+108+105+99+97 = 510 → mod 10 = 0
"celia" = 99+101+108+105+97 = 510 → mod 10 = 0
"lecia" = ... cũng 510            → 0
\`\`\`

→ Toàn bộ anagram của "alice" dồn về \`slots[0]\`. Chain dài, các ô khác trống — gọi là **clustering**.

Hash table vẫn cho **kết quả đúng** (chain xử lý), chỉ **chậm dần xuống mức linear scan**.

### Cách sửa: polynomial hash

Cho **vị trí** ảnh hưởng đến kết quả bằng phép nhân:

\`\`\`
h(s) = s[0]·31^(n-1) + s[1]·31^(n-2) + ... + s[n-1]·31^0   (mod m)
\`\`\`

Tính cụ thể (đã verify bằng Go):

| Chuỗi | Polynomial | mod 1_000_003 |
| --- | --- | --- |
| \`"alice"\` | 92.903.040 | **902.764** |
| \`"elica"\` | 96.597.120 | **596.832** |
| \`"celia"\` | 94.544.610 | **544.328** |

Ba index hoàn toàn khác nhau → không xung đột.

**Trực giác**: hệ số \`31^k\` khác ở mỗi vị trí. Đổi thứ tự ký tự = đổi hệ số mỗi ký tự = đổi kết quả.

**Vì sao chọn 31?** Số nguyên tố, nhỏ (\`31x = (x<<5) - x\`), Java \`String.hashCode()\` dùng nó.

### Trong code production bạn không tự viết

\`\`\`go
m := map[string]struct{}{}
m["alice"] = struct{}{}
m["elica"] = struct{}{}
// Runtime Go đưa hai key vào hai bucket khác hẳn. Không xung đột.
\`\`\`

- **Go**: memhash (dựa AES-NI khi có).
- **Java**: polynomial hash 31 cho \`String\`.
- **Python**: SipHash.

Tất cả đều phụ thuộc vị trí, chống anagram + chống pattern độc hại.

## 6. Hiệu năng thực tế

### Tính hash có đắt không?
\`O(L)\` với \`L\` = độ dài chuỗi (~20 ký tự cho username) → vài chục thao tác. **Hằng số, không phụ thuộc \`n\`.**

### Benchmark 1 triệu username
(file [solutions.go](./solutions.go) — chạy \`go run\`)

| Phương án | Mỗi truy vấn |
| --- | --- |
| Linear scan slice | ~1.7 **mili-giây** |
| \`map[string]struct{}\` | ~100 **nano-giây** |

→ Hash nhanh hơn **~16.000 lần** thực đo. Build set ban đầu mất ~400 ms (một lần duy nhất).

## 7. Khi nào KHÔNG nên dùng hash?

| Yêu cầu | Cấu trúc phù hợp |
| --- | --- |
| Duyệt theo **thứ tự** key (alphabet) | TreeMap / TreeSet — [Lesson 09](../lesson-09-balanced-trees/) |
| Tìm theo **tiền tố** ("ali..." → liệt kê) | Trie — [Lesson 10](../lesson-10-trie/) |
| **Range query** (\`age BETWEEN 20 AND 30\`) | Balanced BST |
| Chấp nhận sai ~1%, RAM cực hạn (vd 1 tỷ phần tử) | Bloom filter — [Lesson 14](../lesson-14-advanced-structures/) |

## 8. HashSet vs HashMap

- **HashSet**: lưu key, kiểm tra "có tồn tại". Go: \`map[K]struct{}\` (struct rỗng = 0 byte).
- **HashMap**: lưu cặp \`(key, value)\`. Go: \`map[K]V\`.

Cùng cơ chế hash bên dưới.

## 9. Load factor và resize

\`α = n / m\` = số phần tử / số ô.
- Quá thấp → lãng phí bộ nhớ.
- Quá cao → chain dài → chậm.

Đa số hash table giữ \`α ≤ 0.75\`. Vượt ngưỡng → **resize**: cấp mảng mới gấp đôi, hash lại toàn bộ. Một lần resize \`O(n)\`; amortized mỗi insert vẫn \`O(1)\`.

## 10. Bảng độ phức tạp

| Thao tác | Trung bình | Xấu nhất |
| --- | --- | --- |
| Find | \`O(1)\` | \`O(n)\` |
| Insert | \`O(1)\` amortized | \`O(n)\` |
| Delete | \`O(1)\` | \`O(n)\` |

Xấu nhất chỉ khi hash function thật sự kém — runtime chuẩn (Go/Java/Python) không gặp.

---

## Bài tập

1. Cài đặt một HashMap với chaining: \`Put\`, \`Get\`, \`Remove\`.
2. Đếm tần suất từ trong một văn bản.
3. Cho mảng số nguyên, tìm hai số có tổng bằng \`k\` trong \`O(n)\`.
4. Vì sao \`α > 1\` chỉ có thể với chaining, không với open addressing?
5. Vì sao không nên dùng String mutable làm key trong HashMap?

## Lời giải chi tiết

### Bài 1 — HashMap chaining
Mỗi ô là list các cặp \`(key, value)\`. Khi \`α > 0.75\` thì resize. Cài đặt đầy đủ trong [solutions.go](./solutions.go).
\`\`\`go
type HashMap struct{ buckets [][]entry; cap, size int }
func (m *HashMap) Put(k string, v int) { /* hash → bucket → append/cập nhật */ }
func (m *HashMap) Get(k string) (int, bool) { /* duyệt bucket */ }
func (m *HashMap) Remove(k string) bool { /* duyệt bucket → bỏ entry */ }
\`\`\`
Trung bình \`O(1)\`.

### Bài 2 — Word count
\`\`\`go
func wordCount(text string) map[string]int {
    out := map[string]int{}
    for _, w := range strings.Fields(text) { out[w]++ }
    return out
}
\`\`\`
\`O(n)\` với \`n\` = tổng số ký tự.

### Bài 3 — Two-sum \`O(n)\`
Duyệt một lần. Với mỗi \`x\`, xem \`k - x\` đã thấy chưa.
\`\`\`go
func twoSum(nums []int, k int) (int, int, bool) {
    seen := map[int]int{}
    for i, x := range nums {
        if j, ok := seen[k-x]; ok { return j, i, true }
        seen[x] = i
    }
    return 0, 0, false
}
\`\`\`

### Bài 4 — \`α > 1\` chỉ ở chaining
- **Chaining**: mỗi ô là list, chứa nhiều phần tử → \`n > m\` được.
- **Open addressing**: mỗi ô chứa 1 phần tử → \`n ≤ m\`, do đó \`α ≤ 1\`. Khi \`n = m\` bảng đầy hoàn toàn.

### Bài 5 — Không dùng mutable key
Nếu key bị sửa sau \`Put\`, \`hash(key_mới)\` khác \`hash(key_cũ)\`. Lần \`Get\` sau đi tới sai ô → "mất" phần tử (vẫn còn ở ô cũ nhưng không truy cập được). Quy tắc: **key phải bất biến**.

## Code

- [solutions.go](./solutions.go) — chứa: walk-through hash bằng tay, demo anagram + polynomial, benchmark 1M user, HashMap chaining tự cài, word count, two-sum.
- [visualization.html](./visualization.html) — thao tác hash table với chaining (đã tạo từ phiên trước).

## Bài tiếp theo

[Lesson 06 — Tree](../lesson-06-tree/)
`;
