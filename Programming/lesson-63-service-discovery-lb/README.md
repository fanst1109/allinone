# Lesson 63 — Service Discovery & Load Balancing

> **Tier 6 — Distributed & Microservices.** Bài trước ([Lesson 62 — Distributed Fundamentals](../lesson-62-distributed-fundamentals/)) đặt nền móng về CAP, consistency, partition. Bài này trả lời một câu hỏi rất cụ thể nảy sinh ngay khi bạn tách một monolith thành nhiều service: **service A muốn gọi service B, nhưng B đang ở đâu?**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** trong môi trường microservice động, hard-code IP là tự sát, và service discovery giải quyết điều đó như thế nào.
- Phân biệt **client-side** vs **server-side** discovery, biết chọn cái nào cho từng tình huống.
- Nắm vai trò của **service registry** (Consul, etcd, ZooKeeper, Eureka): register on startup, deregister on shutdown, health check.
- Hiểu **DNS-based discovery** (K8s headless service, SRV record) và cái bẫy TTL caching.
- Phân biệt **liveness vs readiness**, **active vs passive** health check.
- Cài đặt và so sánh các thuật toán **load balancing**: round-robin, weighted, least-connections, random (power of two choices), consistent hashing, IP hash — và biết khi nào dùng cái nào.
- Hiểu sâu **consistent hashing**: vì sao remap tối thiểu, walk-through trên hash ring.
- Phân biệt **L4 vs L7 load balancer**.
- Hiểu cơ chế **service discovery trong Kubernetes**: Service, Endpoints, kube-proxy, CoreDNS.
- Cài **client-side LB trong Go** với gRPC.
- Biết cách **circuit breaker** loại bỏ instance không khỏe (nối tiếp [Lesson 52](../lesson-52-rate-limiting-circuit-breaker/)).
- Tránh các **pitfall** kinh điển: DNS TTL stale, thiếu health check, thundering herd, sticky session khi scale.

## Kiến thức tiền đề

- [Lesson 42 — net/http deep](../lesson-42-http-net-deep/) và [Lesson 49 — gRPC & Protobuf](../lesson-49-grpc-protobuf/): hiểu request/response giữa các service.
- [Lesson 52 — Rate Limiting & Circuit Breaker](../lesson-52-rate-limiting-circuit-breaker/): circuit breaker sẽ tái xuất ở mục 11.
- [Lesson 62 — Distributed Fundamentals](../lesson-62-distributed-fundamentals/): khái niệm node, partition, failure.
- [Lesson 13 — Maps](../lesson-13-maps/) và [Lesson 27 — Goroutines & Channels](../lesson-27-goroutines-channels/): nền cho phần code Go.

---

## 1. Vấn đề: B ở đâu?

> 💡 **Trực giác.** Hồi monolith, gọi một module khác chỉ là gọi hàm trong cùng process — địa chỉ là con trỏ trong RAM, không bao giờ "đi đâu". Khi tách thành microservice, lời gọi đó biến thành một request mạng tới một địa chỉ `host:port`. Vấn đề: trong cloud, địa chỉ đó **không cố định**. Hãy hình dung bạn muốn gọi điện cho một người bạn liên tục đổi số điện thoại mỗi vài giờ — bạn cần một **danh bạ luôn cập nhật**, đó chính là service discovery.

### 1.1 Vì sao IP thay đổi liên tục

Trong môi trường container/cloud hiện đại:

- **Auto-scaling**: lúc 9h sáng `order-service` có 3 instance, đến giờ cao điểm scale lên 30, đêm về 0 lại còn 2. Mỗi instance mới có IP mới.
- **Container reschedule**: K8s giết một pod (node hỏng, rolling update) và tạo pod mới — pod mới gần như luôn có IP mới.
- **Deploy**: mỗi lần deploy phiên bản mới, instance cũ chết, instance mới lên với IP khác.

Nếu service A hard-code `http://10.0.0.7:8080` để gọi B, thì ngay khi B-instance đó chết, mọi request từ A đều fail. Bạn không thể đi sửa code + deploy lại mỗi lần một pod restart.

### 1.2 Bài toán cụ thể

```
order-service (3 instance) cần gọi payment-service (đang có 5 instance, IP động)

  order-1  ──┐
  order-2  ──┼──► ???  ──► payment-{1..5} (IP thay đổi mỗi lần scale/restart)
  order-3  ──┘
```

Hai câu hỏi phải trả lời:

1. **Discovery** — Tại thời điểm này, payment-service có những instance nào, ở địa chỉ nào?
2. **Load balancing** — Trong số các instance khỏe đó, request lần này nên gửi tới cái nào?

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Sao không để DNS giải quyết hết?"* — DNS có giải quyết được phần discovery (mục 4), nhưng có vấn đề TTL caching và không tự load balance thông minh. Ta sẽ thấy.
> - *"Cloud provider chẳng phải đã có Load Balancer sẵn rồi à?"* — Đúng, đó là server-side discovery (mục 2). Nhưng bạn vẫn cần hiểu cơ chế để chọn đúng và debug.

📝 **Tóm tắt mục 1**
- Microservice scale động → IP instance thay đổi liên tục.
- Hard-code địa chỉ = hệ thống vỡ ngay khi có scale/restart/deploy.
- Cần 2 thứ: **discovery** (B ở đâu) + **load balancing** (chọn instance nào).

---

## 2. Service discovery patterns: client-side vs server-side

Có hai kiến trúc lớn để trả lời "B ở đâu".

### 2.1 Client-side discovery

> 💡 **Trực giác.** Client tự cầm cuốn danh bạ. Trước khi gọi B, client hỏi **registry** (danh bạ trung tâm) "B có những instance nào?", rồi **tự chọn** một instance (tự load balance) và gọi thẳng.

```
                      ┌──────────────┐
   order-svc  ──(1)──►│   Registry   │  "payment có ai?"
       │              └──────────────┘
       │ (2) trả về: [10.0.0.1, 10.0.0.2, 10.0.0.3]
       │
       │ (3) client TỰ chọn 1 instance (round-robin/...) rồi gọi thẳng
       └────────────────────────────────────────────► payment-2 (10.0.0.2)
```

