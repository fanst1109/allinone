# Lesson 01 — Client-server & Socket

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu mô hình **client-server**: ai khởi tạo kết nối, ai lắng nghe; so sánh với mô hình peer-to-peer.
- Biết **socket** là gì: điểm cuối giao tiếp được định nghĩa bởi bộ ba (địa chỉ IP, cổng, giao thức).
- Nắm rõ **vòng đời socket TCP** phía server (`socket → bind → listen → accept`) và phía client (`socket → connect → send/recv → close`).
- Hiểu **4-tuple** phân biệt nhiều kết nối đồng thời tới cùng một server:port.
- Biết đọc và viết code TCP echo server/client đơn giản (Go).
- Phân biệt **blocking** vs **non-blocking** và biết concurrency cơ bản (mỗi client một goroutine).

## Kiến thức tiền đề

- [Tầng 1 — Lesson 07: UDP](../../01-Foundations-LowerLayers/lesson-07-udp/) — giao thức không kết nối, so sánh nền tảng.
- [Tầng 1 — Lesson 08: TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/) — bắt tay 3 bước, SEQ/ACK, trạng thái kết nối.
- Lập trình cơ bản Go/Python — xem [Programming/](../../../Programming/).

---

## 1. Mô hình Client-Server

### 1.1 Ý tưởng cốt lõi

💡 **Hình dung**: Hãy nghĩ đến nhà hàng. **Server** là nhân viên phục vụ đứng chờ khách — luôn ở đó, sẵn sàng phục vụ. **Client** là khách hàng — chủ động bước vào và đặt món. Khách không thể phục vụ nhau trực tiếp; mọi yêu cầu phải đi qua nhân viên.

Trong mạng máy tính, mô hình client-server (máy khách-máy chủ) định nghĩa **vai trò rõ ràng**:

| Vai trò | Đặc điểm | Ví dụ |
|---------|----------|-------|
| **Server** | Lắng nghe liên tục, xử lý yêu cầu đến | Apache, Nginx, PostgreSQL, game server |
| **Client** | Khởi tạo kết nối, gửi yêu cầu, nhận kết quả | Trình duyệt, ứng dụng di động, curl |

**Hai tính chất bất đối xứng quan trọng**:

1. **Server lắng nghe trước, client kết nối sau** — server phải "mở cửa" trước khi client có thể gõ cửa.
2. **Server thụ động, client chủ động** — chỉ client mới khởi tạo phiên giao tiếp; server không tự "gọi" client.

### 1.2 Ví dụ thực tế

**Web (HTTP/HTTPS)**:
- Server: `nginx` trên `93.184.216.34:443` (example.com) lắng nghe liên tục.
- Client: Trình duyệt Chrome mở kết nối từ `192.168.1.5:54321` → `93.184.216.34:443`.
- Trao đổi: Client gửi `GET /index.html HTTP/1.1`, server trả `200 OK` + nội dung HTML.

**Game online**:
- Server game lắng nghe ở `203.0.113.10:7777`.
- 500 người chơi cùng kết nối vào một server — mỗi người là một client riêng biệt.
- Server tổng hợp trạng thái, phân phát lại cho tất cả client.

**Cơ sở dữ liệu**:
- MySQL server lắng nghe ở `127.0.0.1:3306`.
- Ứng dụng web (client) gửi câu lệnh SQL, MySQL (server) trả về kết quả.

### 1.3 So sánh với Peer-to-Peer (P2P)

Trong mô hình **peer-to-peer (ngang hàng)**, không có server cố định — mỗi máy vừa là client vừa là server:

| Tiêu chí | Client-Server | Peer-to-Peer |
|----------|--------------|--------------|
| Vai trò | Cố định (S/C khác nhau) | Linh hoạt (mỗi node đều hai vai) |
| Điểm tập trung | Có (server) | Không |
| Khả năng mở rộng | Giới hạn bởi server | Tốt hơn khi nhiều peer |
| Ví dụ | Web, email, game thương mại | BitTorrent, IPFS, WebRTC |

❓ **Câu hỏi tự nhiên**:

**"Nếu server bị sập thì sao?"** — Với client-server: toàn bộ client mất kết nối — đây là điểm yếu (Single Point of Failure). Vì vậy hệ thống lớn dùng **cụm server** (cluster) và **load balancer**. Với P2P: mạng vẫn hoạt động vì không phụ thuộc một điểm.

**"Tại sao không dùng P2P cho mọi thứ?"** — P2P khó kiểm soát chất lượng dịch vụ, khó bảo mật, khó gỡ lỗi. Client-server phù hợp hơn khi cần tập trung dữ liệu, kiểm soát quyền truy cập.

