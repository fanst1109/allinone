// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Databases/03-Advanced/lesson-01-storage-engine/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Storage Engine (cỗ máy lưu trữ)

> Nhóm 3 — Nâng cao · Bài đầu tiên của tier, lĩnh vực [Databases](../../README.md)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **phân cấp lưu trữ (storage hierarchy)**: vì sao RAM nhanh nhưng nhỏ và mất khi tắt máy, còn đĩa chậm nhưng lớn và bền.
- Trả lời được câu hỏi cốt lõi: *vì sao DBMS đọc đĩa theo từng **page/block** chứ không từng byte một?*
- Nắm cách dữ liệu được xếp trong page (**heap file**, **slotted page**, **tuple id**).
- Hiểu **buffer pool (page cache)** và chính sách thay thế **LRU** — vì sao nó quyết định hiệu năng.
- Hiểu **write-ahead log (WAL)** đảm bảo bền vững (durability) và phục hồi sau crash bằng redo/undo.
- So sánh được hai triết lý lưu trữ **B-tree** (update tại chỗ) và **LSM-tree** (ghi tuần tự + compaction): mỗi cái hợp tải nào.

## Kiến thức tiền đề

- [Nhóm 2 — Index](../../02-Intermediate/lesson-02-index/): bạn cần biết index là gì và vì sao B-tree cho tra cứu ~O(log n).
- Hữu ích: [Transaction & ACID](../../02-Intermediate/lesson-03-transaction-acid/) (WAL là nền của durability) và [Cây cân bằng](../../../DataStructures/02-Intermediate/lesson-04-balanced-trees/) (B-tree).

---

## 1. Đặt vấn đề: dữ liệu thật nằm ở đâu?

Ở [Lesson 02 — Index](../../02-Intermediate/lesson-02-index/) ta nói "B-tree cho tra cứu ~O(log n)". Nhưng O(log n) **bước** ấy thực ra là **bao nhiêu lần chạm đĩa**? Và một câu rất đời thường:

