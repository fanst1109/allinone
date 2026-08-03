# Lesson 12 — Từ phác thảo đến tranh hoàn chỉnh (Line → Value → Color → Finish)

> **Bài cuối cùng của lĩnh vực Mỹ thuật (VisualArt) — capstone.** Toàn bộ những gì đã học ở ba nhánh (Màu sắc · Bố cục & Phối cảnh · Sắc độ, Khối & Ánh sáng) hội tụ về một câu hỏi thực hành duy nhất: *một tờ giấy trắng biến thành một bức tranh đọc được như thế nào, theo đúng thứ tự nào?*

## Mục tiêu học tập

- Nắm được **quy trình dựng tranh 4 lớp**: Nét (line) → Sắc độ (value) → Màu (color) → Hoàn chỉnh (finish/detail).
- Giải thích được **vì sao** phải theo đúng thứ tự này, và điều gì hỏng khi làm ngược (tô màu/chi tiết trước khi có sắc độ đúng).
- Gán được **bản đồ sắc độ** (value map) cho một vật thể 3D bằng thang giá trị 9 bậc, kèm số cụ thể.
- Phủ màu mà **giữ nguyên tương quan sắc độ** đã dựng — phân biệt *độ sáng (value)* với *độ bão hòa (chroma)*.
- Đặt **điểm nhấn** (focal point) đúng chỗ bằng tương phản sắc độ và độ nét.

## Kiến thức tiền đề

Bài này *tổng hợp*, nên nó dựa trên cả ba nhánh trước:

- **Nhánh I — Màu sắc**: vòng màu, hòa sắc bổ túc/tương đồng/bộ ba. Xem [VisualArt/01-Color](../../01-Color/index.html), đặc biệt bài [hòa sắc (color harmony)](../../01-Color/lesson-03-color-harmony/README.md).
- **Nhánh II — Bố cục & Phối cảnh**: quy tắc 1/3, tỉ lệ, đường chân trời, điểm tụ (vanishing point).
- **Nhánh III — Sắc độ, Khối & Ánh sáng** (nhánh hiện tại): thang giá trị, dựng khối bằng sáng-tối, và [Lesson 11 — Chất liệu & Chất cảm](../lesson-11-texture-materials/README.md).

Nếu chưa chắc một khái niệm nào, mở lại bài tương ứng rồi quay lại đây — capstone giả định bạn đã gặp các mảnh ghép, việc của bài này là *lắp chúng lại*.

---

## 1. Bức tranh lớn: một tác phẩm là 4 lớp quyết định chồng lên nhau

> 💡 **Trực giác.** Xây một bức tranh giống xây một ngôi nhà: **móng → khung → tường → sơn và trang trí**. Không ai lợp mái ngói (chi tiết) khi chưa đổ móng (bố cục). Người mới vẽ hay làm ngược — sà ngay vào tô màu cánh hoa thật đẹp, rồi mới phát hiện cả bình hoa đặt lệch khung, sáng-tối phẳng lì. Lúc đó sửa = đập đi làm lại.

Mọi bức tranh tả thực có thể tách thành **4 lớp**, mỗi lớp trả lời một câu hỏi và dùng kiến thức của một nhánh:

| Lớp | Câu hỏi lớp này trả lời | Công cụ chính | Kiến thức từ |
|-----|--------------------------|---------------|--------------|
| **1. Nét (line)** | Vật nằm *ở đâu*, *to bao nhiêu*, nhìn từ *góc nào*? | Bố cục, tỉ lệ, phối cảnh | Nhánh II |
| **2. Sắc độ (value)** | Ánh sáng rơi thế nào → khối nổi *ra sao*? | Thang giá trị, mảng sáng-tối | L09–L10 |
| **3. Màu (color)** | Vật *màu gì*, cả tranh *hòa sắc gì*? | Vòng màu, hòa sắc | Nhánh I |
| **4. Hoàn chỉnh (finish)** | *Chất liệu* gì, mắt nên nhìn *vào đâu*? | Chất cảm, điểm nhấn, độ nét | L11 |

Bốn lớp này *cộng dồn*: lớp sau phủ lên lớp trước mà không phá lớp trước. Đó là lý do thứ tự quan trọng — sẽ chứng minh ở mục 2.

