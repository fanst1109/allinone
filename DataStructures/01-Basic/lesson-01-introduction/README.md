# Lesson 01 — Giới thiệu về cấu trúc dữ liệu

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

### 3.4. 💡 Trực giác — ADT vs cấu trúc dữ liệu

Hình dung bạn đặt món ở quán cafe:

- **ADT** = thực đơn: bạn nói "cho tôi 1 ly cappuccino". Bạn quan tâm **kết quả nhận được**, không quan tâm máy pha kiểu nào.
- **Cấu trúc dữ liệu cụ thể** = máy pha sau quầy: nó có thể là máy bơm, máy capsule, hay pha tay. Khác cơ chế, cùng kết quả "ly cappuccino".

Hai hệ thống có thể cung cấp **cùng một ADT** nhưng dùng cấu trúc khác → hiệu năng khác. Vd `Stack`:

| Cài đặt | `push` | `pop` | Bộ nhớ phụ mỗi phần tử |
|---------|--------|-------|------------------------|
| Dynamic array | $O(1)$ amortized | $O(1)$ | Không có (chỉ giá trị) |
| Singly linked list | $O(1)$ | $O(1)$ | 1 con trỏ (~8 byte trên 64-bit) |

Cùng một interface, cùng Big-O, nhưng hằng số ẩn và cache locality khác nhau → array thường nhanh hơn trong thực tế.

### 3.5. ❓ Câu hỏi tự nhiên

- **"Tại sao phải tách ADT khỏi cài đặt?"** — để **đổi cài đặt không cần sửa code dùng**. Vd: bạn viết hàm `parse(stack Stack)`. Đổi từ array-stack sang linked-stack — không phải sửa `parse`.
- **"ADT và `interface` trong Java/Go có giống nhau?"** — Gần giống. `interface` là cách ngôn ngữ lập trình thể hiện ADT: chỉ mô tả thao tác, không quy định cài đặt.
- **"Có cấu trúc nào không gắn với một ADT nào không?"** — Hiếm. Hầu hết cấu trúc đều phục vụ một ADT (hoặc nhiều). Vd hash table phục vụ `Set` và `Map`; heap phục vụ `Priority Queue`.

## 4. Các thao tác cơ bản

Hầu hết cấu trúc dữ liệu hỗ trợ một tập thao tác sau (có thể có hoặc không tùy loại):

- **Truy cập (access)**: lấy giá trị tại một vị trí.
- **Tìm kiếm (search)**: xác định một giá trị có tồn tại hay không.
- **Thêm (insert)**: chèn một phần tử mới.
- **Xóa (delete)**: gỡ bỏ một phần tử.
- **Duyệt (traverse)**: đi qua toàn bộ phần tử.

Mỗi thao tác có một **chi phí** khác nhau tùy cấu trúc — đó là lý do ta cần khái niệm độ phức tạp.

## 5. Độ phức tạp thuật toán — Big-O (chi tiết)

### 5.1. Vì sao cần Big-O?

Khi muốn so sánh "thuật toán nào nhanh hơn", ta không thể chỉ chạy thử rồi đo thời gian, vì:

- Thời gian phụ thuộc máy tính, ngôn ngữ, trình biên dịch, OS...
- Cùng một thuật toán, nhập 10 phần tử và nhập 10 triệu phần tử có thể có "thứ hạng" khác nhau.

Ta cần một cách đo **độc lập với phần cứng**, dựa trên **số thao tác cơ bản** thuật toán phải làm theo kích thước đầu vào $n$. Đó là **độ phức tạp (complexity)**, và Big-O là ngôn ngữ phổ biến nhất để diễn tả nó.

### 5.2. Định nghĩa Big-O bằng lời

Nói "thuật toán có độ phức tạp $O(f(n))$" nghĩa là: **khi $n$ đủ lớn, số thao tác của thuật toán không vượt quá một hằng số nhân với $f(n)$**.

Ví dụ: nếu thuật toán làm $5n + 3$ thao tác, thì $5n + 3 \leq 6 \cdot n$ với mọi $n \geq 3$, nên nó là $O(n)$.

Big-O quan tâm tới **xu hướng tăng** chứ không phải con số chính xác. $5n$ và $1000n$ đều là $O(n)$; ta gọi chúng cùng "lớp tăng" (growth class).

### 5.3. Cách đếm thao tác cơ bản — ví dụ từng bước

