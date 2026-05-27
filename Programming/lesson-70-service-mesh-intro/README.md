# Lesson 70 — Service Mesh (Giới thiệu)

> **Tier 6 — Distributed & Microservices.** Bài này nằm sau [Lesson 69 — Microservice Patterns](../lesson-69-microservice-patterns/) và trước [Lesson 71 — Mini-project Microservices](../lesson-71-mini-project-microservices/).

Khi hệ thống có hàng chục microservice gọi nhau qua mạng, mỗi cuộc gọi cần: **retry, timeout, circuit breaker, mã hoá (mTLS), tracing, load balancing**. Câu hỏi mở bài: *nếu mỗi service tự viết những thứ này, mà service lại viết bằng nhiều ngôn ngữ khác nhau (Go, Java, Python, Node), làm sao đảm bảo chúng nhất quán?* Bài này trả lời: **đẩy hết những lo lắng đó xuống một tầng hạ tầng riêng — service mesh** — và đến cuối bài bạn sẽ tính được chính xác cái giá phải trả (latency, CPU, RAM) cùng với khi nào nên / không nên dùng.

---

## Mục tiêu học tập

Sau bài này bạn sẽ:

1. Phát biểu được **vấn đề** mà service mesh sinh ra để giải quyết (cross-cutting concern lặp lại + đa ngôn ngữ).
2. Giải thích **sidecar proxy** và vì sao app chỉ gọi `localhost`.
3. Phân biệt **data plane** (Envoy) và **control plane** (Istiod) — ai làm gì.
4. So sánh **Istio** và **Linkerd**; biết khi nào chọn cái nào.
5. Cấu hình (trên giấy) **traffic shifting / canary**, **fault injection**, hiểu **mTLS** bắt tay thế nào.
6. **Định lượng cái giá** của sidecar (latency +1–2ms, CPU, RAM) và quyết định **khi nào KHÔNG nên** dùng mesh.
7. Biết các **alternative** (library, API gateway, eBPF/Cilium) và **các pitfall** thường gặp.

## Kiến thức tiền đề

- [Lesson 52 — Rate Limiting & Circuit Breaker](../lesson-52-rate-limiting-circuit-breaker/) — vì mesh "config hoá" chính các pattern này.
- [Lesson 63 — Service Discovery & Load Balancing](../lesson-63-service-discovery-lb/) — mesh kế thừa khái niệm này.
- [Lesson 69 — Microservice Patterns](../lesson-69-microservice-patterns/) — mesh là một "platform pattern" cho hệ microservice.
- [Lesson 47 — TLS & Crypto Basics](../lesson-47-tls-crypto-basics/) — nền tảng để hiểu mTLS.

---

## 1. Vấn đề: cross-cutting concern lặp lại trong mọi service

> 💡 **Trực giác.** Hình dung một toà nhà 20 căn hộ. Mỗi căn đều cần: khoá cửa, chuông báo cháy, đồng hồ điện, camera. Cách 1: mỗi chủ nhà tự mua tự lắp — 20 kiểu khác nhau, hỏng cái nào sửa cái đó, người lắp sai thì căn đó mất an toàn. Cách 2: ban quản lý toà nhà lắp một **hệ thống chung** cho cả 20 căn — đồng nhất, nâng cấp một lần là cả toà được. Service mesh là "ban quản lý toà nhà" cho phần **giao tiếp mạng** giữa các service.

Trong kiến trúc microservice, mỗi cuộc gọi service-to-service (vd `cart` gọi `checkout` gọi `payment`) cần một loạt việc **không liên quan tới nghiệp vụ** (gọi là *cross-cutting concern*):

| Concern | Ý nghĩa | Nếu thiếu |
|---------|---------|-----------|
| **Retry** | Gọi lại khi lỗi tạm thời | 1 gói tin rớt → cả request fail |
| **Timeout** | Cắt cuộc gọi treo quá lâu | 1 service chậm → kéo treo cả chuỗi |
| **Circuit breaker** | Chặn nhanh khi upstream sập | Gọi mãi service đã chết → cạn tài nguyên |
| **mTLS** | Mã hoá + xác thực 2 chiều | Traffic nội bộ chạy plaintext, ai vào mạng cũng nghe được |
| **Tracing** | Lần theo 1 request qua nhiều service | Không biết request chậm ở đâu |
| **Load balancing** | Chia tải sang nhiều instance | Dồn hết vào 1 instance |

### 1.1 Vì sao "tự viết trong mỗi service" là sai lầm

Giả sử bạn có **15 service**, viết bằng **3 ngôn ngữ** (Go, Java, Python). Để mỗi service có đủ 6 concern trên, bạn cần:

- Một thư viện retry/timeout/CB **cho Go**, một **cho Java**, một **cho Python** → 3 bản, hành vi phải khớp nhau từng chi tiết (retry mấy lần? backoff bao lâu? CB mở khi nào?).
- Mỗi khi đổi policy (vd "tăng timeout từ 1s lên 2s"), phải sửa code **15 service**, build lại, deploy lại 15 lần.
- Lập trình viên service nghiệp vụ phải hiểu cả mTLS, cert rotation, tracing header propagation — phân tâm khỏi việc chính.

> ⚠ **Lỗi thường gặp.** "Cứ viết một shared library rồi import vào mọi service là xong." Vấn đề: (1) chỉ đúng nếu **cùng ngôn ngữ** — Python không import được lib Go; (2) nâng cấp library = phải bump version + redeploy **tất cả** service dùng nó, không thể đổi tức thời; (3) lib chạy *trong* process app nên bug ở lib có thể làm sập app.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Đa ngôn ngữ thì sao không bắt mọi team dùng chung 1 ngôn ngữ?"* → Thực tế không khả thi: team data thích Python, team mobile-backend thích Node, team core thích Go/Java. Mesh cho phép giữ tự do ngôn ngữ.
> - *"Đổi policy phải redeploy 15 service — chẳng phải CI/CD lo được sao?"* → Redeploy được nhưng (a) chậm (build + rollout 15 lần), (b) rủi ro (mỗi deploy có thể hỏng), (c) không atomic (trong lúc rollout, một nửa dùng policy cũ một nửa policy mới).

### 1.2 Định lượng nỗi đau — bài toán 15 service × 3 ngôn ngữ

Hãy tính cụ thể chi phí "tự viết". Giả sử mỗi service cần đủ 6 concern, mỗi concern khoảng 200 dòng code có test:

- **6 concern × 200 dòng = ~1200 dòng** "code hạ tầng" cho mỗi ngôn ngữ.
- 3 ngôn ngữ (Go, Java, Python) → **3 bản** = ~3600 dòng phải **viết và bảo trì cho khớp nhau từng hành vi**.
- Mỗi lần Go sửa logic retry (vd đổi backoff từ tuyến tính sang exponential), phải sửa **đồng bộ** Java + Python, nếu không 3 ngôn ngữ retry khác nhau → hành vi hệ thống không nhất quán, debug địa ngục.

Một ví dụ "không nhất quán" cụ thể: service Go retry 3 lần với backoff 100/200/400ms; service Python (do dev khác viết) retry 5 lần không backoff. Khi `payment` chập chờn, hai service hành xử khác hẳn → metric khó đọc, một service làm `payment` quá tải vì retry dồn dập. Đây chính là kiểu lỗi mesh loại bỏ: **một policy, áp cho tất cả.**

