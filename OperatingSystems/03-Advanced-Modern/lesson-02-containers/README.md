# Lesson 02 — Container

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Giải thích được container là gì và tại sao nó khác hoàn toàn với máy ảo (VM).
- Mô tả hai trụ cột Linux làm nền tảng container: **namespace** (cô lập view) và **cgroup** (giới hạn tài nguyên).
- Giải thích **union filesystem / overlay filesystem** — cơ chế cho phép Docker image nhiều lớp.
- So sánh container vs VM trên các tiêu chí: khởi động, overhead, cô lập, dùng chung kernel.
- Đọc và hiểu những gì Docker thực sự làm "dưới nắp ca-pô" khi chạy `docker run`.

## Kiến thức tiền đề

- [Lesson 01 — Ảo hoá & Hypervisor](../lesson-01-virtualization/): hiểu VM để thấy sự khác biệt với container.
- [Tầng 1 — Lesson 02: Process](../../01-Foundations-Processes/lesson-02-process/): tiến trình, PID, không gian tên — nền tảng hiểu PID namespace.
- [Tầng 2 — Lesson 06: Filesystem](../../02-Memory-Storage/lesson-06-filesystem/): VFS, mount point — nền tảng hiểu mount namespace và overlay fs.

---

## 1. Container là gì?

### 1.1. Bài toán đặt ra

💡 **Trực giác — Căn hộ vs phòng trọ:**
Máy ảo (VM) giống như một **căn hộ riêng biệt hoàn toàn** — mỗi căn có bộ khung riêng, mái riêng, hệ thống điện nước riêng, không chia sẻ gì với căn bên cạnh. Container giống **phòng trọ trong cùng một tòa nhà** — mỗi phòng có cửa riêng, nội thất riêng, nhưng dùng chung tòa nhà (kernel Linux), dùng chung đường ống nước (CPU, RAM vật lý), dùng chung hệ thống điện.

Phòng trọ: khởi động nhanh (chỉ cần mở cửa), ít tốn kém, nhưng tường không dày bằng tường bê tông giữa các căn hộ.

**Container** = cô lập **tiến trình** (và các tiến trình con của nó) sao cho tiến trình đó nghĩ mình có toàn bộ hệ thống, nhưng thực ra nó chỉ được nhìn thấy một phần hạn chế — tất cả đều trong **cùng một kernel Linux** của host.

### 1.2. Định nghĩa chính xác

Container là một **nhóm tiến trình Linux** được cô lập bởi:
1. **Namespace**: giới hạn những gì tiến trình nhìn thấy (PID, mạng, mount point, user, IPC...).
2. **cgroup**: giới hạn những gì tiến trình dùng được (CPU, memory, I/O bandwidth...).

Không có kernel riêng, không có "máy ảo" nào cả. Kernel Linux trên host chạy trực tiếp các tiến trình trong container — chỉ là với "kính lọc" namespace và "van điều tiết" cgroup.

❓ **Câu hỏi tự nhiên của người đọc:**

- *"Nếu chỉ cô lập tiến trình, sao lại an toàn?"* — Đủ an toàn cho hầu hết trường hợp, nhưng cô lập kém hơn VM. Nếu container breakout (tiến trình trong container thoát ra namespace), nó có thể ảnh hưởng host. VM breakout cần vượt qua được hypervisor — khó hơn nhiều.
- *"Container chỉ chạy trên Linux?"* — Container Linux (Docker) dùng namespace/cgroup của Linux kernel, chỉ chạy native trên Linux. Docker Desktop trên macOS/Windows thực ra chạy một Linux VM nhỏ bên dưới, container chạy trong VM đó.
- *"Pod trong Kubernetes khác container thế nào?"* — Pod là nhóm container (1 hoặc nhiều) chia sẻ cùng network namespace và volume. Containers trong cùng pod giao tiếp qua localhost.

📝 **Tóm tắt mục 1:**
- Container = cô lập tiến trình, dùng chung kernel Linux host.
- Hai cơ chế: namespace (cô lập view) + cgroup (giới hạn tài nguyên).
- Khác VM: không có kernel riêng, không có hypervisor, khởi động trong mili-giây.

---

## 2. Namespace — Cô lập View

### 2.1. Namespace là gì?

**Namespace** là cơ chế của Linux kernel cho phép tạo ra các "phạm vi nhìn thấy" khác nhau cho các tiến trình. Tiến trình trong namespace A và tiến trình trong namespace B nhìn thấy những thứ khác nhau của cùng một hệ thống.

Linux hiện có 8 loại namespace:

