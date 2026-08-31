# Lesson 06 — Boot, Init & Driver

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Mô tả được toàn bộ **chuỗi khởi động** từ nhấn nút nguồn đến dấu nhắc người dùng: firmware → bootloader → kernel → init → user space.
- Phân biệt **BIOS** và **UEFI**, hiểu tại sao UEFI thay thế BIOS.
- Giải thích cơ chế **ngắt (interrupt)**: vector ngắt, ISR, ngắt cứng vs mềm.
- So sánh **polling** và **interrupt-driven I/O**, biết khi nào dùng cái nào.
- Mô tả **device driver** là gì, tại sao cần, và kernel module hoạt động ra sao.

## Kiến thức tiền đề

- [Lesson 01 — OS, Kernel & Syscall](../../01-Foundations-Processes/lesson-01-os-kernel-syscall/): kernel space vs user space, system call.
- [Lesson 07 — I/O & Disk Scheduling](../../02-Memory-Storage/lesson-07-io-disk-scheduling/): cơ chế I/O cơ bản.

---

## 1. Chuỗi khởi động (Boot Sequence)

### 1.1. Tổng quan

💡 **Trực giác — Buổi sáng thức dậy:**
Khi bạn thức dậy, não bộ không "bật ngay" — bạn mở mắt (firmware kiểm tra phần cứng), nhớ lại mình đang ở đâu (bootloader tìm OS), rồi mới có thể suy nghĩ đầy đủ (kernel chạy), và cuối cùng mới tương tác với thế giới (user space). Boot sequence máy tính y hệt vậy: từng lớp kích hoạt lớp tiếp theo.

**Chuỗi đầy đủ:**
<svg viewBox="0 0 560 506" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Trình tự boot: nhấn nguồn → BIOS/UEFI (POST) → GRUB nạp kernel → kernel init (initramfs, mount root) → systemd PID 1 → user space">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <rect x="90.0" y="14.0" width="380.0" height="44.0" rx="8" fill="#f1f5f9" fill-opacity="1" stroke="#94a3b8" stroke-width="2"/>
  <text x="280.0" y="40.2" fill="#94a3b8" font-size="12" text-anchor="middle" font-weight="700">Nhấn nút nguồn</text>
  <line x1="280.0" y1="60.0" x2="280.0" y2="82.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="90.0" y="84.0" width="380.0" height="58.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="280.0" y="109.2" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">Firmware: BIOS / UEFI</text>
  <text x="280.0" y="125.2" fill="#475569" font-size="11" text-anchor="middle">POST · tìm boot device</text>
  <line x1="280.0" y1="144.0" x2="280.0" y2="166.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="90.0" y="168.0" width="380.0" height="58.0" rx="8" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="2"/>
  <text x="280.0" y="193.2" fill="#7c3aed" font-size="12" text-anchor="middle" font-weight="700">Bootloader: GRUB / systemd-boot</text>
  <text x="280.0" y="209.2" fill="#475569" font-size="11" text-anchor="middle">nạp kernel image vào RAM, truyền cmdline + initrd</text>
  <line x1="280.0" y1="228.0" x2="280.0" y2="250.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="90.0" y="252.0" width="380.0" height="72.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="280.0" y="276.2" fill="#b45309" font-size="12" text-anchor="middle" font-weight="700">Kernel initialization</text>
  <text x="280.0" y="292.2" fill="#475569" font-size="11" text-anchor="middle">giải nén, thiết lập bộ nhớ/CPU/MMU,</text>
  <text x="280.0" y="308.2" fill="#475569" font-size="11" text-anchor="middle">nạp driver thiết yếu (initramfs), mount root FS</text>
  <line x1="280.0" y1="326.0" x2="280.0" y2="348.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="90.0" y="350.0" width="380.0" height="58.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="280.0" y="375.2" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">init / systemd (PID 1)</text>
  <text x="280.0" y="391.2" fill="#475569" font-size="11" text-anchor="middle">chạy service theo phụ thuộc, network, login</text>
  <line x1="280.0" y1="410.0" x2="280.0" y2="432.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="90.0" y="434.0" width="380.0" height="58.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="280.0" y="459.2" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">User space</text>
  <text x="280.0" y="475.2" fill="#475569" font-size="11" text-anchor="middle">Shell / Desktop Environment</text>
