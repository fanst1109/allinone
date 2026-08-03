# Lesson 09 — Value & thang xám (Value / grayscale)

> Một bức tranh sống hay chết không nằm ở màu, mà ở **value** — độ đậm nhạt. Chụp đen trắng mà vẫn "đọc" được khối và chiều sâu, đó mới là vẽ đúng.

## Mục tiêu học tập

- Định nghĩa được **value** (độ đậm nhạt, sáng-tối) và phân biệt rõ với **hue (màu sắc)** và **saturation (độ bão hòa)** — kèm ví dụ số.
- Hiểu *vì sao* value quan trọng hơn hue trong việc tạo **khối (form)** và **chiều sâu (depth)** — vì sao ảnh đen trắng vẫn đọc được.
- Dựng và đọc **thang value 9 bậc** (0% đen → 100% trắng).
- Hiểu **posterize** (gom về N bậc value) và ứng dụng **notan** (nghiên cứu 2–3 mảng sáng tối).
- Phân biệt **high-key** (sáng) / **low-key** (tối) và dùng **tương phản value** để dẫn mắt.

## Kiến thức tiền đề

- Biết màu có 3 thuộc tính hue / saturation / value — xem [Lesson 01 — Vòng thuần sắc & thuộc tính màu](../../01-Color/lesson-01-color-wheel-properties/). Bài này tách riêng **value** ra để mổ xẻ.
- Số học phần trăm và làm tròn (round). Không cần biết vẽ trước.

---

## 1. Value là gì?

> 💡 **Trực giác.** Hãy tưởng tượng bạn vặn nút "màu" trên TV về 0 — hình vẫn còn, chỉ mất màu. Cái *còn lại* đó chính là **value**: bản đồ sáng-tối của cảnh. Nếu bản đồ sáng-tối đúng, mắt vẫn thấy quả táo tròn, cái bàn có chiều sâu. Màu chỉ là "lớp sơn" phủ lên trên bản đồ đó.

**(a) Là gì.** *Value* (còn gọi *tone*, *độ đậm nhạt*) là mức độ **sáng hay tối** của một vùng, đo độc lập với việc nó mang màu gì. Ta quy về thang phần trăm: **0% = đen tuyền**, **100% = trắng tinh**, ở giữa là các mức xám.

**(b) Vì sao cần khái niệm riêng.** Màu (color) gộp 3 thứ khác nhau: *hue* (đỏ/lục/lam — màu nào), *saturation* (đậm màu hay nhạt màu), và *value* (sáng hay tối). Gộp chung thì không nói được "vì sao khối nổi": khối nổi là nhờ **chênh lệch value** giữa vùng sáng và vùng tối, không phải nhờ đổi hue. Tách value ra để điều khiển nó một cách có chủ đích.

**(c) Ví dụ số cụ thể** (≥ 4, trải đều thang):

| Vùng | Value | Mô tả |
|------|------:|-------|
| Bóng đổ sâu nhất | 0% | đen, không có ánh sáng chạm tới |
| Vùng tối của khối (shadow) | 25% | mặt quay khỏi nguồn sáng |
| Nửa tối (midtone) | 50% | mặt nghiêng so với nguồn |
| Vùng sáng (light) | 75% | mặt hứng gần trực diện nguồn |
| Điểm chói (highlight) | 100% | phản chiếu trực tiếp nguồn sáng |

Năm mức trên là "xương sống" của bất kỳ khối nào được chiếu sáng: chỉ cần 5 giá trị này đặt đúng chỗ, mắt đã đọc ra hình cầu 3D.

> ⚠ **Lỗi thường gặp.** Nhầm **value** với **saturation**. "Đỏ đậm" (đậm màu) không có nghĩa là "đỏ tối" (value thấp). Một màu đỏ tươi rực rỡ vẫn có thể ở value trung bình. Vặn saturation về 0 → ra xám cùng value; vặn value về 0 → ra đen bất kể saturation.

---

## 2. Vì sao value quan trọng hơn hue?