| Namespace | Kernel version | Cô lập gì |
|-----------|---------------|-----------|
| **PID** | 3.8 (2013) | Số PID — tiến trình trong container có PID riêng (PID 1), không thấy PID ngoài |
| **Network (net)** | 2.6.24 (2008) | Network interface, routing table, iptables — container có interface mạng riêng |
| **Mount (mnt)** | 2.4.19 (2002) | Filesystem mount points — container có hệ thống file riêng |
| **UTS** | 2.6.19 (2006) | Hostname và domain name — container có hostname riêng |
| **IPC** | 2.6.19 (2006) | Shared memory, semaphore, message queue — cô lập IPC giữa container |
| **User** | 3.8 (2013) | UID/GID — user root trong container (UID 0) có thể ánh xạ sang UID ≠ 0 ở host |
| **Cgroup** | 4.6 (2016) | Cgroup hierarchy — container thấy cgroup của mình như root |
| **Time** | 5.6 (2020) | System clock offset — container có thể có thời gian khác host |

### 2.2. Demo PID Namespace — Ví dụ số cụ thể

PID namespace là namespace dễ hiểu nhất. Walk-through cụ thể:

**Trên host Linux, tiến trình đang chạy:**
```
Host:
  PID 1    — systemd (init)
  PID 245  — sshd
  PID 1021 — dockerd
  PID 2345 — bash (trong container)   ← cùng tiến trình!
  PID 2346 — nginx (trong container)  ← cùng tiến trình!
```

**Bên trong container, chạy `ps aux`:**
```
Container (nhìn từ trong):
  PID 1    — bash       ← đây THỰC RA là PID 2345 ở host
  PID 7    — nginx      ← đây THỰC RA là PID 2346 ở host
```

Cùng một tiến trình `bash`, nhìn từ host thấy PID 2345, nhìn từ bên trong container thấy PID 1. Kernel Linux duy trì bảng ánh xạ PID namespace cho mỗi namespace.

**Hệ quả:** Tiến trình trong container **không thể** gửi signal đến PID của host (vì nó không "thấy" PID host). Tiến trình host **có thể** kill tiến trình trong container (vì biết PID host = 2345).

### 2.3. Network Namespace

Mỗi container có network namespace riêng, tức là:
- **Network interface riêng**: `eth0` bên trong container là interface ảo (veth pair).
- **Địa chỉ IP riêng**: container có thể có IP `172.17.0.2`, host có `192.168.1.100`.
- **Routing table riêng**: container có bảng định tuyến riêng.
- **iptables riêng**: firewall rule của container tách biệt host.

**Cơ chế kết nối mạng Docker (cụ thể):**
```
Container          Host
[eth0: 172.17.0.2] ←→ [veth0: 172.17.0.1] ←→ [docker0 bridge] ←→ eth0 host ←→ Internet
```

Docker tạo một cặp **veth (virtual Ethernet)**: một đầu đặt trong network namespace của container (`eth0`), đầu kia ở network namespace của host kết nối vào bridge `docker0`. Gói tin đi từ container → veth pair → docker0 bridge → NAT ra ngoài.

**Port mapping** (`docker run -p 8080:80`): iptables DNAT rule trên host: gói đến port 8080 của host → chuyển sang 172.17.0.2:80 trong container.

### 2.4. Mount Namespace

Container có mount namespace riêng: nó có một **filesystem tree riêng** gắn với image layer của nó, không thấy filesystem của host (trừ những gì được mount vào).

Lệnh `docker run -v /host/data:/data` thực ra là: trong mount namespace của container, mount `/host/data` (đường dẫn host) vào `/data` (đường dẫn container).

### 2.5. Tạo namespace thủ công (không cần Docker)

```bash
# Tạo một namespace PID mới và chạy bash trong đó
sudo unshare --pid --fork --mount-proc bash

# Trong shell mới:
ps aux  # Chỉ thấy bash (PID 1) và ps
        # PID 1    bash
        # PID 7    ps

# Từ host, bash đó có PID thật ví dụ 12345
```

`unshare` là lệnh Linux tạo namespace mới. Docker dùng cùng cơ chế kernel này, chỉ là tự động hóa và thêm nhiều tính năng.

⚠ **Lỗi thường gặp:** Nhiều người nghĩ "Docker tạo ra một kernel riêng cho container". Sai. Container Linux chạy trực tiếp trên kernel host. Lệnh kernel trong container = lệnh kernel host — chỉ với namespace filter. Hệ quả: nếu container exploit lỗ hổng kernel, nó ảnh hưởng toàn bộ host.

