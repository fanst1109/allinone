# Philosophy — Logic & Tư duy phản biện

Lộ trình triết học đi qua cánh cửa **logic**: học cách một lập luận (argument) được xây dựng, khi nào nó *đúng về hình thức*, khi nào nó *ngụy biện*, và làm sao phân tích — phản biện một cách chặt chẽ. **3 tầng × 8 bài = 24 bài**, từ logic hình thức (bảng chân lý, vị từ, chứng minh) qua tư duy phản biện & ngụy biện, tới logic nâng cao và triết học ngôn ngữ.

> Mục tiêu: không học thuộc tên các trường phái, mà rèn **kỹ năng nghĩ** — đọc một đoạn tranh luận và chỉ ra được tiền đề, kết luận, chỗ hợp lệ và chỗ sai. Mọi quy tắc đều đi kèm ví dụ cụ thể và phản ví dụ.

## Triết lý biên soạn

- **Lập luận trước, thuật ngữ sau**: trước "modus tollens", cho một suy luận đời thường rồi mới gắn tên.
- **Hình thức hóa được**: mệnh đề → ký hiệu (¬ ∧ ∨ → ↔ ∀ ∃), bảng chân lý tính tay được, cây chứng minh dựng từng bước.
- **Ngụy biện = học bằng phản ví dụ**: mỗi lỗi lập luận kèm ví dụ thật + cách vạch ra.
- **Visualization tương tác**: máy dựng bảng chân lý, kiểm tra tính hợp lệ, sơ đồ Venn cho tam đoạn luận, "bắt lỗi ngụy biện" dạng quiz.

## 3 tầng

| # | Tầng | Trạng thái | Nội dung chính |
|---|------|------------|----------------|
| 1 | [Formal Logic](./01-FormalLogic/) | 🚧 Khung | Mệnh đề & bảng chân lý, liên từ, tương đương, tính hợp lệ & luật suy luận, logic vị từ, chứng minh, tam đoạn luận, quy nạp vs diễn dịch |
| 2 | [Critical Thinking](./02-CriticalThinking/) | 🚧 Khung | Cấu trúc lập luận, ngụy biện hình thức & phi hình thức, thiên kiến nhận thức, đánh giá bằng chứng, lập luận quy nạp, tranh luận & phản biện |
| 3 | [Advanced Logic & Language](./03-AdvancedLogic-Language/) | 🚧 Khung | Logic modal, nghịch lý, Gödel (preview), logic mờ, ngữ nghĩa & quy chiếu, hành vi ngôn ngữ, logic & tính toán, capstone phân tích lập luận |

🚧 Khung = đã có folder + bảng lesson (lộ trình), chưa có nội dung từng lesson.

## Đích đến

Sau 24 bài: đọc một bài xã luận / tranh luận và (1) tách được tiền đề–kết luận, (2) viết lại dưới dạng ký hiệu logic, (3) kiểm tra tính hợp lệ bằng bảng chân lý hoặc luật suy luận, (4) gọi tên ngụy biện nếu có, (5) đề xuất phiên bản lập luận mạnh hơn (steelman). Đủ nền để học tiếp logic toán, triết học phân tích, hoặc lý thuyết tranh luận.

## Cách học

1. Vào `01-FormalLogic/` (Tầng 1), đọc tuần tự `lesson-01` → `lesson-08`.
2. Mỗi lesson có `README.md` + `visualization.html` (+ `solutions.go` chỉ khi user yêu cầu).
3. Mở `Philosophy/01-FormalLogic/index.html` để xem danh sách lesson dạng card.

## Phân loại & quy ước áp dụng

Philosophy (nhánh logic) thuộc nhóm **khoa học trừu tượng/hình thức**: áp dụng đầy đủ callout 💡/❓/⚠/🔁/📝, mỗi định nghĩa ≥ 4 ví dụ cụ thể, `visualization.html` luôn có. `solutions.go` chỉ tạo khi user yêu cầu.

## Liên kết chéo

- **Logic mệnh đề & tập hợp** ↔ `DataFoundations/03-MathFoundations` (set theory & logic) và `Math/05-NumberTheory-Combinatorics-Logic`.
- **Bảng chân lý, đại số Boole** ↔ `DataFoundations/01-NumberRepresentation` (bitwise) và `Electronics/03-Digital-MCU` (cổng logic).
- **Thiên kiến nhận thức** (Tầng 2) ↔ `Psychology/01-Cognitive` (biases, Stroop, anchoring).
- **Tương quan vs nhân quả, lập luận quy nạp** ↔ `Statistics/03-Advanced` (nhân quả) và `Statistics/02-Inferential`.
- **Lý luận chiến lược & lựa chọn tập thể** ↔ `PoliticalScience/01-GameTheoryFoundations`, `02-VotingSocialChoice`.
- **Logic & tính toán** (Tầng 3) ↔ `Algorithms/tier-0-foundations`, `Programming/`.
