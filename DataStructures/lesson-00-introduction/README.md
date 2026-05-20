# Lesson 00 — Giới thiệu về cấu trúc dữ liệu

## Mục tiêu học tập

Sau khi hoàn thành bài này, bạn sẽ:

- Hiểu **cấu trúc dữ liệu (data structure)** là gì và tại sao chúng quan trọng.
- Phân biệt được hai nhóm chính: cấu trúc dữ liệu **tuyến tính (linear)** và **phi tuyến (non-linear)**.
- Làm quen với khái niệm **độ phức tạp thuật toán (algorithmic complexity)** thông qua ký hiệu Big-O.
- Có cái nhìn tổng quan về các cấu trúc sẽ học ở các bài sau.

## Kiến thức tiền đề

- Biết một ngôn ngữ lập trình bất kỳ ở mức cơ bản (biến, vòng lặp, hàm, mảng).
- Hiểu khái niệm "bộ nhớ" và "địa chỉ ô nhớ" ở mức trực giác.

## 1. Cấu trúc dữ liệu là gì?

**Cấu trúc dữ liệu** là cách *tổ chức* và *lưu trữ* dữ liệu trong máy tính sao cho có thể sử dụng dữ liệu đó một cách **hiệu quả**.

Một cách hình dung đơn giản: hãy tưởng tượng bạn có 1000 quyển sách.

- Nếu vứt chúng đống lên sàn → cần tìm một quyển sẽ rất chậm.
- Nếu xếp lên kệ theo thứ tự bảng chữ cái → tìm nhanh hơn nhiều.
- Nếu thêm một danh mục (index) bên cạnh → còn nhanh hơn nữa.

Cách *xếp sách* chính là cấu trúc dữ liệu. Cách *tìm sách* chính là **thuật toán (algorithm)**. Cấu trúc dữ liệu và thuật toán luôn đi cùng nhau.

## 2. Vì sao cần cấu trúc dữ liệu?

Cùng một bài toán, chọn đúng cấu trúc có thể giúp chương trình:

- **Nhanh hơn** hàng nghìn, hàng triệu lần.
- **Tiêu tốn ít bộ nhớ hơn**.
- **Code rõ ràng, dễ bảo trì hơn**.

Ví dụ: kiểm tra một phần tử có trong tập hợp 1 triệu phần tử hay không —
- Dùng **mảng (array)** chưa sắp xếp: trung bình duyệt 500.000 phần tử.
- Dùng **hash set**: gần như chỉ 1 thao tác.

## 3. Phân loại cấu trúc dữ liệu

### 3.1. Theo cách tổ chức

| Nhóm | Đặc điểm | Ví dụ |
| --- | --- | --- |
| **Tuyến tính (linear)** | Các phần tử xếp thành dãy, mỗi phần tử có một phần tử kế tiếp duy nhất | Array, Linked List, Stack, Queue |
| **Phi tuyến (non-linear)** | Một phần tử có thể liên kết với nhiều phần tử khác | Tree, Graph |

### 3.2. Theo cách cấp phát bộ nhớ

- **Tĩnh (static)**: kích thước cố định khi khai báo. Ví dụ: mảng tĩnh.
- **Động (dynamic)**: kích thước thay đổi trong quá trình chạy. Ví dụ: linked list, dynamic array (`ArrayList` trong Java, `list` trong Python, `vector` trong C++).

### 3.3. Theo tính chất trừu tượng (Abstract Data Type — ADT)

ADT mô tả **"làm được gì"**, còn cấu trúc dữ liệu mô tả **"làm bằng cách nào"**.

Ví dụ: `Stack` là một ADT (chỉ cần `push`, `pop`, `top`); nó có thể hiện thực bằng **mảng** hoặc bằng **linked list**.

## 4. Các thao tác cơ bản

Hầu hết cấu trúc dữ liệu hỗ trợ một tập thao tác sau (có thể có hoặc không tùy loại):

- **Truy cập (access)**: lấy giá trị tại một vị trí.
- **Tìm kiếm (search)**: xác định một giá trị có tồn tại hay không.
- **Thêm (insert)**: chèn một phần tử mới.
- **Xóa (delete)**: gỡ bỏ một phần tử.
- **Duyệt (traverse)**: đi qua toàn bộ phần tử.

Mỗi thao tác có một **chi phí** khác nhau tùy cấu trúc — đó là lý do ta cần khái niệm độ phức tạp.