🔁 **Dừng lại tự kiểm tra:**

Tiến trình Nginx chạy trong container Docker có PID 1 (nhìn từ bên trong container). Từ host, bạn thấy PID của Nginx này là 4521. Hỏi: Nếu bạn chạy `kill -9 4521` trên host, điều gì xảy ra?

<details>
<summary>Đáp án</summary>
Nginx trong container bị kill. Kernel Linux biết PID host 4521 tương ứng với PID container 1. `kill -9` là signal SIGKILL — kernel gửi signal đến tiến trình, bất kể namespace. Từ góc nhìn host, đây chỉ là kill một tiến trình bình thường với PID 4521.
</details>

📝 **Tóm tắt mục 2:**
- Namespace = "kính lọc" giới hạn những gì tiến trình nhìn thấy.
- 8 loại namespace: PID, network, mount, UTS, IPC, user, cgroup, time.
- PID namespace: tiến trình có PID riêng (PID 1 trong container là PID khác ở host).
- Network namespace: container có interface, IP, routing riêng.

---

## 3. cgroup — Giới hạn Tài nguyên

### 3.1. cgroup là gì?

**Control Group (cgroup)** là cơ chế Linux kernel cho phép **giới hạn, đo lường và cô lập** việc dùng tài nguyên của một nhóm tiến trình.

💡 **Trực giác — Giới hạn tốc độ mạng và CPU:**
Tưởng tượng một toà nhà văn phòng (host Linux) với nhiều công ty thuê (container). Ban quản lý (cgroup) quy định: Công ty A không được dùng quá 2 CPU (trong số 16 CPU của toà nhà) và không được dùng quá 4 GB RAM. Dù Công ty A cố dùng nhiều hơn, ban quản lý sẽ throttle (làm chậm) hoặc OOM-kill (buộc thoát) nếu vượt giới hạn.

### 3.2. Các subsystem cgroup quan trọng

| Subsystem | Kiểm soát |
|-----------|-----------|
| **cpu** | CPU time — giới hạn % CPU hoặc số core |
| **cpuset** | Gắn tiến trình vào CPU core cụ thể (CPU affinity) |
| **memory** | Giới hạn RAM — nếu vượt → OOM killer |
| **blkio** | I/O disk — giới hạn MB/s đọc/ghi ổ đĩa |
| **net_cls** | Tag network packet theo class để áp dụng QoS |
| **pids** | Giới hạn số tiến trình trong group (chống fork bomb) |
| **devices** | Kiểm soát truy cập thiết bị (/dev/...) |

### 3.3. Walk-through — Docker run giới hạn tài nguyên

Khi chạy:
```bash
docker run --cpus="1.5" --memory="256m" nginx
```

Docker thực hiện (ví dụ số cụ thể):

**Bước 1:** Tạo cgroup hierarchy tại `/sys/fs/cgroup/`:
```
/sys/fs/cgroup/
  cpu/docker/<container-id>/
    cpu.cfs_quota_us  = 150000   ← 1.5 CPU = 150ms / 100ms period
    cpu.cfs_period_us = 100000
  memory/docker/<container-id>/
    memory.limit_in_bytes = 268435456   ← 256 × 1024 × 1024
    memory.memsw.limit_in_bytes = 268435456
```

**Bước 2:** Mọi tiến trình trong container được gắn vào cgroup này:
```
/sys/fs/cgroup/cpu/docker/<id>/tasks:
  2345   ← PID host của nginx master
  2346   ← PID host của nginx worker 1
  2347   ← PID host của nginx worker 2
```

**Bước 3:** Kernel CPU scheduler thực thi giới hạn:
- Mỗi 100ms (period), container được dùng tối đa 150ms CPU (quota).
- Nếu container đã dùng 150ms trước khi hết 100ms → bị throttled, phải chờ period tiếp theo.
- Trên host 8 core: container tối đa dùng 1.5 core bất kể đang có bao nhiêu tiến trình trong container.

**Bước 4:** Khi container dùng vượt 256 MB RAM:
- Linux memory cgroup kích hoạt **OOM killer** (Out-of-Memory Killer).
- OOM killer chọn tiến trình trong container và gửi SIGKILL.
- Container bị dừng đột ngột. Docker log: `Killed`.

### 3.4. cgroup v1 vs cgroup v2

- **cgroup v1** (kernel 2.6.24): mỗi subsystem có hierarchy riêng → phức tạp, mâu thuẫn khi tiến trình thuộc nhiều group.
- **cgroup v2** (kernel 4.5, ổn định từ 5.x): một hierarchy thống nhất cho tất cả subsystem. Hỗ trợ delegation tốt hơn cho rootless container. Ubuntu 22.04+, RHEL 9+ dùng cgroup v2 mặc định.