Còn chi phí đổi policy: tăng timeout `1s → 2s` cho toàn hệ. Tự viết: sửa config 15 service → build 15 image → rollout 15 deployment, mỗi cái có rủi ro, không atomic. Với mesh: sửa **một** dòng YAML, `kubectl apply` — Istiod đẩy xuống mọi Envoy gần như tức thời, không build, không restart pod.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Vì sao "shared library" không giải quyết được bài toán đa ngôn ngữ?
> 2. Đổi timeout toàn hệ: tự-viết cần bao nhiêu lần build/deploy, mesh cần bao nhiêu?
>
> <details><summary>Đáp án</summary>
> 1. Library gắn với một runtime/ngôn ngữ — Python không import được package Go, Java không dùng được module Python. Mỗi ngôn ngữ phải có bản riêng, khó giữ hành vi khớp nhau.
> 2. Tự-viết: 15 lần build + 15 lần rollout (mỗi service một lần). Mesh: 0 build, 1 lần `kubectl apply` (config push, không restart pod).
> </details>

📝 **Tóm tắt mục 1.** Cross-cutting concern (retry/timeout/CB/mTLS/tracing/LB) lặp ở **mọi** service; viết tay trong app thì **duplicate** (vd ~3600 dòng cho 3 ngôn ngữ) và **đa ngôn ngữ khó đồng nhất**; đổi policy phải sửa + build + deploy lại tất cả. Đây là động lực sinh ra service mesh.

---

## 2. Service mesh là gì

> 💡 **Trực giác.** Service mesh là một **tầng hạ tầng (infrastructure layer)** chuyên xử lý **giao tiếp service-to-service**, được **tách hoàn toàn khỏi code ứng dụng**. App chỉ lo nghiệp vụ; mọi thứ về "làm sao gói tin đi từ service A tới service B một cách an toàn, có retry, có đo đạc" là việc của mesh.

Định nghĩa đầy đủ (3 phần):

- **(a) Là gì** — một lớp phần mềm chạy *cạnh* mọi service, đảm nhận toàn bộ network logic giữa các service: định tuyến, mã hoá, retry, đo đạc.
- **(b) Vì sao tồn tại** — để **không phải** nhúng các concern ở mục 1 vào từng app (giải bài toán duplicate + đa ngôn ngữ). Tách concern khỏi business code → đổi policy = đổi config tập trung, không động vào app, áp dụng đồng nhất bất kể ngôn ngữ.
- **(c) Ví dụ trực giác.** App `cart` (viết Python) cần gọi `checkout` (viết Go) qua mTLS với retry 2 lần và timeout 1s. Với mesh: code Python chỉ viết `http.get("http://checkout/pay")` — **không một dòng** nào về TLS, retry, timeout. Mesh chặn cuộc gọi này lại, tự mã hoá, tự retry, tự đo, rồi chuyển tới `checkout`.

Điểm cốt lõi: mesh hoạt động ở **tầng mạng (L4/L7)**, *trong suốt* với app. App tưởng nó đang gọi service đích, thực ra đang gọi proxy cục bộ.

> ❓ **Câu hỏi tự nhiên.**
> - *"Mesh chỉ là một cách gọi khác của API gateway?"* → Không. API gateway lo traffic **vào hệ** từ bên ngoài (north-south): client → hệ thống. Mesh lo traffic **giữa các service nội bộ** (east-west): service → service. Hai thứ bổ sung nhau, nhiều hệ dùng cả hai (gateway ở rìa + mesh bên trong).
> - *"Tách concern khỏi app — chẳng phải vẫn có code chạy đâu đó?"* → Đúng, code vẫn chạy (trong Envoy), nhưng **không phải code do team nghiệp vụ viết và không nằm trong app process**. Đó là khác biệt then chốt: team `cart` không viết một dòng mTLS nào, mà traffic của họ vẫn được mã hoá.

> 📝 **Tóm tắt mục 2.** Service mesh = tầng hạ tầng xử lý giao tiếp **service-to-service**, tách khỏi app code. Tồn tại để diệt bài toán duplicate + đa ngôn ngữ. App chỉ gọi như bình thường; mesh (ở tầng L4/L7, trong suốt) lo network logic.

---

## 3. Sidecar proxy

> 💡 **Trực giác.** "Sidecar" là cái thùng gắn bên hông xe máy ba bánh — đi cùng xe, cùng số phận, nhưng là bộ phận riêng. Với mỗi service, mesh gắn thêm một **proxy** chạy *cùng pod* (cùng vòng đời, cùng máy) làm "thùng sidecar" lo phần mạng.

Cơ chế (walk-through cụ thể):

1. Pod của service `cart` được inject thêm 1 container nữa: **Envoy proxy**. Giờ pod có 2 container: `cart` (app) + `envoy` (sidecar).
2. Mọi traffic **ra/vào** pod bị `iptables` (do mesh cài) chuyển hướng qua Envoy. App không thể "đi tắt".
3. Khi app `cart` muốn gọi `checkout`, nó gọi `http://checkout/pay`. Thực chất kết nối này bị Envoy của `cart` chặn.
4. Envoy `cart` lo: chọn instance `checkout` nào (LB), mở mTLS, set timeout, retry nếu lỗi, ghi metric/trace.
5. Envoy `cart` gửi tới Envoy của `checkout`. Envoy `checkout` giải mã mTLS, kiểm tra danh tính `cart` có quyền không, rồi chuyển vào app `checkout` qua `localhost`.

```
┌─────────── Pod: cart ───────────┐        ┌────────── Pod: checkout ─────────┐
│  ┌─────────┐      ┌──────────┐  │  mTLS  │  ┌──────────┐      ┌──────────┐  │
│  │  app    │─────▶│  Envoy   │──┼────────┼─▶│  Envoy   │─────▶│  app     │  │
│  │  cart   │ local│ sidecar  │  │ network│  │ sidecar  │ local│ checkout │  │
│  └─────────┘      └──────────┘  │        │  └──────────┘      └──────────┘  │
└─────────────────────────────────┘        └───────────────────────────────────┘
   "gọi http://checkout"            Envoy↔Envoy lo mọi network concern
```

**Cơ chế iptables cụ thể (vì sao app "không biết"):** khi inject sidecar, mesh chạy một init-container cài quy tắc iptables trong network namespace của pod, đại ý: "mọi gói tin outbound (trừ tới chính Envoy) → chuyển hướng (REDIRECT) tới cổng Envoy `15001`; mọi gói inbound → chuyển tới cổng `15006`". Vì app và Envoy **chung network namespace** (cùng pod), app gọi `connect(checkout:80)` nhưng kernel lặng lẽ nối socket đó vào Envoy. App nhận về response bình thường, không hề biết đã đi vòng. Đây là lý do mesh "trong suốt" — không SDK, không đổi code, không đổi biến môi trường.

> ❓ **Câu hỏi tự nhiên.**
> - *"App gọi localhost — tức là phải đổi code để trỏ về localhost?"* → Không. App vẫn gọi `http://checkout`. `iptables` âm thầm chuyển hướng (REDIRECT về cổng 15001/15006 của Envoy). App hoàn toàn không biết có Envoy. Đó là điểm hay nhất.
> - *"Mỗi pod thêm 1 container — tốn gấp đôi?"* → Không gấp đôi, nhưng có overhead thật (Envoy ăn ~50–100MB RAM, vài % CPU mỗi pod). Sẽ định lượng kỹ ở mục 11.

📝 **Tóm tắt mục 3.** Mỗi service được gắn 1 **sidecar proxy (Envoy)** chạy cùng pod; `iptables` chuyển toàn bộ traffic qua nó; app gọi như bình thường còn proxy lo hết network concern. App ↔ Envoy qua `localhost`, Envoy ↔ Envoy qua mạng (mTLS).

---

## 4. Data plane vs Control plane

> 💡 **Trực giác.** Nghĩ tới giao thông một thành phố. **Data plane** = các xe cộ thật sự chạy trên đường (chở người, chở hàng). **Control plane** = trung tâm điều khiển đèn giao thông + bảng chỉ dẫn: nó không tự chở ai, nhưng nó **quyết định luật** cho mọi xe (đèn xanh/đỏ, hướng đi). Sidecar Envoy là xe; Istiod là trung tâm điều khiển.

