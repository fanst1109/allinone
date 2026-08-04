// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Animation/02-Motion-Curves/lesson-08-secondary-overlapping/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 08 — Chuyển động phụ & Nối tiếp trễ (Secondary Action & Overlapping Action)

> Nhân vật đi bộ, nhưng cái làm nó *sống* là mái tóc bay trễ nửa nhịp, cái đuôi quật theo sau, tà áo đuổi theo rồi lắng. Bài này nói về hai nguyên tắc anh em: **chuyển động phụ (secondary action)** và **nối tiếp trễ / độ ì (overlapping action & drag)**.

## Mục tiêu học tập

- Phân biệt **hành động chính (primary action)** và **chuyển động phụ (secondary action)** — và quy tắc *phụ hỗ trợ, không lấn át*.
- Hiểu **overlapping action / drag**: vì sao các bộ phận phụ (tóc, đuôi, áo, râu, ăng-ten) chuyển động **trễ** sau phần chính, mỗi phần một độ trễ khác nhau.
- Định lượng độ trễ bằng hai công cụ: **offset frame** (lệch số khung hình) và **hệ số drag** $k$ trong công thức lerp.
- Nối được với nguyên tắc **follow-through** (đuổi theo & lắng, L03) và chuẩn bị cho **walk cycle** (L09).

## Kiến thức tiền đề

- [Lesson 07 — Cung & đường đi (Arcs & Path)](../lesson-07-arcs-path/): các bộ phận phụ trễ vẫn bám theo **cung** của phần chính, không đi đường thẳng.
- Nguyên tắc **follow-through** (đuổi theo & lắng) ở nhánh Nguyên lý (L03): overlapping là "họ hàng" của follow-through — cùng gốc quán tính. Bài này định lượng nó bằng số.
- Chỉ cần số học và một chút trực giác về quán tính (vật đang chuyển động thì "muốn" chuyển động tiếp).

---

## 1. Bức tranh lớn: một cú chuyển động không bao giờ là một mảnh

> 💡 **Trực giác.** Vung tay ném một quả bóng. Bàn tay dẫn đầu; cẳng tay theo sau một nhịp; nếu bạn đeo vòng tay, cái vòng còn văng ra *sau nữa*; tay áo phồng lên rồi mới xẹp xuống *sau cùng*. Không có bộ phận nào khởi động và dừng cùng lúc. Một hành động thật là **một dàn nhạc các bộ phận vào lệch nhịp nhau** — đó chính là cái làm nó "có da có thịt" thay vì cứng như robot.

Hoạt hình chia mọi cảnh động thành hai tầng:

| Tầng | Là gì | Ví dụ |
|------|-------|-------|
| **Hành động chính (primary)** | Việc chính nhân vật đang làm — mang ý nghĩa của cảnh | Đi bộ, nhảy, quay đầu, ném bóng |
| **Chuyển động phụ (secondary)** | Chuyển động *đi kèm* làm hành động chính đáng tin và sinh động | Tay vung khi đi, biểu cảm mặt, tóc bay, ngực phập phồng |

Trong tầng phụ lại có một hiện tượng riêng — **overlapping action / drag**: những bộ phận *lỏng, nhẹ, treo tự do* (tóc, đuôi, áo, ăng-ten) không chuyển động cùng lúc với phần cứng (thân, đầu) mà **trễ lại vì quán tính**, rồi "đuổi theo & lắng".

Hai khái niệm dễ lẫn, nên phân biệt rõ ngay:

- **Secondary action** trả lời câu hỏi *"còn gì chuyển động nữa để cảnh sống hơn?"* — về **nội dung** (thêm cái gì).
- **Overlapping action** trả lời câu hỏi *"những thứ đó vào nhịp thế nào so với phần chính?"* — về **thời điểm** (trễ bao nhiêu).

