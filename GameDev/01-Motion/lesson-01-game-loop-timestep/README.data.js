// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: GameDev/01-Motion/lesson-01-game-loop-timestep/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 01 — Game Loop & Timestep (vòng lặp game & bước thời gian)

> Bài **mở đầu** toàn lĩnh vực **GameDev (Game & mô phỏng vật lý)**. Đây là khái niệm nền: mọi bài sau (chuyển động, lực, va chạm) đều quay vòng quanh ý tưởng "cập nhật trạng thái theo thời gian, ~60 lần mỗi giây".

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **game loop** là gì: vòng \`input → update → render\` lặp mãi cho tới khi thoát.
- Hiểu **Δt (delta time)** — thời gian giữa 2 frame — và **vì sao cập nhật theo Δt mới giúp game chạy đúng tốc độ trên mọi máy** (frame-rate independence).
- Phân biệt **variable timestep** (đơn giản, dễ rung vật lý) và **fixed timestep** (vật lý tất định, dùng accumulator).
- Biết **spiral of death** là gì và cách tránh.
- Hiểu vì sao nên **tách \`update\` khỏi \`render\`**, và ý tưởng **interpolation** để hình ảnh mượt.
- Đọc được **FPS** và **frame budget** (16.67 ms ở 60fps), hiểu vì sao "tụt frame".

## Kiến thức tiền đề

- [Physics — Kinematics (động học)](../../../Physics/01-Mechanics/lesson-01-kinematics/) — chuyển động theo thời gian: $x = x_0 + v \\cdot t$. Game loop chính là cách máy tính "diễn" công thức này từng bước nhỏ.
- [Programming](../../../Programming/) — vòng lặp, hàm, biến trạng thái (state). Game loop chỉ là một vòng \`while\` đặc biệt.
- [Math — Tích phân xác định](../../../Math/04-Calculus-1var/lesson-07-definite-integral/) — (tùy chọn) cộng dồn các bước nhỏ $v \\cdot \\Delta t$ để ra quãng đường chính là **tổng Riemann** của vận tốc; cập nhật game = tích phân số (numerical integration). Sẽ đào sâu ở Lesson 03.

## 1. Vì sao cần game loop & timestep? — câu hỏi mở bài

Hãy bắt đầu bằng hai câu hỏi thật mà mọi người làm game đều gặp:

> **(1) Vì sao nhiều game đời DOS chạy "nhanh gấp đôi" trên máy mạnh hơn?**
> Game *Wing Commander*, các bản DOS cũ có nút "Turbo" — bật lên máy chạy nhanh đến mức **không chơi nổi**. Vì sao?
>
> **(2) Làm sao để một viên đạn rơi đúng tốc độ trên MỌI máy** — máy chạy 30 khung hình/giây (fps) lẫn máy chạy 144 fps đều thấy đạn rơi cùng tốc độ?

Câu trả lời của cả hai gói gọn trong một quy tắc: **đừng cộng một lượng cố định mỗi frame; hãy cộng theo *thời gian thực đã trôi qua* giữa hai frame.** Lượng thời gian đó gọi là **Δt (delta time)**. Cả bài này là để hiểu rõ câu đó.

### 1.1. Vấn đề cụ thể với "cộng hằng số mỗi frame"

Giả sử ta muốn viên bi chạy ngang, mỗi frame dịch sang phải. Cách *sai* mà người mới hay viết:

\`\`\`js
// SAI: cộng một lượng cố định MỖI FRAME, không quan tâm thời gian
x = x + 2;   // +2 pixel mỗi frame
\`\`\`

- Máy A chạy **30 fps** → 30 frame/giây → \`x\` tăng $30 \\times 2 = 60$ px mỗi giây.
- Máy B chạy **60 fps** → 60 frame/giây → \`x\` tăng $60 \\times 2 = 120$ px mỗi giây.
- Máy C chạy **144 fps** → $144 \\times 2 = 288$ px mỗi giây.

Cùng một dòng code, **ba tốc độ khác nhau** — máy mạnh, vật chạy nhanh hơn. Đây đúng là lý do game DOS "Turbo" chạy điên loạn: tốc độ vật buộc chặt vào tốc độ phần cứng.

### 1.2. Lời giải: cộng theo Δt

Muốn "100 px mỗi **giây**" thật sự, ta đo thời gian trôi qua từ frame trước ($\\Delta t$, đơn vị giây) rồi cộng $v \\cdot \\Delta t$:

\`\`\`js
// ĐÚNG: tốc độ tính theo GIÂY, nhân với thời gian frame thực
const v = 100;        // 100 px / GIÂY (frame-rate independent)
x = x + v * dt;       // dt = thời gian frame này (giây)
\`\`\`

- 30 fps: $dt \\approx 1/30 \\approx 0.0333$ s → mỗi frame $+100 \\times 0.0333 \\approx 3.33$ px, một giây có 30 frame → $30 \\times 3.33 \\approx 100$ px. ✓
- 60 fps: $dt \\approx 1/60 \\approx 0.0167$ s → mỗi frame $+100 \\times 0.0167 \\approx 1.67$ px, $60 \\times 1.67 \\approx 100$ px. ✓
- 144 fps: $dt \\approx 1/144 \\approx 0.00694$ s → mỗi frame $+0.694$ px, $144 \\times 0.694 \\approx 100$ px. ✓

**Mọi máy đều thấy bi đi 100 px/giây.** Frame nhiều thì mỗi bước nhỏ, frame ít thì mỗi bước to — bù trừ nhau ra cùng quãng đường. Đây là **frame-rate independence** (độc lập tốc độ khung hình).

> 💡 **Trực giác.** Hãy nghĩ tới việc đổ đầy 1 lít nước trong 10 giây. Bạn có thể rót 100 lần, mỗi lần 10 ml (rót nhanh tay), hoặc rót 10 lần, mỗi lần 100 ml (rót chậm tay). Số lần rót = số frame; lượng mỗi lần = $v \\cdot \\Delta t$. Dù rót nhanh hay chậm, **sau 10 giây vẫn đúng 1 lít**. "Cộng hằng số mỗi frame" giống như rót cố định 50 ml/lần bất kể nhanh chậm — rót nhanh thì tràn, rót chậm thì thiếu.

> 📝 **Tóm tắt mục 1.**
> - Game/mô phỏng = một vòng lặp cập nhật trạng thái + vẽ lại, ~60 lần/giây.
> - **Cộng hằng số mỗi frame** → tốc độ buộc vào phần cứng → máy mạnh chạy nhanh hơn (bug game DOS).
> - **Cộng $v \\cdot \\Delta t$** → tốc độ tính theo giây → mọi máy cùng tốc độ. Đây là ý tưởng cốt lõi của cả bài.

## 2. Game loop là gì?

### 2.1. (a) Là gì — vòng \`input → update → render\`

**Game loop (vòng lặp game)** là một vòng lặp chạy không ngừng từ lúc game khởi động tới lúc thoát, mỗi vòng (mỗi **frame**, mỗi **tick**) làm đúng 3 việc theo thứ tự:

1. **input** — đọc bàn phím/chuột/tay cầm: người chơi vừa bấm gì?
2. **update(Δt)** — cập nhật *trạng thái thế giới* dựa trên input và thời gian Δt đã trôi: di chuyển nhân vật, áp trọng lực, kiểm tra va chạm, tính điểm.
3. **render** — vẽ trạng thái hiện tại lên màn hình.

\`\`\`text
khởi tạo thế giới
lặp mãi:
    input        ← đọc thiết bị nhập
    update(Δt)   ← thay đổi trạng thái theo thời gian
    render       ← vẽ trạng thái lên màn hình
\`\`\`

Pseudo-code tối giản:

\`\`\`js
let last = now();
function frame() {
  const t  = now();
  const dt = (t - last) / 1000;  // giây
  last = t;

  processInput();    // 1. input
  update(dt);        // 2. update — di chuyển, vật lý
  render();          // 3. render — vẽ

  requestAnimationFrame(frame);  // hẹn frame kế tiếp
}
requestAnimationFrame(frame);
\`\`\`

### 2.2. (b) Vì sao tồn tại — vì sao không "vẽ một lần là xong"?

Một trang web tĩnh vẽ một lần rồi đứng yên. Nhưng game có **thế giới thay đổi liên tục**: nhân vật di chuyển, đạn bay, kẻ thù đuổi theo. Để mắt người thấy *chuyển động liên tục*, ta phải **vẽ lại nhiều lần mỗi giây** với trạng thái hơi khác nhau — đúng nguyên lý phim ảnh (24+ hình/giây thì mắt thấy mượt). Game loop là cơ chế "máy chiếu phim" đó: liên tục \`update → render\` để tạo ảo giác chuyển động.

Vì sao **không** dùng \`setInterval(fn, 16)\` (gọi mỗi 16 ms)? Vì \`setInterval\` không đồng bộ với chu kỳ vẽ của màn hình → frame bị "xé hình" (tearing), trôi lệch (drift), và vẫn chạy khi tab ẩn (lãng phí pin). \`requestAnimationFrame\` (rAF) khắc phục:

- Trình duyệt gọi callback **ngay trước mỗi lần màn hình vẽ lại** (thường 60 lần/giây, khớp tần số quét màn hình).
- Tab ẩn → rAF **tạm dừng** → tiết kiệm pin/CPU.
- Truyền sẵn timestamp (mili-giây) để bạn tính Δt chính xác.

### 2.3. (c) Ví dụ số — 4 trạng thái qua các frame

Một viên bi: vị trí \`x\`, vận tốc $v = 200$ px/s, máy chạy 60 fps ($\\Delta t = 1/60 \\approx 0.0167$ s). Theo dõi 4 frame đầu (\`x\` khởi đầu = 0):

| Frame | t (s) | Δt (s) | update: x += v·Δt | x sau frame (px) |
|------:|------:|-------:|------------------:|-----------------:|
| 1 | 0.0167 | 0.0167 | 0 + 200·0.0167 = 3.33 | 3.33 |
| 2 | 0.0333 | 0.0167 | 3.33 + 3.33 | 6.67 |
| 3 | 0.0500 | 0.0167 | 6.67 + 3.33 | 10.00 |
| 4 | 0.0667 | 0.0167 | 10.00 + 3.33 | 13.33 |

Sau 1 giây (60 frame): $x \\approx 60 \\times 3.33 \\approx 200$ px ✓ — đúng $v \\cdot t = 200 \\times 1$.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - **"\`input → update → render\` có bắt buộc đúng thứ tự đó không?"** — Có, vì update cần biết input mới nhất, và render cần trạng thái *sau* update. Đảo thứ tự → người chơi thấy phản hồi trễ 1 frame.
> - **"Δt lấy ở đâu ra?"** — Hiệu giữa timestamp frame này và frame trước. rAF đưa timestamp sẵn; nếu tự đo thì dùng \`performance.now()\`.
> - **"Một frame mất bao lâu?"** — Ở 60 fps, 1 giây / 60 ≈ **16.67 ms**. Đó là *frame budget* — cả input + update + render phải xong trong 16.67 ms, nếu không sẽ tụt frame (xem §6).

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Trong game loop, vì sao \`render\` phải đặt SAU \`update\`?
> 2. Nếu máy chạy 50 fps, một frame kéo dài bao nhiêu ms?
>
> <details><summary>Đáp án</summary>
>
> 1. Vì \`render\` vẽ trạng thái *hiện tại*. Nếu vẽ trước update, màn hình hiển thị trạng thái cũ của frame trước → trễ 1 frame, cảm giác "lag".
> 2. 1 giây / 50 = 0.02 s = **20 ms** mỗi frame.
> </details>

> 📝 **Tóm tắt mục 2.**
> - Game loop = vòng lặp mãi \`input → update(Δt) → render\`, mỗi vòng là 1 frame.
> - Cần loop vì thế giới thay đổi liên tục — phải vẽ lại nhiều lần/giây để mắt thấy mượt.
> - Trên web dùng \`requestAnimationFrame\`: khớp tần số quét màn hình, tự dừng khi tab ẩn, cấp timestamp để tính Δt.

## 3. Δt (Delta Time) — trái tim của frame-rate independence

### 3.1. (a) Là gì

**Δt (delta time, "bước thời gian")** là **thời gian thực đã trôi qua giữa frame trước và frame hiện tại**, đo bằng giây.

$$\\Delta t = t_{\\text{frame hiện tại}} - t_{\\text{frame trước}}$$

Ký hiệu Δ (delta) trong toán/vật lý nghĩa là "sự thay đổi / hiệu". $\\Delta t$ = hiệu thời gian. (Cùng ký hiệu bạn gặp trong [động học](../../../Physics/01-Mechanics/lesson-01-kinematics/): vận tốc trung bình $= \\Delta x / \\Delta t$.)

### 3.2. (b) Vì sao cần — vì sao không dùng "số frame"?

Vì **số frame mỗi giây không cố định** giữa các máy (và thậm chí dao động trên *cùng* một máy khi tải nặng). Nếu đo chuyển động theo "số frame", tốc độ phụ thuộc phần cứng (đã thấy ở §1). Đo theo **thời gian thật** (Δt) thì tốc độ độc lập phần cứng — đó là toàn bộ lý do Δt tồn tại.

Quy tắc vàng:

$$\\text{lượng thay đổi mỗi frame} = \\text{(tốc độ theo giây)} \\times \\Delta t$$

- Vị trí: \`x += v * dt\` (v tính px/**giây**).
- Vận tốc dưới trọng lực: \`v += g * dt\` (g tính px/**giây²**).
- Bộ đếm thời gian hồi chiêu (cooldown): \`cooldown -= dt\`.

### 3.3. (c) Walk-through bằng số — cùng quãng đường ở mọi fps (≥4 ví dụ)

Vật có $v = 100$ px/s. Ta theo dõi quãng đường đi trong **đúng 1 giây** ở các fps khác nhau. Mỗi frame cộng $v \\cdot \\Delta t$.

**Ví dụ 1 — 60 fps.** $\\Delta t = 1/60 \\approx 0.01667$ s.
- Mỗi frame: $100 \\times 0.01667 = 1.667$ px.
- 60 frame trong 1 giây: $60 \\times 1.667 = 100.0$ px. ✓

**Ví dụ 2 — 30 fps.** $\\Delta t = 1/30 \\approx 0.03333$ s.
- Mỗi frame: $100 \\times 0.03333 = 3.333$ px (gấp đôi frame ở 60 fps, vì mỗi frame kéo dài gấp đôi).
- 30 frame trong 1 giây: $30 \\times 3.333 = 100.0$ px. ✓

**Ví dụ 3 — 120 fps.** $\\Delta t = 1/120 \\approx 0.008333$ s.
- Mỗi frame: $100 \\times 0.008333 = 0.8333$ px (nửa so với 60 fps).
- 120 frame: $120 \\times 0.8333 = 100.0$ px. ✓

**Ví dụ 4 — 15 fps (máy yếu).** $\\Delta t = 1/15 \\approx 0.06667$ s.
- Mỗi frame: $100 \\times 0.06667 = 6.667$ px (bước to vì frame thưa).
- 15 frame: $15 \\times 6.667 = 100.0$ px. ✓

**Ví dụ 5 — fps dao động trong 1 giây.** Giả sử 1 giây gồm 3 frame có Δt lần lượt \`0.5 s\`, \`0.3 s\`, \`0.2 s\` (tổng = 1 s).
- Frame 1: $100 \\times 0.5 = 50$ px → tổng 50.
- Frame 2: $100 \\times 0.3 = 30$ px → tổng 80.
- Frame 3: $100 \\times 0.2 = 20$ px → tổng 100. ✓

Dù fps lên xuống thất thường, **tổng quãng đường vẫn = $v \\times (\\text{tổng } \\Delta t) = 100 \\times 1 = 100$ px**. Đây chính là vì cộng $v \\cdot \\Delta t$ thực chất đang **cộng dồn (tích phân số)** vận tốc theo thời gian.

> 💡 **Trực giác — liên hệ tích phân.** Quãng đường = "diện tích dưới đường vận tốc". Mỗi $v \\cdot \\Delta t$ là một **cột chữ nhật** rộng $\\Delta t$, cao $v$. Cộng các cột lại = xấp xỉ diện tích = quãng đường. fps cao → nhiều cột mảnh; fps thấp → ít cột mập — nhưng tổng diện tích như nhau khi v hằng số. Đây đúng là **tổng Riemann** từ [Math — Tích phân xác định](../../../Math/04-Calculus-1var/lesson-07-definite-integral/). Sẽ đào sâu (Euler vs Verlet) ở **Lesson 03**.

> ⚠ **Lỗi thường gặp — QUÊN nhân Δt.**
> Viết \`x += v\` (quên \`* dt\`) hoặc \`x += 2\` (số ma thuật mỗi frame) là lỗi #1 của người mới. Hậu quả: **tốc độ phụ thuộc fps** — game chạy đúng trên máy bạn (60 fps) nhưng nhanh gấp đôi trên máy 120 fps của người chơi, hoặc chậm một nửa trên laptop 30 fps. Đây chính xác là bug "Turbo" của game DOS. **Mọi đại lượng biến đổi theo thời gian (vị trí, vận tốc, cooldown, animation) PHẢI nhân Δt.**
>
> Một biến thể tinh vi: nhân Δt cho vị trí nhưng **quên** cho vận tốc khi có gia tốc. \`v += g\` (sai) thay vì \`v += g * dt\` (đúng) → trọng lực mạnh yếu tùy fps.

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - **"Δt có bao giờ to bất thường không?"** — Có. Khi tab bị ẩn rồi quay lại, hoặc máy lag, Δt có thể nhảy lên cả giây. Một bước $v \\cdot \\Delta t$ khổng lồ → vật "dịch chuyển tức thời" xuyên tường. Cách chữa: **kẹp Δt** (\`dt = Math.min(dt, 0.1)\`) hoặc dùng **fixed timestep** (§4).
> - **"Δt nên tính bằng giây hay mili-giây?"** — Chọn một và nhất quán. Bài này dùng **giây** (chia timestamp ms cho 1000) vì khớp đơn vị vật lý (m/s, px/s).
> - **"Frame đầu tiên thì Δt = ?"** — Chưa có "frame trước" nên Δt chưa xác định. Thực tế: bỏ qua update frame đầu, hoặc khởi tạo \`last = now()\` trước vòng lặp để frame đầu có Δt ≈ 0.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Vật $v = 250$ px/s, ở 50 fps thì mỗi frame dịch bao nhiêu px? Một giây tổng cộng bao nhiêu?
> 2. Vì sao \`x += v * dt\` cho ra cùng quãng đường ở 30 fps và 60 fps?
>
> <details><summary>Đáp án</summary>
>
> 1. $\\Delta t = 1/50 = 0.02$ s → mỗi frame $250 \\times 0.02 = 5$ px. 50 frame/giây → $50 \\times 5 = 250$ px $= v \\times 1$ s. ✓
> 2. Vì tổng quãng đường $= v \\times \\sum \\Delta t = v \\times (\\text{thời gian thật trôi qua})$. $\\sum \\Delta t$ trong 1 giây luôn = 1 giây bất kể chia thành 30 hay 60 mảnh. fps chỉ đổi *kích thước* mỗi bước, không đổi *tổng*.
> </details>

> 📝 **Tóm tắt mục 3.**
> - Δt = thời gian thực giữa 2 frame (giây). Đo bằng hiệu timestamp.
> - Mọi thay đổi theo thời gian $= (\\text{tốc độ/giây}) \\times \\Delta t$.
> - Cộng $v \\cdot \\Delta t$ = tích phân số → tổng quãng đường độc lập fps.
> - Cẩn thận Δt nhảy vọt (tab ẩn) → kẹp Δt hoặc dùng fixed timestep.

## 4. Fixed vs Variable Timestep

Có hai cách trả lời câu "mỗi lần update dùng Δt bằng bao nhiêu?".

### 4.1. Variable timestep — dùng Δt thật mỗi frame

**(a) Là gì:** mỗi frame, gọi \`update(dt)\` với \`dt\` = Δt thật vừa đo. Đây là cách §2–§3 đã dùng.

**(b) Vì sao dùng / vì sao có vấn đề:** Đơn giản, ít code, mượt với chuyển động tuyến tính (\`x += v·dt\`). **Nhưng** với vật lý phức tạp (lò xo, va chạm chồng chất, ma sát) thì **không tất định và không ổn định**:

- **Không tất định (non-deterministic):** Δt khác nhau mỗi lần chạy → cùng input cho kết quả khác nhau. Tệ cho game cần replay, netcode, hoặc kiểm thử.
- **Không ổn định (instability):** tích phân Euler với Δt to → sai số tích lũy, vật "nổ tung". Ví dụ lò xo cứng: Δt to làm vật vọt qua điểm cân bằng ngày càng xa thay vì dao động quanh nó.

**(c) Ví dụ số — vì sao Δt to làm hỏng:** Lò xo kéo vật về gốc với gia tốc $a = -k \\cdot x$ ($k = 50$). Vật bắt đầu ở $x = 1$, $v = 0$. Tích phân Euler \`v += a·dt; x += v·dt\`.

- **Δt nhỏ = 0.01 s:** mỗi bước \`x\` nhích nhẹ về 0, dao động đẹp quanh gốc (biên độ ổn định ≈ 1).
- **Δt to = 0.1 s:** bước 1: $a = -50 \\times 1 = -50$, $v = 0 + (-50)(0.1) = -5$, $x = 1 + (-5)(0.1) = 0.5$. Bước 2: $a = -50 \\times 0.5 = -25$, $v = -5 + (-25)(0.1) = -7.5$, $x = 0.5 + (-7.5)(0.1) = -0.25$. Bước 3: $a = -50 \\times (-0.25) = 12.5$, $v = -7.5 + 1.25 = -6.25$, $x = -0.25 + (-0.625) = -0.875$ → đã vượt biên độ ban đầu! Biên độ **phình to** mỗi chu kỳ → vật "nổ tung". ✗

→ Δt to + vật lý cứng = **bùng nổ số học**. Đây là lý do cần fixed timestep.

### 4.2. Fixed timestep — bước cố định + accumulator

**(a) Là gì:** Vật lý luôn cập nhật với **một Δt cố định** (vd $FIXED = 1/60 \\approx 0.01667$ s) bất kể frame thật dài bao lâu. Để khớp với frame thật (dài/ngắn thất thường), dùng một **accumulator (bộ tích lũy)**: dồn thời gian thật vào accumulator, rồi "tiêu" nó thành từng bước cố định.

\`\`\`js
const FIXED = 1 / 60;     // bước vật lý cố định (s)
let acc = 0;

function frame() {
  const dt = realDeltaTime();      // Δt thật (có thể kẹp: Math.min(dt, 0.25))
  acc += dt;                       // dồn thời gian thật vào kho

  while (acc >= FIXED) {           // tiêu kho thành các bước cố định
    update(FIXED);                 // vật lý LUÔN thấy Δt = FIXED
    acc -= FIXED;
  }

  render(acc / FIXED);             // phần dư → dùng để interpolate (§5)
  requestAnimationFrame(frame);
}
\`\`\`

**(b) Vì sao dùng:** Vật lý luôn thấy cùng một Δt → **tất định** (replay/netcode/test ổn định) và **ổn định** (Δt nhỏ cố định không gây bùng nổ). Đây là cách hầu hết game engine nghiêm túc (vật lý Box2D, Unity \`FixedUpdate\`) làm.

**(c) Walk-through accumulator bằng số:** $FIXED = 1/60 \\approx 0.01667$ s. Theo dõi qua các frame có Δt thật khác nhau:

| Frame | Δt thật (s) | acc trước | acc sau khi += dt | số bước fixed chạy | acc còn dư |
|------:|------------:|----------:|------------------:|-------------------:|-----------:|
| 1 | 0.0167 | 0.0000 | 0.0167 | 1 (0.0167 ≥ 0.01667) | 0.0000 |
| 2 | 0.0334 | 0.0000 | 0.0334 | 2 (2×0.01667=0.0333) | 0.0001 |
| 3 | 0.0100 | 0.0001 | 0.0101 | 0 (0.0101 < 0.01667) | 0.0101 |
| 4 | 0.0100 | 0.0101 | 0.0201 | 1 | 0.0034 |
| 5 | 0.0500 | 0.0034 | 0.0534 | 3 (3×0.01667=0.0500) | 0.0034 |

Đọc bảng:
- **Frame 2** dài gấp đôi (lag nhẹ) → chạy **2 bước** vật lý cho "đuổi kịp" thời gian thật.
- **Frame 3** quá ngắn (0.01 s < FIXED) → chưa đủ một bước → chạy **0 bước**, để dành 0.0101 s trong accumulator. Vật lý "đứng yên" frame này nhưng render vẫn vẽ.
- **Frame 4** cộng phần dư từ frame 3 → đủ một bước → chạy 1.
- **Frame 5** lag to (0.05 s) → chạy **3 bước** để bắt kịp.

→ Tổng số bước fixed sau 5 frame $= 1+2+0+1+3 = 7$ bước × 0.01667 ≈ 0.1167 s, khớp tổng Δt thật $0.0167+0.0334+0.01+0.01+0.05 = 0.1201$ s (chênh lệch nhỏ chính là phần dư còn trong accumulator). Vật lý chạy đúng "nhịp thời gian thật" nhưng mỗi bước luôn đều đặn.

### 4.3. Spiral of death (vòng xoáy tử thần)

> ⚠ **Lỗi nguy hiểm — spiral of death.** Giả sử mỗi bước \`update(FIXED)\` mất **20 ms** để tính (vật lý quá nặng), nhưng FIXED chỉ đại diện cho **16.67 ms** thời gian game. Mỗi frame:
> - Thời gian thật trôi qua (vd 50 ms) → accumulator nhận thêm → cần chạy ~3 bước.
> - Nhưng 3 bước × 20 ms = 60 ms tính toán > 50 ms thật → frame *sau* còn dài hơn → accumulator phình thêm → cần *nhiều bước hơn* → tính toán còn lâu hơn nữa...
>
> Accumulator phình **mãi mãi không trả hết**, mỗi frame chạy ngày càng nhiều bước, game **đứng hình rồi treo**. Đó là *vòng xoáy tử thần*.
>
> **Cách tránh:** kẹp số bước tối đa mỗi frame, hoặc kẹp Δt thật trước khi cộng vào accumulator:
> \`\`\`js
> dt = Math.min(dt, 0.25);   // không bao giờ nhận quá 0.25 s/frame
> // hoặc: chỉ cho chạy tối đa N bước/frame, phần dư bỏ (game "chậm lại" thay vì treo)
> \`\`\`

### 4.4. So sánh nhanh

| | Variable timestep | Fixed timestep |
|---|---|---|
| Δt mỗi update | thay đổi (Δt thật) | cố định (FIXED) |
| Code | đơn giản | cần accumulator |
| Tất định? | không | **có** |
| Ổn định vật lý? | kém với vật lý cứng | **tốt** |
| Hợp cho | prototype, chuyển động đơn giản | vật lý, netcode, replay |
| Rủi ro | dịch chuyển xuyên tường khi Δt vọt | spiral of death (nếu không kẹp) |

> ❓ **Câu hỏi tự nhiên của người đọc.**
> - **"FIXED = 1/60 nghĩa là game khóa 60 fps?"** — Không. FIXED là nhịp *vật lý*, không phải nhịp *render*. Render vẫn chạy theo rAF (có thể 144 fps); chỉ vật lý bước đều 60 lần/giây. Một frame render có thể chạy 0, 1, hay nhiều bước vật lý.
> - **"Nếu render nhanh hơn vật lý, hình có giật không?"** — Có thể, vì vài frame render thấy cùng một trạng thái vật lý. Sửa bằng **interpolation** (§5).

> 📝 **Tóm tắt mục 4.**
> - **Variable:** \`update(Δt thật)\` — đơn giản nhưng vật lý không tất định, dễ nổ với Δt to.
> - **Fixed:** \`update(FIXED)\` qua accumulator — tất định, ổn định; mỗi frame chạy 0..n bước để bám thời gian thật.
> - **Spiral of death:** bước tính lâu hơn thời gian nó đại diện → accumulator phình mãi → treo. Tránh bằng kẹp Δt / kẹp số bước.

## 5. Tách \`update\` khỏi \`render\` + interpolation

### 5.1. Vì sao tách

Với fixed timestep, vật lý nhảy theo từng nấc \`FIXED\`, còn render chạy theo rAF (có thể nhanh hơn). Nếu render thẳng vị trí vật lý, các frame render giữa hai bước vật lý sẽ thấy **cùng một vị trí** → chuyển động giật nhẹ (stutter). Tách rời cho phép xử lý riêng:

- **update** = lo *logic & vật lý* (đúng đắn, tất định, nhịp cố định).
- **render** = lo *hình ảnh* (mượt, theo tốc độ màn hình).

### 5.2. Interpolation (nội suy) — sơ lược

Sau vòng \`while\`, accumulator còn dư \`acc\` (luôn \`< FIXED\`). Phần dư này nói "ta đang ở **giữa** hai bước vật lý". Tính tỉ lệ:

$$\\alpha = \\frac{acc}{FIXED} \\in [0, 1)$$

rồi vẽ vật ở vị trí **pha trộn** giữa trạng thái cũ và mới:

$$x_{\\text{vẽ}} = x_{\\text{cũ}} + (x_{\\text{mới}} - x_{\\text{cũ}}) \\cdot \\alpha$$

**Ví dụ số:** vật bước từ $x_{cũ} = 100$ tới $x_{mới} = 110$ mỗi bước vật lý. Một frame render có $acc = 0.5 \\times FIXED$ → $\\alpha = 0.5$ → vẽ ở $100 + (110-100) \\times 0.5 = 105$. Frame khác $\\alpha = 0.25$ → vẽ ở $102.5$. Hình di chuyển *liên tục* dù vật lý chỉ nhảy nấc 100 → 110 → 120. (Cần lưu cả $x_{cũ}$ và $x_{mới}$.) Đây là **linear interpolation (lerp)** — sẽ gặp lại nhiều ở các bài chuyển động/animation sau.

> 📝 **Tóm tắt mục 5.**
> - Tách update (logic/vật lý, nhịp cố định) khỏi render (hình ảnh, nhịp màn hình).
> - Phần dư accumulator → tỉ lệ $\\alpha = acc/FIXED$ → nội suy \`lerp(x_cũ, x_mới, α)\` cho hình mượt giữa hai bước vật lý.

## 6. FPS, frame budget & vì sao tụt frame

### 6.1. (a) FPS là gì

**FPS (frames per second — số khung hình mỗi giây)** = số lần game hoàn thành một vòng \`input→update→render\` trong 1 giây. Tính nhanh từ Δt:

$$\\text{FPS} = \\frac{1}{\\Delta t}$$

**Ví dụ:** $\\Delta t = 0.0167$ s → $1/0.0167 \\approx 60$ fps. $\\Delta t = 0.0333$ → 30 fps. $\\Delta t = 0.00694$ → 144 fps. $\\Delta t = 0.05$ → 20 fps.

### 6.2. (b) Frame budget — ngân sách thời gian mỗi frame

Muốn giữ một fps mục tiêu, mỗi frame phải xong trong **frame budget = 1 / fps mục tiêu**:

| FPS mục tiêu | Frame budget |
|------------:|-------------:|
| 30 fps | 1/30 = **33.33 ms** |
| 60 fps | 1/60 = **16.67 ms** |
| 120 fps | 1/120 = **8.33 ms** |
| 144 fps | 1/144 = **6.94 ms** |

Ở 60 fps, **toàn bộ** input + update (vật lý) + render phải gói gọn trong **16.67 ms**. Vượt budget → không kịp lần quét màn hình kế → **tụt frame**.

### 6.3. (c) Vì sao tụt frame — ví dụ số

Giả sử frame budget 60 fps = 16.67 ms. Một frame tốn:
- input: 1 ms
- update (vật lý 5000 vật va chạm): 14 ms
- render: 6 ms
- **Tổng = 21 ms > 16.67 ms** → lỡ nhịp quét → màn hình giữ lại frame cũ thêm 1 nhịp → fps tụt từ 60 xuống ~48. Người chơi thấy "khựng".

> ⚠ **Lỗi thường gặp.** Tin rằng "code chạy 60 fps trên máy mình thì máy nào cũng 60 fps". Máy yếu hơn có budget khó đạt hơn → tụt frame. Đây *lại* là lý do phải dùng Δt: nếu cập nhật theo Δt, máy tụt còn 30 fps vẫn thấy vật đi đúng tốc độ (chỉ kém mượt), thay vì chạy chậm một nửa.

> 🔁 **Dừng lại tự kiểm tra.**
> 1. Game muốn 120 fps, một frame có budget bao nhiêu ms?
> 2. Đo được Δt = 0.025 s — đang chạy bao nhiêu fps? Có đạt 60 fps không?
>
> <details><summary>Đáp án</summary>
>
> 1. $1/120 = 0.00833$ s = **8.33 ms**.
> 2. $1/0.025 = 40$ fps. Không đạt 60 fps (budget 16.67 ms bị vượt: 25 ms > 16.67 ms).
> </details>

> 📝 **Tóm tắt mục 6.**
> - FPS = 1/Δt. Frame budget = 1/(fps mục tiêu); 60 fps → 16.67 ms.
> - Input+update+render phải gọn trong budget; vượt → tụt frame.
> - Dùng Δt thì máy yếu vẫn đúng tốc độ (kém mượt), không chậm hẳn.

## 7. Liên hệ tới các bài & lĩnh vực khác

- **Δt là hằng số xuyên suốt GameDev.** Mọi cập nhật sau này đều dạng \`đại lượng += tốc độ * dt\`:
  - **Lesson 02 — [Vectors & Kinematics](../lesson-02-vectors-kinematics/):** vị trí/vận tốc thành **vector**; \`pos += vel * dt\` áp cho cả x và y cùng lúc.
  - **Lesson 03 — Tích phân số (Integration):** \`x += v·dt\`, \`v += a·dt\` chính là **Euler integration**; sẽ so sánh với semi-implicit Euler và Verlet (ổn định hơn). Nền toán: [tổng Riemann / tích phân](../../../Math/04-Calculus-1var/lesson-07-definite-integral/).
  - **Lesson 04 — Lực & gia tốc (Forces):** Newton $F = m \\cdot a$ → $a = F/m$ → \`v += a·dt\`. Trọng lực, lò xo, ma sát đều cộng vào \`a\` rồi nhân Δt.
- **Liên hệ [Physics — Kinematics](../../../Physics/01-Mechanics/lesson-01-kinematics/):** công thức vật lý ($x = x_0 + v t$, $v = v_0 + a t$) là *nghiệm liên tục*; game loop là cách máy tính **rời rạc hóa** chúng — chia thời gian thành các bước Δt rồi cộng dồn. Game = vật lý chạy bằng số.
- **Liên hệ [Programming](../../../Programming/):** game loop chỉ là một vòng \`while\`/đệ quy với biến trạng thái — nhưng là vòng lặp *quan trọng nhất* trong mọi game/mô phỏng.

## 8. Bài tập

**Bài 1.** Một vật có $v = 300$ px/s. Tính lượng dịch chuyển *mỗi frame* và *tổng trong 1 giây* ở các fps: 20, 60, 75, 150. Xác nhận tổng luôn = 300 px.

**Bài 2.** Một đoạn code viết \`x += 4\` mỗi frame (không nhân Δt). Trên máy 60 fps vật đi 240 px/s. Hỏi trên máy 144 fps vật đi bao nhiêu px/s? Viết lại dòng code cho frame-rate independent sao cho giữ đúng 240 px/s trên mọi máy.

**Bài 3.** (Accumulator) Cho $FIXED = 1/60 \\approx 0.01667$ s, accumulator bắt đầu = 0. Các frame có Δt thật lần lượt: \`0.030, 0.005, 0.040, 0.010\`. Với mỗi frame, tính số bước fixed chạy và accumulator còn dư sau frame.

**Bài 4.** (Spiral of death) Mỗi bước \`update(FIXED)\` (FIXED đại diện 16.67 ms) mất 25 ms để tính. Một frame thật kéo dài 50 ms. Giải thích bằng số vì sao accumulator sẽ phình mãi không trả hết, và đề xuất một cách kẹp để tránh treo.

**Bài 5.** (FPS & budget) Đo được Δt = 0.0125 s. (a) FPS hiện tại? (b) Đang nhắm 60 fps thì còn dư bao nhiêu ms trong budget? (c) Nếu thêm một tính năng tốn 6 ms/frame nữa thì có còn đạt 60 fps không?

**Bài 6.** (Interpolation) Vật lý bước từ $x_{cũ} = 50$ tới $x_{mới} = 62$ mỗi bước FIXED. Một frame render có accumulator dư $acc = 0.012$ s (FIXED = 0.0167 s). Tính $\\alpha$ và vị trí vẽ nội suy $x_{vẽ}$.

**Bài 7.** (Khái niệm) Giải thích vì sao \`requestAnimationFrame\` tốt hơn \`setInterval(fn, 16)\` cho game loop — nêu ít nhất 2 lý do.

## Lời giải chi tiết

### Bài 1

$v = 300$ px/s. Mỗi frame $= v \\cdot \\Delta t = 300/fps$. Tổng/giây $= fps \\times (300/fps) = 300$ px luôn.

| fps | Δt = 1/fps (s) | mỗi frame = 300·Δt (px) | tổng = fps × mỗi frame |
|----:|---------------:|------------------------:|-----------------------:|
| 20 | 0.05 | 300 × 0.05 = 15 | 20 × 15 = **300** ✓ |
| 60 | 0.01667 | 300 × 0.01667 = 5.0 | 60 × 5 = **300** ✓ |
| 75 | 0.01333 | 300 × 0.01333 = 4.0 | 75 × 4 = **300** ✓ |
| 150 | 0.006667 | 300 × 0.006667 = 2.0 | 150 × 2 = **300** ✓ |

Bài học: fps đổi chỉ làm *kích thước bước* đổi tỉ lệ nghịch, tổng giữ nguyên.

### Bài 2

\`x += 4\` mỗi frame → tốc độ $= 4 \\times fps$ px/s.
- 60 fps: $4 \\times 60 = 240$ px/s (đề bài).
- 144 fps: $4 \\times 144 = \\mathbf{576}$ px/s — nhanh gấp 2.4 lần. Đây là bug frame-rate dependence.

Sửa: muốn cố định 240 px/s, đặt $v = 240$ rồi nhân Δt:
\`\`\`js
const v = 240;       // px / giây
x += v * dt;         // dt = thời gian frame (giây)
\`\`\`
Kiểm tra ở 144 fps: $dt = 1/144$, mỗi frame $240/144 \\approx 1.667$ px, $144 \\times 1.667 = 240$ px/s ✓. Mọi máy giữ 240 px/s.

### Bài 3

$FIXED = 0.016667$ s. Quy tắc: \`acc += dt\`, rồi \`while (acc >= FIXED) { bước++; acc -= FIXED; }\`.

| Frame | Δt | acc trước | acc += dt | bước chạy | acc còn dư |
|------:|----:|----------:|----------:|----------:|-----------:|
| 1 | 0.030 | 0.000000 | 0.030000 | 1 (0.030 ≥ 0.01667; trừ 1 lần còn 0.013333 < FIXED) | 0.013333 |
| 2 | 0.005 | 0.013333 | 0.018333 | 1 (≥ FIXED; còn 0.001667) | 0.001667 |
| 3 | 0.040 | 0.001667 | 0.041667 | 2 (trừ 2 lần: 0.041667−0.033333=0.008333) | 0.008333 |
| 4 | 0.010 | 0.008333 | 0.018333 | 1 (còn 0.001667) | 0.001667 |

Tổng bước $= 1+1+2+1 = 5$; $5 \\times 0.016667 = 0.08333$ s ≈ tổng Δt $0.030+0.005+0.040+0.010 = 0.085$ s trừ phần dư cuối $0.001667$. ✓

### Bài 4

FIXED đại diện 16.67 ms thời-gian-game, nhưng tính một bước mất 25 ms thời-gian-thật. Một frame thật = 50 ms:
- 50 ms thật → accumulator cần tiêu ~$50/16.67 \\approx 3$ bước.
- 3 bước × 25 ms tính = **75 ms** thời gian thật để xử lý xong frame "lẽ ra 50 ms".
- Nhưng trong 75 ms đó, đồng hồ thật đã trôi 75 ms → frame *kế* nhận $75/16.67 \\approx 4\\text{-}5$ bước → cần 100–125 ms tính → frame kế nữa còn nhiều bước hơn...
- Mỗi frame số bước **tăng dần**, accumulator không bao giờ trả về gần 0 → game đứng hình rồi treo. Đó là spiral of death.

**Cách kẹp:** giới hạn Δt nhận vào, hoặc số bước tối đa:
\`\`\`js
dt = Math.min(dt, 0.1);            // không nhận quá 0.1 s/frame
// hoặc kẹp số bước:
let steps = 0;
while (acc >= FIXED && steps < 5) { update(FIXED); acc -= FIXED; steps++; }
if (acc > FIXED) acc = 0;           // bỏ phần dư: game "chậm lại" chứ không treo
\`\`\`
Hệ quả chấp nhận được: khi máy quá yếu, game **chạy chậm (slow-motion)** thay vì đông cứng — vẫn tương tác được.

### Bài 5

$\\Delta t = 0.0125$ s.
- (a) FPS $= 1/0.0125 = \\mathbf{80}$ fps.
- (b) Budget 60 fps = 16.67 ms. Frame hiện tại tốn 12.5 ms → còn dư $16.67 - 12.5 = \\mathbf{4.17}$ ms.
- (c) Thêm 6 ms → tổng $12.5 + 6 = 18.5$ ms $> 16.67$ ms → **không** còn đạt 60 fps; fps mới ≈ $1/0.0185 \\approx 54$ fps.

### Bài 6

$FIXED = 0.0167$ s, $acc = 0.012$ s.
- $\\alpha = acc / FIXED = 0.012 / 0.0167 \\approx \\mathbf{0.719}$.
- $x_{vẽ} = x_{cũ} + (x_{mới} - x_{cũ}) \\cdot \\alpha = 50 + (62 - 50) \\times 0.719 = 50 + 12 \\times 0.719 = 50 + 8.63 = \\mathbf{58.63}$.

Vật vẽ ở 58.63 — nằm ~72% đường từ 50 tới 62, khớp việc accumulator đã đi 72% chặng tới bước kế. Hình mượt dù vật lý còn ở mốc 50.

### Bài 7

\`requestAnimationFrame\` (rAF) hơn \`setInterval(fn, 16)\` vì:
1. **Đồng bộ với màn hình:** rAF gọi callback ngay trước mỗi lần màn hình quét (vsync) → không "xé hình" (tearing), không lệch nhịp. \`setInterval(16)\` chạy theo đồng hồ riêng, lệch dần khỏi nhịp 60 Hz → giật, drift.
2. **Tự dừng khi tab ẩn:** rAF tạm dừng khi tab không hiển thị → tiết kiệm CPU/pin. \`setInterval\` vẫn chạy nền vô ích.
3. **(thêm) Cấp timestamp chính xác:** rAF truyền timestamp high-resolution để tính Δt; \`setInterval\` không, và không đảm bảo đúng 16 ms (có thể bị dồn/trễ).

## Tham khảo và bài tiếp theo

- Bài tiếp theo: [Lesson 02 — Vectors & Kinematics](../lesson-02-vectors-kinematics/) — đưa vị trí/vận tốc thành **vector 2D**, áp \`pos += vel * dt\` cho cả hai trục.
- Tiền đề liên quan: [Physics — Kinematics](../../../Physics/01-Mechanics/lesson-01-kinematics/) · [Programming](../../../Programming/) · [Math — Tích phân xác định](../../../Math/04-Calculus-1var/lesson-07-definite-integral/).
- Tham khảo kinh điển: bài viết "Fix Your Timestep!" của Glenn Fiedler (gafferongames) và "Game Programming Patterns — Game Loop" của Robert Nystrom (mô hình accumulator + interpolation ở §4–§5 bài này).
- Minh họa tương tác: [visualization.html](./visualization.html) — 3 mô phỏng realtime: frame-rate độc lập (Δt vs hằng số), fixed vs variable timestep (accumulator), và FPS/frame-budget meter.
`;
