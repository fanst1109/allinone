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
| **02 — Design & Quality** | Clean code, SOLID, coupling/cohesion, design patterns, refactoring, chiến lược kiểm thử | 🚧 đang mở rộng |
| **03 — Architecture & Delivery** | Kiến trúc phần mềm, thiết kế API, CI/CD, container, observability, system design | 🚧 đang mở rộng |

## Tầng 01 — Foundations (Nền tảng & quy trình)

Đọc tuần tự; mỗi bài có `README.md` (lý thuyết + bài tập + lời giải chi tiết) và `visualization.html` (minh họa tương tác, mở trực tiếp trong trình duyệt).

| # | Bài | Nội dung chính |
|---|-----|----------------|
| 01 | [SDLC & vai trò kỹ sư](./01-Foundations/lesson-01-sdlc-vai-tro-ky-su/) | Vòng đời phần mềm, Waterfall vs lặp, đường cong chi phí sửa lỗi |
| 02 | [Agile, Scrum & Kanban](./01-Foundations/lesson-02-agile-scrum-kanban/) | Tuyên ngôn Agile, sprint/backlog, bảng Kanban & giới hạn WIP |
| 03 | [Yêu cầu & đặc tả](./01-Foundations/lesson-03-yeu-cau-dac-ta/) | Functional vs non-functional, user story, acceptance criteria |
| 04 | [Git workflow cho nhóm](./01-Foundations/lesson-04-git-workflow-team/) | Feature branch, GitFlow vs trunk-based, merge conflict, rebase |
| 05 | [Code review](./01-Foundations/lesson-05-code-review/) | Pull request, checklist review, văn hóa feedback, PR nhỏ |
| 06 | [Ước lượng & quản lý công việc](./01-Foundations/lesson-06-uoc-luong-quan-ly-viec/) | Story point, planning poker, velocity & dự báo, burndown |

## Tiền đề hữu ích

- [Programming](../Programming/) — biết viết code cơ bản (đặc biệt [git cơ bản](../Programming/lesson-02-dev-environment-git/) trước Lesson 04).
- Không cần kiến thức quản lý dự án trước.
