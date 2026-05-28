// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Biology/01-Molecules-Cells/lesson-07-cell-cycle-mitosis/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 07 — Chu kỳ tế bào & nguyên phân

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **chu kỳ tế bào (cell cycle)** là gì và vì sao một tế bào không "chia ngay" mà phải đi qua một chuỗi pha có trật tự: **kỳ trung gian (interphase)** rồi **pha M (M phase)**.
- Phân biệt 3 pha con của kỳ trung gian — **G1, S, G2** — và biết pha nào tế bào lớn lên, pha nào **nhân đôi DNA (DNA synthesis)**.
- Mô tả **4 kỳ của nguyên phân (mitosis)** theo thứ tự **PMAT** — kỳ đầu (prophase), kỳ giữa (metaphase), kỳ sau (anaphase), kỳ cuối (telophase) — và **phân chia tế bào chất (cytokinesis)**.
- Phân biệt rạch ròi **nhiễm sắc thể (chromosome)** với **nhiễm sắc tử chị em (sister chromatid)** — sai lầm số 1 của người mới học.
- Theo dõi được **số nhiễm sắc thể**, **số chromatid** và **lượng DNA (đo bằng C)** qua từng pha, với người (2n = 46).
- Tính được **tăng trưởng theo cấp số nhân**: 1 tế bào sau *n* lần nguyên phân → **2ⁿ** tế bào.
- Hiểu **điểm kiểm soát (checkpoint)** giữ cho chu kỳ chính xác, và vì sao mất kiểm soát dẫn tới **ung thư (cancer)**.

## Kiến thức tiền đề

- **Nhân, nhiễm sắc thể, bào quan** — [Lesson 02 — Cấu trúc tế bào](../lesson-02-cell-structure/). DNA của tế bào nhân thực nằm trong nhân, cuộn quanh protein histone thành nhiễm sắc thể.
- **DNA, nucleotide, bắt cặp bổ sung A–T / G–C** — [Lesson 01 — Phân tử sinh học](../lesson-01-biomolecules/). Hiểu DNA là chuỗi nucleotide trước khi nói tới "nhân đôi DNA".
- Khái niệm protein và enzyme (checkpoint dùng protein điều khiển) — [Lesson 04 — Enzyme & chuyển hóa](../lesson-04-enzymes-metabolism/). Nếu chưa đọc cũng không sao, bài này nhắc lại khi cần.

---

## 1. Tổng quan chu kỳ tế bào

### 💡 Trực giác / Hình dung

Hãy hình dung tế bào như một **nhà máy sắp tách thành 2 nhà máy con**. Không thể "cắt đôi" ngay được — phải làm tuần tự: (1) nhập đủ nguyên vật liệu và lớn gấp đôi quy mô, (2) **photocopy nguyên bộ bản thiết kế (DNA)** để mỗi nhà máy con có 1 bản đầy đủ, (3) kiểm tra lần cuối, rồi (4) chia tài sản đều cho 2 bên và xây bức tường ngăn. Bỏ qua bất kỳ bước nào → nhà máy con thiếu bản thiết kế hoặc thiếu máy móc → hỏng.

### 1.1. Hai giai đoạn lớn

Chu kỳ tế bào = **kỳ trung gian (interphase)** + **pha M (M phase)**.

| Giai đoạn | Gồm | Tế bào làm gì | Tỉ lệ thời gian |
|-----------|-----|---------------|-----------------|
| **Kỳ trung gian (interphase)** | G1, S, G2 | Lớn lên, nhân đôi DNA, chuẩn bị | **~90%** |
| **Pha M (M phase)** | nguyên phân (mitosis) + phân chia tế bào chất (cytokinesis) | Chia nhân rồi chia tế bào chất | **~10%** |

Điểm dễ bị bỏ qua: **kỳ trung gian KHÔNG phải "lúc nghỉ".** Đây là giai đoạn bận rộn nhất — tế bào nhân đôi toàn bộ DNA, tổng hợp bào quan, lớn gấp đôi. "Pha nghỉ" là hiểu lầm cũ.

### 1.2. Ba pha con của kỳ trung gian

| Pha | Tên đầy đủ | Sự kiện chính | Thời gian (chu kỳ 24h điển hình) |
|-----|-----------|---------------|-----------------------------------|
| **G1** | Gap 1 (khoảng trống 1) | Tế bào **lớn lên**, tổng hợp protein/bào quan | ~11 h |
| **S** | Synthesis (tổng hợp) | **Nhân đôi DNA** — mỗi NST thành 2 chromatid chị em | ~8 h |
| **G2** | Gap 2 (khoảng trống 2) | Tổng hợp protein thoi phân bào, **kiểm tra lần cuối** | ~4 h |

Tổng kỳ trung gian ≈ 23 h, pha M ≈ 1 h → đúng tỉ lệ ~90% / ~10%.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Pha nào "quan trọng nhất"?**
A: Cả ba đều cần, nhưng **S là pha mang tính quyết định di truyền** — chỉ ở S thì lượng DNA mới gấp đôi. Nếu S sai (sót đoạn DNA, sao chép lỗi), 2 tế bào con sẽ nhận bản thiết kế hỏng. Vì vậy ngay trước S có một checkpoint kiểm tra DNA còn nguyên vẹn không (xem §5).