| | **Data plane** | **Control plane** |
|---|---|---|
| **Là ai** | Tập hợp các sidecar proxy (Envoy) | Bộ não config (Istiod với Istio) |
| **Làm gì** | Trực tiếp xử lý từng gói tin: route, mTLS, retry, đo | Sinh & đẩy config xuống mọi Envoy, quản lý cert, theo dõi service registry |
| **Có nằm trên đường data không?** | Có — mọi request đi qua nó | Không — chỉ quản lý, không chạm vào traffic thật |
| **Sập thì sao?** | Service đó mất kết nối | Traffic vẫn chạy bằng config cũ; chỉ là **không cập nhật được config mới** cho tới khi control plane hồi phục |

Điểm quan trọng cuối bảng: control plane **không nằm trên đường đi của request**. Nếu Istiod chết, các Envoy vẫn route traffic bằng config đã nhận → hệ thống không sập ngay. Đây là thiết kế cố ý để control plane không thành single point of failure cho data path.

> 💡 **Trực giác bổ sung.** So sánh với mạng máy tính: data plane giống *forwarding* (chuyển gói tin theo bảng định tuyến hiện có), control plane giống *routing protocol* (tính ra bảng định tuyến). Router vẫn chuyển gói được khi giao thức định tuyến tạm gián đoạn — chỉ là không học được đường mới. Mesh mượn đúng phân tách kinh điển này từ thế giới networking.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Một request từ `cart` tới `checkout` đi qua data plane hay control plane?
> 2. Bạn `kubectl apply` một VirtualService mới (đổi route). Thành phần nào nhận và xử lý?
>
> <details><summary>Đáp án</summary>
> 1. **Data plane** (các Envoy). Request thật luôn đi qua proxy, không bao giờ qua Istiod.
> 2. **Control plane** (Istiod) nhận YAML, dịch thành config Envoy, rồi **đẩy xuống** các Envoy liên quan. Sau đó data plane áp dụng route mới cho request tiếp theo.
> </details>

📝 **Tóm tắt mục 4.** **Data plane** = sidecar Envoy, xử lý traffic thật. **Control plane** = Istiod, cấu hình & quản lý các proxy, **không** nằm trên data path → control plane chết thì traffic vẫn chạy bằng config cũ.

---

## 5. Istio — mesh phổ biến nhất

**Istio** là service mesh được dùng rộng rãi nhất (CNCF graduated). Kiến trúc:

- **Data plane:** Envoy sidecar (proxy C++ mạnh, nhiều tính năng L7).
- **Control plane:** **Istiod** — gộp 3 thành phần cũ (Pilot = config, Citadel = cert, Galley = validation) thành 1 binary.

Cấu hình Istio bằng các **Custom Resource** YAML trên Kubernetes:

```yaml
# VirtualService: định tuyến — gửi traffic checkout sang v1 / v2 thế nào
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: checkout
spec:
  hosts: [checkout]
  http:
    - route:
        - destination: { host: checkout, subset: v1 }
          weight: 90        # 90% sang v1
        - destination: { host: checkout, subset: v2 }
          weight: 10        # 10% sang v2 (canary)
```

```yaml
# DestinationRule: định nghĩa subset v1/v2 + outlier detection (circuit breaker)
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: checkout
spec:
  host: checkout
  subsets:
    - { name: v1, labels: { version: v1 } }
    - { name: v2, labels: { version: v2 } }
  trafficPolicy:
    outlierDetection:          # circuit breaker: eject instance hay lỗi
      consecutive5xxErrors: 5
      interval: 30s
      baseEjectionTime: 30s
```

Điểm mấu chốt: **toàn bộ là config, không một dòng code app.** Đổi 90/10 thành 50/50 chỉ là sửa số trong YAML rồi `kubectl apply` — Istiod đẩy ngay xuống Envoy.

### 5.1 Mô hình tài nguyên Istio — ai lo gì

Bốn CRD hay gặp nhất, nhớ "ai làm gì" để không cấu hình nhầm:

| Resource | Lo việc gì | Tương tự khái niệm cũ |
|----------|-----------|----------------------|
| **VirtualService** | "Đi đâu" — định tuyến: route theo weight (canary), theo header (A/B), timeout, retry, fault injection | Bảng định tuyến / routing rules |
| **DestinationRule** | "Tới rồi xử lý sao" — định nghĩa subset (v1/v2), LB policy, outlier detection (circuit breaker), connection pool | Cấu hình upstream / pool |
| **Gateway** | Cửa vào/ra ở rìa mesh (north-south) | Ingress / API gateway |
| **PeerAuthentication** | Bật/tắt mTLS (PERMISSIVE / STRICT) | Chính sách TLS |

> ⚠ **Lỗi thường gặp.** Khai báo `weight` sang `subset: v2` trong VirtualService nhưng **quên** định nghĩa `subset v2` trong DestinationRule → Istio không biết v2 là pod nào → route fail im lặng. Quy tắc: **VirtualService nói "đi đâu", DestinationRule định nghĩa "đâu là đâu"** — cả hai phải khớp tên subset.

> ⚠ **Lỗi thường gặp #2.** Istio mạnh nhưng **dốc học**: rất nhiều CRD, nhiều cách cấu hình chồng chéo. Đừng "bật full Istio" ngày đầu — bắt đầu từ mTLS (`PeerAuthentication`) + metric, thêm VirtualService/DestinationRule khi cần canary.

---

## 6. Linkerd — nhẹ, đơn giản hơn

**Linkerd** là service mesh tối giản, triết lý "ít tính năng nhưng dễ vận hành":

- **Data plane:** **micro-proxy viết bằng Rust** (`linkerd2-proxy`) — nhỏ và nhẹ hơn Envoy đáng kể (RAM thường ~10–20MB so với ~50–100MB của Envoy), latency thêm thường thấp hơn.
- **Control plane:** đơn giản hơn Istiod, ít CRD.
- **Triết lý:** mTLS mặc định bật, "just works", cấu hình ít.

| | **Istio** | **Linkerd** |
|---|---|---|
| Proxy | Envoy (C++) | micro-proxy (Rust) |
| Tính năng | Rất nhiều (L7 nâng cao, nhiều protocol) | Đủ dùng, tập trung core |
| Độ phức tạp | Cao | Thấp |
| Overhead | Cao hơn | Thấp hơn |
| Khi nào chọn | Cần traffic management phức tạp, đa protocol, đã có team platform | Muốn mTLS + observability nhanh gọn, team nhỏ |

Ví dụ Linkerd cấu hình traffic split (canary) — đơn giản hơn Istio:

```yaml
apiVersion: split.smi-spec.io/v1alpha2
kind: TrafficSplit
metadata: { name: checkout }
spec:
  service: checkout
  backends:
    - { service: checkout-v1, weight: 90 }
    - { service: checkout-v2, weight: 10 }
```

So với Istio cần **2** resource (VirtualService + DestinationRule), Linkerd dùng **1** TrafficSplit. Ít khái niệm hơn = dễ học, nhưng cũng kém linh hoạt hơn cho route phức tạp.

> ❓ **Câu hỏi tự nhiên.** *"Nhẹ hơn thì cứ Linkerd cho lành?"* → Không hẳn. Nếu bạn cần **fault injection chi tiết, traffic mirroring, routing theo header phức tạp, hỗ trợ gRPC/gRPC-Web/nhiều protocol** thì Istio + Envoy linh hoạt hơn. Chọn theo nhu cầu, không theo "cái nào nhẹ hơn".