> 📝 **Tóm tắt mục 1.**
> - Tranh = 4 lớp quyết định: Nét → Sắc độ → Màu → Hoàn chỉnh.
> - Mỗi lớp trả lời một câu hỏi riêng và dùng kiến thức của một nhánh đã học.
> - Lớp sau bồi lên lớp trước; thứ tự không tùy tiện.

---

## 2. Vì sao đúng thứ tự Line → Value → Color → Finish?

Có hai lý do độc lập, cả hai đều đo được.

### 2.1 Lý do 1 — Chi phí sửa lỗi tăng theo cấp số

> 💡 **Trực giác.** Quyết định càng nền tảng thì càng phải chốt sớm, vì sửa nó về sau càng đắt. Bố cục là quyết định nền tảng nhất → chốt ở lớp 1, khi sửa còn *rẻ* (tẩy vài nét).

Giả sử bạn phát hiện **bố cục bị lệch** (bình hoa quá sát mép). Chi phí sửa tùy thuộc bạn phát hiện ở lớp nào:

| Phát hiện lỗi bố cục ở lớp | Việc phải làm lại | Thời gian ước tính |
|----------------------------|-------------------|-------------------:|
| 1 — Nét | Tẩy và vẽ lại vài đường | ~2 phút |
| 2 — Sắc độ | Dựng lại toàn bộ mảng sáng-tối | ~20 phút |
| 3 — Màu | Phủ lại toàn bộ màu | ~60 phút |
| 4 — Hoàn chỉnh | Gần như vẽ lại cả tranh | ~240 phút |

Chi phí nhảy $2 \to 20 \to 60 \to 240$ — mỗi lớp trễ đắt lên khoảng **3–10 lần**. Kết luận định lượng: **chốt quyết định rẻ trước, để dành công sức cho lớp trên cùng.** (Đây đúng là nguyên lý "chi phí sửa lỗi càng muộn càng đắt" mà kỹ thuật phần mềm cũng dùng.)

### 2.2 Lý do 2 — Sắc độ gánh phần lớn khả năng đọc hình

> 💡 **Trực giác.** Che màu đi, tranh vẫn "đọc" được khối và không gian nhờ sáng-tối. Che sáng-tối đi (mọi vùng cùng một độ sáng, chỉ khác màu), tranh **phẳng lì** — mắt không còn thấy khối. Vậy *value làm việc, color ghi công*.

Phép thử cụ thể để tự kiểm chứng (viz bài này mô phỏng đúng điều này):

1. Lấy một bức ảnh màu bất kỳ → chuyển sang **grayscale** (bỏ hue, giữ value). Kết quả: vẫn nhận ra hình khối, chiều sâu, nhân vật.
2. Lấy đúng bức đó → ép mọi vùng về **cùng một value** (ví dụ tất cả sáng 55%), chỉ giữ khác biệt về **hue**. Kết quả: gần như một mảng phẳng, khó nhận ra vật gì.

Vì thế, nếu dựng **màu trước khi sắc độ đúng**, bạn đang trang trí một cái khung sai — màu đẹp không cứu được khối sai.

> ⚠ **Lỗi thường gặp — tô màu quá sớm.** Người mới thường phủ màu "cho có không khí" ngay sau khi phác nét, bỏ qua lớp value. Hậu quả: các mặt của vật đều một độ sáng → khối bẹt; khi nhận ra thì màu đã phủ kín, sửa value = phủ lại tất cả (xem bảng chi phí 2.1). **Quy tắc:** *value xong mới đụng tới màu.*

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy chẳng lẽ không được vẽ thẳng bằng màu (alla prima)?"* → Được, họa sĩ giỏi làm vậy, nhưng trong đầu họ **vẫn** ước lượng value của từng nhát màu trước khi đặt. Thứ tự 4 lớp là *thứ tự tư duy*, không nhất thiết là 4 lần vẽ tách biệt.
> - *"Line có phải luôn là nét chì thấy được?"* → Không. "Line" là *giai đoạn định vị & tỉ lệ*. Nó có thể chỉ là vài dấu đo mờ rồi xóa. Điều quan trọng là *quyết định vị trí* đã được chốt trước.
> - *"Nếu tranh trừu tượng, không có khối thì sao?"* → Vẫn có bố cục và tương quan sắc độ; chỉ lớp "khối 3D" là tùy chọn. Bốn lớp co giãn theo thể loại.