**Ví dụ 1**: Truy cập phần tử mảng tại chỉ số $i$.
```
return arr[i]
```
- 1 thao tác duy nhất, không phụ thuộc $n$ → $O(1)$.

**Ví dụ 2**: Duyệt mảng để in toàn bộ.
```
for i from 0 to n-1:
    print(arr[i])     # mỗi lần lặp: 1 thao tác
```
- Số thao tác = $n$ → $O(n)$.

**Ví dụ 3**: Hai vòng lặp lồng nhau.
```
for i from 0 to n-1:
    for j from 0 to n-1:
        print(i, j)   # 1 thao tác
```
- Mỗi $i$ chạy $n$ lần vòng trong → tổng $n \cdot n = n^2$ → $O(n^2)$.

**Ví dụ 4**: Vòng lặp giảm một nửa mỗi bước.
```
i = n
while i > 1:
    i = i / 2
```
- $i$ đi qua dãy $n, n/2, n/4, \ldots, 1$ → khoảng $\log_2(n)$ bước → $O(\log n)$.

**Ví dụ 5**: Hai vòng lặp **nối tiếp nhau** (không lồng).
```
for i from 0 to n-1: ...    # n thao tác
for j from 0 to n-1: ...    # n thao tác
```
- Tổng $n + n = 2n$ → $O(n)$ (bỏ hằng số 2).

### 5.4. Hai quy tắc vàng

1. **Bỏ hằng số nhân**: $O(5n) = O(n)$. Lý do: Big-O đo xu hướng, không đo tốc độ tuyệt đối.
2. **Giữ bậc cao nhất**: $O(n^2 + 100n + 50) = O(n^2)$. Lý do: khi $n$ lớn, $n^2$ áp đảo $100n$ và $50$.

Trực giác: với $n = 1.000.000$:
- $n^2 = 10^{12}$ (một nghìn tỷ)
- $100n = 10^8$ (một trăm triệu)
- → $n^2$ lớn gấp $10.000$ lần. Các hạng tử nhỏ trở nên không đáng kể.

### 5.5. Bảng các lớp phức tạp phổ biến

Sắp xếp từ nhanh nhất tới chậm nhất:

| Big-O | Tên gọi | Số thao tác khi $n = 1000$ | Ví dụ thuật toán |
| --- | --- | --- | --- |
| $O(1)$ | Hằng số | 1 | Truy cập `arr[i]`, push/pop stack |
| $O(\log n)$ | Logarit | ~10 | Tìm kiếm nhị phân (binary search) |
| $O(n)$ | Tuyến tính | 1.000 | Duyệt mảng, tìm tuần tự |
| $O(n \log n)$ | Tuyến tính-log | ~10.000 | Merge sort, quick sort, heap sort |
| $O(n^2)$ | Bình phương | 1.000.000 | Bubble sort, insertion sort |
| $O(n^3)$ | Bậc ba | $10^9$ | Nhân ma trận theo cách ngây thơ |
| $O(2^n)$ | Mũ | ~$10^{300}$ | Liệt kê tập con, Tower of Hanoi |
| $O(n!)$ | Giai thừa | quá lớn để chạy nổi | Liệt kê hoán vị, brute-force TSP |

**So sánh trực quan**: nếu $O(1)$ mất 1 nano-giây và $n = 1000$:
- $O(\log n)$ ≈ 10 ns
- $O(n)$ ≈ 1 µs
- $O(n^2)$ ≈ 1 ms
- $O(2^n)$ ≈ một con số lớn hơn tuổi vũ trụ — **không thể chạy nổi**.

Bài học: với input lớn, sự khác biệt giữa $O(n)$ và $O(n^2)$ là rất lớn — và $O(2^n)$ thì gần như "không dùng được".

### 5.6. Ba trường hợp: tốt, trung bình, xấu nhất

Cùng một thuật toán có thể có chi phí khác nhau tùy dữ liệu đầu vào.

Ví dụ: tìm tuyến tính (linear search) một phần tử trong mảng $n$ phần tử.

- **Tốt nhất (best case)**: phần tử ở đầu mảng → $O(1)$.
- **Trung bình (average case)**: trung bình duyệt $n/2$ phần tử → $O(n)$.
- **Xấu nhất (worst case)**: phần tử ở cuối hoặc không tồn tại → $O(n)$.

**Khi nói chung chung "thuật toán này là $O(f(n))$", thường ngầm hiểu là trường hợp xấu nhất**, vì đó là bảo đảm an toàn nhất.

### 5.7. Big-O, Big-Θ, Big-Ω (giới thiệu nhanh)

