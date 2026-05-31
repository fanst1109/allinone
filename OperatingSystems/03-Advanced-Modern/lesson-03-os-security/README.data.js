// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: OperatingSystems/03-Advanced-Modern/lesson-03-os-security/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 03 — Bảo mật & cô lập OS

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Đọc và tính toán **quyền Unix** (rwx, số bát phân, ký hiệu chuỗi) từ bất kỳ tổ hợp nào.
- Giải thích **UID/GID**, **setuid** và tại sao lệnh \`passwd\` cần quyền đặc biệt.
- Trình bày **nguyên tắc đặc quyền tối thiểu (least privilege)** và cách áp dụng thực tế.
- Mô tả **leo thang đặc quyền (privilege escalation)** — ví dụ cơ chế và cách phòng tránh.
- Phân biệt các cơ chế cô lập: **chroot**, **namespace**, **seccomp**, **Linux capabilities**.

## Kiến thức tiền đề

- [Tầng 1 — Lesson 01: Kernel & System Call](../../01-Foundations-Processes/lesson-01-os-kernel-syscall/): ring 0 vs ring 3, syscall — nền tảng hiểu tại sao quyền OS quan trọng.
- [Lesson 02 — Container](../lesson-02-containers/): namespace user, PID namespace — cô lập tiến trình.

---

## 1. Mô hình Quyền Unix (rwx)

### 1.1. Bài toán: Ai được phép làm gì với file này?

💡 **Trực giác — Khoá căn phòng:**
Một công ty có văn phòng, phòng kỹ thuật, và phòng tài chính. Ai được vào phòng nào? Đó là câu hỏi về **quyền truy cập (access control)**. Unix giải quyết bằng mô hình đơn giản: mỗi file/directory có **chủ sở hữu (owner)**, **nhóm (group)**, và quyền cho **tất cả người còn lại (other)**.

### 1.2. Ba lớp và Ba quyền

Mỗi file/directory Unix có **9 bit quyền** chia thành 3 nhóm × 3 bit:

\`\`\`
  Chủ sở hữu (user/owner)   Nhóm (group)   Khác (other)
  ┌───────────────────┐  ┌──────────────┐  ┌────────────┐
  │  r   w   x        │  │  r   w   x   │  │  r   w   x │
  │  4   2   1        │  │  4   2   1   │  │  4   2   1 │
  └───────────────────┘  └──────────────┘  └────────────┘
\`\`\`

| Bit | Ký hiệu | Với file | Với directory |
|-----|---------|----------|--------------|
| Read (4) | \`r\` | Đọc nội dung file | List nội dung thư mục (\`ls\`) |
| Write (2) | \`w\` | Ghi/sửa nội dung file | Tạo/xóa file trong thư mục |
| Execute (1) | \`x\` | Thực thi file (chạy chương trình) | Vào thư mục (\`cd\`) và truy cập file bên trong |

### 1.3. Walk-through số bát phân → ký hiệu

**Ví dụ 1: \`0755\` (rwxr-xr-x)**

\`\`\`
0755 = 7    5    5
       rwx  r-x  r-x

Chủ sở hữu (7 = 4+2+1): r=✓ w=✓ x=✓ → rwx
Nhóm       (5 = 4+0+1): r=✓ w=✗ x=✓ → r-x
Khác       (5 = 4+0+1): r=✓ w=✗ x=✓ → r-x

Ký hiệu đầy đủ: -rwxr-xr-x
                ↑ ký tự đầu là '-' (file bình thường), 'd' (directory), 'l' (symlink)
\`\`\`

Kết luận: chủ sở hữu đọc/ghi/chạy được; nhóm và người khác chỉ đọc và chạy được.

**Ví dụ 2: \`0644\` (rw-r--r--)**

\`\`\`
0644 = 6    4    4
       rw-  r--  r--

Chủ sở hữu (6 = 4+2+0): r=✓ w=✓ x=✗ → rw-
Nhóm       (4 = 4+0+0): r=✓ w=✗ x=✗ → r--
Khác       (4 = 4+0+0): r=✓ w=✗ x=✗ → r--

Ký hiệu: -rw-r--r--
\`\`\`

Đây là quyền thường gặp nhất cho file cấu hình: chủ sở hữu đọc/ghi; nhóm và người khác chỉ đọc.

**Ví dụ 3: \`0700\` (rwx------)**

\`\`\`
0700 = 7    0    0
       rwx  ---  ---

Chỉ chủ sở hữu có mọi quyền; nhóm và người khác không có quyền gì.
Ví dụ: ~/.ssh/ thường là 700 (chỉ bạn truy cập được)
\`\`\`

**Ví dụ 4: \`0600\` (rw-------)**

\`\`\`
0600 = 6    0    0
       rw-  ---  ---

Chỉ chủ sở hữu đọc và ghi; không ai khác có quyền gì.
Ví dụ: ~/.ssh/id_rsa (private key) phải là 600.
SSH từ chối kết nối nếu private key có quyền >600 (quá "thoải mái").
\`\`\`

### 1.4. Ví dụ từ thực tế

\`\`\`bash
$ ls -la /usr/bin/passwd
-rwsr-xr-x 1 root root 59640 Mar 14 2023 /usr/bin/passwd
   ↑ chú ý 's' thay vì 'x' ở vị trí execute của owner → setuid bit (giải thích ở mục 2)
\`\`\`

\`\`\`bash
$ ls -la /etc/passwd
-rw-r--r-- 1 root root 2847 Jan 5 2024 /etc/passwd
  → owner=root đọc/ghi được; group/other chỉ đọc được
  
$ ls -la /etc/shadow
-rw-r----- 1 root shadow 1823 Jan 5 2024 /etc/shadow
  → chỉ root đọc/ghi; group 'shadow' đọc được; other không có quyền gì
  (shadow lưu password hash — cần bảo mật tuyệt đối)
\`\`\`

### 1.5. Thay đổi quyền — lệnh \`chmod\`

\`\`\`bash
chmod 755 script.sh      # đặt quyền = 0755
chmod +x script.sh       # thêm bit execute cho tất cả (owner/group/other)
chmod u+x,g-w file.txt   # thêm x cho owner, bỏ w của group
chmod o= sensitive.conf  # xóa mọi quyền của other
\`\`\`

⚠ **Lỗi thường gặp — \`chmod 777\`:** Nhiều người debug "permission denied" bằng cách \`chmod 777 file\` — đặt mọi quyền cho mọi người. Đây là **lỗi bảo mật nghiêm trọng**: mọi user trên hệ thống (và qua web nếu web server chạy) đều đọc/ghi/chạy được file đó. Giải pháp đúng: tìm hiểu *tại sao* bị denied và cấp quyền tối thiểu cần thiết.

🔁 **Dừng lại tự kiểm tra:**

File có quyền \`0754\`. Điền vào bảng:

| Nhóm | Số | Bit | Quyền |
|------|----|-----|-------|
| Owner | 7 | ? | ? |
| Group | 5 | ? | ? |
| Other | 4 | ? | ? |

<details>
<summary>Đáp án</summary>

| Nhóm | Số | Bit | Quyền |
|------|----|-----|-------|
| Owner | 7 | rwx | đọc, ghi, thực thi |
| Group | 5 | r-x | đọc, thực thi |
| Other | 4 | r-- | chỉ đọc |

Ký hiệu: \`-rwxr-xr--\`
</details>

📝 **Tóm tắt mục 1:**
- 9 bit quyền: 3 nhóm (owner/group/other) × 3 bit (r=4, w=2, x=1).
- Số bát phân: mỗi chữ số = tổng các bit của một nhóm.
- x với directory = quyền \`cd\` và truy cập file bên trong (không phải "chạy" thư mục).

---

## 2. UID/GID, Setuid & Leo thang đặc quyền

### 2.1. UID và GID

Mỗi tiến trình Linux có **ba UID**:
- **Real UID (ruid)**: UID thật của user đã đăng nhập.
- **Effective UID (euid)**: UID dùng để kiểm tra quyền truy cập (quan trọng hơn).
- **Saved UID (suid)**: dùng để khôi phục euid (kỹ thuật nâng cao).

Thông thường ruid = euid = UID của user. Khi chạy lệnh, kernel dùng **euid** để kiểm tra quyền file.

**UID đặc biệt:**
- **UID 0 (root)**: "thần" của hệ thống — vượt qua mọi kiểm tra quyền (trừ một số capability check). Root đọc được mọi file, ghi vào mọi nơi, kill mọi tiến trình.
- **UID 1–999**: system/service accounts (nginx, mysql, www-data...) — không có shell đăng nhập, dùng để chạy service với quyền tối thiểu.
- **UID 1000+**: user thường.

### 2.2. Setuid — "Mặc tạm quyền người khác"

💡 **Trực giác — Chìa khóa vạn năng có nhân viên bảo vệ:**
Bạn là user bình thường, muốn đổi password. Password hash lưu ở \`/etc/shadow\` — chỉ root mới ghi được. Nhưng bạn không muốn cho user quyền root. Giải pháp: lệnh \`passwd\` có **setuid bit** — khi user bình thường chạy \`passwd\`, tiến trình tạm thời chạy với **euid = root** (chủ sở hữu file \`passwd\`) thay vì euid của user.

**Setuid bit** (s): bit đặc biệt trong quyền file. Khi file executable có setuid:
- Thông thường: chạy lệnh → tiến trình có euid = user đang chạy.
- Với setuid: chạy lệnh → tiến trình có euid = **chủ sở hữu file** (không phải user đang chạy).

\`\`\`bash
$ ls -la /usr/bin/passwd
-rwsr-xr-x 1 root root ... /usr/bin/passwd
   ↑ 's' ở owner-execute = setuid bit

$ ls -la /usr/bin/ping
-rwsr-xr-x 1 root root ... /usr/bin/ping
   ↑ ping cần raw socket (quyền root) để gửi ICMP → dùng setuid
\`\`\`

**Walk-through chạy \`passwd\`:**
\`\`\`
User alice (UID 1001) chạy: passwd
   ↓
Kernel: fork() + execve("/usr/bin/passwd")
   ↓
Kernel: setuid bit = 1, chủ sở hữu = root (UID 0)
→ euid của tiến trình = 0 (root)
→ ruid của tiến trình = 1001 (alice, vẫn biết mình là ai)
   ↓
passwd chạy với euid=0 → có thể đọc/ghi /etc/shadow
passwd kiểm tra: ruid=1001 → chỉ được phép đổi password của user 1001
   ↓
Ghi hash mới vào /etc/shadow thành công
   ↓
passwd exit → tiến trình kết thúc, euid=0 không còn tồn tại
\`\`\`

**Setgid**: tương tự setuid nhưng cho GID — tiến trình chạy với egid = GID của file.

⚠ **Lỗi thường gặp — Viết setuid shell script:** Kernel Linux **bỏ qua setuid bit trên script** (\`.sh\`, \`.py\`...). Chỉ setuid trên binary (ELF executable) mới có hiệu lực. Lý do: script cần interpreter (bash, python) → phức tạp về race condition (TOCTOU) → kernel từ chối để tránh lỗ hổng bảo mật.

### 2.3. Leo thang đặc quyền (Privilege Escalation)

**Leo thang đặc quyền** là việc attacker hoặc tiến trình nâng quyền của mình từ thấp lên cao hơn mức được phép. Hai loại chính:

**1. Leo thang ngang (horizontal):** Từ user A truy cập tài nguyên của user B (cùng cấp quyền). Ví dụ: tìm file của user khác có quyền sai.

**2. Leo thang dọc (vertical):** Từ user thường lên root. Nguy hiểm hơn nhiều.

**Ví dụ cơ chế leo thang dọc — Khai thác setuid binary:**

Giả sử có binary \`/usr/local/bin/backup\` với setuid root, và binary có lỗ hổng buffer overflow:

\`\`\`
Attacker (uid=1001) chạy /usr/local/bin/backup với input được craft
   ↓
euid của tiến trình = 0 (root) vì setuid
   ↓
Buffer overflow trong backup → ghi đè return address
   ↓
Attacker kiểm soát luồng thực thi với euid=0
→ Chạy /bin/sh với euid=0 → shell root!
\`\`\`

**Ví dụ cơ chế — Khai thác sudo misconfiguration:**

\`\`\`bash
# File /etc/sudoers có dòng:
alice ALL=(ALL) NOPASSWD: /usr/bin/find

# Alice chạy:
sudo find /etc -exec /bin/sh \\;
# find thực thi /bin/sh như một "exec action" — với quyền root!
\`\`\`

**Ví dụ — Khai thác SUID bit sai:**

\`\`\`bash
# Admin vô tình cài setuid cho vim:
chmod u+s /usr/bin/vim   # LỖI!

# Bất kỳ user nào có thể:
vim /etc/passwd   # vim chạy với euid=root → sửa /etc/passwd → thêm root account mới
# Hoặc trong vim: :! /bin/sh → shell root
\`\`\`

📝 **Tóm tắt mục 2:**
- euid (effective UID) là UID kernel dùng để kiểm tra quyền — thường = ruid nhưng có thể khác khi setuid.
- Setuid bit: khi chạy, euid = UID của chủ sở hữu file (không phải user đang chạy). Dùng để cấp quyền tạm thời kiểm soát.
- Leo thang đặc quyền: dọc (→ root) nguy hiểm hơn ngang (→ user khác). Setuid sai cấu hình = lỗ hổng nghiêm trọng.

---

## 3. Nguyên tắc Đặc quyền Tối thiểu (Least Privilege)

### 3.1. Nguyên tắc

**Principle of Least Privilege (PoLP)**: mỗi tiến trình, user, service chỉ nên có đúng quyền tối thiểu cần thiết để thực hiện nhiệm vụ của mình — không hơn.

💡 **Trực giác — Nhân viên kho hàng:**
Nhân viên kho không cần chìa khóa phòng giám đốc. Nhân viên bán hàng không cần truy cập hệ thống lương. Nguyên tắc: chỉ cấp đúng quyền cho đúng công việc. Nếu nhân viên kho bị "hacked" (bị mua chuộc hoặc bị kẻ xấu lợi dụng), thiệt hại giới hạn trong phạm vi kho — không ảnh hưởng phòng giám đốc hay lương nhân viên.

### 3.2. Áp dụng thực tế trong Linux

**1. Không chạy service với quyền root:**

\`\`\`bash
# Sai: chạy nginx với root
sudo nginx

# Đúng: nginx khởi động với root (cần bind port 80), rồi drop xuống user 'nginx'
# Trong nginx.conf:
user nginx;   # worker process chạy với UID của user 'nginx'
# Nếu worker bị compromise, attacker chỉ có quyền của 'nginx' (unprivileged)
\`\`\`

**2. Giới hạn quyền file cấu hình:**

\`\`\`bash
# File database password
chmod 600 /etc/myapp/db.conf   # chỉ owner (root hoặc service account) đọc được
chown myapp:myapp /etc/myapp/db.conf

# Secret key
chmod 400 /etc/ssl/private/server.key   # read-only, chỉ owner
\`\`\`

**3. Tách biệt service account:**

\`\`\`bash
# Tạo user riêng cho mỗi service
useradd -r -s /bin/nologin -d /var/lib/postgres postgres
# -r: system account (UID < 1000)
# -s /bin/nologin: không thể đăng nhập shell
# -d: home directory riêng
\`\`\`

**4. sudo thay vì root shell:**

\`\`\`bash
# Cấu hình /etc/sudoers — chỉ cho phép lệnh cụ thể:
alice ALL=(root) NOPASSWD: /usr/bin/systemctl restart nginx
# Alice chỉ restart được nginx, không làm gì khác với quyền root
\`\`\`

### 3.3. Linux Capabilities — Tách nhỏ quyền root

Từ kernel 2.2, Linux chia quyền root thành ~40 **capability** riêng biệt:

| Capability | Nghĩa |
|------------|-------|
| \`CAP_NET_BIND_SERVICE\` | Bind port < 1024 (HTTP port 80, HTTPS port 443) |
| \`CAP_NET_RAW\` | Gửi raw packet (ping, tcpdump) |
| \`CAP_SYS_ADMIN\` | Nhiều quyền admin (mount, setuid, namespace...) — rất mạnh |
| \`CAP_KILL\` | Gửi signal đến tiến trình của bất kỳ user |
| \`CAP_CHOWN\` | Thay đổi owner của file |
| \`CAP_DAC_OVERRIDE\` | Bỏ qua kiểm tra DAC (Discretionary Access Control = quyền rwx) |
| \`CAP_SYS_PTRACE\` | ptrace tiến trình khác (debug) |
| \`CAP_SETUID\` | Thay đổi UID |

**Ví dụ thực tế — nginx với capability thay vì setuid:**

\`\`\`bash
# Thay vì setuid root, cấp cho nginx chỉ quyền bind port < 1024:
setcap 'cap_net_bind_service=+ep' /usr/sbin/nginx

# Bây giờ nginx có thể bind port 80 mà không cần chạy với euid=0
# Nếu bị exploit, attacker chỉ có cap_net_bind_service — không phải full root
\`\`\`

**Docker và capabilities:**

\`\`\`bash
# Docker mặc định drop nhiều capability nguy hiểm:
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE nginx

# Liệt kê capability của container đang chạy:
cat /proc/<pid>/status | grep Cap
\`\`\`

📝 **Tóm tắt mục 3:**
- Least privilege: chỉ cấp quyền tối thiểu cần thiết — giảm thiệt hại khi bị compromise.
- Thực tế: service account riêng, không chạy root, chmod 600/400 cho file nhạy cảm, sudo giới hạn.
- Linux capabilities: chia ~40 quyền nhỏ thay vì root monolithic — cấp đúng capability cho từng service.

---

## 4. Cơ chế Cô lập OS

### 4.1. chroot — "Nhà tù thư mục"

**chroot** (change root) thay đổi thư mục root của tiến trình. Tiến trình bên trong chroot jail chỉ thấy filesystem bắt đầu từ thư mục mới — không thể leo lên thư mục cao hơn.

\`\`\`bash
# Tạo chroot jail cho FTP server:
mkdir -p /var/ftp-jail/{bin,lib,etc}
# Copy binary cần thiết vào jail:
cp /bin/ls /var/ftp-jail/bin/
# Chạy FTP server trong jail:
chroot /var/ftp-jail /bin/vsftpd

# Tiến trình vsftpd thấy /var/ftp-jail như root /
# ls / → thấy /bin, /lib, /etc — tất cả nằm trong /var/ftp-jail
# Không thể cd .. ra ngoài /var/ftp-jail
\`\`\`

⚠ **Giới hạn của chroot:** chroot KHÔNG cô lập network, PID, process. Tiến trình root bên trong chroot có thể **escape** (thoát khỏi jail) bằng một số kỹ thuật (mount, \`chroot()\` lại...). chroot không phải là sandbox bảo mật đầy đủ — chỉ là "tường mỏng".

### 4.2. Namespace — Cô lập đầy đủ hơn

Đã học chi tiết ở [Lesson 02 — Container](../lesson-02-containers/). Namespace cô lập PID, network, mount, UTS, IPC, user — mạnh hơn chroot nhiều.

### 4.3. seccomp — Lọc System Call

**seccomp (Secure Computing Mode)** cho phép một tiến trình tự giới hạn những system call nào nó được phép thực thi.

💡 **Trực giác:** Tiến trình là một công nhân nhà máy. seccomp là danh sách các công cụ mà công nhân được phép dùng trong ca làm việc. Nếu công nhân cố dùng công cụ không trong danh sách → bị đuổi ngay (SIGKILL).

**Chế độ seccomp:**
- **SECCOMP_MODE_STRICT**: chỉ cho phép \`read\`, \`write\`, \`exit\`, \`sigreturn\` — mode cực kỳ hạn chế.
- **SECCOMP_MODE_FILTER**: dùng BPF (Berkeley Packet Filter) để định nghĩa policy phức tạp hơn.

**Ví dụ BPF filter:**
\`\`\`c
// Cho phép tất cả syscall NGOẠI TRỪ execve (không thể spawn shell):
struct sock_filter filter[] = {
  BPF_STMT(BPF_LD|BPF_W|BPF_ABS, offsetof(struct seccomp_data, nr)),
  BPF_JUMP(BPF_JMP|BPF_JEQ|BPF_K, __NR_execve, 0, 1),
  BPF_STMT(BPF_RET|BPF_K, SECCOMP_RET_KILL),  // kill nếu là execve
  BPF_STMT(BPF_RET|BPF_K, SECCOMP_RET_ALLOW), // allow khác
};
\`\`\`

**Ứng dụng thực tế:**
- Docker mặc định có seccomp profile cho container — block ~40 syscall nguy hiểm (vd: \`keyctl\`, \`add_key\`, \`request_key\`, \`ptrace\`...).
- Browser Chromium dùng seccomp sandbox cho renderer process — nếu renderer bị exploit, không thể gọi syscall nguy hiểm.
- OpenSSH sandbox cho pre-auth process dùng seccomp.

### 4.4. AppArmor và SELinux — Mandatory Access Control

**Mandatory Access Control (MAC)** là tầng kiểm soát trên cùng, áp đặt policy bởi admin system — không thể bị override bởi user hay file owner.

**AppArmor** (Ubuntu, SUSE):
- Định nghĩa profile cho từng binary: \`/usr/bin/nginx\` chỉ được đọc \`/etc/nginx/**\`, ghi vào \`/var/log/nginx/**\`, không được làm gì khác.
- Profile lưu tại \`/etc/apparmor.d/usr.sbin.nginx\`.
- Dễ cấu hình hơn SELinux.

**SELinux** (RHEL, Fedora, CentOS):
- Type enforcement: mỗi object (file, process, port) có label (type). Policy định nghĩa type nào được tương tác với type nào.
- Mạnh hơn AppArmor nhưng phức tạp hơn nhiều.
- Ví dụ: tiến trình \`httpd_t\` chỉ được đọc file loại \`httpd_sys_content_t\`, không đọc được \`shadow_t\` (file /etc/shadow).

**Liên hệ chéo:** Phân quyền và bảo mật tầng OS liên hệ mật thiết với xác thực và mã hoá tại [\`Cryptography/\`](../../../Cryptography/): phân quyền = bạn có *identity* (UID) + policy; mã hoá = bảo vệ dữ liệu khi *identity* bị giả mạo.

---

## 5. Ứng dụng Thực tế — Hardening Linux Server

### 5.1. Checklist bảo mật cơ bản

1. **Disable root SSH login:**
   \`\`\`bash
   # /etc/ssh/sshd_config:
   PermitRootLogin no
   PasswordAuthentication no   # chỉ dùng SSH key
   \`\`\`

2. **Umask mặc định:**
   \`\`\`bash
   # ~/.bashrc hoặc /etc/profile:
   umask 027   # file mới: 640 (rw-r-----); dir mới: 750 (rwxr-x---)
   # Thay vì mặc định 022 → file: 644, dir: 755
   \`\`\`

3. **Tìm file setuid sai:**
   \`\`\`bash
   find / -perm -4000 -type f 2>/dev/null
   # Kiểm tra từng file có setuid — chỉ những binary thực sự cần
   \`\`\`

4. **Audit file world-writable:**
   \`\`\`bash
   find / -perm -0002 -type f 2>/dev/null
   # File ai cũng ghi được = nguy hiểm
   \`\`\`

5. **Giới hạn sudo:**
   \`\`\`bash
   visudo  # chỉnh /etc/sudoers — cấp lệnh cụ thể, không ALL
   \`\`\`

---

## Bài tập

**Bài 1:** Đọc quyền Unix.

Chuyển các quyền sau từ số bát phân sang ký hiệu và giải thích ý nghĩa thực tế:

(a) \`0755\` — thường dùng cho file gì?
(b) \`0644\` — thường dùng cho file gì?
(c) \`0600\` — thường dùng cho file gì?
(d) \`0711\`
(e) \`0440\`

---

**Bài 2:** Tính số bát phân từ ký hiệu.

(a) \`-rwxrwxrwx\`
(b) \`-rw-rw-r--\`
(c) \`drwx--x--x\`
(d) \`-r-x------\`
(e) \`-rwsr-xr-x\` (có setuid — cột setuid là \`4\` trước ba chữ số thường)

---

**Bài 3:** Phân tích scenario quyền.

User \`alice\` (UID=1001, groups: alice, developers) muốn truy cập file \`/data/report.csv\` có:
- Owner: bob (UID=1002)
- Group: developers (GID=500)
- Quyền: \`0640\` (\`-rw-r-----\`)

(a) Alice có đọc được không? Giải thích bước kernel kiểm tra.
(b) Alice có ghi được không? Giải thích.
(c) Nếu alice chạy \`chmod 777 /data/report.csv\`, có thành công không? Tại sao?

---

**Bài 4:** Phân tích setuid.

Lệnh \`su\` (switch user) có setuid root: \`-rwsr-xr-x 1 root root ... /usr/bin/su\`.

(a) Khi user \`charlie\` (UID=1003) chạy \`su alice\`, ruid và euid của tiến trình \`su\` là gì?
(b) Vì sao \`su\` cần euid=0 để hoạt động?
(c) \`su\` đọc \`/etc/shadow\` để xác minh password. Nếu \`su\` không có setuid root, chuyện gì xảy ra?
(d) Sau khi xác thực thành công, \`su\` chạy shell với UID=1001 (alice). \`su\` làm điều này thế nào (hint: \`setuid()\` syscall)?

---

**Bài 5:** Thiết kế least privilege.

Bạn cần triển khai một web API (Python Flask) trên Linux server:
- API lắng nghe port 443 (HTTPS).
- API đọc config từ \`/etc/myapi/config.json\`.
- API ghi log vào \`/var/log/myapi/\`.
- API kết nối database PostgreSQL trên cùng server.

Thiết kế least privilege cho API này:
(a) API nên chạy với UID nào?
(b) Quyền nào cần cho \`/etc/myapi/config.json\`? Owner là ai?
(c) Quyền nào cần cho \`/var/log/myapi/\`? Owner là ai?
(d) Làm sao API bind được port 443 mà không cần root?
(e) Cần seccomp không? Nếu có, syscall nào nên block?

---

## Lời giải chi tiết

**Bài 1:**

**(a) \`0755\` = \`-rwxr-xr-x\`:**
- Owner: đọc/ghi/thực thi. Group và Other: đọc/thực thi.
- Dùng cho: binary executable (\`/usr/bin/python3\`, \`/usr/sbin/nginx\`), thư mục công khai (\`/usr/local/bin/\`). Script có quyền chạy cho tất cả nhưng chỉ owner sửa được.

**(b) \`0644\` = \`-rw-r--r--\`:**
- Owner: đọc/ghi. Group và Other: chỉ đọc.
- Dùng cho: file cấu hình cần người khác đọc được (\`/etc/hosts\`, \`/etc/nginx/nginx.conf\`), file văn bản, tài liệu. Không cần thực thi.

**(c) \`0600\` = \`-rw-------\`:**
- Chỉ owner đọc/ghi; group và other không có quyền gì.
- Dùng cho: file bí mật — SSH private key (\`~/.ssh/id_rsa\`), file password, file token API. SSH sẽ từ chối key có quyền rộng hơn 600.

**(d) \`0711\` = \`-rwx--x--x\`:**
- Owner: đọc/ghi/thực thi. Group và Other: chỉ thực thi.
- Ít gặp. Có thể dùng cho binary mà người khác cần chạy nhưng không được đọc mã (để bảo vệ logic). Thực tế: thư mục cần x nhưng không cần r (người dùng biết path cụ thể nhưng không list được).

**(e) \`0440\` = \`-r--r-----\`:**
- Owner và Group: chỉ đọc. Other: không có quyền gì.
- Dùng cho: file cấu hình cần cả owner và group đọc nhưng không cần ghi và không muốn người ngoài thấy. Ví dụ: file cấu hình shared giữa nhiều service trong cùng group.

---

**Bài 2:**

**(a) \`-rwxrwxrwx\`:** Owner=7(rwx), Group=7(rwx), Other=7(rwx) → **0777**

**(b) \`-rw-rw-r--\`:** Owner=6(rw-), Group=6(rw-), Other=4(r--) → **0664**

**(c) \`drwx--x--x\`:** dir + Owner=7(rwx), Group=1(--x), Other=1(--x) → **0711** (directory)

**(d) \`-r-x------\`:** Owner=5(r-x), Group=0(---), Other=0(---) → **0500**

**(e) \`-rwsr-xr-x\`:** Có setuid → prefix \`4\`. Owner=7(rws→rwx+s), Group=5(r-x), Other=5(r-x) → **4755**

---

**Bài 3:**

**(a)** Kernel kiểm tra theo thứ tự: owner trước, group sau, other cuối cùng — dừng ở match đầu tiên.

1. Alice (UID=1001) có phải owner file (UID=1002=bob)? Không.
2. Alice có trong group developers (GID=500)? Có (alice thuộc group developers).
3. → Áp dụng quyền group: \`r--\` → **có thể đọc** (\`r\`=4 bit set), không ghi được.

**Alice đọc được.**

**(b)** Kernel vẫn dùng quyền group (vì match ở bước 2). Group có quyền \`r--\` — bit write (\`w\`) = 0. **Alice không ghi được.** Kernel không tiếp tục sang quyền other dù Other có thể có quyền khác — kernel dừng ở match đầu tiên.

**(c)** Không thành công. \`chmod\` chỉ được phép thực thi bởi **chủ sở hữu file** hoặc **root**. Alice không phải owner (bob mới là owner). → Kernel từ chối: \`chmod: changing permissions of '/data/report.csv': Operation not permitted\`.

---

**Bài 4:**

**(a)** Khi charlie (UID=1003) chạy \`/usr/bin/su\`:
- **ruid = 1003** (charlie — user thật đang chạy)
- **euid = 0** (root — vì setuid bit, \`su\` owned by root)

**(b)** \`su\` cần euid=0 để:
1. Đọc \`/etc/shadow\` (quyền \`-rw-r----- root shadow\` → chỉ root hoặc group shadow đọc được).
2. Gọi \`setuid(1001)\` để switch sang UID của alice — \`setuid()\` chỉ thành công khi tiến trình có euid=0 hoặc \`CAP_SETUID\`.

**(c)** Nếu không có setuid root, tiến trình \`su\` chạy với euid=1003 (charlie). Khi \`su\` cố đọc \`/etc/shadow\` → kernel kiểm tra: \`/etc/shadow\` owner=root, group=shadow, quyền \`r-----\`. euid=1003 không phải root, không trong group shadow → **Permission denied**. \`su\` không thể xác minh password → không hoạt động được.

**(d)** Sau khi xác thực thành công, \`su\` gọi syscall \`setuid(1001)\` — vì euid hiện tại = 0, kernel cho phép. euid và ruid của tiến trình đổi thành 1001. Sau đó \`su\` gọi \`execve("/bin/bash")\` → shell mới khởi động với UID=1001 (alice). Cơ chế này gọi là **credential switching** — tiến trình tự hạ quyền xuống sau khi hoàn thành công việc đặc quyền.

---

**Bài 5:**

**(a)** Tạo user system account: \`useradd -r -s /bin/nologin myapi\`. API chạy với **UID của myapi** (không phải root).

**(b)** \`/etc/myapi/config.json\`: quyền **0400** (\`r--------\`), owner: \`myapi\`. Chỉ tiến trình myapi đọc được — không nhóm nào, không other. Ghi vào config không cần trong lúc chạy.

**(c)** \`/var/log/myapi/\`: quyền **0700** (\`rwx------\`), owner: \`myapi\`. API cần tạo file log (write+execute directory) nhưng không ai khác cần đọc log production (admin dùng root để xem khi cần).

**(d)** Hai cách:
- **Dùng capability**: \`setcap 'cap_net_bind_service=+ep' /usr/bin/python3\` (hoặc binary API). Cần cẩn thận vì cấp cho toàn bộ Python.
- **Reverse proxy**: Chạy nginx (có setuid root để bind 443) làm reverse proxy → forward sang API chạy ở port cao (8443) không cần root. API không bind 443 trực tiếp. Đây là pattern phổ biến nhất trong production.

**(e)** Nên dùng seccomp. Block các syscall nguy hiểm không cần thiết cho web API:
- \`execve\`, \`execveat\`: API không cần spawn process mới.
- \`ptrace\`: không cần debug process khác.
- \`add_key\`, \`keyctl\`: không cần manipulate kernel keyring.
- \`mount\`, \`umount2\`: không cần mount filesystem.
Giữ lại: \`read\`, \`write\`, \`recv\`, \`send\`, \`socket\`, \`connect\`, \`accept\`, \`open\`, \`close\`, \`mmap\`, \`brk\`, \`futex\`, \`clock_gettime\`...

---

## Liên kết và bài tiếp theo

- Đã học:
  - [Tầng 1 — Lesson 01: Kernel & System Call](../../01-Foundations-Processes/lesson-01-os-kernel-syscall/): ring 0/3 — nền tảng tại sao lệnh đặc quyền cần quyền cao.
  - [Lesson 02 — Container](../lesson-02-containers/): namespace user, rootless container — ứng dụng của user namespace.
- Liên hệ chéo:
  - [\`Cryptography/\`](../../../Cryptography/): xác thực (authentication) + bảo mật OS tạo thành hàng rào đầy đủ — bảo mật OS kiểm soát *ai* được làm gì sau khi đã xác thực danh tính.
- Bài tiếp theo:
  - [Lesson 04 — Lập lịch đa nhân & NUMA](../lesson-04-smp-multicore-scheduling/): khi đã cô lập container/tiến trình an toàn, bước tiếp là phân phối CPU hiệu quả trên nhiều core.

---

## 📝 Tổng kết Lesson 03

1. **Quyền Unix** — 9 bit: 3 nhóm (owner/group/other) × 3 bit (r=4, w=2, x=1). Số bát phân 0755 = rwxr-xr-x. \`x\` trên directory = quyền \`cd\` và truy cập file bên trong.
2. **UID/GID**: kernel dùng **euid** (effective UID) để kiểm tra quyền. Thông thường euid=ruid. **Setuid** đổi euid thành UID của chủ file khi thực thi — cơ chế của \`passwd\`, \`su\`, \`ping\`.
3. **Leo thang đặc quyền**: dọc (→ root) nguy hiểm hơn ngang. Setuid sai cấu hình, sudo misconfiguration, buffer overflow trong setuid binary là các vector phổ biến.
4. **Least privilege**: chỉ cấp quyền tối thiểu cần thiết. Linux capabilities chia root thành ~40 quyền nhỏ — cấp đúng capability thay vì full root.
5. **Cô lập**: chroot (tường mỏng), namespace (cô lập đầy đủ hơn), seccomp (lọc syscall), AppArmor/SELinux (MAC — policy cứng do admin định nghĩa).
`;