> 📝 **Tóm tắt mục 2.**
> - Chốt quyết định nền tảng sớm vì chi phí sửa tăng theo cấp số ($\approx 2 \to 20 \to 60 \to 240$).
> - Sắc độ gánh phần lớn khả năng đọc hình; màu bồi cảm xúc/không khí.
> - Thứ tự 4 lớp là *thứ tự tư duy* — kể cả khi vẽ thẳng bằng màu.

---

## 3. Lớp 1 — Nét: bố cục, tỉ lệ, phối cảnh

Ba việc của lớp này, làm bằng *đường mờ và dấu đo*, chưa đụng sáng-tối hay màu.

### 3.1 Bố cục — quy tắc 1/3

> 💡 **Trực giác.** Đặt nhân vật ngay chính giữa thường "đứng im, buồn tẻ". Chia khung thành lưới $3 \times 3$ và đặt điểm quan trọng lên **giao điểm** của các đường 1/3 → bố cục sinh động, mắt có đường dẫn.

Ví dụ số — khung $900 \times 600$ px:

- Đường dọc 1/3: $x = 900/3 = 300$ và $x = 600$.
- Đường ngang 1/3: $y = 600/3 = 200$ và $y = 400$.
- Bốn giao điểm mạnh: $(300,200),\ (600,200),\ (300,400),\ (600,400)$.
- Đặt tiêu điểm ở, ví dụ, $(600, 200)$ — **không** ở tâm $(450, 300)$.

Biến thể tinh hơn — **tỉ lệ vàng (golden ratio)** $\varphi \approx 1.618$: chia $900 / 1.618 \approx 556$, nên đường mạnh ở $x \approx 556$ hoặc $x \approx 900 - 556 = 344$. Rất gần đường 1/3 ($300$/$600$) nên trong thực hành, 1/3 là xấp xỉ đủ tốt.

### 3.2 Tỉ lệ — đo bằng đơn vị (sight-size)

> 💡 **Trực giác.** Đừng đoán "cái cốc cao chừng này"; hãy **chọn một vật làm thước** rồi đo mọi vật khác *theo bội số của nó*. Sai tỉ lệ tương đối là lỗi phá tranh khó cứu nhất.

Ví dụ số — lấy chiều rộng quả táo làm **1 đơn vị**:

| Vật | Chiều rộng | Chiều cao | Tỉ lệ cao/rộng |
|-----|-----------:|----------:|---------------:|
| Quả táo (thước) | 1.00 | 0.90 | 0.90 |
| Cái cốc | 0.65 | 1.30 | $1.30/0.65 = 2.00$ |
| Cái đĩa | 1.80 | 0.20 | 0.11 |
| Chai | 0.55 | 2.40 | $2.40/0.55 \approx 4.36$ |

Chỉ cần các *tỉ lệ tương đối* này đúng, tranh sẽ "giống" dù bạn phóng to hay thu nhỏ toàn bộ.

### 3.3 Phối cảnh — đường chân trời & điểm tụ

> 💡 **Trực giác.** Các cạnh song song đi xa thì *hội tụ* về một điểm trên **đường chân trời (horizon line)** — điểm đó là **điểm tụ (vanishing point, VP)**. Đường chân trời = tầm mắt người xem.

Ví dụ số — một khối hộp trong **phối cảnh 1 điểm tụ**, đường chân trời ở $y = 200$, VP tại $(600, 200)$:

- Mặt trước hộp là hình chữ nhật $(400,250)$–$(520,375)$ (các cạnh dọc/ngang, không hội tụ).
- Các cạnh *đi sâu* nối mỗi góc mặt trước về VP $(600,200)$: góc $(520,250)$, $(520,375)$, $(400,250)$, $(400,375)$ đều kéo về $(600,200)$.
- Mặt sau nằm trên các đường hội tụ đó, nhỏ hơn mặt trước → cảm giác chiều sâu.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Khung $1200 \times 800$. Các đường 1/3 dọc và ngang nằm ở toạ độ nào?
> 2. Nếu cốc cao 1.30 đơn vị và bạn vẽ nó cao 260 px, thì 1 đơn vị = bao nhiêu px? Quả táo (0.90 đơn vị cao) nên vẽ cao bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. Dọc: $x = 400$ và $800$. Ngang: $y = 800/3 \approx 267$ và $533$.
> 2. $1$ đơn vị $= 260 / 1.30 = 200$ px. Táo cao $= 0.90 \times 200 = 180$ px.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Bố cục: đặt tiêu điểm lên giao điểm đường 1/3, không ở tâm.
> - Tỉ lệ: chọn một vật làm thước, đo mọi vật theo bội số của nó.
> - Phối cảnh: cạnh song song hội tụ về điểm tụ trên đường chân trời.

