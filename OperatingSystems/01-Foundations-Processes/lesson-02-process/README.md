# Lesson 02 — Tiến trình (Process)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được **tiến trình (process)** là gì: sự khác biệt giữa "chương trình trên đĩa" và "chương trình đang chạy".
- Mô tả cấu trúc **không gian địa chỉ (address space)**: text, data, heap, stack — mỗi vùng chứa gì.
- Liệt kê các trường trong **PCB (Process Control Block)** và giải thích tại sao cần lưu những thông tin đó.
- Vẽ và mô tả **máy trạng thái (state machine)** của tiến trình: new → ready → running → waiting → terminated.
- Giải thích `fork()` tạo bản sao, `exec()` thay chương trình — phân biệt hai syscall này rõ ràng.
- Mô tả **context switch**: kernel lưu/khôi phục trạng thái CPU, chi phí là gì.

## Kiến thức tiền đề

- [Lesson 01 — Kernel & System Call](../lesson-01-os-kernel-syscall/): user mode vs kernel mode, syscall, cơ chế trap — cần hiểu trước.

---

## 1. Tiến trình là gì?

### 1.1. Chương trình vs Tiến trình

💡 **Trực giác — Analogy công thức nấu ăn:**
Một **chương trình** giống như công thức nấu phở được in trong sách — nó là văn bản tĩnh, nằm yên trên đĩa, không thay đổi. Một **tiến trình** giống như người đầu bếp đang *thực sự nấu* phở theo công thức đó — có nồi nước đang sôi, nguyên liệu đang được xử lý, trạng thái liên tục thay đổi. Cùng một công thức có thể có 5 đầu bếp nấu đồng thời → 5 tiến trình chạy từ cùng một binary.

**Định nghĩa hình thức:** Tiến trình = chương trình đang thực thi + toàn bộ ngữ cảnh của nó:
- Nội dung chương trình (code) đã được nạp vào RAM.
- Dữ liệu hiện tại (biến, heap).
- Trạng thái CPU (giá trị các thanh ghi, program counter).
- Tài nguyên đang giữ (file descriptor, socket, semaphore...).

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Mở 3 cửa sổ trình duyệt Chrome — đó là 3 tiến trình hay 1?"* — Phụ thuộc kiến trúc. Chrome dùng kiến trúc multi-process: mỗi tab có thể là tiến trình riêng (để một tab crash không kéo cả browser xuống). Có thể thấy bằng `ps aux | grep chrome` — rất nhiều process cùng binary `/usr/bin/chrome`.
- *"Khác gì thread?"* — Thread chia sẻ address space với các thread khác trong cùng process; process có address space riêng. Lesson 03 sẽ đi sâu.

### 1.2. PID — Process ID

Mỗi tiến trình có một **PID (Process Identifier)** — số nguyên dương duy nhất trong hệ thống tại một thời điểm. Kernel dùng PID để theo dõi và quản lý tiến trình.

Ví dụ cụ thể trên Linux:
<svg viewBox="0 0 430 188" style="max-width:430px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Cây tiến trình: PID 1 systemd là cha của mọi process; kthreadd PID 2; bash PID 1234 fork ra ls PID 1235">
  <defs></defs>
  <line x1="215.0" y1="47.0" x2="120.0" y2="79.0" stroke="#1a202c" stroke-width="1.5"/>
  <rect x="57.0" y="79.0" width="126.0" height="30.0" rx="7" fill="#f1f5f9" fill-opacity="1" stroke="#94a3b8" stroke-width="1.8"/>
  <text x="120.0" y="98.0" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="700">PID 2 — kthreadd</text>
  <line x1="215.0" y1="47.0" x2="310.0" y2="79.0" stroke="#1a202c" stroke-width="1.5"/>
  <line x1="310.0" y1="109.0" x2="310.0" y2="141.0" stroke="#1a202c" stroke-width="1.5"/>
  <rect x="222.5" y="141.0" width="175.0" height="30.0" rx="7" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="1.8"/>
  <text x="310.0" y="160.0" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">PID 1235 — ls -la /home</text>
  <rect x="250.5" y="79.0" width="119.0" height="30.0" rx="7" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="1.8"/>
  <text x="310.0" y="98.0" fill="#7c3aed" font-size="11" text-anchor="middle" font-weight="700">PID 1234 — bash</text>
  <rect x="155.5" y="17.0" width="119.0" height="30.0" rx="7" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="1.8"/>
  <text x="215.0" y="36.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">PID 1 — systemd</text>
</svg>

Lệnh `getpid()` (syscall số 39) trả về PID của tiến trình hiện tại. `getppid()` trả về PID của tiến trình cha.

📝 **Tóm tắt mục 1:**
- Chương trình = file tĩnh trên đĩa. Tiến trình = chương trình đang chạy + ngữ cảnh.
- Nhiều tiến trình có thể chạy từ cùng một file binary.
- Mỗi tiến trình có PID duy nhất.

---

## 2. Không gian địa chỉ (Address Space)

### 2.1. Bộ nhớ ảo và bố cục

💡 **Trực giác — Analogy căn hộ:**
Mỗi tiến trình được OS cấp một "căn hộ ảo" riêng — không gian địa chỉ ảo 64-bit (trên máy 64-bit có thể lên tới 128 TB). Tiến trình nghĩ rằng nó "sở hữu" toàn bộ căn hộ này, nhưng thực ra nhiều phòng chưa được lắp sàn (chưa có RAM thật phía sau) — chỉ khi tiến trình bước vào phòng đó (truy cập địa chỉ đó) kernel mới "lát gạch" (cấp trang RAM thật).

Bố cục điển hình của không gian địa chỉ trên Linux x86-64 (địa chỉ tăng từ dưới lên):