📝 **Tóm tắt mục 1**:
- Server lắng nghe liên tục; client chủ động kết nối.
- Client-server: tập trung, dễ quản lý; P2P: phân tán, khó kiểm soát.
- Ví dụ web: trình duyệt (client) kết nối đến Nginx (server) trên port 443.

---

## 2. Socket — Điểm cuối giao tiếp

### 2.1 Định nghĩa

💡 **Hình dung**: Socket giống như **ổ cắm điện**. Bản thân ổ cắm là điểm kết nối; phích cắm (client) cắm vào mới có điện chạy. Mỗi ổ cắm ở một vị trí cố định (địa chỉ IP + cổng); nhiều phích cắm có thể cắm vào cùng một ổ (nhiều client kết nối cùng server port).

**Socket** là điểm cuối (endpoint) của một kênh giao tiếp mạng, được xác định bởi bộ ba:

```
Socket = (Địa chỉ IP, Số cổng, Giao thức)
```

Ví dụ cụ thể:
- `(192.168.1.100, 80, TCP)` — socket của web server lắng nghe.
- `(192.168.1.5, 54321, TCP)` — socket phía client khi kết nối đến web server.

### 2.2 Cổng (Port) — vì sao cần?

Một máy tính có **một địa chỉ IP** nhưng có thể chạy nhiều dịch vụ đồng thời. Cổng (port) giúp hệ điều hành phân loại gói tin: số cổng trong header TCP/UDP quyết định gói này thuộc về tiến trình nào.

```
Địa chỉ IP   → chỉ đến đúng máy (như số nhà)
Cổng         → chỉ đến đúng dịch vụ/tiến trình (như số phòng)
```

Ví dụ: máy `203.0.113.10` chạy đồng thời:
- Nginx lắng nghe port **80** (HTTP) và **443** (HTTPS).
- OpenSSH lắng nghe port **22**.
- PostgreSQL lắng nghe port **5432**.

Khi gói TCP đến `203.0.113.10:443`, kernel chuyển đến tiến trình Nginx. Gói đến `:22` chuyển đến sshd.

**Phân loại cổng** (theo IANA):

| Dải | Tên | Đặc điểm |
|-----|-----|----------|
| 0–1023 | Well-known ports | Cần quyền root để lắng nghe; HTTP=80, HTTPS=443, SSH=22, DNS=53 |
| 1024–49151 | Registered ports | Đăng ký với IANA; MySQL=3306, Redis=6379, MongoDB=27017 |
| 49152–65535 | Dynamic/Ephemeral | OS tự cấp cho client khi kết nối đi ra (outgoing) |

### 2.3 Liên hệ TCP và UDP

Socket không chỉ dùng cho TCP; UDP cũng có socket:
- **TCP socket**: kết nối có trạng thái, đáng tin cậy — xem [Lesson 08 TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/).
- **UDP socket**: không kết nối, không đảm bảo thứ tự — xem [Lesson 07 UDP](../../01-Foundations-LowerLayers/lesson-07-udp/).

⚠ **Lỗi thường gặp**: Nhiều người nhầm "socket" và "kết nối" là một. Thực ra:
- **Socket** = endpoint (có thể chỉ là một đầu, chưa kết nối với ai).
- **Kết nối** = hai socket được liên kết với nhau (sau khi TCP bắt tay 3 bước thành công).

📝 **Tóm tắt mục 2**:
- Socket = (IP, port, protocol) — điểm cuối giao tiếp.
- Port xác định dịch vụ/tiến trình; ephemeral port (49152–65535) do OS cấp cho client.
- TCP socket có trạng thái; UDP socket không kết nối.

---

## 3. Vòng đời Socket TCP

### 3.1 Tổng quan — hai phía

Quá trình thiết lập và đóng kết nối TCP thông qua socket diễn ra qua các lời gọi hệ thống (system call):

```
PHÍA SERVER                         PHÍA CLIENT
──────────────────────────────────  ──────────────────────────────────
socket()  ← tạo socket              socket()  ← tạo socket
bind()    ← gán địa chỉ:port
listen()  ← bắt đầu lắng nghe
                                     connect() ← khởi tạo bắt tay 3 bước
accept()  ← chấp nhận kết nối ◄────────────────────────────────────
           (trả về socket mới)
send()/recv() ◄──────────────────► send()/recv()
close()   ← đóng socket             close()   ← đóng socket
```

### 3.2 Phía Server — từng bước