**Q: Tế bào nào cũng chia liên tục à?**
A: Không. Nhiều tế bào trưởng thành (neuron, tế bào cơ tim) rời chu kỳ vào trạng thái nghỉ gọi là **G0**, gần như không chia nữa. Tế bào da, niêm mạc ruột thì chia liên tục để thay thế. "Quyết định chia hay không" diễn ra ở cuối G1.

### ⚠ Lỗi thường gặp

- **Nghĩ kỳ trung gian = pha nghỉ, không làm gì**: sai — đây là lúc nhân đôi DNA và lớn lên, chiếm ~90% thời gian.
- **Nghĩ nguyên phân chiếm phần lớn chu kỳ**: ngược lại, pha M chỉ ~10%. Tế bào "phân chia" rất nhanh so với thời gian chuẩn bị.
- **Nhầm "G" là Growth**: G là **Gap** (khoảng trống giữa S và M trong sơ đồ lịch sử). Tế bào có lớn lên ở G1, nhưng chữ G không phải "growth".

### 🔁 Dừng lại tự kiểm tra

1. Một chu kỳ tế bào kéo dài 20 giờ, trong đó pha S là 6 giờ. Kỳ trung gian chiếm bao nhiêu phần trăm nếu pha M là 2 giờ?
2. Nếu một loại thuốc chặn pha S, tế bào sẽ "kẹt" ở đâu và hậu quả là gì?

<details>
<summary>Đáp án</summary>

1. Kỳ trung gian = G1 + S + G2 = tổng − pha M = 20 − 2 = **18 giờ** → 18/20 = **90%** (đúng tỉ lệ điển hình ~90%).
2. Tế bào không nhân đôi được DNA → kẹt giữa G1 và G2, **không thể vào nguyên phân** (vì mỗi NST chưa có đủ 2 chromatid để chia đều). Nếu cố chia, 2 tế bào con sẽ thiếu DNA. Đây là cơ chế của nhiều thuốc hóa trị: chặn S để tế bào ung thư (chia nhanh) không nhân đôi được.
</details>

### 📝 Tóm tắt mục 1

- Chu kỳ tế bào = kỳ trung gian (~90%) + pha M (~10%).
- Kỳ trung gian gồm G1 (lớn lên), S (nhân đôi DNA), G2 (chuẩn bị + kiểm tra).
- Pha M gồm nguyên phân (chia nhân) + phân chia tế bào chất (chia thân tế bào).

---

## 2. Nhiễm sắc thể vs nhiễm sắc tử — phân biệt cốt lõi

### 💡 Trực giác / Hình dung

Tưởng tượng **nhiễm sắc thể (chromosome)** là một **quyển sách** chứa thông tin. Trước khi photocopy (trước pha S), trên kệ có 1 quyển. Sau khi photocopy (sau pha S), bạn có **2 bản giống hệt được kẹp lại với nhau bằng 1 cái kẹp** — mỗi bản gọi là **nhiễm sắc tử chị em (sister chromatid)**, cái kẹp là **tâm động (centromere)**. Quan trọng: dù đã thành 2 bản, chừng nào còn dính nhau bằng kẹp, ta vẫn tính là **1 nhiễm sắc thể** chứ không phải 2.

### 2.1. Định nghĩa chính xác

- **Nhiễm sắc thể (chromosome)**: một phân tử DNA dài cuộn với protein. **Cách đếm**: đếm số tâm động (centromere). 1 tâm động = 1 NST, bất kể nó có 1 hay 2 chromatid.
- **Nhiễm sắc tử chị em (sister chromatid)**: sau khi nhân đôi DNA ở pha S, mỗi NST gồm **2 bản sao y hệt** dính nhau ở tâm động. Mỗi bản là 1 chromatid.
- Khi 2 chromatid chị em **tách nhau** (ở kỳ sau / anaphase), mỗi chromatid trở thành **1 NST con độc lập** — lúc này số tâm động độc lập gấp đôi → số NST tạm thời gấp đôi.

### 2.2. Bốn ví dụ số cụ thể (người, 2n = 46)

**Ví dụ 1 — Tế bào ở G1 (trước nhân đôi):**
- 46 NST, mỗi NST có **1 chromatid** → 46 chromatid. Lượng DNA = **2C**.

**Ví dụ 2 — Tế bào ở G2 (sau pha S, đã nhân đôi):**
- Vẫn **46 NST** (số tâm động chưa đổi), nhưng mỗi NST giờ có **2 chromatid** → 46 × 2 = **92 chromatid**. Lượng DNA = **4C** (gấp đôi).
- ⚠ Chú ý: số NST KHÔNG đổi (vẫn 46) dù DNA đã gấp đôi. Đây là chỗ rất nhiều người sai.

