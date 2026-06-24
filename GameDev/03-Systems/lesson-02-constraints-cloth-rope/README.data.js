// AUTO-GENERATED bởi tools/build-readme-data.go — KHÔNG sửa bằng tay.
// Source: GameDev/03-Systems/lesson-02-constraints-cloth-rope/README.md
// Chạy lại: go run tools/build-readme-data.go
window.README_MD = `# Lesson 12 — Constraints: Cloth & Rope (ràng buộc — dây, vải, ragdoll)

## Mục tiêu học tập

Sau bài này bạn sẽ:

- Hiểu **vì sao** dây, vải, chuỗi, ragdoll trong game không phải là "mỗi điểm một lò xo cứng" mà là **các điểm khối lượng (point mass) nối nhau bởi ràng buộc khoảng cách (distance constraint)**.
- Nắm cặp đôi **Verlet + distance constraint** (kỹ thuật Jakobsen): điểm chạy Verlet (không cần vận tốc tường minh), rồi **ép** mỗi cặp nối về đúng khoảng cách nghỉ bằng cách dịch hai điểm.
- Hiểu **giải lặp (relaxation / iterative solving)**: vì sao phải ép tất cả ràng buộc nhiều lần mỗi frame, và vì sao càng nhiều iteration thì dây/vải càng "cứng".
- Dựng được **rope/chain** (chuỗi điểm ghim một đầu), **cloth** (lưới điểm với ràng buộc ngang + dọc + chéo), và hiểu sơ lược **ragdoll** (khớp = điểm, xương = ràng buộc).
- Hiểu **xé vải (tearing)**: cắt ràng buộc khi căng quá ngưỡng.

## Kiến thức tiền đề

- [Lesson 11 — Particle Systems](../lesson-01-particle-systems/) — point mass, mảng nhiều hạt, mô phỏng từng bước.
- [Lesson 03 — Integration (Euler/Verlet)](../../01-Motion/lesson-03-integration-euler-verlet/) — **bắt buộc**: position Verlet là nền của toàn bộ bài này (xem §4.5 của bài đó — đã preview cloth).
- [Lesson 05 — Springs & Oscillation](../../01-Motion/lesson-05-springs-oscillation/) — so sánh: lò xo (force-based) vs ràng buộc (position-based).

## 1. Vì sao học ràng buộc? Đặt vấn đề

> Trong game, **lá cờ bay phấp phới trong gió**, **sợi xích đung đưa khi nhân vật chạy qua**, **tấm áo choàng (cape) của siêu anh hùng**, **cơ thể quái vật ngã xuống (ragdoll)** — tất cả những thứ "mềm, lủng lẳng, biến dạng" này được mô phỏng thế nào?

💡 **Trực giác / Hình dung.** Hãy tưởng tượng một **xâu chuỗi hạt cườm**: mỗi hạt là một điểm có khối lượng, sợi chỉ nối hai hạt liền kề giữ chúng **cách nhau một khoảng cố định** (chiều dài đoạn chỉ). Hạt được trọng lực kéo xuống, nhưng sợi chỉ **không cho chúng rời xa nhau quá** — đó là *ràng buộc*. Một sợi dây = một chuỗi hạt như vậy. Một tấm vải = một **lưới** hạt, mỗi hạt nối với hàng xóm trên/dưới/trái/phải. Một ragdoll = vài hạt (đặt ở khớp) nối bởi các đoạn "xương" có độ dài cố định.

### 1.1. Ý tưởng ngây thơ và vì sao nó "nổ"

Cách đầu tiên ai cũng nghĩ tới: **nối mỗi cặp điểm bằng một lò xo cứng** (Lesson 05). Lò xo cứng = hằng số $k$ rất lớn để dây gần như không co giãn.

Nhưng cách này **nổ (explode)**:

- Lực lò xo $F = -k \\cdot x$. Để dây "cứng" cần $k$ lớn. Nhưng $k$ lớn + bước thời gian $\\Delta t$ cố định = **mất ổn định số học**: dao động khuếch đại mỗi bước thay vì tắt dần.
- Ngưỡng nổ của lò xo cứng (xem [L03 §6.2](../../01-Motion/lesson-03-integration-euler-verlet/#62-δt-lớn--nổ-mất-ổn-định) và [L05](../../01-Motion/lesson-05-springs-oscillation/)): với Euler, dao động ổn định cần $\\Delta t < 2/\\omega$ với $\\omega = \\sqrt{k/m}$. Tăng $k$ lên 100 lần → $\\omega$ tăng 10 lần → $\\Delta t$ phải nhỏ đi 10 lần. Một tấm vải 30×30 với lò xo cực cứng đòi $\\Delta t$ siêu nhỏ → quá tốn, hoặc nổ tung.

⚠ **Lỗi thường gặp:** "Cứ tăng $k$ thật to là dây sẽ cứng." Sai — tăng $k$ làm hệ **mất ổn định** trước khi đủ cứng. Vải sẽ rung lắc rồi bay tứ tung. Đây chính là vấn đề mà **position-based constraint** ra đời để giải quyết.

### 1.2. Giải pháp: ràng buộc theo vị trí (position-based)

Thay vì *tính lực rồi để vật từ từ phản ứng*, ta **trực tiếp sửa vị trí**: nếu hai điểm lệch khỏi khoảng cách nghỉ, ta **đẩy/kéo chúng về đúng khoảng cách ngay lập tức**. Không có $k$, không có ngưỡng nổ. Đây là kỹ thuật **Jakobsen** (Thomas Jakobsen, GDC 2001, từ game *Hitman: Codename 47*) — nền tảng của hầu hết hệ thống cloth/rope/ragdoll trong game.

📝 **Tóm tắt mục 1:**
- Dây/vải/xích/ragdoll = **point mass nối bởi distance constraint**.
- Lò xo cứng (force-based) **nổ** vì $k$ lớn + $\\Delta t$ cố định → mất ổn định.
- Giải pháp: **sửa thẳng vị trí** (position-based) — không có $k$, không nổ. Đây là kỹ thuật Jakobsen, ghép với Verlet.

## 2. Verlet + Distance Constraint

### 2.1. Nhắc lại position Verlet (từ L03)

💡 **Trực giác.** Verlet "đoán" vị trí kế tiếp dựa trên **vị trí hiện tại và vị trí trước đó** — không lưu vận tốc riêng. Vận tốc *ngầm* nằm trong hiệu \`current − previous\`.

Công thức position Verlet (gia tốc $a$, bước $\\Delta t$):

$$x_{\\text{new}} = x + (x - x_{\\text{prev}}) + a \\cdot \\Delta t^2$$

Trong đó $(x - x_{\\text{prev}})$ chính là "vận tốc ngầm" nhân $\\Delta t$. Mỗi bước ta cập nhật: lưu \`x\` cũ vào \`prev\`, rồi gán \`x = x_new\`.

**Ví dụ số (4 ví dụ).** Lấy $\\Delta t = 1$, $a = (0, -1)$ (trọng lực hướng xuống, trục y dương xuống dưới — quy ước canvas), chỉ xét trục y:

| # | $y$ | $y_{\\text{prev}}$ | $y - y_{\\text{prev}}$ | $y_{\\text{new}} = y + (y - y_{\\text{prev}}) + a\\Delta t^2$ |
|---|-----|------|------|------|
| 1 | 100 | 100 | 0 | $100 + 0 + (-1) = 99$ |
| 2 | 99 | 100 | −1 | $99 + (-1) + (-1) = 97$ |
| 3 | 97 | 99 | −2 | $97 + (-2) + (-1) = 94$ |
| 4 | 94 | 97 | −3 | $94 + (-3) + (-1) = 90$ |

Lưu ý y giảm dần (vật bay lên? Không — ở đây $a=-1$ nghĩa hướng âm, ví dụ minh họa cơ chế "vận tốc ngầm tích lũy"). Quan trọng: bước đi mỗi lần lớn dần (−1, −2, −3) = vận tốc tăng đều = đúng vật lý rơi tự do.

### 2.2. Distance constraint là gì?

❓ **Câu hỏi tự nhiên:** "Sau khi cho điểm chạy Verlet tự do, làm sao giữ chúng cách nhau đúng khoảng?"

Một **distance constraint** giữa hai điểm $A$ và $B$ nói: *"khoảng cách $|B - A|$ phải bằng độ dài nghỉ (rest length) $L$."*

Khi Verlet làm hai điểm trôi lệch khỏi $L$, ta **ép** chúng về bằng cách dịch cả hai dọc theo đoạn nối:

$$
\\begin{aligned}
\\vec{d} &= B - A \\\\
\\text{dist} &= |\\vec{d}| \\\\
\\text{diff} &= \\frac{\\text{dist} - L}{\\text{dist}} \\\\
A &\\leftarrow A + 0.5 \\cdot \\vec{d} \\cdot \\text{diff} \\\\
B &\\leftarrow B - 0.5 \\cdot \\vec{d} \\cdot \\text{diff}
\\end{aligned}
$$

Hệ số $0.5$ vì hai điểm cùng khối lượng → mỗi điểm gánh **một nửa** độ lệch, gặp nhau ở giữa. (Nếu một điểm bị ghim, điểm kia gánh toàn bộ — xem §4.)

⚠ **Lỗi thường gặp:** quên chia \`diff\` cho \`dist\` (chuẩn hóa). Nếu dùng \`diff = dist − L\` (không chia), lượng dịch tỉ lệ với độ dài tuyệt đối thay vì tỉ lệ, ràng buộc sẽ over-shoot khi điểm ở xa → giật.

### 2.3. Vì sao Verlet hợp với ràng buộc? (không cần vận tốc tường minh)

💡 **Đây là điểm "ăn tiền".** Khi ta **dịch thẳng vị trí** của điểm để thỏa ràng buộc mà **không** đụng tới \`prev\`, thì ở bước Verlet kế tiếp, hiệu \`current − prev\` **tự động phản ánh** chuyển động vừa rồi. Nói cách khác: **dịch vị trí = ngầm thay đổi vận tốc**, miễn phí, đúng hướng.

Nếu dùng Euler (lưu vận tốc tường minh), sau khi sửa vị trí ta còn phải tự tay sửa vận tốc cho khớp — rườm rà và dễ sai. Verlet làm điều đó tự động. Đây chính là lý do [L03 §4.5](../../01-Motion/lesson-03-integration-euler-verlet/#45-vì-sao-verlet-được-yêu-thích-cho-ràng-buộc-preview-cloth) đã gọi Verlet là "tích phân được yêu thích cho ràng buộc".

### 2.4. Walk-through số — ép MỘT ràng buộc

Cho hai điểm cùng khối lượng, rest length $L = 10$:

- $A = (0, 0)$
- $B = (16, 0)$ → khoảng cách hiện tại $= 16$, dài hơn $L = 10$ là 6 đơn vị (dây bị kéo căng).

Bước 1 — vector nối và khoảng cách:
$$\\vec{d} = B - A = (16, 0), \\quad \\text{dist} = \\sqrt{16^2 + 0^2} = 16$$

Bước 2 — tỉ lệ lệch:
$$\\text{diff} = \\frac{\\text{dist} - L}{\\text{dist}} = \\frac{16 - 10}{16} = \\frac{6}{16} = 0.375$$

Bước 3 — dịch mỗi điểm nửa độ lệch:
$$
\\begin{aligned}
A &\\leftarrow A + 0.5 \\cdot \\vec{d} \\cdot 0.375 = (0,0) + 0.5 \\cdot (16,0) \\cdot 0.375 = (0,0) + (3, 0) = (3, 0) \\\\
B &\\leftarrow B - 0.5 \\cdot \\vec{d} \\cdot 0.375 = (16,0) - (3, 0) = (13, 0)
\\end{aligned}
$$

Bước 4 — kiểm tra: khoảng cách mới $= |13 - 3| = 10 = L$ ✓. Một ràng buộc cô lập **thỏa ngay trong một lần ép**. (Vấn đề là khi có nhiều ràng buộc dính nhau — xem §3.)

**Ví dụ số 2 — dây bị nén (ngắn hơn $L$).** $A=(0,0)$, $B=(4,0)$, $L=10$. dist $=4$, diff $=(4-10)/4 = -1.5$. $A \\leftarrow (0,0)+0.5(4,0)(-1.5) = (-3,0)$; $B \\leftarrow (4,0)-(-3,0)=(7,0)$. Khoảng cách mới $= 7-(-3) = 10$ ✓ (diff âm → đẩy hai điểm ra xa).

**Ví dụ số 3 — lệch theo trục chéo.** $A=(0,0)$, $B=(6,8)$, $L=5$. dist $=\\sqrt{36+64}=10$, diff $=(10-5)/10=0.5$. $A \\leftarrow (0,0)+0.5(6,8)(0.5)=(1.5,2)$; $B \\leftarrow (6,8)-(1.5,2)=(4.5,6)$. Khoảng cách mới $=\\sqrt{3^2+4^2}=5$ ✓.

**Ví dụ số 4 — đã đúng sẵn.** $A=(0,0)$, $B=(10,0)$, $L=10$. dist $=10$, diff $=0$ → không dịch gì (ràng buộc đã thỏa). ✓

🔁 **Dừng lại tự kiểm tra.** Cho $A=(0,0)$, $B=(0,20)$, $L=12$. Sau một lần ép, $A$ và $B$ ở đâu?
<details><summary>Đáp án</summary>

$\\vec{d}=(0,20)$, dist $=20$, diff $=(20-12)/20=0.4$. $A \\leftarrow (0,0)+0.5(0,20)(0.4)=(0,4)$; $B \\leftarrow (0,20)-(0,4)=(0,16)$. Khoảng cách $=16-4=12=L$ ✓.
</details>

📝 **Tóm tắt mục 2:**
- Mỗi điểm chạy **position Verlet** ($x_{\\text{new}}=x+(x-x_{\\text{prev}})+a\\Delta t^2$).
- Sau đó **ép** mỗi ràng buộc: tính \`diff = (dist−L)/dist\`, dịch $A$ thêm \`+0.5·d·diff\`, $B$ thêm \`−0.5·d·diff\`.
- Dịch vị trí **không đụng \`prev\`** → Verlet tự cập nhật "vận tốc ngầm" ở bước sau. Đó là lý do Verlet hợp với ràng buộc.

## 3. Giải lặp (relaxation) — ép nhiều lần mỗi frame

### 3.1. Vì sao một lần ép không đủ?

❓ **Câu hỏi tự nhiên:** "§2.4 cho thấy một ràng buộc thỏa ngay sau một lần ép. Sao còn cần lặp?"

Vì **các ràng buộc dính nhau**. Trong một chuỗi $A - B - C$, ép ràng buộc $(A,B)$ làm $B$ dịch → phá ràng buộc $(B,C)$ vừa đúng. Ép $(B,C)$ lại làm $B$ dịch → phá $(A,B)$. Mỗi lần ép cái này lại làm lệch cái kia một chút.

💡 **Trực giác.** Giống **kéo phẳng một tấm khăn trải bàn nhăn**: vuốt góc này thì góc kia phồng lên, vuốt qua vuốt lại nhiều lượt thì cả khăn từ từ phẳng. Mỗi "lượt vuốt toàn bộ" = một **iteration**. Càng nhiều iteration, hệ càng gần thỏa **mọi** ràng buộc cùng lúc → dây/vải càng **cứng** (ít co giãn nhão).

### 3.2. Vòng lặp giải

Mỗi frame, sau bước Verlet, ta lặp \`N\` lần — mỗi lần duyệt **toàn bộ** danh sách ràng buộc và ép từng cái:

\`\`\`
for iter := 0; iter < N; iter++ {
    for _, c := range constraints {
        satisfy(c)   // ép như §2.2
    }
}
\`\`\`

\`N\` thường 1–20. \`N\` nhỏ → mềm/nhão; \`N\` lớn → cứng (nhưng tốn CPU hơn).

### 3.3. Walk-through số — hội tụ của chuỗi 3 điểm

Chuỗi $A - B - C$, rest length mỗi đoạn $L = 10$. Ghim $A=(0,0)$ (không dịch). Trạng thái đầu sau Verlet:
- $A=(0,0)$ (ghim)
- $B=(20,0)$ → $|AB|=20$ (nên là 10)
- $C=(40,0)$ → $|BC|=20$ (nên là 10)

Mục tiêu cuối: $A=(0,0)$, $B=(10,0)$, $C=(20,0)$.

**Iteration 1:**

Ép $(A,B)$: $A$ ghim → toàn bộ độ lệch dồn vào $B$. dist $=20$, diff $=(20-10)/20=0.5$. Vì $A$ ghim, $B \\leftarrow B - \\vec{d}\\cdot\\text{diff}$ với toàn hệ số (không chia đôi): $B \\leftarrow (20,0) - (20,0)\\cdot 0.5 = (10,0)$. Giờ $|AB|=10$ ✓.

Ép $(B,C)$: $B=(10,0)$, $C=(40,0)$. dist $=30$, diff $=(30-10)/30=0.667$. Cả hai tự do → chia đôi. $\\vec{d}=(30,0)$. $B \\leftarrow (10,0)+0.5(30,0)(0.667)=(10,0)+(10,0)=(20,0)$; $C \\leftarrow (40,0)-(10,0)=(30,0)$. Giờ $|BC|=10$ ✓ **nhưng** vừa làm $|AB|=20-... = |20-0|=20$ — hỏng lại! ($B$ nhảy từ 10 về 20.)

Cuối iteration 1: $A=(0,0)$, $B=(20,0)$, $C=(30,0)$. $|AB|=20$ (sai), $|BC|=10$ (đúng). Chưa hội tụ.

**Iteration 2:**

Ép $(A,B)$: $A$ ghim, $B=(20,0)$, dist $=20$, diff $=0.5$. $B \\leftarrow (20,0)-(20,0)(0.5)=(10,0)$. $|AB|=10$ ✓.

Ép $(B,C)$: $B=(10,0)$, $C=(30,0)$, dist $=20$, diff $=(20-10)/20=0.5$. $\\vec{d}=(20,0)$. $B \\leftarrow (10,0)+0.5(20,0)(0.5)=(15,0)$; $C \\leftarrow (30,0)-(5,0)=(25,0)$. $|BC|=10$ ✓, nhưng $|AB|=15$ (sai ít hơn lần trước — đã từ 20 xuống 15).

Cuối iteration 2: $B=(15,0)$, $C=(25,0)$. $|AB|=15$ — **gần hơn** mục tiêu 10 so với iteration 1 (20).

**Xu hướng:** mỗi iteration, $|AB|$ tiến gần 10 hơn: 20 → 15 → 12.5 → 11.25 → … hội tụ về 10. Sau ~6–8 iteration, sai số < 1%. Đó là lý do \`N\` lớn cho dây cứng hơn.

⚠ **Lỗi thường gặp (1 iteration → dây nhão):** nếu \`N=1\`, dây/vải **co giãn như cao su** — kéo căng thì giãn ra, thả thì lủng lẳng quá mức, không giống dây thật. Tăng \`N\` lên 5–15 để cứng lại. Đây chính là hiệu ứng bạn thấy trong **module Iteration demo** của visualization.

⚠ **Lỗi thường gặp (ép quá cứng → giật):** \`N\` rất lớn (vài chục) + ràng buộc mâu thuẫn (vd vải bị kéo ở hai góc xa nhau cùng lúc) → hệ "rung" / giật vì mỗi frame solver cố thỏa những điều kiện không thể đồng thời. Cũng tốn CPU vô ích. Cân bằng: \`N\` đủ để trông cứng, không hơn.

### 3.4. Liên hệ: cùng ý tưởng với sequential impulse (L10)

💡 Kỹ thuật này **giống hệt** ý tưởng *sequential impulse* trong giải va chạm (sẽ học ở Lesson 10 — Collision response nâng cao): giải từng ràng buộc một, lặp lại nhiều lần để chúng "thỏa hiệp" hội tụ về nghiệm chung. Khác biệt: cloth giải trên **vị trí** (position), sequential impulse giải trên **xung lượng/vận tốc** (impulse). Bản chất toán học chung: **Gauss-Seidel relaxation** — giải hệ ràng buộc bằng cách quét tuần tự, lặp đến hội tụ.

📝 **Tóm tắt mục 3:**
- Ép một ràng buộc làm lệch ràng buộc kề → cần **lặp \`N\` lần/frame**.
- Mỗi iteration đưa hệ **gần hơn** nghiệm chung (hội tụ kiểu Gauss-Seidel).
- \`N\` nhỏ → nhão; \`N\` lớn → cứng; \`N\` quá lớn + ràng buộc mâu thuẫn → giật, tốn CPU.
- Cùng tinh thần với sequential impulse (L10), chỉ khác giải trên vị trí thay vì xung lượng.

## 4. Rope / Chain — chuỗi điểm ghim một đầu

💡 **Trực giác.** Một sợi dây = **chuỗi điểm nối tiếp** $P_0 - P_1 - P_2 - \\dots - P_{n-1}$, mỗi cặp kề nhau là một distance constraint với cùng rest length $L$. **Ghim (pin)** điểm đầu $P_0$ (treo lên trần) bằng cách: sau mỗi bước, **đặt lại vị trí $P_0$ về điểm neo cố định** (không cho Verlet/constraint dịch nó).

### 4.1. Cách ghim (pin)

Pin đơn giản nhất: đánh dấu điểm là \`pinned\`, và **bỏ qua nó** khi cập nhật Verlet và khi ép ràng buộc (chỉ dịch điểm còn lại của cặp). Tương đương "khối lượng vô hạn" — lực nào cũng không nhúc nhích.

⚠ **Lỗi thường gặp (quên pin → rơi hết):** nếu **không** ghim điểm đầu, trọng lực kéo *toàn bộ* chuỗi rơi thẳng xuống khỏi màn hình — dây không "treo" mà "rớt". Pin chính là cái đinh treo. Trong visualization, thử bỏ pin sẽ thấy cả dây trôi mất.

### 4.2. Walk-through số — chuỗi 4 điểm treo

Chuỗi $P_0 - P_1 - P_2 - P_3$, $L=10$ mỗi đoạn, ghim $P_0=(0,0)$. Khởi tạo nằm ngang:
- $P_0=(0,0)$ pinned, $P_1=(10,0)$, $P_2=(20,0)$, $P_3=(30,0)$.

Một frame:

1. **Verlet** (trọng lực $a=(0,1)$, $\\Delta t=1$, lần đầu \`prev=current\` nên chỉ rơi do $a$): mỗi điểm tự do dịch xuống. $P_1=(10,1)$, $P_2=(20,1)$, $P_3=(30,1)$. ($P_0$ pinned, giữ $(0,0)$.)

2. **Ép ràng buộc, iteration 1:**
   - $(P_0,P_1)$: $P_0=(0,0)$, $P_1=(10,1)$. dist $=\\sqrt{101}\\approx 10.05$, diff $\\approx(10.05-10)/10.05\\approx0.005$. $P_0$ pinned → chỉ $P_1$ dịch: $P_1 \\leftarrow (10,1) - (10,1)(0.005)\\approx(9.95,0.995)$. Gần như không đổi (lệch nhỏ).
   - $(P_1,P_2)$, $(P_2,P_3)$: tương tự, các điểm cuối dần "đu" xuống dưới do trọng lực tích lũy qua nhiều frame.

Sau **nhiều frame**, chuỗi rơi và đung đưa thành hình **cong** (giống dây xích thật — đường catenary), với $P_0$ giữ nguyên ở đỉnh. Khi kéo $P_3$ bằng chuột, lực truyền ngược lên chuỗi qua các ràng buộc.

🔁 **Dừng lại tự kiểm tra.** Nếu ghim **cả hai đầu** $P_0$ và $P_3$ rồi cho trọng lực kéo, hình dạng dây sẽ ra sao?
<details><summary>Đáp án</summary>

Dây võng xuống ở giữa thành đường cong **catenary** (dây xích treo hai đầu), giống dây điện giữa hai cột. Hai đầu cố định, phần giữa rơi thấp nhất. Đây là cách mô phỏng dây thừng cầu treo, dây điện trong game.
</details>

## 5. Cloth (vải) — lưới điểm

💡 **Trực giác.** Vải = **lưới 2D các điểm** (vd 20×20). Mỗi điểm nối với hàng xóm bằng ràng buộc:

- **Structural (ngang + dọc):** nối $(i,j)$ với $(i+1,j)$ và $(i,j+1)$ — giữ hình vuông cơ bản của lưới.
- **Shear (chéo):** nối $(i,j)$ với $(i+1,j+1)$ và $(i+1,j-1)$ — **chống xé/trượt chéo (shear)**, giữ ô không bị méo thành hình thoi.
- (Nâng cao) **Bend:** nối điểm cách 2 ô để chống gập — bỏ qua ở bài này.

Ghim hàng trên cùng (vd ghim các góc hoặc cả mép trên) → vải treo như **lá cờ** hoặc **rèm cửa**.

### 5.1. Vì sao cần ràng buộc chéo (shear)?

⚠ Nếu **chỉ** có ràng buộc ngang+dọc, mỗi ô vuông có thể **xẹp thành hình thoi** mà vẫn giữ đúng độ dài 4 cạnh — vải "trượt chéo" như tấm lưới mắt cáo bị kéo xiên. Ràng buộc chéo cố định cả đường chéo → ô giữ hình vuông, vải có "độ cứng cắt" như vải thật.

**Ví dụ số (đường chéo):** ô vuông cạnh $L=10$ thì đường chéo phải $=\\sqrt{10^2+10^2}=\\sqrt{200}\\approx14.14$. Đó là rest length của ràng buộc chéo. Bốn ô minh họa rest length chéo theo cạnh: cạnh 6 → chéo $\\approx8.49$; cạnh 8 → $\\approx11.31$; cạnh 12 → $\\approx16.97$; cạnh 15 → $\\approx21.21$. (Đều là $L\\sqrt2$.)

### 5.2. Tearing (xé vải) — sơ lược

💡 **Ý tưởng:** vải thật **rách khi căng quá**. Mô phỏng: với mỗi ràng buộc, nếu **khoảng cách hiện tại vượt ngưỡng** (vd $> 4 \\times L$), **xóa ràng buộc đó** khỏi danh sách. Hai mảnh vải tách rời tự nhiên.

**Ví dụ số (ngưỡng xé):** rest length $L=10$, ngưỡng xé $= 4L = 40$. Nếu kéo một điểm làm dist một ràng buộc lên 45 > 40 → cắt. Bốn ví dụ: dist 38 (giữ), 41 (cắt), 30 (giữ), 60 (cắt). Trong visualization, kéo chuột mạnh trên vải sẽ cắt các ràng buộc dưới con trỏ → tạo lỗ thủng.

📝 **Tóm tắt mục 5:**
- Vải = lưới điểm + ràng buộc **structural** (ngang/dọc) + **shear** (chéo, rest length $L\\sqrt2$).
- Thiếu ràng buộc chéo → ô xẹp thành hình thoi (mất độ cứng cắt).
- **Tearing:** xóa ràng buộc khi dist vượt ngưỡng (vd $4L$) → vải rách.
- Ghim mép trên → cờ/rèm; gió = thêm gia tốc ngang dao động.

## 6. Ragdoll — khớp và xương

💡 **Trực giác.** Ragdoll (cơ thể nhân vật ngã "mềm oặt") = **vài điểm đặt ở các khớp** (đầu, vai, khuỷu, hông, gối...) nối bởi ràng buộc khoảng cách đóng vai **xương** (độ dài cố định = chiều dài đoạn xương). Khi nhân vật chết/ngã, ta tắt điều khiển và để hệ Verlet + constraint tự rơi theo trọng lực + va chạm.

### 6.1. Cấu trúc tối giản

Ví dụ ragdoll "que" 6 điểm: \`đầu — cổ — hông — (tay trái, tay phải) — chân\`. Mỗi cặp nối là một xương với rest length cố định:

| Xương | Điểm A | Điểm B | rest length (ví dụ) |
|-------|--------|--------|---------------------|
| Cổ–đầu | cổ | đầu | 20 |
| Thân | cổ | hông | 40 |
| Tay T | cổ | tay trái | 35 |
| Tay P | cổ | tay phải | 35 |
| Chân T | hông | chân trái | 45 |
| Chân P | hông | chân phải | 45 |

Giải y hệt rope/cloth: Verlet mỗi điểm → ép mọi xương \`N\` lần/frame. Va chạm với sàn = nếu điểm vượt mặt sàn thì kẹp nó về (giống va chạm hạt với vật, Tier 2).

### 6.2. Giới hạn góc (angle constraint) — sơ lược

Xương người **không gập ngược** (khuỷu tay không bẻ ngược). Để ragdoll không trông "cao su", thêm **ràng buộc góc**: giữ góc giữa hai xương kề trong một khoảng cho phép (vd khuỷu 0°–150°). Cài đặt: nếu góc vượt giới hạn, dịch điểm đầu mút để kéo góc về biên. Chi tiết phức tạp hơn distance constraint — bài này chỉ nêu ý tưởng; nhiều game đơn giản hóa bằng cách chỉ dùng distance constraint + va chạm là đủ "đẹp".

📝 **Tóm tắt mục 6:**
- Ragdoll = điểm ở **khớp** + ràng buộc khoảng cách = **xương**.
- Cùng solver Verlet + relaxation như cloth/rope.
- Pin/limit góc + va chạm sàn để trông tự nhiên; distance constraint thường đã đủ.

## 7. Liên hệ — bài này nằm ở đâu trong lộ trình

- **Nền móng:** position Verlet ([L03 §4.5](../../01-Motion/lesson-03-integration-euler-verlet/#45-vì-sao-verlet-được-yêu-thích-cho-ràng-buộc-preview-cloth)) — không có Verlet thì không có kỹ thuật Jakobsen. Point mass từ [L11 Particle Systems](../lesson-01-particle-systems/).
- **Đối chiếu:** lò xo force-based ([L05 Springs](../../01-Motion/lesson-05-springs-oscillation/)) là cách *khác* để nối điểm — mềm, ổn định kém khi cứng. Constraint position-based là cách *thay thế* cho cloth/rope cứng.
- **Tương tác chuột & pin:** kéo điểm bằng chuột (đặt vị trí điểm = vị trí con trỏ mỗi frame) — cùng cơ chế pin nhưng pin "động".
- **Va chạm hạt với vật (Tier 2 — [02-Collision](../../02-Collision/)):** sau khi ép ràng buộc, kẹp mỗi điểm ra khỏi vật cản (sàn, hình tròn) — đây là cách cloth/ragdoll "đắp" lên vật thể trong game.
- **Giải lặp:** cùng tinh thần sequential impulse trong giải va chạm nâng cao (Lesson 10).

## Bài tập

**Bài 1.** Cho hai điểm cùng khối lượng $A=(2, 2)$, $B=(2, 14)$, rest length $L=8$. Thực hiện **một** lần ép distance constraint. Vị trí mới của $A$, $B$? Kiểm tra khoảng cách.

**Bài 2.** Cho ràng buộc nén: $A=(0,0)$, $B=(3,4)$, $L=10$. Một lần ép → vị trí mới? Giải thích dấu của \`diff\`.

**Bài 3.** Chuỗi $A-B$ với $A$ **bị ghim** tại $(0,0)$, $B=(0,18)$, $L=12$. Khi một điểm bị ghim, điểm còn lại gánh **toàn bộ** độ lệch (hệ số 1, không phải 0.5). Tính $B$ sau một lần ép.

**Bài 4.** Một ô vải vuông có rest length cạnh $L=12$. Tính rest length của ràng buộc **chéo (shear)**. Tổng quát: với cạnh $L$ bất kỳ, công thức là gì?

**Bài 5.** Giải thích bằng lời (không cần số): vì sao với \`N=1\` iteration thì vải/dây co giãn "nhão như cao su", còn \`N=15\` thì cứng? Liên hệ tới walk-through §3.3.

**Bài 6.** Tearing: rest length $L=10$, ngưỡng xé $= 3.5L$. Với các khoảng cách hiện tại sau: 28, 36, 40, 12 — ràng buộc nào bị cắt?

**Bài 7.** (Pin) Một sợi dây 5 điểm ghim **cả hai đầu** $P_0$ và $P_4$. Mô tả định tính hình dạng cân bằng dưới trọng lực và tên đường cong đó.

**Bài 8.** (Thiết kế) Bạn muốn mô phỏng một **lá cờ** 30×20 điểm phấp phới trong gió. Liệt kê: (a) ghim điểm nào, (b) loại ràng buộc nào cần, (c) cách thêm gió, (d) chọn \`N\` bao nhiêu và vì sao.

## Lời giải chi tiết

### Bài 1

$\\vec{d}=B-A=(0,12)$, dist $=12$. diff $=(12-8)/12 = 4/12 = 0.333$.
- $A \\leftarrow (2,2) + 0.5\\cdot(0,12)\\cdot0.333 = (2,2)+(0,2)=(2,4)$.
- $B \\leftarrow (2,14) - (0,2) = (2,12)$.
- Khoảng cách mới $=|12-4|=8=L$ ✓. Một ràng buộc cô lập thỏa ngay sau một lần ép.

### Bài 2

$\\vec{d}=(3,4)$, dist $=\\sqrt{9+16}=5$. diff $=(5-10)/5 = -1$ (**âm** vì dây bị **nén**: dist $5 < L=10$).
- $A \\leftarrow (0,0)+0.5(3,4)(-1) = (-1.5,-2)$.
- $B \\leftarrow (3,4)-(-1.5,-2)=(4.5,6)$.
- Khoảng cách mới $=\\sqrt{6^2+8^2}=10=L$ ✓.

**Dấu của diff:** diff > 0 khi dây **căng** (kéo hai điểm lại gần); diff < 0 khi dây **nén** (đẩy hai điểm ra xa). Cùng một công thức xử lý cả hai trường hợp tự động.

### Bài 3

$A$ ghim → hệ số gánh của $B$ là **1** (không chia đôi). $\\vec{d}=B-A=(0,18)$, dist $=18$, diff $=(18-12)/18=0.333$.
- $B \\leftarrow B - \\vec{d}\\cdot\\text{diff} = (0,18) - (0,18)(0.333) = (0,18)-(0,6)=(0,12)$.
- Khoảng cách $=|12-0|=12=L$ ✓. (So với chia đôi: nếu cả hai tự do thì mỗi điểm dịch một nửa; ghim một đầu thì đầu kia dịch gấp đôi để bù.)

### Bài 4

Đường chéo ô vuông cạnh $L$: $\\sqrt{L^2+L^2}=L\\sqrt2$. Với $L=12$: $12\\sqrt2 \\approx 16.97$.
**Tổng quát:** rest length chéo $= L\\sqrt2 \\approx 1.414\\,L$.

### Bài 5

Với \`N=1\`, mỗi frame ta chỉ quét ràng buộc **một lượt**. Như walk-through §3.3 cho thấy: sau một lượt, ép ràng buộc cuối làm lệch lại ràng buộc trước (vd $|AB|$ vẫn còn 20 thay vì 10). Sai số còn lớn → các đoạn dây/cạnh vải vẫn dài hơn rest length đáng kể → trông như **co giãn được** (cao su). Với \`N=15\`, hệ được "vuốt phẳng" 15 lượt, $|AB|$ hội tụ rất gần rest length (20→15→12.5→...→≈10) → mọi đoạn gần đúng độ dài nghỉ → vải/dây **cứng**, không giãn. Đánh đổi: \`N\` lớn tốn CPU tuyến tính (\`N\`× số ràng buộc).

### Bài 6

Ngưỡng $=3.5 \\times 10 = 35$. Cắt khi dist > 35:
- 28 → giữ (28 < 35).
- 36 → **cắt** (36 > 35).
- 40 → **cắt** (40 > 35).
- 12 → giữ.

### Bài 7

Ghim hai đầu, trọng lực kéo phần giữa võng xuống. Hình dạng cân bằng là đường **catenary** (dây xích / dây võng) — giống dây điện căng giữa hai cột điện, hoặc dây của cầu treo. Điểm thấp nhất ở giữa, hai đầu cao và cố định. (Toán học: catenary là đồ thị $y = a\\cosh(x/a)$, nhưng trong sim ta không cần công thức — solver tự ra hình đó.)

### Bài 8

(a) **Ghim:** cả **mép trái** (cột $i=0$, mọi $j$) — cờ gắn vào cột cờ dọc bên trái. (Hoặc chỉ ghim 2 góc trái nếu muốn cờ tự do hơn.)

(b) **Ràng buộc:** structural (ngang + dọc) **bắt buộc**; shear (chéo) **nên có** để cờ không xẹp thành hình thoi khi gió thổi xiên. Bend (cách 2 ô) tùy chọn nếu muốn cờ ít gập nhăn.

(c) **Gió:** thêm gia tốc ngang dao động theo thời gian, vd $a_x = A\\sin(\\omega t) + \\text{nhiễu}$, cộng vào bước Verlet của mỗi điểm. Có thể cho gió mạnh hơn ở mép phải (xa cột) để cờ "bay".

(d) **\`N\`:** chọn \`N\` trung bình, ~8–12. Cờ vải mềm hơn dây nên không cần quá cứng (\`N\` thấp cho cảm giác vải buông). Nếu cờ trông giãn nhão, tăng \`N\`; nếu giật/tốn CPU với lưới lớn, giảm \`N\`. Với 30×20 = 600 điểm và ~1700 ràng buộc, \`N=10\` là cân bằng hợp lý cho 60 FPS.

## Tham khảo và bài tiếp theo

- Bài trước: [Lesson 11 — Particle Systems](../lesson-01-particle-systems/).
- **Bài tiếp theo:** [Lesson 13 — Flocking & Steering](../lesson-03-flocking-steering/) — nhiều agent tự lái (boids), bổ sung cho thế giới sống động.
- Nền tảng: [Lesson 03 — Integration (Euler/Verlet)](../../01-Motion/lesson-03-integration-euler-verlet/), [Lesson 05 — Springs & Oscillation](../../01-Motion/lesson-05-springs-oscillation/).
- Tham khảo gốc: Thomas Jakobsen, *"Advanced Character Physics"*, GDC 2001 — bài báo nền tảng cho Verlet + constraint trong game.
- Minh họa tương tác: [visualization.html](./visualization.html) — vải kéo/xé bằng chuột + slider iteration + gió, dây đung đưa, và demo iteration 1→20 thấy độ cứng.
</content>
</invoke>
`;
