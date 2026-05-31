# Lesson 06 — Hệ thống file (Filesystem)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được **file là gì** về mặt trừu tượng hoá lưu trữ, và metadata đi kèm.
- Mô tả cấu trúc **thư mục (directory)** dạng cây và cách hệ điều hành phân giải đường dẫn (path).
- Hiểu **inode** là gì: nó lưu metadata gì và cách trỏ tới các block dữ liệu.
- Phân tích 3 chiến lược cấp phát block (block allocation): **liền kề (contiguous)**, **liên kết (linked)**, **chỉ mục (indexed)** — ưu nhược và walk-through truy cập block thứ k.
- Tính **dung lượng file tối đa** với inode có direct + single/double/triple indirect pointers bằng số cụ thể.
- Hiểu quản lý không gian trống bằng **bitmap** và **free list**.

## Kiến thức tiền đề

- [Lesson 02 — Paging](../lesson-02-paging/): khái niệm trang/block và địa chỉ vật lý.
- [Lesson 01 — Quản lý bộ nhớ](../lesson-01-memory-management/): cấp phát liên tục, phân mảnh.

---

## 1. File là gì?

### 1.1. Định nghĩa và mục đích

💡 **Trực giác — Analogy tủ tài liệu:**
Hãy tưởng tượng một căn phòng lưu trữ khổng lồ với hàng triệu ngăn kéo nhỏ (= sector trên đĩa), mỗi ngăn chứa một tờ giấy dữ liệu. Không ai có thể nhớ "tài liệu dự án A nằm ở ngăn kéo 147, 233, 891..." — quá lộn xộn. **File** là một nhãn dán tiện lợi: bạn đặt tên, và hệ điều hành tự nhớ dữ liệu nằm ở các ngăn kéo nào.

**File (tệp)** là một **trừu tượng hoá (abstraction)** của lưu trữ: một chuỗi byte có tên, được hệ điều hành quản lý. Người dùng và ứng dụng chỉ cần biết tên file — không cần biết dữ liệu nằm ở sector vật lý nào trên đĩa.

**Vì sao cần trừu tượng hoá?** Vì phần cứng lưu trữ (đĩa cứng, SSD) chỉ biết đọc/ghi theo địa chỉ sector vật lý. Nếu không có filesystem, mọi chương trình phải tự quản lý địa chỉ vật lý — không thể chia sẻ dữ liệu, không có tên file, không có thư mục.

### 1.2. Metadata của file

Mỗi file có hai phần:
1. **Dữ liệu (data)**: nội dung thực tế (bytes).
2. **Metadata**: thông tin về file, không phải nội dung.

Metadata điển hình bao gồm:

| Thuộc tính | Ý nghĩa |
|-----------|---------|
| Tên file | Tên người dùng đặt (lưu trong directory, không trong inode) |
| Kích thước | Số byte trong file |
| Quyền (permissions) | ai được đọc/ghi/thực thi (rwx) |
| Owner (chủ sở hữu) | UID, GID |
| Timestamps | atime (lần đọc cuối), mtime (lần sửa cuối), ctime (metadata change) |
| Số inode | Định danh duy nhất của file trong filesystem |
| Số hard link | Bao nhiêu tên file trỏ về inode này |
| Vị trí block | Dữ liệu nằm ở block nào trên đĩa |

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Tên file không lưu trong inode?"* — Đúng! Tên file lưu trong **thư mục (directory entry)**, ánh xạ tên → số inode. Inode chỉ lưu metadata và vị trí block. Điều này cho phép **hard link**: nhiều tên file cùng trỏ về một inode.
- *"Vì sao có 3 loại timestamp khác nhau?"* — atime = lần truy cập đọc cuối; mtime = lần sửa nội dung cuối; ctime = lần thay đổi metadata cuối (vd đổi permissions). Nhiều hệ thống tắt atime để giảm ghi đĩa.

📝 **Tóm tắt mục 1:**
- File = trừu tượng hoá của lưu trữ: tên + dữ liệu + metadata.
- Metadata lưu trong inode, không phải directory entry.
- Tên file lưu trong directory → hard link là có thể.

---

## 2. Thư mục (Directory) và cây đường dẫn

### 2.1. Directory là gì?

💡 **Trực giác:** Directory (thư mục) là một loại file đặc biệt, nội dung của nó là **bảng ánh xạ tên → inode**. Ví dụ `/home/user/` chứa:

```
"Documents" → inode 1024
"code"      → inode 2048
".bashrc"   → inode 512
```

Khi bạn gõ `cat /home/user/Documents/report.pdf`, OS thực hiện **path resolution (phân giải đường dẫn)**:

```
/ (root)        → đọc directory của root → tìm "home" → inode X
/home           → đọc directory inode X → tìm "user" → inode Y
/home/user      → đọc directory inode Y → tìm "Documents" → inode Z
/home/user/Documents → đọc directory inode Z → tìm "report.pdf" → inode W
/home/user/Documents/report.pdf → đọc data blocks của inode W
```

### 2.2. Cấu trúc cây

Filesystem hiện đại (ext4, NTFS, APFS) tổ chức thư mục theo cây:
- **Root directory** (`/` trên Linux, `C:\` trên Windows) là gốc.
- Mỗi node trong cây là directory.
- Lá là file hoặc directory rỗng.

**Hai entry đặc biệt trong mọi directory:**
- `.` → inode của directory hiện tại.
- `..` → inode của directory cha.

⚠ **Lỗi thường gặp:** Nhiều người nghĩ directory "chứa" file. Thực ra directory chỉ chứa **ánh xạ tên → inode**. File thực sự nằm ở block dữ liệu trên đĩa, được trỏ đến bởi inode.

🔁 **Dừng lại tự kiểm tra:**

Lệnh `ln /home/user/a.txt /home/backup/a.txt` tạo hard link. Có bao nhiêu inode được tạo?

<details>
<summary>Đáp án</summary>
Không có inode mới nào được tạo. Hard link chỉ tạo thêm một entry mới trong directory (`/home/backup/`) trỏ về **cùng inode** với `/home/user/a.txt`. Cả hai tên đều dùng chung inode và data block. Chỉ khi xoá tất cả hard link (số hard link về 0) thì inode và data block mới được giải phóng.
</details>

📝 **Tóm tắt mục 2:**
- Directory = file đặc biệt chứa bảng tên → inode.
- Path resolution: đi từng component, tra bảng directory.
- Cấu trúc cây với root, `.` và `..`.

---

## 3. Inode — trái tim của filesystem

### 3.1. Inode là gì?

**Inode (index node)** là cấu trúc dữ liệu trên đĩa lưu trữ toàn bộ metadata của một file và **con trỏ tới các block dữ liệu**.

Cấu trúc inode điển hình (Unix/ext4):

```
Inode #1024
├── mode: -rw-r--r-- (permissions)
├── uid: 1000 (owner)
├── gid: 1000 (group)
├── size: 12288 bytes
├── atime: 2026-05-31 09:00
├── mtime: 2026-05-30 14:00
├── ctime: 2026-05-30 14:00
├── nlink: 1 (số hard link)
├── direct[0]:  block 142
├── direct[1]:  block 143
├── direct[2]:  block 144
├── direct[3]:  —
│   ... (direct[0..11] — thường 12 con trỏ direct)
├── single_indirect: block 200 (trỏ tới block chứa 256 con trỏ block)
├── double_indirect: block 300 (trỏ tới block chứa 256 con trỏ single_indirect)
└── triple_indirect: block 400 (trỏ tới block chứa 256 con trỏ double_indirect)
```

### 3.2. Tính dung lượng file tối đa

Giả sử: block size = 4 KB = 4096 bytes; mỗi con trỏ block = 4 bytes → mỗi indirect block chứa **4096 ÷ 4 = 1024 con trỏ**.

| Loại con trỏ | Số block | Dung lượng |
|-------------|----------|-----------|
| 12 direct | 12 | 12 × 4 KB = **48 KB** |
| 1 single indirect | 1024 | 1024 × 4 KB = **4 MB** |
| 1 double indirect | 1024² = 1,048,576 | 1,048,576 × 4 KB = **4 GB** |
| 1 triple indirect | 1024³ = 1,073,741,824 | 1,073,741,824 × 4 KB = **4 TB** |
| **Tổng** | | **≈ 4 TB + 4 GB + 4 MB + 48 KB** |

**Walk-through: truy cập byte thứ 50,000 của file**

- Block size = 4096 bytes.
- Block offset = ⌊50,000 ÷ 4,096⌋ = **12** (block thứ 12, đánh số từ 0).
- 12 direct blocks → block 0..11. Block thứ 12 **nằm ngoài vùng direct**.
- Đi vào **single indirect**: đọc block tại `inode.single_indirect` → lấy con trỏ thứ `12 - 12 = 0` → đó là địa chỉ block chứa dữ liệu.
- Offset trong block: `50,000 mod 4,096 = 50,000 - 12 × 4,096 = 50,000 - 49,152 = **848 bytes** từ đầu block`.

**Walk-through: truy cập byte thứ 100,000**

- Block offset = ⌊100,000 ÷ 4,096⌋ = **24** (block thứ 24).
- 24 > 12 → nằm trong single indirect.
- Chỉ số trong single indirect = 24 - 12 = **12**.
- Đọc block tại `inode.single_indirect`, lấy con trỏ thứ 12 → địa chỉ block dữ liệu.
- Offset trong block: `100,000 mod 4,096 = 100,000 - 24 × 4,096 = 100,000 - 98,304 = **1,696 bytes`**.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Tại sao cần single/double/triple indirect? Tại sao không dùng tất cả direct?"* — Inode có kích thước cố định (thường 128 hoặc 256 bytes). Nếu dùng tất cả direct: 256 bytes / 4 bytes mỗi con trỏ = 64 block = 64 × 4 KB = 256 KB tối đa — quá nhỏ. Indirect pointers cho phép file rất lớn mà inode vẫn nhỏ.
- *"Đọc single indirect mất thêm mấy lần truy cập đĩa?"* — 1 lần đọc thêm (đọc block indirect để lấy địa chỉ), rồi 1 lần đọc block dữ liệu = tổng **2 lần đĩa**. Double indirect = 3 lần, triple = 4 lần. Direct = 1 lần (nhanh nhất).

⚠ **Lỗi thường gặp:** Nhiều người nhầm "inode lưu tên file". Không — tên file lưu trong directory entry. Inode chỉ có **số** (inode number), metadata, và con trỏ block. Tên file có thể thay đổi (đổi tên, hard link) mà không ảnh hưởng inode.

📝 **Tóm tắt mục 3:**
- Inode = cấu trúc dữ liệu lưu metadata + con trỏ block.
- 12 direct + single/double/triple indirect → file tối đa ~4 TB.
- Mỗi level indirect = thêm 1 lần truy cập đĩa.

---

## 4. Ba chiến lược cấp phát block

### 4.1. Cấp phát liền kề (Contiguous Allocation)

💡 **Trực giác:** Toàn bộ dữ liệu của file nằm trong **chuỗi block liên tiếp** trên đĩa. Inode chỉ cần lưu: block đầu tiên + số lượng block.

**Ví dụ:** File "report.pdf" 5 block: bắt đầu ở block 40, chiếm block 40, 41, 42, 43, 44.

**Truy cập block thứ k:** `địa chỉ = block_đầu + k` → 1 phép tính, 1 lần truy cập đĩa. **Cực nhanh**.

**Ưu điểm:**
- Đọc tuần tự rất nhanh (các block liền nhau → ít di chuyển đầu đọc).
- Hỗ trợ random access dễ dàng: `block_đầu + k`.

**Nhược điểm:**
- **Phân mảnh ngoài (external fragmentation)**: sau nhiều create/delete, xuất hiện các lỗ nhỏ không đủ chỗ cho file lớn.
- **Không mở rộng được**: nếu file cần thêm block nhưng block tiếp theo đã bị chiếm → phải copy toàn bộ file sang chỗ mới.
- Phải biết trước kích thước file khi tạo — không phù hợp với file tăng dần.

**Dùng ở đâu:** Đĩa CD/DVD-ROM (read-only, kích thước cố định), filesystem cổ điển.

### 4.2. Cấp phát liên kết (Linked Allocation)

💡 **Trực giác:** File là một **danh sách liên kết (linked list)** các block. Mỗi block chứa dữ liệu + con trỏ tới block tiếp theo. Inode lưu địa chỉ block đầu (và block cuối cho ghi hiệu quả).

**Ví dụ:** File 3 block: block 100 → block 47 → block 233 → NULL.

```
Block 100: [dữ liệu...][next: 47]
Block 47:  [dữ liệu...][next: 233]
Block 233: [dữ liệu...][next: NULL]
```

**Truy cập block thứ k:** Phải duyệt từ đầu: đọc block 0, theo next → block 1, theo next → ... → block k. **Cần k+1 lần truy cập đĩa cho random access**. Vd block thứ 100 → 101 lần đọc đĩa!

**Ưu điểm:**
- Không phân mảnh ngoài: block có thể nằm bất kỳ đâu.
- File dễ dàng mở rộng: thêm block mới vào cuối linked list.

**Nhược điểm:**
- **Random access chậm**: O(k) lần đọc đĩa.
- Mỗi block "tốn" một phần để lưu con trỏ next (thường 4 bytes/block).
- **Độ tin cậy thấp**: một con trỏ bị hỏng → mất hết dữ liệu từ đó trở đi.

**FAT (File Allocation Table):** Biến thể của linked allocation — con trỏ next không lưu trong block mà lưu tập trung trong một bảng FAT. Cải thiện độ tin cậy, giảm fragmentation trong đọc FAT. Dùng trong USB drives, thẻ nhớ.

### 4.3. Cấp phát chỉ mục (Indexed Allocation — inode)

💡 **Trực giác:** Thay vì chuỗi con trỏ nằm rải rác trong các block, gom tất cả con trỏ vào **một block chỉ mục (index block)**. Inode trỏ đến index block; index block chứa địa chỉ của tất cả block dữ liệu.

Đây chính xác là cơ chế inode với direct + indirect pointers ở mục 3.

**Ưu điểm:**
- **Random access nhanh**: truy cập block thứ k = 1-2 lần đọc (direct) hoặc 2-4 lần (indirect).
- Không phân mảnh ngoài.
- File dễ mở rộng.

**Nhược điểm:**
- Với file nhỏ: vẫn tốn ít nhất 1 inode block + index block dù file chỉ có 1-2 block dữ liệu.
- Overhead nhiều lần đọc với triple indirect.

**So sánh tổng hợp:**

| Tiêu chí | Liền kề | Liên kết | Chỉ mục (inode) |
|---------|---------|---------|-----------------|
| Sequential read | **Tốt nhất** | Tốt | Tốt |
| Random access | **Tốt nhất** | Tệ nhất (O(k) disk I/O) | Tốt (1-4 disk I/O) |
| Phân mảnh ngoài | **Có** | Không | Không |
| Mở rộng file | Khó | Dễ | Dễ |
| Độ tin cậy | Cao | Thấp (chain corruption) | Cao |
| Thực tế dùng | CD-ROM | FAT (USB/SD) | **ext4, NTFS, APFS** |

🔁 **Dừng lại tự kiểm tra:**

File 10 block. Truy cập block thứ 7 tốn bao nhiêu lần đọc đĩa với mỗi phương pháp? (block size 4 KB, inode pointer size 4 bytes, 12 direct pointers)

<details>
<summary>Đáp án</summary>

- **Liền kề:** 1 lần (tính `block_đầu + 7`, đọc trực tiếp).
- **Liên kết:** 8 lần (đọc block 0 → 1 → 2 → ... → 7, theo 8 bước).
- **Chỉ mục (inode):** Block 7 < 12 → thuộc direct pointers → **1 lần** (đọc trực tiếp từ địa chỉ trong inode, inode đã được cache).

Nếu block thứ 13 (nằm ngoài 12 direct):
- Liền kề: 1 lần.
- Liên kết: 14 lần.
- Chỉ mục: 2 lần (1 đọc single indirect block + 1 đọc data block).
</details>

📝 **Tóm tắt mục 4:**
- Liền kề: nhanh nhưng phân mảnh, khó mở rộng — dùng ít.
- Liên kết: linh hoạt nhưng random access chậm — FAT là biến thể thực tế.
- Chỉ mục (inode): tốt nhất thực tế — ext4, NTFS, APFS dùng inode.

---

## 5. Quản lý không gian trống (Free Space Management)

### 5.1. Bitmap (Bit vector)

**Cơ chế:** Một mảng bit, mỗi bit tương ứng với một block trên đĩa:
- `0` = block trống (free).
- `1` = block đã dùng (used).

**Ví dụ:** Đĩa 16 block, bitmap: `1110 1011 0000 1100`

```
Block:  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
Bit:    1  1  1  0  1  0  1  1  0  0  0  0  1  1  0  0
Status: U  U  U  F  U  F  U  U  F  F  F  F  U  U  F  F
```
(U = used, F = free)

Block trống: 3, 5, 8, 9, 10, 11, 14, 15.

**Tìm block trống:** Scan bitmap để tìm bit 0 đầu tiên. CPU hiện đại có lệnh bit manipulation nhanh (ví dụ `__builtin_ctz` trong C) → tìm rất nhanh.

**Ưu điểm:**
- Compact: 1 bit / block (8 block / 1 byte).
- Dễ tìm N block liên tiếp (scan bit pattern).
- Hỗ trợ phân bổ clustered (block gần nhau → giảm seek).

**Nhược điểm:**
- Cần toàn bộ bitmap trong bộ nhớ để tìm kiếm nhanh.
- Đĩa 1 TB với 4 KB block = 256 triệu block → bitmap 256 MB.

### 5.2. Free List (Danh sách liên kết block trống)

**Cơ chế:** Tất cả block trống được nối thành một danh sách liên kết. Header của filesystem lưu địa chỉ block trống đầu tiên; mỗi block trống chứa địa chỉ block trống tiếp theo.

**Ưu điểm:** Không tốn bộ nhớ (danh sách nằm trên đĩa trong chính block trống).

**Nhược điểm:**
- Tìm block liên tiếp rất khó.
- Mỗi lần cấp phát phải đọc đĩa để lấy block tiếp theo.
- Ít dùng trong thực tế.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"ext4 dùng cái nào?"* — ext4 dùng **bitmap** cho block và inode, cộng thêm **block group** để tổ chức bitmap thành nhiều vùng nhỏ, tăng locality.
- *"NTFS thì sao?"* — NTFS dùng **$Bitmap** (file đặc biệt chứa bitmap toàn bộ volume).

📝 **Tóm tắt mục 5:**
- Bitmap: compact, hỗ trợ tìm block liên tiếp, cần cache trong RAM.
- Free list: đơn giản, không cần RAM, nhưng chậm và khó tìm chuỗi liên tiếp.
- Thực tế: bitmap + block groups (ext4), $Bitmap (NTFS).

---

## Bài tập

**Bài 1.** Inode có 12 direct pointers, 1 single indirect, 1 double indirect. Block size = 4 KB, con trỏ = 4 bytes.
  - (a) Tính số block tối đa file có thể có.
  - (b) Tính kích thước file tối đa (bytes).
  - (c) Byte thứ 5,000,000 nằm ở block nào? Là direct hay indirect? Tốn bao nhiêu lần đọc đĩa?

**Bài 2.** Filesystem có 100 block, bitmap: `1111 1100 0000 0000 1111 0000 ...` (và 0 tiếp theo đến block 100). Tìm tất cả block trống. OS muốn cấp phát 3 block liền nhau — block nào có thể dùng?

**Bài 3.** File 5 block dùng linked allocation: block 50 → 20 → 80 → 5 → 30 → NULL. Truy cập byte thứ 16,384 (byte đầu tiên của block thứ 4). Liệt kê tất cả các lần đọc đĩa cần thiết.

**Bài 4.** So sánh: file 1 block vs file 15 block với inode-based allocation (block size 4 KB, 12 direct pointers). Overhead (số block dùng cho metadata/con trỏ) là bao nhiêu ở mỗi trường hợp?

**Bài 5.** Vì sao hard link (`ln a b`) hoạt động được trong cùng filesystem nhưng không hoạt động được qua hai filesystem khác nhau (ví dụ hard link từ `/home` sang `/mnt/usb`)?

## Lời giải chi tiết

### Bài 1

**(a) Số block tối đa:**
- Block size = 4096 bytes, con trỏ = 4 bytes → mỗi indirect block chứa `4096 ÷ 4 = 1024` con trỏ.
- Direct: 12 block.
- Single indirect: 1024 block.
- Double indirect: 1024 × 1024 = 1,048,576 block.
- **Tổng: 12 + 1,024 + 1,048,576 = 1,049,612 block**.

**(b) Kích thước tối đa:**
`1,049,612 × 4,096 bytes = 4,299,161,600 bytes ≈ 4.00 GB`.

**(c) Byte thứ 5,000,000:**
- Block chứa byte này: `⌊5,000,000 ÷ 4,096⌋ = 1220` (block thứ 1220, đánh số từ 0).
- 12 direct (0..11), single indirect (12..1035), double indirect (1036..1,049,611).
- Block 1220 > 1035 → nằm trong **double indirect**.
- Chỉ số trong double indirect: `1220 - 12 - 1024 = 184`.
- Cách đọc: (1) đọc block double_indirect → (2) đọc block single_indirect thứ `⌊184 ÷ 1024⌋ = 0` (block 0 của double) → (3) lấy con trỏ thứ `184 mod 1024 = 184` → (4) đọc block dữ liệu.
- **Tổng: 3 lần đọc đĩa** (double block → single block → data block; inode giả sử đã cached).
- Offset trong block: `5,000,000 mod 4,096 = 5,000,000 - 1220 × 4,096 = 5,000,000 - 4,997,120 = 2,880 bytes`.

### Bài 2

Bitmap: `1111 1100 0000 0000 1111 0000 ...` (bits 0-3: used, 4-7: used, 8-15: **free**, 16-19: used, 20-23: **free**, 24-99: free).

Block trống: 8, 9, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25, ..., 99.

3 block liền nhau có thể dùng: block 8-9-10, 9-10-11, 10-11-12, 11-12-13, 12-13-14, 13-14-15, 20-21-22, 21-22-23, 22-23-24, ... Nhiều lựa chọn. Thông thường OS chọn **block đầu tiên của chuỗi liên tiếp** = block 8, 9, 10.

### Bài 3

Block thứ 4 (đánh số từ 0) trong linked allocation: cần duyệt 5 bước:
1. Đọc block 50 (block 0, đọc content để lấy next = 20).
2. Đọc block 20 (block 1, next = 80).
3. Đọc block 80 (block 2, next = 5).
4. Đọc block 5 (block 3, next = 30).
5. Đọc block 30 (block 4 → đây là block cần).

**Tổng: 5 lần đọc đĩa** để truy cập block thứ 4.

Nếu block thứ 100 → phải đọc 101 lần. Đây là nhược điểm nghiêm trọng của linked allocation.

### Bài 4

**File 1 block (≤ 4 KB):**
- Block dữ liệu: 1.
- Overhead: 1 inode (chứa 12 direct + metadata). Inode thường chiếm 128 hoặc 256 bytes (phần của block inode table, không phải data block riêng).
- **Không tốn thêm block nào cho con trỏ** (direct pointer nằm trong inode).

**File 15 block:**
- 12 block đầu: dùng direct pointer trong inode (không overhead thêm block).
- Block 12, 13, 14: cần 1 **single indirect block** (1 block dùng để lưu 1024 con trỏ, chỉ dùng 3).
- **Overhead: 1 block** (single indirect block) cho file 15 block.

**Kết luận:** File nhỏ (≤ 12 block) không tốn overhead block. File > 12 block tốn thêm 1 indirect block cho single indirect.

### Bài 5

Hard link hoạt động bằng cách tạo thêm **directory entry** trỏ về **cùng inode number**. Inode number chỉ có ý nghĩa **trong cùng một filesystem** — mỗi filesystem có bảng inode riêng, đánh số từ đầu.

Nếu hard link qua filesystem khác: `/home` (ext4, inode 1024) và `/mnt/usb` (FAT32, không có inode hệ thống). Inode số 1024 trong ext4 ≠ "inode 1024" trong FAT32. Không có cách nào để một filesystem trỏ đến inode của filesystem khác.

**Symbolic link (ln -s)** hoạt động được qua filesystem vì nó không lưu inode number mà lưu **path string** (ví dụ `/home/user/a.txt`) — path có thể trỏ đến bất kỳ filesystem nào.

## Liên kết và bài tiếp theo

- [Lesson 05 — Thuật toán thay trang](../lesson-05-page-replacement/) — khi file được đọc vào RAM, paging quản lý nó
- [Lesson 07 — I/O & Disk Scheduling](../lesson-07-io-disk-scheduling/) — filesystem giao tiếp với đĩa vật lý thế nào
- [Lesson 08 — Lưu trữ hiện đại](../lesson-08-modern-storage/) — journaling, SSD, RAID
- [visualization.html](./visualization.html) — trình duyệt inode và block interactive

## 📝 Tổng kết Lesson 06

- **File** = trừu tượng hoá lưu trữ: tên (trong directory) + metadata (trong inode) + dữ liệu (trong block).
- **Directory** = file đặc biệt chứa bảng tên → inode number. Path resolution đi từng component.
- **Inode** = cấu trúc metadata + 12 direct + single/double/triple indirect pointers → file tối đa ~4 TB (4 KB block, 4-byte pointer).
- **3 chiến lược cấp phát:** liền kề (nhanh, phân mảnh), liên kết (linh hoạt, random access chậm), chỉ mục/inode (tốt nhất — dùng trong ext4, NTFS, APFS).
- **Free space:** bitmap (compact, hỗ trợ cấp phát liên tiếp) hoặc free list (đơn giản, không cần RAM).
- **Hard link:** nhiều tên → cùng inode; chỉ hoạt động trong cùng filesystem.