<svg viewBox="0 0 620 306" style="max-width:620px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Bố cục bộ nhớ tiến trình từ địa chỉ cao xuống thấp: Kernel space, Stack tăng xuống, vùng trống, Heap tăng lên, BSS, Data, Text">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="arb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1d4ed8"/></marker><marker id="arg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#15803d"/></marker><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="aro" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="arp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <text x="20.0" y="20.0" fill="#475569" font-size="10" text-anchor="start" font-weight="700">Địa chỉ cao</text>
  <rect x="20.0" y="28.0" width="330.0" height="40.0" rx="0" fill="#f1f5f9" fill-opacity="1" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="185.0" y="45.0" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="700">Kernel space</text>
  <text x="185.0" y="59.0" fill="#475569" font-size="9" text-anchor="middle">không truy cập được từ user mode (địa chỉ từ 0x8000…)</text>
  <rect x="20.0" y="68.0" width="330.0" height="40.0" rx="0" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="185.0" y="85.0" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">Stack ↓ (tăng xuống dưới)</text>
  <text x="185.0" y="99.0" fill="#475569" font-size="9" text-anchor="middle">biến cục bộ, địa chỉ trả về, args</text>
  <text x="358.0" y="92.0" fill="#475569" font-size="10" text-anchor="start">← rsp trỏ đến đây</text>
  <rect x="20.0" y="108.0" width="330.0" height="40.0" rx="0" fill="#f1f5f9" fill-opacity="1" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="185.0" y="125.0" fill="#475569" font-size="11" text-anchor="middle" font-weight="700">vùng trống</text>
  <text x="185.0" y="139.0" fill="#475569" font-size="9" text-anchor="middle">cho stack và heap mở rộng, OS cấp khi cần</text>
  <rect x="20.0" y="148.0" width="330.0" height="40.0" rx="0" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="1.5"/>
  <text x="185.0" y="165.0" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">Heap ↑ (tăng lên trên)</text>
  <text x="185.0" y="179.0" fill="#475569" font-size="9" text-anchor="middle">bộ nhớ cấp phát động</text>
  <text x="358.0" y="172.0" fill="#475569" font-size="10" text-anchor="start">← malloc/free quản lý</text>
  <rect x="20.0" y="188.0" width="330.0" height="30.0" rx="0" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="1.5"/>
  <text x="185.0" y="208.0" fill="#b45309" font-size="11" text-anchor="middle" font-weight="700">BSS segment</text>
  <text x="358.0" y="207.0" fill="#475569" font-size="10" text-anchor="start">← biến global chưa khởi tạo</text>
  <rect x="20.0" y="218.0" width="330.0" height="30.0" rx="0" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="1.5"/>
  <text x="185.0" y="238.0" fill="#b45309" font-size="11" text-anchor="middle" font-weight="700">Data segment</text>
  <text x="358.0" y="237.0" fill="#475569" font-size="10" text-anchor="start">← biến global đã khởi tạo</text>
  <rect x="20.0" y="248.0" width="330.0" height="30.0" rx="0" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="1.5"/>
  <text x="185.0" y="268.0" fill="#7c3aed" font-size="11" text-anchor="middle" font-weight="700">Text segment (code)</text>
  <text x="358.0" y="267.0" fill="#475569" font-size="10" text-anchor="start">← lệnh máy (read-only)</text>
  <text x="20.0" y="294.0" fill="#475569" font-size="10" text-anchor="start" font-weight="700">Địa chỉ thấp</text>
</svg>

### 2.2. Mỗi vùng chứa gì?

**Text segment (đoạn mã):**
- Chứa: các lệnh máy (machine code) đã được biên dịch.
- Thuộc tính: **read-only** + executable. OS làm read-only để ngăn chương trình tự sửa code của mình (bảo mật).
- Chia sẻ: nhiều tiến trình chạy cùng binary có thể dùng chung text segment trong RAM (chỉ một bản sao trong RAM, ánh xạ vào nhiều address space).
- Ví dụ: khi 10 người dùng đều chạy `bash`, chỉ có 1 bản sao code `bash` trong RAM — tiết kiệm RAM đáng kể.

**Data segment:**
- Chứa: biến global và biến static đã được khởi tạo rõ ràng.
- Ví dụ trong C:
  ```c
  int counter = 100;           // → data segment
  static char name[] = "OS";  // → data segment
  ```
- Kích thước cố định, được biết từ lúc biên dịch.

**BSS segment (Block Started by Symbol):**
- Chứa: biến global và biến static chưa được khởi tạo (hoặc khởi tạo = 0).
- Ví dụ: `int arr[10000];` ở global scope → BSS.
- BSS không thực sự lưu dữ liệu trong file binary — chỉ lưu kích thước. Kernel zero-fill khi nạp tiến trình.
- Tiết kiệm dung lượng file binary: khai báo `int mega[1000000];` (4 MB) không làm file binary lớn thêm 4 MB.

**Heap:**
- Chứa: bộ nhớ cấp phát động — `malloc`, `new`, ...
- Tăng theo chiều lên trên (địa chỉ tăng). Kernel mở rộng heap khi cần qua syscall `brk` hoặc `mmap`.
- Quản lý: thư viện C (`libc`) quản lý heap — theo dõi vùng nào đang dùng, vùng nào trống, chống phân mảnh.