- **Ví dụ**: Netflix **Eureka** + Ribbon (LB nằm trong client library).
- **Ưu**: ít hop mạng (gọi thẳng, không qua proxy trung gian); client biết rõ topology nên LB thông minh được (least-connection theo metric của chính nó).
- **Nhược**: logic discovery + LB nhúng vào **mọi client** → cần library cho từng ngôn ngữ (polyglot khó); client phải biết về registry.

### 2.2 Server-side discovery

> 💡 **Trực giác.** Client không biết gì về danh bạ. Nó chỉ gọi tới **một địa chỉ ổn định** (load balancer / proxy). LB mới là cái cầm danh bạ và route request tới instance phù hợp.

```
   order-svc ──(1) gọi "payment.svc" (địa chỉ cố định)──► ┌──────────┐
                                                          │    LB    │──► payment-{1..5}
                                                          └────┬─────┘    (LB hỏi registry,
                                                               └── (2) tự route)
```

- **Ví dụ**: AWS **ELB/ALB**, Kubernetes **Service** (qua kube-proxy), Nginx, Envoy.
- **Ưu**: client cực kỳ đơn giản (chỉ cần 1 địa chỉ); logic LB tập trung, dễ vận hành; polyglot dễ (mọi ngôn ngữ chỉ cần biết HTTP).
- **Nhược**: thêm một hop mạng (qua LB); LB là điểm tập trung (phải làm HA cho nó).

### 2.3 So sánh nhanh

| Tiêu chí | Client-side | Server-side |
|----------|-------------|-------------|
| Ai cầm danh bạ | Client | Load balancer |
| Số hop mạng | 1 (gọi thẳng) | 2 (qua LB) |
| Client phức tạp | Cao (cần library) | Thấp (chỉ 1 địa chỉ) |
| Polyglot | Khó | Dễ |
| LB thông minh | Dễ (client có metric) | Tùy LB |
| Ví dụ | Eureka, gRPC client LB | K8s Service, AWS ELB |

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Trong client-side, ai thực hiện load balancing?
> 2. Vì sao server-side dễ cho hệ polyglot (nhiều ngôn ngữ) hơn?
>
> <details><summary>Đáp án</summary>
> 1. Chính client (qua library như Ribbon, hoặc gRPC built-in LB). 2. Vì client chỉ cần biết nói HTTP/gRPC tới một địa chỉ cố định; toàn bộ logic discovery + LB nằm ở LB phía server, không phải viết lại cho từng ngôn ngữ.
> </details>

📝 **Tóm tắt mục 2**
- **Client-side**: client query registry, tự chọn instance + LB (Eureka). Ít hop, nhưng client phức tạp.
- **Server-side**: client gọi 1 địa chỉ LB ổn định, LB route (K8s Service, AWS ELB). Client đơn giản, thêm 1 hop.

---

## 3. Service registry

Registry là cái "danh bạ" trung tâm — nguồn sự thật về instance nào đang sống ở đâu.

### 3.1 Các registry phổ biến

| Registry | Đặc điểm | Consensus |
|----------|----------|-----------|
| **Consul** | Service mesh, health check phong phú, KV store, multi-DC | Raft |
| **etcd** | KV store nhanh, là backend của Kubernetes | Raft |
| **ZooKeeper** | Lâu đời, dùng nhiều với Kafka/Hadoop | ZAB |
| **Eureka** | Netflix, thiên về AP (ưu tiên availability) | Không strong-consensus |

> ❓ **Câu hỏi tự nhiên.** *"Vì sao registry lại cần consensus (Raft/ZAB)?"* — Vì registry thường chạy nhiều node để HA. Nếu hai node bất đồng "ai đang sống", client có thể được trả về instance đã chết. Raft/ZAB đảm bảo các node đồng thuận trên một danh sách. Eureka chọn hướng khác: chấp nhận dữ liệu hơi cũ (eventually consistent) để registry không bao giờ "down" — vì với discovery, trả về danh sách hơi cũ thường tốt hơn là không trả về gì (AP > CP, xem [Lesson 62](../lesson-62-distributed-fundamentals/)).

### 3.2 Vòng đời một instance trong registry

```
[startup]  ──► REGISTER (svc=payment, id=payment-3, addr=10.0.0.9:80)
              ↓
[running]  ──► HEARTBEAT mỗi 10s / health check pass → giữ trong registry
              ↓
[shutdown] ──► DEREGISTER (graceful) ──► registry xóa ngay
   hoặc
[crash]    ──► không heartbeat ──► TTL hết hạn ──► registry tự xóa
```

1. **Register on startup**: instance vừa lên gọi registry để đăng ký địa chỉ + metadata.
2. **Health check / heartbeat**: registry định kỳ kiểm tra (hoặc instance gửi heartbeat) để biết instance còn sống. Xem mục 5.
3. **Deregister on shutdown**: khi nhận tín hiệu tắt (xem [Lesson 51 — Graceful Shutdown](../lesson-51-graceful-shutdown/)), instance chủ động deregister để không nhận request mới.

> ⚠ **Lỗi thường gặp.** Quên deregister khi shutdown (hoặc crash đột ngột không kịp deregister). Khi đó registry vẫn còn entry "ma", LB route request tới một địa chỉ đã chết → request fail. Cách chống: **luôn có TTL + health check** để registry tự dọn entry chết kể cả khi instance không kịp báo (mục 5).

📝 **Tóm tắt mục 3**
- Registry = danh bạ trung tâm: Consul, etcd, ZooKeeper, Eureka.
- Vòng đời: register on startup → heartbeat/health check → deregister on shutdown.
- Crash không deregister → entry ma → cần TTL + health check để tự dọn.

---

## 4. DNS-based discovery

> 💡 **Trực giác.** Thay vì viết một registry riêng, ta tận dụng hệ thống danh bạ có sẵn của Internet: **DNS**. Bạn hỏi DNS "payment.svc.cluster.local có IP nào?", DNS trả về danh sách IP của các instance. Client kết nối tới một trong số đó.

### 4.1 Hai cơ chế

- **A/AAAA record nhiều IP**: một tên trả về nhiều IP. Client (hoặc resolver) tự chọn.
- **SRV record**: trả về cả `host:port` + priority + weight. Phù hợp khi port động.

```
$ dig payment.default.svc.cluster.local +short
10.0.0.1
10.0.0.2
10.0.0.3
```

**Kubernetes headless service** (`clusterIP: None`) chính là DNS-based discovery: thay vì trả về một virtual IP của Service, DNS trả về **trực tiếp IP của từng pod** → client tự chọn và load balance (thường dùng cho client-side LB, ví dụ gRPC).