> 💡 **Trực giác.** Thử nghiệm kinh điển: chụp một bức tranh thành đen trắng. Nếu **vẫn đọc được** khối, chiều sâu, đâu là nhân vật chính → value đã đúng. Nếu bức đen trắng trông *phẳng lì, rối, không biết nhìn đâu* → dù màu có đẹp, tranh vẫn hỏng. Đó là lý do hoạ sĩ dựng **value trước, tô màu sau**.

Điểm mấu chốt: **mỗi hue có sẵn một value nội tại**. Ta đo value của một màu RGB bằng công thức **luminance** (Rec.601):

$$L = 0.299\,R + 0.587\,G + 0.114\,B \quad (R,G,B \in [0,255])$$

Hệ số của lục (0.587) lớn nhất, của lam (0.114) nhỏ nhất — vì mắt người nhạy với ánh lục nhất, kém với lam nhất.

**Ví dụ số** — cùng saturation cực đại (màu thuần), nhưng value chênh nhau khủng khiếp:

| Màu thuần | RGB | $L$ (0–255) | Value % | Nhận xét |
|-----------|-----|------------:|--------:|----------|
| Vàng | (255, 255, 0) | $0.299(255)+0.587(255) = 226$ | **89%** | tự thân đã rất sáng |
| Lục | (0, 255, 0) | $0.587 \times 255 = 150$ | **59%** | sáng vừa |
| Đỏ | (255, 0, 0) | $0.299 \times 255 = 76$ | **30%** | tối vừa |
| Lam | (0, 0, 255) | $0.114 \times 255 = 29$ | **11%** | tự thân đã rất tối |

Đọc bảng: **vàng và lam** tuy là hai hue chỉ khác nhau về "màu", nhưng chênh nhau tới $89\% - 11\% = 78$ điểm value. Trong ảnh đen trắng, vàng gần như trắng còn lam gần như đen. Ngược lại, hai hue *khác nhau* nhưng *cùng value* (ví dụ một đỏ 40% và một lục 42%) sẽ **hòa vào nhau** thành cùng một mảng xám — hình vẽ biến mất.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vậy màu có vô dụng không?"* → Không. Màu tạo cảm xúc, nhiệt độ, không khí. Nhưng nó **phủ lên** cấu trúc value, không thay thế được. Value dựng nhà, màu sơn tường.
> - *"Vì sao vàng luôn sáng, lam luôn tối?"* → Do sinh lý mắt (công thức luminance): kênh lục/đỏ đóng góp nhiều vào cảm nhận sáng, kênh lam đóng góp rất ít. Đây là hằng số vật lý, không phải quy ước.
> - *"Làm sao biết tranh mình đúng value?"* → Chuyển sang grayscale (bỏ màu). Viz bài này cho bạn bấm toggle để thử ngay.

> ⚠ **Lỗi thường gặp.** Dùng **hai màu rực rỡ khác hue nhưng cùng value** cạnh nhau để phân biệt hai vật (ví dụ chữ đỏ trên nền lục cùng độ sáng). Với mắt thường trông rõ, nhưng in đen trắng hoặc với người mù màu → **biến mất** vì không có chênh lệch value. Muốn tách bạch chắc chắn: tách bằng **value**, không chỉ bằng hue.

---

## 3. Thang value 9 bậc

> 💡 **Trực giác.** Thực tế value là dải liên tục vô hạn mức. Nhưng mắt người khó phân biệt quá nhiều mức sát nhau, và khi vẽ ta cần một "bảng chia độ" để nhắm. Hoạ sĩ quy ước một **thang rời rạc** — phổ biến là **9 bậc** đánh số 1→9 (hoặc 0→8), chia đều từ đen tới trắng.

**Công thức chia đều** — bậc thứ $i$ (với $i = 0,1,\dots,8$) có value:

$$\text{value}_i = \frac{i}{8}\times 100\%$$

**Ví dụ số** — điền cả 9 bậc:

| Bậc | $i$ | Value % | Value 0–255 | Vai trò điển hình |
|----:|----:|--------:|------------:|-------------------|
| 1 | 0 | 0% | 0 | đen — bóng sâu nhất |
| 2 | 1 | 12.5% | 32 | tối |
| 3 | 2 | 25% | 64 | vùng tối của khối |
| 4 | 3 | 37.5% | 96 | tối vừa |
| 5 | 4 | 50% | 128 | midtone — xám giữa |
| 6 | 5 | 62.5% | 159 | sáng vừa |
| 7 | 6 | 75% | 191 | vùng sáng |
| 8 | 7 | 87.5% | 223 | rất sáng |
| 9 | 8 | 100% | 255 | trắng — highlight |

Kiểm tra: bậc 5 (giữa) = $\frac{4}{8}\times 100\% = 50\%$, value 0–255 = $\frac{4}{8}\times 255 = 127.5 \approx 128$ ✓. Bậc 7 = $\frac{6}{8}\times 255 = 191.25 \approx 191$ ✓.

> ⚠ **Lỗi thường gặp — "value bị đục" (muddy).** Người mới hay tô mọi thứ trong khoảng bậc 4–6 (37.5%–62.5%), né cả đen lẫn trắng. Kết quả: tranh **phẳng, xám xịt, không có điểm nhấn**. Cách chữa: cố tình đẩy vùng tối xuống bậc 1–2 và vùng chói lên bậc 8–9 để **mở rộng dải value** (value range). Chênh lệch lớn = khối chắc, không gian sâu.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Trên thang 9 bậc, bậc 3 ứng với value bao nhiêu % và bao nhiêu trên thang 0–255?
> 2. Một vùng có value 62.5% rơi vào bậc mấy?
>
> <details><summary>Đáp án</summary>
>
> 1. Bậc 3 → $i = 2$ → $\frac{2}{8}\times 100\% = 25\%$; trên 0–255 là $\frac{2}{8}\times 255 = 63.75 \approx 64$.
> 2. $62.5\% = \frac{5}{8}\times 100\%$ → $i = 5$ → **bậc 6**.
> </details>

> 📝 **Tóm tắt mục 1–3.**
> - Value = sáng/tối, đo 0% (đen) → 100% (trắng), **độc lập** với hue và saturation.
> - Mỗi hue có value nội tại: vàng ~89%, lục ~59%, đỏ ~30%, lam ~11% (theo $L = 0.299R+0.587G+0.114B$).
> - Value dựng khối và chiều sâu; hue chỉ phủ lên. Ảnh đen trắng đọc được ⇒ value đúng.
> - Thang 9 bậc chia đều: bậc $i$ có value $\frac{i}{8}\times 100\%$. Dùng đủ dải, tránh "đục".

---

## 4. Posterize & notan — gom value về vài bậc

> 💡 **Trực giác.** *Posterize* (áp phích hóa) là gom cả nghìn mức xám mượt về **N mức rời rạc** — như in áp phích thời xưa chỉ có vài lớp mực. Điều kỳ diệu: một khối cầu được đổ bóng mượt, khi gom về **chỉ 2–3 mức**, mắt **vẫn đọc ra hình cầu**. Đó là bằng chứng: chiều sâu nằm ở *sự phân mảng sáng-tối*, không phải ở chuyển sắc mượt. Bản nghiên cứu 2–3 mảng đó gọi là **notan** (濃淡, tiếng Nhật: đậm-nhạt).

**Cơ chế posterize** — với mỗi pixel có luminance $L \in [0,255]$, gom về $N$ bậc:

$$\text{index} = \operatorname{round}\!\left(\frac{L}{255}\times(N-1)\right), \qquad L_{\text{out}} = \frac{\text{index}}{N-1}\times 255$$

Đầu ra chỉ nhận đúng **$N$ giá trị phân biệt**: $0,\ \frac{1}{N-1},\ \dots,\ 1$ (nhân 255).