📝 **Tóm tắt mục 5–6.** **Istio** = Envoy + Istiod, mạnh nhất nhưng phức tạp. **Linkerd** = micro-proxy Rust, nhẹ và dễ vận hành, ít tính năng nâng cao hơn. Cả hai đều cấu hình tập trung, không động code app.

---

## 7. Các tính năng cốt lõi (đều là config, zero code)

### 7.1 mTLS tự động

Mesh **tự động** mã hoá + xác thực hai chiều mọi traffic service-to-service. Mỗi service nhận một danh tính (SPIFFE ID + cert do control plane cấp), cert **tự rotate** (vd mỗi 24h). App không viết một dòng nào về TLS.

```yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata: { name: default, namespace: default }
spec:
  mtls: { mode: STRICT }   # ép mọi traffic phải mTLS
```

### 7.2 Traffic management

Routing có điều kiện, **canary**, **A/B test**, **mirroring** (copy traffic sang phiên bản mới để test mà không ảnh hưởng user), **fault injection**. Tất cả qua VirtualService.

### 7.3 Resilience

Retry, timeout, circuit breaker — config, không code:

```yaml
http:
  - route: [{ destination: { host: checkout } }]
    timeout: 2s
    retries:
      attempts: 3
      perTryTimeout: 1s
      retryOn: 5xx,reset,connect-failure
```

So sánh với [Lesson 52](../lesson-52-rate-limiting-circuit-breaker/): ở đó bạn **viết tay** circuit breaker bằng Go. Mesh biến đúng pattern đó thành 3 dòng YAML, áp cho mọi service bất kể ngôn ngữ.

### 7.4 Observability

Mesh **tự sinh** metric (request rate, error rate, latency p50/p90/p99), distributed tracing (gắn header trace, đo từng hop), access log — cho **mọi** service, không cần app instrument gì. Đây thường là lý do số 1 khiến team adopt mesh.

Ví dụ cụ thể metric mesh tự sinh cho cặp `cart → checkout` (mỗi Envoy export ra Prometheus):

```
istio_requests_total{source="cart", destination="checkout", response_code="200"} = 9_812
istio_requests_total{source="cart", destination="checkout", response_code="503"} = 188
istio_request_duration_milliseconds{...,quantile="0.5"}  = 18
istio_request_duration_milliseconds{...,quantile="0.99"} = 47
```

Đọc ra ngay: error rate = 188/(9812+188) = **1.88%**, p50 = 18ms, p99 = 47ms — **mà app cart/checkout không viết một dòng đo nào**. Trước khi có mesh, để có 4 con số này bạn phải nhét thư viện metric vào cả cart lẫn checkout (và phải đồng nhất tên metric giữa hai ngôn ngữ).

> ❓ **Câu hỏi tự nhiên.** *"Tracing tự động — nghĩa là không cần OpenTelemetry trong app?"* → Mesh đo được **giữa các service** tự động (hop A→B mất bao lâu). Nhưng để trace **bên trong** app (function nào chậm), bạn vẫn cần instrument app. Mesh propagate header trace giúp, nhưng app phải forward header xuống cuộc gọi tiếp theo.

### 7.5 Walk-through: một request đi qua đủ tính năng

Để thấy 4 nhóm tính năng trên phối hợp thế nào, theo dõi một request `cart → checkout` đi qua Envoy của cart (config: timeout 2s, retry 2, mTLS STRICT, canary 90/10):

1. **App cart** gọi `http://checkout/pay`. iptables chuyển sang Envoy cart.
2. **Routing (7.2):** Envoy quay weighted route → trúng `v1` (90% khả năng).
3. **mTLS (7.1):** Envoy cart bắt tay mTLS với Envoy của instance v1 đã chọn (mở connection mới, hoặc reuse nếu đã có).
4. **Timeout (7.3):** Envoy gắn deadline 2s cho lần thử này.
5. **Gọi:** request đi tới Envoy checkout v1 → app checkout. Giả sử lần này v1 trả 503 (lỗi tạm thời).
6. **Retry (7.3):** vì `retryOn: 5xx`, Envoy cart thử lại (attempt 2), quay route lại — có thể trúng instance khác. Lần này 200 OK.
7. **Observability (7.4):** Envoy ghi: 1 request, 1 retry, kết quả 200, latency tổng = ?ms, vào metric + trace span. Tự động, app không gọi gì.
8. **Trả về:** app cart nhận 200 như thể mọi thứ trơn tru — không hề biết đã có 1 lần 503 + 1 lần retry + mã hoá mTLS ở giữa.

Toàn bộ 8 bước: app cart viết đúng **1 dòng** `http.get`. (`solutions.go` hàm `Sidecar.Send` mô phỏng đúng chuỗi này: mTLS → route → timeout → retry → record metric.)

---

## 8. Traffic shifting (canary deploy)

> 💡 **Trực giác.** Bạn nấu nồi phở mới công thức. Thay vì bán cho cả 100 khách (lỡ dở thì mất hết), bạn cho **10 khách** nếm trước. Ngon → cho 50 khách. Vẫn ổn → cả 100. Canary deploy y hệt: đẩy **một phần nhỏ** traffic sang phiên bản mới, theo dõi metric, tăng dần nếu khoẻ.

Quy trình canary với mesh:

| Bước | weight v1 | weight v2 | Theo dõi |
|------|-----------|-----------|----------|
| 0 | 100 | 0 | (baseline) |
| 1 | 90 | 10 | error rate v2, p99 latency v2 |
| 2 | 50 | 50 | so sánh v2 vs v1 |
| 3 | 0 | 100 | v2 thành mặc định |
| rollback | 100 | 0 | nếu v2 lỗi → quay lại tức thì |

Mỗi bước chỉ là sửa `weight` trong VirtualService + `kubectl apply`. Nếu v2 hỏng, đổi về `100/0` là rollback **tức thời** — không cần redeploy.

> ⚠ **Lỗi thường gặp.** "Canary = cứ chia % rồi để đó." Sai: canary phải đi kèm **quan sát metric** (error rate, latency của v2) ở mỗi bước. Không có observability thì canary chỉ là "chia bừa traffic". Đây là lý do observability (7.4) và traffic shifting đi đôi.

---

## 9. Fault injection (chaos testing)

> 💡 **Trực giác.** Tập diễn cháy nhà: cố tình hú còi báo cháy để xem mọi người có thoát đúng cách không, **trước khi** cháy thật. Fault injection cố tình "gây lỗi giả" trong production-like để xem hệ thống có chịu được không.

Mesh cho phép **tiêm lỗi** vào traffic mà không sửa code:

```yaml
http:
  - fault:
      delay:                 # tiêm độ trễ
        percentage: { value: 100 }
        fixedDelay: 5s       # mọi request chậm 5s
      abort:                 # hoặc tiêm lỗi HTTP
        percentage: { value: 10 }
        httpStatus: 503      # 10% request trả 503
    route: [{ destination: { host: checkout } }]
```

Dùng để **test resilience**: nếu bạn config timeout của caller là 2s, mà tiêm delay 5s vào `checkout`, thì caller phải timeout đúng ở 2s (không treo mãi). Nếu nó treo → bạn vừa phát hiện lỗi cấu hình **trước khi** sự cố thật xảy ra.

Walk-through hai loại tiêm lỗi:

- **Tiêm delay (test timeout/retry):** `fixedDelay: 5s, percentage: 100` → 100% request tới checkout chậm 5s. Dùng kiểm tra caller có cắt đúng ở timeout của nó không (xem BT4).
- **Tiêm abort (test xử lý lỗi):** `httpStatus: 503, percentage: 10` → 10% request bị trả 503 ngay (không gọi tới app thật). Dùng kiểm tra: caller có retry không? có fallback/degrade không? hay sập? Vd nếu `cart` cấu hình `retryOn: 503` với 3 lần thử, thì với 10% lỗi độc lập, xác suất một request fail sau cả 3 lần ≈ 0.1³ = **0.1%** → caller chịu được lỗi lẻ tẻ. Tiêm 50% thì 0.5³ = 12.5% fail — lúc này retry không cứu nổi, lộ ra ngưỡng chịu đựng.