### 4.2 Cái bẫy: TTL caching

> ⚠ **Lỗi thường gặp — TTL caching stale instance.** DNS record có **TTL** (time-to-live). Resolver/client cache kết quả trong khoảng TTL. Vấn đề:
> - Một pod chết, IP của nó bị gỡ khỏi DNS, nhưng client vẫn còn cache IP cũ trong TTL → tiếp tục gọi vào IP đã chết.
> - Nhiều HTTP client (kể cả Go `net/http` mặc định) còn **giữ kết nối keep-alive** tới IP cũ, không re-resolve DNS cho tới khi connection đóng → stale còn lâu hơn TTL.
>
> **Hệ quả**: request route tới instance đã chết một thời gian sau khi nó đã biến mất.

Cách giảm nhẹ:

- TTL ngắn (nhưng quá ngắn → áp lực lên DNS server).
- Health check ở tầng client/LB (đừng tin DNS là sự thật tuyệt đối).
- Đóng/làm mới connection định kỳ để buộc re-resolve.

> ❓ **Câu hỏi tự nhiên.** *"DNS đơn giản vậy sao không dùng luôn cho mọi thứ?"* — Vì (1) TTL caching làm dữ liệu cũ; (2) DNS thuần không có health check thông minh; (3) DNS chỉ trả IP, không trả metric để LB tinh vi (least-connection). DNS hợp cho discovery cơ bản, registry chuyên dụng (Consul/etcd) hợp khi cần health check + metadata phong phú.

📝 **Tóm tắt mục 4**
- DNS-based: dùng A/SRV record làm danh bạ; K8s headless service là ví dụ.
- Đơn giản nhưng dính **TTL caching** (và keep-alive) → stale instance.
- Khắc phục: TTL ngắn + health check + refresh connection.

---

## 5. Health check

Discovery chỉ hữu ích nếu danh sách instance là **danh sách đang khỏe**. Health check là cơ chế lọc bỏ instance chết/quá tải.

### 5.1 Liveness vs Readiness

> 💡 **Trực giác.** Hai câu hỏi khác nhau: *"Còn sống không?"* (liveness) vs *"Sẵn sàng nhận request chưa?"* (readiness). Một người mới ngủ dậy thì **sống** nhưng chưa **sẵn sàng** đi làm.

| Loại | Câu hỏi | Hành động khi fail |
|------|---------|--------------------|
| **Liveness** | Process còn chạy được không (không deadlock, không treo)? | **Restart** instance |
| **Readiness** | Đã sẵn sàng nhận traffic chưa (đã warm cache, kết nối DB xong)? | **Gỡ khỏi LB** (không gửi request) nhưng KHÔNG restart |

Ví dụ K8s:
- `livenessProbe` fail → kubelet **giết và tạo lại** pod.
- `readinessProbe` fail → endpoint của pod bị gỡ khỏi Service → LB ngừng gửi request, nhưng pod vẫn chạy (đang khởi động/warm-up).

> ⚠ **Lỗi thường gặp.** Để liveness probe kiểm tra dependency ngoài (vd ping DB). Khi DB chậm tạm thời, **mọi** instance fail liveness cùng lúc → K8s restart hàng loạt → thundering herd. Liveness chỉ nên kiểm tra "process của tôi có treo không", còn dependency để readiness lo.

### 5.2 Active vs Passive

| Kiểu | Cách hoạt động | Ưu / Nhược |
|------|----------------|-----------|
| **Active** | Registry/LB chủ động **ping** `/healthz` định kỳ | Phát hiện sớm; tốn request thừa |
| **Passive** | Quan sát **request thật**: nếu một instance fail nhiều → đánh dấu unhealthy | Không tốn probe; phát hiện chậm hơn (phải có request fail trước) |

Thực tế thường **kết hợp cả hai**: active để chủ động dọn, passive (qua circuit breaker — mục 11) để phản ứng nhanh với lỗi đang xảy ra.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Readiness probe fail thì K8s làm gì — restart hay gỡ khỏi LB?
> 2. Vì sao không nên cho liveness probe ping DB?
>
> <details><summary>Đáp án</summary>
> 1. Gỡ khỏi LB (ngừng gửi request), KHÔNG restart. 2. Vì DB chậm tạm thời sẽ làm mọi instance fail liveness đồng loạt → restart hàng loạt vô ích, tạo thundering herd. Dependency để readiness xử lý.
> </details>

📝 **Tóm tắt mục 5**
- **Liveness** (còn sống → restart) vs **readiness** (sẵn sàng → gỡ/thêm khỏi LB).
- **Active** (chủ động ping) vs **passive** (quan sát request fail). Thực tế kết hợp.

---

## 6. Load balancing algorithms

Khi đã có danh sách instance khỏe, câu hỏi: gửi request này tới cái nào? Dưới đây là 6 thuật toán phổ biến.

### 6.1 Round-robin

Lần lượt theo vòng tròn: req1→A, req2→B, req3→C, req4→A...

```
next = 0
Pick(): inst = list[next % len(list)]; next++
```

- **Khi nào dùng**: mặc định tốt khi mọi instance gần như đồng đều về capacity và request đồng đều về chi phí.
- **Nhược**: không biết instance nào đang quá tải; request "nặng" có thể dồn lệch.

> 📌 Walk-through: 3 instance [A,B,C], 6 request → A,B,C,A,B,C. (Xem code `RoundRobinLB` trong [solutions.go](./solutions.go).)

### 6.2 Weighted round-robin

Mỗi instance có **weight** theo capacity. Instance weight=3 nhận gấp 3 lần instance weight=1.

- **Khi nào dùng**: cluster heterogeneous (máy mạnh + máy yếu lẫn lộn), hoặc canary (cho instance mới weight thấp để nhận ít traffic).
- **Walk-through**: [A(w=1), B(w=2), C(w=1)], 8 request → A nhận 2, B nhận 4, C nhận 2 (tỉ lệ 1:2:1). Đây đúng là output của demo `solutions.go`.

### 6.3 Least connections

Gửi request tới instance đang có **ít kết nối đang mở nhất**.

