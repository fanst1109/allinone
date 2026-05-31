// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: OperatingSystems/01-Foundations-Processes/lesson-01-os-kernel-syscall/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Kernel & System Call

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được **vai trò của hệ điều hành (operating system)**: lớp trung gian giữa phần cứng và ứng dụng, quản lý tài nguyên dùng chung.
- Phân biệt **user mode** và **kernel mode** — vì sao cần 2 chế độ đặc quyền khác nhau.
- Mô tả cơ chế **system call (syscall)**: ứng dụng yêu cầu dịch vụ từ kernel bằng cách nào, cơ chế trap/ngắt mềm hoạt động ra sao.
- Liệt kê và giải thích ít nhất 6 syscall phổ biến: \`read\`, \`write\`, \`open\`, \`close\`, \`fork\`, \`exit\`.
- Mô tả ngắn gọn quá trình **boot** từ firmware đến khi shell xuất hiện.

## Kiến thức tiền đề

Bài này là bài đầu tiên của lĩnh vực OperatingSystems — không yêu cầu kiến thức OS trước. Tuy nhiên, làm quen với khái niệm cơ bản về phần cứng (CPU, RAM, ổ đĩa) sẽ giúp bài học dễ tiếp thu hơn.

---

## 1. Hệ điều hành là gì?

### 1.1. Bài toán đặt ra

💡 **Trực giác — Analogy khách sạn:**
Hãy tưởng tượng một toà nhà văn phòng có 100 căn phòng, 10 máy in, 5 thang máy — nhưng 500 nhân viên cùng muốn dùng. Không có quy tắc nào, mọi người tranh nhau, máy in kẹt, thang máy quá tải. **Hệ điều hành (operating system — OS)** chính là ban quản lý toà nhà: nó quyết định ai được dùng máy in lúc nào, chia phòng cho từng đội nhóm, đảm bảo không ai chiếm toàn bộ tài nguyên một mình.

**Định nghĩa hình thức:** Hệ điều hành là phần mềm nằm giữa phần cứng (CPU, RAM, ổ đĩa, mạng) và ứng dụng người dùng. OS có hai vai trò chính:

1. **Quản lý tài nguyên (resource manager):** Phân phối CPU time, bộ nhớ, thiết bị I/O cho nhiều tiến trình chạy đồng thời một cách công bằng và an toàn.
2. **Trừu tượng hoá phần cứng (hardware abstraction):** Cung cấp giao diện đơn giản, nhất quán để ứng dụng không cần biết chi tiết phần cứng. Ví dụ: ứng dụng gọi \`write(fd, buf, n)\` mà không cần biết dữ liệu đang ghi vào SSD Samsung hay HDD Seagate.

### 1.2. Những gì OS quản lý

| Tài nguyên | OS quản lý bằng cách |
|------------|----------------------|
| CPU | Lập lịch (scheduling) — quyết định tiến trình nào chạy khi nào (Lesson 04) |
| RAM | Quản lý bộ nhớ — cấp phát, thu hồi, bảo vệ vùng nhớ giữa các tiến trình |
| Ổ đĩa / File | Hệ thống file (filesystem) — tổ chức, đọc/ghi, kiểm soát quyền truy cập |
| Thiết bị I/O | Driver và interrupt — giao tiếp với bàn phím, màn hình, card mạng |
| Mạng | Network stack — TCP/IP, socket |

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Nếu không có OS, ứng dụng có thể chạy không?"* — Về kỹ thuật có thể, nhưng mỗi ứng dụng phải tự viết driver cho từng phần cứng, tự quản lý RAM, tự lập lịch CPU. Cực kỳ phức tạp và không an toàn — ứng dụng A có thể xoá dữ liệu của B.
- *"OS có phải là Windows/Linux/macOS không?"* — Đó là những OS cụ thể. "Hệ điều hành" là khái niệm trừu tượng. Còn có OS nhúng (RTOS), OS di động (Android, iOS), hypervisor (VMware, KVM) — tất cả đều là OS ở nghĩa rộng.

📝 **Tóm tắt mục 1:**
- OS = lớp phần mềm giữa phần cứng và ứng dụng.
- Hai vai trò: quản lý tài nguyên + trừu tượng hoá phần cứng.
- Không có OS, mỗi ứng dụng phải tự lo mọi thứ — phức tạp và nguy hiểm.

---

## 2. User Mode vs Kernel Mode

### 2.1. Vấn đề đặc quyền

💡 **Trực giác — Analogy bệnh viện:**
Trong bệnh viện, bác sĩ được vào phòng mổ, tiếp cận thuốc nguy hiểm, ra lệnh điều trị. Bệnh nhân không được vào phòng mổ một mình. Nếu bệnh nhân muốn nhận thuốc, họ **yêu cầu** bác sĩ kê đơn — bác sĩ kiểm tra rồi thực hiện.

Tương tự, CPU hiện đại có ít nhất 2 chế độ hoạt động:

- **User mode (chế độ người dùng):** Nơi ứng dụng chạy. CPU hạn chế các lệnh nguy hiểm — không được đọc/ghi RAM tuỳ ý, không được tắt ngắt (interrupt), không được truy cập cổng I/O trực tiếp.
- **Kernel mode (chế độ nhân):** Nơi OS kernel chạy. CPU cho phép mọi lệnh — đọc/ghi bất kỳ địa chỉ RAM, lập trình thiết bị I/O, quản lý bảng trang bộ nhớ.

### 2.2. Vì sao cần 2 mode?

**An toàn và cô lập:** Nếu chỉ có một mode, một ứng dụng bị lỗi (hoặc độc hại) có thể ghi đè lên vùng nhớ của OS hoặc ứng dụng khác, crash toàn hệ thống. Với 2 mode, ngay cả khi ứng dụng cố tình thực hiện lệnh đặc quyền, CPU sẽ tạo ra **exception (ngoại lệ)** và OS xử lý (thường là kill ứng dụng đó).

**Ví dụ cụ thể:**
- Chương trình C gọi \`malloc(1000000000)\` — yêu cầu 1 GB RAM.
- Code user-mode gọi \`malloc\` trong thư viện C.
- Thư viện C gọi syscall \`brk\` hoặc \`mmap\` để xin thêm bộ nhớ từ kernel.
- Kernel kiểm tra: máy còn đủ RAM không, process này có quyền không, rồi quyết định cấp hay từ chối.
- Kết quả trả về user mode.

⚠ **Lỗi thường gặp — Nhầm "kernel" với "kernel panic":** Kernel là phần lõi của OS chạy ở kernel mode — bình thường và luôn chạy. "Kernel panic" là trạng thái lỗi nghiêm trọng của kernel (tương đương Blue Screen of Death trên Windows) — không liên quan đến khái niệm 2 mode.

### 2.3. Kiến trúc monolithic vs microkernel

| Loại | Đặc điểm | Ví dụ |
|------|----------|-------|
| **Monolithic kernel** | Toàn bộ dịch vụ OS (driver, filesystem, network stack) chạy trong kernel mode | Linux, macOS XNU (phần kernel), FreeBSD |
| **Microkernel** | Chỉ phần lõi tối thiểu (IPC, memory, scheduling) ở kernel mode; driver, filesystem chạy ở user mode | MINIX 3, seL4, QNX |
| **Hybrid** | Kết hợp | Windows NT, macOS (XNU = Mach microkernel + BSD monolithic) |

🔁 **Dừng lại tự kiểm tra:**

Ứng dụng đang chạy muốn ghi dữ liệu vào file. Nó có thể tự ghi trực tiếp vào ổ đĩa không?

<details>
<summary>Đáp án</summary>
Không. Ghi vào ổ đĩa yêu cầu quyền kernel mode (điều khiển driver I/O, quản lý filesystem). Ứng dụng chạy ở user mode phải yêu cầu OS thực hiện thông qua system call (ví dụ: \`write(fd, buf, n)\`). OS kiểm tra quyền, sau đó mới thực sự ghi vào thiết bị.
</details>

📝 **Tóm tắt mục 2:**
- CPU có 2 chế độ: user mode (hạn chế) và kernel mode (toàn quyền).
- Phân tách 2 mode bảo vệ OS và các ứng dụng khỏi code lỗi hoặc độc hại.
- Ứng dụng muốn làm điều đặc quyền phải yêu cầu qua system call.

---

## 3. System Call — Cơ chế giao tiếp User ↔ Kernel

### 3.1. System call là gì?

**System call (syscall)** là giao diện lập trình cho phép ứng dụng ở user mode yêu cầu dịch vụ từ kernel. Đây là **cánh cửa duy nhất** hợp lệ để vượt từ user mode sang kernel mode.

💡 **Trực giác:** Bạn muốn rút tiền từ ngân hàng — bạn không tự mình vào kho két, bạn điền phiếu yêu cầu và đưa cho nhân viên (kernel). Nhân viên kiểm tra số dư, xác minh danh tính, rồi thực hiện thay bạn. System call là "phiếu yêu cầu" đó.

### 3.2. Cơ chế Trap — Từng bước chuyển User → Kernel

Khi ứng dụng gọi một syscall (ví dụ \`read(fd, buf, 512)\`):

**Bước 1 — Chuẩn bị tham số:**
Ứng dụng đặt số hiệu syscall (syscall number) vào thanh ghi CPU (trên x86-64 Linux: \`rax\`), các tham số vào \`rdi\`, \`rsi\`, \`rdx\`, ...

Ví dụ cho \`read(fd=3, buf=0x7fff1000, count=512)\`:
\`\`\`
rax = 0        ← syscall number của read trên Linux x86-64
rdi = 3        ← file descriptor
rsi = 0x7fff1000  ← địa chỉ buffer
rdx = 512      ← số byte cần đọc
\`\`\`

**Bước 2 — Lệnh SYSCALL (trap vào kernel):**
Ứng dụng thực thi lệnh CPU đặc biệt: \`syscall\` (x86-64) hoặc \`int 0x80\` (x86 cũ). Lệnh này:
- Lưu trạng thái CPU hiện tại (các thanh ghi, instruction pointer) vào kernel stack.
- Chuyển CPU từ user mode → **kernel mode**.
- Nhảy đến địa chỉ **syscall handler** trong kernel (địa chỉ được lưu sẵn ở thanh ghi MSR \`LSTAR\` khi boot).

**Bước 3 — Kernel xử lý:**
Kernel đọc \`rax\` = 0 → biết đây là \`read\`. Kernel:
- Kiểm tra \`fd=3\` có hợp lệ không (có thuộc process này không).
- Kiểm tra buffer \`0x7fff1000\` có thuộc vùng nhớ user process không (không cho phép ghi vào vùng kernel).
- Đọc dữ liệu từ thiết bị (hoặc page cache nếu đã có sẵn trong RAM).
- Sao chép dữ liệu vào buffer của user.
- Đặt giá trị trả về vào \`rax\` (số byte đọc được, hoặc -1 nếu lỗi).

**Bước 4 — Trả về user mode:**
Kernel thực thi lệnh \`sysret\`, CPU:
- Khôi phục trạng thái CPU đã lưu.
- Chuyển từ kernel mode → **user mode**.
- Tiếp tục thực thi lệnh kế tiếp sau \`syscall\` trong ứng dụng.

**Tổng kết thời gian:** Một syscall điển hình tốn ~100–300 ns (nanoseconds) chỉ cho việc chuyển mode — đây gọi là **overhead của syscall**. Vì vậy, thiết kế tốt nên giảm số lần gọi syscall không cần thiết (vd: đọc từng byte một vs đọc cả buffer 4096 byte một lần).

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Mỗi lần gọi hàm C như \`printf\` có phải là syscall không?"* — Không nhất thiết. \`printf\` trong thư viện C thực hiện buffering nội bộ, chỉ gọi syscall \`write\` khi buffer đầy hoặc gặp \`\\n\`. Nhiều lần \`printf\` có thể chỉ tạo ra 1 lần syscall.
- *"Syscall có bị chặn (block) không?"* — Có. Ví dụ \`read\` trên socket có thể block vô thời hạn cho đến khi dữ liệu đến. Trong thời gian đó, kernel cho process khác chạy (context switch).
- *"Làm sao kernel biết địa chỉ của syscall handler?"* — Khi boot, kernel ghi địa chỉ handler vào thanh ghi MSR \`LSTAR\` (trên x86-64). Lệnh \`syscall\` đọc địa chỉ từ đó và nhảy thẳng đến.

### 3.3. Các syscall phổ biến

| Syscall | Số hiệu (Linux x86-64) | Mô tả | Ví dụ dùng |
|---------|------------------------|-------|------------|
| \`read\` | 0 | Đọc dữ liệu từ file descriptor | Đọc file, socket, stdin |
| \`write\` | 1 | Ghi dữ liệu vào file descriptor | Ghi file, in ra stdout |
| \`open\` | 2 | Mở file, trả về file descriptor | \`open("/etc/passwd", O_RDONLY)\` |
| \`close\` | 3 | Đóng file descriptor | Giải phóng fd sau khi dùng xong |
| \`fork\` | 57 | Tạo tiến trình con — bản sao của cha | Shell tạo process mới |
| \`exec\` | 59 | Thay thế chương trình hiện tại bằng chương trình mới | Chạy lệnh sau \`fork\` |
| \`exit\` | 60 | Kết thúc tiến trình, trả về exit code | Cuối \`main()\` |
| \`wait\` | 61 | Chờ tiến trình con kết thúc | Shell chờ lệnh hoàn tất |
| \`mmap\` | 9 | Map file hoặc cấp phát bộ nhớ | Cơ chế bên dưới \`malloc\` |
| \`getpid\` | 39 | Lấy PID của tiến trình hiện tại | Debug, logging |

**Walk-through ví dụ — Lệnh \`cat file.txt\`:**

\`\`\`
shell fork()                   → tạo process con (PID mới)
  process con: exec("cat", "file.txt")
    → kernel nạp binary /bin/cat vào bộ nhớ
    cat: open("file.txt", O_RDONLY) → trả fd=3
    cat: vòng lặp:
         read(fd=3, buf, 4096) → đọc tối đa 4096 byte
         write(fd=1, buf, n)   → ghi ra stdout (fd 1)
         ... cho đến khi read() trả về 0 (EOF)
    cat: close(fd=3)
    cat: exit(0)
  shell: wait()                → chờ cat kết thúc
  shell: in prompt tiếp theo
\`\`\`

Toàn bộ chuỗi \`cat file.txt\` = khoảng 6-10 syscall — tất cả đều qua cơ chế trap/sysret mô tả ở trên.

🔁 **Dừng lại tự kiểm tra:**

Một chương trình Python gọi \`print("Hello")\`. Liệt kê (a) hàm thư viện nào được gọi, (b) syscall nào cuối cùng được thực thi.

<details>
<summary>Đáp án</summary>
(a) Python gọi hàm \`print()\` → trong CPython, đây gọi \`sys.stdout.write()\` → gọi hàm \`write()\` trong thư viện C (buffered I/O) → khi flush, gọi \`fwrite()\` → cuối cùng gọi syscall.
(b) Syscall được thực thi là \`write(fd=1, buf, n)\` — ghi ra stdout (file descriptor 1). Số hiệu syscall: 1 trên Linux x86-64.
</details>

📝 **Tóm tắt mục 3:**
- Syscall = cánh cửa duy nhất từ user mode vào kernel mode.
- Cơ chế: đặt tham số vào thanh ghi → lệnh \`syscall\` → CPU trap vào kernel handler → kernel xử lý → \`sysret\` trả về.
- Overhead ~100-300 ns mỗi syscall — thiết kế tốt nên giảm số lần gọi.
- Các syscall phổ biến: \`read\`, \`write\`, \`open\`, \`close\`, \`fork\`, \`exec\`, \`exit\`, \`mmap\`.

---

## 4. Quá trình Boot

### 4.1. Từ nút nguồn đến shell — 6 giai đoạn

💡 **Trực giác:** Boot giống như khởi động một nhà hàng mỗi sáng: bảo vệ mở cổng (firmware), đầu bếp trưởng vào trước kiểm tra bếp (bootloader), sau đó mở cửa bếp đầy đủ (kernel), rồi mới gọi nhân viên phục vụ vào (init/systemd), cuối cùng khách hàng mới được vào đặt bàn (user login, shell).

**Giai đoạn 1 — Firmware (BIOS/UEFI):**
- CPU khởi động ở địa chỉ cố định \`0xFFFFFFF0\` (x86), nhảy vào code firmware trong chip ROM.
- Firmware kiểm tra phần cứng (POST — Power-On Self Test): RAM có hoạt động không, CPU có lỗi không.
- UEFI hiện đại hỗ trợ Secure Boot: kiểm tra chữ ký bootloader trước khi nạp.
- Thời gian: 0.1–2 giây.

**Giai đoạn 2 — Bootloader (GRUB2 / Windows Boot Manager):**
- Firmware nạp bootloader từ sector đầu của ổ đĩa (MBR) hoặc phân vùng EFI (UEFI).
- Bootloader hiển thị menu chọn OS (nếu multi-boot), nạp **kernel image** (\`vmlinuz\`) từ ổ đĩa vào RAM.
- Cũng nạp **initramfs** — filesystem RAM tạm thời chứa driver cần thiết để mount ổ đĩa thật.
- Thời gian: 1–3 giây.

**Giai đoạn 3 — Kernel khởi tạo:**
- Kernel giải nén bản thân (kernel thường nén để tiết kiệm dung lượng).
- Khởi tạo bảng trang bộ nhớ (MMU — Memory Management Unit).
- Phát hiện và khởi tạo driver cho CPU, RAM, bus hệ thống.
- Mount initramfs làm \`/\` tạm thời.
- Tìm và mount ổ đĩa thật (root filesystem).
- Thời gian: 0.5–3 giây.

**Giai đoạn 4 — Init process (PID 1):**
- Kernel tạo tiến trình đầu tiên (PID = 1): trên Linux hiện đại là **systemd** (hoặc SysV init trên hệ cũ).
- Systemd đọc file cấu hình unit, khởi động các service theo thứ tự phụ thuộc (dependency).
- Ví dụ: network service → DNS → web server.
- Thời gian: 2–10 giây (tùy số service).

**Giai đoạn 5 — Login prompt / Display manager:**
- Sau khi các service cơ bản sẵn sàng, systemd khởi động login service (\`getty\` cho terminal, \`GDM\`/\`LightDM\` cho GUI).
- Người dùng nhập username/password → xác thực qua PAM (Pluggable Authentication Modules).

**Giai đoạn 6 — Shell / Desktop:**
- Sau xác thực thành công, login service khởi động shell (bash, zsh) hoặc desktop environment (GNOME, KDE).
- Từ đây, người dùng tương tác với OS thông qua shell hoặc GUI — tất cả đều qua user mode và syscall.

⚠ **Lỗi thường gặp — Nhầm "firmware = BIOS":** BIOS là firmware thế hệ cũ (16-bit, giới hạn ổ đĩa 2 TB, không hỗ trợ Secure Boot). **UEFI** là chuẩn firmware hiện đại (64-bit, GPT, Secure Boot, giao diện đồ họa). Máy tính từ 2012 trở đi hầu hết dùng UEFI.

📝 **Tóm tắt mục 4:**
- Firmware → Bootloader → Kernel init → PID 1 (systemd) → Login → Shell.
- Firmware kiểm tra phần cứng, bootloader nạp kernel vào RAM.
- Kernel tự giải nén, khởi tạo MMU, driver, rồi chạy PID 1.
- systemd khởi động các service theo dependency, cuối cùng trình bày login prompt.

---

## Bài tập

**Bài 1** — Phân loại theo mode.

Phân loại các thao tác sau: chạy ở user mode hay kernel mode?
- (a) Tính toán \`x = a * b + c\` trong chương trình C.
- (b) Ghi dữ liệu ra card mạng (NIC).
- (c) Gọi \`malloc(100)\` trong code C.
- (d) Xử lý ngắt (interrupt) từ bàn phím.

---

**Bài 2** — Truy vết syscall.

Đoạn code Python sau thực hiện bao nhiêu syscall \`write\` tối thiểu? Giải thích.

\`\`\`python
import sys
sys.stdout.write("A")
sys.stdout.write("B")
sys.stdout.write("C")
sys.stdout.flush()
\`\`\`

---

**Bài 3** — Cơ chế trap.

Mô tả chi tiết 4 bước xảy ra khi chương trình C gọi \`exit(0)\`:
(a) Ứng dụng chuẩn bị gì trước khi gọi lệnh \`syscall\`?
(b) CPU làm gì khi gặp lệnh \`syscall\`?
(c) Kernel xử lý \`exit\` như thế nào?
(d) Tại sao \`exit\` không bao giờ "trả về" user mode?

---

**Bài 4** — Quá trình boot.

Sau khi GRUB2 nạp kernel vào RAM, liệt kê 3 việc kernel phải làm trước khi chạy được \`systemd\` (PID 1). Giải thích ngắn gọn tại sao mỗi việc là cần thiết.

---

**Bài 5** — Phân tích lệnh shell.

Lệnh \`ls -la /home\` được gõ trong bash. Liệt kê (theo thứ tự) các syscall chính mà lệnh này tạo ra (gợi ý: fork, exec, open, getdents, write, exit, wait).

---

## Lời giải chi tiết

**Bài 1 — Phân loại theo mode**

**(a) \`x = a * b + c\`** — **User mode.** Phép tính số học là lệnh CPU thông thường (\`mul\`, \`add\`), không cần quyền đặc biệt, không truy cập phần cứng.

**(b) Ghi ra card mạng** — **Kernel mode.** Ghi vào thanh ghi I/O của NIC, lập trình DMA (Direct Memory Access), tương tác với driver — tất cả đều yêu cầu kernel mode. Ứng dụng gọi \`send()\` (syscall) → kernel thực hiện ghi vật lý.

**(c) \`malloc(100)\`** — **Cả hai.** \`malloc\` trong thư viện C chạy ở user mode (quản lý heap nội bộ). Tuy nhiên, khi heap cạn, \`malloc\` gọi syscall \`mmap\` hoặc \`brk\` để xin thêm bộ nhớ từ kernel — lúc đó mới vào kernel mode. Thông thường \`malloc(100)\` không cần syscall nếu heap còn dư.

**(d) Xử lý interrupt từ bàn phím** — **Kernel mode.** Interrupt handler chạy ở kernel mode. Khi bàn phím nhấn phím, CPU nhận tín hiệu interrupt, lưu trạng thái user mode, chuyển sang kernel mode để gọi interrupt handler của keyboard driver.

---

**Bài 2 — Số lần syscall \`write\`**

Tối thiểu **1 lần** syscall \`write\`.

Giải thích: \`sys.stdout\` là buffered output. Ba lần \`sys.stdout.write("A"/"B"/"C")\` chỉ ghi vào buffer nội bộ của Python/C stdio — không tạo syscall ngay. Chỉ khi \`sys.stdout.flush()\` được gọi (hoặc khi buffer đầy), thư viện C mới thực sự gọi syscall \`write(1, "ABC", 3)\` một lần duy nhất với toàn bộ dữ liệu đã buffer.

Nếu stdout là terminal (TTY) và không dùng buffering rõ ràng, Python có thể line-buffer và flush sau mỗi \`\\n\`, nhưng trong code trên không có \`\\n\` nên vẫn chỉ 1 lần flush ở cuối.

---

**Bài 3 — Cơ chế trap cho \`exit(0)\`**

**(a) Ứng dụng chuẩn bị:**
Đặt vào các thanh ghi:
\`\`\`
rax = 60    ← syscall number của exit trên Linux x86-64
rdi = 0     ← exit code (tham số của exit)
\`\`\`
Sau đó thực thi lệnh \`syscall\`.

**(b) CPU khi gặp \`syscall\`:**
- Lưu instruction pointer (\`rip\`) và giá trị \`rflags\` hiện tại.
- Tra địa chỉ handler từ MSR \`LSTAR\`.
- Tắt interrupt.
- Chuyển CPU sang kernel mode (ring 0 trên x86).
- Nhảy đến địa chỉ syscall entry point của kernel.

**(c) Kernel xử lý \`exit\`:**
- Đọc \`rax\` = 60 → biết là \`exit\`.
- Lưu exit code từ \`rdi\` = 0 vào PCB (Process Control Block) của tiến trình.
- Giải phóng tài nguyên: đóng tất cả file descriptor, giải phóng RAM, xoá khỏi scheduler.
- Gửi tín hiệu \`SIGCHLD\` đến tiến trình cha (nếu có cha đang \`wait()\`).
- Chuyển trạng thái tiến trình sang **zombie** (giữ lại PCB cho cha đọc exit code).
- Xoá khỏi danh sách tiến trình đang chạy.

**(d) \`exit\` không trả về user mode:**
Vì sau khi kernel xử lý \`exit\`, tiến trình này không còn tồn tại — không còn stack, không còn heap, không còn code để quay về. CPU scheduler chọn tiến trình khác để chạy. Đây là điểm khác biệt của \`exit\` so với các syscall thông thường: syscall thông thường \`sysret\` về instruction tiếp theo; \`exit\` thì CPU không còn context nào để quay về.

---

**Bài 4 — Kernel làm gì trước khi chạy PID 1**

**Việc 1: Khởi tạo MMU và bảng trang (page table).**
Lý do: Kernel cần thiết lập không gian địa chỉ ảo để có thể cấp phát bộ nhớ riêng cho mỗi tiến trình, bảo vệ vùng nhớ kernel không bị user code truy cập. Không có MMU, không thể chạy OS hiện đại.

**Việc 2: Phát hiện và khởi tạo driver phần cứng cơ bản (timer, interrupt controller).**
Lý do: Kernel cần timer ngắt định kỳ để thực hiện context switch (lập lịch CPU). Không có timer interrupt, kernel không thể preemptive scheduling — một tiến trình có thể chiếm CPU mãi mãi.

**Việc 3: Mount root filesystem.**
Lý do: \`/sbin/init\` hoặc \`/lib/systemd/systemd\` là file nhị phân trên ổ đĩa. Để \`exec()\` nó, kernel phải có khả năng đọc filesystem. Bước này thường mount initramfs trước (từ RAM), rồi chuyển sang ổ đĩa thật (root filesystem thật sự có thể cần driver đặc biệt ở trong initramfs).

---

**Bài 5 — Syscall của lệnh \`ls -la /home\`**

Thứ tự syscall chính:

1. **\`fork()\`** — bash tạo process con để chạy \`ls\`.
2. **\`exec("/bin/ls", ["ls", "-la", "/home"])\`** — process con thay thế bản thân bằng binary \`/bin/ls\`. Kernel nạp binary \`ls\` từ ổ đĩa vào RAM.
3. **\`open("/home", O_RDONLY | O_DIRECTORY)\`** — \`ls\` mở thư mục \`/home\`, nhận fd.
4. **\`getdents(fd, buf, bufsize)\`** — đọc danh sách file/thư mục trong \`/home\` vào buffer.
5. *(Vòng lặp)* **\`stat()\` hoặc \`lstat()\`** — với mỗi entry, lấy metadata (size, permission, timestamp) cho chế độ \`-la\`.
6. **\`write(1, output_buf, n)\`** — ghi kết quả đã format ra stdout.
7. **\`close(fd)\`** — đóng fd của thư mục.
8. **\`exit(0)\`** — \`ls\` kết thúc.
9. **\`wait()\`** — bash (tiến trình cha) chờ \`ls\` kết thúc, nhận exit code.
10. Bash in prompt tiếp theo → \`write(1, "$ ", 2)\`.

---

## Liên kết và bài tiếp theo

- Bài tiếp theo:
  - [Lesson 02 — Tiến trình (Process)](../lesson-02-process/): Process là gì, address space, PCB, vòng đời trạng thái, \`fork()\`/\`exec()\`, context switch.
  - [Lesson 03 — Thread & Concurrency](../lesson-03-threads-concurrency/): Thread chia sẻ address space của process ra sao.
- Liên kết chéo:
  - [DataFoundations — Biểu diễn số nguyên](../../../DataFoundations/): Hiểu số nhị phân giúp hiểu cách CPU xử lý thanh ghi và địa chỉ.

---

## 📝 Tổng kết Lesson 01

1. **OS** = lớp phần mềm giữa phần cứng và ứng dụng; vai trò: quản lý tài nguyên và trừu tượng hoá phần cứng.
2. **Hai mode CPU**: user mode (hạn chế) và kernel mode (toàn quyền). Phân tách này bảo vệ tính toàn vẹn hệ thống.
3. **System call**: cơ chế duy nhất để user mode yêu cầu dịch vụ kernel. Cơ chế: đặt tham số vào thanh ghi → lệnh \`syscall\` → trap → kernel xử lý → \`sysret\` về user mode.
4. **Syscall phổ biến**: \`read\`(0), \`write\`(1), \`open\`(2), \`fork\`(57), \`exec\`(59), \`exit\`(60).
5. **Boot**: Firmware → Bootloader → Kernel init → PID 1 (systemd) → Login → Shell.

[Bài tiếp theo: Lesson 02 — Tiến trình](../lesson-02-process/)
`;