> ❓ **Câu hỏi tự nhiên.** *"Tiêm lỗi vào production thật à, không sợ ảnh hưởng user?"* → Tiêm có kiểm soát: chỉ với traffic có header test cụ thể, hoặc trong môi trường staging, hoặc % rất nhỏ với khả năng tắt ngay. Đây là nền của *chaos engineering*.

---

## 10. mTLS — bắt tay giữa hai sidecar

> 💡 **Trực giác.** mTLS giống hai người gặp nhau và **cả hai** đều phải xuất trình CMND (không chỉ một bên). TLS thường: chỉ server trình cert (như web HTTPS — bạn check ngân hàng, ngân hàng không check bạn ở tầng TLS). **mTLS = mutual TLS**: cả client lẫn server đều trình cert và verify lẫn nhau.

Bắt tay mTLS giữa Envoy `cart` và Envoy `checkout` (walk-through):

1. Control plane (Istiod) cấp cho mỗi service một **danh tính** dạng SPIFFE ID, vd `spiffe://cluster.local/ns/default/sa/cart`, kèm cert X.509 ký bởi CA của mesh.
2. Khi Envoy `cart` mở kết nối tới Envoy `checkout`:
   - `cart` gửi cert của mình; `checkout` verify cert đó do CA của mesh ký → biết "đây đúng là cart".
   - `checkout` gửi cert của mình; `cart` verify → biết "đây đúng là checkout, không phải kẻ giả mạo".
3. Cả hai cùng có danh tính đã xác thực → thoả thuận khoá phiên → mã hoá traffic.
4. Cert **tự rotate** định kỳ; app không bao giờ chạm vào cert, không lưu private key trong code.

Lợi ích so với "tự làm TLS trong app": (a) không service nào quên bật mã hoá; (b) không ai hardcode cert/key vào code; (c) rotate tự động, không downtime; (d) có thể ép `STRICT` toàn cluster — bất kỳ traffic plaintext nào bị chặn (*zero-trust*).

File [`solutions.go`](./solutions.go) mô phỏng đúng quy trình verify-hai-chiều này trong hàm `mtlsHandshake`.

📝 **Tóm tắt mục 7–10.** Mesh cung cấp **mTLS tự động** (zero-code, cert tự rotate), **traffic management** (canary, A/B, mirror, fault inject), **resilience** (retry/timeout/CB qua config), **observability** (metric/trace/log tự động). **Canary** = tăng dần weight v2 kèm theo dõi metric. **Fault injection** = tiêm delay/error để test resilience. **mTLS** = bắt tay 2 chiều, cả client lẫn server đều verify cert.

---

## 11. Cái giá phải trả (cost)

Service mesh **không miễn phí**. Hai loại chi phí:

### 11.1 Overhead tài nguyên (định lượng cụ thể)

| Chi phí | Mức điển hình | Vì sao |
|---------|---------------|--------|
| **Latency** | **+1–2ms mỗi hop** (đôi khi hơn dưới tải cao) | Mỗi request đi qua **2 proxy** thêm: Envoy bên gửi + Envoy bên nhận |
| **CPU** | thêm vài % → hàng chục % mỗi pod tuỳ tải | Envoy giải mã/mã hoá mTLS, parse L7, đo metric |
| **RAM** | Envoy ~50–100MB/pod; Linkerd ~10–20MB/pod | Mỗi pod chạy thêm 1 container proxy |

Walk-through tính latency: một request đi `cart → checkout → payment` (2 hop). Không mesh: tổng = thời gian xử lý thật. Với mesh, **mỗi hop** thêm ~1–2ms cho cặp proxy. 2 hop → **+2–4ms** thêm vào tổng độ trễ. Với API mục tiêu p99 < 50ms thì 2–4ms là chấp nhận được; với API siêu nhạy (HFT, p99 < 1ms) thì đây là deal-breaker.

Walk-through tính RAM: cluster 200 pod, mỗi pod thêm Envoy ~80MB → **+16GB RAM** chỉ cho sidecar. Đây là chi phí thật phải tính vào sizing cluster.

### 11.2 Độ phức tạp vận hành

- Thêm một hệ thống nữa phải hiểu, debug, nâng cấp (Istio version, Envoy version, CRD).
- Khi có sự cố mạng, phải phân biệt "lỗi do app hay do mesh/Envoy?".
- Cần người (hoặc team) có kỹ năng vận hành mesh.

> ⚠ **Lỗi thường gặp.** Bỏ qua phần overhead khi sizing rồi ngạc nhiên vì cluster hết RAM / latency tăng sau khi bật mesh. Luôn đo baseline **trước** và **sau** khi adopt.

### 11.3 Walk-through định lượng đầy đủ cho một cluster thật

Cluster: **150 pod**, dùng Envoy (~80MB RAM, ~0.1 vCPU idle mỗi sidecar). Một API quan trọng có chuỗi 3 hop `gateway → orders → inventory → pricing`.

**RAM:** 150 × 80MB = **12GB** chỉ cho sidecar. Nếu mỗi node 16GB và chạy ~20 pod/node → ~1.6GB sidecar/node, tức ~10% RAM mỗi node dành riêng cho mesh. Phải cộng vào sizing, nếu không node OOM.

**CPU:** ở tải cao mỗi Envoy có thể ăn 0.2–0.5 vCPU. 150 sidecar × 0.3 = **~45 vCPU** thêm cho cả cluster. Đáng kể nếu cluster nhỏ.

**Latency:** chuỗi 3 hop → 3 × (1–2ms) = **+3–6ms**. Nếu API đang p99 = 80ms, +6ms là +7.5% — chấp nhận được. Nếu API đang p99 = 5ms (siêu nhanh), +6ms là **hơn gấp đôi** — không chấp nhận được.

So sánh nếu dùng **Linkerd** thay Istio: RAM 150 × 15MB = **~2.25GB** (so với 12GB), latency thêm thường thấp hơn. Đây là lý do team coi trọng overhead hay chọn Linkerd hoặc ambient mode.

Bài học: **luôn nhân overhead per-pod với số pod, và nhân latency-per-hop với số hop của API nóng nhất** — đừng nghĩ "+1ms thì có là gì".

---

## 12. Khi nào CẦN service mesh

Mesh đáng giá khi tất cả (hoặc phần lớn) các điều kiện sau đúng:

1. **Nhiều service** — thường > 10–20. Càng nhiều, lợi ích "config tập trung" càng lớn.
2. **Đa ngôn ngữ** — không thể dùng chung 1 shared library. Mesh là ngôn-ngữ-bất-khả-tri (language-agnostic).
3. **Cần mTLS / observability / traffic management nhất quán** trên toàn hệ — yêu cầu bảo mật (zero-trust nội bộ), yêu cầu trace mọi hop, hay cần canary/A-B thường xuyên.
4. **Có team platform / SRE** đủ năng lực vận hành.

---

## 13. Khi nào KHÔNG nên

> ⚠ Đây là phần quan trọng nhất bài — adopt mesh quá sớm là sai lầm phổ biến nhất.

Tránh mesh khi:

1. **Ít service** — 3–5 service thì overhead vận hành lớn hơn lợi ích rất nhiều.
2. **Team nhỏ** — không đủ người để vận hành thêm một hệ thống phức tạp; mesh sẽ "ăn" thời gian lẽ ra dành cho sản phẩm.
3. **Library-based đã đủ** — nếu toàn bộ service cùng một ngôn ngữ (vd all-Go) và đã có gRPC interceptor cho retry/timeout/CB/tracing thì mesh không thêm nhiều giá trị.
4. **Latency cực nhạy** — +1–2ms/hop là không chấp nhận được.