- **Khi nào dùng**: request có thời gian xử lý rất khác nhau (vd có request 10ms, có request 5s). Round-robin sẽ dồn nhiều request dài vào cùng một instance; least-connections tự cân bằng theo tải thực.
- **Nhược**: cần theo dõi số connection (stateful), khó với LB stateless.

### 6.4 Random / Power of Two Choices (P2C)

- **Random thuần**: chọn ngẫu nhiên 1 instance. Đơn giản, stateless, nhưng có thể lệch tải.
- **Power of Two Choices (P2C)**: chọn **ngẫu nhiên 2** instance, rồi lấy cái có ít connection hơn.

> 💡 **Trực giác P2C.** Random thuần có thể vô tình dồn vào một instance đang đầy. Chỉ cần lấy 2 ứng viên ngẫu nhiên và chọn cái nhẹ hơn, xác suất "đổ dồn vào instance quá tải" giảm cực mạnh (về mặt lý thuyết, tải lệch tối đa giảm từ $O(\log n)$ xuống $O(\log \log n)$). Gần như "least-connections" mà chi phí gần như "random". Đây là thuật toán mặc định của nhiều LB hiện đại (vd Nginx, Envoy hỗ trợ).

### 6.5 Consistent hashing

Hash key (vd user-id, cache-key) → luôn map về cùng một instance miễn là topology không đổi.

- **Khi nào dùng**: cache (muốn key X luôn vào cùng cache node để hit cache), session sticky, sharding.
- Chi tiết + walk-through ở **mục 7**.

### 6.6 IP hash

Hash IP của client → instance. Client từ một IP luôn vào cùng instance.

- **Khi nào dùng**: cần sticky session đơn giản mà không có shared session store.
- **Nhược**: phân phối lệch nếu nhiều client sau cùng một NAT (cùng IP). Khi scale, đa số mapping đổi (trừ khi dùng consistent hashing thay vì `% N`).

### 6.7 Bảng tổng hợp — khi nào dùng cái nào

| Thuật toán | State | Khi nào dùng | Cảnh báo |
|------------|:-----:|--------------|----------|
| Round-robin | không | Mặc định, instance đồng đều | Không biết tải thực |
| Weighted RR | không | Cluster heterogeneous, canary | Phải set weight đúng |
| Least-conn | có | Request chi phí lệch nhau nhiều | Cần đếm connection |
| Random | không | Cực đơn giản, stateless | Có thể lệch |
| **P2C** | một phần | Muốn least-conn nhưng rẻ | Cần biết tải 2 ứng viên |
| Consistent hash | có (ring) | Cache, sticky, sharding | Phức tạp hơn |
| IP hash | không | Sticky session đơn giản | Lệch khi NAT, remap khi scale |

> ❓ **Câu hỏi tự nhiên.** *"Round-robin với weighted nghe giống nhau, khác gì least-connections?"* — Round-robin/weighted chia theo **số request** (đếm trước, không quan tâm xử lý xong chưa). Least-connections chia theo **tải thực đang diễn ra** (connection còn mở). Nếu mọi request mất ~cùng thời gian, hai cái cho kết quả gần như nhau. Khi thời gian xử lý lệch lớn, least-connections vượt trội.

📝 **Tóm tắt mục 6**
- Round-robin / weighted: chia theo số request (stateless).
- Least-conn / P2C: chia theo tải thực (tốt khi request lệch chi phí).
- Consistent hash / IP hash: sticky theo key/IP (cache, session).

---

## 7. Consistent hashing — sâu

### 7.1 Vì sao `hash % N` không đủ

> 💡 **Trực giác.** Giả sử bạn có 4 cache node, dùng `node = hash(key) % 4`. Bây giờ thêm 1 node thành 5: công thức đổi sang `% 5`. Với **gần như mọi** key, `hash(key) % 4 != hash(key) % 5` → toàn bộ cache "miss" cùng lúc → DB bị đè (cache stampede).

Walk-through cụ thể với 5 key, hash giả định:

| key | hash | `% 4` (node) | `% 5` (node) | đổi? |
|-----|-----:|:---:|:---:|:---:|
| a | 100 | 0 | 0 | không |
| b | 101 | 1 | 1 | không |
| c | 102 | 2 | 2 | không |
| d | 103 | 3 | 3 | không |
| e | 104 | 0 | 4 | **đổi** |
| f | 105 | 1 | 0 | **đổi** |
| g | 106 | 2 | 1 | **đổi** |

Chỉ thêm 1 node mà phần lớn key bị remap. Với N lớn, tỉ lệ remap ≈ 1 - 1/N ≈ **gần 100%** key đổi node. Thảm họa cho cache.

### 7.2 Ý tưởng hash ring

> 💡 **Trực giác.** Đặt cả **node** lẫn **key** lên một vòng tròn các con số `[0, 2³²)`. Một key thuộc về node **đầu tiên gặp khi đi theo chiều kim đồng hồ** từ vị trí của key. Khi thêm/bớt một node, chỉ những key nằm trong **một cung** giữa node mới và node liền trước bị ảnh hưởng — phần còn lại không đổi.

```
            0 / 2³²
              ●
        keyA  │   nodeB (hash=50)
   nodeA ●────┼────● ──► keyA đi cw gặp nodeB trước → thuộc nodeB
   (h=300)    │
              │   keyB
         nodeC●────● ──► keyB đi cw gặp nodeC trước → thuộc nodeC
        (h=200)
```

### 7.3 Walk-through thêm node

Giả sử ring có 3 node với hash: A=100, B=200, C=300 (trên vòng [0,360) cho dễ hình dung). Key map về node đầu tiên theo chiều kim đồng hồ (lớn hơn hoặc bằng):

| key | hash(key) | node phụ trách (cw đầu tiên) |
|-----|----------:|:---:|
| k1 | 50 | A (100) |
| k2 | 150 | B (200) |
| k3 | 250 | C (300) |
| k4 | 330 | A (wrap về 100) |

Bây giờ **thêm node D với hash=170**:

| key | hash | trước | sau khi thêm D(170) | đổi? |
|-----|-----:|:---:|:---:|:---:|
| k1 | 50 | A | A | không |
| k2 | 150 | B | **D** | đổi |
| k3 | 250 | C | C | không |
| k4 | 330 | A | A | không |

Chỉ **k2** đổi (nó nằm trong cung 100→170 mà D vừa chen vào). 3/4 key giữ nguyên. Đây là tính chất "remap tối thiểu": thêm 1 node trong N node chỉ remap ≈ **K/N** key (K = tổng số key).