> 📝 **Tóm tắt mục 1.**
> - Mọi hành động thật gồm nhiều bộ phận vào/ra **lệch nhịp**, không đồng bộ.
> - **Primary** = việc chính; **secondary** = chuyển động đi kèm làm giàu cảnh.
> - **Overlapping/drag** = bộ phận lỏng trễ lại sau phần cứng vì quán tính.

---

## 2. Secondary action — chuyển động phụ

> 💡 **Trực giác.** Secondary action như gia vị: đúng liều thì món ngon hơn hẳn; quá tay thì át mất vị chính. Người xem phải luôn đọc được *hành động chính trước*, rồi mới "à, còn có tóc bay nữa".

**(a) Là gì.** Secondary action là chuyển động **thứ cấp** xảy ra như hệ quả của, hoặc song song với, hành động chính — nhằm tăng độ tin và cảm xúc, **không** thay đổi thông điệp của cảnh. Ví dụ: nhân vật đi bộ (chính) + tay đung đưa + đầu gật nhẹ + biểu cảm mặt (phụ).

**(b) Vì sao cần khái niệm này.** Nếu chỉ làm hành động chính, nhân vật trông như ma-nơ-canh trượt trên ray. Secondary action thêm "sự sống" — nhưng phải **có kỷ luật**: nó phục vụ hành động chính, không cạnh tranh. Tách riêng khái niệm để animator biết cái nào được phép nổi bật (chính) và cái nào phải nhường (phụ).

**(c) Ví dụ số cụ thể — quy tắc biên độ.** Đây là chỗ dễ hỏng nhất: chuyển động phụ có biên độ (amplitude) bao nhiêu thì *hỗ trợ*, bao nhiêu thì *lấn át*? Lấy biên độ hành động chính làm mốc 100%.

Giả sử thân người nhấp nhô theo bước đi với biên độ **30 px**. Tay vung với biên độ:

| Biên độ tay | Tỉ lệ so với chính | Người xem đọc thấy |
|------------:|-------------------:|--------------------|
| 6 px | 20% | Hỗ trợ tự nhiên, không để ý riêng |
| 9 px | 30% | Hỗ trợ tốt — vẫn đọc "đang đi" trước |
| 20 px | 67% | Bắt đầu tranh chấp — mắt phân vân |
| 40 px | 133% | **Lấn át** — trông như đang "múa tay", quên mất đi bộ |

Quy tắc ngón tay cái: **giữ chuyển động phụ ở khoảng $\\le 30\\text{–}40\\%$ biên độ hành động chính**. Vượt ~70% là nó bắt đầu giành sân khấu; vượt 100% thì nó *trở thành* hành động chính (và thường là lỗi).

> ⚠ **Lỗi thường gặp.** *"Thêm càng nhiều chuyển động phụ càng sinh động."* **Sai.** Quá nhiều secondary cùng biên độ lớn làm mắt không biết nhìn đâu — cảnh trở nên "ồn". Nguyên tắc: **mỗi thời điểm chỉ một điểm nhấn**. Nếu muốn tóc bay thật mạnh (điểm nhấn), hãy làm phần thân lặng đi một chút để nhường.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Chớp mắt, thở, biểu cảm mặt — có phải secondary không?"* → Có. Chúng là secondary "vi mô", gần như luôn cần để nhân vật không trông như xác chết, nhưng biên độ rất nhỏ.
> - *"Khi nào secondary được phép nổi hơn primary?"* → Khi bạn *cố ý* đổi điểm nhấn (một cú giật mình khiến cả người nảy lên — lúc đó phản ứng phụ chính là điểm nhấn mới). Nhưng đó là quyết định có chủ đích, không phải mặc định.

> 📝 **Tóm tắt mục 2.**
> - Secondary = chuyển động đi kèm, làm giàu chứ không đổi thông điệp.
> - Giữ biên độ phụ $\\le 30\\text{–}40\\%$ biên độ chính để "hỗ trợ, không lấn át".
> - Mỗi thời điểm chỉ một điểm nhấn; thêm bừa = cảnh bị "ồn".

---