**Stack:**
- Chứa: biến cục bộ (local variable), địa chỉ trả về (return address), tham số hàm.
- Tăng theo chiều xuống dưới (địa chỉ giảm). Mỗi lần gọi hàm, một **stack frame** mới được push.
- Kích thước tối đa mặc định: 8 MB trên Linux (có thể thay đổi qua `ulimit -s`). Vượt quá → **stack overflow** → segfault.
- Ví dụ walk-through (hàm đệ quy `factorial(5)`):
<svg viewBox="0 0 690 238" style="max-width:690px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đệ quy factorial(5): push frame n=5 xuống n=1 (base case trả 1), rồi pop ngược nhân dần lên 120">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="arb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1d4ed8"/></marker><marker id="arg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#15803d"/></marker><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="aro" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="arp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <rect x="20.0" y="16.0" width="200.0" height="32.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="120.0" y="35.7" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">gọi factorial(5) — push n=5</text>
  <line x1="60.0" y1="50.0" x2="98.0" y2="72.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="60.0" y="56.0" width="200.0" height="32.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="160.0" y="75.7" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">gọi factorial(4) — push n=4</text>
  <line x1="100.0" y1="90.0" x2="138.0" y2="112.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="100.0" y="96.0" width="200.0" height="32.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="200.0" y="115.7" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">gọi factorial(3) — push n=3</text>
  <line x1="140.0" y1="130.0" x2="178.0" y2="152.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="140.0" y="136.0" width="200.0" height="32.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="240.0" y="155.7" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">gọi factorial(2) — push n=2</text>
  <line x1="180.0" y1="170.0" x2="218.0" y2="192.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="180.0" y="176.0" width="200.0" height="32.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="280.0" y="195.7" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">gọi factorial(1) — push n=1</text>
  <rect x="420.0" y="176.0" width="190.0" height="32.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="515.0" y="195.7" fill="#15803d" font-size="10" text-anchor="middle" font-weight="700">trả về 1 — pop n=1</text>
  <line x1="460.0" y1="174.0" x2="498.0" y2="152.0" stroke="#15803d" stroke-width="1.8" marker-end="url(#arg)"/>
  <rect x="380.0" y="136.0" width="190.0" height="32.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="475.0" y="155.7" fill="#15803d" font-size="10" text-anchor="middle" font-weight="700">trả về 2 — pop n=2</text>
  <line x1="420.0" y1="134.0" x2="458.0" y2="112.0" stroke="#15803d" stroke-width="1.8" marker-end="url(#arg)"/>
  <rect x="340.0" y="96.0" width="190.0" height="32.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="435.0" y="115.7" fill="#15803d" font-size="10" text-anchor="middle" font-weight="700">trả về 6 — pop n=3</text>
  <line x1="380.0" y1="94.0" x2="418.0" y2="72.0" stroke="#15803d" stroke-width="1.8" marker-end="url(#arg)"/>
  <rect x="300.0" y="56.0" width="190.0" height="32.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="395.0" y="75.7" fill="#15803d" font-size="10" text-anchor="middle" font-weight="700">trả về 24 — pop n=4</text>
  <line x1="340.0" y1="54.0" x2="378.0" y2="32.0" stroke="#15803d" stroke-width="1.8" marker-end="url(#arg)"/>
  <rect x="260.0" y="16.0" width="190.0" height="32.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="355.0" y="35.7" fill="#15803d" font-size="10" text-anchor="middle" font-weight="700">trả về 120 — pop n=5</text>
  <text x="240.0" y="222.0" fill="#1d4ed8" font-size="10" text-anchor="middle" font-weight="700">PHÌNH: push 5 frame xuống base case</text>
  <text x="500.0" y="222.0" fill="#15803d" font-size="10" text-anchor="middle" font-weight="700">XẸP: pop dần, nhân ngược lên</text>
</svg>
  Mỗi frame chiếm ~32-64 byte. Đệ quy 1 triệu cấp → 32-64 MB stack → overflow.

⚠ **Lỗi thường gặp — Nhầm "địa chỉ ảo = địa chỉ RAM thật":** Các địa chỉ trong code C/Go (như `&variable = 0xc000014090`) là địa chỉ **ảo**. MMU (Memory Management Unit) trong CPU dịch địa chỉ ảo sang địa chỉ vật lý thật trong RAM mỗi khi truy cập. Hai tiến trình khác nhau có thể đều có biến ở địa chỉ ảo `0x7fff1000` nhưng thực ra chúng trỏ đến 2 vùng RAM hoàn toàn khác nhau.

🔁 **Dừng lại tự kiểm tra:**

Khai báo `int buffer[1024 * 1024];` bên trong hàm `main()`. Nó nằm ở vùng nào của address space? Nếu chuyển ra global scope (ngoài mọi hàm), nó nằm ở đâu?

<details>
<summary>Đáp án</summary>
- Khai báo bên trong hàm `main()`: đây là biến cục bộ → nằm trên **Stack**. 1024×1024 int × 4 bytes = 4 MB → rất có thể gây stack overflow (giới hạn mặc định 8 MB trên Linux).
- Khai báo ở global scope (chưa khởi tạo): nằm trong **BSS**. Không gây stack overflow vì BSS là vùng riêng, được OS cấp RAM theo yêu cầu.
</details>

📝 **Tóm tắt mục 2:**
- Address space = không gian địa chỉ ảo riêng của mỗi process: text (code) → data → BSS → heap (↑) → ... → stack (↓).
- Text: read-only, có thể chia sẻ giữa các process cùng binary.
- Heap: `malloc` quản lý, tăng lên. Stack: biến cục bộ, tăng xuống, giới hạn 8 MB.
- Địa chỉ trong code là địa chỉ ảo — MMU dịch sang địa chỉ vật lý thật.

---

## 3. PCB — Process Control Block

### 3.1. PCB là gì?

**PCB (Process Control Block)** là cấu trúc dữ liệu trong kernel lưu trữ **toàn bộ thông tin** về một tiến trình. Khi kernel cần biết bất kỳ điều gì về một process, nó tra cứu PCB của process đó.

💡 **Trực giác:** PCB giống như hồ sơ nhân viên trong phòng HR — chứa mọi thông tin cần thiết (tên, chức vụ, phòng ban, dự án đang làm, trạng thái làm việc). Khi cần, manager tra hồ sơ thay vì hỏi trực tiếp.

### 3.2. Nội dung PCB

| Trường | Nội dung | Ví dụ |
|--------|----------|-------|
| PID | Process ID — định danh duy nhất | 1234 |
| Trạng thái | Running / Ready / Waiting / Zombie | READY |
| Program Counter | Địa chỉ lệnh tiếp theo cần thực thi | 0x401850 |
| CPU Registers | Giá trị tất cả thanh ghi CPU tại thời điểm lưu | rax=7, rbx=0, rsp=0x7fff... |
| Memory info | Base và giới hạn các vùng nhớ, bảng trang | page_table_ptr=0x... |
| Open files | Bảng file descriptor (fd table) | fd[0]=stdin, fd[1]=stdout, fd[3]=file.txt |
| Parent PID | PID của tiến trình cha | 1230 (bash) |
| Priority | Mức độ ưu tiên lập lịch | 0 (normal) |
| Accounting | CPU time đã dùng, wall time, I/O count | cpu=1.2s, io=50 ops |
| Signal mask | Tín hiệu (signal) nào đang bị chặn | SIGTERM=blocked |