**Walk-through bằng số** — lấy một pixel có $L = 200$ (tức $\frac{200}{255} \approx 78\%$):

| $N$ | $\frac{L}{255}(N-1)$ | round → index | $L_{\text{out}}$ (%) | Kết quả |
|----:|---------------------:|--------------:|--------------------:|---------|
| 9 | $0.784 \times 8 = 6.27$ | 6 | $\frac{6}{8}=75\%$ | xám bậc 7 (191) |
| 3 | $0.784 \times 2 = 1.57$ | 2 | $\frac{2}{2}=100\%$ | trắng |
| 2 | $0.784 \times 1 = 0.78$ | 1 | $\frac{1}{1}=100\%$ | trắng (vì 78% > ngưỡng 50%) |

Một pixel khác, $L = 90$ ($\approx 35\%$):

| $N$ | $\frac{L}{255}(N-1)$ | round → index | $L_{\text{out}}$ (%) | Kết quả |
|----:|---------------------:|--------------:|--------------------:|---------|
| 3 | $0.353 \times 2 = 0.71$ | 1 | $\frac{1}{2}=50\%$ | xám giữa |
| 2 | $0.353 \times 1 = 0.35$ | 0 | $0\%$ | đen (vì 35% < ngưỡng 50%) |

Chú ý ở **$N=2$** (notan cực đại): ngưỡng nằm đúng ở **50%**. Pixel sáng hơn 50% → trắng, tối hơn → đen. Cả bức chỉ còn 2 mảng, mà nhân vật/khối chính vẫn phải đọc được — nếu không, bố cục value sai từ gốc.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Vẽ notan để làm gì khi tranh cuối có đủ sắc độ?"* → Notan là bản **quy hoạch** trước khi vẽ chi tiết: nó ép bạn quyết định mảng nào sáng, mảng nào tối ở tầm nhìn tổng thể. Sai ở notan thì tô mượt cỡ nào cũng cứu không được.
> - *"N = mấy là hợp lý để nghiên cứu?"* → Kinh điển là **2 hoặc 3 mảng** (đen-trắng, hoặc tối-giữa-sáng). Ít mảng ⇒ buộc phải đơn giản hóa quyết đoán.
> - *"Posterize có làm mất chi tiết không?"* → Có, và đó là **mục đích**: nó loại nhiễu chuyển sắc để lộ ra *cấu trúc* value lớn. Chi tiết mượt để dành cho bản vẽ hoàn chỉnh.

---

## 5. Key & tương phản value dẫn mắt

**(a) Value key là gì.** *Key* mô tả **dải value chủ đạo** của cả bức:

- **High-key**: đa số vùng nằm ở value cao (khoảng **60%–100%**), ít vùng tối. Cảm giác: nhẹ, sáng, thoáng, mơ màng (ví dụ ảnh cưới, cảnh sương sớm).
- **Low-key**: đa số vùng nằm ở value thấp (khoảng **0%–40%**), ít vùng sáng. Cảm giác: nặng, u tối, kịch tính, bí ẩn (ví dụ tranh Rembrandt, phim noir).

**(b) Vì sao cần.** Key thống nhất *tông cảm xúc* của cả bức. Trộn bừa sáng-tối ngang nhau khắp nơi ⇒ tranh vụn, không có tâm trạng.

**(c) Ví dụ số** — 5 vùng của một cảnh, hai cách phối:

| Vùng | High-key (value %) | Low-key (value %) |
|------|-------------------:|------------------:|
| Nền trời | 95% | 30% |
| Mặt nước | 80% | 20% |
| Vật thể chính | 65% | 15% |
| Bóng đổ | 55% | 5% |
| Điểm nhấn tương phản | 20% | 90% |

Điểm tinh tế: trong **cả hai** key vẫn cần **một điểm tương phản ngược** — ở high-key là một mảng **tối** (20%), ở low-key là một mảng **sáng** (90%). Chính điểm chọi value mạnh nhất này **hút mắt** tới nơi ta muốn (thường là chủ thể).

