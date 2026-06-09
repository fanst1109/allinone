// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Math/02-Geometry/lesson-01-euclidean-basics/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Cơ sở Euclid

## Mục tiêu

- Hiểu các **đối tượng cơ bản** của hình học Euclid: điểm, đường, tia, đoạn, góc, mặt phẳng.
- Biết **5 tiên đề Euclid**.
- Phân loại **góc**: nhọn, vuông, tù, bẹt, đầy.
- Hiểu khái niệm **đường thẳng song song**, **đường vuông góc**.

## Kiến thức tiền đề

Không.

---

## 1. Đối tượng cơ bản

Hình học Euclid xây dựng từ **3 khái niệm nguyên thủy** không định nghĩa:
- **Điểm** (point): vị trí trong không gian, không có kích thước. Ký hiệu A, B, ...
- **Đường thẳng** (line): kéo dài vô hạn 2 đầu, không có bề rộng. Đi qua vô số điểm.
- **Mặt phẳng** (plane): 2D, kéo dài vô hạn, không có chiều dày.

💡 **Vì sao "không định nghĩa"?** Vì để định nghĩa cần khái niệm khác — sẽ vô hạn. Euclid chọn các khái niệm nguyên thủy + tiên đề làm cơ sở.

### Đối tượng dẫn xuất

- **Đoạn thẳng AB**: phần đường thẳng giới hạn bởi 2 điểm A, B.
- **Tia OA**: bắt đầu từ O, đi qua A, kéo dài vô hạn 1 phía.
- **Góc**: tạo bởi 2 tia chung gốc.

💡 **Trực giác / Hình dung**: hãy nghĩ tới 3 đối tượng nguyên thủy như "viên gạch lego" nhỏ nhất — không thể tháo nhỏ hơn được nữa. Một **điểm** giống dấu chấm bút nhọn vô hạn (chấm càng nhỏ càng đúng, lý tưởng là không có kích thước). **Đường thẳng** giống sợi chỉ căng kéo dài mãi 2 đầu, mỏng vô hạn. **Mặt phẳng** giống mặt bàn phẳng tuyệt đối, rộng vô hạn, mỏng tới mức không có chiều dày.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Điểm 'không có kích thước' thì làm sao vẽ được?"* Cái ta vẽ trên giấy chỉ là **biểu diễn** của điểm lý tưởng. Trong toán, điểm là vị trí thuần túy — kích thước bằng 0. Vẽ to một chút chỉ để mắt thấy.
- *"Đoạn, tia, đường khác nhau ở đâu?"* Khác ở số đầu mút: **đoạn** có 2 đầu mút (hữu hạn), **tia** có 1 đầu mút và kéo dài 1 phía, **đường thẳng** không có đầu mút (vô hạn 2 phía). Vd đoạn AB dài 5 cm là đo được; tia thì "đo" được nửa, đường thẳng thì vô hạn.
- *"Qua 2 điểm vẽ được mấy đường thẳng?"* Đúng 1 (tiên đề 1). Qua 1 điểm thì vô số đường thẳng.

⚠ **Lỗi thường gặp**: lẫn lộn **đoạn thẳng AB** với **đường thẳng AB**. Đoạn AB có độ dài cụ thể (vd 5 cm), đường thẳng AB là vô hạn không có độ dài. Cũng hay nhầm tia OA và tia AO: tia OA gốc tại O đi qua A, tia AO gốc tại A đi qua O — hai tia ngược chiều, chỉ trùng phần chung là đoạn OA.

🔁 **Dừng lại tự kiểm tra**

1. Tia Ox và tia Oy chung gốc O nhưng đi 2 hướng ngược nhau hợp thành hình gì?
2. Có 3 điểm A, B, C không thẳng hàng. Vẽ được bao nhiêu đường thẳng đi qua đúng 2 trong 3 điểm đó?

<details><summary>Đáp án</summary>

1. Hợp thành 1 **đường thẳng** (2 tia đối nhau ghép lại). Góc giữa chúng $= 180^\\circ$ (góc bẹt).
2. 3 đường: AB, AC, BC. (Mỗi cặp 2 điểm cho 1 đường; có $C(3,2) = 3$ cặp.)

</details>

### 📝 Tóm tắt mục 1

- 3 khái niệm **nguyên thủy** không định nghĩa: điểm (không kích thước), đường thẳng (vô hạn 2 phía), mặt phẳng (2D vô hạn).
- Lý do không định nghĩa: tránh vòng lặp vô hạn — phải chọn điểm xuất phát.
- Đối tượng dẫn xuất: đoạn (2 đầu mút), tia (1 đầu mút), góc (2 tia chung gốc).
- Qua 2 điểm có đúng 1 đường thẳng; qua 1 điểm có vô số.

---

## 2. Năm tiên đề Euclid