## 5. Độ phức tạp thuật toán — Big-O

**Big-O** là ký hiệu mô tả **giới hạn trên** của chi phí (thời gian hoặc bộ nhớ) khi kích thước đầu vào `n` lớn dần.

Một vài lớp phổ biến, sắp xếp từ nhanh đến chậm:

| Big-O | Tên gọi | Ví dụ |
| --- | --- | --- |
| `O(1)` | Hằng số (constant) | Truy cập phần tử của mảng theo chỉ số |
| `O(log n)` | Logarit | Tìm kiếm nhị phân (binary search) |
| `O(n)` | Tuyến tính | Duyệt mảng để tìm phần tử |
| `O(n log n)` | Tuyến tính-log | Sắp xếp trộn (merge sort), quick sort |
| `O(n²)` | Bình phương | Sắp xếp nổi bọt (bubble sort) |
| `O(2ⁿ)` | Mũ | Liệt kê toàn bộ tập con |

Quy tắc khi đọc Big-O:

1. **Bỏ hằng số**: `O(3n)` viết là `O(n)`.
2. **Giữ bậc cao nhất**: `O(n² + n)` viết là `O(n²)`.
3. Quan tâm tới hành vi khi `n` rất lớn, không phải `n` nhỏ.

## 6. Bảng so sánh nhanh các cấu trúc cơ bản

Để có cái nhìn tổng quát trước khi đi vào từng bài chi tiết:

| Cấu trúc | Truy cập | Tìm kiếm | Thêm | Xóa | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| Array | `O(1)` | `O(n)` | `O(n)` | `O(n)` | Kích thước cố định |
| Dynamic Array | `O(1)` | `O(n)` | `O(1)`* | `O(n)` | *amortized khi thêm ở cuối |
| Linked List | `O(n)` | `O(n)` | `O(1)` | `O(1)` | Nếu đã có con trỏ tới vị trí |
| Stack | — | — | `O(1)` | `O(1)` | LIFO |
| Queue | — | — | `O(1)` | `O(1)` | FIFO |
| Hash Table | `O(1)`* | `O(1)`* | `O(1)`* | `O(1)`* | *trung bình; xấu nhất `O(n)` |
| Binary Search Tree | `O(log n)`* | `O(log n)`* | `O(log n)`* | `O(log n)`* | *khi cây cân bằng |
| Heap | — | `O(n)` | `O(log n)` | `O(log n)` | Truy cập nhanh phần tử lớn/nhỏ nhất |

## 7. Cách chọn cấu trúc dữ liệu phù hợp

Một số câu hỏi nên đặt ra trước khi chọn:

1. **Thao tác nào diễn ra thường xuyên nhất?** (truy cập? thêm? xóa? tìm kiếm?)
2. **Dữ liệu có cần giữ thứ tự không?**
3. **Kích thước dữ liệu có biết trước không?**
4. **Có cần truy cập ngẫu nhiên (random access) không?**
5. **Bộ nhớ có là yếu tố hạn chế không?**

Không có cấu trúc nào "tốt nhất cho mọi tình huống" — luôn là sự đánh đổi (trade-off).

## 8. Tóm tắt

- Cấu trúc dữ liệu = cách tổ chức dữ liệu để xử lý hiệu quả.
- Hai nhóm lớn: tuyến tính và phi tuyến.
- Big-O dùng để so sánh chi phí của các thao tác.
- Mỗi cấu trúc có ưu/nhược điểm riêng; chọn theo bài toán cụ thể.

## Bài tập tự kiểm tra

1. Nêu ba ví dụ trong đời sống minh họa cho **stack** (ngăn xếp) và **queue** (hàng đợi).
2. Cho hàm sau (pseudocode), độ phức tạp Big-O là bao nhiêu?
   ```
   for i from 1 to n:
       for j from 1 to n:
           print(i, j)
   ```
3. Với bài toán "kiểm tra một username đã tồn tại trong hệ thống có 10 triệu người dùng hay chưa", cấu trúc nào phù hợp nhất? Vì sao?
4. Phân biệt **ADT** và **cấu trúc dữ liệu cụ thể**. Cho ví dụ.

## Tham khảo & bài tiếp theo

- Bài tiếp theo: *(chưa có — sẽ là `lesson-01` về Array)*.
- Đọc thêm: chương đầu của *Introduction to Algorithms* (Cormen) hoặc *Data Structures and Algorithms in Java* (Goodrich).
