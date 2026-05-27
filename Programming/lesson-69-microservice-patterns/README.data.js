// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-69-microservice-patterns/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 69 — Microservice Patterns

> Tier 6 — Distributed & Microservices · Bài 8/10

Sau khi đã đi qua nền tảng phân tán (CAP, service discovery, message queue, event-driven, saga, CQRS, Raft), bài này tổng hợp **các pattern kiến trúc** để xây dựng và vận hành một hệ microservice trong thực tế: cách tách service, cách chúng nói chuyện với nhau, cách "gói" hạ tầng quanh service, và cách migrate dần từ monolith.

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Phân biệt được khi nào **nên** và khi nào **không nên** dùng microservices ("monolith first").
2. Tách (decompose) một monolith thành service theo **business capability** / **bounded context**, không theo technical layer.
3. Hiểu vai trò của **API Gateway** và biến thể **BFF (Backend for Frontend)**.
4. Nắm 3 deployment pattern cấp hạ tầng: **Sidecar**, **Ambassador**, và mối liên hệ với service mesh.
5. Áp dụng **Anti-corruption layer (ACL)** và **Strangler fig** để tích hợp / thay thế legacy.
6. Hiểu **database per service** và các cách lấy dữ liệu xuyên service (API composition, CQRS, event-carried state).
7. Nhận diện và tránh các **anti-pattern**: distributed monolith, shared database, nano-service, sync chain dài.

## Kiến thức tiền đề

- [Lesson 62 — Distributed Fundamentals](../lesson-62-distributed-fundamentals/) — CAP, eventual consistency, idempotency.
- [Lesson 63 — Service Discovery & LB](../lesson-63-service-discovery-lb/) — service tìm nhau, load balancing.
- [Lesson 64 — Message Queue](../lesson-64-message-queue-nats-kafka/) — giao tiếp async.
- [Lesson 65 — Event-Driven Architecture](../lesson-65-event-driven-architecture/) — event-carried state, outbox.
- [Lesson 66 — Saga Pattern](../lesson-66-saga-pattern/) — transaction xuyên service.
- [Lesson 67 — CQRS & Event Sourcing](../lesson-67-cqrs-event-sourcing/) — tách read/write model.

---

## 1. Monolith vs Microservices

### 💡 Trực giác / Hình dung

Hình dung một **nhà hàng**:

- **Monolith** = một bếp lớn duy nhất, mọi đầu bếp dùng chung dao, chung bếp, chung tủ lạnh. Sửa một món → cả bếp đứng yên chờ. Nhưng khi mới mở quán (3 khách/ngày), một bếp là quá đủ và cực kỳ tiện: không cần điều phối, không cần đi lại giữa các phòng.
- **Microservices** = nhiều bếp nhỏ độc lập (bếp món Việt, bếp pizza, bếp tráng miệng), mỗi bếp tự có dao, bếp, tủ lạnh riêng. Đổi công thức pizza → không động tới bếp tráng miệng. Nhưng giờ phải có người **điều phối** (bồi bàn chạy giữa các bếp), và một đơn ăn cần 3 bếp → 3 lần đi lại.

Microservices đổi **độ phức tạp trong code (intra-process)** lấy **độ phức tạp trong vận hành (network, distributed)**. Đó là một sự đánh đổi (trade-off), không phải "nâng cấp".

### 1.1 Định nghĩa

**Monolith**: toàn bộ ứng dụng là **một deployable unit** duy nhất (một binary / một process). Mọi module gọi nhau bằng function call trong cùng process. Một database chung.