---

## 4. Lớp 2 — Sắc độ: mảng sáng-tối và khối

### 4.1 Thang giá trị 9 bậc

> 💡 **Trực giác.** Sắc độ (value) là *độ sáng-tối* của một mảng, bỏ qua màu. Chia dải từ đen tới trắng thành **9 bậc (0–8)** để có ngôn ngữ chung: thay vì nói "hơi tối", nói "bậc 3".

Ví dụ số — ánh xạ bậc sang độ sáng (lightness %):

| Bậc | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-----|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Sáng % | 0 | 12 | 25 | 37 | 50 | 62 | 75 | 87 | 100 |
| Tên | đen | | | | xám giữa | | | | trắng |

### 4.2 Bản đồ sắc độ của một quả cầu

> 💡 **Trực giác.** Trên một quả cầu chiếu sáng từ **trên-trái**, ánh sáng "trượt" quanh mặt cầu tạo một chuỗi vùng theo thứ tự cố định. Nhớ được chuỗi này là nhớ được cách dựng *mọi* khối tròn.

Ví dụ số — gán bậc value cho từng vùng (sáng → tối):

| Vùng | Bậc | Ghi chú |
|------|:---:|---------|
| **Highlight** (đốm sáng nhất) | 8 | phản chiếu trực tiếp nguồn sáng, rất nhỏ |
| **Vùng sáng** (light) | 6 | phần mặt hướng thẳng nguồn |
| **Nửa sáng** (halftone) | 4 | chuyển tiếp sang tối |
| **Ánh phản** (reflected light) | 3 | ánh dội từ mặt bàn hắt lên rìa dưới |
| **Bóng lõi** (core shadow) | 2 | dải tối nhất *trên* vật, ở ranh giới sáng-tối |
| **Bóng đổ** (cast shadow) | 1 | vật che sáng, đổ xuống mặt bàn; đậm nhất ngay chân vật ($\approx$ bậc 0) |

Hai điểm sống-còn:

1. **Bóng lõi (2) tối hơn nửa sáng (4)** — nó *không* nằm ở rìa ngoài cùng của vật, mà lùi vào một chút, vì rìa ngoài đã được ánh phản nâng lên.
2. **Ánh phản (3) sáng hơn bóng lõi (2) nhưng vẫn thuộc "gia đình tối"** — luôn tối hơn nửa sáng (4) của mặt hướng sáng.

> ⚠ **Lỗi thường gặp — ánh phản quá sáng.** Người mới hay tô ánh phản lên bậc 5–6 cho "long lanh". Hậu quả: rìa dưới quả cầu sáng ngang mặt hướng sáng → mắt đọc thành *hai nguồn sáng*, khối bị "thủng". **Quy tắc:** ánh phản luôn $<$ nửa sáng (giữ trong gia đình tối).

### 4.3 Gom về 3 mảng — Notan / nheo mắt

> 💡 **Trực giác.** Nheo mắt lại, chi tiết biến mất, chỉ còn vài mảng lớn: **sáng / trung / tối**. Nếu 3 mảng này đã "đọc" ra hình thì tranh sẽ vững; nếu 3 mảng nhòe vào nhau thì thêm chi tiết cũng vô ích. Cách chia này gọi là **notan**.

Ví dụ số — một bố cục mạnh thường chia diện tích **không đều**:

- Mảng sáng (gia đình bậc 6–8): $\approx 30\%$ diện tích.
- Mảng trung (bậc 4–5): $\approx 45\%$.
- Mảng tối (bậc 0–2): $\approx 25\%$.

Chia đều $33\%/33\%/33\%$ thường cho cảm giác "lửng lơ, thiếu điểm nhấn"; một mảng nên trội hẳn.