Euclid đã viết "Elements" (~300 TCN) — sách giáo khoa quan trọng nhất lịch sử Toán:

1. **Có thể vẽ 1 đường thẳng từ điểm A đến điểm B** (qua 2 điểm có 1 đường thẳng duy nhất).
2. **Có thể kéo dài 1 đoạn thẳng** thành đường thẳng (vô hạn cả 2 phía).
3. **Có thể vẽ 1 đường tròn** với tâm và bán kính tùy ý.
4. **Tất cả các góc vuông bằng nhau**.
5. **Tiên đề song song**: qua 1 điểm ngoài đường thẳng, có **đúng 1** đường thẳng song song với nó.

💡 **Tiên đề thứ 5** (song song) đặc biệt — nhiều người cố chứng minh từ 4 tiên đề khác trong 2000 năm. Cuối cùng vào thế kỷ 19, người ta nhận ra: nếu bỏ tiên đề 5, được **hình học phi Euclid** (như hình học cầu, hyperbolic) — nền tảng của thuyết tương đối tổng quát Einstein.

💡 **Trực giác / Hình dung — tiên đề là gì**: tiên đề giống "luật chơi" được công nhận không cần chứng minh — như luật "vua đi 1 ô" trong cờ. Mọi định lý hình học sau này đều suy ra từ 5 luật này. Tiên đề 1-4 nghe "hiển nhiên" (vẽ được đường, kéo dài được, vẽ được tròn...), riêng tiên đề 5 nghe phức tạp hơn nhiều — chính sự "không hiển nhiên" này khiến 2000 năm người ta nghi ngờ nó.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao không chứng minh tiên đề mà phải 'công nhận'?"* Vì mọi chứng minh phải dựa trên cái có trước. Nếu chứng minh mọi thứ thì sẽ lùi vô hạn. Tiên đề là điểm dừng — cái ta đồng ý là đúng để bắt đầu.
- *"Bỏ tiên đề 5 thì hình học còn đúng không?"* Vẫn đúng, nhưng là **hình học khác**. Trên mặt cầu (như Trái Đất), qua 1 điểm ngoài 1 "đường thẳng" (vòng tròn lớn) **không có** đường song song nào — mọi vòng tròn lớn đều cắt nhau. Tổng 3 góc tam giác trên cầu **$> 180^\\circ$**.
- *"Phi Euclid có ích thật không hay chỉ lý thuyết?"* Có ích thật: GPS phải tính theo hình học cong (thuyết tương đối) mới chính xác; bản đồ Trái Đất (mặt cầu) cũng vậy.

⚠ **Lỗi thường gặp**: tưởng "qua 1 điểm ngoài đường thẳng vẽ được nhiều đường song song". Trong hình học Euclid phẳng chỉ có **đúng 1**. (Vẽ "nhiều đường gần như song song" là sai — chúng sẽ cắt đường gốc ở đâu đó nếu không thực sự cùng hệ số góc.)

🔁 **Dừng lại tự kiểm tra**

1. Tiên đề nào của Euclid đảm bảo "vẽ được đường tròn tâm bất kỳ, bán kính bất kỳ"?
2. Trên mặt cầu, tổng 3 góc của một tam giác lớn hơn hay nhỏ hơn $180^\\circ$?

<details><summary>Đáp án</summary>

1. Tiên đề 3.
2. **Lớn hơn** $180^\\circ$ (hình học cầu — phi Euclid). Vd tam giác có 3 đỉnh tạo bởi 3 góc vuông trên cầu có tổng $= 270^\\circ$.

</details>

### 📝 Tóm tắt mục 2

- 5 tiên đề Euclid là nền tảng không cần chứng minh của toàn bộ hình học phẳng.
- Tiên đề 5 (song song): qua 1 điểm ngoài đường thẳng có đúng 1 đường song song.
- Bỏ/đổi tiên đề 5 → hình học phi Euclid (cầu: tổng góc tam giác $> 180^\\circ$; hyperbolic: $< 180^\\circ$).
- Phi Euclid không phải "sai" — là nền cho thuyết tương đối, GPS, bản đồ Trái Đất.

---

## 3. Góc

💡 **Trực giác / Hình dung**: góc đo "độ mở" giữa 2 tia chung gốc — như độ mở của 2 cánh kéo hay 2 kim đồng hồ. Mở càng rộng → góc càng lớn. Đơn vị độ chia 1 vòng tròn đầy thành 360 phần bằng nhau ($1^\\circ = \\frac{1}{360}$ vòng). Kim phút quay từ 12 tới 3 quét đúng $90^\\circ$ ($\\frac{1}{4}$ vòng).

### 3.1. Phân loại