- **Big-O ($O$)**: giới hạn **trên** — "tệ lắm cũng chỉ đến mức này".
- **Big-Ω ($\Omega$)**: giới hạn **dưới** — "ít nhất cũng tốn mức này".
- **Big-Θ ($\Theta$)**: **chặt** cả hai phía — "đúng cỡ này".

Trong thực tế nói/viết, người ta dùng $O$ cho mọi tình huống. Khi đọc bài báo hoặc sách thuật toán mới cần phân biệt.

### 5.8. Độ phức tạp không gian (space complexity)

Big-O cũng dùng để đo **bộ nhớ phụ** (extra memory) mà thuật toán dùng.

Ví dụ:
```
function sum(arr):
    s = 0                  # 1 biến
    for x in arr:
        s = s + x
    return s
```
- Thời gian: $O(n)$.
- Bộ nhớ phụ: $O(1)$ (chỉ một biến `s`, không phụ thuộc $n$).

Ngược lại, nếu thuật toán **sao chép mảng**:
```
function reverse(arr):
    result = []                       # mảng mới
    for i from n-1 down to 0:
        result.append(arr[i])
    return result
```
- Bộ nhớ phụ: $O(n)$ vì `result` lớn theo $n$.

### 5.9. Những hiểu lầm thường gặp

1. **"Big-O = thời gian chạy thực tế"** → SAI. $O(n)$ chậm hơn $O(n^2)$ khi $n = 5$, vì hằng số ẩn có thể rất lớn. Big-O chỉ đúng *khi $n$ đủ lớn*.
2. **"Thuật toán $O(1)$ luôn nhanh hơn $O(n)$"** → không đảm bảo cho $n$ nhỏ; chỉ đảm bảo cho $n$ đủ lớn.
3. **$O(2n)$ khác $O(n)$** → SAI. Bỏ hằng số → giống nhau.
4. **"Vòng lặp lồng nhau luôn $O(n^2)$"** → SAI. Nếu vòng trong chỉ chạy $\log n$ lần thì là $O(n \log n)$.

### 5.10. Quy trình tính Big-O cho một đoạn code

1. Xác định kích thước đầu vào $n$ (số phần tử mảng? độ dài chuỗi? giá trị số?).
2. Đếm số thao tác cơ bản cho mỗi cấu trúc (vòng lặp, gọi đệ quy, lệnh đơn).
3. Cộng lại → công thức theo $n$.
4. Bỏ hằng số, giữ bậc cao nhất → ra Big-O.

**Ví dụ áp dụng**:
```
function example(arr):                  # n = độ dài arr
    sum = 0                             # O(1)
    for x in arr:                       # n lần
        sum = sum + x                   # O(1) mỗi lần → tổng n vòng = O(n)
    for i in arr:                       # n lần
        for j in arr:                   # n lần
            print(i, j)                 # O(1) → tổng = O(n²)
    return sum                          # O(1)
```
Tổng: $1 + n + n^2 + 1 = n^2 + n + 2$ → **$O(n^2)$**.

### 5.11. ⚠ Lỗi thường gặp khi tính Big-O

| Lỗi | Hậu quả | Cách sửa |
|------|---------|----------|
| Cộng dồn bậc thấp vào bậc cao: viết $O(n^2 + n)$ rồi giữ nguyên | Diễn đạt rườm rà, chấm bài bị trừ điểm | Bỏ bậc thấp: $O(n^2)$ |
| Giữ hằng số: viết $O(2n)$, $O(n/2)$, $O(3n^2)$ | Sai chuẩn ký hiệu Big-O | Bỏ hằng số: $O(n)$, $O(n)$, $O(n^2)$ |
| Cho rằng "vòng lặp lồng = $O(n^2)$" mặc định | Sai khi vòng trong chạy $\log n$ hoặc phụ thuộc biến khác | Đếm thật số lần lặp vòng trong theo $n$ |
| Tính $O(\log n)$ mà không nói cơ số | Thực ra không sao: $\log_2 n$ và $\log_{10} n$ chỉ khác hằng số → cùng $O(\log n)$ | Viết $O(\log n)$, không cần $O(\log_2 n)$ |
| Áp $O(1)$ cho thao tác có hash collision tệ nhất | Nhầm "trung bình" với "xấu nhất" | Ghi rõ "amortized" / "trung bình" khi cần |
| Bỏ qua chi phí ẩn (vd copy chuỗi trong vòng lặp) | Tưởng $O(n)$ mà thực ra là $O(n^2)$ | Đọc kỹ thao tác bên trong vòng lặp |