**Tại sao cần lưu CPU registers?** Khi kernel quyết định tạm ngừng tiến trình A để chạy tiến trình B (context switch), nó phải lưu toàn bộ trạng thái CPU (tất cả thanh ghi) của A vào PCB của A. Sau này khi A được chạy lại, kernel khôi phục các giá trị đó — A tiếp tục từ chỗ bị dừng mà không hay biết.

**Ví dụ số:** PCB trong Linux kernel (`task_struct`) có kích thước ~7 KB. Hệ thống chạy 1000 tiến trình → 7 MB chỉ để lưu PCB — nhỏ không đáng kể so với tổng RAM.

📝 **Tóm tắt mục 3:**
- PCB = hồ sơ của tiến trình trong kernel, chứa PID, trạng thái, PC, registers, bảng trang, fd table.
- PCB cho phép kernel context switch: lưu trạng thái CPU vào PCB khi dừng, khôi phục từ PCB khi chạy lại.

---

## 4. Vòng đời Tiến trình — Máy Trạng Thái

### 4.1. Các trạng thái

💡 **Trực giác — Analogy nhân viên văn phòng:**
Một nhân viên có thể: đang được tuyển dụng (new), chờ bàn làm việc trống (ready), đang làm việc (running), chờ in tài liệu (waiting), hoặc đã rời công ty (terminated). OS quản lý tiến trình y hệt vậy.

<svg viewBox="0 0 660 224" style="max-width:660px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Máy trạng thái process: new → (fork) ready → (scheduler) running; running bị preempt về ready hoặc chờ I/O sang waiting rồi về ready; exit sang terminated/zombie">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker><marker id="arb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1d4ed8"/></marker><marker id="arg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#15803d"/></marker><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker><marker id="aro" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#b45309"/></marker><marker id="arp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7c3aed"/></marker></defs>
  <rect x="16.0" y="60.0" width="80.0" height="36.0" rx="8" fill="#f1f5f9" fill-opacity="1" stroke="#94a3b8" stroke-width="2"/>
  <text x="56.0" y="81.8" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="700">new</text>
  <line x1="98.0" y1="78.0" x2="196.0" y2="78.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <text x="147.0" y="71.0" fill="#475569" font-size="10" text-anchor="middle">fork()</text>
  <rect x="198.0" y="60.0" width="90.0" height="36.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="243.0" y="81.8" fill="#1d4ed8" font-size="11" text-anchor="middle" font-weight="700">ready</text>
  <line x1="290.0" y1="78.0" x2="428.0" y2="78.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <text x="359.0" y="71.0" fill="#475569" font-size="10" text-anchor="middle">scheduler chọn</text>
  <rect x="430.0" y="60.0" width="100.0" height="36.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="480.0" y="81.8" fill="#15803d" font-size="11" text-anchor="middle" font-weight="700">running</text>
  <path d="M 480.0,98.0 L 480.0,150.0 L 370.0,150.0" fill="none" stroke="#b45309" stroke-width="1.8" marker-end="url(#aro)"/>
  <text x="490.0" y="128.0" fill="#b45309" font-size="10" text-anchor="start">preempt / yield</text>
  <rect x="250.0" y="132.0" width="120.0" height="40.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="310.0" y="148.3" fill="#b45309" font-size="11" text-anchor="middle" font-weight="700">waiting</text>
  <text x="310.0" y="163.3" fill="#475569" font-size="10" text-anchor="middle">chờ I/O, sleep, wait</text>
  <path d="M 250.0,152.0 L 243.0,152.0 L 243.0,98.0" fill="none" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#arb)"/>
  <text x="120.0" y="140.0" fill="#1d4ed8" font-size="9" text-anchor="start">I/O hoàn thành /</text>
  <text x="120.0" y="152.0" fill="#1d4ed8" font-size="9" text-anchor="start">event xảy ra</text>
  <path d="M 530.0,78.0 L 560.0,78.0 L 560.0,190.0 L 500.0,190.0" fill="none" stroke="#dc2626" stroke-width="1.8" marker-end="url(#arr)"/>
  <text x="568.0" y="140.0" fill="#dc2626" font-size="10" text-anchor="start">exit() / lỗi</text>
  <rect x="340.0" y="172.0" width="160.0" height="36.0" rx="8" fill="#fee2e2" fill-opacity="1" stroke="#dc2626" stroke-width="2"/>
  <text x="420.0" y="193.8" fill="#dc2626" font-size="11" text-anchor="middle" font-weight="700">terminated / zombie</text>
</svg>

**Giải thích từng trạng thái:**

- **New (mới tạo):** Tiến trình vừa được `fork()` tạo ra, OS đang cấp phát tài nguyên (PCB, address space). Chưa vào hàng chờ scheduler.

- **Ready (sẵn sàng):** Tiến trình có đủ tài nguyên, đang chờ CPU. Nhiều process ở trạng thái này cùng lúc → scheduler phải chọn ai được chạy (Lesson 04).

- **Running (đang chạy):** Tiến trình đang được CPU thực thi. Trên hệ thống 1 core, **chỉ 1 process** có thể ở trạng thái này tại một thời điểm. Trên N core, tối đa N process chạy đồng thời.

- **Waiting (đang chờ — còn gọi là Blocked):** Tiến trình đang chờ sự kiện bên ngoài: I/O hoàn thành (đọc đĩa, nhận network packet), timer hết, tiến trình con kết thúc. Trong thời gian này CPU được nhường cho process khác — đây là lý do tại sao máy tính có thể "làm nhiều việc cùng lúc" dù chỉ có 1 core.

- **Terminated / Zombie:** Tiến trình đã `exit()`. Tài nguyên (RAM, fd) đã được giải phóng, nhưng PCB vẫn còn trong bảng tiến trình để tiến trình cha có thể `wait()` nhận exit code. Sau khi cha `wait()`, zombie được xoá hoàn toàn.

### 4.2. Walk-through ví dụ cụ thể