## 3. Overlapping action & Drag — vì sao mọi thứ trễ lại

> 💡 **Trực giác.** Phanh gấp xe buýt: người ngồi bị hất về trước *sau khi* xe đã đứng lại. Đầu bạn đứng, nhưng tóc thì còn bay tới trước một nhịp rồi mới rơi xuống. Đó là **quán tính**: bộ phận nhẹ/lỏng không "biết" phần chính đã đổi hướng cho tới một chút sau. Cái "một chút sau" đó gọi là **drag** (độ ì) — và vì mỗi bộ phận nặng-nhẹ khác nhau nên chúng trễ **lệch nhau**, tạo ra hiệu ứng **overlapping** (nối tiếp, chồng lấn).

**Định nghĩa (a)(b)(c):**

**(a) Là gì.** *Overlapping action* là kỹ thuật cho các bộ phận khác nhau của nhân vật **bắt đầu và kết thúc chuyển động ở những thời điểm khác nhau**, thay vì đồng bộ. *Drag* là biểu hiện cụ thể: bộ phận phụ **trễ pha** so với phần dẫn dắt.

**(b) Vì sao cần.** Nếu tóc, áo, đuôi khởi động và dừng *cùng lúc* với thân, chuyển động trông cứng và giả (kiểu marionette). Overlapping mô phỏng quán tính vật lý → mắt người tin ngay. Nó cũng là cách tạo **dòng chảy (flow)** mượt qua một cơ thể.

**(c) Ví dụ số — offset frame (lệch khung hình).** Cách đơn giản nhất để tạo drag: cho mỗi bộ phận **bắt đầu cùng động tác nhưng trễ đi một số khung hình**. Giả sử **đầu** đảo chiều (quay từ trái sang phải) tại **frame 10**. Ta gán độ trễ:

| Bộ phận | Offset (frame) | Đảo chiều tại frame | Ở 24 fps, trễ hơn đầu |
|---------|:--------------:|:-------------------:|:---------------------:|
| Đầu (dẫn) | 0 | 10 | 0 s |
| Cổ / vai | +2 | 12 | 0.083 s |
| Tóc (gốc) | +4 | 14 | 0.167 s |
| Tóc (ngọn) | +7 | 17 | 0.292 s |
| Khăn quàng | +9 | 19 | 0.375 s |

Càng xa "gốc" và càng nhẹ/lỏng thì offset càng lớn → ngọn tóc và khăn "đuổi theo" đầu, tạo thành **một làn sóng chạy dọc** từ gốc ra ngọn. Đây là walk-through số của overlapping: bạn có thể dựng đúng bằng cách sao chép động tác đầu rồi dịch timeline của mỗi bộ phận sang phải theo cột offset.

> ⚠ **Lỗi thường gặp.** *"Cho tất cả tóc cùng một offset."* → toàn bộ mái tóc dịch chuyển như **một tấm ván cứng**. Đúng ra offset phải **tăng dần từ gốc ra ngọn** (ở đây 4 → 7), để có sóng mềm chứ không phải cả khối trễ đều.

> 🔁 **Dừng lại tự kiểm tra.**
> Đầu đảo chiều ở frame 8. Đuôi có offset +6 frame. Cảnh chạy 24 fps.
> 1. Đuôi đảo chiều ở frame nào?
> 2. Độ trễ theo giây là bao nhiêu?
>
> <details><summary>Đáp án</summary>
>
> 1. $8 + 6 = \\mathbf{14}$.
> 2. $6 / 24 = 0.25\\ \\text{s}$ — đúng một phần tư giây.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Drag = bộ phận phụ trễ pha vì quán tính; overlapping = các phần trễ **lệch nhau**.
> - Cách thô nhất: **offset frame** — dịch timeline mỗi bộ phận sang phải.
> - Offset phải **tăng dần từ gốc ra ngọn** để có sóng, không phải khối cứng trễ đều.

---

## 4. Mô hình drag bằng hệ số $k$ (lerp)

