# OperatingSystems — Hệ điều hành

Lộ trình **hệ điều hành (operating system)** từ tiến trình chạy trên CPU tới bộ nhớ ảo, hệ thống file và ảo hoá hiện đại. 3 tầng × 8 bài = 24 bài, đi từ tiến trình & lập lịch, qua quản lý bộ nhớ & lưu trữ, rồi tới ảo hoá, container và vận hành thực tế.

## Triết lý

- **Thấy được trước, đào sâu sau**: bắt đầu từ thứ quen thuộc (mở một chương trình, máy chạy nhiều app cùng lúc) rồi mới bóc xem kernel điều phối ra sao.
- **Cụ thể bằng số thật**: thời gian chờ tính ra mili-giây trên Gantt chart, địa chỉ ảo dịch ra frame bằng phép chia/mod thật, số page fault đếm từng tham chiếu — không dừng ở sơ đồ trừu tượng.
- **Trực giác đời thường**: tiến trình ↔ một đầu bếp có bếp riêng, scheduler ↔ người điều phối lượt nấu, bộ nhớ ảo ↔ thủ thư tra mục lục để tìm sách trong kho, deadlock ↔ hai xe kẹt ở ngã tư ai cũng chờ ai.
- **Visualization tương tác**: tự tay đổi thuật toán lập lịch và xem Gantt chart đổi theo, dịch địa chỉ ảo từng bước, chạy thuật toán thay trang, xem đầu đọc đĩa di chuyển, dò chu trình deadlock.

## 3 tầng

| # | Tầng | Trạng thái | Nội dung chính |
|---|------|------------|----------------|
| 1 | [Foundations & Processes](./01-Foundations-Processes/) | ✅ Hoàn thành | Kernel & system call, tiến trình, thread, lập lịch CPU, đồng bộ hoá, semaphore, deadlock, IPC |
| 2 | [Memory & Storage](./02-Memory-Storage/) | ✅ Hoàn thành | Quản lý bộ nhớ, paging, TLB & bảng trang nhiều cấp, bộ nhớ ảo, thay trang, filesystem, I/O & disk scheduling, lưu trữ hiện đại |
| 3 | [Advanced & Modern](./03-Advanced-Modern/) | ✅ Hoàn thành | Ảo hoá, container, bảo mật OS, lập lịch đa nhân/NUMA, real-time, boot & driver, quan sát & hiệu năng, capstone |

## Đích đến

Sau 24 bài: hiểu trọn vẹn cách một hệ điều hành biến một CPU + một thanh RAM thành ảo giác "nhiều chương trình chạy song song, mỗi chương trình có cả bộ nhớ riêng vô tận"; giải được Gantt chart cho mọi thuật toán lập lịch; dịch được địa chỉ ảo qua bảng trang nhiều cấp + TLB; chạy tay các thuật toán thay trang và disk scheduling; giải thích race condition, semaphore, deadlock; phân biệt container với máy ảo — đủ nền cho môn Hệ điều hành đại học, phỏng vấn backend/SRE/DevOps, và hiểu được hệ thống Linux thật dưới nắp ca-pô.

## Cách học

1. Vào `01-Foundations-Processes/` (Tầng 1), đọc theo thứ tự `lesson-01` → `lesson-08`.
2. Mỗi lesson có `README.md` + `visualization.html` (+ `solutions.go` khi bạn yêu cầu).
3. Mở `OperatingSystems/01-Foundations-Processes/index.html` để xem danh sách lesson dạng card.

## Liên kết chéo

- Biểu diễn nhị phân/hex, bitwise cho địa chỉ & page offset, bitmap quản lý frame ↔ [`DataFoundations/`](../DataFoundations/).
- Lập lịch là bài toán hàng đợi & greedy; bảng trang dùng cây/hash; thay trang dùng queue/stack ↔ [`Algorithms/`](../Algorithms/), [`DataStructures/`](../DataStructures/).
- Goroutine vs thread, mutex, channel, race detector trong Go ↔ [`Programming/`](../Programming/).
- Page cache, journaling ↔ WAL, điều khiển đồng thời (concurrency control) của giao dịch ↔ [`Databases/`](../Databases/).
- Socket, IPC qua mạng, pipe ↔ [`Networking/`](../Networking/).
- Cô lập, phân quyền, sandbox, leo thang đặc quyền ↔ [`Cryptography/`](../Cryptography/).
- Ngắt (interrupt), DMA, bus, thanh ghi ↔ [`Electronics/`](../Electronics/).