Giả sử tiến trình P (PID 1234) gọi `read(fd, buf, 4096)` để đọc từ ổ đĩa:

| Thời gian | Sự kiện | Trạng thái P |
|-----------|---------|--------------|
| t=0 | P đang thực thi code | Running |
| t=1 ms | P gọi syscall `read(fd, buf, 4096)` | Running (đang trong kernel) |
| t=1.1 ms | Kernel gửi lệnh đọc cho disk controller, P chờ | **Waiting** |
| t=1.1 ms | Scheduler chọn process Q chạy thay | (P vẫn Waiting, Q Running) |
| t=8 ms | Disk controller báo hiệu xong (interrupt) | → |
| t=8.1 ms | Kernel xử lý interrupt, copy data vào buffer của P | → |
| t=8.2 ms | Kernel chuyển P → Ready | **Ready** |
| t=10 ms | Scheduler chọn P chạy lại | **Running** |
| t=10 ms | P tiếp tục từ sau lệnh `read`, data đã có trong buf | Running |

**Nhận xét:** Trong 7 ms đọc đĩa (t=1.1 đến t=8.2), CPU không lãng phí — nó chạy process Q. Đây là cơ chế cho phép hệ thống đạt độ utilization CPU cao dù có nhiều I/O.

⚠ **Lỗi thường gặp — Nhầm "Waiting" với "blocked mãi mãi":** Waiting chỉ có nghĩa process đang chờ sự kiện cụ thể. Khi sự kiện đó xảy ra (I/O xong, timer hết, `SIGCONT`...), process trở về Ready ngay.

🔁 **Dừng lại tự kiểm tra:**

Process A đang Running và gọi `sleep(10)`. Nó chuyển sang trạng thái nào? CPU làm gì trong 10 giây đó?

<details>
<summary>Đáp án</summary>
A chuyển sang **Waiting** — nó đang chờ timer 10 giây hết. CPU không idle mà scheduler chọn các process Ready khác để chạy. Sau 10 giây, timer interrupt đến, kernel đánh dấu A là Ready, scheduler có thể chọn A chạy lại.
</details>

📝 **Tóm tắt mục 4:**
- 5 trạng thái: new → ready → running → waiting → terminated.
- Running → Waiting: gọi I/O hoặc syscall blocking.
- Waiting → Ready: I/O hoàn thành, event xảy ra.
- Running → Ready: bị scheduler preempt hoặc tự yield.
- Zombie: đã exit, cha chưa wait — PCB còn đó để cha nhận exit code.

---

## 5. Fork & Exec — Tạo và Khởi chạy Tiến trình

### 5.1. `fork()` — Sao chép tiến trình

`fork()` là syscall tạo ra một tiến trình con là **bản sao gần như hoàn toàn** của tiến trình cha:
- Address space (text, data, heap, stack) được sao chép.
- Bảng file descriptor được sao chép (con thừa kế các fd của cha).
- PID mới được cấp phát.
- Sau `fork()`, cả cha và con đều tiếp tục thực thi từ lệnh kế tiếp trong code.

**Cách phân biệt cha/con:** `fork()` trả về:
- **Trong tiến trình cha:** PID của con (số dương).
- **Trong tiến trình con:** 0.
- **Nếu lỗi:** -1 (chỉ trong cha, con không được tạo).

**Ví dụ code C:**
```c
pid_t pid = fork();
if (pid == 0) {
    // Đây là tiến trình CON
    printf("Con: PID=%d, PPID=%d\n", getpid(), getppid());
} else if (pid > 0) {
    // Đây là tiến trình CHA
    printf("Cha: PID=%d, con của tao là %d\n", getpid(), pid);
    wait(NULL); // chờ con kết thúc
} else {
    // Lỗi
    perror("fork failed");
}
```

**Walk-through với số cụ thể:**
```
Trước fork():  Process PID=1234 (bash)
               counter = 5

fork() được gọi:
  Kernel tạo Process PID=1235 (con của 1234)
  Sao chép address space: con có biến counter = 5 (bản sao riêng)
  Trả về 1235 cho cha, trả về 0 cho con.

Sau fork() — 2 process độc lập:
  PID=1234 (cha): counter=5, fork() trả về 1235
  PID=1235 (con): counter=5, fork() trả về 0
  
  Nếu con làm counter++: counter của CON = 6
  counter của CHA vẫn = 5 (không ảnh hưởng nhau)
```

**Copy-on-Write (COW):** Để tránh sao chép toàn bộ RAM (có thể rất tốn kém), OS hiện đại dùng kỹ thuật **Copy-on-Write**: ban đầu cha và con *chia sẻ cùng một trang vật lý* nhưng được đánh dấu read-only. Chỉ khi một bên *ghi* vào trang đó, OS mới tạo bản sao riêng. Nếu con gọi `exec()` ngay sau `fork()` (rất phổ biến), không trang nào cần sao chép thật sự.

### 5.2. `exec()` — Thay thế chương trình

`exec()` (thực tế là một họ syscall: `execve`, `execl`, `execvp`, ...) **thay thế hoàn toàn** chương trình đang chạy của tiến trình hiện tại bằng một chương trình mới:
- Kernel nạp binary mới từ ổ đĩa vào address space.
- Text, data, heap, stack cũ bị xoá và thay bằng của chương trình mới.
- PID **không đổi** — đây là cùng tiến trình, chỉ nội dung thay đổi.
- File descriptors được giữ lại (trừ khi fd có cờ `O_CLOEXEC`).

```
PID=1235 trước exec: đang chạy bash (code, stack của bash)
exec("/bin/ls", ["ls", "-la"], envp)
PID=1235 sau exec: đang chạy ls (code, stack hoàn toàn mới)
```

### 5.3. Cặp đôi fork + exec — Pattern chuẩn

Mọi lần bạn gõ lệnh trong shell, pattern fork+exec được thực hiện:

<svg viewBox="0 0 560 470" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Shell chạy ls -la: fork tạo PID 1235, exec thay code bằng /bin/ls, shell wait; ls exit(0), shell nhận exit code và in prompt">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <rect x="90.0" y="14.0" width="380.0" height="44.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="280.0" y="40.2" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">Shell PID=1234 đang chạy — gõ &quot;ls -la&quot;</text>
  <line x1="280.0" y1="60.0" x2="280.0" y2="76.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="90.0" y="78.0" width="380.0" height="44.0" rx="8" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="2"/>
  <text x="280.0" y="104.2" fill="#7c3aed" font-size="12" text-anchor="middle" font-weight="700">fork() → tạo PID=1235 (bản sao shell)</text>
  <line x1="280.0" y1="124.0" x2="280.0" y2="140.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="90.0" y="142.0" width="380.0" height="58.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="280.0" y="167.2" fill="#b45309" font-size="12" text-anchor="middle" font-weight="700">PID=1235: exec(&quot;/bin/ls&quot;, [&quot;ls&quot;,&quot;-la&quot;])</text>
  <text x="280.0" y="183.2" fill="#475569" font-size="11" text-anchor="middle">kernel xóa code shell, nạp /bin/ls vào PID=1235</text>
  <line x1="280.0" y1="202.0" x2="280.0" y2="218.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="90.0" y="220.0" width="380.0" height="44.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="280.0" y="246.2" fill="#b45309" font-size="12" text-anchor="middle" font-weight="700">/bin/ls chạy với PID=1235</text>
  <line x1="280.0" y1="266.0" x2="280.0" y2="282.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="90.0" y="284.0" width="380.0" height="44.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="280.0" y="310.2" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">Shell: wait(1235) — chờ ls xong</text>
  <line x1="280.0" y1="330.0" x2="280.0" y2="346.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="90.0" y="348.0" width="380.0" height="44.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="280.0" y="374.2" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">ls in kết quả, exit(0)</text>
  <line x1="280.0" y1="394.0" x2="280.0" y2="410.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="90.0" y="412.0" width="380.0" height="44.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="280.0" y="438.2" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">wait() trả về exit code=0 → shell in prompt &quot;$&quot;</text>
</svg>

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Vì sao cần 2 bước fork+exec thay vì 1 syscall tạo process từ file?"* — Vì fork cho phép shell **thiết lập môi trường** giữa fork và exec: redirect input/output (`ls > file.txt` → shell `fork()`, con `close(1)`, `open("file.txt")`, rồi `exec("ls")` — ls tự nhiên ghi vào file). Nếu chỉ có một syscall createprocess, cần truyền tất cả cài đặt đó qua tham số phức tạp.
- *"Windows làm thế nào?"* — Windows dùng `CreateProcess()` — một syscall duy nhất thực hiện cả fork+exec+setup trong kernel. Linh hoạt hơn nhưng API phức tạp hơn rất nhiều.
- *"Nếu fork nhưng không exec, con làm gì?"* — Con chạy code giống cha (từ vị trí sau `fork()`). Ví dụ: web server dùng `fork()` để tạo worker process cho mỗi request mà không `exec()` — con kế thừa toàn bộ trạng thái của cha (socket, cấu hình...).

📝 **Tóm tắt mục 5:**
- `fork()`: tạo tiến trình con là bản sao của cha. Cha nhận PID con, con nhận 0. Copy-on-Write tránh sao chép thừa.
- `exec()`: thay thế chương trình của tiến trình hiện tại bằng binary mới. PID không đổi.
- Pattern shell: fork() → (trong con) exec() → (trong cha) wait(). Khoảng giữa fork và exec là nơi setup I/O redirect.

---

## 6. Context Switch

### 6.1. Context switch là gì?

**Context switch (chuyển ngữ cảnh)** là thao tác kernel thực hiện khi quyết định dừng tiến trình A và cho tiến trình B chạy. "Context" ở đây là toàn bộ trạng thái CPU cần thiết để tiến trình tiếp tục chạy.

💡 **Trực giác:** Bạn đang giải bài toán số 3 thì sếp gọi đi họp. Bạn đánh dấu trang, ghi chú "đang làm đến bước 2, biến x=17", rồi đi họp. Sau họp về, bạn đọc ghi chú và tiếp tục — đây là "context switch" của con người.

### 6.2. Từng bước Context Switch

**Giả sử:** Kernel quyết định dừng Process A (đang running) và chạy Process B.

<svg viewBox="0 0 620 548" style="max-width:620px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Context switch: timer interrupt, kernel lưu registers của A vào PCB[A], scheduler chọn B, khôi phục PCB[B], thay page table, B chạy tiếp">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <rect x="95.0" y="14.0" width="430.0" height="44.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="310.0" y="40.2" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">Process A đang running</text>
  <line x1="310.0" y1="60.0" x2="310.0" y2="76.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="95.0" y="78.0" width="430.0" height="44.0" rx="8" fill="#fee2e2" fill-opacity="1" stroke="#dc2626" stroke-width="2"/>
  <text x="310.0" y="104.2" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">Interrupt từ timer (mỗi 1–10 ms)</text>
  <line x1="310.0" y1="124.0" x2="310.0" y2="140.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="95.0" y="142.0" width="430.0" height="44.0" rx="8" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="2"/>
  <text x="310.0" y="168.2" fill="#7c3aed" font-size="12" text-anchor="middle" font-weight="700">CPU nhảy vào kernel interrupt handler (kernel mode)</text>
  <line x1="310.0" y1="188.0" x2="310.0" y2="204.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="95.0" y="206.0" width="430.0" height="58.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="310.0" y="231.2" fill="#b45309" font-size="12" text-anchor="middle" font-weight="700">Lưu registers của A vào PCB[A]</text>
  <text x="310.0" y="247.2" fill="#475569" font-size="11" text-anchor="middle">rip=0x401234 · rsp=0x7fff8000 · rax=42 · … → state=READY</text>
  <line x1="310.0" y1="266.0" x2="310.0" y2="282.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="95.0" y="284.0" width="430.0" height="44.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="310.0" y="310.2" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">Scheduler chọn Process B</text>
  <line x1="310.0" y1="330.0" x2="310.0" y2="346.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="95.0" y="348.0" width="430.0" height="58.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="310.0" y="373.2" fill="#b45309" font-size="12" text-anchor="middle" font-weight="700">Khôi phục registers từ PCB[B]</text>
  <text x="310.0" y="389.2" fill="#475569" font-size="11" text-anchor="middle">rip/rsp/rax ← PCB[B] — quay lại đúng chỗ B dừng → state=RUNNING</text>
  <line x1="310.0" y1="408.0" x2="310.0" y2="424.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="95.0" y="426.0" width="430.0" height="44.0" rx="8" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="2"/>
  <text x="310.0" y="452.2" fill="#7c3aed" font-size="12" text-anchor="middle" font-weight="700">Chuyển address space (thay page table)</text>
  <line x1="310.0" y1="472.0" x2="310.0" y2="488.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="95.0" y="490.0" width="430.0" height="44.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="310.0" y="516.2" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">Quay về user mode — Process B chạy tiếp từ chỗ đã dừng</text>