Offset frame tốt nhưng thủ công. Máy tính (và rigging trong phần mềm) thường mô tả drag bằng một **hệ số bám** duy nhất. Mỗi khung hình, bộ phận phụ dịch một *phần* quãng đường tới vị trí đích (vị trí của phần dẫn):

$$p_{n} = p_{n-1} + k\\,(T - p_{n-1})$$

trong đó:

- $p_n$ = vị trí bộ phận phụ ở frame $n$,
- $T$ = vị trí đích (vị trí phần dẫn — tạm coi cố định để tính),
- $k \\in (0,1]$ = **hệ số bám (follow factor)**. **Độ trễ (drag)** $= 1-k$.

$k$ càng nhỏ → mỗi frame chỉ nhích một tí → **trễ nhiều** (drag lớn). $k=1$ → bám tức thì, không trễ.

**(c) Ví dụ số — bảng lerp với $k=0.3$**, đích $T=100$, khởi đầu $p_0 = 0$:

| Frame $n$ | Tính | $p_n$ | Khoảng cách còn lại $g_n = T-p_n$ |
|:---------:|------|------:|:---------------------------------:|
| 1 | $0 + 0.3(100-0)$ | 30.00 | 70.00 |
| 2 | $30 + 0.3(100-30)$ | 51.00 | 49.00 |
| 3 | $51 + 0.3(100-51)$ | 65.70 | 34.30 |
| 4 | $65.7 + 0.3(100-65.7)$ | 75.99 | 24.01 |
| 5 | $75.99 + 0.3(100-75.99)$ | 83.19 | 16.81 |

Khoảng cách còn lại co theo cấp số nhân — verify bằng công thức đóng:

$$g_n = (1-k)^n\\, g_0 = 100 \\cdot 0.7^{\\,n}$$

Kiểm tra $n=3$: $100 \\cdot 0.7^3 = 100 \\cdot 0.343 = 34.3$ ✓ (khớp cột phải). $n=5$: $100 \\cdot 0.7^5 = 16.807$ ✓.

**So sánh drag lớn / nhỏ bằng "thời gian bán rã".** Số frame để đi được nửa quãng đường:

$$n_{1/2} = \\frac{\\ln 0.5}{\\ln(1-k)}$$

| $k$ (bám) | Drag $=1-k$ | $n_{1/2}$ (frame) | Diễn giải |
|:---------:|:-----------:|:-----------------:|-----------|
| 0.5 | 0.5 | $\\dfrac{\\ln 0.5}{\\ln 0.5} = 1.00$ | Bám chặt, gần như không trễ |
| 0.3 | 0.7 | $\\dfrac{\\ln 0.5}{\\ln 0.7} = 1.94$ | Trễ vừa |
| 0.1 | 0.9 | $\\dfrac{\\ln 0.5}{\\ln 0.9} = 6.58$ | Trễ nhiều, lê thê |

Đọc bảng: hạ $k$ từ 0.5 xuống 0.1 (tức tăng drag từ 0.5 lên 0.9) làm độ trễ **tăng ~6.6 lần** ($6.58 / 1.00$). Đây chính là "núm vặn" độ trễ trong minh họa.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - *"Mô hình lerp này có bao giờ vượt quá đích (overshoot) không?"* → **Không.** $p_n$ luôn tiến đơn điệu về $T$, không vọt qua. Muốn tóc/đuôi **vung vượt rồi lắng** (đu đưa), cần thêm quán tính — xem mục 5 (mô hình lò xo).
> - *"$k$ có phải là tần số khung hình không?"* → Không. $k$ là *tỉ lệ bám mỗi frame*. Cùng $k$ nhưng chạy 60 fps sẽ bám "nhanh hơn theo thời gian thực" vì có nhiều frame hơn mỗi giây — khi đổi fps phải chỉnh $k$ tương ứng.