| Tên | Số đo |
|------|-------|
| Nhọn | $0^\\circ < x < 90^\\circ$ |
| Vuông | $x = 90^\\circ$ |
| Tù | $90^\\circ < x < 180^\\circ$ |
| Bẹt | $x = 180^\\circ$ |
| Phản | $180^\\circ < x < 360^\\circ$ |
| Đầy | $x = 360^\\circ$ |

### 3.2. Quan hệ góc

- **Hai góc bù nhau**: tổng $= 180^\\circ$.
- **Hai góc phụ nhau**: tổng $= 90^\\circ$.
- **Hai góc đối đỉnh**: bằng nhau.

### 3.3. Khi 2 đường thẳng song song bị cắt bởi 1 đường thẳng

- **Cặp góc đồng vị**: bằng nhau.
- **Cặp góc so le trong**: bằng nhau.
- **Cặp góc trong cùng phía**: bù nhau (tổng $180^\\circ$).

**4 ví dụ số đa dạng** (phân loại + quan hệ):
- Góc $35^\\circ$: nhọn ($0 < 35 < 90$). Góc bù $= 145^\\circ$, góc phụ $= 55^\\circ$.
- Góc $90^\\circ$: vuông. Góc bù $= 90^\\circ$ (bù với chính loại), không có góc phụ dương ($90 - 90 = 0$).
- Góc $120^\\circ$: tù ($90 < 120 < 180$). Góc bù $= 60^\\circ$, không có góc phụ (vì $> 90^\\circ$).
- Góc $250^\\circ$: phản ($180 < 250 < 360$). Không có góc bù/phụ trong $[0,180]$.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Bù và phụ dễ nhầm — mẹo nào nhớ?"* "**Phụ** = **P**hần nhỏ → $90^\\circ$"; "**Bù** = đầy nửa vòng → $180^\\circ$". Hoặc: bù lớn hơn (chữ "bù" có dấu huyền nặng hơn → số lớn hơn).
- *"Góc tù có góc phụ không?"* Không. Góc phụ cần tổng $= 90^\\circ$, mà góc tù đã $> 90^\\circ$ → "góc phụ" sẽ âm, không tồn tại.
- *"Đối đỉnh khác kề bù chỗ nào?"* 2 đường cắt nhau tạo 4 góc: 2 cặp **đối đỉnh** (bằng nhau, không chung cạnh), còn mỗi góc với góc **kề** nó tạo cặp **kề bù** (tổng $180^\\circ$, chung 1 cạnh).

⚠ **Lỗi thường gặp**: nhầm "so le trong" với "trong cùng phía". So le trong (nằm 2 phía của đường cắt) thì **bằng nhau**; trong cùng phía (cùng 1 phía của đường cắt) thì **bù nhau** (tổng $180^\\circ$). Phản ví dụ: nếu so le trong là $70^\\circ$ thì so le trong còn lại cũng $70^\\circ$ (không phải $110^\\circ$); nhưng trong cùng phía của góc $70^\\circ$ là $110^\\circ$.

🔁 **Dừng lại tự kiểm tra**

1. Góc $63^\\circ$ có góc bù và góc phụ là bao nhiêu?
2. $a \\parallel b$ bị cắt bởi c. Một góc trong cùng phía bằng $130^\\circ$. Góc trong cùng phía còn lại bằng bao nhiêu?

<details><summary>Đáp án</summary>

1. Bù $= 180 - 63 =$ **$117^\\circ$**; phụ $= 90 - 63 =$ **$27^\\circ$**.
2. Trong cùng phía bù nhau → $180 - 130 =$ **$50^\\circ$**.

</details>

### 📝 Tóm tắt mục 3

- Phân loại theo số đo: nhọn ($<90$), vuông ($=90$), tù ($90$–$180$), bẹt ($=180$), phản ($180$–$360$), đầy ($=360$).
- **Bù** = tổng $180^\\circ$; **phụ** = tổng $90^\\circ$; **đối đỉnh** = bằng nhau.
- 2 đường song song bị cắt: đồng vị & so le trong **bằng nhau**, trong cùng phía **bù nhau**.

---

## 4. Đường vuông góc và song song

- **Vuông góc** ($\\perp$): 2 đường tạo với nhau góc $90^\\circ$.
- **Song song** ($\\parallel$): 2 đường không cắt nhau (kéo dài vô hạn).

**Quy luật quan trọng**:
- Qua 1 điểm có duy nhất 1 đường vuông góc với đường thẳng cho trước.
- 2 đường cùng vuông góc với đường thứ 3 thì song song với nhau.
- 2 đường cùng song song với đường thứ 3 thì song song với nhau (tính bắc cầu).

💡 **Trực giác / Hình dung**: hai đường **song song** giống 2 thanh ray đường tàu — luôn cách nhau cố định, không bao giờ gặp dù kéo dài bao xa. Hai đường **vuông góc** giống góc tường gặp sàn — tạo góc "vuông vức" $90^\\circ$, là góc "ngay ngắn" nhất.