**Ví dụ 3 — Kỳ sau (anaphase), khi chromatid vừa tách:**
- 92 chromatid tách thành 92 NST con độc lập (mỗi cực 46). Trong khoảnh khắc trước khi tế bào chia, 1 tế bào tạm có **92 NST**, mỗi NST 1 chromatid. Lượng DNA vẫn 4C nhưng đang dồn về 2 cực.

**Ví dụ 4 — Hai tế bào con (sau cytokinesis):**
- Mỗi tế bào con: **46 NST**, mỗi NST 1 chromatid → 46 chromatid. Lượng DNA = **2C**. Giống hệt tế bào mẹ lúc G1.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Tại sao nhân đôi DNA (DNA gấp đôi) mà số NST không gấp đôi?**
A: Vì 2 bản sao **dính chung 1 tâm động** → vẫn đếm là 1 NST. Ta đếm NST bằng số tâm động, không bằng lượng DNA. Số NST chỉ gấp đôi đúng vào lúc kỳ sau, khi tâm động "nhân đôi chức năng" và 2 chromatid tách rời thành 2 NST độc lập.

**Q: "Chị em" nghĩa là gì? Chúng giống hay khác nhau?**
A: 2 chromatid chị em là 2 bản sao **y hệt** (do nhân đôi từ cùng 1 khuôn). Chính vì giống hệt nên khi chia về 2 tế bào con, mỗi con nhận đúng 1 bản → 2 con giống nhau và giống mẹ. (Khác với "nhiễm sắc thể tương đồng / homologous" — 2 chiếc cùng cặp nhưng KHÁC nguồn gốc bố/mẹ, sẽ học ở [Lesson 08 — Giảm phân](../lesson-08-meiosis/).)

### ⚠ Lỗi thường gặp

- **Đếm mỗi chromatid là 1 NST sau pha S**: SAI. Sau S vẫn 46 NST (92 chromatid), KHÔNG phải 92 NST.
- **Nghĩ "C" (lượng DNA) và "n" (số NST) là một**: khác nhau. Sau S: số NST = 46 (không đổi) nhưng lượng DNA = 4C (gấp đôi). Phải tách 2 đại lượng này.
- **Nhầm chromatid chị em với NST tương đồng**: chromatid chị em giống hệt (cùng nguồn, dính tâm động); NST tương đồng khác nhau (1 từ bố, 1 từ mẹ). Lẫn 2 khái niệm này phá hỏng cả Lesson 08.

### 🔁 Dừng lại tự kiểm tra

1. Một loài có 2n = 8. Ở pha G2, tế bào có bao nhiêu NST? Bao nhiêu chromatid?
2. Cũng loài đó, ngay sau khi chromatid tách ở kỳ sau (trước khi tế bào chia), 1 tế bào có bao nhiêu NST?

<details>
<summary>Đáp án</summary>

1. G2 đã qua pha S: số NST = **8** (không đổi), mỗi NST 2 chromatid → 8 × 2 = **16 chromatid**.
2. Khi 16 chromatid tách rời, mỗi chromatid thành 1 NST độc lập → tạm thời **16 NST** trong 1 tế bào (mỗi cực 8). Sau khi tế bào chia, mỗi tế bào con về lại 8 NST.
</details>

### 📝 Tóm tắt mục 2

- Đếm NST bằng số tâm động: 1 tâm động = 1 NST dù có 1 hay 2 chromatid.
- Sau pha S: số NST không đổi (vd vẫn 46), nhưng mỗi NST có 2 chromatid → DNA gấp đôi (2C → 4C).
- Chromatid chị em = 2 bản sao y hệt; tách ở kỳ sau thành 2 NST con.

---

## 3. Nguyên phân — 4 kỳ PMAT

### 💡 Trực giác / Hình dung

Nguyên phân giống cảnh **chia đều 2 bộ bài giống hệt cho 2 người chơi**. Đầu tiên xáo và xếp gọn (kỳ đầu), rồi đặt từng cặp lá thẳng hàng ở giữa bàn (kỳ giữa), kéo mỗi lá trong cặp về phía mỗi người (kỳ sau), cuối cùng mỗi người gom bài lại thành chồng riêng (kỳ cuối). Mục tiêu: 2 người nhận **bộ bài giống hệt nhau**.

Nhớ thứ tự bằng **PMAT**: **P**rophase → **M**etaphase → **A**naphase → **T**elophase.

### 3.1. Bốn kỳ chi tiết

| Kỳ | Tên Việt | Sự kiện chính |
|----|----------|---------------|
| **P** — Prophase | Kỳ đầu | NST kép **co xoắn** (thấy được dưới kính), màng nhân **tiêu biến**, **thoi phân bào (spindle)** bắt đầu hình thành từ 2 cực |
| **M** — Metaphase | Kỳ giữa | NST kép xếp **1 hàng** ở **mặt phẳng xích đạo (metaphase plate)**, thoi phân bào bám vào tâm động |
| **A** — Anaphase | Kỳ sau | 2 chromatid chị em **tách nhau**, thoi phân bào kéo chúng về **2 cực** đối diện |
| **T** — Telophase | Kỳ cuối | NST **dãn xoắn**, **màng nhân tái lập** quanh mỗi cụm NST → 2 nhân mới |