Đây đúng là kết quả demo trong [solutions.go](./solutions.go): thêm node thứ 4 vào 3 node → ~25% (≈ 1/4) trên 1000 key bị remap, không phải ~100%.

### 7.4 Virtual nodes

> ⚠ **Lỗi thường gặp (toy version).** Nếu mỗi node chỉ có **một** điểm trên ring, ring dễ bị lệch: một node có thể "ôm" một cung rất rộng, node khác cung hẹp → tải lệch. Đây là phiên bản minh họa, **không dùng trong production thuần**.
>
> **Bản thật**: mỗi node vật lý đặt **nhiều điểm ảo** (virtual nodes / replicas), vd 100-200 điểm/node. Phân phối đều hơn nhiều. `HashRing` trong [solutions.go](./solutions.go) dùng `replicas` cho đúng điều này.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Thêm 1 node vào ring 10 node, ~bao nhiêu % key bị remap?
> 2. Virtual nodes giải quyết vấn đề gì?
>
> <details><summary>Đáp án</summary>
> 1. Khoảng 1/10 = 10% (K/N). 2. Phân phối tải đều hơn — mỗi node vật lý trải nhiều điểm trên ring nên không ai "ôm" cung quá lớn.
> </details>

📝 **Tóm tắt mục 7**
- `hash % N` remap gần 100% key khi N đổi → thảm họa cache.
- Hash ring: key thuộc node cw đầu tiên → thêm/bớt 1 node chỉ remap ~K/N key.
- Virtual nodes để phân phối đều.

---

## 8. L4 vs L7 load balancer

> 💡 **Trực giác.** Tầng nào trong mô hình OSI mà LB "nhìn vào" để quyết định route? L4 chỉ nhìn IP+port (như nhân viên bưu điện chỉ đọc địa chỉ ngoài phong bì). L7 mở phong bì đọc nội dung HTTP (như thư ký đọc thư để chuyển đúng phòng ban theo chủ đề).

| | **L4 (Transport)** | **L7 (Application)** |
|--|--------------------|----------------------|
| Nhìn vào | TCP/UDP, IP, port | HTTP method/path/header/cookie |
| Quyết định route | Theo IP/port | Theo `/api/orders` vs `/api/users`, header, host |
| Tốc độ | Rất nhanh (không parse payload) | Chậm hơn (parse HTTP) |
| Tính năng | NAT, forward connection | Path routing, header rewrite, TLS termination, sticky cookie |
| Ví dụ | AWS NLB, IPVS, HAProxy (TCP mode) | Nginx, Envoy, AWS ALB, K8s Ingress |

Ví dụ chỉ L7 làm được:
- Route `/api/v2/*` sang cluster mới, `/api/v1/*` ở cluster cũ (canary theo path).
- Route theo header `X-Region: eu` sang data center EU.
- Sticky session bằng cookie do LB tự set.

> ❓ **Câu hỏi tự nhiên.** *"L7 mạnh hơn vậy sao còn dùng L4?"* — L4 nhanh hơn và xử lý được mọi protocol (không chỉ HTTP): database connection, gRPC raw TCP, game UDP... Khi không cần hiểu nội dung HTTP, L4 vừa rẻ vừa nhanh.

📝 **Tóm tắt mục 8**
- **L4**: route theo IP/port, nhanh, không hiểu app, mọi protocol.
- **L7**: route theo HTTP path/header/cookie, chậm hơn, nhiều tính năng (path routing, TLS termination).

---

## 9. Service discovery trong Kubernetes

K8s gói toàn bộ discovery + LB lại thành vài abstraction.

### 9.1 Các thành phần

```
Pod (payment-xxx) ──label: app=payment──┐
Pod (payment-yyy) ──label: app=payment──┤
                                        ▼
        Service (payment) selector: app=payment
               │  → tạo virtual IP (ClusterIP) ổn định
               ▼
        Endpoints / EndpointSlice  ──► danh sách IP pod khỏe (readiness pass)
               │
        ┌──────┴───────┐
   kube-proxy        CoreDNS
 (route ClusterIP   (phân giải tên
  → pod, dùng        payment.default.svc
  iptables/IPVS)     → ClusterIP)
```

- **Service**: abstraction ổn định (tên + ClusterIP cố định). Đây là server-side discovery.
- **Endpoints / EndpointSlice**: danh sách IP các pod khỏe khớp selector. Pod fail readiness → tự bị gỡ khỏi đây → ngừng nhận traffic (đúng mục 5.1).
- **kube-proxy**: lập trình `iptables`/IPVS trên mỗi node để route packet đến ClusterIP → một pod backend (load balance ở tầng L4).
- **CoreDNS**: phân giải `payment.default.svc.cluster.local` → ClusterIP (hoặc trực tiếp pod IP nếu headless).

### 9.2 Liên hệ với các mục trước

- **Server-side discovery** (mục 2): client chỉ gọi `payment` (tên Service), kube-proxy route. Client không biết pod IP.
- **DNS-based** (mục 4): CoreDNS đóng vai DNS; headless service (`clusterIP: None`) trả pod IP trực tiếp cho client-side LB.
- **Health check** (mục 5): readinessProbe quyết định pod có trong Endpoints không.

📝 **Tóm tắt mục 9**
- **Service** = địa chỉ ổn định (server-side discovery), **Endpoints** = danh sách pod khỏe.
- **kube-proxy** route L4, **CoreDNS** phân giải tên → ClusterIP/pod IP.

---

## 10. Client-side LB trong Go (gRPC)

gRPC hỗ trợ client-side LB built-in — không cần proxy giữa.

### 10.1 Round-robin built-in

```go
import (
    "google.golang.org/grpc"
    _ "google.golang.org/grpc/balancer/roundrobin" // đăng ký balancer
)

conn, err := grpc.Dial(
    // "dns:///" buộc gRPC resolve nhiều địa chỉ qua DNS (vd K8s headless service)
    "dns:///payment.default.svc.cluster.local:50051",
    grpc.WithTransportCredentials(insecure.NewCredentials()),
    // chọn round-robin trên TẤT CẢ địa chỉ resolver trả về
    grpc.WithDefaultServiceConfig(`{"loadBalancingConfig":[{"round_robin":{}}]}`),
)
```