**Bước 1 — `socket()`**: Tạo socket, nhận lại một file descriptor (số nguyên đại diện cho socket).

```go
// Go: tạo TCP socket IPv4
ln, err := net.Listen("tcp", "0.0.0.0:8080")
// Tương đương C: fd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)
```

**Bước 2 — `bind()`**: Gán địa chỉ IP và cổng cho socket. Bước này khai báo "tôi muốn nhận dữ liệu gửi đến IP:port này".

```
bind(fd, (0.0.0.0, 8080))
→ "Gán socket này cho mọi interface, port 8080"
```

`0.0.0.0` nghĩa là lắng nghe trên **tất cả** network interface (cả `127.0.0.1` lẫn IP công khai). Nếu dùng `127.0.0.1:8080`, chỉ nhận kết nối từ localhost.

**Bước 3 — `listen()`**: Chuyển socket sang chế độ lắng nghe. Tham số `backlog` (ví dụ: 128) xác định độ dài hàng đợi kết nối đang chờ được `accept()`.

```
listen(fd, backlog=128)
→ Kernel bắt đầu xếp hàng kết nối đến; server chưa xử lý ngay
```

**Bước 4 — `accept()`**: Lấy một kết nối ra khỏi hàng đợi. Đây là bước **blocking** — server ngủ tại đây cho đến khi có client kết nối. `accept()` trả về **socket mới** dành riêng cho kết nối này.

```
conn_fd = accept(fd)
→ Trả về socket riêng cho client vừa kết nối
→ fd gốc vẫn tiếp tục listen(), conn_fd dùng để trao đổi dữ liệu
```

💡 **Điểm hay**: socket ban đầu (`fd`) gọi là **listening socket** — chỉ dùng để đón kết nối mới, không truyền dữ liệu. Socket được tạo ra bởi `accept()` gọi là **connected socket** — dùng để gửi/nhận với đúng client đó.

### 3.3 Phía Client — từng bước

**Bước 1 — `socket()`**: Tạo socket (giống server).

**Bước 2 — `connect()`**: Khởi tạo bắt tay 3 bước TCP tới server. Kernel tự **bind** một ephemeral port (ví dụ: 54321) cho client trước khi gửi SYN.

```
connect(fd, (93.184.216.34, 80))
→ Kernel gửi SYN đến server
→ Chờ SYN-ACK từ server
→ Gửi ACK
→ Kết nối ESTABLISHED — connect() trả về thành công
```

**Bước 3 — `send()` / `recv()`**: Gửi và nhận dữ liệu qua kết nối đã thiết lập.

**Bước 4 — `close()`**: Đóng kết nối. TCP gửi FIN — xem thêm chi tiết quá trình đóng 4 bước tại [Lesson 08 TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/).

❓ **Câu hỏi tự nhiên**:

**"Tại sao server cần `listen()` riêng, không kết hợp vào `bind()`?"** — Tách biệt hai bước cho phép server chuẩn bị socket đầy đủ rồi mới bắt đầu nhận kết nối. Trong thực tế server thường `bind()` + set các option (SO_REUSEADDR, v.v.) trước khi `listen()`.

**"backlog là gì?"** — Kernel duy trì hai hàng đợi: hàng chờ bắt tay 3 bước chưa hoàn thành (SYN_RECEIVED) và hàng chờ được `accept()` (ESTABLISHED chưa được lấy). `backlog` giới hạn tổng hai hàng này. Nếu đầy, kernel tự động từ chối kết nối mới bằng cách bỏ qua gói SYN.

🔁 **Tự kiểm tra**: Đặt lại thứ tự đúng cho phía server TCP: `listen`, `accept`, `bind`, `socket`, `send/recv`, `close`.

<details>
<summary>Đáp án</summary>

`socket()` → `bind()` → `listen()` → `accept()` → `send()/recv()` → `close()`

</details>

📝 **Tóm tắt mục 3**:
- Server: `socket → bind → listen → accept → send/recv → close`.
- Client: `socket → connect → send/recv → close`.
- `accept()` tạo **connected socket mới** cho mỗi client; listening socket tiếp tục chờ.
- `connect()` kích hoạt bắt tay 3 bước TCP; ephemeral port được kernel tự cấp.

---

## 4. Cổng lắng nghe, Cổng kết nối và 4-Tuple

### 4.1 Phân biệt listening port và connected port

Sau khi server gọi `listen()`, hệ điều hành ghi nhận:

```
Server listening socket: (0.0.0.0, 80, TCP)  ← cổng lắng nghe (well-known)
```

Khi client kết nối, OS phía client cấp một ephemeral port, ví dụ 54321:

```
Client socket:  (192.168.1.5, 54321, TCP)
Server socket:  (203.0.113.10, 80, TCP)
```

Sau khi `accept()`, server tạo **connected socket** riêng. Cổng phía server của connected socket **vẫn là 80** — không phải cổng mới!

### 4.2 4-Tuple phân biệt kết nối

Vậy nếu nhiều client cùng kết nối vào `203.0.113.10:80`, kernel phân biệt bằng cách nào?

Mỗi kết nối TCP được xác định duy nhất bởi **4 giá trị** (gọi là 4-tuple):

```
(Src IP, Src Port, Dst IP, Dst Port)
```

Ví dụ ba client kết nối đồng thời vào `203.0.113.10:80`:

| Kết nối | Src IP | Src Port | Dst IP | Dst Port |
|---------|--------|----------|--------|----------|
| Client A | 192.168.1.5 | **54321** | 203.0.113.10 | 80 |
| Client B | 192.168.1.6 | **54322** | 203.0.113.10 | 80 |
| Client C | 192.168.1.5 | **54323** | 203.0.113.10 | 80 |

Ba kết nối đều đến cùng `203.0.113.10:80`, nhưng mỗi kết nối có **src port khác nhau** → 4-tuple khác nhau → kernel định tuyến đúng.

Lưu ý: Client A và Client C cùng IP (`192.168.1.5`) nhưng **src port khác** (`54321` vs `54323`) → vẫn là hai kết nối riêng biệt.

### 4.3 Số kết nối tối đa lý thuyết

Với server `203.0.113.10:80`, số kết nối đồng thời tối đa từ **một client IP** là số ephemeral port có thể dùng: khoảng 16.384 port (49152–65535). Từ **mọi IP trên internet** thì về lý thuyết vô hạn (mỗi IP có 16k+ port riêng).

Giới hạn thực tế đến từ tài nguyên OS: mỗi socket tiêu tốn file descriptor, bộ nhớ kernel; Linux mặc định có `ulimit -n = 1024` file descriptor mỗi tiến trình — cần điều chỉnh cho server lớn.

❓ **Câu hỏi tự nhiên**:

**"Làm sao kernel biết gói tin này thuộc kết nối nào?"** — Mỗi gói TCP có header chứa src/dst IP (từ IP header) và src/dst port (từ TCP header) — đủ để xác định 4-tuple. Kernel tra bảng kết nối (`conntrack`/socket table) tìm socket tương ứng.

**"Nếu server dùng `SO_REUSEPORT`, có thay đổi gì?"** — `SO_REUSEPORT` cho phép nhiều tiến trình/thread cùng `bind()` một port → kernel phân phối kết nối đến các socket đó theo thuật toán round-robin hoặc hash. Dùng để tận dụng đa nhân CPU.

⚠ **Lỗi thường gặp**: Nhầm rằng mỗi client kết nối làm server "mở thêm port mới". **Sai** — server luôn dùng cùng port 80; kernel phân biệt bằng 4-tuple, không tạo thêm port.

🔁 **Tự kiểm tra**: Client A `(10.0.0.1:60000)` và Client B `(10.0.0.2:60000)` cùng kết nối vào server `(10.0.0.3:443)`. Có phải 4-tuple giống nhau không?

<details>
<summary>Đáp án</summary>

**Không**. Client A: `(10.0.0.1, 60000, 10.0.0.3, 443)`. Client B: `(10.0.0.2, 60000, 10.0.0.3, 443)`. Src IP khác nhau → 4-tuple khác nhau → hai kết nối riêng biệt.

</details>

📝 **Tóm tắt mục 4**:
- Cổng lắng nghe (well-known): cố định, ví dụ 80, 443. Cổng kết nối phía client: ephemeral, do OS cấp.
- 4-tuple `(Src IP, Src Port, Dst IP, Dst Port)` xác định duy nhất mỗi kết nối TCP.
- Server **không** mở thêm port khi client kết nối; port phía server luôn là port lắng nghe.

---

## 5. Code ví dụ — TCP Echo Server & Client (Go)

### 5.1 TCP Echo Server