Sau telophase, **phân chia tế bào chất (cytokinesis)** chia thân tế bào: động vật **thắt eo** (màng bóp vào giữa); thực vật tạo **vách ngăn (cell plate)** ở giữa.

### 3.2. Vì sao kỳ giữa xếp đúng 1 hàng?

Đây là "mẹo cơ học" để chia đều: nếu mọi NST kép thẳng hàng ở mặt phẳng giữa, và mỗi chromatid của một cặp bị kéo về 2 cực ngược nhau, thì mỗi cực **chắc chắn nhận đúng 1 chromatid của mỗi NST** → 2 tế bào con đều đủ bộ. Đây là lý do checkpoint kỳ giữa kiểm tra "mọi NST đã bám thoi và xếp hàng đúng chưa" trước khi cho phép tách (xem §5).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Thoi phân bào là gì, làm từ đâu?**
A: Thoi phân bào (spindle) là hệ sợi protein **vi ống (microtubule)** tỏa ra từ 2 cực tế bào. Ở động vật, cực là **trung thể (centrosome)**. Sợi bám vào tâm động của mỗi NST và "kéo" — như dây cáp kéo NST về 2 phía. Vì vai trò sống còn này, một số thuốc trị ung thư (taxol, vinblastine) tấn công chính vi ống để chặn nguyên phân.

**Q: Lúc nào DNA được nhân đôi — trong nguyên phân à?**
A: KHÔNG. DNA đã nhân đôi **trước đó, ở pha S** của kỳ trung gian. Nguyên phân chỉ **chia** vật chất di truyền đã nhân đôi sẵn, không tạo thêm DNA. Đây là hiểu lầm rất phổ biến.

### ⚠ Lỗi thường gặp

- **Nghĩ DNA nhân đôi trong nguyên phân**: sai — nhân đôi ở pha S (trước pha M). Nguyên phân chỉ phân chia.
- **Lẫn thứ tự kỳ giữa và kỳ sau**: kỳ **giữa** = xếp hàng ở giữa; kỳ **sau** = đã tách, đi về cực. Nhớ "giữa thì còn ở giữa, sau thì đã đi".
- **Nghĩ cytokinesis là một kỳ của nguyên phân**: cytokinesis là bước riêng **sau** telophase, chia tế bào chất. Nguyên phân (chia nhân) và cytokinesis (chia thân) là 2 quá trình tách biệt.

### 🔁 Dừng lại tự kiểm tra

1. Sắp xếp đúng thứ tự: kỳ sau, kỳ cuối, kỳ đầu, kỳ giữa.
2. Ở kỳ nào màng nhân tiêu biến? Ở kỳ nào màng nhân tái lập?

<details>
<summary>Đáp án</summary>

1. Kỳ đầu (prophase) → kỳ giữa (metaphase) → kỳ sau (anaphase) → kỳ cuối (telophase). Nhớ **PMAT**.
2. Màng nhân **tiêu biến ở kỳ đầu (prophase)** (để thoi phân bào tiếp cận NST); **tái lập ở kỳ cuối (telophase)** (bao quanh 2 cụm NST thành 2 nhân mới).
</details>

### 📝 Tóm tắt mục 3

- 4 kỳ PMAT: kỳ đầu (co xoắn, mất màng nhân, lập thoi) → kỳ giữa (xếp 1 hàng giữa) → kỳ sau (tách chromatid về 2 cực) → kỳ cuối (dãn xoắn, lập lại màng nhân).
- Cytokinesis (sau telophase) chia tế bào chất: động vật thắt eo, thực vật tạo vách ngăn.
- DNA nhân đôi ở pha S (TRƯỚC nguyên phân), không phải trong nguyên phân.

---

## 4. Kết quả nguyên phân & tăng trưởng cấp số nhân

### 💡 Trực giác / Hình dung

Một tế bào chia đôi, rồi mỗi tế bào con lại chia đôi... giống **gấp đôi tiền mỗi vòng**: 1 → 2 → 4 → 8 → 16. Con số tăng cực nhanh — đó là vì sao một hợp tử (1 tế bào) có thể thành cơ thể hàng nghìn tỉ tế bào, và cũng vì sao một tế bào ung thư mất kiểm soát trở nên nguy hiểm.

### 4.1. Kết quả của 1 lần nguyên phân

**1 tế bào mẹ (2n) → 2 tế bào con (2n)**, hai con **giống hệt nhau và giống mẹ** về di truyền. Ứng dụng:

- **Sinh trưởng**: hợp tử thành phôi thành cơ thể.
- **Thay thế tế bào**: da, niêm mạc ruột, máu liên tục được làm mới.
- **Sửa chữa**: lành vết thương.
- **Sinh sản vô tính (asexual reproduction)**: vi khuẩn, thủy tức, giâm cành cây — con giống hệt mẹ.

