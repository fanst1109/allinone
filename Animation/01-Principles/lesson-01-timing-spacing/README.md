# Lesson 01 — Nhịp & Khoảng cách (Timing & Spacing)

> Hai núm điều khiển duy nhất của mọi chuyển động: **timing** quyết định *nhanh hay chậm*, **spacing** quyết định *tăng tốc hay giảm tốc, nặng hay nhẹ*.

## Mục tiêu học tập

- Phân biệt rạch ròi **timing (nhịp)** — *số frame dành cho một hành động* — với **spacing (khoảng cách)** — *quãng đường vật đi được giữa hai frame liên tiếp*.
- Hiểu **fps (frame per second)** và quy đổi số frame ↔ thời gian thực (12 fps vs 24 fps).
- Giải thích *vì sao* thay đổi spacing tạo cảm giác **gia tốc (acceleration)** và **trọng lượng (weight)** dù giữ nguyên timing.
- Đọc được 4 kiểu spacing kinh điển: **đều (linear)**, **dồn đầu (ease-in)**, **dồn cuối (ease-out)**, **dồn 2 đầu (ease-in-out)** — kèm số cụ thể.

## Kiến thức tiền đề

Chỉ cần số học cộng/trừ/nhân và khái niệm "phân số". Không cần biết vẽ hay phần mềm hoạt hình. Đây là bài **đầu tiên** của nhánh *Nguyên lý hoạt hình* — nền tảng cho mọi bài sau (squash & stretch, anticipation, follow-through…).

---

## 1. Bức tranh lớn: một chuyển động được "đóng gói" bằng gì?

> 💡 **Trực giác.** Hình dung bạn lật một tập giấy nhớ (flipbook): mỗi tờ là một **frame** — một ảnh tĩnh. Lật đủ nhanh, mắt gộp chuỗi ảnh tĩnh thành chuyển động. Vậy để "chỉ đạo" một chuyển động, bạn chỉ có hai quyền lực:
>
> 1. **Dùng bao nhiêu tờ giấy** cho hành động này? → đó là **timing**.
> 2. **Mỗi tờ, vật nhích đi bao xa** so với tờ trước? → đó là **spacing**.
>
> Toàn bộ nghệ thuật hoạt hình chuyển động nằm gọn trong hai câu hỏi đó.

Một hành động (ví dụ: quả bóng lăn từ điểm A sang điểm B) được mô tả đầy đủ bởi:

$$\text{chuyển động} = \big(\underbrace{\text{số frame}}_{\text{timing}}\big) \;+\; \big(\underbrace{\text{vị trí ở từng frame}}_{\text{spacing}}\big)$$

Hai đại lượng này **độc lập**: bạn có thể giữ nguyên timing (vẫn 12 frame) mà đổi hoàn toàn cảm giác chỉ bằng cách xê dịch các vị trí trung gian — đó chính là điều bài này chứng minh bằng số ở mục 4.

---

## 2. fps — cầu nối giữa "số frame" và "thời gian thật"

**(a) Là gì.** **fps (frames per second)** là *số frame chiếu ra trong 1 giây*. Nó là tỉ giá quy đổi giữa đơn vị của người làm hoạt hình (frame) và đơn vị của khán giả (giây).

**(b) Vì sao cần.** Timing đo bằng *frame*, nhưng cảm nhận "nhanh/chậm" của người xem đo bằng *giây*. Không có fps thì "12 frame" là vô nghĩa — 12 frame ở 60 fps chớp mắt đã hết, còn ở 6 fps thì lê thê. fps chốt lại thời lượng thật.

**(c) Ví dụ số cụ thể.** Thời gian của 1 frame $= 1 / \text{fps}$:

| fps | 1 frame kéo dài | 12 frame | 24 frame | Ghi chú |
|----:|----------------:|---------:|---------:|---------|
| 24 | $1/24 \approx 41.7$ ms | 0.5 s | 1.0 s | chuẩn điện ảnh |
| 12 | $1/12 \approx 83.3$ ms | 1.0 s | 2.0 s | "on twos" — vẽ 1 hình cho 2 frame |
| 30 | $1/30 \approx 33.3$ ms | 0.4 s | 0.8 s | chuẩn TV/web nhiều nơi |
| 60 | $1/60 \approx 16.7$ ms | 0.2 s | 0.4 s | game, chuyển động siêu mượt |

Quy đổi tổng quát: $\text{thời gian (s)} = \dfrac{\text{số frame}}{\text{fps}}$.