</svg>

### 1.2. Firmware: BIOS và UEFI

**BIOS (Basic Input/Output System)** — công nghệ từ 1975:
- Code 16-bit, chạy từ ROM.
- Tìm thiết bị boot theo thứ tự (HDD → CD → USB).
- **MBR (Master Boot Record)**: 512 byte đầu của đĩa, chứa code bootloader và bảng phân vùng.
- Giới hạn: ổ đĩa tối đa 2 TB (do MBR 32-bit), chỉ 4 phân vùng chính.

**UEFI (Unified Extensible Firmware Interface)** — thay thế BIOS từ ~2012:
- Code 64-bit, có giao diện đồ họa, hỗ trợ chuột.
- **GPT (GUID Partition Table)**: thay MBR, hỗ trợ ổ đĩa đến 9.4 ZB, 128 phân vùng.
- **ESP (EFI System Partition)**: phân vùng FAT32 riêng chứa bootloader (`.efi` files).
- **Secure Boot**: kiểm tra chữ ký số bootloader và kernel — chặn phần mềm độc hại can thiệp boot.
- Có thể boot trực tiếp từ ESP mà không cần bootloader riêng.

| Tiêu chí | BIOS | UEFI |
|----------|------|------|
| Năm ra đời | 1975 | 2005+ |
| Chế độ | 16-bit real mode | 64-bit protected mode |
| Bảng phân vùng | MBR | GPT |
| Giới hạn ổ đĩa | 2 TB | 9.4 ZB |
| Số phân vùng | 4 chính | 128 |
| Secure Boot | Không | Có |
| Thời gian boot | Chậm hơn | Nhanh hơn |

### 1.3. Bootloader — GRUB

**GRUB (GNU GRand Unified Bootloader)** là bootloader phổ biến trên Linux:
- Giai đoạn 1 (MBR/ESP): code nhỏ, nạp giai đoạn 2.
- Giai đoạn 2: đọc file system, hiển thị menu boot, nạp kernel image (`vmlinuz`) và initramfs vào RAM.
- Truyền **kernel command line** — chuỗi tham số: `root=/dev/sda1 quiet splash init=/sbin/systemd`.

### 1.4. Kernel initialization

Sau khi GRUB nhảy vào điểm entry của kernel:

1. **Giải nén**: `vmlinuz` là kernel đã nén (gzip/zstd). Code đầu tiên tự giải nén ra `vmlinux`.
2. **Thiết lập vùng nhớ**: kernel xây page table, kích hoạt virtual memory (MMU on).
3. **Phát hiện phần cứng**: CPU, bộ nhớ, thiết bị PCI, ACPI tables.
4. **initramfs**: file system tạm trong RAM, chứa driver tối thiểu để mount root filesystem thật.
5. **Mount root filesystem**: chuyển root từ initramfs sang đĩa thật.
6. **Chạy PID 1**: `exec /sbin/init` (hoặc `systemd`).

### 1.5. systemd — Init hiện đại

**systemd** (PID 1 trên hầu hết distro Linux hiện đại) khởi động toàn bộ user space:
- Dùng **unit files** mô tả service, mount point, timer, socket.
- Khởi động **song song** các service độc lập (nhanh hơn init truyền thống chạy tuần tự).
- Theo dõi dependency: service B chỉ start sau khi service A ready.
- `systemctl status`, `journalctl` — công cụ debug.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Tại sao cần initramfs nếu đã có kernel?"* — Kernel cần driver để đọc file system, nhưng driver filesystem nằm trên đĩa. Vòng luẩn quẩn! initramfs giải quyết bằng cách bung driver tối thiểu từ RAM.
- *"Secure Boot có nghĩa là không cài được Linux không?"* — Không. Hầu hết distro Linux hiện đại (Ubuntu, Fedora) có chứng chỉ Secure Boot. Bạn cũng có thể tắt Secure Boot trong UEFI settings.
- *"systemd vs init truyền thống?"* — SysV init chạy tuần tự script, rất chậm (Raspberry Pi 2012 boot ~30s). systemd chạy song song + socket activation → boot nhanh hơn nhiều.