### 4.2. Công thức tăng trưởng và bốn ví dụ số

Bắt đầu từ **1 tế bào**, sau **n lần nguyên phân** liên tiếp → **2ⁿ tế bào**.

**Ví dụ 1 — vài lần đầu:**
- n = 1 → 2¹ = **2** tế bào.
- n = 2 → 2² = **4**.
- n = 3 → 2³ = **8**.
- n = 4 → 2⁴ = **16**.

**Ví dụ 2 — sau 10 lần:**
- 2¹⁰ = **1.024** tế bào (từ 1 tế bào). Hơn 1 nghìn chỉ sau 10 lần chia.

**Ví dụ 3 — sau 20 lần:**
- 2²⁰ = **1.048.576** ≈ **10⁶** (hơn 1 triệu) tế bào.

**Ví dụ 4 — bài toán tổng DNA và chromatid:**
- Bắt đầu 1 tế bào người (2n = 46). Sau 3 lần nguyên phân: số tế bào = 2³ = 8 tế bào, mỗi tế bào 46 NST → tổng **8 × 46 = 368 NST** trong quần thể tế bào. Mỗi tế bào con vẫn là 2n = 46 — số NST mỗi tế bào KHÔNG đổi qua các lần chia (đó là điểm mấu chốt của nguyên phân: giữ nguyên bộ NST).

### 4.3. Bài toán thời gian

Nếu mỗi chu kỳ là 24 h và pha S là 8 h thì pha S chiếm 8/24 = **1/3 ≈ 33%** chu kỳ. Một quần thể vi khuẩn có thời gian thế hệ 30 phút: sau 5 giờ = 10 lần chia → 2¹⁰ = **1.024 lần** số ban đầu (từ 1 tế bào thành ~1.024).

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Vì sao 2 tế bào con giống hệt nhau, không có biến dị?**
A: Vì DNA được nhân đôi **chính xác** ở pha S (2 chromatid chị em y hệt), rồi chia đều ở kỳ sau. Không có sự "trộn" vật chất di truyền. (Ngược lại, **giảm phân (meiosis)** ở Lesson 08 có trao đổi chéo và phân ly độc lập → tạo biến dị → con khác nhau.)

**Q: Số NST có bị "loãng dần" sau nhiều lần chia không?**
A: Không, vì **mỗi lần chia có 1 pha S nhân đôi DNA trước đó**. Mỗi tế bào con luôn nhận đủ bộ 2n. Nhờ vậy tế bào da của bạn vẫn có đúng 46 NST như hợp tử ban đầu, dù đã qua hàng chục lần phân chia.

### ⚠ Lỗi thường gặp

- **Tính 2 × n thay vì 2ⁿ**: sau 10 lần KHÔNG phải 20 tế bào mà là 2¹⁰ = 1.024. Tăng trưởng là **cấp số nhân**, không phải cấp số cộng.
- **Nghĩ số NST mỗi tế bào tăng khi chia nhiều**: sai — mỗi tế bào con luôn là 2n. Số tế bào tăng, nhưng bộ NST mỗi tế bào giữ nguyên.
- **Nghĩ nguyên phân tạo biến dị**: nguyên phân tạo bản sao **giống hệt**. Biến dị là việc của giảm phân + thụ tinh.

### 🔁 Dừng lại tự kiểm tra

1. Từ 1 tế bào, sau bao nhiêu lần nguyên phân thì có hơn 1.000 tế bào?
2. Một mô bắt đầu với 5 tế bào. Sau 4 lần nguyên phân đồng loạt, có bao nhiêu tế bào?

<details>
<summary>Đáp án</summary>

1. 2⁹ = 512 (chưa đủ), 2¹⁰ = 1.024 (đã hơn 1.000). Vậy cần **10 lần** nguyên phân.
2. Mỗi tế bào ban đầu → 2⁴ = 16 tế bào con. Có 5 tế bào ban đầu → 5 × 16 = **80 tế bào**.
</details>

### 📝 Tóm tắt mục 4

- 1 tế bào mẹ (2n) → 2 tế bào con (2n) giống hệt nhau và giống mẹ.
- Sau n lần nguyên phân từ 1 tế bào → 2ⁿ tế bào (1→2→4→8; 10 lần = 1.024; 20 lần ≈ 10⁶).
- Số NST mỗi tế bào con luôn giữ nguyên 2n; nguyên phân không tạo biến dị.

---

## 5. Điểm kiểm soát & ung thư

### 💡 Trực giác / Hình dung

Chu kỳ tế bào có các **trạm gác (checkpoint)** giống **cửa kiểm tra an ninh sân bay**: trước khi cho "hành khách" (tế bào) đi tiếp sang pha sau, một loạt cảm biến kiểm tra "mọi thứ ổn chưa". Nếu phát hiện hỏng (DNA sai, chưa đủ kích thước, NST chưa xếp hàng), cửa **đóng lại** — tế bào dừng để sửa, hoặc nếu hỏng nặng thì **tự hủy (apoptosis)**. Hỏng hệ thống gác này → tế bào lỗi vẫn được cho qua → tích lũy lỗi → **ung thư**.

