// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: DataFoundations/02-EncodingMemory/lesson-04-compression/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Data Compression (nén dữ liệu)

> **Nhóm 2 — Encoding & Memory · DataFoundations**

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Phân biệt **nén không mất dữ liệu (lossless)** và **nén có mất dữ liệu (lossy)** — khi nào dùng cái nào.
- Hiểu **entropy Shannon** là gì và vì sao nó là **cận dưới lý thuyết** của mọi bộ nén lossless.
- Nén/giải nén bằng **RLE (Run-Length Encoding)** bằng tay, và biết khi nào RLE **phình** thay vì co.
- Dựng **cây Huffman** từng bước từ bảng tần suất, đọc ra bảng mã, tính tổng số bit và so với mã cố định.
- Giải thích vì sao **prefix-free code** giải mã không nhập nhằng.
- Hiểu sơ lược **LZ77/LZ78** (từ điển, cửa sổ trượt) — nền tảng của ZIP/gzip/PNG.

## Kiến thức tiền đề

- [Lesson 01 — Character Encoding](../lesson-01-character-encoding/): hiểu một ký tự ASCII chiếm 8 bit (1 byte). Đây là mốc để so "nén được bao nhiêu".
- [DataStructures — Heap & Priority Queue](../../../DataStructures/02-Intermediate/lesson-03-heap-priority-queue/): cây Huffman dựng bằng cách lặp lại "lấy 2 phần tử nhỏ nhất" — đúng là việc của priority queue (min-heap).
- [DataStructures — Tree](../../../DataStructures/02-Intermediate/lesson-01-tree/): cây Huffman là một cây nhị phân; mã của ký tự là đường đi từ gốc tới lá.

---

## 1. Vấn đề: vì sao file nén nhỏ đi 10 lần mà không mất chữ?

💡 **Trực giác**: Tưởng tượng bạn ghi chú lớp học: thay vì viết "rất rất rất quan trọng" bạn viết "rất ×3 quan trọng". Cùng một thông tin, ít chữ hơn. **Nén dữ liệu** là tự động hóa đúng ý tưởng đó: tìm phần **lặp lại / dễ đoán** trong dữ liệu rồi viết gọn lại, sao cho **khôi phục được nguyên gốc**.

Mở bài bằng một câu hỏi cụ thể:

> **Câu hỏi**: Một file text 1000 ký tự nhưng lặp đi lặp lại rất nhiều (\`"aaaa...bbbb...aaaa..."\`). Khi ZIP, nó nhỏ đi gần 10 lần. **Vì sao ZIP nhỏ thế mà mở ra không mất một chữ nào?**

**Trả lời ngay trong bài này** (không bỏ ngỏ):

1. File gốc dùng **mã cố định**: mỗi ký tự ASCII = 8 bit, bất kể ký tự đó hiếm hay phổ biến. 1000 ký tự = 8000 bit, dù 950 ký tự trong đó chỉ là \`a\`.
2. Bộ nén nhận ra \`a\` xuất hiện cực nhiều → gán cho \`a\` một mã **rất ngắn** (vd 1 bit), gán cho ký tự hiếm một mã dài hơn. Đây là ý tưởng của **mã Huffman** (mục 4).
3. Bộ nén còn nhận ra cả **cụm lặp lại** (\`"aaaa"\`) và thay bằng tham chiếu "lặp lại đoạn vừa rồi" — ý tưởng của **LZ77** (mục 6). ZIP/gzip kết hợp cả hai (LZ77 + Huffman = thuật toán DEFLATE).
4. Vì mọi phép trên đều **đảo ngược được**, giải nén khôi phục **đúng từng bit** → không mất chữ nào. Đó là **lossless**.

### 1.1 Lossless vs Lossy — hai thế giới khác nhau

| | **Lossless (không mất)** | **Lossy (có mất)** |
|---|---|---|
| Khôi phục | **Đúng từng bit** so với gốc | **Gần giống** gốc, đã bỏ chi tiết khó nhận ra |
| Dùng cho | Text, mã nguồn, file \`.exe\`, dữ liệu y tế, ZIP | Ảnh (JPEG), nhạc (MP3), video (H.264) |
| Tỉ lệ nén | Vừa phải (2×–10× với text lặp) | Rất cao (10×–100×) |
| Ví dụ | gzip, PNG, FLAC, Huffman, LZ77 | JPEG, MP3, AAC, H.264 |

💡 **Vì sao có lossy?** Với text, bỏ một ký tự = sai nghĩa → bắt buộc lossless. Nhưng với ảnh, mắt người **không phân biệt** được hai sắc xanh chênh nhau 1/256 → bỏ phần chênh đó đi vẫn "nhìn y hệt" mà file nhỏ hơn nhiều. Lossy đánh đổi **độ chính xác mắt-không-thấy** lấy **kích thước nhỏ**. (Chi tiết JPEG xem [SignalProcessing — nén ảnh / 2D Fourier](../../../SignalProcessing/03-Applied/lesson-03-image-2d-fourier/).)

⚠ **Lỗi thường gặp**: nén lossy nhiều lần (mở JPEG → sửa → lưu JPEG → lặp lại) làm ảnh **xuống cấp tích lũy** (generation loss), vì mỗi lần lưu lại bỏ thêm chi tiết. Lossless lưu bao nhiêu lần cũng không đổi.

❓ **Câu hỏi tự nhiên của người đọc**:
- *"Có nén được mọi file nhỏ hơn không?"* — **Không**. Không tồn tại bộ nén lossless làm **mọi** file nhỏ đi (xem mục 2, "no free lunch"). Dữ liệu **ngẫu nhiên** (vd file đã nén/đã mã hóa) gần như không nén thêm được.
- *"Nén 2 lần có nhỏ hơn không?"* — Hầu như không. Sau lần 1, output trông như ngẫu nhiên với bộ nén → lần 2 vô ích, thậm chí phình nhẹ vì header.

🔁 **Dừng lại tự kiểm tra**:
<details><summary>Vì sao text lặp nhiều thì nén tốt, còn file ngẫu nhiên thì không?</summary>

Nén khai thác **tính dễ đoán (redundancy)**: ký tự/cụm nào xuất hiện nhiều thì gán mã ngắn, cụm lặp thì tham chiếu. File ngẫu nhiên không có ký tự nào "phổ biến hơn" và không có cụm lặp → không có gì để rút gọn. Đo lường chính xác "độ khó đoán" này là **entropy** (mục 2).
</details>

📝 **Tóm tắt mục 1**:
- Nén = tìm phần lặp lại / dễ đoán rồi viết gọn, sao cho khôi phục được.
- **Lossless** khôi phục đúng từng bit (text, code); **lossy** chấp nhận sai chi tiết mắt-không-thấy để nén mạnh (ảnh, nhạc).
- Không bộ nén nào làm **mọi** file nhỏ đi; ngẫu nhiên ≈ không nén được.

---

## 2. Entropy (Shannon) — cận dưới lý thuyết của nén

### 2.1 Định nghĩa entropy (3 phần)

**(a) Là gì** — Entropy $H$ của một nguồn (source) là **số bit trung bình tối thiểu** cần để mã hóa một ký hiệu (symbol) phát ra từ nguồn đó. Công thức Shannon:

$$H = -\\sum_{i} p_i \\log_2 p_i \\quad \\text{(bit / ký hiệu)}$$

trong đó $p_i$ là xác suất xuất hiện của ký hiệu thứ $i$.

**(b) Vì sao cần** — Trước khi ngồi viết bộ nén, ta muốn biết **giới hạn**: nén tốt nhất có thể đạt tới đâu? Entropy trả lời chính xác câu đó. Nó cho biết "sàn" — **không bộ nén lossless nào** trung bình dùng ít hơn $H$ bit/ký hiệu (định lý mã hóa nguồn của Shannon). Đây là lý do entropy là khái niệm gốc của cả lĩnh vực.

**(c) Ví dụ trực giác bằng số cụ thể** — Tung một đồng xu **cân** (mặt sấp/ngửa đều 50%): mỗi lần tung bạn cần đúng **1 bit** để ghi kết quả (0 = sấp, 1 = ngửa). Tính ra: $H = -(0.5\\log_2 0.5 + 0.5\\log_2 0.5) = -(0.5\\cdot(-1) + 0.5\\cdot(-1)) = 1$ bit. Khớp trực giác. Nhưng nếu đồng xu **gian**, ra ngửa 99% thời gian, thì hầu hết lần tung là "ngửa" → bạn gần như **đoán được** → cần **ít hơn 1 bit** trung bình để ghi (xem ví dụ 4 bên dưới).

💡 **Trực giác cốt lõi**: $-\\log_2 p_i$ là **"độ bất ngờ" (surprisal)** của ký hiệu $i$. Ký hiệu càng hiếm ($p$ nhỏ) → bất ngờ càng lớn → cần nhiều bit để báo "đã xảy ra". Entropy là **độ bất ngờ trung bình**. Sự kiện chắc chắn ($p=1$) có $-\\log_2 1 = 0$ bit — không bất ngờ gì, không cần bit nào.

### 2.2 Bốn ví dụ số cụ thể

**Ví dụ 1 — 2 ký hiệu đều nhau** ($p_A = p_B = 0.5$):
$$H = -(0.5\\log_2 0.5 + 0.5\\log_2 0.5) = -(0.5\\cdot(-1)\\cdot 2) = 1 \\text{ bit/ký hiệu}.$$
Không nén được dưới 1 bit/ký hiệu — đã tối ưu.

**Ví dụ 2 — 4 ký hiệu đều nhau** ($p = 0.25$ mỗi cái):
$$H = -4\\cdot(0.25\\log_2 0.25) = -4\\cdot(0.25\\cdot(-2)) = 2 \\text{ bit/ký hiệu}.$$
Khớp với mã cố định 2 bit (\`00,01,10,11\`). Khi mọi ký hiệu **đều nhau**, mã cố định đã tối ưu, không nén thêm được.

**Ví dụ 3 — phân bố lệch** ($p_A = 0.5,\\ p_B = 0.25,\\ p_C = 0.125,\\ p_D = 0.125$):
$$
\\begin{aligned}
H &= -(0.5\\log_2 0.5 + 0.25\\log_2 0.25 + 0.125\\log_2 0.125 + 0.125\\log_2 0.125) \\\\
  &= -(0.5\\cdot(-1) + 0.25\\cdot(-2) + 0.125\\cdot(-3) + 0.125\\cdot(-3)) \\\\
  &= -(-0.5 - 0.5 - 0.375 - 0.375) = 1.75 \\text{ bit/ký hiệu}.
\\end{aligned}
$$
Mã cố định cần $\\log_2 4 = 2$ bit/ký hiệu. Entropy chỉ 1.75 → **có chỗ để nén** ~12.5%. Mã Huffman (mục 4) sẽ đạt đúng 1.75 bit ở phân bố này.

**Ví dụ 4 — phân bố cực lệch** ($p_A = 0.99,\\ p_B = 0.01$):
$$
H = -(0.99\\log_2 0.99 + 0.01\\log_2 0.01) = -(0.99\\cdot(-0.0145) + 0.01\\cdot(-6.644)) \\approx 0.0144 + 0.0664 = 0.0808 \\text{ bit/ký hiệu}.
$$
Chỉ ~0.08 bit/ký hiệu! Một chuỗi 1000 ký hiệu kiểu này về lý thuyết nén xuống ~81 bit ≈ 10 byte. Đây chính là lý do file lặp nhiều ZIP nhỏ kinh khủng.

### 2.3 Walk-through chi tiết tính H cho một chuỗi thật

Cho chuỗi \`"AAAABBC"\` (7 ký tự). Đếm tần suất:

| Ký hiệu | Số lần | $p_i$ | $\\log_2 p_i$ | $-p_i\\log_2 p_i$ |
|---|---|---|---|---|
| A | 4 | 4/7 ≈ 0.5714 | −0.8074 | 0.4614 |
| B | 2 | 2/7 ≈ 0.2857 | −1.8074 | 0.5164 |
| C | 1 | 1/7 ≈ 0.1429 | −2.8074 | 0.4011 |

$$H = 0.4614 + 0.5164 + 0.4011 \\approx 1.379 \\text{ bit/ký hiệu}.$$

Tổng cận dưới cho cả chuỗi: $7 \\times 1.379 \\approx 9.65$ bit. Mã cố định 2 bit/ký hiệu (3 ký hiệu cần $\\lceil\\log_2 3\\rceil = 2$ bit) tốn $7\\times 2 = 14$ bit. Entropy nói: tốt nhất có thể đạt gần ~10 bit.

⚠ **Entropy là CẬN DƯỚI, không phải con số nén thực**: bộ nén thực (Huffman) thường **không đạt đúng** $H$ vì mã phải dùng **số bit nguyên** cho mỗi ký hiệu, còn $H$ cho phép số bit thập phân. Huffman luôn nằm trong khoảng $[H,\\ H+1)$ bit/ký hiệu. Muốn ép sát $H$ hơn cần Arithmetic Coding / Range Coding (ngoài phạm vi bài này).

❓ **Câu hỏi tự nhiên**:
- *"Tại sao log cơ số 2?"* — Vì ta đo bằng **bit** (đơn vị nhị phân). Cơ số 2 ⇒ đơn vị bit; cơ số $e$ ⇒ "nat"; cơ số 10 ⇒ "dit". Bit là chuẩn trong tin học.
- *"$H$ phụ thuộc nội dung hay chỉ phân bố?"* — Chỉ **phân bố tần suất**, không phụ thuộc thứ tự. \`"AAAB"\` và \`"ABAA"\` cùng $H$. (Đây là hạn chế của mô hình "không nhớ"; bộ nén thực như LZ khai thác cả **thứ tự/cụm lặp** nên có thể vượt qua "entropy theo ký tự đơn" này.)

🔁 **Dừng lại tự kiểm tra**:
<details><summary>Một chuỗi chỉ gồm một ký tự lặp lại 1000 lần (vd "aaaa...a") có entropy bao nhiêu?</summary>

$p_a = 1$, nên $H = -1\\cdot\\log_2 1 = -1\\cdot 0 = 0$ bit/ký hiệu. Hoàn toàn đoán được → không cần bit nào để mô tả "ký hiệu tiếp theo là gì" (chỉ cần lưu "lặp a 1000 lần"). Đây đúng là điều RLE khai thác (mục 3).
</details>

📝 **Tóm tắt mục 2**:
- $H = -\\sum p_i\\log_2 p_i$ = số bit trung bình **tối thiểu** / ký hiệu.
- Phân bố **đều** → $H$ lớn (khó nén); phân bố **lệch** → $H$ nhỏ (dễ nén).
- $H$ là **cận dưới**: không bộ nén lossless nào trung bình dùng ít hơn. Huffman đạt trong $[H, H+1)$.
- Ký tự lặp một loại → $H=0$.

---

## 3. RLE — Run-Length Encoding

💡 **Trực giác**: Thay vì viết \`"AAAA"\`, viết \`"4A"\` ("bốn chữ A"). RLE thay mỗi **dãy lặp liên tiếp (run)** bằng cặp \`(số_lần, ký_tự)\`. Cực đơn giản, là bộ nén lossless tối giản nhất.

### 3.1 Walk-through số

\`"AAAABBBCC"\` (9 ký tự):

| Run | Mã hóa |
|---|---|
| \`AAAA\` (4 lần A) | \`4A\` |
| \`BBB\` (3 lần B) | \`3B\` |
| \`CC\` (2 lần C) | \`2C\` |

Kết quả: \`"4A3B2C"\` — 6 ký tự thay vì 9. Tỉ lệ nén 9/6 = 1.5×.

**Giải nén** đảo ngược: đọc \`(4, A)\` → in \`AAAA\`; \`(3, B)\` → \`BBB\`; \`(2, C)\` → \`CC\` → ghép lại \`"AAAABBBCC"\` đúng gốc.

### 3.2 Bốn ví dụ (đủ cả tốt lẫn xấu)

| Gốc | RLE | Gốc dài | RLE dài | Kết luận |
|---|---|---|---|---|
| \`WWWWWWWWWW\` (10 W) | \`10W\` | 10 | 3 | Nén mạnh 3.3× |
| \`AAAABBBCC\` | \`4A3B2C\` | 9 | 6 | Nén 1.5× |
| \`AABBCCDD\` | \`2A2B2C2D\` | 8 | 8 | Hòa — không lợi |
| \`ABCDEF\` | \`1A1B1C1D1E1F\` | 6 | 12 | **Phình gấp đôi!** |

⚠ **Lỗi/cạm bẫy — RLE phình khi không lặp**: với dữ liệu **không có run** (\`"ABCDEF"\`), RLE phải ghi \`1\` trước mỗi ký tự → output **dài gấp đôi** input. Đây là minh chứng cụ thể cho "no free lunch" ở mục 1: một bộ nén làm dữ liệu lặp nhỏ đi thì **bắt buộc** làm dữ liệu khác phình ra.

**Cách khắc phục thực tế**: PackBits (dùng trong TIFF/PDF) thêm cờ phân biệt "đoạn lặp" và "đoạn literal", để đoạn không lặp chỉ phình tối thiểu (+1 byte cho mỗi 128 ký tự) thay vì gấp đôi.

❓ **Câu hỏi tự nhiên**:
- *"RLE dùng thật ở đâu?"* — Fax (đường đen/trắng dài), ảnh BMP/TIFF, sprite game cũ, và là **bước con** trong JPEG (RLE trên hệ số DCT đã lượng tử hóa). Hiệu quả nhất với dữ liệu **nhiều vùng đồng nhất**.
- *"Số đếm lớn hơn 9 thì sao?"* — Trong cài đặt nhị phân, count dùng 1 byte (tối đa 255). Run dài hơn 255 chia thành nhiều cặp. Trong demo text bài này ta cho phép số nhiều chữ số.

🔁 **Dừng lại tự kiểm tra**:
<details><summary>RLE chuỗi "MMMMMNN" và tính tỉ lệ nén.</summary>

\`MMMMM\` = \`5M\`, \`NN\` = \`2N\` → \`"5M2N"\`. Gốc 7 ký tự, nén 4 ký tự, tỉ lệ 7/4 = 1.75×.
</details>

📝 **Tóm tắt mục 3**:
- RLE thay mỗi run lặp bằng \`(count, ký_tự)\`.
- Tốt với dữ liệu nhiều vùng đồng nhất; **phình** khi không có run.
- Là khối xây dựng (building block) trong các định dạng lớn (JPEG, TIFF, fax).

---

## 4. Mã Huffman — gán bit ngắn cho ký hiệu hay gặp

💡 **Trực giác**: Trong morse, chữ \`E\` (rất hay gặp trong tiếng Anh) là một dấu chấm ngắn; chữ \`Q\` (hiếm) dài hơn nhiều. Ý tưởng: **ký hiệu phổ biến → mã ngắn; ký hiệu hiếm → mã dài**. Mã Huffman là cách **tối ưu** để làm điều đó với mã prefix-free (mục 5), được David Huffman tìm ra năm 1952.

### 4.1 Vì sao không dùng mã cố định?

Mã ASCII cho mọi ký tự đúng 8 bit. Nhưng nếu trong file \`e\` chiếm 40% còn \`z\` chiếm 0.05%, gán cả hai 8 bit là **lãng phí**: ta nên cho \`e\` mã 2 bit và chịu cho \`z\` mã 12 bit, vì \`e\` xuất hiện nhiều hơn \`z\` cả ngàn lần. Tổng số bit giảm đáng kể.

### 4.2 Walk-through ĐẦY ĐỦ — dựng cây Huffman từng bước

Cho văn bản với bảng tần suất sau (tổng 100 ký hiệu):

| Ký hiệu | Tần suất |
|---|---|
| A | 45 |
| B | 13 |
| C | 12 |
| D | 16 |
| E | 9 |
| F | 5 |

**Ý tưởng thuật toán**: đặt mỗi ký hiệu là một **nút lá** với "trọng số" = tần suất. Lặp lại: **lấy 2 nút có trọng số nhỏ nhất**, gộp thành 1 nút cha (trọng số = tổng 2 con), bỏ lại vào tập. Dừng khi còn 1 nút (gốc). Bước "lấy 2 nhỏ nhất" chính là **2 lần \`extractMin\` từ min-heap** — xem [Heap & Priority Queue](../../../DataStructures/02-Intermediate/lesson-03-heap-priority-queue/).

Tập ban đầu (sắp tăng dần): \`F=5, E=9, C=12, B=13, D=16, A=45\`.

**Bước 1** — hai nhỏ nhất: \`F=5\` và \`E=9\`. Gộp → nút \`[FE]=14\`.
Tập mới: \`C=12, B=13, [FE]=14, D=16, A=45\`.

\`\`\`
   [FE]=14
   /    \\
 F=5    E=9
\`\`\`

**Bước 2** — hai nhỏ nhất: \`C=12\` và \`B=13\`. Gộp → nút \`[CB]=25\`.
Tập mới: \`[FE]=14, D=16, [CB]=25, A=45\`.

\`\`\`
   [CB]=25
   /    \\
 C=12   B=13
\`\`\`

**Bước 3** — hai nhỏ nhất: \`[FE]=14\` và \`D=16\`. Gộp → nút \`[FED]=30\`.
Tập mới: \`[CB]=25, [FED]=30, A=45\`.

\`\`\`
     [FED]=30
     /      \\
  [FE]=14   D=16
  /    \\
 F=5   E=9
\`\`\`

**Bước 4** — hai nhỏ nhất: \`[CB]=25\` và \`[FED]=30\`. Gộp → nút \`[CBFED]=55\`.
Tập mới: \`[CBFED]=55, A=45\`.

\`\`\`
        [CBFED]=55
        /         \\
    [CB]=25      [FED]=30
    /    \\        /     \\
  C=12  B=13  [FE]=14   D=16
                /   \\
              F=5   E=9
\`\`\`

**Bước 5** — hai nhỏ nhất (cũng là hai cuối): \`A=45\` và \`[CBFED]=55\`. Gộp → **gốc** \`[ALL]=100\`.

\`\`\`
              ROOT=100
            /          \\
          A=45      [CBFED]=55
                    /         \\
                [CB]=25      [FED]=30
                /    \\        /     \\
              C=12  B=13  [FE]=14   D=16
                            /   \\
                          F=5   E=9
\`\`\`

**Gán bit**: đi xuống **trái = 0**, **phải = 1**. Đọc đường đi từ gốc tới mỗi lá:

| Ký hiệu | Đường đi | Mã | Độ dài (bit) | Tần suất | Bit × tần suất |
|---|---|---|---|---|---|
| A | trái | \`0\` | 1 | 45 | 45 |
| C | phải-trái-trái | \`100\` | 3 | 12 | 36 |
| B | phải-trái-phải | \`101\` | 3 | 13 | 39 |
| F | phải-phải-trái-trái | \`1100\` | 4 | 5 | 20 |
| E | phải-phải-trái-phải | \`1101\` | 4 | 9 | 36 |
| D | phải-phải-phải | \`111\` | 3 | 16 | 48 |

**Tổng số bit Huffman** = 45 + 36 + 39 + 20 + 36 + 48 = **224 bit**.

### 4.3 So sánh với mã cố định

Có 6 ký hiệu → mã cố định cần $\\lceil\\log_2 6\\rceil = 3$ bit/ký hiệu. Tổng = $100 \\times 3 = 300$ bit.

- Huffman: **224 bit**. Cố định: **300 bit**. **Tiết kiệm 76 bit ≈ 25.3%.**
- Độ dài mã trung bình Huffman = 224/100 = **2.24 bit/ký hiệu**.

Đối chiếu entropy của phân bố này:
$$H = -\\sum p_i\\log_2 p_i \\approx 2.24 \\text{ bit/ký hiệu}.$$
Huffman ở đây **chạm gần đúng entropy** (đây là một trường hợp đẹp vì các tần suất gần lũy thừa của 2). Nói chung Huffman ∈ $[H, H+1)$.

💡 **Liên hệ cấu trúc dữ liệu**: cây Huffman là **cây nhị phân** ([Tree](../../../DataStructures/02-Intermediate/lesson-01-tree/)); mọi ký hiệu nằm ở **lá** (không nằm ở nút trong) — đây chính là điều bảo đảm tính prefix-free (mục 5). Việc lặp "lấy 2 nhỏ nhất" là **min-heap / priority queue**, mỗi \`extractMin\` mất $O(\\log n)$, tổng dựng cây $O(n\\log n)$.

❓ **Câu hỏi tự nhiên**:
- *"Nếu hòa trọng số thì chọn nút nào?"* — Bất kỳ; các cách chọn cho cây khác nhau nhưng **tổng số bit như nhau** (đều tối ưu). Để giải nén được, ta lưu kèm cây/bảng mã trong file nén.
- *"Phải gửi kèm cây không? Có tốn không?"* — Có, phần header lưu cây/bảng tần suất tốn thêm vài chục–vài trăm byte. Với file lớn, phần này không đáng kể; với file rất nhỏ nó có thể làm "nén" lớn hơn gốc → một dạng phình.

🔁 **Dừng lại tự kiểm tra**:
<details><summary>Với bảng A=45,...,F=5 ở trên, mã của ký hiệu D là gì và dài mấy bit?</summary>

D nằm ở nhánh phải-phải-phải từ gốc → mã \`111\`, dài 3 bit. (Đi: gốc→phải=[CBFED], →phải=[FED], →phải=D.)
</details>

📝 **Tóm tắt mục 4**:
- Huffman gán mã **ngắn cho ký hiệu hay gặp**, dài cho hiếm → tổng bit nhỏ nhất trong các mã prefix-free.
- Dựng cây: lặp "gộp 2 nút nhỏ nhất" (min-heap) tới khi còn 1 gốc; mã = đường đi gốc→lá (trái 0, phải 1).
- Ví dụ A–F: 224 bit (Huffman) vs 300 bit (cố định) → tiết kiệm 25%.

---

## 5. Prefix-free code — vì sao giải mã không nhập nhằng

💡 **Trực giác**: Mã của Huffman dán liền nhau **không có dấu cách** giữa các ký hiệu (\`0\` + \`100\` + \`111\` = \`0100111\`). Làm sao máy biết cắt ở đâu? Bí quyết: **không mã nào là tiền tố (prefix) của mã khác**. Đó là **prefix-free code** (còn gọi prefix code).

### 5.1 Vì sao "lá-only" ⇒ prefix-free

Trong cây Huffman, mọi ký hiệu nằm ở **lá**. Đường đi tới lá A **không bao giờ đi xuyên qua** lá khác (vì lá không có con). Suy ra: mã của A (đường tới lá A) không thể là **đoạn đầu** của mã ký hiệu khác → **prefix-free**. Khi giải mã, ta đi từ gốc theo từng bit; **chạm lá là dừng**, in ký hiệu, quay lại gốc đọc tiếp → cắt chuỗi duy nhất, không nhập nhằng.

⚠ **Phản ví dụ — mã KHÔNG prefix-free gây nhập nhằng**: gán \`A=0\`, \`B=01\`, \`C=011\`. Chuỗi \`011\` có thể đọc là \`A,?\` rồi kẹt, hoặc \`B,?\`, hoặc \`C\`. Mã \`0\` (của A) là tiền tố của \`01\` (B) và \`011\` (C) → **mơ hồ**, không giải mã được duy nhất. Huffman tránh hoàn toàn lỗi này.

### 5.2 Bốn ví dụ giải mã (dùng bảng mã mục 4.2)

Bảng: \`A=0, C=100, B=101, F=1100, E=1101, D=111\`.

**Ví dụ 1** — giải mã \`0101\`:
- \`0\` → chạm lá **A**. Còn \`101\`.
- \`1\`→phải, \`0\`→trái, \`1\`→phải → chạm lá **B**. Hết.
- Kết quả: **\`AB\`**.

**Ví dụ 2** — giải mã \`100111\`:
- \`1,0,0\` → lá **C**. Còn \`111\`.
- \`1,1,1\` → lá **D**. Hết.
- Kết quả: **\`CD\`**.

**Ví dụ 3** — giải mã \`1100110100\`:
- \`1,1,0,0\` → lá **F**. Còn \`110100\`.
- \`1,1,0,1\` → lá **E**. Còn \`00\`.
- \`0\` → lá **A**. Còn \`0\`.
- \`0\` → lá **A**. Hết.
- Kết quả: **\`FEAA\`**.

**Ví dụ 4** — giải mã \`01011100\`:
- \`0\` → **A**. Còn \`1011100\`.
- \`1,0,1\` → **B**. Còn \`1100\`.
- \`1,1,0,0\` → **F**. Hết.
- Kết quả: **\`ABF\`**.

❓ **Câu hỏi tự nhiên**:
- *"Mọi prefix-free code đều là Huffman?"* — Không. Mọi mã Huffman đều prefix-free, nhưng có vô số mã prefix-free **không tối ưu** (vd mã cố định 3 bit cũng prefix-free). Huffman là mã prefix-free có **tổng bit nhỏ nhất** với một phân bố cho trước.
- *"Nếu bit cuối bị thiếu/lỗi thì sao?"* — Giải mã có thể lệch hẳn từ điểm đó (error propagation). Vì vậy nén thường đi kèm **phát hiện/sửa lỗi** — xem bài tiếp [Error Detection](../lesson-05-error-detection/).

🔁 **Dừng lại tự kiểm tra**:
<details><summary>Giải mã chuỗi 111101 bằng bảng mục 4.2.</summary>

\`1,1,1\` → **D**. Còn \`101\`. \`1,0,1\` → **B**. Hết → **\`DB\`**.
</details>

📝 **Tóm tắt mục 5**:
- Prefix-free = không mã nào là tiền tố của mã khác → cắt chuỗi bit **duy nhất**.
- Cây Huffman đặt ký hiệu ở **lá** → tự động prefix-free.
- Giải mã = đi từ gốc theo bit, chạm lá thì in & quay về gốc.

---

## 6. LZ77 / LZ78 — nén bằng từ điển & cửa sổ trượt

💡 **Trực giác**: Huffman/RLE khai thác **tần suất ký tự đơn**. Nhưng dữ liệu thật lặp cả **cụm** (\`"http://"\`, \`"the "\`, \`"</div>"\`). Họ thuật toán **LZ** (Lempel–Ziv, 1977/1978) khai thác cụm lặp: thay vì ghi lại cụm, ghi **tham chiếu** tới lần xuất hiện trước.

### 6.1 LZ77 — cửa sổ trượt (sliding window)

LZ77 nhìn ngược lại một **cửa sổ** dữ liệu vừa xử lý. Khi gặp cụm đã xuất hiện trong cửa sổ, nó phát ra bộ ba \`(khoảng_lùi, độ_dài, ký_tự_kế)\`:

- \`khoảng_lùi (offset)\`: lùi lại bao nhiêu ký tự để bắt đầu cụm trùng.
- \`độ_dài (length)\`: cụm trùng dài bao nhiêu.
- \`ký_tự_kế\`: ký tự đầu tiên **không** khớp (để tiếp tục).

**Walk-through** — nén \`"abcabcabc"\`:

| Vị trí | Đầu ra | Giải thích |
|---|---|---|
| 0 | \`(0,0,a)\` | chưa có gì phía trước, literal \`a\` |
| 1 | \`(0,0,b)\` | literal \`b\` |
| 2 | \`(0,0,c)\` | literal \`c\` |
| 3 | \`(3,5,?)\` | lùi 3, khớp \`abcab\` dài 5 (cụm trùng **đè lên chính nó** — hợp lệ trong LZ77), rồi \`c\` |

Chỉ vài bộ ba thay cho 9 ký tự. **Giải nén**: đọc bộ ba, copy từ vị trí lùi \`offset\` ra \`length\` ký tự, rồi thêm ký tự kế → khôi phục nguyên gốc.

### 6.2 LZ78 — xây từ điển động

LZ78 không dùng cửa sổ; nó **xây một từ điển** các cụm đã thấy, đánh số, rồi phát \`(chỉ_số_từ_điển, ký_tự_kế)\`. Mỗi lần thấy cụm mới = "cụm cũ + 1 ký tự", thêm vào từ điển. LZW (dùng trong GIF, \`compress\` của Unix) là biến thể nổi tiếng của LZ78.

### 6.3 Vì sao LZ là nền của ZIP/gzip/PNG

- **DEFLATE** (gzip, ZIP, PNG): chạy **LZ77** tìm cụm lặp trước, **rồi Huffman** mã hóa cả literal lẫn các bộ ba offset/length. Kết hợp hai tầng → vừa bắt cụm lặp vừa tối ưu bit. Đây là câu trả lời đầy đủ cho câu hỏi mở bài (mục 1).
- **GIF**: dùng LZW (họ LZ78).
- **PNG**: dùng DEFLATE + lọc trước (filter) theo hàng ảnh.

❓ **Câu hỏi tự nhiên**:
- *"Cửa sổ to thì nén tốt hơn?"* — Thường có, vì bắt được cụm lặp xa hơn, nhưng tốn bộ nhớ và chậm hơn. gzip dùng cửa sổ 32 KB; zstd/brotli dùng cửa sổ lớn hơn nhiều.
- *"LZ có lossless không?"* — Có, hoàn toàn lossless: mọi bộ ba/chỉ số đều khôi phục đúng từng byte.

🔁 **Dừng lại tự kiểm tra**:
<details><summary>Vì sao DEFLATE chạy LZ77 TRƯỚC rồi Huffman, không phải ngược lại?</summary>

LZ77 thay cụm lặp bằng bộ ba offset/length → sinh ra một luồng token (literal + offset + length). Huffman sau đó gán mã ngắn cho token hay gặp. Nếu Huffman chạy trước, nó chỉ thấy ký tự đơn, bỏ lỡ cụm lặp; chạy LZ77 trước "trích" được sự lặp cấp cụm rồi Huffman tối ưu phần còn lại — hai tầng bổ sung cho nhau.
</details>

📝 **Tóm tắt mục 6**:
- LZ77 = cửa sổ trượt + bộ ba \`(offset, length, next)\`; LZ78/LZW = từ điển động.
- Khai thác **cụm lặp** (Huffman/RLE chỉ khai thác ký tự đơn).
- DEFLATE = LZ77 + Huffman → lõi của gzip/ZIP/PNG.

---

## 7. So sánh tổng thể — chọn bộ nén nào?

| Dữ liệu | Bộ nén điển hình | Loại | Vì sao |
|---|---|---|---|
| Text, mã nguồn | gzip, brotli (LZ77+Huffman) | lossless | Phải đúng từng ký tự |
| Ảnh có vùng phẳng/logo | PNG (DEFLATE) | lossless | Giữ nét sắc, ít màu |
| Ảnh chụp (nhiều chi tiết) | JPEG | **lossy** | Mắt bỏ qua chi tiết tần số cao |
| Âm thanh/nhạc | MP3, AAC | **lossy** | Tai bỏ qua âm bị che (masking) |
| Audio chất lượng gốc | FLAC | lossless | Lưu trữ/master |
| Video | H.264, H.265 | **lossy** | Nén liên khung (inter-frame) |

💡 **Quy tắc nhanh**: **không được sai một bit** (text, code, dữ liệu) → **lossless**. **Đầu ra cho giác quan người** và chấp nhận mất chi tiết khó nhận → **lossy** (nén mạnh hơn nhiều). Lossy ảnh/âm thanh dựa trên **biến đổi miền tần số** (DCT/FFT) rồi bỏ tần số mắt/tai ít nhạy — xem [SignalProcessing — nén ảnh / 2D Fourier (JPEG)](../../../SignalProcessing/03-Applied/lesson-03-image-2d-fourier/).

📝 **Tóm tắt mục 7**:
- Lossless cho dữ liệu cần chính xác; lossy cho media hướng giác quan.
- Lossy dựa trên biến đổi tần số (cầu nối sang SignalProcessing).

---

## 8. Bài tập

**Bài 1 (Entropy)**: Tính entropy $H$ cho phân bố $p_A = 0.5,\\ p_B = 0.3,\\ p_C = 0.2$. Cho biết mã cố định cần bao nhiêu bit/ký hiệu và còn chỗ nén không.

**Bài 2 (RLE)**: Nén \`"XXXXXYYZZZZZZ"\` bằng RLE và tính tỉ lệ nén. Sau đó cho một chuỗi 6 ký tự **khác nhau hết** và chỉ ra RLE phình ra sao.

**Bài 3 (Huffman — tự dựng cây)**: Cho tần suất \`a=10, b=15, c=30, d=16, e=29\`. **Tự dựng cây Huffman từng bước**, ghi bảng mã, tính tổng số bit và so với mã cố định 3 bit/ký hiệu.

**Bài 4 (Giải mã prefix-free)**: Với bảng mã \`A=0, C=100, B=101, F=1100, E=1101, D=111\` (từ mục 4.2), giải mã chuỗi bit \`100101111100\`.

**Bài 5 (Prefix-free)**: Mã \`{ x=0, y=10, z=11 }\` có prefix-free không? Mã \`{ x=0, y=01, z=11 }\` thì sao? Giải thích và chỉ ra trường hợp nhập nhằng nếu có.

**Bài 6 (LZ77)**: Nén \`"aaaaaa"\` (6 chữ a) bằng LZ77 (bộ ba \`(offset, length, next)\`), giả sử cửa sổ đủ lớn.

---

## 9. Lời giải chi tiết

### Bài 1 — Entropy phân bố (0.5, 0.3, 0.2)

$$
\\begin{aligned}
H &= -(0.5\\log_2 0.5 + 0.3\\log_2 0.3 + 0.2\\log_2 0.2) \\\\
  &= -(0.5\\cdot(-1) + 0.3\\cdot(-1.737) + 0.2\\cdot(-2.322)) \\\\
  &= -(-0.5 - 0.521 - 0.464) = 1.485 \\text{ bit/ký hiệu}.
\\end{aligned}
$$

Mã cố định cho 3 ký hiệu cần $\\lceil\\log_2 3\\rceil = 2$ bit/ký hiệu. Vì $H = 1.485 < 2$ → **còn chỗ nén** ~26%. Huffman ở phân bố này cho mã \`A=0, B=10, C=11\` (1,2,2 bit) → trung bình $0.5\\cdot1 + 0.3\\cdot2 + 0.2\\cdot2 = 1.5$ bit/ký hiệu, rất gần $H=1.485$.

### Bài 2 — RLE \`"XXXXXYYZZZZZZ"\`

Run: \`XXXXX\`=\`5X\`, \`YY\`=\`2Y\`, \`ZZZZZZ\`=\`6Z\` → \`"5X2Y6Z"\`.
Gốc 13 ký tự, nén 6 ký tự, tỉ lệ **13/6 ≈ 2.17×**.

Chuỗi khác nhau hết, vd \`"ABCDEF"\` → \`1A1B1C1D1E1F\` = 12 ký tự > 6. **Phình gấp đôi** vì mỗi ký tự là một run độ dài 1, RLE vẫn ghi count \`1\` → 2 ký tự cho mỗi ký tự gốc.

### Bài 3 — Huffman cho a=10, b=15, c=30, d=16, e=29

Tập ban đầu (tăng dần): \`a=10, b=15, d=16, e=29, c=30\`.

**Bước 1**: hai nhỏ nhất \`a=10\`, \`b=15\` → \`[ab]=25\`. Tập: \`d=16, [ab]=25, e=29, c=30\`.
**Bước 2**: hai nhỏ nhất \`d=16\`, \`[ab]=25\` → \`[dab]=41\`. Tập: \`e=29, c=30, [dab]=41\`.
**Bước 3**: hai nhỏ nhất \`e=29\`, \`c=30\` → \`[ec]=59\`. Tập: \`[dab]=41, [ec]=59\`.
**Bước 4**: hai cuối \`[dab]=41\`, \`[ec]=59\` → **gốc** \`[ALL]=100\`.

Cây:
\`\`\`
            ROOT=100
          /          \\
      [dab]=41      [ec]=59
      /     \\        /    \\
    d=16  [ab]=25  e=29   c=30
          /    \\
        a=10  b=15
\`\`\`

Gán bit (trái 0, phải 1):

| Ký hiệu | Mã | Dài | Tần suất | Bit×TS |
|---|---|---|---|---|
| d | \`00\` | 2 | 16 | 32 |
| a | \`010\` | 3 | 10 | 30 |
| b | \`011\` | 3 | 15 | 45 |
| e | \`10\` | 2 | 29 | 58 |
| c | \`11\` | 2 | 30 | 60 |

**Tổng Huffman** = 32 + 30 + 45 + 58 + 60 = **225 bit**.
Mã cố định 3 bit × 100 = **300 bit**. Tiết kiệm 75 bit = **25%**. Độ dài trung bình = 2.25 bit/ký hiệu.

### Bài 4 — Giải mã \`100101111100\`

Bảng: \`A=0, C=100, B=101, F=1100, E=1101, D=111\`.
- \`1,0,0\` → **C**. Còn \`101111100\`.
- \`1,0,1\` → **B**. Còn \`111100\`.
- \`1,1,1\` → **D**. Còn \`100\`.
- \`1,0,0\` → **C**. Hết.
- Kết quả: **\`CBDC\`**.

### Bài 5 — Prefix-free?

- \`{ x=0, y=10, z=11 }\`: không mã nào là tiền tố của mã khác (\`0\` không mở đầu \`10\`/\`11\`; \`10\` không mở đầu \`11\`). → **prefix-free** ✓. (Đây đúng là cây: x ở lá trái, y/z ở hai lá phải.)
- \`{ x=0, y=01, z=11 }\`: mã \`0\` (x) **là tiền tố** của \`01\` (y) → **KHÔNG prefix-free**. Nhập nhằng: chuỗi \`011\` đọc được là \`x\` rồi kẹt \`11\`→z (\`x,z\`), nhưng cũng có thể đọc \`y\`(\`01\`)+\`?1\` kẹt. Bộ giải mã không cắt được duy nhất.

### Bài 6 — LZ77 \`"aaaaaa"\`

| Vị trí | Đầu ra | Giải thích |
|---|---|---|
| 0 | \`(0,0,a)\` | literal \`a\` đầu tiên |
| 1 | \`(1,5,⊥)\` | lùi 1, copy 5 ký tự (đè lên chính nó: copy từng byte → \`aaaaa\`), hết chuỗi (không còn ký tự kế) |

Hai token thay cho 6 ký tự. Giải nén: in \`a\`, rồi copy 5 lần từ vị trí lùi-1 (mỗi byte vừa ghi lại được copy tiếp) → \`"aaaaaa"\`. (Cài đặt thực thường tách thành literal + match-length; chi tiết dấu kết chuỗi tùy định dạng.)

---

## 10. Tham khảo & Bài tiếp theo

- Tiền đề: [Character Encoding](../lesson-01-character-encoding/) · [Heap & Priority Queue](../../../DataStructures/02-Intermediate/lesson-03-heap-priority-queue/) · [Tree](../../../DataStructures/02-Intermediate/lesson-01-tree/)
- Liên hệ nén lossy: [SignalProcessing — nén ảnh / 2D Fourier (JPEG)](../../../SignalProcessing/03-Applied/lesson-03-image-2d-fourier/)
- Bài tiếp: [N2-L05 — Error Detection](../lesson-05-error-detection/) — sau khi nén, làm sao phát hiện dữ liệu bị hỏng trên đường truyền?
- Trang chính nhóm: [02-EncodingMemory](../index.html)
- [visualization.html](./visualization.html)
`;