📝 **Tóm tắt mục 1:**
- Boot sequence: Firmware (BIOS/UEFI) → POST → Bootloader (GRUB) → Kernel init → init/systemd → User space.
- UEFI thay BIOS: 64-bit, GPT, Secure Boot, hỗ trợ ổ đĩa lớn.
- initramfs giải quyết vòng luẩn quẩn "cần driver để đọc driver".
- systemd: PID 1, khởi động song song, unit files.

---

## 2. Ngắt (Interrupt)

### 2.1. Vấn đề polling vs interrupt

💡 **Trực giác — Người gác cổng:**
Hai cách biết có khách đến:
1. **Polling**: mỗi 5 giây nhìn ra cổng xem có khách không. Lãng phí thời gian, nhưng đơn giản.
2. **Interrupt-driven**: lắp chuông cổng. Bạn làm việc bình thường; khi khách bấm chuông, bạn mới dừng lại ra mở cửa.

CPU hoạt động y vậy.

**Polling (thăm dò):** CPU liên tục hỏi thiết bị "mày xong chưa?":
```python
while device.status != READY:
    pass  # spin-wait
data = device.read()
```
- Ưu điểm: đơn giản, latency thấp khi thiết bị đáp ứng nhanh.
- Nhược điểm: lãng phí 100% CPU trong khi chờ (busy waiting).

**Interrupt-driven I/O:** CPU làm việc khác; thiết bị báo ngắt khi xong:
```
CPU gửi lệnh I/O → CPU làm việc khác → Thiết bị xong → Gửi ngắt → CPU phục vụ ngắt
```
- Ưu điểm: CPU hiệu quả, có thể chạy process khác trong khi chờ.
- Nhược điểm: overhead context switch ngắt.

### 2.2. Cơ chế ngắt chi tiết

**Vector ngắt (Interrupt Vector Table — IVT):**
Mảng con trỏ trỏ đến các **ISR (Interrupt Service Routine)** — hàm xử lý ngắt. Mỗi loại ngắt có một số nguyên gọi là **vector** (chỉ số vào bảng).

Ví dụ (x86):
| Vector | Nguồn | ISR |
|--------|-------|-----|
| 0x00 | Divide by zero | `do_divide_error` |
| 0x06 | Invalid opcode | `do_invalid_op` |
| 0x0E | Page fault | `do_page_fault` |
| 0x20 | Timer (IRQ 0) | `timer_interrupt` |
| 0x21 | Keyboard (IRQ 1) | `kbd_interrupt` |
| 0x2E | Disk (ATA) | `ata_interrupt` |

**Walk-through: nhấn phím 'A' trên bàn phím:**

```
1. Bộ điều khiển bàn phím phát tín hiệu ngắt (IRQ 1)
2. CPU hoàn thành instruction đang thực hiện
3. CPU lưu context (registers + IP + flags) lên stack
4. CPU tra bảng IVT với vector 0x21 → nhảy đến kbd_interrupt()
5. ISR đọc scancode từ port 0x60 (phím 'A' = 0x1E)
6. ISR thêm vào keyboard buffer trong kernel
7. ISR kết thúc: EOI (End Of Interrupt) gửi đến PIC/APIC
8. CPU khôi phục context, tiếp tục instruction bị gián đoạn
```
Toàn bộ quá trình: **~1-10 microseconds**.

### 2.3. Ngắt cứng vs ngắt mềm

| Loại | Nguồn | Ví dụ |
|------|-------|-------|
| **Hardware interrupt (ngắt cứng)** | Tín hiệu điện từ thiết bị ngoại vi | Bàn phím, mạng, đồng hồ, disk |
| **Software interrupt (ngắt mềm / trap)** | Lệnh phần mềm (`INT n`, `syscall`) | System call (int 0x80), chia cho 0 |
| **Exception** | CPU tự sinh khi lỗi | Page fault, invalid opcode |

