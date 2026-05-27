// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Algorithms/lesson-21-huffman-encoding/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 21 — Huffman Encoding (Mã hóa Huffman)

> **Tier 3 — Greedy** · Bài thứ 3/4
> Greedy xây cây nhị phân tối ưu để **nén dữ liệu không mất mát (lossless compression)**.

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao mã độ dài cố định (fixed-length code) lãng phí** và mã độ dài thay đổi (variable-length code) tiết kiệm được bao nhiêu.
- Nắm khái niệm **prefix code** (mã tiền tố) và vì sao nó giải mã được mà không cần dấu phân cách.
- Cài đặt **thuật toán Huffman** bằng greedy + min-heap, từ đếm tần suất tới xây cây và gán mã.
- Chứng minh **vì sao greedy của Huffman cho cây tối ưu** (exchange argument).
- Viết được hàm **encode / decode** và tính **tỉ lệ nén (compression ratio)** với số cụ thể.
- Biết Huffman nằm ở đâu trong các định dạng thực tế (ZIP/gzip, JPEG, MP3).

## Kiến thức tiền đề

- **Min-heap / priority queue** — Huffman lấy "2 phần tử nhỏ nhất" lặp đi lặp lại, đây chính là \`ExtractMin\`. Ôn lại tại [DataStructures — Heap & Priority Queue](../../DataStructures/02-Intermediate/lesson-03-heap-priority-queue/).
- **Cây nhị phân (binary tree)** — mã Huffman chính là đường đi từ gốc tới lá. Xem [DataStructures — Tree](../../DataStructures/02-Intermediate/lesson-01-tree/).
- **Tư tưởng greedy** — chọn tối ưu cục bộ ở mỗi bước. Ôn [Lesson 19 — Greedy Fundamentals](../lesson-19-greedy-fundamentals/).
- Big-O cơ bản — [Lesson 01 — Big-O](../lesson-01-bigo-asymptotic/).

---

## 1. Vấn đề nén: vì sao fixed-length code lãng phí

> 💡 **Trực giác / Hình dung.** Hãy tưởng tượng bạn gửi điện tín tính tiền theo **số ký tự gửi đi**. Có những chữ bạn dùng rất nhiều (\`e\`, \`a\`, dấu cách), có chữ hiếm khi dùng (\`z\`, \`q\`, \`x\`). Nếu mọi chữ đều tốn **cùng một số tiền**, bạn đang trả "giá đắt" cho cả chữ hiếm lẫn chữ thường xuyên. Khôn ngoan hơn: **chữ hay gặp thì gán mã ngắn, chữ hiếm gặp thì gán mã dài** — giống mã Morse, chữ \`E\` (hay gặp nhất tiếng Anh) là một dấu chấm \`.\`, còn \`Q\` là \`--·-\`.

### 1.1 Fixed-length code

Máy tính lưu ký tự bằng **mã độ dài cố định**: ASCII dùng 8 bit cho mỗi ký tự, bất kể ký tự đó xuất hiện nhiều hay ít. Nếu bảng chữ chỉ có 4 ký tự \`{a, b, c, d}\`, ta chỉ cần \`⌈log₂ 4⌉ = 2\` bit mỗi ký tự:

| Ký tự | Mã 2-bit |
|-------|----------|
| \`a\`   | \`00\`     |
| \`b\`   | \`01\`     |
| \`c\`   | \`10\`     |
| \`d\`   | \`11\`     |

Với chuỗi có **n** ký tự, fixed-length tốn \`n × 2\` bit, **không phụ thuộc tần suất**.

**Ví dụ số 1.** Chuỗi \`"aaaaabbcd"\` (n = 9): fixed-length = \`9 × 2 = 18\` bit.

**Ví dụ số 2.** Chuỗi \`"abracadabra"\` (n = 11, bảng chữ \`{a,b,r,c,d}\` → 5 ký tự → cần 3 bit): fixed-length = \`11 × 3 = 33\` bit.

**Ví dụ số 3.** Một file text 1.000 ký tự thuần ASCII: \`1000 × 8 = 8000\` bit = 1000 byte.

**Ví dụ số 4.** Bảng chữ 2 ký tự \`{a,b}\`: chỉ cần 1 bit/ký tự — fixed-length đã tối ưu, Huffman không cải thiện được gì.

### 1.2 Variable-length code: ý tưởng cốt lõi

Nếu \`a\` xuất hiện 5 lần còn \`c\`, \`d\` mỗi chữ chỉ 1 lần, tại sao phải trả **cùng 2 bit** cho cả \`a\` lẫn \`d\`? Hãy gán:

| Ký tự | Tần suất | Mã variable-length |
|-------|----------|--------------------|
| \`a\`   | 5        | \`0\` (1 bit)        |
| \`b\`   | 2        | \`10\` (2 bit)       |
| \`c\`   | 1        | \`110\` (3 bit)      |
| \`d\`   | 1        | \`111\` (3 bit)      |

**Tổng bit** = \`5×1 + 2×2 + 1×3 + 1×3 = 5 + 4 + 3 + 3 = 15\` bit.

So với fixed-length 2-bit: \`(5+2+1+1) × 2 = 9 × 2 = 18\` bit. **Tiết kiệm 3 bit (~16,7%)** — và đây mới là chuỗi tí hon. Với file lớn, độ tiết kiệm đáng kể hơn nhiều.

> **Mục tiêu của bài:** tìm cách gán mã variable-length sao cho **tổng số bit là nhỏ nhất** — đó chính là điều thuật toán Huffman làm, và nó cho kết quả **tối ưu** trong lớp prefix code per-symbol.

> ⚠ **Lỗi thường gặp.** "Chữ hay gặp gán mã ngắn" là *trực giác đúng* nhưng chưa đủ. Nếu gán bừa \`a→0\`, \`b→1\`, \`c→01\`, \`d→10\` thì khi nhận chuỗi bit \`01\` ta không biết đó là \`c\` hay là \`a\` rồi \`b\`. Mã phải thỏa thêm tính chất **prefix** (mục 2) thì mới giải mã được.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Chuỗi \`"aaab"\` mã hóa bằng bảng variable-length ở trên (\`a→0\`, \`b→10\`) tốn bao nhiêu bit?
> 2. Cùng chuỗi đó fixed-length 2-bit tốn bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. \`a a a b\` → \`0 0 0 10\` = \`5\` bit.
> 2. \`4 × 2 = 8\` bit. Variable-length tiết kiệm 3 bit.
> </details>

> 📝 **Tóm tắt mục 1.** Fixed-length trả cùng số bit cho mọi ký tự → lãng phí khi tần suất lệch. Variable-length gán mã ngắn cho ký tự hay gặp → ít bit hơn. Bài toán: tối thiểu **tổng bit = Σ (tần suất × độ dài mã)**.

---

## 2. Prefix code: nền tảng để giải mã không nhập nhằng

> 💡 **Trực giác.** Số điện thoại khẩn cấp ở Việt Nam: \`113\` (công an), \`114\` (cứu hỏa), \`115\` (cấp cứu). Không có số khẩn cấp nào bắt đầu bằng \`113...\` rồi dài hơn — vì nếu có số \`1135\` thì tổng đài bấm \`113\` xong sẽ phân vân "chờ thêm số nữa hay xử lý luôn?". **Prefix code** chính là quy tắc này: **không mã nào là tiền tố (prefix) của mã khác**.

### 2.1 Định nghĩa

Một bộ mã là **prefix code** (còn gọi *prefix-free code*) nếu **không có mã nào là tiền tố của một mã khác**.

Bảng ở mục 1.2 là prefix code:
- \`0\` không là tiền tố của \`10\`, \`110\`, \`111\` ✓
- \`10\` không là tiền tố của \`110\`, \`111\` ✓
- \`110\` không là tiền tố của \`111\` ✓

**Hệ quả thần kỳ:** khi giải mã, đọc bit từ trái sang phải, *ngay khi* chuỗi bit khớp một mã hoàn chỉnh, ta biết chắc đó là ký tự đó — **không cần dấu phân cách**, không nhập nhằng.

**Ví dụ giải mã.** Nhận \`01010\` với bảng \`{a:0, b:10, c:110, d:111}\`:
- \`0\` → khớp \`a\`. Còn \`1010\`.
- \`1\` → chưa khớp gì. \`10\` → khớp \`b\`. Còn \`10\`.
- \`10\` → khớp \`b\`.
- Kết quả: \`abb\`. **Chỉ có một cách đọc duy nhất.**

### 2.2 Cây nhị phân biểu diễn prefix code

Mọi prefix code tương ứng **1-1** với một **cây nhị phân**:
- **Lá (leaf)** = một ký tự.
- Đi sang **trái = bit 0**, sang **phải = bit 1**.
- **Mã của một ký tự** = chuỗi bit trên đường đi từ gốc tới lá đó.

Vì ký tự chỉ nằm ở **lá** (không ở node trong), nên không mã nào là tiền tố của mã khác → tự động là prefix code. Cây cho bảng trên:

\`\`\`
            (root)
           /      \\
         0/        \\1
        [a]       (·)
                 /    \\
               0/      \\1
              [b]      (·)
                      /    \\
                    0/      \\1
                  [c]       [d]

a=0   b=10   c=110   d=111
\`\`\`

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vì sao ký tự phải ở lá, không được ở node trong?"* — Nếu một ký tự \`x\` nằm ở node trong (có con), thì mã của \`x\` là tiền tố của mọi ký tự nằm dưới nó → vi phạm prefix. Vậy đặt ký tự ở lá là **cách duy nhất** đảm bảo prefix-free.
> - *"Cây có cần là cây cân bằng không?"* — Không. Cây Huffman thường **lệch** (skewed): ký tự hay gặp gần gốc (mã ngắn), ký tự hiếm sâu dưới (mã dài). Chính sự lệch này là nguồn tiết kiệm.
> - *"Có nhiều cây cho cùng tần suất không?"* — Có (do tie-breaking, xem mục 11), nhưng tất cả đều cho **cùng tổng bit tối ưu**.

> ⚠ **Lỗi thường gặp.** Đừng nhầm cây Huffman với **cây tìm kiếm nhị phân (BST)**. BST sắp theo *giá trị khóa* để tìm kiếm; cây Huffman sắp theo *tần suất* để nén, không có thứ tự tìm kiếm nào cả.

> 🔁 **Dừng lại tự kiểm tra.** Bảng \`{a:0, b:11, c:10}\` có phải prefix code không? Vẽ cây.
>
> <details><summary>Đáp án</summary>
>
> Có. \`0\` không là tiền tố của \`11\` hay \`10\`; \`11\` và \`10\` không là tiền tố của nhau. Cây: gốc → trái \`[a]\`, phải → (trái \`[c]=10\`, phải \`[b]=11\`).
> </details>

> 📝 **Tóm tắt mục 2.** Prefix code = không mã nào là tiền tố mã khác → giải mã không nhập nhằng, không cần dấu phân cách. Mỗi prefix code ↔ một cây nhị phân với ký tự ở lá, trái=0 phải=1.

---

## 3. Thuật toán Huffman (greedy)

> 💡 **Trực giác.** Hai ký tự **hiếm nhất** sẽ phải có **mã dài nhất** (nằm sâu nhất trong cây). Greedy của Huffman: cứ "ghép" hai phần tử **nhẹ nhất (weight nhỏ nhất)** lại với nhau thành một cụm, cụm đó coi như một "siêu ký tự" có weight = tổng, rồi lặp lại. Hai phần tử nhẹ nhất được ghép sớm nhất → bị đẩy xuống sâu nhất → nhận mã dài nhất. Đúng như ta mong muốn.

### 3.1 Các bước

1. **Đếm tần suất** mỗi ký tự trong dữ liệu.
2. Tạo **một node lá** cho mỗi ký tự, với \`weight = tần suất\`. Đẩy tất cả vào **min-heap** (priority queue sắp theo weight nhỏ nhất ở đỉnh).
3. **Lặp** cho tới khi heap còn đúng 1 node:
   - \`x ← ExtractMin()\` (node weight nhỏ nhất)
   - \`y ← ExtractMin()\` (node weight nhỏ nhì)
   - Tạo node cha \`z\` với \`z.weight = x.weight + y.weight\`, \`z.left = x\`, \`z.right = y\`.
   - \`Insert(z)\` đẩy \`z\` trở lại heap.
4. Node cuối cùng còn lại trong heap = **gốc cây Huffman**.
5. **Gán mã** bằng DFS: đi sang trái thêm \`0\`, sang phải thêm \`1\`; tới lá thì chuỗi bit hiện tại là mã của ký tự đó.

Với **n** ký tự khác nhau, vòng lặp chạy đúng **n − 1** lần (mỗi lần giảm số node trong heap đi 1: lấy ra 2, đẩy vào 1).

> ❓ **Câu hỏi tự nhiên.**
> - *"Vì sao dùng min-heap mà không phải sort một lần?"* — Vì sau mỗi lần ghép, node cha mới (weight = tổng) cần được **chèn lại đúng vị trí** trong tập đang xét. Min-heap cho \`ExtractMin\` và \`Insert\` đều O(log n). Sort một lần không xử lý được các node mới sinh ra.
> - *"Lấy 2 node nhỏ nhất — nếu weight bằng nhau thì lấy cái nào?"* — Tùy chọn (tie-breaking), không ảnh hưởng tới tổng bit tối ưu, chỉ đổi hình dạng cây. Xem mục 11.

> 📝 **Tóm tắt mục 3.** Đếm tần suất → mỗi ký tự là một lá weight = tần suất → lặp ghép 2 node nhẹ nhất (min-heap) thành node cha tới khi còn 1 gốc → DFS gán mã. Greedy "ghép nhẹ nhất trước" đẩy ký tự hiếm xuống sâu.

---

## 4. Walk-through đầy đủ: \`"abracadabra"\`

Ta sẽ chạy tay toàn bộ thuật toán với chuỗi \`"abracadabra"\` (11 ký tự).

### 4.1 Bước 1 — đếm tần suất

\`\`\`
a b r a c a d a b r a
\`\`\`

| Ký tự | Đếm |
|-------|-----|
| \`a\`   | 5   |
| \`b\`   | 2   |
| \`r\`   | 2   |
| \`c\`   | 1   |
| \`d\`   | 1   |

Tổng kiểm tra: \`5+2+2+1+1 = 11\` ✓.

### 4.2 Bước 2 — khởi tạo min-heap

Đẩy 5 node lá vào heap. Đỉnh heap luôn là weight nhỏ nhất. Sắp theo weight (tie-break alphabet để chạy tay nhất quán):

\`\`\`
heap = [ c:1, d:1, b:2, r:2, a:5 ]
\`\`\`

### 4.3 Bước 3 — lặp ghép (n−1 = 4 lần)

**Lần 1.** Lấy 2 nhỏ nhất: \`c:1\` và \`d:1\`. Ghép → node \`N1\` weight \`1+1=2\`.

\`\`\`
        N1:2
       /    \\
     0/      \\1
   [c:1]   [d:1]
heap = [ b:2, r:2, N1:2, a:5 ]
\`\`\`

**Lần 2.** Lấy 2 nhỏ nhất: \`b:2\` và \`r:2\`. Ghép → node \`N2\` weight \`2+2=4\`.

\`\`\`
        N2:4
       /    \\
   [b:2]   [r:2]
heap = [ N1:2, N2:4, a:5 ]
\`\`\`

**Lần 3.** Lấy 2 nhỏ nhất: \`N1:2\` và \`N2:4\`. Ghép → node \`N3\` weight \`2+4=6\`.

\`\`\`
            N3:6
          /      \\
       N1:2      N2:4
      /    \\    /    \\
   [c:1][d:1][b:2][r:2]
heap = [ a:5, N3:6 ]
\`\`\`

**Lần 4.** Lấy 2 nhỏ nhất: \`a:5\` và \`N3:6\`. Ghép → node \`N4\` (gốc) weight \`5+6=11\`.

\`\`\`
                 N4:11  (root)
                /      \\
             0/          \\1
          [a:5]          N3:6
                        /    \\
                     0/        \\1
                   N1:2        N2:4
                  /    \\      /    \\
                0/    1\\    0/      \\1
             [c:1]  [d:1] [b:2]   [r:2]
heap = [ N4:11 ]  ← còn 1 node, dừng.
\`\`\`

### 4.4 Bước 4 — gán mã (DFS, trái=0 phải=1)

| Ký tự | Đường đi | Mã   | Độ dài |
|-------|----------|------|--------|
| \`a\`   | trái     | \`0\`  | 1      |
| \`c\`   | phải-trái-trái  | \`100\` | 3 |
| \`d\`   | phải-trái-phải  | \`101\` | 3 |
| \`b\`   | phải-phải-trái  | \`110\` | 3 |
| \`r\`   | phải-phải-phải  | \`111\` | 3 |

### 4.5 Bước 5 — tính tổng bit

\`\`\`
tổng bit = Σ tần suất × độ dài mã
         = a:5×1 + b:2×3 + r:2×3 + c:1×3 + d:1×3
         = 5 + 6 + 6 + 3 + 3
         = 23 bit
\`\`\`

**So sánh:**
- Fixed-length (5 ký tự → 3 bit): \`11 × 3 = 33\` bit.
- Huffman: \`23\` bit.
- **Tiết kiệm: \`33 − 23 = 10\` bit ≈ 30,3%.**

### 4.6 Encode chuỗi gốc

\`"abracadabra"\` → tra bảng từng ký tự:

\`\`\`
a   b    r    a   c    a   d    a   b    r    a
0   110  111  0   100  0   101  0   110  111  0
\`\`\`

Bit stream: \`0 110 111 0 100 0 101 0 110 111 0\` = \`01101110100010101101110\` — đếm: \`1+3+3+1+3+1+3+1+3+3+1 = 23\` bit ✓.

> 🔁 **Dừng lại tự kiểm tra.** Giải mã \`01101110...\` bằng cây trên — ký tự đầu tiên là gì?
>
> <details><summary>Đáp án</summary>
>
> Bit \`0\` → đi trái → tới lá \`[a]\` ngay. Ký tự đầu = \`a\`. Tiếp \`110\` → phải, phải, trái → \`[b]\`. Khớp với chuỗi gốc \`ab...\`. ✓
> </details>

> 📝 **Tóm tắt mục 4.** Với \`"abracadabra"\`: tần suất \`{a:5,b:2,r:2,c:1,d:1}\`, Huffman cho \`a=0\` còn các chữ khác 3 bit, tổng **23 bit** so với fixed-length **33 bit** (tiết kiệm ~30%).

---

## 5. Vì sao greedy của Huffman cho cây TỐI ƯU

> 💡 **Trực giác.** Hai chiến lược greedy có thể nghe hợp lý nhưng sai. Ở đây ta cần *bằng chứng* rằng "ghép 2 node nhẹ nhất" thật sự dẫn tới tổng bit nhỏ nhất, không chỉ "có vẻ tốt". Xem [Lesson 19 — Greedy Fundamentals](../lesson-19-greedy-fundamentals/) về exchange argument tổng quát.

Gọi **chi phí** của một cây \`T\` là \`B(T) = Σ_{ký tự c} freq(c) × depth_T(c)\` (đúng bằng tổng bit). Ta cần chứng minh cây Huffman cực tiểu \`B(T)\`.

### 5.1 Bổ đề 1 — hai ký tự tần suất thấp nhất nên là anh em ở tầng sâu nhất

**Phát biểu.** Gọi \`x\`, \`y\` là hai ký tự có tần suất **nhỏ nhất**. Tồn tại một cây tối ưu trong đó \`x\`, \`y\` là **hai lá anh em (sibling)** ở **tầng sâu nhất**.

**Chứng minh (exchange argument), từng bước:**

1. Lấy một cây tối ưu bất kỳ \`T\`. Gọi \`a\`, \`b\` là hai lá **anh em ở tầng sâu nhất** của \`T\` (trong cây nhị phân đầy đủ — mỗi node trong có 2 con — tầng sâu nhất luôn tồn tại ít nhất một cặp anh em).
2. Vì \`x\` có tần suất nhỏ nhất nên \`freq(x) ≤ freq(a)\`. Vì \`a\` ở tầng sâu nhất nên \`depth(a) ≥ depth(x)\`.
3. **Đổi chỗ** \`x\` và \`a\` trong cây, được cây \`T'\`. Thay đổi chi phí:
   \`\`\`
   B(T) − B(T') = freq(a)·depth(a) + freq(x)·depth(x)
                − freq(a)·depth(x) − freq(x)·depth(a)
                = (freq(a) − freq(x)) · (depth(a) − depth(x))
                ≥ 0
   \`\`\`
   vì cả hai thừa số đều ≥ 0. Nghĩa là \`B(T') ≤ B(T)\`. Nhưng \`T\` đã tối ưu nên \`B(T') = B(T)\`: \`T'\` cũng tối ưu.
4. Tương tự đổi chỗ \`y\` với người anh em còn lại của \`a\` ở tầng sâu nhất, được \`T''\` tối ưu trong đó \`x\`, \`y\` là anh em ở tầng sâu nhất. ∎

> Không bước nào dùng "dễ thấy". Mấu chốt là đẳng thức \`(freq(a)−freq(x))(depth(a)−depth(x)) ≥ 0\`: chuyển ký tự **nhẹ hơn** xuống **sâu hơn** không bao giờ làm tăng chi phí.

### 5.2 Bổ đề 2 — bài toán có cấu trúc con tối ưu

Sau khi ghép \`x\`, \`y\` thành node \`z\` với \`freq(z) = freq(x) + freq(y)\`, bài toán trên bảng chữ mới (thay \`x\`, \`y\` bằng \`z\`) là **bài toán con cùng dạng**, nhỏ hơn 1 ký tự. Chi phí liên hệ:

\`\`\`
B(T) = B(T_con) + freq(x) + freq(y)
\`\`\`

(vì \`x\`, \`y\` ở sâu hơn \`z\` đúng 1 tầng; phần \`freq(x)+freq(y)\` chính là chi phí thêm của 1 tầng đó). Do \`freq(x)+freq(y)\` là **hằng số** với mọi cây hợp lệ, cực tiểu \`B(T)\` ⟺ cực tiểu \`B(T_con)\`.

### 5.3 Kết luận

Bổ đề 1 nói **ghép 2 node nhẹ nhất là lựa chọn an toàn** (tồn tại nghiệm tối ưu chứa lựa chọn đó). Bổ đề 2 nói **sau khi ghép, bài toán con cùng dạng** và tối ưu bài toán con dẫn tới tối ưu bài toán gốc. Quy nạp theo số ký tự → thuật toán Huffman cho cây tối ưu. ∎

> ⚠ **Lỗi thường gặp.** "Greedy luôn đúng" là **sai** nói chung. Huffman đúng vì có *cả hai* tính chất: greedy-choice (bổ đề 1) **và** optimal substructure (bổ đề 2). Nhiều bài greedy thất bại vì thiếu một trong hai — xem [Lesson 22 — Greedy vs DP](../lesson-22-greedy-vs-dp/).

> 📝 **Tóm tắt mục 5.** Ghép 2 ký tự nhẹ nhất là an toàn (exchange argument: nặng-hơn-không-bao-giờ-nên-ở-sâu-hơn-nhẹ-hơn) và bài toán còn lại cùng dạng. Kết hợp → Huffman tối ưu.

---

## 6. Encode và Decode

### 6.1 Encode — tra bảng mã

Sau khi xây cây, DFS sinh **bảng mã** \`code[ký tự] = chuỗi bit\`. Encode chỉ là nối các mã:

\`\`\`
encode("cab") với bảng {a:0, b:110, c:100, ...}
  c → 100
  a → 0
  b → 110
  → "1000110"  (7 bit)
\`\`\`

### 6.2 Decode — đi theo cây

**Không** tra bảng ngược (sẽ nhập nhằng vì bit không có ranh giới). Thay vào đó **đi theo cây từ gốc**:

\`\`\`
con trỏ ← gốc
với mỗi bit:
   nếu bit == 0: con trỏ ← con trái
   nếu bit == 1: con trỏ ← con phải
   nếu con trỏ là LÁ:
       in ra ký tự của lá
       con trỏ ← gốc   (quay lại đỉnh cho ký tự kế)
\`\`\`

**Walk-through decode \`1000110\`** với cây ở mục 4 (\`a=0, c=100, ...\`):
- \`1\` → phải. \`0\` → trái. \`0\` → trái → tới lá \`[c]\`. In \`c\`. Về gốc.
- \`0\` → trái → lá \`[a]\`. In \`a\`. Về gốc.
- \`1\` → phải. \`1\` → phải. \`0\` → trái → lá \`[b]\`. In \`b\`. Về gốc.
- Kết quả: \`cab\` ✓.

> ❓ **Câu hỏi tự nhiên.** *"Nếu bit stream lẻ, dư vài bit không tới lá thì sao?"* — Đó là dữ liệu hỏng hoặc thiếu padding. Trong thực tế ta lưu kèm **số ký tự gốc** hoặc một **ký tự kết thúc (EOF pseudo-character)** để biết khi nào dừng, tránh đọc nhầm phần padding cuối byte.

> 📝 **Tóm tắt mục 6.** Encode = nối mã từ bảng tra. Decode = đi theo cây từ gốc, gặp lá thì xuất ký tự rồi quay về gốc.

---

## 7. Code Go đầy đủ (inline)

Cài đặt hoàn chỉnh dùng \`container/heap\` chuẩn của Go. Có thể chạy thẳng bằng \`go run\`.

\`\`\`go
package main

import (
	"container/heap"
	"fmt"
	"sort"
)

// node là một nút trong cây Huffman.
// Lá: char != 0, left == right == nil.
// Node trong: char == 0, có left/right.
type node struct {
	char        rune
	weight      int
	left, right *node
}

// ---- Min-heap các *node theo weight (dùng container/heap) ----
type pq []*node

func (p pq) Len() int { return len(p) }
func (p pq) Less(i, j int) bool {
	// So sánh theo weight; tie-break theo char để kết quả ổn định (deterministic).
	if p[i].weight != p[j].weight {
		return p[i].weight < p[j].weight
	}
	return p[i].char < p[j].char
}
func (p pq) Swap(i, j int)       { p[i], p[j] = p[j], p[i] }
func (p *pq) Push(x interface{}) { *p = append(*p, x.(*node)) }
func (p *pq) Pop() interface{} {
	old := *p
	n := len(old)
	it := old[n-1]
	*p = old[:n-1]
	return it
}

// countFreq đếm tần suất từng ký tự.  O(L) với L = độ dài chuỗi.
func countFreq(s string) map[rune]int {
	f := make(map[rune]int)
	for _, c := range s {
		f[c]++
	}
	return f
}

// buildTree xây cây Huffman từ bảng tần suất.  O(n log n) với n = số ký tự khác nhau.
func buildTree(freq map[rune]int) *node {
	pqh := &pq{}
	heap.Init(pqh)
	// Mỗi ký tự là một lá.
	for c, w := range freq {
		heap.Push(pqh, &node{char: c, weight: w})
	}
	// EDGE CASE: chỉ 1 ký tự → tạo node cha giả để ký tự có mã "0" (1 bit), tránh mã rỗng.
	if pqh.Len() == 1 {
		only := heap.Pop(pqh).(*node)
		return &node{weight: only.weight, left: only}
	}
	// Lặp n-1 lần: ghép 2 node nhẹ nhất.
	for pqh.Len() > 1 {
		x := heap.Pop(pqh).(*node) // nhỏ nhất
		y := heap.Pop(pqh).(*node) // nhỏ nhì
		parent := &node{
			weight: x.weight + y.weight,
			left:   x, // trái = 0
			right:  y, // phải = 1
		}
		heap.Push(pqh, parent)
	}
	return heap.Pop(pqh).(*node) // gốc
}

// buildCodes duyệt DFS gán mã: trái thêm '0', phải thêm '1'.
func buildCodes(root *node) map[rune]string {
	codes := make(map[rune]string)
	var dfs func(n *node, prefix string)
	dfs = func(n *node, prefix string) {
		if n == nil {
			return
		}
		if n.left == nil && n.right == nil { // lá
			codes[n.char] = prefix
			return
		}
		dfs(n.left, prefix+"0")
		dfs(n.right, prefix+"1")
	}
	dfs(root, "")
	return codes
}

// encode tra bảng mã, nối thành bit stream.  O(L).
func encode(s string, codes map[rune]string) string {
	out := ""
	for _, c := range s {
		out += codes[c]
	}
	return out
}

// decode đi theo cây từ gốc; gặp lá thì xuất ký tự rồi quay về gốc.  O(số bit).
func decode(bits string, root *node) string {
	out := []rune{}
	cur := root
	for _, b := range bits {
		if b == '0' {
			cur = cur.left
		} else {
			cur = cur.right
		}
		if cur.left == nil && cur.right == nil { // tới lá
			out = append(out, cur.char)
			cur = root
		}
	}
	return string(out)
}

func main() {
	text := "abracadabra"
	freq := countFreq(text)

	root := buildTree(freq)
	codes := buildCodes(root)

	// In bảng mã, sắp theo ký tự cho gọn.
	chars := make([]rune, 0, len(codes))
	for c := range codes {
		chars = append(chars, c)
	}
	sort.Slice(chars, func(i, j int) bool { return chars[i] < chars[j] })

	fmt.Printf("Văn bản: %q (%d ký tự)\\n", text, len(text))
	fmt.Println("Bảng mã Huffman:")
	totalBits := 0
	for _, c := range chars {
		fmt.Printf("  %c (freq %d): %s\\n", c, freq[c], codes[c])
		totalBits += freq[c] * len(codes[c])
	}

	encoded := encode(text, codes)
	decoded := decode(encoded, root)

	fmt.Printf("Encode: %s (%d bit)\\n", encoded, len(encoded))
	fmt.Printf("Decode: %q (khớp gốc: %v)\\n", decoded, decoded == text)

	// Tỉ lệ nén so với fixed-length 8-bit (ASCII).
	fixed := len(text) * 8
	fmt.Printf("Fixed-length 8-bit: %d bit | Huffman: %d bit | tiết kiệm %.1f%%\\n",
		fixed, totalBits, 100*float64(fixed-totalBits)/float64(fixed))
}
\`\`\`

**Kết quả chạy (tương đương walk-through mục 4):**

\`\`\`
Văn bản: "abracadabra" (11 ký tự)
Bảng mã Huffman:
  a (freq 5): 0
  b (freq 2): 111
  c (freq 1): 1100
  d (freq 1): 1101
  r (freq 2): 10
Encode: 01111001100011010111100 (23 bit)
Decode: "abracadabra" (khớp gốc: true)
Fixed-length 8-bit: 88 bit | Huffman: 23 bit | tiết kiệm 73.9%
\`\`\`

> ❓ **Câu hỏi tự nhiên.** *"Vì sao bảng mã chạy thật (\`b=111, r=10, c=1100, d=1101\`) khác với walk-through tay ở mục 4 (\`b=110, r=111, c=100, d=101\`)?"* — Vì tie-break ở mục 4 chạy tay theo **char của lá**, còn code ở đây tie-break theo **char nhỏ nhất trong node** (so sánh node cha cũng có char), nên thứ tự ghép khác → **hình cây khác**. Nhưng để ý: **tổng bit vẫn đúng 23** (a:5×1 + r:2×2 + b:2×3 + c:1×4 + d:1×4 = 5+4+6+4+4 = 23). Cả hai cây đều **tối ưu** — đúng tinh thần mục 11.1: tie-break đổi hình cây, không đổi tổng bit.

---

## 8. Độ phức tạp

Với **n** = số ký tự khác nhau, **L** = độ dài văn bản:

| Bước | Thao tác | Chi phí |
|------|----------|---------|
| Đếm tần suất | duyệt văn bản | \`O(L)\` |
| Khởi tạo heap | \`n\` lần Push | \`O(n)\` (heapify) hoặc \`O(n log n)\` nếu Push từng cái |
| Vòng lặp ghép | \`n−1\` lần × (2 ExtractMin + 1 Insert), mỗi cái \`O(log n)\` | \`O(n log n)\` |
| Gán mã (DFS) | thăm \`2n−1\` node | \`O(n)\` |
| Encode | nối mã \`L\` ký tự | \`O(L)\` (hoặc \`O(tổng bit)\`) |
| Decode | duyệt từng bit | \`O(tổng bit)\` |

**Tổng xây cây + bảng mã: \`O(n log n)\`.** Encode/decode: \`O(L)\` (tuyến tính theo dữ liệu). Bộ nhớ cây: \`O(n)\`.

> 💡 Nếu các tần suất đã **được sắp xếp sẵn**, có thuật toán Huffman dùng **2 hàng đợi** đạt \`O(n)\` (không cần heap). Nhưng nói chung, sort/heapify khiến \`O(n log n)\` là chuẩn.

> 📝 **Tóm tắt mục 8.** Xây cây Huffman: \`O(n log n)\` (n = số ký tự khác nhau, chi phối bởi n−1 thao tác heap). Encode/decode tuyến tính theo độ dài dữ liệu.

---

## 9. Ứng dụng thực tế

Huffman **không phải đồ chơi học thuật** — nó là thành phần lõi trong nhiều định dạng bạn dùng hằng ngày:

- **ZIP / gzip / PNG** dùng thuật toán **DEFLATE = LZ77 + Huffman**. LZ77 thay các đoạn lặp bằng con trỏ \`(khoảng cách, độ dài)\`; phần dữ liệu còn lại được nén tiếp bằng Huffman. Đây là lý do file text nén rất tốt.
- **JPEG** — sau biến đổi DCT và lượng tử hóa, các hệ số được **Huffman-coded** (entropy coding) ở bước cuối.
- **MP3 / AAC** — sau khi mô hình tâm-thính-giác loại bỏ thông tin tai người không nghe được, dữ liệu còn lại được Huffman-code.
- **MP4 / H.264** — dùng biến thể **CAVLC** (Context-Adaptive Variable Length Coding) dựa trên ý tưởng Huffman, hoặc CABAC (arithmetic).

Điểm chung: Huffman là tầng **entropy coding** — vắt nốt phần dư thừa thống kê sau khi các bước khác đã loại bỏ dư thừa cấu trúc.

> 📝 **Tóm tắt mục 9.** Huffman là tầng entropy coding trong DEFLATE (ZIP/gzip/PNG), JPEG, MP3 — không thể thiếu trong nén thực tế.

---

## 10. So sánh với các phương pháp khác

| Phương pháp | Tối ưu? | Ghi chú |
|-------------|---------|---------|
| **Fixed-length** | Không (khi tần suất lệch) | Đơn giản, truy cập ngẫu nhiên dễ |
| **Huffman** | **Tối ưu** trong lớp prefix code **per-symbol** (mã nguyên bit) | Mỗi ký tự ≥ 1 bit |
| **Arithmetic coding** | Tối ưu hơn Huffman một chút | Có thể gán **phân số bit** cho ký tự → gần entropy lý thuyết hơn; tốn CPU hơn, có vướng patent (đã hết hạn) |
| **Adaptive Huffman** | — | Cập nhật cây **trong khi** đọc dữ liệu, không cần gửi bảng tần suất trước; tốt cho streaming |

> ❓ **Câu hỏi tự nhiên.** *"Nếu Huffman tối ưu, sao arithmetic lại tốt hơn?"* — Huffman tối ưu **với ràng buộc mỗi ký tự nhận một số nguyên bit (≥ 1)**. Khi một ký tự có xác suất rất cao (ví dụ 0,9), entropy lý thuyết của nó chỉ \`−log₂ 0,9 ≈ 0,15\` bit, nhưng Huffman buộc tối thiểu **1 bit**. Arithmetic coding "chia nhỏ" được nên bám sát entropy hơn. Khác biệt thường nhỏ trên dữ liệu thực.

> 📝 **Tóm tắt mục 10.** Huffman tối ưu trong giới hạn "mã nguyên bit per-symbol". Arithmetic coding bám entropy sát hơn (gán phân số bit). Adaptive Huffman bỏ overhead gửi bảng tần suất.

---

## 11. Cạm bẫy và edge case

### 11.1 Tie-breaking khi weight bằng nhau

Khi hai node có **cùng weight**, chọn cái nào để ghép trước là tùy ý. Lựa chọn khác nhau cho **hình dạng cây khác nhau** và **mã khác nhau**, NHƯNG **tổng bit luôn bằng nhau (đều tối ưu)**.

**Ví dụ.** Tần suất \`{a:1, b:1, c:2}\`:
- Cách 1: ghép \`a+b → 2\`, rồi ghép \`(ab):2 + c:2 → 4\`. Mã: \`a=00, b=01, c=1\`. Tổng = \`1·2+1·2+2·1 = 6\`.
- Cách 2 (tie-break khác): ghép \`a+c\` hoặc \`b+c\` đầu... vẫn cho tổng bit tối ưu **6** (vì 2 ký tự nhẹ nhất \`a,b\` vẫn xuống sâu nhất theo bổ đề 1; ghép \`c\` với một node weight-2 nào đó không đổi tổng).

→ **Bài học:** đừng hốt hoảng nếu cây của bạn khác sách giáo khoa — kiểm tra **tổng bit**, không phải hình cây.

### 11.2 Cần lưu cây/bảng để decode (overhead)

Bên nhận **không thể giải mã** nếu không có cây Huffman (hoặc bảng tần suất để dựng lại cây). Vì thế file nén phải **kèm theo header** mô tả cây/tần suất.

**Ví dụ overhead.** Nén một chuỗi 20 ký tự: thân nén có thể chỉ còn ~50 bit, nhưng header (5 ký tự × tần suất) có thể tốn thêm ~40–80 bit. **Với data quá nhỏ, file nén có thể LỚN HƠN bản gốc** — Huffman chỉ thắng khi dữ liệu đủ lớn để chi phí header được "khấu hao".

### 11.3 Bảng chữ chỉ 1 ký tự

Chuỗi \`"aaaa"\` chỉ có 1 ký tự khác nhau. Cây Huffman "thuần" sẽ cho \`a\` mã **rỗng** (0 bit) → không decode được. **Cách xử lý** (đã làm trong code mục 7): tạo một node gốc giả với 1 con, gán \`a = "0"\` (1 bit). Khi đó \`"aaaa"\` = \`"0000"\` (4 bit) và vẫn biết đọc bao nhiêu lần qua độ dài lưu kèm.

### 11.4 Bảng chữ rỗng

Chuỗi rỗng \`""\` → không có ký tự → không có cây. Code cần kiểm tra trước (trả về sớm).

> 🔁 **Dừng lại tự kiểm tra.** Nén chuỗi \`"ab"\` (mỗi chữ 1 lần). Thân nén tốn mấy bit? Lưu kèm gì để decode?
>
> <details><summary>Đáp án</summary>
>
> \`a\` và \`b\` cùng weight 1 → ghép thành gốc → \`a=0, b=1\`. Thân = \`01\` (2 bit). Nhưng phải lưu kèm bảng (\`a↔0, b↔1\`) tốn nhiều bit hơn cả thân → với data tí hon này nén **lỗ vốn**.
> </details>

> 📝 **Tóm tắt mục 11.** Tie-break đổi hình cây nhưng không đổi tổng bit tối ưu. Phải lưu cây để decode → overhead, data nhỏ có thể nén lỗ. Edge case 1 ký tự cần gán mã \`"0"\` thủ công.

---

## Bài tập

> Làm thử trước khi xem lời giải. Mọi bài đều có lời giải chi tiết ở mục sau.

1. **Build tree + tổng bit.** Cho tần suất \`{a:8, b:3, c:1, d:1, e:1, f:1}\`. Xây cây Huffman, gán mã, tính tổng bit. So với fixed-length cần mấy bit/ký tự?
2. **Encode/Decode.** Với bảng \`{a:0, b:10, c:110, d:111}\`: (a) encode \`"abacabad"\`; (b) decode \`1101001100\`.
3. **Tỉ lệ nén.** Một file 100.000 ký tự, bảng chữ 6 ký tự với tần suất (theo %) \`a:45, b:13, c:12, d:16, e:9, f:5\`. Tính tổng bit Huffman so với fixed-length 3-bit và tính % tiết kiệm.
4. **Vì sao prefix code.** Giải thích vì sao bộ mã \`{a:0, b:01, c:11}\` KHÔNG giải mã được không nhập nhằng. Cho một chuỗi bit chứng minh.
5. **Huffman vs fixed-length — khi nào bằng nhau?** Với điều kiện nào của tần suất thì Huffman KHÔNG tiết kiệm được gì so với fixed-length? Cho ví dụ.
6. **Tie-breaking.** Cho \`{x:2, y:2, z:2, w:2}\` (4 ký tự cùng tần suất). Có thể xây mấy cây "hình dạng" khác nhau? Tổng bit có đổi không? Tính tổng bit.
7. **(Nâng cao) Edge case.** Viết bằng lời các bước decode \`"0001"\` khi chỉ có 1 ký tự \`a\` được gán mã \`"0"\`. Có vấn đề gì?

---

## Lời giải chi tiết

### Bài 1 — Build tree + tổng bit

Tần suất \`{a:8, b:3, c:1, d:1, e:1, f:1}\`, tổng = 15 ký tự. Min-heap ban đầu (tie-break alphabet): \`[c:1, d:1, e:1, f:1, b:3, a:8]\`.

- **Lần 1:** ghép \`c:1 + d:1 → N1:2\`. Heap \`[e:1, f:1, N1:2, b:3, a:8]\`.
- **Lần 2:** ghép \`e:1 + f:1 → N2:2\`. Heap \`[N1:2, N2:2, b:3, a:8]\`.
- **Lần 3:** ghép \`N1:2 + N2:2 → N3:4\`. Heap \`[b:3, N3:4, a:8]\`.
- **Lần 4:** ghép \`b:3 + N3:4 → N4:7\`. Heap \`[N4:7, a:8]\`.
- **Lần 5:** ghép \`N4:7 + a:8 → N5:15\` (gốc). Dừng.

Cây và mã (a là con trái của gốc → mã ngắn nhất):

\`\`\`
            N5:15
           /     \\
        0/         \\1
      [a:8]        N4:7
                  /    \\
               0/        \\1
             [b:3]       N3:4
                        /    \\
                     0/        \\1
                   N1:2        N2:4? -> N2:2
                  /   \\       /    \\
               [c]   [d]   [e]    [f]
\`\`\`

| Ký tự | Mã    | Độ dài | freq | freq×len |
|-------|-------|--------|------|----------|
| \`a\`   | \`0\`   | 1      | 8    | 8        |
| \`b\`   | \`10\`  | 2      | 3    | 6        |
| \`c\`   | \`1100\`| 4      | 1    | 4        |
| \`d\`   | \`1101\`| 4      | 1    | 4        |
| \`e\`   | \`1110\`| 4      | 1    | 4        |
| \`f\`   | \`1111\`| 4      | 1    | 4        |

**Tổng Huffman = 8+6+4+4+4+4 = 30 bit.**

Fixed-length: 6 ký tự → \`⌈log₂6⌉ = 3\` bit/ký tự → \`15 × 3 = 45\` bit. **Tiết kiệm 15 bit ≈ 33,3%.**

### Bài 2 — Encode/Decode

Bảng \`{a:0, b:10, c:110, d:111}\` (prefix code ✓).

**(a) encode \`"abacabad"\`:**
\`\`\`
a  b   a  c    a  b   a  d
0  10  0  110  0  10  0  111
\`\`\`
Nối: \`0 10 0 110 0 10 0 111\` = \`0100110010 0111\` → \`010011001 00111\`. Đếm bit: \`1+2+1+3+1+2+1+3 = 14\` bit. Chuỗi: \`01001100100111\`.

**(b) decode \`1101001100\`:** đi từ trái, mỗi khi khớp một mã thì cắt.
- \`1\`→chưa, \`11\`→chưa, \`110\`→khớp \`c\`. Còn \`1001100\`.
- \`1\`,\`10\`→khớp \`b\`. Còn \`01100\`.
- \`0\`→khớp \`a\`. Còn \`1100\`.
- \`1\`,\`11\`→chưa,\`110\`→khớp \`c\`. Còn \`0\`.
- \`0\`→khớp \`a\`.
- Kết quả: **\`cbaca\`**.

### Bài 3 — Tỉ lệ nén

100.000 ký tự, tần suất %: \`a:45, b:13, c:12, d:16, e:9, f:5\`. Đây là ví dụ kinh điển (CLRS). Đếm tuyệt đối: a:45k, b:13k, c:12k, d:16k, e:9k, f:5k.

Xây Huffman (tie-break theo weight): các mã tối ưu nổi tiếng:

| Ký tự | freq (k) | Mã    | len | freq×len (k) |
|-------|----------|-------|-----|--------------|
| \`a\`   | 45       | \`0\`   | 1   | 45           |
| \`b\`   | 13       | \`101\` | 3   | 39           |
| \`c\`   | 12       | \`100\` | 3   | 36           |
| \`d\`   | 16       | \`111\` | 3   | 48           |
| \`e\`   | 9        | \`1101\`| 4   | 36           |
| \`f\`   | 5        | \`1100\`| 4   | 20           |

**Tổng Huffman = (45+39+36+48+36+20) × 1000 = 224 × 1000 = 224.000 bit.**

Fixed-length 3-bit: \`100.000 × 3 = 300.000 bit\`.

**Tiết kiệm = (300.000 − 224.000)/300.000 = 76.000/300.000 ≈ 25,3%.** Trung bình \`224.000/100.000 = 2,24\` bit/ký tự (so với 3).

### Bài 4 — Vì sao prefix code

Bộ \`{a:0, b:01, c:11}\`: mã của \`a\` là \`0\`, là **tiền tố** của mã \`b = 01\`. → vi phạm prefix.

**Chuỗi bit nhập nhằng \`011\`:**
- Cách đọc 1: \`0\`(=a) \`11\`(=c) → \`ac\`.
- Cách đọc 2: \`01\`(=b) \`1\`(=?)... \`1\` đơn không khớp gì, nhưng nếu chuỗi là \`0111\`: \`01\`(b) \`11\`(c) → \`bc\`; hoặc \`0\`(a) \`11\`(c) \`1\`(dư). Có **nhiều cách đọc** → không xác định được thông điệp gốc. Đó là lý do mã phải prefix-free.

### Bài 5 — Khi nào Huffman = fixed-length

Huffman cho cùng tổng bit như fixed-length khi **tất cả tần suất bằng nhau VÀ số ký tự là lũy thừa của 2** (cây Huffman trở thành cây cân bằng hoàn chỉnh, mọi mã cùng độ dài).

**Ví dụ:** 4 ký tự \`{a:1,b:1,c:1,d:1}\` → cây cân bằng, mọi mã 2 bit → giống fixed-length 2-bit, tổng \`4×2=8\` bit. Huffman không tiết kiệm.

Nói chung khi **phân phối càng đều** thì Huffman càng ít lợi; khi **phân phối càng lệch** thì càng tiết kiệm.

### Bài 6 — Tie-breaking \`{x:2,y:2,z:2,w:2}\`

4 ký tự cùng weight 2. Mọi lần ghép luôn lấy 2 node weight nhỏ nhất hiện có:

- Ghép 2 cái weight-2 → node weight-4. Ghép 2 cái weight-2 còn lại → node weight-4. Ghép 2 node weight-4 → gốc weight-8.
- Cây kết quả là **cây cân bằng hoàn chỉnh** bất kể chọn cặp nào trước → mọi ký tự có mã **2 bit**.

**Số hình dạng cây "khác nhau":** việc chọn cặp nào ghép trước (và trái/phải) cho nhiều cây *trông khác* nhau, nhưng tất cả đều là cây 2 tầng đầy đủ → **độ dài mã luôn = 2 cho cả 4 ký tự**.

**Tổng bit = (2+2+2+2) × 2 = 16 bit** — **không đổi** dù chọn tie-break nào. Minh chứng cho mục 11.1.

### Bài 7 — Edge case 1 ký tự

Chỉ có \`a\`, gán \`a = "0"\` (qua node gốc giả, mục 7). Decode \`"0001"\`:
- \`0\` → trái → lá \`[a]\`. In \`a\`. Về gốc.
- \`0\` → \`a\`. \`0\` → \`a\`.
- \`1\` → phải → nhưng gốc giả **không có con phải** (nil)! → lỗi.

**Vấn đề:** bit \`1\` không hợp lệ với cây 1-ký-tự. Trong thực tế bit stream cho \`"aaa"\` phải là đúng \`"000"\` (3 bit). Bit \`1\` dư là **dữ liệu hỏng** hoặc padding sai. Cách phòng: lưu kèm **số ký tự gốc (3)** và chỉ decode đúng 3 ký tự, bỏ qua phần dư.

---

## Big-O tổng hợp

| Thao tác | Thời gian | Bộ nhớ |
|----------|-----------|--------|
| Đếm tần suất | \`O(L)\` | \`O(n)\` |
| Xây cây Huffman | \`O(n log n)\` | \`O(n)\` |
| Gán mã (DFS) | \`O(n)\` | \`O(n)\` |
| Encode | \`O(L)\` | \`O(tổng bit)\` |
| Decode | \`O(tổng bit)\` | \`O(L)\` |

\`n\` = số ký tự khác nhau, \`L\` = độ dài văn bản. Toàn bộ pipeline nén: **\`O(n log n + L)\`**.

---

## Bài tiếp theo

- **[Lesson 22 — Greedy vs DP](../lesson-22-greedy-vs-dp/)** — khi greedy thất bại (coin change phản ví dụ) thì phải dùng quy hoạch động. Cách phân biệt hai kỹ thuật.
- Quay lại nền tảng heap: [DataStructures — Heap & Priority Queue](../../DataStructures/02-Intermediate/lesson-03-heap-priority-queue/).
- Ôn lý do greedy đúng: [Lesson 19 — Greedy Fundamentals](../lesson-19-greedy-fundamentals/).

**Minh họa tương tác:** [visualization.html](./visualization.html) — animate xây cây, gán mã, và encode/decode với tỉ lệ nén.
`;