### 5.1. Ba điểm kiểm soát chính

| Checkpoint | Vị trí | Kiểm tra điều gì |
|------------|--------|------------------|
| **G1/S** (điểm hạn chế) | cuối G1, trước S | Tế bào đủ lớn chưa? DNA có nguyên vẹn không? Đủ tín hiệu/dinh dưỡng để chia chưa? |
| **G2/M** | cuối G2, trước M | DNA đã nhân đôi **xong và đúng** chưa? Có lỗi cần sửa không? |
| **Kỳ giữa (spindle checkpoint)** | trong kỳ giữa | **Mọi** NST đã bám thoi phân bào và xếp đúng hàng chưa? |

Protein **p53** ("người gác cổng của bộ gen") hoạt động mạnh ở G1/S: nếu DNA hỏng, p53 dừng chu kỳ để sửa, hoặc kích hoạt apoptosis nếu không sửa được.

### 5.2. Khi mất kiểm soát → ung thư

Nếu gen điều khiển checkpoint bị đột biến (vd p53 hỏng), tế bào **vượt cửa** dù DNA hỏng → **phân chia vô hạn, không nghe tín hiệu dừng** → tạo khối u. Đặc trưng tế bào ung thư:

- Chia không cần tín hiệu sinh trưởng, phớt lờ tín hiệu dừng.
- Không tự hủy (tránh apoptosis).
- Tăng theo cấp số nhân (liên hệ §4): vì sao khối u lớn nhanh.

**Vì sao ~50% ung thư người liên quan p53 hỏng?** Vì p53 là chốt gác chính ở G1/S. Mất p53 = mất "trạm kiểm tra DNA" → lỗi tích lũy tự do.

### ❓ Câu hỏi tự nhiên của người đọc

**Q: Hóa trị (chemotherapy) hoạt động thế nào dựa trên bài này?**
A: Tế bào ung thư chia **rất nhanh** (qua pha S và M liên tục). Nhiều thuốc hóa trị tấn công đúng các pha này: chặn nhân đôi DNA (pha S), hoặc phá thoi phân bào (kỳ giữa). Tế bào chia nhanh chịu tác động mạnh nhất. Tác dụng phụ (rụng tóc, buồn nôn) là vì tế bào tóc và niêm mạc ruột cũng chia nhanh và bị "vạ lây".

**Q: Một đột biến đã đủ gây ung thư chưa?**
A: Thường KHÔNG. Ung thư thường cần **nhiều đột biến tích lũy** ở nhiều gen checkpoint khác nhau (mô hình "nhiều cú đánh" / multi-hit). Đây là lý do nguy cơ ung thư tăng theo tuổi (càng sống lâu, tế bào càng tích lũy nhiều đột biến).

### ⚠ Lỗi thường gặp

- **Nghĩ ung thư = nhiễm trùng từ bên ngoài**: ung thư là tế bào **của chính cơ thể** mất kiểm soát phân chia, không phải mầm bệnh ngoại lai.
- **Nghĩ p53 "gây" ung thư**: ngược lại, p53 **ngăn** ung thư (gác cổng). Chính khi p53 **hỏng** thì ung thư mới dễ xảy ra.
- **Nghĩ 1 lần lỗi chu kỳ là thành ung thư ngay**: thường cần tích lũy nhiều đột biến qua thời gian.

### 🔁 Dừng lại tự kiểm tra

1. Checkpoint nào kiểm tra DNA đã nhân đôi xong và đúng chưa?
2. Vì sao thuốc phá thoi phân bào lại có thể chặn tế bào ung thư phân chia?

<details>
<summary>Đáp án</summary>

1. Checkpoint **G2/M** (cuối G2, trước khi vào pha M) kiểm tra DNA đã nhân đôi xong và không lỗi. (G1/S kiểm tra trước khi nhân đôi; spindle checkpoint kiểm tra NST xếp hàng.)
2. Không có thoi phân bào → NST không thể tách và đi về 2 cực ở kỳ sau → tế bào kẹt ở kỳ giữa, không hoàn thành nguyên phân → không chia được. Spindle checkpoint cũng giữ tế bào lại, dẫn tới apoptosis.
</details>

### 📝 Tóm tắt mục 5

- 3 checkpoint chính: G1/S (kích thước + DNA nguyên vẹn), G2/M (DNA nhân đôi đúng), kỳ giữa (NST bám thoi + xếp hàng).
- Protein p53 là chốt gác chính ở G1/S; dừng chu kỳ để sửa DNA hoặc kích hoạt tự hủy.
- Mất kiểm soát checkpoint → phân chia vô hạn → ung thư; ~50% ung thư liên quan p53 hỏng.

---

## 6. Bảng tổng hợp diễn biến qua các pha (người, 2n = 46)

