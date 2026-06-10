// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: OperatingSystems/02-Memory-Storage/lesson-08-modern-storage/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Lưu trữ hiện đại (Modern Storage)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích cơ chế vật lý của **SSD (NAND flash)**: cell, page, block, tại sao ghi khác đọc, wear leveling và garbage collection là gì.
- Mô tả **journaling filesystem** (ext4): tại sao ghi nhật ký trước giúp chống hỏng dữ liệu khi mất điện — liên hệ với WAL (Write-Ahead Log) trong database.
- Phân tích 4 mức **RAID**: RAID 0, 1, 5, 10 — walk-through dung lượng dùng được, tốc độ, khả năng chịu đĩa hỏng với ví dụ 4 đĩa × 1 TB.
- Giải thích **page cache** (buffer cache): OS cache đĩa trong RAM, cơ chế dirty page, writeback.

## Kiến thức tiền đề

- [Lesson 06 — Filesystem](../lesson-06-filesystem/): inode, block, cách OS tổ chức dữ liệu trên đĩa.
- [Lesson 07 — I/O & Disk Scheduling](../lesson-07-io-disk-scheduling/): seek time, DMA, interrupt.

---

## 1. SSD và NAND Flash

### 1.1. Tại sao SSD khác HDD?

💡 **Trực giác:** HDD giống đĩa than — có kim cơ học phải di chuyển (seek time). SSD giống RAM — truy cập bằng điện tử, không phần chuyển động. Nhưng SSD không phải RAM: dữ liệu vẫn còn khi mất điện. Vì sao có thể vừa nhanh vừa bền?

**NAND flash memory** là công nghệ lưu trữ của SSD. Dữ liệu được lưu dưới dạng **điện tích trong floating-gate transistor** — không cần nguồn điện để giữ điện tích.

### 1.2. Cấu trúc: Cell → Page → Block