**Top half vs Bottom half:**
Xử lý ngắt dài có thể block ngắt khác → chia làm 2 phần:
- **Top half (ISR)**: thực hiện nhanh nhất có thể — lưu data, schedule bottom half, EOI.
- **Bottom half (softirq / tasklet / workqueue)**: xử lý nặng sau trong kernel context ít ưu tiên hơn (vd: rebuild socket buffer, gọi protocol handler).

⚠ **Lỗi thường gặp:**
- Nhầm "ngắt" với "exception" — exception do CPU tự sinh (page fault), ngắt do phần cứng bên ngoài.
- Nghĩ ISR có thể chạy lâu — ISR phải cực kỳ ngắn gọn. Code dài trong ISR gây missed interrupts và hệ thống bị lag.

🔁 **Dừng lại tự kiểm tra:**

Lệnh `read()` của một process đọc từ ổ đĩa SSD: CPU sử dụng interrupt-driven I/O hay polling? Mô tả flow.

<details>
<summary>Đáp án</summary>

Interrupt-driven I/O:
1. Process gọi syscall `read()` → kernel gửi lệnh I/O đến SSD controller.
2. Kernel đánh dấu process là WAITING, switch sang process khác.
3. Sau vài microseconds đến mili-seconds, SSD controller phát ngắt (IRQ).
4. CPU lưu context, nhảy vào ISR của disk driver.
5. ISR copy dữ liệu từ DMA buffer vào page cache của kernel.
6. ISR đánh thức process đang chờ (mark READY).
7. Scheduler cho process chạy lại, `read()` return với dữ liệu.

Polling sẽ tốn 100% CPU ngồi hỏi SSD "mày xong chưa?" — không thể chạy process khác trong lúc chờ.

</details>

📝 **Tóm tắt mục 2:**
- Polling: CPU spin-wait, đơn giản, tốn CPU. Interrupt: CPU làm việc khác, hiệu quả.
- IVT: bảng ánh xạ vector → ISR. Mỗi thiết bị có IRQ riêng.
- ISR phải ngắn gọn; xử lý nặng giao cho bottom half.
- Ngắt cứng (phần cứng) vs ngắt mềm (syscall, trap, exception).

---

## 3. Device Driver & Kernel Module

### 3.1. Driver là gì và tại sao cần?

💡 **Trực giác — Phiên dịch viên:**
Nhà sản xuất card đồ họa (NVIDIA) và nhà sản xuất OS (Linus Torvalds) không hẹn nhau trước để quy định giao thức giao tiếp. Driver là "phiên dịch viên" — biết cả hai ngôn ngữ: ngôn ngữ kernel (syscall, VFS, block device interface...) và ngôn ngữ phần cứng (thanh ghi, DMA, interrupt line).

**Device driver** là module code kernel cung cấp giao diện chuẩn (abstraction) cho phần cứng:
- Trên: nói chuyện với kernel qua API chuẩn (`file_operations`, `net_device`, `block_device_operations`).
- Dưới: nói chuyện với phần cứng qua `ioport`, `ioremap`, `DMA`, `request_irq`.

### 3.2. Kernel module — nạp/gỡ động

Linux cho phép nạp driver **tại runtime** mà không cần biên dịch lại kernel:

```bash
# Nạp module
sudo modprobe <module_name>       # tự giải quyết dependency
sudo insmod module.ko             # nạp trực tiếp file

# Gỡ module
sudo rmmod <module_name>
sudo modprobe -r <module_name>    # gỡ + dependency không dùng

# Xem module đang nạp
lsmod                             # list module đang active
modinfo <module_name>             # thông tin module

# Module được tự động nạp khi phát hiện thiết bị (udev rules)
```

**Skeleton một kernel module đơn giản (C):**
```c
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Tên bạn");
MODULE_DESCRIPTION("Module ví dụ");

static int __init my_init(void) {
    printk(KERN_INFO "Hello from kernel!\n");
    return 0;  // 0 = success
}

static void __exit my_exit(void) {
    printk(KERN_INFO "Goodbye from kernel!\n");
}

module_init(my_init);
module_exit(my_exit);
```