$$\text{Độ tương phản value} = |\,\text{value}_A - \text{value}_B\,|$$

Ví dụ: chủ thể 90% cạnh nền 15% ⇒ tương phản $|90-15| = 75$ điểm → **rất hút mắt**. Còn 55% cạnh 50% ⇒ tương phản $5$ điểm → gần như không ai chú ý. Muốn dẫn mắt đến đâu, đặt **cặp value chọi nhau mạnh nhất** ở đó.

> ⚠ **Lỗi thường gặp.** Đặt tương phản value mạnh **rải rác nhiều chỗ** ⇒ mắt bị giật khắp nơi, không biết nhìn đâu (không có tâm điểm). Nguyên tắc: **một** vùng tương phản value cao nhất cho chủ thể; các nơi khác giữ chênh lệch value nhỏ hơn.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Một bức có value chủ đạo 10%–35%, điểm nhấn 88%. Đây là high-key hay low-key?
> 2. Chủ thể value 70%, nền value 68%. Vì sao chủ thể "chìm"? Sửa thế nào?
>
> <details><summary>Đáp án</summary>
>
> 1. **Low-key** (đa số vùng tối), điểm nhấn sáng 88% để hút mắt.
> 2. Tương phản chỉ $|70-68| = 2$ điểm → mắt không tách được chủ thể khỏi nền. Sửa: đẩy nền xuống (ví dụ 35%) hoặc chủ thể lên (ví dụ 90%) để tương phản ≥ 40–50 điểm.
> </details>

> 📝 **Tóm tắt mục 4–5.**
> - Posterize gom $L$ về $N$ bậc: $\text{index} = \operatorname{round}(\frac{L}{255}(N-1))$, đầu ra đúng $N$ mức.
> - Notan = bản nghiên cứu 2–3 mảng value; khối vẫn đọc được ⇒ bố cục value đúng.
> - High-key (đa số 60–100%) nhẹ/sáng; low-key (đa số 0–40%) nặng/tối — mỗi key giữ một điểm tương phản ngược để dẫn mắt.
> - Tương phản value = $|\text{value}_A - \text{value}_B|$; đặt cặp chọi mạnh nhất ở chủ thể.

---

## 6. Bài tập

**Bài 1 (thang value).** Trên thang 9 bậc ($i = 0..8$, value$_i = \frac{i}{8}\times 100\%$):
- a) Bậc 4 ứng với value bao nhiêu % và bao nhiêu trên thang 0–255?
- b) Value 87.5% là bậc mấy?
- c) Value 40% (không rơi đúng bậc nào) — làm tròn về bậc gần nhất là bậc mấy?

**Bài 2 (hue → value).** Dùng $L = 0.299R + 0.587G + 0.114B$, tính value % (làm tròn) của:
- a) Cam thuần (255, 128, 0)
- b) Tím (128, 0, 128)
- c) Hai màu này in đen trắng cạnh nhau có phân biệt được không? Giải thích bằng số.

**Bài 3 (posterize).** Một pixel có $L = 160$. Áp posterize về $N = 4$ bậc.
- a) Tính index và $L_{\text{out}}$ (cả % lẫn 0–255).
- b) Liệt kê đủ 4 mức đầu ra khả dĩ của $N = 4$ (theo %).

**Bài 4 (key & tương phản).** Một cảnh low-key có nền 20%, đối tượng phụ 30%. Bạn muốn đặt chủ thể sao cho hút mắt nhất.
- a) Nên cho chủ thể value cao hay thấp? Đề xuất một con số.
- b) Tính tương phản value giữa chủ thể (theo đề xuất của bạn) và nền.

---

## 7. Lời giải chi tiết