> 📝 **Tóm tắt mục 4.**
> - Drag mượt = lerp: $p_n = p_{n-1} + k(T-p_{n-1})$; **drag $=1-k$**.
> - Khoảng cách còn lại co theo $g_n = (1-k)^n g_0$ — cấp số nhân.
> - Thời gian bán rã $n_{1/2} = \\ln 0.5 / \\ln(1-k)$: $k$ nhỏ → trễ lâu hơn nhiều lần.
> - Lerp **không** overshoot; muốn đu đưa phải dùng lò xo (mục 5).

---

## 5. Chuỗi nhiều đốt & sóng overlapping — mô hình lò xo (độ cứng & độ trễ)

Một cái đuôi hay ăng-ten không phải một điểm, mà là **một chuỗi đốt** nối nhau. Mỗi đốt bám theo **đốt trước nó** (không phải bám thẳng vào đầu). Kết quả: khi đầu động, đốt 1 trễ theo đầu, đốt 2 trễ theo đốt 1, đốt 3 trễ theo đốt 2... → độ trễ **cộng dồn**, tạo thành **một làn sóng chạy dọc chuỗi** rồi tắt dần.

> 💡 **Trực giác.** Giật một đầu sợi dây thừng: gợn sóng chạy từ tay bạn tới đầu kia, mất một lúc mới tới, rồi dây rung vài nhịp và **lắng** lại. Chuỗi đốt trong hoạt hình y hệt: mỗi đốt vừa *trễ* vừa *đu đưa* quanh vị trí cân bằng.

### 5.1 Hai núm vặn: độ cứng và độ trễ

Để có cả **đu đưa** (vượt quá rồi quay lại), lerp một hệ số là chưa đủ — cần mô hình **lò xo có cản (spring–damper)**. Mỗi đốt có vị trí $p$ và vận tốc $v$; mỗi frame:

$$a = \\underbrace{s\\,(T - p)}_{\\text{lực lò xo kéo về đích}} - \\underbrace{c\\,v}_{\\text{lực cản (giảm chấn)}}, \\qquad v \\mathrel{+}= a, \\qquad p \\mathrel{+}= v$$

- $s$ = **độ cứng (stiffness)** — lò xo kéo đốt về phía đốt trước mạnh cỡ nào. $s$ lớn → bám sát, đuổi kịp nhanh, giật cục.
- $c$ = **hệ số cản (damping)** — dập tắt dao động. $c$ lớn → hết đu đưa ngay; $c$ nhỏ → đu đưa lâu.

Trong minh họa, slider **Độ trễ (drag)** điều khiển *nghịch* với cản: **tăng drag = giảm $c$** → đốt phụ **đu đưa nhiều hơn và lắng chậm hơn**. Slider **Độ cứng (stiffness)** chỉnh trực tiếp $s$.

### 5.2 Đu đưa bao nhiêu nhịp? — hệ số tắt dần $\\zeta$

Mức đu đưa của một lò xo có cản đo bằng **hệ số tắt dần (damping ratio)**:

$$\\zeta = \\frac{c}{2\\sqrt{s}}$$

| $\\zeta$ | Tên | Hành vi | Cảm giác hoạt hình |
|:-------:|-----|---------|--------------------|
| $\\zeta < 1$ | Dưới tới hạn (underdamped) | Vượt đích, đu đưa nhiều nhịp rồi lắng | Tóc/đuôi mềm, "sống động" |
| $\\zeta = 1$ | Tới hạn (critical) | Về đích nhanh nhất, **không** vượt | Chắc, gọn |
| $\\zeta > 1$ | Trên tới hạn (overdamped) | Bò về đích chậm, không đu đưa | Nặng, ì (như trong nước) |

