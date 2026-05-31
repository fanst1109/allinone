// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: OperatingSystems/03-Advanced-Modern/lesson-01-virtualization/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Ảo hoá & Hypervisor

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được **ảo hoá (virtualization)** là gì và vì sao ngành điện toán đám mây không thể thiếu nó.
- Phân biệt **hypervisor type 1** (bare-metal) và **type 2** (hosted) qua kiến trúc và ví dụ thực tế.
- Mô tả cơ chế **trap-and-emulate** — cách hypervisor chặn và xử lý lệnh đặc quyền từ guest OS.
- Giải thích vấn đề ảo hoá x86 cổ điển và ba giải pháp: paravirtualization, binary translation, hỗ trợ phần cứng (Intel VT-x / AMD-V).
- Trình bày **ảo hoá bộ nhớ** qua shadow page table và nested page table, liên hệ với paging đã học.

## Kiến thức tiền đề

- [Tầng 1 — Lesson 01: Kernel & System Call](../../01-Foundations-Processes/lesson-01-os-kernel-syscall/): ring 0 vs ring 3, lệnh đặc quyền.
- [Tầng 2 — Lesson 02: Paging](../../02-Memory-Storage/lesson-02-paging/): bảng trang, địa chỉ ảo → vật lý — sẽ được mở rộng trong mục 5.

---

## 1. Ảo hoá là gì và vì sao cần?

### 1.1. Bài toán đặt ra

💡 **Trực giác — Tòa nhà văn phòng:**
Một tòa nhà 30 tầng nhưng chỉ có 3 công ty thuê, mỗi công ty dùng 1 tầng. 27 tầng còn lại bỏ không — lãng phí cực lớn. Giải pháp: chia thành **văn phòng ảo** — mỗi tầng ngăn vách thành 10 căn, mỗi công ty thuê nhiều căn nhỏ đúng nhu cầu. Tòa nhà = máy chủ vật lý; căn văn phòng ảo = máy ảo (virtual machine, VM).

Một máy chủ vật lý (physical server) hiện đại có 96 core CPU, 512 GB RAM, nhưng một ứng dụng web bình thường chỉ dùng 2 core và 4 GB. Nếu dành hẳn một máy cho một ứng dụng, **hiệu suất sử dụng phần cứng (utilization) chỉ ~2-5%** — gần như toàn bộ năng lực phần cứng bị lãng phí.

**Ảo hoá (virtualization)** giải quyết vấn đề này bằng cách tạo ra nhiều **máy ảo (virtual machine, VM)** — mỗi máy ảo trông như một máy tính hoàn chỉnh riêng biệt (có CPU ảo, RAM ảo, ổ đĩa ảo, card mạng ảo) — trong khi tất cả cùng chạy trên một phần cứng vật lý duy nhất.

### 1.2. Ba lý do chính cần ảo hoá

**1. Tận dụng phần cứng (server consolidation):**
- Trước ảo hoá: 1 ứng dụng / 1 máy vật lý → utilization ~5–15%.
- Sau ảo hoá: 20–30 VM / 1 máy vật lý → utilization ~60–80%.
- Ví dụ cụ thể: một công ty có 50 máy chủ vật lý, mỗi máy dùng 10% tài nguyên → sau khi ảo hoá, có thể gộp vào 5–8 máy vật lý, tiết kiệm ~80% chi phí điện và làm mát.

**2. Cô lập (isolation):**
- Mỗi VM chạy trong không gian hoàn toàn tách biệt. VM-A bị crash không ảnh hưởng VM-B.
- VM-A chạy Linux không ảnh hưởng VM-B chạy Windows trên cùng phần cứng.
- Bảo mật: nếu attacker chiếm được VM-A, họ không thể truy cập VM-B hoặc hypervisor.

**3. Tính linh động (flexibility & cloud):**
- VM là một file ảnh (snapshot). Di chuyển VM từ máy này sang máy khác = copy file.
- **Live migration**: di chuyển VM đang chạy giữa hai máy vật lý mà không cần tắt — zero downtime.
- Nền tảng của cloud computing: AWS EC2, Google Compute Engine, Azure VM đều là các VM.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Ảo hoá có làm chậm ứng dụng không?"* — Có, nhưng overhead hiện đại rất thấp: CPU overhead ~2–5% (nhờ VT-x/AMD-V), network overhead ~5–10%. Nhiều workload không phân biệt được VM với máy vật lý.
- *"Container (Docker) có phải ảo hoá không?"* — Không phải ảo hoá theo nghĩa này. Container dùng chung kernel host; VM có kernel riêng hoàn toàn. Xem [Lesson 02 — Container](../lesson-02-containers/).
- *"VM và dual-boot khác gì nhau?"* — Dual-boot chạy một OS tại một thời điểm, phần cứng vật lý giao trực tiếp cho OS. VM chạy nhiều OS đồng thời, phần cứng được ảo hoá.