**Bài 1.** Dùng value$_i = \frac{i}{8}\times 100\%$ và value$_{255} = \frac{i}{8}\times 255$.
- a) Bậc 4 → $i = 3$ → $\frac{3}{8}\times 100\% = \mathbf{37.5\%}$; trên 0–255: $\frac{3}{8}\times 255 = 95.625 \approx \mathbf{96}$.
- b) $87.5\% = \frac{7}{8}\times 100\%$ → $i = 7$ → **bậc 8**.
- c) Tìm $i$ gần nhất: $40\% \times \frac{8}{100} = 3.2$ → round$(3.2) = 3$ → $i = 3$ → **bậc 4** (37.5%, sát 40% nhất).

**Bài 2.** Cách tiếp cận: thay RGB vào công thức luminance, chia 255 ra %.
- a) Cam (255,128,0): $L = 0.299(255) + 0.587(128) + 0.114(0) = 76.2 + 75.1 = 151.3$ → $\frac{151.3}{255} \approx \mathbf{59\%}$.
- b) Tím (128,0,128): $L = 0.299(128) + 0.114(128) = 38.3 + 14.6 = 52.9$ → $\frac{52.9}{255} \approx \mathbf{21\%}$.
- c) Chênh lệch value $= 59\% - 21\% = 38$ điểm → **phân biệt được rõ** khi in đen trắng (cam ra xám sáng, tím ra xám tối). Nếu hai màu này *cùng* value thì sẽ hòa vào nhau — nhưng ở đây không phải.

**Bài 3.** $N = 4 \Rightarrow N - 1 = 3$.
- a) index $= \operatorname{round}\!\big(\frac{160}{255}\times 3\big) = \operatorname{round}(0.627 \times 3) = \operatorname{round}(1.88) = 2$. $L_{\text{out}} = \frac{2}{3}\times 255 = 170 \Rightarrow \frac{2}{3}\times 100\% \approx \mathbf{66.7\%}$ (giá trị 0–255 là **170**).
- b) 4 mức của $N=4$: $\frac{0}{3},\frac{1}{3},\frac{2}{3},\frac{3}{3}$ = **0%, 33.3%, 66.7%, 100%** (tương ứng 0, 85, 170, 255).

**Bài 4.** Cách tiếp cận: chủ thể muốn hút mắt ⇒ tối đa hóa $|\text{value}_{\text{chủ thể}} - \text{value}_{\text{nền}}|$.
- a) Nền low-key ở 20% (tối) ⇒ để chọi mạnh, cho chủ thể value **cao**, ví dụ **90%** (một mảng sáng nổi bật trên nền tối — kiểu ánh sáng rọi vào nhân vật).
- b) Tương phản $= |90\% - 20\%| = \mathbf{70}$ điểm → rất cao, mắt lập tức bị hút tới chủ thể. (So với đối tượng phụ 30% chỉ chọi $|30-20| = 10$ điểm với nền → mờ nhạt, đúng vai "phụ".)

> 📝 **Tóm tắt bài học.**
> - Value (sáng/tối) là *xương sống* của khối và chiều sâu; hue/saturation phủ lên trên.
> - Đo value của màu: $L = 0.299R + 0.587G + 0.114B$ → vàng sáng, lam tối một cách nội tại.
> - Thang 9 bậc chia đều ($\frac{i}{8}$); posterize gom về $N$ bậc rời rạc; notan 2–3 mảng kiểm chứng bố cục.
> - Key (high/low) đặt tông; tương phản value $|v_A - v_B|$ lớn nhất đặt ở chủ thể để dẫn mắt.

---

## Bài tiếp theo

**Lesson 10 — Đổ bóng khối cơ bản (Shading basic forms)** *(sắp ra)*: [→ lesson-10-shading-basic-forms](../lesson-10-shading-basic-forms/) — áp thang value vừa học vào 4 khối nền tảng (cầu, trụ, nón, hộp): highlight, light, midtone, core shadow, reflected light, cast shadow.

Minh họa tương tác: [visualization.html](./visualization.html) — bấm thang 9 bậc, kéo slider posterize để thấy khối cầu vẫn đọc được ở 2–3 value, và toggle "bỏ màu" để tự mắt thấy value mạnh hơn hue.