🔁 **Dừng lại tự kiểm tra:**

Container được giới hạn `--cpus="0.5"` trên máy 4 core. Nếu trong container có một vòng lặp `while(true)`, vòng lặp sẽ chạy nhanh như thế nào (so với khi không giới hạn)?

<details>
<summary>Đáp án</summary>
Vòng lặp chạy với tốc độ tương đương 0.5 core — tức 50% tốc độ của 1 core vật lý. Cgroup cpu.cfs_quota_us = 50000µs / 100000µs period → mỗi 100ms, tiến trình chỉ được dùng 50ms CPU. Sau 50ms CPU time, scheduler đình chỉ (throttle) tiến trình cho đến hết period. Máy có 4 core nhưng container chỉ thấy "0.5 core" vì bị throttle.
</details>

📝 **Tóm tắt mục 3:**
- cgroup = giới hạn và đo lường tài nguyên (CPU, memory, I/O, PIDs...).
- Docker `--cpus` → `cpu.cfs_quota_us`; `--memory` → `memory.limit_in_bytes`.
- Vượt memory → OOM killer. Vượt CPU → throttled (chờ period tiếp theo).
- cgroup v2 là chuẩn mới, hierarchy thống nhất.

---

## 4. Union Filesystem & Image Layer

### 4.1. Vấn đề: Docker image nhiều lớp

Khi chạy `docker pull ubuntu:22.04`, bạn thấy nhiều "layer" được tải về. Tại sao image phải nhiều lớp? Và làm sao nhiều container cùng dùng chung image mà không conflict?

💡 **Trực giác — Bản vẽ kỹ thuật với transparency:**
Hãy tưởng tượng một bản vẽ kiến trúc. Lớp đầu tiên là nền móng (OS base). Lớp thứ hai là khung nhà (runtime). Lớp thứ ba là nội thất (app). Mỗi lớp trong suốt — nhìn từ trên xuống thấy cả stack. Nếu lớp 3 thay nội thất, chỉ cần thay lớp 3 mà không cần vẽ lại móng và khung. Nhiều người (container) có thể dùng cùng bản vẽ gốc (lớp 1+2) rồi mỗi người tự vẽ thêm lớp riêng (lớp 3 của mình) mà không ảnh hưởng nhau.

### 4.2. OverlayFS — Union Filesystem mà Docker dùng

**OverlayFS** (overlay filesystem) là filesystem mặc định của Docker trên Linux hiện đại. Nó kết hợp nhiều thư mục (directory) thành một filesystem thống nhất.

**Các thành phần:**
- **lowerdir**: lớp read-only — các lớp image Docker.
- **upperdir**: lớp read-write — layer của container hiện tại.
- **merged**: kết quả — những gì tiến trình trong container thấy.

**Ví dụ cụ thể:**

Image Ubuntu 22.04 có 3 lớp (layer):
```
Layer 1 (base): /var/lib/docker/overlay2/abc123/diff/
  bin/ usr/ lib/ etc/ ...  (OS base ~30MB)

Layer 2 (nginx package): /var/lib/docker/overlay2/def456/diff/
  usr/sbin/nginx
  etc/nginx/

Layer 3 (config): /var/lib/docker/overlay2/ghi789/diff/
  etc/nginx/nginx.conf  (config tùy chỉnh)
```

Khi chạy container:
```
upperdir (read-write, của container này):
  /var/lib/docker/overlay2/<container-id>/diff/

lowerdir (read-only, stack các layer):
  /var/lib/docker/overlay2/ghi789/diff :
  /var/lib/docker/overlay2/def456/diff :
  /var/lib/docker/overlay2/abc123/diff

merged (nhìn từ trong container):
  bin/ usr/ lib/ etc/ usr/sbin/nginx etc/nginx/nginx.conf ...
```

### 4.3. Copy-on-Write (CoW)

Khi tiến trình trong container **đọc** file: OverlayFS tìm từ upperdir → lowerdir theo thứ tự, trả về file đầu tiên tìm thấy.

Khi tiến trình trong container **ghi** file đã có trong lowerdir:
1. OverlayFS **copy** file đó từ lowerdir lên upperdir (chỉ xảy ra một lần).
2. Ghi vào bản copy ở upperdir.
3. Từ đó trở đi, container thấy bản đã sửa ở upperdir.
4. Lowerdir vẫn giữ nguyên file gốc — container khác vẫn thấy file gốc.