> 🔁 **Dừng lại tự kiểm tra.** Sắp các vùng của quả cầu từ **tối nhất** đến **sáng nhất**: nửa sáng, highlight, bóng đổ, vùng sáng, bóng lõi, ánh phản.
>
> <details><summary>Đáp án</summary>
>
> Bóng đổ (1) < bóng lõi (2) < ánh phản (3) < nửa sáng (4) < vùng sáng (6) < highlight (8).
> </details>

> 📝 **Tóm tắt mục 4.**
> - Value = độ sáng-tối, chuẩn hóa bằng thang 9 bậc (0–8).
> - Chuỗi vùng của khối tròn: highlight > vùng sáng > nửa sáng > ánh phản > bóng lõi > bóng đổ.
> - Ánh phản phải tối hơn nửa sáng; đừng để "thủng" khối.
> - Nheo mắt gom về 3 mảng sáng/trung/tối, chia diện tích không đều.

---

## 5. Lớp 3 — Màu: phủ hòa sắc mà giữ tương quan sắc độ

### 5.1 Vòng màu và ba kiểu hòa sắc — bằng góc

> 💡 **Trực giác.** Đặt các sắc (hue) lên một vòng tròn $0^\circ$–$360^\circ$. Chọn hòa sắc = chọn *cách lấy điểm* trên vòng đó.

Ví dụ số — vị trí góc gần đúng: Đỏ $0^\circ$, Cam $30^\circ$, Vàng $60^\circ$, Lục $120^\circ$, Lam $210^\circ$, Tím $270^\circ$.

| Kiểu hòa sắc | Quy tắc góc | Ví dụ |
|--------------|-------------|-------|
| **Bổ túc (complementary)** | lệch $180^\circ$ | Cam $30^\circ$ ↔ Lam $210^\circ$ |
| **Tương đồng (analogous)** | trong khoảng $\pm 30^\circ$–$40^\circ$ | Đỏ-cam $15^\circ$, Cam $30^\circ$, Vàng-cam $45^\circ$ |
| **Bộ ba (triadic)** | cách nhau $120^\circ$ | $0^\circ,\ 120^\circ,\ 240^\circ$ |

Ví dụ trong viz bài này: quả cầu **cam** ($\approx 20^\circ$) đặt cạnh khối hộp **lam** ($\approx 215^\circ$) — lệch $\approx 195^\circ \approx 180^\circ$ → **bổ túc**. Cặp bổ túc làm nhau nổi bật, và (ấm cam tiến tới / lạnh lam lùi ra) tạo thêm chiều sâu.

### 5.2 Phủ màu = giữ value, chỉ thêm hue + chroma

> 💡 **Trực giác.** Mỗi màu *cũng có một value*. Khi phủ màu lên vùng đã dựng ở lớp 2, phải chọn màu **có độ sáng khớp với bậc value đó**. Nếu không, bạn vô tình *xóa* công dựng khối vừa làm.

Ví dụ số — mặt hướng sáng của khối hộp đã dựng ở **bậc 6 ($\approx 75\%$)**, cần phủ màu lam:

- Chọn `hsl(214, 45%, 75%)` → lightness $75\%$, **khớp bậc 6**. ✓ Khối giữ nguyên.
- Chọn `hsl(214, 80%, 42%)` → cùng hue lam nhưng lightness $42\%$ ($\approx$ bậc 3). ✗ Mặt "hướng sáng" bỗng tối ngang mặt khuất → khối **phẳng lại**.

> ⚠ **Lỗi thường gặp — nhầm độ bão hòa với độ sáng.** *Chroma cao $\ne$ sáng.* Vàng bão hòa có value cao ($\approx$ bậc 7), tím bão hòa có value thấp ($\approx$ bậc 2), dù cả hai đều "rực". Chọn màu theo cảm giác "rực rỡ" mà không kiểm tra value là cách nhanh nhất phá vỡ khối. **Quy tắc:** khớp *value* trước, chỉnh *hue/chroma* sau.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Làm sao biết value của một màu?"* → Chuyển tạm màu đó sang grayscale (nhiều app có nút này), hoặc nheo mắt so với thang xám. Trong hệ HSL, lightness là xấp xỉ nhanh (không hoàn hảo vì mắt nhạy với vàng hơn lam).
> - *"Bóng có phải chỉ là màu vật tối đi không?"* → Không hẳn — bóng thường **ngả lạnh** và giảm chroma, còn vùng sáng ngả ấm. Nhưng bước đầu, cứ giữ đúng *value* đã là 80% kết quả.