> Bảng \`orders\` có **10 triệu dòng** trên đĩa. Máy chỉ có 8 GB RAM, không đủ chứa cả bảng. Khi truy vấn, DBMS đọc dữ liệu lên RAM thế nào để không phải đọc lại đĩa mỗi lần? Và nếu **mất điện giữa lúc đang ghi**, vì sao dữ liệu không hỏng?

Tầng trả lời những câu này là **storage engine** — phần "cỗ máy lưu trữ" nằm dưới đáy DBMS, lo việc xếp byte lên đĩa, đệm vào RAM, và ghi log để sống sót qua sự cố. Ta sẽ đóng từng câu hỏi ngay trong bài.

💡 **Trực giác.** Storage engine giống **kho hàng + quầy làm việc**. Đĩa là *kho* (rộng, rẻ, nhưng đi lấy đồ tốn thời gian). RAM là *mặt bàn làm việc* (nhỏ, nhưng với tới tức thì). Bạn không chạy vào kho lấy từng cái đinh một — bạn bê **cả một khay** ra bàn (đọc theo page). WAL giống **cuốn sổ ghi việc**: trước khi xếp lại hàng, bạn ghi "sẽ chuyển kệ A sang kệ B" vào sổ, để lỡ mất điện vẫn biết mình định làm gì.

---

## 2. Phân cấp lưu trữ — vì sao đọc theo page

### 2.1 RAM vs đĩa (định nghĩa đủ 3 phần)

**(a) Là gì.**
- **RAM (bộ nhớ trong, volatile memory)**: bộ nhớ truy cập ngẫu nhiên, **nhanh** (~100 ns/lần truy cập), **nhỏ** (GB), **mất sạch khi tắt nguồn** (volatile — bay hơi).
- **Đĩa (đĩa lưu trữ bền, persistent storage)**: SSD hoặc HDD, **chậm hơn** (SSD ~100 µs, HDD ~10 ms/lần seek), **lớn** (TB), **giữ nguyên dữ liệu khi tắt máy** (non-volatile).

**(b) Vì sao tồn tại cả hai.** Nếu chỉ có RAM: tắt máy là mất hết dữ liệu → không thể làm cơ sở dữ liệu. Nếu chỉ có đĩa: mỗi phép tính phải chạm đĩa → chậm hàng nghìn lần. DBMS dùng đĩa để **lưu bền**, dùng RAM để **làm việc nhanh**, và liên tục chuyển dữ liệu giữa hai tầng.

**(c) Ví dụ trực giác bằng số.** RAM nhanh hơn HDD khoảng **100.000 lần** (100 ns vs 10 ms). Quy đổi cho dễ hình dung: nếu đọc 1 byte từ RAM mất *1 giây* thì đọc cùng byte đó từ HDD mất khoảng **27 giờ**. Đó là lý do "đọc đĩa" là thứ phải tiết kiệm tối đa.

So sánh nhanh:

| | RAM | SSD | HDD |
| --- | --- | --- | --- |
| Tốc độ truy cập | ~100 ns | ~100 µs | ~10 ms |
| Dung lượng điển hình | GB | TB | TB |
| Bền khi tắt máy? | Không | Có | Có |
| Giá / GB | Cao | Trung bình | Thấp |

### 2.2 Page/Block — đơn vị đọc-ghi

💡 **Trực giác.** Chi phí lớn nhất khi chạm đĩa không phải "đọc bao nhiêu byte" mà là **đi tới chỗ cần đọc** (seek + chờ đĩa quay, hoặc latency của SSD). Đã tốn công đi tới đó rồi thì lấy 1 byte hay lấy 8.000 byte gần như **bằng giá**. Nên DBMS luôn đọc-ghi nguyên một **page** (còn gọi **block**) — khối cố định, thường **4 KB hoặc 8 KB** (PostgreSQL mặc định 8 KB).

**Vì sao không đọc từng byte.** Giả sử mỗi lần seek HDD tốn ~10 ms, không phụ thuộc đọc nhiều ít. Đọc 1 byte: 10 ms. Đọc 8 KB (một page): vẫn ~10 ms. Nhưng nếu cần 8 KB mà đọc từng byte một thì phải seek 8.192 lần ≈ **82 giây**. Đọc theo page biến 82 giây thành 10 ms.

**Một page chứa được bao nhiêu row?** Lấy page 8 KB = 8.192 byte. Trừ ~24 byte header còn ~8.168 byte. Nếu mỗi row trung bình **80 byte** (vài cột int + text ngắn) thì một page chứa:

\`\`\`
8.168 / 80 ≈ 102 row mỗi page
\`\`\`

⚠ **Lỗi thường gặp.** "Tôi chỉ cần 1 dòng nên DBMS chỉ đọc đúng 1 dòng." Sai — nó đọc **cả page chứa dòng đó** (≈102 dòng) lên RAM. Đây không phải lãng phí: page đó được giữ lại trong buffer pool (mục 4), nên các dòng lân cận thường được dùng tiếp mà không tốn lần đọc đĩa nào nữa (locality).

**Bốn ví dụ số (page 8 KB, header 24 byte → 8.168 byte hữu dụng):**

| Kích thước row | Số row / page | Đọc 10 triệu row cần | 
| --- | --- | --- |
| 40 byte | ⌊8168/40⌋ = 204 | 10.000.000 / 204 ≈ 49.020 page |
| 80 byte | ⌊8168/80⌋ = 102 | ≈ 98.040 page |
| 200 byte | ⌊8168/200⌋ = 40 | 250.000 page |
| 2.000 byte | ⌊8168/2000⌋ = 4 | 2.500.000 page |

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Row to hơn cả page thì sao?"* — DBMS tách phần lớn (text/blob dài) ra lưu riêng ("TOAST" trong PostgreSQL), row chính chỉ giữ con trỏ. Một row không bao giờ "tràn" làm vỡ cấu trúc page.
- *"Page lớn hơn (16 KB, 32 KB) có tốt hơn không?"* — Page lớn giảm số lần seek khi quét tuần tự, nhưng phí RAM hơn khi chỉ cần ít dòng, và tăng tranh chấp khi nhiều giao dịch sửa cùng page. Đó là sự đánh đổi, không có "luôn tốt hơn".

🔁 **Dừng lại tự kiểm tra.**
1. Vì sao đọc theo page rẻ hơn đọc từng byte rất nhiều?
2. Page 8 KB (8.168 byte hữu dụng), row 100 byte → bao nhiêu row/page? Cần đọc 1 triệu row hết bao nhiêu page?

<details><summary>Đáp án</summary>

1. Chi phí chính là seek (đi tới vị trí), gần như cố định cho mỗi lần chạm đĩa. Đọc 8 KB cũng chỉ 1 seek; đọc 8 KB theo từng byte là 8.192 seek → chậm hàng nghìn lần.
2. ⌊8168/100⌋ = 81 row/page. 1.000.000 / 81 ≈ **12.346 page**.
</details>

📝 **Tóm tắt mục 2.** Đĩa chậm hơn RAM ~100.000 lần và chi phí chính là seek. Vì thế DBMS đọc-ghi theo **page** cố định (4–8 KB) chứ không từng byte. Một page 8 KB chứa ~100 row 80 byte; biết số row/page là biết phải đọc bao nhiêu page.

---

## 3. Heap file & cách xếp row trong page

### 3.1 Heap file

💡 **Trực giác.** **Heap file (tệp đống)** là cách lưu đơn giản nhất: một file gồm dãy page liên tiếp, row mới cứ "ném" vào page nào còn chỗ — không sắp xếp theo thứ tự nào cả, như **ném đồ vào thùng** chứ không xếp ngăn nắp. Muốn tìm nhanh thì dựng index trỏ vào heap (đó là việc của [Lesson 02 — Index](../../02-Intermediate/lesson-02-index/)).

### 3.2 Slotted page — xếp row bên trong một page

Bên trong mỗi page, DBMS dùng bố cục **slotted page (trang có khe)**. Vấn đề cần giải: row có **độ dài thay đổi** (tên người dài ngắn khác nhau), và khi xóa row thì để lại "lỗ hổng". Slotted page giải quyết bằng cách tách **danh bạ khe** khỏi **vùng dữ liệu**:

\`\`\`
+--------------------------------------------------+
| Header | slot0 | slot1 | slot2 | →  ... free ...  |
|        |  ↓con trỏ trỏ xuống dưới                  |
|         ...... khoảng trống ......                |
|                          [ row2 ][ row1 ][ row0 ] |  ← dữ liệu mọc từ cuối lên
+--------------------------------------------------+
\`\`\`

- **Slot array** mọc từ đầu page xuống; mỗi slot là một con trỏ \`(offset, length)\` tới một row.
- **Dữ liệu row** mọc từ cuối page lên trên.
- Khoảng trống nằm ở giữa — cả hai phía cùng ăn vào nó.

**Vì sao tách như vậy?** Để **tuple id ổn định**. Một dòng được định danh bằng **tuple id (rid)** = \`(số_page, số_slot)\`, ví dụ \`(5, 2)\` = page 5, slot 2. Index lưu rid này. Khi row dài ra phải dời chỗ trong page, ta chỉ sửa offset trong slot — **rid không đổi**, nên index không phải cập nhật. Khi xóa row, slot được đánh dấu trống và có thể tái dùng.

**Walk-through số thật.** Page 8 KB, header + slot array đang dùng 100 byte. Thêm 3 row dài 120, 80, 200 byte:

| Bước | Việc | Free space còn lại |
| --- | --- | --- |
| Đầu | — | 8192 − 100 = 8092 |
| Thêm row0 (120 B) | slot0 → offset 8072, len 120 | 8092 − 120 − 4 (1 slot) = 7968 |
| Thêm row1 (80 B) | slot1 → offset 7992, len 80 | 7968 − 80 − 4 = 7884 |
| Thêm row2 (200 B) | slot2 → offset 7792, len 200 | 7884 − 200 − 4 = 7680 |

Xóa row1 → slot1 đánh dấu trống, 80 byte thành "lỗ". Lần thêm sau có thể tái dùng slot1, hoặc page được **dồn (compaction)** để gộp các lỗ lại.

⚠ **Lỗi thường gặp.** Nghĩ "rid là số thứ tự dòng trong bảng (dòng thứ 7)". Không — rid là **vị trí vật lý** \`(page, slot)\`. Cùng một dòng logic có thể đổi page (khi update làm row to ra không vừa page cũ), lúc đó rid thay đổi và index được cập nhật.

🔁 **Dừng lại tự kiểm tra.**
1. Vì sao slotted page tách slot array khỏi vùng dữ liệu thay vì lưu row liền nhau?
2. Tuple id \`(12, 3)\` nghĩa là gì?

<details><summary>Đáp án</summary>

1. Để rid \`(page, slot)\` ổn định khi row dời chỗ trong page, và để xử lý row độ dài thay đổi + xóa/tái dùng khe mà không phải dồn dữ liệu mỗi lần.
2. Dòng nằm ở **page số 12, slot số 3** — một định danh vật lý mà index dùng để nhảy thẳng tới row.
</details>

📝 **Tóm tắt mục 3.** Heap file là dãy page chứa row không sắp xếp. Trong mỗi page, slotted page tách slot array (con trỏ) khỏi dữ liệu để hỗ trợ row độ dài thay đổi và giữ **tuple id \`(page, slot)\`** ổn định cho index tham chiếu.

---

## 4. Buffer pool (page cache) & LRU

### 4.1 Buffer pool là gì

💡 **Trực giác.** Đĩa chậm, RAM nhanh nhưng nhỏ. **Buffer pool (vùng đệm trang)** là một vùng RAM giữ **bản sao các page nóng** vừa đọc từ đĩa. Lần sau cần lại page đó → lấy từ RAM (**hit**, ~100 ns) thay vì đọc đĩa (**miss**, ~100 µs–10 ms). Giống bạn giữ vài cuốn sách hay tra trên bàn thay vì cất lại kệ mỗi lần.

**(a) Là gì.** Một mảng các **frame** (ô) trong RAM, mỗi frame chứa đúng một page. Khi cần page P: nếu P đã trong pool → **hit**; nếu chưa → **miss**, đọc P từ đĩa vào một frame trống. Nếu pool đầy → phải **đuổi (evict)** một page cũ ra để lấy chỗ.

**(b) Vì sao cần.** Phần lớn truy vấn chạm đi chạm lại một số ít page (index gốc, bảng nhỏ hay JOIN). Buffer pool biến phần lớn lần truy cập thành hit → toàn hệ thống nhanh hơn hàng trăm lần. **Hit ratio** (tỉ lệ hit) là chỉ số sức khỏe quan trọng nhất của storage engine.

**(c) Ví dụ số.** Pool có hit ratio 95%, miss đọc đĩa SSD 100 µs, hit 100 ns. Truy cập trung bình = 0,95·0,1 µs + 0,05·100 µs = 0,095 + 5 = **5,1 µs**. Nếu không có pool (mọi lần đều miss) = 100 µs → buffer pool nhanh hơn ~**20 lần** chỉ với 95% hit.

### 4.2 Chính sách thay thế LRU

Khi pool đầy mà cần nạp page mới, đuổi page nào? Chính sách phổ biến: **LRU (Least Recently Used — ít được dùng gần đây nhất)**. Trực giác: page lâu không đụng tới thì khả năng cần lại thấp → đuổi nó trước.

**Walk-through hit/miss với buffer 3 slot.** Chuỗi truy cập page: **A B C A D B E**. Pool tối đa 3 frame, dùng LRU (cuối danh sách = mới dùng nhất, đầu = sẽ bị đuổi):

| Bước | Page | Trong pool? | Hành động | Pool sau (cũ→mới) | Hit/Miss |
| --- | --- | --- | --- | --- | --- |
| 1 | A | không | nạp A | A | Miss |
| 2 | B | không | nạp B | A B | Miss |
| 3 | C | không | nạp C | A B C | Miss |
| 4 | A | **có** | dùng lại, A thành mới nhất | B C A | **Hit** |
| 5 | D | không | đầy → đuổi B (ít dùng nhất) | C A D | Miss |
| 6 | B | không | đầy → đuổi C | A D B | Miss |
| 7 | E | không | đầy → đuổi A | D B E | Miss |

Kết quả: 6 miss, **1 hit** → hit ratio = 1/7 ≈ **14%**. (Chuỗi này cố tình "bất lợi" để minh họa; tải thật có locality nên hit ratio thường 90%+.)

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Vì sao bước 5 đuổi B chứ không phải C?"* — Sau bước 4, thứ tự dùng gần đây là B(2) < C(3) < A(4). B là **ít được dùng gần đây nhất** → bị đuổi trước.
- *"Nếu page bị đuổi đã bị sửa (dirty) thì sao?"* — Phải **ghi page đó xuống đĩa trước** khi đuổi, nếu không mất thay đổi. Page chưa sửa (clean) thì đuổi thẳng, vì bản trên đĩa vẫn đúng.
- *"LRU có bao giờ tệ không?"* — Có. Một lần **quét toàn bảng** (sequential scan) lớn sẽ tống hết page nóng ra khỏi pool dù chỉ dùng một lần. Vì thế PostgreSQL dùng biến thể (clock-sweep) chống "ô nhiễm cache".

🔁 **Dừng lại tự kiểm tra.**
1. Hit và miss khác nhau ở chi phí thế nào?
2. Chuỗi **A B C D A** với pool 3 slot LRU: bao nhiêu hit?

<details><summary>Đáp án</summary>

1. Hit lấy page từ RAM (~100 ns); miss phải đọc đĩa (~100 µs–10 ms), chậm hơn ~1.000–100.000 lần.
2. A(miss) B(miss) C(miss) → pool [A B C]. D miss → đuổi A → [B C D]. A miss (đã bị đuổi) → đuổi B. Tổng **0 hit**.
</details>

📝 **Tóm tắt mục 4.** Buffer pool giữ page nóng trong RAM để biến hầu hết truy cập thành hit. Khi đầy, LRU đuổi page ít dùng gần đây nhất; page dirty phải ghi xuống đĩa trước khi đuổi. Hit ratio cao = hệ thống nhanh.

---

## 5. Write-Ahead Log (WAL) — bền vững & phục hồi

### 5.1 Vấn đề: ghi vào page giữa chừng thì crash

Buffer pool ghi thay đổi vào page **trong RAM** trước, rồi mới flush xuống đĩa sau (để gom nhiều thay đổi, ghi một lần). Nhưng nếu **mất điện** ngay sau khi giao dịch báo "thành công" mà page chưa kịp flush xuống đĩa → thay đổi biến mất → vi phạm **durability** (đã commit thì phải còn). Ngược lại, nếu page bị flush *một nửa* khi crash → dữ liệu hỏng.

### 5.2 Quy tắc Write-Ahead

💡 **Trực giác.** **WAL (write-ahead log — nhật ký ghi trước)** là cuốn sổ ghi **ý định thay đổi** ra đĩa **TRƯỚC** khi sửa data page. Như thợ kho ghi "sẽ chuyển kệ A → B" vào sổ trước khi bê hàng: lỡ mất điện giữa chừng, đọc lại sổ là biết phải làm tiếp gì hoặc hoàn tác gì.

**Quy tắc vàng:** *log record của một thay đổi phải nằm chắc trên đĩa trước khi data page tương ứng được ghi xuống đĩa, và trước khi báo commit cho client.* Log là ghi **tuần tự** (append cuối file) → cực nhanh, không tốn seek; còn data page ghi **ngẫu nhiên** → để dồn lại làm sau.

Mỗi log record gồm: \`LSN\` (số thứ tự log), \`transaction id\`, \`loại\` (UPDATE/COMMIT/ABORT), và **before-image** (giá trị cũ — cho **undo**) + **after-image** (giá trị mới — cho **redo**).

### 5.3 Phục hồi sau crash: redo & undo

Khi khởi động lại, storage engine đọc WAL và sửa lại trạng thái:

- **Redo (làm lại):** với mọi thay đổi đã có log nhưng có thể chưa flush vào data page → áp lại after-image, đảm bảo giao dịch **đã commit** thực sự hiện diện.
- **Undo (hoàn tác):** với giao dịch **chưa commit** lúc crash → dùng before-image gỡ bỏ thay đổi nửa vời, đưa về như chưa từng chạy (giữ atomicity).

**Walk-through crash giữa chừng.** Tài khoản A=100, B=50. Giao dịch T1: chuyển 30 từ A sang B (A−30, B+30). Trình tự:

| Thời điểm | Sự kiện | WAL trên đĩa | Data page trên đĩa |
| --- | --- | --- | --- |
| t1 | T1 sửa A: 100→70 | \`LSN1: T1 UPDATE A old=100 new=70\` | A=100 (chưa flush) |
| t2 | T1 sửa B: 50→80 | \`+ LSN2: T1 UPDATE B old=50 new=80\` | A=100, B=50 |
| t3 | T1 commit | \`+ LSN3: T1 COMMIT\` (flush log) | A=100, B=50 |
| **t4** | **CRASH!** mất điện | log đã có tới LSN3 | A=100, B=50 (chưa kịp flush) |

Lúc crash, đĩa dữ liệu vẫn A=100, B=50 — như T1 chưa xảy ra! Nhưng log đã có **COMMIT**. Recovery:

1. Quét WAL, thấy T1 có COMMIT (LSN3) → T1 là giao dịch **đã commit cần redo**.
2. **Redo** LSN1: đặt A=70. **Redo** LSN2: đặt B=80.
3. Kết quả sau phục hồi: A=70, B=80 ✓ — đúng như client được báo "thành công".

**Trường hợp ngược lại — crash TRƯỚC commit.** Nếu crash ở t2 (sau LSN1, LSN2 nhưng **chưa có COMMIT**): T1 là giao dịch dở dang. Recovery **undo** bằng before-image → A về 100, B về 50. Không có chuyện "A bị trừ mà B không được cộng" (atomicity giữ nguyên).

⚠ **Lỗi thường gặp.** Nghĩ "đã ghi vào buffer pool là an toàn". Không — buffer pool ở **RAM**, mất điện là bay. Chỉ khi **log record nằm trên đĩa** thì thay đổi mới thực sự bền. Đó là điểm WAL bảo vệ.

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Quét cả WAL từ đầu lịch sử mỗi lần khởi động à?"* — Không. Định kỳ DBMS tạo **checkpoint** (điểm kiểm tra): flush hết data page dirty xuống đĩa và ghi mốc vào log. Recovery chỉ cần replay từ checkpoint gần nhất.
- *"WAL liên quan gì tới transaction ACID?"* — WAL là cơ chế hiện thực **Durability** và một phần **Atomicity** của ACID. Xem [Lesson 03 — Transaction & ACID](../../02-Intermediate/lesson-03-transaction-acid/).
- *"WAL có giúp nhiều giao dịch chạy song song không?"* — Bản thân WAL lo bền vững/phục hồi. Việc nhiều version cùng tồn tại để đọc-ghi song song là **MVCC**, xem [Lesson 04 — Concurrency & Isolation](../../02-Intermediate/lesson-04-concurrency-isolation/). MVCC và WAL phối hợp: version cũ giúp đọc không khóa, WAL giúp khôi phục.

🔁 **Dừng lại tự kiểm tra.**
1. Phát biểu quy tắc write-ahead.
2. Crash sau khi log có COMMIT nhưng data page chưa flush → recovery làm gì?

<details><summary>Đáp án</summary>

1. Log record của một thay đổi phải nằm trên đĩa **trước** khi data page tương ứng được ghi và trước khi báo commit.
2. **Redo**: áp lại after-image từ log để đưa thay đổi đã-commit vào data page (kết quả A=70, B=80 trong ví dụ).
</details>

📝 **Tóm tắt mục 5.** WAL ghi ý định ra đĩa (tuần tự, nhanh) trước khi sửa data page (ngẫu nhiên, để sau). Khi crash, recovery **redo** giao dịch đã commit và **undo** giao dịch dở dang → trạng thái luôn nhất quán. WAL là nền của Durability + Atomicity.

---

## 6. Hai triết lý lưu trữ: B-tree vs LSM-tree

Cùng một mục tiêu (lưu index/dữ liệu trên đĩa, tìm nhanh), có hai trường phái đối nghịch.

### 6.1 B-tree — cập nhật tại chỗ (in-place update)

💡 **Trực giác.** **B-tree** giữ dữ liệu **đã sắp xếp** trong các page; sửa một giá trị thì **ghi đè ngay tại page chứa nó** (in-place). Như cuốn từ điển đóng sẵn: muốn sửa một mục thì lật tới trang đó và viết đè. (Cấu trúc B-tree chi tiết: [Cây cân bằng](../../../DataStructures/02-Intermediate/lesson-04-balanced-trees/).)

- **Đọc nhanh & ổn định:** tra một khóa = đi từ gốc xuống lá, ~log n page. Range scan (đọc khoảng) cũng nhanh vì lá nối tiếp nhau theo thứ tự.
- **Ghi là ngẫu nhiên (random write):** mỗi insert/update phải tìm đúng page rồi ghi đè, các page rải khắp đĩa → nhiều seek. Khi page đầy phải **tách (split)** → thêm chi phí.
- **Dùng ở:** PostgreSQL, MySQL (InnoDB) — index mặc định là B-tree (chính xác là B+tree).

### 6.2 LSM-tree — ghi tuần tự (log-structured)

💡 **Trực giác.** **LSM-tree (Log-Structured Merge tree — cây hợp nhất theo nhật ký)** **không sửa tại chỗ**. Mọi ghi đi vào một bảng sắp xếp trong RAM (**memtable**); khi đầy thì **đổ nguyên xuống đĩa thành một file bất biến (SSTable — Sorted String Table)** — ghi **tuần tự**, cực nhanh. Sửa/xóa không đè lên cái cũ mà ghi một **bản ghi mới đè logic** (xóa = ghi "tombstone"). Như viết nhật ký: không tẩy xóa trang cũ, chỉ ghi thêm dòng mới.

- **Ghi cực nhanh (sequential write):** chỉ append vào memtable + flush tuần tự → tận dụng tốc độ ghi tuần tự của đĩa.
- **Đọc tốn hơn:** một khóa có thể nằm ở memtable hoặc nhiều SSTable khác nhau → phải tìm qua nhiều tầng. Để tránh đọc thừa, mỗi SSTable có **Bloom filter** trả lời nhanh "khóa này **chắc chắn không** ở đây" → bỏ qua file đó. (Bloom filter: [Cấu trúc nâng cao](../../../DataStructures/03-Advanced/lesson-04-advanced-structures/).)
- **Compaction (dồn nén):** định kỳ trộn nhiều SSTable thành ít file hơn, vứt bỏ bản cũ và tombstone → đọc lại nhanh dần. Đây là cái giá nền chạy ngầm.
- **Dùng ở:** Cassandra, RocksDB, LevelDB, ScyllaDB — các hệ ghi-nặng, phân tán.

### 6.3 Read/Write amplification — so sánh kỹ

Hai khái niệm đo "phí thực tế":

- **Write amplification (khuếch đại ghi):** số byte thực ghi xuống đĩa / số byte dữ liệu logic. LSM ghi lại dữ liệu nhiều lần qua các tầng compaction → write amplification có thể cao, *nhưng* toàn bộ là ghi **tuần tự**. B-tree ghi ít lần hơn nhưng là ghi **ngẫu nhiên** (đắt trên đĩa) và còn ghi WAL + ghi đè cả page cho một thay đổi nhỏ.
- **Read amplification (khuếch đại đọc):** số page phải đọc để trả lời một truy vấn. B-tree: ~log n page, ổn định. LSM: có thể phải kiểm tra nhiều SSTable (giảm nhờ Bloom filter + compaction).

| | **B-tree** | **LSM-tree** |
| --- | --- | --- |
| Kiểu ghi | Tại chỗ, **ngẫu nhiên** | Append, **tuần tự** |
| Write amplification | Trung bình (ghi đè page + WAL) | Cao hơn (compaction lặp), nhưng tuần tự |
| Read amplification | Thấp & ổn định (~log n) | Cao hơn (nhiều tầng, cần Bloom filter) |
| Space amplification | Thấp (in-place) | Cao hơn (bản cũ + tombstone tới khi compact) |
| Range scan | Rất tốt (lá nối thứ tự) | Phải merge nhiều SSTable |
| **Hợp tải** | **Đọc-nhiều, đọc khoảng, cập nhật tại chỗ** | **Ghi-nặng, ingest khối lượng lớn** |
| Ví dụ DBMS | PostgreSQL, MySQL/InnoDB | Cassandra, RocksDB |

❓ **Câu hỏi tự nhiên của người đọc.**
- *"Tải ghi-nặng (log sự kiện, IoT, time-series) nên chọn gì?"* — **LSM**: ghi tuần tự rẻ, chịu được throughput ghi rất cao. Đọc theo điểm vẫn ổn nhờ Bloom filter.
- *"Hệ giao dịch đọc-ghi cân bằng, nhiều range query (báo cáo theo khoảng ngày)?"* — **B-tree**: đọc ổn định, range scan tốt, cập nhật tại chỗ gọn về dung lượng.
- *"Vì sao LSM cần Bloom filter mà B-tree không?"* — Trong LSM, một khóa không tồn tại vẫn có thể phải sờ vào nhiều SSTable để chắc chắn. Bloom filter cho biết "chắc chắn không có ở file này" trong O(1) → bỏ qua, tránh đọc đĩa thừa. B-tree chỉ có một cây nên không gặp vấn đề này.

🔁 **Dừng lại tự kiểm tra.**
1. Vì sao LSM ghi nhanh hơn B-tree cho tải ghi-nặng?
2. Bloom filter giải quyết vấn đề gì của LSM?

<details><summary>Đáp án</summary>

1. LSM chỉ append vào memtable rồi flush **tuần tự** thành SSTable — tận dụng tốc độ ghi tuần tự, không tốn seek. B-tree phải tìm đúng page và ghi đè **ngẫu nhiên** rải khắp đĩa, đắt hơn.
2. Read amplification: một khóa có thể nằm rải ở nhiều SSTable. Bloom filter trả lời nhanh "chắc chắn không có ở file này" → bỏ qua file đó, giảm số lần đọc đĩa.
</details>

📝 **Tóm tắt mục 6.** B-tree sửa tại chỗ → đọc nhanh ổn định, ghi ngẫu nhiên; hợp đọc-nhiều và range scan (PostgreSQL/MySQL). LSM-tree append tuần tự + compaction → ghi cực nhanh, đọc cần Bloom filter; hợp ghi-nặng (Cassandra/RocksDB). Chọn theo tỉ lệ đọc/ghi và kiểu truy vấn.

---

## 7. Bài tập

1. **Vì sao đọc theo page.** Giải thích vì sao DBMS đọc đĩa theo page 8 KB thay vì đọc đúng số byte của một row. Nêu ra chi phí chủ đạo khi chạm đĩa và một lợi ích phụ của việc nạp cả page.

2. **Tính số page cần đọc.** Bảng có **5.000.000 row**, mỗi row 100 byte, page 8 KB (giả sử 8.000 byte hữu dụng). (a) Một page chứa bao nhiêu row? (b) Lưu cả bảng cần bao nhiêu page? (c) Nếu buffer pool có 10.000 frame thì giữ được bao nhiêu % số page của bảng trong RAM?

3. **B-tree hay LSM cho tải ghi-nặng.** Một hệ thống thu thập log thiết bị IoT: ~200.000 bản ghi/giây ghi vào, hiếm khi cập nhật, đọc chủ yếu theo điểm (tra 1 thiết bị). Nên dùng storage engine theo triết lý nào? Giải thích qua write amplification và kiểu ghi (tuần tự/ngẫu nhiên).

4. **Recovery dùng WAL.** Cho WAL trên đĩa sau crash:
   \`\`\`
   LSN1: T1 UPDATE X old=10 new=25
   LSN2: T2 UPDATE Y old=5  new=8
   LSN3: T1 COMMIT
   LSN4: T2 UPDATE Z old=0  new=99
   \`\`\`
   T2 **chưa** có COMMIT lúc crash. Data page trên đĩa lúc crash: X=10, Y=5, Z=0. Hỏi: với mỗi giao dịch T1, T2 recovery làm redo hay undo? Giá trị X, Y, Z sau khi phục hồi xong là bao nhiêu?

---

## 8. Lời giải chi tiết

### Bài 1 — Vì sao đọc theo page

Chi phí chủ đạo khi chạm đĩa là **seek/latency** (đi tới đúng vị trí), gần như cố định cho mỗi lần truy cập, không phụ thuộc đọc nhiều hay ít byte. Đã trả giá seek rồi thì đọc 1 byte hay đọc nguyên page 8 KB gần như bằng tiền. Đọc từng byte cho cả page sẽ cần hàng nghìn lần seek → chậm hàng nghìn lần.

Lợi ích phụ: **locality**. Các row trong cùng page thường được dùng kế tiếp nhau; nạp cả page vào buffer pool nghĩa là những lần truy cập tiếp theo tới row lân cận trở thành **hit** (RAM) không tốn đọc đĩa.

### Bài 2 — Tính số page cần đọc

- **(a)** ⌊8000 / 100⌋ = **80 row/page**.
- **(b)** 5.000.000 / 80 = **62.500 page** để lưu cả bảng.
- **(c)** 10.000 frame / 62.500 page = 0,16 = **16%** số page của bảng nằm trong RAM cùng lúc. (Nếu tải có locality tốt, 16% page nóng này vẫn có thể phục vụ phần lớn truy cập → hit ratio cao hơn nhiều so với 16%.)

### Bài 3 — B-tree hay LSM cho tải ghi-nặng

Chọn **LSM-tree**. Lý do:

- Throughput ghi 200.000 bản ghi/giây là **ghi-nặng**. LSM chỉ append vào memtable rồi flush **tuần tự** thành SSTable → tận dụng tốc độ ghi tuần tự của đĩa, không tốn seek cho mỗi bản ghi. B-tree phải định vị đúng page và ghi đè **ngẫu nhiên** (kèm split khi đầy + WAL) → không theo kịp tốc độ ingest này.
- Hiếm cập nhật, đọc chủ yếu theo điểm: đây là điểm yếu nhẹ của LSM (read amplification), nhưng **Bloom filter** trên mỗi SSTable cho tra điểm hiệu quả (loại nhanh các file không chứa khóa). Không có range scan nặng nên nhược điểm của LSM không bị kích hoạt.
- Về write amplification: LSM có compaction lặp lại việc ghi, nhưng tất cả là **tuần tự** nên rẻ; tổng throughput vẫn vượt B-tree cho tải này.

→ Đây đúng là lý do Cassandra/RocksDB được dùng cho log, metrics, time-series, IoT.

### Bài 4 — Recovery dùng WAL

Quét WAL tìm giao dịch nào có COMMIT:

- **T1** có \`LSN3: COMMIT\` → **đã commit** → **REDO**. Áp after-image LSN1: X = 25.
- **T2** **không** có COMMIT (crash trước khi commit) → **dở dang** → **UNDO**. Dùng before-image của các thay đổi T2 đã ghi: LSN2 (Y) before=5, LSN4 (Z) before=0 → đặt Y = 5, Z = 0 (hoàn tác).

Giá trị sau phục hồi:

| Biến | Giá trị | Lý do |
| --- | --- | --- |
| X | **25** | T1 đã commit → redo new=25 |
| Y | **5** | T2 dở dang → undo về old=5 |
| Z | **0** | T2 dở dang → undo về old=0 |

Kết quả nhất quán: chỉ T1 (đã commit) để lại dấu vết; T2 như chưa từng chạy → giữ atomicity và durability.

---

## 9. Code & Minh họa

- Minh họa tương tác: [visualization.html](./visualization.html) — gồm 3 mô-đun: (1) mô phỏng buffer pool + LRU với chuỗi truy cập page và đếm hit ratio, (2) mô phỏng WAL ghi log trước data, bấm "crash" tại thời điểm bất kỳ rồi "recovery" replay/redo, (3) so sánh B-tree (ghi tại chỗ) vs LSM-tree (append + compaction) bằng animation kèm bảng read/write amplification.

---

## Bài tiếp theo

→ [Lesson 02 — NoSQL](../lesson-02-nosql/): các mô hình key-value, document, column-family, graph — và vì sao chúng đánh đổi tính nhất quán lấy khả năng mở rộng. Storage engine LSM ở bài này chính là nền của nhiều hệ NoSQL ghi-nặng.
`;