\`\`\`
NAND Flash hierarchy:
Cell (1 bit hoặc nhiều hơn)
  └─ Page (4 KB hoặc 16 KB — đơn vị ĐỌC/GHI)
       └─ Block (64–512 page = 256 KB – 8 MB — đơn vị XÓA)
\`\`\`

**Điểm cốt lõi:**
- **Đọc:** đọc theo đơn vị page (nhanh, ~0.1 ms).
- **Ghi:** ghi vào page trống trong block (nhanh, ~0.1–1 ms).
- **Xóa:** phải xóa theo đơn vị **block** (chậm hơn, ~1–5 ms) — và **chỉ có thể ghi vào page sau khi xóa block**.

### 1.3. Vì sao ghi khác đọc — Write Amplification

💡 **Trực giác — Analogy tờ giấy và tẩy:**
Bạn chỉ được viết lên giấy trắng. Khi cần sửa một chữ, không thể tẩy 1 chữ — phải tẩy cả trang (= block) rồi chép lại. Nếu trang 64 dòng mà chỉ sửa 1 dòng → phải copy 63 dòng còn lại sang trang trắng mới, rồi tẩy trang cũ.

**Quá trình ghi trên SSD (khi page đích đã có dữ liệu):**
1. Đọc toàn bộ block vào RAM (vì phải xóa cả block).
2. Sửa page cần ghi trong RAM.
3. Xóa block cũ trên flash.
4. Ghi toàn bộ block (đã sửa) trở lại.

Đây là **Write Amplification**: ghi 4 KB thực tế có thể gây ra hàng trăm KB I/O trên NAND.

### 1.4. Wear Leveling (san bằng hao mòn)

**Vấn đề:** Mỗi cell NAND chịu được hữu hạn lần ghi/xóa (PE cycle — Program/Erase cycle):
- MLC (Multi-Level Cell): ~3,000–10,000 PE cycles.
- TLC (Triple-Level Cell): ~500–3,000 PE cycles (phổ biến nhất hiện nay).

Nếu OS cứ ghi vào cùng một block (ví dụ: file log liên tục ghi vào 1 vùng) → block đó hao mòn nhanh trong khi các block khác còn "mới" → SSD chết cục bộ.

**Wear leveling:** SSD controller (không phải OS) tự động **phân phối đều số lần ghi** trên tất cả block. Khi OS ghi vào địa chỉ logic X, controller có thể thực sự ghi vào block vật lý Y (khác lần trước). OS không biết điều này — controller duy trì bảng ánh xạ (FTL — Flash Translation Layer).

### 1.5. Garbage Collection (Thu gom rác)

**Vấn đề:** Khi OS xóa file, controller đánh dấu page là "invalid" (không còn dùng) nhưng không xóa ngay trên flash (vì xóa chậm và tốn PE cycle). Theo thời gian, nhiều block chứa mix: một số page valid, một số page invalid.

**Garbage collection:** Background process của controller:
1. Chọn block có nhiều invalid page nhất.
2. Copy tất cả valid page sang block trống khác.
3. Xóa block cũ → có block trống để dùng.

**TRIM command:** OS thông báo cho controller biết block nào đã bị xóa (OS-level) → controller có thể xóa sớm trong background thay vì chờ đến khi cần. Cải thiện hiệu năng và tuổi thọ SSD.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"SSD có cần defrag không?"* — Không. Defrag (chống phân mảnh) có nghĩa trong HDD vì ghi dữ liệu liền kề giảm seek time. SSD không có seek time cơ học → defrag không cải thiện hiệu năng, thậm chí tốn PE cycle vô ích → làm giảm tuổi thọ.
- *"Vì sao SSD mới rất nhanh, dùng lâu chậm hơn?"* — Khi SSD còn nhiều block trống, controller có thể ghi nhanh vào block trống sẵn có. Khi đầy, mọi lần ghi phải kích hoạt GC trước → thêm latency. Đây là lý do SSD nên để trống ~10–20%.
- *"SLC, MLC, TLC, QLC khác nhau thế nào?"* — SLC lưu 1 bit/cell (đắt, bền nhất), MLC 2 bit, TLC 3 bit, QLC 4 bit (rẻ nhất, ít bền nhất). Laptop/desktop thông dụng dùng TLC hoặc QLC.

⚠ **Lỗi thường gặp:** Nhiều người nghĩ SSD bền hơn HDD mọi mặt. Không — SSD có giới hạn PE cycle (TLC ~500-3000 lần/cell) và dễ hỏng dữ liệu khi mất điện đột ngột (HDD với platter từ bền hơn về mặt này). Cả hai đều cần backup.

📝 **Tóm tắt mục 1:**
- SSD: NAND flash, Cell → Page (đọc/ghi) → Block (xóa).
- Ghi ≠ đọc: phải xóa block trước khi ghi → write amplification.
- Wear leveling: SSD controller phân phối ghi đều (FTL).
- GC: dọn invalid page để có block trống. TRIM giúp GC hiệu quả hơn.

---

## 2. Journaling Filesystem

### 2.1. Vấn đề: Crash consistency

**Bài toán:** Hãy tưởng tượng bạn xoá file. OS cần cập nhật 3 thứ trên đĩa:
1. **Inode** của file: xóa.
2. **Data blocks**: đánh dấu free (cập nhật bitmap).
3. **Directory entry**: xóa entry.

Nếu mất điện sau khi chỉ làm được bước 1 (xoá inode) nhưng chưa cập nhật bitmap và directory → **filesystem corrupt**: directory vẫn trỏ về inode đã xóa, bitmap vẫn đánh dấu block là "used" dù không ai dùng.

**Consistency problem** xảy ra bởi vì các write đĩa không phải atomic (không xảy ra tất cả hoặc không xảy ra gì) — chúng xảy ra lần lượt, và crash có thể xảy ra ở bất kỳ điểm nào.

### 2.2. Journaling — ghi nhật ký trước

💡 **Trực giác — Analogy nhật ký ngân hàng:**
Trước khi ngân hàng thực sự chuyển tiền, họ ghi vào sổ nhật ký (journal/ledger): "Sẽ chuyển X từ A sang B". Nếu mất điện giữa chừng, khi khởi động lại: đọc sổ nhật ký → biết phải làm gì → hoàn thành hoặc rollback.

**Journaling filesystem (ext4, NTFS, HFS+) hoạt động:**

1. **Trước khi ghi thật:** Ghi mô tả thay đổi vào **journal** (một vùng đặc biệt trên đĩa) — đây là "commit log".
2. **Sau khi journal commit:** Thực sự ghi dữ liệu vào vị trí thật trên đĩa (gọi là "checkpoint").
3. **Nếu crash sau bước 1 nhưng trước bước 2:** Khi khởi động lại, đọc journal → biết thay đổi chưa hoàn thành → có thể **replay** (thực hiện lại) hoặc discard.
4. **Nếu crash sau bước 2:** Thay đổi đã hoàn thành → không vấn đề gì.

**Walk-through xóa file với journaling:**

\`\`\`
Bước 1: Ghi vào journal:
  TxBegin
  Inode #1024: xóa
  Bitmap block 14: bit 42 = 0 (free)
  Directory entry "report.pdf": xóa
  TxEnd (commit)

[Đĩa nhận journal → ghi thành công → "committed"]

Bước 2: Thực hiện thay đổi thật:
  Cập nhật inode #1024 trên đĩa thật
  Cập nhật bitmap trên đĩa thật
  Xóa directory entry trên đĩa thật

Bước 3: Xóa journal entry (đã không cần nữa)
\`\`\`

**Kịch bản crash:**
- Crash trước khi journal commit (bước 1 chưa xong) → journal không đầy đủ → discard journal entry → filesystem y nguyên (chưa thay đổi gì) = **safe**.
- Crash sau journal commit nhưng trước bước 2 → journal đầy đủ → replay khi reboot = **safe**.
- Crash trong bước 2 → journal đầy đủ → replay → **safe**.

### 2.3. Liên hệ WAL trong database

**WAL (Write-Ahead Log)** trong database (PostgreSQL, SQLite, MySQL InnoDB) là cùng nguyên lý:
- Trước khi sửa dữ liệu thật (trong data pages), ghi redo log (WAL) trước.
- Crash → đọc WAL → redo/undo các transaction.

Tham khảo: \`../../../Databases/\` (nếu có bài về WAL).

**Sự khác biệt:** Journaling filesystem journal các thay đổi **metadata** (inode, bitmap) và optionally dữ liệu. WAL database journal các thay đổi **logic** (SQL operations). Cùng mục đích: crash consistency.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Journaling có làm chậm filesystem không?"* — Có overhead nhỏ: mỗi write thêm 1 write vào journal. Nhưng journal thường được tối ưu (sequential write vào vùng riêng) → overhead thực tế nhỏ (~10-30% write throughput giảm) nhưng crash recovery nhanh hơn rất nhiều.
- *"ext4 journal dữ liệu hay chỉ metadata?"* — Mặc định ext4 chỉ journal **metadata** (nhanh hơn). Mode "data=journal" journal cả dữ liệu (an toàn nhất nhưng chậm hơn). Mode "data=writeback" không đảm bảo thứ tự metadata/data (nhanh nhất nhưng có thể có file "rác" sau crash).
- *"fsck là gì?"* — File System Check: công cụ scan và sửa filesystem corrupt. Với journaling, fsck thường chỉ cần replay journal thay vì scan toàn đĩa → recovery sau crash cực nhanh (giây thay vì giờ với ext2).

📝 **Tóm tắt mục 2:**
- Crash consistency: write đĩa không atomic → crash giữa chừng → corrupt.
- Journaling: ghi log trước (journal), rồi mới ghi thật → crash bất cứ lúc nào đều safe.
- ext4: journal metadata (mặc định), data journal (optional). WAL database = cùng nguyên lý.

---

## 3. RAID (Redundant Array of Independent Disks)

### 3.1. Mục đích của RAID

💡 **Trực giác — Trứng và giỏ:**
"Đừng bỏ hết trứng vào một giỏ." RAID dùng **nhiều đĩa** để đạt được: (1) **dung lượng lớn hơn**, (2) **hiệu năng cao hơn** (đọc/ghi song song), (3) **độ tin cậy cao hơn** (1 đĩa hỏng không mất dữ liệu).

**Ví dụ xuyên suốt:** 4 đĩa × 1 TB mỗi đĩa.

### 3.2. RAID 0 — Striping (Phân mảnh song song)

**Cơ chế:** Dữ liệu được chia thành các **stripe** (chunk), phân phối luân phiên qua tất cả đĩa.

\`\`\`
Đĩa 0   Đĩa 1   Đĩa 2   Đĩa 3
A1      A2      A3      A4
B1      B2      B3      B4
C1      C2      C3      C4
\`\`\`

File A: stripe A1 vào Đĩa 0, A2 vào Đĩa 1, A3 vào Đĩa 2, A4 vào Đĩa 3 — **4 đĩa ghi song song**.

**4 đĩa 1 TB:**
- Dung lượng dùng được: $\\mathbf{4 \\times 1 \\text{ TB} = 4 \\text{ TB}}$ (100% hiệu suất không gian).
- Chịu đĩa hỏng: **0** — 1 đĩa hỏng bất kỳ → mất toàn bộ dữ liệu.
- Read/Write speed: ~4× so với đĩa đơn (lý thuyết).

**Dùng khi nào:** Cần hiệu năng tối đa, dữ liệu không quan trọng (tmp, scratch, video editing cache).

⚠ **Cảnh báo:** RAID 0 không có redundancy — thực ra làm tăng xác suất mất dữ liệu (xác suất ít nhất 1 đĩa hỏng tăng tỷ lệ thuận với số đĩa).

### 3.3. RAID 1 — Mirroring (Nhân bản)

**Cơ chế:** Mỗi đĩa được **nhân bản** hoàn toàn sang đĩa khác. 4 đĩa = 2 cặp mirror.

\`\`\`
Đĩa 0 (Primary)   Đĩa 1 (Mirror)   Đĩa 2 (Primary)   Đĩa 3 (Mirror)
A                  A (copy)          B                  B (copy)
C                  C (copy)          D                  D (copy)
\`\`\`

**4 đĩa 1 TB:**
- Dung lượng dùng được: **2 TB** (50% hiệu suất không gian — một nửa dùng để mirror).
- Chịu đĩa hỏng: Mỗi cặp chịu được 1 đĩa hỏng → tổng **mỗi pair chịu 1 hỏng**.
- Read: nhanh hơn (đọc từ cả 2 mirror); Write: y một đĩa đơn (phải ghi vào cả 2).

**Dùng khi nào:** Hệ thống quan trọng cần reliability cao, hiệu năng đọc tốt (database primary).

### 3.4. RAID 5 — Distributed Parity (Parity phân tán)

**Cơ chế:** Dữ liệu stripe qua tất cả đĩa + 1 **parity block** (tổng XOR) luân phiên trên các đĩa. Parity cho phép phục hồi dữ liệu nếu **1 đĩa hỏng**.

**Tính parity (XOR):**
- $\\text{bit } A \\oplus \\text{bit } B \\oplus \\text{bit } C = \\text{Parity } P$.
- Nếu A hỏng: $A = P \\oplus B \\oplus C$ → khôi phục được A.
- Ví dụ: $A=1, B=0, C=1 \\to P = 1 \\oplus 0 \\oplus 1 = 0$.
- A hỏng: $A = 0 \\oplus 0 \\oplus 1 = 1$. ✓

**Layout với 4 đĩa:**

| Stripe | Đĩa 0 | Đĩa 1 | Đĩa 2 | Đĩa 3 |
|--------|-------|-------|-------|-------|
| 0 | A0 | A1 | A2 | **P(A)** |
| 1 | B0 | B1 | **P(B)** | B3 |
| 2 | C0 | **P(C)** | C2 | C3 |
| 3 | **P(D)** | D1 | D2 | D3 |

Parity luân phiên trên các đĩa → tránh bottleneck vào 1 đĩa parity.

**4 đĩa 1 TB:**
- Dung lượng dùng được: **3 TB** (4 - 1 đĩa cho parity = 75% hiệu suất).
- Chịu đĩa hỏng: **1 đĩa** bất kỳ → rebuild từ parity.
- Read: nhanh (~4× song song); Write: chậm hơn RAID 0 (phải tính parity).

**Dùng khi nào:** Cân bằng dung lượng, hiệu năng, reliability. Phổ biến nhất cho NAS và server.

### 3.5. RAID 10 (RAID 1+0) — Mirror + Stripe

**Cơ chế:** Trước tiên mirror thành cặp (RAID 1), sau đó stripe qua các cặp (RAID 0).

\`\`\`
         Stripe (RAID 0)
        /               \\
  [Đĩa 0 | Đĩa 1]    [Đĩa 2 | Đĩa 3]
  Mirror (RAID 1)      Mirror (RAID 1)
\`\`\`

**4 đĩa 1 TB:**
- Dung lượng dùng được: **2 TB** (50% — mirror chiếm một nửa).
- Chịu đĩa hỏng: **Ít nhất 1 đĩa**, có thể 2 đĩa (nếu đĩa hỏng ở các cặp khác nhau). Worst case: 2 đĩa hỏng trong cùng 1 cặp → mất dữ liệu.
- Read/Write: nhanh (stripe song song) + reliable (mirror).

**Dùng khi nào:** Database production cần cả hiệu năng cao (write) và reliability (RAID 5 write penalty là vấn đề với database).

### 3.6. So sánh tổng hợp — 4 đĩa × 1 TB

| RAID | Dung lượng dùng được | Chịu đĩa hỏng | Read | Write | Chi phí |
|------|---------------------|--------------|------|-------|---------|
| RAID 0 | **4 TB** | 0 đĩa | Rất cao | Rất cao | Thấp nhất |
| RAID 1 | 2 TB | 1 đĩa/cặp | Cao | Trung bình | Cao |
| RAID 5 | **3 TB** | **1 đĩa** | Cao | Trung bình | Trung bình |
| RAID 10 | 2 TB | 1-2 đĩa | Rất cao | **Cao** | Cao |

🔁 **Dừng lại tự kiểm tra:**

6 đĩa × 2 TB với RAID 5: dung lượng dùng được là bao nhiêu? Chịu tối đa bao nhiêu đĩa hỏng?

<details>
<summary>Đáp án</summary>
RAID 5 với $N$ đĩa: dùng $N-1$ cho dữ liệu, 1 cho parity (distributed).

6 đĩa × 2 TB: dung lượng dùng được $= (6-1) \\times 2 \\text{ TB} =$ **10 TB**.

Chịu tối đa **1 đĩa hỏng** — dù có bao nhiêu đĩa, RAID 5 chỉ chịu 1 đĩa. Nếu cần chịu 2 đĩa → dùng RAID 6 (2 parity blocks).
</details>

---

## 4. Page Cache (Buffer Cache)

### 4.1. Cơ chế

**Page cache** là một vùng RAM do kernel quản lý, lưu trữ nội dung file vừa đọc/ghi từ đĩa. Khi ứng dụng đọc file, OS kiểm tra page cache trước — nếu có (cache hit) → trả về từ RAM mà không cần đĩa.

**Tại sao quan trọng?**
- RAM truy cập: ~100 nanoseconds.
- HDD truy cập: ~10 ms = 10,000,000 ns = **100,000 lần chậm hơn**.
- SSD NVMe truy cập: ~0.1 ms = **1,000 lần chậm hơn**.

→ Cache hit từ RAM nhanh hơn đĩa 3-5 bậc độ lớn.

### 4.2. Dirty Pages và Writeback

Khi ứng dụng **ghi** vào file, OS ghi vào page cache trước (trong RAM), đánh dấu page là **dirty** (đã sửa, chưa đồng bộ xuống đĩa). Ứng dụng trả về ngay lập tức mà không chờ ghi đĩa.

**Writeback daemon** (\`pdflush\` trong Linux, sau thay bằng \`flush\`) định kỳ flush dirty pages xuống đĩa:
- Khi dirty page quá cũ (thường 30 giây).
- Khi memory pressure cao (cần RAM cho việc khác).
- Khi ứng dụng gọi \`fsync()\` hoặc \`sync()\`.

**Rủi ro:** Nếu mất điện trước khi writeback flush dirty pages → dữ liệu mất (RAM không lưu khi mất điện). Đây là lý do database gọi \`fsync()\` sau mỗi transaction commit quan trọng.

### 4.3. Eviction — Cache đầy thì làm gì?

Khi page cache đầy và cần nạp trang mới:
- Clean page (chưa sửa): discard trực tiếp — không cần ghi đĩa.
- Dirty page: phải writeback xuống đĩa trước → chậm hơn.

OS dùng biến thể LRU để evict page ít dùng nhất (giống page replacement ở [Lesson 05](../lesson-05-page-replacement/)).

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Tại sao server database cần nhiều RAM?"* — Phần lớn RAM được dùng làm page cache. Database engine (~InnoDB buffer pool, PostgreSQL shared_buffers) cũng có cache riêng tương tự. RAM nhiều → cache lớn → ít đọc đĩa → hiệu năng cao hơn.
- *"\`sync\` vs \`fsync\` vs \`fdatasync\` khác nhau thế nào?"* — \`sync\`: flush tất cả dirty pages của hệ thống. \`fsync(fd)\`: flush dirty pages của file fd xuống đĩa, đảm bảo dữ liệu + metadata lên đĩa. \`fdatasync(fd)\`: chỉ flush dữ liệu (không flush metadata không cần thiết) → nhanh hơn \`fsync\` một chút.

📝 **Tóm tắt mục 4:**
- Page cache: OS cache đĩa trong RAM → đọc lần 2 từ RAM, không từ đĩa.
- Dirty page: ghi vào cache trước, writeback daemon flush xuống đĩa sau.
- Rủi ro mất điện: dirty page chưa flush → mất → dùng \`fsync\` cho dữ liệu quan trọng.

---

## Bài tập

**Bài 1.** SSD có block size 512 KB, page size 4 KB (128 page/block). OS cần ghi 4 KB vào page thứ 50 trong block đã có dữ liệu. Mô tả đầy đủ các bước controller phải thực hiện. Có bao nhiêu byte thực sự được đọc + ghi trên NAND trong quá trình này?

**Bài 2.** Filesystem không có journaling. OS cần tạo file mới: (a) cấp phát inode, (b) ghi dữ liệu vào block, (c) thêm directory entry. OS crash sau bước (a). Mô tả trạng thái filesystem. Journaling sửa vấn đề này thế nào?

**Bài 3.** 6 đĩa × 4 TB. Tính dung lượng dùng được và số đĩa hỏng chịu được cho RAID 0, RAID 1, RAID 5, RAID 10 (6 đĩa RAID 10 = 3 cặp mirror, stripe qua 3 cặp).

**Bài 4.** Server database PostgreSQL có 64 GB RAM. Với shared_buffers = 25% RAM, ước tính số block 8 KB có thể cache. Nếu database 500 GB và working set 10 GB, cache có đủ không?

**Bài 5.** Giải thích vì sao \`write(fd, buf, 4096)\` trong C trả về ngay lập tức dù đĩa HDD cần 10 ms để ghi, và vì sao \`fsync(fd)\` lại chậm hơn nhiều.

## Lời giải chi tiết

### Bài 1 — SSD write amplification

**Bước thực hiện:**
1. **Đọc block** chứa page 50 vào RAM: đọc toàn bộ 512 KB (128 page × 4 KB).
2. **Sửa page 50** trong RAM (chỉ 4 KB thay đổi, 127 page còn lại giữ nguyên).
3. **Xóa block** trên NAND flash (erase, đặt tất cả bits về 1). Đây là thao tác flash erase.
4. **Ghi toàn bộ block** (512 KB) trở lại NAND.

**Số byte I/O thực tế trên NAND:**
- Đọc: 512 KB ($128 \\times 4$ KB).
- Ghi: 512 KB.
- **Tổng: 1 MB** để ghi 4 KB dữ liệu → **Write Amplification $= 128\\times$**.

Trong thực tế, controller có thể dùng kỹ thuật "out-of-place write": ghi page 50 mới vào block trống khác (không cần xóa block cũ ngay) → amortize chi phí GC. Write amplification thực tế thấp hơn, nhưng GC vẫn phải xảy ra.

### Bài 2 — Crash consistency và journaling

**Không có journaling — crash sau bước (a):**
- Inode đã được cấp phát (inode bitmap cập nhật → inode X = "used").
- Data block chưa ghi (inode trỏ về block chưa có dữ liệu, hoặc trỏ về block rác).
- Directory entry chưa thêm (file không có tên, không thể truy cập).

**Trạng thái:** Inode X tồn tại nhưng không có tên file nào trỏ đến (orphaned inode). Đây là "lost+found" case trong fsck.

**Hậu quả:** Block dữ liệu bị đánh dấu "used" nhưng không ai dùng được → rò rỉ không gian đĩa.

**Với journaling:**

\`\`\`
Journal entry:
  TxBegin
  Inode bitmap: bit X = 1
  Inode X: (metadata, block pointers)
  Data block 42: (nội dung file)
  Directory block: thêm entry "newfile" → inode X
  TxEnd
\`\`\`

Crash sau TxEnd nhưng trước áp dụng vào đĩa thật → replay journal khi reboot → áp dụng tất cả hoặc không gì cả → filesystem nhất quán.

### Bài 3 — RAID với 6 đĩa × 4 TB

| RAID | Tính toán | Dung lượng | Chịu hỏng |
|------|-----------|-----------|-----------|
| RAID 0 | $6 \\times 4$ TB | **24 TB** | 0 đĩa |
| RAID 1 | $3 \\text{ cặp} \\times (4 \\text{ TB} / 2)$ | **12 TB** | 1 đĩa/cặp |
| RAID 5 | $(6-1) \\times 4$ TB | **20 TB** | **1 đĩa** |
| RAID 10 | 3 cặp mirror, stripe | $(6/2) \\times 4 \\text{ TB} =$ **12 TB** | 1-2 đĩa (tùy cặp) |

Lưu ý RAID 5: 6 đĩa → 5 đĩa dữ liệu + 1 đĩa parity (distributed) = 20 TB. Vẫn chỉ chịu 1 đĩa hỏng (RAID 6 chịu 2 đĩa).

### Bài 4 — PostgreSQL page cache

- RAM: 64 GB. Shared_buffers $= 25\\% \\times 64 \\text{ GB} =$ **16 GB**.
- Block 8 KB: $16 \\text{ GB} / 8 \\text{ KB} = 16 \\times 1024 \\times 1024 / 8 =$ **2,097,152 block = 2,048K block**.
- **Working set $10 \\text{ GB} < 16 \\text{ GB}$ cache** → cache đủ để chứa toàn bộ working set → hầu hết query đọc từ RAM → hiệu năng tốt.
- Nếu working set > cache (ví dụ 20 GB): cache miss → phải đọc đĩa → hiệu năng giảm đáng kể.

### Bài 5 — write() nhanh, fsync() chậm

**write(fd, buf, 4096) trả về ngay** vì OS không ghi thẳng xuống đĩa — OS copy dữ liệu vào **page cache** (RAM), đánh dấu dirty, trả về. Toàn bộ thao tác là RAM operation (~1 µs) chứ không phải disk operation (~10 ms với HDD).

**fsync(fd) chậm** vì nó phải:
1. Flush tất cả dirty pages của file fd xuống đĩa vật lý.
2. Gửi lệnh "flush cache" tới disk controller (đảm bảo dữ liệu qua khỏi disk write cache, nằm trên platter thật hoặc flash cell thật).
3. Chờ disk xác nhận hoàn thành.

Với HDD: fsync 1 file nhỏ mất 5–15 ms (seek + rotational latency + write). Với SSD NVMe: 0.1–0.5 ms. Database gọi fsync sau mỗi transaction commit → đây là bottleneck chính với durability-intensive workload.

## Liên kết và bài tiếp theo

- [Lesson 07 — I/O & Disk Scheduling](../lesson-07-io-disk-scheduling/) — HDD scheduling, DMA, interrupt
- [Lesson 06 — Filesystem](../lesson-06-filesystem/) — inode, journaling xây trên filesystem
- [Tầng 3 — Advanced & Modern](../../03-Advanced-Modern/index.html) — Ảo hoá, bảo mật OS, hệ điều hành hiện đại
- [visualization.html](./visualization.html) — so sánh RAID tương tác

## 📝 Tổng kết Lesson 08

- **SSD:** Cell → Page (đọc/ghi) → Block (xóa). Ghi cần xóa block trước → write amplification. FTL + wear leveling = SSD controller tự phân phối ghi. GC + TRIM = dọn invalid page.
- **Journaling:** Ghi log trước, áp dụng sau → crash bất cứ lúc nào đều safe. ext4 journal metadata; WAL database = cùng nguyên lý.
- **RAID 0:** 4TB (100%), 0 fault tolerance. **RAID 1:** 2TB (50%), 1 đĩa/cặp. **RAID 5:** 3TB (75%), 1 đĩa. **RAID 10:** 2TB (50%), 1-2 đĩa, write nhanh nhất.
- **Page cache:** OS cache đĩa trong RAM → đọc lần 2 từ RAM. Dirty pages → writeback daemon → fsync() để đảm bảo persist.
- Kết thúc Tầng 2: Memory & Storage → tiếp theo [Tầng 3: Advanced & Modern](../../03-Advanced-Modern/index.html).
`;