- `dns:///` (scheme `dns`) bảo gRPC dùng DNS resolver, lấy **tất cả** IP từ headless service.
- `round_robin` trải request đều qua các SubConn (mỗi pod một SubConn). gRPC giữ kết nối tới tất cả pod cùng lúc, nên không dính keep-alive-stale như HTTP một-connection.

### 10.2 Custom resolver

Khi dùng registry riêng (Consul/etcd) thay vì DNS, ta viết một `resolver.Builder` riêng:

```go
// rút gọn — ý tưởng: resolver watch registry, mỗi khi danh sách instance đổi
// thì gọi cc.UpdateState để gRPC cập nhật danh sách SubConn.
type consulResolver struct{ cc resolver.ClientConn }

func (r *consulResolver) watch(service string) {
    for addrs := range consulWatch(service) { // stream thay đổi từ Consul
        var addresses []resolver.Address
        for _, a := range addrs {
            addresses = append(addresses, resolver.Address{Addr: a})
        }
        r.cc.UpdateState(resolver.State{Addresses: addresses})
    }
}
```

> 💡 **Trực giác.** Resolver = cây cầu giữa registry và gRPC. Nó "watch" registry, mỗi khi instance thêm/bớt thì đẩy danh sách mới vào gRPC; balancer (round-robin) lo phần chia request.

📝 **Tóm tắt mục 10**
- gRPC client-side LB: `dns:///` + `WithDefaultServiceConfig({"round_robin":{}})`.
- Registry riêng → viết custom `resolver.Builder`, gọi `UpdateState` khi topology đổi.

---

## 11. Tích hợp circuit breaker

Health check (mục 5) chủ động dọn instance chết theo chu kỳ, nhưng giữa hai lần check vẫn có cửa sổ instance chết mà LB chưa biết. **Circuit breaker** (xem [Lesson 52](../lesson-52-rate-limiting-circuit-breaker/)) lấp lỗ này theo kiểu passive:

> 💡 **Trực giác.** Mỗi instance có một "cầu dao". Khi request tới instance B fail liên tục, cầu dao của B **mở** (Open) → LB ngừng gửi request tới B ngay lập tức (không chờ đến lần health check kế tiếp), chuyển sang instance khác. Sau một khoảng, cầu dao chuyển Half-Open thử lại vài request; nếu OK → đóng lại (đưa B trở về pool).

```
request → B fail, fail, fail... → breaker[B] = OPEN
       → LB loại B khỏi danh sách chọn (passive health)
       → (sau cooldown) Half-Open: thử 1 request
            ├─ OK   → Closed, B trở lại pool
            └─ fail → Open lại
```

Kết hợp:
- **Active health check** = dọn dẹp định kỳ (mục 5).
- **Circuit breaker** = phản ứng tức thời với lỗi thật đang xảy ra (passive).
- Cả hai cùng đảm bảo LB chỉ route tới instance thực sự phục vụ được.

📝 **Tóm tắt mục 11**
- Circuit breaker = passive health: instance fail nhiều → mở breaker → LB tạm loại.
- Bổ sung cho active health check (nhanh hơn, phản ứng với lỗi thực).

---

## 12. Common pitfalls

> ⚠ **Pitfall 1 — DNS TTL caching stale instance.** Client cache IP cũ trong TTL (và keep-alive connection còn lâu hơn) → gọi vào pod đã chết. *Fix*: TTL ngắn, health check ở client/LB, refresh connection định kỳ; với gRPC dùng resolver giữ nhiều SubConn.

> ⚠ **Pitfall 2 — Không health check → route đến dead instance.** Registry còn entry ma của instance đã crash (không kịp deregister). *Fix*: TTL + active health check tự dọn; passive (circuit breaker) phản ứng nhanh. Đây chính là kịch bản BT6.

> ⚠ **Pitfall 3 — Thundering herd khi instance restart.** Khi một instance restart (hoặc deploy rolling), nhiều client cùng lúc re-resolve và đổ dồn vào instance vừa lên → nó quá tải và lại chết → vòng lặp. Hoặc liveness probe ping dependency làm cả cluster restart đồng loạt (mục 5.1). *Fix*: jitter khi reconnect (random delay), warm-up + readiness gate, slow-start (tăng weight dần cho instance mới), không cho liveness phụ thuộc dependency.

> ⚠ **Pitfall 4 — Sticky session với scale.** Dùng IP hash `% N` hoặc sticky cookie nhưng khi scale (N đổi), mapping client→instance đổi → session "mất" (user bị logout, mất giỏ hàng). *Fix*: dùng **consistent hashing** thay `% N` (remap tối thiểu), hoặc tốt nhất là **stateless session** (lưu session ở Redis — [Lesson 58](../lesson-58-redis-caching/)) để instance nào cũng phục vụ được.

📝 **Tóm tắt mục 12**
- TTL stale, thiếu health check, thundering herd, sticky-session-vỡ-khi-scale.
- Xu hướng chung của fix: health check + circuit breaker, consistent hashing, stateless session, jitter/slow-start.

---

## 13. Ứng dụng thực tế trong phần mềm

> 💡 **Service discovery + load balancing giải bài "service ở IP nào?" khi instance lên/xuống liên tục (autoscale, deploy). Trong K8s, phần lớn việc này tự động.**

| Khái niệm | Hiện thực thật |
|-----------|----------------|
| **Service registry** | Consul, etcd, hoặc K8s Service (DNS nội bộ tự cập nhật) |
| **Client-side LB** | Client biết danh sách instance, tự chọn (gRPC, Ribbon) |
| **Server-side LB** | LB đứng trước (nginx, Envoy, K8s Service/Ingress) |
| **Health check** | Loại instance chết khỏi pool (readiness/liveness probe) |

### 13.1. Ví dụ cụ thể — vì sao không hard-code IP

Microservice A gọi B tại `10.0.1.5:8080`. B autoscale 3→10 instance, IP đổi, instance cũ chết → hard-code IP **vỡ ngay**. Service discovery: A hỏi "B ở đâu?" → registry trả danh sách instance **sống hiện tại** → LB chọn một. Trong **Kubernetes** việc này gói gọn: gọi `http://b-service` (DNS nội bộ), K8s Service tự route tới pod khỏe mạnh, tự cập nhật khi pod lên/xuống. Đây là lý do code trong K8s gọi nhau qua tên service, không qua IP.