- 24 frame @ 24 fps $= 24/24 = 1$ giây.
- 6 frame @ 24 fps $= 6/24 = 0.25$ giây (một cú đấm chớp nhoáng).
- 48 frame @ 24 fps $= 48/24 = 2$ giây (một cái vươn vai chậm rãi).

> ❓ **Câu hỏi tự nhiên.**
> - *"'On twos' là gì mà hoạt hình 2D hay nói?"* → Vẽ **1 bản vẽ dùng cho 2 frame liên tiếp**, tức chỉ cần 12 bản vẽ/giây trên phim 24 fps. Tiết kiệm một nửa công vẽ mà mắt vẫn thấy mượt cho phần lớn chuyển động. Chuyển động cực nhanh mới cần "on ones" (mỗi frame một bản vẽ).
> - *"fps cao thì luôn đẹp hơn?"* → Không hẳn. fps cao mượt hơn nhưng có thể làm chuyển động trông "rẻ tiền"/giả (hiệu ứng "soap opera"). 24 fps là điểm cân bằng cảm xúc điện ảnh nhiều thập kỷ.

> 🔁 **Dừng lại tự kiểm tra.** Một pha nhảy kéo dài **0.75 giây** trên phim **24 fps** cần bao nhiêu frame?
>
> <details><summary>Đáp án</summary>
>
> $\text{số frame} = \text{fps} \times \text{thời gian} = 24 \times 0.75 = \mathbf{18}$ frame.
> </details>

---

## 3. Timing — số frame quyết định tốc độ và "sức nặng"

**(a) Là gì.** **Timing (nhịp)** là *tổng số frame bạn cấp cho một hành động từ đầu tới cuối*. Cùng một quãng đường, **ít frame = nhanh**, **nhiều frame = chậm**.

**(b) Vì sao cần.** Timing là thứ đầu tiên khán giả cảm nhận: một quả bóng bàn và một quả tạ sắt cùng lăn hết 640 px, nhưng bóng bàn "búng" đi trong 6 frame còn quả tạ "ì ạch" 40 frame. Số frame chính là cách hoạt hình *nói dối trọng lượng* một cách thuyết phục.

**(c) Ví dụ số cụ thể** (giả sử 24 fps, cùng quãng đường A→B = 640 px):

| Hành động | Số frame | Thời gian | Cảm giác |
|-----------|---------:|----------:|----------|
| Cú đấm nhanh | 4 | 0.17 s | dứt khoát, nhẹ |
| Vẫy tay chào | 12 | 0.50 s | bình thường |
| Đẩy cửa nặng | 24 | 1.00 s | có lực cản |
| Nhấc quả tạ | 40 | 1.67 s | rất nặng, gắng sức |

> 💡 **Trực giác về trọng lượng.** Vật càng nặng, quán tính càng lớn → khởi động và dừng lại càng *tốn thời gian*. Cho nó **nhiều frame hơn**, khán giả tự động "cảm" thấy nó nặng, dù bạn chưa vẽ thêm nét nào. Đây là mẹo số 1 để "gán khối lượng" cho một vật thể trong hoạt hình.

> ⚠ **Lỗi thường gặp.** *"Muốn vật nặng thì vẽ nó to ra."* Kích thước giúp một phần, nhưng **timing mới là thứ bán được trọng lượng**. Một quả bóng nhỏ với timing 40 frame trông *nặng hơn* một tảng đá to di chuyển trong 6 frame — vì mắt tin vào *cách nó chuyển động*, không phải kích thước tĩnh.

---

## 4. Spacing — khoảng cách giữa các frame quyết định gia tốc

Đây là trái tim của bài. Timing nói *"đi hết trong bao nhiêu frame"*; spacing nói *"trên đường đi, ở mỗi frame vật đứng chính xác chỗ nào"*.

**(a) Là gì.** **Spacing (khoảng cách)** là *quãng đường vật dịch chuyển giữa hai frame liên tiếp*. Chuỗi khoảng cách này chính là **profile vận tốc** của chuyển động:

- khoảng cách **nhỏ** (các frame chụm lại) → vật đi **chậm** ở đoạn đó;
- khoảng cách **lớn** (các frame giãn ra) → vật đi **nhanh** ở đoạn đó;
- khoảng cách **thay đổi** từ frame này sang frame kia → có **gia tốc** (tăng hoặc giảm tốc).

**(b) Vì sao cần khái niệm riêng, tách khỏi timing.** Vì hai chuyển động có thể **cùng timing** (cùng số frame, cùng thời lượng, cùng điểm đầu–cuối) nhưng cảm giác **trái ngược nhau** hoàn toàn — khác biệt nằm 100% ở spacing. Không có khái niệm spacing thì không thể diễn tả được sự khác biệt "máy móc" vs "sống động".