```go
// echo_server.go — server lắng nghe, nhận dữ liệu và gửi lại y nguyên
package main

import (
    "fmt"
    "io"
    "net"
)

func main() {
    // Bước 1+2+3: socket() + bind() + listen() — gộp trong net.Listen
    ln, err := net.Listen("tcp", "0.0.0.0:9000")
    if err != nil {
        panic(err)
    }
    defer ln.Close()
    fmt.Println("Server đang lắng nghe tại :9000")

    for {
        // Bước 4: accept() — chặn tại đây đến khi có client
        conn, err := ln.Accept()
        if err != nil {
            fmt.Println("Lỗi accept:", err)
            continue
        }
        // Tạo goroutine riêng cho mỗi client → không block server loop
        go handleClient(conn)
    }
}

func handleClient(conn net.Conn) {
    defer conn.Close() // Đóng kết nối khi xử lý xong

    remote := conn.RemoteAddr().String()
    fmt.Printf("[+] Kết nối mới từ %s\n", remote)

    // Bước 5: send/recv — copy dữ liệu nhận được và gửi lại
    // io.Copy đọc đến khi client đóng kết nối (EOF)
    n, err := io.Copy(conn, conn)
    if err != nil && err != io.EOF {
        fmt.Printf("[-] Lỗi với %s: %v\n", remote, err)
    }
    fmt.Printf("[-] %s ngắt kết nối (đã echo %d byte)\n", remote, n)
    // Bước 6: close() — thực hiện bởi defer conn.Close()
}
```

### 5.2 TCP Echo Client

```go
// echo_client.go — client kết nối server, gửi tin, nhận echo
package main

import (
    "bufio"
    "fmt"
    "net"
    "os"
    "time"
)

func main() {
    // Bước 1+2: socket() + connect() — gộp trong net.Dial
    // Go tự cấp ephemeral port phía client
    conn, err := net.Dial("tcp", "127.0.0.1:9000")
    if err != nil {
        panic(err)
    }
    defer conn.Close() // Bước 4: close()

    fmt.Printf("Đã kết nối: local=%s remote=%s\n",
        conn.LocalAddr(), conn.RemoteAddr())

    // Bước 3: send/recv
    messages := []string{"Xin chào!", "Đây là gói tin thứ hai", "Tạm biệt"}
    for _, msg := range messages {
        // Gửi dữ liệu
        _, err = fmt.Fprintln(conn, msg)
        if err != nil {
            fmt.Println("Lỗi gửi:", err)
            return
        }

        // Nhận echo (đặt deadline để tránh chờ mãi)
        conn.SetReadDeadline(time.Now().Add(3 * time.Second))
        resp, err := bufio.NewReader(conn).ReadString('\n')
        if err != nil {
            fmt.Println("Lỗi nhận:", err)
            return
        }
        fmt.Printf("Echo: %q\n", resp)
    }
}
```

### 5.3 Kết quả mẫu khi chạy

Chạy server trước (`go run echo_server.go`), sau đó chạy client (`go run echo_client.go`):

```
[Server]
Server đang lắng nghe tại :9000
[+] Kết nối mới từ 127.0.0.1:54321
[-] 127.0.0.1:54321 ngắt kết nối (đã echo 47 byte)

[Client]
Đã kết nối: local=127.0.0.1:54321 remote=127.0.0.1:9000
Echo: "Xin chào!\n"
Echo: "Đây là gói tin thứ hai\n"
Echo: "Tạm biệt\n"
```

Lưu ý: `local=127.0.0.1:54321` — OS tự cấp ephemeral port `54321` cho client, không cần gọi `bind()`.

Liên kết thực hành: xem thêm ví dụ socket nâng cao tại [../../../Programming/](../../../Programming/).

---

## 6. Blocking, Non-blocking và Concurrency

### 6.1 Blocking I/O (mặc định)

Theo mặc định, các lời gọi socket là **blocking** — tiến trình bị treo cho đến khi có dữ liệu hoặc kết nối:

- `accept()`: treo cho đến khi có client kết nối.
- `recv()` / `Read()`: treo cho đến khi nhận được dữ liệu hoặc kết nối đóng.
- `connect()`: treo cho đến khi bắt tay 3 bước hoàn thành (hoặc timeout).

Mô hình đơn giản nhất (nhưng kém hiệu quả): server blocking một luồng, chỉ phục vụ một client tại một thời điểm:

```
Nhận client A → xử lý xong → nhận client B → xử lý xong → ...
```

Client B phải **chờ** client A hoàn thành. Không thể mở rộng.

### 6.2 Concurrency — Mỗi client một goroutine

Giải pháp phổ biến nhất: **mỗi kết nối chạy trên một goroutine/thread riêng**. Server loop chính chỉ gọi `accept()` và tạo goroutine mới:

```go
for {
    conn, _ := ln.Accept()       // Blocking — chờ client
    go handleClient(conn)        // Non-blocking — tạo goroutine mới ngay lập tức
}
// Server loop tiếp tục accept() ngay, không chờ handleClient xong
```

