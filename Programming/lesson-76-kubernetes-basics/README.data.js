// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Programming/lesson-76-kubernetes-basics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 76 — Kubernetes Basics (cho Go developer)

> Tier 7 — Production / DevOps / SWE
>
> Bài trước: [Lesson 75 — Docker Multi-stage](../lesson-75-docker-multistage/) · Bài tiếp theo: [Lesson 77 — CI/CD Pipeline](../lesson-77-ci-cd-pipeline/)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** cần một bộ điều phối container (container orchestrator) thay vì chạy \`docker run\` thủ công.
- Nắm **kiến trúc** Kubernetes: control plane và worker node làm gì.
- Phân biệt rõ các **đối tượng lõi (core objects)**: Pod, ReplicaSet, Deployment, Service, Ingress, ConfigMap, Secret, Namespace.
- Hiểu **vòng đời Pod (pod lifecycle)** và ba loại **probe** (liveness, readiness, startup) — và biết cách implement endpoint \`/healthz\`, \`/readyz\` trong Go.
- Cấu hình **resource requests & limits**, **rolling update** zero-downtime, **HPA** (Horizontal Pod Autoscaler).
- Viết được **Deployment + Service YAML** hoàn chỉnh cho một Go service.
- Làm **graceful shutdown** đúng chuẩn K8s (SIGTERM → drain → exit) và liên hệ với 12-factor app.
- Tránh được các **lỗi phổ biến** khiến app rớt request hoặc restart loop trong production.

## Kiến thức tiền đề

- [Lesson 51 — Graceful Shutdown](../lesson-51-graceful-shutdown/): cơ chế SIGTERM, \`context\`, drain request. K8s **dựa hoàn toàn** vào cơ chế này.
- [Lesson 75 — Docker Multi-stage](../lesson-75-docker-multistage/): K8s chạy **image** — bạn cần biết build image gọn (distroless/scratch) trước.
- [Lesson 63 — Service Discovery & Load Balancing](../lesson-63-service-discovery-lb/): Service trong K8s chính là service discovery + LB tích hợp sẵn.
- [Lesson 42 — net/http deep](../lesson-42-http-net-deep/): để hiểu HTTP server, handler, timeout.

File code đi kèm: [solutions.go](./solutions.go) — HTTP server "K8s-ready" hoàn chỉnh.
Minh họa tương tác: [visualization.html](./visualization.html).

---

## 1. Vì sao cần Kubernetes?

💡 **Trực giác.** Bạn có một Go service đóng gói thành Docker image. Trên một máy, bạn chạy \`docker run myapp\`. Đẹp. Nhưng giờ:

- Service phải chạy **5 bản sao (replica)** để chịu tải → bạn \`docker run\` 5 lần, nhớ map port, nhớ máy nào.
- Một replica **chết lúc 3 giờ sáng** → ai khởi động lại? Bạn phải tự viết script + cron + alert.
- Black Friday traffic tăng 10× → bạn phải **scale tay** từ 5 lên 50 bản, rải trên 8 máy.
- Deploy phiên bản mới → phải **thay từng bản một** mà không làm gián đoạn (downtime).
- Frontend cần gọi \`myapp\` → địa chỉ IP thay đổi mỗi lần restart, ai cập nhật DNS?

Làm tay 1 service trên 1 máy thì ổn. Làm tay **40 service × hàng trăm bản trên hàng chục máy** thì bất khả thi. **Kubernetes (K8s)** là hệ điều hành cho cụm máy (cluster): bạn khai báo "tôi muốn 5 bản app này luôn chạy", K8s lo phần còn lại.

### 1.1 Năm việc cốt lõi K8s làm cho bạn

| Việc | K8s làm gì | Làm tay thì sao |
|------|-----------|-----------------|
| **Scheduling** | Quyết định bản nào chạy trên máy nào dựa trên tài nguyên còn trống | Bạn tự chọn máy, dễ dồn quá tải một máy |
| **Self-healing** | Bản chết → tự khởi động lại; máy chết → dời bản sang máy khác | Bạn viết cron + healthcheck thủ công |
| **Scaling** | Tăng/giảm số bản bằng 1 lệnh (hoặc tự động theo CPU) | \`docker run\`/\`kill\` từng bản |
| **Rolling update** | Thay phiên bản từng nhóm, giữ luôn có bản phục vụ | Stop hết → start hết = downtime |
| **Service discovery** | Cho mỗi nhóm bản một tên DNS + IP ổn định, tự load-balance | Bạn quản IP động bằng tay |

### 1.2 Mô hình khai báo (declarative) — điểm mấu chốt

K8s không phải "chạy lệnh này". Bạn mô tả **trạng thái mong muốn (desired state)** trong file YAML: *"tôi muốn 3 bản image \`myapp:v2\`"*. K8s liên tục so sánh trạng thái thực tế với mong muốn và **tự điều chỉnh** (reconciliation loop). Bản chết → thực tế còn 2 ≠ mong muốn 3 → K8s tạo thêm 1 bản. Bạn không ra lệnh "tạo bản", bạn chỉ khai báo "tôi muốn 3".

> Đối lập với **imperative** (\`docker run\`, \`docker kill\`): bạn ra lệnh từng bước. Declarative bền hơn vì hệ thống tự sửa khi lệch.

🔁 **Dừng lại tự kiểm tra.**
1. Self-healing khác gì auto-scaling?
2. "Declarative" nghĩa là gì trong K8s?

<details><summary>Đáp án</summary>

1. **Self-healing** = giữ ĐÚNG số bản đã khai (bản chết thì tạo lại cho đủ). **Auto-scaling** = THAY ĐỔI số bản theo tải (CPU cao thì tăng). Self-healing giữ nguyên N; autoscaling thay đổi N.
2. Bạn khai báo trạng thái MONG MUỐN (3 bản v2), K8s tự đưa hệ thống về đúng trạng thái đó và duy trì, thay vì bạn ra lệnh từng bước.
</details>

📝 **Tóm tắt mục 1.** K8s = orchestrator cho container ở quy mô lớn. Năm việc cốt lõi: scheduling, self-healing, scaling, rolling update, service discovery. Triết lý: declarative — khai báo desired state, K8s reconcile.

---

## 2. Kiến trúc Kubernetes

💡 **Trực giác.** Một cluster K8s như một công ty: **control plane** là ban quản lý (ra quyết định, ghi sổ), **worker node** là công nhân (thực sự chạy container). Bạn nói chuyện với ban quản lý qua một cửa duy nhất — API server.

\`\`\`
┌─────────────────── CONTROL PLANE (não bộ) ────────────────────┐
│                                                                │
│   ┌────────────┐   ┌──────┐   ┌───────────┐  ┌──────────────┐ │
│   │ API server │◄─►│ etcd │   │ scheduler │  │  controller  │ │
│   │ (cửa duy   │   │ (sổ  │   │ (xếp pod  │  │   manager    │ │
│   │  nhất)     │   │ cái) │   │ vào node) │  │ (reconcile)  │ │
│   └─────▲──────┘   └──────┘   └───────────┘  └──────────────┘ │
└─────────┼──────────────────────────────────────────────────── ┘
          │ (kubelet trên mỗi node nói chuyện với API server)
   ┌──────┴────────────┐         ┌───────────────────┐
   │   WORKER NODE 1   │         │   WORKER NODE 2    │
   │ ┌──────┐ ┌──────┐ │         │ ┌──────┐ ┌──────┐  │
   │ │kubelet│ │kube- │ │        │ │kubelet│ │kube- │  │
   │ │       │ │proxy │ │        │ │       │ │proxy │  │
   │ └──────┘ └──────┘ │         │ └──────┘ └──────┘  │
   │ [container runtime]│        │ [container runtime] │
   │   Pod  Pod  Pod    │        │    Pod   Pod        │
   └────────────────────┘        └─────────────────────┘
\`\`\`

### 2.1 Control plane — các thành phần

- **API server** — cửa vào DUY NHẤT của cluster. Mọi thứ (\`kubectl\`, các controller, kubelet) đều nói chuyện qua REST API này. Nó xác thực (authn), phân quyền (authz), validate rồi ghi vào etcd.
- **etcd** — cơ sở dữ liệu key-value (sổ cái) lưu TOÀN BỘ trạng thái cluster. Mất etcd = mất cluster state. Đây là single source of truth.
- **scheduler** — khi có Pod mới chưa được gán node, scheduler chọn node phù hợp dựa trên: tài nguyên còn trống (CPU/memory request), affinity, taint/toleration. Nó chỉ *quyết định* node nào, không tự chạy Pod.
- **controller manager** — chạy các vòng lặp reconcile. Ví dụ ReplicaSet controller: "khai 3 bản, thực tế 2 → tạo thêm 1". Mỗi loại đối tượng có một controller giữ cho thực tế = mong muốn.

### 2.2 Worker node — các thành phần

- **kubelet** — agent chạy trên mỗi node. Nhận lệnh "chạy Pod X" từ API server, gọi container runtime để khởi động container, **chạy probe** (liveness/readiness), báo cáo trạng thái về API server.
- **kube-proxy** — quản lý quy tắc mạng (iptables/IPVS) để traffic tới một Service được load-balance xuống đúng các Pod. Đây là phần làm cho \`Service\` hoạt động.
- **container runtime** — phần thực sự chạy container (containerd, CRI-O). Docker Engine cũ không còn là runtime mặc định (dùng containerd bên dưới).

❓ **Câu hỏi tự nhiên của người đọc.**
- *"kubelet chạy probe, vậy probe là gì kubelet gọi?"* → kubelet gọi HTTP/TCP/exec định kỳ tới container; xem mục 5.
- *"Tại sao API server là cửa duy nhất?"* → để tập trung authn/authz/audit, và để etcd chỉ bị ghi từ một nơi (tránh xung đột).
- *"Pod chạy trên control plane được không?"* → mặc định control plane node bị taint để không nhận workload thường; bạn chạy app trên worker node.

📝 **Tóm tắt mục 2.** Control plane (API server + etcd + scheduler + controller manager) ra quyết định và ghi state. Worker node (kubelet + kube-proxy + runtime) thực sự chạy Pod. Mọi giao tiếp qua API server.

---

## 3. Core objects — các đối tượng lõi

### 3.1 Pod — đơn vị nhỏ nhất

💡 **Trực giác.** Pod KHÔNG phải "một container". Pod là một "máy ảo logic" nhỏ chứa **một hoặc nhiều container** dùng chung **network (cùng IP, cùng localhost)** và **storage (volume chia sẻ)**. Thường là 1 container chính + vài "sidecar" (vd proxy, log shipper).

Đặc tính quan trọng: **Pod là ephemeral (phù du)**. Nó có thể bị xóa và tạo lại bất cứ lúc nào (node chết, scale down, rolling update). IP Pod thay đổi mỗi lần tạo lại. **Đừng bao giờ** trỏ trực tiếp vào IP Pod — dùng Service.

\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: go-app
spec:
  containers:
    - name: app
      image: myapp:v1
      ports:
        - containerPort: 8080
\`\`\`

> Bạn hiếm khi tạo Pod trần như trên. Thực tế bạn tạo **Deployment**, nó tạo Pod cho bạn (và tự tạo lại khi chết).

### 3.2 ReplicaSet — giữ N bản

ReplicaSet đảm bảo **luôn có đúng N Pod** chạy. Bản chết → tạo lại. Đây là controller làm việc self-healing số lượng.

💡 Walk-through reconcile: khai \`replicas: 3\`. Một node chết, mất 1 Pod → thực tế 2. ReplicaSet controller thấy \`2 ≠ 3\` → tạo 1 Pod mới trên node còn sống → về lại 3.

Bạn cũng hiếm khi tạo ReplicaSet trực tiếp — **Deployment quản nó**.

### 3.3 Deployment — quản ReplicaSet, rolling update, rollback

💡 **Trực giác.** Deployment là thứ bạn dùng 90% thời gian cho stateless app. Nó quản các ReplicaSet và cho phép **đổi phiên bản mượt mà**:

- Đổi image \`v1 → v2\` → Deployment tạo ReplicaSet mới (v2), tăng dần bản v2, giảm dần bản v1 → rolling update.
- Lỗi v2 → \`kubectl rollout undo\` quay về ReplicaSet v1 (rollback).
- Lưu lịch sử các phiên bản (revision).

Quan hệ: **Deployment → (quản) → ReplicaSet → (quản) → Pod**. Xem module 1 trong visualization.

### 3.4 Service — endpoint ổn định + load balancing

💡 **Trực giác.** Pod đến rồi đi, IP đổi liên tục. Service cho một **tên + IP ảo (ClusterIP) cố định** đại diện cho nhóm Pod (chọn qua label selector), và **tự load-balance** request xuống các Pod sống (chỉ những Pod **ready** — xem mục 5).

Ba loại (type):

| Type | Phơi ra ở đâu | Dùng khi |
|------|----------------|----------|
| **ClusterIP** (mặc định) | Chỉ trong cluster | service-to-service nội bộ |
| **NodePort** | Mở 1 port trên MỌI node (30000-32767) | dev/test, hoặc sau LB ngoài |
| **LoadBalancer** | Cloud LB cấp IP public | phơi service ra internet (trên cloud) |

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: go-app
spec:
  type: ClusterIP
  selector:
    app: go-app        # chọn các Pod có label app=go-app
  ports:
    - port: 80         # port của Service
      targetPort: 8080 # port của container
\`\`\`

### 3.5 Ingress — HTTP routing + TLS termination

Service \`LoadBalancer\` tốn 1 IP/cloud-LB cho mỗi service → đắt. **Ingress** là một lớp HTTP(S) phía trước: một entry point, route theo **host/path** xuống nhiều Service, và **kết thúc TLS (TLS termination)** tại đây.

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web
spec:
  tls:
    - hosts: [api.example.com]
      secretName: api-tls   # cert lấy từ Secret
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /v1
            pathType: Prefix
            backend:
              service:
                name: go-app
                port: { number: 80 }
\`\`\`

> Ingress chỉ là *khai báo*; cần một **Ingress Controller** (nginx, Traefik...) chạy thực tế trong cluster để thực thi.

### 3.6 ConfigMap — config không nhạy cảm

ConfigMap chứa cấu hình dạng key-value **không nhạy cảm** (URL, feature flag, log level). Mount vào Pod dưới dạng **env var** hoặc **file (volume)**.

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: go-app-config
data:
  LOG_LEVEL: "info"
  DB_HOST: "postgres.default.svc.cluster.local"
\`\`\`

### 3.7 Secret — dữ liệu nhạy cảm

Secret giống ConfigMap nhưng dành cho **dữ liệu nhạy cảm** (password, token, key).

⚠ **Lỗi thường gặp.** Secret KHÔNG được **mã hóa (encrypt)** mặc định — nó chỉ **base64-encode** (ai cũng decode được). Mặc định nó lưu trong etcd dạng plaintext. Để an toàn thật: bật **encryption at rest** cho etcd, dùng RBAC chặt, hoặc dùng external secret manager (Vault, cloud KMS). **Đừng tưởng base64 = bảo mật.**

\`\`\`yaml
apiVersion: v1
kind: Secret
metadata:
  name: go-app-secret
type: Opaque
data:
  DB_PASSWORD: c3VwZXJzZWNyZXQ=   # "supersecret" đã base64 (KHÔNG phải mã hóa)
\`\`\`

### 3.8 Namespace — cô lập logic

Namespace chia cluster thành các "ngăn" logic: \`dev\`, \`staging\`, \`prod\`, hoặc theo team. Đối tượng trong namespace khác nhau có thể trùng tên. Quota, RBAC, network policy thường gắn theo namespace.

❓ **Câu hỏi tự nhiên.**
- *"ConfigMap khác env trong Dockerfile?"* → ConfigMap tách config khỏi image: đổi config không cần build lại image (12-factor).
- *"Secret base64 thì có ích gì?"* → base64 chỉ để chứa binary an toàn trong YAML, KHÔNG để bảo mật. Bảo mật đến từ RBAC + encryption at rest.
- *"Namespace có chặn network không?"* → mặc định KHÔNG; cần NetworkPolicy mới chặn traffic giữa namespace.

🔁 **Dừng lại tự kiểm tra.**
1. Vì sao không trỏ trực tiếp vào IP Pod?
2. Khác biệt cốt lõi ConfigMap vs Secret là gì?

<details><summary>Đáp án</summary>

1. Pod ephemeral, IP đổi mỗi lần tạo lại. Service cho IP/tên ổn định và load-balance qua các Pod ready.
2. Mục đích: ConfigMap cho config thường, Secret cho dữ liệu nhạy cảm. Nhưng Secret chỉ base64, KHÔNG encrypt mặc định — khác biệt thật nằm ở RBAC/audit/encryption-at-rest, không phải ở "an toàn sẵn".
</details>

📝 **Tóm tắt mục 3.** Pod (ephemeral, 1+ container chung network/storage) ← ReplicaSet (giữ N bản) ← Deployment (rolling update/rollback). Service = endpoint ổn định + LB. Ingress = HTTP routing/TLS. ConfigMap (config thường), Secret (nhạy cảm, chỉ base64). Namespace = cô lập logic.

---

## 4. Vòng đời Pod (Pod lifecycle)

Pod đi qua các **phase**:

\`\`\`
 Pending ──► Running ──► Succeeded   (container chạy xong, exit 0 — dùng cho Job)
    │           │
    │           └──────► Failed      (container exit != 0 và không restart nữa)
    │
    └─► (chờ schedule + pull image + start container)
\`\`\`

- **Pending** — đã nhận nhưng container chưa chạy (đang chờ schedule, pull image, mount volume).
- **Running** — ít nhất một container đang chạy.
- **Succeeded** — mọi container đã thoát với code 0 (thường là Job/batch, không phải web server).
- **Failed** — mọi container đã thoát, ít nhất một code != 0 và không restart nữa.

### 4.1 Restart policy

\`restartPolicy\` (đặt ở cấp Pod spec): \`Always\` (mặc định cho Deployment — luôn restart container chết), \`OnFailure\` (chỉ restart khi exit != 0), \`Never\`. Lưu ý: đây là restart **container TRONG cùng Pod**, không phải tạo Pod mới.

⚠ **CrashLoopBackOff** — không phải một phase mà là trạng thái container: container chết → restart → chết lại nhanh → kubelet tăng dần thời gian chờ giữa các lần restart (10s, 20s, 40s... tối đa 5 phút). Thấy \`CrashLoopBackOff\` = app chết ngay khi khởi động (config sai, panic, thiếu env).

📝 **Tóm tắt mục 4.** Phase: Pending → Running → Succeeded/Failed. restartPolicy điều khiển restart container trong Pod. CrashLoopBackOff = chết-restart liên tục với backoff tăng dần.

---

## 5. Probes — liveness, readiness, startup

💡 **Trực giác.** kubelet không "đoán" app khỏe hay không — nó **hỏi** app định kỳ qua probe. Ba câu hỏi khác nhau:

| Probe | Câu hỏi | Fail thì K8s làm gì |
|-------|---------|---------------------|
| **liveness** | "Mày còn sống không?" | **RESTART** container |
| **readiness** | "Mày sẵn sàng nhận traffic chưa?" | **GỠ** Pod khỏi Service endpoints (KHÔNG restart) |
| **startup** | "Mày khởi động xong chưa?" | Hoãn liveness/readiness; quá hạn thì restart |

Đây là phân biệt **quan trọng nhất** của bài này.

### 5.1 Liveness probe

Hỏi "process còn sống không". Fail liên tục (\`failureThreshold\` lần) → kubelet **restart** container. Dùng để chữa deadlock/treo mà restart cứu được.

⚠ **Lỗi chí mạng:** đừng kiểm tra dependency ngoài (DB, cache) trong liveness. Nếu DB sập, liveness fail → K8s restart app → app mới vẫn không kết nối được DB → restart lại → **cascading restart toàn bộ fleet**. Liveness chỉ kiểm tra *bản thân process*.

### 5.2 Readiness probe

Hỏi "sẵn sàng nhận traffic chưa". Fail → kube-proxy **gỡ Pod khỏi danh sách endpoint của Service** (traffic ngừng tới Pod đó) nhưng **KHÔNG restart**. Dùng cho: đang warm-up, hoặc dependency tạm không sẵn (gỡ tạm, không cần restart), hoặc đang shutdown (lật ready=false).

### 5.3 Startup probe

Cho app **khởi động chậm** (load model lớn, migrate DB...). Khi có startup probe, liveness/readiness **chưa chạy** cho tới khi startup pass. Tránh: liveness giết app trong lúc nó còn đang warm-up bình thường.

### 5.4 Implement trong Go

Hai endpoint thật trong [solutions.go](./solutions.go):

\`\`\`go
// liveness: chỉ kiểm tra process — KHÔNG ping DB
mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
    if health.IsLive() {
        w.WriteHeader(http.StatusOK)        // 200 → sống
        return
    }
    w.WriteHeader(http.StatusServiceUnavailable) // 503 → kubelet sẽ restart
})

// readiness: warm-up xong + dependency ok; lật false khi shutdown
mux.HandleFunc("/readyz", func(w http.ResponseWriter, r *http.Request) {
    if health.IsReady() {
        w.WriteHeader(http.StatusOK)        // 200 → nhận traffic
        return
    }
    w.WriteHeader(http.StatusServiceUnavailable) // 503 → gỡ khỏi LB
})
\`\`\`

YAML khai báo probe (xem mục 7 cho bản đầy đủ):

\`\`\`yaml
livenessProbe:
  httpGet: { path: /healthz, port: 8080 }
  initialDelaySeconds: 5
  periodSeconds: 10
  failureThreshold: 3       # 3 lần fail liên tiếp → restart
readinessProbe:
  httpGet: { path: /readyz, port: 8080 }
  periodSeconds: 5
  failureThreshold: 3
startupProbe:
  httpGet: { path: /healthz, port: 8080 }
  failureThreshold: 30      # cho phép tới 30×periodSeconds để khởi động
  periodSeconds: 10
\`\`\`

❓ **Câu hỏi tự nhiên.**
- *"liveness và readiness gọi cùng /healthz được không?"* → được nhưng KHÔNG nên: chúng phải kiểm tra thứ khác nhau. Liveness = chỉ process; readiness = process + dependency.
- *"failureThreshold=3, periodSeconds=10 → mất bao lâu mới restart?"* → tới ~30s sau khi bắt đầu fail (3 lần × 10s).
- *"timeout probe mặc định?"* → \`timeoutSeconds: 1\`. App tải nặng có thể quá 1s → probe timeout → fail oan → restart. Đặt timeout hợp lý.

🔁 **Dừng lại tự kiểm tra.**
1. DB sập, bạn muốn Pod bị gỡ khỏi LB nhưng KHÔNG restart. Dùng probe nào, ở endpoint nào kiểm tra DB?
2. App khởi động mất 90s. Không có startup probe, liveness \`initialDelaySeconds:5, period:10, threshold:3\` thì sao?

<details><summary>Đáp án</summary>

1. **readiness** probe; kiểm tra DB trong \`/readyz\`. Fail → gỡ khỏi endpoints, không restart. (Liveness KHÔNG được ping DB.)
2. Liveness bắt đầu sau 5s, fail 3 lần (~35s) khi app còn đang khởi động → bị **restart oan** → CrashLoopBackOff. Cần **startup probe** với \`failureThreshold\` đủ lớn bao trùm 90s.
</details>

📝 **Tóm tắt mục 5.** liveness (fail → restart, chỉ kiểm process), readiness (fail → gỡ khỏi LB, kiểm cả dependency), startup (bảo vệ giai đoạn khởi động chậm). Trong Go: \`/healthz\` + \`/readyz\` trả 200/503.

---

## 6. Resource requests & limits

💡 **Trực giác.** Mỗi container khai báo nó **cần** bao nhiêu (request) và **tối đa** được dùng bao nhiêu (limit) CPU/memory.

- **request** — lượng tài nguyên scheduler *bảo đảm dành sẵn* khi xếp Pod vào node. Node phải còn đủ request mới nhận Pod. Đây là cơ sở để **schedule**.
- **limit** — trần cứng. Vượt → với **CPU**: bị **throttle** (chậm lại, không bị giết); với **memory**: bị **OOMKilled** (kernel giết container).

\`\`\`yaml
resources:
  requests:
    cpu: "250m"        # 250 milli-CPU = 0.25 core — scheduler dành sẵn
    memory: "128Mi"
  limits:
    cpu: "500m"        # tối đa 0.5 core (vượt → throttle)
    memory: "256Mi"    # tối đa 256Mi (vượt → OOMKilled)
\`\`\`

> \`m\` = milli-core: \`1000m\` = 1 CPU core. \`Mi\` = mebibyte (1024²), \`M\` = megabyte (10⁶).

### 6.1 QoS class

K8s gán mỗi Pod một QoS class dựa trên request/limit, ảnh hưởng thứ tự bị "evict" khi node thiếu RAM:

- **Guaranteed** — request == limit cho mọi container. Bị evict cuối cùng.
- **Burstable** — có request < limit. Trung gian.
- **BestEffort** — không khai gì. Bị evict trước tiên.

⚠ **Lỗi thường gặp: không đặt limit.** Một Pod "noisy neighbor" có thể ngốn hết RAM node, làm OOM cả các Pod khác trên cùng node. Luôn đặt ít nhất \`requests\` (để schedule công bằng) và \`limits\` memory (để chặn OOM lan rộng).

📝 **Tóm tắt mục 6.** request = bảo đảm + cơ sở schedule. limit = trần (CPU throttle, memory OOMKill). QoS: Guaranteed > Burstable > BestEffort về độ ưu tiên giữ lại.

---

## 7. Deployment YAML đầy đủ cho Go service

Ráp hết lại: Deployment có 3 replica, probe, resource, config từ ConfigMap/Secret, graceful shutdown.

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: go-app
  labels: { app: go-app }
spec:
  replicas: 3
  selector:
    matchLabels: { app: go-app }
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1          # tối đa thêm 1 Pod trên mức mong muốn lúc update
      maxUnavailable: 0    # KHÔNG cho phép thiếu Pod → zero-downtime
  template:
    metadata:
      labels: { app: go-app }
    spec:
      terminationGracePeriodSeconds: 30   # cho 30s để graceful shutdown
      containers:
        - name: app
          image: myregistry/go-app:v2
          ports:
            - containerPort: 8080
          envFrom:
            - configMapRef: { name: go-app-config }   # nạp toàn bộ ConfigMap thành env
          env:
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef: { name: go-app-secret, key: DB_PASSWORD }
            - name: SHUTDOWN_GRACE
              value: "25s"
          resources:
            requests: { cpu: "250m", memory: "128Mi" }
            limits:   { cpu: "500m", memory: "256Mi" }
          livenessProbe:
            httpGet: { path: /healthz, port: 8080 }
            initialDelaySeconds: 5
            periodSeconds: 10
            failureThreshold: 3
          readinessProbe:
            httpGet: { path: /readyz, port: 8080 }
            periodSeconds: 5
            failureThreshold: 3
          lifecycle:
            preStop:
              exec:
                command: ["sleep", "5"]   # cho LB kịp gỡ endpoint trước khi SIGTERM
---
apiVersion: v1
kind: Service
metadata:
  name: go-app
spec:
  selector: { app: go-app }
  ports:
    - port: 80
      targetPort: 8080
\`\`\`

---

## 8. Rolling update — zero-downtime

💡 **Trực giác.** Thay v1 → v2 mà không gián đoạn: K8s tạo bản v2, đợi nó **ready**, rồi mới gỡ một bản v1. Lặp cho tới khi hết v1.

Hai tham số điều khiển (trong \`strategy.rollingUpdate\`):

- **maxSurge** — số Pod được tạo VƯỢT mức mong muốn trong lúc update (vd \`1\` hoặc \`25%\`). Cao hơn → update nhanh hơn nhưng tốn tài nguyên hơn.
- **maxUnavailable** — số Pod được phép THIẾU so với mong muốn. Đặt **\`0\`** để luôn đủ Pod phục vụ → zero-downtime.

Walk-through với \`replicas: 3, maxSurge: 1, maxUnavailable: 0\`:

| Bước | v1 | v2 | tổng | ready phục vụ |
|------|----|----|------|---------------|
| đầu | 3 | 0 | 3 | 3 v1 |
| tạo 1 v2 (surge) | 3 | 1 | 4 | 3 v1 (v2 chưa ready) |
| v2#1 ready → gỡ 1 v1 | 2 | 1 | 3 | 2v1 + 1v2 |
| ... lặp ... | 1 | 2 | 3 | 1v1 + 2v2 |
| xong | 0 | 3 | 3 | 3 v2 |

Vì \`maxUnavailable: 0\`, **luôn có ≥ 3 Pod ready** suốt quá trình → không downtime. **readiness probe là điều kiện sống còn**: K8s chỉ chuyển traffic sang v2 khi v2 báo ready.

### 8.1 Rollback

Lỗi v2? Quay lại nhanh:

\`\`\`bash
kubectl rollout undo deployment/go-app            # về revision trước
kubectl rollout undo deployment/go-app --to-revision=3
kubectl rollout status deployment/go-app          # theo dõi tiến trình
kubectl rollout history deployment/go-app         # xem lịch sử revision
\`\`\`

⚠ **Lỗi thường gặp.** Không có readiness probe → K8s coi Pod "ready" ngay khi container start (chưa kịp warm-up) → chuyển traffic vào Pod chưa sẵn sàng → rớt request giữa rolling update. Zero-downtime PHẢI có readiness probe đúng.

📝 **Tóm tắt mục 8.** Rolling update dùng maxSurge/maxUnavailable. \`maxUnavailable: 0\` + readiness probe = zero-downtime. Rollback bằng \`kubectl rollout undo\`.

---

## 9. HPA — Horizontal Pod Autoscaler

💡 **Trực giác.** HPA tự **tăng/giảm số replica** của Deployment theo metric (thường CPU). Tải cao → thêm Pod; tải thấp → bớt Pod (trong khoảng min–max bạn đặt).

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: go-app
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: go-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70   # giữ CPU trung bình quanh 70% so với REQUEST
\`\`\`

Công thức cốt lõi:

\`\`\`
desiredReplicas = ceil( currentReplicas × (currentMetric / targetMetric) )
\`\`\`

💡 Walk-through: đang 4 Pod, CPU trung bình 140% (so với request), target 70%:
\`ceil(4 × 140/70) = ceil(8) = 8\` Pod. Nếu sau đó CPU về 35%: \`ceil(8 × 35/70) = 4\` Pod.

⚠ **Lưu ý.** \`averageUtilization: 70\` tính theo **request** CPU, không phải limit. Nếu không đặt \`requests.cpu\`, HPA theo CPU **không hoạt động** (không có mẫu số). HPA cần **metrics-server** (hoặc custom metrics adapter) cài trong cluster.

❓ **Câu hỏi tự nhiên.**
- *"HPA khác replicas cố định?"* → replicas cố định = số bản đứng yên; HPA thay đổi số bản theo tải trong [min,max].
- *"HPA và VPA?"* → HPA scale **ngang** (thêm Pod); VPA scale **dọc** (tăng request/limit của Pod). Bài này nói HPA.
- *"scale lên/xuống có giật không?"* → có **stabilization window** + behavior policy để tránh "flapping" (scale lên xuống liên tục).

📝 **Tóm tắt mục 9.** HPA scale số replica theo metric (CPU/memory/custom) trong [min,max]. \`desired = ceil(current × metric/target)\`. Cần requests.cpu + metrics-server.

---

## 10. ConfigMap & Secret — mount as env hoặc volume

Hai cách đưa config vào Pod:

**Cách 1 — env var** (tiện cho config nhỏ, 12-factor):

\`\`\`yaml
envFrom:
  - configMapRef: { name: go-app-config }   # toàn bộ key → env
env:
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef: { name: go-app-secret, key: DB_PASSWORD }
\`\`\`

Trong Go đọc bằng \`os.Getenv("DB_HOST")\` — đúng cách [solutions.go](./solutions.go) làm.

**Cách 2 — volume (file)** (cho config lớn, file cert, cần hot-reload):

\`\`\`yaml
volumes:
  - name: cfg
    configMap: { name: go-app-config }
containers:
  - name: app
    volumeMounts:
      - name: cfg
        mountPath: /etc/config        # mỗi key thành 1 file trong thư mục này
\`\`\`

⚠ **Khác biệt env vs volume khi update:** đổi ConfigMap → file (volume) **tự cập nhật** sau ít phút; env var **KHÔNG** cập nhật cho Pod đang chạy (phải restart Pod). Nếu cần hot-reload không restart → dùng volume + watch file.

📝 **Tóm tắt mục 10.** ConfigMap/Secret mount as env (đơn giản, không hot-reload) hoặc volume (file, có hot-reload). Secret nên ưu tiên volume + RBAC chặt.

---

## 11. Service discovery — DNS trong cluster

💡 **Trực giác.** Mỗi Service có một bản ghi DNS. Pod khác chỉ cần gọi **tên Service**, không cần biết IP:

\`\`\`
<service>.<namespace>.svc.cluster.local
\`\`\`

Ví dụ: service \`go-app\` trong namespace \`default\` → \`go-app.default.svc.cluster.local\`. Trong cùng namespace, gọi tắt \`http://go-app\`. Khác namespace: \`http://go-app.prod\`.

CoreDNS (DNS server của cluster) phân giải tên này thành ClusterIP của Service; kube-proxy load-balance xuống các Pod ready. Liên hệ [Lesson 63 — Service Discovery](../lesson-63-service-discovery-lb/): K8s tích hợp sẵn cơ chế này, bạn không tự dựng Consul/etcd discovery.

\`\`\`go
// Trong Go, chỉ cần dùng tên DNS — không hardcode IP
resp, _ := http.Get("http://go-app.default.svc.cluster.local/api")
\`\`\`

📝 **Tóm tắt mục 11.** DNS \`service.namespace.svc.cluster.local\`. Gọi qua tên, CoreDNS + kube-proxy lo phân giải + load balance. Đây là service discovery built-in.

---

## 12. kubectl essentials

\`\`\`bash
kubectl apply -f deploy.yaml          # tạo/cập nhật từ YAML (declarative)
kubectl get pods                      # liệt kê Pod (-o wide / -w để watch)
kubectl get deploy,svc,hpa            # nhiều loại cùng lúc
kubectl describe pod go-app-xxxx      # chi tiết + EVENTS (vàng cho debug)
kubectl logs go-app-xxxx              # log container (-f follow, --previous: container trước khi crash)
kubectl exec -it go-app-xxxx -- sh    # vào shell trong container
kubectl rollout status deploy/go-app  # theo dõi rolling update
kubectl rollout undo  deploy/go-app   # rollback
kubectl scale deploy/go-app --replicas=5
kubectl port-forward svc/go-app 8080:80  # forward port về máy local để test
\`\`\`

💡 **Mẹo debug:** \`kubectl describe pod\` phần **Events** ở cuối thường cho biết ngay vì sao Pod kẹt (ImagePullBackOff, OOMKilled, probe failed, không schedule được do thiếu CPU). \`kubectl logs --previous\` xem log của container vừa crash trong CrashLoopBackOff.

---

## 13. Graceful shutdown trong K8s

💡 **Trực giác.** Khi K8s xóa Pod (scale down, rolling update, node drain), nó **không giết ngay**. Trình tự:

\`\`\`
1. Pod bị đánh dấu Terminating → bị GỠ khỏi Service endpoints (song song).
2. K8s chạy preStop hook (nếu có) — vd sleep vài giây cho LB kịp gỡ.
3. K8s gửi SIGTERM tới process chính (PID 1) trong container.
4. App phải: ngừng nhận request mới, drain request đang chạy, đóng kết nối.
5. Chờ tối đa terminationGracePeriodSeconds (mặc định 30s).
6. Hết hạn mà process chưa thoát → SIGKILL (giết cứng, mất request đang dở).
\`\`\`

Liên hệ [Lesson 51 — Graceful Shutdown](../lesson-51-graceful-shutdown/): chính là cơ chế \`signal.NotifyContext\` + \`srv.Shutdown(ctx)\` đã học. K8s chỉ là phía gửi SIGTERM.

### 13.1 Vì sao cần preStop hook + lật readiness=false

Có một **race**: việc gỡ Pod khỏi endpoints và việc gửi SIGTERM xảy ra **gần như đồng thời**. Nếu app đóng ngay khi nhận SIGTERM, request **vừa được route tới** (trước khi endpoint propagate xong) sẽ bị rớt.

Cách chuẩn (xem \`gracefulShutdown\` trong [solutions.go](./solutions.go)):

1. Nhận SIGTERM → **lật \`/readyz\` về 503** ngay → bị gỡ khỏi endpoints.
2. **Chờ một nhịp ngắn** (preStop \`sleep 5\` hoặc sleep trong code) để kube-proxy mọi node cập nhật xong.
3. Mới gọi \`srv.Shutdown(ctx)\` để drain.

\`\`\`go
func gracefulShutdown(srv *http.Server, health *HealthState, grace time.Duration) {
    health.SetReady(false)          // 1. 503 → bị gỡ khỏi endpoints
    time.Sleep(propagation)         // 2. chờ kube-proxy cập nhật (giống preStop sleep)
    ctx, cancel := context.WithTimeout(context.Background(), grace)
    defer cancel()
    srv.Shutdown(ctx)               // 3. drain request đang chạy trong grace
}
\`\`\`

⚠ Đặt \`SHUTDOWN_GRACE\` trong app **nhỏ hơn** \`terminationGracePeriodSeconds\` (vd app 25s, K8s 30s) để app kịp thoát sạch trước khi bị SIGKILL.

📝 **Tóm tắt mục 13.** SIGTERM → preStop → drain → (hết grace) SIGKILL. App phải: lật readiness=false, chờ endpoint propagate, rồi drain. \`SHUTDOWN_GRACE < terminationGracePeriodSeconds\`.

---

## 14. 12-factor app trong bối cảnh K8s

[12-factor](https://12factor.net) là tập nguyên tắc cho app cloud-native. Bốn cái quan trọng nhất với K8s:

| Factor | Nghĩa | Trong K8s / Go |
|--------|-------|----------------|
| **III. Config** | Config trong **env**, không trong code | ConfigMap/Secret → env; Go đọc \`os.Getenv\` |
| **VI. Processes** | **Stateless**, không lưu state local | State đẩy ra DB/Redis; Pod ephemeral nên không giữ session local |
| **XI. Logs** | Log ra **stdout/stderr**, coi như stream | Đừng ghi file; K8s thu log từ stdout (xem [Lesson 72](../lesson-72-structured-logging/)) |
| **IX. Disposability** | Khởi động nhanh, **shutdown êm** (SIGTERM) | Graceful shutdown ở mục 13; startup probe cho warm-up |

[solutions.go](./solutions.go) tuân thủ cả bốn: config từ env, không state local, log stdout, graceful shutdown.

⚠ **Lỗi 12-factor thường gặp:** lưu session/file upload vào ổ đĩa local của Pod. Pod chết → mất sạch. Phải đẩy ra storage ngoài (S3, DB).

📝 **Tóm tắt mục 14.** Config qua env, stateless, log stdout, disposable. Đây là điều kiện để app chạy tốt trên K8s — không phải tùy chọn.

---

## 15. Các lỗi phổ biến (pitfalls)

| Lỗi | Hậu quả | Cách tránh |
|-----|---------|-----------|
| **Không đặt resource limit** | Noisy neighbor ngốn RAM → OOM cả node | Luôn đặt \`requests\` + \`limits\` (ít nhất memory limit) |
| **Không có readiness probe** | Traffic tới Pod chưa warm-up → rớt request, vỡ rolling update | Thêm \`/readyz\`, kiểm warm-up + dependency |
| **Không graceful shutdown** | SIGTERM → đóng ngay → drop request đang chạy | Lật ready=false + drain (mục 13) |
| **Secret để trong ConfigMap** | Lộ password (ConfigMap không có cơ chế bảo vệ) | Dùng Secret + RBAC + encryption at rest |
| **Liveness quá nhạy** (timeout 1s, threshold 1) | App tải nặng chậm 1 nhịp → bị restart oan → CrashLoopBackOff | Nới \`timeoutSeconds\`, \`failureThreshold\`; dùng startup probe |
| **Liveness ping DB** | DB chậm → liveness timeout → restart toàn fleet (cascading) | Liveness chỉ kiểm process; dependency để readiness |

💡 **Câu chuyện cascading restart:** Service A có \`livenessProbe\` gọi \`/healthz\` mà \`/healthz\` lại query DB. Một spike latency làm DB phản hồi > 1s (timeout probe). Liveness fail → kubelet restart A. App mới khởi động lại query DB (vẫn chậm) → fail tiếp → CrashLoop. Đồng thời, các bản A khác cũng timeout → restart đồng loạt → mất hết capacity → DB còn chậm hơn → **vòng xoáy chết**. Bài học: **liveness tuyệt đối không chạm dependency ngoài.**

---

## 16. Ứng dụng thực tế trong phần mềm

> 💡 **Kubernetes tự động hóa deploy/scale/self-heal — nhưng phức tạp khổng lồ. Phần lớn app nhỏ KHÔNG cần K8s; biết để dùng đúng lúc.**

| K8s lo việc gì | Thay cho thủ công |
|----------------|-------------------|
| **Self-healing** | Pod chết → tự restart; node chết → reschedule |
| **Rolling deploy** | Cập nhật không downtime (cần [graceful shutdown](../lesson-51-graceful-shutdown/) + probe) |
| **Autoscaling (HPA)** | Tự tăng/giảm replica theo CPU/metric |
| **Service discovery + LB** | DNS nội bộ + route tới pod khỏe ([nối](../lesson-63-service-discovery-lb/)) |
| **Config/Secret** | Tách config khỏi image ([nối config](../lesson-78-config-management/)) |

### 16.1. Ví dụ cụ thể — probe + resource limit là sống còn

App Go trên K8s **bắt buộc** khai báo: (1) **readiness probe** — K8s chỉ gửi traffic khi pod sẵn sàng (chưa kết nối DB xong → chưa nhận request); (2) **liveness probe** — pod treo → K8s restart; (3) **resource requests/limits** — K8s biết xếp pod vào node nào, và OOM-kill nếu vượt limit. Thiếu probe → traffic tới pod chưa sẵn sàng → lỗi; thiếu resource limit → một pod ngốn hết RAM node làm chết pod khác. Kèm graceful shutdown (xử lý SIGTERM) → rolling deploy zero-downtime. Đây là "K8s-ready service" thật.

> ⚠ **"Bạn có thực sự cần K8s?" — over-engineering phổ biến nhất 2020s.** K8s thêm: cụm để vận hành, YAML phức tạp, learning curve dốc, nhiều thứ debug. Cho app nhỏ/startup giai đoạn đầu → **PaaS** (Railway, Render, Fly.io, Cloud Run) hoặc VM + Docker Compose đơn giản hơn nhiều, vẫn auto-deploy/scale cơ bản. K8s đáng khi: nhiều service, cần autoscale phức tạp, team có kỹ năng ops, multi-cloud. Đừng chọn K8s vì "công ty lớn dùng" — họ có cả team platform.

### 16.2. 📝 Tóm tắt mục 16

- K8s tự động hóa: **self-heal, rolling deploy, autoscale, service discovery, config/secret**.
- "K8s-ready service": **readiness + liveness probe** + **resource limits** + **graceful shutdown** — thiếu là lỗi/OOM.
- Đừng over-engineer: app nhỏ → PaaS (Cloud Run/Fly/Render); K8s khi nhiều service + có team ops.

## Bài tập

> Lời giải đầy đủ ở mục **Lời giải chi tiết** bên dưới. Tự làm trước khi xem.

**BT1.** Viết Deployment (3 replica) + Service (ClusterIP) YAML cho Go service \`myapp:v1\`, container port 8080, expose qua Service port 80.

**BT2.** Implement endpoint \`/healthz\` (liveness) và \`/readyz\` (readiness) trong Go. \`/readyz\` phải trả 503 khi app đang shutdown.

**BT3.** Tạo ConfigMap (\`LOG_LEVEL\`, \`DB_HOST\`) + Secret (\`DB_PASSWORD\`), mount cả hai thành env var vào container.

**BT4.** Viết \`strategy\` cho rolling update **zero-downtime** (3 replica) và giải thích vì sao chọn các giá trị đó.

**BT5.** Viết HPA scale Deployment \`myapp\` từ **2 → 10** Pod khi CPU trung bình vượt **70%**. Tính \`desiredReplicas\` khi đang 3 Pod, CPU đo được 90%.

**BT6.** Debug: một Pod liên tục \`CrashLoopBackOff\`. \`kubectl logs --previous\` cho thấy app khởi động bình thường rồi bị giết sau ~8 giây. Liveness probe: \`initialDelaySeconds: 0, periodSeconds: 2, timeoutSeconds: 1, failureThreshold: 3\`, app mất ~10s để warm-up. Phân tích nguyên nhân và sửa.

---

## Lời giải chi tiết

### Lời giải BT1

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels: { app: myapp }
spec:
  replicas: 3
  selector:
    matchLabels: { app: myapp }
  template:
    metadata:
      labels: { app: myapp }     # PHẢI khớp selector ở trên
    spec:
      containers:
        - name: app
          image: myapp:v1
          ports:
            - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  type: ClusterIP                # mặc định, có thể bỏ
  selector: { app: myapp }       # khớp label Pod → Service chọn các Pod này
  ports:
    - port: 80                   # client gọi qua port 80 của Service
      targetPort: 8080           # forward xuống port 8080 của container
\`\`\`

**Giải thích:** mấu chốt là \`selector\` của Service phải khớp \`labels\` của Pod template. \`port\` (Service) và \`targetPort\` (container) có thể khác nhau. Apply: \`kubectl apply -f bt1.yaml\`. Kiểm tra \`kubectl get endpoints myapp\` → phải thấy 3 IP Pod.

### Lời giải BT2

\`\`\`go
package main

import (
    "net/http"
    "sync/atomic"
)

var ready atomic.Bool // false ban đầu, true sau warm-up, false khi shutdown

func main() {
    ready.Store(true) // giả sử warm-up xong

    http.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
        // liveness: chỉ kiểm process còn chạy — luôn 200 nếu chưa treo
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("ok"))
    })

    http.HandleFunc("/readyz", func(w http.ResponseWriter, r *http.Request) {
        if ready.Load() {
            w.WriteHeader(http.StatusOK) // 200 → nhận traffic
            return
        }
        w.WriteHeader(http.StatusServiceUnavailable) // 503 → gỡ khỏi LB khi shutdown
    })

    http.ListenAndServe(":8080", nil)
}
\`\`\`

**Giải thích:** dùng \`atomic.Bool\` để handler (chạy concurrent) đọc/ghi cờ an toàn. Khi nhận SIGTERM, gọi \`ready.Store(false)\` → \`/readyz\` trả 503 → K8s gỡ Pod khỏi endpoints, KHÔNG restart (vì \`/healthz\` vẫn 200). Bản đầy đủ với graceful shutdown ở [solutions.go](./solutions.go).

### Lời giải BT3

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata: { name: myapp-config }
data:
  LOG_LEVEL: "info"
  DB_HOST: "postgres.default.svc.cluster.local"
---
apiVersion: v1
kind: Secret
metadata: { name: myapp-secret }
type: Opaque
data:
  DB_PASSWORD: c3VwZXJzZWNyZXQ=   # echo -n 'supersecret' | base64
---
# trong Deployment, phần container:
        env:
          - name: LOG_LEVEL
            valueFrom:
              configMapKeyRef: { name: myapp-config, key: LOG_LEVEL }
          - name: DB_HOST
            valueFrom:
              configMapKeyRef: { name: myapp-config, key: DB_HOST }
          - name: DB_PASSWORD
            valueFrom:
              secretKeyRef: { name: myapp-secret, key: DB_PASSWORD }
\`\`\`

**Giải thích:** mỗi key map thành một env var qua \`configMapKeyRef\`/\`secretKeyRef\`. Gọn hơn dùng \`envFrom: [{ configMapRef: {name: myapp-config} }]\` để nạp TẤT CẢ key thành env một lần. Go đọc bằng \`os.Getenv("DB_HOST")\`. Tạo Secret bằng lệnh: \`kubectl create secret generic myapp-secret --from-literal=DB_PASSWORD=supersecret\` (tự base64).

### Lời giải BT4

\`\`\`yaml
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1          # cho tạo thêm tối đa 1 Pod (tạm 4 Pod) → update nhanh
      maxUnavailable: 0    # KHÔNG cho thiếu Pod → luôn ≥ 3 ready → zero-downtime
\`\`\`

**Giải thích:** \`maxUnavailable: 0\` đảm bảo trong suốt update **luôn có đủ 3 Pod ready** — không bao giờ tụt xuống dưới mức phục vụ → không downtime. \`maxSurge: 1\` cho phép tạm tăng lên 4 Pod (1 v2 mới + 3 v1 cũ) để có chỗ rotate. **Điều kiện bắt buộc đi kèm:** phải có **readiness probe** đúng, vì K8s chỉ gỡ Pod v1 sau khi Pod v2 báo ready — không có readiness thì v2 bị coi ready ngay khi start (chưa warm-up) → rớt request.

### Lời giải BT5

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata: { name: myapp }
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
\`\`\`

**Tính \`desiredReplicas\`** khi đang 3 Pod, CPU đo 90%, target 70%:

\`\`\`
desired = ceil( current × (currentMetric / targetMetric) )
        = ceil( 3 × (90 / 70) )
        = ceil( 3 × 1.2857 )
        = ceil( 3.857 )
        = 4 Pod
\`\`\`

Vậy HPA scale từ 3 → 4 Pod. (Nằm trong [2,10] nên hợp lệ.) **Lưu ý:** Deployment phải khai \`requests.cpu\` thì utilization mới tính được; cần metrics-server trong cluster.

### Lời giải BT6

**Phân tích.** Triệu chứng: app khởi động OK rồi bị giết sau ~8s, lặp lại (CrashLoopBackOff). Đây KHÔNG phải app tự crash (log cho thấy nó chạy bình thường) — nó bị **kubelet restart do liveness probe**.

Tính thời điểm liveness giết app:
- \`initialDelaySeconds: 0\` → probe bắt đầu ngay khi container start.
- \`periodSeconds: 2\` → probe mỗi 2s.
- App mất ~10s warm-up → trong 10s đầu, \`/healthz\` (nếu nó phụ thuộc warm-up) hoặc server chưa listen → probe **fail**.
- \`failureThreshold: 3\` → fail 3 lần liên tiếp (~lần thứ 3 ≈ giây thứ 4-6, cộng timeout) → restart quanh giây thứ 6-8.

→ **Nguyên nhân: liveness probe chạy quá sớm và quá nhạy, giết app TRONG lúc warm-up bình thường.** App chưa kịp sẵn sàng (cần 10s) đã bị liveness đánh trượt và restart → vòng lặp.

**Cách sửa** — dùng **startup probe** bao trùm giai đoạn warm-up; liveness chỉ chạy SAU khi startup pass:

\`\`\`yaml
startupProbe:
  httpGet: { path: /healthz, port: 8080 }
  periodSeconds: 2
  failureThreshold: 10     # cho tới 2×10 = 20s để khởi động (> 10s warm-up)
livenessProbe:
  httpGet: { path: /healthz, port: 8080 }
  periodSeconds: 10
  timeoutSeconds: 3        # nới timeout (1s quá nhạy)
  failureThreshold: 3
\`\`\`

Hoặc tối thiểu (không dùng startup probe): tăng \`initialDelaySeconds\` của liveness lên ≥ 12s để qua warm-up. Nhưng startup probe là cách chuẩn vì nó linh hoạt và không "đoán" thời gian khởi động cứng.

---

## Code & Minh họa

- **[solutions.go](./solutions.go)** — HTTP server K8s-ready: \`/healthz\` (liveness), \`/readyz\` (readiness, lật khi shutdown), graceful shutdown SIGTERM với drain + endpoint-propagation delay, config từ env (12-factor), che secret khi log. Build: \`go build solutions.go\`. Chạy thử: \`PORT=8080 SHUTDOWN_GRACE=10s go run solutions.go\` rồi Ctrl-C để xem graceful shutdown.
- **[visualization.html](./visualization.html)** — 3 module tương tác:
  1. **K8s objects relationship** — Deployment → ReplicaSet → Pod, Service → Pods.
  2. **Rolling update** — animate Pod cũ terminate, Pod mới ready, zero-downtime.
  3. **Probe behavior** — liveness fail → restart, readiness fail → gỡ khỏi LB.

---

## Bài tiếp theo

[Lesson 77 — CI/CD Pipeline](../lesson-77-ci-cd-pipeline/): tự động build → test → lint → scan → release → deploy lên K8s (GitHub Actions, supply chain, deploy strategy).

## Tham khảo

- [Kubernetes Documentation — Concepts](https://kubernetes.io/docs/concepts/)
- [12-Factor App](https://12factor.net)
- [Lesson 51 — Graceful Shutdown](../lesson-51-graceful-shutdown/) · [Lesson 63 — Service Discovery](../lesson-63-service-discovery-lb/) · [Lesson 75 — Docker Multi-stage](../lesson-75-docker-multistage/)
`;