📝 **Tóm tắt mục 1:**
- Ảo hoá = tạo nhiều máy ảo độc lập trên một phần cứng vật lý.
- Ba lợi ích: tận dụng tài nguyên, cô lập, tính linh động.
- Nền tảng của cloud computing hiện đại.

---

## 2. Hypervisor: Type 1 vs Type 2

### 2.1. Thành phần cốt lõi — Hypervisor (Virtual Machine Monitor)

**Hypervisor** (còn gọi là **VMM — Virtual Machine Monitor**) là phần mềm tạo và quản lý các máy ảo. Nó đứng giữa phần cứng và các guest OS, cấp phát tài nguyên ảo cho từng VM.

Ba nhiệm vụ chính của hypervisor:
1. **Phân vùng tài nguyên**: chia CPU, RAM, I/O thành các phần ảo cho từng VM.
2. **Cô lập**: đảm bảo VM-A không truy cập được vùng nhớ của VM-B.
3. **Trap & emulate**: chặn các lệnh đặc quyền từ guest OS và xử lý thay (xem mục 3).

### 2.2. Hypervisor Type 1 — Bare-Metal

💡 **Trực giác:** Hypervisor type 1 là "siêu OS" — nó chạy **trực tiếp trên phần cứng**, không cần OS host bên dưới. Nó nhỏ và chuyên biệt: chỉ làm một việc là tạo và quản lý VM, không có GUI, không có browser, không có app thông thường.