Trong Go, goroutine rất nhẹ (~2KB stack ban đầu, không phải thread OS); chạy 10.000+ goroutine đồng thời là bình thường. Với C/Java, tương đương là thread pool.

### 6.3 Non-blocking I/O và Multiplexing

Khi số kết nối lên đến hàng chục nghìn, mô hình "một goroutine/thread per connection" tốn nhiều tài nguyên. Giải pháp thay thế:

- **Non-blocking socket** (`O_NONBLOCK`): lời gọi `recv()` trả về ngay lập tức dù không có dữ liệu.
- **I/O multiplexing** (`select`, `poll`, `epoll` trên Linux): một luồng giám sát nhiều socket, xử lý socket nào sẵn sàng.

```
epoll_wait([socket1, socket2, ..., socketN])
→ Trả về danh sách socket có dữ liệu chờ
→ Xử lý từng cái
```

Go runtime tự sử dụng `epoll` bên dưới — lập trình viên vẫn viết code blocking style nhưng thực tế là non-blocking.

❓ **Câu hỏi tự nhiên**:

**"Goroutine có giải quyết được mọi vấn đề?"** — Không. Goroutine phù hợp với workload I/O-bound (chờ mạng). Với CPU-bound nặng, vẫn cần cân nhắc số GOMAXPROCS và sử dụng worker pool.

**"Nếu client không close() thì sao?"** — Kết nối ở trạng thái ESTABLISHED vô hạn; goroutine bị treo tại `Read()`. Cần đặt **deadline** (`SetReadDeadline`, `SetDeadline`) hoặc timeout ở tầng ứng dụng.

📝 **Tóm tắt mục 6**:
- Blocking I/O: mỗi lời gọi chờ đến khi có kết quả — đơn giản nhưng không scale.
- Concurrency cơ bản: mỗi client một goroutine/thread — phổ biến, đủ tốt cho vừa/nhỏ.
- Non-blocking + epoll: một luồng xử lý nhiều socket — cần cho hàng chục nghìn kết nối.

---

## 7. Ứng dụng thực tế trong phần mềm

> 💡 **Socket là API mọi networking code cuối cùng dùng — `net.Listen`/`Dial` trong Go là wrapper quanh socket. Hiểu nó = hiểu mọi server/client.**

| Khái niệm | Trong code thật |
|-----------|-----------------|
| **`net.Listen` / `Accept` loop** | Mọi server (HTTP, gRPC, DB) đều là accept loop bên dưới |
| **Goroutine per connection** | Mô hình concurrency của server Go ([nối goroutine](../../../Programming/lesson-27-goroutines-channels/)) |
| **Read/write deadline** | Timeout chống connection treo ([nối TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/)) |
| **`SO_REUSEADDR`, backlog** | Restart server không "address already in use", chịu burst connection |

### 7.1. Ví dụ cụ thể — server Go là accept loop + goroutine

```go
ln, _ := net.Listen("tcp", ":8080")
for {
	conn, _ := ln.Accept()       // chờ connection mới
	go handle(conn)              // mỗi connection một goroutine → xử lý song song
}
```

`http.ListenAndServe` chính là pattern này bên trong. Goroutine-per-connection cho Go xử lý hàng chục nghìn connection đồng thời rẻ (goroutine nhẹ ~vài KB, khác thread OS ~MB) — đây là vì sao Go hợp network server. Mỗi `handle` phải set **deadline** (`conn.SetReadDeadline`) chống client chậm/chết treo goroutine ([nối Slowloris](../../../Programming/lesson-42-http-net-deep/)) và `defer conn.Close()` tránh leak.

> ⚠ **Bẫy socket thật: leak FD + thiếu deadline + chặn accept loop.** (1) Quên `conn.Close()` → rò rỉ file descriptor → "too many open files". (2) Thiếu read/write deadline → một client treo giữ goroutine + connection mãi → tích lũy → cạn tài nguyên. (3) Làm việc nặng **trong** accept loop (thay vì goroutine) → chặn nhận connection mới. (4) Quá nhiều goroutine nếu mỗi connection tạo thêm goroutine không giới hạn → dùng worker pool ([nối concurrency patterns](../../../Programming/lesson-36-concurrency-patterns/)).

### 7.2. 📝 Tóm tắt mục 7

- Socket = API nền mọi server/client; Go: `Listen`→`Accept` loop + **goroutine per connection** (nhẹ → vạn connection rẻ).
- Bắt buộc: **deadline** (chống treo), **`defer Close()`** (chống FD leak), không làm việc nặng trong accept loop.
- `http.ListenAndServe`/gRPC server đều là pattern này bên dưới.