> ❓ **Câu hỏi tự nhiên.** *"Hệ tôi đang 8 service, đang phân vân?"* → Vùng xám. Cân nhắc: có đa ngôn ngữ không? có yêu cầu mTLS bắt buộc không? team có người vận hành không? Nếu phần lớn "không" → bắt đầu với **library + API gateway** trước, adopt mesh sau khi thực sự đau.

### 13.1 Bảng quyết định nhanh

Cho điểm: mỗi yếu tố "có" cộng điểm nghiêng về mesh.

| Yếu tố | Nghiêng về **mesh** | Nghiêng về **library/gateway** |
|--------|:---:|:---:|
| Số service | > 10–20 | < 5–10 |
| Số ngôn ngữ | ≥ 2 (đa ngôn ngữ) | 1 (đồng nhất) |
| Yêu cầu mTLS toàn cluster | Có (zero-trust) | Không bắt buộc |
| Cần observability/trace mọi hop nhất quán | Có | Không / đã có |
| Canary/A-B/traffic management thường xuyên | Có | Hiếm |
| Có team platform/SRE | Có | Không (team nhỏ) |
| Latency cực nhạy (p99 < vài ms) | (chống chỉ định) | Ưu tiên không proxy |

Quy tắc ngón tay cái: **đa số yếu tố nghiêng mesh** + **có người vận hành** → adopt. Còn lưỡng lự → bắt đầu nhỏ (library + gateway), giữ kiến trúc cho phép thêm mesh sau, adopt khi nỗi đau (mục 1) trở nên cụ thể và đo được.

---

## 14. Các alternative

Mesh không phải lựa chọn duy nhất cho cross-cutting concern:

| Alternative | Cách làm | Ưu | Nhược |
|-------------|----------|-----|-------|
| **Library (gRPC + interceptor)** | Nhúng retry/timeout/CB/trace vào shared lib, dùng qua interceptor | Không overhead proxy, không thêm hệ thống | Chỉ đúng nếu **cùng ngôn ngữ**; nâng cấp = redeploy hết |
| **API gateway** | 1 gateway ở rìa (edge) lo auth, rate limit, routing cho traffic **vào** | Đơn giản, đủ cho nhu cầu edge | Không lo traffic **giữa** các service nội bộ (east-west) |
| **eBPF-based (Cilium)** | Xử lý ở **kernel** qua eBPF, **không cần sidecar** | Overhead thấp hơn nhiều (không proxy userspace mỗi pod) | Tính năng L7 còn đang trưởng thành; yêu cầu kernel/infra phù hợp |

Xu hướng mới: **sidecar-less mesh** (Istio Ambient mode, Cilium) — bỏ proxy-per-pod để giảm overhead RAM/latency, là phản ứng trực tiếp với cost ở mục 11.

**Vì sao eBPF giảm được overhead:** mesh sidecar truyền thống = mỗi pod một proxy *userspace*, gói tin phải đi từ kernel lên userspace (Envoy) rồi xuống lại kernel — đó là phần "+1–2ms" và phần RAM/CPU. eBPF chèn chương trình nhỏ chạy **ngay trong kernel** ở các hook mạng, xử lý nhiều việc L3/L4 (và một phần L7) mà **không** phải nhảy lên userspace per-pod → ít copy gói, ít context switch → overhead thấp hơn. Đánh đổi: viết/hiểu eBPF khó, tính năng L7 nâng cao (vd retry HTTP phức tạp) còn đang hoàn thiện so với Envoy.

> 💡 **Trực giác chọn lựa.** Traffic **vào hệ** (north-south) → **API gateway**. Traffic **giữa các service** (east-west), cùng ngôn ngữ, ít service → **library**. East-west, đa ngôn ngữ, nhiều service → **mesh**. Quan tâm overhead → cân nhắc **eBPF/ambient**.

> 📝 **Tóm tắt toàn bài.** Microservice cần retry/timeout/CB/mTLS/tracing/LB ở **mọi** cuộc gọi — viết tay thì lặp và đa ngôn ngữ khó đồng nhất. **Service mesh** đẩy hết xuống tầng hạ tầng: mỗi service có **sidecar proxy (Envoy)** lo network, app chỉ gọi như thường. **Data plane** (Envoy) xử lý traffic, **control plane** (Istiod) cấu hình tập trung qua YAML, không nằm trên data path. **Istio** mạnh nhưng phức tạp, **Linkerd** nhẹ và đơn giản. Tính năng cốt lõi (mTLS tự động, canary, fault injection, observability) đều là **config, zero code**. Cái giá: **+1–2ms/hop, CPU, ~50–100MB RAM/pod, độ phức tạp vận hành**. **Dùng** khi nhiều service + đa ngôn ngữ + cần nhất quán + có team platform; **đừng dùng** khi ít service / team nhỏ / cùng ngôn ngữ / latency cực nhạy. Alternative: library, API gateway, eBPF (Cilium). Pitfall lớn nhất: **adopt quá sớm**.

---

## 15. Common pitfall

| Pitfall | Mô tả | Cách tránh |
|---------|-------|-----------|
| **Adopt quá sớm** | Bật mesh khi mới 3–5 service → complexity > benefit | Đợi tới khi thực sự đau (nhiều service, đa ngôn ngữ); bắt đầu nhỏ |
| **Không lường overhead** | Bật mesh xong cluster hết RAM, latency tăng bất ngờ | Đo baseline trước/sau; tính RAM = #pod × RAM proxy |
| **Debug khó (extra hop)** | Lỗi mạng giờ qua 2 proxy → khó biết lỗi ở app hay Envoy | Học đọc Envoy access log, dùng `istioctl proxy-config`, bật tracing |
| **Config phức tạp** | Istio nhiều CRD, dễ cấu hình sai (vd quên DestinationRule subset → route fail) | Bắt đầu từ mTLS + metric; thêm dần; cân nhắc Linkerd nếu cần đơn giản |

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Hệ 4 service, cùng Go, team 2 người, không yêu cầu mTLS bắt buộc — nên dùng mesh không?
> 2. Sau khi bật mesh, p99 latency của một API tăng từ 30ms lên 34ms. Có hợp lý không, do đâu?
>
> <details><summary>Đáp án</summary>
> 1. **Không.** Ít service + team nhỏ + cùng ngôn ngữ → library (gRPC interceptor) đủ; mesh chỉ thêm gánh nặng vận hành.
> 2. **Hợp lý.** API này có ~2 hop, mỗi hop +1–2ms qua cặp Envoy → +2–4ms tổng. 30→34ms khớp với overhead sidecar mong đợi, không phải bug.
> </details>

📝 **Tóm tắt mục 11–15.** Mesh tốn **latency (+1–2ms/hop), CPU, RAM (~50–100MB/pod)** và **độ phức tạp vận hành**. **Cần** khi nhiều service + đa ngôn ngữ + yêu cầu nhất quán + có team platform. **Không nên** khi ít service / team nhỏ / cùng ngôn ngữ (library đủ) / latency cực nhạy. **Alternative**: library, API gateway, eBPF/Cilium. **Pitfall** lớn nhất: adopt quá sớm.

---

## Bài tập

> Làm trước khi xem lời giải. Tất cả lời giải ở mục kế tiếp.

**BT1.** Vẽ (mô tả) traffic flow của một request `cart → checkout` trong **hai** trường hợp: (a) không có sidecar, (b) có sidecar. Chỉ rõ những việc nào do app làm, việc nào do proxy làm.