**Kiến trúc:**
\`\`\`
┌──────────────────────────────────────────┐
│  VM-A          │  VM-B          │  VM-C   │
│  Guest OS + App│  Guest OS + App│  App     │
├──────────────────────────────────────────┤
│         Hypervisor Type 1 (VMM)          │
├──────────────────────────────────────────┤
│              Phần cứng vật lý            │
│         (CPU, RAM, NIC, Disk)            │
└──────────────────────────────────────────┘
\`\`\`

**Ví dụ thực tế:**
- **VMware ESXi**: phổ biến nhất trong doanh nghiệp.
- **Microsoft Hyper-V**: tích hợp trong Windows Server.
- **KVM (Kernel-based Virtual Machine)**: module của Linux kernel — khi cài KVM, Linux trở thành hypervisor type 1. Dùng trên toàn bộ hạ tầng OpenStack và nhiều cloud.
- **Xen**: dùng bởi Amazon AWS EC2 (thế hệ cũ).

**Ưu điểm:** hiệu năng cao (ít tầng trung gian), bảo mật tốt (attack surface nhỏ).

**Nhược điểm:** không chạy app thông thường, chỉ dùng cho server — không ai dùng ESXi để lướt web.

### 2.3. Hypervisor Type 2 — Hosted

💡 **Trực giác:** Hypervisor type 2 là **một ứng dụng chạy trên OS host**. Bạn cài Windows hoặc macOS bình thường, rồi cài VirtualBox lên như cài bất kỳ app nào. VirtualBox là hypervisor type 2.

**Kiến trúc:**
\`\`\`
┌──────────────────────────────────────────┐
│  VM-A (Guest OS + App)                   │
├──────────────────────────────────────────┤
│  Hypervisor Type 2 (ứng dụng trên host)  │
├──────────────────────────────────────────┤
│  Host OS (Windows / macOS / Linux)       │
├──────────────────────────────────────────┤
│              Phần cứng vật lý            │
└──────────────────────────────────────────┘
\`\`\`

**Ví dụ thực tế:**
- **Oracle VirtualBox**: miễn phí, đa nền tảng — dùng phổ biến khi học OS, dev.
- **VMware Workstation / Fusion**: trả phí, hiệu năng tốt hơn VirtualBox.
- **QEMU**: mạnh và linh hoạt, dùng kết hợp với KVM trên Linux.

**Ưu điểm:** dễ cài, dùng được cùng lúc với app thông thường — lý tưởng cho developer test cross-platform.

**Nhược điểm:** overhead cao hơn type 1 (phải đi qua host OS), bảo mật kém hơn (nếu host OS bị tấn công, hypervisor cũng có thể bị).

### 2.4. So sánh nhanh

| Tiêu chí | Type 1 (bare-metal) | Type 2 (hosted) |
|----------|---------------------|-----------------|
| Chạy trên | Phần cứng trực tiếp | Host OS |
| Hiệu năng | Cao (~2–5% overhead) | Thấp hơn (~10–20% overhead) |
| Bảo mật | Tốt hơn | Kém hơn |
| Dùng cho | Server, cloud, production | Dev, học tập, test |
| Ví dụ | ESXi, KVM, Hyper-V | VirtualBox, VMware Workstation |

⚠ **Lỗi thường gặp:** Nhiều người nghĩ "KVM là type 2 vì cài trên Linux". Sai. Khi cài KVM module, Linux kernel trở thành hypervisor type 1 — kernel Linux không còn là OS host thông thường nữa mà hoạt động như VMM trực tiếp điều phối phần cứng. Đây là lý do KVM dùng được trong production với hiệu năng rất cao.

🔁 **Dừng lại tự kiểm tra:**

Bạn là developer muốn test ứng dụng trên Ubuntu trong khi máy đang chạy macOS. Bạn nên dùng type 1 hay type 2? Tại sao?

<details>
<summary>Đáp án</summary>
Type 2 (VirtualBox, VMware Fusion). Lý do: bạn cần dùng macOS song song để code, không thể cài type 1 (hypervisor sẽ thay thế hoàn toàn macOS). Type 2 cho phép chạy Ubuntu VM như một cửa sổ ứng dụng cùng lúc với macOS.
</details>

📝 **Tóm tắt mục 2:**
- Hypervisor = phần mềm tạo và quản lý VM.
- Type 1 (bare-metal): chạy thẳng trên phần cứng, hiệu năng cao, dùng trong server/cloud.
- Type 2 (hosted): chạy trên OS host, dễ dùng, dành cho developer/học tập.
- KVM là type 1 dù cài trên Linux.

---

## 3. Cơ chế Trap-and-Emulate

### 3.1. Vấn đề: Lệnh đặc quyền trong VM

Khi ta chạy Guest OS trong VM, guest OS nghĩ mình đang chạy trực tiếp trên phần cứng. Nó sẽ cố chạy các **lệnh đặc quyền (privileged instructions)** — như \`HLT\` (dừng CPU), \`IN\`/\`OUT\` (truy cập I/O port), thay đổi thanh ghi điều khiển (\`CR0\`, \`CR3\` để đổi bảng trang), tắt ngắt...

Nhưng nếu guest OS thực sự chạy những lệnh này trực tiếp, nó sẽ ảnh hưởng đến toàn bộ máy vật lý — VM khác cũng bị ảnh hưởng, hoặc tệ hơn là phá vỡ hypervisor.

**Câu hỏi:** Làm sao hypervisor cho phép guest OS "nghĩ mình đang dùng phần cứng thật" mà không thực sự cho nó quyền điều khiển phần cứng?

### 3.2. Giải pháp: Trap-and-Emulate

💡 **Trực giác — Người phiên dịch:**
Giả sử một đại sứ nước ngoài muốn ra lệnh trực tiếp cho cảnh sát địa phương. Thay vì để họ ra lệnh thật, mọi lệnh của đại sứ đều phải qua phiên dịch viên (hypervisor). Phiên dịch viên nghe lệnh, kiểm tra lệnh hợp lệ không, rồi thực thi thay. Đại sứ không biết lệnh của mình không được thực thi trực tiếp.

**Nguyên lý:**

1. **Trap (bẫy):** Hypervisor chạy ở ring 0 (kernel mode thật). Guest OS được hạ xuống ring 1 hoặc ring 3 (user mode). Khi guest OS thực thi lệnh đặc quyền, CPU phát hiện nó đang chạy không đủ quyền → tự động **trap** (chuyển điều khiển) về hypervisor.

2. **Emulate (giả lập):** Hypervisor nhận trap, kiểm tra lệnh guest OS muốn thực thi, rồi **giả lập** kết quả của lệnh đó cho guest OS mà không thực sự cho guest OS chạm vào phần cứng thật.

**Ví dụ cụ thể — Guest OS muốn tắt ngắt:**

\`\`\`
Guest OS:      CLI   ; muốn tắt ngắt (lệnh đặc quyền)
               ↓
CPU nhận ra guest đang ở ring 3, không có quyền:
               → Trap → chuyển sang hypervisor (ring 0)
               ↓
Hypervisor:   1. Ghi nhận: "VM-A muốn tắt ngắt"
              2. Cập nhật trạng thái ảo: set vIF=0 (virtual Interrupt Flag)
              3. KHÔNG tắt ngắt thật trên CPU vật lý
              4. Trả quyền điều khiển lại Guest OS
               ↓
Guest OS nghĩ ngắt đã tắt, tiếp tục chạy bình thường.
\`\`\`

**Ví dụ cụ thể — Guest OS muốn đọc thời gian hệ thống:**

\`\`\`
Guest OS:      IN al, 0x70   ; đọc thanh ghi RTC (real-time clock)
               ↓
Trap → Hypervisor
               ↓
Hypervisor:   1. Đọc thời gian thật từ phần cứng
              2. Tính "thời gian ảo" cho VM này
              3. Trả giá trị cho guest OS (có thể khác thời gian thật)
\`\`\`

### 3.3. Vấn đề với x86 cổ điển — "Sensitive non-privileged instructions"

Để trap-and-emulate hoạt động, **mọi lệnh đặc quyền phải gây trap khi chạy không đủ quyền**.

CPU x86 cổ điển (trước Intel VT-x 2005) có vấn đề: một số lệnh **nhạy cảm** (làm thay đổi hoặc đọc trạng thái đặc quyền của máy) nhưng **không gây trap** khi chạy ở user mode — thay vào đó chúng âm thầm trả về giá trị sai hoặc không làm gì.

Ví dụ lệnh \`POPF\` (Pop Flags from Stack): ở kernel mode nó thay đổi flag ngắt IF; ở user mode nó âm thầm bỏ qua bit IF mà không báo lỗi. Guest OS nghĩ IF đã đổi nhưng thực ra không — và hypervisor không biết có lệnh này xảy ra.

**Danh sách 17 lệnh x86 "khó ảo hoá"** theo Popek & Goldberg (1974): \`SGDT\`, \`SIDT\`, \`SLDT\`, \`SMSW\`, \`PUSHF\`, \`POPF\`, \`LAR\`, \`LSL\`, \`VERR\`, \`VERW\`, \`POP\`, \`PUSH\` với segment register, \`CALL\`/\`JMP\` segment...

Ba giải pháp cho vấn đề này:

### 3.4. Ba giải pháp ảo hoá x86

#### Giải pháp 1: Binary Translation (VMware workstation cổ điển)

Hypervisor **dịch nhanh (JIT compile)** mã nhị phân của guest OS trước khi chạy. Các lệnh nhạy cảm được thay bằng code an toàn tương đương.

- Ưu điểm: không cần thay đổi guest OS, không cần phần cứng đặc biệt.
- Nhược điểm: overhead dịch mã ~10–20%, phức tạp, khó debug.

#### Giải pháp 2: Paravirtualization

💡 **Trực giác:** Thay vì "lừa" guest OS nghĩ mình đang chạy trên phần cứng thật, ta sửa guest OS để nó **biết mình đang chạy trong VM** và chủ động gọi hypervisor thay vì dùng lệnh đặc quyền.

Guest OS được **sửa mã nguồn** để thay các lệnh đặc quyền bằng **hypercall** — lời gọi trực tiếp đến hypervisor (tương tự system call trong OS thông thường).

\`\`\`
Thay vì:    CLI   (lệnh đặc quyền)
Paravirt:   HYPERCALL(DISABLE_INTERRUPTS)  → gọi thẳng hypervisor
\`\`\`

- **Xen** dùng paravirtualization: Guest OS (Linux) phải biên dịch lại với Xen driver.
- Ưu điểm: overhead rất thấp (~1–3%), hiệu năng gần phần cứng thật.
- Nhược điểm: phải sửa guest OS — không dùng được Windows bình thường, không ảo hoá được hệ điều hành đóng nguồn.

#### Giải pháp 3: Hỗ trợ phần cứng (Intel VT-x / AMD-V)

Intel (2005) và AMD (2006) bổ sung hỗ trợ ảo hoá trực tiếp vào CPU — đây là giải pháp tốt nhất và được dùng phổ biến hiện nay.

**Nguyên lý VT-x:**
- Tạo thêm **ring -1** (gọi là VMX root mode) — hypervisor chạy ở đây.
- Guest OS vẫn chạy ở ring 0 (VMX non-root mode) — nhưng ring 0 này bị hạn chế so với ring 0 thật.
- Mọi lệnh đặc quyền trong VMX non-root đều **tự động trap** về hypervisor ở ring -1 — kể cả các lệnh mà x86 cổ điển không trap.

\`\`\`
VT-x Ring hierarchy:
  Ring -1 (VMX root):    Hypervisor (KVM, Hyper-V, ESXi)
  Ring  0 (VMX non-root): Guest OS kernel — "thấy mình ở ring 0 nhưng bị sandbox"
  Ring  3 (VMX non-root): Guest user processes
\`\`\`

Lệnh quan trọng: \`VMLAUNCH\` (bắt đầu chạy VM), \`VMRESUME\` (tiếp tục chạy VM), \`VMEXIT\` (trap từ VM về hypervisor).

- Ưu điểm: không cần sửa guest OS, hiệu năng rất cao, hỗ trợ mọi OS kể cả Windows.
- Nhược điểm: cần CPU hỗ trợ (hầu hết CPU sau 2010 đều có).

⚠ **Lỗi thường gặp:** Nhiều người bật máy ảo thấy lỗi "VT-x is disabled" → cần vào BIOS/UEFI bật tính năng \`Intel Virtualization Technology\` hoặc \`AMD-V\`. Đây là lý do không thể chạy VirtualBox/VMware mà không bật VT-x.

🔁 **Dừng lại tự kiểm tra:**

Guest OS trong VM dùng lệnh \`WRMSR\` để ghi vào MSR (Model-Specific Register) — một lệnh đặc quyền của x86. Với VT-x, chuyện gì xảy ra?

<details>
<summary>Đáp án</summary>
CPU đang chạy ở VMX non-root mode. \`WRMSR\` là lệnh đặc quyền → CPU tự động gây VMEXIT → hypervisor (ở ring -1) nhận điều khiển → hypervisor kiểm tra xem MSR nào đang được ghi, quyết định có cho phép không, và giả lập kết quả → trả điều khiển về guest OS bằng VMRESUME. Guest OS không biết mình không thật sự ghi vào MSR vật lý.
</details>

📝 **Tóm tắt mục 3:**
- Trap-and-emulate: guest OS chạy ở ring thấp; lệnh đặc quyền tự động trap về hypervisor; hypervisor giả lập kết quả.
- x86 cổ điển có 17 lệnh nhạy cảm không trap → ba giải pháp: binary translation, paravirtualization, VT-x/AMD-V.
- VT-x (Intel) / AMD-V: thêm ring -1 cho hypervisor, toàn bộ lệnh đặc quyền đều trap tự động. Giải pháp hiện đại và phổ biến nhất.

---

## 4. Ảo hoá Bộ nhớ

### 4.1. Thách thức — Ba tầng địa chỉ

Trong hệ thống ảo hoá bình thường (không có VM), chỉ có 2 tầng địa chỉ:
- Địa chỉ ảo (Virtual Address, VA) — tiến trình dùng.
- Địa chỉ vật lý (Physical Address, PA) — RAM thật.

Guest OS dùng bảng trang để dịch VA → PA. Nhưng trong VM:

- **Guest Virtual Address (GVA)**: địa chỉ mà tiến trình trong VM nhìn thấy.
- **Guest Physical Address (GPA)**: địa chỉ mà guest OS nghĩ là "RAM vật lý" — thực ra là RAM ảo.
- **Host Physical Address (HPA)**: địa chỉ RAM vật lý thật trên máy host.

Tiến trình trong VM cần: **GVA → GPA → HPA** mới đến RAM thật. Nếu dùng bảng trang thông thường thì cần 2 lần tra bảng trang — rất chậm.

💡 **Trực giác:** Guest OS nghĩ mình có 4 GB RAM từ địa chỉ 0 đến 4G (GPA). Nhưng thực ra, 4 GB "RAM ảo" này được hypervisor ánh xạ vào một đoạn nhỏ của RAM vật lý (HPA), không nhất thiết bắt đầu từ địa chỉ 0.

### 4.2. Giải pháp 1: Shadow Page Table

Hypervisor duy trì một **bảng trang bóng (shadow page table)** cho mỗi tiến trình trong mỗi VM. Bảng trang bóng ánh xạ trực tiếp **GVA → HPA** (bỏ qua GPA).

**Cách hoạt động:**
1. Guest OS cập nhật bảng trang của mình (GVA → GPA).
2. Hypervisor phát hiện cập nhật (qua trap khi guest ghi vào CR3).
3. Hypervisor tính toán tương quan GPA → HPA (từ bảng ánh xạ riêng của nó).
4. Hypervisor cập nhật shadow page table: GVA → HPA.
5. CPU dùng shadow page table để dịch địa chỉ — chỉ 1 bước tra bảng.

**Nhược điểm:**
- Mỗi khi guest OS thay đổi bảng trang, phải trap vào hypervisor để cập nhật shadow table → overhead.
- Phải duy trì một bản copy cho mỗi tiến trình của mỗi VM → tốn bộ nhớ hypervisor.

### 4.3. Giải pháp 2: Nested Page Table (AMD) / Extended Page Table (Intel EPT)

Giải pháp phần cứng hiện đại (AMD từ 2008, Intel từ 2008):

CPU hỗ trợ **2 cấp bảng trang** trực tiếp trong phần cứng:
1. Bảng trang cấp 1 do guest OS quản lý: GVA → GPA.
2. Bảng trang cấp 2 do hypervisor quản lý: GPA → HPA.

CPU tự động thực hiện **nested page walk** — tra 2 bảng trang liên tiếp mà không cần trap vào hypervisor.

**Ví dụ số cụ thể (4-level paging mỗi cấp):**

Dịch GVA = \`0x00007FFFFFFFFFFF\`:

\`\`\`
Bước 1: Guest OS page walk (GVA → GPA):
  PML4[511] → PDP[511] → PD[511] → PT[511] → GPA = 0x1FFF000

Bước 2: Hypervisor page walk (GPA → HPA):
  GPA = 0x1FFF000
  Nested PML4[0] → Nested PDP[0] → Nested PD[15] → Nested PT[511]
  → HPA = 0x8C3F000

Kết quả: tiến trình trong VM đọc địa chỉ GVA=0x7FFFFFFF
         → CPU tự tính → truy cập RAM vật lý tại 0x8C3F000
\`\`\`

- **Ưu điểm:** Không cần shadow page table, không cần trap vào hypervisor cho mọi thay đổi bảng trang.
- **Nhược điểm nhỏ:** Page walk chậm hơn chút (4 × 4 = 16 bước tra bảng thay vì 4). TLB (Translation Lookaside Buffer) cache kết quả → hầu hết lần dịch tiếp theo chỉ tốn 1 bước tra TLB.

**Liên hệ:** Đây là mở rộng của paging bạn đã học tại [Tầng 2 — Lesson 02: Paging](../../02-Memory-Storage/lesson-02-paging/) và [Lesson 03: TLB & Multi-level Paging](../../02-Memory-Storage/lesson-03-tlb-multilevel-paging/).

⚠ **Lỗi thường gặp:** Nhầm "Guest OS quản lý bộ nhớ vật lý thật". Không. Guest OS chỉ thấy GPA — tất cả đều là địa chỉ ảo. Hypervisor mới biết HPA thật sự trên phần cứng. Guest OS không thể trực tiếp can thiệp vào RAM của VM khác.

📝 **Tóm tắt mục 4:**
- Ảo hoá tạo ra 3 tầng địa chỉ: GVA → GPA → HPA.
- Shadow page table: hypervisor duy trì bảng GVA→HPA, overhead trap khi guest cập nhật.
- Nested/Extended Page Table: phần cứng CPU tự xử lý 2 cấp page walk — hiệu năng tốt hơn, overhead thấp.

---

## 5. Ảo hoá I/O

### 5.1. Vấn đề và các phương pháp

**Ảo hoá I/O** (ổ đĩa, card mạng, USB...) phức tạp hơn ảo hoá CPU/bộ nhớ vì thiết bị I/O có trạng thái phần cứng phức tạp.

**Phương pháp 1 — Giả lập thiết bị (device emulation):**
Hypervisor giả lập một thiết bị phần cứng cụ thể (vd: card mạng Intel e1000). Guest OS cài driver bình thường cho e1000. Mọi truy cập I/O của driver trap vào hypervisor, hypervisor dịch sang I/O thật.

- Ưu điểm: dùng bất kỳ driver OS nào, không cần sửa guest.
- Nhược điểm: overhead cao vì mỗi I/O operation gây nhiều trap.

**Phương pháp 2 — Virtio (paravirtual I/O):**
Guest OS cài driver virtio (paravirtual driver) biết mình đang trong VM. Driver virtio giao tiếp với hypervisor qua virtqueue — một hàng đợi bộ nhớ chia sẻ, giảm số lần trap.

- Ưu điểm: hiệu năng rất cao, overhead thấp.
- Nhược điểm: cần cài driver virtio trong guest OS (Linux từ 2.6.24 đã có sẵn).
- QEMU/KVM mặc định dùng virtio cho ổ đĩa (virtio-blk) và mạng (virtio-net).

**Phương pháp 3 — SR-IOV (Single Root I/O Virtualization):**
Phần cứng mạng cao cấp (Intel X710, Mellanox ConnectX) tự chia mình thành nhiều **Virtual Functions (VF)** — mỗi VF là một "card mạng ảo" độc lập. Hypervisor cấp VF trực tiếp cho VM.

- Ưu điểm: hiệu năng gần bằng phần cứng thật (line-rate 40 Gbps), độ trễ rất thấp.
- Nhược điểm: cần phần cứng hỗ trợ SR-IOV, đắt tiền.

---

## Bài tập

**Bài 1:** Một máy chủ có 32 core CPU, 256 GB RAM. Admin muốn chạy 16 VM, mỗi VM có 2 vCPU và 8 GB vRAM.

(a) Tổng tài nguyên ảo yêu cầu là bao nhiêu?
(b) Về mặt lý thuyết có thể làm được không? Giải thích hiện tượng CPU overcommit và memory overcommit.
(c) Điều gì xảy ra nếu tất cả 16 VM đều dùng 8 GB RAM cùng lúc?

---

**Bài 2:** Phân loại từng sản phẩm sau thành hypervisor type 1 hay type 2, giải thích:
(a) KVM trên Ubuntu Server
(b) VirtualBox trên Windows 11
(c) VMware ESXi
(d) VMware Workstation trên macOS
(e) Hyper-V trên Windows Server 2022

---

**Bài 3:** Guest OS trong VM thực thi lệnh \`SGDT\` (Store Global Descriptor Table) — lệnh đọc địa chỉ của GDT (Global Descriptor Table). Đây là lệnh "sensitive non-privileged" trên x86 cổ điển (không trap khi ở user mode).

(a) Vấn đề gì xảy ra nếu dùng trap-and-emulate đơn thuần trên x86 cổ điển?
(b) Binary translation giải quyết thế nào?
(c) VT-x giải quyết thế nào?

---

**Bài 4:** Walk-through ảo hoá bộ nhớ.

Guest OS cài cho tiến trình P: GVA \`0x3000\` → GPA \`0x10000\`.
Hypervisor ánh xạ: GPA \`0x10000\` → HPA \`0x9A000\`.

(a) Khi tiến trình P đọc địa chỉ \`0x3000\`, CPU thực ra đọc RAM vật lý tại địa chỉ nào?
(b) Với nested page table (EPT), CPU thực hiện bao nhiêu bước tra bảng trang (trong trường hợp TLB miss)?
(c) Nếu dùng shadow page table, hypervisor sẽ cập nhật shadow table với ánh xạ nào?

---

**Bài 5:** So sánh paravirtualization và full virtualization với VT-x.

| Tiêu chí | Paravirtualization | Full virt + VT-x |
|----------|-------------------|-----------------|
| Cần sửa guest OS? | ? | ? |
| Overhead trap | ? | ? |
| Hỗ trợ Windows? | ? | ? |
| Ví dụ phần mềm | ? | ? |

---

## Lời giải chi tiết

**Bài 1:**

**(a)** Tổng tài nguyên ảo:
- vCPU: 16 VM × 2 vCPU = **32 vCPU**
- vRAM: 16 VM × 8 GB = **128 GB vRAM**

**(b)** Hoàn toàn có thể:
- **CPU overcommit**: 32 vCPU trên 32 core vật lý — tỷ lệ 1:1, không overcommit. Nếu tạo 32 VM × 2 vCPU = 64 vCPU trên 32 core, đó là CPU overcommit 2:1. Được phép vì không phải mọi VM đều dùng CPU 100% cùng lúc — hypervisor time-multiplex vCPU lên core vật lý.
- **Memory overcommit**: 128 GB vRAM trên 256 GB RAM vật lý — chỉ dùng 50%, không overcommit. Hypervisor có thể overcommit bộ nhớ (cấp 256 GB vRAM nhưng chỉ có 128 GB RAM thật) nhờ kỹ thuật ballooning, page sharing.

**(c)** Nếu tất cả 16 VM dùng đủ 128 GB RAM cùng lúc: OK vì máy có 256 GB RAM vật lý. Nhưng nếu có 32 VM và tất cả dùng 8 GB cùng lúc (= 256 GB) → RAM vật lý đầy. Hypervisor phải dùng swap (memory balloon, host swapping) → hiệu năng giảm mạnh, có thể gây "memory pressure" làm VM chậm.

---

**Bài 2:**

**(a) KVM trên Ubuntu Server:** **Type 1**. KVM là module của Linux kernel; khi load, kernel Linux trở thành hypervisor, chạy trực tiếp trên phần cứng. Mặc dù "Ubuntu Server" nghe như host OS, nhưng về mặt kỹ thuật kernel đã bước vào VMX root mode → type 1.

**(b) VirtualBox trên Windows 11:** **Type 2**. VirtualBox là ứng dụng cài trên Windows 11, chạy như một app thông thường. Windows 11 là host OS.

**(c) VMware ESXi:** **Type 1**. ESXi là hypervisor chạy thẳng trên server, không có OS host.

**(d) VMware Workstation trên macOS:** **Type 2** (trên Mac gọi là VMware Fusion). Chạy trên macOS host.

**(e) Hyper-V trên Windows Server 2022:** **Type 1**. Khi bật Hyper-V, Windows Server thực ra boot vào hypervisor Hyper-V; Windows Server chạy như một "root partition" — một partition đặc biệt trên hypervisor, không phải host OS thông thường.

---

**Bài 3:**

**(a)** Vấn đề với x86 cổ điển: \`SGDT\` chạy ở user mode **không gây trap** — lệnh thực thi bình thường và trả về địa chỉ GDT **thật** của máy vật lý. Guest OS đọc được địa chỉ GDT thật → thông tin nhạy cảm bị lộ. Hypervisor không biết lệnh này xảy ra, không có cơ hội can thiệp. Đây là lỗ hổng bảo mật và làm hỏng tính trong suốt của ảo hoá.

**(b)** Binary translation: trước khi chạy code của guest OS, hypervisor scan qua và **thay thế \`SGDT\` bằng đoạn code trap-safe tương đương** — ví dụ: thay bằng một lệnh hypercall, hoặc một lệnh INT đặc biệt gây trap về hypervisor. Khi thực thi đến đó, hypervisor trả về giá trị GDT ảo (không phải địa chỉ GDT thật).

**(c)** VT-x (Intel): Trong VMX non-root mode, \`SGDT\` **tự động gây VMEXIT** (được cấu hình trong VMCS — VM Control Structure). Hypervisor nhận VMEXIT, đọc VMCS biết guest vừa thực thi \`SGDT\`, trả về giá trị GDT ảo cho guest, rồi VMRESUME. Không cần binary translation.

---

**Bài 4:**

**(a)** CPU thực đọc tại **HPA = 0x9A000**. Hành trình: tiến trình P đọc \`0x3000\` → guest OS dịch \`GVA 0x3000 → GPA 0x10000\` → hypervisor/hardware dịch \`GPA 0x10000 → HPA 0x9A000\` → RAM vật lý tại \`0x9A000\`.

**(b)** Với 4-level paging (x86-64) và nested page table: CPU thực hiện **4 bước** cho guest page walk (GVA→GPA) × **4 bước** cho nested page walk (GPA→HPA) = **16 bước** tra bảng trong trường hợp TLB miss hoàn toàn. Thực tế TLB cache kết quả → sau lần đầu, hầu hết truy cập sau này chỉ cần 1 TLB lookup.

**(c)** Shadow page table hypervisor sẽ có ánh xạ trực tiếp: **GVA \`0x3000\` → HPA \`0x9A000\`** (bỏ qua GPA). Shadow table này được nạp vào CR3 thật của CPU, CPU dùng trực tiếp → chỉ 1 bước page walk.

---

**Bài 5:**

| Tiêu chí | Paravirtualization | Full virt + VT-x |
|----------|-------------------|-----------------|
| Cần sửa guest OS? | Có (thay syscall bằng hypercall) | Không |
| Overhead trap | Rất thấp (hypercall, không trap vô tình) | Thấp (VT-x giảm overhead trap) |
| Hỗ trợ Windows? | Không (cần source code) | Có |
| Ví dụ phần mềm | Xen với PV guest | KVM + QEMU, VMware ESXi, Hyper-V |

---

## Liên kết và bài tiếp theo

- Tiền đề đã học:
  - [Tầng 1 — Lesson 01: Kernel & System Call](../../01-Foundations-Processes/lesson-01-os-kernel-syscall/): ring 0 vs ring 3, system call — nền tảng hiểu tại sao lệnh đặc quyền trap.
  - [Tầng 2 — Lesson 02: Paging](../../02-Memory-Storage/lesson-02-paging/): bảng trang, TLB — nền tảng hiểu shadow/nested page table.
  - [Tầng 2 — Lesson 03: TLB & Multi-level Paging](../../02-Memory-Storage/lesson-03-tlb-multilevel-paging/): multi-level paging → nested page walk là mở rộng 2 cấp.
- Bài tiếp theo:
  - [Lesson 02 — Container](../lesson-02-containers/): bước tiếp theo — cô lập không cần ảo hoá phần cứng, dùng namespace & cgroup của kernel Linux.

---

## 📝 Tổng kết Lesson 01

1. **Ảo hoá** = tạo nhiều VM độc lập trên một phần cứng, giải quyết lãng phí tài nguyên và cung cấp cô lập. Nền tảng của cloud computing.
2. **Hypervisor type 1** (bare-metal: ESXi, KVM, Hyper-V) chạy thẳng trên phần cứng — hiệu năng cao, dùng trong production. **Type 2** (hosted: VirtualBox) chạy trên OS host — dễ dùng, dành cho dev/học tập.
3. **Trap-and-emulate**: lệnh đặc quyền của guest OS tự động trap về hypervisor; hypervisor giả lập kết quả. x86 cổ điển có 17 lệnh không trap → ba giải pháp.
4. **Paravirtualization**: sửa guest OS dùng hypercall — overhead thấp nhưng cần source code. **VT-x/AMD-V**: phần cứng tạo ring -1, mọi lệnh đặc quyền đều trap — không cần sửa guest, hiệu năng cao. Giải pháp phổ biến hiện đại.
5. **Ảo hoá bộ nhớ**: 3 tầng địa chỉ GVA→GPA→HPA. Shadow page table (software) vs Nested/Extended Page Table (phần cứng, hiệu năng tốt hơn, ít overhead trap hơn).
`;