## 8. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1 — Thứ tự lời gọi hệ thống**

Sắp xếp đúng thứ tự các lời gọi socket cho phía **server TCP** lắng nghe trên port 443:

```
listen()   accept()   close()   socket()   bind()   send()/recv()
```

---

**Bài 2 — Phân biệt kết nối bằng 4-tuple**

Server `10.0.0.1:8080` nhận được ba gói TCP với thông tin sau:

| Gói | Src IP | Src Port | Dst IP | Dst Port |
|-----|--------|----------|--------|----------|
| A | 172.16.0.5 | 50001 | 10.0.0.1 | 8080 |
| B | 172.16.0.5 | 50002 | 10.0.0.1 | 8080 |
| C | 172.16.0.6 | 50001 | 10.0.0.1 | 8080 |

(a) Có bao nhiêu kết nối riêng biệt?
(b) Gói A và gói C có cùng src port (50001) — đây có phải cùng kết nối không? Tại sao?

---

**Bài 3 — Đọc tình huống**

Một sinh viên viết server đơn giản (không dùng goroutine):

```go
ln, _ := net.Listen("tcp", ":7777")
conn1, _ := ln.Accept()
// Xử lý conn1... (mất 10 giây)
conn2, _ := ln.Accept()
```

Client thứ 2 kết nối vào giây thứ 2. Điều gì xảy ra với client thứ 2 trong 8 giây chờ? Kernel có từ chối kết nối không?

---

**Bài 4 — Sửa lỗi thiếu bước**

Đoạn code server dưới đây có lỗi. Xác định lỗi và sửa:

```go
ln, _ := net.Listen("tcp", ":8080")
conn, _ := ln.Accept()

// Xử lý 1000 client đồng thời
for i := 0; i < 1000; i++ {
    conn, _ = ln.Accept()
    handleClient(conn) // KHÔNG có "go" keyword
}
```

---

**Bài 5 — Tính số kết nối đồng thời**

Server `192.168.0.1:80` đang phục vụ các kết nối. Ephemeral port range là 49152–65535.

(a) Từ một client IP duy nhất `10.0.0.5`, có thể tạo tối đa bao nhiêu kết nối đồng thời đến server?
(b) Nếu có 200 client IP khác nhau, mỗi client tạo 100 kết nối, tổng server đang xử lý bao nhiêu kết nối?
(c) Điều gì thực sự giới hạn số kết nối trên một server Linux thông thường?

---

**Bài 6 — Phân tích log**

Server log hiển thị:

```
[+] Kết nối mới từ 10.0.0.5:54321
[+] Kết nối mới từ 10.0.0.5:54322
[+] Kết nối mới từ 10.0.0.7:54321
```

(a) Có bao nhiêu client khác nhau?
(b) Client nào có thể đã mở nhiều tab trình duyệt hoặc nhiều request song song?

---

### Lời giải chi tiết

**Lời giải Bài 1**:

Thứ tự đúng:
```
socket() → bind() → listen() → accept() → send()/recv() → close()
```

Giải thích từng bước:
1. `socket()` — tạo socket, nhận file descriptor. Chưa gán địa chỉ nào.
2. `bind()` — gán `(0.0.0.0, 443, TCP)` cho socket. Server khai báo "tôi ở đây".
3. `listen()` — bật chế độ lắng nghe, kernel bắt đầu nhận SYN và xếp hàng.
4. `accept()` — lấy một kết nối đã ESTABLISHED ra khỏi hàng đợi. Blocking.
5. `send()/recv()` — trao đổi dữ liệu với client qua connected socket.
6. `close()` — gửi FIN, đóng kết nối.

---

**Lời giải Bài 2**:

(a) **Ba kết nối riêng biệt**. Mỗi 4-tuple là duy nhất:
- A: `(172.16.0.5, 50001, 10.0.0.1, 8080)`
- B: `(172.16.0.5, 50002, 10.0.0.1, 8080)` — cùng src IP nhưng src port khác
- C: `(172.16.0.6, 50001, 10.0.0.1, 8080)` — src IP khác

(b) **Không phải cùng kết nối**. Dù A và C cùng src port `50001`, nhưng src IP khác nhau (`172.16.0.5` vs `172.16.0.6`). 4-tuple hoàn toàn khác → hai kết nối riêng. Đây chứng minh cần đủ cả 4 giá trị để phân biệt, không chỉ src port.

---

**Lời giải Bài 3**:

Client thứ 2 **không bị từ chối** — kernel đã chấp nhận kết nối TCP (hoàn tất bắt tay 3 bước) và đặt vào hàng đợi `listen backlog`. Từ phía client thứ 2, `connect()` trả về thành công ngay.

Tuy nhiên, `accept()` phía server chỉ được gọi sau khi xử lý xong client 1 (sau 8 giây). Trong 8 giây đó, client 2 đang chờ trong hàng đợi kernel — kết nối đã thiết lập nhưng chưa có goroutine/thread nào xử lý. Nếu ứng dụng client gửi dữ liệu ngay, dữ liệu được buffer trong kernel TCP receive buffer (mặc định ~4-128KB).

**Cải thiện**: thêm `go handleClient(conn)` để mỗi client được xử lý song song.

---

**Lời giải Bài 4**:

**Lỗi**: `handleClient(conn)` không có keyword `go` → server xử lý **tuần tự từng client một**, không phải đồng thời. Client thứ 2 phải chờ client 1 xong.

**Sửa**:
```go
ln, _ := net.Listen("tcp", ":8080")
conn, _ := ln.Accept()

for i := 0; i < 1000; i++ {
    conn, _ = ln.Accept()
    go handleClient(conn) // Thêm "go" — mỗi client một goroutine
}
```

Ngoài ra, đoạn code ban đầu còn `conn, _ := ln.Accept()` thừa trước vòng lặp — kết nối đó không được xử lý, nên xóa đi.

---

**Lời giải Bài 5**:

(a) Ephemeral port range: 49152–65535 → số port = 65535 − 49152 + 1 = **16.384 kết nối** tối đa từ một IP.

(b) 200 clients × 100 kết nối = **20.000 kết nối** đồng thời trên server.

(c) Giới hạn thực tế:
- **File descriptors**: mỗi socket = 1 fd. Mặc định `ulimit -n = 1024` → tối đa ~1022 kết nối (trừ stdin/stdout/stderr). Cần tăng lên 65536+ cho server lớn: `ulimit -n 65536`.
- **Bộ nhớ kernel**: mỗi socket tiêu tốn ~4KB+ bộ nhớ kernel cho TCP buffers.
- **CPU**: xử lý 20.000 kết nối đồng thời cần CPU mạnh, đặc biệt nếu có goroutine per connection.

---

**Lời giải Bài 6**:

(a) **Hai client khác nhau**: `10.0.0.5` (hai kết nối: port 54321 và 54322) và `10.0.0.7` (một kết nối: port 54321).

(b) **Client `10.0.0.5`** có khả năng mở nhiều tab trình duyệt hoặc gửi nhiều request song song — trình duyệt hiện đại thường mở 6–8 kết nối TCP song song tới cùng server để tải resource (CSS, JS, hình ảnh) đồng thời. Mỗi kết nối có src port khác nhau để tạo 4-tuple duy nhất.

---

## Liên kết và bài tiếp theo

- **Tiền đề**: [Tầng 1 — Lesson 07: UDP](../../01-Foundations-LowerLayers/lesson-07-udp/) · [Tầng 1 — Lesson 08: TCP](../../01-Foundations-LowerLayers/lesson-08-tcp/)
- **Bài tiếp**: [Lesson 02 — DNS: Hệ thống phân giải tên miền](../lesson-02-dns/)
- **Thực hành code**: [Programming/](../../../Programming/)

---

## Tổng kết Lesson 01

1. **Mô hình client-server**: server lắng nghe liên tục (thụ động), client chủ động khởi tạo kết nối. Ngược lại với P2P — không có vai trò cố định.

2. **Socket = (IP, Port, Protocol)**: điểm cuối giao tiếp. Port xác định dịch vụ (well-known 0–1023, registered 1024–49151, ephemeral 49152–65535).

3. **Vòng đời TCP server**: `socket → bind → listen → accept → send/recv → close`. Client: `socket → connect → send/recv → close`. `accept()` tạo connected socket mới cho mỗi client; listening socket tiếp tục chờ.

4. **4-tuple** `(Src IP, Src Port, Dst IP, Dst Port)`: xác định duy nhất mỗi kết nối TCP. Server không mở thêm port mới cho mỗi client — kernel phân biệt qua 4-tuple.

5. **Concurrency**: dùng `go handleClient(conn)` để phục vụ nhiều client đồng thời. Go runtime dùng epoll bên dưới để multiplexing I/O hiệu quả.

**Tiếp theo**: [Lesson 02 — DNS](../lesson-02-dns/) — khi biết socket rồi, làm thế nào trình duyệt biết `google.com` ứng với IP nào để kết nối?