**BT2.** Viết kế hoạch canary shift `checkout` từ v1 sang v2 theo các mốc 10% → 50% → 100%. Cho biết mỗi bước sửa gì, theo dõi gì, và rollback thế nào.

**BT3.** Giải thích chi tiết bắt tay mTLS giữa sidecar của hai service `A` và `B`: ai trình cert, ai verify, vì sao gọi là "mutual".

**BT4.** Bạn muốn kiểm tra service `cart` có timeout đúng khi `checkout` chậm. Config fault injection tiêm **delay 5s** vào `checkout`. Nếu `cart` đặt timeout 2s thì kết quả mong đợi là gì? Nếu `cart` quên đặt timeout thì sao?

**BT5.** Với mỗi scenario, chọn **library** hay **mesh** và giải thích:
- (a) 5 service, tất cả viết Go, dùng gRPC, team 3 người.
- (b) 30 service, 4 ngôn ngữ, yêu cầu mTLS toàn cluster + trace mọi hop.
- (c) 12 service, 2 ngôn ngữ (Go + Python), cần canary thường xuyên, có team platform 4 người.

**BT6.** Sau khi adopt mesh, một API báo p99 latency tăng từ 40ms lên 46ms. API này gọi chuỗi `gateway → orders → inventory`. Phân tích: con số tăng này có hợp lý do sidecar overhead không? Tính toán cụ thể và đề xuất cách xác nhận.

---

## Lời giải chi tiết

### Lời giải BT1 — Traffic flow có/không sidecar

**(a) Không sidecar:**

```
[app cart] ──(tự lo: DNS, LB, mở TLS, retry, timeout, đo metric)──▶ [app checkout]
```

App `cart` tự làm **mọi** thứ: phân giải tên `checkout`, chọn instance (LB), tự mở TLS nếu muốn mã hoá, tự retry khi lỗi, tự đặt timeout, tự ghi metric/trace. Toàn bộ logic này **nằm trong code app** (hoặc shared library). Đa ngôn ngữ → mỗi ngôn ngữ một bản.

**(b) Có sidecar:**

```
[app cart] ─local→ [Envoy cart] ══mTLS══▶ [Envoy checkout] ─local→ [app checkout]
   (chỉ gọi          (LB, mTLS,             (verify mTLS,           (chỉ xử lý
    http://checkout)  retry, timeout,        kiểm quyền,             nghiệp vụ)
                      metric, trace)         metric)
```

- **App cart làm:** chỉ một việc — gọi `http://checkout`. Không biết gì về TLS/retry/LB.
- **Envoy cart làm:** LB chọn instance, mở mTLS, retry, timeout, đo metric + trace, định tuyến (canary).
- **Envoy checkout làm:** giải mã mTLS, verify danh tính cart + kiểm quyền, đo metric, chuyển vào app qua localhost.
- **App checkout làm:** chỉ xử lý nghiệp vụ.

Khác biệt cốt lõi: ở (a) network logic **trong app** (lặp, đa ngôn ngữ khó đồng nhất); ở (b) network logic **trong proxy** (config tập trung, đồng nhất mọi ngôn ngữ).

Minh hoạ bằng code: ở (a) caller phải tự viết (giả lược, Go):
```go
// (a) tự lo trong app — lặp ở mọi service, mỗi ngôn ngữ một bản
for attempt := 0; attempt < 3; attempt++ {
    ctx, cancel := context.WithTimeout(ctx, 2*time.Second)
    resp, err := tlsClient.Do(req.WithContext(ctx)) // tự cấu hình TLS
    cancel()
    if err == nil { metrics.Inc("ok"); return resp }   // tự đo metric
    metrics.Inc("retry")
}
```
ở (b) với mesh, đúng caller đó chỉ còn:
```go
// (b) với mesh — retry/timeout/mTLS/metric do Envoy lo, là YAML
resp, _ := http.Get("http://checkout/pay")
```
Mọi `for retry`, `WithTimeout`, `tlsClient`, `metrics.Inc` biến mất khỏi app — chuyển thành VirtualService/PeerAuthentication.

### Lời giải BT2 — Kế hoạch canary 10% → 50% → 100%

Sửa duy nhất **VirtualService** `checkout` (DestinationRule đã có subset v1/v2 sẵn).

**Bước 0 (baseline):** `v1=100, v2=0`. Deploy pod v2 nhưng chưa nhận traffic. Xác nhận v2 healthy (readiness probe pass).

**Bước 1 — 10%:**
```yaml
route:
  - { destination: { host: checkout, subset: v1 }, weight: 90 }
  - { destination: { host: checkout, subset: v2 }, weight: 10 }
```
`kubectl apply`. **Theo dõi (≥ vài phút):** error rate v2 vs v1, p99 latency v2, log lỗi v2. Nếu v2 error rate cao bất thường → **rollback** ngay (về `100/0`).

**Bước 2 — 50%:** đổi `weight` thành `50/50`, apply. Theo dõi lâu hơn để v2 gặp đủ loại traffic (đa dạng request). So sánh trực tiếp v2 vs v1 trên cùng metric.

**Bước 3 — 100%:** đổi thành `0/100`, apply. v2 thành mặc định. Sau khi ổn định, xoá deployment v1.

**Rollback:** ở bất kỳ bước nào, đặt lại `v1=100, v2=0` rồi apply → traffic về v1 **tức thời**, không cần build/redeploy. Đây là điểm mạnh nhất của canary qua mesh: rollback = sửa số.

**Mỗi bước chỉ là một diff nhỏ trên cùng file** — minh hoạ sự khác biệt giữa bước 1 và bước 2:
```diff
   - { destination: { host: checkout, subset: v1 }, weight: 90 }  →  weight: 50
   - { destination: { host: checkout, subset: v2 }, weight: 10 }  →  weight: 50
```
Không build image, không sửa code, không restart pod v1/v2 đang chạy. Istiod nhận YAML mới và đẩy weight mới xuống Envoy của các caller. Request *tiếp theo* đã theo tỷ lệ mới.

**Lưu ý quan trọng:** mỗi bước **bắt buộc** kèm quan sát metric (mục 8) — canary mà không theo dõi chỉ là chia traffic mù. Tiêu chí thường dùng để "lên bước tiếp": error rate v2 ≤ error rate v1, p99 v2 không tệ hơn v1 quá ngưỡng (vd 10%), trong khoảng quan sát đủ dài (vài chục phút tới vài giờ tuỳ lưu lượng).

### Lời giải BT3 — Bắt tay mTLS giữa A và B

1. **Cấp danh tính:** control plane cấp cho A là `spiffe://.../sa/A` + cert ký bởi CA mesh; tương tự cho B.
2. **A (client) mở kết nối tới B (server):**
   - B gửi cert của B. A verify: cert này có do CA của mesh ký không? SPIFFE ID có đúng `B` không? → A xác nhận "đang nói chuyện đúng với B".
   - A gửi cert của A. B verify tương tự → B xác nhận "client đúng là A".
3. **Mutual** = cả **hai** chiều đều verify. TLS web thường chỉ client verify server (1 chiều). Ở đây server **cũng** verify client → không service lạ nào trà trộn được, kể cả khi nó vào được mạng nội bộ.
4. Sau khi cả hai xác thực → thoả thuận khoá phiên → traffic A↔B được mã hoá.
5. Cert tự rotate; A và B không lưu key trong code; app không tham gia bước nào ở trên.

Hệ quả bảo mật: bật `mTLS STRICT` toàn cluster → mọi traffic plaintext bị từ chối → đạt *zero-trust* nội bộ. (`solutions.go` mô phỏng bước 2 trong `mtlsHandshake`: verify cả `server` lẫn `client`.)