**Ví dụ Walk-through:**

Container A và Container B cùng dùng image ubuntu:22.04 (lowerdir giống nhau). Container A sửa file `/etc/nginx/nginx.conf`:

```
Trước khi sửa:
  Container A upperdir: (rỗng)
  Container B upperdir: (rỗng)
  lowerdir: etc/nginx/nginx.conf (file gốc)
  Container A thấy: file gốc
  Container B thấy: file gốc

Container A chạy: echo "worker 4" >> /etc/nginx/nginx.conf

Sau khi sửa:
  Container A upperdir: etc/nginx/nginx.conf (bản sửa, "worker 4" ở cuối)
  Container B upperdir: (vẫn rỗng)
  lowerdir: etc/nginx/nginx.conf (file gốc, KHÔNG BỊ THAY ĐỔI)
  Container A thấy: bản sửa (từ upperdir)
  Container B thấy: file gốc (từ lowerdir)
```

**Khi xóa file trong lowerdir:** OverlayFS tạo một file đặc biệt gọi là **whiteout** (`char device 0:0`) ở upperdir — tiến trình trong container không thấy file đó nữa, nhưng lowerdir vẫn giữ nguyên.

### 4.4. Lợi ích thực tế

1. **Tiết kiệm dung lượng:** 10 container từ cùng ubuntu:22.04 image không tốn 10 × 30MB. Chỉ tốn 30MB lowerdir + 10 upperdir (chỉ chứa sự khác biệt).

2. **Tải nhanh:** `docker pull nginx:latest` — nếu máy đã có ubuntu:22.04 layer, chỉ tải các layer mới (nginx, config). Layer chia sẻ không tải lại.

3. **Build cache:** `docker build` — nếu layer trước không thay đổi, layer sau được cache và không rebuild. Rất nhanh khi chỉ sửa application code (lớp cuối).

⚠ **Lỗi thường gặp:** "Dữ liệu ghi vào container được lưu lâu dài". Sai. Khi xóa container, upperdir bị xóa → mất hết dữ liệu đã ghi. Để dữ liệu tồn tại: dùng **volume** (`docker run -v`) — gắn thư mục host vào container, nằm ngoài OverlayFS.

📝 **Tóm tắt mục 4:**
- Image Docker là stack nhiều lớp read-only (lowerdir).
- OverlayFS hợp nhất các lớp thành một filesystem thống nhất.
- Copy-on-Write: ghi mới vào upperdir, lowerdir không đổi → cô lập giữa container.
- Volume: mount thư mục host để dữ liệu tồn tại sau khi xóa container.

---

## 5. Container vs VM — So sánh chi tiết

### 5.1. Bảng so sánh

| Tiêu chí | Container | Máy ảo (VM) |
|----------|-----------|-------------|
| **Kernel** | Dùng chung kernel Linux host | Có kernel riêng (Guest OS) |
| **Khởi động** | ~50–200ms (chỉ start process) | ~30–120 giây (boot full OS) |
| **Overhead** | ~1–5% (namespace/cgroup rất nhẹ) | ~5–20% (trap-and-emulate, VMM) |
| **RAM footprint** | ~5–50 MB (chỉ process + lib) | ~512 MB – 2 GB (kernel + OS) |
| **Cô lập** | Trung bình (share kernel = shared attack surface) | Mạnh (kernel riêng, hypervisor bảo vệ) |
| **Bảo mật (breakout)** | Khó hơn nhưng có thể breakout | Khó hơn (phải vượt hypervisor) |
| **Chạy OS khác** | Không (chỉ Linux nếu host Linux) | Có (Windows, BSD, bất kỳ OS nào) |
| **Dùng chung kernel** | Có | Không |
| **Snapshot/Migration** | Copy image layer (~MB) | Copy VM image (~GB) |
| **Phù hợp** | Microservices, CI/CD, horizontal scale | Cô lập mạnh, OS khác nhau, legacy app |

### 5.2. Khi nào dùng cái nào?

**Dùng container khi:**
- Microservices — deploy nhiều service nhỏ, scale nhanh.
- CI/CD pipeline — build, test, deploy trong môi trường nhất quán.
- Dev environment — `docker run -d postgres` nhanh hơn cài Postgres trực tiếp.
- Kubernetes workload.

**Dùng VM khi:**
- Cần cô lập mạnh (compliance: PCI-DSS, HIPAA).
- Chạy Windows trên Linux host hoặc ngược lại.
- Legacy application cần kernel version cụ thể.
- Firecracker (AWS Lambda) dùng micro-VM: VM nhỏ (125ms boot) + cô lập mạnh của VM.