| Pha / Kỳ | Số NST | Chromatid/NST | Tổng chromatid | Lượng DNA |
|----------|:------:|:-------------:|:--------------:|:---------:|
| G1 | 46 | 1 | 46 | 2C |
| S (đang nhân đôi) | 46 | 1→2 | 46→92 | 2C→4C |
| G2 | 46 | 2 | 92 | 4C |
| Kỳ đầu / kỳ giữa | 46 | 2 | 92 | 4C |
| Kỳ sau (đã tách) | 92* | 1 | 92 | 4C |
| Sau cytokinesis (mỗi tế bào con) | 46 | 1 | 46 | 2C |

\\* Ở kỳ sau, sau khi chromatid tách, 1 tế bào tạm có 92 NST (mỗi cực 46) trước khi chia.

---

## 7. Bài tập + Lời giải chi tiết

### Bài tập

**Bài 1**: Sắp xếp đúng thứ tự các pha/kỳ sau và ghi sự kiện chính của mỗi pha: kỳ giữa, G1, kỳ sau, S, kỳ đầu, G2, kỳ cuối.

**Bài 2**: Một loài có 2n = 12. Hoàn thành bảng số NST, số chromatid và lượng DNA (dùng 2C ở G1) cho các pha: G1, G2, kỳ sau (sau khi chromatid tách), và mỗi tế bào con.

**Bài 3**: Từ 1 tế bào, sau bao nhiêu lần nguyên phân thì có ít nhất 100 tế bào? Sau bao nhiêu lần thì có hơn 1 triệu tế bào?

**Bài 4**: Một chu kỳ tế bào kéo dài 18 giờ. Pha G1 = 8 h, S = 6 h, G2 = 3 h. (a) Pha M dài bao nhiêu? (b) Kỳ trung gian chiếm bao nhiêu phần trăm? (c) Nếu một thuốc chặn G1/S checkpoint, tế bào sẽ kẹt ở đâu?

**Bài 5**: Phân biệt nguyên phân với nhân đôi DNA: ở pha nào DNA gấp đôi? Ở kỳ nào số NST tạm thời gấp đôi? Hai sự kiện này có phải một không?

**Bài 6**: Giải thích vì sao một tế bào có p53 đột biến (mất chức năng) lại dễ trở thành tế bào ung thư hơn, dựa trên vai trò checkpoint.

**Bài 7**: Một mô gồm 3 tế bào, tất cả cùng vào nguyên phân đồng loạt 5 lần. (a) Có bao nhiêu tế bào cuối cùng? (b) Nếu mỗi tế bào là 2n = 8, tổng số NST trong toàn mô lúc cuối là bao nhiêu?

### Lời giải

**Bài 1**:
Thứ tự: **G1 → S → G2 → kỳ đầu → kỳ giữa → kỳ sau → kỳ cuối**.
- **G1**: tế bào lớn lên, tổng hợp protein/bào quan.
- **S**: nhân đôi DNA — mỗi NST thành 2 chromatid chị em.
- **G2**: chuẩn bị thoi phân bào, kiểm tra DNA (G2/M checkpoint).
- **Kỳ đầu**: NST co xoắn, màng nhân tiêu biến, thoi phân bào hình thành.
- **Kỳ giữa**: NST kép xếp 1 hàng ở mặt phẳng xích đạo.
- **Kỳ sau**: 2 chromatid chị em tách, đi về 2 cực.
- **Kỳ cuối**: NST dãn xoắn, màng nhân tái lập → 2 nhân mới.

**Bài 2** (2n = 12):

| Pha | Số NST | Chromatid/NST | Tổng chromatid | Lượng DNA |
|-----|:------:|:-------------:|:--------------:|:---------:|
| G1 | 12 | 1 | 12 | 2C |
| G2 | 12 | 2 | 24 | 4C |
| Kỳ sau (đã tách) | 24 | 1 | 24 | 4C |
| Mỗi tế bào con | 12 | 1 | 12 | 2C |

Giải thích: G1 chưa nhân đôi (12 NST, 12 chromatid). G2 đã qua S (vẫn 12 NST nhưng mỗi NST 2 chromatid → 24 chromatid, DNA 4C). Kỳ sau: 24 chromatid tách thành 24 NST con (DNA vẫn 4C, đang dồn về 2 cực). Mỗi tế bào con sau chia: 12 NST, 2C.

**Bài 3**:
- 2⁶ = 64 (chưa đủ 100), 2⁷ = 128 (≥ 100). Vậy cần **7 lần** để có ít nhất 100 tế bào.
- 2¹⁹ = 524.288 (chưa quá 1 triệu), 2²⁰ = 1.048.576 (> 1 triệu). Vậy cần **20 lần** để vượt 1 triệu tế bào.

**Bài 4**:
- (a) Pha M = tổng − (G1 + S + G2) = 18 − (8 + 6 + 3) = 18 − 17 = **1 giờ**.
- (b) Kỳ trung gian = G1 + S + G2 = 17 giờ → 17/18 ≈ **94,4%**.
- (c) G1/S checkpoint chặn việc vào pha S → tế bào **kẹt ở cuối G1**, không nhân đôi DNA được, không tiến tới nguyên phân.