> 🔁 **Dừng lại tự kiểm tra.** Bạn dựng vùng bậc 4 ($\approx 50\%$) cho một chiếc lá. Trong hai màu lục sau, màu nào giữ đúng khối: `hsl(120,40%,50%)` hay `hsl(120,70%,28%)`?
>
> <details><summary>Đáp án</summary>
>
> `hsl(120,40%,50%)` — lightness $50\%$ khớp bậc 4. Cái còn lại ($28\%$) là bậc $\approx 2$, sẽ kéo vùng này tối đi và phá khối.
> </details>

> 📝 **Tóm tắt mục 5.**
> - Hòa sắc chọn bằng góc trên vòng màu: bổ túc $180^\circ$, tương đồng $\pm 30^\circ$, bộ ba $120^\circ$.
> - Mỗi màu có một value; phủ màu phải khớp value đã dựng.
> - Chroma (bão hòa) $\ne$ value (sáng). Khớp value trước.

---

## 6. Lớp 4 — Hoàn chỉnh: chất liệu và điểm nhấn

> 💡 **Trực giác.** Ba lớp đầu đã cho một bức tranh "đúng nhưng chưa sống". Lớp 4 thêm *dấu vân tay của vật chất* (chất liệu) và *chỉ đường cho mắt* (điểm nhấn). Đây là nơi ít nhất mà tạo khác biệt lớn nhất — nhưng cũng dễ lạm dụng nhất.

Ba việc của lớp hoàn chỉnh:

1. **Chất liệu (texture)** — dựa trên L11: bề mặt bóng có specular highlight nhỏ & sắc; bề mặt mờ (nhám) có highlight to & nhòe; gỗ có vân; vải có sợi. Chỉ thêm ở nơi cần, không rải đều.
2. **Điểm nhấn (focal point)** = nơi có **tương phản mạnh nhất**. Ví dụ số: đặt cạnh nhau bậc 8 và bậc 1 (chênh **7 bậc**) *ngay tại tiêu điểm*; những nơi khác giữ chênh nhỏ hơn (chênh 2–3 bậc). Mắt luôn bị hút về nơi tương phản cao nhất.
3. **Kiểm soát độ nét (edge control)** — cạnh **sắc (hard)** ở tiêu điểm để hút mắt; cạnh **mềm (soft)** ở rìa và nền để đẩy ra sau. Nét đều khắp = không có tiêu điểm.

> ⚠ **Lỗi thường gặp — chi tiết đều khắp tranh.** Tô chi tiết và độ nét *ở mọi nơi* nghĩ rằng "càng kỹ càng đẹp". Hậu quả: mọi vùng cùng tranh nhau sự chú ý → mắt không biết nhìn đâu, tranh "ồn" và mỏi mắt. **Quy tắc:** hy sinh chi tiết ở nền/rìa để dồn cho tiêu điểm — *phân cấp thị giác (visual hierarchy)* mới là mục tiêu, không phải "vẽ hết mọi thứ".

> 📝 **Tóm tắt mục 6.**
> - Lớp hoàn chỉnh: chất liệu + điểm nhấn + kiểm soát độ nét.
> - Điểm nhấn = tương phản value cao nhất (vd chênh 7 bậc) đặt tại tiêu điểm.
> - Cạnh sắc hút mắt, cạnh mềm đẩy ra sau; đừng làm nét đều khắp.

---

## 7. Ghép lại: một checklist dựng tranh

Toàn bộ bài gói vào một quy trình lặp đi lặp lại được cho *bất kỳ* tranh tả thực nào:

1. **Nét** — chia khung theo 1/3, chốt vị trí & tỉ lệ tương đối, dựng phối cảnh (đường chân trời + VP). *Kiểm: nheo mắt, bố cục có điểm dẫn không?*
2. **Sắc độ** — gom về 3 mảng notan; dựng chuỗi vùng của từng khối bằng thang 9 bậc. *Kiểm: chuyển grayscale trong đầu — khối có nổi không?*
3. **Màu** — chọn hòa sắc (bổ túc/tương đồng/bộ ba); phủ màu **khớp value** từng vùng. *Kiểm: nheo mắt — tương quan sáng-tối có còn nguyên như lớp 2?*
4. **Hoàn chỉnh** — thêm chất liệu, đẩy tương phản & độ nét cực đại tại tiêu điểm, làm mềm rìa/nền. *Kiểm: mắt có bị dẫn tới đúng chỗ không?*