### 3.3. Phân loại driver

| Loại | Giao diện kernel | Ví dụ |
|------|-----------------|-------|
| **Character device** | `read/write/ioctl` từng byte | Serial port, keyboard, /dev/random |
| **Block device** | Đọc/ghi theo block, có buffer cache | HDD, SSD, USB flash |
| **Network device** | Gửi/nhận packet (sk_buff) | Ethernet, Wi-Fi, VPN |

### 3.4. Luồng I/O từ user đến phần cứng

<svg viewBox="0 0 560 482" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Đường đi I/O: user process read qua VFS, block layer, device driver, hardware controller (DMA); ngắt ISR copy vào page cache rồi đánh thức process">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <rect x="100.0" y="14.0" width="360.0" height="58.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="280.0" y="39.2" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">User process</text>
  <text x="280.0" y="55.2" fill="#475569" font-size="11" text-anchor="middle">read(&quot;/dev/sda1&quot;)</text>
  <line x1="280.0" y1="74.0" x2="280.0" y2="94.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="100.0" y="96.0" width="360.0" height="58.0" rx="8" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="2"/>
  <text x="280.0" y="121.2" fill="#7c3aed" font-size="12" text-anchor="middle" font-weight="700">VFS (Virtual File System)</text>
  <text x="280.0" y="137.2" fill="#475569" font-size="11" text-anchor="middle">giao diện file chuẩn</text>
  <line x1="280.0" y1="156.0" x2="280.0" y2="176.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="100.0" y="178.0" width="360.0" height="58.0" rx="8" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="2"/>
  <text x="280.0" y="203.2" fill="#7c3aed" font-size="12" text-anchor="middle" font-weight="700">Block layer</text>
  <text x="280.0" y="219.2" fill="#475569" font-size="11" text-anchor="middle">scheduling I/O (CFQ, deadline, mq-deadline)</text>
  <line x1="280.0" y1="238.0" x2="280.0" y2="258.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="100.0" y="260.0" width="360.0" height="58.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="280.0" y="285.2" fill="#b45309" font-size="12" text-anchor="middle" font-weight="700">Device driver</text>
  <text x="280.0" y="301.2" fill="#475569" font-size="11" text-anchor="middle">ata_piix, nvme, virtio-blk</text>
  <line x1="280.0" y1="320.0" x2="280.0" y2="340.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="100.0" y="342.0" width="360.0" height="58.0" rx="8" fill="#f1f5f9" fill-opacity="1" stroke="#94a3b8" stroke-width="2"/>
  <text x="280.0" y="367.2" fill="#94a3b8" font-size="12" text-anchor="middle" font-weight="700">Hardware controller</text>
  <text x="280.0" y="383.2" fill="#475569" font-size="11" text-anchor="middle">DMA transfer</text>
  <line x1="280.0" y1="402.0" x2="280.0" y2="422.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="100.0" y="424.0" width="360.0" height="44.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="280.0" y="450.2" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">Ngắt → ISR → copy vào page cache → wake process</text>
</svg>

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Driver bị lỗi thì sao?"* — Vì driver chạy trong kernel space, bug có thể gây kernel panic (màn hình xanh/đen). Đây là lý do driver hardware thường được hãng chip kiểm tra cực kỹ, và lý do Linux có `DKMS` để driver bên thứ ba tự rebuild khi kernel update.
- *"Tại sao không để driver chạy trong user space?"* — Có thể! Mô hình này gọi là FUSE (file system) hay UIO (user-space I/O). Ưu điểm: bug không crash kernel. Nhược điểm: mỗi I/O cần context switch user↔kernel → latency cao.
- *"udev là gì?"* — Daemon quản lý thiết bị động: khi cắm USB, kernel tạo event → udev nhận → nạp driver đúng → tạo `/dev/sdb` → trigger action (auto-mount).

⚠ **Lỗi thường gặp:**
- Nhầm driver với firmware — firmware là code chạy trên microcontroller của thiết bị (bên trong card mạng), driver là code trên host CPU.
- Nghĩ driver phải compile cùng kernel — Không. Kernel module (`.ko`) compile riêng, nạp động. Một số driver builtin thì đúng phải compile cùng kernel.