### 5.3. Container trong VM — "Defense in Depth"

Nhiều hệ thống production kết hợp cả hai:
```
[VM-A (Linux, 4 vCPU, 8 GB)]    [VM-B (Linux, 4 vCPU, 8 GB)]
  container-1: nginx              container-3: api-service
  container-2: redis              container-4: worker
[Hypervisor type 1 (KVM/ESXi)]
[Phần cứng vật lý]
```

VM cung cấp cô lập phần cứng (namespace tenant khác nhau trong cloud). Container cung cấp tính linh động và mật độ cao bên trong VM. Kubernetes trên cloud thường chạy pod trong VM.

---

## 6. Docker dưới nắp ca-pô

### 6.1. Khi bạn chạy `docker run nginx`

Docker thực hiện tuần tự:

**Bước 1: Pull image (nếu chưa có)**
```
Kéo manifest từ registry → tải các layer (blob) chưa có → lưu vào /var/lib/docker/overlay2/
```

**Bước 2: Tạo container layer**
```
Tạo thư mục upperdir: /var/lib/docker/overlay2/<container-id>/diff/
Gắn OverlayFS: lowerdir=layer3:layer2:layer1, upperdir=container-id, merged=merged/
```

**Bước 3: Tạo network namespace**
```
ip netns add <ns-name>
# Trong ns: tạo eth0 ảo (veth pair), gán IP 172.17.0.x, gán default route
```

**Bước 4: Tạo cgroup**
```
mkdir /sys/fs/cgroup/cpu/docker/<id>/
echo <pid> > /sys/fs/cgroup/cpu/docker/<id>/tasks
# Tương tự cho memory, blkio...
```

**Bước 5: clone() — tạo tiến trình mới với namespace**
```c
clone(CLONE_NEWPID | CLONE_NEWNET | CLONE_NEWMNT | CLONE_NEWUTS | CLONE_NEWIPC, ...)
// Tiến trình mới có PID namespace mới, network namespace mới, mount namespace mới...
```

**Bước 6: chroot / pivot_root**
```
pivot_root(merged_dir, put_old)
// Tiến trình mới thấy merged_dir làm root filesystem của mình
```

**Bước 7: execve() — chạy entrypoint**
```
execve("/usr/sbin/nginx", ["-g", "daemon off;"], env)
// Nginx bắt đầu chạy trong container
```

Toàn bộ quá trình mất < 200ms — đó là lý do container "khởi động nhanh".

### 6.2. containerd và runc

Docker không tự làm tất cả — nó dùng các component:

```
Docker CLI → Docker daemon (dockerd) → containerd → runc → kernel namespace/cgroup
```

- **containerd**: container runtime cấp cao — quản lý image, container lifecycle.
- **runc**: container runtime cấp thấp (OCI-compatible) — gọi Linux syscall tạo namespace, cgroup, pivot_root. Là binary thực sự tạo container.
- **OCI (Open Container Initiative)**: chuẩn định nghĩa container format và runtime — containerd, podman, kata-containers đều tuân thủ OCI.

Kubernetes không dùng Docker trực tiếp (từ 1.24+): dùng containerd hoặc CRI-O qua giao diện **CRI (Container Runtime Interface)**.

---

## Bài tập

**Bài 1:** Phân biệt namespace và cgroup.

Điền vào bảng:

| Tình huống | Dùng namespace hay cgroup? |
|------------|--------------------------|
| Container không được thấy tiến trình của container khác | ? |
| Container bị giới hạn chỉ dùng 512 MB RAM | ? |
| Container có hostname "web-server-01" riêng | ? |
| Container không được dùng quá 50% CPU | ? |
| Container có địa chỉ IP riêng 172.17.0.5 | ? |
| Container không tạo được quá 100 tiến trình | ? |

---

**Bài 2:** Walk-through OverlayFS.

Image `myapp:v1` có 2 layer:
- Layer A (base): chứa file `/app/config.json` với nội dung `{"version":1}` và file `/bin/sh`.
- Layer B (app): chứa file `/app/main.py`.

Container C được tạo từ image `myapp:v1`. Tiến trình trong C chạy: `echo '{"version":2}' > /app/config.json`.

(a) File `/app/config.json` trong Layer A thay đổi không?
(b) Container C thấy nội dung gì khi đọc `/app/config.json`?
(c) Nếu tạo container D từ cùng image, D thấy nội dung gì ở `/app/config.json`?
(d) Nếu xóa container C, nội dung `{"version":2}` còn tồn tại không?