> ⚠ **Bẫy — load balancing không health-check + DNS cache.** (1) LB gửi traffic tới instance đã chết → lỗi; phải có **health check** loại instance không pass readiness ([nối graceful shutdown](../lesson-51-graceful-shutdown/)). (2) **DNS caching**: client cache IP cũ sau khi instance chết → vẫn gọi IP chết; cần TTL ngắn hoặc client-side LB cập nhật. (3) Thuật toán LB: round-robin đơn giản nhưng "least connections" / "power of two choices" cân tải tốt hơn khi request không đều ([nối randomized](../../Algorithms/lesson-48-randomized-algorithms/)).

### 13.2. 📝 Tóm tắt mục 13

- Service discovery giải "service ở IP nào" khi instance lên/xuống liên tục → không hard-code IP.
- K8s tự lo: gọi qua tên service (DNS nội bộ), Service route tới pod khỏe, tự cập nhật.
- Bẫy: thiếu health check (gửi traffic tới instance chết), DNS cache IP cũ; chọn thuật toán LB hợp tải.

## Bài tập

> Lời giải chi tiết ngay dưới. Code tham khảo trong [solutions.go](./solutions.go).

- **BT1.** Cài đặt round-robin load balancer: hàm `Pick(insts)` trả về instance kế tiếp theo vòng tròn, thread-safe.
- **BT2.** Cài đặt consistent hashing ring với `AddNode`, `RemoveNode`, `Get(key)`. Chứng minh remap tối thiểu: thêm 1 node vào 3 node, đo % key bị remap trên 1000 key.
- **BT3.** Viết health check loop: định kỳ probe từng instance, deregister instance chết khỏi registry.
- **BT4.** Cho 3 scenario, chọn client-side hay server-side discovery, giải thích.
- **BT5.** Cài weighted LB: instance weight=3 nhận gấp 3 lần instance weight=1.
- **BT6.** Chẩn đoán: request vẫn route đến một instance đã chết. Tìm nguyên nhân và fix bằng health check.

---

## Lời giải chi tiết

### Lời giải BT1 — Round-robin LB

**Cách tiếp cận.** Giữ một con trỏ `next`. Mỗi lần `Pick`, lấy `insts[next % len(insts)]` rồi tăng `next`. Vì `Pick` được nhiều goroutine gọi đồng thời, phải bảo vệ `next` bằng mutex (hoặc `atomic`).

```go
type RoundRobinLB struct {
    mu   sync.Mutex
    next int
}

func (lb *RoundRobinLB) Pick(insts []*Instance) *Instance {
    if len(insts) == 0 {
        return nil // không instance khỏe → caller fail fast
    }
    lb.mu.Lock()
    defer lb.mu.Unlock()
    inst := insts[lb.next%len(insts)]
    lb.next++
    return inst
}
```

**Kiểm chứng.** 3 instance [order-1, order-2, order-3], 6 lần Pick → `order-1, order-2, order-3, order-1, order-2, order-3` (output thật của `solutions.go`).

**Lưu ý.** `len(insts)` có thể đổi giữa các lần Pick (instance thêm/bớt) — dùng `next % len` đảm bảo không out-of-range. **Độ phức tạp**: $O(1)$ mỗi Pick.

### Lời giải BT2 — Consistent hashing ring

**Cách tiếp cận.**
1. Mỗi node đặt `replicas` (vd 100) điểm ảo lên ring: hash của `"node#i"`.
2. Lưu các hash đã **sort** trong slice `keys`, map `hash → node`.
3. `Get(key)`: hash key, binary search điểm đầu tiên `>= hash(key)`; nếu vượt cuối thì wrap về 0.

```go
func (h *HashRing) Get(key string) string {
    if len(h.keys) == 0 { return "" }
    hk := hashKey(key)
    idx := sort.Search(len(h.keys), func(i int) bool { return h.keys[i] >= hk })
    if idx == len(h.keys) { idx = 0 } // wrap quanh ring
    return h.hashMap[h.keys[idx]]
}
```

**Chứng minh remap tối thiểu (đo thực):**
1. Tạo ring 3 node (cache-A/B/C), map 1000 key, lưu `before[key] = node`.
2. `AddNode("cache-D")`.
3. Đếm số key mà `Get(key)` đổi so với `before`.

Kết quả từ `solutions.go`: **~234/1000 ≈ 23%** key bị remap (lý thuyết K/N = 1000/4 ≈ 25%). So với `hash % N` (3→4) thì sẽ gần như **toàn bộ** key đổi. Vậy consistent hashing remap ~K/N thay vì ~K.

**Walk-through nhỏ** (mục 7.3): ring {A=100, B=200, C=300}, thêm D=170 → chỉ key có hash trong (100,170] đổi từ B sang D, phần còn lại giữ nguyên.

**Độ phức tạp**: `Get` = $O(\log M)$ (M = tổng điểm ảo, binary search). `AddNode` = $O(M \log M)$ (sort lại).

### Lời giải BT3 — Health check loop deregister instance chết

**Cách tiếp cận.** Một goroutine chạy `time.Ticker` định kỳ. Mỗi tick, probe từng instance; instance fail → `Deregister`.

```go
func (hc *HealthChecker) Run(ctx context.Context, interval time.Duration) {
    t := time.NewTicker(interval)
    defer t.Stop()
    for {
        select {
        case <-ctx.Done():
            return
        case <-t.C:
            hc.CheckOnce()
        }
    }
}

func (hc *HealthChecker) CheckOnce() {
    for _, inst := range hc.reg.snapshot(hc.service) {
        alive := hc.probe(inst)      // thực tế: HTTP GET /healthz
        inst.Healthy = alive
        if !alive {
            hc.reg.Deregister(hc.service, inst.ID)
        }
    }
}
```

**Kiểm chứng** (`solutions.go`): registry có order-1/2/3, probe trả false cho order-2 → sau `CheckOnce`, `Healthy()` chỉ còn `order-1, order-3`. Round-robin sau đó không bao giờ route tới order-2.

**Lưu ý production**: nên dùng `context` để dừng loop khi shutdown (xem [Lesson 29 — context](../lesson-29-context-cancellation/)); probe nên có timeout để một instance treo không làm kẹt cả vòng check; cân nhắc "fail N lần liên tiếp mới deregister" để tránh false positive do glitch mạng nhất thời.