**Kịch bản tấn công minh hoạ vì sao "mutual" quan trọng:** giả sử kẻ xấu chiếm được một pod trong cluster (vd qua lỗ hổng app khác) và cố gọi thẳng `payment` để rút tiền. Với TLS 1 chiều, `payment` không kiểm tra danh tính client → pod lạ vẫn gọi được. Với **mTLS**, `payment` (qua Envoy) đòi client trình cert hợp lệ do CA mesh ký với SPIFFE ID đúng. Pod lạ không có cert được CA mesh cấp cho danh tính hợp lệ → bị **từ chối ngay ở tầng kết nối**, chưa kịp chạm logic nghiệp vụ. Kết hợp `AuthorizationPolicy` còn siết tiếp: "chỉ `checkout` được gọi `payment`" → ngay cả service hợp lệ khác cũng không gọi bừa được. (DEMO 5 trong `solutions.go` mô phỏng đúng: client không cert → `mtlsHandshake` trả lỗi "server từ chối client".)

### Lời giải BT4 — Fault injection delay 5s test timeout

Config tiêm delay vào VirtualService của `checkout`:
```yaml
http:
  - fault:
      delay: { percentage: { value: 100 }, fixedDelay: 5s }
    route: [{ destination: { host: checkout } }]
```

**Nếu `cart` đặt timeout 2s:** mỗi request tới `checkout` bị mesh giữ chậm 5s. Vì 5s > 2s, caller `cart` (hoặc Envoy của cart với `timeout: 2s`) **phải cắt ở 2s** và trả lỗi timeout. Kết quả mong đợi: request fail nhanh ở ~2s, **không treo tới 5s**. Đây là dấu hiệu timeout cấu hình đúng → test **pass**.

**Nếu `cart` quên đặt timeout:** request sẽ treo **toàn bộ 5s** (hoặc lâu hơn). Tệ hơn, nếu `cart` đang giữ tài nguyên (connection, goroutine) trong lúc chờ, dưới tải cao điều này gây **cạn tài nguyên** → cascade failure. Fault injection vừa **phơi bày** lỗi này ra *trước* khi sự cố thật xảy ra — đó chính là mục đích của nó.

(`solutions.go` DEMO 3 mô phỏng đúng: tiêm `extraDelay=500ms` > `timeout=200ms` → mọi lần thử timeout.)

### Lời giải BT5 — Library vs mesh cho 3 scenario

**(a) 5 service, all Go, gRPC, team 3 người → LIBRARY.** Ít service + cùng ngôn ngữ (chia sẻ được interceptor) + team nhỏ (không kham nổi vận hành mesh). gRPC interceptor lo retry/timeout/CB/tracing là đủ; mesh chỉ thêm overhead vận hành mà không giải quyết vấn đề nào chưa được giải.

**(b) 30 service, 4 ngôn ngữ, mTLS toàn cluster + trace mọi hop → MESH.** Đa ngôn ngữ → library không dùng chung được (mỗi ngôn ngữ một bản, khó đồng nhất). Yêu cầu mTLS toàn cluster + trace mọi hop là đúng "sở trường" của mesh (zero-code, áp đồng nhất). Số lượng lớn → lợi ích config tập trung rõ rệt. Đây là ca kinh điển nên dùng mesh.

**(c) 12 service, Go + Python, canary thường xuyên, team platform 4 người → MESH.** Đa ngôn ngữ (library khó đồng nhất), số service vượt ngưỡng ~10, nhu cầu canary thường xuyên (traffic management là điểm mạnh mesh), và **có team platform** để vận hành. Đủ điều kiện adopt mesh.

### Lời giải BT6 — Diagnose latency tăng 40→46ms

**Có hợp lý không?** Chuỗi `gateway → orders → inventory` có **2 hop** (gateway→orders, orders→inventory). Với mesh, **mỗi hop** thêm chi phí của **một cặp** Envoy (proxy bên gửi + proxy bên nhận), thường ~1–2ms/hop.

Tính: 2 hop × (1–2ms) = **+2–4ms** mong đợi. Quan sát thật là **+6ms** (40→46). Hơi cao hơn dải lý thuyết 2–4ms — có thể do: tải cao (Envoy queue), mTLS handshake nếu chưa reuse connection, hoặc proxy thiếu CPU.

**Đề xuất xác nhận:**
1. So sánh với baseline **trước** khi bật mesh (nếu chưa đo thì đây là bài học: luôn đo trước).
2. Tách overhead từng hop: bật **Envoy access log** + tracing, xem mỗi hop proxy thêm bao nhiêu ms (`x-envoy-upstream-service-time` vs tổng).
3. Kiểm tra CPU của container Envoy — nếu bị throttle (chạm CPU limit) thì latency proxy phình. Tăng CPU request/limit cho sidecar.
4. Đảm bảo connection được **reuse** (keep-alive) để không bắt tay mTLS lại mỗi request.

**Kết luận:** +6ms phần lớn là overhead sidecar hợp lý cho 2 hop, phần dư có thể do CPU/connection — không phải bug app. Quyết định kinh doanh: 46ms có còn trong SLA không? Nếu có, chấp nhận đánh đổi lấy mTLS + observability. Nếu không, cân nhắc giảm hop, eBPF/ambient mode, hoặc tăng CPU sidecar.

---

## Code & Minh hoạ

- [`solutions.go`](./solutions.go) — mô phỏng **concept** sidecar proxy bằng Go: app → local proxy (lo retry/timeout/circuit breaker/mTLS-mock/weighted routing/fault injection) → backend. Chạy `go run solutions.go` để xem 5 demo (sidecar+mTLS+metric, canary 90/10, fault injection, circuit breaker, mTLS từ chối). *Nhắc lại: thực tế là Envoy + Istiod + YAML, đây chỉ minh hoạ ý tưởng.*
- [`visualization.html`](./visualization.html) — 3 module tương tác: (1) Sidecar architecture + control plane push config; (2) Canary traffic shifting (slider % v1/v2, mô phỏng phân phối request); (3) mTLS handshake giữa 2 sidecar.

---

## Bài tiếp theo

➡ [Lesson 71 — Mini-project: Microservices](../lesson-71-mini-project-microservices/) — ghép kiến thức tier 6 thành một hệ microservice chạy được.

## Liên hệ các bài khác

- **Củng cố [Lesson 52](../lesson-52-rate-limiting-circuit-breaker/):** circuit breaker bạn viết tay ở đó chính là `outlierDetection` trong mesh — cùng ý tưởng, khác cách triển khai (code vs config).
- **Củng cố [Lesson 63](../lesson-63-service-discovery-lb/):** LB và service discovery do data plane mesh đảm nhận.
- **Dùng tiếp ở [Lesson 71](../lesson-71-mini-project-microservices/):** khi ghép mini-project, bạn sẽ quyết định có cần mesh hay library cho hệ của mình — áp dụng đúng bảng quyết định 13.1.

## Tham khảo

- Istio docs — Traffic Management, Security (mTLS), Observability.
- Linkerd docs — Architecture, Automatic mTLS.
- Envoy proxy — kiến trúc data plane.
- SPIFFE/SPIRE — chuẩn danh tính service (SPIFFE ID, cert tự rotate).
- Cilium / Istio Ambient — hướng sidecar-less giảm overhead.
- Prometheus + Grafana + Jaeger — bộ observability hay đi cùng mesh.
- SMI (Service Mesh Interface) — chuẩn API trung lập giữa các mesh.

---

> **Chốt lại một câu.** Service mesh không phải "công nghệ phải có" — nó là một sự đánh đổi: bạn trả bằng latency + RAM + độ phức tạp vận hành để đổi lấy mTLS, observability và traffic management **nhất quán, zero-code, đa ngôn ngữ**. Đáng giá khi hệ đủ lớn và đủ phức tạp; là gánh nặng khi adopt quá sớm.