---

**Bài 3:** PID namespace.

Host có các tiến trình:
```
PID 1:    init
PID 1200: containerd
PID 2001: bash (PID container = 1)
PID 2002: nginx-master (PID container = 7)
PID 2003: nginx-worker (PID container = 8)
PID 2004: sshd (chạy trên host, không trong container)
```

(a) Từ bên trong container, `ps aux` cho thấy gì?
(b) Từ host, làm sao dừng nginx-master trong container?
(c) Có thể từ trong container gửi `kill -9 1200` để kill containerd không? Giải thích.

---

**Bài 4:** Giới hạn tài nguyên cgroup.

Container được chạy với `--cpus="2" --memory="1g"` trên máy 8 core, 16 GB RAM.

(a) Giá trị `cpu.cfs_quota_us` và `cpu.cfs_period_us` (mặc định 100000) là bao nhiêu?
(b) Trong container, tiến trình chạy đoạn code: `for i in range(10^9): pass` (Python vòng lặp nặng). Tiến trình này có thể dùng tối đa bao nhiêu % tổng CPU vật lý?
(c) Nếu ứng dụng trong container dùng 950 MB RAM, rồi đột ngột allocate thêm 200 MB → tổng 1.15 GB, điều gì xảy ra?

---

**Bài 5:** So sánh container và VM.

Một công ty muốn chạy 200 microservice cùng lúc trên một server 64 core, 256 GB RAM. Mỗi microservice trung bình dùng 0.1 core và 128 MB RAM.

(a) Nếu dùng VM, mỗi VM cần tối thiểu bao nhiêu RAM (bao gồm OS overhead)?
(b) Nếu dùng container (Docker), 200 container cần tổng bao nhiêu RAM?
(c) Server 256 GB RAM có thể host được 200 VM không? 200 container không?
(d) Điểm nào container tốt hơn VM trong trường hợp này? Điểm nào VM tốt hơn?

---

## Lời giải chi tiết

**Bài 1:**

| Tình huống | Giải pháp |
|------------|-----------|
| Không thấy tiến trình container khác | **Namespace** (PID namespace) |
| Giới hạn 512 MB RAM | **cgroup** (memory.limit_in_bytes) |
| Hostname riêng | **Namespace** (UTS namespace) |
| Giới hạn 50% CPU | **cgroup** (cpu.cfs_quota_us = 50000) |
| IP riêng 172.17.0.5 | **Namespace** (network namespace) |
| Không tạo quá 100 tiến trình | **cgroup** (pids.max = 100) |

---

**Bài 2:**

**(a)** Không. Layer A (lowerdir) là read-only — không bao giờ bị sửa đổi. OverlayFS đảm bảo tính bất biến của image layer.

**(b)** Container C thấy `{"version":2}`. Khi tiến trình trong C ghi `/app/config.json`:
1. OverlayFS copy file từ Layer A lên upperdir của container C.
2. Ghi nội dung mới vào bản copy ở upperdir.
3. Từ đó, khi đọc `/app/config.json`, OverlayFS ưu tiên upperdir → trả `{"version":2}`.

**(c)** Container D thấy `{"version":1}` (nội dung gốc từ Layer A). Container D có upperdir riêng, chưa có thay đổi gì → OverlayFS tìm trong lowerdir → Layer A → trả nội dung gốc.

**(d)** Không còn tồn tại. Khi xóa container C, upperdir của C bị xóa cùng. Nội dung `{"version":2}` chỉ tồn tại trong upperdir của C — mất khi container bị xóa. Để giữ lại, phải dùng volume (`-v /host/data:/app/data`).

---

**Bài 3:**

**(a)** `ps aux` trong container chỉ thấy:
```
PID 1    bash
PID 7    nginx-master
PID 8    nginx-worker
```
PID namespace cô lập: tiến trình trong container chỉ thấy các tiến trình trong cùng PID namespace. `init` (PID 1 host), `containerd` (PID 1200), `sshd` (PID 2004) đều vô hình.

**(b)** Từ host: `kill -9 2002` (PID host của nginx-master). Kernel Linux ánh xạ: PID host 2002 = PID container 7 = nginx-master. SIGKILL gửi đến tiến trình bất kể namespace.

**(c)** Không thể. Từ trong container, PID 1200 (containerd) nằm trong PID namespace của host — container không "thấy" PID 1200. Nếu gõ `kill -9 1200`, kernel container xem xét PID namespace: PID 1200 không tồn tại trong PID namespace của container → lỗi "No such process". Đây là tính năng bảo vệ quan trọng của PID namespace.