**Ngân sách thời gian** (ví dụ một study 120 phút) — dồn thời gian cho quyết định *rẻ để sửa* và *gánh nhiều kết quả*:

| Lớp | Thời gian | Tỉ lệ |
|-----|----------:|------:|
| Nét | 30 phút | 25% |
| Sắc độ | 50 phút | 42% |
| Màu | 25 phút | 21% |
| Hoàn chỉnh | 15 phút | 12% |

Hơn $60\%$ thời gian nằm ở hai lớp đầu (Nét + Sắc độ) — đúng với hai lý do ở mục 2.

> 📝 **Tóm tắt mục 7.**
> - Quy trình 4 bước lặp lại cho mọi tranh, mỗi bước có một câu "kiểm".
> - Dồn $>60\%$ công sức cho Nét + Sắc độ (rẻ để sửa, gánh khả năng đọc hình).
> - Màu và Hoàn chỉnh bồi lên chứ không cứu được cấu trúc sai.

---

## 8. Bài tập

**Bài 1 (thứ tự & lý do).** Cho 4 việc rời: (a) phủ màu cam cho quả cầu; (b) chấm đốm specular highlight sáng trắng; (c) chia khung theo quy tắc 1/3 và đặt quả cầu vào giao điểm; (d) tô các mảng xám dựng khối quả cầu. Sắp đúng thứ tự dựng tranh, và giải thích *một câu* vì sao mỗi bước phải đứng trước bước sau.

**Bài 2 (bản đồ sắc độ).** Quả cầu chiếu sáng từ trên-trái. Gán bậc value (0–8) cho: highlight, vùng sáng, nửa sáng, bóng lõi, ánh phản, bóng đổ. Rồi chỉ ra một chỗ người mới hay tô sai và hậu quả.

**Bài 3 (màu giữ value).** Bạn đã dựng mặt hướng sáng của một khối hộp ở **bậc 6 ($\approx 75\%$)**, cần phủ màu lam. Chọn giữa `hsl(214,45%,75%)` và `hsl(214,80%,42%)`. Chọn cái nào? Vì sao? Điều gì hỏng nếu chọn sai?

**Bài 4 (hòa sắc + điểm nhấn).** Một tĩnh vật lấy **quả cam** (hue $\approx 30^\circ$) làm nhân vật chính. (a) Chọn hue nền theo hòa sắc **bổ túc** để quả cam nổi bật — hue nào? (b) Đặt tương phản value mạnh nhất ở đâu và chênh khoảng bao nhiêu bậc? (c) Vì sao *không* nên rải chi tiết/độ nét đều khắp tranh?

---

## 9. Lời giải chi tiết

**Bài 1.** Thứ tự đúng: **c → d → a → b**.

- **c (Nét)** trước tiên: bố cục là quyết định nền tảng nhất và rẻ nhất để sửa (mục 2.1) — chốt khung trước khi bồi bất cứ thứ gì lên.
- **d (Sắc độ)** trước màu: value gánh khả năng đọc khối; dựng khối đúng ở grayscale rồi mới phủ màu (mục 2.2).
- **a (Màu)** sau value: màu phủ *lên* value đã đúng, phải khớp độ sáng từng vùng (mục 5.2).
- **b (Highlight)** cuối cùng: là điểm nhấn nhỏ của lớp hoàn chỉnh; đặt sớm sẽ bị các lớp sau đè lên/làm bẩn.

**Bài 2.** Gán bậc và sắp sáng → tối:

$$\text{highlight }(8) > \text{vùng sáng }(6) > \text{nửa sáng }(4) > \text{ánh phản }(3) > \text{bóng lõi }(2) > \text{bóng đổ }(1).$$

Chỗ hay sai: **ánh phản bị tô quá sáng** (lên bậc 5–6). Hậu quả: rìa dưới quả cầu sáng ngang mặt hướng sáng → mắt đọc thành hai nguồn sáng, khối bị "thủng". Ánh phản phải luôn tối hơn nửa sáng (giữ trong gia đình tối). Một chỗ sai khác: đặt bóng lõi ngay ở rìa ngoài cùng — thực ra nó lùi vào trong một chút vì rìa đã được ánh phản nâng lên.