❓ **Câu hỏi tự nhiên của người đọc**

- *"Vì sao 2 đường cùng vuông góc với đường thứ 3 lại song song?"* Vì cả hai đều tạo góc $90^\\circ$ với đường thứ 3 → các góc đồng vị bằng nhau (đều $90^\\circ$) → theo dấu hiệu nhận biết, 2 đường song song. Hình dung: 2 cây cột cùng dựng thẳng đứng (vuông góc với mặt đất) thì song song nhau.
- *"Song song có 'bắc cầu' như dấu bằng không?"* Có: $a \\parallel b$ và $b \\parallel c$ → $a \\parallel c$. Đây là tính chất bắc cầu (transitivity), giống $a = b$ và $b = c$ → $a = c$.
- *"Trong không gian 3D quy luật này còn đúng?"* Không hoàn toàn — 2 đường cùng vuông góc với 1 đường trong 3D có thể **chéo nhau** chứ không song song. Quy luật này chỉ chắc chắn trong mặt phẳng (sẽ rõ ở Lesson 07).

⚠ **Lỗi thường gặp**: tưởng "2 đường không cắt nhau thì song song". Đúng trong mặt phẳng, nhưng **sai trong không gian** — 2 đường chéo nhau (skew) cũng không cắt nhau mà không song song. Trong mặt phẳng phẳng thì phát biểu này mới đúng.

🔁 **Dừng lại tự kiểm tra**

1. Đường a vuông góc với c, đường b cũng vuông góc với c (cùng trong 1 mặt phẳng). Quan hệ giữa a và b?
2. Ký hiệu $\\perp$ và $\\parallel$ lần lượt nghĩa là gì?

<details><summary>Đáp án</summary>

1. $a \\parallel b$ (song song) — hai đường cùng vuông góc với đường thứ 3 trong mặt phẳng thì song song.
2. $\\perp$ = vuông góc (góc $90^\\circ$); $\\parallel$ = song song (không cắt nhau).

</details>

### 📝 Tóm tắt mục 4

- $\\perp$ (vuông góc): 2 đường tạo góc $90^\\circ$. $\\parallel$ (song song): không cắt nhau (trong mặt phẳng).
- Qua 1 điểm có **đúng 1** đường vuông góc với đường cho trước.
- 2 đường cùng $\\perp$ đường thứ 3 → $\\parallel$ nhau; $\\parallel$ có tính bắc cầu.
- Quy luật "không cắt → song song" chỉ chắc trong mặt phẳng (3D có đường chéo nhau).

---

## 5. Bài tập

### Bài tập

**Bài 1**: Tính góc bù với $47^\\circ$.

**Bài 2**: Hai góc phụ nhau, một góc bằng $30^\\circ$. Tìm góc kia.

**Bài 3**: 2 đường thẳng cắt nhau tạo 4 góc, một góc bằng $65^\\circ$. Tính 3 góc còn lại.

**Bài 4**: $a \\parallel b$. Đường c cắt a, b. Một góc tạo bởi c và a $= 40^\\circ$. Tìm góc tương ứng tạo bởi c và b ở vị trí so le trong.

**Bài 5**: Vì sao tiên đề 5 của Euclid lại đặc biệt?

### Lời giải

**Bài 1**: $180 - 47 =$ **$133^\\circ$**.

**Bài 2**: $90 - 30 =$ **$60^\\circ$**.

**Bài 3**: Góc đối đỉnh $= 65^\\circ$. 2 góc còn lại (kề bù với $65^\\circ$) $= 180 - 65 = 115^\\circ$. → **$65^\\circ, 115^\\circ, 65^\\circ, 115^\\circ$**.

**Bài 4**: Góc so le trong = **$40^\\circ$**.

**Bài 5**: Vì tiên đề 5 mạnh hơn 4 tiên đề trước (không thể chứng minh từ chúng). Bỏ tiên đề 5 → hình học phi Euclid (Lobachevsky, Riemann) — tổng 3 góc tam giác không bằng $180^\\circ$ nữa. Einstein dùng hình học Riemann cho thuyết tương đối tổng quát.

---

## 6. Bài tiếp theo

[Lesson 02 — Tam giác](../lesson-02-triangles/).

## 📝 Tổng kết

1. **3 đối tượng nguyên thủy**: điểm, đường, mặt.
2. **5 tiên đề Euclid**. Tiên đề 5 (song song) → hình học phi Euclid khi bỏ.
3. **Góc**: nhọn, vuông, tù, bẹt, phản, đầy.
4. **Bù** ($180^\\circ$), **phụ** ($90^\\circ$), **đối đỉnh** (=).
5. **Đường song song bị cắt**: đồng vị/so le = nhau, trong cùng phía bù nhau.
`;