**Microservices**: ứng dụng được chia thành **nhiều service nhỏ độc lập**, mỗi service:
- Deploy độc lập (deploy service A không cần build/redeploy service B).
- Có database riêng (database per service — mục 9).
- Giao tiếp qua network (REST/gRPC/message).
- Thường do một team nhỏ sở hữu (Conway's law).

### 1.2 Bảng đánh đổi

| Tiêu chí | Monolith | Microservices |
|---|---|---|
| Deploy | 1 lần, đơn giản | Nhiều pipeline, cần CI/CD trưởng thành |
| Scale | Scale cả khối (kể cả phần không cần) | Scale riêng từng service nóng |
| Lỗi lan | Một bug có thể làm sập cả app | Cô lập tốt hơn (nếu làm đúng) |
| Gọi giữa module | Function call, ~ns, đáng tin | Network call, ~ms, có thể fail/timeout |
| Transaction | ACID local dễ | Phải dùng saga (L66), eventual consistency |
| Debug | Stack trace 1 process | Phải distributed tracing (mục 13) |
| Tổ chức team | Dễ va chạm code | Team độc lập, deploy độc lập |
| Chi phí vận hành | Thấp | Cao (mạng, observability, orchestration) |

### 1.3 "Monolith first"

> Quy tắc của Martin Fowler: **gần như mọi hệ thành công đều bắt đầu từ monolith** rồi mới tách dần khi đau.

Lý do: khi mới bắt đầu, **bạn chưa biết bounded context đúng nằm ở đâu**. Tách sớm = tách sai = phải gộp lại hoặc gánh distributed monolith (mục 15). Monolith cho bạn dễ refactor ranh giới module (chỉ là di chuyển code trong cùng repo) trước khi "đóng băng" chúng thành ranh giới network.

### ❓ Câu hỏi tự nhiên của người đọc

- *"Microservices có làm app nhanh hơn không?"* → Không. Function call (~nanosecond) luôn nhanh hơn network call (~millisecond, gấp ~10^6 lần). Microservices không giúp **nhanh hơn**, mà giúp **scale tổ chức và scale phần nóng độc lập**.
- *"Vậy ai cũng nên microservices?"* → Không. Xem mục 16. Với team nhỏ / domain đơn giản, microservices là gánh nặng thuần.

### 🔁 Dừng lại tự kiểm tra

<details><summary>Microservices làm một HTTP request kết thúc nhanh hơn monolith — đúng hay sai?</summary>

**Sai.** Cùng một logic, microservices thường **chậm hơn** vì thêm network hop. Lợi ích là độc lập deploy/scale/team, không phải latency.
</details>

### 📝 Tóm tắt mục 1

- Microservices đổi phức tạp code lấy phức tạp vận hành — là trade-off, không phải nâng cấp.
- "Monolith first": bắt đầu monolith, tách khi ranh giới đã rõ và khi đau (scale/team).
- Network call chậm hơn function call ~10^6 lần — microservices không làm app nhanh hơn.

---

## 2. Service Decomposition — tách service như thế nào

### 💡 Trực giác

Tách service giống chia phòng ban trong công ty: chia theo **chức năng kinh doanh** (Kế toán, Kho, Bán hàng) — mỗi phòng tự chịu trách nhiệm trọn vẹn một mảng. KHÔNG chia theo "tầng kỹ thuật" (phòng-viết-SQL, phòng-viết-HTML) — vì một yêu cầu nhỏ sẽ phải đi qua tất cả các phòng.

### 2.1 Tách theo Business Capability

**Business capability** = một việc mà doanh nghiệp làm để tạo giá trị. Với e-commerce:

\`\`\`
Catalog (quản lý sản phẩm)
Cart (giỏ hàng)
Order (đơn hàng)
Payment (thanh toán)
Inventory (kho)
Shipping (giao hàng)
Notification (thông báo)
\`\`\`

Mỗi capability → một service. Service Order own toàn bộ vòng đời đơn hàng: validate, tạo, theo dõi trạng thái.

### 2.2 Tách theo Subdomain (DDD Bounded Context)

**Bounded context** (từ Domain-Driven Design): một ranh giới trong đó **một model có nghĩa nhất quán**. Cùng từ "Customer" nhưng:
- Trong context **Sales**: Customer = người có giỏ hàng, lịch sử mua.
- Trong context **Support**: Customer = người có ticket, mức ưu tiên.

Hai model "Customer" này khác nhau → thuộc 2 bounded context → có thể là 2 service. Ranh giới service nên trùng ranh giới bounded context.

### 2.3 ⚠ KHÔNG tách theo technical layer

**Lỗi thường gặp**: tách thành \`web-service\` (UI), \`business-logic-service\`, \`data-service\`. Nghe gọn nhưng SAI:

- Mọi feature mới đều phải sửa **cả 3 service** + deploy đồng bộ → đây chính là distributed monolith (mục 15).
- Một request đơn giản (lấy 1 sản phẩm) phải đi qua 3 network hop không cần thiết.

Nguyên tắc: **tách dọc theo nghiệp vụ (vertical slice), không cắt ngang theo tầng kỹ thuật.** Mỗi service phải có đủ "UI logic + business + data" cho mảng nghiệp vụ của nó.

### ❓ Câu hỏi tự nhiên

- *"Service nên to cỡ nào?"* → Đủ nhỏ để một team (~2 pizza) sở hữu, đủ to để có nghĩa nghiệp vụ độc lập. Nếu phải gọi service khác để hoàn thành mọi thao tác cơ bản → có thể đã tách quá nhỏ (nano-service, mục 15).
- *"Hai service có được dùng chung từ điển/util không?"* → Library dùng chung (logging, util thuần) thì OK. Nhưng **không chia sẻ domain model hay database** — đó là coupling chết người.

### 🔁 Dừng lại tự kiểm tra

<details><summary>Một startup chia hệ thành frontend-service, api-service, db-service. Vấn đề gì?</summary>

Đây là tách theo **technical layer**, dẫn tới distributed monolith: mọi thay đổi nghiệp vụ phải sửa và deploy cả 3, lại thêm network hop vô ích. Nên tách theo capability (Order, Catalog, ...).
</details>

### 📝 Tóm tắt mục 2

- Tách theo **business capability** hoặc **bounded context (DDD)**.
- KHÔNG tách theo technical layer (UI/logic/data) → distributed monolith.
- Mỗi service = vertical slice trọn vẹn một mảng nghiệp vụ, một team sở hữu.

---

## 3. API Gateway

### 💡 Trực giác

API Gateway là **lễ tân của tòa nhà**: khách (client) không gõ cửa từng phòng (service), mà nói với lễ tân "tôi cần gặp phòng Order"; lễ tân kiểm tra giấy tờ (auth), giới hạn số khách (rate limit), rồi dẫn tới đúng phòng (routing) — đôi khi gom thông tin từ vài phòng rồi trả về một tờ giấy (aggregation).

### 3.1 Vấn đề nếu không có gateway

Nếu client (web/mobile) gọi thẳng từng service:
- Client phải biết địa chỉ/port của **mọi** service → coupling chặt.
- Mỗi service phải tự lo auth, rate limit, CORS, TLS → lặp code.
- Mobile (mạng yếu) phải gọi 5 service cho 1 màn hình → tốn pin, chậm.

### 3.2 API Gateway giải quyết

Gateway = **một entry point duy nhất** đứng trước cụm service, lo các "cross-cutting concern":

| Chức năng | Mô tả |
|---|---|
| **Routing** | \`/orders/*\` → Order service, \`/products/*\` → Catalog service |
| **Authentication** | Verify JWT một lần ở gateway, gắn user-id vào header cho downstream |
| **Rate limiting** | Chặn client gọi quá N req/s |
| **Aggregation** | Gom kết quả nhiều service thành 1 response (xem 3.3) |
| **TLS termination** | Giải mã HTTPS một chỗ |
| **Protocol translation** | Ngoài: REST/JSON; trong: gRPC |

### 3.3 Aggregation — walk-through bằng số

Màn hình "chi tiết đơn hàng" cần: thông tin đơn (Order svc), thông tin user (User svc), tracking giao hàng (Shipping svc).

**Không gateway** (client tự gọi):
\`\`\`
Client → Order   (40ms)
Client → User    (35ms)   ← 3 round-trip riêng, tổng wall-clock nếu tuần tự = 115ms
Client → Shipping(40ms)
\`\`\`

**Có gateway** (gateway fan-out song song):
\`\`\`
Client → Gateway (1 request, 5ms qua mạng client→gateway)
   Gateway → Order    ┐
   Gateway → User     ├ chạy SONG SONG trong data center (nội bộ ~5ms mỗi cái)
   Gateway → Shipping ┘
   max(5,5,5) = 5ms, gom lại → trả 1 JSON
Tổng ≈ 5 (client→gw) + 5 (fan-out) + 5 (gw→client) ≈ 15ms
\`\`\`

Client chỉ thấy **1 request, 1 response**. Latency giảm vì các call nội bộ data center rẻ và chạy song song.

### ⚠ Lỗi thường gặp

- **Gateway phình thành monolith mới**: nhồi business logic vào gateway. Gateway chỉ nên lo routing/auth/aggregation — KHÔNG chứa logic nghiệp vụ.
- **Single point of failure**: gateway sập → cả hệ sập. Phải chạy nhiều instance + load balancer trước gateway.

### 📝 Tóm tắt mục 3

- API Gateway = entry point duy nhất, lo cross-cutting: routing, auth, rate limit, TLS, aggregation.
- Aggregation gom nhiều service call thành 1 response, fan-out song song → giảm latency cho client.
- Đừng nhồi business logic vào gateway; chạy nhiều instance để tránh SPOF.

---

## 4. Backend for Frontend (BFF)

### 💡 Trực giác

Một gateway chung cho cả web và mobile thường "đủ cho không ai": web cần nhiều dữ liệu một lần (màn rộng), mobile cần ít và gọn (mạng yếu, pin). BFF = **mỗi loại client có một gateway riêng** được "may đo" cho nhu cầu của nó — như có thực đơn riêng cho khách ăn tại chỗ và khách mang đi.

### 4.1 Mô hình

\`\`\`
Web App    → BFF-Web    ┐
Mobile App → BFF-Mobile  ├→ (cùng tập service backend)
Partner API→ BFF-Public ┘     Order, User, Catalog, ...
\`\`\`

- **BFF-Web**: trả payload đầy đủ, gom nhiều thông tin cho dashboard.
- **BFF-Mobile**: trả payload gọn (chỉ field cần), gộp nhiều call, nén ảnh.
- Mỗi BFF thường do **team frontend tương ứng** sở hữu → họ tự điều chỉnh shape của API mà không tranh chấp với team khác.

### 4.2 BFF vs API Gateway

- API Gateway = một cổng chung cho mọi client.
- BFF = **nhiều gateway**, mỗi cái chuyên cho một loại client. BFF là một biến thể/đặc hóa của gateway.

### ❓ Câu hỏi tự nhiên

- *"BFF có làm trùng lặp code không?"* → Có một chút (mỗi BFF tự gom call), nhưng đổi lại mỗi client team độc lập, không phải thỏa hiệp một API "vạn năng". Logic nghiệp vụ vẫn nằm ở service backend, không lặp.

### 📝 Tóm tắt mục 4

- BFF = gateway riêng cho mỗi loại client (web/mobile/partner), may đo payload.
- Là biến thể của API Gateway; mỗi BFF do team frontend tương ứng sở hữu.

---

## 5. Sidecar Pattern

### 💡 Trực giác

Sidecar = **thùng xe gắn bên cạnh xe máy**: xe máy (service chính) lo chạy; thùng xe (sidecar container) chở "đồ phụ trợ" (logging, proxy, config) — đi cùng nhau, dùng chung hành trình (cùng pod/host) nhưng là hai thực thể tách biệt.

### 5.1 Định nghĩa

**Sidecar** = một container/process **phụ trợ** chạy **cùng pod (hoặc cùng host)** với service chính, chia sẻ vòng đời và tài nguyên cục bộ (network localhost, volume), nhưng tách biệt về code.

Service chính (mọi ngôn ngữ) + sidecar (lo việc chung) ⇒ service chính không cần nhúng thư viện cho việc đó.

### 5.2 Ví dụ sidecar

| Sidecar | Việc nó làm |
|---|---|
| **Log shipper** (Fluentd) | Đọc log file service chính ghi ra → đẩy về centralized logging |
| **Proxy** (Envoy) | Chặn mọi traffic vào/ra service → đo metric, mTLS, retry |
| **Config watcher** | Theo dõi config trung tâm, reload khi đổi |

### 5.3 Vì sao quan trọng

Sidecar (cụ thể là **proxy sidecar**) là **nền tảng của service mesh** (Lesson 70). Toàn bộ service đều có một proxy sidecar → tạo thành "data plane" của mesh, lo mTLS/retry/traffic-shaping mà service chính không cần biết.

### ⚠ Lỗi thường gặp

- Nhồi quá nhiều việc vào sidecar tới mức nó thành bottleneck. Sidecar nên nhẹ và đơn trách nhiệm.

### 📝 Tóm tắt mục 5

- Sidecar = container phụ trợ chạy cùng pod với service chính (logging/proxy/config).
- Tách "việc chung" khỏi service chính, độc lập ngôn ngữ.
- Proxy sidecar là nền tảng của service mesh (L70).

---

## 6. Ambassador Pattern

### 💡 Trực giác

Ambassador (đại sứ) = **người phiên dịch/đại diện đi giao thiệp bên ngoài** cho service. Service chính chỉ nói chuyện với "đại sứ" qua localhost; mọi việc khó khi gọi ra ngoài (retry khi mạng chập chờn, ngắt mạch khi đối tác chết — circuit breaker) do đại sứ lo.

### 6.1 Định nghĩa

**Ambassador** = một proxy **cho outbound call** (service chính gọi RA ngoài). Khác sidecar tổng quát ở chỗ ambassador chuyên về **giao tiếp đi ra**:

\`\`\`
Service chính → (localhost) → Ambassador → (network) → Service/đối tác bên ngoài
                                  └ lo: retry, timeout, circuit breaker, TLS, discovery
\`\`\`

### 6.2 So với Sidecar / Ambassador

- **Sidecar**: khái niệm chung (bất kỳ helper nào cùng pod).
- **Ambassador**: sidecar **chuyên cho outbound**. Service chỉ gọi \`localhost:9000\`, ambassador lo phần "thế giới bên ngoài hỗn loạn".

Lợi ích: logic resilience (retry/circuit breaker — mục 12) viết **một lần** trong ambassador, mọi service tái dùng, không phải nhúng lại vào từng codebase.

### 📝 Tóm tắt mục 6

- Ambassador = proxy cho outbound call, lo retry/timeout/circuit breaker/discovery.
- Là sidecar chuyên hóa cho giao tiếp đi ra; resilience viết một lần, dùng chung.

---

## 7. Anti-Corruption Layer (ACL)

### 💡 Trực giác

ACL = **người phiên dịch + bộ lọc** giữa hệ mới (sạch) và hệ cũ/đối tác (model lộn xộn). Bạn không muốn "ngôn ngữ" xấu của hệ cũ "lây nhiễm" (corrupt) vào model đẹp của hệ mới → dựng một lớp dịch ở ranh giới.

### 7.1 Định nghĩa

**Anti-corruption layer** = một lớp **adapter** đặt giữa hai bounded context (hoặc giữa hệ mới và legacy), **dịch model** của bên kia sang model của bên này, để model nội bộ không bị "nhiễm bẩn" bởi khái niệm/format lạ.

### 7.2 Walk-through bằng số/dữ liệu thật

Legacy CRM trả về khách hàng dạng:
\`\`\`json
{ "CUST_ID": "00042", "CUST_NM": "NGUYEN VAN A", "STAT_CD": "A", "DOB": "19900115" }
\`\`\`

Service mới muốn model sạch:
\`\`\`json
{ "id": 42, "name": "Nguyen Van A", "active": true, "birthDate": "1990-01-15" }
\`\`\`

ACL làm việc dịch:
- \`"00042"\` (string padding) → \`42\` (int).
- \`"NGUYEN VAN A"\` (UPPER) → \`"Nguyen Van A"\` (title-case).
- \`"STAT_CD": "A"\` → \`active: true\` (mã \`"A"=active, "I"=inactive\`).
- \`"19900115"\` (YYYYMMDD) → \`"1990-01-15"\` (ISO).

Nhờ ACL, **không một dòng code nghiệp vụ nào** của service mới phải biết \`CUST_NM\` hay mã \`"A"\` nghĩa là gì.

### ⚠ Lỗi thường gặp

- Bỏ qua ACL, để model legacy "rò" thẳng vào core → mỗi chỗ dùng phải tự hiểu \`STAT_CD\`. Khi legacy đổi format → sửa khắp nơi. ACL cô lập thay đổi vào **một chỗ duy nhất**.

### 🔁 Dừng lại tự kiểm tra

<details><summary>ACL nên đặt ở đâu — trong core domain hay ở ranh giới?</summary>

Ở **ranh giới** (boundary) giữa hai context. Core domain chỉ làm việc với model sạch; ACL là lớp ngoài cùng, hứng và dịch dữ liệu ngoài trước khi nó chạm core.
</details>

### 📝 Tóm tắt mục 7

- ACL = adapter dịch model giữa bounded context / legacy ↔ hệ mới.
- Cô lập "format bẩn" vào một chỗ; core domain chỉ thấy model sạch.

---

## 8. Strangler Fig Pattern

### 💡 Trực giác

Tên lấy từ cây **đa bóp cổ (strangler fig)**: nó mọc quanh một cây chủ, dần dần thay thế cây chủ; tới khi cây chủ mục đi thì cây đa đã đứng vững một mình. Migrate monolith → microservices **không phải đập đi xây lại** ("big bang rewrite" rất hay thất bại), mà **bóc dần từng phần**, route lưu lượng sang service mới, tới khi monolith rỗng ruột thì gỡ bỏ.

### 8.1 Quy trình

1. Đặt một **facade/router** (thường là gateway) trước monolith. Lúc đầu mọi request đều đi vào monolith.
2. Viết service mới cho **một phần nhỏ** (vd \`/users\`).
3. Router: route \`/users/*\` → service mới, phần còn lại → monolith.
4. Lặp lại cho \`/orders\`, \`/payments\`, ... từng phần một.
5. Khi monolith không còn route nào → gỡ bỏ.

### 8.2 Walk-through migrate \`/users\`

\`\`\`
Giai đoạn 0:  mọi /*           → Monolith
Giai đoạn 1:  /users/*         → UserService (mới)
              mọi /* khác      → Monolith
Giai đoạn 2:  /users/*, /orders/* → service mới
              còn lại          → Monolith
...
Giai đoạn N:  không còn route nào về Monolith → tắt Monolith
\`\`\`

Ưu điểm: mỗi bước nhỏ, có thể **rollback** (route ngược về monolith) nếu service mới lỗi. Không có "ngày D đập hết".

### ⚠ Lỗi thường gặp

- **Migrate phần khó nhất trước**: nên bắt đầu từ phần ít rủi ro / ranh giới rõ để học cách làm, rồi mới tới phần phức tạp.
- **Quên dữ liệu**: route được nhưng \`/users\` mới và monolith vẫn share bảng \`users\` → vẫn coupling. Phải tách dữ liệu (database per service) song song.

### 🔁 Dừng lại tự kiểm tra

<details><summary>Tại sao strangler fig an toàn hơn big-bang rewrite?</summary>

Vì mỗi bước nhỏ và có thể rollback. Hệ luôn ở trạng thái chạy được; rủi ro được chia nhỏ thay vì dồn vào một lần "go-live" khổng lồ.
</details>

### 📝 Tóm tắt mục 8

- Strangler fig: migrate dần, đặt router/facade, route từng phần sang service mới.
- Mỗi bước nhỏ, rollback được; tránh big-bang rewrite.
- Phải tách dữ liệu song song, không để share bảng.

---

## 9. Database per Service

### 💡 Trực giác

Mỗi service own database riêng giống mỗi phòng ban có **tủ hồ sơ riêng có khóa** — không ai thò tay vào tủ phòng khác. Muốn dữ liệu của phòng khác → **hỏi qua API/event**, không tự mở tủ.

### 9.1 Quy tắc cứng

**Mỗi service sở hữu database riêng. KHÔNG share database.** Service B muốn dữ liệu của service A → gọi API của A (sync) hoặc nghe event của A (async), **không** query thẳng bảng của A.

Lý do:
- **Loose coupling**: A đổi schema không làm B vỡ.
- **Độc lập deploy/scale**: A đổi sang DB khác (Postgres → Mongo) mà B không biết.
- Nếu share DB → đổi schema phải đồng bộ mọi service → distributed monolith.

### 9.2 Cái giá phải trả (challenge)

- **Distributed query**: "lấy đơn + tên user + tracking" giờ nằm ở 3 DB khác nhau → không JOIN được. Giải: **API composition** hoặc **CQRS** (mục 10).
- **Distributed transaction**: "tạo order + trừ tiền + trừ kho" xuyên 3 service → không có ACID xuyên DB. Giải: **Saga** (Lesson 66) + idempotency.

### ⚠ Lỗi thường gặp

- "Tạm thời share DB cho nhanh, sau tách" → gần như **không bao giờ** tách được; coupling ăn sâu. Đây là anti-pattern #1 (mục 15).

### 📝 Tóm tắt mục 9

- Mỗi service own DB riêng, không share DB. Lấy dữ liệu chéo qua API/event.
- Cái giá: không JOIN xuyên DB (→ API composition/CQRS), không ACID xuyên service (→ saga L66).

---

## 10. Shared Data Patterns

Khi dữ liệu nằm rải ở nhiều service-DB, lấy dữ liệu "tổng hợp" thế nào?

### 10.1 API Composition

Một thành phần (thường là gateway/BFF) **gọi nhiều service và ghép kết quả trong bộ nhớ**.

- Ưu: đơn giản, không cần hạ tầng thêm.
- Nhược: không làm được phép lọc/sort phức tạp xuyên service (phải gom hết rồi lọc trong RAM → tốn). Latency = chậm nhất trong các call.

### 10.2 CQRS (xem [Lesson 67](../lesson-67-cqrs-event-sourcing/))

Tạo một **read model riêng** (view) tổng hợp sẵn dữ liệu từ nhiều service, cập nhật qua event. Query view này nhanh (đã denormalize).

- Ưu: query phức tạp/nhanh.
- Nhược: read model **eventual consistency** (trễ vài chục ms so với nguồn), thêm hạ tầng đồng bộ.

### 10.3 Event-carried State Transfer

Service A phát event **kèm đủ dữ liệu** (vd \`OrderCreated{orderId, userId, userName, total}\`). Service B lưu một bản sao cục bộ những field nó cần → khi cần không phải gọi lại A.

- Ưu: B tự chủ, không phụ thuộc A lúc đọc.
- Nhược: dữ liệu nhân bản, phải xử lý đồng bộ khi nguồn đổi.

### ❓ Câu hỏi tự nhiên

- *"Chọn cái nào?"* → API composition cho truy vấn đơn giản/ít. CQRS cho màn hình đọc nặng/phức tạp. Event-carried state khi service cần dữ liệu của service khác thường xuyên và muốn tự chủ.

### 📝 Tóm tắt mục 10

- API composition: gọi nhiều service rồi ghép — đơn giản, không hợp truy vấn phức tạp.
- CQRS: read model tổng hợp, nhanh nhưng eventual consistent.
- Event-carried state: phát event kèm data, service tự lưu bản sao.

---

## 11. Service Communication

### 11.1 Đồng bộ (Sync): REST / gRPC

- **REST/JSON**: phổ biến, dễ debug, human-readable. Chậm hơn, payload lớn hơn.
- **gRPC** (HTTP/2 + Protobuf): nhanh, payload nhỏ (binary), có streaming, type-safe qua \`.proto\`. Khó debug bằng mắt thường. Thường dùng cho **giao tiếp nội bộ service-to-service**.

Đặc tính sync: **caller chờ response**, coupling tạm thời (callee phải sống lúc gọi).

### 11.2 Bất đồng bộ (Async): Message Queue (xem [Lesson 64](../lesson-64-message-queue-nats-kafka/))

Service A publish message → broker (Kafka/NATS) → service B consume khi rảnh.

Đặc tính async: **caller không chờ**, decoupling theo thời gian (B có thể đang chết, message vẫn nằm trong queue). Hợp cho event-driven, công việc nền, fan-out.

### 11.3 Khi nào sync, khi nào async

| | Sync (REST/gRPC) | Async (queue) |
|---|---|---|
| Cần kết quả ngay | ✅ | ❌ |
| Decoupling thời gian | ❌ | ✅ |
| Chịu được callee chết | ❌ | ✅ |
| Ví dụ | "lấy giá sản phẩm" | "gửi email xác nhận" |

### ⚠ Lỗi thường gặp

- **Sync chain dài** (A→B→C→D, mỗi bước chờ): latency cộng dồn + nếu D chết thì A cũng fail (cascade). Xem anti-pattern mục 15. Cân nhắc cắt thành async.

### 📝 Tóm tắt mục 11

- Sync: REST (dễ debug) / gRPC (nhanh, nội bộ). Caller chờ, coupling thời gian.
- Async: message queue, decoupling thời gian, hợp event/việc nền.
- Tránh sync chain dài → latency cộng dồn + cascade failure.

---

## 12. Resilience Patterns (recap)

Mạng phân tán **sẽ fail**. Bốn pattern cốt lõi để service không "đổ domino":

### 12.1 Timeout

Mọi network call phải có **timeout**. Không có timeout → một call treo có thể giữ goroutine/thread mãi mãi → cạn tài nguyên.

### 12.2 Retry (kèm backoff + jitter)

Lỗi tạm thời (mạng chập) → thử lại. Nhưng:
- Phải **exponential backoff** (chờ 100ms, 200ms, 400ms...) + **jitter** (ngẫu nhiên hóa) để tránh "retry storm" đồng loạt.
- Chỉ retry thao tác **idempotent** (xem L62) — retry "trừ tiền" 3 lần = trừ 3 lần tiền!

### 12.3 Circuit Breaker

Như **cầu chì điện**: nếu callee fail liên tục (vd 5 lỗi liên tiếp), breaker "mở" → các call sau **fail nhanh ngay lập tức** (không gọi nữa) trong một khoảng, cho callee thời gian hồi phục. Sau timeout thử "half-open" (cho 1 call test), OK thì đóng lại.

Ba trạng thái: \`Closed\` (bình thường) → \`Open\` (chặn) → \`Half-Open\` (thử) → \`Closed\`/\`Open\`.

### 12.4 Bulkhead

Như **vách ngăn khoang tàu**: chia tài nguyên (connection pool, thread) thành ngăn riêng cho từng downstream. Một downstream chậm "ngốn" hết ngăn của nó nhưng **không** làm cạn tài nguyên dùng cho downstream khác → một service chậm không kéo sập toàn bộ.

### 📝 Tóm tắt mục 12

- Timeout: mọi call phải có; tránh treo tài nguyên.
- Retry: chỉ với idempotent, kèm backoff + jitter.
- Circuit breaker: fail nhanh khi downstream chết, cho nó hồi phục.
- Bulkhead: cô lập tài nguyên, một downstream chậm không kéo cả hệ.

---

## 13. Observability

Trong monolith, một stack trace cho biết mọi thứ. Trong microservices, một request đi qua 5 service → **không có một chỗ nào thấy toàn cảnh**. Observability lấp khoảng đó (chi tiết ở Tier 7).

### 13.1 Distributed Tracing — Correlation ID

Gateway sinh một **correlation ID** (vd \`trace-id: abc123\`) khi request vào, **truyền xuống mọi downstream call** (qua header). Mọi log/span đều gắn ID này → ghép lại thành một "trace" hoàn chỉnh: thấy request đi qua Order(40ms)→Payment(120ms)→Inventory(15ms), biết Payment là chỗ chậm.

### 13.2 Centralized Logging

Mọi service đẩy log về **một nơi tập trung** (ELK/Loki). Tìm theo correlation ID → gom log của 1 request từ mọi service.

### 13.3 Metrics

Đo RED: **R**ate (req/s), **E**rrors (lỗi/s), **D**uration (latency p50/p95/p99) cho mỗi service. Phát hiện bất thường sớm.

### ⚠ Lỗi thường gặp

- Làm microservices **mà không có observability** = mù. Khi lỗi, không biết service nào, không trace được → debug hàng giờ. Đây là anti-pattern (mục 15): observability không phải tùy chọn, là điều kiện cần.

### 📝 Tóm tắt mục 13

- Correlation ID truyền xuyên service → distributed tracing ghép lại toàn cảnh.
- Centralized logging + metrics (RED).
- Không observability = đừng làm microservices.

---

## 14. Deployment

### 14.1 Independent Deploy

Giá trị cốt lõi: deploy service A **không cần** build/redeploy B. Đòi hỏi CI/CD pipeline riêng cho mỗi service.

### 14.2 Versioning & Backward Compatibility

Khi A đổi API, B (đang gọi A) chưa kịp cập nhật → A phải **backward-compatible**: thêm field optional (OK), KHÔNG xóa/đổi field cũ (vỡ B). Dùng version trong URL (\`/v1/\`, \`/v2/\`) hoặc trong header khi cần breaking change.

### 14.3 Blue-Green & Canary

- **Blue-Green**: chạy song song 2 môi trường (blue = cũ, green = mới). Switch toàn bộ traffic sang green; lỗi thì switch ngược ngay (rollback tức thì).
- **Canary**: thả mới cho **một phần nhỏ** traffic (vd 5%), theo dõi metric, OK thì tăng dần 25% → 50% → 100%. Lỗi thì rút lại, chỉ 5% bị ảnh hưởng.

### 📝 Tóm tắt mục 14

- Independent deploy là giá trị cốt lõi; cần CI/CD riêng từng service.
- API phải backward-compatible; version hóa khi breaking.
- Blue-green (switch toàn bộ, rollback nhanh) / canary (thả dần %).

---

## 15. Anti-patterns

### 15.1 Distributed Monolith — anti-pattern tệ nhất

Services **tách về mặt vật lý** (mỗi cái một process) nhưng **coupling chặt về logic**: đổi A phải đổi+deploy B,C cùng lúc. Bạn gánh **mọi cái khó của distributed** (network, latency, eventual consistency) mà **không có lợi ích** (độc lập). Tệ hơn cả monolith thuần.

**Dấu hiệu (smell)**: phải deploy nhiều service đồng bộ; service share database; thay đổi nhỏ lan ra nhiều repo; sync call vòng (A→B→A).

### 15.2 Shared Database

Nhiều service dùng chung một DB → mọi cái nói ở mục 9. Đổi schema = đồng bộ. Đây là con đường nhanh nhất tới distributed monolith.

### 15.3 Too Fine-Grained (Nano-service)

Tách quá nhỏ (mỗi service làm một việc tí xíu). Hậu quả: một thao tác nghiệp vụ phải gọi 10 service → latency cộng dồn, vận hành phình to (10 pipeline cho 10 việc cỏn con), khó debug. "Nhạt" service phải đủ to để có nghĩa nghiệp vụ độc lập.

### 15.4 Sync Chain dài

\`A → B → C → D\` toàn sync call: latency = tổng tất cả; D chết → C,B,A đều fail (cascade). Giải: cắt thành async ở chỗ không cần kết quả ngay, hoặc dùng circuit breaker.

### 15.5 No Observability

Đã nói ở mục 13 — làm microservices mà không trace/log/metric = mù, không debug được.

### 🔁 Dừng lại tự kiểm tra

<details><summary>Thiết kế: OrderService và InventoryService dùng chung bảng \`products\`, và mỗi lần đổi schema phải deploy cả hai. Đây là gì?</summary>

Distributed monolith + shared database. Coupling chặt qua bảng chung; mất hết lợi ích microservices nhưng vẫn gánh độ phức tạp phân tán. Phải tách DB và giao tiếp qua API/event.
</details>

### 📝 Tóm tắt mục 15

- Distributed monolith (coupling chặt) là tệ nhất — gánh cái khó phân tán mà không có lợi ích.
- Tránh: shared DB, nano-service, sync chain dài, thiếu observability.

---

## 16. Khi nào KHÔNG nên Microservices

Microservices **không miễn phí**. Hãy ở lại monolith nếu:

- **Team nhỏ** (< ~10 người): không đủ người vận hành nhiều pipeline + observability + hạ tầng phân tán.
- **Domain đơn giản / chưa rõ**: chưa biết bounded context đúng → tách = tách sai.
- **Early-stage startup / MVP**: ưu tiên ship nhanh, pivot nhanh. Monolith refactor ranh giới rẻ hơn nhiều so với re-architect service.
- **Internal tool / lưu lượng thấp**: không có nhu cầu scale phần nóng độc lập.

**Monolith first** + giữ code module hóa tốt (modular monolith) → khi thật sự đau (scale, team va chạm), tách dần bằng strangler fig (mục 8).

### 📝 Tóm tắt mục 16

- Ở monolith khi: team nhỏ, domain đơn giản/chưa rõ, MVP, lưu lượng thấp.
- Microservices trả giá bằng vận hành; chỉ "mua" khi lợi ích (scale tổ chức/phần nóng) vượt giá đó.

---

## Bài tập

> Lời giải chi tiết ở mục [Lời giải chi tiết](#lời-giải-chi-tiết). Code minh họa: [solutions.go](./solutions.go). Tương tác: [visualization.html](./visualization.html).

**BT1.** Cho một monolith e-commerce với các chức năng: đăng sản phẩm, tìm kiếm sản phẩm, thêm vào giỏ, đặt hàng, thanh toán, trừ kho, gửi email xác nhận. Hãy **decompose** thành các service theo business capability. Liệt kê service + trách nhiệm + database mỗi service own.

**BT2.** Thiết kế một **API Gateway aggregation**: màn "chi tiết đơn hàng" cần dữ liệu từ 3 service (Order, User, Shipping). Mô tả gateway gom 3 call thành 1 response như thế nào, và tại sao nên gọi song song.

**BT3.** Áp dụng **Strangler fig** để migrate \`/users\` từ monolith sang UserService mới. Mô tả router quyết định route ra sao qua các giai đoạn, và làm sao rollback nếu lỗi.

**BT4.** Viết một **Anti-corruption layer** dịch model legacy \`{ "CUST_ID": "00042", "CUST_NM": "NGUYEN VAN A", "STAT_CD": "A" }\` sang model mới \`{ id, name, active }\`. Liệt kê từng phép dịch.

**BT5.** Cho thiết kế sau, **chỉ ra smell distributed monolith**:
> "Hệ có 4 service: WebUI, BusinessLogic, DataAccess, Notification. Mọi feature mới đều phải sửa WebUI + BusinessLogic + DataAccess và deploy cùng lúc. Cả 4 service đọc/ghi chung 1 database \`app_db\`."

**BT6.** Với 4 scenario sau, chọn **monolith** hay **microservices** và giải thích:
(a) Startup 3 người làm MVP gọi xe; (b) E-commerce lớn 200 kỹ sư, 8 team, traffic theo mùa; (c) Internal tool quản lý nghỉ phép cho 50 nhân viên; (d) Mạng xã hội high-scale (newsfeed, message, media) hàng chục triệu user.

---

## Lời giải chi tiết

### Lời giải BT1 — Decompose e-commerce theo capability

Tách **dọc theo nghiệp vụ** (không theo tầng kỹ thuật):

| Service | Trách nhiệm | DB own (database per service) |
|---|---|---|
| **CatalogService** | Đăng & quản lý sản phẩm, tìm kiếm | \`catalog_db\` (sản phẩm, category) |
| **CartService** | Giỏ hàng (thêm/xóa item) | \`cart_db\` (giỏ theo user) |
| **OrderService** | Vòng đời đơn hàng (tạo, trạng thái) | \`order_db\` (đơn, line item) |
| **PaymentService** | Thanh toán | \`payment_db\` (giao dịch) |
| **InventoryService** | Kho, trừ/cộng tồn | \`inventory_db\` (tồn kho) |
| **NotificationService** | Gửi email/SMS xác nhận | \`notification_db\` (log gửi) |

Cách tiếp cận:
1. Liệt kê các **business capability** (việc tạo giá trị): bán hàng, kho, thanh toán, thông báo.
2. Mỗi capability → 1 service own trọn vẹn (UI logic + business + data của mảng đó).
3. Luồng "đặt hàng" là một **saga** (L66): OrderService tạo đơn → gọi PaymentService trừ tiền → gọi InventoryService trừ kho → phát event \`OrderConfirmed\` → NotificationService nghe và gửi email (async). Nếu bước nào fail → compensating action (hoàn tiền, hoàn kho).
4. Tìm kiếm sản phẩm nằm trong CatalogService (không tách "search-service" riêng trừ khi search là capability đủ lớn — tránh nano-service).

Lưu ý KHÔNG tách thành \`web/logic/data\` (technical layer) — sẽ thành distributed monolith.

### Lời giải BT2 — API Gateway aggregation

Endpoint gateway: \`GET /order-detail/{orderId}\`.

\`\`\`
1. Client gọi 1 request → Gateway.
2. Gateway fan-out SONG SONG:
     go call Order    /orders/{orderId}        → { orderId, userId, items, total }
     go call User     /users/{userId}          → { userName, email }   (cần userId từ Order? → xem ghi chú)
     go call Shipping /shipping/{orderId}       → { status, tracking }
3. Chờ cả 3 (WaitGroup), gom thành 1 JSON:
     { order: {...}, user: {...}, shipping: {...} }
4. Trả về client.
\`\`\`

Vì sao song song: 3 call độc lập nhau (Shipping không cần kết quả Order). Tuần tự = 40+35+40 = 115ms; song song = max(40,35,40) = 40ms.

Ghi chú phụ thuộc: nếu User call **cần** \`userId\` từ Order (data dependency thật), thì Order phải xong trước → Order tuần tự, rồi User+Shipping song song. Trong solutions.go ta giả định orderId map sẵn được userId nên cả 3 song song; nếu có dependency, gateway gọi Order trước rồi fan-out 2 cái còn lại.

Code minh họa: hàm \`AggregateOrderDetail\` trong [solutions.go](./solutions.go).

### Lời giải BT3 — Strangler fig migrate \`/users\`

Router (đặt trước, thường là gateway) quyết định theo prefix path:

\`\`\`
Giai đoạn 0: route("/users/42")  → Monolith
Giai đoạn 1: route("/users/42")  → UserService (mới)
             route("/orders/7")  → Monolith   (chưa migrate)
Giai đoạn 2: route("/orders/7")  → OrderService (mới)
             ...
Giai đoạn N: không còn prefix nào map về Monolith → tắt Monolith
\`\`\`

Logic router: giữ một bảng \`prefix → backend\`. Khi migrate \`/users\`, đổi \`"/users" → UserService\`. Phần còn lại fallback về Monolith.

Rollback: nếu UserService lỗi, **đổi lại** mapping \`"/users" → Monolith\` (1 dòng config) → traffic về monolith ngay, không downtime lớn. Đây là ưu điểm so với big-bang.

Cảnh báo dữ liệu: phải tách bảng \`users\` ra \`user_db\` của UserService song song; nếu vẫn share bảng với monolith → vẫn coupling, chưa migrate thật.

Code minh họa: \`StranglerRouter\` trong [solutions.go](./solutions.go).

### Lời giải BT4 — Anti-corruption layer

Phép dịch từng field:

| Legacy | → | Mới | Quy tắc |
|---|---|---|---|
| \`"CUST_ID": "00042"\` | → | \`id: 42\` | parse int, bỏ padding \`0\` |
| \`"CUST_NM": "NGUYEN VAN A"\` | → | \`name: "Nguyen Van A"\` | title-case |
| \`"STAT_CD": "A"\` | → | \`active: true\` | map \`"A"→true\`, \`"I"→false\` |

Adapter (pseudocode Go):
\`\`\`go
func TranslateCustomer(l LegacyCustomer) Customer {
    id, _ := strconv.Atoi(strings.TrimLeft(l.CustID, "0"))
    return Customer{
        ID:     id,
        Name:   titleCase(l.CustNm),
        Active: l.StatCd == "A",
    }
}
\`\`\`

Toàn bộ kiến thức về \`CUST_*\` và mã \`"A"\` bị **nhốt trong adapter này**. Core domain chỉ thấy \`Customer{ID, Name, Active}\`. Legacy đổi format → chỉ sửa adapter.

Code minh họa: \`TranslateLegacyCustomer\` trong [solutions.go](./solutions.go).

### Lời giải BT5 — Smell distributed monolith

Thiết kế này có **3 smell rõ rệt**:

1. **Tách theo technical layer** (WebUI/BusinessLogic/DataAccess) thay vì capability → mọi feature phải sửa cả chuỗi.
2. **Deploy đồng bộ bắt buộc**: sửa 1 feature → deploy cả 3 → mất "independent deploy", giá trị cốt lõi của microservices.
3. **Shared database** (\`app_db\` chung): coupling qua schema; đổi bảng = đồng bộ mọi service.

Kết luận: đây là **distributed monolith** — gánh mọi cái khó của phân tán (network giữa 4 service) mà không có lợi ích nào (không độc lập deploy, không độc lập scale, không độc lập DB). **Tệ hơn một monolith thuần** vì thêm độ trễ và điểm hỏng mạng.

Cách sửa: gộp lại thành modular monolith (nếu team nhỏ), HOẶC tách lại theo capability + database per service + giao tiếp qua API/event.

### Lời giải BT6 — Chọn kiến trúc cho 4 scenario

| Scenario | Chọn | Lý do |
|---|---|---|
| **(a)** Startup 3 người, MVP gọi xe | **Monolith** | Team nhỏ, domain chưa rõ, cần ship/pivot nhanh. "Monolith first". Microservices = gánh nặng vận hành giết tốc độ. |
| **(b)** E-commerce lớn, 200 kỹ sư, 8 team, traffic mùa | **Microservices** | Nhiều team cần deploy độc lập (tránh va chạm); traffic mùa cần scale riêng phần nóng (Catalog/Order); đủ người vận hành. |
| **(c)** Internal tool nghỉ phép, 50 nhân viên | **Monolith** | Domain đơn giản, lưu lượng thấp, không cần scale độc lập. Microservices = over-engineering. |
| **(d)** Mạng xã hội high-scale | **Microservices** | Các phần (newsfeed, message, media) có yêu cầu scale/công nghệ rất khác nhau; cần scale độc lập cực mạnh; nhiều team. |

Nguyên tắc chung: chọn microservices khi **lợi ích (scale tổ chức + scale phần nóng độc lập) vượt cái giá vận hành**. Khi nghi ngờ → monolith first, tách sau bằng strangler fig.

---

## Code & Minh họa

- **[solutions.go](./solutions.go)** — code Go biên dịch được: API Gateway aggregation (fan-out 3 service mock song song), Anti-corruption layer (dịch model legacy→mới), Strangler router (route old/new theo prefix), BFF (payload may đo cho web/mobile). Chạy: \`go run solutions.go\`.
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **Monolith → Microservices**: animate tách monolith thành service theo capability.
  2. **API Gateway aggregation**: 1 request fan-out 3 service, thấy gom kết quả.
  3. **Strangler fig migration**: route progressively từng phần old → new.

---

## Bài tiếp theo

- [Lesson 70 — Service Mesh](../lesson-70-service-mesh-intro/) — Istio/Linkerd, proxy sidecar (mở rộng mục 5), mTLS, traffic shaping. Service mesh đẩy resilience (mục 12) và observability (mục 13) xuống tầng hạ tầng.
- [Lesson 71 — Mini-project: Microservices](../lesson-71-mini-project-microservices/) — ráp tất cả: 3 service giao tiếp gRPC + queue, có saga + idempotency.

## Tham khảo

- Sam Newman — *Building Microservices* (2nd ed).
- Chris Richardson — *Microservices Patterns* & [microservices.io](https://microservices.io).
- Martin Fowler — "MonolithFirst", "StranglerFigApplication".
- Eric Evans — *Domain-Driven Design* (bounded context, ACL).
`;