**Bài 3.** Chọn **`hsl(214,45%,75%)`**.

- Lý do: lightness $75\%$ **khớp bậc 6** đã dựng ở lớp value → khối giữ nguyên.
- Nếu chọn `hsl(214,80%,42%)`: dù cùng hue lam, lightness chỉ $42\%$ ($\approx$ bậc 3). Mặt "hướng sáng" bỗng tối ngang mặt khuất → **khối lập phương phẳng lại**, xóa sạch công dựng khối. Đây chính là lỗi "nhầm chroma với value" (mục 5.2): $80\%$ saturation *trông* rực nhưng *không* làm nó sáng.

**Bài 4.**

- **(a)** Bổ túc của cam ($30^\circ$) là $30^\circ + 180^\circ = 210^\circ$ → **nền lam**. Nền lam lạnh lùi ra sau, quả cam ấm tiến tới → vừa tương phản hue vừa tăng chiều sâu.
- **(b)** Đặt tương phản value mạnh nhất ngay **trên quả cam tại giao điểm 1/3** — ví dụ highlight bậc 8 kề accent bậc 1, **chênh $\approx 7$ bậc**; các nơi khác giữ chênh 2–3 bậc để không cạnh tranh với tiêu điểm.
- **(c)** Nếu chi tiết/độ nét đều khắp, mọi vùng tranh nhau sự chú ý → không còn tiêu điểm, mắt "lạc". Giảm nét ở rìa/nền (cạnh mềm) và dồn nét + tương phản cho tiêu điểm tạo **phân cấp thị giác** — đó mới là mục tiêu, không phải "vẽ hết mọi thứ".

---

## Kết thúc — bài cuối cùng của lĩnh vực Mỹ thuật

Đây là **bài học cuối cùng của lĩnh vực Mỹ thuật (VisualArt)**. Nếu ba nhánh trước là ba bộ công cụ rời, thì bài này là *bản lắp ráp*: nó cho thấy chúng không phải ba chủ đề tách biệt mà là **bốn lớp của cùng một hành động** — biến tờ giấy trắng thành một hình đọc được.

**Tổng kết cả lộ trình VisualArt:**

- **Nhánh I — Màu sắc**: vòng màu, mô hình màu, hòa sắc (bổ túc/tương đồng/bộ ba), nhiệt độ & tương phản. → *dùng ở lớp 3.*
- **Nhánh II — Bố cục & Phối cảnh**: quy tắc 1/3, tỉ lệ, đường chân trời, điểm tụ. → *dùng ở lớp 1.*
- **Nhánh III — Sắc độ, Khối & Ánh sáng**: thang giá trị, dựng khối bằng sáng-tối, chất liệu & chất cảm (L11). → *dùng ở lớp 2 và 4.*
- **Lesson 12 (bài này)** — capstone: gói cả ba nhánh thành **quy trình dựng tranh Nét → Sắc độ → Màu → Hoàn chỉnh**, kèm lý do *vì sao đúng thứ tự đó* (chi phí sửa lỗi tăng theo cấp số; sắc độ gánh khả năng đọc hình).

**Bài học lớn nhất mang theo:** một tác phẩm không phải "vẽ cho đẹp từng chỗ" mà là **một chuỗi quyết định theo lớp** — chốt quyết định nền tảng khi còn rẻ, để dành công sức cho lớp trên cùng. Nguyên lý này đúng cho mọi việc dựng-nên-cái-gì-đó, không riêng hội họa.

**Đi tiếp trong nhóm Nghệ thuật:** ngôn ngữ nghệ thuật khác cũng theo cùng logic "cấu trúc trước, chi tiết sau" — trong âm nhạc, người ta chốt hòa thanh & nhịp (khung) trước khi phối khí & luyến láy (chi tiết), y hệt Nét → Sắc độ đứng trước Màu → Hoàn chỉnh. Mời bạn sang lĩnh vực cùng nhóm: [**Âm nhạc (Music)**](../../../Music/index.html).

Minh họa tương tác: [visualization.html](./visualization.html) — bật/tắt từng lớp (Nét · Sắc độ · Màu · Hoàn chỉnh) trên một cảnh tĩnh vật, hoặc kéo thanh "giai đoạn 1→4" để xem bức tranh xây dần từng lớp.