---

**Bài 4:**

**(a)** 2 CPUs → quota = 2 × period = 2 × 100000 = **200000 µs**. Nghĩa là mỗi 100ms, container được dùng tối đa 200ms CPU time (trải trên tối đa 2 core song song).

**(b)** Máy có 8 core = 800% CPU tổng. Container được 2 core = 200% CPU. Tối đa = 200/800 = **25% tổng CPU vật lý**.

**(c)** Khi tổng vượt 1 GB (limit):
1. Linux memory cgroup phát hiện container dùng > `memory.limit_in_bytes`.
2. **OOM killer** được kích hoạt trong container's cgroup.
3. OOM killer chọn tiến trình dùng nhiều memory nhất trong container và gửi SIGKILL.
4. Ứng dụng bị kill đột ngột. Docker ghi log: `OOM killed`. Container exit với exit code 137 (128 + SIGKILL 9).
5. Docker có thể tự restart container nếu cấu hình `--restart=always`.

---

**Bài 5:**

**(a)** Mỗi VM cần: 128 MB (app) + ~512 MB (OS minimal, vd Alpine Linux) + ~128 MB (kernel overhead) = **~768 MB tối thiểu**. Thực tế thường ≥ 1 GB.

**(b)** 200 container: 200 × (128 MB app + ~10 MB container overhead + shared layers ~50 MB / 200 ≈ 0.25 MB) ≈ 200 × 138 MB ≈ **~27.6 GB**. Các shared image layers tính 1 lần, không nhân 200 lần.

**(c)** 200 VM × 768 MB = **153.6 GB** → vừa đủ trong 256 GB (còn 102 GB cho host OS và overhead). Nhưng 200 VM = 200 kernel = overhead CPU scheduling lớn; boot time 30–120s/VM. Tổng thực tế cần 200 GB+ vì OS bình thường cần 1–2 GB.

200 container × 138 MB = ~27.6 GB → **rất thoải mái** trong 256 GB. Boot < 200ms/container. Triển khai 200 container trong < 1 phút.

**(d)**

| Tiêu chí | Container tốt hơn VM | VM tốt hơn Container |
|----------|---------------------|---------------------|
| Khởi động | ✓ (<200ms vs 30-120s) | |
| RAM footprint | ✓ (~27 GB vs ~150+ GB) | |
| Cô lập bảo mật | | ✓ (kernel riêng mỗi tenant) |
| Compliance (PCI-DSS) | | ✓ (cô lập mạnh, dễ audit) |
| Scale nhanh | ✓ (deploy 200 container < 1 phút) | |
| Chạy microservice | ✓ (overhead thấp, mật độ cao) | |

---

## Liên kết và bài tiếp theo

- Đã học:
  - [Lesson 01 — Ảo hoá & Hypervisor](../lesson-01-virtualization/): VM là nền tảng để so sánh với container.
  - [Tầng 2 — Lesson 06: Filesystem](../../02-Memory-Storage/lesson-06-filesystem/): VFS, mount — nền tảng hiểu mount namespace và OverlayFS.
- Bài tiếp theo:
  - [Lesson 03 — Bảo mật & cô lập OS](../lesson-03-os-security/): namespace user cô lập UID/GID — liên hệ trực tiếp với bảo mật container. Setuid, capabilities — cơ chế quyền mà container cần kiểm soát.

---

## 📝 Tổng kết Lesson 02

1. **Container** = cô lập tiến trình dùng chung kernel Linux host. Không có kernel riêng, không hypervisor — chỉ là tiến trình Linux với "kính lọc" namespace và "van điều tiết" cgroup.
2. **Namespace** (8 loại): giới hạn những gì tiến trình nhìn thấy. PID namespace → tiến trình có PID riêng (PID 1 trong container ≠ PID 1 ở host). Network namespace → IP, interface, routing riêng.
3. **cgroup**: giới hạn tài nguyên. `--cpus` → `cpu.cfs_quota_us`; `--memory` → `memory.limit_in_bytes`. Vượt CPU → throttled; vượt memory → OOM kill.
4. **OverlayFS**: image nhiều lớp read-only (lowerdir) + lớp read-write của container (upperdir). Copy-on-Write: chỉ copy file lên upperdir khi ghi. Nhiều container cùng image → tiết kiệm dung lượng.
5. **Container vs VM**: container nhẹ hơn, khởi động nhanh hơn, nhưng cô lập kém hơn (share kernel = shared attack surface). Dùng cả hai cùng nhau trong production ("defense in depth").