**(c) Ví dụ số — cùng timing, khác spacing (chứng minh chính).**

Cho quả bóng đi từ A→B = **240 px** trong **12 frame** (0.5 s @ 24 fps). Ta thử 4 kiểu spacing. Bảng dưới ghi *vị trí* (px, tính từ A) ở các mốc frame, và *quãng đi được trong mỗi 3 frame* (spacing dồn lại):

| Kiểu spacing | pos@f3 | pos@f6 | pos@f9 | pos@f12 | Quãng mỗi 1/4 (px) | Cảm giác |
|--------------|-------:|-------:|-------:|--------:|--------------------|----------|
| **Đều** (linear) | 60 | 120 | 180 | 240 | 60 · 60 · 60 · 60 | máy móc, robot |
| **Dồn đầu** (ease-in) | 15 | 60 | 135 | 240 | 15 · 45 · 75 · 105 | khởi động chậm → **tăng tốc** |
| **Dồn cuối** (ease-out) | 105 | 180 | 225 | 240 | 105 · 75 · 45 · 15 | lao đi → **phanh lại** |
| **Dồn 2 đầu** (ease-in-out) | 37.5 | 120 | 202.5 | 240 | 37.5 · 82.5 · 82.5 · 37.5 | chậm–nhanh–chậm, **tự nhiên nhất** |

Bốn hàng **giống hệt nhau** về timing (đều 12 frame, đều tới 240 px ở frame 12) nhưng bốn cảm giác khác nhau. Đó là toàn bộ luận điểm: **spacing tạo gia tốc và cảm xúc, timing chỉ quyết định tổng thời lượng.**

Công thức phía sau (chuẩn hóa $t = \text{frame}/12 \in [0,1]$, rồi nhân 240):

$$
\begin{aligned}
\text{Đều:} \quad & p(t) = 240\,t \\
\text{Dồn đầu:} \quad & p(t) = 240\,t^2 \\
\text{Dồn cuối:} \quad & p(t) = 240\,(2t - t^2) \\
\text{Dồn 2 đầu:} \quad & p(t) = 240\,(3t^2 - 2t^3)
\end{aligned}
$$

**Verify "dồn đầu" tại frame 6** ($t = 6/12 = 0.5$): $p = 240 \times 0.5^2 = 240 \times 0.25 = 60$ px ✓ (khớp cột pos@f6). Và spacing quý 1 = $p(3) - p(0) = 15 - 0 = 15$ px, quý cuối = $p(12) - p(9) = 240 - 135 = 105$ px → khoảng cách **tăng dần** $15 \to 105$, đúng nghĩa tăng tốc.

> 💡 **Trực giác "quy luật số lẻ" (Galileo).** Một vật rơi tự do (tăng tốc đều) đi được quãng đường tỉ lệ $t^2$. Trong các frame *cách đều thời gian*, quãng mỗi frame là dãy **số lẻ** 1, 3, 5, 7, 9… Vị trí tích lũy là **số chính phương** 1, 4, 9, 16, 25:
>
> | frame | 0 | 1 | 2 | 3 | 4 | 5 |
> |-------|--:|--:|--:|--:|--:|--:|
> | vị trí (đơn vị) | 0 | 1 | 4 | 9 | 16 | 25 |
> | spacing (đi thêm) | — | 1 | 3 | 5 | 7 | 9 |
>
> Kiểm tra: $9 - 4 = 5$, $16 - 9 = 7$, $25 - 16 = 9$ ✓. Khoảng cách nở ra theo số lẻ → mắt đọc ngay là "đang rơi/đang tăng tốc". Đây là ví dụ đẹp nhất cho thấy **spacing = gia tốc**.

> ❓ **Câu hỏi tự nhiên.**
> - *"Vậy 'ease' trong phần mềm (After Effects, CSS `ease-in-out`) chính là spacing?"* → Đúng. Đường cong ease (Bézier vận tốc) chỉ là cách máy tính tự rải các frame trung gian với spacing không đều. Bạn đang học phần **nguyên lý** của cùng một thứ.
> - *"Dồn đầu hay dồn cuối, cái nào 'đúng'?"* → Không có cái đúng tuyệt đối, tùy vật lý: vật *bắt đầu chuyển động* (thả rơi, xe rời bến) → dồn đầu; vật *đang chạy rồi dừng* (bóng lăn hết đà, xe phanh) → dồn cuối; đa số chuyển động cơ thể có cả hai → dồn 2 đầu.
> - *"Spacing đều có bao giờ dùng không?"* → Hiếm cho vật sống. Nó hợp với **máy móc, con lắc đều, vật trôi trong không gian không lực cản**. Dùng cho người/động vật sẽ thấy "cứng như robot".