🔁 **Dừng lại tự kiểm tra:**

Bạn cắm USB Wi-Fi vào laptop Linux. Liệt kê các bước xảy ra từ lúc cắm đến lúc `iwconfig` thấy giao diện mới.

<details>
<summary>Đáp án</summary>

1. USB controller phát ngắt → kernel nhận USB attach event.
2. Kernel đọc USB Vendor ID / Product ID từ thiết bị.
3. **udev** nhận event, tra `/lib/modules/*/modules.alias` tìm driver phù hợp (vd `rtl8xxxu`).
4. udev gọi `modprobe rtl8xxxu` → kernel nạp module.
5. Driver `rtl8xxxu` probe thiết bị, đăng ký `net_device` với kernel.
6. udev tạo `/dev/wlan0` (nếu cần), trigger script network setup.
7. `iwconfig` giờ thấy `wlan0`.

</details>

📝 **Tóm tắt mục 3:**
- Driver = phiên dịch giữa kernel API và phần cứng cụ thể.
- Kernel module nạp/gỡ động tại runtime (`modprobe`, `insmod`, `rmmod`).
- 3 loại device: character, block, network — mỗi loại có giao diện kernel khác nhau.
- udev quản lý thiết bị động — tự nạp driver khi cắm thiết bị.

---

## Bài tập

**Bài 1.** Liệt kê 5 bước chính của chuỗi boot từ nhấn nút nguồn đến khi shell hiện ra. Với mỗi bước, mô tả ngắn gọn nhiệm vụ của nó.

**Bài 2.** So sánh BIOS MBR và UEFI GPT: (a) giới hạn kích thước ổ đĩa, (b) số phân vùng, (c) bảo mật khi boot. Giải thích tại sao máy tính mới không còn dùng BIOS.

**Bài 3.** Vẽ sơ đồ luồng xử lý khi người dùng gõ một phím trên bàn phím, từ tín hiệu điện đến ký tự hiện ra trong terminal. Đánh dấu rõ chỗ nào là interrupt, ISR, bottom half, kernel buffer, user space.

**Bài 4.** Một lập trình viên viết driver đọc cảm biến nhiệt độ. Driver dùng polling trong ISR (spin-loop 100ms chờ sensor). Giải thích vấn đề này và đề xuất giải pháp đúng.

---

## Lời giải chi tiết

### Bài 1

5 bước chính:
1. **Firmware (BIOS/UEFI)**: Chạy POST — kiểm tra RAM, CPU, thiết bị. Tìm thiết bị boot theo ưu tiên (disk, USB). Nạp MBR/ESP vào RAM và nhảy vào.
2. **Bootloader (GRUB)**: Đọc menu boot, nạp kernel image (`vmlinuz`) và `initramfs` vào RAM, truyền kernel cmdline, nhảy vào entry point kernel.
3. **Kernel initialization**: Giải nén, thiết lập MMU và page tables, khởi tạo subsystem (memory, scheduler, VFS), nạp driver từ initramfs để mount root filesystem.
4. **Init/systemd (PID 1)**: Đọc unit files, resolve dependency, start service song song (network, logging, display manager).
5. **User space**: Login manager (getty/GDM) hiện prompt. Sau đăng nhập: shell hoặc desktop environment sẵn sàng.

---

### Bài 2

**(a) Giới hạn kích thước:**
- BIOS/MBR: địa chỉ LBA 32-bit → tối đa $2^{32} \times 512$ bytes = **2 TB**.
- UEFI/GPT: địa chỉ LBA 64-bit → tối đa $2^{64} \times 512$ bytes $\approx$ **9.4 ZB** (zettabytes).

**(b) Số phân vùng:**
- MBR: 4 primary partition. Muốn thêm → phải dùng extended + logical (phức tạp, giới hạn mềm ~26 partition).
- GPT: 128 phân vùng theo chuẩn (có thể cấu hình nhiều hơn), không cần khái niệm extended.