**Bài 5**:
- DNA gấp đôi ở **pha S** (kỳ trung gian) — lượng DNA đi từ 2C lên 4C.
- Số NST tạm thời gấp đôi ở **kỳ sau (anaphase)** — khi 92 chromatid (người) tách thành 92 NST con độc lập.
- **Không phải một sự kiện.** Ở pha S, lượng DNA gấp đôi nhưng số NST KHÔNG đổi (vẫn 46, mỗi NST 2 chromatid). Mãi tới kỳ sau, khi chromatid tách rời thì số NST (số tâm động độc lập) mới gấp đôi, dù lúc này lượng DNA không tăng thêm. Tách 2 đại lượng: lượng DNA (đo bằng C) và số NST (đếm bằng tâm động).

**Bài 6**:
- p53 hoạt động ở G1/S checkpoint: khi DNA hỏng, p53 **dừng chu kỳ** để tế bào sửa DNA; nếu hỏng quá nặng, p53 kích hoạt **apoptosis (tự hủy)**.
- Nếu p53 đột biến mất chức năng, tế bào có DNA hỏng vẫn **vượt qua checkpoint** và tiếp tục phân chia, **truyền lỗi cho tế bào con**. Lỗi tích lũy qua nhiều thế hệ tế bào → mất kiểm soát chu kỳ → phân chia vô hạn → khối u. Vì p53 là chốt gác DNA chính, mất nó gỡ bỏ hàng rào bảo vệ quan trọng nhất → đó là lý do khoảng một nửa ung thư người có p53 hỏng.

**Bài 7**:
- (a) Mỗi tế bào → 2⁵ = 32 tế bào con. 3 tế bào ban đầu → 3 × 32 = **96 tế bào**.
- (b) Mỗi tế bào con là 2n = 8 NST → tổng = 96 × 8 = **768 NST** trong toàn mô.

---

## 8. Liên kết và bài tiếp theo

- **Bài tiếp theo trong Biology**: [Lesson 08 — Giảm phân (meiosis)](../lesson-08-meiosis/) — phân bào tạo giao tử (2n → n), có trao đổi chéo và phân ly độc lập → tạo **biến dị**. So sánh trực tiếp với nguyên phân của bài này.
- **Kiến thức tiền đề**:
  - [Lesson 02 — Cấu trúc tế bào](../lesson-02-cell-structure/) — nhân, nhiễm sắc thể, bào quan.
  - [Lesson 01 — Phân tử sinh học](../lesson-01-biomolecules/) — DNA, nucleotide, bắt cặp bổ sung.
- **Liên hệ**:
  - [Lesson 04 — Enzyme & chuyển hóa](../lesson-04-enzymes-metabolism/) — protein/enzyme điều khiển checkpoint.
  - **Sẽ học sâu ở Tầng 2**: cơ chế nhân đôi DNA, đột biến, di truyền — [\`Biology/02-Genetics-Evolution\`](../../02-Genetics-Evolution/).
- **Đọc thêm**: mô hình tương tác — [\`visualization.html\`](./visualization.html) của lesson này (mô phỏng từng kỳ, đồ thị lượng DNA, tăng trưởng cấp số nhân, vòng tròn chu kỳ).

---

## 📝 Tổng kết Lesson 07

1. **Chu kỳ tế bào** = kỳ trung gian (G1 lớn lên, S nhân đôi DNA, G2 chuẩn bị — chiếm ~90%) + pha M (nguyên phân + cytokinesis — ~10%).
2. **Nhiễm sắc thể (đếm bằng tâm động) ≠ nhiễm sắc tử chị em**. Sau pha S: số NST không đổi (vd vẫn 46) nhưng DNA gấp đôi (2C → 4C, mỗi NST 2 chromatid).
3. **Nguyên phân 4 kỳ PMAT**: kỳ đầu (co xoắn, mất màng nhân, lập thoi) → kỳ giữa (xếp 1 hàng giữa) → kỳ sau (tách chromatid về 2 cực) → kỳ cuối (dãn xoắn, lập lại màng nhân). Cytokinesis chia thân tế bào.
4. **Kết quả**: 1 tế bào mẹ (2n) → 2 tế bào con (2n) giống hệt mẹ. Dùng cho sinh trưởng, thay thế, sửa chữa, sinh sản vô tính.
5. **Tăng trưởng cấp số nhân**: 1 tế bào sau n lần → 2ⁿ tế bào (10 lần = 1.024; 20 lần ≈ 10⁶).
6. **Checkpoint** (G1/S, G2/M, kỳ giữa) giữ chu kỳ chính xác; protein p53 là chốt gác DNA. Mất kiểm soát → phân chia vô hạn → **ung thư**.

**Tiếp theo**: [Lesson 08 — Giảm phân (meiosis)](../lesson-08-meiosis/)
`;