### 5.12. 🔁 Tự kiểm tra

1. Đoạn `for i := 1; i < n; i *= 2 { ... }` chạy bao nhiêu lần?
   <details><summary>Đáp án</summary>$i$ đi qua dãy $1, 2, 4, 8, \ldots, n$ → khoảng $\log_2 n$ lần → $O(\log n)$.</details>
2. $O(n^2 + 1000n)$ rút gọn thành gì? Với $n = 10$, $n^2$ và $1000n$ cái nào lớn hơn?
   <details><summary>Đáp án</summary>Rút gọn = $O(n^2)$ (chỉ giữ bậc cao). Với $n = 10$: $n^2 = 100$, $1000n = 10000$ → $1000n$ lớn hơn. Đây là minh hoạ "Big-O chỉ đúng khi $n$ ĐỦ LỚN" — với $n$ nhỏ, hằng số ẩn có thể lấn át bậc.</details>
3. Hai thuật toán cùng $O(n \log n)$ thì chạy cùng tốc độ?
   <details><summary>Đáp án</summary>Không nhất thiết. Big-O chỉ đảm bảo "cùng lớp tăng"; hằng số ẩn có thể khác. Vd merge sort và heap sort đều $O(n \log n)$ nhưng quick sort (cũng $O(n \log n)$ trung bình) thường nhanh hơn trên thực tế vì hằng số nhỏ + cache locality tốt.</details>

### 5.13. 📝 Tóm tắt mục 5

- Big-O đo **xu hướng tăng** của số thao tác theo $n$ khi $n$ đủ lớn — độc lập với phần cứng.
- Hai quy tắc vàng: **bỏ hằng số** ($O(5n) = O(n)$), **giữ bậc cao nhất** ($O(n^2 + n) = O(n^2)$).
- Các lớp phổ biến (từ nhanh tới chậm): $O(1) < O(\log n) < O(n) < O(n \log n) < O(n^2) < O(2^n) < O(n!)$.
- Big-O thường ngầm hiểu là **worst case**; có thêm Big-Ω (giới hạn dưới) và Big-Θ (chặt cả hai phía).
- Big-O cũng dùng cho **bộ nhớ phụ** (space complexity), không chỉ thời gian.

## 6. Bảng so sánh nhanh các cấu trúc cơ bản

Để có cái nhìn tổng quát trước khi đi vào từng bài chi tiết:

| Cấu trúc | Truy cập | Tìm kiếm | Thêm | Xóa | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| Array | $O(1)$ | $O(n)$ | $O(n)$ | $O(n)$ | Kích thước cố định |
| Dynamic Array | $O(1)$ | $O(n)$ | $O(1)$* | $O(n)$ | *amortized khi thêm ở cuối |
| Linked List | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ | Nếu đã có con trỏ tới vị trí |
| Stack | — | — | $O(1)$ | $O(1)$ | LIFO |
| Queue | — | — | $O(1)$ | $O(1)$ | FIFO |
| Hash Table | $O(1)$* | $O(1)$* | $O(1)$* | $O(1)$* | *trung bình; xấu nhất $O(n)$ |
| Binary Search Tree | $O(\log n)$* | $O(\log n)$* | $O(\log n)$* | $O(\log n)$* | *khi cây cân bằng |
| Heap | — | $O(n)$ | $O(\log n)$ | $O(\log n)$ | Truy cập nhanh phần tử lớn/nhỏ nhất |

## 7. Cách chọn cấu trúc dữ liệu phù hợp

Một số câu hỏi nên đặt ra trước khi chọn:

1. **Thao tác nào diễn ra thường xuyên nhất?** (truy cập? thêm? xóa? tìm kiếm?)
2. **Dữ liệu có cần giữ thứ tự không?**
3. **Kích thước dữ liệu có biết trước không?**
4. **Có cần truy cập ngẫu nhiên (random access) không?**
5. **Bộ nhớ có là yếu tố hạn chế không?**

Không có cấu trúc nào "tốt nhất cho mọi tình huống" — luôn là sự đánh đổi (trade-off).

### 7.1. 💡 Cây quyết định nhanh — chọn cấu trúc dữ liệu

Đặt câu hỏi theo thứ tự, đến đáp án đầu tiên là dừng:

1. **Cần tra cứu/kiểm tra tồn tại trên key bất kỳ rất nhanh?** → Hash Table ($O(1)$ trung bình).
2. **Cần dữ liệu luôn được sắp xếp + tra cứu nhanh?** → Balanced BST ($O(\log n)$).
3. **Cần lấy phần tử nhỏ nhất / lớn nhất liên tục?** → Heap ($O(\log n)$ push/pop).
4. **Truy cập theo chỉ số (`arr[i]`) là thao tác chính?** → Array / Dynamic Array ($O(1)$).
5. **Chèn/xóa ở đầu rất nhiều, ít truy cập ngẫu nhiên?** → Linked List ($O(1)$ ở đầu).
6. **Vào sau ra trước (lịch sử, undo, đệ quy)?** → Stack (LIFO).
7. **Vào trước ra trước (hàng đợi, lập lịch)?** → Queue (FIFO).
8. **Quan hệ phân cấp (folder, AST, cây gia phả)?** → Tree.
9. **Quan hệ tùy ý (mạng, đường đi)?** → Graph.

### 7.2. ❓ Câu hỏi tự nhiên

- **"Vì sao có nhiều cấu trúc thế? Sao không dùng 1 cái cho tất cả?"** — Vì mỗi cấu trúc tối ưu một số thao tác và **trả giá** ở thao tác khác. Hash table nhanh tra cứu nhưng không giữ thứ tự. Array nhanh truy cập theo chỉ số nhưng chậm chèn giữa. Không tồn tại "cấu trúc thắng mọi thứ".
- **"Làm sao biết tôi đoán đúng cấu trúc?"** — Liệt kê các thao tác thường gặp trong bài toán + ước lượng tần suất → tra Big-O của thao tác đó với cấu trúc đang chọn. Cấu trúc nào có Big-O **thấp nhất ở thao tác xảy ra nhiều nhất** thường là lựa chọn tốt.
- **"Nếu chỉ có ít dữ liệu (vd 100 phần tử)?"** — Hằng số ẩn lấn át Big-O. Array tuyến tính có thể thắng cả hash table vì cache locality. Đừng tối ưu sớm.

### 7.3. 📝 Tóm tắt mục 7

- Chọn cấu trúc = **xác định thao tác thường xuyên nhất + tra Big-O của thao tác đó**.
- Luôn là **trade-off**: nhanh ở một thao tác → thường chậm ở thao tác khác.
- Với $n$ nhỏ, hằng số ẩn quan trọng hơn lớp Big-O — đừng over-engineer.
- Khi nghi ngờ: mặc định **array** cho data tuyến tính, **hash map** cho tra cứu, rồi tối ưu sau khi đo.

## 8. Tóm tắt

- Cấu trúc dữ liệu = cách tổ chức dữ liệu để xử lý hiệu quả.
- Hai nhóm lớn: tuyến tính và phi tuyến.
- Big-O dùng để so sánh chi phí của các thao tác.
- Mỗi cấu trúc có ưu/nhược điểm riêng; chọn theo bài toán cụ thể.

## Bài tập tự kiểm tra

1. Nêu ba ví dụ trong đời sống minh họa cho **stack** (ngăn xếp) và **queue** (hàng đợi).
2. Tính Big-O cho các đoạn pseudocode sau:
   - (a) Hai vòng lồng nhau, vòng trong cũng chạy $n$ lần.
     ```
     for i from 1 to n:
         for j from 1 to n:
             print(i, j)
     ```
   - (b) Vòng lặp giảm một nửa mỗi bước.
     ```
     i = n
     while i > 1:
         i = i / 2
     ```
   - (c) Vòng lặp ngoài chạy $n$, vòng trong giảm một nửa.
     ```
     for i from 1 to n:
         j = n
         while j > 1:
             j = j / 2
     ```
   - (d) Hai vòng nối tiếp, không lồng.
     ```
     for i from 1 to n: ...
     for j from 1 to n*n: ...
     ```
3. Với bài toán "kiểm tra một username đã tồn tại trong hệ thống có 10 triệu người dùng hay chưa", cấu trúc nào phù hợp nhất? Vì sao?
4. Phân biệt **ADT** và **cấu trúc dữ liệu cụ thể**. Cho ví dụ.
5. Một thuật toán dùng thêm một mảng phụ kích thước $n$ và một ma trận $n \times n$. Hỏi độ phức tạp không gian (space complexity) là bao nhiêu?
6. Vì sao $O(n + \log n) = O(n)$? Giải thích bằng quy tắc bậc cao nhất.

