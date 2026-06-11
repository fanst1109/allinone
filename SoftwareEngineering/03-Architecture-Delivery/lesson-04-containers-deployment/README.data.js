// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: SoftwareEngineering/03-Architecture-Delivery/lesson-04-containers-deployment/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Container & triển khai

## Mục tiêu

- Hiểu vấn đề kinh điển **"chạy được trên máy tôi"** (works on my machine) và vì sao container giải quyết nó: đóng gói *ứng dụng cùng toàn bộ phụ thuộc* thành một đơn vị chạy nhất quán ở mọi môi trường.
- Phân biệt **container** với **máy ảo (VM)**: khác nhau ở chỗ nào, vì sao container nhẹ và khởi động nhanh hơn (chia sẻ nhân hệ điều hành).
- Đọc hiểu **image** và **Dockerfile**: khái niệm layer, build, cache, registry — qua một Dockerfile mẫu giải thích từng dòng.
- Hiểu *vì sao* cần **điều phối (orchestration)** khi có nhiều container, và nắm các khái niệm cốt lõi của **Kubernetes** ở mức ý niệm (pod, service, scaling, self-healing) — **không** đi sâu cú pháp.
- Nắm các nguyên tắc **12-factor app** cốt lõi (config qua biến môi trường, stateless, log là luồng) và vì sao chúng hợp với container.

## Kiến thức tiền đề

- Đã hiểu pipeline **CI/CD** — vì container là *artifact* mà pipeline build ra rồi triển khai. Xem [Lesson 03 — CI/CD](../lesson-03-ci-cd/).
- (Tuỳ chọn, để hiểu *cơ chế kernel* bên dưới) container được dựng từ **namespace** và **cgroup** của Linux — góc độ hệ điều hành học ở [OperatingSystems — Advanced & Modern](../../../OperatingSystems/03-Advanced-Modern/index.html). Bài này **không** lặp lại cơ chế kernel; ở đây ta nhìn container từ góc **triển khai phần mềm**: đóng gói và chạy ứng dụng nhất quán.

> 💡 **Hai góc nhìn, một thứ.** Cùng là "container" nhưng [OS/03](../../../OperatingSystems/03-Advanced-Modern/index.html) hỏi *"kernel cô lập tiến trình bằng namespace/cgroup ra sao?"* — còn bài này hỏi *"làm sao đóng gói app để build một lần, chạy giống nhau ở laptop, CI và production?"*. Bài này dùng container như một **công cụ giao hàng phần mềm**, không mổ xẻ ruột gan kernel.

---

## 1. Vấn đề "chạy được trên máy tôi"