**(c) Bảo mật:**
- BIOS/MBR: không có cơ chế xác thực — phần mềm độc hại có thể ghi đè MBR và chạy trước OS (bootkits).
- UEFI: **Secure Boot** — firmware chỉ chạy bootloader có chữ ký số hợp lệ (từ CA được trust). Chặn bootkit và rootkit ở boot phase.

**Tại sao không dùng BIOS nữa:** Giới hạn 2 TB không còn phù hợp (SSD 4 TB phổ biến), 4 phân vùng quá ít, không có bảo mật boot, giao diện 16-bit cổ lỗi, boot chậm hơn UEFI.

---

### Bài 3

<svg viewBox="0 0 560 646" style="max-width:560px;width:100%;height:auto;display:block;margin:14px auto;background:#f8fafc;border-radius:8px" role="img" aria-label="Từ nhấn phím A đến hiển thị: bộ điều khiển bàn phím → IRQ 1 qua APIC → CPU lưu context → ISR top half → bottom half → tty driver → shell read() và hiển thị">
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1a202c"/></marker></defs>
  <rect x="100.0" y="14.0" width="360.0" height="44.0" rx="8" fill="#f1f5f9" fill-opacity="1" stroke="#94a3b8" stroke-width="2"/>
  <text x="280.0" y="40.2" fill="#94a3b8" font-size="12" text-anchor="middle" font-weight="700">Nhấn phím 'A'</text>
  <line x1="280.0" y1="60.0" x2="280.0" y2="78.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="100.0" y="80.0" width="360.0" height="58.0" rx="8" fill="#dbeafe" fill-opacity="1" stroke="#1d4ed8" stroke-width="2"/>
  <text x="280.0" y="105.2" fill="#1d4ed8" font-size="12" text-anchor="middle" font-weight="700">Bộ điều khiển bàn phím</text>
  <text x="280.0" y="121.2" fill="#475569" font-size="11" text-anchor="middle">scan matrix phát tín hiệu điện</text>
  <line x1="280.0" y1="140.0" x2="280.0" y2="158.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="100.0" y="160.0" width="360.0" height="58.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="280.0" y="185.2" fill="#b45309" font-size="12" text-anchor="middle" font-weight="700">Hardware interrupt (IRQ 1)</text>
  <text x="280.0" y="201.2" fill="#475569" font-size="11" text-anchor="middle">gửi đến CPU qua APIC</text>
  <line x1="280.0" y1="220.0" x2="280.0" y2="238.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="100.0" y="240.0" width="360.0" height="58.0" rx="8" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="2"/>
  <text x="280.0" y="265.2" fill="#7c3aed" font-size="12" text-anchor="middle" font-weight="700">CPU</text>
  <text x="280.0" y="281.2" fill="#475569" font-size="11" text-anchor="middle">xong instruction hiện tại, lưu context lên stack</text>
  <line x1="280.0" y1="300.0" x2="280.0" y2="318.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="100.0" y="320.0" width="360.0" height="72.0" rx="8" fill="#fee2e2" fill-opacity="1" stroke="#dc2626" stroke-width="2"/>
  <text x="280.0" y="344.2" fill="#dc2626" font-size="12" text-anchor="middle" font-weight="700">ISR (top half): kbd_interrupt()</text>
  <text x="280.0" y="360.2" fill="#475569" font-size="11" text-anchor="middle">đọc scancode 0x1E, ghi ring buffer,</text>
  <text x="280.0" y="376.2" fill="#475569" font-size="11" text-anchor="middle">schedule bottom half, gửi EOI</text>
  <line x1="280.0" y1="394.0" x2="280.0" y2="412.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="100.0" y="414.0" width="360.0" height="58.0" rx="8" fill="#fef3c7" fill-opacity="1" stroke="#b45309" stroke-width="2"/>
  <text x="280.0" y="439.2" fill="#b45309" font-size="12" text-anchor="middle" font-weight="700">Bottom half: input_handle_event()</text>
  <text x="280.0" y="455.2" fill="#475569" font-size="11" text-anchor="middle">scancode → keycode → 'A', ghi line discipline</text>
  <line x1="280.0" y1="474.0" x2="280.0" y2="492.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="100.0" y="494.0" width="360.0" height="58.0" rx="8" fill="#ede9fe" fill-opacity="1" stroke="#7c3aed" stroke-width="2"/>
  <text x="280.0" y="519.2" fill="#7c3aed" font-size="12" text-anchor="middle" font-weight="700">tty driver (kernel)</text>
  <text x="280.0" y="535.2" fill="#475569" font-size="11" text-anchor="middle">echo ký tự, ghi read buffer của fd</text>
  <line x1="280.0" y1="554.0" x2="280.0" y2="572.0" stroke="#1a202c" stroke-width="1.8" marker-end="url(#ar)"/>
  <rect x="100.0" y="574.0" width="360.0" height="58.0" rx="8" fill="#dcfce7" fill-opacity="1" stroke="#15803d" stroke-width="2"/>
  <text x="280.0" y="599.2" fill="#15803d" font-size="12" text-anchor="middle" font-weight="700">User space: shell/terminal</text>
  <text x="280.0" y="615.2" fill="#475569" font-size="11" text-anchor="middle">read() trả về 'A', hiển thị lên màn hình</text>
