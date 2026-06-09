// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataStructures/01-Basic/lesson-06-hash-table/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 06 — Hash Table (Bảng băm)

## Mục tiêu

- Hiểu vì sao hash table tra cứu **$O(1)$ trung bình**.
- Biết cách xử lý xung đột (collision).
- Hiểu vì sao **hash function tốt** lại quan trọng (bẫy anagram).

## Tiền đề

- [Lesson 02 — Array](../lesson-02-array/) (biết mảng + truy cập theo chỉ số là $O(1)$).

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

**Không truy vấn nào động vào ô khác.** Đó là điểm cốt lõi → $O(1)$.

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

- **"Tính hash có đắt không, có làm chậm cả hệ thống không?"** — Không. $O(L)$ với $L$ = độ dài chuỗi (~20 ký tự cho username). Hằng số ~vài chục lệnh CPU. Quan trọng: **không phụ thuộc $n$** (số phần tử trong bảng). 10 phần tử hay 1 tỷ phần tử, vẫn vài chục lệnh.
- **"Vì sao chọn $\\bmod 10$?"** — Tùy ý cho minh hoạ. Production thường chọn $m$ = lũy thừa của 2 (Go) hoặc số nguyên tố (Java cũ) tùy chiến lược; $m=10$ chỉ để tính tay dễ.
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

Có. Chain dài 100 → tra một phần tử trong ô đó tốn $O(100)$, mất ưu thế.

Với hash **tốt** + load factor ~0.75 → mỗi ô trung bình **1-2 phần tử** → vẫn $O(1)$.

Chain dài khi nào? Khi hash function **tệ** → mục 5.

### 4.1. ⚠ Lỗi thường gặp khi xử lý xung đột