</svg>

### 6.3. Chi phí Context Switch

Context switch không miễn phí:

| Chi phí | Lý do | Ước tính |
|---------|-------|---------|
| **Direct** | Lưu/khôi phục ~200 byte registers vào RAM | ~1-2 μs |
| **TLB flush** | Thay đổi page table → CPU phải xóa Translation Lookaside Buffer (cache địa chỉ ảo→vật lý) | ~1-5 μs |
| **Cache miss** | B cần dữ liệu khác A → CPU cache (L1/L2/L3) chứa data của A bị vô dụng | ~10-100 μs (cold cache) |

**Tổng:** Một context switch điển hình tốn **1-100 μs** tùy cache state và kiến trúc.

**Ý nghĩa thực tế:**
- Hệ thống với timer 10 ms và context switch 1 μs → overhead 0.01% (không đáng kể).
- Nếu có 10,000 thread context switch liên tục → overhead tích lũy đáng kể.
- Đây là lý do tại sao goroutine (Go), fiber, async/await — các cơ chế user-space concurrency — ít tốn kém hơn OS process/thread context switch.

⚠ **Lỗi thường gặp — "Context switch chỉ xảy ra khi process kết thúc":** Sai. Context switch xảy ra rất thường xuyên (hàng trăm lần/giây mỗi core): mỗi khi timer interrupt, mỗi khi process bị block, mỗi khi process tự yield CPU.

📝 **Tóm tắt mục 6:**
- Context switch: kernel lưu CPU state của A vào PCB[A], nạp CPU state từ PCB[B], thay đổi address space, trả về user mode.
- Chi phí: 1-100 μs — chủ yếu do TLB flush và cache miss.
- Diễn ra rất thường xuyên, không chỉ khi process kết thúc.

---

## Bài tập

**Bài 1** — Phân loại vùng nhớ.

Đoạn code C sau, phân loại từng biến vào đúng vùng address space:

```c
#include <stdlib.h>

int global_count = 0;        // (a)
static char prefix[] = "OS"; // (b)
int uninitialized[100];      // (c)

int main() {
    int local_x = 42;            // (d)
    char* buf = malloc(1024);    // (e): bản thân con trỏ và vùng 1024 byte
    return 0;
}
```

---

**Bài 2** — Máy trạng thái.

Process A đang ở trạng thái Running và thực hiện lần lượt các thao tác sau. Mô tả trạng thái của A sau mỗi thao tác:
- (a) Gọi `read(socket_fd, buf, 4096)` — socket chưa có dữ liệu.
- (b) Dữ liệu đến trên socket (network packet nhận được).
- (c) Scheduler quyết định chạy process B (timer interrupt).
- (d) Scheduler chọn A lại.
- (e) A gọi `exit(0)`.

---

**Bài 3** — Fork và giá trị trả về.

Đoạn code sau in ra gì? Giải thích (giả sử `fork()` thành công, con có PID=2000, cha có PID=1999):

```c
int x = 10;
pid_t pid = fork();
if (pid == 0) {
    x = x + 5;
    printf("Con: x=%d, pid=%d\n", x, getpid());
} else {
    x = x - 3;
    printf("Cha: x=%d, con=%d\n", x, pid);
}
```

---

**Bài 4** — Context switch.

Hệ thống có 3 process: A, B, C (đều ở Ready, theo thứ tự đó). Timer interrupt xảy ra mỗi 5 ms. Kernel dùng Round Robin (luân phiên). Tại t=0, A đang Running. Mô tả trạng thái từng process tại t=5ms, t=10ms, t=15ms.

---

**Bài 5** — Fork + Exec.

Lệnh `grep "error" log.txt > errors.txt` trong bash. Mô tả chi tiết:
(a) Bash fork() như thế nào?
(b) Giữa fork() và exec(), tiến trình con làm gì để redirect output sang `errors.txt`?
(c) Sau exec("grep"), grep biết ghi vào file thay vì terminal?

---

## Lời giải chi tiết

**Bài 1 — Phân loại vùng nhớ**

**(a) `int global_count = 0;`** → **Data segment** (biến global, đã khởi tạo với giá trị 0 tường minh). Lưu ý: mặc dù giá trị = 0, vì được khởi tạo *tường minh* bởi lập trình viên, một số compiler đặt vào data; nhiều compiler tối ưu đặt vào BSS vì = 0. Về mặt chuẩn C, biến global = 0 luôn được zero-initialized và thường ở BSS.

**(b) `static char prefix[] = "OS";`** → **Data segment** (biến static với giá trị khác 0, khởi tạo rõ ràng, chuỗi "OS" được lưu trực tiếp trong binary).

**(c) `int uninitialized[100];`** → **BSS segment** (biến global, chưa khởi tạo — giá trị mặc định 0, OS zero-fill khi load). Không chiếm 400 byte trong file binary.

**(d) `int local_x = 42;`** → **Stack** (biến cục bộ bên trong hàm `main`).

**(e) `char* buf = malloc(1024);`**:
- Con trỏ `buf` (8 byte lưu địa chỉ): nằm trên **Stack** (là biến cục bộ).
- Vùng 1024 byte mà `buf` trỏ đến: nằm trên **Heap** (được `malloc` cấp phát).

---

**Bài 2 — Máy trạng thái**