💡 **Trực giác.** Bạn viết app, chạy ngon trên laptop. Đẩy lên server của đồng nghiệp → crash. Lý do: laptop bạn có Node 18, server có Node 16; bạn có thư viện ảnh \`libjpeg\` phiên bản X, server không có; biến môi trường khác nhau. App không "sai", chỉ là **môi trường khác**. Câu nói chống chế kinh điển: *"nhưng nó chạy được trên máy tôi mà!"*.

Trước container, người ta dán một danh sách "hướng dẫn cài đặt" (README dài 40 dòng: cài cái này, set biến kia, đúng version nọ). Mỗi máy làm thủ công → **trôi cấu hình (configuration drift)**: không máy nào giống máy nào.

**Container giải thế nào.** Thay vì chỉ giao *code*, ta giao **code + runtime + thư viện + cấu hình** đóng gói thành một *image* duy nhất. Image chạy y hệt ở mọi nơi có engine container (Docker, containerd...). Nguyên lý: **"build một lần, chạy ở đâu cũng vậy"** (build once, run anywhere).

**Ví dụ cụ thể.** App Python cần đúng Python 3.11 + thư viện \`requests==2.31\`:

\`\`\`
# Không có container — phụ thuộc vào máy đích:
$ python app.py
ModuleNotFoundError: No module named 'requests'   # máy đích thiếu thư viện

# Có container — phụ thuộc đã nằm sẵn trong image:
$ docker run my-app
Server listening on :8080                          # chạy giống hệt mọi nơi
\`\`\`

> ❓ **"Container có phải chỉ là một máy ảo thu nhỏ không?"** Không hẳn — đó là hiểu lầm phổ biến nhất. Container *không* chứa cả một hệ điều hành riêng; nó chia sẻ nhân (kernel) của máy chủ và chỉ đóng gói phần *user-space* (thư viện, runtime, app). Khác biệt này là lý do container nhẹ hơn nhiều — xem mục 2.

> ❓ **"Vậy container thay thế CI/CD à?"** Không, chúng bổ trợ nhau. Pipeline [CI/CD](../lesson-03-ci-cd/) **build ra image** ở bước CI, rồi **đẩy image đó lên môi trường** ở bước CD. Container là *cái được giao*; CI/CD là *cách giao*.

📝 **Tóm tắt mục 1.** "Chạy được trên máy tôi" là hệ quả của khác biệt môi trường. Container loại bỏ nó bằng cách đóng gói *app + mọi phụ thuộc + cấu hình* thành một image bất biến, chạy nhất quán ở mọi nơi.

---

## 2. Container vs máy ảo (VM)

💡 **Trực giác.** Máy ảo giống xây **những căn nhà riêng biệt** — mỗi nhà có móng, tường, hệ thống điện nước riêng (mỗi VM có một hệ điều hành đầy đủ riêng). Container giống chia **các phòng trong cùng một toà nhà** — chung móng và hạ tầng (chung kernel máy chủ), mỗi phòng chỉ có nội thất riêng. Phòng dựng nhanh và nhẹ hơn xây nhà mới rất nhiều.

So sánh hai tầng kiến trúc:

\`\`\`
        MÁY ẢO (VM)                         CONTAINER
 ┌─────┬─────┬─────┐                 ┌─────┬─────┬─────┐
 │App A│App B│App C│                 │App A│App B│App C│
 ├─────┼─────┼─────┤                 ├─────┼─────┼─────┤
 │ Bin │ Bin │ Bin │                 │ Bin │ Bin │ Bin │   ← chỉ phần này
 ├─────┼─────┼─────┤                 └─────┴─────┴─────┘     đóng gói riêng
 │ OS  │ OS  │ OS  │  ← mỗi VM       ┌───────────────────┐
 ├─────┴─────┴─────┤    1 OS đầy đủ  │  Container Engine  │
 │   Hypervisor    │                 ├───────────────────┤
 ├─────────────────┤                 │   OS máy chủ       │ ← CHIA SẺ
 │   Phần cứng     │                 ├───────────────────┤   1 kernel
 └─────────────────┘                 │     Phần cứng      │
                                     └───────────────────┘
\`\`\`

| Tiêu chí | Máy ảo (VM) | Container |
|----------|-------------|-----------|
| Cô lập | Hệ điều hành (OS) riêng đầy đủ | Chia sẻ kernel máy chủ |
| Kích thước | Hàng GB (chứa cả OS) | Hàng chục–trăm MB |
| Thời gian khởi động | Hàng chục giây–phút | Mili giây–giây |
| Số lượng chạy/máy | Vài–vài chục | Hàng trăm–nghìn |
| Mức cô lập bảo mật | Mạnh hơn (ranh giới kernel riêng) | Yếu hơn (chung kernel) |

**Vì sao container nhẹ hơn.** VM phải khởi động và duy trì *một kernel + một OS đầy đủ* cho mỗi máy ảo — tốn RAM, đĩa, thời gian boot. Container bỏ qua toàn bộ phần đó: nó chỉ là **một (nhóm) tiến trình chạy trên kernel của máy chủ**, được kernel cô lập bằng namespace/cgroup (cơ chế chi tiết xem [OS/03](../../../OperatingSystems/03-Advanced-Modern/index.html)). Không có OS khách → không tốn GB cho mỗi instance, khởi động gần như tức thì.

> ⚠ **Lỗi thường gặp.** Nghĩ "container an toàn bằng VM nên gom mọi tenant chung một host thoải mái". Vì container *chung kernel*, một lỗ hổng kernel có thể phá vỡ cô lập giữa các container. Với cách ly cứng (multi-tenant không tin nhau), người ta vẫn dùng VM hoặc microVM (Firecracker, gVisor). Container đánh đổi *một phần* cô lập để lấy nhẹ và nhanh.

> 🔁 **Dừng lại tự kiểm tra.** Vì sao một máy chủ chạy được hàng trăm container nhưng chỉ vài chục VM cùng cấu hình?
> <details><summary>Đáp án</summary>Vì mỗi VM "gánh" một OS khách đầy đủ (kernel + dịch vụ hệ thống) chiếm hàng GB RAM/đĩa và thời gian boot. Container chia sẻ kernel máy chủ, chỉ thêm phần user-space của app (hàng chục MB) → tài nguyên trên mỗi instance nhỏ hơn nhiều lần, nên nhồi được nhiều hơn.</details>

📝 **Tóm tắt mục 2.** VM ảo hoá *phần cứng* (mỗi máy ảo có OS riêng); container ảo hoá *hệ điều hành* (chia sẻ kernel, chỉ đóng gói user-space). Container nhẹ, nhanh, dày đặc hơn; VM cô lập mạnh hơn. Chọn theo nhu cầu.

---

## 3. Image & Dockerfile — layer, build, registry

💡 **Trực giác.** **Image** là "bản thiết kế đông lạnh" của container: ảnh chụp hệ thống file gồm app + phụ thuộc, ở trạng thái sẵn-sàng-chạy. **Container** là một *instance đang chạy* dựng từ image — quan hệ image↔container giống *class↔object*: một image sinh ra nhiều container giống hệt.

**Dockerfile** là công thức từng bước để *build* ra image. Ví dụ cho app Node:

\`\`\`dockerfile
# 1. Bắt đầu từ image nền có sẵn Node 18 (kế thừa, khỏi tự cài Node)
FROM node:18-alpine

# 2. Đặt thư mục làm việc bên trong container
WORKDIR /app

# 3. Copy TRƯỚC file khai báo phụ thuộc (để tận dụng cache — xem dưới)
COPY package.json package-lock.json ./

# 4. Cài phụ thuộc
RUN npm ci --omit=dev

# 5. Giờ mới copy phần mã nguồn còn lại
COPY . .

# 6. Khai báo cổng app lắng nghe (mang tính tài liệu)
EXPOSE 8080

# 7. Lệnh chạy khi container khởi động
CMD ["node", "server.js"]
\`\`\`

**Giải thích từng dòng quan trọng:**
- \`FROM\` — chọn *image nền*. Mọi image xây trên một image khác (ở đây là Node 18 trên Alpine Linux nhỏ gọn). Đây là gốc của tính kế thừa layer.
- \`WORKDIR\` — thư mục mặc định cho các lệnh sau, tránh viết đường dẫn tuyệt đối.
- \`COPY\` / \`RUN\` — mỗi lệnh tạo **một layer** mới (xem dưới).
- \`CMD\` — tiến trình chính container chạy. Khi tiến trình này dừng, container dừng.

### 3.1 Layer & cache — vì sao thứ tự dòng quan trọng

💡 **Trực giác.** Image gồm nhiều **layer** xếp chồng như các lớp sơn: mỗi lệnh trong Dockerfile thêm một lớp ghi đè/bổ sung lên lớp dưới. Docker **cache** từng layer: nếu một lệnh và đầu vào của nó *không đổi* so với lần build trước, Docker dùng lại layer cũ (cache hit) thay vì chạy lại (cache miss).

**Ví dụ số cụ thể — vì sao copy \`package.json\` trước.** Giả sử bạn chỉ sửa một dòng trong \`server.js\`, không động tới phụ thuộc:

| Layer | Lệnh | Lần build sau khi sửa server.js |
|-------|------|--------------------------------|
| 1 | \`FROM node:18-alpine\` | ✅ cache hit (không đổi) |
| 2 | \`WORKDIR /app\` | ✅ cache hit |
| 3 | \`COPY package*.json\` | ✅ cache hit (phụ thuộc không đổi) |
| 4 | \`RUN npm ci\` | ✅ **cache hit** → tiết kiệm ~30–60s |
| 5 | \`COPY . .\` | ❌ cache miss (server.js đã đổi) |
| 6+ | còn lại | ❌ phải làm lại |

Nhờ đặt \`COPY package*.json\` + \`RUN npm ci\` **trước** \`COPY . .\`, bước cài phụ thuộc (chậm nhất) vẫn dùng lại cache khi ta chỉ sửa code. Nếu đảo lại — \`COPY . .\` trước rồi mới \`npm ci\` — thì *mỗi lần sửa một dòng code* đều khiến \`npm ci\` chạy lại từ đầu, build chậm gấp nhiều lần.

> ⚠ **Lỗi thường gặp.** Đặt \`COPY . .\` ngay sau \`FROM\` rồi mới \`RUN npm install\`. Hậu quả: bất kỳ thay đổi nhỏ nào ở source cũng làm hỏng cache của bước cài phụ thuộc → mỗi build đều cài lại toàn bộ thư viện. Quy tắc vàng: **copy thứ ít thay đổi (file khai báo phụ thuộc) trước, thứ hay thay đổi (mã nguồn) sau.**

### 3.2 Registry — kho chứa image

💡 **Trực giác.** **Registry** là "GitHub cho image": nơi *push* (đẩy lên) và *pull* (kéo về) image, có đánh tag phiên bản. Ví dụ: Docker Hub, GitHub Container Registry (GHCR), AWS ECR.

\`\`\`bash
docker build -t myorg/my-app:1.4.0 .   # build, gắn tag tên:phiên-bản
docker push myorg/my-app:1.4.0          # đẩy lên registry
# trên server / Kubernetes:
docker pull myorg/my-app:1.4.0          # kéo đúng phiên bản về chạy
\`\`\`

Tag (\`:1.4.0\`) cho phép cố định đúng phiên bản → môi trường nào cũng chạy *cùng một bit*. Pipeline [CD](../lesson-03-ci-cd/) thường: CI build & push image có tag = commit SHA → CD pull đúng tag đó để triển khai.

> 🔁 **Dừng lại tự kiểm tra.** Bạn build lại image sau khi chỉ đổi một dòng README (không phải code, không phải phụ thuộc). Layer \`RUN npm ci\` cache hit hay miss?
> <details><summary>Đáp án</summary>Còn tuỳ Dockerfile. Với Dockerfile mẫu ở trên: README bị \`COPY . .\` (layer 5) bắt vào → layer 5 trở đi cache miss, nhưng layer \`RUN npm ci\` (layer 4, *trước* \`COPY . .\`) vẫn <b>cache hit</b> vì \`package*.json\` không đổi. Đó chính là lợi ích của việc tách copy phụ thuộc ra trước.</details>

📝 **Tóm tắt mục 3.** Image = ảnh chụp sẵn-sàng-chạy gồm nhiều layer; Dockerfile = công thức build; container = instance đang chạy. Sắp xếp lệnh để thứ ít đổi đứng trước → tận dụng cache, build nhanh. Registry là kho push/pull image có tag phiên bản.

---

## 4. Vì sao cần điều phối (orchestration) — Kubernetes ở mức khái niệm

💡 **Trực giác.** Một container thì \`docker run\` là xong. Nhưng production thật có *hàng chục–trăm* container (nhiều bản sao của nhiều dịch vụ) chạy trên *nhiều máy*. Ai khởi động chúng? Container chết thì ai dựng lại? Tải tăng thì ai thêm bản sao? Trả lời thủ công là bất khả thi — cần một "nhạc trưởng" tự động: đó là **orchestrator**, phổ biến nhất là **Kubernetes (K8s)**.

**Các vấn đề orchestration giải quyết:**

| Vấn đề | Không có orchestration | Có orchestration |
|--------|------------------------|------------------|
| Container chết lúc 3h sáng | Người trực phải dậy dựng lại | Tự động dựng lại (self-healing) |
| Lưu lượng tăng gấp 5 | Thêm bản sao thủ công | Tự scale theo CPU/tải |
| Phân bổ container lên máy nào | Tự tính tay | Scheduler tự đặt theo tài nguyên trống |
| Tìm địa chỉ dịch vụ khác | Hard-code IP (đổi là hỏng) | Service cho tên ổn định + cân bằng tải |

**Khái niệm cốt lõi của Kubernetes (mức ý niệm — không đi sâu YAML):**
- **Pod** — đơn vị triển khai nhỏ nhất: một (hoặc vài) container chạy chung, chia sẻ mạng/ổ đĩa. K8s điều phối *pod*, không trực tiếp từng container.
- **Service** — một *tên + địa chỉ ảo ổn định* đại diện cho một nhóm pod, tự cân bằng tải. Pod sinh/chết liên tục (IP đổi), nhưng Service giữ điểm vào không đổi cho client.
- **Scaling** — tăng/giảm số bản sao (replica) của pod. Có thể tay (\`replicas: 5\`) hoặc tự động theo tải (autoscaler).
- **Self-healing** — K8s liên tục so *trạng thái mong muốn* ("luôn có 3 bản chạy khoẻ") với *trạng thái thực*. Lệch là tự sửa: pod chết → dựng pod mới; pod fail health check → thay thế.

**Mô hình khai báo (declarative).** Bạn không ra lệnh từng bước ("dựng container này, đặt lên máy kia"). Bạn *khai báo trạng thái mong muốn* ("tôi muốn luôn có 3 bản app \`web\` phiên bản 1.4.0 khoẻ mạnh") và K8s tự lo đạt và *duy trì* trạng thái đó.

> ❓ **"Dự án nhỏ có cần Kubernetes không?"** Thường là không. K8s mạnh nhưng phức tạp — chi phí vận hành đáng kể. App nhỏ một-hai container chạy tốt với \`docker compose\`, một PaaS (Render, Fly.io, Cloud Run) hoặc thậm chí một VM. Dùng K8s khi *quy mô và yêu cầu vận hành* (nhiều dịch vụ, scale động, độ sẵn sàng cao) thật sự đòi hỏi — đừng "đốt" K8s cho việc nhỏ.

> 🔁 **Dừng lại tự kiểm tra.** Một container web chết lúc nửa đêm. Trong cụm Kubernetes khai báo \`replicas: 3\`, điều gì xảy ra mà không cần con người?
> <details><summary>Đáp án</summary>K8s phát hiện trạng thái thực (2 pod khoẻ) lệch trạng thái mong muốn (3 pod) → <b>self-healing</b>: scheduler tự dựng một pod mới thay thế, Service tự định tuyến lại lưu lượng sang các pod khoẻ. Không ai phải thức dậy.</details>

📝 **Tóm tắt mục 4.** Khi container nhiều và rải trên nhiều máy, cần orchestration tự động hoá: dựng lại khi chết (self-healing), scale theo tải, định vị dịch vụ (Service), lập lịch đặt pod. Kubernetes làm việc đó theo mô hình *khai báo trạng thái mong muốn*. Dự án nhỏ chưa cần K8s.

---

## 5. 12-factor app — vì sao hợp với container

💡 **Trực giác.** **12-factor** là một bộ nguyên tắc viết app để nó *dễ triển khai, dễ scale, dễ vận hành* trên hạ tầng đám mây. Container chỉ đóng gói *cách chạy*; 12-factor đảm bảo *bản thân app* được viết sao cho việc đóng gói và nhân bản đó thực sự hoạt động. Ta tập trung 3 yếu tố cốt lõi nhất với container.

### 5.1 Config qua biến môi trường (Factor III)

Không "nhét cứng" cấu hình (URL database, khoá API) vào code hay file commit trong image. Đưa chúng qua **biến môi trường** lúc chạy.

\`\`\`bash
# Cùng MỘT image, chạy ở môi trường khác nhau chỉ bằng đổi biến:
docker run -e DB_URL=postgres://staging ...   my-app   # staging
docker run -e DB_URL=postgres://prod    ...   my-app   # production
\`\`\`

**Vì sao hợp container:** image là *bất biến* (immutable) và *không gắn môi trường*. Một image duy nhất chạy được ở dev/staging/prod, chỉ khác ở biến tiêm vào — đúng tinh thần "build một lần, chạy mọi nơi". Nếu nhét URL prod vào image, ta phải build image riêng cho mỗi môi trường (sai).

### 5.2 Stateless — không giữ trạng thái cục bộ (Factor VI)

Tiến trình app phải **không lưu trạng thái quan trọng trong bộ nhớ hay đĩa cục bộ** của nó. Mọi trạng thái cần bền (session, file upload) đẩy ra dịch vụ ngoài (database, Redis, object storage).

**Vì sao hợp container:** container có thể bị giết và dựng lại *bất cứ lúc nào* (self-healing, scaling, rolling update). Nếu app giữ session trong RAM của một container, container đó chết là mất session người dùng. Stateless → mọi bản sao *tương đương* nhau, scale ngang vô tư: thêm/bớt một bản chẳng ảnh hưởng dữ liệu.

> ⚠ **Lỗi thường gặp.** Lưu file người dùng upload vào đĩa cục bộ của container (\`/tmp/uploads\`). Container restart hoặc scale ra bản thứ hai → file biến mất hoặc bản kia không thấy. Đúng phải đẩy lên object storage (S3...) chung.

### 5.3 Log là luồng (Factor XI)

App **không tự quản lý file log**; nó *viết log ra \`stdout\`/\`stderr\`* như một luồng sự kiện. Hạ tầng (Docker, K8s, hệ thống gom log) lo việc thu, gộp, lưu, xoay vòng.

**Vì sao hợp container:** container có vòng đời ngắn và bị xoá khi chết — file log nằm trong nó cũng mất theo. Viết ra stdout để hạ tầng gom ra ngoài giúp log *tồn tại lâu hơn container* và *tập trung* được từ hàng trăm bản sao. (Việc thu thập/giám sát log đi sâu ở [Lesson 05 — Observability](../lesson-05-observability-reliability/).)

> ❓ **"Còn 9 factor kia thì sao?"** Vẫn quan trọng (codebase một nguồn, khai báo phụ thuộc tường minh, dev/prod đồng nhất...). Ba yếu tố trên được chọn vì chúng *cộng hưởng trực tiếp* với mô hình container bất biến + nhân bản + vòng đời ngắn. Đọc đủ 12 yếu tố ở [12factor.net](https://12factor.net).

> 🔁 **Dừng lại tự kiểm tra.** Vì sao một app lưu session đăng nhập trong RAM cục bộ lại gây lỗi khi scale lên 3 bản chạy sau một load balancer?
> <details><summary>Đáp án</summary>Vi phạm nguyên tắc <b>stateless</b>. Load balancer phân request của cùng một user sang các bản khác nhau; bản B không có session mà bản A đã tạo → user bị "đăng xuất" ngẫu nhiên. Sửa: đẩy session ra kho chung (Redis/DB) để mọi bản đều truy cập được.</details>

📝 **Tóm tắt mục 5.** Ba factor cốt lõi với container: **config qua env** (một image, nhiều môi trường), **stateless** (bản sao tương đương, scale/khởi động lại vô tư), **log là luồng stdout** (tồn tại ngoài container, gom tập trung). Chúng làm tính bất biến và nhân bản của container thực sự dùng được.

---

## 6. Immutable infrastructure & health check

💡 **Trực giác.** **Hạ tầng bất biến (immutable infrastructure)**: khi cần đổi, ta *không sửa tại chỗ* container/server đang chạy, mà **build phiên bản mới rồi thay nguyên cái cũ**. Giống thay bóng đèn: không "sửa" bóng cháy, mà lắp bóng mới. Container hiện thực ý này tự nhiên — image đã build là cố định, muốn đổi thì build image mới và thay container.

**Vì sao tốt:** loại bỏ "trôi cấu hình" (mỗi server bị vá tay mỗi kiểu), rollback dễ (chỉ việc triển khai lại image phiên bản cũ), môi trường tái lập 100%.

### 6.1 Health check — để orchestrator biết container "khoẻ"

Container *đang chạy* chưa chắc *đang phục vụ được* (có thể treo, deadlock, mất kết nối DB). **Health check** là một endpoint/lệnh để hệ thống kiểm tra định kỳ.

- **Liveness** ("còn sống không?") — fail thì orchestrator *giết và dựng lại* container (self-healing).
- **Readiness** ("sẵn sàng nhận request chưa?") — fail thì *tạm ngừng gửi traffic* tới nó (nhưng không giết), ví dụ lúc app còn đang khởi động/nạp cache.

\`\`\`dockerfile
# Khai báo cách Docker kiểm tra sức khoẻ: gọi /health mỗi 30s
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:8080/health || exit 1
\`\`\`

> ⚠ **Lỗi thường gặp.** Để readiness fail nhưng liveness pass cùng một điều kiện "DB chưa sẵn sàng" → app khởi động xong nhưng DB tạm chậm khiến *liveness* fail → orchestrator giết container, vòng lặp restart vô tận. Phân biệt rõ: *liveness* chỉ fail khi app thật sự hỏng không tự cứu được; *readiness* fail cho các trạng thái tạm.

📝 **Tóm tắt mục 6.** Immutable infrastructure: đổi = thay phiên bản mới, không vá tại chỗ → rollback và tái lập dễ. Health check cho orchestrator biết container có khoẻ (liveness → restart) và có sẵn sàng nhận traffic (readiness → định tuyến) hay không.

---

## 7. Bài tập

1. Giải thích bằng lời (không thuật ngữ) lỗi "chạy được trên máy tôi" và nêu *chính xác* container loại bỏ nguyên nhân nào.
2. Một bạn nói "container là VM siêu nhẹ". Câu này đúng/sai chỗ nào? Nêu khác biệt cốt lõi về kiến trúc và một hệ quả về tài nguyên.
3. Cho Dockerfile dưới đây — chỉ ra một vấn đề về **cache** và viết lại đúng:
   \`\`\`dockerfile
   FROM python:3.11-slim
   WORKDIR /app
   COPY . .
   RUN pip install -r requirements.txt
   CMD ["python", "app.py"]
   \`\`\`
4. Trong cụm Kubernetes khai báo \`replicas: 4\`, một máy chủ vật lý sập kéo theo 2 pod chết. Mô tả từng bước K8s đưa hệ thống về trạng thái mong muốn, và vai trò của **Service** trong lúc đó.
5. App của bạn lưu session đăng nhập trong RAM cục bộ và ghi log vào file \`/app/app.log\`. Chỉ ra *hai* nguyên tắc 12-factor bị vi phạm và cách sửa từng cái.
6. (Nâng cao) Phân biệt **liveness** và **readiness** probe bằng một tình huống cụ thể trong đó dùng nhầm hai cái sẽ gây vòng lặp restart.

## Lời giải chi tiết

**Bài 1.** Lỗi xảy ra vì *môi trường chạy khác nhau*: version runtime, thư viện hệ thống, biến môi trường trên máy dev khác máy đích → cùng code nhưng kết quả khác (thường là crash). Container loại bỏ nguyên nhân này bằng cách **đóng gói app cùng toàn bộ phụ thuộc + runtime + cấu hình vào một image bất biến**; image đó chạy y hệt ở mọi nơi có engine container, nên môi trường không còn là biến số khác nhau giữa các máy.

**Bài 2.** *Sai* ở chỗ ngụ ý container có OS riêng như VM (chỉ nhỏ hơn). Khác biệt cốt lõi: **VM ảo hoá phần cứng — mỗi máy ảo có một OS/kernel đầy đủ riêng** thông qua hypervisor; **container ảo hoá hệ điều hành — mọi container chia sẻ kernel của máy chủ**, chỉ đóng gói phần user-space (thư viện + app). Hệ quả tài nguyên: vì không gánh OS riêng cho mỗi instance, container chỉ tốn hàng chục–trăm MB và khởi động trong mili giây, nên một máy chạy được hàng trăm container so với chỉ vài chục VM cùng cấu hình.

**Bài 3.** Vấn đề: \`COPY . .\` đứng *trước* \`RUN pip install\`. Mỗi lần sửa bất kỳ file source nào (kể cả README) đều làm layer \`COPY . .\` cache miss → kéo theo \`pip install\` chạy lại từ đầu dù \`requirements.txt\` không đổi → build chậm không cần thiết. Viết lại — copy file phụ thuộc trước, cài, rồi mới copy source:
\`\`\`dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .          # chỉ file phụ thuộc
RUN pip install -r requirements.txt   # layer này cache hit nếu requirements không đổi
COPY . .                          # source hay đổi để cuối
CMD ["python", "app.py"]
\`\`\`
Giờ sửa source chỉ làm \`COPY . .\` trở đi cache miss; bước \`pip install\` (chậm nhất) vẫn dùng lại cache.

**Bài 4.** (1) Máy sập → 2 pod biến mất; K8s phát hiện trạng thái thực = 2 pod khoẻ, lệch trạng thái mong muốn = 4. (2) **Self-healing**: bộ điều khiển yêu cầu scheduler tạo 2 pod mới; scheduler đặt chúng lên các máy còn tài nguyên trống (tránh máy đã sập). (3) Trong lúc 2 pod mới khởi động và *readiness* chưa pass, **Service** chỉ định tuyến traffic tới các pod đang khoẻ (2 pod còn lại), không gửi vào pod chưa sẵn sàng → client không thấy lỗi. (4) Khi 2 pod mới readiness pass, Service thêm chúng vào nhóm cân bằng tải → trở lại đủ 4 bản phục vụ. Vai trò Service: giữ *điểm vào ổn định* và *che giấu* việc pod sinh/chết bên dưới khỏi client.

**Bài 5.** (a) **Stateless (Factor VI) bị vi phạm** do session nằm trong RAM cục bộ: container chết/scale là mất session, các bản sau load balancer không chia sẻ được → user bị đăng xuất ngẫu nhiên. Sửa: đẩy session ra kho chung (Redis/DB) để mọi bản đều đọc được. (b) **Log là luồng (Factor XI) bị vi phạm** do ghi vào file cục bộ: container bị xoá là mất log, không gom được từ nhiều bản. Sửa: ghi log ra \`stdout\`/\`stderr\`, để hạ tầng (Docker/K8s + hệ thống gom log) thu thập tập trung.

**Bài 6.** *Liveness* trả lời "app có cần bị giết & dựng lại không?"; *readiness* trả lời "có nên gửi traffic vào không?". Tình huống dùng nhầm: app khởi động cần ~20s nạp cache/kết nối DB. Nếu đặt **liveness** probe bắt đầu kiểm tra ngay và fail khi DB chưa sẵn sàng, orchestrator sẽ *giết* container trước khi nó kịp khởi động xong → dựng lại → lại fail → **vòng lặp restart vô tận (CrashLoopBackOff)**. Đúng phải dùng **readiness** cho giai đoạn khởi động/phụ thuộc tạm (chỉ ngừng gửi traffic, không giết), và để liveness chỉ fail khi app thật sự treo không tự phục hồi (kèm \`initialDelay\` đủ dài cho khởi động).

---

## 8. Code & Minh họa

- [visualization.html](./visualization.html) — 3 mô-đun tương tác:
  1. **Image layers & cache** — dựng Dockerfile từng dòng, thấy layer chồng lên nhau; đổi nội dung file để quan sát layer nào cache hit / cache miss.
  2. **Container vs VM** — sơ đồ SVG so sánh hai tầng kiến trúc, bật/tắt để thấy phần OS lặp lại ở VM mà container chia sẻ.
  3. **Orchestration self-heal & scale** — mô phỏng một cụm: "giết" một container để thấy orchestrator dựng lại, chỉnh số replica để thấy scale.

## 9. Bài tiếp theo

- [Lesson 05 — Observability & độ tin cậy](../lesson-05-observability-reliability/) — sau khi container đã chạy ở production, làm sao *biết* nó khoẻ: log (nối tiếp Factor XI), metric, tracing, SLO.
- Liên quan cơ chế kernel của container (namespace, cgroup): [OperatingSystems — Advanced & Modern](../../../OperatingSystems/03-Advanced-Modern/index.html).
`;
