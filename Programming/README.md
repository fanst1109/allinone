# Programming — Học lập trình bằng Go từ tư duy đến production

Lộ trình **79 lesson chia 9 tier**, đi từ tư duy lập trình thuần (không ngôn ngữ) đến xây dựng dịch vụ production chạy thật trên Kubernetes. Ngôn ngữ chính xuyên suốt là **Go (Golang)** — chọn Go vì cú pháp tối giản, biên dịch nhanh, kho thư viện chuẩn mạnh, là ngôn ngữ chủ lực cho backend / cloud-native hiện đại.

## Lĩnh vực này dạy gì?

- **Tư duy lập trình** — cách decompose vấn đề, đọc tài liệu, debug.
- **Ngôn ngữ Go** — từ syntax cơ bản đến generics, reflect, memory model.
- **Backend thực chiến** — REST API, gRPC, GraphQL, auth, TLS.
- **Cơ sở dữ liệu** — SQL (Postgres), Redis cache, NoSQL, search.
- **Distributed systems** — message queue, saga, CQRS, consensus.
- **Production** — logging, metrics, tracing, Docker, Kubernetes, CI/CD.
- **Software engineering** — clean architecture, code review, postmortem.
- **Capstone** — build dịch vụ thật từ đầu, deploy có observability đầy đủ.

## Cấu trúc lộ trình

| Tier | Tên | Số lesson | Mục tiêu |
|------|-----|:--:|----------|
| 0 | [Foundation / Mindset](./tier-0-foundation/index.html) | 5 | Tư duy lập trình, env, Git, CLI, đọc code |
| 1 | [Go Basic](./tier-1-basic/index.html) | 12 | Syntax Go từ hello world đến struct |
| 2 | [Go Intermediate](./tier-2-intermediate/index.html) | 12 | Interface, error, IO, JSON, testing, concurrency cơ bản |
| 3 | [Go Advanced](./tier-3-advanced/index.html) | 12 | Generics, reflect, GC, profiling, concurrency patterns |
| 4 | [Web & Backend](./tier-4-web-backend/index.html) | 12 | HTTP, REST, gRPC, auth, TLS, WebSocket |
| 5 | [Database & Storage](./tier-5-data/index.html) | 8 | SQL, ORM, transaction, Redis, NoSQL, search |
| 6 | [Distributed & Microservices](./tier-6-distributed/index.html) | 10 | MQ, saga, CQRS, consensus, service mesh |
| 7 | [Production / DevOps / SWE](./tier-7-production/index.html) | 10 | Log, metric, trace, Docker, K8s, CI/CD, architecture |
| 8 | [Capstone Project](./tier-8-capstone/index.html) | 3 | Build + deploy + observe một service thật |

Tổng: **79 lesson** + **6 mini-project** (cuối Tier 1, 3, 4, 5, 6) + **1 capstone**.

## Cách học hiệu quả nhất

1. **Đọc tuần tự** — mỗi tier giả định bạn đã nắm tier trước. Cố gắng bỏ qua nền tảng sẽ bị mắc kẹt ở các tier sau.
2. **Code song song với đọc** — clone repo về, mở `solutions.go` của lesson, chạy thử, sửa thử. Không chỉ đọc.
3. **Làm bài tập, KHÔNG xem lời giải trước** — bài tập là chỗ kiến thức chuyển từ "biết" thành "biết làm". Lời giải để check sau, không phải để copy.
4. **Mở `visualization.html`** — nhiều khái niệm trừu tượng (escape analysis, goroutine scheduler, GC) sẽ "thấm" nhanh hơn khi bạn click qua được.
5. **Lặp lại mini-project** — sau mỗi tier có 1 dự án nhỏ, đó là lúc gắn các mảnh lại với nhau. Đừng bỏ qua.

## Vì sao Go, không phải Python / Java / Rust?

| Ngôn ngữ | Mạnh | Hạn chế (cho mục đích lộ trình này) |
|----------|------|--------------------------------------|
| **Go** | Cú pháp gọn, compile nhanh, concurrency built-in, std lib mạnh, deploy 1 binary | Generics non-trivial, error handling verbose |
| Python | Học nhanh, ecosystem AI/data | Performance kém, deploy phức tạp, không hợp dạy concurrency thật |
| Java | Enterprise-grade, JVM mature | Verbose, thời gian học cú pháp lâu, JVM tuning phức tạp |
| Rust | An toàn nhất, perf tốt nhất | Đường cong học dốc nhất (borrow checker), không phù hợp cho người mới |
| C/C++ | Hiểu sâu memory, OS | Hứng đạn memory bugs, không phù hợp dạy production patterns trong thời gian ngắn |

Go là **"sweet spot"** cho người muốn vừa hiểu sâu, vừa có thể xây dựng dịch vụ production thật trong vài tháng.

## Tiền đề

- Không bắt buộc, nhưng có ích nếu đã đọc qua [DataFoundations](../DataFoundations/) (binary, hex, bitwise, logic).
- Tier 4–6 có nhắc tới một số thuật toán/cấu trúc, có thể tham khảo [DataStructures](../DataStructures/) khi cần.
- Không yêu cầu biết ngôn ngữ lập trình nào trước — Tier 0 dạy từ tư duy.

## Mỗi lesson có gì?

Theo chuẩn của repo này (xem `CLAUDE.md` ở root):

- `README.md` — lý thuyết + ví dụ số cụ thể (≥4 ví dụ/định nghĩa) + callouts (💡 Trực giác, ❓ Câu hỏi, ⚠ Lỗi thường gặp, 🔁 Tự kiểm tra, 📝 Tóm tắt) + bài tập **có lời giải chi tiết**.
- `solutions.go` — code Go biên dịch được, có hàm `main` minh họa, comment tiếng Việt giải thích.
- `visualization.html` — minh họa tương tác standalone, mở trong browser là chạy, có readme-modal + TOC.

## Bài đầu tiên

Bắt đầu từ [Lesson 01 — Tư duy lập trình](./lesson-01-thinking-like-programmer/README.md).