Bắt đầu: A = Running.

**(a) Gọi `read(socket_fd, buf, 4096)` — socket chưa có data:**
A chuyển sang **Waiting**. Kernel đăng ký: "khi socket_fd có data, wake up A". CPU chạy process khác.

**(b) Network packet đến:**
Kernel nhận interrupt từ NIC, copy data vào kernel buffer, kiểm tra thấy socket_fd đang chờ bởi A, copy data vào buffer của A, đánh dấu A = **Ready**, đưa vào hàng chờ scheduler.

**(c) Scheduler chọn B (timer interrupt trong khi A đang Running):**
Nếu A đã ở Ready (từ bước b): Scheduler quyết định cho B chạy. A ở **Ready**. B chạy không ảnh hưởng A.
(Nếu bước này xảy ra khi A đang Running bình thường: A bị preempt → **Ready**.)

**(d) Scheduler chọn A lại:**
A chuyển sang **Running** — tiếp tục từ chỗ đã dừng (sau lệnh `read`).

**(e) A gọi `exit(0)`:**
A chuyển sang **Terminated/Zombie** (PCB còn đó cho đến khi cha `wait()`).

---

**Bài 3 — Fork và output**

Sau `fork()`, có 2 process độc lập với **bản sao riêng** của biến `x`:

**Tiến trình con (pid = 0 khi kiểm tra):**
- `x` ban đầu = 10 (bản sao của con).
- `x = x + 5` → `x = 15`.
- In: `Con: x=15, pid=2000`

**Tiến trình cha (pid = 2000 khi kiểm tra):**
- `x` ban đầu = 10 (bản sao của cha, không bị ảnh hưởng bởi con).
- `x = x - 3` → `x = 7`.
- In: `Cha: x=7, con=2000`

**Thứ tự in trên màn hình:** Không xác định — phụ thuộc scheduler chạy cha hay con trước. Có thể thấy "Cha" trước hoặc "Con" trước. Đây là điểm quan trọng: fork tạo ra hai tiến trình chạy đồng thời, thứ tự không có bảo đảm.

---

**Bài 4 — Context Switch Round Robin**

Timer = 5 ms, thứ tự ban đầu: A đang Running, B và C Ready.

| Thời điểm | A | B | C | Ghi chú |
|-----------|---|---|---|---------|
| t=0 ms | Running | Ready | Ready | Bắt đầu |
| t=5 ms (interrupt) | Ready | **Running** | Ready | Timer interrupt → save A, load B |
| t=10 ms (interrupt) | Ready | Ready | **Running** | Timer interrupt → save B, load C |
| t=15 ms (interrupt) | **Running** | Ready | Ready | Timer interrupt → save C, load A |

Tại t=5ms: A→Ready, B→Running. Tại t=10ms: B→Ready, C→Running. Tại t=15ms: C→Ready, A→Running.

---

**Bài 5 — Fork + Exec với redirect**

**(a) Bash fork():**
Bash gọi `fork()` → tạo tiến trình con với PID mới, address space là bản sao của bash, kế thừa fd table: fd[0]=stdin, fd[1]=stdout (terminal), fd[2]=stderr.

**(b) Con thiết lập redirect (giữa fork và exec):**
Con thực hiện:
```
open("errors.txt", O_WRONLY|O_CREAT|O_TRUNC, 0644) → trả về fd=3
close(1)   ← đóng stdout (fd 1)
dup2(3, 1) ← sao chép fd=3 (file) thành fd=1 (stdout)
close(3)   ← dọn dẹp fd thừa
```
Sau đó: fd[1] của con trỏ đến `errors.txt` thay vì terminal.

**(c) grep không biết, tự nhiên ghi vào file:**
`exec("grep", ["grep", "error", "log.txt"])` — kernel nạp binary grep, xóa address space cũ. Tuy nhiên **fd table không bị xóa** khi exec (trừ fd có `O_CLOEXEC`). grep kế thừa fd[1] đang trỏ đến `errors.txt`. Mọi lần grep gọi `write(1, ...)` đều ghi vào `errors.txt` — grep không cần biết gì về redirect cả.

---

## Liên kết và bài tiếp theo

- Tiền đề:
  - [Lesson 01 — Kernel & System Call](../lesson-01-os-kernel-syscall/): syscall `fork`, `exec`, `exit`, `wait` đều được giải thích ở Lesson 01.
- Bài tiếp theo:
  - [Lesson 03 — Thread & Concurrency](../lesson-03-threads-concurrency/): Thread là gì, khác process ở chỗ nào, concurrency vs parallelism.
  - [Lesson 04 — Lập lịch CPU](../lesson-04-cpu-scheduling/): Scheduler chọn process Ready nào để chạy — cơ chế quyết định "ai vào Running".
- Liên kết chéo:
  - [DataStructures — Linked List & Hash Table](../../../DataStructures/): PCB được tổ chức trong kernel dưới dạng cấu trúc dữ liệu — thường là hash table (tra bằng PID) và doubly linked list (duyệt danh sách process).
  - [Programming — Goroutine](../../../Programming/): Goroutine là "lightweight process" trong Go, dựa trên mô hình M:N threading.

---

## 📝 Tổng kết Lesson 02

1. **Tiến trình** = chương trình đang thực thi + ngữ cảnh (CPU state, address space, tài nguyên). Khác với chương trình (file tĩnh).
2. **Address space** = text (code, RO) + data (biến global init) + BSS (biến global uninit) + heap (malloc, ↑) + stack (biến local, ↓). Địa chỉ ảo — MMU dịch sang vật lý.
3. **PCB** = hồ sơ process trong kernel. Chứa PID, trạng thái, program counter, registers, bảng trang, fd table. Là cơ sở cho context switch.
4. **5 trạng thái**: new → ready → running → waiting → terminated. Running → Waiting khi I/O. Waiting → Ready khi I/O xong.
5. **fork()** = sao chép process (COW). **exec()** = thay chương trình, giữ PID. Pattern shell: fork + (setup) + exec + wait.

[Bài tiếp theo: Lesson 03 — Thread & Concurrency](../lesson-03-threads-concurrency/)