</svg>

---

### Bài 4

**Vấn đề:** ISR phải cực kỳ ngắn. Spin-loop 100ms trong ISR sẽ:
- Chặn ngắt khác trong 100ms (trên single-core) hoặc giữ lock.
- Tăng interrupt latency toàn hệ thống.
- Gây watchdog timer timeout → kernel panic.
- Hoàn toàn lãng phí CPU.

**Giải pháp đúng:**

Tùy đặc điểm sensor:

1. **Sensor hỗ trợ interrupt**: Cấu hình sensor phát ngắt khi có dữ liệu mới. ISR chỉ đọc giá trị (vài microseconds) rồi return.

2. **Sensor cần polling**: Dùng **workqueue** hoặc **hrtimer** — schedule đọc sensor trong kernel worker thread định kỳ, không trong ISR:
   ```c
   // Trong ISR: chỉ schedule work
   static irqreturn_t sensor_isr(int irq, void *dev) {
       schedule_delayed_work(&sensor_work, msecs_to_jiffies(10));
       return IRQ_HANDLED;
   }
   // Actual reading: trong work queue context
   static void sensor_work_fn(struct work_struct *work) {
       u32 val = sensor_read_register(BASE + TEMP_REG);
       // Xử lý val...
   }
   ```

3. **Hoặc dùng timer callback** cho polling định kỳ không cần ISR:
   ```c
   hrtimer_start(&timer, ktime_set(0, 100*NSEC_PER_MSEC), HRTIMER_MODE_REL);
   ```

---

## Liên kết và bài tiếp theo

- **Bài tiếp theo:** [Lesson 07 — Quan sát & Hiệu năng](../lesson-07-observability-performance/) — đo đạc và tối ưu hệ thống đang chạy.
- **Bài trước:** [Lesson 05 — Lập lịch thời gian thực](../lesson-05-realtime-scheduling/).
- **Liên quan:** [Lesson 07 — I/O & Disk Scheduling](../../02-Memory-Storage/lesson-07-io-disk-scheduling/) — scheduling I/O requests.

---

## 📝 Tổng kết Lesson 06

- **Chuỗi boot**: Firmware → POST → Bootloader (GRUB) → Kernel init (initramfs → mount root) → systemd (PID 1) → User space.
- **UEFI thay BIOS**: GPT (>2TB, 128 phân vùng), Secure Boot, giao diện 64-bit.
- **Ngắt (interrupt)**: CPU lưu context → tra IVT → chạy ISR → EOI → khôi phục context. ISR phải ngắn; xử lý nặng giao bottom half.
- **Polling vs interrupt**: polling đơn giản nhưng tốn CPU; interrupt hiệu quả nhưng có overhead context switch.
- **Device driver**: phiên dịch kernel API ↔ phần cứng. Kernel module nạp/gỡ động.
- **udev**: tự phát hiện thiết bị mới, nạp driver phù hợp, tạo device node.