| Lỗi | Hậu quả | Cách sửa |
|-----|---------|----------|
| Chỉ kiểm tra \`slots[hash(k)] != nil\` rồi kết luận "có" | Sai khi đụng độ — \`eve\` hash về 0 nhưng \`slots[0]="alice"\` → trả nhầm | Phải **so chuỗi gốc**: \`slots[i].key == k\` |
| Chaining nhưng dùng list rất chậm để duyệt (vd $O(n)$ slice contains trong Python list) | Chain dài 100 → mỗi query 100 lần so sánh chuỗi | Giữ load factor $\\alpha \\leq 0,75$ qua resize |
| Open addressing nhưng khi \`Delete\` chỉ set ô về \`nil\` | Phá vỡ chuỗi probe — query sau bỏ qua phần tử thật sự còn ở ô sau | Đánh dấu **tombstone** thay vì set \`nil\` |
| Quên resize → $\\alpha$ lên tới 10, 20 | Mỗi ô chain 10-20 phần tử → hash table chậm như linear scan | Resize khi $\\alpha > 0,75$: cấp $m'=2m$, rehash hết |
| Trong chaining, để $m$ chia hết cho thừa số chung của hash | Nhiều giá trị mod về cùng ô | $m$ là nguyên tố, hoặc dùng hàm hash đã trộn bit |

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

$$h(s) = \\sum_{i=0}^{n-1} s[i]\\cdot 31^{\\,n-1-i} \\pmod{m}$$

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

### 5.1. 💡 Trực giác — vì sao "phụ thuộc vị trí" lại quan trọng

Hàm \`tổng ASCII\` xem chuỗi như **túi ký tự** (multiset) — mất thông tin về thứ tự. Hai túi cùng thành phần ⇒ cùng kết quả. Anagram chính là cùng túi.

Polynomial hash \`s[0]·31^(n-1) + s[1]·31^(n-2) + ...\` xem chuỗi như **dãy có thứ tự**. Mỗi vị trí có hệ số riêng (1, 31, 961, 29791, ...) → đổi vị trí = đổi hệ số = đổi kết quả. Giống đa thức trong toán: \`f(x) = 5x² + 3x + 1\` khác \`1x² + 3x + 5\`.

Analogy đời sống: số nhà "12 phố Hàng Bè" khác "21 phố Hàng Bè" — đổi thứ tự con số ra địa chỉ khác. Hash tệ là kiểu "cộng tất cả con số" → cùng kết quả, đến cùng địa chỉ.

### 5.2. Walk-through chi tiết polynomial cho \`"abc"\` (\`m=1_000_003\`)

| Bước | Phép tính | Giá trị |
|------|-----------|---------|
| 1 | \`'a'\`·31² | 97·961 = 93.217 |
| 2 | \`'b'\`·31¹ | 98·31 = 3.038 |
| 3 | \`'c'\`·31⁰ | 99·1 = 99 |
| 4 | Tổng | 93.217 + 3.038 + 99 = 96.354 |
| 5 | \`mod 1_000_003\` | **96.354** |

Verify với \`"cba"\`:
- \`'c'\`·31² = 99·961 = 95.139
- \`'b'\`·31¹ = 98·31 = 3.038
- \`'a'\`·31⁰ = 97·1 = 97
- Tổng = 98.274. Khác hoàn toàn 96.354. ✓ Không anagram-collision.

### 5.3. ⚠ Lỗi thường gặp về hash function

| Lỗi | Hậu quả | Cách sửa |
|-----|---------|----------|
| Dùng \`tổng ASCII mod m\` cho key thật | Mọi anagram collision, chain dài, query chậm | Polynomial hash hoặc dùng built-in \`map\` |
| Dùng \`len(s) mod m\` | Mọi chuỗi cùng độ dài đụng nhau | Đừng. |
| Dùng polynomial nhưng quên \`mod\` trong khi cộng dồn | Tràn số nguyên 64-bit khi $n$ lớn | \`h = (h*31 + c) mod m\` mỗi vòng |
| Đặt $m$ không nguyên tố (vd $m=100$) với polynomial 31 | Hashing dồn về subset ô do thừa số chung | $m$ nguyên tố hoặc lũy thừa của 2 + golden ratio mix |
| Hash tự viết cho object có field mutable | Sửa field sau \`Put\` → hash khác → mất phần tử | Key bất biến; hoặc lưu hash lúc Put rồi không re-hash |

### 5.4. ❓ Câu hỏi tự nhiên

- **"Vì sao 31, không phải 32 hay 37?"** — 31 nguyên tố (giảm collision pattern), nhỏ vừa đủ để \`31x = (x<<5) - x\` nhanh hơn nhân thường. 37 cũng ổn. 32 = lũy thừa của 2 → mất bit cao khi mod 2^k → tệ.
- **"Memhash của Go thực sự ngẫu nhiên?"** — Pseudo-random với **seed khởi tạo lúc start process**, để chống tấn công "hash flooding" (kẻ ác cố tạo dữ liệu collision để DoS). Mỗi lần chạy Go program, cùng chuỗi \`"alice"\` có thể ra hash khác — đó là tính năng, không phải bug.
- **"Tôi tự viết polynomial có an toàn không?"** — Đủ tốt cho học thuật và phần lớn ứng dụng. Không an toàn trước attacker biết được cách hash của bạn — vd web public, attacker có thể ép collision để DoS. Khi đó dùng SipHash hoặc randomized hash.

## 6. Hiệu năng thực tế

### Tính hash có đắt không?
$O(L)$ với $L$ = độ dài chuỗi (~20 ký tự cho username) → vài chục thao tác. **Hằng số, không phụ thuộc $n$.**

### Benchmark 1 triệu username
(file [solutions.go](./solutions.go) — chạy \`go run\`)

| Phương án | Mỗi truy vấn |
| --- | --- |
| Linear scan slice | ~1.7 **mili-giây** |
| \`map[string]struct{}\` | ~100 **nano-giây** |

→ Hash nhanh hơn **~16.000 lần** thực đo. Build set ban đầu mất ~400 ms (một lần duy nhất).

### 6.1. 🔁 Tự kiểm tra

1. Hash function trả về cùng kết quả cho 2 key khác nhau gọi là gì? Có làm hash table sai không?
   <details><summary>Đáp án</summary>**Collision (xung đột)**. Không làm sai — bảng vẫn lưu cả hai (chaining cho vào cùng list, open addressing tìm ô kế). Chỉ chậm hơn nếu collision nhiều.</details>
2. Cho \`m = 7\` và hash \`(tổng ASCII) mod m\`. Tính hash cho \`"ab"\`.
   <details><summary>Đáp án</summary>\`'a'\`=97, \`'b'\`=98, tổng=195. \`195 mod 7 = 6\` (vì \`7·27=189\`, \`195-189=6\`). → **6**.</details>
3. Vì sao build set ban đầu ~400 ms trong khi mỗi query chỉ ~100 ns? Phải chăng có gì sai?
   <details><summary>Đáp án</summary>Không sai. 400 ms = 1.000.000 × ~400 ns/insert (hash + cấp bộ nhớ + có thể resize). Mỗi query ~100 ns là **chỉ hash + đọc 1 ô**. Build trả phí một lần, query nhanh mọi lần sau.</details>

### 6.2. 📝 Tóm tắt mục 3-6

- Hash table = **tính** vị trí thay vì **tìm** → $O(1)$ trung bình mọi thao tác.
- Hash function tốt phải **phụ thuộc vị trí ký tự** (polynomial 31, memhash, SipHash) — không chỉ tổng.
- Hàm tệ (\`tổng ASCII\`) bị **bẫy anagram**: mọi hoán vị cùng hash → chain dài → suy biến về $O(n)$.
- Xung đột là **bình thường**, không phải lỗi; xử lý bằng chaining hoặc open addressing.
- Benchmark thực: hash nhanh hơn linear scan **~10.000 lần** khi $n = 10^6$.
- Tính hash chi phí $O(L)$ (độ dài key), **không phụ thuộc $n$** — đó là chìa khoá tốc độ.

## 7. Khi nào KHÔNG nên dùng hash?

| Yêu cầu | Cấu trúc phù hợp |
| --- | --- |
| Duyệt theo **thứ tự** key (alphabet) | TreeMap / TreeSet — [Lesson 04](../../02-Intermediate/lesson-04-balanced-trees/) |
| Tìm theo **tiền tố** ("ali..." → liệt kê) | Trie — [Lesson 05](../../02-Intermediate/lesson-05-trie/) |
| **Range query** (\`age BETWEEN 20 AND 30\`) | Balanced BST |
| Chấp nhận sai ~1%, RAM cực hạn (vd 1 tỷ phần tử) | Bloom filter — [Lesson 04](../../03-Advanced/lesson-04-advanced-structures/) |

## 8. HashSet vs HashMap

- **HashSet**: lưu key, kiểm tra "có tồn tại". Go: \`map[K]struct{}\` (struct rỗng = 0 byte).
- **HashMap**: lưu cặp \`(key, value)\`. Go: \`map[K]V\`.

Cùng cơ chế hash bên dưới.

## 9. Load factor và resize

$\\alpha = n / m$ = số phần tử / số ô.
- Quá thấp → lãng phí bộ nhớ.
- Quá cao → chain dài → chậm.

Đa số hash table giữ $\\alpha \\leq 0,75$. Vượt ngưỡng → **resize**: cấp mảng mới gấp đôi, hash lại toàn bộ. Một lần resize $O(n)$; amortized mỗi insert vẫn $O(1)$.

### 9.1. Walk-through resize cụ thể

Bảng $m=4$, đã có 3 phần tử ($\\alpha = 0,75$). Insert phần tử thứ 4 ($\\alpha = 1,0 > 0,75$) → kích hoạt resize:

| Bước | Trạng thái | Chi phí |
|------|------------|---------|
| 1 | Cấp mảng mới $m'=8$ | $O(m')$ cấp bộ nhớ |
| 2 | Với mỗi phần tử trong bảng cũ, tính hash mod $m'$ mới, đặt vào bảng mới | $O(n)$ rehash |
| 3 | Bỏ bảng cũ, gán bảng mới | $O(1)$ |

Một lần insert đó tốn $O(n)$. Nhưng giữa các lần resize, có **~n insert rẻ** $O(1)$. Trung bình mỗi insert: $(O(n) + n\\cdot O(1)) / n = O(1)$ — đây là **amortized analysis**.

**Vì sao gấp đôi, không thêm hằng số?** Nếu thêm $+10$ mỗi lần, sau $n$ insert phải resize $n/10$ lần, tổng $O(n^2)$. Gấp đôi → tổng resize $O(n)$ (chuỗi hình học: $1+2+4+...+n \\approx 2n$).

### 9.2. 🔁 Tự kiểm tra

1. Cho $n = 100, m = 128$. Tính $\\alpha$.
   <details><summary>Đáp án</summary>$\\alpha = 100/128 \\approx 0,78$. Vượt 0,75 → resize ở insert tiếp theo.</details>
2. Vì sao amortized insert vẫn $O(1)$ dù có lần insert tốn $O(n)$?
   <details><summary>Đáp án</summary>Resize gấp đôi. Tổng chi phí n insert ≈ $n\\cdot c + (1+2+4+...+n) = n\\cdot c + 2n = O(n)$. Chia trung bình mỗi insert $O(1)$.</details>

## 10. Bảng độ phức tạp

| Thao tác | Trung bình | Xấu nhất |
| --- | --- | --- |
| Find | $O(1)$ | $O(n)$ |
| Insert | $O(1)$ amortized | $O(n)$ |
| Delete | $O(1)$ | $O(n)$ |

Xấu nhất chỉ khi hash function thật sự kém — runtime chuẩn (Go/Java/Python) không gặp.

---

## Bài tập

1. Cài đặt một HashMap với chaining: \`Put\`, \`Get\`, \`Remove\`.
2. Đếm tần suất từ trong một văn bản.
3. Cho mảng số nguyên, tìm hai số có tổng bằng $k$ trong $O(n)$.
4. Vì sao $\\alpha > 1$ chỉ có thể với chaining, không với open addressing?
5. Vì sao không nên dùng String mutable làm key trong HashMap?

## Lời giải chi tiết

### Bài 1 — HashMap chaining
Mỗi ô là list các cặp \`(key, value)\`. Khi $\\alpha > 0,75$ thì resize. Cài đặt đầy đủ trong [solutions.go](./solutions.go).
\`\`\`go
type HashMap struct{ buckets [][]entry; cap, size int }
func (m *HashMap) Put(k string, v int) { /* hash → bucket → append/cập nhật */ }
func (m *HashMap) Get(k string) (int, bool) { /* duyệt bucket */ }
func (m *HashMap) Remove(k string) bool { /* duyệt bucket → bỏ entry */ }
\`\`\`
Trung bình $O(1)$.

### Bài 2 — Word count
\`\`\`go
func wordCount(text string) map[string]int {
    out := map[string]int{}
    for _, w := range strings.Fields(text) { out[w]++ }
    return out
}
\`\`\`
$O(n)$ với $n$ = tổng số ký tự.

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
- **Chaining**: mỗi ô là list, chứa nhiều phần tử → $n > m$ được.
- **Open addressing**: mỗi ô chứa 1 phần tử → $n \\leq m$, do đó $\\alpha \\leq 1$. Khi $n = m$ bảng đầy hoàn toàn.

### Bài 5 — Không dùng mutable key
Nếu key bị sửa sau \`Put\`, \`hash(key_mới)\` khác \`hash(key_cũ)\`. Lần \`Get\` sau đi tới sai ô → "mất" phần tử (vẫn còn ở ô cũ nhưng không truy cập được). Quy tắc: **key phải bất biến**.

## Code

- [solutions.go](./solutions.go) — chứa: walk-through hash bằng tay, demo anagram + polynomial, benchmark 1M user, HashMap chaining tự cài, word count, two-sum.
- [visualization.html](./visualization.html) — thao tác hash table với chaining (đã tạo từ phiên trước).

## Bài tiếp theo

[Lesson 01 — Tree](../../02-Intermediate/lesson-01-tree/)
`;