**Ví dụ số:** lấy $s = 0.2$.
- Cản $c = 0.7$: $\\zeta = 0.7 / (2\\sqrt{0.2}) = 0.7 / 0.894 = 0.78$ → gần tới hạn, đu đưa yếu, lắng nhanh (drag *thấp*).
- Cản $c = 0.3$: $\\zeta = 0.3 / 0.894 = 0.34$ → dưới tới hạn rõ, đu đưa 2–3 nhịp (drag *vừa*).
- Cản $c = 0.1$: $\\zeta = 0.1 / 0.894 = 0.11$ → rất "lỏng", quật qua quật lại nhiều nhịp mới lắng (drag *cao*).

Đây chính là điều minh họa cho thấy: **kéo slider drag lên (giảm $c$ → giảm $\\zeta$) làm chuỗi phụ trễ hơn, đu đưa dữ hơn, và cuối cùng vẫn lắng về vị trí cân bằng** — vì chừng nào $c > 0$, năng lượng dao động vẫn bị rút cạn dần.

> ⚠ **Lỗi thường gặp.** *"Muốn tóc bay đẹp thì cứ để độ cứng thật lớn."* → độ cứng lớn kèm cản nhỏ ($\\zeta$ rất bé) khiến chuỗi **rung giật, run rẩy** không tự nhiên, thậm chí trông như lỗi kỹ thuật. Đẹp nhất thường là $\\zeta$ quanh $0.2\\text{–}0.5$: đu đưa vài nhịp có kiểm soát.

> 🔁 **Dừng lại tự kiểm tra.**
> Cho $s = 0.25$, $c = 0.5$.
> 1. Tính $\\zeta$. Chuỗi thuộc loại nào (dưới / tới hạn / trên)?
> 2. Muốn *ít* đu đưa hơn thì tăng hay giảm $c$?
>
> <details><summary>Đáp án</summary>
>
> 1. $\\zeta = 0.5 / (2\\sqrt{0.25}) = 0.5 / 1 = 0.5$ → **dưới tới hạn** (còn đu đưa nhẹ).
> 2. **Tăng $c$** (tức giảm drag) → $\\zeta$ lớn hơn → lắng nhanh hơn, ít đu đưa.
> </details>

> 📝 **Tóm tắt mục 5.**
> - Chuỗi đốt: mỗi đốt bám đốt trước → độ trễ **cộng dồn** thành sóng chạy dọc.
> - Mô hình lò xo có cản mới cho **overshoot + đu đưa**, thứ lerp không có.
> - $s$ = độ cứng (bám sát); $c$ = cản; **drag ~ nghịch với $c$**.
> - $\\zeta = c/(2\\sqrt{s})$: $\\zeta < 1$ đu đưa, $\\zeta \\ge 1$ không. Đẹp thường $\\zeta \\approx 0.2\\text{–}0.5$.

---

## 6. Bài tập

**Bài 1 (offset frame).** Một nhân vật quay đầu; **đầu** (phần dẫn) đảo chiều tại **frame 10**. Cảnh chạy 24 fps. Gán offset: đuôi tóc $+5$, khăn quàng $+8$.
1. Mỗi bộ phận đảo chiều tại frame nào?
2. Khăn trễ hơn đầu bao nhiêu giây?

**Bài 2 (drag lerp).** Với hệ số bám $k = 0.25$, đích $T = 80$, $p_0 = 0$:
1. Tính $p_1, p_2, p_3$.
2. Tính khoảng cách còn lại $g_4$ sau 4 frame bằng công thức đóng.

**Bài 3 (thời gian bán rã).** Animator A dùng $k = 0.2$, animator B dùng $k = 0.4$. Ai làm bộ phận phụ trễ hơn, và **gấp mấy lần**?

**Bài 4 (secondary ratio).** Thân người nhấp nhô biên độ **24 px**. Bạn muốn tay vung ở mức "hỗ trợ" khoảng **25%**.
1. Biên độ tay nên là bao nhiêu?
2. Nếu lỡ đặt biên độ tay **30 px**, đó là bao nhiêu phần trăm, và đọc là *hỗ trợ* hay *lấn át*?

---

## 7. Lời giải chi tiết