### Lời giải BT4 — Chọn client-side vs server-side cho 3 scenario

**Scenario A — Hệ gRPC nội bộ, tất cả viết bằng Go, latency cực nhạy.**
→ **Client-side**. gRPC có client LB built-in (`round_robin`), tiết kiệm 1 hop mạng (quan trọng khi latency-sensitive), và đồng nhất ngôn ngữ nên không tốn công viết library nhiều ngôn ngữ. K8s headless service + `dns:///`.

**Scenario B — Hệ polyglot (Go, Python, Node, Java) gọi lẫn nhau, đội nhỏ ít người vận hành.**
→ **Server-side** (K8s Service / mesh sidecar). Client mọi ngôn ngữ chỉ cần biết HTTP tới một tên Service; không phải maintain discovery library cho 4 ngôn ngữ. Logic LB tập trung, đội nhỏ dễ vận hành.

**Scenario C — Client là app mobile/ngoài internet gọi vào hệ thống.**
→ **Server-side bắt buộc**. Client ngoài không (và không nên) biết về registry/topology nội bộ. Phải có một public LB/API gateway (L7) ổn định làm điểm vào; expose pod IP nội bộ ra ngoài là sai về bảo mật lẫn vận hành.

**Chốt**: client-side khi nội bộ + đồng nhất ngôn ngữ + cần ít hop; server-side khi polyglot, client bên ngoài, hoặc muốn tập trung vận hành.

### Lời giải BT5 — Weighted LB theo capacity

**Cách tiếp cận.** "Nở" danh sách theo weight (instance weight=3 xuất hiện 3 lần) rồi round-robin trên danh sách đã nở.

```go
func (lb *WeightedLB) Pick(insts []*Instance) *Instance {
    if len(insts) == 0 { return nil }
    var expanded []*Instance
    for _, in := range insts {
        w := in.Weight; if w <= 0 { w = 1 }
        for i := 0; i < w; i++ { expanded = append(expanded, in) }
    }
    lb.mu.Lock(); defer lb.mu.Unlock()
    inst := expanded[lb.next%len(expanded)]
    lb.next++
    return inst
}
```

**Kiểm chứng** (`solutions.go`): [order-1(w=1), order-2(w=2), order-3(w=1)], 8 request → `{order-1:2, order-2:4, order-3:2}` — tỉ lệ đúng 1:2:1.

**Cải tiến production**: cách "nở danh sách" tốn bộ nhớ $O(\Sigma weight)$ và phân phối hơi "cụm" (chạy hết order-2 mới sang cái khác). Bản thật nên dùng **smooth weighted round-robin** (thuật toán của Nginx): mỗi instance giữ `currentWeight += effectiveWeight`, chọn instance có `currentWeight` lớn nhất rồi trừ đi tổng weight — phân phối xen kẽ mượt hơn (A B A C A B... thay vì A A A B B...).

**Độ phức tạp**: $O(\Sigma weight)$ mỗi Pick ở bản đơn giản; $O(N)$ ở bản smooth.

### Lời giải BT6 — Chẩn đoán request route đến dead instance

**Triệu chứng.** ~1/3 request trả lỗi connection refused; log cho thấy chúng đều đi tới `order-2 (10.0.0.2)` — instance đã crash 10 phút trước.

**Chẩn đoán từng bước:**
1. **Instance order-2 còn trong registry không?** → Có. Vậy registry chưa dọn nó.
2. **Vì sao chưa dọn?** Hai khả năng:
   - order-2 crash đột ngột → **không kịp deregister** (Pitfall 2).
   - **Không có health check** chủ động → registry không tự phát hiện entry ma.
3. **LB lấy danh sách từ đâu?** Từ `registry.Healthy()`. Nhưng nếu chưa health check thì `Healthy=true` vẫn còn (giá trị lúc register), nên order-2 vẫn nằm trong danh sách chọn → round-robin route tới nó.

**Fix:**
1. Thêm **active health checker** (BT3) chạy mỗi vài giây: probe order-2 → fail → set `Healthy=false` + `Deregister` → biến mất khỏi `Healthy()` → LB ngừng chọn.
2. Thêm **circuit breaker / passive health** (mục 11): ngay khi request tới order-2 fail liên tiếp, mở breaker để loại order-2 **ngay**, không chờ chu kỳ health check kế tiếp.
3. Đảm bảo **graceful shutdown deregister** ([Lesson 51](../lesson-51-graceful-shutdown/)) cho trường hợp shutdown bình thường.
4. Nếu dùng DNS: kiểm tra **TTL/keep-alive** (Pitfall 1) — có thể IP đã bị gỡ khỏi DNS nhưng client vẫn cache.

**Kiểm chứng** (`solutions.go`): trước health check, `Healthy()` gồm cả order-2; sau `CheckOnce` với probe trả false cho order-2, `Healthy()` chỉ còn order-1/order-3, và round-robin tiếp theo chỉ route tới hai instance khỏe.

---

## Code & Minh họa

- **[solutions.go](./solutions.go)** — round-robin LB, weighted LB, consistent hashing ring (đo remap), health checker, in-memory registry. Chạy: `go run solutions.go`.
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Client vs server-side discovery** — animate hai luồng gọi (client tự query registry vs gọi qua LB).
  2. **LB algorithm comparison** — một stream request chạy đồng thời qua round-robin / least-connections / random, xem phân phối.
  3. **Consistent hashing ring** — thêm/bớt node trên ring, đếm số key remap để thấy remap tối thiểu.

---

## Bài tiếp theo

- **[Lesson 64 — Message Queue: NATS & Kafka](../lesson-64-message-queue-nats-kafka/)** — khi giao tiếp đồng bộ (request/response) qua discovery+LB chưa đủ, ta cần giao tiếp **bất đồng bộ** qua message queue: decoupling, buffering, event-driven.

## Tham khảo

- [Lesson 52 — Rate Limiting & Circuit Breaker](../lesson-52-rate-limiting-circuit-breaker/) — circuit breaker dùng ở mục 11.
- [Lesson 51 — Graceful Shutdown](../lesson-51-graceful-shutdown/) — deregister on shutdown.
- [Lesson 58 — Redis Caching](../lesson-58-redis-caching/) — stateless session store thay sticky session.
- [Lesson 62 — Distributed Fundamentals](../lesson-62-distributed-fundamentals/) — CAP, AP vs CP của registry.