> ⚠ **Lỗi thường gặp.** *"Cứ chia đều A→B cho N frame là xong."* Đó là spacing **đều** — cái nhìn "chết" nhất. Người mới hay để phần mềm nội suy tuyến tính rồi thắc mắc "sao chuyển động vô hồn". Thủ phạm luôn là spacing đều. Sửa: bẻ cong spacing (thêm ease) để có gia tốc.

> 🔁 **Dừng lại tự kiểm tra.** Cho chuyển động **dồn cuối** (ease-out) đi 240 px trong 12 frame, dùng $p(t) = 240(2t - t^2)$.
> 1. Vị trí ở frame 6 là bao nhiêu?
> 2. So với "đều" (vị trí 120 ở frame 6), vật này đang ở *trước* hay *sau*? Điều đó nói gì về tốc độ nửa đầu?
>
> <details><summary>Đáp án</summary>
>
> 1. $t = 0.5$: $p = 240(2 \times 0.5 - 0.5^2) = 240(1 - 0.25) = 240 \times 0.75 = \mathbf{180}$ px.
> 2. 180 > 120 → vật đã đi *xa hơn* mốc đều, tức **nửa đầu chạy nhanh** (đã "tiêu" 180/240 quãng đường chỉ trong nửa thời gian). Phần còn lại nó **giảm tốc** để về đích — đúng nghĩa "lao đi rồi phanh lại".
> </details>

---

## 5. Ghép lại: timing × spacing trong một ví dụ hoàn chỉnh

Một quả bóng cao su **rơi rồi nảy** minh họa cả hai trục:

- **Timing:** pha rơi ngắn (bóng nhẹ, 8 frame); nếu là quả tạ thì kéo dài 20 frame → "nặng".
- **Spacing pha rơi:** **dồn đầu** (ease-in) — bắt đầu chậm, khoảng cách nở dần (1, 3, 5, 7…) vì trọng lực làm tăng tốc.
- **Spacing pha nảy lên:** **dồn cuối** (ease-out) — vọt lên nhanh rồi chậm dần ở đỉnh (chống lại trọng lực, giảm tốc).
- **Tại đỉnh:** các frame **chụm sát nhau** (spacing nhỏ nhất) → bóng "treo" (hang time) một nhịp, cảm giác lơ lửng.

> 💡 Chính vì đỉnh chụm frame mà bóng nảy trông "sống": nếu ở đỉnh spacing vẫn đều, bóng sẽ như bị nam châm giật xuống, mất tự nhiên.

Bạn sẽ điều khiển trực tiếp timing và 4 kiểu spacing này trong [visualization.html](./visualization.html) — kéo slider số frame, đổi kiểu spacing, bấm **Play** để xem quả bóng đổi hẳn "tính cách" dù đi cùng một đoạn đường.

---

## 6. Bài tập

**Bài 1 (quy đổi timing).**
a) Một hành động dài **1.5 giây** trên phim **24 fps** cần bao nhiêu frame?
b) Bạn có **9 frame** ở **12 fps**. Hành động kéo dài bao lâu (giây)?
c) Cùng một cú vẫy 12 frame: ở 24 fps và ở 12 fps, cái nào *nhanh hơn*, nhanh gấp mấy?

**Bài 2 (đọc spacing).** Một quả bóng lăn được ghi vị trí (px, tính từ A) tại các frame:

| frame | 0 | 1 | 2 | 3 | 4 | 5 |
|-------|--:|--:|--:|--:|--:|--:|
| vị trí | 0 | 40 | 70 | 90 | 100 | 105 |

a) Tính spacing (quãng đi thêm) ở mỗi frame.
b) Bóng đang **tăng tốc** hay **giảm tốc**? Đây là kiểu spacing nào trong 4 kiểu ở mục 4?
c) Mô tả một tình huống đời thực khớp với chuyển động này.

**Bài 3 (thiết kế).** Bạn cần làm một **quả tạ sắt** rơi từ trên bàn xuống sàn, quãng đường 180 px, ở 24 fps.
a) Chọn số frame (timing) sao cho "cảm giác nặng". Giải thích lựa chọn.
b) Chọn kiểu spacing cho pha rơi và nêu công thức $p(t)$ tương ứng.
c) Tính vị trí ở frame giữa để kiểm tra chuyển động có "tăng tốc" đúng không.

---

## 7. Lời giải chi tiết

