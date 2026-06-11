# SoftwareEngineering — Kỹ thuật phần mềm

Lĩnh vực này dạy **nghề làm phần mềm cùng người khác**: quy trình, thiết kế, kiến trúc và vận hành — phần kỷ luật biến "code chạy được" thành "hệ thống sống được nhiều năm, nhiều người duy trì".

## Khác gì với `Programming` và `Algorithms`?

- [`Programming`](../Programming/) dạy *viết code bằng Go* — cú pháp, kiểu dữ liệu, công cụ ngôn ngữ.
- [`Algorithms`](../Algorithms/) dạy *giải thuật & độ phức tạp* — cách giải bài toán hiệu quả.
- **`SoftwareEngineering`** dạy *kỷ luật kỹ thuật, độc lập ngôn ngữ* — hứng yêu cầu, cộng tác qua git, review, thiết kế bền vững, triển khai an toàn.

Những chỗ giao nhau (git, testing, design patterns) đã có trong `Programming` dưới góc độ cú pháp Go; ở đây chúng được nhìn lại ở góc độ **quy trình & nguyên lý**, kèm cross-link thay vì viết lại.

## Lộ trình — 3 tầng

| Tầng | Chủ đề | Trạng thái |
|------|--------|-----------|
| **01 — Foundations** | Quy trình & cộng tác: SDLC, Agile, yêu cầu, git workflow, code review, ước lượng | ✅ 6 bài |
| **02 — Design & Quality** | Clean code, SOLID, coupling/cohesion, design patterns, refactoring, chiến lược kiểm thử | ✅ 6 bài |
| **03 — Architecture & Delivery** | Kiến trúc phần mềm, thiết kế API, CI/CD, container, observability, system design | ✅ 6 bài |

## Tầng 01 — Foundations (Nền tảng & quy trình)

Đọc tuần tự; mỗi bài có `README.md` (lý thuyết + bài tập + lời giải chi tiết) và `visualization.html` (minh họa tương tác, mở trực tiếp trong trình duyệt).

| # | Bài | Nội dung chính |
|---|-----|----------------|
| 01 | [SDLC & vai trò kỹ sư](./01-Foundations/lesson-01-sdlc-engineer-role/) | Vòng đời phần mềm, Waterfall vs lặp, đường cong chi phí sửa lỗi |
| 02 | [Agile, Scrum & Kanban](./01-Foundations/lesson-02-agile-scrum-kanban/) | Tuyên ngôn Agile, sprint/backlog, bảng Kanban & giới hạn WIP |
| 03 | [Yêu cầu & đặc tả](./01-Foundations/lesson-03-requirements-spec/) | Functional vs non-functional, user story, acceptance criteria |
| 04 | [Git workflow cho nhóm](./01-Foundations/lesson-04-git-workflow-team/) | Feature branch, GitFlow vs trunk-based, merge conflict, rebase |
| 05 | [Code review](./01-Foundations/lesson-05-code-review/) | Pull request, checklist review, văn hóa feedback, PR nhỏ |
| 06 | [Ước lượng & quản lý công việc](./01-Foundations/lesson-06-estimation-planning/) | Story point, planning poker, velocity & dự báo, burndown |

## Tầng 02 — Design & Quality (Thiết kế & chất lượng)

| # | Bài | Nội dung chính |
|---|-----|----------------|
| 01 | [Clean code & code smells](./02-Design-Quality/lesson-01-clean-code-code-smells/) | Đặt tên, hàm nhỏ, 7 code smells, comment "vì sao" |
| 02 | [Nguyên lý thiết kế](./02-Design-Quality/lesson-02-design-principles/) | SOLID, DRY, KISS, YAGNI — ví dụ vi phạm & cách sửa |
| 03 | [Coupling & cohesion](./02-Design-Quality/lesson-03-coupling-cohesion/) | Khớp nối & gắn kết, quan hệ với SOLID, giảm coupling |
| 04 | [Design patterns](./02-Design-Quality/lesson-04-design-patterns/) | Mẫu GoF — khi nào & vì sao dùng, cảnh báo lạm dụng |
| 05 | [Refactoring & nợ kỹ thuật](./02-Design-Quality/lesson-05-refactoring-tech-debt/) | Phép refactor, quy trình an toàn, quản lý nợ kỹ thuật |
| 06 | [Chiến lược kiểm thử](./02-Design-Quality/lesson-06-testing-strategy/) | Test pyramid, TDD/BDD, giới hạn của coverage |

## Tầng 03 — Architecture & Delivery (Kiến trúc & vận hành)

| # | Bài | Nội dung chính |
|---|-----|----------------|
| 01 | [Kiến trúc phần mềm](./03-Architecture-Delivery/lesson-01-software-architecture/) | Layered, hexagonal, monolith vs microservices, event-driven |
| 02 | [Thiết kế API](./03-Architecture-Delivery/lesson-02-api-design/) | REST, gRPC, GraphQL, versioning & tương thích ngược |
| 03 | [CI/CD](./03-Architecture-Delivery/lesson-03-ci-cd/) | Pipeline, quality gate, blue-green/canary/rolling |
| 04 | [Container & triển khai](./03-Architecture-Delivery/lesson-04-containers-deployment/) | Container vs VM, Dockerfile, orchestration, 12-factor |
| 05 | [Observability & độ tin cậy](./03-Architecture-Delivery/lesson-05-observability-reliability/) | Logs/metrics/traces, golden signals, SLO & error budget |
| 06 | [System design & scalability](./03-Architecture-Delivery/lesson-06-system-design-scalability/) | Scale, load balancing, caching, sharding, message queue |

## Tiền đề hữu ích

- [Programming](../Programming/) — biết viết code cơ bản (đặc biệt [git cơ bản](../Programming/lesson-02-dev-environment-git/) trước Lesson 04 Tầng 1).
- Không cần kiến thức quản lý dự án trước.