**Đáp án gợi ý** (thử tự làm trước khi xem):
- 2(a) $O(n^2)$ · 2(b) $O(\log n)$ · 2(c) $O(n \log n)$ · 2(d) $O(n^2)$ (vì hạng tử lớn nhất là $n^2$)
- 5: $O(n^2)$ (ma trận chiếm $n^2$ ô, lấn át mảng $n$)
- 6: Vì $n$ tăng nhanh hơn $\log n$, nên $n + \log n$ cùng lớp với $n$.

## Lời giải chi tiết

### Bài 1 — Ví dụ stack và queue trong đời sống

**Stack (LIFO)**:
- Chồng đĩa: lấy đĩa luôn từ trên cùng.
- Lịch sử trình duyệt (nút Back): trang vừa thăm cuối cùng quay lại trước.
- Hộp đạn / băng đạn: viên nạp sau bắn ra trước.

**Queue (FIFO)**:
- Hàng người mua vé: ai đến trước được phục vụ trước.
- Hàng in tài liệu của máy in: lệnh gửi trước in trước.
- Đường ống nước: nước vào đầu này, ra đầu kia.

### Bài 2 — Big-O của các đoạn pseudocode

- **(a)** Hai vòng $n \times n$ → tổng $n^2$ thao tác → $O(n^2)$.
- **(b)** $i$ đi qua $n, n/2, n/4, \ldots, 1$ (chia đôi mỗi bước) → $\log_2 n$ bước → $O(\log n)$.
- **(c)** Vòng ngoài chạy $n$ lần, vòng trong là $O(\log n)$ → tổng $n \cdot \log n$ → $O(n \log n)$.
- **(d)** $n + n^2 = n^2 + n$ → giữ bậc cao nhất → $O(n^2)$.

### Bài 3 — Tìm username trong 10 triệu user

Dùng **hash table (HashSet)** chứa toàn bộ username:
- Kiểm tra $O(1)$ trung bình.
- 10 triệu chuỗi vẫn vừa RAM thực tế.

Nếu dùng array tuần tự: $O(n)$ = 10 triệu thao tác mỗi truy vấn — quá chậm cho hệ thống có nhiều request đồng thời.

Nếu cần *cả* truy vấn theo tiền tố (vd "ali..." → liệt kê alice, alex...) → dùng **trie** ([Lesson 05](../../02-Intermediate/lesson-05-trie/)).

### Bài 4 — ADT vs cấu trúc dữ liệu cụ thể

- **ADT (Abstract Data Type)**: định nghĩa **"làm được gì"** — tập thao tác và bất biến. Không quy định cài đặt.
- **Cấu trúc dữ liệu cụ thể**: cách cài đặt thật trong bộ nhớ.

Ví dụ:
- ADT `Stack` = `{push, pop, peek, isEmpty}`. Cài đặt: bằng array, bằng linked list — đều thỏa.
- ADT `List` = `{get, set, add, remove}`. Cài đặt: ArrayList, LinkedList.
- ADT `Map` = `{put, get, remove}`. Cài đặt: HashMap, TreeMap.

### Bài 5 — Space complexity

- Mảng phụ kích thước $n$ chiếm $O(n)$.
- Ma trận $n \times n$ chiếm $O(n^2)$.
- Tổng $O(n + n^2) = O(n^2)$ (bậc cao nhất).

### Bài 6 — Vì sao `O(n + log n) = O(n)`?

Với $n$ lớn, $n$ luôn lớn hơn nhiều so với $\log n$. Tỷ lệ $\log n / n \to 0$ khi $n \to \infty$. Do đó $\log n$ là "bậc thấp" so với $n$, theo quy tắc bậc cao nhất → bỏ đi.

Số liệu cụ thể: $n = 10^6$ thì $\log_2 n \approx 20$, tỷ lệ $20/10^6 = 0{,}00002$ — gần như không đóng góp.

## Code & Minh họa

- [solutions.go](./solutions.go) — minh họa đếm thao tác và so sánh số bước của các lớp Big-O bằng Go.
- [visualization.html](./visualization.html) — biểu đồ tương tác so sánh tốc độ tăng của các hàm Big-O theo $n$.

## Tham khảo & bài tiếp theo

- Bài tiếp theo: [Lesson 02 — Array](../lesson-02-array/).
- Đọc thêm: chương đầu của *Introduction to Algorithms* (Cormen) hoặc *Data Structures and Algorithms in Java* (Goodrich).