**Bài 1.**
- a) $\text{frame} = \text{fps} \times \text{giây} = 24 \times 1.5 = \mathbf{36}$ frame.
- b) $\text{giây} = \text{frame} / \text{fps} = 9 / 12 = \mathbf{0.75}$ giây.
- c) Cùng 12 frame: ở 24 fps mất $12/24 = 0.5$ s; ở 12 fps mất $12/12 = 1.0$ s. Vậy **24 fps nhanh hơn, gấp $1.0 / 0.5 = 2$ lần**. Bài học: cùng số frame, fps gấp đôi thì hành động nhanh gấp đôi — timing (frame) và fps phải luôn đi kèm nhau mới xác định được tốc độ thật.

**Bài 2.**
- a) Spacing = hiệu vị trí hai frame liền kề:

  | từ→đến | 0→1 | 1→2 | 2→3 | 3→4 | 4→5 |
  |--------|----:|----:|----:|----:|----:|
  | spacing (px) | 40 | 30 | 20 | 10 | 5 |

- b) Khoảng cách **giảm dần** (40 → 30 → 20 → 10 → 5) → vật đang **giảm tốc (decelerate)**. Các frame *dồn về cuối* (chụm lại gần B) → đây là kiểu **dồn cuối / ease-out**.
- c) Ví dụ đời thực: quả bóng lăn trên mặt sàn có ma sát, mất dần đà rồi dừng hẳn; hoặc một cánh cửa được đẩy rồi từ từ khép lại vào khung. Cả hai đều "đang chạy → phanh dần".

**Bài 3.** (một lời giải hợp lý — không duy nhất)
- a) **Số frame lớn để bán trọng lượng.** Chọn ví dụ **20 frame** ($20/24 \approx 0.83$ s). Vật nặng có quán tính lớn, khán giả kỳ vọng nó "ì" hơn quả bóng nhẹ (thường 8–10 frame cho cùng quãng). Nhiều frame + gia tốc mạnh = cảm giác nặng, dứt khoát khi chạm sàn.
- b) Pha rơi do trọng lực → **tăng tốc từ đứng yên** → chọn **dồn đầu (ease-in)**: $p(t) = 180\,t^2$ với $t = \text{frame}/20$.
- c) Frame giữa = frame 10 → $t = 10/20 = 0.5$: $p = 180 \times 0.5^2 = 180 \times 0.25 = \mathbf{45}$ px.

  Kiểm tra "tăng tốc": nửa thời gian đầu (10 frame) bóng chỉ đi 45 px (25% quãng đường), nửa sau đi $180 - 45 = 135$ px (75%) → **nửa sau đi nhanh gấp 3** nửa đầu ⇒ đang tăng tốc mạnh, đúng vật lý rơi tự do. Nếu muốn "nặng" hơn nữa, có thể ép $p(t) = 180\,t^3$ (tăng tốc gắt hơn: frame 10 chỉ ở $180 \times 0.125 = 22.5$ px).

> 📝 **Tóm tắt bài học.**
> - **Timing** = *số frame* cho một hành động → quyết định **nhanh/chậm** và bán **trọng lượng** (nặng = nhiều frame). Quy đổi: $\text{giây} = \text{frame} / \text{fps}$.
> - **Spacing** = *khoảng cách giữa hai frame liền kề* → chính là **profile vận tốc**: chụm = chậm, giãn = nhanh, đổi khoảng cách = **gia tốc**.
> - Timing và spacing **độc lập**: cùng 12 frame tới cùng đích, đổi spacing (đều / dồn đầu / dồn cuối / dồn 2 đầu) cho 4 cảm giác khác hẳn.
> - 4 kiểu chuẩn: **đều** = robot; **dồn đầu** = khởi động/tăng tốc; **dồn cuối** = phanh/giảm tốc; **dồn 2 đầu** = tự nhiên nhất.
> - Vật thật hầu như không bao giờ di chuyển với spacing đều — luôn có ease. Spacing đều là lỗi "vô hồn" phổ biến nhất của người mới.

---

## Bài tiếp theo

**Lesson 02 — [Squash & Stretch (Co giãn)](../lesson-02-squash-stretch/)** *(sắp ra)*: khi một vật di chuyển nhanh hoặc va chạm, nó **bẹp ra và kéo dài** để truyền cảm giác về vật liệu và lực — nguyên lý xây trực tiếp trên nền timing & spacing bạn vừa học (spacing lớn = tốc độ cao = stretch nhiều).

Minh họa tương tác: [visualization.html](./visualization.html) — điều khiển timing (slider số frame) và 4 kiểu spacing, xem quả bóng animate cùng biểu đồ timing chart.
