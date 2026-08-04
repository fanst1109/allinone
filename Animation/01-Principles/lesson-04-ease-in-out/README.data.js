// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: Animation/01-Principles/lesson-04-ease-in-out/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 04 — Ease In & Ease Out (Slow In / Slow Out — Gia tốc trong hoạt hình)

> Vật thật **không bao giờ** chạy với tốc độ đều. Nó khởi động chậm rồi tăng tốc (**ease in / slow out**), và dừng lại từ từ (**ease out / slow in**). Nắm được điều này là ranh giới giữa chuyển động "sống" và chuyển động "máy móc".

## Mục tiêu học tập

- Giải thích được *vì sao* chuyển động tốc độ đều (**linear**) trông giả, và *vì sao* mắt người thấy ease tự nhiên.
- Đọc và vẽ được **spacing** (khoảng cách giữa các frame liên tiếp): chấm dày = chậm, chấm thưa = nhanh.
- Viết được 4 hàm easing cơ bản: **linear**, **ease-in**, **ease-out**, **ease-in-out**, kèm công thức và ví dụ số.
- Nhận ra **đồ thị vị trí–thời gian**: linear = đường thẳng, ease-in-out = **đường cong chữ S**.
- Chọn đúng kiểu ease cho một chuyển động cụ thể (bóng rơi, cửa đóng, xe phanh).

## Kiến thức tiền đề

- [Lesson 01 — Timing & Spacing](../lesson-01-timing-spacing/): số frame quyết định *thời lượng*; khoảng cách giữa các frame (spacing) quyết định *tốc độ*. Bài này đào sâu vế thứ hai.
- [Lesson 03 — Anticipation & Follow Through](../lesson-03-anticipation-followthrough/): động tác lấy đà và quán tính — cũng dựa trên gia tốc mà bài này mô tả bằng số.
- Toán: chỉ cần bình phương và phép trừ. Không cần đạo hàm (nhưng nếu đã biết, ease chính là "vận tốc khác 0 rời khỏi hằng số").

---

## 1. Bức tranh lớn: vì sao "tốc độ đều" trông giả?

> 💡 **Trực giác.** Hãy tưởng tượng một quả bóng lăn từ mép trái bàn (A) sang mép phải (B). Nếu mỗi khung hình (frame) nó nhích **đúng một khoảng bằng nhau**, mắt bạn lập tức thấy "sai" — như một món đồ bị kéo bằng dây vô hình. Lý do: trong thế giới thật, **không có gì bắt đầu chuyển động ở tốc độ tối đa ngay lập tức**, và không có gì đang chạy nhanh mà **dừng phắt** không giảm tốc. Mọi vật đều có **quán tính (inertia)**: cần thời gian để tăng tốc và giảm tốc.

Trong hoạt hình, tốc độ **không** được ghi trực tiếp — nó lộ ra qua **spacing**: khoảng cách vật di chuyển giữa hai frame liên tiếp.

- Spacing **lớn** giữa 2 frame → vật đi được xa trong 1/24 giây → **nhanh**.
- Spacing **nhỏ** → vật gần như đứng yên → **chậm**.

Khi các họa sĩ vẽ đường chuyển động, họ chấm vị trí vật ở từng frame. Nhìn dãy chấm là đọc được tốc độ:

\`\`\`
Linear (đều):   A •   •   •   •   •   •   •   •   •   • B     ← chấm cách đều = máy móc
Ease-in-out:    A ••  •    •      •      •    •  •• B          ← dồn 2 đầu = sống
\`\`\`

> ⚠ **Lỗi thường gặp #1.** *"Chỉ cần đúng điểm đầu (A) và điểm cuối (B) là được."* **Sai.** Cùng điểm A và B, cùng số frame, cùng thời lượng — nhưng **cách phân bố spacing ở giữa** mới quyết định chuyển động sống hay chết. Ease không đổi *đi đâu* và *mất bao lâu*, nó chỉ đổi *nhịp* trên đường đi.

---

## 2. Spacing — ngôn ngữ của tốc độ

**Slow out** (ease in): rời khỏi keyframe đầu **chậm**, các chấm **dồn dày** gần A rồi thưa dần → vật *tăng tốc*.

**Slow in** (ease out): tiến vào keyframe cuối **chậm**, các chấm **thưa** ở giữa rồi **dồn dày** gần B → vật *giảm tốc*.

> ❓ **Câu hỏi tự nhiên.** *"Slow in hay slow out — tên nghe ngược với ease in/ease out?"* Đúng là dễ lẫn. Cách nhớ: **"slow"** nói về keyframe mà chuyển động đang **chậm lại gần đó**. *Slow **out*** = chậm khi *ra khỏi* frame đầu (ease **in**). *Slow **in*** = chậm khi *đi vào* frame cuối (ease **out**). Trong lập trình, tên **ease-in / ease-out** phổ biến hơn, nên bài này dùng bộ tên đó làm chính.

### Ví dụ số: chia đường A→B thành 10 frame

Cho vật đi từ A (vị trí 0) đến B (vị trí 100), qua đúng 10 frame. Ta so **linear** với **ease-in-out** (dồn 2 đầu):

| Frame | Linear (vị trí) | Δ spacing | Ease-in-out (vị trí) | Δ spacing |
|:-----:|----------------:|----------:|---------------------:|----------:|
| 1 | 10 | 10 | 2.8 | **2.8** |
| 2 | 20 | 10 | 10.4 | 7.6 |
| 3 | 30 | 10 | 21.6 | 11.2 |
| 4 | 40 | 10 | 35.2 | 13.6 |
| 5 | 50 | 10 | 50.0 | **14.8** |
| 6 | 60 | 10 | 64.8 | **14.8** |
| 7 | 70 | 10 | 78.4 | 13.6 |
| 8 | 80 | 10 | 89.6 | 11.2 |
| 9 | 90 | 10 | 97.2 | 7.6 |
| 10 | 100 | 10 | 100.0 | **2.8** |

Đọc bảng:

- **Linear**: spacing cố định **10** mỗi frame — vật chạy đều tăm tắp, không giống bất cứ vật thật nào.
- **Ease-in-out**: spacing nhỏ ở đầu (**2.8**), phình to ở giữa (**14.8**), rồi co nhỏ lại ở cuối (**2.8**). Chính là **dồn 2 đầu**. Vật khởi động chậm → phóng nhanh ở giữa → hãm lại nhẹ nhàng khi tới B.
- Kiểm tra: tổng spacing hai cột đều bằng **100** (cùng tới B). Chỉ *nhịp* khác nhau.

> 🔁 **Dừng lại tự kiểm tra.** Nhìn dãy chấm sau, tốc độ vật ở đoạn nào nhanh nhất?
> \`A •• • •   •      •   • •• B\`
>
> <details><summary>Đáp án</summary>
>
> Đoạn **giữa** (chấm thưa nhất). Đầu và cuối chấm dồn dày → chậm. Đây là chữ ký của **ease-in-out**.
> </details>

---

## 3. Toán của easing — 4 hàm cơ bản

Ta chuẩn hóa thời gian thành **tiến độ** $t \\in [0, 1]$: $t = 0$ ở frame đầu, $t = 1$ ở frame cuối. $t = \\dfrac{\\text{frame hiện tại}}{\\text{tổng số frame}}$.

Một **hàm easing** $f(t)$ biến tiến độ *thời gian* thành tiến độ *vị trí*. Vị trí thực tế:

$$\\text{vị trí}(t) = A + (B - A)\\cdot f(t)$$

Mọi hàm easing đều thỏa $f(0) = 0$ và $f(1) = 1$ (xuất phát ở A, kết thúc ở B). Cái khác nhau là **đường đi ở giữa**.

### 3.1 Linear — chuyển động đều

$$f(t) = t$$

Vận tốc không đổi. **Walk-through:** $f(0.5) = 0.5$ → đúng nửa đường ở nửa thời gian. Spacing đều tăm tắp. Đây là mặc định của máy tính, và cũng là thứ trông "giả" nhất.

### 3.2 Ease-in — chậm rồi nhanh (slow out)

$$f(t) = t^2$$

**Walk-through** (verify từng bước, $A=0, B=100$):

$$f(0.1) = 0.1^2 = 0.01 \\Rightarrow \\text{vị trí} = 1, \\quad f(0.5) = 0.25 \\Rightarrow 25, \\quad f(0.9) = 0.81 \\Rightarrow 81$$

Ở nửa thời gian ($t = 0.5$) vật mới đi được **25%** quãng đường — nó còn đang "ì" ở gần A. Spacing dồn dày gần A, thưa dần về B → **tăng tốc**. Dùng cho: vật bắt đầu rơi, xe khởi hành, nhân vật bắt đầu chạy.

### 3.3 Ease-out — nhanh rồi chậm (slow in)

$$f(t) = 1 - (1 - t)^2$$

**Walk-through:**

$$f(0.1) = 1 - 0.9^2 = 1 - 0.81 = 0.19 \\Rightarrow 19, \\quad f(0.5) = 1 - 0.25 = 0.75 \\Rightarrow 75, \\quad f(0.9) = 1 - 0.01 = 0.99 \\Rightarrow 99$$

Ngược với ease-in: mới $t = 0.5$ vật đã đi được **75%** — nó lao đi ngay rồi hãm lại. Spacing thưa ở đầu, dồn dày gần B → **giảm tốc**. Dùng cho: xe phanh, cửa đóng nhẹ vào khung, vật đáp xuống mặt đất.

### 3.4 Ease-in-out — chậm cả 2 đầu

$$f(t) = 3t^2 - 2t^3 = t^2(3 - 2t) \\quad (\\text{smoothstep})$$

**Walk-through:**

$$f(0.1) = 3(0.01) - 2(0.001) = 0.03 - 0.002 = 0.028 \\Rightarrow 2.8$$
$$f(0.5) = 3(0.25) - 2(0.125) = 0.75 - 0.25 = 0.5 \\Rightarrow 50$$
$$f(0.9) = 3(0.81) - 2(0.729) = 2.43 - 1.458 = 0.972 \\Rightarrow 97.2$$

Đúng nửa đường ở nửa thời gian (**đối xứng**), nhưng khởi động và kết thúc đều mượt. Đây là kiểu **tự nhiên nhất** cho phần lớn chuyển động, và cho **đồ thị vị trí–thời gian dạng chữ S**.

### 3.5 Bảng spacing 4 kiểu — 4 ví dụ số song song

Cùng đi A(0)→B(100), 10 frame. Bảng dưới là **spacing mỗi frame** (vật nhích được bao nhiêu ở frame đó):

| Frame | Linear | Ease-in ($t^2$) | Ease-out ($1-(1-t)^2$) | Ease-in-out (smoothstep) |
|:-----:|:------:|:---------------:|:----------------------:|:------------------------:|
| 1 | 10 | **1** | 19 | 2.8 |
| 2 | 10 | 3 | 17 | 7.6 |
| 3 | 10 | 5 | 15 | 11.2 |
| 4 | 10 | 7 | 13 | 13.6 |
| 5 | 10 | 9 | 11 | 14.8 |
| 6 | 10 | 11 | 9 | 14.8 |
| 7 | 10 | 13 | 7 | 13.6 |
| 8 | 10 | 15 | 5 | 11.2 |
| 9 | 10 | 17 | 3 | 7.6 |
| 10 | 10 | **19** | 1 | 2.8 |
| **Tổng** | **100** | **100** | **100** | **100** |

Bốn cột, bốn "tính cách" chuyển động khác nhau, nhưng cùng đi hết 100 đơn vị:

1. **Linear**: 10, 10, 10... — phẳng lì.
2. **Ease-in**: 1, 3, 5, 7... — số lẻ tăng dần, dồn về **cuối** (chấm dày ở A, thưa ở B).
3. **Ease-out**: 19, 17, 15... — giảm dần, dồn về **đầu** (chấm thưa ở A, dày ở B).
4. **Ease-in-out**: 2.8 → 14.8 → 2.8 — phình giữa, **dồn 2 đầu**.

> ❓ **Câu hỏi tự nhiên.**
> - *"Tính hàm ease có đắt không?"* → Không. $t^2$ hay $3t^2-2t^3$ chỉ vài phép nhân, chạy hàng triệu lần/giây thoải mái. Trong thực tế engine (CSS, After Effects, Unity) đã có sẵn \`ease\`, \`easeInOut\`, đường cong Bézier.
> - *"Sao dùng $t^2$ mà không phải bậc khác?"* → $t^2$ chỉ là ease **yếu nhất** (bậc 2). Muốn "ì" hơn thì dùng $t^3$, $t^4$... Bậc càng cao, hai đầu càng chậm, giữa càng "bùng". $t^2$ là mức nhẹ, dễ chịu, hay dùng làm mặc định.
> - *"Ease-in-out có bắt buộc đối xứng?"* → Không. Smoothstep đối xứng, nhưng ta có thể ghép ease-in mạnh + ease-out yếu để "vọt lên rồi thả nhẹ". Đối xứng chỉ là trường hợp phổ biến.

> ⚠ **Lỗi thường gặp #2.** Nhầm **ease-in** với **ease-out**. Mẹo: chữ "**in**" = *đi vào* chuyển động (mới nhấc chân, còn chậm) → chậm ở **đầu**. Chữ "**out**" = *ra khỏi* chuyển động (chuẩn bị dừng) → chậm ở **cuối**.

---

## 4. Đọc ngược spacing & chọn ease cho chuyển động thật

Kỹ năng cốt lõi của họa sĩ: **nhìn dãy chấm là biết chuyển động**, và ngược lại, **thấy một chuyển động là biết chọn ease nào**.

### 4.1 Quả bóng rơi và nảy — ví dụ kinh điển

- **Rơi xuống**: trọng lực làm bóng **tăng tốc** liên tục → dùng **ease-in** (chấm dồn dày ở đỉnh, thưa dần khi chạm đất). Đây chính là vật lý thật: quãng đường rơi $\\propto t^2$ — trùng khớp công thức ease-in $f(t)=t^2$!
- **Bật lên sau khi nảy**: bóng đi lên và **giảm tốc** dần vì trọng lực kéo lại → dùng **ease-out** (chấm dày ở dưới, thưa dần lên đỉnh).
- **Ở đỉnh cao nhất** (hang time): bóng gần như **đứng yên** một khoảnh khắc → spacing dồn cực dày ở đỉnh. Chính "slow in + slow out" quanh đỉnh tạo cảm giác lơ lửng.

> 💡 **Trực giác nối vật lý.** Ease-in không phải quy ước tùy tiện — nó **là** vật lý. Vật rơi tự do đi được $s = \\tfrac{1}{2}g t^2$, đúng dạng $t^2$. Vì thế hoạt hình vẽ đúng ease trông "thật" — nó khớp với cách não ta đã học về chuyển động từ lúc bé.

### 4.2 Bảng chọn ease nhanh

| Chuyển động | Ease phù hợp | Vì sao |
|-------------|--------------|--------|
| Vật rơi tự do | Ease-in | Trọng lực tăng tốc |
| Xe/vật phanh dừng | Ease-out | Giảm tốc tới 0 |
| Cửa mở rồi đóng khít | Ease-in-out | Mượt cả 2 đầu |
| Con lắc qua điểm giữa | Ease-out→in | Chậm ở 2 biên, nhanh ở giữa |
| Máy móc, robot, băng chuyền | Linear (cố ý) | *Muốn* cảm giác vô hồn |

> 🔁 **Dừng lại tự kiểm tra.** Một thang máy đi từ tầng 1 lên tầng 10 rồi dừng. Nên dùng ease gì? Vì sao spacing linear sẽ gây khó chịu cho người trong thang?
>
> <details><summary>Đáp án</summary>
>
> Dùng **ease-in-out**: khởi hành êm (ease-in) để không giật, dừng êm (ease-out) để không "khựng". Nếu linear, thang máy sẽ đạt tốc độ tối đa *ngay lập tức* ở tầng 1 và **dừng phắt** ở tầng 10 — người bên trong bị giật ngã. Ease-in-out mô phỏng đúng thang máy thật.
> </details>

---

## 5. Bài tập

**Bài 1 (cơ bản — tính vị trí & spacing).** Vật đi từ A (vị trí 0) đến B (vị trí 200), qua 5 frame ($t = 0.2, 0.4, 0.6, 0.8, 1.0$).
- (a) Với **ease-in** $f(t) = t^2$: tính vị trí và spacing mỗi frame. Chấm dồn về đầu hay cuối?
- (b) Với **ease-out** $f(t) = 1-(1-t)^2$: tính tương tự.

**Bài 2 (đọc ngược spacing).** Với mỗi dãy spacing dưới đây, xác định kiểu easing và mô tả cảm giác chuyển động:
- (a) \`10, 10, 10, 10, 10\`
- (b) \`1, 3, 5, 7, 9\`
- (c) \`9, 7, 5, 3, 1\`
- (d) \`2, 5, 6, 5, 2\`

**Bài 3 (vận dụng — thiết kế chuyển động).** Bạn làm hoạt hình một tách cà phê rơi từ bàn xuống sàn rồi vỡ. Chia làm 3 pha: (1) tách trượt tới mép bàn, (2) tách rơi trong không khí, (3) mảnh vỡ văng ra rồi dừng trên sàn. Chọn ease cho từng pha và giải thích.

---

## 6. Lời giải chi tiết

**Bài 1.**

(a) Ease-in $f(t) = t^2$, vị trí $= 200 \\cdot t^2$:

| $t$ | $f(t)=t^2$ | Vị trí | Spacing |
|:---:|:----------:|-------:|--------:|
| 0.2 | 0.04 | 8 | 8 |
| 0.4 | 0.16 | 32 | 24 |
| 0.6 | 0.36 | 72 | 40 |
| 0.8 | 0.64 | 128 | 56 |
| 1.0 | 1.00 | 200 | 72 |

Spacing **tăng dần** (8 → 72): chấm **dồn về đầu** (gần A). Vật khởi động ì rồi phóng nhanh — **slow out**. Kiểm tra tổng spacing $8+24+40+56+72 = 200$ ✓.

(b) Ease-out $f(t) = 1-(1-t)^2$, vị trí $= 200 \\cdot f(t)$:

| $t$ | $f(t)$ | Vị trí | Spacing |
|:---:|:------:|-------:|--------:|
| 0.2 | $1-0.8^2=0.36$ | 72 | 72 |
| 0.4 | $1-0.6^2=0.64$ | 128 | 56 |
| 0.6 | $1-0.4^2=0.84$ | 168 | 40 |
| 0.8 | $1-0.2^2=0.96$ | 192 | 24 |
| 1.0 | $1-0^2=1.00$ | 200 | 8 |

Spacing **giảm dần** (72 → 8): chấm **dồn về cuối** (gần B). Vật lao đi ngay rồi hãm lại — **slow in**. Đây đúng là ảnh phản chiếu của (a).

**Bài 2.**

- (a) \`10,10,10,10,10\` → **Linear**. Tốc độ đều, cảm giác máy móc/vô hồn.
- (b) \`1,3,5,7,9\` → **Ease-in**. Chậm ở đầu, tăng tốc dần — vật đang *khởi động* (rơi, phóng đi).
- (c) \`9,7,5,3,1\` → **Ease-out**. Nhanh ở đầu, chậm dần tới dừng — vật đang *hãm lại* (phanh, đáp xuống).
- (d) \`2,5,6,5,2\` → **Ease-in-out**. Chậm 2 đầu, nhanh ở giữa (dồn 2 đầu) — chuyển động mượt tự nhiên nhất (thang máy, cửa trượt).

**Bài 3.** Cách tiếp cận: xét gia tốc thật của từng pha rồi ánh xạ sang ease.

1. **Trượt tới mép bàn**: tách bị đẩy nhẹ, di chuyển rồi có thể chững lại ở mép trước khi rơi → **ease-out** (giảm tốc), hoặc **ease-in-out** nếu vừa đẩy vừa dừng. Chọn ease-out để nhấn "chững lại trước khi rơi".
2. **Rơi trong không khí**: trọng lực tăng tốc liên tục → **ease-in** ($f(t)=t^2$, trùng vật lý $s=\\tfrac12 g t^2$). Chấm dồn dày ở đỉnh, thưa dần khi gần sàn (rơi nhanh nhất lúc chạm).
3. **Mảnh vỡ văng ra rồi dừng**: các mảnh phóng ra nhanh rồi ma sát hãm lại tới 0 → **ease-out** (giảm tốc). Chấm dày lúc đầu, dồn dày khi dừng hẳn.

Nhận xét: một cảnh phức tạp = **ghép nhiều đoạn ease** khác nhau. Không có cảnh "một ease cho tất cả" — đó là điều phân biệt hoạt hình nghiệp dư (toàn linear) với chuyên nghiệp.

> 📝 **Tóm tắt bài học.**
> - Vật thật **không** chạy tốc độ đều: khởi động chậm (**ease-in/slow out**), dừng chậm (**ease-out/slow in**). Linear = máy móc, giả.
> - Tốc độ lộ ra qua **spacing**: chấm **dày = chậm**, chấm **thưa = nhanh**. Ease = spacing **dồn về hai đầu**.
> - 4 hàm: linear $f=t$; ease-in $f=t^2$; ease-out $f=1-(1-t)^2$; ease-in-out $f=3t^2-2t^3$. Vị trí $= A+(B-A)f(t)$.
> - **Đồ thị vị trí–thời gian**: linear = đường thẳng; ease-in-out = **chữ S**.
> - Ease không phải quy ước — nó **là** vật lý ($s \\propto t^2$). Chọn ease theo gia tốc thật của vật.

---

## Bài tiếp theo

**[Lesson 05 — Keyframe & Nội suy (Interpolation)](../../02-Motion-Curves/lesson-05-keyframe-interpolation/)**: các hàm easing ở bài này chính là **đường cong nội suy** giữa 2 keyframe. Bài sau chuyển từ "cảm giác họa sĩ" sang "đường cong đồ thị" chính thức (Bézier, spline) mà mọi phần mềm hoạt hình dùng để tính frame ở giữa.

Minh họa tương tác: [visualization.html](./visualization.html) — chọn 4 kiểu ease, cho 4 vật chạy đua song song A→B, xem chấm spacing dồn 2 đầu và đồ thị vị trí–thời gian dạng chữ S.
`;
