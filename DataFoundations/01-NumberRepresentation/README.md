# Nhóm 1 — Biểu diễn số & bit — Biểu diễn số và thao tác bit

Cách máy tính biểu diễn số và thao tác trực tiếp trên bit — nền cho bitmask, hashing, và hiểu giới hạn của kiểu số nguyên.

## Mục tiêu

- Hiểu hệ nhị phân, hệ thập lục phân và two's complement.
- Giải thích vì sao `int64` chỉ tới ~9.2·10¹⁸ (overflow).
- Dùng thành thạo AND/OR/XOR/NOT/shift và các trick bitmask (popcount, `x & -x`).

## Lộ trình 2 bài

| Bài | Chủ đề | Khái niệm chính |
|-----|--------|-----------------|
| [Lesson 01](./lesson-01-binary-hex/) | Binary & Hex | Hệ cơ số, two's complement, overflow, kích thước `intN` |
| [Lesson 02](./lesson-02-bitwise-ops/) | Bitwise Operations | AND/OR/XOR/NOT/shift, bitmask, popcount |

Mỗi bài có:
- **README.md**: lý thuyết + ví dụ số cụ thể + bài tập + **lời giải chi tiết**.
- **solutions.go**: code Go biên dịch được (`go run solutions.go`).
- **visualization.html**: trang tương tác, mở trực tiếp trong trình duyệt là chạy. Có nút **📖 Đọc README** để xem lý thuyết song song.

## Mở trang chủ nhóm

[`index.html`](./index.html) — danh sách card cho tất cả bài, link nhanh tới visualization và README.

## Sau khi xong nhóm này

Sang **Nhóm 2 — Lý thuyết tập hợp** ([02-SetTheory](../02-SetTheory/)).