**Bài 1.** Offset cộng thẳng vào frame đảo chiều của phần dẫn.
1. Đuôi tóc: $10 + 5 = \\mathbf{15}$. Khăn: $10 + 8 = \\mathbf{18}$.
2. Khăn trễ $8$ frame $= 8 / 24 = \\mathbf{0.333\\ \\text{s}}$ (một phần ba giây) sau đầu.

Ý nghĩa: đầu đã dừng quay ở frame 10 mà khăn còn "chưa biết", tới tận frame 18 mới bắt đầu đảo — đúng cảm giác quán tính.

**Bài 2.** Dùng $p_n = p_{n-1} + k(T - p_{n-1})$ với $k=0.25$, $T=80$.
1.
- $p_1 = 0 + 0.25(80 - 0) = 20$.
- $p_2 = 20 + 0.25(80 - 20) = 20 + 15 = 35$.
- $p_3 = 35 + 0.25(80 - 35) = 35 + 11.25 = \\mathbf{46.25}$.

2. Công thức đóng: $g_4 = (1-k)^4 g_0 = 0.75^4 \\cdot 80 = 0.31640625 \\cdot 80 = \\mathbf{25.3125}$.
Kiểm tra: $p_4 = 80 - 25.3125 = 54.6875$; và tính lặp $p_4 = 46.25 + 0.25(80-46.25) = 46.25 + 8.4375 = 54.6875$ ✓ — hai cách khớp.

**Bài 3.** So thời gian bán rã $n_{1/2} = \\ln 0.5 / \\ln(1-k)$.
- A: $k=0.2 \\Rightarrow n_{1/2} = \\dfrac{\\ln 0.5}{\\ln 0.8} = \\dfrac{-0.6931}{-0.2231} = 3.11$ frame.
- B: $k=0.4 \\Rightarrow n_{1/2} = \\dfrac{\\ln 0.5}{\\ln 0.6} = \\dfrac{-0.6931}{-0.5108} = 1.36$ frame.
- Tỉ số $= 3.11 / 1.36 = \\mathbf{2.29}$.

**Kết luận:** A ($k$ nhỏ hơn → bám yếu hơn → drag lớn hơn) làm bộ phận phụ **trễ gấp ~2.3 lần** B.

**Bài 4.** Tỉ lệ so mốc là biên độ chính $= 24$ px.
1. $25\\% \\times 24 = \\mathbf{6\\ \\text{px}}$.
2. $30 / 24 = 1.25 = \\mathbf{125\\%}$. Vì $125\\% > 100\\%$, chuyển động phụ **lớn hơn cả hành động chính** → **lấn át** (steals focus): người xem sẽ nhìn tay vung thay vì đọc "đang đi". Nên hạ về $\\le \\sim 9$ px (khoảng 30–40%).

---

## 8. Code & Minh họa

Minh họa tương tác: [visualization.html](./visualization.html)

- **Chuỗi đốt trễ**: một cái đầu quét qua lại mang theo chuỗi ăng-ten/đuôi nhiều đốt. Kéo slider **Độ trễ (drag)** và **Độ cứng (stiffness)**, bấm **Giật đầu** để thấy sóng overlap chạy dọc chuỗi rồi lắng. Tăng drag → phần phụ trễ và đu đưa nhiều hơn, cuối cùng vẫn lắng về vị trí cân bằng.
- **Hỗ trợ hay lấn át**: một nhân vật đi bộ với tay vung; kéo biên độ phụ để thấy ngưỡng chuyển từ "hỗ trợ" sang "lấn át".

---

## Bài tiếp theo

**[Lesson 09 — Walk cycle (Chu kỳ đi bộ)](../../03-Character-Staging/lesson-09-walk-cycle/)** *(Nhánh III — Dàn dựng nhân vật)*: ghép mọi thứ đã học (timing, spacing, arcs, secondary, overlapping) thành chu kỳ đi bộ hoàn chỉnh — nơi thân, chân, tay, tóc đều vào nhịp trễ nhau đúng như bài này.
`;
